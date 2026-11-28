/* ================= AUDIT: input can never stay stuck, movement locks can't leak between chapters, AAA camera ================= */
/* ---------- touch joystick and look: reset on every way a finger can get lost ---------- */
function inputReset(){joy.id=null;joy.x=joy.y=0;look.id=null;try{joyEl.classList.add('hidden');knob.style.transform=''}catch(x){}for(const k in keys)keys[k]=false;jumpHeld=false;
  try{for(const c in KEYSLOT){chargeEnd(KEYSLOT[c]);delete KEYSLOT[c]}}catch(x){}}
const TCH={n:0,zeroT:0};
{const cnt=e=>{TCH.n=e.touches?e.touches.length:0;if(TCH.n===0)TCH.zeroT=performance.now()};
  for(const ev of['touchstart','touchmove','touchend','touchcancel'])addEventListener(ev,cnt,{capture:true,passive:true});
  /* a primary touch means no other finger is down: anything still held is stale */
  addEventListener('pointerdown',e=>{if(e.pointerType==='touch'&&e.isPrimary&&(joy.id!==null&&joy.id!==e.pointerId||look.id!==null&&look.id!==e.pointerId)){joy.id=null;joy.x=joy.y=0;look.id=null;try{joyEl.classList.add('hidden')}catch(x){}}},true);
  addEventListener('pointerup',e=>{if(e.pointerId===joy.id||e.pointerId===look.id)endPointer(e)},true);
  addEventListener('pointercancel',e=>{if(e.pointerId===joy.id||e.pointerId===look.id)endPointer(e)},true);
  canvas.addEventListener('lostpointercapture',e=>{if(e.pointerId===joy.id){joy.id=null;joy.x=joy.y=0;try{joyEl.classList.add('hidden')}catch(x){}}if(e.pointerId===look.id)look.id=null});
  document.addEventListener('visibilitychange',()=>{if(document.hidden)inputReset()});addEventListener('pagehide',inputReset);addEventListener('blur',inputReset);
  addEventListener('orientationchange',inputReset);addEventListener('contextmenu',()=>{if(isTouch)inputReset()},true)}
/* ---------- watchdog: run every frame ---------- */
const AUD={csWas:false,stairT:0,climbT:0,sitT:0,mode:null,zone:null};
function audTick(dt){
  /* joystick held but no finger on the glass for a moment: release it */
  if(TCH.n===0&&performance.now()-TCH.zeroT>250&&document.body.classList.contains('touch')&&!keys.Space){if(joy.id!==null){joy.id=null;joy.x=joy.y=0;try{joyEl.classList.add('hidden')}catch(x){}}jumpHeld=false;if(typeof CHG!=='undefined'&&CHG&&!Object.keys(KEYSLOT).length)try{chargeEnd(CHG.k)}catch(x){}}
  /* cutscenes, pauses, the book and the films always start with clean hands */
  const busy=CS.active||paused||(typeof FILM!=='undefined'&&FILM.on)||(typeof bookOpen!=='undefined'&&bookOpen);if(busy&&!AUD.csWas)inputReset();AUD.csWas=busy;
  /* movement locks that belong to one place must never follow you somewhere else */
  if(P.stairs){AUD.stairT+=dt;if(MODE!=='open'||AUD.stairT>30||(P.stairs.ph==='bottom'&&!owUI&&AUD.stairT>20)){P.stairs=null;P.heroAnim=null;P.pos.y=groundAt(P.pos.x,P.pos.z)}}else AUD.stairT=0;
  if(P.climb){AUD.climbT+=dt;if(AUD.climbT>6){P.climb=null;P.onGround=true;P.vy=0}}else AUD.climbT=0;
  if(P.heroAnim==='Walk_Loop'&&!P.stairs&&!CS.active){AUD.walkT=(AUD.walkT||0)+dt;if(AUD.walkT>1.5){P.heroAnim=null;AUD.walkT=0}}else AUD.walkT=0;
  const z=typeof CH2!=='undefined'?CH2.zone:null;if(z!==AUD.zone){AUD.zone=z;P.stairs=null;P.climb=null;P.sitting=false;inputReset()}}
{const _mt=muTick;muTick=function(dt){_mt(dt);try{audTick(dt)}catch(x){}}}
/* a chapter switch always leaves you able to move: no cutscene, no fade, no lock, no frozen camera */
{const _pk=pickChapter;pickChapter=function(id){inputReset();/* scripted beats still queued from the chapter you are leaving must not fire in the next one */timers.length=0;const r=_pk.apply(this,arguments);
  const fix=late=>{try{if(late){if(!CS.active&&!paused&&!(typeof FILM!=='undefined'&&FILM.on)&&parseFloat(fadeEl.style.opacity||'0')>.9){fadeEl.style.transition='opacity .6s';fadeEl.style.opacity='0'}return}
    P.stairs=null;P.climb=null;P.sitting=false;P.heroAnim=null}catch(x){}};
  fix(false);after(4,()=>fix(true));after(8,()=>fix(true));return r}}

/* ---------- camera: over-the-shoulder framing, weighted vertical follow, FOV that breathes with speed, a little roll ---------- */
const CAMX={off:0,fovD:0,sy:null,roll:0,init:0};
{const _uc=updateCamera;updateCamera=function(dt){const r=_uc.apply(this,arguments);try{
  if(!CAMX.init){CAMX.init=1;if(camDist===11.5)camDist=10}
  if((typeof PL!=='undefined'&&PL.on)||CS.active){if(CAMX.fovD){camera.fov-=CAMX.fovD;CAMX.fovD=0;camera.updateProjectionMatrix()}CAMX.sy=null;return r}
  /* weighted vertical: jumps lift the camera a little later and softer */
  if(CAMX.sy==null||Math.abs(CAMX.sy-P.pos.y)>8)CAMX.sy=P.pos.y;CAMX.sy=lerp(CAMX.sy,P.pos.y,1-Math.exp(-dt*(P.flying?6:3.2)));const lagY=(P.pos.y-CAMX.sy)*.55;camera.position.y-=lagY;
  /* shoulder: frame Maëlle a touch left of centre like a modern action game (less when flying or in a tight spot) */
  const d=camera.position.distanceTo(camTarget),want=(P.flying?.35:.95)*Math.min(1,d/9);CAMX.off=lerp(CAMX.off,want,1-Math.exp(-dt*4));
  const rx=Math.cos(yaw),rz=-Math.sin(yaw);const cx=camera.position.x+rx*CAMX.off,cz=camera.position.z+rz*CAMX.off;
  if(!camBlocked(cx,camera.position.y,cz)){camera.position.x=cx;camera.position.z=cz}
  const lt=V3(camTarget.x+rx*CAMX.off*.75,camTarget.y-lagY*.5-.15,camTarget.z+rz*CAMX.off*.75);camera.lookAt(lt);
  /* FOV with speed */
  const sp=P.boosting?11:P.flying?5:(P.moveAmt>.8&&(keys.ShiftLeft||keys.ShiftRight||(joy.id!==null&&Math.hypot(joy.x,joy.y)>.93)))?4.5:0;
  const nd=lerp(CAMX.fovD,sp,1-Math.exp(-dt*3));if(Math.abs(nd-CAMX.fovD)>.01){camera.fov+=nd-CAMX.fovD;CAMX.fovD=nd;camera.updateProjectionMatrix()}
  /* roll into strafes, and a faint breath */
  let ix=0;if(keys.KeyA||keys.ArrowLeft)ix-=1;if(keys.KeyD||keys.ArrowRight)ix+=1;if(joy.id!==null)ix+=joy.x;CAMX.roll=lerp(CAMX.roll,-ix*(P.flying?.035:.012),1-Math.exp(-dt*4));
  camera.rotateZ(CAMX.roll+Math.sin(time*.9)*.0018);camera.rotateX(Math.sin(time*.63)*.0012)}catch(x){}return r}}
