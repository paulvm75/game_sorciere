
/* ================= CHAPTER 2 · core: state, ElevenLabs sound kit, clash redesign, boss stingers ================= */
const CH2={st:0,zone:'paris',flySpd:0,crossing:false,expanded:false,mourn:false,obj:null,parisWB:null};
function ch2Load(){try{const o=JSON.parse(localStorage.getItem('sorciere-ch2')||'null');if(o)CH2.st=o.st|0}catch(e){}}
function ch2Save(){try{localStorage.setItem('sorciere-ch2',JSON.stringify({st:CH2.st}))}catch(e){}}
ch2Load();

/* ---------- sound kit: every set has up to 4 recorded variants (assets/sx_<set>_<n>.mp3); old sound only as a fallback ---------- */
const SX={sets:{boss:3,clash:2,impact:2,riser:2,heart:1,shield:1,shbreak:1,powerup:1,bats:2,garg:1,cackle:2,wind:1,bigben:1,portal:1,skyshatter:1,book:1},last:{},pre:false,loops:{}};
function sxKey(n,i){return 'sx_'+n+'_'+i}
function sxPre(){if(SX.pre)return;SX.pre=true;let d=0;for(const n in SX.sets)for(let i=0;i<SX.sets[n];i++){const k=sxKey(n,i);setTimeout(()=>clipLoad(k),d+=40)}}
function sxBuf(b,vol,o={}){if(!AC||muted||!b)return null;try{const s=AC.createBufferSource();s.buffer=b;s.loop=!!o.loop;s.playbackRate.value=(o.rate||1)*(1+((Math.random()-.5)*(o.jit||0)));const g=AC.createGain();g.gain.value=vol;
  if(o.fade){g.gain.setValueAtTime(0,AC.currentTime);g.gain.linearRampToValueAtTime(vol,AC.currentTime+o.fade)}s.connect(g);g.connect(master);
  if(verbIn&&o.wet!==0){const w=AC.createGain();w.gain.value=(o.wet||.14)*vol;g.connect(w);w.connect(verbIn)}s.start(AC.currentTime+(o.delay||0));if(o.duck)CLIP.duckT=Math.max(CLIP.duckT,o.duck);return{s,g}}catch(e){return null}}
function sxHas(n){const N=SX.sets[n]||0;for(let i=0;i<N;i++)if(CLIP.buf[sxKey(n,i)])return true;return false}
/* play one variant of a set, never the same one twice in a row; fb runs when no recording is available */
function sx(n,vol=1,fb,o={}){const N=SX.sets[n]||0;const ok=[];for(let i=0;i<N;i++)if(CLIP.buf[sxKey(n,i)])ok.push(i);
  if(!ok.length){if(!SX.pre)sxPre();if(fb)try{fb()}catch(e){}return null}
  let i=o.pick!=null&&ok.includes(o.pick)?o.pick:ok[(Math.random()*ok.length)|0];if(o.pick==null&&ok.length>1&&i===SX.last[n])i=ok[(ok.indexOf(i)+1)%ok.length];SX.last[n]=i;
  return sxBuf(CLIP.buf[sxKey(n,i)],vol,o)}
function sxLoop(id,n,vol,o={}){sxStop(id);const h=sx(n,vol,null,Object.assign({loop:true,fade:o.fade||.6},o));if(h)SX.loops[id]=h;return h}
function sxStop(id,fade=.5){const h=SX.loops[id];if(!h)return;delete SX.loops[id];try{const t=AC.currentTime;h.g.gain.cancelScheduledValues(t);h.g.gain.setValueAtTime(h.g.gain.value,t);h.g.gain.linearRampToValueAtTime(0,t+fade);h.s.stop(t+fade+.05)}catch(e){}}
{const _sg=startGame;startGame=function(){const r=_sg.apply(this,arguments);setTimeout(sxPre,2500);return r}}

/* ---------- the synth "drama kit" from the Kaen fight now plays real recordings ---------- */
{const H=DR.heart,R=DR.riser,S=DR.slam;
  DR.heart=()=>sx('heart',.95,H,{wet:.25});
  DR.riser=(d)=>sx('riser',.8,()=>R(d),{wet:.25});
  DR.slam=()=>{if(!sx('impact',1,null,{wet:.3}))S()};
  DR.crack=()=>{};DR.sub=()=>{}}
/* boss meetings: recorded stingers, a different one each time */
{const _bi=sfx.bossIn;sfx.bossIn=function(){sx('boss',.95,_bi,{wet:.3,duck:3.5})}}
/* void shield + power-up + charge riser with recordings */
{const _v=sfx.void;sfx.void=function(){if(bossRef&&bossRef.type==='illusion'&&bossRef.ai&&bossRef.ai.lbDone){if(sx(bossRef.kShield>0?'shield':'powerup',.7))return}return _v&&_v.apply(this,arguments)}}
{const _s=sfx.shatter;sfx.shatter=function(){if(bossRef&&bossRef.type==='illusion'&&bossRef.kSm&&bossRef.kShield<=0){if(sx('shbreak',.8))return}return _s&&_s.apply(this,arguments)}}

/* ---------- last clash, redesigned: plasma beams with a scrolling core, spiral filaments and a burning contact point ---------- */
function clashMat(col,core){return new THREE.ShaderMaterial({uniforms:{uT:{value:0},uC:{value:new THREE.Color(col)},uK:{value:core?1:0},uA:{value:1}},transparent:true,depthWrite:false,blending:THREE.AdditiveBlending,side:THREE.DoubleSide,
  vertexShader:'varying vec2 vU;varying vec3 vN;varying vec3 vV;void main(){vU=uv;vec4 mv=modelViewMatrix*vec4(position,1.);vN=normalize(normalMatrix*normal);vV=normalize(-mv.xyz);gl_Position=projectionMatrix*mv;}',
  fragmentShader:'uniform float uT,uK,uA;uniform vec3 uC;varying vec2 vU;varying vec3 vN;varying vec3 vV;float h(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}float n(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(h(i),h(i+vec2(1,0)),f.x),mix(h(i+vec2(0,1)),h(i+vec2(1,1)),f.x),f.y);}'+
   'void main(){float face=abs(dot(normalize(vN),normalize(vV)));float body=pow(face,uK>.5?1.2:2.6);float fl=n(vec2(vU.x*8.,vU.y*26.-uT*14.))*.65+n(vec2(vU.x*20.,vU.y*60.-uT*30.))*.35;float ends=smoothstep(0.,.06,vU.y)*(1.-smoothstep(.94,1.,vU.y));'+
   'vec3 c=mix(uC,vec3(1.),uK>.5?.5:body*.22);float a=(uK>.5?body*(.7+fl*.4):body*(.3+fl*.8))*ends*uA;gl_FragColor=vec4(c*(.95+fl*.6),a);}'})}
function clashBeam(col,w){const g=new THREE.Group();const geo=new THREE.CylinderGeometry(1,1,1,20,1,true);
  const outer=clashMat(col,false),core=clashMat(col,true);const o=new THREE.Mesh(geo,outer),c=new THREE.Mesh(geo,core);g.add(o);g.add(c);
  /* two spiral filaments wrapping the beam */
  const N=90,hp=new Float32Array(N*2*3),hg=new THREE.BufferGeometry();hg.setAttribute('position',new THREE.BufferAttribute(hp,3));
  const hm=new THREE.LineBasicMaterial({color:col,transparent:true,opacity:.9,blending:THREE.AdditiveBlending,depthWrite:false});const helix=new THREE.Line(hg,hm);helix.frustumCulled=false;g.add(helix);
  const tip=glowSprite(col,3,.9);g.add(tip);
  g.userData={o,c,w,outer,core,helix,tip};
  g.set=(a,b,t)=>{const d=V3().subVectors(b,a);const L=d.length()||.01;g.position.copy(a).addScaledVector(d,.5);g.quaternion.setFromUnitVectors(V3(0,1,0),d.clone().normalize());
    const W=g.userData.w,p=1+Math.sin(t*38)*.1+Math.sin(t*61)*.05;o.scale.set(W*2.1*p,L,W*2.1*p);c.scale.set(W*.55*p,L,W*.55*p);
    outer.uniforms.uT.value=core.uniforms.uT.value=t;
    let k=0;for(let i=0;i<N;i++){const s=i/N;for(const ph of[0,Math.PI]){const an=s*L*1.6-t*9+ph,r=W*(1.15+Math.sin(s*20+t*5)*.25);hp[k++]=Math.cos(an)*r;hp[k++]=(s-.5)*L;hp[k++]=Math.sin(an)*r}}
    hg.setDrawRange(0,N*2);hg.attributes.position.needsUpdate=true;tip.position.set(0,-L/2,0);tip.scale.setScalar(W*9)};
  scene.add(g);return g}
/* contact point: a churning sphere, two rings and a ground scorch */
const CLX={};
{const _kc=kaenClash;kaenClash=function(e,finish){
  const core=new THREE.Mesh(new THREE.IcosahedronGeometry(1,3),clashMat(0xffe0b0,true));const ring1=new THREE.Mesh(new THREE.TorusGeometry(1.6,.05,6,48),new THREE.MeshBasicMaterial({color:0xffd070,transparent:true,opacity:.8,blending:THREE.AdditiveBlending,depthWrite:false}));
  const ring2=ring1.clone();ring2.material=ring1.material.clone();ring2.material.color.setHex(0xb070ff);CLX.parts=[core,ring1,ring2];for(const p of CLX.parts){p.visible=false;scene.add(p)}CLX.on=true;CLX.t=0;
  const done=()=>{CLX.on=false;CLX.orb=null;for(const p of CLX.parts||[])scene.remove(p);CLX.parts=null;sxStop('clash',.4);finish&&finish()};
  return _kc.call(this,e,done)}}
{const _pc2=playCutscene;playCutscene=function(shots,done){
  /* hook the beam shots of the clash: start the recorded clash loop when the beams appear, kill it on impact */
  try{if(CLX.on&&shots&&shots.length>=8&&!shots._clx){shots._clx=1;const s4=shots[3],s7=shots[6],s8=shots[7];
    const o4=s4.onStart;s4.onStart=function(){o4&&o4.apply(this,arguments);sxLoop('clash','clash',.85,{fade:.25,wet:.2})};
    const o7=s7.onStart;s7.onStart=function(){o7&&o7.apply(this,arguments);sxStop('clash',.8)};
    const o8=s8.onStart;s8.onStart=function(){o8&&o8.apply(this,arguments);sx('impact',1,null,{pick:1,wet:.35,delay:.25})}}}catch(x){}
  return _pc2.apply(this,arguments)}}
{const _mt=muTick;muTick=function(dt){_mt(dt);if(!CLX.on||!CLX.parts)return;CLX.t+=dt;const [core,r1,r2]=CLX.parts;
  /* follow the white orb the clash already spawns (largest additive sprite near the beams) */
  const o=CLX.orb&&CLX.orb.parent?CLX.orb:null;
  const vis=!!o;for(const p of CLX.parts)p.visible=vis;if(!vis)return;const s=o.scale.x*.16;core.position.copy(o.position);core.scale.setScalar(s*(1+Math.sin(CLX.t*30)*.08));core.material.uniforms.uT.value=CLX.t;core.rotation.set(CLX.t*1.3,CLX.t*2.1,0);
  r1.position.copy(o.position);r2.position.copy(o.position);r1.scale.setScalar(s*(1.2+Math.sin(CLX.t*9)*.15));r2.scale.setScalar(s*(1.6+Math.cos(CLX.t*7)*.2));r1.rotation.set(CLX.t*3,CLX.t*1.7,0);r2.rotation.set(-CLX.t*2.2,0,CLX.t*2.6)}}

/* ---------- music for chapter 2 ---------- */
MU.keys.push('mus_mourn','mus_london');
{const _mw=muWant;muWant=function(){if(!started)return null;if(MODE!=='open'){if(typeof bmWant==='function'&&bmWant())return null;if(CH2.mourn)return 'mus_mourn';if(CH2.zone!=='paris')return 'mus_london'}return _mw.apply(this,arguments)}}
/* ---------- zone-aware spawning ---------- */
{const _nb=nextBoss;nextBoss=function(){if(CH2.zone!=='paris')return null;return _nb.apply(this,arguments)}}
/* ---------- objective tracker ---------- */
{const _ot=objTick;objTick=function(dt){_ot(dt);if(MODE==='open'||bossRef||!CH2.obj)return;const el=$('objTrack');if(!el)return;const t=CH2.obj();if(t&&el.innerHTML!==t)el.innerHTML=t}}
/* ---------- speakers ---------- */
Object.assign(SPEAKER,{'Lyra':'#ff8f8f',"Kaen's Journal":'#d6b8ff','Greyfang':'#c8c8d8'});
/* ---------- Lyra's recorded lines (assets/lyNN.mp3) ---------- */
const LY={ly01:'This was his journal. Let me read it to you.',ly02:'Before he was the Master of Illusions, Kaen was a healer. The gentlest wizard of our order.',ly03:'Ten years ago, a curse rose out of the Thames. The Hollow Crown, a spirit older than London. It feeds on fear. It took me first.',
  ly04:'To bring me back, my brother made a pact. My life, for his kindness. And every night, the Crown wanted to be fed.',ly05:'So he built a prison of illusions around Paris, and filled it with monsters, so the Crown would feed on Paris instead of on me. He hated every second of it.',
  ly06:'The cruelty you fought was the Crown, wearing his face. His real soul was never in Paris. It is chained inside the Tower of London.',ly07:'Lower your wand, witch. I am not your enemy.',ly08:'My name is Lyra. Kaen was my brother.',
  ly09:'When you broke him, you broke the pact. I woke up free. He did not.',ly10:'The Crown killed Bilel, not Kaen. My brother wept for him. It is all in that book.',ly11:'Paris is safe now. Well... Paris is never fully safe.',
  ly12:'I can open a door to Calais. No further. English waters are cursed, and my magic dies over them.',ly13:'Find me at the Trocadéro when you are ready. Will you help me bring my brother home?',ly14:'This is as far as I can take you. Fly north, and do not stop over the water.',
  ly15:"And witch... don't let them grab you.",ly16:'You are over English waters now. Keep moving!',ly17:'Behind you! They are coming out of the fog!',ly18:'The white cliffs! You made it. Follow the river to London.',ly19:'Welcome to London. Even the fog is afraid here.',
  ly20:'Listen. The bells... Big Ben never rings thirteen times.',ly21:'The Tower is east, past the bridge. Hold on, brother. We are coming.'};
for(const k in LY)VO_MAP[LY[k]]=k;
/* Lyra talking outside a cutscene (radio-style, in your head) */
function lyraSay(k,title){const t=LY[k];if(!t)return;toast(t,title||'Lyra');if(typeof clipPlay==='function'){if(CLIP.buf[k])clipPlay(k,1,2);else clipLoad(k).then(b=>{if(b)clipPlay(k,1,2)})}}
/* the last two synth-only boss cues now use the ElevenLabs takes */
{const _rb=sfx.roarBeast;sfx.roarBeast=function(){if(!sx('garg',1,null,{rate:.72,wet:.35}))return _rb&&_rb.apply(this,arguments)}}
{const _ch=sfx.charge;sfx.charge=function(){if(!sx('riser',.7,null,{pick:0}))return _ch&&_ch.apply(this,arguments)}}
