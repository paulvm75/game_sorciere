/* ---------- world build (real Paris) ---------- */
function _v3(a,b,c){return V3(a,b,c)}
function face4(mb,a,b,c,d,n,uvs,col){// a..d arrays [x,y,z]; ensures front face along n
  const ux=b[0]-a[0],uy=b[1]-a[1],uz=b[2]-a[2],vx=c[0]-a[0],vy=c[1]-a[1],vz=c[2]-a[2];const cx=uy*vz-uz*vy,cy=uz*vx-ux*vz,cz=ux*vy-uy*vx;
  if(cx*n[0]+cy*n[1]+cz*n[2]>=0)mb.quad(a,b,c,d,n[0],n[1],n[2],uvs,col);else mb.quad(a,d,c,b,n[0],n[1],n[2],[uvs[0],uvs[1],uvs[6],uvs[7],uvs[4],uvs[5],uvs[2],uvs[3]],col)}
function triUp(mb,tri,verts,y,col,uvs){// tri: flat index list; verts: [[x,z]]; add upward triangles
  const v0=mb.v;for(const p of verts){mb.p.push(p[0],typeof y==='function'?y(p):y,p[1]);mb.n.push(0,1,0);mb.u.push(uvs?p[0]*uvs:0,uvs?p[1]*uvs:0);mb.c.push(col.r,col.g,col.b)}
  for(let k=0;k<tri.length;k+=3){const a=verts[tri[k]],b=verts[tri[k+1]],c=verts[tri[k+2]];const cr=(b[0]-a[0])*(c[1]-a[1])-(b[1]-a[1])*(c[0]-a[0]);if(cr<0)mb.i.push(v0+tri[k],v0+tri[k+1],v0+tri[k+2]);else mb.i.push(v0+tri[k],v0+tri[k+2],v0+tri[k+1])}mb.v+=verts.length}
function ringArr(r){const a=[];for(let k=0;k<r.length;k+=2)a.push([r[k],r[k+1]]);return a}
function triangulate(outer,holes){const c=outer.map(p=>new THREE.Vector2(p[0],p[1])),h=(holes||[]).map(r=>r.map(p=>new THREE.Vector2(p[0],p[1])));let f;try{f=THREE.ShapeUtils.triangulateShape(c,h)}catch(e){return null}const idx=[];for(const t of f)idx.push(t[0],t[1],t[2]);return{idx,verts:outer.concat(...(holes||[]))}}
function insetRing(r,d){// offset every vertex toward the interior (left side)
  const n=r.length/2,out=[];for(let i=0;i<n;i++){const p=(i+n-1)%n,q=(i+1)%n;const x=r[i*2],z=r[i*2+1];let e1x=x-r[p*2],e1z=z-r[p*2+1],e2x=r[q*2]-x,e2z=r[q*2+1]-z;const l1=Math.hypot(e1x,e1z)||1,l2=Math.hypot(e2x,e2z)||1;e1x/=l1;e1z/=l1;e2x/=l2;e2z/=l2;
    const n1x=-e1z,n1z=e1x,n2x=-e2z,n2z=e2x;let bx=n1x+n2x,bz=n1z+n2z;const bl=Math.hypot(bx,bz);if(bl<1e-4){bx=n1x;bz=n1z}else{bx/=bl;bz/=bl}const dot=Math.max(.4,bx*n1x+bz*n1z);const s=Math.min(d/dot,Math.min(l1,l2)*.6,d*2.2);out.push([x+bx*s,z+bz*s])}return out}
/* ---------- materials ---------- */
function cityMats(){if(CM.asphalt)return;
  const aC=noiseCanvas(256,256,'#35343a',.18,2400);const aT=new THREE.CanvasTexture(aC);aT.wrapS=aT.wrapT=THREE.RepeatWrapping;aT.anisotropy=8;
  CM.asphalt=std({map:aT,normalMap:rep(heightToNormal(aC,1.2),1,1),roughness:.82,color:0xb8b4bc,polygonOffset:true,polygonOffsetFactor:-1,polygonOffsetUnits:-2,envMapIntensity:.5});
  CM.mark=std({color:0xe8e8e0,roughness:.6,polygonOffset:true,polygonOffsetFactor:-3,polygonOffsetUnits:-4});
  CM.curb=std({color:0xa8a49c,roughness:.8});
  {const pH=mkCanvas(256,256,(x)=>{x.fillStyle='#4a4640';x.fillRect(0,0,256,256);for(let r=0;r<16;r++)for(let c=0;c<16;c++){const l=rand(150,200)|0;x.fillStyle=`rgb(${l},${l},${l})`;x.fillRect(c*16+(r%2)*8+1,r*16+1,14,14)}});const pC=mkCanvas(256,256,(x)=>{x.drawImage(pH,0,0);x.globalCompositeOperation='multiply';x.fillStyle='#968c7c';x.fillRect(0,0,256,256)});const t=new THREE.CanvasTexture(pC);t.wrapS=t.wrapT=THREE.RepeatWrapping;t.anisotropy=8;
    CM.paving=std({map:t,normalMap:rep(heightToNormal(pH,1.1),1,1),roughness:.85,polygonOffset:true,polygonOffsetFactor:-1,polygonOffsetUnits:-2,envMapIntensity:.5})}
  const gH=mkCanvas(256,256,(x)=>{x.fillStyle='#8a8a8a';x.fillRect(0,0,256,256);for(let r=0;r<8;r++)for(let c=0;c<4;c++){const l=rand(185,235)|0;x.fillStyle=`rgb(${l},${l},${l})`;x.fillRect(c*64+(r%2)*32+1,r*32+1,62,30)}});
  const gC=mkCanvas(256,256,(x)=>{x.drawImage(gH,0,0);x.globalCompositeOperation='multiply';x.fillStyle='#9a948c';x.fillRect(0,0,256,256);x.globalCompositeOperation='source-over';for(let k=0;k<1500;k++){x.fillStyle=`rgba(${rand(40,90)|0},${rand(40,80)|0},${rand(40,70)|0},${rand(.03,.1)})`;x.fillRect(rand(0,256),rand(0,256),rand(1,4),rand(1,4))}});
  const grC=mkCanvas(256,256,(x)=>{x.fillStyle='#46602f';x.fillRect(0,0,256,256);for(let k=0;k<7000;k++){x.fillStyle=`rgba(${rand(40,120)|0},${rand(80,150)|0},${rand(30,70)|0},.5)`;x.fillRect(rand(0,256),rand(0,256),1,rand(2,5))}});
  const pv=new THREE.CanvasTexture(gC),gr=new THREE.CanvasTexture(grC),pvn=heightToNormal(gH,1.4);for(const t of[pv,gr,pvn]){t.wrapS=t.wrapT=THREE.RepeatWrapping;t.anisotropy=8}
  const m=std({map:pv,normalMap:pvn,roughness:.9,vertexColors:true,envMapIntensity:.45});m.userData.grass=gr;
  m.onBeforeCompile=sh=>{sh.uniforms.tGrass={value:gr};sh.vertexShader=sh.vertexShader.replace('#include <common>','#include <common>\nattribute float aGrass;varying float vGrass;').replace('#include <uv_vertex>','#include <uv_vertex>\nvGrass=aGrass;');
    sh.fragmentShader=sh.fragmentShader.replace('#include <common>','#include <common>\nuniform sampler2D tGrass;varying float vGrass;').replace('#include <map_fragment>','vec2 gq=vUv*.7;float gn=.5+.5*sin(vUv.x*.21+sin(vUv.y*.17)*2.3)*sin(vUv.y*.19+sin(vUv.x*.13)*1.7);vec4 gT=texture2D(tGrass,gq+vec2(0.,floor(gq.x)*.37))*(.82+.3*gn);vec4 texelColor=mix(texture2D(map,vUv),gT,vGrass);texelColor=mapTexelToLinear(texelColor);diffuseColor*=texelColor;').replace('#include <normal_fragment_maps>',THREE.ShaderChunk.normal_fragment_maps.replace('mapN.xy *= normalScale;','mapN.xy *= normalScale*(1.-vGrass);'))};m.customProgramCacheKey=()=>'groundG2';
  m.stencilWrite=true;m.stencilRef=1;m.stencilFunc=THREE.NotEqualStencilFunc;m.stencilZPass=THREE.KeepStencilOp;m.stencilFail=THREE.KeepStencilOp;m.stencilZFail=THREE.KeepStencilOp;CM.ground=m;
  CM.hole=new THREE.MeshBasicMaterial({colorWrite:false,depthWrite:false,stencilWrite:true,stencilRef:1,stencilFunc:THREE.AlwaysStencilFunc,stencilZPass:THREE.ReplaceStencilOp,stencilFail:THREE.ReplaceStencilOp,stencilZFail:THREE.ReplaceStencilOp});
  const stC=noiseCanvas(128,128,'#b8ac94',.25,500);CM.quay=std({map:rep(new THREE.CanvasTexture(stC),1,1),normalMap:rep(heightToNormal(stC,2.5),1,1),roughness:.85,color:0xd8ccb4});
  CM.roofTop=std({color:0x5a5a62,roughness:.8,side:THREE.DoubleSide});
  CM.zincD=CM.zinc.clone();CM.zincD.side=THREE.DoubleSide;OW.windowMats.push(CM.zincD);
  CM.tileD=CM.tile.clone();CM.tileD.side=THREE.DoubleSide}
/* ---------- build ---------- */
function buildOpenWorld(){const t0=performance.now();
  initWorldAssets();cityMats();
  const B=CITY.bounds;OW.x0=B[0];OW.z0=B[1];OW.x1=B[2];OW.z1=B[3];OW.cell=6;
  OW.gw=Math.ceil((OW.x1-OW.x0)/OW.cell);OW.gh=Math.ceil((OW.z1-OW.z0)/OW.cell);OW.grid=new Uint8Array(OW.gw*OW.gh).fill(1);
  // landmark / park positions
  for(const l of LANDMARKS){const c=LL(l.ll[0],l.ll[1]);l.x=c.x;l.z=c.z;if(l.n==='Tour Eiffel')l.k=1.7}
  for(const p of PARKS){const c=LL(p.ll[0],p.ll[1]);p.x=c.x;p.z=c.z;p.W=p.w*KS;p.D=p.d*KS}
  const inRect=(x,z,cx,cz,w,d,ry,m=0)=>{const dx=x-cx,dz=z-cz,c=Math.cos(ry||0),s=Math.sin(ry||0),u=dx*c-dz*s,v=dx*s+dz*c;return Math.abs(u)<=w/2+m&&Math.abs(v)<=d/2+m};
  const lmHit=(x,z)=>{for(const l of LANDMARKS){if(l.park||l.bridge||l.canal)continue;const ls=LS*(l.k||1);if(l.r){if(Math.hypot(x-l.x,z-l.z)<l.r*ls*1.15+6)return l}else if(inRect(x,z,l.x,l.z,l.w*ls*1.12,l.d*ls*1.12,l.ry||0,6))return l}return null};
  const parkHit=(x,z)=>{for(const p of PARKS)if(inRect(x,z,p.x,p.z,p.W,p.D,-(p.ry||0)))return p;return null};
  for(const b of CITY.bld){if(lmHit(b.cx,b.cz)||parkHit(b.cx,b.cz))b.gone=true}
  /* nothing stands between a quai and the Seine: drop buildings on the river side of any "Quai ..." road */
  {const inRiver=(x,z)=>{let r=false;cityQuery(x,z,0,'w',W=>{if(W.low&&ptInPoly(W,x,z)){r=true;return false}});return r};const o={};let n=0;
   for(const b of CITY.bld){if(b.gone)continue;const e=nearestEdge(b.cx,b.cz,80,e=>e.name!==0xFFFF&&/^(Quai|Port) /.test(CITY.names[e.name]||''));if(!e)continue;distToEdge(e,b.cx,b.cz,o);
     const dx=b.cx-o.x,dz=b.cz-o.z,d=Math.hypot(dx,dz);if(d<3)continue;const ux=dx/d,uz=dz/d;let hit=false;for(const k of[18,32,46,60,75])if(inRiver(b.cx+ux*k,b.cz+uz*k)){hit=true;break}
     if(hit&&!inRiver(o.x-ux*30,o.z-uz*30)){b.gone=true;n++}}OW.quaiCleared=n}
  // raster
  for(const p of CITY.parks)rasterRings([p.ring,...p.holes],3);
  for(const q of CITY.plazas)rasterRings([q.ring,...q.holes],4);
  for(const e of CITY.edges){if(e.br)continue;const p=e.p;for(let k=2;k<p.length;k+=2)rasterSeg({x:p[k-2],z:p[k-1]},{x:p[k],z:p[k+1]},e.w,10,[1,3,4,7])}
  for(const w of CITY.water)rasterRings([w.ring,...w.holes],2);
  for(const e of CITY.edges){if(!e.br)continue;const p=e.p;for(let k=2;k<p.length;k+=2){rasterSeg({x:p[k-2],z:p[k-1]},{x:p[k],z:p[k+1]},e.w+e.sw*2,5,[2]);rasterSeg({x:p[k-2],z:p[k-1]},{x:p[k],z:p[k+1]},e.w,10,[1,3,4])}}
  for(const b of CITY.bld)if(!b.gone)rasterRings([b.ring,...b.holes],7,[1,3,4]);
  for(const p of PARKS)rasterRect(p.x,p.z,p.W,p.D,-(p.ry||0),p.k||3,[1,3,4]);
  for(const l of LANDMARKS){if(l.park||l.bridge||l.canal)continue;if(l.r){const rr=l.r*LS*(l.k||1)+8;rasterCircle(l.x,l.z,rr,6,1),rasterCircle(l.x,l.z,rr,6,4),rasterCircle(l.x,l.z,rr,6,3),rasterCircle(l.x,l.z,rr,6,10)}else rasterRect(l.x,l.z,l.w*LS+14,l.d*LS+14,l.ry||0,6,[1,3,4,7,10])}
  if(typeof metroRaster==='function')metroRaster();
  // river centreline for boats
  {const pts=SEINE.map(s=>LL(s[0],s[1]));const curve=new THREE.CatmullRomCurve3(pts.map(p=>V3(p.x,0,p.z)));const n=Math.ceil(curve.getLength()/40);const dense=curve.getSpacedPoints(n).map(v=>({x:v.x,z:v.z,hw:20}));
    for(let k=0;k<dense.length;k++){const a=dense[Math.max(0,k-1)],b=dense[Math.min(dense.length-1,k+1)];const dx=b.x-a.x,dz=b.z-a.z,l=Math.hypot(dx,dz)||1,nx=-dz/l,nz=dx/l;const d=dense[k];const iv=[];let st=null;
      for(let s=-420;s<=420;s+=4){const w=gType(d.x+nx*s,d.z+nz*s)===2;if(w&&st===null)st=s;if(!w&&st!==null){iv.push([st,s-4]);st=null}}if(st!==null)iv.push([st,420]);
      if(!iv.length)continue;let best=iv[0],bd=1e9;for(const q of iv){const c=(q[0]+q[1])/2;const dd=Math.abs(c)-(q[1]-q[0])*.3;if(dd<bd){bd=dd;best=q}}const c=(best[0]+best[1])/2;d.x+=nx*c;d.z+=nz*c;d.hw=Math.max(8,(best[1]-best[0])/2)}
    for(let it=0;it<3;it++)for(let k=1;k<dense.length-1;k++){dense[k].x=(dense[k-1].x+dense[k].x*2+dense[k+1].x)/4;dense[k].z=(dense[k-1].z+dense[k].z*2+dense[k+1].z)/4}
    OW.river=dense}
  OW.canal=[];
  // terrain height map
  const hc=OW.hmc=16,hw_=OW.hmw=Math.ceil((OW.x1-OW.x0)/hc)+1,hh_=OW.hmh=Math.ceil((OW.z1-OW.z0)/hc)+1;const dist=new Float32Array(hw_*hh_).fill(1e6);
  for(let j=0;j<hh_;j++)for(let i=0;i<hw_;i++)if(gType(OW.x0+i*hc,OW.z0+j*hc)===2)dist[j*hw_+i]=0;
  const D1=hc,D2=hc*1.4142;for(let j=0;j<hh_;j++)for(let i=0;i<hw_;i++){const k=j*hw_+i;let d=dist[k];if(i>0)d=Math.min(d,dist[k-1]+D1);if(j>0){d=Math.min(d,dist[k-hw_]+D1);if(i>0)d=Math.min(d,dist[k-hw_-1]+D2);if(i<hw_-1)d=Math.min(d,dist[k-hw_+1]+D2)}dist[k]=d}
  for(let j=hh_-1;j>=0;j--)for(let i=hw_-1;i>=0;i--){const k=j*hw_+i;let d=dist[k];if(i<hw_-1)d=Math.min(d,dist[k+1]+D1);if(j<hh_-1){d=Math.min(d,dist[k+hw_]+D1);if(i<hw_-1)d=Math.min(d,dist[k+hw_+1]+D2);if(i>0)d=Math.min(d,dist[k+hw_-1]+D2)}dist[k]=d}
  const hm=new Float32Array(hw_*hh_);for(const hl of HILLS){const c=LL(hl[0],hl[1]),h=hl[2]*F*.85,r=hl[3]*2.4*F;const i0=Math.max(0,Math.floor((c.x-r-OW.x0)/hc)),i1=Math.min(hw_-1,Math.ceil((c.x+r-OW.x0)/hc)),j0=Math.max(0,Math.floor((c.z-r-OW.z0)/hc)),j1=Math.min(hh_-1,Math.ceil((c.z+r-OW.z0)/hc));
    for(let j=j0;j<=j1;j++)for(let i=i0;i<=i1;i++){const x=OW.x0+i*hc,z=OW.z0+j*hc,q=((x-c.x)**2+(z-c.z)**2)/(r*r);if(q<1)hm[j*hw_+i]+=h*(1-q)*(1-q)}}
  for(let k=0;k<hm.length;k++){const t=clamp((dist[k]-80)/500,0,1);hm[k]*=t*t*(3-2*t)}OW.hm=hm;
  // water surfaces
  const wmat=makeWaterMat();OW.waterMat=wmat;const bmat=makeWaterMat();bmat.map=null;bmat.color.setHex(0x2f7fb0);bmat.roughness=.04;bmat.metalness=.35;bmat.envMapIntensity=2.2;bmat.normalScale.set(.7,.7);bmat.transparent=true;bmat.opacity=.88;bmat.emissive=new THREE.Color(0x0a2a40);bmat.needsUpdate=true;OW.basinMat=bmat;
  for(const w of CITY.water){wLevel(w);if(w.slope){/* stepped basin on a hillside: drape the water over the slope */const P=[],I=[];const st=3;let v=0;for(let x=w.bb[0];x<w.bb[2];x+=st)for(let z=w.bb[1];z<w.bb[3];z+=st){if(!ptInPoly(w,x+st/2,z+st/2))continue;for(const[a,b]of[[x,z],[x+st,z],[x+st,z+st],[x,z+st]])P.push(a,terrainH(a,b)+.12,b);I.push(v,v+2,v+1,v,v+3,v+2);v+=4}
      if(P.length){const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(P,3));const uv=[];for(let k=0;k<P.length;k+=3)uv.push(P[k]/40,P[k+2]/40);g.setAttribute('uv',new THREE.Float32BufferAttribute(uv,2));g.setIndex(I);g.computeVertexNormals();const m=new THREE.Mesh(g,bmat);m.receiveShadow=true;m.matrixAutoUpdate=false;scene.add(m)}continue}
    const tr=triangulate(ringArr(w.ring),w.holes.map(ringArr));if(!tr)continue;const mb=new MB();triUp(mb,tr.idx,tr.verts,wLevel(w),COL.white,1/40);const g=mb.build();if(!g)continue;const m=new THREE.Mesh(g,w.low?wmat:bmat);m.receiveShadow=true;m.matrixAutoUpdate=false;scene.add(m)}
  /* stone kerb around fountains and ponds so the raised water reads as a basin */
  {const P=[],I=[];const lip=(x1,z1,x2,z2,y0,y1)=>{const dx=x2-x1,dz=z2-z1,L=Math.hypot(dx,dz);if(L<.05)return;const nx=-dz/L*.32,nz=dx/L*.32;const b=P.length/3;
      P.push(x1-nx,y0,z1-nz, x2-nx,y0,z2-nz, x1-nx,y1,z1-nz, x2-nx,y1,z2-nz, x1+nx,y1,z1+nz, x2+nx,y1,z2+nz, x1+nx,y0,z1+nz, x2+nx,y0,z2+nz);
      I.push(b,b+1,b+3,b,b+3,b+2, b+2,b+3,b+5,b+2,b+5,b+4, b+4,b+5,b+7,b+4,b+7,b+6)};
    for(const w of CITY.water){if(w.low)continue;const lv=wLevel(w);for(const r of [w.ring,...w.holes]){for(let k=0;k<r.length;k+=2){const k2=(k+2)%r.length;if(w.slope){const h=terrainH((r[k]+r[k2])/2,(r[k+1]+r[k2+1])/2);lip(r[k],r[k+1],r[k2],r[k2+1],h-.4,h+.35)}else lip(r[k],r[k+1],r[k2],r[k2+1],lv-.6,lv+.1)}}}
    if(P.length){const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(P,3));g.setIndex(I);g.computeVertexNormals();const m=new THREE.Mesh(g,std({color:0xcfc6b4,roughness:.85,side:THREE.DoubleSide}));m.receiveShadow=true;m.castShadow=false;m.matrixAutoUpdate=false;scene.add(m)}}
  // landmarks
  const M=lmMats();
  for(const l of LANDMARKS){const base=l.park||l.bridge||l.canal?0:terrainH(l.x,l.z);const g=new THREE.Group();g.position.set(l.x,base,l.z);g.rotation.y=l.ry||0;g.scale.setScalar(LS*(l.k||1));scene.add(g);
    if(l.bridge){const e=nearestEdge(l.x,l.z,120,e=>e.br);if(e){const o={};distToEdge(e,l.x,l.z,o);g.position.set(o.x,.2,o.z);g.rotation.y=Math.atan2(o.dx,o.dz)}else{g.visible=false}}
    if(l.canal){g.visible=false}
    if(l.n==='Tour Eiffel')buildEiffelAt(g,LS*l.k);else if(l.n==='Arc de Triomphe')buildArcAt(g,LS);else if(!l.canal)l.b(g,M);l.g=g;l.base=base;
    if(!l.park&&!l.bridge&&!l.canal){const R=l.r||Math.max(l.w,l.d)/2;const pl=new THREE.Mesh(new THREE.CircleGeometry(R+5,40),std({color:0x6a6252,roughness:.92,metalness:0,envMapIntensity:.3}));pl.rotation.x=-Math.PI/2;pl.position.y=.08/LS;pl.receiveShadow=true;g.add(pl)}
    g.updateMatrixWorld(true);
    if(!l.park&&!l.bridge&&!l.canal&&l.n!=='Tour Eiffel'&&l.n!=='Arc de Triomphe'){g.traverse(o=>{if(o.isMesh&&o.geometry.type==='BoxGeometry'&&o.castShadow){const bb=new THREE.Box3().setFromObject(o);if(bb.max.y-bb.min.y>4&&bb.max.x-bb.min.x>2.5&&bb.max.z-bb.min.z>2.5&&bb.min.y<base+3)addBox({x0:bb.min.x,x1:bb.max.x,z0:bb.min.z,z1:bb.max.z,h:bb.max.y,lm:true})}})}
    if(l.n==='Tour Eiffel'){EIFFEL.x=l.x;EIFFEL.z=l.z;const S=LS*l.k;OW.decks.push({x0:l.x-7.5*S,x1:l.x+7.5*S,z0:l.z-7.5*S,z1:l.z+7.5*S,y:21.75*S},{x0:l.x-3.2*S,x1:l.x+3.2*S,z0:l.z-3.2*S,z1:l.z+3.2*S,y:38.55*S})}
    if(l.n==='Arc de Triomphe'){ARC.x=l.x;ARC.z=l.z;OW.decks.push({x0:l.x-11.3*LS,x1:l.x+11.3*LS,z0:l.z-4.8*LS,z1:l.z+4.8*LS,y:24.1*LS})}
    if(g.userData.spin)OW.spinners.push(g.userData.spin)}
  for(const p of PARKS){OW.parks.push(p);OW.spots.push({x:p.x,z:p.z,r:Math.min(p.W,p.D)*.42,name:p.name})}
  for(const l of LANDMARKS)if(!l.park)OW.spots.push({x:l.x,z:l.z,r:(l.r||Math.max(l.w||20,l.d||20)/2)*LS+14,name:l.n});
  // bouquinistes along the quays of the 5th/6th and 1st/4th
  for(const e of CITY.edges){if(e.name===0xFFFF)continue;const nm=CITY.names[e.name];if(!/^Quai (de Conti|Malaquais|des Grands-Augustins|Saint-Michel|de Montebello|de la Tournelle|du Louvre|de la Mégisserie|de Gesvres|de l'Hôtel de Ville|Voltaire)/.test(nm))continue;
    const p=e.p;for(let k=2;k<p.length;k+=2){const ax=p[k-2],az=p[k-1],bx=p[k],bz=p[k+1],L=Math.hypot(bx-ax,bz-az);const nx=-(bz-az)/L,nz=(bx-ax)/L;for(let s=4;s<L-4;s+=9){const x=ax+(bx-ax)*s/L,z=az+(bz-az)*s/L;for(const sd of[-1,1]){const ox=x+nx*sd*(e.w/2+e.sw-.8),oz=z+nz*sd*(e.w/2+e.sw-.8);let wn=false;for(let q=2;q<16&&!wn;q+=3)if(gType(ox+nx*sd*q,oz+nz*sd*q)===2)wn=true;if(wn)binAdd('book',ox,oz,[ox,oz,Math.atan2(bx-ax,bz-az)])}}}}
  if(typeof metroBuild==='function')metroBuild();
  const tro=LANDMARKS.find(l=>l.n==='Trocadéro'),eif=LANDMARKS.find(l=>l.n==='Tour Eiffel');{const sx=lerp(tro.x,eif.x,.28),sz=lerp(tro.z,eif.z,.28);const sp=findSpotOW(sx,sz,0,40)||V3(sx,0,sz);SPAWN.set(sp.x,0,sp.z)}
  owStream(SPAWN.x,SPAWN.z,99);
  OW.buildMs=performance.now()-t0}
function findSpotOW(cx,cz,dmin,dmax){for(let k=0;k<80;k++){const a=Math.random()*TAU,d=rand(dmin,dmax),x=cx+Math.sin(a)*d,z=cz+Math.cos(a)*d;if(owValidSpot(x,z))return V3(x,0,z)}return null}
function makeWaterMat(){const wtex=canvasTex(256,256,(x)=>{x.fillStyle='#8a948a';x.fillRect(0,0,256,256);for(let k=0;k<400;k++){x.fillStyle=Math.random()<.5?'rgba(150,160,140,.12)':'rgba(40,50,45,.12)';x.beginPath();x.arc(Math.random()*256,Math.random()*256,rand(6,30),0,TAU);x.fill()}});rep(wtex,1,1);
  const wnC=noiseCanvas(256,256,'#808080',.35,500);const wn=rep(heightToNormal(wnC,4),1,1);window.__waterTex=wtex;window.__waterN=wn;
  const m=std({map:wtex,normalMap:wn,normalScale:new THREE.Vector2(.3,.3),roughness:.12,metalness:.05,envMapIntensity:.75,color:0x3c4a42});
  m.onBeforeCompile=sh=>{sh.uniforms.uT={value:0};m.userData.sh=sh;sh.fragmentShader=sh.fragmentShader.replace('#include <common>','#include <common>\nuniform float uT;').replace('#include <normal_fragment_maps>',`vec3 mapN=texture2D(normalMap,vUv+vec2(uT*.013,uT*.007)).xyz*2.-1.;vec3 mapN2=texture2D(normalMap,vUv*1.7-vec2(uT*.009,-uT*.011)).xyz*2.-1.;mapN=normalize(vec3((mapN.xy+mapN2.xy)*normalScale,1.));
#ifdef USE_TANGENT
normal=normalize(vTBN*mapN);
#else
normal=perturbNormal2Arb(-vViewPosition,normal,mapN,faceDirection);
#endif`).replace('#include <dithering_fragment>',`#include <dithering_fragment>
{float fr=pow(1.-clamp(dot(normalize(vViewPosition),normal),0.,1.),3.);gl_FragColor.rgb=mix(gl_FragColor.rgb*.8,gl_FragColor.rgb*1.15,fr);}`)};m.customProgramCacheKey=()=>'waterV9';
  return m}
/* ---------- chunk streaming ---------- */
function owStream(px,pz,budget=1){const [pci,pcj]=chunkOf(px,pz);const R=isTouch?2:3,RD=R+1.6;const want=[];
  for(let di=-R;di<=R;di++)for(let dj=-R;dj<=R;dj++){const ci=pci+di,cj=pcj+dj;const ccx=(ci+.5)*CHS,ccz=(cj+.5)*CHS;const d=Math.hypot(ccx-px,ccz-pz);if(d>CHS*(R+.35))continue;if(ccx<OW.x0-CHS||ccx>OW.x1+CHS||ccz<OW.z0-CHS||ccz>OW.z1+CHS)continue;if(!OW.chunks.has(ci*4096+cj))want.push([d,ci,cj])}
  want.sort((a,b)=>a[0]-b[0]);for(let k=0;k<Math.min(budget,want.length);k++)buildChunk(want[k][1],want[k][2]);
  for(const [key,C] of OW.chunks){const ccx=(C.ci+.5)*CHS,ccz=(C.cj+.5)*CHS;if(Math.hypot(ccx-px,ccz-pz)>CHS*RD)disposeChunk(C)}
  if(typeof farStream==='function')farStream(px,pz)}
function disposeChunk(C){for(const m of C.meshes){scene.remove(m);m.geometry.dispose()}for(const t of C.tex||[])t.dispose();for(const b of C.boxes)hbDel(b);if(C.shops.length)OW.shops=OW.shops.filter(s=>s.chunk!==C);if(C.seats.length&&OW.seats)OW.seats=OW.seats.filter(s=>s.chunk!==C);OW.chunks.delete(C.key);if(typeof farShow==='function')farShow(C.ci,C.cj,true)}
const _own=(x,z,ci,cj)=>Math.floor(x/CHS)===ci&&Math.floor(z/CHS)===cj;
function buildChunk(ci,cj){const key=ci*4096+cj;const C={ci,cj,key,meshes:[],boxes:[],shops:[],seats:[],tex:[]};OW.chunks.set(key,C);const mb={};const get=k=>mb[k]||(mb[k]=new MB());const lamps=[];
  const x0=ci*CHS,z0=cj*CHS,cx=x0+CHS/2,cz=z0+CHS/2;
  groundChunk(get,ci,cj);
  const plaques=[];
  cityQuery(cx,cz,CHS/2,'e',e=>{const p=e.p,k=(p.length/2|0)&~1;if(!_own(p[k],p[k+1],ci,cj))return;roadMesh(get,e,C,lamps)});
  cityQuery(cx,cz,CHS/2,'w',w=>{if(w.low)quayWalls(get,w,ci,cj)});
  cityQuery(cx,cz,CHS/2,'b',B=>{if(B.gone||!_own(B.cx,B.cz,ci,cj))return;genBuilding(get,B,C,plaques)});
  scatterChunk(get,ci,cj,C);
  const bin=BIN.get(key);if(bin){for(const t of bin.tree||[])addTree(get,t[0],t[1],t[2],hash2(t[0]|0,t[1]|0,1));for(const l of bin.lamp||[])addLamp(get,lamps,l[0],l[1]);
    for(const bk of bin.book||[]){const y=terrainH(bk[0],bk[1]);get('props').add(TG.box,MX(bk[0],y+1.1,bk[1],bk[2],.9,.9,2.2),COL.book)}
    for(const e of bin.ent||[])addEntrance(get,C,e)}
  for(const k in mb){const g=mb[k].build();if(!g)continue;if(k==='hole'){const m=new THREE.Mesh(g,CM.hole);m.renderOrder=-5;m.matrixAutoUpdate=false;scene.add(m);C.meshes.push(m);continue}if(k==='ground'){const pa=g.attributes.position,gr=new Float32Array(pa.count);for(let i=0;i<pa.count;i++){const c=GCOL[gType(pa.getX(i),pa.getZ(i))];gr[i]=c?c[3]:0}g.setAttribute('aGrass',new THREE.BufferAttribute(gr,1))}const mat=k.startsWith('fac')?FACL[+k[3]].mats[+k[5]]:CM[k];const m=new THREE.Mesh(g,mat);m.receiveShadow=k!=='glow'&&k!=='cone'&&k!=='pool';m.castShadow=k.startsWith('fac')||k==='props'||k==='cars'||k==='leaf'||k==='zincD'||k==='tileD';m.matrixAutoUpdate=false;scene.add(m);C.meshes.push(m)}
  if(plaques.length)buildPlaques(C,plaques);
  if(lamps.length){const lg=new THREE.BufferGeometry();lg.setAttribute('position',new THREE.Float32BufferAttribute(lamps,3));lg.computeBoundingSphere();const p=new THREE.Points(lg,CM.lglow);scene.add(p);C.meshes.push(p)}
  if(typeof farShow==='function')farShow(ci,cj,false)}
/* ---------- ground ---------- */
const GCOL={1:[.78,.75,.72,0],3:[.82,.9,.78,1],4:[.95,.92,.86,0],5:[.8,.78,.74,0],6:[.86,.83,.78,0],7:[.7,.68,.66,0],8:[.7,.85,.7,1],9:[.85,.84,.8,.5],10:[.6,.6,.62,0],2:[.5,.5,.5,0],0:[.7,.7,.7,0]};
function groundChunk(get,ci,cj){const x0=ci*CHS,z0=cj*CHS;const g=get('ground');const col=(x,z)=>GCOL[gType(x,z)]||GCOL[1];
  if(!g.grass)g.grass=[];
  const wt=CITY.wtiles.get(ci*4096+cj);
  if(wt){const V=[],map=new Map();const vid=(x,z)=>{const k=Math.round(x*8)+','+Math.round(z*8);let id=map.get(k);if(id===undefined){id=V.length/2;V.push(x,z);map.set(k,id)}return id};
    const tris=[];const MAXE=7;const split=(a,b,c,d)=>{const ax=V[a*2],az=V[a*2+1],bx=V[b*2],bz=V[b*2+1],cx=V[c*2],cz=V[c*2+1];const e1=Math.hypot(bx-ax,bz-az),e2=Math.hypot(cx-bx,cz-bz),e3=Math.hypot(ax-cx,az-cz);const m=Math.max(e1,e2,e3);
      if(m<=MAXE||d>16){tris.push(a,b,c);return}if(m===e1){const n=vid((ax+bx)/2,(az+bz)/2);split(a,n,c,d+1);split(n,b,c,d+1)}else if(m===e2){const n=vid((bx+cx)/2,(bz+cz)/2);split(a,b,n,d+1);split(a,n,c,d+1)}else{const n=vid((cx+ax)/2,(cz+az)/2);split(a,b,n,d+1);split(n,b,c,d+1)}};
    for(let k=0;k<wt.I.length;k+=3){const a=vid(wt.V[wt.I[k]*2],wt.V[wt.I[k]*2+1]),b=vid(wt.V[wt.I[k+1]*2],wt.V[wt.I[k+1]*2+1]),c=vid(wt.V[wt.I[k+2]*2],wt.V[wt.I[k+2]*2+1]);split(a,b,c,0)}
    const v0=g.v;for(let k=0;k<V.length;k+=2){const x=V[k],z=V[k+1];const c=col(x,z);g.p.push(x,gtY(x,z),z);g.n.push(0,1,0);g.u.push(x/9,z/9);g.c.push(c[0],c[1],c[2]);g.grass.push(c[3])}
    for(let k=0;k<tris.length;k+=3){const a=tris[k],b=tris[k+1],c=tris[k+2];const cr=(V[b*2]-V[a*2])*(V[c*2+1]-V[a*2+1])-(V[b*2+1]-V[a*2+1])*(V[c*2]-V[a*2]);if(cr<0)g.i.push(v0+a,v0+b,v0+c);else g.i.push(v0+a,v0+c,v0+b)}g.v+=V.length/2;return}
  const N=48,st=CHS/N,v0=g.v;for(let j=0;j<=N;j++)for(let i=0;i<=N;i++){const x=x0+i*st,z=z0+j*st;const c=col(x,z);g.p.push(x,gtY(x,z),z);g.n.push(0,1,0);g.u.push(x/9,z/9);g.c.push(c[0],c[1],c[2]);g.grass.push(c[3])}
  for(let j=0;j<N;j++)for(let i=0;i<N;i++){const a=v0+j*(N+1)+i,b=a+1,c=a+N+1,d=c+1;g.i.push(a,c,b,b,c,d)}g.v+=(N+1)*(N+1)}
/* ---------- roads ---------- */
function ribbon(mb,p,hw,yf,uvScale,col,y0){// flat ribbon along polyline, world-space uvs
  const n=p.length/2;const v0=mb.v;for(let k=0;k<n;k++){const a=Math.max(0,k-1),b=Math.min(n-1,k+1);let dx=p[b*2]-p[a*2],dz=p[b*2+1]-p[a*2+1];const l=Math.hypot(dx,dz)||1;dx/=l;dz/=l;const nx=-dz,nz=dx;const x=p[k*2],z=p[k*2+1];
    for(const s of[1,-1]){const X=x+nx*hw*s,Z=z+nz*hw*s;mb.p.push(X,y0!==undefined?y0:yf(X,Z),Z);mb.n.push(0,1,0);mb.u.push(X*uvScale,Z*uvScale);mb.c.push(col.r,col.g,col.b)}}
  for(let k=0;k<n-1;k++){const o=v0+k*2;mb.i.push(o,o+2,o+1,o+1,o+2,o+3)}mb.v+=n*2}
const _rs=new THREE.Color(1,1,1);
function roadMesh(get,e,C,lamps){const p=e.p,hw=e.w/2;const yf=(x,z)=>terrainH(x,z)+.07;const nm=e.name!==0xFFFF?CITY.names[e.name]:'';
  if(e.br){bridgeMesh(get,e,C);return}
  ribbon(get(e.cls>=6?'paving':'asphalt'),p,hw,yf,1/7,_rs);
  // curbs
  const n=p.length/2;if(e.cls<7){for(const s of[1,-1]){const cb=get('curb');for(let k=0;k<n-1;k++){const ax=p[k*2],az=p[k*2+1],bx=p[k*2+2],bz=p[k*2+3];const L=Math.hypot(bx-ax,bz-az)||1;const nx=-(bz-az)/L*s,nz=(bx-ax)/L*s;const q=(x,z)=>[x+nx*hw,0,z+nz*hw];const A=q(ax,az),Bq=q(bx,bz);const ya=terrainH(ax,az),yb=terrainH(bx,bz);
        face4(cb,[A[0],ya-.1,A[2]],[Bq[0],yb-.1,Bq[2]],[Bq[0],yb+.2,Bq[2]],[A[0],ya+.2,A[2]],[-nx,0,-nz],[0,0,1,0,1,1,0,1],COL.white)}}}
  // centre dashes on two-way roads
  let acc=0;if(e.cls<=4&&e.w>8.5*U){const mk=get('mark');for(let k=0;k<n-1;k++){const ax=p[k*2],az=p[k*2+1],bx=p[k*2+2],bz=p[k*2+3];const L=Math.hypot(bx-ax,bz-az);for(let s=0;s<L;s+=6){const g=acc+s;if(g<10||g>e.len-10)continue;const t=s/L,t2=Math.min(1,(s+3)/L);const x1=lerp(ax,bx,t),z1=lerp(az,bz,t),x2=lerp(ax,bx,t2),z2=lerp(az,bz,t2);const dx=(bz-az)/L*.12,dz=-(bx-ax)/L*.12;const y=terrainH(x1,z1)+.1;
      face4(mk,[x1+dx,y,z1+dz],[x2+dx,y,z2+dz],[x2-dx,y,z2-dz],[x1-dx,y,z1-dz],[0,1,0],[0,0,1,0,1,1,0,1],COL.white)}acc+=L}}
  // zebra crossings at busy ends
  for(const end of[0,1]){const node=end?e.b:e.a;const deg=(CITY.adj[node]||[]).length;if(deg<3||e.cls>5||e.len<22)continue;const k=end?n-2:0;const ax=p[k*2],az=p[k*2+1],bx=p[k*2+2],bz=p[k*2+3];const L=Math.hypot(bx-ax,bz-az)||1;const dx=(bx-ax)/L,dz=(bz-az)/L;const d=end?-7:7;const ox=end?bx:ax,oz=end?bz:az;const x=ox+dx*d,z=oz+dz*d;
    get('zebra').add(TG.flat,MX(x,terrainH(x,z)+.09,z,Math.atan2(dx,dz)+Math.PI/2,e.w*.92,1,3.4))}
  // furniture along sidewalks
  const R=mulberry(e.i*31+7);const avenue=/^(Avenue|Boulevard|Cours|Quai|Place)/.test(nm);const off=hw+e.sw*.42;
  let t=0;for(let k=0;k<n-1;k++){const ax=p[k*2],az=p[k*2+1],bx=p[k*2+2],bz=p[k*2+3];const L=Math.hypot(bx-ax,bz-az);if(L<1)continue;const nx=-(bz-az)/L,nz=(bx-ax)/L,ry=Math.atan2(bx-ax,bz-az);
    for(let s=(t%11);s<L;s+=11){const gpos=t+s;if(gpos<9||gpos>e.len-9)continue;const x=lerp(ax,bx,s/L),z=lerp(az,bz,s/L);
      for(const sd of[1,-1]){if(e.cls===7)break;const fx=x+nx*sd*off,fz=z+nz*sd*off;const ty=gType(fx,fz);if(ty===2||ty===7||ty===10||ty===6)continue;
        const slot=Math.round(gpos/11)+(sd>0?0:1);
        if(avenue&&e.sw>=5*U-.1){addTree(get,fx,fz,.95+R()*.2,hash2(fx|0,fz|0,3));if(slot%4===0)addLamp(get,lamps,x+nx*sd*(hw+1.1),z+nz*sd*(hw+1.1))}
        else{if(slot%3===0)addLamp(get,lamps,x+nx*sd*(hw+1.1),z+nz*sd*(hw+1.1));
          else if(e.cls>=3&&e.cls<=5&&R()<.55){const cxp=x+nx*sd*(hw-1.3),czp=z+nz*sd*(hw-1.3);addCar(get,C,cxp,czp,ry+(sd>0?0:Math.PI),R)}}
        if(R()<.025&&e.cls<=5){const bx2=fx,bz2=fz;get('props').add(TG.box,MX(bx2,terrainH(bx2,bz2)+.5,bz2,ry,.5,.12,2.2),COL.dark);get('props').add(TG.box,MX(bx2+nx*sd*.25,terrainH(bx2,bz2)+.85,bz2+nz*sd*.25,ry,.1,.6,2.2),COL.dark)}
        if(R()<.006&&avenue)addMorris(get,fx,fz)}}
    t+=L}}
function addMorris(get,x,z){const y=terrainH(x,z);get('props').add(TG.cyl12,MX(x,y+2.2,z,0,.75,4.4,.75),new THREE.Color('#2a4a30'));get('props').add(TG.cone,MX(x,y+4.9,z,0,.95,1,.95),new THREE.Color('#2a4a30'));get('mural').add(TG.cyl12,MX(x,y+2.4,z,0,.78,2.6,.78),null,[0,.5,.25,1]);const b={cx:x,cz:z,r:.8,x0:x-.8,x1:x+.8,z0:z-.8,z1:z+.8,h:y+5,circ:true};hbAdd(b)}
function bridgeMesh(get,e,C){const p=e.p,hw=e.w/2+e.sw;const n=p.length/2;const yf=(x,z)=>terrainH(x,z)+.07;
  ribbon(get('asphalt'),p,e.w/2,yf,1/9,_rs);ribbon(get('props'),p,hw,(x,z)=>terrainH(x,z)+.04,1/9,COL.stone);
  for(let k=0;k<n-1;k++){const ax=p[k*2],az=p[k*2+1],bx=p[k*2+2],bz=p[k*2+3];const L=Math.hypot(bx-ax,bz-az);if(L<.5)continue;const mx=(ax+bx)/2,mz=(az+bz)/2,ry=Math.atan2(bx-ax,bz-az);const nx=-(bz-az)/L,nz=(bx-ax)/L;const y=terrainH(mx,mz);
    get('quay').add(TG.box,MX(mx,y-1.1,mz,ry,hw*2+1,2.2,L+.1));
    for(const s of[-1,1])get('quay').add(TG.box,MX(mx+nx*s*(hw+.25),y+.55,mz+nz*s*(hw+.25),ry,.55,1.2,L+.1));
    const over=gType(mx,mz)===2||gType(mx+nx*hw*1.5,mz+nz*hw*1.5)===2;if(over&&k%2===0){for(let s=0;s<L;s+=34){const x=lerp(ax,bx,s/L),z=lerp(az,bz,s/L);if(gType(x,z)!==2)continue;get('quay').add(TG.box,MX(x,(WL-3+y-2.2)/2,z,ry,hw*2+2,y-2.2-(WL-3),4));
      }}}
  // lamps on bridges
  const lamps=[];let t=0;for(let k=0;k<n-1;k++){const ax=p[k*2],az=p[k*2+1],bx=p[k*2+2],bz=p[k*2+3];const L=Math.hypot(bx-ax,bz-az);const nx=-(bz-az)/L,nz=(bx-ax)/L;for(let s=(t%18);s<L;s+=18){const x=lerp(ax,bx,s/L),z=lerp(az,bz,s/L);for(const sd of[1,-1])get('glow').add(TG.sph,MX(x+nx*sd*(hw+.2),terrainH(x,z)+3.3,z+nz*sd*(hw+.2),0,.3,.36,.3),COL.warm)}t+=L}}
function quayWalls(get,w,ci,cj){const rings=[w.ring,...w.holes];for(const r of rings){const n=r.length/2;for(let i=0,j=n-1;i<n;j=i++){const ax=r[j*2],az=r[j*2+1],bx=r[i*2],bz=r[i*2+1];if(!_own((ax+bx)/2,(az+bz)/2,ci,cj))continue;const L=Math.hypot(bx-ax,bz-az);if(L<.3)continue;
    const nx=(bz-az)/L,nz=-(bx-ax)/L;// outward from water
    const ya=terrainH(ax,az),yb=terrainH(bx,bz);const mt=gType((ax+bx)/2+nx*3,(az+bz)/2+nz*3);if(mt===5)continue;
    face4(get('quay'),[ax,RIVERBED,az],[bx,RIVERBED,bz],[bx,yb,bz],[ax,ya,az],[-nx,0,-nz],[0,RIVERBED/6,L/6,RIVERBED/6,L/6,yb/6,0,ya/6],COL.white);
    if(mt!==10&&mt!==7){const px=nx*.35,pz=nz*.35;face4(get('quay'),[ax+px,ya,az+pz],[bx+px,yb,bz+pz],[bx+px,yb+1,bz+pz],[ax+px,ya+1,az+pz],[-nx,0,-nz],[0,0,L/6,0,L/6,.2,0,.2],COL.white);
      face4(get('quay'),[ax+px*2.4,ya+1,az+pz*2.4],[bx+px*2.4,yb+1,bz+pz*2.4],[bx+px*2.4,yb,bz+pz*2.4],[ax+px*2.4,ya,az+pz*2.4],[nx,0,nz],[0,0,L/6,0,L/6,.2,0,.2],COL.white);
      face4(get('quay'),[ax+px,ya+1,az+pz],[bx+px,yb+1,bz+pz],[bx+px*2.4,yb+1,bz+pz*2.4],[ax+px*2.4,ya+1,az+pz*2.4],[0,1,0],[0,0,L/6,0,L/6,.1,0,.1],COL.white)}}}}
/* ---------- buildings ---------- */
const MARKET_ST=new Set(['Rue Cler','Rue du Commerce','Rue Montorgueil','Rue Mouffetard','Rue des Martyrs','Rue de Buci','Rue Saint-Dominique','Rue du Bac','Rue Oberkampf','Rue des Rosiers','Rue de Bretagne','Rue Saint-Honoré','Rue de Lévis','Rue Daguerre','Rue Poncelet','Rue de Grenelle','Rue du Faubourg Saint-Denis','Rue de Seine','Rue des Abbesses','Rue Lepic','Rue Saint-Antoine','Rue de la Roquette','Rue Cadet','Rue de Charonne']);
const MARKET_SHOPS={fromagerie:3,primeur:3,bakery:3,cafe:3,epicerie:2,florist:1.5,brasserie:1.5,creperie:1,tabac:1,pharmacy:.6,bookshop:.6,boutique:1};
function genBuilding(get,B,C,plaques){const I=bldInfo(B);const fl=FACL[I.lay];const base=I.base,top=I.top,R=I.R;const fac=get('fac'+I.lay+'_'+I.v);const y0=base-3;
  const rings=[B.ring,...B.holes];const tc=_rs.clone();
  rings.forEach((r,ri)=>{const n=r.length/2;let acc=0;for(let i=0;i<n;i++){const j=(i+1)%n;const ax=r[i*2],az=r[i*2+1],bx=r[j*2],bz=r[j*2+1];const L=Math.hypot(bx-ax,bz-az);if(L<.05)continue;const nx=(bz-az)/L,nz=-(bx-ax)/L;
      tc.copy(I.tint).multiplyScalar(.95+((hash2(B.i,i,ri)%100)/1000));const vo=(base-y0)/fl.fh,vh=(top-y0)/fl.fh;const u0=acc/fl.fw,u1=(acc+L)/fl.fw;
      face4(fac,[bx,y0,bz],[ax,y0,az],[ax,top,az],[bx,top,bz],[nx,0,nz],[u0,-vo,u1,-vo,u1,vh-vo,u0,vh-vo],tc);acc+=L;
      if(ri===0&&L>7&&!B.sub){const mx=(ax+bx)/2,mz=(az+bz)/2;const fx=mx+nx*.05,fz=mz+nz*.05;const road=gType(mx+nx*3.5,mz+nz*3.5);
        if((road===10||road===1||road===4)&&!I.tower){const S=I.S;const ed=nearestEdge(mx+nx*4,mz+nz*4,14);const sn=ed?CITY.names[ed.name]||'':'';const mk=MARKET_ST.has(sn);const pr=mk?1:ed&&ed.cls<=2?.6:ed&&ed.cls<=3?.4:S.shop*2.2;const nShops=Math.min(mk?5:3,Math.floor(L/(mk?7:9)));for(let s=0;s<Math.max(1,nShops);s++){if(R()>pr)continue;const t=(s+.5)/Math.max(1,nShops);const sx=lerp(ax,bx,t)+nx*.05,sz=lerp(az,bz,t)+nz*.05;const ty=pickW(R,mk?MARKET_SHOPS:S.shops);addShop(get,C,ty,sx,sz,Math.atan2(nx,nz),base,Math.min(L/Math.max(1,nShops),9),R,I.zn)}}
        else if(I.S.hedge&&R()<.3)get('props').add(TG.box,MX(fx+nx*.6,base+.6,fz+nz*.6,Math.atan2(nx,nz),Math.min(L*.7,7),1.2,.8),COL.hedge);
        if(I.S.neon&&R()<.4){const c=pickR(R,COL.neon);get('glow').add(TG.box,MX(fx+nx*.35,base+5+R()*3,fz+nz*.35,Math.atan2(nx,nz),.5,3.5,.3),c)}
        if(I.S.murals&&R()<I.S.murals*.6&&L>12&&I.h>12){const k=(R()*8)|0;const u=(k%4)/4,v=1-(Math.floor(k/4)+1)/2;get('mural').add(TG.plane,MX(fx+nx*.07,base+6+Math.min(I.h-8,9)/2,fz+nz*.07,Math.atan2(nx,nz),Math.min(L*.8,14),Math.min(I.h-6,14),1),null,[u,v,u+.25,v+.5])}}
      // street plaques at corners
      if(ri===0&&!B.sub&&plaques.length<40&&L>5){const pr=(i+n-1)%n;const px=r[pr*2],pz=r[pr*2+1];const ex=ax-px,ez=az-pz,el=Math.hypot(ex,ez)||1;const turn=Math.abs((ex*(bz-az)-ez*(bx-ax))/(el*L));if(turn>.5){const mx=ax+(bx-ax)/L*2.6,mz=az+(bz-az)/L*2.6;const e=nearestEdge(mx+nx*6,mz+nz*6,26,q=>q.name!==0xFFFF);if(e)plaques.push({x:mx+nx*.08,z:mz+nz*.08,y:base+4.4,ry:Math.atan2(nx,nz),name:CITY.names[e.name],arr:arrAt(mx,mz)})}}}});
  // roof
  if(I.roof==='flat'){const tr=triangulate(ringArr(B.ring),B.holes.map(ringArr));if(tr)triUp(get('roofTop'),tr.idx,tr.verts,top+.05,COL.roof);
    if(R()<.6){const k=(R()*B.ring.length/2|0)*2;get('props').add(TG.box,MX(lerp(B.ring[k],B.cx,.5),top+.9,lerp(B.ring[k+1],B.cz,.5),0,2+R()*2,1.6,2+R()*2),COL.stone)}if(I.tower&&R()<.5)get('props').add(TG.cyl,MX(B.cx,top+5,B.cz,0,.14,10,.14),COL.dark);return}
  const mat=I.roof==='tile'?'tileD':'zincD';const rm=get(mat);const ins=[];
  rings.forEach((r,ri)=>{const inn=insetRing(r,I.inset);ins.push(inn);const n=r.length/2;let acc=0;for(let i=0;i<n;i++){const j=(i+1)%n;const ax=r[i*2],az=r[i*2+1],bx=r[j*2],bz=r[j*2+1];const L=Math.hypot(bx-ax,bz-az);if(L<.05)continue;const nx=(bz-az)/L,nz=-(bx-ax)/L;const a2=inn[i],b2=inn[j];
      const nl=Math.hypot(I.hm,I.inset);const u0=acc/8,u1=(acc+L)/8;face4(rm,[bx,top,bz],[ax,top,az],[a2[0],top+I.hm,a2[1]],[b2[0],top+I.hm,b2[1]],[nx*I.hm/nl,I.inset/nl,nz*I.hm/nl],[u1,0,u0,0,u0,1,u1,1],_rs);acc+=L;
      if(ri===0&&i%3===0&&R()<.7){const cxp=(a2[0]+b2[0])/2,czp=(a2[1]+b2[1])/2;get('props').add(TG.box,MX(cxp,top+I.hm+.7,czp,Math.atan2(nx,nz),2.4,2,.9),COL.chim)}}});
  const tr=triangulate(ins[0],ins.slice(1));if(tr)triUp(get('roofTop'),tr.idx,tr.verts,top+I.hm,COL.roof)}
/* ---------- street plaques ---------- */
function plaqueName(n){return n.toUpperCase()}
function buildPlaques(C,list){const cols=4,rows=Math.ceil(list.length/cols),W=256,H=80;const cv=mkCanvas(W*cols,H*rows,(x)=>{list.forEach((q,i)=>{const X=(i%cols)*W,Y=Math.floor(i/cols)*H;x.fillStyle='#e8ecef';x.fillRect(X,Y,W,H);x.fillStyle='#1b3f8f';x.fillRect(X+4,Y+4,W-8,H-8);x.strokeStyle='#2f8a4a';x.lineWidth=3;x.strokeRect(X+9,Y+9,W-18,H-18);x.strokeStyle='#f0f4f8';x.lineWidth=2;x.strokeRect(X+13,Y+13,W-26,H-26);
      x.fillStyle='#f4f6f8';x.textAlign='center';x.textBaseline='middle';x.font='600 12px Georgia,serif';x.fillText(q.arr?(q.arr.arr===1?'1er':q.arr.arr+'e')+' Arrt':'',X+W/2,Y+22);let nm=plaqueName(q.name),fs=24;x.font=`700 ${fs}px Georgia,serif`;while(x.measureText(nm).width>W-34&&fs>11){fs-=1;x.font=`700 ${fs}px Georgia,serif`}x.fillText(nm,X+W/2,Y+47)})});
  const t=new THREE.CanvasTexture(cv);t.anisotropy=4;C.tex.push(t);const mat=new THREE.MeshStandardMaterial({map:t,roughness:.35,metalness:.1,emissive:0xffffff,emissiveMap:t,emissiveIntensity:.12});C.tex.push(mat);
  const mb=new MB();list.forEach((q,i)=>{const u0=(i%cols)/cols,v1=1-Math.floor(i/cols)/rows,u1=u0+1/cols,v0=v1-1/rows;mb.add(TG.plane,MX(q.x,q.y,q.z,q.ry,2.2,.7,1),null,[u0,v0,u1,v1])});const g=mb.build();const m=new THREE.Mesh(g,mat);m.matrixAutoUpdate=false;scene.add(m);C.meshes.push(m)}
/* ---------- scattered vegetation ---------- */
function scatterChunk(get,ci,cj,C){const x0=ci*CHS,z0=cj*CHS;for(let a=0;a<20;a++)for(let c=0;c<20;c++){const h=hash2(ci*20+a,cj*20+c,3);const x=x0+a*12+(h%900)/100,z=z0+c*12+((h>>>10)%900)/100;const t=gType(x,z);const r=(h>>>20)%1000/1000;
    if(t===3){if(r<.2&&gType(x+3,z)===3&&gType(x-3,z)===3)addTree(get,x,z,1.1+r*2,h)}
    else if(t===8){if(r<.8)addTree(get,x,z,1.25+r*.6,h)}
    else if(t===9){const y=terrainH(x,z);if(r<.75){get('props').add(TG.box,MX(x,y+.7,z,r*.4,.9,1.4,.4),COL.tomb);if(r<.2)get('props').add(TG.box,MX(x,y+1.9,z,r*.4,.12,1,.12),COL.tomb)}else if(r<.8)get('props').add(TG.cone,MX(x,y+2,z,0,.6,4,.6),COL.tomb)}
    else if(t===4){const zn=zoneAt(x,z);if(zn.tags&&zn.tags.market&&r<.12)addStall(get,x,z,h);else if(r<.02)addTree(get,x,z,1,h)}}}

/* ---------- world map (vector, from OSM) ---------- */
let MAP_S=.12;
function drawOWMap(){const W=Math.ceil((OW.x1-OW.x0)*MAP_S),H=Math.ceil((OW.z1-OW.z0)*MAP_S);worldMap.width=W;worldMap.height=H;MAPOX=OW.x0;MAPOZ=OW.z0;const x=worldMap.getContext('2d');
  const T=(px,pz)=>[(px-OW.x0)*MAP_S,(pz-OW.z0)*MAP_S];const path=(r)=>{const n=r.length/2;for(let i=0;i<n;i++){const[a,b]=T(r[i*2],r[i*2+1]);if(i)x.lineTo(a,b);else x.moveTo(a,b)}x.closePath()};
  x.fillStyle='#1b1830';x.fillRect(0,0,W,H);
  x.fillStyle='#2a2640';x.beginPath();path(CITY.outline);x.fill();
  for(const p of PARKS){if(p.k!==8)continue;x.save();x.translate(...T(p.x,p.z));x.rotate(p.ry||0);x.fillStyle='#233a2c';x.fillRect(-p.W/2*MAP_S,-p.D/2*MAP_S,p.W*MAP_S,p.D*MAP_S);x.restore()}
  x.fillStyle='#2c4a36';for(const p of CITY.parks){x.beginPath();path(p.ring);for(const h of p.holes)path(h);x.fill('evenodd')}
  for(const p of PARKS){if(p.k===8)continue;x.save();x.translate(...T(p.x,p.z));x.rotate(p.ry||0);x.fillStyle=p.k===9?'#3a4a3e':'#2c4a36';x.fillRect(-p.W/2*MAP_S,-p.D/2*MAP_S,p.W*MAP_S,p.D*MAP_S);x.restore()}
  x.fillStyle='#3a3654';for(const q of CITY.plazas){x.beginPath();path(q.ring);x.fill()}
  x.fillStyle='#2b4f8e';for(const w of CITY.water){x.beginPath();path(w.ring);for(const h of w.holes)path(h);x.fill('evenodd')}
  for(const b of CITY.bld){if(b.gone)continue;x.fillStyle=b.sub?'#4a4460':'#6e6582';x.beginPath();path(b.ring);for(const h of b.holes)path(h);x.fill('evenodd')}
  x.lineCap='round';x.lineJoin='round';
  for(const pass of[0,1])for(const e of CITY.edges){const main=e.cls<=2;if((pass===1)!==main)continue;x.strokeStyle=e.br?'#d8c8a0':main?'#b8a67e':e.cls===7?'#57506c':'#4e4862';x.lineWidth=Math.max(.6,e.w*MAP_S*(main?1.1:.9));x.beginPath();const p=e.p;for(let k=0;k<p.length;k+=2){const[a,b]=T(p[k],p[k+1]);if(k)x.lineTo(a,b);else x.moveTo(a,b)}x.stroke()}
  for(const l of LANDMARKS){const[a,b]=T(l.x,l.z);x.fillStyle='#f2a541';x.beginPath();x.arc(a,b,3.5,0,TAU);x.fill()}}
