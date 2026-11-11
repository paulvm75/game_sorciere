/* ================= XVIII · the Drowned Bell: every toll rewinds six seconds and leaves an echo of you behind ================= */
const MBL={e:null,t:0,rec:[],echo:[],rw:0,rwPath:null,ph:1,tolls:0,ring:null,max:5,orb:null,dmgK:1,said:{},kd:0,lh:0,hands:[]};
const MBOK=new Set(['bolt','fire','lance','frost','chains','chain','meteor','void']);
function mbVerd(){const c=sbCanvas(256,256,(x,w,h)=>{x.fillStyle='#6a4a26';x.fillRect(0,0,w,h);for(let i=0;i<70;i++){const cx=Math.random()*w,cy=Math.random()*h,r=6+Math.random()*30;const g=x.createRadialGradient(cx,cy,0,cx,cy,r);g.addColorStop(0,'rgba(70,170,140,.8)');g.addColorStop(1,'rgba(70,170,140,0)');x.fillStyle=g;x.fillRect(cx-r,cy-r,r*2,r*2)}
  for(let i=0;i<5;i++){x.fillStyle='rgba(30,18,8,.6)';x.fillRect(0,40+i*40,w,3)}});return c}
function mbCracks(){const c=sbCanvas(256,256,(x,w,h)=>{x.fillStyle='#000';x.fillRect(0,0,w,h);x.strokeStyle='#40ffd0';x.lineCap='round';for(let i=0;i<9;i++){let px=Math.random()*w,py=h;x.lineWidth=2+Math.random()*3;x.beginPath();x.moveTo(px,py);for(let k=0;k<9;k++){px+=(Math.random()-.5)*40;py-=18+Math.random()*16;x.lineTo(px,py)}x.stroke()}});return c}
function buildBell(){const g=new THREE.Group(),body=new THREE.Group();g.add(body);
  const prof=[[3.05,0],[3.15,.22],[2.85,.55],[2.3,1.5],[2.02,2.7],[1.95,3.5],[1.75,4.1],[1.05,4.5],[0,4.62]].map(q=>new THREE.Vector2(q[0],q[1]));
  const vt=mbVerd();vt.repeat.set(3,1);const ct=mbCracks();ct.repeat.set(3,1);
  const mat=std({map:vt,color:0xe8c090,metalness:.75,roughness:.34,emissive:0xffffff,emissiveMap:ct,emissiveIntensity:.3,side:THREE.DoubleSide,envMapIntensity:1.4});
  const bell=new THREE.Mesh(new THREE.LatheGeometry(prof,48),mat);bell.castShadow=true;body.add(bell);
  const lip=new THREE.Mesh(new THREE.TorusGeometry(3.1,.16,8,48),mat);lip.rotation.x=Math.PI/2;lip.position.y=.12;body.add(lip);
  for(const y of [1.5,3.6]){const b=new THREE.Mesh(new THREE.TorusGeometry(y<2?2.32:1.85,.07,6,40),mat);b.rotation.x=Math.PI/2;b.position.y=y;body.add(b)}
  const yoke=new THREE.Mesh(new THREE.BoxGeometry(2.4,.6,.9),std({color:0x2a1e14,roughness:.8}));yoke.position.y=4.9;body.add(yoke);
  /* inside: the Crown's smoke, a cold heart, the clapper */
  const inner=glowSprite(0x40ffd0,6,.55);inner.position.y=1.6;body.add(inner);const dark=new THREE.Mesh(new THREE.CircleGeometry(2.9,32),new THREE.MeshBasicMaterial({color:0x020806,side:THREE.DoubleSide}));dark.rotation.x=Math.PI/2;dark.position.y=.35;body.add(dark);
  const clap=new THREE.Group();clap.position.y=4.2;body.add(clap);const rod=new THREE.Mesh(new THREE.CylinderGeometry(.08,.08,3.6,6),std({color:0x2a2018,metalness:.6}));rod.position.y=-1.8;clap.add(rod);const ball=new THREE.Mesh(new THREE.SphereGeometry(.42,12,10),std({color:0x3a2a1a,metalness:.7,roughness:.4}));ball.position.y=-3.7;clap.add(ball);
  /* chains up into the vault */
  const chm=std({color:0x3a342c,metalness:.8,roughness:.4});for(const s of[-1,1]){const ch=new THREE.Mesh(new THREE.CylinderGeometry(.09,.09,7,5),chm);ch.position.set(s*1,8.6,0);ch.rotation.z=s*-.06;g.add(ch);for(let i=0;i<10;i++){const l=new THREE.Mesh(new THREE.TorusGeometry(.18,.05,4,8),chm);l.position.set(s*1-s*i*.04,5.4+i*.7,0);l.rotation.y=i%2?Math.PI/2:0;g.add(l)}}
  return{g,body,bell,mat,inner,clap,anim:(e,dt)=>{e.t+=dt;const sw=MBL.swing||0;MBL.swing=sw*Math.pow(.25,dt);body.rotation.z=Math.sin(e.t*.8)*.035+Math.sin(e.t*3.1)*sw*.18;body.rotation.x=Math.cos(e.t*.6)*.025;clap.rotation.z=-body.rotation.z*1.6;
    const hpk=1-e.hp/e.maxhp;mat.emissiveIntensity=.3+hpk*1.1+(e.flash>0?.8:0)+Math.max(0,Math.sin(e.t*9))*hpk*.25;inner.material.opacity=.4+Math.sin(e.t*4)*.12+hpk*.3;
    if(Math.random()<.35)SM.emit(V3(e.pos.x+rand(-2,2),e.pos.y+.4,e.pos.z+rand(-2,2)),{n:1,c0:0x2a5a50,c1:0x020806,s0:.8,s1:2.4,life:1.6,a:.45,up:-.6})}}}
ETYPES.mbell={name:'The Drowned Bell',boss:true,hp:7400,speed:0,dmg:0,range:0,cd:99,xp:7000,r:3.1,h:5,fly:1,ghost:true,noCalm:true,build:buildBell};
{const _bw=bmWant;bmWant=function(){if(started&&MODE!=='open'&&bossRef&&!bossRef.dead&&bossRef.type==='mbell'){bmTrack('mus_b_bell');return null}return _bw.apply(this,arguments)}}

/* ---------- echoes: a ghost of you, replaying the last six seconds forever ---------- */
function mbGhostMat(red){return new THREE.MeshBasicMaterial({color:red?0xff3a3a:0x9ae8ff,transparent:true,opacity:red?.5:.38,blending:THREE.AdditiveBlending,depthWrite:false,skinning:true})}
function mbEchoMake(red){let m=null;try{m=buildMirror()}catch(x){}if(!m||!m.actor)return null;const gm=mbGhostMat(red);m.g.traverse(o=>{if(o.isMesh||o.isSkinnedMesh){o.material=o.isSkinnedMesh?gm:new THREE.MeshBasicMaterial({color:red?0xff5050:0xc8f4ff,transparent:true,opacity:.35,blending:THREE.AdditiveBlending,depthWrite:false});o.castShadow=false}else if(o.isSprite){o.material=o.material.clone();o.material.color.setHex(red?0xff4040:0x9ae8ff)}});
  const gl=glowSprite(red?0xff3030:0x80e0ff,3.2,.35);gl.position.y=1.1;m.g.add(gl);m.g.userData.mtK=1;scene.add(m.g);return{a:m.actor,g:m.g,gm,red}}
function mbEchoSpawn(clip,red){if(!clip||clip.length<6)return;const ech=mbEchoMake(red);if(!ech)return;const t0=clip[0].t;ech.clip=clip.map(s=>Object.assign({},s,{t:s.t-t0}));ech.dur=Math.max(.5,ech.clip[ech.clip.length-1].t);ech.t=0;ech.i=0;ech.loops=0;ech.born=0;ech.an='';
  MBL.echo.push(ech);const good=MBL.echo.filter(q=>!q.red);while(good.length>MBL.max){const o=good.shift();mbEchoKill(o)}
  const p=ech.clip[0];flash(V3(p.x,p.y+1,p.z),red?0xff4040:0x9ae8ff,10);SP.emit(V3(p.x,p.y+1,p.z),{n:40,c0:0xffffff,c1:red?0xff3030:0x60d0ff,speed:5,life:.7,s0:.5,s1:.04});
  const n=MBL.echo.filter(q=>!q.red).length;mbEchoUI(n)}
function mbEchoKill(o){const i=MBL.echo.indexOf(o);if(i>=0)MBL.echo.splice(i,1);const p=o.g.position;SP.emit(V3(p.x,p.y+1,p.z),{n:30,c0:0xffffff,c1:o.red?0xff3030:0x60d0ff,speed:4,life:.6,s0:.4,s1:.03});scene.remove(o.g);mbEchoUI(MBL.echo.filter(q=>!q.red).length)}
function mbEchoTick(dt){for(const E of [...MBL.echo]){E.born=Math.min(1,E.born+dt*2);const prev=E.t;E.t+=dt;let wrapped=false;if(E.t>=E.dur){E.t-=E.dur;E.i=0;E.loops++;wrapped=true;if(E.red&&E.loops>=2){mbEchoKill(E);continue}
      const p=E.clip[0];SP.emit(V3(p.x,p.y+1,p.z),{n:14,c0:0xffffff,c1:E.red?0xff3030:0x60d0ff,speed:3,life:.4,s0:.3,s1:.03})}
    const C=E.clip;while(E.i<C.length-2&&C[E.i+1].t<=E.t)E.i++;const a=C[E.i],b=C[Math.min(E.i+1,C.length-1)],k=b.t>a.t?clamp((E.t-a.t)/(b.t-a.t),0,1):0;
    E.g.position.set(lerp(a.x,b.x,k),lerp(a.y,b.y,k),lerp(a.z,b.z,k));E.g.rotation.y=lerpAngle(a.f,b.f,k);E.face=E.g.rotation.y;E.gm.opacity=(E.red?.5:.38)*E.born*(.85+Math.sin(MBL.t*7+E.dur)*.15);
    const mv=a.mv||0,an=mv>9?'Sprint_Loop':mv>1.2?'Walk_Loop':'Idle_Loop';if(E.an!==an){E.an=an;try{E.a.setBase(an,.2)}catch(x){}}try{E.a.update(dt)}catch(x){}
    /* replay the casts that happened in this slice of time */
    for(const s of C){if(!s.c)continue;const hit=wrapped?(s.t>prev||s.t<=E.t):(s.t>prev&&s.t<=E.t);if(hit)for(const id of s.c)mbEchoCast(E,id)}
    if(Math.random()<.3)SP.emit(V3(E.g.position.x+rand(-.3,.3),E.g.position.y+rand(.2,1.8),E.g.position.z+rand(-.3,.3)),{c0:0xffffff,c1:E.red?0xff3030:0x60d0ff,s0:.25,s1:.02,life:.5,speed:.6})}}
function mbEchoCast(E,id){try{E.a.fire('Spell_Simple_Shoot',.35)}catch(x){}const o=headOf(E.g.position,1.45);
  if(E.red){const dir=V3(P.pos.x-o.x,P.pos.y+1.1-o.y,P.pos.z-o.z).normalize();enemyOrb(o,dir,21,x5Dmg(12),0xff4040,.34,{keepY:true});sx('laser',.22,null,{rate:1.4});return}
  const t=MBL.e&&!MBL.e.dead&&!MBL.e.invuln?MBL.e:null;if(!t||!MBOK.has(id)||!CAST[id])return;const sp=P.pos.clone(),sf=P.face,n0=projs.length;P.pos.copy(E.g.position);P.face=E.face;MBL.orb=o;MBL.dmgK=.5;
  try{CAST[id](t)}catch(x){}for(let i=n0;i<projs.length;i++){projs[i].dmg*=.5;projs[i].echo=1}P.pos.copy(sp);P.face=sf;MBL.orb=null;MBL.dmgK=1}
{const _o=orbPos;orbPos=function(){if(MBL.orb)return MBL.orb.clone();return _o.apply(this,arguments)}}
{const _de=damageEnemy;damageEnemy=function(e,amt){if(MBL.dmgK!==1&&e===MBL.e)arguments[1]=amt*MBL.dmgK;return _de.apply(this,arguments)}}
/* record what you do */
{const _tc=tryCast;tryCast=function(i){const s=SPELLS[i];const cd=s?P.cds[i]:1,mp=P.mp;const r=_tc.apply(this,arguments);if(MT.fight&&s&&cd<=0&&P.mp<mp&&MBL.rec.length){const L=MBL.rec[MBL.rec.length-1];(L.c||(L.c=[])).push(s.id)}return r}}
function mbRecTick(dt){const p=P.pos,L=MBL.rec[MBL.rec.length-1];const mv=L?Math.hypot(p.x-L.x,p.z-L.z)/Math.max(dt,.001):0;MBL.rec.push({t:MBL.t,x:p.x,y:p.y,z:p.z,f:P.face,mv});while(MBL.rec.length&&MBL.rec[0].t<MBL.t-6.2)MBL.rec.shift()}

/* ---------- UI: echo pips ---------- */
function mbEchoUI(n){let el=document.getElementById('mbEcho');if(!el){const st=document.createElement('style');st.textContent=`#mbEcho{position:fixed;left:50%;top:calc(86px + env(safe-area-inset-top,0px));transform:translateX(-50%);z-index:30;display:flex;gap:7px;align-items:center;pointer-events:none;font:600 12px Outfit,system-ui,sans-serif;letter-spacing:.14em;color:#bfefff;text-shadow:0 1px 3px #000;opacity:0;transition:opacity .4s}
#mbEcho.on{opacity:1}#mbEcho i{width:13px;height:13px;border-radius:50%;border:2px solid #7fd8ff;box-shadow:0 0 6px rgba(120,220,255,.5)}#mbEcho i.f{background:#bff0ff;box-shadow:0 0 12px #8fe4ff}
#mbRw{position:fixed;inset:0;z-index:28;pointer-events:none;opacity:0;background:radial-gradient(circle at 50% 50%,rgba(120,255,230,0) 30%,rgba(40,255,210,.28) 100%);mix-blend-mode:screen;transition:opacity .15s}`;document.head.appendChild(st);
  el=document.createElement('div');el.id='mbEcho';document.body.appendChild(el);const rw=document.createElement('div');rw.id='mbRw';document.body.appendChild(rw)}
  if(n<0){el.classList.remove('on');return}el.innerHTML='ECHOES '+Array.from({length:MBL.max},(_,i)=>`<i class="${i<n?'f':''}"></i>`).join('');el.classList.add('on')}

/* ---------- the toll: telegraph, shockwave, rewind ---------- */
function mbToll(e){const c=V3(e.pos.x,0,e.pos.z);MBL.tolls++;e.busy=2.6;MBL.swing=1.6;sx('riser',.55,null,{rate:1.4});flash(headOf(c,4),0x40ffd0,8);
  after(1.05,()=>{if(!MT.fight||e.dead)return;sx('toll',1,null,{wet:.7,duck:2});MBL.swing=3;P.shake=Math.max(P.shake,1);x5Punch(10,.5);x5Impact(90,0);flash(headOf(c,3),0x9affe8,20);ring(V3(c.x,Math.max(MT.cwl,0)+.08,c.z),0x9affe8,3,22,1.4);
    SP.emit(headOf(c,1),{n:90,c0:0xffffff,c1:0x40ffd0,speed:16,life:.9,s0:.6,s1:.05});MBL.ring={r:3.1,hit:false};if(MBL.tolls===2&&!MBL.said.t2){MBL.said.t2=1;msSay('ms_33')}
    after(1.75,()=>{if(MT.fight&&P.alive&&!e.dead)mbRewind()})})}
function mbRingTick(dt){const R=MBL.ring;if(!R)return;R.r+=dt*11.5;if(!R.m){R.m=new THREE.Mesh(new THREE.CylinderGeometry(1,1,1.9,72,1,true),new THREE.MeshBasicMaterial({color:0x8affe8,transparent:true,opacity:.55,blending:THREE.AdditiveBlending,side:THREE.DoubleSide,depthWrite:false}));R.m.userData.mtK=1;scene.add(R.m)}
  R.m.position.set(MTK.x,.95,MTK.z);R.m.scale.set(R.r,1,R.r);R.m.material.opacity=.55*(1-R.r/21);
  const d=Math.hypot(P.pos.x-MTK.x,P.pos.z-MTK.z);if(!R.hit&&Math.abs(d-R.r)<.85&&P.pos.y-groundAt(P.pos.x,P.pos.z)<.65&&P.alive&&MBL.rw<=0){R.hit=true;damagePlayer(x5Dmg(19));x5Punch(9,.3);P.shake=Math.max(P.shake,.7)}
  if(R.r>21){scene.remove(R.m);R.m.geometry.dispose();MBL.ring=null}}
function mbRewind(){const clip=MBL.rec.slice();if(clip.length<10)return;MBL.rw=.55;MBL.rwPath=clip;P.invuln=Math.max(P.invuln,.9);sx('rewind',.9,null,{wet:.3});const rw=document.getElementById('mbRw');if(rw)rw.style.opacity='1';
  renderer.domElement.style.filter='saturate(.35) hue-rotate(140deg) contrast(1.25)';for(const pp of eProjs)scene.remove(pp.s);eProjs.length=0;
  MBL.rwEnd=()=>{renderer.domElement.style.filter='';if(rw)rw.style.opacity='0';const s=clip[0];P.pos.set(s.x,s.y,s.z);P.face=s.f;P.vy=0;MBL.rec=[];const red=MBL.ph>=3;mbEchoSpawn(clip,red);
    if(!MBL.said.first){MBL.said.first=1;msSay('ms_27',1);after(4.6,()=>msSay('ms_28'));toast('Every toll sends you back six seconds and leaves an echo behind that repeats what you did. Fill those six seconds with spells.','Echoes',true)}
    if(red&&!MBL.said.red){MBL.said.red=1;msSay('ms_30',1);after(3.4,()=>msSay('ms_31'))}}}
{const _up=updatePlayer;updatePlayer=function(dt){if(MBL.rw>0){MBL.rw-=dt;const C=MBL.rwPath,k=clamp(1-MBL.rw/.55,0,1),idx=Math.round((1-k)*(C.length-1)),s=C[Math.max(0,idx)];P.pos.set(s.x,s.y,s.z);P.face=s.f;W.g.position.copy(P.pos);W.g.rotation.y=P.face;
    if(Math.random()<.9)SP.emit(headOf(P.pos,1),{n:3,c0:0xffffff,c1:0x40ffd0,s0:.5,s1:.04,life:.4,speed:1});if(W.ch)try{W.update(dt,{mv:0})}catch(x){}if(MBL.rw<=0&&MBL.rwEnd){const f=MBL.rwEnd;MBL.rwEnd=null;f()}return}return _up.apply(this,arguments)}}

/* ---------- the bell's other hands ---------- */
function mbHands(at){const p=V3(at.x,0,at.z);telegraph(V3(p.x,groundAt(p.x,p.z),p.z),2.7,1,0x40ffd0,()=>{if(!MT.fight)return;const y0=Math.max(MT.cwl,groundAt(p.x,p.z));sx('squelch',.8,null,{rate:.6});SP.emit(V3(p.x,y0+.2,p.z),{n:40,c0:0xc8fff0,c1:0x10604a,speed:7,up:6,grav:12,life:.8,s0:.5,s1:.05});
  const hm=std({color:0x081614,roughness:.4,emissive:0x0a3a30});for(let i=0;i<6;i++){const a=i/6*TAU,f=new THREE.Mesh(new THREE.ConeGeometry(.22,2.6,6),hm);f.position.set(p.x+Math.sin(a)*1.3,y0-1.2,p.z+Math.cos(a)*1.3);f.rotation.set(Math.cos(a)*-.5,0,Math.sin(a)*.5);
    addFx(f,1.1,(F,k)=>{f.position.y=y0-1.2+Math.sin(Math.min(1,k*2.2)*Math.PI*.5)*2.2-(k>.7?(k-.7)*7:0)})}
  if(playerIn(V3(p.x,y0,p.z),2.9,3.2)){damagePlayer(x5Dmg(23));P.shake=Math.max(P.shake,.6)}})}
function mbDebris(){for(let i=0;i<3;i++){const a=rand(0,TAU),r=i?rand(2,6):0;const p=V3(P.pos.x+Math.sin(a)*r,0,P.pos.z+Math.cos(a)*r);const dd=Math.hypot(p.x-MTK.x,p.z-MTK.z);if(dd>18)continue;
  telegraph(V3(p.x,groundAt(p.x,p.z),p.z),2.2,1.15,0xffa040,()=>{const rk=new THREE.Mesh(new THREE.DodecahedronGeometry(1,0),mtM(mtTex().granite,1,1,{color:0x6e665a}));const g0=groundAt(p.x,p.z);rk.position.set(p.x,g0+12,p.z);
    addFx(rk,.35,(F,k)=>{rk.position.y=g0+12-k*k*11.5;rk.rotation.x+=.2},()=>{scene.remove(rk);SP.emit(V3(p.x,g0+.5,p.z),{n:30,c0:0xd8c8a8,c1:0x3a3028,speed:8,up:4,grav:14,life:.8,s0:.5,s1:.1});sx('impact',.5);if(playerIn(V3(p.x,g0,p.z),2.3,3))damagePlayer(x5Dmg(21))})})}}
BOSSAI.mbell=function(e,dt,d){const a=e.ai;if(!MT.fight||MBL.rw>0)return;if(a.m0===undefined){a.m0=1;a.toll=7;a.hand=4;a.vol=6;a.deb=7;a.tn=16}
  const f=e.hp/e.maxhp;const ph=f>.66?1:f>.33?2:3;if(ph!==MBL.ph){mbPhase(ph);return}
  if(e.busy>0)return;a.toll-=dt;a.hand-=dt;a.vol-=dt;a.deb-=dt;a.tn-=dt;
  if(a.toll<=0){a.toll=MBL.ph===1?12:MBL.ph===2?10.5:9;mbToll(e);return}
  if(a.hand<=0){a.hand=MBL.ph===1?6.5:MBL.ph===2?5:4.2;mbHands(P.pos);if(MBL.ph===3)after(.6,()=>{if(MT.fight)mbHands(V3(P.pos.x+rand(-3,3),0,P.pos.z+rand(-3,3)))})}
  if(MBL.ph>=2&&a.vol<=0){a.vol=MBL.ph===2?4.6:3.8;const c=eCenter(e),dir=V3(P.pos.x-c.x,P.pos.y+1-c.y,P.pos.z-c.z).normalize();for(let k=-1;k<=1;k++){const o=k*.22,dd=V3(dir.x*Math.cos(o)-dir.z*Math.sin(o),dir.y,dir.x*Math.sin(o)+dir.z*Math.cos(o));enemyOrb(c,dd,18,x5Dmg(12),0x40ffd0,.34,{keepY:true})}sx('laser',.3,null,{rate:.9})}
  if(MBL.ph===3&&a.deb<=0){a.deb=6;mbDebris()}
  if(a.tn<=0){a.tn=rand(16,22);msSay(Math.random()<.5?'ms_34':'ms_33')}
  if(f<=.035&&!MBL.done){MBL.done=1;e.invuln=true;try{mtBellBreak()}catch(x){console.warn(x)}}}
function mbPhase(ph){const e=MBL.e;MBL.ph=ph;e.invuln=true;e.busy=3.2;after(3.2,()=>{if(MBL.e===e&&!MBL.done)e.invuln=false});MBL.swing=2;sx('skyshatter',.5,null,{rate:.7});P.shake=Math.max(P.shake,.8);
  MT.cwlT=ph===2?.95:1.48;sx('tide',.8,null,{rate:.8});for(const r of MBL.echo.filter(q=>!q.red))r.born=.4;
  if(ph===2){x5Banner('THE TIDE RISES','GET ONTO THE STEPS','#7dffd8',2.4,'#04140f');msSay('ms_29',1)}else{x5Banner('THE LAST STEP','THE ECHOES TURN','#ff7a6a',2.4,'#1a0404');msSay('ms_32',1)}
  e.ai.toll=Math.min(e.ai.toll,3.4)}

/* ---------- Kaen fights, Lyra keeps you standing ---------- */
const MBC={k:{cd:3,ang:2.2,an:''},l:{cd:6,an:''}};
function mbCmpTick(dt){const e=MBL.e;if(!e||e.dead)return;const K=KFW.a,L=LYR.a;const R=MBL.ph===1?7.4:MBL.ph===2?7:5.6;
  if(K){const c=MBC.k;c.cd-=dt;c.ang+=dt*.35;const tx=MTK.x+Math.sin(c.ang)*R,tz=MTK.z+Math.cos(c.ang)*R;const g=K.g.position;const dx=tx-g.x,dz=tz-g.z,dd=Math.hypot(dx,dz);
    if(c.dash>0){c.dash-=dt}else if(dd>.4){const s=Math.min(dd,dt*9);g.x+=dx/dd*s;g.z+=dz/dd*s;K.g.rotation.y=Math.atan2(dx,dz)}else K.g.rotation.y=Math.atan2(MTK.x-g.x,MTK.z-g.z);g.y=groundAt(g.x,g.z);
    const an=c.dash>0?'Sprint_Loop':dd>.6?'Sprint_Loop':'Idle_Loop';if(c.an!==an){c.an=an;try{K.setBase(an,.2)}catch(x){}}
    if(c.cd<=0&&!e.invuln&&MBL.rw<=0){c.cd=rand(2.8,3.8);c.dash=.35;const hp=V3(MTK.x+(g.x-MTK.x)*.55,0,MTK.z+(g.z-MTK.z)*.55);K.g.rotation.y=Math.atan2(MTK.x-g.x,MTK.z-g.z);try{K.fire('Melee_Hook',.42)}catch(x){}
      after(.18,()=>{if(!MT.fight||e.dead)return;const at=headOf(hp,2.4);kSwing(Math.random()<.4,.6);kHit(false,at,.55);damageEnemy(e,e.maxhp*.007,'#9ad8ff');MBL.swing=Math.max(MBL.swing||0,.5)})}}
  if(L){const c=MBC.l;c.cd-=dt;const sp=V3(MTK.x+1.6,0,MTK.z+23.4);L.g.position.set(sp.x,groundAt(sp.x,sp.z),sp.z);L.g.rotation.y=Math.atan2(P.pos.x-sp.x,P.pos.z-sp.z);if(c.an!=='cast'){c.an='cast';try{L.setBase('Spell_Simple_Idle_Loop',.3)}catch(x){}}
    if(c.cd<=0&&P.alive&&MBL.rw<=0){c.cd=rand(7,8.5);if(P.hp<maxHP()*.92){try{L.fire('Spell_Simple_Shoot',.4)}catch(x){}const A=headOf(L.g.position,1.4),B=headOf(P.pos,1.1);xoBeam(A,B,0xff9ab0,.5,.14);const h=Math.round(maxHP()*.07);P.hp=Math.min(maxHP(),P.hp+h);floatText(headOf(P.pos,2.2),'+'+h,'#ff9ab0');sx('powerup',.3,null,{rate:1.4});SP.emit(B,{n:20,c0:0xffffff,c1:0xff7090,speed:3,life:.6,s0:.4,s1:.04})}}}}

/* ---------- start / reset / clear ---------- */
function mtBellSpawn(){if(MBL.e&&!MBL.e.dead)return MBL.e;const e=spawnEnemy('mbell',V3(MTK.x,0,MTK.z));e.pos.y=3.2;e.aggro=true;e.invuln=true;e.busy=99;e.hpFloor=.03;MBL.e=e;e.m.g.userData.mtK=1;return e}
function mtBossStart(){const e=mtBellSpawn();MT.fight=1;Object.assign(MBL,{t:0,rec:[],rw:0,ph:1,tolls:0,ring:null,said:MBL.said||{},done:0});e.invuln=false;e.busy=0;e.ai={};MT.cwlT=.25;KFW.pin=1;LYR.pin=1;MBC.k.cd=3;MBC.l.cd=6;
  bossRef=e;$('boss').classList.remove('hidden');$('bossName').innerHTML='The Drowned Bell <span style="color:#7dffd8">· the Crown is inside</span>';mbEchoUI(0);bmTrack('mus_pull');bmTrack('mus_brass')}
function mtBossClear(){MT.fight=0;for(const E of [...MBL.echo])mbEchoKill(E);MBL.echo=[];MBL.rec=[];MBL.rw=0;MBL.rwEnd=null;if(MBL.ring&&MBL.ring.m)scene.remove(MBL.ring.m);MBL.ring=null;mbEchoUI(-1);renderer.domElement.style.filter='';if(MBL.e&&!MBL.e.dead)removeEnemy(MBL.e);MBL.e=null;KFW.pin=0;LYR.pin=0}
function mtBossReset(){mtBossClear();MT.cwlT=-.3;MT.cwl=-.3;MBL.said.first=1;after(1.2,()=>{if(CH2.zone==='mont'&&MT.area==='crypt'&&CH2.st===32){mtBellSpawn();after(1.5,()=>{if(CH2.zone==='mont'&&MT.area==='crypt')mtBossStart()})}})}
{const _mt=muTick;muTick=function(dt){_mt(dt);if(!mtX()||CH2.zone!=='mont'||!MT.fight)return;dt=Math.min(dt,.05);if(CS.active)return;MBL.t+=dt;if(MBL.rw<=0)mbRecTick(dt);mbEchoTick(dt);mbRingTick(dt);mbCmpTick(dt);
  /* deep water hurts */
  const g=groundAt(P.pos.x,P.pos.z),dep=MT.cwl-g;if(dep>.42&&P.alive&&MBL.rw<=0){P.chilled=Math.max(P.chilled,.25);MBL.wd=(MBL.wd||0)-dt;if(MBL.wd<=0){MBL.wd=.5;damagePlayer(maxHP()*.022)}if(Math.random()<.4)SP.emit(V3(P.pos.x,MT.cwl+.05,P.pos.z),{c0:0xc8fff0,c1:0x10604a,s0:.3,s1:.04,life:.5,speed:2,up:2,grav:6});if(!MBL.said['w'+MBL.ph]){MBL.said['w'+MBL.ph]=1;toast('The cursed water burns. Get higher, onto the steps.','The crypt',false)}}}}
{const _cr=csSpeakerRoots;csSpeakerRoots=function(who){if(who==='The Drowned Bell'&&MBL.e&&MBL.e.m)return [MBL.e.m.g];if(who==='Morwen'&&typeof MW!=='undefined'&&MW.a)return [MW.a.g];return _cr.apply(this,arguments)}}

/* ---------- the reveal ---------- */
function mtCryptReveal(){const e=mtBellSpawn();bossRef=null;$('boss').classList.add('hidden');const c=V3(MTK.x,0,15.5);mtStage(c,Math.PI,[1.2,1.8],[1.2,-1.8]);const bc=V3(MTK.x,5.4,MTK.z);
  playCutscene([{dur:3.6,fov:44,cut:true,cam:k=>({pos:V3(MTK.x+3-k*2,1.4+k*1.2,20.5-k*2),look:V3(MTK.x,4+k,MTK.z)}),onStart:()=>{P.heroAnim='Walk_Loop';sx('chan',.5,null,{rate:.5});MT.cwlT=.25}},
    mtLine('ms_23',{onStart:()=>{P.heroAnim='Idle_Loop';x4Talk('Kaen')}}),mtLine('ms_24'),
    {who:'The Drowned Bell',text:XL8.ms_25,fov:34,keepCam:true,cam:k=>({pos:V3(MTK.x+1.5,3+k*.6,MTK.z+9-k*1.2),look:bc}),onStart:()=>{x4Talk('');MBL.swing=1;sx('toll',.45,null,{rate:1.25,wet:.8});flash(bc,0x40ffd0,10)}},
    mtLine('ms_26')],
    ()=>{mtEnd();x5Banner('THE DROWNED BELL','EVERY TOLL TAKES SIX SECONDS BACK','#7dffd8',2.8,'#04140f');after(.6,mtBossStart)})}
