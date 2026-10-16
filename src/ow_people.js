/* ================= OPEN WORLD v7: people (model + render) ================= */
const NPC_POOL=isTouch?60:190,NPC_SPC=48,NPC_MAX=NPC_POOL+NPC_SPC,NPC_R=isTouch?70:125,NPC_S=1.38;
const people=[],specials=[];let NPI=null,npcSerial=1;
function mgeo(list){const gs=list.map(g=>g.index?g.toNonIndexed():g);let n=0;for(const g of gs)n+=g.attributes.position.count;const pos=new Float32Array(n*3),nor=new Float32Array(n*3),uv=new Float32Array(n*2);let o=0;
  for(const g of gs){pos.set(g.attributes.position.array,o*3);nor.set(g.attributes.normal.array,o*3);if(g.attributes.uv)uv.set(g.attributes.uv.array,o*2);o+=g.attributes.position.count}
  const m=new THREE.BufferGeometry();m.setAttribute('position',new THREE.BufferAttribute(pos,3));m.setAttribute('normal',new THREE.BufferAttribute(nor,3));m.setAttribute('uv',new THREE.BufferAttribute(uv,2));return m}
const NLA=(pts,seg=10,ps=0,pl=TAU)=>new THREE.LatheGeometry(pts.map(p=>new THREE.Vector2(p[0],p[1])),seg,ps,pl);
const NSP=(r,w=12,h=8,ps=0,pl=TAU,ts=0,tl=Math.PI)=>new THREE.SphereGeometry(r,w,h,ps,pl,ts,tl);
function tfm(g,sx,sy,sz,x,y,z,rx=0,ry=0,rz=0){g.scale(sx,sy,sz);if(rx)g.rotateX(rx);if(ry)g.rotateY(ry);if(rz)g.rotateZ(rz);g.translate(x,y,z);return g}
function bumpy(g,a,seed){const p=g.attributes.position,R=mulberry(seed);const m=new Map();for(let i=0;i<p.count;i++){const k=(p.getX(i)*1e3|0)+','+(p.getY(i)*1e3|0)+','+(p.getZ(i)*1e3|0);let d=m.get(k);if(d===undefined){d=(R()-.5)*2*a;m.set(k,d)}const l=Math.hypot(p.getX(i),p.getY(i),p.getZ(i))||1;p.setXYZ(i,p.getX(i)*(1+d/l),p.getY(i)*(1+d/l),p.getZ(i)*(1+d/l))}g.computeVertexNormals();return g}
function hairCap(r,tl,tilt,seg=16,bmp=.0035){return bumpy(tfm(NSP(r,seg,12,0,TAU,0,tl),1.03,1.2,1.1,0,.14,-.006,-tilt),bmp,Math.round(r*1e4+tl*100))}
function npcGeos(){const G={};
  G.thigh=NLA([[.001,.03],[.08,.02],[.09,-.06],[.08,-.28],[.062,-.44],[.001,-.46]],10);
  G.shin=NLA([[.001,.02],[.06,.01],[.061,-.1],[.05,-.24],[.04,-.4],[.001,-.42]],9);
  G.shoe=(()=>{const g=NSP(1,10,7);const p=g.attributes.position;for(let i=0;i<p.count;i++)if(p.getY(i)<-.35)p.setY(i,-.35);g.computeVertexNormals();return tfm(g,.058,.07,.14,0,-.435,.045)})();
  G.heel=tfm(NSP(1,10,7),.045,.06,.12,0,-.43,.04,-.25);
  G.pelvis=NLA([[.001,.07],[.15,.07],[.168,0],[.16,-.08],[.12,-.12],[.001,-.13]],12);
  G.torsoM=NLA([[.001,-.02],[.148,-.02],[.152,.1],[.168,.24],[.182,.35],[.18,.41],[.155,.462],[.095,.498],[.05,.515],[.001,.515]],14);
  G.torsoF=NLA([[.001,-.02],[.148,-.02],[.128,.1],[.15,.22],[.172,.3],[.166,.37],[.16,.42],[.14,.462],[.09,.498],[.048,.515],[.001,.515]],14);
  G.uarm=NLA([[.001,.03],[.052,.02],[.052,-.05],[.044,-.27],[.001,-.29]],8);
  G.farm=NLA([[.001,.01],[.043,0],[.04,-.18],[.032,-.26],[.001,-.27]],8);
  G.hand=tfm(NSP(1,8,6),.036,.062,.024,0,-.055,0);
  G.neck=tfm(new THREE.CylinderGeometry(.048,.055,.14,8),1,1,1,0,.05,0);
  G.head=tfm(NSP(.115,18,14),1,1.2,1.05,0,.13,0);
  G.face=tfm(NSP(.1168,16,12,Math.PI/2-.95,1.9,.85,1.35),1,1.2,1.05,0,.13,0);
  G.nose=tfm(new THREE.ConeGeometry(.019,.05,6),1,1,1,0,.11,.124,Math.PI/2.2);
  G.ears=mgeo([tfm(NSP(1,6,5),.02,.034,.028,.114,.125,-.005),tfm(NSP(1,6,5),.02,.034,.028,-.114,.125,-.005)]);
  G.hair=[hairCap(.123,1.62,.5),hairCap(.119,1.55,.42),mgeo([hairCap(.125,1.72,.55),tfm(new THREE.CylinderGeometry(.122,.14,.32,14,1,true,Math.PI/2+.25,Math.PI-.5),1.05,1,1,0,-.02,-.012)]),
    hairCap(.127,2.05,.78),mgeo([hairCap(.123,1.62,.5),tfm(NSP(.058,10,8),1,1,1,0,.265,-.075)]),mgeo([hairCap(.123,1.62,.5),tfm(NSP(1,8,8),.045,.13,.045,0,.06,-.15,.35)]),
    bumpy(hairCap(.158,1.78,.72,18),.012,7),bumpy(hairCap(.13,1.6,.5,16),.008,3)];
  G.beard=mgeo([tfm(NSP(.121,8,7,Math.PI/2+.42,1.1,1.62,.95),1,1.2,1.08,0,.13,0),tfm(NSP(.121,8,7,Math.PI/2-1.52,1.1,1.62,.95),1,1.2,1.08,0,.13,0),tfm(NSP(.122,10,5,Math.PI/2-.62,1.24,2.1,.52),1,1.2,1.08,0,.13,0)]);
  G.mus=tfm(new THREE.BoxGeometry(.065,.014,.02),1,1,1,0,.09,.119);
  G.glasses=mgeo([tfm(new THREE.TorusGeometry(.03,.0045,5,16),1,1,1,.041,.135,.126),tfm(new THREE.TorusGeometry(.03,.0045,5,16),1,1,1,-.041,.135,.126),tfm(new THREE.BoxGeometry(.022,.006,.006),1,1,1,0,.14,.13),tfm(new THREE.BoxGeometry(.005,.005,.12),1,1,1,.072,.138,.068),tfm(new THREE.BoxGeometry(.005,.005,.12),1,1,1,-.072,.138,.068)]);
  G.shades=mgeo([tfm(new THREE.CircleGeometry(.03,12),1,1,1,.041,.135,.128),tfm(new THREE.CircleGeometry(.03,12),1,1,1,-.041,.135,.128)]);
  G.mask=(()=>{const g=new THREE.CylinderGeometry(.121,.121,.05,20,1,true,Math.PI/2-1.35,2.7);return tfm(g,1,1,1.07,0,.135,0,0,-Math.PI/2)})();
  G.hat=[mgeo([tfm(new THREE.CylinderGeometry(.092,.106,.11,14),1,1,1,0,.3,0),tfm(new THREE.CylinderGeometry(.19,.19,.012,18),1,1,1,0,.245,0),tfm(new THREE.CylinderGeometry(.109,.109,.028,14),1,1,1,0,.262,0)]),
    tfm(NSP(.14,14,6),1,.3,1.05,.02,.272,-.01,0,0,.2),
    mgeo([tfm(NSP(.126,14,7,0,TAU,0,Math.PI/2),1.02,.9,1.08,0,.19,0),tfm(new THREE.BoxGeometry(.2,.012,.12),1,1,1,0,.2,.15,.15)]),
    mgeo([tfm(NSP(.13,14,8,0,TAU,0,1.55),1.03,1.35,1.1,0,.15,-.01,-.32),tfm(new THREE.TorusGeometry(.126,.016,6,20),1,1.1,1,0,.19,-.01,Math.PI/2+.32)]),
    mgeo([tfm(new THREE.CylinderGeometry(.108,.118,.1,14),1,1,1,0,.29,0),tfm(new THREE.CylinderGeometry(.112,.112,.012,14),1,1,1,0,.34,0),tfm(new THREE.BoxGeometry(.18,.01,.1),1,1,1,0,.245,.13,.2)]),
    mgeo([tfm(NSP(.158,14,6,0,TAU,0,1.1),1,1.15,1.12,0,.13,-.012),tfm(NSP(.158,14,8,Math.PI/2+.9,TAU-1.8,1.1,1.15),1,1.15,1.12,0,.13,-.012),tfm(new THREE.ConeGeometry(.045,.1,4),1,1,.6,.075,.3,-.02,0,0,-.3),tfm(new THREE.ConeGeometry(.045,.1,4),1,1,.6,-.075,.3,-.02,0,0,.3)]),
    mgeo([tfm(new THREE.CylinderGeometry(.118,.125,.1,14),1,1,1,0,.28,0),tfm(new THREE.CylinderGeometry(.13,.2,.05,16,1,true),1,1,1,0,.225,0)]),
    tfm(new THREE.TorusGeometry(.12,.013,6,20),1,1.1,1,0,.19,0,Math.PI/2)];
  G.jacket=NLA([[.158,-.05],[.166,.1],[.182,.24],[.196,.36],[.178,.45],[.125,.5],[.085,.53]],16,.36,TAU-.72);
  G.coat=NLA([[.26,-.66],[.22,-.34],[.18,-.08],[.168,.1],[.184,.24],[.197,.36],[.178,.45],[.125,.5],[.085,.54]],16,.28,TAU-.56);
  G.skirt=NLA([[.165,.05],[.19,-.1],[.25,-.36]],14);
  G.dress=NLA([[.165,.05],[.2,-.12],[.3,-.5]],14);
  G.scarf=mgeo([tfm(new THREE.TorusGeometry(.085,.032,6,14),1,1,1.1,0,.47,.005,Math.PI/2),tfm(new THREE.BoxGeometry(.07,.3,.025),1,1,1,.05,.3,.15,.08)]);
  G.pearls=tfm(new THREE.TorusGeometry(.095,.009,5,24),1,1.25,1,0,.43,.035,Math.PI/2-.55);
  G.backpack=mgeo([tfm(new THREE.BoxGeometry(.27,.36,.14),1,1,1,0,.27,-.2),tfm(new THREE.BoxGeometry(.035,.42,.02),1,1,1,.09,.3,.135),tfm(new THREE.BoxGeometry(.035,.42,.02),1,1,1,-.09,.3,.135)]);
  G.bag=mgeo([tfm(new THREE.BoxGeometry(.22,.18,.07),1,1,1,.22,-.06,.02),tfm(new THREE.BoxGeometry(.02,.72,.015),1,1,1,.02,.22,.14,0,0,.62)]);
  G.tote=mgeo([tfm(new THREE.BoxGeometry(.3,.34,.02),1,1,1,-.215,-.12,.02),tfm(new THREE.BoxGeometry(.02,.5,.015),1,1,1,-.19,.2,.0,0,0,-.08)]);
  G.accordion=mgeo([tfm(new THREE.BoxGeometry(.3,.26,.16),1,1,1,0,.2,.22),tfm(new THREE.BoxGeometry(.3,.02,.17),1,1,1,0,.3,.22)]);
  G.prop={phone:tfm(new THREE.BoxGeometry(.036,.074,.009),1,1,1,0,-.08,.02),baguette:tfm(new THREE.CylinderGeometry(.027,.02,.62,8),1,1,1,0,-.12,.03,.25),camera:mgeo([tfm(new THREE.BoxGeometry(.11,.075,.06),1,1,1,0,-.08,.05),tfm(new THREE.CylinderGeometry(.025,.025,.05,10),1,1,1,0,-.08,.1,Math.PI/2)]),
    cup:tfm(new THREE.CylinderGeometry(.032,.026,.1,10),1,1,1,0,-.07,.035),keys:mgeo([tfm(new THREE.TorusGeometry(.05,.006,4,12),1,1,1,0,-.08,0),...[0,1,2,3,4].map(k=>tfm(new THREE.ConeGeometry(.012,.07,4),1,1,1,Math.cos(k*1.25)*.05,-.14,Math.sin(k*1.25)*.05))]),
    cane:mgeo([tfm(new THREE.CylinderGeometry(.012,.012,.92,6),1,1,1,0,-.48,.02),tfm(new THREE.TorusGeometry(.04,.012,4,10,Math.PI),1,1,1,.04,-.02,.02)]),flowers:mgeo([tfm(new THREE.ConeGeometry(.07,.28,8),1,1,1,0,-.02,.03,Math.PI),...[0,1,2,3,4].map(k=>tfm(NSP(.032,6,5),1,1,1,Math.cos(k*1.25)*.045,.13,.03+Math.sin(k*1.25)*.045))]),
    canvas:tfm(new THREE.BoxGeometry(.42,.32,.015),1,1,1,0,-.12,.08),brush:tfm(new THREE.CylinderGeometry(.006,.004,.24,5),1,1,1,0,-.1,.06,1.2)};
  G.ice=tfm(new THREE.BoxGeometry(1,1,1),.95,2.05,.85,0,1.02,0);
  G.shadow=tfm(new THREE.PlaneGeometry(1,1),1.1,1.1,1,0,.03,0,-Math.PI/2);
  return G}
/* ---------- face atlas: 16 identities x 4 expressions (neutral, happy, scared, closed) ---------- */
const FACE_ID=[...Array(16)].map((_,i)=>{const R=mulberry(9001+i*77);const f=i<8;return{f,eye:['#3a2414','#5a3a1a','#2a4a6a','#3a6a4a','#6a5a2a','#1a1410','#4a6a8a','#2a2a2a'][(i*3+1)%8],brow:['#1a1210','#3a2418','#6a4a2a','#a88858','#2a1c14','#8a8a8a'][i%6],bw:f?2.8+R()*1.2:4.2+R()*2,lip:f?['#b0405a','#c8605a','#a85848','#d05060','#9a4a50','#c07068','#b85a6a','#a04848'][i%8]:['#9a5a50','#8a5048','#a06058','#7a4a44'][i%4],
  lash:f,liner:f&&i%3===0,old:i===6||i===7||i===14||i===15,freck:i===2||i===11,stub:i===9||i===12||i===13,full:f?.9+R()*.5:.6+R()*.3,eyeW:10.5+R()*2.5,tilt:(R()-.5)*.25}});
function drawFaceTile(x,ox,oy,s,id,ex){const F=FACE_ID[id];const k=s/128;x.save();x.translate(ox,oy);x.scale(k,k);x.lineCap='round';x.lineJoin='round';
  const ey=66,ex0=[42,86];
  if(F.stub){x.fillStyle='rgba(40,30,28,.16)';x.beginPath();x.ellipse(64,112,34,18,0,0,TAU);x.fill()}
  if(F.freck){x.fillStyle='rgba(150,80,50,.35)';for(let i=0;i<22;i++){const a=(i*2.4)%TAU,r=6+(i*7)%14;x.beginPath();x.arc(64+Math.cos(a)*(18+r)*(i%2?1:-1)*.6,86+Math.sin(a)*5,1.2,0,TAU);x.fill()}}
  x.fillStyle='rgba(200,90,90,.12)';x.beginPath();x.arc(36,90,11,0,TAU);x.arc(92,90,11,0,TAU);x.fill();
  // eyes
  for(let e=0;e<2;e++){const cx=ex0[e],sd=e?1:-1;const w=F.eyeW;
    if(ex===3){x.strokeStyle='#2a1a14';x.lineWidth=2.4;x.beginPath();x.moveTo(cx-w,ey+1);x.quadraticCurveTo(cx,ey+5,cx+w,ey+1);x.stroke();if(F.lash){x.beginPath();x.moveTo(cx+sd*w,ey+1);x.lineTo(cx+sd*(w+3),ey-1);x.stroke()}continue}
    const hh=ex===2?8.5:ex===1?4.6:6.4;x.fillStyle='#f4efe8';x.beginPath();x.ellipse(cx,ey,w,hh,F.tilt*sd,0,TAU);x.fill();
    x.save();x.beginPath();x.ellipse(cx,ey,w,hh,F.tilt*sd,0,TAU);x.clip();x.fillStyle=F.eye;x.beginPath();x.arc(cx+(ex===2?0:.5),ey+(ex===1?.8:0),ex===2?4.6:5.8,0,TAU);x.fill();x.fillStyle='#0a0808';x.beginPath();x.arc(cx+(ex===2?0:.5),ey+(ex===1?.8:0),ex===2?1.8:2.6,0,TAU);x.fill();x.fillStyle='rgba(255,255,255,.85)';x.beginPath();x.arc(cx+2,ey-2,1.3,0,TAU);x.fill();x.restore();
    x.strokeStyle=F.liner?'#120a0a':'#3a2820';x.lineWidth=F.liner?2.6:1.8;x.beginPath();x.ellipse(cx,ey,w,hh,F.tilt*sd,Math.PI*1.05,Math.PI*1.95);x.stroke();
    if(F.lash){x.lineWidth=1.3;for(let l=0;l<4;l++){const a=Math.PI*(1.15+l*.22);x.beginPath();x.moveTo(cx+Math.cos(a)*w,ey+Math.sin(a)*hh);x.lineTo(cx+Math.cos(a)*(w+2.5)+sd*1.5,ey+Math.sin(a)*(hh+3));x.stroke()}}
    if(ex===1){x.strokeStyle='rgba(60,30,20,.35)';x.lineWidth=1;x.beginPath();x.arc(cx,ey+8,w*.8,Math.PI*.15,Math.PI*.85);x.stroke()}
    if(F.old){x.strokeStyle='rgba(90,50,40,.35)';x.lineWidth=1;for(let l=0;l<3;l++){x.beginPath();x.moveTo(cx+sd*(w+2),ey-3+l*3);x.lineTo(cx+sd*(w+7),ey-5+l*4);x.stroke()}}}
  // brows
  x.strokeStyle=F.brow;x.lineWidth=F.bw;for(let e=0;e<2;e++){const cx=ex0[e],sd=e?1:-1;const lift=ex===2?-7:ex===1?-2:0;x.beginPath();
    if(ex===2){x.moveTo(cx-sd*9,ey-12+lift+3);x.quadraticCurveTo(cx,ey-17+lift,cx+sd*10,ey-12+lift+2)}else{x.moveTo(cx-sd*10,ey-11+lift);x.quadraticCurveTo(cx,ey-16+lift,cx+sd*11,ey-12+lift+1)}x.stroke()}
  if(F.old){x.strokeStyle='rgba(90,50,40,.3)';x.lineWidth=1.2;for(let l=0;l<2;l++){x.beginPath();x.moveTo(44,30+l*6);x.quadraticCurveTo(64,26+l*6,84,30+l*6);x.stroke()}}
  // nose shade
  x.strokeStyle='rgba(90,50,40,.3)';x.lineWidth=1.6;x.beginPath();x.moveTo(58,94);x.quadraticCurveTo(64,98,70,94);x.stroke();
  // mouth
  const my=108;x.fillStyle=F.lip;x.strokeStyle='rgba(60,20,20,.8)';x.lineWidth=1.6;
  if(ex===2){x.fillStyle='#3a1414';x.beginPath();x.ellipse(64,my+1,7,8,0,0,TAU);x.fill();x.strokeStyle=F.lip;x.lineWidth=2.5;x.stroke()}
  else if(ex===1){x.fillStyle='#4a1818';x.beginPath();x.moveTo(50,my-2);x.quadraticCurveTo(64,my+14,78,my-2);x.quadraticCurveTo(64,my+2,50,my-2);x.fill();x.fillStyle='#f4f0ea';x.beginPath();x.moveTo(53,my-1);x.quadraticCurveTo(64,my+4,75,my-1);x.quadraticCurveTo(64,my+1,53,my-1);x.fill();x.strokeStyle=F.lip;x.lineWidth=2;x.beginPath();x.moveTo(50,my-2);x.quadraticCurveTo(64,my+14,78,my-2);x.stroke()}
  else if(ex===3){x.strokeStyle='rgba(80,30,30,.8)';x.lineWidth=2;x.beginPath();x.moveTo(57,my+1);x.quadraticCurveTo(64,my+3,71,my+1);x.stroke()}
  else{const fu=F.full;x.beginPath();x.moveTo(52,my);x.quadraticCurveTo(58,my-3*fu,64,my-1.5*fu);x.quadraticCurveTo(70,my-3*fu,76,my);x.quadraticCurveTo(64,my+5*fu,52,my);x.fill();x.strokeStyle='rgba(60,20,20,.55)';x.lineWidth=1.2;x.beginPath();x.moveTo(52,my);x.quadraticCurveTo(64,my+1.5,76,my);x.stroke()}
  x.restore()}
function makeFaceAtlas(){const s=isTouch?64:128;const cv=mkCanvas(s*16,s*4,(x)=>{for(let ex=0;ex<4;ex++)for(let id=0;id<16;id++)drawFaceTile(x,id*s,ex*s,s,id,ex)});const t=new THREE.CanvasTexture(cv);t.anisotropy=4;return t}
/* ---------- materials ---------- */
function patMat(o){const m=std(Object.assign({color:0xffffff,roughness:.84},o));m.onBeforeCompile=sh=>{
  sh.vertexShader=sh.vertexShader.replace('#include <common>','#include <common>\nattribute float aPat;varying float vPat;varying vec3 vLp;').replace('#include <begin_vertex>','#include <begin_vertex>\nvPat=aPat;vLp=position;');
  sh.fragmentShader=sh.fragmentShader.replace('#include <common>','#include <common>\nvarying float vPat;varying vec3 vLp;').replace('#include <color_fragment>',`#include <color_fragment>
  {vec3 b=diffuseColor.rgb;float an=atan(vLp.x,vLp.z);
  if(vPat>.5&&vPat<1.5){float s=smoothstep(.88,.97,fract(an*9.55));diffuseColor.rgb=mix(b,b*1.7+.1,s*.75);}
  else if(vPat>1.5&&vPat<2.5){float s=step(.5,fract(vLp.y*17.));diffuseColor.rgb=mix(vec3(.93,.92,.88),b,s);}
  else if(vPat>2.5&&vPat<3.5){float cx=step(.5,fract(an*3.2)),cy=step(.5,fract(vLp.y*9.));diffuseColor.rgb=b*(.7+.22*cx+.22*cy)+vec3(.05*cx*cy);}
  else if(vPat>3.5&&vPat<4.5){float n=fract(sin(dot(floor(vec2(an*60.,vLp.y*170.)),vec2(12.9898,78.233)))*43758.5453);float d=step(.5,fract(an*20.+vLp.y*55.));diffuseColor.rgb=b*(.8+.24*n)*(.93+.1*d);}
  else if(vPat>4.5&&vPat<5.5){float a=fract(an*26.);diffuseColor.rgb=b*(.78+.28*smoothstep(.12,.5,a)*smoothstep(.88,.5,a));}
  else if(vPat>5.5&&vPat<6.5){vec2 f=fract(vec2(an*5.,vLp.y*15.))-.5;diffuseColor.rgb=mix(b,vec3(.95,.93,.88),step(length(f),.2)*.9);}
  else if(vPat>6.5&&vPat<7.5){float s=step(.5,fract((vLp.y+an*.08)*22.));diffuseColor.rgb=b*(.86+.16*s);}
  else if(vPat>7.5&&vPat<8.5){float q=floor(an*64.);float s=fract(sin(q*12.9898+floor(vLp.y*40.)*3.1)*43758.5453);float l=fract(an*64.);diffuseColor.rgb=b*(.7+.38*s)*(.88+.14*smoothstep(.2,.5,l)*smoothstep(.8,.5,l));}}`)};m.customProgramCacheKey=()=>'npcpat';return m}
/* ---------- instanced part table ---------- */
function npcInit(){const G=npcGeos();const N=NPC_MAX;
  const cloth=patMat({}),clothD=patMat({side:THREE.DoubleSide}),skin=std({color:0xffffff,roughness:.58}),hairM=patMat({roughness:.62}),shoeM=std({color:0xffffff,roughness:.35,metalness:.1}),
    dark=std({color:0xffffff,roughness:.3,metalness:.4}),glassM=std({color:0x0a0a0a,roughness:.05,metalness:.8}),propM=std({color:0xffffff,roughness:.5}),
    faceM=std({map:makeFaceAtlas(),transparent:true,alphaTest:.4,roughness:.6,polygonOffset:true,polygonOffsetFactor:-2,polygonOffsetUnits:-2});
  faceM.onBeforeCompile=sh=>{sh.vertexShader=sh.vertexShader.replace('#include <common>','#include <common>\nattribute float aFace;').replace('#include <uv_vertex>','#include <uv_vertex>\nvUv=vUv*vec2(.0625,.25)+vec2(mod(aFace,16.)*.0625,.75-floor(aFace/16.+.001)*.25);')};faceM.customProgramCacheKey=()=>'npcface';
  const maskTex=canvasTex(128,32,(x)=>{x.fillStyle='#fff';x.fillRect(0,0,128,32);x.globalCompositeOperation='destination-out';for(const cx of[44,84]){x.beginPath();x.ellipse(cx,17,10,7,0,0,TAU);x.fill()}});
  const maskM=std({color:0xffffff,map:maskTex,alphaTest:.5,transparent:true,side:THREE.DoubleSide,roughness:.5});
  const iceM=std({color:0xbfeaff,roughness:.05,metalness:.1,transparent:true,opacity:.5,envMapIntensity:2.2,emissive:0x1a4a6a,depthWrite:false});
  const shM=new THREE.MeshBasicMaterial({map:canvasTex(64,64,(x)=>{const g=x.createRadialGradient(32,32,2,32,32,31);g.addColorStop(0,'rgba(0,0,0,.55)');g.addColorStop(1,'rgba(0,0,0,0)');x.fillStyle=g;x.fillRect(0,0,64,64)}),transparent:true,depthWrite:false,polygonOffset:true,polygonOffsetFactor:-4});
  const mk=(geo,mat,attr)=>{const im=new THREE.InstancedMesh(geo,mat,N);im.instanceMatrix.setUsage(THREE.DynamicDrawUsage);im.instanceColor=new THREE.InstancedBufferAttribute(new Float32Array(N*3).fill(1),3);im.instanceColor.setUsage(THREE.DynamicDrawUsage);im.frustumCulled=false;im.count=0;
    if(attr){const a=new THREE.InstancedBufferAttribute(new Float32Array(N),1);a.setUsage(THREE.DynamicDrawUsage);geo.setAttribute(attr,a);im.userData.ex=a}im.userData.n=0;scene.add(im);return im};
  const I={};const cl=g=>g.clone();
  I.thigh=mk(G.thigh,cloth,'aPat');I.shin=mk(G.shin,cloth,'aPat');I.shinS=mk(cl(G.shin),skin);I.shoe=mk(G.shoe,shoeM);I.heel=mk(G.heel,shoeM);I.pelvis=mk(G.pelvis,cloth,'aPat');
  I.torsoM=mk(G.torsoM,cloth,'aPat');I.torsoF=mk(G.torsoF,cloth,'aPat');I.uarm=mk(G.uarm,cloth,'aPat');I.farm=mk(G.farm,cloth,'aPat');I.farmS=mk(cl(G.farm),skin);I.hand=mk(G.hand,skin);I.neck=mk(G.neck,skin);I.head=mk(G.head,skin);I.nose=mk(G.nose,skin);I.ears=mk(G.ears,skin);
  I.face=mk(G.face,faceM,'aFace');I.hair=G.hair.map(g=>mk(g,hairM,'aPat'));I.beard=mk(G.beard,hairM,'aPat');I.mus=mk(G.mus,hairM);I.glasses=mk(G.glasses,dark);I.shades=mk(G.shades,glassM);I.mask=mk(G.mask,maskM);
  I.hat=G.hat.map(g=>mk(g,cloth,'aPat'));I.jacket=mk(G.jacket,clothD,'aPat');I.coat=mk(G.coat,clothD,'aPat');I.skirt=mk(G.skirt,clothD,'aPat');I.dress=mk(G.dress,clothD,'aPat');I.scarf=mk(G.scarf,cloth,'aPat');I.pearls=mk(G.pearls,dark);
  I.backpack=mk(G.backpack,cloth,'aPat');I.bag=mk(G.bag,shoeM);I.tote=mk(G.tote,cloth,'aPat');I.accordion=mk(G.accordion,propM);I.prop={};for(const k in G.prop)I.prop[k]=mk(G.prop[k],propM);
  I.ice=mk(G.ice,iceM);I.shadow=mk(G.shadow,shM);I.shadow.renderOrder=-1;
  const all=[];const walk=o=>{for(const k in o){const v=o[k];if(v&&v.isInstancedMesh)all.push(v);else if(Array.isArray(v))v.forEach(w=>all.push(w));else if(v&&typeof v==='object')walk(v)}};walk(I);I.all=all;
  I.all.forEach(im=>{im.castShadow=false;im.receiveShadow=false});[I.torsoM,I.torsoF,I.thigh,I.shin,I.head,I.coat].forEach(im=>im.castShadow=quality>=3&&!isTouch);
  NPI=I}
/* ---------- matrix helpers ---------- */
const JNT={};['B','hip','pel','tor','thL','thR','shL','shR','ftL','ftR','uaL','uaR','faL','faR','hdL','hdR','nk','hd'].forEach(k=>JNT[k]=new THREE.Matrix4());
const _nT=new THREE.Matrix4(),_nX=new THREE.Matrix4(),_np=V3(),_nq=new THREE.Quaternion(),_ne=new THREE.Euler(0,0,0,'YXZ'),_ns=V3(1,1,1),_nv=V3();
function jt(out,par,x,y,z,rx,ry,rz){_np.set(x,y,z);_ne.set(rx,ry,rz,'YXZ');_nq.setFromEuler(_ne);_ns.set(1,1,1);_nT.compose(_np,_nq,_ns);return out.multiplyMatrices(par,_nT)}
const _nc=new THREE.Color();
function put(im,m,col,sx,sy,sz,ex){const k=im.userData.n;if(k>=NPC_MAX)return;im.userData.n=k+1;if(sx!==undefined&&(sx!==1||sy!==1||sz!==1)){_nX.copy(m);_nX.scale(_nv.set(sx,sy,sz));_nX.toArray(im.instanceMatrix.array,k*16)}else m.toArray(im.instanceMatrix.array,k*16);
  const c=im.instanceColor.array;c[k*3]=col.r;c[k*3+1]=col.g;c[k*3+2]=col.b;if(im.userData.ex)im.userData.ex.array[k]=ex||0}
/* ---------- names & looks ---------- */
const FN_F=['Camille','Léa','Manon','Chloé','Inès','Sarah','Jade','Louise','Emma','Zoé','Juliette','Clémence','Margaux','Anaïs','Mathilde','Élodie','Aurélie','Nadia','Yasmine','Fatou','Aïcha','Leïla','Mei','Lin','Sofia','Hélène','Isabelle','Catherine','Brigitte','Monique','Sylvie','Nathalie','Sandrine','Céline','Amélie','Pauline','Justine','Océane','Maëlys','Rose','Alice','Agathe','Noémie','Myriam','Rania','Awa','Aminata','Nour','Lina','Kenza','Mariam','Esther','Rachel','Élise','Colette','Odile','Geneviève','Paulette','Simone','Josette','Ophélie','Laetitia','Salomé','Coralie','Soraya','Thi Lan','Yuki','Ana','Giulia','Priya'];
const FN_M=['Lucas','Hugo','Louis','Gabriel','Arthur','Jules','Léo','Raphaël','Adam','Nathan','Théo','Mathis','Tom','Maxime','Antoine','Julien','Nicolas','Thomas','Pierre','Paul','Jean','Michel','Philippe','Alain','Bernard','Gérard','Patrick','Christophe','Stéphane','Olivier','Mehdi','Karim','Yanis','Rayan','Samir','Moussa','Mamadou','Ibrahim','Omar','Bilal','Sofiane','Wei','Minh','Kevin','Baptiste','Benoît','Guillaume','Félix','Victor','Émile','Marius','Anatole','Rémi','Cédric','Franck','Didier','Serge','Jacques','René','Marcel','Lucien','Youssef','Amadou','Diego','Luca','Kenji','Arjun','Malik','Sacha','Noah'];
const FN_PF=['Victoire','Apolline','Capucine','Héloïse','Diane','Blanche','Albane','Eugénie','Marie-Clémentine','Constance','Philippine','Bérénice'],FN_PM=['Charles-Henri','Édouard','Augustin','Gaspard','Côme','Aymeric','Foucauld','Hubert','Enguerrand','Louis-Marie','Stanislas','Tanguy'];
const SURN=['Martin','Bernard','Dubois','Thomas','Robert','Richard','Petit','Durand','Leroy','Moreau','Simon','Laurent','Lefebvre','Michel','Garcia','David','Bertrand','Roux','Vincent','Fournier','Morel','Girard','André','Mercier','Dupont','Lambert','Bonnet','François','Martinez','Legrand','Garnier','Faure','Rousseau','Blanc','Guérin','Muller','Henry','Roussel','Perrin','Morin','Mathieu','Clément','Gauthier','Dumont','Lopez','Fontaine','Chevalier','Robin','Diallo','Traoré','Benali','Haddad','Nguyen','Chen','Mendy','Koné','Cissé','Da Silva','Ferreira','Cohen','Lévy','Rossi','Bouvier','Lemoine','Barbier','Marchand','Renaud','Tran','Ben Salem','Okafor','Kowalski','Schmitt'];
const SURN_P=['de Villeneuve','de La Rochefoucauld-ish','du Plessis','de Montclair','de Saint-Aubin','d\'Harcourt-ish','de Beaulieu','de Castelnau','de Valmont','de Vaudreuil'];
const CHAT_NICK=['Le Matou','Minou','Griffe','Moustache','Pacha','Réglisse','Ombre','Filou','Chaton','Pantoufle','Gouttière','Nuit','Tigrou','Pelote','Sardine','Croquette'];
const ORIGINS=['Osaka','Texas','Berlin','São Paulo','Seoul','Sydney','Milan','Montréal','Chicago','Lagos','Mumbai','Madrid','Stockholm','Buenos Aires','Shanghai','Manchester','Lisbon','Cape Town','Vancouver','Warsaw'];
const JOBS={parisien:['accountant','nurse','maths teacher','bus driver','architect','pharmacist','waiter','bookseller','postman','graphic designer','lawyer','physiotherapist','florist','plumber','journalist','sound engineer','dentist','taxi driver','librarian','museum guard','chef','nanny','firefighter','translator','hairdresser','electrician','bike courier','sommelier','piano teacher','civil servant'],
  posh:['heiress','investment banker','art dealer','notary','gallery owner','cosmetic surgeon','yacht broker','polo enthusiast','wine collector','consultant (retired at 34)','foundation president','horse owner'],
  hipster:['barista','DJ','UX designer','kombucha startup founder','tattoo artist','podcaster','vinyl shop owner','natural wine importer','illustrator','ceramicist','vintage dealer','content creator'],
  student:['philosophy student','medicine student','law student','history student','art school student','engineering student','literature student','physics PhD student','Erasmus student','film student'],
  artist:['painter','caricaturist','street photographer','sculptor','poet','set designer','comic book artist','street muralist'],
  business:['consultant','trader','sales director','corporate lawyer','auditor','project manager','CFO','HR manager','startup CEO','marketing director'],
  elderly:['retired teacher','retired baker','retired taxi driver','retired seamstress','retired railway worker','retired opera singer','retired jeweller','retired policeman'],
  jogger:['marathon runner','personal trainer','software engineer','midwife','architect','nurse'],night:['bartender','nightclub bouncer','drag performer','cabaret dancer','DJ','sound technician','night nurse','night taxi driver'],
  vendor:['souvenir seller'],market:['market trader','greengrocer','fabric seller','spice seller'],busker:['accordionist'],painter:['portrait painter'],police:['police officer'],chat:['Chat Noir'],pick:['pickpocket'],tourist:['tourist']};
const SKINS=['#f6dcc8','#f1d0bc','#ecc6aa','#e0b294','#d4a07c','#c68a64','#b07650','#9a6440','#7a4a2e','#5a3420','#44281a'].map(c=>new THREE.Color(c));
const HAIRS=['#140e0a','#241810','#3a2418','#5a3a22','#7a5230','#a07040','#c8a060','#e2cc98','#8a2a14','#b04a20','#2a2a2a'].map(c=>new THREE.Color(c)),GREYS=['#a8a8b0','#c8c8cc','#e4e2dc','#8a8a90'].map(c=>new THREE.Color(c));
const hc=s=>new THREE.Color(s);
const PAL={neutral:['#1a1a22','#2a2e3a','#e8e4dc','#8a8478','#3a3a40','#1f2a44','#5a4a3a','#6a6a70','#c8bca8','#f0ece4'],warm:['#8a1a1a','#c07a30','#d8b060','#b0402a','#e0a040','#7a3a2a','#c85a3a'],cool:['#1a4a6a','#2a6a8a','#3a5a3a','#1f7a7a','#4a6a9a','#2a8a8a','#5a8a6a'],pastel:['#f2c4c8','#c8d8f0','#d8f0d0','#f0e0b0','#e0c8f0','#f8d8b8'],
  denim:['#3a5a8a','#2a4468','#4a6a9a','#1e2e48','#6a8ab0'],chino:['#c8a878','#a88858','#8a7a5a','#d8c098','#6a5a40'],knit:['#2a7a6a','#3a6a3a','#c8a040','#8a2a3a','#4a4a6a','#a86a3a','#6a8a8a'],posh:['#1f2a44','#e8dcc0','#c8b890','#f0ece4','#8aa8d0','#a01a2a','#2a3a2a','#d8c8a8'],sport:['#ff4a6a','#40c8ff','#c8ff40','#ff8a20','#ffffff','#202020','#a040ff']};
function pc(R,k){return hc(pickR(R,PAL[k]))}
/* ---------- archetype outfits ---------- */
function makeLook(R,arch,o={}){const f=o.female!==undefined?o.female:R()<.5;const L={f,arch,age:o.age||20+(R()*45|0),h:(f?.94:1)*(.95+R()*.1),w:f?1.06:1.16+R()*.08,skin:pickR(R,SKINS),hairS:f?pickR(R,[2,2,3,4,5,6,0,3]):pickR(R,[0,0,1,7,6,1,0]),hairC:pickR(R,HAIRS),
    top:pc(R,'neutral'),topP:0,jk:null,jkP:0,coat:null,coatP:0,bot:pc(R,'denim'),botP:4,legs:'pants',legC:null,shoe:hc(pickR(R,['#3a2418','#1a1414','#f0f0f0','#5a3a22','#101010'])),heel:false,
    beard:!f&&R()<.28,mus:false,glasses:R()<.2,shades:false,mask:false,hat:-1,hatC:hc('#1a1a1a'),hatP:0,scarf:null,scarfP:0,pearls:false,backpack:null,bag:null,tote:null,prop:null,propC:hc('#1a1a1a'),prop2:null,accordion:false,face:(f?0:8)+(R()*8|0),idle:(R()*6|0)};
  if(L.age>62){L.hairC=pickR(R,GREYS);L.face=f?6+(R()*2|0):14+(R()*2|0)}
  const A=arch;
  if(A==='tourist'){L.top=pc(R,R()<.5?'sport':'pastel');L.bot=R()<.5?pc(R,'chino'):pc(R,'denim');L.botP=L.bot?4:0;if(R()<.45){L.legs='shorts'}L.hat=R()<.5?pickR(R,[2,6]):-1;L.hatC=pc(R,'sport');L.backpack=R()<.6?pc(R,'cool'):null;L.prop=R()<.55?'camera':R()<.5?'phone':null;L.shoe=hc('#f4f4f4');L.shades=R()<.35}
  else if(A==='posh'){L.top=pc(R,'posh');L.topP=R()<.3?5:0;if(R()<.5){L.coat=hc(pickR(R,['#c8b088','#d8c098','#1f2a44','#2a2a2a']));L.coatP=0}else{L.jk=hc(pickR(R,['#1f2a44','#2a3a2a','#3a2a2a']));L.jkP=R()<.3?1:0;L.top=hc(pickR(R,['#f4f0e8','#c8d8f0','#e8e0f0']))}
    L.bot=hc(pickR(R,f?['#1f2a44','#e8dcc0','#1a1a1a']:['#a01a2a','#c8b890','#1f2a44','#e8dcc0']));L.botP=0;L.shoe=hc(pickR(R,['#3a1a10','#1a1414','#5a2a18']));L.pearls=f&&R()<.7;L.shades=R()<.4;L.bag=f?hc(pickR(R,['#6a1a1a','#1a1a1a','#c8a060'])):null;L.scarf=R()<.4?hc(pickR(R,['#c8a0a0','#8aa8d0','#e8d0a0','#a01a2a'])):null;L.hairS=f?pickR(R,[3,4,2]):pickR(R,[0,1]);if(f&&R()<.4){L.legs='skirt';L.legC=null}L.heel=f&&R()<.6;L.beard=false;if(!f&&R()<.4){L.scarf=pc(R,'knit');L.scarfP=5}}
  else if(A==='hipster'){L.top=pc(R,'knit');L.topP=5;L.bot=R()<.5?pc(R,'chino'):pc(R,'denim');L.botP=L.bot?(R()<.5?4:0):0;L.hat=R()<.45?pickR(R,[0,3]):-1;L.hatC=hc(pickR(R,['#3a3a44','#6a4a2a','#1a1a1a','#8a1a1a']));L.hatP=L.hat===0?7:5;L.beard=!f&&R()<.8;L.glasses=R()<.6;L.scarf=R()<.55?pc(R,'neutral'):null;L.scarfP=3;L.tote=R()<.5?hc('#e8e0cc'):null;L.shoe=hc(pickR(R,['#5a3a22','#3a2418','#7a4a2a']));if(R()<.3){L.jk=hc(pickR(R,['#4a6a9a','#2a2a2a','#6a4a3a']));L.jkP=R()<.5?4:0;L.top=hc('#1a1a1a');L.topP=0}L.prop=R()<.3?'cup':R()<.3?'phone':null}
  else if(A==='student'){L.top=pc(R,R()<.5?'cool':'warm');L.topP=R()<.25?3:0;L.bot=pc(R,'denim');L.backpack=R()<.8?pc(R,'neutral'):null;L.shoe=hc(pickR(R,['#f4f4f4','#1a1a1a']));L.hat=R()<.15?3:-1;L.hatC=pc(R,'neutral');L.glasses=R()<.35;L.prop=R()<.4?'phone':null}
  else if(A==='artist'||A==='painter'){L.top=R()<.5?hc('#1f2a44'):pc(R,'warm');L.topP=R()<.5?2:0;L.hat=R()<.65?1:-1;L.hatC=hc(pickR(R,['#1a1a1a','#8a1a1a','#1f2a44']));L.scarf=R()<.6?pc(R,'warm'):null;L.bot=pc(R,'neutral');L.botP=0;L.beard=!f&&R()<.5;if(A==='painter'){L.prop='brush';L.prop2='canvas';L.idle=6}}
  else if(A==='business'){L.top=hc(pickR(R,['#f4f4f4','#c8d8f0','#f0f0f0']));L.jk=hc(pickR(R,['#1f2a44','#2a2a30','#3a3a44','#1a1a1a']));L.jkP=R()<.45?1:0;L.bot=L.jk.clone();L.botP=L.jkP;L.shoe=hc('#141010');L.prop=R()<.6?'phone':null;L.idle=R()<.5?3:1;L.beard=!f&&R()<.15;L.hairS=f?pickR(R,[3,4,5,2]):pickR(R,[0,1]);if(f&&R()<.5)L.legs='skirt';L.heel=f&&R()<.5;L.bag=f&&R()<.6?hc('#1a1a1a'):null}
  else if(A==='elderly'){L.age=66+(R()*20|0);L.hairC=pickR(R,GREYS);L.face=f?6+(R()*2|0):14+(R()*2|0);L.top=hc(pickR(R,['#8a7a6a','#5a4a5a','#3a4a5a','#a89878']));L.topP=5;L.coat=R()<.5?hc(pickR(R,['#3a3a44','#6a5a4a','#2a2a3a'])):null;L.hat=!f&&R()<.5?1:-1;L.hatC=hc('#2a2a2a');L.prop=R()<.4?'cane':R()<.5?'baguette':null;L.glasses=R()<.6;L.bot=hc(pickR(R,['#4a4a50','#3a3024','#6a6a70']));L.botP=0;if(f&&R()<.6)L.legs='skirt';L.hairS=f?pickR(R,[3,4,0]):pickR(R,[1,0])}
  else if(A==='jogger'){L.top=pc(R,'sport');L.bot=hc('#141414');L.botP=0;L.legs=R()<.5?'shorts':'pants';L.shoe=pc(R,'sport');L.hat=R()<.4?7:-1;L.hatC=pc(R,'sport');L.hairS=f?5:1;L.glasses=false}
  else if(A==='night'){if(f&&R()<.6){L.legs='dress';L.top=pc(R,R()<.5?'warm':'neutral');L.heel=true;L.legC=R()<.5?hc('#1a1a1a'):null}else{L.jk=hc('#141414');L.jkP=7;L.top=pc(R,'neutral')}L.shoe=hc('#101010');L.prop=R()<.3?'phone':null}
  else if(A==='vendor'){L.f=false;L.face=8+(R()*8|0);L.hairS=pickR(R,[1,0,7]);L.top=pc(R,'neutral');L.jk=R()<.5?pc(R,'cool'):null;L.prop='keys';L.propC=hc('#d8b040');L.bag=hc('#2a2a2a')}
  else if(A==='market'){L.top=pc(R,R()<.5?'warm':'cool');L.topP=R()<.3?3:0;L.prop=R()<.5?'baguette':null}
  else if(A==='busker'){L.top=hc('#1f2a44');L.topP=2;L.hat=1;L.hatC=hc('#1a1a1a');L.accordion=true;L.scarf=hc('#a01a2a');L.idle=7}
  else if(A==='police'){L.top=hc('#1a2440');L.bot=hc('#141a2e');L.botP=0;L.jk=null;L.hat=4;L.hatC=hc('#141a2e');L.shoe=hc('#0a0a0a');L.beard=false;L.glasses=false;L.hairS=f?4:1}
  else if(A==='chat'){L.top=hc(pickR(R,['#141414','#1a1a1a','#202020']));L.jk=null;L.bot=hc('#101010');L.botP=4;L.hat=5;L.hatC=hc('#121212');L.mask=true;L.shoe=hc(pickR(R,['#f4f4f4','#1a1a1a','#c02020']));L.glasses=false;L.shades=false;L.beard=false}
  else if(A==='pick'){L.top=pc(R,R()<.5?'pastel':'neutral');L.hat=R()<.4?2:-1;L.hatC=pc(R,'neutral');L.prop=R()<.4?'phone':null;L.backpack=R()<.3?pc(R,'neutral'):null}
  else{L.top=pc(R,pickR(R,['neutral','neutral','warm','cool','knit']));L.topP=pickR(R,[0,0,0,5,3,2]);if(L.topP===2)L.top=hc('#1f2a44');if(R()<.3){L.jk=hc(pickR(R,['#6a8ab0','#4a6a9a','#3a2a1a','#1a1a1a','#8a7a5a','#2a3a2a']));L.jkP=R()<.4?4:R()<.2?7:0}
    if(R()<.22){L.coat=hc(pickR(R,['#c8b088','#2a2a30','#6a5a4a','#1f2a44','#8a2a2a']))}L.bot=R()<.55?pc(R,'denim'):pc(R,R()<.5?'chino':'neutral');L.botP=L.bot&&R()<.55?4:0;if(f&&R()<.3){L.legs=R()<.5?'skirt':'dress';L.legC=R()<.4?hc('#1a1a1a'):null}
    L.prop=R()<.14?'baguette':R()<.2?'phone':R()<.1?'cup':R()<.06?'flowers':null;if(L.prop==='flowers')L.propC=hc(pickR(R,['#e02040','#f080a0','#f0d040']));if(L.prop==='baguette')L.propC=hc('#d8a050');L.bag=f&&R()<.4?hc(pickR(R,['#3a2418','#1a1a1a','#8a1a1a','#c8a060'])):null;L.scarf=R()<.2?pc(R,'warm'):null;L.hat=R()<.07?1:R()<.06?3:-1;L.hatC=pc(R,'neutral')}
  if(L.prop==='baguette')L.propC=hc('#d8a050');else if(L.prop==='phone'||L.prop==='camera')L.propC=hc('#141418');else if(L.prop==='cup')L.propC=hc('#f4f0e8');else if(L.prop==='cane')L.propC=hc('#3a2418');else if(L.prop==='brush')L.propC=hc('#8a5a2a');
  if(L.legs==='dress'){L.dressC=L.top}if(L.hairS===6&&R()<.5&&!f)L.hairS=7;
  Object.assign(L,o);return L}
function personName(R,L){const posh=L.arch==='posh';const fn=posh?pickR(R,L.f?FN_PF:FN_PM):pickR(R,L.f?FN_F:FN_M);if(L.arch==='chat')return pickR(R,CHAT_NICK);return fn+' '+(posh?pickR(R,SURN_P):pickR(R,SURN))}
function personJob(R,L){const a=L.arch;if(a==='tourist'||a==='pick')return 'visiting from '+pickR(R,ORIGINS);return pickR(R,JOBS[a]||JOBS.parisien)}
/* ---------- draw one person ---------- */
const _cS=new THREE.Color(),_cK=new THREE.Color(),_cRing=[...Array(12)].map(()=>new THREE.Color());let _cRi=0;const _frus=new THREE.Frustum(),_frM=new THREE.Matrix4(),_frS=new THREE.Sphere();
function drawPerson(n){const L=n.L,I=NPI,J=JNT,po=n.pose;const S=NPC_S*L.h;const dim=n.burnt||0;
  const col=c=>{if(!dim)return c;const r=_cRing[_cRi=(_cRi+1)%12];return r.copy(c).lerp(_cK.setRGB(.08,.07,.07),dim)};
  // base
  _np.set(n.x,n.y+po.dy*S,n.z);_ne.set(-po.lie*1.5708,n.face,po.roll,'YXZ');_nq.setFromEuler(_ne);_ns.set(S,S,S);J.B.compose(_np,_nq,_ns);
  if(n.sh!==false){_nX.makeTranslation(n.x,n.gy!==undefined?n.gy:n.y,n.z);_nX.scale(_nv.set(S*(po.lie?1.8:1),1,S*(po.lie?1.8:1)));put(I.shadow,_nX,_cS.setRGB(1,1,1))}
  jt(J.hip,J.B,0,.92+po.bob,0,po.lean,po.twist*.5,po.sway);
  put(I.pelvis,J.hip,col(L.bot),L.w*.95,1,.82,L.botP);
  jt(J.thL,J.hip,.088,0,0,po.thL,0,-.03+po.spread);jt(J.thR,J.hip,-.088,0,0,po.thR,0,.03-po.spread);
  jt(J.shL,J.thL,0,-.45,0,po.knL,0,0);jt(J.shR,J.thR,0,-.45,0,po.knR,0,0);
  const legC=L.legs==='pants'?col(L.bot):null,skinC=col(L.skin);
  if(L.legs==='pants'){put(I.thigh,J.thL,legC,1,1,1,L.botP);put(I.thigh,J.thR,legC,1,1,1,L.botP);put(I.shin,J.shL,legC,1,1,1,L.botP);put(I.shin,J.shR,legC,1,1,1,L.botP)}
  else if(L.legs==='shorts'){const c=col(L.bot);put(I.thigh,J.thL,c,1.02,.62,1.02,L.botP);put(I.thigh,J.thR,c,1.02,.62,1.02,L.botP);put(I.shinS,J.shL,skinC);put(I.shinS,J.shR,skinC);_nX.copy(J.thL).multiply(_nT.makeTranslation(0,-.2,0));put(I.shinS,_nX,skinC,1.25,.55,1.25);_nX.copy(J.thR).multiply(_nT.makeTranslation(0,-.2,0));put(I.shinS,_nX,skinC,1.25,.55,1.25)}
  else{const c=L.legC?col(L.legC):skinC;_nX.copy(J.thL);put(I.shinS,_nX,c,1.3,1.05,1.3);_nX.copy(J.thR);put(I.shinS,_nX,c,1.3,1.05,1.3);put(I.shinS,J.shL,c);put(I.shinS,J.shR,c)}
  jt(J.ftL,J.shL,0,0,0,-(po.thL+po.knL)*.85+po.lie*.2,0,0);jt(J.ftR,J.shR,0,0,0,-(po.thR+po.knR)*.85+po.lie*.2,0,0);const sc=col(L.shoe);if(L.heel){put(I.heel,J.ftL,sc);put(I.heel,J.ftR,sc)}else{put(I.shoe,J.ftL,sc);put(I.shoe,J.ftR,sc)}
  if(L.legs==='skirt')put(I.skirt,J.hip,col(L.bot),L.w*.95,1,.85,L.botP);if(L.legs==='dress')put(I.dress,J.hip,col(L.dressC||L.top),L.w*.95,1,.88,L.topP);
  jt(J.tor,J.hip,0,.1,0,po.lean*.6+po.chest,-po.twist,0);const tc=col(L.top);put(L.f?I.torsoF:I.torsoM,J.tor,tc,L.w,1,.72,L.topP);
  if(L.jk)put(I.jacket,J.tor,col(L.jk),L.w,1,.74,L.jkP);if(L.coat)put(I.coat,J.tor,col(L.coat),L.w,1,.78,L.coatP);
  if(L.scarf)put(I.scarf,J.tor,col(L.scarf),L.w*.9,1,.9,L.scarfP);if(L.pearls)put(I.pearls,J.tor,_cS.setRGB(.95,.93,.88),L.w*.9,1,.85);
  if(L.backpack)put(I.backpack,J.tor,col(L.backpack),1,1,1,0);if(L.bag)put(I.bag,J.tor,col(L.bag),L.w*.95,1,1);if(L.tote)put(I.tote,J.tor,col(L.tote),L.w*.95,1,1);if(L.accordion)put(I.accordion,J.tor,_cS.setRGB(.55,.08,.1));
  // arms
  const sw=L.w*.172;jt(J.uaL,J.tor,sw,.44,0,po.uaLx,po.uaLy,.06+po.uaLz);jt(J.uaR,J.tor,-sw,.44,0,po.uaRx,-po.uaRy,-.06-po.uaRz);
  jt(J.faL,J.uaL,0,-.28,0,po.elL,po.faLy,0);jt(J.faR,J.uaR,0,-.28,0,po.elR,-po.faRy,0);
  const armC=col(L.coat||L.jk||L.top),armP=L.coat?L.coatP:L.jk?L.jkP:L.topP;const shortSleeve=!L.coat&&!L.jk&&(L.arch==='tourist'||L.arch==='jogger'||L.legs==='dress');
  put(I.uarm,J.uaL,armC,1,1,1,armP);put(I.uarm,J.uaR,armC,1,1,1,armP);if(shortSleeve){put(I.farmS,J.faL,skinC);put(I.farmS,J.faR,skinC)}else{put(I.farm,J.faL,armC,1,1,1,armP);put(I.farm,J.faR,armC,1,1,1,armP)}
  jt(J.hdL,J.faL,0,-.27,0,po.hdLx,0,0);jt(J.hdR,J.faR,0,-.27,0,po.hdRx,0,0);put(I.hand,J.hdL,skinC);put(I.hand,J.hdR,skinC);
  if(L.prop&&!n.noProp){const pim=I.prop[L.prop];if(pim)put(pim,J.hdR,col(L.propC))}if(L.prop2){const pim=I.prop[L.prop2];if(pim)put(pim,J.hdL,_cS.setRGB(.92,.88,.8))}
  // head
  jt(J.nk,J.tor,0,.49,.005,po.nkX,0,0);put(I.neck,J.nk,skinC,L.f?.9:1.05,1,L.f?.9:1.05);jt(J.hd,J.nk,0,.055,0,po.hdX,po.hdY,po.hdZ);
  put(I.head,J.hd,skinC,L.f?.95:1,1,L.f?.96:1);put(I.nose,J.hd,skinC);put(I.ears,J.hd,skinC);
  if(n.dist<55||n.special)put(I.face,J.hd,dim?_cS.setRGB(.3,.3,.3):_cS.setRGB(1,1,1),L.f?.95:1,1,L.f?.96:1,L.face+16*(n.expr|0));
  const hs=L.hat===5?-1:L.hairS;if(hs>=0&&!(L.hat===3&&hs<2))put(I.hair[hs],J.hd,col(L.hairC),L.f?.95:1,1,L.f?.96:1,8);
  if(L.beard)put(I.beard,J.hd,col(L.hairC),1,1,1,8);if(L.mus||L.beard)put(I.mus,J.hd,col(L.hairC));if(L.glasses&&!L.shades){put(I.glasses,J.hd,_cS.setRGB(.05,.05,.06));}if(L.shades){put(I.glasses,J.hd,_cS.setRGB(.05,.05,.06));put(I.shades,J.hd,_cS.setRGB(1,1,1))}
  if(L.mask)put(I.mask,J.hd,_cS.setRGB(.04,.04,.05));if(L.hat>=0)put(I.hat[L.hat],J.hd,col(L.hatC),1,1,1,L.hatP);
  if(n.frozen>0){_nX.copy(J.B);put(I.ice,_nX,_cS.setRGB(1,1,1),1+po.lie*.1,1-po.lie*.5,1+po.lie*1.1)}}
function npcFlush(){for(const im of NPI.all){im.count=im.userData.n;im.instanceMatrix.needsUpdate=true;im.instanceColor.needsUpdate=true;if(im.userData.ex)im.userData.ex.needsUpdate=true;im.userData.n=0}}
