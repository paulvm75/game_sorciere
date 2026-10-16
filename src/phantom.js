
/* ---------- spectral armoured knight: Kaen's guardians (violet) and his limit-break avatar (blue, crackling) ---------- */
function phFill(col,op){return new THREE.ShaderMaterial({uniforms:{uC:{value:new THREE.Color(col)},uO:{value:op},uT:{value:0}},transparent:true,depthWrite:false,blending:THREE.AdditiveBlending,side:THREE.DoubleSide,
  vertexShader:'varying vec3 vN;varying vec3 vV;varying vec3 vP;void main(){vec4 mv=modelViewMatrix*vec4(position,1.);vN=normalize(normalMatrix*normal);vV=normalize(-mv.xyz);vP=(modelMatrix*vec4(position,1.)).xyz;gl_Position=projectionMatrix*mv;}',
  fragmentShader:'uniform vec3 uC;uniform float uO;uniform float uT;varying vec3 vN;varying vec3 vV;varying vec3 vP;void main(){float f=pow(1.-abs(dot(vN,vV)),2.2);float sh=.55+.45*abs(dot(vN,normalize(vec3(.3,.8,.5))));float fl=.82+.18*sin(uT*7.+vP.y*3.1)*sin(uT*4.1+vP.x*2.3);float sc=.85+.15*sin(vP.y*40.-uT*8.);gl_FragColor=vec4(uC*(.5*sh+f*1.15)*fl*sc,uO*(.6+f*.4));}'})}
function phLine(col,op){return new THREE.ShaderMaterial({uniforms:{uC:{value:new THREE.Color(col)},uO:{value:op},uT:{value:0}},transparent:true,depthWrite:false,blending:THREE.AdditiveBlending,
  vertexShader:'varying float vY;void main(){vY=(modelMatrix*vec4(position,1.)).y;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}',
  fragmentShader:'uniform vec3 uC;uniform float uO;uniform float uT;varying float vY;void main(){gl_FragColor=vec4(uC*(1.1+.25*sin(uT*6.+vY*2.)),uO);}'})}
const PH_GEO={};function phGeo(){if(PH_GEO.ok)return PH_GEO;PH_GEO.ok=1;const E=(g)=>({g,e:new THREE.EdgesGeometry(g,20)});
  PH_GEO.box=E(new THREE.BoxGeometry(1,1,1));PH_GEO.cyl6=E(new THREE.CylinderGeometry(.5,.5,1,6));PH_GEO.taper=E(new THREE.CylinderGeometry(.62,.45,1,8));
  PH_GEO.pld=E(new THREE.CylinderGeometry(1,1,1,10,1,true,-Math.PI*.5,Math.PI));PH_GEO.cone=E(new THREE.ConeGeometry(.5,1,6));PH_GEO.helm=E(new THREE.CylinderGeometry(.5,.62,1,8));
  PH_GEO.mist=E(new THREE.CylinderGeometry(1,.15,1,10,1,true));PH_GEO.oct=E(new THREE.OctahedronGeometry(.5,0));return PH_GEO}
function buildPhantom(o){const G0=phGeo();const fill=phFill(o.col,o.op||.85),fill2=phFill(o.col2,o.op||.85),line=phLine(o.edge,.45);const mats=[fill,fill2,line];
  const g=new THREE.Group(),body=new THREE.Group();g.add(body);
  const P=(geo,parent,sx,sy,sz,x,y,z,rx=0,ry=0,rz=0,m)=>{const h=new THREE.Group();h.position.set(x,y,z);h.rotation.set(rx,ry,rz);parent.add(h);const a=new THREE.Mesh(geo.g,m||fill);a.scale.set(sx,sy,sz);h.add(a);const l=new THREE.LineSegments(geo.e,line);l.scale.set(sx,sy,sz);h.add(l);return h};
  /* ghost-mist base instead of legs */
  P(G0.mist,body,2.7,3.6,2.1,0,3,0,0,0,0,fill2);{const mg=glowSprite(o.col,9,.5);mg.position.y=2.2;body.add(mg)}
  /* tassets: a skirt of plates */
  for(let k=0;k<7;k++){const a=(k/7-.5)*Math.PI*1.4;P(G0.box,body,1.15,1.7,.16,Math.sin(a)*2,4.3,Math.cos(a)*1.4,.2,a,0)}
  /* cuirass, belly bands, gorget */
  P(G0.taper,body,3.9,2.9,2.4,0,6.4,0);P(G0.box,body,1.7,1.8,.24,0,6.55,1.2,.08,0,0,fill2);
  for(let k=0;k<3;k++)P(G0.cyl6,body,3-k*.1,.36,1.95-k*.06,0,4.85+k*.4,0,0,Math.PI/6,0,k%2?fill2:fill);
  P(G0.cyl6,body,1.5,.5,1.3,0,7.95,0,0,Math.PI/6,0,fill2);
  /* layered rounded pauldrons */
  for(const q of[-1,1])for(let k=0;k<3;k++)P(G0.pld,body,1.6-k*.16,.75,1.45,q*(2.45+k*.22),7.75-k*.55,0,0,q>0?0:Math.PI,q*(1.2+k*.14),k?fill2:fill);
  /* mantle trailing from the shoulders */
  {const cg=new THREE.PlaneGeometry(3.4,6,6,10);const p=cg.attributes.position;for(let i=0;i<p.count;i++){const y=p.getY(i),x=p.getX(i);p.setZ(i,-Math.pow((3-y)/6,1.6)*1.4-Math.abs(x)*.12)}cg.computeVertexNormals();
    const c=new THREE.Mesh(cg,fill2);c.position.set(0,4.6,-1.05);body.add(c);g.userData.cape=c;g.userData.capeP=Float32Array.from(p.array)}
  /* great helm with visor slit, crest and swept horns */
  const head=new THREE.Group();head.position.set(0,8.95,.2);body.add(head);P(G0.helm,head,1.4,1.5,1.45,0,0,0,0,Math.PI/8,0);P(G0.cone,head,1.4,.65,1.45,0,1.05,0,0,Math.PI/6,0,fill2);
  P(G0.box,head,.12,.9,1.25,0,1.1,-.05,0,0,0,fill2);for(const q of[-1,1])P(G0.cone,head,.18,1.5,.18,q*.6,.55,-.3,-1.1,0,-q*.7,fill2);
  const vis=new THREE.Mesh(new THREE.BoxGeometry(.85,.09,.05),new THREE.MeshBasicMaterial({color:o.eye,transparent:true,opacity:.95,blending:THREE.AdditiveBlending,depthWrite:false}));vis.position.set(0,.05,.8);head.add(vis);
  for(const q of[-1,1]){const ey=glowSprite(o.eye,1.1,1);ey.position.set(q*.24,.05,.85);head.add(ey)}
  /* arms: the right one carries a greatsword */
  const arms=[];for(const q of[-1,1]){const A=new THREE.Group();A.position.set(q*2.7,7.2,0);body.add(A);P(G0.cyl6,A,.95,1.9,.95,0,-.95,0);
    const F=new THREE.Group();F.position.y=-2;A.add(F);P(G0.taper,F,1.1,1.8,1.1,0,-.9,0,0,0,0,fill2);P(G0.box,F,1,.75,.85,0,-2.05,.05);
    if(q>0){const sw=new THREE.Group();sw.position.set(0,-1.9,.35);sw.rotation.x=-Math.PI/2+.25;F.add(sw);P(G0.box,sw,.32,6.2,.07,0,3.4,0,0,0,0,fill);P(G0.box,sw,1.5,.18,.22,0,.25,0,0,0,0,fill2);P(G0.oct,sw,.35,.6,.35,0,-.35,0,0,0,0,fill2);
      const bg=glowSprite(o.edge,3,.35);bg.position.y=3.4;sw.add(bg)}
    A.rotation.z=q*.22;arms.push({A,F,q,lv:0})}
  /* ghost flames licking off the shoulders and helm */const flames=[];for(const[x,y,z,s]of[[-2.6,8.4,-.2,1.3],[-2.2,8.6,-.6,1],[2.6,8.4,-.2,1.3],[2.2,8.6,-.6,1],[0,10.4,-.4,1.2],[-.6,10,-.7,.9],[.6,10,-.7,.9],[0,8.6,-1.3,1.4],[-1.3,8.2,-1.1,1.1],[1.3,8.2,-1.1,1.1]]){const f=P(G0.cone,body,.55*s,1.8*s,.55*s,x,y+.9*s,z,-.25,0,x*-.06,fill2);f.userData.s=s;flames.push(f)}g.userData.flames=flames;
  const core=glowSprite(o.col,16,.3);core.position.y=6;body.add(core);
  /* lightning (limit-break avatar only) */
  if(o.bolts){const N=12,S=10;const pos=new Float32Array(N*S*2*3);const bg=new THREE.BufferGeometry();bg.setAttribute('position',new THREE.BufferAttribute(pos,3));
    const bm=new THREE.LineBasicMaterial({color:o.bolts,transparent:true,opacity:1,blending:THREE.AdditiveBlending,depthWrite:false});const bl=new THREE.LineSegments(bg,bm);bl.frustumCulled=false;body.add(bl);let nt=0;
    bl.onBeforeRender=()=>{const now=performance.now();if(now<nt)return;nt=now+60+Math.random()*50;let w=0;for(let b=0;b<N;b++){let x=rand(-2.6,2.6),y=rand(2,9.5),z=rand(-1.2,1.2);const tx=rand(-3.2,3.2),ty=rand(1.5,10),tz=rand(-1.5,1.5);
      for(let s=0;s<S;s++){const k=(s+1)/S;const nx=lerp(x,tx,1/(S-s))+rand(-.35,.35),ny=lerp(y,ty,1/(S-s))+rand(-.35,.35),nz=lerp(z,tz,1/(S-s))+rand(-.2,.2);pos[w++]=x;pos[w++]=y;pos[w++]=z;pos[w++]=nx;pos[w++]=ny;pos[w++]=nz;x=nx;y=ny;z=nz}}
      bg.attributes.position.needsUpdate=true;bm.opacity=.55+Math.random()*.45};g.userData.bolts=bl}
  g.userData.mats=mats;return{g,body,head,arms,mats}}
function phCape(g,t){const c=g.userData.cape;if(!c)return;const p=c.geometry.attributes.position,b=g.userData.capeP;for(let i=0;i<p.count;i++){const y=b[i*3+1],x=b[i*3];const w=(3-y)/6;p.setZ(i,b[i*3+2]+Math.sin(t*2.2+y*.9+x*.6)*.25*w)}p.needsUpdate=true;const F=g.userData.flames;if(F)F.forEach((f,i)=>{const k=.75+.35*Math.sin(t*9+i*1.7)+.15*Math.sin(t*23+i);f.scale.set(1,k,1)})}
/* guardians */
buildGuardian=function(){const m=buildPhantom({col:0x9a3cff,col2:0xc070ff,edge:0xf4d8ff,eye:0xffe6ff});m.anim=(e,dt,mv,lunge)=>{guardAnim(e,dt,mv,lunge);for(const x of m.mats)x.uniforms.uT.value=e.t;phCape(m.g,e.t)};return m};
/* Kaen's limit-break avatar: same knight, electric blue, crackling */
buildGhostDemon=function(){const m=buildPhantom({col:0x2f86ff,col2:0x6ab8ff,edge:0xd8f4ff,eye:0xe8fbff,bolts:0xbfe8ff,op:.9});const g=new THREE.Group();m.g.scale.setScalar(.56);m.g.position.y=-1.1;g.add(m.g);
  const glow=glowSprite(0x4aa8ff,10,.4);glow.position.y=2.6;g.add(glow);g.userData.mats=m.mats;m.g.userData.cape.onBeforeRender=()=>phCape(m.g,performance.now()*.001);return g};
ETYPES.guardian.build=()=>buildGuardian();
