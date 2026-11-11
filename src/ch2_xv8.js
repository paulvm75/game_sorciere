/* =====================================================================================
   CHAPTER XVI, sixth pass: smoke morphs, a stormier Kaen with red guardians, mirror eyes,
   a blue-white x2, a later x2, a clearer warning before the last mash
   ===================================================================================== */

/* ---------- morphs: no twist, no boom. Smoke takes the old one, the new one grows out of it ---------- */
function xoOp(e,a){if(!e||!e.xo)return;const S=e.xo.Ls||(e.xo.Ls=new Set(e.xo.L.map(q=>q[0])));for(const q of e.xo.L){const m=q[0].material;if(!m)continue;m.transparent=a<.999;m.opacity=a;m.depthWrite=a>.55}
  e.m.g.traverse(o=>{if(S.has(o)||!(o.isMesh||o.isSprite||o.isPoints))return;if(o._ov===undefined)o._ov=o.visible;o.visible=o._ov&&a>.45})}
xoMorph=function(i){if(CS.active){after(.3,()=>xoMorph(i));return}const old=XO.e,F=XOF[i];const p=old?old.pos.clone():XOC();p.y=groundAt(p.x,p.z);XO.ph=1.5;XO.e=null;P.invuln=Math.max(P.invuln,6);sayHush();
  for(const q of eProjs)scene.remove(q.s);eProjs.length=0;xoClear(old);const v=V3(p.x-P.pos.x,0,p.z-P.pos.z);if(v.lengthSq()<.01)v.set(0,0,-1);v.normalize();const a0=Math.atan2(-v.x,-v.z);
  const orbit=(R,y,an)=>V3(p.x+Math.sin(a0+an)*R,p.y+y,p.z+Math.cos(a0+an)*R);let e=null,gone=0;
  if(old&&old.m){old.dead=true;old.invuln=true;if(old===bossRef)bossRef=null;$('boss').classList.add('hidden');if(old.xo)xoFade(old.xo.L,true,.7)}
  const smoke=n=>{for(let k=0;k<n;k++){const an=Math.random()*TAU,r=rand(.3,1.8);SM.emit(V3(p.x+Math.sin(an)*r,p.y+rand(0,3.4),p.z+Math.cos(an)*r),{c0:0x3a4440,c1:0x05080a,s0:1.6,s1:4.6,life:1.8,a:.5,up:.9})}};
  sx('wind',.55,null,{rate:.7});sx('portal',.45,null,{rate:.55});
  playCutscene([{dur:3.8,fov:50,cam:k=>({pos:orbit(17-k*3.5,6.2-k*2,-.25+k*.35),look:V3(p.x,p.y+2,p.z)}),onStart:()=>{CS.speed=1},
    update:(dt,k)=>{smoke(k<.75?4:2);
      if(old&&old.m&&!gone){const q=clamp((k-.2)/.4,0,1);try{xoOp(old,1-q)}catch(x){}if(q>=1){gone=1;scene.remove(old.m.g)}}
      if(!e&&k>.55){e=xoSpawn(i,p);e.busy=99;e.invuln=true;e.m.g.rotation.y=Math.atan2(P.pos.x-p.x,P.pos.z-p.z);$('boss').classList.add('hidden');xoOp(e,0);if(F.t==='giant')snow.force=1;sx('riser',.45,null,{rate:.75});after(.5,()=>x5Banner(F.nm,F.sub,F.col,2));if(F.say)x5Say('The Crown',F.say,1)}
      if(e)xoOp(e,clamp((k-.55)/.45,0,1)*.65)}}],
    ()=>{CS.speed=1;if(old&&old.m&&old.m.g.parent)scene.remove(old.m.g);if(!e){e=xoSpawn(i,p);xoOp(e,.65)}e.busy=1.4;bossRef=e;$('boss').classList.remove('hidden');XO.ph=1;XO.cmp=i<5?1:0;P.invuln=Math.max(P.invuln,1.6);
      addFx(null,1.4,(f,k)=>xoOp(e,.65+.35*k),()=>{xoOp(e,1);e.invuln=false})})};

/* ---------- Kaen arrives in a storm, and his guardians come back red ---------- */
function xoStorm(p,dt,amt){if(Math.random()<dt*2.2*amt){const q=V3(p.x+rand(-10,10),0,p.z+rand(-10,10));q.y=groundAt(q.x,q.z);xoBeam(V3(q.x,46,q.z),q,Math.random()<.5?0xb070ff:0xffffff,.22,.45);flash(q,0xc9a6ff,12);ring(q,0xb070ff,.3,3,.3);sx('laser',.25,null,{rate:rand(.4,.6)});P.shake=Math.max(P.shake,.4)}}
function xoRedGuards(e,n){const before=new Set(enemies);try{summonGuardians(e,n)}catch(x){return}for(const g of enemies){if(before.has(g)||g.type!=='guardian'||g.dead)continue;g.red=1;g.def=Object.assign({},g.def,{name:'Crimson guardian'});
    g.m.g.traverse(o=>{if(o.material&&!Array.isArray(o.material)){const m=o.material.clone();if(m.color){const h={};m.color.getHSL(h);m.color.setHSL(.99,Math.max(.6,h.s),Math.min(.6,h.l*1.05))}if(m.emissive)m.emissive.setRGB(m.emissive.r*1.2+.15,m.emissive.g*.15,m.emissive.b*.2);if(m.uniforms&&m.uniforms.uC)m.uniforms.uC.value=new THREE.Color(0xff3040);o.material=m}});
    const c=eCenter(g);flash(c,0xff3040,14);SM.emit(V3(c.x,c.y,c.z),{n:30,c0:0xff4050,c1:0x200408,s0:3,s1:8,speed:4,up:3,life:1.4,a:.6})}}
function xoKaenBolt(e,p){xoBeam(V3(p.x,70,p.z),headOf(p,1.1),0xe0d0ff,.7,2.2);xoBeam(V3(p.x+.6,70,p.z-.4),headOf(p,1.1),0xb070ff,.5,1.2);x5Impact(160,.18);P.shake=1.6;sx('skyshatter',.9,null,{rate:.8});
  for(let i=0;i<6;i++)after(i*.07,()=>lightning(headOf(p,2.5),headOf(p,rand(0,1.6)).add(V3(rand(-3,3),0,rand(-3,3))),0xd0b0ff));after(.5,()=>{if(e&&!e.dead&&e.xo&&!e.xo.gx){e.xo.gx=1;e.xo.g0=1;xoRedGuards(e,2)}})}
{const _ai=BOSSAI.illusion;BOSSAI.illusion=function(e,dt,d){if(e.xo&&!e.invuln){const X=e.xo,r=e.hp/e.maxhp;if(!X.g0){X.g0=1;xoRedGuards(e,1)}if(!X.g1&&r<.66){X.g1=1;xoRedGuards(e,2)}if(!X.g2&&r<.33){X.g2=1;xoRedGuards(e,2)}}return _ai.apply(this,arguments)}}

/* ---------- mean Maëlle's eyes: no green glow; red only in her limit breaker ---------- */
{const _g=xoMirrorGo;xoMirrorGo=function(p){const e=_g(p);try{e.m.eyes=[];e.m.g.traverse(o=>{if(o.isSprite&&o.material&&o.material.color&&o.material.color.getHex()===0x9dffb0&&o.scale.x<.5){o.visible=false;e.m.eyes.push(o)}})}catch(x){}return e}}
{const _d=xmDarkOn;xmDarkOn=function(m){const r=_d.apply(this,arguments);try{for(const o of m.m.eyes||[]){o.visible=true;o.material=o.material.clone();o.material.color.setHex(0xff1a1a)}}catch(x){}return r}}

/* ---------- Limit Breaker x2: light and electricity, no black ---------- */
xmX2=function(m){if(CS.active||XO.fc){after(.4,()=>xmX2(m));return}xmFreeze(m);const tg=()=>P.pos,fa=()=>P.face+Math.PI*.8;let bt=0;
  const zap=n=>{for(let i=0;i<n;i++)lightning(V3(P.pos.x,P.pos.y+3.6,P.pos.z),V3(P.pos.x+rand(-5,5),P.pos.y+rand(0,2.2),P.pos.z+rand(-5,5)),Math.random()<.85?0x60a0ff:0xffffff)};
  playCutscene([
    {who:'Kaen',text:XL3.kx_04,fov:38,cam:x4S(x4K,1,2.4,1.7),onStart:()=>{x4Talk('Kaen');x5Impact(50,.05)}},
    {who:'@',text:XL3.mw_37,fov:36,cut:true,cam:xmOrbit(tg,fa,3,2.2,1.2,1.6,.8),onStart:()=>{x4Talk('@');P.heroAnim='Spell_Simple_Idle_Loop';sx('riser',1,null,{rate:.55});sx('dcharge',1,null,{rate:.8})},
      update:(dt,k)=>{P.shake=Math.max(P.shake,.4+k*.7);zap(1);SP.emit(headOf(P.pos,1.1),{n:4,c0:0xffffff,c1:0x60a0ff,s0:.5,s1:.05,life:.5,speed:7})}},
    {dur:3.4,fov:60,cut:true,cam:xmOrbit(tg,fa,6,12,1.6,4.2,1.6),onStart:()=>{x4Talk('');xmX2Aura(true);P.lb2=1;const c=headOf(P.pos,1.2);flash(c,0xffffff,60);flash(c,0x60a0ff,40);x5Impact(200,.3);x5Punch(26,.8);P.shake=2;
        ring(V3(P.pos.x,groundAt(P.pos.x,P.pos.z)+.1,P.pos.z),0xffffff,1,30,.8);ring(V3(P.pos.x,groundAt(P.pos.x,P.pos.z)+.1,P.pos.z),0x60a0ff,1,22,.6);SP.emit(c,{n:420,c0:0xffffff,c1:0x60a0ff,speed:26,life:1.4,s0:.9,s1:.06});sx('skyshatter',1,null,{rate:.55});sx('ktf',1,null,{rate:.6});try{sfx.boom&&sfx.boom()}catch(x){}zap(14);
        x5Banner('LIMIT BREAKER ×2','LIGHT AND LIGHTNING','#bfe0ff',2.2,'#06102a')},
      update:(dt,k)=>{bt-=dt;if(bt<=0){bt=.32;const c=headOf(P.pos,rand(.4,2.2)).add(V3(rand(-3,3),0,rand(-3,3)));flash(c,Math.random()<.6?0xffffff:0x60a0ff,26);SP.emit(c,{n:60,c0:0xffffff,c1:0x60a0ff,speed:14,life:.6,s0:.5,s1:.05});ring(V3(P.pos.x,groundAt(P.pos.x,P.pos.z)+.1,P.pos.z),0x9cd0ff,1,8+rand(0,10),.35);sx('laser',.6,null,{rate:rand(.5,.8)});x5Punch(10,.25);P.shake=1.4}
        zap(3);if(XO.x2a)XO.x2a.s1.scale.setScalar(7+Math.sin(time*22)*1.8)}}],
    ()=>{x4Talk('');P.heroAnim=null;P.lb2=1;xmX2Aura(true);P.lbT=Math.max(P.lbT||0,60);P.lbRamp=1;XO.bk.ct=6;if(m)xmThaw(m);toast('Limit Breaker ×2. Your spells hit twice as hard and shake the city.','Limit Breaker ×2',true)})};
{const _xa=xmX2Aura;xmX2Aura=function(on){_xa(on);try{const a=XO.x2a;if(a&&!a._w){a._w=1;a.s2.material=a.s2.material.clone();a.s2.material.color.setHex(0xffffff);a.s2.material.opacity=.35}}catch(x){}}}
/* the gold aura's dark sparks turn blue-white while x2 is on, and the lightning is mostly blue */
{const _lt=lbTick;lbTick=function(dt){if(!P.lb2)return _lt.apply(this,arguments);const _e=SP.emit;SP.emit=function(p,o){if(o){if(o.c0===0x201000)o.c0=0xbfe0ff;if(o.c1===0x301800||o.c1===0x402000)o.c1=0x2050a0}return _e.call(SP,p,o)};try{return _lt.apply(this,arguments)}finally{SP.emit=_e}}}
{const _st=xmSagaTick;xmSagaTick=function(dt){const r=_st.apply(this,arguments);if(P.lb2&&Math.random()<dt*10)lightning(V3(P.pos.x,P.pos.y+3.2,P.pos.z),V3(P.pos.x+rand(-3,3),P.pos.y+rand(0,1.8),P.pos.z+rand(-3,3)),Math.random()<.85?0x60a0ff:0xffffff);return r}}

/* ---------- the second limit breaker comes much later ---------- */
{const _st=xmSagaTick;xmSagaTick=function(dt){const B=XO.bk;let held=false;if(B&&B.my!=null&&!B.x2){const m=XO.mir,r=m?m.hp/m.maxhp:1,el=XO.t-B.my;if(!(el>15&&(el>80||r<.22))){B.x2=1;held=true}}const out=_st.apply(this,arguments);if(held)B.x2=0;if(B&&B.my!=null&&!B.x2&&XO.mir)XO.mir.hpFloor=.19;return out}}

/* ---------- before the last mash: a bigger warning up top that fades away ---------- */
function xmWarn(){let d=document.getElementById('xmWarn');if(!d){d=document.createElement('div');d.id='xmWarn';d.style.cssText="position:fixed;left:50%;top:calc(17% + env(safe-area-inset-top,0px));transform:translateX(-50%);z-index:41;pointer-events:none;text-align:center;font-family:'Bangers',Impact,sans-serif;color:#fff;text-shadow:3px 3px 0 #000,0 0 18px rgba(255,160,60,.6);transition:opacity .6s,transform .6s;opacity:0";document.body.appendChild(d)}
  d.innerHTML='<div style="font-size:clamp(26px,4vw,46px);letter-spacing:.08em">MASH SPACE!</div><div style="font-family:Inter,system-ui,sans-serif;font-size:clamp(13px,1.5vw,17px);letter-spacing:.02em;margin-top:4px;text-shadow:1px 1px 0 #000">'+(typeof isTouch!=='undefined'&&isTouch?'Tap the button below as fast as you can':'Hit the space bar as fast as you can')+'. Lose and it costs you 1000 HP.</div>';
  d.style.opacity='1';d.style.transform='translateX(-50%) scale(1)';clearTimeout(d._t);d._t=setTimeout(()=>{d.style.opacity='0';d.style.transform='translateX(-50%) scale(.92)'},2600)}
{const _fs=xmFcStart;xmFcStart=function(m){const r=_fs.apply(this,arguments);xmWarn();return r}}
