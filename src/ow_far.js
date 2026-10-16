/* ---------- far city: coarse ground + skyline tiles ---------- */
const FAR={tiles:new Map(),mat:null,ground:null,T:4};
function farGround(){const st=48,nx=Math.ceil((OW.x1-OW.x0)/st),nz=Math.ceil((OW.z1-OW.z0)/st);const g=new THREE.PlaneGeometry(nx*st,nz*st,nx,nz);g.rotateX(-Math.PI/2);g.translate(OW.x0+nx*st/2,0,OW.z0+nz*st/2);
  const p=g.attributes.position,col=new Float32Array(p.count*3);for(let k=0;k<p.count;k++){const x=p.getX(k),z=p.getZ(k);const t=gType(x,z);p.setY(k,t===2?RIVERBED:terrainH(x,z)-.35);const c=t===3||t===8?[.2,.3,.2]:t===9?[.3,.33,.3]:t===2?[.1,.12,.15]:t===0?[.25,.24,.28]:[.42,.4,.42];col.set(c,k*3)}
  g.setAttribute('color',new THREE.BufferAttribute(col,3));g.computeVertexNormals();const fm=std({vertexColors:true,roughness:.95});fm.stencilWrite=true;fm.stencilRef=1;fm.stencilFunc=THREE.NotEqualStencilFunc;fm.stencilZPass=THREE.KeepStencilOp;const m=new THREE.Mesh(g,fm);m.receiveShadow=false;m.matrixAutoUpdate=false;scene.add(m);FAR.ground=m}
function farMat(){if(FAR.mat)return FAR.mat;const m=FACL[0].mats[0].clone();m.vertexColors=true;m.onBeforeCompile=sh=>{sh.uniforms.uHide={value:FAR.hide};m.userData.sh=sh;sh.vertexShader=sh.vertexShader.replace('#include <common>','#include <common>\nattribute float aCk;uniform float uHide[16];').replace('#include <begin_vertex>','#include <begin_vertex>\nif(uHide[int(aCk+.5)]>.5)transformed=vec3(0.,-1e4,0.);')};OW.windowMats.push(m);FAR.mat=m;return m}
FAR.hide=new Array(16).fill(0);
function farBuildTile(ti,tj){const key=ti*4096+tj;const T=FAR.T,cs=CHS;const x0=ti*T*cs,z0=tj*T*cs,x1=x0+T*cs,z1=z0+T*cs;const mb=new MB();const ck=[];const fl=FACL[0];const top=_rs.clone();const seen=new Set();
  cityQuery((x0+x1)/2,(z0+z1)/2,T*cs/2,'b',B=>{if(B.gone||seen.has(B))return;seen.add(B);if(B.cx<x0||B.cx>=x1||B.cz<z0||B.cz>=z1)return;const I=bldInfo(B);const lci=Math.floor(B.cx/cs)-ti*T,lcj=Math.floor(B.cz/cs)-tj*T;const cid=lcj*T+lci;const v0=mb.v;
    const rings=[B.ring];const r=B.ring,n=r.length/2;let acc=0;for(let i=0;i<n;i++){const j=(i+1)%n;const ax=r[i*2],az=r[i*2+1],bx=r[j*2],bz=r[j*2+1];const L=Math.hypot(bx-ax,bz-az);if(L<.5)continue;const nx=(bz-az)/L,nz=-(bx-ax)/L;const vh=(I.top-I.base)/fl.fh;
      face4(mb,[bx,I.base-2,bz],[ax,I.base-2,az],[ax,I.top,az],[bx,I.top,bz],[nx,0,nz],[acc/fl.fw,0,(acc+L)/fl.fw,0,(acc+L)/fl.fw,vh,acc/fl.fw,vh],I.tint);acc+=L}
    const tr=triangulate(ringArr(B.ring),[]);if(tr)triUp(mb,tr.idx,tr.verts,I.top+I.hm*.55,top.setRGB(.36,.38,.42),0);
    for(let k=v0;k<mb.v;k++)ck.push(cid)});
  const g=mb.build();if(!g){FAR.tiles.set(key,{empty:true});return}g.setAttribute('aCk',new THREE.Float32BufferAttribute(ck,1));
  const mat=farMat().clone();const hide=new Array(16).fill(0);mat.onBeforeCompile=sh=>{sh.uniforms.uHide={value:hide};sh.vertexShader=sh.vertexShader.replace('#include <common>','#include <common>\nattribute float aCk;uniform float uHide[16];').replace('#include <begin_vertex>','#include <begin_vertex>\nif(uHide[int(aCk+.5)]>.5)transformed=vec3(0.,-1e4,0.);')};mat.customProgramCacheKey=()=>'farTile';OW.windowMats.push(mat);
  const m=new THREE.Mesh(g,mat);m.matrixAutoUpdate=false;m.castShadow=false;m.receiveShadow=false;scene.add(m);const t={m,hide,ti,tj};FAR.tiles.set(key,t);
  for(let a=0;a<T;a++)for(let b=0;b<T;b++)if(OW.chunks.has((ti*T+a)*4096+tj*T+b))hide[b*T+a]=1}
function farShow(ci,cj,show){const T=FAR.T,ti=Math.floor(ci/T),tj=Math.floor(cj/T);const t=FAR.tiles.get(ti*4096+tj);if(!t||t.empty)return;const a=ci-ti*T,b=cj-tj*T;t.hide[b*T+a]=show?0:1}
function farStream(px,pz){if(!FAR.ground)farGround();const T=FAR.T,span=T*CHS,R=isTouch?2400:5200;const ti0=Math.floor((px-R)/span),ti1=Math.floor((px+R)/span),tj0=Math.floor((pz-R)/span),tj1=Math.floor((pz+R)/span);let built=0;
  const want=[];for(let i=ti0;i<=ti1;i++)for(let j=tj0;j<=tj1;j++){const cx=(i+.5)*span,cz=(j+.5)*span;const d=Math.hypot(cx-px,cz-pz);if(d>R)continue;if(!FAR.tiles.has(i*4096+j))want.push([d,i,j])}
  want.sort((a,b)=>a[0]-b[0]);for(const w of want){if(built>=1)break;farBuildTile(w[1],w[2]);built++}
  for(const [k,t] of FAR.tiles){if(t.empty)continue;const cx=(t.ti+.5)*span,cz=(t.tj+.5)*span;if(Math.hypot(cx-px,cz-pz)>R*1.25){const mi=OW.windowMats.indexOf(t.m.material);if(mi>=0)OW.windowMats.splice(mi,1);scene.remove(t.m);t.m.geometry.dispose();t.m.material.dispose();FAR.tiles.delete(k)}}}
