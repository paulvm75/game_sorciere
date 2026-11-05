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
const SAYQ={q:[],free:0};function epSay(who,text,prio){if(prio)SAYQ.q.unshift([who,text]);else if(SAYQ.q.length<4)SAYQ.q.push([who,text])}
{const _mt=muTick;muTick=function(dt){_mt(dt);const now=performance.now()*.001;if(!SAYQ.q.length||now<SAYQ.free||CS.active)return;const [w,t]=SAYQ.q.shift();cineLine(w,t);const k=VO_MAP[t];const d=k&&CLIP.buf[k]?CLIP.buf[k].duration:3;SAYQ.free=now+d+.5}}

/* ---------- Lyra hands over the sea-glass gem at Calais ---------- */
{const _pc=playCutscene;playCutscene=function(shots,done){try{const i=shots.findIndex(s=>s.who==='Lyra'&&s.text===LY.ly15);if(i>=0&&!shots.some(s=>s.text===LY.ly33)){const cam=shots[i].cam;
    shots.splice(i+1,0,{who:'Lyra',text:LY.ly33,cam,onStart:()=>{CH2.gem=1;const h=headOf(P.pos,1.2);flash(h,0x60e0ff,8);SP.emit(h,{n:60,c0:0xffffff,c1:0x30c0ff,speed:4,life:.9});sx('ding',.8)}})}}catch(e){}return _pc.call(this,shots,done)}}

/* ---------- Kaen raises his hands, the light gathers, the guardians rise ---------- */
epSummon=function(e){const act=e.m.actor;const c=e.pos.clone();const d=V3(P.pos.x-c.x,0,P.pos.z-c.z).normalize();const sd=V3(d.z,0,-d.x);let gs=[],gl=[],pw=0;e.busy=99;e.m.lock=99;
  const hold=dt=>{e.t+=dt;e.pos.copy(c);e.m.g.rotation.y=Math.atan2(d.x,d.z);kaenFx(e,dt);act.update(dt);for(const s of gl){s.scale.setScalar(.4+pw*2.6+Math.sin(time*18)*.08);s.material.opacity=.5+pw*.5}};
  const hands=()=>{try{for(const b of['hand_l','hand_r']){const s=glowSprite(0xc080ff,1,.6);act.attach(b,s,act.S.SK[b].clone());gl.push(s)}}catch(x){}};
  playCutscene([
    {dur:2,fov:38,cut:true,cam:k=>({pos:headOf(c,1.5).addScaledVector(d,3.6-k*.7).addScaledVector(sd,.9),look:headOf(c,1.9)}),onStart:()=>{act.setBase('Spell_Simple_Idle_Loop',.4);hands();runeFlash(c,0x9a40ff,7,2.2);sx('portal',.7,null,{rate:.7,wet:.4})},
      update:dt=>{hold(dt);pw=Math.min(1,pw+dt*.6);for(const s of gl){const p=s.getWorldPosition(V3());if(Math.random()<.6)SP.emit(p.clone().add(V3(rand(-1,1),rand(-1,1),rand(-1,1))),{c0:0xe0c0ff,c1:0x5010c0,s0:.3,s1:.03,life:.4,speed:-3})}}},
    {who:'Kaen',text:EPL.sum,fov:46,cam:k=>{const m=gs.length?gs.reduce((s,g)=>s.add(g.pos),V3()).multiplyScalar(1/gs.length):c;return{pos:headOf(c,3.6).addScaledVector(d,-7).addScaledVector(sd,4.5),look:headOf(m,2.6)}},
      onStart:()=>{sx('summon',1.2,()=>{try{sfx.roar()}catch(x){}},{wet:.35});for(const s of gl)lightning(s.getWorldPosition(V3()),V3(c.x,c.y+30,c.z),0xd0a0ff);flash(headOf(c,2.4),0xb070ff,12);
        gs=summonGuardians(e,2);for(const g of gs){g.m.g.scale.setScalar(.01);g._grow=0;runeFlash(g.pos,0xa050ff,9,2)}},
      update:dt=>{hold(dt);for(const g of gs){g._grow=Math.min(1,(g._grow||0)+dt*.7);const k=g._grow;g.m.g.scale.setScalar(Math.max(.01,k*k*(3-2*k)));g.m.g.position.copy(g.pos);if(Math.random()<.7)SM.emit(V3(g.pos.x+rand(-2,2),g.pos.y+rand(0,4),g.pos.z+rand(-2,2)),{c0:0xb080ff,c1:0x200840,s0:1,s1:3,life:1,a:.4,up:2})}}},
    {dur:2.4,fov:50,cut:true,title:['Two guardians','One is real. One is a lie.'],cam:k=>({pos:headOf(c,7+k*2).addScaledVector(d,20-k*3).addScaledVector(sd,-6),look:headOf(c,4)}),onStart:()=>{for(const g of gs)g.m.g.scale.setScalar(1)},update:hold}
  ],()=>{e.busy=0;e.m.lock=0;for(const s of gl)if(s.parent)s.parent.remove(s);for(const g of gs)g.m.g.scale.setScalar(1);act.setBase('Idle_Loop',.3);after(.8,()=>bark('@','m_illu',3,0))})};

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
{const _mt=muTick;muTick=function(dt){_mt(dt);if(!started)return;const on=kfwOn();if(!on){if(KFW.a)KFW.a.g.visible=false;return}const a=kfBuild();if(!a)return;a.g.visible=W.g.visible!==false;
  if(NZ.ghost&&CH2.zone==='north')NZ.ghost.g.visible=false;
  const f=V3(Math.sin(P.face),0,Math.cos(P.face)),r=V3(f.z,0,-f.x);const ride=P.flying||!!CH2.chase;let tgt,ry=P.face;
  if(ride){tgt=P.pos.clone().addScaledVector(f,-.62);tgt.y+=EP.lev+.06;if(KFW.mode!=='ride'){KFW.mode='ride';try{a.setBase('Sitting_Idle_Loop',.3)}catch(x){a.setBase('Crouch_Idle_Loop',.3)}}a.g.position.copy(W.g.position).addScaledVector(f,-.62);a.g.position.y+=.06}
  else{tgt=P.pos.clone().addScaledVector(f,-1.1).addScaledVector(r,-1.2);tgt.y=P.pos.y+.35+Math.sin(time*1.6)*.12;if(KFW.mode!=='float'){KFW.mode='float';a.setBase('Idle_Loop',.4)}a.g.position.lerp(tgt,Math.min(1,dt*3.5));
    const dx=P.pos.x-a.g.position.x,dz=P.pos.z-a.g.position.z;if(Math.hypot(dx,dz)>.4)ry=lerpAngle(a.g.rotation.y,P.face,Math.min(1,dt*3))}
  a.g.rotation.y=ry;try{a.update(dt)}catch(x){}KFW.gm.opacity=.36+Math.sin(time*2.6)*.07;if(Math.random()<.15)SP.emit(V3(a.g.position.x+rand(-.3,.3),a.g.position.y+rand(.3,1.6),a.g.position.z+rand(-.3,.3)),{c0:0xd0f0ff,c1:0x2050a0,s0:.25,s1:.03,life:.8,up:.5})}}

/* ================= after the quiz: Kaen is free, but the Tower is not done with you ================= */
function stAfterQuiz(){const c=NZ.green;const kS=sd=>()=>({pos:headOf(c,1.5).add(V3(sd||1.8,.2,2.8)),look:headOf(c,1.4)});
  playCutscene([
    {who:"Kaen's Spirit",text:SL.k01,fov:36,cut:true,cam:kS(1.6),onStart:()=>{try{NZ.ghost.setBase('Idle_Loop',.5)}catch(x){}}},
    {who:'@',text:SL.m01,cam:witchShot(-1,3)},
    {who:"Kaen's Spirit",text:SL.k02,cam:kS(-1.6)},
    {dur:2.4,fov:52,cut:true,cam:k=>({pos:V3(203,2.5+k,-4805),look:V3(226,12+k*4,-4824)}),onStart:()=>{const s=epTowerSpirit();s.ty=14;P.shake=1.4;sx('garg',1,null,{rate:.5,wet:.5});flash(V3(226,14,-4824),0x60ff90,24)}},
    {who:'The Tower',text:SL.t01,fov:40,cam:()=>({pos:V3(205,2.6,-4806),look:epEyes()})},
    {dur:3,fov:46,cut:true,title:['The Warden','The Tower takes a body'],cam:k=>({pos:V3(204,3+k*2,-4804),look:V3(226,8-k*3,-4822)}),onStart:()=>{const s=epTowerSpirit();s.ty=-14;sx('powerup',1,null,{rate:.7});sx('impact',1,null,{rate:.5});
        const at=V3(224,8,-4822);flash(at,0x60ff90,30);ring(V3(224,0,-4822),0x60ff90,1,20,.8);SP.emit(at,{n:220,c0:0xffffff,c1:0x30ff70,speed:14,life:1.2});wdSpawn(at,true)},update:dt=>{if(WD.e)WD.e.m.anim(WD.e,dt,0)}},
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
if(typeof BTH!=='undefined')BTH.warden='mus_greyfang';
function wdSpawn(at,still){if(WD.e&&!WD.e.dead)return WD.e;const e=spawnEnemy('warden',V3(at.x,0,at.z));e.pos.y=at.y;e.aggro=true;e.hpFloor=.55;e.invuln=!!still;e.m.g.children.forEach(c=>{if(c.material&&c.material.map===scorchTex)c.visible=false});WD.e=e;WD.t=0;WD.lasT=3;WD.orbT=6;return e}
function wdFight(){KFW.go=1;const e=WD.e||wdSpawn(V3(224,8,-4822));e.invuln=false;bossRef=e;$('boss').classList.remove('hidden');P.invuln=2;toast('Avoid the green lasers. They are far too strong to take.','The Warden',true);after(4,()=>epSay("Kaen's Spirit",SL.k03))}
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
  C.surge-=dt;if(e&&!e.dead&&!C.win&&C.surge<=0){C.surge=rand(15,21);C.win=performance.now();C.cast0=EP_CAST;epSay("Kaen's Spirit",SL.k11,1);sx('garg',.9,null,{rate:.7});
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
  if(Math.hypot(P.pos.x-g.position.x,P.pos.z-g.position.z)<1.6){scene.remove(g);ASH.g=null;CH2.st=Math.max(CH2.st,8);ch2Save();writeSave();sx('ding',1);flash(headOf(P.pos,1),0xb080ff,10);CH2.obj=()=>'Next: <b>Chapter XII · Ash and Silver</b>';
    toast('Kaen\'s ash · 1 of 3. A heart that beats for him and the Crown\'s silver are still out there. Chapter XII is coming.','Ash collected',true)}}}
{const _lt=lyraToTroca;lyraToTroca=function(){_lt.apply(this,arguments);if(CH2.st===7){after(1,()=>{if(CH2.st===7&&!CS.active)epAshPlace()})}}}

/* ---------- the Tower door stays shut while the Warden is loose; a reload resumes at the Tower ---------- */
{const _mt=muTick;muTick=function(dt){_mt(dt);if(MODE==='open'||CH2.zone!=='north'||!started)return;
  if(NZ.home){const hide=CH2.st===6;if(hide&&!NZ.home.userData.moved){NZ.home.userData.moved=1;NZ.home.position.x+=10000}else if(!hide&&NZ.home.userData.moved){NZ.home.userData.moved=0;NZ.home.position.x-=10000}}
  if(CH2.st===6&&!CH2.chase&&!CS.active&&P.alive&&NZ.green&&(!WD.e||WD.e.dead)&&!WD.esc&&Math.hypot(P.pos.x-NZ.green.x,P.pos.z-NZ.green.z)<30){epFreeKaen(true);
    const e=wdSpawn(V3(224,8,-4822));epSay('The Warden',SL.t08,1);after(.5,wdFight)}
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
