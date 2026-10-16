/* ================= TRAFFIC: cars, taxis, buses and police on the real streets ================= */
const TRF={cars:[],ims:null,max:isTouch?10:40,t:0};
function carGeo(kind){// side profile extruded across the width, in metres then scaled to units
  const L={sedan:[4.4,1.8,1.45],hatch:[3.9,1.75,1.5],van:[5,1.95,2.05],bus:[11.5,2.5,3.1]}[kind];const len=L[0],wid=L[1],hgt=L[2];const s=new THREE.Shape();
  if(kind==='bus'){s.moveTo(-len/2,.35);s.lineTo(len/2,.35);s.lineTo(len/2,hgt-.15);s.quadraticCurveTo(len/2,hgt,len/2-.2,hgt);s.lineTo(-len/2+.2,hgt);s.quadraticCurveTo(-len/2,hgt,-len/2,hgt-.2);s.lineTo(-len/2,.35)}
  else if(kind==='van'){s.moveTo(-len/2,.32);s.lineTo(len/2,.32);s.lineTo(len/2,.95);s.lineTo(len/2-.55,1.25);s.lineTo(len/2-.95,hgt);s.lineTo(-len/2+.1,hgt);s.lineTo(-len/2,hgt-.1);s.lineTo(-len/2,.32)}
  else{s.moveTo(-len/2,.32);s.lineTo(len/2,.32);s.lineTo(len/2,.72);s.quadraticCurveTo(len/2-.05,.9,len/2-.9,.95);s.lineTo(len/2-1.55,hgt);s.lineTo(-len/2+(kind==='hatch'?.35:1.0),hgt);s.lineTo(-len/2+(kind==='hatch'?.05:.2),.98);s.quadraticCurveTo(-len/2,.9,-len/2,.72);s.lineTo(-len/2,.32)}
  const body=new THREE.ExtrudeGeometry(s,{depth:wid,bevelEnabled:true,bevelThickness:.08,bevelSize:.06,bevelSegments:2,curveSegments:5});body.translate(0,0,-wid/2);body.rotateY(Math.PI/2);
  // glass band
  const gs=new THREE.Shape();if(kind==='bus'){gs.moveTo(-len/2+.3,1.5);gs.lineTo(len/2-.1,1.5);gs.lineTo(len/2-.1,hgt-.35);gs.lineTo(-len/2+.3,hgt-.35)}else if(kind==='van'){gs.moveTo(len/2-.62,1.05);gs.lineTo(len/2-.98,hgt-.08);gs.lineTo(len/2-1.6,hgt-.08);gs.lineTo(len/2-1.6,1.05)}else{gs.moveTo(len/2-1.0,.98);gs.lineTo(len/2-1.55,hgt-.06);gs.lineTo(-len/2+(kind==='hatch'?.42:1.05),hgt-.06);gs.lineTo(-len/2+(kind==='hatch'?.18:.32),.98)}
  const glass=new THREE.ExtrudeGeometry(gs,{depth:wid+.04,bevelEnabled:false});glass.translate(0,0,-(wid+.04)/2);glass.rotateY(Math.PI/2);
  const wheels=[];const wr=kind==='bus'?.5:.33;for(const zx of kind==='bus'?[len/2-1.6,-len/2+2]:[len/2-.85,-len/2+.8])for(const sx of[-1,1]){const w=new THREE.CylinderGeometry(wr,wr,.24,12);w.rotateZ(Math.PI/2);w.translate(sx*(wid/2-.08),wr,zx);wheels.push(w)}
  const lights=[];for(const sx of[-1,1]){const h=new THREE.BoxGeometry(.3,.12,.05);h.translate(sx*(wid/2-.3),.72,len/2+.05);lights.push(h);const t=new THREE.BoxGeometry(.28,.14,.05);t.translate(sx*(wid/2-.3),.8,-len/2-.05);lights.push(t)}
  const sc=U;for(const g of[body,glass,...wheels,...lights])g.scale(sc,sc,sc);
  const W=mergeG(wheels),Lg=mergeG(lights);const lc=[];const lp=Lg.attributes.position;for(let i=0;i<lp.count;i++){const front=lp.getZ(i)>0;lc.push(front?1:1,front?.95:.1,front?.8:.1)}Lg.setAttribute('color',new THREE.Float32BufferAttribute(lc,3));
  return{body:mergeG([body]),glass:mergeG([glass]),wheels:W,lights:Lg,len:len*sc,wid:wid*sc}}
function trfInit(){const kinds=['sedan','hatch','van','bus'];TRF.ims={};const n=TRF.max;
  const bodyM=std({roughness:.28,metalness:.55,envMapIntensity:1.3}),glassM=std({color:0x0c1218,roughness:.05,metalness:.9,envMapIntensity:2}),wheelM=std({color:0x121214,roughness:.7}),lightM=new THREE.MeshBasicMaterial({vertexColors:true});
  for(const k of kinds){const G=carGeo(k);const mk=(g,m,col)=>{const im=new THREE.InstancedMesh(g,m,n);im.count=0;im.frustumCulled=false;im.castShadow=m!==lightM;im.receiveShadow=true;im.instanceMatrix.setUsage(THREE.DynamicDrawUsage);if(col)im.instanceColor=new THREE.InstancedBufferAttribute(new Float32Array(n*3).fill(1),3);scene.add(im);return im};
    TRF.ims[k]={G,body:mk(G.body,bodyM,true),glass:mk(G.glass,glassM),wheels:mk(G.wheels,wheelM),lights:mk(G.lights,lightM),n:0}}
  TRF.taxiSign=new THREE.InstancedMesh(new THREE.BoxGeometry(.5*U,.18*U,.25*U),new THREE.MeshBasicMaterial({color:0x40ff70}),n);TRF.taxiSign.count=0;TRF.taxiSign.frustumCulled=false;scene.add(TRF.taxiSign);
  TRF.siren=new THREE.InstancedMesh(new THREE.BoxGeometry(.9*U,.15*U,.3*U),new THREE.MeshBasicMaterial({color:0x3070ff}),n);TRF.siren.count=0;TRF.siren.frustumCulled=false;scene.add(TRF.siren)}
const CAR_COLS=['#1c1f24','#e8e8ec','#8a1a1a','#2a3a5a','#6a6a70','#1a3a2a','#b8b0a0','#d0d4d8','#3a5a8a','#101010','#6a1a2a','#c8c0a8'].map(c=>new THREE.Color(c));
function trfDriveOK(e){return e&&e.cls<=5&&!e.br?true:e&&e.br&&e.cls<=4}
function trfSpawn(px,pz){for(let k=0;k<8;k++){const a=Math.random()*TAU,d=rand(70,220);const x=px+Math.sin(a)*d,z=pz+Math.cos(a)*d;if(Math.hypot(x-camera.position.x,z-camera.position.z)<60)continue;const e=nearestEdge(x,z,40,trfDriveOK);if(!e||e.len<25)continue;
    const r=Math.random();const kind=e.cls<=2&&r<.08?'bus':r<.18?'van':r<.55?'hatch':'sedan';const taxi=kind==='sedan'&&Math.random()<.18;const police=!taxi&&kind!=='bus'&&Math.random()<.04;
    const c={e,dir:Math.random()<.5?1:-1,s:rand(5,e.len-5),v:0,vmax:kind==='bus'?7:rand(8.5,12.5),kind,col:police?new THREE.Color('#f4f4f4'):taxi?new THREE.Color('#141414'):kind==='bus'?new THREE.Color('#1a8a5a'):pickR(Math.random,CAR_COLS),taxi,police,x:0,z:0,ry:0,honk:0,stop:0,burn:0,frozen:0,hp:3};
    if(c.dir<0)c.s=e.len-c.s;trfPos(c);if(gType(c.x,c.z)===7)continue;return c}return null}
function edgePointAt(e,s,out){const p=e.p;let acc=0;for(let k=2;k<p.length;k+=2){const L=Math.hypot(p[k]-p[k-2],p[k+1]-p[k-1]);if(acc+L>=s||k===p.length-2){const t=L>0?clamp((s-acc)/L,0,1):0;out.x=p[k-2]+(p[k]-p[k-2])*t;out.z=p[k-1]+(p[k+1]-p[k-1])*t;out.dx=(p[k]-p[k-2])/(L||1);out.dz=(p[k+1]-p[k-1])/(L||1);return out}acc+=L}return out}
const _ep={};
function trfPos(c){const e=c.e;const s=c.dir>0?c.s:e.len-c.s;edgePointAt(e,s,_ep);const dx=_ep.dx*c.dir,dz=_ep.dz*c.dir;const lane=e.cls>=3?Math.max(1.35,e.w*.5-4.6):Math.min(e.w*.25,3.4)+.4;c.x=_ep.x+dz*lane;c.z=_ep.z-dx*lane;const ry=Math.atan2(dx,dz);c.ry=c.ry===undefined||c.v<.1?ry:lerpAngle(c.ry,ry,.25)}
function trfNext(c){const e=c.e;const node=c.dir>0?e.b:e.a;const opts=(CITY.adj[node]||[]).filter(q=>q!==e&&trfDriveOK(q));if(!opts.length){c.dir=-c.dir;c.s=0;return}const e2=pickR(Math.random,opts);c.e=e2;c.dir=e2.a===node?1:-1;c.s=0}
function trfUpdate(dt){if(MODE!=='open'||!CITY.ok)return;if(!TRF.ims)trfInit();const px=P.pos.x,pz=P.pos.z;TRF.t-=dt;
  if(TRF.t<=0&&TRF.cars.length<TRF.max&&!VIN){TRF.t=.25;const c=trfSpawn(px,pz);if(c)TRF.cars.push(c)}
  for(const k in TRF.ims)TRF.ims[k].n=0;let ts=0,sr=0;const M=new THREE.Matrix4(),Q=new THREE.Quaternion(),Sv=new THREE.Vector3(1,1,1),Pv=new THREE.Vector3();
  for(let i=TRF.cars.length-1;i>=0;i--){const c=TRF.cars[i];const d=Math.hypot(c.x-px,c.z-pz);if(d>300||VIN){TRF.cars.splice(i,1);continue}
    if(c.burn>0){c.burn-=dt;c.v=Math.max(0,c.v-dt*12);if(Math.random()<.7)FL.emit(V3(c.x+rand(-1,1),terrainH(c.x,c.z)+rand(1,2.4),c.z+rand(-1,1)),{c0:0xfff0b0,c1:0xff3000,s0:1.4,s1:.4,life:.6,up:3,speed:.8});if(Math.random()<.3)SM.emit(V3(c.x,terrainH(c.x,c.z)+2.5,c.z),{c0:0x3a2a28,c1:0x0a0606,s0:2,s1:5,life:1.5,up:3,a:.4})}
    else if(c.frozen>0){c.frozen-=dt;c.v=0}
    else{// look ahead for obstacles
      const fx=Math.sin(c.ry),fz=Math.cos(c.ry);let block=99;const chk=(x,z,r)=>{const dx=x-c.x,dz=z-c.z;const along=dx*fx+dz*fz,side=Math.abs(dx*fz-dz*fx);if(along>0&&along<block&&side<r)block=along};
      if(!(P.flying||P.glide)||P.pos.y<c.y+2.5)chk(px,pz,1.6);for(const q of TRF.cars)if(q!==c)chk(q.x,q.z,1.8);for(const n of people){if(n.dist>80)continue;if(Math.abs(n.x-c.x)>16||Math.abs(n.z-c.z)>16)continue;chk(n.x,n.z,1.3)}
      const want=block<7?0:block<16?c.vmax*(block-7)/9:c.vmax;c.v+=(want-c.v)*Math.min(1,dt*(want<c.v?4:1.2));
      if(block<7&&Math.hypot(px-c.x,pz-c.z)<9&&c.honk<=0&&!c.police){c.honk=rand(2.5,5);honk(c)}c.honk-=dt;
      c.s+=c.v*dt;if(c.s>=c.e.len-.5)trfNext(c)}
    trfPos(c);const gy=terrainH(c.x,c.z);
    // push the witch out of the way if she walks into a car
    {const dx=px-c.x,dz=pz-c.z,fx=Math.sin(c.ry),fz=Math.cos(c.ry);const al=dx*fx+dz*fz,sd=dx*fz-dz*fx;const I=TRF.ims[c.kind].G;if(Math.abs(al)<I.len/2+.5&&Math.abs(sd)<I.wid/2+.5&&P.pos.y<gy+1.8*U){if(c.v>6&&al>0){P.vy=8;damagePlayer&&damagePlayer(Math.max(2,Math.round(maxHP()*.06)));P.shake=.4;thud(.35,90);c.v=0;honk(c)}const pushS=Math.abs(sd)<I.wid/2+.5?(I.wid/2+.55-Math.abs(sd))*Math.sign(sd||1):0;P.pos.x+=fz*pushS;P.pos.z-=fx*pushS}}
    if(d>220)continue;const set=TRF.ims[c.kind];const k=set.n++;Pv.set(c.x,gy+.02,c.z);Q.setFromAxisAngle(V3(0,1,0),c.ry);M.compose(Pv,Q,Sv);for(const part of['body','glass','wheels','lights'])set[part].setMatrixAt(k,M);
    const col=c.burn>0?_trfBurnt:c.frozen>0?_trfIce:c.col;set.body.setColorAt(k,col);
    if(c.taxi){const tm=M.clone().multiply(new THREE.Matrix4().makeTranslation(0,1.5*U,.2*U));TRF.taxiSign.setMatrixAt(ts++,tm)}if(c.police){const tm=M.clone().multiply(new THREE.Matrix4().makeTranslation(0,1.52*U,0));TRF.siren.setMatrixAt(sr++,tm)}}
  for(const k in TRF.ims){const s=TRF.ims[k];for(const part of['body','glass','wheels','lights']){s[part].count=s.n;s[part].instanceMatrix.needsUpdate=true}if(s.body.instanceColor)s.body.instanceColor.needsUpdate=true}
  TRF.taxiSign.count=ts;TRF.taxiSign.instanceMatrix.needsUpdate=true;TRF.siren.count=sr;TRF.siren.instanceMatrix.needsUpdate=true;if(sr)TRF.siren.material.color.setHex(Math.floor(time*6)%2?0x3070ff:0xff3040)}
const _trfBurnt=new THREE.Color('#1a1414'),_trfIce=new THREE.Color('#bfefff');
function honk(c){if(!AC||muted)return;const d=Math.hypot(c.x-P.pos.x,c.z-P.pos.z);const v=.05/(1+d*.05),pan=clamp((c.x-P.pos.x)/30,-1,1);const f=c.kind==='bus'?220:c.kind==='van'?300:380;tone(f,.28,'square',v,1,0,null,.2,pan);tone(f*1.26,.28,'square',v*.7,1,0,null,.2,pan);if(Math.random()<.3)tone(f,.22,'square',v,1,.36,null,.2,pan)}
function trfHit(pos,r,kind){for(const c of TRF.cars){if(Math.hypot(c.x-pos.x,c.z-pos.z)>r+2.5)continue;if(kind==='fire'){c.burn=8;c.v=0}else if(kind==='ice'){c.frozen=8}else{c.v=0;c.stop=2;honk(c)}}}
