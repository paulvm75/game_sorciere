/* ================= XVII · the Réserves, rebuilt: carpets, panelling, portraits, a real amphitheatre; better NPCs; Kaen's idle nagging ================= */

/* ---------- textures ---------- */
const SBX2={};
function sbTex2(){if(SBX2.ok)return SBX2;SBX2.ok=1;const R=(a,b)=>a+Math.random()*(b-a);
  const wains=(x,w,h,top)=>{const y0=h*top;const g=x.createLinearGradient(0,y0,0,h);g.addColorStop(0,'#5a3620');g.addColorStop(1,'#2e1a0e');x.fillStyle=g;x.fillRect(0,y0,w,h-y0);
    const pw=w/4;for(let i=0;i<4;i++){x.strokeStyle='rgba(255,210,150,.18)';x.lineWidth=3;x.strokeRect(i*pw+10,y0+16,pw-20,h-y0-40);x.strokeStyle='rgba(0,0,0,.45)';x.lineWidth=2;x.strokeRect(i*pw+14,y0+20,pw-28,h-y0-48)}
    x.fillStyle='#c89a48';x.fillRect(0,y0-6,w,7);x.fillStyle='#1a0e06';x.fillRect(0,h-14,w,14)};
  const cornice=(x,w,h)=>{x.fillStyle='#24140a';x.fillRect(0,0,w,h*.06);x.fillStyle='#c89a48';x.fillRect(0,h*.06,w,4)};
  const mk=(fn)=>sbCanvas(512,512,(x,w,h)=>fn(x,w,h));
  SBX2.C=mk((x,w,h)=>{x.fillStyle='#a88c68';x.fillRect(0,0,w,h);for(let r=0;r<10;r++)for(let c=0;c<4;c++){const o=r%2?64:0;x.fillStyle=`hsl(34,${R(20,30)}%,${R(50,60)}%)`;x.fillRect(c*128+o+2,r*36+30,124,32);x.fillRect(c*128+o-126,r*36+30,124,32)}wains(x,w,h,.66);cornice(x,w,h)});
  const damask=(bg,fg)=>(x,w,h)=>{x.fillStyle=bg;x.fillRect(0,0,w,h);x.fillStyle=fg;for(let r=0;r<8;r++)for(let c=0;c<6;c++){const cx=c*90+(r%2?45:0)+20,cy=r*52+40;x.beginPath();x.ellipse(cx,cy,9,16,0,0,7);x.fill();x.beginPath();x.ellipse(cx-10,cy+6,5,9,-.6,0,7);x.fill();x.beginPath();x.ellipse(cx+10,cy+6,5,9,.6,0,7);x.fill()}};
  SBX2.R1=mk((x,w,h)=>{damask('#1c3426','#2c4c36')(x,w,h);wains(x,w,h,.62);cornice(x,w,h)});
  SBX2.R2=mk((x,w,h)=>{x.fillStyle='#121c34';x.fillRect(0,0,w,h);for(let i=0;i<70;i++){x.fillStyle=`rgba(255,${R(200,230)},140,${R(.4,.9)})`;const sx=R(0,w),sy=R(30,h*.6);x.beginPath();for(let k=0;k<5;k++){const a=k*1.2566-1.57,b=a+.628;x.lineTo(sx+Math.cos(a)*5,sy+Math.sin(a)*5);x.lineTo(sx+Math.cos(b)*2,sy+Math.sin(b)*2)}x.fill()}wains(x,w,h,.64);cornice(x,w,h)});
  SBX2.R3=mk((x,w,h)=>{x.fillStyle='#d6c4a0';x.fillRect(0,0,w,h);for(let i=0;i<4;i++){const px=i*128+50;const g=x.createLinearGradient(px,0,px+30,0);g.addColorStop(0,'#c2ae88');g.addColorStop(.5,'#ece0c4');g.addColorStop(1,'#b09a74');x.fillStyle=g;x.fillRect(px,h*.1,30,h*.62)}
    x.fillStyle='#b8904a';x.fillRect(0,h*.12,w,10);x.fillStyle='#8a2a22';x.fillRect(0,h*.14,w,8);wains(x,w,h,.74);cornice(x,w,h)});
  SBX2.R4=mk((x,w,h)=>{damask('#3e0e12','#5a1a1e')(x,w,h);wains(x,w,h,.6);cornice(x,w,h)});
  SBX2.parq=sbCanvas(256,256,(x,w,h)=>{for(let r=0;r<16;r++)for(let c=0;c<8;c++){x.fillStyle=`hsl(28,${R(35,48)}%,${R(22,32)}%)`;const o=(r%2)*16;x.fillRect(c*32+o,r*16,31,15);x.fillStyle='rgba(0,0,0,.25)';x.fillRect(c*32+o,r*16+14,31,1)}});
  SBX2.run=sbCanvas(128,256,(x,w,h)=>{x.fillStyle='#6a0e16';x.fillRect(0,0,w,h);x.fillStyle='#c89a48';x.fillRect(6,0,8,h);x.fillRect(w-14,0,8,h);x.fillStyle='#2a0608';x.fillRect(16,0,6,h);x.fillRect(w-22,0,6,h);
    for(let k=0;k<4;k++){const cy=k*64+32;x.fillStyle='#b8862e';x.beginPath();x.moveTo(w/2,cy-22);x.lineTo(w/2+20,cy);x.lineTo(w/2,cy+22);x.lineTo(w/2-20,cy);x.fill();x.fillStyle='#3a0a10';x.beginPath();x.moveTo(w/2,cy-11);x.lineTo(w/2+10,cy);x.lineTo(w/2,cy+11);x.lineTo(w/2-10,cy);x.fill()}});
  const rug=(a,b,c)=>sbCanvas(512,512,(x,w,h)=>{x.fillStyle=a;x.fillRect(0,0,w,h);for(const [i,col] of[[0,c],[18,b],[30,c],[38,a]]){x.strokeStyle=col;x.lineWidth=12;x.strokeRect(i+6,i+6,w-2*i-12,h-2*i-12)}
    x.fillStyle=b;x.beginPath();x.ellipse(w/2,h/2,120,170,0,0,7);x.fill();x.fillStyle=c;x.beginPath();x.ellipse(w/2,h/2,80,120,0,0,7);x.fill();x.fillStyle=a;x.beginPath();x.ellipse(w/2,h/2,34,52,0,0,7);x.fill();
    for(let i=0;i<120;i++){x.fillStyle=Math.random()<.5?b:c;x.globalAlpha=.5;x.fillRect(R(60,w-60),R(60,h-60),4,4)}x.globalAlpha=1});
  SBX2.rugA=rug('#5a1018','#1e2a52','#c8963e');SBX2.rugB=rug('#1a2a4a','#6a1a22','#d8b060');SBX2.rugC=rug('#2a1810','#7a2a18','#c89a48');
  SBX2.coff=sbCanvas(256,256,(x,w,h)=>{x.fillStyle='#1e120a';x.fillRect(0,0,w,h);for(let r=0;r<2;r++)for(let c=0;c<2;c++){x.fillStyle='#2e1c10';x.fillRect(c*128+14,r*128+14,100,100);x.strokeStyle='#8a6a30';x.lineWidth=2;x.strokeRect(c*128+22,r*128+22,84,84)}});
  SBX2.portrait=[0,1,2,3,4,5].map(i=>sbCanvas(128,160,(x,w,h)=>{const bg=['#1a2a22','#2a1a14','#141a2a','#2a2412','#1c1420','#22201a'][i];x.fillStyle=bg;x.fillRect(0,0,w,h);const g=x.createRadialGradient(w/2,h*.4,5,w/2,h*.4,90);g.addColorStop(0,'rgba(255,220,160,.25)');g.addColorStop(1,'rgba(0,0,0,0)');x.fillStyle=g;x.fillRect(0,0,w,h);
    x.fillStyle=['#2a1a10','#101820','#3a1010','#1a1a1a','#2a2a40','#40301a'][i];x.beginPath();x.ellipse(w/2,h*.95,52,48,0,Math.PI,0);x.fill();x.fillStyle=['#e8c8a8','#d8b090','#f0d8c0','#c89878','#e0c0a0','#d0a888'][i];x.beginPath();x.ellipse(w/2,h*.42,20,26,0,0,7);x.fill();
    x.fillStyle=['#3a2a1a','#d0d0d0','#1a1010','#6a4a2a','#b0b0b0','#2a1a10'][i];x.beginPath();x.ellipse(w/2,h*.33,22,14,0,Math.PI,0);x.fill();if(i%2){x.fillStyle='#ddd';x.fillRect(w/2-12,h*.52,24,8)}x.fillStyle='#000';x.fillRect(w/2-9,h*.41,4,3);x.fillRect(w/2+5,h*.41,4,3)}));
  SBX2.fresco=sbCanvas(1024,320,(x,w,h)=>{const g=x.createLinearGradient(0,0,0,h);g.addColorStop(0,'#a8c4c8');g.addColorStop(.6,'#d8d0b0');g.addColorStop(1,'#8a9a6a');x.fillStyle=g;x.fillRect(0,0,w,h);
    for(let i=0;i<9;i++){const tx=60+i*115;x.fillStyle='#5a6a4a';x.beginPath();x.ellipse(tx,h*.45,30,70,0,0,7);x.fill();x.fillStyle='#6a5a40';x.fillRect(tx-4,h*.55,8,h*.4)}
    for(let i=0;i<14;i++){const fx=40+i*72+R(-10,10),fy=h*.62;x.fillStyle=['#e8e0d0','#c8b8a0','#d8c0a0','#b8c8d8'][i%4];x.beginPath();x.moveTo(fx-12,h*.95);x.lineTo(fx-7,fy);x.lineTo(fx+7,fy);x.lineTo(fx+12,h*.95);x.fill();x.fillStyle='#e8c8a0';x.beginPath();x.arc(fx,fy-9,7,0,7);x.fill()}
    x.fillStyle='rgba(255,250,230,.35)';x.fillRect(0,0,w,h*.08);x.font='italic 26px Georgia';x.fillStyle='#4a3a2a';x.textAlign='center';x.fillText('Le Bois sacré',w/2,h*.07+16)});
  return SBX2}

/* ---------- geometry: per-room walls (heights, headers over doorways), floors, ceilings ---------- */
const SBH={R3:11};const sbStyle=k=>k[0]==='R'?k:'C';const sbHt=k=>SBH[sbStyle(k)]||7;
sbBuildTunnel=function(){const G=SB.tu=new THREE.Group();SB.g.add(G);const T=sbTex(),T2=sbTex2(),X=SBT.x;const B=SBW.tu,x0=B.x0,z0=B.z0,NX=B.x1-B.x0,NZ_=B.z1-B.z0;
  const keys=Object.keys(SBRM),rects=keys.map(k=>SBRM[k]);const W=new Int8Array(NX*NZ_).fill(-1);
  for(let j=0;j<NZ_;j++)for(let i=0;i<NX;i++){const cx=x0+i+.5,cz=z0+j+.5;for(let r=0;r<rects.length;r++){const q=rects[r];if(cx>q[0]&&cx<q[1]&&cz>q[2]&&cz<q[3]){W[j*NX+i]=r;break}}}
  const ri=(i,j)=>i>=0&&j>=0&&i<NX&&j<NZ_?W[j*NX+i]:-1;
  /* collision from the walkable mask */
  let open={};for(let j=0;j<=NZ_;j++){const runs={};if(j<NZ_){let i=0;while(i<NX){if(W[j*NX+i]<0){let k=i;while(k<NX&&W[j*NX+k]<0)k++;runs[i+','+k]=1;i=k}else i++}}
    for(const key in open)if(!runs[key]){const b=open[key];sbCol('tu',x0+b.i0,x0+b.i1,z0+b.j0,z0+j,40);delete open[key]}for(const key in runs)if(!open[key]){const [a,c]=key.split(',').map(Number);open[key]={i0:a,i1:c,j0:j}}}
  /* walls: full height where the neighbour is solid, a header where the neighbour is a lower space */
  const grp={};const push=(ax,line,sg,st,y0,y1,pos)=>{const k=[ax,line,sg,st,y0,y1].join('|');(grp[k]=grp[k]||[]).push(pos)};
  for(let j=0;j<NZ_;j++)for(let i=0;i<NX;i++){const r=W[j*NX+i];if(r<0)continue;const k=keys[r],st=sbStyle(k),h=sbHt(k);
    for(const [di,dj,ax,line,sg,pos] of[[0,-1,'z',z0+j,1,x0+i],[0,1,'z',z0+j+1,-1,x0+i],[-1,0,'x',x0+i,1,z0+j],[1,0,'x',x0+i+1,-1,z0+j]]){const n=ri(i+di,j+dj);if(n<0)push(ax,line,sg,st,0,h,pos);else{const nh=sbHt(keys[n]);if(nh<h)push(ax,line,sg,st,nh,h,pos)}}}
  const Q={},mat={};const T2s={C:T2.C,R1:T2.R1,R2:T2.R2,R3:T2.R3,R4:T2.R4};
  for(const k in grp){const [ax,lineS,sgS,st,y0s,y1s]=k.split('|');const line=+lineS,sg=+sgS,y0=+y0s,y1=+y1s,H=SBH[st]||7;const q=Q[st]=Q[st]||sbQuads();const L=grp[k].sort((a,b)=>a-b);let a=L[0],p=L[0];
    const emit=(s,e)=>{if(ax==='z')q.add(V3(s,y0,line),V3(e,y0,line),V3(e,y1,line),V3(s,y1,line),V3(0,0,sg),v=>[v.x/4,v.y/H]);else q.add(V3(line,y0,s),V3(line,y0,e),V3(line,y1,e),V3(line,y1,s),V3(sg,0,0),v=>[v.z/4,v.y/H])};
    for(let n=1;n<=L.length;n++){if(n<L.length&&L[n]===p+1){p=L[n];continue}emit(a,p+1);if(n<L.length)a=p=L[n]}}
  for(const st in Q){const t=T2s[st].clone();t.needsUpdate=true;G.add(Q[st].mesh(std({map:t,emissive:0xffb070,emissiveMap:t,emissiveIntensity:.26,roughness:.85})))}
  const F=sbQuads(),Fp=sbQuads(),Cq={};for(let r=0;r<rects.length;r++){const q=rects[r],k=keys[r],st=sbStyle(k),h=sbHt(k);(st==='C'?F:Fp).add(V3(q[0],0,q[2]),V3(q[1],0,q[2]),V3(q[1],0,q[3]),V3(q[0],0,q[3]),V3(0,1,0),v=>[v.x/4,v.z/4]);
    const c=Cq[h]=Cq[h]||sbQuads();c.add(V3(q[0],h,q[2]),V3(q[1],h,q[2]),V3(q[1],h,q[3]),V3(q[0],h,q[3]),V3(0,-1,0),v=>[v.x/4,v.z/4])}
  const tf=T.flag.clone();tf.needsUpdate=true;G.add(F.mesh(std({map:tf,emissive:0xffa860,emissiveMap:tf,emissiveIntensity:.22,roughness:.8})));
  const tp=T2.parq.clone();tp.needsUpdate=true;G.add(Fp.mesh(std({map:tp,emissive:0xffa860,emissiveMap:tp,emissiveIntensity:.24,roughness:.55})));
  for(const h in Cq){const tc=T2.coff.clone();tc.needsUpdate=true;G.add(Cq[h].mesh(std({map:tc,emissive:0xffa860,emissiveMap:tc,emissiveIntensity:.18,roughness:.9})))}
  /* the corridor: a long carpet, arches, sconces, portraits and busts */
  const runT=T2.run.clone();runT.needsUpdate=true;runT.repeat.set(1,58);const run=new THREE.Mesh(new THREE.PlaneGeometry(3.2,236),std({map:runT,emissive:0xff9060,emissiveMap:runT,emissiveIntensity:.2,roughness:.95}));run.rotation.x=-Math.PI/2;run.position.set(X,.02,-112);G.add(run);
  const tw=T.lime.clone();tw.needsUpdate=true;const st=std({map:tw,color:0xb8a080,emissive:0xffa860,emissiveMap:tw,emissiveIntensity:.18,roughness:.9}),gold=std({color:0xd8aa50,emissive:0x3a2606,roughness:.3,metalness:.8}),marble=std({color:0xe8e4dc,emissive:0x2a2826,roughness:.35});
  SB.sconce=[];let pi=0;
  for(let z=0;z>-230;z-=10){sbBox(G,.8,6.6,.8,X-3.6,3.3,z,st);sbBox(G,.8,6.6,.8,X+3.6,3.3,z,st);const ar=new THREE.Mesh(new THREE.TorusGeometry(3.6,.32,8,20,Math.PI),st);ar.position.set(X,5,z);G.add(ar);
    for(const s of[-1,1]){const sp=glowSprite(0xffa850,3.6,.75);sp.position.set(X+s*3.25,3.6,z-.9);G.add(sp);SB.sconce.push(sp);sbBox(G,.12,.5,.12,X+s*3.35,3.3,z-.9,gold)}
    const mid=z-5;for(const s of[-1,1]){if(Math.abs(mid+38)<6&&s>0||Math.abs(mid+93)<6&&s<0||Math.abs(mid+150)<6&&s>0)continue;if((pi++)%3===2){const pz=V3(X+s*3.3,0,mid);sbBox(G,.7,1.2,.7,pz.x,.6,pz.z,marble);const hd=new THREE.Mesh(new THREE.SphereGeometry(.26,14,10),marble);hd.position.set(pz.x,1.62,pz.z);G.add(hd);sbBox(G,.6,.3,.4,pz.x,1.35,pz.z,marble)}
      else{const fr=new THREE.Group();fr.position.set(X+s*3.97,3.3,mid);fr.rotation.y=s>0?-Math.PI/2:Math.PI/2;G.add(fr);sbBox(fr,1.5,1.9,.08,0,0,0,gold);const pc=T2.portrait[pi%6];const pm=new THREE.Mesh(new THREE.PlaneGeometry(1.28,1.65),std({map:pc,emissive:0xffffff,emissiveMap:pc,emissiveIntensity:.35,roughness:.8}));pm.position.z=.05;fr.add(pm)}}}
  for(let k=0;k<6;k++)sbBox(G,8,.3,1,X,.15+k*.3,7.6-k*.01,st);const up=glowSprite(0xffd8a0,8,.4);up.position.set(X,4,8);G.add(up);
  const jar=new THREE.Mesh(new THREE.SphereGeometry(.35,14,10),std({color:0x3a5a40,emissive:0x1a6a30,transparent:true,opacity:.85,roughness:.2}));jar.position.set(X-3,.4,-28);jar.scale.y=1.3;G.add(jar);const jg=glowSprite(0x7dff9a,1.6,.4);jg.position.copy(jar.position);G.add(jg);SB.jar={m:jar,g:jg,t:0};sbBox(G,.9,.2,.9,X-3,.1,-28,gold);
  sbRoom1(G);sbRoom2(G);sbRoom3(G);sbRoom4(G)};
function sbRug(G,tex,x,z,w,d,ry){const t=tex.clone();t.needsUpdate=true;const m=new THREE.Mesh(new THREE.PlaneGeometry(w,d),std({map:t,emissive:0xff9a60,emissiveMap:t,emissiveIntensity:.22,roughness:.95}));m.rotation.x=-Math.PI/2;m.rotation.z=ry||0;m.position.set(x,.03,z);G.add(m);return m}
function sbChand(G,x,y,z,s){s=s||1;const gold=std({color:0xd8aa50,emissive:0x5a3a08,roughness:.3,metalness:.8});const c=new THREE.Group();c.position.set(x,y,z);G.add(c);const ch=new THREE.Mesh(new THREE.CylinderGeometry(.03,.03,1.4,6),gold);ch.position.y=.7;c.add(ch);
  const r=new THREE.Mesh(new THREE.TorusGeometry(1.1*s,.06,8,28),gold);r.rotation.x=Math.PI/2;c.add(r);const r2=new THREE.Mesh(new THREE.TorusGeometry(.6*s,.05,8,20),gold);r2.rotation.x=Math.PI/2;r2.position.y=-.35;c.add(r2);
  for(let k=0;k<8;k++){const a=k/8*TAU;const g=glowSprite(0xffd090,.9,.85);g.position.set(Math.cos(a)*1.1*s,.18,Math.sin(a)*1.1*s);c.add(g)}const gg=glowSprite(0xffc070,7*s,.28);c.add(gg);(SB.chand=SB.chand||[]).push(c);return c}
/* Room 1 · the Archives */
sbRoom1=function(G){const r=SBRM.R1,X=SBT.x,T2=sbTex2();sbShelf(G,r[1]-.45,(r[2]+r[3])/2,r[3]-r[2]-2,-Math.PI/2,6);sbShelf(G,(r[0]+r[1])/2+2,r[2]+.45,r[1]-r[0]-6,0,6);sbShelf(G,(r[0]+r[1])/2+2,r[3]-.45,r[1]-r[0]-6,Math.PI,6);
  sbCol('tu',r[1]-.9,r[1],r[2],r[3],40);sbCol('tu',r[0]+2,r[1],r[2],r[2]+.9,40);sbCol('tu',r[0]+2,r[1],r[3]-.9,r[3],40);sbRug(G,T2.rugA,X+21,-38,14,10);
  const desk=std({color:0x4a2a18,emissive:0x140804,roughness:.6}),green=std({color:0x1a6a3a,emissive:0x1a6a3a,emissiveIntensity:.6,roughness:.3}),brass=std({color:0xc8963a,emissive:0x2a1804,roughness:.3,metalness:.8});
  sbBox(G,1.4,1,3,X+15,.5,-38,desk);sbCol('tu',X+14.3,X+15.7,-39.5,-36.5,1.1);const lamp=glowSprite(0xffd890,2.2,.8);lamp.position.set(X+15,1.5,-37);G.add(lamp);
  for(let k=0;k<6;k++)sbBox(G,.5,.12+Math.random()*.1,.7,X+15+rand(-.4,.4),1.06+k*.13,-39+rand(-.2,.2),std({color:[0x7a1a1a,0x1a3a6a,0x2a5a2a,0x6a4a1a][k%4],roughness:.8}));
  for(const tz of[-46,-30]){sbBox(G,5,.12,1.8,X+23,.92,tz,desk);for(const lx of[-1.8,1.8])sbBox(G,.12,.9,.12,X+23+lx,.45,tz,desk);sbCol('tu',X+20.5,X+25.5,tz-.9,tz+.9,1);
    for(const lx of[-1.2,1.2]){const sh=new THREE.Mesh(new THREE.CylinderGeometry(.08,.28,.22,12,1,true),green);sh.position.set(X+23+lx,1.38,tz);G.add(sh);sbBox(G,.04,.4,.04,X+23+lx,1.15,tz,brass);const g=glowSprite(0xb8ff90,1.4,.7);g.position.set(X+23+lx,1.25,tz);G.add(g)}
    for(const cx of[-1.6,0,1.6])sbBox(G,.5,.5,.5,X+23+cx,.25,tz+(tz<-38?-1.3:1.3),desk)}
  const lad=new THREE.Group();lad.position.set(r[1]-1.4,0,-26);lad.rotation.z=.18;G.add(lad);for(const s of[-.3,.3])sbBox(lad,.08,5.6,.08,0,2.8,s,desk);for(let k=0;k<9;k++)sbBox(lad,.06,.06,.66,0,.5+k*.6,0,desk);
  sbChand(G,X+21,5.3,-38,1.1)};
/* Room 2 · the Cabinet of Instruments */
{const _r2=sbRoom2;sbRoom2=function(G){const T2=sbTex2();const r=SBRM.R2,cx=(r[0]+r[1])/2,cz=(r[2]+r[3])/2;const rg=sbRug(G,T2.rugB,cx,cz,17,17);_r2(G);sbChand(G,cx+7,5.4,cz-8,.8);sbChand(G,cx-7,5.4,cz+8,.8);
  const gold=std({color:0xd8aa50,emissive:0x3a2606,roughness:.3,metalness:.8});const fr=new THREE.Group();fr.position.set(cx,3.6,r[3]-.06);fr.rotation.y=Math.PI;G.add(fr);sbBox(fr,6.4,3.4,.08,0,0,0,gold);
  const sm=sbCanvas(512,256,(x,w,h)=>{x.fillStyle='#0c1430';x.fillRect(0,0,w,h);x.strokeStyle='rgba(220,200,140,.5)';for(let i=0;i<6;i++){x.beginPath();x.arc(w/2,h/2,20+i*22,0,7);x.stroke()}for(let i=0;i<90;i++){x.fillStyle='#ffe8a0';x.fillRect(Math.random()*w,Math.random()*h,2,2)}x.font='italic 22px Georgia';x.fillStyle='#e8d8a0';x.fillText('Harmonia Macrocosmica',140,240)});
  const pm=new THREE.Mesh(new THREE.PlaneGeometry(6,3),std({map:sm,emissive:0xffffff,emissiveMap:sm,emissiveIntensity:.45}));pm.position.z=.05;fr.add(pm)}}
/* Room 3 · a real amphitheatre: tiered curved rows, a central carpeted aisle, a lecture platform, a fresco, chandeliers */
const SBAM={L:null,plat:null};
sbRoom3=function(G){const r=SBRM.R3,X=SBT.x,T2=sbTex2(),cz=(r[2]+r[3])/2;const L=V3(r[1]-6,0,cz);SBAM.L=L;SBAM.plat={x0:r[1]-9,x1:r[1],z0:r[2],z1:r[3],h:.45};
  const wood=std({color:0x6a4226,emissive:0x1c0e04,roughness:.6}),dark=std({color:0x3a2010,emissive:0x100804,roughness:.7}),velvet=std({color:0x8a1a22,emissive:0x2a0406,roughness:.9}),gold=std({color:0xd8aa50,emissive:0x3a2606,roughness:.3,metalness:.8});
  const sector=(R0,R1,a0,a1,h,mat,y)=>{const sh=new THREE.Shape();const P_=(R,a)=>[Math.cos(a)*R,-Math.sin(a)*R];let p=P_(R1,a0);sh.moveTo(p[0],p[1]);for(let k=1;k<=16;k++){p=P_(R1,a0+(a1-a0)*k/16);sh.lineTo(p[0],p[1])}for(let k=16;k>=0;k--){p=P_(R0,a0+(a1-a0)*k/16);sh.lineTo(p[0],p[1])}
    const m=new THREE.Mesh(new THREE.ExtrudeGeometry(sh,{depth:h,bevelEnabled:false,curveSegments:4}),mat);m.rotation.x=-Math.PI/2;m.position.set(L.x,y||0,L.z);G.add(m);return m};
  for(let k=0;k<5;k++){const R=8+k*2.5,hk=.32*(k+1);for(const [a0,a1] of[[Math.PI-1.0,Math.PI-.14],[Math.PI+.14,Math.PI+1.0]]){sector(R-1.25,R+1.25,a0,a1,hk,wood);sector(R+.55,R+.95,a0,a1,.85,dark,hk);sector(R-.35,R+.5,a0,a1,.42,velvet,hk);
      for(let a=a0+.9/R;a<=a1-.9/R+1e-3;a+=1.5/R){const px=L.x+Math.cos(a)*R,pz=L.z+Math.sin(a)*R;sbCol('tu',px-.85,px+.85,pz-.85,pz+.85,hk+.7)}}}
  /* platform, lectern, chalkboard, the fresco */
  sbBox(G,9,.45,r[3]-r[2],r[1]-4.5,.225,cz,wood);sbBox(G,9.1,.08,r[3]-r[2],r[1]-4.5,.47,cz,gold);
  const lec=new THREE.Group();lec.position.set(r[1]-6,.45,cz);G.add(lec);sbBox(lec,1.2,1.25,2.2,0,.62,0,dark);sbBox(lec,1.4,.1,2.4,0,1.3,0,wood);sbBox(lec,.05,.9,1.6,-.62,.7,0,gold);sbCol('tu',r[1]-6.6,r[1]-5.4,cz-1.1,cz+1.1,1.9);
  const T=sbTex();const bd=new THREE.Mesh(new THREE.PlaneGeometry(10,4.4),std({map:T.board,emissive:0xffffff,emissiveMap:T.board,emissiveIntensity:.4,roughness:.9}));bd.position.set(r[1]-.1,2.9,cz);bd.rotation.y=-Math.PI/2;G.add(bd);
  const ff=new THREE.Group();ff.position.set(r[1]-.08,7.6,cz);ff.rotation.y=-Math.PI/2;G.add(ff);sbBox(ff,30.6,6.4,.1,0,0,0,gold);const fm=new THREE.Mesh(new THREE.PlaneGeometry(30,5.8),std({map:T2.fresco,emissive:0xffffff,emissiveMap:T2.fresco,emissiveIntensity:.5,roughness:.9}));fm.position.z=.06;ff.add(fm);
  const runT=T2.run.clone();runT.needsUpdate=true;runT.repeat.set(1,6);const run=new THREE.Mesh(new THREE.PlaneGeometry(2.2,r[1]-9-r[0]),std({map:runT,emissive:0xff9060,emissiveMap:runT,emissiveIntensity:.2}));run.rotation.x=-Math.PI/2;run.rotation.z=Math.PI/2;run.position.set((r[0]+r[1]-9)/2,.03,cz);G.add(run);
  sbRug(G,T2.rugC,r[1]-4.5,cz,7,12).position.y=.48;
  for(const [dx,dz] of[[-14,-8],[-14,8],[-4,0]])sbChand(G,r[1]+dx,9,cz+dz,1.3);
  for(const s of[-1,1]){const g=glowSprite(0xffd8a0,5,.5);g.position.set(r[1]-2,5,cz+s*9);G.add(g)}};
{const _g=groundAt;groundAt=function(x,z,y){const p=SBAM.plat;if(p&&MODE!=='open'&&x>p.x0&&x<p.x1&&z>p.z0&&z<p.z1)return p.h;return _g.apply(this,arguments)}}
/* Room 4 · the sealed library */
{const _r4=sbRoom4;sbRoom4=function(G){const T2=sbTex2(),X=SBT.x;sbRug(G,T2.rugA,X,-249,10,14);_r4(G);sbChand(G,X,5.3,-247,.9)}}

/* ---------- NPCs: different faces, clothes, props, idles ---------- */
function sbShape(a,spec){const B=n=>a.bones.find(b=>b.name===n);const list=Object.entries(spec).map(([n,s])=>[B(n),s]).filter(q=>q[0]);const _u=a.update.bind(a);a.update=dt=>{_u(dt);for(const [b,s] of list)b.scale.set(s[0],s[1],s[2])};a.update(0)}
sbNPCs=function(){const N=SB.npc;const mk=(k,sx,o,pos,ry,parent,idle)=>{let a=null;try{a=makeCHActor(sx,o)}catch(x){console.warn(x)}if(!a)return null;a.g.position.copy(pos);a.g.rotation.y=ry;(parent||SB.g).add(a.g);a.idleA=idle||'Idle_Loop';try{a.setBase(a.idleA,.1);a.update(.5)}catch(x){}N[k]=a;SB.acts.push(a);return a};
  /* Gérard: night porter, flat cap, scarf, lantern */
  const g=mk('g','m',{skin:0xe2b89a,hair:'hairBuzz',hairCol:0xc8c4bc,brow:0xb8b4ac,beard:true,keepReg:[5,6,9],scale:.95,wear:[['coat',0x1a2440,{roughness:.8}],['trousers',0x14182a],['shoes',0x1a120c],['scarf',0x7a1a22],['hat1',0x1c1c24]]},V3(6031,0,-66.6),0,SB.pl,'Idle_Lantern_Loop');
  if(g){try{nhOld(g,.18,.86)}catch(x){}sbShape(g,{Head:[1.04,1.05,1.0]});const ln=new THREE.Group();const brass=std({color:0xc8963a,emissive:0x3a2004,roughness:.3,metalness:.8});sbBox(ln,.16,.22,.16,0,-.18,0,std({color:0xffe0a0,emissive:0xffb050,emissiveIntensity:1.2,transparent:true,opacity:.8}));sbBox(ln,.2,.03,.2,0,-.06,0,brass);sbBox(ln,.2,.03,.2,0,-.3,0,brass);const lg=glowSprite(0xffc060,1.8,.8);lg.position.y=-.18;ln.add(lg);g.handR.add(ln)}
  /* Madame Ombline: silver buns, glasses, pearls, burgundy dress */
  const o=mk('o','f',{skin:0xf2dccc,hair:'hairBuns',hairCol:0xd9d6de,brow:0x9a9490,keepReg:[5,6,9],scale:.92,wear:[['dress',0x4a1428,{roughness:.85}],['jacket',0x2a0e18,{roughness:.8}],['shoes',0x1a0c10],['glasses',0x2a1a10,{roughness:.3,metalness:.6}],['pearls',0xf4f0e8,{roughness:.2}]]},V3(SBT.x+16.2,0,-38),-Math.PI/2,SB.tu,'Idle_FoldArms_Loop');
  if(o){try{nhOld(o,.14,.9)}catch(x){}sbShape(o,{Head:[.97,1.02,.94]})}
  /* Monsieur Tic: small, ginger-grey beard, mustard scarf, tinkering */
  const t=mk('t','m',{skin:0xf0c8a8,hair:'hairPart',hairCol:0xa8683a,brow:0x8a5a3a,beard:true,keepReg:[5,6,9],scale:.86,wear:[['jacket',0x5a3a1a,{roughness:.8}],['trousers',0x2a2018],['shoes',0x1a120c],['scarf',0xc89a2a],['hat2',0x3a2a1a]]},V3(SBT.x-10.5,0,-89),Math.PI/2,SB.tu,'Fixing_Kneeling');
  if(t){sbShape(t,{Head:[1.08,1.1,1.06]});t.talkA='Idle_Talking_Loop'}
  /* Professor Vasseur: a ghost, round, white beard, ghost spectacles, still lecturing */
  const L=SBAM.L||V3(SBRM.R3[1]-6,0,-150);
  const v=mk('v','m',{skin:0xe8f0f8,hair:'hairPart',hairCol:0xf4f4f4,brow:0xf0f0f0,beard:true,keepReg:[5,6,9],scale:1.02,wear:[['coat',0x202838],['trousers',0x181c28],['shoes',0x101018],['scarf',0x3a4a6a],['glasses',0xbfe8ff,{emissive:0x8ad0ff,emissiveIntensity:1}]]},V3(L.x+1.6,0,L.z),-Math.PI/2,SB.tu,'Idle_Talking_Loop');
  if(v){sbShape(v,{spine_01:[1,1.32,1.38],spine_02:[1,1/1.32*1.12,1/1.38*1.16],Head:[1.1,1.04,1.12],neck_01:[1,1/1.12,1/1.16]});sbGhost(v);const vg=glowSprite(0x8ad0ff,4,.35);vg.position.y=1.2;v.g.add(vg)}};

/* ---------- the gate portal pulls you in ---------- */
{const _mt=muTick;muTick=function(dt){_mt(dt);if(!started||MODE==='open'||CH2.zone!=='latin'||SB.area!=='plaza'||CS.active||CH2.st<25)return;if(Math.hypot(P.pos.x-6034,P.pos.z+69.4)<2.6&&!SB.goT){SB.goT=1;sbGo('tun');after(2,()=>SB.goT=0)}}}

/* ---------- Kaen gets impatient if you stand still for too long ---------- */
const IDL={t:0,n:0,next:31,last:null};
const IDLN=[
  ['Kaen',"Maëlle? Why aren't you moving?",'id_01','@',"I don't know... I'm just thinking.",'id_02'],
  ['Kaen',"Okay. Take your time. Paris isn't going anywhere.",'id_03'],
  ['Kaen',"You alright? You've gone very quiet.",'id_04','@',"Mm-hm. I'm fine.",'id_05'],
  ['Kaen',"We can't just stand here forever, you know.",'id_06'],
  ['Kaen',"Damn. Move. Hello?",'id_07'],
  ['Kaen',"Maëlle. Hello? Anybody in there?",'id_08','@',"Hm? What? Sorry.",'id_09'],
  ['Kaen',"We lost Maëlle. She's tripping. Move!",'id_10'],
  ['Kaen',"I've seen statues with more ambition.",'id_11'],
  ['Kaen',"If the Crown finds us like this, I'm telling it you volunteered.",'id_12'],
  ['Kaen',"That's it, I'm counting. One... two... I'm serious, move!",'id_13'],
  ['Kaen',"MAËLLE! MOVE! NOW!",'id_14']];
for(const q of IDLN){VO_MAP[q[1]]=q[2];if(q[4])VO_MAP[q[4]]=q[5]}
const VOPK6={idx:/*VOPK6IDX*/{"id_01":[0,19479],"id_02":[19479,21986],"id_03":[41465,29301],"id_04":[70766,24494],"id_05":[95260,14881],"id_06":[110141,19688],"id_07":[129829,22822],"id_08":[152651,25121],"id_09":[177772,18016],"id_10":[195788,29719],"id_11":[225507,23240],"id_12":[248747,33480],"id_13":[282227,44556],"id_14":[326783,20733]},p:null};
{const _vr=voRaw;voRaw=function(k){const ix=VOPK6.idx[k];if(!ix||VO.raw[k])return _vr(k);if(!VOPK6.p)VOPK6.p=fetch('assets/vo27.mp3').then(r=>r.ok?r.arrayBuffer():null).catch(()=>null);
  VO.raw[k]=VOPK6.p.then(b=>b&&b.byteLength>=ix[0]+ix[1]?b.slice(ix[0],ix[0]+ix[1]):fetch('assets/'+k+'.mp3').then(r=>r.ok?r.arrayBuffer():null).catch(()=>null));return VO.raw[k]}}
{const _mt=muTick;muTick=function(dt){_mt(dt);if(!started||paused||MODE==='open')return;
  const ok=!CS.active&&P.alive&&!bossRef&&!XO.fc&&typeof kfwOn==='function'&&kfwOn()&&KFW.a&&KFW.a.g.visible&&!KFW.pin&&!(SB.exam);
  const p=P.pos;if(!IDL.last)IDL.last=p.clone();const moved=Math.hypot(p.x-IDL.last.x,p.z-IDL.last.z)>.04||Math.abs(p.y-IDL.last.y)>.08||P.flying;IDL.last.copy(p);
  if(moved||!ok){if(moved){IDL.t=0;IDL.n=0;IDL.next=31}return}
  IDL.t+=Math.min(dt,.1);if(IDL.t<IDL.next)return;const i=IDL.n<IDLN.length?IDL.n:7+((IDL.n-IDLN.length)%4);const q=IDLN[i];IDL.n++;IDL.next=IDL.t+(IDL.n<IDLN.length?12:22);
  epSay(q[0],q[1],0);if(q[3])epSay(q[3],q[4],0);try{if(KFW.a){x4Face(KFW.a,P.pos);KFW.a.fire&&KFW.a.fire(i>=6?'Idle_No_Loop':'Yes',1.2)}}catch(x){}if(i===10){P.shake=Math.max(P.shake,.25)}}}
