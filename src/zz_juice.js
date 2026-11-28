/* ================= JUICE: hit-stop + rumble, elemental combos (+ mini tutorial), dynamic weather ================= */

/* ---------- 1. hits: freeze-frame, shake, squash, spark, vibration ---------- */
const JU={t:0};
let VIBE=(()=>{try{return localStorage.getItem('sorciere-vib')!=='0'}catch(x){return true}})();
{const _v=vib;vib=function(){if(!VIBE)return;return _v.apply(this,arguments)}}
function vibSync(){const b=$('vibBtn');if(b)b.textContent=VIBE?'Vibration on':'Vibration off'}
try{$('vibBtn').addEventListener('click',()=>{VIBE=!VIBE;try{localStorage.setItem('sorciere-vib',VIBE?'1':'0')}catch(x){}vibSync();if(VIBE)buzz(40,.5,.6,120)});vibSync()}catch(x){}
function buzz(ms,weak,strong,dur){if(!VIBE)return;try{vib(Math.round(ms))}catch(x){}
  try{const gs=navigator.getGamepads?navigator.getGamepads():[];for(const g of gs){if(g&&g.vibrationActuator&&g.vibrationActuator.playEffect)g.vibrationActuator.playEffect('dual-rumble',{duration:dur||ms*3,weakMagnitude:Math.min(1,weak),strongMagnitude:Math.min(1,strong)})}}catch(x){}}
const JU_FLARE=canvasTex(128,128,x=>{x.translate(64,64);const g=x.createRadialGradient(0,0,0,0,0,26);g.addColorStop(0,'rgba(255,255,255,1)');g.addColorStop(1,'rgba(255,255,255,0)');x.fillStyle=g;x.fillRect(-64,-64,128,128);
  x.fillStyle='#fff';for(let i=0;i<4;i++){x.rotate(Math.PI/2);x.beginPath();x.moveTo(0,-5);x.lineTo(62,0);x.lineTo(0,5);x.fill()}x.rotate(Math.PI/4);x.globalAlpha=.5;for(let i=0;i<4;i++){x.rotate(Math.PI/2);x.beginPath();x.moveTo(0,-3);x.lineTo(34,0);x.lineTo(0,3);x.fill()}});
function juSpark(p,col,sz){const m=new THREE.SpriteMaterial({map:JU_FLARE,color:new THREE.Color(col||'#ffffff').lerp(new THREE.Color(1,1,1),.45),blending:THREE.AdditiveBlending,transparent:true,depthWrite:false,depthTest:false,rotation:Math.random()*Math.PI});
  const s=new THREE.Sprite(m);s.position.copy(p);s.renderOrder=7;addFx(s,.16,(f,k)=>{const q=k<.2?k/.2:1-(k-.2)/.8;s.scale.setScalar(sz*(.4+.8*Math.min(1,k*5)));m.opacity=q})}
/* white hit flash on the enemy itself */
const JU_W=new THREE.Color(1,1,1);
function juFlash(e,amt){const g=e.m&&e.m.g;if(!g)return;if(!e._hm){e._hm=[];g.traverse(o=>{if(!o.isMesh||!o.material)return;const arr=Array.isArray(o.material)?o.material:[o.material];const out=arr.map(m=>{if(!m.emissive)return m;const c=m.clone();e._hm.push({m:c,e0:m.emissive.clone(),i0:m.emissiveIntensity||1});return c});o.material=Array.isArray(o.material)?out:out[0]})}
  if(!e._hm.length)return;e._hf=Math.max(e._hf||0,amt);if(e._hfOn)return;e._hfOn=1;
  addFx(null,.5,(f)=>{const d=f.t-(f.lt||0);f.lt=f.t;e._hf-=d/.09;const k=Math.max(0,e._hf);for(const h of e._hm){h.m.emissive.copy(h.e0).lerp(JU_W,k*.85);h.m.emissiveIntensity=h.i0+k*1.4}if(k<=0)f.t=f.dur},()=>{for(const h of e._hm){h.m.emissive.copy(h.e0);h.m.emissiveIntensity=h.i0}e._hfOn=0})}
function juPunch(e,a){const g=e.m&&e.m.g;if(!g||e.def.boss||e._pun)return;e._pun=1;const s0=g.scale.clone();
  addFx(null,.15,(f,k)=>{if(e.dead)return;const q=Math.sin(k*Math.PI)*a;g.scale.set(s0.x*(1+q*.55),s0.y*(1-q),s0.z*(1+q*.55))},()=>{if(!e.dead)g.scale.copy(s0);e._pun=0})}
const LIGHTNING_COL={'#f1f5ff':1,'#cfe0ff':1};
{const _de=damageEnemy;damageEnemy=function(e,amt,color,dot){const was=e&&!e.dead&&!e.invuln,fz=was&&e.frozen>0;const r=_de.apply(this,arguments);
  if(!was||dot||(typeof CS!=='undefined'&&CS.active))return r;
  try{
    if(LIGHTNING_COL[color]&&fz&&!CMB.lock&&cmbOk(e))cmbShatter(e);
    const now=performance.now(),s=clamp(amt/90,0,1),c=eCenter(e);
    const boss=e.def.boss;
    if(e.dead){if(boss){hitStop=.09;P.shake=Math.max(P.shake,.8);buzz(80,.45,.75,240)}else{hitStop=Math.max(Math.min(hitStop,e.elite?.04:.018),.018);P.shake=Math.max(P.shake,.14+.12*s);buzz(18,.3,.45,70)}
      juSpark(c,'#ffffff',3+s*2.2);SP.emit(c,{n:14,c0:0xffffff,c1:new THREE.Color(color||'#ffffff').getHex(),speed:9,life:.35,s0:.5,s1:.05})}
    else{juFlash(e,.6+.4*s);juSpark(c,color,1.4+s*1.8);
      if(now-JU.t>(boss?220:90)){JU.t=now;if(boss&&s>.35)hitStop=Math.max(hitStop,.012+.018*s);P.shake=Math.max(P.shake,boss?.08+.16*s:.03+.08*s);buzz(boss?12+14*s:6+8*s,.1+.25*s,.05+.3*s,40+40*s);juPunch(e,.1+.14*s)}}
  }catch(x){console.warn('juice',x)}
  return r}}
{const _dp=damagePlayer;damagePlayer=function(a){const h0=P.hp;const r=_dp.apply(this,arguments);try{if(P.hp<h0){const s=clamp((h0-P.hp)/(maxHP()*.2),0,1);hitStop=Math.max(hitStop,.012+.018*s);buzz(25+40*s,.4+.4*s,.5+.5*s,90+120*s)}}catch(x){}return r}}

/* ---------- 2. elemental combos ---------- */
const CMB={lock:0,seen:{},tut:{},tutT:0,q:[]};
try{CMB.seen=JSON.parse(localStorage.getItem('sorc_cmb')||'{}');CMB.tut=JSON.parse(localStorage.getItem('sorc_cmbt')||'{}')}catch(x){}
function cmbSave(){try{localStorage.setItem('sorc_cmb',JSON.stringify(CMB.seen));localStorage.setItem('sorc_cmbt',JSON.stringify(CMB.tut))}catch(x){}}
function cmbOk(e){const t=performance.now();if(e._cmbT&&t-e._cmbT<900)return false;e._cmbT=t;return true}
(function(){const st=document.createElement('style');st.textContent=`
#cmbBan{position:fixed;left:50%;top:24%;transform:translate(-50%,-50%);z-index:60;pointer-events:none;text-align:center;opacity:0}
#cmbBan b{display:block;font:italic 900 clamp(34px,6vw,78px)/1 Georgia,serif;letter-spacing:.04em;color:#fff;text-shadow:0 0 18px var(--c),0 0 42px var(--c),0 4px 0 rgba(0,0,0,.45)}
#cmbBan i{display:inline-block;margin-top:8px;font:700 clamp(11px,1.3vw,15px)/1 system-ui,sans-serif;letter-spacing:.32em;color:var(--c);background:rgba(8,6,20,.55);padding:6px 12px;border-radius:20px;font-style:normal}
#cmbBan.on{animation:cmbIn 1.5s cubic-bezier(.2,1.4,.4,1) forwards}
@keyframes cmbIn{0%{opacity:0;transform:translate(-50%,-50%) scale(2.2)}12%{opacity:1;transform:translate(-50%,-50%) scale(.94)}20%{transform:translate(-50%,-50%) scale(1)}78%{opacity:1}100%{opacity:0;transform:translate(-50%,-62%) scale(1.04)}}
#cmbTut{position:fixed;left:50%;bottom:118px;transform:translate(-50%,20px);z-index:59;pointer-events:none;opacity:0;transition:opacity .4s,transform .4s;
 background:linear-gradient(135deg,rgba(20,14,44,.92),rgba(10,8,24,.92));border:1px solid rgba(190,160,255,.45);border-radius:14px;padding:12px 18px;max-width:min(92vw,460px);color:#eae4ff;font:14px/1.4 system-ui,sans-serif;box-shadow:0 8px 30px rgba(0,0,0,.5)}
#cmbTut.on{opacity:1;transform:translate(-50%,0)}
#cmbTut h4{margin:0 0 4px;font:800 11px/1 system-ui,sans-serif;letter-spacing:.28em;color:#c9a6ff}
#cmbTut .eq{font-weight:800;font-size:16px;margin:2px 0 4px}#cmbTut .eq span{padding:0 4px}`;document.head.appendChild(st);
  const b=document.createElement('div');b.id='cmbBan';b.innerHTML='<b></b><i></i>';document.body.appendChild(b);
  const t=document.createElement('div');t.id='cmbTut';document.body.appendChild(t)})();
function cmbBanner(name,sub,col){const b=document.getElementById('cmbBan');if(!b)return;b.style.setProperty('--c',col);b.querySelector('b').textContent=name;b.querySelector('i').textContent=sub;b.classList.remove('on');void b.offsetWidth;b.classList.add('on')}
const CMB_INFO={steam:['STEAM BURST','ICE + FIRE','#cfefff','<span style="color:#8fe3ff">Ice</span> + <span style="color:#ff8a3c">Fire</span>','Freeze an enemy (Ice lance x3 or Glacial nova), then hit it with fire. It works the other way round too.'],
  shatter:['SHATTERSTORM','ICE + LIGHTNING','#bfe8ff','<span style="color:#8fe3ff">Ice</span> + <span style="color:#f1f5ff">Lightning</span>','Strike a frozen enemy with Chain lightning or Thunderstorm. The ice explodes and arcs to its friends.'],
  toxic:['TOXIC BLAST','POISON + FIRE','#b6ff5a','<span style="color:#9dff5a">Poison</span> + <span style="color:#ff8a3c">Fire</span>','Poison them first, then set them on fire. The gas ignites and spreads to everyone close.']};
function cmbHit(id){const I=CMB_INFO[id];cmbBanner(I[0],I[1],I[2]);if(!CMB.seen[id]){CMB.seen[id]=1;CMB.tut[id]=1;cmbSave();const n=Object.keys(CMB.seen).length;after(1.3,()=>toast(`${I[1]} = ${I[0]}. ${n<3?(3-n)+' more to find.':'You found them all.'}`,'Combo discovered!'))}}
function cmbFx(c,col,n){SP.emit(c,{n:n||50,c0:0xffffff,c1:col,speed:14,life:.7,s0:.7,s1:.05});ring(V3(c.x,groundAt(c.x,c.z),c.z),col,.6,9,.4);flash(c,col,14);P.shake=Math.max(P.shake,.8);hitStop=Math.max(hitStop,.045);buzz(60,.6,1,200)}
function cmbArea(c,R,dmgMain,dmgOther,main,col,each){CMB.lock=1;try{for(const o of enemies){if(o.dead)continue;if(o!==main&&Math.hypot(o.pos.x-c.x,o.pos.z-c.z)>R+o.def.r)continue;damageEnemy(o,(o===main?dmgMain:dmgOther)*power(),col);if(!o.dead&&each)each(o)}}finally{CMB.lock=0}}
function cmbSteam(e){const c=eCenter(e);e.frozen=0;e.chill=0;e.chillT=0;e.burn=0;
  SM.emit(c,{n:46,c0:0xffffff,c1:0xb8c8d8,s0:3,s1:11,speed:9,up:3,life:2.2,a:.75,drag:2.2});SM.emit(V3(c.x,c.y-1,c.z),{n:20,c0:0xf0f8ff,c1:0x8a9aa8,s0:4,s1:9,speed:12,flat:1,life:1.6,a:.5,drag:3});
  cmbFx(c,0xe8f8ff,60);noise(1.4,.32,6000,'highpass',null,{attack:.01});noise(.5,.4,400,'lowpass');sfx.boom&&sfx.boom();
  cmbArea(c,6.5,95,60,e,'#e8f4ff',o=>{o.slow=Math.max(o.slow,2.5);o.stun=Math.max(o.stun,o.def.boss?.2:.7)});cmbHit('steam')}
function cmbShatter(e){const c=eCenter(e);e.frozen=0;shatter(c,12,1.5);cmbFx(c,0xbfe8ff,70);sfx.chain&&sfx.chain();
  const near=enemies.filter(o=>!o.dead&&o!==e&&eCenter(o).distanceTo(c)<13).sort((a,b)=>eCenter(a).distanceTo(c)-eCenter(b).distanceTo(c)).slice(0,5);
  CMB.lock=1;try{damageEnemy(e,110*power(),'#bfe8ff');near.forEach((o,i)=>after(i*.06,()=>{if(o.dead)return;const oc=eCenter(o);lightning(c,oc,0xbfe8ff);lightning(c,oc,0xffffff);frostBurst(oc,12);CMB.lock=1;try{damageEnemy(o,55*power(),'#bfe8ff')}finally{CMB.lock=0}if(!o.dead){o.stun=Math.max(o.stun,o.def.boss?.25:1);o.slow=Math.max(o.slow,2)}}))}finally{CMB.lock=0}
  cmbHit('shatter')}
function cmbToxic(e){const c=eCenter(e);fireBurst(c,7,true);FL.emit(c,{n:60,c0:0xd8ff60,c1:0xff5a10,s0:2.6,s1:.5,speed:16,up:2,life:.8,drag:2.4});
  SM.emit(c,{n:30,c0:0x7aa030,c1:0x1a2008,s0:3,s1:9,speed:7,up:2.5,life:2,a:.6,drag:2});cmbFx(c,0xb6ff5a,50);sfx.boom&&sfx.boom();
  cmbArea(c,7.5,100,70,e,'#c6ff3a',o=>{o.pois=Math.max(o.pois||0,4);o.poisDps=Math.max(o.poisDps||0,16*power());CMB._burn(o,3,14*power())});cmbHit('toxic')}
{const _b=burn;CMB._burn=_b;burn=function(e,dur,dps){if(e&&!e.dead&&!CMB.lock){
  if((e.frozen>0||(e.chill>0&&e.chillT>0))&&cmbOk(e)){cmbSteam(e);return}
  if(e.pois>0&&cmbOk(e)){_b.apply(this,arguments);cmbToxic(e);return}}return _b.apply(this,arguments)}}
{const _f=freeze;freeze=function(e,dur){if(e&&!e.dead&&!CMB.lock&&e.burn>0&&cmbOk(e)){cmbSteam(e);return}return _f.apply(this,arguments)}}
/* grimoire + loading-screen hints */
try{SPELL_INFO.fire+=' Combo: on a frozen enemy = Steam Burst. On a poisoned one = Toxic Blast.';SPELL_INFO.lance+=' Combo: freeze, then fire = Steam Burst.';SPELL_INFO.frost+=' Combo: then fire = Steam Burst, then lightning = Shatterstorm.';
  SPELL_INFO.chain+=' Combo: on a frozen enemy = Shatterstorm.';SPELL_INFO.storm+=' Combo: strikes on frozen enemies = Shatterstorm.';SPELL_INFO.poison+=' Combo: then fire = Toxic Blast.'}catch(x){}
/* mini tutorial: one card per combo, the first time you own both spells and a fight starts */
function cmbTutShow(id){const I=CMB_INFO[id],el=document.getElementById('cmbTut');if(!el)return;CMB.tut[id]=1;cmbSave();
  el.innerHTML=`<h4>ELEMENTAL COMBO</h4><div class="eq">${I[3]} <span>=</span> <span style="color:${I[2]}">${I[0]}</span></div><div>${I[4]}</div>`;el.classList.add('on');sx&&sx('ding',.5);clearTimeout(CMB.th);CMB.th=setTimeout(()=>el.classList.remove('on'),8000)}
function cmbTutTick(dt){CMB.tutT-=dt;if(CMB.tutT>0||!P.alive||(typeof CS!=='undefined'&&CS.active))return;CMB.tutT=1;
  const kn=id=>{const s=SPELLS.find(x=>x.id===id);return s&&spellKnown(s)};
  if(!enemies.some(e=>!e.dead&&e.pos.distanceTo(P.pos)<30))return;
  const want=[['steam',kn('fire')&&(kn('lance')||kn('frost'))],['shatter',(kn('lance')||kn('frost'))&&(kn('chain')||kn('storm'))],['toxic',kn('poison')&&kn('fire')]];
  for(const[id,ok]of want)if(ok&&!CMB.tut[id]){cmbTutShow(id);CMB.tutT=40;return}}

/* ---------- 3. dynamic weather (open world) ---------- */
const WX={cur:'clear',t:90,k:{rain:0,fog:0,snow:0,storm:0},T:{rain:0,fog:0,snow:0,storm:0},bolt:rand(6,14),fogC:null,hemiI:null,moonI:null,snowMine:0,au:null};
const WX_STATES={clear:{},rain:{rain:1},storm:{rain:1,storm:1},fog:{fog:1},drizzle:{rain:.45,fog:.35},snow:{snow:1,fog:.3}};
const WX_W=[['clear',40],['rain',18],['drizzle',12],['storm',9],['fog',14],['snow',7]];
const WX_MSG={rain:'Rain over Paris.',storm:'A storm is rolling over Paris.',fog:'Fog rises from the Seine.',drizzle:'A fine drizzle on the cobbles.',snow:'Snow is falling on Paris.'};
function wxSet(s,quiet){if(!WX_STATES[s])return;WX.cur=s;WX.t=rand(150,300);const T=WX_STATES[s];for(const k in WX.T)WX.T[k]=T[k]||0;if(!quiet&&WX_MSG[s]&&MODE==='open')toast(WX_MSG[s])}
function wxPick(){let n=0;for(const w of WX_W)n+=w[1];let r=Math.random()*n;for(const w of WX_W){r-=w[1];if(r<=0)return w[0]===WX.cur?'clear':w[0]}return 'clear'}
WX.mat=new THREE.ShaderMaterial({uniforms:{uC:{value:new THREE.Vector3()},uT:{value:0},uA:{value:0},uW:{value:new THREE.Vector2(2.2,.8)},uCol:{value:new THREE.Color(0xb8c4e0)}},transparent:true,depthWrite:false,fog:false,
  vertexShader:`attribute vec3 p;attribute float e;uniform vec3 uC;uniform float uT;uniform vec2 uW;varying float vE;varying float vD;
void main(){float B=70.,H=44.;float sp=26.+p.x*10.;float y=mod(p.y*H-uT*sp,H);vec3 w=vec3(uC.x+(fract(p.x-uC.x/B)-.5)*B,uC.y-12.+y,uC.z+(fract(p.z-uC.z/B)-.5)*B);
w.xz+=uW*(y/H)*1.5;vec3 d=normalize(vec3(uW.x,-sp,uW.y));w-=d*e*.85;vE=e;vec4 mv=viewMatrix*vec4(w,1.);vD=-mv.z;gl_Position=projectionMatrix*mv;}`,
  fragmentShader:`uniform float uA;uniform vec3 uCol;varying float vE;varying float vD;void main(){float a=uA*(1.-vE*.6)*smoothstep(1.,4.,vD)*(1.-smoothstep(28.,40.,vD));gl_FragColor=vec4(uCol,a*.42);}`});
{const N=7000,p=new Float32Array(N*6),e=new Float32Array(N*2);for(let i=0;i<N;i++){const x=Math.random(),y=Math.random(),z=Math.random();for(let j=0;j<2;j++){p.set([x,y,z],i*6+j*3);e[i*2+j]=j}}
  const g=new THREE.BufferGeometry();g.setAttribute('p',new THREE.BufferAttribute(p,3));g.setAttribute('e',new THREE.BufferAttribute(e,1));g.setAttribute('position',new THREE.BufferAttribute(new Float32Array(N*6),3));
  WX.rain=new THREE.LineSegments(g,WX.mat);WX.rain.frustumCulled=false;WX.rain.visible=false;WX.rain.renderOrder=4;scene.add(WX.rain)}
{const _st=setTOD;setTOD=function(){const r=_st.apply(this,arguments);try{WX.fogC=scene.fog.color.clone();WX.hemiI=hemi.intensity;WX.moonI=moonLight.intensity;WX.dirty=1}catch(x){}return r}}
{const _of=owFogCam;owFogCam=function(){const b=OW.fogBase;const m=1+WX.k.fog*3.2+WX.k.rain*.9+WX.k.snow*1.2;if(b)OW.fogBase=b*m;try{return _of.apply(this,arguments)}finally{OW.fogBase=b}}}
function wxAudio(k,inside){if(!AC||muted)return;if(!WX.au&&k>.01){nbuf();const s=AC.createBufferSource(),f=AC.createBiquadFilter(),f2=AC.createBiquadFilter(),g=AC.createGain();s.buffer=noiseBuf;s.loop=true;f.type='bandpass';f.frequency.value=2400;f.Q.value=.4;f2.type='lowpass';f2.frequency.value=9000;g.gain.value=0;s.connect(f);f.connect(f2);f2.connect(g);g.connect(sfxBus||master);s.start();WX.au={s,g,f2}}
  if(WX.au){WX.au.g.gain.setTargetAtTime(muted?0:k*.1*(inside?.35:1),AC.currentTime,.4);WX.au.f2.frequency.setTargetAtTime(inside?900:9000,AC.currentTime,.3);if(k<.005&&WX.au.g.gain.value<.002){try{WX.au.s.stop()}catch(x){}WX.au=null}}}
function wxBolt(){const a=rand(0,TAU),d=rand(120,320),cx=camera.position.x+Math.sin(a)*d,cz=camera.position.z+Math.cos(a)*d,gy=groundAt(cx,cz);
  lightning(V3(cx+rand(-30,30),gy+220,cz+rand(-30,30)),V3(cx,gy,cz),0xdfe8ff);WX.fl=.22;WX.fl2=rand(.08,.18);
  const dl=Math.min(4,d/340*2.2+.3);noise(2.8,.55,240,'lowpass',null,{delay:dl,brown:true,attack:.02});noise(1.2,.35,900,'lowpass',null,{delay:dl,attack:.01});if(d<180)after(dl,()=>{P.shake=Math.max(P.shake,.35);buzz(40,.3,.5,300)})}
function wxTick(dt){const open=MODE==='open';
  if(open){WX.t-=dt;if(WX.t<=0)wxSet(wxPick())}else for(const k in WX.T)WX.T[k]=0;
  const kr=Math.min(1,dt/(open?12:2));for(const k in WX.k)WX.k[k]+=(WX.T[k]-WX.k[k])*kr;
  const inside=typeof VIN!=='undefined'&&VIN,K=WX.k,R=K.rain*(inside?0:1);
  WX.rain.visible=R>.01;if(WX.rain.visible){WX.mat.uniforms.uC.value.copy(camera.position);WX.mat.uniforms.uT.value=time;WX.mat.uniforms.uA.value=R;
    const n=Math.round(R*14*Math.min(2,dt*60));for(let i=0;i<n;i++){const a=rand(0,TAU),r=rand(1,16),x=P.pos.x+Math.sin(a)*r,z=P.pos.z+Math.cos(a)*r;SP.emit(V3(x,groundAt(x,z)+.05,z),{n:1,c0:0xdfe8ff,c1:0x8090b0,s0:.22,s1:.04,life:.22,speed:1.2,up:1.6,grav:9})}}
  wxAudio(open?K.rain:0,inside);
  if(open&&!inside&&K.storm>.5){WX.bolt-=dt;if(WX.bolt<=0){WX.bolt=rand(5,16);wxBolt()}}
  if(K.snow>.5&&!snow.force){snow.force=true;WX.snowMine=1}else if(K.snow<.4&&WX.snowMine){snow.force=false;WX.snowMine=0}
  if(open&&!inside&&K.fog>.3&&Math.random()<K.fog*.15){const a=rand(0,TAU),r=rand(6,30),x=P.pos.x+Math.sin(a)*r,z=P.pos.z+Math.cos(a)*r;SM.emit(V3(x,groundAt(x,z)+rand(.3,1.5),z),{n:1,c0:0xc8ccd8,c1:0x8a90a0,s0:5,s1:12,speed:.4,life:4,a:.16})}
  if(open&&WX.fogC){const ov=Math.min(1,R*.8+K.fog*.6+K.snow*.4);
    let fl=0;if(WX.fl>0){WX.fl-=dt;fl=WX.fl>.14?1:WX.fl>.08?.15:WX.fl>0?.8:0}
    if(!(ov>.002||fl>0||WX.app))return;WX.app=ov>.002||fl>0;const c=WX.fogC,l=(c.r+c.g+c.b)/3;scene.fog.color.copy(c).lerp(new THREE.Color(l*.92,l*.97,l*1.08),ov*.7);
    hemi.intensity=WX.hemiI*(1-.28*R-.15*K.fog)+fl*2.4;moonLight.intensity=WX.moonI*(1-.5*R-.35*K.fog-.2*K.snow)+fl*1.5;if(fl>0)scene.fog.color.lerp(new THREE.Color(0xc8d4ff),fl*.5)}}

{const _mt=muTick;muTick=function(dt){_mt(dt);try{wxTick(dt)}catch(x){console.warn('wx',x)}try{if(started)cmbTutTick(dt)}catch(x){}}}
