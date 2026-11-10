
/* =====================================================================================
   XV part two · GOG AND MAGOG, guardians of the Crown
   phase 1: Maëlle against Magog while Kaen holds Gog · the body switch · phase 2: you ARE Kaen against Gog
   the switch back · phase 3: Maëlle alone finishes both
   ===================================================================================== */
const XG={ph:0,gog:null,mag:null,seen:0,t:0,duel:{t:0,kt:1.5,gt:3,ang:0},lt:4,jt:16,ward:null,chain:null,oldC:null,mb:6};
const HC=()=>uP(0,178);
function buildCrownGuard(kind){const gog=kind==='gog',s=gog?2.15:1.75;const m=buildGargoyle(s);const tint=new THREE.Color(gog?0x2e3a32:0xb4aed0),em=gog?0x0c3010:0x241050,wg=nzWingGeo(),mats=new Map();
  m.g.traverse(o=>{if(o.isSprite){o.material=o.material.clone();o.material.color.setHex(gog?0x9dff70:0xc8a8ff)}else if(o.isMesh&&o.material&&o.material.color){let c=mats.get(o.material);if(!c){c=o.material.clone();c.color.lerp(tint,.78);if(c.emissive)c.emissive.setHex(em);c.roughness=.85;mats.set(o.material,c)}o.material=c;if(gog&&o.geometry===wg)o.visible=false}});
  const gold=std({color:0xd8b040,roughness:.35,metalness:.9,emissive:gog?0x183a08:0x30186a,emissiveIntensity:1});const cr=new THREE.Group();cr.position.set(0,3.1*s,.18*s);m.body.add(cr);
  const tr=new THREE.Mesh(new THREE.TorusGeometry(.3*s,.05*s,6,18),gold);tr.rotation.x=Math.PI/2;cr.add(tr);for(let k=0;k<6;k++){const c=new THREE.Mesh(new THREE.ConeGeometry(.06*s,.26*s,4),gold);const a=k/6*TAU;c.position.set(Math.cos(a)*.3*s,.13*s,Math.sin(a)*.3*s);cr.add(c)}
  const cg=glowSprite(gog?0x9dff70:0xc8a8ff,2.2*s,.4);cr.add(cg);const st=std({color:gog?0x222a26:0x8a86a8,roughness:.9}),ex=[];
  if(gog){for(const q of[-1,1]){const p=new THREE.Mesh(new THREE.BoxGeometry(.6*s,.34*s,.7*s),st);p.position.set(q*.78*s,2.42*s,0);p.rotation.z=q*-.3;m.body.add(p);const f=new THREE.Mesh(new THREE.DodecahedronGeometry(.34*s,0),st);f.position.set(q*.86*s,1.02*s,.42*s);m.body.add(f)}
    const cm=new THREE.MeshBasicMaterial({color:0x9dff70});for(let k=0;k<7;k++){const c=new THREE.Mesh(new THREE.BoxGeometry(.03*s,rand(.2,.5)*s,.03*s),cm);c.position.set(rand(-.4,.4)*s,rand(1.3,2.3)*s,.44*s);c.rotation.z=rand(-.9,.9);m.body.add(c);ex.push(c)}}
  else{const halo=new THREE.Group();halo.position.set(0,2.5*s,-.5*s);m.body.add(halo);for(let k=0;k<8;k++){const c=new THREE.Mesh(new THREE.OctahedronGeometry(.13*s,0),new THREE.MeshBasicMaterial({color:0xd8c8ff}));const a=k/8*TAU;c.position.set(Math.cos(a)*1.05*s,Math.sin(a)*1.05*s,0);c.scale.y=2.2;c.rotation.z=a-Math.PI/2;halo.add(c)}ex.push(halo)}
  return{g:m.g,body:m.body,kind,crown:cr,anim:(e,dt,mv,l)=>{if(e.ai&&e.ai.statue)return;const t0=e.t;if(gog)e.t=t0*.5;m.anim(e,dt,mv,l);e.t=t0;if(gog){m.body.position.y=Math.abs(Math.sin(e.t*5))*.14*Math.min(1,mv*4);for(const c of ex)c.material.color.setHex(e.hp<e.maxhp*.5?0xfff0a0:0x9dff70)}else ex[0].rotation.z+=dt*(e.hp<e.maxhp*.5?2.2:.8);
      cr.rotation.y+=dt*.6;cg.material.opacity=.3+Math.sin(e.t*4)*.12}}}
ETYPES.gog={name:'Gog, Stone of the Crown',boss:true,hp:5200,speed:4.4,dmg:26,range:4.8,cd:2.3,xp:2600,r:2.2,h:6.2,noCalm:true,build:()=>buildCrownGuard('gog')};
ETYPES.magog={name:'Magog, Wing of the Crown',boss:true,hp:4400,speed:7.5,dmg:24,range:0,cd:9,xp:2600,r:2,h:5.2,fly:1,ghost:true,kite:true,noCalm:true,build:()=>buildCrownGuard('magog')};

/* ---------- their spells ---------- */
function x5Spikes(from,dir,len,w,dmg,col){let hit=false;const n=Math.round(len/1.6);for(let k=1;k<=n;k++)after(k*.045,()=>{const p=V3(from.x+dir.x*k*1.6,0,from.z+dir.z*k*1.6);p.y=groundAt(p.x,p.z);const S=uSec(uS(p.z));if(X5.in&&Math.abs(p.x-U0.x)>S.hw)return;
    const m=new THREE.Mesh(new THREE.ConeGeometry(rand(.5,.9),rand(2.2,3.8),5),x5Mats().stone);m.position.set(p.x+rand(-.6,.6),p.y,p.z+rand(-.6,.6));m.rotation.set(rand(-.25,.25),rand(0,3),rand(-.25,.25));const H=m.geometry.parameters.height;
    addFx(m,1.5,(f,q)=>{const s=f.t<.1?f.t/.1:f.t>1.2?Math.max(0,(1.5-f.t)/.3):1;m.scale.set(1,s,1);m.position.y=p.y+H/2*s-.1},()=>{scene.remove(m);m.geometry.dispose()});
    if(k%2===0){SM.emit(V3(p.x,p.y+.4,p.z),{n:3,c0:0x8a9088,c1:0x1c201c,s0:1,s1:3,life:.8,a:.5,up:1.5});if(k%4===0)sx('impact',.25,null,{rate:rand(1.3,1.7)})}
    if(!hit&&Math.hypot(P.pos.x-p.x,P.pos.z-p.z)<w*.5+.8&&P.pos.y-p.y<3.2){hit=true;damagePlayer(dmg);P.vy=Math.max(P.vy||0,7);P.shake=Math.max(P.shake,.5);x5Punch(9,.3);flash(p,col,6)}})}
function x5Bolt(p,col,dmg,r){p.y=groundAt(p.x,p.z);const b=new THREE.Mesh(new THREE.CylinderGeometry(.35,.6,26,8,1,true),new THREE.MeshBasicMaterial({color:0xffffff,transparent:true,blending:THREE.AdditiveBlending,depthWrite:false}));b.position.set(p.x,p.y+13,p.z);
  const b2=new THREE.Mesh(new THREE.CylinderGeometry(1.1,1.5,26,10,1,true),new THREE.MeshBasicMaterial({color:col,transparent:true,opacity:.5,blending:THREE.AdditiveBlending,depthWrite:false,side:THREE.DoubleSide}));b.add(b2);
  addFx(b,.32,(f,k)=>{b.material.opacity=1-k;b2.material.opacity=.5*(1-k);b.scale.x=b.scale.z=1+k*.8},()=>{scene.remove(b);b.geometry.dispose();b2.geometry.dispose()});flash(p,col,9);ring(p,col,.5,r*1.3,.3);SP.emit(V3(p.x,p.y+.6,p.z),{n:30,c0:0xffffff,c1:col,speed:9,life:.5,s0:.5,s1:.04});
  sx('impact',.35,null,{rate:rand(1.5,2)});try{sfx.zap&&sfx.zap()}catch(x){}if(playerIn(p,r,5)){damagePlayer(dmg);P.shake=Math.max(P.shake,.5)}}
function x5SkyBolts(e,n,col,spread){for(let k=0;k<n;k++){const p=k===0?P.pos.clone():V3(P.pos.x+rand(-spread,spread),0,P.pos.z+rand(-spread,spread));after(k*.28,()=>{if(e.dead)return;if(k&&k%2===0){p.x=P.pos.x;p.z=P.pos.z}p.y=groundAt(p.x,p.z);telegraph(p,2.6,.75,col,()=>{if(!e.dead)x5Bolt(p,col,e.dmg*.95,2.7)})})}}
function x5Leap(e,to,h,dur,land){e.leap={a:e.pos.clone(),b:to.clone(),t:0,dur,h,land};e.busy=dur+.5}
function x5LeapStep(e,dt){const L=e.leap;L.t+=dt;const k=Math.min(1,L.t/L.dur);e.pos.lerpVectors(L.a,L.b,k);e.pos.y=lerp(L.a.y,L.b.y,k)+Math.sin(k*Math.PI)*L.h;if(k>=1){e.leap=null;e.pos.y=groundAt(e.pos.x,e.pos.z);if(L.land)L.land()}}
function x5Quake(e,r,col,waves){const g=V3(e.pos.x,groundAt(e.pos.x,e.pos.z),e.pos.z);P.shake=Math.max(P.shake,1.1);sx('impact',1,null,{rate:.6});x5Punch(11,.35);flash(g,col,12);SM.emit(V3(g.x,g.y+.5,g.z),{n:30,c0:0x9aa098,c1:0x1c201c,s0:2,s1:6,life:1.2,a:.5,speed:6,flat:1});
  for(let k=0;k<12;k++){const a=k/12*TAU;const m=new THREE.Mesh(new THREE.DodecahedronGeometry(rand(.3,.7),0),x5Mats().stone);m.position.set(g.x+Math.cos(a)*2,g.y+.3,g.z+Math.sin(a)*2);const v=V3(Math.cos(a)*rand(4,9),rand(6,11),Math.sin(a)*rand(4,9));addFx(m,1,(f,q)=>{m.position.addScaledVector(v,.016);v.y-=.5;m.rotation.x+=.2},()=>{scene.remove(m);m.geometry.dispose()})}
  for(let w=0;w<(waves||1);w++)after(w*.55,()=>shockwave(g,r,13,e.dmg*1.05,col));if(playerIn(g,4.2,3))damagePlayer(e.dmg*1.3)}
BOSSAI.gog=function(e,dt,d){const a=e.ai;if(a.statue||a.duel)return;const rage=e.hp<e.maxhp*.5;a.a1-=dt;a.a2-=dt;a.a3-=dt;a.a4-=dt;if(e.leap){x5LeapStep(e,dt);return}if(e.dash){x5DashStep(e,dt,0x9dff70);if(Math.random()<.5)SM.emit(V3(e.pos.x,.4,e.pos.z),{c0:0x8a9088,c1:0x1c201c,s0:1.5,s1:4,life:.9,a:.5});return}if(e.busy>0)return;
  if(a.a1<=0&&d<40){a.a1=rage?5.2:7;const to=V3(P.pos.x,0,P.pos.z);to.y=groundAt(to.x,to.z);e.busy=2;sx('garg',.8,null,{rate:.6});telegraph(to,6,.95,0x9dff70,()=>{});after(.25,()=>{if(!e.dead)x5Leap(e,to,9,.7,()=>x5Quake(e,rage?30:24,0x9dff70,rage?2:1))})}
  else if(a.a2<=0&&d<34){a.a2=rage?3.6:5;e.busy=1.3;const o=V3(e.pos.x,groundAt(e.pos.x,e.pos.z),e.pos.z),dir=V3(P.pos.x-o.x,0,P.pos.z-o.z).normalize(),L=30;const dirs=rage?[-.38,0,.38]:[0];
    for(const an of dirs){const dd=dir.clone().applyAxisAngle(V3(0,1,0),an);lineTelegraph(o,V3(o.x+dd.x*L,o.y,o.z+dd.z*L),3.2,.8,0x9dff70,()=>{if(!e.dead){e.atk=.3;x5Spikes(o,dd,L,3.2,e.dmg*1.1,0x9dff70)}})}}
  else if(a.a3<=0){a.a3=rage?6:8.5;e.busy=.9;const n=rage?4:3;for(let k=0;k<n;k++)after(k*.4,()=>{if(!e.dead)enemyMeteor(V3(P.pos.x+(k?rand(-6,6):0),0,P.pos.z+(k?rand(-6,6):0)),3.4,1.15,e.dmg,0x9dff70)})}
  else if(a.a4<=0&&rage&&d>8){a.a4=9;const from=e.pos.clone(),dv=V3(P.pos.x-from.x,0,P.pos.z-from.z).normalize(),to=P.pos.clone().addScaledVector(dv,8);to.y=groundAt(to.x,to.z);e.busy=1.5;sx('garg',.9,null,{rate:.7});lineTelegraph(V3(from.x,to.y,from.z),to,5,.85,0xfff0a0,()=>{if(!e.dead)e.dash={a:e.pos.clone(),b:to,t:0,dur:.55,w:5}})}};
BOSSAI.magog=function(e,dt,d){const a=e.ai;if(a.statue)return;const rage=e.hp<e.maxhp*.5;a.a1-=dt;a.a2-=dt;a.a3-=dt;a.a4-=dt;if(e.dash){x5DashStep(e,dt,0xc8a8ff);return}const gy=groundAt(e.pos.x,e.pos.z);
  if(a.perch){e.pos.lerp(a.perch,Math.min(1,dt*2));a.pt=(a.pt||3)-dt;if(a.pt<=0&&!CS.active){a.pt=XG.mb;x5SkyBolts(e,DIFF==='easy'?3:4,0xc8a8ff,7);if(!X5.said.lw_07)x5Bark('Lyra','lw_07')}return}
  e.pos.y=lerp(e.pos.y,gy+4.4+Math.sin(e.t*1.5)*1.2,Math.min(1,dt*2));if(e.busy>0)return;
  if(a.a1<=0){a.a1=rage?4:5.6;e.busy=.9;x5SkyBolts(e,rage?7:5,0xc8a8ff,8);x5Bark('Lyra','lw_07')}
  else if(a.a2<=0&&d<22){a.a2=rage?5:7;const o=V3(e.pos.x,gy,e.pos.z),dir=V3(P.pos.x-o.x,0,P.pos.z-o.z).normalize();e.busy=1.4;coneTelegraph(o,dir,20,.6,.85,0xc8a8ff,()=>{if(e.dead)return;sx('wind',.8,null,{rate:1.6});for(let k=0;k<40;k++)SP.emit(V3(o.x,rand(.5,4),o.z),{c0:0xffffff,c1:0xb090ff,s0:.5,s1:.05,life:.6,dir:dir.clone().multiplyScalar(30),dirJ:1,speed:4});
      if(inCone(P.pos,o,dir,20,.6)){damagePlayer(e.dmg*.9);const kb=dir.clone().multiplyScalar(9);addFx(null,.35,(f,q)=>{P.pos.addScaledVector(kb,.016*3*(1-q))});P.vy=Math.max(P.vy||0,6);x5Punch(10,.3)}})}
  else if(a.a3<=0){a.a3=rage?3.2:4.6;e.busy=.6;const n=rage?9:6;for(let v=0;v<(rage?2:1);v++)after(v*.45,()=>{if(e.dead)return;const c=eCenter(e),base=aimAtPlayer(c).normalize();for(let k=0;k<n;k++)enemyOrb(c,base.clone().applyAxisAngle(V3(0,1,0),(k-(n-1)/2)*.14+(v?.07:0)),19,e.dmg*.38,0xc8a8ff,.34,{keepY:true,life:2.6})})}
  else if(a.a4<=0&&d<38){a.a4=rage?6:9;x5Dive(e,0xc8a8ff,3.4)}
  else if(rage&&(a.a5=(a.a5==null?6:a.a5)-dt*8)<=0){a.a5=11;e.busy=1.6;const c=V3(P.pos.x,groundAt(P.pos.x,P.pos.z),P.pos.z);for(let k=0;k<3;k++){const an=k/3*Math.PI+rand(0,.4),dv=V3(Math.cos(an),0,Math.sin(an));const A=c.clone().addScaledVector(dv,-22),B=c.clone().addScaledVector(dv,22);
      after(k*.35,()=>lineTelegraph(A,B,2.6,.9,0xffffff,()=>{if(e.dead)return;const m=new THREE.Mesh(new THREE.BoxGeometry(2.2,.5,44),new THREE.MeshBasicMaterial({color:0xe8dcff,transparent:true,blending:THREE.AdditiveBlending,depthWrite:false}));m.position.set(c.x,c.y+1,c.z);m.rotation.y=Math.atan2(dv.x,dv.z);addFx(m,.3,(f,q)=>{m.material.opacity=1-q;m.scale.y=1+q*3},()=>{scene.remove(m);m.geometry.dispose()});sx('impact',.5,null,{rate:1.8});flash(c,0xc8a8ff,10);
        if(distToSeg(P.pos,A,B)<1.7&&P.pos.y-c.y<3)damagePlayer(e.dmg*1.1)}))}}};

/* ---------- companions in this fight: FX from the Portobello kit, damage capped per target ---------- */
{const _ch=x4CmpHit;x4CmpHit=function(t,f,col){if(XG.ph||(typeof XO!=='undefined'&&XO.cmp)){if(!t||t.dead||t.invuln)return;const cap=t.maxhp*x4CmpCapF();t.cmpD=t.cmpD||0;const left=cap-t.cmpD,fl=(t.hpFloor||0)*t.maxhp;if(left<=1||t.hp<=fl+t.maxhp*.03){SP.emit(eCenter(t),{n:8,c0:0xffffff,c1:0x9a9aa8,speed:3,life:.3});return}
    const h0=t.hp;damageEnemy(t,Math.min(t.maxhp*f*.8,left),col);t.cmpD+=Math.max(0,h0-t.hp);return}return _ch.apply(this,arguments)}}
function x5Ward(p,col){const g=new THREE.Group();g.position.copy(p);const d=new THREE.Mesh(new THREE.SphereGeometry(2.6,24,14,0,TAU,0,Math.PI/2),new THREE.MeshBasicMaterial({color:col,transparent:true,opacity:.16,blending:THREE.AdditiveBlending,depthWrite:false,side:THREE.DoubleSide}));g.add(d);const r=decal(runeTex,col,5.4,true,.7);r.position.y=.08;g.add(r);const gl=glowSprite(col,5,.25);gl.position.y=1.4;g.add(gl);scene.add(g);g.userData.tick=dt=>{r.rotation.z+=dt*.8;d.material.opacity=.13+Math.sin(time*3)*.05};return g}
function xgWardOff(){if(XG.ward){scene.remove(XG.ward);XG.ward=null}}
function xgChain(on){if(!on){if(XG.chain){scene.remove(XG.chain);XG.chain=null}return}if(XG.chain)return;const m=new THREE.Mesh(new THREE.CylinderGeometry(.18,.18,1,8,1,true),new THREE.MeshBasicMaterial({color:0xd8ffb0,transparent:true,opacity:.7,blending:THREE.AdditiveBlending,depthWrite:false}));scene.add(m);XG.chain=m}

/* ---------- the body switch: a candle-gold thread from one body to the other ---------- */
function x5Swap(m,k,label,sub,doSwap,done){let swapped=false;const away=V3(k.x-m.x,0,k.z-m.z);if(away.lengthSq()<.01)away.set(0,0,1);away.normalize();const kd=away.clone();
  const orb=glowSprite(0xffe0a0,3,1,false),oc=glowSprite(0xffffff,1.1,1,false);const pathPt=u=>{const p=headOf(m,1.3).lerp(headOf(k,1.4),u);p.y+=Math.sin(u*Math.PI)*6;return p};const fovSet=f=>{camera.fov=f;camera.updateProjectionMatrix()};
  playCutscene([
    {dur:1.15,fov:30,snap:true,cam:()=>({pos:headOf(m,1.15).addScaledVector(away,-1.7),look:headOf(m,.95)}),onStart:()=>{x3KFx();x3Canvas('x3zo',1150);x5Banner(label,sub,'#ffd890',2.2,'#1a1206');sx('riser',1,null,{rate:1.4});sx('chan',.7,null,{rate:1.3});try{sfx.blink()}catch(x){}P.shake=.6;scene.add(orb);scene.add(oc);orb.position.copy(headOf(m,1.3));oc.position.copy(orb.position)},
      update:(dt,kk)=>{const e=eIn(kk);camera.position.copy(headOf(m,1.15+e*6).addScaledVector(away,-1.7-e*12).add(V3(-away.z*e*5,0,away.x*e*5)));camera.lookAt(headOf(m,.95+e*.5));fovSet(30+e*60);const s=1+kk*1.2;orb.scale.setScalar(2.2*s);oc.scale.setScalar(.8*s);
        for(let q=0;q<4;q++)SP.emit(headOf(m,rand(.3,2)).add(V3(rand(-.8,.8),0,rand(-.8,.8))),{c0:0xffffff,c1:0xffb040,s0:.4,s1:.04,life:.5,speed:-2})}},
    {dur:.9,fov:80,snap:true,cam:()=>({pos:pathPt(0),look:pathPt(.2)}),onStart:()=>{x3Canvas('x3wh',900);try{sfx.blink()}catch(x){}sx('portal',.7,null,{rate:1.6})},
      update:(dt,kk)=>{const u=eOut(kk);const p=pathPt(u),ahead=pathPt(Math.min(1,u+.15));orb.position.copy(p);oc.position.copy(p);orb.scale.setScalar(2.4);oc.scale.setScalar(.9);const d=ahead.clone().sub(p).normalize();camera.position.copy(p).addScaledVector(d,-5).add(V3(0,1.4,0));camera.lookAt(ahead);fovSet(84-kk*18);
        for(let q=0;q<6;q++)SP.emit(p.clone().add(V3(rand(-.4,.4),rand(-.4,.4),rand(-.4,.4))),{c0:0xffffff,c1:0xffc060,s0:.6,s1:.05,life:.6,speed:1})}},
    {dur:1.5,fov:52,snap:true,cam:()=>({pos:headOf(k,2).addScaledVector(kd,3.6),look:headOf(k,1.5)}),
      onStart:()=>{scene.remove(orb);scene.remove(oc);if(!swapped){swapped=true;doSwap()}x3Canvas('x3pi',750);x5Impact(80,.1);flash(k,0xffffff,40);flash(k,0xffc060,30);P.shake=1.6;sx('impact',1,null,{rate:.7});sx('powerup',.9,null,{rate:.9});
        SP.emit(headOf(k,1.2),{n:300,c0:0xffffff,c1:0xffb040,speed:16,life:1.1,s0:.8,s1:.06});ring(V3(k.x,k.y+.1,k.z),0xffd890,1,16,.55)},
      update:(dt,kk)=>{const e=eBack(Math.min(1,kk*1.6));const wide=headOf(k,6).addScaledVector(kd,14).add(V3(kd.z*4,0,-kd.x*4));const close=headOf(k,2).addScaledVector(kd,3.8).add(V3(kd.z*.9,0,-kd.x*.9));camera.position.copy(wide.lerp(close,e));camera.lookAt(headOf(k,1.4));fovSet(88-36*Math.min(1.08,e))}}],
    ()=>{scene.remove(orb);scene.remove(oc);if(!swapped)doSwap();done&&done()})}

/* ---------- staging ---------- */
function xgSpawn(){const mk=(type,lx,ry)=>{const e=spawnEnemy(type,uP(lx,198));e.pos.y=1.6;e.aggro=true;e.quest=true;e.invuln=true;e.ai.statue=1;e.busy=999;e.m.g.rotation.y=ry;e.m.g.children.forEach(c=>{if(c.material&&c.material.map===scorchTex)c.visible=false});return e};
  XG.gog=mk('gog',-11,0);XG.mag=mk('magog',11,0);XG.gog.x5=(e,c)=>xgDead('gog',c);XG.mag.x5=(e,c)=>xgDead('mag',c);bossRef=null;$('boss').classList.add('hidden')}
function xgWake(e){e.ai.statue=0;e.busy=.6;e.invuln=false;e.ai.a1=2.5;e.ai.a2=4;e.ai.a3=6;e.ai.a4=8}
function x5GReset(){xgWardOff();xgChain(false);if(KM.on)try{kmEnd()}catch(x){}X3.mPos=null;if(XG.oldC){X3.C=XG.oldC;XG.oldC=null}for(const k of['gog','mag']){const e=XG[k];if(e&&!e.dead)removeEnemy(e);XG[k]=null}XG.ph=0;XG.t=0;KFW.pin=0;LYR.pin=0;x5Bars(0);
  if(X5.gdoor)for(const d of X5.gdoor){d.position.x=uX(d.userData.q*2.2);d.rotation.y=0}if(X5.gseal)X5.gseal.visible=true}
function x5GObj(){const n=k=>XG[k]&&!XG[k].dead;if(XG.ph===1)return 'Break <b>Magog</b> while Kaen holds Gog';if(XG.ph===2)return 'You are <b>Kaen</b>. Bring <b>Gog</b> to his knees';if(XG.ph===3)return n('gog')&&n('mag')?'Finish <b>Gog</b> and <b>Magog</b>':`Finish <b>${n('gog')?'Gog':'Magog'}</b>`;return 'Cross the hall of the guardians'}
function x5GIntro(){if(CS.active||XG.ph)return;CH2.st=Math.max(CH2.st,19);ch2Save();X5.cp=3;NZ.cp.copy(uP(0,X5CP[3]));for(const b of enemies)if(b.x5b&&!b.dead)removeEnemy(b);xgSpawn();const g=XG.gog,m=XG.mag;
  const mp=uP(0,160);x4Stage(mp,Math.PI);P.face=Math.PI;if(KFW.a){KFW.a.g.position.copy(uP(-2.6,158.6));KFW.a.g.rotation.y=Math.PI}if(LYR.a){LYR.a.g.position.copy(uP(2.4,158.2));LYR.a.g.rotation.y=Math.PI;LYR.a.g.visible=true}KFW.pin=1;LYR.pin=1;X4.cc=uP(0,190);
  const go=()=>{x4Talk('');P.heroAnim=null;X4.cc=null;XG.seen=1;xgPhase1()};
  if(XG.seen){x5Banner('GOG & MAGOG','GUARDIANS OF THE CROWN','#9dff70',2);sx('garg',1,null,{rate:.6});go();return}
  const wS=(s,d)=>x4S(()=>P.pos,s,d||2.4,1.7),kS=(s,d)=>x4S(x4K,s,d||2.3,1.75);
  playCutscene([{dur:4.6,fov:56,cam:k=>({pos:uP(-14+k*10,152+k*8,3+k*5),look:uP(0,198,5)}),onStart:()=>{x4Talk('');sx('wind',.4,null,{rate:.6})}},
    {who:'@',text:XL3.mw_06,cam:wS(1,2.3),onStart:()=>x4Talk('@')},
    {who:'Gog',text:XL3.gg_01,fov:34,cam:k=>({pos:uP(-11+2*k,186-k*2,4.2),look:uP(-11,198,7.6)}),onStart:()=>{x4Talk('');g.ai.statue=0;g.busy=999;sx('garg',1,null,{rate:.55});x5Impact(90,.14);P.shake=1.1;flash(g.pos,0x9dff70,22);SM.emit(V3(g.pos.x,2,g.pos.z),{n:30,c0:0x8a9088,c1:0x1c201c,s0:2,s1:6,life:1.6,a:.5,speed:5})}},
    {who:'Magog',text:XL3.gg_02,fov:36,cam:k=>({pos:uP(11-3*k,187,5+k*2),look:uP(11,198,7.4+k*2)}),onStart:()=>{m.ai.statue=0;m.busy=999;sx('cackle',.9,null,{rate:.6});x5Impact(70,.1);flash(m.pos,0xc8a8ff,22)},update:dt=>{m.pos.y=lerp(m.pos.y,6,dt*1.2)}},
    {dur:2.3,fov:60,cam:k=>({pos:uP(0,170-k*6,2.2),look:uP(0,198,5.5)}),onStart:()=>{x5VS('GOG','MAGOG','#9dff70','#c8a8ff','&');sx('boss',.9);P.shake=.8}},
    {who:'Kaen',text:XL3.kw_07,cam:kS(-1,2.4),onStart:()=>x4Talk('Kaen')}],go)}
/* phase 1: Maëlle and Magog; Kaen and Gog trade blows across the hall */
function xgPhase1(){const g=XG.gog,m=XG.mag;XG.ph=1;XG.t=0;x5Gate('g3',false);xgWake(m);m.hpFloor=.5;m.hp=m.maxhp;bossRef=m;$('boss').classList.remove('hidden');$('bossName').innerHTML=`${m.def.name} <span style="color:#ff4050">· Lv ${m.lvl}</span>`;
  g.ai.statue=0;g.ai.duel=1;g.invuln=true;g.busy=999;g.hp=g.maxhp;g.pos.copy(uP(-15,186));g.pos.y=0;KFW.pin=1;LYR.pin=1;if(KFW.a)KFW.a.g.position.copy(uP(-12,178));if(LYR.a)LYR.a.g.position.copy(uP(9,156));XG.duel={t:0,kt:1.2,gt:2.6,ang:0};XG.lt=3.5;P.invuln=1.5;
  after(.5,()=>toast('Kaen has Gog. <b>Magog</b> is yours: watch the floor, the bolts land where it glows.','Gog and Magog',true))}
function xgDuel(dt){const g=XG.gog,K=KFW.a,D=XG.duel;if(!g||g.dead||!K)return;const kp=K.g.position;D.ang+=dt*.55;D.kt-=dt;D.gt-=dt;const C=uP(-14,184);g.pos.x=lerp(g.pos.x,C.x+Math.sin(D.ang*.5)*3,dt);g.pos.z=lerp(g.pos.z,C.z+Math.cos(D.ang*.7)*3,dt);g.pos.y=0;
  g.m.g.rotation.y=lerpAngle(g.m.g.rotation.y,Math.atan2(kp.x-g.pos.x,kp.z-g.pos.z),Math.min(1,dt*3));
  if(!D.busy){const tx=g.pos.x+Math.sin(D.ang)*6.5,tz=g.pos.z+Math.cos(D.ang)*6.5;const dx=tx-kp.x,dz=tz-kp.z,L=Math.hypot(dx,dz),v=Math.min(L,dt*6);if(L>.05){kp.x+=dx/L*v;kp.z+=dz/L*v}kp.y=0;K.g.rotation.y=lerpAngle(K.g.rotation.y,Math.atan2(g.pos.x-kp.x,g.pos.z-kp.z),Math.min(1,dt*8));const an=L>1.5?'Jog_Fwd_Loop':'Idle_Loop';if(D.an!==an){D.an=an;try{K.setBase(an,.25)}catch(x){}}}
  else D.busy=Math.max(0,D.busy-dt);
  if(D.kt<=0){D.kt=rand(2,3.2);D.busy=.7;D.an='';try{K.fire('Melee_Hook',.6)}catch(x){}const dir=V3(g.pos.x-kp.x,0,g.pos.z-kp.z).normalize();after(.15,()=>{crescentFx(V3(kp.x,0,kp.z),dir,7,0xb070ff);if(Math.hypot(P.pos.x-kp.x,P.pos.z-kp.z)<40)sx('clash',.16,null,{rate:rand(1.2,1.6)});SP.emit(eCenter(g),{n:14,c0:0xffffff,c1:0x9050ff,speed:5,life:.4})})}
  if(D.gt<=0){D.gt=rand(3,4.4);g.atk=.3;const p=V3(kp.x,0,kp.z);after(.3,()=>{ring(p,0x9dff70,.5,5,.4);SM.emit(V3(p.x,.5,p.z),{n:10,c0:0x8a9088,c1:0x1c201c,s0:1.5,s1:4,life:.9,a:.5,speed:3});if(Math.hypot(P.pos.x-p.x,P.pos.z-p.z)<40){sx('impact',.3,null,{rate:.8});P.shake=Math.max(P.shake,.15)}})}}
function xgLyra(dt,t){const L=LYR.a;if(!L||!t||t.dead)return;XG.lt-=dt;x4Face(L,t.pos);if(XG.lt<=0){XG.lt=rand(3.4,4.6);try{x4LBalls(L,t)}catch(x){}}}
/* the switch: Gog pins Kaen, Lyra threads Maëlle across */
function xgSwitch(){if(CS.active||XG.ph!==1)return;XG.ph=1.5;sayHush();const g=XG.gog,m=XG.mag,K=KFW.a;for(const p of eProjs)scene.remove(p.s);eProjs.length=0;m.invuln=true;m.ai.perch=uP(13,198,9.5);m.dash=null;m.busy=999;
  const kp=uP(-9,176),mp=uP(6,162),lp=uP(8.2,160.6);g.pos.copy(uP(-12.5,179));g.pos.y=0;g.m.g.rotation.y=Math.atan2(kp.x-g.pos.x,kp.z-g.pos.z);if(K){K.g.position.copy(kp);K.g.rotation.y=Math.atan2(g.pos.x-kp.x,g.pos.z-kp.z);try{K.setBase('Crouch_Idle_Loop',.2)}catch(x){}}
  P.pos.copy(mp);P.vy=0;P.flying=false;P.face=Math.atan2(kp.x-mp.x,kp.z-mp.z);if(LYR.a){LYR.a.g.position.copy(lp);x4Face(LYR.a,mp)}X4.cc=kp.clone();
  playCutscene([{who:'Kaen',text:XL3.kw_08,fov:40,cam:k=>({pos:headOf(kp,1).add(V3(3.4,.2,-3+k)),look:headOf(kp,.9)}),onStart:()=>{g.atk=.3;P.shake=.9;sx('impact',.8,null,{rate:.7});x5Impact(60,.08);ring(kp,0x9dff70,.5,6,.4)}},
    {who:'Lyra',text:XL3.lw_08,fov:40,cam:x4S(()=>lp,1.1,2.3,1.6),onStart:()=>{try{LYR.a&&LYR.a.setBase('Spell_Simple_Idle_Loop',.3)}catch(x){}P.heroAnim='Crouch_Idle_Loop';xgWardOff();XG.ward=x5Ward(mp,0xffd890);sx('shield',.7)},update:dt=>{if(XG.ward)XG.ward.userData.tick(dt);ritStream(headOf(lp,1.2),headOf(mp,1.2),0xfff6c8,0xffb030,.8,0)}}],
    ()=>x5Swap(mp,kp,'BODY SWITCH','MAËLLE  ▸  KAEN',()=>{XG.oldC=X3.C;X3.C=V3(kp.x,0,kp.z);X3.lPos=null;X3.mPos=mp.clone();if(KFW.a)KFW.a.g.position.copy(kp);kmStart();P.pos.copy(kp);P.pos.y=0},xgPhase2))}
/* phase 2: you are Kaen. Gog is yours */
function xgPhase2(){const g=XG.gog,m=XG.mag;XG.ph=2;X4.cc=null;P.heroAnim=null;g.ai.duel=0;g.invuln=false;g.hpFloor=.4;g.hp=g.maxhp;g.busy=1;g.ai.a1=3;g.ai.a2=5;g.ai.a3=7;g.ai.a4=9;bossRef=g;$('boss').classList.remove('hidden');$('bossName').innerHTML=`${g.def.name} <span style="color:#ff4050">· Lv ${g.lvl}</span>`;
  m.ai.pt=5;XG.mb=DIFF==='hard'?5:DIFF==='easy'?9:7;P.invuln=2;try{LYR.a&&LYR.a.setBase('Spell_Simple_Idle_Loop',.3)}catch(x){}after(.8,()=>x5Say('@','mw_07'));after(4.4,()=>x5Say('Kaen','kw_09'));
  after(.4,()=>toast('You are Kaen now. Cut <b>Gog</b> down. Magog throws bolts from her perch.','Body switch',true))}
function xgBack(){if(CS.active||XG.ph!==2)return;XG.ph=2.5;sayHush();const g=XG.gog,m=XG.mag;for(const p of eProjs)scene.remove(p.s);eProjs.length=0;g.invuln=true;g.busy=999;g.dash=null;g.leap=null;g.pos.y=0;const kp=P.pos.clone();kp.y=0;const mp=X3.mPos.clone(),lp=LYR.a?LYR.a.g.position.clone():mp;X4.cc=g.pos.clone();
  playCutscene([{who:'Gog',text:XL3.gg_03,fov:38,cam:k=>({pos:headOf(g.pos,3).add(V3(5-k,0,-6)),look:headOf(g.pos,3.4)}),onStart:()=>{x5Impact(80,.12);P.shake=1;sx('garg',1,null,{rate:.5});SM.emit(eCenter(g),{n:30,c0:0x8a9088,c1:0x1c201c,s0:2,s1:6,life:1.6,a:.5,speed:5});xgChain(true)},
      update:()=>{const A=eCenter(g),B=eCenter(m);const c=XG.chain;if(c){c.position.copy(A).lerp(B,.5);c.scale.set(1+Math.sin(time*20)*.3,A.distanceTo(B),1);c.quaternion.setFromUnitVectors(V3(0,1,0),B.clone().sub(A).normalize())}for(let q=0;q<3;q++)SP.emit(A.clone().lerp(B,Math.random()),{c0:0xffffff,c1:0x9dff70,s0:.5,s1:.05,life:.5,speed:1})}},
    {who:'Lyra',text:XL3.lw_09,fov:40,cam:x4S(()=>lp,-1.1,2.3,1.6)}],
    ()=>x5Swap(kp,mp,'SWITCH BACK','KAEN  ▸  MAËLLE',()=>{x3SwapBack();X3.mPos=null;if(XG.oldC){X3.C=XG.oldC;XG.oldC=null}xgWardOff();const rest=uP(7.6,157.4);if(KFW.a){KFW.a.g.position.copy(rest);try{KFW.a.setBase('Crouch_Idle_Loop',.3)}catch(x){}}if(LYR.a)LYR.a.g.position.copy(uP(9.6,158.4));XG.ward=x5Ward(uP(8.6,157.8),0xffd890);P.pos.copy(mp);P.pos.y=0},
      ()=>{X4.cc=mp.clone();playCutscene([{who:'Kaen',text:XL3.kw_10,fov:38,cam:x4S(x4K,1,2.2,1.2)},{who:'@',text:XL3.mw_08,fov:40,cam:x4S(()=>P.pos,-1,2.4,1.7),onStart:()=>{P.heroAnim='Idle_Talking_Loop';P.face=Math.PI}}],xgPhase3)}))}
/* phase 3: both of them, bound together, and only Maëlle */
function xgPhase3(){const g=XG.gog,m=XG.mag;XG.ph=3;X4.cc=null;P.heroAnim=null;x5Banner('FINISH THEM','MAËLLE ALONE','#ffd890',2);sx('boss',.9);x5Punch(14,.5);
  for(const e of[g,m]){e.invuln=false;e.hpFloor=0;e.busy=1.2;e.cmpD=1e9}g.hp=Math.round(g.maxhp*.4);m.hp=Math.round(m.maxhp*.5);m.ai.perch=null;m.ai.a1=3;m.ai.a2=5;m.ai.a3=2;m.ai.a4=7;g.ai.a1=4;g.ai.a2=2.5;g.ai.a3=6;g.ai.a4=5;XG.jt=14;P.invuln=2;P.hp=Math.max(P.hp,maxHP()*.7)}
function xgDead(k,c){const o=k==='gog'?XG.mag:XG.gog;XG[k]=null;if(o&&!o.dead){x5Banner(k==='gog'?'MAGOG ENRAGED':'GOG ENRAGED','ONE LEFT',k==='gog'?'#c8a8ff':'#9dff70',1.8);x5Say(k==='gog'?'Magog':'Gog','gg_04',1);o.hp=Math.min(o.maxhp,o.hp+o.maxhp*.12);o.dmgMul=1.2;o.busy=.5;flash(o.pos,0xffffff,20);sx('garg',1,null,{rate:.8});bossRef=o;$('boss').classList.remove('hidden');xgChain(false);return}
  xgChain(false);after(1.1,xgEnd)}
function xgEnd(){if(CS.active){after(.5,xgEnd);return}XG.ph=4;xgWardOff();for(const p of eProjs)scene.remove(p.s);eProjs.length=0;$('boss').classList.add('hidden');bossRef=null;const dp=uP(0,198);x4Stage(uP(0,186),Math.PI);if(KFW.a){KFW.a.g.position.copy(uP(-2.4,184.4));KFW.a.g.rotation.y=Math.PI}if(LYR.a){LYR.a.g.position.copy(uP(2.4,184.6));LYR.a.g.rotation.y=Math.PI}KFW.pin=1;LYR.pin=1;X4.cc=dp;
  playCutscene([{dur:3.6,fov:54,cam:k=>({pos:uP(-6+k*6,180,3.4+k),look:uP(0,205,3.4)}),onStart:()=>{x4Talk('');sx('skyshatter',.8);x5Impact(90,.12);if(X5.gseal)X5.gseal.visible=false;flash(uP(0,204,3.6),0x9dff70,30);SP.emit(uP(0,204.5,3.6),{n:200,c0:0xffffff,c1:0x7dff9a,speed:12,life:1.3,s0:.6,s1:.05});x5Gate('g3',true)},
      update:(dt,k)=>{if(X5.gdoor)for(const d of X5.gdoor){d.rotation.y=d.userData.q*Math.min(1,k*1.4)*1.35;d.position.x=uX(d.userData.q*(2.2+Math.min(1,k*1.4)*1.7))}}},
    {who:'@',text:XL3.mw_09,cam:x4S(()=>P.pos,1,2.4,1.7),onStart:()=>x4Talk('@')},{who:'Kaen',text:XL3.kw_11,cam:x4S(x4K,-1,2.3,1.75),onStart:()=>x4Talk('Kaen')}],
    ()=>{x4Talk('');P.heroAnim=null;X4.cc=null;KFW.pin=0;LYR.pin=0;XG.ph=0;CH2.st=Math.max(CH2.st,20);ch2Save();X5.cp=4;NZ.cp.copy(uP(0,X5CP[4]));x5Gate('g3',true,true);writeSave();toast('The door stands open. The thing in the chair is waiting.','Chapter XV complete',true)})}
function x5GTick(dt,s){if(XG.ward&&XG.ward.userData.tick)XG.ward.userData.tick(dt);if(CH2.st!==19||CS.active)return;if(!XG.ph){if(s>153&&!XG.gog)x5GIntro();return}
  if(s<151.6){P.pos.z=uZ(151.6)}const g=XG.gog,m=XG.mag;XG.t+=dt;
  if(XG.ph===1){xgDuel(dt);xgLyra(dt,m);if(m&&m.hp<=m.maxhp*.5+1)xgSwitch()}
  else if(XG.ph===2){if(g&&g.hp<=g.maxhp*.4+1)xgBack();const K=KM.a;if(m&&K){}}
  else if(XG.ph===3){const a=[g,m].filter(e=>e&&!e.dead);if(a.length===2){const near=a[0].pos.distanceTo(P.pos)<a[1].pos.distanceTo(P.pos)?a[0]:a[1];if(bossRef!==near){bossRef=near;$('bossName').innerHTML=`${near.def.name} <span style="color:#ff4050">· Lv ${near.lvl}</span>`}
      xgChain(true);const c=XG.chain,A=eCenter(g),B=eCenter(m);c.position.copy(A).lerp(B,.5);c.scale.set(.6+Math.sin(time*14)*.2,A.distanceTo(B),1);c.quaternion.setFromUnitVectors(V3(0,1,0),B.clone().sub(A).normalize());c.material.opacity=.35;
      /* the Crown's judgement: a wave from Gog, a ring of lightning from Magog */
      XG.jt-=dt;if(XG.jt<=0&&g.busy<=0&&m.busy<=0&&!g.leap&&!g.dash&&!m.dash){XG.jt=DIFF==='easy'?20:15;g.busy=2.2;m.busy=2.2;x5Banner("CROWN'S JUDGEMENT",'JUMP THE WAVE · RUN FROM THE RING','#fff0a0',1.7);sx('riser',.8);c.material.opacity=1;
        after(1,()=>{if(g.dead||m.dead||XG.ph!==3)return;g.atk=.3;x5Quake(g,34,0x9dff70,2);const C=P.pos.clone();for(let k=0;k<10;k++){const an=k/10*TAU;const p=V3(C.x+Math.cos(an)*7,0,C.z+Math.sin(an)*7);after(.5+k*.06,()=>{p.y=groundAt(p.x,p.z);telegraph(p,2.4,.7,0xc8a8ff,()=>{if(!m.dead)x5Bolt(p,0xc8a8ff,m.dmg*.9,2.5)})})}})}}
    else if(a.length===1&&bossRef!==a[0]){bossRef=a[0];$('boss').classList.remove('hidden')}}}
