/* ---------- chapter select + manual save ---------- */
const CHAPTERS=[
  {id:'kitsune',n:'I',title:'The Masked Fox',desc:'Hakuko hunts the rooftops.'},
  {id:'beast',n:'II',title:'The Crimson Nine-Tails',desc:'The fox shows her true form.'},
  {id:'giant',n:'III',title:'Hrímgar, the Frost Giant',desc:'Winter walks into Paris.'},
  {id:'catdemon',n:'IV',title:'Azurmaw',desc:'The cat demon of the Seine.'},
  {id:'slug',n:'V',title:'Gorgoloth',desc:'Something huge and slimy.'},
  {id:'bilel',n:'VI',title:'Master Bilel',desc:'Quests and poison spells with the old master.'},
  {id:'queen',n:'VII',title:'Morwen, Queen of the Abyss',desc:'Small, beautiful, deadly.'},
  {id:'illusion',n:'VIII',title:'Kaen Kuroshiba',desc:'The Master of Illusions. Final fight.'}];
const CLEARED=new Set();
function chapBoss(c){return c.id==='bilel'?null:c.id}
function chapIndexOf(id){return CHAPTERS.findIndex(c=>c.id===id)}
function chapCurrent(){if(MODE==='open')return null;for(const b of BOSS_ORDER){if(!beaten.has(b)){if(b==='queen'&&!BQ.done)return'bilel';return b}}return null}
function renderChapters(){const list=$('chapList');list.innerHTML='';const cur=started?chapCurrent():null;
  const lv=started?P.level:(save&&save.level)||1;
  CHAPTERS.forEach(c=>{const b=chapBoss(c);const d=b?ETYPES[b]:null;const done=b?CLEARED.has(b):(CLEARED.has('bilelq'));
    const el=document.createElement('button');el.className='chap'+(done?' done':'')+(cur===c.id?' cur':'');
    const tag=d?`Boss Lv ${d.lvl}`:'Quests';const k=d?d.lvl-lv:0;
    const hint=!d?'':k<=-8?'Easy for you':k<=-2?'You outlevel it':k<=2?'Even fight':k<=8?'Tough':'Very dangerous';
    el.innerHTML=`<span class="cn">Chapter ${c.n} · ${tag}</span><b>${c.title}</b><span class="cd">${c.desc}</span><span class="cs">${cur===c.id?'Current · ':''}${done?'Cleared':'Not cleared'}${hint?' · '+hint:''}</span>`;
    el.addEventListener('click',()=>pickChapter(c.id));list.appendChild(el)})}
function openChapters(){renderChapters();$('chapters').classList.remove('hidden');const f=$('chapList').querySelector('.cur')||$('chapList').firstChild;f&&f.focus&&f.focus()}
function closeChapters(){$('chapters').classList.add('hidden')}
function pickChapter(id){closeChapters();
  if(!started){startGame(!!(save&&save.level),true);applyChapter(id);return}
  if(paused){paused=false;$('pause').classList.add('hidden')}
  if(CS.active&&typeof endCutscene==='function')endCutscene();applyChapter(id)}
function applyChapter(id){const idx=chapIndexOf(id);if(idx<0||MODE==='open')return;const ch=CHAPTERS[idx];
  for(const e of enemies)removeEnemy(e);enemies.length=0;bossRef=null;$('boss').classList.add('hidden');
  if(typeof eProjs!=='undefined'){for(const p of eProjs)scene.remove(p.s);eProjs.length=0}
  beaten.clear();for(let i=0;i<idx;i++){const b=chapBoss(CHAPTERS[i]);if(b)beaten.add(b)}
  // Master Bilel state
  if(BQ.npc){scene.remove(BQ.npc.g);BQ.npc=null}for(const s of BQ.sacs)scene.remove(s);BQ.sacs.length=0;
  if(idx<=5){BQ.met=false;BQ.q=-1;BQ.cnt=0;BQ.done=false}
  else{BQ.met=true;BQ.q=BQUESTS.length;BQ.cnt=0;BQ.done=true;if(!BQ.x&&!BQ.z){const s=findSpot(SPAWN.x,SPAWN.z,6,12)||SPAWN;BQ.x=s.x;BQ.z=s.z}['poison','venom','plague'].forEach(t=>P.taught.add(t))}
  P._bqWait=0;P.lbStory=false;P.lbT=0;BQ.dead=false;if(FIN.ally){scene.remove(FIN.ally.g);FIN.ally=null}FIN.fight=0;
  // level gate: you may skip ahead, the boss must be able to appear
  const b=chapBoss(ch);const gate=b?ETYPES[b].gate||1:(ETYPES.slug.gate||1);
  if(P.level<gate){P.level=gate;P.xp=0;toast(`Raised to level ${gate}, the minimum for this chapter.`,'Chapter skip')}
  if(W.setEvolved)W.setEvolved(P.level>=30);
  if(P.weak){P.weak=false;P.stonesGot=0;for(const s of stones)scene.remove(s.g);stones.length=0}
  STATS.won=false;if(dawnK>0)setDawn(0);$('victory').classList.add('hidden');
  P.hp=maxHP();P.mp=maxMP();P.cds.fill(0);P.invuln=2;
  bossTimer=b?8:40;peaceT=0;
  renderBar();if(typeof bqTrack==='function')bqTrack();
  after(.3,()=>toast(b?`${ETYPES[b].name.split(',')[0]} (Lv ${ETYPES[b].lvl}) is coming for you.`:'Master Bilel is on his way.',`Chapter ${ch.n}: ${ch.title}`,true));
  writeSave()}
function manualSave(){writeSave();toast('Your progress is saved on this device.','Saved')}
function chaptersInit(){$('chapBtn').addEventListener('click',openChapters);$('chapBtn2').addEventListener('click',openChapters);$('chapClose').addEventListener('click',closeChapters);
  $('saveBtn').addEventListener('click',()=>{manualSave();$('saveBtn').textContent='Saved';setTimeout(()=>$('saveBtn').textContent='Save game',1500)});
  addEventListener('keydown',e=>{if(e.key==='Escape'&&!$('chapters').classList.contains('hidden')){closeChapters();e.stopPropagation()}},true);
  if(save&&Array.isArray(save.cleared))save.cleared.forEach(x=>CLEARED.add(x));if(save&&save.beaten)save.beaten.forEach(x=>CLEARED.add(x));if(save&&save.bq&&save.bq.done)CLEARED.add('bilelq')}
/* ---------- dialogue portraits ---------- */
const PORTRAITS={'Master Bilel':'bilel_face.webp'};const PORT_URL={};
function dlgPortrait(who){const f=PORTRAITS[who];const img=$('dlgPic');if(!img)return;if(!f){dlg.classList.remove('pic');return}
  const set=u=>{if(img.src!==u)img.src=u;dlg.classList.add('pic')};if(PORT_URL[f]){if(PORT_URL[f]!=='x')set(PORT_URL[f]);return}PORT_URL[f]='x';
  fetch('assets/'+f).then(r=>r.ok?r.blob():null).then(b=>{if(!b)return;PORT_URL[f]=URL.createObjectURL(b);if(dlgWho.textContent===who)set(PORT_URL[f])}).catch(()=>{})}
/* ---------- footsteps ---------- */
function footTick(dt){if(!P.onGround||P.swim||P.flying||P.climb||P.moveAmt<.1||!P.alive){P.stepAcc=.55;return}
  const run=P.moveAmt>1.05;const rate=(run?2.9:1.1+P.moveAmt*.9)*(P.lbT>0?1.35:1);P.stepAcc=(P.stepAcc||0)+dt*rate;if(P.stepAcc>=1){P.stepAcc-=1;footstep(run)}}
function footstep(run){if(!AC||muted)return;P.stepL=!P.stepL;const pan=P.stepL?-.14:.14;const soft=false;
  noise(run?.085:.07,(run?.2:.13)*(soft?.7:1),rand(soft?500:750,soft?800:1150),'lowpass',null,{brown:true,wet:.06,pan,attack:.003});
  if(soft)noise(.09,run?.05:.035,rand(2200,3400),'bandpass',null,{q:.8,wet:.04,pan});else noise(.028,run?.07:.045,rand(2600,4600),'highpass',null,{wet:.05,pan,attack:.001});
  if(run&&Math.random()<.3)noise(.05,.025,rand(5000,7000),'highpass',null,{delay:.03,pan})}
