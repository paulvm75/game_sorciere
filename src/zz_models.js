/* ================= new 3D cast: Maëlle, Kaen, Lyra, Morwen (Higgsfield / Meshy rigs) =================
   Every actor keeps its original skeleton and animation; we hide its old meshes and drive a new rigged
   model from it each frame (world-space rotation retarget + hip placement). */
const GS={buf:{},want:{maelle:'chr_maelle',kaen:'chr_kaen',kaen_lb:'chr_kaen_lb',lyra:'chr_lyra',morwen:'chr_morwen'},list:[],rest:null,off:false};
const GS_MAP={Hips:'pelvis',Spine02:'spine_01',Spine01:'spine_02',Spine:'spine_03',neck:'neck_01',Head:'Head',LeftShoulder:'clavicle_l',LeftArm:'upperarm_l',LeftForeArm:'lowerarm_l',LeftHand:'hand_l',RightShoulder:'clavicle_r',RightArm:'upperarm_r',RightForeArm:'lowerarm_r',RightHand:'hand_r',LeftUpLeg:'thigh_l',LeftLeg:'calf_l',LeftFoot:'foot_l',LeftToeBase:'ball_l',RightUpLeg:'thigh_r',RightLeg:'calf_r',RightFoot:'foot_r',RightToeBase:'ball_r'};
const GS_CHILD={Hips:'Spine02',Spine02:'Spine01',Spine01:'Spine',Spine:'neck',neck:'Head',LeftShoulder:'LeftArm',LeftArm:'LeftForeArm',LeftForeArm:'LeftHand',RightShoulder:'RightArm',RightArm:'RightForeArm',RightForeArm:'RightHand',LeftUpLeg:'LeftLeg',LeftLeg:'LeftFoot',LeftFoot:'LeftToeBase',RightUpLeg:'RightLeg',RightLeg:'RightFoot',RightFoot:'RightToeBase'};
const _gq=new THREE.Quaternion(),_gq2=new THREE.Quaternion(),_gv=new THREE.Vector3();
function gsWQ(o,root){const q=o.getWorldQuaternion(new THREE.Quaternion());if(root)q.premultiply(root.getWorldQuaternion(_gq).invert());return q}
function gsWP(o,root){const p=o.getWorldPosition(new THREE.Vector3());return root?root.worldToLocal(p):p}
function gsRootOf(g){let r=null;g.traverse(q=>{if(!r&&q.name==='root'&&q.isBone)r=q.parent});if(!r)g.traverse(q=>{if(!r&&q.name==='root')r=q.parent});if(!r)g.traverse(q=>{if(!r&&q.isBone&&q.name==='pelvis')r=q.parent});return r}
/* source rest pose: the shared UE skeleton as it sits in anims.glb, in its own root frame */
function gsRest(){if(GS.rest)return GS.rest;const a=PRE.gltf.anims;if(!a)return null;const sc=a.scene.clone(true);sc.position.set(0,0,0);sc.quaternion.identity();sc.scale.set(1,1,1);sc.updateMatrixWorld(true);
  const b={};sc.traverse(o=>{if(o.name&&!b[o.name])b[o.name]=o});const fr=gsRootOf(sc)||sc;const R={q:{},p:{}};for(const n in b){R.q[n]=gsWQ(b[n],fr);R.p[n]=gsWP(b[n],fr)}R.leg=R.p.thigh_l.y-R.p.foot_l.y;GS.rest=R;return R}
function gsLoad(key){const f=GS.want[key];if(!GS.buf[f])GS.buf[f]=fetch('assets/'+f+'.wasm').then(r=>r.ok?r.arrayBuffer():null).catch(()=>null);return GS.buf[f]}
/* which game actor is which character, read from the builder options */
function gsKeyOf(sx,o){if(!o)return null;const h=o.hairCol;
  if(sx==='m'&&o.hair==='hairPart'&&h===0x0b0a10)return 'kaen';
  if(sx==='f'&&o.hair==='hairLong'&&h===0x0e0e12)return 'lyra';
  if(sx==='f'&&h===0xc8c8d4)return 'maelle';return null}
function gsHide(o){if(o.userData.gsKeep)return;Object.defineProperty(o,'visible',{get(){return false},set(){},configurable:true})}
/* swap: g = actor group, root = node that owns the skeleton (its frame is the anims frame), keep(o) = meshes to leave visible */
/* while the new model loads, the old look never shows: the skeleton node stays hidden (or the previous new model stays on) */
function gsPend(root,on){if(on){if(root._gsPend)return;root._gsPend=1;const d=Object.getOwnPropertyDescriptor(root,'visible');root._gsV=d&&'value' in d?d.value:true;
    Object.defineProperty(root,'visible',{get(){return root._gsPend?false:root._gsV},set(v){root._gsV=v},configurable:true})}else if(root._gsPend){root._gsPend=0}}
function gsSwap(g,root,key,keep,prev){if(GS.off||!g||!root||(g.userData.gs&&!prev))return;const R=gsRest();if(!R)return;g.userData.gs={key,pending:true};
  const sb={};root.traverse(o=>{if(o.isBone&&!sb[o.name])sb[o.name]=o});if(!sb.pelvis){g.userData.gs=prev||null;return}
  if(!prev)gsPend(root,true);const fail=()=>{gsPend(root,false);if(prev)g.userData.gs=prev};
  const U={uGold:{value:0},uBolt:{value:0},uV:{value:0},uT:{value:0}};gsLoad(key).then(buf=>{if(!buf){fail();return}new THREE.GLTFLoader().parse(buf.slice(0),'',gl=>{try{const T=gl.scene;const tb={};T.traverse(o=>{if(o.isBone)tb[o.name]=o;if(o.isMesh){o.castShadow=true;o.frustumCulled=false;o.userData.gsKeep=true;if(o.material){const m=o.material;m.side=THREE.DoubleSide;if(m.map){m.map.anisotropy=4;m.emissiveMap=m.map;m.emissive=new THREE.Color(0x4a4048);m.emissiveIntensity=1}m.roughness=Math.max(.55,m.roughness||.8);m.metalness=Math.min(.15,m.metalness||0);gsLook(o,key,U);m.needsUpdate=true}}});
    if(!tb.Hips){fail();return}
    if(prev){const i=GS.list.indexOf(prev);if(i>=0)GS.list.splice(i,1);if(prev.moved)for(const m of prev.moved){m.ob.add(m.c);m.c.matrix.copy(m.mat);m.c.matrix.decompose(m.c.position,m.c.quaternion,m.c.scale)}if(prev.T&&prev.T.parent)prev.T.parent.remove(prev.T)}
    T.traverse(o=>{if(o.isSkinnedMesh)gsSmoothNormals(o.geometry)});
    try{gsPostLoad(g,T,key,U)}catch(x){console.warn(x)}
    /* hide what the actor used to show */
    g.traverse(o=>{if((o.isMesh||o.isSkinnedMesh)&&!(keep&&keep(o)))gsHide(o)});
    root.add(T);T.updateMatrixWorld(true);
    const tq={},tp={};for(const n in tb){tq[n]=gsWQ(tb[n],T);tp[n]=gsWP(tb[n],T)}
    const legT=tp.LeftUpLeg.y-tp.LeftFoot.y;const s=R.leg/Math.max(1e-4,legT);T.scale.setScalar(s);T.updateMatrixWorld(true);
    const cal={},order=[];T.traverse(o=>{if(o.isBone&&GS_MAP[o.name]&&sb[GS_MAP[o.name]])order.push(o.name)});
    for(const n of order){const c=GS_CHILD[n];const qc=new THREE.Quaternion();
      if(c&&tb[c]&&R.p[GS_MAP[c]]){const dt=tp[c].clone().sub(tp[n]).normalize(),ds=R.p[GS_MAP[c]].clone().sub(R.p[GS_MAP[n]]).normalize();qc.setFromUnitVectors(dt,ds)}
      else{const p=tb[n].parent&&cal[tb[n].parent.name];if(p)qc.copy(p.qc)}
      cal[n]={qc,tr:tq[n],sr:R.q[GS_MAP[n]],srcI:R.q[GS_MAP[n]].clone().invert()}}
    const hipOff=tp.Hips.clone().multiplyScalar(s).sub(R.p.pelvis);
    const e={g,root,T,tb,sb,cal,order,s,hipOff,key,keep,U,pose:gsPose(key,R)};g.userData.gs=e;g.userData.gsModel=T;GS.list.push(e);gsTickOne(e);try{gsHandFix(e)}catch(x){console.warn(x)}gsPend(root,false);const w=g.userData.gsWant;if(w&&w!==key){g.userData.gsWant=null;gsReplace(g,w)}}catch(x){console.warn(x);fail()}},err=>{console.warn('gs',err);fail()})})}
function gsTickOne(e){const{root,T,tb,sb,cal,order}=e;root.updateMatrixWorld(true);
  const rq=root.getWorldQuaternion(new THREE.Quaternion()),rqi=rq.clone().invert();
  for(const n of order){const t=tb[n],s=sb[GS_MAP[n]],k=cal[n];
    const sq=s.getWorldQuaternion(_gq).premultiply(rqi);            // source bone, root frame
    const D=sq.multiply(k.srcI);                                     // source delta from rest
    if(e.pose&&e.pose.damp[n]){_gq2.set(0,D.y,0,D.w).normalize();D.slerp(_gq2,e.pose.damp[n])}
    if(e.pose&&e.pose.off[n])D.premultiply(e.pose.off[n]);
    const W=D.multiply(k.qc).multiply(k.tr);                         // wanted target, root frame
    const pq=t.parent.getWorldQuaternion(_gq2).premultiply(rqi);   // target parent, root frame
    t.quaternion.copy(pq.invert().multiply(W));t.updateMatrixWorld(true)}
  /* hips follow the source pelvis */
  const hp=sb.pelvis.getWorldPosition(_gv);root.worldToLocal(hp);hp.add(e.hipOff);
  const w=root.localToWorld(hp.clone());tb.Hips.parent.worldToLocal(w);tb.Hips.position.copy(w);T.updateMatrixWorld(true)}
function gsTick(){for(let i=GS.list.length-1;i>=0;i--){const e=GS.list[i];if(!e.g.parent&&!e.root.parent){continue}try{let v=true,o=e.g;while(o){if(o.visible===false){v=false;break}o=o.parent}if(v)gsTickOne(e)}catch(x){}}}
/* every character actor built from now on */
{const _mk=makeCHActor;makeCHActor=function(sx,o){const a=_mk.apply(this,arguments);try{const k=gsKeyOf(sx,o);if(a&&k){const root=gsRootOf(a.g);
    const hand=[];a.g.traverse(q=>{if(q.isBone&&/^hand_[lr]$/.test(q.name))hand.push(q)});const inHand=o=>{let p=o.parent;while(p){if(hand.includes(p))return true;p=p.parent}return false};gsSwap(a.g,root,k,k==='kaen'?null:inHand)}}catch(x){console.warn(x)}return a}}
/* the hero: Maëlle only (Lucien keeps his look); wand and anything in her hands stay */
function gsHero(){if(GS.off||!W||!W.ch||!W.g||W.g.userData.gs)return;if(HERO.g!=='f')return;const root=gsRootOf(W.g);if(!root)return;
  const hand=[];W.g.traverse(q=>{if(q.isBone&&/^hand_[lr]$/.test(q.name))hand.push(q)});
  const inHand=o=>{let p=o.parent;while(p){if(hand.includes(p)||p===W.broom)return true;p=p.parent}return false};
  gsSwap(W.g,root,'maelle',inHand)}
{const _mt=muTick;muTick=function(dt){_mt(dt);if(!started)return;try{gsHero();gsMenuArm()}catch(x){}gsTick()}}
{const _sh=setHero;setHero=function(){const r=_sh.apply(this,arguments);try{gsHero()}catch(x){}return r}}

/* ---------- looks: Maëlle's limit breaker (gold hair + cape, blue lightning at x2), Kaen's glowing veins ---------- */
function gsLook(o,key,U){if(key!=='maelle'&&key!=='kaen_lb')return;const m=o.material;
  m.onBeforeCompile=sh=>{for(const k in U)sh.uniforms[k]=U[k];
    sh.vertexShader=sh.vertexShader.replace('#include <common>','#include <common>\nvarying vec3 vGp;').replace('#include <begin_vertex>','#include <begin_vertex>\nvGp=position;');
    sh.fragmentShader=sh.fragmentShader.replace('#include <common>','#include <common>\nvarying vec3 vGp;uniform float uGold,uBolt,uV,uT;float gGlow=0.,gVein=0.,gSkin=0.;')
     .replace('#include <map_fragment>',`#include <map_fragment>
{vec3 c=diffuseColor.rgb;float mx=max(c.r,max(c.g,c.b)),mn=min(c.r,min(c.g,c.b));float sat=(mx-mn)/(mx+1e-4);float lum=dot(c,vec3(.3,.59,.11));`+
     (key==='maelle'?`float gr=c.g/max(c.r,.001);float skn=smoothstep(.4,.5,gr)*(1.-smoothstep(.88,.96,gr))*smoothstep(-.01,.05,c.g-c.b)*smoothstep(.05,.13,sat)*smoothstep(.08,.18,lum);gSkin=skn;
float sl=dot(c,vec3(.3,.59,.11));c=mix(c,mix(c*vec3(.56,.4,.3),vec3(.48,.31,.21)*(.75+sl*.5),.72),skn*.97);diffuseColor.rgb=c;lum=dot(c,vec3(.3,.59,.11));
float red=step(c.g*1.4,c.r)*step(c.b*.95,c.r)*smoothstep(.22,.45,sat)*smoothstep(.04,.14,mx);
float hair=smoothstep(.4,.62,lum)*(1.-smoothstep(.22,.4,sat))*step(c.g*.93,c.b);float gm=uGold*max(red,hair);
diffuseColor.rgb=mix(c,vec3(1.,.74,.26)*(.55+lum*1.7),gm*.92);gGlow=gm;`
     :`gVein=smoothstep(.06,.25,c.b-max(c.r,c.g)*.85)*smoothstep(.35,.65,c.b);`)+`}`)
     .replace('#include <emissivemap_fragment>',`#include <emissivemap_fragment>
totalEmissiveRadiance*=mix(1.,.3,gSkin);totalEmissiveRadiance+=vec3(1.,.72,.28)*gGlow*.45;
{vec3 p=vGp*7.;float f=.6+.4*sin(uT*23.+p.y*2.);float b1=abs(sin(p.y*3.3+sin(p.x*2.7+uT*6.)*1.9+uT*4.));float b2=abs(sin(p.x*4.1-p.z*2.3+sin(p.y*3.1-uT*5.)*1.6));
float bl=max(smoothstep(.986,.999,b1),smoothstep(.988,.999,b2));totalEmissiveRadiance+=vec3(.35,.72,1.)*bl*uBolt*f*3.;}
totalEmissiveRadiance+=diffuseColor.rgb*vec3(.6,.9,1.3)*gVein*uV*(1.8+.6*sin(uT*5.+vGp.y*9.));`)};
  m.customProgramCacheKey=()=>'gsLook_'+key}
/* ---------- posture: Kaen stands and walks like a fighter (wide stance, arms off the body, chest up, steady hips) ---------- */
function gsPose(key,R){if(key==='maelle'||key==='lyra'){const fz=Math.sign((R.p.ball_l.z-R.p.foot_l.z)||1),rx=a=>new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1,0,0),a);return{off:{neck:rx(-fz*.08),Head:rx(-fz*.2)},damp:{}}}
  if(key!=='kaen'&&key!=='kaen_lb')return null;const sx=Math.sign((R.p.thigh_l.x-R.p.pelvis.x)||1),fz=Math.sign((R.p.ball_l.z-R.p.foot_l.z)||1);
  const rz=a=>new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0,0,1),a),rx=a=>new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1,0,0),a);
  const arm=.14,leg=.055,chest=-fz*.07,off={},damp={};
  for(const n of['LeftArm','LeftForeArm','LeftHand'])off[n]=rz(arm*sx);for(const n of['RightArm','RightForeArm','RightHand'])off[n]=rz(-arm*sx);
  for(const n of['LeftUpLeg','LeftLeg','LeftFoot','LeftToeBase'])off[n]=rz(leg*sx);for(const n of['RightUpLeg','RightLeg','RightFoot','RightToeBase'])off[n]=rz(-leg*sx);
  off.Spine01=rx(chest*.5);off.Spine=rx(chest);off.neck=rx(-fz*.12);off.Head=rx(-fz*.3);off.LeftShoulder=rz(-.05*sx);off.RightShoulder=rz(.05*sx);
  damp.Hips=.55;damp.Spine02=.35;return{off,damp}}
/* swap a live actor to another model (Kaen tearing into his limit breaker form) */
function gsReplace(g,key){const e=g.userData.gs;if(e&&e.pending){g.userData.gsWant=key;return}if(!e||e.key===key)return;
  gsSwap(g,e.root,key,e.keep,e)}
/* the hero's look follows her limit breaker */
function gsHeroLook(dt){const e=W&&W.g&&W.g.userData.gs;if(!e||!e.U)return;const U=e.U;U.uT.value+=dt;
  const on=e.key==='maelle'&&MODE!=='open'&&P.lbT>0&&P.alive;const tg=on?Math.max(.35,P.lbRamp||0):0;U.uGold.value+=(tg-U.uGold.value)*Math.min(1,dt*3);
  const tb=on&&P.lb2?1:0;U.uBolt.value+=(tb-U.uBolt.value)*Math.min(1,dt*4);
  if(U.uBolt.value>.3&&Math.random()<dt*10){const c=headOf(P.pos,1.0),a=V3(c.x+rand(-.9,.9),c.y+rand(-.9,1.2),c.z+rand(-.9,.9));lightning(c,a,0x60b0ff)}}
{const _mt2=muTick;muTick=function(dt){_mt2(dt);try{gsHeroLook(dt)}catch(x){}for(const e of GS.list)if(e.key==='kaen_lb'){e.U.uT.value+=dt;e.U.uV.value=1}}}
/* Kaen: keep his spirit, aura and rune ring visible on the new model; tear into the limit breaker model */
{const _bi=buildIllusion;buildIllusion=function(){const m=_bi.apply(this,arguments);try{if(m&&m.K){const K=m.K;
    [K.demon,K.ring,m.bub].forEach(o=>o&&o.traverse(q=>q.userData.gsKeep=true));m.g.traverse(q=>{if(q.isMesh&&q.material===K.bladeM&&q.parent)q.parent.traverse(z=>z.userData.gsKeep=true)});K.eyes.forEach(s=>s.visible=GS.off);
    const _st=K.setTorn;K.setTorn=function(){_st.apply(this,arguments);if(!GS.off)gsReplace(m.g,'kaen_lb')};
    gsLoad("kaen_lb")}}catch(x){console.warn(x)}return m};if(ETYPES.illusion&&ETYPES.illusion.build===_bi)ETYPES.illusion.build=buildIllusion}
/* limit breaker Kaen: a bigger aura, and his guardian burns electric blue */
{const _kf=kaenFx;kaenFx=function(e,dt){_kf.apply(this,arguments);const K=e.m&&e.m.K;if(K&&!K.torn&&e._klb&&!CS.active)K.setTorn();if(!K||!K.torn)return;const k=K.lbK;
  K.aura.scale.setScalar(8+k*20);K.aura.material.color.setHex(0x3f8cff);K.aura.material.opacity=.1+k*.3;
  if(!K._blue){K._blue=1;const[m1,m2]=K.demon.userData.mats;m1.uniforms.uC.value.setHex(0x2f8bff);m2.uniforms.uC.value.setHex(0x9fe2ff);K.ring.material.color&&K.ring.material.color.setHex(0x4aa8ff)}
  K.demon.scale.setScalar(1.05+Math.sin(e.t*2)*.03);K.bladeM.emissive.setRGB(.08+.1*k,.25+.3*k,.5+.6*k);K.edge.material.color.setHex(0x6cc0ff);K.glows.forEach(g=>g.material.color.setHex(0x5ab0ff));if(k>.3&&Math.random()<dt*5)lightning(eCenter(e),eCenter(e).add(V3(rand(-3,3),rand(0,4),rand(-3,3))),0x5ab8ff)}}

/* whatever the old skeleton held (Maëlle's wand, Kaen's katana) moves into the new model's hands, keeping its grip */
function gsHandFix(e){e.moved=[];const pairs=[['hand_r','RightHand'],['hand_l','LeftHand']];e.root.updateMatrixWorld(true);
  for(const[o,n]of pairs){const ob=e.sb[o],nb=e.tb[n];if(!ob||!nb)continue;const op=new THREE.Vector3().setFromMatrixPosition(ob.matrixWorld),np=new THREE.Vector3().setFromMatrixPosition(nb.matrixWorld);
    for(const c of ob.children.slice()){if(c.isBone)continue;c.updateMatrixWorld(true);const Wc=c.matrixWorld.clone();Wc.elements[12]+=np.x-op.x;Wc.elements[13]+=np.y-op.y;Wc.elements[14]+=np.z-op.z;
      e.moved.push({c,ob,mat:c.matrix.clone()});nb.add(c);const X=new THREE.Matrix4().copy(nb.matrixWorld).invert().multiply(Wc);X.decompose(c.position,c.quaternion,c.scale);
      c.updateMatrixWorld(true);const ws=c.getWorldScale(new THREE.Vector3()).x,gs=e.g.getWorldScale(new THREE.Vector3()).x;if(ws<gs*.3)c.scale.multiplyScalar(gs/ws)}}
  if(e.g===W.g&&W.orb&&W.orb.parent){const w=W.orb.parent;w.updateMatrixWorld(true);const ws=w.getWorldScale(new THREE.Vector3()).x,gs=e.g.getWorldScale(new THREE.Vector3()).x;if(ws<gs*.3)w.scale.multiplyScalar(gs/ws);
    w.traverse(o=>{if(o.isMesh&&o!==W.orb&&o.material&&o.material.color){o.material=o.material.clone();o.material.color.setHex(0x8a5a32);o.material.roughness=.45;o.material.metalness=.1;o.material.emissive=new THREE.Color(0x2a160a);o.scale.x*=1.35;o.scale.z*=1.35}});
    if(!w.userData.ring){const r=new THREE.Mesh(new THREE.CylinderGeometry(.0135,.0135,.03,10),new THREE.MeshStandardMaterial({color:0xd8a640,metalness:.9,roughness:.3,emissive:0x3a2608}));r.rotation.z=Math.PI/2;r.position.x=-.04;w.add(r);w.userData.ring=r}
    if(W.orb){W.orb.scale.multiplyScalar(1.4)}}}

/* soften the faceted look: vertices that share a position share one averaged normal */
function gsSmoothNormals(geo){const P=geo.attributes.position,N=geo.attributes.normal;if(!P||!N)return;const n=P.count,map=new Map(),acc=[];const k=v=>Math.round(P.getX(v)*2e4)+'_'+Math.round(P.getY(v)*2e4)+'_'+Math.round(P.getZ(v)*2e4);
  const id=new Int32Array(n);for(let i=0;i<n;i++){const key=k(i);let j=map.get(key);if(j===undefined){j=acc.length/3;map.set(key,j);acc.push(0,0,0)}id[i]=j;acc[j*3]+=N.getX(i);acc[j*3+1]+=N.getY(i);acc[j*3+2]+=N.getZ(i)}
  for(let i=0;i<n;i++){const j=id[i];let x=acc[j*3],y=acc[j*3+1],z=acc[j*3+2];const l=Math.hypot(x,y,z)||1;N.setXYZ(i,x/l,y/l,z/l)}N.needsUpdate=true}
/* title screen: she holds her wand out in front of her, so you can see it */
function gsMenuArm(){const e=W&&W.g&&W.g.userData.gs;if(!e||!e.pose||e.key!=='maelle')return;const on=!started;if(e._menuArm===on)return;e._menuArm=on;
  if(on){const R=gsRest(),fz=Math.sign((R.p.ball_l.z-R.p.foot_l.z)||1),sx=Math.sign((R.p.thigh_l.x-R.p.pelvis.x)||1);const q=(ax,a)=>new THREE.Quaternion().setFromAxisAngle(ax,a);const X=new THREE.Vector3(1,0,0),Z=new THREE.Vector3(0,0,1);
    const up=q(X,-fz*.7).multiply(q(Z,-sx*.25));e.pose.off.RightArm=up;e.pose.off.RightForeArm=q(X,-fz*1.25).multiply(q(Z,-sx*.25));e.pose.off.RightHand=q(X,-fz*1.3).multiply(q(Z,-sx*.25))}
  else{delete e.pose.off.RightArm;delete e.pose.off.RightForeArm;delete e.pose.off.RightHand}}

/* fetch every cast model early so a character never waits on the network when it first appears */
{let gsPre=0;const _mt3=muTick;muTick=function(dt){_mt3(dt);if(gsPre||GS.off)return;gsPre=1;let i=0;const ks=['maelle','kaen','lyra','kaen_lb'];const nx=()=>{if(i>=ks.length)return;const p=gsLoad(ks[i++]);p&&p.then?p.then(nx,nx):nx()};gsLoad('maelle');setTimeout(nx,800)}}
