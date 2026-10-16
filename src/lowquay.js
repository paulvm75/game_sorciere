
/* ---------- the lower quay along Quai d'Orsay (7e): walk down to the water, café terraces, party péniches ---------- */
const LQ={on:false,X0:-4460,X1:-2660,STEP:4,W:11,E:null,DY:WL+2.6,ramps:[],barges:[],built:false};
function lqInit(){if(LQ.E||MODE!=='open'||!OW.grid)return;const n=Math.ceil((LQ.X1-LQ.X0)/LQ.STEP)+1;const E=new Float32Array(n).fill(NaN);
  for(let i=0;i<n;i++){const x=LQ.X0+i*LQ.STEP;const e=nearestEdge(x,-540,90,e=>/^Quai d.Orsay$/.test(CITY.names[e.name]||''));const o={};const z0=e?(distToEdge(e,x,-540,o),o.z):-520;
    LQ.Ii=LQ.Ii||new Float32Array(n).fill(NaN);if(e)LQ.Ii[i]=z0-(e.w/2+(e.sw||2)+2.5);
    for(let z=z0-6;z>z0-200;z-=1){const t=gType(x,z);if(t===2||t===5){if((gType(x,z-2)===2||gType(x,z-2)===5)&&(gType(x,z-4)===2||gType(x,z-4)===5)){E[i]=z;break}}}}
  /* smooth the wall line so the promenade reads as one straight quay */
  const sm=A=>{const S=Float32Array.from(A);for(let i=0;i<n;i++){let s=0,c=0;for(let k=-4;k<=4;k++){const v=A[i+k];if(v===v&&v!==undefined){s+=v;c++}}S[i]=c?s/c:NaN}return S};LQ.E=sm(E);LQ.I=sm(LQ.Ii);
  for(let i=0;i<n;i++)if(!(LQ.I[i]-LQ.E[i]>8))LQ.I[i]=NaN;
  for(const rx of[-4330,-3900,-3420,-2950])LQ.ramps.push({x0:rx,len:34});LQ.on=true}
function lqEdge(x){if(!LQ.E||x<LQ.X0||x>LQ.X1)return NaN;const f=(x-LQ.X0)/LQ.STEP,i=Math.floor(f),t=f-i;const a=LQ.E[i],b=LQ.E[Math.min(LQ.E.length-1,i+1)];return a===a&&b===b?a+(b-a)*t:a===a?a:b}
function lqI(x){if(!LQ.I||x<LQ.X0||x>LQ.X1)return NaN;const f=(x-LQ.X0)/LQ.STEP,i=Math.floor(f),t=f-i;const a=LQ.I[i],b=LQ.I[Math.min(LQ.I.length-1,i+1)];return a===a&&b===b?a+(b-a)*t:NaN}
/* the strip between the upper quay and the water sits down at the lower level */
function lqH(x,z){if(!LQ.on||x<LQ.X0||x>LQ.X1||z>-380||z<-760)return null;const zi=lqI(x);if(zi!==zi||z>zi)return null;const e=lqEdge(x);if(e!==e||z<e-1)return null;
  for(const r of LQ.ramps)if(x>=r.x0&&x<=r.x0+r.len&&z>zi-3.6)return lerp(-.05,LQ.DY,(x-r.x0)/r.len);const k=clamp((zi-z)/1.2,0,1);return lerp(0,LQ.DY,k)}
{const _th=terrainH;terrainH=function(x,z){const l=lqH(x,z);return l===null?_th(x,z):l}}
function lqBuild(){if(LQ.built||!LQ.on)return;LQ.built=true;const DY=LQ.DY,W=LQ.W;const P=[],C=[],I=[];const st=new THREE.Color(0xb7aa95),dk=new THREE.Color(0x8a7f70),wl=new THREE.Color(0x9a8d78);
  const quad=(a,b,c,d,col)=>{const o=P.length/3;for(const v of[a,b,c,d]){P.push(v[0],v[1],v[2]);const k=.9+Math.random()*.12;C.push(col.r*k,col.g*k,col.b*k)}I.push(o,o+1,o+2,o,o+2,o+3)};
  for(let x=LQ.X0;x<LQ.X1;x+=LQ.STEP){const x2=x+LQ.STEP;const i1=lqI(x),i2=lqI(x2),e1=lqEdge(x),e2=lqEdge(x2);if(i1!==i1||i2!==i2||e1!==e1||e2!==e2)continue;
    quad([x,.12,i1-.05],[x2,.12,i2-.05],[x2,DY+.02,i2-.05],[x,DY+.02,i1-.05],wl);                 // retaining wall of the upper quay
    quad([x,.6,i1+.3],[x2,.6,i2+.3],[x2,.6,i2-.2],[x,.6,i1-.2],dk);                               // parapet top
    quad([x,0,i1+.3],[x2,0,i2+.3],[x2,.6,i2+.3],[x,.6,i1+.3],dk);
    quad([x,DY+.05,e1],[x2,DY+.05,e2],[x2,WL-1.5,e2],[x,WL-1.5,e1],dk);                          // edge down to the river
    quad([x,DY+.3,e1+.4],[x2,DY+.3,e2+.4],[x2,DY+.3,e2],[x,DY+.3,e1],st)}
  for(const r of LQ.ramps){for(let x=r.x0;x<r.x0+r.len;x+=2){const x2=x+2;const e1=lqI(x),e2=lqI(x2);if(e1!==e1||e2!==e2)continue;const h1=lerp(-.05,DY,(x-r.x0)/r.len),h2=lerp(-.05,DY,(x2-r.x0)/r.len);
    quad([x,h1+.08,e1],[x2,h2+.08,e2],[x2,h2+.08,e2-3.6],[x,h1+.08,e1-3.6],dk);quad([x,h1+.08,e1-3.6],[x2,h2+.08,e2-3.6],[x2,DY,e2-3.6],[x,DY,e1-3.6],wl)}}
  const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(P,3));g.setAttribute('color',new THREE.Float32BufferAttribute(C,3));g.setIndex(I);g.computeVertexNormals();
  const m=new THREE.Mesh(g,std({vertexColors:true,roughness:.92,side:THREE.DoubleSide}));m.receiveShadow=true;scene.add(m);
  /* railings on the ramps */
  {const rm=std({color:0x1c1c20,roughness:.5,metalness:.6});for(const r of LQ.ramps){const e0=lqI(r.x0),e1=lqI(r.x0+r.len);const L=Math.hypot(r.len,LQ.DY);const b=new THREE.Mesh(new THREE.BoxGeometry(L,.08,.08),rm);b.position.set(r.x0+r.len/2,LQ.DY/2+1.1,(e0+e1)/2-3.6);b.rotation.z=Math.atan2(LQ.DY,r.len)*-1;scene.add(b)}}
  /* plane trees along the empty quay above */
  {const tr=std({color:0x5a4a3a,roughness:.9}),lf=std({color:0x3e6a34,roughness:.85});for(let x=LQ.X0+20;x<LQ.X1;x+=26){const zi=lqI(x);if(zi!==zi)continue;const tz=zi+4.5;const y=terrainH(x,tz);
    const t=new THREE.Mesh(new THREE.CylinderGeometry(.35,.45,7,6),tr);t.position.set(x,y+3.5,tz);scene.add(t);const c=new THREE.Mesh(new THREE.SphereGeometry(3.6,8,6),lf);c.position.set(x,y+8.6,tz);c.scale.y=.8;c.castShadow=true;scene.add(c)}}
  /* café terraces */
  const dry=(x)=>{const e=lqEdge(x),zi=lqI(x);if(e!==e||zi!==zi||zi-e<26)return false;for(const dx of[-10,0,10])for(const dz of[3,7,11,15])if(gType(x+dx,e+dz)===2||gType(x+dx,e+dz)===7)return false;return true};
  const cafes=[];for(let x=LQ.X0+80;x<LQ.X1-60&&cafes.length<4;x+=20)if(dry(x)&&(!cafes.length||x-cafes[cafes.length-1]>320))cafes.push(x);LQ.cafes=cafes;for(let ci=0;ci<cafes.length;ci++){const cx=cafes[ci];const e0=lqEdge(cx),zi=lqI(cx);if(e0!==e0||zi!==zi)continue;const e=Math.min(zi-4,e0+14);const zc=e0+6;const gq=new THREE.Group();scene.add(gq);
    const kio=new THREE.Mesh(new THREE.BoxGeometry(5,3.2,3.2),std({color:[0x2d4a3a,0x5a2030,0x1f2f4f,0x5a4020][ci],roughness:.6}));kio.position.set(cx-9,DY+1.6,e-2);gq.add(kio);
    const aw=new THREE.Mesh(new THREE.BoxGeometry(5.6,.15,2),std({color:0xf2efe6,roughness:.7}));aw.position.set(cx-9,DY+3.3,e-4);aw.rotation.x=-.25;gq.add(aw);
    const tm=std({color:0x22201e,roughness:.4,metalness:.5}),cm=std({color:0xb08a50,roughness:.7}),um=std({color:[0xe8e0d0,0xb02a3a,0x2a5a8a,0xd8b060][ci],roughness:.8});
    for(let k=0;k<6;k++){const tx=cx-4+(k%3)*4.5,tz=zc+(k<3?-1.8:2.2);const t=new THREE.Mesh(new THREE.CylinderGeometry(.55,.55,.06,12),tm);t.position.set(tx,DY+1.05,tz);gq.add(t);const lg=new THREE.Mesh(new THREE.CylinderGeometry(.06,.06,1,5),tm);lg.position.set(tx,DY+.5,tz);gq.add(lg);
      for(const s of[-1,1]){const ch=new THREE.Mesh(new THREE.BoxGeometry(.5,.08,.5),cm);ch.position.set(tx+s*.9,DY+.6,tz);gq.add(ch)}
      if(k%2===0){const u=new THREE.Mesh(new THREE.ConeGeometry(2.2,.9,8,1,true),um);u.position.set(tx,DY+3,tz);gq.add(u);const p=new THREE.Mesh(new THREE.CylinderGeometry(.04,.04,2.6,4),tm);p.position.set(tx,DY+1.9,tz);gq.add(p)}
      if(Math.random()<.75){const n=lqPerson(tx+(Math.random()<.5?-.9:.9),tz,'sit');n.face=Math.atan2(tx-n.x,0)}}
    for(let k=0;k<14;k++){const s=glowSprite(0xffd890,.9,.95);s.position.set(cx-8+k*1.4,DY+3.6-Math.sin(k/13*Math.PI)*.6,e-.6);gq.add(s)}
    lqPerson(cx-9,e-4.2,'idle','vendor')}
  /* péniches moored along the edge, two of them are parties */
  const bx=[-4350,-3990,-3520,-3270,-2900];for(let bi=0;bi<bx.length;bi++){const x=bx[bi];const e=lqEdge(x);if(e!==e)continue;const party=bi===1||bi===3;const L=34,B=6;const zc=e-B/2-1.2;const g=new THREE.Group();g.position.set(x,WL,zc);scene.add(g);
    const hull=new THREE.Mesh(new THREE.BoxGeometry(L,2.6,B),std({color:[0x1f3a2a,0x1a1a20,0x5a1a1a,0x1a2a4a,0x2a2a2a][bi],roughness:.5}));hull.position.y=.6;g.add(hull);
    const bow=new THREE.Mesh(new THREE.CylinderGeometry(B/2,B/2,2.6,12,1,false,0,Math.PI),hull.material);bow.rotation.y=Math.PI/2;bow.position.set(L/2,.6,0);bow.scale.set(1,1,.5);g.add(bow);
    const deck=new THREE.Mesh(new THREE.BoxGeometry(L-.4,.2,B-.4),std({color:0x8a6a48,roughness:.8}));deck.position.y=1.95;g.add(deck);
    const cab=new THREE.Mesh(new THREE.BoxGeometry(L*.55,2.4,B-1.2),std({color:party?0xf2eee4:0xe0d8c4,roughness:.6}));cab.position.set(-L*.12,3.2,0);g.add(cab);
    for(let k=0;k<7;k++){const w=new THREE.Mesh(new THREE.PlaneGeometry(1.4,1),new THREE.MeshBasicMaterial({color:party?0xffc070:0xffe2a8}));w.position.set(-L*.12-L*.24+k*L*.08,3.3,(B-1.2)/2+.02);g.add(w)}
    const plant=std({color:0x3a7a3a,roughness:.9});for(let k=0;k<5;k++){const p=new THREE.Mesh(new THREE.SphereGeometry(.5,6,5),plant);p.position.set(L*.25+k*1.1,2.4,B/2-.8);g.add(p)}
    if(party){const cols=[0xff3a8a,0x3ac8ff,0xffd040,0x9a5aff,0x40ff9a];const lights=[];for(let k=0;k<22;k++){const s=glowSprite(cols[k%5],1.3,1);s.position.set(-L/2+1+k*(L-2)/21,6.2-Math.sin(k/21*Math.PI)*.8,0);g.add(s);lights.push(s)}
      for(let k=0;k<5;k++){const n=lqPerson(x-L*.12-6+k*3,zc+rand(-1.2,1.2),'dance');n.y=n.gy=WL+4.4}
      LQ.barges.push({x:x+0,z:zc,lights,cols})}}
  OW.lqBuilt=true}
function lqPerson(x,z,anim,arch){const n=mkPerson({arch:arch||pickR(Math.random,['night','student','hipster','parisien','tourist','posh']),x,z,st:'static',
    special:{kind:'host',calm:true,protect:true,anim,label:()=>'Talk to '+n.name.split(' ')[0],sub:()=>n.job,open:k=>openActMenu(k)}});n.y=n.gy=LQ.DY-(anim==="sit"?.28:0);n.homeX=x;n.homeZ=z;n.dist=1e9;specials.push(n);people.push(n);return n}
function lqTick(dt){if(MODE!=='open'||!started)return;if(!LQ.on){lqInit();return}if(!LQ.built){if(Math.abs(P.pos.x-(LQ.X0+LQ.X1)/2)<1500&&Math.abs(P.pos.z+560)<700)lqBuild();return}
  const t=performance.now()*.001;for(const b of LQ.barges){const near=Math.hypot(P.pos.x-b.x,P.pos.z-b.z)<120;if(!near)continue;b.lights.forEach((s,k)=>{s.material.color.setHex(b.cols[(k+Math.floor(t*3))%5]);s.material.opacity=.6+.4*Math.abs(Math.sin(t*4+k))})}}
{const _mt=muTick;muTick=function(dt){_mt(dt);try{lqTick(dt)}catch(e){console.warn('lq',e)}}}
{const _mw=muWant;muWant=function(){const w=_mw();if(w&&MODE==='open'&&LQ.barges.length&&!(typeof VIN!=='undefined'&&VIN)){for(const b of LQ.barges)if(Math.hypot(P.pos.x-b.x,P.pos.z-b.z)<55&&(OWS.tod>=19||OWS.tod<4))return'mus_cafe'}return w}}
if(MODE==='open'){try{lqInit()}catch(e){console.warn('lq init',e)}}
