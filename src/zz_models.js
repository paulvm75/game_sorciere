/* ================= new 3D cast: Maëlle, Kaen, Lyra, Morwen (Higgsfield / Meshy rigs) =================
   Every actor keeps its original skeleton and animation; we hide its old meshes and drive a new rigged
   model from it each frame (world-space rotation retarget + hip placement). */
const GS={buf:{},want:{maelle:'chr_maelle',kaen:'chr_kaen',lyra:'chr_lyra',morwen:'chr_morwen'},list:[],rest:null,off:false};
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
  if(sx==='f'&&(h===0xd8c89a||h===0xeadfb8||h===0xffcf55))return 'morwen';
  if(sx==='f'&&h===0xc8c8d4)return 'maelle';return null}
function gsHide(o){if(o.userData.gsKeep)return;Object.defineProperty(o,'visible',{get(){return false},set(){},configurable:true})}
/* swap: g = actor group, root = node that owns the skeleton (its frame is the anims frame), keep(o) = meshes to leave visible */
function gsSwap(g,root,key,keep){if(GS.off||!g||!root||g.userData.gs)return;const R=gsRest();if(!R)return;g.userData.gs={key,pending:true};
  const sb={};root.traverse(o=>{if(o.isBone&&!sb[o.name])sb[o.name]=o});if(!sb.pelvis)return;
  gsLoad(key).then(buf=>{if(!buf)return;new THREE.GLTFLoader().parse(buf.slice(0),'',gl=>{const T=gl.scene;const tb={};T.traverse(o=>{if(o.isBone)tb[o.name]=o;if(o.isMesh){o.castShadow=true;o.frustumCulled=false;o.userData.gsKeep=true;if(o.material){const m=o.material;m.side=THREE.DoubleSide;if(m.map){m.map.anisotropy=4;m.emissiveMap=m.map;m.emissive=new THREE.Color(0x4a4048);m.emissiveIntensity=1}m.roughness=Math.max(.55,m.roughness||.8);m.metalness=Math.min(.15,m.metalness||0);m.needsUpdate=true}}});
    if(!tb.Hips)return;
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
    const e={g,root,T,tb,sb,cal,order,s,hipOff,key};g.userData.gs=e;g.userData.gsModel=T;GS.list.push(e);gsTickOne(e)},err=>{console.warn('gs',err)})})}
function gsTickOne(e){const{root,T,tb,sb,cal,order}=e;root.updateMatrixWorld(true);
  const rq=root.getWorldQuaternion(new THREE.Quaternion()),rqi=rq.clone().invert();const Tq=T.getWorldQuaternion(new THREE.Quaternion());
  for(const n of order){const t=tb[n],s=sb[GS_MAP[n]],k=cal[n];
    const sq=s.getWorldQuaternion(_gq).premultiply(rqi);            // source bone, root frame
    const W=sq.multiply(k.srcI).multiply(k.qc).multiply(k.tr);      // wanted target, root frame
    const pq=t.parent.getWorldQuaternion(_gq2).premultiply(rqi);   // target parent, root frame
    t.quaternion.copy(pq.invert().multiply(W));t.updateMatrixWorld(true)}
  /* hips follow the source pelvis */
  const hp=sb.pelvis.getWorldPosition(_gv);root.worldToLocal(hp);hp.add(e.hipOff);
  const w=root.localToWorld(hp.clone());tb.Hips.parent.worldToLocal(w);tb.Hips.position.copy(w);T.updateMatrixWorld(true)}
function gsTick(){for(let i=GS.list.length-1;i>=0;i--){const e=GS.list[i];if(!e.g.parent&&!e.root.parent){continue}try{let v=true,o=e.g;while(o){if(o.visible===false){v=false;break}o=o.parent}if(v)gsTickOne(e)}catch(x){}}}
/* every character actor built from now on */
{const _mk=makeCHActor;makeCHActor=function(sx,o){const a=_mk.apply(this,arguments);try{const k=gsKeyOf(sx,o);if(a&&k){const root=gsRootOf(a.g);
    const hand=[];a.g.traverse(q=>{if(q.isBone&&/^hand_[lr]$/.test(q.name))hand.push(q)});const inHand=o=>{let p=o.parent;while(p){if(hand.includes(p))return true;p=p.parent}return false};gsSwap(a.g,root,k,inHand)}}catch(x){console.warn(x)}return a}}
/* the hero: Maëlle only (Lucien keeps his look); wand and anything in her hands stay */
function gsHero(){if(GS.off||!W||!W.ch||!W.g||W.g.userData.gs)return;if(HERO.g!=='f')return;const root=gsRootOf(W.g);if(!root)return;
  const hand=[];W.g.traverse(q=>{if(q.isBone&&/^hand_[lr]$/.test(q.name))hand.push(q)});
  const inHand=o=>{let p=o.parent;while(p){if(hand.includes(p)||p===W.broom)return true;p=p.parent}return false};
  gsSwap(W.g,root,'maelle',inHand)}
{const _mt=muTick;muTick=function(dt){_mt(dt);if(!started)return;try{gsHero()}catch(x){}gsTick()}}
{const _sh=setHero;setHero=function(){const r=_sh.apply(this,arguments);try{gsHero()}catch(x){}return r}}
