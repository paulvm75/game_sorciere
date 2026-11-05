
/* ================= CHAPTER 2 · The Crossing: Calais, the cursed Channel, England, London ================= */
const NZB={x0:-270,x1:270,z0:-4990,z1:-2950},CAL_SHORE=-3092,CURSE_Z=-3450,CLIFF_Z=-4000,LON_Z=-4560,TH_Z=-4760,TH_W=16,LBR=[-108,-36,72,180];
const NZ={built:false,g:null,hid:[],trig:{},cp:V3(60,0,-3072),cpk:0,spawnT:2,lt:3,burnT:0,swimT:0,fogC:new THREE.Color(0x1d2238),fogD:.008,flashK:0,flashT:6,tollT:40,bossCd:0,boss:null,anim:[],mapR:[],mapP:[],eye:null,ravens:[],wisps:[]};
const nzSm=(a,b,x)=>{const t=clamp((x-a)/(b-a),0,1);return t*t*(3-2*t)};
function nzRiverX(z){return 20+60*Math.sin((z-CLIFF_Z)/95)+18*Math.sin((z-CLIFF_Z)/37)}
function nzRiverOn(z){return z<CLIFF_Z-34&&z>LON_Z+6}
function nzBase(z){const t=clamp((CLIFF_Z-z)/(CLIFF_Z-LON_Z),0,1);return 30*(1-nzSm(.12,1,t))}
function nzLand(x,z){const t=clamp((CLIFF_Z-z)/(CLIFF_Z-LON_Z),0,1),b=nzBase(z);const amp=6.5*Math.pow(Math.sin(Math.min(1,t*1.15)*Math.PI),.8);
  let h=b+amp*(.55*Math.sin(x*.021+1.3)*Math.cos(z*.017+.4)+.3*Math.sin(x*.047+z*.031)+.15*Math.cos(z*.083-x*.011));
  if(nzRiverOn(z)||(z<CLIFF_Z-20&&z>LON_Z)){const v=(1-nzSm(4.5,22,Math.abs(x-nzRiverX(z))))*nzSm(CLIFF_Z-20,CLIFF_Z-40,z)*nzSm(LON_Z,LON_Z+12,z);h=lerp(h,b-1.6,v)}return h}
function nzGround(x,z){const l=lotAt(x,z);if(l)return roofH(l,x,z);
  if(z>CAL_SHORE)return z>-3058?0:lerp(0,-.35,(-3058-z)/34);
  if(z>CLIFF_Z){if(Math.abs(x-60)<4.2&&z>-3192)return 1.2;return z<CLIFF_Z+15?-.3:-.85}
  if(z>LON_Z-2)return nzLand(x,z);
  if(Math.abs(z-TH_Z)<TH_W)return LBR.some(b=>Math.abs(x-b)<5)?.5:-.85;return 0}
function nzWater(x,z){if(z<=CAL_SHORE&&z>CLIFF_Z+15)return !(Math.abs(x-60)<4.2&&z>-3192);
  if(z<=CLIFF_Z&&z>LON_Z-2)return nzRiverOn(z)&&Math.abs(x-nzRiverX(z))<4.5;
  if(z<=LON_Z-2)return Math.abs(z-TH_Z)<TH_W-.15&&!LBR.some(b=>Math.abs(x-b)<5);return false}
{const _g=groundAt;groundAt=function(x,z,y){if(MODE!=='open'&&z<-2800)return nzGround(x,z);return _g.apply(this,arguments)}}
{const _w=stWater;stWater=function(x,z){if(MODE!=='open'&&z<-2800)return nzWater(x,z);return _w(x,z)}}
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
  const m=new THREE.Mesh(new THREE.PlaneGeometry(NZB.x1-NZB.x0+40,H||70),mat);m.position.set(0,(H||70)/2-4,z);G.add(m);NZ.anim.push(dt=>mat.uniforms.uT.value+=dt);return m}
function nzPortal(at,col){const g=new THREE.Group();g.position.copy(at);const c=col||0xff3a4a;
  const disc=mkCanvas(128,128,(x)=>{const gr=x.createRadialGradient(64,64,4,64,64,62);gr.addColorStop(0,'rgba(255,240,240,1)');gr.addColorStop(.35,'rgba(255,60,80,.85)');gr.addColorStop(.8,'rgba(120,0,30,.5)');gr.addColorStop(1,'rgba(0,0,0,0)');x.fillStyle=gr;x.fillRect(0,0,128,128);x.strokeStyle='rgba(255,200,200,.6)';x.lineWidth=3;for(let k=0;k<6;k++){x.beginPath();x.arc(64,64,14+k*8,k,k+2.2);x.stroke()}});
  const d=new THREE.Mesh(new THREE.CircleGeometry(2.1,40),new THREE.MeshBasicMaterial({map:new THREE.CanvasTexture(disc),transparent:true,blending:THREE.AdditiveBlending,depthWrite:false,side:THREE.DoubleSide}));d.position.y=2.4;g.add(d);
  const r=new THREE.Mesh(new THREE.TorusGeometry(2.2,.12,8,48),new THREE.MeshBasicMaterial({color:c}));r.position.y=2.4;g.add(r);const gl=glowSprite(c,9,.6);gl.position.y=2.4;g.add(gl);
  g.userData.tick=dt=>{d.rotation.z-=dt*2.2;const s=1+Math.sin(performance.now()*.006)*.04;d.scale.set(s,s,1);if(Math.random()<.5)SP.emit(V3(at.x+rand(-1.6,1.6),at.y+rand(.6,4.2),at.z),{c0:0xffd0d0,c1:c,s0:.35,s1:.05,life:.7,speed:.6})};scene.add(g);return g}

/* ---------- Calais ---------- */
function nzCalais(G){const M=nzM();const gm=c2plane(G,540,112,0,-.02,-3004,nzGroundMat(540,112));gm.material.color.setHex(0x8a8494);
  c2plane(G,540,40,0,-.18,-3076,M.sand).rotation.x=-Math.PI/2-.0105;c2box(G,540,.7,1.2,0,-.2,-3058.6,M.plain,false);
  const H=[],rnd=()=>Math.random(),cols=[0x9a5040,0xb8a88a,0xd8d0c0,0x7a4a3a,0xa8b0b8,0xc89a70],rcs=[0x3a3c48,0x7a3a2a,0x4a4a52];
  for(const[z,d] of[[-3044,10],[-3020,12],[-2996,12],[-2972,12]])for(let x=-258;x<=258;){const w=rand(7,11);if(!(Math.abs(x+90)<16&&z>-3050)&&!(Math.abs(x-20)<26&&z>-3012&&z<-2984)&&Math.abs(x-60)>7&&Math.abs(x)%48>8)H.push({x:x+w/2,z,w:w-.6,d,h:rand(7,11),rh:rand(2.4,3.6),c:cols[(rnd()*6)|0],rc:rcs[(rnd()*3)|0]});x+=w}
  nzHouses(G,H);
  /* Hôtel de Ville and its belfry */
  nzBox(G,34,13,14,20,0,-2998,M.brick,true);nzBox(G,7,46,7,20,0,-2990,M.brick,true);for(const y of[12,24,36])c2box(G,7.4,.6,7.4,20,y,-2990,M.plain,false);
  const ck=nzClockTex();for(const[dx,dz,ry]of[[0,3.75,0],[0,-3.75,Math.PI],[3.75,0,Math.PI/2],[-3.75,0,-Math.PI/2]]){const f=new THREE.Mesh(new THREE.CircleGeometry(2.4,28),new THREE.MeshBasicMaterial({map:ck}));f.position.set(20+dx,41,-2990+dz);f.rotation.y=ry;G.add(f)}
  nzCone(G,5.4,12,20,46,-2990,M.copper);nzGlow(G,0xffe0a0,10,.35,20,41,-2990);NZ.mapP.push([20,-2990]);
  /* the lighthouse */
  nzCyl(G,2.6,3.6,38,-90,0,-3030,M.white,8);boxes.push({x0:-93.5,x1:-86.5,z0:-3033.5,z1:-3026.5,h:44,nz:1});nzLot(-93,-87,-3033,-3027,42.5,0);nzCyl(G,2.3,2.3,4,-90,38,-3030,M.glow(0xffe8a0,.6),8);nzCone(G,2.8,3,-90,42,-3030,M.dark,8,0);
  const piv=new THREE.Group();piv.position.set(-90,40,-3030);G.add(piv);const bm=new THREE.Mesh(new THREE.ConeGeometry(5,90,20,1,true),M.glow(0xfff0b0,.09));bm.geometry.translate(0,-45,0);bm.rotation.z=Math.PI/2;piv.add(bm);
  const bm2=bm.clone();bm2.rotation.z=-Math.PI/2;piv.add(bm2);nzGlow(G,0xffe8a0,14,.8,-90,40,-3030);NZ.anim.push(dt=>piv.rotation.y+=dt*.6);NZ.mapP.push([-90,-3030]);
  /* the jetty */
  c2box(G,8,.4,104,60,.8,-3140,std({color:0x5a4634,roughness:.9}),false);for(let z=-3092;z>=-3190;z-=8)for(const s of[-1,1]){nzCyl(G,.22,.22,2.6,60+s*3.8,-1.4,z,M.dark,6);if(z%16===0)nzGlow(G,0xffc070,2.4,.8,60+s*3.6,2.6,z)}
  nzGlow(G,0x60ff90,4,.9,60,3.2,-3190);
  /* beach huts */
  const hut=[];for(let x=-250;x<=250;x+=6.5)if(Math.abs(x-60)>8&&Math.abs(x+90)>8)hut.push({x,z:-3066,w:3,d:3,h:2.6,rh:1.2,c:[0xd84a4a,0x4a8ad8,0xf0d040,0x5ac080,0xf0f0f0][(Math.random()*5)|0],rc:0xf0f0f0});nzHouses(G,hut);
  /* a ferry asleep at the harbour */
  const fy=new THREE.Group();fy.position.set(200,0,-3122);G.add(fy);const hull=new THREE.Mesh(new THREE.BoxGeometry(48,6,11),M.white);hull.position.y=1.5;fy.add(hull);const st=new THREE.Mesh(new THREE.BoxGeometry(30,5,9),M.white);st.position.set(-3,7,0);fy.add(st);
  const fn=new THREE.Mesh(new THREE.CylinderGeometry(1.6,1.8,5,12),M.red);fn.position.set(-8,12,0);fy.add(fn);for(let k=0;k<12;k++)for(const s of[-1,1]){const w=glowSprite(0xfff0c0,1,.8);w.position.set(-16+k*2.6,7.5,s*4.6);fy.add(w)}
  for(let k=0;k<26;k++)nzGlow(G,0xffb060,3,.9,rand(-250,250),5,rand(-2960,-3050));NZ.mapR.push([176,-3128,48,11])}
function nzClockTex(){if(NZ.ck)return NZ.ck;const c=mkCanvas(128,128,(x)=>{x.fillStyle='#f6ecd0';x.beginPath();x.arc(64,64,62,0,TAU);x.fill();x.strokeStyle='#2a2418';x.lineWidth=4;x.stroke();x.lineWidth=1.5;x.beginPath();x.arc(64,64,48,0,TAU);x.stroke();
  x.fillStyle='#2a2418';for(let k=0;k<12;k++){const a=k/12*TAU;x.save();x.translate(64+Math.sin(a)*54,64-Math.cos(a)*54);x.rotate(a);x.fillRect(-2,-6,4,12);x.restore()}x.fillRect(62,22,4,44);x.save();x.translate(64,64);x.rotate(2.2);x.fillRect(-2,-34,4,34);x.restore()});return NZ.ck=new THREE.CanvasTexture(c)}

/* ---------- the Channel ---------- */
function nzSea(G){const M=nzM();const sea=c2plane(G,600,893,0,.05,-3538.5,M.sea);sea.receiveShadow=false;
  const cm=new THREE.ShaderMaterial({uniforms:{uT:{value:0}},transparent:true,depthWrite:false,blending:THREE.AdditiveBlending,
    vertexShader:'varying vec3 vW;void main(){vW=(modelMatrix*vec4(position,1.)).xyz;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}',
    fragmentShader:'uniform float uT;varying vec3 vW;void main(){vec2 p=vW.xz*.045;float n=sin(p.x*3.1+uT*.6+sin(p.y*2.3+uT*.4))*sin(p.y*2.7-uT*.5+sin(p.x*1.7));float c=smoothstep(.55,1.,n)*.5+smoothstep(-.2,.9,n)*.06;float edge=(1.-smoothstep(-3520.,-3450.,vW.z))*smoothstep(-4010.,-3960.,vW.z);float fd=exp(-pow(distance(vW,cameraPosition)*.0105,2.));gl_FragColor=vec4(vec3(.2,1.,.55)*c*edge*fd,1.);}'});
  const cp=c2plane(G,600,560,0,.12,-3725,cm);cp.renderOrder=2;NZ.anim.push(dt=>cm.uniforms.uT.value+=dt);
  nzMistWall(G,CURSE_Z,0x30ff90,64);for(let x=-250;x<=250;x+=36){nzCyl(G,.5,.7,2.2,x,-.6,CURSE_Z,M.red,8);nzGlow(G,0xff3030,3,.9,x,2.2,CURSE_Z)}
  /* a wreck and a drowned mast in the cursed water */
  const wr=new THREE.Group();wr.position.set(-36,-1.2,-3640);wr.rotation.set(.25,.6,.35);G.add(wr);const hm=std({color:0x2a2018,roughness:1});const hb=new THREE.Mesh(new THREE.BoxGeometry(5,3,18),hm);wr.add(hb);
  const ms=new THREE.Mesh(new THREE.CylinderGeometry(.2,.28,16,6),hm);ms.position.set(0,8,2);ms.rotation.z=.2;wr.add(ms);const yd=new THREE.Mesh(new THREE.BoxGeometry(7,.2,.2),hm);yd.position.set(.8,12,2);wr.add(yd);nzGlow(G,0x50ff90,10,.5,-36,2,-3640);
  nzCyl(G,.2,.3,14,96,-2,-3830,hm,6).rotation.z=-.3;nzGlow(G,0x50ff90,6,.45,96,6,-3830);NZ.mapP.push([-36,-3640]);
  for(let k=0;k<26;k++){const w=glowSprite(0x60ff9a,rand(1.2,2.4),.85);w.userData={ph:Math.random()*TAU,o:V3(rand(-40,40),rand(1,4),rand(-60,20))};NZ.g.add(w);NZ.wisps.push(w)}
  /* white cliffs of Dover */
  const cg=new THREE.PlaneGeometry(560,34,140,10);const pa=cg.attributes.position;for(let i=0;i<pa.count;i++){const x=pa.getX(i),y=pa.getY(i);pa.setZ(i,Math.sin(x*.07)*1.6+Math.sin(x*.23+y*.3)*.8+(y>15?-1.2:0))}cg.computeVertexNormals();
  const cl=new THREE.Mesh(cg,M.chalk);cl.position.set(0,14,CLIFF_Z+.5);cl.receiveShadow=true;G.add(cl);c2plane(G,560,16,0,-.28,CLIFF_Z+8,M.sand);
  boxes.push({x0:-400,x1:400,z0:CLIFF_Z-5,z1:CLIFF_Z,h:29.6,nz:1})}

/* ---------- England ---------- */
function nzCountry(G){const M=nzM();const W=540,D=564,z0=CLIFF_Z,zc=CLIFF_Z-D/2;
  const tex=mkCanvas(1024,1024,(x)=>{x.fillStyle='#3a5a2c';x.fillRect(0,0,1024,1024);const pal=['#3c5e2c','#4a6a30','#5e7034','#7a7440','#2e4c26','#8a8044','#55683a','#6a7a3a'];
    const U=v=>(v+270)/540*1024,V=v=>(v-(z0-D))/D*1024;
    for(let k=0;k<260;k++){const cx=rand(0,1024),cy=rand(0,1024),w=rand(40,110),h=rand(30,90),a=rand(-.5,.5);x.save();x.translate(cx,cy);x.rotate(a);x.fillStyle=pal[(Math.random()*pal.length)|0];x.fillRect(-w/2,-h/2,w,h);
      if(Math.random()<.35){x.strokeStyle='rgba(0,0,0,.1)';x.lineWidth=1;for(let s=-h/2;s<h/2;s+=5){x.beginPath();x.moveTo(-w/2,s);x.lineTo(w/2,s);x.stroke()}}x.strokeStyle='#1c3018';x.lineWidth=3;x.strokeRect(-w/2,-h/2,w,h);x.restore()}
    x.strokeStyle='#8a8478';x.lineWidth=6;x.beginPath();for(let z=z0-4;z>z0-D;z-=8){const xx=nzRiverX(z)+34+Math.sin(z*.03)*10;z===z0-4?x.moveTo(U(xx),V(z)):x.lineTo(U(xx),V(z))}x.stroke();
    x.strokeStyle='#2a4a66';x.lineWidth=16;x.beginPath();for(let z=CLIFF_Z-34;z>LON_Z+6;z-=6)z===CLIFF_Z-34?x.moveTo(U(nzRiverX(z)),V(z)):x.lineTo(U(nzRiverX(z)),V(z));x.stroke()});
  const tg=new THREE.PlaneGeometry(W,D,108,112);tg.rotateX(-Math.PI/2);const pa=tg.attributes.position;for(let i=0;i<pa.count;i++){const x=pa.getX(i),z=pa.getZ(i)+zc;pa.setY(i,nzLand(x,z))}tg.translate(0,0,zc);tg.computeVertexNormals();
  const tm=new THREE.Mesh(tg,std({map:new THREE.CanvasTexture(tex),roughness:.95,emissive:0x060a06}));tm.receiveShadow=true;G.add(tm);
  /* the river */
  const rp=[],ri=[];let n=0;for(let z=CLIFF_Z-30;z>LON_Z+4;z-=4){const x=nzRiverX(z),y=nzBase(z)-.7;rp.push(x-4.6,y,z,x+4.6,y,z);if(n){const a=(n-1)*2;ri.push(a,a+1,a+2,a+1,a+3,a+2)}n++}
  const rg=new THREE.BufferGeometry();rg.setAttribute('position',new THREE.Float32BufferAttribute(rp,3));rg.setIndex(ri);rg.computeVertexNormals();const uv=[];for(let k=0;k<n;k++)uv.push(0,k*.25,1,k*.25);rg.setAttribute('uv',new THREE.Float32BufferAttribute(uv,2));
  G.add(new THREE.Mesh(rg,std({color:0x4a6a88,roughness:.1,metalness:.6,emissive:0x0a1828,side:THREE.DoubleSide})));
  /* cottages, trees, sheep */
  const H=[],T=[],S=[];for(let k=0;k<70;k++){const x=rand(-245,245),z=rand(CLIFF_Z-50,LON_Z+30);if(Math.abs(x-nzRiverX(z))<18)continue;const w=rand(5,8),d=rand(4,6);const y=Math.min(nzLand(x-w/2,z),nzLand(x+w/2,z),nzLand(x,z-d/2),nzLand(x,z+d/2))-.2;
    H.push({x,z,w,d,h:rand(3.4,4.6),rh:rand(2.2,3),y,c:Math.random()<.6?0xe8e2d2:0xb0a088,rc:Math.random()<.5?0x5a4a30:0x3a3c46})}nzHouses(G,H);
  for(let k=0;k<420;k++){const x=rand(-262,262),z=rand(CLIFF_Z-14,LON_Z+12);if(Math.abs(x-nzRiverX(z))<7)continue;T.push([x,z,rand(.8,1.4),nzLand(x,z)-.1])}nzTrees(G,T);
  for(let k=0;k<60;k++){const x=rand(-240,240),z=rand(CLIFF_Z-40,LON_Z+60);if(Math.abs(x-nzRiverX(z))<10)continue;S.push([x,z,nzLand(x,z)])}
  CITY_PARENT=G;instanced(new THREE.SphereGeometry(.55,8,6),std({color:0xf0ece0,roughness:1}),S,(o,s)=>{o.position.set(s[0],s[2]+.6,s[1]);o.scale.set(1.25,.9,.9);o.rotation.y=s[0]});
  instanced(new THREE.SphereGeometry(.25,8,6),std({color:0x222020,roughness:1}),S,(o,s)=>{o.position.set(s[0]+Math.cos(s[0])*.7,s[2]+.75,s[1]-Math.sin(s[0])*.7)});CITY_PARENT=null;
  /* Dover Castle on the cliff top */
  {const cx=-140,cz=CLIFF_Z-46,y=nzLand(cx,cz)-.3;nzBox(G,16,18,16,cx,y,cz,M.stone,true);for(const a of[-1,1])for(const b of[-1,1])nzCyl(G,2,2.2,21,cx+a*8,y,cz+b*8,M.plain,10);
    for(const[w,d,x,z]of[[44,2,cx,cz-22],[44,2,cx,cz+22],[2,44,cx-22,cz],[2,44,cx+22,cz]])nzBox(G,w,6,d,x,y,z,M.plain,true);const fl=new THREE.Mesh(new THREE.PlaneGeometry(3,2),std({color:0xd02030,side:THREE.DoubleSide}));fl.position.set(cx,y+23,cz);G.add(fl);NZ.mapP.push([cx,cz])}
  /* a church on the hill */
  {const cx=-150,cz=-4250,y=nzLand(cx,cz)-.3;nzBox(G,8,8,18,cx,y,cz,M.plain,true);nzBox(G,5,14,5,cx,y,cz+10,M.plain,true);nzCone(G,3.6,12,cx,y+14,cz+10,M.slate);nzGlow(G,0xffd080,5,.6,cx,y+6,cz-9.2)}
  /* the Crown stones: a ring that still hums */
  {const cx=128,cz=-4300,y=nzLand(cx,cz);NZ.stones=V3(cx,y,cz);const sm=std({color:0x6a6a70,roughness:.95});for(let k=0;k<12;k++){const a=k/12*TAU;const s=nzBox(G,1.6,5.2,1,cx+Math.cos(a)*11,y-.4,cz+Math.sin(a)*11,sm,false);s.rotation.y=-a}
    for(let k=0;k<6;k++){const a=k/6*TAU+.26;c2box(G,1.4,.9,5,cx+Math.cos(a)*11,y+4.8,cz+Math.sin(a)*11,sm,false).rotation.y=-a+Math.PI/2}const gl=nzGlow(G,0x50ff8a,20,.4,cx,y+3,cz);const rn=decal(runeTex,0x50ff8a,16,true,.6);rn.position.set(cx,y+.2,cz);G.add(rn);NZ.anim.push(dt=>{rn.rotation.z+=dt*.3;gl.material.opacity=.3+Math.sin(performance.now()*.002)*.12});NZ.mapP.push([cx,cz])}
  /* where the river meets the city: a stone arch */
  {const z=LON_Z+8,x=nzRiverX(z);const a=new THREE.Mesh(new THREE.TorusGeometry(6.4,1.2,8,20,Math.PI),M.stone);a.position.set(x,-.6,z);G.add(a)}}

/* ---------- London ---------- */
function nzLondon(G){const M=nzM();c2plane(G,560,440,0,-.02,-4775,nzGroundMat(560,440));
  const th=c2plane(G,560,TH_W*2,0,.05,TH_Z,M.sea);th.material=M.sea;for(const s of[-1,1])c2box(G,560,1.4,.8,0,-1.1,TH_Z+s*(TH_W+.4),M.plain,false);
  const resv=[[-206,-96,-4840,-4778],[0,72,-4900,-4824],[184,260,-4870,-4790],[-96,-24,-4750,-4690],[106,146,-4720,-4670]];
  const A=cityArrs(0);for(let i=-2;i<=11;i++)for(const j of[-123,-124,-125,-126,-129,-130,-131,-132]){const cx=-162+i*PITCH,cz=-162+j*PITCH;if(resv.some(r=>cx+14>r[0]&&cx-14<r[1]&&cz+14>r[2]&&cz-14<r[3]))continue;stCell(cx,cz,i,j,A);NZ.mapR.push([cx-14,cz-14,28,28])}
  A.columns.length=0;const brick=facadeMats.map(m=>{const c=m.clone();c.color=new THREE.Color(0xb87060);return c});cityFlush(A,G,{facade:brick});
  for(let x=-264;x<=264;x+=12)if(!LBR.some(b=>Math.abs(x-b)<7))for(const s of[-1,1])A.lamps.push([x,TH_Z+s*(TH_W+1.6)]);lampFlush(A.lamps,G);for(const l of A.lamps)lampList.push(l);
  for(const b of LBR)nzBridge(G,b,b===-108?0x3a7a50:b===180?null:0x8a2a2a);
  nzBigBen(G);nzEye(G,-60,-4728);nzShard(G,126,-4692);nzStPauls(G,36,-4862);nzTowerBridge(G,180);nzTower(G);
  /* red buses and phone boxes */
  const bus=(x,z,ry)=>{const b=new THREE.Group();b.position.set(x,0,z);b.rotation.y=ry;G.add(b);const m=new THREE.Mesh(new THREE.BoxGeometry(2.5,4.2,10),M.red);m.position.y=2.4;b.add(m);for(const y of[1.9,3.6]){const w=new THREE.Mesh(new THREE.BoxGeometry(2.56,.8,9.2),std({color:0x101018,emissive:0x3a2a10,roughness:.2}));w.position.y=y;b.add(w)}
    for(const s of[-1,1]){const h=glowSprite(0xfff0d0,1.6,.8);h.position.set(s*.9,1,5.05);b.add(h)}boxes.push({x0:x-2,x1:x+2,z0:z-5.5,z1:z+5.5,h:4.6,nz:1})};
  bus(-106,-4758,0);bus(70,-4766,0);bus(-0,-4644,Math.PI/2);bus(-144,-4680,0);
  const ph=[];for(let x=-216;x<=216;x+=72)for(const z of[-4608,-4716,-4824,-4932])ph.push([x+16.4,z+4]);CITY_PARENT=G;instanced(new THREE.BoxGeometry(1.1,2.6,1.1),M.red,ph,(o,p)=>{o.position.set(p[0],1.3,p[1])});
  instanced(new THREE.BoxGeometry(.9,.9,1.14),M.glow(0xfff0c0,.7),ph,(o,p)=>{o.position.set(p[0],1.9,p[1])});CITY_PARENT=null}
function nzBridge(G,x,rail){const M=nzM();const L=TH_W*2+4;const d=new THREE.Mesh(new THREE.BoxGeometry(10,.5,L),M.plain);d.position.set(x,.25,TH_Z);d.receiveShadow=true;G.add(d);
  if(rail){const rm=std({color:rail,roughness:.5,metalness:.3});for(const s of[-1,1]){c2box(G,.4,1,L,x+s*4.9,.5,TH_Z,rm,false);for(const z of[-12,0,12])nzGlow(G,0xffc070,2.4,.85,x+s*4.9,2.6,TH_Z+z)}
    for(const z of[-8,8]){const a=new THREE.Mesh(new THREE.TorusGeometry(7,.9,8,20,Math.PI),M.plain);a.rotation.y=Math.PI/2;a.position.set(x,-6.6,TH_Z+z);G.add(a)}}}
function nzBigBen(G){const M=nzM(),x=-118,z=-4792;NZ.bb=V3(x,0,z);
  nzBox(G,76,15,20,-160,0,-4794,M.ben,true);c2box(G,77,2,21,-160,15,-4794,M.slate,false);
  const pin=[];for(let px=-197;px<=-123;px+=3)for(const s of[-1,1])pin.push([px,-4794+s*10.2]);CITY_PARENT=G;instanced(new THREE.ConeGeometry(.35,3,4),M.ben,pin,(o,p)=>{o.position.set(p[0],17.5,p[1])});CITY_PARENT=null;
  nzBox(G,8,9,8,-160,15,-4794,M.ben,false);nzCone(G,4.6,14,-160,24,-4794,M.slate,8,0);
  nzBox(G,13,42,13,-202,0,-4794,M.ben,true);for(const a of[-1,1])for(const b of[-1,1])nzCone(G,.8,6,-202+a*6,42,-4794+b*6,M.ben,4);
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
function nzTower(G){const M=nzM();const cx=224,cz=-4830;NZ.green=V3(206,0,-4812);
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
  x.fillStyle='#8a7a5a';x.fillRect(0,Z(-3058),Wd,Z(CAL_SHORE)-Z(-3058));x.fillStyle='#284332';x.fillRect(0,Z(LON_Z),Wd,Z(CLIFF_Z)-Z(LON_Z));x.fillStyle='#e8e6dc';x.fillRect(0,Z(CLIFF_Z)-2,Wd,4);
  x.strokeStyle='#2b4b86';x.lineWidth=9;x.beginPath();for(let z=CLIFF_Z-34;z>LON_Z+6;z-=6)z===CLIFF_Z-34?x.moveTo(X(nzRiverX(z)),Z(z)):x.lineTo(X(nzRiverX(z)),Z(z));x.stroke();
  x.fillStyle='#2b4b86';x.fillRect(0,Z(TH_Z-TH_W),Wd,TH_W*2);x.fillStyle='#6b6278';for(const b of LBR)x.fillRect(X(b-5),Z(TH_Z-TH_W),10,TH_W*2);x.fillRect(X(56),Z(-3192),8,100);
  x.fillStyle='#6b6278';for(const r of NZ.mapR)x.fillRect(X(r[0]),Z(r[1]),r[2],r[3]);x.fillStyle='#f2a541';for(const p of NZ.mapP)x.fillRect(X(p[0])-4,Z(p[1])-4,8,8)}
{const _dw=drawWorldMap;drawWorldMap=function(){if(MODE!=='open'&&CH2.zone==='north')return nzDrawMap();return _dw.apply(this,arguments)}}

/* ---------- moving between Paris and the north ---------- */
function nzClear(){for(const e of enemies)if(!e.dead)removeEnemy(e);for(const p of eProjs)scene.remove(p.s);eProjs.length=0}
function nzEnter(where){nzBuild();if(CH2.zone==='paris'){CH2.parisWB={x0:WB.x0,x1:WB.x1,z0:WB.z0,z1:WB.z1};NZ.hid=scene.children.filter(o=>o.visible&&!nzKeep(o));for(const o of NZ.hid)o.visible=false}
  nzClear();CH2.zone='north';NZ.g.visible=true;Object.assign(WB,NZB);drawWorldMap();setDawn(.08);NZ.fogD=scene.fog.density;NZ.fogC.copy(scene.fog.color);
  const p=where==='london'?V3(-108,0,-4608):V3(60,0,-3072);NZ.cp.copy(p);SPAWN.copy(p);P.pos.set(p.x,groundAt(p.x,p.z),p.z);P.vy=0;P.flying=false;P.glide=false;yaw=0;P.face=Math.PI;
  camera.position.set(p.x,P.pos.y+5,p.z+12);if(CH2.st>=5)nzAfter();CH2.obj=nzObj;ch2Save()}
function nzLeave(){nzClear();sxStop('wind',1);CH2.zone='paris';if(NZ.g)NZ.g.visible=false;for(const o of NZ.hid)o.visible=true;NZ.hid=[];Object.assign(WB,CH2.parisWB||{x0:-430,x1:430,z0:-330,z1:300});drawWorldMap();
  setDawn(STATS.won?.55:dawnK);SPAWN.set(-100,0,22);CH2.flySpd=0;lyraToTroca();const p=V3(-126,0,-100);P.pos.set(p.x,groundAt(p.x,p.z),p.z);P.vy=0;P.flying=false;yaw=Math.PI;P.face=0;camera.position.set(p.x,P.pos.y+5,p.z-12);
  flash(headOf(P.pos,1.2),0xff4050,8);toast('Back in Paris. Lyra can open the door to London again.','Paris',true);ch2Save()}
function ch2Depart(back){if(CS.active)return;const L=LYR.a?LYR.a.g.position.clone():P.pos.clone();const fw=V3(Math.sin(LYR.a?LYR.a.g.rotation.y:0),0,Math.cos(LYR.a?LYR.a.g.rotation.y:0));const door=L.clone().addScaledVector(V3(fw.z,0,-fw.x),2.6);let portal=null;
  const lyS=d=>()=>{const g=LYR.a?LYR.a.g.position:P.pos;const dv=V3(P.pos.x-g.x,0,P.pos.z-g.z).normalize();return{pos:headOf(g,1.6).addScaledVector(dv,d||2.6).addScaledVector(V3(dv.z,0,-dv.x),.6),look:headOf(g,1.55)}};
  const shots=[{dur:3.4,fov:44,title:back?null:['Chapter 2','The Crossing'],cam:k=>({pos:headOf(door,2).add(V3(6-k*2,0,6)),look:headOf(door,2)}),onStart:()=>{if(!portal)portal=nzPortal(door);sx('portal',1,()=>{try{sfx.blink()}catch(e){}},{wet:.4});try{LYR.a.fire('Spell_Simple_Shoot',.8)}catch(e){}},update:dt=>{if(portal)portal.userData.tick(dt)}},
    {dur:1.2,cam:k=>({pos:headOf(door,2.2).add(V3(0,0,3-k*2.4)),look:headOf(door,2.4)}),onStart:()=>{flash(headOf(door,2.4),0xff5060,12);sx('portal',.8,null,{rate:.8})}}];
  if(back)shots.push({dur:5,fov:50,cut:true,title:['London','Lyra\'s door holds'],onStart:()=>{if(portal){scene.remove(portal);portal=null}nzEnter('london')},cam:k=>({pos:V3(-150+k*40,40-k*10,-4640),look:V3(-90,30,-4760)})});
  else shots.push({dur:6,fov:50,cut:true,title:['Calais','The edge of French waters'],onStart:()=>{if(portal){scene.remove(portal);portal=null}nzEnter('calais');lyraPlace(60,-3086,0);LYR.home=false},cam:k=>({pos:V3(110-k*36,24-k*6,-3168+k*8),look:V3(-30,14,-3020)})},
    {who:'Lyra',text:LY.ly14,cut:true,cam:lyS(2.4)},{who:'Lyra',text:LY.ly15,cam:lyS(2)},{who:'@',text:'Don\'t wait up.',cut:true,cam:witchShot(1,3.4)});
  playCutscene(shots,()=>{if(portal)scene.remove(portal);if(!back){CH2.st=Math.max(CH2.st,2);ch2Save();toast('Take off and fly north. Hold jump to climb. The broom will not tire over the sea.','The Channel',true)}})}
function nzObj(){if(CH2.zone==='paris')return LYR.a&&LYR.home?`Meet <b>Lyra</b> at the Trocadéro · ${Math.round(Math.hypot(P.pos.x+126,P.pos.z+112))}m`:null;const z=P.pos.z;
  if(CH2.st<3)return z>CLIFF_Z?`Fly north across the <b>Channel</b> · ${Math.round(z-CLIFF_Z)}m`:`Follow the river to <b>London</b> · ${Math.round(z-LON_Z)}m`;
  if(CH2.st===3&&NZ.bb)return `Something waits on <b>Big Ben</b> · ${Math.round(Math.hypot(P.pos.x-NZ.bb.x,P.pos.z-NZ.bb.z))}m`;
  if(CH2.st===4&&NZ.green)return `Find Kaen in the <b>Tower of London</b> · ${Math.round(Math.hypot(P.pos.x-NZ.green.x,P.pos.z-NZ.green.z))}m`;
  return 'Chapter 2 complete · Lyra\'s red door by the Tower leads home'}
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
  playCutscene([{dur:5.5,fov:50,title:['London','City of the Hollow Crown'],cam:k=>({pos:V3(-10+k*30,62-k*14,-4590-k*50),look:V3(-60,26,-4760)})},
    {who:'Lyra',text:LY.ly19,cam:k=>({pos:V3(-140+k*16,20,-4718),look:V3(-60,33,-4728)})},
    {dur:5,fov:42,cut:true,cam:k=>({pos:V3(-96,10+k*26,-4750),look:V3(B.x,46,B.z)}),onStart:()=>nzToll(13)},
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
function nzAfter(){if(NZ.afterDone)return;NZ.afterDone=1;if(!NZ.ghost)NZ.ghost=nzGhostKaen(NZ.green);if(!NZ.crown)NZ.crown=nzCrown(V3(232,34,-4836));NZ.home=nzPortal(V3(222,0,-4794));NZ.g.add(NZ.home);NZ.anim.push(dt=>NZ.home.userData.tick(dt))}
function nzTowerEnd(){CH2.st=Math.max(CH2.st,5);ch2Save();const c=NZ.green;let ghost=null,crown=null;const kS=()=>({pos:headOf(c,1.3).add(V3(2.2,.2,3.2)),look:headOf(c,.9)});const crS=()=>({pos:V3(c.x-6,6,c.z+16),look:V3(232,34,-4836)});
  playCutscene([{dur:4.2,fov:46,title:['The Tower of London','Where the Crown keeps its prisoners'],cam:k=>({pos:V3(c.x-24+k*8,15-k*5,c.z+30),look:V3(c.x+10,8,c.z-12)}),onStart:()=>{NZ.scatter=1;sx('cackle',.6);sx('bats',.5)}},
    {dur:3.2,cam:k=>({pos:headOf(c,1.6).add(V3(4-k,.3,5)),look:headOf(c,1.1)}),onStart:()=>{if(!NZ.ghost){NZ.ghost=nzGhostKaen(c)}sx('shield',.8)}},
    {who:'@',text:'Kaen?',cam:witchShot(1,3)},
    {who:"Kaen's Spirit",text:'Witch... you came. Is Lyra... is she free?',cam:kS},
    {who:'@',text:'She is. She sent me. We are taking you home.',cam:witchShot(-1,3.2)},
    {who:"Kaen's Spirit",text:'Then run. These chains are not mine to break. They belong to its crown.',cam:kS},
    {dur:4.6,fov:56,cut:true,cam:k=>({pos:V3(c.x-10,4+k*5,c.z+24),look:V3(232,24+k*10,-4836)}),onStart:()=>{if(!NZ.crown)NZ.crown=nzCrown(V3(232,34,-4836));flash(V3(232,30,-4836),0x60ff80,30);sx('powerup',1,null,{wet:.4});sx('garg',.6,null,{rate:.7,delay:.3});P.shake=1.2}},
    {who:'The Hollow Crown',text:'Another sister. Another bargain. London always collects its debts, little witch.',cam:crS},
    {who:'@',text:'Then I am the debt you will never collect.',cam:witchShot(1,3.6)},
    {dur:5.5,fov:40,title:['To be continued','Chapter 3 · The Hollow Crown'],cam:k=>({pos:V3(c.x,30+k*20,c.z+50+k*20),look:V3(232,22,-4836)})}],
    ()=>{nzAfter();toast('Chapter 2 complete. Lyra\'s red door by the Tower gate leads back to Paris.','To be continued',true);writeSave()})}

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
  if(!bossRef&&P.flying)P.flyT=Math.max(P.flyT,4);CH2.flySpd=sea?30:lon?20:26;
  if(z<CLIFF_Z-30&&NZ.cpk<1){NZ.cpk=1;NZ.cp.set(nzRiverX(-4060)+16,0,-4060)}if(lon&&NZ.cpk<2){NZ.cpk=2;NZ.cp.set(-108,0,-4608)}SPAWN.copy(NZ.cp);
  if(sea&&P.swim){NZ.swimT+=dt;if(cur){NZ.burnT-=dt;if(NZ.burnT<=0){NZ.burnT=.5;damagePlayer(maxHP()*.05);SP.emit(V3(P.pos.x,P.pos.y+.6,P.pos.z),{n:16,c0:0xc0ff90,c1:0x104010,speed:3,life:.6,up:2})}}
    if(NZ.swimT>(cur?.7:1.6)&&P.alive){NZ.swimT=0;P.flying=true;P.glide=false;P.flyT=60;P.vy=10;try{sfx.fly()}catch(e){}toast(cur?'The cursed water burns! Back on the broom!':'Back on the broom. The sea is long.')}}else NZ.swimT=0;
  const T=NZ.trig;if(z<CAL_SHORE-10&&!T.sea){T.sea=1;sxLoop('wind','wind',.32)}
  if(cur&&!T.curse&&CH2.st<3){T.curse=1;lyraSay('ly16','Lyra, in your head');after(1.2,()=>toast('English waters. The curse begins here.','The Channel',true));nzWave(1)}
  if(sea&&z<-3600&&!T.w2&&T.curse){T.w2=1;nzWave(2)}if(sea&&z<-3730&&!T.w3&&T.curse){T.w3=1;lyraSay('ly17','Lyra, in your head');nzWave(3)}if(sea&&z<-3860&&!T.w4&&T.curse){T.w4=1;nzWave(4)}
  if(z<CLIFF_Z+30&&!T.cliff){T.cliff=1;sxStop('wind',2.5);if(CH2.st<3){lyraSay('ly18','Lyra, in your head');after(.8,()=>toast('Climb over the white cliffs of Dover.','England',true))}}
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
  'Thirteen. And something is sitting on the clock.':'mx06','Kaen?':'mx07','She is. She sent me. We are taking you home.':'mx08','Then I am the debt you will never collect.':'mx09','Crawling? I flew. Over your whole cursed sea.':'mx10'});
