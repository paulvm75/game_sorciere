/* ================= PARIS v2: real water and a varied, seasonal tree canopy ================= */
/* ---------- water: analytic waves + ripples, fresnel sky, moon glint, city light streaks; keeps the scene's fog and tone mapping ---------- */
const WTR={mats:new Set(),U:{uWT:{value:0},uSkyH:{value:new THREE.Color(0x1a2040)},uSkyZ:{value:new THREE.Color(0x060a18)},uSunD:{value:new THREE.Vector3(.3,.8,.2)},uSunC:{value:new THREE.Color(0xb0c4ff)},
  uDeep:{value:new THREE.Color(0x041019)},uWarm:{value:new THREE.Color(1,.62,.3)},uNight:{value:1}},scanT:0};
WTR.GLSL=`varying vec3 vWW;uniform float uWT;uniform vec3 uSkyH;uniform vec3 uSkyZ;uniform vec3 uSunD;uniform vec3 uSunC;uniform vec3 uDeep;uniform vec3 uWarm;uniform float uNight;
float wh(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
float wn(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(wh(i),wh(i+vec2(1,0)),f.x),mix(wh(i+vec2(0,1)),wh(i+vec2(1,1)),f.x),f.y);}`;
WTR.FRAG=`{vec3 P=vWW;float t=uWT;vec2 g=vec2(0.);
#define WV(dx,dy,f,a,s) {vec2 d=normalize(vec2(dx,dy));float ph=dot(d,P.xz)*f+t*s;g+=d*cos(ph)*a*f;}
WV(1.,.3,.45,.06,1.)WV(-.4,1.,.8,.035,1.5)WV(.7,-.8,1.6,.016,2.2)WV(-1.,-.25,2.9,.008,3.)
float e=.12;vec2 q=P.xz*.6+vec2(t*.12,t*.08);float n0=wn(q);g+=vec2(wn(q+vec2(e,0.))-n0,wn(q+vec2(0.,e))-n0)/e*.1;
q=P.xz*2.1-vec2(t*.26,-t*.18);n0=wn(q);g+=vec2(wn(q+vec2(e,0.))-n0,wn(q+vec2(0.,e))-n0)/e*.04;
vec3 N=normalize(vec3(-g.x,1.,-g.y));vec3 V=normalize(cameraPosition-P);float NV=max(dot(N,V),0.);
float fr=.02+.98*pow(1.-NV,5.);vec3 R=reflect(-V,N);float up=clamp(R.y,0.,1.);
vec3 sky=mix(uSkyH,uSkyZ,pow(up,.55));sky=mix(uDeep*1.6+uWarm*.02,sky,smoothstep(.03,.32,up));vec3 L=normalize(uSunD);float rl=max(dot(R,L),0.);
vec3 spec=uSunC*(pow(rl,220.)*5.+pow(rl,24.)*.22);
vec2 vd=normalize(V.xz+vec2(1e-4));vec2 pr=vec2(dot(P.xz,vec2(-vd.y,vd.x)),dot(P.xz,vd));float st=wn(vec2(pr.x*.42+g.x*4.,pr.y*.035))*wn(vec2(pr.x*1.5+g.y*6.,pr.y*.11+t*.08));float lights=smoothstep(.36,.68,st)*uNight;
float sp=pow(max(wn(P.xz*5.5+vec2(t*.7,-t*.5))-.72,0.)*3.6,3.)*uNight;
vec3 deep=uDeep*(.7+.5*max(dot(N,L),0.));
vec3 wc=mix(deep,sky,fr)+spec+uWarm*lights*(.55+fr*1.2)+vec3(1.,.9,.8)*sp*.35;
gl_FragColor=vec4(wc,diffuseColor.a);}`;
function wtrPatch(m){if(!m||WTR.mats.has(m))return;WTR.mats.add(m);const prev=m.onBeforeCompile!==THREE.Material.prototype.onBeforeCompile?m.onBeforeCompile:null;
  m.onBeforeCompile=(sh,r)=>{if(prev)try{prev.call(m,sh,r)}catch(x){}Object.assign(sh.uniforms,WTR.U);
    sh.vertexShader=sh.vertexShader.replace('#include <common>','#include <common>\nvarying vec3 vWW;').replace('#include <begin_vertex>','#include <begin_vertex>\nvWW=(modelMatrix*vec4(position,1.)).xyz;');
    sh.fragmentShader=sh.fragmentShader.replace('#include <common>','#include <common>\n'+WTR.GLSL).replace('#include <tonemapping_fragment>',WTR.FRAG+'\n#include <tonemapping_fragment>')};
  const pk=m.customProgramCacheKey?m.customProgramCacheKey.bind(m):null;m.customProgramCacheKey=()=>'wtr2'+(pk?pk():'');m.needsUpdate=true}
function wtrIsWater(m){if(!m||!m.isMeshStandardMaterial)return false;if((typeof OW!=='undefined'&&(m===OW.waterMat||m===OW.basinMat))||(typeof C2M!=='undefined'&&m===C2M.water))return true;
  const nm=m.normalMap;if(nm&&typeof waterN!=='undefined'&&waterN&&nm.image&&nm.image===waterN.image&&(m.metalness>=.5||m.transparent))return true;
  if(m.map&&typeof waterTex!=='undefined'&&m.map===waterTex)return true;return false}
function wtrScan(){scene.traverse(o=>{if(o.isMesh&&!o.isInstancedMesh){const m=o.material;if(!Array.isArray(m)&&wtrIsWater(m))wtrPatch(m)}})}
{const _c=new THREE.Color();const _mt=muTick;muTick=function(dt){_mt(dt);try{WTR.scanT-=dt;if(WTR.scanT<=0){WTR.scanT=2;wtrScan()}if(!WTR.mats.size)return;const U=WTR.U;U.uWT.value+=dt;
  const fc=scene.fog?scene.fog.color:(scene.background&&scene.background.isColor?scene.background:_c.setHex(0x1a2040));U.uSkyH.value.copy(fc);U.uSkyZ.value.copy(fc).multiplyScalar(.38).lerp(_c.setHex(0x0a1430),.25);
  if(typeof moonLight!=='undefined'&&moonLight){U.uSunD.value.copy(moonLight.position).sub(moonLight.target?moonLight.target.position:V3()).normalize();U.uSunC.value.copy(moonLight.color).multiplyScalar(Math.min(1.4,moonLight.intensity*.9+.25))}
  const lk=MODE==='open'?(OW.lampK==null?1:OW.lampK):1;U.uNight.value=lk;U.uDeep.value.setRGB(.012,.045,.07).lerp(fc,.18)}catch(x){}}}
try{const rw=scene.getObjectByName('riverWater');if(rw&&rw.material.isMeshStandardMaterial)wtrPatch(rw.material)}catch(x){}

/* ---------- trees: Quaternius trees and bushes join the plane trees, some turned for autumn ---------- */
const PTR={types:[['q_tree1',6],['q_tree3',6.4],['q_tree1',5.2],['q_tree3',5.6]],leaf:[0x2c5428,0x36602a,0x22442a,0x7a5e1c,0x8a4e1a,0x6a3418,0x3e5e2a],done:new Set()};
function ptrHash(x,z){const s=Math.sin(x*12.9898+z*78.233)*43758.5453;return s-Math.floor(s)}
function ptrPlant(items,parent){if(!items.length)return;const by=PTR.types.map(()=>[]);for(const it of items)by[Math.floor(ptrHash(it[0],it[1])*by.length)%by.length].push(it);
  PTR.types.forEach(([key,H],ti)=>{const list=by[ti];if(!list.length)return;asLoad(key).then(root=>{if(!root)return;root.updateMatrixWorld(true);const bb=new THREE.Box3().setFromObject(root),sz=bb.getSize(V3());const k=H/Math.max(.001,sz.y);
    const base=new THREE.Matrix4().makeTranslation(-(bb.min.x+bb.max.x)/2,-bb.min.y,-(bb.min.z+bb.max.z)/2);const M=new THREE.Matrix4(),q=new THREE.Quaternion(),Y=V3(0,1,0),S=V3(),T=V3(),C=new THREE.Color();
    root.traverse(m=>{if(!m.isMesh)return;const leaf=/leaf|leaves/i.test(m.material.name||'');const mt=m.material.clone();mt.roughness=leaf?.85:.95;mt.metalness=0;mt.envMapIntensity=.4;
      if(leaf){mt.color.setRGB(1,1,1);mt.emissive=new THREE.Color(0x040804);mt.flatShading=false}else mt.color.multiplyScalar(.75);
      const im=new THREE.InstancedMesh(m.geometry,mt,list.length);const local=new THREE.Matrix4().multiplyMatrices(base,m.matrixWorld);
      list.forEach((it,i)=>{const h=ptrHash(it[1],it[0]);const s=k*(it[2]||1)*(.85+h*.3);q.setFromAxisAngle(Y,h*TAU);M.compose(T.set(it[0],typeof groundAt==='function'&&MODE==='open'?groundAt(it[0],it[1]):0,it[1]),q,S.set(s,s,s));M.multiply(local);im.setMatrixAt(i,M);
        if(leaf){C.setHex(PTR.leaf[Math.floor(ptrHash(it[0]*3.1,it[1]*1.7)*PTR.leaf.length)%PTR.leaf.length]);C.multiplyScalar(.7+h*.3);im.setColorAt(i,C)}});
      if(im.instanceColor)im.instanceColor.needsUpdate=true;im.instanceMatrix.needsUpdate=true;im.castShadow=true;im.receiveShadow=true;im.frustumCulled=false;(parent||scene).add(im)})})})}
/* find the blob trees built from a tree list and hand ~60% of them to the new models; bushes fill the park edges */
function ptrSwap(list,parent){if(!list||!list.length||PTR.done.has(list))return;PTR.done.add(list);const P0=parent||scene;const keep=[],swap=[];
  list.forEach((t,i)=>{(ptrHash(t[0]*.7,t[1]*1.3)<.62?swap:keep).push(i)});const ims=[];for(const o of P0.children){if(o.isInstancedMesh&&o.count===list.length&&o.geometry&&/^(Cylinder|Icosahedron)(Buffer)?Geometry$/.test(o.geometry.type))ims.push(o)}
  if(!ims.length)return;const Z=new THREE.Matrix4().makeScale(0,0,0);for(const im of ims){for(const i of swap)im.setMatrixAt(i,Z);im.instanceMatrix.needsUpdate=true}
  ptrPlant(swap.map(i=>list[i]),parent);
  const bushes=[];for(const i of swap){const t=list[i];if(ptrHash(t[0]*5.1,t[1]*2.3)<.45){const a=ptrHash(t[1],t[0])*TAU;bushes.push([t[0]+Math.cos(a)*1.6,t[1]+Math.sin(a)*1.6,.9+ptrHash(t[0],t[0])*.5])}}
  for(const [key,H] of [['q_bush1',1.1],['q_bush2',.8]]){const L=bushes.filter((b,i)=>(i%2===0)===(key==='q_bush1'));if(!L.length)continue;
    asLoad(key).then(root=>{if(!root)return;root.updateMatrixWorld(true);const bb=new THREE.Box3().setFromObject(root),sz=bb.getSize(V3());const k=H/Math.max(.001,sz.y);const base=new THREE.Matrix4().makeTranslation(-(bb.min.x+bb.max.x)/2,-bb.min.y,-(bb.min.z+bb.max.z)/2);const M=new THREE.Matrix4(),q=new THREE.Quaternion(),C=new THREE.Color();
      root.traverse(m=>{if(!m.isMesh)return;const leaf=/leaf|leaves/i.test(m.material.name||'');const mt=m.material.clone();mt.roughness=.9;mt.metalness=0;if(leaf)mt.color.setRGB(1,1,1);const im=new THREE.InstancedMesh(m.geometry,mt,L.length);const local=new THREE.Matrix4().multiplyMatrices(base,m.matrixWorld);
        L.forEach((b,i)=>{const s=k*b[2];q.setFromAxisAngle(V3(0,1,0),ptrHash(b[0],b[1])*TAU);M.compose(V3(b[0],0,b[1]),q,V3(s,s,s));M.multiply(local);im.setMatrixAt(i,M);if(leaf){C.setHex(PTR.leaf[i%3]).multiplyScalar(.8);im.setColorAt(i,C)}});
        if(im.instanceColor)im.instanceColor.needsUpdate=true;im.instanceMatrix.needsUpdate=true;im.receiveShadow=true;im.frustumCulled=false;(parent||scene).add(im)})})}}
if(MODE!=='open')try{const tr=scene.children.find(o=>o.isInstancedMesh&&o.geometry&&o.geometry.parameters&&o.geometry.parameters.radiusTop===.18&&o.geometry.parameters.height===2.8);if(tr)ptrSwap(treeList.slice(0,tr.count),scene)}catch(x){console.warn(x)}
/* the chapter-two Paris blocks plant their own trees later */
{const _ct=c2trees;c2trees=function(P0,list){const r=_ct.apply(this,arguments);try{if(MODE!=='open')ptrSwap(list,P0)}catch(x){}return r}}

/* ---------- the story's own water shader (Seine, Thames, the sea) gets the same treatment: dark bank reflections, light streaks, glints ---------- */
const NZW2_FS='uniform float uT,uS,uC,uNight;uniform vec3 uDeep,uMid,uSky,uL,uLC,uWarm;varying vec3 vW;\n#include <fog_pars_fragment>\n'+
  'float hh(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}float nn(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(hh(i),hh(i+vec2(1,0)),f.x),mix(hh(i+vec2(0,1)),hh(i+vec2(1,1)),f.x),f.y);}'+
  'void main(){vec3 P=vW;float t=uT;vec2 p=P.xz*uS;vec2 g=vec2(0.);'+
  'vec2 d1=normalize(vec2(1.,.3));g+=d1*cos(dot(d1,p)*.45+t*1.)*.027;vec2 d2=normalize(vec2(-.4,1.));g+=d2*cos(dot(d2,p)*.8+t*1.5)*.028;vec2 d3=normalize(vec2(.7,-.8));g+=d3*cos(dot(d3,p)*1.6+t*2.2)*.026;vec2 d4=normalize(vec2(-1.,-.25));g+=d4*cos(dot(d4,p)*2.9+t*3.)*.023;'+
  'float e=.12;vec2 q=p*.6+vec2(t*.12,t*.08);float n0=nn(q);g+=vec2(nn(q+vec2(e,0.))-n0,nn(q+vec2(0.,e))-n0)/e*.1;q=p*2.1-vec2(t*.26,-t*.18);n0=nn(q);g+=vec2(nn(q+vec2(e,0.))-n0,nn(q+vec2(0.,e))-n0)/e*.04;'+
  'vec3 N=normalize(vec3(-g.x,1.,-g.y));vec3 V=normalize(cameraPosition-P);float fr=.02+.98*pow(1.-max(dot(N,V),0.),5.);vec3 R=reflect(-V,N);float up=clamp(R.y,0.,1.);'+
  'vec3 sky=mix(uSky*1.15,uSky*.35,pow(up,.55));sky=mix(uDeep*1.5+uWarm*.025,sky,smoothstep(.03,.3,up));'+
  'float h0=nn(p*.35+vec2(t*.12,t*.07));vec3 deep=mix(uDeep,uMid,h0*.5+.1)*(.75+.45*max(dot(N,normalize(uL)),0.));'+
  'vec3 L=normalize(uL);float s=max(dot(R,L),0.);vec3 spec=uLC*(pow(s,220.)*4.+pow(s,22.)*.18);'+
  'vec2 vd=normalize(V.xz+vec2(1e-4));vec2 pr=vec2(dot(P.xz,vec2(-vd.y,vd.x)),dot(P.xz,vd));float st=nn(vec2(pr.x*.42+g.x*4.,pr.y*.035))*nn(vec2(pr.x*1.5+g.y*6.,pr.y*.11+t*.08));float li=smoothstep(.36,.68,st)*uNight;'+
  'float sp=pow(max(nn(P.xz*5.5+vec2(t*.7,-t*.5))-.72,0.)*3.6,3.)*uNight;'+
  'vec3 col=mix(deep,sky,fr)+spec+uWarm*li*(.45+fr*1.1)+vec3(1.,.9,.8)*sp*.3;col+=vec3(.15,.9,.45)*uC*smoothstep(.6,.95,h0)*.3;gl_FragColor=vec4(col,1.);\n#include <fog_fragment>\n}';
function nzw2(m){if(!m||m._nzw2||!m.isShaderMaterial)return;m._nzw2=1;m.uniforms.uWarm={value:new THREE.Color(1,.6,.3)};m.uniforms.uNight={value:1};m.fragmentShader=NZW2_FS;m.needsUpdate=true}
try{for(const m of NZW.mats)nzw2(m)}catch(x){}
{const _nw=nzWaterMat;nzWaterMat=function(){const m=_nw.apply(this,arguments);try{nzw2(m)}catch(x){}return m}}
