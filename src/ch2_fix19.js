/* ---------- clash v3: gold fire vs red fire, white blast where they meet, big kinetic instruction that shrinks into place,
   a push-back surge when you are about to win (both thrown back 3m), harder overall, more reading time on easy/medium ---------- */
const FCD=()=>({easy:{p:.055,d:.15,i:3.3},medium:{p:.045,d:.19,i:2.8},hard:{p:.04,d:.22,i:1.8}}[DIFF]||{p:.045,d:.19,i:2.8});
(function(){const st=document.createElement('style');st.textContent=`
#xmFcK{position:fixed;left:50%;top:calc(24% + env(safe-area-inset-top,0px));z-index:41;pointer-events:none;text-align:center;white-space:nowrap;transform-origin:50% 0;
  transform:translate(-50%,0) scale(.2);opacity:0;font-family:'Bangers',Impact,'Arial Black',sans-serif;letter-spacing:.06em;line-height:.95;font-size:clamp(44px,9vw,112px);
  background:linear-gradient(180deg,#fffbe6 0%,#ffe27a 38%,#ffb21e 62%,#ff7a12 100%);-webkit-background-clip:text;background-clip:text;color:transparent;
  filter:drop-shadow(0 4px 0 #3a1400) drop-shadow(0 0 22px rgba(255,190,60,.75));transition:transform .45s cubic-bezier(.2,1.6,.4,1),opacity .3s}
#xmFcK small{display:block;font-size:.34em;letter-spacing:.14em;margin-top:.15em}
#xmFcK.red{background:linear-gradient(180deg,#fff0e6 0%,#ff8a6a 35%,#ff2a10 65%,#8a0600 100%);-webkit-background-clip:text;background-clip:text;filter:drop-shadow(0 4px 0 #2a0000) drop-shadow(0 0 24px rgba(255,40,10,.85))}
#xmFcK.on{opacity:1;transform:translate(-50%,0) scale(1);animation:xmKs .09s steps(2) infinite}
#xmFcK.mini{opacity:0;transform:translate(-50%,0) scale(.22);transition:transform .55s cubic-bezier(.6,0,.3,1),opacity .25s .35s;animation:none}
#xmFcK.out{opacity:0;transform:translate(-50%,-30px) scale(1.5);transition:transform .7s ease-out,opacity .7s;animation:none}
@keyframes xmKs{0%{margin-left:-3px;margin-top:2px}50%{margin-left:3px;margin-top:-2px}}
#xmFcS.surge{border-color:rgba(255,80,40,.7);box-shadow:0 0 26px rgba(255,60,20,.55)}#xmFcS.surge b{color:#ff7a5a}
#xmFcF{position:fixed;inset:0;z-index:39;pointer-events:none;opacity:0;transition:opacity .5s;background:radial-gradient(circle at 50% 50%,rgba(255,255,255,.0) 30%,rgba(255,200,80,.0) 60%,rgba(0,0,0,.0))}
#xmFcF.gold{opacity:1;transition:none;background:radial-gradient(circle,rgba(255,250,220,.85),rgba(255,190,40,.45) 45%,rgba(255,140,0,0) 80%)}
#xmFcF.red{opacity:1;transition:none;background:radial-gradient(circle,rgba(255,230,220,.8),rgba(255,40,10,.5) 45%,rgba(120,0,0,0) 80%)}`;document.head.appendChild(st)})();
function xmFcKin(html,cls,hold,end){let d=document.getElementById('xmFcK');if(!d){d=document.createElement('div');d.id='xmFcK';document.body.appendChild(d)}
  clearTimeout(d._t);d.className='';d.classList.toggle('red',cls==='red');d.innerHTML=html;void d.offsetWidth;d.classList.add('on');
  if(hold!=null)d._t=setTimeout(()=>{d.classList.remove('on');d.classList.add(end||'mini')},hold*1000)}
function xmFcKinOff(end){const d=document.getElementById('xmFcK');if(!d)return;clearTimeout(d._t);d.classList.remove('on');d.classList.add(end||'mini')}
function xmFcFlash(c){let f=document.getElementById('xmFcF');if(!f){f=document.createElement('div');f.id='xmFcF';document.body.appendChild(f)}f.className=c;void f.offsetWidth;setTimeout(()=>f.className='',60)}
function xmFcPill(surge){const d=xmFcUI(),touch=typeof isTouch!=='undefined'&&isTouch;d.classList.toggle('surge',!!surge);
  d.innerHTML=surge?(touch?'She is pushing back! Tap <b>FASTER</b>':'She is pushing back! Tap <b>SPACE</b> faster'):(touch?'Keep tapping the screen, <b>fast</b>, to push her back':'Keep tapping <b>SPACE</b>, fast, to push her back');d.appendChild(document.createElement('i'))}
const xmFcTap=()=>(typeof isTouch!=='undefined'&&isTouch)?'TAP FAST!':'TAP SPACE FAST!';

xmFcStart=function(m){const mp=P.pos.clone();mp.y=groundAt(mp.x,mp.z);P.flying=false;P.vy=0;m.ai.fly=null;if(m.m.broom)m.m.broom.visible=false;m.pos.y=groundAt(m.pos.x,m.pos.z);m.invuln=true;m.busy=99;
  for(const q of eProjs)scene.remove(q.s);eProjs.length=0;
  const mk=(col,op,r,bl)=>{const b=new THREE.Mesh(new THREE.CylinderGeometry(r,r,1,16,1,true),new THREE.MeshBasicMaterial({color:col,transparent:true,opacity:op,blending:bl||THREE.AdditiveBlending,depthWrite:false,side:THREE.DoubleSide,fog:false}));b.visible=false;scene.add(b);return b};
  /* yours: pure gold fire. hers: red fire with a dark ember shell */
  const gold=[mk(0xfff6c8,1,.16),mk(0xffc21a,.85,.34),mk(0xffa000,.35,.52)],red=[mk(0xffb0a0,.9,.15),mk(0xff2208,.85,.34),mk(0x3a0000,.45,.55,THREE.NormalBlending)];
  const orb=glowSprite(0xffffff,7,1,false),og=glowSprite(0xffc020,5,.9,false),or=glowSprite(0xff2a10,5,.9,false);scene.add(orb,og,or);
  const bolts=[];for(let i=0;i<4;i++){const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.BufferAttribute(new Float32Array(7*3),3));const l=new THREE.Line(g,new THREE.LineBasicMaterial({color:i%2?0xffffff:0xfff0a0,transparent:true,opacity:.9,blending:THREE.AdditiveBlending,depthWrite:false,fog:false}));scene.add(l);bolts.push(l)}
  const D=FCD();const C={t:0,live:0,k:.5,m,mp,gold,red,b:[...gold,...red],orb,og,or,bolts,intro:D.i,intro0:D.i,skyT:2.4,fl:0,rf:0,sg:0,sgT:0,sl:0,rT:0};XO.fc=C;CS.speed=1;
  P.heroAnim='Spell_Simple_Idle_Loop';try{m.m.actor.setBase('Idle_Loop',.1);m.m.actor.fire('Spell_Simple_Shoot',.2)}catch(x){}
  sx('dcharge',1);xmFs(.8,.8);x5Impact(80,.08);x5Punch(10,.4);x5Say('@','mw_35',1);
  const d=xmFcUI();xmFcPill(false);d.style.display='';d.classList.remove('on');try{xmMash(false)}catch(x){}
  xmFcKin(xmFcTap()+'<small>push her back</small>',null,null)};

xmFcPush=function(){const C=XO.fc;if(!C)return;const D=FCD();if(C.intro>0)C.k=Math.min(.6,C.k+D.p*.5);else C.k+=D.p;C.fl=1;x5Punch(2.4,.08);
  if(C.M)SP.emit(C.M,{n:10,c0:0xffffff,c1:0xffc020,speed:9,life:.35,s0:.35,s1:.03});
  const d=document.getElementById('xmFcS');if(d){d.classList.add('hit');clearTimeout(d._h);d._h=setTimeout(()=>d.classList.remove('hit'),80)}};

function xmFcRing(at,col,dir,to,dur){const r=new THREE.Mesh(new THREE.RingGeometry(.8,1,40),new THREE.MeshBasicMaterial({color:col,transparent:true,side:THREE.DoubleSide,depthWrite:false,blending:THREE.AdditiveBlending,fog:false}));r.position.copy(at);r.quaternion.setFromUnitVectors(V3(0,0,1),dir);r.scale.setScalar(.2);addFx(r,dur,(f,k)=>{r.scale.setScalar(lerp(.2,to,1-Math.pow(1-k,2)));r.material.opacity=1-k})}
function xmFcInB(x,z){const B=XO.B;return x>B.x0+2.5&&x<B.x1-2.5&&z>B.z0+2.5&&z<B.z1-2.5}
function xmFcSurge(C){const m=C.m;C.sg=1;C.sgT=.6;C.sl=.7;C.rf=1;
  const v=V3(m.pos.x-C.mp.x,0,m.pos.z-C.mp.z);if(v.lengthSq()<.01)v.set(1,0,0);v.normalize();
  let pT=V3(C.mp.x-v.x*3,0,C.mp.z-v.z*3),mT=V3(m.pos.x+v.x*3,0,m.pos.z+v.z*3);
  if(!xmFcInB(pT.x,pT.z)){pT=V3(C.mp.x,0,C.mp.z);mT=V3(m.pos.x+v.x*6,0,m.pos.z+v.z*6)}
  else if(!xmFcInB(mT.x,mT.z)){mT=V3(m.pos.x,0,m.pos.z);pT=V3(C.mp.x-v.x*6,0,C.mp.z-v.z*6)}
  const B=XO.B,cl=p=>{p.x=clamp(p.x,B.x0+2.5,B.x1-2.5);p.z=clamp(p.z,B.z0+2.5,B.z1-2.5);return p};C.pT=cl(pT);C.mT=cl(mT);
  const M=C.M||eCenter(m);flash(M,0xffffff,36);x5Impact(150,.16);x5Punch(20,.6);P.shake=Math.max(P.shake,1.6);sx('impact',1,null,{rate:.7});xmFcFlash('red');
  ring(V3(M.x,groundAt(M.x,M.z)+.1,M.z),0xffffff,1,18,.6);ring(V3(M.x,groundAt(M.x,M.z)+.1,M.z),0xff2a10,1,12,.5);
  SP.emit(M,{n:120,c0:0xffffff,c1:0xff3010,speed:16,life:.8,s0:.6,s1:.05});
  for(const p of[C.mp,m.pos])SM.emit(V3(p.x,groundAt(p.x,p.z)+.3,p.z),{c0:0x6a5a50,c1:0,s0:.8,s1:2.4,life:.9,a:.5});
  xmFcKin('SHE PUSHES BACK!<small>'+((typeof isTouch!=='undefined'&&isTouch)?'tap faster!':'tap SPACE faster!')+'</small>','red',1.6);xmFcPill(true)}

xmFcTick=function(dt){const C=XO.fc,m=C.m;if(!m||m.dead||!P.alive){xmFcEnd(false);return}const D=FCD();C.t+=dt;
  if(C.intro>0){C.intro-=dt;C.k=Math.max(.5,C.k-dt*.05);if(C.intro<=0){xmFcKinOff('mini');const d=xmFcUI();requestAnimationFrame(()=>d.classList.add('on'))}}
  else{C.live+=dt;C.k-=dt*D.d*(C.sg?1.18:1);C.skyT-=dt;if(C.skyT<=0){C.skyT=2.6;xmSky(m,3,0xff3a1a,'','#ff5a3a',2.2,14)}
    if(!C.sg&&C.k>=.8)xmFcSurge(C)}
  if(C.sgT>0){C.sgT-=dt;C.k-=dt*.5}
  if(C.sl>0){C.sl-=dt;const a=Math.min(1,dt*7);C.mp.x+=(C.pT.x-C.mp.x)*a;C.mp.z+=(C.pT.z-C.mp.z)*a;C.mp.y=groundAt(C.mp.x,C.mp.z);m.pos.x+=(C.mT.x-m.pos.x)*a;m.pos.z+=(C.mT.z-m.pos.z)*a;m.pos.y=groundAt(m.pos.x,m.pos.z);
    if(Math.random()<.6)for(const p of[C.mp,m.pos])SM.emit(V3(p.x+rand(-.3,.3),p.y+.15,p.z+rand(-.3,.3)),{c0:0x5a4a40,c1:0,s0:.4,s1:1.4,life:.6,a:.45})}
  P.pos.x=C.mp.x;P.pos.z=C.mp.z;P.pos.y=C.mp.y;P.vy=0;P.face=Math.atan2(m.pos.x-P.pos.x,m.pos.z-P.pos.z);m.m.g.rotation.y=P.face+Math.PI;
  const grow=Math.min(1,(C.intro0-Math.max(0,C.intro))/1.6),A=headOf(P.pos,1.3),Bp=xmTip(m),M=A.clone().lerp(Bp,clamp(C.k,.06,.94));C.M=M;
  C.fl=Math.max(0,C.fl-dt*6);C.rf=Math.max(0,C.rf-dt*1.6);const up=V3(0,1,0);
  const put=(b,a,c,w0)=>{const v=c.clone().sub(a),L=v.length()||.01;b.visible=true;b.position.copy(a).addScaledVector(v,.5);b.quaternion.setFromUnitVectors(up,v.normalize());const w=w0*grow*(1+Math.sin(time*42+w0*7)*.14+Math.random()*.06);b.scale.set(w,L,w)};
  const gw=1+C.fl*.35+(C.k-.5)*.5,rw=1+C.rf*.6+(.5-C.k)*.5;for(const b of C.gold)put(b,A,M,gw);for(const b of C.red)put(b,Bp,M,rw);
  const pul=(1+Math.sin(time*34)*.18+Math.random()*.15)*(.35+.65*grow);C.orb.position.copy(M);C.orb.scale.setScalar((7+C.fl*2+C.rf*4)*pul);
  const dir=Bp.clone().sub(A).normalize();C.og.position.copy(M).addScaledVector(dir,-.35);C.or.position.copy(M).addScaledVector(dir,.35);C.og.scale.setScalar(5.5*pul*(.8+C.k*.6));C.or.scale.setScalar(5.5*pul*(1.4-C.k*.6));
  /* crackling white lightning around the meeting point */
  for(const l of C.bolts){const a=l.geometry.attributes.position,th=Math.random()*TAU,ph=rand(-1,1),R=rand(.9,1.8)*grow,e=V3(Math.cos(th)*R,ph*R*.8,Math.sin(th)*R);
    for(let i=0;i<7;i++){const k=i/6,j=i&&i<6?.28:0;a.setXYZ(i,M.x+e.x*k+rand(-j,j),M.y+e.y*k+rand(-j,j),M.z+e.z*k+rand(-j,j))}a.needsUpdate=true;l.visible=Math.random()<.75&&grow>.3}
  if(grow>.2){FL.emit(M,{n:3,c0:0xffffff,c1:Math.random()<.5?0xffc020:0xff2a10,s0:.7,s1:.05,life:.4,speed:10});
    if(Math.random()<.5)FL.emit(A.clone().lerp(M,Math.random()),{n:1,c0:0xfff0b0,c1:0xffa000,s0:.4,s1:.05,life:.35,speed:2});
    if(Math.random()<.5)FL.emit(Bp.clone().lerp(M,Math.random()),{n:1,c0:0xff9070,c1:0xd01000,s0:.4,s1:.05,life:.35,speed:2});
    if(Math.random()<.35)SM.emit(Bp.clone().lerp(M,Math.random()),{c0:0x200404,c1:0,s0:.4,s1:1.2,life:.5,a:.45});
    C.rT-=dt;if(C.rT<=0){C.rT=.3;xmFcRing(M,Math.random()<.5?0xffffff:0xffe080,dir,2.6+C.fl*1.5,.3)}}
  P.shake=Math.max(P.shake,.3+.25*grow);
  if(C.k>=1)xmFcEnd(true);else if(C.k<=0||C.live>11)xmFcEnd(false)};

xmFcEnd=function(win){const C=XO.fc;if(!C)return;XO.fc=null;const d=xmFcUI();d.classList.remove('on','surge');try{xmMash(false)}catch(x){}
  for(const b of C.b){scene.remove(b);b.geometry.dispose()}for(const l of C.bolts){scene.remove(l);l.geometry.dispose()}scene.remove(C.orb,C.og,C.or);P.heroAnim=null;
  const m=C.m;XO.fc2=rand(32,46);if(!m||m.dead){xmFcKinOff('out');return}m.invuln=false;const M=C.M||eCenter(m);
  if(win){const c=eCenter(m);lbBoom(c,0xffc020,true);flash(c,0xffd040,40);x5Impact(200,.28);x5Punch(26,.8);P.shake=1.8;sx('impact',1,null,{rate:.8});xmFcFlash('gold');
    for(const r of[[0xffffff,24,.5],[0xffc020,18,.8],[0xffa000,11,1]])ring(V3(c.x,groundAt(c.x,c.z)+.1,c.z),r[0],1,r[1],r[2]);
    SP.emit(c,{n:220,c0:0xffffff,c1:0xffc020,speed:18,life:1.1,s0:.8,s1:.05});SP.emit(M,{n:90,c0:0xfff6c8,c1:0xffa000,speed:12,life:.8,s0:.6,s1:.05});
    xmFcKin('BLASTED BACK!','gold',1.2,'out');
    const v=V3(m.pos.x-P.pos.x,0,m.pos.z-P.pos.z);if(v.lengthSq()<.01)v.set(1,0,0);v.normalize();const B=XO.B;m.pos.x=clamp(m.pos.x+v.x*7,B.x0+3,B.x1-3);m.pos.z=clamp(m.pos.z+v.z*7,B.z0+3,B.z1-3);m.pos.y=groundAt(m.pos.x,m.pos.z);
    SM.emit(V3(m.pos.x,m.pos.y+.3,m.pos.z),{c0:0x6a5a50,c1:0,s0:1,s1:3,life:1,a:.5});
    const cut=m.maxhp*.1;m.hp=Math.max(m.maxhp*(m.hpFloor||0)+1,m.hp-cut);floatText(headOf(m.pos,2.8),'-10%','#ffd060',true);m.busy=2.4;m.stun=Math.max(m.stun||0,2.4);P.invuln=Math.max(P.invuln,1.2);return}
  m.busy=.6;flash(headOf(P.pos,1),0xff3010,36);fireBurst(headOf(P.pos,.6),5,true);P.shake=2;x5Impact(180,.24);x5Punch(24,.7);sx('impact',1,null,{rate:.6});xmFcFlash('red');
  for(const r of[[0xffffff,16,.4],[0xff2a10,20,.8]])ring(V3(P.pos.x,groundAt(P.pos.x,P.pos.z)+.1,P.pos.z),r[0],1,r[1],r[2]);SP.emit(M,{n:160,c0:0xffffff,c1:0xff2a10,speed:16,life:1,s0:.7,s1:.05});
  xmFcKin('OVERPOWERED!','red',1.2,'out');x5Say('The Crown, wearing Maëlle','mm_12',1);
  {const v=V3(P.pos.x-m.pos.x,0,P.pos.z-m.pos.z);if(v.lengthSq()<.01)v.set(1,0,0);v.normalize();const B=XO.B;P.pos.x=clamp(P.pos.x+v.x*4,B.x0+2.5,B.x1-2.5);P.pos.z=clamp(P.pos.z+v.z*4,B.z0+2.5,B.z1-2.5);P.pos.y=groundAt(P.pos.x,P.pos.z)}
  P.invuln=0;const dmg=1000;P.hp-=dmg;floatText(headOf(P.pos,2.2),'-'+dmg,'#ff4020',true);if(P.hp<=0){P.hp=1;damagePlayer(1e6)}m.hp=Math.min(m.maxhp,m.hp+m.maxhp*.08)};
