/* ================= progression: charged casts, spellbook, evolution, new spells ================= */
let CHG=null;const CHG_MAX=1.2;let chgHumT=0;
function chargeStart(k){if(!started||paused||!P.alive||CS.active)return;const si=P.bar[k];if(si==null||si<0){castSlot(k);return}const s=SPELLS[si];
  if(!spellKnown(s)||P.cds[si]>0||P.mp<s.cost){castSlot(k);return}CHG={k,t:0,si};P.charging=1}
function chargeEnd(k){if(!CHG||CHG.k!==k)return;const t=CHG.t;CHG=null;P.charging=0;const kf=clamp((t-.22)/(CHG_MAX-.22),0,1);if(typeof barkCharge==='function')barkCharge(kf);const s=SPELLS[P.bar[k]];
  if(kf>0&&s){const extra=Math.round(s.cost*.5*kf);if(P.mp>=s.cost+extra){P.mp-=extra;P.chgMul=1+1.2*kf;P.chgMulT=1.4;P._chgCast=true;if(kf>.95){flash(P.pos,new THREE.Color(s.color).getHex(),6);P.shake=Math.max(P.shake,.35);tone(180,.3,'sawtooth',.05,.5)}}}
  castSlot(k);P._chgCast=false}
function chargeTick(dt){const t=time;lbTick(dt);if(typeof barkTick==='function')barkTick(dt);mobTick(dt);if(!P._tip&&started&&time>14&&!CS.active){P._tip=1;toast(isTouch?'Hold a spell button to charge it. Tap Spells to open your grimoire.':'Hold a spell key to charge it (up to 2.2x). Press K to open your grimoire.','Tip')}bqTick(dt);if(!BQ.met&&MODE!=='open'&&beaten.has('slug')&&started&&!CS.active&&!bossRef&&!P._bqWait){P._bqWait=1;after(2,()=>{P._bqWait=0;if(!BQ.met&&!CS.active)bilelArrive()})}if(W.evoTick)W.evoTick(dt,t);if(W.shieldM){W.shieldM.visible=P.shield>0;if(W.shieldM.visible){const h=W.shieldM.userData.hit=Math.max(0,(W.shieldM.userData.hit||0)-dt);W.shieldM.material.opacity=.14+h*1.2+Math.sin(t*6)*.03;W.shieldM.rotation.y+=dt}}
  if(W.evolved&&Math.random()<dt*14){const c=HERO.g==='f'?0xff4050:0xb070ff;SP.emit(V3(P.pos.x+rand(-.8,.8),P.pos.y+rand(0,1.8),P.pos.z+rand(-.8,.8)),{c0:c,c1:0x200010,s0:.35,s1:.05,life:.9,up:1.6,speed:.3})}
  if(!CHG)return;CHG.t+=dt;const kf=Math.min(1,CHG.t/CHG_MAX);const s=SPELLS[CHG.si];const col=new THREE.Color(s.color).getHex();
  if(CHG.t>.2){const o=orbPos();for(let n=0;n<2;n++){const a=rand(0,TAU),r=rand(.8,1.6)*(1.2-kf*.5);const p=V3(o.x+Math.cos(a)*r,o.y+rand(-.6,.6),o.z+Math.sin(a)*r);SP.emit(p,{c0:0xffffff,c1:col,s0:.3+kf*.3,s1:.05,life:.35,dir:o.clone().sub(p).multiplyScalar(3),dirJ:1})}
    chgHumT-=dt;if(chgHumT<=0){chgHumT=.12;tone(220+kf*440,.14,'sine',.025+kf*.02,1.05)}if(kf>=1&&Math.random()<.3)SP.emit(o,{n:3,c0:0xffffff,c1:col,s0:.6,s1:.1,life:.4,speed:3})}}
/* ---------- spellbook (grimoire v2): 15 slots on desktop, 10 on touch, tap-tap or drag ---------- */
const NSLOT=15;const slotN=()=>isTouch?10:NSLOT;const KEYSLOT={};
const SLOTCODE={Digit1:0,Digit2:1,Digit3:2,Digit4:3,Digit5:4,Digit6:5,Digit7:6,Digit8:7,Digit9:8,Digit0:9,Numpad1:0,Numpad2:1,Numpad3:2,Numpad4:3,Numpad5:4,Numpad6:5,Numpad7:6,Numpad8:7,Numpad9:8,Numpad0:9,KeyZ:10,KeyX:11,KeyV:12,KeyG:13,KeyH:14};
function slotOfKey(e){if(e.ctrlKey||e.metaKey||e.altKey)return -1;const k=SLOTCODE[e.code];return k===undefined||k>=slotN()?-1:k}
let bookOpen=false,bookSel=-1,bookEl=null,bookWasPaused=false;const GBK={slot:-1,p:null,ghost:null,f:'all',flash:-1};
function bookCSS(){if($('bookCss'))return;const st=document.createElement('style');st.id='bookCss';st.textContent=`
#book{position:fixed;inset:0;z-index:60;display:grid;place-items:center;background:radial-gradient(ellipse at 50% 40%,rgba(30,18,60,.55),rgba(4,3,12,.82));backdrop-filter:blur(4px);pointer-events:auto;font-family:Outfit,system-ui,sans-serif}
#book .gm{width:min(1000px,96vw);height:min(88vh,780px);display:grid;grid-template-rows:auto auto 1fr auto;background:linear-gradient(180deg,rgba(30,22,48,.97),rgba(14,10,24,.98));border:1px solid rgba(242,165,65,.32);border-radius:16px;box-shadow:0 30px 80px rgba(0,0,0,.7),inset 0 1px 0 rgba(255,230,180,.08);color:#e8dfcc;overflow:hidden;position:relative}
#book .gm:before,#book .gm:after{content:'';position:absolute;width:26px;height:26px;border:1.5px solid rgba(242,165,65,.55);pointer-events:none}#book .gm:before{left:8px;top:8px;border-right:0;border-bottom:0;border-radius:6px 0 0 0}#book .gm:after{right:8px;bottom:8px;border-left:0;border-top:0;border-radius:0 0 6px 0}
#book header{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:16px 22px 6px}
#book h2{margin:0;font:400 34px/1 'Pirata One',Georgia,serif;color:#f2a541;letter-spacing:.5px;text-shadow:0 0 18px rgba(242,165,65,.25)}
#book .gsub{margin:4px 0 0;font-size:12.5px;opacity:.65}
#book .gx{flex:0 0 auto;width:38px;height:38px;border-radius:50%;border:1px solid rgba(232,223,204,.25);background:rgba(255,255,255,.04);color:#e8dfcc;font-size:18px;cursor:pointer}#book .gx:hover{border-color:#f2a541;color:#f2a541}
#book .gtabs{display:flex;gap:6px;padding:6px 22px 10px}#book .gtabs button{border:1px solid rgba(232,223,204,.16);background:rgba(255,255,255,.03);color:#cfc4b0;border-radius:999px;padding:6px 14px;font:500 12.5px Outfit,system-ui,sans-serif;cursor:pointer}
#book .gtabs button.on{background:rgba(242,165,65,.16);border-color:rgba(242,165,65,.7);color:#ffd59a}
#book .glist{overflow-y:auto;padding:4px 22px 16px;display:grid;grid-template-columns:repeat(auto-fill,minmax(270px,1fr));gap:8px;align-content:start;overscroll-behavior:contain}
#book .gc{--c:#fff;position:relative;display:grid;grid-template-columns:46px 1fr auto;gap:12px;align-items:center;padding:10px 12px;border-radius:12px;background:linear-gradient(90deg,rgba(255,255,255,.045),rgba(255,255,255,.015));border:1px solid rgba(255,255,255,.07);cursor:grab;user-select:none;-webkit-user-select:none;touch-action:pan-y;transition:background .15s,border-color .15s,box-shadow .15s,transform .15s}
#book .gc:hover{background:linear-gradient(90deg,rgba(255,255,255,.08),rgba(255,255,255,.025));border-color:rgba(255,255,255,.14)}
#book .gc.sel{border-color:var(--c);box-shadow:0 0 0 1px var(--c),0 0 22px -8px var(--c);background:linear-gradient(90deg,color-mix(in srgb,var(--c) 14%,transparent),rgba(255,255,255,.02))}
#book .gc.lock{cursor:default;opacity:.45;filter:saturate(.3)}#book .gc.shake{animation:gshake .35s}
@keyframes gshake{25%{transform:translateX(-4px)}75%{transform:translateX(4px)}}
#book .gi{width:46px;height:46px;border-radius:50%;display:grid;place-items:center;color:var(--c);background:radial-gradient(circle at 50% 30%,rgba(70,52,120,.9),rgba(12,9,26,.95) 72%);box-shadow:inset 0 0 0 1.5px color-mix(in srgb,var(--c) 65%,transparent),0 0 14px -6px var(--c)}
#book .gi svg{width:24px;height:24px;fill:currentColor;filter:drop-shadow(0 0 5px var(--c))}
#book .gt{min-width:0}#book .gt b{display:block;font:600 15px Georgia,serif;letter-spacing:.3px;color:#f3ead8}#book .gt small{display:block;font-size:11px;opacity:.6;margin-top:1px}#book .gt em{display:block;font-style:normal;font-size:12px;opacity:.82;margin-top:4px;line-height:1.3}
#book .gk{min-width:26px;height:22px;padding:0 6px;border-radius:6px;display:grid;place-items:center;font:700 11px Outfit,system-ui,sans-serif;color:#1a1020;background:#f2a541;box-shadow:0 0 10px -2px rgba(242,165,65,.6)}#book .gk.off{background:none;box-shadow:none;color:transparent}
#book .gk.lk{background:none;color:#cfc4b0;box-shadow:inset 0 0 0 1px rgba(232,223,204,.3);font-weight:500}
#book .gdock{border-top:1px solid rgba(242,165,65,.2);background:linear-gradient(180deg,rgba(10,7,20,.6),rgba(6,4,14,.9));padding:10px 22px 16px}
#book .ghint{font-size:12.5px;color:#d9ccb3;min-height:1.3em;text-align:center;margin-bottom:10px}#book .ghint b{color:#f2a541}
#book .grow{display:flex;justify-content:center;align-items:flex-start;gap:8px;flex-wrap:wrap}
#book .grp{display:flex;gap:8px;padding:8px 10px 6px;border-radius:14px;background:rgba(255,255,255,.025);box-shadow:inset 0 0 0 1px rgba(255,255,255,.05)}
#book .gs{--c:#6a6478;position:relative;width:50px;height:50px;border-radius:50%;display:grid;place-items:center;color:var(--c);cursor:pointer;touch-action:none;user-select:none;-webkit-user-select:none;margin-bottom:12px;
  background:radial-gradient(circle at 50% 30%,rgba(70,52,120,.9),rgba(12,9,26,.96) 72%);box-shadow:inset 0 0 0 1.5px color-mix(in srgb,var(--c) 70%,transparent),0 0 14px -6px var(--c),0 4px 10px rgba(0,0,0,.5);transition:transform .12s,box-shadow .15s}
#book .gs svg{width:24px;height:24px;fill:currentColor;filter:drop-shadow(0 0 5px var(--c))}
#book .gs.e{background:rgba(10,8,22,.5);box-shadow:inset 0 0 0 1.5px rgba(232,223,204,.16)}#book .gs.e:after{content:'+';color:rgba(232,223,204,.25);font-size:20px}
#book .gs i{position:absolute;left:50%;bottom:-15px;transform:translateX(-50%);font:600 10px Outfit,system-ui,sans-serif;font-style:normal;color:#e6cfa0;opacity:.8}
#book .gs.tgt{animation:gpulse 1.1s infinite}#book .gs.pick{transform:translateY(-4px);box-shadow:inset 0 0 0 2px #f2a541,0 0 22px -4px #f2a541}#book .gs.over{transform:scale(1.12);box-shadow:inset 0 0 0 2px #fff,0 0 24px -4px #f2a541}#book .gs.fl{animation:gfl .45s}
@keyframes gpulse{50%{box-shadow:inset 0 0 0 2px #f2a541,0 0 20px -4px #f2a541}}@keyframes gfl{40%{transform:scale(1.25)}}
#book .gacts{display:flex;justify-content:center;gap:8px;margin-top:4px}#book .gacts button{border:1px solid rgba(232,223,204,.2);background:rgba(255,255,255,.04);color:#e8dfcc;border-radius:999px;padding:7px 14px;font:500 12.5px Outfit,system-ui,sans-serif;cursor:pointer}
#book .gacts button:hover:not(:disabled){border-color:#f2a541;color:#ffd59a}#book .gacts button:disabled{opacity:.35;cursor:default}
.gghost{position:fixed;z-index:70;width:54px;height:54px;margin:-27px 0 0 -27px;border-radius:50%;display:grid;place-items:center;pointer-events:none;color:var(--c);background:radial-gradient(circle at 50% 30%,rgba(70,52,120,.95),rgba(12,9,26,.95) 72%);box-shadow:inset 0 0 0 2px var(--c),0 0 26px -4px var(--c),0 10px 22px rgba(0,0,0,.6)}.gghost svg{width:26px;height:26px;fill:currentColor}
@media (max-width:760px),(max-height:520px){#book .gm{width:100vw;height:100dvh;border-radius:0;border:0}#book header{padding:12px 14px 4px}#book h2{font-size:28px}#book .gtabs{padding:4px 14px 8px}#book .glist{padding:4px 12px 10px;grid-template-columns:1fr}#book .gdock{padding:8px 10px 12px}#book .gt em{display:none}}
@media (max-height:520px) and (orientation:landscape){#book .gm{grid-template-columns:1fr minmax(290px,38%);grid-template-rows:auto auto 1fr}#book header{grid-column:1/3;padding:8px 14px 2px}#book .gsub{margin-top:2px}#book h2{font-size:24px}
  #book .gtabs{grid-column:1;padding:2px 12px 6px}#book .glist{grid-column:1;grid-row:3;grid-template-columns:repeat(auto-fill,minmax(230px,1fr))}#book .gdock{grid-column:2;grid-row:2/4;border-top:0;border-left:1px solid rgba(242,165,65,.2);display:flex;flex-direction:column;justify-content:center;padding:6px 10px}
  #book .grow{flex-direction:column;align-items:center}#book .grp{flex-wrap:wrap;justify-content:center;max-width:300px}#book .gs{width:44px;height:44px}#book .ghint{font-size:11.5px;margin-bottom:6px}#book .gacts{flex-wrap:wrap}#book .gacts button{padding:6px 10px;font-size:11.5px}}
/* HUD spell buttons, refreshed */
#spells{gap:8px;align-items:flex-end}
.spell{background:radial-gradient(circle at 50% 30%,rgba(70,52,120,.92),rgba(14,11,30,.96) 70%);box-shadow:0 0 0 1px rgba(255,236,200,.14),inset 0 0 0 2px color-mix(in srgb,var(--c) 65%,transparent),inset 0 -8px 14px rgba(0,0,0,.45),0 0 16px -7px var(--c),0 6px 14px rgba(0,0,0,.55);transition:transform .12s,filter .2s}
.spell svg{filter:drop-shadow(0 0 5px var(--c))}
body:not(.touch) .spell:hover{transform:translateY(-3px)}
body:not(.touch) #spells .spell .k{right:auto;left:50%;transform:translateX(-50%);bottom:-9px;width:auto;min-width:16px;height:15px;padding:0 4px;border-radius:5px;font:600 10px Outfit,system-ui,sans-serif;background:rgba(10,8,22,.94);box-shadow:inset 0 0 0 1px rgba(242,165,65,.45);color:#f2d9a8}
.spell .cdt{position:absolute;inset:0;display:grid;place-items:center;font:700 15px Outfit,system-ui,sans-serif;color:#fff;text-shadow:0 1px 3px #000,0 0 6px #000;z-index:3;pointer-events:none}
.spell.cool svg{opacity:.4}.spell.dry{filter:saturate(.35) brightness(.85)}
.spell.empty{background:rgba(10,8,22,.45);box-shadow:inset 0 0 0 1.5px rgba(232,223,204,.14)}
body:not(.touch) #spells .spell{width:50px;height:50px}body:not(.touch) #spells .spell.sec{width:44px;height:44px}body:not(.touch) #spells .spell.sec svg{width:21px;height:21px}
body:not(.touch) #spells .spell:nth-child(11){margin-left:14px}
.touch #spells .spell.sec{display:none!important}
body:not(.touch) #spells{transform-origin:50% 100%}
.spell .chg{position:absolute;inset:-4px;border-radius:50%;background:conic-gradient(var(--c) calc(var(--g,0)*1turn),transparent 0);-webkit-mask:radial-gradient(circle,transparent 58%,#000 60%);mask:radial-gradient(circle,transparent 58%,#000 60%);z-index:1;opacity:.95;pointer-events:none}
.spell.empty svg{opacity:0}#boostBar{height:3px;margin-top:3px;border-radius:2px;background:rgba(255,255,255,.12);overflow:hidden}#boostFill{height:100%;background:linear-gradient(90deg,#ff60c0,#ffd0f0);transform-origin:left;transform:scaleX(0)}
#spellBtn{margin-right:6px}`;document.head.appendChild(st)}
function toggleBook(){if(!started||CS.active)return;bookCSS();bookOpen=!bookOpen;if(bookOpen){bookSel=-1;GBK.slot=-1;bookWasPaused=paused;if(MODE!=='open')paused=true;buildBook()}else{gDragEnd(null);if(bookEl){bookEl.remove();bookEl=null}if(MODE!=='open')paused=bookWasPaused;renderBar();writeSave()}}
function blip(){tone(880,.07,'sine',.04,1.2)}
const castKindLbl=s=>({aim:'aimed',throw:'thrown'}[CAST_KIND[s.id]]||'instant');
function buildBook(){bookEl=document.createElement('div');bookEl.id='book';document.body.appendChild(bookEl);
  const n=slotN();const known=SPELLS.filter(spellKnown).length;
  const card=(s,i)=>{const kn=spellKnown(s);const src=s.teach?(kn?'Taught by Master Bilel':'Master Bilel teaches this'):(kn?`Level ${s.lvl}`:`Unlocks at level ${s.lvl}`);
    return `<div class="gc${kn?'':' lock'}" data-i="${i}" style="--c:${s.color}"><span class="gi"><svg viewBox="0 0 24 24">${ICON[s.id]}</svg></span><span class="gt"><b>${s.name}</b><small>${src} · ${s.cost} mana · ${s.cd}s · ${castKindLbl(s)}</small><em>${SPELL_INFO[s.id]||''}</em></span><span class="gk"></span></div>`};
  const slot=k=>`<div class="gs" data-k="${k}"><svg viewBox="0 0 24 24"></svg><i>${SLOTKEY[k]}</i></div>`;
  const row1=[...Array(Math.min(n,10)).keys()].map(slot).join(''),row2=n>10?[...Array(n-10).keys()].map(k=>slot(k+10)).join(''):'';
  bookEl.innerHTML=`<div class="gm" role="dialog" aria-label="Grimoire"><header><div><h2>Grimoire</h2><p class="gsub">${HERO.name} · level ${P.level}${W.evolved?' · Awakened':''} · ${known} of ${SPELLS.length} spells known</p></div><button class="gx" aria-label="Close">✕</button></header>
    <div class="gtabs"><button data-f="all">All spells</button><button data-f="known">Known</button><button data-f="bar">On my bar</button></div>
    <div class="glist">${SPELLS.map(card).join('')}</div>
    <div class="gdock"><div class="ghint"></div><div class="grow"><div class="grp">${row1}</div>${row2?`<div class="grp">${row2}</div>`:''}</div>
    <div class="gacts"><button data-a="clear">Clear slot</button><button data-a="fill">Fill empty slots</button><button data-a="reset">Reset bar</button></div></div></div>`;
  bookEl.addEventListener('pointerdown',e=>{if(e.target===bookEl)toggleBook()});bookEl.querySelector('.gx').addEventListener('click',toggleBook);
  bookEl.querySelectorAll('.gtabs button').forEach(b=>b.addEventListener('click',()=>{GBK.f=b.dataset.f;bookRefresh()}));
  bookEl.querySelectorAll('.gc').forEach(c=>c.addEventListener('pointerdown',e=>gDown(e,'card',+c.dataset.i)));
  bookEl.querySelectorAll('.gs').forEach(c=>c.addEventListener('pointerdown',e=>gDown(e,'slot',+c.dataset.k)));
  bookEl.querySelector('[data-a=clear]').addEventListener('click',()=>{if(GBK.slot>=0){P.bar[GBK.slot]=-1;GBK.flash=GBK.slot;GBK.slot=-1;bookChanged()}});
  bookEl.querySelector('[data-a=fill]').addEventListener('click',()=>{const free=[];for(let k=0;k<slotN();k++)if(!(P.bar[k]>=0))free.push(k);const todo=SPELLS.map((s,i)=>i).filter(i=>spellKnown(SPELLS[i])&&!P.bar.slice(0,slotN()).includes(i));while(free.length&&todo.length)P.bar[free.shift()]=todo.shift();bookChanged()});
  bookEl.querySelector('[data-a=reset]').addEventListener('click',()=>{const ks=SPELLS.map((s,i)=>i).filter(i=>spellKnown(SPELLS[i]));for(let k=0;k<NSLOT;k++)P.bar[k]=k<slotN()&&k<ks.length?ks[k]:-1;GBK.slot=-1;bookSel=-1;bookChanged()});
  bookRefresh()}
function bookChanged(){renderBar();bookRefresh();blip()}
function bookRefresh(){if(!bookEl)return;const n=slotN();
  bookEl.querySelectorAll('.gtabs button').forEach(b=>b.classList.toggle('on',b.dataset.f===GBK.f));
  bookEl.querySelectorAll('.gc').forEach(c=>{const i=+c.dataset.i,s=SPELLS[i],kn=spellKnown(s),k=P.bar.slice(0,n).indexOf(i);c.classList.toggle('sel',bookSel===i);
    c.style.display=GBK.f==='all'||(GBK.f==='known'&&kn)||(GBK.f==='bar'&&k>=0)?'':'none';const gk=c.querySelector('.gk');
    if(!kn){gk.className='gk lk';gk.textContent=s.teach?'Bilel':'Lv '+s.lvl}else if(k>=0){gk.className='gk';gk.textContent=SLOTKEY[k]}else{gk.className='gk off';gk.textContent='·'}});
  bookEl.querySelectorAll('.gs').forEach(el=>{const k=+el.dataset.k,si=P.bar[k],s=si>=0?SPELLS[si]:null;el.classList.toggle('e',!s);el.style.setProperty('--c',s?s.color:'#6a6478');el.querySelector('svg').innerHTML=s?ICON[s.id]:'';el.title=s?s.name:'Empty';
    el.classList.toggle('tgt',bookSel>=0);el.classList.toggle('pick',GBK.slot===k);if(GBK.flash===k){el.classList.remove('fl');void el.offsetWidth;el.classList.add('fl')}});GBK.flash=-1;
  const h=bookEl.querySelector('.ghint');const kk=isTouch?'':' (or press its key)';
  h.innerHTML=bookSel>=0?`Put <b>${SPELLS[bookSel].name}</b> in a slot${kk}.`:GBK.slot>=0?`Slot <b>${SLOTKEY[GBK.slot]}</b>: pick a spell for it, tap another slot to swap, or clear it.`:isTouch?'Tap a spell, then a slot. Drag a slot off the bar to empty it. Hold a spell button in a fight to charge it.':'Click a spell, then a slot, or drag it onto the bar. Drag a slot off the bar to empty it. Hold a spell key in a fight to charge it.';
  bookEl.querySelector('[data-a=clear]').disabled=!(GBK.slot>=0&&P.bar[GBK.slot]>=0)}
function gAssign(i,k){const old=P.bar.indexOf(i);if(old>=0&&old!==k)P.bar[old]=P.bar[k];P.bar[k]=i;bookSel=-1;GBK.slot=-1;GBK.flash=k;bookChanged()}
function gSwap(a,b){if(a===b)return;const t=P.bar[a];P.bar[a]=P.bar[b];P.bar[b]=t;GBK.slot=-1;GBK.flash=b;bookChanged()}
function gClickCard(i){const s=SPELLS[i];if(!spellKnown(s)){const c=bookEl.querySelector(`.gc[data-i="${i}"]`);c.classList.remove('shake');void c.offsetWidth;c.classList.add('shake');return}
  if(GBK.slot>=0){gAssign(i,GBK.slot);return}bookSel=bookSel===i?-1:i;bookRefresh();blip()}
function gClickSlot(k){if(bookSel>=0){gAssign(bookSel,k);return}if(GBK.slot>=0){if(GBK.slot===k)GBK.slot=-1;else{gSwap(GBK.slot,k);return}}else GBK.slot=k;bookRefresh();blip()}
function bookAssign(k){if(!bookEl)return;if(k>=slotN())return;gClickSlot(k)}
function bookKey(k){if(bookSel>=0)gAssign(bookSel,k);else gClickSlot(k)}
function gDown(e,kind,idx){if(e.button>0)return;GBK.p={kind,idx,x:e.clientX,y:e.clientY,moved:false,touch:e.pointerType==='touch'};
  addEventListener('pointermove',gMove);addEventListener('pointerup',gUp);addEventListener('pointercancel',gCancel)}
function gMove(e){const p=GBK.p;if(!p)return;if(!p.moved){const dx=e.clientX-p.x,dy=e.clientY-p.y;if(Math.hypot(dx,dy)<8)return;
    if(p.kind==='card'&&(!spellKnown(SPELLS[p.idx])||(p.touch&&Math.abs(dy)>Math.abs(dx)))){gCancel();return}if(p.kind==='slot'&&!(P.bar[p.idx]>=0)){gCancel();return}
    p.moved=true;const si=p.kind==='card'?p.idx:P.bar[p.idx];const s=SPELLS[si];const g=document.createElement('div');g.className='gghost';g.style.setProperty('--c',s.color);g.innerHTML=`<svg viewBox="0 0 24 24">${ICON[s.id]}</svg>`;document.body.appendChild(g);GBK.ghost=g}
  GBK.ghost.style.left=e.clientX+'px';GBK.ghost.style.top=e.clientY+'px';const t=document.elementFromPoint(e.clientX,e.clientY);const sl=t&&t.closest&&t.closest('#book .gs');
  bookEl.querySelectorAll('.gs.over').forEach(x=>{if(x!==sl)x.classList.remove('over')});if(sl)sl.classList.add('over')}
function gUp(e){const p=GBK.p;gDragEnd();if(!p)return;if(!p.moved){if(p.kind==='card')gClickCard(p.idx);else gClickSlot(p.idx);return}
  const t=document.elementFromPoint(e.clientX,e.clientY);const sl=t&&t.closest&&t.closest('#book .gs');
  if(sl){const k=+sl.dataset.k;if(p.kind==='card')gAssign(p.idx,k);else gSwap(p.idx,k)}else if(p.kind==='slot'&&!(t&&t.closest&&t.closest('#book .grow'))){P.bar[p.idx]=-1;GBK.slot=-1;bookChanged()}}
function gCancel(){gDragEnd()}
function gDragEnd(){GBK.p=null;if(GBK.ghost){GBK.ghost.remove();GBK.ghost=null}if(bookEl)bookEl.querySelectorAll('.gs.over').forEach(x=>x.classList.remove('over'));removeEventListener('pointermove',gMove);removeEventListener('pointerup',gUp);removeEventListener('pointercancel',gCancel)}
function layoutBar(){if(isTouch)return;const el=$('spells');if(!el)return;const mb=$('moveBtns');let L=20,R=20;const r=mb&&mb.getBoundingClientRect();
  if(r&&r.width>0&&r.bottom>innerHeight-100){if(r.left<innerWidth/2)L=r.right+16;else R=innerWidth-r.left+16}if(MODE==='open'){const op=$('owPrompt');const w=op?Math.max(op.offsetWidth,250):250;L=Math.max(L,w+30)}
  const avail=innerWidth-L-R;const prev=el.style.transform;el.style.transform='none';const w=el.scrollWidth||860;const sc=Math.min(1,avail/w);const t=`translateX(-50%) scale(${sc.toFixed(3)})`,lf=(L+avail/2).toFixed(0)+'px';el.style.transform=t;if(el.style.left!==lf)el.style.left=lf}
setInterval(layoutBar,1000);
addEventListener('resize',()=>setTimeout(layoutBar,50));setTimeout(layoutBar,500);
setInterval(()=>{if(!started)return;for(let k=0;k<spellEls.length;k++){const el=spellEls[k],si=P.bar[k],t=el.querySelector('.cdt');if(!t)continue;const s=si>=0?SPELLS[si]:null;const r=s?P.cds[si]:0;const txt=r>.95?String(Math.ceil(r)):'';if(t.textContent!==txt)t.textContent=txt;el.classList.toggle('cool',r>.05)}},100);
let boostFill=null;
function progInit(){bookCSS();const b=document.createElement('button');b.id='spellBtn';b.className='mini';b.textContent='Spells (K)';b.addEventListener('click',e=>{e.stopPropagation();toggleBook()});const ab=$('autoBtn');ab.parentNode.insertBefore(b,ab);
  const fm=$('flyMeter');if(fm){const bb=document.createElement('div');bb.id='boostBar';bb.innerHTML='<div id="boostFill"></div>';fm.appendChild(bb);boostFill=$('boostFill');if(MODE!=='open')bb.style.display='none'}renderBar()}
function applySaveExtra(sv){if(Array.isArray(sv.bar)&&sv.bar.length>=9){const b=sv.bar.map(x=>typeof x==='number'&&x<SPELLS.length?x:-1);while(b.length<15)b.push(-1);P.bar=b.slice(0,15)}P.taught=new Set(sv.taught||[]);if(typeof BQ!=='undefined'){BQ.load(sv.bq);bqTrack()}renderBar();if(W.setEvolved)W.setEvolved(P.level>=30)}
function evolveMoment(){if(!W.setEvolved)return;const col=HERO.g==='f'?0xff2a3a:0x9a40ff;P.invuln=Math.max(P.invuln,2);P.shake=1.2;sfx.level();sfx.boom&&sfx.boom();
  for(let k=0;k<4;k++)after(k*.18,()=>{ring(P.pos,col,1,6+k*4,.6);runeFlash(P.pos,col,8+k*4,1.2)});flash(P.pos,col,14);
  SP.emit(V3(P.pos.x,P.pos.y+1.2,P.pos.z),{n:200,c0:0xffffff,c1:col,speed:14,life:1.2,s0:.8,s1:.1,grav:2});W.setEvolved(true);
  after(.6,()=>{toast(HERO.g==='f'?'Your cape bleeds crimson. Your power grows by 15%.':'Your cape turns to deep violet. Your power grows by 15%.','Awakening',true);if(typeof heroSay==='function')heroSay(HERO.g==='f'?'Enfin.':'Enfin.')})}
/* ---------- new spells ---------- */
function stinkCloud(at,r,dur,dps,slow,col){at.y=groundAt(at.x,at.z);const g=new THREE.Group();g.position.copy(at);const gl=glowSprite(col,r*2.2,.35);gl.position.y=1.2;g.add(gl);const mk=decal(runeTex,col,r*2,true,.45);mk.position.y=.1;g.add(mk);scene.add(g);let tk=0;
  addFx(g,dur,(f,k)=>{const dt=1/60;mk.rotation.z+=.01;gl.material.opacity=.35*(1-k*k);for(let n=0;n<3;n++){const a=rand(0,TAU),rr=rand(0,r);SM.emit(V3(at.x+Math.cos(a)*rr,at.y+rand(.2,2.2),at.z+Math.sin(a)*rr),{c0:0x9dff5a,c1:0x305010,s0:1.4,s1:3.4,life:1.3,a:.35,up:.5})}
    tk-=dt;if(tk<=0){tk=.5;for(const e of enemies){if(e.dead)continue;if(Math.hypot(e.pos.x-at.x,e.pos.z-at.z)<r+e.def.r){e.pois=Math.max(e.pois||0,2.5);e.poisDps=Math.max(e.poisDps||0,dps);e.slow=Math.max(e.slow,slow);if(!e.def.boss&&Math.random()<.25)e.stun=Math.max(e.stun,.4)}}
      if(MODE==='open')npcNear(at.x,at.z,r+2,n=>{if(n.st!=='dead'&&n.st!=='compel'){n.st='flee';n.t=rand(3,5);n.fleeA=Math.atan2(n.x-at.x,n.z-at.z);if(Math.random()<.3)bubble(n,pickR(Math.random,['Beurk!','Ça pue!','Oh la la, the smell!','Who did that?!','Mon Dieu...']),1.8)}})}})}
function fartSfx(){if(!AC||muted)return;tone(70,.5,'sawtooth',.08,.6);tone(55,.45,'square',.05,.7,.05);noise(.35,.08,300,'lowpass')}
Object.assign(CAST,{
  poison(t){const at=t?t.pos.clone():P.pos.clone().add(V3(Math.sin(P.face),0,Math.cos(P.face)).multiplyScalar(9));const r=6.5*Math.sqrt(P.chgMulT>0?P.chgMul:1);fartSfx();
    const o=orbPos();const blob=new THREE.Group();blob.add(glowSprite(0x9dff5a,3));scene.add(blob);const st=o.clone(),en=V3(at.x,groundAt(at.x,at.z)+1,at.z);
    addFx(blob,.45,(f,k)=>{blob.position.lerpVectors(st,en,k);blob.position.y+=Math.sin(k*Math.PI)*3;SM.emit(blob.position,{c0:0xb8ff70,c1:0x305010,s0:.8,s1:1.6,life:.6,a:.4})},()=>{stinkCloud(at,r,6,14*power(),.6,0x9dff5a);ring(at,0x9dff5a,.5,r,.4);SP.emit(V3(at.x,at.y+1,at.z),{n:50,c0:0xe0ffb0,c1:0x407010,speed:7,life:.8,s0:.6,s1:.1})})},
  venom(t){const o=orbPos();const dir=aimDir(o,t);makeProj({from:o,dir,speed:34,dmg:40*power(),color:0x6ae04a,size:.5,pierce:4,homing:t?5:0,target:t,life:1.6,
    trail:p=>{SP.emit(p.pos,{n:3,c0:0xd0ff90,c1:0x205010,s0:.5,s1:.1,life:.45,speed:.6});if(Math.random()<.4)SM.emit(p.pos,{c0:0x8ad050,c1:0x203010,s0:.6,s1:1.4,life:.7,a:.35})},
    onHit:e=>{e.pois=Math.max(e.pois||0,5);e.poisDps=Math.max(e.poisDps||0,18*power());e.slow=Math.max(e.slow,1.5)}});sfx.hiss&&sfx.hiss()},
  plague(){const c=P.pos.clone();fartSfx();sfx.frost&&sfx.frost();flash(c,0x9dff5a,8);ring(c,0xc6ff3a,1,15,.6);groundMark(scorchTex,c,0x9dff5a,26,4,true,.7);
    SP.emit(V3(c.x,c.y+1,c.z),{n:140,c0:0xe8ffb0,c1:0x3a6010,speed:15,life:.9,s0:.8,s1:.15,flat:true});
    for(const e of enemies){if(e.dead)continue;const d=Math.hypot(e.pos.x-c.x,e.pos.z-c.z);if(d<15){damageEnemy(e,70*power(),'#c6ff3a');if(!e.dead){e.pois=Math.max(e.pois||0,6);e.poisDps=Math.max(e.poisDps||0,22*power());if(!e.def.boss){const a=Math.atan2(e.pos.x-c.x,e.pos.z-c.z);e.pos.x+=Math.sin(a)*4;e.pos.z+=Math.cos(a)*4;e.stun=Math.max(e.stun,.8)}}}}
    stinkCloud(c,9,4,10*power(),.4,0xc6ff3a)},
  storm(){let n=Math.round(14*(P.chgMulT>0?P.chgMul:1));sfx.chain&&sfx.chain();const cl=new THREE.Group();const cg=glowSprite(0x5a6a9a,14,.5);cl.add(cg);scene.add(cl);
    addFx(cl,5,(f,k)=>{cl.position.set(P.pos.x,P.pos.y+16,P.pos.z);if(Math.random()<.5)SM.emit(V3(P.pos.x+rand(-6,6),P.pos.y+rand(14,18),P.pos.z+rand(-6,6)),{c0:0x3a3a5a,c1:0x10101a,s0:3,s1:6,life:1.2,a:.5})});
    for(let k=0;k<n;k++)after(.2+k*.34,()=>{const list=enemies.filter(e=>!e.dead&&e.pos.distanceTo(P.pos)<32);const e=list.length?list[(Math.random()*list.length)|0]:null;const at=e?eCenter(e):P.pos.clone().add(V3(rand(-12,12),0,rand(-12,12)));
      lightning(V3(at.x+rand(-2,2),P.pos.y+16,at.z+rand(-2,2)),at,0xe6f0ff);flash(at,0xbfd8ff,4);noise(.25,.14,2600);if(e){damageEnemy(e,55*power(),'#cfe0ff');if(!e.dead)e.stun=Math.max(e.stun,e.def.boss?.2:.6)}})},
  aegis(){P.shield=Math.round(maxHP()*.4*(P.chgMulT>0?P.chgMul:1));P.shieldT=8;sfx.chains&&sfx.chains();runeFlash(P.pos,0xf2d27a,6,1);
    if(!W.shieldM){const m=new THREE.Mesh(new THREE.SphereGeometry(1.35,24,16),new THREE.MeshBasicMaterial({color:0xf2d27a,transparent:true,opacity:.18,blending:THREE.AdditiveBlending,depthWrite:false,side:THREE.DoubleSide}));m.position.y=1.1;W.g.add(m);W.shieldM=m;m.userData.hit=0}
    W.shieldM.visible=true;toast(`Shield: absorbs ${P.shield} damage`)},
  starfall(t){const at=t?t.pos.clone():P.pos.clone().add(V3(Math.sin(P.face),0,Math.cos(P.face)).multiplyScalar(12));const n=Math.round(14*(P.chgMulT>0?P.chgMul:1));runeFlash(at,0xffe08a,18,1.5);
    for(let k=0;k<n;k++)after(k*.12,()=>{const p=at.clone().add(V3(rand(-8,8),0,rand(-8,8)));p.y=groundAt(p.x,p.z);const st=p.clone().add(V3(rand(-6,6),38,rand(-6,6)));const g=new THREE.Group();g.add(glowSprite(0xffe08a,3));scene.add(g);
      addFx(g,.55,(f,kk)=>{g.position.lerpVectors(st,p,kk*kk);SP.emit(g.position,{n:2,c0:0xffffff,c1:0xffc040,s0:.6,s1:.1,life:.3})},()=>{explode(p,3.6,60*power(),0xffe08a,false)})})},
  eclipse(){const at=P.pos.clone().add(V3(Math.sin(P.face),0,Math.cos(P.face)).multiplyScalar(6));at.y=groundAt(at.x,at.z);const g=new THREE.Group();g.position.set(at.x,at.y+5,at.z);
    const core=new THREE.Mesh(G.sphere,MAT.black);core.scale.setScalar(.2);g.add(core);const cor=glowSprite(0xff5a7a,4,.9);g.add(cor);scene.add(g);sfx.void&&sfx.void();
    addFx(g,1.3,(f,k)=>{core.scale.setScalar(.2+k*2.4);cor.scale.setScalar(4+k*16);for(const e of enemies){if(e.dead)continue;const dx=at.x-e.pos.x,dz=at.z-e.pos.z,d=Math.hypot(dx,dz);if(d<20&&d>1){const pl=(e.def.boss?1.5:7)/60;e.pos.x+=dx/d*pl;e.pos.z+=dz/d*pl}}
      for(let n=0;n<4;n++){const a=rand(0,TAU),r=rand(8,16);const p=V3(at.x+Math.sin(a)*r,at.y+rand(1,8),at.z+Math.cos(a)*r);SP.emit(p,{c0:0xffc0d0,c1:0x5a0020,s0:.5,s1:.1,life:.5,dir:V3(at.x-p.x,at.y+5-p.y,at.z-p.z).multiplyScalar(2),dirJ:1})}},
      ()=>{explode(V3(at.x,at.y,at.z),18,260*power(),0xff5a7a,true);flash(at,0xff5a7a,20);P.shake=1.5;ring(at,0xff9ab0,1,22,.7)})}
});
