/* ================= opening film: Maëlle's story (Higgsfield clips + ElevenLabs narration) =================
   Plays before the story starts on New Game, and every time Chapter I is chosen. Skippable. */
const FILM={subs:[[1.45, 5.95, "Paris, after midnight... when the whole city is asleep."], [10.55, 13.31, "Hi. I'm Maëlle. I'm a witch."], [13.51, 15.69, "Well... still learning."], [20.57, 24.45, "I grew up right here, under the rooftops,\nwith my grandparents."], [25.34, 26.98, "Grandma talked to the moon."], [27.2, 29.9, "Everyone thought she was just a sweet old lady..."], [30.02, 31.26, "she was a witch."], [31.99, 34.69, "She put my very first light in my hands."], [34.89, 35.79, "I was seven."], [40.35, 44.31, "Then, ten years ago... something rose from the river."], [44.35, 46.55, "A crown, made of smoke."], [47.31, 50.29, "That night, every clock in the flat stopped."], [50.51, 52.99, "And in the morning... they were gone."], [53.46, 58.94, "All they left me was her book, her hat...\nand an old broom that wouldn't stop glowing."], [60.82, 65.52, "So I taught myself.\nNight after night, on the roofs of Paris."], [65.68, 69.76, "No coven. No master. A lot of falling."], [74.59, 76.71, "But one night... I flew."], [78.47, 81.43, "Tonight, Paris is far too quiet."], [81.53, 85.23, "And someone is running across my rooftops."], [85.27, 86.7, "There you are."], [88.46, 91.76, "Wherever you are, Grandma...\nI'm coming to find you."]],el:null,on:false};
function playFilm(done,opt){opt=opt||{};const SUBS=opt.subs||FILM.subs;if(FILM.on){done&&done();return}FILM.on=true;
  const wasP=paused;paused=true;const keepA=!!opt.gameAudio;if(!keepA)try{if(AC&&AC.state==='running')AC.suspend()}catch(e){}
  const o=document.createElement('div');o.id='filmO';FILM.el=o;
  o.style.cssText='position:fixed;inset:0;z-index:99999;background:#000;display:flex;align-items:center;justify-content:center;opacity:'+(opt.instant?1:0)+';transition:opacity '+(opt.instant?0:.6)+'s';
  o.innerHTML='<video id="filmV" playsinline preload="auto" style="width:100%;height:100%;object-fit:contain;background:#000"></video>'+
   '<div id="filmS" style="position:absolute;left:6%;right:6%;bottom:7%;text-align:center;font:600 clamp(16px,2.3vw,30px)/1.35 Outfit,system-ui,sans-serif;color:#fff4e6;letter-spacing:.01em;text-shadow:0 0 6px #000,0 2px 10px rgba(0,0,0,.95),0 0 22px rgba(20,8,16,.8);white-space:pre-line;opacity:0;transition:opacity .15s;pointer-events:none"></div>'+
   '<button id="filmSkip" style="position:absolute;right:22px;top:18px;font:700 14px/1 Outfit,system-ui,sans-serif;letter-spacing:.08em;color:#f3d79a;background:rgba(10,6,14,.55);border:1px solid rgba(243,215,154,.45);border-radius:999px;padding:10px 16px;cursor:pointer;opacity:.75">SKIP ›</button>'+
   '<button id="filmTap" style="display:none;position:absolute;font:700 18px/1 Outfit,system-ui,sans-serif;color:#1a0f06;background:#f3c463;border:0;border-radius:999px;padding:16px 26px;cursor:pointer">▶ Play the story</button>';
  document.body.appendChild(o);if(opt.noSkip)o.querySelector('#filmSkip').style.display='none';requestAnimationFrame(()=>o.style.opacity='1');const cues=(opt.cues||[]).slice().sort((a,b)=>a[0]-b[0]);let ci=0,nearDone=false;
  const v=o.querySelector('#filmV'),sub=o.querySelector('#filmS'),tap=o.querySelector('#filmTap');let cur=-1,ended=false,raf=0;
  v.src=opt.src||'assets/intro_maelle.mp4';v.volume=1;if(keepA&&!opt.videoAudio){v.muted=true;v.setAttribute('muted','')}if(opt.kick)v.animate([{transform:'scale(1.14)',filter:'brightness(2.2) saturate(1.4)'},{transform:'scale(1)',filter:'brightness(1) saturate(1)'}],{duration:900,easing:'cubic-bezier(.15,.8,.25,1)'});
  const tick=()=>{const t=v.currentTime;while(ci<cues.length&&t>=cues[ci][0]){try{cues[ci][1]()}catch(x){}ci++}if(opt.nearEnd&&!nearDone&&v.duration&&t>=v.duration-opt.nearEnd[0]){nearDone=true;try{opt.nearEnd[1]()}catch(x){}}let k=-1;for(let i=0;i<SUBS.length;i++){const s=SUBS[i];if(t>=s[0]&&t<s[1]){k=i;break}}
    if(k!==cur){cur=k;if(k<0)sub.style.opacity='0';else{sub.textContent=SUBS[k][2];sub.style.opacity='1'}}raf=requestAnimationFrame(tick)};raf=requestAnimationFrame(tick);
  const finish=()=>{if(ended)return;ended=true;cancelAnimationFrame(raf);removeEventListener('keydown',key,true);if(!opt.instant)o.style.opacity='0';try{v.pause()}catch(e){}
    setTimeout(()=>{o.remove();FILM.el=null;FILM.on=false;paused=wasP;try{if(AC&&AC.state==='suspended')AC.resume()}catch(e){}done&&done()},opt.instant?0:600)};
  const key=e=>{e.stopImmediatePropagation();e.preventDefault();if(!opt.noSkip&&!e.repeat&&(e.code==='Escape'||e.code==='Space'||e.code==='Enter'))finish()};
  addEventListener('keydown',key,true);
  o.querySelector('#filmSkip').addEventListener('click',finish);v.addEventListener('ended',finish);v.addEventListener('error',finish);
  const go=()=>{const p=v.play();if(p&&p.catch)p.catch(()=>{tap.style.display='block'})};
  tap.addEventListener('click',()=>{tap.style.display='none';go()});go()}
/* New Game in story mode: the film comes first, then the opening cutscene */
{const _pi=playIntro;playIntro=function(done){if(MODE==='open')return _pi.apply(this,arguments);const a=arguments,self=this;playFilm(()=>_pi.apply(self,a))}}
/* choosing Chapter I always replays it */
{const _ac=applyChapter;applyChapter=function(id){const r=_ac.apply(this,arguments);if(id==='kitsune'&&MODE!=='open')playFilm(null);return r}}

/* light burst: an epic kinetic flare (shockwave, anamorphic streak, spinning rays, white peak) that hides the cut between game and film */
function lxBurst(inD,cb,tint){const o=document.createElement('div');const t=tint||'255,196,70';
  o.style.cssText='position:fixed;inset:0;z-index:100001;pointer-events:none;overflow:hidden';
  const L=(css)=>{const d=document.createElement('div');d.style.cssText='position:absolute;left:50%;top:50%;'+css;o.appendChild(d);return d};
  const rays=L('width:320vmax;height:320vmax;margin:-160vmax 0 0 -160vmax;opacity:0;mix-blend-mode:screen;background:repeating-conic-gradient(from 0deg,rgba('+t+',0) 0deg,rgba(255,255,255,.75) 1.2deg,rgba('+t+',.5) 2.6deg,rgba('+t+',0) 6deg,rgba(0,0,0,0) 9deg)');
  const rays2=L('width:320vmax;height:320vmax;margin:-160vmax 0 0 -160vmax;opacity:0;mix-blend-mode:screen;background:repeating-conic-gradient(from 3deg,rgba(255,255,255,0) 0deg,rgba('+t+',.45) 1deg,rgba(255,255,255,0) 4deg,rgba(0,0,0,0) 15deg)');
  const ring=L('width:40vmax;height:40vmax;margin:-20vmax 0 0 -20vmax;border-radius:50%;opacity:0;mix-blend-mode:screen;background:radial-gradient(circle,rgba(255,255,255,0) 52%,rgba(255,255,255,.95) 60%,rgba('+t+',.8) 64%,rgba(120,180,255,.5) 67%,rgba(255,80,200,.35) 69%,rgba(0,0,0,0) 72%)');
  const streak=L('width:240vw;height:3.2vh;margin:-1.6vh 0 0 -120vw;opacity:0;mix-blend-mode:screen;background:radial-gradient(ellipse at center,#fff 0%,rgba(255,255,255,.95) 12%,rgba('+t+',.7) 35%,rgba(120,170,255,.3) 60%,rgba(0,0,0,0) 75%);filter:blur(1px)');
  const glow=L('width:220vmax;height:220vmax;margin:-110vmax 0 0 -110vmax;opacity:0;background:radial-gradient(circle,#fff 0%,rgba(255,250,235,.98) 10%,rgba('+t+',.85) 26%,rgba('+t+',0) 50%)');
  const white=L('left:0;top:0;width:100%;height:100%;background:#fff;opacity:0');
  document.body.appendChild(o);const ms=inD*1000;
  const A=(el,k,d,ease,delay)=>el.animate(k,{duration:d,delay:delay||0,easing:ease||'cubic-bezier(.5,0,.2,1)',fill:'forwards'});
  A(ring,[{opacity:0,transform:'scale(.1)'},{opacity:1,transform:'scale(.6)',offset:.25},{opacity:0,transform:'scale(5.5)'}],ms*1.1,'cubic-bezier(.2,.6,.3,1)');
  A(streak,[{opacity:0,transform:'scaleX(.05) scaleY(.4)'},{opacity:1,transform:'scaleX(.6) scaleY(1)',offset:.4},{opacity:1,transform:'scaleX(1.3) scaleY(2.4)'}],ms,'cubic-bezier(.3,0,.2,1)',ms*.1);
  A(rays,[{opacity:0,transform:'scale(.25) rotate(-20deg)'},{opacity:1,transform:'scale(1.3) rotate(80deg)'}],ms,'cubic-bezier(.55,0,.85,.55)');
  A(rays2,[{opacity:0,transform:'scale(.3) rotate(30deg)'},{opacity:.9,transform:'scale(1.4) rotate(-60deg)'}],ms,'cubic-bezier(.55,0,.85,.55)');
  A(glow,[{opacity:0,transform:'scale(.05)'},{opacity:1,transform:'scale(1.2)'}],ms,'cubic-bezier(.75,0,.9,.4)');
  A(white,[{opacity:0},{opacity:0,offset:.62},{opacity:.85,offset:.72},{opacity:.35,offset:.8},{opacity:1}],ms,'linear');
  const cv=(typeof renderer!=='undefined'&&renderer.domElement)||document.querySelector('canvas');if(cv)A(cv,[{transform:'none'},{transform:'scale(1.06) translate(.6%,-.4%)',offset:.5},{transform:'scale(1.16) translate(-.8%,.5%)'}],ms,'cubic-bezier(.6,0,1,.6)');
  try{whoosh(inD+.15,300,4200,.22,{wet:.5});setTimeout(()=>{try{sfx.boom()}catch(x){}try{DR.sub(1.8,.45)}catch(x){}try{sx('impact',1,null,{rate:.7})}catch(x){}},ms*.92)}catch(x){}
  setTimeout(()=>{try{cb&&cb()}catch(x){console.warn('lx',x)}},ms);
  return{out:(d=1)=>{const D=d*1000;if(cv)cv.animate([{transform:'scale(1.16)'},{transform:'none'}],{duration:D*.8,easing:'cubic-bezier(.15,.8,.25,1)'});
    A(white,[{opacity:1},{opacity:0}],D*.45,'ease-out');A(glow,[{opacity:1,transform:'scale(1.2)'},{opacity:0,transform:'scale(3)'}],D,'ease-out');
    A(streak,[{opacity:1,transform:'scaleX(1.3) scaleY(2.4)'},{opacity:0,transform:'scaleX(2.2) scaleY(.2)'}],D*.8,'ease-out');
    A(rays,[{opacity:1,transform:'scale(1.3) rotate(80deg)'},{opacity:0,transform:'scale(2.8) rotate(130deg)'}],D,'ease-out');A(rays2,[{opacity:.9,transform:'scale(1.4) rotate(-60deg)'},{opacity:0,transform:'scale(3) rotate(-110deg)'}],D,'ease-out');
    setTimeout(()=>{o.remove();if(cv)cv.style.transform=''},D+60)}}}
/* game sound under the film: the clash cues, louder, music up; the film keeps only its own audio of Kaen struggling at the end */
function filmMix(on){try{if(on){FILM.sb=sfxBus?sfxBus.gain.value:null;if(sfxBus)sfxBus.gain.value=3.4;CLIP.duckT=0;BM.duck=0;for(const k in BM.tr){const t=BM.tr[k];if(t&&t.g&&t.playing){t.v=1;t.g.gain.setTargetAtTime(.95,AC.currentTime,.4)}}}
  else if(sfxBus&&FILM.sb!=null)sfxBus.gain.value=FILM.sb}catch(x){}}
function clashFilmCues(){const crk=(a,b,st)=>{const r=[];for(let t=a;t<b;t+=st)r.push([t,()=>{try{noise(.2,.17,rand(1800,5200),'bandpass');tone(rand(1600,2800),.09,'square',.03,.5)}catch(x){}}]);return r};
  return[[0,()=>{filmMix(1);try{sfx.chain&&sfx.chain()}catch(x){}try{sx('clash',1)}catch(x){}try{DR.sub(2.8,.5)}catch(x){}}],[.9,()=>{try{sx('clash',1)}catch(x){}}],...crk(.05,4.4,.09),
    [1.9,()=>{try{DR.riser(2.1)}catch(x){}try{sx('riser',1)}catch(x){}try{DR.heart()}catch(x){}}],[3.1,()=>{try{sx('clash',1,null,{rate:.85})}catch(x){}}],
    [3.9,()=>{try{if(!sfxPlay('inferno',1,{rate:.9}))sfx.inferno&&sfx.inferno()}catch(x){}try{DR.sub(2.4,.55)}catch(x){}}],
    [4.7,()=>{try{sfx.meteor&&sfx.meteor()}catch(x){}try{sx('impact',1,null,{rate:.8})}catch(x){}}],[4.95,()=>{try{DR.slam()}catch(x){}try{sfx.boom()}catch(x){}try{vib([120,60,260])}catch(x){}}],
    [5.3,()=>{try{noise(1.4,.12,800,'lowpass',null,{brown:true})}catch(x){}}],[6.3,()=>{try{thud(.45,60)}catch(x){}}]]}
/* the final clash with Kaen: in-game clash up to the moment the beams meet, the flare carries into the film, the film flares back into the game. Cannot be skipped. */
{const _kc=kaenClash;kaenClash=function(e,finish){if(MODE==='open'||e._clashFilm)return _kc.apply(this,arguments);e._clashFilm=1;let lx=null;
  const _pc=playCutscene;playCutscene=function(shots,done){playCutscene=_pc;shots=shots.slice(0,4);const s=shots[3],u=s.update;let f=false;s.dur=2.1;
    s.update=(dt,k)=>{if(u)u(dt,Math.min(1,k*1.15));if(!f&&k>=.6){f=true;lx=lxBurst(.75,null)}};return _pc.call(this,shots,done)};
  return _kc.call(this,e,function(){const a=arguments,self=this;const after=()=>{try{clashAfter(e,()=>{if(finish)finish.apply(self,a)})}catch(x){console.warn('clashAfter',x);if(finish)finish.apply(self,a)}};
    if(!lx)lx=lxBurst(.2,null);
    playFilm(()=>{filmMix(0);after();try{fadeEl.style.transition='none';fadeEl.style.opacity='0'}catch(x){}if(lx)lx.out(1.1)},
      {src:'assets/clash_final.mp4',subs:[],instant:true,noSkip:true,gameAudio:true,videoAudio:true,kick:true,cues:clashFilmCues(),nearEnd:[.7,()=>{lx=lxBurst(.7,null,'150,175,255')}]});
    setTimeout(()=>{const l0=lx;lx=null;if(l0)l0.out(1.1)},140)})}}

/* after the clash film: quick cut back in-game. Kaen alone on one knee, a small blast, he is gone. Her limit breaker fades. */
function clashAfter(e,done){const act=e.m.actor,kp=e.pos.clone();let T=0,gone=false,B=null,fl=null;
  const dir=V3(kp.x-P.pos.x,0,kp.z-P.pos.z);if(dir.lengthSq()<.01)dir.set(0,0,1);dir.normalize();const side=V3(dir.z,0,-dir.x);
  e.invuln=true;e.busy=99;e.m.lock=99;P.invuln=Math.max(P.invuln||0,99);P.heroAnim='Spell_Simple_Idle_Loop';
  try{act.setBase('Crouch_Idle_Loop',.05)}catch(x){}
  const upd=dt=>{T+=dt;if(!gone){e.t+=dt;try{kaenFx(e,dt);act.update(dt)}catch(x){}}};
  const fade=dt=>{P.lbT=0;P.lb2=0;P.lbRamp=Math.max(0,(P.lbRamp||0)-dt*.7);try{lbSet(P.lbRamp)}catch(x){}
    if(P.lbRamp>.05&&Math.random()<.7)SP.emit(V3(P.pos.x+rand(-.7,.7),P.pos.y+rand(.3,2.2),P.pos.z+rand(-.7,.7)),{c0:0xffe8a0,c1:0x603000,s0:.3,s1:.03,life:1.1,up:1.6,speed:.3})};
  const kCam=k=>({pos:headOf(kp,1).addScaledVector(dir,-4.2+k*.7).addScaledVector(side,1.6).add(V3(0,.2,0)),look:headOf(kp,1.05)});
  playCutscene([
    /* 1. Kaen, alone, on one knee. Quiet. */
    {dur:1.5,fov:38,cut:true,cam:kCam,onStart:()=>{try{DR.silence(4)}catch(x){}try{noise(1.5,.04,300,'lowpass',null,{brown:true})}catch(x){}},
      update:dt=>{upd(dt);fade(dt);if(Math.random()<.4)SP.emit(V3(kp.x+rand(-1,1),kp.y+rand(.3,1.8),kp.z+rand(-1,1)),{c0:0x9fd0ff,c1:0x203060,s0:.25,s1:.03,life:.8,up:.8,speed:.3})}},
    /* 2. he burns: embers eat him from the crown down, he flakes into ash and drifts away */
    {dur:3.6,fov:42,cam:k=>{const c=kCam(1);c.pos.addScaledVector(dir,-1.4*k).add(V3(0,k*.5,0));c.look.y+=k*.25;return c},
      onStart:()=>{const c=eCenter(e);B=kBurn(e.m.g,kp.y,2.3);flash(c,0xff9040,4);P.shake=.25;try{kShieldHide(e)}catch(x){}
        try{noise(3.4,.09,700,'bandpass',null,{q:.6,wet:.15,attack:.4})}catch(x){}try{noise(3.2,.05,2600,'highpass',null,{wet:.1,attack:.3})}catch(x){}try{sx('wind',.5,null,{rate:.55})}catch(x){}
        fl=new THREE.PointLight(0xff8a3a,0,9,2);fl.position.copy(headOf(kp,1));scene.add(fl)},
      update:(dt,k)=>{upd(dt);fade(dt);const b=Math.min(1.08,k/.82);if(B)B.set(b);const top=kp.y+2.3*(1-b);
        if(fl){fl.intensity=(b<1?2.2:2.2*(1-(k-.82)/.18))*(.8+Math.random()*.4);fl.position.set(kp.x,top+.2,kp.z)}
        if(b<1.02){for(let q=0;q<5;q++){const y=Math.max(kp.y+.05,top+rand(-.25,.15));SP.emit(V3(kp.x+rand(-.45,.45),y,kp.z+rand(-.45,.45)),{c0:q%2?0xffd27a:0xff7a30,c1:q%2?0x8a2cff:0x401060,s0:rand(.18,.35),s1:.02,life:rand(.9,1.6),up:rand(1.6,3),speed:.5})}
          if(Math.random()<.5)SM.emit(V3(kp.x+rand(-.3,.3),top+.3,kp.z+rand(-.3,.3)),{c0:0x3a2a30,c1:0x0a0608,s0:.5,s1:1.8,life:1.8,a:.35,up:1.4,speed:.4});
          if(Math.random()<.35)SP.emit(V3(kp.x+rand(-.5,.5),top,kp.z+rand(-.5,.5)),{c0:0x8a8090,c1:0x1a141c,s0:.12,s1:.04,life:2.2,up:1.2,speed:1.2})}
        if(b>=1&&!gone){gone=true;e.m.g.visible=false;try{sfx.blink()}catch(x){}SP.emit(V3(kp.x,kp.y+.5,kp.z),{n:40,c0:0xffc070,c1:0x6020c0,s0:.25,s1:.02,life:1.4,up:2,speed:2})}}},
    /* 3. Maëlle: the gold drains out of her */
    {dur:2,fov:36,cut:true,cam:k=>({pos:headOf(P.pos,1.5).addScaledVector(dir,2.9-k*.4).addScaledVector(side,-1.1),look:headOf(P.pos,1.35)}),
      update:dt=>{upd(dt);fade(dt*1.3)}}
  ],()=>{if(fl)scene.remove(fl);P.lbT=0;P.lb2=0;P.lbRamp=0;try{lbSet(0)}catch(x){}P.heroAnim=null;e.m.g.visible=false;done()})}
/* burn-away: a noisy front sweeps down the body, the edge glows ember-gold into violet, behind it nothing is left */
function kBurn(g,y0,h){const U={uB:{value:0},uY0:{value:y0},uH:{value:h}};const fades=[];
  const NZ='float kbH(vec3 p){return fract(sin(dot(p,vec3(127.1,311.7,74.7)))*43758.5453);}float kbN(vec3 p){vec3 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(mix(kbH(i),kbH(i+vec3(1,0,0)),f.x),mix(kbH(i+vec3(0,1,0)),kbH(i+vec3(1,1,0)),f.x),f.y),mix(mix(kbH(i+vec3(0,0,1)),kbH(i+vec3(1,0,1)),f.x),mix(kbH(i+vec3(0,1,1)),kbH(i+vec3(1,1,1)),f.x),f.y),f.z);}';
  g.traverse(o=>{if(!o.visible)return;if(o.isSprite||o.isPoints){fades.push([o.material,o.material.opacity]);return}if(!o.isMesh||!o.material)return;
    const ms=Array.isArray(o.material)?o.material:[o.material];
    ms.forEach((m,ix)=>{if(m.isShaderMaterial||m.isMeshBasicMaterial){if(m.transparent||m.isShaderMaterial){fades.push([m,m.opacity!==undefined?m.opacity:1,m.uniforms]);return}}
      if(m._kb)return;let mm=m;if(m.__shared||!m.onBeforeCompile||m.onBeforeCompile===THREE.Material.prototype.onBeforeCompile){mm=m.clone();mm.onBeforeCompile=m.onBeforeCompile;mm.customProgramCacheKey=m.customProgramCacheKey;if(Array.isArray(o.material))o.material[ix]=mm;else o.material=mm}
      const prev=mm.onBeforeCompile,pk=mm.customProgramCacheKey;mm._kb=1;
      mm.onBeforeCompile=function(sh,r){if(prev&&prev!==THREE.Material.prototype.onBeforeCompile)prev.call(this,sh,r);for(const k in U)sh.uniforms[k]=U[k];
        sh.vertexShader=sh.vertexShader.replace('#include <common>','#include <common>\nvarying vec3 vKbW;').replace('#include <project_vertex>','#include <project_vertex>\nvKbW=(modelMatrix*vec4(transformed,1.)).xyz;');
        sh.fragmentShader=sh.fragmentShader.replace('#include <common>','#include <common>\nvarying vec3 vKbW;uniform float uB,uY0,uH;float kbE=0.;'+NZ)
          .replace('#include <clipping_planes_fragment>','#include <clipping_planes_fragment>\n{float hn=clamp((vKbW.y-uY0)/uH,0.,1.);float n=kbN(vKbW*10.)*.6+kbN(vKbW*29.)*.4;float th=(1.-hn)*.82+n*.38;float cut=uB*1.22;if(th<cut-.0)discard;kbE=1.-smoothstep(0.,.085,th-cut);}')
          .replace('#include <emissivemap_fragment>','#include <emissivemap_fragment>\ndiffuseColor.rgb=mix(diffuseColor.rgb,vec3(.05,.03,.04),smoothstep(0.,.9,kbE)*.85);totalEmissiveRadiance+=mix(vec3(.9,.22,1.5),vec3(4.,1.7,.35),smoothstep(.5,.95,kbE))*kbE*kbE*1.8;')};
      mm.customProgramCacheKey=function(){return 'kb|'+(pk?pk.call(this):'')};mm.needsUpdate=true})});
  return{set(k){U.uB.value=k;for(const[m,o0,un]of fades){const a=Math.max(0,1-k*1.4);if(m.opacity!==undefined)m.opacity=o0*a;if(un&&un.uA)un.uA.value*=a}}}}
