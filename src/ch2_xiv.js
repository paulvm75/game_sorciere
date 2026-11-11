/* ================= CHAPTER XIV · The Smoke of Portobello ================= */
/* st 13: after Vesper · 14: find Alfred · 15: Alfred met, step outside · 16: Alfred is dead, Desmond waits · 17: done */
const NH={x0:-690,built:false,g:null,pubG:null,shown:false,said:{},fac:null,alf:null,lamp:null,dome:null};
const X4={e:null,fight:0,t13:0,smokes:[],walls:[],serp:[],said:{},haze:0,fogK:0,re:0};
const nhPrX=z=>-482+6*Math.sin((z+9852)/30);
const NHR={gate:-9852,chep:-9912,west:-9974,lad:-604,pem:-410,z1:-10028};
const NH_PUB=(()=>{const fx=nhPrX(-9945)-5.4,z=-9945;return{fx,z,x:fx-6,door:V3(fx+.8,0,z+7.3),side:V3(fx-6,0,z+7),box:[fx-13.2,fx+.4,z-6.4,z+9]}})();
const X4FB={x0:-640,x1:-418,z0:-10022,z1:-9858};
Object.assign(SPEAKER,{Alfred:'#f2c46a',Desmond:'#a6ff8e'});
Object.assign(XL3,{
  m8_01:'Okay, wait. The Tower is gone. Vesper is gone. So is the Crown dead, or not?',
  k8_01:"It's more complicated than that. The Crown died a long time ago. What's left of it is... hunger.",
  m8_02:"A dead crown that's hungry. Great. That clears everything up.",
  ly50:"Think of it like a fire with no wood left. It doesn't live in one place. It lives in vessels. Places it can drink from.",
  k8_02:"The Tower was one vessel. Saint Paul's was another. Each one had a guardian. The Warden. Vesper. Both gone now.",
  m8_03:'And you? It fed on you for ten years.',
  k8_03:"Ten years. But I'm free now. It can't feed on me, and it can't wear my body anymore. I was its bridge to Paris. Without me, Paris is cut off. Not one drop reaches it.",
  m8_04:'Then why is London still crawling with bats?',
  ly51:"Leftovers. Things it made while it was strong. It's starving now, but it isn't gone. And a starving thing is a dangerous thing.",
  m8_05:"So it's dead, but alive, and starving, and dangerous. I hate this so much.",
  k8_04:"There's one man who knows where the last vessel is. Alfred Mumbash. He's been hiding on Portobello Road since before I was born.",
  ly52:'He cloaked himself so the Crown could never find him. If he lets us in, it means he trusts us.',
  m8_06:"Portobello Road. Fine. But if he talks in riddles, I'm leaving.",
  m8_07:'So this is Notting Hill. Pretty houses for a place full of secrets.',
  al_01:'Nobody find dis place unless I let dem. So... I let you. Come in, come in. Mind de glass.',
  m8_08:'Are you Alfred Mumbash?',
  al_02:'Ninety-eight years old, and still de Crown cannot find me. Sit down, child. You have questions all over your face.',
  al_03:'De Crown is not a king. It is a hunger dat outlive its king. It drink through vessels. You broke two. It have one left.',
  m8_09:'Where?',
  al_04:'De last vessel is de place where every king of dis land was crowned. Westminster. But you don\'t go dere with de little one empty.',
  al_05:"Come here, darling. Take some of mine. I am old. I don't need so much anymore.",
  ly53:"Oh... I can feel it. My magic... it's coming back!",
  al_06:"And one more ting. Don't trust anybody who say my name too kindly.",
  k8_05:'Thank you, old man.',
  de_01:'Alfred. Sixty years hiding in a hole... and you open de door for children?',
  al_07:'Desmond. My own brother. What dem promise you?',
  de_02:'I chose de winning side, brother. You chose to be forgotten.',
  m8_10:'No! Alfred!',
  al_08:'Good luck... only you can save dis city now...',
  de_03:'Come, den. Let me show you what real smoke does.',
  de_04:'Breathe it in. Every breath is mine.',de_05:'You tink you big? Look at me now!',de_06:'My wards stood longer dan your whole bloodline, girl.',
  k8_07:'His wards are holding! Break the glyphs, then hit him!',k8_08:"He's growing! Keep moving, don't let him stomp you!",ly55:"Stay out of the smoke, Maëlle! It's eating your strength!",
  de_07:'De Crown... it promised... me...',m8_11:"Rest now, Alfred. We'll finish what you started.",k8_06:"Desmond chose the Crown. Alfred chose the city. Let's make his choice count.",ly54:'His magic is still in me. Warm. Like a candle someone lit, and handed to me.'});
for(const k of Object.keys(XL3))if(/^(m8_|k8_|al_|de_|ly5[0-5])/.test(k))VO_MAP[XL3[k]]=k;
const x4Say=(w,k,p)=>epSay(w,XL3[k],p);

/* ---------- Victorian facades: stucco, sash windows, pediments, cornices ---------- */
function nhFacTex(base,kind,seed){const W=128,H=256;const R=mulberry(seed||7);const r=(a,b)=>a+R()*(b-a);const lit=[];const shop=kind==='shop',villa=kind==='villa',brick=kind==='brick';
  const sash=(x,X,Y,w,h,hood)=>{x.fillStyle='#f6f2ea';x.fillRect(X-4,Y-4,w+8,h+8);const g=x.createLinearGradient(X,Y,X+w,Y+h);g.addColorStop(0,'#2a3648');g.addColorStop(.55,'#141c28');g.addColorStop(1,'#232e3e');x.fillStyle=g;x.fillRect(X,Y,w,h);
    x.fillStyle='rgba(255,255,255,.9)';x.fillRect(X,Y+h/2-1.2,w,2.4);for(const fx of[1/3,2/3])x.fillRect(X+w*fx-.6,Y,1.2,h);for(const fy of[1/6,1/3,2/3,5/6])x.fillRect(X,Y+h*fy-.5,w,1);x.fillStyle='#e8e2d6';x.fillRect(X-6,Y+h+4,w+12,4);
    if(hood==='ped'){x.fillStyle='#f6f2ea';x.beginPath();x.moveTo(X-7,Y-5);x.lineTo(X+w/2,Y-15);x.lineTo(X+w+7,Y-5);x.closePath();x.fill();x.fillStyle='rgba(0,0,0,.18)';x.fillRect(X-7,Y-5,w+14,2)}
    else if(hood){x.fillStyle='#f6f2ea';x.fillRect(X-7,Y-10,w+14,6);x.fillStyle='rgba(0,0,0,.18)';x.fillRect(X-7,Y-5,w+14,1.5)}lit.push([X,Y,w,h,R()<.38])};
  const map=mkCanvas(W,H,x=>{const up=brick?'#b9a57c':base,low=brick?'#ece6d8':villa?'#f2eee4':base;x.fillStyle=up;x.fillRect(0,0,W,186);x.fillStyle=low;x.fillRect(0,186,W,H-186);
    if(brick){x.fillStyle='rgba(60,40,20,.28)';for(let y=10;y<186;y+=4){x.fillRect(0,y,W,1);for(let c=0;c<W;c+=9)x.fillRect(c+((y/4)%2)*4.5,y,1,4)}for(let k=0;k<260;k++){x.fillStyle=`rgba(${(r(90,160))|0},${(r(60,110))|0},${(r(40,80))|0},.22)`;x.fillRect(r(0,W),r(10,186),8,3)}}
    for(let k=0;k<700;k++){x.fillStyle=R()<.5?'rgba(255,255,255,.04)':'rgba(0,0,0,.05)';x.fillRect(r(0,W),r(0,H),r(1,3),r(1,3))}
    x.fillStyle='#2c2a2e';x.fillRect(0,0,W,7);x.fillStyle='#f4f0e8';x.fillRect(0,8,W,14);x.fillStyle='rgba(0,0,0,.2)';for(let c=4;c<W;c+=8)x.fillRect(c,10,4,9);x.fillStyle='#f6f2ea';x.fillRect(0,22,W,5);x.fillStyle='rgba(0,0,0,.25)';x.fillRect(0,27,W,1.5);for(let c=2;c<W;c+=6)x.fillRect(c,23,3,3);
    for(const X of[26,80])sash(x,X,38,22,30,'');for(const X of[26,80])sash(x,X,82,22,38,true);for(const X of[24,78])sash(x,X,132,26,46,'ped');
    x.fillStyle='#16161a';x.fillRect(16,180,96,2);for(let c=18;c<110;c+=3.2)x.fillRect(c,172,1,9);x.fillRect(16,171,96,1.5);
    x.fillStyle='#f6f2ea';x.fillRect(0,184,W,6);x.fillStyle='rgba(0,0,0,.2)';x.fillRect(0,190,W,1.5);
    if(shop){const fas=['#14324a','#3a1424','#14382a','#3a2c12','#1e1e26','#4a1a10'][(R()*6)|0];x.fillStyle=fas;x.fillRect(4,192,W-8,15);x.fillStyle='#d8b860';x.font='bold 9px Georgia,serif';x.textAlign='center';x.fillText(['ANTIQUES','VINTAGE','BOOKS','FRUIT & VEG','CAFÉ','RECORDS','PRINTS','SILVER'][(R()*8)|0],W/2,203);
      x.fillStyle='#f6f2ea';x.fillRect(4,208,W-8,44);x.fillStyle='#1c2430';x.fillRect(9,212,50,38);x.fillRect(69,212,50,38);x.fillStyle='#2a3040';x.fillRect(58,210,12,42);x.fillStyle='#f6f2ea';for(const X of[25,42,85,102])x.fillRect(X,212,1.4,38);lit.push([9,212,50,38,R()<.75]);lit.push([69,212,50,38,R()<.75])}
    else{x.fillStyle='rgba(0,0,0,.1)';for(let y=196;y<252;y+=7)x.fillRect(0,y,W,1);sash(x,14,202,30,44,true);
      x.fillStyle='#f6f2ea';x.fillRect(72,196,44,60);x.fillStyle=['#121a14','#1a1418','#14182a','#2a1416'][(R()*4)|0];x.fillRect(80,210,28,46);x.fillStyle='#1c2430';x.beginPath();x.arc(94,209,13,Math.PI,0);x.fill();x.fillStyle='#f6f2ea';for(let k=0;k<5;k++){x.save();x.translate(94,209);x.rotate(Math.PI+k*Math.PI/4);x.fillRect(0,0,13,1);x.restore()}x.fillStyle='#c8a050';x.fillRect(101,232,3,3)}
    x.fillStyle='rgba(0,0,0,.28)';x.fillRect(0,H-5,W,5)});
  const em=mkCanvas(W,H,x=>{x.fillStyle='#000';x.fillRect(0,0,W,H);for(const[X,Y,w,h,on]of lit){if(!on)continue;const g=x.createLinearGradient(0,Y,0,Y+h);g.addColorStop(0,'#ffd696');g.addColorStop(1,'#d8883a');x.fillStyle=g;x.fillRect(X+1,Y+1,w-2,h-2);x.fillStyle='rgba(0,0,0,.55)';x.fillRect(X,Y+h/2-1.2,w,2.4)}});
  const t=new THREE.CanvasTexture(map),e=new THREE.CanvasTexture(em);t.anisotropy=8;return std({map:t,emissive:0xffffff,emissiveMap:e,emissiveIntensity:.85,roughness:.85,envMapIntensity:.3})}
function nhBoxGeo(){const g=new THREE.BoxGeometry(1,1,1);g.translate(0,.5,0);const uv=g.attributes.uv;for(let i=8;i<16;i++)uv.setXY(i,.5,.985);uv.needsUpdate=true;return g}
function nhSignTex(a,b){const t=new THREE.CanvasTexture(mkCanvas(256,64,x=>{x.fillStyle='#f6f4ee';x.fillRect(0,0,256,64);x.strokeStyle='#111';x.lineWidth=5;x.strokeRect(4,4,248,56);x.fillStyle='#111';x.font='bold 24px Helvetica,Arial,sans-serif';x.textAlign='center';x.fillText(a,b?110:128,42);if(b){x.fillStyle='#c01818';x.fillText(b,222,42)}}));return t}
function nhRailTex(){return new THREE.CanvasTexture(mkCanvas(128,32,x=>{x.clearRect(0,0,128,32);x.fillStyle='#0e0e10';x.fillRect(0,5,128,2);x.fillRect(0,27,128,2);for(let c=2;c<128;c+=5){x.fillRect(c,4,1.6,26);x.beginPath();x.moveTo(c-1.2,5);x.lineTo(c+.8,0);x.lineTo(c+2.8,5);x.fill()}}))}

/* ---------- Notting Hill, Portobello Road, Ladbroke Grove, Kensington Gardens ---------- */
function nhBuild(){if(NH.built||!NZ.built)return;NH.built=true;const M=nzM();const G=NH.g=new THREE.Group();NZ.g.add(G);
  c2plane(G,410,440,-485,-.02,-9815,nzGroundMat(410,440));
  const lawn=std({color:0x3a5a2c,roughness:1,map:rep(new THREE.CanvasTexture(mkCanvas(64,64,x=>{x.fillStyle='#3e5e2e';x.fillRect(0,0,64,64);for(let k=0;k<500;k++){x.fillStyle=Math.random()<.5?'rgba(120,160,70,.25)':'rgba(10,30,10,.25)';x.fillRect(Math.random()*64,Math.random()*64,1,3)}})),60,40)});
  c2plane(G,286,182,-547,.008,-9937,lawn);
  {let thm=null;NZ.g.traverse(o=>{if(!thm&&o.isMesh&&o.geometry&&o.geometry.parameters&&o.geometry.parameters.width===560&&o.geometry.parameters.height===TH_W*2)thm=o.material});const th=c2plane(G,410,TH_W*2,-485,.05,TH_Z,thm||M.sea);th.receiveShadow=false;
    for(const s of[-1,1])c2box(G,410,1.4,.8,-485,-1.1,TH_Z+s*(TH_W+.4),std({color:0x6a6458,roughness:.95,envMapIntensity:.2}),false)}
  const slab=std({color:0xb8b4ac,roughness:.9,map:rep(new THREE.CanvasTexture(mkCanvas(64,64,x=>{x.fillStyle='#a8a49c';x.fillRect(0,0,64,64);x.fillStyle='rgba(40,40,40,.5)';for(let k=0;k<4;k++){x.fillRect(0,k*16,64,1);x.fillRect(k*16+(k%2)*8,0,1,64)}for(let k=0;k<200;k++){x.fillStyle=Math.random()<.5?'rgba(255,255,255,.06)':'rgba(0,0,0,.08)';x.fillRect(Math.random()*64,Math.random()*64,2,2)}})),1,1)});
  const asph=std({color:0x2c2c30,roughness:.92}),lines=std({color:0xe8e4d0,roughness:.8});
  const pave=(x0,x1,z0,z1)=>{const m=slab.clone();m.map=slab.map.clone();m.map.needsUpdate=true;m.map.repeat.set((x1-x0)/4,(z1-z0)/4);c2plane(G,x1-x0,z1-z0,(x0+x1)/2,.018,(z0+z1)/2,m)};
  const road=(x0,x1,z0,z1,pw)=>{c2plane(G,x1-x0,z1-z0,(x0+x1)/2,.03,(z0+z1)/2,asph);if(pw){if(x1-x0>z1-z0)pave(x0,x1,z0-pw,z1+pw);else pave(x0-pw,x1+pw,z0,z1)}};
  road(NH.x0,-272,NHR.gate-5.5,NHR.gate+5.5,3);road(NHR.lad-5.5,NHR.lad+5.5,NHR.z1,NHR.gate,3);road(NHR.lad,NHR.pem,NHR.chep-4,NHR.chep+4,2.8);road(NH.x0,NHR.pem,NHR.west-4.5,NHR.west+4.5,3);road(NHR.pem-4,NHR.pem+4,NHR.west,NHR.gate,2.6);
  {const rp=[],uv=[],ri=[],pp=[],pi=[];let n=0;for(let z=NHR.gate;z>=NHR.z1;z-=2){const x=nhPrX(z);rp.push(x-3.8,.035,z,x+3.8,.035,z);uv.push(0,n/3,1,n/3);for(const s of[-1,1])pp.push(x+s*3.8,.02,z,x+s*5.4,.02,z);if(n){const a=(n-1)*2;ri.push(a,a+2,a+1,a+1,a+2,a+3);const b=(n-1)*4;pi.push(b,b+4,b+1,b+1,b+4,b+5,b+2,b+6,b+3,b+3,b+6,b+7)}n++}
    const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(rp,3));g.setAttribute('uv',new THREE.Float32BufferAttribute(uv,2));g.setIndex(ri);g.computeVertexNormals();
    const tx=new THREE.CanvasTexture(mkCanvas(64,128,x=>{x.fillStyle='#34322f';x.fillRect(0,0,64,128);for(let k=0;k<900;k++){x.fillStyle=Math.random()<.5?'rgba(255,255,255,.07)':'rgba(0,0,0,.15)';x.fillRect(Math.random()*64,Math.random()*128,2,2)}x.fillStyle='#d8c860';x.fillRect(4,0,2,128);x.fillRect(58,0,2,128)}));tx.wrapT=THREE.RepeatWrapping;
    G.add(new THREE.Mesh(g,std({map:tx,roughness:.9,side:THREE.DoubleSide,polygonOffset:true,polygonOffsetFactor:-2})));const pg=new THREE.BufferGeometry();pg.setAttribute('position',new THREE.Float32BufferAttribute(pp,3));pg.setIndex(pi);pg.computeVertexNormals();G.add(new THREE.Mesh(pg,std({color:0xa8a49c,roughness:.9,side:THREE.DoubleSide})))}
  for(let z=NHR.gate-8;z>NHR.z1+4;z-=7)c2plane(G,.22,3.4,NHR.lad,.04,z,lines);for(let x=NH.x0+6;x<-276;x+=7)c2plane(G,3.4,.22,x,.04,NHR.gate,lines);
  /* Kensington Gardens */
  {c2plane(G,128,142,-338,.025,-9929,M.lawn);for(const[x,z,w,d]of[[-338,-9929,4,142],[-338,-9929,128,4]])c2plane(G,w,d,x,.035,z,M.gravel);const T=[];for(let x=-398;x<-280;x+=rand(9,14))for(let z=-9862;z>-9996;z-=rand(9,14)){if(Math.abs(x+338)<5||Math.abs(z+9929)<5)continue;T.push([x+rand(-2,2),z+rand(-2,2),rand(1.1,1.6),0])}nzTrees(G,T);
    const rl=[];for(let x=-400;x<-276;x+=1.2)rl.push([x,-9858.4]);CITY_PARENT=G;instanced(new THREE.BoxGeometry(.06,1.2,.06),std({color:0x111114,roughness:.5,metalness:.6}),rl,(o,p)=>{o.position.set(p[0],.6,p[1])});CITY_PARENT=null}
  /* terraces */
  const PAST=['#f2a7b8','#9fd0ea','#f6dc78','#a9dcbf','#cdb0e2','#f4ab8c','#f2eee6','#7fcfc6'];NH.fac=PAST.map((c,i)=>nhFacTex(c,'house',11+i));const SHOP=PAST.map((c,i)=>nhFacTex(c,'shop',31+i));
  const vil=[nhFacTex('#f2eee4','villa',3),nhFacTex('#ece4d2','villa',5),nhFacTex('#e8eef0','villa',7)],brk=[nhFacTex('#b9a57c','brick',9),nhFacTex('#b9a57c','brick',13)];
  const H=[],took=[];const onRoad=(x,z,m)=>Math.abs(z-NHR.gate)<5.5+m&&x<-272||Math.abs(x-NHR.lad)<5.5+m||Math.abs(z-NHR.chep)<4+m&&x>NHR.lad&&x<NHR.pem||Math.abs(z-NHR.west)<4.5+m&&x<NHR.pem||Math.abs(x-NHR.pem)<4+m&&z<NHR.gate&&z>NHR.west||Math.abs(x-nhPrX(z))<3.8+m&&z<NHR.gate+2;
  const PB=NH_PUB.box;const free=(x0,x1,z0,z1)=>{if(x0<NH.x0+2||x1>-404)return false;if(z0<NHR.z1-1||z1>-9819)return false;for(let a=0;a<=4;a++)for(let b=0;b<=4;b++){const x=lerp(x0,x1,a/4),z=lerp(z0,z1,b/4);if(onRoad(x,z,.9))return false}
    if(x1>PB[0]&&x0<PB[1]&&z1>PB[2]&&z0<PB[3])return false;for(const t of took)if(x1>t[0]+.05&&x0<t[1]-.05&&z1>t[2]+.05&&z0<t[3]-.05)return false;return true};
  const add=(cx,cz,sx,sz,h,mat,kind,fc)=>{const x0=cx-sx/2,x1=cx+sx/2,z0=cz-sz/2,z1=cz+sz/2;if(!free(x0,x1,z0,z1))return false;took.push([x0,x1,z0,z1]);H.push({cx,cz,sx,sz,h,mat,kind,fc});return true};
  const pick=(k)=>k==='port'?(Math.random()<.6?['shop',SHOP]:['house',NH.fac]):k==='villa'?['villa',vil]:k==='mix'?(Math.random()<.5?['brick',brk]:['villa',vil]):['brick',brk];
  const nsRow=(fx,za,zb,side,depth,wid,hs,k,setback,gap)=>{for(let z=za;z>zb;){const w=rand(wid[0],wid[1]),zc=z-w/2,x=fx(zc)+side*(setback+depth/2);const[kind,mats]=pick(k);const mi=(Math.random()*mats.length)|0;add(x,zc,depth,w,rand(hs[0],hs[1]),mats[mi],kind,[-side,0]);z-=w+(gap?rand(gap[0],gap[1]):0)}};
  const ewRow=(zf,xa,xb,side,depth,wid,hs,k,setback,gap)=>{for(let x=xa;x<xb;){const w=rand(wid[0],wid[1]),xc=x+w/2,z=zf+side*(setback+depth/2);const[kind,mats]=pick(k);const mi=(Math.random()*mats.length)|0;add(xc,z,w,depth,rand(hs[0],hs[1]),mats[mi],kind,[0,-side]);x+=w+(gap?rand(gap[0],gap[1]):0)}};
  for(const s of[-1,1])nsRow(nhPrX,NHR.gate-6,NHR.z1,s,11,[6,7],[12,13.5],'port',5.4);
  for(const s of[-1,1])nsRow(()=>NHR.lad,NHR.gate-7,NHR.z1,s,13,[11,12.5],[13,14.5],'villa',9.5,[1.6,3]);
  for(const s of[-1,1])ewRow(NHR.chep,NHR.lad+7,NHR.pem-5,s,12,[9.5,11],[12,13.5],'villa',7.5,[1.6,3]);
  for(const s of[-1,1])ewRow(NHR.west,NH.x0+4,NHR.pem-5,s,12,[7,8.5],[12,14],'mix',6.2);
  for(const s of[-1,1])ewRow(NHR.gate,NH.x0+4,-406,s,12,[7,8.5],[13,14.5],'brick',6.5);
  for(const s of[-1,1])nsRow(()=>NHR.pem,NHR.gate-7,NHR.west+5,s,11,[7,8.5],[12,13],'mix',5.6);
  const bg=nhBoxGeo(),o=new THREE.Object3D();const groups=new Map();for(const h of H){if(!groups.has(h.mat))groups.set(h.mat,[]);groups.get(h.mat).push(h)}
  for(const[mat,L]of groups){const im=new THREE.InstancedMesh(bg,mat,L.length);L.forEach((h,i)=>{o.position.set(h.cx,0,h.cz);o.rotation.set(0,0,0);o.scale.set(h.sx,h.h,h.sz);o.updateMatrix();im.setMatrixAt(i,o.matrix)});im.castShadow=im.receiveShadow=true;im.frustumCulled=false;G.add(im)}
  for(const h of H){const x0=h.cx-h.sx/2,x1=h.cx+h.sx/2,z0=h.cz-h.sz/2,z1=h.cz+h.sz/2;boxes.push({x0,x1,z0,z1,h:h.h,nz:1});nzLot(x0,x1,z0,z1,h.h,0,'flat');NZ.mapR.push([x0,z0,h.sx,h.sz])}
  /* Victorian dressing: cornices, string courses, porticos, steps, bay windows, basement railings, awnings, chimneys */
  {const C={cor:[],str:[],col:[],ent:[],st1:[],st2:[],bay:[],rail:[],pit:[],awn:[],ch:[],pot:[]};const off=(h,f,a)=>{const[dx,dz]=h.fc;const ax=dz!==0?1:0,az=dx!==0?1:0;const F=V3(h.cx+dx*(h.sx/2),0,h.cz+dz*(h.sz/2));return F.add(V3(dx*f+ax*a,0,dz*f+az*a))};
    for(const h of H){const[dx,dz]=h.fc,ry=Math.atan2(dx,dz),wf=dx!==0?h.sz:h.sx;const shop=h.kind==='shop';
      C.cor.push([off(h,.22,0),ry,wf+.3,h.h-.55]);C.str.push([off(h,.12,0),ry,wf,shop?3.95:3.75]);
      if(!shop){const a=h.kind==='villa'?wf*.26:wf*.28;for(const s of[-1,1])C.col.push([off(h,1.15,a+s*.82),ry]);C.ent.push([off(h,1.15,a),ry]);C.st1.push([off(h,1.75,a),ry]);C.st2.push([off(h,1.35,a),ry]);
        if(h.kind==='villa'&&wf>9)C.bay.push([off(h,.5,-wf*.22),ry]);C.rail.push([off(h,2.55,0),ry,wf]);C.pit.push([off(h,1.3,0),ry,wf])}
      else if(Math.random()<.65)C.awn.push([off(h,.9,0),ry,wf*.92,(Math.random()*4)|0]);
      if(Math.random()<.85)for(const s of[-1,1]){const ax=dz!==0?1:0,az=dx!==0?1:0;const p=V3(h.cx+ax*s*(wf/2-.5),0,h.cz+az*s*(wf/2-.5));C.ch.push([p,h.h,ry]);for(let q=0;q<4;q++)C.pot.push([p.clone().add(V3(dx!==0?(q-1.5)*.38:0,0,dz!==0?(q-1.5)*.38:0).applyAxisAngle(V3(0,1,0),0)),h.h+1.7])}}
    const wh=std({color:0xf6f2ea,roughness:.6}),blk=std({color:0x0f0f12,roughness:.45,metalness:.5});CITY_PARENT=G;
    const bx=(L,mat,sz,y,fn)=>{if(L.length)instanced(new THREE.BoxGeometry(1,1,1),mat,L,(o,c)=>{o.position.set(c[0].x,(fn?fn(c):y),c[0].z);o.rotation.y=c[1];const s=sz(c);o.scale.set(s[0],s[1],s[2])})};
    bx(C.cor,wh,c=>[c[2],.42,.55],0,c=>c[3]);bx(C.str,wh,c=>[c[2],.2,.28],0,c=>c[3]);bx(C.ent,wh,()=>[2.2,.45,1.25],3.25);bx(C.st1,std({color:0xd8d2c6,roughness:.8}),()=>[2,.3,1.1],.15);bx(C.st2,std({color:0xd8d2c6,roughness:.8}),()=>[2,.6,.7],.3);
    if(C.col.length)instanced(new THREE.CylinderGeometry(.16,.19,3,12),wh,C.col,(o,c)=>{o.position.set(c[0].x,1.5,c[0].z)});
    if(C.bay.length){const bt=new THREE.CanvasTexture(mkCanvas(64,128,x=>{x.fillStyle='#f6f2ea';x.fillRect(0,0,64,128);for(const Y of[10,72]){x.fillStyle='#1c2430';x.fillRect(10,Y,44,44);x.fillStyle='#f6f2ea';for(const X of[24,40])x.fillRect(X,Y,2,44);x.fillRect(10,Y+20,44,2)}x.fillStyle='rgba(0,0,0,.15)';x.fillRect(0,62,64,3)}));
      const bm=std({map:bt,roughness:.7,emissive:0xffcf88,emissiveIntensity:.0});bx(C.bay,bm,()=>[3,7,.95],0,()=>0)}
    if(C.rail.length){const rt=nhRailTex();const rm=new THREE.MeshStandardMaterial({map:rt,transparent:true,alphaTest:.4,side:THREE.DoubleSide,color:0x18181c,roughness:.5,metalness:.5});const rg=new THREE.PlaneGeometry(1,1.05);rg.translate(0,.52,0);
      instanced(rg,rm,C.rail,(o,c)=>{o.position.set(c[0].x,0,c[0].z);o.rotation.y=c[1];o.scale.set(c[2],1,1)});const pg=new THREE.PlaneGeometry(1,1);pg.rotateX(-Math.PI/2);instanced(pg,std({color:0x141416,roughness:1}),C.pit,(o,c)=>{o.position.set(c[0].x,.022,c[0].z);o.rotation.y=c[1];o.scale.set(c[2],1,1.9)})}
    const AW=[0xc8202a,0x1e6a3a,0x204a9a,0xd88a18].map(c=>{const hex='#'+c.toString(16).padStart(6,'0');return std({map:new THREE.CanvasTexture(mkCanvas(64,16,x=>{for(let k=0;k<8;k++){x.fillStyle=k%2?'#f4f0e6':hex;x.fillRect(k*8,0,8,16)}})),roughness:.8,side:THREE.DoubleSide})});
    for(let i=0;i<4;i++){const L=C.awn.filter(a=>a[3]===i);if(L.length)instanced(new THREE.BoxGeometry(1,.05,1.6),AW[i],L,(o,c)=>{o.position.set(c[0].x,3.55,c[0].z);o.rotation.set(0,c[1],0);o.rotateX(.32);o.scale.set(c[2],1,1)})}
    bx(C.ch,std({color:0xa8784e,roughness:.85}),()=>[2,1.7,.9],0,c=>c[1]+.85);if(C.pot.length)instanced(new THREE.CylinderGeometry(.11,.14,.55,8),std({color:0xb0603a,roughness:.8}),C.pot,(o,c)=>{o.position.set(c[0].x,c[1]+.27,c[0].z)});CITY_PARENT=null}
  /* back gardens */
  {const T=[];for(let k=0;k<420&&T.length<150;k++){const x=rand(NH.x0+8,-412),z=rand(NHR.z1+6,NHR.gate-8);if(onRoad(x,z,4))continue;if(took.some(t=>x>t[0]-2.5&&x<t[1]+2.5&&z>t[2]-2.5&&z<t[3]+2.5))continue;if(x>PB[0]-3&&x<PB[1]+3&&z>PB[2]-3&&z<PB[3]+3)continue;T.push([x,z,rand(.8,1.25),0])}nzTrees(G,T)}
  /* street trees */
  {const T=[];for(let z=NHR.gate-10;z>NHR.z1;z-=13)for(const s of[-1,1])T.push([NHR.lad+s*7.3,z,rand(1.1,1.4),0]);for(let x=NHR.lad+12;x<NHR.pem-8;x+=14)for(const s of[-1,1])T.push([x,NHR.chep+s*5.6,rand(1,1.3),0]);nzTrees(G,T)}
  /* the market: stalls, striped awnings, crates of fruit and flowers */
  {const stripes=[0xc8202a,0x1e6a3a,0x204a9a,0xd88a18].map(c=>{const hex='#'+c.toString(16).padStart(6,'0');const t=new THREE.CanvasTexture(mkCanvas(64,16,x=>{for(let k=0;k<8;k++){x.fillStyle=k%2?'#f4f0e6':hex;x.fillRect(k*8,0,8,16)}}));return std({map:t,roughness:.8,side:THREE.DoubleSide})});
    const S=[[],[],[],[]],tab=[],fr=[],post=[];for(let z=NHR.gate-14;z>NHR.z1+8;z-=rand(6.5,9)){if(Math.abs(z-NHR.chep)<8||Math.abs(z-NHR.west)<8||Math.abs(z-NH_PUB.z)<12)continue;for(const s of[-1,1]){if(Math.random()<.35)continue;const x=nhPrX(z)+s*2.35;S[(Math.random()*4)|0].push([x,z,s]);tab.push([x,z]);for(let q=0;q<10;q++)fr.push([x+rand(-.5,.5),z+rand(-1.05,1.05),(Math.random()*6)|0]);
      for(const a of[-1,1])for(const b of[-1,1])post.push([x+a*.75,z+b*1.25]);boxes.push({x0:x-.8,x1:x+.8,z0:z-1.35,z1:z+1.35,h:1,nz:1})}}
    CITY_PARENT=G;const ag=new THREE.BoxGeometry(2,.05,3);S.forEach((L,i)=>{if(L.length)instanced(ag,stripes[i],L,(o,p)=>{o.position.set(p[0]-p[2]*.15,2.35,p[1]);o.rotation.z=p[2]*.22})});
    instanced(new THREE.BoxGeometry(1.5,.12,2.5),std({color:0x5a3a22,roughness:.9}),tab,(o,p)=>{o.position.set(p[0],.95,p[1])});instanced(new THREE.BoxGeometry(1.4,.8,2.3),std({color:0x3a2a1c,roughness:.95}),tab,(o,p)=>{o.position.set(p[0],.45,p[1])});
    instanced(new THREE.CylinderGeometry(.04,.04,2.4,5),std({color:0x2a2a2e,roughness:.5,metalness:.5}),post,(o,p)=>{o.position.set(p[0],1.2,p[1])});
    {const FC=[0xff8a1a,0xd01818,0xf0d020,0x60b030,0xd060c0,0xf4f0ff];const im=instanced(new THREE.IcosahedronGeometry(.13,0),std({color:0xffffff,roughness:.5}),fr,(o,p)=>{o.position.set(p[0],1.1,p[1])});const c=new THREE.Color();fr.forEach((p,i)=>im.setColorAt(i,c.setHex(FC[p[2]])));im.instanceColor.needsUpdate=true}CITY_PARENT=null}
  /* bunting across Portobello */
  {const tri=new THREE.BufferGeometry();tri.setAttribute('position',new THREE.Float32BufferAttribute([-.22,0,0,.22,0,0,0,-.42,0],3));tri.computeVertexNormals();const F=[],v=[];
    for(let z=NHR.gate-9;z>NHR.z1+4;z-=11){const x=nhPrX(z);const a=V3(x-5.3,9.4,z),b=V3(x+5.3,9.4,z+rand(-2,2));for(let q=0;q<14;q++){const t0=q/14,t1=(q+1)/14;const p0=a.clone().lerp(b,t0),p1=a.clone().lerp(b,t1);p0.y-=Math.sin(t0*Math.PI)*.9;p1.y-=Math.sin(t1*Math.PI)*.9;v.push(p0.x,p0.y,p0.z,p1.x,p1.y,p1.z);F.push([p0.x,p0.y,p0.z,Math.atan2(b.z-a.z,b.x-a.x)])}}
    const lg=new THREE.BufferGeometry();lg.setAttribute('position',new THREE.Float32BufferAttribute(v,3));G.add(new THREE.LineSegments(lg,new THREE.LineBasicMaterial({color:0x222222})));
    CITY_PARENT=G;const im=instanced(tri,new THREE.MeshStandardMaterial({color:0xffffff,roughness:.7,side:THREE.DoubleSide,emissive:0x202020}),F,(o,p)=>{o.position.set(p[0],p[1],p[2]);o.rotation.y=-p[3]});const c=new THREE.Color();const BC=[0xe82a3a,0xf8d020,0x2a7ae8,0x30b850,0xf0f0f0,0xe860c0];F.forEach((p,i)=>im.setColorAt(i,c.setHex(BC[i%6])));im.instanceColor.needsUpdate=true;CITY_PARENT=null}
  /* lamps and street signs */
  {const L=[];for(let z=NHR.gate-8;z>NHR.z1;z-=16){L.push([nhPrX(z)-4.6,z]);L.push([nhPrX(z-8)+4.6,z-8]);L.push([NHR.lad-6.4,z]);L.push([NHR.lad+6.4,z-8])}for(let x=NH.x0+8;x<-276;x+=18){L.push([x,NHR.gate-6.4]);L.push([x+9,NHR.gate+6.4])}for(let x=NH.x0+8;x<NHR.pem;x+=18)L.push([x,NHR.west+5.4]);lampFlush(L,G);for(const l of L)lampList.push(l);
    const sign=(t,b,x,z,ry)=>{const m=new THREE.Mesh(new THREE.PlaneGeometry(2.4,.6),new THREE.MeshStandardMaterial({map:nhSignTex(t,b),roughness:.6,side:THREE.DoubleSide}));m.position.set(x,2.8,z);m.rotation.y=ry;G.add(m)};
    sign('PORTOBELLO ROAD','W11',nhPrX(NHR.gate-7)-5.35,NHR.gate-7,Math.PI/2);sign('PORTOBELLO ROAD','W11',nhPrX(NHR.west+6)+5.35,NHR.west+6,-Math.PI/2);sign('CHEPSTOW VILLAS','W11',NHR.lad+12,NHR.chep-5.4,0);sign('LADBROKE GROVE','W11',NHR.lad+5.6,NHR.gate-8,-Math.PI/2);sign('WESTBOURNE GROVE','W2',NHR.lad+14,NHR.west+5.4,0);sign('NOTTING HILL GATE','W11',-420,NHR.gate+6.2,Math.PI)}
  nhPub(G);NZ.mapP.push([NH_PUB.x,NH_PUB.z]);G.traverse(o=>{if(o.isInstancedMesh)o.frustumCulled=false})}

/* ---------- the ruined pub: part of the terrace, reached by a side alley the Crown cannot see ---------- */
function nhBrick(w,h,col){const t=NH.brickT||(NH.brickT=new THREE.CanvasTexture(mkCanvas(128,128,x=>{x.fillStyle='#6a3a2a';x.fillRect(0,0,128,128);for(let r=0;r<16;r++)for(let c=0;c<8;c++){const v=(Math.random()*40)|0;x.fillStyle=`rgb(${110+v},${58+v*.6|0},${42+v*.4|0})`;x.fillRect(c*16+(r%2)*8+1,r*8+1,14,6)}x.fillStyle='rgba(0,0,0,.25)';for(let k=0;k<30;k++)x.fillRect(Math.random()*128,Math.random()*128,10,4)})));
  const m=t.clone();m.needsUpdate=true;m.wrapS=m.wrapT=THREE.RepeatWrapping;m.repeat.set(Math.max(1,w/2.2),Math.max(1,h/1.1));return std({map:m,color:col||0xffffff,roughness:.92})}
function nhPub(G){const g=NH.pubG=new THREE.Group();G.add(g);const fx=NH_PUB.fx,z0=NH_PUB.z-6,z1=NH_PUB.z+6,bx0=fx-12,cx=fx-6,cz=NH_PUB.z,ff=fx-.2;const W=[];NH.lamps=[];NH.pl=[];NH.litM=[];NH.lit=0;
  const cv=(w,h,f)=>{const t=new THREE.CanvasTexture(mkCanvas(w,h,f));t.anisotropy=8;return t};
  const wood=std({color:0x2a1810,roughness:.55,metalness:.05}),dark=std({color:0x140c08,roughness:.6}),brass=std({color:0xc89a48,roughness:.28,metalness:.9}),iron=std({color:0x121214,roughness:.5,metalness:.6});
  const oxb=std({color:0x3a0c12,roughness:.45,metalness:.05}),gold=std({color:0xd8b060,roughness:.3,metalness:.85,emissive:0x2a1a04});
  const panelT=cv(128,64,x=>{x.fillStyle='#2a1810';x.fillRect(0,0,128,64);for(let i=0;i<4;i++){const X=i*32+3;x.fillStyle='#22130c';x.fillRect(X,6,26,52);x.strokeStyle='#3e2618';x.lineWidth=2;x.strokeRect(X+3,9,20,46);x.strokeStyle='rgba(0,0,0,.5)';x.strokeRect(X+5,11,16,42);x.fillStyle='rgba(255,210,150,.06)';x.fillRect(X+4,10,3,44)}x.fillStyle='#1a0e08';x.fillRect(0,0,128,4);x.fillRect(0,60,128,4)});panelT.wrapS=THREE.RepeatWrapping;
  const plasterT=cv(256,128,x=>{x.fillStyle='#a8908c';x.fillRect(0,0,256,128);for(let k=0;k<900;k++){const r=Math.random();x.fillStyle=r<.33?'rgba(150,110,120,.18)':r<.66?'rgba(90,80,78,.16)':'rgba(220,200,190,.12)';x.beginPath();x.arc(Math.random()*256,Math.random()*128,2+Math.random()*14,0,TAU);x.fill()}for(let k=0;k<30;k++){x.strokeStyle='rgba(60,40,40,.25)';x.lineWidth=.6;x.beginPath();let X=Math.random()*256,Y=Math.random()*128;x.moveTo(X,Y);for(let s=0;s<6;s++){X+=rand(-12,12);Y+=rand(-8,8);x.lineTo(X,Y)}x.stroke()}});plasterT.wrapS=plasterT.wrapT=THREE.RepeatWrapping;
  const wall=(w,h,d,x,y,z,col)=>{const m=c2box(g,w,h,d,x,y,z,nhBrick(Math.max(w,d),h,col),false);W.push([x-w/2,x+w/2,z-d/2,z+d/2,y+h]);return m};
  /* ---------------- shell: party walls, back, upper floors ---------------- */
  wall(12,12.5,.4,cx,0,z0+.2,0xc8b8a8);wall(12,12.5,.4,cx,0,z1-.2,0xc8b8a8);wall(.4,12.5,12,bx0+.2,0,cz);
  c2box(g,12,.3,12,cx,4.2,cz,std({color:0x2a2420,roughness:.9}),false);
  /* ---------------- street front: a proper Victorian pub ---------------- */
  const front=nhBrick(12,8.3);{const m=c2box(g,.4,8.3,12,ff,4.2,cz,front,false);void m}
  for(const z of[z0+.3,cz-1.15,cz+1.15,z1-.3]){c2box(g,.55,4.2,.5,ff+.12,0,z,oxb,false);c2box(g,.7,.22,.62,ff+.16,3.98,z,gold,false);c2box(g,.66,.3,.6,ff+.14,0,z,dark,false)}
  c2box(g,.5,.6,12,ff+.08,0,cz,std({color:0x14100c,roughness:.6}),false);
  const etch=cv(256,256,x=>{const gr=x.createLinearGradient(0,0,0,256);gr.addColorStop(0,'#ffe8b8');gr.addColorStop(1,'#e8a858');x.fillStyle=gr;x.fillRect(0,0,256,256);x.fillStyle='rgba(255,255,255,.35)';x.fillRect(0,128,256,128);
    x.strokeStyle='rgba(120,70,30,.55)';x.lineWidth=2;for(let i=0;i<6;i++){x.beginPath();x.arc(128,190,30+i*14,Math.PI,0);x.stroke()}x.lineWidth=1.4;for(let i=0;i<16;i++){const a=Math.PI+i/15*Math.PI;x.beginPath();x.moveTo(128,190);x.lineTo(128+Math.cos(a)*110,190+Math.sin(a)*110);x.stroke()}
    x.fillStyle='rgba(110,60,20,.8)';x.font='bold 20px Georgia,serif';x.textAlign='center';x.fillText('ALES · WINES · SPIRITS',128,240);x.strokeStyle='#3a2410';x.lineWidth=5;for(const X of[0,85,170,255])x.strokeRect(X-1,0,2,124);x.strokeRect(0,124,256,4)});
  for(const[za,zb]of[[z0+.55,cz-1.4],[cz+1.4,z1-.55]]){const L=zb-za,zm=(za+zb)/2;const gm=new THREE.MeshStandardMaterial({map:etch,emissive:0xffb060,emissiveMap:etch,emissiveIntensity:.25,roughness:.15,metalness:.1});NH.litM.push([gm,.25,1.15]);
    const p=new THREE.Mesh(new THREE.PlaneGeometry(L,2.7),gm);p.position.set(ff+.21,2,zm);p.rotation.y=Math.PI/2;g.add(p);c2box(g,.12,.12,L,ff+.24,3.38,zm,oxb,false);c2box(g,.18,.14,L,ff+.26,.6,zm,oxb,false)}
  {const sg=cv(512,64,x=>{const gr=x.createLinearGradient(0,0,0,64);gr.addColorStop(0,'#4a0e16');gr.addColorStop(1,'#2a060c');x.fillStyle=gr;x.fillRect(0,0,512,64);x.strokeStyle='#d8b060';x.lineWidth=3;x.strokeRect(5,5,502,54);x.strokeRect(11,11,490,42);
      x.font='bold 34px Georgia,serif';x.textAlign='center';x.fillStyle='#000';x.fillText('THE  LAST  LANTERN',258,46);const tg=x.createLinearGradient(0,18,0,50);tg.addColorStop(0,'#fff2c0');tg.addColorStop(1,'#c8902c');x.fillStyle=tg;x.fillText('THE  LAST  LANTERN',256,44)});
    const s=new THREE.Mesh(new THREE.BoxGeometry(.3,.85,11.2),[oxb,oxb,oxb,oxb,new THREE.MeshStandardMaterial({map:sg,roughness:.35,metalness:.2,emissive:0x302008,emissiveMap:sg,emissiveIntensity:.35}),oxb]);s.position.set(ff+.38,3.95+.4,cz);s.rotation.y=-Math.PI/2;
    s.material=[oxb,oxb,oxb,oxb,oxb,oxb];const face=new THREE.Mesh(new THREE.PlaneGeometry(11.2,.85),new THREE.MeshStandardMaterial({map:sg,roughness:.35,metalness:.2,emissive:0xffffff,emissiveMap:sg,emissiveIntensity:.3}));face.position.set(ff+.54,4.35,cz);face.rotation.y=Math.PI/2;g.add(face);NH.litM.push([face.material,.3,.7]);
    c2box(g,.34,.85,11.2,ff+.36,3.92,cz,oxb,false);c2box(g,.5,.1,11.6,ff+.42,4.8,cz,gold,false);c2box(g,.46,.08,11.6,ff+.4,3.9,cz,gold,false)}
  /* the door: deep green, brass, a fanlight that glows */
  {const hinge=new THREE.Group();hinge.position.set(ff+.12,0,cz-.9);g.add(hinge);const dm=std({color:0x0e2c1e,roughness:.4,metalness:.05});const d=new THREE.Mesh(new THREE.BoxGeometry(.09,2.75,1.8),dm);d.position.set(0,1.375,.9);hinge.add(d);
    for(const[y,h]of[[.25,.9],[1.3,1.25]]){const pn=new THREE.Mesh(new THREE.BoxGeometry(.03,h,1.3),std({color:0x0a2016,roughness:.5}));pn.position.set(.06,y+h/2,.9);hinge.add(pn)}
    const gl=new THREE.MeshStandardMaterial({color:0x332211,emissive:0xffc070,emissiveIntensity:.4,roughness:.1});NH.litM.push([gl,.4,1.4]);const pane=new THREE.Mesh(new THREE.PlaneGeometry(1.1,.8),gl);pane.position.set(.08,1.95,.9);pane.rotation.y=Math.PI/2;hinge.add(pane);
    const kn=new THREE.Mesh(new THREE.SphereGeometry(.06,10,8),brass);kn.position.set(.11,1.25,1.55);hinge.add(kn);const pl=new THREE.Mesh(new THREE.BoxGeometry(.02,.32,.12),brass);pl.position.set(.08,1.25,1.55);hinge.add(pl);
    NH.door=hinge;const fan=cv(128,64,x=>{x.fillStyle='#ffd890';x.fillRect(0,0,128,64);x.strokeStyle='#3a2410';x.lineWidth=3;x.beginPath();x.arc(64,64,58,Math.PI,0);x.stroke();for(let i=0;i<9;i++){const a=Math.PI+i/8*Math.PI;x.beginPath();x.moveTo(64,64);x.lineTo(64+Math.cos(a)*58,64+Math.sin(a)*58);x.stroke()}x.fillStyle='#5a3010';x.font='bold 13px Georgia,serif';x.textAlign='center';x.fillText('No. 13',64,58)});
    const fm=new THREE.MeshStandardMaterial({map:fan,emissive:0xffffff,emissiveMap:fan,emissiveIntensity:.35,roughness:.2});NH.litM.push([fm,.35,1.3]);NH.fanM=fm;const f=new THREE.Mesh(new THREE.PlaneGeometry(1.8,.62),fm);f.position.set(ff+.22,3.06,cz);f.rotation.y=Math.PI/2;g.add(f);
    c2box(g,.3,.12,2.1,ff+.2,2.76,cz,oxb,false);c2box(g,1.2,.16,2.4,ff+.7,0,cz,std({color:0x6a6460,roughness:.9}),false);
    NH.doorBox={x0:ff-.3,x1:ff+.3,z0:cz-.95,z1:cz+.95,h:3,nz:1};NH.leak=glowSprite(0xffb050,3.2,0);NH.leak.position.set(ff+.6,1.4,cz);g.add(NH.leak)}
  for(const z of[cz-1.6,cz+1.6]){const b=c2box(g,.5,.05,.05,ff+.35,3.05,z,iron,false);void b;const l=new THREE.Mesh(new THREE.CylinderGeometry(.13,.16,.42,6,1,true),std({color:0x101012,metalness:.7,roughness:.4,side:THREE.DoubleSide}));l.position.set(ff+.6,2.85,z);g.add(l);const s=glowSprite(0xffc070,1.4,.9);s.position.copy(l.position);g.add(s)}
  /* upper floors: stone-dressed sash windows, string course, cornice and a balustrade */
  const sashT=cv(64,128,x=>{x.fillStyle='#1a1c24';x.fillRect(0,0,64,128);x.fillStyle='#2e3240';x.fillRect(4,4,56,58);x.fillRect(4,66,56,58);x.fillStyle='#f0ece4';x.fillRect(0,0,64,4);x.fillRect(0,62,64,4);x.fillRect(0,124,64,4);x.fillRect(0,0,4,128);x.fillRect(60,0,4,128);x.fillRect(30,0,4,128);x.fillStyle='rgba(255,200,120,.18)';x.fillRect(4,66,26,58)});
  const sm=new THREE.MeshStandardMaterial({map:sashT,roughness:.3,emissive:0xffa050,emissiveMap:sashT,emissiveIntensity:.15});
  for(const y of[5.6,8.8])for(const z of[cz-3.6,cz,cz+3.6]){const p=new THREE.Mesh(new THREE.PlaneGeometry(1.3,2.2),sm);p.position.set(ff+.21,y+1.1,z);p.rotation.y=Math.PI/2;g.add(p);c2box(g,.25,.18,1.7,ff+.25,y-.12,z,std({color:0xe8e2d6,roughness:.8}),false);c2box(g,.12,.3,1.6,ff+.24,y+2.25,z,std({color:0xe8e2d6,roughness:.8}),false)}
  c2box(g,.45,.22,12.2,ff+.2,5.15,cz,std({color:0xe8e2d6,roughness:.8}),false);c2box(g,.7,.4,12.4,ff+.25,12.1,cz,std({color:0xe8e2d6,roughness:.8}),false);
  for(let z=z0+.5;z<z1-.3;z+=.55)c2box(g,.12,.6,.12,ff+.3,12.5,z,std({color:0xe8e2d6,roughness:.8}),false);c2box(g,.25,.12,12,ff+.3,13.1,cz,std({color:0xe8e2d6,roughness:.8}),false);
  c2box(g,1.2,2.2,1.6,bx0+2,12.5,z0+1.2,nhBrick(1.6,2.2),false);
  {const hs=cv(96,96,x=>{x.fillStyle='#1c2a22';x.fillRect(0,0,96,96);x.strokeStyle='#c8a050';x.lineWidth=4;x.strokeRect(4,4,88,88);x.fillStyle='#ffd070';x.beginPath();x.arc(48,46,13,0,TAU);x.fill();x.fillStyle='#3a2a18';x.fillRect(42,28,12,4);x.fillRect(42,60,12,4)});
    const hm=new THREE.Mesh(new THREE.PlaneGeometry(1.1,1.1),new THREE.MeshStandardMaterial({map:hs,roughness:.7,side:THREE.DoubleSide,emissive:0x1a1206}));hm.position.set(ff+1.15,5.9,z1-.6);g.add(hm);c2box(g,1.5,.07,.07,ff+.75,6.55,z1-.6,iron,false);NH.sign=hm}
  /* ---------------- interior, after the photo: carved bar, globes, lanterns, stained glass ---------------- */
  const IX0=bx0+.4,IX1=ff-.2,IZ0=z0+.4,IZ1=z1-.4,IW=IX1-IX0,ID=IZ1-IZ0,IXc=(IX0+IX1)/2;
  const floorT=cv(256,256,x=>{const C=['#5a3e28','#6a4a30','#4e3422','#7a5838','#5e4a3a','#6e6450'];for(let r=0;r<16;r++){let X=-Math.random()*80;while(X<256){const L=60+Math.random()*90;x.fillStyle=C[(Math.random()*C.length)|0];x.fillRect(X,r*16,L,15);x.fillStyle='rgba(0,0,0,.45)';x.fillRect(X+L-1,r*16,1.5,15);
      for(let k=0;k<6;k++){x.fillStyle='rgba(255,230,190,.07)';x.fillRect(X+Math.random()*L,r*16+Math.random()*15,10+Math.random()*30,1)}X+=L}x.fillStyle='rgba(0,0,0,.5)';x.fillRect(0,r*16+15,256,1)}
    for(let k=0;k<26;k++){x.fillStyle=`rgba(${120+Math.random()*60|0},${140+Math.random()*50|0},${120+Math.random()*40|0},.16)`;x.beginPath();x.ellipse(Math.random()*256,Math.random()*256,10+Math.random()*30,4+Math.random()*10,0,0,TAU);x.fill()}});floorT.wrapS=floorT.wrapT=THREE.RepeatWrapping;floorT.repeat.set(2.2,2.2);
  c2plane(g,IW,ID,IXc,.04,cz,std({color:0x9a8270,roughness:.6,map:floorT}));
  {const c=new THREE.Mesh(new THREE.PlaneGeometry(IW,ID),std({color:0x9a8a84,roughness:.95,map:plasterT}));c.rotation.x=Math.PI/2;c.position.set(IXc,4.18,cz);g.add(c)}
  const finish=(len,x,z,ry)=>{const pt=panelT.clone();pt.needsUpdate=true;pt.repeat.set(len/1.6,1);const p=new THREE.Mesh(new THREE.PlaneGeometry(len,1.35),std({map:pt,roughness:.55,color:0xffffff}));p.position.set(x,.68,z);p.rotation.y=ry;g.add(p);
    const pl=plasterT.clone();pl.needsUpdate=true;pl.repeat.set(len/4,1);const q=new THREE.Mesh(new THREE.PlaneGeometry(len,2.85),std({map:pl,roughness:.95,color:0xa89494}));q.position.set(x,2.78,z);q.rotation.y=ry;g.add(q);
    const rail=new THREE.Mesh(new THREE.BoxGeometry(len,.08,.08),wood);rail.position.set(x,1.38,z);rail.rotation.y=ry;g.add(rail);const cor=new THREE.Mesh(new THREE.BoxGeometry(len,.22,.16),std({color:0xd8c8b8,roughness:.9}));cor.position.set(x,4.06,z);cor.rotation.y=ry;g.add(cor)};
  finish(IW,IXc,IZ0+.02,0);finish(ID,IX0+.02,cz,Math.PI/2);finish(IW,IXc,IZ1-.005,Math.PI);{const p=new THREE.Mesh(new THREE.PlaneGeometry(.1,.1),wood);void p}
  /* inside face of the front, wood panelled around the windows */
  {const pm=std({color:0x24140c,roughness:.6,map:panelT});for(const[za,zb,y0,y1]of[[IZ0,cz-.95,0,4.1],[cz+.95,IZ1,0,4.1],[cz-.95,cz+.95,2.8,4.1]]){const p=new THREE.Mesh(new THREE.PlaneGeometry(zb-za,y1-y0),pm);p.position.set(IX1-.02,(y0+y1)/2,(za+zb)/2);p.rotation.y=-Math.PI/2;g.add(p)}
    for(const[za,zb]of[[z0+.55,cz-1.4],[cz+1.4,z1-.55]]){const gm=new THREE.MeshStandardMaterial({map:etch,emissive:0xffb060,emissiveMap:etch,emissiveIntensity:.3,roughness:.15,side:THREE.DoubleSide});NH.litM.push([gm,.12,.32]);const q=new THREE.Mesh(new THREE.PlaneGeometry(zb-za,2.7),gm);q.position.set(IX1-.04,2,(za+zb)/2);q.rotation.y=-Math.PI/2;g.add(q)}}
  /* north wall: wood screen with stained glass, after the photo */
  {const sgT=cv(256,384,x=>{x.fillStyle='#3a1810';x.fillRect(0,0,256,384);const ar=(X,Y,w,h)=>{x.save();x.beginPath();x.moveTo(X,Y+h);x.lineTo(X,Y+w/2);x.arc(X+w/2,Y+w/2,w/2,Math.PI,0);x.lineTo(X+w,Y+h);x.closePath();x.clip();
        const gr=x.createLinearGradient(0,Y,0,Y+h);gr.addColorStop(0,'#fff6dc');gr.addColorStop(1,'#f0dcb0');x.fillStyle=gr;x.fillRect(X,Y,w,h);x.strokeStyle='rgba(140,90,40,.6)';x.lineWidth=1.2;for(let i=0;i<5;i++){x.beginPath();x.arc(X+w/2,Y+h*.62,8+i*9,0,TAU);x.stroke()}
        const J=['#c81e3a','#2a5ac8','#e8a020','#3aa050','#8a30c0'];for(let k=0;k<14;k++){const a=k/14*TAU;x.fillStyle=J[k%5];x.beginPath();x.arc(X+w/2+Math.cos(a)*(w*.42),Y+h*.62+Math.sin(a)*(w*.42),3.4,0,TAU);x.fill()}
        x.fillStyle='#e8a020';x.beginPath();for(let k=0;k<8;k++){const a=k/8*TAU,r=k%2?5:14;x.lineTo(X+w/2+Math.cos(a)*r,Y+w/2+Math.sin(a)*r)}x.fill();x.restore();x.strokeStyle='#2a1208';x.lineWidth=5;x.beginPath();x.moveTo(X,Y+h);x.lineTo(X,Y+w/2);x.arc(X+w/2,Y+w/2,w/2,Math.PI,0);x.lineTo(X+w,Y+h);x.stroke()};
      ar(12,40,70,300);ar(93,40,70,300);ar(174,40,70,300);for(let i=0;i<3;i++){const X=12+i*81;const J=['#c81e3a','#2a5ac8','#e8a020'];x.fillStyle='#f4e8c8';x.fillRect(X,8,70,26);x.fillStyle=J[i];x.fillRect(X+28,14,14,14);x.strokeStyle='#2a1208';x.lineWidth=3;x.strokeRect(X,8,70,26)}});
    const sm2=new THREE.MeshStandardMaterial({map:sgT,emissive:0xffffff,emissiveMap:sgT,emissiveIntensity:.25,roughness:.25});NH.litM.push([sm2,.12,.42]);NH.sgM=sm2;
    for(const x0 of[IX0+.6,IX0+4.6]){const p=new THREE.Mesh(new THREE.PlaneGeometry(3.6,2.7),sm2);p.position.set(x0+1.8,2.55,IZ1-.03);p.rotation.y=Math.PI;g.add(p)}
    const scr=new THREE.Mesh(new THREE.PlaneGeometry(IW,1.2),std({color:0x24140c,roughness:.6,map:panelT}));scr.position.set(IXc,.6,IZ1-.02);scr.rotation.y=Math.PI;g.add(scr);c2box(g,IW,.12,.12,IXc,1.2,IZ1-.06,wood,false);c2box(g,IW,.14,.14,IXc,3.9,IZ1-.07,wood,false);
    for(const x of[IX0+.5,IX0+4.4,IX0+8.4])c2box(g,.18,4.1,.16,x,0,IZ1-.08,wood,false);const dd=new THREE.Mesh(new THREE.PlaneGeometry(1.2,2.4),std({color:0x1e0e08,roughness:.5}));dd.position.set(IX0+9.6,1.2,IZ1-.03);dd.rotation.y=Math.PI;g.add(dd);
    const dg=new THREE.Mesh(new THREE.PlaneGeometry(.8,1),sm2);dg.position.set(IX0+9.6,1.75,IZ1-.04);dg.rotation.y=Math.PI;g.add(dg)}
  /* the bar: carved front, polished top, brass taps, red lamps; back bar with bottles and a mirror */
  const BZ=IZ0+2.1,BX0=IX0+3.2,BX1=IX1-1.2,BL=BX1-BX0,BXc=(BX0+BX1)/2;
  {const ft=panelT.clone();ft.needsUpdate=true;ft.repeat.set(BL/1.2,1);const fm=std({map:ft,roughness:.45,color:0xffffff});const b=new THREE.Mesh(new THREE.BoxGeometry(BL,1.1,.75),[std({color:0x1e1008,roughness:.5}),std({color:0x1e1008}),dark,dark,fm,fm]);b.position.set(BXc,.55,BZ);g.add(b);
    const rd=new THREE.Mesh(new THREE.CylinderGeometry(.375,.375,1.1,20,1,false,Math.PI,Math.PI),fm);rd.position.set(BX0,.55,BZ);rd.rotation.y=Math.PI/2;g.add(rd);
    const top=std({color:0x1a0c06,roughness:.18,metalness:.15});c2box(g,BL+.3,.08,1.0,BXc,1.1,BZ,top,false);const tr=new THREE.Mesh(new THREE.CylinderGeometry(.5,.5,.08,22,1,false,Math.PI,Math.PI),top);tr.position.set(BX0-.15,1.14,BZ);tr.rotation.y=Math.PI/2;g.add(tr);
    c2box(g,BL,.06,.06,BXc,.12,BZ+.42,brass,false);W.push([BX0-.6,BX1+.2,BZ-.5,BZ+.5,1.2]);
    for(let i=0;i<7;i++){const x=BX0+1+i*.42;nzCyl(g,.03,.035,.42,x,1.14,BZ-.18,brass,8);const h=new THREE.Mesh(new THREE.CylinderGeometry(.022,.03,.22,6),std({color:[0x8a1a20,0x1a4a8a,0xe8e0d0,0x2a6a2a][i%4],roughness:.4}));h.position.set(x,1.67,BZ-.2);h.rotation.x=-.25;g.add(h)}
    for(const x of[BX0+.2,BX0+3.6,BX1-.4]){nzCyl(g,.06,.09,.32,x,1.14,BZ+.15,brass,10);const sh=new THREE.Mesh(new THREE.CylinderGeometry(.11,.22,.24,14,1,true),new THREE.MeshStandardMaterial({color:0xc01020,emissive:0xff2030,emissiveIntensity:.15,side:THREE.DoubleSide,roughness:.6}));sh.position.set(x,1.58,BZ+.15);g.add(sh);NH.litM.push([sh.material,.05,.9]);const s=glowSprite(0xff5040,.9,0);s.position.set(x,1.5,BZ+.15);g.add(s);NH.lamps.push({s,o:.75,d:.4+NH.lamps.length*.05})}
    const bb=IZ0+.35;c2box(g,BL+1,1,.6,BXc,0,bb,wood,false);c2box(g,BL+1,.06,.65,BXc,1,bb,top,false);W.push([BX0-.6,BX1+.6,IZ0,bb+.35,3.6]);
    const mir=new THREE.Mesh(new THREE.PlaneGeometry(BL*.8,1.3),std({color:0x3a4250,roughness:.1,metalness:.9}));mir.position.set(BXc,2.05,IZ0+.06);g.add(mir);
    for(const y of[1.55,2.15,2.75])c2box(g,BL+.8,.05,.32,BXc,y,IZ0+.2,wood,false);for(const x of[BX0-.4,BXc-BL*.2,BXc+BL*.2,BX1+.4])c2box(g,.14,2.6,.34,x,1,IZ0+.2,wood,false);
    c2box(g,BL+1.1,.35,.4,BXc,3.4,IZ0+.22,wood,false);{const tt=cv(256,32,x=>{x.fillStyle='#1a0c06';x.fillRect(0,0,256,32);x.fillStyle='#d8b060';x.font='bold 18px Georgia,serif';x.textAlign='center';x.fillText('THE  LANTERN  BAR',128,23)});const p=new THREE.Mesh(new THREE.PlaneGeometry(4,.5),new THREE.MeshStandardMaterial({map:tt,emissive:0xffffff,emissiveMap:tt,emissiveIntensity:.2,metalness:.4,roughness:.3}));p.position.set(BXc,3.58,IZ0+.43);g.add(p);NH.litM.push([p.material,.1,.6])}
    const B=[];for(const y of[1.58,2.18,2.78])for(let k=0;k<Math.floor(BL/.16);k++){if(Math.random()<.15)continue;B.push([BX0-.2+k*.16+rand(-.02,.02),y,IZ0+.2,[0x2a8040,0xd8d0c0,0xb06020,0x1a4a30,0x8a2030,0xe8e4d8][(Math.random()*6)|0],rand(.8,1.2)])}
    CITY_PARENT=g;const im=instanced(new THREE.CylinderGeometry(.045,.055,.3,7),new THREE.MeshStandardMaterial({color:0xffffff,roughness:.12,metalness:.1,transparent:true,opacity:.9,emissive:0x221408}),B,(o,b)=>{o.position.set(b[0],b[1]+.15*b[4],b[2]);o.scale.set(1,b[4],1)});const c=new THREE.Color();B.forEach((b,i)=>im.setColorAt(i,c.setHex(b[3])));im.instanceColor.needsUpdate=true;CITY_PARENT=null}
  /* tufted blue leather stools */
  {const blue=std({color:0x1a3658,roughness:.42,metalness:.05}),bt=cv(64,64,x=>{x.fillStyle='#1a3658';x.fillRect(0,0,64,64);for(let i=0;i<4;i++)for(let j=0;j<4;j++){const X=8+i*16+(j%2)*8,Y=8+j*16;const gr=x.createRadialGradient(X,Y,0,X,Y,8);gr.addColorStop(0,'#0a1424');gr.addColorStop(1,'rgba(40,80,130,0)');x.fillStyle=gr;x.fillRect(X-8,Y-8,16,16)}});
    const tuft=std({map:bt,roughness:.4});for(let i=0;i<4;i++){const x=BX0+.6+i*1.15,z=BZ+.85;nzCyl(g,.25,.23,.14,x,.72,z,blue,16);const bk=new THREE.Mesh(new THREE.CylinderGeometry(.27,.27,.55,16,1,true,-.9,1.8),tuft);bk.material.side=THREE.DoubleSide;bk.position.set(x,1.12,z+.02);bk.rotation.y=0;g.add(bk);for(const[a,b]of[[-1,-1],[1,-1],[-1,1],[1,1]]){const l=new THREE.Mesh(new THREE.CylinderGeometry(.025,.03,.72,5),wood);l.position.set(x+a*.15,.36,z+b*.15);l.rotation.set(b*.08,0,-a*.08);g.add(l)}c2box(g,.34,.03,.03,x,.28,z-.15,brass,false)}}
  /* tables and slat-back chairs, blue velvet tub chairs by the window, Alfred's red armchair by the fire */
  const table=(x,z,s)=>{c2box(g,s,.06,s,x,.76,z,std({color:0x4a2a16,roughness:.35}),false);nzCyl(g,.07,.12,.76,x,0,z,iron,8);nzCyl(g,.03,.03,.1,x+.15,.82,z,std({color:0xe8e8f0,metalness:.6,roughness:.2}),8);nzCyl(g,.03,.03,.1,x-.1,.82,z+.1,std({color:0xe8e8f0,metalness:.6,roughness:.2}),8);W.push([x-s/2,x+s/2,z-s/2,z+s/2,.8])};
  const chair=(x,z,ry)=>{const c=new THREE.Group();c.position.set(x,0,z);c.rotation.y=ry;g.add(c);const seat=new THREE.Mesh(new THREE.BoxGeometry(.46,.06,.44),std({color:0x8a1a24,roughness:.7}));seat.position.y=.46;c.add(seat);
    for(const[a,b]of[[-.2,-.19],[.2,-.19],[-.2,.19],[.2,.19]]){const l=new THREE.Mesh(new THREE.BoxGeometry(.04,.46,.04),wood);l.position.set(a,.23,b);c.add(l)}for(const a of[-.2,.2]){const p=new THREE.Mesh(new THREE.BoxGeometry(.04,.62,.04),wood);p.position.set(a,.8,-.2);c.add(p)}
    for(const a of[-.1,0,.1]){const s=new THREE.Mesh(new THREE.BoxGeometry(.035,.5,.025),wood);s.position.set(a,.82,-.2);c.add(s)}const t=new THREE.Mesh(new THREE.BoxGeometry(.46,.06,.04),wood);t.position.set(0,1.1,-.2);c.add(t)};
  for(const[x,z]of[[IX0+2.2,IZ1-1.4],[IX0+5.6,IZ1-1.3]]){table(x,z,.95);chair(x-.8,z,Math.PI/2);chair(x+.8,z,-Math.PI/2);chair(x,z-.85,0)}
  {const vel=std({color:0x1e3a54,roughness:.9}),vt=std({color:0x16304a,roughness:.95});for(const[x,z,ry]of[[IX1-1,IZ1-1.2,-2.2],[IX1-1,IZ1-3,-1]]){const c=new THREE.Group();c.position.set(x,0,z);c.rotation.y=ry;g.add(c);const b=new THREE.Mesh(new THREE.CylinderGeometry(.42,.38,.42,18),vel);b.position.y=.3;c.add(b);
      const bk=new THREE.Mesh(new THREE.CylinderGeometry(.45,.43,.42,18,1,true,-1.8,3.6),vt);bk.material.side=THREE.DoubleSide;bk.position.y=.72;c.add(bk);for(const a of[-1,1]){const l=new THREE.Mesh(new THREE.CylinderGeometry(.03,.02,.12,5),wood);l.position.set(a*.25,.06,.2);c.add(l)}}
    nzCyl(g,.4,.4,.05,IX1-1.4,.7,IZ1-2.1,std({color:0x2a2a2e,roughness:.4,metalness:.2}),18);nzCyl(g,.06,.1,.7,IX1-1.4,0,IZ1-2.1,iron,8);W.push([IX1-1.8,IX1-1,IZ1-2.5,IZ1-1.7,.75])}
  /* fireplace with a mantel mirror, Alfred's corner */
  {const fz=cz-1.2;c2box(g,.7,1.6,2.4,bx0+.75,0,fz,nhBrick(2.4,1.6,0x9a8070),false);c2box(g,.5,1,1.6,bx0+.85,0,fz,std({color:0x0c0806,roughness:1}),false);c2box(g,.9,.18,2.8,bx0+.8,1.6,fz,wood,false);
    const mm=new THREE.Mesh(new THREE.PlaneGeometry(1.8,1.1),std({color:0x3a4048,roughness:.12,metalness:.9}));mm.position.set(bx0+.43,2.5,fz);mm.rotation.y=Math.PI/2;g.add(mm);c2box(g,.08,1.3,2,bx0+.42,1.95,fz,gold,false);
    const em=nzGlow(g,0xff7020,2.4,.9,bx0+1.05,.4,fz);NH.fire={em,p:V3(bx0+1.1,.3,fz)};W.push([bx0+.4,bx0+1.2,fz-1.2,fz+1.2,1.8])}
  const tx=cx-2.2,tz=cz-1.4;nzCyl(g,.7,.7,.08,tx,.78,tz,std({color:0x3a2010,roughness:.3}),18);nzCyl(g,.08,.12,.78,tx,0,tz,iron,8);for(let k=0;k<3;k++){const px=tx+rand(-.3,.3),pz=tz+rand(-.3,.3);nzCyl(g,.035,.035,.14,px,.86,pz,std({color:0xf0e8d0}),6);nzGlow(g,0xffc070,.55,.9,px,1.06,pz)}
  {const ch=std({color:0x6a1420,roughness:.85});const ax=tx-1.25;c2box(g,.85,.45,.85,ax,0,tz,ch,false);c2box(g,.2,.95,.85,ax-.38,.45,tz,ch,false);for(const s of[-1,1])c2box(g,.85,.35,.15,ax,.45,tz+s*.38,ch,false);NH.seat=V3(ax+.05,.3,tz)}
  /* globe pendants over the bar and iron lantern chandeliers */
  {const gm=()=>new THREE.MeshStandardMaterial({color:0xfff4e0,emissive:0xffd8a0,emissiveIntensity:.05,roughness:.3,transparent:true,opacity:.95});for(let i=0;i<5;i++){const x=BX0+.5+i*(BL-1)/4,z=BZ+.05,y=2.45+(i%2)*.18;const m=gm();const s=new THREE.Mesh(new THREE.SphereGeometry(.24,18,14),m);s.position.set(x,y,z);g.add(s);
      const band=new THREE.Mesh(new THREE.TorusGeometry(.245,.012,6,24),brass);band.position.set(x,y,z);band.rotation.y=Math.PI/2;g.add(band);const cord=new THREE.Mesh(new THREE.CylinderGeometry(.008,.008,4.18-y-.24,4),iron);cord.position.set(x,(4.18+y+.24)/2,z);g.add(cord);
      const gl=glowSprite(0xffd090,1.8,0);gl.position.set(x,y,z);g.add(gl);NH.lamps.push({s:gl,m,o:.9,d:.9+i*.32,e:1.8})}
    for(const[x,z,d]of[[IX0+2.4,cz+1.6,2.6],[IX0+6.4,cz+2.6,3.2]]){const cg=new THREE.Group();cg.position.set(x,3.1,z);g.add(cg);const fr=new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.CylinderGeometry(.42,.5,.8,6)),new THREE.LineBasicMaterial({color:0x0a0a0a}));cg.add(fr);
      const tp=new THREE.Mesh(new THREE.ConeGeometry(.46,.3,6),iron);tp.position.y=.55;cg.add(tp);const ch=new THREE.Mesh(new THREE.CylinderGeometry(.01,.01,.75,4),iron);ch.position.y=1.05;cg.add(ch);
      for(let k=0;k<5;k++){const a=k/5*TAU;const cnd=new THREE.Mesh(new THREE.CylinderGeometry(.025,.025,.14,6),std({color:0xf4ecd8}));cnd.position.set(Math.cos(a)*.25,-.15,Math.sin(a)*.25);cg.add(cnd);const f=glowSprite(0xffc070,.35,0);f.position.set(Math.cos(a)*.25,-.02,Math.sin(a)*.25);cg.add(f);NH.lamps.push({s:f,o:.95,d:d+k*.06})}
      const big=glowSprite(0xffb060,2.6,0);cg.add(big);NH.lamps.push({s:big,o:.55,d:d+.3});NH.chand=(NH.chand||[]).concat([cg])}
    for(const[x,y,z,c,i,dist]of[[BXc,2.3,BZ+.3,0xffc890,2.6,11],[IX0+3,2.9,cz+1.8,0xffb070,2,12],[bx0+1.4,1.2,cz-1.2,0xff7a30,1.2,8]]){const pl=new THREE.PointLight(c,0,dist,2);pl.position.set(x,y,z);g.add(pl);NH.pl.push([pl,i])}}
  for(const w of W)NH.pubBoxes=(NH.pubBoxes||[]).concat([{x0:w[0],x1:w[1],z0:w[2],z1:w[3],h:w[4],nz:1}]);
  NH.pubBoxes.push({x0:ff-.3,x1:ff+.35,z0:z0,z1:cz-.95,h:12.5,nz:1},{x0:ff-.3,x1:ff+.35,z0:cz+.95,z1:z1,h:12.5,nz:1});NH.pubW=W;
  /* the alley beside it stays a dead end */
  const az0=z1,az1=z1+2.6,amid=(az0+az1)/2;c2plane(g,10,2.6,fx-5,.03,amid,std({color:0x4a4640,roughness:.95}));
  for(const[x,s]of[[fx-8.6,1],[fx-7.9,.9]]){nzCyl(G,.32*s,.3*s,.95*s,x,0,az1-.5,std({color:0x2a3a30,roughness:.6,metalness:.4}),10)}
  {const gt=new THREE.Group();gt.position.set(fx+.1,0,amid);G.add(gt);for(let k=0;k<11;k++){const b=new THREE.Mesh(new THREE.CylinderGeometry(.02,.02,2.2,5),iron);b.position.set(0,1.1,-1.25+k*.25);gt.add(b);const t=new THREE.Mesh(new THREE.ConeGeometry(.04,.12,5),iron);t.position.set(0,2.26,-1.25+k*.25);gt.add(t)}c2box(gt,.05,.06,2.6,0,2,0,iron,false);c2box(gt,.05,.06,2.6,0,.3,0,iron,false);boxes.push({x0:fx-.1,x1:fx+.3,z0:az0,z1:az1,h:2.3,nz:1})}
  /* the cloak: until two witches tear it open, this is just another painted terrace house */
  {const cm=NH.fac[3]||NH.fac[0];const c=new THREE.InstancedMesh(nhBoxGeo(),cm,1);const o=new THREE.Object3D();o.position.set(cx-.1,0,cz);o.scale.set(12.4,12.6,12.2);o.updateMatrix();c.setMatrixAt(0,o.matrix);c.frustumCulled=false;G.add(c);NH.cloak=c;
    const sh=new THREE.ShaderMaterial({uniforms:{uT:{value:0},uA:{value:0}},transparent:true,depthWrite:false,blending:THREE.AdditiveBlending,side:THREE.DoubleSide,
      vertexShader:'varying vec2 vU;void main(){vU=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}',
      fragmentShader:'uniform float uT,uA;varying vec2 vU;void main(){float w=sin(vU.y*60.+uT*3.+sin(vU.x*9.+uT)*2.)*.5+.5;float s=pow(w,14.);float edge=smoothstep(0.,.08,vU.x)*smoothstep(1.,.92,vU.x)*smoothstep(0.,.05,vU.y)*smoothstep(1.,.9,vU.y);float sweep=exp(-pow((vU.x-fract(uT*.13))*9.,2.));gl_FragColor=vec4(vec3(.75,.85,1.)*(s*.6+sweep*.5),(s*.35+sweep*.3)*uA*edge);}'});
    const pl=new THREE.Mesh(new THREE.PlaneGeometry(12.2,12.6),sh);pl.position.set(fx+.08,6.3,cz);pl.rotation.y=Math.PI/2;G.add(pl);NH.shim={m:pl,mat:sh};NZ.anim.push(dt=>{sh.uniforms.uT.value+=dt});
    NH.cloakBox={x0:fx-12.3,x1:fx+.1,z0:cz-6.1,z1:cz+6.1,h:12.6,nz:1};boxes.push(NH.cloakBox)}
  g.visible=false;
  /* Alfred */
  if(!NH.alf){const a=makeCHActor('m',{skin:0x5a3826,hair:'hairBuzz',hairCol:0x8a8884,brow:0xbdbab4,beard:true,keepReg:[5,6,9],scale:.95,wear:[['long',0x1f6a2e,{roughness:.9}],['trousers',0x2b2c33,{roughness:.95}],['shoes',0x2a1c12,{roughness:.6}]]});if(a)nhRasta(a);
    if(a){
      const cane=NH.cane=new THREE.Mesh(new THREE.CylinderGeometry(.018,.022,1,6),std({color:0x2a1a10,roughness:.6}));try{a.attach('hand_r',cane,a.S.SK.hand_r.clone().add(V3(-.48,0,.02)),new THREE.Euler(0,0,Math.PI/2))}catch(x){}
      nhOld(a,.24,.78);cane.visible=false;NH.alf=a;g.add(a.g);if(CH2.st>=16)a.g.visible=false;nhSeatAlf()}}
  if(CH2.st>=15||nhPubSeen())nhUncloak(true);if(CH2.st>=15)nhLights(1,true)}
function nhSeatAlf(){const a=NH.alf;if(!a||!NH.seat)return;if(NH.cane)NH.cane.visible=false;a.g.position.copy(NH.seat);a.g.rotation.y=Math.PI/2;try{a.setBase('Sitting_Idle_Loop',.2);a.update(.2)}catch(x){}}
function nhReveal(){if(NH.shown)return;NH.shown=true;const v=NH.veil;const c=V3(NH_PUB.fx,2,NH_PUB.z+7.3);if(NH.veilBox){const i=boxes.indexOf(NH.veilBox);if(i>=0)boxes.splice(i,1)}
  flash(c,0xb0ff90,18);sx('portal',.8,null,{rate:.8});for(let k=0;k<5;k++)SP.emit(V3(c.x,rand(.3,8),c.z+rand(-1.2,1.2)),{n:30,c0:0xffffff,c1:0x8aff60,speed:4,life:1.2,s0:.45,s1:.05});
  if(v)addFx(null,1.8,(f,k)=>{v.mat.uniforms.uO.value=1-k},()=>{v.m.visible=false});if(CH2.st===14&&!X4.said.rev){X4.said.rev=1;toast('A gap between the houses that was not there a second ago.','Portobello Road')}}
{const _mt=muTick;muTick=function(dt){_mt(dt);if(!NH.built||MODE==='open'||CH2.zone!=='north')return;const dd=Math.hypot(P.pos.x-NH_PUB.door.x,P.pos.z-NH_PUB.door.z);
  if(NH.alf&&NH.alf.g.visible&&dd<90)try{NH.alf.update(dt)}catch(x){}if(NH.lamp&&dd<90){NH.lamp.gl.material.opacity=.8+Math.sin(time*9)*.08+Math.sin(time*23)*.05;NH.lamp.g.rotation.z=Math.sin(time*.9)*.05}
  if(NH.fire&&dd<60){NH.fire.em.material.opacity=.7+Math.random()*.3;if(Math.random()<.4)FL.emit(NH.fire.p,{n:1,c0:0xffe0a0,c1:0xff4000,s0:.35,s1:.05,life:.5,up:1.2,jitter:.25})}
}}

/* ---------- the map grows west only once the chapter begins ---------- */
function nhOpen(){if(CH2.zone!=='north'||CH2.st<14)return;nhBuild();if(WB.x0>NH.x0){WB.x0=NH.x0;drawWorldMap()}}
{const _ne=nzEnter;nzEnter=function(){const r=_ne.apply(this,arguments);nhOpen();return r}}
{const _dm=nzDrawMap;nzDrawMap=function(){_dm.apply(this,arguments);if(!NH.built||WB.x0>NH.x0)return;const x=worldMap.getContext('2d'),X=v=>v-MAPOX,Z=v=>v-MAPOZ;x.fillStyle='#284332';x.fillRect(X(-404),Z(-10000),132,142);x.strokeStyle='#a89c88';x.lineCap='round';
  const ln=(w,pts)=>{x.lineWidth=w;x.beginPath();pts.forEach((p,i)=>i?x.lineTo(X(p[0]),Z(p[1])):x.moveTo(X(p[0]),Z(p[1])));x.stroke()};ln(10,[[NH.x0,NHR.gate],[-272,NHR.gate]]);ln(9,[[NHR.lad,NHR.gate],[NHR.lad,NHR.z1]]);ln(7,[[NHR.lad,NHR.chep],[NHR.pem,NHR.chep]]);ln(8,[[NH.x0,NHR.west],[NHR.pem,NHR.west]]);ln(7,[[NHR.pem,NHR.gate],[NHR.pem,NHR.west]]);{const P2=[];for(let z=NHR.gate;z>=NHR.z1;z-=6)P2.push([nhPrX(z),z]);x.strokeStyle='#d8b070';ln(7,P2)}
  x.font='bold 18px Georgia,serif';x.fillStyle='#f0e6c8';x.fillText('Notting Hill',X(-640),Z(-9890));x.fillText('Portobello Rd',X(-520),Z(-10004));x.fillStyle='#f2a541';x.fillRect(X(NH_PUB.x)-5,Z(NH_PUB.z)-5,10,10)}}
const NHAREAS=[{n:'Notting Hill',s:'London W11',x0:-690,x1:-404,z0:-10030,z1:-9846},{n:'Portobello Road',s:'Market stalls, bunting, and something hidden',f:p=>Math.abs(p.x-nhPrX(p.z))<9&&p.z<-9858},{n:'Ladbroke Grove',s:'White villas and old plane trees',f:p=>Math.abs(p.x-NHR.lad)<10&&p.z<-9858},{n:'Kensington Gardens',s:'London',x0:-404,x1:-272,z0:-10000,z1:-9846}];
{let at=.5;const _mt=muTick;muTick=function(dt){_mt(dt);at-=dt;if(at>0||!started||MODE==='open'||CH2.zone!=='north'||CS.active||!NH.built)return;at=.5;for(const A of NHAREAS){if(A.seen)continue;const p=P.pos;const inA=A.f?A.f(p):p.x>A.x0&&p.x<A.x1&&p.z>A.z0&&p.z<A.z1;if(inA){A.seen=1;toast(A.s,A.n);if(A.n==='Notting Hill'&&CH2.st===14&&!X4.said.m87){X4.said.m87=1;after(1.5,()=>x4Say('@','m8_07'))}}}}}

/* ---------- small helpers ---------- */
const x4C=()=>{const a=[P.pos];if(KFW.a&&KFW.a.g.visible)a.push(KFW.a.g.position);if(LYR.a&&LYR.a.g.visible)a.push(LYR.a.g.position);const c=V3();for(const p of a)c.add(p);return c.multiplyScalar(1/a.length)};
const x4S=(p,side,dist,h,look)=>()=>{const P0=typeof p==='function'?p():p;const C=X4.cc||x4C();const d=V3(C.x-P0.x,0,C.z-P0.z);if(d.lengthSq()<.01)d.set(0,0,1);d.normalize();const r=V3(d.z,0,-d.x);return{pos:headOf(P0,h||1.7).addScaledVector(d,dist||3).addScaledVector(r,side||1.2),look:look?look():headOf(P0,1.45)}};
const x4K=()=>KFW.a?KFW.a.g.position:P.pos,x4L=()=>LYR.a?LYR.a.g.position:P.pos;
function x4Face(a,to){if(!a)return;a.g.rotation.y=Math.atan2(to.x-a.g.position.x,to.z-a.g.position.z)}
function x4Talk(who){P.heroAnim=who==='@'?'Idle_Talking_Loop':'Idle_Loop';try{if(KFW.a)KFW.a.setBase(who==='Kaen'?'Idle_Talking_Loop':'Idle_Loop',.3)}catch(x){}try{if(LYR.a)LYR.a.setBase(who==='Lyra'?'Idle_Talking_Loop':'Idle_Loop',.3)}catch(x){}}
function x4Stage(c,face){const f=V3(Math.sin(face),0,Math.cos(face)),r=V3(f.z,0,-f.x);P.pos.set(c.x,groundAt(c.x,c.z),c.z);P.vy=0;P.flying=false;P.face=face;yaw=face+Math.PI;
  if(!KFW.a&&typeof kfBuild==='function')try{kfBuild()}catch(x){}if(KFW.a){const k=c.clone().addScaledVector(f,2.4).addScaledVector(r,1.4);KFW.a.g.position.set(k.x,groundAt(k.x,k.z),k.z);KFW.a.g.visible=true;KFW.pin=1;x4Face(KFW.a,P.pos)}
  if(!LYR.a)lyraPlace(c.x,c.z,face);if(LYR.a){const l=c.clone().addScaledVector(f,2.4).addScaledVector(r,-1.4);LYR.a.g.position.set(l.x,groundAt(l.x,l.z),l.z);LYR.a.g.visible=true;LYR.home=false;x4Face(LYR.a,P.pos)}if(LYF.g)LYF.g.g.visible=false;X4.cc=x4C()}
function x4Sigil(p,col,broken){const g=new THREE.Group();g.position.copy(p);const m=new THREE.MeshBasicMaterial({color:col,transparent:true,opacity:.85,blending:THREE.AdditiveBlending,depthWrite:false,side:THREE.DoubleSide});
  const r=new THREE.Mesh(new THREE.TorusGeometry(2.4,.12,8,40),m);r.rotation.x=Math.PI/2;g.add(r);for(let k=0;k<5;k++){const a=k/5*TAU;const s=new THREE.Mesh(new THREE.ConeGeometry(.35,1.6,4),m);s.position.set(Math.cos(a)*2.4,.8,Math.sin(a)*2.4);g.add(s)}const gl=glowSprite(col,10,.5);g.add(gl);scene.add(g);
  addFx(null,9999,(f)=>{if(!g.parent){f.t=f.dur;return}g.rotation.y+=.01;const fl=broken?(Math.random()<.15?.15:.5):.7+Math.sin(f.t*5)*.3;m.opacity=fl;gl.material.opacity=fl*.6;if(broken&&Math.random()<.2)SP.emit(p.clone().add(V3(rand(-2.4,2.4),0,rand(-2.4,2.4))),{c0:0xffffff,c1:col,s0:.4,s1:.05,life:1,grav:5})});return g}

/* ---------- the explanation, at St Paul's ---------- */
function x4Explain(){if(CS.active)return;const c=V3(36,0,-9866);x4Stage(c,Math.PI);const sg=[x4Sigil(V3(232,44,-9876),0x9a9aa8,true),x4Sigil(V3(44,56,-9886),0x9a9aa8,true)];
  const kS=(s,d)=>x4S(x4K,s,d||2.6,1.75),lS=(s,d)=>x4S(x4L,s,d||2.6,1.6),wS=(s,d)=>x4S(()=>P.pos,s,d||2.8,1.8);
  playCutscene([{dur:4.2,fov:48,title:['Chapter XIV','The Smoke of Portobello'],cam:k=>({pos:V3(36+Math.sin(k*.8)*70,40+k*8,-9866+Math.cos(k*.8)*70),look:V3(36,8,-9880)}),onStart:()=>{x4Talk('');sx('wind',.5)},update:()=>{if(Math.random()<.5)SM.emit(V3(rand(-200,200),rand(25,60),-9880+rand(-120,120)),{c0:0x2a2438,c1:0x08060c,s0:3,s1:8,life:3,a:.35,up:.4})}},
    {who:'@',text:XL3.m8_01,cam:wS(1.2),onStart:()=>x4Talk('@')},{who:'Kaen',text:XL3.k8_01,cam:kS(1),onStart:()=>x4Talk('Kaen')},{who:'@',text:XL3.m8_02,cam:wS(-1.1),onStart:()=>x4Talk('@')},
    {who:'Lyra',text:XL3.ly50,cam:lS(-1),onStart:()=>x4Talk('Lyra')},
    {who:'Kaen',text:XL3.k8_02,fov:50,cam:k=>({pos:V3(120-k*30,70,-9790),look:V3(140,40,-9880)}),onStart:()=>x4Talk('Kaen')},
    {who:'@',text:XL3.m8_03,cam:wS(1.3,2.4),onStart:()=>x4Talk('@')},{who:'Kaen',text:XL3.k8_03,cam:kS(-1.1,2.4),onStart:()=>x4Talk('Kaen'),update:()=>{if(Math.random()<.4&&KFW.a)SP.emit(headOf(KFW.a.g.position,1.2),{c0:0xffffff,c1:0xb070ff,s0:.3,s1:.03,life:.6,up:.6})}},
    {who:'@',text:XL3.m8_04,cam:wS(-1.2),onStart:()=>{x4Talk('@');for(let k=0;k<6;k++)after(k*.2,()=>SM.emit(V3(36+rand(-30,30),rand(20,40),-9900+rand(-30,10)),{n:6,c0:0x201828,c1:0x050308,s0:1,s1:2,life:2,a:.6,speed:6}))}},
    {who:'Lyra',text:XL3.ly51,cam:lS(1.1),onStart:()=>x4Talk('Lyra')},{who:'@',text:XL3.m8_05,cam:wS(1.1,2.3),onStart:()=>x4Talk('@')},
    {who:'Kaen',text:XL3.k8_04,cam:kS(1.2),onStart:()=>x4Talk('Kaen')},{who:'Lyra',text:XL3.ly52,cam:lS(-1.2),onStart:()=>x4Talk('Lyra')},{who:'@',text:XL3.m8_06,cam:wS(-1),onStart:()=>x4Talk('@')}],
    ()=>{for(const s of sg)scene.remove(s);KFW.pin=0;P.heroAnim=null;x4Talk('');X4.cc=null;CH2.st=Math.max(CH2.st,14);ch2Save();nhOpen();CH2.obj=nzObj;
      after(3.2,()=>x4Say('Kaen','k9_03'));after(.6,()=>toast('London grows west. Follow Notting Hill Gate to Portobello Road.','Notting Hill is open',true))})}
{const _mt=muTick;muTick=function(dt){_mt(dt);if(!started||MODE==='open'||CS.active||!P.alive||CH2.zone!=='north')return;
  if(CH2.st===13&&(!X3.e||X3.e.dead)&&!KM.on&&!X3.trap){X4.t13+=dt;if(X4.t13>2.5||X4.goT){X4.goT=0;sayHush();x4Explain()}}
  if(CH2.st===14&&NH.entered&&!X4.pub&&!CS.active)x4Pub();
  if(CH2.st===15&&P.pos.z<-9855&&Math.abs(P.pos.x-nhPrX(P.pos.z))<3.6&&Math.abs(P.pos.z-NH_PUB.z)<26)x4Brother();
  if(CH2.st===16&&!X4.fight&&!X4.e&&Math.hypot(P.pos.x-NH_PUB.door.x,P.pos.z-NH_PUB.door.z)<40){X4.re+=dt;if(X4.re>1.5)x4Rematch()}}}

/* ---------- inside the pub ---------- */
function x4Transfer(from,to,dur){const A0=()=>headOf(from(),1.2),B0=()=>headOf(to(),1.3);runeFlash(from(),0xf2c040,6,dur);runeFlash(to(),0x80ff70,6,dur);
  const beam=new THREE.Mesh(new THREE.CylinderGeometry(.2,.2,1,14,1,true),new THREE.MeshBasicMaterial({color:0xf8d060,transparent:true,opacity:0,blending:THREE.AdditiveBlending,depthWrite:false}));scene.add(beam);const ga=glowSprite(0xffd060,3,0,false),gb=glowSprite(0x90ff80,3,0,false);scene.add(ga);scene.add(gb);
  addFx(null,dur,(f,k)=>{const A=A0(),B=B0();const up=Math.min(1,k*2.5),dn=1-Math.max(0,k-.9)/.1;beam.position.copy(A).lerp(B,.5);beam.scale.set(.6+k,A.distanceTo(B),.6+k);beam.lookAt(B);beam.rotateX(Math.PI/2);beam.material.opacity=.5*up*dn;ga.position.copy(A);gb.position.copy(B);ga.scale.setScalar(3+k*3);gb.scale.setScalar(2+k*8);ga.material.opacity=.6*up*dn;gb.material.opacity=.7*up*dn;
    for(let q=0;q<3;q++){const u=(f.t*.8+q/3)%1;const p=A.clone().lerp(B,u);const d=B.clone().sub(A).normalize();const r1=V3(d.z,0,-d.x).normalize(),r2=V3().crossVectors(d,r1);const a=f.t*9+q*2.1+u*7,rad=.7*Math.sin(u*Math.PI);p.addScaledVector(r1,Math.cos(a)*rad).addScaledVector(r2,Math.sin(a)*rad);SP.emit(p,{c0:q?0xfff4c0:0xffffff,c1:q?0xf0a020:0x60e050,s0:.45,s1:.05,life:.55})}
    if(LYR.a)LYR.a.g.position.y=groundAt(LYR.a.g.position.x,LYR.a.g.position.z)+Math.sin(Math.min(1,k*2)*Math.PI*.5)*.55*dn;if(k>.85&&!f.bl){f.bl=1;flash(B,0xd8ff90,24);SP.emit(B,{n:140,c0:0xffffff,c1:0x9aff60,speed:10,life:1.1,s0:.5,s1:.05});sx('powerup',1,null,{rate:1.1})}},()=>{scene.remove(beam);scene.remove(ga);scene.remove(gb)})}
function x4Pub(){if(CS.active||X4.pub)return;X4.pub=1;const a=NH.alf;const cx=NH_PUB.x,cz=NH_PUB.z;const ap=()=>a?a.g.position:V3(cx-3.4,0,cz-1.4);const inP=V3(cx+1.6,0,cz+1.4);x4Stage(inP,-Math.PI/2);
  if(KFW.a){KFW.a.g.position.set(cx+2.9,0,cz-.2);x4Face(KFW.a,ap())}if(LYR.a){LYR.a.g.position.set(cx+.9,0,cz+3.1);x4Face(LYR.a,ap())}P.face=Math.atan2(ap().x-P.pos.x,ap().z-P.pos.z);X4.cc=V3(cx-.4,0,cz);
  const aS=(s,d,h)=>()=>({pos:headOf(ap(),h||1.2).add(V3(d||2.2,.15,s||.7)),look:headOf(ap(),1)});const wS=(s,d)=>x4S(()=>P.pos,s,d||2.4,1.75),lS=(s,d)=>x4S(x4L,s,d||2.2,1.6),kS=(s,d)=>x4S(x4K,s,d||2.2,1.75);
  let sg=[];const stand=()=>{if(!a)return;if(NH.cane)NH.cane.visible=true;try{a.setBase('Idle_Loop',.4)}catch(x){}a.g.position.y=0};
  playCutscene([{dur:3.6,fov:50,cam:k=>({pos:V3(cx+.4+k*.8,2.5-k*.4,cz+5.2-k*.8),look:headOf(ap(),.9)}),onStart:()=>{x4Talk('');if(NH.lamp)NH.lamp.pl.intensity=1.6}},
    {who:'Alfred',text:XL3.al_01,fov:40,cam:aS(.8,2.2),onStart:()=>{try{a&&a.setBase('Sitting_Talking_Loop',.3)}catch(x){}}},
    {who:'@',text:XL3.m8_08,cam:wS(1,2.2),onStart:()=>x4Talk('@')},
    {who:'Alfred',text:XL3.al_02,fov:38,cam:aS(-.8,2.1),onStart:()=>x4Talk('')},
    {who:'Alfred',text:XL3.al_03,fov:50,cam:k=>({pos:V3(cx+.8-k*.4,2.3,cz+3.8),look:V3(cx-2.2,1.9,cz-1.4)}),onStart:()=>{const b=V3(cx-2.2,2.1,cz-1.4);sg=[x4Sigil(b.clone().add(V3(0,0,-.9)),0x9a9aa8,true),x4Sigil(b.clone().add(V3(0,0,.9)),0x9a9aa8,true),x4Sigil(b.clone().add(V3(.4,.5,0)),0xff3040,false)];for(const s of sg)s.scale.setScalar(.2)}},
    {who:'@',text:XL3.m8_09,cam:wS(-1,2.1),onStart:()=>x4Talk('@')},
    {who:'Alfred',text:XL3.al_04,fov:40,cam:aS(.6,2),onStart:()=>{x4Talk('');for(const s of sg)scene.remove(s);sg=[]}},
    {who:'Alfred',text:XL3.al_05,fov:46,cam:k=>({pos:V3(cx+2.6,1.9,cz+3.4-k*.5),look:V3(cx-1.8,1.25,cz)}),onStart:()=>{stand();if(a)a.g.position.set(cx-2.6,0,cz-.4);if(LYR.a){LYR.a.g.position.set(cx-1.1,0,cz+.7);x4Face(LYR.a,ap());x4Face(a,LYR.a.g.position)}}},
    {dur:6.2,fov:54,cam:k=>{const m=ap().clone().lerp(x4L(),.5);return{pos:V3(m.x+3.4-k*.6,1.5+k*1.2,m.z+2.8),look:V3(m.x,1.3+k*.3,m.z)}},onStart:()=>{try{a&&a.fire('Spell_Simple_Shoot',.4)}catch(x){}x4Transfer(ap,x4L,5.8);sx('riser',.7,null,{rate:.8})},update:()=>{if(Math.random()<.4)SP.emit(headOf(x4L(),rand(.2,1.8)).add(V3(rand(-.6,.6),0,rand(-.6,.6))),{c0:0xffffff,c1:0xb0ff60,s0:.35,s1:.03,life:.8,up:1.4})}},
    {who:'Lyra',text:XL3.ly53,fov:40,cam:lS(1,2.1),onStart:()=>{x4Talk('Lyra');if(LYR.a)LYR.a.g.position.y=0}},
    {who:'Alfred',text:XL3.al_06,fov:38,cam:()=>({pos:headOf(ap(),1.6).add(V3(1.9,0,1.3)),look:headOf(ap(),1.5)}),onStart:()=>x4Talk('')},
    {who:'Kaen',text:XL3.k8_05,cam:kS(1.1,2.1),onStart:()=>x4Talk('Kaen')}],
    ()=>{for(const s of sg)scene.remove(s);KFW.pin=0;P.heroAnim=null;x4Talk('');X4.cc=null;CH2.st=Math.max(CH2.st,15);ch2Save();if(a){a.g.position.set(cx+1,0,cz+4);try{a.setBase('Idle_Loop',.3)}catch(x){}x4Face(a,NH_PUB.side)}
      after(.8,()=>toast('Lyra has magic of her own again. She can fly without a guardian.','Alfred\'s gift',true))})}

/* ---------- Desmond ---------- */
function nhOld(a,stoop,thin){if(!a||a._old)return;a._old=1;const B=n=>a.bones.find(b=>b.name===n||b.name.endsWith(n));const sp=B('spine_02'),sp3=B('spine_03'),nk=B('neck_01'),ua=[B('upperarm_l'),B('upperarm_r')];const _u=a.update.bind(a);
  const Q=new THREE.Quaternion(),Ax=V3(1,0,0);const bend=(b,v)=>{if(!b)return;if(b.userData.oq&&b.quaternion.equals(b.userData.oq))return;Q.setFromAxisAngle(Ax,v);b.quaternion.multiply(Q);(b.userData.oq||(b.userData.oq=new THREE.Quaternion())).copy(b.quaternion)};
  a.update=function(dt){_u(dt);if(a._dying)return;bend(sp,stoop);bend(sp3,stoop*.6);bend(nk,-stoop*1.1)}}
function buildDesmond(){const a=makeCHActor('m',{skin:0x4a2e20,hair:'hairBuzz',hairCol:0xb4b0a8,brow:0xa8a49c,beard:true,keepReg:[5,6,9],scale:1.04,wear:[['long',0x1a1520,{roughness:.8}],['witch',0x2e2238,{roughness:.75,side:THREE.DoubleSide}],['hat0',0x1c1622,{roughness:.8}],['trousers',0x14101a,{roughness:.8}],['shoes',0x0a080c,{roughness:.4}]]});
  if(!a){const g=new THREE.Group();const b=new THREE.Mesh(new THREE.CapsuleGeometry?new THREE.CylinderGeometry(.5,.6,2.2,10):new THREE.CylinderGeometry(.5,.6,2.2,10),std({color:0x1c1424}));b.position.y=1.1;g.add(b);return{g,body:g}}
  const SK=a.S.SK;const staff=new THREE.Group();const sh=new THREE.Mesh(new THREE.CylinderGeometry(.03,.04,1.9,7),std({color:0x2a1a10,roughness:.7}));sh.position.y=.12;staff.add(sh);const orb=new THREE.Mesh(new THREE.IcosahedronGeometry(.11,1),new THREE.MeshBasicMaterial({color:0xb8ff90}));orb.position.y=1.12;staff.add(orb);const og=glowSprite(0x9aff70,1.6,.8);og.position.y=1.12;staff.add(og);
  try{a.attach('hand_r',staff,SK.hand_r.clone().add(V3(-.22,0,.02)),new THREE.Euler(0,0,-Math.PI/2))}catch(x){}
  {const qp=new THREE.Quaternion(),qg=new THREE.Quaternion();const _u=a.update.bind(a);a.update=function(dt){_u(dt);if(!staff.parent)return;a.g.updateMatrixWorld(true);staff.parent.getWorldQuaternion(qp);a.g.getWorldQuaternion(qg);staff.quaternion.copy(qp.invert().multiply(qg))}}
  nhOld(a,.14,.8);const eyes=[];for(const s of[-1,1]){const e=glowSprite(0xb0ff80,.18,.9);try{a.attach('Head',e,SK.Head.clone().add(V3(s*.034,.075,.1)))}catch(x){}eyes.push(e)}
  const aura=glowSprite(0x6aff50,5,.12);aura.position.y=1.2;a.g.add(aura);const bub=new THREE.Mesh(new THREE.SphereGeometry(1.5,24,16),new THREE.MeshBasicMaterial({color:0xd8ff70,transparent:true,opacity:.16,blending:THREE.AdditiveBlending,depthWrite:false,side:THREE.DoubleSide}));bub.position.y=1.1;bub.visible=false;a.g.add(bub);
  try{a.setBase('Idle_Loop',.1);a.update(.1)}catch(x){}
  return{g:a.g,body:a.body,actor:a,head:a.head,orb:og,anim:(e,dt,mv)=>{const bz=e.busy;if(bz>100)e.busy=0;actorAnimate(e,dt,mv);e.busy=bz;bub.visible=!!e.guarded;if(bub.visible){bub.rotation.y+=dt;bub.material.opacity=.14+Math.sin(e.t*5)*.05}aura.material.opacity=.1+Math.sin(e.t*2)*.05+(e.ai.big||0)*.2;
    eyes.forEach(s=>s.material.opacity=.7+Math.sin(e.t*7)*.25);const s=e.m.g.scale.x;if(Math.random()<.55)SM.emit(V3(e.pos.x+rand(-.6,.6)*s,e.pos.y+rand(0,.6)*s,e.pos.z+rand(-.6,.6)*s),{c0:0x5a5650,c1:0x141210,s0:.8*s,s1:2.4*s,life:1.6,a:.4,up:.9})}}}
function buildWard(){const g=new THREE.Group();const m=std({color:0x2a2a22,roughness:.5,metalness:.3,emissive:0x90c040,emissiveIntensity:.5});const s=new THREE.Mesh(new THREE.CylinderGeometry(.35,.55,2.8,6),m);s.position.y=1.4;g.add(s);const top=new THREE.Mesh(new THREE.OctahedronGeometry(.5,0),new THREE.MeshBasicMaterial({color:0xd8ff80}));top.position.y=3.3;g.add(top);const gl=glowSprite(0xc0ff70,4,.6);gl.position.y=3.3;g.add(gl);const rn=decal(runeTex,0xb8ff60,4,true,.7);rn.position.y=.06;g.add(rn);
  return{g,body:g,anim:(e,dt)=>{top.rotation.y+=dt*2;top.position.y=3.3+Math.sin(e.t*3)*.15;rn.rotation.z+=dt;gl.material.opacity=.5+Math.sin(e.t*6)*.2;s.scale.setScalar(1+e.flash*1.5)}}}
ETYPES.desmond={name:'Desmond Mumbash, the Smoke of Portobello',boss:true,hp:9000,speed:3.2,dmg:24,range:0,cd:9,xp:6000,r:1,h:2.4,kite:true,noCalm:true,build:buildDesmond};
ETYPES.dward={name:'Ward Glyph',hp:320,speed:0,dmg:0,range:0,cd:99,xp:40,r:.8,h:3.2,build:buildWard};
Object.assign(BTH,{desmond:'mus_b_smoke'});if(MU.keys)MU.keys.push('mus_b_smoke');MU.gain.mus_b_smoke=1.8;
{const _bw=bmWant;bmWant=function(){if(started&&bossRef&&!bossRef.dead&&bossRef.type==='desmond'){bmTrack('mus_b_smoke');return null}return _bw.apply(this,arguments)}}
{const _mw=muWant;muWant=function(){if(started&&bossRef&&!bossRef.dead&&bossRef.type==='desmond'){const t=bmTrack('mus_b_smoke');return t.ok?'mus_b_smoke':null}return _mw.apply(this,arguments)}}
{let pt=2;const _mt=muTick;muTick=function(dt){_mt(dt);pt-=dt;if(pt>0)return;pt=8;if(started&&MODE!=='open'&&CH2.st>=14&&CH2.st<17)try{bmTrack('mus_b_smoke')}catch(x){}}}
{const _mt=muTick;muTick=function(dt){_mt(dt);const e=X4.e;if(e&&!e.dead&&CS.active&&e.m&&e.m.actor)try{e.m.actor.update(dt)}catch(x){}}}
const dsHP=()=>maxHP();
function dsHand(e){return eCenter(e).add(V3(0,.6*e.m.g.scale.x,0))}
function dsVolley(e){const c=dsHand(e),base=aimAtPlayer(c);e.ai.cast=.7;try{e.m.actor.fire('Spell_Simple_Shoot',.5)}catch(x){}const n=e.ai.fz?7:5;for(let k=0;k<n;k++){const d=base.clone().applyAxisAngle(V3(0,1,0),(k-(n-1)/2)*.14);enemyOrb(c,d,19,dsHP()*.055,0xffa040,.42,{keepY:true,life:2.8})}sx('impact',.5,null,{rate:.8})}
function dsSerpents(e){e.ai.cast=1;try{e.m.actor.fire('Spell_Simple_Shoot',.7)}catch(x){}const n=e.ai.fz?4:3;for(let q=0;q<n;q++)after(q*.35,()=>{if(e.dead)return;const h=dsHand(e);const v=aimAtPlayer(h).normalize().applyAxisAngle(V3(0,1,0),(q-(n-1)/2)*.6).multiplyScalar(10);const head=glowSprite(0xb8ff80,2.2,.85);head.position.copy(h);scene.add(head);let hit=false;X4.serp.push(head);
  addFx(null,5.5,(f,k)=>{if(hit||e.dead){f.t=f.dur;return}const tg=V3(P.pos.x,P.pos.y+1.1,P.pos.z).sub(head.position);const want=tg.clone().normalize().multiplyScalar(11);v.lerp(want,Math.min(1,.016*1.7));head.position.addScaledVector(v,.016);head.position.y=Math.max(head.position.y,groundAt(head.position.x,head.position.z)+.6);
    for(let i=0;i<2;i++)SM.emit(head.position.clone().add(V3(rand(-.2,.2),rand(-.2,.2),rand(-.2,.2))),{c0:0x6a6a5a,c1:0x10120c,s0:.9,s1:2,life:1.1,a:.55,up:.3});if(Math.random()<.5)SP.emit(head.position,{c0:0xe8ffb0,c1:0x50a020,s0:.3,s1:.04,life:.4});
    if(tg.length()<1.25){hit=true;damagePlayer(dsHP()*.085);X4.haze=Math.min(1,X4.haze+.35);SM.emit(head.position,{n:24,c0:0x6a6a5a,c1:0x10120c,s0:2,s1:4,life:1.4,a:.6,up:.8})}},()=>{scene.remove(head);X4.serp=X4.serp.filter(s=>s!==head)})});sx('cackle',.5,null,{rate:.6});if(!X4.said.de4&&Math.random()<.5){X4.said.de4=1;x4Say('Desmond','de_04')}}
function dsMortar(e){e.ai.cast=1.1;try{e.m.actor.fire('Spell_Simple_Shoot',.8)}catch(x){}const v=V3(Math.sin(P.face),0,Math.cos(P.face)).multiplyScalar(P.moveAmt>.2?4:0);const n=e.ai.fz?7:5;
  for(let k=0;k<n;k++){const p=P.pos.clone().add(v).add(k?V3(rand(-6,6),0,rand(-6,6)):V3());p.y=groundAt(p.x,p.z);const from=dsHand(e);const orb=glowSprite(0xff9a30,2.4,.9);orb.position.copy(from);scene.add(orb);const T=1.25+k*.08;
    telegraph(p,2.8,T,0xff8a30,()=>{FL.emit(V3(p.x,p.y+.5,p.z),{n:40,c0:0xffe0a0,c1:0xff3000,s0:1.6,s1:.3,life:.7,up:4,speed:6});SM.emit(V3(p.x,p.y+1,p.z),{n:26,c0:0x5a5650,c1:0x141210,s0:2.4,s1:5,life:2.4,a:.55,up:1.2});P.shake=Math.max(P.shake,.35);if(playerIn(p,2.9))damagePlayer(dsHP()*.12);if(Math.random()<.4)x4Smoke(p,3.6,5,true)});
    addFx(orb,T,(f,k2)=>{orb.position.lerpVectors(from,V3(p.x,p.y+.4,p.z),k2);orb.position.y+=Math.sin(k2*Math.PI)*9;SM.emit(orb.position,{c0:0x5a5650,c1:0x141210,s0:.6,s1:1.5,life:.8,a:.5})})}}
function x4Smoke(p,r,life,small){const S={p:p.clone(),r,life,t:0,small,dmgT:.5,v:V3()};X4.smokes.push(S);if(!small){runeFlash(p,0x9aa870,r*1.6,1.4);for(let k=0;k<14;k++)SM.emit(V3(p.x+rand(-r,r)*.6,p.y+rand(0,2),p.z+rand(-r,r)*.6),{c0:0x6e6a62,c1:0x1c1a18,s0:3,s1:7,life:3,a:.5,up:.6,speed:1.5})}return S}
function dsClouds(e){e.ai.cast=1.3;try{e.m.actor.fire('Spell_Simple_Shoot',1)}catch(x){}const n=e.ai.fz?3:2;for(let k=0;k<n;k++){const p=k?P.pos.clone().lerp(e.pos,rand(.3,.6)).add(V3(rand(-5,5),0,rand(-5,5))):P.pos.clone();p.y=groundAt(p.x,p.z);after(k*.4,()=>{if(!e.dead)x4Smoke(p,rand(7,9),12,false)})}
  sx('wind',.6,null,{rate:.7});if(!X4.said.de4){X4.said.de4=1;x4Say('Desmond','de_04')}}
function dsWalls(e){e.ai.cast=.8;const d=V3(P.pos.x-e.pos.x,0,P.pos.z-e.pos.z);const L=d.length();d.normalize();const r=V3(d.z,0,-d.x);const n=e.ai.fz?3:2;
  for(let k=0;k<n;k++){const c=e.pos.clone().addScaledVector(d,Math.min(L*.45,5+k*3.2)).addScaledVector(r,(k-(n-1)/2)*5.5);c.y=groundAt(c.x,c.z);x4Wall(c,Math.atan2(d.x,d.z),9)}sx('shield',.7,null,{rate:.8});if(!X4.said.de6){X4.said.de6=1;x4Say('Desmond','de_06')}}
function x4Wall(c,ry,life){const tex=new THREE.CanvasTexture(mkCanvas(128,96,x=>{x.strokeStyle='rgba(220,255,140,.9)';x.lineWidth=2;for(let r=0;r<6;r++)for(let q=0;q<9;q++){const X=q*16+(r%2)*8,Y=r*18+6;x.beginPath();for(let a=0;a<6;a++){const t=a/6*TAU;x.lineTo(X+Math.cos(t)*8,Y+Math.sin(t)*8)}x.closePath();x.stroke()}x.fillStyle='rgba(255,230,120,.8)';x.font='bold 22px Georgia';x.fillText('✶  ✷  ✶',22,56)}));
  const m=new THREE.Mesh(new THREE.PlaneGeometry(6,4.2),new THREE.MeshBasicMaterial({map:tex,color:0xd8ff90,transparent:true,opacity:0,blending:THREE.AdditiveBlending,depthWrite:false,side:THREE.DoubleSide}));m.position.set(c.x,c.y+2.1,c.z);m.rotation.y=ry;scene.add(m);const W={m,c:c.clone(),ry,life,hp:6,flash:0};X4.walls.push(W);
  addFx(null,life,(f,k)=>{if(!m.parent){f.t=f.dur;return}W.flash=Math.max(0,W.flash-.05);m.material.opacity=Math.min(1,f.t*3)*(.55+W.flash)*(1-Math.max(0,k-.9)*10);if(Math.random()<.2)SP.emit(V3(c.x+Math.cos(ry)*rand(-3,3),c.y+rand(0,4),c.z-Math.sin(ry)*rand(-3,3)),{c0:0xf8ffd0,c1:0x80c030,s0:.25,s1:.03,life:.6,up:.5})},()=>{scene.remove(m);X4.walls=X4.walls.filter(w=>w!==W)})}
function dsWards(e,n){for(let k=0;k<n;k++){const a=k/n*TAU+rand(-.3,.3),d=rand(6,9);const p=V3(e.pos.x+Math.sin(a)*d,0,e.pos.z+Math.cos(a)*d);p.x=clamp(p.x,X4FB.x0+3,X4FB.x1-3);p.z=clamp(p.z,X4FB.z0+3,X4FB.z1-3);const w=spawnEnemy('dward',p);w.quest=true;w.aggro=true;w.lvl=P.level;w.dw=1;flash(p,0xc8ff70,10);SM.emit(V3(p.x,1,p.z),{n:20,c0:0x6e6a62,c1:0x1c1a18,s0:2,s1:4,life:1.2,a:.5,up:2})}
  e.guarded=true;toast('Ward glyphs shield him. Break them first.','Blocking spells',true);if(!X4.said.k87){X4.said.k87=1;after(1.2,()=>x4Say('Kaen','k8_07'))}}
const dsWardsLeft=()=>enemies.filter(o=>!o.dead&&o.dw).length;
function dsGrow(e){const a=e.ai;a.big=1;a.bigT=12;a.stomp=1.6;e.ai.cast=1.5;x4Say('Desmond','de_05',1);after(1.6,()=>{if(!X4.said.k88){X4.said.k88=1;x4Say('Kaen','k8_08')}});flash(e.pos,0xa0ff70,26);P.shake=1;sx('garg',.8,null,{rate:.55});
  for(let k=0;k<30;k++)SM.emit(V3(e.pos.x+rand(-3,3),rand(0,5),e.pos.z+rand(-3,3)),{c0:0x6e6a62,c1:0x1c1a18,s0:3,s1:7,life:2,a:.55,up:2})}
function dsStomp(e){const c=V3(e.pos.x,groundAt(e.pos.x,e.pos.z),e.pos.z);P.shake=Math.max(P.shake,.8);flash(c,0xb0ff70,18);try{e.m.actor.fire('Punch_Cross',.6)}catch(x){}SM.emit(V3(c.x,c.y+.5,c.z),{n:30,c0:0x6e6a62,c1:0x1c1a18,s0:2,s1:5,life:1.2,a:.5,speed:8,flat:true});
  const m=new THREE.Mesh(new THREE.RingGeometry(.9,1,64),new THREE.MeshBasicMaterial({color:0xc8ff70,transparent:true,depthWrite:false,blending:THREE.AdditiveBlending,side:THREE.DoubleSide}));m.rotation.x=-Math.PI/2;m.position.set(c.x,c.y+.25,c.z);let hit=false;
  addFx(m,1.4,(f,k)=>{const r=f.t*15;m.scale.setScalar(r);m.material.opacity=1-k;const d=Math.hypot(P.pos.x-c.x,P.pos.z-c.z);if(!hit&&Math.abs(d-r)<1.3&&P.pos.y-c.y<1.1){hit=true;damagePlayer(dsHP()*.11)}},()=>{scene.remove(m);m.geometry.dispose()})}
function dsSweep(e){const dir=V3(P.pos.x-e.pos.x,0,P.pos.z-e.pos.z).normalize();e.m.g.rotation.y=Math.atan2(dir.x,dir.z);e.m.lock=1;try{e.m.actor.once('Melee_Hook',.9)}catch(x){}const s=e.m.g.scale.x,R=5.5*s;
  coneTelegraph(V3(e.pos.x,groundAt(e.pos.x,e.pos.z),e.pos.z),dir,R,.7,.7,0xb0ff70,()=>{crescentFx(V3(e.pos.x,groundAt(e.pos.x,e.pos.z),e.pos.z),dir,R,0x9aff60);if(inCone(P.pos,V3(e.pos.x,e.pos.y,e.pos.z),dir,R,.7))damagePlayer(dsHP()*.13)})}
function dsBlink(e){const a=rand(0,TAU),d=rand(12,16);const to=V3(clamp(P.pos.x+Math.sin(a)*d,X4FB.x0+4,X4FB.x1-4),0,clamp(P.pos.z+Math.cos(a)*d,X4FB.z0+4,X4FB.z1-4));for(let k=0;k<3;k++)SM.emit(V3(e.pos.x,e.pos.y+k,e.pos.z),{n:16,c0:0x6e6a62,c1:0x1c1a18,s0:2,s1:5,life:1.4,a:.6,up:2});e.pos.set(to.x,groundAt(to.x,to.z),to.z);
  for(let k=0;k<3;k++)SM.emit(V3(to.x,e.pos.y+k,to.z),{n:16,c0:0x6e6a62,c1:0x1c1a18,s0:2,s1:5,life:1.4,a:.6,up:2});try{sfx.blink&&sfx.blink()}catch(x){}}
BOSSAI.desmond=function(e,dt,d){const a=e.ai;if(!a.on)return;a.cast=Math.max(0,(a.cast||0)-dt);const pct=e.hp/e.maxhp,sp=a.fz?1.35:1;
  e.pos.x=clamp(e.pos.x,X4FB.x0+2,X4FB.x1-2);e.pos.z=clamp(e.pos.z,X4FB.z0+2,X4FB.z1-2);
  if(a.big){a.bigT-=dt;const s=lerp(e.m.g.scale.x,2.3,Math.min(1,dt*2));e.m.g.scale.setScalar(s);ETYPES.desmond.r=1+(s-1)*.9;ETYPES.desmond.h=2.4*s;a.stomp-=dt;if(a.stomp<=0){a.stomp=2.4/sp;dsStomp(e)}if(a.bigT<=0){a.big=0}}
  else if(e.m.g.scale.x>1.01){const s=lerp(e.m.g.scale.x,1,Math.min(1,dt*1.5));e.m.g.scale.setScalar(s);ETYPES.desmond.r=1+(s-1)*.9;ETYPES.desmond.h=2.4*s}
  if(a.wardsUp&&!dsWardsLeft()){a.wardsUp=0;e.guarded=false;toast('The glyphs are broken. He is open!','Now',false)}
  if(a.shT>0){a.shT-=dt;if(a.shT<=0&&!a.wardsUp)e.guarded=false}
  for(const k of['v','s','m','c','w','tp','me','sh'])a[k]=(a[k]==null?{v:2.5,s:6,m:9,c:11,w:14,tp:28,me:0,sh:18}[k]:a[k])-dt*sp;
  if(a.cast>0||e.m.lock>0)return;
  if(d<4.5*e.m.g.scale.x&&a.me<=0){a.me=3.5;dsSweep(e);return}
  if(a.c<=0){a.c=rand(13,16);dsClouds(e);return}if(a.s<=0){a.s=rand(7,9.5);dsSerpents(e);return}if(a.m<=0&&!a.big){a.m=rand(9,12);dsMortar(e);return}if(a.w<=0){a.w=rand(13,17);dsWalls(e);return}
  if(a.sh<=0&&!a.wardsUp&&(a.hitAcc||0)>e.maxhp*.06){a.sh=rand(16,20);a.hitAcc=0;e.guarded=true;a.shT=4.5;flash(e.pos,0xe0ff80,10);sx('shield',.7)}
  if(a.tp<=0&&(d>26||Math.random()<.3)){a.tp=rand(26,34);dsBlink(e);return}
  if(a.v<=0){a.v=rand(3,4.2);dsVolley(e)}
  if(!a.p1&&pct<.85){a.p1=1;a.wardsUp=1;dsWards(e,3)}if(!a.g1&&pct<.68){a.g1=1;dsGrow(e)}if(!a.p2&&pct<.5){a.p2=1;a.wardsUp=1;dsWards(e,4)}if(!a.g2&&pct<.33){a.g2=1;dsGrow(e)}if(!a.fz&&pct<.2){a.fz=1;toast('Desmond pours out everything he has left.','Last breath of smoke',true)}};
{const _de=damageEnemy;damageEnemy=function(e,amt){if(e&&e.type==='desmond'&&!e.dead)e.ai.hitAcc=(e.ai.hitAcc||0)+amt;return _de.apply(this,arguments)}}
/* projectiles die on ward walls */
{const _mt=muTick;muTick=function(dt){_mt(dt);if(!X4.walls.length)return;for(const W of X4.walls){const n=V3(Math.sin(W.ry),0,Math.cos(W.ry)),r=V3(n.z,0,-n.x);for(const p of projs){if(p.life<=0)continue;const q=V3(p.pos.x-W.c.x,0,p.pos.z-W.c.z);if(Math.abs(q.dot(n))<.6&&Math.abs(q.dot(r))<3.1&&p.pos.y-W.c.y<4.3&&p.pos.y>W.c.y-.2){p.life=0;W.flash=.6;SP.emit(p.pos.clone(),{n:12,c0:0xffffff,c1:0xc0ff60,speed:4,life:.4});sx('clash',.25,null,{rate:rand(1.4,1.8)})}}}}}
/* smoke: damage over time, the haze, and heavy fog */
{const st=document.createElement('style');st.textContent='#x4haze{position:fixed;inset:-10%;pointer-events:none;z-index:4;opacity:0;background:radial-gradient(ellipse at 50% 55%,rgba(92,88,80,.45) 0%,rgba(52,50,46,.82) 55%,rgba(26,24,22,.95) 100%);transition:opacity .25s}#x4haze::before,#x4haze::after{content:"";position:absolute;inset:0;background:radial-gradient(circle at 30% 40%,rgba(120,116,104,.5),transparent 35%),radial-gradient(circle at 70% 65%,rgba(110,106,96,.45),transparent 40%),radial-gradient(circle at 55% 20%,rgba(90,86,78,.4),transparent 30%);animation:x4h 9s ease-in-out infinite alternate;filter:blur(18px)}#x4haze::after{animation-duration:13s;animation-direction:alternate-reverse;opacity:.8}@keyframes x4h{0%{transform:translate(-4%,2%) scale(1.05)}100%{transform:translate(5%,-3%) scale(1.18)}}';document.head.appendChild(st)}
const x4HazeEl=document.createElement('div');x4HazeEl.id='x4haze';document.body.appendChild(x4HazeEl);
{const _mt=muTick;muTick=function(dt){_mt(dt);let inS=0;for(const S of X4.smokes){S.t+=dt;const k=S.t/S.life;const r=S.r*(S.small?1:Math.min(1,S.t*1.2));if(!S.small){const to=V3(P.pos.x-S.p.x,0,P.pos.z-S.p.z);if(to.length()>1)S.p.addScaledVector(to.normalize(),dt*.8)}
    const n=S.small?1:3;if(k<.92)for(let i=0;i<n;i++){const a=rand(0,TAU),d=Math.sqrt(Math.random())*r;SM.emit(V3(S.p.x+Math.sin(a)*d,S.p.y+rand(0,2.6),S.p.z+Math.cos(a)*d),{c0:0x76726a,c1:0x24221e,s0:2.6,s1:6.5,life:2.6,a:.42,up:.35,speed:.5})}
    const d=Math.hypot(P.pos.x-S.p.x,P.pos.z-S.p.z);if(d<r&&P.pos.y-S.p.y<5&&P.alive&&!CS.active){inS=Math.max(inS,1-d/r*.5);S.dmgT-=dt;if(S.dmgT<=0){S.dmgT=.5;damagePlayer(dsHP()*(S.small?.012:.016));if(!X4.said.ly55&&X4.fight){X4.said.ly55=1;x4Say('Lyra','ly55')}}}}
  X4.smokes=X4.smokes.filter(S=>S.t<S.life);X4.haze=Math.max(inS*.85,X4.haze-dt*.5);x4HazeEl.style.opacity=(CS.active?0:X4.haze).toFixed(3);
  if(scene.fog&&CH2.zone==='north'){X4.fogK=lerp(X4.fogK,X4.haze,Math.min(1,dt*3));if(X4.fogK>.01)scene.fog.density=Math.max(scene.fog.density,(NZ.fogD||.008)+X4.fogK*.05)}}}
/* Kaen and Lyra fight beside you */
/* ---------- Kaen and Lyra fight Desmond beside you ---------- */
const X4C={k:{cd:2.4,ang:.9,busy:0,an:'',n:0},l:{cd:3.4,ang:-2.3,busy:0,an:'',n:0},dealt:0,on:0};
const x4CmpCapF=()=>({easy:.24,medium:.18,hard:.12})[DIFF]||.18;
function x4CmpOn(){X4C.on=1;X4C.dealt=0;X4C.k.cd=2.4;X4C.l.cd=3.6;X4C.k.busy=X4C.l.busy=0;X4C.k.an=X4C.l.an='';KFW.pin=1;LYR.pin=1}
function x4CmpOff(){if(!X4C.on)return;X4C.on=0;KFW.pin=0;LYR.pin=0;try{LYF.an=''}catch(x){}}
/* damage that respects the cap: easy 24%, medium 18%, hard 12% of his life; glyphs not counted */
function x4CmpHit(t,f,col){if(!t||t.dead)return;if(t.dw){damageEnemy(t,t.maxhp*f*9,col);return}const e=X4.e;if(t!==e)return;const cap=e.maxhp*x4CmpCapF();const left=cap-X4C.dealt;
  if(left<=1||e.hp<e.maxhp*.04){SP.emit(eCenter(e),{n:10,c0:0xffffff,c1:0x9a9aa8,speed:3,life:.3});return}
  const h0=e.hp;damageEnemy(e,Math.min(e.maxhp*f*(x4CmpCapF()/.18),left),col);let got=Math.max(0,h0-e.hp);if(got>left){e.hp+=got-left;got=left}X4C.dealt+=got}
function x4CmpAnim(c,a,n){if(c.an!==n){c.an=n;try{a.setBase(n,.25)}catch(x){}}}
const x4CmpTgt=()=>{const w=enemies.filter(o=>!o.dead&&o.dw);if(w.length&&Math.random()<.7)return w[(Math.random()*w.length)|0];return X4.e};
/* stay around him, out of the smoke, never on top of you */
function x4CmpMove(c,a,dt,R,run){const e=X4.e,g=a.g.position;c.ang+=dt*(.16+.05*Math.sin(time*.7+R));let tx=e.pos.x+Math.sin(c.ang)*R,tz=e.pos.z+Math.cos(c.ang)*R;
  for(const S of X4.smokes){const d=Math.hypot(tx-S.p.x,tz-S.p.z);if(d<S.r+1){const k=(S.r+1-d)/(d||1);tx+=(tx-S.p.x)*k;tz+=(tz-S.p.z)*k}}
  const dp=Math.hypot(tx-P.pos.x,tz-P.pos.z);if(dp<3.5){tx+=(tx-P.pos.x)/(dp||1)*(3.5-dp);tz+=(tz-P.pos.z)/(dp||1)*(3.5-dp)}
  tx=clamp(tx,X4FB.x0+2,X4FB.x1-2);tz=clamp(tz,X4FB.z0+2,X4FB.z1-2);if(Math.hypot(tx-g.x,tz-g.z)>40){g.x=tx;g.z=tz;SP.emit(V3(tx,1,tz),{n:24,c0:0xffffff,c1:0x9a70ff,speed:4,life:.5})}const dx=tx-g.x,dz=tz-g.z,L=Math.hypot(dx,dz);const v=Math.min(L,dt*(L>6?run:run*.55));
  if(L>.05){g.x+=dx/L*v;g.z+=dz/L*v}g.y=groundAt(g.x,g.z);if(L>2.2){a.g.rotation.y=lerpAngle(a.g.rotation.y,Math.atan2(dx,dz),Math.min(1,dt*8));return L>6?'Sprint_Loop':'Walk_Loop'}
  a.g.rotation.y=lerpAngle(a.g.rotation.y,Math.atan2(e.pos.x-g.x,e.pos.z-g.z),Math.min(1,dt*6));return null}
/* Kaen: sword wave, dash cut, void ring */
function x4KWave(a,t){const kp=a.g.position;const dir=V3(t.pos.x-kp.x,0,t.pos.z-kp.z);const L=dir.length();dir.normalize();x4Face(a,t.pos);try{a.fire('Melee_Hook',.7)}catch(x){}kSwing(0,.45);
  after(.18,()=>{crescentFx(V3(kp.x,kp.y,kp.z),dir,Math.min(L,24),0xb070ff);after(Math.min(.45,L/45),()=>{x4CmpHit(t,.009,'#c8a0ff');sx('khit',.4,null,{rate:rand(1,1.12)});SP.emit(eCenter(t),{n:30,c0:0xffffff,c1:0x9050ff,speed:6,life:.5});flash(eCenter(t),0xa070ff,5)})})}
function x4KDash(a,t,c){const g=a.g.position,from=g.clone();const dir=V3(t.pos.x-g.x,0,t.pos.z-g.z);const L=dir.length();dir.normalize();const to=from.clone().addScaledVector(dir,Math.max(0,L-1.6));x4Face(a,t.pos);c.busy=1.2;
  try{a.fire('Melee_Hook',.85)}catch(x){}kSwing(0,.5)
  addFx(null,.22,(f,k)=>{g.lerpVectors(from,to,k*k);g.y=groundAt(g.x,g.z);SP.emit(V3(g.x,g.y+1,g.z),{n:3,c0:0xe0c8ff,c1:0x5020c0,s0:.6,s1:.05,life:.4,speed:1})},()=>{
    const m=new THREE.Mesh(new THREE.TorusGeometry(1.8,.09,6,30,Math.PI*1.6),new THREE.MeshBasicMaterial({color:0xd0b0ff,transparent:true,blending:THREE.AdditiveBlending,depthWrite:false,side:THREE.DoubleSide}));m.position.set(g.x,g.y+1.1,g.z);m.rotation.set(Math.PI/2+.35,0,Math.atan2(dir.x,dir.z));
    addFx(m,.35,(f,k)=>{m.rotation.z+=.45;m.scale.setScalar(1+k*.6);m.material.opacity=1-k},()=>{scene.remove(m);m.geometry.dispose()});x4CmpHit(t,.011,'#e0c8ff');sx('khit',.5,null,{rate:rand(.95,1.08)});SP.emit(eCenter(t),{n:40,c0:0xffffff,c1:0x8040ff,speed:8,life:.5});P.shake=Math.max(P.shake,.12);
    after(.35,()=>{const b=g.clone();addFx(null,.35,(f,k)=>{g.lerpVectors(b,from,k);g.y=groundAt(g.x,g.z)})})})}
function x4KVoid(a,t){x4Face(a,t.pos);try{a.fire('Spell_Simple_Shoot',.7)}catch(x){}const p=V3(t.pos.x,groundAt(t.pos.x,t.pos.z),t.pos.z);runeFlash(p,0x9050ff,5.2,1.1);ring(p,0x8040ff,5,.6,.6);
  for(let k=0;k<20;k++){const an=k/20*TAU;SP.emit(V3(p.x+Math.sin(an)*2.6,p.y+.3,p.z+Math.cos(an)*2.6),{c0:0xd0b0ff,c1:0x3010a0,s0:.5,s1:.05,life:.7,up:2})}try{sfx.void&&sfx.void()}catch(x){}
  after(.6,()=>{x4CmpHit(t,.01,'#b080ff');flash(p,0x7030ff,8);SP.emit(V3(p.x,p.y+1.2,p.z),{n:50,c0:0xf0e0ff,c1:0x4010c0,speed:7,life:.6,up:3})})}
/* Lyra: small energy balls, and wind that blows the smoke away */
function x4LBalls(a,t){x4Face(a,t.pos);try{a.fire('Spell_Simple_Shoot',.55)}catch(x){}
  for(let i=0;i<3;i++)after(i*.16,()=>{if(t.dead)return;const A=headOf(a.g.position,1.25).add(V3(rand(-.3,.3),rand(-.2,.2),rand(-.3,.3)));const o=glowSprite(i%2?0xc8ff80:0xffd070,1.3,.95);o.position.copy(A);scene.add(o);const sd=rand(-2.5,2.5),up=rand(.6,1.8);
    addFx(o,.5,(f,k)=>{const B=eCenter(t);o.position.lerpVectors(A,B,k);const r=V3(B.z-A.z,0,-(B.x-A.x)).normalize();o.position.addScaledVector(r,Math.sin(k*Math.PI)*sd);o.position.y+=Math.sin(k*Math.PI)*up;SP.emit(o.position,{c0:0xfff0c0,c1:0x80e050,s0:.3,s1:.04,life:.35})},
      ()=>{scene.remove(o);x4CmpHit(t,.0035,'#ffe090');SP.emit(eCenter(t),{n:14,c0:0xffffd0,c1:0x90e060,speed:4,life:.35});flash(eCenter(t),0xd8ff90,3)})});sx('kame',.15,null,{rate:1.7,cut:.7})}
function x4LWind(a,t,c){const g=a.g.position;const aim=t?t.pos:P.pos;const dir=V3(aim.x-g.x,0,aim.z-g.z);const L=Math.max(1,dir.length());dir.normalize();x4Face(a,aim);c.busy=1;try{a.fire('OverhandThrow',.6)}catch(x){}sx('wind',.45,null,{rate:1.25});
  addFx(null,.9,(f,k)=>{const d=k*Math.min(L+4,22);const q=g.clone().addScaledVector(dir,d);for(let i=0;i<5;i++){const an=f.t*14+i*1.26,r=.6+k*2.2;SP.emit(V3(q.x+Math.cos(an)*r*dir.z,q.y+1+Math.sin(an)*r*.6,q.z-Math.cos(an)*r*dir.x),{c0:0xffffff,c1:0xa0e8d0,s0:.5,s1:.05,life:.45,speed:.6})}
    for(const S of X4.smokes){if(Math.hypot(S.p.x-q.x,S.p.z-q.z)<S.r+2.5){S.t=Math.max(S.t,S.life*.93);S.p.addScaledVector(dir,.6)}}X4.haze=Math.max(0,X4.haze-.02)},
    ()=>{if(t&&!t.dead&&t.pos.distanceTo(g)<26){x4CmpHit(t,.004,'#c8fff0');SP.emit(eCenter(t),{n:20,c0:0xffffff,c1:0x90e0c0,speed:6,life:.4})}})}
{const _mt=muTick;muTick=function(dt){_mt(dt);if(!X4C.on)return;if(!X4.fight||!X4.e||X4.e.dead){x4CmpOff();return}if(CS.active)return;
  const K=KFW.a,Ly=LYR.a;if(K){K.g.visible=true;const c=X4C.k;c.busy=Math.max(0,c.busy-dt);c.cd-=dt;if(!c.busy){const an=x4CmpMove(c,K,dt,9.5,8.5);x4CmpAnim(c,K,an||'Idle_Loop');
      if(c.cd<=0&&!an&&P.alive){const t=x4CmpTgt();c.cd=rand(3.6,5.2);c.n++;const r=c.n%3;c.an='';if(r===0)x4KDash(K,t,c);else if(r===1)x4KWave(K,t);else x4KVoid(K,t);c.busy=Math.max(c.busy,.7)}}}
  if(Ly){Ly.g.visible=true;const c=X4C.l;c.busy=Math.max(0,c.busy-dt);c.cd-=dt;if(!c.busy){const an=x4CmpMove(c,Ly,dt,12,7.5);x4CmpAnim(c,Ly,an||'Spell_Simple_Idle_Loop');
      if(c.cd<=0&&!an&&P.alive){c.cd=rand(2.6,3.6);c.n++;c.an='';const sm=X4.smokes.find(S=>Math.hypot(P.pos.x-S.p.x,P.pos.z-S.p.z)<S.r);
        if(sm)x4LWind(Ly,null,c);else if(c.n%3===0)x4LWind(Ly,x4CmpTgt(),c);else x4LBalls(Ly,x4CmpTgt());c.busy=Math.max(c.busy,.6)}}}}}
/* keep the fight on the street */
{const _mt=muTick;muTick=function(dt){_mt(dt);if(!X4.fight||CS.active)return;const p=P.pos;const cx=clamp(p.x,X4FB.x0,X4FB.x1),cz=clamp(p.z,X4FB.z0,X4FB.z1);if(cx!==p.x||cz!==p.z){p.x=cx;p.z=cz;for(let k=0;k<2;k++)SM.emit(V3(p.x+rand(-2,2),p.y+rand(0,3),p.z+rand(-2,2)),{c0:0x76726a,c1:0x24221e,s0:2,s1:5,life:1.4,a:.5,up:.5});if(!X4.said.wall){X4.said.wall=1;toast('Desmond\'s smoke closes the street behind you.','No way out',false)}}}}

/* ---------- outside: the brother ---------- */
function x4Brother(){if(CS.active||X4.bro)return;X4.bro=1;const a=NH.alf;const door=NH_PUB.door.clone();const ap=()=>a?a.g.position:door;const dp=V3(nhPrX(-9922),0,-9922);
  const e=spawnEnemy('desmond',dp.clone());e.invuln=true;e.lvl=P.level;e.aggro=true;e.ai.on=0;e.quest=true;e.busy=999;X4.e=e;bossRef=null;$('boss').classList.add('hidden');e.pos.y=7;e.m.g.visible=false;
  const st=door.clone().add(V3(1.2,0,-3.2));x4Stage(st,0);if(a){a.g.position.set(door.x+.4,0,door.z+.6);a.g.visible=true;try{a.setBase('Idle_Loop',.3)}catch(x){}x4Face(a,dp)}P.face=Math.atan2(dp.x-P.pos.x,dp.z-P.pos.z);x4Face(KFW.a,dp);x4Face(LYR.a,dp);X4.cc=V3(door.x+3,0,door.z-6);
  const dS=(s,d,h)=>()=>({pos:headOf(e.pos,h||2).add(V3(s||1.4,.1,-(d||3.4))),look:headOf(e.pos,1.7)});const aS=(s,d)=>()=>({pos:headOf(ap(),1.5).add(V3(d||2.4,.1,s||-1)),look:headOf(ap(),1.5)});let ser=null;
  playCutscene([{dur:3.6,fov:50,cam:k=>({pos:V3(dp.x+6,3+k*2,dp.z+22-k*4),look:V3(dp.x,3,dp.z)}),onStart:()=>{x4Talk('');sx('garg',.6,null,{rate:.45});P.shake=.4},update:()=>{for(let i=0;i<4;i++)SM.emit(V3(dp.x+rand(-4,4),rand(0,9),dp.z+rand(-14,6)),{c0:0x6e6a62,c1:0x1c1a18,s0:3,s1:8,life:2.6,a:.5,up:.2,speed:2})}},
    {dur:2.4,fov:44,cam:k=>({pos:V3(dp.x+4.5,2.2,dp.z+8),look:V3(dp.x,2+3*(1-k),dp.z)}),onStart:()=>{e.m.g.visible=true;e.pos.set(dp.x,6,dp.z)},update:dt=>{e.pos.y=Math.max(0,e.pos.y-dt*3.2);x4Face(e.m,P.pos);for(let i=0;i<3;i++)SM.emit(V3(e.pos.x+rand(-1,1),e.pos.y+rand(0,2),e.pos.z+rand(-1,1)),{c0:0x6e6a62,c1:0x1c1a18,s0:2,s1:5,life:1.6,a:.55,up:1})}},
    {who:'Desmond',text:XL3.de_01,fov:38,cam:dS(1.3,3.2),onStart:()=>{e.pos.y=0;e.m.g.rotation.y=Math.atan2(ap().x-e.pos.x,ap().z-e.pos.z)}},
    {who:'Alfred',text:XL3.al_07,fov:40,cam:aS(-1.2,2.4)},
    {who:'Desmond',text:XL3.de_02,fov:36,cam:dS(-1.2,2.8,1.9)},
    /* the strike: smoke gathers in his hand, snap zoom, one clean beam, wide shot as Alfred falls */
    {dur:1.7,fov:50,cut:true,cam:k=>{const A=ap(),m=A.clone().lerp(e.pos,.5);return{pos:V3(nhPrX(e.pos.z)+1.2,8.5-k*1.5,e.pos.z+9-k*2),look:V3(m.x,1.4,m.z)}},onStart:()=>{try{e.m.actor.setBase('Spell_Simple_Idle_Loop',.2)}catch(x){}sx('dcharge',1);x4Kin('in');e.m.g.rotation.y=Math.atan2(ap().x-e.pos.x,ap().z-e.pos.z)},
      update:(dt,k)=>{const h=dsHand(e);for(let i=0;i<5;i++){const an=time*6+i*1.26,r=1.6*(1-k)+.25;SM.emit(V3(h.x+Math.cos(an)*r,h.y+rand(-.4,.4),h.z+Math.sin(an)*r),{c0:0x7a786e,c1:0x14140f,s0:.8,s1:2.4,life:.9,a:.55,speed:.6})}SP.emit(h,{n:2,c0:0xeaffd0,c1:0x6ad040,s0:.5+k,s1:.05,life:.4,speed:2});camera.fov=lerp(50,34,Math.pow(k,3));camera.updateProjectionMatrix()}},
    {dur:1.5,fov:24,cut:true,cam:k=>{const A=ap(),E=e.pos,d=V3(A.x-E.x,0,A.z-E.z).normalize(),r=V3(d.z,0,-d.x);return{pos:headOf(E,2.1).addScaledVector(d,-2.6).addScaledVector(r,1.1),look:headOf(A.clone().lerp(E,k*.08),1.05)}},onStart:()=>{CS.speed=.55;try{e.m.actor.fire('Spell_Simple_Shoot',.35)}catch(x){}x4Beam(dsHand(e),headOf(ap(),1.15));sx('dbeam',1.1);x4Kin('punch');P.shake=1;vib([60,30,160]);
        if(a){a._dying=1;try{a.once('Death01',2.4)}catch(x){}}X4.hitA=1},update:()=>{const B=headOf(ap(),1);for(let i=0;i<3;i++)SM.emit(B.clone().add(V3(rand(-.6,.6),rand(-.6,.6),rand(-.6,.6))),{c0:0x86847a,c1:0x18170f,s0:1,s1:3,life:1.2,a:.5,up:.8})}},
    {dur:2.4,fov:56,cut:true,cam:k=>{const A=ap(),sx=Math.sign(nhPrX(A.z)-A.x)||1;return{pos:V3(A.x+sx*2.6,7+k*4,A.z-7-k*3),look:V3(A.x,.4,A.z+1.5)}},onStart:()=>{CS.speed=.85;x4Kin('out')},update:()=>{if(Math.random()<.5)SM.emit(V3(ap().x+rand(-1.2,1.2),.4,ap().z+rand(-1.2,1.2)),{c0:0x86847a,c1:0x18170f,s0:1.5,s1:4,life:2,a:.35,up:.6})}},
    {who:'@',text:XL3.m8_10,fov:42,cam:x4S(()=>P.pos,1.2,2.6,1.7),onStart:()=>{CS.speed=1;const k=ap().clone().add(V3(.9,0,-.4));P.pos.set(k.x,0,k.z);P.face=Math.atan2(ap().x-k.x,ap().z-k.z);P.heroAnim='Fixing_Kneeling'}},
    {who:'Alfred',text:XL3.al_08,fov:34,cam:()=>({pos:headOf(ap(),.5).add(V3(1.4,.5,1.2)),look:headOf(ap(),.25)}),onStart:()=>{P.heroAnim='Fixing_Kneeling'}},
    {who:'Desmond',text:XL3.de_03,fov:40,title:['Desmond Mumbash','The Smoke of Portobello'],cam:k=>({pos:headOf(e.pos,1.4).add(V3(2-k,0,-4.6+k)),look:headOf(e.pos,2)}),onStart:()=>{P.heroAnim=null;e.m.g.rotation.y=Math.atan2(P.pos.x-e.pos.x,P.pos.z-e.pos.z);flash(e.pos,0xb0ff70,14)},update:()=>{for(let i=0;i<3;i++)SM.emit(V3(e.pos.x+rand(-2,2),rand(0,3),e.pos.z+rand(-2,2)),{c0:0x6e6a62,c1:0x1c1a18,s0:2,s1:5,life:2,a:.5,up:1})}}],
    ()=>{if(ser)scene.remove(ser);KFW.pin=0;P.heroAnim=null;x4Talk('');X4.cc=null;CH2.st=Math.max(CH2.st,16);ch2Save();x4Fight()})}
function x4Fight(){const e=X4.e;if(!e)return;x4CmpOn();e.m.g.visible=true;e.invuln=false;e.busy=0;e.ai.on=1;e.pos.y=0;X4.fight=1;X4.said.wall=0;bossRef=e;$('boss').classList.remove('hidden');$('bossName').innerHTML=`${e.def.name} <span style="color:#ff4050">· Lv ${e.lvl}</span>`;P.invuln=2;
  if(KFW.a)KFW.a.g.visible=true;after(.6,()=>toast('He hides behind wards, fills the street with smoke and grows when he is hurt. Kaen and Lyra will help.','Desmond',true))}
function x4Rematch(){X4.re=0;if(CS.active)return;const dp=V3(nhPrX(-9922),0,-9922);const e=spawnEnemy('desmond',dp.clone());e.lvl=P.level;e.aggro=true;e.quest=true;X4.e=e;e.ai.on=0;e.invuln=true;e.busy=999;
  playCutscene([{who:'Desmond',text:XL3.de_03,fov:42,cam:()=>({pos:headOf(e.pos,1.6).add(V3(2.2,0,-4)),look:headOf(e.pos,1.9)}),onStart:()=>{e.m.g.rotation.y=Math.atan2(P.pos.x-e.pos.x,P.pos.z-e.pos.z);flash(e.pos,0xb0ff70,14)}}],x4Fight)}
{const _rv=revive;revive=function(){const was=X4.fight;X4.fight=0;x4CmpOff();X4.e=null;for(const W of X4.walls)scene.remove(W.m);X4.walls=[];X4.smokes=[];X4.haze=0;ETYPES.desmond.r=1;ETYPES.desmond.h=2.4;const r=_rv.apply(this,arguments);if(was){X4.re=-6;after(1.2,()=>toast('Desmond is still on Portobello Road. Go back when you are ready.','Retreat',true))}return r}}
{const _bo=bossOutro;bossOutro=function(type,c){if(type==='desmond')return x4End(c);return _bo.apply(this,arguments)}}
function x4End(c){X4.fight=0;x4CmpOff();for(const W of X4.walls)scene.remove(W.m);X4.walls=[];X4.smokes=[];for(const o of enemies)if(!o.dead&&o.dw)removeEnemy(o);const a=NH.alf;const ap=()=>a?a.g.position:NH_PUB.door;ETYPES.desmond.r=1;ETYPES.desmond.h=2.4;
  const al=ap().clone(),st=V3(nhPrX(al.z)-al.x,0,0).normalize();const cand=[];let lit=false;
  const light=()=>{if(lit)return;lit=true;for(let k=0;k<9;k++){const t=k/9*TAU;const p=al.clone().add(V3(Math.cos(t)*1.25,0,Math.sin(t)*1.25));nzCyl(scene,.035,.04,.16+Math.random()*.08,p.x,.02,p.z,std({color:0xf0e8d0}),6);cand.push(nzGlow(scene,0xffc070,.7,.9,p.x,.3,p.z))}runeFlash(al,0xffd070,4.5,9)};
  playCutscene([{who:'Desmond',text:XL3.de_07,fov:48,cam:k=>({pos:V3(c.x+Math.sin(k*.9+.4)*11,c.y+3.4,c.z+Math.cos(k*.9+.4)*11),look:V3(c.x,c.y+1.2,c.z)}),update:()=>{for(let i=0;i<4;i++)SM.emit(V3(c.x+rand(-1.5,1.5),c.y+rand(-1,2),c.z+rand(-1.5,1.5)),{c0:0x76726a,c1:0x24221e,s0:2,s1:5,life:2,a:.6,up:2.5})}},
    {dur:4.2,fov:62,cam:k=>({pos:V3(c.x+18-k*4,4+k*26,c.z+26+k*8),look:V3(c.x,2+k*4,c.z-6)}),onStart:()=>{flash(c,0xffffff,30);SP.emit(c,{n:220,c0:0xffffff,c1:0xb0ff70,speed:14,life:1.4,s0:.6,s1:.05});X4.haze=0},update:()=>{SM.emit(V3(c.x+rand(-8,8),rand(2,14),c.z+rand(-8,8)),{c0:0x76726a,c1:0x24221e,s0:3,s1:8,life:2.4,a:.28,up:3.5});if(Math.random()<.3)SP.emit(V3(c.x+rand(-30,30),rand(10,30),c.z+rand(-30,30)),{c0:0xfff4d0,c1:0x80c060,s0:.3,s1:.04,life:1.6,up:1})}},
    {who:'@',text:XL3.m8_11,fov:50,cam:k=>({pos:al.clone().add(st.clone().multiplyScalar(8.5-k*1.2)).add(V3(0,3.4-k*.4,5.2)),look:V3(al.x,.8,al.z)}),onStart:()=>{const k=al.clone().add(V3(st.x*.9,0,-.5));P.pos.set(k.x,0,k.z);P.face=Math.atan2(al.x-k.x,al.z-k.z);P.heroAnim='Fixing_Kneeling';X4.cc=al.clone();
      if(KFW.a){KFW.a.g.position.set(al.x+st.x*1.8,0,al.z+1.6);KFW.pin=1;x4Face(KFW.a,al)}if(LYR.a){LYR.a.g.position.set(al.x+st.x*1.4,0,al.z-1.9);x4Face(LYR.a,al)}light()}},
    {who:'Kaen',text:XL3.k8_06,fov:52,cam:k=>{const K=x4K();return{pos:headOf(K,1.8).add(V3(st.x*6.8,.9,4.2-k*.6)),look:headOf(K,1)}},onStart:()=>{P.heroAnim='Idle_Loop';x4Talk('Kaen')}},
    {who:'Lyra',text:XL3.ly54,fov:52,cam:k=>{const L=x4L();return{pos:headOf(L,1.7).add(V3(st.x*6.4,.9,-4.4+k*.6)),look:headOf(L,1)}},onStart:()=>{x4Talk('Lyra')},update:()=>{if(Math.random()<.35&&LYR.a)SP.emit(headOf(LYR.a.g.position,1.1),{c0:0xfff0c0,c1:0x90e060,s0:.35,s1:.04,life:.9,up:.9})}},
    {dur:5,fov:58,cam:k=>({pos:al.clone().add(st.clone().multiplyScalar(9+k*12)).add(V3(0,4+k*14,8+k*10)),look:V3(al.x,1+k*2,al.z)}),onStart:()=>{x4Talk('')},update:()=>{for(const g2 of cand)g2.material.opacity=.75+Math.random()*.25;if(Math.random()<.4)SP.emit(V3(al.x+rand(-1,1),.6,al.z+rand(-1,1)),{c0:0xfff0c0,c1:0xffa040,s0:.25,s1:.03,life:1.6,up:1.2})}}],x4Finish)}
function x4Finish(){x4CmpOff();KFW.pin=0;LYR.pin=0;P.heroAnim=null;x4Talk('');X4.cc=null;X4.e=null;CH2.st=Math.max(CH2.st,17);ch2Save();beaten.add('desmond');writeSave();$('boss').classList.add('hidden');bossRef=null;
  toast('Desmond is gone, and so is Alfred. The last vessel waits at Westminster.','Chapter XIV complete',true);after(9,()=>toast('Fly to <b>Westminster</b>, beside Big Ben.','Chapter XV: Beneath Westminster',true))}

/* ---------- objectives, Lyra's own wings, chapter select ---------- */
{const _xo=xiiObj;xiiObj=function(){const st=CH2.st;if(st<13)return _xo.apply(this,arguments);if(CH2.zone==='paris')return 'Ask <b>Lyra</b> for the door to Calais, then fly back to London';
  if(st===13)return 'Talk with Kaen and Lyra · press <b>E</b>';if(st===14){const d=Math.round(Math.hypot(P.pos.x-NH_PUB.door.x,P.pos.z-NH_PUB.door.z));return NH.shown?'Enter <b>The Last Lantern</b> · press <b>E</b> at the door':`Find Alfred's hidden pub on <b>Portobello Road</b> · ${d}m`}
  if(st===15)return 'Step back out onto <b>Portobello Road</b>';if(st===16)return X4.fight?'Defeat <b>Desmond Mumbash</b>':`Return to <b>Portobello Road</b> · ${Math.round(Math.hypot(P.pos.x-NH_PUB.door.x,P.pos.z-NH_PUB.door.z))}m`;return 'Chapter XV is coming'}}
CHAPTERS.push({id:'smoke',n:'XIV',title:'The Smoke of Portobello',desc:'What the Crown really is, an old man in a cloaked pub, and a brother made of smoke.'});
{const _cb=chapBoss;chapBoss=function(c){if(c.id==='smoke')return null;return _cb(c)}}
function x4Reset(){x4CmpOff();if(X4.e&&!X4.e.dead)removeEnemy(X4.e);for(const o of enemies)if(!o.dead&&o.dw)removeEnemy(o);X4.e=null;X4.fight=0;X4.t13=0;X4.pub=0;X4.bro=0;X4.hitA=0;X4.re=0;X4.said={};for(const W of X4.walls)scene.remove(W.m);X4.walls=[];X4.smokes=[];X4.haze=0;ETYPES.desmond.r=1;ETYPES.desmond.h=2.4;
  nhSeatAlf();for(const A of NHAREAS)A.seen=0}
{const _ac=applyChapter;applyChapter=function(id){x4Reset();if(id!=='smoke')return _ac.apply(this,arguments);_ac.call(this,'escape');
  CH2.st=13;ch2Save();XII.lazy=1;XII.rv=[1,1,1,1,1,1];XII.solid=1;XII.wd=1;XII.said={fk:1,lon:1};xiiSave();WD.esc=1;if(WD.e&&!WD.e.dead){WD.e.dead=true;WD.e.m.g.visible=false}WD.e=null;beaten.add('vesper');
  nzEnter('london');CH2.obj=nzObj;const g=V3(36,0,-9866);P.pos.set(g.x,groundAt(g.x,g.z),g.z);P.face=Math.PI;yaw=0;try{x3GearKaen()}catch(x){}if(KFW.a)KFW.a.g.position.set(g.x+1.4,P.pos.y,g.z+1.4);lyraPlace(g.x-1.6,g.z+1.6,Math.PI);LYR.home=false;X4.t13=4}}
{const _rc=renderChapters;renderChapters=function(){_rc();const list=$('chapList');const el=list&&list.children[chapIndexOf('smoke')];if(el){const done=CH2.st>=17,cur=started&&CH2.st>=13&&CH2.st<17;el.className='chap'+(done?' done':'')+(cur?' cur':'')}}}
{const _rc2=renderChapters;renderChapters=function(){_rc2();const list=$('chapList');const el=list&&list.children[chapIndexOf('shadow')];if(el&&CH2.st>=13&&el.className.includes('cur'))el.className=el.className.replace(' cur','')}}

/* ================= Kaen's fight: aim that finds Vesper, phantom blades, his own battle voice ================= */
function kmLock(r){const b=X3.e&&!X3.e.dead&&X3.e.pos.distanceTo(P.pos)<r?X3.e:null;if(b&&!b.invuln)return b;let best=null,bd=1e9;for(const e of enemies){if(e.dead||e.invuln)continue;const d=Math.hypot(e.pos.x-P.pos.x,e.pos.z-P.pos.z);if(d<r&&d<bd){bd=d;best=e}}return best||b}
function kmAim(t,face0,maxMiss){if(!t)return null;const to=V3(t.pos.x-P.pos.x,0,t.pos.z-P.pos.z);const d=to.length()||1;to.normalize();const f0=V3(Math.sin(face0),0,Math.cos(face0));const ang=Math.acos(clamp(f0.dot(to),-1,1));
  const miss=Math.random()<maxMiss*clamp((ang-.6)/(Math.PI-.6),0,1);const dir=to.clone();if(miss)dir.applyAxisAngle(V3(0,1,0),(Math.random()<.5?-1:1)*rand(.3,.5));const dy=miss?0:(eCenter(t).y-(P.pos.y+1.2))/d;return{dir,dy,t,miss,d}}
KM_AB.push(['Phantom Blades','M12 2l2 7h-4zM5 6l4 5-2 2zM19 6l-2 7-2-2zM11 10h2v10l-1 2-1-2z']);KM_COST.push(30);KM_CD.push(14);KM.cd.push(0);
function kmBlades(t){const n=6,bm=std({color:0x2a1050,emissive:0xa060ff,emissiveIntensity:1.4,roughness:.3,metalness:.6});const geo=new THREE.ConeGeometry(.13,1.9,4);geo.translate(0,.95,0);const hilt=new THREE.BoxGeometry(.5,.07,.07);
  sx('summon',.8,null,{rate:1.2});sx('riser',.5,null,{rate:1.5});for(let k=0;k<n;k++){const g=new THREE.Group();const b=new THREE.Mesh(geo,bm);g.add(b);const h=new THREE.Mesh(hilt,bm);g.add(h);const gl=glowSprite(0xb070ff,2,.7);gl.position.y=1;g.add(gl);scene.add(g);
    const a0=k/n*TAU;let launched=false,hit=false,p=null,v=null;
    addFx(g,2.6,(f)=>{if(hit){f.t=f.dur;return}const hold=.55+k*.11;if(f.t<hold){const a=a0+f.t*3;p=headOf(P.pos,2.1).add(V3(Math.cos(a)*1.7,Math.sin(f.t*6+k)*.15,Math.sin(a)*1.7));g.position.copy(p);g.rotation.set(0,-a,Math.PI);const s=Math.min(1,f.t*4);g.scale.setScalar(s);return}
      const tgt=t&&!t.dead?eCenter(t):p.clone().add(V3(Math.sin(P.face),0,Math.cos(P.face)).multiplyScalar(30));if(!launched){launched=true;v=tgt.clone().sub(g.position).normalize().multiplyScalar(30);sx('kame',.35,null,{rate:2,cut:1})}
      v.lerp(tgt.clone().sub(g.position).normalize().multiplyScalar(34),.18);g.position.addScaledVector(v,.016);g.quaternion.setFromUnitVectors(V3(0,1,0),v.clone().normalize());SP.emit(g.position,{c0:0xffffff,c1:0x9040ff,s0:.4,s1:.03,life:.35});
      if(t&&!t.dead&&g.position.distanceTo(tgt)<1.2+t.def.r){hit=true;damageEnemy(t,kmDmg(t,.0075),'#e8c8ff');flash(g.position,0xb070ff,9);SP.emit(g.position,{n:26,c0:0xffffff,c1:0xa050ff,speed:9,life:.45});hitStop=Math.max(hitStop,.03);KM.en=Math.min(100,KM.en+2);sx('clash',.35,null,{rate:rand(1.3,1.7)})}},
      ()=>{scene.remove(g)})}}
{const _ku=kmUse;kmUse=function(i){if(i!==7)return _ku.apply(this,arguments);if(!KM.on||CS.active||!P.alive||KM.cd[7]>0)return;if(KM.en<KM_COST[7]){toast('Not enough strength yet. Land a few sword hits.');return}
  const t=kmLock(120);KM.en-=KM_COST[7];KM.cd[7]=KM_CD[7];if(t)P.face=Math.atan2(t.pos.x-P.pos.x,t.pos.z-P.pos.z);try{KM.a.fire('Spell_Simple_Shoot',.6)}catch(x){}kmBlades(t);if(!KM.said.pb||Math.random()<.35){KM.said.pb=1;x3Bark('Kaen','kc_11')}}}
Object.assign(XL3,{kc_01:'Take this!',kc_02:"Argh! You'll regret that.",kc_03:"Not yet... I'm not done yet.",kc_04:"Who's next?",kc_05:'Stay down!',kc_06:'Ten years I waited for this.',kc_07:'Come on then, shadow!',kc_08:'Too slow, Vesper!',kc_09:'That one stung.',kc_10:'Feel that?!',kc_11:'Blades... rise!'});
for(const k of['kc_01','kc_02','kc_03','kc_04','kc_05','kc_06','kc_07','kc_08','kc_09','kc_10','kc_11'])VO_MAP[XL3[k]]=k;
/* while Kaen fights, Maëlle's own battle and broom chatter is his instead */
const KCB={charge:['kc_01','kc_10'],start:['kc_06','kc_07'],hit:['kc_02','kc_09'],low:['kc_03'],combo:['kc_04','kc_08','kc_05'],lb:['kf_08'],exhausted:['kc_03'],revive:['kc_03']};
{const _bk=bark;bark=function(who,cat,prio,cd,chance){if(KM.on&&who==='@'){const L=KCB[cat];if(!L||CS.active||!P.alive)return false;const t=time;KM.bkT=KM.bkT||{};if(t<(KM.bkG||0)||t<(KM.bkT[cat]||0))return false;if(chance&&Math.random()>chance)return false;if(SAYQ.on||SAYQ.q.length)return false;
  KM.bkG=t+4.5;KM.bkT[cat]=t+Math.max(cd||0,9);epSay('Kaen',XL3[L[(Math.random()*L.length)|0]]);return true}return _bk.apply(this,arguments)}}
{const _ku2=kmUse;kmUse=function(i){const c0=KM.cd[i];_ku2.apply(this,arguments);if(!KM.on||KM.cd[i]<=c0)return;if(i===1||(i===0&&KM.combo===2))bark('@','charge',2,8,.45);if(!KM.said.st){KM.said.st=1;bark('@','start',2,0,1)}}}

/* ================= Vesper's prison: it rises out of the floor, cracks as you fight it, and explodes ================= */
Object.assign(SX.sets,{cageform:1,cagebreak:1,cagecrack:1});
x3Cage=function(p,col){const g=new THREE.Group();g.position.copy(p);scene.add(g);const C=col||0x7a3aff;const U={k:0,dmg:0,t:0,bars:[],spikes:[]};g.userData=U;
  const barM=new THREE.MeshStandardMaterial({color:0x0a0614,roughness:.25,metalness:.7,emissive:C,emissiveIntensity:.9});const coreM=new THREE.MeshBasicMaterial({color:0xe8d8ff,transparent:true,opacity:.85,blending:THREE.AdditiveBlending,depthWrite:false});
  const N=12,H=3.5;for(let i=0;i<N;i++){const a=i/N*TAU;const pts=[];for(let q=0;q<=12;q++){const y=q/12*H,tw=a+y*.32,r=1.3+.18*Math.sin(y/H*Math.PI)-.35*Math.max(0,y-H*.82)/(H*.18);pts.push(V3(Math.cos(tw)*r,y,Math.sin(tw)*r))}
    const cu=new THREE.CatmullRomCurve3(pts);const tg=new THREE.TubeGeometry(cu,30,.075,6,false),cg=new THREE.TubeGeometry(cu,30,.022,4,false);const b=new THREE.Mesh(tg,barM),c=new THREE.Mesh(cg,coreM);tg.setDrawRange(0,0);cg.setDrawRange(0,0);g.add(b);g.add(c);U.bars.push({b,c,n:tg.index.count,nc:cg.index.count,d:i*.045,a})}
  const ring0=new THREE.Mesh(new THREE.TorusGeometry(1.42,.1,8,48),barM);ring0.rotation.x=Math.PI/2;ring0.position.y=.08;g.add(ring0);const ring1=new THREE.Mesh(new THREE.TorusGeometry(.98,.08,8,40),barM);ring1.rotation.x=Math.PI/2;ring1.position.y=H;ring1.scale.setScalar(.01);g.add(ring1);
  for(let i=0;i<8;i++){const a=i/8*TAU;const s=new THREE.Mesh(new THREE.ConeGeometry(.08,.9,5),barM);s.position.set(Math.cos(a)*.95,H+.2,Math.sin(a)*.95);s.rotation.set(Math.sin(a)*.7,0,-Math.cos(a)*.7);s.scale.setScalar(.01);g.add(s);U.spikes.push(s)}
  const fm=new THREE.ShaderMaterial({uniforms:{uT:{value:0},uC:{value:new THREE.Color(C)},uK:{value:0},uO:{value:0}},transparent:true,depthWrite:false,blending:THREE.AdditiveBlending,side:THREE.DoubleSide,
    vertexShader:'varying vec3 vN;varying vec3 vP;void main(){vN=normalize(normalMatrix*normal);vP=position;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}',
    fragmentShader:'uniform float uT,uK,uO;uniform vec3 uC;varying vec3 vN;varying vec3 vP;void main(){float f=pow(1.-abs(vN.z),2.4);float band=smoothstep(.85,1.,sin(vP.y*9.-uT*3.)*.5+.5);float hx=abs(sin(atan(vP.z,vP.x)*12.+vP.y*4.))*abs(sin(vP.y*14.));float cr=step(.94,hx)*uK;vec3 c=uC*(.6+f*1.4)+vec3(1.)*(band*.25+cr*1.6+uK*f*.6);gl_FragColor=vec4(c,(f*.55+band*.12+cr*.8)*uO);}'});
  const sph=new THREE.Mesh(new THREE.SphereGeometry(1.75,40,24),fm);sph.position.y=1.55;g.add(sph);U.fm=fm;
  const rn=decal(runeTex,C,6.5,true,0);rn.position.y=.05;g.add(rn);const sc=decal(scorchTex,0x18082a,5.5,false,0);sc.position.y=.03;g.add(sc);const gl=glowSprite(C,7,0);gl.position.y=1.5;g.add(gl);
  const orb=[];for(let i=0;i<6;i++){const m=new THREE.Mesh(new THREE.PlaneGeometry(.55,.55),new THREE.MeshBasicMaterial({map:runeTex,color:C,transparent:true,opacity:0,blending:THREE.AdditiveBlending,depthWrite:false,side:THREE.DoubleSide}));g.add(m);orb.push(m)}
  sx('cageform',1,()=>sx('shield',.9));P.shake=Math.max(P.shake,.7);flash(p,C,20);
  for(let k=0;k<12;k++)SM.emit(V3(p.x+rand(-1.6,1.6),p.y+rand(0,.6),p.z+rand(-1.6,1.6)),{n:4,c0:0x40206a,c1:0x05030a,s0:1,s1:2.6,life:1.1,a:.6,up:3.2});
  const slam=[];addFx(null,9999,(f)=>{if(!g.parent){f.t=f.dur;return}const dt=.016;U.t+=dt;const t=U.t;
    rn.material.opacity=Math.min(.9,t*2);rn.scale.setScalar(.3+Math.min(1,t*1.6)*.7);rn.rotation.z+=dt*(.6+U.k*3);sc.material.opacity=Math.min(.75,t);
    for(const B of U.bars){const k=clamp((t-B.d)/.42,0,1),e=1-Math.pow(1-k,3);B.b.geometry.setDrawRange(0,Math.floor(B.n*e/3)*3);B.c.geometry.setDrawRange(0,Math.floor(B.nc*e/3)*3);if(k>=1&&!B.s){B.s=1;slam.push(1);if(slam.length%3===1)sx('clash',.28,null,{rate:rand(.6,.8)});SP.emit(V3(p.x+Math.cos(B.a)*1.3,p.y+H,p.z+Math.sin(B.a)*1.3),{n:8,c0:0xffffff,c1:C,speed:4,life:.4})}
      if(k<1&&k>0&&Math.random()<.6)SP.emit(V3(p.x+Math.cos(B.a+e*1.1)*1.35,p.y+e*H,p.z+Math.sin(B.a+e*1.1)*1.35),{c0:0xffffff,c1:C,s0:.3,s1:.04,life:.4})}
    const kt=clamp((t-.75)/.35,0,1);ring1.scale.setScalar(.01+kt);for(const s of U.spikes)s.scale.setScalar(.01+kt);if(kt>=1&&!U.locked){U.locked=1;flash(V3(p.x,p.y+H,p.z),0xffffff,10);P.shake=Math.max(P.shake,.5)}
    fm.uniforms.uT.value=t;fm.uniforms.uO.value=Math.min(1,Math.max(0,t-.5)*2)*(1+U.k*.8);fm.uniforms.uK.value=Math.min(1,U.dmg);gl.material.opacity=Math.min(.35,t*.4)+U.k*.25;
    barM.emissiveIntensity=.9+U.k*2.2+Math.sin(t*7)*.15+(U.dmg>.6&&Math.random()<.15?2:0);coreM.opacity=.7+U.k*.3;
    orb.forEach((m,i)=>{const a=t*.9+i/6*TAU;m.position.set(Math.cos(a)*2.05,.9+(i%3)*.7+Math.sin(t*2+i)*.12,Math.sin(a)*2.05);m.lookAt(camera.position);m.material.opacity=Math.min(.8,Math.max(0,t-.9))*(.6+U.k*.4)});
    g.rotation.y+=dt*.12;g.position.x=p.x+(Math.random()-.5)*U.k*.18;g.position.z=p.z+(Math.random()-.5)*U.k*.18;U.k=Math.max(0,U.k-dt*2);
    if(Math.random()<.3)SM.emit(V3(p.x+rand(-1.4,1.4),p.y+rand(0,.5),p.z+rand(-1.4,1.4)),{c0:0x3a2060,c1:0x05030a,s0:.6,s1:1.6,life:.9,a:.4,up:1.2})});
  X3.cages.push(g);return g};
{const _st=x3Struggle;x3Struggle=function(){_st.apply(this,arguments);const c=X3.cages[0];if(!c)return;const U=c.userData;U.dmg=Math.min(1,(U.dmg||0)+.03);if(time>(U.cr||0)){U.cr=time+.35;sx('cagecrack',.55,null,{rate:rand(.9,1.2)})}
  const p=c.position;const a=rand(0,TAU);SP.emit(V3(p.x+Math.cos(a)*1.3,p.y+rand(.4,3),p.z+Math.sin(a)*1.3),{n:6,c0:0xffffff,c1:0xc0a0ff,speed:6,life:.4,grav:6})}}
x3Shatter=function(){for(const g of X3.cages){const p=g.position.clone();const U=g.userData||{};const C=0x9a60ff;
    for(const B of U.bars||[]){const segs=4;for(let q=0;q<segs;q++){const y=(q+.5)/segs*3.5,a=B.a+y*.32;const m=new THREE.Mesh(new THREE.BoxGeometry(.13,3.5/segs*.92,.13),new THREE.MeshStandardMaterial({color:0x140a24,emissive:C,emissiveIntensity:2,roughness:.3,metalness:.6,transparent:true}));
      m.position.set(p.x+Math.cos(a)*1.3,p.y+y,p.z+Math.sin(a)*1.3);scene.add(m);const v=V3(Math.cos(a),rand(.3,1.1),Math.sin(a)).multiplyScalar(rand(7,13));const w=V3(rand(-9,9),rand(-9,9),rand(-9,9));
      addFx(m,1.7,(f,k)=>{v.y-=22*.016;m.position.addScaledVector(v,.016);m.rotation.x+=w.x*.016;m.rotation.y+=w.y*.016;m.rotation.z+=w.z*.016;m.material.opacity=1-k;m.material.emissiveIntensity=2*(1-k);if(Math.random()<.3)SP.emit(m.position,{c0:0xffffff,c1:C,s0:.25,s1:.03,life:.3})},()=>{scene.remove(m);m.geometry.dispose();m.material.dispose()})}}
    scene.remove(g);const sp=new THREE.Mesh(new THREE.SphereGeometry(1.75,32,18),new THREE.MeshBasicMaterial({color:0xe8d8ff,transparent:true,opacity:.6,blending:THREE.AdditiveBlending,depthWrite:false,side:THREE.DoubleSide}));sp.position.set(p.x,p.y+1.55,p.z);
    addFx(sp,.55,(f,k)=>{sp.scale.setScalar(1+k*4.5);sp.material.opacity=.6*(1-k)},()=>{scene.remove(sp);sp.geometry.dispose()});
    const rg=new THREE.Mesh(new THREE.RingGeometry(.9,1.15,64),new THREE.MeshBasicMaterial({color:0xd0b0ff,transparent:true,blending:THREE.AdditiveBlending,depthWrite:false,side:THREE.DoubleSide}));rg.rotation.x=-Math.PI/2;rg.position.set(p.x,p.y+.12,p.z);
    addFx(rg,.9,(f,k)=>{rg.scale.setScalar(1+k*14);rg.material.opacity=1-k},()=>{scene.remove(rg);rg.geometry.dispose()});
    const lb=glowSprite(0xffffff,4,1,false);lb.position.set(p.x,p.y+1.5,p.z);scene.add(lb);addFx(lb,.7,(f,k)=>{lb.scale.setScalar(4+k*26);lb.material.opacity=1-k},()=>scene.remove(lb));
    SP.emit(V3(p.x,p.y+1.5,p.z),{n:260,c0:0xffffff,c1:0x9a60ff,speed:15,life:1.3,s0:.7,s1:.06,grav:5});SM.emit(V3(p.x,p.y+1.2,p.z),{n:30,c0:0x50307a,c1:0x05030a,s0:2,s1:5,life:1.4,a:.5,up:2,speed:5});
    flash(p,0xffffff,34);P.shake=Math.max(P.shake,1.3);hitStop=Math.max(hitStop,.12)}
  if(X3.cages.length){sx('cagebreak',1,()=>{sx('shbreak',1);try{sfx.shatter()}catch(x){}})}X3.cages=[]};

/* ================= real distances: she is just very, very fast ================= */
/* game metres to real miles, by where you are: Calais to Folkestone 11 miles, Folkestone to London 24, St Paul's to Notting Hill 3 */
function distReal(u){if(MODE==='open')return null;const z=P.pos.z;if(CH2.zone!=='north'){const km=u*.0105;return km<1?Math.max(50,Math.round(km*1000/50)*50)+' m':km.toFixed(km<10?1:0)+' km'}
  const mi=u*(z>CLIFF_Z?11/(CAL_SHORE-CLIFF_Z):z>LON_Z?24/(CLIFF_Z-LON_Z):3/524);return mi<.1?Math.max(20,Math.round(mi*1760/10)*10)+' yd':mi.toFixed(mi<10?1:0)+' mi'}
const distFmt=t=>typeof t==='string'?t.replace(/· (\d+)m\b/g,(m,n)=>{const r=distReal(+n);return r?'· '+r:m}):t;
{const _ot=objTick;objTick=function(dt){const f=CH2.obj;if(f&&!f._mi){const g=function(){return distFmt(f.apply(this,arguments))};g._mi=1;CH2.obj=g}return _ot.apply(this,arguments)}}
/* small talk about speed */
Object.assign(XL3,{m9_01:"Eleven miles of sea, and we're already over Kent. London's another twenty-four.",k9_01:'Do you even realise how fast you are? On turbo, that broom clears nearly a thousand miles an hour. You cruise at four hundred.',
  m9_02:'Funny thing about being a witch, you stop noticing. I run a lot faster than normal people too, you know.',k9_02:"Yeah. With that magic, you'd outrun Usain Bolt by far.",m9_03:"Don't tell him. He'd want a rematch.",k9_03:"Three miles to Notting Hill. For you, that's a few seconds."});
for(const k of['m9_01','k9_01','m9_02','k9_02','m9_03','k9_03'])VO_MAP[XL3[k]]=k;
{const _mt=muTick;muTick=function(dt){_mt(dt);if(!started||MODE==='open'||CS.active||CH2.zone!=='north'||!P.alive||CH2.chase||XII.said.spd)return;if(CH2.st<8||CH2.st>12||!P.flying||P.pos.z>CLIFF_Z-120||P.pos.z<LON_Z+500)return;
  if(SAYQ.on||SAYQ.q.length)return;XII.said.spd=1;const kw=XII.solid?'Kaen':"Kaen's Spirit";epSay('@',XL3.m9_01);epSay(kw,XL3.k9_01);epSay('@',XL3.m9_02);epSay(kw,XL3.k9_02);epSay('@',XL3.m9_03)}}
{const st=document.createElement('style');st.textContent='@media (max-width:700px){#kmBar .row{gap:4px}#kmBar button{width:42px;height:42px}}@media (max-width:430px){#kmBar .row{gap:3px}#kmBar button{width:37px;height:40px}#kmBar button em{display:none}}';document.head.appendChild(st)}
/* every boss with its own theme plays only that theme: no generic boss track while it loads */
{const _bw=bmWant;bmWant=function(){if(started&&MODE!=='open'&&bossRef&&!bossRef.dead&&BTH[bossRef.type]){bmTrack(BTH[bossRef.type]);return null}return _bw.apply(this,arguments)}}
{const _mw=muWant;muWant=function(){if(started&&MODE!=='open'&&bossRef&&!bossRef.dead&&BTH[bossRef.type]){const k=BTH[bossRef.type];return bmTrack(k).ok?k:null}return _mw.apply(this,arguments)}}

/* ================= main menu music ================= */
const MMU={t:null,v:0,arm:0};
function mmuArm(){if(started||MMU.t)return;MMU.arm=1;try{initAudio()}catch(x){}MMU.t=bmTrack('mus_menu')}
addEventListener('pointerdown',()=>{if(!started)mmuArm()},true);addEventListener('keydown',()=>{if(!started)mmuArm()},true);
function mmuTick(dt){const t=MMU.t;if(!t||!AC)return;dt=Math.min(dt,.1);const want=!started&&!muted&&musicOn?.36:0;
  if(want>0&&t.ok&&!t.playing){bmStart(t);MMU.v=0}if(!t.playing||!t.g)return;MMU.v+=(want-MMU.v)*Math.min(1,dt*(want>MMU.v?.45:2.4));t.g.gain.value=MMU.v;if(!want&&MMU.v<.004){bmStop(t);MMU.v=0;if(started)MMU.t=null}}
{let last=0;const loop=now=>{const dt=last?(now-last)/1000:0;last=now;try{mmuTick(dt)}catch(x){}requestAnimationFrame(loop)};requestAnimationFrame(loop)}

/* ================= Maëlle never says "Hang on, Kaen" once he is back ================= */
{const _bp=bkPick;bkPick=function(who,cat){let r=_bp.apply(this,arguments);if(who==='@'&&r&&r[0]==='mz09'&&(CH2.st>=11||(typeof XII!=='undefined'&&XII.solid))){for(let i=0;i<4&&r&&r[0]==='mz09';i++)r=_bp.apply(this,arguments);if(r&&r[0]==='mz09')r=null}return r}}

/* ================= while you play Kaen, only Kaen talks (Maëlle's cage callouts aside) ================= */
{const _es=epSay;epSay=function(who,text,prio){if(KM.on&&(who==='@'||who===HERO.name||who==='Maëlle')){const k=VO_MAP[text]||'';if(!/^m7_/.test(k))return}return _es.apply(this,arguments)}}
{const _bo=banterOk;banterOk=function(){if(KM.on||X4C.on)return false;return _bo.apply(this,arguments)}}
Object.assign(XL3,{kc_12:'Is that all the Crown gave you?',kc_13:'Void... swallow him!',kc_14:"You won't touch me.",kc_15:'Too slow!',kc_16:'Cut through!',kc_17:'Guardians, with me!',kc_18:"Maëlle, hold on. I'm getting you out of there.",kc_19:'Feel ten years of fury!',kc_20:'Spin... and break!',kc_21:'You hide behind a cage, Vesper. Coward.'});
for(let i=12;i<=21;i++){const k='kc_'+i;VO_MAP[XL3[k]]=k}
Object.assign(KCB,{charge:['kc_01','kc_10','kc_16','kc_12'],start:['kc_06','kc_07','kc_21'],low:['kc_03','kc_18'],combo:['kc_04','kc_08','kc_05','kc_15'],lb:['kf_08','kc_19']});
const KMV={kf_06:['kf_06','kc_16','kc_16'],kf_09:['kf_09','kc_13','kc_13'],kf_10:['kf_10','kc_14','kc_14'],kf_11:['kf_11','kc_15','kc_15'],kf_01:['kf_01','kc_17','kc_17'],kf_08:['kf_08','kc_19'],kf_03:['kf_03','kc_04','kc_05']};
{const _xb=x3Bark;x3Bark=function(who,k){if(KM.on&&who==='Kaen'&&KMV[k]){const L=KMV[k];k=L[(Math.random()*L.length)|0]}return _xb.call(this,who,k)}}
{const _mt=muTick;muTick=function(dt){_mt(dt);if(!KM.on||CS.active||!P.alive||X3.phase!==2)return;KM.tt=(KM.tt==null?14:KM.tt)-dt;if(KM.tt>0)return;if(SAYQ.on||SAYQ.q.length){KM.tt=3;return}
  const L=['kc_12','kc_18','kc_21','kc_06','kc_07','kc_12','kc_21'].filter(k=>k!==KM.tl);const k=L[(Math.random()*L.length)|0];KM.tl=k;KM.tt=rand(15,23);epSay('Kaen',XL3[k])}}

/* ================= keys 8 and 9 always reach Kaen's skills ================= */
{const _sk=slotOfKey;slotOfKey=function(e){if(KM.on&&!(e.ctrlKey||e.metaKey||e.altKey)){const k=SLOTCODE[e.code];return k===undefined||k>=KM_AB.length?-1:k}return _sk.apply(this,arguments)}}

/* ================= Kaen's ninth skill: Crescent Storm ================= */
KM_AB.push(['Crescent Storm','M12 2a10 10 0 1 0 10 10h-3a7 7 0 1 1-7-7zM12 7l1.5 3.5L17 12l-3.5 1.5L12 17l-1.5-3.5L7 12l3.5-1.5z']);KM_COST.push(35);KM_CD.push(18);KM.cd.push(0);
function kmStormBlade(a0,t,dl){after(dl,()=>{if(!KM.on)return;const m=new THREE.Mesh(new THREE.TorusGeometry(1.1,.1,6,24,Math.PI),new THREE.MeshBasicMaterial({color:0xd0b0ff,transparent:true,blending:THREE.AdditiveBlending,depthWrite:false,side:THREE.DoubleSide}));
  const p=headOf(P.pos,1.2);m.position.copy(p);scene.add(m);const v=V3(Math.sin(a0),.3,Math.cos(a0)).multiplyScalar(18);let done=false;
  addFx(m,1.9,(f,k)=>{if(done){f.t=f.dur;return}if(t&&!t.dead&&f.t>.22){const to=eCenter(t).sub(p);const L=to.length();if(L<1.6+t.def.r*.6){done=true;damageEnemy(t,kmDmg(t,.007),'#e8d0ff');SP.emit(eCenter(t),{n:30,c0:0xffffff,c1:0x9050ff,speed:9,life:.5});flash(eCenter(t),0xa050ff,8);hitStop=Math.max(hitStop,.03);sx('clash',.25,null,{rate:rand(1.5,1.9)});return}v.lerp(to.normalize().multiplyScalar(36),.14)}
    p.addScaledVector(v,.016);m.position.copy(p);m.rotation.x=Math.PI/2;m.rotation.z+=.7;m.material.opacity=1-Math.max(0,k-.8)*5;SP.emit(p,{c0:0xffffff,c1:0x8a40ff,s0:.35,s1:.04,life:.3})},()=>{scene.remove(m);m.geometry.dispose()})})}
function kmStorm(){const A=KM.a;try{A.fire('Melee_Hook',.5)}catch(x){}P.invuln=Math.max(P.invuln,.7);sx('riser',.6,null,{rate:1.5});sx('kame',.45,null,{rate:1.1,cut:1.6});flash(P.pos,0xb070ff,22);P.shake=Math.max(P.shake,.6);
  const g=new THREE.Group();for(let k=0;k<3;k++){const m=new THREE.Mesh(new THREE.TorusGeometry(2.4+k*.9,k?.05:.14,6,40,Math.PI*1.3),new THREE.MeshBasicMaterial({color:k?0xd8c0ff:0x8a40ff,transparent:true,opacity:.9,blending:THREE.AdditiveBlending,depthWrite:false,side:THREE.DoubleSide}));m.rotation.x=Math.PI/2;m.rotation.z=k*2.1;g.add(m)}
  g.position.set(P.pos.x,P.pos.y+1.1,P.pos.z);scene.add(g);let tick=0;
  addFx(g,1.3,(f,k)=>{g.position.set(P.pos.x,P.pos.y+1.1,P.pos.z);g.children.forEach((m,j)=>{m.rotation.z+=(.5+j*.12)*(j%2?-1:1);m.material.opacity=.9*(1-Math.max(0,k-.7)/.3)});g.scale.setScalar(1+k*.8);
    for(let q=0;q<2;q++){const an=rand(0,TAU),r=rand(1.5,4.5);SP.emit(V3(P.pos.x+Math.sin(an)*r,P.pos.y+rand(.3,2),P.pos.z+Math.cos(an)*r),{c0:0xffffff,c1:0x9050ff,s0:.5,s1:.05,life:.4,speed:3})}
    tick-=.016;if(tick<=0){tick=.22;for(const e of enemies){if(e.dead)continue;const d=Math.hypot(e.pos.x-P.pos.x,e.pos.z-P.pos.z);if(d<5.5+e.def.r&&Math.abs(eCenter(e).y-P.pos.y)<5){damageEnemy(e,kmDmg(e,.0045),'#e0c0ff');SP.emit(eCenter(e),{n:16,c0:0xffffff,c1:0xa050ff,speed:7,life:.4})}}}},
    ()=>{scene.remove(g);g.traverse(o=>{if(o.geometry)o.geometry.dispose()})});
  after(.85,()=>{if(!KM.on)return;const t=kmLock(120);for(let j=0;j<6;j++)kmStormBlade(P.face+j/6*TAU,t,j*.05);sx('impact',.5,null,{rate:1.2});ring(V3(P.pos.x,P.pos.y,P.pos.z),0xc080ff,1,10,.4)})}
{const _ku=kmUse;kmUse=function(i){if(i!==8)return _ku.apply(this,arguments);if(!KM.on||CS.active||!P.alive||KM.cd[8]>0)return;if(KM.en<KM_COST[8]){toast('Not enough strength yet. Land a few sword hits.');return}
  KM.en-=KM_COST[8];KM.cd[8]=KM_CD[8];kmStorm();x3Bark('Kaen','kc_20')}}

/* ================= the Void Shield you can actually see: hex dome, ripples, BLOCKED ================= */
kmShieldFx=function(){if(KM.shM){KM.shM.visible=true;KM.shM.scale.setScalar(.3);return}
  const tex=new THREE.CanvasTexture(mkCanvas(256,128,(x,w,h)=>{x.strokeStyle='#fff';x.lineWidth=2.5;const R=w/18,hh=R*Math.sqrt(3);for(let r=-1;r<h/(hh/2)+2;r++)for(let q=-1;q<7;q++){const cx=q*R*3+(r%2?R*1.5:0),cy=r*hh/2;x.beginPath();for(let a=0;a<6;a++){const t=a/6*TAU;x.lineTo(cx+Math.cos(t)*R*.92,cy+Math.sin(t)*R*.92)}x.closePath();x.stroke()}}));
  tex.wrapS=tex.wrapT=THREE.RepeatWrapping;
  const mat=new THREE.ShaderMaterial({uniforms:{map:{value:tex},t:{value:0},hit:{value:0},fade:{value:1},col:{value:new THREE.Color(0x9a66ff)}},
    vertexShader:'varying vec3 vN;varying vec3 vV;varying vec2 vUv;void main(){vUv=uv;vec4 mv=modelViewMatrix*vec4(position,1.);vN=normalize(normalMatrix*normal);vV=normalize(-mv.xyz);gl_Position=projectionMatrix*mv;}',
    fragmentShader:'uniform sampler2D map;uniform float t,hit,fade;uniform vec3 col;varying vec3 vN;varying vec3 vV;varying vec2 vUv;void main(){float f=pow(1.-abs(dot(vN,vV)),2.);float hx=texture2D(map,vUv*vec2(4.,2.)+vec2(t*.03,0.)).r;float band=pow(max(0.,1.-abs(fract(vUv.y*1.2-t*.45)-.5)*7.),2.);float a=(f*.85+hx*(.2+f*.75)+band*hx*.7+hit*(.22+hx*.6))*fade;gl_FragColor=vec4(mix(col,vec3(1.),hit*.35+f*.15)*(1.+hit*.4),clamp(a,0.,.9));}',
    transparent:true,blending:THREE.AdditiveBlending,depthWrite:false,side:THREE.DoubleSide});
  const m=new THREE.Mesh(new THREE.SphereGeometry(1.85,40,28),mat);
  const s=new THREE.Mesh(new THREE.SphereGeometry(1.7,24,16),new THREE.MeshBasicMaterial({color:0x5a28c0,transparent:true,opacity:.12,blending:THREE.AdditiveBlending,depthWrite:false}));m.add(s);
  const gr=decal(runeTex,0xa070ff,4.4,true,.8);gr.position.y=-1.1;m.add(gr);m.position.y=1.15;m.scale.setScalar(.3);KM.shM=m;KM.a.g.add(m)};
{const _mt=muTick;muTick=function(dt){_mt(dt);const m=KM.shM;if(!m||!m.visible||!m.material.uniforms)return;const U=m.material.uniforms;U.t.value+=dt;U.hit.value=Math.max(0,U.hit.value-dt*3.2);U.fade.value=KM.sh<1.2?.55+.45*Math.sin(time*22):1;if(m.children[1])m.children[1].rotation.z+=dt*1.2;
  if(Math.random()<.35){const a=rand(0,TAU),y=rand(-.6,1.6);SP.emit(V3(P.pos.x+Math.sin(a)*1.8,P.pos.y+1.15+y,P.pos.z+Math.cos(a)*1.8),{c0:0xe8dcff,c1:0x7040e0,s0:.25,s1:.03,life:.45,up:.6})}}}
{const _dp=damagePlayer;damagePlayer=function(a){const sh=KM.on&&KM.sh>0&&P.alive&&!CS.active&&P.invuln<=0&&a>0&&KM.shM;const r=_dp.apply(this,arguments);
  if(sh&&KM.shM.material.uniforms){KM.shM.material.uniforms.hit.value=1;KM.shM.scale.setScalar(1.2);SP.emit(headOf(P.pos,1.2),{n:20,c0:0xffffff,c1:0x9a60ff,speed:6,life:.35});
    if(!KM.blkT||time>KM.blkT){KM.blkT=time+.4;floatText(headOf(P.pos,2.7),'BLOCKED','#d4b8ff',true);sx('shield',.35,null,{rate:rand(1.5,1.9)});ring(V3(P.pos.x,P.pos.y,P.pos.z),0xb090ff,1,3.4,.25)}}return r}}

/* ================= after Vesper: E or Enter starts the talk right away ================= */
addEventListener('keydown',e=>{if(!started||MODE==='open'||CS.active||CH2.st!==13||KM.on||e.repeat)return;if(e.code==='KeyE'||e.code==='Enter'||e.code==='NumpadEnter'){X4.goT=1}},true);

/* ================= chapter switches restore the Tower: chained Kaen back in place ================= */
function nzTowerRestore(){const g=NZ.ghost;if(g){g.g.visible=true;g.g.scale.setScalar(1);if(NZ.green){g.g.position.set(NZ.green.x,0,NZ.green.z);g.g.rotation.y=Math.PI*.15}try{g.setBase('Crouch_Idle_Loop',.2);g.update(.3)}catch(x){}}
  for(const l of NZQ.links){l.visible=true;l.scale.setScalar(1);l.rotation.x=0;if(l.userData.p0)l.position.copy(l.userData.p0);if(l.material&&'emissiveIntensity' in l.material)l.material.emissiveIntensity=.3}NZQ.dead=0;NZQ.hits=0;if(NZQ.spirit)NZQ.spirit.ty=-12}
{const _ac=applyChapter;applyChapter=function(id){const r=_ac.apply(this,arguments);if(MODE==='open')return r;if(CH2.st===5&&CH2.zone==='north')nzTowerRestore();if(CH2.st<5){if(NZ.ghost)NZ.ghost.g.visible=false;for(const l of NZQ.links)l.visible=false;if(NZ.crown)NZ.crown.visible=false;NZ.afterDone=0}
  if(LYR.a){const want=(CH2.zone==='paris'&&LYR.home)||(CH2.zone==='north'&&CH2.st>=11)||CH2.zone==='latin';if(!want)LYR.a.g.visible=false}LYR.pin=0;KFW.pin=0;X4.haze=0;return r}}

/* ================= the Warden catches up: CAST ANY SPELL, QUICK! ================= */
{const _tc=tryCast;tryCast=function(i){const m0=P.mana;const r=_tc.apply(this,arguments);if(P.mana!==m0)EP_CAST=performance.now();return r}}
function wdQteWin(first){return ({easy:1500,medium:1100,hard:800}[DIFF]||1100)+(first?700:0)}
let WQ=null;
function wdQte(mode,lim){if(!WQ){const st=document.createElement('style');st.textContent=`
#wdQte{position:fixed;left:0;right:0;top:34%;z-index:45;pointer-events:none;display:none;flex-direction:column;align-items:center;gap:10px;font-family:'Bangers',Impact,'Arial Black',sans-serif}
#wdQte.on{display:flex}
#wdQte .a{font-size:clamp(40px,7.5vw,88px);letter-spacing:.05em;line-height:.95;color:#eaffef;-webkit-text-stroke:2px #062612;paint-order:stroke fill;text-shadow:4px 4px 0 #19c860,8px 8px 0 rgba(0,20,8,.85),0 0 40px rgba(60,255,140,.75);transform:skew(-9deg);animation:wqIn .32s cubic-bezier(.2,1.7,.4,1) both,wqShake .09s linear .32s infinite}
#wdQte .b{font-size:clamp(22px,3.4vw,38px);letter-spacing:.14em;color:#fff;-webkit-text-stroke:1.5px #062612;paint-order:stroke fill;text-shadow:3px 3px 0 #0a7a3a;transform:skew(-9deg);animation:wqPulse .28s ease-in-out infinite alternate}
#wdQte .k{display:flex;gap:6px;font:600 13px Outfit,system-ui,sans-serif;color:#d8ffe4;opacity:.9}
#wdQte .k kbd{display:inline-block;min-width:20px;padding:2px 6px;border-radius:5px;background:rgba(0,0,0,.55);border:1px solid rgba(120,255,170,.5)}
#wdQte .bar{width:min(420px,70vw);height:12px;border-radius:99px;background:rgba(0,0,0,.6);box-shadow:0 0 0 2px rgba(120,255,170,.5),0 0 22px rgba(60,255,140,.45);overflow:hidden;transform:skew(-12deg)}
#wdQte .bar i{display:block;height:100%;width:100%;background:linear-gradient(90deg,#ff3a4a,#ffd040 35%,#5dff9a);transform-origin:left center}
#wdQte.win .a{color:#fff;text-shadow:4px 4px 0 #19c860,0 0 60px #7dffb0;animation:wqBlast .55s cubic-bezier(.1,.8,.2,1) both}
#wdQte.fail .a{color:#ffe8ea;-webkit-text-stroke:2px #2a0006;text-shadow:4px 4px 0 #e0102e,8px 8px 0 rgba(30,0,4,.85),0 0 46px rgba(255,30,60,.8);animation:wqSlam .5s cubic-bezier(.2,1.6,.4,1) both,wqShake .06s linear .1s 6}
#wdQte.win .b,#wdQte.fail .b,#wdQte.win .bar,#wdQte.fail .bar,#wdQte.win .k,#wdQte.fail .k{display:none}
#wdFlash{position:fixed;inset:0;z-index:44;pointer-events:none;opacity:0;background:radial-gradient(circle at 50% 45%,rgba(120,255,170,.0) 30%,rgba(10,60,30,.55) 100%)}
#wdFlash.on{opacity:1;transition:opacity .15s}#wdFlash.red{background:radial-gradient(circle at 50% 50%,rgba(255,40,60,.15),rgba(120,0,10,.7));opacity:1;transition:none}
@keyframes wqIn{0%{opacity:0;transform:skew(-9deg) scale(2.6) rotate(-4deg)}100%{opacity:1;transform:skew(-9deg) scale(1)}}
@keyframes wqShake{0%{translate:0 0}25%{translate:3px -2px}50%{translate:-3px 2px}75%{translate:2px 3px}100%{translate:0 0}}
@keyframes wqPulse{from{transform:skew(-9deg) scale(1)}to{transform:skew(-9deg) scale(1.12)}}
@keyframes wqBlast{0%{opacity:1;transform:skew(-9deg) scale(1)}100%{opacity:0;transform:skew(-9deg) scale(2.2);filter:blur(4px)}}
@keyframes wqSlam{0%{opacity:0;transform:skew(-9deg) scale(.4)}100%{opacity:1;transform:skew(-9deg) scale(1)}}`;document.head.appendChild(st);
    WQ=document.createElement('div');WQ.id='wdQte';WQ.innerHTML='<div class="a"></div><div class="b">QUICK!</div><div class="bar"><i></i></div><div class="k"></div>';document.body.appendChild(WQ);const fl=document.createElement('div');fl.id='wdFlash';document.body.appendChild(fl);WQ.fl=fl}
  const a=WQ.querySelector('.a'),bar=WQ.querySelector('.bar i'),fl=WQ.fl;clearTimeout(WQ._t);
  if(mode==='on'){WQ.className='on';a.textContent='CAST ANY SPELL!';WQ.querySelector('.k').innerHTML=typeof isTouch!=='undefined'&&isTouch?'tap any spell':'<kbd>1</kbd>-<kbd>9</kbd> or click';
    void WQ.offsetWidth;bar.style.transition='none';bar.style.transform='scaleX(1)';void bar.offsetWidth;bar.style.transition=`transform ${lim}ms linear`;bar.style.transform='scaleX(0)';fl.className='on';sx('riser',.5,null,{rate:1.8});return}
  if(mode==='win'){WQ.className='on win';a.textContent='COUNTERED!';fl.className='';WQ._t=setTimeout(()=>{WQ.className=''},600);return}
  if(mode==='fail'){WQ.className='on fail';a.textContent='TOO SLOW!';fl.className='red';setTimeout(()=>{fl.style.transition='opacity .6s';fl.className='';setTimeout(()=>fl.style.transition='',650)},120);WQ._t=setTimeout(()=>{WQ.className=''},1100);return}
  WQ.className='';fl.className=''}
/* a hit that hurts: easy 450 (never kills), medium 550, hard 650 */
function wdSurgeHit(){if(!P.alive)return;let a=({easy:450,medium:550,hard:650}[DIFF]||550);if(DIFF==='easy')a=Math.min(a,maxHP()*.6);
  if(P.shield>0){const ab=Math.min(P.shield,a*.5);P.shield-=ab;a-=ab}P.hp-=a;if(DIFF==='easy'&&P.hp<1)P.hp=1;a=Math.round(a);
  P.lastHit=time;P.shake=1.5;try{sfx.hit()}catch(x){}try{vib(80)}catch(x){}vig.classList.remove('hit');void vig.offsetWidth;vig.classList.add('hit');floatText(V3(P.pos.x,P.pos.y+3.4,P.pos.z),`-${a}`,'#ff3a50',true);
  SP.emit(headOf(P.pos,1),{n:70,c0:0xffffff,c1:0x30ff70,speed:10,life:.6});flash(headOf(P.pos,1),0x40ff80,16);sx('impact',1,null,{rate:.6});if(P.hp<=0)die();else P.invuln=Math.max(P.invuln,.8)}
{const _ae=epArrive;epArrive=function(){if(WQ){WQ.className='';WQ.fl.className=''}return _ae.apply(this,arguments)}}
{const _rv=revive;revive=function(){if(WQ){WQ.className='';WQ.fl.className=''}return _rv.apply(this,arguments)}}

/* ================= Resume always works: answers the press itself, whatever is on top ================= */
{let skipClick=0;const rb=$('resumeBtn');const go=e=>{if(!paused)return;e.preventDefault();e.stopPropagation();skipClick=performance.now();
  if(CS.active||!P.alive){paused=false;$('pause').classList.add('hidden');document.body.classList.remove('isPaused');return}togglePause()};
  rb.addEventListener('pointerup',go);rb.addEventListener('click',e=>{if(performance.now()-skipClick<500){e.stopImmediatePropagation();return}},true)}

/* ================= the Tower's questions always come back (pause, focus loss, anything) ================= */
{let since=0;setInterval(()=>{if(!started||!NZQ.quiz||CS.active||paused||!P.alive){since=0;return}const c=document.getElementById('tutCard');if(c&&c.classList.contains('on')&&c.querySelector('[data-a]')){since=0;return}const now=performance.now();if(!since){since=now;return}if(now-since>700){since=0;try{epAsk()}catch(x){}}},250)}

/* ================= The Last Lantern: cloaked until Maëlle and Lyra tear the cloak open together ================= */
Object.assign(XL3,{ly56:"Stop. It's here. Something is humming between these houses.",m8_12:"I don't see anything. Just another pretty house.",k8_09:"That's the point. A cloak like that was made to fool the Crown itself.",
  ly57:"I can't break it alone. Neither can you. Give me your hands, Maëlle. Pour everything in.",ly58:'More! Keep going!',m8_13:'Come on... open!',ly59:'Now! Let it go!',m8_14:'Okay... that is a pub. That was not a pub a second ago.',ly60:"The Last Lantern. He's inside. I can feel him."});
for(const k of['ly56','m8_12','k8_09','ly57','ly58','m8_13','ly59','m8_14','ly60'])VO_MAP[XL3[k]]=k;
SX.sets.chan=1;SX.sets.unveil=1;SX.sets.pubdoor=1;SX.sets.lampon=1;SX.sets.rune=1;
NH_PUB.door=V3(NH_PUB.fx+.9,0,NH_PUB.z);NH_PUB.side=NH_PUB.door;
function nhPubSeen(){try{return localStorage.getItem('sorc_pubrev')==='1'}catch(x){return false}}
function nhUncloak(instant){if(NH.shown)return;NH.shown=true;try{localStorage.setItem('sorc_pubrev','1')}catch(x){}if(NH.cloakBox){const i=boxes.indexOf(NH.cloakBox);if(i>=0)boxes.splice(i,1)}
  for(const b of NH.pubBoxes||[])boxes.push(b);if(CH2.st>=15){NH.entered=1;if(NH.door)NH.door.rotation.y=-1.75}if(NH.doorBox&&!NH.entered)boxes.push(NH.doorBox);if(NH.cloak)NH.cloak.visible=false;if(NH.shim)NH.shim.m.visible=false;if(NH.pubG)NH.pubG.visible=true;if(!instant)nhLights(.12,true)}
/* light level: 0 dark, 1 everything burning */
function nhLights(v,instant){NH.lit=v;for(const[m,a,b]of NH.litM||[])m.emissiveIntensity=lerp(a,b,v);for(const L of NH.lamps||[]){L.s.material.opacity=L.o*v;if(L.m)L.m.emissiveIntensity=.05+(L.e||1)*v}for(const[pl,i]of NH.pl||[])pl.intensity=i*Math.max(v,.15)}
function nhLightsOn(){const L=NH.lamps||[];sx('lampon',.9);for(const l of L)l.s.material.opacity=0;let t=0;addFx(null,4.2,(f,k)=>{t=f.t;for(const l of L){const on=clamp((t-l.d)/.25,0,1);const fl=on>0&&on<1?(Math.random()*.6+.4):1;l.s.material.opacity=l.o*on*fl;if(l.m)l.m.emissiveIntensity=.05+(l.e||1)*on*fl}
    const v=clamp(t/3.6,0,1);for(const[m,a,b]of NH.litM||[])m.emissiveIntensity=lerp(a,b,v);for(const[pl,i]of NH.pl||[])pl.intensity=i*Math.max(.15,v)},()=>nhLights(1,true))}
/* ---------- ritual UI ---------- */
let RIT={on:0};
function ritUI(){if(RIT.ui)return RIT.ui;const st=document.createElement('style');st.textContent=`
#ritUI{position:fixed;left:0;right:0;bottom:15%;z-index:46;display:none;flex-direction:column;align-items:center;gap:10px;pointer-events:none;font-family:'Bangers',Impact,'Arial Black',sans-serif}
#ritUI.on{display:flex}#ritUI .h{font-size:clamp(30px,5vw,58px);letter-spacing:.06em;color:#fff6ff;-webkit-text-stroke:1.6px #1c0630;paint-order:stroke fill;text-shadow:3px 3px 0 #a04cff,6px 6px 0 rgba(14,0,30,.8),0 0 30px rgba(190,120,255,.7);transform:skew(-8deg)}
#ritUI .h.pop{animation:rtPop .35s cubic-bezier(.2,1.7,.4,1)}#ritUI .s{font:600 14px Outfit,system-ui,sans-serif;color:#efe4ff;letter-spacing:.08em;text-shadow:0 2px 8px #000}
#ritUI .bar{position:relative;width:min(460px,76vw);height:16px;border-radius:99px;background:rgba(10,0,20,.65);box-shadow:0 0 0 2px rgba(200,160,255,.55),0 0 26px rgba(170,110,255,.45);overflow:hidden;transform:skew(-12deg)}
#ritUI .bar i{position:absolute;left:0;top:0;bottom:0;width:0;background:linear-gradient(90deg,#8a3cff,#d080ff 45%,#ffe08a 70%,#b8ff7a);box-shadow:0 0 18px #c890ff}
#ritUI .runes{display:flex;gap:12px}#ritUI .runes b{width:58px;height:58px;display:grid;place-items:center;border-radius:14px;font:700 30px Outfit,system-ui,sans-serif;color:#e8dcff;background:rgba(20,6,40,.7);box-shadow:0 0 0 2px rgba(180,130,255,.5);transition:transform .15s,background .15s}
#ritUI .runes b.ok{background:linear-gradient(160deg,#ffe48a,#b06cff);color:#1a0628;transform:scale(1.12);box-shadow:0 0 24px #ffd070}#ritUI .runes b.cur{box-shadow:0 0 0 3px #fff,0 0 22px #c890ff;animation:rtPulse .5s ease-in-out infinite alternate}
#ritUI .runes b.bad{background:#7a1020;animation:rtShake .25s}#ritUI .pad{display:none;gap:10px;pointer-events:auto}#ritUI .pad button{width:64px;height:64px;border-radius:16px;border:0;font:700 28px Outfit,system-ui,sans-serif;color:#fff;background:rgba(80,30,140,.75);box-shadow:0 0 0 2px rgba(220,180,255,.6)}
body.touch #ritUI .pad.show{display:flex}#ritRing{position:fixed;left:50%;top:42%;width:0;height:0;z-index:46;pointer-events:none;display:none}#ritRing.on{display:block}
#ritRing .t,#ritRing .m{position:absolute;left:0;top:0;border-radius:50%;transform:translate(-50%,-50%)}#ritRing .t{width:120px;height:120px;border:5px solid rgba(255,230,140,.95);box-shadow:0 0 22px #ffd070,inset 0 0 22px rgba(255,210,120,.5)}
#ritRing .m{border:4px solid #d8a8ff;box-shadow:0 0 18px #b070ff}#ritRing.hit .t{animation:rtBlast .5s ease-out forwards}#ritRing.miss .m{border-color:#ff4060}
@keyframes rtPop{0%{transform:skew(-8deg) scale(1.8);opacity:0}100%{transform:skew(-8deg) scale(1);opacity:1}}@keyframes rtPulse{to{transform:scale(1.08)}}@keyframes rtShake{25%{translate:4px 0}75%{translate:-4px 0}}
@keyframes rtBlast{to{width:520px;height:520px;opacity:0}}`;document.head.appendChild(st);
  const u=document.createElement('div');u.id='ritUI';u.innerHTML='<div class="h"></div><div class="bar"><i></i></div><div class="runes"></div><div class="pad"></div><div class="s"></div>';document.body.appendChild(u);
  const r=document.createElement('div');r.id='ritRing';r.innerHTML='<div class="t"></div><div class="m"></div>';document.body.appendChild(r);
  const pad=u.querySelector('.pad');for(const[k,l]of[['L','←'],['U','↑'],['D','↓'],['R','→']]){const b=document.createElement('button');b.textContent=l;b.dataset.k=k;b.addEventListener('pointerdown',e=>{e.preventDefault();e.stopPropagation();ritKey(k)});pad.appendChild(b)}
  RIT.ui={u,h:u.querySelector('.h'),bar:u.querySelector('.bar i'),runes:u.querySelector('.runes'),pad,s:u.querySelector('.s'),ring:r,m:r.querySelector('.m')};return RIT.ui}
function ritHead(t,s){const U=ritUI();U.h.textContent=t;U.h.classList.remove('pop');void U.h.offsetWidth;U.h.classList.add('pop');U.s.textContent=s||''}
const RKEY={ArrowLeft:'L',KeyA:'L',ArrowUp:'U',KeyW:'U',ArrowDown:'D',KeyS:'D',ArrowRight:'R',KeyD:'R'},RGLY={L:'←',U:'↑',D:'↓',R:'→'};
/* ---------- the 3D side: two streams of light braided into one orb ---------- */
function ritBuild(){const O=RIT.O;const g=new THREE.Group();g.position.copy(O);scene.add(g);RIT.g=g;
  const core=new THREE.Mesh(new THREE.IcosahedronGeometry(.5,3),new THREE.ShaderMaterial({uniforms:{uT:{value:0},uE:{value:0}},transparent:true,depthWrite:false,blending:THREE.AdditiveBlending,
    vertexShader:'varying vec3 vN;varying vec3 vP;void main(){vN=normalize(normalMatrix*normal);vP=position;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}',
    fragmentShader:'uniform float uT,uE;varying vec3 vN;varying vec3 vP;void main(){float f=pow(1.-abs(vN.z),1.6);float sw=sin(atan(vP.z,vP.x)*5.+vP.y*9.-uT*4.)*.5+.5;vec3 a=vec3(.62,.3,1.),b=vec3(1.,.86,.45);vec3 c=mix(a,b,sw);gl_FragColor=vec4(c*(.6+f*1.4),(f*.9+sw*.25)*(.25+uE*.75));}'}));g.add(core);RIT.core=core;
  RIT.glow=[glowSprite(0x9a50ff,1.9,.4),glowSprite(0xffd070,.9,.5)];for(const s of RIT.glow)g.add(s);RIT.rings=[];
  for(const[p,c]of[[x4L,0xffd870],[()=>P.pos,0xa060ff]]){const d=decal(runeTex,c,2.6,true,.0);const q=p();d.position.set(q.x,groundAt(q.x,q.z)+.06,q.z);scene.add(d);(RIT.decals=RIT.decals||[]).push(d)}}
function ritKill(){if(RIT.g){scene.remove(RIT.g);RIT.g.traverse(o=>{if(o.geometry)o.geometry.dispose()})}for(const d of RIT.decals||[])scene.remove(d);RIT.decals=[];RIT.g=null;const U=RIT.ui;if(U){U.u.classList.remove('on');U.ring.className=''}}
function ritHands(p,side){return headOf(p,1.25).add(V3(-.45,0,side*.25))}
function ritStream(from,to,c0,c1,k,phase){const mid=from.clone().lerp(to,.5).add(V3(0,1.2+Math.sin(time*2+phase)*.3,Math.sin(time*1.3+phase)*.8));const n=3+Math.round(k*6);
  for(let i=0;i<n;i++){const u=(time*(1.1+k*1.6)+i/n+phase)%1;const a=from.clone().lerp(mid,u),b=mid.clone().lerp(to,u),q=a.lerp(b,u);q.x+=Math.sin(u*14+time*6+phase)*.08*(1-u);SP.emit(q,{c0,c1,s0:.36+k*.24,s1:.04,life:.4,speed:.12})}}
/* ---------- input ---------- */
addEventListener('keydown',e=>{if(!RIT.on)return;if(e.code==='Escape')return;e.preventDefault();e.stopPropagation();if(e.repeat)return;if(e.code==='Space'||e.code==='Enter')ritTap();else if(RKEY[e.code])ritKey(RKEY[e.code])},true);
addEventListener('pointerdown',e=>{if(!RIT.on)return;if(e.target.closest&&(e.target.closest('#ritUI .pad')||e.target.closest('#skipBtn')))return;e.preventDefault();e.stopPropagation();ritTap()},true);
function ritTap(){if(RIT.ph===1){RIT.e=Math.min(1,RIT.e+({easy:.085,medium:.07,hard:.058}[DIFF]||.07));RIT.kick=1;try{sfx.blip()}catch(x){}SP.emit(RIT.O.clone(),{n:8,c0:0xffffff,c1:0xc080ff,speed:3,life:.3});if(RIT.e>=.999){RIT.e=1;flash(RIT.O,0xffffff,10);sx('rune',1,null,{rate:.6});ritPhase(2)}}
  else if(RIT.ph===3&&!RIT.done3){const d=Math.abs(RIT.rs-1);const tol={easy:.17,medium:.12,hard:.085}[DIFF]||.12;const U=ritUI();if(d<tol){RIT.done3=1;U.ring.className='on hit';sx('rune',1,null,{rate:.8});ritRelease()}else{U.ring.className='on miss';RIT.rs=2.6;RIT.miss=(RIT.miss||0)+1;P.shake=Math.max(P.shake,.25);setTimeout(()=>{if(RIT.ph===3&&!RIT.done3)U.ring.className='on'},250);if(RIT.miss>=4)RIT.slow=1}}}
function ritKey(k){if(RIT.ph!==2)return;const U=ritUI();const b=U.runes.children;if(k===RIT.seq[RIT.si]){b[RIT.si].className='ok';RIT.si++;sx('rune',.9,null,{rate:.9+RIT.si*.12});ritRuneRing();if(RIT.si>=RIT.seq.length){ritPhase(3)}else b[RIT.si].className='cur'}
  else{const cur=b[RIT.si];if(cur){cur.className='bad';setTimeout(()=>{if(RIT.ph===2)cur.className='cur'},260)}P.shake=Math.max(P.shake,.3);RIT.e=Math.max(.75,RIT.e-.06);try{sfx.hit()}catch(x){}}}
function ritRuneRing(){if(!RIT.g)return;const i=RIT.rings.length;const m=new THREE.Mesh(new THREE.TorusGeometry(.85+i*.18,.025,6,48),new THREE.MeshBasicMaterial({color:i%2?0xffd870:0xc890ff,transparent:true,opacity:.95,blending:THREE.AdditiveBlending,depthWrite:false}));m.rotation.set(rand(0,3),rand(0,3),0);RIT.g.add(m);RIT.rings.push(m);flash(RIT.O,0xd0a0ff,6)}
function ritPhase(n){RIT.ph=n;const U=ritUI();U.runes.innerHTML='';U.pad.classList.remove('show');U.ring.className='';
  if(n===1){ritHead('CHANNEL WITH LYRA!',typeof isTouch!=='undefined'&&isTouch?'TAP FAST':'MASH  SPACE');U.bar.parentElement.style.display=''}
  else if(n===2){const N={easy:3,medium:4,hard:5}[DIFF]||4;const K=['L','U','D','R'];RIT.seq=[];for(let i=0;i<N;i++){let k;do k=K[(Math.random()*4)|0];while(i&&k===RIT.seq[i-1]);RIT.seq.push(k)}RIT.si=0;
    for(const k of RIT.seq){const b=document.createElement('b');b.textContent=RGLY[k];U.runes.appendChild(b)}U.runes.children[0].className='cur';U.pad.classList.add('show');ritHead('WEAVE THE RUNES!',typeof isTouch!=='undefined'&&isTouch?'TAP THE ARROWS IN ORDER':'ARROWS OR W A S D, IN ORDER');voPlay('Lyra',XL3.ly58)}
  else if(n===3){RIT.rs=2.6;RIT.done3=0;RIT.miss=0;RIT.slow=0;U.ring.className='on';ritHead('RELEASE!',typeof isTouch!=='undefined'&&isTouch?'TAP WHEN THE RINGS MEET':'SPACE WHEN THE RINGS MEET');voPlay('Lyra',XL3.ly59)}}
function ritStart(){RIT={on:1,ph:0,e:0,t:0,kick:0,said:0,O:V3(NH_PUB.fx+3,2.7,NH_PUB.z),hum:null};ritBuild();ritUI().u.classList.add('on');ritPhase(1);try{RIT.hum=sx('chan',.55,null,{rate:.8})}catch(x){}
  try{P.heroAnim='Spell_Simple_Idle_Loop'}catch(x){}try{LYR.a&&LYR.a.setBase('Spell_Simple_Idle_Loop',.3)}catch(x){}try{KFW.a&&KFW.a.setBase('Idle_Loop',.3)}catch(x){}}
function ritTick(dt){if(!RIT.on)return;RIT.t+=dt;const U=ritUI();const O=RIT.O;RIT.kick=Math.max(0,RIT.kick-dt*5);
  if(RIT.ph>=2)RIT.e=1;if(RIT.ph===1){RIT.e=Math.max(0,RIT.e-dt*({easy:.1,medium:.14,hard:.18}[DIFF]||.14));if(RIT.e>.45&&!RIT.said){RIT.said=1;voPlay('@',XL3.m8_13)}}
  if(RIT.ph===3&&!RIT.done3){RIT.rs-=dt*(RIT.slow?.75:1.15);if(RIT.rs<.55){RIT.rs=2.6}U.m.style.width=U.m.style.height=(120*RIT.rs)+'px'}
  const k=RIT.e;U.bar.style.width=(k*100)+'%';const hum=RIT.hum;if(hum&&hum.src&&hum.src.playbackRate)try{hum.src.playbackRate.value=.8+k*.5}catch(x){}
  if(!RIT.hum||RIT.t-(RIT.ht||0)>4.4){RIT.ht=RIT.t;try{RIT.hum=sx('chan',.35+k*.35,null,{rate:.8+k*.45})}catch(x){}}
  ritStream(ritHands(P.pos,1),O,0xf0dcff,0x8a3cff,k,0);ritStream(ritHands(x4L(),-1),O,0xfff6c8,0xffb030,k,.5);
  if(RIT.g){const s=.35+k*1.1+RIT.kick*.15+(RIT.ph>=2?.25:0);RIT.g.scale.setScalar(s);RIT.core.material.uniforms.uT.value+=dt;RIT.core.material.uniforms.uE.value=k;RIT.core.rotation.y+=dt*(1+k*3);RIT.glow[0].material.opacity=.2+k*.4;RIT.glow[1].material.opacity=.25+k*.35;
    RIT.rings.forEach((r,i)=>{r.rotation.x+=dt*(1.2+i*.3);r.rotation.y+=dt*(.8+i*.25)});if(Math.random()<.2+k*.5)FL.emit(O.clone().add(V3(rand(-.6,.6),rand(-.6,.6),rand(-.6,.6)).multiplyScalar(s)),{n:1,c0:0xffffff,c1:k>.5?0xffd070:0xa060ff,s0:.3,s1:.02,life:.5,up:.4,jitter:.3})}
  for(const d of RIT.decals||[]){d.material.opacity=.25+k*.6;d.rotation.z+=dt*(.6+k*2)}if(NH.shim)NH.shim.mat.uniforms.uA.value=.35+k*.65;
  if(Math.random()<k*.3)P.shake=Math.max(P.shake,.05+k*.08)}
function ritRelease(){RIT.ph=4;const U=ritUI();ritHead('',' ');setTimeout(()=>{U.u.classList.remove('on')},300);after(.35,()=>{if(CS.active&&CS.shots[CS.i]&&CS.shots[CS.i].rit)nextShot()})}
/* the cloak tears: beam, crack, white-out, shards, light pillar */
function ritReveal(){const O=RIT.O||V3(NH_PUB.fx+3,2.7,NH_PUB.z);const F=V3(NH_PUB.fx+.1,4.5,NH_PUB.z);RIT.on=0;
  const beam=new THREE.Mesh(new THREE.CylinderGeometry(.14,.32,1,12,1,true),new THREE.MeshBasicMaterial({color:0xffe8b0,transparent:true,blending:THREE.AdditiveBlending,depthWrite:false,side:THREE.DoubleSide}));scene.add(beam);
  const d=F.clone().sub(O),L=d.length();beam.position.copy(O).addScaledVector(d,.5);beam.scale.set(1,L,1);beam.quaternion.setFromUnitVectors(V3(0,1,0),d.clone().normalize());sx('unveil',1);P.shake=Math.max(P.shake,.9);
  addFx(beam,.7,(f,k)=>{beam.material.opacity=1-k*.6;beam.scale.x=beam.scale.z=1+k*3},()=>{scene.remove(beam)});
  const wf=document.createElement('div');wf.style.cssText='position:fixed;inset:0;z-index:47;background:#fff6e8;opacity:0;transition:opacity .22s;pointer-events:none';document.body.appendChild(wf);
  setTimeout(()=>{wf.style.opacity='1'},320);setTimeout(()=>{nhUncloak(false);ritKill();
    const C=[0xf6dc78,0xf2eee6,0xa9dcbf,0xffffff,0xc890ff];const N=110;for(let i=0;i<N;i++){const m=new THREE.Mesh(new THREE.PlaneGeometry(rand(.3,.9),rand(.3,.9)),new THREE.MeshBasicMaterial({color:C[i%5],transparent:true,side:THREE.DoubleSide,depthWrite:false}));
      m.position.set(NH_PUB.fx+.3,rand(.5,12),NH_PUB.z+rand(-6,6));scene.add(m);const v=V3(rand(2,9),rand(-1,4),rand(-3,3)),w=V3(rand(-6,6),rand(-6,6),rand(-6,6));addFx(m,rand(1.2,2.2),(f,k)=>{m.position.addScaledVector(v,.016);v.y-=.12;m.rotation.x+=w.x*.016;m.rotation.y+=w.y*.016;m.material.opacity=1-k},()=>{scene.remove(m);m.geometry.dispose()})}
    const pil=new THREE.Mesh(new THREE.CylinderGeometry(3,3,40,24,1,true),new THREE.MeshBasicMaterial({color:0xffd890,transparent:true,opacity:.45,blending:THREE.AdditiveBlending,depthWrite:false,side:THREE.DoubleSide}));pil.position.set(NH_PUB.x,20,NH_PUB.z);scene.add(pil);
    addFx(pil,2.2,(f,k)=>{pil.material.opacity=.45*(1-k);pil.scale.x=pil.scale.z=1-k*.7},()=>scene.remove(pil));ring(V3(NH_PUB.fx+2,.1,NH_PUB.z),0xffd890,1,16,.8);
    for(let k=0;k<6;k++)SP.emit(V3(NH_PUB.fx+.4,rand(1,10),NH_PUB.z+rand(-5,5)),{n:30,c0:0xffffff,c1:0xffc060,speed:5,life:1.2,s0:.5,s1:.05});
    wf.style.transition='opacity 1.1s';wf.style.opacity='0';setTimeout(()=>wf.remove(),1200)},560)}
/* ---------- the scene ---------- */
function nhRitual(){if(CS.active||NH.shown||X4.rit)return;X4.rit=1;sayHush&&sayHush();const fx=NH_PUB.fx,cz=NH_PUB.z;const mp=V3(fx+5.6,0,cz-1.1);x4Stage(mp,-Math.PI/2);
  if(LYR.a){LYR.a.g.position.set(fx+5.6,groundAt(fx+5.6,cz+1.1),cz+1.1);LYR.a.g.rotation.y=-Math.PI/2}if(KFW.a){KFW.a.g.position.set(fx+8.2,0,cz+.2);x4Face(KFW.a,V3(fx,0,cz))}P.face=-Math.PI/2;
  const lS=(s,d)=>x4S(x4L,s,d||2.2,1.6),wS=(s,d)=>x4S(()=>P.pos,s,d||2.3,1.7),kS=(s,d)=>x4S(x4K,s,d||2.3,1.75);
  
  playCutscene([{dur:3,fov:52,cam:k=>({pos:V3(fx+8.8,2.6+k*.6,cz-9+k*2),look:V3(fx+2,4.2,cz)}),onStart:()=>{x4Talk('');if(NH.shim)NH.shim.mat.uniforms.uA.value=.5}},
    {who:'Lyra',text:XL3.ly56,cam:lS(1.1,2.2),onStart:()=>x4Talk('Lyra')},{who:'@',text:XL3.m8_12,cam:wS(-1,2.3),onStart:()=>x4Talk('@')},
    {who:'Kaen',text:XL3.k8_09,cam:kS(1,2.4),onStart:()=>x4Talk('Kaen')},{who:'Lyra',text:XL3.ly57,cam:lS(-1,2.1),onStart:()=>x4Talk('Lyra')},
    {dur:9999,rit:1,fov:50,cam:(k,t)=>{const e=RIT.e||0;const a=Math.sin(t*.25)*.5;return{pos:V3(fx+8.7+a*.4,1.9+e*.9,cz+6.8-a*1.5-e*1.2),look:V3(fx+2.2,2.8+e*.6,cz-.6)}},onStart:()=>{x4Talk('');ritStart()},update:dt=>ritTick(dt||.016)},
    {dur:3.4,fov:60,cam:k=>({pos:V3(fx+8.9,1.6+k*1.6,cz+11-k*2.5),look:V3(fx-1,4.8,cz)}),onStart:()=>ritReveal()},
    {who:'@',text:XL3.m8_14,cam:k=>({pos:V3(fx+8.9,1.7,cz+3.6-k),look:V3(fx,3.4,cz)}),onStart:()=>{x4Talk('@');try{P.heroAnim='Idle_Talking_Loop'}catch(x){}}},
    {who:'Lyra',text:XL3.ly60,cam:lS(1,2.2),onStart:()=>x4Talk('Lyra')}],
    ()=>{RIT.on=0;ritKill();if(!NH.shown)nhUncloak(false);KFW.pin=0;x4Talk('');P.heroAnim=null;X4.cc=null;X4.rit=0;try{LYR.a&&LYR.a.setBase('Idle_Loop',.3)}catch(x){}toast('The door is waiting. Press <b>E</b> at the door.','The Last Lantern')})}
/* ---------- the door ---------- */
function nhEnter(){if(CS.active||NH.entered||!NH.shown)return;NH.entered=1;const fx=NH_PUB.fx,cz=NH_PUB.z,dz=cz;const out=V3(fx+2.2,0,dz-.6);x4Stage(out,-Math.PI/2);if(KFW.a)KFW.a.g.position.set(fx+3.6,0,dz+1.4);if(LYR.a)LYR.a.g.position.set(fx+3.2,0,dz-1.9);
  const fade=document.createElement('div');fade.style.cssText='position:fixed;inset:0;z-index:47;background:#000;opacity:0;transition:opacity .5s;pointer-events:none';document.body.appendChild(fade);
  playCutscene([{dur:2.6,fov:46,cam:k=>({pos:V3(fx+4.6-k*1.2,1.8,dz-2.4+k*.6),look:V3(fx,1.6,dz)}),onStart:()=>{sx('pubdoor',1);const d=NH.door;if(d)addFx(null,1.6,(f,k)=>{d.rotation.y=-Math.sin(k*Math.PI/2)*1.75});
        if(NH.leak)addFx(null,1.6,(f,k)=>{NH.leak.material.opacity=.9*k});setTimeout(()=>{fade.style.opacity='1'},1900)}},
    {dur:4.6,fov:50,cam:k=>({pos:V3(fx-1.2-k*1.4,1.75+k*.25,cz+.4+k*.3),look:V3(fx-8.5+k*.3,1.2+k*.35,cz-1.4)}),onStart:()=>{const ip=V3(fx-1.4,0,cz+.3);P.pos.set(ip.x,0,ip.z);P.face=-Math.PI/2;if(KFW.a)KFW.a.g.position.set(fx-.9,0,cz+1.5);if(LYR.a)LYR.a.g.position.set(fx-.9,0,cz-.9);
        const i=boxes.indexOf(NH.doorBox);if(i>=0)boxes.splice(i,1);nhLights(0,true);fade.style.opacity='0';setTimeout(()=>fade.remove(),700);setTimeout(()=>nhLightsOn(),500)}}],
    ()=>{fade.remove();KFW.pin=0;x4Pub()})}
/* prompt + E at the door; the old automatic veil is gone */
function nhDoorHint(on){let h=document.getElementById('nhDoor');if(!h){h=document.createElement('div');h.id='nhDoor';h.style.cssText="position:fixed;left:50%;bottom:22%;transform:translateX(-50%) skew(-8deg);z-index:30;font:400 clamp(22px,3vw,32px) 'Bangers',Impact,sans-serif;letter-spacing:.08em;color:#fff6e0;-webkit-text-stroke:1px #2a1208;paint-order:stroke fill;text-shadow:2px 2px 0 #c8902c,0 0 18px rgba(255,190,90,.7);pointer-events:auto;cursor:pointer;display:none";h.addEventListener('pointerdown',e=>{e.stopPropagation();nhEnter()});document.body.appendChild(h)}
  h.innerHTML=typeof isTouch!=='undefined'&&isTouch?'TAP TO ENTER THE LAST LANTERN':'PRESS <span style="color:#ffd070">E</span> TO ENTER';h.style.display=on?'block':'none'}
addEventListener('keydown',e=>{if(e.code!=='KeyE'||e.repeat||!started||CS.active||MODE==='open')return;if(CH2.st===14&&NH.shown&&!NH.entered&&Math.hypot(P.pos.x-NH_PUB.door.x,P.pos.z-NH_PUB.door.z)<3.4){e.stopPropagation();nhEnter()}},true);
{const _mt=muTick;muTick=function(dt){_mt(dt);if(!NH.built||MODE==='open'||CH2.zone!=='north'){nhDoorHint(false);return}
  const near=Math.hypot(P.pos.x-NH_PUB.door.x,P.pos.z-NH_PUB.door.z);nhDoorHint(CH2.st===14&&NH.shown&&!NH.entered&&!CS.active&&near<3.4);
  if(NH.fanM&&NH.shown&&!NH.entered)NH.fanM.emissiveIntensity=.6+Math.sin(time*3)*.35;
  if(!NH.shown&&NH.shim)NH.shim.mat.uniforms.uA.value=X4.rit?NH.shim.mat.uniforms.uA.value:clamp((26-Math.hypot(P.pos.x-NH_PUB.fx-3,P.pos.z-NH_PUB.z))/18,0,.45);
  if(CH2.st===14&&!NH.shown&&!CS.active&&!P.flying&&P.alive&&Math.hypot(P.pos.x-(NH_PUB.fx+5),P.pos.z-NH_PUB.z)<9)nhRitual();
  if(NH.lit>.5&&NH.chand)for(const c of NH.chand)c.rotation.y=Math.sin(time*.6)*.04}}
/* replaying the chapter puts the cloak back */
function nhRecloak(){NH.entered=0;X4.rit=0;if(NH.door)NH.door.rotation.y=0;if(NH.leak)NH.leak.material.opacity=0;if(!NH.shown)return;NH.shown=false;try{localStorage.removeItem('sorc_pubrev')}catch(x){}
  for(const b of(NH.pubBoxes||[]).concat([NH.doorBox])){const i=boxes.indexOf(b);if(i>=0)boxes.splice(i,1)}if(NH.cloakBox&&!boxes.includes(NH.cloakBox))boxes.push(NH.cloakBox);if(NH.cloak)NH.cloak.visible=true;if(NH.shim)NH.shim.m.visible=true;if(NH.pubG)NH.pubG.visible=false;nhLights(0,true);nhSeatAlf()}
{const _ac=applyChapter;applyChapter=function(id){const r=_ac.apply(this,arguments);if(MODE!=='open'&&CH2.st<15)try{nhRecloak()}catch(x){}return r}}

/* Alfred: long grey dreadlocks, no hat, red-gold-green beads and belt */
function nhRasta(a){try{const hm=std({color:0x6c6a66,roughness:1}),hm2=std({color:0x585652,roughness:1});const D=new THREE.Group();a.head.add(D);try{a.g.updateMatrixWorld(true);const qh=new THREE.Quaternion(),qg=new THREE.Quaternion();a.head.getWorldQuaternion(qh);a.g.getWorldQuaternion(qg);D.quaternion.copy(qh.invert().multiply(qg))}catch(x){}
  for(let i=0;i<34;i++){const ang=(-1+2*(i/33))*2.15;const L=rand(.42,.66)*(Math.abs(ang)>1.9?.75:1);const m=new THREE.Mesh(new THREE.CylinderGeometry(.021,.014,L,6,4),i%3?hm:hm2);m.geometry.translate(0,-L/2,0);
    const p=m.geometry.attributes.position;for(let k=0;k<p.count;k++){const y=p.getY(k);p.setX(k,p.getX(k)*(1+.25*Math.sin(y*40+i)));p.setZ(k,p.getZ(k)*(1+.25*Math.cos(y*37+i)))}m.geometry.computeVertexNormals();
    const r=.088;m.position.set(Math.sin(ang)*r,.045+rand(-.01,.02),-Math.cos(ang)*r);m.rotation.set(Math.cos(ang)*.32+rand(-.05,.05),0,Math.sin(ang)*.28+rand(-.05,.05));D.add(m)}
  for(let i=0;i<10;i++){const ang=rand(-2.2,2.2);const m=new THREE.Mesh(new THREE.SphereGeometry(.03,6,5),hm);m.position.set(Math.sin(ang)*.06,.1+rand(0,.03),-Math.cos(ang)*.06+.01);m.scale.set(1,.7,1);D.add(m)}
  const C=[0xc01a1a,0xe8b820,0x1f8a2a];C.forEach((c,i)=>{const n=new THREE.Mesh(new THREE.TorusGeometry(.085-i*.006,.008,6,22),std({color:c,roughness:.4}));n.rotation.x=Math.PI/2+.35;n.position.set(0,-.17-i*.022,.035+i*.01);a.head.add(n)});
  const SK=a.S.SK;const belt=new THREE.Group();C.forEach((c,i)=>{const b=new THREE.Mesh(new THREE.TorusGeometry(.16,.012,6,28),std({color:c,roughness:.6}));b.rotation.x=Math.PI/2;b.position.y=(i-1)*.026;belt.add(b)});belt.scale.set(1,1,.8);a.attach('pelvis',belt,SK.pelvis.clone().add(V3(0,.06,0)))}catch(x){console.warn('rasta',x)}}

/* a beam with a smoke sleeve, and anime-style kinetic camera moves */
function x4Beam(A,B){const d=B.clone().sub(A),L=d.length();const g=new THREE.Group();g.position.copy(A).addScaledVector(d,.5);g.quaternion.setFromUnitVectors(V3(0,1,0),d.clone().normalize());scene.add(g);
  const core=new THREE.Mesh(new THREE.CylinderGeometry(.09,.09,L,10,1,true),new THREE.MeshBasicMaterial({color:0xffffff,transparent:true,blending:THREE.AdditiveBlending,depthWrite:false}));
  const sh=new THREE.Mesh(new THREE.CylinderGeometry(.34,.34,L,16,1,true),new THREE.MeshBasicMaterial({color:0x9cff60,transparent:true,opacity:.6,blending:THREE.AdditiveBlending,depthWrite:false,side:THREE.DoubleSide}));g.add(core,sh);
  flash(A,0xd0ff90,10);flash(B,0xffffff,18);flash(B,0x9cff60,12);ring(B,0xb8ff80,1,5,.35);SP.emit(B,{n:120,c0:0xffffff,c1:0x7ad040,speed:11,life:.8,s0:.6,s1:.05});
  for(let i=0;i<14;i++){const t=i/13;const p=A.clone().lerp(B,t);SM.emit(p,{n:3,c0:0x8a887e,c1:0x1a1a14,s0:.8,s1:2.6,life:1.4,a:.6,speed:1.2})}
  addFx(g,1,(f,k)=>{core.material.opacity=1-k;sh.material.opacity=.6*(1-k);const w=1+Math.sin(k*40)*.15*(1-k);sh.scale.set(w*(1+k*1.5),1,w*(1+k*1.5));core.scale.set(1-k*.8,1,1-k*.8)},()=>{scene.remove(g);g.traverse(o=>{if(o.geometry)o.geometry.dispose()})})}
function x4Kin(kind){const c=renderer.domElement;let ov=document.getElementById('kinFx');if(!ov){ov=document.createElement('div');ov.id='kinFx';ov.style.cssText='position:fixed;inset:0;z-index:23;pointer-events:none;opacity:0;background:repeating-conic-gradient(from 0deg at 50% 50%,rgba(255,255,255,.0) 0deg 4deg,rgba(255,255,255,.22) 4deg 4.6deg);-webkit-mask:radial-gradient(circle at 50% 50%,transparent 26%,#000 62%);mask:radial-gradient(circle at 50% 50%,transparent 26%,#000 62%)';document.body.appendChild(ov)}
  c.style.transition='none';ov.style.transition='none';
  if(kind==='in'){ov.style.opacity='.2';void ov.offsetWidth;ov.style.transition='opacity 1.6s ease-in';ov.style.opacity='.6';c.style.transform='scale(1)';void c.offsetWidth;c.style.transition='transform 1.6s cubic-bezier(.6,0,1,1)';c.style.transform='scale(1.08)'}
  else if(kind==='punch'){ov.style.opacity='1';c.style.transform='scale(1.16)';void c.offsetWidth;c.style.transition='transform .45s cubic-bezier(.2,1.6,.4,1)';c.style.transform='scale(1.02)';setTimeout(()=>{ov.style.transition='opacity .6s';ov.style.opacity='0'},250)}
  else{c.style.transform='scale(1.06)';void c.offsetWidth;c.style.transition='transform 1.2s cubic-bezier(.2,.8,.2,1)';c.style.transform='scale(1)';ov.style.transition='opacity .4s';ov.style.opacity='0';setTimeout(()=>{c.style.transition='';c.style.transform=''},1300)}}
{const _ec=endCutscene;endCutscene=function(){const c=renderer.domElement;c.style.transition='';c.style.transform='';const ov=document.getElementById('kinFx');if(ov)ov.style.opacity='0';return _ec.apply(this,arguments)}}
SX.sets.dbeam=1;SX.sets.dcharge=1;Object.assign(SX.sets,{zap:2,thunder:1,catmeow:1,catesc:1});

/* ---------- the Warden never leaks across chapters: a fresh Warden, a fresh escape, every time ---------- */
function wdReset(){try{CH2.chase=null;if(WD.e&&!WD.e.dead)removeEnemy(WD.e);WD.e=null;WD.esc=0;WD.t=0;WD.said=0;WD.lasT=4;WD.orbT=7;if(typeof XII!=='undefined')XII.wdE=null;const t=$('wdQte');if(t){t.className='';if(t.fl)t.fl.className=''}hitStop=0}catch(x){}}
{const _ac=applyChapter;applyChapter=function(id){wdReset();return _ac.apply(this,arguments)}}
{const _wf=wdFight;wdFight=function(){if(!CH2.chase&&CH2.st<=6){if(WD.e&&(WD.e.hpFloor!==.55||(typeof XII!=='undefined'&&WD.e===XII.wdE)))wdReset();WD.esc=0;WD.t=0;WD.said=0}
  const r=_wf.apply(this,arguments);const e=WD.e;if(e&&CH2.st<=6&&!CH2.chase){e.hpFloor=.55;e.invuln=false;if(e.hp<e.maxhp*.6)e.hp=e.maxhp}return r}}
