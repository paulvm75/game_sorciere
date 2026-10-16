/* ---------- asset intake (called once the async preload finished) ---------- */
function chInit(A){if(!A||!A.gltf||!A.gltf.body_f||!A.gltf.anims)return false;try{
  CH.src=A.gltf;CH.tex=A.tex;for(const c of A.gltf.anims.animations)CH.clips[c.name]=c;
  for(const sx of['f','m'])CH.sex[sx]=chBuildSex(sx);
  chBake();CH.ok=true;chRestInit()}catch(e){console.warn('characters failed',e);CH.ok=false}return CH.ok}
function chSubClip(name,bonesKeep){const c=CH.clips[name];if(!c)return null;const tr=c.tracks.filter(t=>{const b=t.name.split('.')[0];return bonesKeep.some(k=>b===k)||/index|middle|pinky|ring|thumb/.test(b)&&bonesKeep.includes('hand_r')});return new THREE.AnimationClip(name+'_up',c.duration,tr)}
function chRestIBM(bones,root){root.updateMatrixWorld(true);const ri=new THREE.Matrix4().copy(root.matrixWorld).invert();return bones.map(b=>new THREE.Matrix4().multiplyMatrices(ri,b.matrixWorld).invert())}
function chSkinned(geo,mat,skel){const m=new THREE.SkinnedMesh(geo,mat);m.userData.hp=1;m.bind(skel,new THREE.Matrix4());m.castShadow=true;m.receiveShadow=true;m.frustumCulled=false;return m}
function chWitchMat(opts,purple){const m=std(Object.assign({roughness:.7},opts));if(purple)m.onBeforeCompile=sh=>{sh.fragmentShader=sh.fragmentShader.replace('#include <map_fragment>',`vec4 texelColor=texture2D(map,vUv);texelColor=mapTexelToLinear(texelColor);
  float bl=clamp((texelColor.b-max(texelColor.r,texelColor.g))*6.,0.,1.);vec3 vio=vec3(texelColor.b*.55,texelColor.b*.12,texelColor.b*.7);texelColor.rgb=mix(texelColor.rgb,vio,bl);
  float br=clamp((texelColor.r-texelColor.b)*3.,0.,1.)*clamp(1.-(texelColor.g-texelColor.b)*4.,0.,1.);texelColor.rgb=mix(texelColor.rgb,vec3(dot(texelColor.rgb,vec3(.33))*.35,dot(texelColor.rgb,vec3(.33))*.28,dot(texelColor.rgb,vec3(.33))*.4),br*.85);diffuseColor*=texelColor;`)};m.customProgramCacheKey=()=>'witch'+(purple?1:0);return m}
/* ---------- the hero (Maëlle / Lucien) ---------- */
function makeHeroCH(gender){const sx=gender==='f'?'f':'m';const src=CH.src['body_'+sx];const root=src.scene;root.position.set(0,0,0);root.rotation.set(0,0,0);root.scale.set(1,1,1);
  const S=CH.sex[sx],G=S.geo,bones=S.bones,T=CH.tex;
  // hide the original meshes; we rebuild everything in rest space
  root.traverse(o=>{if(o.isMesh&&!o.userData.hp)o.visible=false});const old=[];root.traverse(o=>{if(o.userData.hp)old.push(o)});for(const o of old)o.parent&&o.parent.remove(o);
  const ibm=chRestIBM(bones,root);const skel=new THREE.Skeleton(bones,ibm);
  const g=new THREE.Group(),body=new THREE.Group();g.add(body);const model=new THREE.Group();body.add(model);model.add(root);model.scale.setScalar(CH_S*(sx==='f'?1.04:1));
  const skinTone=sx==='f'?new THREE.Color(0xf2d6c8):new THREE.Color(0xd9a98a);
  const skinM=std({map:T['skin_'+sx],normalMap:T['skin_'+sx+'_n'],roughnessMap:T['skin_'+sx+'_r'],roughness:.7,skinning:true,color:skinTone});
  // head + neck only (the outfit carries hands and legs)
  const reg=chRegions(G.body,bones);const hIdx=[];const bi=G.body.index.array;for(let t=0;t<bi.length;t+=3){const a=reg[bi[t]],b=reg[bi[t+1]],c=reg[bi[t+2]];if((a===6||a===5)&&(b===6||b===5)&&(c===6||c===5))hIdx.push(bi[t],bi[t+1],bi[t+2])}
  const headG=G.body.clone();headG.setIndex(hIdx);root.add(chSkinned(headG,skinM,skel));
  if(G.eyes)root.add(chSkinned(G.eyes,std({map:T.eye,roughness:.15,skinning:true}),skel));
  const hairCol=sx==='f'?0xc8c8d4:0x4a3020;
  if(G.brows)root.add(chSkinned(G.brows,std({map:T.hair2,color:sx==='f'?0x7a7280:0x3a2418,roughness:.6,skinning:true,side:THREE.DoubleSide}),skel));
  const hairM=std({map:sx==='f'?T.hair2:T.hair1,normalMap:sx==='f'?T.hair2_n:T.hair1_n,color:hairCol,roughness:.45,skinning:true,side:THREE.DoubleSide});
  root.add(chSkinned(sx==='f'?G.hairLong:G.hairPart,hairM,skel));if(sx==='m'&&G.beard)root.add(chSkinned(G.beard,hairM,skel));
  // wizard outfit, recoloured for Maëlle
  const wz=CH.src['wizard_'+sx];wz.scene.updateMatrixWorld(true);const wm=chWitchMat({map:T.wizard,normalMap:T.wizard_n,roughness:.75,skinning:true},sx==='f');
  for(const sc of wz.scenes){sc.updateMatrixWorld(true);sc.traverse(o=>{if(o.isSkinnedMesh){if(sx==='f'&&/Legs/.test(o.name))return;const eg=chExtract(o,bones);root.add(chSkinned(eg,wm,skel))}})}
  let skirt=null;if(sx==='f'){const velvet=std({color:0x1c1422,roughness:.55,skinning:true,side:THREE.DoubleSide});velvet.onBeforeCompile=sh=>{sh.fragmentShader=sh.fragmentShader.replace('#include <emissivemap_fragment>','#include <emissivemap_fragment>\nfloat fr=pow(1.-abs(dot(normalize(vViewPosition),normal)),2.5);totalEmissiveRadiance+=vec3(.35,.2,.6)*fr*.12;')};skirt=chSkinned(G.witch,velvet,skel);root.add(skirt)}
  else{const coat=std({color:0x244e92,roughness:.6,skinning:true,side:THREE.DoubleSide});skirt=chSkinned(G.coat,coat,skel);root.add(skirt)}
  // cape (turns crimson / deep purple at level 30)
  const capeU={uT:{value:0},uK:{value:0}};const capeM=std({color:sx==='f'?0x140c18:0x10142a,roughness:.6,skinning:true,side:THREE.DoubleSide,emissive:0x000000});
  capeM.onBeforeCompile=sh=>{sh.uniforms.uT=capeU.uT;sh.uniforms.uK=capeU.uK;sh.vertexShader=sh.vertexShader.replace('#include <common>','#include <common>\nuniform float uT;uniform float uK;').replace('#include <skinning_vertex>','#include <skinning_vertex>\n{float h=uv.y*uv.y;transformed.z-=h*(uK*.38+.03)+sin(uT*5.+uv.y*6.+uv.x*4.)*.025*h*(.4+uK);transformed.y+=h*uK*.14;}');
    sh.fragmentShader=sh.fragmentShader.replace('#include <emissivemap_fragment>','#include <emissivemap_fragment>\n{float fr=pow(1.-abs(dot(normalize(vViewPosition),normal)),2.);totalEmissiveRadiance+=emissive*(.25+fr*.6);}')};capeM.customProgramCacheKey=()=>'cape';
  {const SKc=S.SK;const bI=nm=>bones.findIndex(b=>b.name===nm);const sp3=bI('spine_03'),sp2=bI('spine_02'),sp1=bI('spine_01'),pel=bI('pelvis'),tl=bI('thigh_l'),tr=bI('thigh_r');
    const yT=SKc.spine_03.y+.13,yB=SKc.calf_l.y-.14,zT=SKc.spine_03.z-.12;const rows=12,cols=10;const Pp=[],N=[],UV=[],SI=[],SW=[],I=[];
    for(let r=0;r<=rows;r++){const t=r/rows;const y=lerp(yT,yB,t);const w=lerp(.19,.4,Math.sqrt(t));const zc=zT-.03-t*.2;for(let c=0;c<=cols;c++){const u=c/cols;const a=(u-.5)*2;const x=a*w;const z=zc+(1-a*a)*(-.05-.03*t)+(t<.08?(a*a)*.08:0);
      Pp.push(x,y,z);N.push(0,0,-1);UV.push(u,t);let ws;if(t<.25)ws=[[sp3,1-t*2],[sp2,t*2]];else if(t<.5)ws=[[sp2,1-(t-.25)*4],[sp1,(t-.25)*4]];else{const k=(t-.5)*2;ws=[[pel,1-k*.55],[a<0?tr:tl,k*.55*.7],[a<0?tl:tr,k*.55*.3]]}
      while(ws.length<4)ws.push([0,0]);for(const q of ws){SI.push(q[0]);SW.push(q[1])}}}
    for(let r=0;r<rows;r++)for(let c=0;c<cols;c++){const a=r*(cols+1)+c,b=a+1,cc=a+cols+1,d=cc+1;I.push(a,cc,b,b,cc,d)}
    const cg=new THREE.BufferGeometry();cg.setAttribute('position',new THREE.Float32BufferAttribute(Pp,3));cg.setAttribute('normal',new THREE.Float32BufferAttribute(N,3));cg.setAttribute('uv',new THREE.Float32BufferAttribute(UV,2));cg.setAttribute('skinIndex',new THREE.Float32BufferAttribute(SI,4));cg.setAttribute('skinWeight',new THREE.Float32BufferAttribute(SW,4));cg.setIndex(I);cg.computeVertexNormals();cg.computeBoundingSphere();
    root.add(chSkinned(cg,capeM,skel))}
  // hat on the head bone (rigid)
  const headB=bones.find(b=>b.name==='Head'),handB=bones.find(b=>b.name==='hand_r'),handL=bones.find(b=>b.name==='hand_l');
  const attach=(bone,obj,restPos,restRot)=>{const i=bones.indexOf(bone);const inv=new THREE.Matrix4().copy(ibm[i]);const m=new THREE.Matrix4().compose(restPos,new THREE.Quaternion().setFromEuler(restRot||new THREE.Euler()),new THREE.Vector3(1,1,1));const loc=new THREE.Matrix4().multiplyMatrices(inv,m);const holder=new THREE.Group();holder.userData.hp=1;holder.matrixAutoUpdate=false;holder.matrix.copy(loc);bone.add(holder);holder.add(obj);return holder};
  let hat=null;const SKh=S.SK.Head;
  if(sx==='f'){const velvetD=std({color:0x16101c,roughness:.5});hat=new THREE.Group();const cone=new THREE.Mesh(lathe([[.001,0],[.31,-.015],[.32,.01],[.12,.025],[.105,.15],[.07,.33],[.03,.5],[.005,.6]],28),velvetD);hat.add(cone);
    const band=new THREE.Mesh(new THREE.TorusGeometry(.112,.022,8,24),std({color:0x4a5a36,roughness:.7}));band.rotation.x=Math.PI/2;band.position.y=.05;hat.add(band);
    const buckle=new THREE.Mesh(new THREE.TorusGeometry(.03,.007,4,4),MAT.gold||std({color:0xd8b040,metalness:1,roughness:.3}));buckle.position.set(0,.05,.13);hat.add(buckle);hat.traverse(o=>{if(o.isMesh)o.castShadow=true});
    attach(headB,hat,new THREE.Vector3(0,SKh.y+.115,SKh.z-.01),new THREE.Euler(-.12,0,.08))}
  // wand + orb in the right hand
  const orbCol=sx==='f'?0xd8b8ff:0x8ad8ff;const wand=new THREE.Group();const wd=new THREE.Mesh(new THREE.CylinderGeometry(.007,.011,.34,6),std({color:0x1a1014,roughness:.3,metalness:.3}));wd.rotation.z=Math.PI/2;wd.position.x=-.12;wand.add(wd);
  const orb=new THREE.Mesh(sx==='f'?G_shard():new THREE.SphereGeometry(.028,10,8),new THREE.MeshBasicMaterial({color:orbCol}));orb.position.x=-.3;orb.scale.setScalar(sx==='f'?.5:1);wand.add(orb);
  const H=S.SK.hand_r;attach(handB,wand,new THREE.Vector3(H.x-.07,H.y,H.z+.03),new THREE.Euler(0,.25,0));
  if(sx==='m'){const book=new THREE.Group();const bb=new THREE.Mesh(new THREE.BoxGeometry(.2,.03,.15),std({color:0x6a2418,roughness:.5}));book.add(bb);const pg=new THREE.Mesh(new THREE.BoxGeometry(.19,.035,.14),std({color:0xf0e4c8,roughness:.8,emissive:0x2a2418}));pg.position.y=.004;book.add(pg);book.add(glowSprite(0x6ab8ff,.8,.35));const HL=S.SK.hand_l;attach(handL,book,new THREE.Vector3(HL.x+.1,HL.y-.03,HL.z+.04),new THREE.Euler(0,0,.2))}
  const orbGlow=glowSprite(orbCol,1.8);orb.add(orbGlow);orbGlow.scale.setScalar(sx==='f'?.42:.38);
  if(sx==='m'){const spark=new THREE.Group();orb.add(spark);g.userData.spark=spark}
  // broom
  const broom=new THREE.Group();broom.visible=false;g.add(broom);const woodM=std({color:0x5a3620,roughness:.7});const stick=new THREE.Mesh(G.cyl||new THREE.CylinderGeometry(1,1,1,8),woodM);stick.scale.set(.05,2.8,.05);stick.rotation.x=Math.PI/2;broom.add(stick);
  const brist=new THREE.Mesh(new THREE.ConeGeometry(1,1,10),std({color:0xb08a40,roughness:.9}));brist.scale.set(.32,1,.32);brist.rotation.x=-Math.PI/2;brist.position.z=-1.8;broom.add(brist);broom.position.set(0,.95,.1);
  const aura=decal(runeTex,orbCol,3.4,true,0);aura.position.y=.06;g.add(aura);
  scene.add(g);
  // animation
  const mixer=new THREE.AnimationMixer(root);const A={};const act=(name,loop=true)=>{if(A[name])return A[name];const c=CH.clips[name];if(!c)return null;const a=mixer.clipAction(c);a.setLoop(loop?THREE.LoopRepeat:THREE.LoopOnce);a.clampWhenFinished=!loop;A[name]=a;return a};
  const upBones=BONE_UPPER.filter(b=>!/^spine_01$/.test(b));const upClips={};const upAct=(name)=>{if(upClips[name])return upClips[name];const c=chSubClip(name,upBones);if(!c)return null;const a=mixer.clipAction(c);a.setLoop(THREE.LoopOnce);a.clampWhenFinished=false;upClips[name]=a;return a};
  const ST={base:null,upper:null,ut:0};
  function setBase(name,fade=.22,loop=true,ts=1){const a=act(name,loop);if(!a)return;a.timeScale=ts;if(ST.base===name)return;const prev=ST.base?A[ST.base]:null;a.reset();a.setEffectiveWeight(1);a.play();if(prev){a.crossFadeFrom(prev,fade,false)}ST.base=name}
  function fireUpper(name,dur,w=8){const a=upAct(name);if(!a)return;if(ST.upper&&ST.upper!==a)ST.upper.stop();a.reset();a.setEffectiveWeight(w);a.timeScale=a.getClip().duration/dur;a.play();ST.upper=a;ST.ut=dur}
  let chargeA=null;function setCharge(on){if(on&&!chargeA){const c=chSubClip('Spell_Simple_Idle_Loop',upBones)||chSubClip('Pistol_Aim_Neutral',upBones);if(!c)return;chargeA=mixer.clipAction(c);chargeA.setLoop(THREE.LoopRepeat);chargeA.reset().setEffectiveWeight(0).play()}if(chargeA){const w=chargeA.getEffectiveWeight();chargeA.setEffectiveWeight(on?Math.min(6,w+.6):Math.max(0,w-.8))}}
  const dummy=()=>new THREE.Object3D();
  // evolved look: glowing eyes + big aura
  const evo=new THREE.Group();evo.visible=false;g.add(evo);const evoCol=sx==='f'?0xff2a3a:0x9a40ff;const evoRing=decal(runeTex,evoCol,5.2,true,.9);evoRing.position.y=.07;evo.add(evoRing);const evoGlow=glowSprite(evoCol,5,.35);evoGlow.position.y=1.1;evo.add(evoGlow);
  const eyeG=new THREE.Group();eyeG.visible=false;{const eyeC=G.eyes?(()=>{G.eyes.computeBoundingBox();const c=new THREE.Vector3();G.eyes.boundingBox.getCenter(c);return c})():new THREE.Vector3(0,SKh.y+.06,SKh.z+.08);for(const sgn of[-1,1]){const e=glowSprite(evoCol,.13,1);e.position.set(sgn*.033,0,.02);eyeG.add(e)}attach(headB,eyeG,eyeC.clone(),null)}
  const W2={g,body,head:dummy(),legs:[dummy(),dummy()],arms:[dummy(),dummy()],orb,orbM:orb.material,orbGlow,orbCol,hat,cape:dummy(),aura,broom,castArm:dummy(),castBase:0,staff:null,gender:sx,ch:true,mixer,setBase,fireUpper,ST,skirt,model};
  W2.staff=W2.castArm;W2.capeU=capeU;W2.capeM=capeM;W2.evolved=false;
  W2.setEvolved=(on)=>{W2.evolved=!!on;evo.visible=!!on;eyeG.visible=!!on;if(on){capeM.color.setHex(sx==='f'?0x6a0410:0x2a0852);capeM.emissive.setHex(sx==='f'?0x300006:0x1a0540);model.scale.setScalar(CH_S*(sx==='f'?1.04:1)*1.05);orbGlow.scale.setScalar(sx==='f'?.62:.56)}else{capeM.color.setHex(sx==='f'?0x140c18:0x10142a);capeM.emissive.setHex(0);model.scale.setScalar(CH_S*(sx==='f'?1.04:1));orbGlow.scale.setScalar(sx==='f'?.42:.38)}};
  W2.evoTick=(dt,t)=>{capeU.uT.value=t;capeU.uK.value=lerp(capeU.uK.value,Math.min(1.2,(W2.cMove||0)+(broom.visible?1:0)),Math.min(1,dt*3));if(W2.evolved){evoRing.rotation.z+=dt*.6;evoGlow.material.opacity=.28+Math.sin(t*3)*.08}};
  W2.update=(dt,st)=>{// st: {mv,air,fly,swim,dead,talk,cast,sprint,punch,sit,anim}
    let name='Idle_Loop',ts=1,loop=true;
    if(st.dead){name='Death01';loop=false}
    else if(st.anim){name=st.anim;loop=/_Loop$/.test(name)}
    else if(st.fly){name='Driving_Loop'}
    else if(st.swim){name=st.mv>.1?'Swim_Fwd_Loop':'Swim_Idle_Loop'}
    else if(st.air){name='Jump_Loop'}
    else if(st.sit){name='Sitting_Idle_Loop'}
    else if(st.mv>.08){if(st.mv>1.1){name='Sprint_Loop';ts=.95}else if(st.mv>.6){name='Jog_Fwd_Loop';ts=.9+st.mv*.1}else{name='Walk_Loop';ts=.8+st.mv*.9}}
    else if(st.talk)name='Idle_Talking_Loop';
    W2.cMove=st.fly?1:Math.min(1.2,st.mv||0);setBase(name,.2,loop,ts);
    setCharge(!!st.charge);
    if(st.cast&&!ST.castLock){const k=st.castKind||'aim';if(k==='throw')fireUpper('OverhandThrow',.55);else if(k==='conj')fireUpper('Spell_Simple_Shoot',.5);else fireUpper(CH.clips.Pistol_Aim_Neutral?'Pistol_Aim_Neutral':'Spell_Simple_Shoot',.34);ST.castLock=true}if(!st.cast)ST.castLock=false;
    if(st.punch&&!ST.punchLock){fireUpper(Math.random()<.5?'Punch_Jab':'Punch_Cross',.4);ST.punchLock=true}if(!st.punch)ST.punchLock=false;
    if(ST.upper){ST.ut-=dt;if(ST.ut<=0){ST.upper.fadeOut(.15);ST.upper=null}}
    mixer.update(dt)};
  W2.update(0,{mv:0});if(typeof lbPatchHero==='function')lbPatchHero(W2,{capeM,hairM,skinM,wm});
  return W2}
function G_shard(){const g=new THREE.OctahedronGeometry(.05,0);g.scale(1,1.6,1);return g}
