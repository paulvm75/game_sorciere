
/* ---------- main menu v2: panel list, character viewer, settings ---------- */
const MMI={
 play:'<path d="M8 5v14l11-7z"/>',
 book:'<path d="M12 6.5C10.3 5.3 7.9 4.8 4 5v13c3.9-.2 6.3.3 8 1.5 1.7-1.2 4.1-1.7 8-1.5V5c-3.9-.2-6.3.3-8 1.5zm-1 10.7c-1.6-.8-3.6-1.2-6-1.2V6.9c2.5 0 4.4.4 6 1.4v8.9zm8-1.2c-2.4 0-4.4.4-6 1.2V8.3c1.6-1 3.5-1.4 6-1.4V16z"/>',
 globe:'<path d="M12 2a10 10 0 100 20 10 10 0 000-20zm6.9 6h-3a15.7 15.7 0 00-1.4-3.6A8 8 0 0118.9 8zM12 4c.8 1.2 1.5 2.5 1.9 4h-3.8c.4-1.5 1.1-2.8 1.9-4zM4.3 14a8 8 0 010-4h3.4a16.5 16.5 0 000 4H4.3zm.8 2h3a15.7 15.7 0 001.4 3.6A8 8 0 015.1 16zm3-8h-3a8 8 0 014.4-3.6C8.9 5.5 8.4 6.7 8.1 8zM12 20c-.8-1.2-1.5-2.5-1.9-4h3.8c-.4 1.5-1.1 2.8-1.9 4zm2.3-6H9.7a14.7 14.7 0 010-4h4.6a14.7 14.7 0 010 4zm.2 5.6c.6-1.1 1.1-2.3 1.4-3.6h3a8 8 0 01-4.4 3.6zm1.8-5.6a16.5 16.5 0 000-4h3.4a8 8 0 010 4h-3.4z"/>',
 hat:'<path d="M12.6 1.6c-1.3 2-2.7 5.4-3.6 9.3-3.4.5-5.9 1.6-5.9 2.9 0 1.8 4 3.2 8.9 3.2s8.9-1.4 8.9-3.2c0-1.3-2.4-2.4-5.7-2.9.1-1.9.6-3.6 1.6-4.8l-2.7.5c.3-1.9.9-3.5 1.6-4.6l-3.1-.4zM10.6 12.4c.5.1 1 .1 1.4.1.6 0 1.2 0 1.8-.1l.2 1.3c-.6.1-1.3.1-2 .1-.6 0-1.2 0-1.7-.1l.3-1.3zM4.4 17.6c1.9 1.2 4.6 1.9 7.6 1.9s5.7-.7 7.6-1.9v1.2c-1.9 1.4-4.6 2.2-7.6 2.2s-5.7-.8-7.6-2.2v-1.2z"/>',
 gear:'<path d="M19.4 13c.1-.3.1-.7.1-1s0-.7-.1-1l2.1-1.6c.2-.2.2-.4.1-.6l-2-3.5c-.1-.2-.4-.3-.6-.2l-2.5 1c-.5-.4-1.1-.7-1.7-1l-.4-2.6c0-.2-.2-.4-.5-.4h-4c-.2 0-.4.2-.5.4l-.4 2.6c-.6.2-1.2.6-1.7 1l-2.5-1c-.2-.1-.5 0-.6.2l-2 3.5c-.1.2 0 .5.1.6L4.6 11c0 .3-.1.7-.1 1s0 .7.1 1l-2.1 1.6c-.2.2-.2.4-.1.6l2 3.5c.1.2.4.3.6.2l2.5-1c.5.4 1.1.7 1.7 1l.4 2.6c0 .2.2.4.5.4h4c.2 0 .4-.2.5-.4l.4-2.6c.6-.2 1.2-.6 1.7-1l2.5 1c.2.1.5 0 .6-.2l2-3.5c.1-.2.1-.5-.1-.6L19.4 13zM12 15.5a3.5 3.5 0 110-7 3.5 3.5 0 010 7z"/>',
 lock:'<path d="M17 9h-1V7a4 4 0 10-8 0v2H7a2 2 0 00-2 2v9a2 2 0 002 2h10a2 2 0 002-2v-9a2 2 0 00-2-2zm-7-2a2 2 0 114 0v2h-4V7zm2 10a2 2 0 110-4 2 2 0 010 4z"/>',
 list:'<path d="M4 5h2.5v2.5H4zm5 .2h11v2H9zM4 10.8h2.5v2.5H4zm5 .2h11v2H9zM4 16.5h2.5V19H4zm5 .2h11v2H9z"/>',
 tools:'<path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z"/>',
 back:'<path d="M15.4 7.4L14 6l-6 6 6 6 1.4-1.4L10.8 12z"/>',
 rotL:'<path d="M12 5V1L7 6l5 5V7a5 5 0 11-5 5H5a7 7 0 107-7z"/>',rotR:'<path d="M12 5V1l5 5-5 5V7a5 5 0 105 5h2a7 7 0 11-7-7z"/>',
 plus:'<path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6z"/>',minus:'<path d="M19 13H5v-2h14z"/>'};
const svgI=k=>`<svg viewBox="0 0 24 24" aria-hidden="true">${MMI[k]}</svg>`;
const MM={pilot:(()=>{try{return localStorage.getItem('sorciere-pilot')!=='0'}catch(e){return true}})(),confirmT:0,tipT:null};
const CVW={on:false,rot:0,cur:0,pitch:.1,curP:.1,dist:3.8,curD:3.8,ptrs:new Map(),pinch:0};
function mmStoryDone(){return !!(save&&(save.won||(save.beaten||[]).includes('illusion')))}
function mmLocked(){return !mmStoryDone()&&!MM.pilot}
function mmCSS(){const st=document.createElement('style');st.textContent=`
#start.mm2{display:block;padding:0;text-align:left;background:linear-gradient(90deg,rgba(8,6,20,0) 26%,rgba(8,6,20,.45) 48%,rgba(8,6,20,.82) 78%,rgba(8,6,20,.92))}
#start.mm2>*:not(#mm):not(#mmChar):not(#mmDrag):not(#mmLegacy){display:none!important}#mmLegacy{display:none!important}
#mm{position:absolute;right:max(5vw,24px);top:50%;transform:translateY(-50%);width:min(470px,92vw);max-height:96vh;overflow:auto;scrollbar-width:none}
#mm::-webkit-scrollbar{display:none}
#mm.sub h1,#mm.sub .mmTag,#mm.sub .mmFoot{display:none}#mm.sub .mmHd{margin-top:0}
#mm h1{margin:0;font:400 clamp(58px,7vw,96px)/.95 'Pirata One',Georgia,serif;color:#f2a541;text-shadow:0 4px 30px rgba(0,0,0,.6),0 0 40px rgba(242,165,65,.18);letter-spacing:1px}
#mm .mmTag{margin:6px 0 4px;font:italic 15px/1.4 Georgia,serif;color:#e8dfcc;opacity:.8;max-width:40ch}
#mm .loadMsg{display:block!important;margin:0 0 14px;min-height:0}#mm .loadMsg:empty{display:none!important}
.mmList{display:flex;flex-direction:column;gap:9px;margin-top:16px}
.mi{--a:242,165,65;position:relative;display:grid;grid-template-columns:50px 1fr auto;align-items:center;gap:14px;width:100%;padding:11px 18px 11px 11px;text-align:left;cursor:pointer;color:#e8dfcc;font:inherit;
  background:linear-gradient(90deg,rgba(16,11,30,.94),rgba(16,11,30,.8) 65%,rgba(16,11,30,.45));border:1px solid rgba(var(--a),.16);border-radius:4px;box-shadow:0 8px 24px rgba(0,0,0,.35),inset 0 1px 0 rgba(255,240,210,.04);transition:border-color .2s,box-shadow .2s,transform .15s,background .2s}
.mi:before,.mi:after{content:'';position:absolute;top:50%;width:7px;height:7px;margin-top:-4px;transform:rotate(45deg);background:rgba(var(--a),.35);transition:background .2s}.mi:before{left:-4px}.mi:after{right:-4px}
.mi:hover,.mi:focus-visible,.mi.pri{border-color:rgba(var(--a),.7);box-shadow:0 0 0 1px rgba(var(--a),.18),0 0 28px -6px rgba(var(--a),.55),0 8px 24px rgba(0,0,0,.4),inset 0 0 30px -12px rgba(var(--a),.5);outline:none}
.mi:hover:before,.mi:hover:after,.mi.pri:before,.mi.pri:after{background:rgba(var(--a),.95)}
.mi:hover{transform:translateX(-3px)}.mi:active{transform:translateX(-1px) scale(.995)}
.mi .mic{width:46px;height:46px;border-radius:50%;display:grid;place-items:center;background:radial-gradient(circle at 50% 30%,rgba(60,44,100,.9),rgba(10,8,20,.95) 72%);box-shadow:inset 0 0 0 1px rgba(var(--a),.45),0 0 14px -6px rgba(var(--a),.7)}
.mi .mic svg{width:22px;height:22px;fill:#f3e6c8;filter:drop-shadow(0 0 4px rgba(var(--a),.5))}.mi.pri .mic svg{fill:#ffd08a}
.mi b{display:block;font:600 20px/1.15 Cinzel,Georgia,serif;letter-spacing:1.2px;font-variant:small-caps;color:#f6ecd8}.mi.pri b{color:#ffd59a}
.mi small{display:block;margin-top:3px;font:14px/1.3 Georgia,serif;color:#d8ccb4;opacity:.82}
.mi .mlk svg{width:22px;height:22px;fill:#cfc4b0;opacity:.8}
.mi.lockd{cursor:default}.mi.lockd b,.mi.lockd small,.mi.lockd .mic{opacity:.55}.mi.lockd:hover{transform:none;border-color:rgba(232,223,204,.3);box-shadow:0 8px 24px rgba(0,0,0,.35)}
.mi.warn{--a:255,110,90}.mi.warn b{color:#ffb0a0}
.mi.shake{animation:mmShake .35s}@keyframes mmShake{25%{transform:translateX(-5px)}75%{transform:translateX(5px)}}
.mmTip{margin:-2px 24px 2px;padding:10px 14px;text-align:center;font:14px/1.4 Georgia,serif;color:#e8dfcc;background:rgba(12,9,22,.92);border:1px solid rgba(232,223,204,.18);border-radius:4px;display:none}.mmTip.on{display:block;animation:mmIn .25s}
@keyframes mmIn{from{opacity:0;transform:translateY(-4px)}}
.mmPilot{--a:90,230,130;display:grid;grid-template-columns:34px 1fr;gap:10px;align-items:center;padding:7px 14px;margin:2px 0 -3px 34px;border:1px solid rgba(var(--a),.55);border-radius:4px;background:linear-gradient(90deg,rgba(10,30,18,.9),rgba(10,24,16,.6));box-shadow:0 0 18px -6px rgba(var(--a),.6);cursor:pointer}
.mmPilot svg{width:22px;height:22px;fill:#7af0a0;filter:drop-shadow(0 0 5px rgba(90,230,130,.7))}.mmPilot b{display:block;font:600 14px Cinzel,Georgia,serif;letter-spacing:1px;color:#c8ffd8}.mmPilot small{display:block;font:12px Georgia,serif;color:#a8dcb8;opacity:.85}
.mi.unl{--a:110,170,255}
.mmFoot{margin:14px 2px 0;font:12.5px/1.45 Outfit,system-ui,sans-serif;color:#cfc4b0;opacity:.6}
/* sub panels */
.mmCard{display:none;flex-direction:column;gap:12px}.mmCard.on{display:flex}.mmList.off{display:none}
.mmHd{display:flex;align-items:center;gap:12px;margin-top:14px}.mmHd h2{margin:0;font:600 26px Cinzel,Georgia,serif;letter-spacing:1.5px;color:#f6ecd8;font-variant:small-caps}
.mmBack{width:40px;height:40px;border-radius:50%;border:1px solid rgba(242,165,65,.45);background:rgba(16,11,30,.85);cursor:pointer;display:grid;place-items:center}.mmBack svg{width:22px;height:22px;fill:#f2d9a8}.mmBack:hover{border-color:#f2a541}
.mmRow{display:grid;grid-template-columns:1fr auto;gap:12px;align-items:center;padding:12px 16px;background:linear-gradient(90deg,rgba(16,11,30,.92),rgba(16,11,30,.7));border:1px solid rgba(242,165,65,.14);border-radius:4px}
.mmRow b{display:block;font:600 16px Cinzel,Georgia,serif;letter-spacing:1px;color:#f6ecd8}.mmRow small{display:block;font:13px/1.35 Georgia,serif;color:#d8ccb4;opacity:.75;margin-top:2px}
.mmTg{min-width:74px;padding:7px 12px;border-radius:999px;border:1px solid rgba(232,223,204,.25);background:rgba(255,255,255,.04);color:#e8dfcc;font:600 13px Outfit,system-ui,sans-serif;cursor:pointer}.mmTg.on{background:rgba(242,165,65,.2);border-color:#f2a541;color:#ffd59a}.mmTg.grn.on{background:rgba(90,230,130,.16);border-color:#5ae682;color:#bfffd2}
.mmRow .seg{margin-top:8px}.mmRow #diffDesc{margin-top:6px}
#mmChar{position:absolute;right:max(5vw,24px);top:50%;transform:translateY(-50%);width:min(400px,92vw);display:none;flex-direction:column;gap:12px;z-index:2}#mmChar.on{display:flex}
#mmChar .mmName{width:100%;box-sizing:border-box}#mmChar #nameIn{font:600 20px Cinzel,Georgia,serif;letter-spacing:1px;padding:12px 14px;background:rgba(16,11,30,.9)}
.mmStats{display:grid;grid-template-columns:repeat(2,1fr);gap:8px}.mmStats div{padding:10px 12px;background:rgba(16,11,30,.85);border:1px solid rgba(242,165,65,.14);border-radius:4px}.mmStats b{display:block;font:400 26px 'Pirata One',Georgia,serif;color:#f2a541;line-height:1}.mmStats span{font:12px Outfit,system-ui,sans-serif;opacity:.7}
.mmTools{display:flex;gap:8px;justify-content:center}.mmTools button{width:44px;height:44px;border-radius:50%;border:1px solid rgba(242,165,65,.35);background:rgba(16,11,30,.85);cursor:pointer;display:grid;place-items:center}.mmTools button svg{width:20px;height:20px;fill:#f2d9a8}.mmTools button:hover{border-color:#f2a541}
.mmHint{font:12.5px Outfit,system-ui,sans-serif;opacity:.65;text-align:center;margin:0}
#mmDrag{position:absolute;inset:0;display:none;cursor:grab;touch-action:none}#mmDrag.on{display:block}#mmDrag:active{cursor:grabbing}
#start.mm2.cv{background:linear-gradient(90deg,rgba(8,6,20,0) 45%,rgba(8,6,20,.55) 70%,rgba(8,6,20,.85))}#start.mm2.cv #mm{display:none}
@media (max-width:760px){#start.mm2{background:linear-gradient(180deg,rgba(8,6,20,0) 14%,rgba(8,6,20,.7) 40%,rgba(8,6,20,.95) 62%)}
  #mm{right:12px;left:12px;width:auto;top:auto;bottom:calc(10px + env(safe-area-inset-bottom,0px));transform:none;max-height:72vh}#mm h1{font-size:52px}#mm .mmTag{font-size:13px}
  .mi{grid-template-columns:42px 1fr auto;padding:8px 12px 8px 8px;gap:10px}.mi .mic{width:38px;height:38px}.mi b{font-size:17px}.mi small{font-size:12.5px}.mmFoot{display:none}
  #start.mm2.cv{background:linear-gradient(180deg,rgba(8,6,20,0) 40%,rgba(8,6,20,.85) 68%)}#mmChar{right:12px;left:12px;width:auto;top:auto;bottom:calc(10px + env(safe-area-inset-bottom,0px));transform:none;gap:8px}.mmStats{grid-template-columns:repeat(4,1fr)}.mmStats b{font-size:20px}}
@media (max-height:520px) and (min-width:761px){#mm h1{font-size:44px}.mi{padding:6px 14px 6px 8px}.mi .mic{width:36px;height:36px}.mi b{font-size:16px}.mi small{font-size:12px}.mmList{gap:6px;margin-top:8px}.mmFoot{display:none}}`;document.head.appendChild(st)}
function mmBuild(){mmCSS();const S=$('start');
  /* only Maëlle for now */
  DEF_NAME.m=DEF_NAME.f;if(HERO.g!=='f')setHero('f');if(save&&save.hero==='m')save.hero='f';
  const leg=document.createElement('div');leg.id='mmLegacy';[...S.children].forEach(c=>{if(c.tagName!=='H1'&&c.id!=='loadMsg')leg.appendChild(c)});S.appendChild(leg);
  const h1=S.querySelector('h1');const lm=$('loadMsg');
  const mm=document.createElement('div');mm.id='mm';S.appendChild(mm);mm.appendChild(h1);
  const tag=document.createElement('p');tag.className='mmTag';tag.textContent=MODE==='open'?'All of Paris, after dark. Nobody can stop you.':'One endless night in Paris. Seven demons, one old master, and you.';mm.appendChild(tag);if(lm){lm.textContent='';mm.appendChild(lm)}
  const list=document.createElement('nav');list.className='mmList';list.setAttribute('aria-label','Main menu');mm.appendChild(list);
  const setC=document.createElement('div');setC.className='mmCard';setC.id='mmSet';mm.appendChild(setC);
  const foot=document.createElement('p');foot.className='mmFoot';foot.textContent=isTouch?'':'WASD move · Shift sprint · Space jump, again to fly · F blink · 1-0 and Z X V G H cast · K grimoire'+(MODE==='open'?' · E talk · M map':'');mm.appendChild(foot);
  const ch=document.createElement('div');ch.id='mmChar';S.appendChild(ch);const dr=document.createElement('div');dr.id='mmDrag';S.insertBefore(dr,ch);
  S.classList.add('mm2');mmList();mmSettings();mmChar();mmDragInit()}
function mmItem(a,icon,title,sub,cls,extra){return `<button class="mi ${cls||''}" data-a="${a}"><span class="mic">${svgI(icon)}</span><span class="mtx"><b>${title}</b><small>${sub}</small></span><span class="mlk">${extra||''}</span></button>`}
function mmList(){const L=document.querySelector('.mmList');const hasSave=!!(save&&save.level);const nm=(save&&save.name)||HERO.name;let h='';
  if(MODE==='open'){h+=mmItem('ow','globe','Enter open world',hasSave?`Explore Paris as ${nm}, level ${save.level}`:'Explore all of Paris freely','pri unl');
    h+=mmItem('story','book','Enter story',hasSave?'Back to the main campaign':'Begin the main campaign')}
  else{if(hasSave)h+=mmItem('cont','play','Continue',`${nm}, level ${save.level}${save.won?' · the night is won':''}`,'pri');
    h+=mmItem('story','book',hasSave?'New night':'Enter story',hasSave?'Start the campaign again from the beginning':'Begin the main campaign',hasSave?'':'pri');
    if(hasSave)h+=mmItem('chap','list','Chapters','Replay any part of the night');
    if(!mmStoryDone()&&MM.pilot)h+=`<div class="mmPilot" data-a="pilot" title="Turn off in Settings">${svgI('tools')}<span><b>Pilot mode active</b><small>Development restrictions disabled</small></span></div>`;
    const lk=mmLocked();h+=mmItem('ow','globe','Enter open world',lk?'Complete the story to unlock':mmStoryDone()?'All of Paris, yours to explore':'Explore freely from the beginning',lk?'lockd':'unl',lk?svgI('lock'):'');
    h+='<div class="mmTip" id="mmTip">The open world will be available after completing the main story.</div>'}
  h+=mmItem('char','hat','Character',`${nm} · name, look, stats`);h+=mmItem('set','gear','Settings','Difficulty, sound, graphics');
  L.innerHTML=h;L.querySelectorAll('.mi,.mmPilot').forEach(b=>b.addEventListener('click',()=>mmAct(b.dataset.a,b)))}
function mmAct(a,b){initAudio();sfx.blip&&sfx.blip();
  if(a==='cont'){$('continueBtn').click();return}
  if(a==='story'){if(MODE==='open'){mmAuto('story');setMode('story');return}
    if(save&&save.level){if(performance.now()-MM.confirmT>4000){MM.confirmT=performance.now();b.classList.add('warn');b.querySelector('b').textContent='Start over?';b.querySelector('small').textContent='This replaces your saved night. Click again to confirm.';setTimeout(()=>{if(performance.now()-MM.confirmT>=3900)mmList()},4000);return}}
    $('newBtn').click();return}
  if(a==='chap'){$('chapBtn').click();return}
  if(a==='ow'){if(MODE==='open'){$('owGo').click();return}if(mmLocked()){b.classList.remove('shake');void b.offsetWidth;b.classList.add('shake');const t=$('mmTip');t.classList.add('on');clearTimeout(MM.tipT);MM.tipT=setTimeout(()=>t.classList.remove('on'),3500);return}mmAuto('ow');setMode('open');return}
  if(a==='char'){mmOpenChar();return}
  if(a==='set'||a==='pilot'){mmShowSet(true);return}}
function mmAuto(v){try{localStorage.setItem('sorciere-auto',v)}catch(e){}}
/* ---------- settings ---------- */
function mmSettings(){const C=$('mmSet');const row=(id,t,d,cls)=>`<div class="mmRow"><span><b>${t}</b><small>${d}</small></span><button class="mmTg ${cls||''}" id="${id}"></button></div>`;
  C.innerHTML=`<div class="mmHd"><button class="mmBack" aria-label="Back">${svgI('back')}</button><h2>Settings</h2></div>
  <div class="mmRow" style="grid-template-columns:1fr"><span><b>Difficulty</b><small>How hard the night hits back.</small></span><div id="mmDiff"></div></div>
  ${row('mmSnd','Sound','Effects and voices')}${row('mmMus','Music','The score of the night')}${row('mmGfx','Graphics','Lower it if the game stutters')}
  ${MODE==='open'?row('mmSafe','Safe mode','Quest monsters cannot hurt you'):''}${row('mmPil','Pilot mode','Development restrictions disabled. Opens the open world before the story is done.','grn')}`;
  const d=$('mmDiff');d.appendChild($('diffSeg'));d.appendChild($('diffDesc'));
  C.querySelector('.mmBack').addEventListener('click',()=>mmShowSet(false));
  $('mmSnd').addEventListener('click',()=>{$('soundBtn').click();mmSync()});$('mmMus').addEventListener('click',()=>{$('musicBtn').click();mmSync()});$('mmGfx').addEventListener('click',()=>{$('gfxBtn').click();mmSync()});
  if($('mmSafe'))$('mmSafe').addEventListener('click',()=>{$('safeBtn').click();mmSync()});
  $('mmPil').addEventListener('click',()=>{MM.pilot=!MM.pilot;try{localStorage.setItem('sorciere-pilot',MM.pilot?'1':'0')}catch(e){}mmSync();mmList()});mmSync()}
function mmSync(){const t=(id,on,txt)=>{const b=$(id);if(!b)return;b.classList.toggle('on',on);b.textContent=txt||(on?'On':'Off')};t('mmSnd',!muted);t('mmMus',!!musicOn);t('mmGfx',true,(($('gfxBtn')||{}).textContent||'').replace('Graphics: ','')||'Auto');if(typeof SAFE!=='undefined')t('mmSafe',SAFE);t('mmPil',MM.pilot)}
function mmShowSet(on){$('mm').classList.toggle('sub',on);document.querySelector('.mmList').classList.toggle('off',on);$('mmSet').classList.toggle('on',on);if(on)mmSync();else mmList()}
/* ---------- character viewer ---------- */
function mmChar(){const C=$('mmChar');const lv=save&&save.level||1;const kn=SPELLS.filter(s=>!s.teach&&(MODE==='open'||lv>=s.lvl)).length+((save&&save.taught)||[]).length;const bt=((save&&save.beaten)||[]).filter(b=>BOSS_ORDER.includes(b)).length;
  C.innerHTML=`<div class="mmHd"><button class="mmBack" aria-label="Back">${svgI('back')}</button><h2>Character</h2></div>
  <div class="mmRow" style="grid-template-columns:1fr"><span><b>Name</b><small>She answers to it. Mostly.</small></span><div class="mmName"></div></div>
  <div class="mmStats"><div><b>${lv}</b><span>Level</span></div><div><b>${kn}</b><span>Spells known</span></div><div><b>${bt}/${BOSS_ORDER.length}</b><span>Demons beaten</span></div><div><b>${(save&&save.kills)||0}</b><span>Monsters slain</span></div></div>
  <div class="mmRow"><span><b>${lv>=30?'Awakened':'Apprentice witch'}</b><small>${lv>=30?'Crimson cape, power up by 15%.':'Her cape turns crimson at level 30.'}</small></span><span></span></div>
  <div class="mmTools"><button data-t="l" aria-label="Turn left">${svgI('rotL')}</button><button data-t="f" aria-label="Turn around" style="width:auto;padding:0 14px;border-radius:999px;font:600 12px Outfit,system-ui,sans-serif;color:#f2d9a8">Flip</button><button data-t="r" aria-label="Turn right">${svgI('rotR')}</button><button data-t="o" aria-label="Zoom out">${svgI('minus')}</button><button data-t="i" aria-label="Zoom in">${svgI('plus')}</button></div>
  <p class="mmHint">${isTouch?'Drag to turn her around · pinch to zoom · double tap to reset':'Drag to turn her around · scroll to zoom · double click to reset'}</p>`;
  C.querySelector('.mmName').appendChild($('nameIn'));
  const ni=$('nameIn');ni.addEventListener('change',mmName);ni.addEventListener('blur',mmName);ni.addEventListener('keydown',e=>{if(e.key==='Enter')ni.blur()});
  C.querySelector('.mmBack').addEventListener('click',mmCloseChar);
  C.querySelectorAll('.mmTools button').forEach(b=>b.addEventListener('click',()=>{const t=b.dataset.t;if(t==='l')CVW.rot-=Math.PI/4;if(t==='r')CVW.rot+=Math.PI/4;if(t==='f')CVW.rot+=Math.PI;if(t==='i')CVW.dist=Math.max(1.4,CVW.dist*.8);if(t==='o')CVW.dist=Math.min(8,CVW.dist*1.25)}))}
function mmName(){const v=($('nameIn').value||'').trim().slice(0,16)||DEF_NAME.f;$('nameIn').value=v;HERO.name=v;nameEdited=true;
  try{localStorage.setItem('sorciere-pre',JSON.stringify({g:'f',name:v}));if(save){save.name=v;localStorage.setItem(SAVE_KEY,JSON.stringify(save))}}catch(e){}mmList()}
function mmOpenChar(){CVW.on=true;CVW.rot=0;CVW.pitch=.1;CVW.dist=innerWidth<760?5.6:3.8;$('start').classList.add('cv');$('mmChar').classList.add('on');$('mmDrag').classList.add('on')}
function mmCloseChar(){mmName();CVW.on=false;$('start').classList.remove('cv');$('mmChar').classList.remove('on');$('mmDrag').classList.remove('on')}
function mmDragInit(){const D=$('mmDrag');
  D.addEventListener('pointerdown',e=>{D.setPointerCapture(e.pointerId);CVW.ptrs.set(e.pointerId,{x:e.clientX,y:e.clientY});if(CVW.ptrs.size===2){const[a,b]=[...CVW.ptrs.values()];CVW.pinch=Math.hypot(a.x-b.x,a.y-b.y)}});
  D.addEventListener('pointermove',e=>{const p=CVW.ptrs.get(e.pointerId);if(!p)return;const dx=e.clientX-p.x,dy=e.clientY-p.y;p.x=e.clientX;p.y=e.clientY;
    if(CVW.ptrs.size>=2){const[a,b]=[...CVW.ptrs.values()];const d=Math.hypot(a.x-b.x,a.y-b.y);if(CVW.pinch>0)CVW.dist=clamp(CVW.dist*CVW.pinch/d,1.4,8);CVW.pinch=d;return}
    CVW.rot+=dx*.012;CVW.pitch=clamp(CVW.pitch+dy*.006,-.25,1.15)});
  const up=e=>{CVW.ptrs.delete(e.pointerId);if(CVW.ptrs.size<2)CVW.pinch=0};D.addEventListener('pointerup',up);D.addEventListener('pointercancel',up);
  D.addEventListener('wheel',e=>{e.preventDefault();CVW.dist=clamp(CVW.dist*(1+Math.sign(e.deltaY)*.1),1.4,8)},{passive:false});
  D.addEventListener('dblclick',()=>{CVW.rot=0;CVW.pitch=.1;CVW.dist=innerWidth<760?5.6:3.8})}
{const _mp=menuPreview;menuPreview=function(dt,now){if(!CVW.on){CVW.cur=W.g.rotation.y;return _mp(dt,now)}const t=now*.001;const narrow=innerWidth<760;
  const k=1-Math.exp(-dt*9);CVW.cur+=(CVW.rot-CVW.cur)*k;CVW.curP+=(CVW.pitch-CVW.curP)*k;CVW.curD+=(CVW.dist-CVW.curD)*k;
  W.g.position.copy(SPAWN);W.g.rotation.y=CVW.cur;P.walkT=0;animateHero(dt,0,false,t);W.castArm.rotation.x=W.castBase+Math.sin(t*1.6)*.05;W.body.position.y=Math.sin(t*1.2)*.02;
  if(Math.random()<.3)SP.emit(orbPos(),{c0:W.orbCol,c1:0x3a1a80,s0:.35,s1:.05,life:.9,up:.7,speed:.5});
  const d=CVW.curD,zf=clamp((3.8-d)/2.4,0,1),ty=lerp(1.0,1.5,zf);const cy=Math.max(.2,ty+Math.sin(CVW.curP)*d);const hz=Math.cos(CVW.curP)*d;
  camera.position.set(SPAWN.x,cy,SPAWN.z+hz);const off=narrow?0:d*.36;camera.lookAt(SPAWN.x+off,narrow?ty-d*.13:ty,SPAWN.z);
  pLight.position.set(SPAWN.x+1.2,2.6,SPAWN.z+2.6);heroShadow.position.set(SPAWN.x,.06,SPAWN.z);P.pos.copy(SPAWN);updateLampLights(dt)}}
/* keep the player's chosen name when continuing */
for(const id of['continueBtn','owGo','newBtn'])if($(id))$(id).addEventListener('click',()=>{if(CVW.on)mmCloseChar();if(nameEdited){const v=($('nameIn').value||'').trim().slice(0,16);if(v)HERO.name=v}if(HERO.g!=='f')setHero('f')});
mmBuild();
/* switching modes reloads the page: carry on where the player was heading */
try{const a=localStorage.getItem('sorciere-auto');if(a){localStorage.removeItem('sorciere-auto');setTimeout(()=>{if(started)return;if(a==='ow'&&MODE==='open')$('owGo').click();else if(a==='story'&&MODE!=='open'){if(save&&save.level)$('continueBtn').click();else $('newBtn').click()}},300)}}catch(e){}
