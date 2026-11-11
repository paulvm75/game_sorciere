/* =====================================================================================
   CHAPTER XVI, third pass: smooth morphs, a slow Kaen reveal, the Gog chain told straight,
   Morwen inside the Crown, and the long limit-breaker war against your own face
   ===================================================================================== */
Object.assign(XL3,{
  kw_08:"Maëlle! I can take Gog, but not with her raining bolts on my back. Chain her down!",
  lw_08:"I'll bind her with Alfred's flame. Maëlle, take the chain with me! Kaen, he's all yours!",
  mw_07:"Got her! She's heavy, and she is not happy. Hurry up, Kaen!",
  kw_09:'Keep her still. I only need a minute with this one.',
  lw_09:"They're binding together! Kaen, fall back! We can't hold her any longer!",
  mw_22:'It showed me every one of them. Hakuko. The Nine-Tails. Hrímgar. Even you. But never Morwen. Why not Morwen?',
  kw_19:"Because it hasn't finished with her. I felt her in there, the whole fight. Trapped. It can't wear her, it can't use her. It's still eating her.",
  mw_24:'Eating her? But I destroyed her under Paris. There was nothing left.',
  kw_20:'You broke what the Abyss made of her. Her soul went straight to the Crown. And Morwen is strong. Strong enough to feed it for a very long time.',
  lw_16:"Then that's why it ran. Not to hide. To feed. Every night she's in there, it gets stronger.",
  kw_21:"That's your limit breaker, Maëlle! It stole that too. Use yours. Now!",
  mw_27:"We're even. Every hit, every spell. I'm literally fighting myself.",
  mm_07:"Of course we're even. I am everything you are. Minus the fear.",
  kw_22:'Enough! Get away from her!',
  kw_23:"I'm fine! I've been thrown by worse. Together, Maëlle!",
  kw_24:"Maëlle... I can't... It's too strong. It's all yours.",
  mw_28:'Kaen? KAEN! ...Get. Away. From him.',
  wh_01:'Yes. Let it in. Kill her. Kill all of them. Nobody will ever hurt you again.',
  mw_29:"No. I hear you. I'm using it. I am not becoming it.",
  wh_02:'Kill her.',wh_03:'Stronger. Let go. Just a little more.',wh_04:'They will leave you. They always leave.',
  wh_05:'Finish it. Then the rest. Then everyone who ever doubted you.',
  mw_30:'I could. I could end all of it. Right now.',
  kw_25:"Maëlle. Look at me. That's not you. Let it go.",
  lw_17:"Breathe with me. Alfred's flame, not the Crown's. Come back to us.",
  mw_31:"I'm here. I'm here. That was... too close.",
  kw_26:"You almost became what it wanted, just to save us. Don't ever do that again.",
  mw_32:'Stay yourself. Stay yourself.'});
for(const k of ['kw_08','lw_08','mw_07','kw_09','lw_09','mw_22','kw_19','mw_24','kw_20','lw_16'])VO_MAP[XL3[k]]=k+'b';
for(const k of ['kw_21','mw_27','mm_07','kw_22','kw_23','kw_24','mw_28','wh_01','mw_29','wh_02','wh_03','wh_04','wh_05','mw_30','kw_25','lw_17','mw_31','kw_26','mw_32'])VO_MAP[XL3[k]]=k;

/* ---------- colour drains and returns instead of snapping ---------- */
{const _s=xoSetGrey;xoSetGrey=function(L,g){if(L)L._tok=null;return _s(L,g)}}
function xoFade(L,toGrey,dur){if(!L||!L.length)return;const tok={};for(const q of L){if(!q[3])q[3]=q[2].clone();q[0].material=q[3]}L._tok=tok;
  addFx(null,dur||.8,(f,k)=>{if(L._tok!==tok)return;const t=k*k*(3-2*k);for(const q of L){const a=toGrey?q[1]:q[2],b=toGrey?q[2]:q[1],m=q[3];if(m.color&&a.color&&b.color)m.color.copy(a.color).lerp(b.color,t);if(m.emissive&&a.emissive&&b.emissive)m.emissive.copy(a.emissive).lerp(b.emissive,t);if(a.roughness!=null&&b.roughness!=null)m.roughness=lerp(a.roughness,b.roughness,t);if(a.metalness!=null&&b.metalness!=null)m.metalness=lerp(a.metalness,b.metalness,t)}},
    ()=>{if(L._tok===tok)xoSetGrey(L,toGrey)})}

/* ---------- Kaen never stands with his arm stuck out ---------- */
function kNoSpell(a){if(!a||a._ns||!a.setBase)return;a._ns=1;const sb=a.setBase;a.setBase=function(n){if(n==='Spell_Simple_Idle_Loop'){const r=[...arguments];r[0]='Idle_Loop';return sb.apply(this,r)}return sb.apply(this,arguments)}}
{const _aa=actorAnimate;actorAnimate=function(e,dt,mv,rate){if(e&&(e.type==='illusion'||e.def&&e.def.build===buildIllusion)&&e.busy>0){const b=e.busy;e.busy=0;try{return _aa.apply(this,arguments)}finally{e.busy=b}}return _aa.apply(this,arguments)}}

/* ---------- the Gog fight: nobody swaps bodies, Kaen takes Gog while you chain Magog ---------- */
{const _sw=x5Swap;x5Swap=function(m,k,label,sub,a,b){if(label==='BODY SWITCH'){label='KAEN TAKES GOG';sub='PLAY AS KAEN'}else if(label==='SWITCH BACK'){label='BACK TO MAËLLE';sub='THE CHAIN BREAKS'}return _sw.call(this,m,k,label,sub,a,b)}}
/* his techniques only show up once the transition is over */
{const _h=kmHud;kmHud=function(on){if(on&&CS.active){_h(false);const w=()=>{if(!KM.on)return;if(CS.active){after(.15,w);return}_h(true)};after(.15,w);return}return _h.apply(this,arguments)}}

/* ---------- Kaen: a slow reveal, his name only once the colour is in him ---------- */
xoKaen=function(){if(CS.active){after(.3,xoKaen);return}const old=XO.e;XO.ph=1.6;sayHush();const p=XOC().add(V3(-6,0,0));xoClear(null);if(old){scene.remove(old.m.g);old.dead=true}XO.e=null;bossRef=null;$('boss').classList.add('hidden');
  const hp=V3(p.x+10,0,p.z);x4Stage(hp,-Math.PI/2);P.face=-Math.PI/2;xoCoil(true);X4.cc=p.clone();
  const e=xoSpawn(5,p,false);e.invuln=true;e.busy=999;e.m.g.rotation.y=Math.PI/2;e.m.g.scale.setScalar(.01);$('boss').classList.add('hidden');kNoSpell(e.m.actor);try{e.m.actor.setBase('Idle_Loop',0)}catch(x){}
  const fig=xcFig(1.3);fig.g.position.copy(p);fig.set('ball');fig.cyc=.3;const kp=()=>KFW.a?KFW.a.g.position:hp;
  const cut=(dur,fov,cam,fn)=>({dur,fov,cut:true,cam,onStart:()=>{x5Impact(60,.04);sx('clash',.45,null,{rate:rand(.5,.7)});P.shake=.5;x5Punch(7,.25);fn&&fn()}});
  playCutscene([
    /* the smoke gathers, slower this time, and starts to stand up */
    {dur:3.6,fov:50,cut:true,cam:k=>({pos:V3(p.x+9-k*3,1.2+k*1.4,p.z+4.5-k*2),look:V3(p.x,1+k*1.2,p.z)}),onStart:()=>{x5Impact(90,.1);sx('skyshatter',.5,null,{rate:1.1});sx('riser',.8,null,{rate:.55});sx('heart',.8);x5Grey(1)},
      update:(dt,k)=>{fig.g.scale.setScalar(1.3+k*.6);fig.g.position.y=p.y+1+k*.6;for(let q=0;q<3;q++)SM.emit(V3(p.x+rand(-1.2,1.2),p.y+rand(0,3.5),p.z+rand(-1.2,1.2)),{c0:0x10262c,c1:0x010304,s0:1.5,s1:4,life:1.2,a:.55,up:2});if(Math.random()<.025)sx('heart',.6);P.shake=Math.max(P.shake,k*.3)}},
    /* a man in the smoke, still grey */
    {dur:3.2,fov:42,cut:true,cam:k=>({pos:V3(p.x+5.6-k*1.3,1.4,p.z-2.2+k*.6),look:headOf(p,1.2)}),onStart:()=>{fig.set('king');fig.cyc=.2},
      update:(dt,k)=>{const q=eOut(Math.min(1,k*1.1));e.m.g.scale.setScalar(Math.max(.01,q));fig.g.scale.setScalar(Math.max(.01,1.9*(1-q*.9)));if(k>.92)fig.g.visible=false;if(Math.random()<.5)SM.emit(V3(p.x+rand(-.8,.8),p.y+rand(0,2.4),p.z+rand(-.8,.8)),{c0:0x2a3430,c1:0x010304,s0:.8,s1:2.4,life:.9,a:.45,up:1})}},
    cut(.8,30,()=>({pos:V3(p.x+1.5,.28,p.z+.7),look:V3(p.x,.25,p.z)}),()=>{xcFigOff();e.m.g.scale.setScalar(1)}),
    cut(.8,28,()=>({pos:V3(p.x+1.3,1.1,p.z-1.1),look:V3(p.x,.95,p.z-.3)})),
    cut(1.2,24,k=>({pos:headOf(p,1.62).add(V3(1.35-k*.2,0,.1)),look:headOf(p,1.6)})),
    {who:'@',text:XL3.mw_13,fov:36,cam:x4S(()=>P.pos,1,2.2,1.6),onStart:()=>{P.heroAnim='Idle_Loop'}},
    /* the colour seeps into him, and only now is he named */
    {dur:3.2,fov:44,cut:true,cam:k=>({pos:V3(p.x+6-k*1.6,1.6,p.z+2.6-k*.8),look:headOf(p,1.3)}),onStart:()=>{x5Grey(0);xoFade(e.xo.L,false,1.7);sx('riser',.7,null,{rate:.9});
        after(1.5,()=>{flash(headOf(p,1.2),0xc9a6ff,18);x5Impact(110,.1);x5Punch(12,.4);sx('impact',.8);ring(p,0xc9a6ff,1,12,.5);SP.emit(headOf(p,1.2),{n:90,c0:0xffffff,c1:0xc9a6ff,speed:10,life:.9,s0:.6,s1:.05});x5Banner('KAEN','MASTER OF ILLUSIONS','#c9a6ff',2.3)})},
      update:(dt,k)=>{camera.fov=44-k*6;camera.updateProjectionMatrix()}},
    {who:'Kaen',text:XL3.fk_01,fov:34,cam:k=>({pos:headOf(p,1.6).add(V3(2.6-k*.4,0,.9)),look:headOf(p,1.55)}),onStart:()=>{try{e.m.actor.setBase('Idle_Talking_Loop',.3)}catch(x){}}},
    {who:'Kaen',text:XL3.kw_14,fov:38,cam:k=>({pos:headOf(kp(),1.2).add(V3(-2.6,.2,-1.4+k*.5)),look:headOf(kp(),1)}),onStart:()=>{x5Impact(70,.1);P.shake=.8;try{e.m.actor.setBase('Idle_Loop',.3)}catch(x){}try{KFW.a&&KFW.a.setBase('Crouch_Idle_Loop',.2)}catch(x){}},update:()=>{if(Math.random()<.5)SP.emit(headOf(kp(),1),{c0:0xffffff,c1:0xb070ff,s0:.4,s1:.04,life:.5,speed:3})}},
    {who:'@',text:XL3.mw_14,fov:38,cam:x4S(()=>P.pos,-1,2.2,1.7),onStart:()=>{P.heroAnim='Idle_Talking_Loop'}}],
    ()=>{x5Grey(0);xcFigOff();P.heroAnim=null;X4.cc=null;xoSetGrey(e.xo.L,false);e.xo.grey=false;e.xo.t=rand(6,9);try{e.m.actor.setBase('Idle_Loop',.2)}catch(x){}e.m.g.scale.setScalar(1);e.invuln=false;e.busy=.8;bossRef=e;$('boss').classList.remove('hidden');XO.ph=1;XO.cmp=0;P.invuln=1.5;x5Punch(12,.4)})};

/* =====================================================================================
   the mirror war
   ===================================================================================== */
function xmUI(){let d=document.getElementById('ultraFx');if(d)return d;d=document.createElement('div');d.id='ultraFx';d.style.cssText='position:fixed;inset:0;pointer-events:none;z-index:22;opacity:0;transition:opacity .5s;background:radial-gradient(ellipse at center,rgba(0,0,0,0) 40%,rgba(30,14,0,.45) 70%,rgba(0,0,0,.9) 100%)';document.body.appendChild(d);return d}
function xmUltraOff(){P.ultra=0;try{xmUI().style.opacity='0'}catch(x){}FIN.boost=0}
function xmRedEyes(e){try{e.m.g.traverse(o=>{if(o.isSprite&&o.material&&o.material.color&&o.material.color.getHex()===0x9dffb0){o.material=o.material.clone();o.material.color.setHex(0xff1a1a);o.scale.multiplyScalar(1.4)}if(o.isMesh&&o.material&&o.material.isMeshBasicMaterial&&o.material.color&&o.material.color.getHex()===0x9dffb0){o.material=o.material.clone();o.material.color.setHex(0xff2020)}})}catch(x){}}
function xmDarkOn(m){if(m._dk)return;m._dk=1;m.lb=1;xmRedEyes(m);if(!m.m.aura){const au=glowSprite(0xff2030,4.2,.16);au.position.y=1.1;m.m.g.add(au);m.m.aura=au}try{m.m.g.traverse(o=>{if((o.isMesh||o.isSkinnedMesh)&&o.material&&o.material.emissive&&!o.material.transparent){o.material=o.material.clone();o.material.emissive.setHex(0x1a0206);o.material.color.multiplyScalar(.55)}});m.xo.L=xoGreyList(m.m.g)}catch(x){}}
function xmFreeze(m){for(const q of eProjs)scene.remove(q.s);eProjs.length=0;m.invuln=true;m.busy=999;m.ai.fly=null;if(m.m.broom)m.m.broom.visible=false;m.pos.y=groundAt(m.pos.x,m.pos.z);P.invuln=Math.max(P.invuln,6);P.flying=false;P.vy=0;sayHush()}
function xmThaw(m){x5Grey(0);try{x4Kin('out')}catch(x){}m.invuln=false;m.busy=.8;P.invuln=Math.max(P.invuln,1.5);P.heroAnim=null;X4.cc=null;CS.speed=1;try{m.m.actor.setBase('Idle_Loop',.2)}catch(x){}}
const xmGeo=m=>{const ep=m.pos.clone();ep.y=groundAt(ep.x,ep.z);const pp=P.pos.clone();pp.y=groundAt(pp.x,pp.z);const d=V3(ep.x-pp.x,0,ep.z-pp.z);if(d.lengthSq()<.01)d.set(-1,0,0);d.normalize();return{ep,pp,d,sd:V3(d.z,0,-d.x),mid:pp.clone().lerp(ep,.5)}};

/* 1. it lights your limit breaker, black and red; Kaen tells you to light yours */
function xmDarkLB(m){xmFreeze(m);const G=xmGeo(m),{ep,pp,d,sd}=G;X4.cc=ep.clone();m.m.g.rotation.y=Math.atan2(-d.x,-d.z);const kp=()=>KFW.a?KFW.a.g.position:pp;
  playCutscene([
    {dur:2.6,fov:40,cut:true,cam:k=>({pos:headOf(ep,1.1).addScaledVector(d,-3.4+k*.8).addScaledVector(sd,1.4),look:headOf(ep,1.2+k*.3)}),onStart:()=>{try{m.m.actor.setBase('Crouch_Idle_Loop',.2)}catch(x){}sx('riser',1,null,{rate:.6});sx('heart',.9);x5Grey(1)},
      update:(dt,k)=>{const c=eCenter(m);for(let i=0;i<3;i++)SM.emit(V3(c.x+rand(-.6,.6),c.y+rand(-1,1),c.z+rand(-.6,.6)),{c0:0x140306,c1:0x000000,s0:.8,s1:2.6,life:.9,a:.7,up:2.4});P.shake=Math.max(P.shake,k*.4)}},
    {dur:2.4,fov:48,cut:true,cam:k=>{const a=Math.atan2(-d.x,-d.z)+k*1.4;return{pos:V3(ep.x+Math.sin(a)*6,1.6+k,ep.z+Math.cos(a)*6),look:headOf(ep,1.2)}},onStart:()=>{x5Grey(0);xmDarkOn(m);try{m.m.actor.setBase('Spell_Simple_Idle_Loop',.2)}catch(x){}const c=eCenter(m);x5Impact(140,.2);x5Punch(18,.6);P.shake=1.4;sx('ktf',.9,null,{rate:.7});sx('skyshatter',.7,null,{rate:.6});
        ring(m.pos,0x200408,1,16,.6);flash(c,0xff2030,16);SM.emit(c,{n:70,c0:0x1a0408,c1:0x000000,s0:2,s1:8,life:1.8,a:.85,speed:9});x5Banner('LIMIT BREAKER','THE CROWN BURNS YOUR FURY BLACK','#ff3040',2.4,'#000');
        },
      update:()=>{const c=eCenter(m);if(Math.random()<.9)FL.emit(V3(c.x+rand(-.5,.5),c.y-1,c.z+rand(-.5,.5)),{n:1,c0:0xff2030,c1:0x100002,s0:.8,s1:.05,life:.7,up:3});SM.emit(V3(c.x+rand(-.6,.6),c.y+rand(-1,1),c.z+rand(-.6,.6)),{c0:0x140306,c1:0,s0:.8,s1:2.6,life:.9,a:.7,up:2.4})}},
    {who:'???',text:XL3.mm_06,fov:30,cam:k=>({pos:headOf(ep,1.58).addScaledVector(d,-2.2+k*.3).addScaledVector(sd,.6),look:headOf(ep,1.55)})},
    {who:'Kaen',text:XL3.kw_21,fov:38,cam:k=>({pos:headOf(kp(),1.3).add(V3(-2.6+k*.4,.2,1.2)),look:headOf(kp(),1.1)}),onStart:()=>{x4Talk('Kaen');x5Impact(50,.05)}},
    {who:'@',text:XL3.mw_26,fov:34,cam:x4S(()=>P.pos,1,2.2,1.65),onStart:()=>{x4Talk('@');P.heroAnim='Spell_Simple_Idle_Loop'}},
    {dur:3.2,fov:46,cut:true,cam:k=>{const a=P.face+k*2.6;return{pos:V3(P.pos.x+Math.sin(a)*5,P.pos.y+1.6+k*1.2,P.pos.z+Math.cos(a)*5),look:headOf(P.pos,1.2)}},onStart:()=>{x4Talk('');try{witchLimitBreak(false)}catch(x){console.warn(x)}x5Impact(110,.14);x5Banner('LIMIT BREAKER','MAËLLE','#ffd060',2.2,'#1a1206')},update:dt=>{P.lbRamp=Math.min(1,(P.lbRamp||0)+dt*.6);try{lbSet(P.lbRamp)}catch(x){}}}],
    ()=>{XO.tn.lb=2;xmDarkOn(m);if(!(P.lbT>0))try{witchLimitBreak(false)}catch(x){}P.lbT=Math.max(P.lbT||0,60);P.lbRamp=1;xmThaw(m);toast('Your limit breaker lasts longer here. Hers hits much harder. Keep moving.','Limit Breaker',true)})}

/* 2. dead even: a beam lock neither of you can win */
function xmEven(m){xmFreeze(m);const G=xmGeo(m),{ep,pp,d,sd,mid}=G;X4.cc=mid.clone();m.m.g.rotation.y=Math.atan2(-d.x,-d.z);P.face=Math.atan2(d.x,d.z);
  const up=V3(0,1,0),mk=col=>{const b=new THREE.Mesh(new THREE.CylinderGeometry(.38,.38,1,14,1,true),new THREE.MeshBasicMaterial({color:col,transparent:true,opacity:.9,blending:THREE.AdditiveBlending,depthWrite:false,side:THREE.DoubleSide}));scene.add(b);return b};let bA=null,bB=null,orb=null;
  const put=(b,a,c)=>{const v=c.clone().sub(a),L=v.length()||.01;b.position.copy(a).addScaledVector(v,.5);b.quaternion.setFromUnitVectors(up,v.normalize());const w=1+Math.sin(time*40)*.18;b.scale.set(w,L,w)};
  const beams=k=>{if(!bA)return;const A=headOf(P.pos,1.3),B=eCenter(m),M=A.clone().lerp(B,.5+Math.sin(time*7)*.06);put(bA,A,M);put(bB,B,M);orb.position.copy(M);orb.scale.setScalar(6+Math.sin(time*30)*1.4);SP.emit(M,{n:5,c0:0xffffff,c1:Math.random()<.5?0xffc040:0xff2030,speed:10,life:.4,s0:.5,s1:.05});P.shake=Math.max(P.shake,.4)};
  const kill=()=>{for(const b of[bA,bB])if(b){scene.remove(b);b.geometry.dispose()}if(orb)scene.remove(orb);bA=bB=orb=null};
  playCutscene([
    {dur:3,fov:52,cut:true,cam:k=>({pos:V3(mid.x+sd.x*(11-k*2),2.2+k,mid.z+sd.z*(11-k*2)),look:V3(mid.x,1.4,mid.z)}),onStart:()=>{P.heroAnim='Spell_Simple_Idle_Loop';try{m.m.actor.setBase('Spell_Simple_Idle_Loop',.2)}catch(x){}bA=mk(0xffc040);bB=mk(0xff2030);orb=glowSprite(0xffffff,6,1);scene.add(orb);sx('dcharge',1);sx('riser',.8);x5Impact(90,.1);try{x4Kin('in')}catch(x){}x5VS('MAËLLE','MAËLLE','#ffd060','#ff3040','EVEN')},update:(dt,k)=>beams(k)},
    {dur:1.4,fov:30,cut:true,cam:k=>({pos:headOf(P.pos,1.6).addScaledVector(d,1.6).addScaledVector(sd,-.9),look:headOf(P.pos,1.5)}),onStart:()=>{CS.speed=.6;x5Punch(8,.3)},update:(dt,k)=>beams(k)},
    {dur:1.4,fov:30,cut:true,cam:k=>({pos:headOf(m.pos,1.6).addScaledVector(d,-1.6).addScaledVector(sd,.9),look:headOf(m.pos,1.5)}),update:(dt,k)=>beams(k)},
    {dur:1.6,fov:58,cut:true,cam:k=>({pos:V3(mid.x+sd.x*14,3+k*2,mid.z+sd.z*14),look:V3(mid.x,1.4,mid.z)}),onStart:()=>{CS.speed=1;try{x4Kin('punch')}catch(x){}kill();flash(mid,0xffffff,40);x5Impact(170,.25);x5Punch(22,.7);P.shake=1.8;sx('skyshatter',1);ring(mid,0xffc040,1,18,.6);ring(mid,0xff2030,.5,14,.5);SP.emit(V3(mid.x,1.4,mid.z),{n:220,c0:0xffffff,c1:0xffc040,speed:18,life:1,s0:.7,s1:.05});SM.emit(V3(mid.x,1.4,mid.z),{n:40,c0:0x140306,c1:0,s0:2,s1:7,life:1.4,a:.7,speed:10})},
      update:(dt,k)=>{const q=eOut(Math.min(1,k*2));const a=pp.clone().addScaledVector(d,-4.5*q),b=ep.clone().addScaledVector(d,4.5*q);P.pos.x=a.x;P.pos.z=a.z;m.pos.x=b.x;m.pos.z=b.z}},
    {who:'@',text:XL3.mw_27,fov:36,cam:x4S(()=>P.pos,1,2.2,1.6),onStart:()=>{P.heroAnim='Crouch_Idle_Loop';try{m.m.actor.setBase('Crouch_Idle_Loop',.2)}catch(x){}}},
    {who:'???',text:XL3.mm_07,fov:30,cam:k=>({pos:headOf(m.pos,1.58).addScaledVector(d,-2.2).addScaledVector(sd,.6),look:headOf(m.pos,1.55)}),onStart:()=>{try{m.m.actor.setBase('Idle_Loop',.3)}catch(x){}}}],
    ()=>{kill();XO.tn.ev=2;P.lbT=Math.max(P.lbT||0,25);xmThaw(m)})}

/* 3. Kaen tears out of the smoke to help, and gets thrown across the square */
function xmKaenIn(m){const K=KFW.a;if(!K){XO.tn.k=2;XO.tn.kd=1;xmUltra(m);return}xmFreeze(m);const G=xmGeo(m),{ep,d,sd}=G;const k0=K.g.position.clone();X4.cc=ep.clone();
  let ci=-1,bd=1e9;XO.coil.forEach((c,i)=>{const q=c.position.distanceTo(k0);if(q<bd){bd=q;ci=i}});
  const run=ep.clone().addScaledVector(V3(k0.x-ep.x,0,k0.z-ep.z).normalize(),2.2);const far=ep.clone().addScaledVector(V3(k0.x-ep.x,0,k0.z-ep.z).normalize(),13);far.x=clamp(far.x,XO.B.x0+3,XO.B.x1-3);far.z=clamp(far.z,XO.B.z0+3,XO.B.z1-3);
  playCutscene([
    {who:'Kaen',text:XL3.kw_22,fov:38,cam:k=>({pos:headOf(k0,1.3).add(V3(-3+k*.6,.3,1.6)),look:headOf(k0,1.1)}),onStart:()=>{if(ci>=0){const c=XO.coil.splice(ci,1)[0];scene.remove(c)}flash(headOf(k0,1),0xb070ff,14);ring(k0,0xb070ff,.5,6,.4);sx('shbreak',.8);x5Impact(80,.1);try{K.setBase('Idle_Loop',.1);K.fire('Melee_Hook',.4)}catch(x){}x4Face(K,ep)}},
    {dur:1.3,fov:56,cut:true,cam:k=>{const p=K.g.position;return{pos:V3(p.x+sd.x*5,1.4,p.z+sd.z*5),look:headOf(p,1)}},onStart:()=>{CS.speed=.7;try{K.setBase('Sprint_Loop',.1)}catch(x){}try{x4Kin('in')}catch(x){}kSwing(1,.7)},
      update:(dt,k)=>{K.g.position.lerpVectors(k0,run,eIn(k));K.g.position.y=groundAt(K.g.position.x,K.g.position.z);SP.emit(headOf(K.g.position,1),{n:2,c0:0xffffff,c1:0xb070ff,s0:.5,s1:.05,life:.4,speed:1})}},
    {dur:1,fov:34,cut:true,cam:()=>({pos:headOf(run,1.3).addScaledVector(sd,2.6),look:headOf(ep,1.2)}),onStart:()=>{try{m.m.actor.fire('Spell_Simple_Shoot',.2)}catch(x){}m.m.g.rotation.y=Math.atan2(run.x-ep.x,run.z-ep.z);xoBeam(eCenter(m),headOf(run,1.1),0xff2030,.5,.9);flash(headOf(run,1.1),0xffffff,30);x5Impact(160,.22);x5Punch(20,.6);P.shake=1.6;sx('dbeam',.9);sx('impact',1,null,{rate:.7});try{x4Kin('punch')}catch(x){}x5Grey(1);after(.25,()=>x5Grey(0))}},
    {dur:1.7,fov:50,cut:true,cam:k=>({pos:V3((run.x+far.x)/2+sd.x*9,2.4,(run.z+far.z)/2+sd.z*9),look:K.g.position.clone().setY(1)}),onStart:()=>{CS.speed=1;try{K.setBase('Crouch_Idle_Loop',.1)}catch(x){}},
      update:(dt,k)=>{const q=Math.min(1,k*1.5);K.g.position.lerpVectors(run,far,eOut(q));K.g.position.y=groundAt(K.g.position.x,K.g.position.z)+Math.sin(q*Math.PI)*2.4;if(q<1)SM.emit(V3(K.g.position.x,K.g.position.y+.5,K.g.position.z),{c0:0x140306,c1:0,s0:1,s1:3,life:.7,a:.5});else if(!K._land){K._land=1;ring(far,0xb070ff,.5,6,.4);SM.emit(V3(far.x,.5,far.z),{n:30,c0:0x4a5a4e,c1:0x06100a,s0:2,s1:6,life:1.2,a:.6,speed:6});sx('impact',.8);P.shake=1}}},
    {who:'Kaen',text:XL3.kw_23,fov:38,cam:k=>({pos:headOf(far,1).add(V3(2.4,.2,-1.6+k*.4)),look:headOf(far,1)}),onStart:()=>{K._land=0;try{K.setBase('Idle_Loop',.6)}catch(x){}x4Face(K,ep)}}],
    ()=>{if(ci>=0&&XO.coil[ci]&&XO.coil[ci].position.distanceTo(k0)<2){const c=XO.coil.splice(ci,1)[0];scene.remove(c)}XO.tn.k=2;XO.kf={t:0,hit:4,ang:0,st:0,c:{busy:0,cd:.8,n:0,an:''}};XO.cmp=1;KFW.pin=1;xmThaw(m);toast('Kaen is in the fight. Keep the pressure on her together.','Kaen',true)})}
function xmKfTick(dt,m){const F=XO.kf,K=KFW.a;if(!F||!K||!m||m.dead)return;F.t+=dt;const c=F.c;c.busy=Math.max(0,c.busy-dt);c.cd-=dt;F.hit-=dt;K.g.visible=true;
  if(F.st>0){F.st-=dt;if(F.st<=0){c.an='';x4CmpAnim(c,K,'Idle_Loop')}return}
  if(!c.busy){const g=K.g.position;F.ang+=dt*.5;const R=4.6,tx=clamp(m.pos.x+Math.sin(F.ang)*R,XO.B.x0+2,XO.B.x1-2),tz=clamp(m.pos.z+Math.cos(F.ang)*R,XO.B.z0+2,XO.B.z1-2);const dx=tx-g.x,dz=tz-g.z,L=Math.hypot(dx,dz),v=Math.min(L,dt*9);if(L>.05){g.x+=dx/L*v;g.z+=dz/L*v}g.y=groundAt(g.x,g.z);
    x4CmpAnim(c,K,L>1.6?'Sprint_Loop':'Idle_Loop');if(L>1.6)K.g.rotation.y=Math.atan2(dx,dz);else x4Face(K,m.pos);
    if(c.cd<=0&&L<3&&m.pos.y<groundAt(m.pos.x,m.pos.z)+4){c.cd=rand(2.2,3.2);c.n++;c.an='';if(c.n%2)x4KWave(K,m);else x4KDash(K,m,c);c.busy=Math.max(c.busy,.7)}}
  if(F.hit<=0&&!m.invuln){F.hit=rand(4.5,6.5);const A=eCenter(m),B=headOf(K.g.position,1.1);xoBeam(A,B,0xff2030,.3,.35);flash(B,0xff2030,8);sx('impact',.5,null,{rate:1.2});F.st=.9;c.busy=1;c.an='';x4CmpAnim(c,K,'Crouch_Idle_Loop');SM.emit(B,{n:12,c0:0x140306,c1:0,s0:1,s1:3,life:.8,a:.6,speed:4})}}

/* 4. it puts him down for good, half in game, half in slow motion */
function xmKaenDown(m){const K=KFW.a;xmFreeze(m);XO.cmp=0;const kpos=(K?K.g.position:P.pos).clone();kpos.y=groundAt(kpos.x,kpos.z);const G=xmGeo(m),{d,sd}=G;const ep0=m.pos.clone();const behind=kpos.clone().addScaledVector(V3(kpos.x-P.pos.x,0,kpos.z-P.pos.z).normalize(),1.6);
  const slam=kpos.clone().addScaledVector(V3(kpos.x-ep0.x,0,kpos.z-ep0.z).normalize(),-.4);X4.cc=kpos.clone();
  playCutscene([
    {dur:1.3,fov:38,cut:true,cam:k=>({pos:headOf(kpos,.6).addScaledVector(sd,3.2-k*.6),look:headOf(kpos,1.1)}),onStart:()=>{CS.speed=.45;try{x4Kin('in')}catch(x){}flash(eCenter(m),0xff2030,10);SM.emit(eCenter(m),{n:24,c0:0x140306,c1:0,s0:1.5,s1:4,life:.8,a:.7,speed:4});m.pos.copy(behind);m.pos.y=groundAt(behind.x,behind.z);m.m.g.rotation.y=Math.atan2(kpos.x-behind.x,kpos.z-behind.z);flash(eCenter(m),0xff2030,12);sx('portal',.6,null,{rate:1.6});if(K){x4Face(K,P.pos);try{K.setBase('Idle_Loop',.1)}catch(x){}}x5Banner('BEHIND YOU','','#ff3040',.9,'#000')}},
    {dur:.9,fov:30,cut:true,cam:()=>({pos:headOf(kpos,1.2).addScaledVector(sd,-2.2),look:headOf(kpos,1.1)}),onStart:()=>{CS.speed=1;try{m.m.actor.fire('Spell_Simple_Shoot',.15)}catch(x){}const c=headOf(kpos,1.1);flash(c,0xffffff,40);x5Impact(190,.3);x5Punch(24,.8);P.shake=2;sx('skyshatter',1);sx('dbeam',.9,null,{rate:.7});x5Grey(1);try{x4Kin('punch')}catch(x){}SM.emit(c,{n:60,c0:0x140306,c1:0,s0:2,s1:7,life:1.4,a:.8,speed:12});SP.emit(c,{n:120,c0:0xffffff,c1:0xff2030,speed:16,life:.8,s0:.6,s1:.05})}},
    {dur:1.6,fov:44,cut:true,cam:k=>({pos:V3(slam.x+sd.x*.5,9-k*2,slam.z+sd.z*.5+.01),look:V3(slam.x,0,slam.z)}),onStart:()=>{x5Grey(0);if(K){K.g.position.copy(slam);K.g.position.y=groundAt(slam.x,slam.z);try{K.setBase('Crouch_Idle_Loop',.05)}catch(x){}}ring(slam,0xff2030,.5,9,.5);ring(slam,0x200408,1,12,.7);SM.emit(V3(slam.x,.5,slam.z),{n:50,c0:0x4a5a4e,c1:0x06100a,s0:2,s1:7,life:1.6,a:.7,speed:8});sx('impact',1,null,{rate:.6});vib([60,30,120])}},
    {who:'Kaen',text:XL3.kw_24,fov:34,cam:k=>({pos:headOf(slam,.8).add(V3(1.8,.1,1.2-k*.3)),look:headOf(slam,.7)})},
    {who:'@',text:XL3.mw_28,fov:30,cam:k=>({pos:headOf(P.pos,1.6).addScaledVector(d,1.5-k*.3).addScaledVector(sd,-.6),look:headOf(P.pos,1.55)}),onStart:()=>{P.heroAnim='Idle_Loop';P.face=Math.atan2(m.pos.x-P.pos.x,m.pos.z-P.pos.z)},update:()=>{if(Math.random()<.6)lightning(V3(P.pos.x,P.pos.y+2.4,P.pos.z),V3(P.pos.x+rand(-1.5,1.5),P.pos.y+rand(.2,1.4),P.pos.z+rand(-1.5,1.5)),0xffd060)}}],
    ()=>{XO.kf=null;KFW.pin=1;XO.tn.kd=2;xmUltra(m)})}

/* 5. beyond the limit: gold, lightning, something black underneath, and voices */
function xmUltra(m){if(CS.active){after(.3,()=>xmUltra(m));return}xmFreeze(m);const G=xmGeo(m),{d,sd}=G;X4.cc=m.pos.clone();const U=xmUI();
  const storm=k=>{FIN.boost=1.6;for(let i=0;i<2;i++)SM.emit(V3(P.pos.x+rand(-1.4,1.4),P.pos.y+rand(0,2.6),P.pos.z+rand(-1.4,1.4)),{c0:0x0a0603,c1:0,s0:.8,s1:2.4,life:1,a:.6,up:2.6});if(Math.random()<.7)lightning(V3(P.pos.x,P.pos.y+2.8,P.pos.z),V3(P.pos.x+rand(-2,2),P.pos.y+rand(.1,1.6),P.pos.z+rand(-2,2)),Math.random()<.75?0xffd060:0x6a20ff);SP.emit(V3(P.pos.x+rand(-1.2,1.2),P.pos.y+rand(0,2.6),P.pos.z+rand(-1.2,1.2)),{n:2,c0:0xfff0b0,c1:0x402000,s0:.5,s1:.05,life:.9,up:3,speed:.6});P.shake=Math.max(P.shake,.25+k*.3)};
  playCutscene([
    {dur:3.6,fov:50,cut:true,cam:k=>{const a=P.face+Math.PI+k*3;return{pos:V3(P.pos.x+Math.sin(a)*(6-k*1.5),P.pos.y+.8+k*2,P.pos.z+Math.cos(a)*(6-k*1.5)),look:headOf(P.pos,1.2+k*.3)}},onStart:()=>{P.heroAnim='Spell_Simple_Idle_Loop';P.lbT=Math.max(P.lbT||0,60);P.lbRamp=1;try{lbSet(1)}catch(x){}U.style.opacity='.75';sx('riser',1,null,{rate:.5});sx('ktf',1,null,{rate:.55});sx('skyshatter',.9,null,{rate:.5});x5Impact(150,.2);x5Punch(20,.8);
        flash(headOf(P.pos,1.2),0xffd060,40);ring(P.pos,0xffc040,1,20,.8);ring(P.pos,0x140306,1,14,.9);SP.emit(headOf(P.pos,1.2),{n:300,c0:0xffffff,c1:0xffc040,speed:20,life:1.2,s0:.8,s1:.06});x5Banner('LIMIT BREAKER','BEYOND','#ffd060',2.6,'#000')},update:(dt,k)=>storm(k)},
    {who:'Whispers',text:XL3.wh_01,fov:22,cam:k=>({pos:headOf(P.pos,1.64).addScaledVector(d,.9-k*.15),look:headOf(P.pos,1.62)}),onStart:()=>{U.style.opacity='.95';x5Grey(1)},update:(dt,k)=>{storm(.4);if(Math.random()<.05){x5Impact(40,0)}}},
    {who:'@',text:XL3.mw_29,fov:32,cam:x4S(()=>P.pos,-1,2,1.6),onStart:()=>{x5Grey(0);U.style.opacity='.6';x5Impact(90,.1);x5Punch(12,.4)},update:(dt,k)=>storm(.6)}],
    ()=>{XO.tn.u=2;P.ultra=60;P.lbT=Math.max(P.lbT||0,60);P.lbRamp=1;XO.wt=6;U.style.opacity='.45';xmThaw(m);toast('Every spell now hits like a hammer, and you take far less damage. Hold on to yourself until she falls.','Limit Breaker: Beyond',true)})}
function xmUltraTick(dt){P.ultra-=dt;const U=xmUI();if(P.ultra<=0){xmUltraOff();return}P.lbT=Math.max(P.lbT||0,2);P.lbRamp=1;FIN.boost=Math.max(FIN.boost||0,1.3);U.style.opacity=String(.38+Math.sin(time*2.3)*.1);
  if(Math.random()<dt*4)lightning(V3(P.pos.x,P.pos.y+2.8,P.pos.z),V3(P.pos.x+rand(-2,2),P.pos.y+rand(.1,1.6),P.pos.z+rand(-2,2)),Math.random()<.8?0xffd060:0x6a20ff);
  if(Math.random()<dt*20)SM.emit(V3(P.pos.x+rand(-1.2,1.2),P.pos.y+rand(0,2.4),P.pos.z+rand(-1.2,1.2)),{c0:0x0a0603,c1:0,s0:.6,s1:2,life:.9,a:.5,up:2.4});
  XO.wt=(XO.wt||8)-dt;if(XO.wt<=0&&!CS.active){XO.wt=rand(9,13);const w=['wh_02','wh_03','wh_04'][(XO.wn=(XO.wn||0)+1)%3];x5Say('Whispers',w,1);x5Impact(40,0);if(Math.random()<.6)after(4,()=>{if(P.ultra>0)x5Say('@','mw_32',1)})}}
{const _de=damageEnemy;damageEnemy=function(e,amt){if(P.ultra>0&&e&&e===XO.mir&&typeof amt==='number'){const a=[...arguments];a[1]=amt*1.6;return _de.apply(this,a)}return _de.apply(this,arguments)}}
{const _dp=damagePlayer;damagePlayer=function(a){if(P.ultra>0&&typeof a==='number')a*=.6;return _dp.call(this,a)}}

/* 6. she is on her knees and you could finish everything; they pull you back */
function xmCalm(m){xmFreeze(m);const G=xmGeo(m),{ep,d,sd}=G;X4.cc=ep.clone();const K=KFW.a,Ly=LYR.a;const U=xmUI();let orb=null;
  const near=ep.clone().addScaledVector(d,-2.6);const kpos=()=>K?K.g.position:P.pos,lpos=()=>Ly?Ly.g.position:P.pos;
  playCutscene([
    {dur:2.8,fov:42,cut:true,cam:k=>({pos:V3(ep.x+sd.x*5.5,.9+k*.4,ep.z+sd.z*5.5),look:V3((ep.x+P.pos.x)/2,1.1,(ep.z+P.pos.z)/2)}),onStart:()=>{try{m.m.actor.setBase('Crouch_Idle_Loop',.2)}catch(x){}xoFade(m.xo.L,true,1.2);sx('heart',.9);P.heroAnim='Walk_Loop';const from=P.pos.clone();P._cf=from;
        orb=glowSprite(0xffc040,1,1);scene.add(orb)},update:(dt,k)=>{P.pos.lerpVectors(P._cf,near,Math.min(1,k*1.4));P.pos.y=groundAt(P.pos.x,P.pos.z);P.face=Math.atan2(ep.x-P.pos.x,ep.z-P.pos.z);if(k>.7)P.heroAnim='Spell_Simple_Idle_Loop';orb.position.copy(headOf(P.pos,1.3)).addScaledVector(d,.6);orb.scale.setScalar(1+k*2);SM.emit(orb.position,{c0:0x0a0603,c1:0,s0:.4,s1:1.4,life:.6,a:.6,up:1})}},
    {who:'Whispers',text:XL3.wh_05,fov:24,cam:k=>({pos:headOf(P.pos,1.64).addScaledVector(d,1-k*.2).addScaledVector(sd,.3),look:headOf(P.pos,1.6)}),onStart:()=>{U.style.opacity='.95'},update:(dt,k)=>{if(orb){orb.scale.setScalar(3+k*2);orb.position.copy(headOf(P.pos,1.3)).addScaledVector(d,.6)}if(Math.random()<.5)lightning(headOf(P.pos,2.6),headOf(P.pos,rand(.3,1.6)).add(V3(rand(-1.5,1.5),0,rand(-1.5,1.5))),0xffd060)}},
    {who:'@',text:XL3.mw_30,fov:34,cam:k=>({pos:headOf(P.pos,1.5).addScaledVector(sd,2.2).addScaledVector(d,.6),look:V3((ep.x+P.pos.x)/2,1.3,(ep.z+P.pos.z)/2)}),update:(dt,k)=>{if(orb){orb.scale.setScalar(5+k*2+Math.sin(time*30)*.4)}P.shake=Math.max(P.shake,.3)}},
    {who:'Kaen',text:XL3.kw_25,fov:38,cam:k=>({pos:headOf(kpos(),1.3).add(V3(2.4,.2,1.4-k*.4)),look:headOf(kpos(),1.2)}),onStart:()=>{if(K){try{K.setBase('Idle_Loop',.6)}catch(x){}x4Face(K,P.pos)}}},
    {who:'Lyra',text:XL3.lw_17,fov:38,cam:k=>({pos:headOf(lpos(),1.2).add(V3(-2.4,.2,1.4)),look:headOf(lpos(),1.1)}),onStart:()=>{xoCoil(false);if(Ly){Ly.g.visible=true;try{Ly.setBase('Spell_Simple_Idle_Loop',.3)}catch(x){}x4Face(Ly,P.pos)}flash(headOf(lpos(),1.2),0xffd890,12);sx('shield',.7)},update:()=>{try{ritStream(headOf(lpos(),1.2),headOf(P.pos,1.2),0xfff6c8,0xffb030,.8,0)}catch(x){}}},
    {dur:3.4,fov:46,cut:true,cam:k=>{const a=P.face+Math.PI*.6-k*.8;return{pos:V3(P.pos.x+Math.sin(a)*(4.5+k),P.pos.y+1.4+k*.6,P.pos.z+Math.cos(a)*(4.5+k)),look:headOf(P.pos,1.1)}},onStart:()=>{sx('heart',.6);sx('wind',.6,null,{rate:.7});P.heroAnim='Crouch_Idle_Loop';x5Impact(60,0)},
      update:(dt,k)=>{FIN.boost=Math.max(0,1.6*(1-k));P.lbRamp=Math.max(0,1-k);try{lbSet(P.lbRamp)}catch(x){}U.style.opacity=String(.9*(1-k));if(orb){orb.scale.setScalar(Math.max(.01,7*(1-k*1.2)));if(k>.85){scene.remove(orb);orb=null}}if(Math.random()<.6)SP.emit(V3(P.pos.x+rand(-1,1),P.pos.y+rand(0,2),P.pos.z+rand(-1,1)),{c0:0xfff0b0,c1:0xffc040,s0:.4,s1:.04,life:1.2,up:2.5,speed:.4})}},
    {who:'@',text:XL3.mw_31,fov:36,cam:x4S(()=>P.pos,1,2.2,1.2),onStart:()=>{xmUltraOff();P.lbT=0;P.lbRamp=0;try{lbSet(0)}catch(x){}P.heroAnim='Idle_Loop'}},
    {who:'Kaen',text:XL3.kw_26,fov:34,cam:k=>({pos:headOf(kpos(),1.5).add(V3(-2,.1,1.6-k*.3)),look:headOf(kpos(),1.45)})}],
    ()=>{if(orb)scene.remove(orb);x5Grey(0);xmUltraOff();P.lbT=0;P.lbRamp=0;try{lbSet(0)}catch(x){}XO.tn.end=2;P.heroAnim=null;CS.speed=1;try{m.m.actor.setBase('Crouch_Idle_Loop',.2)}catch(x){}m.invuln=true;m.busy=999;after(.2,xoEnd)})}

/* the mirror fight, beat by beat */
function xmSagaTick(dt){const m=XO.mir;if(!m||m.dead)return;if(XO.clash){xmClashTick(dt);return}if(XO.tube){xmTubeTick(dt);return}
  XO.clT=(XO.clT||0)-dt;const r=m.hp/m.maxhp,T=XO.tn||(XO.tn={});
  if(m.lb){const c=eCenter(m);if(Math.random()<.8)SM.emit(V3(c.x+rand(-.5,.5),c.y+rand(-1,1),c.z+rand(-.5,.5)),{c0:0x140306,c1:0x000000,s0:.8,s1:2.6,life:.9,a:.7,up:2.4});if(Math.random()<.4)FL.emit(V3(c.x+rand(-.4,.4),c.y-1,c.z+rand(-.4,.4)),{n:1,c0:0xb0101c,c1:0x100002,s0:.6,s1:.05,life:.7,up:3});if(m.m.aura)m.m.aura.material.opacity=.15+Math.sin(time*7)*.05}
  if(P.ultra>0)xmUltraTick(dt);if(XO.kf)xmKfTick(dt,m);
  if(r<.9&&!T.a){T.a=1;x5Say('???','mm_02',1)}if(r<.72&&!T.b){T.b=1;x5Say('???','mm_03',1)}if(r<.58&&!T.c){T.c=1;x5Say('???','mm_04',1)}
  m.hpFloor=T.lb!==2?.5:T.ev!==2?.4:T.u!==2?.22:.06;
  if(CS.active||!P.alive)return;const idle=m.busy<=0&&!m.ai.fly&&!m.invuln&&m.pos.y<groundAt(m.pos.x,m.pos.z)+.6;if(!idle)return;
  if(!T.lb&&!T.t1&&r<.82){T.t1=1;xmTube(m,0)}
  else if(!T.lb&&!XO.cl&&r<.66&&XO.clT<=0){XO.cl=1;xmClash(m)}
  else if(!T.lb&&r<=.505){T.lb=1;xmDarkLB(m)}
  else if(T.lb===2&&!T.ev&&r<=.405){T.ev=1;xmEven(m)}
  else if(T.ev===2&&!T.k&&r<.34){T.k=1;xmKaenIn(m)}
  else if(T.k===2&&!T.kd&&((XO.kf&&XO.kf.t>16)||r<=.225)){T.kd=1;xmKaenDown(m)}
  else if(T.u===2&&!T.end&&m.hp<=m.maxhp*.06+1){T.end=1;xmCalm(m)}}
{const _ot=x5OTick;x5OTick=function(dt,dq){const st=CH2.st;if(st===21||st===22){try{kNoSpell(KFW.a);if(XO.e&&XO.e.type==='illusion')kNoSpell(XO.e.m.actor)}catch(x){}if(XO.ph===2){xoArena();XO.t+=dt;xmSagaTick(dt);return}}return _ot.apply(this,arguments)}}
{const cl=()=>{xmUltraOff();XO.kf=null;XO.tn={};CS.speed=1};const _or=x5OReset;x5OReset=function(){cl();return _or.apply(this,arguments)};const _rv=x5ORevive;x5ORevive=function(){cl();return _rv.apply(this,arguments)}}
