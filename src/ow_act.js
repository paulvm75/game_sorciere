/* ================= OPEN WORLD v7: state, specials, shops, quests, activities ================= */
const OWS={qdone:[],quest:null,clock:'real',euro:80,visited:new Set(),dog:null,partner:null,aff:{},inv:{},tod:20.5,performCd:0,coffee:0,told:{},carnet:new Set(),contacts:[],stats:{},wandLost:0,wandThief:null,errand:null,wp:null,npcFill:true,inferno:0,voidAt:null,race:null,buskT:0};
const OW_KEY='sorciere-ow-v2';
function owLoad(){try{const s=JSON.parse(localStorage.getItem(OW_KEY)||localStorage.getItem('sorciere-ow-v1')||'null');if(s){OWS.qdone=s.qdone||[];OWS.clock=s.clock||'real';OWS.euro=s.euro??80;OWS.visited=new Set(s.visited||[]);OWS.dog=s.dog||null;OWS.partner=s.partner||null;OWS.aff=s.aff||{};OWS.inv=s.inv||{};OWS.tod=s.tod??20.5;OWS.carnet=new Set(s.carnet||[]);OWS.contacts=s.contacts||[];OWS.stats=s.stats||{};OWS.told=s.told||{}}}catch(e){}}
function owSave(){try{localStorage.setItem(OW_KEY,JSON.stringify({euro:OWS.euro,visited:[...OWS.visited],dog:OWS.dog,partner:OWS.partner,aff:OWS.aff,inv:OWS.inv,tod:OWS.tod,qdone:OWS.qdone,clock:OWS.clock,carnet:[...OWS.carnet],contacts:OWS.contacts,stats:OWS.stats,told:OWS.told}))}catch(e){}}
let daySky=null;const SUN_OFF=V3(-34,62,-26);
function G_sph(){return G_sph.g||(G_sph.g=new THREE.SphereGeometry(1,12,8))}
/* ---------- clock + light + music by hour ---------- */
const CLOCK_MODES=['real','fast','morning','noon','sunset','night'],CLOCK_FIX={morning:8.5,noon:12.5,sunset:20,night:23.5};
function realHour(){const d=new Date();return d.getHours()+d.getMinutes()/60+d.getSeconds()/3600}
function owClockInit(){OWS.clock=OWS.clock||'real';if(OWS.clock==='real')OWS.tod=realHour();else if(CLOCK_FIX[OWS.clock])OWS.tod=CLOCK_FIX[OWS.clock]}
function owClock(dt){if(OWS.todHold!==undefined){OWS.tod=OWS.todHold;return}if(OWS.clock==='real')OWS.tod=realHour();else if(OWS.clock==='fast')OWS.tod=(OWS.tod+dt*.02)%24;else OWS.tod=CLOCK_FIX[OWS.clock]}
function clockLabel(){return OWS.clock==='real'?'Time: real clock':OWS.clock==='fast'?'Time: fast day cycle':'Time: '+OWS.clock}
function cycleClock(){const i=CLOCK_MODES.indexOf(OWS.clock);OWS.clock=CLOCK_MODES[(i+1)%CLOCK_MODES.length];owClockInit();setTOD(OWS.tod);$('todBtn').textContent=clockLabel();owSave();MUS.style=null}
function todLabel(h){const hh=Math.floor(h),mm=Math.floor((h-hh)*60);return String(hh).padStart(2,'0')+':'+String(mm).padStart(2,'0')}
// keyframes: h, sky top, mid, horizon, fog, hemi sky, hemi ground, hemi I, sun col, sun I, stars, lamps, bloom
const TODK=[[0,'#05061a','#121438','#2a2450',0x1a1838,0x6a70c0,0x201a28,.75,0xa0b0ff,.55,1,1,.8],[5,'#0e1640','#2a3a78','#6a5a8a',0x3a3a60,0x7a80c0,0x2a2230,.8,0xa0a8e0,.5,.6,1,.75],
  [6.5,'#3a5aa0','#c07a9a','#ffb070',0xd09088,0xffc0a0,0x4a3a38,.9,0xff9a60,.9,0,.5,.6],[8,'#4a88d8','#8ab8e8','#f0d8b0',0xc8d0dc,0xfff0e0,0x5a5048,.8,0xffe0b0,.95,0,0,.35],
  [12,'#2a6ad0','#70a8e8','#d8e8f8',0xc0d4ea,0xe8f0ff,0x60584e,.78,0xfff8f0,1.02,0,0,.28],[16,'#3a74c8','#88b0e0','#f0dcc0',0xd0d0d0,0xfff0d8,0x5a5048,.8,0xffe8c0,.98,0,0,.32],
  [19,'#3a5a9a','#e0a070','#ffc070',0xe0a880,0xffd0a0,0x4a3a30,.9,0xffa050,1,0,.3,.5],[20.3,'#2a2a6a','#c05a7a','#ff8050',0xa06070,0xd090a0,0x3a2a30,.8,0xff6a40,.7,.1,.8,.7],
  [21.3,'#0a1a50','#2a3a8a','#6a5a9a',0x2a3060,0x7a80d0,0x241c2c,.8,0xa0b0ff,.55,.6,1,.8],[22.5,'#05061a','#121438','#2a2450',0x1a1838,0x6a70c0,0x201a28,.75,0xa0b0ff,.55,1,1,.8],[24,'#05061a','#121438','#2a2450',0x1a1838,0x6a70c0,0x201a28,.75,0xa0b0ff,.55,1,1,.8]];
const skyCv=mkCanvas(8,256,()=>{});const skyTex=new THREE.CanvasTexture(skyCv);const _c1=new THREE.Color(),_c2=new THREE.Color();
function lerpHex(a,b,t){_c1.set(a);_c2.set(b);return _c1.lerp(_c2,t).clone()}
const ENVTOD={hk:-1,pm:null,cv:null,tex:null,sc:null,sun:null,gm:null,rt:null};
function envTOD(top,mid,hor,sunP,sunC,gnd){try{const E=ENVTOD;const K=.42;top=top.clone().multiplyScalar(K);mid=mid.clone().multiplyScalar(K);hor=hor.clone().multiplyScalar(K*1.1);gnd=gnd.clone().multiplyScalar(K);if(!E.pm){E.pm=new THREE.PMREMGenerator(renderer);E.sc=new THREE.Scene();E.cv=document.createElement('canvas');E.cv.width=8;E.cv.height=256;E.tex=new THREE.CanvasTexture(E.cv);
    E.sc.add(new THREE.Mesh(new THREE.SphereGeometry(50,32,16),new THREE.MeshBasicMaterial({map:E.tex,side:THREE.BackSide})));E.sun=new THREE.Mesh(new THREE.SphereGeometry(2.5,16,8),new THREE.MeshBasicMaterial({color:0xffffff}));E.sc.add(E.sun);
    E.gm=new THREE.Mesh(new THREE.CylinderGeometry(46,46,6,24,1,true),new THREE.MeshBasicMaterial({color:0x888888,side:THREE.BackSide}));E.gm.position.y=-1;E.sc.add(E.gm)}
  const x=E.cv.getContext('2d');const g=x.createLinearGradient(0,0,0,256);g.addColorStop(0,'#'+top.getHexString());g.addColorStop(.38,'#'+mid.getHexString());g.addColorStop(.5,'#'+hor.getHexString());g.addColorStop(.53,'#'+gnd.clone().multiplyScalar(.9).getHexString());g.addColorStop(1,'#'+gnd.clone().multiplyScalar(.5).getHexString());x.fillStyle=g;x.fillRect(0,0,8,256);E.tex.needsUpdate=true;
  E.gm.material.color.copy(hor).lerp(gnd,.6).multiplyScalar(.55);
  if(sunP){E.sun.visible=true;E.sun.position.copy(sunP).normalize().multiplyScalar(40);E.sun.material.color.copy(sunC).multiplyScalar(1.4)}else{E.sun.visible=true;E.sun.position.set(-20,25,-30);E.sun.material.color.setRGB(.7,.72,.8)}
  const rt=E.pm.fromScene(E.sc,.02);if(E.rt)E.rt.dispose();E.rt=rt;
  if(!E.inRt){const g2=x.createLinearGradient(0,0,0,256);g2.addColorStop(0,'#1a140e');g2.addColorStop(.5,'#3a2a1c');g2.addColorStop(1,'#120e0a');x.fillStyle=g2;x.fillRect(0,0,8,256);E.tex.needsUpdate=true;E.sun.visible=false;E.gm.material.color.setHex(0x1a140e);E.inRt=E.pm.fromScene(E.sc,.02);E.sun.visible=true}
  envApply()}catch(e){}}
function envApply(){const E=ENVTOD;if(!E.rt)return;const t=(typeof VIN!=='undefined'&&VIN&&E.inRt)?E.inRt.texture:E.rt.texture;if(scene.environment!==t)scene.environment=t}
function setTOD(h){h=((h%24)+24)%24;let k=0;while(k<TODK.length-2&&TODK[k+1][0]<=h)k++;const A=TODK[k],Bk=TODK[k+1];const t=clamp((h-A[0])/(Bk[0]-A[0]),0,1),s=t*t*(3-2*t);const L=(i)=>lerp(A[i],Bk[i],s);
  const top=lerpHex(A[1],Bk[1],s),mid=lerpHex(A[2],Bk[2],s),hor=lerpHex(A[3],Bk[3],s);const x=skyCv.getContext('2d');const g=x.createLinearGradient(0,0,0,256);g.addColorStop(0,'#'+top.getHexString());g.addColorStop(.4,'#'+mid.getHexString());g.addColorStop(.5,'#'+hor.getHexString());g.addColorStop(.56,'#'+mid.clone().multiplyScalar(.5).getHexString());g.addColorStop(1,'#'+top.clone().multiplyScalar(.4).getHexString());x.fillStyle=g;x.fillRect(0,0,8,256);skyTex.needsUpdate=true;
  if(skyMat.map!==skyTex){skyMat.map=skyTex;skyMat.needsUpdate=true}dawnMat.opacity=0;if(daySky)daySky.visible=false;
  const stars=L(10),lamps=L(11);if(CM.leafNight)CM.leafNight.value=lamps;starMat.opacity=stars;moonDisc.material.opacity=Math.min(1,stars*1.2);moonGlow.material.opacity=.55*stars;
  scene.fog.color.copy(lerpHex(A[4],Bk[4],s));OW.fogBase=.0034-(1-lamps)*.0011;hemi.color.copy(lerpHex(A[5],Bk[5],s));hemi.groundColor.copy(lerpHex(A[6],Bk[6],s));hemi.intensity=L(7);
  moonLight.color.copy(lerpHex(A[8],Bk[8],s));moonLight.intensity=L(9);
  const day=h>6&&h<20.5;const sa=day?(h-6)/14.5*Math.PI:((h<6?h+24:h)-20.5)/9.5*Math.PI;const el=Math.max(.18,Math.sin(sa));SUN_OFF.set(Math.cos(sa)*70,el*80,32);
  sunGlow.position.set(Math.cos(sa)*420,Math.max(15,el*300),210);sunGlow.material.opacity=day?Math.min(1,.4+(1-el)*.8):0;sunGlow.material.color.copy(moonLight.color);
  {const hk=Math.round(h*2);if(ENVTOD.hk!==hk){ENVTOD.hk=hk;envTOD(top,mid,hor,day?sunGlow.position:null,moonLight.color,lerpHex(A[6],Bk[6],s))}}
  for(const m of OW.windowMats){if(m.isMeshStandardMaterial)m.emissiveIntensity=lerp(.05,m.userData.ei||(m.userData.ei=m.emissiveIntensity),lamps);else{if(!m.userData.bc)m.userData.bc=m.color.clone();m.color.copy(m.userData.bc).multiplyScalar(lerp(.25,1,lamps))}}
  for(const Lm of OW.lampMats){if(Lm.col){Lm.m.color.setHex(0xffd080).lerp(new THREE.Color(0x8a8a80),1-lamps)}else Lm.m.opacity=Lm.base*lamps}
  if(OW.waterMat)OW.waterMat.emissiveIntensity=.5*lamps+.05;if(bloomPass){bloomPass.strength=L(12)*.55;bloomPass.threshold=.82+(1-lamps)*.1}
  if(gradePass){gradePass.uniforms.uLift.value=-(1-lamps)*.05;gradePass.uniforms.uSat.value=1.1}pLight.intensity=.4+lamps*.6;
  if(typeof VIN!=='undefined'&&VIN){hemi.intensity*=.28;moonLight.intensity*=.12}envApply();
  dawnK=1-lamps;OW.lampK=lamps;OW.day=1-lamps}

/* ---------- music by hour ---------- */
const MUS={t:0,beat:0,style:null,chord:0,mel:0};const mtof=m=>440*Math.pow(2,(m-69)/12);
function acc(f,dur,vol,d){if(!AC||muted||!musicOn)return;const t=AC.currentTime+d;const g=AC.createGain(),lp=AC.createBiquadFilter();lp.type='lowpass';lp.frequency.value=2600;const trem=AC.createOscillator(),tg=AC.createGain();trem.frequency.value=6;tg.gain.value=vol*.25;trem.connect(tg);tg.connect(g.gain);
  g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(vol,t+.03);g.gain.setValueAtTime(vol,t+dur*.8);g.gain.linearRampToValueAtTime(0,t+dur);const os=[1.003,.997,2.001].map((m,i)=>{const o=AC.createOscillator();o.type=i<2?'sawtooth':'square';o.frequency.value=f*m;const og=AC.createGain();og.gain.value=i<2?.5:.12;o.connect(og);og.connect(lp);o.start(t);o.stop(t+dur+.05);return o});
  lp.connect(g);g.connect(musicGain);trem.start(t);trem.stop(t+dur+.05)}
function pluck(f,dur,vol,d){tone(f,dur,'triangle',vol,1,d,musicGain,.25);tone(f*2,dur*.4,'sawtooth',vol*.12,1,d,musicGain,.2)}
function piano(f,dur,vol,d){tone(f,dur,'sine',vol,1,d,musicGain,.6);tone(f*2,dur*.6,'sine',vol*.22,1,d,musicGain,.6);tone(f*3,dur*.25,'triangle',vol*.06,1,d,musicGain,.5)}
function clar(f,dur,vol,d){if(!AC||muted||!musicOn)return;const t=AC.currentTime+d,o=AC.createOscillator(),g=AC.createGain(),lp=AC.createBiquadFilter();o.type='square';o.frequency.value=f;lp.type='lowpass';lp.frequency.value=1400;g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(vol,t+.05);g.gain.setValueAtTime(vol*.8,t+dur*.8);g.gain.linearRampToValueAtTime(0,t+dur);o.connect(lp);lp.connect(g);g.connect(musicGain);if(verbIn){const w=AC.createGain();w.gain.value=.3;g.connect(w);w.connect(verbIn)}o.start(t);o.stop(t+dur+.05)}
const MSTYLES={
  morning:{bpm:168,beats:3,prog:[[60,64,67],[57,60,64],[62,65,69],[55,59,62,65]],scale:[72,74,76,77,79,81,83,84]},
  day:{bpm:184,beats:3,prog:[[65,69,72],[62,65,69],[67,70,74],[60,64,67,70]],scale:[77,79,81,82,84,86,88,89]},
  evening:{bpm:176,beats:4,prog:[[57,60,64,66],[62,65,69,71],[52,56,59,62],[57,60,64,66]],scale:[69,71,72,74,76,77,80,81]},
  night:{bpm:72,beats:4,prog:[[48,55,64,71],[45,52,60,67],[41,48,57,64],[43,50,59,64]],scale:[72,74,76,79,81,83,84,86]}};
function styleFor(h){return h>=6&&h<11?'morning':h>=11&&h<17.5?'day':h>=17.5&&h<21.8?'evening':'night'}
function updateMusicOW(dt){if(!AC||muted||!musicOn)return;const fight=enemies.some(e=>e.quest&&!e.dead&&Math.hypot(e.pos.x-P.pos.x,e.pos.z-P.pos.z)<60);if(fight){updateMusic(dt,true);return}
  const st=styleFor(OWS.tod);if(st!==MUS.style){MUS.style=st;MUS.beat=0;MUS.t=.2}const S=MSTYLES[st],bl=60/S.bpm;MUS.t-=dt;
  while(MUS.t<=0){const d=Math.max(0,MUS.t+.05),b=MUS.beat%S.beats,bar=Math.floor(MUS.beat/S.beats),ch=S.prog[Math.floor(bar/2)%S.prog.length];
    if(st==='morning'||st==='day'){if(b===0)pluck(mtof(ch[0]-12+(bar%2?7:0)),bl*.9,.09,d);else ch.slice(0,3).forEach(n=>acc(mtof(n),bl*.45,.022,d));
      if(Math.random()<.72){MUS.mel=clamp(MUS.mel+((Math.random()*5)|0)-2,0,S.scale.length-1);const n=S.scale[MUS.mel];const len=Math.random()<.25?bl*1.8:bl*.9;acc(mtof(n),len,.03,d);if(Math.random()<.3)acc(mtof(S.scale[clamp(MUS.mel+1,0,7)]),bl*.4,.025,d+bl*.5)}}
    else if(st==='evening'){if(b===0||b===2)pluck(mtof(ch[0]-12+(b===2?7:0)),bl*.8,.1,d);else ch.forEach(n=>pluck(mtof(n),bl*.22,.03,d));
      for(const sw of[0,.62]){if(Math.random()<.55){MUS.mel=clamp(MUS.mel+((Math.random()*5)|0)-2,0,7);clar(mtof(S.scale[MUS.mel]),bl*(sw?.36:.6),.035,d+sw*bl)}}}
    else{const arp=[0,1,2,3,2,1];for(let k=0;k<2;k++){const n=ch[arp[(MUS.beat*2+k)%arp.length]];piano(mtof(n),bl*3,.05,d+k*bl*.5)}if(b===0)piano(mtof(ch[0]-12),bl*4,.06,d);if(Math.random()<.2){MUS.mel=clamp(MUS.mel+((Math.random()*5)|0)-2,0,7);piano(mtof(S.scale[MUS.mel]),bl*2.5,.045,d+bl*.25)}}
    MUS.beat++;MUS.t+=bl}}
/* ---------- dogs ---------- */
const BREEDS=[{id:'lab',name:'Labrador',c:0xd8b070,c2:0xc09050,s:1,ear:0},{id:'beagle',name:'Beagle',c:0xf0e8d8,c2:0x8a5a2a,s:.8,ear:1},{id:'frenchie',name:'Bouledogue',c:0x2a2420,c2:0xe8e0d8,s:.62,ear:2},{id:'poodle',name:'Caniche',c:0xf4f0ea,c2:0xf4f0ea,s:.75,ear:1,fluff:1},{id:'shepherd',name:'Berger',c:0x3a2a1a,c2:0xb07a3a,s:1.15,ear:2}];
function buildDog(br){const g=new THREE.Group(),body=new THREE.Group();g.add(body);const m=rimify(std({color:br.c,roughness:.8}),0xffe0c0,2.5,.25),m2=rimify(std({color:br.c2,roughness:.8}),0xffe0c0,2.5,.25),blk=std({color:0x0a0808,roughness:.3});
  const S=br.s;body.scale.setScalar(S);const tor=new THREE.Mesh(G_sph(),m);tor.scale.set(.28,.26,.5);tor.position.y=.62;body.add(tor);const ch=new THREE.Mesh(G_sph(),m2);ch.scale.set(.24,.24,.22);ch.position.set(0,.62,.34);body.add(ch);
  const head=new THREE.Group();head.position.set(0,.9,.52);body.add(head);const hd=new THREE.Mesh(G_sph(),m);hd.scale.set(.19,.18,.2);head.add(hd);const sn=new THREE.Mesh(G_sph(),m2);sn.scale.set(.1,.09,.14);sn.position.set(0,-.05,.18);head.add(sn);
  const nose=new THREE.Mesh(G_sph(),blk);nose.scale.set(.04,.03,.03);nose.position.set(0,-.02,.32);head.add(nose);for(const s of[-1,1]){const e=new THREE.Mesh(G_sph(),blk);e.scale.setScalar(.028);e.position.set(s*.08,.05,.16);head.add(e);
    const ear=new THREE.Mesh(G_sph(),br.ear===2?m:m2);if(br.ear===2){ear.scale.set(.06,.13,.04);ear.position.set(s*.11,.18,-.02);ear.rotation.z=-s*.3}else{ear.scale.set(.06,.15,.08);ear.position.set(s*.17,-.02,-.02);ear.rotation.z=s*.2}head.add(ear)}
  const legs=[];for(const[a,b]of[[-1,1],[1,1],[-1,-1],[1,-1]]){const L=new THREE.Group();L.position.set(a*.15,.5,b*.3);body.add(L);const l=new THREE.Mesh(G_sph(),b>0?m2:m);l.scale.set(.07,.27,.08);l.position.y=-.24;L.add(l);legs.push(L)}
  const tail=new THREE.Group();tail.position.set(0,.72,-.48);body.add(tail);const tl=new THREE.Mesh(G_sph(),br.fluff?m:m2);tl.scale.set(.05,.05,.2);tl.position.z=-.16;tail.add(tl);tail.rotation.x=-.7;
  if(br.fluff){for(const p of[[0,.62,0,.34],[0,1.02,.5,.2]]){const f=new THREE.Mesh(G_sph(),m);f.scale.setScalar(p[3]);f.position.set(p[0],p[1],p[2]);body.add(f)}}
  g.traverse(o=>{if(o.isMesh)o.castShadow=true});const sh=decal(scorchTex,0xffffff,1.3*S,false,.5);sh.position.y=.05;g.add(sh);scene.add(g);return{g,body,head,legs,tail,S}}
const dogs=[];let myDog=null;
function spawnDog(br,x,z,home){const d=buildDog(br);d.g.position.set(x,groundAt(x,z),z);const o={br,m:d,pos:d.g.position,home,st:'idle',t:0,face:rand(0,TAU),walkT:0,barkT:rand(3,10),own:false,name:null};dogs.push(o);return o}
function updateDog(d,dt){const m=d.m;d.t+=dt;let mv=0;
  if(d.own){const tx=P.pos.x-Math.sin(P.face)*2.2+Math.cos(P.face)*1.4,tz=P.pos.z-Math.cos(P.face)*2.2-Math.sin(P.face)*1.4;const dx=tx-d.pos.x,dz=tz-d.pos.z,dist=Math.hypot(dx,dz);
    if(dist>60){d.pos.x=tx;d.pos.z=tz}else if(dist>1.2){const sp=Math.min(15,dist*2.2+1);d.pos.x+=dx/dist*sp*dt;d.pos.z+=dz/dist*sp*dt;d.face=lerpAngle(d.face,Math.atan2(dx,dz),Math.min(1,dt*10));mv=Math.min(1,sp/6)}}
  else if(d.home){if(d.st==='walk'){const dx=d.tx-d.pos.x,dz=d.tz-d.pos.z,dist=Math.hypot(dx,dz);if(dist<.5){d.st='idle';d.t=0}else{d.pos.x+=dx/dist*1.6*dt;d.pos.z+=dz/dist*1.6*dt;d.face=lerpAngle(d.face,Math.atan2(dx,dz),dt*6);mv=.4}}
    else if(d.t>rand(3,8)){const a=rand(0,TAU),r=rand(0,d.home.r);d.tx=d.home.x+Math.cos(a)*r;d.tz=d.home.z+Math.sin(a)*r;d.st='walk'}}
  collide(d.pos,.4,false,false);d.pos.y=groundAt(d.pos.x,d.pos.z);d.walkT+=dt*mv*14;m.g.rotation.y=d.face;
  m.legs.forEach((L,i)=>L.rotation.x=Math.sin(d.walkT+(i%2?Math.PI:0)+(i>1?Math.PI/2:0))*.7*mv);m.tail.rotation.y=Math.sin(d.t*(d.own?14:6))*.6;m.head.rotation.x=Math.sin(d.t*2)*.05;
  const sit=mv<.05&&d.own;m.body.rotation.x=lerp(m.body.rotation.x,sit?-.35:0,dt*6);m.body.position.y=lerp(m.body.position.y,sit?-.08:0,dt*6);
  d.barkT-=dt;if(d.barkT<=0){d.barkT=rand(d.own?8:5,d.own?20:14);if(Math.hypot(d.pos.x-P.pos.x,d.pos.z-P.pos.z)<40)bark(d.br.s,clamp((d.pos.x-P.pos.x)/30,-1,1))}}
