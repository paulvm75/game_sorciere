/* ================= EPIC PASS: Kaen's journal, Bilel's death, both limit breakers, the illusions, zone barks, the Tower quiz, the look ================= */
Object.assign(SX.sets,{ktf:1,wtf:1,pierce:1,summon:1,laser:1,chain:1,ding:1,shard:1});
MU.keys&&MU.keys.push('mus_kaenlb');
const EP={lev:0,levT:0};

/* ---------- voice lines (v4: Maëlle = Blondie, Kaen = Igor, the Tower = its own voice) ---------- */
const EPL={
  scream:'Aaaaah... aaaaaAAAAAH...',kill:"I'm gonna kill you, witch.",sum:'Rise, my shadows. One of you is real... and she will never know which.',
  stop:"Stop! STOP! It's crushing me... you're only making it worse!",clue:'Magic will not open them... The Tower keeps its own law. Answer its questions... and the chains will fall.',
  free:'Free... After ten years... Thank you, witch.',hold:"Hold still, Kaen. I'll burn through these chains.",drink:"It's not working... the chains are drinking my magic!",
  quiz:"A quiz? Seriously? I don't need a Life in the UK test, I'm not applying for ILR... Who's running this, Shabana Mahmood?!",full:'Full marks. Take that, Tower.',
  ohno:'Oh no. No no no no...',sp1:'WHO DARES MOCK THE TOWER? Answer my questions, witch. All of them. Fail once... and burn.',sp2:'WRONG.',sp3:'...Correct. Every one. The chains are yours, witch.'};
Object.assign(VO_MAP,{[EPL.scream]:'kz_tfa',[EPL.kill]:'kz_tfb',[EPL.sum]:'kz_sum',[EPL.stop]:'kz_stop',[EPL.clue]:'kz_clue',[EPL.free]:'kz_free',
  [EPL.drink]:'mz17',[EPL.quiz]:'mz18',[EPL.full]:'mz19',[EPL.ohno]:'mz20',[EPL.sp1]:'tw_sp1',[EPL.sp2]:'tw_sp2',[EPL.sp3]:'tw_sp3'});
for(const k of['kz_stop','kz_clue','kz_free','tw_sp1','tw_sp2','tw_sp3'])VO_SPIRIT.add(k);
Object.assign(BK['@'],{b_cal:[['mz10','Calais. Last stop in France... then the fog.']],
  b_ch:[['mz02',"I've heard there's a train that goes under. Wonder if they see fish."],['mz03','Somewhere down there, a ferry full of people eating chips. Lucky them.'],['mz04','Cold black water, fog and bats. Great combo.'],['bk_b1b6863b','Faster, broom! Faster!']],
  b_en:[['mz05','White cliffs, green fields, sheep. Very English.'],['mz06','It smells like rain. Of course it does.']],
  b_lon:[['mz07',"London from up here... it's like Paris got lost in the rain."],['mz08','Mind the gap, broom!'],['mz09',"Hang on, Kaen. I'm almost there."]],
  m_nbat:[['mz11','More bats? Go back to your cave!']],m_pumpkin:[['mz12','Flying pumpkins. Sure. Why not.']],m_gargoyle:[['mz13','Back on your cathedral, stone face!']],
  m_greyfang:[['mz14','Big, grey and ugly. Come here!']],m_illu:[['mz15',"Which one's real? Fine. I'll burn both."]],tw_hold:[['mz16',EPL.hold]]});
BK['@'].combo.push(['mz21','Sit down!'],['mz22','Next, please!']);
{const _bp=bkPick;bkPick=function(who,cat){if(who==='@'&&cat==='broom'&&MODE!=='open'&&CH2.zone==='north'){const z=P.pos.z;return _bp(who,z>CAL_SHORE?'b_cal':z>CLIFF_Z?'b_ch':z>LON_Z?'b_en':'b_lon')}return _bp(who,cat)}}

/* ---------- smoother, quicker dialogue: soft dips instead of hard cuts to black ---------- */
{const st=document.createElement('style');st.textContent='#dlgText{transition:opacity .18s}#dlg{transition:opacity .25s,transform .25s}';document.head.appendChild(st)}
{const _ns=nextShot;nextShot=function(){const first=CS.i<0;_ns.apply(this,arguments);const s=CS.shots[CS.i];if(!s||!CS.active)return;
  if(s.cut&&!first){fadeEl.style.transition='none';fadeEl.style.opacity='.55';void fadeEl.offsetWidth;fadeEl.style.transition='opacity .32s';fadeEl.style.opacity='0'}
  if(s.text&&!s.dur){const k=voKey(s.who,s.text);const b=k&&CLIP.buf[k];s._dur=b&&!muted?Math.max(1.2,b.duration/((VO_SPIRIT.has(k)?.9:1)*1.03)+.28):Math.max(1.6,s.text.length/48+.9)}dlgText.style.opacity='0';requestAnimationFrame(()=>{dlgText.style.opacity='1'})}}

/* ---------- levitation: lifts the witch's model without touching physics ---------- */
{const _r=renderer.render.bind(renderer);renderer.render=function(s,c){const l=EP.lev;if(l&&W.g)W.g.position.y+=l;try{_r(s,c)}finally{if(l&&W.g)W.g.position.y-=l}}}
{const _mt=muTick;muTick=function(dt){_mt(dt);EP.lev+=(EP.levT-EP.lev)*Math.min(1,dt*1.8);if(Math.abs(EP.lev)<.002&&!EP.levT)EP.lev=0;epAura(dt)}}

/* ================= 1 · KAEN'S JOURNAL: a heavy gilded grimoire, open, glowing script rising off the page ================= */
function epPageTex(lines,left){return mkCanvas(768,1024,x=>{const g=x.createLinearGradient(left?768:0,0,left?0:768,0);g.addColorStop(0,'#c9b38a');g.addColorStop(.12,'#eadcb8');g.addColorStop(1,'#f3e8cc');x.fillStyle=g;x.fillRect(0,0,768,1024);
  for(let i=0;i<70;i++){x.fillStyle=`rgba(${120+rand(-20,20)|0},${90+rand(-20,20)|0},50,${rand(.02,.06)})`;x.beginPath();x.arc(rand(0,768),rand(0,1024),rand(8,70),0,TAU);x.fill()}
  x.strokeStyle='rgba(110,70,30,.5)';x.lineWidth=3;x.strokeRect(46,46,676,932);x.strokeStyle='rgba(170,120,40,.6)';x.lineWidth=1.5;x.strokeRect(58,58,652,908);
  const ink='#2a160c';x.fillStyle=ink;x.textBaseline='alphabetic';let y=150;
  if(left){x.fillStyle='#8a1a20';x.font='bold 120px Georgia, serif';x.fillText(lines[0][0],78,y+40);x.fillStyle='#c8963a';x.strokeStyle='#c8963a';x.lineWidth=2;x.strokeRect(70,y-62,96,118);x.fillStyle=ink;x.font='italic 40px Georgia, serif';x.fillText(lines[0].slice(1),176,y);y+=64;lines=lines.slice(1)}
  x.font='italic 38px Georgia, serif';for(const l of lines){x.fillText(l,84,y);y+=58}
  x.save();x.translate(384,y+150);x.strokeStyle='rgba(90,30,140,.85)';x.lineWidth=3;for(const r of[120,92,40]){x.beginPath();x.arc(0,0,r,0,TAU);x.stroke()}
  x.beginPath();for(let k=0;k<6;k++){const a=k/6*TAU-Math.PI/2;x[k?'lineTo':'moveTo'](Math.cos(a)*92,Math.sin(a)*92)}x.closePath();x.stroke();x.beginPath();for(let k=0;k<6;k++){const a=k/6*TAU-Math.PI/2+Math.PI/6;x.moveTo(0,0);x.lineTo(Math.cos(a)*120,Math.sin(a)*120)}x.stroke();
  x.font='28px Georgia';x.fillStyle='rgba(90,30,140,.9)';const R='ᚠᚢᚦᚨᚱᚲᚷᚹᚺᚾᛁᛃ';for(let k=0;k<12;k++){const a=k/12*TAU;x.save();x.rotate(a);x.fillText(R[k],-8,-100);x.restore()}x.restore();
  x.fillStyle='rgba(60,30,10,.6)';x.font='italic 26px Georgia';x.fillText(left?'- 3652 -':'- 3653 -',left?330:330,950)})}
function epGlowTex(cy){return mkCanvas(512,682,x=>{x.fillStyle='#000';x.fillRect(0,0,512,682);x.strokeStyle='#fff';x.fillStyle='#fff';x.shadowColor='#fff';x.shadowBlur=14;x.lineWidth=3;x.translate(256,cy*682);
  for(const r of[80,61,27]){x.beginPath();x.arc(0,0,r,0,TAU);x.stroke()}x.font='19px Georgia';const R='ᚠᚢᚦᚨᚱᚲᚷᚹᚺᚾᛁᛃ';for(let k=0;k<12;k++){x.save();x.rotate(k/12*TAU);x.fillText(R[k],-6,-66);x.restore()}})}
function epRuneTex(ch){return mkCanvas(64,64,x=>{x.fillStyle='#fff';x.shadowColor='#fff';x.shadowBlur=10;x.font='44px Georgia';x.textAlign='center';x.textBaseline='middle';x.fillText(ch,32,34)})}
buildJournal=function(){const g=new THREE.Group();const inner=new THREE.Group();inner.rotation.x=.55;g.add(inner);
  const leather=std({color:0x2c140c,roughness:.45,metalness:.1,emissive:0x060102});const gold=std({color:0xe2b85a,metalness:.95,roughness:.25,emissive:0x2c1a04});
  const edge=std({color:0xeadbb4,roughness:.95,map:new THREE.CanvasTexture(mkCanvas(64,64,x=>{x.fillStyle='#eadbb4';x.fillRect(0,0,64,64);x.fillStyle='rgba(120,90,50,.35)';for(let i=0;i<64;i+=3)x.fillRect(0,i,64,1)}))});
  const L=['The Crown asked again tonight.','I gave it Paris instead of her.','Lyra sleeps. She does not','know what I traded.','My kindness, for her breath.','I would trade it again.'];
  const Rr=['The prison holds. Every','monster I build is a door','I close on myself.','If someone ever breaks me,','let her be free.','                        - K.'];
  const pts=[new THREE.CanvasTexture(epPageTex(['N'+'ight 3,652.',...L],true)),new THREE.CanvasTexture(epPageTex(Rr,false))];for(const t of pts)t.anisotropy=8;
  const glowTs=[new THREE.CanvasTexture(epGlowTex((150+64+6*58+150)/1024)),new THREE.CanvasTexture(epGlowTex((150+6*58+150)/1024))];const glowMs=[];
  for(const s of[-1,1]){const cov=new THREE.Mesh(new THREE.BoxGeometry(.5,.03,.68),leather);cov.position.set(s*.262,-.02,0);cov.rotation.z=s*.07;inner.add(cov);
    for(const c of[-1,1]){const cp=new THREE.Mesh(new THREE.BoxGeometry(.07,.036,.07),gold);cp.position.set(s*.47,-.02,c*.3);cp.rotation.z=s*.07;inner.add(cp)}
    const stud=new THREE.Mesh(new THREE.SphereGeometry(.018,10,8),gold);stud.position.set(s*.47,-.0,0);inner.add(stud);
    const blk=new THREE.Mesh(new THREE.BoxGeometry(.45,.05,.62),edge);blk.position.set(s*.24,.012,0);blk.rotation.z=s*.06;inner.add(blk);
    const pg=new THREE.PlaneGeometry(.45,.62,20,1);const pa=pg.attributes.position;for(let i=0;i<pa.count;i++){const u=(pa.getX(i)+.225)/.45;const t=s<0?1-u:u;pa.setZ(i,.045*Math.sin(Math.min(1,t*1.5)*Math.PI/2)-.012*(1-t))}pg.computeVertexNormals();pg.rotateX(-Math.PI/2);
    const page=new THREE.Mesh(pg,new THREE.MeshBasicMaterial({map:pts[s<0?0:1],color:0xa89878}));page.position.set(s*.235,.04,0);inner.add(page);
    const gm=new THREE.MeshBasicMaterial({map:glowTs[s<0?0:1],color:0x9a50ff,transparent:true,opacity:.6,blending:THREE.AdditiveBlending,depthWrite:false});glowMs.push(gm);
    const gl2=new THREE.Mesh(pg.clone(),gm);gl2.position.set(s*.235,.044,0);inner.add(gl2)}
  const sp=new THREE.Mesh(new THREE.CylinderGeometry(.04,.04,.68,14,1,false,0,Math.PI),leather);sp.rotation.set(Math.PI/2,0,Math.PI/2);sp.position.y=-.03;inner.add(sp);
  for(const z of[-.24,0,.24]){const b=new THREE.Mesh(new THREE.TorusGeometry(.041,.008,6,16,Math.PI),gold);b.rotation.set(0,Math.PI/2,Math.PI);b.position.set(0,-.03,z);inner.add(b)}
  const lt=new THREE.PointLight(0xffc890,.5,2.4,2);lt.position.set(0,.45,.2);inner.add(lt);const halo=glowSprite(0xb080ff,1.4,.15);halo.position.y=.12;inner.add(halo);
  const runes=[];const RC='ᚠᚢᚦᚨᚱᚲᚷᚹᚺᚾᛁᛃ';for(let i=0;i<14;i++){const m=new THREE.SpriteMaterial({map:new THREE.CanvasTexture(epRuneTex(RC[i%12])),color:i%3?0xd8b0ff:0xffd890,transparent:true,opacity:0,blending:THREE.AdditiveBlending,depthWrite:false});
    const r=new THREE.Sprite(m);r.scale.setScalar(.07);r.userData={t:Math.random()*2.6,x:rand(-.4,.4),z:rand(-.25,.25)};inner.add(r);runes.push(r)}
  let last=performance.now();halo.onBeforeRender=()=>{const now=performance.now();const dt=Math.min(.05,(now-last)/1000);last=now;const t=now*.001;
    for(const m of glowMs)m.opacity=.45+Math.sin(t*2.2)*.2;lt.intensity=.45+Math.sin(t*3.1)*.12;halo.material.opacity=.13+Math.sin(t*2)*.04;
    for(const r of runes){const u=r.userData;u.t+=dt;if(u.t>2.6){u.t=0;u.x=rand(-.4,.4);u.z=rand(-.25,.25)}const k=u.t/2.6;r.position.set(u.x+Math.sin(u.t*3+u.z*9)*.03,.06+k*.55,u.z);r.material.opacity=Math.sin(k*Math.PI)*.95;r.scale.setScalar(.05+k*.05)}};
  g.userData={flip:new THREE.Object3D(),gl:halo};return g};

/* ================= 2 · BILEL: he runs in, stops in front of Kaen, the magic blade goes through him ================= */
{const _pc=playCutscene;playCutscene=function(shots,done){try{const i=shots.findIndex(s=>s.text==='NOT HER!');if(i>=0&&FIN.ally)epSacrifice(shots,i);const j=shots.findIndex(s=>s.text==='You... will... PAY FOR HIM!!!');if(j>=0)epAwaken(shots,j)}catch(e){console.warn('epic',e)}return _pc.call(this,shots,done)}}
function epBlade(){const g=new THREE.Group();const L=2.5;const core=new THREE.Mesh(new THREE.BoxGeometry(.035,.012,L).translate(0,0,L/2),new THREE.MeshBasicMaterial({color:0xffffff}));
  const glow=new THREE.Mesh(new THREE.BoxGeometry(.16,.06,L).translate(0,0,L/2),new THREE.MeshBasicMaterial({color:0xa040ff,transparent:true,opacity:.55,blending:THREE.AdditiveBlending,depthWrite:false}));
  const hilt=new THREE.Mesh(new THREE.CylinderGeometry(.03,.03,.32,8).rotateX(Math.PI/2).translate(0,0,-.16),std({color:0x14101a,roughness:.5}));g.add(core,glow,hilt);const tip=glowSprite(0xd0a0ff,.9,.9);tip.position.z=L;g.add(tip);g.userData={glow,tip,L};return g}
function epSacrifice(shots,i){const A=FIN.ally,e=BM.finalFor||bossRef;if(!A||!e)return;const act=e.m.actor;const upd=finKaenUpd(e);
  const kp=e.pos.clone();const toW=V3(P.pos.x-kp.x,0,P.pos.z-kp.z).normalize();const side=V3(toW.z,0,-toW.x);
  const strike=P.pos.clone().addScaledVector(toW,-2.7);strike.y=groundAt(strike.x,strike.z);const mid=P.pos.clone().addScaledVector(toW,-1.6);mid.y=groundAt(mid.x,mid.z);
  const land=P.pos.clone().addScaledVector(toW,.2).addScaledVector(side,1.3);land.y=groundAt(land.x,land.z);let aStart=null,blade=null,orb=null,hit=0,fz=0,dk=0;
  const findOrb=()=>{const h=headOf(e.pos,2.4);let best=null,bd=1.2;for(const o of scene.children)if(o.isSprite){const d=o.position.distanceTo(h);if(d<bd){bd=d;best=o}}return best};
  const run={who:'Master Bilel',text:'NOT HER!',fov:50,cut:true,cam:k=>{const c=mid.clone().addScaledVector(toW,-1.4);return{pos:headOf(c,1.6).addScaledVector(side,7.5-k*1.5).addScaledVector(toW,1.5),look:headOf(c,1.1)}},
    onStart:()=>{aStart=A.g.position.clone();A.setBase('Sprint_Loop',.1,1.5);A._k=0;act.setBase('Spell_Simple_Idle_Loop',.2);sx('riser',.6,null,{rate:1.3})},
    update:dt=>{upd(dt);finFaceTo(e.m.g,A.g.position);if(A._k<1){A._k=Math.min(1,A._k+dt/.95);const k=1-Math.pow(1-A._k,2);A.g.position.lerpVectors(aStart,mid,k);finFaceTo(A.g,mid.clone().addScaledVector(toW,-1));
        SP.emit(headOf(A.g.position,1),{n:2,c0:0xffe0a0,c1:0x805010,s0:.4,s1:.05,life:.4});if(A._k>=1){A.setBase('Spell_Simple_Idle_Loop',.12);finFaceTo(A.g,e.pos);SM.emit(V3(mid.x,mid.y+.2,mid.z),{n:10,c0:0x8a8070,c1:0x2a2418,s0:.6,s1:2,speed:3,flat:true,life:.6,a:.4})}}
      else finFaceTo(A.g,e.pos)}};
  const stand={dur:1.3,fov:36,cut:true,cam:()=>({pos:headOf(mid,1.55).addScaledVector(toW,-1.9).addScaledVector(side,.9),look:headOf(mid,1.5)}),onStart:()=>{A.g.position.copy(mid);finFaceTo(A.g,e.pos);A.setBase('Spell_Simple_Idle_Loop',.1)},update:upd};
  const pierce={dur:2.6,fov:40,cut:true,cam:k=>{const c=mid.clone().addScaledVector(toW,-.55);return{pos:headOf(c,1.25).addScaledVector(side,4.6-k*1.4).addScaledVector(toW,.4),look:headOf(c,1.15)}},
    onStart:()=>{CS.speed=.6;e._d=0;hit=0;fz=0;orb=findOrb();act.setBase('Sprint_Loop',.05,2.4);A.g.position.copy(mid);finFaceTo(A.g,e.pos)},
    update:dt=>{upd(dt);if(!hit){e._d+=dt;const k=Math.min(1,e._d/.34);e.pos.lerpVectors(kp,strike,k*k);finFaceTo(e.m.g,mid);
        if(orb){orb.position.copy(headOf(e.pos,1.3));orb.scale.multiplyScalar(.9)}for(let n=0;n<3;n++)SP.emit(eCenter(e).add(V3(rand(-.3,.3),rand(-.4,.4),rand(-.3,.3))),{c0:0xffffff,c1:0x6010d0,s0:.6,s1:.05,life:.35,speed:.6});
        if(k>=1){hit=1;if(orb){scene.remove(orb);orb=null}act.setBase('Idle_Loop',.05);act.once('Melee_Hook',.5);
          blade=epBlade();blade.position.copy(strike).addScaledVector(toW,.35);blade.position.y+=1.25;blade.lookAt(blade.position.clone().add(toW));blade.scale.z=.01;scene.add(blade);
          sx('pierce',1.4,()=>{try{sfx.boom()}catch(x){}},{wet:.25});sx('impact',.9,null,{rate:.7,delay:.05});CS.speed=.12;P.shake=1.6;vib([60,40,200]);
          const c=headOf(mid,1.25);flash(c,0xffffff,14);flash(c,0xa050ff,10);ring(mid,0xc080ff,1,5,.4);A.fire('Hit_Knockback',.25);
          SP.emit(c.clone().addScaledVector(toW,.3),{n:140,c0:0xffffff,c1:0x8030ff,speed:10,life:.9,s0:.6,s1:.05,dir:toW});SP.emit(c,{n:60,c0:0xfff0c0,c1:0xd09020,speed:6,life:1,s0:.5,s1:.05})}}
      else{fz+=dt/Math.max(.05,CS.speed);if(fz>.55&&CS.speed<.5)CS.speed=.5;if(blade){blade.scale.z=Math.min(1,blade.scale.z+dt*22);blade.userData.glow.material.opacity=.45+Math.sin(time*40)*.15}
        if(Math.random()<.5)SP.emit(headOf(mid,1.2).addScaledVector(toW,.5),{c0:0xe0c0ff,c1:0x5010c0,s0:.35,s1:.03,life:.6,speed:1.5})}}};
  const hold={dur:2,fov:32,cut:true,cam:k=>({pos:headOf(mid,1.6).addScaledVector(side,3.4-k*.3).addScaledVector(toW,.2),look:headOf(mid,1.3).addScaledVector(toW,-.5)}),onStart:()=>{CS.speed=.75;dk=0},
    update:(dt,k)=>{upd(dt);if(Math.random()<.4)SP.emit(headOf(mid,1.2),{c0:0xfff0c0,c1:0xf2a030,s0:.3,s1:.03,life:.8,up:.6,speed:.3});
      if(k>.72&&blade&&!blade.userData.out){blade.userData.out=1;sx('clash',.5,null,{rate:1.3});act.once('OverhandThrow',.4);SP.emit(headOf(mid,1.25),{n:60,c0:0xffffff,c1:0x8030ff,speed:7,life:.6})}
      if(blade&&blade.userData.out){blade.scale.z=Math.max(0,blade.scale.z-dt*6);if(blade.scale.z<=0){scene.remove(blade);blade=null}}}};
  const fall={dur:1.4,fov:40,cam:k=>{const c=mid.clone().lerp(land,.5);return{pos:headOf(c,1.5).addScaledVector(side,-4.2).addScaledVector(toW,-.5),look:headOf(c,1.1)}},
    onStart:()=>{CS.speed=.85;if(blade){scene.remove(blade);blade=null}A._k=0;A.once('Hit_Knockback',1.5);act.setBase('Idle_Loop',.3)},
    update:dt=>{upd(dt);A._k=Math.min(1,A._k+dt/1.3);const k=A._k;A.g.position.lerpVectors(mid,land,k*(2-k));finFaceTo(A.g,e.pos);if(Math.random()<.3)SP.emit(headOf(A.g.position,1.2),{c0:0xfff0c0,c1:0xf2a030,s0:.3,s1:.03,life:.8,up:.5,speed:.3})}};
  let ft=0;const down={dur:4,fov:36,cam:k=>({pos:headOf(land,.7+k*.1).addScaledVector(side,3.2-k*.6).addScaledVector(toW,.5),look:headOf(land,.55-k*.2)}),
    onStart:()=>{CS.speed=.8;ft=0;A._landed=0;A.g.position.copy(land);finFaceTo(A.g,e.pos);A.setBase('Crouch_Idle_Loop',.9)},
    update:dt=>{upd(dt);ft+=dt;if(ft>3.5)CS.speed=1;finFaceTo(A.g,e.pos);if(ft>1.3&&!A._fell){A._fell=1;A.once('Death01',3)}
      if(ft>3.4&&!A._landed){A._landed=1;SM.emit(V3(land.x,land.y+.2,land.z),{n:14,c0:0x6a6080,c1:0x2a2438,s0:1,s1:3,speed:2.5,flat:true,life:1,a:.4});P.shake=.4;sx('impact',.4,null,{rate:.6})}
      if(Math.random()<.25)SP.emit(headOf(A.g.position,.8),{c0:0xfff0c0,c1:0xf2a030,s0:.3,s1:.03,life:1,up:.8,speed:.2})}};
  shots.splice(i,3,run,stand,pierce,hold,fall,down)}

/* ================= 3 · KAEN'S LIMIT BREAKER: the quiet scream, the void, a new theme ================= */
function epVoidPillar(c,col){const g=new THREE.Group();g.position.copy(c);scene.add(g);const m=new THREE.MeshBasicMaterial({color:col,transparent:true,opacity:.7,blending:THREE.AdditiveBlending,depthWrite:false,side:THREE.DoubleSide});
  const cy=new THREE.Mesh(new THREE.CylinderGeometry(1.6,2.8,80,32,1,true),m);cy.position.y=40;g.add(cy);const cy2=new THREE.Mesh(new THREE.CylinderGeometry(.6,1,80,24,1,true),new THREE.MeshBasicMaterial({color:0xffffff,transparent:true,opacity:.8,blending:THREE.AdditiveBlending,depthWrite:false,side:THREE.DoubleSide}));cy2.position.y=40;g.add(cy2);
  const sh=new THREE.Mesh(new THREE.SphereGeometry(1,32,16),new THREE.MeshBasicMaterial({color:col,transparent:true,opacity:.5,blending:THREE.AdditiveBlending,depthWrite:false,side:THREE.DoubleSide}));sh.position.y=1;g.add(sh);
  addFx(g,3.2,(f,k)=>{cy.rotation.y+=.05;cy2.rotation.y-=.08;const w=k<.12?k/.12:1-(k-.12)*.6;cy.scale.set(w,1,w);cy2.scale.set(w,1,w);m.opacity=.7*(1-k);cy2.material.opacity=.8*(1-k);sh.scale.setScalar(1+k*40);sh.material.opacity=.5*(1-k)},()=>scene.remove(g))}
kaenTransform=function(e){BM.finalFor=e;const K=e.m.K,act=e.m.actor;e.invuln=true;e.busy=99;e.m.lock=99;P.flying=false;P.glide=true;P.invuln=Math.max(P.invuln,4);
  for(const o of enemies)if(!o.dead&&o!==e&&(o.type==='fox'||o.type==='guardian'))removeEnemy(o);
  const c=e.pos.clone();const orbit=(r,h,a0,a1)=>k=>{const a=lerp(a0,a1,k)+e.m.g.rotation.y;return{pos:V3(c.x+Math.sin(a)*r,c.y+h,c.z+Math.cos(a)*r),look:V3(c.x,c.y+1.5,c.z)}};
  const idle=dt=>{e.t+=dt;kaenFx(e,dt);act.update(dt)};const slow=f=>dt=>{e.t+=dt;kaenFx(e,dt);act.update(dt*f)};const fwd=()=>V3(Math.sin(e.m.g.rotation.y),0,Math.cos(e.m.g.rotation.y));let bk=0;
  playCutscene([
    {dur:2.4,fov:42,cut:true,cam:orbit(4.5,1.2,-.4,.2),onStart:()=>{act.once('Hit_Knockback',1.2);sx('impact',1,()=>{try{sfx.boom()}catch(x){}});P.shake=.6;SP.emit(eCenter(e),{n:60,c0:0xffffff,c1:0x8030ff,speed:8,life:.8})},update:slow(.45)},
    {who:'Kaen',text:'No... No. Not to a witch. Not in my own illusion...',fov:34,cam:()=>({pos:headOf(c,1.5).addScaledVector(fwd(),2.2).add(V3(0,-.1,0)),look:headOf(c,1.2)}),onStart:()=>act.setBase('Crouch_Idle_Loop',.4),update:idle},
    {who:'Kaen',text:'When restraint shatters... the void answers.',fov:30,cam:()=>({pos:headOf(c,1.0).addScaledVector(fwd(),1.3),look:headOf(c,1.0)}),onStart:()=>{e.lb=.01},update:idle},
    // the quiet scream: the void is sucked into him, the ground starts to give
    {who:'Kaen',text:EPL.scream,fov:36,cam:k=>({pos:headOf(c,.5+k*.5).addScaledVector(fwd(),4.6-k*2.4).addScaledVector(V3(fwd().z,0,-fwd().x),.8-k*.5),look:headOf(c,1.0+k*.4)}),
      onStart:()=>{bk=0;act.setBase('Crouch_Idle_Loop',.3);sx('riser',.9,null,{rate:.75,wet:.3});SM.emit(V3(c.x,c.y+.2,c.z),{n:20,c0:0x6a5080,c1:0x140a20,s0:1,s1:4,speed:4,flat:true,life:1.4,a:.5})},
      update:(dt,k)=>{idle(dt);bk+=dt;P.shake=Math.max(P.shake,.1+k*.9);e.lb=Math.min(.6,k*.6);
        for(let n=0;n<4;n++){const a=Math.random()*TAU,r=rand(2,6);SP.emit(V3(c.x+Math.sin(a)*r,c.y+rand(0,3.5),c.z+Math.cos(a)*r),{c0:0xd0a0ff,c1:0x30106a,s0:.45,s1:.05,life:.55,speed:-r*1.9})}
        if(Math.random()<dt*(1+k*9))lightning(V3(c.x+rand(-3,3),c.y+rand(3,7),c.z+rand(-3,3)),eCenter(e),0xc890ff);if(Math.random()<dt*3)ring(c,0x9040ff,1,2+k*6,.5)}},
    {dur:3.6,fov:52,cut:true,title:['Kaen Kuroshiba','Limit Breaker'],cam:orbit(10,3,.6,-.6),onStart:()=>{K.setTorn();e.lb=20;e._klb=1;e.hp=Math.min(e.maxhp,e.hp+Math.round(e.maxhp*.135));act.setBase('Spell_Simple_Idle_Loop',.2);
        sx('ktf',1.5,()=>{try{sfx.roar()}catch(x){}},{wet:.35,duck:5});sx('boss',.7,null,{delay:.15});sx('impact',1.1,null,{rate:.6});epVoidPillar(c,0x8a30ff);flash(c,0xffffff,26);flash(c,0xa050ff,22);P.shake=2.2;vib([80,40,240]);
        for(let k=0;k<4;k++)after(k*.12,()=>ring(c,k%2?0xe0c0ff:0x8a30ff,1,14+k*7,.9));runeFlash(c,0x9a40ff,22,2.8);
        SP.emit(V3(c.x,c.y+1.5,c.z),{n:300,c0:0xffffff,c1:0x7020e0,speed:20,life:1.4,s0:.9,s1:.1,grav:1});SM.emit(V3(c.x,c.y+1,c.z),{n:46,c0:0x6030a0,c1:0x100420,s0:3,s1:10,speed:7,life:2.2,a:.6,up:2});
        for(let k=0;k<10;k++)after(k*.1,()=>lightning(V3(c.x+rand(-7,7),c.y+28,c.z+rand(-7,7)),eCenter(e),0xe0c0ff))},
      update:dt=>{idle(dt);if(Math.random()<.9)SP.emit(V3(c.x+rand(-1.4,1.4),c.y+rand(0,3),c.z+rand(-1.4,1.4)),{c0:0xffffff,c1:0x8030ff,s0:.6,s1:.05,life:1,up:6,speed:.5})}},
    {who:'Kaen',text:EPL.kill,fov:34,cam:()=>{const d=V3(P.pos.x-c.x,0,P.pos.z-c.z).normalize();return{pos:headOf(c,1.6).addScaledVector(d,2.6).add(V3(d.z*.7,0,-d.x*.7)),look:headOf(c,2.1)}},onStart:()=>{act.fire('OverhandThrow',.7);P.shake=.5},update:idle}
  ],()=>{e.invuln=false;e.busy=0;e.m.lock=0;e.lb=20;e._klb=1;e.dmgMul=1.35;e.ai.flyCd=2;toast('Kaen hits 35% harder and can fly. Survive 20 seconds or finish him.','Limit Breaker',true);
    if(MODE!=='open'&&!P.lbStory){P.lbStory=true;finStart(e)}})};
const epKLB=()=>MODE!=='open'&&started&&bossRef&&!bossRef.dead&&bossRef.type==='illusion'&&bossRef._klb;
{const _bw=bmWant;bmWant=function(){if(epKLB())return null;return _bw.apply(this,arguments)}}
{const _mw=muWant;muWant=function(){if(epKLB())return FIN.grief?'mus_mourn':'mus_kaenlb';return _mw.apply(this,arguments)}}

/* ================= 4 · MAËLLE'S LIMIT BREAKER: grief, a scream of rage, she rises ================= */
function epAwaken(shots,j){const c=P.pos.clone();const lift=f=>{if(!f)return f;return k=>{const r=f(k);const l=EP.lev;return{pos:r.pos.clone().add(V3(0,l,0)),look:r.look.clone().add(V3(0,l,0))}}};
  shots.forEach((s,i)=>{if(s.cam&&i<=j)s.cam=lift(s.cam)});
  const s0=shots[0];s0.dur=3.4;const u0=s0.update,o0=s0.onStart;let t0=0,sc=0;
  s0.onStart=()=>{o0&&o0();t0=0;sc=0;sx('riser',.8,null,{rate:.8,wet:.3})};
  s0.update=(dt,k)=>{u0&&u0(dt,k);t0+=dt;if(!sc&&t0>1.25){sc=1;if(!CS.skipping)clipPlay('mz01',1.6,5)}};
  const s1=shots[1];const o1=s1.onStart,u1=s1.update;
  s1.onStart=()=>{o1&&o1();EP.levT=1.3;sx('wtf',1.6,null,{wet:.4});sx('powerup',1,null,{delay:.1});sx('impact',1.2,null,{rate:.55});epShock(c,0xffd060);
    for(let k=0;k<8;k++){const a=k/8*TAU;after(.1+k*.06,()=>{const p=V3(c.x+Math.sin(a)*7,c.y,c.z+Math.cos(a)*7);lightning(V3(p.x,p.y+30,p.z),p,0xfff0b0);flash(p,0xffd060,5);SM.emit(V3(p.x,p.y+.3,p.z),{n:6,c0:0x908070,c1:0x302010,s0:1,s1:3,speed:3,flat:true,life:1,a:.4})})}};
  s1.update=(dt,k)=>{u1&&u1(dt,k);if(Math.random()<.5){const a=Math.random()*TAU;SP.emit(V3(c.x+Math.sin(a)*rand(.5,1.2),c.y+EP.lev+rand(0,2.2),c.z+Math.cos(a)*rand(.5,1.2)),{c0:0xffffff,c1:0xffb020,s0:.5,s1:.05,life:.8,up:5,speed:.3})}};
  const s3=shots[j];const o3=s3.onStart;s3.onStart=()=>{o3&&o3();EP.levT=.55;sx('impact',.7,null,{rate:.8})};
  const last=shots[shots.length-1];const o4=last.onStart;last.onStart=()=>{o4&&o4();EP.levT=.35}}
function epShock(c,col){const m=new THREE.Mesh(new THREE.SphereGeometry(1,32,16),new THREE.MeshBasicMaterial({color:col,transparent:true,opacity:.6,blending:THREE.AdditiveBlending,depthWrite:false,side:THREE.DoubleSide}));m.position.copy(c);m.position.y+=1;scene.add(m);
  const r=new THREE.Mesh(new THREE.RingGeometry(.8,1.4,48),new THREE.MeshBasicMaterial({color:0xfff0c0,transparent:true,opacity:.9,blending:THREE.AdditiveBlending,depthWrite:false,side:THREE.DoubleSide}));r.rotation.x=-Math.PI/2;r.position.copy(c);r.position.y+=.08;scene.add(r);
  addFx(m,1.6,(f,k)=>{m.scale.setScalar(1+k*34);m.material.opacity=.6*(1-k)*(1-k);r.scale.setScalar(1+k*26);r.material.opacity=.9*(1-k)},()=>{scene.remove(m);scene.remove(r)})}
// persistent golden aura while her limit breaker burns
function epAura(dt){if(!W||!W.g)return;const on=P.lbT>0&&P.alive&&MODE!=='open';if(on&&!EP.aura){const g=new THREE.Group();const m=new THREE.MeshBasicMaterial({color:0xffc040,transparent:true,opacity:0,blending:THREE.AdditiveBlending,depthWrite:false,side:THREE.DoubleSide});
    const cy=new THREE.Mesh(new THREE.CylinderGeometry(.42,.7,2.4,20,1,true),m);cy.position.y=1.15;g.add(cy);const gl=glowSprite(0xffd070,3.2,0);gl.position.y=1.1;g.add(gl);scene.add(g);EP.aura={g,m,gl,cy}}
  const A=EP.aura;if(!A)return;const tgt=on?1:0;A.k=(A.k||0)+(tgt-(A.k||0))*Math.min(1,dt*3);A.g.visible=A.k>.02;if(!A.g.visible)return;A.g.position.copy(W.g.position);A.g.position.y+=EP.lev;const t=performance.now()*.001;
  A.m.opacity=A.k*(.13+Math.sin(t*9)*.04);A.cy.rotation.y+=dt*2;A.cy.scale.set(1+Math.sin(t*7)*.06,1+Math.sin(t*5)*.04,1+Math.cos(t*7)*.06);A.gl.material.opacity=A.k*.22;
  if(on&&Math.random()<.5)SP.emit(V3(W.g.position.x+rand(-.5,.5),W.g.position.y+EP.lev+rand(0,1.8),W.g.position.z+rand(-.5,.5)),{c0:0xfff0c0,c1:0xff9010,s0:.35,s1:.03,life:.6,up:3,speed:.2})}
{const _rv=revive;revive=function(){EP.levT=0;EP.lev=0;return _rv.apply(this,arguments)}}
{const _ec=endCutscene;endCutscene=function(){_ec.apply(this,arguments);if(!CS.active&&EP.levT)EP.levT=0}}

/* ================= 5 · KAEN'S ILLUSIONS: you watch him summon them. One is real. One is a lie. ================= */
summonGuardians=function(e,n){n=Math.max(2,n);const out=[];for(let k=0;k<n;k++){const s=findSpot(e.pos.x,e.pos.z,4,8);if(!s)continue;const gd=spawnEnemy('guardian',s);if(gd)out.push(gd);
    runeFlash(s,0xa050ff,10,1.5);flash(headOf(s,2),0xa050ff,8);SM.emit(V3(s.x,s.y+3,s.z),{n:40,c0:0xc090ff,c1:0x200840,s0:3,s1:8,speed:4,up:3,life:1.6,a:.6})}
  if(out.length>1)out[(Math.random()*out.length)|0].fake=true;P.shake=.8;sx('summon',1.2,()=>{try{sfx.roar()}catch(x){}},{wet:.35});return out};
{const _de=damageEnemy;damageEnemy=function(o,amt){if(o&&o.fake&&!o.dead&&!o._gone){o._gone=1;const c=eCenter(o);sx('shard',1.1,()=>{try{sfx.shatter()}catch(x){}});flash(c,0xd0a0ff,9);
      for(let i=0;i<18;i++){const s=new THREE.Mesh(G.shard,new THREE.MeshBasicMaterial({color:i%2?0xc090ff:0xffffff,transparent:true,blending:THREE.AdditiveBlending,depthWrite:false}));const sc=rand(.15,.4);s.scale.set(sc,sc*2,sc);s.position.copy(c).add(V3(rand(-1,1),rand(-1.5,1.5),rand(-1,1)));const v=V3(rand(-5,5),rand(1,6),rand(-5,5));scene.add(s);
        addFx(s,1.3,(f,k)=>{s.position.addScaledVector(v,1/60);v.y-=.15;s.rotation.x+=.2;s.material.opacity=1-k},()=>scene.remove(s))}
      SM.emit(c,{n:24,c0:0xb080ff,c1:0x200840,s0:2,s1:5,speed:5,life:1.2,a:.5});floatText(c.clone().add(V3(0,1.5,0)),'ILLUSION','#d0a0ff',true);after(0,()=>{if(!o.dead)removeEnemy(o)});return}
    return _de.apply(this,arguments)}}
{const _ai=BOSSAI.illusion;BOSSAI.illusion=function(e,dt,d){const a=e.ai;if(!a.g0&&!CS.active&&P.alive){a.g0=1;epSummon(e);return}return _ai.apply(this,arguments)}}
function epSummon(e){const act=e.m.actor;const c=e.pos.clone();const d=V3(P.pos.x-c.x,0,P.pos.z-c.z).normalize();const sd=V3(d.z,0,-d.x);let gs=[];e.busy=99;
  playCutscene([
    {dur:1.5,fov:40,cut:true,cam:k=>({pos:headOf(c,1.4).addScaledVector(d,3.4-k*.6).addScaledVector(sd,1),look:headOf(c,1.6)}),onStart:()=>{act.setBase('Spell_Simple_Idle_Loop',.2);runeFlash(c,0x9a40ff,8,2);sx('portal',.7,null,{rate:.7,wet:.4})},update:dt=>{e.t+=dt;kaenFx(e,dt);act.update(dt)}},
    {who:'Kaen',text:EPL.sum,fov:46,cam:k=>{const m=gs.length?gs.reduce((s,g)=>s.add(g.pos),V3()).multiplyScalar(1/gs.length):c;return{pos:headOf(c,2.6).addScaledVector(d,-4.2).addScaledVector(sd,1.6),look:headOf(m,2.2)}},
      onStart:()=>{act.fire('OverhandThrow',.6);gs=summonGuardians(e,2);for(const g of gs)if(g.m&&g.m.g){g.m.g.position.copy(g.pos)}},update:dt=>{e.t+=dt;kaenFx(e,dt);act.update(dt);for(const g of gs)if(g.m&&g.m.g&&Math.random()<.5)SP.emit(eCenter(g),{c0:0xd0a0ff,c1:0x30106a,s0:.6,s1:.05,life:.7,up:2,speed:1})}},
    {dur:2.4,fov:50,cut:true,title:['Two guardians','One is real. One is a lie.'],cam:k=>({pos:headOf(c,7+k*2).addScaledVector(d,20-k*3).addScaledVector(sd,-6),look:headOf(c,4)}),update:dt=>{e.t+=dt;kaenFx(e,dt);act.update(dt)}}
  ],()=>{e.busy=0;act.setBase('Idle_Loop',.3);after(.8,()=>bark('@','m_illu',3,0))})}

/* ---------- monster-specific barks ---------- */
{const _de=damageEnemy;damageEnemy=function(o,amt){const r=_de.apply(this,arguments);if(o&&MODE!=='open'&&BK['@']['m_'+o.type]&&o.type!=='greyfang'){const id='m_'+o.type;EP.mb=EP.mb||{};if(!(EP.mb[id]>time)){EP.mb[id]=time+45;bark('@',id,1,0,.6)}}return r}}
{const _bt=barkTick;barkTick=function(dt){_bt(dt);const b=bossRef&&!bossRef.dead?bossRef:null;if(b&&b.type==='greyfang'&&!b._said&&!CS.active&&P.alive){b._said=1;after(1.2,()=>bark('@','m_greyfang',3,0))}}}

/* ================= 6 · THE TOWER: magic fails, the Tower asks, the Tower burns ================= */
const NZQ={links:[],spirit:null,stage:0,said:0,cardT:0};
const TQE=[['Which river runs past the Tower of London?',['The Thames','The Seine','The Nile','The Amazon']],['What is kept in the Jewel House?',['The Crown Jewels','A dragon','The Eiffel Tower','Pizza']],
  ['What colour is a classic London bus?',['Red','Green','Purple','Gold']],['Who guards the Tower of London?',['The Beefeaters','The Musketeers','Ninjas','Penguins']],
  ['What does the Hollow Crown feed on?',['Fear','Croissants','Rain','Music']],['Which city is the Tower of London in?',['London','Paris','Rome','Calais']],['What lives at the Tower, by royal order?',['Ravens','Lions','Sharks','Camels']]];
const TQ=[['How many ravens must stay at the Tower, or the kingdom falls?',['Six','Three','Nine','Twelve']],['Who guards the Tower of London?',['The Yeoman Warders','The Musketeers','The Swiss Guard','The Night\'s Watch']],
  ['Which king built the White Tower?',['William the Conqueror','Henry VIII','Richard the Lionheart','Charles I']],['Which queen lost her head on Tower Green in 1536?',['Anne Boleyn','Elizabeth I','Mary, Queen of Scots','Victoria']],
  ['What is kept in the Jewel House?',['The Crown Jewels','The Magna Carta','Big Ben\'s bell','The Rosetta Stone']],['Which river runs past the Tower?',['The Thames','The Seine','The Severn','The Mersey']],
  ['Through which gate were prisoners brought in by boat?',['Traitors\' Gate','Lion Gate','Byward Gate','Water Gate']],['What does the Hollow Crown feed on?',['Fear','Gold','Blood','Light']],['What did Kaen give up to save Lyra?',['His kindness','His sword','His eyes','His name']]];
{const _gk=nzGhostKaen;nzGhostKaen=function(at){const n0=NZ.g?NZ.g.children.length:0;const a=_gk.apply(this,arguments);if(NZ.g){NZQ.links=NZ.g.children.slice(n0).filter(o=>o.isMesh&&o.geometry&&o.geometry.type==='TorusGeometry');
    for(const l of NZQ.links){l.material=l.material.clone();l.userData.p0=l.position.clone()}if(CH2.st>=6)epFreeKaen(true)}return a}}
{const _no=nzObj;nzObj=function(){if(CH2.zone==='north'&&CH2.st>=6)return 'Kaen is free · Lyra\'s red door by the Tower gate leads home';if(CH2.zone==='north'&&CH2.st===5&&NZ.green){const d=Math.round(Math.hypot(P.pos.x-NZ.green.x,P.pos.z-NZ.green.z));
    return NZQ.stage>=1?`Answer <b>the Tower's questions</b> beside Kaen · ${d}m`:`Break the Crown's <b>chains</b> holding Kaen · ${d}m`}return _no.apply(this,arguments)}}
function epTowerSpirit(){if(NZQ.spirit)return NZQ.spirit;const g=new THREE.Group();g.position.set(226,-12,-10224);NZ.g.add(g);
  const gm=new THREE.MeshBasicMaterial({color:0x22d070,transparent:true,opacity:.5,depthWrite:false,side:THREE.DoubleSide});const dk=new THREE.MeshBasicMaterial({color:0x02140a,transparent:true,opacity:.7,depthWrite:false});
  const head=new THREE.Mesh(new THREE.SphereGeometry(3,28,20),gm);head.scale.set(1,1.2,.95);g.add(head);const jaw=new THREE.Mesh(new THREE.BoxGeometry(3.2,1.6,2.6),gm);jaw.position.set(0,-2.8,.6);g.add(jaw);
  const helm=new THREE.Mesh(new THREE.CylinderGeometry(3.3,3.1,1.4,28,1,true),gm);helm.position.y=1.6;g.add(helm);for(let k=0;k<10;k++){const a=k/10*TAU;const sp=new THREE.Mesh(new THREE.ConeGeometry(.35,2.4,6),gm);sp.position.set(Math.sin(a)*3.1,3.3,Math.cos(a)*3.1);g.add(sp)}
  const eyes=[];for(const s of[-1,1]){const h=new THREE.Mesh(new THREE.SphereGeometry(.75,14,10),dk);h.position.set(s*1.15,.1,2.45);g.add(h);const e=glowSprite(0x9affb0,2.2,.95,false);e.position.set(s*1.15,.1,2.9);g.add(e);eyes.push(e)}
  const mouth=new THREE.Mesh(new THREE.BoxGeometry(2,.35,.4),dk);mouth.position.set(0,-2.2,2.7);g.add(mouth);const aura=glowSprite(0x60ff90,16,.25,false);g.add(aura);
  const sp={g,eyes,mouth,aura,y:-12,ty:-12,charge:0};NZ.anim.push(dt=>{sp.y+=(sp.ty-sp.y)*Math.min(1,dt*1.2);const t=performance.now()*.001;g.position.y=sp.y+Math.sin(t*1.1)*.5;g.visible=sp.y>-11;
    g.rotation.y=Math.atan2(P.pos.x-g.position.x,P.pos.z-g.position.z)*.6;gm.opacity=.45+Math.sin(t*3)*.08;mouth.scale.y=1+Math.max(0,Math.sin(t*9))*(VO.src?1.6:0);
    for(const e of eyes){e.scale.setScalar(2.2+sp.charge*5+Math.sin(t*20)*sp.charge*.6)}if(g.visible&&Math.random()<.35)SM.emit(V3(g.position.x+rand(-3,3),g.position.y-3,g.position.z+rand(-2,2)),{c0:0x60ff90,c1:0x02140a,s0:1.5,s1:4,life:1.4,a:.25,up:-1,speed:.6})});
  NZQ.spirit=sp;return sp}
const epEyes=()=>{const s=NZQ.spirit;return s?s.g.position.clone().add(V3(0,.1,2.6)):V3(226,14,-10222)};
function epChains(){if(NZQ.stage>=1||CS.active)return;NZQ.stage=1;const c=NZ.green;const kS=sd=>()=>({pos:headOf(c,1.3).add(V3(sd||2.2,.2,3.2)),look:headOf(c,.9)});const gk=a=>{try{if(NZ.ghost)NZ.ghost.setBase(a,.3)}catch(x){}};let sq=0;
  const squeeze=dt=>{sq=Math.min(1,sq+dt*.8);for(const l of NZQ.links){const p0=l.userData.p0;if(!p0)continue;l.position.lerpVectors(p0,V3(c.x,p0.y-.2,c.z+.1),.35*sq+Math.sin(time*30)*.01);l.material.emissive&&l.material.emissive.setHex(0x40ff80);l.material.emissiveIntensity=sq*1.5}};
  for(const p of projs)p.life=0;
  playCutscene([
    {dur:1.8,fov:40,cut:true,cam:k=>({pos:headOf(c,1.1).add(V3(2.6-k*.6,.3,2.4)),look:headOf(c,1)}),onStart:()=>{sx('chain',1.4,()=>{try{sfx.boom()}catch(x){}},{wet:.3});sx('impact',.8,null,{rate:.6});flash(headOf(c,1),0x60ff90,10);P.shake=.9;gk('Hit_Knockback')},update:squeeze},
    {who:"Kaen's Spirit",text:EPL.stop,cam:kS(-1.6),onStart:()=>gk('Crouch_Idle_Loop'),update:dt=>{squeeze(dt);if(Math.random()<.3)SP.emit(headOf(c,1),{c0:0x9affb0,c1:0x0a3010,s0:.3,s1:.03,life:.6,speed:2})}},
    {who:'@',text:EPL.drink,cam:witchShot(1,3),update:squeeze},
    {who:"Kaen's Spirit",text:EPL.clue,cut:true,cam:kS(1.6),onStart:()=>{for(const l of NZQ.links){if(l.userData.p0)l.position.copy(l.userData.p0);l.material.emissiveIntensity=.3}}},
    {who:'@',text:EPL.quiz,cam:witchShot(-1,3.2)},
    {dur:3,fov:54,cut:true,cam:k=>({pos:V3(202,2.5+k*2,-10206),look:V3(226,4+k*10,-10224)}),onStart:()=>{const s=epTowerSpirit();s.y=-12;s.ty=14;sx('garg',.9,null,{rate:.55,wet:.5});sx('riser',.8,null,{rate:.6});flash(V3(226,10,-10224),0x60ff90,30);P.shake=1.4}},
    {who:'The Tower',text:EPL.sp1,fov:38,cam:k=>({pos:V3(204-k*2,2.6+k,-10206),look:epEyes()})}
  ],()=>{epQuiz()})}
function epQuiz(){if(NZQ.quiz)return;if(typeof TUT!=='undefined'&&TUT.on)try{tutEnd(true)}catch(x){}const hard=DIFF==='hard';const pool=(hard?TQ:TQE).slice().sort(()=>Math.random()-.5).slice(0,hard?5:3);NZQ.quiz={i:0,pool};P.invuln=99;for(const e of enemies)if(!e.dead)removeEnemy(e);epAsk()}
function epAsk(){const Q=NZQ.quiz;if(!Q)return;const [q,opts]=Q.pool[Q.i];const order=opts.map((t,k)=>[t,k]).sort(()=>Math.random()-.5);
  const c=tutCard(`<div class="tl">The Tower · question ${Q.i+1} of ${Q.pool.length}</div><h3>${q}</h3><div style="display:flex;flex-direction:column;gap:8px;margin-top:10px">${order.map(([t,k])=>`<button data-a="${k}">${t}</button>`).join('')}</div>`);
  c.onclick=ev=>{const b=ev.target.closest('[data-a]');if(!b||!NZQ.quiz)return;tutHide();if(b.dataset.a==='0'){sx('ding',1,()=>{try{sfx.gem()}catch(x){}});flash(epEyes(),0x9affb0,6);Q.i++;if(Q.i>=Q.pool.length)epPass();else setTimeout(epAsk,650)}else epFail()}}
function epFail(){NZQ.quiz=null;const sp=epTowerSpirit();let beam=null;
  playCutscene([
    {who:'The Tower',text:EPL.sp2,fov:40,cut:true,cam:()=>({pos:V3(205,2.6,-10206),look:epEyes()}),onStart:()=>{tutHide();sp.charge=.4;sx('garg',.7,null,{rate:.5})}},
    {who:'@',text:EPL.ohno,cam:witchShot(1,2.6),update:dt=>{sp.charge=Math.min(1,sp.charge+dt*.6);const e=epEyes();for(let n=0;n<3;n++){const a=Math.random()*TAU;SP.emit(e.clone().add(V3(Math.sin(a)*4,rand(-3,3),Math.cos(a)*4)),{c0:0xc0ffd0,c1:0x10a040,s0:.6,s1:.05,life:.5,speed:-8})}}},
    {dur:2.4,fov:50,cut:true,cam:k=>{const e=epEyes();const d=V3(e.x-P.pos.x,0,e.z-P.pos.z).normalize();return{pos:headOf(P.pos,2.2+k).addScaledVector(d,-4.5).addScaledVector(V3(d.z,0,-d.x),2.2),look:headOf(P.pos,1.2).lerp(e,.35)}},onStart:()=>{sx('laser',1.5,()=>{try{sfx.boom()}catch(x){}},{wet:.3,duck:4});
        const a=epEyes(),b=headOf(P.pos,1.1);const L=a.distanceTo(b);beam=new THREE.Group();const m1=new THREE.Mesh(new THREE.CylinderGeometry(.55,.55,L,20,1,true),new THREE.MeshBasicMaterial({color:0x60ff90,transparent:true,opacity:.45,blending:THREE.AdditiveBlending,depthWrite:false,side:THREE.DoubleSide}));
        const m2=new THREE.Mesh(new THREE.CylinderGeometry(.16,.16,L,12,1,true),new THREE.MeshBasicMaterial({color:0xffffff,transparent:true,opacity:.9,blending:THREE.AdditiveBlending,depthWrite:false}));beam.add(m1,m2);beam.position.copy(a).lerp(b,.5);beam.lookAt(b);beam.rotateX(Math.PI/2);scene.add(beam);
        flash(b,0xffffff,22);flash(b,0x60ff90,18);ring(P.pos,0x9affb0,1,12,.6);P.shake=2.4;vib([200,50,300]);P.heroAnim='Hit_Knockback';SP.emit(b,{n:220,c0:0xffffff,c1:0x30ff70,speed:14,life:1.1,s0:.8,s1:.05});SM.emit(b,{n:30,c0:0x405040,c1:0x0a0a0a,s0:2,s1:6,speed:6,life:1.6,a:.6})},
      update:(dt,k)=>{if(beam){const s=1+Math.sin(time*50)*.15;beam.children[0].scale.set(s*(1-k*.6),1,s*(1-k*.6));beam.children[0].material.opacity=.6*(1-k)}sp.charge=Math.max(0,1-k*2)}}
  ],()=>{if(beam)scene.remove(beam);sp.charge=0;P.heroAnim=null;P.invuln=0;NZQ.cardT=6;die()})}
function epPass(){NZQ.quiz=null;const c=NZ.green;const sp=epTowerSpirit();
  playCutscene([
    {who:'The Tower',text:EPL.sp3,fov:44,cut:true,cam:()=>({pos:V3(205,2.6,-10206),look:epEyes()}),onStart:()=>tutHide()},
    {dur:2.6,fov:42,cut:true,cam:k=>({pos:headOf(c,1.4).add(V3(3.4-k,.4,3.2)),look:headOf(c,1)}),onStart:()=>{epFreeKaen(false);sx('shbreak',1.2,()=>{try{sfx.shatter()}catch(x){}});sx('ding',.9,null,{delay:.3});sx('powerup',.8,null,{delay:.5});flash(headOf(c,1.2),0xd0f0ff,16);P.shake=1;sp.ty=-14}},
    {who:'@',text:EPL.full,cam:witchShot(1,3)},
    {who:"Kaen's Spirit",text:EPL.free,cut:true,cam:()=>({pos:headOf(c,1.6).add(V3(1.6,.1,2.6)),look:headOf(c,1.5)})}
  ],()=>{CH2.st=Math.max(CH2.st,6);ch2Save();P.invuln=2;writeSave();stAfterQuiz()})}
function epFreeKaen(silent){for(const l of NZQ.links){if(silent){l.visible=false;continue}const v=V3(rand(-4,4),rand(2,6),rand(-4,4));addFx(l,1.4,(f,k)=>{l.position.addScaledVector(v,1/60);v.y-=.2;l.rotation.x+=.3;l.scale.setScalar(1-k)},()=>{l.visible=false})}
  try{if(NZ.ghost)NZ.ghost.setBase('Idle_Loop',.6)}catch(x){}}
{const _mt=muTick;muTick=function(dt){_mt(dt);if(MODE==='open'||CH2.zone!=='north'||!NZ.green||!started)return;const tw=Math.hypot(P.pos.x-NZ.green.x,P.pos.z-NZ.green.z);
  if(CH2.st===5&&tw<70){NZ.lt=Math.max(NZ.lt,4);NZ.tollT=Math.max(NZ.tollT,30)}if(CS.active||!P.alive||CH2.st!==5)return;
  if(NZQ.stage===0){if(tw<13&&!NZQ.said){NZQ.said=1;bark('@','tw_hold',3,0);toast('Hit the chains with a spell.','The Tower')}
    for(const p of projs){if(Math.hypot(p.pos.x-NZ.green.x,p.pos.z-NZ.green.z)<3&&p.pos.y<4){epChains();break}}}
  else if(!NZQ.quiz){NZQ.cardT-=dt;if(tw<7&&NZQ.cardT<=0){NZQ.cardT=8;if(typeof TUT!=='undefined'&&TUT.on)try{tutEnd(true)}catch(x){}const c=tutCard(`<div class="tl">The Tower</div><h3>Answer the Tower's questions</h3><p>Every answer must be right. One mistake and the Tower burns you.</p><div class="row"><button class="gh" data-a="no">Not yet</button><button data-a="go">Answer</button></div>`);
      c.onclick=ev=>{const b=ev.target.closest('[data-a]');if(!b)return;tutHide();if(b.dataset.a==='go'){const s=epTowerSpirit();s.ty=14;epQuiz()}}}else if(tw>12&&NZQ.cardT>1)NZQ.cardT=1}}}

/* ================= 7 · THE LOOK: filmic grade, sharper textures, finer shadows ================= */
if(gradePass){const U=gradePass.uniforms;U.uExp={value:.92};U.uFilm={value:1};
  gradePass.material.fragmentShader=gradePass.material.fragmentShader.replace('uniform sampler2D tDiffuse;','uniform sampler2D tDiffuse;uniform float uExp,uFilm;vec3 aces(vec3 x){return clamp((x*(2.51*x+.03))/(x*(2.43*x+.59)+.14),0.,1.);}')
    .replace('gl_FragColor=vec4(max(col,0.0),1.0);','vec3 fc=aces(col*uExp);float L2=dot(fc,vec3(.299,.587,.114));fc+=mix(vec3(-.012,.004,.022),vec3(.022,.008,-.014),smoothstep(.25,.75,L2));col=mix(col,fc,uFilm);gl_FragColor=vec4(max(col,0.0),1.0);');
  gradePass.material.needsUpdate=true}
{const maxA=renderer.capabilities.getMaxAnisotropy?renderer.capabilities.getMaxAnisotropy():1;const seen=new WeakSet();let acc=0;
  const sweep=()=>{const A=Math.min(maxA,quality>=3?8:4);scene.traverse(o=>{const m=o.material;if(!m)return;for(const mm of(Array.isArray(m)?m:[m])){if(seen.has(mm))continue;seen.add(mm);for(const k of['map','normalMap','roughnessMap']){const t=mm[k];if(t&&t.anisotropy<A){t.anisotropy=A;t.needsUpdate=true}}}})};
  const _mt=muTick;muTick=function(dt){_mt(dt);acc-=dt;if(acc<=0){acc=6;try{sweep()}catch(x){}}}}
if(!isTouch&&moonLight.shadow.mapSize.x<4096){moonLight.shadow.mapSize.set(4096,4096);if(moonLight.shadow.map){moonLight.shadow.map.dispose();moonLight.shadow.map=null}}
