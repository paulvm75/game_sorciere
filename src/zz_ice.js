/* ================= GLACIAL NOVA v2: a crystal wave that tears out of the ground ================= */
const ICE2=(()=>{
  /* one faceted crystal: hex shaft, slight taper, pointed tip, jittered verts, flat facets */
  function crystal(seed){let s=seed;const r=()=>{s=(s*16807)%2147483647;return s/2147483647};
    const N=6,pos=[],H=1,sh=.68+r()*.1,R0=.2,R1=.16;
    const ring=(y,R)=>{const a=[];for(let i=0;i<N;i++){const t=i/N*Math.PI*2+(r()-.5)*.25,rr=R*(.85+r()*.3);a.push([Math.cos(t)*rr,y+(r()-.5)*.03,Math.sin(t)*rr])}return a};
    const b=ring(-.12,R0),m=ring(sh,R1),tip=[(r()-.5)*.04,H,(r()-.5)*.04];
    const tri=(a,c,d)=>pos.push(...a,...c,...d);
    for(let i=0;i<N;i++){const j=(i+1)%N;tri(b[i],m[j],b[j]);tri(b[i],m[i],m[j]);tri(m[i],tip,m[j])}
    const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(pos,3));g.computeVertexNormals();g.__shared=true;return g}
  const geo=crystal(7);
  const VS=`attribute float aK;varying vec3 vW;varying vec3 vN;varying float vH;varying float vK;
#include <fog_pars_vertex>
void main(){
#ifdef USE_INSTANCING
mat4 im=instanceMatrix;
#else
mat4 im=mat4(1.);
#endif
vec4 wp=modelMatrix*im*vec4(position,1.);vW=wp.xyz;vN=normalize(mat3(modelMatrix)*mat3(im)*normal);vH=position.y;vK=aK;
vec4 mvPosition=viewMatrix*wp;gl_Position=projectionMatrix*mvPosition;
#include <fog_vertex>
}`;
  const FS=`uniform float uT;varying vec3 vW;varying vec3 vN;varying float vH;varying float vK;
#include <fog_pars_fragment>
float h3(vec3 p){return fract(sin(dot(p,vec3(12.9898,78.233,37.719)))*43758.5453);}
void main(){vec3 N=normalize(vN),V=normalize(cameraPosition-vW);if(dot(N,V)<0.)N=-N;
float fr=pow(1.-clamp(dot(N,V),0.,1.),2.2);
vec3 L=normalize(vec3(.35,.85,.4));float df=.32+.68*max(dot(N,L),0.);
float sp=pow(max(dot(reflect(-L,N),V),0.),48.);
float hy=clamp(vH,0.,1.);
vec3 deep=vec3(.02,.13,.32),mid=vec3(.18,.62,.95),hi=vec3(.78,.97,1.);
vec3 c=mix(deep,mid,smoothstep(-.1,.75,hy))*df;
float vein=smoothstep(.965,1.,sin(dot(vW,vec3(5.3,3.1,4.7))+sin(vW.y*2.3+vW.x*1.7+vW.z*1.1)*3.)*.5+.5);
c+=vein*vec3(.55,.9,1.)*.22;
c+=fr*vec3(.6,.9,1.)*1.25+sp*hi*1.6;
c+=smoothstep(.62,1.,hy)*vec3(.35,.8,1.)*.9;
float gl=step(.985,h3(floor(vW*14.)+floor(uT*6.)));c+=gl*hi*fr*2.;
c=mix(c,vec3(.8,.94,1.),vK*.5);c+=vK*vec3(.25,.6,1.)*.5;
gl_FragColor=vec4(c,clamp(.72+fr*.28+vK*.2,0.,1.));
#include <fog_fragment>
}`;
  const mat=new THREE.ShaderMaterial({uniforms:THREE.UniformsUtils.merge([THREE.UniformsLib.fog,{uT:{value:0}}]),vertexShader:VS,fragmentShader:FS,transparent:true,depthWrite:true,fog:true,side:THREE.DoubleSide});mat.__shared=true;
  /* radial crack decal, drawn once */
  const crack=canvasTex(512,512,x=>{x.translate(256,256);x.strokeStyle='rgba(255,255,255,1)';x.lineCap='round';
    const br=(px,py,a,len,w,d)=>{x.lineWidth=w;x.beginPath();x.moveTo(px,py);let L=0;while(L<len){a+=rand(-.35,.35);const st=rand(8,18);px+=Math.cos(a)*st;py+=Math.sin(a)*st;L+=st;x.lineTo(px,py);if(d<2&&Math.random()<.07){x.stroke();br(px,py,a+rand(-1,1),len*.4,w*.6,d+1);x.lineWidth=w;x.beginPath();x.moveTo(px,py)}}x.stroke()};
    for(let i=0;i<22;i++){const a=i/22*Math.PI*2+rand(-.1,.1);br(Math.cos(a)*14,Math.sin(a)*14,a,rand(150,235),rand(1.5,3.2),0)}
    for(let r=60;r<240;r+=rand(40,60)){x.lineWidth=1;x.globalAlpha=.5;x.beginPath();for(let a=0;a<Math.PI*2;a+=rand(.2,.5)){const rr=r+rand(-8,8);x.lineTo(Math.cos(a)*rr,Math.sin(a)*rr)}x.stroke();x.globalAlpha=1}
    const g=x.createRadialGradient(0,0,0,0,0,256);g.addColorStop(0,'rgba(0,0,0,0)');g.addColorStop(.85,'rgba(0,0,0,0)');g.addColorStop(1,'rgba(0,0,0,1)');x.globalCompositeOperation='destination-out';x.fillStyle=g;x.fillRect(-256,-256,512,512)});
  const _m=new THREE.Matrix4(),_q=new THREE.Quaternion(),_e=new THREE.Euler(),_s=new THREE.Vector3(),_p=new THREE.Vector3();
  const backOut=t=>{const c1=2.2,c3=c1+1;return 1+c3*Math.pow(t-1,3)+c1*Math.pow(t-1,2)};
  return {geo,mat,crack,_m,_q,_e,_s,_p,backOut}})();

CAST.frost=function(){const c=P.pos.clone();c.y=groundAt(c.x,c.z);const R=13,SPD=28;
  sfx.frost();flash(c,0x8fe3ff,8);P.shake=Math.max(P.shake||0,.7);
  /* spawn points: concentric rings + one under every enemy in range */
  const pts=[];for(let r=1.7;r<R;r+=1.55){const n=Math.round(r*1.05)+3,o=rand(0,TAU);for(let k=0;k<n;k++){const a=o+k*TAU/n+rand(-.18,.18),rr=r+rand(-.5,.5);pts.push([c.x+Math.sin(a)*rr,c.z+Math.cos(a)*rr,rr,a,0])}}
  const hits=enemies.filter(e=>!e.dead&&Math.hypot(e.pos.x-c.x,e.pos.z-c.z)<R);
  for(const e of hits){const d=Math.hypot(e.pos.x-c.x,e.pos.z-c.z),a=Math.atan2(e.pos.x-c.x,e.pos.z-c.z);pts.push([e.pos.x,e.pos.z,d,a,1])}
  /* crystals: 2-4 per point, main one leaning outward, bigger at mid radius and under enemies */
  const L=[];for(const[x,z,d,a,big]of pts){const y=groundAt(x,z),n=big?4:(Math.random()<.45?3:2),hm=(big?1.5:1)*(.75+.55*Math.sin(Math.PI*Math.min(1,d/R*1.1)));
    for(let k=0;k<n;k++){const main=k===0,oa=a+rand(-.6,.6),off=main?0:rand(.25,.7),lean=main?rand(.25,.5):rand(.45,.95);
      const px=x+Math.sin(oa)*off,pz=z+Math.cos(oa)*off;
      L.push({x:px,y:y-.05,z:pz,h:(main?rand(2.2,3.4):rand(.9,1.8))*hm,w:(main?rand(1.6,2.3):rand(.9,1.5))*(big?1.25:1),
        rx:Math.cos(oa)*lean,rz:-Math.sin(oa)*lean,ry:rand(0,TAU),t0:d/SPD+rand(0,.06)+k*.025,tb:1.95+d/24+rand(0,.18),d,main,k:0,fx:0})}}
  const M=L.length,mesh=new THREE.InstancedMesh(ICE2.geo,ICE2.mat,M);mesh.frustumCulled=false;mesh.castShadow=true;mesh.renderOrder=2;
  const aK=new THREE.InstancedBufferAttribute(new Float32Array(M),1);aK.setUsage(THREE.DynamicDrawUsage);mesh.geometry=ICE2.geo.clone();mesh.geometry.__shared=false;mesh.geometry.setAttribute('aK',aK);mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
  const root=new THREE.Group();root.add(mesh);
  /* ground: frost bloom + cracks that race outward with the wave */
  const fr=decal(frostTex,0xbff2ff,1,true,.95),ck=decal(ICE2.crack,0x9fe8ff,1,true,1);fr.position.set(c.x,c.y+.09,c.z);ck.position.set(c.x,c.y+.11,c.z);ck.rotation.z=rand(0,TAU);root.add(fr);root.add(ck);
  ring(c,0xbff2ff,1,R+1,.45);ring(c,0xffffff,.5,R*.55,.3);
  SM.emit(V3(c.x,c.y+.4,c.z),{n:14,c0:0xe8f8ff,c1:0x9fd8ff,s0:2,s1:5,speed:9,flat:1,life:1.1,a:.4,drag:3});
  after(.08,()=>sfx.ice());after(.22,()=>sfx.ice());
  /* damage lands when the wave front reaches each enemy */
  for(const e of hits){const d=Math.hypot(e.pos.x-c.x,e.pos.z-c.z);after(d/SPD,()=>{if(e.dead)return;damageEnemy(e,48*power(),'#bff2ff');if(!e.dead)freeze(e,3.2);frostBurst(eCenter(e),14)})}
  const DUR=Math.max(...L.map(o=>o.tb))+.5,I=ICE2;let brk=0;
  addFx(root,DUR,(f)=>{const t=f.t;I.mat.uniforms.uT.value=time;const wf=Math.min(R*2+2,t*SPD*2+1);
    fr.scale.setScalar(Math.max(.01,Math.min(R*2.15,wf)));ck.scale.setScalar(Math.max(.01,Math.min(R*2.05,wf)));
    const fo=t>DUR-.9?Math.max(0,(DUR-t)/.9):1;fr.material.opacity=.95*fo;ck.material.opacity=fo*(t<.6?1:.7);
    if(t<.5)flash(c,0x8fe3ff,8*(1-t*1.6));
    for(let i=0;i<M;i++){const o=L[i];let sy=0,sw=0,dy=0,kk=0;const lt0=t-o.t0;
      if(lt0>0){const u=Math.min(1,lt0/.17);sy=I.backOut(u);sw=.55+.45*Math.min(1,u*1.4);
        if(!o.fx){o.fx=1;if(o.main){SP.emit(V3(o.x,o.y+.3,o.z),{n:4,c0:0xffffff,c1:0x7fd8ff,speed:5,up:4,grav:14,life:.7,s0:.45,s1:.08});
          if(Math.random()<.5)SM.emit(V3(o.x,o.y+.3,o.z),{n:1,c0:0x8a96a6,c1:0x3a4250,s0:.8,s1:2.2,speed:2,up:1.5,life:.8,a:.45});
          if(o.d>2&&Math.random()<.35)SP.emit(V3(o.x,o.y+.2,o.z),{n:3,c0:0x6a5a48,c1:0x2a2420,speed:4,up:5,grav:18,life:.6,s0:.3,s1:.2})}}
        if(o.main&&Math.random()<.012)SP.emit(V3(o.x+o.rz*-o.h*.6,o.y+o.h*.9,o.z+o.rx*o.h*.6),{n:1,c0:0xffffff,c1:0xbff2ff,s0:.6,s1:.05,life:.35})}
      const bt=t-o.tb;
      if(bt>-.28)kk=Math.min(1,(bt+.28)/.28);
      if(bt>0){const u=Math.min(1,bt/.16);sy*=1-u;sw*=1-u*.6;dy=-u*.4;
        if(o.fx===1){o.fx=2;if(o.main){SP.emit(V3(o.x,o.y+o.h*.5,o.z),{n:7,c0:0xffffff,c1:0x6fd8ff,speed:6,up:3,grav:16,life:.75,s0:.4,s1:.08});SM.emit(V3(o.x,o.y+.6,o.z),{n:1,c0:0xe8f8ff,c1:0x9fd8ff,s0:1,s1:2.6,speed:1.5,life:.9,a:.3});
          if(brk<4&&o.d>3&&Math.random()<.25){brk++;shatter(V3(o.x,o.y+o.h*.45,o.z),3,1.1)}}}}
      aK.array[i]=kk*(bt>0?1:.6);
      I._e.set(o.rx,o.ry,o.rz,'ZXY');I._q.setFromEuler(I._e);I._s.set(o.w*Math.max(.001,sw),o.h*Math.max(.001,sy),o.w*Math.max(.001,sw));I._p.set(o.x,o.y+dy,o.z);
      I._m.compose(I._p,I._q,I._s);mesh.setMatrixAt(i,I._m)}
    mesh.instanceMatrix.needsUpdate=true;aK.needsUpdate=true;
    if(!f.b1&&t>1.9){f.b1=1;sx('shbreak',.55);sfx.shatter()}if(!f.b2&&t>2.25){f.b2=1;sfx.shatter()}})};
