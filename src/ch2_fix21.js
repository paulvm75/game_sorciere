/* ---------- cinematics: frame the speaker's face (chapters XV onward), and a dramatic ink-and-colour grade during every cutscene ---------- */
function csSpeakerRoots(who){const L=[];const add=g=>{if(g)L.push(g)};
  if(who==='@')add(W&&W.g);
  else if(who==='Kaen'){add(typeof KFW!=='undefined'&&KFW.a&&KFW.a.g);for(const e of enemies)if(!e.dead&&e.m&&(e.type==='illusion'||e.type==='kaenSpirit'))add(e.m.g)}
  else if(who==='Lyra')add(typeof LYR!=='undefined'&&LYR.a&&LYR.a.g);
  else if(who==='The Crown, wearing Maëlle')add(XO&&XO.mir&&XO.mir.m&&XO.mir.m.g);
  else if(typeof SB!=='undefined'&&SB.npc){const k={'Gérard':'g','Madame Ombline':'o','Monsieur Tic':'t','Professor Vasseur':'v'}[who];if(k&&SB.npc[k])add(SB.npc[k].g)}
  return L}
function csShown(o){for(let q=o;q;q=q.parent){if(!q.visible)return false;if(q===scene)return true}return false}
const _csV=V3(),_csQ=new THREE.Quaternion();
function csHead(g){if(!g.userData.csHead){let h=null;g.traverse(o=>{if(!h&&o.isBone&&o.name==='Head')h=o});g.userData.csHead=h||'none'}const h=g.userData.csHead;
  if(h==='none'){g.updateMatrixWorld(true);return g.getWorldPosition(V3()).add(V3(0,1.62,0))}h.updateWorldMatrix(true,false);return h.getWorldPosition(V3()).add(V3(0,.06,0))}
const _csRC=new THREE.Raycaster();
function csRayHit(a,b){const d=b.clone().sub(a),L=d.length();_csRC.set(a,d.normalize());_csRC.camera=camera;_csRC.far=L;_csRC.near=.25;let hits;try{hits=_csRC.intersectObjects(scene.children,true)}catch(x){return false}
  for(const h of hits){const o=h.object;if(!o.visible||o.isSprite||o.isPoints||o.isLine||o.isSkinnedMesh||o.isInstancedMesh)continue;const m=Array.isArray(o.material)?o.material[0]:o.material;if(!m||m.transparent&&m.opacity<.6||m.blending===THREE.AdditiveBlending)continue;return true}return false}
function csClear(a,b){if(csRayHit(a,b))return false;const n=8;for(let i=1;i<=n;i++){const t=i/n,x=a.x+(b.x-a.x)*t,y=a.y+(b.y-a.y)*t,z=a.z+(b.z-a.z)*t;
  if(y<groundAt(x,z)+.25)return false;if(typeof camBlocked==='function'&&i>2&&camBlocked(x,y,z))return false;
  if(MODE!=='open'&&CH2.zone==='latin'&&typeof sbSolid==='function'&&(sbSolid(x,z)||(SB.area==='tun'&&typeof sbCeil==='function'&&y>sbCeil(x,z)-.3)))return false}return true}
function csFaceShot(s,idx){const orig=s.cam;const side=idx%2?1:-1;let lock=null;
  s.fov=Math.max(36,Math.min(44,s.fov||40));
  s.cam=function(k,t){const c=orig(k,t);try{const roots=csSpeakerRoots(s.who).filter(csShown);if(!roots.length)return csWide(c);
      let best=null,bd=1e9;for(const g of roots){const h=csHead(g),d=h.distanceTo(c.look);if(d<bd){bd=d;best={g,h}}}if(!best||bd>25)return csWide(c);
      const h=best.h;const f=csFacing(s.who,best.g,h);
      if(!lock){for(const sd of[side,-side,0]){const a=sd*.38,dir=V3(f.x*Math.cos(a)-f.z*Math.sin(a),0,f.x*Math.sin(a)+f.z*Math.cos(a)),p=h.clone().addScaledVector(dir,2.5);p.y-=.14;if(csClear(h,p)){lock={a};break}}if(!lock)lock={a:null}}
      if(lock.a===null)return csWide(c);
      const a=lock.a,dir=V3(f.x*Math.cos(a)-f.z*Math.sin(a),0,f.x*Math.sin(a)+f.z*Math.cos(a)),dist=2.6-k*.3,p=h.clone().addScaledVector(dir,dist);p.y-=.14;
      CSK.p.copy(p).add(V3(0,.45,0)).lerp(h,.25);CSK.t=time;return{pos:p,look:V3(h.x,h.y-.02,h.z)}}catch(x){return c}};s._csF=1}
/* which way the speaker faces: toward whoever they are talking to (characters face each other in these scenes) */
function csFacing(who,g,h){let other=null,od=16;const cands=who==='@'?['The Crown, wearing Maëlle','Kaen','Lyra','Gérard','Madame Ombline','Monsieur Tic','Professor Vasseur']:['@'];
  for(const w of cands)for(const r of csSpeakerRoots(w).filter(csShown)){const q=csHead(r),d=q.distanceTo(h);if(d>.6&&d<od){od=d;other=q}}
  g.getWorldQuaternion(_csQ);let f=V3(0,0,1).applyQuaternion(_csQ);f.y=0;if(other&&f.lengthSq()<.01)f=V3(other.x-h.x,0,other.z-h.z);
  if(f.lengthSq()<.01)f.set(0,0,1);return f.normalize()}
function csWide(c){const d=c.pos.clone().sub(c.look),L=d.length();if(L>0&&L<3.2){d.multiplyScalar(3.2/L);return{pos:c.look.clone().add(d),look:c.look}}return c}
{const _pc=playCutscene;playCutscene=function(shots,done){try{if(MODE!=='open'&&typeof CH2!=='undefined'&&CH2.st>=17&&Array.isArray(shots)){let n=0;
      for(const s of shots){if(!s||s._csF||!s.cam)continue;if(s.who&&s.text&&!s.keepCam)csFaceShot(s,n++);else if(!s.keepCam&&s.who){const o=s.cam;s.cam=(k,t)=>csWide(o(k,t));s._csF=1}}}}catch(x){}
  return _pc.apply(this,arguments)}}
/* a soft key light on the speaker's face during face shots */
const CSK={L:new THREE.PointLight(0xffe2c4,0,7,1.6),p:V3(),t:-9};scene.add(CSK.L);
{const _mt=muTick;muTick=function(dt){_mt(dt);const on=CS.active&&time-CSK.t<.25;CSK.L.position.copy(CSK.p);CSK.L.intensity+=((on?1.6:0)-CSK.L.intensity)*Math.min(1,dt*5)}}
