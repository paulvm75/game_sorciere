/* ---------- particle systems ---------- */
const PVS=`attribute float psize;attribute float palpha;attribute vec3 pcolor;varying vec3 vC;varying float vA;uniform float scale,uMaxPx;
void main(){vC=pcolor;vA=palpha;vec4 mv=modelViewMatrix*vec4(position,1.0);gl_PointSize=min(psize*scale/max(.2,-mv.z),uMaxPx);gl_Position=projectionMatrix*mv;}`;
const PFS=`uniform sampler2D map;uniform float uGain;varying vec3 vC;varying float vA;void main(){vec4 t=texture2D(map,gl_PointCoord);float a=t.a*vA*uGain;if(a<.004)discard;gl_FragColor=vec4(vC*t.rgb,a);}`;
const tmpC=new THREE.Color(),tmpC2=new THREE.Color();
class PSys{
  constructor(max,blending,tex,fadeIn){this.max=max;this.head=0;this.fadeIn=fadeIn;
    const f=n=>new Float32Array(n);
    Object.assign(this,{pos:f(max*3),col:f(max*3),al:f(max),sz:f(max),vel:f(max*3),life:f(max),ml:f(max),g:f(max),c0:f(max*3),c1:f(max*3),s0:f(max),s1:f(max),a0:f(max),dr:f(max)});
    for(let i=0;i<max;i++)this.pos[i*3+1]=-999;
    const geo=new THREE.BufferGeometry();geo.setAttribute('position',new THREE.BufferAttribute(this.pos,3));geo.setAttribute('pcolor',new THREE.BufferAttribute(this.col,3));
    geo.setAttribute('palpha',new THREE.BufferAttribute(this.al,1));geo.setAttribute('psize',new THREE.BufferAttribute(this.sz,1));this.geo=geo;
    this.mat=new THREE.ShaderMaterial({uniforms:{map:{value:tex},scale:{value:600},uGain:{value:1},uMaxPx:{value:220}},vertexShader:PVS,fragmentShader:PFS,transparent:true,depthWrite:false,blending});
    const p=new THREE.Points(geo,this.mat);p.frustumCulled=false;p.renderOrder=5;scene.add(p)}
  emit(p,o){const n=o.n||1;tmpC.set(o.c0!==undefined?o.c0:0xffffff);const r0=tmpC.r,g0=tmpC.g,b0=tmpC.b;tmpC2.set(o.c1!==undefined?o.c1:(o.c0!==undefined?o.c0:0xffffff));
    const j=o.jitter||0,sp=o.speed||0;
    for(let k=0;k<n;k++){const i=this.head;this.head=(this.head+1)%this.max;const i3=i*3;
      this.pos[i3]=p.x+(j?rand(-j,j):0);this.pos[i3+1]=p.y+(j?rand(-j,j)*.6:0);this.pos[i3+2]=p.z+(j?rand(-j,j):0);
      const th=Math.random()*TAU,ph=Math.acos(rand(-1,1)),s=sp*rand(.25,1);
      let vx=Math.sin(ph)*Math.cos(th)*s,vy=Math.cos(ph)*s*(o.flat?.25:1)+(o.up||0),vz=Math.sin(ph)*Math.sin(th)*s;
      if(o.dir){const dj=o.dirJ||1;vx+=o.dir.x*rand(.6,1)*dj;vy+=o.dir.y*rand(.6,1)*dj;vz+=o.dir.z*rand(.6,1)*dj}
      this.vel[i3]=vx;this.vel[i3+1]=vy;this.vel[i3+2]=vz;const L=(o.life||.5)*rand(.7,1.2);this.life[i]=this.ml[i]=L;this.g[i]=o.grav||0;this.dr[i]=o.drag||0;
      this.c0[i3]=r0;this.c0[i3+1]=g0;this.c0[i3+2]=b0;this.c1[i3]=tmpC2.r;this.c1[i3+1]=tmpC2.g;this.c1[i3+2]=tmpC2.b;
      const s0=(o.s0||.5)*rand(.7,1.3);this.s0[i]=s0;this.s1[i]=o.s1!==undefined?o.s1*rand(.7,1.3):s0;this.a0[i]=o.a!==undefined?o.a:1}}
  update(dt,scale){this.mat.uniforms.scale.value=scale;const P_=this.pos,V_=this.vel;
    for(let i=0;i<this.max;i++){if(this.life[i]<=0)continue;const i3=i*3;this.life[i]-=dt;
      if(this.life[i]<=0){P_[i3+1]=-999;this.al[i]=0;continue}
      const d=1-this.dr[i]*dt;V_[i3]*=d;V_[i3+1]=V_[i3+1]*d-this.g[i]*dt;V_[i3+2]*=d;
      P_[i3]+=V_[i3]*dt;P_[i3+1]+=V_[i3+1]*dt;P_[i3+2]+=V_[i3+2]*dt;
      const k=1-this.life[i]/this.ml[i];
      this.col[i3]=lerp(this.c0[i3],this.c1[i3],k);this.col[i3+1]=lerp(this.c0[i3+1],this.c1[i3+1],k);this.col[i3+2]=lerp(this.c0[i3+2],this.c1[i3+2],k);
      this.sz[i]=lerp(this.s0[i],this.s1[i],k);this.al[i]=this.a0[i]*(1-k)*(this.fadeIn?Math.min(1,k*6):1)}
    const a=this.geo.attributes;a.position.needsUpdate=a.pcolor.needsUpdate=a.palpha.needsUpdate=a.psize.needsUpdate=true}
}
const SP=new PSys(2400,THREE.AdditiveBlending,glowTex,false);
const FL=new PSys(2200,THREE.AdditiveBlending,fireTex,true);
const SM=new PSys(700,THREE.NormalBlending,smokeTex,true);SP.mat.uniforms.uGain.value=.6;FL.mat.uniforms.uGain.value=.42;SM.mat.uniforms.uGain.value=.85;
function fxMaxPx(){const h=innerHeight*(renderer.getPixelRatio?renderer.getPixelRatio():1);SP.mat.uniforms.uMaxPx.value=h*.12;FL.mat.uniforms.uMaxPx.value=h*.2;SM.mat.uniforms.uMaxPx.value=h*.35}fxMaxPx();addEventListener('resize',fxMaxPx);
function emit(pos,color,n,speed,life,grav=0,up=0){SP.emit(pos,{n,c0:color,speed,life,grav,up,s0:.55,s1:.2})}
function fireBurst(pos,r,big){FL.emit(pos,{n:big?80:40,c0:0xffc070,c1:0xc02000,s0:big?2.8:1.9,s1:.6,speed:r*3.2,up:2,life:.75,drag:2.6,jitter:.4});
  SM.emit(pos,{n:big?30:14,c0:0x40343e,c1:0x120d14,s0:2.5,s1:big?9:6,speed:r*.9,up:3.5,life:2,drag:1.2,a:.6,jitter:.8});
  SP.emit(pos,{n:big?60:26,c0:0xffd080,c1:0xff4000,s0:.35,s1:.1,speed:r*4,up:4,grav:14,life:.9})}
function frostBurst(pos,n){SP.emit(pos,{n,c0:0xffffff,c1:0x6fd8ff,s0:.5,s1:.15,speed:7,up:2,grav:9,life:.8});SM.emit(pos,{n:(n/4)|0,c0:0xd8f4ff,c1:0x9fd8ff,s0:1.5,s1:4,speed:2,life:1.2,a:.35,drag:2})}

/* ---------- transient fx ---------- */
const fxList=[];
function addFx(obj,dur,update,end){if(obj&&!obj.parent)scene.add(obj);fxList.push({obj,t:0,dur,update,end})}
function disposeObj(o){o.traverse(c=>{if(c.geometry&&!c.geometry.__shared)c.geometry.dispose();if(c.material&&!c.material.__shared)c.material.dispose()})}
function ring(pos,color,from,to,dur,hold){const m=new THREE.Mesh(new THREE.RingGeometry(.85,1,56),new THREE.MeshBasicMaterial({color:fxCol(color,.7),transparent:true,side:THREE.DoubleSide,depthWrite:false,blending:THREE.AdditiveBlending}));
  m.rotation.x=-Math.PI/2;m.position.set(pos.x,(pos.y||0)+.35,pos.z);m.scale.setScalar(from);
  addFx(m,dur,(f,k)=>{if(hold){m.scale.setScalar(lerp(from,to,Math.min(1,k*4)));m.material.opacity=.5+.5*Math.sin(k*30)}else{m.scale.setScalar(lerp(from,to,1-Math.pow(1-k,3)));m.material.opacity=1-k}})}
function runeFlash(pos,color,size,dur){const d=decal(runeTex,color,size);d.position.set(pos.x,(pos.y||0)+.2,pos.z);addFx(d,dur,(f,k)=>{d.rotation.z=f.t*1.4;const s=k<.2?k/.2:1;d.scale.setScalar(.6+.4*s);d.material.opacity=k<.2?k/.2:1-(k-.2)/.8})}
function groundMark(tex,pos,color,size,dur,additive,op=1){const d=decal(tex,color,size,additive,op);d.position.set(pos.x,(pos.y||0)+.08+Math.random()*.04,pos.z);d.rotation.z=Math.random()*TAU;addFx(d,dur,(f,k)=>{d.material.opacity=op*(k<.7?1:1-(k-.7)/.3)})}
const flashLight=new THREE.PointLight(0xff8a3c,0,45,1.5);scene.add(flashLight);let flashI=0;
function flash(pos,color,i){flashLight.position.set(pos.x,pos.y+2,pos.z);flashLight.color.set(color);flashI=Math.min(4,Math.max(flashI,i*.4))}
function lightning(a,b,color){for(let s=0;s<2;s++){const pts=[];const n=10;for(let i=0;i<=n;i++){const p=V3().lerpVectors(a,b,i/n);if(i>0&&i<n){p.x+=rand(-.8,.8);p.y+=rand(-.8,.8);p.z+=rand(-.8,.8)}pts.push(p)}
  const line=new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts),new THREE.LineBasicMaterial({color,transparent:true,blending:THREE.AdditiveBlending,depthWrite:false}));
  addFx(line,.3,(f,k)=>{line.material.opacity=1-k})}
  SP.emit(b,{n:14,c0:0xffffff,c1:color,speed:6,life:.35,s0:.6,s1:.1})}
const timers=[];function after(t,fn){timers.push({t,fn})}

/* ---------- floating text + toast ---------- */
const fxLayer=$('fx'),floats=[];
function floatText(pos,text,color,big){if(floats.length>45){const o=floats.shift();o.el.remove()}const el=document.createElement('div');el.className='dmg'+(big?' big':'');el.textContent=text;el.style.color=color;fxLayer.appendChild(el);floats.push({el,pos:pos.clone(),t:0,dx:rand(-.6,.6)})}
const projV=V3();
function updateFloats(dt){for(let i=floats.length-1;i>=0;i--){const f=floats[i];f.t+=dt;f.pos.y+=dt*1.8;f.pos.x+=f.dx*dt;
  if(f.t>1){f.el.remove();floats.splice(i,1);continue}projV.copy(f.pos).project(camera);
  if(projV.z>1){f.el.style.opacity=0;continue}const x=(projV.x*.5+.5)*innerWidth,y=(-projV.y*.5+.5)*innerHeight;
  const s=f.t<.12?1+(.12-f.t)*5:1;f.el.style.transform=`translate(${x}px,${y}px) translate(-50%,-50%) scale(${s})`;f.el.style.opacity=f.t>.6?(1-f.t)/.4:1}}
const toastEl=$('toast');let toastT=0;
function toast(msg,title,boss){toastEl.innerHTML=(title?`<span class="t">${title}</span>`:'')+(msg||'');toastEl.classList.toggle('boss',!!boss);toastEl.classList.add('show');toastT=title?3:2}


/* ---------- cutscenes ---------- */
const CS={active:false,shots:[],i:0,t:0,speed:1,typed:0,done:null,cam:V3(),look:V3(),lookT:V3()};
const fadeEl=$('fade'),titleCard=$('titleCard'),tcName=$('tcName'),tcSub=$('tcSub');const cineEl=$('cine'),dlg=$('dlg'),dlgWho=$('dlgWho'),dlgText=$('dlgText');
const SPEAKER={'@':'#c9a6ff',Hakuko:'#ffffff','The Nine-Tails':'#ff6a4a','Hrímgar':'#9fe3ff'};
function playCutscene(shots,done){if(typeof voPrefetch==='function')voPrefetch(shots);CS.active=true;CS.shots=shots;CS.i=-1;CS.done=done;CS.cam.copy(camera.position);
  const d=V3();camera.getWorldDirection(d);CS.look.copy(camera.position).addScaledVector(d,10);
  cineEl.classList.remove('hidden');void cineEl.offsetWidth;cineEl.classList.add('on');$('hud').style.opacity='0';nextShot()}
function nextShot(){CS.i++;if(CS.i>=CS.shots.length){endCutscene();return}const s=CS.shots[CS.i];CS.t=0;CS.typed=0;
  if(s.onStart)s.onStart();
  if(s.cut||CS.i===0){fadeEl.style.transition='none';fadeEl.style.opacity='1';void fadeEl.offsetWidth;fadeEl.style.transition='opacity .6s';fadeEl.style.opacity='0';CS.snapNext=true}
  if(s.title){tcName.textContent=s.title[0];tcSub.textContent=s.title[1];titleCard.classList.add('show');setTimeout(()=>titleCard.classList.remove('show'),2800)}
  if(s.who){dlg.classList.add('show');dlgWho.textContent=s.who==='@'?HERO.name:s.who;dlgWho.style.color=SPEAKER[s.who]||'#f2a541';dlgText.textContent='';dlgPortrait(s.who)}else dlg.classList.remove('show');
  s._dur=Math.max(s.dur||2,s.text?s.text.length/42+1.4:0);if(s.who&&s.text&&typeof voPlay==='function')voPlay(s.who,s.text,s)}
function endCutscene(){if(!CS.active)return;W.talking=false;W.g.visible=true;CS.active=false;camera.fov=60;camera.updateProjectionMatrix();if(bokehPass)bokehPass.enabled=false;titleCard.classList.remove('show');cineEl.classList.remove('on');dlg.classList.remove('show');$('hud').style.opacity='';setTimeout(()=>{if(!CS.active)cineEl.classList.add('hidden')},600);
  const d=CS.done;CS.done=null;if(d)d()}
function updateCutscene(dt){const s=CS.shots[CS.i];if(!s)return;const sdt=dt*CS.speed;CS.t+=sdt;
  if(s.text){const before=Math.floor(CS.typed);CS.typed=Math.min(s.text.length,CS.typed+sdt*42);const n=Math.floor(CS.typed);if(n>before&&n%3===0)sfx.blip();dlgText.textContent=s.text.slice(0,n)}
  const k=clamp(CS.t/s._dur,0,1);const c=s.cam(k,CS.t);if(CS.snapNext){CS.cam.copy(c.pos);CS.look.copy(c.look);CS.snapNext=false}
  CS.cam.lerp(c.pos,1-Math.exp(-sdt*(s.snap?30:2.2)));CS.lookT.copy(c.look);CS.look.lerp(CS.lookT,1-Math.exp(-sdt*(s.snap?30:3)));
  const tt=performance.now()*.001;camera.position.copy(CS.cam);camera.position.x+=Math.sin(tt*1.1)*.04;camera.position.y+=Math.sin(tt*1.7)*.03;camera.lookAt(CS.look);
  const fov=s.fov||(s.who?38:48);camera.fov=lerp(camera.fov,fov,1-Math.exp(-sdt*3));camera.updateProjectionMatrix();
  if(bokehPass&&quality>=2){bokehPass.enabled=true;bokehPass.uniforms.focus.value=camera.position.distanceTo(CS.look);bokehPass.uniforms.aperture.value=s.who?.0009:.0003}
  W.talking=s.who==='@'&&!!s.text;if(s.who==='@'&&W.head)W.head.rotation.x=Math.sin(tt*6)*.05;if(s.update)s.update(sdt,k);
  if(CS.t>=s._dur)nextShot()}
cineEl.addEventListener('pointerdown',e=>{if(e.target.closest('button'))return;initAudio();const s=CS.shots[CS.i];if(!s)return;if(s.text&&CS.typed<s.text.length)CS.typed=s.text.length;else nextShot()});
$('skipBtn').addEventListener('click',()=>{if(typeof voStop==='function')voStop(.08);const shots=CS.shots;CS.skipping=true;for(let i=CS.i+1;i<shots.length;i++)if(shots[i].onStart)try{shots[i].onStart()}catch(e){}CS.skipping=false;CS.i=shots.length;endCutscene()});
$('fastBtn').addEventListener('click',()=>{CS.speed=CS.speed===1?2.5:CS.speed===2.5?5:1;$('fastBtn').textContent='Speed x'+CS.speed});
// shot helpers
const orbitShot=(center,r,h,a0,a1,lookY=2)=>(k)=>{const a=lerp(a0,a1,k);return{pos:V3(center.x+Math.sin(a)*r,center.y+h,center.z+Math.cos(a)*r),look:V3(center.x,center.y+lookY,center.z)}};
const pushShot=(from,to,look)=>(k)=>{const e=k*k*(3-2*k);return{pos:V3().lerpVectors(from,to,e),look}};

/* ---------- player state ---------- */
const P={pos:SPAWN.clone(),vy:0,onGround:true,flying:false,flyT:0,flyMeter:6,glide:false,level:1,xp:0,hp:100,mp:80,weak:false,stonesGot:0,cds:new Array(24).fill(0),bar:[0,1,2,3,4,5,6,7,8,-1,-1,-1,-1,-1,-1],taught:new Set(),shield:0,shieldT:0,boostT:0,chgMul:1,chgMulT:0,castKind:'aim',charging:0,blinkCd:0,alive:true,invuln:0,lastHit:-99,castAnim:0,face:0,moveAmt:0,walkT:0,inferno:0,shake:0,webbed:0,poison:0,chilled:0,flyTold:false};
const STATS={kills:0,time:0,won:false};
const beaten=new Set();
const MAXLV=100;const xpNeed=l=>l<=20?Math.round(45*Math.pow(l,1.45)):Math.round(45*Math.pow(20,1.45)*(1+(l-20)*.06));
const ACT_LV={kitsune:[1,6],beast:[5,11],giant:[9,17],catdemon:[15,23],slug:[21,30],queen:[29,33],illusion:[38,48]};
function actRange(){if(MODE==='open')return[1,MAXLV];for(const b of BOSS_ORDER){if(!beaten.has(b)){if(b==='queen'&&typeof BQ!=='undefined'&&BQ.active())return[26,30];return ACT_LV[b]||[1,MAXLV]}}return[clamp(P.level-4,45,96),clamp(P.level+1,55,MAXLV)]}
function lvlDiffK(d,k,lo,hi){return clamp(1+k*d,lo,hi)}
const maxHP=()=>Math.round((100+22*(P.level-1))*(P.weak?.5+P.stonesGot/6:1));
const maxMP=()=>90+11*(P.level-1);
const power=()=>(1+.2*(P.level-1))*(P.weak?.4+.2*P.stonesGot:1)*(P.chgMulT>0?P.chgMul:1)*(P.level>=30?1.15:1)*(P.lbT>0?1.35:1);

/* ---------- shared materials + geometry ---------- */
const MAT={
  ice:std({color:0xb8f0ff,map:TX.ice.map,normalMap:TX.ice.normal,roughness:.08,metalness:.2,emissive:0x1a5a8a,emissiveIntensity:.8,transparent:true,opacity:.86,envMapIntensity:2}),
  iceSolid:std({color:0xd0f6ff,normalMap:TX.ice.normal,roughness:.05,metalness:.1,emissive:0x2a7ab0,emissiveIntensity:.6,transparent:true,opacity:.62,depthWrite:false,envMapIntensity:2.2}),
  chain:new THREE.MeshStandardMaterial({color:0x6a3aa0,emissive:0xa060ff,emissiveIntensity:1.4,metalness:.8,roughness:.3}),
  white:new THREE.MeshBasicMaterial({color:0xffffff}),black:new THREE.MeshBasicMaterial({color:0x000000}),
  bossStone:std({color:0x4a3a42,roughness:.9,emissive:0x2a0810,flatShading:true}),
  eyeRed:new THREE.MeshBasicMaterial({color:0xff2a3a}),eyeAmber:new THREE.MeshBasicMaterial({color:0xffb030}),eyeIce:new THREE.MeshBasicMaterial({color:0xa0f0ff}),
  tooth:std({color:0xf4efe0,roughness:.35}),claw:std({color:0x2a2020,roughness:.3,metalness:.3}),
  pig:rimify(std({color:0xb89a98,map:pigSkin.map,normalMap:pigSkin.normal,normalScale:new THREE.Vector2(1.2,1.2),roughness:.55,emissive:0x0a0202}),0xff7a7a,2.5,.3),
  pigDark:rimify(std({color:0x8a6a60,map:TX.mane.map,roughness:.8}),0xff9a8a,2.5,.4),
  spider:rimify(std({color:0xffffff,map:TX.spider.map,normalMap:TX.spider.normal,roughness:.75}),0xffa060,2.5,.45),
  spiderBand:std({color:0xe08a4a,roughness:.7,emissive:0x2a1004}),
  mane:rimify(std({color:0xffffff,map:TX.mane.map,normalMap:TX.mane.normal,roughness:.85}),0xffd080,2.2,.5),
  demonSkin:rimify(std({color:0xa88a70,roughness:.6,emissive:0x0a0402}),0xff6040,2.5,.45),
  hoof:std({color:0x2a2420,roughness:.4,metalness:.2}),
  robeSilver:rimify(std({color:0x9a9eb0,roughness:.45,metalness:.25,map:TX.whitefur.map}),0xc0d8ff,2.5,.6),
  whiteFur:rimify(std({color:0xffffff,map:TX.whitefur.map,normalMap:TX.whitefur.normal,roughness:.9}),0xd0e0ff,2,.5),
  mask:std({color:0xffffff,map:TX.mask,normalMap:TX.bone.normal,roughness:.45}),
  gold:std({color:0xf2c14a,roughness:.25,metalness:1,envMapIntensity:1.6,emissive:0x3a2004}),
  skinPale:rimify(std({color:0xf4e6e0,roughness:.5,emissive:0x1a1010}),0xffd0d0,3,.4),
  hairBlack:std({color:0x0e0a12,roughness:.35,metalness:.1}),
  parasol:std({color:0x9a1020,roughness:.6,side:THREE.DoubleSide,transparent:true,opacity:.92,emissive:0x300408}),
  redFur:rimify(std({color:0xa84838,map:TX.redfur.map,normalMap:TX.redfur.normal,roughness:.9}),0xff4010,2.5,.25),
  bone:rimify(std({color:0xc8c0b0,map:TX.bone.map,normalMap:TX.bone.normal,roughness:.6}),0xffe0c0,3,.12),
  giant:rimify(std({color:0x6a90b0,map:TX.ice.map,normalMap:TX.ice.normal,normalScale:new THREE.Vector2(1.5,1.5),roughness:.45,metalness:.1,emissive:0x020a14,envMapIntensity:1}),0x9fe8ff,2.5,.35),
  horn:std({color:0x3a3030,roughness:.5,metalness:.1}),
  barBg:new THREE.MeshBasicMaterial({color:0x000000,transparent:true,opacity:.6,depthTest:false}),
  barFg:new THREE.MeshBasicMaterial({color:0xe0475b,depthTest:false}),
  web:new THREE.MeshBasicMaterial({map:webTex,transparent:true,depthWrite:false,side:THREE.DoubleSide,opacity:.9})
};
for(const k in MAT)MAT[k].__shared=true;
const G={sphere:new THREE.SphereGeometry(1,24,16),sphereLo:new THREE.SphereGeometry(1,12,10),shard:new THREE.OctahedronGeometry(1,0),
  spike:(()=>{const g=new THREE.ConeGeometry(.55,3.2,6);g.translate(0,1.6,0);return g})(),iceBlock:new THREE.IcosahedronGeometry(1,1),link:new THREE.TorusGeometry(.15,.045,6,12),
  cone:new THREE.ConeGeometry(1,1,10),cyl:new THREE.CylinderGeometry(1,1,1,10),tooth:new THREE.ConeGeometry(.05,.18,5),
  bar:new THREE.PlaneGeometry(1.4,.14),barFg:(()=>{const g=new THREE.PlaneGeometry(1.4,.14);g.translate(.7,0,0);return g})(),
  hornCurve:bendGeo(lathe([[0,0],[.22,0],[.2,.4],[.15,.9],[.08,1.3],[0,1.55]],10),1.55,1.6),
  bigHorn:bendGeo(lathe([[0,0],[.9,0],[.8,1.5],[.6,3],[.35,4.5],[0,5.5]],14),5.5,2.4),
  tail:bendGeo(lathe([[0,0],[.3,.2],[.55,.8],[.68,1.6],[.6,2.4],[.35,3.1],[0,3.4]],14),3.4,1.3),
  leg1:lathe([[.001,0],[.14,.05],[.12,.5],[.09,1],[.001,1.05]],8)};
for(const k in G)G[k].__shared=true;
const castAll=g=>g.traverse(o=>{if(o.isMesh&&!o.userData.fur&&o.material&&!o.material.transparent)o.castShadow=true});


const pLight=new THREE.PointLight(0xa47cff,1.0,18,1.8);scene.add(pLight);
const infernoLight=new THREE.PointLight(0xff6a20,0,26,1.6);scene.add(infernoLight);
const lampLights=[0,1,2].map(()=>{const l=new THREE.PointLight(0xffb060,0,17,1.8);scene.add(l);return l});let lampT=0;
function updateLampLights(dt){lampT-=dt;if(lampT>0)return;lampT=.25;const px=P.pos.x,pz=P.pos.z;const near=lampList.map(l=>[l,(l[0]-px)**2+(l[1]-pz)**2]).sort((a,b)=>a[1]-b[1]).slice(0,3);
  near.forEach(([l],i)=>{lampLights[i].position.set(l[0],4.3,l[1]);lampLights[i].intensity=1.05*(MODE==='open'?(OW.lampK??1):(1-dawnK))})}

/* ---------- player movement ---------- */
function blockedAt(x,z,y){const l=lotAt(x,z);return l&&y<roofH(l,x,z)-.7}
function movePlayer(dx,dz){const nx=P.pos.x+dx,nz=P.pos.z+dz;if(!blockedAt(nx,P.pos.z,P.pos.y))P.pos.x=nx;if(!blockedAt(P.pos.x,nz,P.pos.y))P.pos.z=nz;
  const airborne=P.pos.y>.9;collide(P.pos,.6,airborne,true)}
function flyMax(){if(MODE==='open')return 15;const n=P.level>=8?1+Math.floor((P.level-8)/3):0;return 6*(1+.05*n)}
function doJump(){if(!started||paused||!P.alive||CS.active)return;
  if(P.swim){const fx=Math.sin(P.face),fz=Math.cos(P.face);for(let d=1.5;d<8;d+=.5){const x=P.pos.x+fx*d,z=P.pos.z+fz*d;const t=gType(x,z);if(t!==2&&t!==7&&t!==0){const y=groundAt(x,z);P.climb={x0:P.pos.x,z0:P.pos.z,y0:P.pos.y,x1:x+fx*.8,z1:z+fz*.8,y1:y,t:0,d:.85};P.swim=false;sfx.jump();SP.emit(V3(P.pos.x,P.pos.y+1,P.pos.z),{n:18,c0:0xe8f4ff,c1:0x6a8aa8,s0:.5,s1:.1,life:.8,up:3,speed:4});return}}P.vy=4;return}
  if(P.onGround){P.vy=11.5;P.onGround=false;sfx.jump();SP.emit(V3(P.pos.x,P.pos.y+.2,P.pos.z),{n:12,c0:0xd0c0ff,c1:0x402080,speed:3,flat:true,life:.5});return}
  if(P.flying){P.flying=false;P.glide=true;return}
  if(P.level<4&&MODE!=='open'){if(!P.flyTold){P.flyTold=true;toast('Flying unlocks at level 4')}return}
  if(P.flyMeter<1.2){toast('Your broom needs to rest');return}
  P.flying=true;P.flyT=Math.min(flyMax(),P.flyMeter);P.flyMeter-=P.flyT;P.boostT=MODE==='open'?5:0;P.vy=Math.max(P.vy,7);sfx.fly();runeFlash(P.pos,0xb58cff,4,.6);
  SP.emit(V3(P.pos.x,P.pos.y+1,P.pos.z),{n:40,c0:0xffffff,c1:0x7a40ff,speed:6,life:.7})}
function blink(){if(!started||paused||!P.alive||P.blinkCd>0||CS.active)return;P.blinkCd=2.4;if(P.onGround&&W.ch&&!P.heroAnim){P.heroAnim='Roll';after(.55,()=>{if(P.heroAnim==='Roll')P.heroAnim=null})}vib(15);let dx=Math.sin(P.face),dz=Math.cos(P.face);
  if(lastMove.l>.1){dx=lastMove.x;dz=lastMove.z}const from=P.pos.clone();for(let i=0;i<12;i++)movePlayer(dx*.8,dz*.8);
  P.invuln=Math.max(P.invuln,.35);sfx.blink();P.face=Math.atan2(dx,dz);
  for(let i=0;i<=10;i++){const p=V3().lerpVectors(from,P.pos,i/10);p.y+=1.2;SP.emit(p,{n:5,c0:0xe8d8ff,c1:0x5a2ad0,s0:.8,s1:.1,speed:1.5,life:.5,jitter:.4})}
  runeFlash(from,0xb58cff,4,.5)}

/* ---------- heroes ---------- */
const HERO={g:'f',name:'Maëlle'};
function jaggedLathe(pts,seg,phiS,phiL,jag){const g=new THREE.LatheGeometry(pts.map(p=>new THREE.Vector2(p[0],p[1])),seg,phiS,phiL);if(jag){const p=g.attributes.position,n=pts.length;for(let i=0;i<=seg;i++){const k=i*n;p.setY(k,p.getY(k)+(i%2?jag:0)+rand(-jag*.2,jag*.2))}g.computeVertexNormals()}return g}
function limb(parent,x,y,z,len,r0,r1,mat){const pv=new THREE.Group();pv.position.set(x,y,z);parent.add(pv);const m=new THREE.Mesh(lathe([[.001,-len],[r1,-len+.02],[r1*1.05,-len*.5],[r0,-.03],[.001,0]],10),mat);pv.add(m);return pv}
function hairStrands(parent,n,col,y0,len,rad,spread,wave){for(let k=0;k<n;k++){const a=Math.PI*(1-spread)/2*0+Math.PI+(k/(n-1)-.5)*Math.PI*spread;const x0=Math.sin(a)*rad,z0=Math.cos(a)*rad;
  const pts=[];for(let s=0;s<6;s++){const t=s/5;pts.push(V3(x0*(1+t*.35)+Math.sin(t*6+k)*wave,y0-t*len,z0*(1+t*.25)-t*.12+Math.cos(t*5+k)*wave*.5))}
  parent.add(new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts),14,.05*(1-k%3*.15),6,false),col))}}
function makeHero(gender){
  const g=new THREE.Group(),body=new THREE.Group();g.add(body);
  const skinM=rimify(std({color:gender==='f'?0xd4bab0:0xcc9c7c,roughness:.6}),0xffc0a0,3,.12);
  const goldM=MAT.gold,silverM=std({color:0xd8dce6,roughness:.2,metalness:1,envMapIntensity:1.8});
  const legs=[],arms=[];let orb,orbCol,castArm,castBase,hat=null,cape;
  const head=new THREE.Group();head.position.y=2.3;body.add(head);
  part(G.sphere,skinM,.2,.25,.21,0,0,0,head);const nose=part(G.cone,skinM,.03,.07,.03,0,-.02,.21,head);nose.rotation.x=Math.PI/2;
  const neck=part(G.cyl,skinM,.075,.2,.075,0,-.25,0,head);
  if(gender==='f'){
    orbCol=0xd8b8ff;
    const velvet=rimify(std({color:0x18131c,roughness:.6,side:THREE.DoubleSide}),0x7a58c0,2.4,.22);
    const velvetD=rimify(std({color:0x141018,roughness:.55}),0x7a58c0,2.6,.2);
    const tulle=std({color:0x5a6a44,roughness:.8,transparent:true,opacity:.55,side:THREE.DoubleSide,depthWrite:false});
    const pants=rimify(std({color:0x121218,roughness:.7}),0x7a60c0,2.5,.3);const boot=std({color:0x0c0a0e,roughness:.25,metalness:.2,envMapIntensity:1.4});
    for(const s of[-1,1]){const L=limb(body,s*.12,1.02,0,.98,.1,.075,pants);const b=new THREE.Mesh(lathe([[.001,0],[.1,0],[.105,.06],[.085,.18],[.08,.45],[.095,.58],[.001,.6]],12),boot);b.position.y=-1.02;L.add(b);
      const toe=part(G.sphere,boot,.08,.06,.13,0,-.98,.07,L);for(let k=0;k<5;k++){const r=new THREE.Mesh(new THREE.TorusGeometry(.086,.006,4,12),silverM);r.rotation.x=Math.PI/2;r.position.y=-.9+k*.09;L.add(r)}legs.push(L)}
    const skirt=new THREE.Mesh(jaggedLathe([[.98,.02],[.8,.35],[.55,.8],[.36,1.1],[.28,1.3]],30,.55,TAU-1.1,.22),velvet);body.add(skirt);
    const under=new THREE.Mesh(jaggedLathe([[.9,.12],[.72,.4],[.5,.8],[.33,1.1],[.27,1.28]],24,.9,TAU-1.8,.18),tulle);under.scale.setScalar(.97);body.add(under);
    body.add(new THREE.Mesh(lathe([[.001,1.02],[.23,1.06],[.24,1.3],[.21,1.42],[.26,1.62],[.3,1.84],[.22,1.97],[.08,2.03],[.001,2.04]],22),velvetD));
    const pep=new THREE.Mesh(jaggedLathe([[.36,1.0],[.28,1.18],[.25,1.3]],20,.4,TAU-.8,.06),velvet);body.add(pep);
    const belt=new THREE.Mesh(new THREE.TorusGeometry(.245,.04,6,28),std({color:0x0a080c,roughness:.4}));belt.rotation.x=Math.PI/2;belt.position.y=1.32;body.add(belt);
    const buckle=new THREE.Mesh(new THREE.TorusGeometry(.075,.018,4,4),silverM);buckle.rotation.z=Math.PI/4;buckle.scale.set(1.3,1,1);buckle.position.set(0,1.32,.27);body.add(buckle);
    for(let k=0;k<4;k++)part(G.sphereLo,silverM,.018,.018,.012,0,1.45+k*.13,k<2?.225:.25+k*.01,body);
    const col=new THREE.Mesh(lathe([[.1,0],[.13,.1],[.16,.2]],16,-.8,TAU-1.6),velvet);col.position.y=1.96;body.add(col);
    for(const s of[-1,1])part(G.sphere,velvetD,.12,.1,.12,s*.29,1.88,0,body);
    cape=new THREE.Mesh(new THREE.PlaneGeometry(.9,1.6,3,8),velvet);cape.position.set(0,1.1,-.3);cape.rotation.x=.12;cape.visible=false;body.add(cape);
    const glove=std({color:0x0a080c,roughness:.35});
    for(const s of[-1,1]){const A=limb(body,s*.3,1.88,0,.6,.075,.06,velvetD);const F=limb(A,0,-.6,0,.5,.06,.045,glove);part(G.sphere,glove,.06,.08,.045,0,-.55,0,F);A.userData.F=F;arms.push(A)}
    arms[0].rotation.z=-.15;arms[1].rotation.set(-.5,0,.25);arms[1].userData.F.rotation.x=-.7;
    const wand=new THREE.Group();wand.position.set(0,-.58,.05);arms[1].userData.F.add(wand);const wd=part(G.cyl,std({color:0x1a1014,roughness:.3,metalness:.3}),.018,.6,.018,0,0,.22,wand);wd.rotation.x=Math.PI/2;
    orb=part(G.shard,new THREE.MeshBasicMaterial({color:orbCol}),.05,.08,.05,0,0,.54,wand);castArm=arms[1];castBase=-.5;
    part(G.sphere,std({color:0x3a1030,roughness:.3}),.055,.016,.02,0,-.13,.19,head);
    for(const s of[-1,1]){part(G.sphereLo,std({color:0x2a2030,roughness:.6}),.055,.03,.02,s*.075,.05,.185,head);part(G.sphereLo,new THREE.MeshBasicMaterial({color:0xb8a0e0}),.022,.018,.012,s*.075,.045,.2,head)}
    const hairM=rimify(std({color:0xb8b8c4,roughness:.35,metalness:.1}),0xd0d8ff,2.5,.2);
    const cap=new THREE.Mesh(new THREE.SphereGeometry(.23,20,14,0,TAU,0,Math.PI*.62),hairM);cap.position.set(0,.03,-.02);cap.rotation.x=-.25;head.add(cap);
    hairStrands(head,18,hairM,.05,1.15,.2,1.5,.07);for(const s of[-1,1])for(let k=0;k<3;k++){const c=new THREE.CatmullRomCurve3([V3(s*.17,.02,.08-k*.05),V3(s*.24,-.3,.12),V3(s*.22,-.7,.16+k*.03),V3(s*.2,-.95,.14)]);head.add(new THREE.Mesh(new THREE.TubeGeometry(c,10,.045,6,false),hairM))}
    hat=new THREE.Group();hat.position.y=.17;hat.rotation.set(-.08,0,.1);head.add(hat);
    hat.add(new THREE.Mesh(bendGeo(lathe([[.001,0],[.62,-.03],[.64,.02],[.24,.05],[.21,.3],[.14,.7],[.06,1.05],[.01,1.3]],24),1.3,-.6),velvetD));
    const band=new THREE.Mesh(new THREE.TorusGeometry(.225,.05,8,24),std({color:0x4a5a36,roughness:.7}));band.rotation.x=Math.PI/2;band.position.y=.1;hat.add(band);
    const bow=part(G.sphere,std({color:0x4a5a36,roughness:.7}),.12,.08,.06,.2,.14,.12,hat);
    const veil=new THREE.Mesh(new THREE.PlaneGeometry(.35,.9,2,6),tulle);veil.position.set(.3,-.35,.05);veil.rotation.set(0,-.6,-.1);hat.add(veil);
  }else{
    orbCol=0x8ad8ff;
    const blueC=mkCanvas(128,128,(x)=>{x.fillStyle='#244e92';x.fillRect(0,0,128,128);for(let i=0;i<128;i+=6){x.fillStyle='rgba(10,20,60,.35)';x.fillRect(i,0,2,128);x.fillStyle='rgba(150,190,255,.12)';x.fillRect(i+3,0,1,128)}});
    const blueT=new THREE.CanvasTexture(blueC);blueT.wrapS=THREE.RepeatWrapping;blueT.repeat.set(4,1);
    const blue=rimify(std({map:blueT,normalMap:rep(heightToNormal(blueC,1.5),4,1),roughness:.6,side:THREE.DoubleSide}),0x80b0ff,2,.45);
    const grey=rimify(std({color:0x8a8680,roughness:.85,side:THREE.DoubleSide}),0xffffff,2.5,.1);
    const navy=std({color:0x1a2036,roughness:.75});const leather=std({color:0x4a2e1c,roughness:.45,metalness:.1,envMapIntensity:1.2});const red=std({color:0xa0201c,roughness:.7});
    for(const s of[-1,1]){const L=limb(body,s*.13,1.02,0,.98,.11,.08,navy);const b=new THREE.Mesh(lathe([[.001,0],[.105,0],[.11,.06],[.09,.2],[.09,.45],[.115,.62],[.001,.64]],12),leather);b.position.y=-1.02;L.add(b);part(G.sphere,leather,.085,.065,.14,0,-.98,.07,L);legs.push(L)}
    const skirt=new THREE.Mesh(jaggedLathe([[.62,.5],[.5,.85],[.34,1.15],[.27,1.32]],28,.25,TAU-.5,.04),blue);body.add(skirt);
    body.add(new THREE.Mesh(lathe([[.001,1.1],[.26,1.12],[.27,1.35],[.28,1.6],[.33,1.85],[.22,1.98],[.001,2.02]],22),blue));
    const sash=new THREE.Mesh(new THREE.TorusGeometry(.275,.07,8,26),red);sash.rotation.x=Math.PI/2;sash.position.y=1.22;body.add(sash);
    for(let k=0;k<2;k++){const t=part(G.cyl,red,.05,.55,.012,.22+k*.08,.9,.14,body);t.rotation.z=.08-k*.1}
    const belt=new THREE.Mesh(new THREE.TorusGeometry(.285,.045,6,28),leather);belt.rotation.x=Math.PI/2;belt.position.y=1.38;body.add(belt);
    const bk=new THREE.Mesh(new THREE.TorusGeometry(.06,.015,4,4),goldM);bk.rotation.z=Math.PI/4;bk.position.set(0,1.38,.31);body.add(bk);
    part(new THREE.BoxGeometry(1,1,1),leather,.2,.24,.09,-.27,1.18,.18,body).rotation.y=-.6;
    const scarf=new THREE.Mesh(new THREE.TorusGeometry(.26,.11,10,26),grey);scarf.rotation.x=Math.PI/2+.25;scarf.position.set(0,1.95,.02);body.add(scarf);
    const drape=new THREE.Mesh(lathe([[.12,0],[.32,-.25],[.28,-.3]],18,-.9,1.8),grey);drape.position.set(0,1.95,.05);body.add(drape);
    const am=new THREE.Mesh(new THREE.TorusGeometry(.05,.012,6,16),goldM);am.position.set(0,1.72,.3);body.add(am);part(G.sphereLo,std({color:0xff7a20,emissive:0x802000,roughness:.2}),.035,.035,.02,0,1.72,.305,body);
    const am2=am.clone();am2.position.y=1.55;am2.position.z=.29;body.add(am2);
    cape=new THREE.Mesh(new THREE.PlaneGeometry(.8,1,2,4),grey);cape.position.set(0,1.5,-.3);cape.visible=false;body.add(cape);
    for(const s of[-1,1]){const A=limb(body,s*.32,1.88,0,.58,.085,.07,blue);const bell=new THREE.Mesh(lathe([[.001,-.02],[.09,0],[.2,-.3],[.26,-.55],[.001,-.56]],14),grey);bell.position.y=-.55;A.add(bell);
      const F=limb(A,0,-.58,0,.46,.06,.05,skinM);part(G.sphere,skinM,.055,.075,.04,0,-.5,0,F);const br=new THREE.Mesh(new THREE.TorusGeometry(.055,.01,4,14),goldM);br.rotation.x=Math.PI/2;br.position.y=-.42;F.add(br);A.userData.F=F;arms.push(A)}
    arms[0].rotation.set(-.6,0,-.25);arms[0].userData.F.rotation.x=-.9;
    const book=new THREE.Group();book.position.set(0,-.58,.1);book.rotation.set(-.4,.2,0);arms[0].userData.F.add(book);
    part(new THREE.BoxGeometry(1,1,1),std({color:0x6a2418,roughness:.5}),.36,.03,.26,0,-.02,0,book);part(new THREE.BoxGeometry(1,1,1),std({color:0xf0e4c8,roughness:.8,emissive:0x2a2418}),.34,.04,.24,0,.015,0,book);
    book.add(glowSprite(0x6ab8ff,.8,.35));
    arms[1].rotation.set(-.9,0,.55);arms[1].userData.F.rotation.x=-.2;
    orb=part(G.sphereLo,new THREE.MeshBasicMaterial({color:orbCol}),.08,.08,.08,0,-.62,.04,arms[1].userData.F);castArm=arms[1];castBase=-.9;
    const hairM=rimify(std({color:0x4a3020,roughness:.45}),0xc09070,2.5,.3);
    const cap=new THREE.Mesh(new THREE.SphereGeometry(.225,20,14,0,TAU,0,Math.PI*.55),hairM);cap.position.set(0,.05,-.01);cap.rotation.x=-.35;head.add(cap);
    part(G.sphere,hairM,.2,.1,.16,.02,.2,.06,head).rotation.z=-.2;for(let k=0;k<5;k++){const c=new THREE.CatmullRomCurve3([V3(-.12+k*.06,.22,.08),V3(-.1+k*.07,.2,.18),V3(-.14+k*.07,.1,.21)]);head.add(new THREE.Mesh(new THREE.TubeGeometry(c,6,.03,5,false),hairM))}
    for(const s of[-1,1]){part(G.sphereLo,MAT.white,.035,.022,.015,s*.075,.045,.19,head);part(G.sphereLo,new THREE.MeshBasicMaterial({color:0x5aa0e0}),.018,.018,.012,s*.075,.045,.2,head);part(G.cyl,hairM,.05,.012,.01,s*.078,.1,.2,head).rotation.z=Math.PI/2}
    part(G.sphere,std({color:0xb07a70,roughness:.5}),.045,.012,.015,0,-.13,.2,head);
  }
  const orbGlow=glowSprite(orbCol,1.8);orb.add(orbGlow);orbGlow.scale.setScalar(gender==='f'?5:6);
  if(gender==='m'){const spark=new THREE.Group();orb.add(spark);g.userData.spark=spark}
  const broom=new THREE.Group();broom.visible=false;g.add(broom);
  const woodM=std({color:0x5a3620,roughness:.7});const stick=new THREE.Mesh(G.cyl,woodM);stick.scale.set(.05,2.8,.05);stick.rotation.x=Math.PI/2;broom.add(stick);
  const brist=new THREE.Mesh(G.cone,std({color:0xb08a40,roughness:.9}));brist.scale.set(.32,1,.32);brist.rotation.x=-Math.PI/2;brist.position.z=-1.8;broom.add(brist);
  broom.position.set(0,.9,.1);
  castAll(g);
  const aura=decal(runeTex,orbCol,3.4,true,0);aura.position.y=.06;g.add(aura);
  scene.add(g);return{g,body,head,legs,arms,orb,orbM:orb.material,orbGlow,orbCol,hat,cape,aura,broom,castArm,castBase,staff:castArm,gender};
}
const CH_READY=chInit(PRE);
let W=CH_READY?makeHeroCH('f'):makeHero('f');
function setHero(gender){const p=W.g.position.clone(),r=W.g.rotation.y;scene.remove(W.g);W=CH.ok?makeHeroCH(gender):makeHero(gender);W.g.position.copy(p);W.g.rotation.y=r;HERO.g=gender;pLight.color.setHex(gender==='f'?0xa47cff:0x6aa8ff);if(W.setEvolved)W.setEvolved(started&&P.level>=30)}
const heroShadow=decal(scorchTex,0xffffff,2.2,false,.55);scene.add(heroShadow);
function animateHero(dt,mv,air,t){if(W.ch){W.update(dt,{mv,air:air&&!P.swim&&!P.climb,fly:W.broom.visible,swim:P.swim,dead:!P.alive,cast:P.castAnim>0&&!(P.punchT>0),castKind:P.castKind,charge:P.charging>0,punch:P.punchT>0,talk:!!W.talking,sit:!!P.sitting,anim:P.heroAnim||null});return}const L=W.legs,A=W.arms;const sw=Math.sin(P.walkT);
  if(W.broom.visible){L.forEach((l,i)=>{l.rotation.x=lerp(l.rotation.x,-1.2,dt*8);l.rotation.z=(i?1:-1)*.15});}
  else if(air){L[0].rotation.x=lerp(L[0].rotation.x,-.5,dt*8);L[1].rotation.x=lerp(L[1].rotation.x,.2,dt*8)}
  else L.forEach((l,i)=>{l.rotation.x=(i?-1:1)*sw*.55*mv;l.rotation.z=0});
  const free=A[0]===W.castArm?A[1]:A[0];if(W.gender==='f')free.rotation.x=-sw*.4*mv+Math.sin(t*1.5)*.03;else free.rotation.x=-.6+Math.sin(t*1.4)*.04-sw*.15*mv;
  if(W.g.userData.spark&&Math.random()<.5){const o=W.orb.getWorldPosition(V3());lightningFx(o)}}
function lightningFx(o){SP.emit(o,{n:2,c0:0xffffff,c1:0x3a8aff,s0:.35,s1:.05,life:.25,speed:2.5,jitter:.12})}

/* ---------- spells ---------- */
const ICON={
  bolt:'<path d="M12 1.5l2.6 7.9 7.9 2.6-7.9 2.6L12 22.5l-2.6-7.9L1.5 12l7.9-2.6z"/>',
  fire:'<path d="M12 1.5c1.2 4.2 5.8 6.2 5.8 11.6A5.8 5.8 0 0 1 6.2 13c0-3.3 2.2-4.6 2.3-7.7 1.6 1.2 2.2 2.8 2.2 4.4 1.2-2.4 1.5-5.3 1.3-8.2z"/>',
  lance:'<path d="M21.5 2.5l-4 10-3 1-1 3-4 4-2-2 4-4 3-1 1-3z"/><path d="M4 18l2 2-3 1.5z"/>',
  frost:'<g stroke="currentColor" stroke-width="2.2" stroke-linecap="round" fill="none"><path d="M12 2v20M3.3 7l17.4 10M3.3 17L20.7 7M9 3.6l3 2.2 3-2.2M9 20.4l3-2.2 3 2.2"/></g>',
  chains:'<g stroke="currentColor" stroke-width="2.2" fill="none"><rect x="3" y="9" width="9" height="6" rx="3"/><rect x="12" y="9" width="9" height="6" rx="3"/></g><circle cx="12" cy="12" r="1.6"/>',
  chain:'<path d="M13.5 1.5L4 14h6.2l-1.4 8.5L19 9.8h-6.3z"/>',
  inferno:'<path d="M12 3c.8 2.6 3.5 3.6 3.5 7a3.5 3.5 0 0 1-7 0c0-2 1.3-2.8 1.4-4.6 1 .7 1.3 1.7 1.3 2.6.7-1.4.9-3.2.8-5z"/><g stroke="currentColor" stroke-width="2" fill="none"><ellipse cx="12" cy="17" rx="9" ry="3.6"/></g>',
  meteor:'<circle cx="15" cy="15" r="5.5"/><path d="M2.5 2.5l8.5 8.5M7 2l6 6M2 7l6 6" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/>',
  void:'<circle cx="12" cy="12" r="4"/><g stroke="currentColor" stroke-width="2" fill="none"><path d="M12 3a9 9 0 0 1 9 9M12 21a9 9 0 0 1-9-9M4.5 6.5a9 9 0 0 1 4-2.8M19.5 17.5a9 9 0 0 1-4 2.8"/></g>',
  jump:'<path d="M12 3l7 8h-4v5H9v-5H5z"/><rect x="6" y="18" width="12" height="2.5" rx="1"/>',
 poison:'<path d="M6 14a4 4 0 0 1 1-7.9A5 5 0 0 1 17 7a4 4 0 0 1 1 7.9z"/><circle cx="9" cy="18" r="1.7"/><circle cx="14" cy="19.4" r="1.3"/><circle cx="11.5" cy="22" r=".9"/>',
  venom:'<path d="M4 19c3 0 3-4 6-4s3 4 6 4 3-5 0-7-6 1-6-3 3-4 6-3" stroke="currentColor" stroke-width="2.4" fill="none" stroke-linecap="round"/><circle cx="17.5" cy="5" r="2"/>',
  plague:'<circle cx="12" cy="12" r="3.2"/><circle cx="12" cy="3.8" r="1.9"/><circle cx="19.2" cy="8" r="1.6"/><circle cx="19.2" cy="16" r="1.9"/><circle cx="12" cy="20.2" r="1.6"/><circle cx="4.8" cy="16" r="1.9"/><circle cx="4.8" cy="8" r="1.6"/>',
  storm:'<path d="M6 12a4 4 0 0 1 .5-8A5 5 0 0 1 16 5a3.5 3.5 0 0 1 2 7z"/><path d="M12.5 12l-3.5 6h3l-1.2 4.5 4.7-6.5h-3l1.3-4z"/>',
  aegis:'<path d="M12 2l8 3v6c0 5-3.5 9-8 11-4.5-2-8-6-8-11V5z"/>',
  starfall:'<path d="M12 2l2 5 5 .5-4 3.5 1.2 5L12 13.3 7.8 16l1.2-5-4-3.5 5-.5z"/><circle cx="5" cy="20" r="1.6"/><circle cx="18.5" cy="19.5" r="1.3"/><circle cx="12" cy="21" r="1"/>',
  limit:'<path d="M12 2l2.4 6.2L21 9l-5 4.4L17.5 21 12 17.3 6.5 21 8 13.4 3 9l6.6-.8z"/><circle cx="12" cy="12" r="2.4" fill="rgba(10,6,20,.8)"/>',
  eclipse:'<circle cx="12" cy="12" r="8"/><circle cx="14.6" cy="10" r="6.4" fill="rgba(10,6,20,.85)"/>',
  blink:'<path d="M4 12h9M6 8h8M6 16h8" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M14 5l7 7-7 7z"/>'
};
const SPELLS=[
  {id:'bolt',name:'Arcane bolt',lvl:1,cost:4,cd:.3,color:'#d4b6ff'},
  {id:'fire',name:'Fireball',lvl:2,cost:14,cd:1,color:'#ff8a3c'},
  {id:'lance',name:'Ice lance',lvl:4,cost:12,cd:.75,color:'#8fe3ff'},
  {id:'frost',name:'Glacial nova',lvl:6,cost:28,cd:7,color:'#bff2ff'},
  {id:'chains',name:'Shadow chains',lvl:8,cost:30,cd:9,color:'#c07aff'},
  {id:'chain',name:'Chain lightning',lvl:10,cost:30,cd:3,color:'#f1f5ff',needs:true},
  {id:'inferno',name:'Inferno',lvl:12,cost:42,cd:11,color:'#ff6a20'},
  {id:'meteor',name:'Meteor',lvl:15,cost:50,cd:8,color:'#ff5a3c'},
  {id:'void',name:'Void well',lvl:18,cost:65,cd:14,color:'#9d6bff'},
  {id:'storm',name:'Thunderstorm',lvl:22,cost:60,cd:14,color:'#cfe0ff'},
  {id:'aegis',name:'Arcane aegis',lvl:26,cost:40,cd:22,color:'#f2d27a'},
  {id:'starfall',name:'Starfall',lvl:32,cost:80,cd:16,color:'#ffe08a'},
  {id:'eclipse',name:'Eclipse',lvl:37,cost:95,cd:20,color:'#ff5a7a'},
  {id:'poison',name:'Stinking poison',lvl:1,teach:1,cost:26,cd:5,color:'#9dff5a'},
  {id:'venom',name:'Venom serpent',lvl:1,teach:2,cost:34,cd:3.5,color:'#6ae04a'},
  {id:'plague',name:'Plague nova',lvl:1,teach:3,cost:55,cd:12,color:'#c6ff3a'},
  {id:'limit',name:'Limit Breaker',lvl:1,teach:4,cost:0,cd:240,color:'#f2c14a'}
];
const SPELL_INFO={bolt:'Fast homing bolt. Spammable.',fire:'Exploding fireball that sets enemies on fire.',lance:'Piercing ice. Three hits freeze.',frost:'Ice nova around you. Freezes everything close.',chains:'Binds up to 9 enemies in shadow chains.',chain:'Lightning that jumps between 6 enemies.',inferno:'A ring of fire orbits you for a few seconds.',meteor:'Calls a meteor on your target.',void:'A black hole that drags enemies in.',storm:'A storm cloud follows you and strikes enemies for 5 seconds.',aegis:'An arcane shield absorbs damage for 8 seconds.',starfall:'A rain of falling stars on the target area.',eclipse:'A dark sun that implodes, then explodes. Huge damage.',poison:'Master Bilel\'s stinking cloud. Poisons and slows everything inside.',venom:'A venom serpent that pierces enemies and poisons them.',plague:'A poison nova around you. Knocks back, poisons, spreads panic.',limit:'Only at 15% health or less. 20 seconds: damage taken -50%, speed +50%, attacks +35%, flight +30%. Recharges in 4 minutes.'};
const CAST_KIND={bolt:'aim',lance:'aim',chain:'aim',venom:'aim',fire:'throw',meteor:'throw',starfall:'throw',poison:'throw'};
function spellKnown(s){return s.teach?P.taught.has(s.id):(MODE==='open'||P.level>=s.lvl)}
const SLOTKEY=['1','2','3','4','5','6','7','8','9','0','Z','X','V','G','H'];const spellEls=[];let blinkEl,jumpEl,jumpHeld=false;
{const wrap=$('spells');for(let k=0;k<15;k++){const b=document.createElement('button');b.className='spell'+(k>=10?' sec':'');
  b.innerHTML=`<svg viewBox="0 0 24 24" aria-hidden="true"></svg><span class="cd"></span><span class="chg"></span><span class="lv"></span><span class="cdt"></span><span class="k">${SLOTKEY[k]}</span>`;
  b.addEventListener('pointerdown',e=>{e.stopPropagation();e.preventDefault();initAudio();if(typeof bookOpen!=='undefined'&&bookOpen){bookAssign(k);return}chargeStart(k)});
  const up=e=>{if(typeof bookOpen!=='undefined'&&bookOpen)return;chargeEnd(k)};b.addEventListener('pointerup',up);b.addEventListener('pointercancel',up);b.addEventListener('pointerleave',up);wrap.appendChild(b);spellEls.push(b)}
  blinkEl=document.createElement('button');blinkEl.id='blink';blinkEl.className='spell';blinkEl.setAttribute('aria-label','Blink');
  blinkEl.innerHTML=`<svg viewBox="0 0 24 24" aria-hidden="true">${ICON.blink}</svg><span class="cd"></span><span class="k">F</span>`;
  blinkEl.addEventListener('pointerdown',e=>{e.stopPropagation();e.preventDefault();initAudio();blink()});
  $('moveBtns').appendChild(blinkEl);
  jumpEl=document.createElement('button');jumpEl.id='jumpBtn';jumpEl.className='spell';jumpEl.setAttribute('aria-label','Jump');jumpEl.innerHTML=`<span class="fly"></span><svg viewBox="0 0 24 24" aria-hidden="true">${ICON.jump}</svg>`;
  jumpEl.addEventListener('pointerdown',e=>{e.stopPropagation();e.preventDefault();initAudio();jumpHeld=true;doJump()});
  const up=()=>{jumpHeld=false};jumpEl.addEventListener('pointerup',up);jumpEl.addEventListener('pointercancel',up);jumpEl.addEventListener('pointerleave',up);$('moveBtns').appendChild(jumpEl)}

const tv=V3();
function camForward(){return V3(-Math.sin(yaw),0,-Math.cos(yaw))}
function orbPos(){return W.orb.getWorldPosition(V3())}
function eCenter(e){return V3(e.pos.x,e.pos.y+e.def.h*.55,e.pos.z)}
function findTarget(range){if(P.lock&&!P.lock.dead&&P.lock.pos.distanceTo(P.pos)<range)return P.lock;const f=V3(Math.sin(P.face),0,Math.cos(P.face));const cf=camForward();let best=null,bs=1e9;
  for(const e of enemies){if(e.dead)continue;const dx=e.pos.x-P.pos.x,dz=e.pos.z-P.pos.z,d=Math.hypot(dx,dz);if(d>range)continue;
    if(Math.abs(e.pos.y-P.pos.y)>30)continue;const dot=Math.max((dx*f.x+dz*f.z),(dx*cf.x+dz*cf.z))/(d||1);let s=d*(dot>.25?1:1.5);if(e.def.boss)s*=.8;if(s<bs){bs=s;best=e}}return best}
function faceTo(p){P.face=Math.atan2(p.x-P.pos.x,p.z-P.pos.z);W.g.rotation.y=P.face}
function aimDir(o,t){if(t)return eCenter(t).sub(o).normalize();return V3(Math.sin(P.face),0,Math.cos(P.face))}

const projs=[];
function makeProj(o){const g=new THREE.Group();
  if(o.mesh)g.add(o.mesh);else{const core=new THREE.Mesh(G.sphere,MAT.white);core.scale.setScalar(o.size*.45);g.add(core)}
  g.add(glowSprite(o.color,o.size*4.5));g.position.copy(o.from);scene.add(g);
  const p=Object.assign({g,pos:g.position,vel:o.dir.clone().multiplyScalar(o.speed),hits:new Set(),pierce:0,homing:0,life:2},o);projs.push(p);return p}

function freeze(e,dur){if(e.def.boss)dur*=.3;e.frozen=Math.max(e.frozen,dur);e.chill=0;
  if(!e.iceMesh){e.iceMesh=new THREE.Mesh(G.iceBlock,MAT.iceSolid);const s=e.def.r*1.35;e.iceMesh.scale.set(s,e.def.h*.62,s);scene.add(e.iceMesh)}
  e.iceMesh.visible=true;e.iceMesh.position.set(e.pos.x,e.pos.y+e.def.h*.5,e.pos.z);e.iceMesh.rotation.y=Math.random()*TAU;frostBurst(eCenter(e),16)}
function shatter(pos,n,scale=1){sfx.shatter();frostBurst(pos,20);for(let k=0;k<n;k++){const m=new THREE.Mesh(G.shard,MAT.ice);const s=rand(.12,.3)*scale;m.scale.set(s,s*2,s);m.position.copy(pos);
  const v=V3(rand(-1,1),rand(.5,1.6),rand(-1,1)).multiplyScalar(rand(4,9));const spin=V3(rand(-9,9),rand(-9,9),rand(-9,9));
  addFx(m,rand(.8,1.3),(f,k)=>{const dt=1/60;v.y-=22*dt;m.position.addScaledVector(v,dt);if(m.position.y<.1){m.position.y=.1;v.multiplyScalar(.4);v.y=Math.abs(v.y)}m.rotation.x+=spin.x*dt;m.rotation.y+=spin.y*dt;if(k>.7)m.scale.multiplyScalar(.93)})}}
function root(e,dur,dps){if(e.def.boss)dur*=.35;e.rooted=Math.max(e.rooted,dur);e.rootDps=dps;
  if(!e.chains){const g=new THREE.Group();const c=V3(0,e.def.h*.5,0);
    for(let k=0;k<4;k++){const a=k*TAU/4+rand(-.3,.3),r=e.def.r*2.4+1;const a0=V3(Math.sin(a)*r,0,Math.cos(a)*r);const n=8;
      for(let i=0;i<n;i++){const l=new THREE.Mesh(G.link,MAT.chain);const p=V3().lerpVectors(a0,c,i/(n-1));l.position.copy(p);l.lookAt(c.x===p.x&&c.z===p.z?V3(c.x+.01,c.y,c.z):c);l.rotateX(Math.PI/2);if(i%2)l.rotateY(Math.PI/2);l.scale.set(1,1.7,1);g.add(l)}}
    const r=decal(runeTex,0xa060ff,e.def.r*5+3);r.position.y=.12;g.add(r);g.userData.rune=r;e.chains=g;scene.add(g)}
  e.chains.position.set(e.pos.x,e.pos.y,e.pos.z);SP.emit(eCenter(e),{n:20,c0:0xd0a0ff,c1:0x4a1080,speed:5,life:.6,s0:.6,s1:.2})}
function burn(e,dur,dps){e.burn=Math.max(e.burn,dur);e.burnDps=Math.max(e.burnDps||0,dps)}

const CAST={
  bolt(t){const o=orbPos();makeProj({from:o,dir:aimDir(o,t),speed:44,dmg:22*power(),color:0xc9a6ff,size:.38,homing:t?8:0,target:t,life:1.5,
    trail:p=>SP.emit(p.pos,{c0:0xe0c8ff,c1:0x6a3ad0,s0:.5,s1:.1,life:.3,speed:.5})});sfx.bolt()},
  fire(t){const o=orbPos();makeProj({from:o,dir:aimDir(o,t),speed:30,dmg:46*power(),color:0xff7a2e,size:.75,homing:t?4:0,target:t,aoe:5,splash:.6,life:1.8,
    trail:p=>{FL.emit(p.pos,{n:4,c0:0xfff0b0,c1:0xff2a00,s0:1.5,s1:.3,life:.4,speed:1.2,up:1.2,jitter:.15});if(Math.random()<.3)SM.emit(p.pos,{c0:0x3a3038,c1:0x100c10,s0:.8,s1:3,life:1.2,up:1.5,a:.45})},
    onAoe:(e)=>burn(e,3,10*power())});sfx.fire()},
  lance(t){const o=orbPos();const m=new THREE.Mesh(G.shard,MAT.ice);m.scale.set(.2,.2,1.3);const dir=aimDir(o,t);
    const p=makeProj({from:o,dir,speed:52,dmg:36*power(),color:0x8fe3ff,size:.3,mesh:m,pierce:3,life:1.2,homing:t?5:0,target:t,
      trail:p=>{SP.emit(p.pos,{n:2,c0:0xffffff,c1:0x5fc8ff,s0:.4,s1:.1,life:.35,speed:.8});if(Math.random()<.4)SM.emit(p.pos,{c0:0xd8f4ff,c1:0x9fd8ff,s0:.6,s1:1.8,life:.6,a:.3})},
      onHit:e=>{e.chill=(e.chill||0)+1;e.chillT=4;e.slow=Math.max(e.slow,2);if(e.chill>=3)freeze(e,2.2);shatter(eCenter(e),3,.7)}});
    m.lookAt(o.clone().add(dir));sfx.ice()},
  frost(){const c=P.pos.clone();sfx.frost();flash(c,0x8fe3ff,6);groundMark(frostTex,c,0xbff2ff,26,3.2,true,.9);ring(c,0xbff2ff,1,13,.5);
    const rings=[[3.2,7],[6.6,11],[10,15]];rings.forEach(([r,n],ri)=>after(ri*.09,()=>{for(let k=0;k<n;k++){const a=k*TAU/n+rand(-.15,.15),rr=r+rand(-.6,.6);
      const m=new THREE.Mesh(G.spike,MAT.ice);m.position.set(c.x+Math.sin(a)*rr,groundAt(c.x+Math.sin(a)*rr,c.z+Math.cos(a)*rr),c.z+Math.cos(a)*rr);const sy=rand(.7,1.5)*(1.1-ri*.15),sx=rand(.6,1.1);m.rotation.set(Math.cos(a)*.4*rand(.5,1.2),rand(0,TAU),-Math.sin(a)*.4*rand(.5,1.2));m.castShadow=true;
      addFx(m,rand(2,2.6),(f,k)=>{const t=f.t,d=f.dur;const s=t<.14?t/.14:t>d-.3?Math.max(0,(d-t)/.3):1;m.scale.set(sx*(t<.14?.6+.4*s:1),sy*s,sx*(t<.14?.6+.4*s:1))},()=>{if(Math.random()<.35)shatter(m.position.clone().setY(m.position.y+.8),3,.8)});
      SP.emit(m.position.clone().setY(m.position.y+.4),{n:3,c0:0xffffff,c1:0x7fd8ff,speed:4,up:3,grav:10,life:.6,s0:.4,s1:.1})}}));
    for(const e of enemies){if(e.dead)continue;if(Math.hypot(e.pos.x-c.x,e.pos.z-c.z)<13){damageEnemy(e,48*power(),'#bff2ff');if(!e.dead)freeze(e,3.2)}}},
  chains(){const c=P.pos.clone();sfx.chains();runeFlash(c,0xa060ff,30,1.2);flash(c,0x9040ff,5);
    const list=enemies.filter(e=>!e.dead&&e.pos.distanceTo(c)<17).sort((a,b)=>a.pos.distanceTo(c)-b.pos.distanceTo(c)).slice(0,9);
    list.forEach((e,i)=>after(i*.05,()=>{if(!e.dead){root(e,4.2,16*power());damageEnemy(e,20*power(),'#d0a0ff')}}));if(!list.length)toast('No enemy close enough to bind')},
  chain(t){let cur=t,from=orbPos(),dmg=60*power();const hit=new Set();
    for(let hop=0;hop<6&&cur;hop++){hit.add(cur);const c=eCenter(cur);lightning(from,c,0xe6f0ff);lightning(from,c,0x8fa8ff);damageEnemy(cur,dmg,'#f1f5ff');if(!cur.dead)cur.stun=Math.max(cur.stun,cur.def.boss?.25:.8);from=c;dmg*=.86;
      let nx=null,nd=14;for(const e of enemies){if(e.dead||hit.has(e))continue;const d=e.pos.distanceTo(cur.pos);if(d<nd){nd=d;nx=e}}cur=nx}
    flash(P.pos,0xc9d6ff,5);sfx.chain()},
  inferno(){P.inferno=5.5;sfx.inferno();runeFlash(P.pos,0xff6a20,20,1);ring(P.pos,0xff8a3c,1,8,.4)},
  meteor(t){const at=t?t.pos.clone():P.pos.clone().add(V3(Math.sin(P.face),0,Math.cos(P.face)).multiplyScalar(13));at.y=groundAt(at.x,at.z);
    ring(at,0xff4b2b,10,10,1,true);runeFlash(at,0xff4b2b,20,1.1);const start=at.clone().add(V3(14,55,8));
    const rock=new THREE.Group();const core=new THREE.Mesh(G.shard,MAT.bossStone);core.scale.setScalar(1.6);rock.add(core);rock.add(glowSprite(0xff5a2a,12));
    addFx(rock,1,(f,k)=>{rock.position.lerpVectors(start,at,k*k);core.rotation.x+=.2;FL.emit(rock.position,{n:7,c0:0xfff0c0,c1:0xff2000,s0:3,s1:.6,life:.6,speed:1.5,jitter:.6});SM.emit(rock.position,{n:2,c0:0x3a3038,c1:0x0a080a,s0:2,s1:6,life:1.6,a:.5})},
      ()=>{explode(at,10,180*power(),0xff5a2a,true,null,e=>burn(e,4,18*power()));groundMark(scorchTex,at,0xffffff,18,8,false,.9);P.shake=1.2});sfx.meteor()},
  void(t){const at=t?t.pos.clone():P.pos.clone().add(V3(Math.sin(P.face),0,Math.cos(P.face)).multiplyScalar(12));at.y=groundAt(at.x,at.z);sfx.void();
    const g=new THREE.Group();g.position.set(at.x,at.y+2.4,at.z);const core=new THREE.Mesh(G.sphere,MAT.black);core.scale.setScalar(1.3);g.add(core);
    const rimM=new THREE.MeshBasicMaterial({color:0xb080ff,transparent:true,blending:THREE.AdditiveBlending,side:THREE.DoubleSide,depthWrite:false});
    const disk=new THREE.Mesh(new THREE.RingGeometry(1.5,3.6,48),rimM);disk.rotation.x=-Math.PI/2+.35;g.add(disk);g.add(glowSprite(0x7a40ff,9,.8));
    const rune=decal(runeTex,0x8040ff,26);rune.position.set(at.x,at.y+.15,at.z);scene.add(rune);
    let tick=0;
    addFx(g,4.2,(f,k)=>{const dt=1/60;disk.rotation.z+=.15;rune.rotation.z-=.02;core.scale.setScalar(1.3+Math.sin(f.t*20)*.1);rimM.opacity=k<.1?k*10:1;
      for(let s=0;s<5;s++){const a=rand(0,TAU),r=rand(6,13);const p=V3(at.x+Math.sin(a)*r,at.y+rand(.5,4),at.z+Math.cos(a)*r);const v=V3(at.x-p.x,at.y+2.4-p.y,at.z-p.z).multiplyScalar(1.6);SP.emit(p,{c0:0xd8b8ff,c1:0x3a10a0,s0:.5,s1:.15,life:.6,dir:v,dirJ:1})}
      tick-=dt;const doTick=tick<=0;if(doTick)tick=.5;
      for(const e of enemies){if(e.dead||e.frozen>0)continue;const dx=at.x-e.pos.x,dz=at.z-e.pos.z,d=Math.hypot(dx,dz);if(d<15&&d>.5){const pull=(9*(1-d/15)+2.5)*(e.def.boss?.2:1)*dt;e.pos.x+=dx/d*Math.min(pull,d);e.pos.z+=dz/d*Math.min(pull,d)}
        if(doTick&&d<15)damageEnemy(e,14*power(),'#b080ff')}},
      ()=>{scene.remove(rune);disposeObj(rune);explode(at,9,150*power(),0x9d6bff,true);SP.emit(V3(at.x,at.y+2,at.z),{n:80,c0:0xffffff,c1:0x6a20ff,speed:16,life:.7,s0:.8,s1:.1})})}
};
function renderBar(){for(let k=0;k<spellEls.length;k++){const si=P.bar[k];const el=spellEls[k];const s=si!=null&&si>=0?SPELLS[si]:null;el.dataset.si=s?si:'';el.style.setProperty('--c',s?s.color:'#6a6478');el.querySelector('svg').innerHTML=s?ICON[s.id]:'';el.setAttribute('aria-label',s?s.name:'Empty slot');el.title=s?s.name:'Empty slot';el.classList.toggle('empty',!s)}}
function castSlot(k){const si=P.bar[k];if(si==null||si<0){toast('Empty slot. Open your spellbook (K) to fill it.');return}tryCast(si)}
function tryCast(i){const s=SPELLS[i];if(!s||!started||paused||!P.alive)return;if(!P._chgCast)P.chgMulT=0;
  if(!spellKnown(s)){toast(s.id==='limit'?'Defeat Kaen to learn Limit Breaker':s.teach?`${s.name} is taught by Master Bilel`:`${s.name} unlocks at level ${s.lvl}`);return}if(s.id==='limit'){if(P.lbT>0)return;if(P.cds[i]>0){toast(`Limit Breaker recharges in ${Math.ceil(P.cds[i])}s`);return}if(P.hp>maxHP()*.15){toast('Limit Breaker only answers at 15% health or less');return}}
  if(MODE==='open'&&OWS.wandLost>0){toast(isTouch?'No wand! Catch the Chat Noir and hit him twice.':'No wand! Catch the Chat Noir and punch him twice (R).');return}
  if(P.cds[i]>0)return;
  if(P.mp<s.cost){const m=$('mpBar');m.classList.remove('low');void m.offsetWidth;m.classList.add('low');return}
  const t=findTarget(s.id==='chain'?30:50)||(MODE==='open'?owNpcTarget(s.id==='chain'?30:50):null);
  if(s.needs&&!t){toast('No enemy in range');return}
  P.mp-=s.cost;P.cds[i]=s.cd;if(t)faceTo(t.pos);P.castAnim=.35;P.castKind=CAST_KIND[s.id]||'conj';if(i>0){W.aura.userData.t=.6}if(!(t&&t.npc&&s.id==='chain'))CAST[s.id](t);if(MODE==='open')owCast(i,t);if(bossRef&&MODE!=='open'){epicCast(s,i);SFXDUCK=1}}
function epicCast(s,i){if(!AC||muted)return;const big=s.cd>=6;const k=(P.chgMulT>0?Math.min(1.6,P.chgMul):1)*1.2;tone(big?48:62,big?.9:.45,'sine',(big?.34:.22)*k,.55,0,null,.5);tone(big?96:124,big?.6:.3,'triangle',(big?.14:.09)*k,.6,0,null,.6);noise(big?.7:.35,(big?.2:.12)*k,big?1800:3200,'lowpass',null,{wet:.7});if(big)noise(1.1,.08,5200,'bandpass',null,{delay:.05,q:.7,wet:.9})}

function explode(pos,r,dmg,color,big,exclude,onHit){if(color===0xff5a2a||color===0xff7a2e)fireBurst(V3(pos.x,pos.y+.8,pos.z),r,big);
  else{SP.emit(V3(pos.x,pos.y+.8,pos.z),{n:big?120:50,c0:0xffffff,c1:color,speed:big?16:9,life:.8,grav:5,s0:.7,s1:.15})}
  ring(pos,color,.5,r*1.1,.45);flash(pos,color,big?10:5);SFXDUCK=1;big?sfx.boom():noise(.35,.14,1400);
  for(const e of enemies){if(e.dead||e===exclude)continue;const d=Math.hypot(e.pos.x-pos.x,e.pos.z-pos.z);if(d<r+e.def.r){damageEnemy(e,dmg*(1-.4*Math.min(1,d/r)),'#ffb070');if(onHit&&!e.dead)onHit(e)}}}

/* ---------- creature builders ---------- */
function part(geo,mat,sx,sy,sz,x,y,z,parent){const m=new THREE.Mesh(geo,mat);m.scale.set(sx,sy,sz);m.position.set(x,y,z);if(parent)parent.add(m);return m}
function teethRow(parent,n,cx,y,z,w,down,mat=MAT.tooth,size=1){for(let i=0;i<n;i++){const t=(i/(n-1)-.5);const m=new THREE.Mesh(G.tooth,mat);m.scale.setScalar(size*(1-Math.abs(t)*.6));
  m.position.set(cx+t*w,y,z-Math.abs(t)*w*.5);m.rotation.x=down?Math.PI:0;parent.add(m)}}
function buildPig(){const g=new THREE.Group(),body=new THREE.Group();g.add(body);const M=MAT.pig;
  part(G.sphere,M,.95,1,.85,0,1.05,0,body);part(G.sphere,M,.85,.62,.72,0,1.62,.08,body);
  const head=new THREE.Group();head.position.set(0,2.12,.28);body.add(head);
  part(G.sphere,M,.52,.48,.48,0,0,0,head);part(G.sphere,M,.46,.14,.2,0,.2,.3,head);
  const sn=part(G.cyl,M,.19,.14,.17,0,-.06,.5,head);sn.rotation.x=Math.PI/2;
  for(const s of[-1,1]){part(G.sphereLo,MAT.black,.04,.05,.02,s*.07,-.06,.575,head);const e=part(G.sphereLo,MAT.eyeRed,.1,.09,.06,s*.2,.13,.4,head);const gl=glowSprite(0xff2030,.9,.9);e.add(gl);
    const h=new THREE.Mesh(G.hornCurve,MAT.pigDark);h.scale.setScalar(.55);h.position.set(s*.34,.3,-.05);h.rotation.set(-.3,0,-s*1.1);head.add(h)}
  part(G.sphere,MAT.black,.3,.06,.12,0,-.26,.38,head);teethRow(head,9,0,-.22,.46,.5,true,MAT.tooth,.9);teethRow(head,9,0,-.3,.45,.46,false,MAT.tooth,.8);
  const arms=[];for(const s of[-1,1]){const sh=new THREE.Group();sh.position.set(s*.72,1.72,0);body.add(sh);const up=part(G.sphere,MAT.pigDark,.2,.42,.22,0,-.3,0,sh);
    const fo=new THREE.Group();fo.position.set(0,-.7,0);sh.add(fo);part(G.sphere,MAT.pigDark,.17,.36,.18,0,-.3,.05,fo);
    for(let k=0;k<3;k++){const c=part(G.cone,MAT.claw,.04,.2,.04,(k-1)*.07,-.7,.12,fo);c.rotation.x=Math.PI*.85}sh.rotation.z=s*.5;arms.push(sh)}
  const legs=[];for(const s of[-1,1]){const l=new THREE.Group();l.position.set(s*.42,.55,0);body.add(l);part(G.sphere,MAT.pigDark,.24,.4,.26,0,-.15,0,l);const f=part(G.sphere,MAT.pigDark,.2,.1,.3,0,-.52,.12,l);
    for(let k=0;k<3;k++){const c=part(G.cone,MAT.claw,.035,.15,.035,(k-1)*.08,-.55,.38,l);c.rotation.x=Math.PI/2}legs.push(l)}
  return{g,body,head,arms,legs}}
function buildSpider(){const g=new THREE.Group(),body=new THREE.Group();body.position.y=.62;g.add(body);
  const ceph=part(G.sphere,MAT.spider,.55,.34,.62,0,0,.35,body);const abd=part(G.sphere,MAT.spider,.78,.62,.9,0,.26,-.75,body);
  if(FUR_N.value){furShells(ceph,{map:TX.spider.map,len:.08,rep:10,droop:.2,shells:Math.min(5,FUR_N.value),rim:0x6a3a10});furShells(abd,{map:TX.spider.map,len:.12,rep:10,droop:.3,shells:Math.min(5,FUR_N.value),rim:0x8a4a18})}
  for(let k=0;k<8;k++){const e=part(G.sphereLo,k<2?MAT.eyeRed:MAT.black,.05,.05,.05,((k%4)-1.5)*.09,.28+(k<4?0:.05),.85-(k<4?0:.05),body)}
  for(const s of[-1,1]){const f=part(G.cone,MAT.claw,.07,.3,.07,s*.12,-.18,.9,body);f.rotation.x=Math.PI*.9;part(G.sphere,MAT.spider,.1,.12,.14,s*.14,-.02,.9,body)}
  const legs=[];const ang=[.55,.95,1.45,2.0];
  for(const s of[-1,1])for(let k=0;k<4;k++){const hip=new THREE.Group();hip.position.set(s*.35,0,.35-k*.05);body.add(hip);hip.rotation.y=s>0?-(Math.PI/2-ang[k]):(Math.PI/2-ang[k]);
    const F=new THREE.Group();F.rotation.z=s*.6;hip.add(F);const fm=new THREE.Mesh(G.leg1,MAT.spider);fm.scale.set(.75,1.2,.75);fm.rotation.z=-s*Math.PI/2;F.add(fm);
    const K=new THREE.Group();K.position.x=s*1.25;K.rotation.z=-s*1.95;F.add(K);part(G.sphereLo,MAT.spiderBand,.12,.12,.12,0,0,0,K);
    const tb=new THREE.Mesh(G.leg1,MAT.spider);tb.scale.set(.65,1.35,.65);tb.rotation.z=-s*Math.PI/2;K.add(tb);part(G.sphereLo,MAT.claw,.09,.09,.13,s*1.36,0,0,K);
    legs.push({hip,F,K,s,ph:k*1.6+(s>0?0:Math.PI),base:hip.rotation.y})}
  g.scale.setScalar(1.05);return{g,body,legs,abd}}
function buildDemon(){const g=new THREE.Group(),body=new THREE.Group();body.position.y=1.7;g.add(body);
  const wheel=new THREE.Group();body.add(wheel);
  for(let k=0;k<5;k++){const L=new THREE.Group();L.rotation.z=k*TAU/5;wheel.add(L);const th=part(G.leg1,MAT.demonSkin,2.2,1.1,2.2,0,.35,0,L);const kn=new THREE.Group();kn.position.y=1.45;kn.rotation.z=.9;L.add(kn);
    part(G.leg1,MAT.demonSkin,1.5,1,1.5,0,0,0,kn);part(G.cyl,MAT.mane,.13,.25,.13,0,.72,0,kn);part(G.cyl,MAT.hoof,.13,.16,.16,0,1.02,0,kn)}
  const mane=part(G.sphere,MAT.mane,.95,.95,.7,0,0,-.1,body);if(FUR_N.value)furShells(mane,{map:TX.mane.map,len:.4,rep:8,droop:.25,shells:FUR_N.value,rim:0x8a6030});
  for(let k=0;k<14;k++){const a=k*TAU/14;const c=part(G.cone,MAT.mane,.16,.9,.16,Math.cos(a)*.95,Math.sin(a)*.95,-.1,body);c.rotation.z=a-Math.PI/2}
  const face=new THREE.Group();face.position.z=.45;body.add(face);part(G.sphere,MAT.demonSkin,.52,.55,.4,0,0,0,face);
  part(G.sphere,MAT.demonSkin,.4,.1,.15,0,.2,.28,face);const nose=part(G.sphere,MAT.demonSkin,.12,.16,.14,0,.02,.38,face);
  for(const s of[-1,1]){part(G.sphereLo,MAT.white,.09,.08,.05,s*.17,.1,.33,face);part(G.sphereLo,MAT.black,.04,.04,.03,s*.17,.1,.37,face)}
  part(G.sphere,MAT.black,.28,.07,.1,0,-.2,.32,face);teethRow(face,7,0,-.15,.37,.4,true,MAT.tooth,.8);
  const tongue=part(G.sphere,std({color:0xc03040,roughness:.3}),.08,.16,.05,.05,-.33,.38,face);
  return{g,body,wheel,face,tongue}}
function buildKitsune(){const g=new THREE.Group(),body=new THREE.Group();g.add(body);
  body.add(new THREE.Mesh(lathe([[.001,0],[.95,.02],[.82,.5],[.58,1.3],[.42,1.95],[.36,2.25],[.001,2.3]],28),MAT.robeSilver));
  const obi=new THREE.Mesh(new THREE.TorusGeometry(.46,.1,8,28),std({color:0x9a1020,roughness:.5}));obi.rotation.x=Math.PI/2;obi.position.y=1.7;body.add(obi);
  const stole=new THREE.Mesh(new THREE.TorusGeometry(.5,.2,12,28),MAT.whiteFur);stole.rotation.x=Math.PI/2;stole.position.y=2.25;body.add(stole);if(FUR_N.value)furShells(stole,{map:TX.whitefur.map,len:.14,rep:6,shells:FUR_N.value,rim:0x8090c0});
  const head=new THREE.Group();head.position.y=2.7;head.scale.setScalar(1.3);body.add(head);
  part(G.sphere,MAT.skinPale,.22,.27,.23,0,0,0,head);part(G.sphereLo,std({color:0x6a1020,roughness:.3}),.06,.02,.02,0,-.14,.2,head);
  for(let k=0;k<3;k++)part(G.sphereLo,std({color:0x8a0a14}),.012,.012,.01,-.08+k*.08,-.03,.215,head);
  const hairCap=new THREE.Mesh(new THREE.SphereGeometry(.26,20,14,0,TAU,0,Math.PI*.6),MAT.hairBlack);hairCap.position.set(0,.03,-.03);head.add(hairCap);
  for(let k=0;k<16;k++){const a=Math.PI*.4+k/15*Math.PI*1.2;const x0=Math.sin(a)*.22,z0=Math.cos(a)*.22;const c=new THREE.CatmullRomCurve3([V3(x0,.05,z0),V3(x0*1.2,-.4,z0*1.1-.03),V3(x0*1.15,-1,z0-.08),V3(x0*1.1,-1.35,z0-.1)]);head.add(new THREE.Mesh(new THREE.TubeGeometry(c,8,.045,5,false),MAT.hairBlack))}
  const mask=new THREE.Group();mask.position.set(0,.14,.03);head.add(mask);
  part(G.sphere,MAT.mask,.27,.2,.27,0,.02,0,mask);const snout=part(G.sphere,MAT.mask,.16,.14,.34,0,-.06,.24,mask);
  part(G.sphereLo,std({color:0xb01020,roughness:.4}),.07,.05,.05,0,-.02,.57,mask);
  for(const s of[-1,1]){const ear=part(G.cone,MAT.mask,.12,.42,.08,s*.17,.36,-.02,mask);ear.rotation.z=-s*.25;const inner=part(G.cone,std({color:0x8a1020,roughness:.5}),.07,.3,.05,s*.17,.34,.02,mask);inner.rotation.z=-s*.25;
    part(G.sphereLo,MAT.black,.07,.05,.04,s*.1,.02,.24,mask);const ey=part(G.sphereLo,MAT.eyeRed,.03,.025,.02,s*.1,-.02,.23,mask);ey.add(glowSprite(0xff2030,.5,.9));
    const orn=new THREE.Mesh(new THREE.TorusKnotGeometry(.07,.018,40,6),MAT.gold);orn.position.set(s*.26,.05,.06);mask.add(orn);
    const tas=part(G.cyl,std({color:0x9a1020,roughness:.7}),.03,.28,.03,s*.3,-.4,.02,head)}
  teethRow(mask,8,0,-.2,.33,.26,true,MAT.tooth,1.3);
  const arms=[];for(const s of[-1,1]){const sl=new THREE.Group();sl.position.set(s*.38,2.2,0);body.add(sl);const m=new THREE.Mesh(lathe([[.08,0],[.14,.4],[.32,.95],[.001,.97]],14),MAT.robeSilver);m.rotation.z=Math.PI;sl.add(m);sl.rotation.z=s*.5;arms.push(sl)}
  const para=new THREE.Group();para.position.set(.55,2.6,.1);body.add(para);part(G.cyl,std({color:0x2a1010,roughness:.4}),.025,1.6,.025,0,.3,0,para);
  const canopy=new THREE.Mesh(lathe([[.001,.28],[.4,.22],[.9,.08],[1.3,-.12]],24),MAT.parasol);canopy.position.y=1.1;para.add(canopy);
  for(let k=0;k<12;k++){const r=part(G.cyl,std({color:0x3a0808}),.015,1.35,.015,Math.sin(k*TAU/12)*.65,1.2,Math.cos(k*TAU/12)*.65,para);r.rotation.set(Math.cos(k*TAU/12)*1.35,0,-Math.sin(k*TAU/12)*1.35)}
  para.rotation.z=-.25;
  const tails=[];for(let k=0;k<5;k++){const pv=new THREE.Group();pv.position.set(0,1.1,-.5);pv.rotation.set(-.3,(k-2)*.45,(k-2)*.22);body.add(pv);const t=new THREE.Mesh(G.tail,MAT.whiteFur);t.scale.setScalar(.7);t.rotation.x=-1.4;pv.add(t);
    if(FUR_N.value)furShells(t,{map:TX.whitefur.map,len:.25,rep:6,droop:.4,shells:FUR_N.value,rim:0xa0b0ff});tails.push(pv)}
  const wisps=[0,1,2,3].map(()=>{const s=glowSprite(0x6ad8ff,1.4,.95);body.add(s);return s});
  g.scale.setScalar(1.3);return{g,body,head,para,canopy,tails,wisps,arms}}
function buildFoxSpirit(){const g=new THREE.Group(),body=new THREE.Group();body.position.y=1.4;g.add(body);
  part(G.sphere,MAT.mask,.3,.24,.3,0,0,0,body);part(G.sphere,MAT.mask,.18,.15,.36,0,-.07,.28,body);
  for(const s of[-1,1]){const e=part(G.cone,MAT.mask,.12,.4,.08,s*.18,.34,0,body);e.rotation.z=-s*.25;const ey=part(G.sphereLo,MAT.eyeRed,.04,.03,.02,s*.1,0,.3,body);ey.add(glowSprite(0xff3040,.6))}
  body.add(glowSprite(0x80d8ff,5,.5));return{g,body}}
function buildBeast(){const g=new THREE.Group(),body=new THREE.Group();g.add(body);const R=MAT.redFur;
  const torso=part(G.sphere,R,1.35,1.15,2.1,0,2.5,-.2,body);if(FUR_N.value)furShells(torso,{map:TX.redfur.map,len:.4,rep:8,droop:.3,rim:0xff4010});
  const chest=part(G.sphere,R,1.3,1.35,1.1,0,2.8,1.3,body);if(FUR_N.value)furShells(chest,{map:TX.redfur.map,len:.45,rep:8,droop:.3,rim:0xff4010});
  for(let k=0;k<6;k++){const c=part(G.cone,MAT.bone,.25,.9,.35,0,3.6-k*.05,1.2-k*.7,body);c.rotation.x=-.5}
  for(const s of[-1,1]){const pd=part(new THREE.SphereGeometry(1,16,10,0,TAU,0,Math.PI/2),MAT.bone,.9,.7,.9,s*1.1,3.2,1.2,body);pd.rotation.z=-s*.5}
  const head=new THREE.Group();head.position.set(0,3.5,2.6);body.add(head);
  part(G.sphere,MAT.bone,.72,.62,.8,0,0,0,head);part(G.sphere,MAT.bone,.45,.35,.7,0,-.18,.65,head);
  const jaw=new THREE.Group();jaw.position.set(0,-.4,.3);head.add(jaw);part(G.sphere,R,.42,.2,.75,0,0,.3,jaw);teethRow(jaw,10,0,.12,.85,.55,false,MAT.tooth,1.8);
  teethRow(head,10,0,-.42,1.12,.6,true,MAT.tooth,2);part(G.sphere,std({color:0xb01818,roughness:.3}),.3,.1,.5,0,-.35,.6,head);
  for(const s of[-1,1]){part(G.sphereLo,MAT.black,.16,.13,.1,s*.3,.12,.62,head);const e=part(G.sphereLo,MAT.eyeRed,.09,.07,.05,s*.3,.1,.68,head);e.add(glowSprite(0xff2010,1.6));
    const h=new THREE.Mesh(G.hornCurve,MAT.bone);h.scale.setScalar(1.3);h.position.set(s*.45,.45,-.3);h.rotation.set(-1.1,0,-s*.5);head.add(h);
    const ear=part(G.cone,R,.25,.7,.15,s*.55,.6,-.4,head);ear.rotation.z=-s*.4}
  const neckFur=part(G.sphere,R,1,1,1,0,3.2,1.9,body);if(FUR_N.value)furShells(neckFur,{map:TX.redfur.map,len:.5,rep:8,droop:.35,rim:0xff5020});
  const legs=[];for(const[sx,sz]of[[-1,1.4],[1,1.4],[-1,-1.6],[1,-1.6]]){const L=new THREE.Group();L.position.set(sx*.95,2.2,sz);body.add(L);
    part(G.sphere,R,.7,1.1,.8,0,-.5,0,L);const lo=new THREE.Group();lo.position.y=-1.3;L.add(lo);part(G.sphere,R,.5,.75,.55,0,-.4,0,lo);
    if(sz>0){const br=part(G.cyl,MAT.bone,.42,.6,.42,0,-.35,0,lo)}part(G.sphere,R,.42,.2,.55,0,-.85,.15,lo);
    for(let k=0;k<4;k++){const c=part(G.cone,MAT.claw,.07,.35,.07,(k-1.5)*.18,-.9,.6,lo);c.rotation.x=Math.PI/2+.4}legs.push({L,lo,ph:(sx>0?0:Math.PI)+(sz>0?0:Math.PI/2)})}
  const tails=[];for(let k=0;k<9;k++){const pv=new THREE.Group();pv.position.set(0,2.8,-2.1);const a=(k-4)*.33;pv.rotation.set(-.9+Math.abs(k-4)*.1,a,a*.6);body.add(pv);
    const t=new THREE.Mesh(G.tail,R);t.scale.set(.85,1.25,.85);t.rotation.x=-1.2;pv.add(t);if(FUR_N.value)furShells(t,{map:TX.redfur.map,len:.3,rep:6,droop:.4,shells:Math.max(0,FUR_N.value-2),rim:0xff6020});tails.push({pv,ph:k*.7})}
  g.scale.setScalar(1.25);return{g,body,head,jaw,legs,tails}}
function buildGiant(){const g=new THREE.Group(),body=new THREE.Group();g.add(body);const M=MAT.giant;
  const legs=[];for(const s of[-1,1]){const L=new THREE.Group();L.position.set(s*1.3,5.2,0);body.add(L);part(G.sphere,M,.95,1.9,1,0,-1.4,0,L);
    const lo=new THREE.Group();lo.position.y=-2.9;L.add(lo);part(G.sphere,M,.8,1.5,.85,0,-1,0,lo);part(G.sphere,M,.9,.4,1.4,0,-2.1,.35,lo);legs.push({L,lo,s})}
  body.add(new THREE.Mesh(lathe([[.001,4.6],[1.7,4.8],[2.2,6],[2.6,7.6],[2.9,9.2],[2.2,10.2],[.9,10.6],[.001,10.7]],24),M));
  const loin=part(G.cyl,MAT.whiteFur,1.9,1.1,1.6,0,5.2,0,body);if(FUR_N.value)furShells(loin,{map:TX.whitefur.map,len:.3,rep:5,droop:.6,rim:0x80c0ff});
  for(const s of[-1,1])for(let k=0;k<4;k++){const sh=part(G.shard,MAT.ice,.35,1.2+k*.25,.35,s*(2.1+k*.18),10+k*.2,-.3+k*.1,body);sh.rotation.z=-s*(.3+k*.25);sh.rotation.x=-.3}
  const head=new THREE.Group();head.position.set(0,11.3,.4);body.add(head);part(G.sphere,M,1.15,1.2,1.1,0,0,0,head);part(G.sphere,M,1.1,.3,.5,0,.35,.75,head);
  for(const s of[-1,1]){const e=part(G.sphereLo,MAT.eyeIce,.16,.1,.08,s*.42,.15,.95,head);e.add(glowSprite(0x80e8ff,2.4));
    const h=new THREE.Mesh(G.bigHorn,MAT.horn);h.scale.setScalar(.55);h.position.set(s*.95,.6,-.1);h.rotation.set(-.4,s*.3,-s*1.5);head.add(h)}
  const beard=part(G.cone,MAT.whiteFur,.9,2.4,.6,0,-1.4,.6,head);beard.rotation.x=Math.PI+.2;if(FUR_N.value)furShells(beard,{map:TX.whitefur.map,len:.35,rep:5,droop:.8,rim:0x90d0ff});
  for(let k=0;k<7;k++){const ic=part(G.shard,MAT.ice,.08,.4,.08,(k-3)*.25,-2.4-Math.abs(k-3)*.1,.7,head)}
  const arms=[];for(const s of[-1,1]){const A=new THREE.Group();A.position.set(s*2.7,9.4,0);body.add(A);part(G.sphere,M,.9,2,.95,0,-1.6,0,A);
    const F=new THREE.Group();F.position.y=-3.3;A.add(F);part(G.sphere,M,.75,1.7,.8,0,-1.3,0,F);const fist=part(G.sphere,M,1.05,1,1.05,0,-3,0,F);
    for(let k=0;k<4;k++){const sh=part(G.shard,MAT.ice,.15,.45,.15,(k-1.5)*.35,-2.5,.8,F);sh.rotation.x=1}A.rotation.z=s*.18;arms.push({A,F,s})}
  const aura=glowSprite(0x80c8ff,26,.08);aura.position.y=7;body.add(aura);
  return{g,body,head,legs,arms}}

/* ---------- enemy types ---------- */
const ETYPES={
  pig:{name:'Demon pig',hp:55,speed:4.4,dmg:10,range:2.2,cd:1.2,xp:13,r:1,h:2.6,build:buildPig},
  spider:{name:'Tarantula',hp:42,speed:6.2,dmg:8,range:2.4,cd:1,xp:15,r:1.2,h:1.2,climb:true,ranged:.35,build:buildSpider},
  demon:{name:'Demon',hp:70,speed:6.8,dmg:12,range:2.6,cd:1.1,xp:24,r:1.3,h:3.2,build:buildDemon},
  fox:{name:'Fox spirit',hp:40,speed:6,dmg:9,range:14,cd:1.8,xp:5,r:.7,h:2,ghost:true,ranged:1,build:buildFoxSpirit},
  kitsune:{name:'Hakuko, the Masked Fox',boss:true,gate:5,lvl:6,hp:2300,speed:5,dmg:22,range:0,cd:9,xp:1200,r:1.3,h:4.2,ghost:true,build:buildKitsune},
  beast:{name:'The Crimson Nine-Tails',boss:true,gate:10,lvl:12,need:'kitsune',hp:4600,speed:6.2,dmg:30,range:4.6,cd:1.8,xp:3200,r:2.8,h:5.5,build:buildBeast},
  giant:{name:'Hrímgar, the Frost Giant',boss:true,gate:15,lvl:18,need:'beast',hp:9000,speed:3.4,dmg:36,range:6.5,cd:2.4,xp:0,r:3.2,h:13,final:true,build:buildGiant}
};
const BOSS_ORDER=['kitsune','beast','giant'];
const DIFFS={easy:{hp:.42,boss:.45,dmg:.22,spawn:.6,xp:1.4,tempo:.6,wind:.8,potion:.3,weaken:false,regenDelay:2,regen:.045,lvHi:1.1,lvLo:.8,label:'Easy: enemies hit very softly, bosses are slow, you heal fast, dying costs nothing.'},
  medium:{hp:.8,boss:.8,dmg:.7,spawn:.85,xp:1.15,tempo:.85,wind:.45,potion:.13,weaken:true,regenDelay:4,regen:.02,lvHi:1.6,lvLo:.45,label:'Medium: a fair fight. Die and you are weakened until you find the stones.'},
  hard:{hp:1.1,boss:1.15,dmg:1.1,spawn:1.1,xp:1,tempo:1,wind:.32,potion:.08,weaken:true,regenDelay:5.5,regen:.02,lvHi:1.6,lvLo:.45,label:'Hard: fast bosses, heavy hits, no mercy.'}};
let DIFF='medium';const DF=()=>DIFFS[DIFF];
const enemies=[];let bossRef=null,bossTimer=25,spawnT=0,peaceT=0;
function spawnEnemy(type,at,opts={}){const def=ETYPES[type];const AR=actRange();const lvl=def.lvl||opts.lvl||(def.boss?Math.max(P.level,def.gate||1):clamp(clamp(P.level+(Math.random()<.3?1:0)-(Math.random()<.3?1:0),AR[0],AR[1]),1,MAXLV));
  const m=def.build();at.y=groundAt(at.x,at.z);m.g.position.copy(at);scene.add(m.g);castAll(m.g);
  const elite=!def.boss&&type!=='fox'&&P.level>=5&&(opts.elite||Math.random()<.08);
  const hpMul=(def.boss?(1+.2*(lvl-1))*DF().boss:(1+.32*(lvl-1))*DF().hp)*(elite?3.5:1);
  const e={type,def,m,pos:m.g.position,lvl,elite,maxhp:Math.round(def.hp*hpMul),dmg:def.dmg*(1+.2*(lvl-1))*(elite?1.5:1),hpDiff:DIFF,xp:Math.round(def.xp*(1+.25*(lvl-1))*(elite?4:1)*DF().xp),cd:rand(.5,1.5),
    slow:0,frozen:0,rooted:0,stun:0,burn:0,chill:0,chillT:0,dotAcc:0,dotT:.5,busy:0,t:Math.random()*10,atk:0,flash:0,dead:false,strafe:Math.random()<.5?1:-1,moveK:0,
    ai:{a1:3,a2:5,a3:7,a4:9,tp:8,ang:Math.random()*TAU}};
  {const bd=e.dmg;Object.defineProperty(e,'dmg',{get(){return (e.dmgMul||1)*DF().dmg*(MODE==='open'?bd:bd*lvlDiffK(e.lvl-P.level,.045,.5,DF().lvHi))},set(v){}})}
  e.hp=e.maxhp;
  {const sh=decal(scorchTex,0xffffff,def.r*2.6,false,.5);sh.position.y=.06;m.g.add(sh)}
  if(elite){m.g.scale.multiplyScalar(1.3);const a=glowSprite(0xffc040,5,.55);a.position.y=1.4;m.g.add(a)}
  if(!def.boss){const bar=new THREE.Group();const bg=new THREE.Mesh(G.bar,MAT.barBg),fg=new THREE.Mesh(G.barFg,MAT.barFg);fg.position.x=-.7;bg.renderOrder=fg.renderOrder=10;bar.add(bg);bar.add(fg);bar.position.y=def.h+.4;bar.visible=false;m.g.add(bar);e.bar=bar;e.fg=fg}
  else{bossRef=e;const df=lvl-P.level;$('bossName').innerHTML=`${def.name} <span style="color:${df>=5?'#ff4050':df>=2?'#ff9a40':df<=-5?'#9a9a9a':'#f2d27a'}">· Lv ${lvl}</span>`}
  SP.emit(V3(at.x,at.y+1,at.z),{n:22,c0:def.boss?0xff3050:0xa070ff,c1:0x2a1050,speed:4,life:.8,s0:.6,s1:.1});if(!def.boss)runeFlash(at,0x8a60ff,4,.7);
  enemies.push(e);return e}
function pickType(){const bq=BQ.active()?BQ.q:-1;const pool=[['pig',bq===0?14:5]];if(P.level>=2)pool.push(['spider',bq===1?14:4]);if(beaten.has('beast'))pool.push(['demon',5]);if(beaten.has('catdemon'))pool.push(['kitten',3]);if(beaten.has('slug'))pool.push(['slugling',3]);let tot=0;for(const p of pool)tot+=p[1];let r=Math.random()*tot;for(const p of pool){if((r-=p[1])<0)return p[0]}return'pig'}
function nextBoss(){if(MODE==='open')return null;for(const b of BOSS_ORDER){if(beaten.has(b))continue;const d=ETYPES[b];if(P.level>=d.gate&&(!d.need||beaten.has(d.need))&&(!d.needBQ||BQ.done))return b;return null}return null}
/* ---------- dormant bosses: they wait, you walk up to them ---------- */
function bossDormant(e){e.dormant=true;e.invuln=true;if(bossRef===e)bossRef=null;$('boss').classList.add('hidden');
  try{const g=new THREE.Mesh(new THREE.CylinderGeometry(.7,1.4,70,12,1,true),new THREE.MeshBasicMaterial({color:0xffc870,transparent:true,opacity:.18,depthWrite:false,side:THREE.DoubleSide,blending:THREE.AdditiveBlending}));g.position.set(e.pos.x,e.pos.y+35,e.pos.z);scene.add(g);e.beacon=g}catch(x){}
  if(typeof toast==='function')toast(e.def.name.split(',')[0]+' has your scent. It is coming for you.','Something approaches',true)}
function bossWake(e,d,dt){if(e.beacon){e.beacon.position.set(e.pos.x,e.pos.y+35,e.pos.z);e.beacon.material.opacity=.14+Math.sin(e.t*3)*.05}
  const dx=P.pos.x-e.pos.x,dz=P.pos.z-e.pos.z;e.m.g.rotation.y=lerpAngle(e.m.g.rotation.y,Math.atan2(dx,dz),Math.min(1,dt*3));
  if(d<20&&P.alive&&!CS.active&&Math.abs(P.pos.y-e.pos.y)<14){e.dormant=false;e.invuln=false;if(e.beacon){scene.remove(e.beacon);e.beacon=null}bossRef=e;e.aggro=true;bossIntro(e);return true}
  if(d>140){teleportNear(e,55,75);return true}
  /* stalk the witch: walk (not run) straight at her, around buildings */
  let mv=0;if(P.alive&&!CS.active&&d>1){const sp=Math.max(2.6,e.def.speed*.6)*dt;e.pos.x+=dx/d*sp;e.pos.z+=dz/d*sp;mv=.55;
    if(e.def.climb)collide(e.pos,e.def.r,false,true);else collide(e.pos,e.def.r,e.def.ghost,false);const gh=groundAt(e.pos.x,e.pos.z);e.pos.y=lerp(e.pos.y,gh,Math.min(1,dt*8))}
  e.moveK=lerp(e.moveK||0,mv,Math.min(1,dt*6));try{animateEnemy(e,dt,e.moveK)}catch(x){}
  return true}
/* ---------- aggro: monsters only come for you once they see you ---------- */
function sightR(){return Math.min(40,10+P.level*.45)}
function aggroOn(e){e.aggro=true;for(const o of enemies)if(o!==e&&!o.dead&&!o.aggro&&!o.def.boss&&Math.hypot(o.pos.x-e.pos.x,o.pos.z-e.pos.z)<12)o.aggro=true}
function aggroCheck(e,d,dt){if(e.quest||MODE==='open')return true;const R=sightR();
  if(e.aggro){if(d>R*2.2){e.aggro=false;e.home={x:e.pos.x,z:e.pos.z};return false}return true}
  if(d<R&&Math.abs(P.pos.y-e.pos.y)<R*.6){aggroOn(e);return true}return false}
function removeEnemy(e){e.dead=true;scene.remove(e.m.g);if(e.beacon){scene.remove(e.beacon);e.beacon=null}if(e.iceMesh)scene.remove(e.iceMesh);if(e.chains)scene.remove(e.chains);if(e===bossRef){bossRef=null;$('boss').classList.add('hidden')}}
function damageEnemy(e,amt,color,dot){if(e.dead||e.invuln)return;if(!e.aggro)aggroOn(e);if(MODE!=='open')amt*=lvlDiffK(P.level-e.lvl,.045,DF().lvLo,1.6);if(e.frozen>0)amt*=1.3;if(e.guarded){amt*=.25;color='#b090ff'}amt=Math.max(1,Math.round(amt*(dot?1:rand(.9,1.1))));e.hp-=amt;if(e.hp<=0&&e.type==='illusion'&&!e.ai.lbDone)e.hp=Math.round(e.maxhp*.1);if(!dot)e.flash=.12;
  floatText(eCenter(e).add(V3(0,.8,0)),amt,color,amt>=200);
  if(!dot&&!e.def.boss&&!e.rooted){const dx=e.pos.x-P.pos.x,dz=e.pos.z-P.pos.z,d=Math.hypot(dx,dz)||1,k=Math.min(1.4,amt/45);e.pos.x+=dx/d*k;e.pos.z+=dz/d*k;e.wind=0}
  if(e.hpFloor&&e.hp<e.maxhp*e.hpFloor)e.hp=Math.ceil(e.maxhp*e.hpFloor);if(e.hp<=0){if(e.def.boss||e.elite)hitStop=.12;killEnemy(e)}}
function killEnemy(e){const c=eCenter(e);STATS.kills++;bqKill(e);comboKill(e);if(e.def.boss)vib([60,40,120]);if(e.quest&&MODE==='open')questKill(e);
  if(e.def.boss){fireBurst(c,8,true);SP.emit(c,{n:160,c0:0xffffff,c1:e.type==='giant'?0x60c0ff:0xff3050,speed:18,life:1.2,s0:.8,s1:.1,grav:4});flash(c,0xff6070,12);P.shake=1.4;sfx.boom();
    beaten.add(e.type);CLEARED.add(e.type);bossTimer=30;peaceT=e.type==='queen'?rand(55,70):rand(130,170);if(MODE!=='open'&&!e.def.final&&e.type!=='slug')after(12,()=>{if(!bossRef)toast(`Catch your breath and farm some monsters. The next demon comes in about ${e.type==='queen'?'a minute':'2 or 3 minutes'}.`,'Calm')});for(let k=0;k<3;k++)dropPotion(V3(e.pos.x+rand(-3,3),0,e.pos.z+rand(-3,3)));
    for(const o of enemies)if(o.type==='fox'&&!o.dead)removeEnemy(o);
    removeEnemy(e);if(e.xp)gainXP(e.xp);writeSave();after(1.2,()=>bossOutro(e.type,c));return}
  SP.emit(c,{n:35,c0:e.type==='spider'?0xc08a50:e.type==='demon'?0xffc080:0xff7080,c1:0x201030,speed:6,life:.9,grav:3,s0:.6,s1:.1});
  if(e.type==='pig')SP.emit(c,{n:20,c0:0xc01020,c1:0x300008,speed:5,grav:12,life:.8,s0:.5,s1:.2});
  if(e.frozen>0)shatter(c,8,e.def.r);
  removeEnemy(e);sfx.kill();if(MODE==='open'){const eu=2+((Math.random()*4)|0);OWS.euro+=eu;floatText(c.clone().add(V3(0,2.2,0)),`+€${eu}`,'#f2d060')}if(e.xp){gainXP(e.xp);floatText(c.clone().add(V3(0,1.6,0)),`+${e.xp} xp`,'#f2a541')}
  if(Math.random()<(e.elite?.7:DF().potion))dropPotion(e.pos)}

/* ---------- enemy attacks ---------- */
const eProjs=[];
function enemyOrb(from,dir,speed,dmg,color,size=.3,o={}){const s=glowSprite(color,size*8);const c=new THREE.Mesh(G.sphereLo,MAT.white);c.scale.setScalar(size*.7);s.add(c);s.position.copy(from);scene.add(s);
  const d=dir.clone();if(!o.keepY)d.y=0;d.normalize();eProjs.push(Object.assign({s,pos:s.position,vel:d.multiplyScalar(speed),speed,dmg,life:3.4,color},o))}
function aimAtPlayer(from){return V3(P.pos.x,P.pos.y+1.2,P.pos.z).sub(from)}
function playerIn(pos,r,dy=3){return Math.hypot(P.pos.x-pos.x,P.pos.z-pos.z)<r&&Math.abs(P.pos.y-(pos.y||0))<dy}
function telegraph(pos,r,dur,color,onEnd){const g=new THREE.Group();g.position.set(pos.x,(pos.y||0)+.12,pos.z);
  const edge=new THREE.Mesh(new THREE.RingGeometry(r*.94,r,48),new THREE.MeshBasicMaterial({color,transparent:true,depthWrite:false,blending:THREE.AdditiveBlending,side:THREE.DoubleSide}));edge.rotation.x=-Math.PI/2;g.add(edge);
  const fill=new THREE.Mesh(new THREE.CircleGeometry(r,48),new THREE.MeshBasicMaterial({color,transparent:true,opacity:.28,depthWrite:false,blending:THREE.AdditiveBlending,side:THREE.DoubleSide}));fill.rotation.x=-Math.PI/2;g.add(fill);
  const rn=decal(runeTex,color,r*2,true,.5);g.add(rn);sfx.warn();
  addFx(g,dur,(f,k)=>{fill.scale.setScalar(Math.max(.01,k));edge.material.opacity=.6+.4*Math.sin(f.t*18);rn.rotation.z=f.t},onEnd)}
function lineTelegraph(from,to,w,dur,color,onEnd){const d=V3(to.x-from.x,0,to.z-from.z);const L=d.length();const g=new THREE.Group();g.position.set((from.x+to.x)/2,(from.y||0)+.13,(from.z+to.z)/2);g.rotation.y=Math.atan2(d.x,d.z);
  const mat=new THREE.MeshBasicMaterial({color,transparent:true,opacity:.3,depthWrite:false,blending:THREE.AdditiveBlending,side:THREE.DoubleSide});const m=new THREE.Mesh(new THREE.PlaneGeometry(w,L),mat);m.rotation.x=-Math.PI/2;g.add(m);sfx.warn();
  addFx(g,dur,(f,k)=>{mat.opacity=.2+.3*k+.1*Math.sin(f.t*20)},onEnd)}
function coneTelegraph(o,dir,range,half,dur,color,onEnd){const g=new THREE.Group();g.position.set(o.x,(o.y||0)+.12,o.z);g.rotation.y=Math.atan2(-dir.z,dir.x);
  const mat=new THREE.MeshBasicMaterial({color,transparent:true,opacity:.3,depthWrite:false,blending:THREE.AdditiveBlending,side:THREE.DoubleSide});
  const m=new THREE.Mesh(new THREE.CircleGeometry(range,32,-half,half*2),mat);m.rotation.x=-Math.PI/2;g.add(m);sfx.warn();
  addFx(g,dur,(f,k)=>{mat.opacity=.2+.25*k+.1*Math.sin(f.t*20)},onEnd)}
function inCone(p,o,dir,range,half){const vx=p.x-o.x,vz=p.z-o.z,d=Math.hypot(vx,vz);if(d>range||Math.abs(p.y-(o.y||0))>5)return false;if(d<1.5)return true;return(vx*dir.x+vz*dir.z)/d>=Math.cos(half)}
function distToSeg(p,a,b){const abx=b.x-a.x,abz=b.z-a.z,t=clamp(((p.x-a.x)*abx+(p.z-a.z)*abz)/(abx*abx+abz*abz||1),0,1);return Math.hypot(p.x-(a.x+abx*t),p.z-(a.z+abz*t))}
function enemyMeteor(pos,r,dur,dmg,color){pos.y=groundAt(pos.x,pos.z);telegraph(pos,r,dur,0xff3050,()=>{fireBurst(V3(pos.x,pos.y+.8,pos.z),r,false);ring(pos,color,.5,r*1.2,.4);groundMark(scorchTex,pos,0xffffff,r*2.4,5,false,.8);noise(.4,.18,1200);
  if(playerIn(pos,r))damagePlayer(dmg)});
  const rock=new THREE.Group();const core=new THREE.Mesh(G.shard,MAT.bossStone);core.scale.setScalar(.9);rock.add(core);rock.add(glowSprite(color,6));const start=V3(pos.x+rand(-8,8),pos.y+40,pos.z+rand(-8,8));const end=pos.clone();
  addFx(rock,dur,(f,k)=>{rock.position.lerpVectors(start,end,k*k);if(Math.random()<.6)FL.emit(rock.position,{n:2,c0:0xffe0a0,c1:0xff2000,s0:1.8,s1:.4,life:.4})})}
function iceSpikeAt(pos,dmg,delay){after(delay,()=>{pos.y=groundAt(pos.x,pos.z);telegraph(pos,2.2,.7,0x60c8ff,()=>{for(let k=0;k<5;k++){const m=new THREE.Mesh(G.spike,MAT.ice);m.position.set(pos.x+rand(-1,1),pos.y,pos.z+rand(-1,1));const sy=rand(.8,1.5),sx=rand(.6,1);m.rotation.set(rand(-.3,.3),rand(0,3),rand(-.3,.3));
  addFx(m,1.6,(f,kk)=>{const t=f.t;const s=t<.12?t/.12:t>1.3?Math.max(0,(1.6-t)/.3):1;m.scale.set(sx,sy*s,sx)})}frostBurst(V3(pos.x,pos.y+1,pos.z),14);sfx.shatter();if(playerIn(pos,2.4))damagePlayer(dmg)})})}
function shockwave(center,maxR,speed,dmg,color){const m=new THREE.Mesh(new THREE.RingGeometry(.9,1,64),new THREE.MeshBasicMaterial({color:fxCol(color,.7),transparent:true,depthWrite:false,blending:THREE.AdditiveBlending,side:THREE.DoubleSide}));m.rotation.x=-Math.PI/2;m.position.set(center.x,(center.y||0)+.3,center.z);
  let hit=false;addFx(m,maxR/speed,(f,k)=>{const r=f.t*speed;m.scale.setScalar(r);m.material.opacity=1-k;if(Math.random()<.8){const a=rand(0,TAU);SM.emit(V3(center.x+Math.sin(a)*r,.5,center.z+Math.cos(a)*r),{c0:0xd0f0ff,c1:0x6090c0,s0:1.5,s1:3,life:.6,a:.4})}
    const d=Math.hypot(P.pos.x-center.x,P.pos.z-center.z);if(!hit&&Math.abs(d-r)<1.2&&P.pos.y-groundAt(P.pos.x,P.pos.z)<.8){hit=true;damagePlayer(dmg);P.chilled=2}})}
function summonNear(e,type,n){for(let k=0;k<n;k++){const s=findSpot(e.pos.x,e.pos.z,3,9);if(s)spawnEnemy(type,s)}}
function teleportNear(e,dmin,dmax){SM.emit(eCenter(e),{n:24,c0:0xd8e0ff,c1:0x302850,s0:2,s1:5,speed:4,life:1,a:.6});const s=findSpot(P.pos.x,P.pos.z,dmin,dmax);if(s){e.pos.x=s.x;e.pos.z=s.z;e.pos.y=groundAt(s.x,s.z)}SP.emit(eCenter(e),{n:40,c0:0xffffff,c1:0x8090ff,speed:8,life:.7,s0:.6,s1:.1})}

const BOSSAI={
  kitsune(e,dt,d){const a=e.ai,rage=e.hp<e.maxhp*.5;a.a1-=dt;a.a2-=dt;a.a3-=dt;a.tp-=dt;
    if(e.dash){e.dash.t+=dt;const k=Math.min(1,e.dash.t/.28);e.pos.x=lerp(e.dash.a.x,e.dash.b.x,k);e.pos.z=lerp(e.dash.a.z,e.dash.b.z,k);SP.emit(eCenter(e),{n:6,c0:0xffffff,c1:0x60c0ff,speed:2,life:.4,s0:.8,s1:.1});if(k>=1)e.dash=null;return}
    if(e.busy>0)return;
    if(a.a1<=0){a.a1=rage?2.4:3.4;e.busy=.5;const n=rage?6:4;e.m.wisps.forEach(w=>w.visible=false);after(2,()=>e.m.wisps.forEach(w=>w.visible=true));
      for(let k=0;k<n;k++){const ang=k/n*TAU;const from=eCenter(e).add(V3(Math.sin(ang)*1.5,1,Math.cos(ang)*1.5));after(k*.12,()=>{if(!e.dead)enemyOrb(from,aimAtPlayer(from),9,e.dmg*.7,0x6ad8ff,.45,{homing:2.2,keepY:true,life:4})})}}
    else if(a.a2<=0){a.a2=rage?4:5.5;e.busy=1;e.spin=1;const c=eCenter(e);const n=rage?20:14,off=Math.random();for(let k=0;k<n;k++){const ang=(k+off)*TAU/n;enemyOrb(c,V3(Math.sin(ang),0,Math.cos(ang)),12,e.dmg*.8,0xff3050,.4)}sfx.hiss()}
    else if(a.a3<=0&&d<22){a.a3=rage?4.5:6.5;e.busy=1.2;const from=e.pos.clone(),dir=V3(P.pos.x-from.x,0,P.pos.z-from.z).normalize(),to=from.clone().addScaledVector(dir,Math.min(24,d+6));
      lineTelegraph(from,to,3.4,.9,0xffffff,()=>{if(e.dead)return;e.dash={a:from,b:to,t:0};sfx.blink();after(.14,()=>{if(distToSeg(P.pos,from,to)<2&&Math.abs(P.pos.y-from.y)<3)damagePlayer(e.dmg*1.8)})})}
    if(a.tp<=0){a.tp=rage?6:9;teleportNear(e,9,15)}
    if(!a.s1&&e.hp<e.maxhp*.55){a.s1=1;summonNear(e,'fox',rage?4:3);cineLine('Hakuko','Dance with my shadows, little witch.')}},
  beast(e,dt,d){const a=e.ai,rage=e.hp<e.maxhp*.5;a.a1-=dt;a.a2-=dt;a.a3-=dt;a.a4-=dt;
    if(e.leap){e.leap.t+=dt;const k=Math.min(1,e.leap.t/.7);e.pos.x=lerp(e.leap.a.x,e.leap.b.x,k);e.pos.z=lerp(e.leap.a.z,e.leap.b.z,k);e.pos.y=lerp(e.leap.a.y,e.leap.b.y,k)+Math.sin(k*Math.PI)*8;if(k>=1){e.leap=null}return}
    if(a.breathT>0){a.breathT-=dt;const mp=e.m.head.getWorldPosition(V3());FL.emit(mp,{n:14,c0:0xfff4c0,c1:0xff2000,s0:2.6,s1:5,life:.6,dir:a.bDir.clone().multiplyScalar(28),dirJ:1,speed:4,drag:1});if(Math.random()<.3)SM.emit(mp,{n:2,c0:0x40302a,c1:0x100808,s0:2,s1:7,life:1.4,dir:a.bDir.clone().multiplyScalar(12),a:.4})}
    if(e.busy>0)return;
    if(a.a1<=0&&d>7&&d<30){a.a1=rage?4:5.5;e.busy=1.8;const tgt=P.pos.clone();tgt.y=groundAt(tgt.x,tgt.z);sfx.roar();
      telegraph(tgt,6.5,1.1,0xff3050,()=>{if(e.dead)return;fireBurst(V3(tgt.x,tgt.y+1,tgt.z),6,true);ring(tgt,0xff6030,1,9,.4);P.shake=1.3;sfx.boom();groundMark(scorchTex,tgt,0xffffff,14,6,false,.8);if(playerIn(tgt,6.5))damagePlayer(e.dmg*2)});
      after(.4,()=>{if(!e.dead)e.leap={a:e.pos.clone(),b:tgt,t:0}})}
    else if(a.a2<=0&&d<10){a.a2=rage?3.5:5;e.busy=1.3;const c=e.pos.clone();telegraph(c,10,1.1,0xff5020,()=>{if(e.dead)return;e.spinT=.6;ring(c,0xff8040,1,11,.4);FL.emit(V3(c.x,c.y+1.5,c.z),{n:80,c0:0xffe0a0,c1:0xff2000,s0:2.5,s1:.8,speed:14,flat:true,life:.6,drag:2});if(playerIn(c,10))damagePlayer(e.dmg*1.6)})}
    else if(a.a3<=0&&d<22){a.a3=rage?4.5:6.5;e.busy=2;const dir=V3(P.pos.x-e.pos.x,0,P.pos.z-e.pos.z).normalize();const o=e.pos.clone();e.m.g.rotation.y=Math.atan2(dir.x,dir.z);
      coneTelegraph(o,dir,21,.5,1,0xff5020,()=>{if(e.dead)return;a.breathT=1;a.bDir=dir.clone().setY(-.12);sfx.inferno();if(inCone(P.pos,o,dir,21,.5))damagePlayer(e.dmg*2)})}
    else if(a.a4<=0){a.a4=rage?6:9;e.busy=1;sfx.roar();const n=rage?9:6;for(let k=0;k<n;k++)after(k*.18,()=>{if(!e.dead)enemyMeteor(P.pos.clone().add(V3(rand(-6,6),0,rand(-6,6))),3.8,1.3,e.dmg*1.3,0xff6020)})}
    if(!a.s1&&e.hp<e.maxhp*.5){a.s1=1;cineLine('The Nine-Tails','NINE TAILS. NINE FIRES. BURN.')}},
  giant(e,dt,d){const a=e.ai,rage=e.hp<e.maxhp*.5;a.a1-=dt;a.a2-=dt;a.a3-=dt;a.a4-=dt;
    if(a.breathT>0){a.breathT-=dt;const mp=e.m.head.getWorldPosition(V3());SM.emit(mp,{n:6,c0:0xe0f8ff,c1:0x80b0e0,s0:2.5,s1:7,life:.9,dir:a.bDir.clone().multiplyScalar(26),dirJ:1,speed:3,a:.6,drag:1});SP.emit(mp,{n:10,c0:0xffffff,c1:0x60c8ff,s0:.6,s1:.2,life:.8,dir:a.bDir.clone().multiplyScalar(30),dirJ:1,speed:4})}
    if(e.busy>0)return;
    if(a.a1<=0&&d<14){a.a1=rage?3.2:4.5;e.busy=1.6;e.smash=1.6;const dir=V3(P.pos.x-e.pos.x,0,P.pos.z-e.pos.z).normalize();const at=e.pos.clone().addScaledVector(dir,Math.min(d,7));at.y=groundAt(at.x,at.z);
      telegraph(at,8,1.3,0x60c8ff,()=>{if(e.dead)return;ring(at,0xbff2ff,1,10,.4);frostBurst(V3(at.x,at.y+1,at.z),50);P.shake=1.5;sfx.boom();groundMark(frostTex,at,0xbff2ff,20,4,true,.9);
        for(let k=0;k<10;k++){const ang=k/10*TAU;const m=new THREE.Mesh(G.spike,MAT.ice);m.position.set(at.x+Math.sin(ang)*rand(2,6),at.y,at.z+Math.cos(ang)*rand(2,6));const sy=rand(.8,1.6);m.rotation.set(Math.cos(ang)*.4,0,-Math.sin(ang)*.4);addFx(m,2,(f,kk)=>{const t=f.t;m.scale.set(1,sy*(t<.1?t/.1:t>1.7?(2-t)/.3:1),1)})}
        if(playerIn(at,8))damagePlayer(e.dmg*2.2)})}
    else if(a.a2<=0){a.a2=rage?4:6;e.busy=1.2;sfx.roar();const dir=V3(P.pos.x-e.pos.x,0,P.pos.z-e.pos.z).normalize();const n=rage?14:10;for(let k=1;k<=n;k++)iceSpikeAt(e.pos.clone().addScaledVector(dir,k*2.6),e.dmg*1.3,k*.1)}
    else if(a.a3<=0&&d<24){a.a3=rage?5:7;e.busy=2;const dir=V3(P.pos.x-e.pos.x,0,P.pos.z-e.pos.z).normalize();const o=e.pos.clone();e.m.g.rotation.y=Math.atan2(dir.x,dir.z);
      coneTelegraph(o,dir,24,.45,1.1,0x80d8ff,()=>{if(e.dead)return;a.breathT=1.1;a.bDir=dir.clone().setY(-.28);sfx.frost();if(inCone(P.pos,o,dir,24,.45)){damagePlayer(e.dmg*1.8);P.chilled=3}})}
    else if(a.a4<=0){a.a4=rage?5.5:8;e.busy=1;e.stomp=.8;after(.6,()=>{if(e.dead)return;P.shake=1.2;sfx.boom();shockwave(e.pos.clone(),34,13,e.dmg*1.4,0xbff2ff);if(rage)after(.7,()=>{if(!e.dead)shockwave(e.pos.clone(),34,13,e.dmg*1.4,0xbff2ff)})});toast('Jump the shockwave!')}
    if(!a.s1&&e.hp<e.maxhp*.5){a.s1=1;snow.heavy=true;summonNear(e,beaten.has('beast')?'demon':'pig',4);cineLine('Hrímgar','WINTER TAKES EVERYTHING. EVEN YOU.')}}
};
let lineT=0;function cineLine(who,text){toast(`<span style="color:${SPEAKER[who]||'#fff'}">${who}:</span> ${text}`);toastT=3.5}

/* ---------- enemy update ---------- */
const tq=new THREE.Quaternion();
function animateEnemy(e,dt,mv){const def=e.def,b=e.m.body,t=e.t;const lunge=e.atk>0?Math.sin((e.atk/.3)*Math.PI):0;if(e.m.anim){e.m.anim(e,dt,mv,lunge);if(!e.m.actor){const sc=1+e.flash*1.2;b.scale.set(sc,sc,sc)}return}
  if(e.type==='pig'){b.rotation.z=Math.sin(t*9)*.09*mv;b.position.y=Math.abs(Math.sin(t*9))*.12*mv;b.rotation.x=lunge*.4;e.m.arms.forEach((a,i)=>{a.rotation.x=Math.sin(t*9+i*Math.PI)*.6*mv-lunge*1.4});e.m.legs.forEach((l,i)=>l.rotation.x=Math.sin(t*9+i*Math.PI)*.5*mv);e.m.head.rotation.x=Math.sin(t*2)*.08-lunge*.3}
  else if(e.type==='spider'){e.m.legs.forEach(L=>{const ph=t*16+L.ph;L.hip.rotation.y=L.base+Math.sin(ph)*.28*mv;L.F.rotation.z=L.s*(.6+Math.max(0,Math.cos(ph))*.35*mv)});b.position.y=.62+Math.abs(Math.sin(t*16))*.05*mv;e.m.abd.rotation.x=Math.sin(t*3)*.05;
    b.rotation.x=lerp(b.rotation.x,e.climbing?-1.35:-lunge*.4,Math.min(1,dt*10))}
  else if(e.type==='demon'){e.m.wheel.rotation.z+=dt*(3+mv*8);b.position.y=1.7+Math.sin(t*6)*.12;e.m.face.rotation.x=-lunge*.3;e.m.tongue.scale.y=.16+Math.sin(t*10)*.05}
  else if(e.type==='fox'){b.position.y=1.4+Math.sin(t*3)*.3}
  else if(e.type==='kitsune'){b.position.y=.3+Math.sin(t*1.5)*.15;e.m.tails.forEach((p,i)=>{p.rotation.y=(i-2)*.45+Math.sin(t*1.8+i)*.15;p.rotation.x=-.3+Math.sin(t*2.3+i*.7)*.12});
    if(e.spin>0){e.spin-=dt;e.m.para.rotation.y+=dt*25}else e.m.para.rotation.y+=dt*.8;e.m.wisps.forEach((w,i)=>{const a=t*1.6+i*TAU/4;w.position.set(Math.sin(a)*1.6,1.8+Math.sin(t*3+i)*.4,Math.cos(a)*1.6)});
    e.m.arms.forEach((a,i)=>a.rotation.x=Math.sin(t*1.3+i)*.15);if(Math.random()<.2)SP.emit(eCenter(e),{c0:0x9ae8ff,c1:0x2040a0,s0:.5,s1:.1,life:1,up:1,jitter:1.5})}
  else if(e.type==='beast'){e.m.legs.forEach(L=>{const ph=t*7+L.ph;L.L.rotation.x=Math.sin(ph)*.45*mv;L.lo.rotation.x=Math.max(0,-Math.sin(ph))*.6*mv});b.position.y=Math.abs(Math.sin(t*7))*.2*mv;
    e.m.tails.forEach(T=>{T.pv.rotation.x=-.9+Math.sin(t*2+T.ph)*.2;T.pv.children[0].rotation.z=Math.sin(t*1.7+T.ph)*.25});e.m.jaw.rotation.x=(e.ai.breathT>0?.5:Math.max(0,Math.sin(t*1.5))*.15)+lunge*.4;
    if(e.spinT>0){e.spinT-=dt;b.rotation.y+=dt*14}else b.rotation.y=lerp(b.rotation.y,0,dt*6);if(Math.random()<.5)FL.emit(e.m.tails[(Math.random()*9)|0].pv.getWorldPosition(V3()).add(V3(rand(-2,2),rand(0,3),rand(-3,0))),{c0:0xffb060,c1:0xff2000,s0:1.2,s1:.2,life:.6,up:2})}
  else if(e.type==='giant'){e.m.legs.forEach(L=>{L.L.rotation.x=Math.sin(t*2.6+(L.s>0?0:Math.PI))*.35*mv;L.lo.rotation.x=Math.max(0,Math.sin(t*2.6+(L.s>0?Math.PI:0)))*.4*mv});
    const sm=e.smash>0?(e.smash-=dt,e.smash):0;const raise=sm>0?Math.sin((1-sm/1.6)*Math.PI):0;e.m.arms.forEach(A=>{A.A.rotation.x=Math.sin(t*2.6+(A.s>0?Math.PI:0))*.3*mv-raise*2.6;A.F.rotation.x=-.3-raise*.6});
    e.m.head.rotation.y=Math.sin(t*.7)*.2;b.position.y=Math.abs(Math.sin(t*2.6))*.25*mv;if(mv>.3&&Math.abs(Math.sin(t*2.6))<.05&&!e.stepT){e.stepT=.3;P.shake=Math.max(P.shake,.25);noise(.3,.12,200)}if(e.stepT>0)e.stepT-=dt;else e.stepT=0;
    if(Math.random()<.5)SM.emit(V3(e.pos.x+rand(-3,3),e.pos.y+rand(1,4),e.pos.z+rand(-3,3)),{c0:0xe0f4ff,c1:0x8090c0,s0:2,s1:5,life:1.5,a:.25})}
  const sc=1+e.flash*1.2;if(e.type!=='spider'){b.scale.set(sc,sc,sc)}}
function updateEnemies(dt){
  const target=MODE==='open'?0:Math.min(16,5+Math.floor(P.level*.6))*(P.weak?.7:1)*(bossRef?.35:1)*DF().spawn*(BQ.active()?.3:1);
  spawnT-=dt;if(spawnT<=0&&P.alive){spawnT=.9;const alive=enemies.filter(e=>!e.dead&&!e.def.boss&&e.type!=='fox').length;if(alive<target){const at=findSpot(P.pos.x,P.pos.z,30,56);if(at){const ty=pickType();spawnEnemy(ty,at);if(ty==='spider'&&Math.random()<.4){const b=findSpot(at.x,at.z,2,5);if(b)spawnEnemy('spider',b)}}}}
  if(!bossRef&&peaceT>0&&!CS.active)peaceT-=dt;if(!bossRef&&P.alive&&nextBoss()&&peaceT<=0&&!enemies.some(q=>q.dormant&&!q.dead)){bossTimer-=dt;if(bossTimer<=0&&!scPending(nextBoss())){const at=findSpot(P.pos.x,P.pos.z,55,75)||findSpot(P.pos.x,P.pos.z,32,46);if(at){const e=spawnEnemy(nextBoss(),at);bossTimer=40;bossDormant(e)}}}
  for(const e of enemies){if(e.dead)continue;const def=e.def;e.t+=dt;
    e.slow=Math.max(0,e.slow-dt);e.frozen=Math.max(0,e.frozen-dt);e.rooted=Math.max(0,e.rooted-dt);e.stun=Math.max(0,e.stun-dt);e.burn=Math.max(0,e.burn-dt);e.busy=Math.max(0,e.busy-dt);
    e.atk=Math.max(0,e.atk-dt);e.flash=Math.max(0,e.flash-dt);if(e.chillT>0){e.chillT-=dt;if(e.chillT<=0)e.chill=0}
    if(e.frozen<=0&&e.iceMesh&&e.iceMesh.visible){e.iceMesh.visible=false;shatter(eCenter(e),6,def.r)}
    if(e.frozen>0&&e.iceMesh)e.iceMesh.position.set(e.pos.x,e.pos.y+def.h*.5,e.pos.z);
    if(e.chains){if(e.rooted<=0){scene.remove(e.chains);disposeObj(e.chains.userData.rune);e.chains=null}else{e.chains.position.set(e.pos.x,e.pos.y,e.pos.z);e.chains.userData.rune.rotation.z+=dt}}
    let dps=0;if(e.burn>0){dps+=e.burnDps;if(Math.random()<.7)FL.emit(eCenter(e),{n:1,c0:0xffe0a0,c1:0xff2000,s0:1.2,s1:.3,life:.45,up:3,jitter:def.r*.6})}else e.burnDps=0;
    if(e.rooted>0)dps+=e.rootDps||0;if(e.pois>0){e.pois-=dt;dps+=e.poisDps||0;if(Math.random()<.5)SP.emit(eCenter(e),{n:1,c0:0xc8ff80,c1:0x2a5010,s0:.7,s1:.2,life:.7,up:1.5,jitter:def.r*.6})}else e.poisDps=0;e.dotAcc+=dps*dt;e.dotT-=dt;if(e.dotT<=0){e.dotT=.5;if(e.dotAcc>=1){const a=e.dotAcc;e.dotAcc=0;damageEnemy(e,a,e.pois>0?'#a8ff60':e.burn>0?'#ffa060':'#d0a0ff',true);if(e.dead)continue}}
    const locked=e.frozen>0||e.stun>0,canMove=!locked&&e.rooted<=0&&e.busy<=0&&!e.dash&&!e.leap;
    const dx=P.pos.x-e.pos.x,dz=P.pos.z-e.pos.z,d=Math.hypot(dx,dz)||.001;
    if(e.dormant){if(bossWake(e,d,dt))continue}
    if(!e.home)e.home={x:e.pos.x,z:e.pos.z};const idle=!def.boss&&!aggroCheck(e,d,dt);
    if(d>95&&!def.boss&&!e.quest){removeEnemy(e);continue}
    if(def.boss&&d>70)teleportNear(e,22,30);
    let mx=0,mz=0;
    if(idle){if(!e.wd||e.wdT<=0){e.wdT=rand(2,5);const a=Math.random()*TAU,r=Math.random()*6;e.wd={x:e.home.x+Math.sin(a)*r,z:e.home.z+Math.cos(a)*r}}e.wdT-=dt;const wx=e.wd.x-e.pos.x,wz=e.wd.z-e.pos.z,wd=Math.hypot(wx,wz);if(wd>.6){mx=wx/wd*.35;mz=wz/wd*.35}}
    else if(P.alive){const ranged=def.ranged===1||def.boss&&(e.type==='kitsune'||def.kite);
      if(ranged){const far=15,near=8;if(d>far){mx=dx/d;mz=dz/d}else if(d<near){mx=-dx/d;mz=-dz/d}else{mx=-dz/d*e.strafe*.6;mz=dx/d*e.strafe*.6}}
      else if(d>def.range*.8){mx=dx/d;mz=dz/d}}
    else{mx=-dx/d*.5;mz=-dz/d*.5}
    for(const o of enemies){if(o===e||o.dead)continue;const ox=e.pos.x-o.pos.x,oz=e.pos.z-o.pos.z,od=Math.hypot(ox,oz),rr=def.r+o.def.r;if(od<rr&&od>.001){e.pos.x+=ox/od*(rr-od)*.5*Math.min(1,dt*10);e.pos.z+=oz/od*(rr-od)*.5*Math.min(1,dt*10)}}
    let mv=0;
    if(canMove){const sp=def.speed*(e.slow>0?.45:1)*(def.boss&&e.hp<e.maxhp*.5?1.25:1)*dt;mv=Math.hypot(mx,mz);
      if(def.climb){const nx=e.pos.x+mx*sp,nz=e.pos.z+mz*sp,gh=groundAt(nx,nz);if(gh>e.pos.y+.5){e.pos.y=Math.min(gh,e.pos.y+5.5*dt);e.climbing=true}else{e.pos.x=nx;e.pos.z=nz;e.climbing=false}collide(e.pos,def.r,false,true)}
      else{e.pos.x+=mx*sp;e.pos.z+=mz*sp}}
    if(!def.climb)collide(e.pos,def.r,def.ghost,false);
    {const gh=groundAt(e.pos.x,e.pos.z);if(!e.leap){if(def.climb){if(!e.climbing)e.pos.y=e.pos.y>gh+.1?Math.max(gh,e.pos.y-10*dt):gh}else e.pos.y=lerp(e.pos.y,gh,Math.min(1,dt*10))}}
    e.moveK=lerp(e.moveK,mv,Math.min(1,dt*8));
    if(!locked&&!e.dash){e.m.g.rotation.y=lerpAngle(e.m.g.rotation.y,idle&&(mx||mz)?Math.atan2(mx,mz):Math.atan2(dx,dz),Math.min(1,dt*(def.boss?3:8)))}
    if(!locked&&P.alive&&!idle){
      if(def.boss){BOSSAI[e.type](e,dt*DF().tempo,d);e.cd-=dt;if(def.range&&e.cd<=0&&d<def.range&&e.busy<=0&&Math.abs(P.pos.y-e.pos.y)<4){e.cd=def.cd;e.atk=.3;damagePlayer(e.dmg)}}
      else{if(def.ai)def.ai(e,dt,d);e.cd-=dt;const dy=Math.abs(P.pos.y-e.pos.y);
        if(e.wind>0){e.wind-=dt;e.m.g.scale.setScalar((e.elite?1.3:1)*(1+Math.sin(e.wind*40)*.04));if(e.wind<=0){e.m.g.scale.setScalar(e.elite?1.3:1);e.atk=.3;if(d<def.range*1.15&&dy<2.6){damagePlayer(e.dmg);if(e.type==='spider'){P.poison=Math.max(P.poison,DIFF==='easy'?1.5:3)}}}}
        else if(e.cd<=0){if(d<def.range&&dy<2.6){e.cd=def.cd*rand(.9,1.15)+DF().wind;e.wind=DF().wind;if(!e.warn){e.warn=glowSprite(0xff2030,1.6,.9);e.warn.position.y=def.h+.2;e.m.g.add(e.warn)}e.warn.visible=true;after(DF().wind,()=>{if(e.warn)e.warn.visible=false});if(e.type==='pig')sfx.squeal()}
          else if(def.ranged===1&&d<def.range){e.cd=def.cd*rand(.9,1.2);const c=eCenter(e);enemyOrb(c,aimAtPlayer(c),13,e.dmg,0x80d8ff,.35,{keepY:true})}
          else if(e.type==='spider'&&d<16&&d>5&&Math.random()<.02){e.cd=3;const c=eCenter(e);enemyOrb(c,aimAtPlayer(c),16,e.dmg*.5,0xf0f0f0,.35,{keepY:true,web:true});sfx.hiss()}}}}
    if(!locked)animateEnemy(e,dt,e.moveK);
    if(e.bar){e.bar.visible=e.hp<e.maxhp;if(e.bar.visible){e.bar.quaternion.copy(camera.quaternion);e.bar.quaternion.premultiply(tq.copy(e.m.g.quaternion).invert());e.fg.scale.x=Math.max(0,e.hp/e.maxhp)}}
  }
  for(let i=enemies.length-1;i>=0;i--)if(enemies[i].dead)enemies.splice(i,1);
  if(bossRef)$('bossFill').style.transform=`scaleX(${Math.max(0,bossRef.hp/bossRef.maxhp)})`;
}

