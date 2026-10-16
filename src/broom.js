
/* ---------- broom v3: Space rises, C / Drop button drops you, Space again recovers while broom time is left; open-world broom stones ---------- */
const BRM={drop:false,left:0,cap:0,bonus:0,items:[],spawnT:3,seenQ:-1,seenOQ:-1,hudKey:'',hintT:0,wasFly:false};
let curProj=null;
function brStones(){if(MODE!=='open')return[];OWS.stats=OWS.stats||{};if(!Array.isArray(OWS.stats.brooms))OWS.stats.brooms=[];return OWS.stats.brooms}
/* open world: 30 s base flight */
{const _fm=flyMax;flyMax=function(){return MODE==='open'?30:_fm()}}
function brHint(){const h=$('brHint');if(!h)return;h.classList.add('on');BRM.hintT=1.2}
{const _dj=doJump;doJump=function(){if(!started||paused||!P.alive||CS.active)return;
  /* a new Space press while flying drops you; the next press catches the broom again with whatever time is left */
  if(P.flying){brDrop();return}
  /* falling after a drop (or gliding) with broom time left: Space puts you back on the broom */
  if(!P.onGround&&!P.swim&&BRM.left>.4){P.flying=true;P.glide=false;P.flyT=BRM.left;BRM.left=0;BRM.drop=false;P.vy=Math.max(P.vy,3);sfx.fly();runeFlash(P.pos,0xb58cff,3,.5);return}
  const was=P.flying;_dj.apply(this,arguments);
  if(!was&&P.flying){BRM.bonus=0;BRM.drop=false;BRM.left=0;const S=brStones();if(S.length){BRM.bonus=15*S.length;P.flyT+=BRM.bonus;let gone=0;for(let i=S.length-1;i>=0;i--){S[i]--;if(S[i]<=0){S.splice(i,1);gone++}}
      floatText(V3(P.pos.x,P.pos.y+2.6,P.pos.z),`+${BRM.bonus}s broom`,'#ffc860');if(gone)after(1.2,()=>toast(gone>1?`${gone} broom stones crumbled to dust.`:'A broom stone crumbled to dust.','Broom stone'));owSave()}
    BRM.cap=P.flyT;brHint()}}}
function brDrop(){if(!started||CS.active||!P.alive)return false;if(P.flying){BRM.left=Math.max(0,P.flyT);P.flying=false}else if(!(P.glide&&!P.onGround))return false;
  P.glide=false;BRM.drop=true;P.vy=Math.min(P.vy,-8);noise(.35,.07,600,'lowpass');SP.emit(V3(P.pos.x,P.pos.y+1.2,P.pos.z),{n:16,c0:0xe8d8ff,c1:0x5a2ad0,speed:3,life:.5});return true}
/* keyboard: C drops while in the air (compel stays on C on foot) */
addEventListener('keydown',e=>{if(e.code==='KeyC'&&!e.repeat&&(P.flying||(P.glide&&!P.onGround))&&started&&!CS.active){if(brDrop()){keys[e.code]=true;e.preventDefault();e.stopImmediatePropagation()}}},true);
/* HUD: the existing fly meter shows the time; a short hint under it fades after 1.2 s; broom stones as small diamonds */
{const st=document.createElement('style');st.textContent=`
#brHint{position:absolute;left:50%;bottom:calc(96px + env(safe-area-inset-bottom,0px));transform:translate(-50%,6px);display:flex;gap:14px;font:500 12px Outfit,system-ui,sans-serif;color:#efe4cf;text-shadow:0 1px 6px rgba(0,0,0,.8);pointer-events:none;opacity:0;transition:opacity .45s,transform .45s;z-index:6;white-space:nowrap}
#brHint.on{opacity:1;transform:translate(-50%,0)}
#brHint kbd{display:inline-block;padding:1px 6px;margin-right:5px;border-radius:4px;background:rgba(20,14,40,.75);box-shadow:inset 0 0 0 1px rgba(242,193,96,.35);font:700 10.5px Outfit,system-ui,sans-serif;color:#ffe2a8}
.touch #brHint{bottom:auto;top:calc(42px + env(safe-area-inset-top,0px))}
.touch #brHint .kb{display:none}body:not(.touch) #brHint .tc{display:none}
#brGems{position:absolute;left:calc(50% + 90px);bottom:calc(81px + env(safe-area-inset-bottom,0px));display:flex;gap:4px;pointer-events:none;z-index:6}
#brGems i{width:8px;height:12px;clip-path:polygon(50% 0,100% 50%,50% 100%,0 50%);background:linear-gradient(#ffe2a0,#ff9a20);filter:drop-shadow(0 0 4px #ffb040)}
.touch #brGems{left:auto;right:calc(14px + env(safe-area-inset-right,0px));bottom:auto;top:calc(150px + env(safe-area-inset-top,0px))}
#diveBtn{--c:#ffd8b0;width:58px;height:58px;display:none;background:radial-gradient(circle at 50% 32%,rgba(64,48,120,.95),rgba(18,15,40,.95))}
#diveBtn.show{display:flex}
#diveBtn .k{position:absolute;right:4px;bottom:2px;font:700 10px Outfit,system-ui,sans-serif;color:#fff;opacity:.7}
.touch #diveBtn .k{display:none}
`;document.head.appendChild(st)}
function brHudInit(){if($('brHint'))return;const h=document.createElement('div');h.id='brHint';
  h.innerHTML='<span class="kb"><kbd>Space</kbd>hold to rise</span><span class="kb"><kbd>Space</kbd>tap to drop, tap again to catch the broom</span><span class="tc">Hold jump to rise · tap jump to drop, tap again to catch the broom</span>';$('hud').appendChild(h);
  const g=document.createElement('div');g.id='brGems';$('hud').appendChild(g);
  const d=document.createElement('button');d.id='diveBtn';d.className='spell';d.setAttribute('aria-label','Drop');
  d.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 4v13"/><path d="m6 12 6 6 6-6"/><path d="M5 21h14"/></svg><span class="k">C</span>';
  d.addEventListener('pointerdown',e=>{e.stopPropagation();e.preventDefault();initAudio();brDrop()});
  const mb=$('moveBtns');if(mb)mb.appendChild(d)}
function brHud(dt){const live=started&&P.alive&&!CS.active;
  const db=$('diveBtn');if(db)db.classList.toggle('show',live&&P.flying);
  if(BRM.hintT>0){BRM.hintT-=dt;if(BRM.hintT<=0){const h=$('brHint');if(h)h.classList.remove('on')}}
  const g=$('brGems');if(!g)return;const S=brStones();const key=(live?1:0)+'|'+S.join(',');if(key===BRM.hudKey)return;BRM.hudKey=key;
  g.innerHTML=live?S.map(c=>`<i title="Broom stone · ${c} flights left"></i>`).join(''):''}
/* broom stones: street pickups + quest rewards (open world) */
const BR_MAX=3;
function brGive(why){const S=brStones();if(S.length>=BR_MAX){let mi=0;for(let i=1;i<S.length;i++)if(S[i]<S[mi])mi=i;S[mi]=5}else S.push(5);owSave();BRM.hudKey='';
  toast(`+15 seconds of flight for your next 5 flights.${why?' '+why:''}`,'Broom stone',true);if(!(typeof sfxPlay==='function'&&sfxPlay('bell',.5)))sfx.coin&&sfx.coin();sfx.level&&sfx.level()}
let BR_GEO=null;function brMesh(){if(!BR_GEO)BR_GEO={o:new THREE.OctahedronGeometry(.42,0),t:new THREE.TorusGeometry(.85,.035,6,28),b:new THREE.CylinderGeometry(.22,.22,46,8,1,true)};
  const g=new THREE.Group();const c=new THREE.Mesh(BR_GEO.o,new THREE.MeshStandardMaterial({color:0xffcf70,emissive:0xff9a20,emissiveIntensity:1.5,roughness:.15,metalness:.35}));c.scale.set(1,1.7,1);g.add(c);
  const r=new THREE.Mesh(BR_GEO.t,new THREE.MeshBasicMaterial({color:0xffe2a0,transparent:true,opacity:.8,blending:THREE.AdditiveBlending,depthWrite:false}));r.rotation.x=Math.PI/2;g.add(r);
  const s=glowSprite(0xffb040,3.4,.9);g.add(s);
  const b=new THREE.Mesh(BR_GEO.b,new THREE.MeshBasicMaterial({color:0xffc060,transparent:true,opacity:.18,blending:THREE.AdditiveBlending,depthWrite:false}));b.position.y=23;g.add(b);
  g.userData={c,r};return g}
function brSpawn(){if(typeof cityQuery!=='function')return false;const o={};
  for(let k=0;k<14;k++){const a=Math.random()*TAU,r=rand(80,280);const qx=P.pos.x+Math.sin(a)*r,qz=P.pos.z+Math.cos(a)*r;let best=null;
    cityQuery(qx,qz,45,'e',e=>{if(!best&&e.len>12&&!e.br)best=e});if(!best)continue;distToEdge(best,qx,qz,o);if(!isFinite(o.x))continue;
    const t=gType(o.x,o.z);if(t===2||t===5||t===6||t===7)continue;if(BRM.items.some(it=>Math.hypot(it.x-o.x,it.z-o.z)<120))continue;
    const g=brMesh();const y=groundAt(o.x,o.z);g.position.set(o.x,y+1.3,o.z);scene.add(g);BRM.items.push({g,x:o.x,z:o.z,y,ph:Math.random()*6});return true}return false}
function brTick(dt){if(MODE!=='open'||!started)return;
  /* rewards: every finished quest (and Orson's) gives a broom stone */
  const qn=OWS.qdone?OWS.qdone.length:0;if(BRM.seenQ<0)BRM.seenQ=qn;else if(qn>BRM.seenQ){BRM.seenQ=qn;after(3.2,()=>brGive('A thank-you from Paris.'))}
  if(typeof OQ!=='undefined'){const s=OQ.st|0;if(BRM.seenOQ<0)BRM.seenOQ=s;else if(s!==BRM.seenOQ){if(s===5&&BRM.seenOQ<5)after(3.2,()=>brGive('Jean-Val-J slipped it into your hand.'));BRM.seenOQ=s}}
  /* street pickups */
  const t=performance.now()*.001;
  for(let i=BRM.items.length-1;i>=0;i--){const it=BRM.items[i];const dx=it.x-P.pos.x,dz=it.z-P.pos.z,d=Math.hypot(dx,dz);
    if(d>480){scene.remove(it.g);BRM.items.splice(i,1);continue}
    it.g.userData.c.rotation.y+=dt*1.6;it.g.userData.r.rotation.z+=dt*.9;it.g.position.y=it.y+1.3+Math.sin(t*2+it.ph)*.18;
    if(d<2.6&&Math.abs(P.pos.y-(it.y+1))<3.6&&!CS.active){scene.remove(it.g);BRM.items.splice(i,1);SP.emit(V3(it.x,it.y+1.3,it.z),{n:60,c0:0xffffff,c1:0xffb040,speed:6,life:.9,s0:.7,s1:.1});runeFlash(V3(it.x,it.y,it.z),0xffc060,3,.6);brGive('Found on the street.')}}
  BRM.spawnT-=dt;if(BRM.spawnT<=0){BRM.spawnT=BRM.items.length<2?6:28;if(BRM.items.length<4)brSpawn()}}
/* minimap: broom stones as amber diamonds */
if(typeof owMinimap==='function'){const _om=owMinimap;owMinimap=function(){_om.apply(this,arguments);try{if(!BRM.items.length)return;const S=mapCv.width,c=S/2,R=95,sc=c/R;mctx.save();mctx.beginPath();mctx.arc(c,c,c,0,TAU);mctx.clip();mctx.translate(c,c);mctx.rotate(yaw);mctx.scale(sc,sc);
  for(const it of BRM.items){let x=it.x-P.pos.x,z=it.z-P.pos.z;const d=Math.hypot(x,z);if(d>R*.92){x*=R*.92/d;z*=R*.92/d}mctx.save();mctx.translate(x,z);mctx.rotate(-yaw);mctx.fillStyle='#ffb040';mctx.shadowColor='#ffb040';mctx.shadowBlur=6;mctx.beginPath();mctx.moveTo(0,-4);mctx.lineTo(2.6,0);mctx.lineTo(0,4);mctx.lineTo(-2.6,0);mctx.closePath();mctx.fill();mctx.restore()}
  mctx.restore()}catch(e){}}}
/* landing after a drop: leftover broom time goes back to the meter */
function brLandTick(){if(!(BRM.drop||BRM.left>0))return;if(P.flying){BRM.drop=false;return}if(P.onGround||P.swim){P.flyMeter=Math.min(flyMax(),P.flyMeter+Math.min(BRM.left,flyMax()));BRM.left=0;BRM.drop=false}}
{const _mt=muTick;muTick=function(dt){_mt(dt);try{brLandTick();brHud(dt);brTick(dt)}catch(e){console.warn('broom',e)}}}
try{brHudInit()}catch(e){console.warn('broom ui',e)}

/* ---------- Master Bilel, last lesson: poison weakens, any blow finishes ---------- */
function bqLesson(){return typeof BQ!=='undefined'&&BQ.active()&&BQ.q===2&&BUESTgoal(2)>BQ.cnt}
function bqIsPoison(e,color,dot){return (dot&&e.pois>0)||color==='#c6ff3a'||(curProj&&curProj.color===0x6ae04a)}
function bqWeaken(e){if(e.bqWeak)return;e.bqWeak=true;e.bqP=true;e.slow=Math.max(e.slow,3);floatText(eCenter(e).add(V3(0,1.3,0)),'Weakened','#a8ff60');
  try{const s=glowSprite(0x9dff5a,2.2,.75);s.position.y=(e.def.h||2)+.9;e.m.g.add(s);e.bqMark=s}catch(x){}
  if(!BQ.hintWeak){BQ.hintWeak=true;toast('Poisoned monsters cannot die from the poison. Finish them with any blow.','Master Bilel')}}
{const _de=damageEnemy;damageEnemy=function(e,amt,color,dot){
  if(!e||e.dead||e.invuln||!e.def||e.def.boss||!bqLesson())return _de.apply(this,arguments);
  const pois=bqIsPoison(e,color,dot);
  if(e.bqWeak&&!pois){e.hp=Math.min(e.hp,1);return _de.call(this,e,amt,'#e8ffb0',dot)}
  if(!pois)return _de.apply(this,arguments);
  e.bqP=true;const f0=e.hpFloor;e.hpFloor=Math.max(f0||0,.08);_de.apply(this,arguments);e.hpFloor=f0;
  if(!e.dead&&e.hp<=Math.ceil(e.maxhp*.08))bqWeaken(e)}}
/* weakened monsters stay slow and sluggish until finished; kills of anything that was poisoned count */
{const _bk=bqKill;bqKill=function(e){if(BQ.q===2&&e&&e.bqP&&!(e.pois>0))e.pois=.01;return _bk.apply(this,arguments)}}
{const _mt=muTick;muTick=function(dt){_mt(dt);try{if(MODE==='open'||!bqLesson())return;for(const e of enemies){if(e.dead||!e.bqWeak)continue;e.slow=Math.max(e.slow,.5);e.busy=Math.max(e.busy,0);if(Math.random()<dt*3)e.stun=Math.max(e.stun,.25);if(Math.random()<dt*4)SP.emit(eCenter(e),{n:1,c0:0xc8ff80,c1:0x2a5010,s0:.6,s1:.2,life:.7,up:1.4,jitter:e.def.r*.6})}}catch(x){}}}
{const _bg=bqGive;bqGive=function(){_bg.apply(this,arguments);if(BQ.q===2)after(5,()=>toast('Poison weakens them and slows them down. It will not kill. Then finish them with any blow.','Master Bilel'))}}
