
/* ================= Story-world polish: water, London terraces, buses and cabs, people, chapter jumps ================= */
/* ---------- water: animated normals, fresnel sky reflection, moon glints, real fog ---------- */
const NZW={mats:[]};
function nzWaterMat(o={}){const m=new THREE.ShaderMaterial({fog:true,
  uniforms:THREE.UniformsUtils.merge([THREE.UniformsLib.fog,{uT:{value:0},uDeep:{value:new THREE.Color(o.deep||0x08121e)},uMid:{value:new THREE.Color(o.mid||0x1b3550)},uSky:{value:new THREE.Color(0x4e3462)},
    uL:{value:new THREE.Vector3(-.4,.6,-.6)},uLC:{value:new THREE.Color(0xc0caff)},uS:{value:o.scale||1},uC:{value:o.curse||0}}]),
  vertexShader:'varying vec3 vW;\n#include <fog_pars_vertex>\nvoid main(){vec4 w=modelMatrix*vec4(position,1.);vW=w.xyz;vec4 mvPosition=viewMatrix*w;gl_Position=projectionMatrix*mvPosition;\n#include <fog_vertex>\n}',
  fragmentShader:'uniform float uT,uS,uC;uniform vec3 uDeep,uMid,uSky,uL,uLC;varying vec3 vW;\n#include <fog_pars_fragment>\n'+
    'float hh(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}float nn(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(hh(i),hh(i+vec2(1,0)),f.x),mix(hh(i+vec2(0,1)),hh(i+vec2(1,1)),f.x),f.y);}'+
    'float H(vec2 p){float t=uT;return nn(p*.35+vec2(t*.12,t*.07))*.5+nn(p*.9-vec2(t*.2,-t*.15))*.3+nn(p*2.3+vec2(-t*.35,t*.3))*.2;}'+
    'void main(){vec2 p=vW.xz*uS;float e=.12,h0=H(p);vec3 N=normalize(vec3((h0-H(p+vec2(e,0.)))*2.6,1.,(h0-H(p+vec2(0.,e)))*2.6));vec3 V=normalize(cameraPosition-vW);'+
    'float fr=.03+.97*pow(1.-max(dot(N,V),0.),5.);vec3 col=mix(uDeep,uMid,h0*.7+.15);vec3 R=reflect(-V,N);vec3 refl=mix(uSky*1.2,uSky*.5,clamp(R.y*1.4,0.,1.));col=mix(col,refl,fr*.8);'+
    'vec3 L=normalize(uL);float s=max(dot(R,L),0.);col+=uLC*(pow(s,140.)*1.4+pow(s,16.)*.08);col+=vec3(.15,.9,.45)*uC*smoothstep(.6,.95,h0)*.3;gl_FragColor=vec4(col,1.);\n#include <fog_fragment>\n}'});
  NZW.mats.push(m);return m}
function nzWaterTick(dt){if(!NZW.mats.length)return;const L=V3().subVectors(moonLight.position,moonLight.target.position).normalize();const sky=scene.fog.color;
  for(const m of NZW.mats){const u=m.uniforms;u.uT.value+=dt;u.uL.value.copy(L);u.uLC.value.copy(moonLight.color);u.uSky.value.copy(sky)}}
if(MODE!=='open'){const rw=scene.getObjectByName('riverWater');if(rw)rw.material=nzWaterMat({scale:1.1});}
{const _c=c2m;c2m=function(){const r=_c.apply(this,arguments);if(!r._w){r._w=1;r.water=nzWaterMat({scale:1.4,mid:0x22405a})}return r}}
{const _b=nzBuild;nzBuild=function(){const first=!NZ.built;_b.apply(this,arguments);if(!first)return;const sea=nzWaterMat({scale:.55,deep:0x071018,mid:0x15304a}),th=nzWaterMat({scale:.9,deep:0x0a1012,mid:0x1e3038}),rv=nzWaterMat({scale:1.3,mid:0x203e54});
  NZ.g.traverse(o=>{if(!o.isMesh)return;if(o.material===NZ.M.sea)o.material=Math.abs(o.position.z-TH_Z)<30?th:sea;else if(o.name==='nzRiver')o.material=rv});nzTraffic(NZ.g);nzCrowd('london');nzCrowd('calais')}}

/* ---------- London terraces: brick, white sash windows, shopfronts, slate roofs, chimney pots ---------- */
function nzLondonStyle(){if(NZ.lst)return NZ.lst;const W=512,H=768,bw=128,fh=128;const bricks=['#7a3628','#8c4a34','#9a7a5a'],shops=['#1a3a2a','#141418','#5a1418','#1a2a4a','#3a2a1a'];
  const fac=[0,1,2].map(v=>{const map=mkCanvas(W,H,x=>{x.fillStyle=bricks[v];x.fillRect(0,0,W,H);for(let r=0;r<H;r+=8){x.fillStyle='rgba(210,200,190,.28)';x.fillRect(0,r,W,1.4);for(let c=(r/8%2)*12;c<W;c+=24)x.fillRect(c,r,1.4,8)}
      for(let k=0;k<1800;k++){x.fillStyle=`rgba(${rand(20,80)|0},${rand(10,40)|0},${rand(5,30)|0},.18)`;x.fillRect(rand(0,W),rand(0,H),rand(4,12),3)}
      for(let f=0;f<6;f++){const y=H-(f+1)*fh;x.fillStyle='#e8e2d6';x.fillRect(0,y+fh-8,W,6);
        for(let b=0;b<4;b++){const X=b*bw;if(f===0){x.fillStyle=shops[(b+v)%5];x.fillRect(X+6,y+18,bw-12,fh-24);x.fillStyle='#e8d8a8';x.fillRect(X+10,y+22,bw-20,14);x.fillStyle='#22222a';x.fillRect(X+16,y+44,bw-32,fh-56);x.fillStyle='#e8e2d6';x.fillRect(X+62,y+44,4,fh-56)}
          else{x.fillStyle='#f2eee6';x.fillRect(X+38,y+20,52,86);x.fillStyle='#1c1c26';x.fillRect(X+43,y+25,42,36);x.fillRect(X+43,y+66,42,36);x.fillStyle='#f2eee6';x.fillRect(X+63,y+25,3,77);x.fillStyle='#d8d0c0';x.fillRect(X+34,y+14,60,7);x.fillRect(X+34,y+106,60,5)}}}});
    const em=mkCanvas(W,H,x=>{x.fillStyle='#000';x.fillRect(0,0,W,H);for(let f=0;f<6;f++){const y=H-(f+1)*fh;for(let b=0;b<4;b++){const X=b*bw;
      if(f===0){if(Math.random()<.7){x.fillStyle='#ffcf80';x.fillRect(X+16,y+44,bw-32,fh-56)}x.fillStyle='rgba(255,230,170,.6)';x.fillRect(X+10,y+22,bw-20,14)}
      else if(Math.random()<.34){x.fillStyle=Math.random()<.85?'#ffc066':'#a8c4ff';x.fillRect(X+43,y+25,42,36);x.fillRect(X+43,y+66,42,36)}}}});
    const t=[new THREE.CanvasTexture(map),new THREE.CanvasTexture(em)];for(const q of t){q.wrapS=q.wrapT=THREE.RepeatWrapping;q.anisotropy=8}
    return new THREE.MeshStandardMaterial({map:t[0],emissive:0xffffff,emissiveMap:t[1],emissiveIntensity:.75,roughness:.9,metalness:0,envMapIntensity:.3})});
  const sh=new THREE.Shape();sh.moveTo(-.5,0);sh.lineTo(.5,0);sh.lineTo(0,1);sh.lineTo(-.5,0);const pg=new THREE.ExtrudeGeometry(sh,{depth:1,bevelEnabled:false});pg.translate(0,0,-.5);
  const sl=mkCanvas(64,64,x=>{x.fillStyle='#3a3c46';x.fillRect(0,0,64,64);for(let r=0;r<64;r+=6){x.fillStyle='rgba(10,10,16,.6)';x.fillRect(0,r,64,1);for(let c=(r/6%2)*5;c<64;c+=10)x.fillRect(c,r,1,6)}});
  return NZ.lst={facade:fac,roofGeo:pg,roofMat:std({map:rep(new THREE.CanvasTexture(sl),4,3),roughness:.7,metalness:.15}),noDormers:true}}
function nzChimPots(G,chims){if(!chims.length)return;const pm=std({color:0xb8603a,roughness:.8});CITY_PARENT=G;
  instanced(new THREE.CylinderGeometry(.13,.16,.55,8),pm,chims.flatMap(c=>[[c.x-.22,c.y,c.z],[c.x+.22,c.y,c.z]]),(o,p)=>{o.position.set(p[0],p[1]+1.15,p[2])});CITY_PARENT=null}

/* ---------- a proper Routemaster, and black cabs ---------- */
function nzTex(w,h,fn){const t=new THREE.CanvasTexture(mkCanvas(w,h,fn));t.anisotropy=8;return t}
function nzBus(){if(!NZ.busK){const glass=nzTex(256,32,x=>{x.fillStyle='#0c0c12';x.fillRect(0,0,256,32);for(let k=0;k<8;k++){x.fillStyle='#1a1a22';x.fillRect(k*32,0,3,32)}});
    const lit=nzTex(256,32,x=>{x.fillStyle='#000';x.fillRect(0,0,256,32);for(let k=0;k<8;k++){x.fillStyle=Math.random()<.8?'#ffd890':'#806040';x.fillRect(k*32+4,4,26,24);x.fillStyle='rgba(0,0,0,.65)';if(Math.random()<.5){x.beginPath();x.arc(k*32+14,22,6,0,TAU);x.fill()}}});
    const dest=nzTex(128,24,x=>{x.fillStyle='#08080a';x.fillRect(0,0,128,24);x.fillStyle='#ffe8a0';x.font='bold 15px sans-serif';x.fillText('13  WESTMINSTER',6,17)});
    const sh=new THREE.Shape();const L=10.2,Hh=4.3,r=.5;sh.moveTo(-L/2+r,.45);sh.lineTo(L/2-r,.45);sh.quadraticCurveTo(L/2,.45,L/2,.45+r);sh.lineTo(L/2,Hh-r);sh.quadraticCurveTo(L/2,Hh,L/2-r,Hh);sh.lineTo(-L/2+r,Hh);sh.quadraticCurveTo(-L/2,Hh,-L/2,Hh-r);sh.lineTo(-L/2,.45+r);sh.quadraticCurveTo(-L/2,.45,-L/2+r,.45);
    const bg=new THREE.ExtrudeGeometry(sh,{depth:2.3,bevelEnabled:true,bevelThickness:.1,bevelSize:.1,bevelSegments:3,curveSegments:6});bg.translate(0,0,-1.15);bg.rotateY(Math.PI/2);
    NZ.busK={bg,red:std({color:0xb0121a,roughness:.25,metalness:.2,envMapIntensity:1.3}),glass:std({map:glass,emissive:0xffffff,emissiveMap:lit,emissiveIntensity:.9,roughness:.08,metalness:.4}),
      dest:new THREE.MeshBasicMaterial({map:dest}),tyre:std({color:0x0c0c0e,roughness:.8}),hub:std({color:0xb8b8c0,metalness:.9,roughness:.3}),cream:std({color:0xe8dcc0,roughness:.5})}}
  const K=NZ.busK,g=new THREE.Group(),b=new THREE.Mesh(K.bg,K.red);b.castShadow=b.receiveShadow=true;g.add(b);
  for(const y of[1.95,3.45])for(const s of[-1,1]){const w=new THREE.Mesh(new THREE.PlaneGeometry(9,1.05),K.glass);w.position.set(s*1.27,y,-.1);w.rotation.y=s*Math.PI/2;g.add(w)}
  for(const y of[1.95,3.45]){const w=new THREE.Mesh(new THREE.PlaneGeometry(2,1.05),K.glass);w.position.set(0,y,5.22);g.add(w)}
  const d=new THREE.Mesh(new THREE.PlaneGeometry(1.8,.34),K.dest);d.position.set(0,2.75,5.22);g.add(d);const st=new THREE.Mesh(new THREE.BoxGeometry(2.62,.14,10.1),K.cream);st.position.y=2.68;g.add(st);
  for(const z of[3.4,-3.3])for(const s of[-1,1]){const t=new THREE.Mesh(new THREE.CylinderGeometry(.5,.5,.32,16),K.tyre);t.rotation.z=Math.PI/2;t.position.set(s*1.12,.5,z);g.add(t);const h=new THREE.Mesh(new THREE.CylinderGeometry(.24,.24,.34,10),K.hub);h.rotation.z=Math.PI/2;h.position.copy(t.position);g.add(h)}
  for(const s of[-1,1]){const hl=glowSprite(0xfff2d0,1.8,.85);hl.position.set(s*.85,1,5.25);g.add(hl);const tl=glowSprite(0xff2010,1,.8);tl.position.set(s*.95,1.1,-5.25);g.add(tl)}return g}
function nzCab(){if(!NZ.cabK){const sh=new THREE.Shape();sh.moveTo(-2.2,.35);sh.lineTo(2.2,.35);sh.lineTo(2.25,.95);sh.lineTo(1.4,1.1);sh.lineTo(1.0,1.75);sh.lineTo(-1.6,1.8);sh.lineTo(-2.2,1.2);sh.lineTo(-2.2,.35);
    const g=new THREE.ExtrudeGeometry(sh,{depth:1.7,bevelEnabled:true,bevelThickness:.08,bevelSize:.08,bevelSegments:2});g.translate(0,0,-.85);g.rotateY(-Math.PI/2);NZ.cabK={g,m:std({color:0x0c0c0e,roughness:.15,metalness:.6,envMapIntensity:1.6})}}
  const c=new THREE.Group();const b=new THREE.Mesh(NZ.cabK.g,NZ.cabK.m);b.castShadow=true;c.add(b);const sign=glowSprite(0xffb020,.9,.9);sign.position.set(0,1.95,.6);c.add(sign);
  for(const s of[-1,1]){const h=glowSprite(0xfff2d0,1.2,.8);h.position.set(s*.6,.75,2.3);c.add(h);const t=glowSprite(0xff2010,.7,.7);t.position.set(s*.65,.8,-2.3);c.add(t)}
  for(const z of[1.4,-1.4])for(const s of[-1,1]){const w=new THREE.Mesh(new THREE.CylinderGeometry(.34,.34,.22,12),NZ.busK?NZ.busK.tyre:std({color:0x0c0c0e}));w.rotation.z=Math.PI/2;w.position.set(s*.85,.34,z);c.add(w)}return c}
function nzTraffic(G){nzBus();const lanes=[{z:-9819.5,dir:1},{z:-9780.5,dir:-1}],cars=[];
  for(const L of lanes)for(let k=0;k<5;k++){const v=k%3===1?nzBus():nzCab();v.userData={x:-250+k*104+rand(-20,20),z:L.z,dir:L.dir,sp:k%3===1?7:10,bus:k%3===1};v.rotation.y=L.dir>0?Math.PI/2:-Math.PI/2;G.add(v);cars.push(v)}
  NZ.anim.push(dt=>{for(const v of cars){const u=v.userData;u.x+=u.dir*u.sp*dt;if(u.x>262)u.x=-262;if(u.x<-262)u.x=262;v.position.set(u.x,0,u.z)}})}

/* ---------- people: Paris breathes again after Kaen, Londoners and Calais folk out at night ---------- */
const NZP={list:[],paris:false};
function nzPerson(){const R=Math.random,sx=R()<.5?'f':'m';const coat=[0x2a2a30,0x4a3a2a,0x1e2a3a,0x5a1e22,0x3a4a3a,0x6a6a70,0x7a5a3a][R()*7|0];
  const a=makeCHActor(sx,{skin:[0xf0d0c0,0xe0b898,0xb07a58,0x7a5038][R()*4|0],hair:sx==='f'?(R()<.5?'hairLong':'hairBuns'):(R()<.5?'hairPart':'hairBuzz'),hairCol:[0x1a1410,0x3a2a1a,0x7a5a32,0xc8a060][R()*4|0],brow:0x2a1a10,keepReg:[5,6,9],
    wear:[[R()<.65?'long':'tee',coat,{roughness:.85}],[sx==='f'&&R()<.4?'skirt':'trousers',[0x1e1e24,0x2a2a36,0x3a2a20][R()*3|0],{roughness:.85}],['shoes',0x0e0e10,{roughness:.4}]]});
  if(!a)return null;try{a.setBase('Walk_Loop',.2,.9+R()*.25)}catch(e){}return a}
function nzWalk(par,a,x0,z0,x1,z1){const u={a,x0,z0,x1,z1,t:Math.random(),dir:Math.random()<.5?1:-1,len:Math.hypot(x1-x0,z1-z0)};par.add(a.g);NZP.list.push(u);return u}
function nzCrowd(where){if(!CH.ok)return;const segs=[];
  if(where==='london'){for(let k=0;k<10;k++){const x=rand(-240,200),s=k%2?-9817.2:-9783;segs.push([x,s,x+rand(30,60),s])}for(const b of[-108,-36,72])segs.push([b+3.6,-9786,b+3.6,-9814]);}
  else if(where==='calais'){for(let k=0;k<6;k++){const x=rand(-230,190);segs.push([x,-2155,x+rand(25,50),-2155])}}
  else{for(let k=0;k<10;k++){const x=rand(-380,340),s=k%2?12.6:-12.6;segs.push([x,s,x+rand(30,60),s])}segs.push([-122,50,-122,230],[-130,60,-130,240],[-135,-60,-135,-100],[-117,-100,-117,-60])}
  const par=where==='paris'?scene:NZ.g;for(const s of segs){const a=nzPerson();if(a)nzWalk(par,a,...s)}}
function nzCrowdTick(dt){const cp=camera.position;for(const u of NZP.list){const g=u.a.g;if(!g.parent)continue;if(g.parent===scene?!(CH2.zone==='paris'&&CH2.st>=1):!g.parent.visible){g.visible=false;continue}
  u.t+=u.dir*dt*1.35/Math.max(1,u.len);if(u.t>1){u.t=1;u.dir=-1}else if(u.t<0){u.t=0;u.dir=1}const x=lerp(u.x0,u.x1,u.t),z=lerp(u.z0,u.z1,u.t);g.position.set(x,groundAt(x,z),z);
  g.rotation.y=Math.atan2((u.x1-u.x0)*u.dir,(u.z1-u.z0)*u.dir);const d=Math.hypot(x-cp.x,z-cp.z);g.visible=d<170;if(d<110)try{u.a.update(dt)}catch(e){}
  if(d<3.2&&!CS.active){const dx=x-P.pos.x,dz=z-P.pos.z;if(Math.hypot(dx,dz)<1.1){P.pos.x-=dx*.1;P.pos.z-=dz*.1}}}}
{const _mt=muTick;muTick=function(dt){_mt(dt);if(MODE==='open')return;nzWaterTick(dt);if(!NZP.paris&&CH2.st>=1&&STATS.won&&CH2.zone==='paris'&&started&&CH.ok){NZP.paris=true;nzCrowd('paris')}
  nzCrowdTick(Math.min(dt,.05))}}

/* ---------- chapter jumps always land you in the right place ---------- */
function nzLeaveQuiet(){if(CH2.zone!=='north')return;nzClear();sxStop('wind',.4);CH2.zone='paris';if(NZ.g)NZ.g.visible=false;for(const o of NZ.hid)o.visible=true;NZ.hid=[];
  Object.assign(WB,CH2.parisWB||{x0:-430,x1:430,z0:-330,z1:300});drawWorldMap();SPAWN.set(-100,0,22);CH2.flySpd=0;camera.far=800;camera.updateProjectionMatrix()}
{const _pk=pickChapter;pickChapter=function(id){if(CS.active){CS.done=null;endCutscene()}try{tutHide()}catch(e){}return _pk.apply(this,arguments)}}
{const _ac=applyChapter;applyChapter=function(id){if(MODE==='open')return _ac.apply(this,arguments);if(CS.active){CS.done=null;endCutscene()}nzLeaveQuiet();CH2.mourn=false;
  const r=_ac.apply(this,arguments);
  if(id!=='crossing'&&id!=='london'){CH2.st=0;ch2Save();CH2.obj=null;if(LYR.a){LYR.a.g.visible=false;LYR.home=false}SPAWN.set(-100,0,22);P.pos.set(SPAWN.x,groundAt(SPAWN.x,SPAWN.z),SPAWN.z);yaw=Math.atan2(-(EIFFEL.x-SPAWN.x),-(EIFFEL.z-SPAWN.z));P.face=yaw+Math.PI}
  else if(id==='crossing'){P.pos.set(-126,groundAt(-126,-100),-100);yaw=Math.PI;P.face=0}
  else{const p=V3(-108,0,-9648);P.pos.set(p.x,groundAt(p.x,p.z),p.z);yaw=0;P.face=Math.PI}
  P.vy=0;P.flying=false;P.glide=false;P.alive=true;$('death')&&$('death').classList.add('hidden');camera.position.set(P.pos.x+Math.sin(yaw)*10,P.pos.y+5,P.pos.z+Math.cos(yaw)*10);writeSave();return r}}
