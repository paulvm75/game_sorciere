/* ================= cast polish: talking mouths, Kaen's ghosts, Morwen's original look, a calmer Kaen ================= */
/* ---------- mouth: find the mouth on each generated model (front profile of the face), then let the jaw drop while they talk ---------- */
const GS_MOUTHY={kaen:.883,maelle:.821,lyra:.879},GS_MOUTHN={kaen_lb:-.068};
function gsMouthCal(T){let sm=null;T.traverse(o=>{if(!sm&&o.isSkinnedMesh)sm=o});if(!sm)return null;
  const sk=sm.skeleton,hi=sk.bones.findIndex(b=>b.name==='Head');if(hi<0)return null;
  const M=new THREE.Matrix4().copy(sk.boneInverses[hi]).invert().premultiply(sm.bindMatrixInverse);const hp=new THREE.Vector3().setFromMatrixPosition(M);
  const pa=sm.geometry.attributes.position,n=pa.count;let y0=1e9,y1=-1e9;for(let i=0;i<n;i++){const y=pa.getY(i);if(y<y0)y0=y;if(y>y1)y1=y}const H=y1-y0;
  const NB=48,lo=hp.y-.02*H,span=.16*H,bins=new Float32Array(NB).fill(-1e9),cx=.014*H;
  for(let i=0;i<n;i++){const x=pa.getX(i),y=pa.getY(i);if(Math.abs(x-hp.x)>cx||y<lo||y>=lo+span)continue;const b=((y-lo)/span*NB)|0;const z=pa.getZ(i);if(z>bins[b])bins[b]=z}
  // nose tip = the most forward point in the middle of the face; the mouth sits under it (per-model height, measured)
  let nb=-1,nz=-1e9;for(let b=(NB*.3)|0;b<(NB*.8)|0;b++)if(bins[b]>nz){nz=bins[b];nb=b}if(nb<0)return null;
  const MY=GS_MOUTHY[T.userData.gsKey];const my=MY?y0+MY*H:lo+(nb+.5)/NB*span+(GS_MOUTHN[T.userData.gsKey]||-.03)*H;let mz=-1e9;
  for(let i=0;i<n;i++){const x=pa.getX(i),y=pa.getY(i);if(Math.abs(x-hp.x)<.012*H&&Math.abs(y-my)<.006*H){const z=pa.getZ(i);if(z>mz)mz=z}}if(mz<-1e8)mz=nz-.01*H;mz-=.003*H;
  return{mc:new THREE.Vector3(hp.x,my,mz),H}}
function gsMouthInject(m,U){const prev=m.onBeforeCompile,pk=m.customProgramCacheKey;
  m.onBeforeCompile=function(sh,r){if(prev&&prev!==THREE.Material.prototype.onBeforeCompile)prev.call(this,sh,r);for(const k of['uMouth','uMC','uMH','uNar'])sh.uniforms[k]=U[k];
    sh.vertexShader=sh.vertexShader.replace('#include <common>','#include <common>\nuniform float uMouth,uMH,uNar;uniform vec3 uMC;').replace('#include <begin_vertex>',`#include <begin_vertex>
{vec3 d=transformed-uMC;float r=uMH;float wz=smoothstep(-.05*r,-.006*r,d.z);
 float wx=1.-smoothstep(.016*r,.032*r,abs(d.x));float wy=(1.-smoothstep(-.001*r,.006*r,d.y))*(1.-smoothstep(.03*r,.055*r,-d.y));
 float w=wx*wy*wz;transformed.y-=uMouth*.011*r*w;transformed.z-=uMouth*.003*r*w;
 float wn=(1.-smoothstep(.012*r,.03*r,length(vec2(d.x*.7,d.y*1.4))))*wz;transformed.x-=d.x*uNar*wn;}`)};
  m.customProgramCacheKey=function(){return(pk?pk.call(this):'')+'|mouth'};m.needsUpdate=true}
/* ---------- ghosts: if the actor was a ghost before the swap, the new model is one too ---------- */
function gsGhostOf(g,T){if(g.userData.gsGhostCol!=null)return{col:g.userData.gsGhostCol,src:null};let src=null;
  g.traverse(o=>{if(src||!o.isMesh||!o.material||o.userData.gsKeep)return;for(let q=o;q;q=q.parent)if(q===T)return;const m=o.material;if(m.transparent&&(m.blending===THREE.AdditiveBlending||m.opacity<.9))src=m});
  return src?{col:0xb07cff,src}:null}
function gsPostLoad(g,T,key,U){U.uMouth={value:0};U.uMH={value:1};U.uMC={value:new THREE.Vector3(0,-99,0)};U.uNar={value:key==='kaen'||key==='kaen_lb'?.16:0};
  T.userData.gsKey=key;const c=gsMouthCal(T);if(c){U.uMC.value.copy(c.mc);U.uMH.value=c.H}
  const gh=gsGhostOf(g,T);
  T.traverse(o=>{if(!o.isMesh)return;if(gh){const m0=o.material;const m=new THREE.MeshBasicMaterial({map:m0.map||null,color:new THREE.Color(gh.col),transparent:true,opacity:.5,blending:THREE.AdditiveBlending,depthWrite:false,side:THREE.DoubleSide,skinning:!!o.isSkinnedMesh});
      m.onBeforeCompile=sh=>{sh.fragmentShader=sh.fragmentShader.replace('#include <map_fragment>','#include <map_fragment>\n{float l=dot(diffuseColor.rgb/max(diffuse,vec3(.001)),vec3(.3,.59,.11));diffuseColor.rgb=diffuse*(.35+l*1.25);}')};m.customProgramCacheKey=()=>'gsGhost';
      o.material=m;o.castShadow=false;o.userData.gsGhost=gh}gsMouthInject(o.material,U)});
  if(gh){g.userData.gsGhostM=[];T.traverse(o=>{if(o.isMesh)g.userData.gsGhostM.push(o.material)})}}
/* ---------- who is talking, and how loud ---------- */
const TALK={an:null,buf:null,lvl:0,who:'',whoT:0,line:'',lineT:0,lineDur:0};
function talkInit(){if(TALK.an||!AC)return;try{TALK.an=AC.createAnalyser();TALK.an.fftSize=512;TALK.buf=new Uint8Array(TALK.an.fftSize);const z=AC.createGain();z.gain.value=0;TALK.an.connect(z);z.connect(AC.destination)}catch(x){TALK.an=null}}
function talkTap(n){if(!n||n._talk||!TALK.an)return;try{n.connect(TALK.an);n._talk=1}catch(x){}}
{const _vp=voPlay;voPlay=function(who){TALK.who=who;TALK.whoT=performance.now();return _vp.apply(this,arguments)}}
{const _b=bark;bark=function(who){const r=_b.apply(this,arguments);if(BKS.src&&!BKS.src._talkWho){BKS.src._talkWho=1;TALK.who=who;TALK.whoT=performance.now()}return r}}
{const _sv=sayVoice;sayVoice=function(){const r=_sv.apply(this,arguments);try{const b=sayEl.querySelector('b');TALK.who=b?b.textContent:'';TALK.whoT=performance.now()}catch(x){}return r}}
function talkKeyOf(who){if(!who)return'';const h=HERO.name||'Maëlle';if(who==='@'||who===h||who==='Maëlle')return'maelle';if(/^Kaen/.test(who)||who==='illusion'||who==='kaenSpirit')return'kaen';if(who==='Lyra')return'lyra';
  if(who==='The Crown, wearing Maëlle')return'mirror';return''}
function talkTick(dt){talkInit();let audio=false;
  if(TALK.an){talkTap(VO.src&&VO.g);if(SAYQ.src)talkTap(SAYQ.src);talkTap(BKS.src&&BKS.g);
    audio=!!(VO.src||SAYQ.src||BKS.src);TALK.an.getByteTimeDomainData(TALK.buf);let s=0;for(let i=0;i<TALK.buf.length;i++){const v=(TALK.buf[i]-128)/128;s+=v*v}const rms=Math.sqrt(s/TALK.buf.length);
    const tg=audio?clamp((rms-.012)*9,0,1):0;TALK.lvl+=(tg-TALK.lvl)*Math.min(1,dt*(tg>TALK.lvl?28:14))}
  // a line on screen with no voice: flap for about as long as it would take to say it
  let who=audio?TALK.who:'';const now=performance.now()*.001;
  if(!audio){const on=dlg.classList.contains('show');const sid=on?dlgWho.textContent+'|'+dlgText.textContent.slice(0,10):'';
    if(sid!==TALK.line){TALK.line=sid;TALK.lineT=now;TALK.lineDur=0}
    if(on){who=dlgWho.textContent;TALK.lineDur=Math.max(TALK.lineDur,dlgText.textContent.length);const est=.6+TALK.lineDur*.055;
      const f=now-TALK.lineT<est?Math.max(0,Math.sin(now*15.5)*.6+Math.sin(now*9.1+1.3)*.5)*.85:0;TALK.lvl+=(f-TALK.lvl)*Math.min(1,dt*20)}
    else TALK.lvl*=Math.max(0,1-dt*10)}
  const k=talkKeyOf(who);
  for(const e of GS.list){if(!e.U||!e.U.uMouth)continue;let on=false;const ek=e.key==='kaen_lb'?'kaen':e.key;
    if(k&&ek===k&&!(k==='maelle'&&e.g!==W.g))on=true;if(k==='mirror'&&e.key==='maelle'&&e.g!==W.g)on=true;
    const tg=on?TALK.lvl:0;e.U.uMouth.value+=(tg-e.U.uMouth.value)*Math.min(1,dt*30)}}
{const _mt=muTick;muTick=function(dt){_mt(dt);try{talkTick(dt)}catch(x){}
  for(const e of GS.list){const gm=e.g.userData.gsGhostM;if(!gm)continue;const src=e.g.userData.gsGhostSrc;const t=performance.now()*.001;const o=.42+Math.sin(t*2.1)*.07;for(const m of gm)m.opacity=o}}}
/* ---------- Kaen's spirit: a translucent violet ghost; chained in the Tower (the Crown's place), a cold blue-grey ---------- */
{const _kb=kfBuild;kfBuild=function(){const had=KFW.a;const a=_kb.apply(this,arguments);if(a&&a!==had&&!XII.solid){a.g.userData.gsGhostCol=0xa97cff;
    a.g.traverse(o=>{if(o.isSprite&&o.material)o.material.color.setHex(0xb88cff)});if(KFW.gm)KFW.gm.color.setHex(0xa97cff)}return a}}
{const _ng=nzGhostKaen;nzGhostKaen=function(){const a=_ng.apply(this,arguments);if(a&&a.g){a.g.userData.gsGhostCol=0x9fb3cc;a.g.traverse(o=>{if(o.isSprite&&o.material)o.material.color.setHex(0xaabbd4)})}return a}}
{const _ks=buildKaenSpirit;buildKaenSpirit=function(){const m=_ks.apply(this,arguments);if(m&&m.g){m.g.userData.gsGhostCol=0xb07cff;if(m.K)m.K.ghostSp=1}return m};if(ETYPES.kaenSpirit&&ETYPES.kaenSpirit.build===_ks)ETYPES.kaenSpirit.build=buildKaenSpirit}
/* ---------- the first time you meet Kaen, he walks to you slowly, like he owns the night ---------- */
{const _bw=bossWake;bossWake=function(e,d,dt){if(!e||e.type!=='illusion'||!P.alive||CS.active||(d<20&&Math.abs(P.pos.y-e.pos.y)<14)||d>140)return _bw.apply(this,arguments);
  if(e.beacon){e.beacon.position.set(e.pos.x,e.pos.y+35,e.pos.z);e.beacon.material.opacity=.14+Math.sin(e.t*3)*.05}
  const dx=P.pos.x-e.pos.x,dz=P.pos.z-e.pos.z;e.m.g.rotation.y=lerpAngle(e.m.g.rotation.y,Math.atan2(dx,dz),Math.min(1,dt*2));
  if(d>1){const sp=1.15*dt;e.pos.x+=dx/d*sp;e.pos.z+=dz/d*sp;collide(e.pos,e.def.r,false,false);e.pos.y=lerp(e.pos.y,groundAt(e.pos.x,e.pos.z),Math.min(1,dt*8))}
  e.m.lock=.2;try{e.m.actor.setBase('Walk_Loop',.4,.82)}catch(x){}e.moveK=.2;try{animateEnemy(e,dt,.2)}catch(x){}return true}}
/* ---------- Morwen keeps her original look, with a finer finish: satin bodice, deep velvet skirt, glinting crown ---------- */
{const _q=buildQueen;buildQueen=function(){const m=_q.apply(this,arguments);try{m.g.traverse(o=>{if(!o.isMesh||!o.material||!o.material.isMeshStandardMaterial)return;const t=o.material;const h=t.color.getHex();
    if(h===0x14080c){t.roughness=.55;t.metalness=.05;t.sheen=1}else if(h===0x5a0a16){t.roughness=.42;t.metalness=.45;t.emissive.setHex(0x3a0610)}else if(h===0x24040a){t.roughness=.7;t.emissive.setHex(0x120206)}
    if(t.map)t.map.anisotropy=8;t.needsUpdate=true})}catch(x){}return m};if(ETYPES.queen&&ETYPES.queen.build===_q)ETYPES.queen.build=buildQueen}
