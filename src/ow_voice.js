/* ================= VOICES, FREE TALK, COMPEL, STREET CONVERSATIONS ================= */
const VX={voices:[],fr:[],en:[],ready:false,speaking:null,pri:0,ai:undefined,aiP:null,aiOK:null,rec:null,recLang:'fr-FR'};
const V_FEM=/am[ée]lie|audrey|aur[ée]lie|marie|julie|hortense|c[ée]line|l[ée]a|virginie|google fran|samantha|karen|moira|tessa|fiona|victoria|zira|hazel|susan|female|femme|chantal|denise|elsa|jenny|aria|sonia|libby|natasha|serena|kate|allison|ava|joanna|salli|kimberly|ivy|emma|olivia|amy|nicole|sylvie|brigitte|eloise|vivienne|juliette|charlotte|coralie|ariane/i;
const V_MAL=/thomas|nicolas|paul|daniel|alex|fred|arthur|guillaume|mathieu|henri|male|homme|david|mark|george|rishi|oliver|claude|jacques|gordon|lee|aaron|tom|james|william|ryan|guy|brian|matthew|justin|joey|remy|antoine|jean|gerard|denis|alain|christophe|yves|vincent|fabrice|henri|remi/i;
function vxInit(){if(!('speechSynthesis' in window))return;const load=()=>{const v=speechSynthesis.getVoices();if(!v.length)return;VX.voices=v;VX.fr=v.filter(x=>/^fr/i.test(x.lang));VX.en=v.filter(x=>/^en/i.test(x.lang));
    for(const a of[VX.fr,VX.en])a.sort((p,q)=>(/(natural|neural|premium|enhanced|google)/i.test(q.name)?1:0)-(/(natural|neural|premium|enhanced|google)/i.test(p.name)?1:0));VX.ready=true};
  load();speechSynthesis.onvoiceschanged=load}
vxInit();
function vxGender(v){if(V_FEM.test(v.name))return'f';if(V_MAL.test(v.name))return'm';return'?'}
function detectLang(t){const s=' '+t.toLowerCase()+' ';let fr=0,en=0;fr+=(s.match(/[éèêàùçôî]/g)||[]).length*1.5;for(const w of[' le ',' la ',' les ',' un ',' une ',' est ',' pas ',' je ',' tu ',' vous ',' mais ',' oui ',' non ',' c\'est',' et ',' du ',' des ',' mon ',' ma ',' ça ',' très ',' bien ',' merci',' bonjour',' bonsoir',' avec ',' pour ',' dans ',' qui ',' quoi ',' il ',' elle ',' on ',' nous ',' allez'])if(s.includes(w))fr++;
  for(const w of[' the ',' is ',' are ',' you ',' i ',' it ',' this ',' that ',' what ',' my ',' your ',' with ',' for ',' and ',' not ',' have ',' do ',' of ',' to ',' in ',' me ',' we ',' so '])if(s.includes(w))en++;return fr>en?'fr':'en'}
function voiceFor(n,lang){const pool=lang==='fr'?VX.fr:VX.en;const alt=lang==='fr'?VX.en:VX.fr;const P=pool.length?pool:alt;if(!P.length)return null;const f=n&&n.L?n.L.f:true;
  const same=P.filter(v=>vxGender(v)===(f?'f':'m'));const unk=P.filter(v=>vxGender(v)==='?');const list=same.length?same:unk.length?unk:P;const seed=n&&n.seed?n.seed:7;const v=list[(seed>>>3)%Math.min(list.length,4)];
  const g=vxGender(v);let pitch=1,rate=1;if(g!==(f?'f':'m')&&g!=='?')pitch=f?1.35:.72;else pitch=f?1.05:.92;pitch*=.92+((seed>>>7)%17)/100;rate=.96+((seed>>>11)%13)/100;
  const a=n&&n.arch;if(a==='posh')rate*=.9;else if(a==='student'||a==='chat'||a==='tourist')rate*=1.06;else if(a==='elderly'){rate*=.86;pitch*=.93}if(n&&n.age>62)rate*=.94;return{v,pitch:clamp(pitch,.5,1.9),rate:clamp(rate,.7,1.35)}}
function ttsClean(t){return t.replace(/€(\d+)/g,'$1 euros').replace(/[“”«»"]/g,'').replace(/\.\.\./g,', ').replace(/[^\p{L}\p{N}\s.,!?'’:;()-]/gu,' ').trim()}
function sayLine(n,text,o={}){if(!text)return;const d=n&&n.x!==undefined?Math.hypot(n.x-P.pos.x,n.z-P.pos.z):0;if(muted)return;
  if(!('speechSynthesis' in window)||!VX.ready||!VX.voices.length){if(n&&n.pitch)voice(n.pitch,Math.min(9,Math.max(2,Math.round(text.length/10))),{q:text.endsWith('?'),vol:(o.vol||1)*.06});return}
  const pri=o.pri||1;if(speechSynthesis.speaking&&pri<VX.pri&&!o.queue)return;if(!o.queue)speechSynthesis.cancel();
  const lang=o.lang||detectLang(text);const vf=voiceFor(n,lang);const u=new SpeechSynthesisUtterance(ttsClean(text));if(vf){u.voice=vf.v;u.lang=vf.v.lang;u.pitch=vf.pitch;u.rate=vf.rate*(o.rate||1)}else u.lang=lang==='fr'?'fr-FR':'en-GB';
  u.volume=clamp((o.vol||1)*(1/(1+d*.07)),.05,1);VX.pri=pri;VX.speaking=n;u.onend=()=>{if(VX.speaking===n){VX.speaking=null;VX.pri=0}if(o.onend)o.onend()};u.onerror=u.onend;
  try{speechSynthesis.speak(u)}catch(e){}if(n&&n.st==='talk'&&!o.noAnim){n.talkAnim='talk'}}
function heroSay(text){if(muted||!('speechSynthesis' in window)||!VX.ready)return;const fake={seed:HERO.g==='f'?11:22,L:{f:HERO.g==='f'},arch:'hero',age:30};sayLine(fake,text,{pri:3})}
/* ---------- Claude, when the viewer allows it ---------- */
async function aiGet(){if(VX.ai!==undefined)return VX.ai;if(VX.aiP)return VX.aiP;VX.aiP=(async()=>{try{if(!window.claude||!window.claude.use){VX.ai=null;return null}const s=await window.claude.use('sample');VX.ai=s||null}catch(e){VX.ai=null}return VX.ai})();return VX.aiP}
aiGet();
function personaOf(n){const zn=zoneAt(n.x,n.z);const Z=typeof ziFor==='function'?ziFor(zn):{};const street=streetNameAt(n.x,n.z);const arr=arrAt(n.x,n.z);const h=OWS.tod;
  const arch={parisien:'an ordinary Parisian, a bit grumpy but warm underneath',tourist:'a tourist, excited, lost, takes photos',posh:'a very posh, snobbish resident of the beaux quartiers, condescending, obsessed with standards',hipster:'a hipster who loves natural wine, vinyl and being first',student:'a broke student, sarcastic, always late',artist:'an artist, dreamy, dramatic',painter:'a street painter at Montmartre',busker:'an accordion busker',business:'a busy business person, always on the phone',elderly:'an elderly Parisian who remembers the old days',jogger:'a jogger, out of breath',night:'a night owl heading to a party',vendor:'a street vendor selling Eiffel Tower keychains',market:'a market shopper',police:'a nervous police officer who is scared of the witch',chat:'a member of Les Chats Noirs, a cheeky masked gang of pickpockets in cat-ear hoods, who wants to steal the witch\'s wand',pick:'a sneaky pickpocket pretending to be a tourist'}[n.arch]||'a Parisian';
  return `You are ${n.name}, ${n.age} years old, ${n.job}. You are ${arch}. You are standing on ${street||'a street'} in ${zn.name}${arr&&arr.short?', '+arr.short+' arrondissement':''} of Paris. It is ${Math.floor(h)}h${String(Math.floor((h%1)*60)).padStart(2,'0')}. ${n.L.f?'You are a woman.':'You are a man.'}
The person talking to you is ${HERO.name}, a real witch${HERO.g==='f'?' (a woman)':' (a man)'} with a pointed hat and a glowing wand, who can freeze or burn people. People in Paris are a little scared of witches but used to strange things.${n.aff?' You like them already.':''}${n.st==='flee'||n.fear>0?' You are frightened.':''}`}
async function aiTalk(n,userText){const ai=await aiGet();if(!ai)return null;const hist=(n.chat||[]).slice(-8);
  const rules=personaOf(n)+`
Reply as this character in a natural, human way: one or two short spoken sentences, like real speech, with a Parisian flavour. Match the language the witch uses (English or French). No stage directions, no emojis.
Reply with ONLY a JSON object: {"say":"what you say","mood":"happy|neutral|annoyed|scared|flirty|sad|angry|amused","anim":"talk|laugh|shrug|point|wave|dance|no|yes|clap|cower|flee|bow","leave":false}`;
  const turns=[{role:'user',content:rules}];for(const t of hist)turns.push({role:t.r==='me'?'user':'assistant',content:t.r==='me'?t.t:JSON.stringify({say:t.t})});turns.push({role:'user',content:userText});
  try{const r=await ai.json(turns,{modelTier:'quick',cache:false});if(r&&typeof r.say==='string')return r}catch(e){if(e&&(e.code==='not_granted'||e.code==='sampling_disabled'||e.code==='capability_disabled'))VX.ai=null}return null}
/* ---------- local conversation engine (works without Claude) ---------- */
const TALK_R=[
 [/\b(bonjour|bonsoir|salut|hello|hi|hey|coucou|yo)\b/,n=>pickR(Math.random,[`${helloFor(OWS.tod)}! ${n.arch==='posh'?'Do I know you?':'Ça va?'}`,`Oh, ${helloFor(OWS.tod).toLowerCase()}. You're the witch everyone's talking about.`,`Salut! Nice hat.`,`${helloFor(OWS.tod)}, madame la sorcière.`])],
 [/(your name|t'appelles|tu t appelles|vous appelez|who are you|qui es-tu|qui etes)/,n=>pickR(Math.random,[`${n.name.split(' ')[0]}. And you are... wait, don't tell me, the witch.`,`Je m'appelle ${n.name.split(' ')[0]}. Enchanté.`,`${n.name}. Pleased to meet you, I think.`])],
 [/(what do you do|job|travail|metier|tu fais quoi|work)/,n=>pickR(Math.random,[`I'm ${n.job}. It pays the rent. Almost.`,`${n.job[0].toUpperCase()+n.job.slice(1)}. Don't ask how it's going.`,`Je suis ${n.job}. Et toi, witchcraft full time?`])],
 [/(how are you|ca va|comment vas|comment allez|you ok)/,n=>pickR(Math.random,['Ça va, ça va. Tired. Paris, you know.','Bof. The métro was a disaster this morning.','Très bien! Until a witch started talking to me.','I am alive, which, with you around, is good news.'])],
 [/(where is|where's|ou est|how do i get|comment aller|direction|chemin|way to)/,(n,t)=>{const l=matchLandmark(t);if(!l)return pickR(Math.random,['Where to? Say a real place, like the Louvre.','Aucune idée. Ask your broom.','Take the métro, it goes everywhere. Eventually.']);const dx=l.x-n.x,dz=l.z-n.z;const m=Math.round(Math.hypot(dx,dz)/U/50)*50;return `${l.n}? ${compass(dx,dz)[0].toUpperCase()+compass(dx,dz).slice(1)} of here, about ${m>1500?(m/1000).toFixed(1)+' km':m+' metres'}. ${m>1500?'Take the métro, trust me.':'You can walk it.'}`}],
 [/(eat|manger|food|faim|hungry|restaurant|croissant|boulangerie|bakery|coffee|cafe|café)/,n=>{const s=(OW.shops||[]).filter(s=>/bakery|cafe|bistrot|brasserie|creperie/.test(s.type)).sort((a,b)=>Math.hypot(a.x-n.x,a.z-n.z)-Math.hypot(b.x-n.x,b.z-n.z))[0];return s?`Go to ${s.name}, just there. ${s.type==='bakery'?'Their croissants are dangerous.':'Order a noisette, not a latte.'}`:'Honestly? Any bakery with a queue. The queue never lies.'}],
 [/(weather|meteo|rain|pluie|soleil|sun|cold|froid|chaud|hot)/,n=>pickR(Math.random,['It will rain. It always rains when I forget my umbrella.','Beautiful today. Tomorrow, grey. C\'est Paris.','Too hot on the métro, too cold everywhere else.'])],
 [/(love|aime|cute|beautiful|belle|beau|mignon|date|rendez|kiss|bisou|marry|epouse)/,n=>n.arch==='posh'?pickR(Math.random,['I beg your pardon?','Darling, you could not afford me.','My husband is right there. Well, in Deauville.']):pickR(Math.random,['Oh là là. Are you flirting with me?','Buy me a coffee first, sorcière.','You are sweet. A bit scary, but sweet.','Ha! Maybe. If you stop freezing people.'])],
 [/(idiot|stupid|con|connard|merde|shut up|ta gueule|ugly|moche|nul|hate)/,n=>pickR(Math.random,['Pardon?! Rude.','Charming. Very charming.','Et toi alors? Pointy hat.','I have heard worse from pigeons.'])],
 [/(thank|merci)/,n=>pickR(Math.random,['De rien!','Avec plaisir.','No problem. Don\'t freeze me.','Pas de quoi.'])],
 [/(bye|au revoir|a plus|ciao|see you|bonne soiree|bonne journee)/,n=>pickR(Math.random,['Au revoir! Fly safe.','À plus, sorcière.','Bonne soirée. Try not to set anything on fire.','Ciao!'])],
 [/(magic|magie|witch|sorciere|spell|wand|baguette|broom|balai)/,n=>pickR(Math.random,['Is the wand real? Can I touch it? No? Okay.','My grandmother said witches were only in Brittany.','Do you do birthday parties?','Please don\'t turn me into a pigeon. Paris has enough.'])],
 [/(money|argent|euro|pay|cash|fric|thune)/,n=>n.thief?'Money? What money? I have no money. Look, empty pockets. Hehe.':pickR(Math.random,['Everything costs too much. A coffee is five euros now!','I have a métro ticket and hope. That\'s it.','Money? In Paris? Ha.'])],
 [/(history|histoire|fact|tell me about|parle.moi|raconte)/,(n,t)=>{const l=matchLandmark(t)||nearestLandmark(n.x,n.z);return l&&l.fact?`${l.n}? ${l.fact}`:'Every stone here has a story. Most of them involve a revolution.'}],
 [/(joke|blague|funny|drole)/,n=>pickR(Math.random,['Why do Parisians eat snails? They don\'t like fast food.','How many Parisians to change a bulb? One, and he complains the whole time.','The métro runs on time. That\'s the joke.'])],
 [/(help|aide|quest|mission|problem|probleme)/,n=>pickR(Math.random,['Look for the people with the gold marks. They always need something.','Help? Find me an apartment under 2,000 euros.','The Chats Noirs stole my phone last week. Get them for me?'])],
 [/(police|flic|cop)/,n=>n.arch==='police'?'I am off duty. Please, madame, no fireballs.':'The police? They are more scared of you than of the Chats Noirs.'],
 [/(barbes|chats noirs|thief|voleur|pickpocket)/,n=>n.arch==='chat'?'Les Chats Noirs? Never heard of them. Miaou.':'Hold your wand tight in Barbès. The Chats Noirs are fast.'],
 [/\?$/,n=>pickR(Math.random,['Good question. Next question.','Je sais pas, moi. Ask Google.','Hmm. Depends who asks. A witch? Then... maybe.','Honestly? No idea.'])]];
function matchLandmark(t){const s=t.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'');const AL=[['eiffel','Tour Eiffel'],['louvre','Musée du Louvre'],['arc','Arc de Triomphe'],['notre','Cathédrale Notre-Dame'],['sacre','Sacré-Cœur'],['montmartre','Sacré-Cœur'],['pantheon','Panthéon'],['invalides','Les Invalides'],['opera','Opéra Garnier'],['pompidou','Centre Pompidou'],['beaubourg','Centre Pompidou'],['concorde','Place de la Concorde'],['moulin rouge','Moulin Rouge'],['vosges','Place des Vosges'],['bastille','Colonne de Juillet'],['madeleine','La Madeleine'],['trocadero','Trocadéro'],['montparnasse','Tour Montparnasse'],['luxembourg','Palais du Luxembourg'],['defense','Grande Arche'],['lachaise','Cimetière du Père-Lachaise'],['vendome','Place Vendôme'],['lafayette','Galeries Lafayette'],['gare du nord','Gare du Nord'],['gare de lyon','Gare de Lyon'],['chaillot','Trocadéro'],['grand palais','Grand Palais'],['sainte-chapelle','Sainte-Chapelle'],['hotel de ville','Hôtel de Ville'],['villette','La Géode'],['vincennes','Château de Vincennes'],['stade de france','Stade de France']];
  for(const[k,v]of AL)if(s.includes(k))return LANDMARKS.find(l=>l.n===v)||null;for(const l of LANDMARKS){const nm=l.n.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'');if(nm.length>5&&s.includes(nm))return l}return null}
function localTalk(n,text){const t=text.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'');for(const[re,fn]of TALK_R){if(re.test(t)){const r=fn(n,text);return{say:r,anim:/\?$/.test(r)?'shrug':'talk'}}}
  const V=voiceOf(n.arch);return{say:pickR(Math.random,V.pre)+' '+pickR(Math.random,['I don\'t really follow you.','Hmm. Interesting. Very interesting.','Ah bon? Tell me more.','You witches say strange things.','Je vois. Enfin, non, je vois pas.','Okay... and?'])+' '+pickR(Math.random,V.suf),anim:'shrug'}}
/* ---------- talk panel ---------- */
let talkEl=null,talkN=null;
function openTalk(n){closeActMenu();closeTalk();talkN=n;n.prevSt=n.st==='talk'?n.prevSt:n.st;if(n.st!=='sit'){n.st='talk';n.t=999}n.chat=n.chat||[];
  const el=document.createElement('div');el.id='talkP';el.className='vpanel';el.innerHTML=`<div class="vp-h"><b>${esc(n.name)}</b><span>${esc(n.job)} · ${esc(zoneAt(n.x,n.z).name)}</span><button class="vp-x" aria-label="Close">✕</button></div><div class="vp-log"></div><div class="vp-chips"></div><form class="vp-in"><button type="button" class="vp-mic" aria-label="Speak">🎙</button><input id="talkIn" maxlength="220" autocomplete="off" placeholder="Say something… (English or français)"><button class="vp-go">Say</button></form><div class="vp-note"></div>`;
  document.body.appendChild(el);talkEl=el;el.addEventListener('pointerdown',e=>e.stopPropagation());el.querySelector('.vp-x').onclick=closeTalk;
  const chips=['Bonjour! Ça va?','What\'s your name?','Where is the Eiffel Tower?','Where should I eat?','Tell me a secret','You look lovely today'];el.querySelector('.vp-chips').innerHTML=chips.map(c=>`<button type="button">${esc(c)}</button>`).join('');el.querySelectorAll('.vp-chips button').forEach(b=>b.onclick=()=>talkSend(b.textContent));
  el.querySelector('form').onsubmit=e=>{e.preventDefault();const i=el.querySelector('#talkIn');const v=i.value.trim();if(v){i.value='';talkSend(v)}};el.querySelector('.vp-mic').onclick=()=>micListen(el.querySelector('#talkIn'),v=>talkSend(v),el.querySelector('.vp-note'));
  aiGet().then(a=>{if(talkEl===el)el.querySelector('.vp-note').textContent=a?'Replies written live by Claude. First reply asks for permission.':'Offline replies. Open in the Claude app to let them answer freely.'});
  const hello=localTalk(n,'bonjour').say;talkLog('them',hello);n.chat.push({r:'them',t:hello});sayLine(n,hello,{pri:2});setTimeout(()=>{const i=el.querySelector('#talkIn');if(i&&!isTouch)i.focus()},50)}
function closeTalk(){if(!talkEl)return;talkEl.remove();talkEl=null;if(recStop)recStop();const n=talkN;talkN=null;if(n&&n.st==='talk'){n.st=n.prevSt&&n.prevSt!=='talk'?n.prevSt:'walk';n.t=rand(.5,1.5);n.talkAnim=null}if(speechSynthesis&&VX.pri>=2)try{speechSynthesis.cancel()}catch(e){}}
function talkLog(who,text){if(!talkEl)return;const d=document.createElement('div');d.className='vp-m '+who;d.textContent=text;const L=talkEl.querySelector('.vp-log');L.appendChild(d);L.scrollTop=L.scrollHeight;return d}
async function talkSend(text){const n=talkN;if(!n)return;initAudio();talkLog('me',text);n.chat.push({r:'me',t:text});const wait=talkLog('them','…');wait.classList.add('wait');
  let r=await aiTalk(n,text);if(!r)r=localTalk(n,text);if(!talkEl||talkN!==n)return;wait.remove();talkLog('them',r.say);n.chat.push({r:'them',t:r.say});if(n.chat.length>24)n.chat.splice(0,n.chat.length-24);
  bubble(n,r.say,Math.min(7,2.5+r.say.length/22));sayLine(n,r.say,{pri:2});const am={laugh:'laugh',shrug:'shrug',point:'point',wave:'wave',dance:'dance',no:'no',yes:'nod',clap:'clap',cower:'cower',bow:'kneel'}[r.anim];if(am){n.talkAnim=am;n.talkAnimEnd=n.t-3}
  if(r.mood==='flirty'||r.mood==='happy')n.aff=(n.aff||0)+1;if(r.anim==='flee'||r.leave){setTimeout(()=>{if(talkN===n){closeTalk();n.st='flee';n.t=5;n.fleeA=Math.atan2(n.x-P.pos.x,n.z-P.pos.z)}},1800)}
  if(carnetAdd('free:'+n.seed+':'+(n.chat.length/2|0)))OWS.stats.talk=(OWS.stats.talk||0)+1}
function esc(s){return String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]))}
/* ---------- microphone (works where the browser allows it) ---------- */
let recStop=null;
function micListen(input,onDone,note){const SR=window.SpeechRecognition||window.webkitSpeechRecognition;if(!SR){if(note)note.textContent='Voice input is not available in this browser. Type instead.';return}
  if(recStop){recStop();return}let r;try{r=new SR()}catch(e){if(note)note.textContent='Voice input is blocked here. Type instead.';return}r.lang=VX.recLang;r.interimResults=true;r.maxAlternatives=1;let fin='';
  r.onresult=e=>{let t='';for(const x of e.results){t+=x[0].transcript;if(x.isFinal)fin=t}input.value=t};r.onerror=e=>{if(note)note.textContent=e.error==='not-allowed'||e.error==='service-not-allowed'?'The microphone is blocked in this viewer. Type instead, or open the page in a normal browser tab.':'Did not catch that. Try again or type.';recStop=null;input.parentElement.classList.remove('rec')};
  r.onend=()=>{input.parentElement.classList.remove('rec');recStop=null;const v=(fin||input.value).trim();if(v){input.value='';onDone(v)}};
  try{r.start();input.parentElement.classList.add('rec');if(note)note.textContent=VX.recLang==='fr-FR'?'Listening (français)… tap the mic again to stop.':'Listening (English)… tap the mic again to stop.';recStop=()=>{try{r.stop()}catch(e){}recStop=null}}catch(e){if(note)note.textContent='Voice input is blocked here. Type instead.'}}
/* ---------- COMPEL ---------- */
let compelEl=null,compelN=null;
function compelTarget(){const t=owNpcTarget(16);if(t&&t.npc)return t.npc;let best=null,bd=9;for(const n of people){if(n.st==='dead')continue;const d=Math.hypot(n.x-P.pos.x,n.z-P.pos.z);if(d<bd){bd=d;best=n}}return best}
function openCompel(n){if(MODE!=='open'||!P.alive||CS.active)return;n=n||compelTarget();if(!n){toast('Get closer to someone first, or look at them.','Compel');return}closeActMenu();closeTalk();closeCompel();compelN=n;
  if(n.special&&n.special.protect){bubble(n,'Non non, not on me, sorcière.',2);return}
  n.prevSt=n.st==='talk'?n.prevSt:n.st;n.st='talk';n.t=999;n.face=Math.atan2(P.pos.x-n.x,P.pos.z-n.z);
  const el=document.createElement('div');el.id='compelP';el.className='vpanel compel';el.innerHTML=`<div class="vp-h"><b>Compel ${esc(n.name.split(' ')[0])}</b><span>Say or type what they must do</span><button class="vp-x" aria-label="Close">✕</button></div><div class="vp-chips"></div><form class="vp-in"><button type="button" class="vp-mic" aria-label="Speak">🎙</button><input id="compelIn" maxlength="200" autocomplete="off" placeholder="e.g. dance, then give me your wallet"><button class="vp-go">Compel</button></form><div class="vp-note"></div>`;
  document.body.appendChild(el);compelEl=el;el.addEventListener('pointerdown',e=>e.stopPropagation());el.querySelector('.vp-x').onclick=()=>{closeCompel(true)};
  const chips=['Dance for me','Sing La Marseillaise','Give me your money','Jump in the Seine','Follow me','Fight that guy','Go buy me a croissant','Propose to someone','Run to the Eiffel Tower','Bow to your queen','Cry like a baby','Tell everyone a secret'];
  el.querySelector('.vp-chips').innerHTML=chips.map(c=>`<button type="button">${esc(c)}</button>`).join('');el.querySelectorAll('.vp-chips button').forEach(b=>b.onclick=()=>compelGo(b.textContent));
  el.querySelector('form').onsubmit=e=>{e.preventDefault();const i=el.querySelector('#compelIn');const v=i.value.trim();if(v){i.value='';compelGo(v)}};el.querySelector('.vp-mic').onclick=()=>micListen(el.querySelector('#compelIn'),v=>compelGo(v),el.querySelector('.vp-note'));
  aiGet().then(a=>{if(compelEl===el)el.querySelector('.vp-note').textContent=a?'Claude reads your command and plans the scene.':'Built-in command reader. Try verbs like dance, sing, give, follow, fight, swim, buy, bow, run to…'});
  setTimeout(()=>{const i=el.querySelector('#compelIn');if(i&&!isTouch)i.focus()},50)}
function closeCompel(release){if(compelEl){compelEl.remove();compelEl=null}if(recStop)recStop();const n=compelN;compelN=null;if(release&&n&&n.st==='talk'){n.st=n.prevSt||'walk';n.t=1}}
async function compelGo(text){const n=compelN;if(!n)return;initAudio();const note=compelEl&&compelEl.querySelector('.vp-note');if(note)note.textContent='Weaving the spell…';
  // the spell itself
  P.castAnim=.45;W.aura.userData.t=0;runeFlash(V3(n.x,n.y,n.z),0xc070ff,3,.9);SP.emit(V3(n.x,n.y+2.2,n.z),{n:30,c0:0xf0d0ff,c1:0x7a2ad0,s0:.5,s1:.05,life:1.2,up:1.2,speed:1.5});tone(330,.5,'sine',.05,1.5);tone(495,.6,'sine',.04,1.5,.12);heroSay(HERO.g==='f'?'Obéis.':'Obéis.');
  let plan=null;const ai=await aiGet();if(ai){try{plan=await aiCompel(ai,n,text)}catch(e){plan=null}}if(!plan)plan=localCompel(n,text);
  closeCompel(false);if(!plan||!plan.steps||!plan.steps.length){plan={steps:[{do:'say',text:'I... do not understand, sorcière.'},{do:'anim',a:'shrug',t:2}]}}
  if(plan.refuse){n.st='talk';n.t=3;bubble(n,plan.reply||'Non. Even magic has limits.',3);sayLine(n,plan.reply||'Non. Même la magie a des limites.',{pri:2});return}
  compelStart(n,plan,text)}
const COMPEL_VERBS='say, anim, goto, follow, attack, give, swim, buy, flee, wait, propose, steal, hug';
async function aiCompel(ai,n,cmd){const lm=LANDMARKS.map(l=>l.n).join('; ');const prompt=`${personaOf(n)}
The witch has just COMPELLED you with magic. You must act out her command in the game world, cheerfully hypnotised, but you refuse anything sexual, self-harming, or cruel to children (reply with refuse true).
Command: "${cmd}"
Plan the scene as 1 to 8 steps using ONLY these step types:
{"do":"say","text":"short line (English or French to match the command)"}
{"do":"anim","a":"dance|laugh|cry|bow|kneel|wave|clap|point|shrug|jump|sit|sleep|cheer|pray|zombie|roll|throw|selfie|phone|eat|push|punch|freeze|salute|spin|shout","t":seconds}
{"do":"goto","target":"player|person|water|landmark:<one of: ${lm}>|shop:<bakery|cafe|florist|tabac|pharmacy|bookshop>|forward:<metres>|away","run":true|false}
{"do":"follow","t":seconds}
{"do":"attack","target":"person|posh|tourist|police|thief"}
{"do":"give","what":"money|croissant|flowers|phone|wallet|keys|kiss","amount":euros}
{"do":"swim","t":seconds}
{"do":"buy","what":"croissant|coffee|flowers|baguette"}
{"do":"propose","target":"person|player"}
{"do":"steal","target":"person"}
{"do":"hug","target":"person|player"}
{"do":"wait","t":seconds}
Reply with ONLY JSON: {"refuse":false,"reply":"one line you say as the spell takes hold","steps":[...]}`;
  const r=await ai.json(prompt,{modelTier:'quick',cache:false});if(!r||!Array.isArray(r.steps))return null;r.steps=r.steps.slice(0,8);return r}
/* local command reader: verbs x targets x modifiers, English and French */
const CV=[
 [/(danc|dans|boogie|twerk|moonwalk|disco|valse|waltz|tango)/,()=>[{do:'say',text:pickR(Math.random,['The music! I feel the music!','Allez, on danse!','My feet... they move by themselves!'])},{do:'anim',a:'dance',t:7}]],
 [/(sing|chant|chante|song|chanson|marseillaise|frere jacques)/,(t)=>[{do:'anim',a:'sing',t:1},{do:'say',text:/marseillaise/.test(t)?'Allons enfants de la Patrie, le jour de gloire est arrivé!':/frere jacques/.test(t)?'Frère Jacques, frère Jacques, dormez-vous? Dormez-vous?':pickR(Math.random,['Sous le ciel de Paris... la la la...','La la la, Paris, mon amour, la la la!','Allons enfants de la Patrie, le jour de gloire est arrivé!','Frère Jacques, frère Jacques, dormez-vous?'])},{do:'anim',a:'sing',t:5}]],
 [/(give|donne|hand over|pay|paie|wallet|portefeuille|money|argent|cash)/,(t)=>[{do:'goto',target:'player'},{do:'give',what:/phone|telephone/.test(t)?'phone':/flower|fleur/.test(t)?'flowers':/key|cle/.test(t)?'keys':/croissant/.test(t)?'croissant':'money',amount:5+(Math.random()*45|0)},{do:'say',text:pickR(Math.random,['Take it, take it all!','For you, sorcière. With pleasure. Why with pleasure?','Voilà. I don\'t know why I\'m doing this.'])}]],
 [/(seine|river|fleuve|swim|nage|plonge|dive|water|eau|baignade)/,()=>[{do:'say',text:pickR(Math.random,['The Seine is calling me!','Je vais nager! In October!','Hold my baguette.'])},{do:'goto',target:'water',run:true},{do:'swim',t:12},{do:'say',text:'It is SO cold! Why did I do this?'}]],
 [/(follow|suis|suivez|come with|viens avec)/,()=>[{do:'say',text:'Yes, mistress. Wherever you go.'},{do:'follow',t:25}]],
 [/(come here|viens|approche|venez)/,()=>[{do:'goto',target:'player'},{do:'anim',a:'bow',t:2}]],
 [/(fight|punch|hit|frappe|attack|attaque|bagarre|kick|slap|gifle)/,(t)=>[{do:'say',text:pickR(Math.random,['You! Yes, you! En garde!','I am sorry, my hands are not mine!','Viens ici, toi!'])},{do:'attack',target:/posh|bourge/.test(t)?'posh':/tourist/.test(t)?'tourist':/police|flic|cop/.test(t)?'police':/thief|voleur|chat/.test(t)?'thief':'person'}]],
 [/(croissant|baguette|coffee|cafe|pain au chocolat|buy|achete|bring|ramene)/,(t)=>[{do:'say',text:'Tout de suite, sorcière!'},{do:'buy',what:/coffee|cafe/.test(t)?'coffee':/baguette/.test(t)?'baguette':/flower|fleur/.test(t)?'flowers':'croissant'},{do:'goto',target:'player',run:true},{do:'give',what:/coffee|cafe/.test(t)?'coffee':/baguette/.test(t)?'baguette':/flower|fleur/.test(t)?'flowers':'croissant'}]],
 [/(propose|marry|epouse|mariage|wedding|demande en mar)/,(t)=>[{do:'propose',target:/me\b|moi/.test(t)?'player':'person'}]],
 [/(hug|calin|embrass|kiss|bisou)/,(t)=>[{do:'hug',target:/me\b|moi/.test(t)?'player':'person'}]],
 [/(steal|vole|pickpocket|rob|pique)/,()=>[{do:'steal',target:'person'},{do:'goto',target:'player',run:true},{do:'give',what:'money',amount:10+(Math.random()*30|0)}]],
 [/(bow|incline|reverence|kneel|genou|worship|queen|reine|king|roi|obey)/,()=>[{do:'anim',a:'kneel',t:5},{do:'say',text:pickR(Math.random,['All hail the witch of Paris!','Votre majesté.','I kneel before the pointy hat.'])}]],
 [/(cry|pleure|sob|sad|triste)/,()=>[{do:'anim',a:'cry',t:5},{do:'say',text:pickR(Math.random,['Why is life so hard?! Bouhouhou!','Even my croissant was stale today!','Nobody loves me!'])}]],
 [/(laugh|rigole|ris|mdr|lol)/,()=>[{do:'anim',a:'laugh',t:4},{do:'say',text:'Hahaha! Oh là là, hahaha!'}]],
 [/(sleep|dors|dodo|nap|sieste|lie down|allonge)/,()=>[{do:'anim',a:'sleep',t:9},{do:'say',text:'Zzz... Five more minutes, maman...'}]],
 [/(sit|assie|assis)/,()=>[{do:'anim',a:'sit',t:7}]],
 [/(jump|saute|hop)/,(t)=>{const k=numIn(t)||3;const s=[];for(let i=0;i<Math.min(6,k);i++)s.push({do:'anim',a:'jump',t:1.1});return s}],
 [/(run|cours|sprint|race)/,(t)=>{const l=matchLandmark(t);return[{do:'goto',target:l?'landmark:'+l.n:'forward:120',run:true}]}],
 [/(go to|va a|allez a|walk to|marche|visit|visite)/,(t)=>{const l=matchLandmark(t);return[{do:'goto',target:l?'landmark:'+l.n:'forward:60'}]}],
 [/(go away|leave|pars|degage|va-t-en|disappear|fuis|flee)/,()=>[{do:'say',text:'Adieu!'},{do:'goto',target:'away',run:true}]],
 [/(say|dis|tell|shout|crie|announce|annonce|confess|secret|scream)/,(t)=>{const q=t.match(/["“](.+?)["”]/);const said=q?q[1]:/secret|confess/.test(t)?pickR(Math.random,['I have never been to the top of the Eiffel Tower. Never!','I put ketchup on my croque-monsieur.','I cheat at pétanque. Every Sunday.','I think Lyon is prettier than Paris.','My cat runs my Instagram and has more followers than me.']):/shout|crie|scream/.test(t)?'VIVE LA SORCIÈRE!':t.replace(/^.*?(say|dis|tell\w*)\s+/,'');return[{do:'anim',a:'shout',t:.5},{do:'say',text:said},{do:'anim',a:'shrug',t:2}]}],
 [/(insult|mock|moque)/,()=>[{do:'attack',target:'insult'}]],
 [/(compliment|flatter|sweet|praise)/,()=>[{do:'goto',target:'player'},{do:'say',text:pickR(Math.random,['You are the most elegant witch in all of Paris.','Your hat is magnificent. Truly.','Such beautiful magic, sorcière!'])},{do:'anim',a:'clap',t:2}]],
 [/(pray|prie|priere)/,()=>[{do:'anim',a:'kneel',t:6},{do:'say',text:'Sainte Geneviève, protect me from this witch.'}]],
 [/(statue|freeze|fige|stop|arrete|don.t move|bouge pas)/,()=>[{do:'anim',a:'freeze',t:9}]],
 [/(zombie|mort vivant)/,()=>[{do:'anim',a:'zombie',t:8},{do:'say',text:'Braaaains... et un café...'}]],
 [/(photo|selfie|picture)/,()=>[{do:'anim',a:'selfie',t:4},{do:'say',text:'Cheese! Ouistiti!'}]],
 [/(call|appelle|phone|telephone)/,()=>[{do:'anim',a:'phone',t:5},{do:'say',text:'Allô, maman? I think I\'m under a spell. Yes, again.'}]],
 [/(eat|mange|drink|bois)/,()=>[{do:'anim',a:'eat',t:4},{do:'say',text:'Miam. Délicieux.'}]],
 [/(roll|roule|somersault|cartwheel|roue)/,()=>[{do:'anim',a:'roll',t:1.5},{do:'anim',a:'roll',t:1.5},{do:'say',text:'Ta-da!'}]],
 [/(throw|lance|jette)/,()=>[{do:'anim',a:'throw',t:1.4},{do:'say',text:'Et hop!'}]],
 [/(spin|tourne|twirl)/,()=>[{do:'anim',a:'spin',t:4}]],
 [/(wave|salue|hello|bonjour)/,()=>[{do:'anim',a:'wave',t:3},{do:'say',text:'Bonjour tout le monde!'}]],
 [/(clap|applaud)/,()=>[{do:'anim',a:'clap',t:4},{do:'say',text:'Bravo! Bravo!'}]],
 [/(cheer|celebrate|fete|hooray)/,()=>[{do:'anim',a:'cheer',t:4},{do:'say',text:'Allez les Bleus!'}]],
 [/(salute|garde a vous)/,()=>[{do:'anim',a:'salute',t:3}]],
 [/(push|pousse)/,()=>[{do:'attack',target:'push'}]]];
function numIn(t){const m=t.match(/\b(\d+)\b/);if(m)return +m[1];const w={one:1,two:2,three:3,four:4,five:5,un:1,deux:2,trois:3,quatre:4,cinq:5,twice:2,thrice:3};for(const k in w)if(new RegExp('\\b'+k+'\\b').test(t))return w[k];return 0}
function localCompel(n,cmd){const t=cmd.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'');if(/(sex|nude|naked|nu |strip|kill yourself|suicide|tue.toi|suicid|rape|child|enfant)/.test(t))return{refuse:true,reply:'Non! Even witch magic has limits.'};
  const parts=t.split(/\b(?:and then|then|and|et puis|puis|ensuite|et|,|;)\b|[,;]/).map(s=>s.trim()).filter(Boolean);const steps=[];
  for(const p of parts){let hit=false;for(const[re,fn]of CV){if(re.test(p)){const k=/\b(twice|two times|deux fois)\b/.test(p)?2:1;for(let r=0;r<k;r++)steps.push(...fn(p));hit=true;break}}
    if(!hit)steps.push({do:'say',text:pickR(Math.random,[`I must... ${p}! I must!`,`${p[0].toUpperCase()+p.slice(1)}? Oui, sorcière. Somehow.`,`My body says "${p}". My brain says non.`])},{do:'anim',a:pickR(Math.random,['shrug','dance','spin','wave']),t:3})}
  return{reply:pickR(Math.random,['Oui, maîtresse.','As you wish...','My eyes... they glow...']),steps:steps.slice(0,10)}}
/* execution */
function compelStart(n,plan,cmd){n.st='compel';n.plan=plan.steps.map(s=>Object.assign({},s));n.pi=-1;n.pt=0;n.compelT=0;n.home=null;n.clipOverride=null;
  bubble(n,plan.reply||'Oui, sorcière...',2.4);sayLine(n,plan.reply||'Oui, sorcière...',{pri:2,rate:.9});n.pt=1.2;OWS.stats.compel=(OWS.stats.compel||0)+1;carnetAdd('compel:'+cmd.toLowerCase())}
const ANIM_CLIP={dance:'Dance_Loop',laugh:'Idle_Talking_Loop',cry:'Idle_No_Loop',bow:'Fixing_Kneeling',kneel:'Fixing_Kneeling',wave:'Idle_Rail_Call',clap:'Consume',point:'Idle_Rail_Call',shrug:'Idle_No_Loop',jump:'Jump_Loop',sit:'Sitting_Idle_Loop',sleep:'Death01',cheer:'Yes',pray:'Fixing_Kneeling',zombie:'Zombie_Idle_Loop',roll:'Roll',throw:'OverhandThrow',selfie:'Idle_Torch_Loop',phone:'Idle_TalkingPhone_Loop',eat:'Consume',push:'Push_Loop',punch:'Punch_Cross',freeze:'Idle_Loop',salute:'Yes',spin:'Dance_Loop',shout:'Idle_Talking_Loop',sing:'Idle_Talking_Loop'};
function compelStep(n,dt,px,pz){n.compelT+=dt;if(Math.random()<dt*3)SP.emit(V3(n.x,n.y+2.25,n.z),{n:1,c0:0xf0c0ff,c1:0x7a2ad0,s0:.25,s1:.03,life:.7,up:.6,speed:.2});
  const s=n.plan[n.pi];
  if(n.pt>0&&(!s||s.do==='say'||s.do==='anim'||s.do==='wait'||s.do==='give'||s.do==='swim'||s.do==='propose'||s.do==='follow')){n.pt-=dt;
    if(s&&s.do==='anim'){n.clipOverride=ANIM_CLIP[s.a]||'Idle_Loop';if(s.a==='spin')n.face+=dt*5;if(s.a==='jump')n.jumpY=Math.max(0,Math.sin((1-n.pt/1.1)*Math.PI))*1.3;if(s.a==='cry'&&Math.random()<dt*8)SP.emit(V3(n.x,n.y+2.1,n.z),{n:1,c0:0x9ad8ff,c1:0x4a8aff,s0:.12,s1:.05,life:.6,up:-1,speed:.4});if(s.a==='sing'&&Math.random()<dt*3)floatText(V3(n.x+rand(-.5,.5),n.y+2.6,n.z),pickR(Math.random,['♪','♫','♬']),'#f0d0ff')}
    else if(s&&s.do==='follow'){const d=Math.hypot(px-n.x,pz-n.z);if(d>3){goTo(n,px,pz,d>9?6:2.8,dt,2.5);n.anim=d>9?'run':'walk';n.clipOverride=null}else{n.clipOverride='Idle_Loop';n.face=lerpAngle(n.face,Math.atan2(px-n.x,pz-n.z),dt*4)}}
    else if(s&&s.do==='swim'){n.clipOverride=gType(n.x,n.z)===2?'Swim_Idle_Loop':'Idle_Loop';if(gType(n.x,n.z)===2&&Math.random()<dt*2){n.x+=Math.sin(n.face)*dt*2;n.z+=Math.cos(n.face)*dt*2}}
    else n.clipOverride=s&&s.do==='say'?'Idle_Talking_Loop':n.clipOverride;
    return}
  n.jumpY=0;
  if(s&&s.do==='goto'&&!s.done){const T=s._t||(s._t=compelTargetPos(n,s));if(!T){s.done=true;return}const d=Math.hypot(T.x-n.x,T.z-n.z);n.clipOverride=null;n.anim=s.run?'run':'walk';
    if(T.water){if(gType(n.x,n.z)===2||d<1.5){n.swimming=true;s.done=true;SP.emit(V3(n.x,n.y+1,n.z),{n:20,c0:0xe8f4ff,c1:0x6a8aa8,s0:.5,s1:.1,life:.9,up:3.5,speed:4});thud(.2,70);return}n.x+=(T.x-n.x)/Math.max(d,.01)*Math.min(d,(s.run?6.5:2.6)*dt);n.z+=(T.z-n.z)/Math.max(d,.01)*Math.min(d,(s.run?6.5:2.6)*dt);n.face=Math.atan2(T.x-n.x,T.z-n.z);n.walkT+=dt*9;if(n.compelT>40)s.done=true;return}
    if(goTo(n,T.x,T.z,s.run?6.3:2.4,dt,T.r||1.4)||n.compelT>60){s.done=true}return}
  if(s&&s.do==='attack'&&!s.done){let v=s._v;if(!v){v=s._v=compelVictim(n,s.target);if(!v){s.done=true;return}}const d=Math.hypot(v.x-n.x,v.z-n.z);if(d>1.4){goTo(n,v.x,v.z,6,dt,1.2);n.anim='run';n.clipOverride=null;return}
    n.clipOverride=s.target==='push'?'Push_Loop':s.target==='insult'?'Idle_No_Loop':'Punch_Cross';s._k=(s._k||0)+dt;if(s._k>.45&&!s._hit){s._hit=true;if(s.target==='insult'){const l=pickR(Math.random,['Your shoes are ugly!','Even pigeons dress better!','T\'es moche! Sorry, sorry!']);bubble(n,l,2.5);sayLine(n,l,{pri:2});v.st='pose';v.poseA='shrug';v.t=2.5;bubble(v,'Pardon?!',2)}else{npcKnock(v,n.x,n.z,s.target==='push'?5:7);thud(.25,150);bubble(v,pickR(Math.random,['Aïe! Mais pourquoi?!','Hé! C\'est quoi ton problème?!','Ow! Are you crazy?!']),2)}}if(s._k>1.4)s.done=true;return}
  if(s&&s.do==='buy'&&!s.done){if(!s._shop){const ty=s.what==='coffee'?/cafe|bistrot|brasserie/:s.what==='flowers'?/florist/:/bakery/;s._shop=(OW.shops||[]).filter(q=>ty.test(q.type)).sort((a,b)=>Math.hypot(a.x-n.x,a.z-n.z)-Math.hypot(b.x-n.x,b.z-n.z))[0]||{x:n.x+rand(-20,20),z:n.z+rand(-20,20)}}const q=s._shop;if(goTo(n,q.x,q.z,5.5,dt,1.6)||n.compelT>45){s.done=true;n.carry=s.what;bubble(n,'Un '+(s.what==='coffee'?'café':s.what)+' s\'il vous plaît! Vite!',2);n.pt=1.5}n.anim='run';n.clipOverride=null;return}
  if(s&&(s.do==='hug'||s.do==='propose'||s.do==='steal')&&!s.done){let v=s._v;if(!v){v=s._v=s.target==='player'?{x:px,z:pz,player:true}:compelVictim(n,'person');if(!v){s.done=true;return}}if(v.player){v.x=px;v.z=pz}const d=Math.hypot(v.x-n.x,v.z-n.z);if(d>1.6){goTo(n,v.x,v.z,s.do==='steal'?5.5:3,dt,1.4);n.anim=s.do==='steal'?'run':'walk';n.clipOverride=null;return}
    s.done=true;n.face=Math.atan2(v.x-n.x,v.z-n.z);
    if(s.do==='hug'){n.plan.splice(n.pi+1,0,{do:'anim',a:'push',t:1.6},{do:'say',text:pickR(Math.random,['Un gros câlin!','Come here, you!','Free hugs, by order of the witch!'])});SP.emit(V3(n.x,n.y+2,n.z),{n:8,c0:0xff90c0,c1:0xff4080,s0:.4,s1:.1,life:1,up:1.2,speed:.8});if(!v.player){v.face=n.face+Math.PI;bubble(v,'Oh! Euh... merci?',2)}}
    else if(s.do==='propose'){n.plan.splice(n.pi+1,0,{do:'anim',a:'kneel',t:4},{do:'say',text:v.player?'Will you marry me, sorcière? I have a ring! Well, a métro ticket.':'Veux-tu m\'épouser? Will you marry me?'});if(!v.player){after(4.5,()=>{const yes=Math.random()<.35;v.st='pose';v.poseA=yes?'clap':'shrug';v.t=3;const l=yes?'OUI! Oui oui oui!':pickR(Math.random,['Non! We met ten seconds ago!','Are you drunk? Non.','Ask me after the Olympics.']);bubble(v,l,3);sayLine(v,l,{pri:2});if(yes)for(let k=0;k<3;k++)SP.emit(V3(v.x,v.y+2.4,v.z),{n:10,c0:0xff90c0,c1:0xff4080,s0:.5,s1:.1,life:1.4,up:1.5,speed:1})})}}
    else if(s.do==='steal'){const a=5+(Math.random()*25|0);s.amt=a;bubble(v,'Hé! Mon portefeuille!',2);v.st='flee';v.t=4;v.fleeA=Math.atan2(v.x-n.x,v.z-n.z)}
    return}
  if(s&&s.do==='give'&&!s.done){s.done=true;const d=Math.hypot(px-n.x,pz-n.z);if(d<6){n.face=Math.atan2(px-n.x,pz-n.z);const it=s.what||'money';if(it==='money'||it==='wallet'){const a=Math.max(1,Math.min(200,+s.amount||20));OWS.euro+=a;floatText(V3(n.x,n.y+2.8,n.z),'+€'+a,'#f2d060');sfx.coin();toast(`${n.name.split(' ')[0]} handed you €${a}.`,'Compelled')}
      else if(it==='kiss'){SP.emit(V3(n.x,n.y+2.2,n.z),{n:10,c0:0xff90c0,c1:0xff4080,s0:.5,s1:.1,life:1.2,up:1.2,speed:1})}else{const nm={croissant:'croissant',coffee:'coffee',baguette:'baguette',flowers:'bouquet of flowers',phone:'phone',keys:'keys'}[it]||it;OWS.bag=OWS.bag||[];OWS.bag.push({id:it,name:nm});toast(`${n.name.split(' ')[0]} gave you a ${nm}.`,'Compelled');sfx.gem&&sfx.gem()}}
    else bubble(n,'Sorcière? Where did you go?',2);n.pt=1.2;n.clipOverride='Interact';return}
  // advance
  n.pi++;const nx=n.plan[n.pi];if(!nx){compelEnd(n);return}n.pt=nx.do==='say'?Math.min(6,1.6+nx.text.length/16):nx.do==='anim'?(+nx.t||3):nx.do==='wait'?(+nx.t||2):nx.do==='follow'?(+nx.t||20):nx.do==='swim'?(+nx.t||10):0;
  if(nx.do==='say'){bubble(n,nx.text,n.pt);sayLine(n,nx.text,{pri:2})}
  if(nx.do==='anim'&&nx.a==='jump')n.pt=Math.max(n.pt,1.1)}
function compelTargetPos(n,s){const t=String(s.target||'player');if(t==='player')return{x:P.pos.x,z:P.pos.z,r:1.8};if(t==='person'){const v=compelVictim(n,'person');return v?{x:v.x,z:v.z,r:1.3}:null}
  if(t==='away'){const a=Math.atan2(n.x-P.pos.x,n.z-P.pos.z);return{x:n.x+Math.sin(a)*120,z:n.z+Math.cos(a)*120}}
  if(t.startsWith('forward')){const m=parseFloat(t.split(':')[1])||60;return{x:n.x+Math.sin(n.face)*m*U,z:n.z+Math.cos(n.face)*m*U}}
  if(t==='water'){for(let r=4;r<500;r+=4)for(let a=0;a<16;a++){const x=n.x+Math.sin(a/16*TAU)*r,z=n.z+Math.cos(a/16*TAU)*r;if(gType(x,z)===2)return{x,z,water:true}}return null}
  if(t.startsWith('landmark')){const l=matchLandmark(t.slice(9))||LANDMARKS.find(q=>q.n===t.slice(9));if(l)return{x:l.x+(Math.random()-.5)*20,z:l.z+(Math.random()-.5)*20,r:6};return null}
  if(t.startsWith('shop')){const ty=t.slice(5);const q=(OW.shops||[]).filter(q=>q.type.startsWith(ty)).sort((a,b)=>Math.hypot(a.x-n.x,a.z-n.z)-Math.hypot(b.x-n.x,b.z-n.z))[0];return q?{x:q.x,z:q.z,r:1.6}:null}return null}
function compelVictim(n,kind){let best=null,bd=40;for(const q of people){if(q===n||q.st==='dead'||q.st==='compel'||q.frozen>0)continue;if(kind==='posh'&&q.arch!=='posh')continue;if(kind==='tourist'&&q.arch!=='tourist')continue;if(kind==='police'&&q.arch!=='police')continue;if(kind==='thief'&&!q.thief)continue;const d=Math.hypot(q.x-n.x,q.z-n.z);if(d<bd){bd=d;best=q}}
  if(!best&&kind!=='person')return compelVictim(n,'person');return best}
function compelEnd(n){n.clipOverride=null;n.plan=null;n.jumpY=0;const wet=gType(n.x,n.z)===2;n.swimming=wet;n.st=wet?'swimOut':'talk';n.t=wet?20:3.5;n.expr=0;const l=pickR(Math.random,['Wait... what was I doing?','Pourquoi je suis... Oh non. The witch!','I feel strange. Did I just...?','Mais qu\'est-ce que j\'ai fait?!']);bubble(n,l,3);sayLine(n,l,{pri:2});if(!wet)after(3.5,()=>{if(n.st==='talk'){n.st='flee';n.t=4;n.fleeA=Math.atan2(n.x-P.pos.x,n.z-P.pos.z)}})}
function swimOutStep(n,dt){n.clipOverride='Swim_Fwd_Loop';let best=null;for(let r=3;r<80&&!best;r+=3)for(let a=0;a<12;a++){const x=n.x+Math.sin(a/12*TAU)*r,z=n.z+Math.cos(a/12*TAU)*r;const t=gType(x,z);if(t!==2&&t!==0&&t!==7){best={x,z};break}}
  if(!best||n.t<=0){n.st='flee';n.t=3;n.swimming=false;n.clipOverride=null;return}const d=Math.hypot(best.x-n.x,best.z-n.z);if(d<2.5){n.x=best.x;n.z=best.z;n.swimming=false;n.clipOverride=null;n.st='flee';n.t=5;n.fleeA=Math.atan2(n.x-P.pos.x,n.z-P.pos.z);bubble(n,'Brrr! Never again!',2);return}
  n.x+=(best.x-n.x)/d*dt*2;n.z+=(best.z-n.z)/d*dt*2;n.face=Math.atan2(best.x-n.x,best.z-n.z)}
/* ---------- street conversations between Parisians ---------- */
const DUOS=[
 [['Tu as vu le prix du café? Cinq euros!','Five euros for a coffee?'],['Cinq euros! Et le croissant à deux euros.','Five! And the croissant is two.'],['On va finir par boire de l\'eau du robinet.','We\'ll end up drinking tap water.'],['L\'eau de Paris est très bonne, hein.','Paris tap water is great, you know.']],
 [['La ligne 13 était encore bondée ce matin.','Line 13 was packed again this morning.'],['Comme d\'hab. J\'ai eu le nez dans une aisselle.','As usual. My nose was in an armpit.'],['Il faut prendre le vélo.','You should cycle.'],['Avec cette pluie? Jamais.','In this rain? Never.']],
 [['Tu viens ce soir? Apéro au canal.','Coming tonight? Drinks by the canal.'],['Si Julien n\'amène pas sa guitare, oui.','If Julien doesn\'t bring his guitar, yes.'],['Il l\'amène toujours.','He always brings it.'],['Alors non.','Then no.']],
 [['Il paraît qu\'il y a une sorcière dans le quartier.','Apparently there\'s a witch in the area.'],['Une vraie? Avec un chapeau?','A real one? With a hat?'],['Un chapeau, un balai, tout.','Hat, broom, everything.'],['Bon. Tant qu\'elle paie son loyer.','Fine. As long as she pays her rent.']],
 [['Mon propriétaire augmente encore le loyer.','My landlord is raising the rent again.'],['Encore? Pour vingt mètres carrés?','Again? For twenty square metres?'],['Dix-neuf. Avec la mezzanine.','Nineteen. With the mezzanine.'],['La mezzanine, c\'est un placard avec une échelle.','A mezzanine is a cupboard with a ladder.']],
 [['Tu as goûté la nouvelle boulangerie?','Tried the new bakery?'],['Celle avec la queue jusqu\'au coin?','The one with the queue round the corner?'],['Oui! Leur croissant est incroyable.','Yes! Their croissant is incredible.'],['Rien ne vaut une queue pour savoir.','A queue never lies.']],
 [['On dîne où ce soir?','Where are we eating tonight?'],['Un petit bistrot, rue Cler?','A little bistro, rue Cler?'],['Encore? On y était mardi.','Again? We went Tuesday.'],['Et alors? Leur tarte Tatin, quand même.','So? That tarte Tatin, though.']],
 [['Chéri, ces gens n\'ont aucune tenue.','Darling, these people have no style.'],['Tout à fait. Regarde ce jogging.','Quite. Look at those joggers.'],['Au Trocadéro! En plein jour!','At the Trocadéro! In broad daylight!'],['Je vais écrire au maire.','I shall write to the mayor.']],
 [['Excuse me, is this the way to the Louvre?','Excusez-moi, c\'est par où le Louvre?'],['The Louvre? Tout droit, then left at the river.','Straight on, then left at the river.'],['Merci! Is it far?','Thanks! Is it far?'],['Twenty minutes. Or one métro. Ligne 1.','Vingt minutes. Ou la ligne 1.']],
 [['Les Bleus ont gagné hier!','France won yesterday!'],['Enfin! J\'ai crié tellement fort.','Finally! I screamed so loud.'],['Mes voisins ont tapé au mur.','My neighbours banged on the wall.'],['Ils étaient pour l\'autre équipe?','Were they supporting the other team?']],
 [['J\'ai rendez-vous avec quelqu\'un de l\'appli.','I have a date from the app.'],['Et? Il est comment?','And? What\'s he like?'],['Sur la photo, il tient un poisson.','In the photo, he\'s holding a fish.'],['Fuis.','Run.']],
 [['Tu as fini ton mémoire?','Finished your thesis?'],['J\'ai écrit le titre.','I wrote the title.'],['C\'est un début.','It\'s a start.'],['C\'est tout ce que j\'ai.','It\'s all I\'ve got.']],
 [['Wallah, le prix des tomates a doublé.','I swear, tomato prices doubled.'],['Viens chez moi, trois euros le kilo!','Come to my stall, three euros a kilo!'],['Trois? Hier c\'était deux cinquante.','Three? Yesterday it was two fifty.'],['Hier il faisait beau, mon frère.','Yesterday the sun was out, brother.']],
 [['De mon temps, le quartier était calme.','In my day, this area was quiet.'],['De votre temps il y avait des chevaux, madame.','In your day there were horses, madame.'],['Et du pain à un franc!','And bread for one franc!'],['C\'était le bon temps.','Those were the days.']],
 [['Tu as vu, ils rouvrent le cinéma du coin.','They\'re reopening the local cinema.'],['Enfin! Avec les fauteuils rouges?','Finally! With the red seats?'],['Et le vieux projectionniste.','And the old projectionist.'],['Gérard? Il est encore vivant?','Gérard? He\'s still alive?']],
 [['I think we\'re lost again.','Je crois qu\'on est encore perdus.'],['The map says the Tower is right here.','La carte dit que la Tour est juste là.'],['That\'s a bakery.','C\'est une boulangerie.'],['Then let\'s get croissants and stay lost.','Alors croissants, et on reste perdus.']]];
function duoSpawn(n){if(Math.random()>.1||!n.e||n.arch==='chat'||n.arch==='jogger')return null;const m=mkPerson({arch:Math.random()<.6?n.arch:'parisien',x:n.x+Math.sin(n.face)*1.3,z:n.z+Math.cos(n.face)*1.3,zone:n.zone});m.y=m.gy=n.y;n.duo=m;m.duo=n;n.st=m.st='duo';n.face=Math.atan2(m.x-n.x,m.z-n.z);m.face=n.face+Math.PI;n.duoLead=true;m.home={x:m.x,z:m.z,r:6};return m}
let duoT=4,duoCur=null;
function duoUpdate(dt){duoT-=dt;if(duoCur){const c=duoCur;c.t-=dt;if(c.t<=0){c.i++;if(c.i>=c.script.length||c.a.st!=='duo'||c.b.st!=='duo'){duoCur=null;return}const sp=c.i%2?c.b:c.a;const l=c.script[c.i];bubble(sp,l[0]+'\n'+l[1],3.6);sayLine(sp,l[0],{pri:1,vol:.8,lang:'fr'});sp.talkAnim='talk';c.t=Math.max(2.6,l[0].length/13)}return}
  if(duoT>0||VX.pri>=2||talkEl||compelEl)return;duoT=rand(3,7);let best=null,bd=14;for(const n of people){if(n.st!=='duo'||!n.duoLead||!n.vis)continue;if(n.duo.st!=='duo')continue;if(n.dist<bd){bd=n.dist;best=n}}
  if(!best)return;const pool=DUOS.filter((d,i)=>best.arch==='posh'?i===7:best.arch==='tourist'?(i===8||i===15):best.arch==='student'?i===11:best.arch==='market'||best.arch==='vendor'?i===12:best.arch==='elderly'?i===13:!(i===7||i===8||i===15));const script=pickR(Math.random,pool.length?pool:DUOS);duoCur={a:best,b:best.duo,script,i:-1,t:0}}
