/* ================= XVI polish: a bigger square, a spell wall, her limit breaker in gold ================= */
Object.assign(XO.B,{x0:-175,x1:-85,z0:-9902,z1:-9845});
Object.assign(SPEAKER,{'The Crown, wearing Maëlle':'#ff8a8a'});

/* ---------- the spell wall: light green, subtle, brighter where you touch it ---------- */
const XW={g:null,mat:null,a:0,hit:0};
function xoWallBuild(){if(XW.g)return XW.g;const B=XO.B,H=7;
  const mat=new THREE.ShaderMaterial({uniforms:{uT:{value:0},uA:{value:0},uH:{value:0},uP:{value:new THREE.Vector3()}},transparent:true,depthWrite:false,side:THREE.DoubleSide,blending:THREE.AdditiveBlending,fog:false,
    vertexShader:'varying vec2 vU;varying vec3 vW;void main(){vU=uv;vec4 w=modelMatrix*vec4(position,1.);vW=w.xyz;gl_Position=projectionMatrix*viewMatrix*w;}',
    fragmentShader:'uniform float uT,uA,uH;uniform vec3 uP;varying vec2 vU;varying vec3 vW;void main(){float y=vU.y;float base=pow(1.-y,2.4);float s=vW.x+vW.z;float lines=pow(.5+.5*sin(s*1.3-uT*1.2),22.);float hx=pow(.5+.5*sin(y*34.+uT*1.6),40.);float scan=exp(-pow((y-fract(uT*.16))*12.,2.));float d=distance(vW.xz,uP.xz);float near=smoothstep(10.,1.5,d)*(1.+uH*1.5);float foot=smoothstep(.06,0.,y);float a=(base*.5+lines*base*.6+hx*base*.3+scan*(1.-y)*.35+foot*.9)*(.6+near)*uA;gl_FragColor=vec4(vec3(.62,1.,.72)*(1.+near*.5),a*.75);}'});
  const g=new THREE.Group();const W=B.x1-B.x0,D=B.z1-B.z0,cx=(B.x0+B.x1)/2,cz=(B.z0+B.z1)/2;
  const side=(w,x,z,ry)=>{const m=new THREE.Mesh(new THREE.PlaneGeometry(w,H,Math.ceil(w/3),1),mat);m.position.set(x,H/2,z);m.rotation.y=ry;m.renderOrder=4;m.frustumCulled=false;g.add(m)};
  side(W,cx,B.z0,0);side(W,cx,B.z1,0);side(D,B.x0,cz,Math.PI/2);side(D,B.x1,cz,Math.PI/2);
  g.position.y=groundAt(cx,cz)+.02;g.visible=false;(NZ.g||scene).add(g);XW.g=g;XW.mat=mat;return g}
function xoWallTick(dt){const on=MODE!=='open'&&CH2.zone==='north'&&(CH2.st===21||CH2.st===22)&&XO.ph>=.5&&XO.ph<3;if(!XW.g){if(!on)return;xoWallBuild()}
  XW.a+=((on?1:0)-XW.a)*Math.min(1,dt*1.6);XW.g.visible=XW.a>.01;XW.hit=Math.max(0,XW.hit-dt*2.5);if(!XW.g.visible)return;const u=XW.mat.uniforms;u.uT.value+=dt;u.uA.value=XW.a;u.uH.value=XW.hit;u.uP.value.copy(P.pos)}
{const _ar=xoArena;xoArena=function(){const x=P.pos.x,z=P.pos.z;const r=_ar.apply(this,arguments);if(Math.abs(P.pos.x-x)+Math.abs(P.pos.z-z)>.001){XW.hit=1;if(Math.random()<.35)SP.emit(V3(P.pos.x,P.pos.y+rand(.3,1.8),P.pos.z),{n:3,c0:0xe8ffe8,c1:0x60ff90,s0:.35,s1:.04,life:.5,speed:2})}return r}}

/* ---------- her limit breaker: built like yours, gold, with only a breath of black ---------- */
function xmGoldFx(m){if(m.m.lbg)return m.m.lbg;const g=new THREE.Group();m.m.g.add(g);
  const rn=decal(runeTex,0xffc040,5.5,true,.75);rn.position.y=.08;g.add(rn);const rn2=decal(runeTex,0xffe070,8.5,true,.4);rn2.position.y=.1;g.add(rn2);
  const fl=[];for(const [r,h,col,sp,a,blk] of [[1.0,3.4,0xffb020,1,.85,0],[.75,2.8,0xfff0a0,1.5,.85,0],[1.3,4.4,0xff8a10,.8,.55,0],[1.5,4.6,0x0a0604,.7,.14,1]]){
    const mt=new THREE.ShaderMaterial({uniforms:{uT:{value:0},uC:{value:new THREE.Color(col)},uA:{value:a},uS:{value:sp}},transparent:true,depthWrite:false,side:THREE.DoubleSide,blending:blk?THREE.NormalBlending:THREE.AdditiveBlending,
      vertexShader:'varying vec2 vU;void main(){vU=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}',
      fragmentShader:'uniform float uT,uA,uS;uniform vec3 uC;varying vec2 vU;float h(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}float n(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(h(i),h(i+vec2(1,0)),f.x),mix(h(i+vec2(0,1)),h(i+vec2(1,1)),f.x),f.y);}void main(){vec2 p=vec2(vU.x*16.,vU.y*3.-uT*uS*2.2);float f=n(p)*.55+n(p*2.3+3.)*.3+n(p*5.1+7.)*.15;float y=vU.y;float a=smoothstep(.5,.85,f+.18-y*.3)*pow(1.-y,1.4)*smoothstep(0.,.15,y);gl_FragColor=vec4(uC*(.8+f*.8),a*uA*.8);}'});
    const c=new THREE.Mesh(new THREE.CylinderGeometry(r*.55,r,h,28,1,true),mt);c.position.y=h/2-.1;c.renderOrder=blk?5:6;c.userData.a=a;g.add(c);fl.push(c)}
  const orb=[];for(let k=0;k<6;k++){const s=glowSprite(k%2?0xffd060:0xfff4d0,.22,.9);g.add(s);orb.push(s)}
  return m.m.lbg={g,rn,rn2,fl,orb}}
xmDarkOn=function(m){if(m._dk)return;m._dk=1;m.lb=1;try{xmRedEyes(m)}catch(x){}try{if(m.xo)m.xo.L=xoGreyList(m.m.g)}catch(x){}
  if(!m.m.aura){const au=glowSprite(0xffc040,5,.4);au.position.y=1.1;m.m.g.add(au);m.m.aura=au}m.m.fl=null;xmGoldFx(m);
  try{for(const o of m.m.eyes||[]){o.visible=true;o.material=o.material.clone();o.material.color.setHex(0xff1a1a)}}catch(x){}};
function xmGoldTick(dt){const m=XO.mir;if(!m||m.dead||!m.m||!m.m.lbg)return;const L=m.m.lbg;L.g.visible=!!m.lb;if(!m.lb)return;L.rn.rotation.z+=dt*2;L.rn2.rotation.z-=dt*1.2;
  L.fl.forEach((c,i)=>{c.material.uniforms.uT.value=time;c.material.uniforms.uA.value=c.userData.a*(.85+Math.sin(time*11+i)*.15);c.scale.set(1+Math.sin(time*7+i)*.05,1,1+Math.cos(time*6+i)*.05)});
  L.orb.forEach((s,i)=>{const a=time*(2.2+i*.15)+i*TAU/6,r=1.1+Math.sin(time*3+i)*.2;s.position.set(Math.sin(a)*r,.6+((time*.9+i/6)%1)*2.6,Math.cos(a)*r)});
  if(Math.random()<dt*30){const c=eCenter(m);SP.emit(V3(c.x+rand(-1.1,1.1),c.y+rand(-1,1.4),c.z+rand(-1.1,1.1)),{c0:Math.random()<.15?0x140a04:0xffe8a0,c1:0x301800,s0:.5,s1:.05,life:.9,up:3,speed:.6})}}
{const _uf=updateFx;updateFx=function(dt){const r=_uf.apply(this,arguments);try{xoWallTick(dt);xmGoldTick(dt)}catch(x){}return r}}
