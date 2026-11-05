/* ================= every boss gets its own theme; Bilel's quests get theirs ================= */
const BTH={beast:'mus_b_beast',giant:'mus_b_giant',catdemon:'mus_b_cat',slug:'mus_b_slug',queen:'mus_b_queen'};
MU.gain=Object.assign(MU.gain||{},{mus_b_beast:1.8,mus_b_giant:1.8,mus_b_cat:1.8,mus_b_slug:1.8,mus_b_queen:1.8,mus_greyfang:1.8,mus_kaenlb:1.8,mus_bilel:1.15});
if(MU.keys)MU.keys.push(...Object.values(BTH),'mus_bilel');
const bthKey=()=>{const k=started&&bossRef&&!bossRef.dead&&BTH[bossRef.type];if(!k)return null;return bmTrack(k).ok?k:null};
const bilelQuest=()=>MODE!=='open'&&started&&!bossRef&&BQ.met&&!BQ.done&&BQ.q>=0&&BQ.q<BQUESTS.length&&CH2.zone==='paris'&&!CH2.st;
{const _bw=bmWant;bmWant=function(){if(bthKey())return null;return _bw.apply(this,arguments)}}
{const _mw=muWant;muWant=function(){const b=bthKey();if(b)return b;if(bilelQuest()&&BM.tr.mus_bilel&&BM.tr.mus_bilel.ok)return 'mus_bilel';return _mw.apply(this,arguments)}}
// fetch the next boss's theme ahead of time so it is ready when the fight starts
{let pt=4;const _mt=muTick;muTick=function(dt){_mt(dt);pt-=dt;if(pt>0||!started)return;pt=10;try{for(const ty of['beast','giant','catdemon','slug','queen'])if(!beaten.has(ty)){bmTrack(BTH[ty]);break}if(BQ.met&&!BQ.done)bmTrack('mus_bilel')}catch(e){}}}
