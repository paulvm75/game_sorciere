/* ================= SPELLS v2: shared premium FX (energy orbs, ribbon trails, thick lightning, soft shockwaves, volumetric blasts) ================= */
const SPX=(()=>{
  const NOI=`float h3(vec3 p){p=fract(p*.3183099+.1);p*=17.;return fract(p.x*p.y*p.z*(p.x+p.y+p.z));}
float n3(vec3 x){vec3 i=floor(x),f=fract(x);f=f*f*(3.-2.*f);
return mix(mix(mix(h3(i),h3(i+vec3(1,0,0)),f.x),mix(h3(i+vec3(0,1,0)),h3(i+vec3(1,1,0)),f.x),f.y),mix(mix(h3(i+vec3(0,0,1)),h3(i+vec3(1,0,1)),f.x),mix(h3(i+vec3(0,1,1)),h3(i+vec3(1,1,1)),f.x),f.y),f.z);}
float fbm(vec3 p){float a=.5,s=0.;for(int i=0;i<4;i++){s+=a*n3(p);p=p*2.03+vec3(1.7,9.2,3.1);a*=.5;}return s;}`;
  const C=c=>new THREE.Color(c);
  const add={transparent:true,depthWrite:false,blending:THREE.AdditiveBlending};
  /* ---------- energy orb: fresnel rim + swirling plasma ---------- */
  const ORB_VS=`varying vec3 vN;varying vec3 vW;varying vec3 vP;void main(){vP=position;vec4 w=modelMatrix*vec4(position,1.);vW=w.xyz;vN=normalize(mat3(modelMatrix)*normal);gl_Position=projectionMatrix*viewMatrix*w;}`;
  const ORB_FS=`uniform float uT;uniform vec3 uA;uniform vec3 uB;uniform float uO;varying vec3 vN;varying vec3 vW;varying vec3 vP;${NOI}
void main(){vec3 V=normalize(cameraPosition-vW);float f=1.-abs(dot(normalize(vN),V));
float s=fbm(vP*3.+vec3(0.,-uT*3.,uT*1.7));float sw=smoothstep(.35,.8,s);
vec3 c=mix(uB,uA,sw)*(.55+.9*f)+uA*pow(f,3.)*1.6+vec3(1.)*pow(1.-f,6.)*.9;
gl_FragColor=vec4(c,uO*(.55+.45*sw+f*.4));}`;
  function orbMat(a,b){const m=new THREE.ShaderMaterial({uniforms:{uT:{value:0},uA:{value:C(a)},uB:{value:C(b)},uO:{value:1}},vertexShader:ORB_VS,fragmentShader:ORB_FS,...add});return m}
  const sph=new THREE.IcosahedronGeometry(1,3);sph.__shared=true;
  /* ---------- ribbon trail (camera facing strip, history of positions) ---------- */
  const RB_VS=`attribute float aT;attribute float aS;varying float vT;varying float vS;void main(){vT=aT;vS=aS;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`;
  const RB_FS=`uniform vec3 uA;uniform vec3 uB;uniform float uO;uniform float uT;varying float vT;varying float vS;
float h(float x){return fract(sin(x*91.7)*43758.5);}
void main(){float e=1.-abs(vS);e=e*e*(3.-2.*e);float k=pow(1.-vT,1.6);
float fl=.75+.25*sin(vT*40.-uT*30.);vec3 c=mix(uB,uA,k)+vec3(1.)*pow(e,6.)*k*.6;
gl_FragColor=vec4(c*fl,uO*e*k);}`;
  const _v=new THREE.Vector3(),_d=new THREE.Vector3(),_s=new THREE.Vector3();
  function ribbon(src,o){const N=o.n||22,W=o.w||.4;const pos=new Float32Array(N*2*3),aT=new Float32Array(N*2),aS=new Float32Array(N*2),idx=[];
    for(let i=0;i<N;i++){aT[i*2]=aT[i*2+1]=i/(N-1);aS[i*2]=-1;aS[i*2+1]=1;if(i<N-1){const a=i*2;idx.push(a,a+1,a+2,a+1,a+3,a+2)}}
    const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.BufferAttribute(pos,3));g.setAttribute('aT',new THREE.BufferAttribute(aT,1));g.setAttribute('aS',new THREE.BufferAttribute(aS,1));g.setIndex(idx);
    const m=new THREE.ShaderMaterial({uniforms:{uA:{value:C(o.a)},uB:{value:C(o.b||o.a)},uO:{value:o.op||1},uT:{value:0}},vertexShader:RB_VS,fragmentShader:RB_FS,...add,side:THREE.DoubleSide});
    const mesh=new THREE.Mesh(g,m);mesh.frustumCulled=false;mesh.renderOrder=3;
    const hist=[];let gone=0,last=0;const p0=src();for(let i=0;i<N;i++)hist.push(p0.clone());
    addFx(mesh,60,(f)=>{const dt=Math.max(.001,f.t-last);last=f.t;m.uniforms.uT.value=f.t;
      const alive=o.alive?o.alive():true;
      if(alive){const p=src();const head=hist.pop();head.copy(p);if(o.wig){_d.subVectors(p,hist[0]);const L=_d.length()||1;_s.set(-_d.z/L,0,_d.x/L).multiplyScalar(Math.sin(f.t*o.wig)*o.wa);head.add(_s)}hist.unshift(head)}
      else{gone+=dt;hist.unshift(hist.pop().copy(hist[0]));m.uniforms.uO.value=(o.op||1)*Math.max(0,1-gone/.35);if(gone>.36){f.t=f.dur;return}}
      const cp=camera.position;
      for(let i=0;i<N;i++){const a=hist[Math.max(0,i-1)],b=hist[Math.min(N-1,i+1)];_d.subVectors(a,b);_v.subVectors(cp,hist[i]);_s.crossVectors(_d,_v);const l=_s.length();if(l<1e-5)_s.set(0,1,0);else _s.multiplyScalar(1/l);
        const w=W*(o.taper===false?1:(1-i/(N-1)*.85))*(i===0?.5:1);const q=hist[i];pos[i*6]=q.x-_s.x*w;pos[i*6+1]=q.y-_s.y*w;pos[i*6+2]=q.z-_s.z*w;pos[i*6+3]=q.x+_s.x*w;pos[i*6+4]=q.y+_s.y*w;pos[i*6+5]=q.z+_s.z*w}
      g.attributes.position.needsUpdate=true});return mesh}
  /* ---------- thick lightning: jagged strip, hot core, soft halo, forks ---------- */
  const LB_VS=`attribute float aS;attribute float aT;varying float vS;varying float vT;void main(){vS=aS;vT=aT;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`;
  const LB_FS=`uniform vec3 uC;uniform float uO;varying float vS;varying float vT;void main(){float x=abs(vS);float core=exp(-x*x*60.);float halo=exp(-x*x*5.);
vec3 c=vec3(1.)*core*1.4+uC*halo*.9;float a=(core+halo*.55)*uO*smoothstep(0.,.04,vT)*smoothstep(1.,.92,vT);gl_FragColor=vec4(c*a,a);}`;
  function jag(a,b,depth,amp){let pts=[a.clone(),b.clone()];for(let d=0;d<depth;d++){const np=[pts[0]];for(let i=0;i<pts.length-1;i++){const m=V3().lerpVectors(pts[i],pts[i+1],.5);const L=pts[i].distanceTo(pts[i+1])*amp;m.x+=rand(-L,L);m.y+=rand(-L,L)*.7;m.z+=rand(-L,L);np.push(m,pts[i+1])}pts=np}return pts}
  function strip(pts,w,col,op){const N=pts.length,pos=new Float32Array(N*6),aS=new Float32Array(N*2),aT=new Float32Array(N*2),idx=[];const cp=camera.position;
    for(let i=0;i<N;i++){const a=pts[Math.max(0,i-1)],b=pts[Math.min(N-1,i+1)];_d.subVectors(b,a);_v.subVectors(cp,pts[i]);_s.crossVectors(_d,_v).normalize().multiplyScalar(w);
      const q=pts[i];pos.set([q.x-_s.x,q.y-_s.y,q.z-_s.z,q.x+_s.x,q.y+_s.y,q.z+_s.z],i*6);aS[i*2]=-1;aS[i*2+1]=1;aT[i*2]=aT[i*2+1]=i/(N-1);if(i<N-1){const k=i*2;idx.push(k,k+1,k+2,k+1,k+3,k+2)}}
    const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.BufferAttribute(pos,3));g.setAttribute('aS',new THREE.BufferAttribute(aS,1));g.setAttribute('aT',new THREE.BufferAttribute(aT,1));g.setIndex(idx);
    const m=new THREE.ShaderMaterial({uniforms:{uC:{value:C(col)},uO:{value:op}},vertexShader:LB_VS,fragmentShader:LB_FS,...add,side:THREE.DoubleSide});const me=new THREE.Mesh(g,m);me.frustumCulled=false;me.renderOrder=4;return me}
  function bolt(a,b,col,w=.32,life=.32){const g=new THREE.Group();const L=a.distanceTo(b);const pts=jag(a,b,L>12?5:4,.22);g.add(strip(pts,w,col,1));
    const nb=L>6?(1+(Math.random()*2|0)):0;for(let k=0;k<nb;k++){const i=(pts.length*rand(.25,.7))|0;const s=pts[i];const e=s.clone().add(V3(rand(-1,1),rand(-1,.2),rand(-1,1)).multiplyScalar(L*rand(.15,.3)));g.add(strip(jag(s,e,3,.3),w*.55,col,.8))}
    const fl=glowSprite(col,Math.min(9,2.5+w*10),.9);fl.position.copy(b);g.add(fl);
    addFx(g,life,(f,k)=>{const o=(1-k*k)*(Math.random()<.25?.35:1);g.children.forEach(c=>{if(c.material.uniforms)c.material.uniforms.uO.value=o;else c.material.opacity=o})});return g}
  /* ---------- soft shockwave ring (flat, noisy, with a fading wake) ---------- */
  const SW_VS=`varying vec2 vU;void main(){vU=uv*2.-1.;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`;
  const SW_FS=`uniform vec3 uC;uniform float uO;uniform float uT;varying vec2 vU;${NOI}
void main(){float r=length(vU);float a=atan(vU.y,vU.x);float n=fbm(vec3(cos(a)*3.,sin(a)*3.,uT*2.))*.08;float rr=r+n;
float band=smoothstep(.78,.95,rr)*smoothstep(1.,.95,rr);float wake=smoothstep(.2,.95,rr)*step(rr,.97)*.22;
float al=(band+wake)*uO;gl_FragColor=vec4(uC*al*1.4+vec3(1.)*band*band*uO*.35,al);}`;
  const swGeo=new THREE.PlaneGeometry(2,2);swGeo.__shared=true;
  function shock(pos,col,from,to,dur,hold){const m=new THREE.ShaderMaterial({uniforms:{uC:{value:fxCol(col,.85)},uO:{value:1},uT:{value:0}},vertexShader:SW_VS,fragmentShader:SW_FS,...add,side:THREE.DoubleSide});
    const me=new THREE.Mesh(swGeo,m);me.rotation.x=-Math.PI/2;me.position.set(pos.x,(pos.y||0)+.3,pos.z);me.scale.setScalar(from);me.renderOrder=2;
    addFx(me,dur,(f,k)=>{m.uniforms.uT.value=f.t;if(hold){me.scale.setScalar(lerp(from,to,Math.min(1,k*4)));m.uniforms.uO.value=.6+.4*Math.sin(k*30)}else{me.scale.setScalar(lerp(from,to,1-Math.pow(1-k,3)));m.uniforms.uO.value=1-k*k}});return me}
  /* ---------- volumetric blast: displaced noisy sphere that burns from white to color to smoke ---------- */
  const BL_VS=`uniform float uT;uniform float uK;varying vec3 vN;varying vec3 vW;varying float vD;${NOI}
void main(){vec3 p=position;float d=fbm(p*2.2+vec3(0.,-uT*2.,0.));vD=d;p*=1.+d*.55*(.4+uK);vec4 w=modelMatrix*vec4(p,1.);vW=w.xyz;vN=normalize(mat3(modelMatrix)*normal);gl_Position=projectionMatrix*viewMatrix*w;}`;
  const BL_FS=`uniform float uK;uniform vec3 uC;uniform vec3 uS;varying vec3 vN;varying vec3 vW;varying float vD;
void main(){vec3 V=normalize(cameraPosition-vW);float f=abs(dot(normalize(vN),V));float heat=clamp(vD*1.6-uK*1.25+.35,0.,1.);
vec3 c=mix(uS,uC,smoothstep(.05,.5,heat));c=mix(c,vec3(1.,.97,.85),smoothstep(.6,1.,heat));
float a=(1.-smoothstep(.4,1.,uK))*(1.-f*.7)*smoothstep(.3,.6,vD+heat*.4)*.6;gl_FragColor=vec4(c*(.35+heat*1.1)*a,a);}`;
  function blast(pos,r,col,smoke){const m=new THREE.ShaderMaterial({uniforms:{uT:{value:0},uK:{value:0},uC:{value:C(col)},uS:{value:C(smoke==null?0x2a1810:smoke)}},vertexShader:BL_VS,fragmentShader:BL_FS,...add});
    const me=new THREE.Mesh(sph,m);me.position.set(pos.x,pos.y+r*.25,pos.z);me.scale.setScalar(.1);me.renderOrder=2;
    r=Math.min(r,8);addFx(me,.75,(f,k)=>{m.uniforms.uT.value=f.t;m.uniforms.uK.value=k;me.scale.setScalar(r*(.15+.5*(1-Math.pow(1-k,3))));me.position.y=pos.y+r*(.25+k*.25)});return me}
  /* ---------- flame column (scrolling fbm on an open cone) ---------- */
  const FC_VS=`varying vec2 vU;varying vec3 vN;varying vec3 vW;void main(){vU=uv;vec4 w=modelMatrix*vec4(position,1.);vW=w.xyz;vN=normalize(mat3(modelMatrix)*normal);gl_Position=projectionMatrix*viewMatrix*w;}`;
  const FC_FS=`uniform float uT;uniform float uO;uniform vec3 uA;uniform vec3 uB;varying vec2 vU;varying vec3 vN;varying vec3 vW;${NOI}
void main(){float y=vU.y;float n=fbm(vec3(vU.x*6.,y*3.-uT*2.4,uT*.6));float n2=fbm(vec3(vU.x*12.+3.,y*6.-uT*4.,1.));
float v=n*.7+n2*.5;float fl=smoothstep(.52+y*.35,.72+y*.35,v);vec3 V=normalize(cameraPosition-vW);float side=abs(dot(normalize(vN),V));
vec3 c=mix(uB,uA,smoothstep(.55,.95,v))+vec3(1.,.85,.5)*pow(fl,6.)*.3;float a=fl*(1.-y)*(1.-y)*uO*side*side*.75;gl_FragColor=vec4(c*a,a);}`;
  function flameMat(a,b){return new THREE.ShaderMaterial({uniforms:{uT:{value:0},uO:{value:0},uA:{value:C(a)},uB:{value:C(b)}},vertexShader:FC_VS,fragmentShader:FC_FS,...add,side:THREE.DoubleSide})}
  /* ---------- detailed sigil (magic circle) drawn once ---------- */
  const sigil=canvasTex(1024,1024,x=>{x.translate(512,512);x.strokeStyle='#fff';x.fillStyle='#fff';x.lineCap='round';
    const circ=(r,w)=>{x.lineWidth=w;x.beginPath();x.arc(0,0,r,0,TAU);x.stroke()};circ(500,6);circ(470,3);circ(330,5);circ(300,2);circ(140,4);
    x.font='bold 46px serif';x.textAlign='center';x.textBaseline='middle';const gl='ᚠᚢᚦᚨᚱᚲᚷᚹᚺᚾᛁᛃᛇᛈᛉᛊᛏᛒᛖᛗᛚᛜᛞᛟ';for(let i=0;i<24;i++){x.save();x.rotate(i/24*TAU);x.fillText(gl[i],0,-400);x.restore()}
    for(let s=0;s<2;s++){x.lineWidth=4;x.beginPath();for(let i=0;i<=3;i++){const a=i/3*TAU+s*Math.PI/3-Math.PI/2;x.lineTo(Math.cos(a)*330,Math.sin(a)*330)}x.stroke()}
    x.lineWidth=2;for(let i=0;i<12;i++){const a=i/12*TAU;x.beginPath();x.moveTo(Math.cos(a)*140,Math.sin(a)*140);x.lineTo(Math.cos(a)*300,Math.sin(a)*300);x.stroke();x.beginPath();x.arc(Math.cos(a)*230,Math.sin(a)*230,14,0,TAU);x.stroke()}
    for(let i=0;i<60;i++){const a=i/60*TAU;x.lineWidth=i%5?2:5;x.beginPath();x.moveTo(Math.cos(a)*470,Math.sin(a)*470);x.lineTo(Math.cos(a)*(i%5?450:435),Math.sin(a)*(i%5?450:435));x.stroke()}
    const g=x.createRadialGradient(0,0,0,0,0,140);g.addColorStop(0,'rgba(255,255,255,.55)');g.addColorStop(1,'rgba(255,255,255,0)');x.fillStyle=g;x.beginPath();x.arc(0,0,140,0,TAU);x.fill()});
  function circle(pos,col,size,dur,spin=1){const d=decal(sigil,col,size,true,1);d.position.set(pos.x,(pos.y||0)+.12,pos.z);d.renderOrder=1;
    addFx(d,dur,(f,k)=>{d.rotation.z=f.t*.9*spin;const a=k<.12?k/.12:k>.75?(1-k)/.25:1;d.material.opacity=a*.6;d.scale.setScalar(.7+.3*Math.min(1,k/.12))});return d}
  /* ---------- star flare sprite ---------- */
  function flare(col,s,op=1){const m=new THREE.SpriteMaterial({map:typeof JU_FLARE!=='undefined'?JU_FLARE:glowTex,color:col,...add,opacity:op});const sp=new THREE.Sprite(m);sp.scale.setScalar(s);return sp}
  return {orbMat,sph,ribbon,bolt,shock,blast,flameMat,circle,flare,sigil,jag}})();

/* ---------- global upgrades: every caller (spells and bosses) gets thick lightning and soft shockwaves ---------- */
lightning=function(a,b,color){SPX.bolt(a,b,color,.3,.3);SP.emit(b,{n:16,c0:0xffffff,c1:color,speed:7,life:.4,s0:.6,s1:.08,grav:6})};
ring=function(pos,color,from,to,dur,hold){SPX.shock(pos,color,from,to,dur,hold)};
{const _ex=explode;explode=function(pos,r,dmg,color,big,exclude,onHit){const R=_ex.apply(this,arguments);try{const fire=color===0xff5a2a||color===0xff7a2e;
  SPX.blast(pos,r*(big?1:.8),fire?0xff8a2a:color,fire?0x2a1208:new THREE.Color(color).multiplyScalar(.15).getHex());
  if(big){SPX.shock(pos,0xffffff,.5,r*1.6,.6);SP.emit(V3(pos.x,pos.y+.5,pos.z),{n:40,c0:0xfff4d0,c1:fire?0xff4000:color,speed:18,up:9,grav:24,life:1.1,s0:.45,s1:.05,jitter:.4})}
  const rf=Math.min(r,6);const fl=SPX.flare(fire?0xffd090:color,rf*2,.7);fl.position.set(pos.x,pos.y+1,pos.z);addFx(fl,.22,(f,k)=>{fl.material.opacity=.7*(1-k);fl.scale.setScalar(rf*(2+k*1.2))})}catch(x){}return R}}

/* ---------- projectiles: plasma cores and ribbon trails per spell ---------- */
const SPX_PROJ={
  0xc9a6ff:{a:0xe6d4ff,b:0x5a22d0,core:.42,w:.32,n:20},   /* arcane bolt */
  0xff7a2e:{a:0xffe0a0,b:0xff3a00,core:.75,w:.75,n:26,smoke:1},   /* fireball */
  0x8fe3ff:{a:0xe8fbff,b:0x3aa8ff,w:.3,n:24,ice:1},   /* ice lance */
  0x6ae04a:{a:0xd8ff90,b:0x1e7a10,core:.5,w:.5,n:30,wig:18,wa:.35}};   /* venom serpent */
let SPX_ICEGEO=null;
{const _mp=makeProj;makeProj=function(o){const p=_mp.apply(this,arguments);try{const S=SPX_PROJ[o.color];if(!S)return p;const g=p.g;
  if(S.ice&&o.mesh){if(!SPX_ICEGEO){SPX_ICEGEO=ICE2.geo.clone();SPX_ICEGEO.translate(0,-.45,0);SPX_ICEGEO.rotateX(Math.PI/2);SPX_ICEGEO.setAttribute("aK",new THREE.BufferAttribute(new Float32Array(SPX_ICEGEO.attributes.position.count),1));SPX_ICEGEO.__shared=true}o.mesh.geometry=SPX_ICEGEO;o.mesh.material=ICE2.mat;o.mesh.scale.set(1.5,1.5,2.4)}
  else if(S.core){const core=g.children.find(c=>c.isMesh);const m=SPX.orbMat(S.a,S.b);if(core){core.geometry=SPX.sph;core.material=m;core.scale.setScalar(S.core)}
    const fl=SPX.flare(S.a,S.core*5,.75);g.add(fl);p._spx={m,fl}}
  SPX.ribbon(()=>p.pos,{a:S.a,b:S.b,w:S.w,n:S.n,wig:S.wig,wa:S.wa,alive:()=>!!p.g.parent})}catch(x){}return p}}
{const _mt=muTick;muTick=function(dt){_mt(dt);for(const p of projs){if(p._spx){p._spx.m.uniforms.uT.value=time;p._spx.fl.material.rotation+=dt*4}}
  if(W.shieldM&&W.shieldM.material.uniforms){const u=W.shieldM.material.uniforms;u.uT.value=time;u.uO.value=W.shieldM.material.opacity;u.uH.value=W.shieldM.userData.hit||0}}}

/* ---------- per-spell layers (damage and timing untouched) ---------- */
{const C0=CAST;
  /* arcane bolt: a small spinning sigil at the hand */
  const _bolt=C0.bolt;C0.bolt=function(t){const r=_bolt.apply(this,arguments);try{const o=orbPos();const s=SPX.flare(0xd8c0ff,2.2,.8);s.position.copy(o);addFx(s,.16,(f,k)=>{s.material.opacity=.8*(1-k);s.scale.setScalar(2.2+k*2)})}catch(x){}return r};
  /* fireball: muzzle burst */
  const _fire=C0.fire;C0.fire=function(t){const r=_fire.apply(this,arguments);try{const o=orbPos();FL.emit(o,{n:18,c0:0xfff0b0,c1:0xff3000,s0:1.4,s1:.2,life:.35,speed:5,up:1});const s=SPX.flare(0xffb060,4,.8);s.position.copy(o);addFx(s,.2,(f,k)=>{s.material.opacity=.8*(1-k)})}catch(x){}return r};
  /* shadow chains: a turning sigil under you, a violet pillar on every bound foe */
  const _ch=C0.chains;C0.chains=function(){const c=P.pos.clone();const r=_ch.apply(this,arguments);try{SPX.circle(c,0xa060ff,22,1.6);
    for(const e of enemies){if(e.dead||!(e.rooted>0)||e.pos.distanceTo(c)>17)continue;SPX.circle(e.pos,0x9a50ff,e.def.r*4+3,2.2,-1.6);
      const pl=new THREE.Mesh(new THREE.CylinderGeometry(e.def.r*.9,e.def.r*1.2,e.def.h*2.2,24,1,true),SPX.flameMat(0xe0b0ff,0x4a10a0));pl.position.set(e.pos.x,e.pos.y+e.def.h*1.1,e.pos.z);
      addFx(pl,1.1,(f,k)=>{pl.material.uniforms.uT.value=f.t;pl.material.uniforms.uO.value=k<.15?k/.15:1-(k-.15)/.85})}}catch(x){}return r};
  /* chain lightning: arcs flare at each hop */
  const _cl=C0.chain;C0.chain=function(t){const r=_cl.apply(this,arguments);try{const o=orbPos();const s=SPX.flare(0xe6f0ff,5,1);s.position.copy(o);addFx(s,.18,(f,k)=>{s.material.opacity=1-k})}catch(x){}return r};
  /* inferno: a living fire tornado that follows you */
  const _inf=C0.inferno;C0.inferno=function(){const r=_inf.apply(this,arguments);try{const g=new THREE.Group();const mats=[];
    for(let i=0;i<2;i++){const m=SPX.flameMat(i?0xffa040:0xffd080,0xc01800);mats.push(m);const cn=new THREE.Mesh(new THREE.CylinderGeometry(2.6+i*1.1,1.2+i*.7,4.6-i*.8,32,1,true),m);cn.position.y=(4.6-i*.8)/2;cn.userData.sp=(i%2?-1:1)*(1.6+i*.5);g.add(cn)}
    const ci=SPX.circle(P.pos,0xff6a20,16,5.5);
    addFx(g,5.5,(f,k)=>{g.position.set(P.pos.x,P.pos.y,P.pos.z);ci.position.set(P.pos.x,P.pos.y+.12,P.pos.z);const a=k<.08?k/.08:k>.85?(1-k)/.15:1;
      for(const c of g.children){c.rotation.y+=c.userData.sp/60}for(const m of mats){m.uniforms.uT.value=f.t;m.uniforms.uO.value=a*(P.inferno>0?1:0)}
      if(Math.random()<.6)FL.emit(V3(P.pos.x+rand(-2.5,2.5),P.pos.y+rand(.2,1),P.pos.z+rand(-2.5,2.5)),{n:2,c0:0xfff0b0,c1:0xff2000,s0:1.2,s1:.2,life:.6,up:5,speed:.6});if(P.inferno<=0)f.t=Math.max(f.t,f.dur-.01)})}catch(x){}return r};
  /* meteor: lava rock with a long burning tail and a warning circle */
  C0.meteor=function(t){const at=t?t.pos.clone():P.pos.clone().add(V3(Math.sin(P.face),0,Math.cos(P.face)).multiplyScalar(13));at.y=groundAt(at.x,at.z);
    SPX.shock(at,0xff4b2b,10,10,1,true);SPX.circle(at,0xff4b2b,22,1.15,2);const start=at.clone().add(V3(14,55,8));
    const rock=new THREE.Group();const core=new THREE.Mesh(SPX.sph,SPX.orbMat(0xffc060,0x6a0c00));core.scale.setScalar(1.9);rock.add(core);
    const crust=new THREE.Mesh(G.shard,MAT.bossStone);crust.scale.setScalar(1.75);rock.add(crust);rock.add(glowSprite(0xff5a2a,16));const fl=SPX.flare(0xffa040,10,.8);rock.add(fl);rock.position.copy(start);
    SPX.ribbon(()=>rock.position,{a:0xffd080,b:0xff2000,w:2.6,n:30,alive:()=>!!rock.parent});SPX.ribbon(()=>rock.position,{a:0x6a5a5a,b:0x201818,w:4,n:34,op:.35,alive:()=>!!rock.parent});
    addFx(rock,1,(f,k)=>{rock.position.lerpVectors(start,at,k*k);crust.rotation.x+=.2;crust.rotation.z+=.13;core.material.uniforms.uT.value=f.t;
      FL.emit(rock.position,{n:6,c0:0xfff0c0,c1:0xff2000,s0:3,s1:.6,life:.6,speed:1.5,jitter:.6});SM.emit(rock.position,{n:2,c0:0x3a3038,c1:0x0a080a,s0:2,s1:6,life:1.6,a:.5})},
      ()=>{explode(at,10,180*power(),0xff5a2a,true,null,e=>burn(e,4,18*power()));groundMark(scorchTex,at,0xffffff,18,8,false,.9);P.shake=1.2;
        for(let i=0;i<10;i++){const m=new THREE.Mesh(G.shard,MAT.bossStone);const s=rand(.25,.6);m.scale.set(s,s*1.4,s);m.position.set(at.x,at.y+1,at.z);const v=V3(rand(-1,1),rand(.8,1.6),rand(-1,1)).multiplyScalar(rand(7,13));const sp=V3(rand(-8,8),rand(-8,8),rand(-8,8));
          addFx(m,rand(1.1,1.6),(f,k)=>{const dt=1/60;v.y-=26*dt;m.position.addScaledVector(v,dt);const gy=groundAt(m.position.x,m.position.z);if(m.position.y<gy+.2){m.position.y=gy+.2;v.multiplyScalar(.35);v.y=Math.abs(v.y)}m.rotation.x+=sp.x*dt;m.rotation.y+=sp.y*dt;if(Math.random()<.4)FL.emit(m.position,{n:1,c0:0xffc080,c1:0xff2000,s0:.6,s1:.1,life:.3})})}});sfx.meteor()};
  /* void well: an event horizon with a swirling accretion disk */
  const VD_FS=`uniform float uT;uniform float uO;varying vec2 vU;float h(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5);}
float n(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(h(i),h(i+vec2(1,0)),f.x),mix(h(i+vec2(0,1)),h(i+vec2(1,1)),f.x),f.y);}
void main(){vec2 p=vU*2.-1.;float r=length(p);float a=atan(p.y,p.x);float sw=n(vec2(a*4.+r*9.-uT*5.,r*6.))*.6+n(vec2(a*9.-uT*8.,r*14.))*.4;
float disk=smoothstep(.28,.42,r)*smoothstep(1.,.55,r);float lum=disk*(.35+sw*1.1)*(1.3-r);vec3 c=mix(vec3(.25,.05,.6),vec3(.95,.8,1.),pow(sw*(1.1-r),2.))*lum;
float hole=smoothstep(.3,.26,r);c*=1.-hole;float al=(lum+hole)*uO;gl_FragColor=vec4(c,al);}`;
  const _vd=C0.void;C0.void=function(t){const n0=fxList.length;const r=_vd.apply(this,arguments);try{const F=fxList.slice(n0).find(f=>f.obj&&f.obj.isGroup);if(F){const g=F.obj;const core=g.children.find(c=>c.isMesh&&c.geometry===G.sphere);const disk=g.children.find(c=>c.isMesh&&c!==core);
      const vm=new THREE.ShaderMaterial({uniforms:{uT:{value:0},uO:{value:0}},vertexShader:`varying vec2 vU;void main(){vU=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`,fragmentShader:VD_FS,transparent:true,depthWrite:false,side:THREE.DoubleSide});
      if(disk){disk.geometry=new THREE.PlaneGeometry(9,9);disk.material=vm}
      if(core){core.material=SPX.orbMat(0xc090ff,0x000000);core.material.blending=THREE.NormalBlending;core.material.uniforms.uO.value=1}
      const ci=SPX.circle(V3(g.position.x,g.position.y-2.4,g.position.z),0x8040ff,30,4.2,-.6);const u0=F.update;
      F.update=(f,k)=>{u0(f,k);vm.uniforms.uT.value=f.t;vm.uniforms.uO.value=Math.min(1,k*10)*(k>.92?(1-k)/.08:1);if(core)core.material.uniforms.uT.value=f.t}}}catch(x){}return r};
  /* thunderstorm: a real cloud bank that lights up from inside */
  const _st=C0.storm;C0.storm=function(){const r=_st.apply(this,arguments);try{const g=new THREE.Group();const ss=[];
    for(let i=0;i<16;i++){const m=new THREE.SpriteMaterial({map:smokeTex,color:0x2a2c40,transparent:true,opacity:0,depthWrite:false});const s=new THREE.Sprite(m);const a=rand(0,TAU),rr=rand(0,10);s.position.set(Math.cos(a)*rr,rand(-1,2),Math.sin(a)*rr);s.scale.setScalar(rand(9,15));s.userData.r=rand(-.3,.3);g.add(s);ss.push(s)}
    const lt=new THREE.PointLight(0xaac4ff,0,60,1.4);g.add(lt);
    addFx(g,5.2,(f,k)=>{g.position.set(P.pos.x,P.pos.y+17,P.pos.z);const a=k<.1?k/.1:k>.85?(1-k)/.15:1;const zap=Math.random()<.07;lt.intensity=zap?6:lt.intensity*.85;
      for(const s of ss){s.material.opacity=.75*a;s.material.rotation+=s.userData.r/60;s.material.color.setHex(zap?0x8a90c0:0x2a2c40)}})}catch(x){}return r};
  /* aegis: hexagonal honeycomb shell with a fresnel rim, flares when it takes a hit */
  const AE_VS=`varying vec3 vN;varying vec3 vW;varying vec3 vP;void main(){vP=position;vec4 w=modelMatrix*vec4(position,1.);vW=w.xyz;vN=normalize(mat3(modelMatrix)*normal);gl_Position=projectionMatrix*viewMatrix*w;}`;
  const AE_FS=`uniform float uT;uniform float uO;uniform float uH;varying vec3 vN;varying vec3 vW;varying vec3 vP;
float hex(vec2 p){p=abs(p);return max(dot(p,normalize(vec2(1.,1.73))),p.x);}
void main(){vec3 V=normalize(cameraPosition-vW);float f=pow(1.-abs(dot(normalize(vN),V)),2.5);vec3 n=normalize(vP);
vec2 uv=vec2(atan(n.z,n.x)*2.4,n.y*4.2);vec2 g=vec2(1.,1.73);vec2 a=mod(uv,g)-g*.5,b=mod(uv-g*.5,g)-g*.5;vec2 c=dot(a,a)<dot(b,b)?a:b;
float e=smoothstep(.44,.5,hex(c));float sc=smoothstep(.96,1.,fract(n.y*1.5-uT*.6));
vec3 col=vec3(1.,.85,.45);float al=(f*.9+e*(.25+f)+sc*.35+uH*2.)*(.4+uO*3.);gl_FragColor=vec4(col*al,al);}`;
  const _ae=C0.aegis;C0.aegis=function(){const r=_ae.apply(this,arguments);try{if(W.shieldM&&!W.shieldM.material.uniforms){W.shieldM.material.dispose();W.shieldM.geometry=new THREE.IcosahedronGeometry(1.45,4);
      W.shieldM.material=new THREE.ShaderMaterial({uniforms:{uT:{value:0},uO:{value:.18},uH:{value:0}},vertexShader:AE_VS,fragmentShader:AE_FS,...{transparent:true,depthWrite:false,blending:THREE.AdditiveBlending},side:THREE.DoubleSide})}
    SPX.circle(P.pos,0xf2d27a,9,1.2);const s=SPX.flare(0xffe6a0,8,1);s.position.copy(P.pos).setY(P.pos.y+1.2);addFx(s,.35,(f,k)=>{s.material.opacity=1-k;s.scale.setScalar(8+k*6)})}catch(x){}return r};
  /* starfall: comets with burning gold tails and a sigil in the sky */
  C0.starfall=function(t){const at=t?t.pos.clone():P.pos.clone().add(V3(Math.sin(P.face),0,Math.cos(P.face)).multiplyScalar(12));const n=Math.round(14*(P.chgMulT>0?P.chgMul:1));at.y=groundAt(at.x,at.z);
    SPX.circle(at,0xffe08a,22,1.6+n*.12);const sky=SPX.circle(V3(at.x,at.y+36,at.z),0xffd070,26,1.6+n*.12,-1);sky.rotation.x=Math.PI/2;
    for(let k=0;k<n;k++)after(k*.12,()=>{const p=at.clone().add(V3(rand(-8,8),0,rand(-8,8)));p.y=groundAt(p.x,p.z);const st=p.clone().add(V3(rand(-6,6),38,rand(-6,6)));const g=new THREE.Group();g.add(glowSprite(0xffe08a,3.4));const fl=SPX.flare(0xfff2c0,4.5,1);g.add(fl);g.position.copy(st);scene.add(g);
      SPX.ribbon(()=>g.position,{a:0xfff2c0,b:0xff9a20,w:.7,n:18,alive:()=>!!g.parent});
      addFx(g,.55,(f,kk)=>{g.position.lerpVectors(st,p,kk*kk);fl.material.rotation+=.2;SP.emit(g.position,{n:2,c0:0xffffff,c1:0xffc040,s0:.6,s1:.1,life:.3})},()=>{explode(p,3.6,60*power(),0xffe08a,false)})})};
  /* eclipse: a black sun with a burning corona, then a ring of fire */
  const EC_FS=`uniform float uT;uniform float uO;varying vec2 vU;float h(float x){return fract(sin(x*127.1)*43758.5);}
void main(){vec2 p=vU*2.-1.;float r=length(p);float a=atan(p.y,p.x);float ray=0.;for(int i=0;i<3;i++){float fi=float(i);ray+=pow(abs(sin(a*(7.+fi*5.)+uT*(.5+fi*.4)+fi)),12.)*(.5-fi*.12);}
float cor=exp(-(r-.28)*(r-.28)*90.)*1.6+ray*smoothstep(.95,.3,r)*smoothstep(.22,.3,r);vec3 c=mix(vec3(1.,.25,.4),vec3(1.,.9,.8),exp(-(r-.28)*(r-.28)*300.))*cor;
float hole=smoothstep(.27,.25,r);c*=1.-hole;float al=clamp(cor+hole,0.,1.)*uO;gl_FragColor=vec4(c,al);}`;
  const _ec=C0.eclipse;C0.eclipse=function(){const n0=fxList.length;const r=_ec.apply(this,arguments);try{const F=fxList.slice(n0).find(f=>f.obj&&f.obj.isGroup);if(F){const g=F.obj;
      const em=new THREE.ShaderMaterial({uniforms:{uT:{value:0},uO:{value:0}},vertexShader:`varying vec2 vU;void main(){vU=uv;vec4 mv=modelViewMatrix*vec4(0.,0.,0.,1.);vec2 s=vec2(length(modelMatrix[0].xyz),length(modelMatrix[1].xyz));mv.xy+=position.xy*s;gl_Position=projectionMatrix*mv;}`,fragmentShader:EC_FS,transparent:true,depthWrite:false});
      const pl=new THREE.Mesh(new THREE.PlaneGeometry(1,1),em);pl.frustumCulled=false;pl.renderOrder=5;g.add(pl);const at=V3(g.position.x,g.position.y-5,g.position.z);SPX.circle(at,0xff5a7a,30,1.6,1.4);const u0=F.update,e0=F.end;
      F.update=(f,k)=>{u0(f,k);em.uniforms.uT.value=f.t;em.uniforms.uO.value=Math.min(1,k*4);pl.scale.setScalar(2+k*14)};
      F.end=()=>{if(e0)e0();SPX.shock(at,0xff3050,1,26,.9);SPX.shock(at,0xffd0d8,1,16,.55);for(let i=0;i<24;i++){const a=i/24*TAU;FL.emit(V3(at.x+Math.cos(a)*9,at.y+.5,at.z+Math.sin(a)*9),{n:3,c0:0xffc0c0,c1:0xff1040,s0:2.4,s1:.3,life:.8,up:5,speed:2})}}}}catch(x){}return r};
  /* poison: a lobbed glob with a dripping tail */
  const _po=C0.poison;C0.poison=function(t){const n0=fxList.length;const r=_po.apply(this,arguments);try{const F=fxList.slice(n0).find(f=>f.obj&&f.obj.isGroup);if(F){const b=F.obj;const core=new THREE.Mesh(SPX.sph,SPX.orbMat(0xd8ff80,0x2a6010));core.scale.setScalar(.6);b.add(core);
      SPX.ribbon(()=>b.position,{a:0xc8ff70,b:0x2a6010,w:.45,n:16,alive:()=>!!b.parent});const u0=F.update;F.update=(f,k)=>{u0(f,k);core.material.uniforms.uT.value=f.t}}}catch(x){}return r};
  /* plague nova: a toxic dome bursts out of you */
  const _pl=C0.plague;C0.plague=function(){const c=P.pos.clone();const r=_pl.apply(this,arguments);try{const d=new THREE.Mesh(SPX.sph,SPX.orbMat(0xd8ff70,0x1a4a08));d.position.copy(c);d.material.uniforms.uO.value=.25;
      addFx(d,.7,(f,k)=>{d.scale.setScalar(1+k*15);d.material.uniforms.uT.value=f.t;d.material.uniforms.uO.value=.25*(1-k)*(1-k)});SPX.circle(c,0x9dff5a,26,2,1.2);SPX.shock(c,0xc6ff3a,1,18,.8)}catch(x){}return r}}

/* ---------- poison clouds: a churning toxic floor under the smoke ---------- */
{const TX_FS=`uniform float uT;uniform float uO;varying vec2 vU;float h(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5);}
float n(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(h(i),h(i+vec2(1,0)),f.x),mix(h(i+vec2(0,1)),h(i+vec2(1,1)),f.x),f.y);}
float fb(vec2 p){return n(p)*.5+n(p*2.1+3.)*.3+n(p*4.3+7.)*.2;}
void main(){vec2 p=vU*2.-1.;float r=length(p);float m=fb(p*3.+vec2(uT*.3,-uT*.2))+fb(p*5.-vec2(uT*.4,uT*.1))*.5;float b=smoothstep(.75,.9,fb(p*9.+uT*.6));
float al=smoothstep(1.,.55,r)*(.25+m*.45+b*.4)*uO;vec3 c=mix(vec3(.15,.4,.05),vec3(.75,1.,.35),m*.7+b*.5);gl_FragColor=vec4(c*al,al);}`;
  const _sc=stinkCloud;stinkCloud=function(at,r,dur,dps,slow,col){const R=_sc.apply(this,arguments);try{const m=new THREE.ShaderMaterial({uniforms:{uT:{value:0},uO:{value:0}},vertexShader:`varying vec2 vU;void main(){vU=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`,fragmentShader:TX_FS,transparent:true,depthWrite:false,blending:THREE.AdditiveBlending});
    const pl=new THREE.Mesh(new THREE.PlaneGeometry(r*2.4,r*2.4),m);pl.rotation.x=-Math.PI/2;pl.position.set(at.x,at.y+.15,at.z);pl.renderOrder=1;
    addFx(pl,dur,(f,k)=>{m.uniforms.uT.value=f.t;m.uniforms.uO.value=(k<.1?k/.1:k>.8?(1-k)/.2:1);if(Math.random()<.35){const a=rand(0,TAU),rr=rand(0,r*.9);SP.emit(V3(at.x+Math.cos(a)*rr,at.y+.2,at.z+Math.sin(a)*rr),{n:1,c0:0xe0ffa0,c1:0x5a9a20,s0:.35,s1:.05,life:.9,up:2.2,speed:.2})}})}catch(x){}return R}}
