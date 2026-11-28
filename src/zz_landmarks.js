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
