function gsAt(c,s1,o,x,y,z){const g=glowSprite(c,s1,o);g.position.set(x,y,z);return g}
/* ================= XVIII · Morwen falls out of the bell; the Pull across the Atlantic; Jackson Square ================= */
/* ---------- Morwen, half here, nameless ---------- */
const MW={a:null,mats:[],fl:0};
function mwBuild(){if(MW.a)return MW.a;const a=makeCHActor('f',{skin:0xf6ece8,skinLift:[1.3,1.42,1.5],hair:'hairLong',hairCol:0xd8c89a,brow:0x6a5a40,eyeTint:0xffe0e8,
    wear:[['long',0x2c2630,{roughness:.6}],['tee',0x3a2a34,{roughness:.55}],['witch',0x241c26,{roughness:.6,side:THREE.DoubleSide}],['shoes',0x121014,{roughness:.5}]]});if(!a)return null;
  a.g.traverse(o=>{if(o.isMesh||o.isSkinnedMesh){o.material=o.material.clone();o.material.transparent=true;MW.mats.push(o.material)}});
  const gl=glowSprite(0xffb0c8,3.4,.3);gl.position.y=1.1;a.g.add(gl);MW.gl=gl;a.g.userData.mtK=1;scene.add(a.g);try{a.setBase('Crouch_Idle_Loop');a.update(.3)}catch(x){}MW.a=a;return a}
function mwTick(dt){const a=MW.a;if(!a||!a.g.visible)return;try{a.update(dt)}catch(x){}
  if(CH2.zone==='nola'&&!CS.active&&!PL.on){const f=V3(Math.sin(P.face),0,Math.cos(P.face)),r=V3(f.z,0,-f.x);const tg=P.pos.clone().addScaledVector(r,-1.9).addScaledVector(f,-2.4);tg.y=0;const g=a.g.position,dd=Math.hypot(tg.x-g.x,tg.z-g.z);
    if(dd>30)g.copy(tg);else g.lerp(tg,Math.min(1,dt*2.6));g.y=0;const an=dd*2.6>5?'Sprint_Loop':dd*2.6>1?'Walk_Loop':'Idle_Loop';if(MW.an!==an){MW.an=an;try{a.setBase(an,.3)}catch(x){}}if(dd>.3)a.g.rotation.y=lerpAngle(a.g.rotation.y,Math.atan2(tg.x-g.x,tg.z-g.z),Math.min(1,dt*5))}MW.fl-=dt;let op=.72+Math.sin(time*2.3)*.12;if(MW.fl<=0){MW.fl=rand(.6,2.2);MW.gl.material.opacity=.55}
  if(MW.fl<.12)op=.18+Math.random()*.3;for(const m of MW.mats)m.opacity=op;MW.gl.material.opacity+=(.28-MW.gl.material.opacity)*Math.min(1,dt*3);
  if(Math.random()<.3)SP.emit(V3(a.g.position.x+rand(-.4,.4),a.g.position.y+rand(.2,1.8),a.g.position.z+rand(-.4,.4)),{c0:0xffffff,c1:0xff9ab8,s0:.25,s1:.02,life:.6,speed:.5,up:.6})}
{const _mt=muTick;muTick=function(dt){_mt(dt);if(started)mwTick(Math.min(dt,.05))}}

/* ---------- the bell breaks ---------- */
function mtBellBreak(){const e=MBL.e;MT.fight=0;for(const E of [...MBL.echo])mbEchoKill(E);mbEchoUI(-1);for(const p of eProjs)scene.remove(p.s);eProjs.length=0;bossRef=null;$('boss').classList.add('hidden');renderer.domElement.style.filter='';
  try{gainXP(4000)}catch(x){}beaten.add('mbell');writeSave();
  const bc=V3(MTK.x,5.2,MTK.z),dais=V3(MTK.x+.6,1.2,MTK.z+2.2),c=V3(MTK.x,0,MTK.z+6.4);mtStage(c,Math.PI,[1.4,2.2],[1.2,-2.2]);const m=mwBuild();m.g.visible=false;let portal=null,shards=[];
  const mwP=()=>MW.a.g.position;
  playCutscene([{dur:2.8,fov:38,cut:true,cam:k=>({pos:V3(MTK.x+4-k*1.2,3.6,MTK.z+7.5-k*1.5),look:bc}),onStart:()=>{x4Talk('');P.heroAnim='Idle_Loop';sx('bellcrack',.9,null,{wet:.5});MBL.swing=4},
      update:(dt,k)=>{if(e.m)e.m.mat.emissiveIntensity=1.2+k*4;P.shake=Math.max(P.shake,.25+k*.5);if(Math.random()<.5)SP.emit(V3(bc.x+rand(-2.5,2.5),bc.y+rand(-2,2),bc.z+rand(-2.5,2.5)),{c0:0xffffff,c1:0x40ffd0,speed:3,life:.5,s0:.3,s1:.03})}},
    {dur:2.6,fov:46,cut:true,cam:k=>({pos:V3(MTK.x-6.5+k*1.5,2.4+k,MTK.z+6),look:V3(MTK.x,2.6,MTK.z)}),onStart:()=>{x5Impact(140,0);flash(bc,0xffffff,40);sx('toll',1,null,{rate:.7,wet:.8});sx('shbreak',.9);P.shake=1.4;x5Punch(16,.6);
        if(e.m){e.m.g.visible=false;const prof=[[3.05,0],[2.85,.55],[2.3,1.5],[2.02,2.7],[1.95,3.5],[1.75,4.1],[1.05,4.5],[0,4.62]].map(q=>new THREE.Vector2(q[0],q[1]));
          for(let i=0;i<4;i++){const sh=new THREE.Mesh(new THREE.LatheGeometry(prof,12,i*TAU/4,TAU/4-.08),e.m.mat);sh.position.set(MTK.x,3.2,MTK.z);sh.userData.mtK=1;scene.add(sh);const a=i*TAU/4+TAU/8,v=V3(Math.sin(a)*6,4,Math.cos(a)*6),sp=V3(rand(-2,2),rand(-2,2),rand(-2,2));
            shards.push(sh);addFx(sh,2.2,(F,k)=>{const dt=1/60;v.y-=14*dt;sh.position.addScaledVector(v,dt);sh.rotation.x+=sp.x*dt;sh.rotation.z+=sp.z*dt;if(sh.position.y<MT.cwl-.2){v.multiplyScalar(.3);if(!sh.userData.sp){sh.userData.sp=1;SP.emit(V3(sh.position.x,MT.cwl+.2,sh.position.z),{n:40,c0:0xffffff,c1:0x40a090,speed:7,up:6,grav:12,life:.9,s0:.6,s1:.05});sx('squelch',.6,null,{rate:.5})}}},()=>{})}}
        removeEnemy(e);MBL.e=null;m.g.visible=true;m.g.position.set(MTK.x,4.2,MTK.z);m.g.rotation.y=0;try{m.setBase('Jump_Loop',.1)}catch(x){}
        addFx(null,.6,(F,k)=>{m.g.position.lerp(V3(dais.x,dais.y,dais.z),Math.min(1,k*k*1.6))},()=>{m.g.position.copy(dais);try{m.setBase('Crouch_Idle_Loop',.2)}catch(x){}SP.emit(headOf(dais,.3),{n:30,c0:0xffffff,c1:0xff9ab8,speed:4,life:.7,s0:.4,s1:.04});sx('impact',.5)});
        for(let i=0;i<40;i++)after(i*.04,()=>SM.emit(V3(MTK.x+rand(-1,1),3+rand(0,2),MTK.z+rand(-1,1)),{n:3,c0:0x2a5a50,c1:0x010403,s0:1.4,s1:4,life:1.8,a:.7,up:2}))}},
    {dur:2.6,fov:36,cut:true,cam:k=>({pos:headOf(dais,.9).add(V3(1.8-k*.4,.2,1.6)),look:headOf(dais,.75)}),onStart:()=>{MT.cwg.material.opacity=.3}},
    {who:'Morwen',text:XL8.ms_35,fov:34,cam:k=>({pos:headOf(dais,.9).add(V3(1.4,.15,1.3)),look:headOf(dais,.8)}),onStart:()=>x4Talk('')},
    mtLine('ms_36',{onStart:()=>{x4Talk('Kaen');if(KFW.a){KFW.a.g.position.set(dais.x+1.1,1.2,dais.z+.9);x4Face(KFW.a,dais);try{KFW.a.setBase('Crouch_Idle_Loop',.3)}catch(x){}}x4Face(MW.a,KFW.a.g.position)}}),
    {who:'Morwen',text:XL8.ms_37,fov:34,cam:k=>({pos:headOf(dais,.9).add(V3(-.8,.2,1.7)),look:headOf(dais,.8)})},
    mtLine('ms_38'),
    /* the smoke slips into the water and a door opens under it */
    {dur:3.2,fov:44,cut:true,cam:k=>({pos:V3(MTK.x+5,4.5-k*1.2,MTK.z-6+k*2),look:V3(MTK.x,MT.cwl+k*.2,MTK.z-1.5)}),onStart:()=>{x4Talk('');sx('portal',1,null,{rate:.6});sx('whale',.4,null,{rate:1.4,wet:.8});
        portal=new THREE.Group();portal.position.set(MTK.x,MT.cwl+.06,MTK.z-1.5);portal.userData.mtK=1;scene.add(portal);const pm=c=>new THREE.MeshBasicMaterial({color:c,transparent:true,opacity:.9,blending:THREE.AdditiveBlending,depthWrite:false,side:THREE.DoubleSide});
        for(let i=0;i<4;i++){const t=new THREE.Mesh(new THREE.TorusGeometry(1.2+i*.7,.06,6,80),pm(i%2?0x40ffd0:0x9ad8ff));t.rotation.x=Math.PI/2;portal.add(t)}const disk=new THREE.Mesh(new THREE.CircleGeometry(3.4,48),pm(0x02261e));disk.rotation.x=-Math.PI/2;disk.material.opacity=.8;portal.add(disk);portal.add(glowSprite(0x40ffd0,14,.6));
        MT.anim.push(dt=>{if(!portal.parent)return false;portal.rotation.y+=dt*1.6;portal.children.forEach((c,i)=>{if(c.isMesh&&c.geometry.type==='TorusGeometry')c.scale.setScalar(1+Math.sin(MT.t*3+i)*.06)})});
        for(let i=0;i<30;i++)after(i*.05,()=>SM.emit(V3(MTK.x+Math.sin(i*.6)*(3-i*.08),2.4-i*.07,MTK.z-1.5+Math.cos(i*.6)*(3-i*.08)),{n:3,c0:0x2a5a50,c1:0x010403,s0:1,s1:3,life:1.2,a:.7}))}},
    mtLine('ms_39',{onStart:()=>{x4Talk('@');P.heroAnim='Idle_Talking_Loop'}}),
    {who:'Morwen',text:XL8.ms_40,fov:34,cam:k=>({pos:headOf(mwP(),1).add(V3(1.6,.2,.9)),look:headOf(mwP(),.85)}),onStart:()=>{x4Talk('');try{MW.a.setBase('Idle_Loop',.5)}catch(x){}MW.a.g.position.y=1.2}},
    mtLine('ms_41'),mtLine('ms_42',{onStart:()=>{x4Talk('Kaen');try{KFW.a.setBase('Idle_Loop',.3)}catch(x){}}}),
    mtLine('ms_43',{onStart:()=>{x4Talk('@');sx('rush',.5,null,{fade:1.5});P.shake=.5}}),
    /* the yank */
    {dur:2.2,fov:58,cut:true,cam:k=>({pos:V3(MTK.x+6-k*2,5+k*2,MTK.z+6),look:V3(MTK.x,1,MTK.z-1.5)}),onStart:()=>{x4Talk('');sx('portal',1,null,{rate:1.6});sx('sonic',.8);P.heroAnim='Jump_Loop';P.shake=1.5;
        const pc=V3(MTK.x,MT.cwl,MTK.z-1.5),who=[()=>P.pos,()=>KFW.a&&KFW.a.g.position,()=>LYR.a&&LYR.a.g.position,()=>MW.a&&MW.a.g.position];
        addFx(null,2.1,(F,k)=>{for(const f of who){const p=f();if(!p)continue;p.lerp(V3(pc.x,pc.y+(1-k)*2,pc.z),Math.min(1,k*k*.22));}W.g.position.copy(P.pos);if(Math.random()<.8)SP.emit(V3(pc.x+rand(-3,3),pc.y+rand(0,3),pc.z+rand(-3,3)),{c0:0xffffff,c1:0x40ffd0,speed:6,life:.4,s0:.4,s1:.03})})}}],
    ()=>{mtEnd();x5White(.25,.5,()=>{if(portal)scene.remove(portal);for(const s of shards)scene.remove(s);CH2.st=33;ch2Save();plStart(false)})})}

/* ================= the Pull ================= */
const PL={on:0,g:null,t:0,v:240,ox:0,oy:9,vx:0,vy:0,obs:[],orbs:[],str:[],air:[],meter:100,qte:null,ev:[],evI:0,X:20000,ui:null,ts:1,dawn:0,T:72};
function plUI(){if(PL.ui)return PL.ui;const st=document.createElement('style');st.textContent=`#plUI{position:fixed;inset:0;pointer-events:none;z-index:31;font-family:Outfit,system-ui,sans-serif;color:#fff;display:none}#plUI.on{display:block}
#plSpd{position:absolute;left:50%;top:calc(18px + env(safe-area-inset-top,0px));transform:translateX(-50%);text-align:center;text-shadow:0 2px 8px rgba(0,0,0,.8)}#plSpd b{display:block;font:400 clamp(30px,5vw,52px) 'Bangers',Impact,sans-serif;letter-spacing:.06em;color:#fff4d0}#plSpd span{font:600 11px Outfit;letter-spacing:.3em;color:#ffd89a}
#plSpd.gl b{animation:plgl .09s steps(2) infinite;color:#ff8a9a}@keyframes plgl{0%{transform:translate(2px,-1px)}50%{transform:translate(-2px,1px)}}
#plLy{position:absolute;left:18px;top:calc(18px + env(safe-area-inset-top,0px));width:min(220px,40vw)}#plLy small{font:600 11px Outfit;letter-spacing:.24em;color:#ffb0c4;text-shadow:0 1px 3px #000}#plLy i{display:block;height:9px;border-radius:6px;background:rgba(0,0,0,.45);border:1px solid rgba(255,176,196,.6);margin-top:5px;overflow:hidden}#plLy i u{display:block;height:100%;background:linear-gradient(90deg,#ff6a90,#ffd0e0);box-shadow:0 0 10px #ff8ab0}#plLy.low i u{background:#ff3a4a;animation:pllow .3s infinite alternate}@keyframes pllow{to{opacity:.4}}
#plMap{position:absolute;left:50%;bottom:calc(24px + env(safe-area-inset-bottom,0px));transform:translateX(-50%);width:min(560px,82vw);height:30px}#plMap s{position:absolute;left:0;right:0;top:13px;height:3px;background:rgba(255,255,255,.25);border-radius:2px}#plMap q{position:absolute;top:9px;width:11px;height:11px;margin-left:-5px;border-radius:50%;background:#123;border:2px solid #9ad8ff}#plMap q.p{background:#9ad8ff}#plMap em{position:absolute;top:-6px;font:600 9px Outfit;letter-spacing:.12em;color:#cfe8ff;transform:translateX(-50%);white-space:nowrap;font-style:normal;text-shadow:0 1px 2px #000}#plMap b{position:absolute;top:5px;width:19px;height:19px;margin-left:-9px;border-radius:50%;background:radial-gradient(#fff,#9ad8ff 60%,transparent 70%);box-shadow:0 0 14px #9ad8ff}
body.plOn #hud,body.plOn #objTrack,body.plOn #spells,body.plOn #moveBtns,body.plOn #flyMeter,body.plOn #boss,body.plOn #mapWrap,body.plOn #autoBtn,body.plOn #pauseBtn,body.plOn #spellBtn,body.plOn .spBtn{opacity:0!important;pointer-events:none!important}
#plHit{position:absolute;inset:0;background:radial-gradient(circle,rgba(255,0,40,0) 40%,rgba(255,20,40,.5));opacity:0;transition:opacity .25s}
#plQ{position:absolute;left:50%;top:38%;transform:translate(-50%,-50%);text-align:center;display:none}#plQ.on{display:block}#plQ h2{margin:0;font:400 clamp(40px,7vw,78px) 'Bangers',Impact,sans-serif;letter-spacing:.05em;color:#ffd84a;text-shadow:0 5px 0 #5a2200,0 0 24px rgba(255,170,40,.9)}#plQ i{display:block;width:min(380px,70vw);height:14px;margin:10px auto 0;border-radius:8px;background:rgba(0,0,0,.5);border:2px solid #ffd84a;overflow:hidden}#plQ i u{display:block;height:100%;width:0;background:linear-gradient(90deg,#ffb020,#fff2b0)}
#plK{position:absolute;left:50%;top:30%;transform:translate(-50%,-50%);font:400 clamp(28px,4.6vw,48px) 'Bangers',Impact,sans-serif;letter-spacing:.05em;color:#fff;text-shadow:0 4px 0 #0a2040,0 0 20px rgba(120,200,255,.9);opacity:0;transition:opacity .4s;text-align:center;white-space:nowrap}#plK.on{opacity:1}#plK small{display:block;font:600 14px Outfit;letter-spacing:.2em;color:#cfe8ff}`;document.head.appendChild(st);
  const d=document.createElement('div');d.id='plUI';d.innerHTML=`<div id="plHit"></div><div id="plSpd"><b>0</b><span>MPH</span></div><div id="plLy"><small>LYRA</small><i><u></u></i></div><div id="plMap"><s></s></div><div id="plQ"><h2></h2><i><u></u></i></div><div id="plK"></div>`;document.body.appendChild(d);
  const M=d.querySelector('#plMap');for(const [k,n] of [[0,'BREST'],[.33,'AZORES'],[.72,'BERMUDA'],[.86,'DELTA'],[1,'NEW ORLEANS']]){const q=document.createElement('q');q.style.left=(k*100)+'%';M.appendChild(q);const em=document.createElement('em');em.style.left=(k*100)+'%';em.textContent=n;M.appendChild(em)}const b=document.createElement('b');M.appendChild(b);
  PL.ui={d,spd:d.querySelector('#plSpd'),ly:d.querySelector('#plLy'),bar:d.querySelector('#plLy u'),me:b,map:M,hit:d.querySelector('#plHit'),q:d.querySelector('#plQ'),k:d.querySelector('#plK')};return PL.ui}
function plKin(html,dur){const u=plUI();u.k.innerHTML=html;u.k.classList.add('on');clearTimeout(PL.kT);PL.kT=setTimeout(()=>u.k.classList.remove('on'),(dur||2.4)*1000)}
const plW=(x,y,z)=>V3(PL.X+x,y,z);
function plBuild(){if(PL.g)return;const G=PL.g=new THREE.Group();G.position.x=PL.X;G.userData.mtK=1;scene.add(G);G.visible=false;
  const wn=waterN.clone();wn.needsUpdate=true;wn.wrapS=wn.wrapT=THREE.RepeatWrapping;wn.repeat.set(90,90);PL.wn=wn;
  const sea=new THREE.Mesh(new THREE.PlaneGeometry(6000,6000),std({color:0x0a1c2c,roughness:.12,metalness:.55,normalMap:wn,envMapIntensity:1.6}));sea.material.normalScale=new THREE.Vector2(1.2,1.2);sea.rotation.x=-Math.PI/2;sea.position.z=-1800;G.add(sea);PL.sea=sea;
  const sm=new THREE.MeshBasicMaterial({color:0xd8f0ff,transparent:true,opacity:.28,blending:THREE.AdditiveBlending,depthWrite:false});const sg=new THREE.PlaneGeometry(.3,1);
  for(let i=0;i<150;i++){const m=new THREE.Mesh(sg,sm);m.rotation.x=-Math.PI/2;m.scale.y=rand(18,70);m.position.set(rand(-160,160),.15,rand(-1400,60));G.add(m);PL.str.push(m)}
  const am=new THREE.MeshBasicMaterial({color:0xffffff,transparent:true,opacity:.22,blending:THREE.AdditiveBlending,depthWrite:false});const ag=new THREE.BoxGeometry(.05,.05,1);
  for(let i=0;i<80;i++){const m=new THREE.Mesh(ag,am);m.scale.z=rand(8,24);m.position.set(rand(-34,34),rand(1,42),rand(-500,40));if(Math.abs(m.position.x)<4&&Math.abs(m.position.y-9)<4)m.position.x+=8;G.add(m);PL.air.push(m)}
  PL.cone=new THREE.Mesh(new THREE.ConeGeometry(7,16,32,1,true),new THREE.MeshBasicMaterial({color:0xffffff,transparent:true,opacity:0,blending:THREE.AdditiveBlending,depthWrite:false,side:THREE.DoubleSide}));PL.cone.rotation.x=-Math.PI/2;G.add(PL.cone);
  PL.trail=glowSprite(0x9ad8ff,6,.0);G.add(PL.trail)}
/* scenery and hazards */
function plAdd(o){o.g.userData.mtK=1;PL.g.add(o.g);PL.obs.push(o);return o}
function plLight(){const g=new THREE.Group();const T=sbCanvas(64,256,(x,w,h)=>{for(let i=0;i<8;i++){x.fillStyle=i%2?'#f4f4f4':'#141414';x.fillRect(0,i*32,w,32)}});const tw=new THREE.Mesh(new THREE.CylinderGeometry(2.2,3,34,20),std({map:T,roughness:.6}));tw.position.y=17;g.add(tw);
  const lan=new THREE.Mesh(new THREE.CylinderGeometry(2.4,2.4,3,16),new THREE.MeshBasicMaterial({color:0xfff4c0}));lan.position.y=35.5;g.add(lan);g.add(gsAt(0xfff0b0,30,.8,0,35.5,0));
  const beam=new THREE.Mesh(new THREE.ConeGeometry(14,140,24,1,true),new THREE.MeshBasicMaterial({color:0xfff0c0,transparent:true,opacity:.12,blending:THREE.AdditiveBlending,depthWrite:false,side:THREE.DoubleSide}));beam.position.y=35.5;beam.geometry.translate(0,-70,0);beam.rotation.z=Math.PI/2;const bh=new THREE.Group();bh.position.y=35.5;beam.position.y=0;bh.add(beam);g.add(bh);
  const rk=std({color:0x2a2a2a,roughness:.9});for(let i=0;i<7;i++){const r=new THREE.Mesh(new THREE.DodecahedronGeometry(rand(3,7),0),rk);r.position.set(rand(-8,8),0,rand(-8,8));g.add(r)}
  return{g,x:-30,y:0,z:-900,r:0,sc:1,upd:(o,dt)=>{bh.rotation.y+=dt*2.4}}}
function plCliffs(){const g=new THREE.Group();const T=mtTex();const m=mtM(T.rock,40,3,{color:0x6a6458,roughness:.95});for(let i=0;i<10;i++){const b=new THREE.Mesh(new THREE.BoxGeometry(rand(40,70),rand(40,80),rand(60,110)),m);b.position.set(rand(-10,20),b.geometry.parameters.height/2-4,-i*90);b.rotation.y=rand(-.2,.2);g.add(b)}return{g,x:170,y:0,z:-1300,r:0,sc:1}}
function plStorm(){const g=new THREE.Group();const m=std({color:0x10141c,roughness:1,emissive:0x0a0c14,transparent:true,opacity:.92});for(let i=0;i<7;i++){const s=new THREE.Mesh(new THREE.SphereGeometry(rand(2.6,4.4),12,10),m);s.position.set(rand(-2.5,2.5),rand(-1.5,1.5),rand(-2.5,2.5));g.add(s)}
  const fl=glowSprite(0xc8d8ff,14,0);g.add(fl);return{g,x:rand(-14,14),y:rand(5,24),z:-1100,r:5.8,kind:'cell',dmg:.12,upd:(o,dt)=>{fl.material.opacity=Math.random()<.04?.9:fl.material.opacity*.85;g.rotation.y+=dt*.6}}}
function plBolt(){const g=new THREE.Group();const x=rand(-15,15);const col=new THREE.Mesh(new THREE.CylinderGeometry(.5,.5,90,6,1,true),new THREE.MeshBasicMaterial({color:0xb8d0ff,transparent:true,opacity:.18,blending:THREE.AdditiveBlending,depthWrite:false}));col.position.y=45;g.add(col);
  const pts=[];let px=0,py=90;while(py>0){pts.push(V3(px,py,0));px+=rand(-3,3);py-=rand(5,10)}pts.push(V3(px,0,0));const bolt=new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts),40,.5,5),new THREE.MeshBasicMaterial({color:0xffffff,transparent:true,opacity:0,blending:THREE.AdditiveBlending,depthWrite:false}));g.add(bolt);
  return{g,x,y:0,z:-520,r:0,kind:'bolt',upd:(o,dt)=>{col.material.opacity=.12+Math.random()*.2;if(o.z>-70&&!o.st){o.st=1;bolt.material.opacity=1;col.material.opacity=.5;sx('thunder',.8,null,{rate:rand(.9,1.2)});sx('zap',.6);flash(plW(o.x,20,o.z),0xd0e0ff,30);PL.flashK=1;if(Math.abs(PL.ox-o.x)<4.2&&!o.hit){o.hit=1;plHurt(.13,'ZAP!')}}if(o.st)bolt.material.opacity*=.86}}}
function plWhale(){const g=new THREE.Group();const m=new THREE.MeshBasicMaterial({color:0x8ae8ff,transparent:true,opacity:.42,blending:THREE.AdditiveBlending,depthWrite:false});const b=new THREE.Mesh(new THREE.SphereGeometry(1,24,16),m);b.scale.set(6,5,22);g.add(b);
  const h=new THREE.Mesh(new THREE.SphereGeometry(1,16,12),m);h.scale.set(5,4.4,7);h.position.z=-18;g.add(h);for(const s of[-1,1]){const f=new THREE.Mesh(new THREE.ConeGeometry(2,9,4),m);f.position.set(s*6,-2,-8);f.rotation.z=s*1.3;g.add(f)}const t=new THREE.Mesh(new THREE.ConeGeometry(4,10,4),m);t.scale.set(2.4,1,.3);t.position.z=24;t.rotation.x=Math.PI/2;g.add(t);g.add(glowSprite(0x8ae8ff,60,.25));
  const side=PL.ox>0?1:-1;return{g,x:side*8,y:-8,z:-1100,r:9,kind:'whale',dmg:.18,upd:(o,dt)=>{const k=clamp((o.z+300)/360,0,1);o.y=-8+Math.sin(k*Math.PI)*24;g.rotation.x=-.8+k*1.6;if(o.z>-320&&!o.song){o.song=1;sx('whale',1,null,{wet:.8})}}}}
function plShip(){const g=new THREE.Group();const hull=std({color:0xf4f4f0,roughness:.5});const b=new THREE.Mesh(new THREE.BoxGeometry(30,10,110),hull);b.position.y=5;g.add(b);const bow=new THREE.Mesh(new THREE.ConeGeometry(15,30,4),hull);bow.rotation.x=-Math.PI/2;bow.rotation.y=Math.PI/4;bow.scale.set(1,1,.66);bow.position.set(0,5,-68);g.add(bow);
  const win=new THREE.MeshBasicMaterial({color:0xffe0a0});for(let d=0;d<4;d++){const deck=new THREE.Mesh(new THREE.BoxGeometry(26-d*3,3.4,96-d*12),hull);deck.position.y=11.7+d*3.4;g.add(deck);for(const s of[-1,1]){const w=new THREE.Mesh(new THREE.PlaneGeometry(90-d*12,1),win);w.position.set(s*(13.05-d*1.5),11.7+d*3.4,0);w.rotation.y=s*Math.PI/2;g.add(w)}}
  for(const z of[-10,14]){const f=new THREE.Mesh(new THREE.CylinderGeometry(2.6,3,8,12),std({color:0x1a3a6a}));f.position.set(0,29,z);g.add(f)}g.add(gsAt(0xffd8a0,80,.3,0,18,0));
  return{g,x:0,y:0,z:-1400,r:0,kind:'ship',dmg:.2,top:25.5,len:62,upd:(o,dt)=>{if(o.z>-520&&!o.h){o.h=1;sx('shiphorn',1,null,{wet:.6});msSay('ms_54',1);plKin('GO <b style="color:#ffd84a">UP!</b><small>hold W</small>',2.4)}}}}
function plVolcano(){const g=new THREE.Group();const m=new THREE.Mesh(new THREE.ConeGeometry(120,110,40,1,true),mtM(mtTex().rock,20,6,{color:0x3a3430,roughness:.95,side:THREE.DoubleSide}));m.position.y=50;g.add(m);const cr=glowSprite(0xff6020,90,.8);cr.position.y=104;g.add(cr);
  const lav=new THREE.Mesh(new THREE.CircleGeometry(30,24),new THREE.MeshBasicMaterial({color:0xff5010}));lav.rotation.x=-Math.PI/2;lav.position.y=100;g.add(lav);return{g,x:-280,y:0,z:-1700,r:0,upd:(o,dt)=>{if(Math.random()<.6)SM.emit(plW(o.x+rand(-20,20),110,o.z),{n:2,c0:0x3a3030,c1:0x0a0808,s0:10,s1:30,life:3,a:.5,up:8})}}}
function plTri(){const g=new THREE.Group();const m=new THREE.MeshBasicMaterial({color:0x40ff90,transparent:true,opacity:.5,blending:THREE.AdditiveBlending,depthWrite:false});for(let i=0;i<3;i++){const a=i/3*TAU;const b=new THREE.Mesh(new THREE.PlaneGeometry(2,180),m);b.rotation.x=-Math.PI/2;b.rotation.z=a+Math.PI/2;b.position.set(Math.cos(a+Math.PI/3)*52,.3,Math.sin(a+Math.PI/3)*52);g.add(b)}
  const wh=new THREE.Mesh(new THREE.RingGeometry(10,60,64,1),new THREE.MeshBasicMaterial({color:0x60ffa0,transparent:true,opacity:.18,blending:THREE.AdditiveBlending,depthWrite:false,side:THREE.DoubleSide}));wh.rotation.x=-Math.PI/2;wh.position.y=.2;g.add(wh);return{g,x:0,y:0,z:-1300,r:0,upd:(o,dt)=>{wh.rotation.z+=dt*2;g.rotation.y+=dt*.2}}}
function plDelta(){const g=new THREE.Group();const land=std({color:0x1e2a16,roughness:1}),tr=std({color:0x16200e,roughness:1}),tk=std({color:0x2a2018,roughness:1});for(const s of[-1,1])for(let i=0;i<8;i++){const L=new THREE.Mesh(new THREE.BoxGeometry(rand(40,90),2,rand(80,160)),land);L.position.set(s*rand(50,110),.6,-i*170);g.add(L);
    for(let k=0;k<6;k++){const t=new THREE.Group();const tt=new THREE.Mesh(new THREE.CylinderGeometry(.5,1.3,10,6),tk);tt.position.y=5;t.add(tt);const c=new THREE.Mesh(new THREE.ConeGeometry(4,9,7),tr);c.position.y=12;t.add(c);t.position.set(L.position.x+rand(-18,18),1.6,L.position.z+rand(-50,50));g.add(t)}}
  /* paddle steamer */
  const pb=new THREE.Group();const wh=std({color:0xf0ece0,roughness:.5});const h=new THREE.Mesh(new THREE.BoxGeometry(12,4,40),wh);h.position.y=2;pb.add(h);for(let d=0;d<2;d++){const dk=new THREE.Mesh(new THREE.BoxGeometry(11-d*2,3,34-d*8),wh);dk.position.y=5.5+d*3;pb.add(dk)}
  for(const s of[-1,1]){const st=new THREE.Mesh(new THREE.CylinderGeometry(.8,.8,12,10),std({color:0x101010}));st.position.set(s*2.2,14,-10);pb.add(st)}const pw=new THREE.Mesh(new THREE.CylinderGeometry(5,5,10,16),std({color:0xc02020}));pw.rotation.x=Math.PI/2;pw.rotation.z=Math.PI/2;pw.position.set(0,4,22);pb.add(pw);
  pb.add(gsAt(0xffd080,30,.4,0,7,0));pb.position.set(40,0,-500);g.add(pb);
  return{g,x:0,y:0,z:-1300,r:0,upd:(o,dt)=>{pw.rotation.y+=dt*3;if(Math.random()<.5)SM.emit(plW(o.x+40,20,o.z-500-10),{n:1,c0:0x4a4848,c1:0x0a0a0a,s0:3,s1:8,life:2,a:.5,up:4})}}}
function plCity(){const g=new THREE.Group();const em=new THREE.MeshBasicMaterial({color:0xffd090});const dk=std({color:0x1a1a24,roughness:.8,emissive:0x080810});for(let i=0;i<34;i++){const h=rand(20,90),b=new THREE.Mesh(new THREE.BoxGeometry(rand(10,22),h,rand(10,22)),dk);b.position.set(rand(-180,180),h/2,rand(-60,60));g.add(b);for(let k=0;k<5;k++){const w=new THREE.Mesh(new THREE.PlaneGeometry(rand(4,8),1),em);w.position.set(b.position.x,rand(4,h-2),b.position.z+b.geometry.parameters.depth/2+.05);g.add(w)}}
  g.add(gsAt(0xffb060,400,.25,0,40,0));return{g,x:0,y:0,z:-1500,r:0,city:1}}
function plMont(){const g=new THREE.Group();const m=new THREE.Mesh(new THREE.ConeGeometry(70,80,32),std({color:0x1a1814,roughness:1}));m.position.y=36;g.add(m);const sp=new THREE.Mesh(new THREE.ConeGeometry(4,50,4),std({color:0x1a1814}));sp.position.y=96;g.add(sp);g.add(gsAt(0xffc070,160,.4,0,70,0));
  return{g,x:-30,y:0,z:420,r:0,keep:1}}
function plOrb(){const g=new THREE.Group();const c=new THREE.Mesh(new THREE.SphereGeometry(.55,12,10),new THREE.MeshBasicMaterial({color:0xfff4d0}));g.add(c);g.add(glowSprite(0xffc070,5,.9));g.add(glowSprite(0xff9ab8,9,.35));
  return{g,x:rand(-14,14),y:rand(4,25),z:-950,r:2.8,kind:'orb',upd:(o,dt)=>{g.rotation.y+=dt*4;c.scale.setScalar(1+Math.sin(PL.t*12+o.x)*.15)}}}
function plHurt(f,txt){if(PL.hurtT>0)return;PL.hurtT=.8;P.hp=Math.max(1,P.hp-maxHP()*f);PL.meter=Math.max(0,PL.meter-10);const u=plUI();u.hit.style.opacity='1';setTimeout(()=>u.hit.style.opacity='0',220);P.shake=Math.max(P.shake,1.1);x5Punch(10,.35);sx('impact',.8);if(txt)floatText(headOf(P.pos,2.4),txt,'#ff6a7a',true)}
/* the schedule: what happens when, over 72 seconds */
function plSched(){const S=[];const at=(t,f)=>S.push({t,f});
  at(.4,()=>msSay('ms_44',1));at(3,()=>{msSay('ms_45',1);plAdd(plCliffs())});at(8.4,()=>{msSay('ms_46',1);PL.drain=1;plKin('GRAB THE LIGHTS<small>Lyra\'s magic fades over cursed water</small>',3)});
  for(let t=9;t<67;t+=1.25)if(t<41||t>48.5)at(t,()=>plAdd(plOrb()));
  at(16,()=>{PL.storm=1;sx('thunder',.6,null,{rate:.7})});for(let t=17;t<35;t+=2.1)at(t,()=>plAdd(plStorm()));for(let t=19.5;t<36;t+=1.7)at(t,()=>plAdd(plBolt()));at(21,()=>msSay('ms_52',1));
  at(24.5,()=>msSay('ms_47',1));at(27.5,()=>msSay('ms_48',1));at(36,()=>{PL.storm=0});at(36.5,()=>plAdd(plWhale()));at(41,()=>msSay('ms_53',1));
  at(42.5,()=>plQte());at(48.5,()=>plAdd(plVolcano()));at(52,()=>plAdd(plShip()));at(55,()=>{PL.dawnOn=1});at(58,()=>msSay('ms_55',1));at(61,()=>msSay('ms_56',1));
  at(59,()=>plAdd(plTri()));at(62,()=>msSay('ms_57',1));at(64,()=>plAdd(plDelta()));at(66,()=>plAdd(plCity()));at(67.2,()=>msSay('ms_58',1));at(PL.T,()=>plCrash());
  return S.sort((a,b)=>a.t-b.t)}
/* smoke hands grab Lyra: smash space */
function plQte(){const need=DIFF==='easy'?11:DIFF==='hard'?19:15;PL.qte={n:0,need,t:5.2};msSay('ms_49',1);after(1.6,()=>msSay('ms_50',1));after(3.4,()=>msSay('ms_63'));sx('cackle',.6,null,{rate:.7});
  const u=plUI();u.q.classList.add('on');u.q.querySelector('h2').innerHTML=(typeof isTouch!=='undefined'&&isTouch)?'TAP! TAP! TAP!':'SMASH <span class="kc">SPACE</span>!';
  const hm=std({color:0x050807,roughness:.4,emissive:0x0a3028});const hand=new THREE.Group();for(let i=0;i<5;i++){const f=new THREE.Mesh(new THREE.ConeGeometry(.25,3.2,6),hm);f.position.set((i-2)*.35,1.6,0);f.rotation.z=(i-2)*.25;hand.add(f)}const arm=new THREE.Mesh(new THREE.CylinderGeometry(.5,1.2,30,8),hm);arm.position.y=-14;hand.add(arm);hand.userData.mtK=1;PL.g.add(hand);PL.qte.hand=hand}
function plQteHit(){const Q=PL.qte;if(!Q||Q.done)return;Q.n++;sx('khit',.35,null,{rate:1+Q.n*.03});const L=LYR.a;if(L)xoBeam(headOf(P.pos,1.2),headOf(L.g.position,-.4),0xffd060,.18,.12);if(Q.n>=Q.need)plQteEnd(true)}
function plQteEnd(win){const Q=PL.qte;if(!Q||Q.done)return;Q.done=1;const u=plUI();u.q.classList.remove('on');if(Q.hand){const h=Q.hand;SM.emit(h.getWorldPosition(V3()),{n:30,c0:0x2a5a50,c1:0x010403,s0:2,s1:6,life:1.4,a:.7,speed:4});PL.g.remove(h)}
  if(win){sx('skyshatter',.6);flash(headOf(P.pos,1),0xffd060,20);plKin('LYRA IS FREE!',1.8);after(.8,()=>msSay('ms_51',1));PL.meter=Math.min(100,PL.meter+30)}else{plHurt(.18,'TOO SLOW');PL.meter=Math.max(10,PL.meter-25);after(1,()=>msSay('ms_51',1))}PL.qte=null}
addEventListener('keydown',e=>{if(!PL.on||!PL.qte||CS.active)return;if(e.code==='Space'&&!e.repeat){e.preventDefault();e.stopPropagation();plQteHit()}},true);
addEventListener('pointerdown',e=>{if(!PL.on||!PL.qte||CS.active)return;plQteHit()},true);

/* ---------- start, tick, camera ---------- */
function plStart(short){plBuild();plUI();MT.g.visible=false;for(let i=boxes.length-1;i>=0;i--)if(boxes[i].mt)boxes.splice(i,1);x5Hint('');
  for(const o of PL.obs)PL.g.remove(o.g);PL.obs=[];Object.assign(PL,{on:1,t:0,ox:0,oy:9,vx:0,vy:0,meter:100,qte:null,ev:plSched(),evI:0,drain:0,storm:0,dawnOn:0,dawn:0,hurtT:0,ts:1,end:0,flashK:0,mph:0});
  CH2.zone='pull';CH2.obj=()=>null;P.heroAnim='NinjaJump_Idle_Loop';PL.g.visible=true;WB.x0=PL.X-400;WB.x1=PL.X+400;WB.z0=-2000;WB.z1=600;KFW.pin=1;LYR.pin=1;const m=mwBuild();if(m)m.g.visible=true;
  scene.fog.color.setHex(0x0a1424);scene.fog.density=.0016;setDawn(0);MU.xb=1;sxLoop('plRush','rush',.38,{fade:1});plAdd(plMont());plAdd(plLight());
  plPos(0);const c=plW(0,9,0);
  playCutscene([{dur:2.6,fov:50,cut:true,cam:k=>({pos:plW(-60+k*10,6,-40),look:plW(-30,30,300)}),onStart:()=>{sx('sonic',1);P.shake=1;flash(plW(0,9,0),0xffffff,30);PL.coneK=1}},
    {dur:2.8,fov:40,cut:true,cam:k=>({pos:plW(-16,14,-20+k*6),look:plW(0,9,0)}),onStart:()=>{PL.ts=.12;sx('portal',.4,null,{rate:.5});PL.coneK=1},update:(dt,k)=>{if(k>.6&&!PL.sb){PL.sb=1;PL.ts=1;sx('sonic',1,null,{rate:.85});PL.coneK=1.3;P.shake=1.2;x5Impact(120,0)}}},
    {dur:1.8,fov:66,cut:true,cam:k=>{const a=lerp(-1.2,0,k*k*(3-2*k));return{pos:plW(Math.sin(a)*11,11+k*.6,Math.cos(a)*11),look:plW(0,9.5,-24)}},onStart:()=>{PL.sb=0}}],
    ()=>{PL.ts=1;plUI().d.classList.add('on');document.body.classList.add('plOn');plKin((typeof isTouch!=='undefined'&&isTouch)?'STEER<small>drag the left side of the screen</small>':'STEER <span class="kc">W</span><span class="kc">A</span><span class="kc">S</span><span class="kc">D</span><small>up, left, down, right</small>',3)})}
function plPos(dt){const px=PL.ox,py=PL.oy;P.pos.set(PL.X+px,py,0);P.face=Math.PI;P.vy=0;P.flying=false;const roll=-PL.vx*.025,pitch=-.95+PL.vy*.018;
  W.g.position.copy(P.pos);W.g.rotation.set(pitch,Math.PI,roll);W.broom.visible=false;W.g.visible=true;W.body.rotation.x=0;W.body.position.y=0;
  const sway=t=>Math.sin(PL.t*1.7+t)*.35;const place=(a,ox,oy,oz,ph,k)=>{if(!a)return;const g=a.g;const tg=V3(PL.X+px+ox+sway(ph),py+oy+sway(ph+2)*.6,oz);g.position.lerp(tg,Math.min(1,(dt||1)*k));g.rotation.set(-.95+sway(ph)*.1,Math.PI,roll*.8+sway(ph+1)*.08);g.visible=true;
    if(a._pl!==1){a._pl=1;try{a.setBase('NinjaJump_Idle_Loop',.3)}catch(x){}}};
  place(KFW.a,2.4,.5,1.8,0,4);place(LYR.a,4.6,-.1,2.6,1.3,3.4);place(MW.a,-2.7,-.6,2.2,2.6,3.2);
  moonLight.position.set(P.pos.x+SUN_OFF.x,P.pos.y+SUN_OFF.y,P.pos.z+SUN_OFF.z);moonLight.target.position.copy(P.pos);
  if(PL.qte&&PL.qte.hand&&LYR.a){const h=PL.qte.hand;const lp=LYR.a.g.position;h.position.set(lp.x-PL.X+Math.sin(PL.t*20)*.15,lp.y-1.6,lp.z+.3)}}
function plTick(dt){if(!PL.on)return;const T=PL.t;const sdt=dt*PL.ts;if(!CS.active&&!PL.end)PL.t+=dt;
  while(PL.evI<PL.ev.length&&PL.ev[PL.evI].t<=PL.t&&!CS.active){try{PL.ev[PL.evI].f()}catch(x){console.warn(x)}PL.evI++}
  /* steering */
  if(!CS.active&&!PL.end){let ix=0,iy=0;if(keys.KeyA||keys.ArrowLeft)ix-=1;if(keys.KeyD||keys.ArrowRight)ix+=1;if(keys.KeyW||keys.ArrowUp)iy+=1;if(keys.KeyS||keys.ArrowDown)iy-=1;if(joy.id!==null){ix+=joy.x;iy-=joy.y}
    PL.vx+=(ix*26-PL.vx)*Math.min(1,dt*5);PL.vy+=(iy*20-PL.vy)*Math.min(1,dt*5);PL.ox=clamp(PL.ox+PL.vx*dt,-15,15);PL.oy=clamp(PL.oy+PL.vy*dt,3,30);if(PL.ox<=-15||PL.ox>=15)PL.vx*=.5;if(PL.oy<=3||PL.oy>=30)PL.vy*=.5}
  PL.hurtT=Math.max(0,(PL.hurtT||0)-dt);plPos(dt);
  /* the world rushes past */
  const v=PL.v*(1+Math.min(1,PL.t/40)*.6)*(PL.end?Math.max(.05,1-PL.end*1.2):1),mv=v*sdt;PL.wn.offset.y+=mv/66;
  for(const m of PL.str){m.position.z+=mv;if(m.position.z>60){m.position.z-=1460;m.position.x=rand(-160,160)}}for(const m of PL.air){m.position.z+=mv*1.5;if(m.position.z>40){m.position.z-=540;m.position.x=rand(-34,34);m.position.y=rand(1,42)}m.material.opacity=.14+Math.min(.22,PL.t*.006)}
  if(Math.random()<.9)SP.emit(plW(PL.ox+rand(-2,2),.4,rand(-2,4)),{n:3,c0:0xffffff,c1:0x6ab0d0,speed:9,up:4,grav:10,life:.5,s0:.6,s1:.05});
  PL.coneK=Math.max(0,(PL.coneK||0)-dt*.9);PL.cone.position.set(PL.ox,PL.oy,-2);PL.cone.material.opacity=PL.coneK*.5;PL.cone.scale.setScalar(1+(1-Math.min(1,PL.coneK))*1.6);
  for(const o of [...PL.obs]){o.z+=mv*(o.sc||1);o.g.position.set(o.x,o.y,o.z);if(o.upd)o.upd(o,sdt);
    if(o.kind==='orb'&&!o.got&&Math.abs(o.z)<3&&Math.hypot(o.x-PL.ox,o.y-PL.oy)<o.r){o.got=1;PL.meter=Math.min(100,PL.meter+13);sx('ding',.5,null,{rate:1.2+Math.random()*.3});SP.emit(plW(o.x,o.y,0),{n:24,c0:0xffffff,c1:0xff9ab8,speed:6,life:.5,s0:.4,s1:.04});PL.g.remove(o.g);PL.obs.splice(PL.obs.indexOf(o),1);continue}
    if((o.kind==='cell'||o.kind==='whale')&&!o.hit&&Math.abs(o.z)<o.r&&Math.hypot(o.x-PL.ox,o.y-PL.oy)<o.r){o.hit=1;plHurt(o.dmg,o.kind==='whale'?'WHALE!':'STORM!')}
    if(o.kind==='ship'&&!o.hit&&o.z>-o.len&&o.z<o.len&&PL.oy<o.top&&Math.abs(PL.ox)<16){o.hit=1;plHurt(o.dmg,'CRASH!');PL.vy=22}
    if(o.z>(o.keep?2200:o.city?200:160)){PL.g.remove(o.g);PL.obs.splice(PL.obs.indexOf(o),1)}}
  /* Lyra holds on */
  if(PL.drain&&!CS.active&&!PL.end){PL.meter-=dt*2.5;if(PL.meter<=0){PL.meter=45;plHurt(.22,'LYRA SLIPS!');sx('cackle',.5)}}
  /* storm look, dawn */
  if(PL.storm){scene.fog.color.lerp(new THREE.Color(0x050810),dt);scene.fog.density+=(.0042-scene.fog.density)*dt;if(Math.random()<dt*1.2){flash(plW(rand(-80,80),60,-200),0xc0d0ff,20)}}else if(!PL.dawnOn){scene.fog.color.lerp(new THREE.Color(0x0a1424),dt);scene.fog.density+=(.0016-scene.fog.density)*dt}
  if(PL.dawnOn){PL.dawn=Math.min(1,PL.dawn+dt/9);setDawn(PL.dawn*.92);scene.fog.color.lerp(new THREE.Color(0xc07a5a),dt*.6);scene.fog.density+=(.0011-scene.fog.density)*dt}
  /* UI */
  const u=plUI();const k=Math.min(1,PL.t/40);PL.mph=Math.round(50000*(k*k*(3-2*k)));if(PL.t>43&&!PL.end){u.spd.classList.add('gl');u.spd.firstChild.textContent='???';u.spd.lastChild.textContent=['MPH','KM/H','KNOTS','???'][((PL.t*6)|0)%4]}else{u.spd.classList.remove('gl');u.spd.firstChild.textContent=PL.mph.toLocaleString('en-US');u.spd.lastChild.textContent='MPH'}
  u.bar.style.width=PL.meter+'%';u.ly.classList.toggle('low',PL.meter<28);u.me.style.left=(Math.min(1,PL.t/PL.T)*100)+'%';
  if(PL.qte&&!CS.active){const Q=PL.qte;Q.t-=dt;u.q.querySelector('u').style.width=(Q.n/Q.need*100)+'%';if(Q.t<=0)plQteEnd(Q.n>=Q.need)}}
function plCam(dt){const c=plW(PL.ox*.7,PL.oy+2.4,10.5),L=plW(PL.ox*.85,PL.oy+1,-26);if(!PL.cp)PL.cp=c.clone();PL.cp.lerp(c,Math.min(1,dt*4));camera.position.copy(PL.cp);
  if(P.shake>0){camera.position.x+=rand(-1,1)*P.shake*.3;camera.position.y+=rand(-1,1)*P.shake*.3;P.shake=Math.max(0,P.shake-dt*1.8)}camera.lookAt(L);const f=70+Math.min(1,PL.t/30)*16+(PL.coneK||0)*6;camera.fov+=(f-camera.fov)*Math.min(1,dt*3);camera.updateProjectionMatrix()}
{const _up=updatePlayer;updatePlayer=function(dt){if(PL.on){if(W.ch)try{W.update(dt,{anim:'NinjaJump_Idle_Loop',mv:0})}catch(x){}return}return _up.apply(this,arguments)}}
{const _uc=updateCamera;updateCamera=function(dt){if(PL.on&&!CS.active){plCam(dt);return}return _uc.apply(this,arguments)}}
{const _mt=muTick;muTick=function(dt){_mt(dt);if(PL.on)plTick(Math.min(dt,.05))}}
{const _mw=muWant;muWant=function(){if(started&&MODE!=='open'&&PL.on)return 'mus_pull';if(started&&MODE!=='open'&&CH2.zone==='nola')return NL.band?'mus_brass':null;return _mw.apply(this,arguments)}}
{const _dw=drawWorldMap;drawWorldMap=function(){if(MODE!=='open'&&(CH2.zone==='pull'||CH2.zone==='nola')){worldMap.width=WB.x1-WB.x0+48;worldMap.height=WB.z1-WB.z0+48;MAPOX=WB.x0-24;MAPOZ=WB.z0-24;const x=worldMap.getContext('2d');x.fillStyle=CH2.zone==='nola'?'#2a2420':'#0a1a2a';x.fillRect(0,0,worldMap.width,worldMap.height);
  if(CH2.zone==='nola'){const X=v=>v-MAPOX,Z=v=>v-MAPOZ;x.fillStyle='#2e4a26';x.fillRect(X(NL.X-30),Z(-30),60,60);x.fillStyle='#c8c0b0';x.fillRect(X(NL.X-22),Z(-62),44,12)}return}return _dw.apply(this,arguments)}}
function plCrash(){if(PL.end)return;PL.end=.01;sxStop('plRush',.6);x5Hint('');const u=plUI();
  addFx(null,1.4,(F,k)=>{PL.end=.01+k;P.shake=Math.max(P.shake,k*1.4)},()=>{u.d.classList.remove('on');x5White(.08,.9,()=>{plStop();nlEnter(true)})})}
function plStop(){document.body.classList.remove('plOn');PL.on=0;PL.qte=null;P.heroAnim=null;if(PL.g)PL.g.visible=false;sxStop('plRush',.3);const u=plUI();u.d.classList.remove('on');u.q.classList.remove('on');
  W.g.rotation.set(0,W.g.rotation.y,0);for(const a of [KFW.a,LYR.a,MW.a])if(a){a.g.rotation.set(0,a.g.rotation.y,0);a._pl=0}camera.fov=60;camera.updateProjectionMatrix();PL.cp=null}
function plAbort(){if(!PL.on)return;plStop();setDawn(MT.dawn0||0)}

/* ================= Jackson Square ================= */
const NL={X:12000,g:null,band:0,acts:[],boxes:[]};
function nlBuild(){if(NL.g)return;const G=NL.g=new THREE.Group();G.userData.mtK=1;scene.add(G);const X=NL.X,T=mtTex();
  const brick=sbCanvas(256,256,(x,w,h)=>{x.fillStyle='#6a3a2a';x.fillRect(0,0,w,h);for(let r=0;r<16;r++)for(let c=0;c<8;c++){const o=r%2?16:0;x.fillStyle=`hsl(${12+Math.random()*10},${40+Math.random()*16}%,${26+Math.random()*12}%)`;x.fillRect(c*32+o+1,r*16+1,30,14);x.fillRect(c*32+o-31,r*16+1,30,14)}});
  const flag=sbCanvas(256,256,(x,w,h)=>{x.fillStyle='#4a4038';x.fillRect(0,0,w,h);for(let r=0;r<8;r++)for(let c=0;c<8;c++){x.fillStyle=`hsl(30,${8+Math.random()*8}%,${34+Math.random()*12}%)`;x.fillRect(c*32+1,r*32+1,30,30)}});
  const gnd=new THREE.Mesh(new THREE.PlaneGeometry(220,220),mtM(flag,40,40,{color:0xb0a090,roughness:.85}));gnd.rotation.x=-Math.PI/2;gnd.position.set(X,0,0);gnd.receiveShadow=true;G.add(gnd);
  const lawn=new THREE.Mesh(new THREE.PlaneGeometry(56,56),std({color:0x2e4a26,roughness:1}));lawn.rotation.x=-Math.PI/2;lawn.position.set(X,.02,0);G.add(lawn);
  for(const a of[Math.PI/4,-Math.PI/4]){const p=new THREE.Mesh(new THREE.PlaneGeometry(4,78),mtM(flag,1,14,{color:0xc8b8a0}));p.rotation.x=-Math.PI/2;p.rotation.z=a;p.position.set(X,.04,0);G.add(p)}
  /* iron fence */
  const fm=std({color:0x0a0a0a,metalness:.7,roughness:.4});const bars=new THREE.InstancedMesh(new THREE.BoxGeometry(.06,1.8,.06),fm,480);let n=0;const dm=new THREE.Object3D();for(const s of[-1,1])for(let i=-28;i<=28;i+=.5){if(Math.abs(i)<3)continue;for(const ax of[0,1]){dm.position.set(X+(ax?s*28:i),.9,ax?i:s*28);dm.updateMatrix();if(n<480)bars.setMatrixAt(n++,dm.matrix)}}bars.count=n;G.add(bars);
  /* the statue */
  const bz=std({color:0x3a4a3a,metalness:.7,roughness:.4}),sto=mtM(T.granite,2,2,{color:0xd8d0c0});sbBox(G,6,4,9,X,2,0,sto);const hs=new THREE.Group();hs.position.set(X,4,0);G.add(hs);const bd=new THREE.Mesh(new THREE.SphereGeometry(1,14,10),bz);bd.scale.set(1,1.1,2.4);bd.position.set(0,2.6,0);bd.rotation.x=-.5;hs.add(bd);
  const nk=new THREE.Mesh(new THREE.CylinderGeometry(.5,.8,2.4,8),bz);nk.position.set(0,4.2,-2);nk.rotation.x=-.9;hs.add(nk);for(const [x,z,r] of [[-.6,1.6,0],[.6,1.6,0],[-.5,-1.6,.8],[.5,-1.6,1]]){const l=new THREE.Mesh(new THREE.CylinderGeometry(.18,.22,2.6,6),bz);l.position.set(x,1.1+(r?1:0),z);l.rotation.x=r;hs.add(l)}
  const rd=new THREE.Mesh(new THREE.CylinderGeometry(.35,.45,1.8,8),bz);rd.position.set(0,4.4,.3);hs.add(rd);const rh=new THREE.Mesh(new THREE.SphereGeometry(.32,10,8),bz);rh.position.set(0,5.5,.3);hs.add(rh);NL.boxes.push([X-3,X+3,-4.5,4.5]);
  /* St Louis Cathedral */
  const wh=std({color:0xf2ece0,roughness:.75,emissive:0x2a2014,emissiveIntensity:.4}),sl=mtM(T.slate,2,2,{color:0x2a2e36}),cz=-58;sbBox(G,40,22,18,X,11,cz-9,wh);NL.boxes.push([X-20,X+20,cz-18,cz]);
  for(const [x,h,w] of [[-17,30,6],[17,30,6],[0,36,8]]){sbBox(G,w,h,w,X+x,h/2,cz-1,wh);const sp=new THREE.Mesh(new THREE.CylinderGeometry(.2,w*.42,h*.5,6),sl);sp.position.set(X+x,h+h*.25,cz-1);G.add(sp)}
  const clk=new THREE.Mesh(new THREE.CircleGeometry(1.6,24),new THREE.MeshBasicMaterial({color:0xfff4d0}));clk.position.set(X,28,cz+3.02);G.add(clk);
  for(const x of[-8,0,8]){const d=new THREE.Mesh(new THREE.PlaneGeometry(3,6),new THREE.MeshBasicMaterial({color:x?0xffc070:0xffd890}));d.position.set(X+x,3,cz+.03);G.add(d)}G.add(gsAt(0xffc890,70,.25,X,16,cz+6));
  /* Pontalba buildings with iron galleries */
  const bm=mtM(brick,10,4,{color:0xb07a60,roughness:.85}),rail=std({color:0x0a0a0a,metalness:.6,roughness:.4}),wm=new THREE.MeshBasicMaterial({color:0xffc878});
  for(const s of[-1,1]){const x=X+s*52;sbBox(G,14,18,100,x,9,0,bm);NL.boxes.push([x-7,x+7,-50,50]);for(let f=1;f<=2;f++){const gy=f*6;sbBox(G,3,.25,100,x-s*8.5,gy,0,rail);const r=new THREE.InstancedMesh(new THREE.BoxGeometry(.06,1.1,.06),rail,200);let q=0;for(let z=-49;z<=49;z+=.5){dm.position.set(x-s*10,gy+.6,z);dm.updateMatrix();r.setMatrixAt(q++,dm.matrix)}r.count=q;G.add(r);
      for(let z=-46;z<=46;z+=6){const w=new THREE.Mesh(new THREE.PlaneGeometry(1.6,2.6),Math.random()<.6?wm:std({color:0x101418}));w.position.set(x-s*7.02,gy+1.4,z);w.rotation.y=-s*Math.PI/2;G.add(w)}}
    for(let z=-46;z<=46;z+=3)sbBox(G,.14,6,.14,x-s*10,3,z,rail)}
  /* gas lamps, oaks, palms */
  for(const [lx,lz] of [[-30,-30],[30,-30],[-30,30],[30,30],[-30,0],[30,0],[0,-30],[0,30]]){const p=new THREE.Mesh(new THREE.CylinderGeometry(.08,.12,4,6),rail);p.position.set(X+lx,2,lz);G.add(p);const l=glowSprite(0xffc070,2.8,.95);l.position.set(X+lx,4.2,lz);G.add(l)}
  const tk=std({color:0x3a2c20,roughness:1}),lf=std({color:0x1a3018,roughness:1});for(let i=0;i<10;i++){const a=i/10*TAU,r=19;const t=new THREE.Mesh(new THREE.CylinderGeometry(.5,.8,6,7),tk);t.position.set(X+Math.sin(a)*r,3,Math.cos(a)*r);G.add(t);const c=new THREE.Mesh(new THREE.SphereGeometry(4.5,10,8),lf);c.scale.y=.7;c.position.set(t.position.x,7.4,t.position.z);G.add(c)}
  for(let i=0;i<6;i++){const x=X+(i%2?1:-1)*36,z=-40+i*16;const t=new THREE.Mesh(new THREE.CylinderGeometry(.3,.4,9,6),tk);t.position.set(x,4.5,z);G.add(t);for(let k=0;k<7;k++){const f=new THREE.Mesh(new THREE.ConeGeometry(.5,5,4),lf);f.position.set(x,9,z);f.rotation.set(1.6,k*TAU/7,0);f.geometry.translate(0,2.5,0);G.add(f)}}
  /* the brass band, in front of the cathedral */
  const gold=std({color:0xffd060,metalness:1,roughness:.25,emissive:0x5a3a08});const cols=[[0xf4f0e8,0x1a1a20],[0x2a2a3a,0xf0e8d8],[0x8a1a20,0x1a1a20],[0xf0d040,0x202028],[0x1a3a6a,0xe8e0d0]];
  cols.forEach((c,i)=>{const a=makeCHActor(i%3===1?'f':'m',{skin:[0x6a4a34,0x8a5a3a,0x5a3a2a,0xc89a7a,0x4a3020][i],hair:i%3===1?'hairLong':'hairBuzz',hairTex:'1',hairCol:0x141010,brow:0x141010,keepReg:[5,6,9],wear:[['tee',c[0]],['trousers',c[1]],['shoes',0x101010]]});if(!a)return;
    const tr=new THREE.Group();const bell=new THREE.Mesh(new THREE.ConeGeometry(.12,.3,12,1,true),gold);bell.rotation.z=Math.PI/2;bell.position.x=.3;tr.add(bell);const tube=new THREE.Mesh(new THREE.CylinderGeometry(.025,.025,.5,6),gold);tube.rotation.z=Math.PI/2;tr.add(tube);
    try{const H=a.S.SK.hand_r;a.attach('hand_r',tr,V3(H.x,H.y,H.z+.05),new THREE.Euler(0,-1.2,0))}catch(x){}a.g.position.set(X-6+i*3,0,cz+8+Math.sin(i)*1.2);a.g.rotation.y=0;a.g.visible=false;a.g.userData.mtK=1;scene.add(a.g);try{a.setBase('Dance_Loop',.2,1+i*.05)}catch(x){}NL.acts.push(a)})}
function nlEnter(crash){nlBuild();CH2.zone='nola';MT.g.visible=false;if(PL.g)PL.g.visible=false;NL.g.visible=true;for(let i=boxes.length-1;i>=0;i--)if(boxes[i].mt)boxes.splice(i,1);for(const b of NL.boxes)boxes.push({x0:b[0],x1:b[1],z0:b[2],z1:b[3],h:60,mt:1});
  Object.assign(WB,{x0:NL.X-60,x1:NL.X+60,z0:-56,z1:56});scene.fog.color.setHex(0x8a6a74);scene.fog.density=.0032;setDawn(.82);CH2.obj=()=>CH2.zone==='nola'?'<b>To be continued</b> · Chapter XIX: New Orleans':null;
  const c=V3(NL.X,0,18);P.pos.copy(c);P.face=Math.PI;yaw=0;P.vy=0;P.flying=false;SPAWN.copy(c);KFW.pin=1;LYR.pin=1;mwBuild();
  const lay=(a,dx,dz,ry)=>{if(!a)return;a.g.position.set(c.x+dx,0,c.z+dz);a.g.rotation.set(0,ry,0);a.g.visible=true;a._pl=0;try{a.once?a.once('Death01',.01):a.setBase('Death01',.01)}catch(x){}};
  lay(KFW.a,2.4,1.4,.6);lay(LYR.a,-2.2,1.2,-.5);lay(MW.a,.6,3.4,2.4);for(const a of NL.acts)a.g.visible=true;try{drawWorldMap()}catch(x){}
  if(!crash){NL.band=1;KFW.pin=0;LYR.pin=0;for(const a of[KFW.a,LYR.a,MW.a])try{a&&a.setBase('Idle_Loop',.2)}catch(x){}return}
  NL.band=0;const cz=-58;
  playCutscene([{dur:2.2,fov:52,cut:true,cam:k=>({pos:V3(NL.X+30-k*8,26-k*6,60-k*10),look:V3(NL.X,1,18)}),onStart:()=>{P.heroAnim='Death01';sx('crashland',1,null,{wet:.4});sx('impact',1);P.shake=1.6;flash(V3(NL.X,2,18),0xffffff,40);SP.emit(V3(NL.X,1,18),{n:120,c0:0xffffff,c1:0x9ad8ff,speed:16,life:1,s0:.7,s1:.05});SM.emit(V3(NL.X,1,18),{n:30,c0:0x8a7a6a,c1:0x2a2420,s0:1.4,s1:5,life:2.4,a:.6,up:2})}},
    {dur:2.6,fov:40,cut:true,cam:k=>({pos:V3(NL.X-3,.7,22.5),look:V3(NL.X+1,.4,18)}),onStart:()=>{MU.vd=1}},
    {who:'@',text:XL8.ms_59,fov:36,cam:k=>({pos:headOf(P.pos,.8).add(V3(1.4,.2,-1.6)),look:headOf(P.pos,.6)}),onStart:()=>{P.heroAnim='Crouch_Idle_Loop'}},
    {who:'Lyra',text:XL8.ms_60,fov:36,cam:k=>({pos:headOf(LYR.a.g.position,.9).add(V3(-1.2,.3,-1.6)),look:headOf(LYR.a.g.position,.7)}),onStart:()=>{try{LYR.a.setBase('Crouch_Idle_Loop',.4)}catch(x){}}},
    {dur:4.2,fov:44,cut:true,cam:k=>({pos:V3(NL.X+3-k*2,2.2,cz+22-k*3),look:V3(NL.X,3,cz+8)}),onStart:()=>{NL.band=1;MU.vd=0;MU.xb=1.3;P.heroAnim='Idle_Loop';try{KFW.a.setBase('Idle_Loop',.4);LYR.a.setBase('Idle_Loop',.4)}catch(x){}}},
    {who:'Kaen',text:XL8.ms_61,fov:36,cam:sbTC(()=>KFW.a.g.position,()=>V3(NL.X,0,cz+8),2.4,.6)},
    {who:'Morwen',text:XL8.ms_62,fov:30,cam:k=>{const m=MW.a.g.position;return{pos:headOf(m,1.6).add(V3(.3,.05,-1.5+k*.2)),look:headOf(m,1.55)}},onStart:()=>{try{MW.a.setBase('Idle_Loop',.5)}catch(x){}MW.a.g.rotation.y=Math.PI;MW.fl=3}},
    {dur:3.4,fov:48,cut:true,cam:k=>({pos:V3(NL.X+18-k*4,6+k*10,40-k*6),look:V3(NL.X,8,cz)})}],
    ()=>{P.heroAnim=null;NL.band=1;MU.vd=0;KFW.pin=0;LYR.pin=0;CH2.st=34;ch2Save();writeSave();MU.xb=1;try{gainXP(2500)}catch(x){}
      x5Banner('THE TIDE DOOR','CHAPTER XVIII COMPLETE','#7dffd8',3.2,'#04140f');after(3.6,()=>{if(CH2.zone==='nola')x19Begin()})})}
function nlLeave(){if(CH2.zone!=='nola')return;NL.g.visible=false;NL.band=0;for(const a of NL.acts)a.g.visible=false;if(MW.a)MW.a.g.visible=false;for(let i=boxes.length-1;i>=0;i--)if(boxes[i].mt)boxes.splice(i,1);
  CH2.zone='mont';mtLeave()}
{const _g=groundAt;groundAt=function(x,z,y){if(MODE!=='open'&&((x>11500&&x<12500)||x>19000))return x>19000?(PL.on?-50:0):0;return _g.apply(this,arguments)}}
{const _w=stWater;stWater=function(x,z){if(MODE!=='open'&&(x>11500&&x<12500||x>19000))return false;return _w.apply(this,arguments)}}
{const _b=stBridge;stBridge=function(x,z){if(MODE!=='open'&&(x>11500&&x<12500||x>19000))return false;return _b.apply(this,arguments)}}
{const _c=collide;collide=function(p,r,ghost,skipBlocks){if(MODE==='open'||!(p.x>11500&&p.x<12500))return _c.apply(this,arguments);for(const b of boxes){if(!b.mt||p.y>b.h)continue;const cx=clamp(p.x,b.x0,b.x1),cz=clamp(p.z,b.z0,b.z1);const dx=p.x-cx,dz=p.z-cz,d2=dx*dx+dz*dz;
  if(d2<r*r){if(d2>1e-6){const d=Math.sqrt(d2);p.x=cx+dx/d*r;p.z=cz+dz/d*r}else{const l=p.x-b.x0,rr=b.x1-p.x,t=p.z-b.z0,bt=b.z1-p.z,m=Math.min(l,rr,t,bt);if(m===l)p.x=b.x0-r;else if(m===rr)p.x=b.x1+r;else if(m===t)p.z=b.z0-r;else p.z=b.z1+r}}}}}
{const _rv=revive;revive=function(){const r=_rv.apply(this,arguments);if(MODE!=='open'&&CH2.zone==='nola'){P.pos.copy(SPAWN);P.flying=false}return r}}
{const _dr=distReal;distReal=function(u){if(MODE!=='open'&&(CH2.zone==='nola'||CH2.zone==='pull'))return Math.round(u)+' m';return _dr.apply(this,arguments)}}
{const _mt=muTick;muTick=function(dt){_mt(dt);if(!started||MODE==='open')return;if(CH2.zone==='paris'&&CH2.st>=34&&!NL.boot&&!CS.active){NL.boot=1;mtWorld();MT.hid=scene.children.filter(o=>o.visible&&!mtKeep(o));for(const o of MT.hid)o.visible=false;CH2.parisWB={x0:WB.x0,x1:WB.x1,z0:WB.z0,z1:WB.z1};nlEnter(false)}
  if(CH2.zone==='nola'){if(NL.band)for(const a of NL.acts)try{a.update(Math.min(dt,.05))}catch(x){}}}}

/* ---------- chapter select ---------- */
CHAPTERS.push({id:'mont',n:'XVIII',title:'The Tide Door',desc:'Morwen was born on Mont-Saint-Michel. Her true name is in the parish register, unless the Crown got there first.'});
CHART.mont=['#7dffd8','#04201a','bell'];CHGLY.bell='<path d="M20 6c-6 0-9 5-9 12v7l-3 5h24l-3-5v-7c0-7-3-12-9-12z"/><circle cx="20" cy="33" r="2.6"/>';
{const _cb=chapBoss;chapBoss=function(c){if(c.id==='mont')return null;return _cb(c)}}
{const _ac=applyChapter;applyChapter=function(id){plAbort();if(CH2.zone==='nola')nlLeave();if(CH2.zone==='mont')mtLeave();MT.boot=0;NL.boot=0;MT.s={};if(MW.a)MW.a.g.visible=false;if(id!=='mont')return _ac.apply(this,arguments);
  MT.muteT=time+2.5;SB.muteT=time+2.5;_ac.call(this,'crown2');CH2.st=30;XO.ph=0;SB.boot=1;SB.p23=1;MT.s={intro:1};mtEnter('out');ch2Save();after(.7,mtArrive)}}
{const _rc=renderChapters;renderChapters=function(){_rc();const list=$('chapList');if(!list)return;try{const el=list.children[chapIndexOf('mont')];if(el){const done=CH2.st>=34,cur=started&&CH2.st>=29&&CH2.st<34;el.classList.toggle('done',done);el.classList.toggle('cur',cur);const th=el.querySelector('.th');if(th&&done&&!th.querySelector('u'))th.insertAdjacentHTML('beforeend','<u>✓</u>')}
  const c2=list.children[chapIndexOf('sorbonne')];if(c2&&CH2.st>=30){c2.classList.remove('cur');c2.classList.add('done')}}catch(x){}}}
