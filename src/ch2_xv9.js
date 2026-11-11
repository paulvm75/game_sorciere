/* ================= XVI polish: a bigger square, a spell wall, her limit breaker in gold ================= */
Object.assign(XO.B,{x0:-175,x1:-85,z0:-9902,z1:-9845});
Object.assign(SPEAKER,{'The Crown, wearing Maëlle':'#ff8a8a'});

/* ---------- the spell wall: light green, subtle, brighter where you touch it ---------- */
const XW={g:null,mat:null,a:0,hit:0};
function xoWallBuild(){if(XW.g)return XW.g;const B=XO.B,H=7;
  const mat=new THREE.ShaderMaterial({uniforms:{uT:{value:0},uA:{value:0},uH:{value:0},uP:{value:new THREE.Vector3()}},transparent:true,depthWrite:false,side:THREE.DoubleSide,blending:THREE.AdditiveBlending,fog:false,
    vertexShader:'varying vec2 vU;varying vec3 vW;void main(){vU=uv;vec4 w=modelMatrix*vec4(position,1.);vW=w.xyz;gl_Position=projectionMatrix*viewMatrix*w;}',
    fragmentShader:'uniform float uT,uA,uH;uniform vec3 uP;varying vec2 vU;varying vec3 vW;void main(){float y=vU.y;float base=pow(1.-y,2.4);float s=vW.x+vW.z;float lines=pow(.5+.5*sin(s*1.3-uT*1.2),22.);float hx=pow(.5+.5*sin(y*34.+uT*1.6),40.);float scan=exp(-pow((y-fract(uT*.16))*12.,2.));float d=distance(vW.xz,uP.xz);float near=smoothstep(10.,1.5,d)*(1.+uH*1.5);float foot=smoothstep(.06,0.,y);float a=(base*.5+lines*base*.6+hx*base*.3+scan*(1.-y)*.35+foot*.9)*(.6+near)*uA;gl_FragColor=vec4(vec3(.62,1.,.72)*(1.+near*.5),a*.75);}'});
  const g=new THREE.Group();const W=B.x1-B.x0,D=B.z1-B.z0,cx=(B.x0+B.x1)/2,cz=(B.z0+B.z1)/2;
  const side=(w,x,z,ry)=>{const m=new THREE.Mesh(new THREE.PlaneGeometry(w,H,Math.ceil(w/3),1),mat);m.position.set(x,H/2,z);m.rotation.y=ry;m.renderOrder=4;m.frustumCulled=false;g.add(m)};
  side(W,cx,B.z0,0);side(W,cx,B.z1,0);side(D,B.x0,cz,Math.PI/2);side(D,B.x1,cz,Math.PI/2);
  g.position.y=groundAt(cx,cz)+.02;g.visible=false;(NZ.g||scene).add(g);XW.g=g;XW.mat=mat;return g}
function xoWallTick(dt){const on=MODE!=='open'&&CH2.zone==='north'&&(CH2.st===21||CH2.st===22)&&XO.ph>=.5&&XO.ph<3;if(!XW.g){if(!on)return;xoWallBuild()}
  XW.a+=((on?1:0)-XW.a)*Math.min(1,dt*1.6);XW.g.visible=XW.a>.01;XW.hit=Math.max(0,XW.hit-dt*2.5);if(!XW.g.visible)return;const u=XW.mat.uniforms;u.uT.value+=dt;u.uA.value=XW.a;u.uH.value=XW.hit;u.uP.value.copy(P.pos)}
{const _ar=xoArena;xoArena=function(){const x=P.pos.x,z=P.pos.z;const r=_ar.apply(this,arguments);if(Math.abs(P.pos.x-x)+Math.abs(P.pos.z-z)>.001){XW.hit=1;if(Math.random()<.35)SP.emit(V3(P.pos.x,P.pos.y+rand(.3,1.8),P.pos.z),{n:3,c0:0xe8ffe8,c1:0x60ff90,s0:.35,s1:.04,life:.5,speed:2})}return r}}

/* ---------- her limit breaker: built like yours, gold, with only a breath of black ---------- */
function xmGoldFx(m){if(m.m.lbg)return m.m.lbg;const g=new THREE.Group();m.m.g.add(g);
  const rn=decal(runeTex,0xffc040,5.5,true,.75);rn.position.y=.08;g.add(rn);const rn2=decal(runeTex,0xffe070,8.5,true,.4);rn2.position.y=.1;g.add(rn2);
  const fl=[];for(const [r,h,col,sp,a,blk] of [[1.0,3.4,0xffb020,1,.85,0],[.75,2.8,0xfff0a0,1.5,.85,0],[1.3,4.4,0xff8a10,.8,.55,0],[1.5,4.6,0x0a0604,.7,.14,1]]){
    const mt=new THREE.ShaderMaterial({uniforms:{uT:{value:0},uC:{value:new THREE.Color(col)},uA:{value:a},uS:{value:sp}},transparent:true,depthWrite:false,side:THREE.DoubleSide,blending:blk?THREE.NormalBlending:THREE.AdditiveBlending,
      vertexShader:'varying vec2 vU;void main(){vU=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}',
      fragmentShader:'uniform float uT,uA,uS;uniform vec3 uC;varying vec2 vU;float h(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}float n(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(h(i),h(i+vec2(1,0)),f.x),mix(h(i+vec2(0,1)),h(i+vec2(1,1)),f.x),f.y);}void main(){vec2 p=vec2(vU.x*16.,vU.y*3.-uT*uS*2.2);float f=n(p)*.55+n(p*2.3+3.)*.3+n(p*5.1+7.)*.15;float y=vU.y;float a=smoothstep(.5,.85,f+.18-y*.3)*pow(1.-y,1.4)*smoothstep(0.,.15,y);gl_FragColor=vec4(uC*(.8+f*.8),a*uA*.8);}'});
    const c=new THREE.Mesh(new THREE.CylinderGeometry(r*.55,r,h,28,1,true),mt);c.position.y=h/2-.1;c.renderOrder=blk?5:6;c.userData.a=a;g.add(c);fl.push(c)}
  const orb=[];for(let k=0;k<6;k++){const s=glowSprite(k%2?0xffd060:0xfff4d0,.22,.9);g.add(s);orb.push(s)}
  return m.m.lbg={g,rn,rn2,fl,orb}}
xmDarkOn=function(m){if(m._dk)return;m._dk=1;m.lb=1;try{xmRedEyes(m)}catch(x){}try{if(m.xo)m.xo.L=xoGreyList(m.m.g)}catch(x){}
  if(!m.m.aura){const au=glowSprite(0xffc040,5,.4);au.position.y=1.1;m.m.g.add(au);m.m.aura=au}m.m.fl=null;xmGoldFx(m);
  try{for(const o of m.m.eyes||[]){o.visible=true;o.material=o.material.clone();o.material.color.setHex(0xff1a1a)}}catch(x){}};
function xmGoldTick(dt){const m=XO.mir;if(!m||m.dead||!m.m||!m.m.lbg)return;const L=m.m.lbg;L.g.visible=!!m.lb;if(!m.lb)return;L.rn.rotation.z+=dt*2;L.rn2.rotation.z-=dt*1.2;
  L.fl.forEach((c,i)=>{c.material.uniforms.uT.value=time;c.material.uniforms.uA.value=c.userData.a*(.85+Math.sin(time*11+i)*.15);c.scale.set(1+Math.sin(time*7+i)*.05,1,1+Math.cos(time*6+i)*.05)});
  L.orb.forEach((s,i)=>{const a=time*(2.2+i*.15)+i*TAU/6,r=1.1+Math.sin(time*3+i)*.2;s.position.set(Math.sin(a)*r,.6+((time*.9+i/6)%1)*2.6,Math.cos(a)*r)});
  if(Math.random()<dt*30){const c=eCenter(m);SP.emit(V3(c.x+rand(-1.1,1.1),c.y+rand(-1,1.4),c.z+rand(-1.1,1.1)),{c0:Math.random()<.15?0x140a04:0xffe8a0,c1:0x301800,s0:.5,s1:.05,life:.9,up:3,speed:.6})}}
{const _uf=updateFx;updateFx=function(dt){const r=_uf.apply(this,arguments);try{xoWallTick(dt);xmGoldTick(dt)}catch(x){}return r}}

/* ---------- limit breaker timing: Kaen finishes, a beat, then you; she is already burning gold in your shot ---------- */
function xmAfterSay(wait,fn,cap){let el=0,heard=0;const go=()=>{if(XO.ph!==2||!P.alive)return;el+=.2;const busy=SAYQ.on||SAYQ.q.length||SAYQ.src;if(busy)heard=1;if((busy||!heard&&el<3)&&el<(cap||10)){after(.2,go);return}after(wait,fn)};after(.3,go)}
{const _my=xmMyLB;xmMyLB=function(){if(XO.ph!==2||!P.alive)return;if(CS.active||XO.fc){after(.4,xmMyLB);return}const m=XO.mir;if(m&&!m.dead&&m.lb&&!XO.myEst){XO.myEst=1;xmDarkOn(m);
    const fwd=()=>{const v=V3(m.pos.x-P.pos.x,0,m.pos.z-P.pos.z);if(v.lengthSq()<.01)v.set(0,0,-1);return v.normalize()};
    xmFreeze(m);P.face=Math.atan2(m.pos.x-P.pos.x,m.pos.z-P.pos.z);
    XO.lbSeq=0;playCutscene([{dur:1.9,fov:44,cut:true,cam:k=>{const f=fwd(),r=V3(f.z,0,-f.x);return{pos:headOf(P.pos,1.85).addScaledVector(f,-2.4-k*.4).addScaledVector(r,.95),look:headOf(m.pos,1.25+k*.15)}},
      onStart:()=>{sx('heart',.8);sx('riser',.5,null,{rate:.6});try{m.m.actor.setBase('Idle_Loop',.2)}catch(x){}},update:(dt,k)=>{const c=eCenter(m);if(Math.random()<.5)lightning(V3(c.x,c.y+1.6,c.z),V3(c.x+rand(-1.6,1.6),c.y+rand(-1,.6),c.z+rand(-1.6,1.6)),0xffd060)}}],()=>{_my();xmK9()});return}
  return _my.apply(this,arguments)}}

/* ---------- the last clash: a full-screen, kinetic MASH prompt, then a compact live one ---------- */
(function(){const st=document.createElement('style');st.textContent=`
#xmMash{position:fixed;inset:0;z-index:42;pointer-events:none;display:none;flex-direction:column;align-items:center;justify-content:center;font-family:'Bangers',Impact,sans-serif}
#xmMash.on{display:flex}#xmMash .bg{position:absolute;inset:0;background:radial-gradient(circle at 50% 52%,rgba(255,190,60,.55),rgba(255,70,20,.32) 38%,rgba(40,0,0,.25) 70%);animation:xmBg .9s ease-out both}
#xmMash .w{position:relative;font-size:clamp(70px,17vw,210px);line-height:.9;letter-spacing:.04em;color:#fff6d0;-webkit-text-stroke:4px #3a0c00;text-shadow:0 0 30px rgba(255,170,40,.9),8px 8px 0 #c2410c;animation:xmPop .45s cubic-bezier(.2,1.6,.4,1) both,xmShake .12s .45s 8 alternate}
#xmMash .key{position:relative;margin-top:18px;width:min(64vw,540px);height:clamp(58px,9vw,96px);border-radius:18px;background:linear-gradient(180deg,#fffaf0,#ffd38a);border:3px solid #3a0c00;border-bottom-width:14px;box-shadow:0 0 40px rgba(255,180,60,.8);
  display:flex;align-items:center;justify-content:center;color:#3a0c00;font-size:clamp(30px,5vw,58px);letter-spacing:.2em;animation:xmKey .16s .3s infinite alternate}
#xmMash .sub{position:relative;max-width:88vw;text-align:center;margin-top:16px;font-family:Outfit,system-ui,sans-serif;font-weight:700;font-size:clamp(14px,1.8vw,20px);color:#fff;text-shadow:0 2px 6px #000;letter-spacing:.04em}
#xmMash.out{animation:xmOut .5s ease-in forwards}
@keyframes xmBg{0%{opacity:0}20%{opacity:1}100%{opacity:.85}}@keyframes xmPop{0%{transform:scale(3.2) rotate(-8deg);opacity:0}100%{transform:scale(1) rotate(-3deg);opacity:1}}
@keyframes xmShake{0%{transform:rotate(-3deg) translate(-4px,2px)}100%{transform:rotate(-2deg) translate(4px,-2px)}}@keyframes xmKey{0%{transform:translateY(0);border-bottom-width:14px}100%{transform:translateY(9px);border-bottom-width:5px}}
@keyframes xmOut{to{opacity:0;transform:scale(.45) translateY(38vh)}}
#xmFcB{position:fixed;left:50%;bottom:17%;transform:translateX(-50%);z-index:40;display:none;flex-direction:column;align-items:center;gap:8px;pointer-events:auto;font-family:'Bangers',Impact,sans-serif;color:#fff;text-shadow:2px 2px 0 #000}
#xmFcB.on{display:flex}#xmFcB .k{padding:6px 26px;border-radius:12px;background:linear-gradient(180deg,#fffaf0,#ffd38a);border:2px solid #3a0c00;border-bottom-width:8px;color:#3a0c00;font-size:clamp(20px,2.6vw,30px);letter-spacing:.2em;box-shadow:0 0 22px rgba(255,170,40,.7);animation:xmPulse .5s infinite alternate}
#xmFcB .k.hit{transform:translateY(5px);border-bottom-width:3px}#xmFcB .bar{position:relative;width:min(70vw,560px);height:20px;border:3px solid #fff;border-radius:999px;background:linear-gradient(90deg,#3a0610,#140208);overflow:hidden;box-shadow:0 0 18px rgba(255,120,40,.6)}
#xmFcB .bar i{display:block;height:100%;width:50%;background:linear-gradient(90deg,#ffe080,#ffa030,#ff5a10);box-shadow:0 0 14px #ffb040;transition:width .08s}
#xmFcB .ends{width:min(70vw,560px);display:flex;justify-content:space-between;font-size:15px;letter-spacing:.12em}@keyframes xmPulse{to{box-shadow:0 0 40px rgba(255,190,60,1);transform:scale(1.06)}}`;document.head.appendChild(st)})();
xmFcUI=function(){let d=document.getElementById('xmFcB');if(d)return d;const touch=typeof isTouch!=='undefined'&&isTouch;d=document.createElement('div');d.id='xmFcB';
  d.innerHTML=`<div class="bar"><i></i></div><div class="ends"><span>YOU</span><span>HER</span></div><div class="k">${touch?'TAP':'SPACE'}</div>`;document.body.appendChild(d);
  window.addEventListener('keydown',ev=>{if(!XO.fc)return;if(ev.code==='Space'){ev.preventDefault();ev.stopImmediatePropagation();if(!ev.repeat)xmFcPush()}},true);
  d.addEventListener('pointerdown',ev=>{if(XO.fc){ev.preventDefault();xmFcPush()}});return d};
{const _p=xmFcPush;xmFcPush=function(){const r=_p.apply(this,arguments);const k=document.querySelector('#xmFcB .k');if(k){k.classList.add('hit');clearTimeout(k._t);k._t=setTimeout(()=>k.classList.remove('hit'),70)}return r}}
function xmMash(on){let d=document.getElementById('xmMash');if(!d){d=document.createElement('div');d.id='xmMash';document.body.appendChild(d)}clearTimeout(d._t);clearTimeout(d._t2);
  if(!on){d.className='';const fb=document.getElementById('xmFcB');if(fb)fb.style.opacity='1';return}const touch=typeof isTouch!=='undefined'&&isTouch;
  d.innerHTML=`<div class="bg"></div><div class="w">${touch?'TAP!':'MASH!'}</div><div class="key">${touch?'TAP TAP TAP':'SPACE'}</div><div class="sub">${touch?'Tap the screen':'Hit the space bar'} as fast as you can · lose and it will hurt badly</div>`;
  d.className='on';const fb=document.getElementById('xmFcB');if(fb){fb.style.transition='opacity .35s';fb.style.opacity='0'}d._t=setTimeout(()=>{d.className='on out';if(fb)fb.style.opacity='1'},1700);d._t2=setTimeout(()=>{d.className=''},2250)}
xmWarn=function(){xmMash(true)};
{const _fs=xmFcStart;xmFcStart=function(m){const r=_fs.apply(this,arguments);const d=xmFcUI();d.classList.add('on');d.style.display='';return r}}
{const _fe=xmFcEnd;xmFcEnd=function(win){const had=!!XO.fc;const r=_fe.apply(this,arguments);if(had){const d=xmFcUI();d.classList.remove('on');xmMash(false)}return r}}
function xmK9(){const go=()=>{if(CS.active){after(.5,go);return}after(6,()=>{if(XO.ph===2&&XO.mir&&!XO.mir.dead)x5Say('Kaen','kx_09',1)})};after(.5,go)}
{const _es=epSay;epSay=function(who,text,prio){if(XO.lbSeq&&text!==XL3.kw_21)return;return _es.apply(this,arguments)}}
{const _g=xoMirrorGo;xoMirrorGo=function(){XO.myEst=0;XO.lbSeq=0;return _g.apply(this,arguments)}}
{const _r=revive;revive=function(){XO.lbSeq=0;return _r.apply(this,arguments)}}

/* ---------- Kaen's reveal: no spoilers. Smoke, then shoes, bracelet, cape, torso, face, and only then the wide shot ---------- */
XL3.mw_38="Damn... it's Kaen! No... I can't. I can't hit you.";VO_MAP[XL3.mw_38]='mw_38';
xoKaen=function(){if(CS.active){after(.3,xoKaen);return}const old=XO.e;XO.ph=1.6;sayHush();const p=XOC().add(V3(-6,0,0));xoClear(null);if(old){scene.remove(old.m.g);old.dead=true}XO.e=null;bossRef=null;$('boss').classList.add('hidden');
  const hp=V3(p.x+10,0,p.z);x4Stage(hp,-Math.PI/2);P.face=-Math.PI/2;xoCoil(true);X4.cc=p.clone();
  const e=xoSpawn(5,p,false);e.invuln=true;e.busy=999;e.m.g.rotation.y=Math.PI/2;e.m.g.scale.setScalar(1);e.m.g.visible=false;$('boss').classList.add('hidden');kNoSpell(e.m.actor);try{e.m.actor.setBase('Idle_Loop',0)}catch(x){}
  const kp=()=>KFW.a?KFW.a.g.position:hp;const ry=Math.PI/2,f=V3(Math.sin(ry),0,Math.cos(ry)),r=V3(f.z,0,-f.x);
  const bones=(e.m.actor&&e.m.actor.bones)||[];const BN=n=>bones.find(b=>b.name===n||b.name.endsWith(n));
  const BP=(n,fb)=>{const b=BN(n);if(b){e.m.g.updateMatrixWorld(true);return b.getWorldPosition(V3())}return V3(p.x,fb,p.z)};
  const smoke=(n,y0,y1,R,a)=>{for(let q=0;q<n;q++){const an=Math.random()*TAU,rr=Math.random()*R;SM.emit(V3(p.x+Math.cos(an)*rr,p.y+rand(y0,y1),p.z+Math.sin(an)*rr),{c0:Math.random()<.5?0x8a96a0:0x3a444c,c1:0x0a0e12,s0:1.6,s1:4.6,life:1.5,a:a||.6,up:1.2})}};
  let TOP=null;const top=()=>{if(TOP==null){const bb=new THREE.Box3().setFromObject(e.m.g);TOP=isFinite(bb.max.y)&&bb.max.y>.5?bb.max.y:1.8}return TOP};
  const hit=(s)=>{x5Impact(60,.04);sx('clash',.45,null,{rate:rand(.5,.7)});P.shake=.45;x5Punch(7,.25);if(s)sx(s,.6)};
  const pin=()=>{e.pos.set(p.x,0,p.z);e.m.g.position.set(p.x,0,p.z);e.m.g.rotation.y=ry};const SH=[
    /* 1. the smoke gathers: nothing inside it yet */
    {dur:3.4,fov:50,cut:true,cam:k=>({pos:V3(p.x+10-k*3,1.4+k*1.2,p.z+5-k*2),look:V3(p.x,1.4+k*.6,p.z)}),onStart:()=>{x5Impact(90,.1);sx('skyshatter',.5,null,{rate:1.1});sx('riser',.8,null,{rate:.55});sx('heart',.8);x5Grey(1)},
      update:(dt,k)=>{xoStorm(p,dt,.6+k);smoke(4+Math.round(k*4),0,4.2,1.2+k*.6,.55+k*.2);if(Math.random()<dt*2)lightning(V3(p.x,p.y+4,p.z),V3(p.x+rand(-1,1),p.y+rand(.5,2),p.z+rand(-1,1)),0x9aa8b0);P.shake=Math.max(P.shake,k*.3)}},
    /* 2. closer, thicker, a heartbeat: still nothing to see */
    {dur:2.2,fov:40,cut:true,cam:k=>({pos:V3(p.x+5.5-k*1.5,1.5,p.z+1.5-k*.5),look:V3(p.x,1.4,p.z)}),onStart:()=>{sx('heart',.9)},update:(dt,k)=>{xoStorm(p,dt,1.4);smoke(9,0,3.6,1.3,.8);if(k>.85&&!e.m.g.visible){e.m.g.visible=true}}},
    /* 3. shoes */
    {dur:1.3,fov:30,cut:true,cam:k=>{const a=BP('foot_r',.1);return{pos:a.clone().addScaledVector(f,1.3-k*.2).addScaledVector(r,.5).add(V3(0,.15,0)),look:a.clone().add(V3(0,.05,0))}},onStart:()=>{e.m.g.visible=true;hit()},update:(dt)=>{smoke(4,1,3.4,1.1,.55)}},
    /* 4. the bracelet */
    {dur:1.1,fov:24,cut:true,cam:k=>{const a=BP('hand_l',1),s=BP('spine_02',1.1);const o=V3(a.x-s.x,0,a.z-s.z);if(o.lengthSq()<.001)o.copy(r);o.normalize();return{pos:a.clone().addScaledVector(f,.8).addScaledVector(o,.45).add(V3(0,.08-k*.05,0)),look:a}},onStart:()=>hit('shield')},
    /* 5. the cape */
    {dur:1.2,fov:34,cut:true,cam:k=>{const a=BP('spine_02',1.2);return{pos:a.clone().addScaledVector(f,-1.8).addScaledVector(r,.9-k*1.4).add(V3(0,.2,0)),look:a.clone().add(V3(0,-.2,0))}},onStart:()=>hit()},
    /* 6. torso */
    {dur:1.0,fov:34,cut:true,cam:k=>{const a=BP('spine_03',1.6);return{pos:a.clone().addScaledVector(f,1.7-k*.15).add(V3(0,-.25+k*.06,0)),look:a.clone().add(V3(0,-.3,0))}},onStart:()=>hit()},
    /* 7. the face */
    {dur:1.9,fov:22,cut:true,cam:k=>{const a=BP('neck_01',1.9).add(V3(0,.17,0)).addScaledVector(f,.06);return{pos:a.clone().addScaledVector(f,1.15-k*.35).addScaledVector(r,.08),look:a}},onStart:()=>{hit('heart');try{e.m.actor.setBase('Idle_Loop',.2)}catch(x){}},update:(dt,k)=>{camera.fov=22-k*4;camera.updateProjectionMatrix()}},
    /* 8. pull out wide: colour floods back, the bolt, his name */
    {dur:2.6,fov:46,cut:true,cam:k=>{const e2=1-Math.pow(1-k,3);const a=BP('neck_01',1.9).add(V3(0,.17,0));const near=a.clone().addScaledVector(f,.7),far=V3(p.x,0,p.z).addScaledVector(f,9).addScaledVector(r,3).add(V3(0,2.6,0));return{pos:near.lerp(far,e2),look:V3(p.x,1.3-k*.2,p.z)}},
      onStart:()=>{x5Grey(0);xoFade(e.xo.L,false,.9);sx('riser',.7,null,{rate:.9});after(.35,()=>{xoKaenBolt(e,p);flash(headOf(p,1.2),0xc9a6ff,18);x5Impact(110,.1);x5Punch(12,.4);sx('impact',.8);ring(p,0xc9a6ff,1,12,.5);SP.emit(headOf(p,1.2),{n:90,c0:0xffffff,c1:0xc9a6ff,speed:10,life:.9,s0:.6,s1:.05});x5Banner('KAEN','MASTER OF ILLUSIONS','#c9a6ff',2.3)})}},
    {who:'@',text:XL3.mw_38,fov:36,cam:x4S(()=>P.pos,1,2.2,1.6),onStart:()=>{P.heroAnim='Idle_Talking_Loop'}},
    {who:'Kaen',text:XL3.fk_01,fov:34,cam:k=>({pos:headOf(p,1.6).add(V3(2.6-k*.4,0,.9)),look:headOf(p,1.55)}),onStart:()=>{P.heroAnim='Idle_Loop';try{e.m.actor.setBase('Idle_Talking_Loop',.3)}catch(x){}}},
    {who:'Kaen',text:XL3.kw_14,fov:38,cam:k=>({pos:headOf(kp(),1.2).add(V3(-2.6,.2,-1.4+k*.5)),look:headOf(kp(),1)}),onStart:()=>{x5Impact(70,.1);P.shake=.8;try{e.m.actor.setBase('Idle_Loop',.3)}catch(x){}try{KFW.a&&KFW.a.setBase('Crouch_Idle_Loop',.2)}catch(x){}},update:()=>{if(Math.random()<.5)SP.emit(headOf(kp(),1),{c0:0xffffff,c1:0xb070ff,s0:.4,s1:.04,life:.5,speed:3})}},
    {who:'@',text:XL3.mw_14,fov:38,cam:x4S(()=>P.pos,-1,2.2,1.7),onStart:()=>{P.heroAnim='Idle_Talking_Loop'}}];
  for(let q=0;q<8;q++){const c=SH[q].cam;SH[q].cam=k=>{pin();return c(k)}}
  playCutscene(SH,
    ()=>{x5Grey(0);xcFigOff();P.heroAnim=null;X4.cc=null;e.m.g.visible=true;xoSetGrey(e.xo.L,false);e.xo.grey=false;e.xo.t=rand(6,9);try{e.m.actor.setBase('Idle_Loop',.2)}catch(x){}e.m.g.scale.setScalar(1);e.invuln=false;e.busy=.8;bossRef=e;$('boss').classList.remove('hidden');XO.ph=1;XO.cmp=0;P.invuln=1.5;x5Punch(12,.4)})};
