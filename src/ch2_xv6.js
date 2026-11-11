/* =====================================================================================
   CHAPTER XVI, fourth pass: the fight against yourself is a fight, start to finish.
   No stops, no Kaen cinematics. Her limit breaker comes at the end, with a heal and shields.
   One short mash at the very end. Every Crown body animates in cinematics (no T-pose).
   ===================================================================================== */
Object.assign(XL3,{mw_33:'HAAAAAAH!',kx_01:'Watch the sky, Maëlle! Keep moving!',kx_02:'Break that shield first, then hit her with everything!',kx_03:"She's too fast on the broom. Wait for her to land!",
  lz_01:"Watch her wand hand! That's where the fire comes from!",lz_02:"She's slowing down. Don't stop now!",mm_09:'Everything you can do, I do better.',mm_10:'Burn with me, Maëlle.',mm_11:"You're getting tired. I never get tired.",
  mw_34:"That's it. No more holding back!",mw_35:'Not... this... time!',mm_12:'Too slow.',mw_36:'Stay away from my friends!'});
for(const k of ['mw_33','kx_01','kx_02','kx_03','lz_01','lz_02','mm_09','mm_10','mm_11','mw_34','mw_35','mm_12','mw_36'])VO_MAP[XL3[k]]=k;

/* ---------- no more T-pose: Crown bodies keep animating while a cinematic plays ---------- */
{const _uc=updateCutscene;updateCutscene=function(dt){const r=_uc.apply(this,arguments);try{for(const e of enemies){if(e.dead||!e.m||!e.m.actor||!e.m.actor.update)continue;if(e.type==='illusion'||e.type==='xmirror'||e.xo){const A=e.m.actor;if(A.mixer&&!A.mixer._actions.length)try{A.setBase('Idle_Loop',0)}catch(x){}A.update(dt)}}}catch(x){}return r}}
function xmFs(v,r){try{sfx.fire&&sfx.fire()}catch(x){}sx('laser',v*.45,null,{rate:(r||1)*.62})}

/* ---------- stronger Crown bodies, scaled to you, and no easy mode walkover ---------- */
const XOSTR=()=>({easy:{hp:2.1,dmg:2.8},medium:{hp:1.45,dmg:1.45},hard:{hp:1.35,dmg:1.25}}[DIFF]||{hp:1.45,dmg:1.45});
{const _sp=xoSpawn;xoSpawn=function(i,at,color){const e=_sp.apply(this,arguments);try{const S=XOSTR(),kaen=e.type==='illusion';const m=S.hp*(kaen?1.3:1);e.maxhp=Math.round(e.maxhp*m);e.hp=e.maxhp;e.dmg*=S.dmg*(kaen?1.2:1);e.hpFloor=.03;if(kaen){kNoSpell(e.m.actor);e.ai.lbDone=1}}catch(x){}return e}}
/* the Crown wearing Kaen fights to the very end before it lets go of him */
{const _ai=BOSSAI.illusion;BOSSAI.illusion=function(e,dt,d){if(e.xo){const h=e.hp,lo=e.maxhp*.126;if(h<=lo)e.hp=lo+1;const r=_ai.apply(this,arguments);if(h<=lo)e.hp=Math.min(e.hp,h);e.hpFloor=.03;return r}return _ai.apply(this,arguments)}}
function xmDmg(b){return b*1.25*(1+.2*(P.level-1))*({easy:.62,medium:.95,hard:1.2}[DIFF]||.95)}

/* ---------- her wand: fire, with something dark in it ---------- */
function xmTip(e){const t=e.m.wandTip;if(t){const v=new THREE.Vector3();t.getWorldPosition(v);return v}return eCenter(e)}
function xmFireOrb(e,dir,spd,dmg,size){const o=xmTip(e);enemyOrb(o,dir,spd,dmg,0xff6a1a,size||.34,{keepY:true});SM.emit(o,{n:2,c0:0x140604,c1:0,s0:.4,s1:1.2,life:.5,a:.5});FL.emit(o,{n:3,c0:0xffd060,c1:0xff4010,s0:.5,s1:.05,life:.3,speed:2})}
xmFireball=function(e){const p=P.pos.clone();p.y=groundAt(p.x,p.z);xmName(e,'FIREBALL','#ff8a3c');xmLob(xmTip(e),V3(p.x,p.y+.6,p.z),0xff6a1a,.7,2.5);xmFs(.5,1.1);telegraph(p,3.4,.7,0xff6a1a,()=>{fireBurst(V3(p.x,p.y+.6,p.z),3.2,true);SM.emit(V3(p.x,p.y+.8,p.z),{n:10,c0:0x140604,c1:0,s0:1,s1:3,life:1,a:.6,up:2});sfx.boom&&sfx.boom();if(playerIn(p,3.6,4)){damagePlayer(xd(24));P.shake=Math.max(P.shake,.6)}})};
xmMeteor=function(e){const p=P.pos.clone();p.y=groundAt(p.x,p.z);xmName(e,'DARK METEOR','#ff5a3c');xmLob(V3(p.x+8,p.y+34,p.z+4),V3(p.x,p.y+.5,p.z),0xff5a1a,1.1,0);telegraph(p,5,1.1,0xff5a1a,()=>{fireBurst(V3(p.x,p.y+.8,p.z),5,true);ring(p,0xff5a1a,1,9,.5);SM.emit(V3(p.x,p.y+1,p.z),{n:24,c0:0x140604,c1:0,s0:2,s1:5,life:1.3,a:.7,speed:5});sfx.boom&&sfx.boom();sx('impact',.7,null,{rate:.7});P.shake=Math.max(P.shake,1);x5Punch(8,.3);if(playerIn(p,5.2,5))damagePlayer(xd(36))})};
xmSky=function(e,n,col,name,hex,r,dmg){xmName(e,name,hex);for(let k=0;k<n;k++)after(k*.15,()=>{if(e.dead||XO.ph!==2)return;const p=k===0?P.pos.clone():V3(P.pos.x+rand(-9,9),0,P.pos.z+rand(-9,9));p.y=groundAt(p.x,p.z);telegraph(p,r,.8,col,()=>{xoBeam(V3(p.x,p.y+32,p.z),V3(p.x,p.y,p.z),col,.35,.55);fireBurst(V3(p.x,p.y+.4,p.z),r*.8,false);SM.emit(V3(p.x,p.y+.6,p.z),{n:5,c0:0x140604,c1:0,s0:.8,s1:2.4,life:.8,a:.6,up:2});xmFs(.3,rand(.8,1.2));if(playerIn(p,r+.2,5))damagePlayer(xd(dmg))})})};

/* ---------- the mirror's brain: no breaks, no tubes, wand fire, sky fire, a broom ---------- */
BOSSAI.xmirror=function(e,dt,d){const a=e.ai,B=XO.B;if(a.m0===undefined){a.m0=1;a.a1=1.1;a.a2=3;a.a3=4.5;a.a4=3.5;a.a5=5.5;a.a6=8;a.cp=0;a.fl=11;a.n=0}const gy=groundAt(e.pos.x,e.pos.z);
  if(XO.fc){e.pos.y=lerp(e.pos.y,gy,Math.min(1,dt*6));return}const rage=e.hp<e.maxhp*.5,sp=dt*(e.lb?1.6:1)*({easy:1,medium:1.08,hard:1.18}[DIFF]||1.08);for(const k of['a1','a2','a3','a4','a5','a6'])a[k]-=sp;a.cp-=dt;a.fl-=dt;
  const c=xmTip(e),dir=V3(P.pos.x-c.x,(P.pos.y+1.1)-c.y,P.pos.z-c.z).normalize();
  const bolts=n=>{for(let k=0;k<n;k++){const off=(k-(n-1)/2)*.18,dd=V3(dir.x*Math.cos(off)-dir.z*Math.sin(off),dir.y,dir.x*Math.sin(off)+dir.z*Math.cos(off));xmFireOrb(e,dd,22,xd(14))}xmFs(.35,1.3);try{e.m.actor.fire('Spell_Simple_Shoot',.3)}catch(x){}};
  if(a.fly){const F=a.fly;F.t+=dt;F.ang+=dt*.6*F.dir;const tx=clamp(P.pos.x+Math.sin(F.ang)*13,B.x0+2,B.x1-2),tz=clamp(P.pos.z+Math.cos(F.ang)*13,B.z0+2,B.z1-2);e.pos.x=lerp(e.pos.x,tx,Math.min(1,dt*2.4));e.pos.z=lerp(e.pos.z,tz,Math.min(1,dt*2.4));e.pos.y=lerp(e.pos.y,gy+10+Math.sin(F.t*2)*.9,Math.min(1,dt*2.2));
    e.m.g.rotation.y=Math.atan2(dir.x,dir.z);if(Math.random()<.7)FL.emit(V3(e.pos.x,e.pos.y,e.pos.z),{n:1,c0:0xffd060,c1:0xff4010,s0:.4,s1:.04,life:.5,speed:1});
    F.c-=dt;if(F.c<=0&&e.pos.y>gy+6){F.c=rage||e.lb?.85:1.15;F.n++;const r=F.n%4;if(r===1)xmSky(e,rage?10:7,0xff7a2a,'FIRE RAIN','#ff9a4a',2.6,18);else if(r===3)xmMeteor(e);else bolts(rage?5:4)}
    if(F.t>F.dur){a.fly=null;const p=P.pos.clone();p.y=groundAt(p.x,p.z);xmName(e,'DIVE','#ff9a4a');telegraph(p,5,.8,0xff6a1a,()=>{if(e.dead)return;e.pos.set(clamp(p.x,B.x0+2,B.x1-2),p.y,clamp(p.z,B.z0+2,B.z1-2));if(e.m.broom)e.m.broom.visible=false;fireBurst(V3(p.x,p.y+.5,p.z),5,true);ring(p,0xff6a1a,1,10,.45);SM.emit(V3(p.x,p.y+1,p.z),{n:30,c0:0x140604,c1:0x000000,s0:2,s1:6,life:1.2,a:.7,speed:7});sx('impact',.8);P.shake=Math.max(P.shake,.9);x5Punch(9,.3);if(playerIn(p,5.2,4))damagePlayer(xd(32))});e.busy=1;a.fl=rage?rand(10,13):rand(13,17)}return}
  e.pos.y=lerp(e.pos.y,gy,Math.min(1,dt*8));if(e.pos.y<gy+.4&&e.m.broom&&e.m.broom.visible)e.m.broom.visible=false;if(e.busy>0)return;e.m.g.rotation.y=Math.atan2(dir.x,dir.z);
  if(a.fl<=0&&!e.invuln){a.fl=99;a.fly={t:0,ang:Math.atan2(e.pos.x-P.pos.x,e.pos.z-P.pos.z),dir:Math.random()<.5?-1:1,c:1.1,n:0,dur:rage?9:7};if(e.m.broom)e.m.broom.visible=true;xmName(e,'BROOM','#ff9a4a');sx('wind',.6,null,{rate:1.4});flash(eCenter(e),0xff9a4a,10);if(Math.random()<.5)after(1.5,()=>x5Say('Kaen','kx_03',1));return}
  if(a.cp<=0&&performance.now()-XO.lastT<220){a.cp=1.8;xmFireOrb(e,dir,25,xd(14),.36);xmName(e,'MIRRORED','#ff9a4a');xmFs(.4,1.6);return}
  if((rage||e.lb)&&a.a6<=0){a.a6=e.lb?6:9;e.busy=.9;xmSky(e,e.lb?11:8,0xff5a1a,'FIRESTORM','#ff7a3a',2.7,20);return}
  if(a.a5<=0){a.a5=rage?4.8:6.5;e.busy=.7;xmMeteor(e);return}
  if(a.a4<=0&&d>5){a.a4=rage?3:4.2;e.busy=.6;xmFireball(e);return}
  if(a.a3<=0&&d<9){a.a3=rage?4.2:6;e.busy=.85;xmNova(e);return}
  if(a.a2<=0&&(d<6||Math.random()<.5)){a.a2=rage?2.2:3.4;xmBlink(e);a.a1=Math.min(a.a1,.25);return}
  if(a.a1<=0){a.a1=e.lb?.55:rage?.75:1.05;a.n++;if(a.n%4===3){e.busy=.45;xmFireball(e)}else bolts(e.lb?5:rage?4:3)}};
/* her nova is fire too */
xmNova=function(e){const p=e.pos.clone();p.y=groundAt(p.x,p.z);xmName(e,'FIRE NOVA','#ff9a4a');telegraph(p,8,.75,0xff6a1a,()=>{if(e.dead)return;fireBurst(headOf(p,.6),8,true);ring(p,0xff6a1a,1,8,.4);SM.emit(headOf(p,1),{n:20,c0:0x140604,c1:0,s0:1.5,s1:4,life:1,a:.6,speed:6});sx('impact',.6,null,{rate:1.1});if(playerIn(p,8.2,4))damagePlayer(xd(26))})};

/* ---------- the mirror arrives with a fire wand ---------- */
{const _g=xoMirrorGo;xoMirrorGo=function(p){const e=_g(p);try{const S=XOSTR();e.maxhp=Math.round(6400*(1+.2*(Math.max(1,P.level)-1))*({easy:1.05,medium:1.2,hard:1.4}[DIFF]||1.2));e.hp=e.maxhp;e.hpFloor=.12;
      e.m.g.traverse(o=>{if(o.isMesh&&o.material&&o.material.isMeshBasicMaterial&&o.material.color&&o.material.color.getHex()===0x9dffb0&&!e.m.wandTip){o.material=o.material.clone();o.material.color.setHex(0xff7a2a);e.m.wandTip=o;o.traverse(q=>{if(q.isSprite&&q.material){q.material=q.material.clone();q.material.color&&q.material.color.setHex(0xff7a2a)}})}});
      kNoSpell(e.m.actor)}catch(x){console.warn(x)}XO.fc=null;XO.sh=null;XO.bk={};XO.skyT=6;return e}}

/* ---------- shields while she is in limit breaker ---------- */
function xmShieldUp(m){if(XO.sh||m.dead)return;const g=new THREE.Mesh(new THREE.SphereGeometry(1.6,24,16),new THREE.MeshBasicMaterial({color:0xffb030,transparent:true,opacity:.28,blending:THREE.AdditiveBlending,depthWrite:false,side:THREE.DoubleSide}));const g2=new THREE.Mesh(new THREE.SphereGeometry(1.75,20,14),new THREE.MeshBasicMaterial({color:0x000000,transparent:true,opacity:.35,depthWrite:false,side:THREE.BackSide}));g.add(g2);g.position.y=1.05;m.m.g.add(g);
  XO.sh={g,hp:m.maxhp*({easy:.05,medium:.065,hard:.08}[DIFF]||.065),t:0};XO.sh.max=XO.sh.hp;sx('shield',.8);flash(eCenter(m),0xffb030,10);floatText(headOf(m.pos,2.6),'SHIELD','#ffc060');if(!XO.bk.sh){XO.bk.sh=1;after(1.2,()=>x5Say('Kaen','kx_02',1))}}
function xmShieldDown(m){const S=XO.sh;if(!S)return;XO.sh=null;m.m.g.remove(S.g);S.g.geometry.dispose();sx('shbreak',.9);flash(eCenter(m),0xffffff,16);SP.emit(eCenter(m),{n:80,c0:0xffffff,c1:0xffb030,speed:12,life:.8,s0:.5,s1:.05});x5Punch(8,.3);floatText(headOf(m.pos,2.6),'SHIELD BROKEN','#ffffff')}
{const _de=damageEnemy;damageEnemy=function(e,amt){if(e&&e===XO.mir&&XO.sh&&typeof amt==='number'&&amt>0){const S=XO.sh;const take=Math.min(S.hp,amt);S.hp-=take;S.g.material.opacity=.12+.3*(S.hp/S.max);if(S.hp<=0)xmShieldDown(e);const rest=amt-take;if(rest<=0){floatText(headOf(e.pos,2.2),'BLOCKED','#ffc060');return}const a=[...arguments];a[1]=rest;return _de.apply(this,a)}return _de.apply(this,arguments)}}

/* ---------- limit breakers: big, loud, with a scream ---------- */
function lbBoom(at,col,big){const c=at.clone();flash(c,col,big?40:26);x5Impact(big?170:120,big?.22:.14);x5Punch(big?22:14,big?.7:.45);P.shake=Math.max(P.shake,big?1.8:1.2);ring(V3(c.x,groundAt(c.x,c.z)+.1,c.z),col,1,big?22:16,.7);ring(V3(c.x,groundAt(c.x,c.z)+.1,c.z),0xffffff,.5,big?14:10,.45);
  SP.emit(c,{n:big?320:200,c0:0xffffff,c1:col,speed:big?22:16,life:1.2,s0:.8,s1:.06});sx('skyshatter',1,null,{rate:.6});sx('ktf',1,null,{rate:.7});sx('impact',1,null,{rate:.5});try{sfx.boom&&sfx.boom()}catch(x){}after(.12,()=>{try{sfx.boom&&sfx.boom()}catch(x){}sx('riser',.6,null,{rate:1.6,cut:.6})});vib([90,40,200])}
{const _lb=witchLimitBreak;witchLimitBreak=function(story,anger){const r=_lb.apply(this,arguments);if(!story){try{lbBoom(headOf(P.pos,1.2),0xffc040,true);if(HERO.g==='f'&&!XO.quiet)x5Say('@','mw_33',2);FIN.boost=Math.max(FIN.boost||0,1);for(let i=0;i<6;i++)after(i*.08,()=>lightning(V3(P.pos.x,P.pos.y+3,P.pos.z),V3(P.pos.x+rand(-3,3),P.pos.y+rand(0,1.5),P.pos.z+rand(-3,3)),0xffd060))}catch(x){}}return r}}

/* she breaks her limit when she is about to fall: scream, blast, 40% back, shields */
function xmGoLB(m){XO.bk.lb=1;m.busy=1.6;m.ai.fly=null;if(m.m.broom)m.m.broom.visible=false;m.pos.y=groundAt(m.pos.x,m.pos.z);try{m.m.actor.setBase('Idle_Loop',.1);m.m.actor.fire('Spell_Simple_Shoot',.2)}catch(x){}
  x5Say('???','mm_08',2);xmDarkOn(m);lbBoom(eCenter(m),0xffb030,true);x5Banner('LIMIT BREAKER','SHE WILL NOT FALL','#ffd060',1.6,'#000');SM.emit(eCenter(m),{n:90,c0:0x050403,c1:0,s0:2,s1:9,life:2,a:.9,speed:10});
  const v=V3(P.pos.x-m.pos.x,0,P.pos.z-m.pos.z);if(v.lengthSq()<.01)v.set(1,0,0);v.normalize();if(P.pos.distanceTo(m.pos)<10){P.pos.x+=v.x*5;P.pos.z+=v.z*5;damagePlayer(xd(20))}
  const h0=m.hp,gain=m.maxhp*.4;addFx(null,1.6,(f,k)=>{if(m.dead)return;m.hp=Math.min(m.maxhp,h0+gain*k);},()=>{floatText(headOf(m.pos,2.8),'+40%','#ffd060',true)});
  m.hpFloor=.04;after(.8,()=>xmShieldUp(m));XO.shT=9;XO.skyT=2;
  after(2.2,()=>{if(XO.ph===2)x5Say('Kaen','kw_21',1)});after(5.4,()=>{if(XO.ph!==2||!P.alive)return;P.lbT=0;try{witchLimitBreak(false)}catch(x){}P.lbT=Math.max(P.lbT||0,45);P.lbRamp=1;after(2.6,()=>{if(XO.ph===2)x5Say('@','mw_34',1)})})}

/* ---------- the last push: a small prompt, mash space; lose and it costs you 1000 ---------- */
function xmFcUI(){let d=document.getElementById('xmFc');if(d)return d;d=document.createElement('div');d.id='xmFc';d.style.cssText="position:fixed;left:50%;bottom:22%;transform:translateX(-50%);z-index:40;display:none;text-align:center;font-family:'Bangers',Impact,sans-serif;color:#fff;pointer-events:none;text-shadow:2px 2px 0 #000;letter-spacing:.1em;font-size:clamp(14px,1.8vw,20px)";
  d.innerHTML='<div>Mash SPACE</div><div style="width:min(46vw,260px);height:8px;margin:6px auto 0;border:2px solid #fff;background:rgba(0,0,0,.55)"><i style="display:block;height:100%;width:50%;background:linear-gradient(90deg,#ffd060,#ff6a1a)"></i></div>';document.body.appendChild(d);
  window.addEventListener('keydown',ev=>{if(!XO.fc)return;if(ev.code==='Space'){ev.preventDefault();ev.stopImmediatePropagation();if(!ev.repeat)xmFcPush()}},true);
  d.addEventListener('pointerdown',ev=>{if(XO.fc){ev.preventDefault();xmFcPush()}});return d}
function xmFcPush(){const C=XO.fc;if(!C)return;C.k+=({easy:.06,medium:.05,hard:.045}[DIFF]||.05);x5Punch(2,.08)}
{const _tc=tryCast;tryCast=function(){if(XO.fc)return;return _tc.apply(this,arguments)}}
function xmFcStart(m){const mp=P.pos.clone();mp.y=groundAt(mp.x,mp.z);P.flying=false;P.vy=0;m.ai.fly=null;if(m.m.broom)m.m.broom.visible=false;m.pos.y=groundAt(m.pos.x,m.pos.z);m.invuln=true;m.busy=99;for(const q of eProjs)scene.remove(q.s);eProjs.length=0;
  const mk=(col,op,bl)=>{const b=new THREE.Mesh(new THREE.CylinderGeometry(.36,.36,1,14,1,true),new THREE.MeshBasicMaterial({color:col,transparent:true,opacity:op,blending:bl,depthWrite:false,side:THREE.DoubleSide}));scene.add(b);return b};
  const C={t:0,k:.45,m,mp,b:[mk(0xffa030,.9,THREE.AdditiveBlending),mk(0xff5010,.85,THREE.AdditiveBlending),mk(0x000000,.45,THREE.NormalBlending)],orb:glowSprite(0xffd090,6,1),skyT:1.6};scene.add(C.orb);XO.fc=C;
  P.heroAnim='Spell_Simple_Idle_Loop';try{m.m.actor.setBase('Idle_Loop',.1);m.m.actor.fire('Spell_Simple_Shoot',.2)}catch(x){}xmFcUI().style.display='block';sx('dcharge',1);xmFs(.8,.8);x5Impact(80,.08);x5Say('@','mw_35',1)}
function xmFcEnd(win){const C=XO.fc;if(!C)return;XO.fc=null;xmFcUI().style.display='none';for(const b of C.b){scene.remove(b);b.geometry.dispose()}scene.remove(C.orb);P.heroAnim=null;const m=C.m;if(!m||m.dead)return;
  if(win){lbBoom(eCenter(m),0xffa030,true);m.hp=Math.max(1,m.maxhp*.02);XO.bk.won=1;after(.6,xoEnd);return}
  m.invuln=false;m.busy=.6;flash(headOf(P.pos,1),0xff5010,30);fireBurst(headOf(P.pos,.6),4,true);P.shake=1.6;x5Impact(120,.14);sx('impact',1,null,{rate:.6});x5Say('???','mm_12',1);
  const was=P.invuln;P.invuln=0;const dmg=1000;P.hp-=dmg;floatText(headOf(P.pos,2.2),'-'+dmg,'#ff4020',true);if(P.hp<=0){P.hp=1;damagePlayer(1e6)}P.invuln=Math.max(.6,0);
  m.hp=Math.min(m.maxhp,m.hp+m.maxhp*.08);XO.fcT=10}
function xmFcTick(dt){const C=XO.fc,m=C.m;if(!m||m.dead||!P.alive){xmFcEnd(false);return}C.t+=dt;C.k-=dt*({easy:.13,medium:.17,hard:.2}[DIFF]||.17);C.skyT-=dt;
  /* she can still hit you while you push */
  if(C.skyT<=0){C.skyT=2.2;xmSky(m,3,0xff5a1a,'','#ff7a3a',2.2,14)}
  P.pos.x=C.mp.x;P.pos.z=C.mp.z;P.pos.y=C.mp.y;P.vy=0;P.face=Math.atan2(m.pos.x-P.pos.x,m.pos.z-P.pos.z);m.m.g.rotation.y=P.face+Math.PI;
  const A=headOf(P.pos,1.3),Bp=xmTip(m),M=A.clone().lerp(Bp,clamp(C.k,.05,.95)),up=V3(0,1,0),put=(b,a,c,w0)=>{const v=c.clone().sub(a),L=v.length()||.01;b.position.copy(a).addScaledVector(v,.5);b.quaternion.setFromUnitVectors(up,v.normalize());const w=w0*(1+Math.sin(time*40)*.15);b.scale.set(w,L,w)};
  put(C.b[0],A,M,1);put(C.b[1],Bp,M,1);put(C.b[2],Bp,M,1.25);C.orb.position.copy(M);C.orb.scale.setScalar(5+Math.sin(time*30)*1.2);if(Math.random()<.9)FL.emit(M,{n:2,c0:0xffffff,c1:Math.random()<.5?0xffa030:0xff4010,s0:.6,s1:.05,life:.4,speed:8});if(Math.random()<.4)SM.emit(Bp.clone().lerp(M,Math.random()),{c0:0x140604,c1:0,s0:.4,s1:1.2,life:.5,a:.5});P.shake=Math.max(P.shake,.35);
  const bar=xmFcUI().querySelector('i');bar.style.width=(C.k*100)+'%';if(C.k>=1)xmFcEnd(true);else if(C.k<=0||C.t>8)xmFcEnd(false)}

/* ---------- in-fight lines ---------- */
function xmBarks(m,dt){const B=XO.bk,r=m.hp/m.maxhp;const say=(k,who,key)=>{if(B[k])return;B[k]=1;x5Say(who,key,1)};
  if(XO.t>6)say('a','???','mm_02');if(XO.t>14)say('lz1','Lyra','lz_01');if(r<.85)say('b','???','mm_09');if(r<.75)say('k1','Kaen','kx_01');if(r<.65)say('c','???','mm_03');if(r<.58&&!B.e1){B.e1=1;x5Say('@','mw_27',1);after(6.8,()=>{if(XO.ph===2)x5Say('???','mm_07',1)})}
  if(r<.48)say('d','???','mm_10');if(r<.4)say('lz2','Lyra','lz_02');if(r<.34)say('f','???','mm_11');if(r<.26)say('g','@','mw_36');if(r<.2)say('h','???','mm_04');
  if(B.lb&&P.lbT>0){B.wt=(B.wt==null?7:B.wt)-dt;if(B.wt<=0&&!CS.active){B.wt=rand(10,14);const w=['wh_02','wh_03','wh_04'][(B.wn=(B.wn||0)+1)%3];x5Say('Whispers',w,1);if(Math.random()<.6)after(3.6,()=>{if(XO.ph===2)x5Say('@','mw_32',1)})}}}

/* ---------- the whole fight, no breaks ---------- */
xmSagaTick=function(dt){const m=XO.mir;if(!m||m.dead)return;if(XO.fc){xmFcTick(dt);return}const r=m.hp/m.maxhp,B=XO.bk||(XO.bk={});XO.fcT=(XO.fcT||0)-dt;
  if(m.lb){const c=eCenter(m);for(let i=0;i<2;i++)SM.emit(V3(c.x+rand(-.7,.7),c.y+rand(-1.1,1.2),c.z+rand(-.7,.7)),{c0:0x050403,c1:0,s0:1,s1:3.2,life:1,a:.8,up:2.6});if(Math.random()<.6)FL.emit(V3(c.x+rand(-.4,.4),c.y-1,c.z+rand(-.4,.4)),{n:1,c0:0xffd060,c1:0x2a1400,s0:.7,s1:.05,life:.7,up:3.2});if(Math.random()<dt*2.5)lightning(V3(c.x,c.y+1.6,c.z),V3(c.x+rand(-1.6,1.6),c.y+rand(-1,.6),c.z+rand(-1.6,1.6)),0xffd060);if(m.m.aura)m.m.aura.material.opacity=.38+Math.sin(time*7)*.08;if(m.m.fl)for(const q of m.m.fl)q.material.uniforms.uT.value=time;
    XO.shT=(XO.shT||9)-dt;if(!XO.sh&&XO.shT<=0&&!CS.active){XO.shT=rand(8,11);xmShieldUp(m)}}
  if(XO.sh)XO.sh.g.rotation.y+=dt*.8;
  if(!CS.active&&P.alive&&!m.invuln){XO.skyT=(XO.skyT==null?6:XO.skyT)-dt;if(XO.skyT<=0){XO.skyT=m.lb?rand(3,4):r<.5?rand(4.2,5.4):rand(5.5,7);XO.skyN=(XO.skyN||0)+1;const q=XO.skyN%3;if(q===0)xmMeteor(m);else xmSky(m,q===1?(m.lb?9:6):(m.lb?7:5),0xff6a1a,q===1?'FIRE RAIN':'BLACK FIRE','#ff9a4a',2.6,m.lb?20:16)}}
  xmBarks(m,dt);
  if(!B.lb){m.hpFloor=.12;if(!CS.active&&r<=.125){xmGoLB(m);return}}else{m.hpFloor=.04}
  if(B.lb&&!CS.active&&P.alive&&!m.invuln&&XO.fcT<=0&&r<=.045)xmFcStart(m)};
/* the old mid-fight stops are gone for good */
xmDarkLB=xmEven=xmKaenIn=xmKaenDown=xmUltra=xmCalm=function(){};xmTube=function(){};xmClash=function(){};
{const cl=()=>{if(XO.fc){const C=XO.fc;XO.fc=null;for(const b of C.b)scene.remove(b);scene.remove(C.orb)}try{xmFcUI().style.display='none'}catch(x){}XO.sh=null;XO.bk={};XO.fcT=0};const _or=x5OReset;x5OReset=function(){cl();return _or.apply(this,arguments)};const _rv=x5ORevive;x5ORevive=function(){cl();return _rv.apply(this,arguments)}}

/* voice pack 24: in-fight lines */
const VOPK3={idx:{"mw_33":[0,16135],"kx_01":[16135,21777],"kx_02":[37912,30137],"kx_03":[68049,24912],"lz_01":[92961,26584],"lz_02":[119545,21568],"mm_09":[141113,25539],"mm_10":[166652,17807],"mm_11":[184459,28883],"mw_34":[213342,23031],"mw_35":[236373,23867],"mm_12":[260240,11537],"mw_36":[271777,18643]},p:null};
{const _vr=voRaw;voRaw=function(k){const ix=VOPK3.idx[k];if(!ix||VO.raw[k])return _vr(k);if(!VOPK3.p)VOPK3.p=fetch('assets/vo24.mp3').then(r=>r.ok?r.arrayBuffer():null).catch(()=>null);
  VO.raw[k]=VOPK3.p.then(b=>b&&b.byteLength>=ix[0]+ix[1]?b.slice(ix[0],ix[0]+ix[1]):fetch('assets/'+k+'.mp3').then(r=>r.ok?r.arrayBuffer():null).catch(()=>null));return VO.raw[k]}}
/* no black and white in the last two scenes */
{const _g=x5Grey;x5Grey=function(on){if(on&&(XO.ph===1.8||XO.ph===3||XO.ph===2))return _g(0);return _g.apply(this,arguments)}}

/* ---------- 1) the crypt: everything heavy is built while the screen is black, and the cinematic starts on its own ---------- */
{const _vs=x5VS;x5VS=function(a,b){if(a==='MAËLLE'&&b==='MAËLLE')return;return _vs.apply(this,arguments)}}
{const _en=x5Enter;x5Enter=function(s){const r=_en.apply(this,arguments);if(CH2.st===20&&s>=X5CP[4]-1&&!XC.ph){try{XC.warm=1;xcStands();if(!XC.fig){const F=xcFig(1);F.g.position.copy(chairP());F.set('king');F.cyc=0;for(let k=0;k<30;k++)F.tick(.05)}
      voPrefetch(['cr_01','cr_02'].map(k=>({who:'The Crown',text:XL3[k]})).concat([{who:'@',text:XL3.mw_10},{who:'Kaen',text:XL3.kw_12},{who:'Lyra',text:XL3.lw_10}]));renderer.compile(scene,camera)}catch(x){}
    after(.45,()=>{if(X5.in&&CH2.st===20&&!XC.ph&&!CS.active){P.pos.copy(uP(0,223));P.pos.y=uFloor(223);xcIntro()}})}return r}}
{const _d=x5Descend;x5Descend=function(){if(CH2.st===20){const f=fadeEl.style;const r=_d.apply(this,arguments);f.transition='opacity .3s';return r}return _d.apply(this,arguments)}}

/* ---------- 2) the buttons under the map ---------- */
(function(){const st=document.createElement('style');st.textContent=`#mapWrap .row{display:flex;flex-wrap:wrap;justify-content:flex-end;gap:6px;width:118px}
#mapWrap .row .mini{height:28px;min-width:28px;padding:0 10px;font-size:11px;letter-spacing:.03em;white-space:nowrap;display:inline-flex;align-items:center;justify-content:center;gap:5px;border-radius:14px;background:rgba(14,10,30,.82);box-shadow:inset 0 0 0 1px rgba(232,223,204,.18),0 2px 6px rgba(0,0,0,.35)}
#mapWrap .row .mini:hover{background:rgba(40,28,70,.9)}#mapWrap .row .mini .ic{color:#f2a541;font-size:12px}#mapWrap .row .mini kbd{font:inherit;font-size:9px;opacity:.6;padding:1px 4px;border-radius:4px;background:rgba(255,255,255,.1)}
#spellBtn{flex:1}#autoBtn{order:3;width:100%}#autoBtn .dot{width:7px;height:7px;border-radius:50%;background:#6a6478;box-shadow:0 0 0 2px rgba(255,255,255,.08)}#autoBtn.on .dot{background:#7dff9a;box-shadow:0 0 8px #7dff9a}#autoBtn em{font-style:normal;opacity:.65;font-size:10px}#autoBtn.on{background:rgba(40,70,48,.85)}`;document.head.appendChild(st)})();
syncAuto=function(){const b=$('autoBtn');if(!b)return;b.classList.toggle('on',autoBolt);b.innerHTML='<span class="dot"></span>Autobolt<em>'+(autoBolt?'ON':'OFF')+'</em>'};
{const dress=()=>{const b=document.getElementById('spellBtn');if(b&&!b._d){b._d=1;b.innerHTML='<span class="ic">✦</span>Spells'+(typeof isTouch!=='undefined'&&isTouch?'':'<kbd>K</kbd>')}const a=document.getElementById('autoBtn');if(a&&!a.querySelector('.dot'))try{syncAuto()}catch(x){}};setInterval(dress,800);setTimeout(dress,50)}

/* ---------- 3) chapter cards with a small picture each, and a second Hollow Crown entry that starts outside ---------- */
CHAPTERS.push({id:'crown2',n:'XVI · II',title:'The Hollow Crown: The Square',desc:'Straight out into the square. Every face it ever wore, then Kaen, then you.'});
{const _cb=chapBoss;chapBoss=function(c){if(c.id==='crown2')return null;return _cb(c)}}
{const _ac=applyChapter;applyChapter=function(id){if(id!=='crown2')return _ac.apply(this,arguments);_ac.call(this,'crown');CH2.st=21;ch2Save();XO.form=0;XO.ph=0;XO.rt=1.2;X5.intro=0;x5AbbeyShow(true);
  P.pos.set(-122,0,-9872);P.face=-Math.PI/2;yaw=Math.PI/2;NZ.cp.set(-122,0,-9872);SPAWN.copy(NZ.cp);if(KFW.a)KFW.a.g.position.set(-120.6,0,-9870.4);lyraPlace(-120.6,-9873.6,-Math.PI/2);
  after(.8,()=>toast('The Crown is waiting in the square outside the Abbey.','Chapter XVI · II: The Square',true))}}
const CHART={kitsune:['#bfe6ff','#2a3a5a','fox'],beast:['#ff6a4a','#3a0c08','flame'],giant:['#9fe3ff','#0c2234','flake'],catdemon:['#6ab8ff','#0a1a3a','eye'],slug:['#ff5a5a','#300810','drop'],bilel:['#ffd060','#2a1c04','star'],
  queen:['#6affd6','#062a24','wave'],illusion:['#c9a6ff','#1c0e34','sword'],crossing:['#8ab8ff','#0a1630','boat'],london:['#ffb070','#2a1406','tower'],escape:['#c0c8ff','#121630','wing'],silver:['#e0e8ff','#141a26','moon'],
  smoke:['#9dffb0','#08200e','swirl'],under:['#60ff80','#06180a','arch'],crown:['#f2a541','#2a1604','crown'],crown2:['#ff9a4a','#2a0e04','crown']};
const CHGLY={fox:'<path d="M6 8l8 6h12l8-6-3 14-11 10L9 22z" /><circle cx="15" cy="20" r="1.6" fill="#000"/><circle cx="25" cy="20" r="1.6" fill="#000"/>',
  flame:'<path d="M20 4c3 7 10 10 10 19a10 10 0 0 1-20 0c0-5 3-7 4-11 2 3 2 5 4 6 1-5-1-9 2-14z"/>',flake:'<path d="M19 4h2v32h-2zM4 19h32v2H4zM8.3 9.7l1.4-1.4 22 22-1.4 1.4zM30.3 8.3l1.4 1.4-22 22-1.4-1.4z"/>',
  eye:'<path d="M4 20c6-9 26-9 32 0-6 9-26 9-32 0z"/><path d="M19 12h2v16h-2z" fill="#000"/>',drop:'<path d="M20 5c6 9 11 14 11 20a11 11 0 0 1-22 0c0-6 5-11 11-20z"/>',
  star:'<path d="M20 4l4 11 12 1-9 7 3 12-10-7-10 7 3-12-9-7 12-1z"/>',wave:'<path d="M4 24c4-6 8-6 12 0s8 6 12 0 6-5 8-3v11H4z"/><path d="M12 6l3 6 5-6 5 6 3-6v9H12z"/>',
  sword:'<path d="M19 3h2v24h-2z"/><path d="M13 27h14v2H13z"/><path d="M19 29h2v7h-2z"/>',boat:'<path d="M5 24h30l-5 8H10z"/><path d="M19 6h2v18h-2z"/><path d="M21 8l10 12H21z"/>',
  tower:'<path d="M16 34V12l4-8 4 8v22z"/><circle cx="20" cy="17" r="3" fill="#000"/>',wing:'<path d="M20 22C14 10 6 10 3 12c5 1 7 5 8 9-3-1-5 0-6 2 6 0 10 2 15 7 5-5 9-7 15-7-1-2-3-3-6-2 1-4 3-8 8-9-3-2-11-2-17 10z"/>',
  moon:'<path d="M26 6a14 14 0 1 0 8 22A12 12 0 0 1 26 6z"/>',swirl:'<path d="M20 6a14 14 0 1 1-13 18c2 3 6 5 10 4a8 8 0 1 0-6-12c2-1 5-1 7 1a5 5 0 1 1-6 5"/>',
  arch:'<path d="M8 34V16a12 12 0 0 1 24 0v18h-6V18a6 6 0 0 0-12 0v16z"/>',crown:'<path d="M5 28L7 12l8 8 5-12 5 12 8-8 2 16z"/><path d="M6 30h28v4H6z"/>'};
(function(){const st=document.createElement('style');st.textContent=`.chap{flex-direction:row!important;align-items:flex-start;gap:12px!important;padding:12px!important}
.chap .th{flex:0 0 58px;height:58px;border-radius:12px;position:relative;display:flex;align-items:center;justify-content:center;box-shadow:inset 0 0 0 1px rgba(255,255,255,.14),0 4px 12px rgba(0,0,0,.35);overflow:hidden}
.chap .th svg{width:34px;height:34px;filter:drop-shadow(0 0 6px currentColor)}.chap .th i{position:absolute;right:4px;bottom:3px;font-style:normal;font-size:9px;letter-spacing:.06em;color:rgba(255,255,255,.75);font-family:'Pirata One',Georgia,serif}
.chap .th u{position:absolute;left:4px;top:4px;width:14px;height:14px;border-radius:50%;background:#2fbf71;color:#fff;font-size:9px;line-height:14px;text-align:center;text-decoration:none;box-shadow:0 0 6px rgba(47,191,113,.7)}
.chap .tx{display:flex;flex-direction:column;align-items:flex-start;gap:3px;min-width:0}.chap:hover .th{transform:scale(1.04)}.chap .th{transition:transform .15s}`;document.head.appendChild(st)})();
{const _rc=renderChapters;renderChapters=function(){_rc();const list=$('chapList');if(!list)return;try{const i1=chapIndexOf('crown2'),el=list.children[i1];if(el){const done=CH2.st>=23,cur=started&&CH2.st>=21&&CH2.st<23;el.className='chap'+(done?' done':'')+(cur?' cur':'')}
    const ec=list.children[chapIndexOf('crown')];if(ec&&started&&CH2.st>=21&&CH2.st<23)ec.className=ec.className.replace(' cur','')}catch(x){}
  [...list.children].forEach((el,i)=>{const c=CHAPTERS[i];if(!c||el.querySelector('.th'))return;const A=CHART[c.id]||['#c9a6ff','#1a1030','star'];const th=document.createElement('span');th.className='th';th.style.background=`radial-gradient(circle at 50% 38%,${A[0]}55,${A[1]} 72%)`;th.style.color=A[0];
    th.innerHTML=`<svg viewBox="0 0 40 40" fill="${A[0]}">${CHGLY[A[2]]||CHGLY.star}</svg><i>${c.n}</i>`+(/\bdone\b/.test(el.className)?'<u>✓</u>':'');const tx=document.createElement('span');tx.className='tx';while(el.firstChild)tx.appendChild(el.firstChild);el.appendChild(th);el.appendChild(tx)})}}
