
/* =====================================================================================
   XV / XVI second pass: carved gargoyles, Magog in chains, the longer run, the mirror's full kit
   ===================================================================================== */
Object.assign(XL3,{
  lw_14:'I have her! Hold the chain with me, Maëlle. Kaen, break him!',
  mm_05:'Stand still, little witch. I want to watch you burn.',
  mm_06:'Enough games. Let me show you what you could have been.',
  mw_26:'You want the real thing? Fine. Here it is!',
  cr_11:'I am... not... finished.',
  kw_16:"It's running. Half of what it was. But running.",
  mw_21:'Ow. Okay. Did we win? That felt like winning, and then it felt like a wall.',
  lw_15:'We hurt it. It will hide, and feed, and come back. But tonight it is weak.',
  mw_22:'It showed me every one of them. Hakuko. The Nine-Tails. Hrímgar. Even you. Everyone except Morwen.',
  kw_17:'Morwen? You fought Morwen?',
  mw_23:'Queen of the Abyss. Under Paris. Very tall, very angry, tried to drown me. Why?',
  kw_18:'Morwen is no monster. She was my friend. We grew up together. We learned to fight side by side, long before the Crown found us.',
  kw_19:'The Crown wears every soul it ever swallowed. If it never wore her face, it never had her. Her spirit is still out there. Trapped somewhere.',
  mw_24:"Kaen... I'm sorry. I didn't just beat her. I destroyed her. There was nothing left.",
  kw_20:'You destroyed what the Abyss made of her. Not her.',
  lw_16:"He's right. I would have felt her go. I never did."});
for(const k of ['lw_14','mm_05','mm_06','mw_26','cr_11','kw_16','mw_21','lw_15','mw_22','kw_17','mw_23','kw_18','kw_19','mw_24','kw_20','lw_16'])VO_MAP[XL3[k]]=k;

/* ---------- gargoyles: horned, winged, clawed, carved out of cracked stone ---------- */
function x5GargTex(crack){const c=document.createElement('canvas');c.width=c.height=256;const x=c.getContext('2d');x.fillStyle='#b4b6b2';x.fillRect(0,0,256,256);
  for(let i=0;i<1100;i++){const v=(120+Math.random()*110)|0;x.fillStyle=`rgba(${v},${v},${v},.22)`;x.beginPath();x.arc(Math.random()*256,Math.random()*256,Math.random()*8+1.5,0,7);x.fill()}
  const crk=(col,n,w)=>{x.strokeStyle=col;for(let i=0;i<n;i++){x.lineWidth=Math.random()*w+.6;x.beginPath();let px=Math.random()*256,py=Math.random()*256;x.moveTo(px,py);for(let k=0;k<7;k++){px+=rand(-22,22);py+=rand(-22,22);x.lineTo(px,py)}x.stroke()}};crk('rgba(14,16,14,.85)',30,1.8);crk(crack,7,1.2);
  const t=new THREE.CanvasTexture(c);t.wrapS=t.wrapT=THREE.RepeatWrapping;t.repeat.set(2,2);
  const c2=document.createElement('canvas');c2.width=c2.height=256;const y=c2.getContext('2d');y.fillStyle='#000';y.fillRect(0,0,256,256);y.strokeStyle='#fff';y.shadowColor='#fff';y.shadowBlur=6;
  for(let i=0;i<6;i++){y.lineWidth=Math.random()*1.4+.6;y.beginPath();let px=Math.random()*256,py=Math.random()*256;y.moveTo(px,py);for(let k=0;k<9;k++){px+=rand(-26,26);py+=rand(-26,26);y.lineTo(px,py)}y.stroke()}
  const e=new THREE.CanvasTexture(c2);e.wrapS=e.wrapT=THREE.RepeatWrapping;e.repeat.set(2,2);t.userData={glow:e};return t}
function x5Horn(r,h,bend){const g=new THREE.ConeGeometry(r,h,7,6);const p=g.attributes.position;for(let i=0;i<p.count;i++){const t=(p.getY(i)+h/2)/h;p.setZ(i,p.getZ(i)-bend*t*t);p.setY(i,p.getY(i)+h/2)}g.computeVertexNormals();return g}
function x5Lumpy(geo,amp,f){const P=geo.attributes.position,N=geo.attributes.normal,v=V3(),n=V3();const h=(x,y,z)=>{const s=Math.sin(x*12.9898+y*78.233+z*37.719)*43758.5453;return s-Math.floor(s)};
  const nz=(x,y,z)=>{const xi=Math.floor(x),yi=Math.floor(y),zi=Math.floor(z),xf=x-xi,yf=y-yi,zf=z-zi,u=xf*xf*(3-2*xf),w=yf*yf*(3-2*yf),t=zf*zf*(3-2*zf);const L=(a,b,k)=>a+(b-a)*k;
    return L(L(L(h(xi,yi,zi),h(xi+1,yi,zi),u),L(h(xi,yi+1,zi),h(xi+1,yi+1,zi),u),w),L(L(h(xi,yi,zi+1),h(xi+1,yi,zi+1),u),L(h(xi,yi+1,zi+1),h(xi+1,yi+1,zi+1),u),w),t)};
  for(let i=0;i<P.count;i++){v.fromBufferAttribute(P,i);n.fromBufferAttribute(N,i);const d=(nz(v.x*f,v.y*f,v.z*f)*.65+nz(v.x*f*2.3+5,v.y*f*2.3,v.z*f*2.3)*.35-.5)*2*amp;v.addScaledVector(n,d);P.setXYZ(i,v.x,v.y,v.z)}geo.computeVertexNormals();return geo}
function x5Rim(m,col,k,key){m.onBeforeCompile=sh=>{sh.uniforms.uRim={value:new THREE.Color(col)};sh.fragmentShader=sh.fragmentShader.replace('#include <common>','#include <common>\nuniform vec3 uRim;').replace('#include <emissivemap_fragment>','#include <emissivemap_fragment>\n{float fr=pow(1.-abs(dot(normalize(vViewPosition),normal)),3.);totalEmissiveRadiance+=uRim*fr*'+k.toFixed(2)+';}')};m.customProgramCacheKey=()=>'rim'+key;return m}
function x5CurvedHorn(len,r,curl,side){const pts=[];for(let i=0;i<=8;i++){const t=i/8;pts.push(V3(side*Math.sin(t*1.2)*len*.25,Math.sin(t*1.5)*len*.42,-t*len*(.75+curl*.25)+Math.pow(t,2.2)*len*curl*.55))}
  const g=new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts),24,r,8,false),P=g.attributes.position,c=V3();for(let i=0;i<P.count;i++){const seg=Math.floor(i/9),t=seg/24,q=pts[0].clone();const cv=new THREE.CatmullRomCurve3(pts).getPoint(t);c.fromBufferAttribute(P,i).sub(cv).multiplyScalar(Math.max(.04,1-t*.96));P.setXYZ(i,cv.x+c.x,cv.y+c.y,cv.z+c.z)}g.computeVertexNormals();return g}
function buildCrownGuard(kind){const gog=kind==='gog',s=gog?2.15:1.8;const g=new THREE.Group(),body=new THREE.Group();g.add(body);const I=new THREE.Group();I.scale.setScalar(s);body.add(I);
  const tex=x5GargTex(gog?'rgba(120,255,140,.9)':'rgba(190,150,255,.9)'),glowC=gog?0x9dff70:0xc8a8ff;
  const vein=tex.userData.glow,skin=std({map:tex,color:gog?0x2a352d:0x332e3c,roughness:.88,metalness:.08,flatShading:true,emissive:glowC,emissiveMap:vein,emissiveIntensity:.5}),dark=std({map:tex,color:gog?0x141a16:0x18151f,roughness:.92,flatShading:true,emissive:glowC,emissiveMap:vein,emissiveIntensity:.35}),belly=std({map:tex,color:gog?0x3a463d:0x433d4d,roughness:.85,flatShading:true});
  const bone=std({color:0x17161a,roughness:.3,metalness:.35}),tooth=std({color:0xd8d2c0,roughness:.5}),mem=std({color:gog?0x090c0a:0x0b0910,roughness:.92,side:THREE.DoubleSide,emissive:gog?0x0a2a0c:0x1a0c30,emissiveIntensity:.08}),glowM=new THREE.MeshBasicMaterial({color:glowC});
  x5Rim(skin,glowC,.22,kind+'s');x5Rim(dark,glowC,.16,kind+'d');x5Rim(belly,glowC,.18,kind+'b');x5Rim(mem,glowC,.3,kind+'m');
  const SG=x5Lumpy(new THREE.IcosahedronGeometry(1,3),.09,2.2),BX=x5Lumpy(new THREE.BoxGeometry(1,1,1,3,3,3),.05,3),UP=V3(0,1,0);
  const M=(geo,mat,p,x,y,z,sx,sy,sz)=>{const m=new THREE.Mesh(geo,mat);m.position.set(x,y,z);m.scale.set(sx,sy==null?sx:sy,sz==null?sx:sz);m.castShadow=true;p.add(m);return m};
  const seg=(p,a,b,r0,r1,mat)=>{const d=b.clone().sub(a),L=d.length();const m=new THREE.Mesh(x5Lumpy(new THREE.CylinderGeometry(r1,r0,L,10,5),Math.min(r0,r1)*.16,7),mat);m.position.copy(a).addScaledVector(d,.5);m.quaternion.setFromUnitVectors(UP,d.normalize());m.castShadow=true;p.add(m);M(SG,mat,p,b.x,b.y,b.z,r1*1.08);return m};
  const spike=(p,geo,mat,x,y,z,rx,ry,rz)=>{const m=new THREE.Mesh(geo,mat);m.position.set(x,y,z);m.rotation.set(rx||0,ry||0,rz||0);m.castShadow=true;p.add(m);return m};
  const clawG=x5Horn(.05,.36,.14),spineG=x5Horn(.075,.36,.12),hornG=x5Horn(.11,.95,.55),horn2G=x5Horn(.07,.5,.25);
  /* torso, hunched */
  const torso=new THREE.Group();torso.position.set(0,1.22,0);torso.rotation.x=.34;I.add(torso);
  M(SG,skin,torso,0,.02,0,.46,.4,.4);M(SG,belly,torso,0,.46,.05,.44,.5,.37);M(SG,skin,torso,0,1.04,.02,.8,.62,.56);M(SG,skin,torso,0,1.36,-.16,.56,.4,.4);
  for(const q of[-1,1]){const pl=M(BX,skin,torso,q*.27,1.06,.4,.42,.3,.12);pl.rotation.set(-.15,q*.32,q*.12);M(SG,skin,torso,q*.84,1.3,-.02,.42,.38,.38);spike(torso,horn2G,bone,q*.98,1.58,-.02,-.2,0,-q*.75);spike(torso,spineG,bone,q*.78,1.62,-.14,-.5,0,-q*.4)}
  for(let k=0;k<6;k++)spike(torso,spineG,bone,0,1.62-k*.27,-.52+k*.035,-1.25,0,0);
  /* head */
  const nk=M(new THREE.CylinderGeometry(.24,.3,.5,9),skin,torso,0,1.56,.2,1);nk.rotation.x=.75;
  const head=new THREE.Group();head.position.set(0,1.74,.48);head.rotation.x=-.12;torso.add(head);
  M(SG,skin,head,0,0,0,.3,.27,.34);M(SG,skin,head,0,-.07,.32,.19,.14,.32);const sn=M(BX,skin,head,0,-.06,.56,.2,.13,.3);sn.rotation.x=.12;M(SG,dark,head,0,-.03,.72,.11,.08,.08);for(const q of[-1,1]){const br=M(BX,dark,head,q*.13,.11,.27,.17,.07,.22);br.rotation.set(.35,q*.25,q*.35)}const jaw=M(SG,dark,head,0,-.21,.22,.18,.085,.25);M(BX,dark,head,0,.1,.22,.52,.09,.2).rotation.x=.35;
  for(let k=0;k<6;k++){const t=spike(head,new THREE.ConeGeometry(.022,.09,5),tooth,(k-2.5)*.055,-.15,.47-Math.abs(k-2.5)*.03,Math.PI);t.castShadow=false}
  const eyes=[];for(const q of[-1,1]){const e=glowSprite(glowC,.34,1);e.position.set(q*.13,.045,.3);head.add(e);eyes.push(e);M(SG,glowM,head,q*.13,.045,.29,.035);
    spike(head,x5CurvedHorn(gog?.95:1.25,.075,gog?.35:.8,q),bone,q*.17,.2,-.02,.15,0,0);spike(head,x5CurvedHorn(.55,.045,.5,q),bone,q*.28,.04,-.06,-.1,q*.3,0);spike(head,spineG,bone,q*.2,-.2,.1,2.6,0,q*.5)}
  const gold=std({color:0x3a3426,roughness:.45,metalness:.9,emissive:glowC,emissiveIntensity:.35}),cr=new THREE.Group();cr.position.set(0,.3,-.02);head.add(cr);const tr=new THREE.Mesh(new THREE.TorusGeometry(.26,.04,6,18),gold);tr.rotation.x=Math.PI/2;cr.add(tr);
  for(let k=0;k<6;k++){const c=new THREE.Mesh(new THREE.ConeGeometry(.05,.22,4),gold);const a=k/6*TAU;c.position.set(Math.cos(a)*.26,.11,Math.sin(a)*.26);cr.add(c)}const cg=glowSprite(glowC,.8,.14);cr.add(cg);
  /* arms: long, reaching, four hooked claws */
  const arms=[];for(const q of[-1,1]){const sh=new THREE.Group();sh.position.set(q*.92,1.22,.04);torso.add(sh);const E=V3(q*.26,-.74,.06),Wp=V3(q*.16,-1.3,.56);seg(sh,V3(),E,.23,.19,skin);seg(sh,E,Wp,.21,.15,skin);M(SG,dark,sh,Wp.x,Wp.y-.04,Wp.z+.08,.2,.15,.22);
    for(let k=0;k<4;k++)spike(sh,clawG,bone,Wp.x+(k-1.5)*.085,Wp.y-.08,Wp.z+.24,2.1,0,(k-1.5)*.12);spike(sh,spineG,bone,E.x+q*.08,E.y,E.z-.16,-2,0,0);arms.push({g:sh,q})}
  /* legs: digitigrade */
  const legs=[];for(const q of[-1,1]){const L=new THREE.Group();L.position.set(q*.32,1.2,0);I.add(L);const K=V3(q*.1,-.5,.44),A=V3(q*.05,-.9,-.14),T=V3(q*.05,-1.14,.3);seg(L,V3(),K,.3,.21,skin);seg(L,K,A,.19,.12,skin);seg(L,A,T,.13,.12,dark);
    for(let k=0;k<3;k++)spike(L,clawG,bone,T.x+(k-1)*.1,T.y+.02,T.z+.08,1.75,0,(k-1)*.2);spike(L,spineG,bone,A.x,A.y+.05,A.z-.1,-2.4,0,0);legs.push({g:L,q})}
  /* tail */
  const tail=new THREE.Group();tail.position.set(0,1.12,-.3);I.add(tail);{let a=V3();for(let k=0;k<9;k++){const t=k/8,b=V3(Math.sin(t*2.4)*.35,-.5*Math.sin(t*2.2)-t*.1+t*t*.5,-(k+1)*.3);seg(tail,a,b,.2*(1-t*.85)+.02,.2*(1-(t+.11)*.85)+.02,k%2?skin:dark);a=b}spike(tail,x5Horn(.1,.4,.1),bone,a.x,a.y,a.z,-1.7,0,0)}
  /* wings: an arm, four fingers and a scalloped membrane */
  const wings=[];for(const q of[-1,1]){const Wg=new THREE.Group();Wg.position.set(q*.34,1.36,-.42);torso.add(Wg);const S0=V3(),E1=V3(q*1.05,.95,-.3),W1=V3(q*2.2,1.55,-.12),F=[V3(q*3.7,2,0),V3(q*3.85,.95,-.05),V3(q*3.3,-.1,-.1),V3(q*2,-.65,-.2),V3(q*.25,-.85,-.1)];
    seg(Wg,S0,E1,.1,.08,dark);seg(Wg,E1,W1,.08,.06,dark);for(let k=0;k<3;k++)seg(Wg,W1,F[k],.045,.018,dark);seg(Wg,E1,F[3],.045,.018,dark);spike(Wg,spineG,bone,W1.x,W1.y+.02,W1.z,0,0,-q*.5);
    const P_=[];const tri=(a,b,c)=>P_.push(a.x,a.y,a.z,b.x,b.y,b.z,c.x,c.y,c.z);const fan=(hub,a,b)=>{const m=a.clone().add(b).multiplyScalar(.5).lerp(hub,.2);tri(hub,a,m);tri(hub,m,b)};fan(W1,F[0],F[1]);fan(W1,F[1],F[2]);tri(W1,F[2],E1);fan(E1,F[2],F[3]);fan(E1,F[3],F[4]);tri(E1,F[4],S0);
    const mg=new THREE.BufferGeometry();mg.setAttribute('position',new THREE.Float32BufferAttribute(P_,3));mg.computeVertexNormals();const mm=new THREE.Mesh(mg,mem);mm.castShadow=true;Wg.add(mm);Wg.scale.setScalar(gog?.72:1.02);wings.push({g:Wg,q})}
  if(gog){torso.scale.set(1.12,1,1.12);for(const q of[-1,1]){const p=M(BX,dark,torso,q*.9,1.52,-.04,.5,.2,.6);p.rotation.z=-q*.35}}
  const pose=(e,t,mv,air,atk)=>{torso.rotation.x=.34+Math.sin(t*1.6)*.03+(atk?.28:0)-(air?.12:0);head.rotation.y=Math.sin(t*.7)*.25;head.rotation.x=-.12-(atk?.25:0);jaw.position.y=-.21-(atk?.08:0)-Math.abs(Math.sin(t*2))*.012;
    const W=gog?5:7;for(const A of arms){A.g.rotation.x=A.q*Math.sin(t*W)*.5*mv+(atk?-1.5:0)+(air?-.5:0);A.g.rotation.z=A.q*(.12+(atk?.35:0))}for(const L of legs)L.g.rotation.x=air?.55:L.q*Math.sin(t*W)*.42*mv;
    const f=air?7.5:gog?1.3:2.2,am=air?.5:.07,fold=air?.05:gog?-.5:-.25;for(const Wn of wings){Wn.g.rotation.z=Wn.q*(fold+Math.sin(t*f)*am);Wn.g.rotation.y=Wn.q*(air?-.15:gog?-.75:-.45)}
    tail.rotation.y=Math.sin(t*1.4)*.3;tail.rotation.x=Math.sin(t*.9)*.08;body.position.y=air?Math.sin(t*3)*.15:Math.abs(Math.sin(t*W))*.1*mv*s};
  pose(null,0,0,false,false);
  return{g,body,kind,crown:cr,head,anim:(e,dt,mv,l)=>{if(e.ai&&e.ai.statue)return;const rage=e.hp<e.maxhp*.5,air=e.pos.y>groundAt(e.pos.x,e.pos.z)+1.2;pose(e,e.t,Math.min(1,(mv||0)*1.4),air,e.atk>0||!!e.leap||!!e.dash);
      glowM.color.setHex(rage?0xfff0a0:glowC);for(const y of eyes)y.material.opacity=.8+Math.sin(e.t*6)*.2;cr.rotation.y+=dt*.6;cg.material.opacity=.28+Math.sin(e.t*4)*.1}}}

/* ---------- phase 2: Magog hangs in Lyra's chain, and Maëlle's hands are on it too ---------- */
function xgBind(on){if(XG.bind){scene.remove(XG.bind.g);XG.bind=null}if(!on)return;const g=new THREE.Group(),gm=new THREE.MeshBasicMaterial({color:0xffd070,transparent:true,opacity:.9,blending:THREE.AdditiveBlending,depthWrite:false});const rings=[],links=[];
  for(let k=0;k<3;k++){const t=new THREE.Mesh(new THREE.TorusGeometry(2.7-k*.3,.075,6,34),gm);g.add(t);rings.push(t)}for(let k=0;k<2;k++){const m=new THREE.Mesh(new THREE.CylinderGeometry(.1,.1,1,6,1,true),gm);g.add(m);links.push(m)}const gl=glowSprite(0xffd070,9,.22);g.add(gl);scene.add(g);XG.bind={g,rings,links,gl,st:2}}
function xgBindTick(dt){const Bd=XG.bind,m=XG.mag;if(!Bd||!m||m.dead)return;const c=eCenter(m),up=V3(0,1,0);Bd.st-=dt;const strain=Bd.st<.35;if(Bd.st<=0){Bd.st=rand(1.8,3);sx('chain',.35,null,{rate:rand(.8,1.2)});flash(c,0xffd070,10);P.shake=Math.max(P.shake,.25)}
  Bd.rings.forEach((r,k)=>{r.position.copy(c);r.rotation.set(k*1.05+time*.9*(k%2?1:-1),time*.6+k,0);r.scale.setScalar(strain?1.12:1+Math.sin(time*5+k)*.03)});Bd.gl.position.copy(c);
  const src=[LYR.a?headOf(LYR.a.g.position,1.25):null,X3.mPos?headOf(X3.mPos,1.2):null];Bd.links.forEach((l,k)=>{const a=src[k];l.visible=!!a;if(!a)return;const d=c.clone().sub(a),L=d.length();l.position.copy(a).addScaledVector(d,.5);l.quaternion.setFromUnitVectors(up,d.normalize());l.scale.set(1+Math.sin(time*30+k)*.25,L,1);
    if(Math.random()<.6)SP.emit(a.clone().lerp(c,Math.random()),{c0:0xffffff,c1:0xffb030,s0:.35,s1:.03,life:.4,speed:1.5});if(Math.random()<.3)SP.emit(a,{c0:0xfff6c8,c1:0xffb030,s0:.3,s1:.03,life:.6,up:1})});
  const sh=strain?2.2:1;m.m.g.rotation.z=Math.sin(time*11)*.11*sh;m.m.g.rotation.x=Math.sin(time*7.3)*.09*sh;m.pos.x+=Math.sin(time*23)*.02*sh;if(Math.random()<.25)SP.emit(c.clone().add(V3(rand(-2,2),rand(-2,2),rand(-2,2))),{c0:0xffffff,c1:0xc8a8ff,s0:.4,s1:.04,life:.4,speed:4})}
{const _p2=xgPhase2;xgPhase2=function(){const m=XG.mag;const hang=uP(10,174,5.6);try{m.ai.perch=hang.clone();m.pos.copy(hang);xgBind(true)}catch(x){console.warn(x)}
    const lp=LYR.a?LYR.a.g.position.clone():uP(8.2,160.6);
    playCutscene([{who:'Lyra',text:XL3.lw_14,fov:52,cut:true,cam:k=>({pos:V3(lp.x+3.2-k,1.3,lp.z+5.5),look:V3(hang.x,hang.y-.6,hang.z)}),onStart:()=>{x5Impact(70,.1);sx('chain',.9);sx('shield',.5);flash(hang,0xffd070,26);x5Banner('MAGOG CHAINED','LYRA AND MAËLLE HOLD THE LINE','#ffd890',1.9,'#1a1206')},update:dt=>{xgBindTick(dt)}}],()=>{try{_p2()}catch(x){console.warn(x)}if(m&&m.ai)m.ai.perch=hang.clone()})}}
{const _bk=xgBack;xgBack=function(){const was=XG.ph;const r=_bk.apply(this,arguments);if(XG.ph!==was){xgBind(false);if(XG.mag){XG.mag.m.g.rotation.z=0;XG.mag.m.g.rotation.x=0}}return r}}
{const _gr=x5GReset;x5GReset=function(){xgBind(false);return _gr.apply(this,arguments)}}
{const _gt=x5GTick;x5GTick=function(dt){const r=_gt.apply(this,arguments);if(XG.ph===2&&XG.bind&&!CS.active)xgBindTick(dt);return r}}

/* ---------- the run out: fissures of green fire and beams that come down across the way ---------- */
{const _ct=x5CTick;x5CTick=function(dt,s){_ct.apply(this,arguments);if(!X5.fiss)return;const run=CH2.st===20&&XC.ph===2&&!CS.active;
    for(const f of X5.fiss){f.m.material.opacity=.4+Math.sin(time*9+f.s)*.15;if(Math.abs(s-f.s)<60&&Math.random()<.6)FL.emit(uP(f.lx+rand(-f.w/2,f.w/2),f.s,f.y+.2),{n:1,c0:0xe0ffd8,c1:0x20a040,s0:.9,s1:.1,life:.7,up:3.2,jitter:.2});
      if(run&&Math.abs(s-f.s)<1.2&&Math.abs(P.pos.x-uX(f.lx))<f.w/2&&P.pos.y<f.y+1.5){XC.fT=(XC.fT||0)-dt;if(XC.fT<=0){XC.fT=.45;damagePlayer(x5Dmg(11));P.shake=Math.max(P.shake,.4)}}}
    if(!run)return;XC.pk=(XC.pk===undefined?4:XC.pk)-dt;if(XC.pk<=0&&s>296&&s<UE-36){XC.pk=DIFF==='easy'?4.4:2.9;const ss=s+rand(13,19),hw=uSec(ss).hw,y=uFloor(ss),a=uP(-hw,ss,y),b=uP(hw,ss,y);
      lineTelegraph(a,b,2.8,1,0xfff0d0,()=>{const m=new THREE.Mesh(new THREE.BoxGeometry(hw*2,1.1,1.5),x5Mats().stone);m.position.copy(uP(0,ss,y+.55));m.rotation.z=rand(-.08,.08);scene.add(m);addFx(m,2.4,(f,k)=>{m.position.y=y+.55-Math.max(0,k-.75)*6},()=>{scene.remove(m);m.geometry.dispose()});
        SM.emit(uP(0,ss,y+.6),{n:26,c0:0x9aa098,c1:0x1c201c,s0:1.6,s1:5,life:1.1,a:.55,speed:5});sx('impact',.6,null,{rate:rand(.6,.85)});P.shake=Math.max(P.shake,.6);if(Math.abs(uS(P.pos.z)-ss)<1.7&&P.pos.y<y+2.1){damagePlayer(x5Dmg(20));x5Punch(8,.3)}})}}}
{const _cc=xcChase;xcChase=function(){XC.pk=5;XC.fT=0;return _cc.apply(this,arguments)}}

/* =====================================================================================
   the mirror, second pass: your whole spellbook, your broom, a cage of glass, your limit breaker
   ===================================================================================== */
const xd=b=>x5Dmg(b)*(XO.mir&&XO.mir.lb?1.6:1);
function xmName(e,n,col){floatText(headOf(e.pos,2.5+(e.pos.y-groundAt(e.pos.x,e.pos.z))),n,col||'#d4b6ff');try{e.m.actor.fire('Spell_Simple_Shoot',.35)}catch(x){}}
function xmLob(a,b,col,dur,arc){const s=glowSprite(col,1.6,1,false);scene.add(s);addFx(s,dur,(f,k)=>{s.position.copy(a).lerp(b,k);s.position.y+=Math.sin(k*Math.PI)*(arc||0);if(Math.random()<.8)FL.emit(s.position,{n:1,c0:0xffffff,c1:col,s0:.6,s1:.05,life:.4})},()=>scene.remove(s))}
function xmFireball(e){const p=P.pos.clone();p.y=groundAt(p.x,p.z);xmName(e,'FIREBALL','#ff8a3c');xmLob(eCenter(e),V3(p.x,p.y+.6,p.z),0xff8a3c,.7,2.5);telegraph(p,3.3,.7,0xff8a3c,()=>{fireBurst(V3(p.x,p.y+.6,p.z),3.2,true);sfx.boom&&sfx.boom();if(playerIn(p,3.5,4)){damagePlayer(xd(22));P.shake=Math.max(P.shake,.6)}})}
function xmMeteor(e){const p=P.pos.clone();p.y=groundAt(p.x,p.z);xmName(e,'METEOR','#ff5a3c');xmLob(V3(p.x+8,p.y+34,p.z+4),V3(p.x,p.y+.5,p.z),0xff5a3c,1.15,0);telegraph(p,4.8,1.15,0xff5a3c,()=>{fireBurst(V3(p.x,p.y+.8,p.z),5,true);ring(p,0xff5a3c,1,9,.5);sfx.boom&&sfx.boom();P.shake=Math.max(P.shake,1);x5Punch(8,.3);if(playerIn(p,5,5))damagePlayer(xd(34))})}
function xmSky(e,n,col,name,hex,r,dmg){xmName(e,name,hex);for(let k=0;k<n;k++)after(k*.17,()=>{if(e.dead||XO.ph!==2)return;const p=k===0?P.pos.clone():V3(P.pos.x+rand(-9,9),0,P.pos.z+rand(-9,9));p.y=groundAt(p.x,p.z);telegraph(p,r,.85,col,()=>{xoBeam(V3(p.x,p.y+32,p.z),V3(p.x,p.y,p.z),col,.35,.5);flash(V3(p.x,p.y+1,p.z),col,10);SP.emit(V3(p.x,p.y+.5,p.z),{n:30,c0:0xffffff,c1:col,speed:8,life:.5,s0:.4,s1:.04});sx('laser',.25,null,{rate:rand(.7,1.1)});if(playerIn(p,r+.2,5))damagePlayer(xd(dmg))})})}
function xmLance(e){const o=V3(e.pos.x,groundAt(e.pos.x,e.pos.z),e.pos.z),f=V3(P.pos.x-o.x,0,P.pos.z-o.z).normalize(),to=o.clone().addScaledVector(f,40);xmName(e,'ICE LANCE','#8fe3ff');lineTelegraph(o,to,2.3,.6,0x8fe3ff,()=>{if(e.dead)return;xoBeam(eCenter(e),headOf(to,1.2),0x8fe3ff,.4,.5);sx('laser',.4,null,{rate:1.5});if(distToSeg(P.pos,o,to)<1.5&&P.pos.y<o.y+4){damagePlayer(xd(24));P.chilled=2.5;frostBurst(headOf(P.pos,1),20)}})}
function xmNova(e){const p=e.pos.clone();p.y=groundAt(p.x,p.z);xmName(e,'GLACIAL NOVA','#bff2ff');telegraph(p,8,.8,0xbff2ff,()=>{if(e.dead)return;frostBurst(headOf(p,1),70);ring(p,0xbff2ff,1,8,.4);sx('shbreak',.6);if(playerIn(p,8.2,4)){damagePlayer(xd(24));P.chilled=3}})}
/* her broom: she rides it standing, like you never dared */
{const _g=xoMirrorGo;xoMirrorGo=function(p){const e=_g(p);try{const b=new THREE.Group(),wood=std({color:0x2a1810,roughness:.7});const st=new THREE.Mesh(new THREE.CylinderGeometry(.035,.045,2.4,7),wood);st.rotation.x=Math.PI/2;b.add(st);const br=new THREE.Mesh(new THREE.ConeGeometry(.24,.8,9,1,true),std({color:0x0e0a12,roughness:.9,side:THREE.DoubleSide,emissive:0x1a6a2a,emissiveIntensity:.25}));br.rotation.x=-Math.PI/2;br.position.z=-1.5;b.add(br);const gl=glowSprite(0x7dff9a,2.4,.4);gl.position.z=-1.7;b.add(gl);b.position.y=.04;b.visible=false;e.m.g.add(b);e.m.broom=b}catch(x){console.warn(x)}
    e.lb=0;XO.tn={};XO.cl=0;XO.clT=0;return e}}
BOSSAI.xmirror=function(e,dt,d){const a=e.ai,B=XO.B;if(a.m0===undefined){a.m0=1;a.a1=1.4;a.a2=3;a.a3=5;a.a4=4;a.a5=7;a.a6=10;a.cp=0;a.fl=13;a.n=0}const gy=groundAt(e.pos.x,e.pos.z);
  if(XO.clash||XO.tube){e.pos.y=lerp(e.pos.y,gy,Math.min(1,dt*6));return}const rage=e.hp<e.maxhp*.5,sp=dt*(e.lb?1.55:1)*(DIFF==='easy'?.8:1);a.a1-=sp;a.a2-=sp;a.a3-=sp;a.a4-=sp;a.a5-=sp;a.a6-=sp;a.cp-=dt;a.fl-=dt;
  const c=eCenter(e),dir=V3(P.pos.x-c.x,(P.pos.y+1.1)-c.y,P.pos.z-c.z).normalize();
  const bolts=n=>{for(let k=0;k<n;k++){const off=(k-(n-1)/2)*.2,dd=V3(dir.x*Math.cos(off)-dir.z*Math.sin(off),dir.y,dir.x*Math.sin(off)+dir.z*Math.cos(off));enemyOrb(c,dd,20,xd(13),0xd4b6ff,.3,{keepY:true})}sx('laser',.25,null,{rate:1.2});try{e.m.actor.fire('Spell_Simple_Shoot',.3)}catch(x){}};
  if(a.fly){const F=a.fly;F.t+=dt;F.ang+=dt*.6*F.dir;const tx=clamp(P.pos.x+Math.sin(F.ang)*13,B.x0+2,B.x1-2),tz=clamp(P.pos.z+Math.cos(F.ang)*13,B.z0+2,B.z1-2);e.pos.x=lerp(e.pos.x,tx,Math.min(1,dt*2.4));e.pos.z=lerp(e.pos.z,tz,Math.min(1,dt*2.4));e.pos.y=lerp(e.pos.y,gy+10+Math.sin(F.t*2)*.9,Math.min(1,dt*2.2));
    e.m.g.rotation.y=Math.atan2(dir.x,dir.z);if(Math.random()<.7)SP.emit(V3(e.pos.x,e.pos.y,e.pos.z),{c0:0xffffff,c1:0x7dff9a,s0:.4,s1:.04,life:.6,speed:1});
    F.c-=dt;if(F.c<=0&&e.pos.y>gy+6){F.c=rage?1:1.35;F.n++;const r=F.n%4;if(r===1)xmSky(e,rage?9:6,0xffe08a,'STARFALL','#ffe08a',2.6,18);else if(r===3)xmMeteor(e);else bolts(rage?5:3)}
    if(F.t>F.dur){a.fly=null;const p=P.pos.clone();p.y=groundAt(p.x,p.z);xmName(e,'DIVE','#7dff9a');telegraph(p,5,.85,0x7dff9a,()=>{if(e.dead)return;e.pos.set(clamp(p.x,B.x0+2,B.x1-2),p.y,clamp(p.z,B.z0+2,B.z1-2));if(e.m.broom)e.m.broom.visible=false;ring(p,0x7dff9a,1,10,.45);SM.emit(V3(p.x,p.y+1,p.z),{n:30,c0:0x4a5a4e,c1:0x06100a,s0:2,s1:6,life:1.2,a:.6,speed:7});sx('impact',.8);P.shake=Math.max(P.shake,.9);x5Punch(9,.3);if(playerIn(p,5.2,4))damagePlayer(xd(30))});e.busy=1.1;a.fl=rage?rand(11,15):rand(15,20)}return}
  e.pos.y=lerp(e.pos.y,gy,Math.min(1,dt*8));if(e.pos.y<gy+.4&&e.m.broom&&e.m.broom.visible)e.m.broom.visible=false;if(e.busy>0)return;e.m.g.rotation.y=Math.atan2(dir.x,dir.z);
  if(a.fl<=0&&!e.invuln){a.fl=99;a.fly={t:0,ang:Math.atan2(e.pos.x-P.pos.x,e.pos.z-P.pos.z),dir:Math.random()<.5?-1:1,c:1.3,n:0,dur:rage?9:7};if(e.m.broom)e.m.broom.visible=true;xmName(e,'BROOM','#7dff9a');sx('wind',.6,null,{rate:1.4});flash(c,0x7dff9a,10);return}
  if(a.cp<=0&&performance.now()-XO.lastT<220){a.cp=2.2;enemyOrb(c,dir,23,xd(13),0xd4b6ff,.34,{keepY:true});xmName(e,'MIRRORED','#7dff9a');sx('laser',.3,null,{rate:1.6});return}
  if(rage&&a.a6<=0){a.a6=11;e.busy=1;xmSky(e,7,0xcfe0ff,'THUNDERSTORM','#cfe0ff',2.7,20);return}
  if(a.a5<=0){a.a5=rage?6:8.5;e.busy=.8;xmMeteor(e);return}
  if(a.a4<=0&&d>5){a.a4=rage?3.6:5.2;e.busy=.75;xmLance(e);return}
  if(a.a3<=0&&d<9){a.a3=rage?5:7;e.busy=.95;xmNova(e);return}
  if(a.a2<=0&&(d<6||Math.random()<.5)){a.a2=rage?2.4:3.8;xmBlink(e);a.a1=Math.min(a.a1,.3);return}
  if(a.a1<=0){a.a1=rage?.95:1.4;a.n++;if(a.n%3===2){e.busy=.5;xmFireball(e)}else bolts(rage?3:1)}};

/* ---------- the glass tube: nowhere to go, so go nowhere, and go through ---------- */
function xmWave(c,v,stall){const g=new THREE.Group();g.position.set(c.x,c.y+.5,c.z);const t1=new THREE.Mesh(new THREE.TorusGeometry(1,.035,6,56),new THREE.MeshBasicMaterial({color:0xff6a20,transparent:true,opacity:.95,blending:THREE.AdditiveBlending,depthWrite:false}));t1.rotation.x=Math.PI/2;g.add(t1);
  const t2=new THREE.Mesh(new THREE.CylinderGeometry(1,1,2.2,56,1,true),new THREE.MeshBasicMaterial({color:0xc01808,transparent:true,opacity:.3,blending:THREE.AdditiveBlending,depthWrite:false,side:THREE.DoubleSide}));t2.position.y=.6;g.add(t2);scene.add(g);return{g,r:19,v,stall,done:0}}
function xmTube(e,lvl){const mp=P.pos.clone();mp.y=groundAt(mp.x,mp.z);const B=XO.B,T={t:0,e,mp,cd:0,ph:0,waves:[],n:0,max:(lvl?9:6)+(DIFF==='hard'?2:0),next:2.2,hit:0,lvl};XO.tube=T;P.flying=false;P.vy=0;P.heroAnim='Spell_Simple_Idle_Loop';for(const p of eProjs)scene.remove(p.s);eProjs.length=0;
  e.invuln=true;e.busy=999;e.ai.fly=null;if(e.m.broom)e.m.broom.visible=false;const cx=(B.x0+B.x1)/2,cz=(B.z0+B.z1)/2,dv=V3(cx-mp.x,0,cz-mp.z);if(dv.length()<4)dv.set(-1,0,0);dv.normalize();e.pos.set(clamp(mp.x+dv.x*13,B.x0+2,B.x1-2),0,clamp(mp.z+dv.z*13,B.z0+2,B.z1-2));try{e.m.actor.setBase('Spell_Simple_Idle_Loop',.2)}catch(x){}
  const g=new THREE.Group();g.position.copy(mp);const cm=new THREE.MeshBasicMaterial({color:0x9fd8ff,transparent:true,opacity:.13,blending:THREE.AdditiveBlending,depthWrite:false,side:THREE.DoubleSide});g.add(new THREE.Mesh(new THREE.CylinderGeometry(1.7,1.7,7,36,1,true),cm));g.children[0].position.y=3.5;
  const rm=new THREE.MeshBasicMaterial({color:0xd8f0ff,transparent:true,opacity:.8,blending:THREE.AdditiveBlending,depthWrite:false});for(const y of[.06,2.4,4.8,7]){const r=new THREE.Mesh(new THREE.TorusGeometry(1.7,.035,6,48),rm);r.rotation.x=Math.PI/2;r.position.y=y;g.add(r)}const rn=decal(runeTex,0x9fd8ff,4.4,true,.7);rn.position.y=.1;g.add(rn);scene.add(g);T.g=g;T.cm=cm;T.rn=rn;
  x5Impact(80,.12);sx('cageform',.9);sx('shield',.6);flash(headOf(mp,1.2),0x9fd8ff,20);x5Banner('TRAPPED',(typeof isTouch!=='undefined'&&isTouch?'TAP BLINK':'PRESS F')+' AS THE FIRE REACHES YOU','#9fd8ff',2.6,'#06121a');x5Say('???','mm_05',1);
  toast('You cannot move. <b>Blink on the spot</b> just as each ring of fire reaches you to phase through it.','The glass tube',true)}
function xmPhase(){const T=XO.tube;if(!T||T.cd>0)return;T.cd=.55;T.ph=.3;try{sfx.blink()}catch(x){}flash(headOf(T.mp,1.1),0x9fd8ff,7);SP.emit(headOf(T.mp,1),{n:24,c0:0xffffff,c1:0x9fd8ff,speed:5,life:.4,s0:.4,s1:.04});vib(15)}
function xmTubeEnd(ok){const T=XO.tube;if(!T)return;XO.tube=null;scene.remove(T.g);for(const w of T.waves)scene.remove(w.g);P.heroAnim=null;P.invuln=1.2;try{W.g.visible=true}catch(x){}const e=T.e;if(!e||e.dead)return;e.invuln=false;try{e.m.actor.setBase('Idle_Loop',.2)}catch(x){}
  if(!ok){e.busy=.8;return}sx('cagebreak',.9);x5Impact(70,.1);SP.emit(headOf(T.mp,2),{n:120,c0:0xffffff,c1:0x9fd8ff,speed:13,life:.9,s0:.5,s1:.05});if(T.hit===0){x5Banner('UNTOUCHED','SHE IS WIDE OPEN','#9fd8ff',1.7,'#06121a');e.busy=3.2;try{e.m.actor.setBase('Crouch_Idle_Loop',.2)}catch(x){}after(3.2,()=>{try{if(!e.dead)e.m.actor.setBase('Idle_Loop',.2)}catch(x){}})}else{x5Banner('FREE','','#9fd8ff',1.2,'#06121a');e.busy=1.2}}
function xmTubeTick(dt){const T=XO.tube,e=T.e;if(!e||e.dead||!P.alive){xmTubeEnd(false);return}T.t+=dt;T.cd-=dt;T.ph-=dt;P.pos.copy(T.mp);P.vy=0;P.flying=false;P.face=Math.atan2(e.pos.x-P.pos.x,e.pos.z-P.pos.z);e.m.g.rotation.y=P.face+Math.PI;
  T.cm.opacity=.11+Math.sin(time*4)*.03+(T.ph>0?.25:0);T.rn.rotation.z+=dt;try{W.g.visible=!(T.ph>0&&Math.sin(time*90)>0)}catch(x){}
  T.next-=dt;if(T.next<=0&&T.n<T.max){T.n++;const fast=T.n%3===0,ez=DIFF==='easy'?1.25:1;T.next=(fast?.8:rand(1.2,1.8))*ez;T.waves.push(xmWave(T.mp,(fast?21:rand(10,14))/ez,T.n%4===2));try{e.m.actor.fire('Spell_Simple_Shoot',.3)}catch(x){}sx('wtf',.25,null,{rate:rand(.8,1.2)})}
  for(let i=T.waves.length-1;i>=0;i--){const w=T.waves[i];w.r-=w.v*dt*(w.stall?(w.r<9&&w.r>6.5?.22:1.5):1);const r=Math.max(.05,w.r);w.g.scale.set(r,1,r);for(let k=0;k<5;k++){const an=Math.random()*TAU;FL.emit(V3(T.mp.x+Math.cos(an)*r,T.mp.y+.4,T.mp.z+Math.sin(an)*r),{n:1,c0:0xffc070,c1:0x500000,s0:1.1,s1:.1,life:.5,up:3,jitter:.15})}if(Math.random()<.5){const an=Math.random()*TAU;SM.emit(V3(T.mp.x+Math.cos(an)*r,T.mp.y+1.4,T.mp.z+Math.sin(an)*r),{c0:0x1a0606,c1:0x000000,s0:1,s1:3,life:.8,a:.5,up:1.5})}
    if(w.r<=1.6&&!w.done){w.done=1;if(T.ph>0){floatText(headOf(T.mp,2.3),'PHASED','#9fd8ff');sx('ding',.5,null,{rate:1.4})}else{T.hit++;P.invuln=0;damagePlayer(xd(17));fireBurst(headOf(T.mp,1),2,false);x5Punch(8,.3);P.shake=Math.max(P.shake,.7)}}
    if(w.r<=.1){scene.remove(w.g);T.waves.splice(i,1)}}
  if(T.n>=T.max&&!T.waves.length)xmTubeEnd(true)}
{const _b=blink;blink=function(){if(XO.tube){xmPhase();return}if(XO.clash)return;return _b.apply(this,arguments)}}
{const _tc=tryCast;tryCast=function(i){if(XO.tube)return;return _tc.apply(this,arguments)}}

/* ---------- the clash: mash, then the runes, then mash again ---------- */
function xmQUI(){let u=document.getElementById('xmQ');if(u)return u;const st=document.createElement('style');st.textContent=`#xmQ{position:fixed;left:50%;bottom:30%;white-space:nowrap;transform:translateX(-50%);z-index:40;display:none;text-align:center;font-family:'Bangers',Impact,sans-serif;color:#fff;pointer-events:none;user-select:none}
#xmQ.show{display:block}#xmQ b{display:block;font-size:clamp(22px,3.4vw,40px);letter-spacing:.12em;font-weight:400;text-shadow:3px 3px 0 #000,-1px -1px 0 #000;margin-bottom:8px;transform:skew(-8deg)}
#xmQ .bar{width:min(70vw,440px);height:18px;margin:0 auto 10px;border:3px solid #fff;background:rgba(0,0,0,.6);transform:skew(-14deg);box-shadow:4px 4px 0 #000}#xmQ .bar i{display:block;height:100%;width:50%;background:linear-gradient(90deg,#7dff9a,#fff 50%,#c9a6ff)}
#xmQ .tm{width:min(70vw,440px);height:5px;margin:0 auto 10px;background:rgba(255,255,255,.2)}#xmQ .tm i{display:block;height:100%;background:#ff5060}
#xmQ .trk{position:relative;width:min(70vw,440px);height:30px;margin:0 auto 12px;border:3px solid #fff;background:rgba(0,0,0,.65);transform:skew(-14deg);box-shadow:4px 4px 0 #000;display:none}#xmQ.tim .trk{display:block}#xmQ.tim .bar{display:none}#xmQ .trk em{position:absolute;top:0;bottom:0;background:linear-gradient(90deg,#c9a6ff,#fff,#7dff9a);box-shadow:0 0 14px #fff}#xmQ .trk s{position:absolute;top:-8px;bottom:-8px;width:5px;margin-left:-2px;background:#ff3050;box-shadow:0 0 10px #ff3050}
#xmQ .keys{min-height:58px}#xmQ .keys span{display:inline-block;width:50px;height:50px;line-height:50px;margin:0 5px;font-size:32px;border:3px solid #fff;background:rgba(10,6,18,.8);box-shadow:3px 3px 0 #000;transform:skew(-8deg)}
#xmQ .keys span.d{background:#7dff9a;color:#06120a;border-color:#7dff9a}#xmQ .keys span.c{background:#c9a6ff;color:#12061e;transform:skew(-8deg) scale(1.25)}
#xmQ .pad{margin-top:10px;pointer-events:auto}#xmQ .pad button{font:inherit;font-size:22px;width:54px;height:48px;margin:0 3px;border:2px solid #fff;background:rgba(10,6,18,.75);color:#fff;border-radius:8px}#xmQ .pad button.mash{width:120px;background:#c9a6ff;color:#12061e}`;document.head.appendChild(st);
  u=document.createElement('div');u.id='xmQ';u.innerHTML='<b></b><div class="bar"><i></i></div><div class="tm"><i></i></div><div class="trk"><em></em><s></s></div><div class="keys"></div><div class="pad"><button data-k=" " class="mash">SPACE</button></div>';document.body.appendChild(u);
  u.querySelectorAll('button').forEach(b=>b.addEventListener('pointerdown',ev=>{ev.preventDefault();ev.stopPropagation();xmQKey(b.dataset.k)}));
  window.addEventListener('keydown',ev=>{if(!XO.clash)return;const c=ev.code,k=c==='Space'||c==='Enter'?' ':null;if(c==='Escape')return;ev.preventDefault();ev.stopImmediatePropagation();if(k&&!ev.repeat)xmQKey(k)},true);return u}
const XMG={W:'▲',A:'◀',S:'▼',D:'▶'};
function xmQStage(C,st){C.st=st;C.v=st===2?.25:0;const hard=DIFF==='hard',ez=DIFF==='easy';C.tl=C.tl0=st===1?(ez?9:hard?6:7.5):(ez?6:4.5);const u=xmQUI();u.classList.add('show');const ks=u.querySelector('.keys');ks.innerHTML='';
  u.classList.toggle('tim',st===1);if(st===1){C.seq=[0,0,0];C.si=0;C.nd=0;C.nv=ez?.75:hard?1.35:1.05;C.zw=ez?.2:hard?.11:.15;xmQZone(C);for(let k=0;k<3;k++){const s=document.createElement('span');s.textContent='✦';ks.appendChild(s)}ks.children[0].className='c';sx('rune',.6)}
  u.querySelector('b').textContent=st===0?'MASH SPACE!':st===1?'STRIKE IN THE LIGHT!  SPACE':'FINISH IT! MASH SPACE!';x5Impact(50,.05);x5Punch(8,.25)}
function xmQZone(C){C.zc=rand(.2+C.zw/2,.8-C.zw/2);const em=xmQUI().querySelector('.trk em');em.style.left=((C.zc-C.zw/2)*100)+'%';em.style.width=(C.zw*100)+'%'}
function xmQKey(k){const C=XO.clash;if(!C||C.over)return;if(k!==' ')return;if(C.st===1){const ks=xmQUI().querySelector('.keys');if(C.cool>0)return;
    if(Math.abs(C.nd-C.zc)<=C.zw/2){ks.children[C.si].className='d';C.si++;sx('rune',.6,null,{rate:1+C.si*.12});x5Impact(40,.05);x5Punch(7,.2);flash(headOf(P.pos,1.3),0xffffff,10);C.nv*=1.18;if(C.si>=3)xmQStage(C,2);else{ks.children[C.si].className='c';xmQZone(C)}}
    else{C.tl-=.7;C.cool=.35;P.shake=Math.max(P.shake,.5);sx('impact',.3,null,{rate:1.6});xmQUI().querySelector('.trk').animate([{transform:'skew(-14deg) translateX(-8px)'},{transform:'skew(-14deg) translateX(8px)'},{transform:'skew(-14deg)'}],{duration:180})}return}
  C.v+=C.st===0?(DIFF==='easy'?.1:.085):(DIFF==='easy'?.085:.07);x5Punch(3,.1)}
function xmClash(e){const mp=P.pos.clone();P.flying=false;P.vy=0;mp.y=groundAt(mp.x,mp.z);const C={t:0,k:.5,n:0,e,mp,b:[],st:0,v:0,pr:.5};XO.clash=C;e.busy=99;e.invuln=true;e.ai.fly=null;if(e.m.broom)e.m.broom.visible=false;e.pos.y=groundAt(e.pos.x,e.pos.z);for(const p of eProjs)scene.remove(p.s);eProjs.length=0;P.invuln=20;P.heroAnim='Spell_Simple_Idle_Loop';try{e.m.actor.setBase('Spell_Simple_Idle_Loop',.2)}catch(x){}
  const mk=col=>{const m=new THREE.Mesh(new THREE.CylinderGeometry(.34,.34,1,14,1,true),new THREE.MeshBasicMaterial({color:col,transparent:true,opacity:.85,blending:THREE.AdditiveBlending,depthWrite:false,side:THREE.DoubleSide}));scene.add(m);return m};C.b=[mk(0xb070ff),mk(0x7dff9a)];C.orb=glowSprite(0xffffff,6,1);scene.add(C.orb);
  x5Impact(90,.14);x5VS('MAËLLE','MAËLLE','#c9a6ff','#7dff9a','CLASH');sx('dcharge',1);sx('riser',.8);x5Say('@','mw_17',1);xmQStage(C,0)}
function xmClashEnd(win){const C=XO.clash;if(!C)return;XO.clash=null;const u=document.getElementById('xmQ');if(u)u.classList.remove('show');for(const b of C.b){scene.remove(b);b.geometry.dispose()}scene.remove(C.orb);P.heroAnim=null;P.invuln=1.5;const e=C.e;if(!e||e.dead)return;e.invuln=false;const c=eCenter(e);
  if(win){x5Impact(110,.2);x5Punch(16,.5);P.shake=1.4;flash(c,0xffffff,30);ring(e.pos,0xc9a6ff,1,14,.5);SP.emit(c,{n:160,c0:0xffffff,c1:0xb070ff,speed:15,life:1,s0:.7,s1:.05});sx('skyshatter',.8);x5Banner('BROKEN','IT CANNOT HOLD YOUR SHAPE','#c9a6ff',1.8);e.hp=Math.max(e.maxhp*e.hpFloor,e.hp-e.maxhp*.14);e.busy=2.8;try{e.m.actor.setBase('Crouch_Idle_Loop',.2)}catch(x){}after(2.8,()=>{try{if(!e.dead)e.m.actor.setBase('Idle_Loop',.2)}catch(x){}})}
  else{x5Impact(90,.14);P.shake=1.2;flash(headOf(P.pos,1),0x7dff9a,24);P.invuln=0;damagePlayer(maxHP()*.3);P.invuln=1.5;x5Banner('OVERPOWERED','IT KNOWS YOUR SPELLS','#7dff9a',1.6);e.busy=1;XO.cl=0;XO.clT=16;try{e.m.actor.setBase('Idle_Loop',.2)}catch(x){}}}
function xmClashTick(dt){const C=XO.clash,e=C.e;if(!e||e.dead||!P.alive){xmClashEnd(false);return}C.t+=dt;C.tl-=dt;const hard=DIFF==='hard';if(C.st!==1){C.v=Math.max(0,C.v-dt*(C.st===0?(hard?.3:.22):(hard?.4:.3)));if(C.v>=1){if(C.st===0)xmQStage(C,1);else{xmClashEnd(true);return}}}
  if(C.tl<=0){xmClashEnd(false);return}const tgt=C.st===0?.42+.2*C.v:C.st===1?.62+.16*(C.si/C.seq.length):.78+.22*C.v;C.pr=lerp(C.pr,tgt,Math.min(1,dt*6));
  const u=xmQUI();if(C.st===1){C.cool=Math.max(0,(C.cool||0)-dt);C.nd+=dt*C.nv*(C.dir||1);if(C.nd>1){C.nd=1;C.dir=-1}if(C.nd<0){C.nd=0;C.dir=1}u.querySelector('.trk s').style.left=(C.nd*100)+'%'}u.querySelector('.bar i').style.width=(C.st===1?C.si/C.seq.length*100:C.v*100)+'%';u.querySelector('.tm i').style.width=Math.max(0,C.tl/C.tl0*100)+'%';
  P.pos.x=C.mp.x;P.pos.z=C.mp.z;P.pos.y=C.mp.y;P.vy=0;P.flying=false;P.face=Math.atan2(e.pos.x-P.pos.x,e.pos.z-P.pos.z);e.m.g.rotation.y=P.face+Math.PI;
  const A=headOf(P.pos,1.3),Bp=eCenter(e),M=A.clone().lerp(Bp,clamp(C.pr,.04,.97)),up=V3(0,1,0);const put=(m,a,b)=>{const d=b.clone().sub(a),L=d.length()||.01;m.position.copy(a).addScaledVector(d,.5);m.quaternion.setFromUnitVectors(up,d.normalize());const w=1+Math.sin(time*40)*.15;m.scale.set(w,L,w)};put(C.b[0],A,M);put(C.b[1],Bp,M);
  C.orb.position.copy(M);C.orb.scale.setScalar(5+Math.sin(time*30)*1.2);SP.emit(M,{n:4,c0:0xffffff,c1:Math.random()<.5?0xb070ff:0x7dff9a,speed:9,life:.4,s0:.5,s1:.05});P.shake=Math.max(P.shake,.35);camera.fov=lerp(camera.fov,52+Math.sin(time*22)*1.5,Math.min(1,dt*4));camera.updateProjectionMatrix()}

/* ---------- her limit breaker (black, with a little red in it), and yours ---------- */
function xmLB(e){e.lb=1;e.invuln=true;e.busy=3;e.ai.fly=null;if(e.m.broom)e.m.broom.visible=false;const c=eCenter(e);x5Impact(120,.2);x5Punch(16,.5);P.shake=1.3;sx('ktf',.9,null,{rate:.7});sx('skyshatter',.6,null,{rate:.6});x5Banner('LIMIT BREAKER','THE CROWN BURNS YOUR FURY BLACK','#ff3040',2.4,'#000');x5Say('???','mm_06',1);
  ring(e.pos,0x200408,1,16,.6);flash(c,0xff2030,14);SM.emit(c,{n:60,c0:0x1a0408,c1:0x000000,s0:2,s1:8,life:1.8,a:.8,speed:9});try{e.m.actor.setBase('Spell_Simple_Idle_Loop',.2)}catch(x){}
  const au=glowSprite(0xff2030,4.2,.16);au.position.y=1.1;e.m.g.add(au);e.m.aura=au;try{e.m.g.traverse(o=>{if((o.isMesh||o.isSkinnedMesh)&&o.material&&o.material.emissive&&!o.material.transparent){o.material=o.material.clone();o.material.emissive.setHex(0x1a0206);o.material.color.multiplyScalar(.55)}});e.xo.L=xoGreyList(e.m.g)}catch(x){}
  after(2.3,()=>{if(e.dead||XO.ph!==2)return;e.invuln=false;e.busy=.3;try{e.m.actor.setBase('Idle_Loop',.2)}catch(x){}if(!P.alive)return;x5Impact(90,.14);x5Banner('LIMIT BREAKER','MAËLLE','#ffd060',2,'#1a1206');x5Say('@','mw_26',1);try{witchLimitBreak(true)}catch(x){console.warn(x)}})}

/* ---------- the smoke takes the last shape it has: yours ---------- */
function xoMirror(){if(CS.active){after(.3,xoMirror);return}const old=XO.e;if(!old)return;XO.ph=1.8;sayHush();xoClear(old);$('boss').classList.add('hidden');bossRef=null;old.invuln=true;old.busy=999;const B=XO.B,p=old.pos.clone();p.y=groundAt(p.x,p.z);try{old.m.actor.setBase('Crouch_Idle_Loop',.3)}catch(x){}
  const hx=p.x+10<=B.x1-3?p.x+10:p.x-10,hp=V3(hx,0,p.z),dir=V3(hp.x-p.x,0,hp.z-p.z).normalize(),side=V3(dir.z,0,-dir.x),mid=p.clone().lerp(hp,.5);x4Stage(hp,Math.atan2(-dir.x,-dir.z));xoCoil(true);X4.cc=p.clone();let mir=null,fig=null,lt=0;
  const mk=()=>{if(mir)return mir;mir=xoMirrorGo(p);mir.invuln=true;mir.busy=999;mir.m.g.rotation.y=Math.atan2(dir.x,dir.z);mir.m.g.visible=false;xoSetGrey(mir.xo.L,true);$('boss').classList.add('hidden');XO.ph=1.8;try{mir.m.actor.setBase('Idle_Loop',0)}catch(x){}return mir};
  const cut=(dur,fov,cam,lbl)=>({dur,fov,cut:true,cam,onStart:()=>{mk().m.g.visible=true;x5Impact(80,.07);sx('clash',.7,null,{rate:rand(.5,.8)});P.shake=.9;x5Punch(10,.3);if(fig){fig.g.scale.multiplyScalar(.72);fig.burst(1)}if(lbl)x5Banner(lbl,'','#c9a6ff',.7,'#0a0612')}});
  playCutscene([{who:'@',text:XL3.mw_15,fov:40,cam:x4S(()=>P.pos,1,2.4,1.7),onStart:()=>{x4Talk('@');sx('wind',.4,null,{rate:.5})}},
    /* he comes apart, and the smoke goes up like a chimney fire */
    {dur:3.6,fov:40,cut:true,cam:k=>({pos:V3(p.x+dir.x*3.4+side.x*1.3,.8+k*.8,p.z+dir.z*3.4+side.z*1.3),look:headOf(p,1.1+k*2.4)}),onStart:()=>{P.heroAnim='Idle_Loop';x5Grey(1);xoSetGrey(old.xo.L,true);sx('riser',.9,null,{rate:.5});sx('heart',.8);fig=xcFig(1.2);fig.g.position.copy(p);fig.set('serpent');fig.cyc=0;fig.g.scale.setScalar(.01)},
      update:(dt,k)=>{const g=old.m.g;g.scale.set(1-k*.6,Math.max(.02,1-k*1.1),1-k*.6);if(k>.9)g.visible=false;fig.g.scale.setScalar(.01+2.3*k);fig.g.position.y=p.y+k*2.5;for(let q=0;q<3;q++)SM.emit(V3(p.x+rand(-1,1),p.y+rand(0,9)*k,p.z+rand(-1,1)),{c0:0x10262c,c1:0x010304,s0:1.5,s1:5,life:1.5,a:.6,up:4});P.shake=Math.max(P.shake,k*.5);if(Math.random()<.04)sx('heart',.7)}},
    /* a cocoon of it, turning, with the square spinning round */
    {dur:3.4,fov:58,cut:true,cam:k=>{const a=Math.atan2(dir.x,dir.z)+.6+k*2.6,R=12-k*4;return{pos:V3(p.x+Math.sin(a)*R,2.4+k*3.2,p.z+Math.cos(a)*R),look:V3(p.x,3.4,p.z)}},onStart:()=>{old.m.g.visible=false;fig.set('ball');fig.cyc=.2;fig.g.scale.setScalar(2.5);try{x4Kin('in')}catch(x){}sx('wind',.8,null,{rate:.6});sx('riser',1,null,{rate:.8})},
      update:(dt,k)=>{fig.g.position.y=p.y+2.2+Math.sin(k*9)*.3;lt-=dt;if(lt<=0){lt=.38-k*.2;const q=V3(p.x+rand(-7,7),rand(3,12),p.z+rand(-7,7));xoBeam(q,V3(p.x,3.4,p.z),Math.random()<.5?0x7dff9a:0xb070ff,.25,.25);flash(q,0xffffff,8);x5Impact(30,0);sx('laser',.3,null,{rate:rand(.5,.8)})}
        for(let q=0;q<5;q++){const a=time*3+q*1.26,R=5.5-k*2;SM.emit(V3(p.x+Math.cos(a)*R,rand(.3,6),p.z+Math.sin(a)*R),{c0:0x10262c,c1:0x010304,s0:1.2,s1:3.4,life:.8,a:.55})}P.shake=Math.max(P.shake,.3+k*.5)}},
    /* three hard cuts: boots, hand, hat */
    cut(.7,34,()=>({pos:V3(p.x+dir.x*1.7+side.x*.5,.22,p.z+dir.z*1.7+side.z*.5),look:V3(p.x,.25,p.z)}),'YOUR BOOTS'),
    cut(.7,30,()=>({pos:V3(p.x+dir.x*1.3-side.x*1.1,1.05,p.z+dir.z*1.3-side.z*1.1),look:headOf(p,.95)}),'YOUR HANDS'),
    cut(.9,26,k=>({pos:headOf(p,1.66).addScaledVector(dir,1.25-k*.2),look:headOf(p,1.64)}),'YOUR FACE'),
    /* and the colour comes in */
    {dur:2.8,fov:50,cut:true,cam:k=>({pos:V3(mid.x+side.x*(9.5-k*1.5),1.5,mid.z+side.z*(9.5-k*1.5)),look:V3(mid.x,1.45,mid.z)}),onStart:()=>{mk().m.g.visible=true;xcFigOff();fig=null;xoSetGrey(mir.xo.L,false);x5Grey(0);x5Impact(150,.24);try{x4Kin('punch')}catch(x){}sx('skyshatter',.9,null,{rate:.8});flash(headOf(p,1.2),0xffffff,34);ring(p,0xc9a6ff,1,18,.6);
        SP.emit(headOf(p,1.2),{n:200,c0:0xffffff,c1:0x7dff9a,speed:16,life:1,s0:.7,s1:.05});SM.emit(headOf(p,1),{n:50,c0:0x10262c,c1:0x010304,s0:2,s1:7,life:1.6,a:.6,speed:9});x5VS('MAËLLE','MAËLLE','#c9a6ff','#7dff9a');after(.9,()=>x5Banner('THE HOLLOW CROWN','WEARING YOU','#c9a6ff',1.9));P.heroAnim='Spell_Simple_Idle_Loop';try{mir.m.actor.setBase('Spell_Simple_Idle_Loop',.3)}catch(x){}},
      update:(dt,k)=>{camera.fov=50-k*7;camera.updateProjectionMatrix()}},
    {who:'???',text:XL3.mm_01,fov:30,cam:k=>({pos:headOf(p,1.56).addScaledVector(dir,2.3-k*.4).addScaledVector(side,.8),look:headOf(p,1.5)}),onStart:()=>{try{x4Kin('out')}catch(x){}mk().m.g.visible=true;try{mir.m.actor.setBase('Idle_Talking_Loop',.3)}catch(x){}}},
    {who:'@',text:XL3.mw_16,fov:36,cam:x4S(()=>P.pos,-1,2.2,1.65),onStart:()=>{x4Talk('@');try{mir.m.actor.setBase('Idle_Loop',.3)}catch(x){}}},
    {who:'Lyra',text:XL3.lw_12,fov:40,cam:k=>({pos:headOf(x4L(),1.1).add(V3(-2.8,.3,1.2)),look:headOf(x4L(),.8)})}],
    ()=>{x5Grey(0);xcFigOff();if(old.m.g.parent)scene.remove(old.m.g);old.dead=true;mk();mir.m.g.visible=true;mir.m.g.scale.setScalar(1);xoSetGrey(mir.xo.L,false);mir.xo.grey=false;P.heroAnim=null;X4.cc=null;CH2.st=Math.max(CH2.st,22);ch2Save();writeSave();mir.invuln=false;mir.busy=.9;try{mir.m.actor.setBase('Idle_Loop',.2)}catch(x){}
      XO.ph=2;$('boss').classList.remove('hidden');bossRef=mir;P.invuln=1.5;x5Punch(12,.4)})}

/* ---------- the end: it throws all three of you across the square and runs ---------- */
function xoEnd(){if(CS.active){after(.3,xoEnd);return}const m=XO.mir;if(!m)return;if(XO.clash)xmClashEnd(true);if(XO.tube)xmTubeEnd(false);XO.ph=3;sayHush();xoClear(m);$('boss').classList.add('hidden');bossRef=null;x5Bars(0);m.invuln=true;m.busy=999;m.ai.fly=null;if(m.m.broom)m.m.broom.visible=false;const B=XO.B,p=m.pos.clone();p.y=groundAt(p.x,p.z);m.pos.y=p.y;try{m.m.actor.setBase('Crouch_Idle_Loop',.3)}catch(x){}xoSetGrey(m.xo.L,true);
  const hx=p.x+8<=B.x1-12?p.x+8:p.x-8,hp=V3(hx,0,p.z),dir=V3(hp.x-p.x,0,hp.z-p.z).normalize(),sd=V3(dir.z,0,-dir.x),face=Math.atan2(-dir.x,-dir.z);x4Stage(hp,face);xoCoil(false);KFW.pin=1;LYR.pin=1;
  const K=KFW.a,Ly=LYR.a,kp=V3(hp.x+sd.x*2.6+dir.x,0,hp.z+sd.z*2.6+dir.z),lp=V3(hp.x-sd.x*2.6+dir.x,0,hp.z-sd.z*2.6+dir.z);if(K){K.g.position.copy(kp);K.g.rotation.y=face;K.g.visible=true;try{K.setBase('Idle_Loop',.3)}catch(x){}}if(Ly){Ly.g.position.copy(lp);Ly.g.rotation.y=face;Ly.g.visible=true;try{Ly.setBase('Idle_Loop',.3)}catch(x){}}X4.cc=p.clone();
  let fig=null,blast=0,flee=null;const hp2=hp.clone().addScaledVector(dir,9),kp2=kp.clone().addScaledVector(dir,9),lp2=lp.clone().addScaledVector(dir,9);const sky=V3(p.x-dir.x*70,46,p.z-dir.z*70+30);
  const down=()=>{P.heroAnim='Crouch_Idle_Loop';try{K&&K.setBase('Crouch_Idle_Loop',.2)}catch(x){}try{Ly&&Ly.setBase('Crouch_Idle_Loop',.2)}catch(x){}},upAll=()=>{try{K&&K.setBase('Idle_Loop',.5)}catch(x){}try{Ly&&Ly.setBase('Idle_Loop',.5)}catch(x){}};
  const wS=(s,d)=>x4S(()=>P.pos,s,d||2.3,1.6),kS=(s,d)=>x4S(()=>K?K.g.position:P.pos,s,d||2.3,1.7),lS=(s,d)=>x4S(()=>Ly?Ly.g.position:P.pos,s,d||2.2,1.55);
  playCutscene([{who:'@',text:XL3.mw_18,fov:38,cam:x4S(()=>P.pos,1,2.3,1.7),onStart:()=>{x4Talk('@')}},
    {dur:2.8,fov:50,cut:true,cam:k=>({pos:V3((p.x+hp.x)/2+sd.x*9,2.2+k,(p.z+hp.z)/2+sd.z*9),look:V3((p.x+hp.x)/2,1.3,(p.z+hp.z)/2)}),onStart:()=>{P.heroAnim='Spell_Simple_Shoot';sx('dcharge',.9,null,{rate:1.3});after(.7,()=>{xoBeam(headOf(P.pos,1.3),headOf(p,1.1),0xb070ff,.9,1.1);sx('dbeam',1);x5Impact(120,.22);x5Punch(18,.6);P.shake=1.6;flash(headOf(p,1.1),0xffffff,34);SP.emit(headOf(p,1.1),{n:200,c0:0xffffff,c1:0xb070ff,speed:17,life:1.1,s0:.8,s1:.05});
          SM.emit(headOf(p,1.1),{n:40,c0:0x10262c,c1:0x010304,s0:2,s1:7,life:1.8,a:.6,speed:6});scene.remove(m.m.g);m.dead=true;XO.mir=null;fig=xcFig(1);fig.g.position.copy(p);fig.set('ball');fig.cyc=.25;fig.burst(2)})},update:(dt,k)=>{camera.fov=50-Math.sin(Math.min(1,k*2)*Math.PI)*10;camera.updateProjectionMatrix()}},
    {who:'The Crown',text:XL3.cr_10,fov:34,cam:k=>({pos:V3(p.x+dir.x*3.4+sd.x,1.4,p.z+dir.z*3.4+sd.z),look:V3(p.x,1.6-k*.5,p.z)}),onStart:()=>{P.heroAnim='Idle_Loop';if(!fig){fig=xcFig(1);fig.g.position.copy(p)}fig.set('ball');fig.cyc=.18},update:(dt,k)=>{if(fig)fig.g.scale.setScalar(Math.max(.35,1-k*.65))}},
    /* and then everything it has left, all at once */
    {dur:3.6,fov:62,cut:true,cam:k=>({pos:V3(mid2x(),3+k*2.5,mid2z()),look:V3((p.x+hp.x)/2+dir.x*k*4,1.6,(p.z+hp.z)/2+dir.z*k*4)}),onStart:()=>{if(!fig){fig=xcFig(1);fig.g.position.copy(p)}fig.set('claw');fig.cyc=0;sx('riser',1,null,{rate:.7});x5Grey(1)},
      update:(dt,k)=>{if(!blast){const q=Math.min(1,k/.42);if(fig)fig.g.scale.setScalar(.35+q*q*3.4);P.shake=Math.max(P.shake,q*.9);for(let i=0;i<4;i++)SM.emit(V3(p.x+rand(-3,3)*q,rand(0,6)*q,p.z+rand(-3,3)*q),{c0:0x060a0c,c1:0x000000,s0:2,s1:6,life:1,a:.7,speed:3});
          if(k>=.42){blast=1;x5Grey(0);x5Impact(170,.28);x5Punch(22,.7);P.shake=2;sx('skyshatter',1);sx('dbeam',.9,null,{rate:.6});x5Banner('THE CROWN LASHES OUT','','#ff3040',1.5,'#000');const sp=new THREE.Mesh(new THREE.SphereGeometry(1,24,16),new THREE.MeshBasicMaterial({color:0x020304,transparent:true,opacity:.92,side:THREE.DoubleSide,depthWrite:false}));sp.position.copy(headOf(p,1.5));scene.add(sp);addFx(sp,.9,(f,q2)=>{sp.scale.setScalar(1+q2*30);sp.material.opacity=.92*(1-q2)},()=>{scene.remove(sp);sp.geometry.dispose()});
            for(let i=0;i<3;i++)after(i*.08,()=>ring(p,i%2?0x7a0c14:0x05080a,1,26+i*6,.7));SM.emit(headOf(p,1),{n:120,c0:0x060a0c,c1:0x000000,s0:3,s1:10,life:2,a:.8,speed:20});SP.emit(headOf(p,1.5),{n:120,c0:0xff4050,c1:0x200004,speed:24,life:.8,s0:.5,s1:.05});
            P.hp=Math.max(1,Math.min(P.hp,maxHP()*.18));floatText(headOf(P.pos,2.2),'-'+Math.round(maxHP()*.6),'#ff4050',true);vib([80,40,200]);down();if(fig){fig.set('serpent');fig.g.scale.setScalar(.8)}}}
        else{const q=Math.min(1,(k-.42)/.2),e2=1-Math.pow(1-q,3);P.pos.lerpVectors(hp,hp2,e2);P.pos.y=groundAt(P.pos.x,P.pos.z)+Math.sin(q*Math.PI)*1.2;if(K){K.g.position.lerpVectors(kp,kp2,e2);K.g.position.y=Math.sin(q*Math.PI)*1.1}if(Ly){Ly.g.position.lerpVectors(lp,lp2,e2);Ly.g.position.y=Math.sin(q*Math.PI)*1.3}
          if(q<1)for(const o of[P.pos,K&&K.g.position,Ly&&Ly.g.position])if(o)SM.emit(V3(o.x,.4,o.z),{c0:0x060a0c,c1:0x000000,s0:1,s1:3,life:.7,a:.5});if(fig)fig.g.position.y=p.y+2+Math.sin(time*5)*.3}}},
    {who:'The Crown',text:XL3.cr_11,fov:36,cam:k=>({pos:V3(p.x+dir.x*5+sd.x*1.5,1.2,p.z+dir.z*5+sd.z*1.5),look:V3(p.x,3.2,p.z)}),onStart:()=>{if(!blast){P.pos.copy(hp2);if(K)K.g.position.copy(kp2);if(Ly)Ly.g.position.copy(lp2);down();P.hp=Math.max(1,Math.min(P.hp,maxHP()*.18))}if(!fig){fig=xcFig(.8);fig.g.position.copy(p)}fig.set('serpent');fig.cyc=.4;fig.g.scale.setScalar(.8);fig.g.position.y=p.y+2},update:(dt,k)=>{if(fig&&Math.random()<.15)fig.burst(.8)}},
    {dur:3,fov:56,cut:true,cam:k=>({pos:V3(hp2.x+dir.x*4-sd.x*2,1.1,hp2.z+dir.z*4-sd.z*2),look:fig?fig.g.position.clone():sky}),onStart:()=>{sx('wind',.9,null,{rate:1.5});sx('cackle',.5,null,{rate:.4});flee=fig?fig.g.position.clone():p.clone()},update:(dt,k)=>{if(!fig)return;const e2=k*k;fig.g.position.lerpVectors(flee,sky,e2);fig.g.scale.setScalar(.8*(1-e2*.8));for(let i=0;i<3;i++)SM.emit(fig.g.position,{c0:0x10262c,c1:0x010304,s0:1.2,s1:4,life:1.6,a:.5})}},
    {who:'Kaen',text:XL3.kw_16,cam:kS(1,2.4),onStart:()=>{xcFigOff();fig=null;x4Talk('Kaen');try{K&&K.setBase('Idle_Talking_Loop',.6)}catch(x){}}},
    {who:'@',text:XL3.mw_21,cam:wS(-1,2.3),onStart:()=>{upAll();x4Talk('@')}},{who:'Lyra',text:XL3.lw_15,cam:lS(1,2.2),onStart:()=>x4Talk('Lyra')},
    /* Morwen */
    {who:'@',text:XL3.mw_22,fov:40,cam:wS(1,2.6),onStart:()=>x4Talk('@')},
    {who:'Kaen',text:XL3.kw_17,fov:28,cam:kS(-.6,1.9),onStart:()=>{x4Talk('Kaen');x5Impact(50,.05);x5Punch(8,.3);sx('heart',.8)}},
    {who:'@',text:XL3.mw_23,fov:40,cam:wS(-1,2.4),onStart:()=>x4Talk('@')},
    {who:'Kaen',text:XL3.kw_18,fov:36,cam:kS(1,2.4),onStart:()=>x4Talk('Kaen')},{who:'Kaen',text:XL3.kw_19,fov:32,cam:k=>{const o=kS(-1,2.2)();o.pos.y+=k*.2;return o}},
    {who:'@',text:XL3.mw_24,fov:34,cam:wS(1,2.1),onStart:()=>x4Talk('@')},{who:'Kaen',text:XL3.kw_20,fov:30,cam:kS(.6,1.9),onStart:()=>x4Talk('Kaen')},{who:'Lyra',text:XL3.lw_16,fov:38,cam:lS(-1,2.2),onStart:()=>x4Talk('Lyra')},
    {who:'@',text:XL3.mw_20,fov:46,cam:k=>({pos:V3(hp2.x+dir.x*(5+k*3)+sd.x*2,2+k*2,hp2.z+dir.z*(5+k*3)+sd.z*2),look:V3(hp2.x,1.4,hp2.z)}),onStart:()=>x4Talk('@')}],
    ()=>{x4Talk('');x5Grey(0);P.heroAnim=null;X4.cc=null;KFW.pin=0;LYR.pin=0;xcFigOff();upAll();if(m.m.g.parent)scene.remove(m.m.g);m.dead=true;XO.mir=null;XO.ph=0;XO.form=0;P.pos.y=groundAt(P.pos.x,P.pos.z);if(K)K.g.position.y=0;if(Ly)Ly.g.position.y=0;P.hp=Math.max(P.hp,maxHP()*.5);CH2.st=23;ch2Save();writeSave();try{gainXP(4000)}catch(x){}
      x5Banner('THE HOLLOW CROWN','WOUNDED, AND RUNNING','#ffd890',2.6,'#1a1206');toast('The Crown fled, half of what it was. Morwen is still inside it, and it is feeding on her.','Chapter XVI complete',true);after(9,()=>toast('Chapter XVII is coming: Morwen.','Sorcière',true))});
  function mid2x(){return (p.x+hp.x)/2+dir.x*5+sd.x*13}function mid2z(){return (p.z+hp.z)/2+dir.z*5+sd.z*13}}

/* ---------- the square, per frame ---------- */
function x5OTick(dt,dq){const st=CH2.st;if(st!==21&&st!==22)return;
  if(!XO.ph){XO.rt=(XO.rt||0)-dt;if(XO.rt>0)return;if(dq<36&&P.pos.y<30){if(st===22){xoMirrorGo();x5VS('MAËLLE','MAËLLE','#c9a6ff','#7dff9a')}else xoBegin(false)}return}
  xoArena();XO.t+=dt;
  if(XO.ph===1){const e=XO.e;if(!e||e.dead)return;const X=e.xo;if(X&&!e.invuln){X.t-=dt;if(X.t<=0){X.grey=!X.grey;X.t=X.grey?4:rand(7,11);xoFade(X.L,X.grey,X.grey?.6:1.2);const c=eCenter(e);SM.emit(c,{n:10,c0:0x10262c,c1:0x010304,s0:1.5,s1:4.5,life:1,a:.5,speed:3});if(!X.grey){flash(c,0xffffff,6);x5Impact(30,0)}}
      if(X.grey&&Math.random()<.4)SM.emit(V3(e.pos.x+rand(-1,1),e.pos.y+rand(.3,e.def.h||2),e.pos.z+rand(-1,1)),{c0:0x10262c,c1:0x010304,s0:1,s1:3,life:1,a:.45,up:.8})}
    if(XO.cmp)xoCmpTick(dt);else if(XO.form===5&&!XO.coil.length)xoCoil(true);
    if(!e.invuln&&e.hp<=e.maxhp*e.hpFloor+1){if(XO.form<4)xoMorph(XO.form+1);else if(XO.form===4)xoKaen();else xoMirror()}return}
  if(XO.ph===2){const m=XO.mir;if(!m||m.dead)return;if(XO.clash){xmClashTick(dt);return}if(XO.tube){xmTubeTick(dt);return}XO.clT=(XO.clT||0)-dt;const r=m.hp/m.maxhp,T=XO.tn||(XO.tn={});
    if(m.lb){const c=eCenter(m);if(Math.random()<.8)SM.emit(V3(c.x+rand(-.5,.5),c.y+rand(-1,1),c.z+rand(-.5,.5)),{c0:0x140306,c1:0x000000,s0:.8,s1:2.6,life:.9,a:.7,up:2.4});if(Math.random()<.3)FL.emit(V3(c.x+rand(-.4,.4),c.y-1,c.z+rand(-.4,.4)),{n:1,c0:0x900c18,c1:0x100002,s0:.6,s1:.05,life:.7,up:3});if(m.m.aura)m.m.aura.material.opacity=.13+Math.sin(time*7)*.05}
    if(r<.9&&!T.a){T.a=1;x5Say('???','mm_02',1)}if(r<.62&&!T.b){T.b=1;x5Say('???','mm_03',1)}if(r<.44&&!T.c){T.c=1;x5Say('???','mm_04',1)}
    const idle=m.busy<=0&&!m.ai.fly&&!m.invuln&&P.alive&&m.pos.y<groundAt(m.pos.x,m.pos.z)+.6;
    if(idle){if(r<.76&&!T.t1){T.t1=1;xmTube(m,0)}else if(r<.54&&!XO.cl&&XO.clT<=0){XO.cl=1;xmClash(m)}else if(r<.38&&!T.t2){T.t2=1;xmTube(m,1)}else if(r<.28&&!m.lb)xmLB(m)}
    if(!m.invuln&&m.hp<=m.maxhp*m.hpFloor+1)xoEnd()}}
{const cl=()=>{if(XO.tube){const T=XO.tube;XO.tube=null;scene.remove(T.g);for(const w of T.waves)scene.remove(w.g);try{W.g.visible=true}catch(x){}P.heroAnim=null}const u=document.getElementById('xmQ');if(u)u.classList.remove('show');XO.clT=0};
  const _or=x5OReset;x5OReset=function(){cl();return _or.apply(this,arguments)};const _rv=x5ORevive;x5ORevive=function(){cl();return _rv.apply(this,arguments)}}

/* one theme for the whole square: every face the Crown wears fights to the same music */
if(MU.keys)MU.keys.push('mus_b_crown');MU.gain.mus_b_crown=1.7;
function xoMusOn(){return started&&MODE!=='open'&&(CH2.st===21||CH2.st===22)&&XO.ph>0&&XO.ph<3}
{const _bw=bmWant;bmWant=function(){if(xoMusOn()){bmTrack('mus_b_crown');return null}return _bw.apply(this,arguments)}}
{const _mw=muWant;muWant=function(){if(xoMusOn()){const t=bmTrack('mus_b_crown');return t.ok?'mus_b_crown':null}return _mw.apply(this,arguments)}}

/* the long run, last cavern: the Crown turns and blows smoke back down the lanes; one lane stays clear */
{const _ct=x5CTick;x5CTick=function(dt,s){_ct.apply(this,arguments);return;
  XC.ln=(XC.ln===undefined?1.2:XC.ln)-dt;if(XC.ln>0)return;XC.ln=DIFF==='easy'?3.4:DIFF==='hard'?2.2:2.7;const S=uSec(s+8),hw=S.hw,w=hw*2/3,safe=(Math.random()*3)|0,s0=s-6,s1=s+34;
  if(XC.fig){XC.fig.set('claw');XC.fig.burst(.8);after(1.4,()=>{if(XC.fig)XC.fig.set('serpent')})}x5Punch(6,.2);
  for(let L=0;L<3;L++){const lx=-hw+w*(L+.5);if(L===safe){const g=uP(lx,s+8,uFloor(s+8)+.1);ring(g,0xfff0d0,.5,w*.45,.6);continue}
    const a=uP(lx,s1,uFloor(s1)),b=uP(lx,s0,uFloor(s0));lineTelegraph(a,b,w*.92,1.05,0x7dff9a,()=>{sx('wind',.6,null,{rate:.8});for(let k=0;k<16;k++)after(k*.03,()=>{const q=s1-(s1-s0)*k/15;SM.emit(uP(lx+rand(-w/3,w/3),q,uFloor(q)+rand(.5,2.6)),{n:3,c0:0x2a4a3a,c1:0x050806,s0:2.4,s1:6,life:1.1,a:.65,speed:3})});
      const ps=uS(P.pos.z),plx=P.pos.x-U0.x;if(ps>s0-1&&ps<s1&&Math.abs(plx-lx)<w/2&&P.pos.y<uFloor(ps)+3){damagePlayer(x5Dmg(22));x5Punch(9,.3);P.shake=Math.max(P.shake,.7)}})}
  if(!XC.said.ln){XC.said.ln=1;toast('The smoke comes down the lanes. Find the clear one!')}}}

/* the tunnel always lets you out at the light, whatever state the run is in */
{const _ct=x5CTick;x5CTick=function(dt,s){_ct.apply(this,arguments);if(!X5.in||CS.active||MODE==='open'||s<UE-6||XC.ph===3)return;
  if(CH2.st===20){if(XC.ph!==2){XC.ph=2;XC.said=XC.said||{}}if(!XC.fig)xcFig(1);xcExit();return}
  XC.ph=3;sx('unveil',.9);x5White(.45,.5,()=>{xcFigOff();x5Leave(V3(-126,0,-9872));XC.ph=0;P.face=-Math.PI/2;yaw=Math.PI/2;if(CH2.st===21&&typeof xoBegin==='function'&&!XO.ph)xoBegin(true)})}}
/* throne room prewarm: build candles + Crown figure, fetch the voices and compile shaders before the door, so the cinematic starts clean */
{const _ct=x5CTick;x5CTick=function(dt,s){if(X5.in&&CH2.st===20&&!XC.ph&&!CS.active&&s>196&&s<222.5&&!XC.warm){XC.warm=1;try{xcStands();if(!XC.fig){const F=xcFig(1);F.g.position.copy(chairP());F.set('king');F.cyc=0;for(let k=0;k<30;k++)F.tick(.05)}
      voPrefetch(['cr_01','cr_02'].map(k=>({who:'The Crown',text:XL3[k]})).concat([{who:'@',text:XL3.mw_10},{who:'Kaen',text:XL3.kw_12},{who:'Lyra',text:XL3.lw_10}]));try{renderer.compile(scene,camera)}catch(x){}}catch(x){}}
  return _ct.apply(this,arguments)}}
{const _r=x5CReset;x5CReset=function(){XC.warm=0;return _r.apply(this,arguments)}}
