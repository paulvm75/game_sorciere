/* ---------- sculpted creature assets (SDF-sculpted, auto-rigged) ---------- */
const SC_NAMES=['beast','catdemon','slug','giant','catdemon_lo','slug_lo'];
const SCU={data:{},req:{}};
function scPending(type){const n={beast:'beast',catdemon:'catdemon',slug:'slug',giant:'giant'}[type];if(!n||!SCU.req[n])return false;SCU.t0=SCU.t0||performance.now();return !SCU.data[n]&&!(SCU.fail&&SCU.fail[n])&&performance.now()-SCU.t0<30000}
function scPrefetch(names){for(const n of names)scFetch(n)}
function scFetch(n){if(SCU.req[n])return SCU.req[n];SCU.req[n]=fetch('assets/'+n+'.wasm').then(r=>{if(!r.ok)throw 0;return r.arrayBuffer()}).then(b=>{const u=new Uint8Array(b,0,2);if(u[0]===0x1f&&u[1]===0x8b){if(typeof DecompressionStream==='undefined')throw 0;return new Response(new Blob([b]).stream().pipeThrough(new DecompressionStream('gzip'))).arrayBuffer()}return b}).then(b=>{SCU.data[n]=scParse(b);return SCU.data[n]}).catch(()=>{SCU.fail=SCU.fail||{};SCU.fail[n]=1;return null});return SCU.req[n]}
function scParse(buf){const dv=new DataView(buf);const hl=dv.getUint32(4,true);const hdr=JSON.parse(new TextDecoder().decode(new Uint8Array(buf,8,hl)));let o=8+hl;const nv=hdr.nv;
  const q=new Int16Array(buf,o,nv*4);o+=nv*8;const nn=new Int8Array(buf,o,nv*4);o+=nv*4;const cc=new Uint8Array(buf,o,nv*4);o+=nv*4;const si=new Uint8Array(buf,o,nv*4);o+=nv*4;const sw=new Uint8Array(buf,o,nv*4);o+=nv*4;
  const I=hdr.idx16?new Uint16Array(buf,o,hdr.ni):new Uint32Array(buf,o,hdr.ni);
  const pos=new Float32Array(nv*3),nor=new Float32Array(nv*3),col=new Float32Array(nv*3),mat=new Float32Array(nv);const lo=hdr.lo,hi=hdr.hi;
  const lin=new Float32Array(256);for(let i=0;i<256;i++){const c=i/255;lin[i]=c<.04045?c/12.92:Math.pow((c+.055)/1.055,2.4)}
  for(let i=0;i<nv;i++){for(let a=0;a<3;a++){pos[i*3+a]=lo[a]+(q[i*4+a]+32768)/65535*(hi[a]-lo[a]);nor[i*3+a]=nn[i*4+a]/127;col[i*3+a]=lin[cc[i*4+a]]}mat[i]=cc[i*4+3]}
  const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.BufferAttribute(pos,3));g.setAttribute('normal',new THREE.BufferAttribute(nor,3));g.setAttribute('color',new THREE.BufferAttribute(col,3));
  {const T=[[.88,0,0,1],[.5,0,0,0],[.32,.85,0,0],[.28,.1,0,0],[.22,0,0,0],[.6,0,1,0],[.15,0,.12,0],[.55,0,0,.35]];const am=new Float32Array(nv*4);for(let i=0;i<nv;i++){const r=T[Math.min(7,mat[i]|0)];am.set(r,i*4)}g.setAttribute('aM',new THREE.BufferAttribute(am,4))}{const fw=new Float32Array(nv*4);for(let i=0;i<nv*4;i++)fw[i]=sw[i]/255;g.setAttribute('skinIndex',new THREE.BufferAttribute(new Uint16Array(si),4));g.setAttribute('skinWeight',new THREE.BufferAttribute(fw,4))}
  {const J=new (hdr.idx16?Uint16Array:Uint32Array)(I);/* baked meshes are wound inside-out: flip so the outer surface is drawn, not the inside */for(let t=0;t+2<J.length;t+=3){const x=J[t+1];J[t+1]=J[t+2];J[t+2]=x}g.setIndex(new THREE.BufferAttribute(J,1))}g.computeBoundingSphere();g.__shared=true;return{geo:g,hdr}}
// per-material shading: 0 fur/skin, 1 bone, 2 metal, 3 claw/horn, 4 wet/mouth, 5 glow, 6 slime, 7 scales/skin smooth
const SC_GLSL_V=`attribute vec4 aM;varying vec4 vM;varying vec3 vBP;`;
const SC_GLSL_F=`varying vec4 vM;varying vec3 vBP;uniform vec3 uGlow;uniform float uGlowK;uniform vec3 uRimC;uniform float uFurF;uniform float uTime;
float scH(vec3 p){return fract(sin(dot(p,vec3(127.1,311.7,74.7)))*43758.5453);}
float scN(vec3 p){vec3 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(mix(scH(i),scH(i+vec3(1,0,0)),f.x),mix(scH(i+vec3(0,1,0)),scH(i+vec3(1,1,0)),f.x),f.y),mix(mix(scH(i+vec3(0,0,1)),scH(i+vec3(1,0,1)),f.x),mix(scH(i+vec3(0,1,1)),scH(i+vec3(1,1,1)),f.x),f.y),f.z);}`;
function scMaterial(o={}){const m=new THREE.MeshStandardMaterial({vertexColors:true,skinning:true,roughness:.8,metalness:0,envMapIntensity:o.env||.8});const U={uGlow:{value:new THREE.Color(o.glow||0xff5020)},uGlowK:{value:o.glowK||1.4},uRimC:{value:new THREE.Color(o.rim||0x000000)},uFurF:{value:o.furF||38},uTime:{value:0}};m.userData.U=U;
  m.onBeforeCompile=sh=>{Object.assign(sh.uniforms,U);
    sh.vertexShader=SC_GLSL_V+'\n'+sh.vertexShader.replace('#include <begin_vertex>','#include <begin_vertex>\nvM=aM;vBP=position;');
    sh.fragmentShader=SC_GLSL_F+'\n'+sh.fragmentShader
      .replace('#include <color_fragment>',`#include <color_fragment>
        float nA=scN(vBP*uFurF),nB=scN(vBP*uFurF*.23+3.1),nC=scN(vBP*9.);
        float furP=.72+.42*nA*nB+.18*nB;float hardP=.88+.18*nC;diffuseColor.rgb*=mix(hardP,furP,vM.w);`)
      .replace('#include <roughnessmap_fragment>',`#include <roughnessmap_fragment>
        roughnessFactor=vM.x;`)
      .replace('#include <metalnessmap_fragment>',`#include <metalnessmap_fragment>
        metalnessFactor=vM.y;`)
      .replace('#include <emissivemap_fragment>',`#include <emissivemap_fragment>
        {float rimF=pow(1.-clamp(dot(normal,normalize(vViewPosition)),0.,1.),2.5);totalEmissiveRadiance+=uRimC*rimF*mix(.3,.7,vM.w);
         float gk=smoothstep(.5,1.,vM.z);totalEmissiveRadiance+=uGlow*uGlowK*gk*(.75+.25*sin(uTime*3.+vBP.y*4.));
         float sk=smoothstep(.05,.12,vM.z)*(1.-gk);totalEmissiveRadiance+=diffuseColor.rgb*.3*sk*scN(vBP*3.+uTime*.5);}`)};
  m.customProgramCacheKey=()=>'scul';return m}
function scFurShells(geo,skel,n,len,col,rim,freq){const g=[];for(let i=1;i<=n;i++){const k=i/n;const m=new THREE.MeshStandardMaterial({vertexColors:true,skinning:true,roughness:.95,metalness:0});
  m.onBeforeCompile=sh=>{sh.uniforms.uK={value:k};sh.uniforms.uLen={value:len};sh.uniforms.uRim={value:new THREE.Color(rim||0)};sh.uniforms.uF={value:freq||42};
    sh.vertexShader='attribute vec4 aM;varying float vMat;varying vec3 vBP;uniform float uK;uniform float uLen;\n'+sh.vertexShader.replace('#include <begin_vertex>','vec3 transformed=position+normal*uK*uLen*step(.5,aM.w);transformed.y-=uK*uK*uLen*.35;vMat=1.-aM.w;vBP=position;');
    sh.fragmentShader='varying float vMat;varying vec3 vBP;uniform float uK;uniform vec3 uRim;uniform float uF;\nfloat fh(vec3 p){return fract(sin(dot(p,vec3(127.1,311.7,74.7)))*43758.5453);}\n'+sh.fragmentShader
      .replace('#include <alphatest_fragment>','if(vMat>.5)discard;{vec3 c=floor(vBP*uF);float r=fh(c);if(r<uK*.92+.06)discard;}')
      .replace('#include <color_fragment>','#include <color_fragment>\ndiffuseColor.rgb*=mix(.55,1.15,uK);')
      .replace('#include <emissivemap_fragment>','#include <emissivemap_fragment>\ntotalEmissiveRadiance+=uRim*pow(1.0-clamp(dot(normal,normalize(vViewPosition)),0.0,1.0),2.0)*uK;')};
  m.customProgramCacheKey=()=>'scfur';const s=new THREE.SkinnedMesh(geo,m);s.bind(skel,new THREE.Matrix4());s.frustumCulled=false;s.userData.fur=true;g.push(s)}return g}
// instantiate: returns {g, body, mesh, B:{name:bone}, rest:{name:quat}}
function scBuild(name,o={}){const D=SCU.data[name];if(!D)return null;const H=D.hdr;
  const bones=H.bones.map(b=>{const x=new THREE.Bone();x.name=b.n;return x});
  H.bones.forEach((b,i)=>{const p=b.p;if(b.par>=0){const pp=H.bones[b.par].p;bones[i].position.set(p[0]-pp[0],p[1]-pp[1],p[2]-pp[2]);bones[b.par].add(bones[i])}else bones[i].position.set(p[0],p[1],p[2])});
  const mat=scMaterial(o);const mesh=new THREE.SkinnedMesh(D.geo,mat);const root=bones[0];mesh.add(root);mesh.updateMatrixWorld(true);const skel=new THREE.Skeleton(bones);mesh.bind(skel);
  mesh.castShadow=true;mesh.frustumCulled=false;
  const g=new THREE.Group(),body=new THREE.Group();g.add(body);body.add(mesh);if(o.scale)mesh.scale.setScalar(o.scale);
  if(o.fur&&FUR_N.value){const sh=scFurShells(D.geo,skel,Math.min(6,FUR_N.value),o.fur,0,o.rim,o.furF);sh.forEach(s=>mesh.add(s))}
  const B={},rest={};bones.forEach(b=>{B[b.name]=b;rest[b.name]=b.quaternion.clone()});
  return{g,body,mesh,mat,B,bones,skel,hdr:H,U:mat.userData.U}}
const _scE=new THREE.Euler(),_scQ=new THREE.Quaternion();
function scRot(m,n,x,y,z){const b=m.B[n];if(!b)return;_scE.set(x||0,y||0,z||0);b.quaternion.setFromEuler(_scE)}
