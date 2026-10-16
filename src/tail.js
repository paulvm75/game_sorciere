/* ---------- pickups ---------- */
const stones=[],potions=[];
function spawnStones(n){for(const s of stones)scene.remove(s.g);stones.length=0;const base=Math.random()*TAU;
  for(let i=0;i<n;i++){const at=findSpot(SPAWN.x,SPAWN.z,55,130,base+i*TAU/n)||findSpot(0,40,20,120);if(!at)continue;
    const g=new THREE.Group();g.position.copy(at);const gem=new THREE.Mesh(G.shard,std({color:0x7dffe9,emissive:0x2aa090,roughness:.1,metalness:.3,flatShading:true,envMapIntensity:2}));gem.position.y=1.6;gem.scale.set(.7,1.2,.7);g.add(gem);
    {const gs=glowSprite(0x7dffe9,5);gs.position.y=1.6;g.add(gs)}
    const beam=new THREE.Mesh(new THREE.CylinderGeometry(.5,.9,90,12,1,true),new THREE.MeshBasicMaterial({color:0x5cf5dc,transparent:true,opacity:.22,blending:THREE.AdditiveBlending,depthWrite:false,side:THREE.DoubleSide,fog:false}));beam.position.y=45;g.add(beam);
    const rn=decal(runeTex,0x5cf5dc,6,true,.7);rn.position.y=.1;g.add(rn);g.userData.rn=rn;
    scene.add(g);stones.push({g,gem,pos:g.position})}}
function dropPotion(p){const g=new THREE.Group();g.position.set(p.x,groundAt(p.x,p.z),p.z);
  const b=new THREE.Mesh(lathe([[.001,0],[.28,.05],[.32,.3],[.2,.55],[.08,.62],[.08,.8],[.001,.82]],16),std({color:0xff3a5c,roughness:.05,metalness:.1,transparent:true,opacity:.85,emissive:0x801020,envMapIntensity:2}));b.position.y=.6;g.add(b);
  const s=glowSprite(0xff3a5c,2.6);s.position.y=.9;g.add(s);scene.add(g);potions.push({g,t:0,b})}
function updatePickups(dt){
  for(let i=stones.length-1;i>=0;i--){const s=stones[i];s.gem.rotation.y+=dt*2;s.gem.position.y=1.6+Math.sin(time*2+i)*.25;s.g.userData.rn.rotation.z+=dt;
    if(P.alive&&Math.hypot(s.pos.x-P.pos.x,s.pos.z-P.pos.z)<2.8&&Math.abs(P.pos.y-s.pos.y)<4){SP.emit(V3(s.pos.x,1.6,s.pos.z),{n:90,c0:0xffffff,c1:0x3fe0c8,speed:10,life:1.1,up:2,s0:.7,s1:.1});ring(s.pos,0x7dffe9,1,9,.6);scene.remove(s.g);stones.splice(i,1);
      P.stonesGot++;sfx.gem();if(P.stonesGot>=3){P.weak=false;P.stonesGot=0;P.hp=maxHP();toast('Your full strength returns','Power restored')}else toast(`${3-P.stonesGot} to go`,`Stone ${P.stonesGot} of 3`);writeSave()}}
  for(let i=potions.length-1;i>=0;i--){const p=potions[i];p.t+=dt;p.b.position.y=.6+Math.sin(p.t*3)*.15;p.b.rotation.y+=dt;
    if(p.t>45){scene.remove(p.g);potions.splice(i,1);continue}
    if(P.alive&&Math.hypot(p.g.position.x-P.pos.x,p.g.position.z-P.pos.z)<2.2&&Math.abs(P.pos.y-p.g.position.y)<3){const h=Math.round(maxHP()*.35);P.hp=Math.min(maxHP(),P.hp+h);P.mp=Math.min(maxMP(),P.mp+maxMP()*.25);P.poison=0;floatText(V3(P.pos.x,P.pos.y+3,P.pos.z),`+${h}`,'#ff8aa0');sfx.potion();SP.emit(V3(p.g.position.x,p.g.position.y+1,p.g.position.z),{n:25,c0:0xff9ab0,c1:0xff2050,speed:4,life:.7,up:2});scene.remove(p.g);potions.splice(i,1)}}}

/* ---------- xp / damage / death ---------- */
function gainXP(n){if(P.level>=MAXLV)return;P.xp+=n;while(P.level<MAXLV&&P.xp>=xpNeed(P.level)){P.xp-=xpNeed(P.level);P.level++;onLevelUp()}if(P.level>=MAXLV)P.xp=0}
function onLevelUp(){vib([40,30,80]);if(MODE!=='open'&&!bossRef)bossTimer=Math.min(bossTimer,20);P.hp=maxHP();P.mp=maxMP();sfx.level();ring(P.pos,0xf2a541,1,10,.7);runeFlash(P.pos,0xf2a541,10,1.4);
  for(let k=0;k<70;k++)SP.emit(V3(P.pos.x+rand(-1.2,1.2),P.pos.y+rand(0,3),P.pos.z+rand(-1.2,1.2)),{c0:Math.random()<.5?0xf2a541:0xc9a6ff,c1:0x402060,up:4,speed:1.5,life:1.5,s0:.6,s1:.1});
  const nu=SPELLS.findIndex(s=>s.lvl===P.level&&!s.teach);if(nu>=0&&!P.bar.includes(nu)){const free=P.bar.findIndex(x=>x==null||x<0);if(free>=0){P.bar[free]=nu;renderBar()}else after(3.5,()=>toast('Press K to open your spellbook and put it on your bar','Spellbook'))}
  if(P.level===30&&MODE!=='open')after(1.2,evolveMoment);if(MODE!=='open'&&(P.level===8||(P.level>8&&(P.level-8)%3===0)))after(4.5,()=>toast(`Your broom now flies ${flyMax().toFixed(1)} seconds`,'Longer flight'));
  if(P.level===4){toast('Jump, then jump again in mid-air to fly for 6 seconds','You can fly');P.flyMeter=flyMax()}
  else if(nu>=0){toast(`New spell: ${SPELLS[nu].name}`,`Level ${P.level}`);const k=P.bar.indexOf(nu);if(k>=0){const el=spellEls[k];el.classList.remove('pop');void el.offsetWidth;el.classList.add('pop')}}
  else toast('Your magic grows stronger',`Level ${P.level}`);
  if(nu>=0&&P.level===4)after(3.2,()=>toast(`New spell: ${SPELLS[nu].name}`,`Level ${P.level}`));
  if(nextBoss()&&!bossRef){bossTimer=Math.min(bossTimer,12);after(3.5,()=>toast('Something ancient stirs beneath the city','Beware',true))}
  writeSave()}
const vig=$('vignette');
function damagePlayer(a){if(!P.alive||P.invuln>0||CS.active||(MODE==='open'&&SAFE))return;if(P.shield>0){const ab=Math.min(P.shield,a);P.shield-=ab;a-=ab;if(W.shieldM)W.shieldM.userData.hit=.3;if(a<=0){noise(.1,.08,2400);return}}if(P.lbT>0)a*=.5;if(MODE!=='open'&&DIFF==='easy')a=Math.min(a,maxHP()*.3);P.hp-=a;if(a>maxHP()*.15)vib(35);P.lastHit=time;P.shake=Math.max(P.shake,.35);sfx.hit();vig.classList.remove('hit');void vig.offsetWidth;vig.classList.add('hit');
  floatText(V3(P.pos.x,P.pos.y+3.2,P.pos.z),`-${Math.round(a)}`,'#ff6070');if(P.hp<=0)die()}
function die(){P._diedToBoss=bossRef&&MODE!=='open'?bossRef.def.name.split(',')[0]:null;P.alive=false;P.hp=0;P.inferno=0;P.flying=false;sfx.die();
  P.deathPos=P.pos.clone();$('deathText').textContent=MODE==='open'?'Brush off the soot and get back up. The monsters will be waiting when you return.':!DF().weaken?'Brush off the soot and get back up. On easy, falling costs you nothing.':P.weak?'Weakened again. The stones have scattered anew. Recover all three to restore your power.':'You\'ll rise again, but weakened. Three power stones lie scattered across the city. Recover them to get your strength back.';
  setTimeout(()=>{$('death').classList.remove('hidden')},1300)}
function revive(){$('death').classList.add('hidden');if(FIN.ally){scene.remove(FIN.ally.g);FIN.ally=null}FIN.fight=0;if(MODE!=='open'&&!beaten.has('illusion')){P.lbStory=false;if(!FIN.sacDone)BQ.dead=false}const weaken=DF().weaken&&MODE!=='open';if(MODE==='open'&&OWS.quest&&OWS.quest.stage==='fight'){OWS.quest.stage='go';OWS.quest.left=undefined}if(weaken){P.weak=true;P.stonesGot=0;spawnStones(3)}for(const e of enemies)removeEnemy(e);enemies.length=0;bossTimer=Math.max(bossTimer,P._diedToBoss?150:(weaken?45:20));if(P._diedToBoss){const nm=P._diedToBoss;after(1.5,()=>toast(`${nm} will return in 2 minutes, or sooner when you level up. Train, then come back stronger.`,'Retreat',true))}P._diedToBoss=null;
  for(const p of eProjs)scene.remove(p.s);eProjs.length=0;
  {const d=P.deathPos||SPAWN;const s=findSpot(d.x,d.z,0,12)||SPAWN;P.pos.copy(s)}P.vy=0;P.alive=true;P.hp=maxHP();P.mp=maxMP();P.invuln=4;P.poison=P.webbed=P.chilled=0;W.body.rotation.set(0,0,0);W.body.position.y=0;
  ring(P.pos,0xb58cff,1,8,.8);if(weaken)toast('Follow the green beams to find your stones','Weakened');else toast('Back on your feet','Risen');writeSave()}

/* ---------- input ---------- */
const keys={};let yaw=0,pitch=.4,camDist=11.5,lastLook=-9,autoBolt=isTouch;
const lastMove={x:0,z:0,l:0};
addEventListener('keydown',e=>{const tg=e.target&&e.target.tagName;if(tg==='INPUT'||tg==='TEXTAREA'){if(e.code==='Escape'){e.target.blur();closeTalk();closeCompel(true)}return}if(e.repeat&&e.code==='Space'){e.preventDefault();return}keys[e.code]=true;if(!started)return;
  if(CS.active){if(e.code==='Escape')$('skipBtn').click();else if(e.code==='Space'||e.code==='Enter'){e.preventDefault();cineEl.dispatchEvent(new PointerEvent('pointerdown'))}return}
  if(e.code==='Tab'){e.preventDefault();cycleTarget();return}
  if(e.code==='KeyK'&&!(MODE==='open'&&(owUI||mapOpen||talkEl||compelEl))){toggleBook();return}if(bookOpen){if(e.code==='Escape'){toggleBook();return}const d=parseInt(e.key,10);if(d>=1&&d<=9)bookAssign(d-1);return}
  if((e.code==='Escape'&&!(MODE==='open'&&(owUI||mapOpen||actMenu)))||e.code==='KeyP'){togglePause();return}
  if(MODE==='open'){if(e.code==='Escape'&&(talkEl||compelEl)){closeTalk();closeCompel(true);return}if(e.code==='Escape'&&(owUI||mapOpen||actMenu)){closePanel();closeMap();closeActMenu();return}if(e.code==='KeyC'&&!owUI&&!mapOpen){openCompel();return}if(owUI&&!(owUI.classList.contains('metroPanel')&&e.code==='KeyM'))return;if(actMenu){const d=parseInt(e.key,10);if(d>=0&&d<=9){doAction(d===0?9:d-1);return}if(e.code==='KeyE'){closeActMenu();return}}else if(e.code==='KeyE'){doInteract();return}if(e.code==='KeyM'){if(owUI)closePanel();openMap();return}if(mapOpen)return;if(e.code==='KeyT'){perform();return}if(e.code==='KeyR'){owPunch();return}if(e.code==='KeyB'){openBag();return}}
  const sk=slotOfKey(e);if(sk>=0&&!actMenu&&!e.repeat){if(typeof bookOpen!=='undefined'&&bookOpen){bookKey(sk);e.preventDefault()}else{KEYSLOT[e.code]=sk;chargeStart(sk)}}if(e.code==='Space'){e.preventDefault();jumpHeld=true;doJump()}if(e.code==='KeyF')blink()});
addEventListener('keyup',e=>{keys[e.code]=false;if(e.code==='Space')jumpHeld=false;if(KEYSLOT[e.code]!==undefined){chargeEnd(KEYSLOT[e.code]);delete KEYSLOT[e.code]}});
addEventListener('blur',()=>{for(const k in keys)keys[k]=false;jumpHeld=false});
const joy={id:null,ox:0,oy:0,x:0,y:0},look={id:null,lx:0,ly:0,sx:0,sy:0,t:0,type:''};
const joyEl=$('joy'),knob=$('knob');
canvas.addEventListener('pointerdown',e=>{initAudio();if(!started||paused||CS.active)return;
  if(e.pointerType==='touch'&&!document.body.classList.contains('touch'))document.body.classList.add('touch');
  if(e.pointerType==='touch'&&e.clientX<innerWidth*.45&&joy.id===null){joy.id=e.pointerId;joy.ox=e.clientX;joy.oy=e.clientY;joy.x=joy.y=0;joyEl.style.left=e.clientX+'px';joyEl.style.top=e.clientY+'px';knob.style.transform='';joyEl.classList.remove('hidden')}
  else if(look.id===null){look.id=e.pointerId;look.lx=look.sx=e.clientX;look.ly=look.sy=e.clientY;look.t=performance.now();look.type=e.pointerType}
  try{canvas.setPointerCapture(e.pointerId)}catch(_){}});
canvas.addEventListener('pointermove',e=>{
  if(e.pointerId===joy.id){let dx=e.clientX-joy.ox,dy=e.clientY-joy.oy;const d=Math.hypot(dx,dy),m=52;if(d>m){dx*=m/d;dy*=m/d}joy.x=dx/m;joy.y=dy/m;knob.style.transform=`translate(${dx}px,${dy}px)`}
  else if(e.pointerId===look.id){const k=look.type==='touch'?.0075:.0048;const mx=e.clientX-look.lx,my=e.clientY-look.ly;yaw-=mx*k;pitch=clamp(pitch+my*k*.7,-.2,1.2);look.lx=e.clientX;look.ly=e.clientY;if(Math.abs(mx)+Math.abs(my)>1)lastLook=time}});
function endPointer(e){if(e.pointerId===joy.id){joy.id=null;joy.x=joy.y=0;joyEl.classList.add('hidden')}
  if(e.pointerId===look.id){const moved=Math.hypot(e.clientX-look.sx,e.clientY-look.sy);if(e.type==='pointerup'&&moved<10&&performance.now()-look.t<320){tapTarget(e.clientX,e.clientY);tryCast(0)}look.id=null}}
canvas.addEventListener('pointerup',endPointer);canvas.addEventListener('pointercancel',endPointer);
canvas.addEventListener('wheel',e=>{camDist=clamp(camDist+e.deltaY*.01,6,22);e.preventDefault()},{passive:false});
canvas.addEventListener('contextmenu',e=>e.preventDefault());

/* ---------- weather ---------- */
const snow={on:0,heavy:false,pts:null,pos:null};
{const n=2200,pos=new Float32Array(n*3);for(let i=0;i<n;i++){pos[i*3]=rand(-40,40);pos[i*3+1]=rand(0,40);pos[i*3+2]=rand(-40,40)}
  const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.BufferAttribute(pos,3));
  snow.mat=new THREE.PointsMaterial({size:.35,color:0xffffff,map:glowTex,transparent:true,opacity:0,depthWrite:false});snow.pts=new THREE.Points(g,snow.mat);snow.pts.frustumCulled=false;snow.pos=pos;snow.geo=g;scene.add(snow.pts)}
function updateSnow(dt){const want=(bossRef&&bossRef.type==='giant')||snow.force?1:0;snow.on=lerp(snow.on,want,Math.min(1,dt*.8));snow.mat.opacity=snow.on*.9;
  const fogD=.0098+snow.on*(snow.heavy?.012:.006);if(MODE!=='open')scene.fog.density=lerp(scene.fog.density,fogD,Math.min(1,dt));if(dawnK<.01)scene.fog.color.copy(FOG_NIGHT).lerp(FOG_SNOW,snow.on*.6);
  if(snow.on<.01)return;const p=snow.pos,cx=camera.position.x,cy=camera.position.y,cz=camera.position.z;
  for(let i=0;i<p.length;i+=3){p[i+1]-=dt*(3+(i%7));p[i]+=Math.sin(time+i)*dt*.8;if(p[i+1]<cy-20)p[i+1]+=40;if(p[i]<cx-40)p[i]+=80;if(p[i]>cx+40)p[i]-=80;if(p[i+2]<cz-40)p[i+2]+=80;if(p[i+2]>cz+40)p[i+2]-=80;if(p[i+1]>cy+20)p[i+1]-=40}
  snow.geo.attributes.position.needsUpdate=true}

/* ---------- update ---------- */
let started=false,paused=false,time=0,saveT=0,sparkT=0,autoT=0,poisonT=0;
const reticle=decal(runeTex,0xff5060,3,true,.9);reticle.visible=false;scene.add(reticle);
const webMesh=decal(webTex,0xffffff,2.8,false,.9);webMesh.rotation.x=0;webMesh.visible=false;scene.add(webMesh);
const mist=[];for(let i=0;i<24;i++){const m=new THREE.Sprite(new THREE.SpriteMaterial({map:smokeTex,color:0x8a80c0,transparent:true,opacity:.11,depthWrite:false}));m.scale.setScalar(rand(14,26));m.position.set(SPAWN.x+rand(-60,60),rand(1,3),SPAWN.z+rand(-60,60));m.userData.v=rand(.3,1);scene.add(m);mist.push(m)}
function updatePlayer(dt){
  for(let i=0;i<P.cds.length;i++)P.cds[i]=Math.max(0,P.cds[i]-dt);chargeTick(dt);P.chgMulT=Math.max(0,P.chgMulT-dt);if(P.shieldT>0){P.shieldT-=dt;if(P.shieldT<=0)P.shield=0}P.blinkCd=Math.max(0,P.blinkCd-dt);P.invuln=Math.max(0,P.invuln-dt);P.webbed=Math.max(0,P.webbed-dt);P.chilled=Math.max(0,P.chilled-dt);
  if(!P.alive){W.broom.visible=false;if(W.ch){animateHero(dt,0,false,time)}else{W.body.rotation.x=lerp(W.body.rotation.x,-1.45,Math.min(1,dt*4));W.body.position.y=lerp(W.body.position.y,.3,dt*4)}W.g.visible=true;const gy=groundAt(P.pos.x,P.pos.z);if(P.pos.y>gy){P.vy-=30*dt;P.pos.y=Math.max(gy,P.pos.y+P.vy*dt);W.g.position.copy(P.pos)}return}
  let ix=0,iy=0;if(keys.KeyW||keys.ArrowUp)iy-=1;if(keys.KeyS||keys.ArrowDown)iy+=1;if(keys.KeyA||keys.ArrowLeft)ix-=1;if(keys.KeyD||keys.ArrowRight)ix+=1;
  if(joy.id!==null){ix+=joy.x;iy+=joy.y}const il=Math.hypot(ix,iy);if(il>1){ix/=il;iy/=il}
  const sprint=keys.ShiftLeft||keys.ShiftRight||(joy.id!==null&&Math.hypot(joy.x,joy.y)>.93);
  if(keys.KeyQ)yaw+=dt*2.2;if(keys.KeyE&&MODE!=='open')yaw-=dt*2.2;
  const s=Math.sin(yaw),c=Math.cos(yaw);const mx=s*iy+c*ix,mz=c*iy-s*ix;const ml=Math.hypot(mx,mz);
  lastMove.l=ml;if(ml>.05){lastMove.x=mx/ml;lastMove.z=mz/ml}
  let boosting=P.flying&&MODE==='open'&&sprint&&P.boostT>0&&ml>.2;if(boosting){P.boostT-=dt;if(Math.random()<.8)SP.emit(V3(P.pos.x-Math.sin(P.face)*2,P.pos.y+.9,P.pos.z-Math.cos(P.face)*2),{n:4,c0:0xffffff,c1:0xff60c0,s0:.9,s1:.1,life:.5,speed:2})}P.boosting=boosting;
  let spd=P.flying?(MODE==='open'?(boosting?40*2.2:40):17):sprint&&ml>.5?13.5:8;if(P.swim)spd=sprint?5.5:3.6;if(P.climb||P.stairs)spd=0;P.punchT=Math.max(0,(P.punchT||0)-dt);if(MODE==='open'&&(actMenu||talkEl||compelEl))spd*=.0;if(MODE==='open'&&OWS.coffee>0)spd*=1.25;if(P.weak)spd*=.85;if(P.webbed>0)spd*=.3;if(P.chilled>0)spd*=.6;if(P.lbT>0)spd*=P.flying?1.3:1.5;
  movePlayer(mx*spd*dt,mz*spd*dt);
  // métro stairs: walk in and you go down
  if(MODE==='open'&&!CS.active){if(!P.stairs&&!P.flying&&!P.climb&&P.onGround){const E=entranceAt(P.pos.x,P.pos.z);if(E&&E.v<E.e.V0-.5){P.stairs={e:E.e,ph:'down'};closeActMenu();toast(MST[E.e.st].name,'Métro')}}
    if(P.stairs){const S=P.stairs,e=S.e,c=Math.cos(e.r),sn=Math.sin(e.r);const dx=P.pos.x-e.x,dz=P.pos.z-e.z;let v=dx*sn+dz*c;const tv=S.ph==='up'?1.4:e.V1+1.1;const dir=Math.sign(tv-v);v+=dir*Math.min(Math.abs(tv-v),dt*3);P.pos.x=e.x+sn*v;P.pos.z=e.z+c*v;P.face=Math.atan2(sn*dir,c*dir);P.heroAnim=Math.abs(tv-v)>.05?'Walk_Loop':null;
      if(S.ph==='down'&&Math.abs(tv-v)<.05){S.ph='bottom';P.heroAnim=null;openMetro(e)}else if(S.ph==='bottom'&&!owUI&&!CS.active){S.ph='up'}else if(S.ph==='up'&&Math.abs(tv-v)<.05){P.stairs=null;P.heroAnim=null;P.pos.y=groundAt(P.pos.x,P.pos.z)}
      P.pos.y=v>e.V0?groundAt(P.pos.x,P.pos.z):stairY(e,v);P.vy=0;P.onGround=true;W.g.position.copy(P.pos);W.g.rotation.y=lerpAngle(W.g.rotation.y,P.face,Math.min(1,dt*10));P.moveAmt=P.heroAnim?.35:0;animateHero(dt,P.moveAmt,false,time);return}}
  // vertical physics
  if(P.climb){const c=P.climb;c.t+=dt/c.d;const k=Math.min(1,c.t);P.pos.x=lerp(c.x0,c.x1,k);P.pos.z=lerp(c.z0,c.z1,k);P.pos.y=lerp(c.y0,c.y1,k)+Math.sin(k*Math.PI)*2.2;if(k>=1){P.climb=null;P.onGround=true;P.vy=0}}
  const gy=groundAt(P.pos.x,P.pos.z,P.pos.y);
  if(P.flying){P.flyT-=dt;const hold=jumpHeld;const tv=hold?10:(P.pos.y<gy+3?6:-.8);P.vy=lerp(P.vy,tv,Math.min(1,dt*4));if(P.pos.y>gy+45)P.vy=Math.min(P.vy,0);
    SP.emit(V3(P.pos.x-Math.sin(P.face)*1.6,P.pos.y+.9,P.pos.z-Math.cos(P.face)*1.6),{n:3,c0:0xe8d8ff,c1:0x5a2ad0,s0:.6,s1:.1,life:.7,speed:.6});
    if(P.flyT<=0){P.flying=false;P.glide=true;toast('The broom is tired. Gliding down.')}}
  else{P.vy-=(P.glide?10:30)*dt;if(P.glide)P.vy=Math.max(P.vy,-5)}
  if(!P.climb)P.pos.y+=P.vy*dt;
  const wasSwim=P.swim;P.swim=!P.flying&&!P.climb&&(MODE==='open'?owWater(P.pos.x,P.pos.z):stWater(P.pos.x,P.pos.z))&&P.pos.y<=gy+.35;
  if(P.swim&&!wasSwim){P.glide=false;const sp=V3(P.pos.x,gy+1.2,P.pos.z);for(let k=0;k<3;k++)SP.emit(sp,{n:14,c0:0xe8f4ff,c1:0x6a8aa8,s0:.5,s1:.1,life:.9,up:3.5,speed:4,jitter:.8});noise(.5,.18,900,'lowpass');thud(.3,70);if(typeof onSwimStart==='function')onSwimStart()}
  if(P.swim){P.vy=Math.max(P.vy,-2);if(P.pos.y<gy)P.pos.y=lerp(P.pos.y,gy,Math.min(1,dt*5));if(Math.random()<dt*6*Math.min(1,ml+.2))SP.emit(V3(P.pos.x,gy+1.2,P.pos.z),{n:2,c0:0xffffff,c1:0x8aa8c8,s0:.35,s1:.05,life:.5,up:.6,speed:1,flat:true})}
  if(P.pos.y<=gy&&!P.swim){if(!P.onGround&&P.vy<-10){sfx.land();SM.emit(V3(P.pos.x,gy+.2,P.pos.z),{n:10,c0:0x6a6080,c1:0x2a2438,s0:1,s1:3,speed:3,flat:true,life:.8,a:.4})}
    P.pos.y=gy;if(P.vy<0)P.vy=0;if(!P.flying){P.onGround=true;P.glide=false}}
  else if(P.pos.y>gy+.08)P.onGround=false;
  if(!P.flying)P.flyMeter=Math.min(flyMax(),P.flyMeter+dt*(P.onGround?(MODE==='open'?1.8:.75):.15));
  P.moveAmt=lerp(P.moveAmt,Math.min(1,ml)*(sprint?1.4:1),Math.min(1,dt*8));footTick(dt);
  if(P.castAnim>0)P.castAnim-=dt;else if(ml>.05)P.face=Math.atan2(mx,mz);
  W.g.rotation.y=lerpAngle(W.g.rotation.y,P.face,Math.min(1,dt*12));
  if(ml>.15&&look.id===null&&time-lastLook>.9&&iy<.35){const want=Math.atan2(mx,mz)+Math.PI;yaw=lerpAngle(yaw,want,Math.min(1,dt*1.9*ml*(1-Math.max(0,iy))))}
  P.mp=Math.min(maxMP(),P.mp+(6.5+P.level*.6)*dt);if(time-P.lastHit>DF().regenDelay)P.hp=Math.min(maxHP(),P.hp+maxHP()*(MODE==='open'?.02:DF().regen)*dt);P.hp=Math.min(P.hp,maxHP());
  if(P.poison>0){P.poison-=dt;poisonT-=dt;if(poisonT<=0){poisonT=.6;const d=Math.max(1,Math.round(maxHP()*.012));P.hp-=d;floatText(V3(P.pos.x,P.pos.y+2.8,P.pos.z),`-${d}`,'#8aff6a');if(P.hp<=0)die()}if(Math.random()<.3)SP.emit(V3(P.pos.x,P.pos.y+1.5,P.pos.z),{c0:0x8aff6a,c1:0x204010,s0:.4,s1:.1,life:.7,up:1,jitter:.5})}
  if(P.chilled>0&&Math.random()<.4)SP.emit(V3(P.pos.x,P.pos.y+1.5,P.pos.z),{c0:0xffffff,c1:0x60c8ff,s0:.4,s1:.1,life:.7,up:.5,jitter:.6});
  webMesh.visible=P.webbed>0;if(webMesh.visible){webMesh.position.set(P.pos.x,P.pos.y+1.2,P.pos.z);webMesh.lookAt(camera.position);webMesh.material.opacity=Math.min(1,P.webbed)*.85}
  W.g.position.copy(P.pos);P.walkT+=dt*P.moveAmt*9;
  W.broom.visible=P.flying||P.glide||BRM.drop;
  if(W.ch){if(W.broom.visible){W.body.position.y=lerp(W.body.position.y,.42+Math.sin(time*3)*.08,dt*6);W.body.rotation.x=lerp(W.body.rotation.x,-.08+(P.vy>2?-.12:0),dt*6);W.body.rotation.z=Math.sin(time*2)*.04;W.broom.rotation.x=W.body.rotation.x*.6;W.broom.position.y=.95+W.body.position.y-.42}else{W.body.position.y=lerp(W.body.position.y,0,Math.min(1,dt*10));W.body.rotation.x=lerp(W.body.rotation.x,0,Math.min(1,dt*10));W.body.rotation.z=0}}
  else if(W.broom.visible){W.body.position.y=lerp(W.body.position.y,.25+Math.sin(time*3)*.08,dt*6);W.body.rotation.x=lerp(W.body.rotation.x,-.3+(P.vy>2?-.2:0),dt*6);W.body.rotation.z=Math.sin(time*2)*.05;W.broom.rotation.x=W.body.rotation.x*.6;W.broom.position.y=.95+W.body.position.y;W.cape.rotation.x=1.1+Math.sin(time*9)*.1}
  else{const air=!P.onGround;W.body.position.y=Math.abs(Math.sin(P.walkT))*.12*P.moveAmt;W.body.rotation.x=air?-.15:P.moveAmt*.12;W.body.rotation.z=Math.sin(P.walkT)*.04*P.moveAmt;W.cape.rotation.x=.16+P.moveAmt*.55+(air?.4:0)+Math.sin(time*3)*.05}
  const ca=P.castAnim>0?Math.sin((P.castAnim/.35)*Math.PI):0;W.castArm.rotation.x=W.castBase-ca*1.1+Math.sin(time*1.6)*.04;animateHero(dt,P.moveAmt,!P.onGround,time);
  heroShadow.position.set(P.pos.x,groundAt(P.pos.x,P.pos.z)+.06,P.pos.z);heroShadow.material.opacity=.55/(1+Math.max(0,P.pos.y-groundAt(P.pos.x,P.pos.z))*.3);
  const at=W.aura.userData.t||0;if(at>0){W.aura.userData.t=at-dt;const k=1-(at-dt)/.6;W.aura.material.opacity=Math.sin(Math.min(1,k)*Math.PI)*.9;W.aura.scale.setScalar(.7+k*.5);W.aura.rotation.z+=dt*3}else W.aura.material.opacity=0;
  W.g.visible=P.invuln>0&&P.invuln<3.9?Math.floor(time*12)%2===0||P.invuln<.4:true;
  const gl=P.weak?.45:1;W.orbGlow.material.opacity=gl*(.8+Math.sin(time*5)*.2);W.orbM.color.setHex(P.weak?0x8a8499:W.orbCol);
  if(Math.random()<.25)SP.emit(orbPos(),{c0:P.weak?0x8a8499:W.orbCol,c1:0x3a1a80,s0:.3,s1:.05,life:.8,up:.6,speed:.4});
  if(P.inferno>0){P.inferno-=dt;infernoLight.intensity=2.6+Math.random()*.8;infernoLight.position.set(P.pos.x,P.pos.y+2,P.pos.z);
    for(let k=0;k<14;k++){const a=rand(0,TAU),r=rand(5.5,8);FL.emit(V3(P.pos.x+Math.sin(a)*r,P.pos.y+.4,P.pos.z+Math.cos(a)*r),{c0:0xfff0b0,c1:0xff2000,s0:2,s1:.5,life:.55,up:rand(3,6),speed:.8})}
    if(Math.random()<.4){const a=rand(0,TAU);SM.emit(V3(P.pos.x+Math.sin(a)*7,P.pos.y+2.5,P.pos.z+Math.cos(a)*7),{c0:0x3a2a28,c1:0x0a0606,s0:2,s1:6,life:1.6,up:3,a:.4})}
    for(const e of enemies){if(e.dead)continue;const d=Math.hypot(e.pos.x-P.pos.x,e.pos.z-P.pos.z);if(d<9){burn(e,1.5,34*power());if(!e.def.boss&&d<5.5){e.pos.x+=(e.pos.x-P.pos.x)/(d||1)*dt*6;e.pos.z+=(e.pos.z-P.pos.z)/(d||1)*dt*6}}}
  }else infernoLight.intensity=lerp(infernoLight.intensity,0,dt*5);
  if(autoBolt){autoT-=dt;if(autoT<=0){autoT=.34;const t=findTarget(30);if(t&&P.cds[0]<=0&&P.mp>=SPELLS[0].cost+6&&!CHG&&!(P.chgMulT>0)){BOLT_AUTO=1;try{tryCast(0)}finally{BOLT_AUTO=0}}}}
  moonLight.position.set(P.pos.x+SUN_OFF.x,P.pos.y+SUN_OFF.y,P.pos.z+SUN_OFF.z);moonLight.target.position.set(P.pos.x,P.pos.y,P.pos.z);
}
function updateProjs(dt){
  for(let i=projs.length-1;i>=0;i--){const p=projs[i];
    if(p.homing&&p.target&&!p.target.dead&&!p.hits.has(p.target)){tv.copy(eCenter(p.target)).sub(p.pos).normalize().multiplyScalar(p.speed);p.vel.lerp(tv,Math.min(1,dt*p.homing))}
    p.pos.addScaledVector(p.vel,dt);p.life-=dt;if(p.trail)p.trail(p);if(p.mesh)p.mesh.lookAt(tv.copy(p.pos).add(p.vel));
    let hit=null;for(const e of enemies){if(e.dead||p.hits.has(e))continue;const c=eCenter(e);if(c.distanceToSquared(p.pos)<Math.pow(e.def.r+.55+e.def.h*.15,2)){hit=e;break}}
    const wall=p.pos.y<groundAt(p.pos.x,p.pos.z)-.05||(MODE==='open'&&npcHitTest(p.pos));
    if(hit&&p.pierce>0){p.hits.add(hit);curProj=p;damageEnemy(hit,p.dmg,'#bff2ff');curProj=null;if(p.onHit&&!hit.dead)p.onHit(hit);p.pierce--;if(p.pierce>0)continue}
    if(hit||wall||p.life<=0){
      if(p.aoe){if(hit){damageEnemy(hit,p.dmg,'#ffb070');if(p.onAoe&&!hit.dead)p.onAoe(hit)}explode(p.pos,p.aoe,p.dmg*p.splash,p.color,false,hit,p.onAoe)}
      else if(hit&&p.pierce===0&&!p.hits.has(hit)){curProj=p;damageEnemy(hit,p.dmg,'#e3d0ff');curProj=null;if(p.onHit&&!hit.dead)p.onHit(hit)}
      if(MODE==='open')owImpact(p.pos,p.aoe||1.4,p.color);
      if(p.mesh)shatter(p.pos.clone(),4,.6);else SP.emit(p.pos,{n:14,c0:0xffffff,c1:p.color,speed:5,life:.35,s0:.5,s1:.1});
      scene.remove(p.g);p.g.children.forEach(c=>{if(c.material&&!c.material.__shared)c.material.dispose()});projs.splice(i,1)}}
  const pc=V3(P.pos.x,P.pos.y+1.2,P.pos.z);
  for(let i=eProjs.length-1;i>=0;i--){const p=eProjs[i];
    if(p.homing&&P.alive){tv.copy(pc).sub(p.pos).normalize().multiplyScalar(p.speed);p.vel.lerp(tv,Math.min(1,dt*p.homing))}
    p.pos.addScaledVector(p.vel,dt);p.life-=dt;SP.emit(p.pos,{c0:p.color,c1:0x300010,s0:.6,s1:.1,life:.3});
    const d=p.pos.distanceTo(pc);const wall=p.pos.y<groundAt(p.pos.x,p.pos.z)-.05;
    if(d<1.25||wall||p.life<=0){if(d<1.25){damagePlayer(p.dmg);if(p.web){P.webbed=2.2;toast('Webbed! Blink to break free')}}SP.emit(p.pos,{n:12,c0:0xffffff,c1:p.color,speed:4,life:.3});scene.remove(p.s);p.s.material.dispose();eProjs.splice(i,1)}}
}
function updateFx(dt){for(let i=timers.length-1;i>=0;i--){timers[i].t-=dt;if(timers[i].t<=0){const f=timers[i].fn;timers.splice(i,1);f()}}
  for(let i=fxList.length-1;i>=0;i--){const f=fxList[i];f.t+=dt;const k=Math.min(1,f.t/f.dur);if(f.update)f.update(f,k);if(f.t>=f.dur){if(f.obj){scene.remove(f.obj);disposeObj(f.obj)}fxList.splice(i,1);if(f.end)f.end()}}
  flashI*=Math.exp(-dt*7);flashLight.intensity=flashI}
const camTarget=V3(),camDesired=V3();let camTrees=[],camWalls=[],camNearT=0;
function camBlocked(x,y,z){if(MODE==='open'&&VIN){const l=vLocal(V3(x,y,z));return Math.abs(l.x)>VIN.R.W-.3||Math.abs(l.z)>VIN.R.D-.3||l.y>VIN.R.H-.3||l.y<.3}if(y<groundAt(x,z)+.8)return true;if(y>1&&y<8)for(const t of camTrees)if(Math.abs(t[0]-x)<2.6*t[2]&&Math.abs(t[1]-z)<2.6*t[2])return true;for(const b of camWalls)if(x>b.x0&&x<b.x1&&z>b.z0&&z<b.z1&&y<b.h)return true;return false}
function updateCamera(dt){camNearT-=dt;if(camNearT<=0){camNearT=.3;const px=P.pos.x,pz=P.pos.z;camTrees=treeList.filter(t=>Math.abs(t[0]-px)<32&&Math.abs(t[1]-pz)<32);camWalls=boxes.filter(b=>!b.block&&!b.car&&b.x1>px-32&&b.x0<px+32&&b.z1>pz-32&&b.z0<pz+32)}camTarget.set(P.pos.x,P.pos.y+2.3,P.pos.z);let dist=camDist+(bossRef?(bossRef.type==='giant'?7:3):0)+(P.flying?3:0);const ox=Math.sin(yaw)*Math.cos(pitch),oy=Math.sin(pitch),oz=Math.cos(yaw)*Math.cos(pitch);
  for(let k=0;k<10;k++){const cx=camTarget.x+ox*dist,cz=camTarget.z+oz*dist,cy=camTarget.y+oy*dist;let ok=!camBlocked(cx,cy,cz);if(ok){for(const f of[.35,.65]){if(camBlocked(lerp(camTarget.x,cx,f),lerp(camTarget.y,cy,f),lerp(camTarget.z,cz,f))){ok=false;break}}}if(ok)break;dist*=.8}
  camDesired.set(camTarget.x+ox*dist,Math.max(camTarget.y+oy*dist,MODE==='open'&&VIN?VIN.floor+.6:groundAt(camTarget.x+ox*dist,camTarget.z+oz*dist)+.8),camTarget.z+oz*dist);camera.position.lerp(camDesired,1-Math.exp(-dt*12));
  if(P.shake>0){camera.position.x+=rand(-1,1)*P.shake*.35;camera.position.y+=rand(-1,1)*P.shake*.35;P.shake*=Math.exp(-dt*7);if(P.shake<.01)P.shake=0}
  camera.lookAt(camTarget);pLight.position.set(P.pos.x,P.pos.y+3,P.pos.z)}
function updateWorld(dt){const t=P.alive?findTarget(50):null;reticle.visible=!!t;if(t){reticle.position.set(t.pos.x,t.pos.y+.14,t.pos.z);reticle.scale.setScalar(t.def.r*1.2+.6);reticle.rotation.z+=dt*2;reticle.material.color.setHex(t.def.boss?0xff3050:0xff8a60)}
  for(const m of mist){m.position.x+=m.userData.v*dt;if(Math.abs(m.position.x-P.pos.x)>60||Math.abs(m.position.z-P.pos.z)>60){m.position.set(P.pos.x+rand(-55,55),rand(1,3),P.pos.z+rand(-55,55))}}
  updateLampLights(dt);updateSnow(dt)}

/* ---------- HUD ---------- */
const hpFill=$('hpFill'),mpFill=$('mpFill'),hpText=$('hpText'),mpText=$('mpText'),xpText=$('xpText'),lvlEl=$('lvl'),medal=$('medal'),stonesEl=$('stones'),gemEls=[...stonesEl.querySelectorAll('.gems i')];
let hudCache='';
function updateHUD(){const mh=maxHP(),mm=maxMP();hpFill.style.transform=`scaleX(${Math.max(0,P.hp/mh)})`;mpFill.style.transform=`scaleX(${P.mp/mm})`;
  const key=`${Math.ceil(P.hp)}|${mh}|${Math.floor(P.mp)}|${mm}|${P.level}|${P.xp}|${P.weak}|${P.stonesGot}`;
  if(key!==hudCache){hudCache=key;hpText.textContent=`${Math.max(0,Math.ceil(P.hp))} / ${mh}`;mpText.textContent=`${Math.floor(P.mp)} / ${mm}`;lvlEl.textContent=P.level;
    const need=xpNeed(P.level);medal.style.setProperty('--xp',(P.level>=MAXLV?1:P.xp/need)+'turn');xpText.textContent=P.level>=MAXLV?`Level ${MAXLV}, the night is yours`:`${P.xp} / ${need} xp to level ${P.level+1}`;
    stonesEl.classList.toggle('hidden',!P.weak);vig.classList.toggle('weak',P.weak);gemEls.forEach((g,i)=>g.classList.toggle('on',i<P.stonesGot));$('flyMeter').classList.toggle('hidden',P.level<4&&MODE!=='open')}
  spellEls.forEach((el,k)=>{const i=P.bar[k];const s=i!=null&&i>=0?SPELLS[i]:null;if(!s){el.style.setProperty('--p',0);return}const locked=!spellKnown(s);el.classList.toggle('locked',locked);const lv=el.querySelector('.lv');const txt=locked?(s.teach?'Bilel':`Lv ${s.lvl}`):'';if(lv.textContent!==txt)lv.textContent=txt;
    el.style.setProperty('--p',locked?0:(P.cds[i]/s.cd).toFixed(3));el.classList.toggle('dry',!locked&&P.mp<s.cost);el.style.setProperty('--g',CHG&&CHG.k===k?Math.min(1,CHG.t/CHG_MAX).toFixed(3):0)});
  blinkEl.style.setProperty('--p',(P.blinkCd/2.4).toFixed(3));const fm=flyMax();const f=P.level>=4||MODE==='open'?(P.flying?P.flyT/Math.max(fm,BRM.cap||0):BRM.left>0?BRM.left/Math.max(fm,BRM.cap||0):P.flyMeter/fm):0;if(boostFill)boostFill.style.transform=`scaleX(${P.flying&&MODE==='open'?Math.max(0,P.boostT/5):0})`;jumpEl.style.setProperty('--f',f.toFixed(3));$('flyFill').style.transform=`scaleX(${f})`;
  if(gradePass)gradePass.uniforms.uWeak.value=lerp(gradePass.uniforms.uWeak.value,P.weak||FIN.grief?1:0,FIN.grief?.08:.05)}
function drawMinimap(){if(MODE==='open'){owMinimap();return}const S=mapCv.width,c=S/2,sc=c/70;mctx.clearRect(0,0,S,S);mctx.save();mctx.beginPath();mctx.arc(c,c,c,0,TAU);mctx.clip();
  mctx.fillStyle='#15122c';mctx.fillRect(0,0,S,S);mctx.translate(c,c);mctx.rotate(yaw);mctx.scale(sc,sc);mctx.drawImage(worldMap,-(P.pos.x-MAPOX),-(P.pos.z-MAPOZ));
  for(const e of enemies){if(e.dead)continue;mctx.fillStyle=e.def.boss?'#ff3050':e.elite?'#ffc040':'#ff6a7a';const r=e.def.boss?4:1.8;mctx.beginPath();mctx.arc(e.pos.x-P.pos.x,e.pos.z-P.pos.z,r,0,TAU);mctx.fill()}
  for(const p of potions){mctx.fillStyle='#ff8aa0';mctx.fillRect(p.g.position.x-P.pos.x-1.2,p.g.position.z-P.pos.z-1.2,2.4,2.4)}
  const marks=stones.map(s=>[s.pos,'#7dffe9']);if(BQ.npc&&BQ.active())marks.push([{x:BQ.x,z:BQ.z},'#4dff7a']);if(bossRef)marks.push([bossRef.pos,'#ff3050']);if(MODE==='open'&&OWS.quest)marks.push([{x:OWS.quest.x,z:OWS.quest.z},'#f2c14a']);
  for(const[pos,col]of marks){let x=pos.x-P.pos.x,z=pos.z-P.pos.z;const d=Math.hypot(x,z);if(d>64){x*=64/d;z*=64/d}mctx.save();mctx.translate(x,z);mctx.rotate(Math.PI/4);mctx.fillStyle=col;mctx.shadowColor=col;mctx.shadowBlur=8;mctx.fillRect(-2.6,-2.6,5.2,5.2);mctx.restore()}
  mctx.restore();mctx.fillStyle='#f2a541';mctx.beginPath();mctx.moveTo(c,c-9);mctx.lineTo(c+6,c+6);mctx.lineTo(c,c+2);mctx.lineTo(c-6,c+6);mctx.closePath();mctx.fill()}

/* ---------- story ---------- */
const headOf=(p,h)=>V3(p.x,p.y+h,p.z);
function witchShot(side=1,dist=4.5,h=2.4){return()=>{const f=V3(Math.sin(P.face),0,Math.cos(P.face));const r=V3(f.z,0,-f.x);return{pos:headOf(P.pos,h).addScaledVector(f,dist).addScaledVector(r,side*1.6),look:headOf(P.pos,1.95)}}}
function overShoulder(target,th){return()=>{const d=V3(target.x-P.pos.x,0,target.z-P.pos.z).normalize();const r=V3(d.z,0,-d.x);return{pos:headOf(P.pos,3).addScaledVector(d,-4.5).addScaledVector(r,1.8),look:headOf(target,th)}}}
function faceBoss(e){faceTo(e.pos);e.m.g.rotation.y=Math.atan2(P.pos.x-e.pos.x,P.pos.z-e.pos.z)}
function playIntro(done){const eif=V3(EIFFEL.x,30,EIFFEL.z);const f=()=>V3(Math.sin(P.face),0,Math.cos(P.face));
  playCutscene([
    {dur:5,fov:50,cam:pushShot(V3(30,5,0),V3(-60,8,3),eif)},
    {dur:4,fov:45,cut:true,cam:pushShot(V3(-40,22,40),V3(-92,38,62),V3(EIFFEL.x,55,EIFFEL.z))},
    {dur:3.2,fov:34,cut:true,cam:(k)=>{const e=k*k*(3-2*k);return{pos:headOf(P.pos,.5+e*1.9).addScaledVector(f(),2.8+e*.8),look:headOf(P.pos,.4+e*1.9)}}},
    {who:'@',text:'Paris, after midnight. Too quiet for my taste.',cut:true,cam:witchShot(1,3.6)},
    {who:'@',text:'Something is crawling up from the catacombs. Pigs with too many teeth. Spiders the size of dogs.',cam:witchShot(-1,4.6,2.7)},
    {who:'@',text:'Fine. Let\'s clean up my city before dawn.',cut:true,cam:(k)=>{const b=witchShot(1,3,2.3)();b.pos.y+=k*.5;return b}}
  ],done)}
function bossIntro(e){const def=e.def;e.invuln=true;faceBoss(e);P.flying=false;P.glide=true;
  const boss=e.pos,H=def.h;const idle=(dt)=>{e.t+=dt;animateEnemy(e,dt,0)};
  const done=()=>{e.invuln=false;$('boss').classList.remove('hidden');toast(def.final?'The final battle begins':'Defeat it to move on',def.name,true);musicT=0};
  sfx.bossIn();P.shake=.6;
  const lines={
    kitsune:[['Hakuko','A little witch with a stick, wandering my streets. How charming.',0],['@','Take off the mask. Let\'s see who\'s hiding under there.',1],['Hakuko','No one has seen my face and lived.',0]],
    beast:[['@','That\'s not a fox. That\'s a nightmare with nine tails.',1],['The Nine-Tails','YOU KILLED MY LITTLE SISTER, WITCH. NINE TAILS. NINE FIRES. ONE OF YOU.',0],['@','I\'ve always liked a bonfire.',1]],
    giant:[['Hrímgar','Little flame. I froze this river when your city was still a swamp.',0],['@','Then you\'ve never met a witch from Paris.',1],['Hrímgar','Come. Let the winter take you.',0]]}[e.type]||BOSS_LINES[e.type]||[];
  const shots=[{dur:e.type==='giant'?4:3,cam:e.type==='giant'?(k)=>{const d=V3(P.pos.x-boss.x,0,P.pos.z-boss.z).normalize();return{pos:headOf(boss,1.5+k*3).addScaledVector(d,16),look:headOf(boss,lerp(2,H*.85,k))}}:orbitShot(boss,H*1.6+3,H*.4,e.m.g.rotation.y-.9,e.m.g.rotation.y+.4,H*.6),
    title:[def.name.split(', ')[0],def.name.split(', ')[1]||(def.final?'Final boss':'Boss')],onStart:()=>{runeFlash(boss,0xff3050,16,2);SM.emit(headOf(boss,1),{n:40,c0:0x301020,c1:0x080408,s0:3,s1:9,speed:5,up:2,life:2.2,a:.7});if(e.type==='giant')snow.force=true;if(e.type==='beast'){sfx.roarBeast();P.shake=1}},update:idle}];
  for(const[who,text,side]of lines){shots.push({who,text,update:idle,cut:true,cam:side?overShoulder(boss,H*.7):()=>{const d=V3(P.pos.x-boss.x,0,P.pos.z-boss.z).normalize();const r=V3(d.z,0,-d.x);return{pos:headOf(boss,H*.85).addScaledVector(d,H*.9+3).addScaledVector(r,1.5),look:headOf(boss,H*.8)}},onStart:()=>{if(ROARERS.has(who)){sfx.roar();P.shake=.5}}})}
  playCutscene(shots,()=>{snow.force=false;done()})}
function bossOutro(type,c){const center=c.clone();const orb=(k)=>({pos:V3(center.x+Math.sin(k*1.2)*10,center.y+4,center.z+Math.cos(k*1.2)*10),look:center});
  if(type==='kitsune')playCutscene([{who:'Hakuko',text:'You are stronger than you look, witch. But he will smell my blood.',cam:orb},{who:'Hakuko',text:'The Nine-Tails is coming.',cam:orb},{who:'@',text:'Let him come. I\'ll be ready.',cam:witchShot(1,4)}],()=>toast('Reach level 10 to face the Nine-Tails','Boss defeated'));
  else if(type==='beast')playCutscene([{who:'The Nine-Tails',text:'The seal... breaks... they are... free...',cam:orb,onStart:()=>{sfx.roarBeast()}},{dur:2.5,cam:(k)=>({pos:V3(center.x,center.y+25+k*10,center.z+20),look:center}),onStart:()=>{for(let k=0;k<6;k++){const s=findSpot(center.x,center.z,8,25);if(s)runeFlash(s,0xff4020,6,2)}}},
    {who:'@',text:'Who\'s free? Oh. Demons. Wonderful.',cam:witchShot(-1,4)}],()=>{toast('Demons now roam the streets. Reach level 15.','The seal is broken',true);for(let k=0;k<3;k++){const s=findSpot(P.pos.x,P.pos.z,20,30);if(s)spawnEnemy('demon',s)}});
  else bossOutro2(type,center,orb)}

/* ---------- quality ---------- */
let quality=isTouch?2:3,fpsAcc=0,fpsN=0,fpsT=0,userGfx=false;
function setQuality(q){quality=q;moonLight.castShadow=q>=2;if(q>=2&&moonLight.shadow.map){const sz=q>=3?2048:1024;if(moonLight.shadow.mapSize.x!==sz){moonLight.shadow.mapSize.set(sz,sz);moonLight.shadow.map.dispose();moonLight.shadow.map=null}}
  FUR_N.value=q>=3?7:q>=2?4:0;lampLights.forEach(l=>l.visible=q>=2);useComposer=q>=1&&!!composer;if(bloomPass)bloomPass.enabled=q>=1;if(fxaaPass)fxaaPass.enabled=q>=2;
  const pr=q===0?1:Math.min(window.devicePixelRatio||1,q>=3?2:1.5);if(pr!==renderer.getPixelRatio()){renderer.setPixelRatio(pr);resize()}
  $('gfxBtn').textContent='Graphics: '+['low','medium','high','ultra'][q]}
function trackFps(dt){if(userGfx)return;if(MODE==='open'&&quality<=2)return;fpsAcc+=dt;fpsN++;fpsT+=dt;if(fpsT>4){const fps=fpsN/fpsAcc;fpsAcc=fpsN=fpsT=0;if(fps<34&&quality>0)setQuality(quality-1)}}

/* ---------- ambient ---------- */
const clouds=[];for(let i=0;i<16;i++){const m=new THREE.Sprite(new THREE.SpriteMaterial({map:smokeTex,color:0x4a4080,transparent:true,opacity:.5,depthWrite:false,fog:false}));const a=rand(0,TAU),r=rand(150,380);m.position.set(Math.cos(a)*r,rand(110,170),Math.sin(a)*r);m.scale.set(rand(120,220),rand(40,70),1);m.userData.v=rand(1,3);SKY.add(m);clouds.push(m)}
const moteN=90,motePos=new Float32Array(moteN*3);for(let i=0;i<moteN*3;i++)motePos[i]=rand(-14,14);
const moteGeo=new THREE.BufferGeometry();moteGeo.setAttribute('position',new THREE.BufferAttribute(motePos,3));
const motes=new THREE.Points(moteGeo,new THREE.PointsMaterial({size:.16,color:0xffd8a0,map:glowTex,transparent:true,opacity:.7,depthWrite:false,blending:THREE.AdditiveBlending}));motes.frustumCulled=false;scene.add(motes);
function updateAmbient(dt){for(const c of clouds){c.position.x+=c.userData.v*dt;if(c.position.x>400)c.position.x=-400;c.material.color.setHex(0x4a4080).lerp(new THREE.Color(0xffb0a0),dawnK)}
  motes.position.set(P.pos.x,P.pos.y+2,P.pos.z);const t=performance.now()*.0003;for(let i=0;i<moteN;i++){motePos[i*3+1]+=Math.sin(t*3+i)*.004;motePos[i*3]+=Math.cos(t*2+i*1.3)*.004}moteGeo.attributes.position.needsUpdate=true;motes.material.opacity=.6*(1-dawnK*.7)}
/* ---------- loop ---------- */
let last=performance.now();
let hitStop=0;
function frame(now){requestAnimationFrame(frame);let dt=Math.min(.05,(now-last)/1000);last=now;if(hitStop>0){hitStop-=dt;dt*=.15}
  updateAmbient(dt);
  waterTex.offset.x+=dt*.012;waterN.offset.x+=dt*.02;waterN.offset.y+=dt*.01;sparkT-=dt;if(sparkT<=0){sparkT=.09;window.__sparkle()}window.__beacon.material.opacity=.7+Math.sin(now*.004)*.3;
  if(gradePass)gradePass.uniforms.uTime.value=now*.001%100;
  if(started&&!paused){
    if(CS.active){updateCutscene(dt);updateFx(dt);updateWorld(dt);if(W.ch)W.update(dt,{talk:!!W.talking,sit:!!P.sitting,anim:P.heroAnim||null,mv:W.csMove||0,fly:W.broom.visible});W.g.position.copy(P.pos);W.g.rotation.y=lerpAngle(W.g.rotation.y,P.face,Math.min(1,dt*6));W.broom.visible=false;W.g.visible=true;W.body.rotation.x=lerp(W.body.rotation.x,0,dt*5);W.body.position.y=lerp(W.body.position.y,0,dt*5);if(MODE==='open'){owCine(dt);heroShadow.position.set(P.pos.x,P.pos.y+.06,P.pos.z);moonLight.position.set(P.pos.x+SUN_OFF.x,P.pos.y+SUN_OFF.y,P.pos.z+SUN_OFF.z);moonLight.target.position.set(P.pos.x,P.pos.y,P.pos.z);P.walkT+=dt*6;time+=dt;animateHero(dt,0,false,time)}}
    else{time+=dt;STATS.time+=dt;updatePlayer(dt);updateEnemies(dt);if(MODE==='open'){owUpdate(dt);owHUD()}updateProjs(dt);updatePickups(dt);updateFx(dt);updateCamera(dt);updateWorld(dt);updateHUD();drawMinimap();
      saveT+=dt;if(saveT>10){saveT=0;writeSave()}trackFps(dt)}
    muTick(dt);if(MODE==='open')updateMusicOW(dt);else{bmTick(dt);if(!bmActive())updateMusic(dt,!!bossRef)}}
  else if(!started){menuPreview(dt,now)}
  if(!paused){const sc=innerHeight*renderer.getPixelRatio()*.866;SP.update(dt,sc);FL.update(dt,sc);SM.update(dt,sc);updateFloats(dt)}
  if(toastT>0){toastT-=dt;if(toastT<=0)toastEl.classList.remove('show')}
  SKY.position.set(camera.position.x,MODE==='open'?camera.position.y:0,camera.position.z);
  if(useComposer&&composer)composer.render(dt);else renderer.render(scene,camera)}

/* ---------- menus ---------- */
const save=loadSave();
let nameEdited=false;const DEF_NAME={f:'Maëlle',m:'Lucien'};
const nameIn=$('nameIn');nameIn.addEventListener('input',()=>{nameEdited=true});
document.querySelectorAll('.hero').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('.hero').forEach(x=>x.classList.toggle('on',x===b));setHero(b.dataset.g);if(!nameEdited)nameIn.value=DEF_NAME[b.dataset.g];sfx.blip&&initAudio()}));
function setDiff(d){if(typeof enemies!=='undefined')for(const e of enemies){if(e.dead||!e.hpDiff||e.hpDiff===d)continue;const k0=e.def.boss?DIFFS[e.hpDiff].boss:DIFFS[e.hpDiff].hp,k1=e.def.boss?DIFFS[d].boss:DIFFS[d].hp;const r=k1/k0;e.maxhp=Math.round(e.maxhp*r);e.hp=Math.max(1,Math.round(e.hp*r));e.hpDiff=d}DIFF=d;document.querySelectorAll('#diffSeg button').forEach(x=>x.classList.toggle('on',x.dataset.d===d));$('diffDesc').textContent=DIFFS[d].label;$('diffBtn').textContent='Difficulty: '+d}
document.querySelectorAll('#diffSeg button').forEach(b=>b.addEventListener('click',()=>setDiff(b.dataset.d)));
setDiff('medium');
$('diffBtn').addEventListener('click',()=>{const o=['easy','medium','hard'];setDiff(o[(o.indexOf(DIFF)+1)%3]);writeSave()});
if(save&&save.diff&&DIFFS[save.diff])setDiff(save.diff);chaptersInit();
if(save&&save.level){const cb=$('continueBtn');cb.textContent=`Continue ${save.name||''} at level ${save.level}`.replace('  ',' ');cb.classList.remove('hidden')}
function syncAuto(){const b=$('autoBtn');b.classList.toggle('on',autoBolt);b.textContent=autoBolt?'Auto bolt on':'Auto bolt off'}
syncAuto();progInit();
W.g.position.copy(SPAWN);
function startGame(fromSave,skipIntro){initAudio();setTimeout(bmPrefetch,3000);setTimeout(()=>{if(typeof voPrefetchAll==='function')voPrefetchAll()},MODE==='open'?9000:5000);if(MODE!=='open')scPrefetch(SC_NAMES);if(bloomPass){bloomPass.strength=.4;bloomPass.threshold=.84}$('start').classList.add('hidden');$('hud').classList.remove('hidden');
  if(fromSave&&save){P.level=clamp(save.level|0,1,MAXLV);applySaveExtra(save);P.xp=save.xp|0;P.weak=!!save.weak;P.stonesGot=save.got|0;(save.beaten||[]).forEach(b=>beaten.add(b));STATS.kills=save.kills|0;STATS.time=save.time||0;STATS.won=!!save.won;if(P.weak)spawnStones(3-P.stonesGot);if(STATS.won&&beaten.has('illusion'))setDawn(1);
    if(save.hero&&save.hero!==HERO.g)setHero(save.hero);HERO.name=save.name||DEF_NAME[HERO.g]}
  else{clearSave();HERO.name=(nameIn.value.trim()||DEF_NAME[HERO.g]).slice(0,16)}
  P.hp=maxHP();P.mp=maxMP();P.pos.copy(SPAWN);yaw=Math.atan2(-(EIFFEL.x-SPAWN.x),-(EIFFEL.z-SPAWN.z));P.face=yaw+Math.PI;started=true;P.invuln=2;
  camera.position.set(P.pos.x+Math.sin(yaw)*camDist,8,P.pos.z+Math.cos(yaw)*camDist);W.g.position.copy(P.pos);W.g.rotation.y=P.face;
  const go=()=>{toast(P.weak?'Follow the green beams to find your stones':'Hunt what hides in the stone. Seven demons wait for you.',P.weak?'Weakened':'Paris, after dark');writeSave()};
  if((fromSave&&save)||skipIntro)go();else playIntro(go)}
function menuPreview(dt,now){const t=now*.001;const narrow=innerWidth<760;W.g.position.copy(SPAWN);W.g.rotation.y=Math.PI*.15+Math.sin(t*.25)*.35;
  P.walkT=0;animateHero(dt,0,false,t);W.castArm.rotation.x=W.castBase+Math.sin(t*1.6)*.05;W.body.position.y=Math.sin(t*1.2)*.02;
  if(Math.random()<.4)SP.emit(orbPos(),{c0:W.orbCol,c1:0x3a1a80,s0:.35,s1:.05,life:.9,up:.7,speed:.5});
  const cp=V3(SPAWN.x+1.9,1.8,SPAWN.z+4.4);const r=V3(1,0,0);camera.position.copy(cp);camera.lookAt(SPAWN.x+(narrow?0:1.6),narrow?1.1:1.55,SPAWN.z);
  pLight.position.set(SPAWN.x-2,5,SPAWN.z-3);heroShadow.position.set(SPAWN.x,.06,SPAWN.z);P.pos.copy(SPAWN);updateLampLights(dt)}
$('newBtn').addEventListener('click',()=>startGame(false));
function setMode(m){try{localStorage.setItem('sorciere-mode',m);localStorage.setItem('sorciere-pre',JSON.stringify({g:HERO.g,name:nameIn.value.trim()}))}catch(e){}location.reload()}
try{const pre=JSON.parse(localStorage.getItem('sorciere-pre')||'null');if(pre&&!(save&&save.name)){if(pre.g&&pre.g!==HERO.g){document.querySelectorAll('.hero').forEach(x=>x.classList.toggle('on',x.dataset.g===pre.g));setHero(pre.g)}if(pre.name){nameIn.value=pre.name;nameEdited=true}}}catch(e){}
function syncSafe(){$('safeBtn').textContent='Safe mode: '+(SAFE?'on':'off');$('safeBtn2').textContent='Safe mode: '+(SAFE?'on':'off')}
function toggleSafe(){SAFE=!SAFE;try{localStorage.setItem('sorciere-safe',SAFE?'1':'0')}catch(e){}syncSafe();if(SAFE){for(const e of enemies)removeEnemy(e);OWS.wanted=0;toast('No damage from quest monsters. Just Paris.','Safe mode')}}
$('safeBtn').addEventListener('click',toggleSafe);$('safeBtn2').addEventListener('click',toggleSafe);syncSafe();
$('storyBtn').addEventListener('click',()=>setMode('story'));$('storyBtn2').addEventListener('click',()=>setMode('story'));
$('owEnter').addEventListener('click',()=>setMode('open'));$('owBtn').addEventListener('click',()=>setMode('open'));
$('todBtn').addEventListener('click',cycleClock);
if(MODE!=='open')$('owEnter').classList.remove('hidden');
if(MODE==='open'){document.body.classList.add('ow');document.querySelector('#start h1').textContent='Sorcière';document.querySelector('#start .sub').textContent='Open world. The real map of Paris, 20 arrondissements and the suburbs, 44 landmarks, all 16 métro lines and 321 stations, thousands of Parisians who each have something to say. Nobody can stop you.';
  $('owGo').addEventListener('click',()=>{initAudio();$('start').classList.add('hidden');$('hud').classList.remove('hidden');
    if(save){P.level=clamp(save.level|0,1,MAXLV);applySaveExtra(save);(save.beaten||[]).forEach(b=>beaten.add(b));STATS.kills=save.kills|0;STATS.time=save.time||0;STATS.won=true;if(save.hero&&save.hero!==HERO.g)setHero(save.hero);HERO.name=save.name||DEF_NAME[HERO.g]}
    if(!save||!save.name)HERO.name=(nameIn.value.trim()||DEF_NAME[HERO.g]).slice(0,16);
    P.weak=false;P.hp=maxHP();P.mp=maxMP();P.flyMeter=flyMax();P.pos.copy(SPAWN);P.face=Math.atan2(EIFFEL.x-SPAWN.x,EIFFEL.z-SPAWN.z);yaw=P.face+Math.PI;started=true;P.invuln=2;W.g.position.copy(P.pos);W.g.rotation.y=P.face;
    owStart();
    playCutscene([...owTourShots(),{dur:3.2,fov:44,cut:true,cam:pushShot(V3(P.pos.x+30,20,P.pos.z+30),V3(P.pos.x+6,4,P.pos.z+8),headOf(P.pos,1.8)),onStart:owTourEnd},
      {who:'@',text:'No monsters worth the name left. For once, I can just enjoy Paris.',cut:true,cam:witchShot(1,3.6)},{who:'@',text:'Croissants first. Then maybe the Louvre. Then... who knows.',cam:witchShot(-1,4.4,2.6)}],
      ()=>toast(isTouch?'Walk up to anyone and tap the button at the bottom left. Métro entrances take you across town. Gold ! marks need your help.':'E to interact (bottom left), R to punch, M for the map, T to perform. Métro entrances take you across town. Gold ! marks need your help.','Paris is yours'))})}

$('continueBtn').addEventListener('click',()=>startGame(true));
$('reviveBtn').addEventListener('click',revive);
function togglePause(){if(!started||!P.alive||CS.active)return;paused=!paused;$('pause').classList.toggle('hidden',!paused);if(paused&&MODE==='open'){$('carnetInfo').textContent=`Carnet de Paris: ${OWS.carnet.size.toLocaleString('en')} of ${carnetTotal().toLocaleString('en')} conversations · ${OWS.visited.size}/${LANDMARKS.length} landmarks · ${OWS.qdone.length}/${QUESTS.length} quests`;$('abandonBtn').style.display=OWS.quest?'':'none'}}
$('pauseBtn').addEventListener('click',togglePause);
$('autoBtn').addEventListener('click',()=>{autoBolt=!autoBolt;syncAuto()});
$('resumeBtn').addEventListener('click',togglePause);
$('soundBtn').addEventListener('click',()=>{muted=!muted;$('soundBtn').textContent=muted?'Sound off':'Sound on'});
$('musicBtn').addEventListener('click',()=>{musicOn=!musicOn;$('musicBtn').textContent=musicOn?'Music on':'Music off'});
$('gfxBtn').addEventListener('click',()=>{userGfx=true;setQuality((quality+3)%4)});
$('resetBtn').addEventListener('click',()=>{clearSave();location.reload()});
$('roamBtn').addEventListener('click',()=>{$('victory').classList.add('hidden');paused=false});
$('againBtn').addEventListener('click',()=>{clearSave();location.reload()});
document.addEventListener('visibilitychange',()=>{if(document.hidden&&started&&!paused&&P.alive&&!CS.active)togglePause()});
$('owPrompt').addEventListener('click',()=>{initAudio();doInteract()});$('compelBtn').addEventListener('click',()=>{initAudio();openCompel()});if($('abandonBtn'))$('abandonBtn').addEventListener('click',()=>{if(MODE==='open'&&OWS.quest){abandonQuest();togglePause()}else toast('No active quest')});$('mapBtn').addEventListener('click',()=>openMap());if($('bagBtn'))$('bagBtn').addEventListener('click',()=>openBag());$('perfBtn').addEventListener('click',()=>perform());
setQuality(composer?quality:Math.min(quality,1));mobileInit();

/* open world intro: a clear, unhurried tour of the big landmarks */
const OWT={fog:null,bloom:null};
function owTourShots(){const pick=['Tour Eiffel','Arc de Triomphe','Musée du Louvre','Cathédrale Notre-Dame','Sacré-Cœur'];const out=[];
  pick.forEach((nm,i)=>{const l=LANDMARKS.find(q=>q.n===nm);if(!l)return;const g=terrainH(l.x,l.z);let S=Math.max(l.w||0,l.d||0,(l.r||0)*2,20)*LS*(l.k||1),Hh=S*.5;
    if(l.g){const bb=new THREE.Box3().setFromObject(l.g);if(isFinite(bb.max.y)){S=Math.max(bb.max.x-bb.min.x,bb.max.z-bb.min.z);Hh=bb.max.y-g}}
    const D=Math.max(S*.85,Hh*1.15)+45,H=Hh*.3+12,LY=g+Hh*.42;const a0=(l.ry||0)+[2.4,1.9,2.6,2.2,3.0][i];
    out.push({dur:i===0?4.2:3.4,fov:52,cut:true,title:[l.n,i===0?'Paris, tonight':''],
      onStart:()=>{if(i===0)owTourStart();owStream(l.x,l.z,14)},stream:l,update:()=>{scene.fog.density=.0009},
      cam:(k)=>{if(k<.6)owStream(l.x,l.z,1);const a=a0+k*.32;const d=D*(1-k*.12);return{pos:V3(l.x+Math.sin(a)*d,g+H+(1-k)*6,l.z+Math.cos(a)*d),look:V3(l.x,LY,l.z)}}})});return out}
function owTourStart(){OWT.fog=scene.fog.density;if(bloomPass){OWT.bloom=bloomPass.strength;bloomPass.strength=Math.min(bloomPass.strength,.35)}}
function owTourEnd(){if(OWT.fog!=null)scene.fog.density=OWT.fog;if(bloomPass&&OWT.bloom!=null)bloomPass.strength=OWT.bloom;OWT.fog=OWT.bloom=null;owStream(P.pos.x,P.pos.z,30)}
{const _ec=endCutscene;endCutscene=function(){if(OWT.fog!=null)owTourEnd();return _ec.apply(this,arguments)}}
