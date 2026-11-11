/* ================= CHAPTER XVII · The Sorbonne ================= */
/* Lyra opens a door home. Under the Sorbonne, a chain of strange people who remember Morwen. No monsters. */
const XL4={
  sb_01:"I can feel all of it again. Every thread. Nobody is drinking from me anymore.",
  sb_02:"Then we don't fly home. Morwen studied ancient magic at the Sorbonne, years ago. The old faculty, under the chapel. If anyone remembers her, they're down there.",
  sb_03:"Then that's where we start. Lyra, can you get us there?",
  sb_04:"Stand close to me. Paris, the Sorbonne... Hold on to something.",
  sb_05:"Place de la Sorbonne. I aimed well, for once.",
  sb_06:"There's always a night porter at the gate. Be polite. He's older than the walls.",
  sb_07:"Closed! Closed since seven o'clock. Unless... you are here about Descartes?",
  sb_08:"Who's Descartes?",
  sb_09:"My cat. Black, rude, and he thinks, therefore he is everywhere at once. Catch him for me, and I open any door you like.",
  sb_10:"Descartes! You impossible animal. Bon. What do you want, mademoiselle?",
  sb_11:"A woman called Morwen. She studied ancient magic here, a long time ago.",
  sb_12:"Morwen... I don't remember faces, only keys. But Madame Ombline remembers every book that ever left this building. Down in the Réserves, through the courtyard. And don't touch anything that whispers.",
  sb_13:"Shh! Quietly. The books are restless tonight. Something enormous walked through London, and every one of them woke up.",
  sb_14:"We're looking for Morwen. She studied here.",
  sb_15:"Five of my books have flown off their shelves. Catch them, put them back, and I will tell you what I know.",
  sb_16:"There. Thank you, dear. Morwen... clever girl, terrible handwriting. She spent her nights in the Cabinet of Instruments with Monsieur Tic. Ask him for the register.",
  sb_17:"Visitors! Don't touch the orrery. Unless, of course, you can play it.",
  sb_18:"Play it?",
  sb_19:"The planets sing in order. Watch the order, then step on their stones in the same order. Get it right, and the register opens.",
  sb_20:"No, no, no. Again. Listen with your eyes.",
  sb_21:"Bravo! The register. Nineteen ninety-eight... here. Morwen borrowed De Corona Vacua. On the hollow crown. Signed out by Professor Vasseur.",
  sb_22:"She was studying the Crown. Long before it ever found her.",
  sb_23:"Vasseur is in the old amphitheatre. He died in two thousand and three, but he still gives his lecture every night. Nobody had the heart to tell him.",
  sb_24:"Late! Sit down. No? Then you will take the oral exam. Three questions. Fail, and you repeat the year.",
  sb_25:"First question. What does a hollow crown feed on?",
  sb_26:"Second. Who has been hiding from it on Portobello Road for longer than you have been alive?",
  sb_27:"Third. A hollow crown can only ever be... what?",
  sb_28:"Wrong! Again, from the beginning.",
  sb_29:"Passed. Barely. Morwen was my finest student. She left something with me, in case anyone ever came asking. A key. Her carrel is in the sealed library, at the end of the tunnel.",
  sb_30:"Her notes. Pages and pages on the Crown. She knew exactly what it was.",
  sb_31:"There's a letter. “If it ever takes me, don't come for me with fire. Come with my name.”",
  sb_32:"Her name? We know her name. Morwen.",
  sb_33:"Her true name, Maëlle. The one she was born with. Say it to a soul and it remembers itself. That's how you pull someone out of a thing like the Crown.",
  sb_34:"Morwen isn't her real name. She never told anyone. Not even me.",
  sb_35:"Then we find it. Whatever it takes.",
  sb_36:"Come here, you little...",
  sb_37:"He's playing with you. Cats always win."};
for(const k in XL4)VO_MAP[XL4[k]]=k;
const sbSay=(w,k,p)=>epSay(w,XL4[k],p);
const SBN={g:'Gérard',o:'Madame Ombline',t:'Monsieur Tic',v:'Professor Vasseur'};
Object.assign(SPEAKER,{'Gérard':'#e2cc9a','Madame Ombline':'#f0a8c8','Monsieur Tic':'#ffd27a','Professor Vasseur':'#a8e8ff'});
const VOPK5={idx:/*VOPK5IDX*/{"sb_01":[0,52706],"sb_02":[52706,96174],"sb_03":[148880,31390],"sb_04":[180270,41213],"sb_05":[221483,33480],"sb_06":[254963,49154],"sb_07":[304117,47482],"sb_08":[351599,12164],"sb_09":[363763,70679],"sb_10":[434442,43511],"sb_11":[477953,47273],"sb_12":[525226,105996],"sb_13":[631222,65663],"sb_14":[696885,22613],"sb_15":[719498,50826],"sb_16":[770324,94711],"sb_17":[865035,37242],"sb_18":[902277,8612],"sb_19":[910889,73186],"sb_20":[984075,37660],"sb_21":[1021735,93666],"sb_22":[1115401,39332],"sb_23":[1154733,74649],"sb_24":[1229382,66290],"sb_25":[1295672,33898],"sb_26":[1329570,53124],"sb_27":[1382694,39959],"sb_28":[1422653,26375],"sb_29":[1449028,112057],"sb_30":[1561085,49990],"sb_31":[1611075,54796],"sb_32":[1665871,27629],"sb_33":[1693500,87188],"sb_34":[1780688,42257],"sb_35":[1822945,24703],"sb_36":[1847648,15717],"sb_37":[1863365,30346]},p:null};
{const _vr=voRaw;voRaw=function(k){const ix=VOPK5.idx[k];if(!ix||VO.raw[k])return _vr(k);if(!VOPK5.p)VOPK5.p=fetch('assets/vo26.mp3').then(r=>r.ok?r.arrayBuffer():null).catch(()=>null);
  VO.raw[k]=VOPK5.p.then(b=>b&&b.byteLength>=ix[0]+ix[1]?b.slice(ix[0],ix[0]+ix[1]):fetch('assets/'+k+'.mp3').then(r=>r.ok?r.arrayBuffer():null).catch(()=>null));return VO.raw[k]}}

const SBP={x:6000,z:0},SBT={x:6400,z:0};
const SB={g:null,pl:null,tu:null,area:null,hid:[],boxes:{pl:[],tu:[]},acts:[],anim:[],npc:{},s:{},t:0,boot:0,fog0:null,muteT:0,cat:null,books:[],orr:null,door:null,key:null,flyMsg:0,p23:0};
const SBW={pl:{x0:5952,x1:6048,z0:-114,z1:48},tu:{x0:SBT.x-36,x1:SBT.x+42,z0:-264,z1:10}};

/* ---------- textures ---------- */
function sbCanvas(w,h,fn){const c=document.createElement('canvas');c.width=w;c.height=h;fn(c.getContext('2d'),w,h);const t=new THREE.CanvasTexture(c);t.wrapS=t.wrapT=THREE.RepeatWrapping;t.anisotropy=4;return t}
const SBX={};
function sbTex(){if(SBX.ok)return SBX;SBX.ok=1;const R=(a,b)=>a+Math.random()*(b-a);
  SBX.lime=sbCanvas(256,256,(x,w,h)=>{x.fillStyle='#cdbf9f';x.fillRect(0,0,w,h);for(let r=0;r<8;r++)for(let c=0;c<4;c++){const o=r%2?32:0;x.fillStyle=`hsl(40,${R(18,26)}%,${R(64,74)}%)`;x.fillRect(c*64+o+1,r*32+1,62,30);x.fillRect(c*64+o-63,r*32+1,62,30)}x.fillStyle='rgba(60,50,35,.35)';for(let r=0;r<=8;r++)x.fillRect(0,r*32-1,w,2)});
  SBX.tun=sbCanvas(256,256,(x,w,h)=>{x.fillStyle='#3a2e24';x.fillRect(0,0,w,h);for(let r=0;r<8;r++)for(let c=0;c<5;c++){const o=r%2?26:0;x.fillStyle=`hsl(30,${R(14,24)}%,${R(30,42)}%)`;x.fillRect(c*52+o+2,r*32+2,48,28);x.fillRect(c*52+o-50,r*32+2,48,28)}for(let i=0;i<500;i++){x.fillStyle=`rgba(0,0,0,${R(0,.18)})`;x.fillRect(R(0,w),R(0,h),R(1,4),R(1,4))}});
  SBX.flag=sbCanvas(256,256,(x,w,h)=>{x.fillStyle='#2c2620';x.fillRect(0,0,w,h);for(let r=0;r<4;r++)for(let c=0;c<4;c++){x.fillStyle=`hsl(32,${R(8,16)}%,${R(22,34)}%)`;x.fillRect(c*64+2,r*64+2,60,60)}});
  SBX.cob=sbCanvas(256,256,(x,w,h)=>{x.fillStyle='#4a4650';x.fillRect(0,0,w,h);for(let r=0;r<16;r++)for(let c=0;c<16;c++){x.fillStyle=`hsl(240,${R(4,10)}%,${R(30,44)}%)`;x.beginPath();x.arc(c*16+8+(r%2)*8,r*16+8,R(6,7.5),0,7);x.fill()}});
  const win=(em)=>sbCanvas(256,256,(x,w,h)=>{x.fillStyle=em?'#000':'#d2c3a0';x.fillRect(0,0,w,h);if(!em){for(let i=0;i<900;i++){x.fillStyle=`rgba(90,70,40,${R(0,.08)})`;x.fillRect(R(0,w),R(0,h),R(2,8),R(1,3))}x.fillStyle='rgba(70,58,40,.45)';for(let r=0;r<4;r++)x.fillRect(0,r*64+61,w,3)}
    for(let r=0;r<4;r++)for(let c=0;c<4;c++){const lit=Math.random()<.32;const wx=c*64+22,wy=r*64+10;if(em){x.fillStyle=lit?`hsl(36,95%,${R(52,68)}%)`:'#000';x.fillRect(wx,wy,20,40);continue}
      x.fillStyle='#3a3a44';x.fillRect(wx-9,wy-2,8,44);x.fillRect(wx+21,wy-2,8,44);x.fillStyle=lit?'#ffcf80':'#1e2230';x.fillRect(wx,wy,20,40);x.fillStyle='rgba(0,0,0,.35)';x.fillRect(wx+9,wy,2,40);x.fillRect(wx,wy+18,20,2);
      x.fillStyle='#e6dabe';x.fillRect(wx-3,wy-6,26,4);if(r===1||r===3){x.strokeStyle='#15161a';x.lineWidth=1.5;x.strokeRect(wx-4,wy+30,28,10);for(let k=0;k<6;k++){x.beginPath();x.moveTo(wx-4+k*5.6,wy+30);x.lineTo(wx-4+k*5.6,wy+40);x.stroke()}}}});
  const MR=Math.random;Math.random=(s=>()=>(s=(s*16807)%2147483647)/2147483647)(1234567);SBX.win=win(0);Math.random=(s=>()=>(s=(s*16807)%2147483647)/2147483647)(1234567);SBX.winE=win(1);Math.random=MR;
  SBX.books=sbCanvas(256,256,(x,w,h)=>{x.fillStyle='#2a1a10';x.fillRect(0,0,w,h);const cols=['#7a1a1a','#1a3a6a','#2a5a2a','#6a4a1a','#4a1a4a','#8a6a2a','#1a1a1a','#5a2a1a'];for(let r=0;r<4;r++){let c=2;while(c<w-4){const bw=R(6,14);x.fillStyle=cols[(Math.random()*cols.length)|0];const bh=R(40,58);x.fillRect(c,r*64+62-bh,bw-1,bh);x.fillStyle='rgba(255,220,140,.35)';x.fillRect(c+1,r*64+62-bh+6,bw-3,2);c+=bw}x.fillStyle='#4a2e18';x.fillRect(0,r*64+60,w,4)}});
  SBX.board=sbCanvas(512,256,(x,w,h)=>{x.fillStyle='#1c2a22';x.fillRect(0,0,w,h);x.strokeStyle='rgba(240,240,230,.85)';x.lineWidth=3;x.beginPath();x.moveTo(170,170);x.lineTo(180,90);x.lineTo(215,130);x.lineTo(240,70);x.lineTo(265,130);x.lineTo(300,90);x.lineTo(310,170);x.closePath();x.stroke();x.beginPath();x.ellipse(240,175,72,12,0,0,7);x.stroke();
    x.font='italic 30px Georgia';x.fillStyle='rgba(240,240,230,.85)';x.fillText('De Corona Vacua',150,225);x.font='18px Georgia';x.fillText('· quod vacuum est, impleri vult ·',140,40);x.fillText('anima ↔ nomen',360,120);x.fillText('III',60,120)});
  SBX.page=sbCanvas(256,256,(x,w,h)=>{x.fillStyle='#e8dcc0';x.fillRect(0,0,w,h);x.strokeStyle='#3a2a1a';x.lineWidth=2.5;x.beginPath();x.moveTo(70,150);x.lineTo(80,80);x.lineTo(108,118);x.lineTo(128,62);x.lineTo(148,118);x.lineTo(176,80);x.lineTo(186,150);x.closePath();x.stroke();x.fillStyle='rgba(40,30,20,.6)';for(let i=0;i<9;i++)x.fillRect(30,170+i*9,R(120,196),2);x.font='italic 15px Georgia';x.fillStyle='#3a2a1a';x.fillText('it is hollow. it must be filled.',36,40)});
  return SBX}
const sbMat=(tex,rx,ry,o)=>{const t=tex.clone();t.needsUpdate=true;t.repeat.set(rx,ry);return std(Object.assign({map:t,roughness:.9},o||{}))};

/* ---------- geometry helpers ---------- */
function sbQuads(){const P_=[],N_=[],U_=[];return{P_,N_,U_,add(A,B,C,D,n,uv){const ab=B.clone().sub(A),ac=C.clone().sub(A),cr=ab.clone().cross(ac);let q=[A,B,C,D];if(cr.dot(n)<0)q=[A,D,C,B];
    for(const i of[0,1,2,0,2,3]){const v=q[i];P_.push(v.x,v.y,v.z);N_.push(n.x,n.y,n.z);const u=uv(v);U_.push(u[0],u[1])}},
  mesh(mat){const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(P_,3));g.setAttribute('normal',new THREE.Float32BufferAttribute(N_,3));g.setAttribute('uv',new THREE.Float32BufferAttribute(U_,2));const m=new THREE.Mesh(g,mat);m.frustumCulled=false;return m}}}
function sbBox(par,w,h,d,x,y,z,mat,ry){const m=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),mat);m.position.set(x,y,z);if(ry)m.rotation.y=ry;par.add(m);return m}
function sbCol(area,x0,x1,z0,z1,h){SB.boxes[area].push({x0,x1,z0,z1,h:h||40,sb:1})}

/* ---------- the plaza: Place de la Sorbonne ---------- */
function sbBuildPlaza(){const G=SB.pl=new THREE.Group();SB.g.add(G);const X=SBP.x,T=sbTex();
  const gr=new THREE.Mesh(new THREE.PlaneGeometry(130,190),sbMat(T.cob,22,32,{roughness:.95}));gr.rotation.x=-Math.PI/2;gr.position.set(X,0,-30);G.add(gr);
  const block=(x0,x1,z0,z1,h,face)=>{const w=x1-x0,d=z1-z0;const fm=std({map:(()=>{const t=T.win.clone();t.needsUpdate=true;t.repeat.set(Math.max(1,Math.round((face==='x'?d:w)/12)),Math.max(1,Math.round(h/12)));return t})(),emissive:0xffffff,emissiveIntensity:.85,
      emissiveMap:(()=>{const t=T.winE.clone();t.needsUpdate=true;t.repeat.set(Math.max(1,Math.round((face==='x'?d:w)/12)),Math.max(1,Math.round(h/12)));return t})(),roughness:.9});
    const side=std({color:0xb8a888,roughness:.9}),roof=std({color:0x4a5260,roughness:.7});const mats=face==='x'?[fm,fm,roof,side,side,side]:[side,side,roof,side,fm,fm];
    const m=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),mats);m.position.set((x0+x1)/2,h/2,(z0+z1)/2);G.add(m);
    const r=new THREE.Mesh(new THREE.CylinderGeometry(.01,1,1,4,1),roof);r.scale.set(face==='x'?d*.72:w*.72,4,face==='x'?w*.72:d*.72);r.rotation.y=Math.PI/4;r.position.set((x0+x1)/2,h+2,(z0+z1)/2);G.add(r);sbCol('pl',x0,x1,z0,z1,h)};
  block(5932,5960,-70,44,20,'x');block(6040,6068,-70,44,22,'x');block(5956,6044,40,64,19,'z');block(5940,5975,-118,-70,24,'z');stone(6025,6062,-118,-70,22);
  function stone(x0,x1,z0,z1,h){const w=x1-x0,d=z1-z0;const m=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),[sbMat(T.lime,d/8,h/6),sbMat(T.lime,d/8,h/6),std({color:0x4a5260,roughness:.7}),std({color:0xb8a888}),sbMat(T.lime,w/8,h/6),sbMat(T.lime,w/8,h/6)]);m.position.set((x0+x1)/2,h/2,(z0+z1)/2);G.add(m);sbCol('pl',x0,x1,z0,z1,h)}
  /* the chapel of the Sorbonne: portico, drum, dome, lantern */
  const lime=sbMat(T.lime,6,3),limeS=sbMat(T.lime,2,4),lead=std({color:0x5d6873,roughness:.45,metalness:.35}),gold=std({color:0xd8b060,emissive:0x3a2808,roughness:.35,metalness:.6});
  sbBox(G,50,22,40,X,11,-90,lime);sbCol('pl',5975,6025,-110,-70,40);
  for(let i=0;i<4;i++)sbBox(G,1.6,12,1.6,X-9+i*6,6,-68.6,limeS);for(const s of[-1,1]){sbBox(G,2.2,12,2.2,X+s*13,6,-69.5,limeS)}
  sbBox(G,32,1.4,4.2,X,12.7,-69.4,lime);  {const sh=new THREE.Shape();sh.moveTo(-16,0);sh.lineTo(16,0);sh.lineTo(0,5.2);sh.closePath();const pg=new THREE.Mesh(new THREE.ExtrudeGeometry(sh,{depth:3.6,bevelEnabled:false}),lime);pg.position.set(X,13.4,-71.2);G.add(pg)}
  for(let k=0;k<4;k++)sbBox(G,30-k*2,.35,1.4,X,.17+k*.35,-66.6+k*.0,lime).position.z=-65.4-k*.9;
  sbBox(G,4.4,8,.3,X,4,-70.2,std({color:0x2a1a12,roughness:.8}));
  const drum=new THREE.Mesh(new THREE.CylinderGeometry(10,10,8,32,1),limeS);drum.position.set(X,26,-92);G.add(drum);
  for(let i=0;i<16;i++){const a=i/16*TAU;sbBox(G,.9,7,.9,X+Math.sin(a)*10.3,26,-92+Math.cos(a)*10.3,limeS)}
  const dome=new THREE.Mesh(new THREE.SphereGeometry(10.4,40,20,0,TAU,0,Math.PI/2),lead);dome.position.set(X,30,-92);dome.scale.y=1.25;G.add(dome);
  const lan=new THREE.Mesh(new THREE.CylinderGeometry(1.4,1.6,4,12),limeS);lan.position.set(X,45,-92);G.add(lan);const cap=new THREE.Mesh(new THREE.ConeGeometry(1.7,3,12),lead);cap.position.set(X,48.5,-92);G.add(cap);
  const cr=sbBox(G,.25,2.4,.25,X,51,-92,gold);sbBox(G,1.2,.25,.25,X,51.4,-92,gold);const lg=glowSprite(0xffd890,6,.35);lg.position.set(X,45,-92);G.add(lg);
  /* clock + inscription glow over the portico */
  const ck=new THREE.Mesh(new THREE.CircleGeometry(1.6,32),std({color:0xf2ead8,emissive:0x8a7a50,roughness:.5}));ck.position.set(X,16,-69.3);G.add(ck);
  /* the Sorbonne gate, east of the chapel: double doors, porter's lodge */
  const wood=std({color:0x2a160c,roughness:.55,emissive:0x0a0402}),goldG=std({color:0xe0b45a,emissive:0x3a2606,roughness:.3,metalness:.8});
  /* a grand stone frame: pilasters, entablature, a carved arch with a goldG keystone */
  for(const x of[6027.2,6040.8]){sbBox(G,1.6,10.5,1.6,x,5.25,-69.4,limeS);sbBox(G,2.1,.5,2.1,x,10.7,-69.4,lime);sbBox(G,2.1,.6,2.1,x,.3,-69.4,lime);const lp=glowSprite(0xffd08a,3,.75);lp.position.set(x,8.6,-68.2);G.add(lp);sbBox(G,.5,.8,.5,x,8.6,-68.4,goldG)}
  sbBox(G,16,1.3,2,6034,11.6,-69.4,lime);sbBox(G,16.4,.25,2.2,6034,12.35,-69.4,goldG);
  const arch=new THREE.Mesh(new THREE.TorusGeometry(4.75,.55,10,32,Math.PI),limeS);arch.position.set(6034,6.6,-69.3);G.add(arch);const arch2=new THREE.Mesh(new THREE.TorusGeometry(4.2,.12,8,32,Math.PI),goldG);arch2.position.set(6034,6.6,-69);G.add(arch2);
  sbBox(G,.9,1.3,.9,6034,11.25,-68.9,goldG);
  const tym=new THREE.Mesh(new THREE.CircleGeometry(4.2,32,0,Math.PI),std({color:0x1a1410,emissive:0x0a0604}));tym.position.set(6034,6.6,-69.75);G.add(tym);
  const gl=new THREE.Group();gl.position.set(6029.6,0,-69.55);G.add(gl);sbBox(gl,4.4,6.6,.3,2.2,3.3,0,wood);const gr2=new THREE.Group();gr2.position.set(6038.4,0,-69.55);G.add(gr2);sbBox(gr2,4.4,6.6,.3,-2.2,3.3,0,wood);
  for(const q of[gl,gr2]){const sg=q===gl?1:-1;for(const yy of[1.2,3.3,5.4])sbBox(q,4.2,.12,.36,sg*2.2,yy,0,goldG);sbBox(q,.14,6.4,.36,sg*.15,3.3,0,goldG);sbBox(q,.14,6.4,.36,sg*4.25,3.3,0,goldG);
    const rd=decal(runeTex,0x8ac8ff,2.6,true,.55);rd.rotation.x=0;rd.position.set(sg*2.2,3.6,.17);q.add(rd);const kn=new THREE.Mesh(new THREE.TorusGeometry(.22,.05,8,16),goldG);kn.position.set(sg*.6,3.1,.25);q.add(kn)}
  const cour=new THREE.Mesh(new THREE.PlaneGeometry(1,1),new THREE.MeshBasicMaterial({transparent:true,opacity:0}));cour.visible=false;G.add(cour);
  SB.gate={l:gl,r:gr2,cour,open:0,tg:0,portal:null};
  sbBox(G,2.4,2.8,2.4,6022.6,1.4,-67.2,lime);const lw=new THREE.Mesh(new THREE.PlaneGeometry(1.2,.9),new THREE.MeshBasicMaterial({color:0xffd690}));lw.position.set(6022.6,1.8,-65.99);G.add(lw);sbCol('pl',6021.4,6023.8,-68.4,-66,3);
  /* fountain */
  const fb=new THREE.Mesh(new THREE.CylinderGeometry(4.4,4.6,.9,40,1,true),lime);fb.position.set(X,.45,-16);G.add(fb);const fr=new THREE.Mesh(new THREE.TorusGeometry(4.45,.22,8,40),lime);fr.rotation.x=Math.PI/2;fr.position.set(X,.9,-16);G.add(fr);
  const wt=new THREE.Mesh(new THREE.CircleGeometry(4.3,40),std({color:0x1a3048,emissive:0x0a2038,roughness:.1,metalness:.3}));wt.rotation.x=-Math.PI/2;wt.position.set(X,.7,-16);G.add(wt);
  const fc=new THREE.Mesh(new THREE.CylinderGeometry(.5,.8,3.2,12),limeS);fc.position.set(X,1.6,-16);G.add(fc);const fbw=new THREE.Mesh(new THREE.CylinderGeometry(1.6,.4,.5,20),limeS);fbw.position.set(X,3.3,-16);G.add(fbw);
  sbCol('pl',X-4.4,X+4.4,-20.4,-11.6,1.1);SB.fount=V3(X,0,-16);
  /* lamps, trees, café terraces */
  const post=std({color:0x1c2024,roughness:.5,metalness:.5});
  for(const [x,z] of[[5966,-56],[6034,-56],[5966,-24],[6034,-24],[5966,8],[6034,8],[5966,32],[6034,32],[5988,-40],[6012,-40]]){sbBox(G,.22,4.6,.22,x,2.3,z,post);const h=new THREE.Mesh(new THREE.SphereGeometry(.34,10,8),new THREE.MeshBasicMaterial({color:0xffe0a0}));h.position.set(x,4.7,z);G.add(h);const s=glowSprite(0xffc070,4.5,.55);s.position.set(x,4.7,z);G.add(s)}
  const bark=std({color:0x2a2018,roughness:.9}),leaf=std({color:0x1c3424,roughness:.9});
  for(let i=0;i<7;i++){const x=5972+i*9.3,z=35;sbBox(G,.4,3.6,.4,x,1.8,z,bark);const c=new THREE.Mesh(new THREE.SphereGeometry(2.3,10,8),leaf);c.position.set(x,4.8,z);c.scale.y=1.2;G.add(c)}
  const aw=std({color:0x8a1a20,roughness:.8,side:THREE.DoubleSide}),tab=std({color:0x1a1a1a,roughness:.4,metalness:.5}),chr=std({color:0x6a3a20,roughness:.8});
  for(let k=0;k<3;k++){const z0=-50+k*30;sbBox(G,3.6,.08,16,5961.7,3.3,z0+8,aw).rotation.z=-.38;
    const cw=new THREE.Mesh(new THREE.PlaneGeometry(14,2.6),new THREE.MeshBasicMaterial({color:0xffb860}));cw.position.set(5960.05,1.8,z0+8);cw.rotation.y=Math.PI/2;G.add(cw);
    for(let t=0;t<3;t++){const tz=z0+3+t*5;sbBox(G,.08,1,.08,5964.5,.5,tz,tab);const tp=new THREE.Mesh(new THREE.CylinderGeometry(.45,.45,.05,14),tab);tp.position.set(5964.5,1,tz);G.add(tp);sbBox(G,.45,.08,.45,5965.4,.55,tz,chr);sbBox(G,.45,.08,.45,5963.6,.55,tz,chr)}}
  SB.cafeT=V3(5964.5,1.05,-37);
  /* far Paris: a few roofs and a lit Panthéon dome to the south */
  const pan=new THREE.Mesh(new THREE.SphereGeometry(14,24,12,0,TAU,0,Math.PI/2),std({color:0x8a9098,emissive:0x2a2a30,roughness:.6}));pan.position.set(X+10,48,170);pan.scale.y=1.3;G.add(pan);const pd=new THREE.Mesh(new THREE.CylinderGeometry(15,15,22,24),std({color:0xc8bca0,emissive:0x302818,roughness:.8}));pd.position.set(X+10,37,170);G.add(pd);
  const pg2=glowSprite(0xffe0a0,40,.2);pg2.position.set(X+10,50,170);G.add(pg2);
  /* the Sorbonne lettering */
  const lt=sbCanvas(512,64,(x,w,h)=>{x.fillStyle='rgba(0,0,0,0)';x.clearRect(0,0,w,h);x.font='bold 40px Georgia';x.fillStyle='#e8d8b0';x.textAlign='center';x.fillText('ACADEMIA  PARISIENSIS',w/2,46)});
  const ltm=new THREE.Mesh(new THREE.PlaneGeometry(14,1.75),new THREE.MeshBasicMaterial({map:lt,transparent:true}));ltm.position.set(6034,14.3,-69.9);G.add(ltm)}

/* ---------- the Réserves: corridor + four rooms, built from a 1m grid ---------- */
const SBRM={C:[SBT.x-4,SBT.x+4,-232,8],R1:[SBT.x+6,SBT.x+32,-58,-18],c1:[SBT.x+4,SBT.x+6,-42,-34],R2:[SBT.x-34,SBT.x-6,-110,-76],c2:[SBT.x-6,SBT.x-4,-97,-89],R3:[SBT.x+6,SBT.x+40,-170,-130],c3:[SBT.x+4,SBT.x+6,-154,-146],R4:[SBT.x-16,SBT.x+16,-262,-236],c4:[SBT.x-2,SBT.x+2,-236,-232]};
function sbBuildTunnel(){const G=SB.tu=new THREE.Group();SB.g.add(G);const T=sbTex(),X=SBT.x,H=7;const B=SBW.tu,x0=B.x0,z0=B.z0,NX=B.x1-B.x0,NZ_=B.z1-B.z0;
  const rects=Object.values(SBRM);const W=new Uint8Array(NX*NZ_);for(let j=0;j<NZ_;j++)for(let i=0;i<NX;i++){const cx=x0+i+.5,cz=z0+j+.5;for(const r of rects)if(cx>r[0]&&cx<r[1]&&cz>r[2]&&cz<r[3]){W[j*NX+i]=1;break}}
  const w=(i,j)=>i>=0&&j>=0&&i<NX&&j<NZ_&&W[j*NX+i];
  /* collision: merge solid runs per row, then stack identical runs */
  let open={};for(let j=0;j<=NZ_;j++){const runs={};if(j<NZ_){let i=0;while(i<NX){if(!W[j*NX+i]){let k=i;while(k<NX&&!W[j*NX+k])k++;runs[i+','+k]=1;i=k}else i++}}
    for(const key in open)if(!runs[key]){const b=open[key];sbCol('tu',x0+b.i0,x0+b.i1,z0+b.j0,z0+j,40);delete open[key]}for(const key in runs)if(!open[key]){const [a,c]=key.split(',').map(Number);open[key]={i0:a,i1:c,j0:j}}}
  /* walls, floor, ceiling */
  const Q=sbQuads(),F=sbQuads(),Cq=sbQuads();
  const segs=[];for(let j=0;j<NZ_;j++)for(let i=0;i<NX;i++){if(!W[j*NX+i])continue;if(!w(i,j-1))segs.push(['z',z0+j,x0+i,1]);if(!w(i,j+1))segs.push(['z',z0+j+1,x0+i,-1]);if(!w(i-1,j))segs.push(['x',x0+i,z0+j,1]);if(!w(i+1,j))segs.push(['x',x0+i+1,z0+j,-1])}
  const grp={};for(const s of segs){const k=s[0]+'|'+s[1]+'|'+s[3];(grp[k]=grp[k]||[]).push(s[2])}
  for(const k in grp){const [ax,lineS,sgS]=k.split('|');const line=+lineS,sg=+sgS;const L=grp[k].sort((a,b)=>a-b);let a=L[0],p=L[0];const emit=(s,e)=>{if(ax==='z'){Q.add(V3(s,0,line),V3(e,0,line),V3(e,H,line),V3(s,H,line),V3(0,0,sg),v=>[(v.x)/3,v.y/3])}else{Q.add(V3(line,0,s),V3(line,0,e),V3(line,H,e),V3(line,H,s),V3(sg,0,0),v=>[(v.z)/3,v.y/3])}};
    for(let q=1;q<=L.length;q++){if(q<L.length&&L[q]===p+1){p=L[q];continue}emit(a,p+1);if(q<L.length){a=p=L[q]}}}
  for(const r of rects){F.add(V3(r[0],0,r[2]),V3(r[1],0,r[2]),V3(r[1],0,r[3]),V3(r[0],0,r[3]),V3(0,1,0),v=>[v.x/4,v.z/4]);Cq.add(V3(r[0],H,r[2]),V3(r[1],H,r[2]),V3(r[1],H,r[3]),V3(r[0],H,r[3]),V3(0,-1,0),v=>[v.x/3,v.z/3])}
  const tw=T.tun.clone();tw.needsUpdate=true;const tf=T.flag.clone();tf.needsUpdate=true;
  G.add(Q.mesh(std({map:tw,color:0x9a8070,emissive:0xffa860,emissiveMap:tw,emissiveIntensity:.3,roughness:.95})));G.add(F.mesh(std({map:tf,color:0x8a7868,emissive:0xffa860,emissiveMap:tf,emissiveIntensity:.26,roughness:.8})));G.add(Cq.mesh(std({color:0x1a120c,emissive:0x0c0806,roughness:1})));
  /* arches, sconces, dust */
  const st=std({map:tw,color:0x8a7060,emissive:0xffa860,emissiveMap:tw,emissiveIntensity:.24,roughness:.95});SB.sconce=[];
  for(let z=0;z>-230;z-=10){sbBox(G,.7,H,.7,X-3.65,H/2,z,st);sbBox(G,.7,H,.7,X+3.65,H/2,z,st);sbBox(G,8,.8,.7,X,H-.4,z,st);
    const sx_=(z/10)%2?X-3.2:X+3.2;const s=glowSprite(0xffa850,5,.75);s.position.set(sx_,3.4,z-5);G.add(s);const f=new THREE.Mesh(new THREE.SphereGeometry(.12,8,6),new THREE.MeshBasicMaterial({color:0xffd080}));f.position.copy(s.position);G.add(f);SB.sconce.push(s)}
  /* entry stair glow */
  for(let k=0;k<6;k++)sbBox(G,8,.3,1,X,.15+k*.3,7.5-k*.0,st).position.z=7.6-k*.01;const up=glowSprite(0xffd8a0,8,.4);up.position.set(X,4,8);G.add(up);
  /* corridor clutter */
  const wood=std({color:0x4a3020,emissive:0x140a04,roughness:.8});for(const [x,z] of[[X-2.6,-14],[X+2.7,-66],[X-2.7,-120],[X+2.6,-178],[X-2.6,-205]]){sbBox(G,1.1,.9,1.1,x,.45,z,wood);sbBox(G,.9,.7,.9,x,1.25,z+.1,wood)}
  /* the jar that whispers */
  const jar=new THREE.Mesh(new THREE.SphereGeometry(.35,14,10),std({color:0x3a5a40,emissive:0x1a6a30,transparent:true,opacity:.85,roughness:.2}));jar.position.set(X-3,.4,-28);jar.scale.y=1.3;G.add(jar);const jg=glowSprite(0x7dff9a,1.6,.4);jg.position.copy(jar.position);G.add(jg);SB.jar={m:jar,g:jg,t:0};
  sbRoom1(G);sbRoom2(G);sbRoom3(G);sbRoom4(G)}
function sbShelf(G,x,z,len,ry,h){const T=sbTex();const bk=T.books.clone();bk.needsUpdate=true;bk.repeat.set(Math.max(1,Math.round(len/3)),Math.max(1,Math.round(h/2.4)));const wood=std({color:0x3a2414,emissive:0x100804,roughness:.8});
  const bm=std({map:bk,emissive:0xffffff,emissiveMap:bk,emissiveIntensity:.35,roughness:.9});const m=new THREE.Mesh(new THREE.BoxGeometry(len,h,.8),[wood,wood,wood,wood,bm,wood]);m.position.set(x,h/2,z);m.rotation.y=ry;G.add(m);return m}
/* Room 1 · the Archives (Madame Ombline) */
function sbRoom1(G){const r=SBRM.R1,X=SBT.x;sbShelf(G,r[1]-.45,(r[2]+r[3])/2,r[3]-r[2]-2,-Math.PI/2,6);sbShelf(G,(r[0]+r[1])/2+2,r[2]+.45,r[1]-r[0]-6,0,6);sbShelf(G,(r[0]+r[1])/2+2,r[3]-.45,r[1]-r[0]-6,Math.PI,6);
  sbCol('tu',r[1]-.9,r[1],r[2],r[3],40);sbCol('tu',r[0]+2,r[1],r[2],r[2]+.9,40);sbCol('tu',r[0]+2,r[1],r[3]-.9,r[3],40);
  const desk=std({color:0x4a2a18,emissive:0x140804,roughness:.6});sbBox(G,1.4,1,3,X+15,.5,-38,desk);sbCol('tu',X+14.3,X+15.7,-39.5,-36.5,1.1);const lamp=glowSprite(0xffd890,2.2,.8);lamp.position.set(X+15,1.5,-37);G.add(lamp);
  for(let k=0;k<6;k++)sbBox(G,.5,.12+Math.random()*.1,.7,X+15+rand(-.4,.4),1.06+k*.13,-39+rand(-.2,.2),std({color:[0x7a1a1a,0x1a3a6a,0x2a5a2a,0x6a4a1a][k%4],roughness:.8}));
  const l2=glowSprite(0xffb070,14,.25);l2.position.set(X+19,5,-38);G.add(l2)}
/* Room 2 · the Cabinet of Instruments (Monsieur Tic) */
function sbRoom2(G){const r=SBRM.R2,cx=(r[0]+r[1])/2,cz=(r[2]+r[3])/2;const brass=std({color:0xc8963a,emissive:0x2a1804,roughness:.3,metalness:.8}),glass=std({color:0x203038,emissive:0x0a1a24,roughness:.1,metalness:.2,transparent:true,opacity:.7});
  sbBox(G,1.6,1.2,1.6,cx,.6,cz,brass);const ped=new THREE.Mesh(new THREE.CylinderGeometry(.18,.25,2.2,10),brass);ped.position.set(cx,2,cz);G.add(ped);sbCol('tu',cx-.9,cx+.9,cz-.9,cz+.9,40);
  const sun=new THREE.Mesh(new THREE.SphereGeometry(.7,20,14),new THREE.MeshBasicMaterial({color:0xffc860}));sun.position.set(cx,3.4,cz);G.add(sun);const sg=glowSprite(0xffb040,4,.7);sg.position.copy(sun.position);G.add(sg);
  const arm=new THREE.Group();arm.position.set(cx,3.4,cz);G.add(arm);const cols=[0x6ab8ff,0xff6a4a,0x9dffb0,0xd8a6ff],pl=[],stones=[];
  for(let i=0;i<4;i++){const R=1.5+i*.7,a=i*1.7;const rod=new THREE.Mesh(new THREE.CylinderGeometry(.03,.03,R,6),brass);rod.rotation.z=Math.PI/2;const h=new THREE.Group();h.rotation.y=a;arm.add(h);rod.position.x=R/2;h.add(rod);
    const p=new THREE.Mesh(new THREE.SphereGeometry(.26+i*.04,16,12),std({color:cols[i],emissive:cols[i],emissiveIntensity:.25,roughness:.4}));p.position.x=R;h.add(p);const g=glowSprite(cols[i],1.6,0);p.add(g);pl.push({h,p,g,sp:.25+(3-i)*.12});
    const sa=-Math.PI/2+i*(Math.PI*2/4)+Math.PI/4;const sx_=cx+Math.sin(sa)*6.5,sz=cz+Math.cos(sa)*6.5;const s=new THREE.Mesh(new THREE.CylinderGeometry(1.15,1.2,.12,28),std({color:cols[i],emissive:cols[i],emissiveIntensity:.12,roughness:.5}));s.position.set(sx_,.06,sz);G.add(s);
    const sgl=glowSprite(cols[i],3,0);sgl.position.set(sx_,.5,sz);G.add(sgl);stones.push({m:s,g:sgl,p:V3(sx_,0,sz),c:cols[i]})}
  SB.orr={c:V3(cx,0,cz),arm,pl,stones,seq:[],i:0,ph:'idle',t:0,round:0,on:-1};
  for(const [x,z,ry] of[[r[0]+.5,cz-8,Math.PI/2],[r[0]+.5,cz+8,Math.PI/2],[cx-6,r[2]+.5,0],[cx+6,r[2]+.5,0]]){const cab=sbBox(G,6,4,1,x,2,z,glass);cab.rotation.y=ry;sbBox(G,6.2,.2,1.1,x,4.1,z,brass).rotation.y=ry}
  sbCol('tu',r[0],r[0]+1,r[2],r[3],40);sbCol('tu',r[0],r[1],r[2],r[2]+1,40);
  for(const [x,z] of[[cx+9,r[3]-2],[cx-9,r[3]-2]]){const gl=new THREE.Mesh(new THREE.SphereGeometry(.8,18,12),std({color:0x2a5a8a,emissive:0x0a2a4a,roughness:.4}));gl.position.set(x,1.9,z);G.add(gl);const st=new THREE.Mesh(new THREE.CylinderGeometry(.08,.3,1.1,8),brass);st.position.set(x,.55,z);G.add(st)}
  const tel=new THREE.Mesh(new THREE.CylinderGeometry(.12,.2,3,10),brass);tel.position.set(cx+10,2.2,r[2]+4);tel.rotation.z=.9;G.add(tel);const lg=glowSprite(0xffd8a0,16,.22);lg.position.set(cx,5,cz);G.add(lg)}
/* Room 3 · the old amphitheatre (Professor Vasseur) */
function sbRoom3(G){const r=SBRM.R3,X=SBT.x,cz=(r[2]+r[3])/2;const wood=std({color:0x5a3a22,emissive:0x180c04,roughness:.75});
  for(let k=0;k<5;k++){const x=r[0]+3+k*3.4,h=1.6-k*.3;for(const s of[-1,1]){const zc=cz+s*9.5;sbBox(G,2.2,h,12,x,h/2,zc,wood);sbCol('tu',x-1.1,x+1.1,zc-6,zc+6,h)}}
  const lect=sbBox(G,1.4,1.3,1.8,r[1]-7,.65,cz,wood);sbCol('tu',r[1]-7.7,r[1]-6.3,cz-.9,cz+.9,1.4);
  const T=sbTex();const bd=new THREE.Mesh(new THREE.PlaneGeometry(14,7),std({map:T.board,emissive:0xffffff,emissiveMap:T.board,emissiveIntensity:.45,roughness:.9}));bd.position.set(r[1]-.1,4,cz);bd.rotation.y=-Math.PI/2;G.add(bd);
  const cg=glowSprite(0x9ad8ff,18,.18);cg.position.set(r[1]-6,4,cz);G.add(cg)}
/* Room 4 · the sealed library (Morwen's carrel) */
function sbRoom4(G){const r=SBRM.R4,X=SBT.x;sbShelf(G,r[0]+.45,(r[2]+r[3])/2,r[3]-r[2]-2,Math.PI/2,6.5);sbShelf(G,r[1]-.45,(r[2]+r[3])/2,r[3]-r[2]-2,-Math.PI/2,6.5);sbCol('tu',r[0],r[0]+.9,r[2],r[3],40);sbCol('tu',r[1]-.9,r[1],r[2],r[3],40);
  const wood=std({color:0x4a2a18,emissive:0x120804,roughness:.6});sbBox(G,4,1,1.8,X,.5,-258.5,wood);sbCol('tu',X-2,X+2,-259.4,-257.6,1.1);sbBox(G,1,1.4,1,X,.7,-256.6,wood);
  const lamp=glowSprite(0xffd890,3,.9);lamp.position.set(X+1.4,1.6,-258.6);G.add(lamp);const T=sbTex();
  const pg=new THREE.Mesh(new THREE.PlaneGeometry(4,4),std({map:T.page,emissive:0xffffff,emissiveMap:T.page,emissiveIntensity:.5,roughness:.9}));pg.position.set(X,3.6,-261.9);G.add(pg);
  for(let k=0;k<7;k++){const p=new THREE.Mesh(new THREE.PlaneGeometry(.5,.7),std({color:0xe8dcc0,emissive:0x2a2418,side:THREE.DoubleSide}));p.rotation.x=-Math.PI/2;p.rotation.z=rand(-.6,.6);p.position.set(X+rand(-1.6,1.6),1.02+k*.002,-258.5+rand(-.6,.6));G.add(p)}
  const let_=new THREE.Mesh(new THREE.PlaneGeometry(.55,.75),new THREE.MeshBasicMaterial({color:0xfff0c8}));let_.rotation.x=-Math.PI/2;let_.position.set(X-.6,1.04,-258.2);G.add(let_);const lg=glowSprite(0xffe8b0,1.4,.8);lg.position.set(X-.6,1.2,-258.2);G.add(lg);SB.letter={m:let_,g:lg};
  /* the sealed door */
  const dm=std({color:0x1a1416,emissive:0x0a0608,roughness:.4,metalness:.6});const door=new THREE.Group();door.position.set(X,0,-232.6);G.add(door);sbBox(door,4,7,.5,0,3.5,0,dm);
  const rn=decal(runeTex,0xb070ff,3.4,true,.9);rn.rotation.x=0;rn.position.set(0,3.4,.3);door.add(rn);const dg=glowSprite(0xb070ff,5,.5);dg.position.set(0,3.4,.6);door.add(dg);
  SB.door={g:door,rn,dg,open:0,tg:0,box:{x0:X-2,x1:X+2,z0:-233.2,z1:-232,h:40,sb:1}};SB.boxes.tu.push(SB.door.box)}

/* ---------- NPCs ---------- */
function sbGhost(a){a.g.traverse(o=>{if(o.isMesh||o.isSkinnedMesh){const f=m=>{const c=m.clone();c.transparent=true;c.opacity=.5;c.depthWrite=false;if(c.emissive){c.emissive.setHex(0x5ab0ff);c.emissiveIntensity=.7}if(c.color)c.color.lerp(new THREE.Color(0xbfe8ff),.6);return c};o.material=Array.isArray(o.material)?o.material.map(f):f(o.material)}})}
function sbNPCs(){const N=SB.npc;const mk=(k,sx,o,pos,ry,parent)=>{let a=null;try{a=makeCHActor(sx,o)}catch(x){console.warn(x)}if(!a)return null;a.g.position.copy(pos);a.g.rotation.y=ry;(parent||SB.g).add(a.g);try{a.setBase('Idle_Loop',.1);a.update(.5)}catch(x){}N[k]=a;SB.acts.push(a);return a};
  const g=mk('g','m',{skin:0xe9c9b0,hair:'hairBuzz',hairCol:0xd8d4cc,brow:0xcfcac0,beard:true,keepReg:[5,6,9],scale:.96,wear:[['long',0x1c2440,{roughness:.8}],['trousers',0x15182a],['shoes',0x1a120c]]},V3(6031,0,-66.6),0,SB.pl);try{nhOld(g,.2,.86)}catch(x){}
  const o=mk('o','f',{skin:0xf2dccc,hair:'hairLong',hairCol:0xd9d6de,brow:0x9a9490,keepReg:[5,6,9],scale:.93,wear:[['long',0x4a1428,{roughness:.85}],['shoes',0x1a0c10]]},V3(SBT.x+16.2,0,-38),-Math.PI/2,SB.tu);try{nhOld(o,.16,.9)}catch(x){}
  const t=mk('t','m',{skin:0xf0d0b8,hair:'hairPart',hairCol:0x8a7a6a,brow:0x6a5a4a,beard:true,keepReg:[5,6,9],scale:.88,wear:[['long',0x4a3018,{roughness:.8}],['trousers',0x2a2018],['shoes',0x1a120c]]},V3(SBT.x-10.5,0,-89),Math.PI/2,SB.tu);
  const v=mk('v','m',{skin:0xe8f0f8,hair:'hairBuzz',hairCol:0xf0f0f0,brow:0xe0e0e0,beard:true,keepReg:[5,6,9],wear:[['long',0x202838],['trousers',0x181c28],['shoes',0x101018]]},V3(SBRM.R3[1]-5,0,-150),-Math.PI/2,SB.tu);if(v){sbGhost(v);const vg=glowSprite(0x8ad0ff,4,.35);vg.position.y=1.2;v.g.add(vg)}}
function sbCatBuild(){const g=new THREE.Group();const fur=std({color:0x0c0a10,roughness:.55}),m=(geo,x,y,z,sx,sy,sz)=>{const o=new THREE.Mesh(geo,fur);o.position.set(x,y,z);o.scale.set(sx||1,sy||1,sz||1);g.add(o);return o};
  const body=m(new THREE.SphereGeometry(.22,14,10),0,.26,0,1,.85,1.6);const head=m(new THREE.SphereGeometry(.15,14,10),0,.42,.32);for(const s of[-1,1]){const e=m(new THREE.ConeGeometry(.06,.13,6),s*.08,.56,.32);e.rotation.z=-s*.25;const ey=glowSprite(0xffe040,.12,1);ey.position.set(s*.055,.44,.45);g.add(ey)}
  for(const [x,z] of[[-.1,.2],[.1,.2],[-.1,-.2],[.1,-.2]])m(new THREE.CylinderGeometry(.035,.035,.2,6),x,.1,z);const tail=[];for(let k=0;k<6;k++)tail.push(m(new THREE.SphereGeometry(.04,6,5),0,.3+k*.06,-.32-k*.03));
  const zz=glowSprite(0xd8c0ff,.5,0);zz.position.set(.15,.8,.3);g.add(zz);return{g,tail,head,zz,body}}

/* ---------- interactions ---------- */
const SBI={cur:null};
function sbIn(p,r){return Math.hypot(P.pos.x-p.x,P.pos.z-p.z)<r}
const sbKey=()=>(typeof isTouch!=='undefined'&&isTouch?'TAP':'PRESS E');
function sbInterTick(){if(CS.active||!P.alive){if(SBI.cur){SBI.cur=null;x5Hint('')}return}const st=CH2.st,s=SB.s,X=SBT.x;let pick=null;
  const add=(p,r,label,fn)=>{if(!pick&&sbIn(p,r))pick={label,fn}};
  if(SB.area==='plaza'){if(st===24&&!s.met)add(V3(6031,0,-64.4),4,'TALK TO GÉRARD',sbTalkG1);if(st===24&&s.carry)add(V3(6031,0,-64.4),4.2,'GIVE DESCARTES BACK',sbTalkG2);
    if(st===24&&s.met&&!s.carry&&SB.cat&&SB.cat.k===3)add(SB.cat.g.position,2.4,'PICK UP DESCARTES',sbPickCat);if(st>=25)add(V3(6034,0,-70.5),3.6,'ENTER THE SORBONNE',()=>sbGo('tun'))}
  else if(SB.area==='tun'){if(P.pos.z>3)add(V3(X,0,6),3.5,'BACK UP TO THE PLAZA',()=>sbGo('plaza'));
    if(st===25&&!s.om)add(V3(X+13.6,0,-38),3.4,'TALK TO MADAME OMBLINE',sbTalkO1);
    if(st===26&&!s.tic&&SB.orr.ph==='idle')add(V3(X-8.6,0,-89),3.4,'TALK TO MONSIEUR TIC',sbTalkT1);
    if(st===27&&!SB.exam)add(V3(SBRM.R3[1]-8.4,0,-150),3.6,'TALK TO PROFESSOR VASSEUR',sbTalkV1);
    if(st===28&&!s.door)add(V3(X,0,-230.6),3.4,'UNLOCK THE SEALED LIBRARY',sbOpenDoor);
    if(st===28&&s.door)add(V3(X,0,-256),3,'READ MORWEN\'S DESK',sbFinale)}
  const lab=pick?sbKey()+' · '+pick.label:'';if(!pick){if(SBI.cur){SBI.cur=null;x5Hint('')}return}if(SBI.cur!==pick.label){SBI.cur=pick.label;x5Hint(lab,()=>{SBI.cur=null;x5Hint('');pick.fn()})}else X5.hintFn=()=>{SBI.cur=null;x5Hint('');pick.fn()}}

/* ---------- objective ---------- */
function sbObj(){if(CH2.zone!=='latin')return null;const st=CH2.st,s=SB.s,d=p=>Math.round(Math.hypot(P.pos.x-p.x,P.pos.z-p.z))+'m';
  if(st===24){if(!s.met)return `Talk to <b>Gérard</b>, the night porter, at the Sorbonne gate · ${d(V3(6031,0,-66))}`;if(s.carry)return `Bring <b>Descartes</b> back to Gérard · ${d(V3(6031,0,-66))}`;return SB.cat?`Catch <b>Descartes</b>, the porter's black cat · ${d(SB.cat.g.position)}`:'Catch Descartes'}
  if(st>=25&&st<29&&SB.area==='plaza')return `Enter the <b>Sorbonne</b> through the gate · ${d(V3(6034,0,-70))}`;
  if(st===25)return s.om?`Catch the flying books · <b>${s.books||0}/5</b>`:`Find <b>Madame Ombline</b> in the Archives · ${d(V3(SBT.x+15,0,-38))}`;
  if(st===26)return SB.orr&&SB.orr.ph!=='idle'?(SB.orr.ph==='show'?'Watch the planets...':`Step on the stones in the order the planets sang · round <b>${SB.orr.round+1}/2</b>`):`Find <b>Monsieur Tic</b> in the Cabinet of Instruments · ${d(V3(SBT.x-10,0,-89))}`;
  if(st===27)return `Find <b>Professor Vasseur</b> in the old amphitheatre · ${d(V3(SBRM.R3[1]-6,0,-150))}`;
  if(st===28)return s.door?`Search <b>Morwen's carrel</b> · ${d(V3(SBT.x,0,-257))}`:`Open the <b>sealed library</b> at the end of the tunnel · ${d(V3(SBT.x,0,-232))}`;
  return 'Chapter XVII complete · Morwen\'s true name is hidden somewhere'}

/* ---------- build / enter / leave ---------- */
function sbWorld(){if(SB.g)return;SB.g=new THREE.Group();SB.g.visible=false;scene.add(SB.g);sbBuildPlaza();sbBuildTunnel();sbNPCs()}
function sbKeep(o){return o===SKY||o.isLight||o===moonLight.target||o===W.g||o===camera||(o.isPoints&&o.frustumCulled===false)||o===SB.g||(LYR.a&&o===LYR.a.g)||(KFW.a&&o===KFW.a.g)||(typeof reticle!=='undefined'&&o===reticle)||(o.userData&&o.userData.sbP)}
function sbEnter(where){sbWorld();if(CH2.zone==='north')nzLeaveQuiet();if(CH2.zone==='paris'){CH2.parisWB={x0:WB.x0,x1:WB.x1,z0:WB.z0,z1:WB.z1};SB.hid=scene.children.filter(o=>o.visible&&!sbKeep(o));for(const o of SB.hid)o.visible=false}
  for(const e of enemies)if(!e.dead)removeEnemy(e);for(const p of eProjs)scene.remove(p.s);eProjs.length=0;bossRef=null;$('boss').classList.add('hidden');
  CH2.zone='latin';SB.g.visible=true;SB.boot=1;LYR.home=false;if(LYR.mk)LYR.mk.visible=false;if(!SB.fog0)SB.fog0={c:scene.fog.color.clone(),d:scene.fog.density};
  if(CH2.st>=25)sbGateOpen(true);if(CH2.st>=29||CH2.st>=28&&SB.s.door)sbDoorOpen(true);sbArea(where==='tun'?'tun':'plaza');CH2.obj=sbObj;ch2Save()}
function sbArea(a){SB.area=a;SB.pl.visible=a==='plaza';SB.tu.visible=a==='tun';for(let i=boxes.length-1;i>=0;i--)if(boxes[i].sb)boxes.splice(i,1);for(const b of SB.boxes[a==='plaza'?'pl':'tu'])boxes.push(b);
  if(SB.door&&SB.door.open>=1&&a==='tun'){const i=boxes.indexOf(SB.door.box);if(i>=0)boxes.splice(i,1)}
  Object.assign(WB,a==='plaza'?SBW.pl:SBW.tu);const p=a==='plaza'?(CH2.st>=25?V3(6034,0,-62):V3(6000,0,24)):V3(SBT.x,0,2);P.pos.set(p.x,0,p.z);P.vy=0;P.flying=false;P.glide=false;P.face=Math.PI;yaw=0;SPAWN.copy(p);if(typeof NZ!=='undefined')NZ.cp.copy(p);
  camera.position.set(p.x,P.pos.y+4,p.z+9);const f=V3(0,0,-1),r=V3(1,0,0);if(KFW.a){KFW.a.g.position.set(p.x+1.6,0,p.z+1.2);KFW.a.g.visible=true}if(LYR.a){LYR.a.g.position.set(p.x-1.6,0,p.z+1.2);LYR.a.g.visible=true}else lyraPlace(p.x-1.6,p.z+1.2,Math.PI);
  if(a==='tun'&&CH2.st===25&&SB.s.om)sbBooksOn();try{drawWorldMap()}catch(x){}}
function sbLeave(){if(CH2.zone!=='latin')return;x5Hint('');SBI.cur=null;sbExamClose();for(let i=boxes.length-1;i>=0;i--)if(boxes[i].sb)boxes.splice(i,1);SB.g.visible=false;for(const o of SB.hid)o.visible=true;SB.hid=[];
  CH2.zone='paris';SB.area=null;Object.assign(WB,CH2.parisWB||{x0:-430,x1:430,z0:-330,z1:300});if(SB.fog0){scene.fog.color.copy(SB.fog0.c);scene.fog.density=SB.fog0.d}for(const b of SB.books)SB.g.remove(b.g);SB.books=[];if(SB.orr)SB.orr.ph='idle';KFW.pin=0;LYR.pin=0;try{drawWorldMap()}catch(x){}}
function sbGo(a){if(CS.active)return;x5White(.45,.35,()=>{sbArea(a);if(a==='tun'&&!SB.s.tunIn){SB.s.tunIn=1;after(1,()=>toast('Les Réserves. Old stone, older books. Nothing down here wants to hurt you.','Under the Sorbonne',true))}});sx('pubdoor',.7,null,{rate:.8})}
function sbGateOpen(now){const G=SB.gate;G.tg=1;if(now)G.open=1;if(!G.portal){const g=sbPortalMake(V3(6034,0,-69.25),0,{a:0xffd27a,b:0x7ab8ff,r:0xa8d8ff,c1:0x5a9cff,c2:0xffd27a,g:0x9ad0ff,sc:1.42});SB.pl.add(g);G.portal=g;g.userData.open(1);if(now)g.userData.k=1;if(!now){flash(V3(6034,3,-69),0x9ad0ff,16);sx('portal',.9,null,{rate:.9})}}}
function sbDoorOpen(now){SB.door.tg=1;if(now)SB.door.open=1;const i=boxes.indexOf(SB.door.box);if(i>=0)boxes.splice(i,1)}

/* ---------- camera helpers ---------- */
const sbTC=(gp,lp,d,side,h)=>k=>{const s=gp(),L=lp();const v=V3(L.x-s.x,0,L.z-s.z);if(v.lengthSq()<.01)v.set(0,0,1);v.normalize();const r=V3(v.z,0,-v.x);return{pos:headOf(s,h||1.62).addScaledVector(v,(d||2.3)+k*.15).addScaledVector(r,side==null?.7:side),look:headOf(s,(h||1.62)-.06)}};
function sbStage(npc,dist){const a=npc.g.position,f=V3(Math.sin(npc.g.rotation.y),0,Math.cos(npc.g.rotation.y));const p=a.clone().addScaledVector(f,dist||2.3);P.pos.set(p.x,groundAt(p.x,p.z),p.z);P.vy=0;P.flying=false;P.face=Math.atan2(a.x-p.x,a.z-p.z);
  const r=V3(f.z,0,-f.x);KFW.pin=1;LYR.pin=1;if(KFW.a){const k=p.clone().addScaledVector(f,1.5).addScaledVector(r,1.5);KFW.a.g.position.set(k.x,0,k.z);KFW.a.g.visible=true;x4Face(KFW.a,a)}if(LYR.a){const l=p.clone().addScaledVector(f,1.4).addScaledVector(r,-1.5);LYR.a.g.position.set(l.x,0,l.z);LYR.a.g.visible=true;x4Face(LYR.a,a)}return p}
const sbNT=(a,on)=>{try{a.setBase(on?(a.talkA||'Idle_Talking_Loop'):(a.idleA||'Idle_Loop'),.3)}catch(x){}};
function sbEnd(){x4Talk('');P.heroAnim=null;KFW.pin=0;LYR.pin=0;for(const k in SB.npc)sbNT(SB.npc[k],0)}
const SBK=()=>KFW.a?KFW.a.g.position:P.pos,SBL=()=>LYR.a?LYR.a.g.position:P.pos;
function sbLine(who,key,npc,o){const n=npc;return Object.assign({who,text:XL4[key],fov:34,cam:who==='@'?sbTC(()=>P.pos,()=>n?n.g.position:SBL(),2.3,.6):who==='Kaen'?sbTC(SBK,()=>P.pos):who==='Lyra'?sbTC(SBL,()=>P.pos):sbTC(()=>n.g.position,()=>P.pos,2.4,.6,n===SB.npc.t?1.48:1.6),
  onStart:()=>{for(const k in SB.npc)sbNT(SB.npc[k],SB.npc[k]===n&&who!=='@'&&who!=='Kaen'&&who!=='Lyra');x4Talk(who==='@'||who==='Kaen'||who==='Lyra'?who:'')}},o||{})}

/* ---------- the portal: Lyra's door, gold and rose ---------- */
function sbPortalMake(p,ry,pal){pal=pal||{};const g=new THREE.Group();g.position.copy(p);g.rotation.y=ry;g.userData.sbP=1;const C=new THREE.Group();C.position.y=2.5;g.add(C);
  const rm=c=>new THREE.MeshBasicMaterial({color:c,transparent:true,opacity:.95,blending:THREE.AdditiveBlending,depthWrite:false});
  const t1=new THREE.Mesh(new THREE.TorusGeometry(2.3,.08,10,120),rm(pal.a||0xffd27a));C.add(t1);const t2=new THREE.Mesh(new THREE.TorusGeometry(2.62,.035,8,120),rm(pal.b||0xff7a9a));C.add(t2);const t3=new THREE.Mesh(new THREE.TorusGeometry(2.0,.025,8,120),rm(0xffffff));C.add(t3);
  const rn=decal(runeTex,pal.r||0xffb0c0,6.6,true,.8);rn.rotation.x=0;C.add(rn);
  const sw=new THREE.Mesh(new THREE.CircleGeometry(2.28,72),new THREE.ShaderMaterial({uniforms:{uT:{value:0},uA:{value:0},uC1:{value:new THREE.Color(pal.c1||0xff6b99)},uC2:{value:new THREE.Color(pal.c2||0xffd173)}},transparent:true,depthWrite:false,side:THREE.DoubleSide,blending:THREE.AdditiveBlending,
    vertexShader:'varying vec2 vU;void main(){vU=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}',
    fragmentShader:'uniform float uT,uA;uniform vec3 uC1,uC2;varying vec2 vU;void main(){vec2 p=vU*2.-1.;float r=length(p);float a=atan(p.y,p.x);float s=sin(a*5.+r*14.-uT*5.)*.5+.5;float s2=sin(a*3.-r*9.+uT*3.)*.5+.5;float core=exp(-r*r*5.);vec3 c=mix(uC1,uC2,s)*(.45+s2*.6)+vec3(1.)*core*1.3;float al=smoothstep(1.,.86,r)*(.4+s*.35+core)*uA;gl_FragColor=vec4(c,al);}'}));C.add(sw);
  const gl=glowSprite(pal.g||0xffb0a0,10,0);C.add(gl);scene.add(g);if(pal.sc)g.scale.setScalar(pal.sc);
  const U=g.userData={k:0,tg:0,dead:0,C,open(v){U.tg=v},kill(){U.tg=0}};let em=0;
  SB.anim.push(dt=>{U.k+=(U.tg-U.k)*Math.min(1,dt*(U.tg>U.k?2.6:4));const k=U.k,e=k<1?1-Math.pow(1-k,3):1;const s=Math.max(.001,e*(1+Math.sin(SB.t*6)*.03));C.scale.set(s,s,s);t1.rotation.z+=dt*1.6;t2.rotation.z-=dt*2.4;t3.rotation.z+=dt*3.2;rn.rotation.z+=dt*.7;
    sw.material.uniforms.uT.value+=dt;sw.material.uniforms.uA.value=k;gl.material.opacity=.55*k;
    em+=dt*60*k;while(em>1){em--;const a=Math.random()*TAU,R=2.4+Math.random()*.6;const w=C.localToWorld(V3(Math.cos(a)*R,Math.sin(a)*R,0));SP.emit(w,{n:1,c0:0xffffff,c1:Math.random()<.5?(pal.b||0xff7a9a):(pal.a||0xffd27a),s0:.28,s1:.03,life:.55,speed:1.4})}
    if(k>.3&&Math.random()<dt*2.2){const a=Math.random()*TAU;lightning(C.localToWorld(V3(Math.cos(a)*2.3,Math.sin(a)*2.3,0)),C.localToWorld(V3(Math.cos(a+.6)*3.4,Math.sin(a+.6)*3.4,0)),Math.random()<.5?0xffd27a:0xff8aa8)}
    if(U.tg===0&&k<.02){scene.remove(g);U.dead=1;return false}});return g}

/* ---------- London (or the Trocadéro) -> the Sorbonne ---------- */
function sbPortalScene(){if(CS.active)return;SB.p23=1;x5Hint('');const c=P.pos.clone();c.y=groundAt(c.x,c.z);P.pos.y=c.y;P.flying=false;P.vy=0;const face=P.face,f=V3(Math.sin(face),0,Math.cos(face)),r=V3(f.z,0,-f.x);const door=c.clone().addScaledVector(f,6.5);
  if(!KFW.a)try{kfBuild()}catch(x){}KFW.pin=1;LYR.pin=1;LYR.home=false;if(KFW.a){const k=c.clone().addScaledVector(r,1.7).addScaledVector(f,.4);KFW.a.g.position.set(k.x,c.y,k.z);KFW.a.g.visible=true;x4Face(KFW.a,c)}
  if(!LYR.a)lyraPlace(c.x,c.z,face);if(LYR.a){const l=c.clone().addScaledVector(r,-1.7).addScaledVector(f,.8);LYR.a.g.position.set(l.x,c.y,l.z);LYR.a.g.visible=true;x4Face(LYR.a,c)}
  let portal=null,arr=null;const walk=(a,to,dt,sp)=>{if(!a)return;const g=a.g.position,v=V3(to.x-g.x,0,to.z-g.z),L=v.length();if(L>.05){v.multiplyScalar(Math.min(1,dt*sp/L));g.add(v);a.g.rotation.y=Math.atan2(to.x-g.x,to.z-g.z)}};
  playCutscene([
    sbLine('Lyra','sb_01',null,{fov:36}),
    sbLine('Kaen','sb_02',null),
    sbLine('@','sb_03',null,{cam:sbTC(()=>P.pos,SBL,2.2,.6)}),
    {who:'Lyra',text:XL4.sb_04,fov:40,cam:k=>{const L=SBL();return{pos:headOf(L,1.7).addScaledVector(f,-2.6).addScaledVector(r,-1.2),look:headOf(door,2.4-k*.6)}},onStart:()=>{x4Talk('Lyra');if(LYR.a){x4Face(LYR.a,door);try{LYR.a.fire('Spell_Simple_Shoot',.7)}catch(x){}}portal=sbPortalMake(V3(door.x,c.y,door.z),face+Math.PI);portal.userData.open(1);sx('portal',1,()=>{try{sfx.blink()}catch(e){}},{wet:.4});sx('riser',.7,null,{rate:.8});flash(headOf(door,2.4),0xff8aa8,14)}},
    {dur:3.4,fov:52,cut:true,cam:k=>{const a=face+Math.PI+.9-k*1.8;return{pos:V3(door.x+Math.sin(a)*8.5,c.y+1.6+k*2.2,door.z+Math.cos(a)*8.5),look:headOf(door,2.4)}},onStart:()=>{x4Talk('');sx('summon',.8,null,{rate:.9});sx('unveil',.7);P.shake=.6;x5Impact(60,.08);SM.emit(headOf(door,1),{n:30,c0:0xffd8e0,c1:0x301018,s0:1.5,s1:5,life:1.6,a:.3,speed:4})},update:(dt,k)=>{P.shake=Math.max(P.shake,.25+k*.3)}},
    {dur:2.4,fov:58,cut:true,cam:k=>{const e=k*k;const back=c.clone().addScaledVector(f,-4.5);return{pos:V3(back.x+(door.x-back.x)*e,c.y+2.2+(.3)*e,back.z+(door.z-back.z)*e),look:headOf(door,2.4)}},
      onStart:()=>{P.heroAnim='Walk_Loop';try{KFW.a&&KFW.a.setBase('Walk_Loop',.2);LYR.a&&LYR.a.setBase('Walk_Loop',.2)}catch(x){}after(1.55,()=>{x5White(.35,.6,()=>{});sx('portal',.9,null,{rate:1.25})})},
      update:(dt,k)=>{const to=door.clone();const v=V3(to.x-P.pos.x,0,to.z-P.pos.z),L=v.length();if(L>.05){v.multiplyScalar(Math.min(1,dt*2.6/L));P.pos.add(v)}walk(KFW.a,door.clone().addScaledVector(r,.8),dt,2.6);walk(LYR.a,door.clone().addScaledVector(r,-.8),dt,2.6)}},
    {dur:4.6,fov:50,cut:true,title:['Chapter XVII','The Sorbonne'],cam:k=>({pos:V3(6000-6+k*10,2.2+k*5,44-k*6),look:V3(6000,12+k*12,-80)}),
      onStart:()=>{if(portal)portal.userData.kill();sbEnter('plaza');P.heroAnim='Walk_Loop';P.pos.set(6000,0,27.5);P.face=Math.PI;if(KFW.a){KFW.a.g.position.set(6001.4,0,28.6);KFW.a.g.rotation.y=Math.PI}if(LYR.a){LYR.a.g.position.set(5998.6,0,28.8);LYR.a.g.rotation.y=Math.PI}
        arr=sbPortalMake(V3(6000,0,30),0);arr.userData.k=1;arr.userData.tg=1;after(2.2,()=>{if(arr)arr.userData.kill()});flash(V3(6000,2.5,30),0xffd27a,18);x5Impact(70,.06);sx('portal',.8,null,{rate:.85})},
      update:(dt,k)=>{if(k<.5){P.pos.z-=dt*1.8;if(KFW.a)KFW.a.g.position.z-=dt*1.8;if(LYR.a)LYR.a.g.position.z-=dt*1.8}else{P.heroAnim=null;try{KFW.a&&KFW.a.setBase('Idle_Loop',.3);LYR.a&&LYR.a.setBase('Idle_Loop',.3)}catch(x){}}}},
    sbLine('Lyra','sb_05',null,{cut:true,onStart:()=>{x4Talk('Lyra');P.heroAnim=null;if(LYR.a)x4Face(LYR.a,P.pos)}}),
    sbLine('Kaen','sb_06',null,{onStart:()=>{x4Talk('Kaen');if(KFW.a)x4Face(KFW.a,V3(6031,0,-66))}})],
    ()=>{sbEnd();if(portal)portal.userData.kill();if(arr)arr.userData.kill();if(CH2.zone!=='latin')sbEnter('plaza');CH2.st=24;ch2Save();writeSave();CH2.obj=sbObj;toast('The night porter guards the gate, east of the chapel.','Chapter XVII: The Sorbonne',true)})}

/* ---------- Gérard and his cat ---------- */
const SBCAT=[V3(6004.3,.95,-16),V3(5964.5,1.05,-37),V3(6034,0,30.6),V3(5992,.35,-64.6)];
function sbCatSpawn(){if(!SB.cat){SB.cat=sbCatBuild();SB.pl.add(SB.cat.g)}SB.cat.k=0;SB.cat.g.visible=true;SB.cat.g.position.copy(SBCAT[0]);SB.cat.g.rotation.y=Math.PI}
function sbMeow(){if(typeof AC==='undefined'||!AC||muted)return;try{const t=AC.currentTime;const o=AC.createOscillator();o.type='sawtooth';o.frequency.setValueAtTime(540,t);o.frequency.linearRampToValueAtTime(860,t+.13);o.frequency.linearRampToValueAtTime(610,t+.4);
  const f=AC.createBiquadFilter();f.type='bandpass';f.Q.value=3.2;f.frequency.setValueAtTime(950,t);f.frequency.linearRampToValueAtTime(1600,t+.15);f.frequency.linearRampToValueAtTime(850,t+.42);const g=AC.createGain();g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(.3,t+.05);g.gain.linearRampToValueAtTime(.2,t+.28);g.gain.linearRampToValueAtTime(0,t+.48);
  o.connect(f);f.connect(g);g.connect(master);o.start(t);o.stop(t+.5);const n=AC.createBufferSource();const b=AC.createBuffer(1,Math.floor(AC.sampleRate*.4),AC.sampleRate);const d=b.getChannelData(0);for(let i=0;i<d.length;i++)d[i]=(Math.random()*2-1)*Math.pow(1-i/d.length,2.4);n.buffer=b;
  const lp=AC.createBiquadFilter();lp.type='lowpass';lp.frequency.value=1400;const g2=AC.createGain();g2.gain.value=.32;n.connect(lp);lp.connect(g2);g2.connect(master);n.start(t+.36)}catch(x){}}
function sbCatTick(dt){const C=SB.cat;if(!C||!C.g.visible||SB.area!=='plaza')return;const t=SB.t;C.tail.forEach((s,i)=>{s.position.x=Math.sin(t*2.4-i*.5)*.05*i});
  if(SB.s.carry){const p=P.pos,f=V3(Math.sin(P.face),0,Math.cos(P.face)),r=V3(f.z,0,-f.x);C.g.position.set(p.x+r.x*.38+f.x*.2,p.y+1.05,p.z+r.z*.38+f.z*.2);C.g.rotation.y=P.face+Math.PI/2;C.zz.material.opacity=0;return}
  if(C.k===3){C.zz.material.opacity=.5+Math.sin(t*2)*.3;C.zz.position.y=.8+((t*.4)%1)*.4;C.body.scale.y=.8+Math.sin(t*1.5)*.03;return}
  const p=C.g.position;C.g.rotation.y=Math.atan2(P.pos.x-p.x,P.pos.z-p.z);if(!CS.active&&SB.s.met&&Math.hypot(P.pos.x-p.x,P.pos.z-p.z)<4.2){const o=p.clone();C.k++;flash(o,0x9a60ff,8);SM.emit(V3(o.x,o.y+.3,o.z),{n:16,c0:0x2a1a40,c1:0x05020a,s0:.6,s1:2,life:.8,a:.6,speed:3});SP.emit(V3(o.x,o.y+.3,o.z),{n:20,c0:0xd8c0ff,c1:0x6a30ff,speed:4,life:.6,s0:.3,s1:.03});sbMeow();
    C.g.position.copy(SBCAT[C.k]);const q=SBCAT[C.k];SP.emit(V3(q.x,q.y+.3,q.z),{n:20,c0:0xd8c0ff,c1:0x6a30ff,speed:3,life:.6,s0:.3,s1:.03});if(C.k===1)sbSay('@','sb_36',1);else if(C.k===2)sbSay('Kaen','sb_37',1);else if(C.k===3)toast('Descartes has given up. He is asleep on the chapel steps.','Descartes',false)}}
function sbPickCat(){SB.s.carry=1;sx('ding',.6,null,{rate:1.2});toast('Got him. He is purring, which is somehow worse.','Descartes',false)}
function sbTalkG1(){const g=SB.npc.g;if(!g)return;sbStage(g,2.3);playCutscene([sbLine(SBN.g,'sb_07',g),sbLine('@','sb_08',g),sbLine(SBN.g,'sb_09',g)],()=>{sbEnd();SB.s.met=1;sbCatSpawn();toast('Descartes is somewhere on the square. He does not like being approached.','Catch the cat',true)})}
function sbTalkG2(){const g=SB.npc.g;if(!g)return;sbStage(g,2.3);playCutscene([sbLine(SBN.g,'sb_10',g,{onStart:()=>{sbNT(g,1);x4Talk('');if(SB.cat){SB.s.carry=0;SB.cat.g.visible=false}}}),sbLine('@','sb_11',g),
    sbLine(SBN.g,'sb_12',g),{dur:2.6,fov:44,cut:true,cam:k=>({pos:V3(6034+k*1.5,2.2,-58+k*2),look:V3(6034,3.4,-70)}),onStart:()=>{sbGateOpen();sx('pubdoor',1,null,{rate:.7});sx('unveil',.6)}}],
    ()=>{sbEnd();sbGateOpen();CH2.st=25;ch2Save();writeSave();try{gainXP(600)}catch(x){}toast('The gate is open. The Réserves are down the service stair.','Gérard',true)})}

/* ---------- Ombline and the flying books ---------- */
function sbTalkO1(){const o=SB.npc.o;if(!o)return;sbStage(o,2.3);playCutscene([sbLine(SBN.o,'sb_13',o),sbLine('@','sb_14',o),sbLine(SBN.o,'sb_15',o)],()=>{sbEnd();SB.s.om=1;SB.s.books=0;sbBooksOn();toast('Touch a flying book to send it home. They dodge, a little.','The Archives',true)})}
function sbBooksOn(){for(const b of SB.books)SB.tu.remove(b.g);SB.books=[];const r=SBRM.R1,cx=(r[0]+r[1])/2+2,cz=(r[2]+r[3])/2;const cols=[0x8a1a1a,0x1a4a8a,0x2a6a2a,0x8a6a1a,0x5a1a5a];
  for(let i=0;i<5;i++){const g=new THREE.Group();const cm=std({color:cols[i],emissive:cols[i],emissiveIntensity:.25,roughness:.6}),pm=std({color:0xf0e6cc,emissive:0x3a3020});const l=new THREE.Group(),rr=new THREE.Group();g.add(l,rr);sbBox(l,.32,.04,.44,-.16,0,0,cm);sbBox(rr,.32,.04,.44,.16,0,0,cm);sbBox(g,.5,.06,.4,0,-.02,0,pm);
    const gl=glowSprite(0xffe0a0,1.1,.5);g.add(gl);SB.tu.add(g);SB.books.push({g,l,r:rr,a:i/5*TAU,R:3+i*1.2,h:1.3+(i%3)*.35,sp:.45+i*.06,boost:0,done:0,c:V3(cx,0,cz)})}}
function sbBooksTick(dt){if(!SB.books.length||SB.area!=='tun')return;const t=SB.t;for(const b of SB.books){if(b.done===2)continue;if(b.done===1){b.k+=dt*1.4;const k=Math.min(1,b.k),e=k*k*(3-2*k);b.g.position.lerpVectors(b.from,b.to,e);b.g.position.y+=Math.sin(k*Math.PI)*1.5;b.g.rotation.y+=dt*8;if(k>=1){b.done=2;b.g.visible=false;SP.emit(b.to,{n:24,c0:0xffffff,c1:0xffd27a,speed:3,life:.6,s0:.3,s1:.03})}continue}
    const pd=Math.hypot(P.pos.x-b.g.position.x,P.pos.z-b.g.position.z);if(pd<3.4)b.boost=1;b.boost=Math.max(0,b.boost-dt*.7);b.a+=dt*b.sp*(1+b.boost*.9);
    b.g.position.set(b.c.x+Math.cos(b.a)*b.R*1.2,b.h+Math.sin(t*2+b.R)*.35+b.boost*.5,b.c.z+Math.sin(b.a)*b.R*.95);b.g.rotation.y=-b.a;b.l.rotation.z=.5+Math.sin(t*14+b.R)*.5;b.r.rotation.z=-.5-Math.sin(t*14+b.R)*.5;
    if(!CS.active&&pd<1.5&&b.g.position.y-P.pos.y<2.7){b.done=1;b.k=0;b.from=b.g.position.clone();const r=SBRM.R1;b.to=V3(r[1]-1.2,rand(2,5),rand(r[2]+6,r[3]-6));SB.s.books=(SB.s.books||0)+1;sx('book',.8,null,{rate:1+SB.s.books*.08});sx('ding',.5,null,{rate:.9+SB.s.books*.12});
      if(SB.s.books>=5)after(1.4,sbBooksDone)}}}
function sbBooksDone(){if(CH2.st!==25)return;const o=SB.npc.o;sbStage(o,2.3);playCutscene([sbLine(SBN.o,'sb_16',o)],()=>{sbEnd();for(const b of SB.books)SB.tu.remove(b.g);SB.books=[];CH2.st=26;ch2Save();writeSave();try{gainXP(600)}catch(x){}toast('Monsieur Tic keeps the Cabinet of Instruments, further down on the left.','Madame Ombline',true)})}

/* ---------- Tic and the orrery ---------- */
function sbTalkT1(){const t=SB.npc.t;if(!t)return;sbStage(t,2.3);playCutscene([sbLine(SBN.t,'sb_17',t),sbLine('@','sb_18',t),sbLine(SBN.t,'sb_19',t)],()=>{sbEnd();SB.s.tic=1;SB.orr.round=0;sbOrrStart()})}
function sbOrrStart(){const O=SB.orr;const n=O.round?5:3;O.seq=[];for(let i=0;i<n;i++){let v;do v=(Math.random()*4)|0;while(i&&v===O.seq[i-1]);O.seq.push(v)}O.i=0;O.ph='show';O.t=-1.2;O.on=-1}
const SBTONE=[.8,1,1.2,1.5];
function sbOrrLight(i,dur){const O=SB.orr,p=O.pl[i],s=O.stones[i];p.g.material.opacity=1;p.p.material.emissiveIntensity=1.4;s.g.material.opacity=.9;s.m.material.emissiveIntensity=1;sx('ding',.75,null,{rate:SBTONE[i]});
  after(dur||.55,()=>{p.g.material.opacity=0;p.p.material.emissiveIntensity=.25;s.g.material.opacity=0;s.m.material.emissiveIntensity=.12})}
function sbOrrTick(dt){const O=SB.orr;if(!O)return;for(const p of O.pl)p.h.rotation.y+=dt*p.sp*(O.ph==='show'?.3:1);if(SB.area!=='tun'||O.ph==='idle'||CS.active)return;
  if(O.ph==='show'){O.t+=dt;while(O.i<O.seq.length&&O.t>=O.i*.85){sbOrrLight(O.seq[O.i]);O.i++}if(O.t>=O.seq.length*.85+.4){O.ph='input';O.i=0;O.on=-1}return}
  if(O.ph==='input'){let on=-1;O.stones.forEach((s,i)=>{if(Math.hypot(P.pos.x-s.p.x,P.pos.z-s.p.z)<1.25)on=i});if(on!==O.on){O.on=on;if(on>=0){if(on===O.seq[O.i]){sbOrrLight(on,.4);O.i++;if(O.i>=O.seq.length){O.ph='wait';sx('powerup',.6,null,{rate:1.2});
            if(O.round===0){O.round=1;after(1.4,()=>{toast('Again, longer.','Monsieur Tic',false);sbOrrStart()})}else after(1.2,sbOrrDone)}}
        else{O.ph='wait';sx('impact',.5,null,{rate:.6});const s=O.stones[on];flash(V3(s.p.x,1,s.p.z),0xff3030,8);sbSay(SBN.t,'sb_20',1);after(3.2,()=>{O.i=0;O.ph='show';O.t=-.6})}}}}}
function sbOrrDone(){const t=SB.npc.t;SB.orr.ph='idle';sbStage(t,2.3);playCutscene([sbLine(SBN.t,'sb_21',t,{onStart:()=>{sbNT(t,1);x4Talk('');sx('book',.7)}}),sbLine('Kaen','sb_22',t),sbLine(SBN.t,'sb_23',t)],()=>{sbEnd();CH2.st=27;ch2Save();writeSave();try{gainXP(700)}catch(x){}toast('The old amphitheatre is past the arches, on the right.','Monsieur Tic',true)})}

/* ---------- Vasseur's oral exam ---------- */
const SBQ=[['sb_25','What does a hollow crown feed on?',['Souls','Gold','Fear']],['sb_26','Who has been hiding from it on Portobello Road for longer than you have been alive?',['Alfred','Desmond','Gog']],['sb_27','A hollow crown can only ever be... what?',['Filled','Broken','Worn']]];
let SBE=null;
function sbExamUI(){if(SBE)return SBE;const st=document.createElement('style');st.textContent=`#sbExam{position:fixed;inset:0;z-index:45;display:none;align-items:center;justify-content:center;pointer-events:none}#sbExam.on{display:flex}
#sbExam .card{pointer-events:auto;width:min(520px,92vw);padding:22px 22px 18px;border-radius:16px;background:linear-gradient(180deg,rgba(18,26,40,.92),rgba(8,12,22,.94));border:1px solid rgba(168,232,255,.35);box-shadow:0 0 40px rgba(110,200,255,.25);color:#e8f4ff;font:500 15px Outfit,system-ui,sans-serif;text-align:center}
#sbExam .tl{font:12px Outfit,sans-serif;letter-spacing:.18em;color:#a8e8ff;opacity:.8;text-transform:uppercase}#sbExam h3{margin:8px 0 16px;font:400 23px 'Pirata One',Georgia,serif;letter-spacing:.02em;line-height:1.25}
#sbExam .row{display:flex;flex-direction:column;gap:8px}#sbExam button{all:unset;cursor:pointer;padding:11px 14px;border-radius:10px;background:rgba(168,232,255,.08);border:1px solid rgba(168,232,255,.22);text-align:left;transition:background .15s}#sbExam button:hover{background:rgba(168,232,255,.18)}
#sbExam button kbd{display:inline-block;min-width:18px;margin-right:10px;padding:1px 6px;border-radius:5px;background:rgba(255,255,255,.12);font:600 12px Outfit,sans-serif;text-align:center}#sbExam .pips{margin-top:12px;font-size:12px;opacity:.7}
#sbExam button.ok{background:rgba(110,255,160,.25);border-color:#7dff9a}#sbExam button.no{background:rgba(255,90,90,.25);border-color:#ff6a6a}`;document.head.appendChild(st);
  SBE=document.createElement('div');SBE.id='sbExam';SBE.innerHTML='<div class="card"><div class="tl">Oral exam · Professor Vasseur</div><h3></h3><div class="row"></div><div class="pips"></div></div>';document.body.appendChild(SBE);
  addEventListener('keydown',e=>{if(!SBE.classList.contains('on'))return;const n={Digit1:0,Digit2:1,Digit3:2,Numpad1:0,Numpad2:1,Numpad3:2}[e.code];if(n==null)return;e.stopImmediatePropagation();e.preventDefault();const b=SBE.querySelectorAll('button')[n];if(b)b.click()},true);return SBE}
function sbExamClose(){if(SBE)SBE.classList.remove('on');SB.exam=null}
function sbTalkV1(){const v=SB.npc.v;if(!v)return;sbStage(v,3.2);playCutscene([sbLine(SBN.v,'sb_24',v,{fov:38})],()=>{sbEnd();sbExamStart()})}
function sbExamStart(){SB.exam={q:0,lock:0};sbExamAsk()}
function sbExamAsk(){const E=sbExamUI(),X=SB.exam;if(!X)return;const [key,q,opts]=SBQ[X.q];const sh=opts.map((t,i)=>({t,ok:i===0})).sort(()=>Math.random()-.5);E.querySelector('h3').textContent=q;
  const row=E.querySelector('.row');row.innerHTML='';sh.forEach((o,i)=>{const b=document.createElement('button');b.innerHTML=`<kbd>${i+1}</kbd>`;b.appendChild(document.createTextNode(o.t));b.onclick=()=>sbExamPick(b,o.ok);row.appendChild(b)});
  E.querySelector('.pips').textContent=['●○○','●●○','●●●'][X.q]+'   question '+(X.q+1)+' of 3';E.classList.add('on');X.lock=0;sbSay(SBN.v,key,1)}
function sbExamPick(b,ok){const X=SB.exam;if(!X||X.lock)return;X.lock=1;b.classList.add(ok?'ok':'no');if(ok){sx('ding',.7,null,{rate:1+X.q*.15});after(.9,()=>{if(!SB.exam)return;X.q++;if(X.q>=3){sbExamClose();sbExamPass()}else sbExamAsk()})}
  else{sx('impact',.5,null,{rate:.6});P.shake=.3;sbSay(SBN.v,'sb_28',1);after(2.6,()=>{if(!SB.exam)return;X.q=0;sbExamAsk()})}}
function sbExamPass(){const v=SB.npc.v;sbStage(v,3.2);let key=null;playCutscene([sbLine(SBN.v,'sb_29',v,{fov:38,onStart:()=>{sbNT(v,1);x4Talk('');key=new THREE.Group();const km=std({color:0xe8c060,emissive:0x8a6010,roughness:.3,metalness:.8});sbBox(key,.08,.5,.06,0,0,0,km);const bw=new THREE.Mesh(new THREE.TorusGeometry(.12,.035,8,16),km);bw.position.y=.32;key.add(bw);sbBox(key,.16,.06,.06,.08,-.2,0,km);const kg=glowSprite(0xffd890,.9,.8);key.add(kg);
      const p=headOf(v.g.position,1.2);key.position.copy(p);SB.tu.add(key);SB.key=key;sx('unveil',.6)},update:(dt,k)=>{if(!key)return;key.rotation.y+=dt*2;key.position.lerpVectors(headOf(v.g.position,1.2),headOf(P.pos,1.2),Math.min(1,k*1.2))}})],
    ()=>{sbEnd();if(key){SB.tu.remove(key);SB.key=null}SP.emit(headOf(P.pos,1.2),{n:30,c0:0xffffff,c1:0xffd27a,speed:3,life:.7,s0:.3,s1:.03});CH2.st=28;ch2Save();writeSave();try{gainXP(800)}catch(x){}toast('Morwen\'s key. The sealed library is at the very end of the tunnel.','Professor Vasseur',true)})}

/* ---------- the sealed library and Morwen's carrel ---------- */
function sbOpenDoor(){if(CS.active)return;SB.s.door=1;const d=SB.door;sx('rune',.9);sx('pubdoor',.8,null,{rate:.6});flash(V3(SBT.x,3,-232),0xb070ff,14);SP.emit(V3(SBT.x,3.4,-232),{n:60,c0:0xffffff,c1:0xb070ff,speed:6,life:.8,s0:.4,s1:.04});P.shake=.5;sbDoorOpen()}
function sbFinale(){if(CS.active)return;const X=SBT.x,desk=V3(X,0,-258.5);const sp=V3(X,0,-255.6);P.pos.set(sp.x,0,sp.z);P.face=Math.PI;P.flying=false;KFW.pin=1;LYR.pin=1;if(KFW.a){KFW.a.g.position.set(X+1.8,0,-254.6);x4Face(KFW.a,desk)}if(LYR.a){LYR.a.g.position.set(X-1.8,0,-254.8);x4Face(LYR.a,desk)}
  const over=k=>({pos:V3(X+.9,2.8,-254.4),look:V3(X-.2,1+k*.2,-258.6)});
  playCutscene([{dur:2.6,fov:44,cut:true,cam:k=>({pos:V3(X+3-k*2,2.4,-249-k*3),look:V3(X,1.6,-259)}),onStart:()=>{sx('book',.6,null,{rate:.8});P.heroAnim='Idle_Loop'}},
    {who:'@',text:XL4.sb_30,fov:40,cam:over,onStart:()=>x4Talk('@')},
    {dur:2.4,fov:36,cut:true,cam:k=>({pos:V3(X+.2,3.4-k*.4,-256.4),look:V3(X,3.6,-261.9)}),onStart:()=>{x4Talk('')}},
    sbLine('Lyra','sb_31',null,{cam:sbTC(SBL,()=>desk,2.2,.6),onStart:()=>{x4Talk('Lyra');if(SB.letter){SB.letter.m.visible=false;SB.letter.g.material.opacity=.3}}}),
    sbLine('@','sb_32',null,{cam:sbTC(()=>P.pos,SBL,2.2,.6),onStart:()=>{x4Talk('@');P.face=Math.atan2(SBL().x-P.pos.x,SBL().z-P.pos.z)}}),
    sbLine('Lyra','sb_33',null,{cam:sbTC(SBL,()=>P.pos,2.3,.6)}),
    sbLine('Kaen','sb_34',null,{fov:32,cam:sbTC(SBK,()=>P.pos,2.1,.5),onStart:()=>{x4Talk('Kaen');sx('heart',.6)}}),
    sbLine('@','sb_35',null,{fov:44,cam:k=>({pos:V3(X+3.5-k*1,2.2+k*1.2,-251+k*2),look:V3(X,1.6,-256)}),onStart:()=>{x4Talk('@');P.face=Math.PI}})],
    ()=>{sbEnd();CH2.st=29;ch2Save();writeSave();try{gainXP(1500)}catch(x){}x5Banner('THE SORBONNE','HER TRUE NAME IS OUT THERE','#a8e8ff',2.8,'#081420');toast('Morwen is not her real name. Somewhere, someone knows the one she was born with.','Chapter XVII complete',true)})}

/* ---------- per frame ---------- */
{const _mt=muTick;muTick=function(dt){_mt(dt);if(!started||MODE==='open')return;dt=Math.min(dt,.05);SB.t+=dt;for(let i=SB.anim.length-1;i>=0;i--)if(SB.anim[i](dt)===false)SB.anim.splice(i,1);
  /* the auto-hand-off: after the Crown runs, Lyra opens her door */
  if(CH2.zone==='north'&&CH2.st===23&&!SB.p23&&!CS.active){SB.w23=(SB.w23||0)+dt;if(SB.w23>7)sbPortalScene()}
  if(CH2.zone==='paris'&&CH2.st>=24&&CH2.st<=29&&!SB.boot&&!CS.active){SB.boot=1;sbEnter(CH2.st>=25&&CH2.st<29?'tun':'plaza')}
  if(CH2.zone==='paris'&&CH2.st===23&&!SB.b23&&!CS.active){SB.b23=1;try{lyraToTroca()}catch(x){}CH2.obj=()=>CH2.zone==='paris'&&CH2.st===23?`Meet <b>Lyra</b> at the Trocadéro · she can open a door to the Sorbonne · ${Math.round(Math.hypot(P.pos.x+126,P.pos.z+112))}m`:null}
  if(CH2.zone!=='latin'||!SB.g)return;
  for(const a of SB.acts)if(a.g.parent&&a.g.parent.visible)try{a.update(dt)}catch(x){}
  const v=SB.npc.v;if(v){v.g.position.y=.75+Math.sin(SB.t*1.3)*.15}
  const G=SB.gate;if(G){G.open+=(G.tg-G.open)*Math.min(1,dt*1.2);G.l.rotation.y=G.open*1.5;G.r.rotation.y=-G.open*1.5;G.cour.material.opacity=G.open*.55}
  const D=SB.door;if(D){D.open+=(D.tg-D.open)*Math.min(1,dt*.9);D.g.position.y=-D.open*7.2;D.rn.rotation.z+=dt*.6;D.dg.material.opacity=.5*(1-D.open)+Math.sin(SB.t*3)*.1}
  if(SB.area==='tun'){scene.fog.color.lerp(new THREE.Color(0x120c08),Math.min(1,dt*3));scene.fog.density+=(.03-scene.fog.density)*Math.min(1,dt*3);if(P.flying){P.flying=false;P.vy=Math.min(P.vy||0,0);if(!SB.flyMsg){SB.flyMsg=1;toast('No room to fly down here.','Les Réserves',false)}}if(P.pos.y>4.5){P.pos.y=4.5;P.vy=Math.min(P.vy||0,0)}
    for(const s of SB.sconce||[])s.material.opacity=.6+Math.sin(SB.t*9+s.position.z)*.08;if(Math.random()<dt*6)SP.emit(V3(P.pos.x+rand(-5,5),rand(.5,5),P.pos.z+rand(-6,6)),{c0:0xffe8c0,c1:0x403020,s0:.08,s1:.02,life:2.4,speed:.15});
    const J=SB.jar;if(J){J.g.material.opacity=.3+Math.sin(SB.t*2.2)*.15;J.t=Math.max(0,J.t-dt);if(J.t<=0&&sbIn(J.m.position,1.4)&&!CS.active){J.t=12;sx('chan',.4,null,{rate:1.6});SM.emit(J.m.position.clone().add(V3(0,.5,0)),{n:8,c0:0x60ff90,c1:0x062a10,s0:.4,s1:1.4,life:1,a:.4,up:1});toast('The jar whispers your name. You put it down, carefully.','Les Réserves',false)}}}
  else if(SB.fog0){scene.fog.color.lerp(SB.fog0.c,Math.min(1,dt*3));scene.fog.density+=(SB.fog0.d-scene.fog.density)*Math.min(1,dt*3)}
  sbCatTick(dt);sbBooksTick(dt);sbOrrTick(dt);sbInterTick()}}

/* ---------- world plumbing ---------- */
{const _g=groundAt;groundAt=function(x,z,y){if(MODE!=='open'&&x>5500&&x<7000)return 0;return _g.apply(this,arguments)}}
{const _mw=muWant;muWant=function(){if(started&&MODE!=='open'&&CH2.zone==='latin'&&!(typeof bmWant==='function'&&bmWant()))return SB.area==='tun'?'mus_ownight':'mus_cafe';return _mw.apply(this,arguments)}}
{const _dw=drawWorldMap;drawWorldMap=function(){if(MODE!=='open'&&CH2.zone==='latin'&&SB.area){worldMap.width=WB.x1-WB.x0+48;worldMap.height=WB.z1-WB.z0+48;MAPOX=WB.x0-24;MAPOZ=WB.z0-24;const x=worldMap.getContext('2d'),X=v=>v-MAPOX,Z=v=>v-MAPOZ;x.fillStyle='#1d1935';x.fillRect(0,0,worldMap.width,worldMap.height);
  if(SB.area==='plaza'){x.fillStyle='#4a4660';x.fillRect(X(5960),Z(-70),80,110);x.fillStyle='#8a7a5a';x.fillRect(X(5975),Z(-110),50,40);x.fillStyle='#2b4b86';x.beginPath();x.arc(X(6000),Z(-16),4.4,0,7);x.fill()}
  else{x.fillStyle='#5a4a3a';for(const r of Object.values(SBRM))x.fillRect(X(r[0]),Z(r[2]),r[1]-r[0],r[3]-r[2])}return}return _dw.apply(this,arguments)}}
{const _lp=lyraPanel;lyraPanel=function(){if(MODE!=='open'&&CH2.st>=23&&CH2.st<29){const c=tutCard(`<div class="tl">Lyra</div><h3>The door to the Sorbonne</h3><p>My magic is all mine again. I can put us right at the Sorbonne's door, where Morwen used to study.</p><div class="row"><button data-a="go">Go</button><button data-a="no">Not yet</button></div>`);c.onclick=e=>{const b=e.target.closest('[data-a]');if(!b)return;tutHide();if(b.dataset.a==='go'){if(CH2.st===23)sbPortalScene();else{x5White(.5,.4,()=>sbEnter(CH2.st>=25?'tun':'plaza'))}}};return}return _lp.apply(this,arguments)}}
{const _t=toast;toast=function(msg,title){if(SB.muteT>time&&!(title&&/XVII/.test(title)))return;return _t.apply(this,arguments)}}
{const _dr=distReal;distReal=function(u){if(MODE!=='open'&&CH2.zone==='latin')return Math.round(u)+' m';return _dr.apply(this,arguments)}}
{const _rv=revive;revive=function(){const r=_rv.apply(this,arguments);if(MODE!=='open'&&CH2.zone==='latin'){const c=SPAWN;P.pos.set(c.x,0,c.z);P.flying=false}return r}}

/* ---------- chapter select ---------- */
CHAPTERS.push({id:'sorbonne',n:'XVII',title:'The Sorbonne',desc:'Lyra opens a door home. Somewhere under the Sorbonne, someone still remembers Morwen.'});
CHART.sorbonne=['#a8e8ff','#0c1a2a','book'];CHGLY.book='<path d="M6 9c5-2 10-2 14 1v23c-4-3-9-3-14-1z"/><path d="M34 9c-5-2-10-2-14 1v23c4-3 9-3 14-1z" opacity=".75"/>';
{const _cb=chapBoss;chapBoss=function(c){if(c.id==='sorbonne')return null;return _cb(c)}}
{const _ac=applyChapter;applyChapter=function(id){if(CH2.zone==='latin')sbLeave();SB.boot=0;SB.p23=0;SB.w23=0;SB.b23=0;if(id!=='sorbonne')return _ac.apply(this,arguments);SB.muteT=time+2.5;_ac.call(this,'crown2');CH2.st=24;XO.ph=0;SB.s={};SB.boot=1;SB.p23=1;
  if(SB.cat)SB.cat.g.visible=false;if(SB.gate){SB.gate.tg=0;SB.gate.open=0}if(SB.door){SB.door.tg=0;SB.door.open=0;SB.door.g.position.y=0;if(!SB.boxes.tu.includes(SB.door.box))SB.boxes.tu.push(SB.door.box)}if(SB.letter){SB.letter.m.visible=true}if(SB.orr)SB.orr.ph='idle';
  sbEnter('plaza');ch2Save();after(.9,()=>toast('Place de la Sorbonne. The night porter guards the gate, east of the chapel.','Chapter XVII: The Sorbonne',true))}}
{const _rc=renderChapters;renderChapters=function(){_rc();const list=$('chapList');if(!list)return;try{const el=list.children[chapIndexOf('sorbonne')];if(el){const done=CH2.st>=29,cur=started&&CH2.st>=23&&CH2.st<29;el.classList.toggle('done',done);el.classList.toggle('cur',cur);const th=el.querySelector('.th');if(th&&done&&!th.querySelector('u'))th.insertAdjacentHTML('beforeend','<u>✓</u>')}
  const c2=list.children[chapIndexOf('crown2')];if(c2&&CH2.st>=23){c2.classList.remove('cur');c2.classList.add('done')}}catch(x){}}}

/* ---------- camera: never behind a wall or above the vaults down here ---------- */
function sbSolid(x,z){for(const b of boxes)if(b.sb&&b.h>3&&x>b.x0&&x<b.x1&&z>b.z0&&z<b.z1)return true;return false}
function sbCeil(x,z){const r=SBRM.R3;return x>r[0]&&x<r[1]&&z>r[2]&&z<r[3]?10.6:6.8}
{const _uc=updateCamera;updateCamera=function(dt){const r=_uc.apply(this,arguments);if(MODE!=='open'&&CH2.zone==='latin'&&SB.area){const T=camTarget,D=camDesired,d=D.clone().sub(T),L=d.length();
  if(L>.1){d.divideScalar(L);let ok=L;for(let s=.25;s<=L+.01;s+=.25){const x=T.x+d.x*s,y=T.y+d.y*s,z=T.z+d.z*s;if((SB.area==='tun'&&y>sbCeil(x,z)-.5)||sbSolid(x,z)){ok=Math.max(.7,s-.45);break}}
    SB.cd=SB.cd==null||SB.cdA!==SB.area?ok:(ok<SB.cd?ok:SB.cd+(ok-SB.cd)*Math.min(1,dt*2.2));SB.cdA=SB.area;camera.position.copy(T).addScaledVector(d,Math.min(L,SB.cd));
    if(P.shake>0){camera.position.x+=rand(-1,1)*P.shake*.3;camera.position.y+=rand(-1,1)*P.shake*.3}camera.lookAt(T)}}return r}}

/* ---------- no Seine under the Sorbonne: no swimming, no bridges, no river push ---------- */
{const _w=stWater;stWater=function(x,z){if(MODE!=='open'&&x>5500&&x<7000)return false;return _w.apply(this,arguments)}}
{const _b=stBridge;stBridge=function(x,z){if(MODE!=='open'&&x>5500&&x<7000)return false;return _b.apply(this,arguments)}}
{const _c=collide;collide=function(p,r,ghost,skipBlocks){if(MODE==='open'||!(p.x>5500&&p.x<7000))return _c.apply(this,arguments);
  for(const b of boxes){if(!b.sb||p.y>b.h)continue;const cx=clamp(p.x,b.x0,b.x1),cz=clamp(p.z,b.z0,b.z1);const dx=p.x-cx,dz=p.z-cz,d2=dx*dx+dz*dz;
    if(d2<r*r){if(d2>1e-6){const d=Math.sqrt(d2);p.x=cx+dx/d*r;p.z=cz+dz/d*r}else{const l=p.x-b.x0,rr=b.x1-p.x,t=p.z-b.z0,bt=b.z1-p.z,m=Math.min(l,rr,t,bt);if(m===l)p.x=b.x0-r;else if(m===rr)p.x=b.x1+r;else if(m===t)p.z=b.z0-r;else p.z=b.z1+r}}}}}
