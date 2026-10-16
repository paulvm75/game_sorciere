
/* ---------- QoL pack: quiet auto bolt, intro story, tutorials, death advice, Bilel approach, limit-break sync ---------- */
let BOLT_AUTO=0;
/* auto bolt: soft, airy tick instead of the full cast */
{const _b=sfx.bolt;sfx.bolt=function(){if(BOLT_AUTO){if(!sfxPlay('bolt',.11,{jit:.1,rate:1.18,gap:.2}))tone(1500,.08,'sine',.012,.6,0,null,.3);return}return _b.apply(this,arguments)}}

/* ---------- Kaen fight: the limit-break burst lands exactly on the audio burst ---------- */
const KI={at:0,ok:false,lead:1.88,hit:.92};
{const _cp=clipPlay;clipPlay=function(k,vol=1,duck=0){if(k!=='sfx_ki'||!AC||muted||!CLIP.buf[k]){if(k==='sfx_ki')KI.ok=false;return _cp.apply(this,arguments)}
  const b=CLIP.buf[k];const s=AC.createBufferSource();s.buffer=b;const g=AC.createGain();g.gain.value=vol;s.connect(g);g.connect(master);if(verbIn){const w=AC.createGain();w.gain.value=.18*vol;g.connect(w);w.connect(verbIn)}
  KI.at=AC.currentTime+KI.lead;s.start(KI.at);KI.ok=true;if(duck)CLIP.duckT=Math.max(CLIP.duckT,Math.min(duck+KI.lead,b.duration+KI.lead));
  try{noise(KI.lead+.4,.05,110,'lowpass',null,{brown:true})}catch(e){}}}
{const _pc=playCutscene;playCutscene=function(shots,done){try{const s0=shots&&shots[0];if(s0&&s0.onStart&&String(s0.onStart).indexOf('sfx_ki')>=0){const d0=s0.dur||2.8,cam0=s0.cam,up0=s0.update;let el=0;KI.ok=false;KI.at=0;s0.dur=30;
    s0.cam=(k,t)=>cam0(Math.min(1,el/d0),t);
    s0.update=function(dt,k){el+=dt;if(up0)up0.call(this,dt,Math.min(1,el/d0));const end=KI.ok&&AC?AC.currentTime>=KI.at+KI.hit:el>=d0;if(end||el>8){CS.t=Math.max(CS.t,.01);s0._dur=CS.t}}}}catch(e){console.warn('ki',e)}return _pc.apply(this,arguments)}}

/* ---------- shared card UI (tutorials, advice) ---------- */
{const st=document.createElement('style');st.textContent=`
#tutCard{position:absolute;left:50%;top:calc(58px + env(safe-area-inset-top,0px));transform:translate(-50%,-8px);width:min(420px,calc(100vw - 32px));padding:14px 16px 12px;border-radius:14px;background:linear-gradient(180deg,rgba(28,19,50,.94),rgba(14,10,28,.94));box-shadow:inset 0 0 0 1px rgba(242,193,96,.3),0 10px 30px rgba(0,0,0,.45);color:#f3e9d4;z-index:40;opacity:0;transition:opacity .35s,transform .35s;pointer-events:auto}
#tutCard.on{opacity:1;transform:translate(-50%,0)}
#tutCard .tl{font:600 10.5px Outfit,system-ui,sans-serif;letter-spacing:2px;text-transform:uppercase;color:#f2a541;opacity:.85}
#tutCard h3{margin:4px 0 6px;font:600 19px Cinzel,Georgia,serif;letter-spacing:.5px;color:#fff}
#tutCard p{margin:0;font:14px/1.45 Georgia,serif;color:#e6dac2}
#tutCard kbd{display:inline-block;padding:0 6px;border-radius:4px;background:rgba(255,255,255,.1);box-shadow:inset 0 0 0 1px rgba(242,193,96,.4);font:700 12px Outfit,system-ui,sans-serif;color:#ffe2a8}
#tutCard .row{display:flex;gap:8px;justify-content:flex-end;align-items:center;margin-top:12px}
#tutCard .row .sp{flex:1;font:500 12px Outfit,system-ui,sans-serif;color:#cfc2a8;opacity:.8}
#tutCard button{cursor:pointer;padding:7px 14px;border-radius:999px;border:1px solid rgba(242,165,65,.5);background:rgba(242,165,65,.16);color:#ffd59a;font:600 13px Outfit,system-ui,sans-serif}
#tutCard button.gh{border-color:rgba(232,223,204,.2);background:transparent;color:#cfc2a8}
#tutCard .ok{color:#9dff8a;font:600 13px Outfit,system-ui,sans-serif}
#deathAdv{margin:14px auto 16px;max-width:440px;text-align:left;display:flex;flex-direction:column;gap:10px}
#deathAdv .box{padding:12px 14px;border-radius:12px;background:rgba(18,12,34,.75);box-shadow:inset 0 0 0 1px rgba(242,193,96,.25)}
#deathAdv b{display:block;font:600 15px Cinzel,Georgia,serif;color:#fff;margin-bottom:3px}
#deathAdv span{font:13.5px/1.45 Georgia,serif;color:#e6dac2}
#deathAdv .row{display:flex;gap:8px;margin-top:10px}
#deathAdv button{cursor:pointer;padding:7px 14px;border-radius:999px;border:1px solid rgba(242,165,65,.5);background:rgba(242,165,65,.16);color:#ffd59a;font:600 13px Outfit,system-ui,sans-serif}
#deathAdv button.gh{border-color:rgba(232,223,204,.2);background:transparent;color:#cfc2a8}
#deathAdv .tip{font:13.5px/1.45 Georgia,serif;color:#e6dac2;padding:0 4px}#deathAdv .tip i{font-style:normal;color:#f2a541;font:600 11px Outfit,system-ui,sans-serif;letter-spacing:1.5px;text-transform:uppercase;margin-right:6px}
`;document.head.appendChild(st)}
function tutCard(html){let c=$('tutCard');if(!c){c=document.createElement('div');c.id='tutCard';document.body.appendChild(c);['pointerdown','click','touchstart'].forEach(ev=>c.addEventListener(ev,e=>e.stopPropagation()))}c.innerHTML=html;const g=c._g=(c._g||0)+1;requestAnimationFrame(()=>{if(c._g===g)c.classList.add('on')});return c}
function tutHide(){const c=$('tutCard');if(c){c._g=(c._g||0)+1;c.classList.remove('on')}}
const KB=(k,t)=>isTouch?t:`<kbd>${k}</kbd>`;

/* ---------- opening cinematic: narrated shots over Paris (new story game only) ---------- */
{const st=document.createElement('style');st.textContent=`
#narr{position:fixed;left:50%;bottom:calc(15vh + env(safe-area-inset-bottom,0px));transform:translateX(-50%);width:min(760px,calc(100vw - 40px));text-align:center;z-index:60;pointer-events:none;font:italic clamp(17px,2.4vw,25px)/1.5 Georgia,serif;color:#f4ead6;text-shadow:0 2px 14px rgba(0,0,0,.95),0 0 2px #000;opacity:0;transition:opacity .9s;text-wrap:balance}
#narr.on{opacity:1}
#trainVig{position:fixed;inset:0;pointer-events:none;z-index:5;box-shadow:inset 0 0 180px 40px rgba(40,20,90,.55);opacity:0;transition:opacity .6s}
#trainVig.on{opacity:1}
#trainVig b{position:absolute;left:50%;bottom:calc(150px + env(safe-area-inset-bottom,0px));transform:translateX(-50%);font:600 11px Outfit,system-ui,sans-serif;letter-spacing:5px;color:#f2a541;opacity:.75}
#tutCard .bar{height:4px;border-radius:2px;background:rgba(255,255,255,.08);margin-top:10px;overflow:hidden}#tutCard .bar i{display:block;height:100%;width:0;background:linear-gradient(90deg,#f2a541,#ffd59a);transition:width .3s}
#tutCard .pass{display:flex;align-items:center;gap:8px;font:600 15px Cinzel,Georgia,serif;color:#9dff8a}
#tutCard.big{width:min(460px,calc(100vw - 32px))}
`;document.head.appendChild(st)}
function narr(t){let n=$('narr');if(!n){n=document.createElement('div');n.id='narr';document.body.appendChild(n)}if(!t){n.classList.remove('on');return}n.classList.remove('on');setTimeout(()=>{n.textContent=t;n.classList.add('on')},t?350:0)}
function playOpening(done){const n=HERO.name||'Maëlle';const eT=V3(EIFFEL.x,58,EIFFEL.z);const fw=()=>V3(Math.sin(P.face),0,Math.cos(P.face)),sd=()=>{const f=fw();return V3(f.z,0,-f.x)};
  const at=(f,s,u,h)=>{const F=fw(),S=sd();return V3(P.pos.x+F.x*f+S.x*s,P.pos.y+u,P.pos.z+F.z*f+S.z*s)};
  const L=(t)=>()=>narr(t);
  playCutscene([
    {dur:6,fov:48,title:['Sorcière','Paris, after midnight'],cam:k=>({pos:at(-60+k*14,30,48-k*10),look:eT}),onStart:L(`Not long ago, ${n} was nobody special.`)},
    {dur:5.5,fov:40,cut:true,cam:k=>({pos:at(1.5,5.5-k*2.2,1.7),look:headOf(P.pos,1.5)}),onStart:L('She poured coffee in a little café in the 11th, and missed the last métro twice a week.')},
    {dur:5.5,fov:34,cut:true,cam:k=>({pos:at(3.2-k*.8,.6,1.9),look:headOf(P.pos,1.75)}),onStart:()=>{narr('Then came the night of the violet moon. Her grandmother\'s ring began to burn.');after(1.2,()=>{runeFlash(P.pos,0xb58cff,5,1.2);SP.emit(headOf(P.pos,1.2),{n:90,c0:0xffffff,c1:0x7a40ff,speed:5,life:1.2});try{sfx.blink()}catch(e){}})}},
    {dur:6,fov:44,cut:true,cam:k=>{const a=P.face+1+k*2.2,r=4.2-k*.6;return{pos:V3(P.pos.x+Math.sin(a)*r,P.pos.y+1.4+k*1.2,P.pos.z+Math.cos(a)*r),look:headOf(P.pos,1.5)}},update:()=>{if(Math.random()<.6)SP.emit(V3(P.pos.x+rand(-1.2,1.2),P.pos.y+rand(0,2.6),P.pos.z+rand(-1.2,1.2)),{c0:0xe8d8ff,c1:0x5a2ad0,s0:.4,s1:.05,life:1,up:1.4,speed:.4})},onStart:L('The women of her family had kept one secret: they were witches. All of them. And now, so was she.')},
    {dur:6,fov:50,cut:true,cam:k=>({pos:at(-30+k*20,-22,34),look:at(14+k*10,0,0)}),update:()=>{if(Math.random()<.5)SM.emit(at(rand(0,40),rand(-14,14),.3),{c0:0x5a8a3a,c1:0x10200a,s0:2,s1:6,life:2.4,a:.35,speed:.6})},onStart:L('But Paris was rotting. Things crawled up from the catacombs: pigs with too many teeth, spiders the size of dogs.')},
    {dur:5.5,fov:56,cut:true,cam:k=>({pos:at(-4,-2.5,.5),look:V3(EIFFEL.x,40+k*20,EIFFEL.z)}),onStart:L('Some say a laboratory under the city opened something it should never have touched.')},
    {dur:6,fov:38,cut:true,cam:k=>({pos:at(-40+k*12,8,22),look:eT}),onStart:L('Others whisper of a wizard who once had a good heart, until he grew sick of humanity.')},
    {dur:5,fov:36,cut:true,cam:k=>{const e=k*k*(3-2*k);return{pos:headOf(P.pos,1.7).addScaledVector(fw(),4.2-e*2).addScaledVector(sd(),.6),look:headOf(P.pos,1.75)}},onStart:L(`Nobody knows the truth. Tonight, ${n} is going to find out.`)}
  ],()=>{narr('');setTimeout(()=>{const x=$('narr');if(x)x.textContent=''},900);done&&done()})}
{const _pi=playIntro;playIntro=function(done){if(MODE==='open')return _pi.apply(this,arguments);playOpening(()=>_pi(()=>{done&&done();try{toastT=0;toastEl.classList.remove('show')}catch(e){}trainStart()}))}}

/* ---------- training: the world freezes while she practises; skippable ---------- */
const TUT={on:false,step:0,n:0,flyShown:(()=>{try{return localStorage.getItem('sorciere-tut-fly')==='1'}catch(e){return false}})()};
const TUT_STEPS=[
  {h:'Teleport',need:2,ev:'blink',b:()=>isTouch?'Tap the dash button to teleport a few metres forward. It is your escape button when things go wrong. Do it twice.':'Press <kbd>F</kbd> to teleport a few metres forward. It is your escape button when things go wrong. Do it twice.'},
  {h:'Sprint',need:1,ev:'sprint',b:()=>isTouch?'Push the joystick all the way to sprint. Keep running for a moment.':'Hold <kbd>Shift</kbd> while moving to sprint. Keep running for a moment.'},
  {h:'Charge a spell',need:2,ev:'charge',b:()=>isTouch?'Hold a spell button until it glows, then release. Charged spells hit far harder. Do it twice.':'Hold <kbd>1</kbd> until it glows, then release. Charged spells hit far harder. Do it twice.'},
  {h:'Auto bolt',need:0,ev:'ok',b:()=>`<b>Auto bolt</b> (top right) fires your basic bolt at the nearest monster on its own${isTouch?'. It is on by default on mobile':''}. Handy, but charging your own spells is more fun.`}];
function trainStart(){if(MODE==='open'||TUT.on)return;TUT.on=true;TUT.step=0;TUT.n=0;TUT.sp=0;for(const e of enemies.slice())if(!e.dead&&!e.def.boss)removeEnemy(e);
  let v=$('trainVig');if(!v){v=document.createElement('div');v.id='trainVig';v.innerHTML='<b>TRAINING · THE NIGHT WAITS</b>';document.body.appendChild(v)}v.classList.add('on');tutShow()}
function tutShow(confirm){const s=TUT_STEPS[TUT.step];if(!s){tutEnd(true);return}let c;
  if(confirm)c=tutCard(`<div class="tl">Training</div><h3>Skip training?</h3><p>Sure you can do this on your own? If it gets rough later, you will get tips.</p><div class="row"><button class="gh" data-a="back">No, train me</button><button data-a="yes">Yes, I've got this</button></div>`);
  else c=tutCard(`<div class="tl">Training · ${TUT.step+1}/${TUT_STEPS.length}</div><h3>${s.h}</h3><p>${s.b()}</p>${s.need?`<div class="bar"><i style="width:${Math.round(100*TUT.n/s.need)}%"></i></div>`:''}<div class="row"><span class="sp">${s.need?`${TUT.n} / ${s.need}`:''}</span><button class="gh" data-a="skip">Skip training</button>${s.ev==='ok'?'<button data-a="ok">Got it</button>':''}</div>`);
  c.classList.add('big');c.onclick=e=>{const a=e.target.closest('[data-a]');if(!a)return;const k=a.dataset.a;if(k==='skip')tutShow(true);else if(k==='back')tutShow();else if(k==='yes')tutEnd(false);else if(k==='ok')tutPass()}}
function tutPass(){const c=$('tutCard');const s=TUT_STEPS[TUT.step];if(c){const r=c.querySelector('.row');if(r)r.innerHTML=`<span class="pass">✓ ${pickR(Math.random,['Well done. You passed.','Perfect. Passed.','Nailed it. Passed.'])}</span>`;const b=c.querySelector('.bar i');if(b)b.style.width='100%'}
  try{sfx.level()}catch(e){}SP.emit(headOf(P.pos,1.4),{n:40,c0:0xffffff,c1:0xf2a541,speed:5,life:.8});TUT.step++;TUT.n=0;const st=TUT.step;setTimeout(()=>{if(TUT.on&&TUT.step===st)tutShow()},1300)}
function tutEnd(done){TUT.on=false;tutHide();const v=$('trainVig');if(v)v.classList.remove('on');toast(done?'Training complete. The night is yours.':'Hunt what hides in the stone. Seven demons wait for you.',done?'Well done':'Paris, after dark',true)}
function tutEvent(ev){if(!TUT.on)return;const s=TUT_STEPS[TUT.step];const c=$('tutCard');if(!s||s.ev!==ev||!c||c.querySelector('[data-a=yes]')||c.querySelector('.pass'))return;TUT.n++;
  if(TUT.n>=s.need){tutPass();return}try{sfx.gem&&sfx.gem()}catch(e){}const b=c.querySelector('.bar i');if(b)b.style.width=Math.round(100*TUT.n/s.need)+'%';const sp=c.querySelector('.sp');if(sp)sp.innerHTML=`<span class="ok">Good.</span> ${TUT.n} / ${s.need}`}
{const _b=blink;blink=function(){const c=P.blinkCd;_b.apply(this,arguments);if(c<=0&&P.blinkCd>0)tutEvent('blink')}}
{const _ce=chargeEnd;chargeEnd=function(k){const t=(typeof CHG!=='undefined'&&CHG&&CHG.k===k)?CHG.t:0;_ce.apply(this,arguments);if(t>=.5)tutEvent('charge')}}
/* world frozen during training: no spawns, no boss timer, enemies still */
{const _ue=updateEnemies;updateEnemies=function(dt){if(TUT.on&&MODE!=='open')return;return _ue.apply(this,arguments)}}
function trainTick(dt){if(!TUT.on)return;const s=TUT_STEPS[TUT.step];if(s&&s.ev==='sprint'&&P.moveAmt>1.12&&P.onGround){TUT.sp+=dt;if(TUT.sp>1.2){TUT.sp=0;tutEvent('sprint')}}}

/* ---------- flight tutorial: once flying unlocks (story level 4, open world first time) ---------- */
function flyTut(){if(TUT.flyShown||TUT.on||CS.active||!started||!P.alive)return;TUT.flyShown=true;try{localStorage.setItem('sorciere-tut-fly','1')}catch(e){}
  tutCard(`<div class="tl">New · Broom</div><h3>You can fly</h3><p>${isTouch?'Tap jump, then tap it again in mid-air to call your broom. Keep holding to climb, let go to float down slowly. Tap jump while flying to drop, and tap it again to catch your broom with whatever time is left on the bar.':'Press <kbd>Space</kbd>, then <kbd>Space</kbd> again in mid-air to call your broom. Keep holding to climb, let go to float down slowly. Tap <kbd>Space</kbd> while flying to drop, and tap it again to catch your broom with whatever time is left on the bar.'}<br><br><span style="color:#ffd59a">Tip:</span> teleport (${KB('F','dash')}) and your broom are your best escapes.</p><div class="row"><button class="gh" data-a="x">Skip</button><button data-a="x">Got it</button></div>`).onclick=e=>{if(e.target.closest('[data-a]'))tutHide()}}

/* ---------- advice: death screen (lower difficulty / tips) and the occasional tip when it gets rough ---------- */
function tipList(boss){const F=isTouch?'the dash button':'F',SH=isTouch?'push the joystick all the way':'hold Shift';const L=[
  `Against bosses, teleport (${F}) out of the big attacks. Keep it ready for the dramatic moments.`,
  `${isTouch?'Push the joystick all the way':'Hold Shift'} to sprint, then teleport (${F}) to cover a huge distance in a second.`,
  isTouch?'Hold a spell button to charge it. Charged spells hit far harder than tapping.':'Hold a spell key to charge it. Charged spells hit far harder than spamming.',
  'Stop taking hits for a few seconds and your health starts coming back.'];
  if(P.level>=4||MODE==='open')L.push(`Jump twice to grab your broom and get out of reach. Teleport (${F}) plus broom gets you out of almost anything.`);
  if(boss)L.unshift(`Bosses hit hard but slow. Watch the wind-up, teleport (${F}) away, ${SH==='hold Shift'?'sprint with Shift':'sprint'}, then punish.`);
  return L}
let ADV_last=-1;function pickTip(boss){const L=tipList(boss);let i=(Math.random()*L.length)|0;if(i===ADV_last)i=(i+1)%L.length;ADV_last=i;return L[i]}
{const _die=die;die=function(){_die.apply(this,arguments);try{const boss=!!P._diedToBoss;let el=$('deathAdv');if(!el){el=document.createElement('div');el.id='deathAdv';$('death').insertBefore(el,$('reviveBtn'))}
  const hard=DIFF!=='easy';el.innerHTML=(hard?`<div class="box" id="advEasy"><b>Too rough?</b><span>Switch to Easy: monsters hit softly, bosses slow down and falling costs you nothing. You can change it back anytime in Settings.</span><div class="row"><button data-a="easy">Switch to Easy</button><button class="gh" data-a="keep">Keep going</button></div></div>`:'')+`<div class="tip"><i>Tip</i>${pickTip(boss)}</div>`;
  el.onclick=e=>{const a=e.target.closest('[data-a]');if(!a)return;if(a.dataset.a==='easy'){setDiff('easy');try{writeSave()}catch(x){}const b=$('advEasy');if(b)b.innerHTML='<b>Easy it is.</b><span>Enemies go soft on you from now on. Rise again.</span>';$('deathText').textContent='Brush off the soot and get back up. On easy, falling costs you nothing.'}else{const b=$('advEasy');if(b)b.remove()}}}catch(e){console.warn('adv',e)}}}
const ADV={t:60,lowT:0};
function advTick(dt){if(!started||CS.active||!P.alive||paused)return;ADV.t-=dt;const low=P.hp<maxHP()*.3;ADV.lowT=low?ADV.lowT+dt:0;
  if(ADV.t<=0&&ADV.lowT>1.5&&(bossRef||enemies.filter(e=>!e.dead&&e.aggro).length>=3)){ADV.t=110;toast(pickTip(!!bossRef),'Tip')}}

/* ---------- Master Bilel: a stranger walks up to you. Friend or foe? ---------- */
const BQA={on:false,t:0};let _bqArrive=null;
{const _sp=bqSpawnNpc;bqSpawnNpc=function(){const had=!!BQ.npc;_sp.apply(this,arguments);if(!had&&BQ.npc){try{BQ.npc.setBase(BQA.on?'Walk_Loop':'Idle_FoldArms_Loop');BQ.npc.update(.6)}catch(e){}}}}
{const _ba=bilelArrive;_bqArrive=_ba;bilelArrive=function(){if(BQ.met||MODE==='open')return _ba.apply(this,arguments);if(BQA.on)return;
  const s=findSpot(P.pos.x,P.pos.z,26,34)||P.pos.clone().add(V3(24,0,18));BQ.x=s.x;BQ.z=s.z;BQA.on=true;BQA.t=0;bqSpawnNpc();if(!BQ.npc){BQA.on=false;return _ba.apply(this,arguments)}
  BQ.mark.visible=false;BQ.rune.visible=false;toast('Someone is walking straight at you. Friend or foe?','A stranger');try{sfx.warn&&sfx.warn()}catch(e){}}}
function bqMeet(){if(!BQA.on)return;BQA.on=false;const x=BQ.npc.g.position.x,z=BQ.npc.g.position.z;BQ.x=x;BQ.z=z;BQ.mark.visible=true;BQ.rune.visible=true;
  const fs=findSpot;findSpot=()=>V3(x,groundAt(x,z),z);try{_bqArrive()}finally{findSpot=fs}}
function bqApproachTick(dt){if(MODE==='open')return;
  if(!BQA.on){if(started&&!CS.active&&!BQ.met&&!BQ.dead&&!BQ.npc&&beaten.has('slug')&&!bossRef&&P.alive){BQA.t+=dt;if(BQA.t>6){BQA.t=0;bilelArrive()}}return}
  const a=BQ.npc;if(!a){BQA.on=false;return}if(CS.active||!P.alive)return;const g=a.g.position;const dx=P.pos.x-g.x,dz=P.pos.z-g.z,d=Math.hypot(dx,dz);
  let hit=false;for(const p of projs){if(Math.hypot(p.pos.x-g.x,p.pos.z-g.z)<1.6&&Math.abs(p.pos.y-(g.y+1.2))<2.2){hit=true;break}}
  if(hit||d<6){if(hit){SP.emit(V3(g.x,g.y+1.4,g.z),{n:40,c0:0xffffff,c1:0xf2d27a,speed:6,life:.6});runeFlash(V3(g.x,g.y,g.z),0xf2d27a,3,.6)}bqMeet();return}
  if(d>3){const sp=2.4*dt;g.x+=dx/d*sp;g.z+=dz/d*sp;g.y=groundAt(g.x,g.z);BQ.x=g.x;BQ.z=g.z}a.g.rotation.y=Math.atan2(dx,dz)}
{const _mt=muTick;muTick=function(dt){_mt(dt);try{trainTick(dt);bqApproachTick(dt);advTick(dt);if(!TUT.flyShown&&!CS.active&&started&&(MODE==='open'||P.level>=4)&&!TUT.on){TUT.flyT=(TUT.flyT||0)+dt;if(TUT.flyT>(MODE==='open'?25:4))flyTut()}}catch(e){console.warn('qol',e)}}}

/* ice lance / freeze: softer, rounder, about 25% gentler */
sfx.ice=function(){if(!sfxPlay('ice',.4,{lp:4200,att:.035,rate:.93,wet:.22,jit:.05})){whoosh(.32,1700,4200,.075);shimmer(4,1800,.022,.55);noise(.16,.022,4800,'bandpass')}}

/* ---------- Kaen's last form + Bilel's stand: you cannot fall below 4% until your own Limit Breaker answers ---------- */
const KF={lb:false};
function kfOn(){if(MODE==='open'||KF.lb)return false;const e=bossRef;return!!(e&&!e.dead&&e.type==='illusion'&&e.ai&&e.ai.lbDone)}
{const _wl=witchLimitBreak;witchLimitBreak=function(){if(MODE!=='open'&&bossRef&&bossRef.type==='illusion')KF.lb=true;return _wl.apply(this,arguments)}}
{const _lo=lbStateOn;lbStateOn=function(){if(MODE!=='open')KF.lb=true;return _lo.apply(this,arguments)}}
{const _dp=damagePlayer;damagePlayer=function(a){_dp.apply(this,arguments);if(kfOn()&&P.alive){const f=Math.ceil(maxHP()*.04);if(P.hp<f)P.hp=f}}}
{const _dd=die;die=function(){if(kfOn()){P.hp=Math.ceil(maxHP()*.04);P.alive=true;P.invuln=Math.max(P.invuln,.6);return}return _dd.apply(this,arguments)}}
{const _rv=revive;revive=function(){KF.lb=false;return _rv.apply(this,arguments)}}
{const _kt=kaenTransform;kaenTransform=function(){KF.lb=false;return _kt.apply(this,arguments)}}

/* ---------- Kaen's end: his violet blast against her golden one. Hers wins. ---------- */
function clashBeam(col,w){const g=new THREE.Group();const geo=new THREE.CylinderGeometry(1,1,1,12,1,true);
  const o=new THREE.Mesh(geo,new THREE.MeshBasicMaterial({color:col,transparent:true,opacity:.55,blending:THREE.AdditiveBlending,depthWrite:false}));o.scale.set(w,1,w);g.add(o);
  const c=new THREE.Mesh(geo,new THREE.MeshBasicMaterial({color:0xffffff,transparent:true,opacity:.9,blending:THREE.AdditiveBlending,depthWrite:false}));c.scale.set(w*.35,1,w*.35);g.add(c);
  g.userData={o,c,w};g.set=(a,b,t)=>{const d=V3().subVectors(b,a);const L=d.length()||.01;g.position.copy(a).addScaledVector(d,.5);g.quaternion.setFromUnitVectors(V3(0,1,0),d.normalize());const p=1+Math.sin(t*40)*.12,W=g.userData.w;o.scale.set(W*p,L,W*p);c.scale.set(W*.35*p,L,W*.35*p)};scene.add(g);return g}
/* dramatic sound kit (synth + sample pack, no new assets) */
const DR={
  heart:()=>{thud(.42,58);setTimeout(()=>thud(.3,52),230)},
  riser:(d)=>{try{whoosh(d,180,2400,.09,{wet:.4});tone(70,d,'sawtooth',.035,2.2,0,null,.3);tone(140,d,'sine',.05,2,0,null,.3)}catch(e){}},
  sub:(d,v)=>{tone(42,d||2.2,'sine',v||.4,.6,0,null,.1);tone(31,(d||2.2)*1.2,'sine',(v||.4)*.7,.8,0,null,.1)},
  slam:()=>{if(!sfxPlay('bossIn',.8,{rate:.8,jit:0}))thud(.5,70);try{sfx.boom()}catch(e){}DR.sub(2.6,.45)},
  crack:()=>{noise(.18,.08,rand(2000,5000),'bandpass');tone(rand(1800,2600),.08,'square',.015,.5)},
  silence:(d)=>{CLIP.duckT=Math.max(CLIP.duckT,d)}};
function kaenClash(e,finish){const act=e.m.actor;e.invuln=true;e.busy=99;e.m.lock=99;e.hp=1;e.kShield=0;P.invuln=99;P.flying=false;P.glide=false;P.inferno=0;for(const p of eProjs)scene.remove(p.s);eProjs.length=0;for(const o of enemies)if(!o.dead&&o!==e)removeEnemy(o);kShieldHide(e);
  const dir=V3(e.pos.x-P.pos.x,0,e.pos.z-P.pos.z);if(dir.lengthSq()<.01)dir.set(0,0,1);dir.normalize();const kp=P.pos.clone().addScaledVector(dir,11);kp.y=groundAt(kp.x,kp.z);e.pos.copy(kp);e.m.g.position.copy(kp);
  P.face=Math.atan2(dir.x,dir.z);e.m.g.rotation.y=Math.atan2(-dir.x,-dir.z);const side=V3(dir.z,0,-dir.x);
  const hW=()=>headOf(P.pos,1.45).addScaledVector(dir,.7),hK=()=>headOf(e.pos,2.1).addScaledVector(dir,-.9);let bV=null,bG=null,orb=null,gOrb=null,vOrb=null,T=0,m=.5;const junk=[];
  const upd=dt=>{T+=dt;e.t+=dt;try{kaenFx(e,dt);act.update(dt)}catch(x){}};
  const mid=()=>V3().lerpVectors(hW(),hK(),m);const C0=V3().lerpVectors(P.pos,kp,.5);
  const ash=()=>{if(Math.random()<.7)SP.emit(V3(C0.x+rand(-14,14),C0.y+rand(6,12),C0.z+rand(-14,14)),{c0:0xb0a0c0,c1:0x30283a,s0:.25,s1:.05,life:3,up:-1.2,speed:.3})};
  let crT=0;
  playCutscene([
    /* 1. the standoff: silence, heartbeat, ash falling */
    {dur:2.6,fov:30,cut:true,title:[HERO.name+' & Kaen','The last clash'],cam:k=>({pos:V3().lerpVectors(P.pos,kp,.5).addScaledVector(side,9-k*1.5).add(V3(0,.6+k*.3,0)),look:V3().lerpVectors(headOf(P.pos,1.4),headOf(kp,1.8),.5)}),
      onStart:()=>{DR.silence(14);DR.heart();setTimeout(DR.heart,1100);P.heroAnim='Spell_Simple_Idle_Loop';try{act.setBase('Spell_Simple_Idle_Loop',.3)}catch(x){}},update:dt=>{upd(dt);ash()}},
    /* 2. Kaen charges his sabre */
    {dur:1.9,fov:34,cut:true,cam:k=>({pos:headOf(kp,1.6).addScaledVector(dir,-3.4+k*.6).addScaledVector(side,-1.6),look:headOf(kp,1.9)}),
      onStart:()=>{vOrb=glowSprite(0xa050ff,2,1);scene.add(vOrb);DR.riser(1.9);try{sfx.void&&sfx.void()}catch(x){}},
      update:(dt,k)=>{upd(dt);ash();vOrb.position.copy(hK());vOrb.scale.setScalar(1.5+k*4+Math.sin(T*30)*.3);if(Math.random()<.8)SP.emit(hK(),{n:2,c0:0xe0c0ff,c1:0x5010a0,s0:.4,s1:.05,life:.4,speed:-3});if(Math.random()<dt*6)lightning(hK(),hK().add(V3(rand(-1.5,1.5),rand(-1,1.5),rand(-1.5,1.5))),0xb070ff)}},
    /* 3. she answers: gold gathers in her hands */
    {dur:1.9,fov:34,cut:true,cam:k=>({pos:headOf(P.pos,1.55).addScaledVector(dir,3.3-k*.5).addScaledVector(side,1.4),look:headOf(P.pos,1.5)}),
      onStart:()=>{gOrb=glowSprite(0xffc040,2,1);scene.add(gOrb);DR.riser(1.9);try{sfx.charge&&sfx.charge()}catch(x){}runeFlash(P.pos,0xffc040,5,1.5)},
      update:(dt,k)=>{upd(dt);ash();gOrb.position.copy(hW());gOrb.scale.setScalar(1.5+k*4+Math.sin(T*28)*.3);if(Math.random()<.8)SP.emit(hW(),{n:2,c0:0xfff0c0,c1:0xa06010,s0:.4,s1:.05,life:.4,speed:-3});if(Math.random()<.5)SP.emit(V3(P.pos.x+rand(-1,1),P.pos.y+rand(0,2.4),P.pos.z+rand(-1,1)),{c0:0xffe8a0,c1:0x603000,s0:.4,s1:.05,life:.8,up:3,speed:.4})}},
    /* 4. release: beams meet, violet pushes her back */
    {dur:2.4,fov:44,cut:true,cam:k=>{const c=mid();return{pos:c.clone().addScaledVector(side,8-k*1.2).add(V3(0,1.4,0)),look:c}},
      onStart:()=>{act.fire('OverhandThrow',.9);P.heroAnim='Spell_Simple_Shoot';for(const o of[gOrb,vOrb])if(o)scene.remove(o);bV=clashBeam(0xa050ff,.24);bG=clashBeam(0xffc040,.2);orb=glowSprite(0xffffff,4,1);scene.add(orb);DR.slam();P.shake=1.2;try{sfx.chain&&sfx.chain()}catch(x){}flash(hK(),0xa050ff,10);flash(hW(),0xffc040,10)},
      update:(dt,k)=>{upd(dt);m=.5-.2*Math.sin(Math.min(1,k*1.2)*Math.PI/2);const c=mid();bV.userData.w=.24+k*.06;bG.userData.w=.2-k*.05;bV.set(hK(),c,T);bG.set(hW(),c,T);orb.position.copy(c);orb.scale.setScalar(4+Math.sin(T*30)*.9);P.shake=Math.max(P.shake,.4);
        crT-=dt;if(crT<=0){crT=.12;DR.crack()}if(Math.random()<.9)SP.emit(c,{n:5,c0:Math.random()<.6?0xd0a0ff:0xffe8a0,c1:0x6020c0,speed:9,life:.45,s0:.5,s1:.05});if(Math.random()<dt*10)lightning(c,c.clone().add(V3(rand(-2.5,2.5),rand(-1.5,2.5),rand(-2.5,2.5))),0xb070ff)}},
    /* 5. over her shoulder: she digs in */
    {dur:1.8,fov:38,cut:true,cam:k=>({pos:headOf(P.pos,1.9).addScaledVector(dir,-2.6).addScaledVector(side,1.1),look:mid()}),
      onStart:()=>{DR.heart();DR.riser(1.8)},
      update:(dt,k)=>{upd(dt);m=.3+k*.08;const c=mid();bV.set(hK(),c,T);bG.set(hW(),c,T);orb.position.copy(c);bG.userData.w=.15+k*.15;orb.scale.setScalar(4.5+k*1.5+Math.sin(T*30));P.shake=Math.max(P.shake,.5+k*.4);crT-=dt;if(crT<=0){crT=.09;DR.crack()}if(Math.random()<.9)SP.emit(c,{n:6,c0:0xffffff,c1:Math.random()<.5?0xffa020:0x6020c0,speed:11,life:.4,s0:.5,s1:.05})}},
    /* 6. gold surges through the violet */
    {dur:2.2,fov:46,cut:true,cam:k=>{const c=mid();const a=k*1.3;return{pos:c.clone().addScaledVector(side,Math.cos(a)*7).addScaledVector(dir,Math.sin(a)*7).add(V3(0,1.6+k*1.5,0)),look:c}},
      onStart:()=>{try{if(!sfxPlay('inferno',.6,{rate:.9}))sfx.inferno&&sfx.inferno()}catch(x){}DR.sub(2.4,.35);flash(mid(),0xffc040,14)},
      update:(dt,k)=>{upd(dt);m=lerp(.38,.96,Math.pow(k,1.7));const c=mid();bV.userData.w=Math.max(.05,.3-k*.25);bG.userData.w=.3+k*.35;bV.set(hK(),c,T);bG.set(hW(),c,T);orb.position.copy(c);orb.scale.setScalar(5+k*4+Math.sin(T*30));P.shake=Math.max(P.shake,.7+k*.8);
        crT-=dt;if(crT<=0){crT=.07;DR.crack()}if(Math.random()<.95)SP.emit(c,{n:8,c0:0xffffff,c1:0xffb030,speed:14,life:.5,s0:.6,s1:.05})}},
    /* 7. slow motion: the light reaches his face */
    {dur:1.6,fov:28,cut:true,cam:k=>({pos:headOf(kp,1.95).addScaledVector(dir,-1.7).addScaledVector(side,.5),look:headOf(kp,1.95)}),
      onStart:()=>{CS.speed=.45;if(bV){scene.remove(bV);bV=null}DR.silence(6);tone(880,1.4,'sine',.04,.5,0,null,.6);noise(1.4,.05,400,'lowpass',null,{brown:true})},
      update:(dt,k)=>{upd(dt);if(bG){bG.userData.w=.6;bG.set(hW(),headOf(kp,1.9),T)}if(orb){orb.position.copy(headOf(kp,1.9).addScaledVector(dir,-1.2*(1-k)));orb.scale.setScalar(6+k*6)}}},
    /* 8. impact */
    {dur:2.4,fov:56,cut:true,cam:k=>({pos:headOf(kp,3).addScaledVector(dir,-12-k*6).addScaledVector(side,5).add(V3(0,k*3,0)),look:headOf(kp,1.6)}),
      onStart:()=>{CS.speed=1;const c=eCenter(e);flash(c,0xffffff,26);flash(c,0xffc040,22);for(let i=0;i<5;i++)after(i*.12,()=>ring(kp,i%2?0xfff0b0:0xffc040,1,10+i*7,.9));runeFlash(kp,0xffc040,16,2.5);goldPillar(kp);
        SP.emit(c,{n:320,c0:0xffffff,c1:0xffc040,speed:24,life:1.4,s0:1,s1:.1});SM.emit(V3(kp.x,kp.y+.4,kp.z),{n:40,c0:0x807050,c1:0x201810,s0:2,s1:8,speed:10,life:1.8,a:.5,flat:true});
        P.shake=2.4;DR.slam();try{sfx.meteor&&sfx.meteor()}catch(x){}setTimeout(()=>{try{sfx.boom()}catch(x){}},260);try{act.once('Hit_Knockback',1.4)}catch(x){}vib([120,60,260])},
      update:(dt,k)=>{upd(dt);if(bG){bG.userData.w=.6*(1-k*1.6);if(k>.55){scene.remove(bG);bG=null}else bG.set(hW(),headOf(kp,1.8),T)}if(orb){orb.position.copy(eCenter(e));orb.scale.setScalar(Math.max(.1,12*(1-k)))}}},
    /* 9. aftermath: silence, ash, her breathing */
    {dur:2.4,fov:40,cut:true,cam:k=>({pos:headOf(P.pos,1.5).addScaledVector(dir,-4.5-k*2).addScaledVector(side,2.4).add(V3(0,k*1.5,0)),look:V3().lerpVectors(headOf(P.pos,1.3),headOf(kp,1),.5)}),
      onStart:()=>{P.heroAnim='Spell_Simple_Idle_Loop';if(orb){scene.remove(orb);orb=null}noise(2.4,.04,300,'lowpass',null,{brown:true});setTimeout(DR.heart,500)},update:dt=>{upd(dt);ash();ash()}}
  ],()=>{CS.speed=1;for(const o of[bV,bG,orb,gOrb,vOrb])if(o)scene.remove(o);P.heroAnim=null;P.invuln=2;e.invuln=false;e.busy=0;e.m.lock=0;e.hp=0;finish()})}

/* ---------- Bilel falls: Kaen feeds on it (+15% health) ---------- */
{const _wa=witchAwaken;witchAwaken=function(e){if(MODE==='open'||!e||e.dead)return _wa.apply(this,arguments);const act=e.m.actor;const c=e.pos.clone();e.invuln=true;e.busy=99;e.m.lock=99;let T=0;
  const upd=dt=>{T+=dt;e.t+=dt;try{kaenFx(e,dt);act.update(dt)}catch(x){}};
  playCutscene([{dur:2.8,fov:36,cut:true,title:['Kaen Kuroshiba','Void surge · +15%'],cam:k=>{const a=e.m.g.rotation.y+.4+k*.8;return{pos:V3(c.x+Math.sin(a)*5.5,c.y+1+k*1.2,c.z+Math.cos(a)*5.5),look:headOf(c,1.7)}},
    onStart:()=>{try{act.setBase('Spell_Simple_Idle_Loop',.2)}catch(x){}e.hp=Math.min(e.maxhp,e.hp+Math.round(e.maxhp*.15));flash(c,0xa050ff,14);runeFlash(c,0xa050ff,8,2);for(let i=0;i<3;i++)after(i*.3,()=>ring(c,0xc090ff,1,6+i*4,.7));DR.riser(1.4);setTimeout(()=>{try{sfx.void&&sfx.void()}catch(x){}DR.sub(1.6,.3)},900);P.shake=.8;
      floatText(headOf(c,3.2),'+15%','#c090ff',true)},
    update:dt=>{upd(dt);if(Math.random()<.9)SP.emit(V3(c.x+rand(-1.4,1.4),c.y+rand(0,.5),c.z+rand(-1.4,1.4)),{c0:0xe0c0ff,c1:0x4010a0,s0:.6,s1:.05,life:1,up:6,speed:.5})}}],
    ()=>{e.invuln=false;e.busy=0;e.m.lock=0;_wa.call(this,e)})}}

/* ---------- while her Limit Breaker burns, Kaen throws up void shields: most of the damage, not all ---------- */
const KSH={geo:null};
function kShieldMat(){return new THREE.ShaderMaterial({uniforms:{uT:{value:0},uH:{value:0},uA:{value:0}},transparent:true,depthWrite:false,blending:THREE.AdditiveBlending,side:THREE.DoubleSide,
  vertexShader:'varying vec3 vN;varying vec3 vV;varying vec3 vP;void main(){vec4 mv=modelViewMatrix*vec4(position,1.);vN=normalize(normalMatrix*normal);vV=normalize(-mv.xyz);vP=position;gl_Position=projectionMatrix*mv;}',
  fragmentShader:'uniform float uT,uH,uA;varying vec3 vN;varying vec3 vV;varying vec3 vP;float hex(vec2 p){p.x*=1.1547;p.y+=mod(floor(p.x),2.)*.5;p=abs(fract(p)-.5);return abs(max(p.x*1.5+p.y,p.y*2.)-1.);}void main(){float f=pow(1.-abs(dot(vN,vV)),2.);vec2 uv=vec2(atan(vP.z,vP.x)*2.2,vP.y*1.6);float h=smoothstep(.08,.0,hex(uv*1.8+vec2(0.,uT*.15)));float sc=.6+.4*sin(vP.y*8.-uT*5.);vec3 c=mix(vec3(.55,.25,1.),vec3(1.,.9,1.),uH);gl_FragColor=vec4(c*(f*1.4+h*.9*sc+uH*.6),uA*(f*.8+h*.55+uH*.4));}'})}
function kShieldShow(e){if(!e.kSm){if(!KSH.geo)KSH.geo=new THREE.IcosahedronGeometry(1,3);const m=new THREE.Mesh(KSH.geo,kShieldMat());m.renderOrder=5;m.frustumCulled=false;scene.add(m);e.kSm=m}e.kSm.visible=true}
function kShieldHide(e){if(e&&e.kSm){e.kSm.visible=false;e.kSm.material.uniforms.uA.value=0}}
function kShieldTick(dt){const e=bossRef;if(MODE==='open'||!e||e.dead||e.type!=='illusion'||!e.ai||!e.ai.lbDone){return}
  const on=P.lbT>0&&!CS.active&&!e._clash;if(!on){if(e.kShield>0){e.kShield=0}if(e.kSm){const u=e.kSm.material.uniforms;u.uA.value=Math.max(0,u.uA.value-dt*3);if(u.uA.value<=0)e.kSm.visible=false}return}
  e.kShT=(e.kShT===undefined?.6:e.kShT)-dt;
  if(e.kShield>0){e.kShield-=dt;if(e.kShield<=0){e.kShT=rand(1.4,2);try{sfx.shatter()}catch(x){}SP.emit(eCenter(e),{n:60,c0:0xe0c0ff,c1:0x5010a0,speed:9,life:.6,s0:.5,s1:.1})}}
  else if(e.kShT<=0){e.kShield=rand(2.8,3.6);kShieldShow(e);try{sfx.void&&sfx.void()}catch(x){}flash(eCenter(e),0xa050ff,8);if(!KSH.told){KSH.told=true;toast('Kaen hides behind void shields. Hit him hardest when they break.','Void shield',true)}}
  if(e.kSm){const m=e.kSm,u=m.material.uniforms;m.position.copy(eCenter(e));m.position.y+=.4;const r=(e.def.r||1)*2.2+1.4;m.scale.setScalar(r*(1+Math.sin(time*6)*.015));u.uT.value=time;u.uH.value=Math.max(0,u.uH.value-dt*4);u.uA.value=e.kShield>0?Math.min(1,u.uA.value+dt*5):Math.max(0,u.uA.value-dt*4);if(u.uA.value<=0&&e.kShield<=0)m.visible=false}}
{const _de3=damageEnemy;damageEnemy=function(e,amt,color,dot){if(e&&e.kShield>0&&!e.dead&&e.kSm){amt*=.22;const u=e.kSm.material.uniforms;u.uH.value=1;if(!dot){if(Math.random()<.35)floatText(eCenter(e).add(V3(rand(-.6,.6),1.4,0)),'absorbed','#c8a0ff');try{if(!sfxPlay('shatter',.18,{rate:1.6,gap:.12}))tone(rand(1400,2200),.06,'triangle',.03,.7)}catch(x){}}}return _de3.call(this,e,amt,color,dot)}}
{const _mt=muTick;muTick=function(dt){_mt(dt);try{kShieldTick(dt)}catch(x){console.warn('ksh',x)}}}
{const _rm=removeEnemy;removeEnemy=function(e){if(e&&e.kSm){scene.remove(e.kSm);e.kSm=null}return _rm.apply(this,arguments)}}

{const _ke=killEnemy;killEnemy=function(e){if(e&&e.type==='illusion'&&MODE!=='open'&&!e._clash&&e.def&&e.def.boss&&e.ai&&e.ai.lbDone&&!CS.active){e._clash=true;
  try{e.hp=0;e.invuln=true;e.busy=99;e.m.lock=99;e.kShield=0;kShieldHide(e);P.invuln=99;for(const p of eProjs)scene.remove(p.s);eProjs.length=0;const bf=$('bossFill');if(bf)bf.style.transform='scaleX(0)';
    const c=eCenter(e);flash(c,0xffffff,10);SP.emit(c,{n:80,c0:0xffffff,c1:0xa050ff,speed:10,life:.8});hitStop=.35;P.shake=1;try{e.m.actor.once('Hit_Knockback',1.2)}catch(x){}try{sfx.boom()}catch(x){}floatText(headOf(e.pos,3),'0%','#ff6a7a',true);
    after(1.4,()=>{try{kaenClash(e,()=>_ke(e))}catch(x){console.warn('clash',x);_ke(e)}});return}catch(x){console.warn('clash',x)}}return _ke.apply(this,arguments)}}

/* story river: grid types so she can swim, hop out at the banks, or hop and call the broom */
if(MODE!=='open'){gType=function(x,z){if(x<WB.x0||x>WB.x1||z<WB.z0||z>WB.z1)return 0;if(stWater(x,z))return 2;if(stBridge(x,z))return 5;if(boxAt(x,z))return 7;return 1}}
/* in water with no bank in reach: a real little hop, so a second jump calls the broom */
{const _dj2=doJump;doJump=function(){const sw=P.swim;_dj2.apply(this,arguments);if(sw&&P.swim&&!P.climb){P.vy=Math.max(P.vy,7.5);P.swim=false;P.onGround=false;P.pos.y=Math.max(P.pos.y,groundAt(P.pos.x,P.pos.z)+.45);try{SP.emit(V3(P.pos.x,P.pos.y+.4,P.pos.z),{n:16,c0:0xe8f4ff,c1:0x6a8aa8,s0:.5,s1:.1,life:.7,up:3,speed:3})}catch(e){}}}}

/* ---------- open world traffic: fewer horns (blocking a car on the road still gets you honked) ---------- */
const HK={next:0};
{const _h=honk;honk=function(c){const now=performance.now()*.001;const air=P.flying||P.glide||P.pos.y>(c.y||0)+2.5;
  if(air&&Math.random()>.08)return;if(now<HK.next)return;const d=Math.hypot(c.x-P.pos.x,c.z-P.pos.z);if(d>10&&Math.random()<.6)return;HK.next=now+rand(3.2,6);return _h.apply(this,arguments)}}

/* ---------- voices: only real recorded lines that match the text, matched to the speaker's gender, each person pitched a little differently ---------- */
function nvExact(text,g){const L=NVD[nvNorm(text)];if(!L)return null;const c=g?L.filter(x=>x[1]===g):L;return c.length?c[(Math.random()*c.length)|0][0]:null}
function nvVoiced(text,g){if(!text)return false;if(nvExact(text,g))return true;return String(text).split(/(?<=[.!?…])\s+/).some(p=>nvExact(p,g))}
function nvRate(n){if(!n||n.hero)return 1;const s=(n.seed||7)>>>0;let r=.93+((s>>>5)%15)/100;const a=n.arch;if(a==='elderly'||(n.age&&n.age>62))r*=.95;else if(a==='student'||a==='tourist'||a==='chat')r*=1.03;else if(a==='posh')r*=.97;return clamp(r,.88,1.09)}
function nvPlayKey2(k,vol,pri,who,rate,onend){if(!AC||muted)return false;if(NVS.src&&pri<NVS.pri)return false;nvStop();NVS.pri=pri;NVS.who=who;
  clipLoad(k).then(b=>{if(!b||NVS.who!==who)return;const s=AC.createBufferSource();s.buffer=b;s.playbackRate.value=rate||1;const g=AC.createGain();g.gain.value=vol;s.connect(g);g.connect(master);if(verbIn){const w=AC.createGain();w.gain.value=.12*vol;g.connect(w);w.connect(verbIn)}
    s.onended=()=>{if(NVS.src===s){NVS.src=null;NVS.pri=0;NVS.who=null}if(onend)onend()};s.start(0);NVS.src=s;if(who&&who.st==='talk')who.talkAnim='talk'});return true}
sayLine=function(n,text,o={}){if(!text||muted)return;const d=n&&n.x!==undefined?Math.hypot(n.x-P.pos.x,n.z-P.pos.z):0;if(d>34)return;
  const g=n&&n.L?(n.L.f?'f':'m'):null;let k=nvExact(text,g);
  if(!k){for(const p of String(text).split(/(?<=[.!?…])\s+/)){k=nvExact(p,g);if(k)break}}
  if(!k)return;const vol=clamp((o.vol||1)*(1/(1+d*.09)),.05,1)*.9;nvPlayKey2(k,vol,o.pri||1,n||{},nvRate(n)*(o.rate||1),o.onend)};
/* when you talk to someone, they answer with a line they can actually say out loud */
{const _lt=localTalk;localTalk=function(n,text){const g=n&&n.L?(n.L.f?'f':'m'):null;const t=String(text).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'');
  const matched=TALK_R.some(([re])=>re.test(t));let r=null;for(let i=0;i<16;i++){r=_lt.call(this,n,text);if(nvVoiced(r.say,g))return r}
  const greet=/^(bonjour|bonsoir|salut|hello|hi|hey|coucou|yo)\b/.test(t.trim());if((!matched||greet)&&typeof dzLine==='function'){for(let i=0;i<5;i++){const l=dzLine(n);if(l&&nvVoiced(l,g))return{say:l,anim:'talk'}}}return r}}
{const _pl2=pickLine;pickLine=function(kind,n){const g=n&&n.L?(n.L.f?'f':'m'):null;let l=null;for(let i=0;i<10;i++){l=_pl2.call(this,kind,n);if(!n||nvVoiced(l,g))return l}return l}}

/* ---------- Kaen: the bar really empties first, he staggers, then the clash ---------- */
{const _de4=damageEnemy;damageEnemy=function(e,amt,color,dot){if(e&&!e.dead&&!e.invuln&&e.type==='illusion'&&MODE!=='open'&&e.ai&&e.ai.lbDone&&!e._clash){const cap=e.maxhp*.06,h0=e.hp;
    if(h0>cap*1.02){const f0=e.hpFloor;e.hpFloor=Math.max(f0||0,(h0-cap)/e.maxhp);const r=_de4.apply(this,arguments);e.hpFloor=f0;return r}}return _de4.apply(this,arguments)}}
