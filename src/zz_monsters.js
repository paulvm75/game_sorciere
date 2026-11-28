/* ================= MONSTERS v2: skin detail, rim light, glowing eyes, dissolve deaths, monstrous dire bats ================= */
const MXV={cache:new WeakMap(),rim:{pig:0xff3020,spider:0x9aff50,demon:0xff5a20,fox:0xff9a40,kitsune:0xff8a40,beast:0xff3030,giant:0x70d0ff,catdemon:0x40c0ff,slug:0x9aff40,queen:0xd060ff,illusion:0xb070ff,
  nbat:0xb050ff,ubat:0xb050ff,screech:0xa0ff70,belfry:0xff4070,pumpkin:0xffa020,gargoyle:0x7090ff,greyfang:0x9aff70,traven:0x9090ff,vshade:0x9060ff,mpil:0x40d0c0,gog:0x70ff90,magog:0x70ff90,desmond:0xc0c0d0,warden:0x80c0ff,vesper:0xa060ff,orson:0xffc040}};
MXV.GLSL=`varying vec3 vMxP;varying vec3 vMxW;uniform float uMxF;uniform float uMxB;uniform float uMxC;uniform vec3 uMxRim;uniform float uDis;uniform vec3 uDisC;
float mxh(vec3 p){p=fract(p*.3183099+.1);p*=17.;return fract(p.x*p.y*p.z*(p.x+p.y+p.z));}
float mxn(vec3 x){vec3 i=floor(x),f=fract(x);f=f*f*(3.-2.*f);
return mix(mix(mix(mxh(i),mxh(i+vec3(1,0,0)),f.x),mix(mxh(i+vec3(0,1,0)),mxh(i+vec3(1,1,0)),f.x),f.y),mix(mix(mxh(i+vec3(0,0,1)),mxh(i+vec3(1,0,1)),f.x),mix(mxh(i+vec3(0,1,1)),mxh(i+vec3(1,1,1)),f.x),f.y),f.z);}
float mxf(vec3 p){return mxn(p)*.62+mxn(p*2.3+5.1)*.38;}`;
function mxApply(m,o){m.userData.mx=o;const U={uMxF:{value:o.f},uMxB:{value:o.b},uMxC:{value:o.c},uMxRim:{value:new THREE.Color(o.rim).multiplyScalar(o.ri)},uDis:{value:-1},uDisC:{value:new THREE.Color(o.rim)}};m.userData.mxU=U;
  m.onBeforeCompile=(sh,rd)=>{if(o.prev)try{o.prev.call(m,sh,rd)}catch(x){}Object.assign(sh.uniforms,U);
    sh.vertexShader=sh.vertexShader.replace('#include <common>','#include <common>\nvarying vec3 vMxP;varying vec3 vMxW;').replace('#include <begin_vertex>','#include <begin_vertex>\nvMxP=position*vec3(length(modelMatrix[0].xyz),length(modelMatrix[1].xyz),length(modelMatrix[2].xyz));vMxW=(modelMatrix*vec4(position,1.)).xyz;');
    sh.fragmentShader=sh.fragmentShader.replace('#include <common>','#include <common>\n'+MXV.GLSL)
      .replace('#include <clipping_planes_fragment>','#include <clipping_planes_fragment>\nfloat mxD=mxf(vMxW*1.7);if(uDis>-.5&&mxD<uDis)discard;vec3 mxQ=vMxP*uMxF;float mxN0=mxf(mxQ);')
      .replace('#include <color_fragment>','#include <color_fragment>\ndiffuseColor.rgb*=mix(1.-uMxC,1.+uMxC*.35,mxN0);')
      .replace('#include <roughnessmap_fragment>','#include <roughnessmap_fragment>\nroughnessFactor=clamp(roughnessFactor-(.5-mxN0)*.35*uMxC,.08,1.);')
      .replace('#include <normal_fragment_maps>',isTouch?'#include <normal_fragment_maps>':'#include <normal_fragment_maps>\n{float e=.06;vec3 gr=vec3(mxf(mxQ+vec3(e,0.,0.))-mxN0,mxf(mxQ+vec3(0.,e,0.))-mxN0,mxf(mxQ+vec3(0.,0.,e))-mxN0)/e;normal=normalize(normal-(viewMatrix*vec4(gr,0.)).xyz*uMxB*.12);}')
      .replace('#include <emissivemap_fragment>','#include <emissivemap_fragment>\n{float fr=pow(1.-abs(dot(normal,normalize(vViewPosition))),3.);totalEmissiveRadiance+=uMxRim*fr;if(uDis>-.5)totalEmissiveRadiance+=uDisC*smoothstep(uDis+.1,uDis,mxD)*5.;}')};
  m.customProgramCacheKey=()=>'mx2'+(o.pk||'');
  m.clone=function(){const n=THREE.MeshStandardMaterial.prototype.clone.call(this);mxApply(n,this.userData.mx);return n}}
function mxMat(m,e){if(!m||!m.isMeshStandardMaterial||m.userData.mx||m.transparent||m.userData.noMx)return m;let byT=MXV.cache.get(m);if(!byT){byT={};MXV.cache.set(m,byT)}let c=byT[e.type];if(c)return c;
  c=m.clone();const rough=m.roughness==null?.7:m.roughness,met=m.metalness||0,h=Math.max(1,e.def.h||2);
  const pv=m.onBeforeCompile!==THREE.Material.prototype.onBeforeCompile?m.onBeforeCompile:null;mxApply(c,{prev:pv,pk:pv&&m.customProgramCacheKey?m.customProgramCacheKey():'',f:7/Math.sqrt(h/2),b:met>.5?.25:rough>.85?.9:.6,c:met>.5?.12:.22,rim:MXV.rim[e.type]||0x9a6aff,ri:(e.type==='screech'||e.type==='belfry')?.16:e.def.boss?.42:.3});byT[e.type]=c;return c}
function mxDress(e){const g=e.m&&e.m.g;if(!g||e._mx)return;e._mx=1;let skin=false;
  g.traverse(o=>{if(o.isSkinnedMesh)skin=true;if(!o.isMesh||!o.material||o.isSkinnedMesh)return;if(Array.isArray(o.material))o.material=o.material.map(m=>mxMat(m,e));else o.material=mxMat(o.material,e)});
  /* eyes and glows: brighter so the bloom catches them */
  g.traverse(o=>{if(o.isSprite&&o.material&&o.material.blending===THREE.AdditiveBlending&&o.scale.x<1.6&&!o.userData.mxE){o.userData.mxE=1;o.scale.multiplyScalar(1.25)}
    else if(o.isMesh&&o.material&&o.material.isMeshBasicMaterial&&!o.material.transparent&&/eye/i.test(Object.keys(MAT).find(k=>MAT[k]===o.material)||'')){o.material=o.material.clone();o.material.color.multiplyScalar(1.6)}});
  e._mxSkin=skin}
{const _sp=spawnEnemy;spawnEnemy=function(type,at,opts){const e=_sp.apply(this,arguments);try{mxDress(e);
  if(!e.def.boss&&MODE!=='open'||(!e.def.boss&&MODE==='open'&&e.pos.distanceTo(P.pos)<70)){const c=e.pos.clone();SPX.circle(c,MXV.rim[e.type]||0x9a6aff,e.def.r*3.4+1.5,.9,1.5);SP.emit(V3(c.x,c.y+.3,c.z),{n:14,c0:0xffffff,c1:MXV.rim[e.type]||0x9a6aff,up:5,speed:1.5,life:.7,s0:.4,s1:.05})}}catch(x){}return e}}
/* deaths: the body burns away from the edges instead of vanishing */
{const _ke=killEnemy;killEnemy=function(e){let ghost=null;try{if(!e.def.boss&&e.m&&e.m.g&&e.m.g.parent&&!e._mxSkin&&!e.x5b2){const g=e.m.g;g.updateMatrixWorld(true);ghost=g.clone(true);const mats=[];
      ghost.traverse(o=>{if(o.isSprite){o.visible=false;return}if(!o.isMesh||!o.material)return;if(o.material.map===scorchTex||o.material.transparent){o.visible=false;return}if(o.material.userData&&o.material.userData.mx){const m=o.material.clone();m.userData.mxU.uDis.value=0;mats.push(m);o.material=m}else o.visible=false});
      if(!mats.length)ghost=null;else{ghost.position.copy(g.position);ghost.quaternion.copy(g.quaternion);ghost.scale.copy(g.scale);scene.add(ghost);const c=eCenter(e),col=MXV.rim[e.type]||0x9a6aff,dur=.75;
        addFx(null,dur,(f,k)=>{for(const m of mats)m.userData.mxU.uDis.value=k*1.05;ghost.position.y+=.004;if(Math.random()<.6)SP.emit(V3(c.x+rand(-1,1)*e.def.r,c.y+rand(-.5,.8)*e.def.h*.5,c.z+rand(-1,1)*e.def.r),{n:2,c0:0xffffff,c1:col,s0:.35,s1:.04,life:.6,up:2.5,speed:.6})},
          ()=>{scene.remove(ghost);for(const m of mats)m.dispose()})}}}catch(x){ghost=null}return _ke.apply(this,arguments)}}

/* ================= DIRE BATS v2: the two bosses of the Undercroft are real monsters now ================= */
const DB2={};
function db2Tex(){if(DB2.t)return DB2.t;
  const mem=mkCanvas(512,256,x=>{const g=x.createLinearGradient(0,0,512,0);g.addColorStop(0,'#3a1420');g.addColorStop(1,'#1a070d');x.fillStyle=g;x.fillRect(0,0,512,256);
    x.strokeStyle='rgba(150,30,50,.75)';for(let k=0;k<40;k++){x.lineWidth=rand(.6,2.4);x.beginPath();let px=rand(0,60),py=rand(0,256);x.moveTo(px,py);for(let s=0;s<10;s++){px+=rand(20,55);py+=rand(-18,18);x.lineTo(px,py)}x.stroke()}
    for(let k=0;k<5000;k++){const v=rand(0,40)|0;x.fillStyle=`rgba(${v+20},${v},${v+6},.25)`;x.fillRect(rand(0,512),rand(0,256),2,2)}
    x.globalCompositeOperation='destination-out';for(let k=0;k<14;k++){const cx=rand(140,500),cy=rand(20,236),r=rand(4,18);x.beginPath();for(let a=0;a<TAU;a+=.5){const rr=r*rand(.6,1.3);x.lineTo(cx+Math.cos(a)*rr,cy+Math.sin(a)*rr)}x.fill()}
    x.beginPath();x.moveTo(512,256);for(let s=0;s<=16;s++)x.lineTo(512-s*14-rand(0,10),s%2?256-rand(10,30):256);x.lineTo(280,256);x.fill()});
  const fur=mkCanvas(256,256,x=>{x.fillStyle='#17121a';x.fillRect(0,0,256,256);for(let k=0;k<4000;k++){const v=rand(10,60)|0;x.strokeStyle=`rgba(${v+10},${v},${v+12},.5)`;x.lineWidth=1;const px=rand(0,256),py=rand(0,256),a=rand(1.2,1.9);x.beginPath();x.moveTo(px,py);x.lineTo(px+Math.cos(a)*rand(3,9),py+Math.sin(a)*rand(3,9));x.stroke()}});
  const t1=new THREE.CanvasTexture(mem),t2=new THREE.CanvasTexture(fur);t2.wrapS=t2.wrapT=THREE.RepeatWrapping;t2.repeat.set(2,2);return DB2.t={mem:t1,fur:t2}}
function buildDireBat2(s,eye,acc,span){const T=db2Tex(),g=new THREE.Group(),body=new THREE.Group();g.add(body);const I=new THREE.Group();I.scale.setScalar(s);body.add(I);
  const fur=std({color:0x3a3038,roughness:.95,map:T.fur}),hide=std({color:0x2a1a22,roughness:.55}),bone=std({color:0xd8ccb0,roughness:.45}),claw=std({color:0x1a1416,roughness:.3,metalness:.3}),
    mem=std({color:0xb05a6a,roughness:.6,side:THREE.DoubleSide,map:T.mem,alphaTest:.5,emissive:acc,emissiveIntensity:.06}),gum=std({color:0x5a0a14,roughness:.4,emissive:0x2a0006});
  mem.userData.noMx=1;
  const S=(geo,m,a,b,c,x,y,z,p)=>{const o=new THREE.Mesh(geo,m);o.scale.set(a,b,c);o.position.set(x,y,z);o.castShadow=true;(p||I).add(o);return o};const Q=nzG();
  /* torso: chest, belly, ribs, spine of bone spikes */
  S(Q.sph,fur,.34,.36,.42,0,0,0);S(Q.sph,fur,.3,.3,.3,0,.12,.22);S(Q.sph,hide,.24,.26,.3,0,-.12,.06);
  for(let k=0;k<4;k++){const r=new THREE.Mesh(new THREE.TorusGeometry(.25-k*.02,.018,5,14,Math.PI),bone);r.position.set(0,-.08,.18-k*.1);r.rotation.set(Math.PI/2,0,Math.PI);I.add(r)}
  for(let k=0;k<7;k++){const c=S(Q.cone,bone,.035-k*.003,.16-k*.012,.035,0,.33-k*.025,.25-k*.1);c.rotation.x=-.5}
  /* neck mane */
  for(let k=0;k<14;k++){const a=k/14*TAU;const c=S(Q.cone,fur,.05,.22,.05,Math.cos(a)*.22,.2+Math.sin(a)*.12,.3);c.rotation.set(-1.1+Math.sin(a)*.4,0,-Math.cos(a)*1.2)}
  /* head: skull, snout, brow, ears, many eyes, a jaw that opens */
  const H=new THREE.Group();H.position.set(0,.22,.48);I.add(H);
  S(Q.sph,fur,.22,.2,.22,0,0,0,H);S(Q.sph,hide,.13,.1,.18,0,-.05,.17,H);S(Q.sph,hide,.07,.05,.05,0,-.01,.32,H);
  for(const q of[-1,1]){S(Q.sph,hide,.09,.04,.1,q*.09,.09,.12,H).rotation.z=-q*.4;
    const ear=new THREE.Group();ear.position.set(q*.13,.14,-.02);ear.rotation.set(-.35,0,-q*.45);H.add(ear);S(Q.cone,fur,.09,.5,.04,0,.24,0,ear);S(Q.cone,mem,.06,.42,.02,0,.22,.022,ear);
    for(const [ex,ey,ez,es] of[[.075,.05,.19,.032],[.12,.1,.13,.02]]){const e=S(G.sphereLo,MAT.eyeRed,es,es,es,q*ex,ey,ez,H);e.material=new THREE.MeshBasicMaterial({color:new THREE.Color(eye).multiplyScalar(1.6)});const gl=glowSprite(eye,es*4.5,.9);gl.position.set(q*ex,ey,ez+.02);H.add(gl)}
    S(G.sphereLo,MAT.black,.02,.012,.012,q*.03,.02,.335,H)}
  const J=new THREE.Group();J.position.set(0,-.09,.05);H.add(J);S(Q.sph,hide,.12,.045,.17,0,-.02,.12,J);S(Q.sph,gum,.1,.03,.14,0,.01,.12,J);
  for(const q of[-1,1]){for(let k=0;k<5;k++){S(Q.cone,bone,.012,.06-k*.006,.012,q*(.04+k*.012),.04,.23-k*.03,J)}const f=S(Q.cone,bone,.022,.13,.022,q*.05,-.1,.27,H);f.rotation.x=Math.PI;S(Q.cone,bone,.018,.1,.018,q*.045,.06,.24,J)}
  for(let k=0;k<6;k++){const u=S(Q.cone,bone,.012,.05,.012,(k-2.5)*.022,-.08,.3-Math.abs(k-2.5)*.012,H);u.rotation.x=Math.PI}
  S(Q.sph,gum,.09,.03,.12,0,-.08,.17,H);
  /* horns */
  for(const q of[-1,1]){const hg=new THREE.Group();hg.position.set(q*.1,.17,.02);hg.rotation.set(-.9,0,-q*.35);H.add(hg);for(let k=0;k<4;k++)S(Q.cone,bone,.04-k*.008,.12,.04-k*.008,0,k*.09,-k*k*.012,hg).rotation.x=-.25*k}
  /* hind legs + talons, tail */
  for(const q of[-1,1]){const l=new THREE.Group();l.position.set(q*.16,-.22,-.18);I.add(l);S(Q.cyl,hide,.05,.28,.05,0,-.14,0,l);const ft=new THREE.Group();ft.position.y=-.3;l.add(ft);
    for(let k=0;k<3;k++){const c=S(Q.cone,claw,.02,.12,.02,(k-1)*.035,-.05,.04,ft);c.rotation.x=Math.PI*.75}l.rotation.x=.5}
  const tail=new THREE.Group();tail.position.set(0,-.05,-.4);I.add(tail);let tp=tail;for(let k=0;k<5;k++){const n=new THREE.Group();n.position.z=k?-.11:0;tp.add(n);S(Q.sph,hide,.05-k*.007,.05-k*.007,.08,0,0,-.05,n);tp=n}S(Q.cone,bone,.04,.14,.02,0,0,-.12,tp).rotation.x=-Math.PI/2;
  /* wings: arm bone, four fingers, a torn veined membrane between them, a thumb claw */
  const wings=[];for(const q of[-1,1]){const w=new THREE.Group();w.position.set(q*.24,.12,.02);w.scale.set(q,1,1);w.userData.q=q;I.add(w);
    const sp=span||1;const arm=[[0,0,0],[.42*sp,.12,.05]],fing=[[1.25*sp,.1,.35],[1.35*sp,.02,-.05],[1.1*sp,-.05,-.45],[.7*sp,-.08,-.7]];
    const bc=(a,b,r)=>{const A=V3(...a),B=V3(...b);const L=A.distanceTo(B);const c=new THREE.Mesh(Q.cyl,bone);c.scale.set(r,L,r);c.position.lerpVectors(A,B,.5);c.quaternion.setFromUnitVectors(V3(0,1,0),B.clone().sub(A).normalize());c.castShadow=true;w.add(c);return c};
    bc(arm[0],arm[1],.035);const tip=fing.map(f=>{bc(arm[1],f,.018);const c=new THREE.Mesh(Q.cone,claw);c.scale.set(.02,.08,.02);c.position.set(...f);c.quaternion.setFromUnitVectors(V3(0,1,0),V3(...f).sub(V3(...arm[1])).normalize());w.add(c);return f});
    const th=new THREE.Mesh(Q.cone,claw);th.scale.set(.03,.14,.03);th.position.set(arm[1][0],arm[1][1]+.06,arm[1][2]+.08);th.rotation.x=.8;w.add(th);
    const pts=[[0,0,.06],arm[1],...tip,[.12,-.08,-.5]];const pos=[],uv=[];const root=pts[0];
    for(let i=1;i<pts.length-1;i++){const a=pts[i],b=pts[i+1];const mid=[(a[0]+b[0])/2*.82,(a[1]+b[1])/2-.04,(a[2]+b[2])/2*.82];
      for(const t of[[root,a,mid],[root,mid,b]])for(const p of t){pos.push(...p);uv.push(Math.min(1,Math.hypot(p[0],p[2])/1.4),(p[2]+.8)/1.3)}}
    const geo=new THREE.BufferGeometry();geo.setAttribute('position',new THREE.Float32BufferAttribute(pos,3));geo.setAttribute('uv',new THREE.Float32BufferAttribute(uv,2));geo.computeVertexNormals();
    const mm=new THREE.Mesh(geo,mem);mm.castShadow=true;w.add(mm);wings.push(w)}
  const au=glowSprite(eye,s*1.3,.07);au.position.set(0,s*.25,s*.45);body.add(au);
  const sm=[];return{g,body,head:H,jaw:J,wings,anim:(e,dt,mv,l)=>{const t=e.t;const f=Math.sin(t*6.5+e.strafe);
      for(const w of wings){w.rotation.z=w.userData.q*(f*.7+.08);w.rotation.y=w.userData.q*Math.cos(t*6.5)*.12}
      const scream=e.busy>0?1:0;J.rotation.x=lerp(J.rotation.x,.12+scream*.55+Math.max(0,Math.sin(t*1.3))*.12,Math.min(1,dt*8));H.rotation.y=Math.sin(t*.9)*.25;H.rotation.x=-.1+Math.sin(t*1.7)*.06;
      body.position.y=.6+s*.16+Math.sin(t*6.5+1.2)*s*.05;body.rotation.x=.12-l*.4;let n=tail;let k=0;while(n.children.length){const c=n.children.find(o=>o.isGroup);if(!c)break;c.rotation.y=Math.sin(t*2.4-k*.7)*.3;c.rotation.x=Math.sin(t*1.8-k)*.15;n=c;k++}
      au.material.opacity=.06+Math.sin(t*3)*.02}}}
ETYPES.screech.build=()=>buildDireBat2(6.4,0xa0ff70,0x40ff20,.82);Object.assign(ETYPES.screech,{r:3.4,h:6});
ETYPES.belfry.build=()=>buildDireBat2(8.6,0xff4070,0xff1040,1.05);Object.assign(ETYPES.belfry,{r:4.4,h:7.6});

/* ---------- silhouettes: the common monsters get the details that read at a distance ---------- */
{const bone=std({color:0xd8ccb0,roughness:.45}),horn=std({color:0x1e1418,roughness:.35,metalness:.2});
  const deco={pig:m=>{const b=m.body;if(!b)return;for(let k=0;k<6;k++){const t=k/5;const c=part(G.cone,horn,.09-t*.03,.42-t*.12,.09-t*.03,0,1.95-t*.95,-.55-t*.28,b);c.rotation.x=-1.15+t*.3;c.castShadow=true}
      const h=b.children.find(o=>o.isGroup&&o.position.y>2);if(h)for(const s of[-1,1]){const t=part(G.cone,bone,.06,.3,.06,s*.2,-.2,.5,h);t.rotation.set(-.35,0,s*.35)}},
    demon:m=>{const f=m.face;if(!f)return;for(const s of[-1,1]){const h=new THREE.Mesh(G.hornCurve,horn);h.scale.setScalar(.6);h.position.set(s*.32,.32,-.1);h.rotation.set(-.6,0,-s*.7);h.castShadow=true;f.add(h)}
      const g=glowSprite(0xff5a20,1.1,.6);g.position.set(0,-.2,.35);f.add(g)},
    spider:m=>{const a=m.abd;if(!a)return;const mk=new THREE.Mesh(new THREE.PlaneGeometry(.9,.9),new THREE.MeshBasicMaterial({map:SPX.sigil,color:0xff3020,transparent:true,blending:THREE.AdditiveBlending,depthWrite:false,opacity:.7}));
      mk.position.set(0,1.01,.05);mk.rotation.x=-Math.PI/2;mk.scale.set(.9,1.2,1);a.add(mk);for(let k=0;k<5;k++){const c=part(G.cone,horn,.06,.25,.06,(k-2)*.3,.9,-.45+Math.abs(k-2)*.1,a);c.rotation.x=-.6}}};
  for(const t in deco){const d=ETYPES[t];if(!d)continue;const b0=d.build;d.build=function(){const m=b0.apply(this,arguments);try{deco[t](m)}catch(x){}return m}}}
