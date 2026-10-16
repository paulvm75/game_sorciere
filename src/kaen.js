/* ================= Kaen Kuroshiba: base form, Limit Breaker form, and the witch's own Limit Breaker ================= */
/* ---------- shared cloak geometry (skinned sheet hanging from the shoulders) ---------- */
function cloakGeo(S,bones,o={}){const SKc=S.SK;const bI=nm=>bones.findIndex(b=>b.name===nm);const sp3=bI('spine_03'),sp2=bI('spine_02'),sp1=bI('spine_01'),pel=bI('pelvis'),tl=bI('thigh_l'),tr=bI('thigh_r'),cl=bI('clavicle_l'),cr=bI('clavicle_r');
  const yT=SKc.spine_03.y+(o.top||.14),yB=(o.bottom!==undefined?o.bottom:SKc.calf_l.y-.2),zT=SKc.spine_03.z-(o.back||.13);const rows=16,cols=14;const P=[],N=[],UV=[],SI=[],SW=[],I=[];
  for(let r=0;r<=rows;r++){const t=r/rows;const y=lerp(yT,yB,t);const w=lerp(o.w0||.22,o.w1||.46,Math.sqrt(t));const zc=zT-.04-t*(o.flare||.22);
    for(let c=0;c<=cols;c++){const u=c/cols;const a=(u-.5)*2;const x=a*w;const wrap=o.wrap||0;const z=zc+(1-a*a)*(-.06-.03*t)+(a*a)*wrap*(1-t*.5);P.push(x,y,z);N.push(0,0,-1);UV.push(u,t);
      let ws;if(t<.18)ws=[[sp3,.8-t*2],[a<0?cr:cl,.2],[sp2,t*2]];else if(t<.45)ws=[[sp2,1-(t-.18)*3.7],[sp1,(t-.18)*3.7]];else{const k=(t-.45)/.55;ws=[[pel,1-k*.6],[a<0?tr:tl,k*.6*.7],[a<0?tl:tr,k*.6*.3]]}
      let sw=0;for(const q of ws)sw+=q[1];while(ws.length<4)ws.push([0,0]);for(const q of ws){SI.push(q[0]);SW.push(q[1]/(sw||1))}}}
  for(let r=0;r<rows;r++)for(let c=0;c<cols;c++){const a=r*(cols+1)+c,b=a+1,cc=a+cols+1,d=cc+1;I.push(a,cc,b,b,cc,d)}
  const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(P,3));g.setAttribute('normal',new THREE.Float32BufferAttribute(N,3));g.setAttribute('uv',new THREE.Float32BufferAttribute(UV,2));g.setAttribute('skinIndex',new THREE.Float32BufferAttribute(SI,4));g.setAttribute('skinWeight',new THREE.Float32BufferAttribute(SW,4));g.setIndex(I);g.computeVertexNormals();g.computeBoundingSphere();return g}
/* torn cloth texture with a violet sigil; alpha cut-outs make the rags */
function kaenClothTex(torn,sigil,base){return canvasTex(256,512,(x,w,h)=>{x.fillStyle=base||'#17151b';x.fillRect(0,0,w,h);
  for(let k=0;k<900;k++){x.fillStyle=`rgba(${rand(40,90)|0},${rand(36,80)|0},${rand(50,100)|0},${rand(.05,.14)})`;x.fillRect(rand(0,w),rand(0,h),rand(1,3),rand(10,60))}
  for(let k=0;k<5;k++){x.fillStyle=`rgba(0,0,0,${rand(.15,.3)})`;x.fillRect(rand(0,w),0,rand(6,20),h)}
  const hem=torn?rand(250,300):rand(360,400);const g=x.createLinearGradient(0,hem-90,0,h);g.addColorStop(0,'rgba(120,108,140,0)');g.addColorStop(1,'rgba(120,108,140,.55)');x.fillStyle=g;x.fillRect(0,hem-90,w,h);
  if(sigil){x.save();x.translate(w/2,150);x.strokeStyle=torn?'rgba(200,150,255,.95)':'rgba(150,100,210,.85)';x.lineWidth=5;x.shadowColor='#a060ff';x.shadowBlur=torn?16:6;
    x.beginPath();x.moveTo(0,-70);x.lineTo(0,90);x.moveTo(-34,-10);x.lineTo(34,-10);x.moveTo(-18,40);x.lineTo(18,40);x.stroke();x.beginPath();x.arc(0,-40,20,0,TAU);x.stroke();x.beginPath();x.moveTo(0,90);x.lineTo(-12,110);x.moveTo(0,90);x.lineTo(12,110);x.stroke();x.restore()}
  x.globalCompositeOperation='destination-out';x.fillStyle='#000';
  for(let c=0;c<w;c+=rand(8,22)){const d=rand(0,torn?220:110);x.beginPath();x.moveTo(c-rand(4,12),h);x.lineTo(c+rand(-6,6),h-(h-hem)-d*.3-rand(0,40));x.lineTo(c+rand(8,18),h);x.fill()}
  for(let k=0;k<(torn?26:10);k++){x.beginPath();x.ellipse(rand(10,w-10),rand(hem-120,h),rand(3,torn?16:8),rand(6,torn?30:14),rand(0,3),0,TAU);x.fill()}
  for(let s of[0,w]){for(let y=hem-40;y<h;y+=rand(10,25)){x.beginPath();x.moveTo(s,y);x.lineTo(s===0?rand(6,22):w-rand(6,22),y+rand(5,15));x.lineTo(s,y+rand(15,30));x.fill()}}
  x.globalCompositeOperation='source-over'})}
function kaenSashTex(){return canvasTex(64,256,(x,w,h)=>{x.fillStyle='#3a2a52';x.fillRect(0,0,w,h);x.strokeStyle='#9a70d8';x.lineWidth=3;for(let y=10;y<h;y+=26){x.beginPath();x.moveTo(w/2,y);x.lineTo(w-10,y+10);x.lineTo(w/2,y+20);x.lineTo(10,y+10);x.closePath();x.stroke()}x.fillStyle='#1a1224';x.fillRect(0,0,6,h);x.fillRect(w-6,0,6,h)})}
/* fresnel ghost material for the spectral demon */
function ghostMat(col,op){return new THREE.ShaderMaterial({uniforms:{uC:{value:new THREE.Color(col)},uO:{value:op},uT:{value:0}},transparent:true,depthWrite:false,blending:THREE.AdditiveBlending,side:THREE.DoubleSide,
  vertexShader:'varying vec3 vN;varying vec3 vV;varying vec3 vP;void main(){vec4 mv=modelViewMatrix*vec4(position,1.);vN=normalize(normalMatrix*normal);vV=normalize(-mv.xyz);vP=position;gl_Position=projectionMatrix*mv;}',
  fragmentShader:'uniform vec3 uC;uniform float uO;uniform float uT;varying vec3 vN;varying vec3 vV;varying vec3 vP;void main(){float f=pow(1.-abs(dot(vN,vV)),2.6);float fl=.75+.25*sin(uT*9.+vP.y*6.)*sin(uT*5.3+vP.x*4.);float st=.6+.4*smoothstep(.2,.9,sin(vP.y*18.-uT*6.)*.5+.5);gl_FragColor=vec4(uC*(f*1.4+.12)*fl*st,uO*(f+.15));}'})}
function buildGhostDemon(){const g=new THREE.Group();const m=ghostMat(0x9a4aff,.9),m2=ghostMat(0xc070ff,.7);const add=(geo,mat,sx,sy,sz,x,y,z,rx=0,ry=0,rz=0)=>{const o=new THREE.Mesh(geo,mat);o.scale.set(sx,sy,sz);o.position.set(x,y,z);o.rotation.set(rx,ry,rz);g.add(o);return o};
  add(G.sphere,m,1.25,1.4,1.1,0,3.6,0);add(G.sphere,m2,1.05,.35,.7,0,3.95,.55);add(G.sphere,m,.85,.55,.8,0,2.85,.55);for(let k=0;k<7;k++)add(G.tooth,m2,2.2,2.6,2.2,(k-3)*.18,2.75,1.02,Math.PI);
  for(const q of[-1,1]){const h=new THREE.Mesh(G.bigHorn,m2);h.scale.setScalar(.42);h.position.set(q*.75,4.5,-.1);h.rotation.set(-.3,q*.3,-q*1.25);g.add(h);const ey=glowSprite(0xff4aa0,1.2,1);ey.position.set(q*.42,3.75,1.0);g.add(ey);
    add(G.sphere,m,1.1,.9,.9,q*1.9,2.4,0);add(G.sphere,m,.55,1.6,.55,q*2.6,1.1,.6,.4,0,q*.35);const cl=add(G.sphere,m2,.7,.45,.7,q*2.9,-.3,1.3);for(let c=0;c<4;c++)add(G.cone,m2,.12,.7,.12,q*2.9+(c-1.5)*.22,-.7,1.7,1.2)}
  add(G.sphere,m,2.1,1.9,1.3,0,1.3,-.2);const core=glowSprite(0x8a30ff,9,.35);core.position.y=2.2;g.add(core);g.userData.mats=[m,m2];return g}
/* skin with violet corruption veins (limit breaker) */
function veinSkinMat(base){const m=base.clone();m.userData.uV={value:0};m.onBeforeCompile=sh=>{sh.uniforms.uV=m.userData.uV;sh.vertexShader=sh.vertexShader.replace('#include <common>','#include <common>\nvarying vec3 vKp;').replace('#include <begin_vertex>','#include <begin_vertex>\nvKp=position;');
  sh.fragmentShader=sh.fragmentShader.replace('#include <common>','#include <common>\nvarying vec3 vKp;uniform float uV;').replace('#include <emissivemap_fragment>',`#include <emissivemap_fragment>
{vec3 p=vKp*9.;float kv1=abs(sin(p.y*4.1+sin(p.x*3.3)*2.2+sin(p.z*2.7)*1.6));float kv2=abs(sin(p.x*5.7+p.y*1.3+sin(p.z*4.1+p.y)*1.8));float vn=max(smoothstep(.975,.998,kv1),smoothstep(.982,.998,kv2));
diffuseColor.rgb=mix(diffuseColor.rgb,vec3(dot(diffuseColor.rgb,vec3(.3,.45,.25)))*vec3(1.,.93,1.02),uV*.6);diffuseColor.rgb=mix(diffuseColor.rgb,vec3(.55,.2,.9),vn*uV*.7);totalEmissiveRadiance+=vec3(.7,.25,1.)*vn*uV*2.2;}`)};m.customProgramCacheKey=()=>'veinSkin';return m}
/* ---------- Kaen ---------- */
function buildIllusion(){const M2=mat2();const a=makeCHActor('m',{skin:0xfff0ea,skinLift:[1.42,1.58,1.68],hair:'hairPart',hairTex:'1',hairCol:0x0b0a10,brow:0x0b0a10,eyeTint:0xff9090,keepReg:[5,6,9],
    wear:[['long',0x121016,{roughness:.8}],['tee',0x26242c,{roughness:.75}],['trousers',0x0f0d13,{roughness:.8}],['shoes',0x0a0a0c,{roughness:.35,metalness:.2}]]});
  if(!a)return buildFoxSpirit();const S=a.S,SK=S.SK;const V=(x,y,z)=>new THREE.Vector3(x,y,z);
  const gold=std({color:0xc8a050,roughness:.3,metalness:1,envMapIntensity:1.4}),leather=std({color:0x1c1614,roughness:.42,metalness:.15}),blk=std({color:0x0f0d12,roughness:.7}),rope=std({color:0x5a2e98,roughness:.55,emissive:0x12061e});
  // messy spiky black hair with bangs
  const hm=std({color:0x0b0a10,roughness:.45,emissive:0x000000});const spikes=new THREE.Group();
  for(let k=0;k<26;k++){const ring=k<10?0:k<19?1:2;const n=ring===0?10:ring===1?9:7;const i=ring===0?k:ring===1?k-10:k-19;const ang=-1.15+i/(n-1)*2.3;const d=V(Math.sin(ang)*(.8-ring*.12),.35+ring*.28,-(Math.cos(ang)*.55)-.2+ring*.05).normalize();
    const c=new THREE.Mesh(G.cone,hm);c.scale.set(.032,.12+Math.random()*.07,.032);c.position.copy(d).multiplyScalar(.088).add(V(0,.075,-.012));c.lookAt(c.position.clone().add(d));c.rotateX(Math.PI/2);spikes.add(c)}
  for(let k=0;k<7;k++){const u=(k-3)/3;const d=V(u*.5,-.15,.9).normalize();const c=new THREE.Mesh(G.cone,hm);c.scale.set(.026,.11+Math.abs(u)*.02,.02);c.position.set(u*.07,.13,.085);c.lookAt(c.position.clone().add(V(u*.2,-1,.35)));c.rotateX(Math.PI/2);spikes.add(c)}
  a.attach('Head',spikes,SK.Head.clone());
  // red eyes
  const eyes=[];for(const q of[-1,1]){const ey=glowSprite(0xff2030,.07,1);ey.position.set(q*.032,-.012,.07);a.head.add(ey);eyes.push(ey)}
  // high collar / scarf
  const scarf=new THREE.Group();const sc1=new THREE.Mesh(new THREE.TorusGeometry(.07,.03,8,20),blk);sc1.rotation.x=Math.PI/2;sc1.scale.set(1.08,1.12,1.2);sc1.position.y=-.03;scarf.add(sc1);const sc2=new THREE.Mesh(new THREE.CylinderGeometry(.068,.085,.05,16,1,true),std({color:0x141218,roughness:.8,side:THREE.DoubleSide}));sc2.position.set(0,.005,-.012);scarf.add(sc2);
  a.attach('neck_01',scarf,SK.neck_01.clone().add(V(0,-.01,.0)));
  // torn cloak (two versions)
  const clothN=kaenClothTex(false,true),clothT=kaenClothTex(true,true,'#1a1620');
  const cloakM=std({map:clothN,color:0xffffff,roughness:.85,side:THREE.DoubleSide,alphaTest:.5,skinning:true});
  const cloak=a.sk(cloakGeo(S,a.bones,{w0:.25,w1:.52,flare:.26,bottom:SK.calf_l.y-.25,wrap:.08}),cloakM);
  // rope belt, emblem, hanging sash panel, tassels
  const belt=new THREE.Group();for(let k=0;k<3;k++){const t=new THREE.Mesh(new THREE.TorusGeometry(.155,.016,6,40),rope);t.rotation.x=Math.PI/2;t.position.y=k*.024;t.rotation.z=k*.4;belt.add(t)}
  const knot=new THREE.Mesh(G.sphere,rope);knot.scale.set(.035,.03,.025);knot.position.set(.09,.02,.12);belt.add(knot);
  const emb=new THREE.Group();const e1=new THREE.Mesh(new THREE.TorusGeometry(.028,.006,6,20),gold);emb.add(e1);const e2=new THREE.Mesh(new THREE.BoxGeometry(.004,.05,.004),gold);emb.add(e2);const e3=new THREE.Mesh(new THREE.BoxGeometry(.05,.004,.004),gold);emb.add(e3);emb.position.set(-.07,.02,.14);belt.add(emb);
  const panel=new THREE.Mesh(new THREE.PlaneGeometry(.075,.42),std({map:kaenSashTex(),roughness:.7,side:THREE.DoubleSide}));panel.position.set(.02,-.2,.155);belt.add(panel);
  for(const[x,z]of[[.1,.13],[-.11,.11],[.15,.03]]){const cord=new THREE.Mesh(new THREE.CylinderGeometry(.006,.006,.2,5),rope);cord.position.set(x,-.1,z);belt.add(cord);const tas=new THREE.Mesh(G.cone,rope);tas.scale.set(.02,.07,.02);tas.rotation.x=Math.PI;tas.position.set(x,-.23,z);belt.add(tas)}
  belt.scale.set(1,1,1.1);a.attach('pelvis',belt,SK.pelvis.clone().add(V(0,.06,.0)));
  // leather bracers + fingerless gloves (forearms run along x in the rest pose)
  for(const s of['l','r']){const la=SK['lowerarm_'+s],ha=SK['hand_'+s];const mid=la.clone().lerp(ha,.55);const br=new THREE.Group();const c=new THREE.Mesh(new THREE.CylinderGeometry(.043,.05,.16,12),leather);c.rotation.z=Math.PI/2;br.add(c);
    for(const u of[-.06,.06]){const r=new THREE.Mesh(new THREE.TorusGeometry(.048,.005,5,16),gold);r.rotation.y=Math.PI/2;r.position.x=u;br.add(r)}const pl=new THREE.Mesh(new THREE.BoxGeometry(.1,.012,.05),gold);pl.position.set(0,.046,0);br.add(pl);a.attach('lowerarm_'+s,br,mid);
    const gl=new THREE.Mesh(new THREE.CylinderGeometry(.036,.04,.07,10),leather);gl.rotation.z=Math.PI/2;a.attach('hand_'+s,gl,ha.clone().add(V(s==='l'?.035:-.035,0,0)))}
  // tall boots with straps
  for(const s of['l','r']){const ca=SK['calf_'+s],fo=SK['foot_'+s];const mid=ca.clone().lerp(fo,.55);const bt=new THREE.Group();const c=new THREE.Mesh(new THREE.CylinderGeometry(.062,.056,ca.y-fo.y-.02,12),leather);bt.add(c);
    for(const u of[-.12,-.03,.06]){const r=new THREE.Mesh(new THREE.TorusGeometry(.064,.007,5,16),blk);r.rotation.x=Math.PI/2;r.position.y=u;bt.add(r);const b=new THREE.Mesh(new THREE.BoxGeometry(.018,.014,.008),gold);b.position.set(.05,u,.04);bt.add(b)}a.attach('calf_'+s,bt,mid)}
  // the cursed katana (right hand) + scabbard
  const kat=new THREE.Group();const bladeG=new THREE.BoxGeometry(.03,.95,.005,1,16,1);bladeG.translate(0,.475,0);bendGeo(bladeG,.95,.22);bladeG.rotateZ(Math.PI/2);
  const bladeM=std({color:0xd8d4e8,roughness:.12,metalness:1,envMapIntensity:1.8,emissive:0x2a1050});const blade=new THREE.Mesh(bladeG,bladeM);blade.position.x=-.13;kat.add(blade);
  const edgeG=bladeG.clone();const edge=new THREE.Mesh(edgeG,new THREE.MeshBasicMaterial({color:0xb070ff,transparent:true,opacity:.55,blending:THREE.AdditiveBlending,depthWrite:false}));edge.position.set(-.13,-.004,0);edge.scale.set(1,1.4,2.5);kat.add(edge);
  const glows=[];for(let k=0;k<4;k++){const s=glowSprite(0xa050ff,.28,.5);s.position.set(-.25-k*.24,0,0);kat.add(s);glows.push(s)}
  const guard=new THREE.Mesh(new THREE.TorusGeometry(.035,.01,6,18),gold);guard.rotation.y=Math.PI/2;guard.position.x=-.12;kat.add(guard);
  const hilt=new THREE.Mesh(new THREE.CylinderGeometry(.016,.016,.24,8),rope);hilt.rotation.z=Math.PI/2;hilt.position.x=0;kat.add(hilt);const pom=new THREE.Mesh(G.sphereLo,gold);pom.scale.setScalar(.02);pom.position.x=.12;kat.add(pom);
  const tas=new THREE.Mesh(G.cone,rope);tas.scale.set(.018,.09,.018);tas.rotation.x=Math.PI;tas.position.set(.13,-.06,0);kat.add(tas);
  a.attach('hand_r',kat,SK.hand_r.clone().add(V(-.07,0,.03)),new THREE.Euler(0,.2,-.25));
  const scab=new THREE.Mesh(new THREE.CylinderGeometry(.02,.016,.85,8),blk);scab.rotation.set(0,0,1.9);const sch=new THREE.Group();sch.add(scab);a.attach('pelvis',sch,SK.pelvis.clone().add(V(.19,-.02,-.02)),new THREE.Euler(.3,0,0));
  // limit breaker pieces (hidden until the transformation)
  const lbSkinM=veinSkinMat(a.skinM);const lbSkin=a.skinPart([2,3,4,5,6,7,8,9],lbSkinM);lbSkin.visible=false;
  const demon=buildGhostDemon();demon.position.set(0,.9,-2.2);demon.scale.setScalar(.85);demon.visible=false;a.g.add(demon);
  const aura=glowSprite(0x8a30ff,6,.08);aura.position.y=1.2;a.g.add(aura);const ring=decal(runeTex,0x9a40ff,5,true,0);ring.position.y=.08;a.g.add(ring);
  const bub=new THREE.Mesh(new THREE.SphereGeometry(1.6,24,16),new THREE.MeshBasicMaterial({color:0xa060ff,transparent:true,opacity:.14,blending:THREE.AdditiveBlending,depthWrite:false,side:THREE.DoubleSide}));bub.position.y=1.2;bub.visible=false;a.g.add(bub);
  const K={a,cloak,cloakM,clothN,clothT,lbSkin,lbSkinM,demon,aura,ring,eyes,glows,bladeM,edge,hm,lb:0,lbK:0,torn:false};
  K.setTorn=()=>{if(K.torn)return;K.torn=true;cloakM.map=clothT;cloakM.needsUpdate=true;lbSkin.visible=true;if(a.wear.long)a.wear.long.visible=false;if(a.wear.tee)a.wear.tee.visible=false;a.skinMesh.visible=false;sc2.visible=false};
  return{g:a.g,body:a.body,actor:a,aura,bub,K,head:a.head,anim:(e,dt,mv)=>{if(e.ai.fly)e.m.lock=.1;actorAnimate(e,dt,mv);bub.visible=!!e.guarded;if(bub.visible){bub.rotation.y+=dt;bub.material.opacity=.12+Math.sin(e.t*5)*.05}kaenFx(e,dt)}}}
function kaenFx(e,dt){const K=e.m.K;if(!K)return;const t=e.t;const want=e.lb>0?1:0;K.lbK=lerp(K.lbK,want,Math.min(1,dt*(want?1.5:.4)));const k=K.lbK;
  K.lbSkinM.userData.uV.value=K.torn?.35+k*.65:0;K.demon.visible=k>.04;if(K.demon.visible){K.demon.userData.mats.forEach(m=>{m.uniforms.uT.value=t;m.uniforms.uO.value=.55*k});K.demon.position.y=.9+Math.sin(t*1.4)*.15;K.demon.rotation.y=Math.sin(t*.7)*.08}
  K.aura.scale.setScalar(6+k*10);K.aura.material.opacity=.08+k*.22;K.ring.material.opacity=k*.8;K.ring.rotation.z+=dt*(.5+k*2);K.eyes.forEach(s=>s.scale.setScalar(.07+k*.09));
  K.hm.emissive.setRGB(.12*k,.02*k,.25*k);K.bladeM.emissive.setRGB(.16+.4*k,.06+.1*k,.3+.6*k);K.edge.material.opacity=.45+k*.5;K.glows.forEach((g,i)=>{g.material.opacity=.4+k*.5+Math.sin(t*12+i)*.1;g.scale.setScalar(.28+k*.4)});
  const n=e.lb>0?4:1;for(let i=0;i<n;i++)if(Math.random()<.35+k*.6){const p=V3(e.pos.x+rand(-1.2,1.2)*(1+k),e.pos.y+rand(0,2.6+k*2),e.pos.z+rand(-1.2,1.2)*(1+k));SP.emit(p,{c0:0xf0d0ff,c1:0x6010d0,s0:.3+k*.3,s1:.05,life:.45,speed:3+k*3,jitter:.2})}
  if(k>.3&&Math.random()<dt*3){const a2=eCenter(e).add(V3(rand(-3,3),rand(0,4),rand(-3,3)));lightning(eCenter(e),a2,0xc080ff)}
  if(k>.3&&Math.random()<dt*6){const r=new THREE.Mesh(G.shard,MAT.bossStone);const s=rand(.1,.35);r.scale.setScalar(s);const a3=rand(0,TAU),d=rand(1.5,4);r.position.set(e.pos.x+Math.sin(a3)*d,e.pos.y+.2,e.pos.z+Math.cos(a3)*d);const vy=rand(1.5,3);addFx(r,rand(1.5,2.5),(f,kk)=>{r.position.y+=vy/60;r.rotation.x+=.05;r.rotation.y+=.04;if(kk>.8)r.scale.multiplyScalar(.95)})}}
/* ---------- Kaen transformation cinematic ---------- */
function kaenTransform(e){BM.finalFor=e;const K=e.m.K,act=e.m.actor;e.invuln=true;e.busy=99;e.m.lock=99;P.flying=false;P.glide=true;P.invuln=Math.max(P.invuln,4);
  for(const o of enemies)if(!o.dead&&o!==e&&(o.type==='fox'))removeEnemy(o);
  const c=e.pos.clone();const H=2.4;const orbit=(r,h,a0,a1)=>k=>{const a=lerp(a0,a1,k)+e.m.g.rotation.y;return{pos:V3(c.x+Math.sin(a)*r,c.y+h,c.z+Math.cos(a)*r),look:V3(c.x,c.y+1.5,c.z)}};
  const idle=dt=>{e.t+=dt;kaenFx(e,dt);act.update(dt)};const slow=(f)=>dt=>{e.t+=dt;kaenFx(e,dt);act.update(dt*f)};
  playCutscene([
    {dur:2.6,fov:42,cut:true,cam:orbit(4.5,1.2,-.4,.2),onStart:()=>{act.once('Hit_Knockback',1.2);sfx.boom&&sfx.boom();P.shake=.6;SP.emit(eCenter(e),{n:60,c0:0xffffff,c1:0x8030ff,speed:8,life:.8})},update:slow(.45)},
    {who:'Kaen',text:'No... No. Not to a witch. Not in my own illusion...',fov:34,cam:()=>({pos:headOf(c,1.5).add(V3(Math.sin(e.m.g.rotation.y)*2.2,-.1,Math.cos(e.m.g.rotation.y)*2.2)),look:headOf(c,1.2)}),onStart:()=>act.setBase('Crouch_Idle_Loop',.4),update:idle},
    {who:'Kaen',text:'When restraint shatters... the void answers.',fov:30,cam:()=>({pos:headOf(c,1.65).add(V3(Math.sin(e.m.g.rotation.y)*1.25,0,Math.cos(e.m.g.rotation.y)*1.25)),look:headOf(c,1.6)}),onStart:()=>{act.setBase('Idle_Loop',.6);e.lb=.01},update:idle},
    {dur:3.6,fov:50,cut:true,title:['Kaen Kuroshiba','Limit Breaker'],cam:orbit(9,3,.6,-.5),onStart:()=>{K.setTorn();e.lb=20;e.hp=Math.min(e.maxhp,e.hp+Math.round(e.maxhp*.135));SP.emit(V3(c.x,c.y+1,c.z),{n:90,c0:0xd0a0ff,c1:0x400080,s0:.6,s1:.1,life:1.4,up:4,speed:1.5});act.setBase('Spell_Simple_Idle_Loop',.3);flash(c,0xa050ff,22);P.shake=1.6;sfx.roar();sfx.boom&&sfx.boom();ring(c,0xc080ff,1,18,.9);runeFlash(c,0x9a40ff,20,2.5);
        SP.emit(V3(c.x,c.y+1.5,c.z),{n:260,c0:0xffffff,c1:0x7020e0,speed:18,life:1.3,s0:.9,s1:.1,grav:1});SM.emit(V3(c.x,c.y+1,c.z),{n:40,c0:0x6030a0,c1:0x100420,s0:3,s1:9,speed:6,life:2,a:.6,up:2});for(let k=0;k<8;k++)after(k*.12,()=>lightning(V3(c.x+rand(-6,6),c.y+25,c.z+rand(-6,6)),eCenter(e),0xe0c0ff))},update:idle},
    {who:'Kaen',text:'I\'m gonna kill you, witch... KILL YOU!',fov:40,cam:()=>{const d=V3(P.pos.x-c.x,0,P.pos.z-c.z).normalize();return{pos:headOf(c,1.2).addScaledVector(d,3.4).add(V3(d.z*1.2,0,-d.x*1.2)),look:headOf(c,2.4)}},onStart:()=>{act.fire('OverhandThrow',.7);if(!CS.skipping)clipPlay('vo_kaen_kill',1.4,4);else sfx.roar()},update:idle}
  ],()=>{e.invuln=false;e.busy=0;e.m.lock=0;e.lb=20;e.dmgMul=1.35;e.ai.flyCd=2;toast('Kaen hits 35% harder and can fly. Survive 20 seconds or finish him.','Limit Breaker',true);
    if(MODE!=='open'&&!P.lbStory){P.lbStory=true;finStart(e)}})}
/* ---------- Kaen AI: katana, guardians, transformation, flight ---------- */
function crescentFx(o,dir,range,col){const m=new THREE.Mesh(new THREE.TorusGeometry(2.2,.12,6,24,Math.PI),new THREE.MeshBasicMaterial({color:col,transparent:true,blending:THREE.AdditiveBlending,depthWrite:false,side:THREE.DoubleSide}));m.rotation.set(Math.PI/2,0,Math.atan2(dir.x,dir.z)-Math.PI/2);
  const y=o.y+1.2;addFx(m,.35,(f,k)=>{m.position.set(o.x+dir.x*range*k,y,o.z+dir.z*range*k);m.material.opacity=1-k;m.scale.setScalar(.6+k*.8);SP.emit(m.position,{n:3,c0:0xffffff,c1:col,speed:2,life:.3})},()=>{scene.remove(m);m.geometry.dispose()})}
BOSSAI.illusion=function(e,dt,d){const a=e.ai,rage=e.hp<e.maxhp*.5,act=e.m.actor;const lb=e.lb>0;const sp=lb?1.6:1;a.a1-=dt*sp;a.a2-=dt*sp;a.a3-=dt*sp;a.a4=(a.a4===undefined?2:a.a4)-dt*sp;a.a5=(a.a5===undefined?5:a.a5)-dt*sp;a.a6=(a.a6===undefined?3:a.a6)-dt*sp;a.tp-=dt;a.flyCd=(a.flyCd||0)-dt;
  if(e.lb>0){e.lb-=dt;if(e.lb<=0){e.lb=0;e.dmgMul=1;toast('Kaen\'s limit breaker burns out. Finish him!','Now',true);if(e.leap&&e.leap.fly){e.leap=null;a.fly=null}}}
  if(!a.lbDone&&MODE!=='open')e.hpFloor=.04;if(!a.lbDone&&e.hp<=e.maxhp*.1){a.lbDone=1;kaenTransform(e);return}
  e.guarded=enemies.some(o=>!o.dead&&o.type==='guardian');
  if(!a.g0){a.g0=1;summonGuardians(e,1)}if(!a.g1&&e.hp<e.maxhp*.66){a.g1=1;summonGuardians(e,2);cineLine('Kaen','Guardians. Crush her.')}if(!a.g2&&e.hp<e.maxhp*.33){a.g2=1;summonGuardians(e,2);cineLine('Kaen','You cannot hit what is not really there.')}
  // limit-breaker flight: chases you in the air at 80% of your flying speed
  if(a.fly){const F=a.fly;F.t+=dt;const tgt=V3(P.pos.x,P.pos.y+.4,P.pos.z);const dv=tgt.sub(e.pos);const dist=dv.length();const pSpd=(P.flying?17:13)*(P.lbT>0?1.3:1);const spd=pSpd*.8;
    if(dist>.1)e.pos.addScaledVector(dv.normalize(),Math.min(dist,spd*dt));F.hit-=dt;e.m.g.rotation.y=Math.atan2(P.pos.x-e.pos.x,P.pos.z-e.pos.z);
    if(Math.random()<.6)SP.emit(eCenter(e),{n:3,c0:0xe0c0ff,c1:0x6010d0,s0:.5,s1:.1,life:.5,speed:2});
    if(dist<2.4&&F.hit<=0){F.hit=.9;act&&act.fire('Melee_Hook',.4);crescentFx(e.pos.clone().setY(e.pos.y-1),V3(P.pos.x-e.pos.x,0,P.pos.z-e.pos.z).normalize(),3,0xc080ff);damagePlayer(e.dmg*1.3);sfx.blink()}
    if(F.t>=3.6){a.fly=null;e.leap=null;act&&act.setBase('Idle_Loop',.3);e.m.lock=0}return}
  if(lb&&a.flyCd<=0&&P.pos.y-groundAt(P.pos.x,P.pos.z)>2.2&&d<45){a.flyCd=6.5;a.fly={t:0,hit:.3};e.leap={fly:true};e.m.lock=4;act&&act.setBase(CH.clips.NinjaJump_Idle_Loop?'NinjaJump_Idle_Loop':'Jump_Loop',.2);sfx.fly&&sfx.fly();SP.emit(eCenter(e),{n:50,c0:0xffffff,c1:0x8030ff,speed:9,life:.6});toast('Kaen takes to the air!');return}
  if(e.busy>0)return;
  if(a.a4<=0&&d<8.5){a.a4=lb?1.8:2.6;e.busy=.8;const dir=V3(P.pos.x-e.pos.x,0,P.pos.z-e.pos.z).normalize();const o=e.pos.clone();if(act){act.fire('Melee_Hook',.5);e.m.lock=.5}
    coneTelegraph(o,dir,8,.85,lb?.35:.5,0xb060ff,()=>{if(e.dead)return;crescentFx(o,dir,7,0xc080ff);whoosh&&whoosh(.2,400,2200,.12);if(inCone(P.pos,o,dir,8,.85))damagePlayer(e.dmg*1.6)})}
  else if(a.a5<=0&&d>7&&d<30){a.a5=lb?3:4.5;e.busy=.9;const from=e.pos.clone(),dir=V3(P.pos.x-from.x,0,P.pos.z-from.z).normalize(),to=from.clone().addScaledVector(dir,28);if(act){act.fire('OverhandThrow',.55);e.m.lock=.55}
    lineTelegraph(from,to,3,lb?.4:.6,0xb060ff,()=>{if(e.dead)return;crescentFx(from,dir,28,0xd090ff);after(.15,()=>{if(distToSeg(P.pos,from,to)<1.8&&Math.abs(P.pos.y-from.y)<3.5)damagePlayer(e.dmg*1.5)})})}
  else if(lb&&a.a6<=0&&d<16){a.a6=4;e.busy=1;const dir=V3(P.pos.x-e.pos.x,0,P.pos.z-e.pos.z).normalize();const o=e.pos.clone();sfx.roar();
    coneTelegraph(o,dir,15,.55,.75,0x9a40ff,()=>{if(e.dead)return;P.shake=1.2;sfx.boom&&sfx.boom();for(let k=0;k<12;k++){const p=o.clone().addScaledVector(dir,2+k*1.1);p.y=groundAt(p.x,p.z);SP.emit(V3(p.x,p.y+1,p.z),{n:10,c0:0xffffff,c1:0x8030ff,speed:6,life:.5})}if(inCone(P.pos,o,dir,15,.55))damagePlayer(e.dmg*2.2)});toast('The demon behind him swings!')}
  else if(a.a1<=0){a.a1=rage?4:5.5;e.busy=1.1;if(act){act.fire('Spell_Simple_Shoot',.7);e.m.lock=.7}const n=lb?8:rage?6:4;for(let k=0;k<n;k++){const p=P.pos.clone().add(k?V3(rand(-7,7),0,rand(-7,7)):V3());p.y=groundAt(p.x,p.z);
      after(k*.12,()=>telegraph(p,2.6,lb?.7:.95,0xa050ff,()=>{if(e.dead)return;lightning(V3(p.x,p.y+22,p.z),V3(p.x,p.y,p.z),0xe0c0ff);lightning(V3(p.x+1,p.y+22,p.z),V3(p.x,p.y,p.z),0x9040ff);flash(p,0xa060ff,5);noise(.3,.16,2400);if(playerIn(p,2.7))damagePlayer(e.dmg*1.5)}))}}
  else if(a.a2<=0&&!lb){a.a2=rage?7:9;e.busy=.8;summonNear(e,'fox',rage?5:3);teleportNear(e,10,16);toast('Illusions. Only one of them is real.')}
  else if(a.a3<=0&&d<20){a.a3=rage?4.5:6.5;e.busy=1.4;const dir=V3(P.pos.x-e.pos.x,0,P.pos.z-e.pos.z).normalize();const o=e.pos.clone();if(act){act.fire('OverhandThrow',.7);e.m.lock=.7}
    coneTelegraph(o,dir,20,.4,.9,0xa050ff,()=>{if(e.dead)return;for(let k=0;k<30;k++){const p=o.clone().addScaledVector(dir,k*.7).add(V3(rand(-1,1),1.2+rand(-.5,.5),rand(-1,1)));SP.emit(p,{n:2,c0:0xffffff,c1:0x8a30ff,speed:5,life:.5})}if(inCone(P.pos,o,dir,20,.4)){damagePlayer(e.dmg*2);P.chilled=2}})}
  if(a.tp<=0&&!lb){a.tp=rage?5:8;teleportNear(e,9,15)}};
/* ---------- the witch's Limit Breaker ---------- */
const LBU={uLB:{value:0},uHair:{value:0},uTat:{value:0}};
function lbPatch(mat,kind){if(!mat||mat.userData.lbp)return;mat.userData.lbp=1;const prev=mat.onBeforeCompile;const pk=mat.customProgramCacheKey;
  mat.onBeforeCompile=(sh,r)=>{if(prev)prev.call(mat,sh,r);sh.uniforms.uLB=LBU.uLB;sh.uniforms.uHair=LBU.uHair;sh.uniforms.uTat=LBU.uTat;
    sh.vertexShader=sh.vertexShader.replace('#include <common>','#include <common>\nvarying vec3 vLbP;varying vec2 vLbUv;').replace('#include <begin_vertex>','#include <begin_vertex>\nvLbP=position;vLbUv=uv;');
    let F='';if(kind==='cape')F=`{float rv=1.-smoothstep(uLB*1.35-.35,uLB*1.35,vLbUv.y);float band=step(.88,fract(vLbUv.y*6.+sin(vLbUv.x*9.)*.2));float edge=step(vLbUv.x,.06)+step(.94,vLbUv.x)+step(.93,vLbUv.y);float orn=step(.93,abs(sin(vLbUv.x*25.+sin(vLbUv.y*30.)*1.5)))*step(.55,vLbUv.y);vec3 gb=mix(vec3(.02,.016,.014),vec3(.7,.48,.12),clamp(band+edge+orn,0.,1.));diffuseColor.rgb=mix(diffuseColor.rgb,gb,rv*step(.001,uLB));}`;
    else if(kind==='hair')F=`{float st=step(.52,fract(vLbP.x*16.+vLbP.z*11.+sin(vLbP.y*24.)*.35));vec3 hb=mix(vec3(.98,.82,.42),vec3(.03,.025,.03),st);diffuseColor.rgb=mix(diffuseColor.rgb,hb*(.7+.3*dot(diffuseColor.rgb,vec3(.4))),uHair);}`;
    const T=`{vec3 p=vLbP*14.;float t1=abs(sin(p.y*3.8+sin(p.x*2.2)*1.8+sin(p.z*1.9)*1.3));float t2=abs(sin((p.x+p.z)*3.+p.y*1.2))*step(.6,fract(p.y*.3+.25));float tat=max(smoothstep(.975,.995,t1),smoothstep(.982,.997,t2))*TATK;float n=fract(sin(dot(floor(vLbP*14.),vec3(12.9898,78.233,37.719)))*43758.5453);float rv=smoothstep(0.,.2,uTat*1.25-n);diffuseColor.rgb=mix(diffuseColor.rgb,vec3(.04,.03,.03),tat*rv*.75);vLbTat=tat*rv;}`;
    sh.fragmentShader=sh.fragmentShader.replace('#include <common>','#include <common>\nvarying vec3 vLbP;varying vec2 vLbUv;uniform float uLB;uniform float uHair;uniform float uTat;float vLbTat=0.;')
      .replace('#include <color_fragment>','#include <color_fragment>\n'+F+(kind==='skin'?T.replace('TATK','1.'):kind==='outfit'?T.replace('TATK','.45'):''))
      .replace('#include <emissivemap_fragment>','#include <emissivemap_fragment>\ntotalEmissiveRadiance+=vec3(1.,.7,.2)*vLbTat*.6'+';')};
  mat.customProgramCacheKey=()=>(pk?pk.call(mat):'')+'|lb'+kind;mat.needsUpdate=true}
function lbPatchHero(W2,M){lbPatch(M.capeM,'cape');lbPatch(M.hairM,'hair');lbPatch(M.skinM,'skin');lbPatch(M.wm,'outfit');
  const gold=new THREE.Group();gold.visible=false;W2.g.add(gold);const rn=decal(runeTex,0xffc040,5.5,true,.9);rn.position.y=.08;gold.add(rn);const gl=glowSprite(0xffc040,5,.35);gl.position.y=1.2;gold.add(gl);
  const rn2=decal(runeTex,0xffe070,8.5,true,.5);rn2.position.y=.1;gold.add(rn2);
  const fl=[];for(const [r,h,col,sp] of [[1.0,3.4,0xffb020,1],[.75,2.8,0xfff0a0,1.5],[1.3,4.4,0xff8a10,.8]]){const m=new THREE.ShaderMaterial({uniforms:{uT:{value:0},uC:{value:new THREE.Color(col)},uA:{value:0},uS:{value:sp}},transparent:true,depthWrite:false,side:THREE.DoubleSide,blending:THREE.AdditiveBlending,
      vertexShader:'varying vec2 vU;void main(){vU=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}',
      fragmentShader:'uniform float uT,uA,uS;uniform vec3 uC;varying vec2 vU;float h(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}float n(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(h(i),h(i+vec2(1,0)),f.x),mix(h(i+vec2(0,1)),h(i+vec2(1,1)),f.x),f.y);}void main(){vec2 p=vec2(vU.x*16.,vU.y*3.-uT*uS*2.2);float f=n(p)*.55+n(p*2.3+3.)*.3+n(p*5.1+7.)*.15;float y=vU.y;float a=smoothstep(.5,.85,f+.18-y*.3)*pow(1.-y,1.4)*smoothstep(0.,.15,y);gl_FragColor=vec4(uC*(.8+f*.8),a*uA*.8);}'});
    const c=new THREE.Mesh(new THREE.CylinderGeometry(r*.55,r,h,28,1,true),m);c.position.y=h/2-.1;c.renderOrder=6;gold.add(c);fl.push(c)}
  const orb=[];for(let k=0;k<6;k++){const s=glowSprite(k%2?0xffd060:0xfff4d0,.22,.9);gold.add(s);orb.push(s)}
  W2.lbFx={gold,rn,gl,rn2,fl,orb}}
function lbSet(k){LBU.uLB.value=k;LBU.uHair.value=clamp(k*1.4-.2,0,1);LBU.uTat.value=clamp(k*1.2,0,1)}
function witchLimitBreak(story,anger){if(!started||!P.alive)return;P.lbT=20;P.lbRamp=0;P.invuln=Math.max(P.invuln,1.2);P.hp=Math.max(P.hp,maxHP()*.25);const c=P.pos.clone();const col=0xffc040;
  const fx=()=>{flash(c,col,16);P.shake=1.1;ring(P.pos,col,1,12,.8);runeFlash(P.pos,col,14,2);SP.emit(V3(P.pos.x,P.pos.y+1.2,P.pos.z),{n:220,c0:0xffffff,c1:col,speed:14,life:1.1,s0:.8,s1:.1,grav:1});sfx.level();sfx.boom&&sfx.boom();vib([80,40,160])};
  if(story){const mid=()=>({pos:headOf(P.pos,1.6).add(V3(Math.sin(P.face)*2.4,0,Math.cos(P.face)*2.4)),look:headOf(P.pos,1.5)});
    playCutscene([{who:'@',text:anger?'You... killed him... YOU WILL PAY FOR HIM!!!':'He broke his limits... then so will I.',fov:34,cam:mid,cut:true,onStart:()=>{P.heroAnim='Spell_Simple_Idle_Loop'}},
      {dur:3.4,fov:46,title:[HERO.name,'Limit Breaker'],cam:k=>{const a=P.face+k*2.4;return{pos:V3(P.pos.x+Math.sin(a)*5,P.pos.y+1.8+k,P.pos.z+Math.cos(a)*5),look:headOf(P.pos,1.2)}},onStart:fx,update:dt=>{P.lbRamp=Math.min(1,(P.lbRamp||0)+dt*.45);lbSet(P.lbRamp)}},
      {who:'@',text:anger?'For Bilel. Twenty seconds is all I need.':'Twenty seconds. That is all I need.',fov:36,cam:mid,update:dt=>{P.lbRamp=Math.min(1,(P.lbRamp||0)+dt*.45);lbSet(P.lbRamp)}}],
      ()=>{P.heroAnim=null;toast('Damage taken -50% · speed +50% · attacks +35% · flight +30%. 20 seconds.','Limit Breaker',true)})}
  else{fx();toast('Damage taken -50% · speed +50% · attacks +35% · flight +30%','Limit Breaker',true)}}
let lbBadge=null;
function lbTick(dt){finTick(dt);if(W.lbFx){FIN.boost=Math.max(0,(FIN.boost||0)-dt*.12);W.lbFx.gold.scale.set(1+FIN.boost*.45,1+FIN.boost*.55,1+FIN.boost*.45)}const on=P.lbT>0;if(on){P.lbT-=dt;P.lbRamp=Math.min(1,(P.lbRamp||0)+dt*.35);if(P.lbT<=0){P.lbT=0;toast('Your limit breaker fades.')}}else P.lbRamp=Math.max(0,(P.lbRamp||0)-dt*.5);
  lbSet(P.lbRamp||0);if(W.lbFx){W.lbFx.gold.visible=(P.lbRamp||0)>.02;W.lbFx.rn.rotation.z+=dt*2;W.lbFx.gl.material.opacity=.45*(P.lbRamp||0)+Math.sin(time*8)*.06;const R=P.lbRamp||0;
    if(W.lbFx.rn2){W.lbFx.rn2.rotation.z-=dt*1.2;W.lbFx.rn2.material.opacity=.5*R;W.lbFx.gl.scale.setScalar(6+Math.sin(time*6)*.5);
      W.lbFx.fl.forEach((c,i)=>{c.material.uniforms.uT.value=time;c.material.uniforms.uA.value=R*(i===2?.6:.85)*(.85+Math.sin(time*11+i)*.15);c.scale.set(1+Math.sin(time*7+i)*.05,1,1+Math.cos(time*6+i)*.05);c.position.y=(W.g.position.y>P.pos.y+.1?0:0)+c.geometry.parameters.height/2-.1});
      W.lbFx.orb.forEach((s,i)=>{const a=time*(2.2+i*.15)+i*TAU/6;const r=1.1+Math.sin(time*3+i)*.2;s.position.set(Math.sin(a)*r,.6+((time*.9+i/6)%1)*2.6,Math.cos(a)*r);s.material.opacity=R*.9})}}
  if(on&&Math.random()<dt*3){const a=Math.random()*TAU;lightning(V3(P.pos.x,P.pos.y+2.6,P.pos.z),V3(P.pos.x+Math.sin(a)*1.6,P.pos.y+rand(.2,1.5),P.pos.z+Math.cos(a)*1.6),Math.random()<.5?0xffd060:0xfff4c0)}
  if(on&&Math.random()<dt*8)SP.emit(V3(P.pos.x+rand(-.5,.5),P.pos.y+.1,P.pos.z+rand(-.5,.5)),{n:3,c0:0xffd070,c1:0x402000,s0:.6,s1:.1,life:.6,speed:3,flat:true});
  if(on&&Math.random()<dt*45)SP.emit(V3(P.pos.x+rand(-1.1,1.1),P.pos.y+rand(0,2.4),P.pos.z+rand(-1.1,1.1)),{c0:Math.random()<.3?0x201000:0xffe8a0,c1:0x301800,s0:.5,s1:.05,life:.9,up:3,speed:.6});
  if(!lbBadge){lbBadge=document.createElement('div');lbBadge.style.cssText='position:absolute;left:50%;top:calc(44px + env(safe-area-inset-top,0px));transform:translateX(-50%);padding:4px 12px;border-radius:999px;background:linear-gradient(90deg,#1a1206,#3a2808);color:#ffd070;font:700 12px Outfit,system-ui,sans-serif;letter-spacing:.08em;pointer-events:none;box-shadow:0 0 16px rgba(255,190,60,.45);display:none';$('hud').appendChild(lbBadge)}
  lbBadge.style.display=on?'':'none';if(on)lbBadge.textContent=`LIMIT BREAKER ${Math.ceil(P.lbT)}s`}
