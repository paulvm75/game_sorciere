/* ================= CHAPTER XIV · The Smoke of Portobello ================= */
/* st 13: after Vesper · 14: find Alfred · 15: Alfred met, step outside · 16: Alfred is dead, Desmond waits · 17: done */
const NH={x0:-690,built:false,g:null,pubG:null,shown:false,said:{},fac:null,alf:null,lamp:null,dome:null};
const X4={e:null,fight:0,t13:0,smokes:[],walls:[],serp:[],said:{},haze:0,fogK:0,re:0,cmp:{k:4,l:3}};
const nhPrX=z=>-482+6*Math.sin((z+9852)/30);
const NHR={gate:-9852,chep:-9912,west:-9974,lad:-604,pem:-410,z1:-10028};
const NH_PUB={x:nhPrX(-9945)-11.3,z:-9945,door:V3(nhPrX(-9945)-4.6,0,-9945)};
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

/* ---------- facades ---------- */
function nhFacTex(base,kind,seed){const W=128,H=256;const R=mulberry(seed||7);const r=(a,b)=>a+R()*(b-a);const lit=[];
  const win=(x,X,Y,w,h,frame)=>{x.fillStyle=frame||'#f4f0e8';x.fillRect(X-3,Y-3,w+6,h+6);x.fillStyle='#1c2430';x.fillRect(X,Y,w,h);x.fillStyle=frame||'#f4f0e8';x.fillRect(X,Y+h*.48,w,2.5);x.fillRect(X+w/2-1,Y,2,h);x.fillRect(X-5,Y+h+3,w+10,3);lit.push([X,Y,w,h,R()<.42])};
  const map=mkCanvas(W,H,x=>{x.fillStyle=base;x.fillRect(0,0,W,H);for(let k=0;k<900;k++){x.fillStyle=R()<.5?'rgba(255,255,255,.05)':'rgba(0,0,0,.06)';x.fillRect(r(0,W),r(0,H),r(1,3),r(1,3))}
    x.fillStyle='#2c2a2e';x.fillRect(0,0,W,7);
    if(kind==='brick'){x.fillStyle='rgba(30,16,10,.35)';for(let y=10;y<H;y+=5){x.fillRect(0,y,W,1);for(let c=0;c<W;c+=10)x.fillRect(c+((y/5)%2)*5,y,1,5)}}
    x.fillStyle='#f4f0e8';x.fillRect(0,8,W,8);for(let c=2;c<W;c+=7)x.fillRect(c,16,4,3);
    if(kind==='stucco'){for(const Y of[30,92])for(const X of[14,54,94])win(x,X,Y,20,Y<60?34:46);x.fillStyle='#e8e2d6';x.fillRect(0,150,W,4);
      x.fillStyle='#2a2f3a';x.fillRect(52,176,24,62);x.fillStyle='#f6f2ea';for(const X of[42,82])x.fillRect(X,168,6,76);x.fillRect(38,162,52,8);for(const X of[14,94])win(x,X,182,20,40);
      x.fillStyle='#16161a';x.fillRect(0,236,W,3);for(let c=0;c<W;c+=4)x.fillRect(c,228,1.2,12)}
    else{for(const X of[22,84])win(x,X,28,24,36);for(const X of[22,84])win(x,X,82,24,50);x.fillStyle='#15151a';x.fillRect(16,134,96,2);for(let c=18;c<110;c+=4)x.fillRect(c,128,1,7);
      const fas=kind==='brick'?'#1e3a2e':['#1e2a44','#3a1e2a','#1e3a30','#3a2e18','#22222a'][(R()*5)|0];x.fillStyle=fas;x.fillRect(4,150,W-8,16);x.fillStyle='rgba(255,240,200,.7)';for(let c=14;c<W-14;c+=r(4,7))x.fillRect(c,155,r(2,4),5);
      x.fillStyle='#f4f0e8';x.fillRect(4,168,W-8,78);x.fillStyle='#202830';x.fillRect(10,174,72,64);x.fillStyle='#f4f0e8';x.fillRect(45,174,2,64);x.fillStyle='#2a3040';x.fillRect(90,176,26,68);x.fillStyle='#c8b070';x.fillRect(110,208,3,3);lit.push([10,174,72,64,R()<.7])}
    x.fillStyle='rgba(0,0,0,.25)';x.fillRect(0,H-6,W,6)});
  const em=mkCanvas(W,H,x=>{x.fillStyle='#000';x.fillRect(0,0,W,H);for(const[X,Y,w,h,on]of lit){if(!on)continue;const g=x.createLinearGradient(0,Y,0,Y+h);g.addColorStop(0,'#ffcf88');g.addColorStop(1,'#d88a3a');x.fillStyle=g;x.fillRect(X+1,Y+1,w-2,h-2)}});
  const t=new THREE.CanvasTexture(map),e=new THREE.CanvasTexture(em);t.anisotropy=8;return std({map:t,emissive:0xffffff,emissiveMap:e,emissiveIntensity:.8,roughness:.85,envMapIntensity:.3})}
function nhBoxGeo(){const g=new THREE.BoxGeometry(1,1,1);g.translate(0,.5,0);const uv=g.attributes.uv;for(let i=8;i<16;i++)uv.setXY(i,.5,.985);uv.needsUpdate=true;return g}
function nhSignTex(a,b){const t=new THREE.CanvasTexture(mkCanvas(256,64,x=>{x.fillStyle='#f6f4ee';x.fillRect(0,0,256,64);x.strokeStyle='#111';x.lineWidth=5;x.strokeRect(4,4,248,56);x.fillStyle='#111';x.font='bold 24px Helvetica,Arial,sans-serif';x.textAlign='center';x.fillText(a,b?110:128,42);if(b){x.fillStyle='#c01818';x.fillText(b,222,42)}}));return t}

/* ---------- Notting Hill, Portobello Road, Ladbroke Grove, Kensington Gardens ---------- */
function nhBuild(){if(NH.built||!NZ.built)return;NH.built=true;const M=nzM();const G=NH.g=new THREE.Group();NZ.g.add(G);
  c2plane(G,410,440,-485,-.02,-9815,nzGroundMat(410,440));
  {let thm=null;NZ.g.traverse(o=>{if(!thm&&o.isMesh&&o.geometry&&o.geometry.parameters&&o.geometry.parameters.width===560&&o.geometry.parameters.height===TH_W*2)thm=o.material});const th=c2plane(G,410,TH_W*2,-485,.05,TH_Z,thm||M.sea);th.receiveShadow=false;
    for(const s of[-1,1])c2box(G,410,1.4,.8,-485,-1.1,TH_Z+s*(TH_W+.4),std({color:0x6a6458,roughness:.95,envMapIntensity:.2}),false)}
  const asph=std({color:0x2c2c30,roughness:.92}),lines=std({color:0xe8e4d0,roughness:.8});
  const road=(x0,x1,z0,z1)=>{c2plane(G,x1-x0,z1-z0,(x0+x1)/2,.03,(z0+z1)/2,asph)};
  road(NH.x0,-272,NHR.gate-5.5,NHR.gate+5.5);road(NHR.lad-5.5,NHR.lad+5.5,NHR.z1,NHR.gate);road(NHR.lad,NHR.pem,NHR.chep-4,NHR.chep+4);road(NH.x0,NHR.pem,NHR.west-4.5,NHR.west+4.5);road(NHR.pem-4,NHR.pem+4,NHR.west,NHR.gate);
  {const rp=[],uv=[],ri=[];let n=0;for(let z=NHR.gate;z>=NHR.z1;z-=2){const x=nhPrX(z);rp.push(x-3.8,.035,z,x+3.8,.035,z);uv.push(0,n/3,1,n/3);if(n){const a=(n-1)*2;ri.push(a,a+2,a+1,a+1,a+2,a+3)}n++}
    const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(rp,3));g.setAttribute('uv',new THREE.Float32BufferAttribute(uv,2));g.setIndex(ri);g.computeVertexNormals();
    const tx=new THREE.CanvasTexture(mkCanvas(64,128,x=>{x.fillStyle='#34322f';x.fillRect(0,0,64,128);for(let k=0;k<900;k++){x.fillStyle=Math.random()<.5?'rgba(255,255,255,.07)':'rgba(0,0,0,.15)';x.fillRect(Math.random()*64,Math.random()*128,2,2)}x.fillStyle='#d8c860';x.fillRect(4,0,2,128);x.fillRect(58,0,2,128)}));tx.wrapT=THREE.RepeatWrapping;
    G.add(new THREE.Mesh(g,std({map:tx,roughness:.9,side:THREE.DoubleSide,polygonOffset:true,polygonOffsetFactor:-2})))}
  for(let z=NHR.gate-8;z>NHR.z1+4;z-=7)c2plane(G,.22,3.4,NHR.lad,.04,z,lines);for(let x=NH.x0+6;x<-276;x+=7)c2plane(G,3.4,.22,x,.04,NHR.gate,lines);
  /* Kensington Gardens */
  {c2plane(G,128,142,-338,.025,-9929,M.lawn);for(const[x,z,w,d]of[[-338,-9929,4,142],[-338,-9929,128,4]])c2plane(G,w,d,x,.035,z,M.gravel);const T=[];for(let x=-398;x<-280;x+=rand(9,14))for(let z=-9852;z>-9996;z-=rand(9,14)){if(Math.abs(x+338)<5||Math.abs(z+9923)<5)continue;T.push([x+rand(-2,2),z+rand(-2,2),rand(1.1,1.6),0])}nzTrees(G,T);
    const rl=[];for(let x=-400;x<-276;x+=1.2)rl.push([x,-9848]);CITY_PARENT=G;instanced(new THREE.BoxGeometry(.06,1.2,.06),std({color:0x111114,roughness:.5,metalness:.6}),rl,(o,p)=>{o.position.set(p[0],.6,p[1])});CITY_PARENT=null}
  /* terraces */
  const PAST=['#f2a7b8','#9fd0ea','#f6dc78','#a9dcbf','#cdb0e2','#f4ab8c','#f2eee6','#7fcfc6'];NH.fac=PAST.map((c,i)=>nhFacTex(c,'pastel',11+i));const stuc=[nhFacTex('#ece8de','stucco',3),nhFacTex('#e6dccb','stucco',5)],brk=[nhFacTex('#8a5a44','brick',9),nhFacTex('#a07a54','brick',13)];
  const H=[],took=[];const onRoad=(x,z,m)=>Math.abs(z-NHR.gate)<5.5+m&&x<-272||Math.abs(x-NHR.lad)<5.5+m||Math.abs(z-NHR.chep)<4+m&&x>NHR.lad&&x<NHR.pem||Math.abs(z-NHR.west)<4.5+m&&x<NHR.pem||Math.abs(x-NHR.pem)<4+m&&z<NHR.gate&&z>NHR.west||Math.abs(x-nhPrX(z))<3.8+m&&z<NHR.gate+2;
  const free=(x0,x1,z0,z1)=>{if(x0<NH.x0+2||x1>-404)return false;if(z0<NHR.z1-1||z1>-9819)return false;for(let a=0;a<=4;a++)for(let b=0;b<=4;b++){const x=lerp(x0,x1,a/4),z=lerp(z0,z1,b/4);if(onRoad(x,z,.9))return false}
    if(x1>NH_PUB.x-6.5&&x0<NH_PUB.x+6.5&&z1>NH_PUB.z-8&&z0<NH_PUB.z+8)return false;for(const t of took)if(x1>t[0]+.05&&x0<t[1]-.05&&z1>t[2]+.05&&z0<t[3]-.05)return false;return true};
  const add=(cx,cz,sx,sz,h,mat,st,fc)=>{const x0=cx-sx/2,x1=cx+sx/2,z0=cz-sz/2,z1=cz+sz/2;if(!free(x0,x1,z0,z1))return false;took.push([x0,x1,z0,z1]);H.push({cx,cz,sx,sz,h,mat,st,fc});return true};
  const nsRow=(fx,za,zb,side,depth,wid,hs,mats,setback)=>{for(let z=za;z>zb;){const w=wid[0]+Math.random()*(wid[1]-wid[0]),zc=z-w/2,x=fx(zc)+side*(setback+depth/2);add(x,zc,depth,w,hs[0]+Math.random()*(hs[1]-hs[0]),mats[(Math.random()*mats.length)|0],setback>7,[-side,0]);z-=w+(setback>7?rand(2,4):0)}};
  const ewRow=(zf,xa,xb,side,depth,wid,hs,mats,setback)=>{for(let x=xa;x<xb;){const w=wid[0]+Math.random()*(wid[1]-wid[0]),xc=x+w/2,z=zf+side*(setback+depth/2);add(xc,z,w,depth,hs[0]+Math.random()*(hs[1]-hs[0]),mats[(Math.random()*mats.length)|0],setback>7,[0,-side]);x+=w+(setback>7?rand(2,4):0)}};
  for(const s of[-1,1])nsRow(nhPrX,NHR.gate-6,NHR.z1,s,11,[5.8,7],[10,12.5],NH.fac,5.3);
  for(const s of[-1,1])nsRow(()=>NHR.lad,NHR.gate-7,NHR.z1,s,13,[11,13],[12,14],stuc,10);
  for(const s of[-1,1])ewRow(NHR.chep,NHR.lad+7,NHR.pem-5,s,12,[9,11],[10.5,12],stuc,7.5);
  for(const s of[-1,1])ewRow(NHR.west,NH.x0+4,NHR.pem-5,s,12,[7,9],[11,14],[...brk,...NH.fac.slice(0,3)],6);
  for(const s of[-1,1])ewRow(NHR.gate,NH.x0+4,-406,s,12,[7,9.5],[11,14.5],[...brk,stuc[1]],6.5);
  for(const s of[-1,1])nsRow(()=>NHR.pem,NHR.gate-7,NHR.west+5,s,11,[7,9],[10,12],[...NH.fac.slice(4),stuc[0]],5.5);
  /* fill the deep blocks behind with mews and gardens */
  for(let k=0;k<160;k++){const x=rand(NH.x0+10,-420),z=rand(NHR.z1+8,NHR.gate-10);add(x,z,rand(6,8),rand(6,9),rand(6,8),brk[(Math.random()*2)|0],false,null)}
  const bg=nhBoxGeo(),o=new THREE.Object3D();const groups=new Map();for(const h of H){if(!groups.has(h.mat))groups.set(h.mat,[]);groups.get(h.mat).push(h)}
  for(const[mat,L]of groups){const im=new THREE.InstancedMesh(bg,mat,L.length);L.forEach((h,i)=>{o.position.set(h.cx,0,h.cz);o.rotation.set(0,0,0);o.scale.set(h.sx,h.h,h.sz);o.updateMatrix();im.setMatrixAt(i,o.matrix)});im.castShadow=im.receiveShadow=true;im.frustumCulled=false;G.add(im)}
  for(const h of H){const x0=h.cx-h.sx/2,x1=h.cx+h.sx/2,z0=h.cz-h.sz/2,z1=h.cz+h.sz/2;boxes.push({x0,x1,z0,z1,h:h.h,nz:1});nzLot(x0,x1,z0,z1,h.h,0,'flat');NZ.mapR.push([x0,z0,h.sx,h.sz])}
  {const ch=[],pot=[];for(const h of H){if(Math.random()<.35)continue;const along=h.sx>h.sz;const n=Math.random()<.5?1:2;for(let q=0;q<n;q++){const t=n===1?0:q?.35:-.35;const x=h.cx+(along?t*h.sx:0),z=h.cz+(along?0:t*h.sz);ch.push([x,z,h.h]);for(let p=0;p<3;p++)pot.push([x+(along?0:(p-1)*.35),z+(along?(p-1)*.35:0),h.h+1.6])}}
    CITY_PARENT=G;instanced(new THREE.BoxGeometry(.9,1.6,1.6),M.brick,ch,(o,c)=>{o.position.set(c[0],c[2]+.8,c[1])});instanced(new THREE.CylinderGeometry(.11,.13,.5,6),std({color:0xa0603e,roughness:.8}),pot,(o,c)=>{o.position.set(c[0],c[2]+.25,c[1])});CITY_PARENT=null}
  /* porches and front gardens for the villas */
  {const col=[],hedge=[];for(const h of H){if(!h.st||!h.fc)continue;const[dirX,dirZ]=h.fc,fx=dirX!==0;
      const fxp=h.cx+dirX*(h.sx/2+1.1),fzp=h.cz+dirZ*(h.sz/2+1.1);for(const s of[-1,1])col.push([fxp+(fx?0:s*1.2),fzp+(fx?s*1.2:0)]);hedge.push([h.cx+dirX*(h.sx/2+3.6),h.cz+dirZ*(h.sz/2+3.6),fx?.7:h.sx*.8,fx?h.sz*.8:.7])}
    CITY_PARENT=G;instanced(new THREE.CylinderGeometry(.18,.2,3.2,10),std({color:0xf6f2ea,roughness:.6}),col,(o,c)=>{o.position.set(c[0],1.6,c[1])});instanced(new THREE.BoxGeometry(1,1,1),std({color:0x24401e,roughness:1}),hedge,(o,c)=>{o.position.set(c[0],.55,c[1]);o.scale.set(c[2],1.1,c[3])});CITY_PARENT=null}
  /* street trees */
  {const T=[];for(let z=NHR.gate-10;z>NHR.z1;z-=13)for(const s of[-1,1])T.push([NHR.lad+s*7.3,z,rand(1.1,1.4),0]);for(let x=NHR.lad+12;x<NHR.pem-8;x+=14)for(const s of[-1,1])T.push([x,NHR.chep+s*5.6,rand(1,1.3),0]);nzTrees(G,T)}
  /* the market: stalls, striped awnings, crates of fruit and flowers */
  {const stripes=[0xc8202a,0x1e6a3a,0x204a9a,0xd88a18].map(c=>{const hex='#'+c.toString(16).padStart(6,'0');const t=new THREE.CanvasTexture(mkCanvas(64,16,x=>{for(let k=0;k<8;k++){x.fillStyle=k%2?'#f4f0e6':hex;x.fillRect(k*8,0,8,16)}}));return std({map:t,roughness:.8,side:THREE.DoubleSide})});
    const S=[[],[],[],[]],tab=[],fr=[],post=[];for(let z=NHR.gate-14;z>NHR.z1+8;z-=rand(6.5,9)){if(Math.abs(z-NHR.chep)<8||Math.abs(z-NHR.west)<8||Math.abs(z-NH_PUB.z)<13)continue;for(const s of[-1,1]){if(Math.random()<.35)continue;const x=nhPrX(z)+s*2.35;S[(Math.random()*4)|0].push([x,z,s]);tab.push([x,z]);for(let q=0;q<10;q++)fr.push([x+rand(-.5,.5),z+rand(-1.05,1.05),(Math.random()*6)|0]);
      for(const a of[-1,1])for(const b of[-1,1])post.push([x+a*.75,z+b*1.25]);boxes.push({x0:x-.8,x1:x+.8,z0:z-1.35,z1:z+1.35,h:1,nz:1})}}
    CITY_PARENT=G;const ag=new THREE.BoxGeometry(2,.05,3);S.forEach((L,i)=>{if(L.length)instanced(ag,stripes[i],L,(o,p)=>{o.position.set(p[0]-p[2]*.15,2.35,p[1]);o.rotation.z=p[2]*.22})});
    instanced(new THREE.BoxGeometry(1.5,.12,2.5),std({color:0x5a3a22,roughness:.9}),tab,(o,p)=>{o.position.set(p[0],.95,p[1])});instanced(new THREE.BoxGeometry(1.4,.8,2.3),std({color:0x3a2a1c,roughness:.95}),tab,(o,p)=>{o.position.set(p[0],.45,p[1])});
    instanced(new THREE.CylinderGeometry(.04,.04,2.4,5),std({color:0x2a2a2e,roughness:.5,metalness:.5}),post,(o,p)=>{o.position.set(p[0],1.2,p[1])});
    {const FC=[0xff8a1a,0xd01818,0xf0d020,0x60b030,0xd060c0,0xf4f0ff];const im=instanced(new THREE.IcosahedronGeometry(.13,0),std({color:0xffffff,roughness:.5}),fr,(o,p)=>{o.position.set(p[0],1.1,p[1])});const c=new THREE.Color();fr.forEach((p,i)=>im.setColorAt(i,c.setHex(FC[p[2]])));im.instanceColor.needsUpdate=true}CITY_PARENT=null}
  /* bunting across Portobello */
  {const tri=new THREE.BufferGeometry();tri.setAttribute('position',new THREE.Float32BufferAttribute([-.22,0,0,.22,0,0,0,-.42,0],3));tri.computeVertexNormals();const F=[],v=[];
    for(let z=NHR.gate-9;z>NHR.z1+4;z-=11){const x=nhPrX(z);const a=V3(x-5.2,8.6,z),b=V3(x+5.2,8.6,z+rand(-2,2));for(let q=0;q<14;q++){const t0=q/14,t1=(q+1)/14;const p0=a.clone().lerp(b,t0),p1=a.clone().lerp(b,t1);p0.y-=Math.sin(t0*Math.PI)*.9;p1.y-=Math.sin(t1*Math.PI)*.9;v.push(p0.x,p0.y,p0.z,p1.x,p1.y,p1.z);F.push([p0.x,p0.y,p0.z,Math.atan2(b.z-a.z,b.x-a.x)])}}
    const lg=new THREE.BufferGeometry();lg.setAttribute('position',new THREE.Float32BufferAttribute(v,3));G.add(new THREE.LineSegments(lg,new THREE.LineBasicMaterial({color:0x222222})));
    CITY_PARENT=G;const im=instanced(tri,new THREE.MeshStandardMaterial({color:0xffffff,roughness:.7,side:THREE.DoubleSide,emissive:0x202020}),F,(o,p)=>{o.position.set(p[0],p[1],p[2]);o.rotation.y=-p[3]});const c=new THREE.Color();const BC=[0xe82a3a,0xf8d020,0x2a7ae8,0x30b850,0xf0f0f0,0xe860c0];F.forEach((p,i)=>im.setColorAt(i,c.setHex(BC[i%6])));im.instanceColor.needsUpdate=true;CITY_PARENT=null}
  /* lamps and street signs */
  {const L=[];for(let z=NHR.gate-8;z>NHR.z1;z-=16){L.push([nhPrX(z)-4.4,z]);L.push([nhPrX(z-8)+4.4,z-8]);L.push([NHR.lad-6.4,z]);L.push([NHR.lad+6.4,z-8])}for(let x=NH.x0+8;x<-276;x+=18){L.push([x,NHR.gate-6.4]);L.push([x+9,NHR.gate+6.4])}for(let x=NH.x0+8;x<NHR.pem;x+=18)L.push([x,NHR.west+5.4]);lampFlush(L,G);for(const l of L)lampList.push(l);
    const sign=(t,b,x,z,ry)=>{const m=new THREE.Mesh(new THREE.PlaneGeometry(2.4,.6),new THREE.MeshStandardMaterial({map:nhSignTex(t,b),roughness:.6,side:THREE.DoubleSide}));m.position.set(x,2.6,z);m.rotation.y=ry;G.add(m)};
    sign('PORTOBELLO ROAD','W11',nhPrX(NHR.gate-7)-5.25,NHR.gate-7,Math.PI/2);sign('PORTOBELLO ROAD','W11',nhPrX(NHR.west+6)+5.25,NHR.west+6,-Math.PI/2);sign('CHEPSTOW VILLAS','W11',NHR.lad+12,NHR.chep-5.4,0);sign('LADBROKE GROVE','W11',NHR.lad+5.6,NHR.gate-8,-Math.PI/2);sign('WESTBOURNE GROVE','W2',NHR.lad+14,NHR.west+5.4,0);sign('NOTTING HILL GATE','W11',-420,NHR.gate+6.2,Math.PI)}
  nhPub(G);NZ.mapP.push([NH_PUB.x,NH_PUB.z]);G.traverse(o=>{if(o.isInstancedMesh)o.frustumCulled=false})}

/* ---------- the ruined pub, cloaked ---------- */
function nhPub(G){const M=nzM();const g=NH.pubG=new THREE.Group();G.add(g);const cx=NH_PUB.x,cz=NH_PUB.z,fx=cx+6;/* front wall at x=fx (faces the road, +x) */
  const brick=M.brick,wood=std({color:0x3a2618,roughness:.9}),dark=std({color:0x1e1510,roughness:.95});
  const fl=c2plane(g,12,14,cx,.04,cz,std({color:0x4a3424,roughness:.9,map:rep(new THREE.CanvasTexture(mkCanvas(64,64,x=>{x.fillStyle='#4a3424';x.fillRect(0,0,64,64);x.fillStyle='rgba(0,0,0,.35)';for(let k=0;k<8;k++)x.fillRect(0,k*8,64,1);for(let k=0;k<60;k++){x.fillStyle='rgba(255,220,180,.06)';x.fillRect(Math.random()*64,Math.random()*64,8,1)}})),3,3)}));fl.receiveShadow=true;
  const W=[];const wall=(w,h,d,x,y,z,ry)=>{const m=c2box(g,w,h,d,x,y,z,brick,false,ry);W.push([x-(ry?d:w)/2,x+(ry?d:w)/2,z-(ry?w:d)/2,z+(ry?w:d)/2,y+h]);return m};
  wall(.6,5.2,14,cx-6,0,cz);wall(.6,7.8,4,cx-6,5.2,cz+5);
  {const segs=[[-6,-2.5,4.4],[-2.5,2,1.4],[2,6,6.8]];for(const[a,b,h]of segs){const m=c2box(g,b-a,h,.6,cx+(a+b)/2,0,cz-7+.3,brick,false);W.push([cx+a,cx+b,cz-7,cz-6.4,h])}
    const segN=[[-6,-1,5.2],[-1,3,2.6],[3,6,4]];for(const[a,b,h]of segN){c2box(g,b-a,h,.6,cx+(a+b)/2,0,cz+7-.3,brick,false);W.push([cx+a,cx+b,cz+6.4,cz+7,h])}}
  for(const[a,b,h]of[[-7,-4.4,6.2],[-4.4,-1.2,1.1],[1.2,4,1.3],[4,7,5.6]]){c2box(g,.6,h,b-a,fx,0,cz+(a+b)/2,brick,false);W.push([fx-.3,fx+.3,cz+a,cz+b,h])}
  c2box(g,.7,.4,14,fx,6,cz,dark,false).rotation.x=.04;
  for(const[z,ry,rz,y]of[[-4.5,0,.0,5.4],[-1.5,.2,-.5,3.2],[2,0,.1,5.2],[5,-.3,.35,2.4]]){const b=c2box(g,12.4,.35,.35,cx,y,cz+z,wood,false);b.rotation.set(0,ry,rz)}
  {const R=[];for(let k=0;k<70;k++){const side=Math.random();let x,z;if(side<.35){x=cx+rand(-5.5,5.5);z=cz+(Math.random()<.5?-6:6)}else if(side<.6){x=fx-rand(.5,1.6);z=cz+rand(-6,6)}else{x=cx-5.2+rand(0,1.2);z=cz+rand(-6,6)}R.push([x,z,rand(.18,.5)])}
    CITY_PARENT=g;instanced(new THREE.DodecahedronGeometry(1,0),std({color:0x5a3a2c,roughness:.95}),R,(o,r)=>{o.position.set(r[0],r[2]*.5,r[1]);o.scale.set(r[2]*1.4,r[2],r[2]*1.1);o.rotation.set(rand(0,3),rand(0,3),rand(0,3))});
    const iv=[];for(let k=0;k<70;k++)iv.push([cx-5.66,rand(.3,4.6),cz+rand(-6.5,6.5),rand(.14,.3),0]);for(let k=0;k<44;k++)iv.push([cx+rand(-5.5,5.5),rand(.3,5.6),cz-6.68,rand(.12,.28),1]);instanced(new THREE.IcosahedronGeometry(1,0),std({color:0x1e3418,roughness:1}),iv,(o,p)=>{o.position.set(p[0],p[1],p[2]);o.scale.set(p[4]?p[3]*1.6:p[3]*.35,p[3]*1.3,p[4]?p[3]*.35:p[3]*1.6);o.rotation.set(rand(0,3),0,rand(0,3))});CITY_PARENT=null}
  /* the bar, the bottles, a table, a chair and a lantern */
  c2box(g,1,1.15,6,cx-4.4,0,cz-1.5,wood,false);c2box(g,1.2,.1,6.3,cx-4.4,1.15,cz-1.5,dark,false);c2box(g,.4,.08,6,cx-5.5,2,cz-1.5,wood,false);
  {const B=[];for(let k=0;k<14;k++)B.push([cx-5.5,cz-4.2+k*.4,Math.random()<.5?0x2a8040:0xb06020]);CITY_PARENT=g;const im=instanced(new THREE.CylinderGeometry(.06,.07,.34,6),std({color:0xffffff,roughness:.2,emissive:0x302010,transparent:true,opacity:.85}),B,(o,b)=>{o.position.set(b[0],2.21,b[1])});const c=new THREE.Color();B.forEach((b,i)=>im.setColorAt(i,c.setHex(b[2])));im.instanceColor.needsUpdate=true;CITY_PARENT=null}
  const tx=cx-1.4,tz=cz-.6;nzCyl(g,.7,.7,.08,tx,.78,tz,wood,14);nzCyl(g,.08,.12,.78,tx,0,tz,dark,6);for(let k=0;k<3;k++){nzCyl(g,.04,.04,.16,tx+rand(-.3,.3),.86,tz+rand(-.3,.3),std({color:0xf0e8d0}),6);nzGlow(g,0xffc070,.9,.9,tx+rand(-.3,.3),1.12,tz+rand(-.3,.3))}
  c2box(g,.5,.45,.5,tx-1.3,0,tz,wood,false);c2box(g,.08,.6,.5,tx-1.55,.45,tz,wood,false);
  {const ln=new THREE.Group();ln.position.set(tx,3.4,tz+.4);g.add(ln);const fr=new THREE.Mesh(new THREE.CylinderGeometry(.16,.2,.42,6,1,true),std({color:0x1a1410,metalness:.6,roughness:.4,side:THREE.DoubleSide}));ln.add(fr);const gl=glowSprite(0xffb050,3.2,.95);ln.add(gl);
    const cord=new THREE.Mesh(new THREE.CylinderGeometry(.015,.015,1.8,4),dark);cord.position.y=1.1;ln.add(cord);const pl=new THREE.PointLight(0xffa850,0,13,2);pl.position.set(0,-.2,0);ln.add(pl);NH.lamp={g:ln,gl,pl}}
  /* the sign, hanging crooked */
  {const st=new THREE.CanvasTexture(mkCanvas(128,96,x=>{x.fillStyle='#1c2a22';x.fillRect(0,0,128,96);x.strokeStyle='#c8a050';x.lineWidth=4;x.strokeRect(4,4,120,88);x.fillStyle='#e8c870';x.font='bold 15px Georgia,serif';x.textAlign='center';x.fillText('THE LAST',64,30);x.fillText('LANTERN',64,82);x.fillStyle='#ffd070';x.beginPath();x.arc(64,52,9,0,TAU);x.fill();x.fillStyle='#3a2a18';x.fillRect(60,40,8,3)}));
    const s=new THREE.Mesh(new THREE.PlaneGeometry(1.6,1.2),new THREE.MeshStandardMaterial({map:st,roughness:.7,side:THREE.DoubleSide,emissive:0x221808}));s.position.set(fx+1.1,4.6,cz+5.2);s.rotation.set(0,Math.PI/2,.28);g.add(s);c2box(g,1.6,.08,.08,fx+.8,5.3,cz+5.2,dark,false)}
  NH.pubW=W;
  /* Alfred */
  if(!NH.alf){const a=makeCHActor('m',{skin:0x5a3826,hair:'hairBuzz',hairCol:0xd8d4cc,brow:0xcfcac2,beard:true,keepReg:[5,6,9],scale:.97,wear:[['long',0x24382a,{roughness:.95}],['trousers',0x3a3028,{roughness:.9}],['shoes',0x1a1410,{roughness:.5}]]});
    if(a){const cap=new THREE.Mesh(new THREE.SphereGeometry(.13,12,6,0,TAU,0,Math.PI/2),std({color:0x3a3428,roughness:1}));cap.scale.set(1.12,.55,1.25);try{a.attach('Head',cap,a.S.SK.Head.clone().add(V3(0,.17,.01)),new THREE.Euler(-.12,0,0))}catch(x){}
      const cane=NH.cane=new THREE.Mesh(new THREE.CylinderGeometry(.018,.022,1,6),std({color:0x2a1a10,roughness:.6}));try{a.attach('hand_r',cane,a.S.SK.hand_r.clone().add(V3(-.48,0,.02)),new THREE.Euler(0,0,Math.PI/2))}catch(x){}try{a.sk(cloakGeo(a.S,a.bones,{w0:.22,w1:.36,top:.1,back:.12,flare:.1,wrap:.34,bottom:a.S.SK.calf_l.y+.06}),std({color:0x4a3a24,roughness:.95,side:THREE.DoubleSide,skinning:true}))}catch(x){}
      cane.visible=false;NH.alf=a;a.g.position.set(tx-1.3,.32,tz);a.g.rotation.y=Math.PI/2;g.add(a.g);if(CH2.st>=16)a.g.visible=false;try{a.setBase('Sitting_Idle_Loop',.2);a.update(.2)}catch(x){}}}
  /* the cloak: a shimmering dome that hides it all */
  {const mat=new THREE.ShaderMaterial({uniforms:{uT:{value:0},uO:{value:.0}},transparent:true,depthWrite:false,blending:THREE.AdditiveBlending,side:THREE.DoubleSide,
    vertexShader:'varying vec3 vN;varying vec3 vW;void main(){vN=normalize(normalMatrix*normal);vW=(modelMatrix*vec4(position,1.)).xyz;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}',
    fragmentShader:'uniform float uT;uniform float uO;varying vec3 vN;varying vec3 vW;void main(){float f=pow(1.-abs(vN.z),2.2);float b=.5+.5*sin(vW.y*3.1-uT*2.4+sin(vW.x*.8+uT)*1.6);float r=.5+.5*sin(length(vW.xz)*1.7-uT*3.);gl_FragColor=vec4(vec3(.65,1.,.6)*(.5+b*.6)+vec3(1.,.8,.3)*r*.3,(f*.55+b*.08)*uO);}'});
    const d=new THREE.Mesh(new THREE.SphereGeometry(10,40,20,0,TAU,0,Math.PI/2),mat);d.position.set(cx,0,cz);G.add(d);NH.dome=d;NZ.anim.push(dt=>{mat.uniforms.uT.value+=dt})}
  g.visible=false}
function nhReveal(){if(NH.shown)return;NH.shown=true;const g=NH.pubG;if(!g)return;g.visible=true;for(const w of NH.pubW||[]){boxes.push({x0:w[0],x1:w[1],z0:w[2],z1:w[3],h:w[4],nz:1})}
  const c=V3(NH_PUB.x,0,NH_PUB.z);flash(c,0xb0ff90,26);sx('portal',.9,null,{rate:.7});ring(c,0xc8ff90,1,14,1.2);for(let k=0;k<4;k++)SP.emit(V3(c.x+rand(-6,6),rand(0,6),c.z+rand(-7,7)),{n:40,c0:0xffffff,c1:0x8aff60,speed:5,life:1.2,s0:.5,s1:.05});
  if(NH.lamp)NH.lamp.pl.intensity=1.4;const d=NH.dome;if(d)addFx(null,1.6,(f,k)=>{d.scale.setScalar(1+k*.6);d.material.uniforms.uO.value=1-k},()=>{d.visible=false})}
{const _mt=muTick;muTick=function(dt){_mt(dt);if(!NH.built||!NH.dome||MODE==='open')return;if(NH.alf&&NH.alf.g.visible&&CH2.zone==='north'&&Math.hypot(P.pos.x-NH_PUB.x,P.pos.z-NH_PUB.z)<90)try{NH.alf.update(dt)}catch(x){}const d=NH.dome;if(NH.shown){if(NH.lamp){NH.lamp.gl.material.opacity=.8+Math.sin(time*9)*.08+Math.sin(time*23)*.05;NH.lamp.g.rotation.z=Math.sin(time*.9)*.05}return}
  const dd=Math.hypot(P.pos.x-NH_PUB.x,P.pos.z-NH_PUB.z);d.material.uniforms.uO.value=CH2.st>=14?clamp(1-(dd-14)/50,.15,1):0;d.visible=true;
  if(CH2.st>=14&&dd<17&&!CS.active)nhReveal()}}

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
      after(.6,()=>toast('London grows west. Follow Notting Hill Gate to Portobello Road.','Notting Hill is open',true))})}
{const _mt=muTick;muTick=function(dt){_mt(dt);if(!started||MODE==='open'||CS.active||!P.alive||CH2.zone!=='north')return;
  if(CH2.st===13&&!X3.phase&&(!X3.e||X3.e.dead)){X4.t13+=dt;if(X4.t13>5&&!SAYQ.on&&!SAYQ.q.length)x4Explain()}
  if(CH2.st===14&&NH.shown&&Math.hypot(P.pos.x-NH_PUB.door.x,P.pos.z-NH_PUB.door.z)<4.2)x4Pub();
  if(CH2.st===15&&P.pos.z<-9855&&Math.abs(P.pos.x-nhPrX(P.pos.z))<3.6&&Math.abs(P.pos.z-NH_PUB.z)<26)x4Brother();
  if(CH2.st===16&&!X4.fight&&!X4.e&&Math.hypot(P.pos.x-NH_PUB.door.x,P.pos.z-NH_PUB.door.z)<40){X4.re+=dt;if(X4.re>1.5)x4Rematch()}}}

/* ---------- inside the pub ---------- */
function x4Transfer(from,to,dur){const A0=()=>headOf(from(),1.2),B0=()=>headOf(to(),1.3);runeFlash(from(),0xf2c040,6,dur);runeFlash(to(),0x80ff70,6,dur);
  const beam=new THREE.Mesh(new THREE.CylinderGeometry(.2,.2,1,14,1,true),new THREE.MeshBasicMaterial({color:0xf8d060,transparent:true,opacity:0,blending:THREE.AdditiveBlending,depthWrite:false}));scene.add(beam);const ga=glowSprite(0xffd060,3,0,false),gb=glowSprite(0x90ff80,3,0,false);scene.add(ga);scene.add(gb);
  addFx(null,dur,(f,k)=>{const A=A0(),B=B0();const up=Math.min(1,k*2.5),dn=1-Math.max(0,k-.9)/.1;beam.position.copy(A).lerp(B,.5);beam.scale.set(.6+k,A.distanceTo(B),.6+k);beam.lookAt(B);beam.rotateX(Math.PI/2);beam.material.opacity=.5*up*dn;ga.position.copy(A);gb.position.copy(B);ga.scale.setScalar(3+k*3);gb.scale.setScalar(2+k*8);ga.material.opacity=.6*up*dn;gb.material.opacity=.7*up*dn;
    for(let q=0;q<3;q++){const u=(f.t*.8+q/3)%1;const p=A.clone().lerp(B,u);const d=B.clone().sub(A).normalize();const r1=V3(d.z,0,-d.x).normalize(),r2=V3().crossVectors(d,r1);const a=f.t*9+q*2.1+u*7,rad=.7*Math.sin(u*Math.PI);p.addScaledVector(r1,Math.cos(a)*rad).addScaledVector(r2,Math.sin(a)*rad);SP.emit(p,{c0:q?0xfff4c0:0xffffff,c1:q?0xf0a020:0x60e050,s0:.45,s1:.05,life:.55})}
    if(LYR.a)LYR.a.g.position.y=groundAt(LYR.a.g.position.x,LYR.a.g.position.z)+Math.sin(Math.min(1,k*2)*Math.PI*.5)*.55*dn;if(k>.85&&!f.bl){f.bl=1;flash(B,0xd8ff90,24);SP.emit(B,{n:140,c0:0xffffff,c1:0x9aff60,speed:10,life:1.1,s0:.5,s1:.05});sx('powerup',1,null,{rate:1.1})}},()=>{scene.remove(beam);scene.remove(ga);scene.remove(gb)})}
function x4Pub(){if(CS.active||X4.pub)return;X4.pub=1;const a=NH.alf;const ap=()=>a?a.g.position:V3(NH_PUB.x,0,NH_PUB.z);const inP=V3(NH_PUB.x+.5,0,NH_PUB.z+2.5);x4Stage(inP,-Math.PI/2);
  if(KFW.a){KFW.a.g.position.set(NH_PUB.x+2.3,0,NH_PUB.z+3.1);x4Face(KFW.a,ap())}if(LYR.a){LYR.a.g.position.set(NH_PUB.x+.9,0,NH_PUB.z-2.7);x4Face(LYR.a,ap())}P.face=Math.atan2(ap().x-P.pos.x,ap().z-P.pos.z);X4.cc=V3(NH_PUB.x-.4,0,NH_PUB.z);
  const aS=(s,d,h)=>()=>({pos:headOf(ap(),h||1.25).add(V3(d||2.4,.2,s||.8)),look:headOf(ap(),1.05)});const wS=(s,d)=>x4S(()=>P.pos,s,d||2.6,1.75),lS=(s,d)=>x4S(x4L,s,d||2.4,1.6),kS=(s,d)=>x4S(x4K,s,d||2.4,1.75);
  let sg=[];const stand=()=>{if(!a)return;if(NH.cane)NH.cane.visible=true;try{a.setBase('Idle_Loop',.4)}catch(x){}a.g.position.y=0};
  playCutscene([{dur:3.4,fov:44,cam:k=>({pos:V3(NH_PUB.x+7.5-k*2.5,2.6-k*.6,NH_PUB.z+3-k*2.2),look:headOf(ap(),1)}),onStart:()=>{x4Talk('');if(NH.lamp)NH.lamp.pl.intensity=1.6}},
    {who:'Alfred',text:XL3.al_01,fov:38,cam:aS(.9,2.3),onStart:()=>{try{a&&a.setBase('Sitting_Talking_Loop',.3)}catch(x){}}},
    {who:'@',text:XL3.m8_08,cam:wS(1.1,2.2),onStart:()=>x4Talk('@')},
    {who:'Alfred',text:XL3.al_02,fov:36,cam:aS(-.9,2.2),onStart:()=>x4Talk('')},
    {who:'Alfred',text:XL3.al_03,fov:46,cam:k=>({pos:V3(NH_PUB.x+1.4-k*.6,2.4,NH_PUB.z+5.4),look:V3(NH_PUB.x-1.4,2,NH_PUB.z-.6)}),onStart:()=>{const b=V3(NH_PUB.x-1.4,2.3,NH_PUB.z-.6);sg=[x4Sigil(b.clone().add(V3(-.9,0,-1.2)),0x9a9aa8,true),x4Sigil(b.clone().add(V3(-.9,0,1.2)),0x9a9aa8,true),x4Sigil(b.clone().add(V3(.2,.6,0)),0xff3040,false)];for(const s of sg)s.scale.setScalar(.22)}},
    {who:'@',text:XL3.m8_09,cam:wS(-1,2.1),onStart:()=>x4Talk('@')},
    {who:'Alfred',text:XL3.al_04,fov:38,cam:aS(.7,2.1),onStart:()=>{x4Talk('');for(const s of sg)scene.remove(s);sg=[]}},
    {who:'Alfred',text:XL3.al_05,fov:42,cam:k=>({pos:V3(NH_PUB.x+2.6,1.9,NH_PUB.z-3.2+k),look:V3(NH_PUB.x-.6,1.3,NH_PUB.z-.6)}),onStart:()=>{stand();if(a)a.g.position.set(NH_PUB.x-2.2,0,NH_PUB.z-.6);if(LYR.a){LYR.a.g.position.set(NH_PUB.x-.4,0,NH_PUB.z-1.6);x4Face(LYR.a,ap());x4Face(a,LYR.a.g.position)}}},
    {dur:6.2,fov:52,cam:k=>{const m=ap().clone().lerp(x4L(),.5);return{pos:V3(m.x+4.6-k*.8,1.6+k*1.4,m.z+3.2+k*.6),look:V3(m.x,1.3+k*.3,m.z)}},onStart:()=>{try{a&&a.fire('Spell_Simple_Shoot',.4)}catch(x){}x4Transfer(ap,x4L,5.8);sx('riser',.7,null,{rate:.8})},update:()=>{if(Math.random()<.4)SP.emit(headOf(x4L(),rand(.2,1.8)).add(V3(rand(-.6,.6),0,rand(-.6,.6))),{c0:0xffffff,c1:0xb0ff60,s0:.35,s1:.03,life:.8,up:1.4})}},
    {who:'Lyra',text:XL3.ly53,fov:38,cam:lS(1,2.1),onStart:()=>{x4Talk('Lyra');if(LYR.a)LYR.a.g.position.y=0}},
    {who:'Alfred',text:XL3.al_06,fov:36,cam:()=>({pos:headOf(ap(),1.6).add(V3(2,0,1.4)),look:headOf(ap(),1.5)}),onStart:()=>x4Talk('')},
    {who:'Kaen',text:XL3.k8_05,cam:kS(1.1,2.2),onStart:()=>x4Talk('Kaen')}],
    ()=>{for(const s of sg)scene.remove(s);KFW.pin=0;P.heroAnim=null;x4Talk('');X4.cc=null;CH2.st=Math.max(CH2.st,15);ch2Save();if(a){a.g.position.set(NH_PUB.x+3,0,NH_PUB.z+1.2);try{a.setBase('Idle_Loop',.3)}catch(x){}x4Face(a,V3(NH_PUB.door.x+5,0,NH_PUB.z))}
      after(.8,()=>toast('Lyra has magic of her own again. She can fly without a guardian.','Alfred\'s gift',true))})}

/* ---------- Desmond ---------- */
function buildDesmond(){const a=makeCHActor('m',{skin:0x4a2e20,hair:'hairBuzz',hairCol:0xb4b0a8,brow:0xa8a49c,beard:true,keepReg:[5,6,9],scale:1.04,wear:[['long',0x1c1424,{roughness:.6}],['trousers',0x14101a,{roughness:.8}],['shoes',0x0a080c,{roughness:.4}]]});
  if(!a){const g=new THREE.Group();const b=new THREE.Mesh(new THREE.CapsuleGeometry?new THREE.CylinderGeometry(.5,.6,2.2,10):new THREE.CylinderGeometry(.5,.6,2.2,10),std({color:0x1c1424}));b.position.y=1.1;g.add(b);return{g,body:g}}
  const SK=a.S.SK;const staff=new THREE.Group();const sh=new THREE.Mesh(new THREE.CylinderGeometry(.03,.04,1.9,7),std({color:0x2a1a10,roughness:.7}));staff.add(sh);const orb=new THREE.Mesh(new THREE.IcosahedronGeometry(.11,1),new THREE.MeshBasicMaterial({color:0xb8ff90}));orb.position.y=1;staff.add(orb);const og=glowSprite(0x9aff70,1.6,.8);og.position.y=1;staff.add(og);
  try{a.attach('hand_r',staff,SK.hand_r.clone().add(V3(-.22,0,.02)),new THREE.Euler(0,0,-Math.PI/2))}catch(x){}try{a.sk(cloakGeo(a.S,a.bones,{w0:.24,w1:.44,top:.12,back:.12,flare:.2,wrap:.26,bottom:SK.calf_l.y-.3}),std({color:0x1a1220,roughness:.7,side:THREE.DoubleSide,emissive:0x0a1406,skinning:true}))}catch(x){}
  const hat=new THREE.Group();const brim=new THREE.Mesh(new THREE.CylinderGeometry(.28,.28,.02,18),std({color:0x16101a,roughness:.8}));hat.add(brim);const crown=new THREE.Mesh(new THREE.CylinderGeometry(.13,.15,.16,14),std({color:0x16101a,roughness:.8}));crown.position.y=.08;hat.add(crown);const band=new THREE.Mesh(new THREE.CylinderGeometry(.152,.152,.03,14),std({color:0x5a8a30,roughness:.6}));band.position.y=.03;hat.add(band);
  try{a.attach('Head',hat,SK.Head.clone().add(V3(0,.2,.01)),new THREE.Euler(-.08,0,0))}catch(x){}
  const eyes=[];for(const s of[-1,1]){const e=glowSprite(0xb0ff80,.18,.9);try{a.attach('Head',e,SK.Head.clone().add(V3(s*.034,.075,.1)))}catch(x){}eyes.push(e)}
  const aura=glowSprite(0x6aff50,5,.12);aura.position.y=1.2;a.g.add(aura);const bub=new THREE.Mesh(new THREE.SphereGeometry(1.5,24,16),new THREE.MeshBasicMaterial({color:0xd8ff70,transparent:true,opacity:.16,blending:THREE.AdditiveBlending,depthWrite:false,side:THREE.DoubleSide}));bub.position.y=1.1;bub.visible=false;a.g.add(bub);
  return{g:a.g,body:a.body,actor:a,head:a.head,orb:og,anim:(e,dt,mv)=>{actorAnimate(e,dt,mv);bub.visible=!!e.guarded;if(bub.visible){bub.rotation.y+=dt;bub.material.opacity=.14+Math.sin(e.t*5)*.05}aura.material.opacity=.1+Math.sin(e.t*2)*.05+(e.ai.big||0)*.2;
    eyes.forEach(s=>s.material.opacity=.7+Math.sin(e.t*7)*.25);const s=e.m.g.scale.x;if(Math.random()<.55)SM.emit(V3(e.pos.x+rand(-.6,.6)*s,e.pos.y+rand(0,.6)*s,e.pos.z+rand(-.6,.6)*s),{c0:0x5a5650,c1:0x141210,s0:.8*s,s1:2.4*s,life:1.6,a:.4,up:.9})}}}
function buildWard(){const g=new THREE.Group();const m=std({color:0x2a2a22,roughness:.5,metalness:.3,emissive:0x90c040,emissiveIntensity:.5});const s=new THREE.Mesh(new THREE.CylinderGeometry(.35,.55,2.8,6),m);s.position.y=1.4;g.add(s);const top=new THREE.Mesh(new THREE.OctahedronGeometry(.5,0),new THREE.MeshBasicMaterial({color:0xd8ff80}));top.position.y=3.3;g.add(top);const gl=glowSprite(0xc0ff70,4,.6);gl.position.y=3.3;g.add(gl);const rn=decal(runeTex,0xb8ff60,4,true,.7);rn.position.y=.06;g.add(rn);
  return{g,body:g,anim:(e,dt)=>{top.rotation.y+=dt*2;top.position.y=3.3+Math.sin(e.t*3)*.15;rn.rotation.z+=dt;gl.material.opacity=.5+Math.sin(e.t*6)*.2;s.scale.setScalar(1+e.flash*1.5)}}}
ETYPES.desmond={name:'Desmond Mumbash, the Smoke of Portobello',boss:true,hp:9000,speed:3.2,dmg:24,range:0,cd:9,xp:6000,r:1,h:2.4,kite:true,noCalm:true,build:buildDesmond};
ETYPES.dward={name:'Ward Glyph',hp:320,speed:0,dmg:0,range:0,cd:99,xp:40,r:.8,h:3.2,build:buildWard};
Object.assign(BTH,{desmond:'mus_b_smoke'});if(MU.keys)MU.keys.push('mus_b_smoke');
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
{const _mt=muTick;muTick=function(dt){_mt(dt);if(!X4.fight||!X4.e||X4.e.dead||CS.active||!P.alive)return;const e=X4.e;const tgt=()=>{const w=enemies.find(o=>!o.dead&&o.dw);return w||e};
  X4.cmp.k-=dt;X4.cmp.l-=dt;
  if(X4.cmp.k<=0&&KFW.a&&KFW.a.g.visible){X4.cmp.k=rand(6,8.5);const t=tgt(),kp=KFW.a.g.position;const dir=V3(t.pos.x-kp.x,0,t.pos.z-kp.z);const L=dir.length();dir.normalize();x4Face(KFW.a,t.pos);try{KFW.a.fire('Melee_Hook',.7)}catch(x){}
    crescentFx(V3(kp.x,kp.y,kp.z),dir,Math.min(L,22),0xb070ff);after(Math.min(.5,L/40),()=>{if(!t.dead){damageEnemy(t,t.maxhp*(t.dw?.18:.011),'#c8a0ff');SP.emit(eCenter(t),{n:30,c0:0xffffff,c1:0x9050ff,speed:6,life:.5})}})}
  if(X4.cmp.l<=0&&LYR.a&&LYR.a.g.visible){X4.cmp.l=rand(4.5,6);const t=tgt(),A=headOf(LYR.a.g.position,1.3);const o=glowSprite(0xffd070,2.6,.95);o.position.copy(A);scene.add(o);try{LYR.a.fire&&LYR.a.fire('Spell_Simple_Shoot',.5)}catch(x){}
    addFx(o,.55,(f,k)=>{o.position.lerpVectors(A,eCenter(t),k);SP.emit(o.position,{c0:0xfff0c0,c1:0x80e050,s0:.4,s1:.05,life:.4})},()=>{scene.remove(o);if(!t.dead){damageEnemy(t,t.maxhp*(t.dw?.12:.007),'#ffe090');flash(eCenter(t),0xd8ff90,6)}})}}}
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
    {dur:2.6,fov:48,cam:k=>{const m=ap().clone().lerp(e.pos,.5);return{pos:V3(m.x+9,2.6,m.z+2),look:V3(m.x,1.4,m.z)}},onStart:()=>{try{e.m.actor.fire('Spell_Simple_Shoot',.6)}catch(x){}ser=glowSprite(0xb8ff80,2.4,.9);ser.position.copy(dsHand(e));scene.add(ser);sx('cackle',.6,null,{rate:.5})},
      update:(dt,k)=>{if(!ser)return;const A=dsHand(e),B=headOf(ap(),1.2);const kk=Math.min(1,k*1.6);ser.position.lerpVectors(A,B,kk);ser.position.y+=Math.sin(kk*Math.PI)*1.2+Math.sin(kk*20)*.25;for(let i=0;i<3;i++)SM.emit(ser.position.clone().add(V3(rand(-.2,.2),rand(-.2,.2),rand(-.2,.2))),{c0:0x6a6a5a,c1:0x10120c,s0:.8,s1:2,life:1,a:.6,up:.3});
        if(kk>=1&&!X4.hitA){X4.hitA=1;scene.remove(ser);ser=null;flash(B,0xb8ff70,16);P.shake=.6;SM.emit(B,{n:30,c0:0x6a6a5a,c1:0x10120c,s0:2,s1:4,life:1.4,a:.6,up:1});try{a&&a.once('Death01',3)}catch(x){}}}},
    {who:'@',text:XL3.m8_10,fov:42,cam:x4S(()=>P.pos,1.2,2.6,1.7),onStart:()=>{const k=ap().clone().add(V3(.9,0,-.4));P.pos.set(k.x,0,k.z);P.face=Math.atan2(ap().x-k.x,ap().z-k.z);P.heroAnim='Fixing_Kneeling'}},
    {who:'Alfred',text:XL3.al_08,fov:34,cam:()=>({pos:headOf(ap(),.5).add(V3(1.4,.5,1.2)),look:headOf(ap(),.25)}),onStart:()=>{P.heroAnim='Fixing_Kneeling'}},
    {who:'Desmond',text:XL3.de_03,fov:40,title:['Desmond Mumbash','The Smoke of Portobello'],cam:k=>({pos:headOf(e.pos,1.4).add(V3(2-k,0,-4.6+k)),look:headOf(e.pos,2)}),onStart:()=>{P.heroAnim=null;e.m.g.rotation.y=Math.atan2(P.pos.x-e.pos.x,P.pos.z-e.pos.z);flash(e.pos,0xb0ff70,14)},update:()=>{for(let i=0;i<3;i++)SM.emit(V3(e.pos.x+rand(-2,2),rand(0,3),e.pos.z+rand(-2,2)),{c0:0x6e6a62,c1:0x1c1a18,s0:2,s1:5,life:2,a:.5,up:1})}}],
    ()=>{if(ser)scene.remove(ser);KFW.pin=0;P.heroAnim=null;x4Talk('');X4.cc=null;CH2.st=Math.max(CH2.st,16);ch2Save();x4Fight()})}
function x4Fight(){const e=X4.e;if(!e)return;e.m.g.visible=true;e.invuln=false;e.busy=0;e.ai.on=1;e.pos.y=0;X4.fight=1;X4.said.wall=0;bossRef=e;$('boss').classList.remove('hidden');$('bossName').innerHTML=`${e.def.name} <span style="color:#ff4050">· Lv ${e.lvl}</span>`;P.invuln=2;
  if(KFW.a)KFW.a.g.visible=true;after(.6,()=>toast('He hides behind wards, fills the street with smoke and grows when he is hurt. Kaen and Lyra will help.','Desmond',true))}
function x4Rematch(){X4.re=0;if(CS.active)return;const dp=V3(nhPrX(-9922),0,-9922);const e=spawnEnemy('desmond',dp.clone());e.lvl=P.level;e.aggro=true;e.quest=true;X4.e=e;e.ai.on=0;e.invuln=true;e.busy=999;
  playCutscene([{who:'Desmond',text:XL3.de_03,fov:42,cam:()=>({pos:headOf(e.pos,1.6).add(V3(2.2,0,-4)),look:headOf(e.pos,1.9)}),onStart:()=>{e.m.g.rotation.y=Math.atan2(P.pos.x-e.pos.x,P.pos.z-e.pos.z);flash(e.pos,0xb0ff70,14)}}],x4Fight)}
{const _rv=revive;revive=function(){const was=X4.fight;X4.fight=0;X4.e=null;for(const W of X4.walls)scene.remove(W.m);X4.walls=[];X4.smokes=[];X4.haze=0;ETYPES.desmond.r=1;ETYPES.desmond.h=2.4;const r=_rv.apply(this,arguments);if(was){X4.re=-6;after(1.2,()=>toast('Desmond is still on Portobello Road. Go back when you are ready.','Retreat',true))}return r}}
{const _bo=bossOutro;bossOutro=function(type,c){if(type==='desmond')return x4End(c);return _bo.apply(this,arguments)}}
function x4End(c){X4.fight=0;for(const W of X4.walls)scene.remove(W.m);X4.walls=[];X4.smokes=[];for(const o of enemies)if(!o.dead&&o.dw)removeEnemy(o);const a=NH.alf;const ap=()=>a?a.g.position:NH_PUB.door;ETYPES.desmond.r=1;ETYPES.desmond.h=2.4;
  playCutscene([{who:'Desmond',text:XL3.de_07,fov:44,cam:k=>({pos:V3(c.x+Math.sin(k)*6,c.y+1.5,c.z+Math.cos(k)*6),look:c}),update:()=>{for(let i=0;i<4;i++)SM.emit(V3(c.x+rand(-1.5,1.5),c.y+rand(-1,2),c.z+rand(-1.5,1.5)),{c0:0x76726a,c1:0x24221e,s0:2,s1:5,life:2,a:.6,up:2.5})}},
    {dur:3,fov:56,cam:k=>({pos:V3(c.x+10,6+k*6,c.z+14),look:V3(c.x,3+k*6,c.z)}),onStart:()=>{flash(c,0xffffff,30);SP.emit(c,{n:200,c0:0xffffff,c1:0xb0ff70,speed:14,life:1.4,s0:.6,s1:.05})},update:()=>{SM.emit(V3(c.x+rand(-6,6),rand(2,12),c.z+rand(-6,6)),{c0:0x76726a,c1:0x24221e,s0:3,s1:8,life:2.4,a:.3,up:3})}},
    {who:'@',text:XL3.m8_11,fov:40,cam:()=>({pos:headOf(ap(),.6).add(V3(1.6,.9,1.6)),look:headOf(ap(),.4)}),onStart:()=>{const k=ap().clone().add(V3(.9,0,-.4));P.pos.set(k.x,0,k.z);P.face=Math.atan2(ap().x-k.x,ap().z-k.z);P.heroAnim='Fixing_Kneeling';X4.cc=ap().clone();
      if(KFW.a){KFW.a.g.position.set(ap().x+1.6,0,ap().z+1.4);KFW.pin=1;x4Face(KFW.a,ap())}if(LYR.a){LYR.a.g.position.set(ap().x-.4,0,ap().z+1.9);x4Face(LYR.a,ap())}runeFlash(ap(),0xffd070,4,8);nzGlow(scene,0xffc070,1.4,.9,ap().x+.5,.3,ap().z+.6)}},
    {who:'Kaen',text:XL3.k8_06,fov:38,cam:x4S(x4K,1.1,2.4,1.75),onStart:()=>{P.heroAnim='Idle_Loop';x4Talk('Kaen')}},
    {who:'Lyra',text:XL3.ly54,fov:38,cam:x4S(x4L,-1.1,2.3,1.6),onStart:()=>{x4Talk('Lyra')},update:()=>{if(Math.random()<.3&&LYR.a)SP.emit(headOf(LYR.a.g.position,1.1),{c0:0xfff0c0,c1:0x90e060,s0:.35,s1:.04,life:.8,up:.8})}}],x4Finish)}
function x4Finish(){KFW.pin=0;P.heroAnim=null;x4Talk('');X4.cc=null;X4.e=null;CH2.st=Math.max(CH2.st,17);ch2Save();beaten.add('desmond');writeSave();$('boss').classList.add('hidden');bossRef=null;
  toast('Desmond is gone, and so is Alfred. The last vessel waits at Westminster.','Chapter XIV complete',true);after(9,()=>toast('Chapter XV is coming.','Sorcière',true))}

/* ---------- objectives, Lyra's own wings, chapter select ---------- */
{const _xo=xiiObj;xiiObj=function(){const st=CH2.st;if(st<13)return _xo.apply(this,arguments);if(CH2.zone==='paris')return 'Ask <b>Lyra</b> for the door to Calais, then fly back to London';
  if(st===13)return 'Talk with Kaen and Lyra';if(st===14){const d=Math.round(Math.hypot(P.pos.x-NH_PUB.door.x,P.pos.z-NH_PUB.door.z));return `Find <b>Alfred Mumbash</b> on Portobello Road · ${d}m`}
  if(st===15)return 'Step back out onto <b>Portobello Road</b>';if(st===16)return X4.fight?'Defeat <b>Desmond Mumbash</b>':`Return to <b>Portobello Road</b> · ${Math.round(Math.hypot(P.pos.x-NH_PUB.door.x,P.pos.z-NH_PUB.door.z))}m`;return 'Chapter XV is coming'}}
CHAPTERS.push({id:'smoke',n:'XIV',title:'The Smoke of Portobello',desc:'What the Crown really is, an old man in a cloaked pub, and a brother made of smoke.'});
{const _cb=chapBoss;chapBoss=function(c){if(c.id==='smoke')return null;return _cb(c)}}
function x4Reset(){if(X4.e&&!X4.e.dead)removeEnemy(X4.e);for(const o of enemies)if(!o.dead&&o.dw)removeEnemy(o);X4.e=null;X4.fight=0;X4.t13=0;X4.pub=0;X4.bro=0;X4.hitA=0;X4.re=0;X4.said={};for(const W of X4.walls)scene.remove(W.m);X4.walls=[];X4.smokes=[];X4.haze=0;ETYPES.desmond.r=1;ETYPES.desmond.h=2.4;
  if(NH.alf){if(NH.cane)NH.cane.visible=false;NH.alf.g.position.set(NH_PUB.x-2.7,.32,NH_PUB.z-.6);NH.alf.g.rotation.y=Math.PI/2;try{NH.alf.setBase('Sitting_Idle_Loop',.2)}catch(x){}}for(const A of NHAREAS)A.seen=0}
{const _ac=applyChapter;applyChapter=function(id){x4Reset();if(id!=='smoke')return _ac.apply(this,arguments);_ac.call(this,'escape');
  CH2.st=13;ch2Save();XII.lazy=1;XII.rv=[1,1,1,1,1,1];XII.solid=1;XII.wd=1;XII.said={fk:1,lon:1};xiiSave();WD.esc=1;if(WD.e&&!WD.e.dead){WD.e.dead=true;WD.e.m.g.visible=false}WD.e=null;beaten.add('vesper');
  nzEnter('london');CH2.obj=nzObj;const g=V3(36,0,-9866);P.pos.set(g.x,groundAt(g.x,g.z),g.z);P.face=Math.PI;yaw=0;try{x3GearKaen()}catch(x){}if(KFW.a)KFW.a.g.position.set(g.x+1.4,P.pos.y,g.z+1.4);lyraPlace(g.x-1.6,g.z+1.6,Math.PI);LYR.home=false;X4.t13=4}}
{const _rc=renderChapters;renderChapters=function(){_rc();const list=$('chapList');const el=list&&list.children[chapIndexOf('smoke')];if(el){const done=CH2.st>=17,cur=started&&CH2.st>=13&&CH2.st<17;el.className='chap'+(done?' done':'')+(cur?' cur':'')}}}
{const _rc2=renderChapters;renderChapters=function(){_rc2();const list=$('chapList');const el=list&&list.children[chapIndexOf('shadow')];if(el&&CH2.st>=13&&el.className.includes('cur'))el.className=el.className.replace(' cur','')}}
