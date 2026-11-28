/* ================= LANDMARKS: real Eiffel Tower (Grab3D, CC0) and Big Ben (Daqian Dong, CC-BY) replace the procedural ones ================= */
const LMK={em:[]};
function lmApply(){const k=MODE==='open'?(OW.lampK==null?1:OW.lampK):1;LMK.k=k;for(const e of LMK.em)e.m.emissiveIntensity=e.b*k}
function lmFit(root,H){root.updateMatrixWorld(true);const bb=new THREE.Box3().setFromObject(root),k=H/Math.max(.001,bb.max.y-bb.min.y);
  const w=new THREE.Group();root.scale.multiplyScalar(k);root.position.set(-(bb.min.x+bb.max.x)/2*k,-bb.min.y*k,-(bb.min.z+bb.max.z)/2*k);w.add(root);return w}
/* ---------- Eiffel ---------- */
function lmEiffel(g,S){const H=67*S;
  const old=g.children.filter(o=>o.isMesh),pts=g.children.find(o=>o.isPoints);
  asLoad('lm_eiffel').then(src=>{if(!src)return;const root=src.parent?src.clone(true):src;const w=lmFit(root,H);
    root.traverse(o=>{if(!o.isMesh)return;o.castShadow=true;o.receiveShadow=false;const m=o.material=o.material.clone();
      if(/iron|body/i.test(m.name)){m.color.setHex(/body/i.test(m.name)?0xb8844a:0x9a6634);m.metalness=.35;m.roughness=.55;m.emissive=new THREE.Color(0xffa23c);if(m.map)m.emissiveMap=m.map;LMK.em.push({m,b:/body/i.test(m.name)?.4:.36})}
      else{m.emissive=new THREE.Color(0xfff0d0);LMK.em.push({m,b:.25})}});
    lmApply();g.add(w);for(const o of old)o.visible=false;
    /* the twinkle now sits on the real lattice */
    if(pts){const sp=pts.geometry.attributes.position.array,n=sp.length/3,home=[],v=V3();w.updateMatrixWorld(true);const ms=[];root.traverse(o=>{if(o.isMesh)ms.push(o)});
      const inv=new THREE.Matrix4().copy(g.matrixWorld).invert();
      for(let i=0;i<n;i++){const o=ms[(Math.random()*ms.length)|0],P=o.geometry.attributes.position;v.fromBufferAttribute(P,(Math.random()*P.count)|0).applyMatrix4(o.matrixWorld).applyMatrix4(inv);home.push([v.x,v.y,v.z])}
      window.__sparkle=()=>{for(let i=0;i<n;i++){const on=Math.random()<.35;sp[i*3]=home[i][0];sp[i*3+1]=on?home[i][1]:-999;sp[i*3+2]=home[i][2]}pts.geometry.attributes.position.needsUpdate=true}}
  })}
{const _be=buildEiffelAt;buildEiffelAt=function(g,S=1){const r=_be.apply(this,arguments);lmEiffel(g,S);return r}}
if(MODE!=='open')for(const o of scene.children)if(o.isGroup&&o.position.x===EIFFEL.x&&o.position.z===EIFFEL.z&&o.children.some(c=>c.isPoints)){lmEiffel(o,1);break}
/* ---------- Big Ben ---------- */
function lmBigBen(G){const T=NZ.bbT,at=NZ.bb;if(!T||!at||T.userData.lm)return;T.userData.lm=1;
  asLoad('lm_bigben').then(src=>{if(!src)return;const root=src.parent?src.clone(true):src;const H=74,w=lmFit(root,H);w.position.set(at.x,0,at.z);
    root.traverse(o=>{if(!o.isMesh)return;o.castShadow=o.receiveShadow=true;const m=o.material=o.material.clone();m.color.setHex(0xa89a80);m.roughness=.8;m.metalness=0;m.emissive=new THREE.Color(0xffd890);if(m.map)m.emissiveMap=m.map;LMK.em.push({m,b:.2})});
    w.updateMatrixWorld(true);const bb=new THREE.Box3().setFromObject(w);const cy=H*.7,hw=Math.max(bb.max.x-at.x,at.x-bb.min.x);
    for(const[dx,dz]of[[0,1],[0,-1],[1,0],[-1,0]]){const gl=glowSprite(0xffe8b0,7,.55);gl.position.set(at.x+dx*(hw*.78+.4),cy,at.z+dz*(hw*.78+.4));G.add(gl)}
    lmApply();G.add(w);T.visible=false})}
{const _bb=nzBigBen;nzBigBen=function(G){const r=_bb.apply(this,arguments);lmBigBen(G);return r}}
if(typeof NZ!=='undefined'&&NZ.bbT&&NZ.bbT.parent)lmBigBen(NZ.bbT.parent);
/* night lighting follows the street lamps in the open world, always on in the story */
{const _mt=muTick;muTick=function(dt){_mt(dt);if(!LMK.em.length)return;const k=MODE==='open'?(OW.lampK==null?1:OW.lampK):1;if(LMK.k!==k)lmApply()}}
/* ---------- solid landmarks: Big Ben's collision and walkable tops follow the real model, not the old blocks ---------- */
function lmSolid(root,cx,cz,keepR){root.updateMatrixWorld(true);const v=V3();let top=0;const pts=[];
  root.traverse(o=>{if(!o.isMesh)return;const P=o.geometry.attributes.position;const st=Math.max(1,(P.count/4000)|0);for(let i=0;i<P.count;i+=st){v.fromBufferAttribute(P,i).applyMatrix4(o.matrixWorld);pts.push(v.x,v.y,v.z);if(v.y>top)top=v.y}});
  if(!pts.length)return;
  /* drop what the old blocks registered around this spot */
  for(let i=boxes.length-1;i>=0;i--){const b=boxes[i];const bx=(b.x0+b.x1)/2,bz=(b.z0+b.z1)/2;if(Math.abs(bx-cx)<keepR&&Math.abs(bz-cz)<keepR&&b.x1-b.x0<keepR*2.2)boxes.splice(i,1)}
  for(const [k,lots] of blockLots){const f=lots.filter(l=>!(Math.abs(l.x-cx)<keepR&&Math.abs(l.z-cz)<keepR&&l.W<keepR*1.1));if(f.length!==lots.length)blockLots.set(k,f)}
  /* bands: footprint half-extent per height slice; a box and a roof for each step of the silhouette, narrowest (highest) first */
  const N=10,bands=[];for(let b=0;b<N;b++)bands.push({y0:top*b/N,y1:top*(b+1)/N,hx:0,hz:0});
  for(let i=0;i<pts.length;i+=3){const b=Math.min(N-1,Math.max(0,(pts[i+1]/top*N)|0));const B=bands[b];B.hx=Math.max(B.hx,Math.abs(pts[i]-cx));B.hz=Math.max(B.hz,Math.abs(pts[i+2]-cz))}
  const steps=[];let cur=null;for(const B of bands){const hx=B.hx*.92,hz=B.hz*.92;if(hx<.3)continue;if(cur&&Math.abs(cur.hx-hx)<.9&&Math.abs(cur.hz-hz)<.9){cur.y1=B.y1;cur.hx=Math.max(cur.hx,hx);cur.hz=Math.max(cur.hz,hz)}else{cur={y1:B.y1,hx,hz};steps.push(cur)}}
  for(const s of steps){boxes.push({x0:cx-s.hx,x1:cx+s.hx,z0:cz-s.hz,z1:cz+s.hz,h:s.y1,nz:1,lm:1})}
  for(let i=steps.length-1;i>=0;i--){const s=steps[i];nzLot(cx-s.hx,cx+s.hx,cz-s.hz,cz+s.hz,s.y1-.45,0)}}
{const _lb=lmBigBen;lmBigBen=function(G){const T=NZ.bbT,at=NZ.bb;const r=_lb.apply(this,arguments);if(!T||!at)return r;let tries=0;
  const wait=()=>{const w=G.children.find(o=>o.isGroup&&o.children.some(c=>c.isGroup||c.isMesh)&&Math.abs(o.position.x-at.x)<.1&&Math.abs(o.position.z-at.z)<.1&&!o.userData.lmSolid);
    if(w){w.userData.lmSolid=1;try{lmSolid(w,at.x,at.z,9)}catch(x){console.warn(x)}return}if(++tries<60)setTimeout(wait,500)};wait();return r}}
if(typeof NZ!=='undefined'&&NZ.bbT&&NZ.bbT.parent){const G=NZ.bbT.parent,at=NZ.bb;let tries=0;const wait=()=>{const w=G.children.find(o=>o.isGroup&&Math.abs(o.position.x-at.x)<.1&&Math.abs(o.position.z-at.z)<.1&&!o.userData.lmSolid&&o!==NZ.bbT);if(w){w.userData.lmSolid=1;try{lmSolid(w,at.x,at.z,9)}catch(x){}return}if(++tries<60)setTimeout(wait,500)};wait()}
/* ---------- London roofs: the slabs, parapets and caps sitting on a building are solid too (you used to fly straight into them) ---------- */
function nzRoofSolid(){if(!NZ.g||NZ._roofs)return;NZ._roofs=1;NZ.g.updateMatrixWorld(true);const ab=[];const B=new THREE.Box3();
  NZ.g.traverse(o=>{if(!o.isMesh||o.isInstancedMesh||o.isSprite)return;const m=o.material;if(m&&(m.transparent||m.blending===THREE.AdditiveBlending))return;B.setFromObject(o);if(B.isEmpty())return;ab.push([B.min.x,B.max.x,B.min.y,B.max.y,B.min.z,B.max.z])});
  let n=0;for(const b of boxes){if(!b.nz||b.lm)continue;const A=(b.x1-b.x0)*(b.z1-b.z0);if(A<9)continue;let top=b.h;
    for(const a of ab){const cx=(a[0]+a[1])/2,cz=(a[4]+a[5])/2;if(cx<b.x0||cx>b.x1||cz<b.z0||cz>b.z1)continue;if(a[2]<b.h-1.2||a[2]>b.h+1||a[3]>b.h+14)continue;
      const ov=Math.max(0,Math.min(a[1],b.x1)-Math.max(a[0],b.x0))*Math.max(0,Math.min(a[5],b.z1)-Math.max(a[4],b.z0));if(ov<A*.45)continue;top=Math.max(top,a[3])}
    if(top>b.h+.4){const cx=(b.x0+b.x1)/2,cz=(b.z0+b.z1)/2;const l=lotAt(cx,cz);if(l&&l.roof==='flat'&&Math.abs(l.x0-b.x0)<.6&&Math.abs(l.z1-b.z1)<.6)l.h=top-(l.base||0)-.45;b.h=top;n++}}
  return n}
{const _nb=nzBuild;nzBuild=function(){const r=_nb.apply(this,arguments);try{setTimeout(nzRoofSolid,200)}catch(x){}return r}}
if(typeof NZ!=='undefined'&&NZ.g)try{nzRoofSolid()}catch(x){}
