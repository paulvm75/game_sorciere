/* ================= UI v2: discreet combo chips, combo indicator setting ================= */
var CMBUI={on:true,n:{},t:{}};try{CMBUI.on=localStorage.getItem('sorc_cmbui')!=='0'}catch(x){}
{const st=document.createElement('style');st.textContent=`
#cmbChips{position:fixed;right:max(14px,env(safe-area-inset-right));top:40%;z-index:58;display:flex;flex-direction:column;align-items:flex-end;gap:6px;pointer-events:none}
.cmbChip{display:flex;align-items:center;gap:8px;padding:5px 12px 5px 6px;border-radius:999px;background:linear-gradient(90deg,rgba(10,8,22,.0),rgba(10,8,22,.72) 30%);border-right:2px solid var(--c);
  font:700 12px/1 Outfit,system-ui,sans-serif;letter-spacing:.14em;text-transform:uppercase;color:#fff;text-shadow:0 0 8px var(--c);animation:chipIn .26s cubic-bezier(.2,1.3,.4,1) both}
.cmbChip i{width:8px;height:8px;border-radius:50%;background:var(--c);box-shadow:0 0 10px var(--c),0 0 3px #fff}
.cmbChip em{font-style:normal;color:var(--c);font-size:11px;letter-spacing:.04em;opacity:.95}
.cmbChip.out{animation:chipOut .4s ease-in forwards}
@keyframes chipIn{from{opacity:0;transform:translateX(26px) scale(.9)}to{opacity:1;transform:none}}
@keyframes chipOut{to{opacity:0;transform:translateX(18px)}}
.touch #cmbChips{top:30%}`;document.head.appendChild(st);
  const c=document.createElement('div');c.id='cmbChips';document.body.appendChild(c)}
function cmbChip(id,name,col){const box=document.getElementById('cmbChips');if(!box)return;const now=performance.now();
  /* the same combo again within 2.5 s just counts up on the chip already there */
  const ex=box.querySelector('[data-id="'+id+'"]');if(ex&&now-(CMBUI.t[id]||0)<2500){CMBUI.n[id]=(CMBUI.n[id]||1)+1;ex.querySelector('em').textContent='×'+CMBUI.n[id];CMBUI.t[id]=now;clearTimeout(ex._to);ex._to=setTimeout(()=>{ex.classList.add('out');setTimeout(()=>ex.remove(),400)},2200);return}
  CMBUI.n[id]=1;CMBUI.t[id]=now;const d=document.createElement('div');d.className='cmbChip';d.dataset.id=id;d.style.setProperty('--c',col);d.innerHTML='<i></i><span></span><em></em>';d.querySelector('span').textContent=name;box.appendChild(d);
  while(box.children.length>3)box.firstChild.remove();d._to=setTimeout(()=>{d.classList.add('out');setTimeout(()=>d.remove(),400)},2200)}
/* the big banner only the first time a combo is found; after that a small chip on the right, or nothing if the indicator is off */
cmbHit=function(id){const I=CMB_INFO[id];if(!I)return;if(!CMB.seen[id]){cmbBanner(I[0],I[1],I[2]);CMB.seen[id]=1;CMB.tut[id]=1;cmbSave();const n=Object.keys(CMB.seen).length;after(1.3,()=>toast(`${I[1]} = ${I[0]}. ${n<3?(3-n)+' more to find.':'You found them all.'}`,'Combo discovered!'));return}
  if(CMBUI.on)cmbChip(id,I[0],I[2])};
function cmbUiSync(){const b=$('cmbBtn');if(b)b.textContent=CMBUI.on?'Combo indicator on':'Combo indicator off'}
try{$('cmbBtn').addEventListener('click',()=>{CMBUI.on=!CMBUI.on;try{localStorage.setItem('sorc_cmbui',CMBUI.on?'1':'0')}catch(x){}cmbUiSync()});cmbUiSync()}catch(x){}

/* ================= HUD v2: duotone spell sigils, jewelled slots, glass CTAs ================= */
const ICON2={
  bolt:'<path opacity=".35" d="M12 4.5l1.5 5 5 1.5-5 1.5-1.5 5-1.5-5-5-1.5 5-1.5z" transform="rotate(45 12 12)"/><path d="M12 1.5l2.1 7.4 7.4 3.1-7.4 3.1-2.1 7.4-2.1-7.4L2.5 12l7.4-3.1z"/><circle cx="12" cy="12" r="1.6" fill="#fff"/>',
  fire:'<path opacity=".4" d="M12 1c1.6 4.6 6.6 6.6 6.6 12.4A6.6 6.6 0 0 1 5.4 13.6c0-3.6 2.4-5.2 2.6-8.6 1.8 1.4 2.4 3.2 2.4 5 1.4-2.8 1.8-5.8 1.6-9z"/><path d="M12.3 9.5c.9 2.4 3.4 3.4 3.4 6.4a3.7 3.7 0 0 1-7.4 0c0-1.8 1-2.9 1.3-4.6.8.8 1.1 1.7 1.1 2.6.9-1.3 1.6-2.7 1.6-4.4z"/><circle cx="12" cy="17" r="1.3" fill="#fff"/>',
  lance:'<path opacity=".35" d="M3 21l4.5-1.2L19 8.3 15.7 5 4.2 16.5z"/><path d="M22 2l-3.2 8.1-2.1-2.1-2.6-2.6-2.1-2.1zM14.4 7.4l2.2 2.2-9.2 9.2-2.2-2.2z"/><path d="M4.6 17.2l2.2 2.2L3 21z"/>',
  frost:'<g stroke="currentColor" stroke-linecap="round" fill="none"><path stroke-width="2.2" d="M12 2v20M3.3 7l17.4 10M3.3 17L20.7 7"/><path stroke-width="1.6" d="M9.4 3.8L12 5.6l2.6-1.8M9.4 20.2l2.6-1.8 2.6 1.8M3.6 10.2l2.9-1.3-.3-3.2M20.4 13.8l-2.9 1.3.3 3.2M3.6 13.8l2.9 1.3-.3 3.2M20.4 10.2l-2.9-1.3.3-3.2"/></g><path d="M12 9.2l2.4 2.8-2.4 2.8-2.4-2.8z" fill="#fff"/>',
  chains:'<g fill="none" stroke="currentColor" stroke-width="2.2"><rect x="2.5" y="8.2" width="11" height="7.6" rx="3.8" transform="rotate(-30 8 12)"/><rect x="10.5" y="8.2" width="11" height="7.6" rx="3.8" transform="rotate(-30 16 12)" opacity=".55"/></g><circle cx="12" cy="12" r="1.5"/>',
  chain:'<path opacity=".4" d="M16.5 9.5l4-1-5.2 6.7.8-3.4z"/><path d="M13.8 1.5L4 14h6l-1.5 8.5L19.5 9.6h-6.2z"/><path d="M10.5 15.5l-4.8 2.6 2.2-.2-1.6 3.2z" opacity=".55"/>',
  inferno:'<g fill="none" stroke="currentColor" stroke-width="1.8" opacity=".55"><ellipse cx="12" cy="18" rx="9" ry="3"/></g><path opacity=".4" d="M5.5 17c0-4 2.6-5 2.4-9 2 1.6 2.4 3.6 2.4 5.3 1-3.1 3.2-5.2 3-9.8 3.6 3.1 5.2 7.2 5.2 11.5z"/><path d="M12.2 7.5c.8 2.4 3.3 3.3 3.3 6.3 0 1.6-1 3-3.5 3.2-2.5-.2-3.5-1.6-3.5-3.2 0-1.9 1.2-2.7 1.4-4.5.8.7 1.1 1.6 1.1 2.5.8-1.3 1.2-2.6 1.2-4.3z"/>',
  meteor:'<path opacity=".35" d="M2 2l9.5 7-2.5 2.5zM5.5 1.5L14 8l-1.8 1.4zM1.5 5.5L8 14l1.4-1.8z"/><circle cx="15" cy="15" r="6.2"/><circle cx="13.3" cy="13.4" r="1.4" fill="rgba(10,6,20,.55)"/><circle cx="17.4" cy="16.6" r="1" fill="rgba(10,6,20,.55)"/>',
  void:'<g fill="none" stroke="currentColor" stroke-linecap="round"><path stroke-width="2.2" d="M12 3.2a8.8 8.8 0 0 1 8.8 8.8M12 20.8A8.8 8.8 0 0 1 3.2 12"/><path stroke-width="1.6" opacity=".55" d="M17.5 5.5A8.8 8.8 0 0 1 20 9M6.5 18.5A8.8 8.8 0 0 1 4 15M9 4a8.8 8.8 0 0 0-4.5 3.5M15 20a8.8 8.8 0 0 0 4.5-3.5"/></g><circle cx="12" cy="12" r="4.6" opacity=".45"/><circle cx="12" cy="12" r="2.8" fill="rgba(6,2,14,.95)"/>',
  poison:'<path opacity=".35" d="M9 2h6v2h-1v4.2l5.2 8.4A3.5 3.5 0 0 1 16.2 22H7.8a3.5 3.5 0 0 1-3-5.4L10 8.2V4H9z"/><path d="M6.4 15.5h11.2l1.6 2.4A2.5 2.5 0 0 1 17 21.6H7a2.5 2.5 0 0 1-2.2-3.7z"/><circle cx="10" cy="12" r="1.1"/><circle cx="13.6" cy="10" r=".8"/>',
  venom:'<path d="M4 20c3.5 0 3.5-4.5 7-4.5s3.5 4.5 7 4.5" stroke="currentColor" stroke-width="2.4" fill="none" stroke-linecap="round" opacity=".55"/><path d="M11 15.5c-3.6 0-6-2.6-4-6 1.6-2.6 5.6-2.6 7-5.6l1.5 2c.6 2-1 3.8-3.4 4.6-2 .7-2.3 2.6-1.1 5z"/><path d="M14 4l3.5-1.5L20 5l-2.3 2.6z"/><circle cx="17.3" cy="4.6" r=".8" fill="#fff"/><path d="M18 7.5l-.4 2 1.2-1.4z" fill="#fff"/>',
  plague:'<circle cx="12" cy="12" r="9" opacity=".2"/><circle cx="12" cy="12" r="3.4"/><circle cx="12" cy="4.2" r="1.9"/><circle cx="18.8" cy="8.1" r="1.6"/><circle cx="18.8" cy="15.9" r="1.9"/><circle cx="12" cy="19.8" r="1.6"/><circle cx="5.2" cy="15.9" r="1.9"/><circle cx="5.2" cy="8.1" r="1.6"/><circle cx="11" cy="11" r="1" fill="#fff"/>',
  storm:'<path opacity=".4" d="M5.5 13a4.2 4.2 0 0 1 .4-8.4A5.4 5.4 0 0 1 16.3 5a3.9 3.9 0 0 1 2.2 8z"/><path d="M13.2 10.5L9 17.4h3.3l-1.4 5.1 5.4-7.6H13l1.6-4.4z"/><path d="M6 15.5l-1.5 3M18.5 15.5L17 18.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" opacity=".55"/>',
  aegis:'<path opacity=".35" d="M12 1.5l9 3.2v6.4c0 5.6-3.9 10-9 12.4-5.1-2.4-9-6.8-9-12.4V4.7z"/><path d="M12 4.6l6 2.2v4.5c0 3.8-2.6 6.9-6 8.6-3.4-1.7-6-4.8-6-8.6V6.8z"/><path d="M12 8l1.2 2.6 2.8.3-2.1 1.9.6 2.8L12 14.2l-2.5 1.4.6-2.8L8 10.9l2.8-.3z" fill="#fff" opacity=".9"/>',
  starfall:'<path opacity=".4" d="M3 3l7 7M8 2l4 4M2 8l4 4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><path d="M15 6l1.7 4.3 4.6.4-3.5 3 1.1 4.5-3.9-2.5-3.9 2.5 1.1-4.5-3.5-3 4.6-.4z"/><circle cx="6" cy="19" r="1.5"/><circle cx="11" cy="21" r="1"/>',
  limit:'<path opacity=".35" d="M12 .8l2 5.6 5.9-1.3-3.2 5.1 5 3.4-6 .6.4 6-4.1-4.4-4.1 4.4.4-6-6-.6 5-3.4-3.2-5.1L10 6.4z"/><path d="M12 5l1.6 3.9 4.2.4-3.2 2.7 1 4.1L12 14l-3.6 2.1 1-4.1-3.2-2.7 4.2-.4z"/><circle cx="12" cy="11" r="1.4" fill="#fff"/>',
  eclipse:'<g stroke="currentColor" stroke-width="1.6" stroke-linecap="round" opacity=".6"><path d="M12 1v3M12 20v3M1 12h3M20 12h3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1"/></g><circle cx="12" cy="12" r="6.6"/><circle cx="12" cy="12" r="5" fill="rgba(6,2,14,.95)"/>',
  blink:'<path opacity=".4" d="M2 8h7M1 12h8M2 16h7" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M10 4.5l11 7.5-11 7.5 2.6-7.5z"/>',
  jump:'<path opacity=".4" d="M3 13c3-.5 5-2.2 6.5-4.5L12 11l2.5-2.5c1.5 2.3 3.5 4 6.5 4.5-2.6 1.6-5.4 1.8-7.5.5L12 15l-1.5-1.5c-2.1 1.3-4.9 1.1-7.5-.5z"/><path d="M12 2.5l6 7h-3.6v5.5H9.6V9.5H6z"/><rect x="7" y="18.5" width="10" height="2.4" rx="1.2"/>'};
Object.assign(ICON,ICON2);
{const st=document.createElement('style');st.textContent=`
.spell{background:radial-gradient(circle at 50% 28%,color-mix(in srgb,var(--c) 30%,#241c44) 0%,#120e26 62%,#07050f 100%)!important;
  box-shadow:inset 0 0 0 1.5px rgba(242,212,150,.55),inset 0 0 0 3.5px rgba(6,4,14,.85),inset 0 0 0 4.5px color-mix(in srgb,var(--c) 70%,transparent),inset 0 -8px 16px -6px color-mix(in srgb,var(--c) 55%,transparent),0 0 18px -6px var(--c),0 6px 14px rgba(0,0,0,.55)!important;transition:transform .12s,box-shadow .2s}
.spell::after{content:"";position:absolute;inset:5px;border-radius:50%;background:radial-gradient(ellipse 60% 38% at 50% 14%,rgba(255,255,255,.28),transparent 70%);pointer-events:none;z-index:2}
.spell svg{width:27px!important;height:27px!important;color:color-mix(in srgb,var(--c) 55%,#fff);filter:drop-shadow(0 0 4px var(--c)) drop-shadow(0 1px 1px rgba(0,0,0,.6))}
.spell:not(.locked):hover{transform:translateY(-2px) scale(1.05)}.spell:active{transform:scale(.94)}
.spell .k{background:linear-gradient(#2a2244,#0e0a1c)!important;color:#f2d496!important;box-shadow:inset 0 0 0 1px rgba(242,212,150,.55),0 2px 4px rgba(0,0,0,.5)!important;font-weight:700}
.spell .cd{background:conic-gradient(rgba(6,4,14,.8) calc(var(--p,0)*1turn),transparent 0)!important}
.spell.locked{background:radial-gradient(circle at 50% 30%,#1c1830,#0a0814)!important;box-shadow:inset 0 0 0 1.5px rgba(242,212,150,.18),0 4px 10px rgba(0,0,0,.5)!important}
.spell.locked .lv{color:rgba(242,212,150,.7);font-size:10px;letter-spacing:.04em}
#jumpBtn,#blinkBtn{--c:#f2d9a0}
#mapWrap .row .mini,.mini{background:linear-gradient(180deg,rgba(34,26,60,.9),rgba(12,9,26,.92))!important;box-shadow:inset 0 0 0 1px rgba(242,212,150,.38),inset 0 1px 0 rgba(255,255,255,.08),0 3px 8px rgba(0,0,0,.45)!important;color:#f3e8d2;
  font-family:Outfit,system-ui,sans-serif;font-weight:700;letter-spacing:.08em;text-transform:uppercase;transition:transform .12s,box-shadow .2s,background .2s}
#mapWrap .row .mini:hover,.mini:hover{box-shadow:inset 0 0 0 1px rgba(242,212,150,.8),0 0 14px -4px rgba(242,180,90,.6),0 3px 8px rgba(0,0,0,.45)!important}
#mapWrap .row .mini{font-size:10px!important}
#mapWrap .row .mini .ic{color:#f2c46a!important;text-shadow:0 0 6px rgba(242,180,90,.8)}
#autoBtn.on{background:linear-gradient(180deg,rgba(30,74,52,.92),rgba(10,32,22,.94))!important;box-shadow:inset 0 0 0 1px rgba(125,255,154,.55),0 0 14px -4px rgba(125,255,154,.6)!important}
#pauseBtn{width:30px;min-width:30px!important;padding:0!important}
#pauseBtn::before{content:"";width:9px;height:11px;background:linear-gradient(90deg,#f2d496 0 3px,transparent 3px 6px,#f2d496 6px 9px)}
#pause .btn{font-family:Outfit,system-ui,sans-serif;letter-spacing:.06em}
#pause .btn.ghost{background:linear-gradient(180deg,rgba(34,26,60,.75),rgba(12,9,26,.8));box-shadow:inset 0 0 0 1px rgba(242,212,150,.3)}
#pause .btn.ghost:hover{box-shadow:inset 0 0 0 1px rgba(242,212,150,.75),0 0 16px -6px rgba(242,180,90,.7)}`;document.head.appendChild(st)}
try{if(typeof renderBar==='function')renderBar()}catch(x){}
try{const b=document.getElementById('blinkBtn')||(typeof blinkEl!=='undefined'&&blinkEl);if(b){const s=b.querySelector('svg');if(s)s.innerHTML=ICON.blink}}catch(x){}
try{const j=document.getElementById('jumpBtn');if(j){const s=j.querySelector('svg');if(s)s.innerHTML=ICON.jump}}catch(x){}
try{const pb=document.getElementById('pauseBtn');if(pb){pb.textContent='';pb.setAttribute('aria-label','Pause')}}catch(x){}
