/* ================= opening film: Maëlle's story (Higgsfield clips + ElevenLabs narration) =================
   Plays before the story starts on New Game, and every time Chapter I is chosen. Skippable. */
const FILM={subs:[[1.45, 5.95, "Paris, after midnight... when the whole city is asleep."], [10.55, 13.31, "Hi. I'm Maëlle. I'm a witch."], [13.51, 15.69, "Well... still learning."], [20.57, 24.45, "I grew up right here, under the rooftops,\nwith my grandparents."], [25.34, 26.98, "Grandma talked to the moon."], [27.2, 29.9, "Everyone thought she was just a sweet old lady..."], [30.02, 31.26, "she was a witch."], [31.99, 34.69, "She put my very first light in my hands."], [34.89, 35.79, "I was seven."], [40.35, 44.31, "Then, ten years ago... something rose from the river."], [44.35, 46.55, "A crown, made of smoke."], [47.31, 50.29, "That night, every clock in the flat stopped."], [50.51, 52.99, "And in the morning... they were gone."], [53.46, 58.94, "All they left me was her book, her hat...\nand an old broom that wouldn't stop glowing."], [60.82, 65.52, "So I taught myself.\nNight after night, on the roofs of Paris."], [65.68, 69.76, "No coven. No master. A lot of falling."], [74.59, 76.71, "But one night... I flew."], [78.47, 81.43, "Tonight, Paris is far too quiet."], [81.53, 85.23, "And someone is running across my rooftops."], [85.27, 86.7, "There you are."], [88.46, 91.76, "Wherever you are, Grandma...\nI'm coming to find you."]],el:null,on:false};
function playFilm(done){if(FILM.on){done&&done();return}FILM.on=true;
  const wasP=paused;paused=true;try{if(AC&&AC.state==='running')AC.suspend()}catch(e){}
  const o=document.createElement('div');o.id='filmO';FILM.el=o;
  o.style.cssText='position:fixed;inset:0;z-index:99999;background:#000;display:flex;align-items:center;justify-content:center;opacity:0;transition:opacity .6s';
  o.innerHTML='<video id="filmV" playsinline preload="auto" style="width:100%;height:100%;object-fit:contain;background:#000"></video>'+
   '<div id="filmS" style="position:absolute;left:6%;right:6%;bottom:7%;text-align:center;font:600 clamp(16px,2.3vw,30px)/1.35 Outfit,system-ui,sans-serif;color:#fff4e6;letter-spacing:.01em;text-shadow:0 0 6px #000,0 2px 10px rgba(0,0,0,.95),0 0 22px rgba(20,8,16,.8);white-space:pre-line;opacity:0;transition:opacity .15s;pointer-events:none"></div>'+
   '<button id="filmSkip" style="position:absolute;right:22px;top:18px;font:700 14px/1 Outfit,system-ui,sans-serif;letter-spacing:.08em;color:#f3d79a;background:rgba(10,6,14,.55);border:1px solid rgba(243,215,154,.45);border-radius:999px;padding:10px 16px;cursor:pointer;opacity:.75">SKIP ›</button>'+
   '<button id="filmTap" style="display:none;position:absolute;font:700 18px/1 Outfit,system-ui,sans-serif;color:#1a0f06;background:#f3c463;border:0;border-radius:999px;padding:16px 26px;cursor:pointer">▶ Play the story</button>';
  document.body.appendChild(o);requestAnimationFrame(()=>o.style.opacity='1');
  const v=o.querySelector('#filmV'),sub=o.querySelector('#filmS'),tap=o.querySelector('#filmTap');let cur=-1,ended=false,raf=0;
  v.src='assets/intro_maelle.mp4';v.volume=1;
  const tick=()=>{const t=v.currentTime;let k=-1;for(let i=0;i<FILM.subs.length;i++){const s=FILM.subs[i];if(t>=s[0]&&t<s[1]){k=i;break}}
    if(k!==cur){cur=k;if(k<0)sub.style.opacity='0';else{sub.textContent=FILM.subs[k][2];sub.style.opacity='1'}}raf=requestAnimationFrame(tick)};raf=requestAnimationFrame(tick);
  const finish=()=>{if(ended)return;ended=true;cancelAnimationFrame(raf);removeEventListener('keydown',key,true);o.style.opacity='0';try{v.pause()}catch(e){}
    setTimeout(()=>{o.remove();FILM.el=null;FILM.on=false;paused=wasP;try{if(AC&&AC.state==='suspended')AC.resume()}catch(e){}done&&done()},600)};
  const key=e=>{e.stopImmediatePropagation();e.preventDefault();if(!e.repeat&&(e.code==='Escape'||e.code==='Space'||e.code==='Enter'))finish()};
  addEventListener('keydown',key,true);
  o.querySelector('#filmSkip').addEventListener('click',finish);v.addEventListener('ended',finish);v.addEventListener('error',finish);
  const go=()=>{const p=v.play();if(p&&p.catch)p.catch(()=>{tap.style.display='block'})};
  tap.addEventListener('click',()=>{tap.style.display='none';go()});go()}
/* New Game in story mode: the film comes first, then the opening cutscene */
{const _pi=playIntro;playIntro=function(done){if(MODE==='open')return _pi.apply(this,arguments);const a=arguments,self=this;playFilm(()=>_pi.apply(self,a))}}
/* choosing Chapter I always replays it */
{const _ac=applyChapter;applyChapter=function(id){const r=_ac.apply(this,arguments);if(id==='kitsune'&&MODE!=='open')playFilm(null);return r}}
