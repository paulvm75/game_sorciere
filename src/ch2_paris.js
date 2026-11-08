
/* ================= CHAPTER 2 · Paris: the prison breaks, the 7th & 16th, Kaen's journal, Lyra ================= */
const C2M={};function c2m(){if(C2M.ok)return C2M;C2M.ok=1;
  const stC=mkCanvas(256,128,(x)=>{x.fillStyle='#ddd2b8';x.fillRect(0,0,256,128);for(let k=0;k<900;k++){x.fillStyle=`rgba(${rand(120,170)|0},${rand(110,150)|0},${rand(80,120)|0},.1)`;x.fillRect(rand(0,256),rand(0,128),rand(1,5),rand(1,4))}
    for(let c=0;c<8;c++){const X=c*32+10;x.fillStyle='#2c2838';x.fillRect(X,22,12,72);x.fillStyle=Math.random()<.45?'rgba(255,205,130,.85)':'rgba(255,205,130,.1)';x.fillRect(X+2,24,8,68);x.fillStyle='#f0e6d0';x.fillRect(X-2,18,16,4)}x.fillStyle='#c4b590';x.fillRect(0,104,256,6)});
  C2M.stone=std({map:rep(new THREE.CanvasTexture(stC),3,1),color:0xb8ae9c,roughness:.9,emissive:0x120e08,envMapIntensity:.3});C2M.plain=std({color:0xb4a892,roughness:.9,emissive:0x0e0a06,envMapIntensity:.3});
  C2M.gold=std({color:0xd8a840,metalness:.9,roughness:.28,emissive:0x3a2200});C2M.zinc=std({color:0x56606e,metalness:.5,roughness:.45});C2M.iron=std({color:0x3f5a52,metalness:.6,roughness:.45});
  C2M.glass=std({color:0x8fb0d0,metalness:.3,roughness:.08,transparent:true,opacity:.55,emissive:0x182434});C2M.lawn=std({color:0x284a30,roughness:1,envMapIntensity:.2});C2M.gravel=std({color:0x5a5246,roughness:1,envMapIntensity:.2});
  C2M.water=std({map:waterTex,normalMap:waterN,roughness:.06,metalness:.6,emissive:0xffffff,emissiveMap:waterTex,emissiveIntensity:.18,envMapIntensity:.9,color:0x5a7a9a});C2M.dark=std({color:0x22222a,roughness:.6});
  C2M.copper=std({color:0x5fa08a,roughness:.55,metalness:.35,emissive:0x0a1a14});return C2M}
function c2box(P0,w,h,d,x,y,z,mat,col,ry){const m=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),mat);m.position.set(x,y+h/2,z);if(ry)m.rotation.y=ry;m.castShadow=m.receiveShadow=true;P0.add(m);
  if(col){const hw=ry?Math.max(w,d)*.5:w/2,hd=ry?Math.max(w,d)*.5:d/2;boxes.push({x0:x-hw,x1:x+hw,z0:z-hd,z1:z+hd,h:y+h,ch2:1})}return m}
function c2lot(x0,x1,z0,z1,h){const L={x0,x1,z0,z1,x:(x0+x1)/2,z:(z0+z1)/2,W:(x1-x0)/2,D:(z1-z0)/2,h,hm:0,roof:'flat'};
  for(let i=Math.round((x0-GOX)/PITCH)-1;i<=Math.round((x1-GOX)/PITCH)+1;i++)for(let j=Math.round((z0-GOZ)/PITCH)-1;j<=Math.round((z1-GOZ)/PITCH)+1;j++){const k=i*1000+j;const a=blockLots.get(k)||[];a.push(L);blockLots.set(k,a)}}
function c2plane(P0,w,d,x,y,z,mat){const m=new THREE.Mesh(new THREE.PlaneGeometry(w,d),mat);m.rotation.x=-Math.PI/2;m.position.set(x,y,z);m.receiveShadow=true;P0.add(m);return m}
function c2trees(P0,list){if(!list.length)return;const lm=std({color:0x3a5a40,roughness:.9}),tm=std({color:0x3a2a20,roughness:1});
  instancedIn(P0,new THREE.CylinderGeometry(.18,.3,2.8,6),tm,list,(o,t)=>{o.position.set(t[0],1.4*t[2],t[1]);o.scale.setScalar(t[2])});
  for(const off of[[0,3.8,0,1],[.8,3.3,.3,.72],[-.6,4.2,-.4,.68]])instancedIn(P0,new THREE.IcosahedronGeometry(1.9,1),lm,list,(o,t)=>{o.position.set(t[0]+off[0]*t[2],off[1]*t[2],t[1]+off[2]*t[2]);o.scale.setScalar(t[2]*off[3])});for(const t of list)treeList.push(t)}
function instancedIn(P0,geo,mat,items,fn){CITY_PARENT=P0;const im=instanced(geo,mat,items,fn);CITY_PARENT=null;return im}

/* ---------- Kaen's prison: a violet wall of illusion at the edge of the small map ---------- */
const PW={walls:[]};
function prisonWall(){if(PW.walls.length||CH2.expanded||MODE==='open')return;const mat=new THREE.ShaderMaterial({uniforms:{uT:{value:0}},transparent:true,depthWrite:false,blending:THREE.AdditiveBlending,side:THREE.DoubleSide,fog:false,
    vertexShader:'varying vec2 vU;varying vec3 vW;void main(){vU=uv;vW=(modelMatrix*vec4(position,1.)).xyz;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}',
    fragmentShader:'uniform float uT;varying vec2 vU;varying vec3 vW;float hex(vec2 p){p.x*=1.1547;p.y+=mod(floor(p.x),2.)*.5;p=abs(fract(p)-.5);return abs(max(p.x*1.5+p.y,p.y*2.)-1.);}void main(){float h=smoothstep(.07,0.,hex(vec2(vW.x+vW.z,vW.y)*.12+vec2(0.,uT*.05)));float fade=smoothstep(0.,.08,vU.y)*smoothstep(1.,.5,vU.y);float sc=.5+.5*sin(vW.y*.4-uT*2.);gl_FragColor=vec4(vec3(.55,.25,1.)*(h*1.2+.15)*(.6+sc*.4),(h*.55+.05)*fade);}'});
  const H=110;const add=(w,x,z,ry)=>{const m=new THREE.Mesh(new THREE.PlaneGeometry(w,H),mat);m.position.set(x,H/2-2,z);m.rotation.y=ry;m.renderOrder=3;scene.add(m);PW.walls.push(m)};
  const {x0,x1,z0,z1}=WB;add(x1-x0,(x0+x1)/2,z0,0);add(x1-x0,(x0+x1)/2,z1,0);add(z1-z0,x0,(z0+z1)/2,Math.PI/2);add(z1-z0,x1,(z0+z1)/2,Math.PI/2);PW.mat=mat}
{const _mt=muTick;muTick=function(dt){_mt(dt);if(PW.mat)PW.mat.uniforms.uT.value+=dt;
  if(PW.walls.length&&started&&!CS.active&&MODE!=='open'&&CH2.zone==='paris'){const {x0,x1,z0,z1}=WB;const m=Math.min(P.pos.x-x0,x1-P.pos.x,P.pos.z-z0,z1-P.pos.z);if(m<4){PW.tT=(PW.tT||0)-dt;if(PW.tT<=0){PW.tT=9;toast('A wall of illusion. This Paris is a cage... for now.',"Kaen's prison")}}}}}

/* ---------- the sky cracks like glass ---------- */
const SHD={list:[],dome:null};
function skyShatter(){const c=P.pos.clone();const crack=mkCanvas(512,256,(x)=>{x.fillStyle='#000';x.fillRect(0,0,512,256);x.strokeStyle='#e8d8ff';for(let k=0;k<26;k++){let px=256+rand(-40,40),py=60+rand(-20,20);x.lineWidth=rand(1,3);x.beginPath();x.moveTo(px,py);for(let s=0;s<9;s++){px+=rand(-46,46);py+=rand(4,26);x.lineTo(px,py)}x.stroke()}});
  const dm=new THREE.MeshBasicMaterial({map:new THREE.CanvasTexture(crack),transparent:true,opacity:0,blending:THREE.AdditiveBlending,depthWrite:false,side:THREE.BackSide,fog:false});
  const dome=new THREE.Mesh(new THREE.SphereGeometry(150,32,16,0,TAU,0,Math.PI/2),dm);dome.position.set(c.x,0,c.z);scene.add(dome);SHD.dome=dome;SHD.t=0;
  const tg=new THREE.BufferGeometry();tg.setAttribute('position',new THREE.BufferAttribute(new Float32Array([0,0,0, 2.2,.3,0, .7,2.6,0]),3));tg.computeVertexNormals();
  const sm=new THREE.MeshBasicMaterial({color:0xd8c0ff,transparent:true,opacity:.85,blending:THREE.AdditiveBlending,depthWrite:false,side:THREE.DoubleSide,fog:false});
  for(let i=0;i<170;i++){const m=new THREE.Mesh(tg,sm);const a=Math.random()*TAU,el=rand(.2,1.35),r=rand(70,140);m.position.set(c.x+Math.cos(a)*Math.cos(el)*r,Math.sin(el)*r*.8+20,c.z+Math.sin(a)*Math.cos(el)*r);m.scale.setScalar(rand(1,4.5));m.rotation.set(rand(0,6),rand(0,6),rand(0,6));
    m.userData={v:V3(rand(-4,4),rand(-14,-4),rand(-4,4)),w:V3(rand(-3,3),rand(-3,3),rand(-3,3)),t:rand(-1.2,0)};scene.add(m);SHD.list.push(m)}
  for(const w of PW.walls){const p=w.position;for(let k=0;k<12;k++)SP.emit(V3(clamp(P.pos.x,WB.x0,WB.x1)+(w.rotation.y?0:rand(-60,60)),rand(5,70),clamp(P.pos.z,WB.z0,WB.z1)+(w.rotation.y?rand(-60,60):0)),{n:10,c0:0xffffff,c1:0x8040ff,speed:8,life:1.5,s0:.8,s1:.1})}
  for(const w of PW.walls)scene.remove(w);PW.walls.length=0;
  flash(V3(c.x,c.y+40,c.z),0xe8d8ff,60);P.shake=1.6;sx('skyshatter',1,()=>{try{sfx.shatter();sfx.boom()}catch(e){}},{wet:.4,duck:5});vib([60,40,200])}
function shardTick(dt){SHD.t=(SHD.t||0)+dt;if(SHD.dome){const k=SHD.t;SHD.dome.material.opacity=k<.6?k/.6:Math.max(0,1-(k-.6)/2.4);if(k>3.2){scene.remove(SHD.dome);SHD.dome=null}}
  for(let i=SHD.list.length-1;i>=0;i--){const m=SHD.list[i],u=m.userData;u.t+=dt;if(u.t<0)continue;m.position.addScaledVector(u.v,dt);u.v.y-=9*dt;m.rotation.x+=u.w.x*dt;m.rotation.y+=u.w.y*dt;if(u.t>4.5||m.position.y<-2){scene.remove(m);SHD.list.splice(i,1)}}}
{const _mt=muTick;muTick=function(dt){_mt(dt);if(SHD.list.length||SHD.dome)shardTick(dt)}}

/* ---------- the real Paris: 7th & 16th ---------- */
const C2P={pw:null};
function ch2ExpandParis(){if(CH2.expanded||MODE==='open')return;CH2.expanded=true;const M=c2m();
  for(const w of PW.walls)scene.remove(w);PW.walls.length=0;
  if(IL.group)IL.group.visible=false;for(let i=boxes.length-1;i>=0;i--)if(boxes[i].il)boxes.splice(i,1);for(const k of IL.keys)blockLots.delete(k);
  for(let i=blocks.length-1;i>=0;i--)if(blocks[i][2])blocks.splice(i,1);{const s=new Set(IL.lamps);for(let i=lampList.length-1;i>=0;i--)if(s.has(lampList[i]))lampList.splice(i,1)}
  const OLD={x0:WB.x0,x1:WB.x1,z0:WB.z0,z1:WB.z1};WB.x0=-430;WB.x1=430;WB.z0=-330;WB.z1=300;CH2.parisWB={...WB};
  const G=new THREE.Group();scene.add(G);C2P.g=G;
  const resv=[[-160,-88,-160,-18],[66,150,30,290],[144,220,36,72],[-415,-330,-145,-60],[-280,-244,-60,60]];
  const reserved=(cx,cz)=>resv.some(r=>cx+14>r[0]&&cx-14<r[1]&&cz+14>r[2]&&cz-14<r[3]);
  const A=cityArrs(0);
  for(let i=-7;i<=16;i++)for(let j=-4;j<=12;j++){const cx=-162+i*PITCH,cz=-162+j*PITCH;if(Math.abs(cz)<=18)continue;const old=i>=-1&&i<11&&j>=-1&&j<13;if(old&&!ilCell(cx,cz))continue;if(reserved(cx,cz)||ilCell(cx,cz))continue;stCell(cx,cz,i,j,A)}
  cityFlush(A,G);
  /* quays, lamps, trees on the new stretches of the Seine */
  const trees=[],lamps=A.lamps;
  for(let x=-424;x<=424;x+=12){if(x>=OLD.x0+2&&x<=OLD.x1-2)continue;lamps.push([x,-11]);lamps.push([x,11])}
  for(let x=-424;x<=424;x+=8){if(x>=OLD.x0+2&&x<=OLD.x1-2)continue;if([...BRIDGES,-126,-262].some(b=>Math.abs(x-b)<9))continue;for(const z of[-15,15,-34,34])trees.push([x+rand(-1,1),z+rand(-1,1),rand(.85,1.25)])}
  /* ground, river and quay walls now span the whole new map */
  const W=WB.x1-WB.x0+60,D=WB.z1-WB.z0+60;{const og=scene.getObjectByName('groundMain');if(og){const mat=og.material.clone();for(const k of['map','normalMap','roughnessMap'])if(mat[k]){mat[k]=mat[k].clone();mat[k].repeat.multiplyScalar(1.75);mat[k].needsUpdate=true}
    const g2=new THREE.Mesh(new THREE.PlaneGeometry(W,D),mat);g2.rotation.x=-Math.PI/2;g2.position.set((WB.x0+WB.x1)/2,-.01,(WB.z0+WB.z1)/2);g2.receiveShadow=true;scene.add(g2);og.visible=false}}
  {const ow=scene.getObjectByName('riverWater');if(ow){const w2=new THREE.Mesh(new THREE.PlaneGeometry(W,RIVER*2),ow.material);w2.rotation.x=-Math.PI/2;w2.position.set(0,.05,0);scene.add(w2);ow.visible=false}}
  scene.traverse(o=>{if(o.name==='quayWall'){const q2=new THREE.Mesh(new THREE.BoxGeometry(W,.6,.7),o.material);q2.position.copy(o.position);scene.add(q2);o.visible=false}});
  /* landmarks */
  buildTrocadero(G);buildIena(G);buildBirHakeim(G);buildRadio(G);buildInvalides(G);buildAlex3(G);buildOrsay(G);
  lampFlush(lamps,G);for(const l of lamps)lampList.push(l);c2trees(G,trees);
  WMX.push((x,X,Z)=>{x.fillStyle='#b8a888';for(const r of C2P.mapRects||[])x.fillRect(X(r[0]),Z(r[2]),r[1]-r[0],r[3]-r[2]);x.fillStyle='#f2a541';for(const p of C2P.mapPins||[])x.fillRect(X(p[0])-4,Z(p[1])-4,8,8)});
  drawWorldMap()}
function c2pin(x,z){(C2P.mapPins=C2P.mapPins||[]).push([x,z])}function c2rect(x0,x1,z0,z1){(C2P.mapRects=C2P.mapRects||[]).push([x0,x1,z0,z1])}
/* Trocadéro + Palais de Chaillot, straight across the river from the tower */
function buildTrocadero(G){const M=c2m();const cx=-126;
  c2plane(G,72,74,cx,.03,-57,M.lawn);c2plane(G,26,62,cx,.035,-58,M.gravel);
  const basin=c2plane(G,16,56,cx,.06,-58,M.water);
  const jets=[];for(let k=0;k<10;k++)for(const s of[-1,1]){const j=new THREE.Mesh(new THREE.ConeGeometry(.25,1,6,1,true),new THREE.MeshBasicMaterial({color:0xd8f0ff,transparent:true,opacity:.55,blending:THREE.AdditiveBlending,depthWrite:false}));j.position.set(cx+s*6.5,0,-34-k*5.2);G.add(j);jets.push(j)}
  C2P.jets=jets;c2plane(G,52,26,cx,.04,-113,M.gravel);
  const C=V3(cx,0,-60),R=58;for(const side of[-1,1]){for(let k=0;k<8;k++){const a0=.4+k*.085,a=Math.PI+side*(a0+.042);const x=C.x+Math.sin(a)*R,z=C.z+Math.cos(a)*R;c2box(G,8.4,k===0?18:14,10,x,0,z,M.stone,true,a)}
    const a=Math.PI+side*.36;c2box(G,7,20,12,C.x+Math.sin(a)*R,0,C.z+Math.cos(a)*R,M.plain,true,a)}
  for(let k=0;k<8;k++){const x=cx-17.5+k*5;c2box(G,1.2,1.6,1.2,x,0,-108,M.plain,true);const f=new THREE.Mesh(new THREE.CylinderGeometry(.28,.38,2.4,8),M.gold);f.position.set(x,2.8,-108);G.add(f);const h=new THREE.Mesh(new THREE.SphereGeometry(.3,10,8),M.gold);h.position.set(x,4.2,-108);G.add(h)}
  c2rect(-170,-82,-128,-90);c2pin(cx,-112)}
/* Pont d'Iéna links the tower and the Trocadéro */
function c2bridge(G,x,deckCol,lampCol){if(!BRIDGES.includes(x))BRIDGES.push(x);const M=c2m();const deck=new THREE.Mesh(new THREE.BoxGeometry(BRW*2,.5,RIVER*2+3),M.plain);deck.position.set(x,.25,0);deck.receiveShadow=true;G.add(deck);
  for(const s of[-1,1]){const r=new THREE.Mesh(new THREE.BoxGeometry(.4,1,RIVER*2+3),M.plain);r.position.set(x+s*BRW,.9,0);G.add(r);for(const z of[-7,0,7]){const l=glowSprite(lampCol||0xffb050,2,.6);l.position.set(x+s*BRW,2.4,z);G.add(l)}}
  const arch=new THREE.Mesh(new THREE.TorusGeometry(RIVER-1,.8,8,24,Math.PI),M.plain);arch.rotation.y=Math.PI/2;arch.position.set(x,-6,0);G.add(arch);return deck}
function buildIena(G){const M=c2m();c2bridge(G,-126);for(const sx of[-1,1])for(const sz of[-1,1]){c2box(G,2,2.2,3,-126+sx*(BRW+1.4),0,sz*12.5,M.plain,true);const h=new THREE.Mesh(new THREE.BoxGeometry(.9,1.6,2.4),M.dark);h.position.set(-126+sx*(BRW+1.4),3,sz*12.5);G.add(h)}}
/* Pont de Bir-Hakeim: road deck below, métro viaduct above, and the Île aux Cygnes with its Statue of Liberty */
function buildBirHakeim(G){const M=c2m();const x=-262;c2bridge(G,x);
  const via=new THREE.Mesh(new THREE.BoxGeometry(5,1,90),M.iron);via.position.set(x,9,0);G.add(via);
  for(let z=-42;z<=42;z+=7)for(const s of[-1,1]){const c=new THREE.Mesh(new THREE.CylinderGeometry(.22,.26,8.5,8),M.iron);c.position.set(x+s*2.2,4.4,z);G.add(c);if(Math.abs(z)>RIVER)boxes.push({x0:x+s*2.2-.3,x1:x+s*2.2+.3,z0:z-.3,z1:z+.3,h:8.6,ch2:1})}
  for(let z=-38.5;z<=38.5;z+=7){const a=new THREE.Mesh(new THREE.TorusGeometry(2.2,.12,6,16,Math.PI),M.iron);a.position.set(x,8.5,z);a.rotation.y=Math.PI/2;G.add(a)}
  const tr=new THREE.Mesh(new THREE.BoxGeometry(2.6,2.6,22),std({color:0x9cd4b0,roughness:.5,emissive:0x203a28}));tr.position.set(x,10.8,-6);G.add(tr);
  for(let k=0;k<7;k++){const w=glowSprite(0xfff0c0,1.1,.7);w.position.set(x+1.35,11,-15+k*3);G.add(w)}
  const isl=new THREE.Mesh(new THREE.BoxGeometry(160,.8,3.6),M.plain);isl.position.set(-352,.4,0);G.add(isl);const lw=c2plane(G,158,2.4,-352,.82,0,M.lawn);
  const tl=[];for(let xx=-424;xx<=-282;xx+=9)tl.push([xx,rand(-.6,.6),rand(.7,.95)]);c2trees(G,tl);
  const L=new THREE.Group();L.position.set(-424,.8,0);G.add(L);const ped=new THREE.Mesh(new THREE.BoxGeometry(2.6,4,2.6),M.plain);ped.position.y=2;L.add(ped);
  const robe=new THREE.Mesh(new THREE.CylinderGeometry(.55,1.1,5,10),M.copper);robe.position.y=6.5;L.add(robe);const hd=new THREE.Mesh(new THREE.SphereGeometry(.45,12,10),M.copper);hd.position.y=9.4;L.add(hd);
  for(let k=0;k<7;k++){const sp=new THREE.Mesh(new THREE.ConeGeometry(.08,.7,4),M.copper);const a=-.9+k*.3;sp.position.set(Math.sin(a)*.45,9.75,Math.cos(a)*.45-.05);sp.rotation.set(Math.cos(a)*-.8,0,Math.sin(a)*.8);L.add(sp)}
  const arm=new THREE.Mesh(new THREE.CylinderGeometry(.15,.18,2.6,8),M.copper);arm.position.set(.55,10.3,0);arm.rotation.z=-.15;L.add(arm);const torch=glowSprite(0xffc040,3,1);torch.position.set(.75,11.8,0);L.add(torch);
  const tab=new THREE.Mesh(new THREE.BoxGeometry(.2,1,.7),M.copper);tab.position.set(-.6,7.6,.25);L.add(tab);L.rotation.y=-Math.PI/2;C2P.liberty=L;c2pin(-424,0)}
/* Maison de la Radio, the round house of the 16th */
function buildRadio(G){const M=c2m();const c=V3(-372,0,-102);const ring=new THREE.Mesh(new THREE.CylinderGeometry(30,30,14,48,1,true),M.stone);ring.material=M.stone;ring.position.set(c.x,7,c.z);G.add(ring);
  const inner=new THREE.Mesh(new THREE.CylinderGeometry(20,20,14,40,1,true),M.plain);inner.position.set(c.x,7,c.z);G.add(inner);const roof=new THREE.Mesh(new THREE.RingGeometry(20,30,48),M.zinc);roof.rotation.x=-Math.PI/2;roof.position.set(c.x,14,c.z);G.add(roof);
  c2box(G,12,46,12,c.x,0,c.z,M.stone,true);for(let k=0;k<12;k++){const a=k/12*TAU;boxes.push({x0:c.x+Math.cos(a)*25-6,x1:c.x+Math.cos(a)*25+6,z0:c.z+Math.sin(a)*25-6,z1:c.z+Math.sin(a)*25+6,h:14,ch2:1})}
  c2lot(c.x-30,c.x+30,c.z-30,c.z+30,13.6);const rl=glowSprite(0xff3030,2,.8);rl.position.set(c.x,47,c.z);G.add(rl);c2rect(c.x-30,c.x+30,c.z-30,c.z+30)}
/* Les Invalides: esplanade, the Hôtel and the golden Dôme */
function buildInvalides(G){const M=c2m();const x=108;
  c2plane(G,60,160,x,.03,118,M.lawn);c2plane(G,14,160,x,.035,118,M.gravel);const tl=[];for(let z=42;z<=196;z+=7)for(const s of[-26,-21,21,26])tl.push([x+s,z,rand(.95,1.2)]);c2trees(G,tl);
  c2box(G,76,15,34,x,0,218,M.stone,true);c2lot(x-38,x+38,201,235,15);const rf=new THREE.Mesh(new THREE.BoxGeometry(77,2.4,35),M.zinc);rf.position.set(x,16.2,218);G.add(rf);
  c2box(G,30,16,30,x,0,256,M.plain,true);c2lot(x-15,x+15,241,271,16);
  const drum=new THREE.Mesh(new THREE.CylinderGeometry(10,10,10,32),M.plain);drum.position.set(x,21,256);G.add(drum);
  for(let k=0;k<20;k++){const a=k/20*TAU;const c=new THREE.Mesh(new THREE.CylinderGeometry(.4,.45,9,8),M.plain);c.position.set(x+Math.cos(a)*10.7,20.5,256+Math.sin(a)*10.7);G.add(c)}
  const dome=new THREE.Mesh(new THREE.SphereGeometry(10.4,32,16,0,TAU,0,Math.PI/2),M.gold);dome.scale.y=1.35;dome.position.set(x,26,256);G.add(dome);
  for(let k=0;k<16;k++){const a=k/16*TAU;const r=new THREE.Mesh(new THREE.TorusGeometry(10.45,.12,4,24,Math.PI/2),M.zinc);r.position.set(x,26,256);r.rotation.set(0,a,Math.PI/2);r.scale.set(1,1.35,1);G.add(r)}
  const lan=new THREE.Mesh(new THREE.CylinderGeometry(2,2.3,5,12),M.gold);lan.position.set(x,42.5,256);G.add(lan);const sp=new THREE.Mesh(new THREE.ConeGeometry(.9,9,10),M.gold);sp.position.set(x,49.5,256);G.add(sp);
  const gl=glowSprite(0xffd070,26,.35);gl.position.set(x,34,256);G.add(gl);c2rect(x-38,x+38,201,271);c2pin(x,256)}
/* Pont Alexandre III: gilded pegasus pylons on the existing bridge in front of the esplanade */
function buildAlex3(G){const M=c2m();const x=108;for(const sx of[-1,1])for(const sz of[-1,1]){const px=x+sx*(BRW+2.2),pz=sz*13;c2box(G,2.6,17,2.6,px,0,pz,M.plain,true);
    const P1=new THREE.Group();P1.position.set(px,18.4,pz);G.add(P1);const b=new THREE.Mesh(new THREE.SphereGeometry(.9,12,8),M.gold);b.scale.set(1.6,.9,.8);P1.add(b);for(const w of[-1,1]){const wg=new THREE.Mesh(new THREE.PlaneGeometry(2.4,1.2),M.gold);wg.material.side=THREE.DoubleSide;wg.position.set(0,.9,w*.6);wg.rotation.x=w*.9;P1.add(wg)}
    const gl=glowSprite(0xffd070,6,.5);gl.position.set(px,18.6,pz);G.add(gl)}
  for(const s of[-1,1])for(const z of[-7.5,-2.5,2.5,7.5]){const p=new THREE.Mesh(new THREE.CylinderGeometry(.09,.12,3.2,6),M.gold);p.position.set(x+s*(BRW-.2),2,z);G.add(p);for(const o of[-.35,0,.35]){const l=glowSprite(0xffe0a0,.9,.85);l.position.set(x+s*(BRW-.2)+o*.6,3.7+(o?0:.3),z);G.add(l)}}}
/* Musée d'Orsay: the old station with its two great clocks over the river */
function buildOrsay(G){const M=c2m();c2box(G,64,18,26,180,0,54,M.stone,true);c2lot(148,212,41,67,18);
  const vault=new THREE.Mesh(new THREE.CylinderGeometry(11,11,60,24,1,false,0,Math.PI),M.glass);vault.rotation.z=Math.PI/2;vault.rotation.y=Math.PI/2;vault.position.set(180,18,54);vault.scale.set(1,1,.9);G.add(vault);
  for(const px of[151,209]){c2box(G,10,22,26,px,0,54,M.plain,true);const ck=mkCanvas(128,128,(x)=>{x.fillStyle='#f4ead0';x.beginPath();x.arc(64,64,62,0,TAU);x.fill();x.strokeStyle='#2a2418';x.lineWidth=5;x.stroke();x.fillStyle='#2a2418';for(let k=0;k<12;k++){const a=k/12*TAU;x.fillRect(64+Math.sin(a)*50-3,64-Math.cos(a)*50-3,6,6)}});
    const face=new THREE.Mesh(new THREE.CircleGeometry(3.4,32),new THREE.MeshBasicMaterial({map:new THREE.CanvasTexture(ck)}));face.position.set(px,15,40.9);face.rotation.y=Math.PI;G.add(face);
    const hh=new THREE.Mesh(new THREE.BoxGeometry(.22,2,.05),C2M.dark);hh.position.set(px,15.6,40.8);G.add(hh);const mh=new THREE.Mesh(new THREE.BoxGeometry(.16,2.9,.05),C2M.dark);mh.position.set(px+.6,15.3,40.8);mh.rotation.z=.9;G.add(mh);const gl=glowSprite(0xffe8b0,9,.35);gl.position.set(px,15,40);G.add(gl)}
  c2rect(146,214,41,67);c2pin(180,54)}
{const _mt=muTick;muTick=function(dt){_mt(dt);if(C2P.jets){const t=performance.now()*.001;C2P.jets.forEach((j,i)=>{const h=4+Math.sin(t*2+i*.7)*2.5;j.scale.set(1,h,1);j.position.y=h/2})}}}
/* the Île aux Cygnes is solid ground in the middle of the Seine */
{const _w=stWater;stWater=function(x,z){if(CH2.expanded&&Math.abs(z)<1.8&&x>-432&&x<-272)return false;return _w(x,z)}}
{const _g=groundAt;groundAt=function(x,z,y){if(MODE!=='open'&&CH2.expanded&&z>-2800&&Math.abs(z)<1.8&&x>-432&&x<-272)return .8;return _g.apply(this,arguments)}}

function c2safe(from,fw,dmin,dmax){const a0=Math.atan2(fw.x,fw.z);for(let k=0;k<24;k++){const a=a0+(k%2?1:-1)*Math.ceil(k/2)*.33;for(const d of[dmax,(dmin+dmax)/2,dmin]){const x=from.x+Math.sin(a)*d,z=from.z+Math.cos(a)*d;if(validSpot(x,z,1.2)&&!stWater(x,z)&&!lotAt(x,z))return V3(x,groundAt(x,z),z)}}const p=from.clone().addScaledVector(fw,3);p.y=groundAt(p.x,p.z);return p}
/* ---------- Kaen's journal ---------- */
function buildJournal(){const g=new THREE.Group();const cov=std({color:0x3a1420,roughness:.6,emissive:0x12040a});
  const pc=mkCanvas(256,320,(x)=>{x.fillStyle='#efe2c4';x.fillRect(0,0,256,320);x.strokeStyle='rgba(120,60,200,.85)';x.lineWidth=2;for(let l=0;l<16;l++){x.beginPath();let px=18;x.moveTo(px,30+l*17);while(px<238){px+=rand(4,10);x.lineTo(px,30+l*17+rand(-2,2))}x.stroke()}x.strokeStyle='rgba(160,80,255,.9)';x.lineWidth=3;x.beginPath();x.arc(128,290,18,0,TAU);x.stroke()});
  const pm=new THREE.MeshBasicMaterial({map:new THREE.CanvasTexture(pc),side:THREE.DoubleSide});
  for(const s of[-1,1]){const c=new THREE.Mesh(new THREE.BoxGeometry(.62,.04,.82),cov);c.position.set(s*.32,0,0);c.rotation.z=-s*.12;g.add(c);const p=new THREE.Mesh(new THREE.PlaneGeometry(.58,.78),pm);p.rotation.x=-Math.PI/2;p.position.set(s*.31,.035,0);p.rotation.y=s*.12;g.add(p)}
  const flip=new THREE.Mesh(new THREE.PlaneGeometry(.58,.78),pm);flip.geometry.translate(.29,0,0);flip.rotation.x=-Math.PI/2;flip.position.y=.04;g.add(flip);
  const gl=glowSprite(0xb080ff,3.5,.7);g.add(gl);g.userData={flip,gl};return g}

/* ---------- Lyra, Kaen's sister ---------- */
function buildLyra(){const a=makeCHActor('f',{skin:0xfff1e8,skinLift:[1.42,1.56,1.66],hair:'hairLong',hairCol:0x0e0e12,brow:0x101014,eyeTint:0xd8c8c0,keepReg:[5,6,7,8,9],
    wear:[['tee',0xf2efea,{roughness:.6}],['trousers',0x8c1418,{roughness:.55}],['shoes',0x111114,{roughness:.4}]]});if(!a)return null;const SK=a.S.SK;
  const at=(b,m,off)=>{try{if(SK[b])a.attach(b,m,SK[b].clone().add(off||V3()))}catch(e){}};const red=std({color:0xa01820,roughness:.45}),gold=std({color:0xd8b060,metalness:.9,roughness:.3}),blk=std({color:0x16141a,roughness:.5});
  const sash=new THREE.Mesh(new THREE.TorusGeometry(.15,.016,6,32),red);sash.scale.set(1,1.55,1);sash.rotation.set(Math.PI/2-.2,.55,0);at('spine_03',sash,V3(0,.02,0));
  const belt=new THREE.Mesh(new THREE.CylinderGeometry(.138,.132,.09,28,1,true),std({color:0x7a1016,roughness:.5,side:THREE.DoubleSide}));at('spine_01',belt,V3(0,.0,0));
  const cord=new THREE.Mesh(new THREE.TorusGeometry(.142,.007,6,32),gold);cord.rotation.x=Math.PI/2;at('spine_01',cord,V3(0,-.03,0));
  const coil=new THREE.Mesh(new THREE.TorusGeometry(.07,.012,6,20),red);coil.rotation.y=Math.PI/2;at('pelvis',coil,V3(.15,-.02,-.02));
  const tail=new THREE.Mesh(new THREE.CylinderGeometry(.035,.012,.62,8),std({color:0x0e0e12,roughness:.55}));tail.position.set(0,-.3,0);const tg=new THREE.Group();tg.add(tail);tg.rotation.x=.35;at('Head',tg,V3(0,.1,-.11));
  for(const s of['l','r']){const gv=new THREE.Mesh(new THREE.CylinderGeometry(.045,.04,.09,10),blk);at('hand_'+s,gv,V3(0,0,0));const bt=new THREE.Mesh(new THREE.CylinderGeometry(.06,.055,.3,12),blk);at('calf_'+s,bt,V3(0,-.12,0));
    const st=new THREE.Mesh(new THREE.TorusGeometry(.062,.006,4,16),gold);st.rotation.x=Math.PI/2;at('calf_'+s,st,V3(0,-.04,0));const em=new THREE.Mesh(new THREE.TorusGeometry(.075,.005,4,20),gold);em.rotation.x=Math.PI/2;at('thigh_'+s,em,V3(0,-.18,0))}
  return a}
const LYR={a:null,t:0,panelT:0};
function lyraPlace(x,z,face){if(!LYR.a){LYR.a=buildLyra();if(!LYR.a)return;scene.add(LYR.a.g);const mk=glowSprite(0xff8f8f,1.1,.9);mk.position.y=2.6;LYR.a.g.add(mk);LYR.mk=mk}
  LYR.a.g.position.set(x,groundAt(x,z),z);LYR.a.g.rotation.y=face||0;LYR.a.g.visible=true;try{LYR.a.setBase('Idle_Loop');LYR.a.update(.6)}catch(e){}}
function lyraToTroca(){lyraPlace(-126,-112,0);LYR.home=true;CH2.obj=()=>CH2.zone==='paris'&&LYR.a&&LYR.home?`Meet <b>Lyra</b> at the Trocadéro · ${Math.round(Math.hypot(P.pos.x+126,P.pos.z+112))}m`:null}
{const _mt=muTick;muTick=function(dt){_mt(dt);if(!LYR.a||!LYR.a.g.visible)return;try{LYR.a.update(dt)}catch(e){}if(LYR.mk)LYR.mk.material.opacity=.6+Math.sin(performance.now()*.004)*.3;
  if(!LYR.home||CS.active||!started||CH2.zone!=='paris')return;const g=LYR.a.g.position;const dx=P.pos.x-g.x,dz=P.pos.z-g.z,d=Math.hypot(dx,dz);LYR.a.g.rotation.y=lerpAngle(LYR.a.g.rotation.y,Math.atan2(dx,dz),Math.min(1,dt*3));
  if(d<1.3){P.pos.x=g.x+dx/d*1.3;P.pos.z=g.z+dz/d*1.3}LYR.panelT-=dt;if(CH2.st>=3){if(typeof lyHint==='function')lyHint(d<3.2&&!bossRef&&!(CH2.st===8&&!XII.lazy))}else if(d<4&&LYR.panelT<=0&&!bossRef){LYR.panelT=9;lyraPanel()}else if(d>7&&LYR.panelT>1)LYR.panelT=1}}
function lyraPanel(){if(CH2.st===7&&MODE!=='open'){const c=tutCard(`<div class="tl">Lyra</div><h3>Not yet</h3><p>Kaen's ash is still out there on the Trocadéro. Bring it to me first, then I'll open the door.</p><div class="row"><button data-a="ok">OK</button></div>`);c.onclick=e=>{if(e.target.closest('[data-a]'))tutHide()};return}if(CH2.st===8&&!XII.lazy){xiiLazy();return}const again=CH2.st>=3,back=false;const c=tutCard(`<div class="tl">Lyra</div><h3>The door to Calais</h3><p>${again?(CH2.st>=7?'Calais is as far as my magic reaches. From there it is the sea, the gem and your broom. My door in Calais brings you home.':'Calais is as far as my magic reaches. From there you fly the Channel again. My brother is still in the Tower.'):'From Calais you fly alone, across the cursed water, all the way to London. Ready, witch?'}</p><div class="row"><button class="gh" data-a="no">Not yet</button><button data-a="go">Open the door</button></div>`);
  c.onclick=e=>{const b=e.target.closest('[data-a]');if(!b)return;tutHide();if(b.dataset.a==='go')ch2Depart(back)}}

/* ---------- the finale of chapter 1 now opens chapter 2 ---------- */
{const _vd=victoryDawn;victoryDawn=function(center,orb,lines){if(MODE==='open'||!lines||!lines[0]||lines[0][0]!=="Kaen's Spirit")return _vd.apply(this,arguments);ch2Finale(center,orb,lines)}}
function ch2Finale(center,orb,lines){STATS.won=true;writeSave();snow.force=false;let dk=dawnK;const c=P.pos.clone();const fw=()=>V3(Math.sin(P.face),0,Math.cos(P.face));let book=null,bt=0;
  const up=dt=>{dk=Math.min(1,dk+dt*.2);setDawn(dk)};const bookTick=dt=>{if(!book)return;bt+=dt;const tg=headOf(P.pos,1.25).addScaledVector(fw(),1.1);book.position.lerp(tg,Math.min(1,dt*1.4));book.position.y+=Math.sin(bt*2)*.003;book.rotation.y=P.face+Math.PI;
    const f=book.userData.flip;f.rotation.z=-Math.abs(Math.sin(bt*.8))*Math.PI;if(Math.random()<.4)SP.emit(book.position.clone(),{c0:0xe0d0ff,c1:0x5020a0,s0:.25,s1:.03,life:1,up:1,speed:.3})};
  const bookShot=(side,dist,h)=>()=>{const b=book?book.position:headOf(P.pos,1.2);const f=fw(),r=V3(f.z,0,-f.x);return{pos:b.clone().addScaledVector(f,dist||1.6).addScaledVector(r,(side||1)*.7).add(V3(0,h||.5,0)),look:b.clone()}};
  let lyr=null;const lyShot=(d)=>()=>{const g=lyr?lyr.g.position:P.pos;const dv=V3(P.pos.x-g.x,0,P.pos.z-g.z).normalize();return{pos:headOf(g,1.6).addScaledVector(dv,d||2.6).addScaledVector(V3(dv.z,0,-dv.x),.6),look:headOf(g,1.55)}};
  const shots=[
    {who:lines[0][0],text:lines[0][1],cam:orb,update:()=>SP.emit(V3(center.x+rand(-2,2),center.y+rand(1,4),center.z+rand(-2,2)),{c0:0xe0c0ff,c1:0x4010a0,s0:.5,s1:.1,life:.8,up:2})},
    {dur:5.5,fov:58,cut:true,title:['The illusion breaks',"Kaen's prison falls"],cam:k=>({pos:V3(c.x-7,c.y+2+k*1.5,c.z+9),look:V3(c.x,c.y+55+k*30,c.z-30)}),onStart:()=>{skyShatter()}},
    {dur:6.5,fov:50,cut:true,title:['Paris','The 7th & the 16th'],onStart:()=>{ch2ExpandParis();CH2.mourn=true},cam:k=>({pos:V3(-40+k*36,86-k*16,150-k*30),look:V3(-126,8,-50)}),update:up},
    {dur:4.2,fov:34,cut:true,cam:k=>({pos:headOf(P.pos,.9).addScaledVector(fw(),3.4-k*.6).addScaledVector(V3(fw().z,0,-fw().x),1.2),look:headOf(P.pos,.9)}),onStart:()=>{P.heroAnim='Crouch_Idle_Loop';W.talking=false},update:up},
    {who:'@',text:lines[1][1],cam:witchShot(1,3.2,1.3),update:up},
    {dur:3.6,fov:40,cut:true,cam:bookShot(1,2.2,.9),onStart:()=>{book=buildJournal();book.position.copy(headOf(P.pos,7)).addScaledVector(fw(),1.1);scene.add(book);sx('book',.9,()=>{try{sfx.gem()}catch(e){}});flash(book.position,0xb080ff,6)},update:dt=>{bookTick(dt);up(dt)}},
    {who:"Kaen's Journal",text:LY.ly01,cam:bookShot(-1,1.4,.6),update:bookTick},
    {who:"Kaen's Journal",text:LY.ly02,cam:bookShot(1,1.2,.45),update:bookTick},
    {who:"Kaen's Journal",text:LY.ly03,cam:witchShot(-1,2.6,1.4),update:bookTick},
    {who:"Kaen's Journal",text:LY.ly04,cam:bookShot(-1,1.1,.5),update:bookTick},
    {who:"Kaen's Journal",text:LY.ly05,cam:k=>({pos:V3(c.x+Math.sin(k)*9,c.y+5+k*3,c.z+Math.cos(k)*9),look:headOf(P.pos,1.2)}),update:bookTick},
    {who:"Kaen's Journal",text:LY.ly06,cam:bookShot(1,1.3,.5),update:bookTick},
    {dur:2.8,fov:44,cut:true,cam:k=>({pos:headOf(P.pos,1.7).addScaledVector(fw(),-3.2).addScaledVector(V3(fw().z,0,-fw().x),1.4),look:headOf(P.pos,1.2).addScaledVector(fw(),6)}),
      onStart:()=>{P.heroAnim='Spell_Simple_Idle_Loop';const p=c2safe(P.pos,fw(),3.5,6.5);P.face=Math.atan2(p.x-P.pos.x,p.z-P.pos.z);lyr=buildLyra();if(lyr){lyr.g.position.copy(p);lyr.g.rotation.y=P.face+Math.PI;scene.add(lyr.g);try{lyr.setBase('Idle_Loop');lyr.update(.5)}catch(e){}}
        sx('portal',.9,()=>{try{sfx.blink()}catch(e){}});flash(headOf(p,1),0xff7070,10);runeFlash(p,0xff6060,5,1.5);SP.emit(headOf(p,1.2),{n:120,c0:0xffffff,c1:0xc02030,speed:7,life:1})},update:dt=>{if(lyr)lyr.update(dt);bookTick(dt)}},
    {who:'@',text:"Who's there?! Stay back. I'm warning you.",cam:witchShot(1,3.2),update:dt=>{if(lyr)lyr.update(dt);bookTick(dt)}},
    {who:'???',text:LY.ly07,cam:lyShot(2.8),update:dt=>{if(lyr)lyr.update(dt)}},
    {who:'Lyra',text:LY.ly08,cam:lyShot(2.2),update:dt=>{if(lyr)lyr.update(dt)}},
    {who:'@',text:'His sister? He killed Bilel!',cam:witchShot(-1,3),onStart:()=>{P.heroAnim=null},update:dt=>{if(lyr)lyr.update(dt)}},
    {who:'Lyra',text:LY.ly10,cam:lyShot(2.5),update:dt=>{if(lyr)lyr.update(dt)}},
    {who:'Lyra',text:LY.ly09,cam:lyShot(2),update:dt=>{if(lyr)lyr.update(dt)}},
    {who:'@',text:'So the real Kaen is still out there. Suffering.',cam:witchShot(1,3.2),update:dt=>{if(lyr)lyr.update(dt)}},
    {who:'Lyra',text:LY.ly11,cam:lyShot(2.6),update:dt=>{if(lyr)lyr.update(dt)}},
    {who:'Lyra',text:LY.ly12,cam:lyShot(2.3),update:dt=>{if(lyr)lyr.update(dt)}},
    {who:'Lyra',text:LY.ly13,cam:lyShot(2.1),update:dt=>{if(lyr)lyr.update(dt)}},
    {who:'@',text:'London, then. Bilel would have gone.',cam:witchShot(-1,3.4),update:dt=>{if(lyr)lyr.update(dt)}}];
  playCutscene(shots,()=>{CH2.mourn=false;P.heroAnim=null;setDawn(.55);if(book){scene.remove(book);book=null}if(lyr){scene.remove(lyr.g);lyr=null}CH2.st=Math.max(CH2.st,1);ch2Save();lyraToTroca();
    toast('Lyra waits at the Trocadéro, across the river from the tower. The real Paris is open: the 7th and the 16th.','Lyra',true);
})}

/* ---------- load / new game ---------- */
{const _sg=startGame;startGame=function(fromSave){const r=_sg.apply(this,arguments);if(MODE==='open')return r;
  if(!fromSave){CH2.st=0;ch2Save()}
  if(CH2.st>=1&&STATS.won){ch2ExpandParis();lyraToTroca()}else prisonWall();return r}}

/* softer light: less bloom in story mode, lighter dawn haze after Kaen */
{const _mt=muTick;muTick=function(dt){_mt(dt);if(MODE==='open'||!bloomPass||CS.active&&OWT.fog!=null)return;bloomPass.strength=.22;bloomPass.threshold=.9;
  if(CH2.st>=1&&CH2.zone==='paris'){scene.fog.density=Math.min(scene.fog.density,.0062);if(dawnK>.6)setDawn(.55)}}}
