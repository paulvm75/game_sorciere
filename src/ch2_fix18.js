/* ================= fixes: Hrímgar's fall, smokier reveals, Kaen's fall at 2%, louder boss music, smarter death stones, a calmer clash ================= */

/* ---------- music: the two epic tracks louder, and every spoken line (in-fight too) ducks them a little; sfx never do ---------- */
MU.gain.mus_b_kaen2=2.75;MU.gain.mus_b_mirror=2.75;

/* ---------- 1. Hrímgar falls slowly, breaks into frost and smoke, and only then does the smoke gather ---------- */
{const _k=xoKaen;xoKaen=function(){if(CS.active){after(.3,xoKaen);return}const old=XO.e;if(!old||old.dead||XO.kPre){XO.kPre=0;return _k.apply(this,arguments)}
  XO.kPre=1;XO.ph=1.55;sayHush();xoClear(old);$('boss').classList.add('hidden');bossRef=null;old.invuln=true;old.busy=999;const p=old.pos.clone();p.y=groundAt(p.x,p.z);const g=old.m.g;const s0=g.scale.clone(),r0=g.rotation.clone();
  const fwd=V3(P.pos.x-p.x,0,P.pos.z-p.z);if(fwd.lengthSq()<.01)fwd.set(1,0,0);fwd.normalize();const sd=V3(fwd.z,0,-fwd.x);const top=()=>headOf(p,4.5);
  const frost=(n,y0,y1,a)=>{for(let q=0;q<n;q++)SM.emit(V3(p.x+rand(-2.5,2.5),p.y+rand(y0,y1),p.z+rand(-2.5,2.5)),{c0:Math.random()<.5?0xcfe8f4:0x6a7a86,c1:0x101418,s0:1.8,s1:5.5,life:1.8,a:a||.5,up:1.6})};
  playCutscene([
    {dur:2.6,fov:44,cut:true,cam:k=>({pos:p.clone().addScaledVector(fwd,9-k*1.5).addScaledVector(sd,3).add(V3(0,1.2,0)),look:top()}),onStart:()=>{CS.speed=.55;x5Impact(120,.14);x5Punch(14,.5);sx('impact',1,null,{rate:.55});sx('shard',.9,null,{rate:.7});P.shake=1;flash(top(),0x9fe3ff,18)},
      update:(dt,k)=>{g.rotation.x=r0.x+k*.22;g.rotation.z=r0.z+Math.sin(k*9)*.03;g.position.y=p.y-k*.6;frost(2,0,6,.45);if(Math.random()<.5)SP.emit(V3(p.x+rand(-2,2),p.y+rand(1,6),p.z+rand(-2,2)),{c0:0xffffff,c1:0x9fe3ff,s0:.4,s1:.04,life:.8,speed:3})}},
    {dur:2.8,fov:50,cut:true,cam:k=>{const a=Math.atan2(fwd.x,fwd.z)+.5-k*.9;return{pos:V3(p.x+Math.sin(a)*12,2.4+k*2,p.z+Math.cos(a)*12),look:headOf(p,2.4-k*1.2)}},onStart:()=>{CS.speed=1;sx('shard',1,null,{rate:.5});sx('riser',.7,null,{rate:.5});x5Grey(1)},
      update:(dt,k)=>{const q=Math.min(1,k*1.15);g.scale.set(s0.x*(1+q*.15),s0.y*Math.max(.02,1-q),s0.z*(1+q*.15));g.position.y=p.y-.6-q*1.2;if(q>.97)g.visible=false;frost(5,0,4+k*4,.6);
        if(Math.random()<.35){const c=V3(p.x+rand(-2,2),p.y+rand(.5,5),p.z+rand(-2,2));SP.emit(c,{n:6,c0:0xffffff,c1:0x9fe3ff,s0:.5,s1:.05,life:.9,speed:5})}P.shake=Math.max(P.shake,.35*(1-k))}},
    {dur:1.8,fov:40,cut:true,cam:k=>({pos:p.clone().addScaledVector(fwd,7-k).add(V3(0,1.6,0)),look:headOf(p,1.6)}),onStart:()=>{sx('heart',.9);g.visible=false},update:(dt,k)=>{frost(4,0,3.5,.55)}}],
    ()=>{CS.speed=1;g.visible=false;after(.05,()=>xoKaen())})}}

/* ---------- 2. the Kaen reveal: thicker smoke, a longer wait inside it, wisps over the close-ups, then the smoke is blown away ---------- */
{const _k=xoKaen;xoKaen=function(){const r=_k.apply(this,arguments);try{if(XO.ph===1.6&&CS.active&&CS.shots&&CS.shots.length>=8&&!XO.kPre){const S=CS.shots,e=XO.e;if(!e)return r;const p=e.pos.clone();
    const fog=(n,y0,y1,R,a)=>{for(let q=0;q<n;q++){const an=Math.random()*TAU,rr=Math.random()*R;SM.emit(V3(p.x+Math.cos(an)*rr,p.y+rand(y0,y1),p.z+Math.sin(an)*rr),{c0:Math.random()<.5?0x8a96a0:0x3a444c,c1:0x0a0e12,s0:1.8,s1:5,life:1.6,a:a,up:1})}};
    S[1].dur=3.2;{const u=S[1].update;S[1].update=(dt,k)=>{u&&u(dt,k);e.m.g.visible=false;fog(6,0,3.8,1.4,.85)}}
    for(let i=2;i<=6;i++){const u=S[i].update;S[i].update=(dt,k)=>{u&&u(dt,k);fog(2,.2,3.6,2.4,.35)}}
    {const os=S[7].onStart;S[7].onStart=()=>{os&&os();SM.emit(headOf(p,1.4),{n:70,c0:0x9aa6b0,c1:0x0a0e12,s0:2,s1:7,life:1.4,a:.55,speed:12})}}}}catch(x){console.warn(x)}return r}}
/* he only falls at 2% */
{const _k=xoKaen;xoKaen=function(){const r=_k.apply(this,arguments);const e=XO.e;if(e&&XO.ph===1.6){const done=CS.done;CS.done=function(){const out=done&&done.apply(this,arguments);try{if(XO.e===e)e.hpFloor=.02}catch(x){}return out}}return r}}

/* ---------- 3. Kaen falls, slower; the smoke takes him; the wait is longer; then you ---------- */
xoMirror=function(){if(CS.active){after(.3,xoMirror);return}const old=XO.e;if(!old)return;XO.ph=1.8;sayHush();xoClear(old);$('boss').classList.add('hidden');bossRef=null;old.invuln=true;old.busy=999;const B=XO.B,p=old.pos.clone();p.y=groundAt(p.x,p.z);
  const hx=p.x+10<=B.x1-3?p.x+10:p.x-10,hp=V3(hx,0,p.z),dir=V3(hp.x-p.x,0,hp.z-p.z).normalize(),side=V3(dir.z,0,-dir.x),mid=p.clone().lerp(hp,.5);x4Stage(hp,Math.atan2(-dir.x,-dir.z));xoCoil(true);X4.cc=p.clone();let mir=null,fig=null,lt=0;
  const mk=()=>{if(mir)return mir;mir=xoMirrorGo(p);mir.invuln=true;mir.busy=999;mir.m.g.rotation.y=Math.atan2(dir.x,dir.z);mir.m.g.visible=false;xoSetGrey(mir.xo.L,true);$('boss').classList.add('hidden');XO.ph=1.8;try{mir.m.actor.setBase('Idle_Loop',0)}catch(x){}return mir};
  const fog=(n,R,y0,y1,a,c)=>{for(let q=0;q<n;q++){const an=Math.random()*TAU,rr=Math.random()*R;SM.emit(V3(p.x+Math.cos(an)*rr,p.y+rand(y0,y1),p.z+Math.sin(an)*rr),{c0:c||0x040406,c1:0x000000,s0:2,s1:6.5,life:1.9,a:Math.min(1,a*1.35),up:1.2})}};
  const cut=(dur,fov,cam,lbl)=>({dur,fov,cut:true,cam,onStart:()=>{mk().m.g.visible=true;x5Impact(80,.07);xmStrobe(.14);sx('zap',.5,null,{rate:rand(.9,1.2)});sx('clash',.7,null,{rate:rand(.5,.8)});P.shake=.9;x5Punch(10,.3);if(fig){fig.g.scale.multiplyScalar(.72);fig.burst(1)}if(lbl)after(.18,()=>x5Banner(lbl,'','#c9a6ff',.8,'#0a0612'))},update:()=>fog(3,2.2,.8,3.6,.4)});
  playCutscene([
    /* he goes down slowly, and the colour drains out of everything */
    {dur:3.2,fov:42,cut:true,cam:k=>({pos:V3(p.x+dir.x*(5.5-k*1.2)+side.x*1.6,1.3-k*.3,p.z+dir.z*(5.5-k*1.2)+side.z*1.6),look:headOf(p,1.3-k*.5)}),onStart:()=>{CS.speed=.6;try{old.m.actor.setBase('Hit_Chest',.1)}catch(x){}sx('impact',.8,null,{rate:.5});sx('heart',.8);x5Impact(100,.12);after(.6,()=>{try{old.m.actor.setBase('Crouch_Idle_Loop',.5)}catch(x){}})},
      update:(dt,k)=>{if(k>.4){x5Grey(1);xoSetGrey(old.xo.L,true)}fog(2,1,0,2.4,.35);if(Math.random()<.05)sx('heart',.6)}},
    {who:'@',text:XL3.mw_15,fov:40,cam:x4S(()=>P.pos,1,2.4,1.7),onStart:()=>{CS.speed=1;x4Talk('@');sx('wind',.4,null,{rate:.5})}},
    /* he comes apart, and the smoke goes up like a chimney fire */
    {dur:4,fov:40,cut:true,cam:k=>({pos:V3(p.x+dir.x*3.6+side.x*1.3,.8+k*.8,p.z+dir.z*3.6+side.z*1.3),look:headOf(p,1.1+k*2.4)}),onStart:()=>{P.heroAnim='Idle_Loop';x4Talk('');sx('riser',.9,null,{rate:.45});sx('heart',.8);fig=xcFig(1.2);fig.g.position.copy(p);fig.set('serpent');fig.cyc=0;fig.g.scale.setScalar(.01)},
      update:(dt,k)=>{const g=old.m.g;const q=Math.min(1,k*1.05);g.scale.set(1-q*.6,Math.max(.02,1-q*1.05),1-q*.6);if(q>.95)g.visible=false;fig.g.scale.setScalar(.01+2.3*k);fig.g.position.y=p.y+k*2.5;fog(9,1.4,0,10*k+.5,.8);if(Math.random()<.05){xmZap(p,4+k*6);}P.shake=Math.max(P.shake,k*.45);if(Math.random()<.04)sx('heart',.7)}},
    /* the cocoon turns */
    {dur:5.4,fov:58,cut:true,cam:k=>{const a=Math.atan2(dir.x,dir.z)+.6+k*2.4,R=12-k*4;return{pos:V3(p.x+Math.sin(a)*R,2.4+k*3,p.z+Math.cos(a)*R),look:V3(p.x,3.4,p.z)}},onStart:()=>{old.m.g.visible=false;fig.set('ball');fig.cyc=.2;fig.g.scale.setScalar(2.5);try{x4Kin('in')}catch(x){}sx('wind',.8,null,{rate:.6});sx('riser',1,null,{rate:.5});sx('thunder',1);xmStrobe(.25)},
      update:(dt,k)=>{fig.g.position.y=p.y+2.2+Math.sin(k*9)*.3;lt-=dt;if(lt<=0){lt=.3-k*.18;const q=V3(p.x+rand(-7,7),rand(3,13),p.z+rand(-7,7));xoBeam(q,V3(p.x,3.4,p.z),Math.random()<.6?0xffffff:0xb070ff,.3,.22);flash(q,0xffffff,10);x5Impact(30,0);sx('zap',.55,null,{rate:rand(.8,1.2)});if(Math.random()<.18){sx('thunder',.8,null,{rate:rand(.85,1.05)});xmStrobe(.12)}}
        for(let q=0;q<6;q++){const a=time*3+q*1.05,R=5.5-k*2;SM.emit(V3(p.x+Math.cos(a)*R,rand(.3,7),p.z+Math.sin(a)*R),{c0:0x030304,c1:0x000000,s0:1.6,s1:4.6,life:1.2,a:.85})}P.shake=Math.max(P.shake,.3+k*.4)}},
    /* the storm: a column of black smoke, lightning crawling all over it */
    {dur:3.8,fov:62,cut:true,cam:k=>({pos:V3(p.x+dir.x*(14-k*3)-side.x*4,.6+k*.5,p.z+dir.z*(14-k*3)-side.z*4),look:V3(p.x,4.5+k*2,p.z)}),onStart:()=>{sx('thunder',1,null,{rate:.85});sx('zap',.8);xmStrobe(.35);P.shake=1.2},
      update:(dt,k)=>{fog(10,2.6,0,14,.9);if(Math.random()<.35)xmZap(p,rand(2,14));if(Math.random()<.02){sx('thunder',.7,null,{rate:rand(.8,1)});xmStrobe(.1)}P.shake=Math.max(P.shake,.35)}},
    /* silence. something stands up inside the smoke; you cannot see what */
    {dur:3.8,fov:34,cut:true,cam:k=>({pos:V3(p.x+dir.x*(7-k*1.6),1.5,p.z+dir.z*(7-k*1.6)),look:headOf(p,1.4)}),onStart:()=>{try{x4Kin('out')}catch(x){}if(fig){fig.set('king');fig.cyc=.12;fig.g.scale.setScalar(1.6);fig.g.position.y=p.y+1}sx('heart',1);after(1.2,()=>sx('heart',1));after(2.2,()=>sx('heart',1.1))},
      update:(dt,k)=>{fog(9,1.7,0,4.5,.95);if(Math.random()<.06)xmZap(p,rand(1,4));if(k>.5&&Math.random()<.04){const c=headOf(p,1.6);flash(c,0xffffff,5)}}},
    /* three hard cuts: boots, hand, face */
    cut(.8,34,()=>({pos:V3(p.x+dir.x*1.7+side.x*.5,.22,p.z+dir.z*1.7+side.z*.5),look:V3(p.x,.25,p.z)}),'YOUR BOOTS'),
    cut(.8,30,()=>({pos:V3(p.x+dir.x*1.3-side.x*1.1,1.05,p.z+dir.z*1.3-side.z*1.1),look:headOf(p,.95)}),'YOUR HANDS'),
    cut(.85,32,k=>({pos:headOf(p,1.25).addScaledVector(dir,1.6-k*.15).addScaledVector(side,.35),look:headOf(p,1.25)}),''),
    cut(1,26,k=>({pos:headOf(p,1.66).addScaledVector(dir,1.25-k*.2),look:headOf(p,1.64)}),'YOUR FACE'),
    /* and the smoke is blown away */
    {dur:2.8,fov:50,cut:true,cam:k=>({pos:V3(mid.x+side.x*(9.5-k*1.5),1.5,mid.z+side.z*(9.5-k*1.5)),look:V3(mid.x,1.45,mid.z)}),onStart:()=>{mk().m.g.visible=true;xcFigOff();fig=null;xoSetGrey(mir.xo.L,false);x5Grey(0);x5Impact(150,.24);xmStrobe(1.4);sx('thunder',1);sx('zap',.9);for(let q=0;q<8;q++)after(q*.12,()=>xmZap(p,rand(1,6)));try{x4Kin('punch')}catch(x){}sx('skyshatter',.9,null,{rate:.8});flash(headOf(p,1.2),0xffffff,34);ring(p,0xc9a6ff,1,18,.6);
        SP.emit(headOf(p,1.2),{n:200,c0:0xffffff,c1:0x7dff9a,speed:16,life:1,s0:.7,s1:.05});SM.emit(headOf(p,1),{n:80,c0:0x3a4a4a,c1:0x010304,s0:2,s1:8,life:1.6,a:.6,speed:14});after(.9,()=>x5Banner('THE HOLLOW CROWN','WEARING YOU','#c9a6ff',1.9));P.heroAnim='Spell_Simple_Idle_Loop';try{mir.m.actor.setBase('Spell_Simple_Idle_Loop',.3)}catch(x){}},
      update:(dt,k)=>{camera.fov=50-k*7;camera.updateProjectionMatrix()}},
    {who:'The Crown, wearing Maëlle',text:XL3.mm_01,fov:30,cam:k=>({pos:headOf(p,1.56).addScaledVector(dir,2.3-k*.4).addScaledVector(side,.8),look:headOf(p,1.5)}),onStart:()=>{try{x4Kin('out')}catch(x){}mk().m.g.visible=true;try{mir.m.actor.setBase('Idle_Talking_Loop',.3)}catch(x){}}},
    {who:'@',text:XL3.mw_16,fov:36,cam:x4S(()=>P.pos,-1,2.2,1.65),onStart:()=>{x4Talk('@');try{mir.m.actor.setBase('Idle_Loop',.3)}catch(x){}}},
    {who:'Lyra',text:XL3.lw_12,fov:40,cam:k=>({pos:headOf(x4L(),1.1).add(V3(-2.8,.3,1.2)),look:headOf(x4L(),.8)})}],
    ()=>{CS.speed=1;x5Grey(0);xcFigOff();if(old.m.g.parent)scene.remove(old.m.g);old.dead=true;mk();mir.m.g.visible=true;mir.m.g.scale.setScalar(1);xoSetGrey(mir.xo.L,false);mir.xo.grey=false;P.heroAnim=null;X4.cc=null;CH2.st=Math.max(CH2.st,22);ch2Save();writeSave();mir.invuln=false;mir.busy=.9;try{mir.m.actor.setBase('Idle_Loop',.2)}catch(x){}
      XO.ph=2;$('boss').classList.remove('hidden');bossRef=mir;P.invuln=1.5;x5Punch(12,.4)})};

/* ---------- 4. the clash: a small instruction, no bar; it happens now and then during her limit breaker; it does not end the fight ---------- */
(function(){const st=document.createElement('style');st.textContent=`#xmFcS{position:fixed;left:50%;top:calc(24% + env(safe-area-inset-top,0px));max-width:92vw;white-space:normal;text-align:center;transform:translate(-50%,8px);z-index:40;opacity:0;pointer-events:none;transition:opacity .35s,transform .35s;
  padding:9px 18px;border-radius:999px;background:rgba(14,8,24,.62);border:1px solid rgba(255,200,120,.35);box-shadow:0 0 18px rgba(255,150,60,.25);color:#fff4dc;font:600 clamp(13px,1.6vw,16px) Outfit,system-ui,sans-serif;letter-spacing:.03em;text-shadow:0 1px 3px #000}
#xmFcS.on{opacity:1;transform:translate(-50%,0)}#xmFcS b{color:#ffd27a}#xmFcS.hit{transform:translate(-50%,0) scale(1.05)}#xmFcS i{display:none}`;document.head.appendChild(st)})();
xmFcUI=function(){let d=document.getElementById('xmFcS');if(d)return d;const touch=typeof isTouch!=='undefined'&&isTouch;d=document.createElement('div');d.id='xmFcS';d.innerHTML=touch?'Keep tapping the screen, <b>fast</b>, to push her back':'Keep tapping <b>SPACE</b>, fast, to push her back';d.appendChild(document.createElement('i'));document.body.appendChild(d);
  window.addEventListener('keydown',ev=>{if(!XO.fc)return;if(ev.code==='Space'){ev.preventDefault();ev.stopImmediatePropagation();if(!ev.repeat)xmFcPush()}},true);
  window.addEventListener('pointerdown',ev=>{if(XO.fc&&touch){xmFcPush()}},true);return d};
xmWarn=function(){};
{const _p=xmFcPush;xmFcPush=function(){const r=_p.apply(this,arguments);const d=document.getElementById('xmFcS');if(d){d.classList.add('hit');clearTimeout(d._h);d._h=setTimeout(()=>d.classList.remove('hit'),80)}return r}}
{const _fs=xmFcStart;xmFcStart=function(m){const r=_fs.apply(this,arguments);const d=xmFcUI();d.style.display='';requestAnimationFrame(()=>d.classList.add('on'));try{xmMash(false)}catch(x){}return r}}
xmFcEnd=function(win){const C=XO.fc;if(!C)return;XO.fc=null;const d=xmFcUI();d.classList.remove('on');try{xmMash(false)}catch(x){}for(const b of C.b){scene.remove(b);b.geometry.dispose()}scene.remove(C.orb);P.heroAnim=null;const m=C.m;XO.fc2=rand(32,46);if(!m||m.dead)return;m.invuln=false;
  if(win){const c=eCenter(m);lbBoom(c,0xffa030,true);flash(c,0xffc040,30);x5Impact(130,.14);P.shake=1.3;sx('impact',1,null,{rate:.8});SP.emit(c,{n:160,c0:0xffffff,c1:0xffa030,speed:14,life:1,s0:.7,s1:.05});
    const v=V3(m.pos.x-P.pos.x,0,m.pos.z-P.pos.z);if(v.lengthSq()<.01)v.set(1,0,0);v.normalize();const B=XO.B;m.pos.x=clamp(m.pos.x+v.x*7,B.x0+3,B.x1-3);m.pos.z=clamp(m.pos.z+v.z*7,B.z0+3,B.z1-3);
    const cut=m.maxhp*.1;m.hp=Math.max(m.maxhp*(m.hpFloor||0)+1,m.hp-cut);floatText(headOf(m.pos,2.8),'-10%','#ffd060',true);m.busy=2.4;m.stun=Math.max(m.stun||0,2.4);P.invuln=Math.max(P.invuln,1.2);return}
  m.busy=.6;flash(headOf(P.pos,1),0xff5010,30);fireBurst(headOf(P.pos,.6),4,true);P.shake=1.6;x5Impact(120,.14);sx('impact',1,null,{rate:.6});x5Say('The Crown, wearing Maëlle','mm_12',1);
  P.invuln=0;const dmg=1000;P.hp-=dmg;floatText(headOf(P.pos,2.2),'-'+dmg,'#ff4020',true);if(P.hp<=0){P.hp=1;damagePlayer(1e6)}m.hp=Math.min(m.maxhp,m.hp+m.maxhp*.08)};
{const _st=xmSagaTick;xmSagaTick=function(dt){const m=XO.mir;if(!m||m.dead||XO.fc)return _st.apply(this,arguments);const B=XO.bk||(XO.bk={});XO.fcT=999;const out=_st.apply(this,arguments);
  if(B.lb&&!m.dead){if(XO.fc2==null)XO.fc2=rand(20,28);if(!CS.active&&!XO.fc&&!XO.lbSeq&&P.alive&&!m.invuln&&B.my!=null){XO.fc2-=dt;if(XO.fc2<=0){XO.fc2=rand(32,46);xmFcStart(m)}}
    if(B.x2){m.hpFloor=.012;if(!CS.active&&!XO.fc&&!XO.endT&&m.hp<=m.maxhp*.016+1){XO.endT=1;xoEnd()}}}
  return out}}
{const _g=xoMirrorGo;xoMirrorGo=function(){XO.fc2=null;XO.endT=0;return _g.apply(this,arguments)}}

/* ---------- 5. death stones: always reachable from where you stand, and gone whenever you are not weakened ---------- */
function stInBox(x,z,m){for(const b of boxes){if(b.h<1.2)continue;if(x>b.x0-m&&x<b.x1+m&&z>b.z0-m&&z<b.z1+m)return true}return false}
function stOK(x,z,from){if(x<WB.x0+4||x>WB.x1-4||z<WB.z0+4||z>WB.z1-4)return false;if(stInBox(x,z,1.6))return false;
  if(MODE!=='open'){if(CH2.zone==='paris'&&stWater(x,z))return false;if(CH2.zone==='north'&&typeof nzWater==='function'&&nzWater(x,z))return false;
    if(CH2.zone==='north'&&(CH2.st===21||CH2.st===22)&&XO.ph>0&&XO.ph<3){const B=XO.B;if(x<B.x0+3||x>B.x1-3||z<B.z0+3||z>B.z1-3)return false}}
  if(Math.abs(groundAt(x,z)-groundAt(from.x,from.z))>2.5)return false;
  for(let i=1;i<14;i++){const k=i/14,sx=from.x+(x-from.x)*k,sz=from.z+(z-from.z)*k;if(stInBox(sx,sz,.4))return false;if(MODE!=='open'&&CH2.zone==='paris'&&stWater(sx,sz)&&!stBridge(sx,sz))return false}return true}
function stSpot(from,i,n,base){const tight=MODE!=='open'&&(CH2.zone!=='paris'||(CH2.zone==='north'&&XO.ph>0));const radii=tight?[22,16,11,7,4]:[90,70,50,32,18,10,5];
  for(const R of radii)for(let t=0;t<10;t++){const a=base+i*TAU/n+(t%2?1:-1)*Math.ceil(t/2)*.32,r=R*rand(.75,1.05),x=from.x+Math.sin(a)*r,z=from.z+Math.cos(a)*r;if(stOK(x,z,from))return V3(x,groundAt(x,z),z)}
  return V3(from.x+Math.sin(base+i)*2.5,groundAt(from.x,from.z),from.z+Math.cos(base+i)*2.5)}
spawnStones=function(n){for(const s of stones)scene.remove(s.g);stones.length=0;if(n<=0)return;const from=(P.alive?P.pos:(P.deathPos||P.pos)).clone();const base=Math.random()*TAU;
  for(let i=0;i<n;i++){const at=stSpot(from,i,n,base);const g=new THREE.Group();g.position.copy(at);const gem=new THREE.Mesh(G.shard,std({color:0x7dffe9,emissive:0x2aa090,roughness:.1,metalness:.3,flatShading:true,envMapIntensity:2}));gem.position.y=1.6;gem.scale.set(.7,1.2,.7);g.add(gem);
    {const gs=glowSprite(0x7dffe9,5);gs.position.y=1.6;g.add(gs)}const beam=new THREE.Mesh(new THREE.CylinderGeometry(.5,.9,90,12,1,true),new THREE.MeshBasicMaterial({color:0x5cf5dc,transparent:true,opacity:.22,blending:THREE.AdditiveBlending,depthWrite:false,side:THREE.DoubleSide,fog:false}));beam.position.y=45;g.add(beam);
    const rn=decal(runeTex,0x5cf5dc,6,true,.7);rn.position.y=.1;g.add(rn);g.userData.rn=rn;scene.add(g);stones.push({g,gem,pos:g.position,zone:CH2.zone,area:SB.area})}};
{const _r=revive;revive=function(){const r=_r.apply(this,arguments);if(P.weak&&stones.length)spawnStones(stones.length);return r}}
{const _ac=applyChapter;applyChapter=function(){const r=_ac.apply(this,arguments);P.weak=false;P.stonesGot=0;for(const s of stones)if(s.g.parent)s.g.parent.remove(s.g);stones.length=0;return r}}
{let chk=0;const _mt=muTick;muTick=function(dt){_mt(dt);if(!started||MODE==='open')return;chk-=dt;if(chk>0)return;chk=1;
  if(!P.weak&&stones.length){for(const s of stones)if(s.g.parent)s.g.parent.remove(s.g);stones.length=0;return}
  if(!P.weak||!stones.length||!P.alive||CS.active)return;let bad=false;for(const s of stones){const p=s.g.position;if(s.zone!==CH2.zone||(CH2.zone==='latin'&&s.area!==SB.area)||Math.hypot(p.x-P.pos.x,p.z-P.pos.z)>260||!stOK(p.x,p.z,P.pos)){bad=true;break}}
  if(bad){for(const s of stones)if(s.g.parent)s.g.parent.remove(s.g);spawnStones(stones.length)}}}
{const _ai=BOSSAI.illusion;BOSSAI.illusion=function(e,dt,d){const r=_ai.apply(this,arguments);if(e.xo)e.hpFloor=.02;return r}}

/* the clash eases in: 1.8s where the beams meet and grow before anything is decided */
{const _fs=xmFcStart;xmFcStart=function(m){const r=_fs.apply(this,arguments);if(XO.fc){XO.fc.intro=1.8;XO.fc.k=.5;for(const b of XO.fc.b)b.visible=false;CS.speed=1}return r}}
{const _ft=xmFcTick;xmFcTick=function(dt){const C=XO.fc;if(C&&C.intro>0){const k=C.k,t=C.t;C.intro-=dt;const r=_ft.apply(this,arguments);if(XO.fc===C){C.k=Math.max(k,C.k);C.t=t;const g=1-Math.max(0,C.intro)/1.8;for(const b of C.b){b.visible=true;b.scale.x*=g;b.scale.z*=g}C.orb.scale.multiplyScalar(.3+.7*g)}return r}return _ft.apply(this,arguments)}}

/* music balance: louder Sorbonne square, epic swell for 4s after every cinematic */
{const _ec=endCutscene;endCutscene=function(){const w=CS.active;const r=_ec.apply(this,arguments);if(w)MU.pcT=4;return r}}
{const _mt=muTick;muTick=function(dt){const lat=started&&MODE!=='open'&&typeof CH2!=='undefined'&&CH2.zone==='latin';let z=1;if(lat)z=SB.area==='tun'?1.45:1.95;
  MU.pcT=Math.max(0,(MU.pcT||0)-Math.min(dt,.05));const e=MU.pcT>0?Math.min(1,(4-MU.pcT)/.4,MU.pcT/1.2):0;const tg=z*(1+.45*e);
  MU.xb=(MU.xb||1)+(tg-(MU.xb||1))*Math.min(1,dt*3);MU.dk=lat?.5:.62;_mt(dt)}}

/* lightning arc around a point, and a hard black/white strobe */
function xmZap(p,h){const a=V3(p.x+rand(-3,3),p.y+h+rand(1,4),p.z+rand(-3,3)),b=V3(p.x+rand(-1.2,1.2),p.y+Math.max(.5,h-rand(1,3)),p.z+rand(-1.2,1.2));try{xoBeam(a,b,Math.random()<.7?0xffffff:0xc9a6ff,.18,.16)}catch(x){}flash(b,0xffffff,7)}
function xmStrobe(dur){let o=document.getElementById('xmStb');if(!o){o=document.createElement('div');o.id='xmStb';o.style.cssText='position:fixed;inset:0;z-index:38;pointer-events:none;opacity:0';document.body.appendChild(o)}
  const cv=renderer.domElement,end=performance.now()+dur*1000;clearTimeout(o._t);
  const step=()=>{if(performance.now()>=end){o.style.opacity='0';cv.style.filter='';return}const r=Math.random();
    if(r<.3){o.style.background='#fff';o.style.opacity='1';cv.style.filter=''}else if(r<.5){o.style.background='#000';o.style.opacity='.92';cv.style.filter=''}
    else if(r<.85){o.style.opacity='0';cv.style.filter='grayscale(1) contrast(6) brightness(1.25)'}else{o.style.opacity='0';cv.style.filter=''}
    o._t=setTimeout(step,45+Math.random()*55)};step()}
