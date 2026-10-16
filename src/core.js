(async()=>{
'use strict';
const $=id=>document.getElementById(id);
const rand=(a,b)=>a+Math.random()*(b-a);
const clamp=(v,a,b)=>v<a?a:v>b?b:v;
const lerp=(a,b,t)=>a+(b-a)*t;
const TAU=Math.PI*2;
const V3=(x=0,y=0,z=0)=>new THREE.Vector3(x,y,z);
function lerpAngle(a,b,t){let d=((b-a+Math.PI)%TAU+TAU)%TAU-Math.PI;return a+d*t}
const isTouch=matchMedia('(pointer:coarse)').matches;
const MODE=(()=>{try{return localStorage.getItem('sorciere-mode')||'story'}catch(e){return'story'}})();
let SAFE=(()=>{try{return localStorage.getItem('sorciere-safe')==='1'}catch(e){return false}})();
if(isTouch)document.body.classList.add('touch');
/* ---------- preload: real Paris + rigged characters ---------- */
const PRE=await (async()=>{const msg=document.getElementById('loadMsg');const set=t=>{if(msg)msg.textContent=t};const out={gltf:{},tex:{},city:null,err:null};
  const files=['body_f','body_m','hair_long','hair_buns','hair_buzzed','hair_buzzedfemale','hair_simpleparted','hair_beard','wizard_f','wizard_m','hood_f','hood_m','anims'];
  const texs=['skin_f','skin_m','skin_f_n','skin_m_n','skin_f_r','skin_m_r','hair1','hair1_n','hair2','hair2_n','eye','wizard','wizard_n','wizard_orm','ranger','ranger_n'];
  let done=0;const total=files.length+texs.length+(MODE==='open'?1:0);const tick=()=>{done++;set(`Loading Paris… ${Math.round(done/total*100)}%`)};set('Loading Paris… 0%');
  try{const L=new THREE.GLTFLoader();if(window.MeshoptDecoder)L.setMeshoptDecoder(MeshoptDecoder);const TL=new THREE.TextureLoader();
    const jobs=files.map(f=>new Promise(r=>L.load('assets/'+f+'.wasm',g=>{out.gltf[f]=g;tick();r()},undefined,e=>{out.err=e;tick();r()})));
    for(const t of texs)jobs.push(new Promise(r=>TL.load('assets/'+t+'.webp',x=>{x.flipY=false;if(!/_n$|_r$|_orm$/.test(t))x.encoding=THREE.sRGBEncoding;x.anisotropy=4;out.tex[t]=x;tick();r()},undefined,e=>{tick();r()})));
    if(MODE==='open')jobs.push(fetch('assets/paris.wasm').then(r=>r.ok?r.arrayBuffer():null).then(b=>{out.city=b;tick()}).catch(e=>{out.err=e;tick()}));
    await Promise.all(jobs)}catch(e){out.err=e}
  set(out.err?'Some assets failed to load. Playing with fallbacks.':'');if(msg&&!out.err)msg.classList.add('hidden');return out})();

/* ---------- save ---------- */
const SAVE_KEY='sorciere-paris-v3';
function loadSave(){try{const s=localStorage.getItem(SAVE_KEY);return s?JSON.parse(s):null}catch(e){return null}}
function writeSave(){try{localStorage.setItem(SAVE_KEY,JSON.stringify({level:P.level,xp:P.xp,weak:P.weak,got:P.stonesGot,beaten:[...beaten],kills:STATS.kills,time:STATS.time,won:STATS.won,hero:HERO.g,name:HERO.name,diff:DIFF,bar:P.bar,taught:[...P.taught],bq:typeof BQ!=='undefined'?BQ.save():null,cleared:typeof CLEARED!=='undefined'?[...CLEARED]:[]}))}catch(e){}}
function clearSave(){try{localStorage.removeItem(SAVE_KEY)}catch(e){}}

/* ---------- audio ---------- */
let AC=null,muted=false,musicOn=true,master=null,musicGain=null,verb=null,verbIn=null,comp=null,sfxBus=null,SFXDUCK=0;
function initAudio(){if(AC){if(AC.state==='suspended')AC.resume();return}try{AC=new(window.AudioContext||window.webkitAudioContext)();comp=AC.createDynamicsCompressor();comp.threshold.value=-14;comp.ratio.value=4;comp.connect(AC.destination);
  master=AC.createGain();master.gain.value=.9;master.connect(comp);musicGain=AC.createGain();musicGain.gain.value=.5;musicGain.connect(master);sfxBus=AC.createGain();sfxBus.gain.value=1;sfxBus.connect(master);
  verb=AC.createConvolver();const len=AC.sampleRate*2.4,ir=AC.createBuffer(2,len,AC.sampleRate);for(let c=0;c<2;c++){const d=ir.getChannelData(c);for(let i=0;i<len;i++)d[i]=(Math.random()*2-1)*Math.pow(1-i/len,2.6)}verb.buffer=ir;
  verbIn=AC.createGain();verbIn.gain.value=.35;verbIn.connect(verb);verb.connect(master);musicGain.connect(verbIn)}catch(e){}}
function out(dest,pan,wet){const g=AC.createGain();let n=g;if(AC.createStereoPanner&&pan){const p=AC.createStereoPanner();p.pan.value=clamp(pan,-1,1);g.connect(p);n=p}n.connect(dest||sfxBus||master);if(wet&&verbIn){const w=AC.createGain();w.gain.value=wet;g.connect(w);w.connect(verbIn)}return g}
function tone(f,dur,type='sine',vol=.12,slide=1,delay=0,dest,wet=.2,pan=0){if(!AC||muted)return;const t=AC.currentTime+delay;const o=AC.createOscillator(),g=AC.createGain();
  o.type=type;o.frequency.setValueAtTime(f,t);if(slide!==1)o.frequency.exponentialRampToValueAtTime(Math.max(30,f*slide),t+dur);
  g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(vol,t+.008);g.gain.exponentialRampToValueAtTime(.0008,t+dur);o.connect(g);g.connect(out(dest,pan,wet));o.start(t);o.stop(t+dur+.02)}
function pad(f,dur,vol,delay=0){if(!AC||muted||!musicOn)return;const t=AC.currentTime+delay;const o=AC.createOscillator(),o2=AC.createOscillator(),g=AC.createGain(),flt=AC.createBiquadFilter();
  o.type='sawtooth';o2.type='triangle';o.frequency.value=f;o2.frequency.value=f*1.005;flt.type='lowpass';flt.frequency.value=900;
  g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(vol,t+dur*.35);g.gain.linearRampToValueAtTime(0,t+dur);
  o.connect(flt);o2.connect(flt);flt.connect(g);g.connect(musicGain);o.start(t);o2.start(t);o.stop(t+dur+.05);o2.stop(t+dur+.05)}
let noiseBuf=null,brownBuf=null;
function nbuf(){if(!noiseBuf){noiseBuf=AC.createBuffer(1,AC.sampleRate*2,AC.sampleRate);const d=noiseBuf.getChannelData(0);for(let i=0;i<d.length;i++)d[i]=Math.random()*2-1;
  brownBuf=AC.createBuffer(1,AC.sampleRate*4,AC.sampleRate);const b=brownBuf.getChannelData(0);let l=0;for(let i=0;i<b.length;i++){l=(l+.02*(Math.random()*2-1))/1.02;b[i]=l*3.5}}return noiseBuf}
function noise(dur,vol=.2,freq=900,type='lowpass',dest,o={}){if(!AC||muted)return;nbuf();const t=AC.currentTime+(o.delay||0),s=AC.createBufferSource(),f=AC.createBiquadFilter(),g=AC.createGain();s.buffer=o.brown?brownBuf:noiseBuf;s.loop=true;
  f.type=type;f.Q.value=o.q||.8;f.frequency.setValueAtTime(freq,t);if(o.f1)f.frequency.exponentialRampToValueAtTime(o.f1,t+dur);else if(type==='lowpass')f.frequency.exponentialRampToValueAtTime(Math.max(60,freq*.1),t+dur);
  const at=o.attack||.005;g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(vol,t+at);g.gain.exponentialRampToValueAtTime(.0008,t+dur);s.connect(f);f.connect(g);g.connect(out(dest,o.pan,o.wet===undefined?.25:o.wet));s.start(t,Math.random());s.stop(t+dur+.05)}
function crackle(dur,n,vol,f0=1200,f1=5000){for(let k=0;k<n;k++){const d=Math.random()*dur;noise(rand(.01,.035),vol*rand(.3,1),rand(f0,f1),'bandpass',null,{delay:d,q:2,wet:.15,pan:rand(-.6,.6)})}}
function shimmer(n,base,vol,dur=.8){for(let k=0;k<n;k++)tone(base*rand(1,3.2),rand(.2,dur),'sine',vol*rand(.4,1),rand(.98,1.03),rand(0,.25),null,.5,rand(-.7,.7))}
function whoosh(dur,f0,f1,vol,o={}){noise(dur,vol,f0,'bandpass',null,Object.assign({f1,q:1.4,attack:dur*.35,wet:.3},o))}
function thud(vol=.3,f=110){tone(f,.35,'sine',vol,.4,0,null,.15);noise(.12,vol*.5,500,'lowpass')}
// formant voice: vowels a e i o u
const VOW={a:[800,1200,2500],e:[450,1900,2600],i:[300,2300,3000],o:[500,850,2400],u:[350,750,2200],é:[400,2100,2700],ou:[320,800,2300],an:[650,1050,2450],eu:[420,1500,2400]};
const VKEYS=Object.keys(VOW);
function voice(pitch=180,syl=4,o={}){if(!AC||muted)return;nbuf();const t0=AC.currentTime+(o.delay||0);const scream=o.scream,vol=(o.vol||.09)*(scream?1.5:1),pan=o.pan||0;let t=t0;
  const src=AC.createOscillator();src.type='sawtooth';const src2=AC.createOscillator();src2.type='sawtooth';const g2=AC.createGain();g2.gain.value=scream?.6:.25;src2.connect(g2);
  const vib=AC.createOscillator(),vg=AC.createGain();vib.frequency.value=scream?9:5.2;vg.gain.value=pitch*(scream?.06:.012);vib.connect(vg);vg.connect(src.frequency);vg.connect(src2.frequency);
  const tilt=AC.createBiquadFilter();tilt.type='lowpass';tilt.frequency.value=pitch>190?3400:2600;src.connect(tilt);g2.connect(tilt);
  const br=AC.createBufferSource();br.buffer=noiseBuf;br.loop=true;const bg=AC.createGain();bg.gain.value=scream?.35:.1;br.connect(bg);
  const gain=AC.createGain();gain.gain.value=0;const dest=out(null,pan,o.wet===undefined?.2:o.wet);gain.connect(dest);
  const fs=[0,1,2].map(i=>{const f=AC.createBiquadFilter();f.type='bandpass';f.Q.value=[5,9,11][i];const g=AC.createGain();g.gain.value=[1,.5,.22][i];tilt.connect(f);bg.connect(f);f.connect(g);g.connect(gain);return f});
  const body=AC.createBiquadFilter();body.type='lowpass';body.frequency.value=pitch*2.2;tilt.connect(body);const bgn=AC.createGain();bgn.gain.value=.35;body.connect(bgn);bgn.connect(gain);
  const fk=pitch>200?1.14:pitch<120?.92:1;const accent=(Math.random()*syl)|0;
  for(let s=0;s<syl;s++){const last=s===syl-1;
    if(!scream&&s>0&&Math.random()<.72){const k=Math.random();const cd=k<.45?.022:k<.75?.07:.05;
      if(k<.45)noise(cd,vol*.55,rand(1500,4200),'bandpass',null,{delay:t-AC.currentTime,q:1.4,wet:.08,pan});else if(k<.75)noise(cd,vol*.3,k<.6?5200:2800,'highpass',null,{delay:t-AC.currentTime,wet:.08,pan,attack:.01});
      else{gain.gain.setValueAtTime(vol*.35,t);fs[0].frequency.setValueAtTime(260*fk,t);fs[1].frequency.setValueAtTime(1100*fk,t)}t+=cd}
    const v=scream?VOW[Math.random()<.5?'a':'é']:VOW[VKEYS[(Math.random()*VKEYS.length)|0]];const d=scream?rand(.5,.85):(last?rand(.16,.28):rand(.08,.17));
    const decl=1.08-.18*(s/Math.max(1,syl-1));const acc=s===accent?1.12:1;let p=pitch*decl*acc*rand(.97,1.03);if(scream)p=pitch*(1.7+s*.12);
    const pEnd=scream?p*1.3:last&&o.q?p*1.3:last?p*.86:p*rand(.95,1.04);
    src.frequency.setValueAtTime(p,t);src.frequency.linearRampToValueAtTime(pEnd,t+d);src2.frequency.setValueAtTime(p*1.006,t);src2.frequency.linearRampToValueAtTime(pEnd*1.006,t+d);
    fs.forEach((f,i)=>{f.frequency.setValueAtTime(f.frequency.value||v[i]*fk,t);f.frequency.linearRampToValueAtTime(v[i]*fk,t+.03)});
    gain.gain.setValueAtTime(0,t);gain.gain.linearRampToValueAtTime(vol,t+.018);gain.gain.setValueAtTime(vol*(last?.8:1),t+d*.7);gain.gain.linearRampToValueAtTime(0,t+d);t+=d+rand(.015,scream?.02:.06)}
  const end=t+.05;src.start(t0);src2.start(t0);vib.start(t0);br.start(t0,Math.random());src.stop(end);src2.stop(end);vib.stop(end);br.stop(end)}
function bark(size=1,pan=0){if(!AC||muted)return;for(let k=0;k<2;k++){const d=k*.22;const p=(380-size*120)*rand(.95,1.05);tone(p,.13,'sawtooth',.07,.55,d,null,.2,pan);noise(.09,.08,1200/size,'bandpass',null,{delay:d,q:2,pan});tone(p*2,.08,'square',.02,.5,d,null,.1,pan)}}
let sirenNode=null;
function siren(on){if(!AC)return;if(on&&!sirenNode&&!muted){const o=AC.createOscillator(),g=AC.createGain(),f=AC.createBiquadFilter(),l=AC.createOscillator(),lg=AC.createGain();o.type='square';f.type='lowpass';f.frequency.value=1800;
    l.type='square';l.frequency.value=.9;lg.gain.value=75;l.connect(lg);lg.connect(o.frequency);o.frequency.value=510;g.gain.value=.025;o.connect(f);f.connect(g);g.connect(out(null,0,.35));o.start();l.start();sirenNode={o,l,g}}
  else if(!on&&sirenNode){const n=sirenNode;sirenNode=null;n.g.gain.setTargetAtTime(0,AC.currentTime,.3);setTimeout(()=>{try{n.o.stop();n.l.stop()}catch(e){}},1500)}}
function applause(dur=2){crackle(dur,Math.round(dur*120),.05,1500,6000);voice(260,2,{vol:.03,delay:.3,wet:.5})}
let ambNode=null;function ambience(on,vol=.06){if(!AC||muted)return;if(on&&!ambNode){nbuf();const s=AC.createBufferSource();s.buffer=brownBuf;s.loop=true;const f=AC.createBiquadFilter();f.type='lowpass';f.frequency.value=380;const g=AC.createGain();g.gain.value=vol;s.connect(f);f.connect(g);g.connect(master);s.start();ambNode={s,g}}else if(!on&&ambNode){ambNode.s.stop();ambNode=null}}
// generative music
const CHORDS=[[110,130.8,164.8],[87.3,110,130.8],[98,116.5,146.8],[82.4,98,123.5]];let musicT=0,chordI=0,beatT=0;
function updateMusic(dt,boss){if(!AC||muted||!musicOn)return;musicT-=dt;if(musicT<=0){musicT=boss?3.2:5.5;const c=CHORDS[chordI++%CHORDS.length];c.forEach((f,i)=>pad(f*(boss?1:2),musicT+1.5,boss?.045:.03,i*.05));if(Math.random()<.5)tone(c[2]*4,1.8,'sine',.02,1,1,musicGain)}
  if(boss){beatT-=dt;if(beatT<=0){beatT=.5;tone(55,.35,'sine',.16,.5,0,musicGain);if(Math.random()<.4)noise(.1,.05,3000,'highpass',musicGain)}}}
const sfx={
  bolt:()=>{whoosh(.35,900,3500,.12);tone(1320,.3,'sine',.04,.7,0,null,.5);shimmer(2,1800,.02,.3)},
  fire:()=>{whoosh(.6,300,1400,.22);noise(.8,.12,200,'lowpass',null,{brown:true,attack:.05});crackle(.7,18,.1)},
  ice:()=>{whoosh(.3,2500,7000,.1);shimmer(5,2200,.035,.6);noise(.2,.05,8000,'highpass')},
  frost:()=>{noise(1,.14,6000,'highpass',null,{attack:.1,wet:.6});shimmer(9,1600,.04,1.2);tone(220,1,'sine',.06,.5,0,null,.6)},
  shatter:()=>{crackle(.25,14,.12,3000,9000);shimmer(4,3000,.03,.4)},
  chains:()=>{for(let k=0;k<5;k++)tone(rand(1800,3200),.12,'triangle',.03,.9,k*.07,null,.3);noise(.5,.1,700,'lowpass',null,{brown:true})},
  chain:()=>{noise(.5,.35,6000,'lowpass',null,{wet:.5});crackle(.3,20,.14,2000,8000);noise(1.2,.12,300,'lowpass',null,{brown:true,delay:.1,wet:.7})},
  inferno:()=>{noise(1.6,.2,800,'bandpass',null,{f1:2500,attack:.2,q:.6});noise(1.6,.2,160,'lowpass',null,{brown:true,attack:.2});crackle(1.5,50,.1)},
  meteor:()=>{whoosh(1,3000,300,.2,{wet:.4})},
  boom:()=>{tone(70,1,'sine',.35,.35,0,null,.4);noise(1.4,.4,1400,'lowpass',null,{wet:.6});crackle(.4,20,.12,800,3000);noise(1.8,.15,120,'lowpass',null,{brown:true,delay:.1})},
  void:()=>{tone(55,2.2,'sine',.18,.5,0,null,.6);tone(110,2,'triangle',.05,.45,0,null,.8);whoosh(2,200,60,.1,{wet:.8})},
  blink:()=>{whoosh(.22,600,6000,.14);shimmer(2,2400,.02,.2)},
  jump:()=>{whoosh(.2,500,1500,.06,{wet:.05});noise(.06,.05,300,'lowpass')},
  fly:()=>{whoosh(.8,300,2400,.14);shimmer(4,1200,.025,.8)},
  land:()=>{thud(.18,90)},
  hit:()=>{thud(.3,130);noise(.08,.1,2500,'bandpass',null,{q:1})},
  kill:()=>{tone(280,.3,'triangle',.05,.5);noise(.3,.08,900,'lowpass')},
  squeal:()=>{voice(520,1,{scream:true,vol:.05})},
  hiss:()=>noise(.4,.08,5000,'highpass',null,{attack:.05}),
  roar:()=>{voice(70,1,{scream:true,vol:.12,wet:.6});noise(1.2,.2,500,'lowpass',null,{brown:true,wet:.5})},
  level:()=>{[0,.1,.2,.3].forEach((d,i)=>tone([523,659,784,1047][i],.7,'triangle',.07,1,d,null,.6));shimmer(6,2000,.02,1)},
  gem:()=>{[0,.09,.18].forEach((d,i)=>tone([988,1319,1760][i],.8,'sine',.07,1,d,null,.6))},
  potion:()=>{tone(660,.3,'sine',.07,1.5);noise(.3,.05,2000,'bandpass',null,{f1:600,q:4})},
  warn:()=>tone(220,.5,'square',.03,.9,0,null,.3),
  blip:()=>tone(1200,.03,'square',.01,1,0,null,0),
  bossIn:()=>{tone(55,2.5,'sawtooth',.1,1.2,0,null,.7);tone(82,2.5,'sawtooth',.06,.9,0,null,.7);noise(2.5,.1,200,'lowpass',null,{brown:true,attack:.8})},
  die:()=>{tone(300,1.4,'sawtooth',.06,.2,0,null,.6);noise(1,.1,500)},
  coin:()=>{tone(1568,.12,'square',.03,1,0,null,.2);tone(2093,.3,'square',.03,1,.08,null,.3)},
  whistle:()=>{tone(2800,.5,'sine',.06,1,0,null,.3);tone(2800,.25,'sine',.06,1,.55,null,.3)}
};
/* ---------- renderer ---------- */
const canvas=$('c');
const renderer=new THREE.WebGLRenderer({canvas,antialias:true,powerPreference:'high-performance'});
let PR=Math.min(window.devicePixelRatio||1,isTouch?1.5:2);
renderer.setPixelRatio(PR);renderer.setSize(innerWidth,innerHeight);
renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;
renderer.physicallyCorrectLights=false;
const scene=new THREE.Scene();
scene.background=new THREE.Color(0x1a1638);
const FOG_NIGHT=new THREE.Color(0x201a44),FOG_DAWN=new THREE.Color(0xd89a8a),FOG_SNOW=new THREE.Color(0x8a9ac8);
scene.fog=new THREE.FogExp2(FOG_NIGHT.getHex(),.0098);
const camera=new THREE.PerspectiveCamera(60,innerWidth/innerHeight,.1,800);
const hemi=new THREE.HemisphereLight(0x7a80d0,0x30222e,.85);scene.add(hemi);
const moonLight=new THREE.DirectionalLight(0xc0caff,.75);moonLight.position.set(-80,120,-60);scene.add(moonLight);scene.add(moonLight.target);
moonLight.castShadow=true;moonLight.shadow.mapSize.set(2048,2048);
{const c=moonLight.shadow.camera;c.left=-30;c.right=30;c.top=30;c.bottom=-30;c.near=1;c.far=180}
moonLight.shadow.bias=-.0008;moonLight.shadow.normalBias=.03;

let composer=null,bloomPass=null,gradePass=null,fxaaPass=null,bokehPass=null,useComposer=true;
const GradeShader={uniforms:{tDiffuse:{value:null},uTime:{value:0},uSat:{value:1.15},uWeak:{value:0},uCA:{value:1},uLift:{value:0},uSharp:{value:0},uRes:{value:new THREE.Vector2(1/1100,1/650)}},
  vertexShader:'varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}',
  fragmentShader:`uniform sampler2D tDiffuse;uniform float uTime,uSat,uWeak,uCA,uLift,uSharp;uniform vec2 uRes;varying vec2 vUv;
  float h(vec2 p){return fract(sin(dot(p,vec2(12.9898,78.233)))*43758.5453);}
  void main(){vec2 c=vUv-.5;float d=length(c);vec2 off=c*d*.007*uCA;vec3 col;
  col.r=texture2D(tDiffuse,vUv+off).r;col.g=texture2D(tDiffuse,vUv).g;col.b=texture2D(tDiffuse,vUv-off).b;
  if(uSharp>0.0){vec3 nb=texture2D(tDiffuse,vUv+vec2(uRes.x,0.)).rgb+texture2D(tDiffuse,vUv-vec2(uRes.x,0.)).rgb+texture2D(tDiffuse,vUv+vec2(0.,uRes.y)).rgb+texture2D(tDiffuse,vUv-vec2(0.,uRes.y)).rgb;col+=(col-nb*.25)*uSharp;}
  float l=dot(col,vec3(.299,.587,.114));col=mix(vec3(l),col,uSat*(1.0-uWeak*.65));
  col=(col-.5)*1.08+.5+uLift;col=mix(col,col*vec3(1.05,.98,1.08),smoothstep(.0,.6,1.0-l));
  col*=1.0-smoothstep(.42,.95,d)*.6;col+=(h(vUv*(uTime+1.0))-.5)*.022;gl_FragColor=vec4(max(col,0.0),1.0);}`};
try{if(THREE.EffectComposer&&THREE.UnrealBloomPass&&THREE.RenderPass&&THREE.ShaderPass){{const rt=new THREE.WebGLRenderTarget(innerWidth*renderer.getPixelRatio(),innerHeight*renderer.getPixelRatio(),{minFilter:THREE.LinearFilter,magFilter:THREE.LinearFilter,format:THREE.RGBAFormat,stencilBuffer:true});composer=new THREE.EffectComposer(renderer,rt)}composer.addPass(new THREE.RenderPass(scene,camera));
  if(THREE.BokehPass){try{bokehPass=new THREE.BokehPass(scene,camera,{focus:8,aperture:.0006,maxblur:.008,width:innerWidth,height:innerHeight});bokehPass.enabled=false;composer.addPass(bokehPass)}catch(e){bokehPass=null}}
  bloomPass=new THREE.UnrealBloomPass(new THREE.Vector2(innerWidth,innerHeight),.4,.42,.84);composer.addPass(bloomPass);
  gradePass=new THREE.ShaderPass(GradeShader);composer.addPass(gradePass);
  if(THREE.FXAAShader){fxaaPass=new THREE.ShaderPass(THREE.FXAAShader);composer.addPass(fxaaPass)}}}catch(e){composer=null}
function resize(){renderer.setSize(innerWidth,innerHeight);if(composer){composer.setPixelRatio&&composer.setPixelRatio(renderer.getPixelRatio());composer.setSize(innerWidth,innerHeight);
  if(fxaaPass)fxaaPass.material.uniforms.resolution.value.set(1/(innerWidth*renderer.getPixelRatio()),1/(innerHeight*renderer.getPixelRatio()));if(gradePass)gradePass.uniforms.uRes.value.set(1/(innerWidth*renderer.getPixelRatio()),1/(innerHeight*renderer.getPixelRatio()))}
  camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix()}
addEventListener('resize',resize);resize();

/* ---------- textures ---------- */
function mkCanvas(w,h,draw){const c=document.createElement('canvas');c.width=w;c.height=h;draw(c.getContext('2d'),w,h);return c}
function canvasTex(w,h,draw){return new THREE.CanvasTexture(mkCanvas(w,h,draw))}
function heightToNormal(src,strength=2){const w=src.width,h=src.height,sx=src.getContext('2d').getImageData(0,0,w,h).data;const out=mkCanvas(w,h,()=>{});const ctx=out.getContext('2d');const id=ctx.createImageData(w,h);const d=id.data;
  const H=(x,y)=>sx[(((y+h)%h)*w+((x+w)%w))*4]/255;
  for(let y=0;y<h;y++)for(let x=0;x<w;x++){const dx=(H(x+1,y)-H(x-1,y))*strength,dy=(H(x,y+1)-H(x,y-1))*strength;const l=Math.hypot(dx,dy,1);const i=(y*w+x)*4;d[i]=(-dx/l*.5+.5)*255;d[i+1]=(dy/l*.5+.5)*255;d[i+2]=(1/l*.5+.5)*255;d[i+3]=255}
  ctx.putImageData(id,0,0);return new THREE.CanvasTexture(out)}
function rep(t,x,y){t.wrapS=t.wrapT=THREE.RepeatWrapping;t.repeat.set(x,y);t.anisotropy=8;return t}
const glowTex=canvasTex(64,64,(x)=>{const g=x.createRadialGradient(32,32,0,32,32,32);g.addColorStop(0,'rgba(255,255,255,1)');g.addColorStop(.22,'rgba(255,255,255,.65)');g.addColorStop(.55,'rgba(255,255,255,.15)');g.addColorStop(1,'rgba(255,255,255,0)');x.fillStyle=g;x.fillRect(0,0,64,64)});
const fireTex=canvasTex(64,64,(x)=>{const g=x.createRadialGradient(32,34,0,32,32,32);g.addColorStop(0,'rgba(255,255,255,1)');g.addColorStop(.35,'rgba(255,255,255,.55)');g.addColorStop(1,'rgba(255,255,255,0)');x.fillStyle=g;x.fillRect(0,0,64,64)});
const smokeTex=canvasTex(128,128,(x)=>{for(let k=0;k<18;k++){const cx=rand(35,93),cy=rand(35,93),r=rand(18,40);const g=x.createRadialGradient(cx,cy,0,cx,cy,r);g.addColorStop(0,'rgba(255,255,255,.35)');g.addColorStop(1,'rgba(255,255,255,0)');x.fillStyle=g;x.fillRect(0,0,128,128)}});
const runeTex=canvasTex(512,512,(x)=>{x.translate(256,256);x.strokeStyle='#fff';x.fillStyle='#fff';x.lineWidth=6;
  x.beginPath();x.arc(0,0,240,0,TAU);x.stroke();x.lineWidth=3;x.beginPath();x.arc(0,0,214,0,TAU);x.stroke();x.beginPath();x.arc(0,0,120,0,TAU);x.stroke();
  x.lineWidth=4;x.beginPath();for(let i=0;i<=7;i++){const a=i*TAU*3/7-Math.PI/2;const px=Math.cos(a)*214,py=Math.sin(a)*214;i?x.lineTo(px,py):x.moveTo(px,py)}x.stroke();
  x.font='bold 30px Georgia';x.textAlign='center';x.textBaseline='middle';const gl='ᚠᚢᚦᚨᚱᚲᚷᚹᚺᚾᛁᛃᛇᛈᛉᛊᛏᛒᛖᛗᛚᛜᛞᛟ';
  for(let i=0;i<24;i++){x.save();x.rotate(i*TAU/24);x.fillText(gl[i],0,-227);x.restore()}
  for(let i=0;i<12;i++){x.save();x.rotate(i*TAU/12);x.fillRect(-2,-120,4,-26);x.restore()}
  x.lineWidth=3;x.beginPath();x.arc(0,0,40,0,TAU);x.stroke()});
const frostTex=canvasTex(256,256,(x)=>{x.translate(128,128);const g=x.createRadialGradient(0,0,0,0,0,128);g.addColorStop(0,'rgba(255,255,255,.7)');g.addColorStop(.7,'rgba(255,255,255,.35)');g.addColorStop(1,'rgba(255,255,255,0)');x.fillStyle=g;x.fillRect(-128,-128,256,256);
  x.strokeStyle='rgba(255,255,255,.9)';x.lineWidth=2;for(let i=0;i<26;i++){let a=rand(0,TAU),r=0;x.beginPath();x.moveTo(0,0);while(r<120){r+=rand(10,22);a+=rand(-.3,.3);x.lineTo(Math.cos(a)*r,Math.sin(a)*r)}x.stroke()}});
const scorchTex=canvasTex(128,128,(x)=>{const g=x.createRadialGradient(64,64,0,64,64,64);g.addColorStop(0,'rgba(0,0,0,.85)');g.addColorStop(.6,'rgba(10,5,5,.5)');g.addColorStop(1,'rgba(0,0,0,0)');x.fillStyle=g;x.fillRect(0,0,128,128)});
const webTex=canvasTex(128,128,(x)=>{x.translate(64,64);x.strokeStyle='rgba(255,255,255,.9)';x.lineWidth=1.5;for(let i=0;i<10;i++){const a=i*TAU/10;x.beginPath();x.moveTo(0,0);x.lineTo(Math.cos(a)*62,Math.sin(a)*62);x.stroke()}for(let r=8;r<62;r+=8){x.beginPath();for(let i=0;i<=10;i++){const a=i*TAU/10;const rr=r+rand(-2,2);i?x.lineTo(Math.cos(a)*rr,Math.sin(a)*rr):x.moveTo(Math.cos(a)*rr,Math.sin(a)*rr)}x.stroke()}});
// fur strand noise for shell fur
const furNoise=(()=>{const t=canvasTex(128,128,(x,w,h)=>{const id=x.createImageData(w,h);for(let i=0;i<w*h;i++){const v=Math.random()<.55?Math.pow(Math.random(),.6)*255:0;id.data[i*4]=id.data[i*4+1]=id.data[i*4+2]=v;id.data[i*4+3]=255}x.putImageData(id,0,0)});rep(t,1,1);t.magFilter=THREE.NearestFilter;return t})();
function noiseCanvas(w,h,base,spread,blobs){return mkCanvas(w,h,(x)=>{x.fillStyle=base;x.fillRect(0,0,w,h);for(let k=0;k<blobs;k++){const r=rand(2,w/6),cx=rand(0,w),cy=rand(0,h);const g=x.createRadialGradient(cx,cy,0,cx,cy,r);const v=rand(-spread,spread);g.addColorStop(0,v>0?`rgba(255,255,255,${v})`:`rgba(0,0,0,${-v})`);g.addColorStop(1,'rgba(0,0,0,0)');x.fillStyle=g;x.fillRect(cx-r,cy-r,r*2,r*2)}})}
// creature skins
const pigSkin=(()=>{const c=mkCanvas(512,256,(x,w,h)=>{x.fillStyle='#e8c9c0';x.fillRect(0,0,w,h);for(let k=0;k<300;k++){x.fillStyle=`rgba(${rand(150,200)|0},${rand(100,130)|0},${rand(110,130)|0},${rand(.05,.15)})`;x.beginPath();x.arc(rand(0,w),rand(0,h),rand(4,30),0,TAU);x.fill()}
  x.strokeStyle='rgba(170,20,30,.75)';for(let k=0;k<60;k++){let px=rand(0,w),py=rand(0,h),a=rand(0,TAU);x.lineWidth=rand(.8,2.4);x.beginPath();x.moveTo(px,py);for(let s=0;s<14;s++){a+=rand(-.6,.6);px+=Math.cos(a)*9;py+=Math.sin(a)*9;x.lineTo(px,py)}x.stroke()}});
  return{map:new THREE.CanvasTexture(c),normal:heightToNormal(c,3)}})();
const hideTex=(col,dark,streak)=>{const c=mkCanvas(256,256,(x,w,h)=>{x.fillStyle=col;x.fillRect(0,0,w,h);for(let k=0;k<2400;k++){x.strokeStyle=Math.random()<.5?dark:streak;x.globalAlpha=rand(.15,.5);x.lineWidth=rand(.5,1.5);const px=rand(0,w),py=rand(0,h);x.beginPath();x.moveTo(px,py);x.lineTo(px+rand(-3,3),py+rand(4,12));x.stroke()}x.globalAlpha=1});
  const t=new THREE.CanvasTexture(c);t.wrapS=t.wrapT=THREE.RepeatWrapping;return{map:t,normal:rep(heightToNormal(c,1.5),1,1)}};
const TX={spider:hideTex('#5a2f1c','#1c0d08','#c08a50'),redfur:hideTex('#8a1a14','#3a0806','#d04030'),whitefur:hideTex('#e6e6f0','#9a9ab0','#ffffff'),mane:hideTex('#c9b08a','#5a4228','#f0e0c0'),
  ice:(()=>{const c=noiseCanvas(256,256,'#9fd8f0',.35,160);const x=c.getContext('2d');x.strokeStyle='rgba(255,255,255,.7)';for(let k=0;k<40;k++){x.lineWidth=rand(.5,2);x.beginPath();let px=rand(0,256),py=rand(0,256);x.moveTo(px,py);for(let s=0;s<5;s++){px+=rand(-30,30);py+=rand(-30,30);x.lineTo(px,py)}x.stroke()}return{map:new THREE.CanvasTexture(c),normal:heightToNormal(c,4)}})(),
  bone:(()=>{const c=noiseCanvas(256,256,'#ece6da',.25,200);const x=c.getContext('2d');x.strokeStyle='rgba(90,70,50,.5)';for(let k=0;k<30;k++){x.lineWidth=rand(.5,1.5);x.beginPath();let px=rand(0,256),py=rand(0,256);x.moveTo(px,py);for(let s=0;s<4;s++){px+=rand(-20,20);py+=rand(-20,20);x.lineTo(px,py)}x.stroke()}return{map:new THREE.CanvasTexture(c),normal:heightToNormal(c,3)}})(),
  mask:(()=>{const c=mkCanvas(512,256,(x,w,h)=>{x.fillStyle='#f0ece4';x.fillRect(0,0,w,h);x.strokeStyle='#b0101c';x.lineCap='round';
    for(const s of[-1,1]){x.lineWidth=7;x.beginPath();x.moveTo(w/2+s*30,60);x.bezierCurveTo(w/2+s*80,40,w/2+s*110,90,w/2+s*150,70);x.stroke();x.lineWidth=4;x.beginPath();x.moveTo(w/2+s*50,110);x.lineTo(w/2+s*120,120);x.stroke();
      for(let k=0;k<5;k++){x.beginPath();x.arc(w/2+s*(40+k*18),170,3,0,TAU);x.fillStyle='#b0101c';x.fill()}}
    x.lineWidth=5;x.beginPath();x.moveTo(w/2,30);x.lineTo(w/2,90);x.stroke()});return new THREE.CanvasTexture(c)})()};
function glowSprite(color,scale,opacity=1,fog=true){const m=new THREE.SpriteMaterial({map:glowTex,color,blending:THREE.AdditiveBlending,depthWrite:false,transparent:true,opacity,fog});const s=new THREE.Sprite(m);s.scale.setScalar(scale);return s}
const FXDIM=.55;function fxCol(c,k=FXDIM){return new THREE.Color(c).multiplyScalar(k)}
function decal(tex,color,size,additive=true,opacity=1){const m=new THREE.Mesh(new THREE.PlaneGeometry(size,size),new THREE.MeshBasicMaterial({map:tex,color:additive?fxCol(color):color,transparent:true,opacity,depthWrite:false,blending:additive?THREE.AdditiveBlending:THREE.NormalBlending,side:THREE.DoubleSide}));m.rotation.x=-Math.PI/2;return m}

/* ---------- material helpers: rim light + shell fur ---------- */
function rimify(mat,color,power=2.5,strength=.8){const c=new THREE.Color(color);const prev=mat.onBeforeCompile;
  mat.onBeforeCompile=(sh)=>{sh.uniforms.uRimC={value:c};sh.uniforms.uRimP={value:power};sh.uniforms.uRimS={value:strength};
    sh.fragmentShader='uniform vec3 uRimC;uniform float uRimP;uniform float uRimS;\n'+sh.fragmentShader.replace('#include <emissivemap_fragment>','#include <emissivemap_fragment>\n{float rimF=pow(1.0-clamp(dot(normal,normalize(vViewPosition)),0.0,1.0),uRimP);totalEmissiveRadiance+=uRimC*rimF*uRimS;}')};
  mat.customProgramCacheKey=()=>'rim';return mat}
const FUR_N={value:7};
function furShells(mesh,{color=0xffffff,len=.25,rep=6,droop=.5,shells,map,rim=0x000000}={}){const n=shells!==undefined?shells:FUR_N.value;const g=new THREE.Group();
  for(let i=1;i<=n;i++){const k=i/n;const m=new THREE.MeshStandardMaterial({color,map:map||null,roughness:.95,metalness:0,transparent:false});
    m.onBeforeCompile=(sh)=>{sh.uniforms.uK={value:k};sh.uniforms.uLen={value:len};sh.uniforms.uRep={value:rep};sh.uniforms.uDroop={value:droop};sh.uniforms.uFur={value:furNoise};sh.uniforms.uRim={value:new THREE.Color(rim)};
      sh.vertexShader='uniform float uK;uniform float uLen;uniform float uDroop;uniform float uRep;varying vec2 vFurUv;\n'+sh.vertexShader.replace('#include <begin_vertex>','vec3 transformed=position+normal*uK*uLen;transformed.y-=uK*uK*uLen*uDroop;vFurUv=uv*uRep;');
      sh.fragmentShader='uniform float uK;uniform sampler2D uFur;uniform vec3 uRim;varying vec2 vFurUv;\n'+sh.fragmentShader.replace('#include <alphatest_fragment>','if(texture2D(uFur,vFurUv).r<uK*0.9+0.05)discard;').replace('#include <emissivemap_fragment>','#include <emissivemap_fragment>\ntotalEmissiveRadiance+=uRim*pow(1.0-clamp(dot(normal,normalize(vViewPosition)),0.0,1.0),2.0)*uK;').replace('#include <color_fragment>','#include <color_fragment>\ndiffuseColor.rgb*=mix(.35,1.1,uK);')};
    m.customProgramCacheKey=()=>'fur'+(map?'m':'');const s=new THREE.Mesh(mesh.geometry,m);s.userData.fur=true;g.add(s)}
  mesh.add(g);return g}
// bend a Y-aligned geometry into an arc around X (for tails, horns)
function bendGeo(geo,L,bend){const p=geo.attributes.position;if(Math.abs(bend)<1e-4)return geo;const R=L/bend;
  for(let i=0;i<p.count;i++){const x=p.getX(i),y=p.getY(i),z=p.getZ(i);const a=y/L*bend;p.setXYZ(i,x,Math.sin(a)*(R-z),R-Math.cos(a)*(R-z))}geo.computeVertexNormals();return geo}
function lathe(pts,seg=16){return new THREE.LatheGeometry(pts.map(p=>new THREE.Vector2(p[0],p[1])),seg)}
function std(o){return new THREE.MeshStandardMaterial(Object.assign({roughness:.7,metalness:0},o))}

/* ---------- environment map (PBR reflections) ---------- */
try{const pm=new THREE.PMREMGenerator(renderer);const es=new THREE.Scene();
  const eg=canvasTex(8,256,(x,w,h)=>{const g=x.createLinearGradient(0,0,0,h);g.addColorStop(0,'#0a0a24');g.addColorStop(.45,'#2a2258');g.addColorStop(.5,'#8a5070');g.addColorStop(.55,'#3a2a3a');g.addColorStop(1,'#15101a');x.fillStyle=g;x.fillRect(0,0,w,h)});
  es.add(new THREE.Mesh(new THREE.SphereGeometry(50,32,16),new THREE.MeshBasicMaterial({map:eg,side:THREE.BackSide})));
  const moonE=new THREE.Mesh(new THREE.SphereGeometry(3,16,8),new THREE.MeshBasicMaterial({color:0xffffff}));moonE.position.set(-20,25,-30);es.add(moonE);
  for(let k=0;k<30;k++){const b=new THREE.Mesh(new THREE.PlaneGeometry(rand(2,5),rand(.5,1.5)),new THREE.MeshBasicMaterial({color:0xffb050,side:THREE.DoubleSide}));const a=rand(0,TAU);b.position.set(Math.sin(a)*40,rand(-2,3),Math.cos(a)*40);b.lookAt(0,0,0);es.add(b)}
  scene.environment=pm.fromScene(es,.03).texture;pm.dispose()}catch(e){}

/* ---------- sky ---------- */
const skyNight=canvasTex(8,256,(x,w,h)=>{const g=x.createLinearGradient(0,0,0,h);g.addColorStop(0,'#07061a');g.addColorStop(.38,'#15123a');g.addColorStop(.48,'#3a2a62');g.addColorStop(.52,'#6a3f64');g.addColorStop(1,'#1a1432');x.fillStyle=g;x.fillRect(0,0,w,h)});
const skyDawn=canvasTex(8,256,(x,w,h)=>{const g=x.createLinearGradient(0,0,0,h);g.addColorStop(0,'#3a5aa0');g.addColorStop(.35,'#8aa0d8');g.addColorStop(.47,'#f0b090');g.addColorStop(.52,'#ffd890');g.addColorStop(1,'#6a5060');x.fillStyle=g;x.fillRect(0,0,w,h)});
const skyMat=new THREE.MeshBasicMaterial({map:skyNight,side:THREE.BackSide,fog:false,depthWrite:false});
const dawnMat=new THREE.MeshBasicMaterial({map:skyDawn,side:THREE.BackSide,fog:false,depthWrite:false,transparent:true,opacity:0});
const SKY=new THREE.Group();scene.add(SKY);SKY.add(new THREE.Mesh(new THREE.SphereGeometry(600,32,16),skyMat));
const dawnSky=new THREE.Mesh(new THREE.SphereGeometry(590,32,16),dawnMat);SKY.add(dawnSky);
const starMat=new THREE.PointsMaterial({size:1.7,color:0xdfe4ff,map:glowTex,transparent:true,depthWrite:false,fog:false});
{const n=1100,pos=new Float32Array(n*3);for(let i=0;i<n;i++){const th=Math.random()*TAU,ph=Math.random()*1.3;const r=560;pos[i*3]=Math.cos(th)*Math.sin(ph)*r;pos[i*3+1]=Math.cos(ph)*r+20;pos[i*3+2]=Math.sin(th)*Math.sin(ph)*r}
  const sg=new THREE.BufferGeometry();sg.setAttribute('position',new THREE.BufferAttribute(pos,3));SKY.add(new THREE.Points(sg,starMat))}
const moonGlow=glowSprite(0xdfe6ff,160,.55,false);moonGlow.position.set(-240,220,-340);SKY.add(moonGlow);
const moonDisc=new THREE.Mesh(new THREE.CircleGeometry(16,40),new THREE.MeshBasicMaterial({color:0xf4f1ff,fog:false,transparent:true}));moonDisc.position.copy(moonGlow.position);moonDisc.lookAt(0,0,0);SKY.add(moonDisc);
const sunGlow=glowSprite(0xffd090,260,0,false);sunGlow.position.set(300,40,260);SKY.add(sunGlow);
let dawnK=0;
function setDawn(k){dawnK=k;dawnMat.opacity=k;starMat.opacity=1-k;moonDisc.material.opacity=1-k;moonGlow.material.opacity=.55*(1-k);sunGlow.material.opacity=k;
  scene.fog.color.copy(FOG_NIGHT).lerp(FOG_DAWN,k);hemi.intensity=.85+k*.6;hemi.color.setHex(0x7a80d0).lerp(new THREE.Color(0xffd8c0),k);moonLight.color.setHex(0xc0caff).lerp(new THREE.Color(0xffc890),k);moonLight.intensity=.75+k*.5;
  if(gradePass)gradePass.uniforms.uLift.value=k*.03}

