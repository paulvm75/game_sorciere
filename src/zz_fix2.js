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
function gsGhostOf(g,T,key){if(key!=='kaen'&&key!=='kaen_lb')return null;return g.userData.gsGhostCol!=null?{col:g.userData.gsGhostCol,src:null}:null}
function gsPostLoad(g,T,key,U){U.uMouth={value:0};U.uMH={value:1};U.uMC={value:new THREE.Vector3(0,-99,0)};U.uNar={value:key==='kaen'||key==='kaen_lb'?.16:0};
  T.userData.gsKey=key;const c=gsMouthCal(T);if(c){U.uMC.value.copy(c.mc);U.uMH.value=c.H}
  const gh=gsGhostOf(g,T,key);
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
/* ---------- Maëlle's limit breaker aura: uneven, rising flames of energy instead of a capsule ---------- */
function auraMat(inner){return new THREE.ShaderMaterial({transparent:true,depthWrite:false,blending:THREE.AdditiveBlending,side:THREE.DoubleSide,
  uniforms:{uT:{value:0},uK:{value:0},uB:{value:0},uIn:{value:inner?1:0}},
  vertexShader:`uniform float uT,uIn;varying vec2 vU;varying vec3 vN,vV;
float h(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5);}float n2(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(h(i),h(i+vec2(1,0)),f.x),mix(h(i+vec2(0,1)),h(i+1.),f.x),f.y);}
void main(){vU=uv;vec3 p=position;float a=uv.x*6.2832;float w=n2(vec2(uv.x*7.+uIn*3.,uv.y*3.-uT*2.2))*.55+n2(vec2(uv.x*15.,uv.y*6.-uT*3.7))*.3;
 float bulge=pow(sin(uv.y*3.1416),.6)*(.6+w*.9);p.xz*=bulge+.15;p.y+= (w-.4)*.25*uv.y;
 vec4 mv=modelViewMatrix*vec4(p,1.);vN=normalize(normalMatrix*normal);vV=normalize(-mv.xyz);gl_Position=projectionMatrix*mv;}`,
  fragmentShader:`uniform float uT,uK,uB,uIn;varying vec2 vU;varying vec3 vN,vV;
float h(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5);}float n2(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(h(i),h(i+vec2(1,0)),f.x),mix(h(i+vec2(0,1)),h(i+1.),f.x),f.y);}
float fbm(vec2 p){float s=0.,a=.5;for(int i=0;i<4;i++){s+=a*n2(p);p=p*2.03+vec2(1.7,9.2);a*=.5;}return s;}
void main(){vec2 q=vec2(vU.x*(uIn>.5?5.:8.),vU.y*2.2-uT*(uIn>.5?1.6:1.15));float f=fbm(q+vec2(fbm(q*1.3+uT*.3)*1.4,0.));
 float tongues=smoothstep(.36+vU.y*.36,.7,f)*(.6+.4*n2(vec2(vU.x*22.,vU.y*9.-uT*4.)));float base=smoothstep(0.,.12,vU.y)*(1.-smoothstep(.55,1.,vU.y));
 float rim=pow(1.-abs(dot(vN,vV)),1.6);float a=clamp(tongues*base*(.7+rim*1.2)*uK*(uIn>.5?.85:1.3),0.,1.);
 vec3 gold=mix(vec3(1.,.55,.12),vec3(1.,.92,.6),tongues);vec3 blue=mix(vec3(.2,.5,1.),vec3(.75,.92,1.),tongues);
 float sw=step(.5,fract(vU.x*3.+fbm(q*.7)*1.5+uT*.2));vec3 col=mix(gold,mix(gold,blue,sw),uB);
 gl_FragColor=vec4(col*a*1.8,a);}`})}
epAura=function(dt){if(!W||!W.g)return;const on=P.lbT>0&&P.alive&&MODE!=='open';
  if(on&&!EP.aura2){const g=new THREE.Group();const geo=new THREE.CylinderGeometry(.72,.72,3.1,56,32,true);const m1=auraMat(false),m2=auraMat(true);
    const o1=new THREE.Mesh(geo,m1);o1.position.y=1.35;g.add(o1);const o2=new THREE.Mesh(geo,m2);o2.position.y=1.05;o2.scale.set(.72,.82,.72);g.add(o2);
    const gl=glowSprite(0xffc860,3.4,0);gl.position.y=1.1;g.add(gl);scene.add(g);EP.aura2={g,m1,m2,gl,o1,o2,k:0,b:0}}
  if(EP.aura&&EP.aura.g)EP.aura.g.visible=false;
  const A=EP.aura2;if(!A)return;A.k+=((on?1:0)-A.k)*Math.min(1,dt*3);A.b+=((on&&P.lb2?1:0)-A.b)*Math.min(1,dt*3);A.g.visible=A.k>.02;if(!A.g.visible)return;
  A.g.position.copy(W.g.position);A.g.position.y+=EP.lev||0;const t=performance.now()*.001;
  for(const m of[A.m1,A.m2]){m.uniforms.uT.value=t;m.uniforms.uK.value=A.k;m.uniforms.uB.value=A.b}A.o1.rotation.y+=dt*.6;A.o2.rotation.y-=dt*.9;
  const s=1+(FIN.boost||0)*.25;A.g.scale.set(s,s*(1+Math.sin(t*3.1)*.03),s);A.gl.material.color.setHex(A.b>.5?0xa8c8ff:0xffc860);A.gl.material.opacity=A.k*(.28+Math.sin(t*7)*.05);
  if(on&&Math.random()<.6){const c=Math.random()<A.b*.5;SP.emit(V3(W.g.position.x+rand(-.55,.55),W.g.position.y+(EP.lev||0)+rand(0,1.9),W.g.position.z+rand(-.55,.55)),{c0:c?0xd8ecff:0xfff0c0,c1:c?0x3080ff:0xff9010,s0:.32,s1:.03,life:.7,up:3.4,speed:.25})}}
/* ---------- title screen: the real 3D Maëlle stands in the menu ---------- */
/* ---------- epic typography for the title screen and the loading screen; no italics anywhere there ---------- */
{const st=document.createElement('style');st.textContent=`
#boot *,#start *,#mm *,#mmCard2 *,#mmChar *{font-style:normal!important}
#boot .bt-title,#mm h1{font:700 clamp(60px,8.6vw,124px)/1 Cinzel,'Trajan Pro',Georgia,serif!important;letter-spacing:.07em!important;text-transform:uppercase;font-variation-settings:normal!important;
  background:linear-gradient(180deg,#fff6dc 0%,#ffd98a 30%,#f0a940 58%,#b8691c 82%,#7a3c0c 100%)!important;-webkit-background-clip:text!important;background-clip:text!important;color:transparent!important;
  filter:drop-shadow(0 2px 0 rgba(60,24,4,.85)) drop-shadow(0 0 26px rgba(246,180,80,.35)) drop-shadow(0 8px 30px rgba(0,0,0,.6));padding:.05em 0 .08em}
#mm h1{font-size:clamp(48px,5.6vw,84px)!important;letter-spacing:.06em!important}
#boot .bt-title{animation:sbGlow 4.5s ease-in-out infinite}
@keyframes sbGlow{0%,100%{filter:drop-shadow(0 2px 0 rgba(60,24,4,.85)) drop-shadow(0 0 22px rgba(246,180,80,.28)) drop-shadow(0 8px 30px rgba(0,0,0,.6))}50%{filter:drop-shadow(0 2px 0 rgba(60,24,4,.85)) drop-shadow(0 0 40px rgba(255,200,110,.55)) drop-shadow(0 8px 30px rgba(0,0,0,.6))}}
#boot .bt-over,#mm .mmOver{font:600 12px/1 Cinzel,Georgia,serif!important;letter-spacing:.5em!important;color:#e6c27e!important;opacity:.9}
#mm .mmTag{font:300 16px/1.5 Outfit,system-ui,sans-serif!important;letter-spacing:.02em;color:#efe4cf!important;opacity:.82}
#mm .mi .mtx b{font:700 19px/1.15 Cinzel,Georgia,serif!important;letter-spacing:.09em!important;text-transform:uppercase;color:#fbefd6!important;text-shadow:0 0 18px rgba(246,180,80,.18)}
#mm .mi .mtx small{font:400 12.5px/1.4 Outfit,system-ui,sans-serif!important;letter-spacing:.04em;color:#d9ccb2!important;opacity:.72}
#mm .mi .mnum{font:700 17px/1 Cinzel,Georgia,serif!important;color:#e6b35e!important;letter-spacing:.04em}
#mm .mi{position:relative;transition:background .25s,box-shadow .25s,transform .25s}
#mm .mi::before{content:'';position:absolute;left:0;top:18%;bottom:18%;width:2px;background:linear-gradient(180deg,transparent,#f6c46e,transparent);opacity:0;transition:opacity .25s}
#mm .mi:hover,#mm .mi:focus-visible{background:linear-gradient(90deg,rgba(246,180,80,.14),rgba(246,180,80,0) 75%)!important;box-shadow:inset 0 0 0 1px rgba(246,196,110,.22);transform:translateX(4px)}
#mm .mi:hover::before,#mm .mi:focus-visible::before{opacity:1}
#mm .mmRule b,#boot .bt-orn b{color:#f6c46e;text-shadow:0 0 10px rgba(246,196,110,.8)}
#mmCard2 .c2o,#mmCard2 .c2lv{font-family:Cinzel,Georgia,serif!important;letter-spacing:.22em}
#mmCard2 #nameIn,#mmChar #nameIn{font:700 20px Cinzel,Georgia,serif!important;letter-spacing:.08em}
/* loading bar */
#boot .bt-bar{width:min(380px,76vw)!important;height:6px!important;border-radius:6px!important;background:rgba(20,12,36,.85)!important;box-shadow:0 0 0 1px rgba(230,190,120,.35),0 0 0 4px rgba(10,6,20,.6),0 0 22px rgba(246,180,80,.12)}
#boot .bt-bar::before,#boot .bt-bar::after{content:'';position:absolute;top:50%;width:9px;height:9px;margin-top:-4.5px;transform:rotate(45deg);background:#0c0818;box-shadow:0 0 0 1px rgba(230,190,120,.6)}
#boot .bt-bar::before{left:-14px}#boot .bt-bar::after{right:-14px}
#boot .bt-bar i{border-radius:6px!important;background:linear-gradient(90deg,#7a3c0c,#d08a32 40%,#ffd98a 80%,#fff6dc)!important;box-shadow:0 0 14px rgba(246,180,80,.6)}
#boot .bt-bar i::after{content:'';position:absolute;inset:0;border-radius:6px;background:linear-gradient(90deg,transparent 0%,rgba(255,255,255,.55) 50%,transparent 100%);background-size:40% 100%;background-repeat:no-repeat;animation:sbShine 1.6s linear infinite;mix-blend-mode:overlay}
@keyframes sbShine{0%{background-position:-40% 0}100%{background-position:140% 0}}
#boot .bt-bar em{width:14px!important;height:14px!important;margin:-7px 0 0 -7px!important;background:radial-gradient(circle,#fff,#ffe3a0 45%,rgba(246,180,80,0) 72%)!important;box-shadow:0 0 18px 6px rgba(246,196,110,.7)!important}
#boot .bt-st{width:min(380px,76vw)!important;margin-top:16px!important;font:600 11px/1.2 Cinzel,Georgia,serif!important;letter-spacing:.32em!important;text-transform:uppercase;color:#e9d6b0!important}
#boot #btPc{font:700 12px/1.2 Cinzel,Georgia,serif!important;letter-spacing:.1em!important;color:#f6c46e!important;opacity:.95!important}
#boot .bt-tip{font:300 14px/1.5 Outfit,system-ui,sans-serif!important;letter-spacing:.02em;color:#d8cbb0!important}
`;document.head.appendChild(st)}
