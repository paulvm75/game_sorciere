/* =====================================================================================
   CHAPTER XVI, fifth pass: short limit-breaker cinematics (hers, yours, yours x2),
   long limit breaker in the mirror fight, Limit Breaker x2 with blue lightning, easy mode 30% gentler
   ===================================================================================== */
Object.assign(XL3,{kx_04:"It's not enough! Push further, Maëlle! Break it again!",mw_37:'Limit breaker... TIMES TWO!',kx_05:"You're making the whole city shake!",kx_06:"Easy! You're shaking half of London!",kx_07:'Every spell you throw, the city shakes!',kx_08:'Feel that? The streets are trembling under you!'});
for(const k of ['kx_04','mw_37','kx_05','kx_06','kx_07','kx_08'])VO_MAP[XL3[k]]=k;

/* easy mode against yourself: 30% gentler */
xmDmg=function(b){return b*1.25*(1+.2*(P.level-1))*({easy:.43,medium:.95,hard:1.2}[DIFF]||.95)};
{const _g=xoMirrorGo;xoMirrorGo=function(p){const e=_g(p);if(DIFF==='easy'){e.maxhp=Math.round(e.maxhp*.7);e.hp=e.maxhp}return e}}
const XLBT=()=>({easy:90,medium:240,hard:120}[DIFF]||240);

/* a camera that circles whoever is breaking their limit */
const xmOrbit=(tgt,a0,R0,R1,h0,h1,spin)=>k=>{const p=tgt();const a=a0()+(spin||1.6)*k;const R=R0+(R1-R0)*k;return{pos:V3(p.x+Math.sin(a)*R,p.y+h0+(h1-h0)*k,p.z+Math.cos(a)*R),look:headOf(p,1.15)}};

/* her limit breaker, now with its own short cinematic */
xmGoLB=function(m){if(CS.active){after(.3,()=>xmGoLB(m));return}XO.bk.lb=1;xmFreeze(m);X4.cc=m.pos.clone();const tg=()=>m.pos,fa=()=>Math.atan2(P.pos.x-m.pos.x,P.pos.z-m.pos.z);
  const smoke=()=>{const c=eCenter(m);if(Math.random()<.3)SM.emit(V3(c.x+rand(-.8,.8),c.y+rand(-1,1.2),c.z+rand(-.8,.8)),{c0:0x0a0806,c1:0,s0:.8,s1:2.4,life:.9,a:.25,up:2.4});if(Math.random()<.5)SP.emit(V3(c.x+rand(-.8,.8),c.y+rand(-1,1.2),c.z+rand(-.8,.8)),{c0:0xffe8a0,c1:0x301800,s0:.5,s1:.05,life:.8,up:3,speed:.6});if(m.m.fl)for(const q of m.m.fl)q.material.uniforms.uT.value=time};
  playCutscene([
    {who:'The Crown, wearing Maëlle',text:XL3.mm_08,fov:40,cut:true,cam:xmOrbit(tg,fa,3.2,2.4,1.2,1.5,.6),onStart:()=>{try{m.m.actor.setBase('Crouch_Idle_Loop',.1)}catch(x){}sx('riser',1,null,{rate:.6});sx('heart',.8);P.shake=.6},update:(dt,k)=>{smoke();P.shake=Math.max(P.shake,.3+k*.5)}},
    {dur:2.2,fov:52,cut:true,cam:xmOrbit(tg,fa,5,8,1.4,2.6,1.3),onStart:()=>{xmDarkOn(m);try{m.m.actor.setBase('Idle_Loop',.1)}catch(x){}lbBoom(eCenter(m),0xffb030,true);SM.emit(eCenter(m),{n:24,c0:0x0a0806,c1:0,s0:1.5,s1:6,life:1.4,a:.3,speed:8});SP.emit(eCenter(m),{n:180,c0:0xffffff,c1:0xffc040,speed:14,life:1.1,s0:.8,s1:.1});x5Banner('LIMIT BREAKER','SHE WILL NOT FALL','#ffd060',1.8,'#000')},update:()=>{smoke();const c=eCenter(m);if(Math.random()<.5)lightning(V3(c.x,c.y+1.6,c.z),V3(c.x+rand(-1.6,1.6),c.y+rand(-1,.6),c.z+rand(-1.6,1.6)),0xffd060)}}],
    ()=>{xmThaw(m);xmDarkOn(m);const v=V3(P.pos.x-m.pos.x,0,P.pos.z-m.pos.z);if(v.lengthSq()<.01)v.set(1,0,0);v.normalize();if(P.pos.distanceTo(m.pos)<10){P.pos.x+=v.x*5;P.pos.z+=v.z*5}
      const h0=m.hp,gain=m.maxhp*.4;addFx(null,1.6,(f,k)=>{if(!m.dead)m.hp=Math.min(m.maxhp,h0+gain*k)},()=>floatText(headOf(m.pos,2.8),'+40%','#ffd060',true));
      m.hpFloor=.04;after(.8,()=>xmShieldUp(m));XO.shT=9;XO.skyT=2.5;XO.lbSeq=1;sayHush();after(1.1,()=>{if(XO.ph!==2){XO.lbSeq=0;return}x5Say('Kaen','kw_21',2);xmAfterSay(1.4,xmMyLB,11)})})};

/* your limit breaker, with its short cinematic, and it lasts */
function xmMyLB(){if(XO.ph!==2||!P.alive)return;if(CS.active||XO.fc){after(.4,xmMyLB);return}const m=XO.mir;if(m)xmFreeze(m);const tg=()=>P.pos,fa=()=>P.face+Math.PI*.8;
  playCutscene([
    {who:'@',text:XL3.mw_33,fov:38,cut:true,cam:xmOrbit(tg,fa,3,2.3,1.3,1.5,.7),onStart:()=>{P.heroAnim='Spell_Simple_Idle_Loop';sx('riser',1,null,{rate:.75});P.shake=.5},update:(dt,k)=>{SP.emit(V3(P.pos.x+rand(-1,1),P.pos.y+rand(0,2),P.pos.z+rand(-1,1)),{n:2,c0:0xfff0b0,c1:0xffc040,s0:.4,s1:.04,life:.6,up:2,speed:.5});P.shake=Math.max(P.shake,.25+k*.5)}},
    {dur:2.2,fov:52,cut:true,cam:xmOrbit(tg,fa,5,8,1.5,2.8,1.3),onStart:()=>{XO.quiet=1;P.lbT=0;try{witchLimitBreak(false)}catch(x){}XO.quiet=0;P.lbT=XLBT();P.lbRamp=1;try{lbSet(1)}catch(x){}x5Banner('LIMIT BREAKER','MAËLLE','#ffd060',1.8,'#1a1206')},
      update:()=>{if(Math.random()<.6)lightning(V3(P.pos.x,P.pos.y+3,P.pos.z),V3(P.pos.x+rand(-2.5,2.5),P.pos.y+rand(0,1.5),P.pos.z+rand(-2.5,2.5)),0xffd060)}}],
    ()=>{P.heroAnim=null;P.lbT=Math.max(P.lbT||0,XLBT());P.lbRamp=1;XO.bk.my=XO.t;if(m)xmThaw(m);after(2,()=>{if(XO.ph===2)x5Say('@','mw_34',1)});
      toast(DIFF==='easy'?'Your limit breaker holds until the end of this fight.':DIFF==='hard'?'Limit breaker: 2 minutes.':'Limit breaker: 4 minutes.','Limit Breaker',true)})}
/* the generic scream from the last pass stays out of these cinematics */

/* Limit Breaker x2: Kaen asks for more, the aura explodes, blue lightning, the biggest hits */
function xmX2Aura(on){let a=XO.x2a;if(on&&!a){a=new THREE.Group();const s1=glowSprite(0x60a0ff,6.5,.32),s2=glowSprite(0xffd060,4.5,.3);s1.position.y=s2.position.y=1.1;a.add(s1);a.add(s2);a.s1=s1;a.s2=s2;W.g.add(a);XO.x2a=a}if(a)a.visible=!!on}
function xmX2(m){if(CS.active||XO.fc){after(.4,()=>xmX2(m));return}xmFreeze(m);const tg=()=>P.pos,fa=()=>P.face+Math.PI*.8;let bt=0;
  playCutscene([
    {who:'Kaen',text:XL3.kx_04,fov:38,cam:x4S(x4K,1,2.4,1.7),onStart:()=>{x4Talk('Kaen');x5Impact(50,.05)}},
    {who:'@',text:XL3.mw_37,fov:36,cut:true,cam:xmOrbit(tg,fa,3,2.2,1.2,1.6,.8),onStart:()=>{x4Talk('@');P.heroAnim='Spell_Simple_Idle_Loop';sx('riser',1,null,{rate:.55});sx('dcharge',1,null,{rate:.8})},
      update:(dt,k)=>{P.shake=Math.max(P.shake,.4+k*.7);if(Math.random()<.7)lightning(V3(P.pos.x,P.pos.y+3.2,P.pos.z),V3(P.pos.x+rand(-2,2),P.pos.y+rand(0,1.6),P.pos.z+rand(-2,2)),Math.random()<.7?0x60a0ff:0xffd060);SP.emit(headOf(P.pos,1.1),{n:3,c0:0xffffff,c1:0x60a0ff,s0:.5,s1:.05,life:.5,speed:6})}},
    /* the aura goes off like a bomb, again and again */
    {dur:3.2,fov:58,cut:true,cam:xmOrbit(tg,fa,6,11,1.6,4,1.6),onStart:()=>{x4Talk('');xmX2Aura(true);P.lb2=1;lbBoom(headOf(P.pos,1.2),0x60a0ff,true);x5Banner('LIMIT BREAKER ×2','THE BIGGEST ONE','#9cc8ff',2.2,'#06102a')},
      update:(dt,k)=>{bt-=dt;if(bt<=0){bt=.38;const c=headOf(P.pos,rand(.4,2)).add(V3(rand(-2.5,2.5),0,rand(-2.5,2.5)));flash(c,Math.random()<.5?0x60a0ff:0xffd060,22);fireBurst(c,2.4,false);ring(V3(P.pos.x,groundAt(P.pos.x,P.pos.z)+.1,P.pos.z),0x60a0ff,1,8+rand(0,8),.4);sx('impact',.8,null,{rate:rand(.5,.8)});try{sfx.boom&&sfx.boom()}catch(x){}x5Punch(12,.3);P.shake=1.6}
        for(let i=0;i<2;i++)lightning(V3(P.pos.x,P.pos.y+3.5,P.pos.z),V3(P.pos.x+rand(-4,4),P.pos.y+rand(0,2),P.pos.z+rand(-4,4)),Math.random()<.75?0x60a0ff:0xffd060);if(XO.x2a){XO.x2a.s1.scale.setScalar(6.5+Math.sin(time*20)*1.5)}}}],
    ()=>{x4Talk('');P.heroAnim=null;P.lb2=1;xmX2Aura(true);P.lbT=Math.max(P.lbT||0,60);P.lbRamp=1;XO.bk.ct=6;if(m)xmThaw(m);toast('Limit Breaker ×2. Your spells hit twice as hard and shake the city.','Limit Breaker ×2',true)})}
{const _de=damageEnemy;damageEnemy=function(e,amt){if(P.lb2&&e&&e===XO.mir&&typeof amt==='number'&&amt>0){const a=[...arguments];a[1]=amt*2.2;return _de.apply(this,a)}return _de.apply(this,arguments)}}
{const _dp=damagePlayer;damagePlayer=function(a){if(P.lb2&&typeof a==='number')a*=.7;return _dp.call(this,a)}}
/* every spell you throw shakes the street, and Kaen notices */
{const _tc=tryCast;tryCast=function(i){const r=_tc.apply(this,arguments);if(P.lb2&&XO.ph===2&&!CS.active){P.shake=Math.max(P.shake,.35);x5Punch(4,.12);if(Math.random()<.5)lightning(V3(P.pos.x,P.pos.y+3,P.pos.z),V3(P.pos.x+rand(-2,2),P.pos.y+rand(0,1.4),P.pos.z+rand(-2,2)),0x60a0ff);
    if((XO.bk.ct||0)<=0&&Math.random()<.3){XO.bk.ct=rand(14,20);const v=['kx_05','kx_06','kx_07','kx_08'][(XO.bk.cn=(XO.bk.cn||0)+1)%4];x5Say('Kaen',v,1)}}return r}}

/* the fight tick: when to push further, the x2 aura in play, limit-breaker clock */
{const _st=xmSagaTick;xmSagaTick=function(dt){_st.apply(this,arguments);const m=XO.mir,B=XO.bk;if(!m||m.dead||!B)return;B.ct=(B.ct||0)-dt;
  if(DIFF==='easy'&&B.my!=null&&P.alive)P.lbT=Math.max(P.lbT||0,5);
  if(B.my!=null&&!B.x2&&P.lbT>0&&!CS.active&&!XO.fc&&!m.invuln&&(XO.t-B.my>20||m.hp/m.maxhp<.35)){B.x2=1;xmX2(m)}
  if(P.lb2){if(!(P.lbT>0)){P.lb2=0;xmX2Aura(false);return}FIN.boost=Math.max(FIN.boost||0,1.8);if(Math.random()<dt*7)lightning(V3(P.pos.x,P.pos.y+3,P.pos.z),V3(P.pos.x+rand(-2.4,2.4),P.pos.y+rand(0,1.6),P.pos.z+rand(-2.4,2.4)),Math.random()<.8?0x60a0ff:0xffd060);
    if(Math.random()<dt*12)SP.emit(V3(P.pos.x+rand(-1,1),P.pos.y+rand(0,2.2),P.pos.z+rand(-1,1)),{c0:0xffffff,c1:0x60a0ff,s0:.4,s1:.04,life:.7,up:2,speed:.5});if(XO.x2a)XO.x2a.s1.material.opacity=.26+Math.sin(time*9)*.08}}}
/* the old trigger that fired your limit breaker without a cinematic is replaced by xmMyLB */
{const cl=()=>{P.lb2=0;xmX2Aura(false)};const _or=x5OReset;x5OReset=function(){cl();return _or.apply(this,arguments)};const _rv=x5ORevive;x5ORevive=function(){cl();return _rv.apply(this,arguments)};const _end=xoEnd;xoEnd=function(){cl();P.lbT=Math.min(P.lbT||0,3);return _end.apply(this,arguments)}}
{const _sky=xmSagaTick;xmSagaTick=function(dt){if(DIFF==='easy'&&XO.skyT!=null&&XO.skyT>0)XO.skyT+=dt*.3;return _sky.apply(this,arguments)}}

/* voice pack 25 */
const VOPK4={idx:{"kx_04":[0,34943],"mw_37":[34943,24285],"kx_05":[59228,20106],"kx_06":[79334,33480],"kx_07":[112814,26793],"kx_08":[139607,26584]},p:null};
{const _vr=voRaw;voRaw=function(k){const ix=VOPK4.idx[k];if(!ix||VO.raw[k])return _vr(k);if(!VOPK4.p)VOPK4.p=fetch('assets/vo25.mp3').then(r=>r.ok?r.arrayBuffer():null).catch(()=>null);
  VO.raw[k]=VOPK4.p.then(b=>b&&b.byteLength>=ix[0]+ix[1]?b.slice(ix[0],ix[0]+ix[1]):fetch('assets/'+k+'.mp3').then(r=>r.ok?r.arrayBuffer():null).catch(()=>null));return VO.raw[k]}}
/* the limit breaker badge: minutes, ×2, and no clock on easy in the mirror fight */
{const _lt=lbTick;lbTick=function(dt){const r=_lt.apply(this,arguments);try{if(lbBadge&&lbBadge.style.display!=='none'&&P.lbT>0){const t=Math.ceil(P.lbT),mm=Math.floor(t/60),ss=String(t%60).padStart(2,'0');const inf=DIFF==='easy'&&XO.ph===2&&XO.bk&&XO.bk.my!=null;
  lbBadge.textContent=(P.lb2?'LIMIT BREAKER ×2':'LIMIT BREAKER')+(inf?' · ∞':' '+(t>=60?mm+':'+ss:t+'s'));lbBadge.style.background=P.lb2?'linear-gradient(90deg,#06102a,#16306a)':'';lbBadge.style.color=P.lb2?'#bcdcff':''}}catch(x){}return r}}

/* ---------- the witch card on the title screen: hidden, one small link opens it ---------- */
(function(){const st=document.createElement('style');st.textContent=`#mmCard2.mmHide,#start.mm2>#mmCard2.mmHide{display:none!important}
#mmCardTog{position:fixed;display:none;left:calc(22px + env(safe-area-inset-left,0px));bottom:calc(22px + env(safe-area-inset-bottom,0px));z-index:61;padding:6px 13px;border:0;border-radius:99px;background:rgba(14,10,30,.55);backdrop-filter:blur(6px);color:rgba(243,227,192,.75);font:inherit;font-size:12px;letter-spacing:.06em;cursor:pointer;box-shadow:inset 0 0 0 1px rgba(243,227,192,.18)}
#mmCardTog:hover{color:#f2a541;background:rgba(30,20,50,.75)}#mmCardTog.open{bottom:auto;top:calc(22px + env(safe-area-inset-top,0px))}`;document.head.appendChild(st)})();
{const _mc=mmCard2;mmCard2=function(){const r=_mc.apply(this,arguments);try{const C=$('mmCard2'),S=$('start');if(!C||!S)return r;if(!C.dataset.tog){C.dataset.tog=1;C.classList.add('mmHide')}let b=$('mmCardTog');if(!b){b=document.createElement('button');b.id='mmCardTog';document.body.appendChild(b);setInterval(()=>{const S2=$('start');const on=S2&&S2.classList.contains('mm2')&&!S2.classList.contains('cv')&&getComputedStyle(S2).display!=='none'&&!S2.classList.contains('hidden');b.style.display=on?'block':'none'},300);b.addEventListener('click',e=>{e.stopPropagation();const c=$('mmCard2');if(!c)return;c.classList.toggle('mmHide');lab()})}
  const lab=()=>{const c=$('mmCard2'),ni=$('nameIn'),lv=save&&save.level||1;const open=c&&!c.classList.contains('mmHide');b.classList.toggle('open',open);b.textContent=open?'✕ Close':'✦ '+((ni&&ni.value)||HERO.name||'Maëlle')+' · Lv '+lv};lab()}catch(x){}return r}}
/* ---------- easy mode against yourself: 32% harder than last pass, harder still once she breaks her limit ---------- */
xmDmg=function(b){return b*1.25*(1+.2*(P.level-1))*({easy:.57,medium:.95,hard:1.2}[DIFF]||.95)*(DIFF==='easy'&&XO.mir&&XO.mir.lb?1.2:1)};
{const _g=xoMirrorGo;xoMirrorGo=function(p){const e=_g(p);if(DIFF==='easy'){e.maxhp=Math.round(e.maxhp*1.32);e.hp=e.maxhp}return e}}
{const _sky=xmSagaTick;xmSagaTick=function(dt){if(DIFF==='easy'&&XO.mir&&XO.mir.lb&&XO.skyT!=null)XO.skyT-=dt*.3;return _sky.apply(this,arguments)}}
/* Kaen's advice once she is in limit breaker */
XL3.kx_09="She's stronger now! Teleport, dodge as much as you can, and hit her when you can!";VO_MAP[XL3.kx_09]='kx_09';
{const _lb=xmGoLB;xmGoLB=function(m){const r=_lb.apply(this,arguments);if(XO.bk&&!XO.bk.k9&&XO.bk.lb){XO.bk.k9=1}return r}}
/* limit breaker x2: far harder to hurt */
{const _dp=damagePlayer;damagePlayer=function(a){if(P.lb2&&typeof a==='number')a*=.65;return _dp.call(this,a)}}
