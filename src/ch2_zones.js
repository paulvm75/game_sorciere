
/* ================= CHAPTER 2 · The Crossing: Calais, the cursed Channel, England, London ================= */
const NZB={x0:-270,x1:270,z0:-10030,z1:-2050},CAL_SHORE=-2192,CURSE_Z=-6450,CLIFF_Z=-7000,LON_Z=-9600,TH_Z=-9800,TH_W=16,LBR=[-108,-36,72,180];
const NZ={built:false,g:null,hid:[],trig:{},cp:V3(60,0,-2172),cpk:0,spawnT:2,lt:3,burnT:0,swimT:0,fogC:new THREE.Color(0x1d2238),fogD:.008,flashK:0,flashT:6,tollT:40,bossCd:0,boss:null,anim:[],mapR:[],mapP:[],eye:null,ravens:[],wisps:[]};
const nzSm=(a,b,x)=>{const t=clamp((x-a)/(b-a),0,1);return t*t*(3-2*t)};
const ENG_L=CLIFF_Z-LON_Z,RIV_Z0=CLIFF_Z-420;
function nzRiverX(z){const t=CLIFF_Z-z;return 6+34*Math.sin(t/190+.6)+11*Math.sin(t/67)}
function nzRiverOn(z){return z<RIV_Z0&&z>LON_Z+6}
function nzRiverHW(z){return 4.5+2.5*clamp((RIV_Z0-z)/1900,0,1)}
function nzRoadX(z){return nzRiverX(z)+36*Math.sin(Math.PI*(CLIFF_Z-325-z)/650)}
function nzCoastH(x){return lerp(11,30,nzSm(70,135,x))}
function nzBase(z,x){const t=clamp((CLIFF_Z-z)/ENG_L,0,1);return nzCoastH(x==null?200:x)*(1-nzSm(0,.16,t))}
const NZTOWNS=[{n:'Folkestone',s:'Kent, England',x:-10,z:CLIFF_Z-95,r:110,f:0},{n:'Dover',s:'Kent, England',x:205,z:CLIFF_Z-80,r:85,f:0},
  {n:'Hollowmere',s:'A Kentish village',z:CLIFF_Z-975,r:95,f:1},{n:'Ashby-on-Wold',s:'A village on the downs',z:CLIFF_Z-1625,r:95,f:1},{n:'Kingsbridge Green',s:'The last village before London',z:CLIFF_Z-2275,r:95,f:1}];
for(const t of NZTOWNS)if(t.x==null)t.x=nzRiverX(t.z);
function nzRaw(x,z){const t=clamp((CLIFF_Z-z)/ENG_L,0,1),b=nzBase(z,x);const amp=(2.5+8*nzSm(.03,.13,t))*(1-nzSm(.93,1,t));
  const n=.5*Math.sin(x*.013+1.3)*Math.cos(z*.011+.4)+.28*Math.sin(x*.031+z*.022)+.14*Math.cos(z*.06-x*.011)+.35*Math.sin(z*.0042+x*.002);return b+amp*(n+.55)*.8}
function nzLand(x,z){let h=nzRaw(x,z);
  for(const T of NZTOWNS){if(!T.f)continue;const d=Math.hypot(x-T.x,z-T.z);if(d<T.r){if(T.h==null)T.h=Math.max(1.6,nzRaw(T.x,T.z));h=lerp(h,T.h,1-nzSm(T.r*.55,T.r,d))}}
  if(z<RIV_Z0+60&&z>LON_Z){const hw=nzRiverHW(z),rx=nzRiverX(z),d=Math.abs(x-rx);const pd=Math.hypot(x-nzRiverX(RIV_Z0),z-RIV_Z0-6);
    if(d<hw+75||pd<60){const on=nzSm(RIV_Z0+6,RIV_Z0-6,z)*nzSm(LON_Z,LON_Z+12,z);const v=Math.max((1-nzSm(hw-1,hw+14,d))*on,1-nzSm(9,20,pd));const near=Math.max(nzSm(hw+40,hw+14,d)*on,1-nzSm(20,40,pd)),fl=Math.max(nzSm(hw+75,hw+16,d)*on,1-nzSm(24,60,pd));
      h=lerp(h,1.5+Math.sin(z*.05)*.3,fl);h=lerp(lerp(h,Math.max(h,1.2),near),-1.4,v)}}
  return h}
function nzGround(x,z){const l=lotAt(x,z);if(l)return roofH(l,x,z);
  if(z>CAL_SHORE)return z>-2158?0:lerp(0,-.35,(-2158-z)/34);
  if(z>CLIFF_Z){if(Math.abs(x-60)<4.2&&z>-2292)return 1.2;return z<CLIFF_Z+15?-.3:-.85}
  if(z>LON_Z-2)return nzLand(x,z);
  if(Math.abs(z-TH_Z)<TH_W)return LBR.some(b=>Math.abs(x-b)<5)?.5:-.85;return 0}
function nzWater(x,z){if(z<=CAL_SHORE&&z>CLIFF_Z+15)return !(Math.abs(x-60)<4.2&&z>-2292);
  if(z<=CLIFF_Z&&z>LON_Z-2)return (nzRiverOn(z)&&Math.abs(x-nzRiverX(z))<nzRiverHW(z)-.3)||Math.hypot(x-nzRiverX(RIV_Z0),z-RIV_Z0-6)<13;
  if(z<=LON_Z-2)return Math.abs(z-TH_Z)<TH_W-.15&&!LBR.some(b=>Math.abs(x-b)<5);return false}
{const _g=groundAt;groundAt=function(x,z,y){if(MODE!=='open'&&z<-1500)return nzGround(x,z);return _g.apply(this,arguments)}}
{const _w=stWater;stWater=function(x,z){if(MODE!=='open'&&z<-1500)return nzWater(x,z);return _w(x,z)}}
{const _v=validSpot;validSpot=function(x,z,m){if(MODE!=='open'&&CH2.zone==='north'&&nzWater(x,z))return false;return _v.apply(this,arguments)}}
{const _ss=spawnStones;spawnStones=function(n){_ss(n);for(const s of stones)if(s.g)s.g.position.y=groundAt(s.g.position.x,s.g.position.z)}}

/* ---------- materials & small builders ---------- */
function nzM(){if(NZ.M)return NZ.M;const M=Object.assign({},c2m());
  const nz=(w,h,base,fn)=>mkCanvas(w,h,(x)=>{x.fillStyle=base;x.fillRect(0,0,w,h);fn&&fn(x)});
  M.chalk=std({map:rep(new THREE.CanvasTexture(nz(256,128,'#e8e6dc',x=>{for(let k=0;k<160;k++){x.fillStyle=`rgba(${rand(120,170)|0},${rand(120,160)|0},${rand(110,140)|0},${rand(.08,.3)})`;x.fillRect(rand(0,256),0,rand(1,4),128)}for(let k=0;k<90;k++){x.fillStyle='rgba(40,40,50,.5)';x.fillRect(rand(0,256),rand(0,128),2,2)}})),8,1),roughness:.95,emissive:0x1a1a1e});
  M.sand=std({map:rep(new THREE.CanvasTexture(nz(128,128,'#5e5444',x=>{for(let k=0;k<700;k++){x.fillStyle=`rgba(${rand(60,140)|0},${rand(50,120)|0},${rand(40,90)|0},.25)`;x.fillRect(rand(0,128),rand(0,128),1,1)}})),40,6),roughness:1,envMapIntensity:.15});
  const wt=waterTex.clone(),wn=waterN.clone();wt.needsUpdate=wn.needsUpdate=true;wt.repeat.set(22,40);wn.repeat.set(22,40);NZ.seaT=[wt,wn];
  M.sea=std({map:wt,normalMap:wn,color:0x6a8aa8,roughness:.12,metalness:.55,emissive:0xffffff,emissiveMap:wt,emissiveIntensity:.28,envMapIntensity:1.3});
  M.brick=std({color:0x8a4a3a,roughness:.85,map:rep(new THREE.CanvasTexture(nz(64,64,'#9a5644',x=>{x.fillStyle='rgba(40,20,16,.5)';for(let r=0;r<16;r++){x.fillRect(0,r*4,64,1);for(let c=0;c<8;c++)x.fillRect(c*8+(r%2)*4,r*4,1,4)}})),4,8)});
  M.white=std({color:0xe6e2d6,roughness:.8});M.slate=std({color:0x3a3c48,roughness:.7,metalness:.2});M.ben=std({color:0xc8b07a,roughness:.75,emissive:0x1a1408,map:M.stone.map});
  M.steel=std({color:0x7aa0c8,roughness:.4,metalness:.6});M.lead=std({color:0xa8b4b0,roughness:.5,metalness:.4});M.red=std({color:0xc01818,roughness:.45,emissive:0x200000});
  M.grass=std({color:0x3a5a30,roughness:1});M.glow=(c,o)=>new THREE.MeshBasicMaterial({color:c,transparent:true,opacity:o||.8,blending:THREE.AdditiveBlending,depthWrite:false});
  M.win=[0,1,2].map(v=>{const map=nz(64,64,'#e8e2d4',x=>{x.fillStyle='#2a2a36';for(const r of[10,38])for(const c of[8,26,44])x.fillRect(c,r,12,16)});
    const em=nz(64,64,'#000',x=>{for(const r of[10,38])for(const c of[8,26,44])if(Math.random()<.4){x.fillStyle=Math.random()<.85?'#ffc870':'#a8c8ff';x.fillRect(c+1,r+1,10,14)}});
    return std({map:new THREE.CanvasTexture(map),emissive:0xffffff,emissiveMap:new THREE.CanvasTexture(em),emissiveIntensity:.75,roughness:.85})});
  return NZ.M=M}
function nzGroundMat(w,d){const og=scene.getObjectByName('groundMain');if(!og)return std({color:0x4a4658,roughness:1});const m=og.material.clone();
  for(const k of['map','normalMap','roughnessMap'])if(m[k]){m[k]=m[k].clone();m[k].repeat.set(m[k].repeat.x*w/484,m[k].repeat.y*d/572);m[k].needsUpdate=true}return m}
function nzLot(x0,x1,z0,z1,h,base,roof,hm){const L={x0,x1,z0,z1,x:(x0+x1)/2,z:(z0+z1)/2,W:(x1-x0)/2,D:(z1-z0)/2,h,hm:hm||0,roof:roof||'flat',base:base||0};
  for(let i=Math.round((x0-GOX)/PITCH)-1;i<=Math.round((x1-GOX)/PITCH)+1;i++)for(let j=Math.round((z0-GOZ)/PITCH)-1;j<=Math.round((z1-GOZ)/PITCH)+1;j++){const k=i*1000+j;const a=blockLots.get(k)||[];a.push(L);blockLots.set(k,a)}return L}
function nzBox(G,w,h,d,x,y,z,mat,col){const m=c2box(G,w,h,d,x,y,z,mat,false);if(col){boxes.push({x0:x-w/2,x1:x+w/2,z0:z-d/2,z1:z+d/2,h:y+h,nz:1});nzLot(x-w/2,x+w/2,z-d/2,z+d/2,h,y)}NZ.mapR.push([x-w/2,z-d/2,w,d]);return m}
function nzCyl(G,rt,rb,h,x,y,z,mat,seg){const m=new THREE.Mesh(new THREE.CylinderGeometry(rt,rb,h,seg||16),mat);m.position.set(x,y+h/2,z);m.castShadow=m.receiveShadow=true;G.add(m);return m}
function nzCone(G,r,h,x,y,z,mat,seg,ry){const m=new THREE.Mesh(new THREE.ConeGeometry(r,h,seg||4),mat);m.position.set(x,y+h/2,z);m.rotation.y=ry==null?Math.PI/4:ry;m.castShadow=true;G.add(m);return m}
function nzGlow(G,c,s,o,x,y,z){const g=glowSprite(c,s,o);g.position.set(x,y,z);G.add(g);return g}
/* houses: instanced bodies with lit windows + gable roofs, tinted per instance */
function nzHouses(G,list){const M=nzM();if(!list.length)return;const bg=new THREE.BoxGeometry(1,1,1);bg.translate(0,.5,0);
  const sh=new THREE.Shape();sh.moveTo(-.5,0);sh.lineTo(.5,0);sh.lineTo(0,1);sh.lineTo(-.5,0);const pg=new THREE.ExtrudeGeometry(sh,{depth:1,bevelEnabled:false});pg.translate(0,0,-.5);
  const o=new THREE.Object3D(),col=new THREE.Color();
  for(let v=0;v<3;v++){const L=list.filter((h,i)=>i%3===v);if(!L.length)continue;const B=new THREE.InstancedMesh(bg,M.win[v],L.length),R=new THREE.InstancedMesh(pg,std({roughness:.8}),L.length);
    L.forEach((h,i)=>{o.position.set(h.x,h.y||0,h.z);o.rotation.set(0,0,0);o.scale.set(h.w,h.h,h.d);o.updateMatrix();B.setMatrixAt(i,o.matrix);B.setColorAt(i,col.setHex(h.c));
      const along=h.w>h.d;o.position.set(h.x,(h.y||0)+h.h,h.z);o.rotation.y=along?Math.PI/2:0;o.scale.set((along?h.d:h.w)+.7,h.rh,(along?h.w:h.d)+.7);o.updateMatrix();R.setMatrixAt(i,o.matrix);R.setColorAt(i,col.setHex(h.rc));
      boxes.push({x0:h.x-h.w/2,x1:h.x+h.w/2,z0:h.z-h.d/2,z1:h.z+h.d/2,h:(h.y||0)+h.h+h.rh*.6,nz:1});nzLot(h.x-h.w/2-.3,h.x+h.w/2+.3,h.z-h.d/2-.3,h.z+h.d/2+.3,h.h,h.y||0,'tile',h.rh);NZ.mapR.push([h.x-h.w/2,h.z-h.d/2,h.w,h.d])});
    B.instanceMatrix.needsUpdate=R.instanceMatrix.needsUpdate=true;B.castShadow=B.receiveShadow=R.castShadow=true;G.add(B);G.add(R)}}
function nzTrees(G,list){if(!list.length)return;const lm=std({color:0x2e4a30,roughness:.9}),tm=std({color:0x3a2a20,roughness:1});CITY_PARENT=G;
  instanced(new THREE.CylinderGeometry(.18,.3,2.8,6),tm,list,(o,t)=>{o.position.set(t[0],t[3]+1.4*t[2],t[1]);o.scale.setScalar(t[2])});
  for(const off of[[0,3.8,0,1],[.8,3.3,.3,.72],[-.6,4.2,-.4,.68]])instanced(new THREE.IcosahedronGeometry(1.9,1),lm,list,(o,t)=>{o.position.set(t[0]+off[0]*t[2],t[3]+off[1]*t[2],t[1]+off[2]*t[2]);o.scale.setScalar(t[2]*off[3])});CITY_PARENT=null}
function nzMistWall(G,z,col,H){const mat=new THREE.ShaderMaterial({uniforms:{uT:{value:0},uC:{value:new THREE.Color(col)}},transparent:true,depthWrite:false,blending:THREE.AdditiveBlending,side:THREE.DoubleSide,fog:false,
    vertexShader:'varying vec2 vU;varying vec3 vW;void main(){vU=uv;vW=(modelMatrix*vec4(position,1.)).xyz;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}',
    fragmentShader:'uniform float uT;uniform vec3 uC;varying vec2 vU;varying vec3 vW;void main(){float n=sin(vW.x*.09+uT*.7)*sin(vW.y*.13-uT*.5)+sin(vW.x*.031-uT*.3+vW.y*.05);float a=(.18+.12*n)*smoothstep(0.,.15,vU.y)*(1.-smoothstep(.35,1.,vU.y))*(.25+.75*exp(-pow(distance(vW,cameraPosition)*.006,2.)));gl_FragColor=vec4(uC*(1.+n*.4),a);}'});
  const m=new THREE.Mesh(new THREE.PlaneGeometry(1800,H||70),mat);m.position.set(0,(H||70)/2-4,z);G.add(m);NZ.anim.push(dt=>mat.uniforms.uT.value+=dt);return m}
function nzPortal(at,col){const g=new THREE.Group();g.position.copy(at);const c=col||0xff3a4a;
  const disc=mkCanvas(128,128,(x)=>{const gr=x.createRadialGradient(64,64,4,64,64,62);gr.addColorStop(0,'rgba(255,240,240,1)');gr.addColorStop(.35,'rgba(255,60,80,.85)');gr.addColorStop(.8,'rgba(120,0,30,.5)');gr.addColorStop(1,'rgba(0,0,0,0)');x.fillStyle=gr;x.fillRect(0,0,128,128);x.strokeStyle='rgba(255,200,200,.6)';x.lineWidth=3;for(let k=0;k<6;k++){x.beginPath();x.arc(64,64,14+k*8,k,k+2.2);x.stroke()}});
  const d=new THREE.Mesh(new THREE.CircleGeometry(2.1,40),new THREE.MeshBasicMaterial({map:new THREE.CanvasTexture(disc),transparent:true,blending:THREE.AdditiveBlending,depthWrite:false,side:THREE.DoubleSide}));d.position.y=2.4;g.add(d);
  const r=new THREE.Mesh(new THREE.TorusGeometry(2.2,.12,8,48),new THREE.MeshBasicMaterial({color:c}));r.position.y=2.4;g.add(r);const gl=glowSprite(c,9,.6);gl.position.y=2.4;g.add(gl);
  g.userData.tick=dt=>{d.rotation.z-=dt*2.2;const s=1+Math.sin(performance.now()*.006)*.04;d.scale.set(s,s,1);if(Math.random()<.5)SP.emit(V3(at.x+rand(-1.6,1.6),at.y+rand(.6,4.2),at.z),{c0:0xffd0d0,c1:c,s0:.35,s1:.05,life:.7,speed:.6})};scene.add(g);return g}

/* ---------- Calais ---------- */
function nzCalais(G){const M=nzM();const gm=c2plane(G,540,112,0,-.02,-2104,nzGroundMat(540,112));gm.material.color.setHex(0x8a8494);
  c2plane(G,540,40,0,-.18,-2176,M.sand).rotation.x=-Math.PI/2-.0105;c2box(G,540,.7,1.2,0,-.2,-2158.6,M.plain,false);
  const H=[],rnd=()=>Math.random(),cols=[0x9a5040,0xb8a88a,0xd8d0c0,0x7a4a3a,0xa8b0b8,0xc89a70],rcs=[0x3a3c48,0x7a3a2a,0x4a4a52];
  for(const[z,d] of[[-2144,10],[-2120,12],[-2096,12],[-2072,12]])for(let x=-258;x<=258;){const w=rand(7,11);if(!(Math.abs(x+90)<16&&z>-2150)&&!(Math.abs(x-20)<26&&z>-2112&&z<-2084)&&Math.abs(x-60)>7&&Math.abs(x)%48>8)H.push({x:x+w/2,z,w:w-.6,d,h:rand(7,11),rh:rand(2.4,3.6),c:cols[(rnd()*6)|0],rc:rcs[(rnd()*3)|0]});x+=w}
  nzHouses(G,H);
  /* Hôtel de Ville and its belfry */
  nzBox(G,34,13,14,20,0,-2098,M.brick,true);nzBox(G,7,46,7,20,0,-2090,M.brick,true);for(const y of[12,24,36])c2box(G,7.4,.6,7.4,20,y,-2090,M.plain,false);
  const ck=nzClockTex();for(const[dx,dz,ry]of[[0,3.75,0],[0,-3.75,Math.PI],[3.75,0,Math.PI/2],[-3.75,0,-Math.PI/2]]){const f=new THREE.Mesh(new THREE.CircleGeometry(2.4,28),new THREE.MeshBasicMaterial({map:ck}));f.position.set(20+dx,41,-2090+dz);f.rotation.y=ry;G.add(f)}
  nzCone(G,5.4,12,20,46,-2090,M.copper);nzGlow(G,0xffe0a0,10,.35,20,41,-2090);NZ.mapP.push([20,-2090]);
  /* the lighthouse */
  nzCyl(G,2.6,3.6,38,-90,0,-2130,M.white,8);boxes.push({x0:-93.5,x1:-86.5,z0:-2133.5,z1:-2126.5,h:44,nz:1});nzLot(-93,-87,-2133,-2127,42.5,0);nzCyl(G,2.3,2.3,4,-90,38,-2130,M.glow(0xffe8a0,.6),8);nzCone(G,2.8,3,-90,42,-2130,M.dark,8,0);
  const piv=new THREE.Group();piv.position.set(-90,40,-2130);G.add(piv);const bm=new THREE.Mesh(new THREE.ConeGeometry(5,90,20,1,true),M.glow(0xfff0b0,.09));bm.geometry.translate(0,-45,0);bm.rotation.z=Math.PI/2;piv.add(bm);
  const bm2=bm.clone();bm2.rotation.z=-Math.PI/2;piv.add(bm2);nzGlow(G,0xffe8a0,14,.8,-90,40,-2130);NZ.anim.push(dt=>piv.rotation.y+=dt*.6);NZ.mapP.push([-90,-2130]);
  /* the jetty */
  c2box(G,8,.4,104,60,.8,-2240,std({color:0x5a4634,roughness:.9}),false);for(let z=-2192;z>=-2290;z-=8)for(const s of[-1,1]){nzCyl(G,.22,.22,2.6,60+s*3.8,-1.4,z,M.dark,6);if(z%16===0)nzGlow(G,0xffc070,2.4,.8,60+s*3.6,2.6,z)}
  nzGlow(G,0x60ff90,4,.9,60,3.2,-2290);
  /* beach huts */
  const hut=[];for(let x=-250;x<=250;x+=6.5)if(Math.abs(x-60)>8&&Math.abs(x+90)>8)hut.push({x,z:-2166,w:3,d:3,h:2.6,rh:1.2,c:[0xd84a4a,0x4a8ad8,0xf0d040,0x5ac080,0xf0f0f0][(Math.random()*5)|0],rc:0xf0f0f0});nzHouses(G,hut);
  /* a ferry asleep at the harbour */
  const fy=new THREE.Group();fy.position.set(200,0,-2222);G.add(fy);const hull=new THREE.Mesh(new THREE.BoxGeometry(48,6,11),M.white);hull.position.y=1.5;fy.add(hull);const st=new THREE.Mesh(new THREE.BoxGeometry(30,5,9),M.white);st.position.set(-3,7,0);fy.add(st);
  const fn=new THREE.Mesh(new THREE.CylinderGeometry(1.6,1.8,5,12),M.red);fn.position.set(-8,12,0);fy.add(fn);for(let k=0;k<12;k++)for(const s of[-1,1]){const w=glowSprite(0xfff0c0,1,.8);w.position.set(-16+k*2.6,7.5,s*4.6);fy.add(w)}
  for(let k=0;k<26;k++)nzGlow(G,0xffb060,3,.9,rand(-250,250),5,rand(-2060,-2150));NZ.mapR.push([176,-2228,48,11])}
function nzClockTex(){if(NZ.ck)return NZ.ck;const c=mkCanvas(128,128,(x)=>{x.fillStyle='#f6ecd0';x.beginPath();x.arc(64,64,62,0,TAU);x.fill();x.strokeStyle='#2a2418';x.lineWidth=4;x.stroke();x.lineWidth=1.5;x.beginPath();x.arc(64,64,48,0,TAU);x.stroke();
  x.fillStyle='#2a2418';for(let k=0;k<12;k++){const a=k/12*TAU;x.save();x.translate(64+Math.sin(a)*54,64-Math.cos(a)*54);x.rotate(a);x.fillRect(-2,-6,4,12);x.restore()}x.fillRect(62,22,4,44);x.save();x.translate(64,64);x.rotate(2.2);x.fillRect(-2,-34,4,34);x.restore()});return NZ.ck=new THREE.CanvasTexture(c)}

/* ---------- the Channel ---------- */
function nzSea(G){const M=nzM();const sea=c2plane(G,600,CAL_SHORE-CLIFF_Z+7,0,.05,(CAL_SHORE+7+CLIFF_Z)/2,M.sea);sea.receiveShadow=false;
  const cm=new THREE.ShaderMaterial({uniforms:{uT:{value:0}},transparent:true,depthWrite:false,blending:THREE.AdditiveBlending,
    vertexShader:'varying vec3 vW;void main(){vW=(modelMatrix*vec4(position,1.)).xyz;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}',
    fragmentShader:'uniform float uT;varying vec3 vW;void main(){vec2 p=vW.xz*.045;float n=sin(p.x*3.1+uT*.6+sin(p.y*2.3+uT*.4))*sin(p.y*2.7-uT*.5+sin(p.x*1.7));float c=smoothstep(.55,1.,n)*.5+smoothstep(-.2,.9,n)*.06;float edge=(1.-smoothstep(-6520.,-6450.,vW.z))*smoothstep(-7010.,-6960.,vW.z);float fd=exp(-pow(distance(vW,cameraPosition)*.0105,2.));gl_FragColor=vec4(vec3(.2,1.,.55)*c*edge*fd,1.);}'});
  const cp=c2plane(G,600,560,0,.12,-6725,cm);cp.renderOrder=2;NZ.anim.push(dt=>cm.uniforms.uT.value+=dt);
  nzMistWall(G,CURSE_Z,0x30ff90,64);for(let x=-250;x<=250;x+=36){nzCyl(G,.5,.7,2.2,x,-.6,CURSE_Z,M.red,8);nzGlow(G,0xff3030,3,.9,x,2.2,CURSE_Z)}
  /* a wreck and a drowned mast in the cursed water */
  const wr=new THREE.Group();wr.position.set(-36,-1.2,-6640);wr.rotation.set(.25,.6,.35);G.add(wr);const hm=std({color:0x2a2018,roughness:1});const hb=new THREE.Mesh(new THREE.BoxGeometry(5,3,18),hm);wr.add(hb);
  const ms=new THREE.Mesh(new THREE.CylinderGeometry(.2,.28,16,6),hm);ms.position.set(0,8,2);ms.rotation.z=.2;wr.add(ms);const yd=new THREE.Mesh(new THREE.BoxGeometry(7,.2,.2),hm);yd.position.set(.8,12,2);wr.add(yd);nzGlow(G,0x50ff90,10,.5,-36,2,-6640);
  nzCyl(G,.2,.3,14,96,-2,-6830,hm,6).rotation.z=-.3;nzGlow(G,0x50ff90,6,.45,96,6,-6830);NZ.mapP.push([-36,-6640]);
  for(let k=0;k<26;k++){const w=glowSprite(0x60ff9a,rand(1.2,2.4),.85);w.userData={ph:Math.random()*TAU,o:V3(rand(-40,40),rand(1,4),rand(-60,20))};NZ.g.add(w);NZ.wisps.push(w)}
  /* the Kent coast: low cliffs at Folkestone, the great white cliffs at Dover */
  const cg=new THREE.PlaneGeometry(560,34,140,10);const pa=cg.attributes.position;for(let i=0;i<pa.count;i++){const x=pa.getX(i),y=pa.getY(i),H=nzCoastH(x);const wy=-3+(y+17)/34*(H+3);pa.setY(i,wy);pa.setZ(i,Math.sin(x*.07)*1.6+Math.sin(x*.23+y*.3)*.8+(y>15?-1.2:0)+(H<20?Math.sin(x*.4)*.5:0))}cg.computeVertexNormals();
  const cl=new THREE.Mesh(cg,M.chalk);cl.position.set(0,0,CLIFF_Z+.5);cl.receiveShadow=true;G.add(cl);c2plane(G,560,16,0,-.28,CLIFF_Z+8,M.sand);
  for(let x=-280;x<280;x+=10)boxes.push({x0:x,x1:x+10,z0:CLIFF_Z-5,z1:CLIFF_Z,h:nzCoastH(x+5)-.4,nz:1});
  /* Folkestone harbour arm and its lighthouse */
  {const st=M.stone;for(let z=CLIFF_Z+14;z<CLIFF_Z+150;z+=12)nzBox(G,7,2.6,12.4,-96,-.8,z,st,true);for(let x=-90;x<-56;x+=12)nzBox(G,12.4,2.6,7,x,-.8,CLIFF_Z+150,st,true);
    nzCyl(G,1.6,2,10,-58,1.8,CLIFF_Z+150,M.white,10);nzCyl(G,1.9,1.9,2,-58,11.8,CLIFF_Z+150,M.red,10);NZ.light=nzGlow(G,0xfff0c0,10,.9,-58,12.8,CLIFF_Z+150);NZ.mapP.push([-58,CLIFF_Z+150]);
    NZ.anim.push(dt=>{NZ.light.material.opacity=.45+.5*Math.max(0,Math.sin(performance.now()*.0025))});
    for(let k=0;k<12;k++)nzGlow(G,0xffd890,2.2,.8,-96+(k%2?3.2:-3.2),2.6,CLIFF_Z+16+k*12)}
  /* Dover's port under the cliffs: docks, cranes, a ferry asleep at the quay */
  {const st=M.stone;nzBox(G,46,2.4,90,246,-.6,CLIFF_Z+56,st,true);const crm=std({color:0xd08a30,roughness:.6,metalness:.4});
    for(const z of[CLIFF_Z+30,CLIFF_Z+72]){nzBox(G,2.4,22,2.4,238,1.8,z,crm,false);const jib=c2box(G,2.2,1.6,26,238,23,z+8,crm,false);jib.rotation.x=-.08;nzGlow(G,0xff4040,2,.9,238,25,z+20)}
    const hull=std({color:0x2a2e3a,roughness:.7}),wh=std({color:0xd8d4c8,roughness:.6});c2box(G,11,3,46,212,1,CLIFF_Z+70,hull,false);c2box(G,9,4.4,26,212,4.4,CLIFF_Z+66,wh,false);c2box(G,9.2,.5,24,212,5.8,CLIFF_Z+66,std({color:0x302818,emissive:0xffd07a,emissiveIntensity:1.1}),false);
    for(let k=0;k<8;k++)nzGlow(G,0xffd890,2,.8,226+(k%4)*12,2.4,CLIFF_Z+18+Math.floor(k/4)*70)}}

/* ---------- England ---------- */
function nzCountry(G){const M=nzM();const Z0=CLIFF_Z,Z1=LON_Z-2;
  const inTown=(x,z,pad)=>NZTOWNS.some(T=>Math.hypot(x-T.x,z-T.z)<T.r+(pad||0));
  const nearRiver=(x,z,p)=>(nzRiverOn(z)&&Math.abs(x-nzRiverX(z))<nzRiverHW(z)+p)||Math.hypot(x-nzRiverX(RIV_Z0),z-RIV_Z0-6)<18+p;
  const nearRoad=(x,z,p)=>Math.abs(x-nzRoadX(z))<p;
  /* ---- the patchwork: rows of fields with hedges between them ---- */
  const FT=[['#466a2e',null,5,'grass'],['#58783a',null,3,'grass'],['#3c5c2a',null,2,'grass'],['#8a7e3e','#a08e46',2,'wheat'],['#5e4a30','#735a3c',1.4,'plough'],['#a8a434','#c4bc40',.6,'rape'],['#25391e',null,1.3,'wood'],['#6e7e3c','#7a8a44',1.4,'barley']];
  const pickFT=()=>{let s=0;for(const f of FT)s+=f[2];let r=Math.random()*s;for(const f of FT){r-=f[2];if(r<=0)return f}return FT[0]};
  const rows=[];{let z=Z0-24;while(z>Z1+16){const dz=rand(38,62);const xs=[-272];let x=-272;while(x<272){x+=rand(42,80);xs.push(Math.min(x,272))}rows.push({z0:z,z1:Math.max(Z1+16,z-dz),xs});z-=dz}}
  const cells=[];for(const R of rows)for(let i=0;i<R.xs.length-1;i++){const c={x0:R.xs[i],x1:R.xs[i+1],z0:R.z0,z1:R.z1,f:pickFT(),a:Math.random()<.5};const cx=(c.x0+c.x1)/2,cz=(c.z0+c.z1)/2;if(inTown(cx,cz,-10)||(z=>z>Z0-60)(cz))c.f=FT[0];c.cx=cx;c.cz=cz;cells.push(c)}
  /* ---- terrain, in four painted chunks ---- */
  const NC=4,CD=(Z0-Z1)/NC;
  for(let ci=0;ci<NC;ci++){const za=Z0-ci*CD,zb=za-CD,zc=(za+zb)/2;const TW=1024,TH=1024,U=v=>(v+270)/540*TW,V=v=>(za-v)/CD*TH,px=TW/540;
    const tex=mkCanvas(TW,TH,x=>{x.fillStyle='#3e5e2c';x.fillRect(0,0,TW,TH);
      for(const c of cells){if(c.z1>za+2||c.z0<zb-2)continue;const X0=U(c.x0),X1=U(c.x1),Y0=V(c.z0),Y1=V(c.z1);x.fillStyle=c.f[0];x.fillRect(X0,Y0,X1-X0,Y1-Y0);
        if(c.f[1]){x.strokeStyle=c.f[1];x.lineWidth=1.4;x.beginPath();if(c.a)for(let y=Y0+2;y<Y1;y+=3.2){x.moveTo(X0,y);x.lineTo(X1,y)}else for(let q=X0+2;q<X1;q+=3.2){x.moveTo(q,Y0);x.lineTo(q,Y1)}x.stroke()}
        for(let k=0;k<(c.f[3]==='wood'?90:28);k++){const r=c.f[3]==='wood'?rand(2,6):rand(.6,2.2);x.fillStyle=c.f[3]==='wood'?'rgba(10,22,10,.5)':Math.random()<.5?'rgba(255,255,210,.06)':'rgba(0,0,0,.08)';x.beginPath();x.arc(rand(X0,X1),rand(Y0,Y1),r,0,TAU);x.fill()}
        x.strokeStyle='rgba(10,22,8,.85)';x.lineWidth=3;x.strokeRect(X0,Y0,X1-X0,Y1-Y0)}
      for(let k=0;k<9000;k++){x.fillStyle=Math.random()<.5?'rgba(255,255,220,.05)':'rgba(0,0,0,.07)';x.fillRect(rand(0,TW),rand(0,TH),1,1)}
      for(const T of NZTOWNS){if(T.z>za+T.r||T.z<zb-T.r)continue;const g=x.createRadialGradient(U(T.x),V(T.z),2,U(T.x),V(T.z),T.r*px);g.addColorStop(0,'rgba(86,120,58,1)');g.addColorStop(.75,'rgba(70,104,48,.9)');g.addColorStop(1,'rgba(62,94,44,0)');x.fillStyle=g;x.beginPath();x.arc(U(T.x),V(T.z),T.r*px,0,TAU);x.fill()}
      const path=(fx,w,col,z0,z1)=>{x.strokeStyle=col;x.lineWidth=w*px;x.lineCap='round';x.lineJoin='round';x.beginPath();let first=true;for(let z=Math.min(z0,za+8);z>Math.max(z1,zb-8);z-=4){const q=fx(z);if(first){x.moveTo(U(q),V(z));first=false}else x.lineTo(U(q),V(z))}x.stroke()};
      path(nzRiverX,(nzRiverHW(Z0-1400)+6)*2,'#4a4230',RIV_Z0+4,LON_Z+4);path(nzRiverX,nzRiverHW(Z0-1400)*2,'#1e3650',RIV_Z0+2,LON_Z+4);
      path(nzRoadX,7,'#5e5a4c',Z0-4,LON_Z);path(nzRoadX,4.8,'#3e3c38',Z0-4,LON_Z)});
    const t=new THREE.CanvasTexture(tex);t.anisotropy=8;
    const tg=new THREE.PlaneGeometry(540,CD+2,135,Math.round(CD/4));tg.rotateX(-Math.PI/2);tg.translate(0,0,zc);const pa=tg.attributes.position;for(let i=0;i<pa.count;i++)pa.setY(i,nzLand(pa.getX(i),pa.getZ(i)));tg.computeVertexNormals();
    const tm=new THREE.Mesh(tg,std({map:t,roughness:.95,emissive:0xffffff,emissiveMap:t,emissiveIntensity:.13}));tm.receiveShadow=true;tm.name='nzLand';G.add(tm)}
  /* ---- the river: a proper ribbon of water, a spring pond, reeds ---- */
  {const wt=waterN.clone();wt.needsUpdate=true;wt.wrapS=wt.wrapT=THREE.RepeatWrapping;const rm=std({color:0x2c4862,roughness:.06,metalness:.75,normalMap:wt,normalScale:new THREE.Vector2(.55,.55),emissive:0x081624,transparent:true,opacity:.93});
    const rp=[],uv=[],ri=[];let n=0,len=0,lx=null;for(let z=RIV_Z0+4;z>LON_Z+3;z-=3){const x=nzRiverX(z),w=nzRiverHW(z)+1.2;if(lx!=null)len+=Math.hypot(x-lx,3);lx=x;rp.push(x-w,.2,z,x+w,.2,z);uv.push(0,len/12,1,len/12);if(n){const a=(n-1)*2;ri.push(a,a+2,a+1,a+1,a+2,a+3)}n++}
    const rg=new THREE.BufferGeometry();rg.setAttribute('position',new THREE.Float32BufferAttribute(rp,3));rg.setAttribute('uv',new THREE.Float32BufferAttribute(uv,2));rg.setIndex(ri);rg.computeVertexNormals();
    const rmesh=new THREE.Mesh(rg,rm);rmesh.name='nzRiver';rmesh.renderOrder=1;G.add(rmesh);
    const pond=new THREE.Mesh(new THREE.CircleGeometry(15,28),rm);pond.rotation.x=-Math.PI/2;pond.position.set(nzRiverX(RIV_Z0),.2,RIV_Z0+6);G.add(pond);
    NZ.anim.push(dt=>{wt.offset.y-=dt*.05;wt.offset.x+=dt*.01});
    const R=[];for(let z=RIV_Z0;z>LON_Z+10;z-=2.6)for(const s of[-1,1]){if(Math.random()<.45)continue;const x=nzRiverX(z)+s*(nzRiverHW(z)+rand(.4,2.4));if(inTown(x,z,-40))continue;R.push([x,z,rand(.7,1.4)])}
    CITY_PARENT=G;instanced(new THREE.ConeGeometry(.12,1.6,4),std({color:0x5a6a34,roughness:1}),R,(o,r)=>{o.position.set(r[0],nzLand(r[0],r[1])+.7*r[2],r[1]);o.scale.set(1,r[2],1);o.rotation.set(rand(-.2,.2),0,rand(-.2,.2))});CITY_PARENT=null}
  /* ---- the road: a country lane over the hills ---- */
  {const rp=[],uv=[],ri=[];let n=0,len=0,lx=null;for(let z=Z0-6;z>LON_Z;z-=3){const x=nzRoadX(z);if(nearRiver(x,z,1)&&!inTown(x,z,0))continue;if(lx!=null)len+=3;lx=x;for(const s of[-1,1]){const xx=x+s*2.4;rp.push(xx,nzLand(xx,z)+.07,z)}uv.push(0,len/6,1,len/6);if(n){const a=(n-1)*2;ri.push(a,a+2,a+1,a+1,a+2,a+3)}n++}
    const rt=mkCanvas(64,128,x=>{x.fillStyle='#3e3c3a';x.fillRect(0,0,64,128);for(let k=0;k<700;k++){x.fillStyle=Math.random()<.5?'rgba(255,255,255,.06)':'rgba(0,0,0,.12)';x.fillRect(rand(0,64),rand(0,128),1,1)}x.fillStyle='#5a564c';x.fillRect(0,0,4,128);x.fillRect(60,0,4,128);x.fillStyle='rgba(90,120,60,.5)';for(let k=0;k<40;k++)x.fillRect(Math.random()<.5?rand(0,6):rand(58,64),rand(0,128),2,3)});
    const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(rp,3));g.setAttribute('uv',new THREE.Float32BufferAttribute(uv,2));g.setIndex(ri);g.computeVertexNormals();
    const tx=new THREE.CanvasTexture(rt);tx.wrapT=THREE.RepeatWrapping;tx.anisotropy=8;const m=new THREE.Mesh(g,std({map:tx,roughness:.9,polygonOffset:true,polygonOffsetFactor:-2}));m.receiveShadow=true;G.add(m)}
  /* ---- hedgerows (3D), hedgerow oaks, woods ---- */
  const HG=[],T=[];const addHedge=(ax,az,bx,bz)=>{const L=Math.hypot(bx-ax,bz-az);const n=Math.max(1,Math.round(L/4.2));for(let k=0;k<n;k++){if(Math.random()<.05)continue;const t=(k+.5)/n,x=lerp(ax,bx,t),z=lerp(az,bz,t);
      if(z>Z0-14||inTown(x,z,-25)||nearRiver(x,z,4)||nearRoad(x,z,5.5))continue;HG.push([x,z,L/n+1.2,Math.atan2(bx-ax,bz-az),rand(1.2,2.1)]);if(Math.random()<.04)T.push([x+rand(-.6,.6),z+rand(-.6,.6),rand(1,1.6),nzLand(x,z)-.1])}};
  for(const R of rows){addHedge(-272,R.z0,272,R.z0);for(let i=1;i<R.xs.length-1;i++)addHedge(R.xs[i],R.z0,R.xs[i],R.z1)}
  {const hg=new THREE.IcosahedronGeometry(.62,1);hg.translate(0,.42,0);const p=hg.attributes.position;for(let i=0;i<p.count;i++){const k=1+rand(-.1,.1);p.setXYZ(i,p.getX(i)*k,Math.max(0,p.getY(i))*k,p.getZ(i)*k)}hg.computeVertexNormals();
    const im=new THREE.InstancedMesh(hg,std({color:0xffffff,roughness:1}),HG.length);const o=new THREE.Object3D(),col=new THREE.Color();HG.forEach((h,i)=>{o.position.set(h[0],nzLand(h[0],h[1])-.25,h[1]);o.rotation.set(0,h[3]+rand(-.15,.15),0);o.scale.set(rand(1.8,2.3),h[4]*1.2,h[2]*1.05);o.updateMatrix();im.setMatrixAt(i,o.matrix);im.setColorAt(i,col.setHSL(.27+rand(-.04,.03),.5,.16+rand(0,.07)))});
    im.receiveShadow=true;G.add(im)}
  for(const c of cells){if(c.f[3]!=='wood')continue;const n=Math.round((c.x1-c.x0)*(c.z0-c.z1)/95);for(let k=0;k<n;k++){const x=rand(c.x0+2,c.x1-2),z=rand(c.z1+2,c.z0-2);if(nearRiver(x,z,4)||nearRoad(x,z,6)||inTown(x,z,-10))continue;T.push([x,z,rand(.9,1.7),nzLand(x,z)-.1])}}
  for(let k=0;k<160;k++){const x=rand(-262,262),z=rand(Z0-30,Z1+12);if(nearRiver(x,z,5)||nearRoad(x,z,6)||inTown(x,z,-10))continue;T.push([x,z,rand(.8,1.4),nzLand(x,z)-.1])}
  /* ---- farms, flocks, cattle, hay ---- */
  const H=[],S=[],C=[],B=[];let farms=0;
  for(const c of cells){const k=c.f[3];
    if(farms<46&&Math.random()<.11&&!inTown(c.cx,c.cz,30)&&!nearRiver(c.cx,c.cz,20)&&!nearRoad(c.cx,c.cz,10)&&c.cz<Z0-40){farms++;const x=c.cx,z=c.cz;const y=nzLand(x,z)-.3;H.push({x,z,w:rand(7,9),d:rand(5,6),h:rand(4,5),rh:rand(2.4,3),y,c:Math.random()<.5?0xe2dccc:0xa89070,rc:0x4a3a2c});H.push({x:x+rand(10,13),z:z+rand(-4,4),w:rand(10,13),d:rand(7,9),h:rand(4.6,5.6),rh:rand(2.6,3.4),y:nzLand(x+11,z)-.3,c:0x6a2a22,rc:0x3a3c40})}
    else if(k==='grass'&&Math.random()<.32){const n=(rand(3,9))|0;for(let q=0;q<n;q++){const x=rand(c.x0+3,c.x1-3),z=rand(c.z1+3,c.z0-3);if(!nearRiver(x,z,3)&&!nearRoad(x,z,4))S.push([x,z,nzLand(x,z)])}}
    else if(k==='grass'&&Math.random()<.12){const n=(rand(3,6))|0;for(let q=0;q<n;q++){const x=rand(c.x0+3,c.x1-3),z=rand(c.z1+3,c.z0-3);if(!nearRiver(x,z,3)&&!nearRoad(x,z,4))C.push([x,z,nzLand(x,z),rand(0,TAU),Math.random()<.5])}}
    else if((k==='wheat'||k==='barley')&&Math.random()<.22){const n=(rand(4,9))|0;for(let q=0;q<n;q++){const x=rand(c.x0+3,c.x1-3),z=rand(c.z1+3,c.z0-3);B.push([x,z,nzLand(x,z),rand(0,TAU)])}}}
  CITY_PARENT=G;instanced(new THREE.SphereGeometry(.55,8,6),std({color:0xf0ece0,roughness:1}),S,(o,s)=>{o.position.set(s[0],s[2]+.6,s[1]);o.scale.set(1.25,.9,.9);o.rotation.y=s[0]});
  instanced(new THREE.SphereGeometry(.25,8,6),std({color:0x222020,roughness:1}),S,(o,s)=>{o.position.set(s[0]+Math.cos(s[0])*.7,s[2]+.75,s[1]-Math.sin(s[0])*.7)});
  {const im=instanced(new THREE.BoxGeometry(1.1,1,2.2),std({color:0xffffff,roughness:.95}),C,(o,c)=>{o.position.set(c[0],c[2]+1.05,c[1]);o.rotation.y=c[3]});const col=new THREE.Color();C.forEach((c,i)=>im.setColorAt(i,col.setHex(c[4]?0x2a2422:0x7a5034)))}
  instanced(new THREE.BoxGeometry(.6,.6,.7),std({color:0x1e1a18,roughness:.95}),C,(o,c)=>{o.position.set(c[0]+Math.sin(c[3])*1.3,c[2]+1.3,c[1]+Math.cos(c[3])*1.3);o.rotation.y=c[3]});
  instanced(new THREE.CylinderGeometry(.75,.75,1.2,12),std({color:0xc8a858,roughness:1}),B,(o,b)=>{o.position.set(b[0],b[2]+.72,b[1]);o.rotation.set(0,b[3],Math.PI/2)});CITY_PARENT=null;
  /* ---- Folkestone: terraces on the Leas, a church, lamps along the cliff ---- */
  const FK=NZTOWNS[0];for(let z=Z0-28;z>Z0-196;z-=14)for(let x=-92;x<72;x+=11){if(Math.random()<.22||nearRoad(x,z,8))continue;const w=rand(8,10),d=rand(7,8.5);const y=Math.min(nzLand(x-w/2,z),nzLand(x+w/2,z),nzLand(x,z-d/2),nzLand(x,z+d/2))-.25;
    H.push({x:x+rand(-.6,.6),z,w,d,h:rand(6,9),rh:rand(2.4,3),y,c:[0xe8e2d2,0xd8ccb8,0xc8b8a0,0xb06850,0xe8dcc0][(Math.random()*5)|0],rc:Math.random()<.6?0x3a3c46:0x5a4a3a})}
  {const cx=-48,cz=Z0-124,y=nzLand(cx,cz)-.3;nzBox(G,9,9,20,cx,y,cz,M.plain,true);nzBox(G,5.4,16,5.4,cx,y,cz+12,M.plain,true);nzCone(G,3.8,14,cx,y+16,cz+12,M.slate);nzGlow(G,0xffd080,5,.6,cx,y+6,cz-10.2)}
  for(let x=-100;x<=64;x+=10){nzCyl(G,.08,.1,3.6,x,nzLand(x,Z0-7),Z0-7,M.stone,6);nzGlow(G,0xffd890,1.8,.85,x,nzLand(x,Z0-7)+3.8,Z0-7)}
  /* ---- Dover: the castle on the cliff, a few streets below it ---- */
  {const cx=205,cz=Z0-74,y=nzLand(cx,cz)-.3;nzBox(G,16,18,16,cx,y,cz,M.stone,true);for(const a of[-1,1])for(const b of[-1,1])nzCyl(G,2,2.2,21,cx+a*8,y,cz+b*8,M.plain,10);
    for(const[w,d,x,z]of[[44,2,cx,cz-22],[44,2,cx,cz+22],[2,44,cx-22,cz],[2,44,cx+22,cz]])nzBox(G,w,6,d,x,y,z,M.plain,true);NZ.mapP.push([cx,cz]);NZ.dover=V3(cx,y+18,cz)}
  for(let k=0;k<16;k++){const x=rand(140,258),z=rand(Z0-130,Z0-210);if(nearRoad(x,z,8))continue;const y=nzLand(x,z)-.3;H.push({x,z,w:rand(6,8),d:rand(5,7),h:rand(4,6),rh:rand(2.2,2.8),y,c:0xd8ccb8,rc:0x3a3c46})}
  /* ---- three villages where the lane crosses the river ---- */
  const pubs=['The Drowned Hound','The Crow and Crown','The Kingsbridge Arms'];
  NZTOWNS.filter(t=>t.f).forEach((V,vi)=>{const vy=V.h!=null?V.h:nzLand(V.x,V.z);const hw=nzRiverHW(V.z);
    {const L=hw*2+12;nzBox(G,L,.9,7.2,V.x,vy-.6,V.z,M.stone,true);for(const s of[-1,1])nzBox(G,L,1,.6,V.x,vy+.3,V.z+s*3.3,M.stone,false);const a=new THREE.Mesh(new THREE.TorusGeometry(hw*.95,.9,8,20,Math.PI),M.stone);a.position.set(V.x,-1.2,V.z);G.add(a)}
    for(let s=-110;s<=110;s+=10){const z=V.z+s;const rx=nzRoadX(z);for(const side of[-1,1]){if(Math.random()<.3)continue;const x=rx+side*rand(9,13);if(nearRiver(x,z,8))continue;const w=rand(6,8),d=rand(5,6.5);const y=Math.min(nzLand(x-w/2,z),nzLand(x+w/2,z),nzLand(x,z-d/2),nzLand(x,z+d/2))-.25;
      H.push({x,z,w,d,h:rand(3.6,4.8),rh:rand(2.4,3.2),y,c:[0xe8e2d2,0xd4c4a4,0xb0a088,0xe8e0c8][(Math.random()*4)|0],rc:Math.random()<.5?0x5a4a30:0x3a3c46})}
      if(s%20===0&&Math.abs(s)<90){const lx=rx+5.2,ly=nzLand(lx,z);nzCyl(G,.08,.1,3.8,lx,ly,z,M.stone,6);nzGlow(G,0xffd890,2,.85,lx,ly+4,z)}}
    {const cx=V.x+34,cz=V.z-36,y=nzLand(cx,cz)-.3;nzBox(G,8,8,18,cx,y,cz,M.plain,true);nzBox(G,5,14,5,cx,y,cz+10,M.plain,true);nzCone(G,3.6,12,cx,y+14,cz+10,M.slate);nzGlow(G,0xffd080,5,.6,cx,y+6,cz-9.2);NZ.mapP.push([cx,cz])}
    {const px=nzRoadX(V.z+48)-12,pz=V.z+48,y=nzLand(px,pz)-.25;H.push({x:px,z:pz,w:10,d:7,h:5,rh:3,y,c:0xf0e8d0,rc:0x2e2a2a});nzGlow(G,0xffb050,4,.9,px+5.4,y+3.4,pz);V.pub=pubs[vi]}});
  nzHouses(G,H);nzTrees(G,T);
  /* ---- the Crown stones: a ring that still hums, out on the downs ---- */
  {const cx=150,cz=Z0-1300,y=nzLand(cx,cz);NZ.stones=V3(cx,y,cz);const sm=std({color:0x6a6a70,roughness:.95});for(let k=0;k<12;k++){const a=k/12*TAU;const s=nzBox(G,1.6,5.2,1,cx+Math.cos(a)*11,y-.4,cz+Math.sin(a)*11,sm,false);s.rotation.y=-a}
    for(let k=0;k<6;k++){const a=k/6*TAU+.26;c2box(G,1.4,.9,5,cx+Math.cos(a)*11,y+4.8,cz+Math.sin(a)*11,sm,false).rotation.y=-a+Math.PI/2}const gl=nzGlow(G,0x50ff8a,20,.4,cx,y+3,cz);const rn=decal(runeTex,0x50ff8a,16,true,.6);rn.position.set(cx,y+.2,cz);G.add(rn);NZ.anim.push(dt=>{rn.rotation.z+=dt*.3;gl.material.opacity=.3+Math.sin(performance.now()*.002)*.12});NZ.mapP.push([cx,cz])}
  /* where the river meets the city: a stone arch */
  {const z=LON_Z+8,x=nzRiverX(z);const a=new THREE.Mesh(new THREE.TorusGeometry(nzRiverHW(z)+1,1.2,8,20,Math.PI),M.stone);a.position.set(x,-.6,z);G.add(a)}}

/* ---------- London ---------- */
function nzLondon(G){const M=nzM();c2plane(G,560,440,0,-.02,-9815,nzGroundMat(560,440));
  const th=c2plane(G,560,TH_W*2,0,.05,TH_Z,M.sea);th.material=M.sea;for(const s of[-1,1])c2box(G,560,1.4,.8,0,-1.1,TH_Z+s*(TH_W+.4),std({color:0x6a6458,roughness:.95,envMapIntensity:.2}),false);
  const resv=[[-206,-96,-9880,-9818],[0,72,-9940,-9864],[184,260,-9910,-9830],[-96,-24,-9790,-9730],[106,146,-9760,-9710]];
  const A=cityArrs(0);for(let i=-2;i<=11;i++)for(const j of[-123,-124,-125,-126,-129,-130,-131,-132]){const cx=-162+i*PITCH,cz=-162+j*PITCH+(LON_Z+4560);if(resv.some(r=>cx+14>r[0]&&cx-14<r[1]&&cz+14>r[2]&&cz-14<r[3]))continue;stCell(cx,cz,i,j,A);NZ.mapR.push([cx-14,cz-14,28,28])}
  A.columns.length=0;cityFlush(A,G,nzLondonStyle());nzChimPots(G,A.chims);
  for(let x=-264;x<=264;x+=12)if(!LBR.some(b=>Math.abs(x-b)<7))for(const s of[-1,1])A.lamps.push([x,TH_Z+s*(TH_W+1.6)]);lampFlush(A.lamps,G);for(const l of A.lamps)lampList.push(l);
  for(const b of LBR)nzBridge(G,b,b===-108?0x3a7a50:b===180?null:0x8a2a2a);
  nzBigBen(G);nzEye(G,-60,-9768);nzShard(G,126,-9732);nzStPauls(G,36,-9902);nzTowerBridge(G,180);nzTower(G);
  /* red buses and phone boxes */
  const bus=(x,z,ry)=>{const b=nzBus();b.position.set(x,0,z);b.rotation.y=ry;G.add(b);boxes.push({x0:x-2,x1:x+2,z0:z-5.5,z1:z+5.5,h:4.6,nz:1})};
  bus(-106,-9798,0);bus(70,-9806,0);bus(-0,-9684,Math.PI/2);bus(-144,-9720,0);
  const ph=[];for(let x=-216;x<=216;x+=72)for(const z of[-9648,-9756,-9864,-9972])ph.push([x+16.4,z+4]);CITY_PARENT=G;instanced(new THREE.BoxGeometry(1.1,2.6,1.1),M.red,ph,(o,p)=>{o.position.set(p[0],1.3,p[1])});
  instanced(new THREE.BoxGeometry(.9,.9,1.14),M.glow(0xfff0c0,.7),ph,(o,p)=>{o.position.set(p[0],1.9,p[1])});CITY_PARENT=null}
function nzBridge(G,x,rail){const M=nzM();const L=TH_W*2+4;const d=new THREE.Mesh(new THREE.BoxGeometry(10,.5,L),M.plain);d.position.set(x,.25,TH_Z);d.receiveShadow=true;G.add(d);
  if(rail){const rm=std({color:rail,roughness:.5,metalness:.3});for(const s of[-1,1]){c2box(G,.4,1,L,x+s*4.9,.5,TH_Z,rm,false);for(const z of[-12,0,12])nzGlow(G,0xffc070,2.4,.85,x+s*4.9,2.6,TH_Z+z)}
    for(const z of[-8,8]){const a=new THREE.Mesh(new THREE.TorusGeometry(7,.9,8,20,Math.PI),M.plain);a.rotation.y=Math.PI/2;a.position.set(x,-6.6,TH_Z+z);G.add(a)}}}
function nzBigBen(G){const M=nzM(),x=-118,z=-9832;NZ.bb=V3(x,0,z);
  nzBox(G,76,15,20,-160,0,-9834,M.ben,true);c2box(G,77,2,21,-160,15,-9834,M.slate,false);
  const pin=[];for(let px=-197;px<=-123;px+=3)for(const s of[-1,1])pin.push([px,-9834+s*10.2]);CITY_PARENT=G;instanced(new THREE.ConeGeometry(.35,3,4),M.ben,pin,(o,p)=>{o.position.set(p[0],17.5,p[1])});CITY_PARENT=null;
  nzBox(G,8,9,8,-160,15,-9834,M.ben,false);nzCone(G,4.6,14,-160,24,-9834,M.slate,8,0);
  nzBox(G,13,42,13,-202,0,-9834,M.ben,true);for(const a of[-1,1])for(const b of[-1,1])nzCone(G,.8,6,-202+a*6,42,-9834+b*6,M.ben,4);
  nzBox(G,8,40,8,x,0,z,M.ben,true);c2box(G,9.6,9,9.6,x,40,z,M.ben,false);const ck=nzClockTex();
  for(const[dx,dz,ry]of[[0,4.85,0],[0,-4.85,Math.PI],[4.85,0,Math.PI/2],[-4.85,0,-Math.PI/2]]){const f=new THREE.Mesh(new THREE.CircleGeometry(3.6,32),new THREE.MeshBasicMaterial({map:ck,color:0xfff2c8}));f.position.set(x+dx,44.5,z+dz);f.rotation.y=ry;G.add(f);nzGlow(G,0xffe8b0,9,.4,x+dx*1.05,44.5,z+dz*1.05)}
  c2box(G,8,6,8,x,49,z,M.ben,false);for(const[dx,dz]of[[0,4.02],[0,-4.02],[4.02,0],[-4.02,0]]){const ar=new THREE.Mesh(new THREE.BoxGeometry(dz?5:.1,3.6,dz?.1:5),std({color:0x14100c}));ar.position.set(x+dx,51.6,z+dz);G.add(ar)}
  nzCone(G,6.2,15,x,55,z,M.slate);for(const a of[-1,1])for(const b of[-1,1])nzCone(G,.6,5,x+a*4.4,55,z+b*4.4,M.gold);nzCone(G,.5,4,x,70,z,M.gold,6);
  boxes.push({x0:x-4.8,x1:x+4.8,z0:z-4.8,z1:z+4.8,h:70,nz:1});NZ.mapP.push([x,z])}
function nzEye(G,x,z){const M=nzM();const w=new THREE.Group();w.position.set(x,33,z);G.add(w);const rimM=std({color:0xe8eef4,metalness:.7,roughness:.3});
  w.add(new THREE.Mesh(new THREE.TorusGeometry(30,.45,8,120),rimM));const inner=new THREE.Mesh(new THREE.TorusGeometry(28.6,.2,6,120),rimM);w.add(inner);
  for(let k=0;k<32;k++){const a=k/32*TAU;const sp=new THREE.Mesh(new THREE.CylinderGeometry(.05,.05,29,4),rimM);sp.position.set(Math.cos(a)*14.5,Math.sin(a)*14.5,0);sp.rotation.z=a-Math.PI/2;w.add(sp)}
  const pods=[];const pm=std({color:0xd8f0ff,transparent:true,opacity:.75,emissive:0x5a8ac8,emissiveIntensity:.9,roughness:.1});for(let k=0;k<32;k++){const a=k/32*TAU;const p=new THREE.Mesh(new THREE.SphereGeometry(1,10,8),pm);p.scale.set(1,.8,1.9);p.position.set(Math.cos(a)*30.8,Math.sin(a)*30.8,0);w.add(p);pods.push(p);const gl=glowSprite(0x6ab0ff,2.2,.6);gl.position.copy(p.position);w.add(gl)}
  const hub=new THREE.Mesh(new THREE.CylinderGeometry(1.6,1.6,3,16),rimM);hub.rotation.x=Math.PI/2;w.add(hub);
  for(const s of[-1,1]){const lg=new THREE.Mesh(new THREE.CylinderGeometry(.5,.8,36,8),rimM);lg.position.set(x+s*7,16.5,z+10);lg.lookAt(x,33,z);lg.rotateX(Math.PI/2);G.add(lg)}
  NZ.anim.push(dt=>{w.rotation.z+=dt*.025;for(const p of pods)p.rotation.z=-w.rotation.z});NZ.eye=w;NZ.mapP.push([x,z])}
function nzShard(G,x,z){const M=nzM();const wt=mkCanvas(64,256,(c)=>{c.fillStyle='#000';c.fillRect(0,0,64,256);for(let r=0;r<64;r++)for(let k=0;k<8;k++)if(Math.random()<.3){c.fillStyle=Math.random()<.7?'#9ac8ff':'#ffe0a0';c.fillRect(k*8+1,r*4+1,6,2)}});
  const gm=std({color:0x8aaccc,metalness:.8,roughness:.12,emissive:0xffffff,emissiveMap:rep(new THREE.CanvasTexture(wt),4,1),emissiveIntensity:.55,envMapIntensity:1.5});
  const s=new THREE.Mesh(new THREE.ConeGeometry(15,120,4,1,true),gm);s.position.set(x,60,z);s.rotation.y=Math.PI/4;G.add(s);for(const a of[0,1,2,3]){const sp=new THREE.Mesh(new THREE.ConeGeometry(1.4,14,4),gm);sp.position.set(x+Math.cos(a*Math.PI/2)*1.4,118,z+Math.sin(a*Math.PI/2)*1.4);sp.rotation.z=Math.cos(a*Math.PI/2)*-.12;G.add(sp)}
  nzGlow(G,0x9ad0ff,22,.5,x,122,z);boxes.push({x0:x-12.5,x1:x+12.5,z0:z-12.5,z1:z+12.5,h:50,nz:1});NZ.mapR.push([x-10,z-10,20,20]);NZ.mapP.push([x,z])}
function nzStPauls(G,x,z){const M=nzM();nzBox(G,22,18,56,x,0,z,M.plain,true);nzBox(G,46,16,14,x,0,z+8,M.plain,true);nzCyl(G,9,9,9,x,18,z+8,M.plain,32);
  for(let k=0;k<24;k++){const a=k/24*TAU;nzCyl(G,.35,.4,8,x+Math.cos(a)*9.8,18.5,z+8+Math.sin(a)*9.8,M.plain,6)}
  const dm=new THREE.Mesh(new THREE.SphereGeometry(9.6,32,16,0,TAU,0,Math.PI/2),M.lead);dm.scale.y=1.25;dm.position.set(x,27,z+8);G.add(dm);nzCyl(G,1.5,1.8,6,x,38.5,z+8,M.plain,12);
  const gb=new THREE.Mesh(new THREE.SphereGeometry(.8,12,8),M.gold);gb.position.set(x,45.4,z+8);G.add(gb);nzBox(G,.35,3,.35,x,46,z+8,M.gold,false);nzBox(G,1.6,.35,.35,x,47.6,z+8,M.gold,false);
  for(const s of[-1,1]){nzBox(G,6,28,6,x+s*8,0,z-26,M.plain,true);const td=new THREE.Mesh(new THREE.SphereGeometry(2.6,16,8,0,TAU,0,Math.PI/2),M.lead);td.position.set(x+s*8,28,z-26);G.add(td)}
  nzGlow(G,0xffe0b0,30,.3,x,30,z+8);NZ.mapP.push([x,z+8])}
function nzTowerBridge(G,x){const M=nzM();const blue=std({color:0x6a9ad0,roughness:.4,metalness:.5});
  for(const tz of[TH_Z+7,TH_Z-7]){c2box(G,14,2.6,10,x,-1.8,tz,M.plain,false);for(const s of[-1,1])nzBox(G,2.8,24,7,x+s*4.7,0,tz,M.ben,true);c2box(G,12.4,8,7,x,18,tz,M.ben,false);
    nzCone(G,5.4,9,x,26,tz,M.slate);for(const a of[-1,1])for(const b of[-1,1])nzCone(G,.7,6,x+a*5.6,26,tz+b*3,M.ben);nzCone(G,.4,3,x,35,tz,M.gold,6);nzGlow(G,0xfff0d0,8,.4,x,22,tz)}
  c2box(G,12,2.6,7,x,23.6,TH_Z,blue,false);for(const s of[-1,1]){const a=V3(x+s*4.6,22,TH_Z+s*10.5),b=V3(x+s*4.6,4,TH_Z+s*24);for(const sx of[-1,1]){const A=V3(x+sx*4.6,22,TH_Z+s*10.5),B=V3(x+sx*4.6,4,TH_Z+s*24);
    const cu=new THREE.QuadraticBezierCurve3(A,V3(A.x,8,(A.z+B.z)/2),B);G.add(new THREE.Mesh(new THREE.TubeGeometry(cu,12,.35,6),blue))}}
  NZ.mapP.push([x,TH_Z])}
function nzTower(G){const M=nzM();const cx=224,cz=-9870;NZ.green=V3(206,0,-9852);
  for(const[w,d,x,z]of[[56,2.4,cx,cz+27],[56,2.4,cx,cz-27],[2.4,56,cx-27,cz],[2.4,56,cx+27,cz]]){if(z===cz+27){nzBox(G,22,7,d,cx-17,0,z,M.stone,true);nzBox(G,22,7,d,cx+17,0,z,M.stone,true)}else nzBox(G,w,7,d,x,0,z,M.stone,true)}
  for(const a of[-1,1])for(const b of[-1,1])nzCyl(G,3,3.4,11,cx+a*27,0,cz+b*27,M.stone,12);for(const s of[-1,1])nzCyl(G,2.2,2.4,10,cx+s*5.5,0,cz+27,M.stone,10);
  c2plane(G,50,50,cx,.03,cz,M.lawn);nzBox(G,20,20,17,cx+8,0,cz-6,M.white,true);for(const a of[-1,1])for(const b of[-1,1]){nzCyl(G,1.6,1.6,25,cx+8+a*10,0,cz-6+b*8.5,M.white,10);const cu=new THREE.Mesh(new THREE.SphereGeometry(1.9,12,8,0,TAU,0,Math.PI/2),M.lead);cu.position.set(cx+8+a*10,25,cz-6+b*8.5);G.add(cu)}
  const rv=std({color:0x0c0c10,roughness:.6});for(let k=0;k<7;k++){const r=new THREE.Group();const b=new THREE.Mesh(new THREE.SphereGeometry(.3,6,5),rv);b.scale.set(.7,.6,1.4);r.add(b);for(const s of[-1,1]){const w=new THREE.Mesh(new THREE.PlaneGeometry(.9,.4),std({color:0x0c0c10,side:THREE.DoubleSide}));w.position.x=s*.5;w.rotation.x=-Math.PI/2;r.add(w);r.userData['w'+s]=w}
    r.userData.a=k/7*TAU;r.userData.r=rand(9,16);r.userData.y=rand(22,32);r.userData.s=rand(.4,.7);G.add(r);NZ.ravens.push(r)}
  NZ.anim.push(dt=>{const t=performance.now()*.001;for(const r of NZ.ravens){const u=r.userData;u.a+=dt*u.s*(NZ.scatter?3:1);if(NZ.scatter)u.r=Math.min(60,u.r+dt*8);r.position.set(cx+8+Math.cos(u.a)*u.r,u.y+Math.sin(t*2+u.a)*1.5,cz-6+Math.sin(u.a)*u.r);r.rotation.y=-u.a;const f=Math.sin(t*14+u.a*5)*.6;u['w-1'].rotation.z=f;u['w1'].rotation.z=-f}});
  NZ.mapP.push([cx,cz])}

/* ---------- the whole north, built once ---------- */
function nzBuild(){if(NZ.built)return;NZ.built=true;const G=NZ.g=new THREE.Group();scene.add(G);nzCalais(G);nzSea(G);nzCountry(G);nzLondon(G);
  const bolt=new THREE.Line(new THREE.BufferGeometry().setFromPoints(Array.from({length:14},()=>V3())),new THREE.LineBasicMaterial({color:0xd8ffe8,transparent:true,opacity:0,fog:false}));G.add(bolt);NZ.bolt=bolt;
  G.traverse(o=>{if(o.isInstancedMesh)o.frustumCulled=false})}
function nzKeep(o){return o===SKY||o.isLight||o===moonLight.target||o===W.g||o===camera||(o.isPoints&&o.frustumCulled===false)||o===NZ.g||(LYR.a&&o===LYR.a.g)||(typeof reticle!=='undefined'&&o===reticle)||enemies.some(e=>!e.dead&&e.m&&e.m.g===o)}
function nzDrawMap(){worldMap.width=WB.x1-WB.x0+48;worldMap.height=WB.z1-WB.z0+48;MAPOX=WB.x0-24;MAPOZ=WB.z0-24;const x=worldMap.getContext('2d'),X=v=>v-MAPOX,Z=v=>v-MAPOZ,Wd=worldMap.width;
  x.fillStyle='#1d1935';x.fillRect(0,0,Wd,worldMap.height);x.fillStyle='#2b4b86';x.fillRect(0,Z(CLIFF_Z),Wd,Z(CAL_SHORE)-Z(CLIFF_Z));x.fillStyle='#21584e';x.fillRect(0,Z(CLIFF_Z),Wd,Z(CURSE_Z)-Z(CLIFF_Z));
  x.fillStyle='#8a7a5a';x.fillRect(0,Z(-2158),Wd,Z(CAL_SHORE)-Z(-2158));x.fillStyle='#284332';x.fillRect(0,Z(LON_Z),Wd,Z(CLIFF_Z)-Z(LON_Z));x.fillStyle='#e8e6dc';x.fillRect(0,Z(CLIFF_Z)-2,Wd,4);
  x.strokeStyle='#2b4b86';x.lineWidth=9;x.beginPath();for(let z=RIV_Z0;z>LON_Z+6;z-=6)z===RIV_Z0?x.moveTo(X(nzRiverX(z)),Z(z)):x.lineTo(X(nzRiverX(z)),Z(z));x.stroke();x.strokeStyle='#8a8070';x.lineWidth=4;x.beginPath();for(let z=CLIFF_Z-6;z>LON_Z;z-=6)z===CLIFF_Z-6?x.moveTo(X(nzRoadX(z)),Z(z)):x.lineTo(X(nzRoadX(z)),Z(z));x.stroke();
  x.fillStyle='#2b4b86';x.fillRect(0,Z(TH_Z-TH_W),Wd,TH_W*2);x.fillStyle='#6b6278';for(const b of LBR)x.fillRect(X(b-5),Z(TH_Z-TH_W),10,TH_W*2);x.fillRect(X(56),Z(-2292),8,100);
  x.fillStyle='#6b6278';for(const r of NZ.mapR)x.fillRect(X(r[0]),Z(r[1]),r[2],r[3]);x.fillStyle='#f2a541';for(const p of NZ.mapP)x.fillRect(X(p[0])-4,Z(p[1])-4,8,8);x.font='bold 20px Georgia,serif';x.textAlign='left';for(const T of NZTOWNS){x.fillStyle='rgba(0,0,0,.6)';x.fillText(T.n,X(T.x)+11,Z(T.z)+1);x.fillStyle='#f0e6c8';x.fillText(T.n,X(T.x)+10,Z(T.z))}}
{const _dw=drawWorldMap;drawWorldMap=function(){if(MODE!=='open'&&CH2.zone==='north')return nzDrawMap();return _dw.apply(this,arguments)}}

/* ---------- moving between Paris and the north ---------- */
function nzClear(){for(const e of enemies)if(!e.dead)removeEnemy(e);for(const p of eProjs)scene.remove(p.s);eProjs.length=0}
function nzEnter(where){nzBuild();if(CH2.zone==='paris'){CH2.parisWB={x0:WB.x0,x1:WB.x1,z0:WB.z0,z1:WB.z1};NZ.hid=scene.children.filter(o=>o.visible&&!nzKeep(o));for(const o of NZ.hid)o.visible=false}
  nzClear();if(where!=='london'){NZ.trig={};NZ.cpk=0}CH2.zone='north';NZ.g.visible=true;Object.assign(WB,NZB);drawWorldMap();setDawn(.08);NZ.fogD=scene.fog.density;NZ.fogC.copy(scene.fog.color);
  const p=where==='london'?V3(-108,0,-9648):V3(60,0,-2172);NZ.cp.copy(p);SPAWN.copy(p);P.pos.set(p.x,groundAt(p.x,p.z),p.z);P.vy=0;P.flying=false;P.glide=false;yaw=0;P.face=Math.PI;
  camera.position.set(p.x,P.pos.y+5,p.z+12);if(CH2.st>=5)nzAfter();CH2.obj=nzObj;ch2Save()}
function nzLeave(){nzClear();sxStop('wind',1);CH2.zone='paris';if(NZ.g)NZ.g.visible=false;for(const o of NZ.hid)o.visible=true;NZ.hid=[];Object.assign(WB,CH2.parisWB||{x0:-430,x1:430,z0:-330,z1:300});drawWorldMap();
  setDawn(STATS.won?.55:dawnK);SPAWN.set(-100,0,22);CH2.flySpd=0;lyraToTroca();const p=V3(-126,0,-100);P.pos.set(p.x,groundAt(p.x,p.z),p.z);P.vy=0;P.flying=false;yaw=Math.PI;P.face=0;camera.position.set(p.x,P.pos.y+5,p.z-12);
  flash(headOf(P.pos,1.2),0xff4050,8);toast('Back in Paris. Lyra can open the door to London again.','Paris',true);ch2Save()}
function ch2Depart(back){if(CS.active)return;const L=LYR.a?LYR.a.g.position.clone():P.pos.clone();const fw=V3(Math.sin(LYR.a?LYR.a.g.rotation.y:0),0,Math.cos(LYR.a?LYR.a.g.rotation.y:0));const door=L.clone().addScaledVector(V3(fw.z,0,-fw.x),2.6);let portal=null;
  const lyS=d=>()=>{const g=LYR.a?LYR.a.g.position:P.pos;const dv=V3(P.pos.x-g.x,0,P.pos.z-g.z).normalize();return{pos:headOf(g,1.6).addScaledVector(dv,d||2.6).addScaledVector(V3(dv.z,0,-dv.x),.6),look:headOf(g,1.55)}};
  const shots=[{dur:3.4,fov:44,title:back?null:['Chapter 2','The Crossing'],cam:k=>({pos:headOf(door,2).add(V3(6-k*2,0,6)),look:headOf(door,2)}),onStart:()=>{if(!portal)portal=nzPortal(door);sx('portal',1,()=>{try{sfx.blink()}catch(e){}},{wet:.4});try{LYR.a.fire('Spell_Simple_Shoot',.8)}catch(e){}},update:dt=>{if(portal)portal.userData.tick(dt)}},
    {dur:1.2,cam:k=>({pos:headOf(door,2.2).add(V3(0,0,3-k*2.4)),look:headOf(door,2.4)}),onStart:()=>{flash(headOf(door,2.4),0xff5060,12);sx('portal',.8,null,{rate:.8})}}];
  if(back)shots.push({dur:5,fov:50,cut:true,title:['London','Lyra\'s door holds'],onStart:()=>{if(portal){scene.remove(portal);portal=null}nzEnter('london')},cam:k=>({pos:V3(-150+k*40,40-k*10,-9680),look:V3(-90,30,-9800)})});
  else shots.push({dur:6,fov:50,cut:true,title:['Calais','The edge of French waters'],onStart:()=>{if(portal){scene.remove(portal);portal=null}nzEnter('calais');lyraPlace(60,-2186,0);LYR.home=false},cam:k=>({pos:V3(110-k*36,24-k*6,-2268+k*8),look:V3(-30,14,-2120)})},
    {who:'Lyra',text:LY.ly14,cut:true,cam:lyS(2.4)},{who:'Lyra',text:LY.ly15,cam:lyS(2)},{who:'@',text:'Don\'t wait up.',cut:true,cam:witchShot(1,3.4)});
  playCutscene(shots,()=>{if(portal)scene.remove(portal);if(!back){CH2.st=Math.max(CH2.st,2);ch2Save();toast('Take off and fly north. Lyra\'s sea-glass gem keeps your broom alive over water. Over land it tires like always.','The Channel',true)}})}
function nzObj(){if(CH2.zone==='paris')return LYR.a&&LYR.home?`Meet <b>Lyra</b> at the Trocadéro · ${Math.round(Math.hypot(P.pos.x+126,P.pos.z+112))}m`:null;const z=P.pos.z;
  if(CH2.st<3)return z>CLIFF_Z?`Fly north across the <b>Channel</b> · ${Math.round(z-CLIFF_Z)}m`:`Follow the river to <b>London</b> · ${Math.round(z-LON_Z)}m`;
  if(CH2.st===3&&NZ.bb)return `Something waits on <b>Big Ben</b> · ${Math.round(Math.hypot(P.pos.x-NZ.bb.x,P.pos.z-NZ.bb.z))}m`;
  if(CH2.st===4&&NZ.green)return `Find Kaen in the <b>Tower of London</b> · ${Math.round(Math.hypot(P.pos.x-NZ.green.x,P.pos.z-NZ.green.z))}m`;
  return 'Break the Crown\'s chains · Lyra\'s red door by the Tower leads home'}
{const _lt=lyraToTroca;lyraToTroca=function(){_lt();CH2.obj=nzObj}}
{const _rv=revive;revive=function(){const r=_rv.apply(this,arguments);if(MODE!=='open'&&CH2.zone==='north'){const c=NZ.cp;P.pos.set(c.x,groundAt(c.x,c.z),c.z);P.flying=false;NZ.bossCd=25}return r}}

/* ---------- spirits of the cursed water ---------- */
function nzWingGeo(){if(NZ.wg)return NZ.wg;const s=new THREE.Shape();s.moveTo(0,.15);s.lineTo(.5,.45);s.lineTo(1.1,.5);s.lineTo(1.6,.3);s.lineTo(1.75,0);s.lineTo(1.45,-.25);s.lineTo(1.2,-.05);s.lineTo(.95,-.38);s.lineTo(.7,-.1);s.lineTo(.45,-.35);s.lineTo(.2,-.1);s.lineTo(0,-.2);s.lineTo(0,.15);
  const g=new THREE.ShapeGeometry(s);g.rotateX(Math.PI/2);return NZ.wg=g}
function nzWings(par,mat,sc,x,y,z){const ws=[];for(const q of[-1,1]){const w=new THREE.Group();w.position.set(q*x,y,z);w.scale.set(q,1,1);w.userData.q=q;const m=new THREE.Mesh(nzWingGeo(),mat);m.scale.setScalar(sc);w.add(m);par.add(w);ws.push(w)}return ws}
const NZG={};function nzG(){if(NZG.ok)return NZG;NZG.ok=1;NZG.sph=new THREE.SphereGeometry(1,12,10);NZG.cyl=new THREE.CylinderGeometry(1,.8,1,10);NZG.cone=new THREE.ConeGeometry(1,1,8);return NZG}
function nzPart(par,geo,mat,sx,sy,sz,x,y,z){const m=new THREE.Mesh(geo,mat);m.scale.set(sx,sy,sz);m.position.set(x,y,z);m.castShadow=true;par.add(m);return m}
function buildNBat(){const Q=nzG(),g=new THREE.Group(),body=new THREE.Group();body.position.y=1;g.add(body);const fur=std({color:0x3a2a2c,roughness:.95}),mem=std({color:0x4a2a30,roughness:.7,side:THREE.DoubleSide,emissive:0x1c060a});
  nzPart(body,Q.sph,fur,.26,.3,.34,0,0,0);nzPart(body,Q.sph,fur,.2,.19,.2,0,.16,.3);for(const q of[-1,1]){nzPart(body,Q.cone,fur,.07,.2,.05,q*.1,.38,.28);const e=glowSprite(0xff2020,.3,.95);e.position.set(q*.075,.2,.48);body.add(e);nzPart(body,Q.cone,MAT.white,.02,.07,.02,q*.04,.06,.47).rotation.x=Math.PI}
  const wings=nzWings(body,mem,.95,.18,.05,0);return{g,body,anim:(e,dt,mv,l)=>{const f=Math.sin(e.t*20+e.strafe);for(const w of wings)w.rotation.z=w.userData.q*(f*.75+.1);body.position.y=1+Math.sin(e.t*10)*.12;body.rotation.x=.15-l*.6}}}
function nzFaceTex(){if(NZ.ft)return NZ.ft;const c=mkCanvas(128,128,(x)=>{x.fillStyle='#000';x.fillRect(0,0,128,128);x.fillStyle='#ffd040';for(const s of[-1,1]){x.beginPath();x.moveTo(64+s*14,52);x.lineTo(64+s*40,52);x.lineTo(64+s*27,28);x.fill()}
  x.beginPath();x.moveTo(26,74);for(let k=0;k<=8;k++)x.lineTo(26+k*9.5,k%2?88:74);x.lineTo(98,86);for(let k=8;k>=0;k--)x.lineTo(26+k*9.5,k%2?100:108);x.fill();x.beginPath();x.moveTo(64,58);x.lineTo(57,70);x.lineTo(71,70);x.fill()});return NZ.ft=new THREE.CanvasTexture(c)}
function buildPumpkin(){const Q=nzG(),g=new THREE.Group(),body=new THREE.Group();body.position.y=1.2;g.add(body);const or=std({color:0xe06c18,roughness:.5,emissive:0x3a1400});
  for(let k=0;k<6;k++){const m=nzPart(body,Q.sph,or,.3,.42,.52,0,0,0);m.rotation.y=k*Math.PI/6}const st=nzPart(body,Q.cyl,std({color:0x3a4a20,roughness:.8}),.07,.26,.07,.02,.5,0);st.rotation.z=-.4;
  const lf=new THREE.Mesh(new THREE.CircleGeometry(.18,6),std({color:0x3a6a24,side:THREE.DoubleSide}));lf.position.set(.16,.5,.05);lf.rotation.set(-1.1,0,.4);body.add(lf);
  const face=new THREE.Mesh(new THREE.PlaneGeometry(.78,.78),new THREE.MeshBasicMaterial({map:nzFaceTex(),transparent:true,blending:THREE.AdditiveBlending,depthWrite:false}));face.position.set(0,0,.53);body.add(face);
  const gl=glowSprite(0xffa020,2.2,.5);gl.position.set(0,0,.4);body.add(gl);const wings=nzWings(body,std({color:0x1e1418,roughness:.7,side:THREE.DoubleSide}),1.05,.4,.18,-.05);
  return{g,body,anim:(e,dt,mv,l)=>{const f=Math.sin(e.t*14+e.strafe);for(const w of wings)w.rotation.z=w.userData.q*(f*.6+.25);body.position.y=1.2+Math.sin(e.t*4)*.2;body.rotation.z=Math.sin(e.t*2)*.12;face.material.opacity=.75+Math.random()*.25;gl.material.opacity=.4+Math.random()*.2}}}
function buildGargoyle(s){const Q=nzG(),g=new THREE.Group(),body=new THREE.Group();g.add(body);const I=new THREE.Group();I.scale.setScalar(s);body.add(I);
  const skin=std({color:s>1?0x4a3a4a:0x5a4652,roughness:.5,emissive:s>1?0x0a1a0c:0x140810}),dark=std({color:0x241c22,roughness:.6}),bone=std({color:0xcdbb90,roughness:.6}),mem=std({color:0x3a2430,roughness:.7,side:THREE.DoubleSide,emissive:s>1?0x0c2010:0x1a060c});
  const P_=(geo,m,a,b,c,x,y,z,p)=>nzPart(p||I,geo,m,a,b,c,x,y,z);
  P_(Q.sph,skin,.62,.7,.45,0,1.95,0);for(const q of[-1,1])P_(Q.sph,skin,.3,.26,.2,q*.2,2.15,.28);P_(Q.sph,skin,.42,.45,.34,0,1.45,.05);P_(Q.sph,dark,.48,.3,.38,0,1.18,0);
  const head=new THREE.Group();head.position.set(0,2.72,.18);I.add(head);P_(Q.sph,skin,.27,.3,.28,0,0,0,head);P_(Q.sph,skin,.2,.12,.2,0,-.16,.1,head);
  for(const q of[-1,1]){const e=glowSprite(s>1?0x8aff60:0xff9020,.4,.95);e.position.set(q*.1,.04,.25);head.add(e);const h1=P_(Q.cone,bone,.08,.36,.08,q*.2,.24,-.02,head);h1.rotation.z=-q*.7;const h2=P_(Q.cone,bone,.05,.3,.05,q*.42,.48,-.1,head);h2.rotation.z=-q*.15;h2.rotation.x=-.5}
  const arms=[];const blk=std({color:0x0a0606,roughness:1});const sk=(p,x,y,z)=>{const k=P_(Q.sph,bone,.17,.18,.19,x,y,z,p);for(const q of[-1,1])P_(Q.sph,blk,.32,.3,.22,q*.38,.16,.8,k);P_(Q.cone,blk,.12,.18,.1,0,-.12,.92,k).rotation.x=Math.PI;P_(Q.sph,bone,.62,.34,.62,0,-.62,.22,k)};
  for(const q of[-1,1]){P_(Q.sph,skin,.27,.25,.25,q*.66,2.28,0);const ua=new THREE.Group();ua.position.set(q*.72,2.2,0);ua.rotation.z=q*.25;I.add(ua);P_(Q.cyl,skin,.16,.6,.16,0,-.3,0,ua);
    const fa=new THREE.Group();fa.position.set(0,-.6,0);fa.rotation.x=-.6;ua.add(fa);P_(Q.cyl,skin,.13,.55,.13,0,-.27,0,fa);sk(fa,0,-.66,.06);arms.push(ua);
    const th=P_(Q.cyl,skin,.2,.6,.2,q*.25,.95,.05);th.rotation.x=.4;const sh=P_(Q.cyl,skin,.13,.5,.13,q*.27,.5,-.1);sh.rotation.x=-.5;P_(Q.cone,dark,.12,.18,.12,q*.27,.18,.02)}
  for(const q of[-1,0,1])sk(I,q*.3,1.05,.3);
  const tc=new THREE.CatmullRomCurve3([V3(0,1.2,-.3),V3(0,.8,-.9),V3(.2,.5,-1.4),V3(.5,.6,-1.8)]);I.add(new THREE.Mesh(new THREE.TubeGeometry(tc,10,.06,6),skin));P_(Q.cone,skin,.1,.22,.06,.55,.62,-1.9).rotation.z=-1.2;
  const wings=nzWings(I,mem,1.6,.3,2.3,-.3);if(s>1){const au=glowSprite(0x60ff80,7,.12);au.position.y=2;I.add(au);for(let k=0;k<5;k++){const f=glowSprite(0x80ff70,.5,.8);f.position.set((k-2)*.12,.42+Math.abs(k-2)*-.04,-.05);head.add(f)}}
  return{g,body,anim:(e,dt,mv,l)=>{const f=Math.sin(e.t*(s>1?4.2:7)+e.strafe);for(const w of wings)w.rotation.z=w.userData.q*(.45+f*.55);body.position.y=Math.sin(e.t*(s>1?2.2:3.5))*.22*s;arms.forEach((a,i)=>a.rotation.x=-.3-l*1.6+Math.sin(e.t*2+i)*.1);I.rotation.x=.12+l*.25;
    if(s>1&&Math.random()<.3)FL.emit(V3(e.pos.x,e.pos.y+body.position.y+2.9*s,e.pos.z),{c0:0xc0ff90,c1:0x104010,s0:.8,s1:.1,life:.6,up:2})}}}
const nzFlyAI=off=>(e,dt,d)=>{const gy=groundAt(e.pos.x,e.pos.z);const ty=Math.max(gy+1.5,P.pos.y+off+Math.sin(e.t*2+e.strafe*2)*1.2);e.pos.y=lerp(e.pos.y,ty,Math.min(1,dt*2.6))};
ETYPES.nbat={name:'Channel bat',hp:28,speed:24,dmg:6,range:2.4,cd:1.1,xp:26,r:.7,h:1.3,fly:1,build:buildNBat,ai:nzFlyAI(-.4)};
ETYPES.pumpkin={name:'Winged jack',hp:48,speed:21,dmg:8,range:22,cd:1.9,xp:40,r:.9,h:1.7,fly:1,ranged:1,build:buildPumpkin,ai:nzFlyAI(2.2)};
ETYPES.gargoyle={name:'Crown gargoyle',hp:120,speed:23,dmg:12,range:3.2,cd:1.4,xp:80,r:1.3,h:3,fly:1,build:()=>buildGargoyle(1),ai:(e,dt,d)=>{nzFlyAI(-.8)(e,dt,d);
  if(e.atk>.25&&!e.grab&&d<4.2&&P.flying){e.grab=1;P.vy=-18;P.shake=.6;sx('garg',.8);toast('A gargoyle grabbed you! Climb! Climb!')}if(e.atk<=0)e.grab=0}};
ETYPES.greyfang={name:'Greyfang, Hound of the Hollow Crown',boss:true,hp:4200,speed:9,dmg:28,range:0,cd:9,xp:4200,r:2.4,h:7,fly:1,ghost:true,noCalm:true,build:()=>buildGargoyle(2.3)};
Object.assign(SPEAKER,{'The Hollow Crown':'#7dff9a'});
BOSS_LINES.greyfang=[['Greyfang','A French witch. The Crown said you would come crawling.',0],['@','Crawling? I flew. Over your whole cursed sea.',1],['Greyfang','Then you will fall the whole way down.',0]];
const GF_T=['Your sea is my sea, witch!','The Crown is watching you bleed.','Kaen begged too. For years.','London never forgets a debt!','Fly, little moth. Fly into the bell.'];
BOSSAI.greyfang=function(e,dt,d){const a=e.ai,rage=e.hp<e.maxhp*.5,c=eCenter(e);a.a1-=dt;a.a2-=dt;a.a3-=dt;a.a4-=dt;a.land=(a.land||0)-dt;a.ln=(a.ln==null?6:a.ln)-dt;
  if(a.ln<=0){a.ln=rand(9,13);cineLine('Greyfang',pickR(Math.random,GF_T))}const gy=groundAt(e.pos.x,e.pos.z);
  if(e.dash){const D=e.dash;D.t+=dt;const k=Math.min(1,D.t/D.dur);e.pos.lerpVectors(D.a,D.b,k*k*(3-2*k));SP.emit(c,{n:5,c0:0xc0ff90,c1:0x204010,speed:2,life:.4});if(!D.hit&&e.pos.distanceTo(P.pos)<3.6){D.hit=1;damagePlayer(e.dmg*1.5);P.vy=Math.min(P.vy,-6);P.shake=.6}if(k>=1){e.dash=null;a.land=Math.max(a.land,.5)}return}
  const ty=a.land>0?gy+.2:Math.max(gy+5,Math.min(P.pos.y+3.5,gy+26))+Math.sin(e.t*1.4)*1.1;e.pos.y=lerp(e.pos.y,ty,Math.min(1,dt*(a.land>0?6:1.6)));if(e.busy>0)return;
  if(a.a1<=0){a.a1=rage?2.6:3.6;e.busy=.6;sx('cackle',.7);const n=rage?8:5,base=aimAtPlayer(c).normalize();for(let k=0;k<n;k++)after(.1+k*.06,()=>{if(e.dead)return;const dir=base.clone().applyAxisAngle(V3(0,1,0),(k-(n-1)/2)*.13);enemyOrb(eCenter(e),dir,20,e.dmg*.42,0x9dff70,.42,{keepY:true,life:2.6})})}
  else if(a.a2<=0&&d<45){a.a2=rage?4.2:6;e.busy=1.2;const from=e.pos.clone(),dv=V3(P.pos.x-from.x,0,P.pos.z-from.z).normalize(),to=P.pos.clone().addScaledVector(dv,6);to.y=Math.max(groundAt(to.x,to.z)+.5,P.pos.y);sx('garg',.9);
    lineTelegraph(V3(from.x,groundAt(from.x,from.z),from.z),V3(to.x,groundAt(to.x,to.z),to.z),3,.8,0x9dff70,()=>{if(!e.dead)e.dash={a:e.pos.clone(),b:to,t:0,dur:.5}})}
  else if(a.a3<=0){a.a3=rage?11:15;e.busy=.8;sx('bats',.8);cineLine('Greyfang','Children of the Crown! Feed!');for(let k=0;k<(rage?4:3);k++)nzSpawnFly(k<2||!rage?'nbat':'pumpkin',V3(e.pos.x+rand(-6,6),e.pos.y+rand(-1,3),e.pos.z+rand(-6,6)))}
  else if(a.a4<=0&&a.land<=0){a.a4=rage?9:13;e.busy=1.6;a.land=2.6;after(.6,()=>{if(e.dead)return;const g=V3(e.pos.x,groundAt(e.pos.x,e.pos.z),e.pos.z);P.shake=1;sx('impact',.9);shockwave(g,30,13,e.dmg*1.1,0x9dff70);toast('Jump the shockwave!')})}};
function nzSpawnFly(type,at){const e=spawnEnemy(type,V3(at.x,0,at.z));e.pos.y=at.y;e.aggro=true;e.m.g.children.forEach(c=>{if(c.material&&c.material.map===scorchTex)c.visible=false});return e}
function nzWave(n){const f=V3(Math.sin(P.face),0,Math.cos(P.face));const ahead=(k,dz)=>V3(P.pos.x+rand(-26,26)+f.x*dz,P.pos.y+rand(-3,5),P.pos.z-Math.abs(dz)+rand(-8,8));const behind=()=>V3(P.pos.x+rand(-20,20),P.pos.y+rand(-2,4),P.pos.z+rand(30,44));
  const W_={1:[['nbat',6,0]],2:[['nbat',4,0],['pumpkin',2,0]],3:[['gargoyle',2,1],['nbat',4,1]],4:[['pumpkin',3,0],['nbat',3,0],['gargoyle',1,0]]}[n]||[];
  for(const[t,c,b]of W_)for(let k=0;k<c;k++)nzSpawnFly(t,b?behind():ahead(k,rand(45,70)));sx(n===3?'garg':'bats',.9);if(n>=2)after(.6,()=>sx('cackle',.7))}

/* ---------- story beats in England ---------- */
function nzToll(n){for(let k=0;k<n;k++)after(k*1.45,()=>{if(CH2.zone!=='north')return;sx('bigben',.9,null,{wet:.5,rate:k===n-1?.92:1});P.shake=Math.max(P.shake,.25);NZ.flashK=Math.max(NZ.flashK,.25)})}
function nzArrive(){CH2.st=Math.max(CH2.st,3);ch2Save();const B=NZ.bb;
  playCutscene([{dur:5.5,fov:50,title:['London','City of the Hollow Crown'],cam:k=>({pos:V3(-10+k*30,62-k*14,-9630-k*50),look:V3(-60,26,-9800)})},
    {who:'Lyra',text:LY.ly19,cam:k=>({pos:V3(-140+k*16,20,-9758),look:V3(-60,33,-9768)})},
    {dur:5,fov:42,cut:true,cam:k=>({pos:V3(-96,10+k*26,-9790),look:V3(B.x,46,B.z)}),onStart:()=>nzToll(13)},
    {who:'Lyra',text:LY.ly20,cam:k=>({pos:V3(B.x+28-k*4,44,B.z+26),look:V3(B.x,52,B.z)})},
    {who:'@',text:'Thirteen. And something is sitting on the clock.',cam:witchShot(1,3.4)}],()=>toast('Something waits on top of Big Ben. Go and say hello.','London',true))}
function nzGreyfang(){if(NZ.boss&&!NZ.boss.dead)return;const B=NZ.bb;const e=spawnEnemy('greyfang',V3(B.x+3,0,B.z+3));e.pos.set(B.x,56,B.z+5.5);NZ.boss=e;sx('garg',1,null,{wet:.4});bossIntro(e)}
{const _bo=bossOutro2;bossOutro2=function(type,center,orb){if(type!=='greyfang')return _bo.apply(this,arguments);CH2.st=Math.max(CH2.st,4);ch2Save();
  playCutscene([{who:'Greyfang',text:'The Crown... sees you... witch... it always sees...',cam:orb,update:()=>SP.emit(V3(center.x+rand(-3,3),center.y+rand(0,4),center.z+rand(-3,3)),{c0:0xc0ff90,c1:0x103010,s0:.6,s1:.1,life:.8,up:2})},
    {who:'Lyra',text:LY.ly21,cam:witchShot(-1,3.6)}],()=>toast('The Tower of London is east along the river, past Tower Bridge.','Greyfang is dust',true))}}
function nzGhostKaen(at){const a=makeCHActor('m',{skin:0xfff0ea,hair:'hairPart',hairTex:'1',hairCol:0x0b0a10,brow:0x0b0a10,keepReg:[5,6,9],wear:[['long',0x121016],['trousers',0x0f0d13],['shoes',0x0a0a0c]]});if(!a)return null;
  const gm=new THREE.MeshBasicMaterial({color:0x9ad8ff,transparent:true,opacity:.42,blending:THREE.AdditiveBlending,depthWrite:false,skinning:true});a.g.traverse(o=>{if(o.isMesh)o.material=gm});
  a.g.position.set(at.x,0,at.z);a.g.rotation.y=Math.PI*.15;NZ.g.add(a.g);try{a.setBase('Crouch_Idle_Loop');a.update(.5)}catch(e){}const gl=glowSprite(0x9ad8ff,5,.4);gl.position.y=1.2;a.g.add(gl);
  const lm=std({color:0x5a5a64,metalness:.8,roughness:.35});for(const s of[-1,1]){const px=at.x+s*3.2,pz=at.z-.4;nzCyl(NZ.g,.4,.5,2.4,px,0,pz,M_ST());const A=V3(px,2,pz),Bp=V3(at.x+s*.35,1,at.z+.1);for(let k=0;k<9;k++){const t=k/8;const p=A.clone().lerp(Bp,t);p.y-=Math.sin(t*Math.PI)*.4;const l=new THREE.Mesh(new THREE.TorusGeometry(.1,.025,4,8),lm);l.position.copy(p);l.rotation.y=k*Math.PI/2+s;NZ.g.add(l)}}
  NZ.anim.push(dt=>{try{a.update(dt)}catch(e){}gm.opacity=.34+Math.sin(performance.now()*.003)*.1;if(Math.random()<.2)SP.emit(V3(at.x+rand(-.5,.5),rand(.3,2),at.z+rand(-.5,.5)),{c0:0xd0f0ff,c1:0x2050a0,s0:.3,s1:.05,life:1,up:.8})});return a}
function M_ST(){return nzM().stone}
function nzCrown(at){const g=new THREE.Group();g.position.copy(at);NZ.g.add(g);const m=std({color:0x1a3a20,emissive:0x40ff70,emissiveIntensity:.9,metalness:.7,roughness:.3});
  g.add(new THREE.Mesh(new THREE.TorusGeometry(7,.6,8,40),m));for(let k=0;k<9;k++){const a=k/9*TAU;const sp=new THREE.Mesh(new THREE.ConeGeometry(.9,5,6),m);sp.position.set(Math.cos(a)*7,2.6,Math.sin(a)*7);g.add(sp)}g.rotation.x=.12;
  const gl=glowSprite(0x60ff80,30,.35);g.add(gl);const beam=new THREE.Mesh(new THREE.CylinderGeometry(.6,1.4,1,10,1,true),nzM().glow(0x60ff90,.25));NZ.g.add(beam);
  NZ.anim.push(dt=>{g.rotation.y+=dt*.25;g.position.y=at.y+Math.sin(performance.now()*.0008)*1.2;if(Math.random()<.6)FL.emit(V3(at.x+rand(-7,7),g.position.y+rand(0,4),at.z+rand(-7,7)),{c0:0xc0ff90,c1:0x0a3010,s0:1.4,s1:.2,life:.9,up:3});
    const A=g.position,Bp=NZ.green;const L=Math.hypot(A.x-Bp.x,A.y-1,A.z-Bp.z);beam.position.set((A.x+Bp.x)/2,(A.y+1)/2,(A.z+Bp.z)/2);beam.scale.set(1,L,1);beam.lookAt(A);beam.rotateX(Math.PI/2)});return g}
function nzAfter(){if(NZ.afterDone)return;NZ.afterDone=1;if(!NZ.ghost)NZ.ghost=nzGhostKaen(NZ.green);if(!NZ.crown)NZ.crown=nzCrown(V3(232,34,-9876));NZ.home=nzPortal(V3(222,0,-9834));NZ.g.add(NZ.home);NZ.anim.push(dt=>NZ.home.userData.tick(dt))}
function nzTowerEnd(){CH2.st=Math.max(CH2.st,5);ch2Save();const c=NZ.green;const kS=(sd)=>()=>({pos:headOf(c,1.3).add(V3(sd||2.2,.2,3.2)),look:headOf(c,.9)});const crS=()=>({pos:V3(c.x-6,6,c.z+16),look:V3(232,34,-9876)});
  const gk=a=>{try{if(NZ.ghost)NZ.ghost.setBase(a,.5)}catch(e){}};
  playCutscene([{dur:4.2,fov:46,title:['The Tower of London','Where the Crown keeps its prisoners'],cam:k=>({pos:V3(c.x-24+k*8,15-k*5,c.z+30),look:V3(c.x+10,8,c.z-12)}),onStart:()=>{NZ.scatter=1;sx('cackle',.6);sx('bats',.5)}},
    {dur:3,cam:k=>({pos:headOf(c,1.6).add(V3(4-k,.3,5)),look:headOf(c,1.1)}),onStart:()=>{if(!NZ.ghost)NZ.ghost=nzGhostKaen(c);sx('shield',.8)}},
    {who:'@',text:'Kaen?',cam:witchShot(1,3)},
    {who:"Kaen's Spirit",text:'Come to gloat, witch? Or worse... to pity me?',cut:true,cam:kS(),onStart:()=>gk('Idle_Loop')},
    {who:'@',text:'Lyra is free. She sent me.',cam:witchShot(-1,3.2)},
    {who:"Kaen's Spirit",text:'Keep your pity. I sold my soul with my eyes open. Every monster in Paris was mine.',cut:true,cam:kS(-1.8)},
    {who:'@',text:'No. The Crown was wearing your face. I read your journal, Kaen. You did it for her.',cam:witchShot(1,3)},
    {who:"Kaen's Spirit",text:'I... told myself that too. Every night. While it fed on them.',cut:true,cam:kS(1.4)},
    {who:"Kaen's Spirit",text:'Bilel... I could not stop it. I watched it wear my hands. I am so sorry...',cam:k=>({pos:headOf(c,.8).add(V3(1.6,.1,2.2-k*.4)),look:headOf(c,.7)}),onStart:()=>{gk('Crouch_Idle_Loop');for(let k=0;k<6;k++)after(k*.4,()=>SP.emit(headOf(c,.9),{n:8,c0:0xd0f0ff,c1:0x2050a0,s0:.25,s1:.03,life:1.4,grav:2}))}},
    {who:'@',text:'Then let us carry it with you. We are taking you home.',cam:witchShot(-1,3.2)},
    {who:"Kaen's Spirit",text:'Then run, witch. These chains are not mine to break. They belong to its crown.',cut:true,cam:kS()},
    {dur:4.6,fov:56,cut:true,cam:k=>({pos:V3(c.x-10,4+k*5,c.z+24),look:V3(232,24+k*10,-9876)}),onStart:()=>{if(!NZ.crown)NZ.crown=nzCrown(V3(232,34,-9876));flash(V3(232,30,-9876),0x60ff80,30);sx('powerup',1,null,{wet:.4});sx('garg',.6,null,{rate:.7,delay:.3});P.shake=1.2}},
    {who:'The Hollow Crown',text:'Another sister. Another bargain. London always collects its debts, little witch.',cam:crS},
    {who:'@',text:'Then I am the debt you will never collect.',cam:witchShot(1,3.6)},
    {dur:4.5,fov:40,cam:k=>({pos:V3(c.x,30+k*20,c.z+50+k*20),look:V3(232,22,-9876)})}],
    ()=>{nzAfter();toast('Kaen is still chained to the Crown. Lyra\'s red door by the Tower gate leads back to Paris.','The Tower',true);writeSave()})}

/* ---------- the tick ---------- */
function nzFog(c,d,dt){NZ.fogC.lerp(c,Math.min(1,dt*.6));NZ.fogD=lerp(NZ.fogD,d,Math.min(1,dt*.6));scene.fog.color.copy(NZ.fogC);scene.fog.density=NZ.fogD}
const NZC={cal:new THREE.Color(0x2a2650),fr:new THREE.Color(0x272848),cur:new THREE.Color(0x1e3a38),eng:new THREE.Color(0x2a2a4a),lon:new THREE.Color(0x2e2c3e),tow:new THREE.Color(0x203a2e)};
function nzTick(dt){if(!NZ.g||!NZ.g.visible)return;for(const f of NZ.anim)f(dt);if(NZ.seaT){NZ.seaT[0].offset.x+=dt*.01;NZ.seaT[1].offset.x+=dt*.018;NZ.seaT[1].offset.y+=dt*.008}
  const z=P.pos.z,sea=z<CAL_SHORE&&z>CLIFF_Z,cur=sea&&z<CURSE_Z,lon=z<LON_Z;
  const tw=NZ.green?Math.hypot(P.pos.x-NZ.green.x,z-NZ.green.z):999;nzFog(z>CAL_SHORE?NZC.cal:cur?NZC.cur:sea?NZC.fr:!lon?NZC.eng:tw<70?NZC.tow:NZC.lon,cur?.0115:lon?.0105:sea?.0072:.0068,dt);
  NZ.flashK=Math.max(0,NZ.flashK-dt*5);hemi.intensity=.85+dawnK*.6+NZ.flashK*2.2;NZ.bolt.material.opacity=NZ.flashK>.5?NZ.flashK:0;
  if(cur){NZ.flashT-=dt;if(NZ.flashT<=0){NZ.flashT=rand(5,11);NZ.flashK=1;const b=V3(P.pos.x+rand(-120,120),90,P.pos.z-rand(60,160));const pts=[];for(let k=0;k<14;k++){pts.push(b.clone());b.x+=rand(-7,7);b.y-=7;b.z+=rand(-3,3)}NZ.bolt.geometry.setFromPoints(pts);after(rand(.3,.9),()=>sx('impact',.35,null,{rate:.55,wet:.6}))}}
  for(const w of NZ.wisps){const u=w.userData;u.ph+=dt;if(!cur){w.visible=false;continue}w.visible=true;if(Math.abs(w.position.z-P.pos.z)>80||Math.abs(w.position.x-P.pos.x)>60)w.position.set(P.pos.x+u.o.x,u.o.y,P.pos.z+u.o.z-40);w.position.y=u.o.y+Math.sin(u.ph*1.3)*.8;w.position.x+=Math.sin(u.ph*.7)*dt*2}
  if(!started||CS.active||!P.alive)return;
  if(P.flying&&CH2.st>=2&&nzWater(P.pos.x,P.pos.z)){P.flyT=Math.max(P.flyT,4);CH2.gemOn=1}else CH2.gemOn=0;CH2.flySpd=sea?30:lon?20:26;
  if(z<CLIFF_Z-30&&NZ.cpk<1){NZ.cpk=1;NZ.cp.set(nzRiverX(-7060)+16,0,-7060)}if(lon&&NZ.cpk<2){NZ.cpk=2;NZ.cp.set(-108,0,-9648)}SPAWN.copy(NZ.cp);
  if(sea&&P.swim){NZ.swimT+=dt;if(cur){NZ.burnT-=dt;if(NZ.burnT<=0){NZ.burnT=.5;damagePlayer(maxHP()*.05);SP.emit(V3(P.pos.x,P.pos.y+.6,P.pos.z),{n:16,c0:0xc0ff90,c1:0x104010,speed:3,life:.6,up:2})}}
    if(NZ.swimT>(cur?.7:1.6)&&P.alive){NZ.swimT=0;P.flying=true;P.glide=false;P.flyT=60;P.vy=10;try{sfx.fly()}catch(e){}toast(cur?'The cursed water burns! Back on the broom!':'Back on the broom. The sea is long.')}}else NZ.swimT=0;
  const T=NZ.trig;if(z<CAL_SHORE-10&&!T.sea){T.sea=1;sxLoop('wind','wind',.32)}
  if(cur&&!T.curse){T.curse=1;if(CH2.st<3){lyraSay('ly16','Lyra, in your head');after(1.2,()=>toast('English waters. The curse begins here.','The Channel',true))}nzWave(1)}
  if(sea&&z<-6600&&!T.w2&&T.curse){T.w2=1;nzWave(2)}if(sea&&z<-6730&&!T.w3&&T.curse){T.w3=1;lyraSay('ly17','Lyra, in your head');nzWave(3)}if(sea&&z<-6860&&!T.w4&&T.curse){T.w4=1;nzWave(4)}
  if(z<CLIFF_Z+30&&!T.cliff){T.cliff=1;sxStop('wind',2.5);if(CH2.st<3){lyraSay('ly18','Lyra, in your head');after(.8,()=>toast('Land at Folkestone. Dover is east along the white cliffs. Follow the river north to London.','England',true))}}
  if(cur&&!T.cliff){NZ.spawnT-=dt;if(NZ.spawnT<=0){NZ.spawnT=rand(2.4,4);if(enemies.filter(e=>!e.dead).length<10)nzSpawnFly(Math.random()<.7?'nbat':'pumpkin',V3(P.pos.x+rand(-30,30),P.pos.y+rand(-2,5),P.pos.z-rand(50,70)))}}
  if(NZ.stones&&!T.stones&&Math.hypot(P.pos.x-NZ.stones.x,z-NZ.stones.z)<45){T.stones=1;sx('garg',.9);cineLine('Lyra','The stones are waking up. Careful!');for(let k=0;k<5;k++)nzSpawnFly(k<2?'gargoyle':'nbat',V3(NZ.stones.x+rand(-10,10),NZ.stones.y+rand(4,9),NZ.stones.z+rand(-10,10)))}
  if(lon&&!T.london&&CH2.st<3){T.london=1;nzArrive();return}
  NZ.bossCd-=dt;if(CH2.st===3&&NZ.bb&&!beaten.has('greyfang')&&(!NZ.boss||NZ.boss.dead)&&NZ.bossCd<=0&&Math.hypot(P.pos.x-NZ.bb.x,z-NZ.bb.z)<75){nzGreyfang();return}
  if(CH2.st===4&&tw<20){nzTowerEnd();return}
  if(CH2.st>=5&&NZ.home&&Math.hypot(P.pos.x-NZ.home.position.x,z-NZ.home.position.z)<2.4){nzLeave();return}
  if(lon&&CH2.st>=3&&!bossRef){NZ.tollT-=dt;if(NZ.tollT<=0){NZ.tollT=rand(55,90);nzToll(1)}NZ.lt-=dt;if(NZ.lt<=0){NZ.lt=4.5;if(enemies.filter(e=>!e.dead).length<6){const s=findSpot(P.pos.x,P.pos.z,26,46);if(s){if(Math.random()<.5)spawnEnemy('demon',s);else nzSpawnFly('nbat',V3(s.x,P.pos.y+rand(2,6),s.z))}}}}}
{const _mt=muTick;muTick=function(dt){_mt(dt);if(MODE!=='open'&&CH2.zone==='north')nzTick(Math.min(dt,.05))}}
/* Maëlle's chapter 2 lines, voiced */
Object.assign(VO_MAP,{"Who's there?! Stay back. I'm warning you.":'mx01','His sister? He killed Bilel!':'mx02','So the real Kaen is still out there. Suffering.':'mx03','London, then. Bilel would have gone.':'mx04',"Don't wait up.":'mx05',
  'Thirteen. And something is sitting on the clock.':'mx06','Kaen?':'mx07','Then I am the debt you will never collect.':'mx09','Crawling? I flew. Over your whole cursed sea.':'mx10'});

/* ---------- Greyfang, rebuilt: muscled stone-hide demon, ram horns, ribbed wings, skull trophies ---------- */
function nzTaper(curve,r0,r1,seg,rs,mat){const n=rs||8,g=new THREE.TubeGeometry(curve,seg,1,n,false),p=g.attributes.position,c=V3(),v=V3();
  for(let i=0;i<=seg;i++){const t=i/seg;curve.getPointAt(t,c);const r=lerp(r0,r1,t);for(let j=0;j<=n;j++){const k=i*(n+1)+j;v.set(p.getX(k),p.getY(k),p.getZ(k)).sub(c).multiplyScalar(r).add(c);p.setXYZ(k,v.x,v.y,v.z)}}g.computeVertexNormals();const m=new THREE.Mesh(g,mat);m.castShadow=true;return m}
function nzGFMats(){if(NZ.gfm)return NZ.gfm;const cr=[];for(let k=0;k<26;k++){let x=rand(0,256),y=rand(0,256);const pts=[[x,y]];for(let s=0;s<6;s++){x+=rand(-22,22);y+=rand(-22,22);pts.push([x,y])}cr.push(pts)}
  const draw=(x,col,w)=>{x.strokeStyle=col;x.lineWidth=w;for(const pts of cr){x.beginPath();pts.forEach((p,i)=>i?x.lineTo(p[0],p[1]):x.moveTo(p[0],p[1]));x.stroke()}};
  const map=mkCanvas(256,256,x=>{x.fillStyle='#4a4250';x.fillRect(0,0,256,256);for(let k=0;k<2600;k++){const v=rand(40,110)|0;x.fillStyle=`rgba(${v},${v-8},${v+6},.35)`;x.fillRect(rand(0,256),rand(0,256),rand(1,3),rand(1,3))}draw(x,'rgba(14,10,16,.85)',2.4)});
  const em=mkCanvas(256,256,x=>{x.fillStyle='#000';x.fillRect(0,0,256,256);draw(x,'rgba(110,255,120,.9)',1)});
  const vein=mkCanvas(128,128,x=>{x.fillStyle='#3a1e2a';x.fillRect(0,0,128,128);x.strokeStyle='rgba(20,6,12,.9)';x.lineWidth=1.5;for(let k=0;k<14;k++){x.beginPath();x.moveTo(0,rand(0,128));for(let s=0;s<6;s++)x.lineTo(s*24,rand(0,128));x.stroke()}});
  return NZ.gfm={skin:std({map:rep(new THREE.CanvasTexture(map),2,2),emissive:0xffffff,emissiveMap:rep(new THREE.CanvasTexture(em),2,2),emissiveIntensity:.55,roughness:.62,metalness:.05}),
    dark:std({color:0x1e1820,roughness:.7}),bone:std({color:0xcfc09a,roughness:.55}),horn:std({color:0x2a2420,roughness:.35,metalness:.15}),claw:std({color:0x14100e,roughness:.3}),
    mem:std({map:new THREE.CanvasTexture(vein),color:0xc08090,roughness:.75,side:THREE.DoubleSide,transparent:true,opacity:.95,emissive:0x120408}),cloth:std({color:0x2a1c18,roughness:.95,side:THREE.DoubleSide}),
    glow:new THREE.MeshBasicMaterial({color:0x9dff70})}}
function nzSkull(par,M,s,x,y,z){const g=new THREE.Group();g.position.set(x,y,z);g.scale.setScalar(s);par.add(g);const Q=nzG();nzPart(g,Q.sph,M.bone,.17,.17,.19,0,0,0);nzPart(g,Q.sph,M.bone,.1,.06,.12,0,-.12,.06);
  for(const q of[-1,1])nzPart(g,Q.sph,M.claw,.05,.05,.03,q*.065,.02,.16);nzPart(g,Q.cone,M.claw,.025,.05,.02,0,-.04,.18).rotation.x=Math.PI;return g}
function buildGreyfang(){const Q=nzG(),M=nzGFMats(),g=new THREE.Group(),body=new THREE.Group();g.add(body);const I=new THREE.Group();I.scale.setScalar(2.3);body.add(I);const P_=(geo,m,a,b,c,x,y,z,p)=>nzPart(p||I,geo,m,a,b,c,x,y,z);
  const tor=new THREE.Mesh(new THREE.LatheGeometry([[0,0],[.34,.02],[.37,.24],[.47,.52],[.62,.82],[.67,1.02],[.52,1.18],[.22,1.3],[0,1.32]].map(p=>new THREE.Vector2(p[0],p[1])),20),M.skin);tor.scale.z=.72;tor.position.y=1.18;tor.castShadow=true;I.add(tor);
  for(const q of[-1,1]){P_(Q.sph,M.skin,.27,.2,.16,q*.21,2.14,.3);for(let r=0;r<3;r++)P_(Q.sph,M.skin,.1,.075,.06,q*.1,1.56+r*.15,.3)}
  P_(Q.sph,M.skin,.38,.22,.3,0,2.5,-.04);P_(Q.sph,M.dark,.44,.28,.34,0,1.2,0);
  const sig=new THREE.Mesh(new THREE.TorusGeometry(.1,.018,6,20),M.glow);sig.position.set(0,1.98,.37);I.add(sig);for(let k=0;k<5;k++){const c=P_(Q.cone,M.glow,.022,.08,.022,(k-2)*.045,2.1+(2-Math.abs(k-2))*.012,.37)}
  for(let k=0;k<5;k++){const cl=new THREE.Mesh(new THREE.PlaneGeometry(.18,rand(.45,.7)),M.cloth);cl.position.set((k-2)*.17,.85,.28-Math.abs(k-2)*.08);cl.rotation.y=(k-2)*.3;I.add(cl)}
  for(let k=0;k<4;k++){const a=-1.1+k*.73;nzSkull(I,M,.75,Math.sin(a)*.47,1.3,Math.cos(a)*.36)}
  /* head */
  const head=new THREE.Group();head.position.set(0,2.8,.2);I.add(head);P_(Q.sph,M.skin,.24,.26,.3,0,0,0,head);const sn=P_(Q.cyl,M.skin,.13,.28,.17,0,-.06,.28,head);sn.rotation.x=Math.PI/2;
  const brow=P_(Q.sph,M.skin,.27,.08,.14,0,.1,.18,head);brow.rotation.x=-.3;const jaw=new THREE.Group();jaw.position.set(0,-.13,.06);head.add(jaw);P_(Q.sph,M.skin,.17,.06,.25,0,0,.12,jaw);
  for(let k=0;k<6;k++){const a=(k/5-.5)*1.6;P_(Q.cone,M.bone,.018,.07,.018,Math.sin(a)*.12,.05,.12+Math.cos(a)*.18,jaw);P_(Q.cone,M.bone,.016,.06,.016,Math.sin(a)*.12,-.13,.12+Math.cos(a)*.2,head).rotation.x=Math.PI}
  for(const q of[-1,1]){const e=glowSprite(0xc8ff60,.38,1);e.position.set(q*.1,.04,.28);head.add(e);P_(Q.cone,M.skin,.06,.24,.04,q*.22,.12,-.08,head).rotation.set(-.6,0,-q*.9);
    const hc=new THREE.CatmullRomCurve3([V3(q*.14,.14,-.02),V3(q*.36,.3,-.12),V3(q*.52,.52,-.36),V3(q*.46,.8,-.6),V3(q*.28,.88,-.5)]);head.add(nzTaper(hc,.09,.012,22,8,M.horn));
    const tip=glowSprite(0x80ff70,.6,.9);tip.position.set(q*.28,.88,-.5);head.add(tip)}
  /* arms */
  const arms=[];for(const q of[-1,1]){P_(Q.sph,M.skin,.3,.28,.28,q*.7,2.36,0);for(let k=0;k<3;k++)P_(Q.cone,M.bone,.05,.22,.05,q*(.72+k*.06),2.62-k*.04,-.05+k*.08).rotation.z=-q*(.35+k*.25);
    const sh=new THREE.Group();sh.position.set(q*.76,2.3,0);sh.rotation.z=q*.32;I.add(sh);P_(Q.cyl,M.skin,.15,.62,.15,0,-.32,0,sh).scale.set(.17,.62,.17);
    const el=new THREE.Group();el.position.y=-.64;el.rotation.x=-.65;sh.add(el);P_(Q.cyl,M.skin,.13,.58,.13,0,-.29,0,el);const hd=new THREE.Group();hd.position.y=-.62;el.add(hd);P_(Q.sph,M.skin,.13,.11,.15,0,0,.03,hd);
    for(let k=0;k<4;k++)P_(Q.cone,M.claw,.025,.16,.025,(k-1.5)*.05,-.12,.1).rotation.x=.4;nzSkull(hd,M,q<0?1.1:1.5,0,-.24,.12);arms.push(sh)}
  /* legs: digitigrade with claws */
  for(const q of[-1,1]){const th=P_(Q.cyl,M.skin,.2,.62,.22,q*.27,.92,.07);th.rotation.x=.42;const sn2=P_(Q.cyl,M.skin,.13,.52,.13,q*.29,.47,-.1);sn2.rotation.x=-.55;P_(Q.sph,M.skin,.11,.09,.18,q*.29,.17,.04);
    for(let k=0;k<3;k++)P_(Q.cone,M.claw,.03,.14,.03,q*.29+(k-1)*.06,.1,.2).rotation.x=1.3}
  /* tail with spade */
  const tc=new THREE.CatmullRomCurve3([V3(0,1.15,-.3),V3(0,.75,-.85),V3(.25,.45,-1.4),V3(.6,.5,-1.85),V3(.8,.7,-2.15)]);const tail=new THREE.Group();I.add(tail);tail.add(nzTaper(tc,.12,.035,24,8,M.skin));const sp=P_(Q.cone,M.skin,.14,.3,.04,.86,.76,-2.24,tail);sp.rotation.set(-.6,0,-1);
  /* wings: bone arm, four fingers, scalloped membrane */
  const wings=[];for(const q of[-1,1]){const W=new THREE.Group();W.position.set(q*.28,2.35,-.32);I.add(W);W.userData.q=q;
    const E=V3(q*.9,.55,-.25),Wr=V3(q*1.95,.9,-.15),T=[V3(q*3.25,1.05,-.35),V3(q*3.05,.25,-.45),V3(q*2.6,-.45,-.42),V3(q*1.8,-.95,-.35)];
    W.add(nzTaper(new THREE.LineCurve3(V3(),E),.08,.06,4,6,M.horn));W.add(nzTaper(new THREE.LineCurve3(E,Wr),.06,.045,4,6,M.horn));for(const t of T)W.add(nzTaper(new THREE.LineCurve3(Wr,t),.04,.01,6,6,M.horn));
    P_(Q.cone,M.claw,.05,.2,.05,Wr.x+q*.06,Wr.y+.14,Wr.z,W).rotation.z=-q*.4;
    const poly=[V3(q*.12,-.12,-.3),E,Wr,T[0]];for(let k=1;k<T.length;k++){const a=T[k-1],b=T[k];poly.push(a.clone().lerp(b,.5).lerp(Wr,.28));poly.push(b)}poly.push(V3(q*.75,-.75,-.32));
    const pos=[],uv=[];for(let k=1;k<poly.length-1;k++)for(const v of[poly[0],poly[k],poly[k+1]]){pos.push(v.x,v.y,v.z);uv.push(Math.abs(v.x)/3.3,(v.y+1)/2.1)}
    const mg=new THREE.BufferGeometry();mg.setAttribute('position',new THREE.Float32BufferAttribute(pos,3));mg.setAttribute('uv',new THREE.Float32BufferAttribute(uv,2));mg.computeVertexNormals();const mm=new THREE.Mesh(mg,M.mem);mm.castShadow=true;W.add(mm);wings.push(W)}
  const au=glowSprite(0x60ff80,9,.08);au.position.y=4.5;body.add(au);
  return{g,body,anim:(e,dt,mv,l)=>{const t=e.t,f=Math.sin(t*4.2);for(const w of wings){w.rotation.z=w.userData.q*(.25+f*.55);w.rotation.y=w.userData.q*(.25-f*.12)}body.position.y=Math.sin(t*2.1)*.5;tail.rotation.y=Math.sin(t*1.7)*.35;
    tor.scale.x=1+Math.sin(t*1.4)*.02;jaw.rotation.x=.12+l*.5+(e.busy>0?.25:0)*(.5+.5*Math.sin(t*20));head.rotation.x=-.08+Math.sin(t*1.1)*.06;arms.forEach((a,i)=>a.rotation.x=-.25-l*1.5+Math.sin(t*2+i*2)*.12);I.rotation.x=.1+l*.2;
    if(Math.random()<.35)FL.emit(V3(e.pos.x+rand(-.6,.6),e.pos.y+body.position.y+8.6,e.pos.z),{c0:0xc0ff90,c1:0x104010,s0:1,s1:.1,life:.6,up:2.5})}}}
ETYPES.greyfang.build=buildGreyfang;
/* Greyfang gets his own battle theme */
MU.keys&&MU.keys.push('mus_greyfang');
const nzGF=()=>MODE!=='open'&&bossRef&&!bossRef.dead&&bossRef.type==='greyfang';{const _bw=bmWant;bmWant=function(){if(nzGF())return null;return _bw.apply(this,arguments)}}{const _mw=muWant;muWant=function(){if(started&&nzGF())return 'mus_greyfang';return _mw.apply(this,arguments)}}

/* ---------- Calais: Lyra explains why she stays ---------- */
Object.assign(LY,{ly22:'Calais. The last French shore. Look north... England, hiding in the fog.',ly23:'I wish I could. But the Crown still knows the taste of me.',
  ly24:'The second I cross the English border, it starts feeding on me again. Every spirit in the Channel would smell me coming.',ly25:'My brother gave up his kindness so I could live. I will not hand that life back to the Crown.',
  ly26:'So I stay here and keep the door open. When you find him, I will feel it.'});
for(const k of['ly22','ly23','ly24','ly25','ly26'])VO_MAP[LY[k]]=k;Object.assign(VO_MAP,{"Why can't you come with me?":'mx11',"Then stay. I'll bring him back.":'mx12'});
function nzCalaisTalk(){const L=()=>LYR.a?LYR.a.g.position:P.pos;const face=r=>{if(LYR.a)LYR.a.g.rotation.y=r};
  const lyS=(d,sd)=>()=>{const g=L();const dv=V3(P.pos.x-g.x,0,P.pos.z-g.z).normalize();return{pos:headOf(g,1.6).addScaledVector(dv,d).addScaledVector(V3(dv.z,0,-dv.x),sd||.6),look:headOf(g,1.55)}};
  return[{who:'Lyra',text:LY.ly22,cut:true,fov:40,onStart:()=>face(Math.PI),cam:k=>({pos:V3(61.4,2.3,-2181.5+k*.6),look:V3(58,5,-2400)})},
    {who:'@',text:"Why can't you come with me?",cut:true,cam:witchShot(1,3.2)},
    {who:'Lyra',text:LY.ly23,cut:true,onStart:()=>face(0),cam:lyS(2.3)},
    {who:'Lyra',text:LY.ly24,cut:true,fov:46,cam:k=>({pos:V3(72-k*6,7+k*2,-2196),look:V3(40,9,-6460)})},
    {who:'Lyra',text:LY.ly25,cut:true,cam:lyS(1.9,-.5)},
    {who:'@',text:"Then stay. I'll bring him back.",cam:witchShot(-1,3)},
    {who:'Lyra',text:LY.ly26,cut:true,cam:lyS(2.5)},
    {who:'Lyra',text:LY.ly14,cam:lyS(2.1,-.4)},{who:'Lyra',text:LY.ly15,cam:lyS(1.8)},{who:'@',text:"Don't wait up.",cut:true,cam:witchShot(1,3.4)}]}
{const _pc=playCutscene;playCutscene=function(shots,done){if(CH2.st<3&&shots&&shots.length>=4&&shots[3]&&shots[3].text===LY.ly14&&shots[2]&&shots[2].title&&shots[2].title[0]==='Calais'){shots=shots.slice(0,3).concat(nzCalaisTalk());
    shots[2].cam=k=>({pos:V3(96-k*30,16-k*5,-2275+k*30),look:V3(-20,10,-2120)})}return _pc.call(this,shots,done)}}

/* ---------- the horizon: fog the colour of the sky, England only a faint line until you are close ---------- */
const NZH={n:new THREE.Color(0x4e3462),d:new THREE.Color(0xf2bc8e),c:new THREE.Color()};
function nzHorizon(){return NZH.c.copy(NZH.n).lerp(NZH.d,dawnK)}
{const _nf=nzFog;nzFog=function(c,d,dt){const h=nzHorizon(),z=P.pos.z,sea=z<CAL_SHORE&&z>CLIFF_Z,cal=z>=CAL_SHORE;
  const col=h.clone();if(c===NZC.cur)col.lerp(NZC.cur,.4);else if(c===NZC.lon)col.lerp(NZC.lon,.45);else if(c===NZC.tow)col.lerp(NZC.tow,.5);else if(c===NZC.eng)col.lerp(NZC.eng,.25);
  _nf(col,cal?.0088:sea&&c!==NZC.cur?.0082:d,dt);if(camera.far<1400){camera.far=1400;camera.updateProjectionMatrix()}
  if(!NZ.sil){const sh=new THREE.Shape();sh.moveTo(-900,-2);for(let x=-900;x<=900;x+=18){const y=26+Math.sin(x*.05)*1.5+Math.sin(x*.17)*.8+(Math.abs(x+140)<12?10:0)+(Math.abs(x+140)<4?6:0);sh.lineTo(x,y)}sh.lineTo(900,-2);sh.lineTo(-900,-2);
    NZ.sil=new THREE.Mesh(new THREE.ShapeGeometry(sh),new THREE.MeshBasicMaterial({color:0xffffff,transparent:true,opacity:0,fog:false,depthWrite:false}));NZ.sil.position.set(0,0,CLIFF_Z-4);NZ.sil.renderOrder=1;NZ.g.add(NZ.sil)}
  const dd=z-CLIFF_Z;NZ.sil.visible=dd>200;NZ.sil.material.opacity=.16*nzSm(240,460,dd);NZ.sil.material.color.copy(h).lerp(new THREE.Color(0xe8e4f0),.28)}}
{const _lv=nzLeave;nzLeave=function(){_lv.apply(this,arguments);camera.far=800;camera.updateProjectionMatrix()}}

/* ---------- broom boost (hold sprint while flying) after Kaen ---------- */
{const _mt=muTick;muTick=function(dt){_mt(dt);if(MODE==='open')return;CH2.boost=CH2.st>=1;const bb=$('boostBar');if(bb)bb.style.display=CH2.boost?'':'none';
  if(CH2.boost&&P.flying&&!P.boosting)P.boostT=Math.min(5,(P.boostT||0)+dt*(CH2.zone==='north'?.9:.5))}}

/* ---------- Enter / Space never re-click a button that kept focus ---------- */
document.addEventListener('click',e=>{const b=e.target&&e.target.closest&&e.target.closest('button');if(b)setTimeout(()=>{try{b.blur()}catch(x){}},0)},true);
addEventListener('keydown',e=>{if(!started||(e.key!=='Enter'&&e.code!=='Space'))return;const a=document.activeElement;if(a&&a.tagName==='BUTTON'){a.blur();if(!CS.active)e.preventDefault()}},true);

/* Maëlle (Blondie) and Kaen, voiced */
Object.assign(VO_MAP,{'Lyra is free. She sent me.':'mx13','No. The Crown was wearing your face. I read your journal, Kaen. You did it for her.':'mx14','Then let us carry it with you. We are taking you home.':'mx15',
  'Come to gloat, witch? Or worse... to pity me?':'kx1','Keep your pity. I sold my soul with my eyes open. Every monster in Paris was mine.':'kx2','I... told myself that too. Every night. While it fed on them.':'kx3',
  'Bilel... I could not stop it. I watched it wear my hands. I am so sorry...':'kx4','Then run, witch. These chains are not mine to break. They belong to its crown.':'kx5'});
for(const k of['kx1','kx2','kx3','kx4','kx5'])VO_SPIRIT.add(k);

/* ---------- chapter select: Chapter 2 and London are chapters you can jump to ---------- */
ETYPES.greyfang.lvl=58;
CHAPTERS.push({id:'crossing',n:'IX',title:'The Crossing',desc:'Lyra, Calais and the cursed Channel.'},{id:'london',n:'X',title:'Greyfang',desc:'London, Big Ben and the Tower.'});
{const _cb=chapBoss;chapBoss=function(c){if(c.id==='crossing')return null;if(c.id==='london')return'greyfang';return _cb(c)}}
{const _rc=renderChapters;renderChapters=function(){_rc();const list=$('chapList');const el=list&&list.children[chapIndexOf('crossing')];if(el){const done=CH2.st>=3,cur=started&&CH2.st>=1&&CH2.st<3;el.className='chap'+(done?' done':'')+(cur?' cur':'');
  el.innerHTML='<span class="cn">Chapter IX · Story</span><b>The Crossing</b><span class="cd">Lyra, Calais and the cursed Channel.</span><span class="cs">'+(cur?'Current · ':'')+(done?'Cleared':'Not cleared')+'</span>'}
  const el2=list&&list.children[chapIndexOf('london')];if(el2&&started&&CH2.st>=3&&CH2.st<4)el2.classList.add('cur')}}
{const _ac=applyChapter;applyChapter=function(id){if(id!=='crossing'&&id!=='london'){if(CH2.zone==='north')nzLeave();CH2.st=0;ch2Save();return _ac.apply(this,arguments)}
  if(MODE==='open')return;if(CS.active)endCutscene();nzClear();bossRef=null;$('boss').classList.add('hidden');
  for(const ch of CHAPTERS){const b=chapBoss(ch);if(b&&b!=='greyfang')beaten.add(b)}beaten.add('kaenSpirit');BQ.met=true;BQ.done=true;CLEARED.add('bilelq');P.taught.add('limit');
  STATS.won=true;if(P.level<56){P.level=56;P.xp=0}if(W.setEvolved)W.setEvolved(true);P.weak=false;P.hp=maxHP();P.mp=maxMP();P.invuln=2;
  ch2ExpandParis();lyraToTroca();$('victory').classList.add('hidden');
  if(id==='crossing'){if(CH2.zone==='north')nzLeave();CH2.st=1;beaten.delete('greyfang');setDawn(.55);P.pos.set(-126,groundAt(-126,-100),-100);yaw=Math.PI;P.face=0;after(.3,()=>toast('Lyra waits at the Trocadéro to open the door to Calais.','Chapter IX: The Crossing',true))}
  else{beaten.delete('greyfang');CH2.st=3;NZ.boss=null;nzEnter('london');NZ.trig.london=1;NZ.bossCd=4;after(.3,()=>toast('Greyfang waits on top of Big Ben.','Chapter X: Greyfang',true))}
  renderBar();ch2Save();writeSave()}}
