/* ================= mobile: fast rendering, thumb-first HUD; gameplay: targeting, combos, orbs, objectives ================= */
const DRS={pr:1,min:.55,max:1.25,acc:0,n:0,t:0,on:false};
function applyMobileGfx(){if(!isTouch)return;DRS.on=true;userGfx=true;DRS.max=Math.min(devicePixelRatio||1,1.25);DRS.pr=Math.min(1,DRS.max);
  quality=1;moonLight.castShadow=MODE!=='open';renderer.shadowMap.type=THREE.PCFShadowMap;if(moonLight.shadow){moonLight.shadow.mapSize.set(1024,1024);if(moonLight.shadow.map){moonLight.shadow.map.dispose();moonLight.shadow.map=null}}
  FUR_N.value=0;lampLights.forEach(l=>l.visible=false);useComposer=false;if(bloomPass)bloomPass.enabled=false;if(fxaaPass)fxaaPass.enabled=false;
  renderer.setPixelRatio(DRS.pr);resize();const gb=$('gfxBtn');if(gb)gb.textContent='Graphics: mobile'}
function drsTick(dt){if(!DRS.on)return;DRS.acc+=dt;DRS.n++;DRS.t+=dt;if(DRS.t<2.5)return;const fps=DRS.n/DRS.acc;DRS.acc=DRS.n=DRS.t=0;let pr=DRS.pr;
  if(fps<38)pr-=fps<26?.15:.08;else if(fps>56)pr+=.05;pr=clamp(pr,DRS.min,DRS.max);if(Math.abs(pr-DRS.pr)>.02){DRS.pr=pr;renderer.setPixelRatio(pr);resize()}
  if(fps<22&&MODE!=='open'&&moonLight.castShadow){moonLight.castShadow=false}}
function vib(ms){if(!isTouch)return;try{navigator.vibrate&&navigator.vibrate(ms)}catch(e){}}
function mobileCSS(){const st=document.createElement('style');st.textContent=`
.touch,.touch *{-webkit-user-select:none;user-select:none;-webkit-touch-callout:none;-webkit-tap-highlight-color:transparent}.touch canvas{touch-action:none}
.touch #spells{display:block!important;position:absolute;right:calc(10px + env(safe-area-inset-right,0px));bottom:calc(10px + env(safe-area-inset-bottom,0px));left:auto;transform:none;width:250px;height:250px;pointer-events:none;transform-origin:100% 100%}
.touch #spells .spell{position:absolute;width:54px;height:54px;pointer-events:auto}.touch #spells .spell:first-child{width:80px;height:80px}.touch #spells .spell:first-child svg{width:36px;height:36px}
.touch #moveBtns{position:absolute;display:flex;flex-direction:column-reverse;gap:12px;right:calc(272px + env(safe-area-inset-right,0px))!important;bottom:calc(14px + env(safe-area-inset-bottom,0px))!important;left:auto!important}
.touch #moveBtns .spell{width:62px;height:62px}
.touch #map{width:92px;height:92px}.touch #mapWrap .row{position:fixed;left:calc(14px + env(safe-area-inset-left,0px));top:calc(112px + env(safe-area-inset-top,0px));flex-wrap:nowrap;gap:6px}.touch.ow #mapWrap .row{top:calc(128px + env(safe-area-inset-top,0px))}.touch #owBtns{position:fixed;left:calc(14px + env(safe-area-inset-left,0px));top:calc(170px + env(safe-area-inset-top,0px));display:flex;flex-wrap:nowrap;gap:6px}.touch #mapWrap .mini{height:34px;font-size:12px;padding:0 11px}
@media (orientation:portrait){.touch #objTrack{top:calc(104px + env(safe-area-inset-top,0px));max-width:92vw}.touch #mapWrap .row{top:calc(140px + env(safe-area-inset-top,0px))}.touch.ow #mapWrap .row{top:calc(150px + env(safe-area-inset-top,0px))}.touch #owBtns{top:calc(192px + env(safe-area-inset-top,0px))}}
.touch #toast{font-size:14px}.touch #toast b,.touch #toast strong{font-size:24px}
@media (orientation:portrait){.touch #spells{transform:scale(.82)}.touch #moveBtns{flex-direction:row;right:calc(14px + env(safe-area-inset-right,0px))!important;bottom:calc(230px + env(safe-area-inset-bottom,0px))!important}.touch #moveBtns .spell{width:56px;height:56px}}
@media (max-height:420px){.touch #hpbars,.touch .bars{transform:scale(.85);transform-origin:0 0}}
#objTrack{position:absolute;left:50%;top:calc(10px + env(safe-area-inset-top,0px));transform:translateX(-50%);padding:5px 14px;border-radius:999px;background:rgba(12,10,30,.66);color:#e8dfcc;font:500 12.5px Outfit,system-ui,sans-serif;pointer-events:none;white-space:nowrap;max-width:62vw;overflow:hidden;text-overflow:ellipsis;box-shadow:inset 0 0 0 1px rgba(242,165,65,.25)}
#objTrack b{color:#f2a541;font-weight:700}.ow #objTrack{display:none}
#combo{position:absolute;right:calc(24px + env(safe-area-inset-right,0px));top:42%;font:400 34px 'Pirata One',Georgia,serif;color:#f2a541;text-shadow:0 2px 12px rgba(0,0,0,.6);pointer-events:none;opacity:0;transition:opacity .25s,transform .12s}
#combo small{display:block;font:600 12px Outfit,system-ui,sans-serif;color:#e8dfcc;text-align:right}.touch #combo{top:30%;right:auto;left:calc(18px + env(safe-area-inset-left,0px))}
#rotHint{position:fixed;inset:auto 0 40% 0;text-align:center;color:#e8dfcc;font:600 14px Outfit,system-ui,sans-serif;pointer-events:none;display:none}
@media (orientation:portrait){.touch.playing #rotHint{display:block;animation:rotFade 5s forwards}}@keyframes rotFade{0%,70%{opacity:1}100%{opacity:0}}`;document.head.appendChild(st)}
function layoutSpells(){if(!isTouch)return;const cx=40,cy=40;const put=(el,R,deg,sz)=>{const a=deg*Math.PI/180;el.style.right=(cx+R*Math.cos(a)-sz/2)+'px';el.style.bottom=(cy+R*Math.sin(a)-sz/2)+'px'};
  spellEls.forEach((el,k)=>{if(k>=10){el.style.display='none';return}if(k===0){el.style.right='0px';el.style.bottom='0px';return}if(k<=4)put(el,100,[0,30,60,90][k-1],54);else put(el,170,[3,24,45,66,87][k-5],52)})}
function mobileInit(){mobileCSS();document.body.insertAdjacentHTML('beforeend','<div id="rotHint">Turn your phone sideways for the best view</div>');
  $('hud').insertAdjacentHTML('beforeend','<div id="objTrack"></div><div id="combo"></div>');layoutSpells();applyMobileGfx();
  if(isTouch){const go=()=>{document.body.classList.add('playing');try{const d=document.documentElement;if(!document.fullscreenElement&&d.requestFullscreen)d.requestFullscreen({navigationUI:'hide'}).then(()=>{try{screen.orientation&&screen.orientation.lock&&screen.orientation.lock('landscape').catch(()=>{})}catch(e){}}).catch(()=>{})}catch(e){}};
    for(const id of['newBtn','continueBtn','owGo'])$(id)&&$(id).addEventListener('click',go);
    const short=()=>document.querySelectorAll('#mapWrap .mini').forEach(b=>{const t=b.textContent.replace(/\s*\([A-Z]\)$/,'').replace('Auto bolt','Auto');if(t!==b.textContent)b.textContent=t});short();new MutationObserver(short).observe($('mapWrap'),{subtree:true,childList:true,characterData:true})}}
/* ---------- targeting: ring under the current target, Tab cycles, tap to lock ---------- */
let tRing=null,tRingT=0,curTarget=null;
function targetTick(dt){if(MODE==='open')return;if(!tRing){tRing=decal(runeTex,0xff5060,3,true,.85);scene.add(tRing)}tRingT-=dt;
  if(P.lock&&(P.lock.dead||P.lock.pos.distanceTo(P.pos)>55))P.lock=null;if(tRingT<=0){tRingT=.15;curTarget=P.lock||findTarget(50)}
  const t=curTarget;tRing.visible=!!(t&&!t.dead);if(tRing.visible){const r=t.def.r*2.4+1;tRing.scale.setScalar(r/3);tRing.position.set(t.pos.x,groundAt(t.pos.x,t.pos.z)+.1,t.pos.z);tRing.rotation.z+=dt*1.5;tRing.material.color.setHex(P.lock?0xffc040:0xff5060)}}
function cycleTarget(){if(MODE==='open')return;const list=enemies.filter(e=>!e.dead&&e.pos.distanceTo(P.pos)<50).sort((a,b)=>a.pos.distanceTo(P.pos)-b.pos.distanceTo(P.pos));if(!list.length){P.lock=null;return}const i=list.indexOf(P.lock);P.lock=list[(i+1)%list.length];tRingT=0;blip()}
function tapTarget(x,y){if(MODE==='open')return false;let best=null,bd=70;const v=V3();for(const e of enemies){if(e.dead)continue;v.set(e.pos.x,e.pos.y+e.def.h*.5,e.pos.z).project(camera);if(v.z>1)continue;const sx=(v.x*.5+.5)*innerWidth,sy=(-v.y*.5+.5)*innerHeight;const d=Math.hypot(sx-x,sy-y);if(d<bd){bd=d;best=e}}
  if(best){P.lock=best;tRingT=0;return true}return false}
/* ---------- combo ---------- */
const COMBO={n:0,t:0,best:0};
function comboKill(e){if(MODE==='open'||e.def.boss)return;COMBO.n=COMBO.t>0?COMBO.n+1:1;COMBO.t=4.5;COMBO.best=Math.max(COMBO.best,COMBO.n);const bonus=Math.min(.5,(COMBO.n-1)*.05);if(bonus>0)e.xp=Math.round(e.xp*(1+bonus));
  const el=$('combo');if(el&&COMBO.n>=2){el.innerHTML=`x${COMBO.n}<small>combo +${Math.round(bonus*100)}% xp</small>`;el.style.opacity=1;el.style.transform='scale(1.25)';setTimeout(()=>el.style.transform='scale(1)',120);if(COMBO.n%5===0){tone(660+COMBO.n*20,.18,'triangle',.05,1.3);vib(20)}}
  if(Math.random()<(e.elite?.9:.16))dropOrb(e.pos,Math.random()<.55?'hp':'mp')}
function comboTick(dt){if(COMBO.t>0){COMBO.t-=dt;if(COMBO.t<=0){COMBO.n=0;const el=$('combo');if(el)el.style.opacity=0}}}
/* ---------- health / mana orbs ---------- */
const ORBS=[];
function dropOrb(p,kind){const col=kind==='hp'?0xff4a6a:0x5aa0ff;const g=glowSprite(col,1.3,.95);const c=new THREE.Mesh(G.sphereLo,new THREE.MeshBasicMaterial({color:col}));c.scale.setScalar(.2);g.add(c);g.position.set(p.x+rand(-.8,.8),groundAt(p.x,p.z)+.7,p.z+rand(-.8,.8));scene.add(g);ORBS.push({g,kind,t:0})}
function orbTick(dt){for(let i=ORBS.length-1;i>=0;i--){const o=ORBS[i];o.t+=dt;const p=o.g.position;const dx=P.pos.x-p.x,dz=P.pos.z-p.z,d=Math.hypot(dx,dz);
  if(d<7&&P.alive){const k=Math.min(1,dt*(10-d));p.x+=dx*k;p.z+=dz*k;p.y=lerp(p.y,P.pos.y+1,k)}else p.y+=Math.sin(o.t*4)*.005;
  if(d<1.1||o.t>25){if(d<1.1){if(o.kind==='hp'){const h=Math.round(maxHP()*.08);P.hp=Math.min(maxHP(),P.hp+h);floatText(V3(P.pos.x,P.pos.y+2.6,P.pos.z),`+${h}`,'#ff8aa0')}else{const m=Math.round(maxMP()*.12);P.mp=Math.min(maxMP(),P.mp+m);floatText(V3(P.pos.x,P.pos.y+2.6,P.pos.z),`+${m}`,'#8ac0ff')}tone(o.kind==='hp'?880:1100,.08,'sine',.035,1.4)}scene.remove(o.g);ORBS.splice(i,1)}}}
/* ---------- objective tracker ---------- */
let objT=0;
function objTick(dt){if(MODE==='open')return;objT-=dt;if(objT>0)return;objT=.5;const el=$('objTrack');if(!el)return;let txt='';
  if(P.weak)txt='Find your <b>3 stones</b> (green beams)';
  else if(!bossRef&&enemies.some(q=>q.dormant&&!q.dead)){const q=enemies.find(q=>q.dormant&&!q.dead);const d=Math.round(q.pos.distanceTo(P.pos));txt=`<b>${q.def.name.split(',')[0]}</b> is coming for you · ${d}m`}
  else if(bossRef){const d=Math.round(bossRef.pos.distanceTo(P.pos));txt=`Defeat <b>${bossRef.def.name.split(',')[0]}</b> · Lv ${bossRef.lvl} · ${d}m`}
  else if(BQ.active()&&BQ.met){const q=BQUESTS[BQ.q];if(q){const d=Math.round(Math.hypot(BQ.x-P.pos.x,BQ.z-P.pos.z));txt=BQ.cnt>=q.goal?`Return to <b>Master Bilel</b> · ${d}m`:`Bilel: <b>${q.what}</b> ${BQ.cnt}/${q.goal}`}}
  else{let nb=null;for(const b of BOSS_ORDER)if(!beaten.has(b)){nb=b;break}
    if(!nb)txt=`Paris is safe · keep leveling to <b>${MAXLV}</b>`;else{const d=ETYPES[nb];const nm=d.name.split(',')[0];if(d.needBQ&&!BQ.done)txt=`Find <b>Master Bilel</b>`;else if(P.level<d.gate)txt=`Reach <b>level ${d.gate}</b> · ${nm} (Lv ${d.lvl}) awaits`;else if(peaceT>0){const s=Math.ceil(peaceT);txt=`Calm before the storm · <b>${nm}</b> in ${Math.floor(s/60)}:${String(s%60).padStart(2,'0')}`}else txt=`<b>${nm}</b> (Lv ${d.lvl}) is coming...`}}
  if(el.innerHTML!==txt)el.innerHTML=txt}
function mobTick(dt){drsTick(dt);targetTick(dt);comboTick(dt);orbTick(dt);objTick(dt)}
