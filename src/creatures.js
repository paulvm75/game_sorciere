/* ---------- sculpted boss builds + animation ---------- */
function scAttach(m,bone,obj,wp){const b=m.B[bone];const bp=m.hdr.bones.find(x=>x.n===bone).p;obj.position.set(wp[0]-bp[0],wp[1]-bp[1],wp[2]-bp[2]);b.add(obj);return obj}
function scEyes(m,bone,pts,col,size,iris){const out=[];for(const p of pts){const e=new THREE.Mesh(G.sphereLo||new THREE.SphereGeometry(1,12,8),new THREE.MeshBasicMaterial({color:col}));e.scale.setScalar(size);scAttach(m,bone,e,p);
  if(iris){const s=new THREE.Mesh(G.sphereLo||new THREE.SphereGeometry(1,12,8),new THREE.MeshBasicMaterial({color:0x000000}));s.scale.set(.25,.9,.5);s.position.z=.75;e.add(s)}
  const gl=glowSprite(col,size*9,.55);e.add(gl);gl.scale.setScalar(9);out.push(e)}return out}
function scMouthPt(m,bone,wp){const o=new THREE.Object3D();scAttach(m,bone,o,wp);return o}
/* ===== The Crimson Nine-Tails ===== */
function buildBeast2(){const m=scBuild('beast',{rim:0x3a0806,furF:46,env:.6});if(!m)return null;
  m.eyes=scEyes(m,'head',[[.43,5.03,3.93],[-.43,5.03,3.93]],0xffc040,.085,true);m.head=scMouthPt(m,'head',[0,4.48,4.86]);m.jaw=m.B.jaw;
  m.tailTips=[];for(let i=0;i<9;i++){const b=m.B['t'+i+'c'];if(b)m.tailTips.push(b)}
  const aura=glowSprite(0xff2010,14,.05);aura.position.y=3.5;m.body.add(aura);m.anim=beast2Anim;return m}
function beast2Anim(e,dt,mv,lunge){const m=e.m,t=e.t,b=m.body;m.U.uTime.value=t;
  const sp=6.5,ph=t*sp;const w=Math.min(1,mv*1.3);quadLegs(m,ph,w,lunge);
  const breath=e.ai&&e.ai.breathT>0;
  b.position.y=Math.abs(Math.sin(ph))*.18*w+(1-w)*Math.sin(t*1.4)*.05;
  scRot(m,'pelvis',Math.sin(ph*2)*.03*w,0,Math.sin(ph)*.03*w);scRot(m,'spine',-.02+Math.sin(ph*2+.5)*.04*w,0,0);scRot(m,'chest',(1-w)*Math.sin(t*1.4)*.03-lunge*.25,0,0);
  let look=0;if(P&&P.pos){const dx=P.pos.x-e.pos.x,dz=P.pos.z-e.pos.z;const fa=e.m.g.rotation.y+(b.rotation.y||0);look=clamp(Math.atan2(Math.sin(Math.atan2(dx,dz)-fa),Math.cos(Math.atan2(dx,dz)-fa)),-.6,.6)}
  scRot(m,'neck',-.05+Math.sin(ph*2)*.05*w-lunge*.2+(breath?-.15:0),look*.4,0);scRot(m,'head',Math.sin(t*1.1)*.05+lunge*.25+(breath?.1:0),look*.5,Math.sin(t*.7)*.05);
  scRot(m,'jaw',(breath?.55:Math.max(0,Math.sin(t*1.5))*.12)+lunge*.5,0,0);
  for(let i=0;i<9;i++){const q=i*1.37;const amp=1+(e.hp<e.maxhp*.5?.6:0);
    scRot(m,'t'+i+'a',Math.sin(t*1.7+q)*.1*amp+w*.08,Math.sin(t*1.3+q)*.08*amp,Math.sin(t*1.1+q*.7)*.1*amp);
    scRot(m,'t'+i+'b',Math.sin(t*1.7+q-.8)*.2*amp,Math.sin(t*1.3+q-.7)*.14*amp,Math.sin(t*1.1+q*.7-.9)*.18*amp);
    scRot(m,'t'+i+'c',Math.sin(t*1.7+q-1.6)*.3*amp,Math.sin(t*1.3+q-1.4)*.2*amp,Math.sin(t*1.1+q*.7-1.8)*.28*amp)}
  if(e.spinT>0){e.spinT-=dt;b.rotation.y+=dt*14}else b.rotation.y=lerp(b.rotation.y,0,Math.min(1,dt*6));
  if(Math.random()<.35&&m.tailTips.length){const tp=m.tailTips[(Math.random()*m.tailTips.length)|0].getWorldPosition(V3());FL.emit(tp.add(V3(rand(-.6,.6),rand(0,.8),rand(-.6,.6))),{c0:0xffa050,c1:0xa01000,s0:.9,s1:.15,life:.55,up:1.6})}
  if(breath&&Math.random()<.6)SM.emit(m.head.getWorldPosition(V3()),{c0:0x402020,c1:0x100505,s0:.6,s1:2,life:.8,a:.3,up:.6})}
ETYPES.beast.build=()=>buildBeast2()||buildBeast();

function quadLegs(m,ph,w,lunge){const leg=(sd,p,front)=>{const s=Math.sin(p),c=Math.cos(p);
    if(front){scRot(m,'sh_'+sd,-s*.55*w,0,0);scRot(m,'el_'+sd,Math.max(0,c)*.9*w+lunge*.2,0,0);scRot(m,'wr_'+sd,-Math.max(0,c)*.5*w,0,0)}
    else{scRot(m,'hip_'+sd,-s*.5*w,0,0);scRot(m,'kn_'+sd,-Math.max(0,c)*.55*w,0,0);scRot(m,'hk_'+sd,Math.max(0,c)*.75*w,0,0);scRot(m,'hp_'+sd,-Math.max(0,c)*.4*w,0,0)}};
  leg('l',ph,1);leg('r',ph+Math.PI,1);leg('l',ph+Math.PI*.9,0);leg('r',ph-Math.PI*.1,0)}
function scLook(e){if(!P||!P.pos)return 0;const dx=P.pos.x-e.pos.x,dz=P.pos.z-e.pos.z;const fa=e.m.g.rotation.y+(e.m.body.rotation.y||0);const a=Math.atan2(dx,dz)-fa;return clamp(Math.atan2(Math.sin(a),Math.cos(a)),-.7,.7)}
/* ===== Azurmaw, the Grinning Cat ===== */
let CAT_IRIS=null;function catIrisTex(){if(CAT_IRIS)return CAT_IRIS;CAT_IRIS=canvasTex(128,128,(x,w,h)=>{const g=x.createRadialGradient(64,64,4,64,64,64);g.addColorStop(0,'#fff6a0');g.addColorStop(.45,'#ffc21a');g.addColorStop(.8,'#ff6a00');g.addColorStop(1,'#401000');x.fillStyle=g;x.fillRect(0,0,w,h);
  x.fillStyle='#050305';x.beginPath();x.ellipse(64,64,9,50,0,0,Math.PI*2);x.fill();x.fillStyle='rgba(255,255,255,.85)';x.beginPath();x.ellipse(46,40,8,6,-.5,0,Math.PI*2);x.fill()});return CAT_IRIS}
function buildCat2(s){const kit=s<1;const m=scBuild(kit&&SCU.data.catdemon_lo?'catdemon_lo':'catdemon',{rim:0x0c1440,furF:40,env:.5,scale:kit?s:1});if(!m)return null;
  const sc=kit?s:1;m.eyes=[];for(const q of[-1,1]){const eg=new THREE.Group();const ball=new THREE.Mesh(new THREE.SphereGeometry(.4,20,14),new THREE.MeshBasicMaterial({color:0x2a1000}));eg.add(ball);
    const ir=new THREE.Mesh(new THREE.CircleGeometry(.39,32),new THREE.MeshBasicMaterial({map:catIrisTex(),transparent:true}));ir.position.z=.405;ir.scale.y=1.05;eg.add(ir);
    const gl=glowSprite(0xffa020,1.8,.3);gl.position.z=.42;eg.add(gl);eg.rotation.y=q*.3;scAttach(m,'head',eg,[q*.64,4.5,3.3]);m.eyes.push(eg)}
  m.head=scMouthPt(m,'head',[0,3.9,3.7]);m.jaw=m.B.jaw;m.fur=m.mat;m.anim=cat2Anim;
  if(!kit){const aura=glowSprite(0x4060ff,12,.05);aura.position.y=3;m.body.add(aura)}return m}
function cat2Anim(e,dt,mv,lunge){const m=e.m,t=e.t,b=m.body;m.U.uTime.value=t;const kit=e.type==='kitten';const w=Math.min(1,mv*1.3*(kit?1.3:1));const ph=t*(kit?11:7.5);
  quadLegs(m,ph,w,lunge);b.position.y=Math.abs(Math.sin(ph))*.22*w*(kit?.3:1);
  scRot(m,'spine',Math.sin(ph*2)*.05*w,0,0);scRot(m,'chest',-lunge*.3+Math.sin(t*1.2)*.02,0,0);const lk=scLook(e);
  const grin=e.ai&&e.ai.grin>0?(e.ai.grin-=dt,1):0;const st=e.ai&&e.ai.stare>0?1:0;
  scRot(m,'neck',-lunge*.2,lk*.35,0);scRot(m,'head',lunge*.2+Math.sin(t*.9)*.05,lk*.45,Math.sin(t*.6)*.12+grin*.15);scRot(m,'jaw',lunge*.45+grin*.3+Math.max(0,Math.sin(t*1.3))*.05,0,0);
  for(let j=0;j<5;j++)scRot(m,'tl'+j,Math.sin(t*1.8-j*.6)*.12,Math.sin(t*1.3-j*.7)*.25,Math.sin(t*1.1-j*.5)*.08);
  if(!kit&&e.ai){const want=e.ai.vanish>0?.04:1;const o=m.mat.opacity;const no=lerp(o,want,Math.min(1,dt*6));m.mat.transparent=no<.98;m.mat.opacity=no;m.mat.depthWrite=no>.5}
  m.eyes.forEach(g=>g.scale.setScalar(1+st*.9+Math.sin(t*9)*.05*st))}
ETYPES.catdemon.build=()=>buildCat2(1)||buildCat(1);ETYPES.kitten.build=()=>buildCat2(.32)||buildCat(.3);
/* ===== Gorgoloth, the Crimson Slug ===== */
function buildSlug2(s){const m=scBuild(s<1&&SCU.data.slug_lo?'slug_lo':'slug',{rim:0x3a0804,env:.9,glow:0xff8030,glowK:1.2,scale:s});if(!m)return null;const X=m.hdr.extra;
  m.head=scMouthPt(m,'head',X.mouth);m.jaw=m.B.jaw;m.s=s;m.tips=X.tips.map(p=>{const gl=glowSprite(0xffa040,1.6,.8);scAttach(m,'head',gl,p);return gl});
  if(s>=1){const glow=glowSprite(0xff3010,12,.05);glow.position.y=3;m.body.add(glow)}m.anim=slug2Anim;return m}
function slug2Anim(e,dt,mv,lunge){const m=e.m,t=e.t;m.U.uTime.value=t;const ai=e.ai||{};const rear=ai.rear>0?(ai.rear-=dt,Math.min(1,ai.rear*2)):0;const sink=ai.sink||0;
  m.body.position.y=-sink*8*m.s;const lk=scLook(e);
  for(let j=0;j<8;j++){const k=j/7;scRot(m,'s'+j,Math.sin(t*2.2-j*.9)*.035*(.5+mv)-(j>=4?rear*.14:0),Math.sin(t*1.5-j*.75)*.09*(1-k*.4)+(j>=5?lk*.12:0),Math.sin(t*1.1-j*.5)*.03)}
  scRot(m,'head',lunge*.55-rear*.25+Math.sin(t*1.3)*.05,lk*.2,Math.sin(t*.9)*.06);scRot(m,'jaw',lunge*.35+rear*.2+Math.max(0,Math.sin(t*2))*.08,0,0);
  if(Math.random()<.05&&m.tips.length)SP.emit(m.tips[(Math.random()*m.tips.length)|0].getWorldPosition(V3()),{c0:0xffc070,c1:0xff2000,s0:.5,s1:.2,life:1,grav:10,speed:.2})}
ETYPES.slug.build=()=>buildSlug2(1)||buildSlug(1);ETYPES.slugling.build=()=>buildSlug2(.26)||buildSlug(.26);
/* ===== Hrímgar, the Frost Giant ===== */
function buildGiant2(){const m=scBuild('giant',{rim:0x1a3a6a,env:.8,glow:0x80e0ff,glowK:.9});if(!m)return null;
  m.eyes=scEyes(m,'head',[[.48,10.92,3.2],[-.48,10.92,3.2]],0x9af0ff,.12,false);m.head=scMouthPt(m,'head',[0,10.16,3.6]);m.jaw=m.B.jaw;
  {const G=SCU.data.giant.geo;if(!G.__ice){G.__ice=1;const P=G.attributes.position.array,C=G.attributes.color;for(let i=0;i<C.count;i++){if(P[i*3+1]>11.2&&C.getX(i)+C.getY(i)+C.getZ(i)<.35)C.setXYZ(i,.55,.78,.95)}C.needsUpdate=true}}
  /* ice king: crown of ice, glowing heart crystal, ice pauldrons and bracers */
  {const ice=new THREE.MeshStandardMaterial({color:0xd8f2ff,emissive:0x2a7ad0,emissiveIntensity:.55,roughness:.12,metalness:.15,transparent:true,opacity:.92,envMapIntensity:1.6});
    const ice2=new THREE.MeshStandardMaterial({color:0x9fd6ff,emissive:0x1a5ab0,emissiveIntensity:.45,roughness:.2,metalness:.25,envMapIntensity:1.4});
    const cone=new THREE.ConeGeometry(1,1,5);const oct=new THREE.OctahedronGeometry(1,0);
    const spike=(bone,x,y,z,len,w,dx,dy,dz,mat)=>{const s=new THREE.Mesh(cone,mat||ice);s.scale.set(w,len,w);const d=new THREE.Vector3(dx,dy,dz).normalize();s.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),d);
      const o=new THREE.Object3D();o.add(s);s.position.copy(d).multiplyScalar(len/2);scAttach(m,bone,o,[x,y,z]);return o};
    const n=11;for(let k=0;k<n;k++){const a=(k/n)*Math.PI*2;const fr=Math.cos(a);const len=.7+.9*Math.max(0,fr)+(k===0?.6:0)+(k%2?0:.2);spike('head',Math.sin(a)*1.05,11.55,2.15+Math.cos(a)*1.05,len,.13+.05*Math.max(0,fr),Math.sin(a)*.25,1,Math.cos(a)*.25)}
    {const band=new THREE.Mesh(new THREE.TorusGeometry(1.08,.12,6,22),ice2);band.rotation.x=Math.PI/2;scAttach(m,'head',band,[0,11.5,2.15])}
    const heart=new THREE.Mesh(oct,new THREE.MeshBasicMaterial({color:0x7fd4ff}));heart.scale.set(.5,.8,.32);scAttach(m,'chest',heart,[0,8.1,3.42]);const hg=glowSprite(0x4ab8ff,5,.9);heart.add(hg);hg.scale.setScalar(1/.5);m.heart=heart;
    for(const k of[-1,1]){const fr=new THREE.Mesh(oct,ice2);fr.scale.set(.28,.5,.18);fr.rotation.z=k*.6;scAttach(m,'chest',fr,[k*.62,7.95,3.3])}
    for(const sd of['l','r']){const q=sd==='l'?1:-1;for(let k=0;k<5;k++)spike('sh_'+sd,q*(2.3+k*.22),10.05+(k%2)*.1,0.2+k*.25,1+((k*7)%3)*.35,.22,q*.55,1,(k-2)*.15);
      for(let k=0;k<3;k++)spike('el_'+sd,q*(3.55),5.9-k*.55,1.2,.65,.14,q*1,.25,.2,ice2)}}
  const aura=glowSprite(0x80c8ff,16,.04);aura.position.y=7;m.body.add(aura);m.anim=giant2Anim;m.mat.color&&m.mat.color.setHex(0xdcecff);return m}
function giant2Anim(e,dt,mv,lunge){const m=e.m,t=e.t,b=m.body;m.U.uTime.value=t;const w=Math.min(1,mv*1.4);const ph=t*2.6;
  const sm=e.smash>0?(e.smash-=dt,e.smash):0;const raise=sm>0?Math.sin((1-sm/1.6)*Math.PI):0;const breath=e.ai&&e.ai.breathT>0;
  for(const[sd,o]of[['l',0],['r',Math.PI]]){const s=Math.sin(ph+o);scRot(m,'hip_'+sd,-s*.38*w,0,0);scRot(m,'kn_'+sd,Math.max(0,Math.sin(ph+o+1.2))*.55*w,0,0);scRot(m,'an_'+sd,-Math.max(0,Math.sin(ph+o+1.2))*.25*w,0,0);
    const q=sd==='l'?1:-1;scRot(m,'sh_'+sd,s*.32*w-raise*2.5-lunge*1.1+Math.sin(t*1.1+o)*.04,0,q*(.05+raise*.25));scRot(m,'el_'+sd,-.25-raise*.7-lunge*.5-Math.max(0,s)*.2*w,0,0);scRot(m,'wr_'+sd,Math.sin(t*1.3+o)*.05,0,0)}
  b.position.y=Math.abs(Math.sin(ph))*.3*w;const lk=scLook(e);
  scRot(m,'pelvis',0,Math.sin(ph)*.06*w,0);scRot(m,'spine',.05+lunge*.25+raise*-.15,-Math.sin(ph)*.05*w,0);scRot(m,'chest',Math.sin(t*1.2)*.03+lunge*.15,lk*.25,0);
  scRot(m,'neck',-.05,lk*.3,0);scRot(m,'head',(breath?-.25:0)+Math.sin(t*.8)*.04,lk*.3,Math.sin(t*.7)*.05);scRot(m,'jaw',breath?.45:lunge*.25+Math.max(0,Math.sin(t*1.4))*.05,0,0);
  if(mv>.3&&Math.abs(Math.sin(ph))<.06&&!e.stepT){e.stepT=.3;P.shake=Math.max(P.shake,.25);noise(.3,.12,200)}if(e.stepT>0)e.stepT-=dt;else e.stepT=0;
  if(m.heart)m.heart.scale.set(.5,.8,.32).multiplyScalar(1+Math.sin(t*3)*.08);
  if(Math.random()<.4)SM.emit(V3(e.pos.x+rand(-3,3),e.pos.y+rand(1,4),e.pos.z+rand(-3,3)),{c0:0xe0f4ff,c1:0x8090c0,s0:2,s1:5,life:1.5,a:.2})}
ETYPES.giant.build=()=>buildGiant2()||buildGiant();
/* ===== Hakuko, the Masked Fox (humanoid) ===== */
function buildKitsune2(){const a=makeCHActor('f',{skin:0xfff4f0,skinLift:[1.45,1.6,1.7],hair:'hairLong',hairCol:0x14101a,brow:0x14101a,eyeTint:0xffb0b0,scale:1.32,
    wear:[['long',0xf4f2f4,{roughness:.55}],['witch',0xf2eef2,{roughness:.6,side:THREE.DoubleSide}],['shoes',0x14080a,{roughness:.4}]]});if(!a)return null;const S=a.S,SK=S.SK;
  const red=std({color:0xa01020,roughness:.45}),gold=MAT.gold||std({color:0xd8b060,metalness:.9,roughness:.3});
  // obi + cord
  const obi=new THREE.Mesh(new THREE.CylinderGeometry(.135,.13,.1,28,1,true),std({color:0x9a1020,roughness:.4,side:THREE.DoubleSide}));a.attach('spine_01',obi,SK.spine_01.clone().add(new THREE.Vector3(0,.02,0)));
  const cord=new THREE.Mesh(new THREE.TorusGeometry(.14,.008,6,32),gold);cord.rotation.x=Math.PI/2;a.attach('spine_01',cord,SK.spine_01.clone().add(new THREE.Vector3(0,.02,0)));
  const bow=new THREE.Group();for(const q of[-1,1]){const l=new THREE.Mesh(G.sphere,std({color:0x9a1020,roughness:.4}));l.scale.set(.07,.045,.02);l.position.set(q*.06,0,0);l.rotation.z=q*.4;bow.add(l)}const tl=new THREE.Mesh(G.sphere,std({color:0x9a1020}));tl.scale.set(.03,.14,.012);tl.position.y=-.12;bow.add(tl);a.attach('spine_01',bow,SK.spine_01.clone().add(new THREE.Vector3(0,.03,-.14)));
  // white fur stole
  const stole=new THREE.Mesh(new THREE.TorusGeometry(.115,.034,12,28),MAT.whiteFur);stole.rotation.x=Math.PI/2+.25;stole.scale.set(1.25,1,1);a.attach('spine_03',stole,SK.spine_03.clone().add(new THREE.Vector3(0,.13,-.01)));
  if(FUR_N.value)furShells(stole,{map:TX.whitefur.map,len:.04,rep:6,shells:Math.min(5,FUR_N.value),rim:0x8090c0});
  // fox mask with ears, red markings, gold ornaments, tassels
  const mask=new THREE.Group();const mm=MAT.mask;
  const P2=(geo,mat,sx,sy,sz,x,y,z)=>{const m=new THREE.Mesh(geo,mat);m.scale.set(sx,sy,sz);m.position.set(x,y,z);mask.add(m);return m};
  P2(G.sphere,mm,.105,.1,.075,0,.01,.02);P2(G.sphere,mm,.05,.045,.1,0,-.02,.085);P2(G.sphereLo,red,.02,.015,.015,0,-.01,.185);
  for(const s of[-1,1]){const ear=P2(G.cone,mm,.05,.15,.03,s*.07,.14,-.01);ear.rotation.z=-s*.28;const inn=P2(G.cone,red,.03,.1,.02,s*.07,.13,.005);inn.rotation.z=-s*.28;
    P2(G.sphereLo,MAT.black,.025,.016,.012,s*.042,.02,.088);const ey=P2(G.sphereLo,MAT.eyeRed,.012,.009,.008,s*.042,.018,.094);ey.add(glowSprite(0xff2030,.25,.9));
    const mk=P2(G.sphere,red,.008,.035,.006,s*.042,.06,.085);mk.rotation.z=s*.5;const mk2=P2(G.sphere,red,.03,.006,.006,s*.06,-.04,.075);mk2.rotation.y=s*.6;
    const orn=new THREE.Mesh(new THREE.TorusKnotGeometry(.022,.006,40,6),gold);orn.position.set(s*.1,.03,.02);mask.add(orn);
    const tas=P2(G.cyl,red,.01,.16,.01,s*.105,-.08,.02);const tb=P2(G.sphereLo,gold,.012,.012,.012,s*.105,.0,.02)}
  a.attach('Head',mask,SK.Head.clone().add(new THREE.Vector3(0,.075,.035)));
  // hairpin
  const kan=new THREE.Mesh(G.cyl,gold);kan.scale.set(.006,.16,.006);kan.rotation.z=1.1;a.attach('Head',kan,SK.Head.clone().add(new THREE.Vector3(.02,.16,-.06)));
  // parasol in the right hand
  const para=new THREE.Group();const shaft=new THREE.Mesh(G.cyl,std({color:0x2a1010,roughness:.4}));shaft.scale.set(.012,.95,.012);shaft.position.y=.2;para.add(shaft);
  const canopy=new THREE.Mesh(lathe([[.001,.17],[.24,.13],[.54,.05],[.78,-.07]],28),MAT.parasol);canopy.position.y=.62;para.add(canopy);
  for(let k=0;k<12;k++){const r=new THREE.Mesh(G.cyl,std({color:0x3a0808}));const ang=k*TAU/12;r.scale.set(.006,.8,.006);r.position.set(Math.sin(ang)*.39,.67,Math.cos(ang)*.39);r.rotation.set(Math.cos(ang)*1.35,0,-Math.sin(ang)*1.35);para.add(r)}
  para.scale.setScalar(1.78);para.position.set(.62,1.95,.1);para.rotation.z=-.22;a.body.add(para);
  // five white tails
  const tails=[];for(let k=0;k<5;k++){const pv=new THREE.Group();const t=new THREE.Mesh(G.tail,MAT.whiteFur);t.scale.setScalar(.25);t.rotation.x=-1.1;pv.add(t);
    if(FUR_N.value)furShells(t,{map:TX.whitefur.map,len:.18,rep:6,droop:.4,shells:Math.min(5,FUR_N.value),rim:0xa0b0ff});
    a.attach('pelvis',pv,SK.pelvis.clone().add(new THREE.Vector3(0,-.02,-.12)),new THREE.Euler(-.7,(k-2)*.38,(k-2)*.18));tails.push(pv)}
  const wisps=[0,1,2,3].map(()=>{const s=glowSprite(0x6ad8ff,1.2,.8);a.body.add(s);return s});
  const aura=glowSprite(0x80d8ff,6,.06);aura.position.y=1.6;a.body.add(aura);
  a.setBase('Idle_Loop');
  return{g:a.g,body:a.body,actor:a,para,canopy,tails,wisps,head:a.head,anim:kitsune2Anim}}
function kitsune2Anim(e,dt,mv,lunge){const m=e.m,t=e.t;m.body.position.y=.35+Math.sin(t*1.5)*.15;
  m.tails.forEach((p,i)=>{p.rotation.y=(i-2)*.38+Math.sin(t*1.8+i)*.18;p.rotation.x=-.7+Math.sin(t*2.3+i*.7)*.14});
  if(e.spin>0){e.spin-=dt;m.para.rotation.y+=dt*25}else m.para.rotation.y+=dt*.8;
  m.wisps.forEach((w,i)=>{const a=t*1.6+i*TAU/4;w.position.set(Math.sin(a)*1.4,1.7+Math.sin(t*3+i)*.4,Math.cos(a)*1.4)});
  actorAnimate(e,dt,mv*.6);if(Math.random()<.15)SP.emit(eCenter(e),{c0:0x9ae8ff,c1:0x2040a0,s0:.4,s1:.1,life:1,up:1,jitter:1.2})}
ETYPES.kitsune.build=()=>buildKitsune2()||buildKitsune();
