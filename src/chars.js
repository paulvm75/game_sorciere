/* ================= CHARACTERS v8: rigged humans (Quaternius CC0 bodies + Universal Animation Library) ================= */
const CH={ok:false,src:{},tex:{},sex:{f:null,m:null},clips:{},bake:null,layers:null};
const CH_S=1.35;// model metres -> world units
const BONE_UPPER=['spine_01','spine_02','spine_03','neck_01','Head','clavicle_l','upperarm_l','lowerarm_l','hand_l','clavicle_r','upperarm_r','lowerarm_r','hand_r'];
/* ---------- geometry extraction into true bind space ---------- */
function _deq(a,i,c){const v=c===0?a.getX(i):c===1?a.getY(i):c===2?a.getZ(i):a.getW(i);if(!a.normalized)return v;const A=a.array||a.data.array;if(A instanceof Int16Array)return Math.max(v/32767,-1);if(A instanceof Uint16Array)return v/65535;if(A instanceof Int8Array)return Math.max(v/127,-1);if(A instanceof Uint8Array)return v/255;return v}
function chExtract(mesh,refBones){// -> BufferGeometry with float attrs in bind (rest) space, skinIndex remapped to reference skeleton
  const g=mesh.geometry,a=g.attributes,sk=mesh.skeleton;const n=a.position.count;
  const j0=sk.bones.findIndex(b=>b);const Q=new THREE.Matrix4().multiplyMatrices(sk.bones[j0].matrixWorld,sk.boneInverses[j0]).multiply(mesh.bindMatrix);const NQ=new THREE.Matrix3().getNormalMatrix(Q);
  const map=sk.bones.map(b=>{let k=refBones.findIndex(r=>r.name===b.name);if(k<0){const nm=b.name.replace(/_\d+$/,'');k=refBones.findIndex(r=>r.name===nm)}return k<0?0:k});
  const pos=new Float32Array(n*3),nor=new Float32Array(n*3),uv=new Float32Array(n*2),si=new Float32Array(n*4),sw=new Float32Array(n*4);const v=new THREE.Vector3();
  for(let i=0;i<n;i++){v.set(_deq(a.position,i,0),_deq(a.position,i,1),_deq(a.position,i,2)).applyMatrix4(Q);pos[i*3]=v.x;pos[i*3+1]=v.y;pos[i*3+2]=v.z;
    if(a.normal){v.set(_deq(a.normal,i,0),_deq(a.normal,i,1),_deq(a.normal,i,2)).applyMatrix3(NQ).normalize();nor[i*3]=v.x;nor[i*3+1]=v.y;nor[i*3+2]=v.z}
    if(a.uv){uv[i*2]=_deq(a.uv,i,0);uv[i*2+1]=_deq(a.uv,i,1)}
    let ws=0;for(let c=0;c<4;c++){si[i*4+c]=map[c===0?a.skinIndex.getX(i):c===1?a.skinIndex.getY(i):c===2?a.skinIndex.getZ(i):a.skinIndex.getW(i)];const w=_deq(a.skinWeight,i,c);sw[i*4+c]=w;ws+=w}if(ws>0)for(let c=0;c<4;c++)sw[i*4+c]/=ws}
  const G=new THREE.BufferGeometry();G.setAttribute('position',new THREE.BufferAttribute(pos,3));G.setAttribute('normal',new THREE.BufferAttribute(nor,3));G.setAttribute('uv',new THREE.BufferAttribute(uv,2));G.setAttribute('skinIndex',new THREE.BufferAttribute(si,4));G.setAttribute('skinWeight',new THREE.BufferAttribute(sw,4));
  G.setIndex(g.index?Array.from(g.index.array):null);if(!a.normal)G.computeVertexNormals();G.computeBoundingSphere();return G}
function chFind(gltf,test){let r=null;gltf.scene.traverse(o=>{if(!r&&o.isSkinnedMesh&&test(o))r=o});return r}
/* ---------- regions & garments ---------- */
const REG={root:0,pelvis:1,spine_01:2,spine_02:3,spine_03:3,clavicle_l:4,clavicle_r:4,neck_01:5,Head:6,upperarm_l:7,upperarm_r:7,lowerarm_l:8,lowerarm_r:8,hand_l:9,hand_r:9,thigh_l:10,thigh_r:10,calf_l:11,calf_r:11,foot_l:12,foot_r:12,ball_l:12,ball_r:12,ball_leaf_l:12,ball_leaf_r:12};
function chRegions(G,bones){const si=G.attributes.skinIndex.array,sw=G.attributes.skinWeight.array,n=G.attributes.position.count;const reg=new Uint8Array(n);
  for(let i=0;i<n;i++){let bw=-1,b=0;for(let c=0;c<4;c++)if(sw[i*4+c]>bw){bw=sw[i*4+c];b=si[i*4+c]}const nm=bones[b].name;reg[i]=REG[nm]!==undefined?REG[nm]:(/index|middle|pinky|ring|thumb/.test(nm)?9:0)}return reg}
function chSkel(bones){const P={};for(const b of bones){const p=new THREE.Vector3().setFromMatrixPosition(b.matrixWorld);P[b.name]=p}return P}
function chShell(G,keep,off,extra){// select triangles whose 3 verts pass keep(i); offset along smoothed normals
  const pos=G.attributes.position.array,nor=G.attributes.normal.array,idx=G.index.array,n=G.attributes.position.count;
  const sm=new Float32Array(n*3);const key=i=>Math.round(pos[i*3]*2000)+','+Math.round(pos[i*3+1]*2000)+','+Math.round(pos[i*3+2]*2000);const acc=new Map();
  for(let i=0;i<n;i++){const k=key(i);let a=acc.get(k);if(!a)acc.set(k,a=[0,0,0]);a[0]+=nor[i*3];a[1]+=nor[i*3+1];a[2]+=nor[i*3+2]}
  for(let i=0;i<n;i++){const a=acc.get(key(i));const l=Math.hypot(a[0],a[1],a[2])||1;sm[i*3]=a[0]/l;sm[i*3+1]=a[1]/l;sm[i*3+2]=a[2]/l}
  const ok=new Uint8Array(n);for(let i=0;i<n;i++)ok[i]=keep(i)?1:0;const tri=[];for(let t=0;t<idx.length;t+=3)if(ok[idx[t]]&&ok[idx[t+1]]&&ok[idx[t+2]])tri.push(idx[t],idx[t+1],idx[t+2]);
  const used=new Map();const P=[],N=[],UV=[],SI=[],SW=[],I=[];const uv=G.attributes.uv.array,si=G.attributes.skinIndex.array,sw=G.attributes.skinWeight.array;
  for(const v of tri){let k=used.get(v);if(k===undefined){k=used.size;used.set(v,k);const o=typeof off==='function'?off(v):off;const e=extra?extra(v):0;
      P.push(pos[v*3]+sm[v*3]*(o+e),pos[v*3+1]+sm[v*3+1]*(o+e),pos[v*3+2]+sm[v*3+2]*(o+e));N.push(sm[v*3],sm[v*3+1],sm[v*3+2]);UV.push(uv[v*2],uv[v*2+1]);for(let c=0;c<4;c++){SI.push(si[v*4+c]);SW.push(sw[v*4+c])}}I.push(k)}
  const R=new THREE.BufferGeometry();R.setAttribute('position',new THREE.Float32BufferAttribute(P,3));R.setAttribute('normal',new THREE.Float32BufferAttribute(N,3));R.setAttribute('uv',new THREE.Float32BufferAttribute(UV,2));R.setAttribute('skinIndex',new THREE.Float32BufferAttribute(SI,4));R.setAttribute('skinWeight',new THREE.Float32BufferAttribute(SW,4));R.setIndex(I);R.computeBoundingSphere();return R}
function chTube(bones,SK,G,y0,y1,flare,bias,jag){// skirt/coat tails: ring measured from body at y0, extruded down to y1
  const pos=G.attributes.position.array,n=G.attributes.position.count;const A=24;const rad=new Float32Array(A).fill(.05);let cz=0,cnt=0;
  for(let i=0;i<n;i++){const y=pos[i*3+1];if(Math.abs(y-y0)>.03)continue;const x=pos[i*3],z=pos[i*3+2];if(Math.abs(x)>.3)continue;cz+=z;cnt++}cz=cnt?cz/cnt:0;
  for(let i=0;i<n;i++){const y=pos[i*3+1];if(Math.abs(y-y0)>.03)continue;const x=pos[i*3],z=pos[i*3+2]-cz;if(Math.abs(x)>.3)continue;const a=((Math.atan2(x,z)/TAU+1)%1)*A|0;rad[a]=Math.max(rad[a],Math.hypot(x,z))}
  for(let k=0;k<A;k++)if(rad[k]<.06)rad[k]=Math.max(rad[(k+A-1)%A],rad[(k+1)%A],.1);
  const bi=nm=>bones.findIndex(b=>b.name===nm);const pel=bi('pelvis'),tl=bi('thigh_l'),tr=bi('thigh_r'),cl=bi('calf_l'),cr=bi('calf_r');const rows=7;const P=[],N=[],UV=[],SI=[],SW=[],I=[];
  for(let r=0;r<=rows;r++){const t=r/rows,y=lerp(y0,y1,t);for(let k=0;k<=A;k++){const a=k/A*TAU,kk=k%A;const R=(rad[kk]+.012+bias)*(1+flare*t)+(jag&&r===rows?(k%2?.02:-.01):0);const x=Math.sin(a)*R,z=Math.cos(a)*R+cz;P.push(x,y-(jag&&r===rows&&k%2?.05:0),z);N.push(Math.sin(a),0,Math.cos(a));UV.push(k/A,t);
      const side=Math.sin(a);const lw=clamp(.5+side*.7,0,1);const leg=t*(flare>.6?.5:.75);SI.push(pel,tl,tr,side>0?cl:cr);SW.push(1-leg,leg*lw*(1-t*.2),leg*(1-lw)*(1-t*.2),leg*t*.2)}}
  for(let r=0;r<rows;r++)for(let k=0;k<A;k++){const a=r*(A+1)+k,b=a+1,c=a+A+1,d=c+1;I.push(a,c,b,b,c,d)}
  const R=new THREE.BufferGeometry();R.setAttribute('position',new THREE.Float32BufferAttribute(P,3));R.setAttribute('normal',new THREE.Float32BufferAttribute(N,3));R.setAttribute('uv',new THREE.Float32BufferAttribute(UV,2));R.setAttribute('skinIndex',new THREE.Float32BufferAttribute(SI,4));R.setAttribute('skinWeight',new THREE.Float32BufferAttribute(SW,4));R.setIndex(I);R.computeBoundingSphere();return R}
function chRigid(geo,bones,SK,bone,off,rot,scl){// rigid accessory attached to bone; geo in bone-local rest frame
  const g=geo.clone();if(scl)g.scale(scl,scl,scl);if(rot)g.applyMatrix4(new THREE.Matrix4().makeRotationFromEuler(new THREE.Euler(rot[0],rot[1],rot[2])));const b=bones.findIndex(x=>x.name===bone);const p=SK[bone];g.translate(p.x+(off?off[0]:0),p.y+(off?off[1]:0),p.z+(off?off[2]:0));
  const n=g.attributes.position.count;g.setAttribute('skinIndex',new THREE.Float32BufferAttribute(new Array(n*4).fill(0).map((v,i)=>i%4===0?b:0),4));g.setAttribute('skinWeight',new THREE.Float32BufferAttribute(new Array(n*4).fill(0).map((v,i)=>i%4===0?1:0),4));if(!g.attributes.uv)g.setAttribute('uv',new THREE.Float32BufferAttribute(new Float32Array(n*2),2));
  const ng=g.index?g:g;ng.computeBoundingSphere();return ng}
function chToBind(scene,mesh){// put the skeleton into its true bind pose (the glTF node pose is not the bind pose)
  scene.updateMatrixWorld(true);const sk=mesh.skeleton,B=sk.bones;const ri=new THREE.Matrix4().copy(scene.matrixWorld).invert();
  const Brel=B.map((b,i)=>new THREE.Matrix4().multiplyMatrices(mesh.bindMatrix,sk.boneInverses[i].clone().invert()));
  const loc=new THREE.Matrix4(),pw=new THREE.Matrix4();
  B.forEach((b,i)=>{const pi=B.indexOf(b.parent);if(pi>=0)pw.copy(Brel[pi]);else pw.multiplyMatrices(ri,b.parent.matrixWorld);loc.copy(pw).invert().multiply(Brel[i]);loc.decompose(b.position,b.quaternion,b.scale)});
  scene.updateMatrixWorld(true)}
function chBuildSex(sx){const src=CH.src;const body=src['body_'+sx];body.scene.updateMatrixWorld(true);const bodyM=chFind(body,o=>o.name==='Body');const bones=bodyM.skeleton.bones;const SK=chSkel(bones);
  const S={sx,bones,SK,geo:{}};const G=S.geo;
  G.body=chExtract(bodyM,bones);G.bodyLOD=chExtract(chFind(body,o=>o.name==='BodyLOD'),bones);
  const eyes=chFind(body,o=>o.material&&/Eye/.test(o.material.name));const brows=chFind(body,o=>o.material&&/Hair/.test(o.material.name));if(eyes)G.eyes=chExtract(eyes,bones);if(brows)G.brows=chExtract(brows,bones);
  const H=(k,f)=>{const g=src[f];if(!g)return;g.scene.updateMatrixWorld(true);const m=chFind(g,()=>true);if(m)G[k]=chExtract(m,bones)};
  H('hairLong','hair_long');H('hairBuns','hair_buns');H('hairBuzz',sx==='f'?'hair_buzzedfemale':'hair_buzzed');H('hairPart','hair_simpleparted');H('beard','hair_beard');H('hood','hood_'+sx);
  // regions and landmarks
  const shoulderY=SK.upperarm_l.y,armX0=SK.upperarm_l.x,elbowX=SK.lowerarm_l.x,wristX=SK.hand_l.x,hipY=SK.pelvis.y,kneeY=SK.calf_l.y,ankleY=SK.foot_l.y,neckY=SK.neck_01.y;
  for(const lod of['','LOD']){const B=G['body'+lod];const reg=chRegions(B,bones);const pos=B.attributes.position.array;const X=i=>Math.abs(pos[i*3]),Y=i=>pos[i*3+1],Z=i=>pos[i*3+2];
    const torso=i=>{const r=reg[i];return(r>=1&&r<=4)||(r===5&&Y(i)<neckY+.005)||(r===0)};const upper=i=>torso(i)&&Y(i)>hipY-.07;
    const arm=(i,t)=>{const r=reg[i];if(r!==7&&r!==8&&r!==4)return false;const u=(X(i)-armX0)/(wristX-armX0);return u<t};
    G['tee'+lod]=chShell(B,i=>(upper(i)&&!(reg[i]===1&&Y(i)<hipY-.02))||arm(i,.42),.0065);
    G['long'+lod]=chShell(B,i=>(upper(i)&&!(reg[i]===1&&Y(i)<hipY-.02))||arm(i,.985),.0075);
    G['jacket'+lod]=chShell(B,i=>(torso(i)&&Y(i)>hipY-.15&&!(reg[i]===5))||arm(i,.975),.019,i=>reg[i]===3||reg[i]===2?.006:0);
    const leg=i=>{const r=reg[i];return r===1||r===10||r===11||r===0};
    G['trousers'+lod]=chShell(B,i=>leg(i)&&Y(i)<hipY+.1&&Y(i)>ankleY+.035,.0085,i=>reg[i]===11?.004+(kneeY-Y(i))*.02:0);
    G['shorts'+lod]=chShell(B,i=>(leg(i))&&Y(i)<hipY+.1&&Y(i)>kneeY+.11,.009);
    G['shoes'+lod]=chShell(B,i=>reg[i]===12||(reg[i]===11&&Y(i)<ankleY+.05),.011,i=>Y(i)<.02?.004:0);
    G['crop'+lod]=chShell(B,i=>reg[i]===6&&(Y(i)>SK.Head.y+.075||(Z(i)<SK.Head.z-.03&&Y(i)>SK.Head.y-.04)),.006)}
  G.skirt=chTube(bones,SK,G.body,hipY+.03,kneeY+.06,.35,.004,false);G.coat=chTube(bones,SK,G.body,hipY-.1,kneeY-.08,.28,.03,false);G.dress=chTube(bones,SK,G.body,hipY+.05,kneeY-.02,.45,.006,false);G.witch=chTube(bones,SK,G.body,hipY+.04,ankleY+.02,.9,.01,true);
  // rigid accessories
  const hy=SK.Head;const eyeC=G.eyes?(()=>{G.eyes.computeBoundingBox();const c=new THREE.Vector3();G.eyes.boundingBox.getCenter(c);return c})():new THREE.Vector3(0,hy.y+.06,hy.z+.08);
  const HR=.105;// head radius
  const rel=(bone,v)=>[v.x-SK[bone].x,v.y-SK[bone].y,v.z-SK[bone].z];
  const hat=(g,dy,dz,s)=>chRigid(g,bones,SK,'Head',[0,dy,dz],null,s);
  const L=(pts,seg=16)=>new THREE.LatheGeometry(pts.map(p=>new THREE.Vector2(p[0],p[1])),seg);
  G.hat0=hat(mergeG([L([[.001,0],[.17,0],[.172,.012],[.12,.018],[.1,.02],[.1,.1],[.07,.13],[.001,.125]],18)]),.09,-.01);// fedora
  G.hat1=hat((()=>{const g=new THREE.SphereGeometry(.13,16,8,0,TAU,0,Math.PI*.5);g.scale(1.05,.35,1.05);return g})(),.1,-.01);// beret
  G.hat2=hat(mergeG([(()=>{const g=new THREE.SphereGeometry(.112,16,8,0,TAU,0,Math.PI*.5);g.scale(1,.8,1.05);return g})(),(()=>{const g=new THREE.CylinderGeometry(.11,.11,.01,16,1,false,-.9,1.8);g.scale(1,1,1.3);g.translate(0,.005,.06);return g})()]),.075,0);// cap
  G.hat3=hat((()=>{const g=new THREE.SphereGeometry(.118,16,10,0,TAU,0,Math.PI*.56);g.scale(1,1.05,1.06);return g})(),.06,-.01);// beanie
  G.hat4=hat(mergeG([new THREE.CylinderGeometry(.105,.11,.1,16),(()=>{const g=new THREE.CylinderGeometry(.1,.1,.01,16,1,false,-.9,1.8);g.scale(1,1,1.3);g.translate(0,-.045,.05);return g})()]),.12,0);// kepi
  G.hat6=hat(L([[.001,0],[.16,-.02],[.16,-.01],[.1,.01],[.095,.08],[.001,.09]],18),.09,-.01);// sun hat
  G.hat7=hat(new THREE.TorusGeometry(.105,.012,6,20).rotateX(Math.PI/2),.08,-.005);// headband
  G.ears=hat(mergeG([new THREE.ConeGeometry(.035,.07,4).translate(.06,.1,0),new THREE.ConeGeometry(.035,.07,4).translate(-.06,.1,0)]),.12,-.03);
  const gl=mergeG([new THREE.TorusGeometry(.024,.004,4,12).translate(.033,0,0),new THREE.TorusGeometry(.024,.004,4,12).translate(-.033,0,0),new THREE.BoxGeometry(.02,.004,.004),new THREE.BoxGeometry(.004,.004,.09).translate(.058,0,-.045),new THREE.BoxGeometry(.004,.004,.09).translate(-.058,0,-.045)]);
  G.glasses=chRigid(gl,bones,SK,'Head',rel('Head',eyeC.clone().add(new THREE.Vector3(0,.004,.028))));
  G.shades=chRigid(mergeG([new THREE.CircleGeometry(.024,12).translate(.033,0,.001),new THREE.CircleGeometry(.024,12).translate(-.033,0,.001)]),bones,SK,'Head',rel('Head',eyeC.clone().add(new THREE.Vector3(0,.004,.029))));
  G.scarf=chRigid(new THREE.TorusGeometry(.075,.03,8,18).rotateX(Math.PI/2).scale(1.05,1,1.15),bones,SK,'neck_01',[0,-.02,.012]);
  G.pearls=chRigid(new THREE.TorusGeometry(.07,.007,4,20).rotateX(Math.PI/2+.5),bones,SK,'neck_01',[0,-.03,.03]);
  G.backpack=chRigid(new THREE.BoxGeometry(.3,.38,.14),bones,SK,'spine_02',[0,.05,-.19]);
  G.bag=chRigid(new THREE.BoxGeometry(.07,.2,.26),bones,SK,'pelvis',[.2,-.02,0]);
  G.tote=chRigid(new THREE.BoxGeometry(.05,.34,.3),bones,SK,'pelvis',[-.21,-.06,0]);
  G.accordion=chRigid(new THREE.BoxGeometry(.36,.3,.2),bones,SK,'spine_02',[0,.02,.2]);
  const hr=(g,off)=>chRigid(g,bones,SK,'hand_r',off);
  const sgn=sx==='f'?1:1;
  G.phone=hr(new THREE.BoxGeometry(.03,.14,.072),[-.09,-.01,.02]);G.camera=hr(new THREE.BoxGeometry(.12,.08,.07),[-.1,-.01,.04]);G.cup=hr(new THREE.CylinderGeometry(.035,.03,.1,10),[-.1,0,.04]);
  G.baguette=hr(new THREE.CylinderGeometry(.03,.03,.6,8).rotateZ(Math.PI/2).rotateY(.4),[-.1,-.02,.04]);G.cane=hr(new THREE.CylinderGeometry(.012,.012,.9,6),[-.1,-.4,.02]);
  G.flowers=hr(mergeG([new THREE.ConeGeometry(.08,.2,8).rotateX(Math.PI).translate(0,.1,0),new THREE.SphereGeometry(.07,8,6).translate(0,.24,0)]),[-.1,0,.04]);G.keys=hr(new THREE.TorusGeometry(.03,.006,4,10),[-.1,-.03,.02]);G.brush=hr(new THREE.CylinderGeometry(.006,.006,.25,5).rotateZ(1.2),[-.12,0,.03]);
  G.canvas=chRigid(new THREE.BoxGeometry(.5,.4,.02),bones,SK,'hand_l',[.1,.12,.15]);
  G.wandProp=hr(new THREE.CylinderGeometry(.008,.012,.36,6).rotateZ(Math.PI/2),[-.24,0,.02]);
  G.ice=chRigid(new THREE.BoxGeometry(.8,2.0,.7),bones,SK,'root',[0,.95,0]);
  S.upper=new Float32Array(65);bones.forEach((b,i)=>{if(BONE_UPPER.includes(b.name)||/index|middle|pinky|ring|thumb/.test(b.name))S.upper[i]=1});
  return S}
function mergeG(list){const gs=list.map(g=>{g=g.index?g.toNonIndexed():g;if(!g.attributes.uv)g.setAttribute('uv',new THREE.Float32BufferAttribute(new Float32Array(g.attributes.position.count*2),2));return g});let n=0;for(const g of gs)n+=g.attributes.position.count;const P=new Float32Array(n*3),N=new Float32Array(n*3),UV=new Float32Array(n*2);let o=0;
  for(const g of gs){P.set(g.attributes.position.array,o*3);N.set(g.attributes.normal.array,o*3);UV.set(g.attributes.uv.array,o*2);o+=g.attributes.position.count}const R=new THREE.BufferGeometry();R.setAttribute('position',new THREE.BufferAttribute(P,3));R.setAttribute('normal',new THREE.BufferAttribute(N,3));R.setAttribute('uv',new THREE.BufferAttribute(UV,2));return R}
/* ---------- animation baking (GPU crowd) ---------- */
const CLIPS_CROWD=['Idle_Loop','Idle_Talking_Loop','Walk_Loop','Walk_Formal_Loop','Jog_Fwd_Loop','Sprint_Loop','Crouch_Idle_Loop','Dance_Loop','Death01','Hit_Chest','Interact','PickUp_Table','Punch_Cross','Punch_Jab','Sitting_Idle_Loop','Sitting_Talking_Loop','Swim_Fwd_Loop','Swim_Idle_Loop','Idle_Torch_Loop','Pistol_Aim_Neutral','Push_Loop','Idle_FoldArms_Loop','Idle_TalkingPhone_Loop','Idle_No_Loop','Yes','Consume','Farm_Watering','Hit_Knockback','LayToIdle','Walk_Carry_Loop','Zombie_Walk_Fwd_Loop','Zombie_Idle_Loop','OverhandThrow','Idle_Rail_Call','Idle_Rail_Loop','Idle_Lantern_Loop','Jump_Loop','Spell_Simple_Shoot','Roll','Fixing_Kneeling','Driving_Loop'];
function chBake(){const FPS=30;const rows=[];const table={f:{},m:{}};let total=0;
  for(const sx of['f','m']){const src=CH.src['body_'+sx];const root=src.scene;root.updateMatrixWorld(true);const bones=CH.sex[sx].bones;const rootInv=new THREE.Matrix4().copy(root.matrixWorld).invert();
    const ibm=bones.map(b=>new THREE.Matrix4().multiplyMatrices(rootInv,b.matrixWorld).invert());const rest=bones.map(b=>({p:b.position.clone(),q:b.quaternion.clone(),s:b.scale.clone()}));
    const mixer=new THREE.AnimationMixer(root);const M=new THREE.Matrix4();
    for(const name of CLIPS_CROWD){const clip=CH.clips[name];if(!clip)continue;bones.forEach((b,i)=>{b.position.copy(rest[i].p);b.quaternion.copy(rest[i].q);b.scale.copy(rest[i].s)});
      const act=mixer.clipAction(clip);act.reset().play();act.setLoop(THREE.LoopOnce);act.clampWhenFinished=true;const n=Math.max(2,Math.round(clip.duration*FPS)+1);table[sx][name]={row:total,n,dur:clip.duration,loop:/_Loop$/.test(name)};
      for(let f=0;f<n;f++){mixer.setTime(Math.min(clip.duration-1e-4,f/FPS));root.updateMatrixWorld(true);const r=new Float32Array(65*12);
        bones.forEach((b,i)=>{M.multiplyMatrices(rootInv,b.matrixWorld).multiply(ibm[i]);const e=M.elements;r.set([e[0],e[4],e[8],e[12],e[1],e[5],e[9],e[13],e[2],e[6],e[10],e[14]],i*12)});rows.push(r);total++}
      act.stop();mixer.uncacheAction(clip)}
    bones.forEach((b,i)=>{b.position.copy(rest[i].p);b.quaternion.copy(rest[i].q);b.scale.copy(rest[i].s)});root.updateMatrixWorld(true)}
  const W=65*3,Hh=total;const data=new Float32Array(W*Hh*4);rows.forEach((r,y)=>data.set(r,y*W*4));
  const tex=new THREE.DataTexture(data,W,Hh,THREE.RGBAFormat,THREE.FloatType);tex.minFilter=tex.magFilter=THREE.NearestFilter;tex.needsUpdate=true;tex.generateMipmaps=false;
  CH.bake={tex,W,H:Hh,table}}
/* ---------- crowd materials ---------- */
const CH_VS_PARS=`attribute vec4 skinIndex;attribute vec4 skinWeight;attribute vec4 iA;attribute vec4 iB;attribute vec3 iCol;attribute vec3 iCol2;
uniform sampler2D boneTex;uniform vec2 boneTexSize;uniform float uUpper[65];varying vec3 vRest;varying vec3 vC1;varying vec3 vC2;varying float vPat;varying vec2 vUv2;
mat4 bmat(float row,float bone){float x=bone*3.;float v=(row+.5)/boneTexSize.y;vec4 r0=texture2D(boneTex,vec2((x+.5)/boneTexSize.x,v));vec4 r1=texture2D(boneTex,vec2((x+1.5)/boneTexSize.x,v));vec4 r2=texture2D(boneTex,vec2((x+2.5)/boneTexSize.x,v));
return mat4(r0.x,r1.x,r2.x,0.,r0.y,r1.y,r2.y,0.,r0.z,r1.z,r2.z,0.,r0.w,r1.w,r2.w,1.);}
mat4 skm(float bone){mat4 a=bmat(iA.x,bone);if(iA.z>.001)a=a*(1.-iA.z)+bmat(iA.y,bone)*iA.z;float uw=iB.x*uUpper[int(bone+.5)];if(uw>.001)a=a*(1.-uw)+bmat(iA.w,bone)*uw;return a;}
mat4 skinAll(){mat4 m=skm(skinIndex.x)*skinWeight.x;if(skinWeight.y>.001)m+=skm(skinIndex.y)*skinWeight.y;if(skinWeight.z>.001)m+=skm(skinIndex.z)*skinWeight.z;if(skinWeight.w>.001)m+=skm(skinIndex.w)*skinWeight.w;return m;}`;
function chPatch(sh,sx,kind){sh.uniforms.boneTex={value:CH.bake.tex};sh.uniforms.boneTexSize={value:new THREE.Vector2(CH.bake.W,CH.bake.H)};sh.uniforms.uUpper={value:Array.from(CH.sex[sx].upper)};
  sh.vertexShader=sh.vertexShader.replace('#include <common>','#include <common>\n'+CH_VS_PARS)
    .replace('#include <skinbase_vertex>','mat4 SKM=skinAll();vRest=position;vC1=iCol;vC2=iCol2;vPat=iB.y;vUv2=uv;')
    .replace('#include <skinnormal_vertex>','objectNormal=normalize((SKM*vec4(objectNormal,0.)).xyz);')
    .replace('#include <skinning_vertex>','transformed=(SKM*vec4(transformed,1.)).xyz;');
  if(kind!=='depth'&&kind!=='none'){sh.fragmentShader=sh.fragmentShader.replace('#include <common>',`#include <common>
varying vec3 vRest;varying vec3 vC1;varying vec3 vC2;varying float vPat;varying vec2 vUv2;
float hsh(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
vec3 fabric(){vec3 r=vRest;float p=floor(vPat+.5);vec3 c=vC1;
if(p==1.){c=mix(vC1,vC2,step(.93,fract(r.x*28.)));}
else if(p==2.){c=mix(vC1,vC2,step(.5,fract(r.y*22.)));}
else if(p==3.){float a=step(.5,fract(r.x*9.+r.z*9.)),b=step(.5,fract(r.y*9.));c=mix(vC1,vC2,.35*a+.35*b);}
else if(p==4.){float n=hsh(floor(vec2(r.x*300.+r.z*300.,r.y*300.)));c=vC1*(.82+.3*n)*(.92+.1*sin((r.y+r.x)*900.));}
else if(p==5.){c=vC1*(.84+.18*abs(sin(r.x*260.+r.z*260.)));}
else if(p==6.){vec2 q=fract(vec2(r.x*30.+r.z*30.,r.y*30.))-.5;c=mix(vC2,vC1,step(.18,length(q)));}
else if(p==7.){c=vC1;}
return c;}`);
    if(kind==='fabric')sh.fragmentShader=sh.fragmentShader.replace('#include <color_fragment>','#include <color_fragment>\ndiffuseColor.rgb*=fabric();')
      .replace('#include <roughnessmap_fragment>','#include <roughnessmap_fragment>\nif(floor(vPat+.5)==7.)roughnessFactor=.35;');
    else if(kind==='skin')sh.fragmentShader=sh.fragmentShader.replace('#include <map_fragment>','vec4 texelColor=texture2D(map,vUv);texelColor=mapTexelToLinear(texelColor);float lum=dot(texelColor.rgb,vec3(.3,.55,.15));vec3 tone=vC1*lum*2.4;float mx=max(max(texelColor.r,texelColor.g),texelColor.b),mn=min(min(texelColor.r,texelColor.g),texelColor.b);float under=step(mx-mn,.05)*step(lum,.25);diffuseColor.rgb*=mix(tone,texelColor.rgb,under);');
    else if(kind==='tint')sh.fragmentShader=sh.fragmentShader.replace('#include <map_fragment>','vec4 texelColor=texture2D(map,vUv);texelColor=mapTexelToLinear(texelColor);diffuseColor.rgb*=texelColor.rgb*vC1;');
    else if(kind==='flat')sh.fragmentShader=sh.fragmentShader.replace('#include <color_fragment>','#include <color_fragment>\ndiffuseColor.rgb*=vC1;')}}
function chMat(sx,kind,opts){const m=new THREE.MeshStandardMaterial(Object.assign({roughness:.8},opts||{}));m.onBeforeCompile=sh=>chPatch(sh,sx,kind);m.customProgramCacheKey=()=>'ch_'+sx+'_'+kind;return m}
function chDepthMat(sx){const m=new THREE.MeshDepthMaterial({depthPacking:THREE.RGBADepthPacking});m.onBeforeCompile=sh=>chPatch(sh,sx,'depth');m.customProgramCacheKey=()=>'chd_'+sx;return m}
/* ---------- crowd layers (immediate-mode instancing) ---------- */
const CH_MAX=320;
function chLayer(geo,mat,sx,shadow){const im=new THREE.InstancedMesh(geo,mat,CH_MAX);const n=CH_MAX;
  const A=new THREE.InstancedBufferAttribute(new Float32Array(n*4),4),Bb=new THREE.InstancedBufferAttribute(new Float32Array(n*4),4),C1=new THREE.InstancedBufferAttribute(new Float32Array(n*3),3),C2=new THREE.InstancedBufferAttribute(new Float32Array(n*3),3);
  for(const a of[A,Bb,C1,C2])a.setUsage(THREE.DynamicDrawUsage);geo.setAttribute('iA',A);geo.setAttribute('iB',Bb);geo.setAttribute('iCol',C1);geo.setAttribute('iCol2',C2);
  im.instanceMatrix.setUsage(THREE.DynamicDrawUsage);im.frustumCulled=false;im.count=0;im.castShadow=!!shadow;im.receiveShadow=true;if(shadow)im.customDepthMaterial=chDepthMat(sx);im.userData={n:0,A,B:Bb,C1,C2};scene.add(im);return im}
function chInitCrowd(){const T=CH.tex;CH.layers={};
  for(const sx of['f','m']){const S=CH.sex[sx],G=S.geo,Lr={};CH.layers[sx]=Lr;
    const skin=chMat(sx,'skin',{map:T['skin_'+sx],normalMap:T['skin_'+sx+'_n'],roughnessMap:T['skin_'+sx+'_r'],roughness:.75});
    const fab=chMat(sx,'fabric',{roughness:.88});const fabS=chMat(sx,'fabric',{roughness:.88,side:THREE.DoubleSide});
    const hair1=chMat(sx,'tint',{map:T.hair1,normalMap:T.hair1_n,roughness:.55,side:THREE.DoubleSide}),hair2=chMat(sx,'tint',{map:T.hair2,normalMap:T.hair2_n,roughness:.55,side:THREE.DoubleSide});
    const eye=chMat(sx,'tint',{map:T.eye,roughness:.2}),flat=chMat(sx,'flat',{roughness:.5}),flatS=chMat(sx,'flat',{roughness:.5,side:THREE.DoubleSide}),glass=chMat(sx,'flat',{roughness:.05,metalness:.6});
    const hood=chMat(sx,'tint',{map:T.ranger,normalMap:T.ranger_n,roughness:.8,side:THREE.DoubleSide});
    const ice=new THREE.MeshStandardMaterial({color:0xbfefff,roughness:.05,metalness:.1,transparent:true,opacity:.55,depthWrite:false});ice.onBeforeCompile=sh=>chPatch(sh,sx,'none');ice.customProgramCacheKey=()=>'chice'+sx;
    const add=(k,geo,mat,sh)=>{if(geo)Lr[k]=chLayer(geo,mat,sx,sh)};
    add('body',G.body,skin,true);add('bodyLOD',G.bodyLOD,skin,false);add('eyes',G.eyes,eye);add('brows',G.brows,hair2);
    for(const k of['tee','long','jacket','trousers','shorts','shoes'])for(const l of['','LOD'])add(k+l,G[k+l],fab,l==='');
    add('crop',G.crop,fab);add('cropLOD',G.cropLOD,fab);
    add('skirt',G.skirt,fabS,true);add('coat',G.coat,fabS,true);add('dress',G.dress,fabS,true);
    add('hairLong',G.hairLong,hair2,true);add('hairBuns',G.hairBuns,hair2,true);add('hairBuzz',G.hairBuzz,hair1);add('hairPart',G.hairPart,hair1,true);add('beard',G.beard,hair1);add('hood',G.hood,hood,true);
    for(const k of['hat0','hat1','hat2','hat3','hat4','hat6','hat7','ears'])add(k,G[k],fab,true);
    add('glasses',G.glasses,glass);add('shades',G.shades,glass);add('scarf',G.scarf,fab);add('pearls',G.pearls,flat);add('backpack',G.backpack,fab,true);add('bag',G.bag,fab);add('tote',G.tote,fab);add('accordion',G.accordion,flat);
    for(const k of['phone','camera','cup','baguette','cane','flowers','keys','brush','canvas','wandProp'])add(k,G[k],flat);
    add('ice',G.ice,ice)}
  CH.crowdOK=true}
const _chM=new THREE.Matrix4(),_chQ=new THREE.Quaternion(),_chP=new THREE.Vector3(),_chS=new THREE.Vector3(),_chE=new THREE.Euler(0,0,0,'YXZ');let _chA=[0,0,0,0],_chB=[0,0,0,0];
function chPut(im,c1,c2,pat){if(!im)return;const u=im.userData,k=u.n;if(k>=CH_MAX)return;u.n=k+1;im.setMatrixAt(k,_chM);u.A.array.set(_chA,k*4);_chB[1]=pat||0;u.B.array.set(_chB,k*4);
  const a=u.C1.array;a[k*3]=c1.r;a[k*3+1]=c1.g;a[k*3+2]=c1.b;const b=u.C2.array,d=c2||c1;b[k*3]=d.r;b[k*3+1]=d.g;b[k*3+2]=d.b}
function chFlush(){if(!CH.layers)return;for(const sx in CH.layers)for(const k in CH.layers[sx]){const im=CH.layers[sx][k],u=im.userData;im.count=u.n;im.visible=u.n>0;if(u.n){im.instanceMatrix.needsUpdate=true;u.A.needsUpdate=true;u.B.needsUpdate=true;u.C1.needsUpdate=true;u.C2.needsUpdate=true}u.n=0}}
/* ---------- per-person animation state ---------- */
function chRow(sx,name,t){const c=CH.bake.table[sx][name]||CH.bake.table[sx].Idle_Loop;let f;if(c.loop){f=((t/c.dur)%1+1)%1*(c.n-1)}else f=Math.min(c.n-1,t/c.dur*(c.n-1));return c.row+Math.round(f)}
function chAnimFor(n){const L=n.L,a=n.anim;let full='Idle_Loop',up=null,rate=1;
  if(a==='walk'){full=(n.arch==='posh'||n.arch==='business'||n.arch==='police')?'Walk_Formal_Loop':'Walk_Loop';rate=n.spd/1.9;
    if(L.prop==='phone'&&(L.idle===3))up='Idle_TalkingPhone_Loop';else if(L.prop==='phone'&&L.idle===5)up='Idle_Torch_Loop';else if(L.prop==='cup'||L.prop==='camera'||L.accordion)up='Walk_Carry_Loop';}
  else if(a==='run'){full=n.arch==='jogger'?'Jog_Fwd_Loop':'Sprint_Loop';rate=n.arch==='jogger'?1:1.05}
  else if(a==='flee'){full='Sprint_Loop';rate=1.1;if(n.flail)up='Zombie_Walk_Fwd_Loop'}
  else if(a==='burn'){full='Sprint_Loop';up='Hit_Knockback';rate=1.2}
  else if(a==='idle'||a==='static'){const id=L.idle;full='Idle_Loop';if(n.idleA==='photo')full='Pistol_Aim_Neutral';else if(L.accordion)full='Idle_Lantern_Loop';else if(id===6||L.prop2==='canvas')full='Farm_Watering';else if(id===1)full='Idle_FoldArms_Loop';else if(id===3&&L.prop==='phone')full='Idle_TalkingPhone_Loop';else if(id===5||L.prop==='phone')full='Idle_Torch_Loop';else if(id===2)full=n.seed%3?'Idle_Talking_Loop':'Idle_Lantern_Loop';
    if(n.special&&n.special.anim==='talk')full='Idle_Talking_Loop'}
  else if(a==='talk')full='Idle_Talking_Loop';
  else if(a==='sit')full=n.talking?'Sitting_Talking_Loop':'Sitting_Idle_Loop';
  else if(a==='thumbs'||a==='nod')full='Yes';else if(a==='point'||a==='wave')full='Idle_Rail_Call';else if(a==='clap')full='Consume';else if(a==='selfie')full='Idle_Torch_Loop';
  else if(a==='laugh')full='Idle_Talking_Loop';else if(a==='shrug')full='Idle_No_Loop';else if(a==='cower')full='Crouch_Idle_Loop';else if(a==='down'||a==='dead')full='Death01';else if(a==='bound')full='Zombie_Idle_Loop';
  else if(a==='dance')full='Dance_Loop';else if(a==='taunt')full=n.seed%2?'Idle_No_Loop':'Dance_Loop';else if(a==='punch')full=n.seed%2?'Punch_Jab':'Punch_Cross';else if(a==='reach')full='PickUp_Table';
  else if(a==='swim')full=n.mv>.1?'Swim_Fwd_Loop':'Swim_Idle_Loop';else if(a==='throw')full='OverhandThrow';else if(a==='kneel')full='Fixing_Kneeling';else if(a==='hit')full='Hit_Chest';else if(a==='push')full='Push_Loop';else if(a==='eat')full='Consume';else if(a==='roll')full='Roll';else if(a==='jump')full='Jump_Loop';else if(a==='cast')full='Spell_Simple_Shoot';else if(a==='getup')full='LayToIdle';else if(a==='drive')full='Driving_Loop';else if(a==='zombie')full='Zombie_Walk_Fwd_Loop';else if(a==='no')full='Idle_No_Loop';else if(a==='interact')full='Interact';
  if(n.clipOverride){full=n.clipOverride;up=null}
  return[full,up,rate]}
function chStep(n,dt){let s=n.cs;if(!s){s=n.cs={full:null,t:Math.random()*5,prev:null,pt:0,fade:0,up:null,ut:0,uw:0}}
  const[full,up,rate]=chAnimFor(n);const frozen=n.st==='frozen'||n.frozen>0;const k=frozen?0:dt;
  if(full!==s.full){s.prev=s.full;s.pt=s.t;s.full=full;s.t=0;s.fade=s.prev?1:0;if(s.prev&&/_Loop$/.test(full)&&/_Loop$/.test(s.prev)&&(full.startsWith('Walk')||full.startsWith('Sprint')||full.startsWith('Jog'))&&(s.prev.startsWith('Walk')||s.prev.startsWith('Sprint')||s.prev.startsWith('Jog'))){const pc=CH.bake.table.f[s.prev],nc=CH.bake.table.f[full];if(pc&&nc)s.t=(s.pt/pc.dur%1)*nc.dur}}
  s.t+=k*(rate||1);if(s.prev){s.pt+=k;s.fade=Math.max(0,s.fade-k*4.5);if(s.fade<=0)s.prev=null}
  if(up){if(s.up!==up){s.up=up;s.ut=0}s.ut+=k;s.uw=Math.min(1,s.uw+k*4)}else{s.uw=Math.max(0,s.uw-k*4);if(s.uw<=0)s.up=null}}
const _cc1=new THREE.Color(),_cc2=new THREE.Color(),_ccW=new THREE.Color(1,1,1),_ccK=new THREE.Color(.1,.1,.1);
function chDraw(n){if(!CH.crowdOK)return false;const L=n.L,sx=L.f?'f':'m',Lr=CH.layers[sx],s=n.cs;if(!s||!s.full)return false;
  const near=n.dist<34||n.special;const lod=near?'':'LOD';
  const S=CH_S*L.h*(L.f?1.04:.98),wid=clamp(.92+(L.w-1.06)*.8,.9,1.12);const lie=0;
  _chP.set(n.x,n.y+(n.st==='sit'?-.28:0)+(n.jumpY||0),n.z);_chE.set(0,n.face,0,'YXZ');_chQ.setFromEuler(_chE);_chS.set(S*wid,S,S*wid);_chM.compose(_chP,_chQ,_chS);
  _chA[0]=chRow(sx,s.full,s.t);_chA[1]=s.prev?chRow(sx,s.prev,s.pt):_chA[0];_chA[2]=s.prev?s.fade:0;_chA[3]=s.up?chRow(sx,s.up,s.ut):_chA[0];_chB[0]=s.up?s.uw:0;
  const dim=n.burnt||0;const col=c=>dim?_cc1.copy(c).lerp(_ccK,dim):c;
  chPut(Lr['body'+lod],col(L.skin));if(near){chPut(Lr.eyes,_ccW);chPut(Lr.brows,col(L.hairC))}
  // clothing
  const topK=(L.arch==='tourist'||L.arch==='jogger'||L.legs==='dress'||(L.arch==='student'&&n.seed%3===0))&&!L.jk&&!L.coat?'tee':'long';
  if(!(L.legs==='dress'&&!L.jk&&!L.coat))chPut(Lr[topK+lod],col(L.top),chC2(L,'top'),L.topP);else chPut(Lr['tee'+lod],col(L.dressC||L.top),chC2(L,'top'),L.topP);
  if(L.jk||L.coat)chPut(Lr['jacket'+lod],col(L.coat||L.jk),chC2(L,'jk'),L.coat?L.coatP:L.jkP);if(L.coat)chPut(Lr.coat,col(L.coat),null,L.coatP);
  if(L.legs==='pants')chPut(Lr['trousers'+lod],col(L.bot),chC2(L,'bot'),L.botP);else if(L.legs==='shorts')chPut(Lr['shorts'+lod],col(L.bot),chC2(L,'bot'),L.botP);
  else if(L.legs==='skirt'){chPut(Lr.skirt,col(L.bot),chC2(L,'bot'),L.botP);if(L.legC)chPut(Lr['trousers'+lod],col(L.legC),null,0)}else if(L.legs==='dress'){chPut(Lr.dress,col(L.dressC||L.top),chC2(L,'top'),L.topP);if(L.legC)chPut(Lr['trousers'+lod],col(L.legC),null,0)}
  chPut(Lr['shoes'+lod],col(L.shoe),null,7);
  // hair & head
  const hk=_hairK(L,n);if(hk)chPut(Lr[hk==='crop'?'crop'+lod:hk],col(L.hairC),null,hk==='crop'?5:0);if(L.beard||L.mus)chPut(Lr.beard,col(L.hairC));
  if(L.hat>=0&&L.hat!==5&&Lr['hat'+L.hat])chPut(Lr['hat'+L.hat],col(L.hatC),null,L.hatP);if(L.hat===5||L.mask){chPut(Lr.hood,_cc2.setRGB(.16,.15,.17));chPut(Lr.ears,_ccK,null,0)}
  if(near){if(L.shades)chPut(Lr.shades,_ccK);if(L.glasses||L.shades)chPut(Lr.glasses,_cc2.setRGB(.05,.05,.06));if(L.scarf)chPut(Lr.scarf,col(L.scarf),chC2(L,'scarf'),L.scarfP||5);if(L.pearls)chPut(Lr.pearls,_cc2.setRGB(.95,.93,.88));
    if(L.backpack)chPut(Lr.backpack,col(L.backpack));if(L.bag)chPut(Lr.bag,col(L.bag),null,7);if(L.tote)chPut(Lr.tote,col(L.tote));if(L.accordion)chPut(Lr.accordion,_cc2.setRGB(.55,.08,.1));
    if(L.prop&&!n.noProp&&Lr[L.prop])chPut(Lr[L.prop],col(L.propC));if(L.prop2&&Lr[L.prop2])chPut(Lr[L.prop2],_cc2.setRGB(.92,.88,.8));if(n.noProp&&OWS.wandThief===n)chPut(Lr.wandProp,_cc2.setRGB(.16,.1,.08))}
  if(n.frozen>0)chPut(Lr.ice,_ccW);
  return true}
function chC2(L,k){const c=L[k+'C2'];if(c)return c;const p=L[k+'P'];if(p===2)return _cc2.setRGB(.95,.94,.9);if(p===1)return _cc2.setRGB(.85,.85,.88);if(p===3)return _cc2.setRGB(.15,.12,.1);if(p===6)return _cc2.setRGB(.95,.95,.95);return null}
function _hairK(L,n){if(L.hat===5||L.mask)return null;const s=L.hairS;if(L.f){return['hairLong','hairBuns','hairLong','hairBuns','hairLong','hairBuzz','crop','hairLong'][s]||'hairLong'}return['hairPart','crop','crop','hairPart','hairPart','hairBuzz','crop',null][s]===undefined?'crop':['hairPart','crop','crop','hairPart','hairPart','hairBuzz','crop',null][s]}
