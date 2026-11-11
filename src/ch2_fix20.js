/* ---------- clash v4: clearer "smash space" wording with an animated key, big text shrinks after 2s, tap combo counter, wide side camera on both fighters ---------- */
(function(){const st=document.createElement('style');st.textContent=`
.kc{display:inline-block;margin:0 .12em;padding:.02em .42em .06em;border:.07em solid #ffe9a8;border-bottom-width:.2em;border-radius:.2em;background:rgba(48,24,0,.7);color:#fff3cc;-webkit-text-fill-color:#fff3cc;font-size:.82em;letter-spacing:.04em;vertical-align:.08em;box-shadow:0 0 .4em rgba(255,190,60,.6);animation:kcp .22s ease-in-out infinite}
@keyframes kcp{0%,100%{transform:translateY(0);border-bottom-width:.2em}50%{transform:translateY(.1em);border-bottom-width:.07em;box-shadow:0 0 .9em rgba(255,220,120,.95)}}
#xmFcS .kc{font-size:.9em;padding:0 .4em;animation-duration:.24s}
#xmFcC{position:fixed;left:50%;top:calc(24% + 52px + env(safe-area-inset-top,0px));transform:translate(-50%,0);z-index:40;pointer-events:none;opacity:0;transition:opacity .3s;
  font:400 clamp(22px,3.4vw,34px) 'Bangers',Impact,'Arial Black',sans-serif;letter-spacing:.06em;color:#ffd45a;text-shadow:0 3px 0 #3a1400,0 0 14px rgba(255,170,40,.8)}
#xmFcC.on{opacity:1}#xmFcC.pop{animation:fcpop .14s ease-out}
#xmFcK,#xmFcK.red{background:none!important;-webkit-background-clip:border-box!important;background-clip:border-box!important;filter:none!important;color:#ffd84a;-webkit-text-fill-color:#ffd84a;
  text-shadow:0 5px 0 #5a2200,3px 3px 0 #5a2200,-3px 3px 0 #5a2200,0 0 22px rgba(255,170,40,.9)}
#xmFcK.red{color:#ff6a48;-webkit-text-fill-color:#ff6a48;text-shadow:0 5px 0 #3a0000,3px 3px 0 #3a0000,-3px 3px 0 #3a0000,0 0 24px rgba(255,40,10,.9)}
#xmFcK small{color:#fff4dc;-webkit-text-fill-color:#fff4dc;text-shadow:0 2px 0 #000,0 0 10px rgba(0,0,0,.8)}
@keyframes fcpop{0%{transform:translate(-50%,0) scale(1.45)}100%{transform:translate(-50%,0) scale(1)}}`;document.head.appendChild(st)})();
const FCT=()=>typeof isTouch!=='undefined'&&isTouch;
function xmFcBig(){return FCT()?'TAP! TAP! TAP!<small>tap the screen again and again, as fast as you can</small>':'SMASH <span class="kc">SPACE</span>!<small>hit it again and again, as fast as you can</small>'}
xmFcPill=function(surge){const d=xmFcUI();d.classList.toggle('surge',!!surge);
  d.innerHTML=surge?(FCT()?'She is pushing back! Tap <b>FASTER!</b>':'She is pushing back! Smash <span class="kc">SPACE</span> <b>FASTER!</b>')
    :(FCT()?'Tap the screen as fast as you can!':'Smash <span class="kc">SPACE</span> as fast as you can!');d.appendChild(document.createElement('i'))};
function xmFcCombo(n){let c=document.getElementById('xmFcC');if(!c){c=document.createElement('div');c.id='xmFcC';document.body.appendChild(c)}
  if(n<0){c.classList.remove('on');return}c.textContent=n>0?'x'+n:'';c.classList.toggle('on',n>0);c.classList.remove('pop');void c.offsetWidth;c.classList.add('pop')}
{const _fs=xmFcStart;xmFcStart=function(m){const r=_fs.apply(this,arguments);const C=XO.fc;if(!C)return r;C.n=0;
  const big=Math.min(2,C.intro0||2);xmFcKin(xmFcBig(),null,big,'mini');xmFcPill(false);xmFcCombo(0);
  clearTimeout(XO.fcPT);XO.fcPT=setTimeout(()=>{if(XO.fc===C)xmFcUI().classList.add('on')},big*1000+250);
  /* camera: pick the side the camera is already on */
  const mid=C.mp.clone().add(m.pos).multiplyScalar(.5),dir=V3(m.pos.x-C.mp.x,0,m.pos.z-C.mp.z).normalize(),perp=V3(-dir.z,0,dir.x);
  C.sd=(camera.position.x-mid.x)*perp.x+(camera.position.z-mid.z)*perp.z>=0?1:-1;return r}}
{const _p=xmFcPush;xmFcPush=function(){const C=XO.fc;const r=_p.apply(this,arguments);if(C){C.n=(C.n||0)+1;xmFcCombo(C.n);
  try{const h=headOf(C.mp,1.3);FL.emit(h,{n:3,c0:0xfff6c8,c1:0xffb000,s0:.5,s1:.05,life:.3,speed:4})}catch(x){}}return r}}
{const _sg=xmFcSurge;xmFcSurge=function(C){const r=_sg.apply(this,arguments);
  xmFcKin(FCT()?'SHE\'S PUSHING BACK!<small>tap faster!</small>':'SHE\'S PUSHING BACK!<small>smash <span class="kc">SPACE</span> faster!</small>','red',1.6,'mini');return r}}
{const _fe=xmFcEnd;xmFcEnd=function(win){const had=XO.fc;const r=_fe.apply(this,arguments);if(had){clearTimeout(XO.fcPT);xmFcCombo(-1)}return r}}
/* wide side camera: both fighters and the beams in frame, eased in and out */
{const _uc=updateCamera;updateCamera=function(dt){const r=_uc.apply(this,arguments);const C=XO.fc;
  XO.fcW=Math.max(0,Math.min(1,(XO.fcW||0)+(C?dt/.8:-dt/.7)));
  if(C&&C.m){const a=C.mp,b=C.m.pos,mid=V3((a.x+b.x)/2,(a.y+b.y)/2,(a.z+b.z)/2),dir=V3(b.x-a.x,0,b.z-a.z),sep=Math.max(4,dir.length());dir.normalize();
    const perp=V3(-dir.z,0,dir.x).multiplyScalar(C.sd||1),dist=Math.max(8.5,sep*.85+4);
    const pos=mid.clone().addScaledVector(perp,dist).addScaledVector(dir,-sep*.08);pos.y=Math.max(mid.y+2.6,groundAt(pos.x,pos.z)+1.2);
    const look=V3(mid.x,mid.y+1.25,mid.z);if(!XO.fcCam)XO.fcCam={pos:pos.clone(),look:look.clone()};
    const k=1-Math.exp(-dt*6);XO.fcCam.pos.lerp(pos,k);XO.fcCam.look.lerp(look,k)}
  if(XO.fcW>0&&XO.fcCam){const w=XO.fcW*XO.fcW*(3-2*XO.fcW);camera.position.lerp(XO.fcCam.pos,w);
    if(P.shake>0){camera.position.x+=rand(-1,1)*P.shake*.12;camera.position.y+=rand(-1,1)*P.shake*.12}
    camera.lookAt(camTarget.clone().lerp(XO.fcCam.look,w))}else if(!C)XO.fcCam=null;return r}}
