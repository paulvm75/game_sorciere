/* ================= CHAPTER XI · THE ESCAPE: Kaen freed, the Warden, the chase across the Channel, home to Paris ================= */
Object.assign(SPEAKER,{'The Warden':'#7dff9a','The Tower':'#7dff9a'});
/* ---------- voices: everything v4. Kaen in a fight = his original voice, Kaen as a spirit = the Tower voice ---------- */
EPL.kill="I'm gonna kill you, witch... KILL YOU!";
delete VO_MAP["I'm gonna kill you, witch."];Object.assign(VO_MAP,{[EPL.scream]:'kj_scream',[EPL.kill]:'vo_kaen_kill',[EPL.sum]:'kj_sum'});
Object.assign(LY,{ly27:'Maëlle! You cannot win this, not here! Cross the Channel, now! Fly!',ly28:'You made it! Both of you! Into the door, quickly!',ly29:'Not here, brother. Through the door. Then you can cry.',
  ly30:'Now we give you a body back. The old books say a soul can be bound again, with three things.',ly31:"Ash from the place it fell. A heart that still beats for him. And the Crown's own silver, from the vault under the Tower.",
  ly32:'The ash is still on the Trocadéro, where his body fell. Start there, Maëlle.',ly33:'Take this. A sea-glass gem. It channels the power of the sea, so your broom never tires over water. Over land, you are on your own.',
  ly34:'Hold on, both of you. I am opening the door.'});
for(let i=27;i<=34;i++)VO_MAP[LY['ly'+i]]='ly'+i;
const SL={
  k01:'Free... and still a ghost. You burned my body to ash in Paris, witch.',k02:'Fair enough. It is what it is. A ghost is better than a slave.',
  k03:'I cannot shield you, I have no body left! Dodge the green light, it will burn straight through you!',k04:"On a witch's broom. Bilel would laugh himself sick.",
  k05:'Hold on, witch! Hold on!',k06:'Faster! He is right behind us!',k07:'If I had my body back, I would rip that crown off his head with my bare hands.',k08:'Ten years in chains, and now I am a passenger.',
  k09:'Hold on! Do not look back!',k11:'He is coming up to us! Get ready!',k12:'Lyra. Little sister.',k13:'So. A ghost, a witch, and my sister. What now?',
  k14:"And while we are there, we finish the Warden. If the Tower keeps the Crown's fire, it will follow us here. To Paris.",k15:'Stop! I said STOP!',k16:'Witch, you are killing me!',k17:'Please. No more.',k18:'Aaagh!',k19:'Good! Again, witch!',
  m01:'In my defence, it was trying to kill me at the time.',m02:'Kaen, get on the broom! Now!',m03:"Okay. Okay. We're fine. We're totally fine.",m04:"He's gaining on us, Kaen!",m05:'I crossed this sea once. I can do it twice!',
  m06:"Too many bats! There's too many!",m07:'I can see Calais! I can see it!',m08:'Get back!',m09:'Not today!',m10:"So we're going back to London. Of course we are.",m11:"Then we end it in London. It doesn't touch Paris. Not again.",
  m12:'Kaen? KAEN!',m13:"Your shadows don't scare me!",m14:'Come out and fight me yourself!',m16:"He's too strong. I can't keep this up!",
  t01:"You think the Tower lets its prisoners walk out? I AM the Tower! And the Crown's fire still burns in me!",t02:"I'M GONNA KILL YOU ALL!",t03:'You cannot outfly the Tower!',t04:'Your sister will burn too, Kaen!',
  t05:'COME BACK HERE!',t06:'This is not over! London always collects!',t07:'Burn.',t08:'Run, little witch. Run!'};
for(const k in SL){const p=k[0],n=k.slice(1);VO_MAP[SL[k]]=p==='k'?'k2_'+n:p==='m'?'m2_'+n:'t2_'+n}
for(const k of['k2_01','k2_02','k2_03','k2_04','k2_05','k2_06','k2_07','k2_08','k2_09','k2_11','k2_12','k2_13','k2_14','k2_15','k2_16','k2_17','k2_18','k2_19'])VO_SPIRIT.add(k);
// Greyfang finally speaks
{const G=['A French witch. The Crown said you would come crawling.','Then you will fall the whole way down.',...GF_T,'Children of the Crown! Feed!','The Crown... sees you... witch... it always sees...'];G.forEach((t,i)=>VO_MAP[t]='g_0'+(i+1))}
// Kaen has more to say in his fight (original voice), and so does Maëlle
BK.illusion.taunt.push(['kj_t1','Your fire is a candle against the void.'],['kj_t2','Look closer, witch. Which of me bleeds?'],['kj_t3','Paris was mine long before you were born.'],['kj_t4','You are dancing inside my illusion.']);
BK.illusion.hurt.push(['kj_h1','A scratch. Nothing more.'],['kj_h2','You will regret that.']);BK.illusion.rage.push(['kj_r1','I will tear your soul out of that ridiculous hat!'],['kj_r2','Enough games! Burn!']);
BK['@'].v_kaen=[['m2_13',SL.m13],['m2_14',SL.m14]];
{let vt=20;const _bt=barkTick;barkTick=function(dt){_bt(dt);const b=bossRef&&!bossRef.dead?bossRef:null;if(!b||b.type!=='illusion'||CS.active||!P.alive){vt=20;return}vt-=dt;if(vt<=0){vt=rand(24,34);bark('@','v_kaen',1,0,.7)}}}
/* cineLine now speaks when the line is voiced */
function epVoice(text,vol){const k=VO_MAP[text];if(!k||muted||!AC)return 0;const go=b=>{if(!b||muted)return;const s=AC.createBufferSource();s.buffer=b;const sp=VO_SPIRIT.has(k);if(sp)s.playbackRate.value=.94;const g=AC.createGain();g.gain.value=vol||1.3;s.connect(g);g.connect(master);
    if(verbIn){const w=AC.createGain();w.gain.value=sp?.4:.14;g.connect(w);w.connect(verbIn)}s.start(0);CLIP.duckT=Math.max(CLIP.duckT,b.duration)};if(CLIP.buf[k])go(CLIP.buf[k]);else voLoad(k).then(go);return CLIP.buf[k]?CLIP.buf[k].duration:2.6}
{const _cl=cineLine;cineLine=function(who,text){_cl.apply(this,arguments);if(!CS.active)epVoice(text)}}
// a little queue so lines in flight never talk over each other
const SAYQ={q:[],free:0,on:0,until:0,wait:0,src:null};function epSay(who,text,prio){if(prio)SAYQ.q.unshift([who,text]);else if(SAYQ.q.length<8)SAYQ.q.push([who,text]);const k=VO_MAP[text];if(k&&!CLIP.buf[k])try{voLoad(k)}catch(x){}}
/* one line at a time: the next line only starts once the voice has really finished */
const sayEl=(()=>{const st=document.createElement('style');st.textContent='#sayLine{position:fixed;left:50%;bottom:150px;transform:translate(-50%,6px);max-width:min(680px,90vw);padding:9px 18px;border-radius:12px;background:rgba(8,6,18,.55);backdrop-filter:blur(6px);color:#f3ead6;font:500 16.5px/1.4 Outfit,system-ui,sans-serif;text-align:center;opacity:0;pointer-events:none;transition:opacity .3s,transform .3s;z-index:40;text-shadow:0 1px 3px rgba(0,0,0,.7)}#sayLine.on{opacity:1;transform:translate(-50%,0)}#sayLine b{font:italic 600 16px Fraunces,Georgia,serif;margin-right:8px}@media (max-width:760px){#sayLine{bottom:190px;font-size:14.5px}}';document.head.appendChild(st);const d=document.createElement('div');d.id='sayLine';document.body.appendChild(d);return d})();
function sayLine(who,text,dur){const nm=who==='@'?(HERO.name||'Maëlle'):who;sayEl.innerHTML=`<b style="color:${SPEAKER[who]||'#c9a6ff'}">${nm}</b>${text}`;sayEl.classList.add('on');clearTimeout(sayEl._t);sayEl._t=setTimeout(()=>sayEl.classList.remove('on'),(dur+.5)*1000)}
function sayVoice(k,b){if(!AC||muted)return;const s=AC.createBufferSource();s.buffer=b;const sp=VO_SPIRIT.has(k);if(sp)s.playbackRate.value=.94;const g=AC.createGain();g.gain.value=1.35;s.connect(g);g.connect(master);if(verbIn){const w=AC.createGain();w.gain.value=sp?.35:.1;g.connect(w);w.connect(verbIn)}s.start(0);SAYQ.src=s;CLIP.duckT=Math.max(CLIP.duckT,b.duration);s.onended=()=>{if(SAYQ.src===s){SAYQ.src=null;SAYQ.until=Math.min(SAYQ.until,performance.now()*.001+.05)}}}
{const _mt=muTick;muTick=function(dt){_mt(dt);const now=performance.now()*.001;if(SAYQ.on){if(now<SAYQ.until)return;SAYQ.on=0;SAYQ.free=now+.45}if(!SAYQ.q.length||now<SAYQ.free||CS.active)return;
  const [w,t]=SAYQ.q[0];const k=VO_MAP[t];const live=AC&&!muted;if(k&&live&&!CLIP.buf[k]){if(!SAYQ.wait){SAYQ.wait=now;try{voLoad(k)}catch(x){}}if(now-SAYQ.wait<3)return}SAYQ.wait=0;SAYQ.q.shift();
  const b=k&&live?CLIP.buf[k]:null;const d=b?b.duration/(VO_SPIRIT.has(k)?.94:1):Math.max(1.8,t.length/14);sayLine(w,t,d);SAYQ.on=1;SAYQ.until=now+d+(b?1.2:0);if(b)sayVoice(k,b);
  for(const n of SAYQ.q.slice(0,2)){const kk=VO_MAP[n[1]];if(kk&&!CLIP.buf[kk])try{voLoad(kk)}catch(x){}}}}
/* companions never talk over the queue */
{const _cl=cineLine;cineLine=function(who,text){if(!CS.active&&started&&MODE!=='open'&&(VO_MAP[text]||who==='@'||/Kaen|Lyra|Warden|Vesper/.test(who))){epSay(who,text);return}return _cl.apply(this,arguments)}}
/* a cutscene takes the stage: the line in flight fades out instead of talking over it */
function sayHush(){const s=SAYQ.src;SAYQ.src=null;if(s&&AC)try{s.stop(AC.currentTime+.12)}catch(x){}SAYQ.on=0;SAYQ.q.length=0;SAYQ.free=performance.now()*.001+.6;sayEl.classList.remove('on');BAN.busy=0}
{const _pc=playCutscene;playCutscene=function(){sayHush();return _pc.apply(this,arguments)}}

/* ---------- Lyra hands over the sea-glass gem at Calais ---------- */
{const _pc=playCutscene;playCutscene=function(shots,done){try{const i=shots.findIndex(s=>s.who==='Lyra'&&s.text===LY.ly15);if(i>=0&&!shots.some(s=>s.text===LY.ly33)){const cam=shots[i].cam;
    shots.splice(i+1,0,{who:'Lyra',text:LY.ly33,cam,onStart:()=>{CH2.gem=1;const h=headOf(P.pos,1.2);flash(h,0x60e0ff,8);SP.emit(h,{n:60,c0:0xffffff,c1:0x30c0ff,speed:4,life:.9});sx('ding',.8)}})}}catch(e){}return _pc.call(this,shots,done)}}

/* ---------- Kaen raises his hands, the light gathers, the guardians rise ---------- */
function epSummonShots(e){const act=e.m.actor;const c=e.pos.clone();const d=V3(P.pos.x-c.x,0,P.pos.z-c.z).normalize();const sd=V3(d.z,0,-d.x);let gs=[],gl=[],pw=0;e.busy=99;e.m.lock=99;
  const hold=dt=>{e.t+=dt;e.pos.copy(c);e.m.g.rotation.y=Math.atan2(d.x,d.z);kaenFx(e,dt);act.update(dt);for(const s of gl){s.scale.setScalar(.4+pw*2.6+Math.sin(time*18)*.08);s.material.opacity=.5+pw*.5}};
  const hands=()=>{try{for(const b of['hand_l','hand_r']){const s=glowSprite(0xc080ff,1,.6);act.attach(b,s,act.S.SK[b].clone());gl.push(s)}}catch(x){}};
  return{shots:[
    {dur:2,fov:38,cut:true,cam:k=>({pos:headOf(c,1.5).addScaledVector(d,3.6-k*.7).addScaledVector(sd,.9),look:headOf(c,1.9)}),onStart:()=>{act.setBase('Spell_Simple_Idle_Loop',.4);hands();runeFlash(c,0x9a40ff,7,2.2);sx('portal',.7,null,{rate:.7,wet:.4})},
      update:dt=>{hold(dt);pw=Math.min(1,pw+dt*.6);for(const s of gl){const p=s.getWorldPosition(V3());if(Math.random()<.6)SP.emit(p.clone().add(V3(rand(-1,1),rand(-1,1),rand(-1,1))),{c0:0xe0c0ff,c1:0x5010c0,s0:.3,s1:.03,life:.4,speed:-3})}}},
    {who:'Kaen',text:EPL.sum,fov:46,cam:k=>{const m=gs.length?gs.reduce((s,g)=>s.add(g.pos),V3()).multiplyScalar(1/gs.length):c;return{pos:headOf(c,3.6).addScaledVector(d,-7).addScaledVector(sd,4.5),look:headOf(m,2.6)}},
      onStart:()=>{sx('summon',1.2,()=>{try{sfx.roar()}catch(x){}},{wet:.35});for(const s of gl)lightning(s.getWorldPosition(V3()),V3(c.x,c.y+30,c.z),0xd0a0ff);flash(headOf(c,2.4),0xb070ff,12);
        gs=summonGuardians(e,2);for(const g of gs){g.m.g.scale.setScalar(.01);g._grow=0;runeFlash(g.pos,0xa050ff,9,2)}},
      update:dt=>{hold(dt);for(const g of gs){g._grow=Math.min(1,(g._grow||0)+dt*.7);const k=g._grow;g.m.g.scale.setScalar(Math.max(.01,k*k*(3-2*k)));g.m.g.position.copy(g.pos);if(Math.random()<.7)SM.emit(V3(g.pos.x+rand(-2,2),g.pos.y+rand(0,4),g.pos.z+rand(-2,2)),{c0:0xb080ff,c1:0x200840,s0:1,s1:3,life:1,a:.4,up:2})}}},
    {dur:2.4,fov:50,cut:true,title:['Two guardians','One is real. One is a lie.'],cam:k=>({pos:headOf(c,7+k*2).addScaledVector(d,20-k*3).addScaledVector(sd,-6),look:headOf(c,4)}),onStart:()=>{for(const g of gs)g.m.g.scale.setScalar(1)},update:hold}
  ],done:()=>{e.busy=0;e.m.lock=0;for(const s of gl)if(s.parent)s.parent.remove(s);for(const g of gs)g.m.g.scale.setScalar(1);act.setBase('Idle_Loop',.3);after(.8,()=>bark('@','m_illu',3,0))}}}
epSummon=function(e){const s=epSummonShots(e);playCutscene(s.shots,s.done)};


/* ---------- keep hitting the chains and they kill him ---------- */
NZQ.hits=0;
{const _mt=muTick;muTick=function(dt){_mt(dt);if(MODE==='open'||CH2.zone!=='north'||!NZ.green||CH2.st!==5||NZQ.stage<1||NZQ.quiz||CS.active||!P.alive)return;
  for(const p of projs){if(p._ch||Math.hypot(p.pos.x-NZ.green.x,p.pos.z-NZ.green.z)>3||p.pos.y>4)continue;p._ch=1;p.life=0;NZQ.hits++;epChainHit();break}}}
function epChainHit(){const c=NZ.green,n=NZQ.hits;sx('chain',1.2,()=>{try{sfx.boom()}catch(x){}});flash(headOf(c,1),0x60ff90,8);P.shake=.6;
  for(const l of NZQ.links){if(l.material&&l.material.emissive){l.material.emissive.setHex(0x40ff80);l.material.emissiveIntensity=1.6}if(l.userData.p0)l.position.lerpVectors(l.userData.p0,V3(c.x,l.userData.p0.y-.2,c.z+.1),Math.min(.8,.25+n*.12))}
  try{NZ.ghost.fire('Hit_Knockback',.5)}catch(x){}
  if(n>=5){epKaenCrushed();return}cineLine("Kaen's Spirit",[SL.k15,SL.k16,SL.k17,SL.k17][Math.min(3,n-1)]);if(n===3)after(2.4,()=>toast('Stop hitting the chains. One more and they crush him.','The Tower',true))}
function epKaenCrushed(){const c=NZ.green;const kS=()=>({pos:headOf(c,1.2).add(V3(2.2,.3,3)),look:headOf(c,.9)});
  playCutscene([
    {who:"Kaen's Spirit",text:SL.k18,fov:38,cut:true,cam:kS,onStart:()=>{sx('chain',1.4,null,{rate:.8});sx('impact',1,null,{rate:.5});P.shake=1.2;for(const l of NZQ.links)if(l.userData.p0)l.position.set(c.x+rand(-.3,.3),l.userData.p0.y-.3,c.z+rand(-.2,.2))},
      update:dt=>{if(NZ.ghost){NZ.ghost.g.scale.multiplyScalar(1-dt*.4);if(Math.random()<.8)SP.emit(headOf(c,1),{c0:0xd0f0ff,c1:0x2050a0,s0:.4,s1:.03,life:1,speed:3})}}},
    {who:'@',text:SL.m12,cut:true,cam:witchShot(1,2.8),onStart:()=>{if(NZ.ghost)NZ.ghost.g.visible=false;flash(headOf(c,1),0xd0f0ff,16)}}
  ],()=>{toast('The chains crushed Kaen. Never strike them more than four times.','Kaen is gone',true);NZQ.dead=1;P.invuln=0;die()})}
{const _rv=revive;revive=function(){const r=_rv.apply(this,arguments);try{if(NZQ.dead){NZQ.dead=0;NZQ.hits=0;if(NZ.ghost){NZ.ghost.g.visible=true;NZ.ghost.g.scale.setScalar(1)}for(const l of NZQ.links)if(l.userData.p0){l.position.copy(l.userData.p0);if(l.material)l.material.emissiveIntensity=.3}}
  if(CH2.chase)epChaseAbort()}catch(e){}return r}}

/* ================= Kaen follows you everywhere now: a ghost on your shoulder, on your broom ================= */
const KFW={a:null,mode:''};
function kfBuild(){if(KFW.a)return KFW.a;const a=makeCHActor('m',{skin:0xfff0ea,hair:'hairPart',hairTex:'1',hairCol:0x0b0a10,brow:0x0b0a10,keepReg:[5,6,9],wear:[['long',0x121016],['trousers',0x0f0d13],['shoes',0x0a0a0c]]});if(!a)return null;
  const gm=new THREE.MeshBasicMaterial({color:0x9ad8ff,transparent:true,opacity:.42,blending:THREE.AdditiveBlending,depthWrite:false,skinning:true});a.g.traverse(o=>{if(o.isMesh){o.material=gm;o.castShadow=false}});
  const gl=glowSprite(0x9ad8ff,3.4,.35);gl.position.y=1.1;a.g.add(gl);scene.add(a.g);a.g.position.copy(CH2.zone==='north'&&NZ.green?V3(NZ.green.x,P.pos.y,NZ.green.z):P.pos);KFW.a=a;KFW.gm=gm;try{a.setBase('Idle_Loop');a.update(.3)}catch(x){}return a}
function kfwOn(){return MODE!=='open'&&(CH2.st>=7||(CH2.st===6&&KFW.go))&&!KFW.off}
{const _mt=muTick;muTick=function(dt){_mt(dt);if(!started)return;const on=kfwOn();if(!on){if(KFW.a)KFW.a.g.visible=false;return}const a=kfBuild();if(!a)return;a.g.visible=W.g.visible!==false;if(KFW.pin){try{a.update(dt)}catch(x){}return}
  if(NZ.ghost&&CH2.zone==='north')NZ.ghost.g.visible=false;
  const f=V3(Math.sin(P.face),0,Math.cos(P.face)),r=V3(f.z,0,-f.x);const ride=P.flying||!!CH2.chase;let tgt,ry=P.face;
  if(ride){if(KFW.mode!=='ride'){KFW.mode='ride';KFW.an='';try{a.setBase('Sitting_Idle_Loop',.3)}catch(x){a.setBase('Crouch_Idle_Loop',.3)}}const wr=W.g.rotation.y,wf=V3(Math.sin(wr),0,Math.cos(wr)),sc=W.g.scale.y||1,by=W.broom?W.broom.position.y:.95;a.g.position.copy(W.g.position).addScaledVector(wf,(.1+SBR.seat)*sc);a.g.position.y+=(by+.07)*sc-(KFW.hip||.68)*a.g.scale.y;ry=wr;a.g.rotation.y=wr;
    try{if(KFW.wpG!==W.g){KFW.wpG=W.g;KFW.wp=null;W.g.traverse(o=>{if(!KFW.wp&&o.isBone&&/pelvis/i.test(o.name))KFW.wp=o})}if(!KFW.kp)a.g.traverse(o=>{if(!KFW.kp&&o.isBone&&/pelvis/i.test(o.name))KFW.kp=o});
      if(KFW.wp&&KFW.kp){a.g.updateMatrixWorld(true);const kp=KFW.kp.getWorldPosition(V3()),seat=W.g.position.clone().addScaledVector(wf,(.1+SBR.seat)*sc);const wy=KFW.wp.getWorldPosition(V3()).y;
        a.g.position.x+=seat.x-kp.x;a.g.position.z+=seat.z-kp.z;a.g.position.y+=wy-kp.y+.02}}catch(x){}}
  else{tgt=P.pos.clone().addScaledVector(f,-1.1).addScaledVector(r,-1.2);tgt.y=XII.solid?groundAt(tgt.x,tgt.z):P.pos.y+.35+Math.sin(time*1.6)*.12;if(KFW.mode!=='float'){KFW.mode='float';KFW.an='';if(!XII.solid)a.setBase('Idle_Loop',.4)}a.g.position.lerp(tgt,Math.min(1,dt*3.5));
    const dx=P.pos.x-a.g.position.x,dz=P.pos.z-a.g.position.z;if(Math.hypot(dx,dz)>.4)ry=lerpAngle(a.g.rotation.y,P.face,Math.min(1,dt*3))}
  a.g.rotation.y=ry;try{a.update(dt)}catch(x){}KFW.gm.opacity=.26+Math.sin(time*2.6)*.06;a.g.scale.setScalar(KFW.sc||1.12);if(!XII.solid&&Math.random()<.15)SP.emit(V3(a.g.position.x+rand(-.3,.3),a.g.position.y+rand(.3,1.6),a.g.position.z+rand(-.3,.3)),{c0:0xd0f0ff,c1:0x2050a0,s0:.25,s1:.03,life:.8,up:.5})}}

/* ================= after the quiz: Kaen is free, but the Tower is not done with you ================= */
function stAfterQuiz(){const c=NZ.green;const kS=sd=>()=>({pos:headOf(c,1.5).add(V3(sd||1.8,.2,2.8)),look:headOf(c,1.4)});
  playCutscene([
    {who:"Kaen's Spirit",text:SL.k01,fov:36,cut:true,cam:kS(1.6),onStart:()=>{try{NZ.ghost.setBase('Idle_Loop',.5)}catch(x){}}},
    {who:'@',text:SL.m01,cam:witchShot(-1,3)},
    {who:"Kaen's Spirit",text:SL.k02,cam:kS(-1.6)},
    {dur:2.4,fov:52,cut:true,cam:k=>({pos:V3(203,2.5+k,-9845),look:V3(226,12+k*4,-9864)}),onStart:()=>{const s=epTowerSpirit();s.ty=14;P.shake=1.4;sx('garg',1,null,{rate:.5,wet:.5});flash(V3(226,14,-9864),0x60ff90,24)}},
    {who:'The Tower',text:SL.t01,fov:40,cam:()=>({pos:V3(205,2.6,-9846),look:epEyes()})},
    {dur:3,fov:46,cut:true,title:['The Warden','The Tower takes a body'],cam:k=>({pos:V3(204,3+k*2,-9844),look:V3(226,8-k*3,-9862)}),onStart:()=>{const s=epTowerSpirit();s.ty=-14;sx('powerup',1,null,{rate:.7});sx('impact',1,null,{rate:.5});
        const at=V3(224,8,-9862);flash(at,0x60ff90,30);ring(V3(224,0,-9862),0x60ff90,1,20,.8);SP.emit(at,{n:220,c0:0xffffff,c1:0x30ff70,speed:14,life:1.2});wdSpawn(at,true)},update:dt=>{if(WD.e)WD.e.m.anim(WD.e,dt,0)}},
    {who:"Kaen's Spirit",text:SL.k03,cut:true,cam:kS(1.4)}
  ],()=>{wdFight()})}

/* ---------- the Warden: the Tower's magic, wearing a man ---------- */
const WD={e:null,t:0,lasT:4,orbT:7,said:0};
function buildWarden(){const a=makeCHActor('m',{skin:0xe8fff0,hair:'hairBuzz',hairCol:0x0a1a10,brow:0x0a1a10,keepReg:[5,6,9],wear:[['long',0x0c2a18,{roughness:.5}],['trousers',0x081a10],['shoes',0x050a08]]});
  const g=new THREE.Group(),body=new THREE.Group();g.add(body);if(a){a.g.scale.setScalar(1.7);body.add(a.g);
    a.g.traverse(o=>{if(o.isMesh&&o.material){const m=o.material.clone();m.transparent=true;m.opacity=.82;m.emissive=new THREE.Color(0x1aff70);m.emissiveIntensity=.55;m.color.lerp(new THREE.Color(0x60ffa0),.45);o.material=m}});
    try{const gold=std({color:0x3a6a30,emissive:0x40ff70,emissiveIntensity:1,metalness:.8,roughness:.3});const cr=new THREE.Group();for(let k=0;k<7;k++){const s=new THREE.Mesh(new THREE.ConeGeometry(.035,.2,5),gold);const an=k/7*TAU;s.position.set(Math.sin(an)*.13,.2,Math.cos(an)*.13);cr.add(s)}
      const band=new THREE.Mesh(new THREE.TorusGeometry(.135,.02,6,20),gold);band.rotation.x=Math.PI/2;band.position.y=.12;cr.add(band);a.attach('Head',cr,a.S.SK.Head.clone().add(V3(0,.06,0)));
      for(const s of[-1,1]){const e=glowSprite(0x9affb0,.22,1,false);a.attach('Head',e,a.S.SK.Head.clone().add(V3(s*.035,.07,.09)))}}catch(x){}
    try{a.setBase('Spell_Simple_Idle_Loop');a.update(.3)}catch(x){}}
  const aura=glowSprite(0x50ff90,9,.3);aura.position.y=2.4;body.add(aura);
  const anim=(e,dt,mv)=>{e.t+=dt;if(a)try{a.update(dt)}catch(x){}aura.material.opacity=.24+Math.sin(e.t*5)*.07;if(Math.random()<.5)SM.emit(V3(e.pos.x+rand(-1,1),e.pos.y+rand(0,1),e.pos.z+rand(-1,1)),{c0:0x40ff80,c1:0x02140a,s0:.8,s1:2.4,life:1,a:.3,up:-1.2,speed:.5})};
  return{g,body,anim,actor:a,head:null}}
ETYPES.warden={name:'The Warden, Spirit of the Tower',boss:true,lvl:58,hp:3200,speed:0,dmg:30,range:0,cd:9,xp:3500,r:1.6,h:4.6,fly:1,ghost:true,noCalm:true,build:buildWarden};

function wdSpawn(at,still){if(WD.e&&!WD.e.dead)return WD.e;const e=spawnEnemy('warden',V3(at.x,0,at.z));e.pos.y=at.y;e.aggro=true;e.hpFloor=.55;e.invuln=!!still;e.m.g.children.forEach(c=>{if(c.material&&c.material.map===scorchTex)c.visible=false});WD.e=e;WD.t=0;WD.lasT=3;WD.orbT=6;return e}
function wdFight(){KFW.go=1;const e=WD.e||wdSpawn(V3(224,8,-9862));e.invuln=false;bossRef=e;$('boss').classList.remove('hidden');P.invuln=2;toast('Avoid the green lasers. They are far too strong to take.','The Warden',true)}
function wdLaser(e,from,to,dmg,w){const mid=from.clone().lerp(to,.5);const L=from.distanceTo(to);const tg=new THREE.Mesh(new THREE.CylinderGeometry(.06,.06,L,6,1,true),new THREE.MeshBasicMaterial({color:0x9affb0,transparent:true,opacity:.5,blending:THREE.AdditiveBlending,depthWrite:false}));
  tg.position.copy(mid);tg.lookAt(to);tg.rotateX(Math.PI/2);scene.add(tg);sx('riser',.5,null,{rate:1.6});
  addFx(tg,.9,(f,k)=>{tg.material.opacity=.3+Math.sin(f.t*40)*.2;tg.scale.set(1+k*3,1,1+k*3)},()=>{scene.remove(tg);if(e.dead)return;sx('laser',1.1,()=>{try{sfx.boom()}catch(x){}},{wet:.2});
    const bm=new THREE.Mesh(new THREE.CylinderGeometry(w||.7,w||.7,L,14,1,true),new THREE.MeshBasicMaterial({color:0x60ff90,transparent:true,opacity:.7,blending:THREE.AdditiveBlending,depthWrite:false,side:THREE.DoubleSide}));bm.position.copy(mid);bm.lookAt(to);bm.rotateX(Math.PI/2);scene.add(bm);
    addFx(bm,.5,(f,k)=>{bm.material.opacity=.7*(1-k);bm.scale.set(1-k*.5,1,1-k*.5)},()=>scene.remove(bm));flash(to,0x60ff90,10);SP.emit(to,{n:60,c0:0xffffff,c1:0x30ff70,speed:9,life:.6});
    const ab=to.clone().sub(from),ap=headOf(P.pos,1).sub(from);const t=clamp(ap.dot(ab)/ab.lengthSq(),0,1);const cl=from.clone().addScaledVector(ab,t);if(cl.distanceTo(headOf(P.pos,1))<(w||.7)+.9)damagePlayer(dmg)})}
BOSSAI.warden=function(e,dt,d){const a=e.ai;WD.t+=dt;if(e.busy>0)e.busy-=dt;e.m.g.rotation.y=Math.atan2(P.pos.x-e.pos.x,P.pos.z-e.pos.z);
  if(CH2.chase){wdChaseAI(e,dt,d);return}
  a.orb=(a.orb==null?Math.atan2(e.pos.x-P.pos.x,e.pos.z-P.pos.z):a.orb)+dt*.35;const R=15;const tx=P.pos.x+Math.sin(a.orb)*R,tz=P.pos.z+Math.cos(a.orb)*R,ty=Math.max(groundAt(tx,tz)+5,P.pos.y+5)+Math.sin(e.t*1.3);
  const f=Math.min(1,dt*1.4);e.pos.x+=(tx-e.pos.x)*f;e.pos.z+=(tz-e.pos.z)*f;e.pos.y+=(ty-e.pos.y)*f;
  WD.lasT-=dt;WD.orbT-=dt;if(WD.lasT<=0){WD.lasT=rand(3.2,4.4);try{e.m.actor.fire('Spell_Simple_Shoot',.6)}catch(x){}if(Math.random()<.35)epSay('The Warden',SL.t07);wdLaser(e,headOf(e.pos,4.2),headOf(P.pos,1),maxHP()*.45)}
  if(WD.orbT<=0){WD.orbT=rand(5,7);const c=headOf(e.pos,4);const base=aimAtPlayer(c).normalize();for(let k=0;k<5;k++)after(k*.1,()=>{if(e.dead)return;enemyOrb(headOf(e.pos,4),base.clone().applyAxisAngle(V3(0,1,0),(k-2)*.15),16,e.dmg*.5,0x9dff70,.4,{keepY:false,life:2.6})})}
  if(!WD.said&&e.hp<e.maxhp*.75){WD.said=1;bark('@','w_strong',3,0)||epSay('@',SL.m16)}
  if((e.hp<=e.maxhp*.56||WD.t>55)&&!WD.esc){WD.esc=1;after(.3,epEscape)}};
BK['@'].w_strong=[['m2_16',SL.m16]];

/* ---------- Lyra: "Cross the Channel!" ---------- */
function epEscape(){SAYQ.q.length=0;const e=WD.e;for(const o of enemies)if(!o.dead&&o!==e)removeEnemy(o);for(const p of eProjs)scene.remove(p.s);eProjs.length=0;if(e){e.invuln=true}
  playCutscene([
    {who:'Lyra',text:LY.ly27,cut:true,fov:40,cam:witchShot(1,2.8,1.6),onStart:()=>{flash(headOf(P.pos,1.6),0xff6060,6)}},
    {who:'@',text:SL.m02,cam:witchShot(-1,3)},
    {who:"Kaen's Spirit",text:SL.k04,cam:()=>{const a=KFW.a?KFW.a.g.position:P.pos;return{pos:headOf(a,1.5).add(V3(1.4,.1,2.2)),look:headOf(a,1.4)}}},
    {dur:2.2,fov:54,cut:true,title:['The Escape','Cross the Channel. Do not stop.'],cam:k=>({pos:headOf(P.pos,2+k*6).add(V3(8-k*3,0,6)),look:headOf(P.pos,1+k*5)}),onStart:()=>{P.flying=true;P.glide=false;P.flyT=60;P.vy=8;try{sfx.fly()}catch(x){}}}
  ],()=>{epChaseStart()})}

/* ================= the chase across the Channel ================= */
let EP_CAST=0;{const _p=projs.push;projs.push=function(){EP_CAST=performance.now();return _p.apply(this,arguments)}}
function epChaseStart(){const e=WD.e||wdSpawn(V3(P.pos.x,P.pos.y+4,P.pos.z-30));e.invuln=false;e.hpFloor=.2;bossRef=e;$('boss').classList.remove('hidden');
  CH2.chase={t:0,surge:14,lasT:5,batT:8,line:0,lineT:2,tut:0,win:0,ok:0,warned:0,said:{}};P.flying=true;P.flyT=60;NZ.lt=999;
  toast('Fly south to Calais. When the Warden catches up, counter with any spell.','The Escape',true);epSay("Kaen's Spirit",SL.k05,1);epSay('The Warden',SL.t02)}
function epChaseAbort(){SAYQ.q.length=0;CH2.chase=null;if(WD.e&&!WD.e.dead)removeEnemy(WD.e);WD.e=null;WD.esc=0;WD.t=0;hitStop=0;tutHide()}
const CHL=[[6,'@','m03'],[13,'The Warden','t03'],[19,"Kaen's Spirit",'k07'],[27,'@','m04'],[33,"Kaen's Spirit",'k06'],[40,'The Warden','t04'],[47,"Kaen's Spirit",'k08'],[54,'@','m05'],[61,'The Warden','t05'],[68,"Kaen's Spirit",'k09'],[76,'The Warden','t08'],[84,"Kaen's Spirit",'k05']];
function wdChaseAI(e,dt,d){const C=CH2.chase;if(!C)return;const back=C.win?0:(C.ok>0?44:30);
  if(C.win){const s=V3(P.pos.x+6,P.pos.y+.5,P.pos.z+1.5);e.pos.lerp(s,Math.min(1,dt*6))}
  else{const t=V3(P.pos.x+Math.sin(C.t*.6)*9,P.pos.y+2+Math.sin(C.t*1.1)*2,P.pos.z-back);e.pos.lerp(t,Math.min(1,dt*(C.ok>0?2.5:1.2)));C.ok=Math.max(0,C.ok-dt)}}
{const _mt=muTick;muTick=function(dt){_mt(dt);const C=CH2.chase;if(!C||!started||MODE==='open')return;const e=WD.e;if(!P.alive)return;if(CS.active)return;
  C.t+=dt;P.flying=true;P.flyT=Math.max(P.flyT,6);const z=P.pos.z;
  // the lines
  if(C.line<CHL.length&&C.t>CHL[C.line][0]){const[,w,k]=CHL[C.line++];epSay(w,SL[k])}
  // lasers from behind
  C.lasT-=dt;if(e&&!e.dead&&!C.win&&C.lasT<=0){C.lasT=rand(4.5,6.5);if(!C.warned){C.warned=1;toast('Green laser! Swerve!','Dodge')}wdLaser(e,headOf(e.pos,4),headOf(P.pos,1).add(V3(rand(-1,1),0,rand(2,5))),maxHP()*.3,.6)}
  // he catches up: slow motion, counter or get hit
  C.surge-=dt;if(e&&!e.dead&&!C.win&&C.surge<=0){C.surge=rand(19,27);C.win=performance.now();C.cast0=EP_CAST;epSay("Kaen's Spirit",SL.k11,1);sx('garg',.9,null,{rate:.7});
    setTimeout(()=>{if(!CH2.chase||!P.alive)return;hitStop=C.tut?1.6:3.2;C.slow=performance.now();if(!C.tut){C.tut=1;const c=tutCard(`<div class="tl">Counter</div><h3>He caught up!</h3><p>Time slows. Cast any spell ${isTouch?'':'(<kbd>1</kbd> to <kbd>9</kbd>) '}right now to blast him back. Miss it and he hits hard.</p>`);setTimeout(()=>tutHide(),3200)}
      else floatText(headOf(P.pos,2.2),'COUNTER!','#9affb0',true)},700)}
  if(C.win&&C.slow){const now=performance.now();if(EP_CAST>C.slow-200){C.win=0;C.slow=0;hitStop=0;C.ok=3;tutHide();const c=eCenter(e);flash(c,0xffffff,14);flash(c,0x60ff90,10);sx('impact',1.1,null,{rate:.7});sx('kame',.6,null,{rate:1.4});P.shake=1;
      SP.emit(c,{n:120,c0:0xffffff,c1:0x30ff70,speed:12,life:.8});damageEnemy(e,power()*40,'#9affb0');floatText(headOf(P.pos,2.4),'COUNTERED','#9affb0',true);epSay("Kaen's Spirit",SL.k19,1);epSay('@',Math.random()<.5?SL.m08:SL.m09)}
    else if(now-C.slow>(C.tut===1&&!C.tutDone?3200:1700)){C.tutDone=1;C.win=0;C.slow=0;hitStop=0;tutHide();const c=eCenter(e);try{e.m.actor.fire('Spell_Simple_Shoot',.5)}catch(x){}flash(headOf(P.pos,1),0x60ff90,12);sx('laser',.9,null,{rate:1.3});
      P.invuln=0;damagePlayer(maxHP()*.38);P.shake=1.4;P.vy=-4;epSay("Kaen's Spirit",SL.k05,1);C.ok=2}}
  // the bats come thick near France
  if(z>-3300){C.batT-=dt;if(C.batT<=0){C.batT=rand(3,5);if(!C.said.bats){C.said.bats=1;epSay('@',SL.m06,1)}const n=enemies.filter(o=>!o.dead&&o.type==='nbat').length;if(n<12)for(let k=0;k<4;k++)nzSpawnFly(Math.random()<.75?'nbat':'pumpkin',V3(P.pos.x+rand(-30,30),P.pos.y+rand(-3,5),P.pos.z+rand(40,70)*(Math.random()<.7?1:-1)))}}
  if(z>-2700&&!C.said.cal){C.said.cal=1;epSay('@',SL.m07,1);after(3.5,()=>{if(CH2.chase)lyraSay('ly34','Lyra, in your head')})}
  if(z>CAL_SHORE+4){epArrive()}}}
{const _bk=bark;bark=function(who,cat){if(CH2.chase&&who==='@'&&(cat==='broom'||cat==='broomtired'))return false;return _bk.apply(this,arguments)}}

/* ---------- Calais: Lyra and the door home ---------- */
function epArrive(){const C=CH2.chase;if(!C||C.arr)return;C.arr=1;const e=WD.e;for(const o of enemies)if(!o.dead&&o!==e)removeEnemy(o);for(const p of eProjs)scene.remove(p.s);eProjs.length=0;hitStop=0;tutHide();
  if(e){e.invuln=true;e.pos.set(P.pos.x+10,P.pos.y+14,P.pos.z-70)}SAYQ.q.length=0;const door=V3(45,0,-2187);lyraPlace(51,-2188,Math.PI);let portal=nzPortal(door);NZ.g.add(portal);
  const L=()=>LYR.a?LYR.a.g.position:V3(51,0,-2188);const lyS=d=>()=>{const g=L();return{pos:headOf(g,1.6).add(V3(.9,0,-(d||2.4))),look:headOf(g,1.55)}};
  P.flying=false;P.glide=true;P.pos.set(54,groundAt(54,-2191),-2191);P.face=0;
  playCutscene([
    {dur:2.6,fov:48,cut:true,cam:k=>({pos:V3(70-k*6,5-k*2,-2215),look:V3(50,2,-2188)}),onStart:()=>{sx('portal',1,null,{wet:.4})},update:dt=>{portal.userData.tick(dt)}},
    {who:'Lyra',text:LY.ly28,cam:lyS(2.6),update:dt=>portal.userData.tick(dt)},
    {who:"Kaen's Spirit",text:SL.k12,cut:true,cam:()=>{const a=KFW.a?KFW.a.g.position:P.pos;return{pos:headOf(a,1.5).add(V3(-1.2,.1,-2.2)),look:headOf(a,1.4)}},update:dt=>portal.userData.tick(dt)},
    {who:'Lyra',text:LY.ly29,cam:lyS(1.9),update:dt=>portal.userData.tick(dt)},
    {who:'The Warden',text:SL.t06,cut:true,fov:44,cam:()=>({pos:V3(52,3,-2186),look:e?eCenter(e):V3(55,14,-2260)}),onStart:()=>{sx('garg',1,null,{rate:.5,wet:.6});P.shake=.6},update:dt=>portal.userData.tick(dt)},
    {dur:1.6,fov:50,cut:true,cam:k=>({pos:headOf(door,2).add(V3(0,0,6-k*4)),look:headOf(door,2)}),onStart:()=>{flash(headOf(door,2),0xff5060,14);sx('portal',.9,null,{rate:.8})},update:dt=>portal.userData.tick(dt)}
  ],()=>{if(portal)NZ.g.remove(portal);CH2.chase=null;if(WD.e&&!WD.e.dead)removeEnemy(WD.e);WD.e=null;CH2.st=Math.max(CH2.st,7);ch2Save();writeSave();nzLeave();after(.4,epParisPlan)})}

/* ---------- Paris: three things to bring him back ---------- */
function epParisPlan(){const L=()=>LYR.a?LYR.a.g.position:V3(-126,0,-112);const lyS=d=>()=>{const g=L();const dv=V3(P.pos.x-g.x,0,P.pos.z-g.z).normalize();return{pos:headOf(g,1.6).addScaledVector(dv,d||2.4).addScaledVector(V3(dv.z,0,-dv.x),.6),look:headOf(g,1.55)}};
  const kS=()=>{const a=KFW.a?KFW.a.g.position:P.pos;return{pos:headOf(a,1.4).add(V3(1.6,.2,2.2)),look:headOf(a,1.35)}};
  P.pos.set(-126,groundAt(-126,-106),-106);P.face=Math.PI;
  playCutscene([
    {dur:4,fov:50,cut:true,title:['Paris','Three things to bring him back'],cam:k=>({pos:V3(-150+k*14,20-k*12,-60-k*30),look:V3(-126,4,-110)})},
    {who:"Kaen's Spirit",text:SL.k13,cut:true,cam:kS},
    {who:'Lyra',text:LY.ly30,cam:lyS(2.5)},
    {who:'Lyra',text:LY.ly31,cam:lyS(2.1)},
    {who:'@',text:SL.m10,cam:witchShot(1,3)},
    {who:"Kaen's Spirit",text:SL.k14,cam:kS},
    {who:'@',text:SL.m11,cam:witchShot(-1,3)},
    {who:'Lyra',text:LY.ly32,cam:lyS(2.3)}
  ],()=>{epAshPlace();toast('Find Kaen\'s ash on the Trocadéro.','Chapter XII · Ash and Silver',true)})}
const ASH={g:null};
function epAshPlace(){if(ASH.g||CH2.st>=8)return;const at=V3(-118,0,-128);at.y=groundAt(at.x,at.z);const g=new THREE.Group();g.position.copy(at);
  const pile=new THREE.Mesh(new THREE.ConeGeometry(.7,.35,14),std({color:0x3a3640,roughness:1}));pile.position.y=.17;g.add(pile);const gl=glowSprite(0xb080ff,3,.5);gl.position.y=.6;g.add(gl);scene.add(g);ASH.g=g;
  CH2.obj=()=>CH2.zone==='paris'&&ASH.g?`Collect <b>Kaen's ash</b> on the Trocadéro · ${Math.round(Math.hypot(P.pos.x-at.x,P.pos.z-at.z))}m`:null}
{const _mt=muTick;muTick=function(dt){_mt(dt);if(!ASH.g||!started||CS.active)return;const g=ASH.g;g.children[1].material.opacity=.4+Math.sin(time*3)*.15;if(Math.random()<.3)SP.emit(V3(g.position.x+rand(-.5,.5),g.position.y+.3,g.position.z+rand(-.5,.5)),{c0:0xd0b0ff,c1:0x30106a,s0:.25,s1:.03,life:1,up:1});
  if(Math.hypot(P.pos.x-g.position.x,P.pos.z-g.position.z)<1.6){scene.remove(g);ASH.g=null;CH2.st=Math.max(CH2.st,8);ch2Save();writeSave();sx('ding',1);flash(headOf(P.pos,1),0xb080ff,10);CH2.obj=xiiObj;
    toast('Kaen\'s ash · 1 of 3. Lyra is waiting for you.','Ash collected',true)}}}
{const _lt=lyraToTroca;lyraToTroca=function(){_lt.apply(this,arguments);if(CH2.st===7){after(1,()=>{if(CH2.st===7&&!CS.active)epAshPlace()})}}}

/* ---------- the Tower door stays shut while the Warden is loose; a reload resumes at the Tower ---------- */
{const _mt=muTick;muTick=function(dt){_mt(dt);if(MODE==='open'||CH2.zone!=='north'||!started)return;
  if(false&&NZ.home){const hide=CH2.st===6;if(hide&&!NZ.home.userData.moved){NZ.home.userData.moved=1;NZ.home.position.x+=10000}else if(!hide&&NZ.home.userData.moved){NZ.home.userData.moved=0;NZ.home.position.x-=10000}}
  if(CH2.st===6&&!CH2.chase&&!CS.active&&P.alive&&NZ.green&&(!WD.e||WD.e.dead)&&!WD.esc&&Math.hypot(P.pos.x-NZ.green.x,P.pos.z-NZ.green.z)<30){epFreeKaen(true);
    const e=wdSpawn(V3(224,8,-9862));epSay('The Warden',SL.t08,1);after(.5,wdFight)}
  if(CH2.st===6&&WD.esc&&!CH2.chase&&!CS.active&&(!WD.e||WD.e.dead))WD.esc=0}}

/* ---------- ferries and buoys: the long French waters ---------- */
{const _nb=nzBuild;nzBuild=function(){const r=_nb.apply(this,arguments);try{const G=NZ.g;const hull=std({color:0x2a2e3a,roughness:.7}),deck=std({color:0x7a7c88,roughness:.6});
  for(const[x,z,ry]of[[-140,-2650,.3],[150,-2980,-.2],[-60,-3280,.1],[200,-2450,.5]]){const f=new THREE.Group();f.position.set(x,0,z);f.rotation.y=ry;
    const h=new THREE.Mesh(new THREE.BoxGeometry(14,3,60),hull);h.position.y=1.2;f.add(h);const d=new THREE.Mesh(new THREE.BoxGeometry(12,5,34),deck);d.position.set(0,5,-4);f.add(d);
    for(let k=0;k<8;k++){const l=glowSprite(0xffd890,1.4,.8);l.position.set(k%2?6.2:-6.2,5.5,-18+k*4.6);f.add(l)}const m=glowSprite(0xff4040,2,.9);m.position.set(0,9,-4);f.add(m);G.add(f);
    NZ.anim.push(dt=>{f.position.z+=dt*1.2*(x>0?1:-1);f.position.y=Math.sin(performance.now()*.0007+x)*.3})}
  for(let z=-2260;z>-3400;z-=120){const b=glowSprite(z%240?0x60ff60:0xff5050,1.2,.9);b.position.set(z%240?50:70,1.2,z);G.add(b)}}catch(e){}return r}}

/* ---------- chapter XI: jump straight to the Tower ---------- */
CHAPTERS.push({id:'escape',n:'XI',title:'The Escape',desc:"The Tower's questions, the Warden and the flight home."});
{const _cb=chapBoss;chapBoss=function(c){if(c.id==='escape')return null;return _cb(c)}}
{const _ac=applyChapter;applyChapter=function(id){if(id!=='escape')return _ac.apply(this,arguments);_ac.call(this,'london');beaten.add('greyfang');CH2.st=5;ch2Save();NZQ.stage=0;NZQ.hits=0;nzAfter();
  const p=V3(NZ.green.x+6,0,NZ.green.z+12);P.pos.set(p.x,groundAt(p.x,p.z),p.z);NZ.cp.copy(p);after(.4,()=>toast('Free Kaen from the Crown\'s chains.','Chapter XI: The Escape',true))}}
{const _rc=renderChapters;renderChapters=function(){_rc();const list=$('chapList');const el=list&&list.children[chapIndexOf('escape')];if(el){const done=CH2.st>=7,cur=started&&CH2.st>=5&&CH2.st<7;el.className='chap'+(done?' done':'')+(cur?' cur':'');
  el.innerHTML='<span class="cn">Chapter XI · Story</span><b>The Escape</b><span class="cd">'+"The Tower's questions, the Warden and the flight home."+'</span><span class="cs">'+(cur?'Current · ':'')+(done?'Cleared':'Not cleared')+'</span>'}}}
{const _no=nzObj;nzObj=function(){if(CH2.zone==='north'&&CH2.st===6){if(CH2.chase)return `Escape to <b>Calais</b> · ${Math.max(0,Math.round(CAL_SHORE-P.pos.z))}m`;if(WD.e&&!WD.e.dead)return 'Survive <b>the Warden</b>. Dodge the green lasers.';return 'Return to the <b>Tower</b>. The Warden waits.'}return _no.apply(this,arguments)}}
{const _ot=objTick;objTick=function(dt){_ot(dt);if(MODE==='open'||!bossRef||bossRef.type!=='warden'||CH2.zone!=='north')return;const el=$('objTrack');if(!el)return;const t=nzObj();if(t&&el.innerHTML!==t)el.innerHTML=t}}
{const _ct=nzCalaisTalk;nzCalaisTalk=function(){const r=_ct.apply(this,arguments);const i=r.findIndex(s=>s.text===LY.ly15);if(i>=0&&!r.some(s=>s.text===LY.ly33))r.splice(i+1,0,{who:'Lyra',text:LY.ly33,cam:r[i].cam,onStart:()=>{CH2.gem=1;const h=headOf(P.pos,1.2);flash(h,0x60e0ff,8);SP.emit(h,{n:60,c0:0xffffff,c1:0x30c0ff,speed:4,life:.9});sx('ding',.8)}});return r}}

/* ---------- Kaen's summon flows straight out of his intro: one cutscene, no gap ---------- */
{const _pc=playCutscene;playCutscene=function(shots,done){try{if(shots&&shots.some(s=>s&&s.text==='Ends? You are still standing inside my illusion, witch.')){const e=enemies.find(o=>!o.dead&&o.type==='illusion');
  if(e&&e.ai&&!e.ai.g0){e.ai.g0=1;const S=epSummonShots(e);const d0=done;shots=shots.concat(S.shots);done=function(){try{if(d0)d0()}catch(x){}S.done()}}}}catch(x){}return _pc.call(this,shots,done)}}

/* ---------- the long broom: room for two, sea-glass blue, trail over the sea ---------- */
const SBR={g:null,on:false,b:null,def:null,seat:-1.5,trT:0};
function sbBuild(){if(SBR.g)return SBR.g;const g=new THREE.Group();const Z0=1.45,Z1=-3.25,LEN=Z0-Z1,ZM=(Z0+Z1)/2;
  const wood=std({color:0x24345a,roughness:.38,metalness:.3,emissive:0x081e50,emissiveIntensity:.4});
  const st=new THREE.Mesh(new THREE.CylinderGeometry(.052,.07,LEN,12),wood);st.rotation.x=Math.PI/2;st.position.z=ZM;g.add(st);
  const rm=std({color:0x8ae0ff,emissive:0x40b8ff,emissiveIntensity:1.3,metalness:.4,roughness:.25});SBR.rm=rm;
  const silver=std({color:0xdfe8f4,metalness:.9,roughness:.22,emissive:0x203040,emissiveIntensity:.3});
  // a glowing ribbon wound round the shaft
  {const pts=[];const N=160,turns=9;for(let i=0;i<=N;i++){const t=i/N,a=t*turns*TAU,z=Z0-.15-t*(LEN-.35),r=.066+.008*(1-t);pts.push(V3(Math.cos(a)*r,Math.sin(a)*r,z))}
    const tb=new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts),N,.011,5,false),rm);g.add(tb)}
  // the front curl, holding the sea-glass gem in a little silver claw
  const curl=new THREE.Mesh(new THREE.TorusGeometry(.17,.055,8,20,Math.PI*1.25),wood);curl.rotation.set(0,Math.PI/2,0);curl.position.set(0,.17,Z0);curl.rotation.z=-Math.PI/2;g.add(curl);
  const cap=new THREE.Mesh(new THREE.CylinderGeometry(.075,.075,.12,12),silver);cap.rotation.x=Math.PI/2;cap.position.z=Z0-.04;g.add(cap);
  const gemP=V3(0,.36,Z0+.05);const gem=new THREE.Mesh(new THREE.OctahedronGeometry(.12,0),std({color:0xb0f0ff,emissive:0x30a8ff,emissiveIntensity:1.8,transparent:true,opacity:.92,roughness:.05,metalness:.2}));gem.position.copy(gemP);gem.scale.set(1,1.5,1);g.add(gem);SBR.gem=gem;
  for(let k=0;k<4;k++){const a=k/4*TAU;const pr=new THREE.Mesh(new THREE.ConeGeometry(.018,.2,4),silver);pr.position.set(gemP.x+Math.cos(a)*.08,gemP.y-.12,gemP.z+Math.sin(a)*.08);pr.rotation.set(Math.sin(a)*.5,0,-Math.cos(a)*.5);g.add(pr)}
  const gs=glowSprite(0x60c8ff,1,.55);gs.position.copy(gemP);g.add(gs);SBR.gs=gs;
  // silver bands and the two leather grips
  for(const z of[Z0-.14,.75,-.45,-1.95,Z1+.08]){const b=new THREE.Mesh(new THREE.CylinderGeometry(.08,.08,.05,14),silver);b.rotation.x=Math.PI/2;b.position.z=z;g.add(b)}
  const lth=std({color:0x1c1830,roughness:.85});for(const[z,l]of[[.5,.36],[SBR.seat+.62,.3]]){const gp=new THREE.Mesh(new THREE.CylinderGeometry(.078,.078,l,12),lth);gp.rotation.x=Math.PI/2;gp.position.z=z;g.add(gp)}
  // two saddles with stirrups
  const sad=std({color:0x1b2546,roughness:.7,metalness:.1});
  for(const z of[0,SBR.seat]){const s=new THREE.Mesh(new THREE.SphereGeometry(1,14,8,0,TAU,0,Math.PI/2),sad);s.scale.set(.16,.07,.3);s.position.set(0,.05,z);g.add(s);
    const rim=new THREE.Mesh(new THREE.TorusGeometry(1,.06,5,22),rm);rim.scale.set(.16,.3,1);rim.rotation.x=Math.PI/2;rim.position.set(0,.055,z);g.add(rim);
    for(const sx of[-1,1]){const rod=new THREE.Mesh(new THREE.CylinderGeometry(.012,.012,.42,4),silver);rod.position.set(sx*.13,-.17,z+.12);rod.rotation.z=sx*.35;g.add(rod);const ft=new THREE.Mesh(new THREE.TorusGeometry(.06,.014,5,10),silver);ft.position.set(sx*.21,-.38,z+.12);ft.rotation.y=Math.PI/2;g.add(ft)}}
  // layered bristles, bound with silver and a glowing cord
  const B=Z1-.02;const stx=k=>{const c=mkCanvas(128,128,x=>{x.clearRect(0,0,128,128);for(let i=0;i<128;i++){const h=128*(k?.8+Math.random()*.2:.72+Math.random()*.28),l=40+Math.random()*40;x.fillStyle=`hsl(${215+Math.random()*16},${30+Math.random()*25}%,${k?l*.55:l}%)`;x.fillRect(i,0,1,h);if(Math.random()<.08){x.fillStyle='rgba(170,225,255,.9)';x.fillRect(i,0,1,h*.9)}}});const t=new THREE.CanvasTexture(c);t.wrapS=THREE.RepeatWrapping;t.repeat.set(3,1);t.anisotropy=4;return t};
  for(const[r0,r1,l,k]of[[.13,.44,1.8,0],[.11,.34,1.65,1]]){const m=new THREE.Mesh(new THREE.CylinderGeometry(r0,r1,l,32,1,true),std({map:stx(k),alphaTest:.5,transparent:false,roughness:.95,emissive:0x0a2250,emissiveIntensity:.25,side:THREE.DoubleSide}));m.rotation.x=Math.PI/2;m.position.z=B-l/2;g.add(m)}
  const core=new THREE.Mesh(new THREE.ConeGeometry(.24,1.3,14),std({color:0x22325a,roughness:.95}));core.rotation.x=Math.PI/2;core.position.z=B-.85;g.add(core);
  for(const[z,r,m]of[[B-.05,.135,silver],[B-.32,.18,rm]]){const t=new THREE.Mesh(new THREE.TorusGeometry(r,.026,6,22),m);t.position.z=z;g.add(t)}
  // a soft aura that breathes along the shaft
  SBR.au=[];for(let k=0;k<7;k++){const s=glowSprite(0x58c0ff,.7,.2);s.position.set(0,0,Z0-.3-k*(LEN-.2)/6);g.add(s);SBR.au.push(s)}
  SBR.g=g;return g}
function sbTail(){const wr=W.g.rotation.y,sc=W.g.scale.y||1;const o=W.g.position.clone().add(V3(Math.sin(wr),0,Math.cos(wr)).multiplyScalar((.1-4.95)*sc));o.y+=(W.broom.position.y)*sc;return o}
{const _mt=muTick;muTick=function(dt){_mt(dt);if(!started||!W||!W.broom)return;if(SBR.b!==W.broom){SBR.b=W.broom;SBR.on=false;SBR.def=null}
  const want=kfwOn();if(want!==SBR.on){SBR.on=want;const b=W.broom;if(!SBR.def)SBR.def=[b.children[0],b.children[1]];if(want)b.add(sbBuild());else if(SBR.g&&SBR.g.parent)SBR.g.parent.remove(SBR.g);for(const c of SBR.def)if(c)c.visible=!want}
  if(!SBR.on||!W.broom.visible)return;const sea=CH2.zone==='north'&&CH2.gemOn&&P.flying;SBR.gs.material.opacity=(sea?.75:.4)+Math.sin(time*4)*.15;SBR.gem.rotation.y+=dt*2;SBR.blk=(SBR.blk||0)-dt;if(SBR.blk<=0)SBR.blk=rand(1.6,4);const bl=SBR.blk<.12?1.6:1;for(let k=0;k<SBR.au.length;k++){const s=SBR.au[k],w=Math.max(0,Math.sin(time*2.4-k*.7));s.material.opacity=(sea?.3:.16)*(.35+w)*bl;s.scale.setScalar(.6+w*.5)}SBR.rm.emissiveIntensity=lerp(SBR.rm.emissiveIntensity,sea?2.4:1.2,Math.min(1,dt*3));
  if(sea){SBR.trT-=dt;if(SBR.trT<=0){SBR.trT=.03;const t=sbTail();SP.emit(t.clone().add(V3(rand(-.25,.25),rand(-.25,.25),rand(-.25,.25))),{n:3,c0:0x9adcff,c1:0x1050d0,s0:.42,s1:.04,life:1.1,speed:.5});if(Math.random()<.35)SM.emit(t.clone(),{c0:0x3a8cff,c1:0x061a50,s0:.35,s1:.9,life:.7,a:.2,up:0})}}}}

/* ---------- London stays hidden until you are well inland ---------- */
{const _nl=nzLondon;nzLondon=function(G){const n0=G.children.length;const r=_nl.apply(this,arguments);NZ.lonObjs=G.children.slice(n0);return r}}
{const _mt=muTick;muTick=function(dt){_mt(dt);if(!NZ.lonObjs||CH2.zone!=='north'||!NZ.g)return;const show=Math.min(P.pos.z,camera.position.z)<LON_Z+450;
  if(show!==NZ.lonShow){NZ.lonShow=show;for(const o of NZ.lonObjs)o.visible=show}}}

/* ---------- boats across the long Channel, and a few Union Jacks in London ---------- */
function ukTex(){if(NZ.ukt)return NZ.ukt;const c=mkCanvas(120,60,x=>{x.fillStyle='#012169';x.fillRect(0,0,120,60);x.strokeStyle='#fff';x.lineWidth=12;x.beginPath();x.moveTo(0,0);x.lineTo(120,60);x.moveTo(120,0);x.lineTo(0,60);x.stroke();
  x.strokeStyle='#c8102e';x.lineWidth=4;x.beginPath();x.moveTo(0,0);x.lineTo(120,60);x.moveTo(120,0);x.lineTo(0,60);x.stroke();x.fillStyle='#fff';x.fillRect(50,0,20,60);x.fillRect(0,20,120,20);x.fillStyle='#c8102e';x.fillRect(54,0,12,60);x.fillRect(0,24,120,12)});
  const t=new THREE.CanvasTexture(c);t.anisotropy=4;return NZ.ukt=t}
function nzFlag(G,x,y,z,h,ry){const g=new THREE.Group();g.position.set(x,y,z);g.rotation.y=ry||0;const pm=std({color:0xd8d8d0,metalness:.6,roughness:.4});
  const pole=new THREE.Mesh(new THREE.CylinderGeometry(.05,.07,h,6),pm);pole.position.y=h/2;g.add(pole);const ball=new THREE.Mesh(new THREE.SphereGeometry(.12,8,6),std({color:0xd8b040,metalness:.8,roughness:.3}));ball.position.y=h+.1;g.add(ball);
  const geo=new THREE.PlaneGeometry(2.6,1.3,10,1);geo.translate(1.3+.06,0,0);const base=geo.attributes.position.array.slice();const t=ukTex();
  const fl=new THREE.Mesh(geo,std({map:t,emissive:0xffffff,emissiveMap:t,emissiveIntensity:.22,roughness:.85,side:THREE.DoubleSide}));fl.position.y=h-.7;g.add(fl);G.add(g);const ph=Math.random()*6;
  NZ.anim.push(dt=>{if(!g.visible)return;const a=geo.attributes.position.array,tm=performance.now()*.001;for(let i=0;i<a.length;i+=3){const u=base[i];a[i+2]=Math.sin(u*2.2-tm*5+ph)*.16*u/2.6;a[i+1]=base[i+1]-u*.05}geo.attributes.position.needsUpdate=true});return g}
{const _nb=nzBuild;nzBuild=function(){const was=NZ.built;const r=_nb.apply(this,arguments);if(was||!NZ.g)return r;try{const G=NZ.g;let sd=11;const rn=()=>(sd=(sd*16807)%2147483647)/2147483647;
  const hull=std({color:0x2a2e3a,roughness:.7}),red=std({color:0x7a2222,roughness:.7}),wh=std({color:0xd8d4c8,roughness:.6}),deck=std({color:0x6a5440,roughness:.8}),sail=std({color:0xe8e2d0,roughness:.9,side:THREE.DoubleSide});
  const sailGeo=new THREE.BufferGeometry().setFromPoints([V3(0,0,0),V3(0,7,0),V3(0,0,-4.5)]);sailGeo.computeVertexNormals();
  const boat=(kind,x,z,ry)=>{const b=new THREE.Group();b.position.set(x,0,z);b.rotation.y=ry;
    if(kind===0){const h=new THREE.Mesh(new THREE.BoxGeometry(12,3,50),hull);h.position.y=1.2;b.add(h);const d=new THREE.Mesh(new THREE.BoxGeometry(10,4.5,28),wh);d.position.set(0,4.8,-3);b.add(d);const fn=new THREE.Mesh(new THREE.BoxGeometry(2.4,4,3.6),red);fn.position.set(0,8.6,-8);b.add(fn);const wn=new THREE.Mesh(new THREE.BoxGeometry(10.15,.55,26),std({color:0x302818,emissive:0xffd07a,emissiveIntensity:1.1}));wn.position.set(0,5.7,-3);b.add(wn);const up=new THREE.Mesh(new THREE.BoxGeometry(7,2.2,14),wh);up.position.set(0,8.1,-1);b.add(up);const bw=new THREE.Mesh(new THREE.CylinderGeometry(6,6,3,3,1),hull);bw.rotation.y=Math.PI/6;bw.scale.set(1,1,.6);bw.position.set(0,1.2,25);b.add(bw);
      for(let k=0;k<7;k++){const l=glowSprite(0xffd890,1.3,.8);l.position.set(k%2?5.2:-5.2,5,-15+k*4.4);b.add(l)}const m=glowSprite(0xff4040,1.8,.9);m.position.set(0,11,-8);b.add(m)}
    else if(kind===1){const h=new THREE.Mesh(new THREE.BoxGeometry(3.6,1.8,11),Math.random()<.5?red:hull);h.position.y=.6;b.add(h);const c=new THREE.Mesh(new THREE.BoxGeometry(2.6,2.2,3),wh);c.position.set(0,2.4,1.6);b.add(c);
      const m=new THREE.Mesh(new THREE.CylinderGeometry(.08,.1,6,5),deck);m.position.set(0,4,-2);b.add(m);const bm=new THREE.Mesh(new THREE.CylinderGeometry(.05,.05,5,4),deck);bm.rotation.x=1.1;bm.position.set(0,4.4,-4);b.add(bm);
      const l=glowSprite(0xfff0c0,1.6,.85);l.position.set(0,7.2,-2);b.add(l);const w=glowSprite(0xffc070,1,.7);w.position.set(0,2.6,3.2);b.add(w)}
    else{const h=new THREE.Mesh(new THREE.BoxGeometry(2.2,1.2,7.5),wh);h.position.y=.4;b.add(h);const m=new THREE.Mesh(new THREE.CylinderGeometry(.06,.07,8,5),deck);m.position.set(0,4.8,.8);b.add(m);
      const s=new THREE.Mesh(sailGeo,sail);s.position.set(0,1.4,.6);b.add(s);const l=glowSprite(0x90ff90,.9,.8);l.position.set(0,8.9,.8);b.add(l)}
    G.add(b);const sp=kind===0?1.4:kind===1?.8:1.1,ph=rn()*9;NZ.anim.push(dt=>{b.position.x+=Math.sin(ry)*dt*sp;b.position.z+=Math.cos(ry)*dt*sp;const t=performance.now()*.001;b.position.y=Math.sin(t*.8+ph)*.25;b.rotation.z=Math.sin(t*.9+ph)*.04;b.rotation.x=Math.sin(t*.7+ph*2)*.03})};
  for(let z=-3500;z>CURSE_Z+150;z-=rn()*170+150){const k=rn()<.22?0:rn()<.55?1:2;let x=(rn()*2-1)*240;if(Math.abs(x-60)<18)x+=x<60?-24:24;boat(k,x,z,rn()*TAU)}
  for(let z=-3500;z>CURSE_Z+50;z-=160){const b=glowSprite(Math.round(z/160)%2?0x60ff60:0xff5050,1.2,.9);b.position.set(Math.round(z/160)%2?50:70,1.2,z);G.add(b)}
  const fl=[nzFlag(G,-202,42,-9834,7,.4),nzFlag(G,242,26.9,-9876.5,5,-.6)];
  fl.push(nzFlag(G,-140,17,-9834,5,.2),nzFlag(G,36,18,-9924,5,1.2),nzFlag(G,180,24.9,TH_Z,4.5,-.8));
  if(NZ.lonObjs)NZ.lonObjs.push(...fl);NZ.flags=fl}catch(e){console.warn('boats/flags',e)}return r}}

/* ---------- the long chase: more lines, and the bats never quite give up ---------- */
const CHL2=['k06','t03','k07','m04','t04','k08','m05','t05','k09','m03','t08'];
{const _mt=muTick;muTick=function(dt){_mt(dt);const C=CH2.chase;if(!C||!started||MODE==='open'||CS.active||!P.alive||C.arr)return;
  if(C.line>=CHL.length){C.rT=(C.rT==null?6:C.rT)-dt;if(C.rT<=0){C.rT=rand(15,21);const k=CHL2[(C.ri=(C.ri||0)+1)%CHL2.length];const w=k[0]==='k'?"Kaen's Spirit":k[0]==='t'?'The Warden':'@';epSay(w,SL[k])}}
  }}

/* ================= the Warden, sharper: better lasers, seals, blinking ahead of you, a bar that heals ================= */
function wdBeamTex(){if(WD.bt)return WD.bt;const c=mkCanvas(4,128,x=>{for(let y=0;y<128;y++){const v=.5+.5*Math.abs(Math.sin(y/128*Math.PI*3)*Math.sin(y/128*Math.PI*7+1));x.fillStyle=`rgba(255,255,255,${v.toFixed(3)})`;x.fillRect(0,y,4,1)}});
  const t=new THREE.CanvasTexture(c);t.wrapS=t.wrapT=THREE.RepeatWrapping;return WD.bt=t}
function wdBM(col,op,map){return new THREE.MeshBasicMaterial({color:col,transparent:true,opacity:op,blending:THREE.AdditiveBlending,depthWrite:false,side:THREE.DoubleSide,map:map||null,fog:false})}
wdLaser=function(e,from,to,dmg,w,o){o=o||{};w=w||.7;const dir=to.clone().sub(from).normalize();const end=from.clone().addScaledVector(dir,from.distanceTo(to)+(o.ext==null?30:o.ext));const L=from.distanceTo(end);
  const grp=new THREE.Group();grp.position.copy(from).lerp(end,.5);grp.lookAt(end);scene.add(grp);const geos=[],mats=[];
  const mk=(r,mat)=>{const gm=new THREE.CylinderGeometry(r,r,L,18,1,true);geos.push(gm);mats.push(mat);const m=new THREE.Mesh(gm,mat);m.rotation.x=Math.PI/2;grp.add(m);return m};
  const kill=()=>{scene.remove(grp);for(const g of geos)g.dispose();for(const m of mats){if(m.map&&m.map!==WD.bt)m.map.dispose();m.dispose()}};
  const guide=mk(.035,wdBM(0xc8ffd8,0));const ch=glowSprite(0x80ffa8,.5,.9,false);ch.position.copy(from);scene.add(ch);const chR=new THREE.Mesh(new THREE.TorusGeometry(1,.06,6,28),wdBM(0x9affb0,.8));chR.position.copy(from);chR.lookAt(end);scene.add(chR);
  sx('riser',.5,null,{rate:1.7});const tc=o.charge||.7;let lt=0;
  addFx(null,tc,(f,k)=>{guide.material.opacity=(.18+.5*k)*(Math.sin(f.t*70)>0?1:.35);ch.scale.setScalar(.5+k*3.6);ch.material.opacity=.5+k*.5;chR.scale.setScalar(w*(5-k*3.6));chR.material.opacity=.3+k*.6;chR.rotation.z+=.2;
      if(Math.random()<.85)SP.emit(from.clone().add(V3(rand(-2.4,2.4),rand(-2.4,2.4),rand(-2.4,2.4))),{c0:0xffffff,c1:0x30ff70,s0:.32,s1:.04,life:.28,speed:-8})},
    ()=>{scene.remove(ch);scene.remove(chR);chR.geometry.dispose();chR.material.dispose();if(e.dead){kill();return}guide.visible=false;
      const tex=wdBeamTex().clone();tex.needsUpdate=true;tex.repeat.set(1,L/7);
      const halo=mk(w*2.4,wdBM(0x18b050,.2)),body=mk(w,wdBM(0x4dff88,.8,tex)),core=mk(w*.3,wdBM(0xffffff,1));
      const f1=glowSprite(0xd0ffe0,w*10,1,false);f1.position.copy(from);scene.add(f1);const f2=glowSprite(0x70ffa0,w*16,.9,false);f2.position.copy(to);scene.add(f2);
      sx('laser',1.15,()=>{try{sfx.boom()}catch(x){}},{wet:.2});flash(to,0x60ff90,14);P.shake=Math.max(P.shake,.55);
      let hit=false;lt=0;
      addFx(null,o.dur||.62,(f,k)=>{const dt=f.t-lt;lt=f.t;const p=1+Math.sin(f.t*55)*.14,s=k<.12?k/.12:1-(k-.12)/.88*.9;core.scale.set(s*p,1,s*p);body.scale.set(s*p,1,s*p);halo.scale.set(s*(1+k*.8),1,s*(1+k*.8));tex.offset.y-=dt*7;
          body.material.opacity=.8*(1-k*.7);halo.material.opacity=.2*(1-k);f1.material.opacity=1-k;f2.material.opacity=.9*(1-k);f1.scale.setScalar(w*10*(1+Math.sin(f.t*40)*.15));
          for(let n=0;n<2;n++)SP.emit(from.clone().lerp(end,Math.random()).add(V3(rand(-w,w),rand(-w,w),rand(-w,w))),{c0:0xffffff,c1:0x30ff70,s0:.4,s1:.04,life:.45,speed:3});
          if(!hit&&k<.4){const ab=end.clone().sub(from),ap=headOf(P.pos,1).sub(from);const t=clamp(ap.dot(ab)/ab.lengthSq(),0,1);if(from.clone().addScaledVector(ab,t).distanceTo(headOf(P.pos,1))<w+.9){hit=true;damagePlayer(dmg);flash(headOf(P.pos,1),0x60ff90,10)}}},
        ()=>{kill();scene.remove(f1);scene.remove(f2)})})};

/* seals: rune walls he throws across your path */
const WSEAL=[];
function wdSeal(at,r,face){const g=new THREE.Group();g.position.copy(at);g.rotation.y=face;const rn=decal(runeTex,0x60ff90,r*2,true,.85);rn.rotation.set(0,0,0);g.add(rn);
  const tr=new THREE.Mesh(new THREE.TorusGeometry(r,.12,6,36),wdBM(0x9affb0,.9));g.add(tr);const gl=glowSprite(0x40ff80,r*3.2,.35,false);g.add(gl);scene.add(g);
  const s={g,r,t:0,life:11,rn,tr,gl,dead:false};WSEAL.push(s);g.scale.setScalar(.01);runeFlash(at,0x60ff90,r*1.4,.5);return s}
function wdSealClear(){for(const s of WSEAL){scene.remove(s.g);disposeObj(s.g)}WSEAL.length=0}
function wdSealWall(){const f=CH2.chase.dir||V3(0,0,1),sd=V3(f.z,0,-f.x);const at=P.pos.clone().addScaledVector(f,rand(42,52));const gap=Math.floor(rand(0,6)),face=Math.atan2(f.x,f.z);
  for(let c=0;c<6;c++){if(c===gap)continue;for(const dy of[-1.2,7.2])after(c*.05+(dy>0?.15:0),()=>{if(CH2.chase)wdSeal(at.clone().addScaledVector(sd,(c-2.5)*8.4).add(V3(0,dy,0)),4.1,face)})}
  sx('garg',.8,null,{rate:.8,wet:.4})}
{const _mt=muTick;muTick=function(dt){_mt(dt);if(!WSEAL.length)return;if(!CH2.chase||CH2.zone!=='north'){wdSealClear();return}if(CS.active)return;const pc=headOf(P.pos,1);
  for(let i=WSEAL.length-1;i>=0;i--){const s=WSEAL[i];s.t+=dt;const k=Math.min(1,s.t*3);s.g.scale.setScalar(k*k*(3-2*k));s.rn.rotation.z+=dt*1.6;s.tr.material.opacity=.6+Math.sin(time*9+i)*.3;s.gl.material.opacity=.25+Math.sin(time*5+i)*.1;
    const rel=pc.clone().sub(s.g.position);const fw=V3(Math.sin(s.g.rotation.y),0,Math.cos(s.g.rotation.y));const along=rel.dot(fw),lat=rel.clone().addScaledVector(fw,-along).length();
    if(!s.dead&&Math.abs(along)<1.6&&lat<s.r*.92&&P.invuln<=0){s.dead=true;damagePlayer(maxHP()*.2);P.vy=-5;P.shake=1.2;flash(pc,0x60ff90,12);sx('impact',1,null,{rate:.7});SP.emit(s.g.position,{n:80,c0:0xffffff,c1:0x30ff70,speed:10,life:.7});floatText(headOf(P.pos,2.2),'SEALED','#9affb0',true);s.life=Math.min(s.life,s.t+.25)}
    if(s.t>s.life||along>40){scene.remove(s.g);disposeObj(s.g);WSEAL.splice(i,1)}}}}

/* the chase brain: track your heading, blink ahead, seals, orb spirals, bursts, freeze slows him, the bar heals */
{const st=document.createElement('style');st.textContent='#boss.wdregen i{background:linear-gradient(90deg,#0b5a34,#5dffa4,#d8ffe8,#5dffa4);background-size:300% 100%;animation:wdreg .9s linear infinite}#boss.wdregen .bar{box-shadow:inset 0 0 0 1px rgba(120,255,170,.7),0 0 22px rgba(80,255,150,.55)}@keyframes wdreg{0%{background-position:100% 0}100%{background-position:0 0}}#boss .wdtag{font-size:11px;color:#9affb0;letter-spacing:.14em;margin-top:4px;text-align:center;text-shadow:0 0 8px rgba(80,255,150,.8)}';document.head.appendChild(st)}
function wdBarReset(){const b=$('boss');if(b)b.classList.remove('wdregen');const t=document.querySelector('#boss .wdtag');if(t)t.remove()}
function wdBlink(e,to){const c=eCenter(e);SM.emit(c,{n:30,c0:0x60ff90,c1:0x02140a,s0:1.5,s1:4,life:.9,a:.5,up:1});SP.emit(c,{n:80,c0:0xffffff,c1:0x30ff70,speed:10,life:.6});flash(c,0x60ff90,10);
  e.pos.copy(to);const d=eCenter(e);SP.emit(d,{n:100,c0:0xffffff,c1:0x30ff70,speed:12,life:.7});ring(V3(d.x,d.y-2,d.z),0x60ff90,1,14,.5);flash(d,0x60ff90,16);sx('portal',.9,null,{rate:1.3,wet:.3})}
{const _ai=wdChaseAI;wdChaseAI=function(e,dt,d){const C=CH2.chase;if(!C)return;const k=e.slow>0?.5:1;if(C.ah){const f=C.dir;const t=P.pos.clone().addScaledVector(f,C.ah.dist).add(V3(Math.sin(C.t*.9)*5,3.5,0));e.pos.lerp(t,Math.min(1,dt*3*k));e.m.g.rotation.y=Math.atan2(P.pos.x-e.pos.x,P.pos.z-e.pos.z);return}
  const f=C.dir||V3(0,0,1);const back=C.win?0:(C.ok>0?44:30);if(C.win){_ai(e,dt,d);return}
  const t=P.pos.clone().addScaledVector(f,-back).add(V3(Math.sin(C.t*.6)*9,2+Math.sin(C.t*1.1)*2,0));e.pos.lerp(t,Math.min(1,dt*(C.ok>0?2.5:1.2)*k));C.ok=Math.max(0,C.ok-dt)}}
{const _ea=epArrive;epArrive=function(){wdSealClear();wdBarReset();return _ea.apply(this,arguments)}}
{const _ab=epChaseAbort;epChaseAbort=function(){wdSealClear();wdBarReset();return _ab.apply(this,arguments)}}
{const _mt=muTick;muTick=function(dt){const C=CH2.chase,e=WD.e;const pre=C&&e&&!e.dead&&started&&!CS.active&&P.alive&&MODE!=='open'&&!C.arr;
  let fk=1;if(pre){fk=e.frozen>0?.18:e.slow>0?.55:1;if(fk<1){C.lasT+=dt*(1-fk);C.surge+=dt*(1-fk);if(!C.fzS){C.fzS=1;floatText(headOf(e.pos,4.6),'SLOWED','#bfe8ff',true);epSay('@','Ice slows him down. Good to know.')}}}
  _mt(dt);if(!pre||!CH2.chase)return;
  // heading
  if(C.lp){const v=P.pos.clone().sub(C.lp);v.y=0;if(v.lengthSq()>1e-4){v.normalize();C.dir=(C.dir||v.clone()).lerp(v,Math.min(1,dt*4)).normalize()}}C.lp=P.pos.clone();if(!C.dir)C.dir=V3(0,0,1);
  // the bar: normal until you hurt him, then it races back
  const box=$('boss');if(e.hp<e.maxhp-1){e.hp=Math.min(e.maxhp,e.hp+e.maxhp*.32*dt*fk);if(box&&!box.classList.contains('wdregen')){box.classList.add('wdregen');const n=$('bossName');if(n&&!box.querySelector('.wdtag')){const t=document.createElement('div');t.className='wdtag';t.textContent='REGENERATING · CANNOT DIE HERE';box.appendChild(t)}if(!C.regS){C.regS=1;after(.6,()=>epSay("Kaen's Spirit",'He heals as fast as you hurt him! Freeze him, and keep flying!',1))}}}
  else if(box&&box.classList.contains('wdregen'))wdBarReset();
  if(C.win)return;const dk=dt*fk;
  // blink ahead, seal the path, fire from the front
  C.ahT=(C.ahT==null?16:C.ahT)-dk;if(!C.ah&&C.ahT<=0&&C.surge>5){C.ah={t:0,dist:48,shot:0};C.surge=Math.max(C.surge,8);wdBlink(e,P.pos.clone().addScaledVector(C.dir,48).add(V3(0,3.5,0)));epSay('The Warden',Math.random()<.5?SL.t03:SL.t05,1);after(.5,()=>{if(CH2.chase)wdSealWall()})}
  if(C.ah){const A=C.ah;A.t+=dk;if(A.t>1.4&&A.shot<3&&A.t>1.4+A.shot*.9){A.shot++;try{e.m.actor.fire('Spell_Simple_Shoot',.6)}catch(x){}wdLaser(e,headOf(e.pos,4.2),headOf(P.pos,1).addScaledVector(C.dir,8),maxHP()*.28,.65,{charge:.55})}
    if(A.t>2.2&&!A.orb){A.orb=1;wdSpiral(e,true)}
    if(A.t>5.2){C.ah=null;C.ahT=rand(17,24);wdBlink(e,P.pos.clone().addScaledVector(C.dir,-32).add(V3(0,3,0)));C.lasT=Math.max(C.lasT,2.5)}}
  // orb spirals from behind, aimed where you will be
  C.spT=(C.spT==null?9:C.spT)-dk;if(!C.ah&&C.spT<=0){C.spT=rand(10,14);wdSpiral(e,false)}
  // extra laser bursts
  C.bsT=(C.bsT==null?7:C.bsT)-dk;if(!C.ah&&C.bsT<=0){C.bsT=rand(6,9);const lead=V3().copy(C.dir).multiplyScalar(30*.7);for(let k=0;k<3;k++)after(k*.38,()=>{if(!CH2.chase||C.win||C.ah||e.dead)return;wdLaser(e,headOf(e.pos,4.2),headOf(P.pos,1).add(lead).add(V3(rand(-4,4),rand(-2,2),0)),maxHP()*.24,.55,{charge:.6})})}}}
function wdSpiral(e,front){const c=headOf(e.pos,4);const C=CH2.chase;const tgt=headOf(P.pos,1).addScaledVector(C.dir,front?0:28);const base=tgt.clone().sub(c).normalize();const up=V3(0,1,0),sd=base.clone().cross(up).normalize(),u2=sd.clone().cross(base).normalize();
  sx('riser',.7,null,{rate:.8});for(let w=0;w<3;w++)for(let k=0;k<8;k++)after(w*.22,()=>{if(e.dead||!CH2.chase)return;const a=k/8*TAU+w*.4;const dv=base.clone().addScaledVector(sd,Math.cos(a)*.16).addScaledVector(u2,Math.sin(a)*.16).normalize();
    enemyOrb(headOf(e.pos,4),dv,front?24:48,maxHP()*.07,0x8dff70,.38,{keepY:false,life:3})})}

/* the bats come home in clouds */
{const _mt=muTick;muTick=function(dt){_mt(dt);const C=CH2.chase;if(!C||!started||MODE==='open'||CS.active||!P.alive||C.arr)return;C.batT=999;
  C.coT=(C.coT==null?12:C.coT)-dt;if(C.coT<=0){const z=P.pos.z,near=z>-3600;C.coT=near?rand(9,13):rand(14,19);const alive=enemies.filter(o=>!o.dead&&o.type==='nbat').length;const n=Math.min(near?32:24,56-alive);if(n<6)return;
    if(!C.said.bats){C.said.bats=1;epSay('@',SL.m06,1)}else if(Math.random()<.35)epSay("Kaen's Spirit",'Another swarm! Burn straight through them!');sx('bats',1.1);after(.5,()=>sx('bats',.9,null,{rate:.85}));
    const f=C.dir||V3(0,0,1),sd=V3(f.z,0,-f.x);const ctr=P.pos.clone().addScaledVector(f,rand(60,78)).addScaledVector(sd,rand(-10,10));
    for(let k=0;k<n;k++)after(k*.035,()=>{if(!CH2.chase)return;const p=ctr.clone().addScaledVector(sd,rand(-20,20)).addScaledVector(f,rand(-8,8));p.y=P.pos.y+rand(-4,7);const b=nzSpawnFly('nbat',p);b.maxhp=b.hp=Math.max(5,Math.round(b.maxhp*.3));b.dmg*=.55;b.swarm=1})}}}

VO_MAP['He heals as fast as you hurt him! Freeze him, and keep flying!']='k3_01';VO_MAP['Another swarm! Burn straight through them!']='k3_02';VO_MAP['Ice slows him down. Good to know.']='m3_01';VO_SPIRIT.add('k3_01');VO_SPIRIT.add('k3_02');

/* ================= ULTRA BOOST: Lyra's storm in the broom (crossings only, never in the chase) ================= */
const UB={on:0,t:0,cd:0,told:0,was:1,DUR:3,CD:10,MUL:3.6};
{const st=document.createElement('style');st.textContent='#ubChip{position:fixed;left:50%;bottom:112px;transform:translateX(-50%);display:none;align-items:center;gap:8px;padding:4px 12px 4px 4px;border-radius:999px;background:rgba(10,14,30,.6);border:1px solid rgba(140,200,255,.3);color:#cfe8ff;font:600 11px/1 system-ui,sans-serif;letter-spacing:.14em;cursor:pointer;z-index:30;backdrop-filter:blur(4px);transition:box-shadow .3s,border-color .3s}#ubChip b{display:grid;place-items:center;width:22px;height:22px;border-radius:50%;background:conic-gradient(#7fd4ff calc(var(--p,1)*360deg),rgba(255,255,255,.14) 0);color:#061024;font-size:11px}#ubChip.rdy{border-color:#8fe0ff;box-shadow:0 0 16px rgba(110,200,255,.6)}#ubChip.on{background:rgba(40,120,230,.6)}';document.head.appendChild(st)}
const ubEl=document.createElement('div');ubEl.id='ubChip';ubEl.innerHTML='<b>B</b><span>ULTRA BOOST</span>';document.body.appendChild(ubEl);
function ubOk(){return MODE!=='open'&&started&&CH2.zone==='north'&&!CH2.chase&&!CS.active&&P.alive&&CH2.st>=2&&P.pos.z>LON_Z}
function ubFire(){if(!ubOk())return;if(!P.flying){toast('Get on your broom first.','Ultra boost');return}if(UB.cd>0||UB.on)return;UB.on=1;UB.t=UB.DUR;
  sx('riser',.8,null,{rate:2.2});try{sfx.fly()}catch(x){}const h=headOf(P.pos,1);flash(h,0x8fd8ff,12);SP.emit(h,{n:70,c0:0xffffff,c1:0x3a90ff,speed:9,life:.6});P.shake=Math.max(P.shake,.5)}
ubEl.addEventListener('pointerdown',e=>{e.preventDefault();e.stopPropagation();ubFire()});
addEventListener('keydown',e=>{if(e.code==='KeyB'&&!e.repeat){if(ubOk()){ubFire();e.preventDefault()}}});
{const _nt=nzTick;nzTick=function(dt){_nt(dt);if(UB.on)CH2.flySpd=(CH2.flySpd||26)*UB.MUL}}
{const _mt=muTick;muTick=function(dt){_mt(dt);const vis=MODE!=='open'&&started&&CH2.zone==='north'&&!CH2.chase&&CH2.st>=2&&!CS.active&&P.pos.z>LON_Z;ubEl.style.display=vis?'flex':'none';
  if(UB.on){UB.t-=dt;if(!P.flying||CH2.chase)UB.t=0;const f=V3(Math.sin(P.face),0,Math.cos(P.face));for(let k=0;k<3;k++)SP.emit(P.pos.clone().add(V3(rand(-1.5,1.5),rand(.2,2.2),rand(-1.5,1.5))).addScaledVector(f,-2),{c0:0xe8f6ff,c1:0x2a70e0,s0:.5,s1:.04,life:.45,speed:1});
    if(UB.t<=0){UB.on=0;UB.cd=UB.CD}}else if(UB.cd>0)UB.cd=Math.max(0,UB.cd-dt);
  const rdy=!UB.on&&UB.cd<=0;ubEl.style.setProperty('--p',(UB.on?UB.t/UB.DUR:1-UB.cd/UB.CD).toFixed(3));ubEl.classList.toggle('rdy',rdy);ubEl.classList.toggle('on',!!UB.on);
  if(vis&&P.flying&&!UB.told){UB.told=1;toast('Ultra boost: press <b>B</b> (or tap the chip) for a few seconds of storm speed. Then it recharges.','Lyra\'s gift',true)}
  if(rdy&&!UB.was&&vis&&P.flying)toast('Ultra boost ready · <b>B</b>','Broom');UB.was=rdy;
  if(!CS.active&&MODE!=='open'){const tf=UB.on?82:60;if(Math.abs(camera.fov-tf)>.05){camera.fov=lerp(camera.fov,tf,Math.min(1,dt*(UB.on?6:2.5)));camera.updateProjectionMatrix()}}}}

/* ---------- town names as you arrive ---------- */
{const _ne=nzEnter;nzEnter=function(){for(const t of NZTOWNS)t.seen=0;return _ne.apply(this,arguments)}}
{const _mt=muTick;muTick=function(dt){_mt(dt);if(!started||MODE==='open'||CH2.zone!=='north'||CS.active)return;for(const T of NZTOWNS){if(T.seen)continue;if(Math.hypot(P.pos.x-T.x,P.pos.z-T.z)<T.r*.75){T.seen=1;toast(T.pub?`${T.s} · ${T.pub} is still open`:T.s,T.n)}}}}

/* ================= CHAPTER XII · Ash and Silver ================= */
const XII={rv:[0,0,0,0,0,0],lazy:0,solid:0,perch:null,said:{}};
try{Object.assign(XII,JSON.parse(localStorage.getItem('sorciere-xii')||'{}'))}catch(e){}
function xiiSave(){try{localStorage.setItem('sorciere-xii',JSON.stringify({rv:XII.rv,lazy:XII.lazy,solid:XII.solid}))}catch(e){}}
Object.assign(SPEAKER,{'Kaen':'#9ad8ff'});
const XL={ly35:'Stop moaning, both of you. I will open a door to Calais. From there it is only the sea.',ly36:'And I woke something in your broom. Press it hard and it will fly like a storm. Not for long, but it will save your arms.',ly37:'Go. The silver will not steal itself.',
  ly38:"I can feel them. The clock tower, the great wheel, the dome of Saint Paul's, the bridge, the glass spire, and Westminster.",ly39:'The silver is in the vault beneath the White Tower. He will be waiting.',ly40:"Ash from where he fell. The Crown's own silver. And the last thing is mine to give.",ly41:'Not all of it, brother. Just one beat. A heart that still beats for you.',ly42:'Welcome back, Kaen.',
  m3_02:'One of three. Ash, done. The silver is in London. Again.',m3_03:'I just flew that whole sea with a ghost on my back. My arms are jelly. Can we not?',m3_04:'A turbo broom. Okay. I take it back. I love this job.',m3_05:'Folkestone. Dover is just east along the cliffs. London is a long way north.',
  m3_06:'The ravens? The old legend? If the ravens leave the Tower, the kingdom falls?',m3_07:'Six ravens. Fine. Raven hunting it is.',m3_08:'One less chain. Fly away, little bird.',m3_09:'Big bird. Bad bird.',m3_10:'You can try. You will not like how it ends.',m3_11:'Not today.',m3_12:"Three. Bilel's counts too. Make it worth it.",
  k3_03:'She complains more than Bilel did. And Bilel complained about everything.',k3_04:"Follow the river. It'll take us all the way to the city.",k3_05:'Look at the Tower. The Warden is healing. As long as the ravens stay, he cannot die.',k3_06:'Not a legend. Six ravens, six chains of the Crown. Free them, and he bleeds like anyone.',
  k3_07:"I felt that one break. Keep going, we're nearly there!",k3_08:'That was the last one. His chains are gone. He can bleed now.',k3_09:"The Crown's silver. I spent ten years in chains of this.",k3_10:'Lyra, no. Not your heart.',
  kb_01:'I can feel the cold again. I can feel my hands.',kb_02:'Maëlle... I owe you a life. Maybe two.',kb_03:"The Crown isn't finished with us. I can still hear it, far away.",
  t2_09:'Leave my ravens alone, witch!',t2_10:'You took my ravens. Then I will take your heart instead!',t2_11:'London... always... collects...'};
for(const k in XL){VO_MAP[XL[k]]=k;if(/^k3_/.test(k))VO_SPIRIT.add(k)}
VO_MAP[XL.k3_04]='kj5_20';VO_MAP[XL.k3_07]='kj5_21';VO_MAP[XL.kb_01]='kb2_01';VO_MAP[XL.kb_02]='kb2_02';VO_MAP[XL.kb_03]='kb2_03';
const kS3=(sd,h)=>()=>{const a=KFW.a?KFW.a.g.position:P.pos;const d=V3(P.pos.x-a.x,0,P.pos.z-a.z);if(d.lengthSq()<.01)d.set(0,0,1);d.normalize();const r=V3(d.z,0,-d.x);return{pos:headOf(a,h||1.6).addScaledVector(d,2.8).addScaledVector(r,sd||1.4),look:headOf(a,1.5)}};
const lyS3=(sd)=>()=>{const g=LYR.a?LYR.a.g.position:P.pos;const d=V3(P.pos.x-g.x,0,P.pos.z-g.z);if(d.lengthSq()<.01)d.set(0,0,1);d.normalize();const r=V3(d.z,0,-d.x);return{pos:headOf(g,1.6).addScaledVector(d,2.6).addScaledVector(r,sd||1.2),look:headOf(g,1.5)}};
/* Kaen, solid again */
{const _kb=kfBuild;kfBuild=function(){if(!XII.solid||KFW.a)return _kb.apply(this,arguments);const a=makeCHActor('m',{skin:0xf2d8c8,hair:'hairPart',hairTex:'1',hairCol:0x0b0a10,brow:0x0b0a10,keepReg:[5,6,9],wear:[['long',0x121016],['trousers',0x0f0d13],['shoes',0x0a0a0c]]});if(!a)return null;
  scene.add(a.g);a.g.position.copy(P.pos);KFW.a=a;KFW.gm=new THREE.MeshBasicMaterial();KFW.kp=null;try{a.setBase('Idle_Loop');a.update(.3)}catch(x){}return a}}
function kfSolidify(){if(KFW.a){scene.remove(KFW.a.g);KFW.a=null}KFW.kp=null;KFW.mode='';XII.solid=1;xiiSave();kfBuild()}
{const _mt=muTick;muTick=function(dt){_mt(dt);if(KFW.pin||!XII.solid||!KFW.a||!KFW.a.g.visible||KFW.mode==='ride'||P.flying||CH2.chase)return;const a=KFW.a,f=V3(Math.sin(P.face),0,Math.cos(P.face)),r=V3(f.z,0,-f.x);
  const t=P.pos.clone().addScaledVector(f,-1.3).addScaledVector(r,-1.3);const gy=groundAt(a.g.position.x,a.g.position.z);a.g.position.y=gy;const sp=Math.hypot(t.x-a.g.position.x,t.z-a.g.position.z)*3.5;const an=sp>6?'Sprint_Loop':sp>1.2?'Walk_Loop':'Idle_Loop';
  if(KFW.an!==an){KFW.an=an;try{a.setBase(an,.3)}catch(x){}}}}

/* ---------- 1. Paris: the ash is in hand, and Maëlle does not want to fly again ---------- */
function xiiObj(){const st=CH2.st;if(CH2.zone==='paris'){if(st===8&&!XII.lazy)return `Talk to <b>Lyra</b> at the Trocadéro · ${LYR.a?Math.round(Math.hypot(P.pos.x-LYR.a.g.position.x,P.pos.z-LYR.a.g.position.z)):0}m`;if(st>=8&&st<11)return 'Ask <b>Lyra</b> at the Trocadéro for the door to Calais';return st>=11?'Next: <b>Chapter XIII</b>':null}
  if(st===8)return P.pos.z>CLIFF_Z?`Cross the Channel to <b>Folkestone</b> · ${Math.max(0,Math.round(P.pos.z-CLIFF_Z))}m`:`Follow the river to <b>London</b> · ${Math.max(0,Math.round(P.pos.z-LON_Z))}m`;
  if(st===9){const n=XII.rv.filter(Boolean).length;let best=null;RVP().forEach((r,i)=>{if(XII.rv[i])return;const d=Math.hypot(P.pos.x-r.p.x,P.pos.z-r.p.z);if(!best||d<best[1])best=[r.n,d]});return `Free the <b>ravens</b> · ${n}/6`+(best?` · nearest: ${best[0]} ${Math.round(best[1])}m`:'')}
  if(st===10){const g=NZ.green||V3(222,0,-9862);return `Face <b>the Warden</b> at the Tower · ${Math.round(Math.hypot(P.pos.x-g.x,P.pos.z-g.z))}m`}
  if(st>=11)return 'Next: <b>Chapter XIII</b>';return null}
{const _no=nzObj;nzObj=function(){if(CH2.st>=8)return xiiObj();return _no.apply(this,arguments)}}
function xiiLazy(){if(XII.lazy||CS.active)return;const L=LYR.a;if(L){const d=V3(P.pos.x-L.g.position.x,0,P.pos.z-L.g.position.z);L.g.rotation.y=Math.atan2(d.x,d.z)}
  playCutscene([{who:'@',text:XL.m3_02,cam:witchShot(1,3.2)},{who:'@',text:XL.m3_03,cam:witchShot(-1,3)},{who:"Kaen's Spirit",text:XL.k3_03,cut:true,cam:kS3(1.4)},
    {who:'Lyra',text:XL.ly35,cut:true,cam:lyS3(1.2)},{who:'Lyra',text:XL.ly36,cam:lyS3(-1.3),onStart:()=>{const h=headOf(P.pos,1);flash(h,0x8fd8ff,8);SP.emit(h,{n:60,c0:0xffffff,c1:0x3a90ff,speed:4,life:.9});sx('ding',.8)}},
    {who:'@',text:XL.m3_04,cam:witchShot(1,3.4)},
    {who:'Lyra',text:XL.ly37,cut:true,cam:lyS3(1),onStart:()=>{const g=LYR.a?LYR.a.g.position:P.pos;flash(headOf(g,1.4),0xff4050,14);sx('portal',1,null,{wet:.4})}},
    {dur:1.6,fov:58,cam:k=>({pos:headOf(P.pos,2+k*3).add(V3(3,0,4)),look:headOf(P.pos,1)}),onStart:()=>{flash(headOf(P.pos,1),0xff4050,26);SP.emit(headOf(P.pos,1),{n:160,c0:0xffffff,c1:0xff3040,speed:10,life:1})}}],
    ()=>{XII.lazy=1;xiiSave();CH2.st=Math.max(CH2.st,8);ch2Save();nzEnter('calais');CH2.obj=nzObj;after(.6,()=>toast('Fly back across the Channel and up the river to London. Your broom has a new trick: <b>B</b>.','Chapter XII · Ash and Silver',true))})}
{const _mt=muTick;muTick=function(dt){_mt(dt);if(!started||MODE==='open'||CS.active)return;
  if(CH2.zone==='paris'&&CH2.st===8&&!XII.lazy&&LYR.a&&LYR.a.g.visible){CH2.obj=xiiObj;if(Math.hypot(P.pos.x-LYR.a.g.position.x,P.pos.z-LYR.a.g.position.z)<7)xiiLazy()}
}}

/* ---------- 2. the crossing: Folkestone, then the long way north ---------- */
{const _mt=muTick;muTick=function(dt){_mt(dt);if(!started||MODE==='open'||CH2.zone!=='north'||CS.active||!P.alive)return;const z=P.pos.z;
  if(CH2.st===8){if(z<CLIFF_Z-20&&!XII.said.fk){XII.said.fk=1;epSay('@',XL.m3_05,1);after(6.5,()=>epSay("Kaen's Spirit",XL.k3_04))}
    if(z<LON_Z-12&&!XII.said.lon){XII.said.lon=1;xiiLondon()}}
  if(CH2.st===9){xiiPerches();xiiRavenTick(dt)}
  if(CH2.st===10&&NZ.green&&!XII.wd&&Math.hypot(P.pos.x-NZ.green.x,z-NZ.green.z)<42)xiiWarden()}}

/* ---------- 3. London: six ravens, six chains ---------- */
function RVP(){const B=NZ.bb||V3(-118,0,-9832);return[{n:'Big Ben',p:V3(B.x,57.5,B.z)},{n:'the London Eye',p:V3(-60,64,-9768)},{n:"St Paul's",p:V3(36,45.5,-9894)},{n:'Tower Bridge',p:V3(180,26.6,TH_Z)},{n:'the Shard',p:V3(126,96,-9732)},{n:'Westminster',p:V3(-202,49,-9834)}]}
function xiiLondon(){const T=V3(224,10,-9862);
  playCutscene([{dur:5,fov:50,title:['Chapter XII','The Ravens of the Crown'],cam:k=>({pos:V3(-20+k*40,60-k*12,-9620-k*60),look:V3(120,20,-9850)})},
    {who:"Kaen's Spirit",text:XL.k3_05,fov:44,cam:k=>({pos:V3(190-k*6,30,-9800),look:V3(T.x,T.y+8,T.z)}),onStart:()=>{if(NZ.crown)flash(NZ.crown.position,0x60ff80,24);sx('garg',.6,null,{rate:.7})}},
    {who:'@',text:XL.m3_06,cam:witchShot(1,3.2)},{who:"Kaen's Spirit",text:XL.k3_06,cut:true,cam:kS3(1.4)},
    {who:'Lyra',text:XL.ly38,cam:k=>({pos:V3(-30+k*30,70,-9700),look:V3(0,30,-9830)}),onStart:()=>{xiiPerches();for(const r of RVP())flash(r.p,0x60ff80,14)}},
    {who:'@',text:XL.m3_07,cam:witchShot(-1,3.4)}],
    ()=>{CH2.st=Math.max(CH2.st,9);ch2Save();xiiPerches();toast('Six ravens hold the Warden\'s chains. Find them on London\'s landmarks and set them free.','The Ravens',true)})}
function xiiPerches(){if(XII.perch||!NZ.g)return;XII.perch=RVP().map((r,i)=>{if(XII.rv[i])return null;const m=buildRaven(2.2);m.g.position.copy(r.p);m.g.rotation.y=rand(0,TAU);NZ.g.add(m.g);const o={t:rand(0,9)};
  const pil=new THREE.Mesh(new THREE.CylinderGeometry(.5,.5,160,8,1,true),nzM().glow(0x60ff90,.12));pil.position.set(r.p.x,r.p.y+80,r.p.z);NZ.g.add(pil);
  NZ.anim.push(dt=>{if(!m.g.parent&&!pil.parent)return false;o.t+=dt;if(m.g.visible)m.anim(o,dt,0,true);pil.material.opacity=.08+Math.sin(o.t*2)*.04});return{m,pil}})}
ETYPES.traven={name:'Raven of the Tower',hp:700,speed:20,dmg:20,range:3.2,cd:1.3,xp:300,r:1.6,h:2.6,fly:1,build:()=>{const m=buildRaven(2.2);return{g:m.g,body:m.body,anim:(e,dt,mv)=>m.anim(e,dt,mv,false)}},
  ai:(e,dt,d)=>{const a=e.ai||(e.ai={});e.t=(e.t||0);nzFlyAI(1.2)(e,dt,d);a.v=(a.v==null?3:a.v)-dt;a.s=(a.s==null?8:a.s)-dt;
    if(a.v<=0&&d<40){a.v=rand(4,5.5);const c=eCenter(e),base=aimAtPlayer(c).normalize();sx('cackle',.5,null,{rate:1.6});for(let k=0;k<7;k++)after(k*.05,()=>{if(e.dead)return;enemyOrb(eCenter(e),base.clone().applyAxisAngle(V3(0,1,0),(k-3)*.12),22,e.dmg*.45,0x1a1a1a,.32,{keepY:false,life:2.4})})}
    if(a.s<=0&&e.hp<e.maxhp*.75){a.s=rand(10,13);sx('bats',.7);for(let k=0;k<6;k++){const b=nzSpawnFly('nbat',V3(e.pos.x+rand(-6,6),e.pos.y+rand(-1,3),e.pos.z+rand(-6,6)));b.maxhp=b.hp=Math.max(6,Math.round(b.maxhp*.5))}}}};
function xiiRavenTick(dt){if(!XII.perch)return;RVP().forEach((r,i)=>{const P_=XII.perch[i];if(!P_||XII.rv[i]||P_.e)return;if(Math.hypot(P.pos.x-r.p.x,P.pos.z-r.p.z)<60){P_.m.g.visible=false;const e=nzSpawnFly('traven',r.p.clone());e.ravenIx=i;e.quest=true;P_.e=e;sx('cackle',.9,null,{rate:.8});
    if(!XII.said.bird){XII.said.bird=1;epSay('@',XL.m3_09,1)}toast(`The raven of ${r.n} breaks from its perch!`,'Raven of the Tower')}});
  for(const P_ of XII.perch)if(P_&&P_.e&&!P_.e.dead&&Math.hypot(P.pos.x-P_.e.pos.x,P.pos.z-P_.e.pos.z)>140){removeEnemy(P_.e);P_.e=null;P_.m.g.visible=true}}
{const _ke=killEnemy;killEnemy=function(e){const r=_ke.apply(this,arguments);try{if(e.type==='traven'&&e.ravenIx!=null&&!XII.rv[e.ravenIx])xiiFreed(e)}catch(x){console.warn(x)}return r}}
function xiiFreed(e){const i=e.ravenIx;XII.rv[i]=1;xiiSave();const c=eCenter(e);flash(c,0xffffff,18);SP.emit(c,{n:120,c0:0xffffff,c1:0x60ff80,speed:10,life:.9});sx('ding',1);
  const P_=XII.perch&&XII.perch[i];if(P_&&P_.pil){P_.pil.visible=false}
  const w=buildRaven(1.6);w.g.traverse(o=>{if(o.isMesh&&o.material&&o.material.color){o.material=o.material.clone();o.material.color.setHex(0xf4f4f8);o.material.emissive=new THREE.Color(0x90c0ff);o.material.emissiveIntensity=.4}});w.g.position.copy(c);NZ.g.add(w.g);
  const dir=V3(rand(-1,1),0,rand(-1,1)).normalize();const o={t:0};addFx(null,6,(f,k)=>{o.t=f.t;w.anim(o,.016,1,false);w.g.position.addScaledVector(dir,.35).add(V3(0,.16,0));w.g.rotation.y=Math.atan2(dir.x,dir.z);if(Math.random()<.4)SP.emit(w.g.position.clone(),{c0:0xffffff,c1:0x8fb0ff,s0:.4,s1:.04,life:.8})},()=>{NZ.g.remove(w.g)});
  const n=XII.rv.filter(Boolean).length;toast(`A raven flies free · ${n} of 6`,'The Ravens',true);
  if(n<6){after(1.2,()=>epSay(n%2?'@':"Kaen's Spirit",n%2?XL.m3_08:XL.k3_07,1));if(n===3)after(5,()=>epSay('The Warden',XL.t2_09,1))}else after(1.5,xiiRavensDone)}
function xiiRavensDone(){const T=V3(224,14,-9862);
  playCutscene([{dur:3.6,fov:48,cam:k=>({pos:V3(170,26+k*6,-9810),look:T}),onStart:()=>{if(NZ.crown){flash(NZ.crown.position,0x60ff80,30);SP.emit(NZ.crown.position,{n:200,c0:0xffffff,c1:0x30ff70,speed:14,life:1.2})}P.shake=1.2;sx('impact',1,null,{rate:.5});sx('garg',.8,null,{rate:.6,delay:.3})}},
    {who:"Kaen's Spirit",text:XL.k3_08,cut:true,cam:kS3(1.4)},{who:'Lyra',text:XL.ly39,cam:witchShot(1,3.4)}],
    ()=>{CH2.st=Math.max(CH2.st,10);ch2Save();toast('The chains are broken. Go to the Tower and take the Crown\'s silver from the Warden.','The Vault',true)})}

/* ---------- 4. the Warden, mortal at last ---------- */
function xiiWarden(){XII.wd=1;const at=V3(224,8,-9862);const e=wdSpawn(at,true);e.pos.copy(at);e.invuln=true;e.dead=false;WD.esc=1;WD.said=1;e.hpFloor=0;e.lvl=60;e.maxhp=e.hp=Math.round(e.maxhp*2);XII.wdE=e;
  playCutscene([{dur:2.6,fov:50,title:['The Warden','Mortal now'],cam:k=>({pos:V3(204,3+k*2,-9844),look:V3(at.x,at.y+2,at.z)}),onStart:()=>{flash(at,0x60ff90,26);ring(V3(at.x,0,at.z),0x60ff90,1,20,.8);sx('powerup',1,null,{rate:.7})},update:dt=>{if(WD.e)WD.e.m.anim(WD.e,dt,0)}},
    {who:'The Warden',text:XL.t2_10,fov:40,cam:()=>({pos:headOf(e.pos,4.2).add(V3(-6,0,8)),look:headOf(e.pos,4)}),update:dt=>{if(WD.e)WD.e.m.anim(WD.e,dt,0)}},
    {who:'@',text:XL.m3_10,cam:witchShot(1,3.4)}],()=>{e.invuln=false;bossRef=e;$('boss').classList.remove('hidden');P.invuln=2;wdBarReset();toast('No ravens, no healing. Bring him down.','The Warden',true)})}
{const _ai=BOSSAI.warden;BOSSAI.warden=function(e,dt,d){_ai(e,dt,d);if(CH2.st!==10||CH2.chase||e.dead||e.invuln)return;const a=e.ai;
  a.bk=(a.bk==null?7:a.bk)-dt;if(a.bk<=0&&e.busy<=0){a.bk=rand(7,10);const ang=rand(0,TAU);const to=P.pos.clone().add(V3(Math.sin(ang)*16,rand(4,7),Math.cos(ang)*16));wdBlink(e,to);
    for(let k=0;k<3;k++)after(.5+k*.45,()=>{if(e.dead)return;wdLaser(e,headOf(e.pos,4.2),headOf(P.pos,1).add(V3(rand(-1.5,1.5),0,rand(-1.5,1.5))),maxHP()*.22,.6,{charge:.5,ext:20})})}
  if(!a.cohort&&e.hp<e.maxhp*.5){a.cohort=1;sx('bats',1);epSay('The Warden',SL.t07);for(let k=0;k<14;k++)after(k*.05,()=>{const b=nzSpawnFly('nbat',P.pos.clone().add(V3(rand(-25,25),rand(2,8),rand(-25,25))));b.maxhp=b.hp=Math.max(5,Math.round(b.maxhp*.35))})}}}
{const _bo=bossOutro2;bossOutro2=function(type,center,orb){if(type==='warden'&&CH2.st===10)return xiiSilver(center,orb);return _bo.apply(this,arguments)}}

/* ---------- 5. the Crown's silver, and a heartbeat ---------- */
function xiiSilver(center,orb){const g=NZ.green||V3(222,0,-9862);const sp=V3(center.x,Math.max(2.4,groundAt(center.x,center.z)+2.4),center.z);
  const sil=new THREE.Group();sil.position.copy(sp);const sm=std({color:0xe8eef8,metalness:1,roughness:.15,emissive:0x8fb0ff,emissiveIntensity:.35});sil.add(new THREE.Mesh(new THREE.TorusGeometry(.55,.08,8,28),sm));for(let k=0;k<7;k++){const a=k/7*TAU;const s=new THREE.Mesh(new THREE.ConeGeometry(.07,.34,5),sm);s.position.set(Math.cos(a)*.55,.18,Math.sin(a)*.55);sil.add(s)}
  const sg=glowSprite(0xcfe0ff,3,.6);sil.add(sg);NZ.g.add(sil);const spin={on:1};NZ.anim.push(dt=>{if(!spin.on)return false;sil.rotation.y+=dt*1.2;sil.position.y=sp.y+Math.sin(performance.now()*.002)*.15});
  const kp=()=>KFW.a?KFW.a.g.position:P.pos;
  playCutscene([{who:'The Warden',text:XL.t2_11,cam:orb,update:()=>SP.emit(V3(center.x+rand(-2,2),center.y+rand(0,4),center.z+rand(-2,2)),{c0:0xc0ff90,c1:0x103010,s0:.6,s1:.1,life:.8,up:2})},
    {who:'@',text:XL.m3_11,cam:witchShot(-1,3.4)},
    {who:"Kaen's Spirit",text:XL.k3_09,cut:true,cam:()=>({pos:sp.clone().add(V3(2.4,.6,2.4)),look:sp}),onStart:()=>{sx('ding',.9)}},
    {dur:2.4,cam:k=>({pos:headOf(P.pos,2).add(V3(4,1,5)),look:headOf(P.pos,1)}),onStart:()=>{const f=V3(Math.sin(P.face),0,Math.cos(P.face));lyraPlace(P.pos.x+f.x*3+1.5,P.pos.z+f.z*3,P.face+Math.PI);flash(headOf(LYR.a?LYR.a.g.position:P.pos,1.2),0xff4050,20);sx('portal',1)}},
    {who:'Lyra',text:XL.ly40,cut:true,cam:lyS3(1.2)},{who:"Kaen's Spirit",text:XL.k3_10,cut:true,cam:kS3(1.3)},
    {who:'Lyra',text:XL.ly41,cut:true,cam:lyS3(-1.2),onStart:()=>{const L=LYR.a?LYR.a.g.position:P.pos;const h=glowSprite(0xff3050,1.2,1,false);h.position.copy(headOf(L,1.35));scene.add(h);XII.heart=h;sx('heart',.9)}},
    {dur:5.2,fov:46,cam:k=>{const c=kp();return{pos:headOf(c,1.6+k*1.5).add(V3(Math.sin(k*2)*6,0,Math.cos(k*2)*6)),look:headOf(c,1.2)}},onStart:()=>{spin.on=0;const c=kp();sx('powerup',1,null,{rate:.8});sx('riser',.8,null,{rate:.7})},
      update:dt=>{const c=headOf(kp(),1.1);sil.position.lerp(c,Math.min(1,dt*1.2));if(XII.heart)XII.heart.position.lerp(c,Math.min(1,dt*1.1));
        SP.emit(c.clone().add(V3(rand(-2,2),rand(-1,2),rand(-2,2))),{n:2,c0:0xd0a0ff,c1:0x402060,s0:.35,s1:.04,life:1,speed:-2});if(Math.random()<.4)SP.emit(c,{c0:0xff6080,c1:0x601020,s0:.5,s1:.05,life:.8,speed:3})}},
    {dur:2.2,fov:44,cam:k=>{const c=kp();return{pos:headOf(c,1.5).add(V3(3.4,0,3.4)),look:headOf(c,1.2)}},onStart:()=>{const c=headOf(kp(),1.1);flash(c,0xffffff,40);SP.emit(c,{n:300,c0:0xffffff,c1:0xd0a0ff,speed:14,life:1.4});P.shake=1.5;sx('impact',1,null,{rate:.6});NZ.g.remove(sil);if(XII.heart){scene.remove(XII.heart);XII.heart=null}kfSolidify()}},
    {who:'Kaen',text:XL.kb_01,cut:true,cam:kS3(1.2,1.6),onStart:()=>{try{KFW.a.setBase('Idle_Loop',.3)}catch(x){}}},{who:'Lyra',text:XL.ly42,cam:lyS3(1.2)},{who:'Kaen',text:XL.kb_02,cut:true,cam:kS3(-1.3,1.6)},{who:'@',text:XL.m3_12,cam:witchShot(1,3.2)},
    {who:'Kaen',text:XL.kb_03,fov:50,cam:k=>({pos:V3(g.x-10,6+k*14,g.z+30),look:V3(232,30,-9866)})}],
    ()=>{if(sil.parent)sil.parent.remove(sil);spin.on=0;if(XII.heart){scene.remove(XII.heart);XII.heart=null}if(!XII.solid)kfSolidify();CH2.st=Math.max(CH2.st,11);ch2Save();writeSave();beaten.add('warden');toast('Kaen has his body back. Chapter XIII is coming.','Chapter XII complete',true)})}
for(const k of['kb_01','kb_02','kb_03'])VO_SPIRIT.delete(k);

/* ---------- chapter select ---------- */
CHAPTERS.push({id:'silver',n:'XII',title:'Ash and Silver',desc:'The ash, the long way back to London, six ravens, and a heartbeat.'});
{const _cb=chapBoss;chapBoss=function(c){if(c.id==='silver')return null;return _cb(c)}}
{const _ac=applyChapter;applyChapter=function(id){if(id!=='silver')return _ac.apply(this,arguments);_ac.call(this,'escape');CH2.st=8;ch2Save();XII.lazy=1;XII.rv=[0,0,0,0,0,0];XII.solid=0;XII.wd=0;XII.said={};xiiSave();WD.esc=1;if(WD.e&&!WD.e.dead){WD.e.dead=true;WD.e.m.g.visible=false}WD.e=null;nzEnter('calais');CH2.obj=nzObj}}
{const _rc=renderChapters;renderChapters=function(){_rc();const list=$('chapList');const el=list&&list.children[chapIndexOf('silver')];if(el){const done=CH2.st>=11,cur=started&&CH2.st>=7&&CH2.st<11;el.className='chap'+(done?' done':'')+(cur?' cur':'')}}}
{const _wl=wdLaser;wdLaser=function(e,from,to,dmg,w,o){if(CH2.st===10&&!CH2.chase)dmg*=.7;return _wl.call(this,e,from,to,dmg,w,o)}}

/* ---------- Lyra's door in Calais: the only way home to Paris ---------- */
{const _nb=nzBuild;nzBuild=function(){const was=NZ.built;const r=_nb.apply(this,arguments);if(!was&&NZ.g&&!NZ.calDoor){const d=nzPortal(V3(34,0,-2146));NZ.g.add(d);NZ.calDoor=d;NZ.anim.push(dt=>{if(d.visible)d.userData.tick(dt)});NZ.mapP.push([34,-2146])}return r}}
{const _mt=muTick;muTick=function(dt){_mt(dt);if(!NZ.calDoor)return;const on=MODE!=='open'&&CH2.st>=2&&CH2.st!==6&&!CH2.chase;NZ.calDoor.visible=on;
  if(on&&CH2.zone==='north'&&started&&!CS.active&&Math.hypot(P.pos.x-34,P.pos.z+2146)<9&&!NZ.calTold){NZ.calTold=1;toast('Lyra\'s door. Step through to go home to Paris.','Calais')}if(Math.hypot(P.pos.x-34,P.pos.z+2146)>20)NZ.calTold=0}}

/* ---------- banter: Maëlle and Kaen talk while they travel ---------- */
const BAN={t:24,i:0,busy:0,said:{}};
const BL={m4_01:"Can I ask you something? Why don't you and Lyra have the same accent?",m4_02:'Okay. I see.',m4_03:"I thought fighting you... I mean, your body... was the hardest thing ever. But this Tower thing is insane. Does he have unlimited stamina?",m4_04:'Great. A ghost with a phone charger.',
  m4_05:'When you get your body back, what is the first thing you do?',m4_06:'Bold of you to assume this week will let you sleep.',m4_07:'Do ghosts get cold up here?',m4_08:'He would have complained the whole way.',m4_09:"It's called hygiene, Kaen. Look it up.",m4_10:'I am not singing.',m4_11:'Does it ever stop raining in England?',m4_12:"You'll get used to it.",m4_13:'So. Kaen with a body. Any plans?',m4_14:'In that order?',
  m6_01:'Then we make it right. One night at a time.',m6_02:"Don't make it weird, Kaen.",m6_09:'Kaen, flying without a broom? Show off.',ly47:'Your guardian is very comfortable, by the way.',
  kj5_01:"Ah. That's because she's only my half sister.",kj5_02:'I grew up across the pond, in New England. Lyra grew up in the real England for a few years, before she came to live with me.',kj5_03:"Honestly, I think her accent's gone a little bit transatlantic. Ugh. Never mind. Don't tell her I said that.",
  kj5_04:"No, he doesn't. Not once he's cut off from the Tower.",kj5_05:"Right now he feeds while he fights. He pulls power from the Tower, even from miles away. He just can't keep it up forever.",kj5_06:"Honestly? A real croissant, still warm. And then I'm going to sleep for a whole week.",
  kj5_07:"I don't feel anything at all. And believe me, that's worse than being cold.",kj5_08:"You know, Bilel would have loved this. Flying over the sea on a witch's broom.",kj5_09:"He would have. And he'd have loved every second of it.",kj5_10:'Is it just me, or does your broom smell like lavender?',
  kj5_11:'When we were kids, Lyra used to sing on long trips. She was terrible at it.',kj5_12:'Good. Thank you. Really.',kj5_13:'It did once, back in nineteen seventy six. People still talk about it.',kj5_14:'Can I tell you something? Some nights I can still hear the people I hurt in Paris.',
  kj5_15:'Thank you for not giving up on me. You had every reason to.',kj5_16:"It feels strange to walk again. I'd forgotten how heavy my own feet are.",kj5_17:"I hope I don't. I like feeling them.",kj5_18:'Stay away from crowns, learn how to cook, and apologise to Paris.',kj5_19:'I feel naked without my sword. Ten years, and I still reach for it.'};
for(const k in BL)VO_MAP[BL[k]]=k;
const BCONV=[{id:'accent',c:s=>s>=7&&s<11,l:['m4_01','kj5_01','kj5_02','kj5_03','m4_02']},{id:'stamina',c:s=>s>=8&&s<10,l:['m4_03','kj5_04','kj5_05','m4_04']},{id:'croissant',c:s=>s>=7&&s<11,l:['m4_05','kj5_06','m4_06']},
  {id:'cold',c:s=>s>=7&&s<11,fly:1,l:['m4_07','kj5_07']},{id:'bilel',c:s=>s>=7&&s<11,fly:1,l:['kj5_08','m4_08','kj5_09']},{id:'guilt',c:s=>s>=8,l:['kj5_14','m6_01']},{id:'broom',c:s=>s>=7&&s<13,fly:1,l:['kj5_10','m4_09']},{id:'sing',c:s=>s>=7,l:['kj5_11','m4_10','kj5_12']},
  {id:'rain',c:s=>s>=7,l:['m4_11','kj5_13']},{id:'feet',c:s=>s>=11,l:['kj5_16','m4_12','kj5_17']},{id:'sword',c:s=>s>=11&&s<13,l:['kj5_19']},{id:'thanks',c:s=>s>=9,l:['kj5_15','m6_02']},{id:'plans',c:s=>s>=11,l:['m4_13','kj5_18','m4_14']},
  {id:'showoff',c:s=>s>=13,fly:1,l:['m6_09','ly47']}];
function banterOk(){if(MODE==='open'||!started||CS.active||!P.alive||CH2.chase||bossRef||!kfwOn()||!KFW.a||!KFW.a.g.visible)return false;if(SAYQ.q.length)return false;
  return !enemies.some(e=>!e.dead&&e.aggro&&Math.hypot(e.pos.x-P.pos.x,e.pos.z-P.pos.z)<45)}
{const _mt=muTick;muTick=function(dt){_mt(dt);if(BAN.busy){if(!SAYQ.q.length&&!SAYQ.on&&performance.now()*.001>SAYQ.free)BAN.busy=0;return}if(!banterOk()){BAN.t=Math.max(BAN.t,8);return}BAN.t-=dt;if(BAN.t>0)return;
  const s=CH2.st,opts=BCONV.filter(c=>!BAN.said[c.id]&&c.c(s)&&(!c.fly||P.flying));if(!opts.length){BAN.t=40;return}const c=opts[0];BAN.said[c.id]=1;BAN.t=rand(55,85);BAN.busy=1;
  for(const k of c.l){const kaen=k[0]==='k';SAYQ.q.push([kaen?(XII.solid?'Kaen':"Kaen's Spirit"):k.startsWith('ly')?'Lyra':'@',BL[k]]);try{voLoad(VO_MAP[BL[k]])}catch(x){}}}}
/* Maëlle's solo barks step aside for the conversation, and stay quieter while Kaen is with her */
{const _bk=bark;bark=function(who,cat,prio,cd,chance){if(MODE!=='open'&&started&&(SAYQ.on||SAYQ.q.length||BAN.busy)&&(who==='@'||(prio||0)<3))return false;return _bk.apply(this,arguments)}}
