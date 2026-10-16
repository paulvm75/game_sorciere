/* ---------- city ---------- */
const PITCH=36,RIVER=9,BRW=5;
const BRIDGES=[-108,0,108];
const SPAWN=V3(-100,0,22);
const EIFFEL={x:-126,z:72},ARC={x:90,z:-90};
let GOX=-162,GOZ=-162,MAPOX=-236,MAPOZ=-236;const WB={x0:-212,x1:212,z0:-212,z1:300};const CDM={x0:-146,x1:-106,z0:38,z1:258};const ECOLE={x:-126,z:276,w:64,d:20};const boxes=[];const blocks=[];const blockLots=new Map();
const parks=[{x0:CDM.x0,x1:CDM.x1,z0:CDM.z0,z1:CDM.z1,cdm:true},{x0:40,x1:68,z0:-68,z1:-40}];
const isPark=(cx,cz)=>(cx===-126&&cz>=54&&cz<=234)||(cx===54&&cz===-54);

/* ---------- Champ de Mars: long lawns, gravel allées, double tree rows, lamps; École Militaire closes the view ---------- */
function cdmDress(trees,lamps,benches){const C=CDM,W=C.x1-C.x0,D=C.z1-C.z0,PX=6;
  const cv=mkCanvas(W*PX,D*PX,(x)=>{const X=v=>(v-C.x0)*PX,Z=v=>(v-C.z0)*PX;
    x.fillStyle='#8a7c66';x.fillRect(0,0,W*PX,D*PX);
    for(let k=0;k<5000;k++){x.fillStyle=`rgba(${rand(60,120)|0},${rand(55,100)|0},${rand(40,80)|0},.18)`;x.fillRect(rand(0,W*PX),rand(0,D*PX),2,2)}
    const lawn=(x0,z0,x1,z1)=>{x.fillStyle='#1f3a26';x.fillRect(X(x0),Z(z0),(x1-x0)*PX,(z1-z0)*PX);for(let k=0;k<(x1-x0)*(z1-z0)*.8;k++){x.fillStyle=`rgba(${rand(25,60)|0},${rand(70,115)|0},${rand(40,60)|0},.45)`;x.fillRect(X(rand(x0,x1)),Z(rand(z0,z1)),1.5,rand(3,7))}
      for(let z=z0;z<z1;z+=6){x.fillStyle='rgba(255,255,255,.03)';x.fillRect(X(x0),Z(z),(x1-x0)*PX,3*PX)}
      x.strokeStyle='#14281a';x.lineWidth=PX*.6;x.strokeRect(X(x0)+2,Z(z0)+2,(x1-x0)*PX-4,(z1-z0)*PX-4)};
    const L0=C.x0+14,L1=C.x1-14;
    lawn(L0,98,L1,148);lawn(L0,156,L1,204);lawn(L0,212,L1,252);
    lawn(C.x0+1,104,C.x0+8,252);lawn(C.x1-8,104,C.x1-1,252);
    for(const z of[118,176,232])for(const xx of[L0+3,L1-3])for(let k=0;k<60;k++){const a=rand(0,TAU),d=Math.sqrt(Math.random())*1.4;x.fillStyle=['#a8324a','#d8a040','#c86890','#e8e0d0'][k%4];x.fillRect(X(xx+Math.sin(a)*d),Z(z+Math.cos(a)*d),2,2)}});
  const tex=new THREE.CanvasTexture(cv);tex.anisotropy=4;
  const m=new THREE.Mesh(new THREE.PlaneGeometry(W,D),std({map:tex,roughness:1,color:0xc0bcc8}));m.rotation.x=-Math.PI/2;m.position.set((C.x0+C.x1)/2,.045,(C.z0+C.z1)/2);m.receiveShadow=true;scene.add(m);
  for(let z=100;z<=252;z+=7)for(const x of[C.x0+3,C.x0+6.5,C.x1-3,C.x1-6.5])trees.push([x+rand(-.3,.3),z+rand(-.4,.4),rand(1.05,1.3)]);
  for(let z=100;z<=252;z+=16){lamps.push([C.x0+10.2,z]);lamps.push([C.x1-10.2,z])}
  for(let z=108;z<=248;z+=22){benches.push([C.x0+12.6,z,-Math.PI/2]);benches.push([C.x1-12.6,z,Math.PI/2])}}
function buildEcole(){const E=ECOLE,g=new THREE.Group();g.position.set(E.x,0,E.z);scene.add(g);
  const stC=mkCanvas(256,128,(x)=>{x.fillStyle='#d9ccb0';x.fillRect(0,0,256,128);for(let k=0;k<900;k++){x.fillStyle=`rgba(${rand(120,170)|0},${rand(105,150)|0},${rand(80,120)|0},.12)`;x.fillRect(rand(0,256),rand(0,128),rand(1,5),rand(1,4))}
    for(let f=0;f<2;f++)for(let c=0;c<8;c++){const X=c*32+9,Y=f*64+14;x.fillStyle='#2a2636';x.fillRect(X,Y,14,34);x.fillStyle=Math.random()<.4?'rgba(255,200,120,.85)':'rgba(255,200,120,.12)';x.fillRect(X+2,Y+2,10,30);x.fillStyle='#efe4cc';x.fillRect(X-2,Y-4,18,4)}
    x.fillStyle='#bfb090';x.fillRect(0,62,256,4)});
  const stone=std({map:rep(new THREE.CanvasTexture(stC),4,1),roughness:.85,emissive:0x1a140c});const plain=std({color:0xd2c4a6,roughness:.85,emissive:0x140f08});const zinc=std({color:0x5f6c80,roughness:.45,metalness:.55});
  const add=(geo,mat,x,y,z)=>{const m=new THREE.Mesh(geo,mat);m.position.set(x,y,z);m.castShadow=true;m.receiveShadow=true;g.add(m);return m};
  add(new THREE.BoxGeometry(E.w,13,E.d),stone,0,6.5,0);
  const roof=new THREE.CylinderGeometry(.7*Math.SQRT1_2,Math.SQRT1_2,1,4,1);roof.rotateY(Math.PI/4);const r1=add(roof,zinc,0,15,0);r1.scale.set(E.w+.6,4,E.d+.6);
  add(new THREE.BoxGeometry(22,17,E.d+3),plain,0,8.5,-.8);
  for(let k=0;k<8;k++)add(new THREE.CylinderGeometry(.55,.62,12,12),plain,-8.4+k*2.4,6.6,-E.d/2-2.6);
  add(new THREE.BoxGeometry(22,1.4,4),plain,0,13.3,-E.d/2-2);
  const ped=new THREE.CylinderGeometry(1,1,1,3,1);ped.rotateZ(Math.PI/2);ped.rotateX(Math.PI/2);const pm=add(ped,plain,0,15.1,-E.d/2-1.4);pm.scale.set(11.5,3.2,1);pm.rotation.set(0,0,0);
  add(new THREE.CylinderGeometry(5.2,5.6,4,16),plain,0,19,0);
  const dm=add(new THREE.SphereGeometry(5.3,20,10,0,TAU,0,Math.PI/2),zinc,0,21,0);dm.scale.y=1.15;
  add(new THREE.CylinderGeometry(.9,1.1,2.4,10),plain,0,28.2,0);
  const fl=add(new THREE.BoxGeometry(.1,6,.1),std({color:0x222222}),0,32,0);
  const flag=new THREE.Mesh(new THREE.PlaneGeometry(2.4,1.6),new THREE.MeshBasicMaterial({map:canvasTex(48,32,(x)=>{x.fillStyle='#1d3c8f';x.fillRect(0,0,16,32);x.fillStyle='#f4f4f4';x.fillRect(16,0,16,32);x.fillStyle='#c8202e';x.fillRect(32,0,16,32)}),side:THREE.DoubleSide}));flag.position.set(1.2,34,0);g.add(flag);
  for(const sx of[-1,1]){const l=glowSprite(0xffc070,3,.7);l.position.set(sx*11,4,-E.d/2-3.4);g.add(l)}
  const L={x0:E.x-E.w/2,x1:E.x+E.w/2,z0:E.z-E.d/2,z1:E.z+E.d/2,x:E.x,z:E.z,W:E.w/2,D:E.d/2,h:16.6,hm:0,roof:'flat'};
  boxes.push({x0:L.x0,x1:L.x1,z0:L.z0-3.4,z1:L.z1,h:30,block:true});
  for(let i=-1;i<=3;i++)for(const j of[12,13]){const k=i*1000+j;const a=blockLots.get(k)||[];a.push(L);blockLots.set(k,a)}}
const FW=12,FH=21;
function makeFacade(){
  const W=512,H=768,bw=128,fh=128;
  const hc=mkCanvas(W,H,(x)=>{x.fillStyle='#808080';x.fillRect(0,0,W,H);for(let k=0;k<3000;k++){x.fillStyle=`rgba(${Math.random()<.5?255:0},${Math.random()<.5?255:0},128,.04)`;x.fillRect(rand(0,W),rand(0,H),rand(1,4),rand(1,4))}
    for(let f=0;f<6;f++){const y=H-(f+1)*fh;x.fillStyle='#c0c0c0';x.fillRect(0,y+fh-10,W,6);x.fillStyle='#404040';x.fillRect(0,y+fh-4,W,4);
      for(let r=0;r<3;r++){x.fillStyle='#6a6a6a';x.fillRect(0,y+r*42+40,W,2)}
      for(let b=0;b<4;b++){const X=b*bw;if(f===0){x.fillStyle='#202020';x.fillRect(X+16,y+24,96,fh-24)}else{x.fillStyle='#303030';x.fillRect(X+38,y+24,52,80);x.fillStyle='#e0e0e0';x.fillRect(X+34,y+16,60,8);x.fillStyle='#a0a0a0';x.fillRect(X+34,y+104,60,6)}}}});
  const map=canvasTex(W,H,(x)=>{x.fillStyle='#d2c3a2';x.fillRect(0,0,W,H);
    for(let k=0;k<2500;k++){x.fillStyle=`rgba(${rand(90,140)|0},${rand(80,120)|0},${rand(60,90)|0},${rand(.03,.1)})`;x.fillRect(rand(0,W),rand(0,H),rand(1,6),rand(1,6))}
    for(let f=0;f<6;f++){const y=H-(f+1)*fh;
      x.fillStyle='#b8a67f';x.fillRect(0,y+fh-10,W,10);x.fillStyle='rgba(60,50,40,.25)';for(let r=0;r<3;r++)x.fillRect(0,y+r*42+40,W,2);
      const g=x.createLinearGradient(0,y+fh-30,0,y+fh);g.addColorStop(0,'rgba(0,0,0,0)');g.addColorStop(1,'rgba(40,30,30,.18)');x.fillStyle=g;x.fillRect(0,y+fh-30,W,30);
      for(let b=0;b<4;b++){const X=b*bw;
        if(f===0){x.fillStyle='#231c2c';x.fillRect(X+16,y+24,96,fh-24);x.fillStyle=['#6a2331','#1e3a2e','#23304f'][(b+f)%3];x.fillRect(X+10,y+10,108,16);x.fillStyle='rgba(255,220,160,.3)';x.fillRect(X+20,y+14,88,4)}
        else{x.fillStyle='#2a2636';x.fillRect(X+38,y+24,52,80);x.fillStyle='#4a4458';x.fillRect(X+62,y+24,4,80);x.fillRect(X+38,y+60,52,3);
          x.fillStyle='#ece0c4';x.fillRect(X+34,y+16,60,8);x.beginPath();x.moveTo(X+30,y+16);x.lineTo(X+64,y+4);x.lineTo(X+98,y+16);x.fill();x.fillStyle='#c9b690';x.fillRect(X+34,y+104,60,6);
          if(f===1||f===4){x.fillStyle='#16121c';const x0=f===4?0:X+30,x1=f===4?W:X+98;x.fillRect(x0,y+92,x1-x0,4);x.fillRect(x0,y+108,x1-x0,3);for(let k=x0;k<x1;k+=7){x.fillRect(k,y+92,2,18);x.beginPath();x.arc(k+3.5,y+100,2.5,0,TAU);x.fill()}}}}}});
  const normal=heightToNormal(hc,2.5);
  const ems=[];
  for(let v=0;v<3;v++){ems.push(canvasTex(W,H,(x)=>{x.fillStyle='#000';x.fillRect(0,0,W,H);
    for(let f=0;f<6;f++){const y=H-(f+1)*fh;for(let b=0;b<4;b++){const X=b*bw;
      if(f===0){if(Math.random()<.65){const g=x.createLinearGradient(0,y+24,0,y+fh);g.addColorStop(0,'#ffd88a');g.addColorStop(1,'#a8501a');x.fillStyle=g;x.fillRect(X+16,y+24,96,fh-24);x.fillStyle='rgba(0,0,0,.55)';x.fillRect(X+60,y+24,4,fh-24);x.fillRect(X+16,y+70,96,3)}}
      else if(Math.random()<.32){const warm=Math.random()<.85;const g=x.createLinearGradient(0,y+24,0,y+104);g.addColorStop(0,warm?'#ffc466':'#a0c0ff');g.addColorStop(1,warm?'#c86a22':'#4060a0');x.fillStyle=g;x.fillRect(X+38,y+24,52,80);
        x.fillStyle='rgba(0,0,0,.6)';x.fillRect(X+62,y+24,4,80);x.fillRect(X+38,y+60,52,3);if(Math.random()<.4){x.fillStyle='rgba(0,0,0,.45)';x.fillRect(X+38,y+24,rand(10,26),80)}}}}
  }))}
  for(const t of [map,normal,...ems]){t.wrapS=t.wrapT=THREE.RepeatWrapping;t.anisotropy=8}
  return ems.map(e=>new THREE.MeshStandardMaterial({color:0xcfc6cc,map,normalMap:normal,normalScale:new THREE.Vector2(.8,.8),roughness:.85,metalness:0,emissive:0xffffff,emissiveMap:e,emissiveIntensity:.7,envMapIntensity:.4}));
}
const facadeMats=makeFacade();
function buildingGeo(w,h,d,x,z){
  const g=new THREE.BoxGeometry(w,h,d);const uv=g.attributes.uv;
  for(let i=0;i<24;i++){const f=Math.floor(i/4);let sx,sy;if(f<2){sx=d/FW;sy=h/FH}else if(f<4){sx=0;sy=0}else{sx=w/FW;sy=h/FH}uv.setXY(i,uv.getX(i)*sx,uv.getY(i)*sy)}
  g.translate(x,h/2,z);return g.toNonIndexed();
}
function mergeGeos(list){let n=0;for(const g of list)n+=g.attributes.position.count;
  const pos=new Float32Array(n*3),nor=new Float32Array(n*3),uv=new Float32Array(n*2);let o=0;
  for(const g of list){pos.set(g.attributes.position.array,o*3);nor.set(g.attributes.normal.array,o*3);uv.set(g.attributes.uv.array,o*2);o+=g.attributes.position.count;g.dispose()}
  const m=new THREE.BufferGeometry();m.setAttribute('position',new THREE.BufferAttribute(pos,3));m.setAttribute('normal',new THREE.BufferAttribute(nor,3));m.setAttribute('uv',new THREE.BufferAttribute(uv,2));m.computeBoundingSphere();return m}
function instanced(geo,mat,items,fn){const im=new THREE.InstancedMesh(geo,mat,items.length);const o=new THREE.Object3D();items.forEach((it,i)=>{o.position.set(0,0,0);o.rotation.set(0,0,0);o.scale.set(1,1,1);fn(o,it);o.updateMatrix();im.setMatrixAt(i,o.matrix)});im.instanceMatrix.needsUpdate=true;scene.add(im);return im}
const lampList=[],treeList=[];
if(MODE!=='open'){
  const bGeos=[[],[],[]],mans=[],chims=[],lamps=lampList,trees=treeList,walks=[],dormers=[],awnings=[],columns=[],benches=[];
  for(let i=-1;i<11;i++)for(let j=-1;j<13;j++){
    const cx=-162+i*PITCH,cz=-162+j*PITCH;
    if(Math.abs(cz)<=18)continue;
    if(Math.abs(cx-ECOLE.x)<40&&cz===270)continue;
    if(cz===270&&(cx===-162||cx===-90))continue;
    if(!(cx===-126&&cz>=54&&cz<=234))for(const sx of[-1,1])for(const sz of[-1,1])lamps.push([cx+sx*15.6,cz+sz*15.6]);
    if(isPark(cx,cz)){continue}
    if(cx===ARC.x&&cz===ARC.z)continue;
    walks.push([cx,cz]);
    if(Math.random()<.35)columns.push([cx+(Math.random()<.5?-1:1)*16.8,cz+rand(-8,8)]);
    boxes.push({x0:cx-14,x1:cx+14,z0:cz-14,z1:cz+14,h:25,block:true});blocks.push([cx,cz]);
    const nx=Math.random()<.5?2:3,xs=[0];
    if(nx===2)xs.push(rand(.38,.62)*28);else{xs.push(rand(.26,.38)*28);xs.push(rand(.6,.74)*28)}xs.push(28);
    const split=rand(.4,.6)*28,zs=[0,split,28];const lots=[];
    for(let a=0;a<xs.length-1;a++)for(let b=0;b<2;b++){
      const w=xs[a+1]-xs[a],d=zs[b+1]-zs[b],x=cx-14+xs[a]+w/2,z=cz-14+zs[b]+d/2,h=rand(13.5,19.5);
      bGeos[(Math.random()*3)|0].push(buildingGeo(w,h,d,x,z));
      const hm=rand(2.6,3.8);mans.push({x,z,w,d,y:h,hm});lots.push({x0:x-w/2,x1:x+w/2,z0:z-d/2,z1:z+d/2,x,z,W:(w+.5)/2,D:(d+.5)/2,h,hm});
      const nc=1+((Math.random()*2)|0);for(let k=0;k<nc;k++)chims.push({x:x+rand(-.25,.25)*w,z:z+rand(-.25,.25)*d,y:h+hm-.2});
      // dormers on street-facing sides
      const sides=[];if(a===0)sides.push([-1,0]);if(a===xs.length-2)sides.push([1,0]);if(b===0)sides.push([0,-1]);if(b===1)sides.push([0,1]);
      for(const[sx,sz]of sides){const len=sx?d:w;const n=Math.max(1,Math.floor(len/4));for(let k=0;k<n;k++){const t=(k+.5)/n-.5;dormers.push({x:x+(sx?sx*(w/2+.05):t*w),z:z+(sz?sz*(d/2+.05):t*d),y:h+hm*.35,r:sx?Math.PI/2*sx:(sz>0?0:Math.PI),lit:Math.random()<.35})}
        if(Math.random()<.3){awnings.push({x:x+(sx?sx*(w/2+1.2):rand(-.2,.2)*w),z:z+(sz?sz*(d/2+1.2):rand(-.2,.2)*d),r:sx?Math.PI/2*sx:(sz>0?0:Math.PI),w:Math.min(len*.7,8)})}}
    }
    blockLots.set(i*1000+j,lots);
  }
  bGeos.forEach((l,i)=>{if(l.length){const m=new THREE.Mesh(mergeGeos(l),facadeMats[i]);m.receiveShadow=true;scene.add(m)}});
  const zincTex=canvasTex(128,128,(x)=>{x.fillStyle='#5a6678';x.fillRect(0,0,128,128);for(let k=0;k<128;k+=8){x.fillStyle='rgba(20,25,35,.5)';x.fillRect(k,0,2,128)}});rep(zincTex,1,1);
  const mg=new THREE.CylinderGeometry(.6*Math.SQRT1_2,Math.SQRT1_2,1,4,1);mg.rotateY(Math.PI/4);mg.translate(0,.5,0);
  instanced(mg,std({color:0x6a7890,map:zincTex,roughness:.45,metalness:.55,envMapIntensity:.9}),mans,(o,m)=>{o.position.set(m.x,m.y,m.z);o.scale.set(m.w+.5,m.hm,m.d+.5)});
  instanced(new THREE.BoxGeometry(.9,1.8,.9),std({color:0x8a5040,roughness:.9}),chims,(o,c)=>{o.position.set(c.x,c.y,c.z)});
  const dg=new THREE.BoxGeometry(1.1,1.4,.9);
  instanced(dg,std({color:0x7a7468,roughness:.7,metalness:.3}),dormers,(o,d)=>{o.position.set(d.x,d.y,d.z);o.rotation.y=d.r});
  instanced(new THREE.PlaneGeometry(.7,.9),new THREE.MeshBasicMaterial({color:0xffc060}),dormers.filter(d=>d.lit),(o,d)=>{o.position.set(d.x+Math.sin(d.r)*.47,d.y,d.z+Math.cos(d.r)*.47);o.rotation.y=d.r});
  instanced(new THREE.BoxGeometry(30.5,.25,30.5),std({color:0x5a5468,roughness:.9}),walks,(o,w)=>{o.position.set(w[0],.12,w[1])}).receiveShadow=true;
  // awnings (striped)
  const awTex=canvasTex(64,8,(x)=>{for(let i=0;i<8;i++){x.fillStyle=i%2?'#f0e8d8':'#9a1a28';x.fillRect(i*8,0,8,8)}});
  const awG=new THREE.PlaneGeometry(1,2.4);awG.translate(0,-1.2,0);awG.rotateX(-.9);
  instanced(awG,std({map:awTex,roughness:.8,side:THREE.DoubleSide,emissive:0x2a1008}),awnings,(o,a)=>{o.position.set(a.x-Math.sin(a.r)*1.1,4.2,a.z-Math.cos(a.r)*1.1);o.rotation.y=a.r;o.scale.set(a.w,1,1)});
  // Morris columns
  const colM=std({color:0x1f4a36,roughness:.5,metalness:.3});
  instanced(new THREE.CylinderGeometry(.75,.8,3.6,16),std({color:0xd8c8a0,roughness:.9,emissive:0x3a2a14,map:canvasTex(64,64,(x)=>{x.fillStyle='#d8c8a0';x.fillRect(0,0,64,64);for(let k=0;k<6;k++){x.fillStyle=['#b02030','#203a80','#e0a020','#207050'][k%4];x.fillRect(rand(0,50),rand(0,50),rand(8,20),rand(10,20))}})}),columns,(o,c)=>{o.position.set(c[0],1.8+.2,c[1])});
  instanced(new THREE.SphereGeometry(.85,16,8,0,TAU,0,Math.PI/2),colM,columns,(o,c)=>{o.position.set(c[0],3.8,c[1])});
  // quays
  for(let x=-210;x<=210;x+=12){lamps.push([x,-11]);lamps.push([x,11])}
  for(let x=-210;x<=210;x+=8){if(BRIDGES.some(b=>Math.abs(x-b)<8)||Math.abs(x-SPAWN.x)<14)continue;for(const z of[-15,15,-34,34])trees.push([x+rand(-1,1),z+rand(-1,1),rand(.8,1.25)])}
  for(let x=-206;x<=206;x+=16){if(BRIDGES.some(b=>Math.abs(x-b)<10))continue;benches.push([x+4,-13,0]);benches.push([x+4,13,Math.PI])}
  for(const p of parks){if(p.cdm)cdmDress(trees,lamps,benches);else for(let k=0;k<(p.z1-p.z0)*.5;k++){const x=rand(p.x0+2,p.x1-2),z=rand(p.z0+2,p.z1-2);if(Math.hypot(x-EIFFEL.x,z-EIFFEL.z)<16)continue;trees.push([x,z,rand(.9,1.4)])}
    const gtex=rep(canvasTex(128,128,(x)=>{x.fillStyle='#1d3526';x.fillRect(0,0,128,128);for(let k=0;k<800;k++){x.fillStyle=`rgba(${rand(30,70)|0},${rand(70,110)|0},${rand(40,60)|0},.5)`;x.fillRect(rand(0,128),rand(0,128),1,rand(2,5))}}),6,6);
    if(p.cdm)continue;const gr=new THREE.Mesh(new THREE.PlaneGeometry(p.x1-p.x0,p.z1-p.z0),std({map:gtex,roughness:1}));gr.rotation.x=-Math.PI/2;gr.position.set((p.x0+p.x1)/2,.04,(p.z0+p.z1)/2);gr.receiveShadow=true;scene.add(gr)}
  // benches
  const benchM=std({color:0x2a4a30,roughness:.6,metalness:.4});
  instanced(new THREE.BoxGeometry(2.2,.12,.6),benchM,benches,(o,b)=>{o.position.set(b[0],.6,b[1]);o.rotation.y=b[2]});
  instanced(new THREE.BoxGeometry(2.2,.6,.1),benchM,benches,(o,b)=>{o.position.set(b[0],.95,b[1]+(b[2]?-.3:.3));o.rotation.y=b[2]});
  // lamps
  const lampM=std({color:0x1a1624,roughness:.4,metalness:.7});
  instanced(new THREE.CylinderGeometry(.07,.14,4.4,8),lampM,lamps,(o,l)=>{o.position.set(l[0],2.2,l[1])});
  instanced(new THREE.CylinderGeometry(.28,.12,.6,6),new THREE.MeshBasicMaterial({color:0xffd080}),lamps,(o,l)=>{o.position.set(l[0],4.55,l[1])});
  instanced(new THREE.ConeGeometry(.42,.35,6),lampM,lamps,(o,l)=>{o.position.set(l[0],5,l[1])});
  const lp=new Float32Array(lamps.length*3);lamps.forEach((l,i)=>{lp[i*3]=l[0];lp[i*3+1]=4.6;lp[i*3+2]=l[1]});
  const lg=new THREE.BufferGeometry();lg.setAttribute('position',new THREE.BufferAttribute(lp,3));
  scene.add(new THREE.Points(lg,new THREE.PointsMaterial({size:4.5,color:0xffae4a,map:glowTex,transparent:true,depthWrite:false,blending:THREE.AdditiveBlending})));
  // volumetric light cones
  const coneTex=canvasTex(4,64,(x)=>{const g=x.createLinearGradient(0,0,0,64);g.addColorStop(0,'rgba(255,255,255,0)');g.addColorStop(.25,'rgba(255,255,255,.55)');g.addColorStop(1,'rgba(255,255,255,0)');x.fillStyle=g;x.fillRect(0,0,4,64)});
  const cg=new THREE.CylinderGeometry(.3,2.6,4.3,16,1,true);cg.translate(0,-2.15,0);
  instanced(cg,new THREE.MeshBasicMaterial({map:coneTex,color:0x2e1c0c,transparent:true,depthWrite:false,blending:THREE.AdditiveBlending,side:THREE.DoubleSide}),lamps,(o,l)=>{o.position.set(l[0],4.4,l[1])});
  instanced(new THREE.PlaneGeometry(9,9),new THREE.MeshBasicMaterial({map:glowTex,color:0x4a2c12,transparent:true,depthWrite:false,blending:THREE.AdditiveBlending}),lamps,(o,l)=>{o.position.set(l[0],.3,l[1]);o.rotation.set(-Math.PI/2,0,0)});
  // trees: trunk + clustered canopy
  const leafC=mkCanvas(128,128,(x)=>{x.fillStyle='#2a4a34';x.fillRect(0,0,128,128);for(let k=0;k<500;k++){x.fillStyle=`rgba(${rand(20,70)|0},${rand(60,120)|0},${rand(40,70)|0},.7)`;x.beginPath();x.ellipse(rand(0,128),rand(0,128),rand(2,5),rand(1,3),rand(0,3),0,TAU);x.fill()}});
  const leafM=std({map:new THREE.CanvasTexture(leafC),normalMap:heightToNormal(leafC,3),roughness:.9,color:0x9ab09a});
  instanced(new THREE.CylinderGeometry(.18,.3,2.8,6),std({color:0x3a2a20,roughness:1}),trees,(o,t)=>{o.position.set(t[0],1.4*t[2],t[1]);o.scale.setScalar(t[2])});
  for(const off of[[0,3.8,0,1],[.9,3.3,.3,.7],[-.7,3.4,-.5,.75],[.2,4.6,-.3,.65]]){
    const im=instanced(new THREE.IcosahedronGeometry(1.9,1),leafM,trees,(o,t)=>{o.position.set(t[0]+off[0]*t[2],off[1]*t[2],t[1]+off[2]*t[2]);o.scale.setScalar(t[2]*off[3]);o.rotation.set(rand(0,3),rand(0,3),0)});im.castShadow=false}
  // ground: cobbles with normal + wet roughness
  const cobH=mkCanvas(512,512,(x)=>{x.fillStyle='#000';x.fillRect(0,0,512,512);for(let r=0;r<32;r++)for(let c=0;c<32;c++){const off=(r%2)*8;const l=rand(150,255);const g=x.createRadialGradient(c*16+off+8,r*16+8,1,c*16+off+8,r*16+8,9);g.addColorStop(0,`rgb(${l},${l},${l})`);g.addColorStop(1,'rgb(60,60,60)');x.fillStyle=g;x.beginPath();x.roundRect?x.roundRect(c*16+off+1.5,r*16+1.5,13,13,4):x.rect(c*16+off+1.5,r*16+1.5,13,13);x.fill()}});
  const cobC=mkCanvas(512,512,(x)=>{x.drawImage(cobH,0,0);x.globalCompositeOperation='multiply';x.fillStyle='#3a3444';x.fillRect(0,0,512,512);x.globalCompositeOperation='source-over';for(let k=0;k<400;k++){x.fillStyle=`rgba(${rand(40,90)|0},${rand(30,70)|0},${rand(60,90)|0},.25)`;x.fillRect(rand(0,512),rand(0,512),rand(4,20),rand(4,20))}});
  const rough=mkCanvas(256,256,(x)=>{x.fillStyle='#d0d0d0';x.fillRect(0,0,256,256);for(let k=0;k<22;k++){const cx=rand(0,256),cy=rand(0,256),r=rand(10,40);const g=x.createRadialGradient(cx,cy,0,cx,cy,r);g.addColorStop(0,'#484848');g.addColorStop(1,'rgba(72,72,72,0)');x.fillStyle=g;x.fillRect(0,0,256,256)}});
  const cobMap=rep(new THREE.CanvasTexture(cobC),35,40),cobN=rep(heightToNormal(cobH,1.6),35,40),cobR=rep(new THREE.CanvasTexture(rough),9,9);
  const ground=new THREE.Mesh(new THREE.PlaneGeometry(WB.x1-WB.x0+60,WB.z1-WB.z0+60),std({map:cobMap,normalMap:cobN,roughnessMap:cobR,roughness:1,metalness:0,envMapIntensity:.55,color:0xb0a8b8}));ground.rotation.x=-Math.PI/2;ground.position.set((WB.x0+WB.x1)/2,0,(WB.z0+WB.z1)/2);ground.receiveShadow=true;scene.add(ground);
  // river
  const wnC=mkCanvas(256,256,(x)=>{x.fillStyle='#808080';x.fillRect(0,0,256,256);for(let k=0;k<300;k++){const cx=rand(0,256),cy=rand(0,256),r=rand(4,20);const g=x.createRadialGradient(cx,cy,0,cx,cy,r);const v=Math.random()<.5?255:0;g.addColorStop(0,`rgba(${v},${v},${v},.2)`);g.addColorStop(1,'rgba(128,128,128,0)');x.fillStyle=g;x.fillRect(0,0,256,256)}});
  const waterN=rep(heightToNormal(wnC,4),20,1);
  window.__waterTex=canvasTex(512,64,(x)=>{x.fillStyle='#0c1634';x.fillRect(0,0,512,64);for(let k=0;k<150;k++){x.fillStyle=Math.random()<.6?'rgba(255,176,90,.45)':'rgba(181,140,255,.3)';x.fillRect(Math.random()*512,Math.random()*64,rand(6,30),1.2)}});
  const wt=window.__waterTex;rep(wt,12,1);window.__waterN=waterN;
  const water=new THREE.Mesh(new THREE.PlaneGeometry(WB.x1-WB.x0+60,RIVER*2),std({map:wt,normalMap:waterN,normalScale:new THREE.Vector2(.6,.6),roughness:.08,metalness:.6,emissive:0xffffff,emissiveMap:wt,emissiveIntensity:.6,envMapIntensity:1.6}));water.rotation.x=-Math.PI/2;water.position.y=.05;scene.add(water);
  const stoneC=noiseCanvas(128,128,'#c4b496',.3,80);const stoneM=std({map:rep(new THREE.CanvasTexture(stoneC),8,1),normalMap:rep(heightToNormal(stoneC,3),8,1),roughness:.85,emissive:0x140f08});
  for(const s of[-1,1]){const q=new THREE.Mesh(new THREE.BoxGeometry(WB.x1-WB.x0+60,.6,.7),stoneM);q.position.set(0,.3,s*RIVER);q.receiveShadow=true;scene.add(q)}
  for(const bx of BRIDGES){const deck=new THREE.Mesh(new THREE.BoxGeometry(BRW*2,.5,RIVER*2+3),stoneM);deck.position.set(bx,.25,0);deck.receiveShadow=true;scene.add(deck);
    const arch=new THREE.Mesh(new THREE.TorusGeometry(RIVER-1,.8,8,24,Math.PI),stoneM);arch.rotation.y=Math.PI/2;arch.position.set(bx,-6,0);scene.add(arch);
    for(const s of[-1,1]){const r=new THREE.Mesh(new THREE.BoxGeometry(.4,1,RIVER*2+3),stoneM);r.position.set(bx+s*BRW,.9,0);scene.add(r)}
    for(const s of[-1,1])for(const z of[-6,0,6]){const l=glowSprite(0xffb050,2,.6);l.position.set(bx+s*BRW,2.4,z);scene.add(l)}}
  {const g=new THREE.Group();g.position.set(ARC.x,0,ARC.z);buildArcAt(g);scene.add(g)}
  {const g=new THREE.Group();g.position.set(EIFFEL.x,0,EIFFEL.z);scene.add(g);buildEiffelAt(g)}
  buildEcole();
}else{if(PRE.city)cityParse(PRE.city);if(CITY.ok)buildOpenWorld();else{const m=document.getElementById('loadMsg');if(m){m.classList.remove('hidden');m.textContent='Could not load the Paris map data. Reload the page.'}}}
const waterTex=window.__waterTex,waterN=window.__waterN;

/* ---------- height + collision ---------- */
function lotAt(x,z){if(MODE==='open')return null;const i=Math.round((x-GOX)/PITCH),j=Math.round((z-GOZ)/PITCH);const lots=blockLots.get(i*1000+j);if(!lots)return null;for(const l of lots)if(x>=l.x0&&x<=l.x1&&z>=l.z0&&z<=l.z1)return l;return null}
function roofH(l,x,z){const b=l.base||0;if(l.roof==='flat')return b+l.h+.45;if(l.roof==='tile'){const u=l.W>=l.D?Math.abs(z-l.z)/l.D:Math.abs(x-l.x)/l.W;return b+l.h+l.hm*Math.max(0,1-u)}const u=Math.max(Math.abs(x-l.x)/l.W,Math.abs(z-l.z)/l.D);return u<=.6?b+l.h+l.hm:b+l.h+l.hm*Math.max(0,(1-u)/.4)}
function stBridge(x,z){return Math.abs(z)<RIVER+.5&&BRIDGES.some(b=>Math.abs(x-b)<BRW)}
function stWater(x,z){return Math.abs(z)<RIVER-.15&&!BRIDGES.some(b=>Math.abs(x-b)<BRW)}
function groundAt(x,z,y){if(MODE==='open')return owGround(x,z,y);const l=lotAt(x,z);if(l)return roofH(l,x,z);if(stBridge(x,z))return .5;if(stWater(x,z))return -.85;return 0}
function collide(p,r,ghost,skipBlocks){if(MODE==='open'){owCollideAll(p,r,ghost,skipBlocks,p===P.pos);return}
  for(const b of boxes){if(skipBlocks&&b.block)continue;if(p.y>b.h)continue;const cx=clamp(p.x,b.x0,b.x1),cz=clamp(p.z,b.z0,b.z1);const dx=p.x-cx,dz=p.z-cz,d2=dx*dx+dz*dz;
    if(d2<r*r){if(d2>1e-6){const d=Math.sqrt(d2);p.x=cx+dx/d*r;p.z=cz+dz/d*r}
      else{const l=p.x-b.x0,rr=b.x1-p.x,t=p.z-b.z0,bt=b.z1-p.z,m=Math.min(l,rr,t,bt);if(m===l)p.x=b.x0-r;else if(m===rr)p.x=b.x1+r;else if(m===t)p.z=b.z0-r;else p.z=b.z1+r}}}
  if(!ghost&&p!==P.pos&&Math.abs(p.z)<RIVER+r){const br=BRIDGES.find(b=>Math.abs(p.x-b)<BRW);
    if(br!==undefined){if(Math.abs(p.z)<RIVER)p.x=clamp(p.x,br-BRW+r,br+BRW-r)}
    else p.z=p.z>=0?RIVER+r:-(RIVER+r)}
  p.x=clamp(p.x,WB.x0+2,WB.x1-2);p.z=clamp(p.z,WB.z0+2,WB.z1-2);
}
function boxAt(x,z){for(const b of boxes)if(x>b.x0&&x<b.x1&&z>b.z0&&z<b.z1)return b;return null}
function validSpot(x,z,m=1.5){if(MODE==='open')return owValidSpot(x,z,m);if(x<WB.x0+8||x>WB.x1-8||z<WB.z0+8||z>WB.z1-8||Math.abs(z)<RIVER+2)return false;for(const b of boxes)if(x>b.x0-m&&x<b.x1+m&&z>b.z0-m&&z<b.z1+m)return false;return true}
function findSpot(cx,cz,dmin,dmax,ang){for(let k=0;k<40;k++){const a=ang!==undefined?ang+rand(-.5,.5):Math.random()*TAU,d=rand(dmin,dmax),x=cx+Math.sin(a)*d,z=cz+Math.cos(a)*d;if(validSpot(x,z))return V3(x,0,z)}return null}

/* ---------- minimap ---------- */
const worldMap=document.createElement('canvas');worldMap.width=WB.x1-WB.x0+48;worldMap.height=WB.z1-WB.z0+48;
{const x=worldMap.getContext('2d');const X=v=>v-MAPOX,Z=v=>v-MAPOZ;x.fillStyle='#1d1935';x.fillRect(0,0,worldMap.width,worldMap.height);
  x.fillStyle='#2b4b86';x.fillRect(0,Z(-RIVER),worldMap.width,RIVER*2);x.fillStyle='#6b6278';for(const b of BRIDGES)x.fillRect(X(b-BRW),Z(-RIVER),BRW*2,RIVER*2);
  x.fillStyle='#284332';for(const p of parks)x.fillRect(X(p.x0),Z(p.z0),p.x1-p.x0,p.z1-p.z0);
  x.fillStyle='#4a4260';x.beginPath();x.arc(X(ARC.x),Z(ARC.z),20,0,TAU);x.fill();
  x.fillStyle='#8a7f92';for(const[cx,cz]of blocks)x.fillRect(X(cx-14),Z(cz-14),28,28);
  x.fillStyle='#b8a888';x.fillRect(X(ECOLE.x-ECOLE.w/2),Z(ECOLE.z-ECOLE.d/2),ECOLE.w,ECOLE.d);
  x.fillStyle='#f2a541';x.fillRect(X(EIFFEL.x)-4,Z(EIFFEL.z)-4,8,8);x.fillRect(X(ARC.x)-4,Z(ARC.z)-2,8,4)}
if(MODE==='open')drawOWMap();
const mapCv=$('map'),mctx=mapCv.getContext('2d');

