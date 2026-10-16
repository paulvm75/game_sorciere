/* ================= OPEN WORLD v7: people (simulation, combat, thieves) ================= */
const PK=['dy','lie','roll','bob','lean','twist','sway','thL','thR','knL','knR','spread','chest','uaLx','uaLy','uaLz','uaRx','uaRy','uaRz','elL','elR','faLy','faRy','hdLx','hdRx','nkX','hdX','hdY','hdZ'];
function newPose(){const o={};for(const k of PK)o[k]=0;return o}
const _TP=newPose();
function wArch(zn,h){const t=zn.tags||{},st=zn.style;const night=h>=22||h<6;const w={parisien:10,elderly:1.4,jogger:.7,student:1,business:1,tourist:.4,police:.3};
  if(st==='posh'){w.posh=14;w.elderly+=1.6;w.jogger+=1.4;w.parisien=4}
  if(t.tourist){w.tourist=13;w.vendor=t.pick?1.5:.5;w.pick=t.pick?1.3:0;w.busker=.25;w.police+=.4}else if(t.pick){w.pick=.8;w.tourist+=3}
  if(t.thieves){w.chat=3.4;w.market=4;w.vendor=.6}if(t.market)w.market=(w.market||0)+2;if(t.hip)w.hipster=12;if(t.students)w.student=12;
  if(t.artists){w.artist=5;w.hipster=(w.hipster||0)+3;if(zn.name==='Montmartre'){w.painter=1.4;w.busker=.7}}if(t.business)w.business=12;if(t.cafes){w.hipster=(w.hipster||0)+2;w.artist=(w.artist||0)+1.5}
  if(t.nightlife&&(h>=20||h<4))w.night=14;if(st==='suburb'){w.parisien=12;w.student+=2}if(zn.kind==='bois'){w.jogger=8;w.elderly+=2}
  if(night){w.elderly*=.2;w.jogger*=.3;w.tourist*=.5;w.night=(w.night||0)+3;if(w.chat)w.chat*=1.3}return w}
function pickArch(R,zn,h){return pickW(R,wArch(zn,h))}
function zoneDensity(zn,h){const t=zn.tags||{};let d=t.tourist||t.busy||t.market||t.thieves?1:zn.kind==='q'?.9:zn.kind==='arr'?.75:zn.kind==='bois'?.3:.5;const night=h>=22.5||h<6.5;if(night)d*=t.nightlife?1:h<5&&h>=1.5?.28:.5;return d}
function mkPerson(o){const seed=o.seed||(npcSerial++*7919+((Math.random()*1e6)|0));const R=mulberry(seed);const L=o.L||makeLook(R,o.arch,o.look||{});
  const n={seed,L,arch:o.arch,name:o.name||personName(R,L),job:o.job||personJob(R,L),age:L.age,x:o.x,z:o.z,y:0,gy:0,face:o.face||R()*TAU,spd:0,st:o.st||'walk',t:0,walkT:R()*9,pose:newPose(),expr:0,blinkT:R()*4,hp:100,frozen:0,burn:0,burnt:0,
    dist:0,special:o.special||null,vx:0,vz:0,anim:'idle',mv:0,talkCd:0,fear:0,zone:o.zone||null,pitch:L.f?rand(185,265):rand(92,150),hits:0,loot:0,vis:false,alpha:1,sh:true,cd:rand(2,8),seatY:0};
  if(L.age>65)n.pitch*=.9;n.baseSpd=o.arch==='jogger'?rand(4.2,5):o.arch==='elderly'?rand(1.1,1.5):rand(1.6,2.2);n.spd=n.baseSpd;return n}
function camDirOK(x,z,d){if(d>58)return true;const fx=-Math.sin(yaw),fz=-Math.cos(yaw);const dx=x-camera.position.x,dz=z-camera.position.z,l=Math.hypot(dx,dz)||1;return (dx*fx+dz*fz)/l<.35}
function swOff(e,k,dir,rs,lane){// offset point of polyline vertex k (float index into e.p) on the chosen sidewalk
  const p=e.p,n=p.length/2,i=k/2;const a=Math.max(0,i-1),b=Math.min(n-1,i+1);let dx=p[b*2]-p[a*2],dz=p[b*2+1]-p[a*2+1];const l=Math.hypot(dx,dz)||1;const lx=-dz/l,lz=dx/l;const sg=-rs*dir;return[p[k]+lx*lane*sg,p[k+1]+lz*lane*sg]}
function walkEdgeOK(e){return e&&e.cls>0&&e.len>4}
function npcOnEdge(n,e,dir,k){n.e=e;n.dir=dir;n.k=k;const lane=e.cls===7?e.w*rand(.1,.4):e.w/2+e.sw*rand(.68,.84);n.lane=lane;const t=swOff(e,n.k,dir,n.rs,lane);n.tx=t[0];n.tz=t[1]}
function npcSpawn(px,pz,any){for(let k=0;k<12;k++){const a=Math.random()*TAU,d=rand(any?8:24,NPC_R-6);let x=px+Math.sin(a)*d,z=pz+Math.cos(a)*d;if(!any&&!camDirOK(x,z,d))continue;const t=gType(x,z);if(t===0||t===2||t===6||t===7)continue;
    const zn=zoneAt(x,z),h=OWS.tod;const R=mulberry((Math.random()*1e9)|0);const arch=pickArch(R,zn,h);let n=null;
    const e=(t===3||t===8||t===9)?null:nearestEdge(x,z,34,walkEdgeOK);
    if(e&&arch!=='vendor'&&arch!=='busker'&&arch!=='painter'){const o={};distToEdge(e,x,z,o);const dir=Math.random()<.5?1:-1;const rs=Math.random()<.5?1:-1;const sg=-rs*dir;const L=Math.hypot(o.dx,o.dz)||1;const lane=e.cls===7?e.w*.3:e.w/2+e.sw*.76;
      x=o.x+(-o.dz/L)*lane*sg;z=o.z+(o.dx/L)*lane*sg;const tt=gType(x,z);if(tt===7||tt===2||tt===6)continue;n=mkPerson({arch,x,z,zone:zn});n.rs=rs;npcOnEdge(n,e,dir,dir>0?o.k:o.k-2);n.st='walk'}
    else if(t===3||t===4||t===8||t===9||t===1||t===5){if(blockAt(x,z,1.2))continue;if(t===5&&Math.random()<.5)continue;n=mkPerson({arch,x,z,zone:zn});n.home={x,z,r:t===4?16:12};n.st=arch==='busker'||arch==='painter'?'static':'wander';n.tx=x;n.tz=z;
      if(n.st==='static')n.anim='idle'}
    if(!n)continue;if(arch==='chat'||arch==='pick'){n.thief=arch;n.cd=rand(3,9)}if(arch==='jogger')n.anim='run';n.y=n.gy=groundAt(n.x,n.z);return n}return null}
function npcSpawnSeat(px,pz){if(!OW.seats||!OW.seats.length)return null;for(let k=0;k<4;k++){const s=OW.seats[(Math.random()*OW.seats.length)|0];if(s.used)continue;const d=Math.hypot(s.x-px,s.z-pz);if(d>NPC_R-8||d<10||!camDirOK(s.x,s.z,d))continue;
    const zn=zoneAt(s.x,s.z);const R=mulberry((Math.random()*1e9)|0);let arch=pickArch(R,zn,OWS.tod);if(arch==='chat'||arch==='pick'||arch==='vendor'||arch==='busker'||arch==='painter'||arch==='jogger'||arch==='police')arch='parisien';
    const n=mkPerson({arch,x:s.x,z:s.z,zone:zn,face:s.face});n.st='sit';n.seat=s;s.used=n;n.y=n.gy=groundAt(s.x,s.z);if(!n.L.prop&&Math.random()<.5){n.L.prop='cup';n.L.propC=new THREE.Color(0xf4f0e8)}return n}return null}
function npcRelease(k){const n=people[k];if(n.seat)n.seat.used=null;if(OWS.wandThief===n)wandBack(true);people.splice(k,1)}
/* ---------- navigation ---------- */
function npcNext(n){if(n.home){for(let k=0;k<8;k++){const a=Math.random()*TAU,r=Math.random()*n.home.r,x=n.home.x+Math.cos(a)*r,z=n.home.z+Math.sin(a)*r;const t=gType(x,z);if(t&&t!==2&&t!==6&&t!==7&&t!==10&&!blockAt(x,z,.8)){n.tx=x;n.tz=z;break}}if(Math.random()<.35){n.st='idle';n.t=rand(2,7);n.idleA=Math.random()<.3&&n.arch==='tourist'?'photo':null}else n.st='wander';return}
  const e=n.e;if(!e){n.home={x:n.x,z:n.z,r:10};return npcNext(n)}
  const last=e.p.length-2;const nk=n.k+2*n.dir;
  if(nk>=0&&nk<=last){n.k=nk;const t=swOff(e,nk,n.dir,n.rs,n.lane);n.tx=t[0];n.tz=t[1];return}
  // reached a node: pick another street
  const node=n.dir>0?e.b:e.a;const opts=(CITY.adj[node]||[]).filter(q=>q!==e&&walkEdgeOK(q));let e2=opts.length?opts[(Math.random()*opts.length)|0]:e;
  if(Math.random()<.18&&opts.length)e2=opts.reduce((a,b)=>b.cls<a.cls?b:a);
  const dir=e2===e?-n.dir:(e2.a===node?1:-1);if(e2===e)n.rs=-n.rs;npcOnEdge(n,e2,dir,dir>0?0:e2.p.length-2);
  if(Math.random()<.06&&n.arch!=='jogger'){n.st='idle';n.t=rand(1.5,5)}}
function npcReattach(n){const e=nearestEdge(n.x,n.z,40,walkEdgeOK);if(!e){n.e=null;n.home={x:n.x,z:n.z,r:10};return}const o={};distToEdge(e,n.x,n.z,o);n.dir=Math.random()<.5?1:-1;n.rs=n.rs||1;npcOnEdge(n,e,n.dir,n.dir>0?o.k:o.k-2)}
/* ---------- behaviour ---------- */
function npcScare(x,z,r,hitR=0,why){let screams=0;for(const n of people){if(n.st==='dead'||n.st==='compel'||n.frozen>0||n.special&&n.special.calm)continue;const d=Math.hypot(n.x-x,n.z-z);if(d>r)continue;
    if(n.thief==='chat'&&n.st!=='escape'&&why!=='kill'){if(Math.random()<.5){n.st='taunt';n.t=rand(1,2);n.face=Math.atan2(P.pos.x-n.x,P.pos.z-n.z);continue}}
    if(d<hitR){npcKnock(n,x,z,6)}else if(n.st!=='down'&&n.st!=='burn'&&n.st!=='escape'){if(n.st==='sit'&&n.seat){n.seat.used=null;n.seat=null}n.st=Math.random()<.18&&d<r*.5?'cower':'flee';n.t=n.st==='cower'?rand(2.5,4.5):rand(5,9);n.fleeA=Math.atan2(n.x-x,n.z-z)+rand(-.5,.5)}
    if(screams<3&&n.vis&&n.dist<45&&Math.random()<.55){screams++;scream(n,d);if(screams===1)bubble(n,pickLine('scream',n),1.6)}}return screams}
function scare(x,z,r,hitR){return npcScare(x,z,r,hitR)}
function scream(n,d){voice(n.pitch,1,{scream:true,delay:rand(0,.35),pan:clamp((n.x-P.pos.x)/30,-1,1),vol:.07/(1+d*.03)})}
function npcKnock(n,fx,fz,f){if(n.st==='dead')return;if(n.seat){n.seat.used=null;n.seat=null}const a=Math.atan2(n.x-fx,n.z-fz);n.vx=Math.sin(a)*f;n.vz=Math.cos(a)*f;n.face=a+Math.PI;n.st='down';n.t=rand(2,3.2);n.expr=3}
function npcKill(n,kind){if(n.st==='dead')return;n.st='dead';n.t=11;n.expr=3;n.frozen=0;if(n.seat){n.seat.used=null;n.seat=null}if(kind==='fire')n.burnt=.72;if(n.loot)dropLoot(n);if(OWS.wandThief===n)wandBack(false,n);
  OWS.stats.ko=(OWS.stats.ko||0)+1;if(n.dist<40){voice(n.pitch*.8,1,{vol:.05,delay:.05});SP.emit(V3(n.x,n.y+2.2,n.z),{n:10,c0:0xffffff,c1:0xfff0a0,s0:.35,s1:.05,life:1.2,up:1.6,speed:.6})}
  npcScare(n.x,n.z,24,0,'kill')}
function npcDamage(n,amt,kind,fx,fz){if(n.st==='dead')return;if(n.special&&n.special.protect){npcScare(n.x,n.z,6,0);bubble(n,pickLine('protest',n),2);return}
  if(n.frozen>0&&kind!=='ice'){n.frozen=0;shatter(V3(n.x,n.y+1.6,n.z),6,.9);npcKill(n,'shatter');return}
  if(kind==='ice'){n.frozen=rand(7,9);n.st='frozen';n.expr=2;sfx.ice&&sfx.ice();frostBurst(V3(n.x,n.y+1.4,n.z),14);if(n.seat){n.seat.used=null;n.seat=null}if(n.loot)dropLoot(n);return}
  if(n.thief){n.hits++}if(n.loot)dropLoot(n);if(OWS.wandThief===n&&(n.hits>=2||kind!=='fist'))wandBack(false,n);
  n.hp-=amt;if(kind==='fire'){n.burn=3.2;n.st='burn';n.t=3.2;n.expr=2;n.fleeA=rand(0,TAU);return}
  if(n.hp<=0){npcKill(n,kind);if(fx!==undefined){const a=Math.atan2(n.x-fx,n.z-fz);n.vx=Math.sin(a)*8;n.vz=Math.cos(a)*8}return}
  npcKnock(n,fx===undefined?P.pos.x:fx,fz===undefined?P.pos.z:fz,kind==='fist'?5:8)}
function npcNear(x,z,r,fn){for(const n of people){if(Math.abs(n.x-x)>r||Math.abs(n.z-z)>r)continue;if(Math.hypot(n.x-x,n.z-z)<r)fn(n)}}
/* ---------- spells vs people (called from spell code) ---------- */
function owCast(i,t){if(MODE!=='open')return;const id=SPELLS[i].id;const c=P.pos;
  if(id==='frost'){trfHit(c,13,'ice');after(.1,()=>npcNear(c.x,c.z,13,n=>npcDamage(n,0,'ice')));npcScare(c.x,c.z,30,0)}
  else if(id==='chains'){npcNear(c.x,c.z,17,n=>{if(n.st!=='dead'&&n.frozen<=0){n.st='bound';n.t=4.2;n.expr=2;SP.emit(V3(n.x,n.y+1.3,n.z),{n:12,c0:0xd0a0ff,c1:0x5a2ad0,s0:.5,s1:.1,life:.8,speed:2})}})}
  else if(id==='chain'){let cur=t&&t.npc?t.npc:null;if(!cur&&!enemies.some(e=>!e.dead)){let bd=30;for(const n of people){if(n.st==='dead')continue;const d=Math.hypot(n.x-c.x,n.z-c.z);if(d<bd){bd=d;cur=n}}}
    let from=orbPos();const hit=new Set();for(let hop=0;hop<6&&cur;hop++){hit.add(cur);const to=V3(cur.x,cur.y+1.6,cur.z);lightning(from,to,0xe6f0ff);npcDamage(cur,70,'zap',from.x,from.z);from=to;let nx=null,nd=14;for(const n of people){if(hit.has(n)||n.st==='dead')continue;const d=Math.hypot(n.x-cur.x,n.z-cur.z);if(d<nd){nd=d;nx=n}}cur=nx}npcScare(c.x,c.z,30,0)}
  else if(id==='inferno'){OWS.inferno=5.5}
  else if(id==='meteor'){const at=t?t.pos.clone():P.pos.clone().add(V3(Math.sin(P.face),0,Math.cos(P.face)).multiplyScalar(13));npcScare(at.x,at.z,26,0);after(1,()=>{trfHit(at,10,'fire');npcNear(at.x,at.z,10,n=>npcDamage(n,200,'fire',at.x,at.z));npcNear(at.x,at.z,17,n=>{if(n.st!=='dead')npcKnock(n,at.x,at.z,10)})})}
  else if(id==='void'){const at=t?t.pos.clone():P.pos.clone().add(V3(Math.sin(P.face),0,Math.cos(P.face)).multiplyScalar(12));OWS.voidAt={x:at.x,z:at.z,t:3.5};npcScare(at.x,at.z,22,0)}
  else{trfHit(t?t.pos:c,id==='bolt'?4:8,'stop');npcScare((t?t.pos:c).x,(t?t.pos:c).z,id==='bolt'?8:14,0)}}
function owImpact(pos,r,color){if(MODE!=='open')return;const kind=color===0xff7a2e?'fire':color===0x8fe3ff?'ice':'bolt';npcNear(pos.x,pos.z,Math.max(1.6,r||0),n=>{if(Math.abs(pos.y-n.y)>3.4)return;npcDamage(n,kind==='fire'?120:kind==='ice'?0:55,kind,pos.x,pos.z)});npcScare(pos.x,pos.z,14,0)}
function npcHitTest(p){if(MODE!=='open')return false;for(const n of people){if(n.st==='dead'||n.st==='down')continue;const S=NPC_S*n.L.h;if(Math.abs(n.x-p.x)<.55*S&&Math.abs(n.z-p.z)<.55*S&&p.y>n.y-.2&&p.y<n.y+2.5*S/1.38)return true}return false}
function owNpcTarget(range){const f=V3(Math.sin(P.face),0,Math.cos(P.face)),cf=camForward();let best=null,bs=1e9;for(const n of people){if(n.st==='dead'||n.special&&n.special.protect)continue;const dx=n.x-P.pos.x,dz=n.z-P.pos.z,d=Math.hypot(dx,dz);if(d>range||d<.5)continue;const al=(dx*cf.x+dz*cf.z)/d;if(al<.55)continue;const s=d*(1.6-al);if(s<bs){bs=s;best=n}}
  if(!best)return null;if(!best.proxy)best.proxy={pos:V3(),def:{h:2.3,r:.5,boss:false},dead:false,npc:best};best.proxy.pos.set(best.x,best.y,best.z);best.proxy.dead=false;return best.proxy}
/* ---------- fists ---------- */
let punchCd=0;
function owPunch(){if(MODE!=='open'||!P.alive||CS.active||punchCd>0||owUI)return;punchCd=.42;P.castAnim=.3;P.punchT=.38;W.aura.userData.t=0;whoosh(.18,500,1800,.1);
  after(.12,()=>{const f=V3(Math.sin(P.face),0,Math.cos(P.face));let best=null,bd=2.6;for(const n of people){if(n.st==='dead')continue;const dx=n.x-P.pos.x,dz=n.z-P.pos.z,d=Math.hypot(dx,dz);if(d>bd||Math.abs(n.y-P.pos.y)>2)continue;if(d>.6&&(dx*f.x+dz*f.z)/d<.3)continue;bd=d;best=n}
    if(best){thud(.28,140);noise(.06,.18,2400,'bandpass',null,{q:1.5});P.shake=Math.max(P.shake,.18);hitStop=.05;SP.emit(V3(best.x,best.y+2,best.z),{n:10,c0:0xffffff,c1:0xffd060,s0:.5,s1:.1,life:.35,speed:5});
      if(best.special&&best.special.protect){bubble(best,pickLine('protest',best),2);voice(best.pitch,2,{});return}
      if(OWS.wandThief===best){best.hits++;if(best.hits>=2)wandBack(false,best);else{bubble(best,'Aïe! Okay okay...',1.4);voice(best.pitch,2,{})}npcKnock(best,P.pos.x,P.pos.z,4);return}
      npcDamage(best,38,'fist',P.pos.x,P.pos.z);if(best.st!=='dead'){voice(best.pitch,1,{vol:.07,scream:false});bubble(best,pickLine('punched',best),1.6)}if(best.arch==='chat')chatGang(best);return}
    for(const e of enemies){if(e.dead)continue;if(Math.hypot(e.pos.x-P.pos.x,e.pos.z-P.pos.z)<2.4+e.def.r){damageEnemy(e,14*power(),'#ffe0a0');thud(.25,120);return}}})}
function chatGang(src){for(const n of people){if(n.arch==='chat'&&n!==src&&n.st!=='dead'&&n.frozen<=0&&Math.hypot(n.x-src.x,n.z-src.z)<30&&OWS.wandThief!==n){n.st='fight';n.t=rand(8,14)}}}
/* ---------- wand theft (Chats Noirs) & pickpockets ---------- */
let wandMesh=null;
function wandStolen(n){if(OWS.wandLost>0)return;OWS.wandLost=30;OWS.wandThief=n;n.st='escape';n.t=30;n.hits=0;n.noProp=true;
  if(!wandMesh){wandMesh=new THREE.Group();const s=new THREE.Mesh(new THREE.CylinderGeometry(.025,.035,.9,6),std({color:0x2a1a14,roughness:.4}));s.rotation.x=Math.PI/2;wandMesh.add(s);const g=glowSprite(W.orbCol||0xd8b8ff,1.6);g.position.z=.45;wandMesh.add(g);scene.add(wandMesh)}wandMesh.visible=true;
  W.orb.visible=false;W.orbGlow.visible=false;sfx.coin();noise(.3,.1,3000,'highpass');bubble(n,pickLine('stealWand',n),2.2);voice(n.pitch,3,{});
  toast(isTouch?'A Chat Noir grabbed your wand. Catch him and hit him twice (fist button) or wait 30s.':'A Chat Noir grabbed your wand. Catch him and punch him twice (R) or wait 30 seconds.','Wand stolen!',true)}
function wandBack(timeout,n){if(OWS.wandLost<=0&&!OWS.wandThief)return;OWS.wandLost=0;const th=OWS.wandThief;OWS.wandThief=null;if(th){th.noProp=false;if(th.st==='escape'){th.st='flee';th.t=6}}if(wandMesh)wandMesh.visible=false;W.orb.visible=true;W.orbGlow.visible=true;
  if(timeout)toast('Your wand wriggled free and flew back to you.','Wand back');else{toast('You got your wand back. The Chats Noirs will remember this.','Wand recovered');sfx.gem();if(th)bubble(th,pickLine('dropWand',th),2)}ring(P.pos,0xd8b8ff,1,6,.5)}
function pickpocket(n){if(OWS.euro<1){n.st='walk';return}const amt=Math.max(1,Math.min(OWS.euro,Math.round(OWS.euro*rand(.12,.25)+rand(2,6))));OWS.euro-=amt;n.loot=amt;n.st='escape';n.t=24;noise(.08,.06,5000,'highpass');tone(1800,.06,'square',.02);
  toast(`${n.name.split(' ')[0]} lifted €${amt} from your pocket and is running. Hit them to get it back.`,'Pickpocket!');OWS.stats.robbed=(OWS.stats.robbed||0)+1}
function dropLoot(n){if(!n.loot)return;const a=n.loot;n.loot=0;OWS.euro+=a;sfx.coin();floatText(V3(n.x,n.y+2.8,n.z),`+€${a}`,'#f2d060');toast('Money recovered','€'+a)}
/* ---------- pose ---------- */
function poseTarget(n,T,dt){for(const k of PK)T[k]=0;const t=time+n.seed%100;const L=n.L;let a=n.anim;const mv=n.mv;
  if(a==='walk'||a==='run'||a==='flee'||a==='burn'){const run=a!=='walk';const ph=n.walkT,s=Math.sin(ph),c=Math.cos(ph),amp=(run?.78:.44)*Math.min(1,mv+.2);
    T.thL=-s*amp;T.thR=s*amp;T.knL=.1+Math.max(0,c)*amp*(run?2:1.5);T.knR=.1+Math.max(0,-c)*amp*(run?2:1.5);T.bob=(Math.abs(c)-.5)*(run?.06:.028);T.twist=s*.09*mv;T.lean=run?.2:.04;T.sway=s*.015;
    T.uaLx=s*amp*.95;T.uaRx=-s*amp*.95;T.uaLz=T.uaRz=.06;T.elL=(run?-1.35:-.22)-Math.max(0,-s)*.3;T.elR=(run?-1.35:-.22)-Math.max(0,s)*.3;
    if(a==='flee'&&n.flail){T.uaLx=-2.2+Math.sin(ph*1.5)*.5;T.uaRx=-2.2-Math.sin(ph*1.5)*.5;T.uaLz=T.uaRz=.5;T.elL=T.elR=-.6}
    if(a==='burn'){T.uaLx=-2.6+Math.sin(t*14)*.5;T.uaRx=-2.6-Math.sin(t*13)*.5;T.uaLz=T.uaRz=.7;T.elL=T.elR=-.4}
    if(a==='walk'){if(L.idle===3&&L.prop==='phone'){T.uaRx=-.5;T.uaRz=.42;T.elR=-2.5;T.hdZ=.12}else if(L.prop==='camera'||L.prop==='cup'){T.uaRx=-.15;T.elR=-1.2}else if(L.idle===5&&L.prop==='phone'){T.uaLx=T.uaRx=-.25;T.uaLy=T.uaRy=-.35;T.elL=T.elR=-1.3;T.hdX=.35}if(L.accordion){T.uaLx=T.uaRx=-.3;T.elL=T.elR=-1.5;T.uaLy=T.uaRy=-.4}}
  }else if(a==='idle'||a==='talk'||a==='static'){T.bob=Math.sin(t*1.7)*.004;T.uaLz=T.uaRz=.08;T.elL=T.elR=-.12;T.sway=Math.sin(t*.4)*.02;const id=L.idle;
    if(n.idleA==='photo'){T.uaLx=T.uaRx=-1.1;T.elL=T.elR=-1.6;T.uaLy=T.uaRy=-.5;T.hdX=-.05}
    else if(L.accordion){const q=Math.sin(t*4);T.uaLx=T.uaRx=-.3;T.uaLz=T.uaRz=.35;T.elL=-1.5+q*.25;T.elR=-1.5-q*.25;T.uaLy=T.uaRy=-.4;T.bob=Math.abs(Math.sin(t*4))*.012;T.hdZ=Math.sin(t*2)*.08}
    else if(id===6||L.prop2==='canvas'){T.uaLx=-.6;T.elL=-1.15;T.uaRx=-1.05+Math.sin(t*3)*.18;T.elR=-.5+Math.sin(t*4)*.2;T.hdX=.1}
    else if(id===1){T.uaLx=T.uaRx=-.35;T.uaLy=T.uaRy=-1;T.elL=T.elR=-1.75;T.uaLz=T.uaRz=.02}
    else if(id===2){T.uaLx=T.uaRx=.1;T.uaLz=T.uaRz=.14;T.elL=T.elR=-.35;T.faLy=T.faRy=.3}
    else if(id===3&&L.prop==='phone'){T.uaRx=-.5;T.uaRz=.42;T.elR=-2.5;T.hdZ=.12;T.uaLx=.1;T.elL=-.3}
    else if(id===5||L.prop==='phone'){T.uaLx=T.uaRx=-.25;T.uaLy=T.uaRy=-.35;T.elL=T.elR=-1.3;T.hdX=.35}
    if(a==='talk'){T.uaRx=-.35+Math.sin(t*5)*.25;T.elR=-1.2+Math.sin(t*3.7)*.35;T.uaRy=0;T.hdX=Math.sin(t*6)*.05;T.faRy=0}
  }else if(a==='sit'){T.dy=-.42;T.thL=T.thR=-1.52;T.knL=T.knR=1.5;T.uaLx=T.uaRx=-.55;T.elL=T.elR=-.9;T.spread=.05;if(n.talking){T.uaRx=-.6+Math.sin(t*5)*.2;T.elR=-1.2+Math.sin(t*3)*.3}T.hdX=Math.sin(t*.5)*.08}
  else if(a==='thumbs'){T.uaRx=-.9;T.uaRz=.2;T.elR=-1.5;T.hdX=-.1;T.uaLz=.08}
  else if(a==='point'){T.uaRx=-1.45;T.uaRz=.15;T.elR=-.05;T.hdY=.2}
  else if(a==='wave'){T.uaRx=-.3;T.uaRz=1.9+Math.sin(t*10)*.3;T.elR=-.6}
  else if(a==='clap'){const q=Math.sin(t*18)*.14;T.uaLx=T.uaRx=-.75;T.uaLy=T.uaRy=-.55;T.elL=-1.15+q;T.elR=-1.15+q;T.bob=Math.abs(Math.sin(t*9))*.01}
  else if(a==='selfie'){T.uaRx=-1.85;T.uaRz=.3;T.elR=-.25;T.uaLx=-.9;T.elL=-1.5;T.hdZ=.15;T.hdY=.25}
  else if(a==='laugh'){T.lean=-.12+Math.sin(t*14)*.04;T.uaLx=T.uaRx=-.3;T.elL=T.elR=-1.1;T.hdX=-.25+Math.sin(t*14)*.08}
  else if(a==='shrug'){T.uaLz=T.uaRz=.35;T.elL=T.elR=-1.4;T.faLy=T.faRy=-.6;T.hdZ=.15}
  else if(a==='cower'){T.dy=-.3;T.thL=T.thR=-1.25;T.knL=T.knR=2.15;T.lean=.55;T.uaLx=T.uaRx=-2.5;T.uaLz=T.uaRz=.35;T.elL=T.elR=-1.9;T.hdX=.45;T.roll=Math.sin(t*25)*.02}
  else if(a==='down'||a==='dead'){T.lie=1;T.dy=.12;T.uaLz=T.uaRz=1.25;T.elL=T.elR=-.25;T.thL=-.08;T.thR=.06;T.spread=.12;T.hdY=.35*((n.seed%2)?1:-1);T.roll=((n.seed%3)-1)*.08}
  else if(a==='bound'){T.uaLz=T.uaRz=-.04;T.elL=T.elR=0;T.roll=Math.sin(t*30)*.03;T.hdX=Math.sin(t*9)*.1}
  else if(a==='dance'){T.bob=Math.abs(Math.sin(t*8))*.04;T.sway=Math.sin(t*4)*.12;T.twist=Math.sin(t*4)*.3;T.uaLx=-1+Math.sin(t*8)*.4;T.uaRx=-1-Math.sin(t*8)*.4;T.uaLz=T.uaRz=.9;T.elL=T.elR=-1;T.knL=.2+Math.max(0,Math.sin(t*8))*.3;T.knR=.2+Math.max(0,-Math.sin(t*8))*.3;T.thL=-T.knL*.4;T.thR=-T.knR*.4}
  else if(a==='taunt'){T.uaLz=T.uaRz=.3;T.elL=T.elR=-1.4;T.uaLx=T.uaRx=-.4;T.bob=Math.abs(Math.sin(t*10))*.03;T.hdZ=Math.sin(t*5)*.12}
  else if(a==='punch'){const k=Math.max(0,Math.sin((n.punchT||0)*Math.PI/.35));T.uaRx=-1.5*k-.2;T.elR=-1.6+k*1.5;T.uaLx=-.6;T.elL=-1.8;T.twist=-k*.3;T.lean=.1}
  else if(a==='reach'){T.uaRx=-1.2;T.elR=-.3;T.lean=.15}}
const _ALPHA={dead:4,down:7,cower:6,sit:6,frozen:0};
function animPerson(n,dt){if(n.st==='frozen')return;poseTarget(n,_TP,dt);const k=Math.min(1,dt*(_ALPHA[n.anim]||14));const p=n.pose;for(const q of PK)p[q]+=(_TP[q]-p[q])*k;
  n.blinkT-=dt;if(n.blinkT<=0){n.blinkT=rand(2.5,6);if(n.expr===0){n.expr=3;n.blinkEnd=.12}}if(n.blinkEnd!==undefined){n.blinkEnd-=dt;if(n.blinkEnd<=0){n.blinkEnd=undefined;if(n.expr===3&&n.st!=='dead'&&n.st!=='down')n.expr=0}}}
/* ---------- main update ---------- */
let npcSpawnT=0,npcAmbT=2,poshT=0,vendorT=0;
function updatePeople(dt){const px=P.pos.x,pz=P.pos.z,h=OWS.tod;punchCd=Math.max(0,punchCd-dt);
  // population
  const zn=zoneAt(px,pz);const target=Math.min(NPC_POOL,Math.round(NPC_POOL*zoneDensity(zn,h)));npcSpawnT-=dt;
  const pool=people.length-specials.length;
  if(pool<target&&npcSpawnT<=0){npcSpawnT=.05;const first=OWS.npcFill;for(let k=0;k<(first?40:3)&&people.length-specials.length<target;k++){const n=(Math.random()<.16?npcSpawnSeat(px,pz):null)||npcSpawn(px,pz,first);if(n){people.push(n);const m=duoSpawn(n);if(m)people.push(m)}}OWS.npcFill=false}
  _frM.multiplyMatrices(camera.projectionMatrix,camera.matrixWorldInverse);_frus.setFromProjectionMatrix(_frM);
  if(OWS.inferno>0){OWS.inferno-=dt;npcNear(px,pz,8.5,n=>{if(n.st!=='dead'&&n.st!=='burn')npcDamage(n,100,'fire',px,pz)})}
  if(OWS.voidAt){const v=OWS.voidAt;v.t-=dt;npcNear(v.x,v.z,16,n=>{if(n.st==='dead')return;const dx=v.x-n.x,dz=v.z-n.z,d=Math.hypot(dx,dz)||1;n.x+=dx/d*dt*6;n.z+=dz/d*dt*6;if(d<2.5&&n.st!=='down')npcKnock(n,v.x,v.z,2)});if(v.t<=0)OWS.voidAt=null}
  swimRemarks(dt);duoUpdate(dt);if(OWS.wandLost>0){OWS.wandLost-=dt;if(OWS.wandLost<=0)wandBack(true)}
  poshT-=dt;vendorT-=dt;
  for(let k=people.length-1;k>=0;k--){const n=people[k];const dx=n.x-px,dz=n.z-pz;n.dist=Math.hypot(dx,dz);
    if(!n.special&&(n.dist>NPC_R+14||n.alpha<=0)){npcRelease(k);continue}
    if(n.special&&n.dist>NPC_R*1.4){n.vis=false;continue}
    n.t-=dt;n.cd-=dt;n.talkCd-=dt;stepPerson(n,dt,px,pz);
    if(Math.abs(n.vx)+Math.abs(n.vz)>.01){n.x+=n.vx*dt;n.z+=n.vz*dt;n.vx*=Math.exp(-dt*5);n.vz*=Math.exp(-dt*5)}
    if(n.dist<1.3&&n.st!=='dead'&&n.st!=='down'&&n.st!=='sit'&&!n.special){const d=n.dist||1;n.x+=dx/d*dt*2.5;n.z+=dz/d*dt*2.5}
    if(n.st!=='sit'){const t=gType(n.x,n.z);if(t===2&&!bridgeAt(n.x,n.z)&&!n.swimming&&n.st!=='compel'&&n.st!=='swimOut'){n.x-=n.vx*dt+Math.sin(n.face)*n.spd*dt*1.2;n.z-=n.vz*dt+Math.cos(n.face)*n.spd*dt*1.2;n.fleeA=(n.fleeA||0)+Math.PI*.6;n.vx=n.vz=0}
      else if(n.st==='flee'||n.st==='escape'||n.st==='burn'||n.st==='approach'||n.st==='fight'||n.vx||n.home){const p={x:n.x,z:n.z,y:n.y};owCollideAll(p,.45,false,false);if(p.x!==n.x||p.z!==n.z){n.x=p.x;n.z=p.z;if(n.st==='flee'||n.st==='burn')n.fleeA=(n.fleeA||0)+rand(.8,1.6)}}}
    n.gy=n.fixedY!==undefined?n.fixedY:groundAt(n.x,n.z);n.y=n.st==='sit'?n.gy+.28:n.gy;
    if(n.burn>0&&n.dist<60&&Math.random()<.6)FL.emit(V3(n.x+rand(-.3,.3),n.y+rand(.5,2.4),n.z+rand(-.3,.3)),{c0:0xfff0b0,c1:0xff3000,s0:1,s1:.3,life:.5,up:3,speed:.6});
    _frS.center.set(n.x,n.y+1.3,n.z);_frS.radius=2.2;n.vis=n.dist<NPC_R+10&&_frus.intersectsSphere(_frS);
    if(CH.crowdOK){if(n.vis||n.dist<25)chStep(n,dt);if(n.vis)chDraw(n)}else{if(n.vis||n.dist<25){animPerson(n,n.dist>55?dt*1:dt)}if(n.vis)drawPerson(n)}}
  if(CH.crowdOK)chFlush();else npcFlush();
  // wand in thief hand
  if(wandMesh&&wandMesh.visible&&OWS.wandThief){const th=OWS.wandThief;wandMesh.position.set(th.x+Math.sin(th.face)*.5,th.y+1.6,th.z+Math.cos(th.face)*.5);wandMesh.rotation.y=th.face;wandMesh.rotation.x=Math.sin(time*9)*.4}
  // ambient chatter / calls
  npcAmbT-=dt;if(npcAmbT<=0){npcAmbT=rand(1.4,3.4);let best=null,bd=20;for(const n of people){if(!n.vis||n.st==='dead'||n.st==='down'||n.frozen>0)continue;if(n.dist<bd&&Math.random()<.35){bd=n.dist;best=n}}
    if(best){const line=best.dist<14&&Math.random()<.6?pickLine('ambient',best):null;if(line){bubble(best,line,2.6);sayLine(best,line,{vol:.85,amb:1});voice(best.pitch,Math.max(2,Math.round(line.length/9)),{vol:.05,pan:clamp((best.x-px)/18,-1,1)})}else voice(best.pitch,(Math.random()*4|0)+2,{vol:.028,pan:clamp((best.x-px)/18,-1,1),wet:.35})}}}
function goTo(n,tx,tz,spd,dt,arrive){const dx=tx-n.x,dz=tz-n.z,d=Math.hypot(dx,dz);if(d<(arrive||.4))return true;const s=Math.min(d,spd*dt);n.x+=dx/d*s;n.z+=dz/d*s;n.face=lerpAngle(n.face,Math.atan2(dx,dz),Math.min(1,dt*7));n.walkT+=dt*spd*3.1;n.mv=Math.min(1,spd/2);return false}
function stepPerson(n,dt,px,pz){const st=n.st;n.mv=0;const facePlayer=(r)=>{n.face=lerpAngle(n.face,Math.atan2(px-n.x,pz-n.z),Math.min(1,dt*r))};
  if(n.burn>0){n.burn-=dt;if(n.burn<=0&&n.st==='burn'){npcKill(n,'fire');return}}
  if(n.frozen>0){n.frozen-=dt;if(n.frozen<=0){n.st='flee';n.t=rand(4,7);n.fleeA=Math.atan2(n.x-px,n.z-pz);frostBurst(V3(n.x,n.y+1.4,n.z),10);n.expr=2}n.anim='frozen';return}
  if(st==='dead'){n.anim='dead';if(n.t<=0){n.alpha-=dt*1.6;if(n.alpha<=0&&n.special){n.alpha=1;n.st='static';n.hp=100;n.burnt=0}}return}
  if(st==='down'){n.anim='down';if(n.t<=0){n.st=n.thief&&n.loot?'escape':n.thief==='chat'?'fight':'flee';n.t=rand(4,7);n.fleeA=Math.atan2(n.x-px,n.z-pz);n.expr=2}return}
  if(st==='compel'){compelStep(n,dt,px,pz);return}
  if(st==='swimOut'){swimOutStep(n,dt);return}
  if(st==='duo'){n.anim=n.talkAnim==='talk'?'talk':'idle';n.talkAnim=null;if(n.duo){n.face=lerpAngle(n.face,Math.atan2(n.duo.x-n.x,n.duo.z-n.z),Math.min(1,dt*4))}if(!n.duo||n.duo.st!=='duo'){n.st='walk';n.duo=null;if(!n.e)n.home=n.home||{x:n.x,z:n.z,r:8}}return}
  if(st==='bound'){n.anim='bound';if(n.t<=0){n.st='flee';n.t=5;n.fleeA=Math.atan2(n.x-px,n.z-pz)}return}
  if(st==='burn'){n.anim='burn';n.expr=2;n.fleeA+=rand(-2,2)*dt;n.x+=Math.sin(n.fleeA)*7*dt;n.z+=Math.cos(n.fleeA)*7*dt;n.face=n.fleeA;n.walkT+=dt*22;n.mv=1;if(Math.random()<dt*2)scream(n,n.dist);return}
  if(st==='flee'){n.anim='flee';n.expr=2;if(n.flail===undefined)n.flail=Math.random()<.35;n.x+=Math.sin(n.fleeA)*6.2*dt;n.z+=Math.cos(n.fleeA)*6.2*dt;n.face=lerpAngle(n.face,n.fleeA,Math.min(1,dt*8));n.walkT+=dt*19;n.mv=1;if(n.t<=0){n.st=n.home?'wander':'walk';n.expr=0;n.flail=undefined;if(!n.home)npcReattach(n)}return}
  if(st==='cower'){n.anim='cower';n.expr=2;if(n.t<=0){n.st='flee';n.t=rand(3,6);n.fleeA=Math.atan2(n.x-px,n.z-pz)}return}
  if(st==='escape'){n.anim='flee';n.expr=1;const a=Math.atan2(n.x-px,n.z-pz);n.fleeA=lerpAngle(n.fleeA||a,a,dt*2);const sp=n.thief==='chat'?7.4:6.8;n.x+=Math.sin(n.fleeA)*sp*dt;n.z+=Math.cos(n.fleeA)*sp*dt;n.face=n.fleeA;n.walkT+=dt*20;n.mv=1;
    if(n.t<=0){n.st='walk';n.home=n.home||{x:n.x,z:n.z,r:10}}return}
  if(st==='taunt'){n.anim='taunt';n.expr=1;facePlayer(6);if(n.t<=0)n.st=n.home?'wander':'walk';return}
  if(st==='fight'){n.expr=0;const d=n.dist;facePlayer(8);if(n.punchT>0){n.punchT-=dt;n.anim='punch';return}if(d>1.6){n.anim='run';goTo(n,px,pz,5.8,dt,1.4);n.mv=1}else{n.anim='taunt';if(n.cd<=0){n.cd=rand(1,1.8);n.punchT=.35;after(.18,()=>{if(n.st==='fight'&&Math.hypot(n.x-P.pos.x,n.z-P.pos.z)<2){damagePlayer(Math.max(1,Math.round(maxHP()*.012)));thud(.15,180)}})}}
    if(n.t<=0||!P.alive){n.st='flee';n.t=5;n.fleeA=Math.atan2(n.x-px,n.z-pz)}return}
  if(st==='approach'){const d=n.dist;n.anim=n.thief==='chat'?'run':'walk';goTo(n,px,pz,n.thief==='chat'?6.8:2.6,dt,1.1);if(d<1.35&&P.alive){if(n.thief==='chat')wandStolen(n);else pickpocket(n)}if(n.t<=0||d>28)n.st='walk';return}
  if(st==='talk'){n.anim=n.talkAnim&&n.t>n.talkAnimEnd?n.talkAnim:'talk';facePlayer(5);if(n.t<=0){n.st=n.prevSt||'walk';n.talkAnim=null;n.expr=0}return}
  if(st==='pose'){n.anim=n.poseA;if(n.poseFace!==undefined)n.face=lerpAngle(n.face,n.poseFace,Math.min(1,dt*6));if(n.t<=0){n.st=n.prevSt||'walk';n.expr=0}return}
  if(st==='sit'){n.anim='sit';if(n.seat)n.face=n.seat.face;n.talking=Math.sin(time*.3+n.seed)>.5;return}
  if(st==='static'){n.anim=n.special&&n.special.anim||'static';if(n.dist<9)facePlayer(2);if(n.special&&n.special.update)n.special.update(n,dt);if(n.arch==='busker')busk(n,dt);return}
  // thieves & personalities
  if(n.thief&&n.cd<=0&&P.alive&&!CS.active&&n.dist<22){n.cd=rand(4,9);if(n.thief==='chat'&&OWS.wandLost<=0&&Math.random()<.55&&!SAFE){n.st='approach';n.t=9;return}if(n.thief==='pick'&&OWS.euro>2&&n.dist<14&&Math.random()<.45){n.st='approach';n.t=10;return}}
  if(n.arch==='posh'&&n.dist<5&&poshT<=0&&n.talkCd<=0){poshT=rand(9,16);n.talkCd=30;bubble(n,pickLine('posh',n),3);voice(n.pitch,4,{vol:.06});facePlayer(10)}
  if(n.arch==='vendor'&&n.dist<9&&vendorT<=0){vendorT=rand(7,12);bubble(n,pickLine('vendorCall',n),2.4);voice(n.pitch,4,{vol:.07})}
  if(n.arch==='night'&&n.home&&OWS.tod>21&&Math.random()<.002){n.st='pose';n.poseA='dance';n.t=rand(4,9);n.prevSt='wander'}
  if(st==='idle'){n.anim=n.idleA==='photo'?'idle':'idle';if(n.dist<6&&n.L.idle!==1)facePlayer(1.5);if(n.t<=0){n.st=n.home?'wander':'walk';n.idleA=null}return}
  // walking
  n.anim=n.arch==='jogger'?'run':'walk';const spd=n.spd*(n.arch==='jogger'?1:1);if(goTo(n,n.tx,n.tz,spd,dt)){npcNext(n)}if(n.arch==='jogger'){n.walkT+=dt*spd*.4}}
/* ---------- buskers ---------- */
function busk(n,dt){if(n.dist>28||!AC||muted)return;n.bk=(n.bk||0)-dt;if(n.bk>0)return;const sc=[62,64,66,67,69,71,73,74,76];n.bm=clamp((n.bm===undefined?4:n.bm)+((Math.random()*5)|0)-2,0,8);const bl=.19;n.bk=bl;const v=.05*clamp(1-n.dist/28,0,1),pan=clamp((n.x-P.pos.x)/20,-1,1);
  const f=440*Math.pow(2,(sc[n.bm]-69)/12);accW(f,bl*(Math.random()<.2?2:1)*.95,v,0,pan);if((n.bb=(n.bb||0)+1)%3===0)accW(f/2,bl*2.5,v*.6,0,pan)}
function accW(f,dur,vol,d,pan){if(!AC||muted)return;const t=AC.currentTime+d;const g=AC.createGain(),lp=AC.createBiquadFilter();lp.type='lowpass';lp.frequency.value=2400;g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(vol,t+.03);g.gain.setValueAtTime(vol,t+dur*.8);g.gain.linearRampToValueAtTime(0,t+dur);
  for(const m of[1.004,.996,2]){const o=AC.createOscillator();o.type=m===2?'square':'sawtooth';o.frequency.value=f*m;const og=AC.createGain();og.gain.value=m===2?.12:.45;o.connect(og);og.connect(lp);o.start(t);o.stop(t+dur+.05)}lp.connect(g);g.connect(out(null,pan,.3))}
/* ---------- swimming in the Seine ---------- */
function onSwimStart(){OWS.swimT=0;OWS.swimRemark=1.2}
function swimRemarks(dt){if(!P.swim){OWS.swimT=0;return}OWS.swimT=(OWS.swimT||0)+dt;OWS.swimRemark=(OWS.swimRemark||0)-dt;if(OWS.swimRemark>0)return;OWS.swimRemark=rand(3.5,7);
  let best=null,bd=48;for(const n of people){if(n.st==='dead'||n.st==='down'||n.frozen>0)continue;const d=Math.hypot(n.x-P.pos.x,n.z-P.pos.z);if(d<bd&&(n.arch==='posh'||Math.random()<.35)){bd=d;best=n}}
  if(!best)return;const posh=best.arch==='posh';const line=pickR(Math.random,posh?SWIM_POSH:SWIM_ANY);best.face=Math.atan2(P.pos.x-best.x,P.pos.z-best.z);if(best.st==='walk'||best.st==='wander'||best.st==='idle'){best.prevSt=best.st;best.st='pose';best.poseA=posh?'shrug':'point';best.t=2.5}
  bubble(best,line,3.2);if(typeof sayLine==='function')sayLine(best,line,{vol:.9});else voice(best.pitch,4,{vol:.07})}
const SWIM_POSH=["Ew! You're swimming in the Seine? That is disgusting.","Mon Dieu, get out of that water, you'll catch something!","In the Seine? At your age? Quelle horreur.","That water is not for swimming, madame. It is for looking at.","Please don't drip on my Hermès when you come out.","Darling, look, a witch in the river. How very... rural.","I would call the police, but they'd have to touch you.","The Olympics are over, you know."];
const SWIM_ANY=["Is she swimming in the Seine? Respect.","You're brave! Or mad. Probably both.","Hey! Watch out for the péniches!","I heard the mayor swam there once. Once.","Keep your mouth closed, that's my advice.","Bravo! Only in Paris."];
