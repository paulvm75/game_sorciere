/* ---------- gameplay barks: bosses taunt, she reacts (ElevenLabs) ---------- */
const BK={"kitsune":{"taunt":[["bk_b596b2c2","Too slow, little witch."],["bk_72b2c682","You can't catch a shadow."],["bk_377a80d0","Dance for me!"]],"hurt":[["bk_6bd9bc8a","Tch! Lucky shot."],["bk_1508f027","You'll pay for that scratch!"]],"low":[["bk_b4344dfe","No... not by a witch!"]]},"beast":{"taunt":[["bk_cd26e159","Burn, witch! BURN!"],["bk_31bf610f","Nine fires. One witch."],["bk_c8c5bdce","I'll kill you with this!"]],"hurt":[["bk_cee2fad0","RAAAGH! You'll suffer for that!"],["bk_6f8498fc","You won't escape my flames!"]],"low":[["bk_989ee48b","The seal... it's weakening..."]]},"giant":{"taunt":[["bk_f4c12fe6","Freeze, little flame."],["bk_f64b8764","Winter never ends."],["bk_1a1af250","You won't escape the cold."]],"hurt":[["bk_39e73b33","Hm. You sting like a bee."],["bk_40590147","The ice... cracks?"]],"low":[["bk_a0b627a2","Impossible... the winter... fading..."]]},"catdemon":{"taunt":[["bk_310d9c83","Nine lives, witch. You only have one."],["bk_14c30edd","I'll kill you with this!"],["bk_9e2a2ff4","Nowhere to run, little mouse."]],"hurt":[["bk_4ed70386","HISSS! Bad witch!"],["bk_ae2b2b89","That... actually hurt."]],"low":[["bk_565f745d","No... not my last life..."]]},"slug":{"taunt":[["bk_af08a87c","I WILL SWALLOW YOU WHOLE."],["bk_ad9f0d0e","YOU CANNOT ESCAPE THE SLIME."],["bk_1adfc7b8","CRAWL, WITCH. CRAWL."]],"hurt":[["bk_92af17e8","GRAAAH! IT BURNS!"],["bk_dcca43f1","YOU... WILL NOT... ESCAPE!"]],"low":[["bk_1d9b4bd2","THE QUEEN... WILL AVENGE ME..."]]},"queen":{"taunt":[["bk_84e687c4","Kneel, darling."],["bk_dde1ca7d","The abyss is patient. Are you?"],["bk_318b455c","You won't escape me."]],"hurt":[["bk_00701733","You dare touch a queen?"],["bk_966a878d","Enough games!"]],"low":[["bk_e934b771","Kaen... help me..."]]},"illusion":{"taunt":[["bk_c970d218","Everything you see is mine."],["bk_9f3b42f8","Which one of me is real, witch?"],["bk_306fe4dd","I'll kill you with this!"]],"hurt":[["bk_c4775b3d","You're starting to annoy me."],["bk_52ba7f87","Clever... but not enough."]],"low":[["bk_86bf61a3","No... this is not how it ends!"]],"rage":[["bk_1759b22c","Feel the void, witch!"],["bk_d2937ceb","Nothing can save you now!"],["bk_09b43e37","You won't escape this time!"],["bk_6d419dcb","ARGH! Still standing?!"]]},"kaenSpirit":{"taunt":[["bk_dad8aa5d","You can't kill what's already dead."],["bk_040f236c","Join me in the dark..."],["bk_e4f2c065","Dawn will never come."]],"hurt":[["bk_ee366579","You... cannot... banish me..."]],"low":[["bk_9f42ed2c","The dawn... it burns..."]]},"@":{"charge":[["bk_74dc0b47","I'll give it all NOW!"],["bk_981d2445","Take THIS!"],["bk_1fd72fbb","Everything I've got!"],["bk_eb9e1aab","Burn to ashes!"],["bk_b3f53c4c","Here it comes!"]],"exhausted":[["bk_8cfcd11b","I'm exhausted... but I can feel it. One more push!"],["bk_35003678","Almost there... come on. One more push!"],["bk_ff43706f","Breathe... focus... finish it!"]],"low":[["bk_9c04f5b1","Not like this... not yet!"],["bk_64c8fc21","Get up. Get UP!"],["bk_4ff8694b","I've been through worse... I think."]],"hit":[["bk_970e1287","Argh! That hurt!"],["bk_2f87455a","Is that all you've got?"],["bk_86546e8c","Ow! Okay, now I'm angry."],["bk_91031a6b","You'll pay for that."]],"lb":[["bk_4eeac4fc","Limit breaker!"],["bk_f9f42bef","Let's end this."],["bk_83132574","No more holding back!"]],"broom":[["bk_f42fa71b","Paris by night. Never gets old!"],["bk_b1b6863b","Faster, broom! Faster!"],["bk_033a4db2","Nothing beats the view from up here."],["bk_1eefd747","Woohoo! Hold on to your hats, Paris!"]],"broomtired":[["bk_aad0e556","Come on, broom... don't die on me now!"],["bk_bbf122ed","Ugh, running out of juice..."],["bk_71174baf","Okay, okay... landing. Gently!"]],"start":[["bk_79054798","Let's dance."],["bk_f262ce77","Bring it on!"],["bk_c4c8d3f3","Here we go again."]],"levelup":[["bk_d3dbfb3b","I feel stronger."],["bk_5a04ca8b","Oh, that feels good."]],"combo":[["bk_4853c95a","Too easy!"],["bk_4f5d774e","Who's next?"],["bk_97098dbd","Next!"]],"heal":[["bk_9cfea96f","Ah... much better."]],"nomana":[["bk_ebf85e4d","I'm out of mana!"],["bk_75e07d2f","Need a second to recharge..."]],"revive":[["bk_46af73ca","I'm not done yet!"]],"idle":[["bk_270b942d","Where to next?"],["bk_a6344dc7","Quiet night... too quiet."]]}};
const BKN={kitsune:'Hakuko',beast:'The Nine-Tails',giant:'Hrímgar',catdemon:'Azurmaw',slug:'Gorgoloth',queen:'Morwen',illusion:'Kaen',kaenSpirit:"Kaen's Spirit"};
const BKS={pri:-1,busy:0,last:{},cd:{},src:null,g:null,el:null,hideT:0,boss:null,bf:null,alive:true,hp:-1,mp:-1,lvl:0,lbT:0,fly:false,flyNext:0,tired:false,combo:0,csT:-9,any:0,idleNext:60,pre:false};
function bkKeys(){const a=[],b=[];for(const w in BK)for(const c in BK[w])for(const it of BK[w][c])(w==='@'?a:b).push(it[0]);return a.concat(b)}
function bkPrefetch(){if(BKS.pre)return;BKS.pre=true;const ks=bkKeys().filter(k=>MODE!=='open'||BK['@']&&Object.values(BK['@']).some(L=>L.some(x=>x[0]===k)));let i=0;const nx=()=>{if(i>=ks.length)return;voLoad(ks[i++]).then(()=>setTimeout(nx,70))};nx()}
{const _pc=playCutscene;playCutscene=function(){BKS.cs=true;bkStop(.08);bkHide();BKS.hideT=0;return _pc.apply(this,arguments)}}
{const _vpa=voPrefetchAll;voPrefetchAll=function(){_vpa();setTimeout(bkPrefetch,1500)}}
function bkEl(){if(BKS.el)return BKS.el;const st=document.createElement('style');st.textContent='#bark{position:fixed;left:50%;bottom:calc(23% + env(safe-area-inset-bottom,0px));transform:translate(-50%,8px);max-width:min(88vw,560px);padding:7px 16px 8px;border-radius:12px;background:rgba(12,7,24,.58);border:1px solid rgba(242,210,122,.22);color:#f4efe6;font-size:16px;line-height:1.35;text-align:center;text-shadow:0 2px 8px rgba(0,0,0,.9);opacity:0;transition:opacity .22s,transform .22s;pointer-events:none;z-index:40}#bark.on{opacity:1;transform:translate(-50%,0)}#bark b{display:block;font-family:"Pirata One",Georgia,serif;font-weight:400;font-size:15px;letter-spacing:.04em;color:#f2d27a;margin-bottom:1px}#bark b.foe{color:#ff8a8a}#bark i{font-style:italic}';document.head.appendChild(st);const d=document.createElement('div');d.id='bark';document.body.appendChild(d);BKS.el=d;return d}
function bkHide(){if(BKS.el)BKS.el.classList.remove('on')}
function bkStop(f){if(BKS.src&&AC){try{const t=AC.currentTime;BKS.g.gain.cancelScheduledValues(t);BKS.g.gain.setTargetAtTime(0,t,f||.05);BKS.src.stop(t+(f||.05)*5)}catch(e){}}BKS.src=null}
function bkPick(who,cat){const L=BK[who]&&BK[who][cat];if(!L||!L.length)return null;const id=who+'|'+cat;let i=Math.floor(Math.random()*L.length);if(L.length>1&&i===BKS.last[id])i=(i+1+Math.floor(Math.random()*(L.length-1)))%L.length;BKS.last[id]=i;return L[i]}
function bark(who,cat,prio,cd,chance){if(!started||CS.active||!P.alive&&cat!=='revive')return false;const t=time;prio=prio||0;
  if(chance!=null&&Math.random()>chance)return false;const id=who+'|'+cat;if(BKS.cd[id]>t)return false;
  if(t<BKS.busy&&prio<=BKS.pri)return false;const it=bkPick(who,cat);if(!it)return false;const [k,text]=it;
  BKS.cd[id]=t+(cd||0);bkStop(.04);const foe=who!=='@';const name=foe?(BKN[who]||who):HERO.name;
  const el=bkEl();el.innerHTML='<b'+(foe?' class="foe"':'')+'></b><i></i>';el.firstChild.textContent=name;el.lastChild.textContent=text;void el.offsetWidth;el.classList.add('on');
  let dur=Math.max(1.8,.9+text.length*.055);BKS.busy=t+dur;BKS.pri=prio;BKS.hideT=t+dur;BKS.any=t;
  if(!muted&&AC&&(foe||HERO.g==='f')){const req=performance.now();const sp=who==='kaenSpirit';
    const go=b=>{if(!b||muted||CS.active||performance.now()-req>900||BKS.hideT!==t+dur)return;
      const s=AC.createBufferSource();s.buffer=b;if(sp)s.playbackRate.value=.9;const g=AC.createGain();g.gain.value=foe?1.25:1.15;s.connect(g);g.connect(master);
      if(verbIn){const w=AC.createGain();w.gain.value=sp?.5:foe?.14:.08;g.connect(w);w.connect(verbIn)}
      s.start(0);BKS.src=s;BKS.g=g;const d=b.duration/(sp?.9:1);s.onended=()=>{if(BKS.src===s)BKS.src=null};
      CLIP.duckT=Math.max(CLIP.duckT,d*.8);BKS.hideT=BKS.busy=time+Math.max(d+.5,1.6)};
    if(CLIP.buf[k])go(CLIP.buf[k]);else voLoad(k).then(go)}
  return true}
function barkCharge(kf){if(kf>=.9)bark('@','charge',2,9,.75)}
function barkTick(dt){if(!started)return;const t=time,S=BKS;
  if(CS.active||S.cs){S.cs=CS.active;S.csT=t;if(S.src)bkStop(.08);bkHide();S.hideT=0;S.hp=P.hp;S.mp=P.mp;S.lvl=P.level;S.lbT=P.lbT||0;S.fly=P.flying;S.alive=P.alive;S.combo=typeof COMBO!=='undefined'?COMBO.n:0;return}
  if(S.hideT&&t>S.hideT){S.hideT=0;bkHide()}
  const grace=t-S.csT<1.2,mh=maxHP(),mm=maxMP();
  if(!S.alive&&P.alive&&!grace){bark('@','revive',4,0);S.hp=P.hp}
  S.alive=P.alive;if(!P.alive)return;
  // boss chatter
  const b=bossRef&&!bossRef.dead?bossRef:null;
  if(b!==S.boss){S.boss=b;S.bf=b?{s70:0,s40:0,low:0,ex:0,exQ:0,start:0,lb:!!b.lbPhase,taunt:t+6+Math.random()*5}:null}
  if(b&&S.bf&&BK[b.type]&&!b.invuln&&!grace){const F=S.bf,f=b.hp/Math.max(1,b.maxhp),ty=b.type;
    if(!F.start){F.start=1;bark('@','start',2,0,.8)}
    if(b.lbPhase&&!F.lb){F.lb=1;F.s70=F.s40=F.low=F.ex=F.exQ=0;F.taunt=t+12;bark(ty,BK[ty].rage?'rage':'taunt',3,0)}
    if(f<.7&&!F.s70){F.s70=1;bark(ty,'hurt',2,0)}else if(f<.4&&!F.s40){F.s40=1;bark(ty,'hurt',2,0)}
    if(f<.22&&!F.low){F.low=1;F.taunt=t+30;bark(ty,'low',3,0)}
    if(f<.1&&!F.ex&&!F.exQ)F.exQ=t+.6;
    if(F.exQ&&!F.ex&&t>F.exQ){if(bark('@','exhausted',3,0))F.ex=1;else if(t>F.exQ+7)F.ex=1;else F.exQ=t+.4}
    if(t>F.taunt){const pool=b.lbPhase&&BK[ty].rage&&Math.random()<.65?'rage':'taunt';bark(ty,pool,1,0);F.taunt=t+14+Math.random()*8}}
  // her own reactions
  if(S.hp>=0){const lost=S.hp-P.hp;
    if(P.level>S.lvl&&S.lvl>0)bark('@','levelup',2,6);
    else if(lost>mh*.15)bark('@','hit',1,16,.7);
    else if(-lost>mh*.25&&P.hp/mh>.45&&!grace)bark('@','heal',1,25,.8);
    if(P.hp/mh<.25&&S.hp/mh>=.25)bark('@','low',2,40)}
  if(S.mp>=0&&P.mp/mm<.08&&S.mp/mm>=.08)bark('@','nomana',1,25,.8);
  const lb=P.lbT||0;if(lb>S.lbT+5&&lb>=15)bark('@','lb',3,10);
  if(typeof COMBO!=='undefined'&&COMBO.n>=5&&COMBO.n!==S.combo&&COMBO.n%5===0)bark('@','combo',1,18,.8);S.combo=typeof COMBO!=='undefined'?COMBO.n:0;
  // broom
  if(P.flying&&!S.fly){S.tired=false;S.flyNext=t+9+Math.random()*8;bark('@','broom',0,20,.3)}
  if(P.flying){if(t>S.flyNext){S.flyNext=t+12+Math.random()*10;bark('@','broom',0,20,.3)}
    if(!S.tired&&P.flyT<1.6){S.tired=true;bark('@','broomtired',2,8,.4)}}
  S.fly=P.flying;
  // quiet moments
  if(!b&&!P.flying&&t-S.any>S.idleNext&&!grace){S.idleNext=55+Math.random()*50;S.any=t;bark('@','idle',0,90,.45)}
  S.hp=P.hp;S.mp=P.mp;S.lvl=P.level;S.lbT=lb}
