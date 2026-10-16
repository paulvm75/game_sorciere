/* ================= act II: four new demons + Master Bilel ================= */
/* ---------- rigged human actors (bosses, Bilel) built from the character kit ---------- */
function chRestInit(){for(const sx of['f','m']){const S=CH.sex[sx];if(!S||S.rest)continue;const root=CH.src['body_'+sx].scene;S.rest=S.bones.map(b=>({p:b.position.clone(),q:b.quaternion.clone(),s:b.scale.clone()}));S.ibm=chRestIBM(S.bones,root)}}
const LIFT_C={};function liftTex(t,m){const k=t.uuid+m.join();if(LIFT_C[k])return LIFT_C[k];try{const im=t.image;const w=im.width,h=im.height;const c=document.createElement('canvas');c.width=w;c.height=h;const x=c.getContext('2d');x.drawImage(im,0,0);const d=x.getImageData(0,0,w,h),p=d.data;
  for(let i=0;i<p.length;i+=4){p[i]=Math.min(255,p[i]*m[0]);p[i+1]=Math.min(255,p[i+1]*m[1]);p[i+2]=Math.min(255,p[i+2]*m[2])}x.putImageData(d,0,0);const ct=new THREE.CanvasTexture(c);ct.flipY=t.flipY;ct.encoding=t.encoding;ct.anisotropy=4;return LIFT_C[k]=ct}catch(e){return t}}
function makeCHActor(sx,o){if(!CH.ok)return null;chRestInit();const S=CH.sex[sx],G=S.geo,T=CH.tex;const src=CH.src['body_'+sx].scene;
  const root=src.clone(true);const rm=[];root.traverse(c=>{if(c!==root&&(c.isMesh||c.isSprite||c.userData.hp))rm.push(c)});for(const c of rm)c.parent&&c.parent.remove(c);
  root.position.set(0,0,0);root.rotation.set(0,0,0);root.scale.set(1,1,1);
  const bones=S.bones.map(b=>root.getObjectByName(b.name));if(bones.some(b=>!b))return null;bones.forEach((b,i)=>{b.position.copy(S.rest[i].p);b.quaternion.copy(S.rest[i].q);b.scale.copy(S.rest[i].s)});
  const skel=new THREE.Skeleton(bones,S.ibm.map(m=>m.clone()));
  const g=new THREE.Group(),body=new THREE.Group();g.add(body);const model=new THREE.Group();body.add(model);model.add(root);model.scale.setScalar(CH_S*(o.scale||1));
  const sk=(geo,mat)=>{if(!geo)return null;const m=chSkinned(geo,mat,skel);root.add(m);return m};
  const M=(c,x)=>std(Object.assign({color:c,roughness:.6,skinning:true},x||{}));
  const skinM=std({map:o.skinLift?liftTex(T['skin_'+sx],o.skinLift):T['skin_'+sx],normalMap:T['skin_'+sx+'_n'],roughnessMap:T['skin_'+sx+'_r'],roughness:.65,skinning:true,color:new THREE.Color(o.skin||0xf0d0c0)});
  let regC=null;const skinPart=(keep,mat)=>{if(!regC)regC=chRegions(G.body,bones);const hIdx=[];const bi=G.body.index.array;for(let t=0;t<bi.length;t+=3){if(keep.includes(regC[bi[t]])&&keep.includes(regC[bi[t+1]])&&keep.includes(regC[bi[t+2]]))hIdx.push(bi[t],bi[t+1],bi[t+2])}const hg=G.body.clone();hg.setIndex(hIdx);return sk(hg,mat||skinM)};
  const skinMesh=o.fullBody?sk(G.body,skinM):skinPart(o.keepReg||[5,6,9]);
  if(G.eyes)sk(G.eyes,std({map:T.eye,roughness:.15,skinning:true,color:o.eyeTint||0xffffff}));
  if(G.brows)sk(G.brows,std({map:T.hair2,color:o.brow||0x2a1a10,roughness:.6,skinning:true,side:THREE.DoubleSide}));
  let hairM=null;if(o.hair){const hm=hairM=std({map:o.hairTex==='1'?T.hair1:T.hair2,normalMap:o.hairTex==='1'?T.hair1_n:T.hair2_n,color:o.hairCol,roughness:.42,skinning:true,side:THREE.DoubleSide});sk(G[o.hair],hm);if(o.beard&&G.beard)sk(G.beard,hm)}
  const wear={};for(const [k,c,x] of o.wear||[]){const geo=G[k];if(geo)wear[k]=sk(geo,M(c,x))}
  const attach=(boneName,obj,restPos,rot)=>{const i=bones.findIndex(b=>b.name===boneName);const m=new THREE.Matrix4().compose(restPos,new THREE.Quaternion().setFromEuler(rot||new THREE.Euler()),new THREE.Vector3(1,1,1));const loc=new THREE.Matrix4().multiplyMatrices(skel.boneInverses[i],m);
    const h=new THREE.Group();h.matrixAutoUpdate=false;h.matrix.copy(loc);bones[i].add(h);h.add(obj);return h};
  const mixer=new THREE.AnimationMixer(root);const A={};let base=null;const act=(n,loop=true)=>{if(A[n])return A[n];const c=CH.clips[n];if(!c)return null;const a=mixer.clipAction(c);a.setLoop(loop?THREE.LoopRepeat:THREE.LoopOnce);a.clampWhenFinished=!loop;A[n]=a;return a};
  const setBase=(n,fade=.25,ts=1)=>{const a=act(n,/_Loop$/.test(n));if(!a)return;a.timeScale=ts;if(base===n)return;const prev=base?A[base]:null;a.reset().setEffectiveWeight(1).play();if(prev)a.crossFadeFrom(prev,fade,false);base=n};
  const upBones=BONE_UPPER.filter(b=>b!=='spine_01');const UP={};let upA=null,upT=0;
  const fire=(n,dur)=>{let a=UP[n];if(!a){const c=chSubClip(n,upBones);if(!c)return;a=UP[n]=mixer.clipAction(c);a.setLoop(THREE.LoopOnce)}if(upA&&upA!==a)upA.stop();a.reset().setEffectiveWeight(8);a.timeScale=a.getClip().duration/dur;a.play();upA=a;upT=dur};
  const once=(n,dur)=>{const a=act(n,false);if(!a)return;const prev=base?A[base]:null;a.reset().setEffectiveWeight(1);a.timeScale=a.getClip().duration/dur;a.play();if(prev)a.crossFadeFrom(prev,.15,false);base=n};
  const head=new THREE.Object3D();attach('Head',head,S.SK.Head.clone().add(new THREE.Vector3(0,.08,.02)));
  const handR=new THREE.Object3D();attach('hand_r',handR,S.SK.hand_r.clone());const handL=new THREE.Object3D();attach('hand_l',handL,S.SK.hand_l.clone());
  g.traverse(c=>{if(c.isMesh){c.castShadow=true}});
  return{g,body,model,root,bones,skel,S,wear,skinM,skinMesh,skinPart,hairM,sk,mixer,setBase,fire,once,attach,head,handR,handL,update:dt=>{if(upA){upT-=dt;if(upT<=0){upA.fadeOut(.15);upA=null}}mixer.update(dt)},base:()=>base}}
function actorAnimate(e,dt,mv,rate){const m=e.m;if(!m.actor)return;const busy=e.busy>0;const dead=e.dead;
  if(!m.lock){if(mv>.55)m.actor.setBase('Sprint_Loop',.25,1.1);else if(mv>.12)m.actor.setBase('Walk_Loop',.25,1+mv*.6);else m.actor.setBase(busy?'Spell_Simple_Idle_Loop':'Idle_Loop',.3)}
  if(m.lock>0)m.lock-=dt;m.actor.update(dt*(rate||1))}
/* ---------- materials ---------- */
const MAT2={};function mat2(){if(MAT2.ok)return MAT2;MAT2.ok=true;
  MAT2.catFur=rimify(std({color:0x4262d8,map:TX.whitefur.map,normalMap:TX.whitefur.normal,roughness:.85,emissive:0x060a20}),0x9ab4ff,2.2,.55);
  MAT2.catLight=rimify(std({color:0x8aa8ff,map:TX.whitefur.map,roughness:.9}),0xc0d0ff,2,.4);MAT2.catStripe=std({color:0x16204a,roughness:.8});
  MAT2.catEye=new THREE.MeshBasicMaterial({color:0xffa81e});MAT2.catNose=std({color:0xd05070,roughness:.4});MAT2.catInner=std({color:0x5a2a4a,roughness:.7});
  MAT2.slug=rimify(std({color:0xd8281a,roughness:.18,metalness:.05,emissive:0x5a0a02,envMapIntensity:1.4}),0xff8040,2.2,.7);MAT2.slugDark=rimify(std({color:0x1c1c2c,roughness:.3,emissive:0x080408}),0xff5030,2.5,.4);
  MAT2.slugHorn=std({color:0xff5020,roughness:.2,emissive:0xff4010,emissiveIntensity:.8});MAT2.slugMouth=new THREE.MeshBasicMaterial({color:0x1a0204});
  MAT2.guard=std({color:0x7a30e0,roughness:.3,emissive:0x5a18c0,emissiveIntensity:.9,transparent:true,opacity:.72,depthWrite:false});MAT2.guardCore=std({color:0x2a0a5a,roughness:.4,emissive:0x3a10a0,emissiveIntensity:.6});
  MAT2.queenMetal=std({color:0x5a0a16,roughness:.3,metalness:.75,emissive:0x2a0206,envMapIntensity:1.4});MAT2.gem=new THREE.MeshBasicMaterial({color:0xff1030});MAT2.silver=std({color:0xd8dce4,roughness:.2,metalness:1,envMapIntensity:1.6});
  for(const k in MAT2)if(MAT2[k]&&MAT2[k].isMaterial)MAT2[k].__shared=true;return MAT2}
/* ---------- the demon cat ---------- */
function buildCat(s=1){const M2=mat2();const g=new THREE.Group(),body=new THREE.Group();g.add(body);const fur=s>=1?M2.catFur.clone():M2.catFur;
  const torso=part(G.sphere,fur,1.45*s,1.2*s,2.3*s,0,2.35*s,-.1*s,body);const chest=part(G.sphere,fur,1.35*s,1.3*s,1.15*s,0,2.75*s,1.25*s,body);part(G.sphere,M2.catLight,.9*s,.8*s,.8*s,0,2.2*s,1.55*s,body);
  if(FUR_N.value&&s>=1){furShells(torso,{color:0x4a6ae0,map:TX.whitefur.map,len:.3,rep:7,droop:.35,rim:0x6a8aff});furShells(chest,{color:0x4a6ae0,map:TX.whitefur.map,len:.32,rep:7,droop:.35,rim:0x6a8aff})}
  for(let k=0;k<5;k++){const st=part(G.sphere,M2.catStripe,1.1*s,.08*s,.5*s,0,3.45*s,(-.9+k*.5)*s,body);st.rotation.x=.1}
  const head=new THREE.Group();head.position.set(0,4.05*s,2.3*s);body.add(head);const hs=s;
  part(G.sphere,fur,1.3*hs,1.1*hs,1.15*hs,0,0,0,head);for(const q of[-1,1]){part(G.sphere,fur,.72*hs,.58*hs,.62*hs,q*.78*hs,-.3*hs,.5*hs,head);
    const ear=part(G.cone,fur,.48*hs,.85*hs,.22*hs,q*.8*hs,1.0*hs,-.15*hs,head);ear.rotation.z=-q*.35;const ei=part(G.cone,M2.catInner,.3*hs,.55*hs,.1*hs,q*.8*hs,.95*hs,-.05*hs,head);ei.rotation.z=-q*.35}
  part(G.sphere,M2.catLight,.62*hs,.4*hs,.5*hs,0,-.38*hs,.92*hs,head);part(G.sphere,M2.catNose,.15*hs,.1*hs,.1*hs,0,-.12*hs,1.35*hs,head);
  for(let k=0;k<3;k++){const st=part(G.sphere,M2.catStripe,.09*hs,.4*hs,.06*hs,(k-1)*.35*hs,.72*hs,.95*hs,head);st.rotation.z=(k-1)*-.3}
  const eyes=[];for(const q of[-1,1]){const e=part(G.sphere,M2.catEye,.36*hs,.3*hs,.16*hs,q*.52*hs,.2*hs,1.02*hs,head);e.rotation.y=q*.35;e.rotation.z=q*.18;part(G.sphere,MAT.black,.06*hs,.26*hs,.05*hs,q*.52*hs,.2*hs,1.13*hs,head);
    const gl=glowSprite(0xff9a20,1.6*hs,.8);gl.position.set(q*.52*hs,.2*hs,1.2*hs);head.add(gl);eyes.push(gl)}
  const jaw=new THREE.Group();jaw.position.set(0,-.55*hs,.75*hs);head.add(jaw);part(G.sphere,MAT.black,.95*hs,.2*hs,.35*hs,0,0,.15*hs,jaw);
  teethRow(jaw,13,0,.12*hs,.42*hs,1.7*hs,true,MAT.tooth,1.5*hs);teethRow(jaw,11,0,-.1*hs,.4*hs,1.4*hs,false,MAT.tooth,1.2*hs);for(const q of[-1,1]){const f=part(G.cone,MAT.tooth,.09*hs,.45*hs,.09*hs,q*.45*hs,-.05*hs,.45*hs,jaw);f.rotation.x=Math.PI}
  const wm=new THREE.MeshBasicMaterial({color:0xe8ecff});for(const q of[-1,1])for(let k=0;k<3;k++){const w=part(G.cyl,wm,.012*hs,1.6*hs,.012*hs,q*1.1*hs,(-.35-k*.1)*hs,1.0*hs,head);w.rotation.z=q*(Math.PI/2-.1+k*.12)}
  const legs=[];for(const[x,z,ph]of[[-.95,1.35,0],[.95,1.35,Math.PI],[-1.05,-1.3,Math.PI],[1.05,-1.3,0]]){const L=new THREE.Group();L.position.set(x*s,2.1*s,z*s);body.add(L);part(G.sphere,fur,.5*s,1.05*s,.55*s,0,-.75*s,0,L);
    const lo=new THREE.Group();lo.position.y=-1.55*s;L.add(lo);part(G.sphere,fur,.38*s,.62*s,.4*s,0,-.3*s,0,lo);part(G.sphere,M2.catLight,.5*s,.26*s,.6*s,0,-.85*s,.18*s,lo);
    for(let k=0;k<3;k++){const c=part(G.cone,MAT.claw,.06*s,.3*s,.06*s,(k-1)*.18*s,-.9*s,.75*s,lo);c.rotation.x=Math.PI/2}legs.push({L,lo,ph})}
  const tail=[];let par=body;for(let k=0;k<9;k++){const t=new THREE.Group();t.position.set(0,k?.62*s:2.9*s,k?0:-2.2*s);par.add(t);part(G.sphere,fur,(.36-k*.025)*s,.4*s,(.36-k*.025)*s,0,.3*s,0,t);t.rotation.x=k?-.18:-.9;tail.push(t);par=t}
  const aura=glowSprite(0x4060ff,s*9,.05);aura.position.y=3*s;body.add(aura);
  g.scale.setScalar(1);return{g,body,head,jaw,legs,tail,eyes,fur,anim:catAnim}}
function catAnim(e,dt,mv,lunge){const m=e.m,t=e.t,b=m.body;const run=mv*(e.type==='kitten'?1.4:1);
  m.legs.forEach(L=>{const ph=t*8+L.ph;L.L.rotation.x=Math.sin(ph)*.55*run;L.lo.rotation.x=Math.max(0,-Math.sin(ph))*.7*run});b.position.y=Math.abs(Math.sin(t*8))*.25*run;
  m.tail.forEach((s,k)=>{s.rotation.z=Math.sin(t*2+k*.5)*.12;s.rotation.x=(k?-.18:-.9)+Math.sin(t*1.4+k*.3)*.05});
  const grin=e.ai.grin>0?(e.ai.grin-=dt,1):0;m.jaw.rotation.x=lunge*.5+grin*.35+Math.max(0,Math.sin(t*1.3))*.06;m.head.rotation.y=Math.sin(t*.8)*.15;
  if(m.fur!==MAT2.catFur){const want=e.ai.vanish>0?.04:1;const o=m.fur.opacity===undefined?1:m.fur.opacity;const no=lerp(o,want,Math.min(1,dt*6));m.fur.transparent=no<.98;m.fur.opacity=no;m.fur.depthWrite=no>.5}
  const st=e.ai.stare>0?1:0;m.eyes.forEach(g=>{g.scale.setScalar((e.type==='kitten'?.5:1.6)*(1+st*2.5+Math.sin(t*9)*.08*st))})}
/* ---------- the crimson slug ---------- */
function buildSlug(s=1){const M2=mat2();const g=new THREE.Group(),body=new THREE.Group();g.add(body);const segs=[];const n=13;
  for(let i=0;i<n;i++){const u=i/(n-1);const r=(1.1+Math.sin(u*Math.PI)*.8-u*.2)*s;const sg=new THREE.Group();body.add(sg);const m=part(G.sphere,u<.5?M2.slugDark:M2.slug,r,r*.95,r*1.05,0,0,0,sg);
    if(u>.35&&i%1===0){for(let k=0;k<2;k++){const sp=part(G.cone,M2.slug,.14*s,(.7+Math.random()*.5)*s,.14*s,0,r*.9,(k-.5)*r*.6,sg);sp.rotation.x=-.4+k*.3}}segs.push({g:sg,r,u})}
  const head=new THREE.Group();body.add(head);part(G.sphere,M2.slug,1.7*s,1.45*s,2.1*s,0,0,0,head);for(let k=0;k<4;k++){const sp=part(G.cone,M2.slug,.18*s,(1+k*.2)*s,.18*s,0,1.3*s,(-1.2+k*.5)*s,head);sp.rotation.x=-.6}
  const mouth=new THREE.Group();mouth.position.set(0,-.6*s,1.5*s);head.add(mouth);part(G.sphere,M2.slugMouth,1.05*s,.7*s,.6*s,0,0,0,mouth);teethRow(mouth,14,0,.35*s,.45*s,1.8*s,true,MAT.tooth,2.2*s);teethRow(mouth,12,0,-.35*s,.42*s,1.6*s,false,MAT.tooth,1.9*s);
  const horns=[];for(const q of[-1,1]){const h=new THREE.Group();h.position.set(q*.55*s,.5*s,1.5*s);head.add(h);const c=part(G.cone,M2.slugHorn,.2*s,4.2*s,.2*s,0,2.1*s,0,h);h.rotation.x=1.25;h.rotation.z=-q*.15;const tip=glowSprite(0xffa040,1.4*s,.95);tip.position.y=4.2*s;h.add(tip);horns.push({h,tip})}
  for(const q of[-1,1]){const f=part(G.cone,M2.slugHorn,.12*s,1.8*s,.12*s,q*.7*s,-1.2*s,1.4*s,head);f.rotation.x=Math.PI-.35}
  const glow=glowSprite(0xff3010,9*s,.07);glow.position.y=3*s;body.add(glow);
  return{g,body,segs,head,mouth,horns,s,anim:slugAnim}}
function slugAnim(e,dt,mv,lunge){const m=e.m,t=e.t,s=m.s;const rear=e.ai.rear>0?(e.ai.rear-=dt,Math.min(1,e.ai.rear*2)):0;const sink=e.ai.sink||0;
  for(const q of m.segs){const u=q.u;const z=(-6.5+u*6.5)*s;const lift=u>.45?Math.pow((u-.45)/.55,1.6)*(4.2+rear*3)*s:0;q.g.position.set(Math.sin(t*1.6-u*5)*.6*s*(1-u*.4),q.r*.8+lift-sink*8*s,z+Math.sin(t*2.4-u*7)*.15*s*mv)}
  const last=m.segs[m.segs.length-1].g.position;m.head.position.set(last.x,last.y+1*s,last.z+1.4*s-rear*1.5*s);m.head.rotation.x=-.25+rear*-.5+lunge*.7;
  m.mouth.scale.y=1+lunge*.8+rear*.4+Math.max(0,Math.sin(t*2))*.15;m.horns.forEach((h,i)=>{h.h.rotation.y=Math.sin(t*1.5+i*2)*.15;if(Math.random()<.04)SP.emit(h.tip.getWorldPosition(V3()),{c0:0xffc070,c1:0xff2000,s0:.5,s1:.2,life:1,grav:10,speed:.2})})}
/* ---------- purple guardian (summoned by the Master of Illusions) ---------- */
function buildGuardian(){const M2=mat2();const g=new THREE.Group(),body=new THREE.Group();g.add(body);const Mg=M2.guard;
  part(G.sphere,Mg,2.3,2.6,1.7,0,6,0,body);part(G.sphere,M2.guardCore,1.2,1.5,1,0,6,.4,body);part(G.sphere,Mg,1.6,1.4,1.3,0,3.6,0,body);
  const head=new THREE.Group();head.position.set(0,9,.3);body.add(head);part(G.sphere,Mg,1.1,1.2,1.1,0,0,0,head);
  for(const q of[-1,1]){const h=new THREE.Mesh(G.bigHorn,M2.guardCore);h.scale.setScalar(.35);h.position.set(q*.8,.6,-.2);h.rotation.set(-.2,q*.2,-q*1.4);head.add(h);const ey=glowSprite(0xe0b0ff,1.2,1);ey.position.set(q*.38,.1,1);head.add(ey)}
  for(let k=0;k<6;k++){const c=part(G.shard,M2.guardCore,.35,.9,.35,(k%2?1:-1)*(2+Math.floor(k/2)*.4),7.6+Math.floor(k/2)*.3,-.3,body);c.rotation.z=(k%2?-1:1)*.5}
  const arms=[];for(const q of[-1,1])for(const lv of[0,1]){const A=new THREE.Group();A.position.set(q*2.3,lv?7.2:5.4,0);body.add(A);part(G.sphere,Mg,.55,1.5,.55,0,-1.3,0,A);const F=new THREE.Group();F.position.y=-2.6;A.add(F);part(G.sphere,Mg,.5,1.3,.5,0,-1,0,F);part(G.sphere,M2.guardCore,.7,.6,.7,0,-2.2,0,F);A.rotation.z=q*(lv?.9:.35);arms.push({A,F,q,lv})}
  const lo=glowSprite(0x9a50ff,18,.35);lo.position.y=5;body.add(lo);return{g,body,head,arms,anim:guardAnim}}
function guardAnim(e,dt,mv,lunge){const m=e.m,t=e.t;m.body.position.y=Math.sin(t*1.5)*.3+.8;const sl=e.ai.slam>0?(e.ai.slam-=dt,Math.sin(Math.min(1,(1-e.ai.slam/1.1))*Math.PI)):0;
  m.arms.forEach((a,i)=>{a.A.rotation.x=Math.sin(t*1.2+i)*.2-sl*2.2-lunge*1.2;a.F.rotation.x=-.3-sl*.5});if(Math.random()<.3)SP.emit(V3(e.pos.x+rand(-2,2),e.pos.y+rand(2,9),e.pos.z+rand(-2,2)),{c0:0xe0c0ff,c1:0x4a10a0,s0:.5,s1:.1,life:.8,up:1.5})}
/* ---------- human-size bosses ---------- */
function buildQueen(){const M2=mat2();const a=makeCHActor('f',{skin:0xfff2ee,skinLift:[1.42,1.58,1.68],hair:'hairLong',hairCol:0xffcf55,brow:0x6a5030,eyeTint:0xffd0d0,
    wear:[['long',0x14080c,{roughness:.35,metalness:.1}],['tee',0x5a0a16,{roughness:.3,metalness:.7,emissive:0x2a0206,envMapIntensity:1.4}],['witch',0x24040a,{roughness:.5,side:THREE.DoubleSide}],['shoes',0x0a0a0a,{roughness:.3}]]});
  if(!a)return buildFoxSpirit();const S=a.S,SK=S.SK;
  const tiara=new THREE.Group();for(let k=0;k<5;k++){const sp=new THREE.Mesh(G.cone,M2.queenMetal);const u=(k-2)/2;sp.scale.set(.012,.05+(2-Math.abs(k-2))*.02,.012);sp.position.set(u*.07,.13+(2-Math.abs(k-2))*.01,.06-Math.abs(u)*.03);tiara.add(sp)}const tg=new THREE.Mesh(G.sphereLo,M2.gem);tg.scale.setScalar(.012);tg.position.set(0,.125,.075);tiara.add(tg);a.attach('Head',tiara,SK.Head.clone());
  // blade collar
  const col=new THREE.Group();for(let k=0;k<7;k++){const u=(k-3)/3;const bl=new THREE.Mesh(bendGeo(lathe([[0,0],[.045,.02],[.04,.2],[.02,.36],[0,.44]],6),.44,.9),M2.queenMetal);bl.scale.set(1,1,.25);bl.position.set(u*.16,0,-.05-Math.abs(u)*.02);bl.rotation.set(-.35,u*.4,-u*.55);col.add(bl)}a.attach('spine_03',col,SK.spine_03.clone().add(new THREE.Vector3(0,.12,-.05)));
  const shoulder=[];for(const q of[-1,1]){const p=new THREE.Mesh(bendGeo(lathe([[0,0],[.06,.02],[.05,.18],[0,.26]],6),.26,1.2),M2.queenMetal);p.scale.set(1,1,.3);const h=a.attach(q<0?'clavicle_r':'clavicle_l',p,SK[q<0?'clavicle_r':'clavicle_l'].clone().add(new THREE.Vector3(q*.1,.06,-.02)),new THREE.Euler(0,0,-q*.6));shoulder.push(h)}
  const chk=new THREE.Mesh(new THREE.TorusGeometry(.058,.012,6,18),M2.queenMetal);chk.rotation.x=Math.PI/2;a.attach('neck_01',chk,SK.neck_01.clone().add(new THREE.Vector3(0,.01,.01)));
  for(let k=0;k<5;k++){const gm=new THREE.Mesh(G.sphereLo,M2.gem);gm.scale.setScalar(.012);gm.position.set(Math.sin((k-2)*.45)*.06,-.004,Math.cos((k-2)*.45)*.06);chk.add(gm)}
  const cross=new THREE.Group();const cb=new THREE.Mesh(new THREE.BoxGeometry(.012,.05,.008),M2.queenMetal);cross.add(cb);const cb2=new THREE.Mesh(new THREE.BoxGeometry(.032,.012,.008),M2.queenMetal);cb2.position.y=.008;cross.add(cb2);cross.add(glowSprite(0xff2030,.12,.8));a.attach('spine_03',cross,SK.spine_03.clone().add(new THREE.Vector3(0,.04,.13)));
  for(const q of[-1,1]){const ey=glowSprite(0xff2040,.09,.9);ey.position.set(q*.032,-.012,.07);a.head.add(ey)}
  const aura=glowSprite(0xff1030,6,.07);aura.position.y=1.2;a.g.add(aura);const rn=decal(runeTex,0xff2040,4,true,.45);rn.position.y=.08;a.g.add(rn);
  return{g:a.g,body:a.body,actor:a,aura,rn,anim:(e,dt,mv)=>{e.m.body.position.y=.35+Math.sin(e.t*1.6)*.12;rn.rotation.z+=dt*.4;actorAnimate(e,dt,mv);if(Math.random()<.25)SP.emit(V3(e.pos.x+rand(-.6,.6),e.pos.y+rand(0,2),e.pos.z+rand(-.6,.6)),{c0:0xff6070,c1:0x300008,s0:.3,s1:.05,life:.9,up:1.2})}}}
function buildBilel(){const a=makeCHActor('m',{skin:0xfff4ec,skinLift:[1.34,1.5,1.62],hair:'hairBuzz',hairTex:'1',hairCol:0x21150d,brow:0x140c07,keepReg:[5,6,9],
    wear:[['tee',0xf7f7f5,{roughness:.85}],['trousers',0x27303f,{roughness:.85}],['shoes',0xf4f4f4,{roughness:.45}]]});if(!a)return null;const S=a.S,SK=S.SK,G0=S.geo;
  // open black jacket (front strip left open so the white tee shows)
  try{const B=G0.body,reg=chRegions(B,a.bones),pos=B.attributes.position.array;const X=i=>Math.abs(pos[i*3]),Y=i=>pos[i*3+1],Z=i=>pos[i*3+2];
    const hipY=SK.pelvis.y,neckY=SK.neck_01.y,armX0=SK.upperarm_l.x,wristX=SK.hand_l.x,fz=SK.spine_03.z;
    const torso=i=>{const r=reg[i];return(r>=1&&r<=4)||(r===5&&Y(i)<neckY+.005)||r===0};
    const arm=(i,t)=>{const r=reg[i];if(r!==7&&r!==8&&r!==4)return false;return(X(i)-armX0)/(wristX-armX0)<t};
    const open=i=>Z(i)>fz-.01&&X(i)<.045+clamp((Y(i)-(neckY-.3))/.3,0,1)*.05;
    const jg=chShell(B,i=>(torso(i)&&Y(i)>hipY-.13&&reg[i]!==5&&!open(i))||arm(i,.955),.021,i=>reg[i]===3||reg[i]===2?.007:0);
    a.sk(jg,std({color:0x19191d,roughness:.55,metalness:.05,skinning:true,envMapIntensity:.9}))}catch(e){}
  // spiky dark hair, faded sides
  const hm=std({color:0x24170e,roughness:.55}),ht=std({color:0x4a3020,roughness:.5});const sp=new THREE.Group();
  for(let k=0;k<64;k++){const row=k<16?0:k<34?1:k<50?2:3;const n=[16,18,16,14][row];const ii=k-[0,16,34,50][row];const ang=-1.35+ii/(n-1)*2.7+rand(-.08,.08);
    const d=V3(Math.sin(ang)*(.86-row*.14),.7+row*.2,.55-row*.4+(row===0?.12:0)).normalize();d.z=d.z*Math.cos(ang*.5);d.normalize();
    const c=new THREE.Mesh(G.cone,k%5?hm:ht);c.scale.set(.034,.075+Math.random()*.04+(row<2?.015:0),.034);c.position.copy(d).multiplyScalar(.1).add(V3(0,.088,-.01));
    const tip=d.clone().add(V3(rand(-.15,.15),.55,row===0?.12:-.12)).normalize();c.lookAt(c.position.clone().add(tip));c.rotateX(Math.PI/2);sp.add(c)}
  a.attach('Head',sp,SK.Head.clone());
  // cuban link chain
  const cm=std({color:0xe8e8ee,roughness:.18,metalness:1,envMapIntensity:1.6});const ch=new THREE.Group();const lg=new THREE.TorusGeometry(.0095,.0036,5,10);
  for(let k=0;k<38;k++){const t=k/37;const ang=(t-.5)*Math.PI*1.5;const lk=new THREE.Mesh(lg,cm);lk.position.set(Math.sin(ang)*.088,-Math.pow(Math.cos(ang*.62),6)*.1+.01,Math.cos(ang)*.1+.012);lk.rotation.set(0,ang,k%2?Math.PI/2:0);ch.add(lk)}
  a.attach('neck_01',ch,SK.neck_01.clone().add(new THREE.Vector3(0,-.03,.012)),new THREE.Euler(.12,0,0));
  // watch
  const wt=new THREE.Mesh(new THREE.CylinderGeometry(.018,.018,.01,16),std({color:0x1a1a1a,roughness:.3,metalness:.8}));wt.rotation.z=Math.PI/2;a.attach('hand_l',wt,SK.hand_l.clone().add(new THREE.Vector3(-.03,.0,.0)));
  a.body.scale.set(1.07,1,1.07);a.setBase('Idle_FoldArms_Loop');a.g.traverse(c=>{if(c.isMesh)c.castShadow=true});return a}
/* ---------- boss definitions ---------- */
Object.assign(ETYPES,{
  kitten:{name:'Shadow kitten',hp:70,speed:8.2,dmg:11,range:2.2,cd:.9,xp:24,r:.8,h:1.4,build:()=>buildCat(.3)},
  slugling:{name:'Acid slug',hp:110,speed:2.6,dmg:14,range:2.6,cd:1.3,xp:30,r:1,h:1.2,build:()=>buildSlug(.26)},
  guardian:{name:'Violet guardian',lvl:50,hp:1300,speed:3,dmg:40,range:6,cd:2.8,xp:600,r:2.4,h:10,ghost:true,build:buildGuardian},
  catdemon:{name:'Azurmaw, the Grinning Cat',boss:true,gate:19,lvl:24,need:'giant',hp:9000,speed:7.4,dmg:34,range:4.6,cd:1.6,xp:1500,r:2.6,h:5.2,build:()=>buildCat(1)},
  slug:{name:'Gorgoloth, the Crimson Slug',boss:true,gate:26,lvl:32,need:'catdemon',hp:9500,speed:2.8,dmg:36,range:7,cd:2,xp:2000,r:3.4,h:8,build:()=>buildSlug(1)},
  queen:{name:'Morwen, Queen of the Abyss',boss:true,gate:37,lvl:43,need:'slug',needBQ:true,hp:9000,speed:5,dmg:34,range:0,cd:9,xp:2600,r:.9,h:2.4,kite:true,build:buildQueen},
  illusion:{name:'Kaen Kuroshiba, Master of Illusions',boss:true,gate:47,lvl:53,need:'queen',hp:12500,speed:5.8,dmg:42,range:0,cd:9,xp:0,r:.9,h:2.4,kite:true,final:true,build:buildIllusion}});
ETYPES.giant.final=false;ETYPES.giant.xp=900;BOSS_ORDER.push('catdemon','slug','queen','illusion');
Object.assign(SPEAKER,{'Azurmaw':'#8ab0ff','Gorgoloth':'#ff6a40','Morwen':'#ff4060','Kaen':'#c090ff','Master Bilel':'#f2d27a'});
const BOSS_LINES={
  catdemon:[['Azurmaw','Mmmm. A witch. You smell like fire and fear. My favourite dinner.',0],['@','Here, kitty. I brought a very hot saucer of milk.',1],['Azurmaw','Look into my eyes, little one. Go on. Look.',0]],
  slug:[['@','That is the biggest, wettest, ugliest thing I have ever seen in Paris.',1],['Gorgoloth','THE CATACOMBS ARE MINE. THE SEWERS ARE MINE. SOON, THE STREETS.',0],['@','Not while I have salt. And fire. Mostly fire.',1]],
  queen:[['Morwen','So you are the little witch who killed my pets.',0],['@','You must be the one who keeps letting them out.',1],['Morwen','I am the abyss, darling. And the abyss is always hungry.',0]],
  illusion:[['Kaen','Everything you have fought tonight was mine. The fox, the fire, the cold, the queen.',0],['@','Then this is where it ends.',1],['Kaen','Ends? You are still standing inside my illusion, witch.',0]]};
const ROARERS=new Set(['The Nine-Tails','Hrímgar','Azurmaw','Gorgoloth']);
/* ---------- boss AI ---------- */
function bossPlayerLooking(e){const f=camForward();const dx=e.pos.x-P.pos.x,dz=e.pos.z-P.pos.z,d=Math.hypot(dx,dz)||1;return(f.x*dx+f.z*dz)/d>.55}
function acidPool(pos,r,dur,dps,col){pos.y=groundAt(pos.x,pos.z);const d=decal(scorchTex,col,r*2.2,true,.8);d.position.set(pos.x,pos.y+.1,pos.z);scene.add(d);let tk=0;
  addFx(d,dur,(f,k)=>{d.material.opacity=.8*(1-k);tk-=1/60;if(tk<=0){tk=.4;if(playerIn(pos,r,2))damagePlayer(dps*.4)}if(Math.random()<.3)SM.emit(V3(pos.x+rand(-r,r)*.7,pos.y+.3,pos.z+rand(-r,r)*.7),{c0:0xff7040,c1:0x401008,s0:.8,s1:2,life:1,a:.35,up:1})},()=>{scene.remove(d);disposeObj(d)})}
Object.assign(BOSSAI,{
  catdemon(e,dt,d){const a=e.ai,rage=e.hp<e.maxhp*.5;a.a1-=dt;a.a2-=dt;a.a3-=dt;a.a4-=dt;a.a5=(a.a5===undefined?12:a.a5)-dt;
    if(e.leap){e.leap.t+=dt;const k=Math.min(1,e.leap.t/.55);e.pos.x=lerp(e.leap.a.x,e.leap.b.x,k);e.pos.z=lerp(e.leap.a.z,e.leap.b.z,k);e.pos.y=lerp(e.leap.a.y,e.leap.b.y,k)+Math.sin(k*Math.PI)*6;if(k>=1)e.leap=null;return}
    if(a.vanish>0){a.vanish-=dt;if(a.vanish<=0){const bk=V3(P.pos.x-Math.sin(P.face)*4,0,P.pos.z-Math.cos(P.face)*4);e.pos.x=bk.x;e.pos.z=bk.z;e.pos.y=groundAt(bk.x,bk.z);a.grin=1.2;sfx.hiss();e.busy=1;
      telegraph(e.pos.clone(),5,.55,0x6a8aff,()=>{if(e.dead)return;ring(e.pos,0x8ab0ff,1,6,.3);SP.emit(eCenter(e),{n:50,c0:0xffffff,c1:0x4060ff,speed:10,life:.6});if(playerIn(e.pos,5))damagePlayer(e.dmg*2.2)})}else return}
    if(a.stare>0){a.stare-=dt;if(a.stare<=0){if(bossPlayerLooking(e)&&Math.hypot(P.pos.x-e.pos.x,P.pos.z-e.pos.z)<40){damagePlayer(e.dmg*1.2);P.chilled=3;P.webbed=1.5;toast('Hypnotised. Next time, look away.')}else toast('You looked away. Good.')}return}
    if(e.busy>0)return;
    if(a.a1<=0&&d>7&&d<32){a.a1=rage?3.2:4.6;e.busy=1.4;const tgt=P.pos.clone();tgt.y=groundAt(tgt.x,tgt.z);sfx.roar();
      telegraph(tgt,5.2,.9,0x6a8aff,()=>{if(e.dead)return;ring(tgt,0x8ab0ff,1,7,.4);P.shake=1;sfx.boom();SP.emit(V3(tgt.x,tgt.y+1,tgt.z),{n:60,c0:0xffffff,c1:0x4060ff,speed:12,life:.7});if(playerIn(tgt,5.2))damagePlayer(e.dmg*2)});
      after(.35,()=>{if(!e.dead)e.leap={a:e.pos.clone(),b:tgt,t:0}})}
    else if(a.a2<=0&&d<10){a.a2=rage?2.4:3.4;e.busy=1;const dir=V3(P.pos.x-e.pos.x,0,P.pos.z-e.pos.z).normalize();const o=e.pos.clone();a.grin=.8;
      coneTelegraph(o,dir,9.5,.75,.6,0x8ab0ff,()=>{if(e.dead)return;e.atk=.3;whoosh&&whoosh(.2,300,1400,.12);for(let k=0;k<3;k++)after(k*.06,()=>SP.emit(o.clone().addScaledVector(dir,4+k*2).setY(o.y+2),{n:14,c0:0xffffff,c1:0x6a8aff,speed:6,life:.4}));if(inCone(P.pos,o,dir,9.5,.75))damagePlayer(e.dmg*1.7)})}
    else if(a.a3<=0){a.a3=rage?8:11;a.vanish=1.6;e.busy=1.6;sfx.blink();toast('It vanished. Watch your back.')}
    else if(a.a4<=0){a.a4=rage?10:14;summonNear(e,'kitten',rage?5:3);a.grin=1.5;cineLine('Azurmaw','My children are hungry too.')}
    else if(a.a5<=0){a.a5=rage?9:13;a.stare=1.5;e.busy=1.5;toast('Its eyes are glowing. Look away!','Hypnosis',true);sfx.warn()}
    if(!a.s1&&e.hp<e.maxhp*.5){a.s1=1;cineLine('Azurmaw','Nine lives, witch. I still have eight.')}},
  slug(e,dt,d){const a=e.ai,rage=e.hp<e.maxhp*.5;a.a1-=dt;a.a2-=dt;a.a3-=dt;a.a4-=dt;
    if(a.burrow){const B=a.burrow;B.t+=dt;a.sink=B.t<.8?B.t/.8:B.t<2.2?1:Math.max(0,1-(B.t-2.2)/.4);if(B.t>=.8&&!B.moved){B.moved=true;e.pos.x=B.to.x;e.pos.z=B.to.z}if(B.t>=2.6){a.burrow=null;a.sink=0}return}
    if(e.busy>0)return;
    if(a.a1<=0){a.a1=rage?3.2:4.4;e.busy=1;a.rear=.7;const n=rage?6:4;for(let k=0;k<n;k++){const p=P.pos.clone().add(k?V3(rand(-7,7),0,rand(-7,7)):V3());p.y=groundAt(p.x,p.z);after(k*.15,()=>{if(e.dead)return;const from=m_headPos(e);
      telegraph(p,3.2,1.1,0xff5020,()=>{if(e.dead)return;FL.emit(V3(p.x,p.y+.6,p.z),{n:30,c0:0xffd0a0,c1:0xff3000,s0:1.4,s1:.3,speed:6,life:.6});if(playerIn(p,3.2)){damagePlayer(e.dmg*1.2);P.poison=Math.max(P.poison,3)}acidPool(p,3,5,e.dmg,0xff5020)});
      const blob=glowSprite(0xff6020,2.4);scene.add(blob);addFx(blob,1.05,(f,kk)=>{blob.position.lerpVectors(from,p,kk);blob.position.y+=Math.sin(kk*Math.PI)*9;FL.emit(blob.position,{n:1,c0:0xffd080,c1:0xff2000,s0:1,s1:.2,life:.3})},()=>{scene.remove(blob)})})}sfx.hiss()}
    else if(a.a2<=0&&d<26){a.a2=rage?4.5:6;e.busy=1.8;a.rear=1.4;const dir=V3(P.pos.x-e.pos.x,0,P.pos.z-e.pos.z).normalize();e.m.g.rotation.y=Math.atan2(dir.x,dir.z);const from=e.pos.clone(),to=from.clone().addScaledVector(dir,24);sfx.roar();
      lineTelegraph(from,to,5.5,1.1,0xff4020,()=>{if(e.dead)return;e.atk=.3;P.shake=1.3;sfx.boom();for(let k=0;k<8;k++){const p=V3().lerpVectors(from,to,k/7);p.y=groundAt(p.x,p.z);fireBurst(V3(p.x,p.y+.5,p.z),3,false)}if(distToSeg(P.pos,from,to)<2.9&&Math.abs(P.pos.y-from.y)<4)damagePlayer(e.dmg*2.1)})}
    else if(a.a3<=0){a.a3=rage?9:12;e.busy=2.8;const to=P.pos.clone();a.burrow={t:0,to};telegraph(to,5,2.2,0xff3010,()=>{if(e.dead)return;P.shake=1.5;sfx.boom();fireBurst(V3(to.x,to.y+1,to.z),6,true);if(playerIn(to,5)){damagePlayer(e.dmg*2.4);P.vy=13;P.onGround=false}});toast('The ground trembles. Move!')}
    else if(a.a4<=0){a.a4=rage?11:15;summonNear(e,'slugling',rage?5:3)}
    if(!a.s1&&e.hp<e.maxhp*.5){a.s1=1;cineLine('Gorgoloth','YOU. WILL. DISSOLVE.')}},
  queen(e,dt,d){const a=e.ai,rage=e.hp<e.maxhp*.5;a.a1-=dt;a.a2-=dt;a.a3-=dt;a.a4-=dt;a.tp-=dt;const act=e.m.actor;
    if(e.dash){e.dash.t+=dt;const k=Math.min(1,e.dash.t/.22);e.pos.x=lerp(e.dash.a.x,e.dash.b.x,k);e.pos.z=lerp(e.dash.a.z,e.dash.b.z,k);SP.emit(eCenter(e),{n:6,c0:0xffffff,c1:0xff1030,speed:2,life:.4});if(k>=1)e.dash=null;return}
    if(e.busy>0)return;
    if(a.a1<=0){a.a1=rage?3.4:4.8;e.busy=1;if(act){act.fire('OverhandThrow',.6);e.m.lock=.6}const n=rage?7:5;for(let k=0;k<n;k++){const p=P.pos.clone().add(k?V3(rand(-6,6),0,rand(-6,6)):V3());p.y=groundAt(p.x,p.z);after(k*.1,()=>{if(e.dead)return;
      telegraph(p,2.2,.85,0xff1030,()=>{if(e.dead)return;const sp=new THREE.Mesh(G.spike,std({color:0x8a0010,emissive:0x600008,roughness:.3}));sp.position.copy(p);addFx(sp,1,(f,kk)=>{sp.scale.set(.6,f.t<.1?f.t/.1:f.t>.8?(1-f.t)/.2:1,.6)},()=>{scene.remove(sp);disposeObj(sp)});SP.emit(V3(p.x,p.y+1,p.z),{n:16,c0:0xff8090,c1:0x400008,speed:5,life:.5});if(playerIn(p,2.3))damagePlayer(e.dmg*1.4)})})}}
    else if(a.a2<=0&&d<24){a.a2=rage?3.8:5.2;e.busy=1;const from=e.pos.clone(),dir=V3(P.pos.x-from.x,0,P.pos.z-from.z).normalize(),to=from.clone().addScaledVector(dir,Math.min(26,d+5));if(act){act.fire('Punch_Cross',.5);e.m.lock=.5}
      lineTelegraph(from,to,2.6,.55,0xff2040,()=>{if(e.dead)return;e.dash={a:from,b:to,t:0};sfx.blink();after(.12,()=>{if(distToSeg(P.pos,from,to)<1.7&&Math.abs(P.pos.y-from.y)<3)damagePlayer(e.dmg*1.9)})})}
    else if(a.a3<=0){a.a3=rage?6:8;e.busy=1.2;if(act){act.fire('Spell_Simple_Shoot',.7);e.m.lock=.7}const c=eCenter(e);for(let k=0;k<(rage?8:6);k++){const ang=k/(rage?8:6)*TAU;after(k*.08,()=>{if(!e.dead)enemyOrb(c.clone().add(V3(Math.sin(ang)*1.2,.5,Math.cos(ang)*1.2)),aimAtPlayer(c),10,e.dmg*.8,0xff2040,.4,{homing:2.4,keepY:true,life:4.5})})}}
    else if(a.a4<=0){a.a4=rage?7:10;e.busy=.9;sfx.roar&&sfx.roar();shockwave(e.pos.clone(),30,12,e.dmg*1.2,0xff3050);if(rage)after(.8,()=>{if(!e.dead)shockwave(e.pos.clone(),30,12,e.dmg*1.2,0xff3050)});toast('Jump the crimson wave!')}
    if(a.tp<=0){a.tp=rage?5:7;teleportNear(e,8,14)}
    if(!a.s1&&e.hp<e.maxhp*.5){a.s1=1;summonNear(e,'demon',4);cineLine('Morwen','Rise, my darlings. Mother is annoyed.')}},
  illusion(e,dt,d){const a=e.ai,rage=e.hp<e.maxhp*.5;a.a1-=dt;a.a2-=dt;a.a3-=dt;a.tp-=dt;const act=e.m.actor;
    e.guarded=enemies.some(o=>!o.dead&&o.type==='guardian');
    if(!a.g0){a.g0=1;summonGuardians(e,1)}if(!a.g1&&e.hp<e.maxhp*.66){a.g1=1;summonGuardians(e,2);cineLine('Kaen','Guardians. Crush her.')}if(!a.g2&&e.hp<e.maxhp*.33){a.g2=1;summonGuardians(e,2);cineLine('Kaen','You cannot hit what is not really there.')}
    if(e.busy>0)return;
    if(a.a1<=0){a.a1=rage?4:5.5;e.busy=1.1;if(act){act.fire('Spell_Simple_Shoot',.7);e.m.lock=.7}const n=rage?6:4;for(let k=0;k<n;k++){const p=P.pos.clone().add(k?V3(rand(-7,7),0,rand(-7,7)):V3());p.y=groundAt(p.x,p.z);
      after(k*.12,()=>telegraph(p,2.6,.95,0xa050ff,()=>{if(e.dead)return;lightning(V3(p.x,p.y+22,p.z),V3(p.x,p.y,p.z),0xe0c0ff);lightning(V3(p.x+1,p.y+22,p.z),V3(p.x,p.y,p.z),0x9040ff);flash(p,0xa060ff,5);noise(.3,.16,2400);if(playerIn(p,2.7))damagePlayer(e.dmg*1.5)}))}}
    else if(a.a2<=0){a.a2=rage?7:9;e.busy=.8;summonNear(e,'fox',rage?5:3);teleportNear(e,10,16);toast('Illusions. Only one of them is real.')}
    else if(a.a3<=0&&d<20){a.a3=rage?4.5:6.5;e.busy=1.4;const dir=V3(P.pos.x-e.pos.x,0,P.pos.z-e.pos.z).normalize();const o=e.pos.clone();if(act){act.fire('OverhandThrow',.7);e.m.lock=.7}
      coneTelegraph(o,dir,20,.4,.9,0xa050ff,()=>{if(e.dead)return;for(let k=0;k<30;k++){const p=o.clone().addScaledVector(dir,k*.7).add(V3(rand(-1,1),1.2+rand(-.5,.5),rand(-1,1)));SP.emit(p,{n:2,c0:0xffffff,c1:0x8a30ff,speed:5,life:.5})}if(inCone(P.pos,o,dir,20,.4)){damagePlayer(e.dmg*2);P.chilled=2}})}
    if(a.tp<=0){a.tp=rage?5:8;teleportNear(e,9,15)}}
});
function summonGuardians(e,n){for(let k=0;k<n;k++){const s=findSpot(e.pos.x,e.pos.z,4,8);if(!s)continue;const gd=spawnEnemy('guardian',s);runeFlash(s,0xa050ff,10,1.5);SM.emit(V3(s.x,s.y+3,s.z),{n:40,c0:0xc090ff,c1:0x200840,s0:3,s1:8,speed:4,up:3,life:1.6,a:.6})}P.shake=.8;sfx.roar&&sfx.roar()}
function m_headPos(e){const h=e.m.head;return h?h.getWorldPosition(V3()):eCenter(e)}
/* guardian slam (non-boss custom AI) */
ETYPES.guardian.ai=(e,dt,d)=>{e.ai.gs=(e.ai.gs===undefined?2:e.ai.gs)-dt;if(e.ai.gs<=0&&d<11&&e.busy<=0){e.ai.gs=3.2;e.busy=1.2;e.ai.slam=1.1;const dir=V3(P.pos.x-e.pos.x,0,P.pos.z-e.pos.z).normalize();const at=e.pos.clone().addScaledVector(dir,Math.min(d,5));at.y=groundAt(at.x,at.z);
  telegraph(at,5.5,1,0xa050ff,()=>{if(e.dead)return;P.shake=1;sfx.boom();ring(at,0xc090ff,1,7,.4);SP.emit(V3(at.x,at.y+1,at.z),{n:60,c0:0xffffff,c1:0x8030ff,speed:12,life:.6});if(playerIn(at,5.5))damagePlayer(e.dmg*1.6)})}return true};
/* ---------- outros ---------- */
function bossOutro2(type,center,orb){
  if(type==='giant')playCutscene([{who:'Hrímgar',text:'You think... this was the end...? The cold was only... the door...',cam:orb,update:()=>frostBurst(V3(center.x+rand(-3,3),center.y+rand(2,10),center.z+rand(-3,3)),3)},
      {dur:2.6,cam:(k)=>({pos:V3(center.x,center.y+20+k*8,center.z+22),look:center}),onStart:()=>{for(let k=0;k<5;k++){const s=findSpot(center.x,center.z,6,22);if(s)runeFlash(s,0x4060ff,5,2.4)}}},
      {who:'@',text:'No dawn yet. Something else is purring out there.',cam:witchShot(-1,4)}],()=>toast('Something with glowing eyes hunts the rooftops. Reach level 19. It is level 24.','The night goes on',true));
  else if(type==='catdemon')playCutscene([{who:'Azurmaw',text:'Eight lives... left... and none of them... enough...',cam:orb},{who:'@',text:'Bad kitty.',cam:witchShot(1,4)},
      {dur:2.4,cam:(k)=>({pos:V3(center.x,center.y+14+k*6,center.z+18),look:center}),onStart:()=>{P.shake=.8;sfx.roar()}},{who:'@',text:'Why is the pavement... breathing?',cam:witchShot(-1,4)}],()=>toast('Something huge moves under the streets. Reach level 26. It is level 32.','Boss defeated',true));
  else if(type==='slug')playCutscene([{who:'Gorgoloth',text:'The queen... will... drink you...',cam:orb},{who:'@',text:'Queen? Wonderful. And I smell like slug.',cam:witchShot(1,4)}],()=>after(1.2,bilelArrive));
  else if(type==='queen')playCutscene([{who:'Morwen',text:'Kaen... she is... stronger than you said...',cam:orb},{who:'@',text:'Who is Kaen?',cam:witchShot(1,4)},{who:'Kaen',text:'The one who wrote this whole night, witch. Come and find me.',cam:orb,onStart:()=>{flash(center,0xa050ff,12);SP.emit(V3(center.x,center.y+3,center.z),{n:120,c0:0xffffff,c1:0x8030ff,speed:10,life:1.2})}}],()=>toast('The Master of Illusions is waiting. Reach level 47. He is level 53.','Boss defeated',true));
  else if(type==='illusion')finSpiritRise(center,orb);
  else if(type==='kaenSpirit'){const li=SPELLS.findIndex(s=>s.id==='limit');P.taught.add('limit');if(!P.bar.includes(li)){const free=P.bar.findIndex(x=>x==null||x<0);P.bar[free>=0?free:8]=li;renderBar()}after(.5,()=>toast('Limit Breaker is now yours: usable at 15% health, recharges in 4 minutes.','New skill',true));victoryDawn(center,orb,[["Kaen's Spirit",'Every illusion... ends... at dawn...'],['@','Rest now, Kaen. And Bilel... thank you. For everything.'],['@','Dawn. For real this time. Paris is safe.']])}}
function victoryDawn(center,orb,lines){STATS.won=true;writeSave();let dk=dawnK;snow.force=false;const sh=[{who:lines[0][0],text:lines[0][1],cam:orb,update:()=>SP.emit(V3(center.x+rand(-2,2),center.y+rand(1,4),center.z+rand(-2,2)),{c0:0xe0c0ff,c1:0x4010a0,s0:.5,s1:.1,life:.8,up:2})},
    {dur:5,cam:(k)=>({pos:V3(P.pos.x-20,P.pos.y+8+k*6,P.pos.z-20),look:V3(P.pos.x+120,P.pos.y+20,P.pos.z+100)}),update:(dt)=>{dk=Math.min(1,dk+dt*.25);setDawn(dk)}}];
  for(const l of lines.slice(1))sh.push({who:l[0],text:l[1],cam:witchShot(sh.length%2?1:-1,4.5),update:(dt)=>{dk=Math.min(1,dk+dt*.25);setDawn(dk)}});
  playCutscene(sh,()=>{setDawn(1);$('vLvl').textContent=P.level;$('vKills').textContent=STATS.kills;$('vTime').textContent=Math.max(1,Math.round(STATS.time/60));$('victory').classList.remove('hidden');paused=true})}
/* ---------- Master Bilel ---------- */
const BQ={met:false,q:-1,cnt:0,done:false,x:0,z:0,npc:null,talkCd:0,sacs:[],
  save(){return{met:this.met,q:this.q,cnt:this.cnt,done:this.done,x:this.x,z:this.z,dead:!!this.dead}},
  load(o){if(!o)return;this.met=!!o.met;this.q=o.q|0;this.cnt=o.cnt|0;this.done=!!o.done;this.x=o.x||0;this.z=o.z||0;this.dead=!!o.dead;if(o.q===undefined)this.q=-1},
  active(){return MODE!=='open'&&beaten.has('slug')&&!this.done}};
const BQUESTS=[
  {title:'The nose knows',goal:12,what:'demon pigs',give:'Kill 12 demon pigs. Their stink is the base of every good poison. Do not ask how I know.',done:'Perfect. You smell horrible. That means you are ready.',spell:'poison',xp:4000},
  {title:'Venom of the catacombs',goal:5,what:'venom sacs',give:'Spiders carry venom sacs. Bring me 5. Squeeze gently, they pop.',done:'Five sacs. Fresh. You are learning fast, witch.',spell:'venom',xp:6000},
  {title:'The test of the master',goal:10,what:'poisoned kills',give:'Last lesson. Kill 10 monsters while they are poisoned. Use my stinking cloud. Let them suffer a little.',done:'Hahaha! Now you understand. Poison is patience. Take the final technique.',spell:'plague',xp:9000}];
function bqSpawnNpc(){if(BQ.npc||!CH.ok)return;const a=buildBilel();if(!a)return;a.g.position.set(BQ.x,groundAt(BQ.x,BQ.z),BQ.z);a.g.rotation.y=Math.atan2(P.pos.x-BQ.x,P.pos.z-BQ.z);scene.add(a.g);BQ.npc=a;
  const mk=glowSprite(0xf2d27a,1.2,.95);mk.position.y=3.1;a.g.add(mk);BQ.mark=mk;const rn=decal(runeTex,0xf2d27a,3,true,.4);rn.position.y=.07;a.g.add(rn);BQ.rune=rn}
function bilelArrive(){if(BQ.met){bqSpawnNpc();return}const s=findSpot(P.pos.x,P.pos.z,5,8)||P.pos.clone().add(V3(4,0,4));BQ.x=s.x;BQ.z=s.z;bqSpawnNpc();BQ.met=true;BQ.q=0;BQ.cnt=0;
  for(const e of enemies)if(!e.dead&&!e.def.boss)removeEnemy(e);const at=V3(BQ.x,groundAt(BQ.x,BQ.z),BQ.z);faceTo(at);runeFlash(at,0xf2d27a,6,2);SP.emit(V3(at.x,at.y+1.5,at.z),{n:80,c0:0xffffff,c1:0xf2d27a,speed:6,life:1});
  const shot=(side)=>()=>{const d=V3(P.pos.x-at.x,0,P.pos.z-at.z).normalize();const r=V3(d.z,0,-d.x);return{pos:V3(at.x,at.y+2.2,at.z).addScaledVector(d,3.2).addScaledVector(r,side*1.3),look:V3(at.x,at.y+1.9,at.z)}};
  playCutscene([{who:'Master Bilel',text:'Easy, easy. Put the wand down. I am on your side.',cam:shot(1),onStart:()=>{BQ.npc.setBase('Idle_Talking_Loop')}},
    {who:'@',text:'And who are you supposed to be?',cam:witchShot(1,3.4)},
    {who:'Master Bilel',text:'Bilel. Master Bilel. I trained witches in this city before you were born.',cam:shot(-1)},
    {who:'Master Bilel',text:'Fire and ice will not be enough for the Queen of the Abyss. You need something... dirtier.',cam:shot(1)},
    {who:'@',text:'Dirtier how?',cam:witchShot(-1,3.4)},
    {who:'Master Bilel',text:'Stinking poison. The oldest, smelliest, most beautiful magic there is. Three lessons. Then you are ready for her.',cam:shot(-1)}],
    ()=>{BQ.npc.setBase('Idle_FoldArms_Loop');bqGive();writeSave()})}
function bqGive(){const q=BQUESTS[BQ.q];if(!q)return;BQ.cnt=0;toast(q.give,`Master Bilel: ${q.title}`,true);if(typeof voPlay==='function')voPlay('Master Bilel',q.give);bqTrack()}
function bqTrack(){let el=$('bqTrack');if(!el){el=document.createElement('div');el.id='bqTrack';el.style.cssText='position:absolute;left:18px;top:128px;padding:8px 12px;border-radius:10px;background:rgba(14,10,26,.72);color:#f2d27a;font:600 13px Outfit,system-ui,sans-serif;pointer-events:none;box-shadow:inset 0 0 0 1px rgba(242,210,122,.3);max-width:260px';$('hud').appendChild(el)}
  const q=BQUESTS[BQ.q];if(!BQ.active()||!q){el.style.display='none';return}el.style.display='';el.innerHTML=BQ.cnt>=q.goal?`Master Bilel: <span style="color:#fff">go back to him</span>`:`Master Bilel · ${q.title}<br><span style="color:#fff;font-weight:500">${q.what}: ${BQ.cnt} / ${q.goal}</span>`}
function bqKill(e){if(!BQ.active()||BQ.q<0)return;const q=BQUESTS[BQ.q];if(!q||BQ.cnt>=q.goal)return;
  if(BQ.q===0&&e.type==='pig'){BQ.cnt++;bqTrack();if(BQ.cnt>=q.goal)toast('Go back to Master Bilel','Quest complete')}
  else if(BQ.q===1&&e.type==='spider'&&Math.random()<.7){const s=glowSprite(0x7aff4a,1.6,.95);const c=new THREE.Mesh(G.sphereLo,std({color:0x60d030,emissive:0x2a8010,roughness:.3}));c.scale.setScalar(.28);s.add(c);s.position.set(e.pos.x,groundAt(e.pos.x,e.pos.z)+.6,e.pos.z);scene.add(s);BQ.sacs.push(s)}
  else if(BQ.q===2&&e.pois>0){BQ.cnt++;bqTrack();if(BQ.cnt>=q.goal)toast('Go back to Master Bilel','Quest complete')}}
function bqTick(dt){if(MODE==='open')return;if(!BQ.npc&&BQ.met&&!BQ.dead&&beaten.has('slug')&&started)bqSpawnNpc();if(!BQ.npc)return;const a=BQ.npc;a.update(dt);BQ.mark.material.opacity=BQ.active()?.7+Math.sin(time*4)*.3:0;BQ.rune.rotation.z+=dt*.5;
  const dx=P.pos.x-BQ.x,dz=P.pos.z-BQ.z,d=Math.hypot(dx,dz);a.g.rotation.y=lerpAngle(a.g.rotation.y,Math.atan2(dx,dz),Math.min(1,dt*3));if(d<1.4){P.pos.x=BQ.x+dx/d*1.4;P.pos.z=BQ.z+dz/d*1.4}
  for(let i=BQ.sacs.length-1;i>=0;i--){const s=BQ.sacs[i];s.position.y+=Math.sin(time*3+i)*.004;if(Math.hypot(s.position.x-P.pos.x,s.position.z-P.pos.z)<2){scene.remove(s);BQ.sacs.splice(i,1);if(BQ.q===1){BQ.cnt=Math.min(BUESTgoal(1),BQ.cnt+1);bqTrack();sfx.coin&&sfx.coin();if(BQ.cnt>=BQUESTS[1].goal)toast('Go back to Master Bilel','Quest complete')}}}
  BQ.talkCd-=dt;if(d<4&&BQ.talkCd<=0&&!CS.active&&!bossRef){BQ.talkCd=8;bqTalk()}else if(d>7&&BQ.talkCd>2)BQ.talkCd=2}
function BUESTgoal(i){return BQUESTS[i].goal}
function bqTalk(){const a=BQ.npc;const at=V3(BQ.x,groundAt(BQ.x,BQ.z),BQ.z);const shot=(side)=>()=>{const d=V3(P.pos.x-at.x,0,P.pos.z-at.z).normalize();const r=V3(d.z,0,-d.x);return{pos:V3(at.x,at.y+2.2,at.z).addScaledVector(d,3.2).addScaledVector(r,side*1.3),look:V3(at.x,at.y+1.9,at.z)}};
  if(BQ.done){toast(pickR(Math.random,['The Master of Illusions hides in plain sight. Poison does not care about illusions.','Keep your cloud upwind, witch.','I am proud of you. Do not tell anyone.','Level 30? Then your cape should already be red. Or purple. I am not a tailor.']),'Master Bilel');return}
  const q=BQUESTS[BQ.q];if(!q)return;
  if(BQ.cnt<q.goal){toast(`${q.give} (${BQ.cnt}/${q.goal})`,'Master Bilel');return}
  const sp=SPELLS.findIndex(s=>s.id===q.spell);faceTo(at);
  playCutscene([{who:'Master Bilel',text:q.done,cam:shot(1),onStart:()=>a.setBase('Idle_Talking_Loop')},{who:'Master Bilel',text:q.spell==='poison'?'Stinking poison. Throw it, walk away, let the smell do the work.':q.spell==='venom'?'Venom serpent. It goes through them, one after the other. Very rude.':'Plague nova. Everything around you chokes. Use it when they surround you.',cam:shot(-1),
      onStart:()=>{a.fire('Spell_Simple_Shoot',.8);SP.emit(V3(P.pos.x,P.pos.y+1.5,P.pos.z),{n:90,c0:0xe8ffb0,c1:0x3a8010,speed:6,life:1.2});fartSfx()}}],
    ()=>{a.setBase('Idle_FoldArms_Loop');P.taught.add(q.spell);if(!P.bar.includes(sp)){const free=P.bar.findIndex(x=>x==null||x<0);P.bar[free>=0?free:8]=sp;renderBar()}toast(`New technique: ${SPELLS[sp].name}. Hold its key to charge it.`,'Master Bilel',true);gainXP(q.xp);floatText(V3(P.pos.x,P.pos.y+2.4,P.pos.z),`+${q.xp} xp`,'#f2a541');
      BQ.q++;BQ.cnt=0;if(BQ.q>=BQUESTS.length){BQ.done=true;CLEARED.add('bilelq');bqTrack();after(4,()=>toast('Morwen, Queen of the Abyss, has smelled your power. Reach level 37. She is level 43: train until you are ready.','The abyss opens',true))}else after(3.5,bqGive);writeSave()})}
