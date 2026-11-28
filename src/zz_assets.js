/* ---------- asset pack: Polyhaven PBR detail (triplanar, world space) + Quaternius / Polyhaven models ---------- */
const PHA={tex:{},avg:{aerial_grass_rock:[.447,.38,.141],brick_wall_04:[.431,.349,.263],castle_brick_02_red:[.506,.38,.286],cobblestone_floor_04:[.541,.49,.384],cobblestone_square:[.51,.475,.404],forest_leaves_02:[.557,.439,.227],grass_path_2:[.553,.506,.388],grey_roof_tiles:[.38,.361,.294],herringbone_pavement:[.353,.306,.251],patterned_paving:[.345,.325,.302],plastered_wall_02:[.733,.694,.639],thatch_roof_angled:[.329,.314,.286]},
  /* per texture: metres per tile, colour strength, how much of its own colour to keep, normal strength, mask dark parts (windows) */
  cfg:{plastered_wall_02:{m:3.2,s:.85,c:.25,n:.55,mask:1},castle_brick_02_red:{m:2.4,s:.75,c:.9,n:.7},brick_wall_04:{m:2.2,s:.8,c:.9,n:.7,mask:1},grey_roof_tiles:{m:2.6,s:.85,c:.2,n:.8},thatch_roof_angled:{m:2.4,s:.95,c:.5,n:.9},
    cobblestone_floor_04:{m:2.6,s:.9,c:.25,n:.9},cobblestone_square:{m:2.8,s:.85,c:.2,n:.8},herringbone_pavement:{m:1.8,s:.8,c:.2,n:.6},patterned_paving:{m:3,s:.8,c:.2,n:.6},
    aerial_grass_rock:{m:6,s:.75,c:.3,n:.5,far:140},grass_path_2:{m:4,s:.7,c:.3,n:.5,far:140},forest_leaves_02:{m:1.4,s:.95,c:.25,n:1,far:120}},
  scanT:0,n:0};
/* all new assets ship in one bundle (assets/pack.wasm): [u32 header length][json index][bytes] */
const PACK={p:null};function packGet(){if(PACK.p)return PACK.p;PACK.p=fetch('assets/pack.wasm').then(r=>r.ok?r.arrayBuffer():null).then(b=>{if(!b)return null;const hl=new DataView(b).getUint32(0,true);
  const idx=JSON.parse(new TextDecoder().decode(new Uint8Array(b,4,hl)));return{b,o:4+hl,idx}}).catch(e=>{console.warn('pack',e);return null});return PACK.p}
function packSlice(P,k){const e=P&&P.idx[k];return e?P.b.slice(P.o+e[0],P.o+e[0]+e[1]):null}
function packTex(k,c){const cv=document.createElement('canvas');cv.width=cv.height=2;const x=cv.getContext('2d');x.fillStyle=c;x.fillRect(0,0,2,2);const t=new THREE.Texture(cv);t.needsUpdate=true;t.wrapS=t.wrapT=THREE.RepeatWrapping;t.anisotropy=8;
  packGet().then(P=>{const b=packSlice(P,k);if(!b)return;const u=URL.createObjectURL(new Blob([b],{type:'image/jpeg'}));const im=new Image();im.onload=()=>{t.image=im;t.needsUpdate=true;URL.revokeObjectURL(u)};im.src=u});return t}
function phTex(n){if(PHA.tex[n])return PHA.tex[n];const a=PHA.avg[n]||[.5,.5,.5];return PHA.tex[n]={d:packTex('t:'+n+'_d','rgb('+a.map(v=>Math.round(v*255)).join(',')+')'),n:packTex('t:'+n+'_n','rgb(128,128,255)')}}
/* inject world-space triplanar detail into a standard material: works on boxes, instanced meshes, anything, no UVs needed */
function phDetail(mat,name,o){if(!mat||mat._ph||!mat.isMeshStandardMaterial)return mat;mat._ph=name;const C=Object.assign({},PHA.cfg[name]||{m:3,s:.8,c:.3,n:.6},o||{});const T=phTex(name);
  const a=PHA.avg[name]||[.5,.5,.5],al=Math.pow(a[0]*.3+a[1]*.59+a[2]*.11,2.2);
  const U={phD:{value:T.d},phN:{value:T.n},phP:{value:new THREE.Vector4(1/C.m,C.s,C.c,C.n)},phQ:{value:new THREE.Vector4(1/Math.max(.02,al),C.mask?1:0,C.far||220,0)}};
  const prev=mat.onBeforeCompile,pk=mat.customProgramCacheKey;
  mat.onBeforeCompile=function(sh,r){if(prev)prev.call(this,sh,r);Object.assign(sh.uniforms,U);
    sh.vertexShader=sh.vertexShader.replace('#include <common>','#include <common>\nvarying vec3 vPhW;varying vec3 vPhN;')
      .replace('#include <project_vertex>','#include <project_vertex>\n{vec4 pw=vec4(transformed,1.);vec3 pn=objectNormal;\n#ifdef USE_INSTANCING\npw=instanceMatrix*pw;pn=mat3(instanceMatrix)*pn;\n#endif\nvPhW=(modelMatrix*pw).xyz;vPhN=normalize(mat3(modelMatrix)*pn);}');
    sh.fragmentShader=sh.fragmentShader.replace('#include <common>','#include <common>\nvarying vec3 vPhW;varying vec3 vPhN;uniform sampler2D phD;uniform sampler2D phN;uniform vec4 phP;uniform vec4 phQ;vec3 phB;float phF;')
      .replace('#include <map_fragment>','#include <map_fragment>\n{vec3 nn=normalize(vPhN);phB=pow(abs(nn),vec3(6.));phB/=phB.x+phB.y+phB.z;phF=phP.y*clamp(1.-(length(vPhW-cameraPosition)-phQ.z*.6)/(phQ.z*.4),0.,1.);\n'+
        'vec3 w=vPhW*phP.x;vec3 c=texture2D(phD,w.zy).rgb*phB.x+texture2D(phD,w.xz).rgb*phB.y+texture2D(phD,w.xy).rgb*phB.z;c=pow(c,vec3(2.2));float cl=dot(c,vec3(.3,.59,.11));\n'+
        'vec3 dt=mix(vec3(cl),c,phP.z)*phQ.x;float m=phQ.y>.5?smoothstep(.06,.22,dot(diffuseColor.rgb,vec3(.3,.59,.11))):1.;phF*=m;diffuseColor.rgb*=mix(vec3(1.),dt,phF);}')
      .replace('#include <normal_fragment_maps>','#include <normal_fragment_maps>\n{vec3 w=vPhW*phP.x;vec3 nn=normalize(vPhN);vec3 tx=texture2D(phN,w.zy).xyz*2.-1.,ty=texture2D(phN,w.xz).xyz*2.-1.,tz=texture2D(phN,w.xy).xyz*2.-1.;\n'+
        'vec3 pw=vec3(0.,tx.y,tx.x*sign(nn.x))*phB.x+vec3(ty.x,0.,ty.y)*phB.y+vec3(tz.x*sign(nn.z),tz.y,0.)*phB.z;\n'+
        'normal=normalize(normal+(viewMatrix*vec4(pw,0.)).xyz*phP.w*phF/max(phP.y,.01));}')};
  mat.customProgramCacheKey=function(){return 'ph|'+(prev?prev.toString():'')+'|'+(pk?pk.call(this):'')};mat.needsUpdate=true;PHA.n++;return mat}
/* materials are tagged where they are made (userData.ph = texture name); a light scan picks up new ones as zones get built */
function phScan(root){(root||scene).traverse(o=>{if(!o.isMesh)return;const ms=Array.isArray(o.material)?o.material:[o.material];for(const m of ms)if(m&&m.userData&&m.userData.ph&&!m._ph)phDetail(m,m.userData.ph,m.userData.phO)})}
function phTag(m,name,o){if(m){m.userData.ph=name;if(o)m.userData.phO=o}return m}
setInterval(()=>{try{phScan()}catch(x){console.warn('phScan',x)}},1200);

/* ---------- models: loaded once, placed as instanced meshes (one InstancedMesh per sub-mesh) ---------- */
const ASM={buf:{},sc:{}};
function asLoad(n){if(ASM.sc[n])return ASM.sc[n];ASM.sc[n]=packGet().then(P=>packSlice(P,'m:'+n)).then(b=>b&&new Promise(res=>{const L=new THREE.GLTFLoader();if(window.MeshoptDecoder)L.setMeshoptDecoder(MeshoptDecoder);L.parse(b,'',g=>res(g.scene),e=>{console.warn('asLoad',n,e);res(null)})})).catch(e=>{console.warn('asLoad',n,e);return null});return ASM.sc[n]}
/* items: [{x,y,z,ry,s}] ; o.h = target height (metres), o.base = sit on ground ; returns the group */
function asPlace(n,items,parent,o){o=o||{};const G=new THREE.Group();G.name='as_'+n;(parent||scene).add(G);if(!items.length)return G;
  asLoad(n).then(root=>{if(!root)return;root.updateMatrixWorld(true);const bb=new THREE.Box3().setFromObject(root),sz=bb.getSize(V3());const k=o.h?o.h/Math.max(.001,sz.y):(o.k||1);
    const base=new THREE.Matrix4().makeTranslation(-(bb.min.x+bb.max.x)/2,-bb.min.y,-(bb.min.z+bb.max.z)/2);const M=new THREE.Matrix4(),q=new THREE.Quaternion(),Y=V3(0,1,0),S=V3(),T=V3();
    root.traverse(m=>{if(!m.isMesh)return;const mats=Array.isArray(m.material)?m.material:[m.material];for(const mt of mats){if(o.tint&&mt.color)mt.color.multiply(new THREE.Color(o.tint));if(o.rough!=null)mt.roughness=o.rough;if(mt.map)mt.map.anisotropy=4;mt.envMapIntensity=o.env!=null?o.env:.5;if(o.ph)phDetail(mt,o.ph,o.phO)}
      const im=new THREE.InstancedMesh(m.geometry,m.material,items.length);const local=new THREE.Matrix4().multiplyMatrices(base,m.matrixWorld);
      items.forEach((it,i)=>{const s=k*(it.s||1);q.setFromAxisAngle(Y,it.ry||0);M.compose(T.set(it.x,it.y,it.z),q,S.set(s,s*(it.sy||1),s));M.multiply(local);im.setMatrixAt(i,M)});
      im.instanceMatrix.needsUpdate=true;im.castShadow=o.shadow!==false;im.receiveShadow=true;im.frustumCulled=false;G.add(im)});
    if(o.done)o.done(G,k*sz.y)}).catch(e=>console.warn('asPlace',n,e&&e.message));return G}

/* ---------- Paris: Victorian street lamps replace the plain posts ---------- */
function asLampSwap(){scene.traverse(m=>{if(!m.isInstancedMesh||m.userData.asSw)return;const p=m.geometry&&m.geometry.parameters;if(!p||m.geometry.type!=='CylinderGeometry'||Math.abs(p.radiusTop-.07)>.001||Math.abs(p.height-4.4)>.01)return;m.userData.asSw=1;
  const par=m.parent;const cone=par.children.find(c=>c.isInstancedMesh&&c.geometry.type==='ConeGeometry'&&c.geometry.parameters&&Math.abs(c.geometry.parameters.radius-.42)<.01&&c.count===m.count);
  const it=[],M=new THREE.Matrix4(),p3=V3();for(let i=0;i<m.count;i++){m.getMatrixAt(i,M);p3.setFromMatrixPosition(M);it.push({x:p3.x,y:p3.y-2.2,z:p3.z,ry:Math.atan2(p3.x,p3.z)})}
  asPlace('q_modularstreets_Streetlight_Single',it,par,{h:5.05,tint:0x6a7a70,rough:.45,env:.8,done:()=>{m.visible=false;if(cone)cone.visible=false}})})}

/* ---------- the English countryside: farms, village greens, lanes, stones ---------- */
{const _cm=nzCountryMore;nzCountryMore=function(G,o){_cm.apply(this,arguments);try{asCountry(G,o)}catch(x){console.warn('asCountry',x)}}}
function asCountry(G,o){const{HK,inH,nearRiver,nearRoad,inTown,Z0,Z1}=o;const Y=(x,z)=>nzLand(x,z)-.08;const free=(x,z,r)=>!inH(x,z,r)&&!nearRoad(x,z,r+3)&&!nearRiver(x,z,r+4)&&!lotAt(x,z);
  const solid=(x,z,w,d,h)=>{boxes.push({x0:x-w/2,x1:x+w/2,z0:z-d/2,z1:z+d/2,h:Y(x,z)+h,nz:1});nzLot(x-w/2,x+w/2,z-d/2,z+d/2,h,Y(x,z),'flat');NZ.mapR.push([x-w/2,z-d/2,w,d])};
  /* barns beside farmhouses */
  {const B={q_farmbuildings_Barn:[],q_farmbuildings_SmallBarn:[],q_farmbuildings_OpenBarn:[]},K=Object.keys(B);let n=0;
    for(const h of HK){if(n>=16||Math.random()<.55)continue;for(const sx of[1,-1]){const x=h.x+sx*(h.w/2+8.5),z=h.z+rand(-2,2);if(!free(x,z,5)||inTown(x,z,-20))continue;const k=K[n%3];B[k].push({x,y:Y(x,z),z,ry:(sx>0?-1:1)*Math.PI/2+rand(-.15,.15)});solid(x,z,8,8,6);n++;break}}
    for(const k of K)asPlace(k,B[k],G,{h:k==='q_farmbuildings_SmallBarn'?5.6:6.8,tint:0x8a6a62,rough:.85,env:.3})}
  /* village greens: market stalls, a well, carts and hay */
  {const S1=[],S2=[],W=[],C=[],H=[],BN=[];for(const T of NZTOWNS){if(!T.f)continue;
      for(let k=0;k<26;k++){const z=T.z+rand(-T.r*.45,T.r*.45),rx=nzRoadX(z),s=Math.random()<.5?-1:1,x=rx+s*rand(7.5,12);if(inH(x,z,2.5)||nearRiver(x,z,3)||lotAt(x,z))continue;
        const ry=Math.atan2(rx-x,0)+rand(-.2,.2),it={x,y:Y(x,z),z,ry};const L=[S1,S2,C,H,H,BN][(Math.random()*6)|0];if(L.length>=(L===H?18:8))continue;L.push(it);if(L===S1||L===S2)solid(x,z,2.4,2.8,2.4)}
      for(let k=0;k<12;k++){const z=T.z+rand(-20,20),x=nzRoadX(z)+(Math.random()<.5?-1:1)*rand(9,16);if(inH(x,z,3)||nearRiver(x,z,4)||lotAt(x,z))continue;W.push({x,y:Y(x,z),z,ry:rand(0,TAU)});solid(x,z,2,2,2.2);break}}
    asPlace('q_medievalvillage_MarketStand_1',S1,G,{h:2.7,env:.3});asPlace('q_medievalvillage_MarketStand_2',S2,G,{h:2.7,env:.3});asPlace('q_medievalvillage_Well',W,G,{h:2.5,env:.3});
    asPlace('q_medievalvillage_Cart',C,G,{h:1.5,env:.3});asPlace('q_medievalvillage_Hay',H,G,{h:1,env:.2});asPlace('ph_painted_wooden_bench',BN,G,{h:.95,env:.3})}
  /* wooden fences along the lane between villages */
  {const F=[];for(let z=Z0-40;z>LON_Z+30;z-=5.6){if(Math.random()<.35)continue;const rx=nzRoadX(z),d=(nzRoadX(z-1)-nzRoadX(z+1))/2;const ry=Math.atan2(1,d);
      for(const s of[-1,1]){const x=rx+s*6.4;if(inTown(x,z,-6)||inH(x,z,1.5)||nearRiver(x,z,3))continue;F.push({x,y:Y(x,z),z,ry})}}
    asPlace('q_farmbuildings_Fence',F,G,{h:1.05,tint:0x8a6a50,env:.2,k:1})}
  /* field stones and old stumps */
  {const R=[],S=[];for(let k=0;k<500&&(R.length<70||S.length<18);k++){const x=rand(-250,250),z=rand(Z1+30,Z0-30);if(inH(x,z,3)||nearRoad(x,z,5)||nearRiver(x,z,6))continue;
      if(R.length<70)R.push({x,y:Y(x,z)-.15,z,ry:rand(0,TAU),s:rand(.6,1.6)});else S.push({x,y:Y(x,z)-.05,z,ry:rand(0,TAU),s:rand(.8,1.2)})}
    asPlace('ph_rock_07',R,G,{h:.9,env:.2});asPlace('ph_tree_stump_01',S,G,{h:.6,env:.2})}}
setInterval(()=>{if(MODE!=='open')try{asLampSwap()}catch(x){console.warn('lampSwap',x)}},2000);
/* open world: roofs, terracotta, leaves get the same treatment once its materials exist */
setInterval(()=>{if(MODE!=='open'||typeof CM==='undefined'||CM._ph)return;if(!CM.zinc||!CM.leaf)return;CM._ph=1;
  for(const k of['zinc','zincD'])if(CM[k])phTag(CM[k],'grey_roof_tiles',{c:.05});for(const k of['tile','tileD'])if(CM[k])phTag(CM[k],'grey_roof_tiles',{c:.05,s:.7});phTag(CM.leaf,'forest_leaves_02',{c:.15,s:.7})},2500);
/* credits line under the main menu */
setInterval(()=>{const mm=document.getElementById('mm');if(!mm||document.getElementById('asCred'))return;const d=document.createElement('div');d.id='asCred';
  d.style.cssText='margin:14px 4px 2px;font:500 10.5px/1.5 Outfit,system-ui,sans-serif;letter-spacing:.04em;color:rgba(243,215,154,.55);text-align:center';
  d.textContent='Art assets: Poly Haven, Quaternius, Grab3D (CC0). BigBen by Daqian Dong (CC-BY 3.0, via Poly Pizza).';mm.appendChild(d)},1500);
