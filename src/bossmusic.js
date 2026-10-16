/* ---------- boss music (Web Audio buffers: plays wherever the game's other sound plays) ---------- */
const BM={tr:{},finalFor:null,pre:false,raw:{}};
function bmFetch(k){if(BM.raw[k])return BM.raw[k];BM.raw[k]=fetch('assets/'+k+'.mp3').then(r=>{if(!r.ok)throw 0;return r.arrayBuffer()}).catch(()=>null);return BM.raw[k]}
function bmTrack(k){let t=BM.tr[k];if(t)return t;t=BM.tr[k]={buf:null,v:0,g:null,ok:false,playing:false,src:null,dec:false};
  bmFetch(k).then(b=>{if(!b)return;const go=()=>{if(!AC){setTimeout(go,500);return}if(t.dec)return;t.dec=true;
    const done=buf=>{t.buf=buf;t.ok=true};try{const p=AC.decodeAudioData(b.slice(0),done,()=>{t.dec=false});if(p&&p.catch)p.catch(()=>{})}catch(e){t.dec=false}};go()});return t}
function bmPrefetch(){if(BM.pre||MODE==='open')return;BM.pre=true;bmTrack('boss1');bmFetch('boss2');setTimeout(()=>{if(typeof voPrefetchAll==='function')voPrefetchAll();clipLoad('vo_bilel_no');clipLoad('sfx_ki');clipLoad('vo_kaen_kill')},6000)}
function bmWant(){if(MODE==='open'||!started||!bossRef||bossRef.dead)return null;return bossRef===BM.finalFor||(bossRef.type==='illusion'&&bossRef.lbPhase)?'boss2':'boss1'}
function bmActive(){for(const k in BM.tr){const t=BM.tr[k];if(t.playing&&t.v>.05)return true}return false}
function bmStart(t){if(!AC||!t.buf)return;if(!t.g){t.g=AC.createGain();t.g.gain.value=0;t.g.connect(master)}try{if(t.src)t.src.stop()}catch(e){}
  const s=AC.createBufferSource();s.buffer=t.buf;s.loop=true;s.connect(t.g);s.start(0);t.src=s;t.playing=true}
function bmStop(t){try{if(t.src)t.src.stop()}catch(e){}t.src=null;t.playing=false}
function bmTick(dt){if(!BM.pre)return;dt=Math.min(dt,.1);let want=bmWant();if(want==='boss2'&&!bmTrack('boss2').ok)want='boss1';if(want)bmTrack(want);if(bossRef&&bossRef.type==='illusion')bmTrack('boss2');const on=!(muted||!musicOn);if(CLIP.duckT>0){CLIP.duckT-=dt;SFXDUCK=1}BM.duck=Math.max(SFXDUCK?(CLIP.duckT>0?1.6:1):0,(BM.duck||0)-dt*2.2);SFXDUCK=0;if(sfxBus){const fight=!!want;const tg=fight?2.3:1.15;sfxBus.gain.value+=(tg-sfxBus.gain.value)*Math.min(1,dt*3)}
  for(const k of['boss1','boss2']){const t=BM.tr[k];if(!t)continue;const tgt=want===k&&t.ok?1:0;
    const rate=tgt>t.v?dt/1.0:dt/(want?1.2:3);t.v=tgt>t.v?Math.min(tgt,t.v+rate):Math.max(tgt,t.v-rate);
    if(tgt>0&&!t.playing)bmStart(t);
    if(t.playing&&t.v<=0&&tgt===0)bmStop(t);
    if(t.g)t.g.gain.value=t.v*t.v*.6*Math.max(.15,1-.38*BM.duck)*(on?1:0)}}
/* ---------- one-shot voice / sfx clips ---------- */
const CLIP={buf:{},req:{},duckT:0};
function clipLoad(k){if(CLIP.req[k])return CLIP.req[k];CLIP.req[k]=fetch('assets/'+k+'.mp3').then(r=>r.ok?r.arrayBuffer():null).then(b=>new Promise(res=>{if(!b)return res(null);const go=()=>{if(!AC){setTimeout(go,400);return}try{const p=AC.decodeAudioData(b,x=>{CLIP.buf[k]=x;res(x)},()=>res(null));if(p&&p.catch)p.catch(()=>{})}catch(e){res(null)}};go()})).catch(()=>null);return CLIP.req[k]}
function clipPlay(k,vol=1,duck=0){if(!AC||muted)return;const go=b=>{if(!b)return;const s=AC.createBufferSource();s.buffer=b;const g=AC.createGain();g.gain.value=vol;s.connect(g);g.connect(master);if(verbIn){const w=AC.createGain();w.gain.value=.18*vol;g.connect(w);w.connect(verbIn)}s.start(0);if(duck)CLIP.duckT=Math.max(CLIP.duckT,Math.min(duck,b.duration))};
  if(CLIP.buf[k])go(CLIP.buf[k]);else clipLoad(k).then(go)}
