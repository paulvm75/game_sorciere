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
{const _uc=updateCamera;updateCamera=function(dt){
  /* the base camera smooths toward its target from where it was: hand it back its own position, never the framed one, or the two fight and the image shakes */
  if(CAMX.base&&CAMX.on)camera.position.copy(CAMX.base);CAMX.on=false;
  const r=_uc.apply(this,arguments);try{
  if(!CAMX.init){CAMX.init=1;if(camDist===11.5)camDist=10.5}
  if((typeof PL!=='undefined'&&PL.on)||CS.active){if(CAMX.fovD){camera.fov-=CAMX.fovD;CAMX.fovD=0;camera.updateProjectionMatrix()}CAMX.sy=null;CAMX.off=0;return r}
  (CAMX.base||(CAMX.base=V3())).copy(camera.position);CAMX.on=true;dt=Math.min(dt,.05);
  /* weighted vertical: jumps lift the camera a little later and softer */
  if(CAMX.sy==null||Math.abs(CAMX.sy-P.pos.y)>8)CAMX.sy=P.pos.y;CAMX.sy=lerp(CAMX.sy,P.pos.y,1-Math.exp(-dt*(P.flying?6:3.2)));const lagY=(P.pos.y-CAMX.sy)*.3;
  /* shoulder: frame Maëlle a touch left of centre; eases out smoothly near walls instead of snapping */
  const rx=Math.cos(yaw),rz=-Math.sin(yaw),d=camera.position.distanceTo(camTarget);
  let want=(P.flying?.2:.45)*Math.min(1,d/9);if(camBlocked(camera.position.x+rx*want,camera.position.y,camera.position.z+rz*want))want=0;
  CAMX.off=lerp(CAMX.off,want,1-Math.exp(-dt*3));
  camera.position.x+=rx*CAMX.off;camera.position.z+=rz*CAMX.off;camera.position.y-=lagY;
  camera.lookAt(camTarget.x+rx*CAMX.off*.75,camTarget.y-lagY*.5,camTarget.z+rz*CAMX.off*.75);
  /* FOV with speed */
  let sp=P.boosting?7:P.flying?2.5:(P.moveAmt>.8&&(keys.ShiftLeft||keys.ShiftRight||(joy.id!==null&&Math.hypot(joy.x,joy.y)>.93)))?2.5:0;if(MODE!=='open'){window.CAMSP=sp;sp=0}
  const nd=lerp(CAMX.fovD,sp,1-Math.exp(-dt*3));if(Math.abs(nd-CAMX.fovD)>.05){camera.fov+=nd-CAMX.fovD;CAMX.fovD=nd;camera.updateProjectionMatrix()}
}catch(x){}return r}}

/* ---------- Maëlle's skin: bronzed once in the texture with a smoothed mask (the old per-pixel colour key left pale and dark patches on her face) ---------- */
function gsBronze(tex){if(!tex||!tex.image||tex.__bronze)return;tex.__bronze=1;try{const im=tex.image,W0=im.width,H0=im.height;const cv=document.createElement('canvas');cv.width=W0;cv.height=H0;const x=cv.getContext('2d');x.drawImage(im,0,0);
  const D=x.getImageData(0,0,W0,H0),d=D.data;const S=4,w=W0/S|0,h=H0/S|0;let m=new Float32Array(w*h);
  for(let j=0;j<h;j++)for(let i=0;i<w;i++){let acc=0;for(let v=0;v<S;v++)for(let u=0;u<S;u++){const k=((j*S+v)*W0+i*S+u)*4;const r=d[k]/255,g=d[k+1]/255,b=d[k+2]/255;
      const mx=Math.max(r,g,b),mn=Math.min(r,g,b),sat=(mx-mn)/(mx+1e-4),lum=r*.3+g*.59+b*.11,gr=g/Math.max(r,.001);
      if(r>=g&&g>=b-.02&&gr>.4&&gr<.97&&sat>.03&&sat<.7&&lum>.1)acc++}m[j*w+i]=acc/(S*S)}
  /* close small holes, then soften the edges */
  const blur=(a,R)=>{const o=new Float32Array(a.length);for(let j=0;j<h;j++)for(let i=0;i<w;i++){let s=0,n=0;for(let v=-R;v<=R;v++){const y=j+v;if(y<0||y>=h)continue;for(let u=-R;u<=R;u++){const xx=i+u;if(xx<0||xx>=w)continue;s+=a[y*w+xx];n++}}o[j*w+i]=s/n}return o};
  m=blur(m,2);for(let k=0;k<m.length;k++)m[k]=Math.min(1,Math.max(0,(m[k]-.3)/.35));m=blur(m,1);
  for(let y=0;y<H0;y++){const fy=Math.min(h-1,y/S);for(let xx=0;xx<W0;xx++){const t=m[(fy|0)*w+Math.min(w-1,xx/S|0)];if(t<=0)continue;const k=(y*W0+xx)*4;
      const r=d[k],g=d[k+1],b=d[k+2];d[k]=r+(r*.9+3-r)*t;d[k+1]=g+(g*.8+2-g)*t;d[k+2]=b+(b*.73-b)*t;if(t>.5)d[k+3]=Math.min(d[k+3],250)}}
  x.putImageData(D,0,0);tex.image=cv;tex.needsUpdate=true}catch(e){}}
{const _pl=gsPostLoad;gsPostLoad=function(g,T,key,U){if(key==='maelle')try{T.traverse(o=>{if(o.isMesh&&o.material&&o.material.map&&o.material.map.image&&o.material.map.image.width>=1024)gsBronze(o.material.map)})}catch(e){}return _pl.apply(this,arguments)}}
/* open world crowd: never draw before the crowd instancing exists (it threw every frame and froze the rest of the update) */
{const _up=updatePeople;updatePeople=function(){if(!NPI)return;return _up.apply(this,arguments)}}
