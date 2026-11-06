/* ================= Chapter XII polish + Chapter XIII: the Crown's Shadow ================= */

/* ---------- a proper raven: lathe body, layered feathers, jointed wings ---------- */
let RAVEN_FT=null;
function ravenFeatherTex(){if(RAVEN_FT)return RAVEN_FT;RAVEN_FT=canvasTex(64,256,(x,w,h)=>{x.clearRect(0,0,w,h);const cx=w/2;
  x.beginPath();x.moveTo(cx,h-2);x.bezierCurveTo(cx+w*.46,h*.78,cx+w*.42,h*.2,cx+w*.08,4);x.lineTo(cx-w*.04,2);x.bezierCurveTo(cx-w*.36,h*.24,cx-w*.4,h*.78,cx,h-2);x.closePath();
  const gr=x.createLinearGradient(0,0,w,0);gr.addColorStop(0,'#8a8a96');gr.addColorStop(.5,'#ffffff');gr.addColorStop(1,'#9a9aa8');x.fillStyle=gr;x.fill();x.save();x.clip();
  x.strokeStyle='rgba(40,40,60,.55)';x.lineWidth=1;for(let y=8;y<h;y+=5){x.beginPath();x.moveTo(cx,y);x.lineTo(0,y-14);x.moveTo(cx,y);x.lineTo(w,y-14);x.stroke()}
  for(let k=0;k<5;k++){const y=rand(30,h-20);x.clearRect(rand(0,8),y,w*.3,2);x.clearRect(w-rand(8,20),y+8,w*.3,2)}x.restore();
  x.strokeStyle='#f4f4ff';x.lineWidth=2;x.beginPath();x.moveTo(cx,h);x.lineTo(cx+1,6);x.stroke()});return RAVEN_FT}
function buildRaven(s){const g=new THREE.Group(),body=new THREE.Group();g.add(body);const I=new THREE.Group();I.scale.setScalar(s);body.add(I);
  const fm=new THREE.MeshPhysicalMaterial({color:0x101018,roughness:.38,metalness:.2,clearcoat:.6,clearcoatRoughness:.35,emissive:0x0a0618,emissiveIntensity:.5});
  const ff=new THREE.MeshStandardMaterial({map:ravenFeatherTex(),color:0x15151f,roughness:.42,metalness:.28,side:THREE.DoubleSide,alphaTest:.45,emissive:0x0c0a20,emissiveIntensity:.45});
  const km=std({color:0x16161a,roughness:.3,metalness:.55});
  const prof=[[0,-.78],[.1,-.66],[.22,-.44],[.31,-.18],[.34,.06],[.32,.26],[.26,.44],[.17,.57],[.06,.64],[0,.65]].map(p=>new THREE.Vector2(p[0],p[1]));
  const bg=new THREE.LatheGeometry(prof,18);bg.rotateX(Math.PI/2);const b=new THREE.Mesh(bg,fm);b.scale.set(.9,.85,1);b.position.y=1;b.rotation.x=-.18;I.add(b);
  const neck=new THREE.Mesh(new THREE.SphereGeometry(.2,14,10),fm);neck.scale.set(1,1.1,1.2);neck.position.set(0,1.2,.52);I.add(neck);
  const hd=new THREE.Group();hd.position.set(0,1.36,.66);I.add(hd);const sk=new THREE.Mesh(new THREE.SphereGeometry(.19,16,12),fm);sk.scale.set(.92,.9,1.12);hd.add(sk);
  const ub=new THREE.Mesh(new THREE.ConeGeometry(.075,.4,8),km);ub.rotation.x=Math.PI/2;ub.scale.set(1,1,.8);ub.position.set(0,.02,.33);hd.add(ub);
  const tip=new THREE.Mesh(new THREE.ConeGeometry(.032,.11,6),km);tip.position.set(0,-.02,.53);tip.rotation.x=Math.PI/2+.9;hd.add(tip);
  const lb=new THREE.Mesh(new THREE.ConeGeometry(.05,.3,6),km);lb.rotation.x=Math.PI/2+.12;lb.position.set(0,-.05,.28);hd.add(lb);
  const bris=new THREE.Mesh(new THREE.ConeGeometry(.08,.16,8),fm);bris.rotation.x=Math.PI/2;bris.position.set(0,.04,.18);bris.scale.set(1.2,.7,1);hd.add(bris);
  for(const q of[-1,1]){const ey=new THREE.Mesh(new THREE.SphereGeometry(.03,8,6),new THREE.MeshBasicMaterial({color:0x020202}));ey.position.set(q*.12,.05,.1);hd.add(ey);const gl=glowSprite(0x70ff90,.22,.9,false);gl.position.set(q*.13,.05,.11);hd.add(gl)}
  for(let k=0;k<9;k++){const h=new THREE.Mesh(new THREE.ConeGeometry(.04,.22,4),fm);const a=(k/8-.5)*1.6;h.position.set(Math.sin(a)*.12,1.14-Math.abs(a)*.02,.62+Math.cos(a)*.06);h.rotation.set(Math.PI*.82,0,a*.4);I.add(h)}
  const feather=(L,W)=>{const pg=new THREE.PlaneGeometry(W,L);pg.translate(0,L/2,0);pg.rotateX(-Math.PI/2);return new THREE.Mesh(pg,ff)};
  const wings=[];for(const q of[-1,1]){const w=new THREE.Group();w.position.set(q*.24,1.18,.2);I.add(w);const arm=new THREE.Group();w.add(arm);
    for(let k=0;k<6;k++){const f=feather(.5+k*.05,.2);f.position.set(q*(.06+k*.09),.01,0);f.rotation.y=-q*.08*k;arm.add(f)}
    for(let k=0;k<4;k++){const f=feather(.3,.22);f.position.set(q*(.08+k*.12),.04,.04);f.rotation.y=-q*.1;arm.add(f)}
    const hand=new THREE.Group();hand.position.set(q*.58,0,0);arm.add(hand);const prim=[];
    for(let k=0;k<9;k++){const f=feather(.66+Math.sin(k/8*Math.PI)*.34,.17);f.position.set(q*k*.035,-.005*k,0);hand.add(f);prim.push(f)}
    wings.push({w,arm,hand,prim,q})}
  const tail=new THREE.Group();tail.position.set(0,.98,-.6);I.add(tail);const tf=[];for(let k=0;k<9;k++){const f=feather(.78-Math.abs(k-4)*.04,.2);tail.add(f);tf.push(f)}
  const legs=[];for(const q of[-1,1]){const leg=new THREE.Group();leg.position.set(q*.13,.74,.1);I.add(leg);legs.push(leg);const sh=new THREE.Mesh(new THREE.CylinderGeometry(.03,.024,.24,6),km);sh.position.y=-.12;leg.add(sh);
    for(const a of[-.45,0,.45,Math.PI]){const t=new THREE.Mesh(new THREE.CylinderGeometry(.016,.012,.2,5),km);t.rotation.set(Math.PI/2,0,0);t.position.set(Math.sin(a)*.09,-.24,Math.cos(a)*.09);t.rotation.y=a;leg.add(t);
      const c=new THREE.Mesh(new THREE.ConeGeometry(.016,.07,5),km);c.position.set(Math.sin(a)*.2,-.26,Math.cos(a)*.2);c.rotation.set(Math.PI/2+.6,a,0);leg.add(c)}}
  const cm=std({color:0x1a3a20,emissive:0x40ff70,emissiveIntensity:1,metalness:.7,roughness:.3});for(let k=0;k<4;k++){const c=new THREE.Mesh(new THREE.TorusGeometry(.045,.014,5,10),cm);c.position.set(0,-.3-k*.075,0);c.rotation.y=k*Math.PI/2;legs[1].add(c)}
  const au=glowSprite(0x50ff80,4.2,.14);au.position.y=1.1;I.add(au);
  const fan=(k,amt)=>(k/8-.4)*amt;
  return{g,body,wings,anim:(e,dt,mv,fold)=>{const t=e.t||0;
    if(fold){for(const l of legs)l.rotation.x=0;for(const W of wings){const q=W.q;W.w.position.set(q*.33,1.25,.18);W.w.rotation.set(0,0,-q*.45);W.arm.rotation.set(.08,q*1.46,-q*.12);W.hand.rotation.set(0,q*.12,0);W.prim.forEach((f,k)=>{f.rotation.y=-q*(1.38+k*.012)})}
      tf.forEach((f,k)=>{f.rotation.y=fan(k,.5)});hd.rotation.y=Math.sin(t*.7)*.7+Math.sin(t*2.3)*.1;hd.rotation.x=Math.sin(t*.5)*.15;body.position.y=0;I.rotation.x=0}
    else{const ph=t*7.2,f=Math.sin(ph),f2=Math.sin(ph-.7);for(const l of legs)l.rotation.x=-1.2;for(const W of wings){const q=W.q;W.w.position.set(q*.24,1.18,.2);W.w.rotation.set(0,0,0);W.arm.rotation.set(0,q*.18,q*(.12+f*.72));W.hand.rotation.set(0,-q*.05*(1-f2),q*(f2*.48+.06));
        W.prim.forEach((p,k)=>{p.rotation.y=-q*(.32+k*.13)*(.85+.15*f2)})}
      tf.forEach((p,k)=>{p.rotation.y=fan(k,1.05)});hd.rotation.set(-.1,0,0);body.position.y=Math.sin(t*3.6)*.22*s;I.rotation.x=.12-f*.05}
    au.material.opacity=.1+Math.sin(t*4)*.04}}}

/* ---------- the Tower's heart: the Warden heals through it ---------- */
function buildTowerHeart(){const g=new THREE.Group(),body=new THREE.Group();g.add(body);
  const cm=new THREE.MeshPhysicalMaterial({color:0x20ff70,emissive:0x16c050,emissiveIntensity:1.1,roughness:.08,metalness:.1,transmission:0,transparent:true,opacity:.92,clearcoat:1});
  const core=new THREE.Mesh(new THREE.OctahedronGeometry(1.6,0),cm);core.scale.set(1,1.7,1);core.position.y=2;body.add(core);
  const sm=std({color:0x1a2a20,metalness:.9,roughness:.25,emissive:0x0a3018,emissiveIntensity:.6});const shards=[];
  for(let k=0;k<7;k++){const s=new THREE.Mesh(new THREE.OctahedronGeometry(.45,0),cm);s.scale.set(.6,1.6,.6);const o={s,a:k/7*TAU,r:2.8+(k%2)*.6,h:1.2+(k%3)*.9};body.add(s);shards.push(o)}
  const cage=new THREE.Group();for(let k=0;k<3;k++){const r=new THREE.Mesh(new THREE.TorusGeometry(2.4+k*.25,.07,6,40),sm);r.rotation.set(k*1.1,k*.6,0);cage.add(r)}cage.position.y=2;body.add(cage);
  const gl=glowSprite(0x50ff90,14,.55);gl.position.y=2;body.add(gl);const gl2=glowSprite(0xd0ffe0,4,.9);gl2.position.y=2;body.add(gl2);
  return{g,body,anim:(e,dt)=>{const t=e.t;core.rotation.y+=dt*.8;const p=1+Math.sin(t*3.4)*.06+Math.max(0,Math.sin(t*3.4*2))*.05;core.scale.set(p,1.7*p,p);cage.rotation.y+=dt*.4;cage.rotation.x=Math.sin(t*.3)*.3;
    for(const o of shards){o.a+=dt*.6;o.s.position.set(Math.cos(o.a)*o.r,o.h+Math.sin(t*1.3+o.a)*.4,Math.sin(o.a)*o.r);o.s.rotation.y=o.a}gl.material.opacity=.4+Math.sin(t*3.4)*.12;cm.emissiveIntensity=(.9+Math.sin(t*3.4)*.3)*(1+e.flash*6)}}}
ETYPES.theart={name:'Heart of the Tower',hp:1000,speed:0,dmg:25,range:0,cd:9,xp:900,r:2,h:4.2,fly:1,ghost:true,build:buildTowerHeart,
  ai:(e,dt,d)=>{const H=XHT;if(H.at)e.pos.copy(H.at);const w=XII.wdE;const a=e.ai;a.l=(a.l==null?3.5:a.l)-dt;
    if(a.l<=0&&w&&!w.dead&&!CS.active&&d<120){a.l=rand(3,4.2);const from=V3(e.pos.x,e.pos.y+2,e.pos.z);wdLaser(e,from,headOf(P.pos,1).add(V3(rand(-1,1),0,rand(-1,1))),maxHP()*.15,.45,{charge:.65,ext:16})}}};
const XHT={e:null,at:null,beam:null,regrow:0,said:0};
function xhtSpawn(){const c=NZ.crown?NZ.crown.position:V3(232,34,-9876);const at=V3(c.x,c.y+5,c.z);XHT.at=at;const e=spawnEnemy('theart',V3(at.x,0,at.z),{lvl:XII.wdE?XII.wdE.lvl:58});if(e.elite){e.elite=false;e.maxhp=e.hp=Math.round(e.maxhp/3.5);e.m.g.scale.setScalar(1)}e.pos.copy(at);e.quest=true;e.aggro=true;XHT.e=e;
  if(!XHT.beam){const m=new THREE.Mesh(new THREE.CylinderGeometry(.18,.18,1,8,1,true),new THREE.MeshBasicMaterial({color:0x60ff90,transparent:true,opacity:.55,blending:THREE.AdditiveBlending,depthWrite:false}));scene.add(m);XHT.beam=m}
  flash(at,0x60ff90,30);SP.emit(at,{n:120,c0:0xffffff,c1:0x30ff70,speed:9,life:1});sx('powerup',.8,null,{rate:.6});return e}
function xhtAlive(){return XHT.e&&!XHT.e.dead}
{const _de=damageEnemy;damageEnemy=function(e,amt,color,dot){if(e&&e===XII.wdE&&CH2.st===10&&xhtAlive()){amt*=.35;color='#7affa0'}return _de.call(this,e,amt,color,dot)}}
{const _ke=killEnemy;killEnemy=function(e){const r=_ke.apply(this,arguments);try{if(e===XHT.e){XHT.e=null;const w=XII.wdE;if(w&&!w.dead)w.hpFloor=0;sx('skyshatter',.9);flash(e.pos,0xffffff,30);P.shake=1.2;
  toast(XHT.regrow?'The heart is gone for good. He is just a ghost now.':'The heart breaks. The Warden is cut off from the Tower. Hit him now!','The Tower',true);if(!XHT.regrow){XHT.regrow=1;XHT.rt=35}}}catch(x){console.warn(x)}return r}}
{const _mt=muTick;muTick=function(dt){_mt(dt);if(!started||MODE==='open')return;const w=XII.wdE;const live=CH2.st===10&&w&&!w.dead&&!w.invuln&&CH2.zone==='north';
  if(!live){if(XHT.beam)XHT.beam.visible=false;if(XHT.e&&!XHT.e.dead&&CH2.st!==10){removeEnemy(XHT.e);XHT.e=null}return}
  if(!XHT.e&&!XHT.spawned&&!CS.active){XHT.spawned=1;xhtSpawn();w.hpFloor=.45;after(.8,()=>toast('The Tower feeds him from its crown. Fly up and break its <b>heart</b>, or he will keep healing.','The Heart of the Tower',true));
    if(!XHT.said){XHT.said=1;after(2.5,()=>epSay('@',BL.m4_03))}}
  if(XHT.regrow===1&&!xhtAlive()){XHT.rt-=dt;if(XHT.rt<=0){XHT.regrow=2;if(w.hp>w.maxhp*.35){xhtSpawn();w.hpFloor=.3;toast('The Tower grows a new heart. Break it again!','The Heart of the Tower',true)}}}
  const box=$('boss');if(box)box.classList.toggle('wdregen',xhtAlive());
  if(xhtAlive()){w.hp=Math.min(w.maxhp,w.hp+w.maxhp*.01*dt);const a=V3(XHT.e.pos.x,XHT.e.pos.y+2,XHT.e.pos.z),b=headOf(w.pos,4);const B=XHT.beam;B.visible=true;B.position.copy(a).lerp(b,.5);B.scale.set(1,a.distanceTo(b),1);B.lookAt(b);B.rotateX(Math.PI/2);
    B.material.opacity=.35+Math.sin(time*9)*.15;if(Math.random()<.5)SP.emit(a.clone().lerp(b,Math.random()),{c0:0xd0ffe0,c1:0x20c050,s0:.5,s1:.05,life:.5,speed:1})}else if(XHT.beam)XHT.beam.visible=false}}
{const _ac=applyChapter;applyChapter=function(){XHT.spawned=0;XHT.regrow=0;XHT.said=0;if(XHT.e&&!XHT.e.dead)removeEnemy(XHT.e);XHT.e=null;return _ac.apply(this,arguments)}}

/* ---------- voices for Chapter XIII ---------- */
const XL3={k6_01:"Wait. Something's wrong. Look at the dome of Saint Paul's. The shadows are moving.",k6_02:"Vesper. The Crown's own shadow. He's the one who held my leash for ten years.",k6_03:"I can't fight him like this. No sword, barely any magic. Be careful, Maëlle.",
  k6_04:'Maëlle! Let her go!',k6_05:'My sword. It remembers me.',k6_06:'Let them go, Vesper.',k6_07:"It's over. You're both safe now.",k6_08:'I know.',k6_09:"Then I'll carry it for both of us, little sister.",
  kf_01:'Guardians, to me!',kf_02:'Is that all the Crown has left?',kf_03:'Stay down!',kf_04:'You picked the wrong family.',kf_05:'Not yet!',kf_06:"Feel that? That's my sword, remembering you.",kf_07:'Get away from them!',kf_08:"Ten years in your chains. Now it's my turn.",
  m6_03:'Who the hell are you?',m6_04:'A shadow with a crown complex. Great.',m6_05:"What is this? I can't move!",m6_06:"Kaen! Help me! I can't get out!",m6_07:'Lyra! Anyone! Please!',m6_08:'You were incredible, by the way.',
  ly43:"Brother! Catch! You're going to need this!",ly44:'Take my magic. All of it. Bring them home!',ly45:"Kaen... it's up to you now!",ly46:"I'm fine. I just... I have nothing left. My magic is gone.",
  vp_01:"Little witch. You've been very busy in my city.",vp_02:'I am Vesper. Every shadow in London belongs to me. Yours too.',vp_03:"Come up. Let's talk where the city can't hear you scream.",vp_04:'You fight well... for something that casts a shadow.',
  vp_05:'Your shadow is mine now.',vp_06:'Run to the light, witch. I am already there.',vp_07:'You came here for a fight. I came here for you.',vp_08:'Ah. The sister. How thoughtful. Two for the price of one.',
  vp_09:'The broken soldier, with his toy sword. Show me.',vp_10:"You can't cut a shadow, Kaen.",vp_11:'The Crown... has many shadows... I was only... the first...'};
for(const k in XL3)VO_MAP[XL3[k]]=k;SPEAKER.Vesper='#b99cff';
const X3={C:V3(36,70,-9900),R:31,arena:null,phase:0,e:null,cages:[],mPos:null,lPos:null,trap:null,said:{},fight:0};
const kSay=k=>epSay(XII.solid?'Kaen':"Kaen's Spirit",XL3[k]);
function x3Bark(who,k){if(SAYQ.on||SAYQ.q.length)return;epSay(who,XL3[k])}

/* ---------- arena floating above St Paul's ---------- */
function x3Wall(){return canvasTex(64,256,(x,w,h)=>{const g=x.createLinearGradient(0,h,0,0);g.addColorStop(0,'rgba(170,120,255,.95)');g.addColorStop(.25,'rgba(90,40,200,.5)');g.addColorStop(1,'rgba(20,0,60,0)');x.fillStyle=g;x.fillRect(0,0,w,h);
  for(let k=0;k<40;k++){x.fillStyle=`rgba(255,240,255,${rand(.05,.25)})`;x.fillRect(rand(0,w),rand(0,h*.7),1,rand(10,60))}})}
function x3Build(){if(X3.arena)return X3.arena;const C=X3.C,R=X3.R;const g=new THREE.Group();g.position.copy(C);
  const st=std({color:0x16121e,roughness:.85,metalness:.15}),gl=std({color:0x0c0a12,roughness:.3,metalness:.6,emissive:0x5a20c0,emissiveIntensity:.9});
  const top=new THREE.Mesh(new THREE.CylinderGeometry(R+1.2,R,1.6,72),st);top.position.y=-.8;g.add(top);top.receiveShadow=true;
  const und=new THREE.Mesh(new THREE.ConeGeometry(R,24,36,4),std({color:0x0e0b14,roughness:1}));und.rotation.x=Math.PI;und.position.y=-13.6;g.add(und);
  const rim=new THREE.Mesh(new THREE.TorusGeometry(R+1.1,.22,8,96),gl);rim.rotation.x=Math.PI/2;rim.position.y=.02;g.add(rim);
  const r1=decal(runeTex,0x9a50ff,R*1.9,true,.32);r1.position.y=.05;g.add(r1);const r2=decal(runeTex,0xd0a0ff,R*.8,true,.4);r2.position.y=.06;g.add(r2);
  const obs=[];for(let k=0;k<8;k++){const a=k/8*TAU+.2;const o=new THREE.Group();o.position.set(Math.sin(a)*(R-1.4),0,Math.cos(a)*(R-1.4));g.add(o);const m=new THREE.Mesh(new THREE.BoxGeometry(1.3,9,1.3),st);m.position.y=4.5;o.add(m);
    const s=new THREE.Mesh(new THREE.BoxGeometry(.18,7,1.34),gl);s.position.y=4.6;o.add(s);const cr=new THREE.Mesh(new THREE.OctahedronGeometry(.8,0),gl);cr.position.y=11;o.add(cr);const sp=glowSprite(0x9a50ff,5,.5);sp.position.y=11;o.add(sp);obs.push({o,cr,ph:k})}
  const wall=new THREE.Mesh(new THREE.CylinderGeometry(R+1,R+1,22,72,1,true),new THREE.MeshBasicMaterial({map:x3Wall(),color:0x8a70c0,transparent:true,opacity:.3,side:THREE.DoubleSide,depthWrite:false,blending:THREE.AdditiveBlending}));wall.position.y=11;g.add(wall);
  const rocks=[];for(let k=0;k<26;k++){const r=new THREE.Mesh(G.shard,st);const s=rand(.6,2.2);r.scale.setScalar(s);const a=rand(0,TAU),d=rand(R+3,R+16);r.position.set(Math.sin(a)*d,rand(-12,6),Math.cos(a)*d);g.add(r);rocks.push({r,a,d,y:r.position.y,sp:rand(.03,.08)})}
  scene.add(g);let t=0;const A={g,tick:dt=>{t+=dt;r1.rotation.z+=dt*.05;r2.rotation.z-=dt*.12;wall.material.map.offset.x+=dt*.02;wall.material.opacity=.26+Math.sin(t*1.3)*.05;
    for(const o of obs){o.cr.rotation.y+=dt;o.cr.position.y=11+Math.sin(t*1.4+o.ph)*.4}for(const r of rocks){r.a+=dt*r.sp;r.r.position.set(Math.sin(r.a)*r.d,r.y+Math.sin(t*.6+r.a*3)*.6,Math.cos(r.a)*r.d);r.r.rotation.y+=dt*.2}
    if(Math.random()<.5){const a=rand(0,TAU);SM.emit(V3(C.x+Math.sin(a)*(R+.6),C.y+rand(0,3),C.z+Math.cos(a)*(R+.6)),{c0:0x50307a,c1:0x0a0612,s0:3,s1:7,life:2,a:.45,up:1.5})}}};
  X3.arena=A;return A}
function x3Drop(){if(!X3.arena)return;scene.remove(X3.arena.g);X3.arena.g.traverse(o=>{if(o.geometry)o.geometry.dispose()});X3.arena=null}
{const _g=groundAt;groundAt=function(x,z,y){if(X3.arena&&MODE!=='open'){const C=X3.C;if(Math.hypot(x-C.x,z-C.z)<X3.R+1.2&&(y===undefined||y>C.y-8))return C.y}return _g.apply(this,arguments)}}

/* ---------- Vesper ---------- */
function shadowMat(op){return new THREE.MeshBasicMaterial({color:0x07040e,transparent:true,opacity:op||.6,depthWrite:false,skinning:true})}
function buildVesper(){const a=makeCHActor('m',{skin:0xe8e2ee,skinLift:[1.3,1.42,1.55],hair:'hairPart',hairTex:'1',hairCol:0xcfd0de,brow:0x8a8a98,eyeTint:0xd8c0ff,keepReg:[5,6,9],
    wear:[['long',0x060509,{roughness:.55}],['tee',0x140d20,{roughness:.4,metalness:.35}],['trousers',0x07060a,{roughness:.8}],['shoes',0x050505,{roughness:.3,metalness:.3}]]});
  if(!a)return buildFoxSpirit();const S=a.S,SK=S.SK;
  const met=std({color:0x0a0810,metalness:1,roughness:.25,emissive:0x3a0c80,emissiveIntensity:.5});const crown=new THREE.Group();
  for(let k=0;k<9;k++){const u=(k-4)/4;const c=new THREE.Mesh(G.cone,met);c.scale.set(.016,.09+(1-Math.abs(u))*.08,.016);c.position.set(Math.sin(u*1.2)*.09,.15,Math.cos(u*1.2)*.07-.02);c.rotation.set(-.2+Math.abs(u)*.1,0,-u*.45);crown.add(c)}
  const band=new THREE.Mesh(new THREE.TorusGeometry(.098,.008,6,24),met);band.rotation.x=Math.PI/2;band.position.y=.12;crown.add(band);a.attach('Head',crown,SK.Head.clone());
  for(const q of[-1,1]){const ey=glowSprite(0xe8d8ff,.075,1);ey.position.set(q*.032,-.012,.072);a.head.add(ey)}
  const clothT=kaenClothTex(true,false,'#0a0710');const cloakM=std({map:clothT,color:0xb8a8d0,roughness:.9,side:THREE.DoubleSide,alphaTest:.5,skinning:true,emissive:0x12062a,emissiveIntensity:.5});
  a.sk(cloakGeo(S,a.bones,{w0:.27,w1:.62,flare:.38,bottom:SK.calf_l.y-.42,wrap:.1}),cloakM);
  const d=makeCHActor('m',{skin:0x000000,hair:'hairPart',hairTex:'1',hairCol:0,brow:0,keepReg:[5,6,9],wear:[['long',0]]});let dbl=null;
  if(d){const sm=shadowMat(.62);d.g.traverse(o=>{if(o.isMesh){o.material=sm;o.castShadow=false}});d.g.scale.setScalar(2.5);d.g.position.set(.6,-.3,-2.9);a.g.add(d.g);
    for(const q of[-1,1]){const ey=glowSprite(0xb080ff,.11,1,false);ey.position.set(q*.034,-.01,.075);d.head.add(ey)}const hz=glowSprite(0x2a0a50,14,.4);hz.position.y=1.4;d.g.add(hz);dbl={a:d,sm,hz}}
  const bub=new THREE.Mesh(new THREE.SphereGeometry(1.8,24,16),new THREE.MeshBasicMaterial({color:0x6a30d0,transparent:true,opacity:.2,blending:THREE.AdditiveBlending,depthWrite:false,side:THREE.DoubleSide}));bub.position.y=1.2;bub.visible=false;a.g.add(bub);
  const aura=glowSprite(0x3a1080,6,.3);aura.position.y=1.1;a.g.add(aura);
  return{g:a.g,body:a.body,actor:a,head:a.head,dbl,bub,aura,anim:(e,dt)=>{const ai=e.ai;if(!e.m.lock||e.m.lock<=0){a.setBase(ai.cast>0?'Spell_Simple_Idle_Loop':'Idle_FoldArms_Loop',.35)}if(e.m.lock>0)e.m.lock-=dt;a.update(dt);
    if(dbl){dbl.a.setBase(ai.dAnim||(ai.cast>0?'Spell_Simple_Idle_Loop':'Idle_Loop'),.4);dbl.a.update(dt*.8);const tg=(ai.dbig||0);dbl.a.g.scale.setScalar(lerp(dbl.a.g.scale.x,2.5+tg*1.6,Math.min(1,dt*3)));dbl.sm.opacity=.5+Math.sin(e.t*2.2)*.08+tg*.2+(e.flash>0?.2:0)}
    bub.visible=!!e.guarded;if(bub.visible){bub.rotation.y+=dt;bub.material.opacity=.16+Math.sin(e.t*5)*.06}aura.material.opacity=.25+Math.sin(e.t*1.7)*.08;
    if(Math.random()<.5)SM.emit(V3(e.pos.x+rand(-.6,.6),e.pos.y+rand(0,.6),e.pos.z+rand(-.6,.6)),{c0:0x2a1a40,c1:0x05030a,s0:1,s1:2.4,life:1,a:.5,up:.8});
    if(Math.random()<.3){const h=(Math.random()<.5?a.handR:a.handL).getWorldPosition(V3());SP.emit(h,{c0:0xd0b0ff,c1:0x30006a,s0:.25,s1:.03,life:.5,up:.6})}}}}
function buildShade(){const a=makeCHActor('m',{skin:0,hair:'hairPart',hairTex:'1',hairCol:0,brow:0,keepReg:[5,6,9],wear:[['long',0]]});if(!a)return buildFoxSpirit();const sm=shadowMat(.82);a.g.traverse(o=>{if(o.isMesh){o.material=sm;o.castShadow=false}});
  for(const q of[-1,1]){const ey=glowSprite(0xc090ff,.08,1);ey.position.set(q*.034,-.01,.075);a.head.add(ey)}a.g.scale.setScalar(1.08);
  return{g:a.g,body:a.body,actor:a,head:a.head,anim:(e,dt,mv)=>{actorAnimate(e,dt,mv);sm.opacity=.7+(e.flash>0?.25:0);if(Math.random()<.35)SM.emit(V3(e.pos.x+rand(-.4,.4),e.pos.y+rand(0,1.8),e.pos.z+rand(-.4,.4)),{c0:0x1a1028,c1:0x020104,s0:.6,s1:1.6,life:.7,a:.5,up:.6})}}}
ETYPES.vesper={name:"Vesper, the Crown's Shadow",boss:true,hp:7000,speed:0,dmg:30,range:0,cd:9,xp:5000,r:1,h:2.4,fly:1,ghost:true,noCalm:true,build:buildVesper};
ETYPES.vshade={name:'Shade',hp:160,speed:8.5,dmg:18,range:2.2,cd:1.4,xp:60,r:.6,h:2,build:buildShade};
function vsMaxHP(){return maxHP()}
function vsShades(e,n){for(let k=0;k<n;k++){const a=rand(0,TAU),d=rand(6,12);const p=V3(X3.C.x+Math.sin(a)*d,0,X3.C.z+Math.cos(a)*d);const s=spawnEnemy('vshade',p);s.pos.y=X3.C.y;s.quest=true;s.aggro=true;s.lvl=P.level;s.vs=1;
  SM.emit(V3(p.x,X3.C.y+1,p.z),{n:20,c0:0x3a2060,c1:0x05030a,s0:2,s1:5,life:1.2,a:.6,up:2})}e.guarded=true;sx('cackle',.6,null,{rate:.6})}
function vsShadesLeft(){return enemies.filter(o=>!o.dead&&o.vs).length}
function vsBolts(e){const c=eCenter(e),base=aimAtPlayer(c);e.ai.cast=.8;try{e.m.actor.fire('Spell_Simple_Shoot',.5)}catch(x){}const n=e.ai.ph==='B'?7:5;
  for(let k=0;k<n;k++){const d=base.clone().applyAxisAngle(V3(0,1,0),(k-(n-1)/2)*.13);enemyOrb(c,d,21,vsMaxHP()*.065,0x8040ff,.42,{keepY:true,life:2.6})}sx('cackle',.35,null,{rate:1.4})}
function vsGrasp(e){e.ai.cast=1.2;const pts=[P.pos.clone()];const v=V3(Math.sin(P.face),0,Math.cos(P.face));pts.push(P.pos.clone().addScaledVector(v,4));pts.push(P.pos.clone().add(V3(rand(-5,5),0,rand(-5,5))));if(e.ai.ph==='B')pts.push(P.pos.clone().addScaledVector(v,-3));
  const mat=std({color:0x0a0612,roughness:.4,metalness:.4,emissive:0x40108a,emissiveIntensity:.6});
  pts.forEach((p,i)=>after(i*.12,()=>{p.y=X3.C.y;telegraph(p,2.3,.85,0x8a40ff,()=>{for(let k=0;k<6;k++){const m=new THREE.Mesh(G.spike,mat);m.position.set(p.x+rand(-1.2,1.2),p.y,p.z+rand(-1.2,1.2));const sy=rand(1,1.9),sxx=rand(.5,.9);m.rotation.set(rand(-.35,.35),rand(0,3),rand(-.35,.35));
      addFx(m,1.4,(f)=>{const t=f.t;const s=t<.1?t/.1:t>1.1?Math.max(0,(1.4-t)/.3):1;m.scale.set(sxx,sy*s,sxx)})}SM.emit(V3(p.x,p.y+1,p.z),{n:14,c0:0x40206a,c1:0x05030a,s0:1.5,s1:3,life:.8,a:.55,up:2});
      if(playerIn(p,2.4))damagePlayer(vsMaxHP()*.15)})}));if(!X3.said.v5&&e.ai.ph==='A'){X3.said.v5=1;epSay('Vesper',XL3.vp_05)}}
function vsStep(e){const to=P.pos.clone().addScaledVector(V3(Math.sin(P.face),0,Math.cos(P.face)),-6);const dc=Math.hypot(to.x-X3.C.x,to.z-X3.C.z);if(dc>X3.R-3){to.x=X3.C.x+(to.x-X3.C.x)*(X3.R-3)/dc;to.z=X3.C.z+(to.z-X3.C.z)*(X3.R-3)/dc}
  SM.emit(eCenter(e),{n:30,c0:0x40206a,c1:0x05030a,s0:2,s1:5,life:1,a:.6,up:1.5});sfx.blink&&sfx.blink();e.pos.set(to.x,X3.C.y+.2,to.z);SM.emit(eCenter(e),{n:30,c0:0x40206a,c1:0x05030a,s0:2,s1:5,life:1,a:.6,up:1.5});
  if(!X3.said.v6&&e.ai.ph==='A'){X3.said.v6=1;epSay('Vesper',XL3.vp_06)}
  const dir=V3(P.pos.x-e.pos.x,0,P.pos.z-e.pos.z).normalize();e.m.g.rotation.y=Math.atan2(dir.x,dir.z);e.ai.dAnim='Melee_Hook';e.m.lock=1.1;try{e.m.actor.once('Spell_Simple_Shoot',.9)}catch(x){}
  coneTelegraph(V3(e.pos.x,X3.C.y,e.pos.z),dir,11,.55,.75,0x9050ff,()=>{e.ai.dAnim=null;crescentFx(V3(e.pos.x,X3.C.y,e.pos.z),dir,10,0x7a40ff);P.shake=Math.max(P.shake,.5);if(inCone(P.pos,V3(e.pos.x,X3.C.y,e.pos.z),dir,11,.55))damagePlayer(vsMaxHP()*.2)})}
function vsEclipse(e){e.ai.dbig=1;e.ai.cast=4;toast('His shadow grows. Get airborne when the rings come!','Eclipse',true);sx('garg',.8,null,{rate:.5});
  for(let k=0;k<3;k++)after(1+k*1.1,()=>{if(e.dead)return;e.ai.dAnim='Punch_Cross';P.shake=1;flash(e.pos,0x8040ff,20);x3Ring(V3(e.pos.x,X3.C.y,e.pos.z),X3.R+2,16,vsMaxHP()*.14)});after(4.6,()=>{e.ai.dbig=0;e.ai.dAnim=null})}
function x3Ring(c,maxR,speed,dmg){const m=new THREE.Mesh(new THREE.RingGeometry(.9,1,72),new THREE.MeshBasicMaterial({color:0x9a50ff,transparent:true,depthWrite:false,blending:THREE.AdditiveBlending,side:THREE.DoubleSide}));m.rotation.x=-Math.PI/2;m.position.set(c.x,c.y+.3,c.z);let hit=false;
  addFx(m,maxR/speed,(f,k)=>{const r=f.t*speed;m.scale.setScalar(r);m.material.opacity=1-k*.8;if(Math.random()<.9){const a=rand(0,TAU);SM.emit(V3(c.x+Math.sin(a)*r,c.y+.6,c.z+Math.cos(a)*r),{c0:0x50307a,c1:0x05030a,s0:1.5,s1:3,life:.6,a:.5})}
    const d=Math.hypot(P.pos.x-c.x,P.pos.z-c.z);if(!hit&&Math.abs(d-r)<1.3&&P.pos.y-c.y<1.2){hit=true;damagePlayer(dmg)}},()=>{scene.remove(m);m.geometry.dispose()})}
BOSSAI.vesper=function(e,dt,d){const a=e.ai;if(!a.ph)return;const B=a.ph==='B',sp=B?1.25:1;a.cast=Math.max(0,(a.cast||0)-dt);
  a.orb=(a.orb||rand(0,TAU))+dt*(B?.35:.25);const tgt=V3(X3.C.x+Math.sin(a.orb)*11,X3.C.y+.4+Math.sin(e.t*1.3)*.25,X3.C.z+Math.cos(a.orb)*11);e.pos.lerp(tgt,Math.min(1,dt*(e.m.lock>0?0:.6)));
  if(e.invuln)return;a.b=(a.b==null?2.5:a.b)-dt*sp;a.g=(a.g==null?5:a.g)-dt*sp;a.s=(a.s==null?9:a.s)-dt*sp;const pct=e.hp/e.maxhp;
  if(a.b<=0){a.b=rand(3.2,4.4);vsBolts(e)}if(a.g<=0){a.g=rand(6.5,8.5);vsGrasp(e)}if(a.s<=0&&e.m.lock<=0){a.s=rand(9,12);vsStep(e)}
  if(e.guarded&&!vsShadesLeft()){e.guarded=false;toast('His shades are gone. Vesper is exposed!','Now',false)}
  if(!B){if(!a.m1&&pct<.9){a.m1=1;epSay('Vesper',XL3.vp_04)}if(!a.m2&&pct<.82){a.m2=1;vsShades(e,3);toast('Shades shield him. Destroy them first.','Shadow Veil',true)}if(!a.m3&&pct<.68){a.m3=1;vsShades(e,3)}
    if(!a.trap&&pct<=.56){a.trap=1;x3Trap(e)}}
  else{if(!a.k1&&pct<.8){a.k1=1;x3Bark('Kaen','kf_02')}if(!a.n1&&pct<.6){a.n1=1;epSay('Vesper',XL3.vp_10);vsShades(e,4)}if(!a.k2&&pct<.5){a.k2=1;x3Bark('Kaen','kf_04')}if(!a.ec&&pct<.36){a.ec=1;vsEclipse(e)}if(!a.n2&&pct<.22){a.n2=1;vsShades(e,3)}}}

/* ---------- cages, sword, beams ---------- */
function x3Cage(p,col){const g=new THREE.Group();g.position.copy(p);const m=std({color:0x0a0612,roughness:.3,metalness:.6,emissive:0x5a1ac0,emissiveIntensity:.8});
  for(let k=0;k<10;k++){const a=k/10*TAU;const b=new THREE.Mesh(new THREE.CylinderGeometry(.07,.12,3.4,6),m);b.position.set(Math.sin(a)*1.25,1.7,Math.cos(a)*1.25);b.rotation.set(Math.cos(a)*-.18,0,Math.sin(a)*.18);g.add(b)}
  for(const y of[.15,3.1]){const r=new THREE.Mesh(new THREE.TorusGeometry(y>1?.95:1.3,.09,6,32),m);r.rotation.x=Math.PI/2;r.position.y=y;g.add(r)}
  const sph=new THREE.Mesh(new THREE.SphereGeometry(1.7,24,16),new THREE.MeshBasicMaterial({color:col||0x6a30ff,transparent:true,opacity:.14,blending:THREE.AdditiveBlending,depthWrite:false,side:THREE.DoubleSide}));sph.position.y=1.4;g.add(sph);
  const gl=glowSprite(0x7a40ff,6,.3);gl.position.y=1.4;g.add(gl);scene.add(g);let t=0;g.userData.k=0;
  addFx(null,9999,(f)=>{if(!g.parent){f.t=f.dur;return}t+=.016;g.rotation.y+=.006;sph.material.opacity=.12+Math.sin(t*4)*.04+g.userData.k*.2;g.userData.k=Math.max(0,g.userData.k-.03);g.position.x=p.x+(Math.random()-.5)*g.userData.k*.15;
    if(Math.random()<.25)SM.emit(V3(p.x+rand(-1.3,1.3),p.y+rand(0,3),p.z+rand(-1.3,1.3)),{c0:0x3a2060,c1:0x05030a,s0:.6,s1:1.4,life:.8,a:.4,up:.5})});
  SM.emit(V3(p.x,p.y+1.5,p.z),{n:40,c0:0x40206a,c1:0x05030a,s0:2,s1:5,life:1.2,a:.6,up:2});flash(p,0x7a40ff,18);sx('shield',.8);X3.cages.push(g);return g}
function x3Shatter(){for(const g of X3.cages){const p=g.position.clone();scene.remove(g);SP.emit(V3(p.x,p.y+1.5,p.z),{n:160,c0:0xffffff,c1:0x8a50ff,speed:12,life:1.2,s0:.6,s1:.08,grav:6});SM.emit(V3(p.x,p.y+1.5,p.z),{n:30,c0:0x50307a,c1:0x05030a,s0:2,s1:5,life:1.2,a:.5,up:2})}X3.cages=[];sx('shbreak',1);try{sfx.shatter()}catch(x){}}
function x3Katana(){const k=new THREE.Group();const bm=std({color:0xd8d4e8,roughness:.12,metalness:1,emissive:0x3a1a70});const b=new THREE.Mesh(new THREE.BoxGeometry(.035,1.05,.008),bm);b.position.y=.62;k.add(b);
  const h=new THREE.Mesh(new THREE.CylinderGeometry(.02,.02,.28,8),std({color:0x5a2e98,roughness:.5}));k.add(h);const gd=new THREE.Mesh(new THREE.TorusGeometry(.04,.012,6,16),std({color:0xc8a050,metalness:1,roughness:.3}));gd.rotation.x=Math.PI/2;gd.position.y=.12;k.add(gd);
  const gl=glowSprite(0xb070ff,2.4,.6);gl.position.y=.6;k.add(gl);scene.add(k);return k}
function x3Beam(a,b,col,dur){const m=new THREE.Mesh(new THREE.CylinderGeometry(.12,.12,1,10,1,true),new THREE.MeshBasicMaterial({color:col,transparent:true,opacity:.8,blending:THREE.AdditiveBlending,depthWrite:false}));scene.add(m);
  addFx(m,dur,(f,k)=>{const A=a(),B=b();m.position.copy(A).lerp(B,.5);m.scale.set(1+Math.sin(f.t*30)*.3,A.distanceTo(B),1+Math.sin(f.t*30)*.3);m.lookAt(B);m.rotateX(Math.PI/2);m.material.opacity=.8*(1-Math.max(0,k-.85)/.15);
    if(Math.random()<.9)SP.emit(A.clone().lerp(B,Math.random()),{c0:0xffffff,c1:col,s0:.5,s1:.05,life:.5,speed:1.5})},()=>{scene.remove(m);m.geometry.dispose()})}

/* ---------- the trap, the cry for help ---------- */
const x3S=(p,side,dist,h)=>()=>{const P0=typeof p==='function'?p():p;const d=V3(X3.C.x-P0.x,0,X3.C.z-P0.z);if(d.lengthSq()<.01)d.set(0,0,1);d.normalize();const r=V3(d.z,0,-d.x);return{pos:headOf(P0,h||1.7).addScaledVector(d,dist||3).addScaledVector(r,side||1.2),look:headOf(P0,1.45)}};
const vS=(side,dist)=>()=>{const e=X3.e;const p=e?e.pos:X3.C;const d=V3(P.pos.x-p.x,0,P.pos.z-p.z);if(d.lengthSq()<.01)d.set(0,0,1);d.normalize();const r=V3(d.z,0,-d.x);return{pos:headOf(p,1.75).addScaledVector(d,dist||3.2).addScaledVector(r,side||1),look:headOf(p,1.55)}};
const kpos=()=>KM.on&&KM.a?KM.a.g.position:KFW.a?KFW.a.g.position:P.pos;
function x3Trap(e){e.invuln=true;e.guarded=false;for(const o of enemies)if(!o.dead&&o.vs)removeEnemy(o);for(const p of eProjs)scene.remove(p.s);eProjs.length=0;P.flying=false;
  playCutscene([{who:'Vesper',text:XL3.vp_07,fov:40,cam:vS(1.1,3),onStart:()=>{e.pos.set(P.pos.x+(X3.C.x-P.pos.x)*.25,X3.C.y+.3,P.pos.z+(X3.C.z-P.pos.z)*.25);e.ai.dAnim='Spell_Simple_Idle_Loop';e.ai.cast=3;try{e.m.actor.fire('Spell_Simple_Shoot',.8)}catch(x){}}},
    {dur:2.4,fov:50,cam:k=>{const a=k*1.4;return{pos:V3(P.pos.x+Math.sin(a)*6,P.pos.y+2.4+k,P.pos.z+Math.cos(a)*6),look:headOf(P.pos,1)}},onStart:()=>{P.heroAnim='Crouch_Idle_Loop';X3.mPos=P.pos.clone();
      for(let k=0;k<8;k++){const a=k/8*TAU;after(k*.06,()=>SM.emit(V3(P.pos.x+Math.sin(a)*3,P.pos.y,P.pos.z+Math.cos(a)*3),{n:10,c0:0x40206a,c1:0x05030a,s0:1,s1:3,life:1,a:.6,up:3}))}after(.7,()=>x3Cage(X3.mPos));P.shake=1}},
    {who:'@',text:XL3.m6_05,fov:38,cam:witchShot(1,3)},
    {who:'Kaen',text:XL3.k6_04,cut:true,fov:42,cam:x3S(kpos,1.2,2.8)}],
  ()=>{if(!X3.mPos)X3.mPos=P.pos.clone();if(!X3.cages.length)x3Cage(X3.mPos);P.heroAnim='Crouch_Idle_Loop';X3.trap={t:0,m:0,hit:0};x3StrugUI(true);epSay('@',XL3.m6_06,1)})}
let x3SUI=null;
function x3StrugUI(on){if(!x3SUI){const d=document.createElement('div');d.id='x3Strug';d.innerHTML='<div class="t">Trapped</div><div class="h">Struggle! <b>Space</b> or tap</div><div class="m"><i></i></div>';document.body.appendChild(d);
    const st=document.createElement('style');st.textContent='#x3Strug{position:fixed;left:50%;bottom:22%;transform:translateX(-50%);z-index:45;text-align:center;padding:14px 26px 16px;border-radius:14px;background:rgba(10,6,22,.62);backdrop-filter:blur(6px);border:1px solid rgba(180,140,255,.35);color:#f0e6ff;font:500 15px Outfit,system-ui,sans-serif;display:none;cursor:pointer;user-select:none}#x3Strug.on{display:block;animation:x3p .5s ease-in-out infinite alternate}@keyframes x3p{to{box-shadow:0 0 30px rgba(150,90,255,.5)}}#x3Strug .t{font:italic 600 22px Fraunces,Georgia,serif;color:#cdb0ff;margin-bottom:2px}#x3Strug .m{width:220px;height:6px;margin:10px auto 0;border-radius:4px;background:rgba(255,255,255,.12);overflow:hidden}#x3Strug .m i{display:block;height:100%;width:0;background:linear-gradient(90deg,#7a40ff,#e0c8ff)}';document.head.appendChild(st);
    d.addEventListener('pointerdown',e=>{e.preventDefault();x3Struggle()});x3SUI=d}x3SUI.classList.toggle('on',!!on)}
function x3Struggle(){const T=X3.trap;if(!T)return;T.m=Math.min(1,T.m+.075);const c=X3.cages[0];if(c)c.userData.k=1;sx('clash',.35,null,{rate:rand(1.2,1.6)});P.shake=Math.max(P.shake,.25);if(X3.mPos)SP.emit(headOf(X3.mPos,1.2),{n:8,c0:0xffffff,c1:0xc0a0ff,speed:5,life:.4})}
addEventListener('keydown',e=>{if(X3.trap&&e.code==='Space'&&!e.repeat){e.preventDefault();e.stopImmediatePropagation();x3Struggle()}},true);
{const _cs=chargeStart;chargeStart=function(k){if(X3.trap){x3Struggle();return}if(KM.on){kmUse(k);return}return _cs.apply(this,arguments)}}
{const _ce=chargeEnd;chargeEnd=function(k){if(KM.on||X3.trap)return;return _ce.apply(this,arguments)}}
{const _tc=tryCast;tryCast=function(i){if(X3.trap)return;if(KM.on){if(i===0)kmUse(0);return}return _tc.apply(this,arguments)}}
{const _bl=blink;blink=function(){if(X3.trap)return;return _bl.apply(this,arguments)}}
{const _mt=muTick;muTick=function(dt){_mt(dt);const T=X3.trap;if(!T||CS.active)return;T.t+=dt;T.m=Math.max(0,T.m-dt*.12);if(x3SUI)x3SUI.querySelector('i').style.width=(T.m*100)+'%';
  if(X3.mPos){P.pos.copy(X3.mPos);P.vy=0;P.flying=false}const e=X3.e;
  if(KFW.a&&X3.mPos){const a=KFW.a;const side=V3(1.9,0,.6);const tg=X3.mPos.clone().add(side);a.g.position.lerp(tg,Math.min(1,dt*4));a.g.position.y=X3.C.y;a.g.rotation.y=Math.atan2(X3.mPos.x-a.g.position.x,X3.mPos.z-a.g.position.z);
    T.hit-=dt;if(T.hit<=0&&T.t<7){T.hit=1.1;try{a.fire(Math.random()<.5?'Punch_Cross':'Punch_Jab',.4)}catch(x){}after(.2,()=>{const c=X3.cages[0];if(c)c.userData.k=1;flash(headOf(X3.mPos,1),0x9050ff,8);sx('clash',.4,null,{rate:.9})})}
    if(T.t>4.2&&!T.knock){T.knock=1;try{a.once('Hit_Knockback',1)}catch(x){}flash(a.g.position,0x8040ff,14);P.shake=.8;after(1.1,()=>{try{a.setBase('Idle_Loop',.3)}catch(x){}})}}
  if(T.t>5.5&&!T.c2){T.c2=1;epSay('@',XL3.m6_07,1)}if(T.t>9&&!T.c3){T.c3=1;if(e)epSay('Vesper',XL3.vp_05)}
  if(T.t>11&&(T.m>.85||T.t>15)&&!SAYQ.on&&!SAYQ.q.length){X3.trap=null;x3StrugUI(false);x3Lyra()}}}

/* ---------- Lyra arrives with the sword ---------- */
function x3Lyra(){const e=X3.e;const C=X3.C;const kp=KFW.a?KFW.a.g.position.clone():P.pos.clone().add(V3(2,0,0));X3.lPos=V3(C.x+(kp.x-C.x)*.4+9,C.y,C.z+(kp.z-C.z)*.4+6);const L=X3.lPos;
  const face=()=>Math.atan2(kp.x-L.x,kp.z-L.z);let kat=null;const lyCam=(sd,ds)=>x3S(()=>LYR.a?LYR.a.g.position:L,sd,ds);
  playCutscene([{dur:2,fov:48,cam:k=>({pos:V3(L.x+8-k*2,L.y+3,L.z+8),look:headOf(L,1.2)}),onStart:()=>{lyraPlace(L.x,L.z,face());LYR.home=false;if(LYR.mk)LYR.mk.visible=false;flash(L,0xff4050,26);SP.emit(headOf(L,1),{n:160,c0:0xffffff,c1:0xff3040,speed:10,life:1});sx('portal',1)}},
    {who:'Lyra',text:XL3.ly43,cut:true,fov:44,cam:lyCam(1.2,3),onStart:()=>{try{LYR.a.fire('OverhandThrow',.6)}catch(x){}after(.35,()=>{kat=x3Katana();const a0=headOf(L,1.6);let t=0;addFx(null,1.2,(f,k)=>{t=k;const p=a0.clone().lerp(headOf(kp,1.2),k);p.y+=Math.sin(k*Math.PI)*3;if(kat){kat.position.copy(p);kat.rotation.z+=.5;kat.rotation.x+=.2}SP.emit(p,{c0:0xffffff,c1:0xb070ff,s0:.4,s1:.05,life:.4})})})}},
    {who:'Kaen',text:XL3.k6_05,cut:true,fov:36,cam:x3S(()=>KFW.a?KFW.a.g.position:kp,1.1,2.4,1.6),onStart:()=>{if(kat){scene.remove(kat);kat=null}x3GearKaen();const p=KFW.a?KFW.a.g.position:kp;flash(p,0xb070ff,28);SP.emit(headOf(p,1.2),{n:200,c0:0xffffff,c1:0x9a50ff,speed:10,life:1});sx('powerup',1,null,{rate:.8})}},
    {who:'Lyra',text:XL3.ly44,cut:true,fov:46,cam:k=>{const a=headOf(L,1.3),b=headOf(kp,1.2);const m=a.clone().lerp(b,.5);const r=V3(b.z-a.z,0,-(b.x-a.x)).normalize();return{pos:m.clone().addScaledVector(r,7+k).add(V3(0,1.5,0)),look:m}},
      onStart:()=>{try{LYR.a.setBase('Spell_Simple_Idle_Loop',.3)}catch(x){}x3Beam(()=>headOf(LYR.a?LYR.a.g.position:L,1.3),()=>headOf(KFW.a?KFW.a.g.position:kp,1.1),0xff5070,4.2);sx('riser',.9,null,{rate:.8})},update:()=>{const p=KFW.a?KFW.a.g.position:kp;if(Math.random()<.6)SP.emit(headOf(p,rand(.3,2)),{c0:0xffd0e0,c1:0xa040ff,s0:.4,s1:.05,life:.7,up:2})}},
    {who:'Vesper',text:XL3.vp_08,fov:40,cam:vS(-1,3.4),onStart:()=>{if(e){e.m.g.rotation.y=Math.atan2(L.x-e.pos.x,L.z-e.pos.z);e.ai.dAnim='Spell_Simple_Idle_Loop'}},update:()=>{if(e)e.m.g.rotation.y=Math.atan2(L.x-e.pos.x,L.z-e.pos.z)}},
    {dur:1.8,fov:52,cam:k=>({pos:V3(L.x+7,L.y+2+k*2,L.z-6),look:headOf(L,1)}),onStart:()=>{if(e){try{e.m.actor.fire('Spell_Simple_Shoot',.6)}catch(x){}x3Beam(()=>eCenter(e),()=>headOf(L,1),0x6020c0,.6)}after(.5,()=>{x3Cage(L.clone());try{LYR.a.setBase('Crouch_Idle_Loop',.3)}catch(x){}});P.shake=.8}},
    {who:'Lyra',text:XL3.ly45,cut:true,fov:40,cam:lyCam(-1,3)},
    {who:'Kaen',text:XL3.k6_06,cut:true,fov:36,cam:x3S(()=>KFW.a?KFW.a.g.position:kp,-1.1,2.6,1.6),onStart:()=>{try{KFW.a.setBase('Idle_Loop',.3)}catch(x){}}},
    {who:'Vesper',text:XL3.vp_09,fov:38,cam:vS(1.2,3)}],()=>x3Kinetic(true))}

/* ---------- kinetic body swap ---------- */
let x3KEl=null;
function x3KFx(rev){if(!x3KEl){const d=document.createElement('div');d.id='x3k';d.innerHTML='<i class="ln"></i><i class="fl"></i>';document.body.appendChild(d);const st=document.createElement('style');
    st.textContent='#x3k{position:fixed;inset:0;z-index:60;pointer-events:none;opacity:0}#x3k .ln{position:absolute;inset:-30%;background:repeating-conic-gradient(from 0deg at 50% 50%,rgba(255,255,255,0) 0deg 3deg,rgba(225,205,255,.75) 3deg 3.5deg,rgba(255,255,255,0) 3.5deg 7deg);-webkit-mask:radial-gradient(circle,transparent 18%,#000 62%);mask:radial-gradient(circle,transparent 18%,#000 62%)}#x3k .fl{position:absolute;inset:0;background:radial-gradient(circle,rgba(255,255,255,.95),rgba(170,110,255,.6) 40%,rgba(10,0,30,.0) 75%);opacity:0}#x3k.go{animation:x3ko 1.5s ease-out forwards}#x3k.go .ln{animation:x3kl 1.5s cubic-bezier(.2,.8,.2,1) forwards}#x3k.go .fl{animation:x3kf 1.5s ease-out forwards}@keyframes x3ko{0%{opacity:0}12%{opacity:1}70%{opacity:1}100%{opacity:0}}@keyframes x3kl{0%{transform:scale(2.4) rotate(0deg)}100%{transform:scale(.9) rotate(26deg)}}@keyframes x3kf{0%,40%{opacity:0}55%{opacity:1}100%{opacity:0}}';document.head.appendChild(st);x3KEl=d}
  x3KEl.classList.remove('go');void x3KEl.offsetWidth;x3KEl.classList.add('go')}
function x3Kinetic(){const m=(X3.mPos||P.pos).clone(),k=kpos().clone();let swapped=false;
  playCutscene([{dur:1.5,fov:64,cam:t=>{const e=t*t;const a=headOf(m,1.3).add(V3(0,0,1.2));const b=m.clone().lerp(k,.5).add(V3(0,16,10));return{pos:a.lerp(b,e),look:headOf(m,1).lerp(headOf(k,1),e)}},onStart:()=>{x3KFx();sx('riser',1,null,{rate:1.2});try{sfx.blink()}catch(x){}}},
    {dur:1.4,fov:50,title:['Kaen Kuroshiba','The sword remembers'],cam:t=>{const e=1-Math.pow(1-t,3);const d=V3(X3.C.x-k.x,0,X3.C.z-k.z).normalize();const a=m.clone().lerp(k,.5).add(V3(0,16,10));const b=headOf(k,2.1).addScaledVector(d,-4.2).add(V3(d.z*.9,0,-d.x*.9));return{pos:a.lerp(b,e),look:headOf(k,1.4).addScaledVector(d,6*e)}},
      onStart:()=>{if(!swapped){swapped=true;kmStart()}flash(k,0xb070ff,30);P.shake=1.2;sx('impact',1,null,{rate:.7})}}],()=>{if(!swapped)kmStart();kmStartPlay()})}

/* ---------- playing as Kaen ---------- */
const KM={on:0,a:null,fe:null,en:100,cd:[0,0,0,0],combo:0,lb:0,g:[],said:{},hud:null,lunge:null};
function x3GearKaen(){const old=KFW.a;const pos=old?old.g.position.clone():P.pos.clone(),ry=old?old.g.rotation.y:0;if(old)scene.remove(old.g);const ill=buildIllusion();if(!ill||!ill.actor){KFW.a=old;if(old)scene.add(old.g);return}
  const a=ill.actor;a.ill=ill;ill.K.eyes.forEach(s=>s.material.color.setHex(0xc8b0ff));a.g.position.copy(pos);a.g.rotation.y=ry;scene.add(a.g);KFW.a=a;KFW.gm=new THREE.MeshBasicMaterial();KFW.kp=null;KFW.mode='';KFW.an='';KFW.gear=1;try{a.setBase('Idle_Loop');a.update(.2)}catch(x){}return a}
{const _kb=kfBuild;kfBuild=function(){if(KFW.a||!(XII.solid&&(CH2.st>=13||KFW.gear)))return _kb.apply(this,arguments);KFW.a=null;const a=x3GearKaen();return a||_kb.apply(this,arguments)}}
function kmStart(){if(KM.on)return;const a=KFW.a&&KFW.gear?KFW.a:x3GearKaen();KFW.a=null;KFW.off=1;KM.a=a;KM.on=1;KM.fe={m:a.ill,t:0,lb:0,pos:a.g.position,def:{h:2.4},ai:{}};
  P.pos.copy(a.g.position);P.pos.y=X3.C.y;P.vy=0;P.flying=false;const e=X3.e;if(e){P.face=Math.atan2(e.pos.x-P.pos.x,e.pos.z-P.pos.z);yaw=P.face+Math.PI}
  if(X3.cages.length<2&&X3.lPos){x3Cage(X3.lPos.clone());if(LYR.a){LYR.a.g.position.copy(X3.lPos);try{LYR.a.setBase('Crouch_Idle_Loop',.3)}catch(x){}}}P.hp=maxHP();P.mp=maxMP();P.flyMeter=flyMax();P.invuln=3;KM.en=100;KM.cd=[0,0,0,0];KM.lb=0;KM.combo=0;kmHud(true)}
function kmStartPlay(){const e=X3.e;if(e){e.invuln=false;e.hp=e.maxhp;e.hpFloor=0;e.guarded=false;e.ai.ph='B';e.ai.dAnim=null;e.ai.b=3;e.ai.g=6;e.ai.s=10;bossRef=e;$('boss').classList.remove('hidden')}X3.phase=2;
  after(.4,()=>epSay('Kaen',XL3.kf_07,1));after(1,()=>toast('You are Kaen. <b>1</b> Sword · <b>2</b> Void Crescent · <b>3</b> Guardians · <b>4</b> Limit Break. Space to jump, twice to fly.','Kaen Kuroshiba',true))}
function kmHud(on){if(!KM.hud){const d=document.createElement('div');d.id='kmBar';const ab=[['Sword','M4 20l9-9M14 4l6 6-9 9-3-3z'],['Void Crescent','M18 4a9 9 0 1 0 0 16 7 7 0 1 1 0-16z'],['Guardians','M12 2l3 5 6 1-4 4 1 6-6-3-6 3 1-6-4-4 6-1z'],['Limit Break','M13 1L4 14h7l-1 9 9-13h-7z']];
    d.innerHTML='<div class="en"><i></i><span>Kaen</span></div><div class="row">'+ab.map((x,i)=>`<button data-i="${i}"><svg viewBox="0 0 24 24"><path d="${x[1]}"/></svg><b>${i+1}</b><em>${x[0]}</em><s></s></button>`).join('')+'</div>';document.body.appendChild(d);
    const st=document.createElement('style');st.textContent='#kmBar{position:fixed;left:50%;bottom:18px;transform:translateX(-50%);z-index:30;display:none;flex-direction:column;align-items:center;gap:8px;font:500 12px Outfit,system-ui,sans-serif;color:#efe6ff}#kmBar.on{display:flex}#kmBar .en{width:min(420px,86vw);height:8px;border-radius:5px;background:rgba(20,10,40,.6);position:relative;overflow:hidden;border:1px solid rgba(190,150,255,.3)}#kmBar .en i{position:absolute;inset:0;transform-origin:0 50%;background:linear-gradient(90deg,#6a2ad8,#c9a0ff)}#kmBar .en span{position:absolute;right:6px;top:-18px;font:italic 600 13px Fraunces,Georgia,serif;color:#cdb0ff}#kmBar .row{display:flex;gap:10px}#kmBar button{position:relative;width:74px;height:74px;border-radius:14px;border:1px solid rgba(190,150,255,.38);background:linear-gradient(180deg,rgba(40,20,80,.75),rgba(12,6,26,.8));color:#e8dcff;cursor:pointer;overflow:hidden;padding:0}#kmBar svg{width:28px;height:28px;fill:#d8c0ff;margin-top:8px}#kmBar b{position:absolute;left:7px;top:5px;font-size:11px;opacity:.7}#kmBar em{display:block;font-style:normal;font-size:10.5px;margin-top:3px;opacity:.9;white-space:nowrap}#kmBar s{position:absolute;left:0;right:0;bottom:0;height:0;background:rgba(0,0,0,.6);text-decoration:none}#kmBar button.lo{filter:grayscale(.8) brightness(.7)}#kmBar button.lb{box-shadow:0 0 18px rgba(170,110,255,.8)}@media (max-width:700px){#kmBar button{width:60px;height:60px}#kmBar em{display:none}}';document.head.appendChild(st);
    d.querySelectorAll('button').forEach(b=>b.addEventListener('pointerdown',e=>{e.preventDefault();e.stopPropagation();kmUse(+b.dataset.i)}));KM.hud=d}
  KM.hud.classList.toggle('on',!!on);const sp=$('spells');if(sp)sp.style.visibility=on?'hidden':''}
const KM_COST=[0,22,40,60],KM_CD=[.42,2.8,20,28];
function kmTarget(r){const t=findTarget(r);return t&&!t.dead?t:null}
function kmDmg(e,f){const mul=KM.lb>0?1.8:1;return(e.def.boss?e.maxhp*f:e.maxhp*Math.min(.6,f*55))*mul}
function kmHitCone(range,half,f,col){const o=P.pos,dir=V3(Math.sin(P.face),0,Math.cos(P.face));let n=0;for(const e of enemies){if(e.dead)continue;if(inCone(eCenter(e),V3(o.x,o.y,o.z),dir,range+e.def.r,half)){damageEnemy(e,kmDmg(e,f),col||'#c9a0ff');n++;SP.emit(eCenter(e),{n:12,c0:0xffffff,c1:0xb070ff,speed:6,life:.4})}}return n}
function kmUse(i){if(!KM.on||CS.active||!P.alive||i<0||i>3)return;if(KM.cd[i]>0)return;if(KM.en<KM_COST[i]){toast('Not enough strength yet. Land a few sword hits.');return}const A=KM.a;KM.en-=KM_COST[i];KM.cd[i]=KM_CD[i]*(KM.lb>0&&i===0?.75:1);
  const t=kmTarget(i===0?12:40);if(t){P.face=Math.atan2(t.pos.x-P.pos.x,t.pos.z-P.pos.z)}
  if(i===0){KM.combo=(KM.combo+1)%3;try{A.fire(['Melee_Hook','Punch_Cross','Melee_Hook'][KM.combo],.36)}catch(x){}if(t){const d=Math.hypot(t.pos.x-P.pos.x,t.pos.z-P.pos.z);if(d>2.6&&d<10)KM.lunge={t:.14,v:V3(t.pos.x-P.pos.x,0,t.pos.z-P.pos.z).normalize().multiplyScalar((d-2.2)/.14)}}
    try{sfx.blink()}catch(x){}after(.12,()=>{const dir=V3(Math.sin(P.face),0,Math.cos(P.face));crescentFx(P.pos,dir,2.4,KM.lb>0?0xd060ff:0xa070ff);const n=kmHitCone(3.6+(KM.lb>0?1.5:0),1.1,.0062);if(n){KM.en=Math.min(100,KM.en+6);sx('clash',.45,null,{rate:rand(1,1.3)});hitStop=Math.max(hitStop,.035);if(Math.random()<.06)x3Bark('Kaen','kf_03')}})}
  else if(i===1){try{A.fire('OverhandThrow',.45)}catch(x){}after(.16,()=>kmCrescent());if(!KM.said.c||Math.random()<.18){KM.said.c=1;x3Bark('Kaen','kf_06')}}
  else if(i===2){try{A.fire('Spell_Simple_Shoot',.6)}catch(x){}kmGuardians();x3Bark('Kaen','kf_01')}
  else if(i===3){KM.lb=8;KM.fe.lb=8;P.invuln=Math.max(P.invuln,1);try{A.fire('Spell_Simple_Shoot',.7)}catch(x){}const c=P.pos.clone();flash(c,0xa050ff,30);P.shake=1.4;sx('powerup',1,null,{rate:.7});sx('impact',1);
    SP.emit(headOf(c,1),{n:260,c0:0xffffff,c1:0x7020e0,speed:16,life:1.1,s0:.8,s1:.1});ring(V3(c.x,c.y,c.z),0xc080ff,1,9,.5);for(const e of enemies)if(!e.dead&&e.pos.distanceTo(c)<8)damageEnemy(e,kmDmg(e,.035),'#e0b0ff');
    if(!KM.said.lb){KM.said.lb=1;x3Bark('Kaen','kf_08')}else if(Math.random()<.5)x3Bark('Kaen','kf_03')}}
function kmCrescent(){const dir=V3(Math.sin(P.face),0,Math.cos(P.face));const t=kmTarget(40);let dy=0;if(t){const dd=Math.hypot(t.pos.x-P.pos.x,t.pos.z-P.pos.z)||1;dy=(eCenter(t).y-(P.pos.y+1.2))/dd}
  const m=new THREE.Mesh(new THREE.TorusGeometry(1.9,.16,6,28,Math.PI),new THREE.MeshBasicMaterial({color:0xb070ff,transparent:true,blending:THREE.AdditiveBlending,depthWrite:false,side:THREE.DoubleSide}));const core=new THREE.Mesh(new THREE.TorusGeometry(1.9,.05,4,28,Math.PI),new THREE.MeshBasicMaterial({color:0xffffff,transparent:true,blending:THREE.AdditiveBlending,depthWrite:false}));m.add(core);
  const p=headOf(P.pos,1.2).addScaledVector(dir,1);m.position.copy(p);m.rotation.set(0,Math.atan2(dir.x,dir.z),0);m.rotateZ(Math.PI/2);const hit=new Set();sx('kame',.5,null,{rate:1.3});
  addFx(m,1,(f,k)=>{const s=34*.016;p.addScaledVector(dir,s);p.y+=dy*s;m.position.copy(p);m.material.opacity=1-k*.6;m.scale.setScalar(1+k*.6);SP.emit(p.clone().add(V3(rand(-1.4,1.4),rand(-1.4,1.4),rand(-1.4,1.4))),{c0:0xffffff,c1:0x8a40ff,s0:.5,s1:.05,life:.4});
    for(const e of enemies){if(e.dead||hit.has(e))continue;if(eCenter(e).distanceTo(p)<2.6+e.def.r){hit.add(e);damageEnemy(e,kmDmg(e,.028),'#e0c0ff');flash(p,0xa050ff,10);SP.emit(eCenter(e),{n:30,c0:0xffffff,c1:0xa050ff,speed:9,life:.6})}}},()=>{scene.remove(m);m.geometry.dispose();core.geometry.dispose()})}
function kmGuardians(){for(const q of[-1,1]){const r=V3(Math.cos(P.face),0,-Math.sin(P.face));const p=P.pos.clone().addScaledVector(r,q*3).addScaledVector(V3(Math.sin(P.face),0,Math.cos(P.face)),-1);const m=buildGuardian();m.g.scale.setScalar(.42);m.g.position.copy(p);scene.add(m.g);
  const o={m,pos:m.g.position,t:0,life:15,cd:rand(.4,1),ai:{slam:0},def:{r:1}};KM.g.push(o);runeFlash(p,0xa050ff,8,1.2);SM.emit(V3(p.x,p.y+2,p.z),{n:30,c0:0xc090ff,c1:0x200840,s0:2,s1:5,speed:3,up:3,life:1.2,a:.6})}P.shake=.6;try{sfx.roar()}catch(x){}}
function kmGuardTick(dt){for(let i=KM.g.length-1;i>=0;i--){const o=KM.g[i];o.t+=dt;o.life-=dt;o.cd-=dt;const fe={m:o.m,t:o.t,ai:o.ai,pos:o.pos};
  let best=null,bd=1e9;for(const e of enemies){if(e.dead)continue;const d=e.pos.distanceTo(o.pos);if(d<bd){bd=d;best=e}}
  const goal=best?best.pos:P.pos.clone().add(V3(Math.cos(i*2)*3,0,Math.sin(i*2)*3));const dx=goal.x-o.pos.x,dz=goal.z-o.pos.z,d=Math.hypot(dx,dz);const reach=best?2.4+best.def.r:3;
  if(d>reach){const sp=Math.min(d-reach,8*dt);o.pos.x+=dx/d*sp;o.pos.z+=dz/d*sp}o.pos.y=groundAt(o.pos.x,o.pos.z,o.pos.y+2);o.m.g.rotation.y=Math.atan2(dx,dz);
  if(best&&d<=reach+.6&&o.cd<=0){o.cd=1.6;o.ai.slam=1.1;after(.55,()=>{if(o.life<=0)return;const c=o.pos.clone();ring(c,0xa050ff,.5,4,.35);P.shake=Math.max(P.shake,.25);for(const e of enemies)if(!e.dead&&e.pos.distanceTo(c)<4+e.def.r)damageEnemy(e,kmDmg(e,.01),'#b090ff');SM.emit(V3(c.x,c.y+.5,c.z),{n:10,c0:0xc0a0ff,c1:0x301060,s0:1.5,s1:3,life:.6,a:.5})})}
  try{guardAnim(fe,dt,0,0)}catch(x){}
  if(o.life<=0){SM.emit(V3(o.pos.x,o.pos.y+2,o.pos.z),{n:30,c0:0xc090ff,c1:0x200840,s0:2,s1:5,life:1,a:.6,up:2});scene.remove(o.m.g);KM.g.splice(i,1)}}}
function kmClearGuards(){for(const o of KM.g)scene.remove(o.m.g);KM.g.length=0}
{const _fm=flyMax;flyMax=function(){return _fm()*(KM.on?.6:1)}}
{const _ah=animateHero;animateHero=function(dt,mv,air,t){if((KM.on||X3.trap)&&W.ch){W.update(dt,{anim:'Crouch_Idle_Loop'});return}return _ah.apply(this,arguments)}}
{const _dp=damagePlayer;damagePlayer=function(a){if(KM.on)a*=.8;if(X3.phase&&P.alive&&P.invuln<=0&&!CS.active&&P.hp<=a*1.35+1){P.hp=maxHP()*.45;P.invuln=2.5;flash(P.pos,0xffffff,20);P.shake=1.2;
    const e=X3.e;if(e&&!e.dead)e.hp=Math.min(e.maxhp,e.hp+e.maxhp*.06);if(KM.on)x3Bark('Kaen','kf_05');toast(KM.on?'Kaen will not fall here. Vesper drinks a little of the fight back.':'Not here, not like this. Vesper drinks a little of the fight back.','Second wind');return}return _dp.apply(this,arguments)}}
{const _mt=muTick;muTick=function(dt){_mt(dt);if(X3.arena)X3.arena.tick(dt);
  if(X3.phase&&started&&!CS.active&&MODE!=='open'){const C=X3.C,dx=P.pos.x-C.x,dz=P.pos.z-C.z,d=Math.hypot(dx,dz);if(d>X3.R-.6){P.pos.x=C.x+dx/d*(X3.R-.6);P.pos.z=C.z+dz/d*(X3.R-.6)}if(P.pos.y<C.y-.5){P.pos.y=C.y;P.vy=0}if(P.pos.y>C.y+24){P.pos.y=C.y+24;P.vy=Math.min(P.vy||0,0)}}
  if(!KM.on||!KM.a)return;const A=KM.a;
  if(X3.mPos){W.g.position.copy(X3.mPos);W.g.visible=true;if(W.broom)W.broom.visible=false;W.g.rotation.y=Math.atan2(P.pos.x-X3.mPos.x,P.pos.z-X3.mPos.z)}
  A.g.visible=true;if(CS.active){A.update(dt);return}
  if(KM.lunge){const L=KM.lunge;const s=Math.min(L.t,dt);P.pos.addScaledVector(L.v,s);L.t-=dt;if(L.t<=0)KM.lunge=null}
  A.g.position.copy(P.pos);A.g.rotation.y=lerpAngle(A.g.rotation.y,P.face,Math.min(1,dt*12));
  const air=P.flying||!P.onGround;const mv=P.moveAmt||0;const base=air?(P.flying?'NinjaJump_Idle_Loop':'Jump_Loop'):mv>.75?'Sprint_Loop':mv>.12?'Jog_Fwd_Loop':KM.lb>0?'Spell_Simple_Idle_Loop':'Idle_Loop';
  try{A.setBase(base,.2,base==='Jog_Fwd_Loop'?.9+mv*.4:1)}catch(x){}A.update(dt);KM.fe.t+=dt;if(KM.lb>0){KM.lb-=dt;KM.fe.lb=Math.max(0,KM.lb)}else KM.fe.lb=0;try{kaenFx(KM.fe,dt)}catch(x){}
  if(P.flying&&Math.random()<.7)SP.emit(V3(P.pos.x+rand(-.3,.3),P.pos.y+rand(0,.4),P.pos.z+rand(-.3,.3)),{c0:0xe0c8ff,c1:0x5010c0,s0:.4,s1:.04,life:.6,speed:1});
  for(let i=0;i<4;i++)KM.cd[i]=Math.max(0,KM.cd[i]-dt);KM.en=Math.min(100,KM.en+dt*(KM.lb>0?9:5));kmGuardTick(dt);
  if(KM.hud){KM.hud.querySelector('.en i').style.transform=`scaleX(${KM.en/100})`;KM.hud.querySelectorAll('button').forEach((b,i)=>{b.querySelector('s').style.height=(KM.cd[i]/KM_CD[i]*100)+'%';b.classList.toggle('lo',KM.en<KM_COST[i]);b.classList.toggle('lb',i===3&&KM.lb>0)})}}}
function kmEnd(){if(!KM.on)return;KM.on=0;kmClearGuards();kmHud(false);const a=KM.a;KM.a=null;if(a){KFW.a=a;KFW.off=0;KFW.mode='';KFW.an='';KFW.kp=null;KFW.gm=new THREE.MeshBasicMaterial()}}

/* ---------- the chapter flow ---------- */
function x3Intro(){if(CS.active)return;X3.said={};const sp=V3(36,46.2,-9894);const e=spawnEnemy('vesper',V3(sp.x,0,sp.z));e.pos.copy(sp);e.invuln=true;e.lvl=P.level;e.aggro=true;e.ai.ph=null;X3.e=e;bossRef=null;$('boss').classList.add('hidden');
  const look=()=>headOf(e.pos,1.6);
  playCutscene([{dur:4.4,fov:46,title:['Chapter XIII',"The Crown's Shadow"],cam:k=>({pos:V3(36+Math.sin(k*1.2)*40,30+k*10,-9894+Math.cos(k*1.2)*40),look:V3(36,40,-9894)}),onStart:()=>{sx('garg',.7,null,{rate:.5})},update:()=>{SM.emit(V3(36+rand(-14,14),rand(30,46),-9894+rand(-14,14)),{c0:0x2a1840,c1:0x05030a,s0:3,s1:7,life:2,a:.5,up:1})}},
    {who:'Vesper',text:XL3.vp_01,fov:38,cam:k=>({pos:headOf(e.pos,1.4).add(V3(-3.6+k*.6,-.6,4.2)),look:look()}),onStart:()=>{flash(e.pos,0x8040ff,20)}},
    {who:'@',text:XL3.m6_03,cam:witchShot(1,3.4)},
    {who:'Vesper',text:XL3.vp_02,fov:34,cam:()=>({pos:headOf(e.pos,1.7).add(V3(2.2,0,2.6)),look:look()}),onStart:()=>{try{e.m.actor.fire('Spell_Simple_Shoot',.8)}catch(x){}}},
    {who:'Kaen',text:XL3.k6_02,cut:true,cam:kS3(1.3,1.6)},
    {who:'@',text:XL3.m6_04,cam:witchShot(-1,3.2)},
    {who:'Vesper',text:XL3.vp_03,fov:40,cam:k=>({pos:headOf(e.pos,1.5).add(V3(-3,.5+k,3.4)),look:look()}),onStart:()=>{e.ai.cast=4}},
    {dur:1.4,fov:70,cam:k=>({pos:headOf(P.pos,2+k*6).add(V3(3,0,3)),look:headOf(P.pos,1)}),onStart:()=>{x3KFx();for(let k=0;k<30;k++)SM.emit(V3(P.pos.x+rand(-4,4),P.pos.y+rand(0,4),P.pos.z+rand(-4,4)),{c0:0x2a1840,c1:0x020104,s0:2,s1:6,life:1.4,a:.8,up:2});sx('portal',1,null,{rate:.6})}}],
    x3Arena)}
function x3Arena(){x3Build();const C=X3.C;const e=X3.e;P.pos.set(C.x,C.y,C.z+20);P.vy=0;P.flying=false;P.face=Math.PI;yaw=0;camera.position.set(C.x,C.y+5,C.z+31);P.invuln=2;
  if(KFW.a){KFW.a.g.position.set(C.x+2,C.y,C.z+22)}if(e){e.pos.set(C.x,C.y+.4,C.z-6);e.invuln=false;e.hpFloor=.5;e.ai.ph='A';e.ai.b=3;e.ai.g=6;e.ai.s=11;bossRef=e;$('boss').classList.remove('hidden');
    $('bossName').innerHTML=`${e.def.name} <span style="color:#ff4050">· Lv ${e.lvl}</span>`}
  X3.phase=1;CH2.st=Math.max(CH2.st,12);after(1.2,()=>epSay('Kaen',XL3.k6_03,1));after(.5,()=>toast('The Shadow Court, above St Paul\'s. There is no way down but through him.','Vesper',true))}
{const _bo=bossOutro;bossOutro=function(type,c){if(type==='vesper')return x3End(c);return _bo.apply(this,arguments)}}
function x3End(c){X3.phase=0;const e=X3.e;const lp=()=>LYR.a?LYR.a.g.position:X3.lPos||P.pos;
  playCutscene([{who:'Vesper',text:XL3.vp_11,fov:44,cam:k=>({pos:V3(c.x+Math.sin(k)*7,c.y+2,c.z+Math.cos(k)*7),look:c}),update:()=>SM.emit(V3(c.x+rand(-1.5,1.5),c.y+rand(-1,2),c.z+rand(-1.5,1.5)),{c0:0x3a2060,c1:0x05030a,s0:1.5,s1:4,life:1.4,a:.6,up:3})},
    {dur:2.2,fov:54,cam:k=>{const m=X3.mPos||P.pos;return{pos:V3(m.x+8,m.y+4+k*2,m.z+8),look:headOf(m,1)}},onStart:()=>{x3Shatter();P.heroAnim='Idle_Loop';try{LYR.a.setBase('Idle_Loop',.3)}catch(x){}flash(X3.mPos||P.pos,0xffffff,30);P.shake=1}},
    {who:'Kaen',text:XL3.k6_07,fov:38,cam:x3S(kpos,1.2,2.6,1.6)},
    {who:'@',text:XL3.m6_08,fov:40,cam:witchShot(1,3.2),onStart:()=>{x3SwapBack();x3KFx()}},
    {who:'Kaen',text:XL3.k6_08,cut:true,fov:36,cam:x3S(kpos,-1.1,2.4,1.6)},
    {who:'Lyra',text:XL3.ly46,cut:true,fov:40,cam:x3S(lp,1.1,2.8)},
    {who:'Kaen',text:XL3.k6_09,cut:true,fov:38,cam:x3S(kpos,1.2,2.6,1.6)}],x3Finish)}
function x3SwapBack(){const kp=P.pos.clone();kmEnd();P.heroAnim=null;if(X3.mPos)P.pos.copy(X3.mPos);if(KFW.a){KFW.a.g.position.copy(kp);KFW.a.g.rotation.y=Math.atan2(P.pos.x-kp.x,P.pos.z-kp.z)}P.face=Math.atan2(kp.x-P.pos.x,kp.z-P.pos.z);yaw=P.face+Math.PI;P.hp=maxHP()}
function x3Finish(){kmEnd();x3Shatter();x3Drop();X3.phase=0;X3.trap=null;x3StrugUI(false);P.heroAnim=null;const g=V3(36,0,-9866);P.pos.set(g.x,groundAt(g.x,g.z),g.z);P.vy=0;P.flying=false;P.face=Math.PI;yaw=0;camera.position.set(g.x,P.pos.y+5,g.z+11);
  if(KFW.a)KFW.a.g.position.set(g.x+1.4,P.pos.y,g.z+1.4);lyraPlace(g.x-1.6,g.z+1.6,Math.PI);LYR.home=false;X3.mPos=null;
  CH2.st=Math.max(CH2.st,13);ch2Save();beaten.add('vesper');writeSave();$('boss').classList.add('hidden');bossRef=null;
  toast('Kaen has his sword and his guardians back. Lyra gave everything she had, so for now she travels with you.','Chapter XIII complete',true);after(9,()=>toast('Chapter XIV is coming.','Sorcière',true))}

/* ---------- Kaen flies beside you, Lyra rides a guardian ---------- */
const LYF={g:null,an:''};
{const _mt=muTick;muTick=function(dt){_mt(dt);if(!started||MODE==='open'||CH2.st<13||KM.on)return;
  const a=KFW.a;if(a&&a.g.visible&&KFW.gear&&P.flying&&!CS.active){const f=V3(Math.sin(P.face),0,Math.cos(P.face)),r=V3(f.z,0,-f.x);const tg=P.pos.clone().addScaledVector(r,2.4).addScaledVector(f,-.8);tg.y=P.pos.y+.3+Math.sin(time*1.8)*.2;
    a.g.position.copy(tg);a.g.rotation.y=P.face;try{a.setBase('NinjaJump_Idle_Loop',.3)}catch(x){}KFW.an='';if(Math.random()<.6)SP.emit(V3(a.g.position.x,a.g.position.y+.2,a.g.position.z),{c0:0xe0c8ff,c1:0x5010c0,s0:.35,s1:.04,life:.5,speed:1})}
  if(LYR.mk)LYR.mk.visible=!!LYR.home;if(CH2.zone!=='north'){if(LYF.g)LYF.g.g.visible=false;return}if(!LYR.a){lyraPlace(P.pos.x-2,P.pos.z+2,P.face);LYR.home=false}const L=LYR.a;if(!L||CS.active)return;L.g.visible=true;
  const f=V3(Math.sin(P.face),0,Math.cos(P.face)),r=V3(f.z,0,-f.x);
  if(P.flying){if(!LYF.g){const m=buildGuardian();m.g.scale.setScalar(.26);scene.add(m.g);LYF.g=m;LYF.t=0}const m=LYF.g;m.g.visible=true;LYF.t+=dt;
    const tg=P.pos.clone().addScaledVector(r,-2.8).addScaledVector(f,-1.4);tg.y=P.pos.y-1.6+Math.sin(time*1.5)*.25;m.g.position.lerp(tg,Math.min(1,dt*4.5));m.g.rotation.y=lerpAngle(m.g.rotation.y,P.face,Math.min(1,dt*5));try{guardAnim({m,t:LYF.t,ai:{slam:0},pos:m.g.position},dt,0,0)}catch(x){}
    L.g.position.copy(m.g.position).add(V3(0,2.55,0));L.g.rotation.y=m.g.rotation.y;if(LYF.an!=='sit'){LYF.an='sit';try{L.setBase('Sitting_Idle_Loop',.3)}catch(x){}}}
  else{if(LYF.g)LYF.g.g.visible=false;const tg=P.pos.clone().addScaledVector(r,-1.5).addScaledVector(f,-1.5);tg.y=groundAt(tg.x,tg.z);const dd=Math.hypot(tg.x-L.g.position.x,tg.z-L.g.position.z);
    if(dd>40)L.g.position.copy(tg);else{L.g.position.lerp(tg,Math.min(1,dt*3.5));L.g.position.y=tg.y}const sp=dd*3.5;const an=sp>6?'Sprint_Loop':sp>1.2?'Walk_Loop':'Idle_Loop';if(LYF.an!==an){LYF.an=an;try{L.setBase(an,.3)}catch(x){}}
    if(dd>.4)L.g.rotation.y=lerpAngle(L.g.rotation.y,Math.atan2(tg.x-L.g.position.x,tg.z-L.g.position.z)*0+P.face,Math.min(1,dt*3))}}}
{const _lv=nzLeave;nzLeave=function(){const r=_lv.apply(this,arguments);if(LYF.g)LYF.g.g.visible=false;LYF.an='';return r}}

/* ---------- objectives, prologue, triggers ---------- */
{const _xo=xiiObj;xiiObj=function(){const st=CH2.st;if(st<11)return _xo.apply(this,arguments);if(CH2.zone==='paris')return st>=13?'Chapter XIV is coming':'Ask <b>Lyra</b> at the Trocadéro for the door to Calais, then fly back to London';
  if(st===11)return 'Look around London with Kaen';if(st===12){const d=Math.round(Math.hypot(P.pos.x-36,P.pos.z+9894));return X3.phase?'Defeat <b>Vesper</b>':`Go to <b>St Paul's</b> · ${d}m`}return 'Chapter XIV is coming'}}
{const _mt=muTick;muTick=function(dt){_mt(dt);if(!started||MODE==='open'||CS.active||!P.alive||CH2.zone!=='north')return;const st=CH2.st;
  if(st===11&&P.pos.z<LON_Z+150){X3.pro=(X3.pro||0)+dt;if(X3.pro>7&&!SAYQ.on&&!SAYQ.q.length){CH2.st=12;ch2Save();kSay('k6_01');after(1,()=>toast("Shadows are crawling over the dome of St Paul's.","Chapter XIII",true))}}
  if(st===12&&!X3.phase&&!X3.e&&Math.hypot(P.pos.x-36,P.pos.z+9894)<44)x3Intro()}}
for(const k of['k6_01'])VO_SPIRIT.delete(k);
CHAPTERS.push({id:'shadow',n:'XIII',title:"The Crown's Shadow",desc:'A shadow over St Paul\'s, a trap, a sword thrown across the dark, and Kaen at full strength.'});
{const _cb=chapBoss;chapBoss=function(c){if(c.id==='shadow')return null;return _cb(c)}}
function x3Reset(){if(X3.e&&!X3.e.dead)removeEnemy(X3.e);X3.e=null;for(const o of enemies)if(!o.dead&&o.vs)removeEnemy(o);kmEnd();x3Shatter();x3Drop();X3.phase=0;X3.trap=null;x3StrugUI(false);X3.mPos=null;X3.pro=0;P.heroAnim=null;if(LYF.g)LYF.g.g.visible=false;KFW.off=0;if(KFW.a&&KFW.gear){scene.remove(KFW.a.g);KFW.a=null}KFW.gear=0}
{const _ac=applyChapter;applyChapter=function(id){x3Reset();if(id!=='shadow')return _ac.apply(this,arguments);_ac.call(this,'escape');CH2.st=12;ch2Save();XII.lazy=1;XII.rv=[1,1,1,1,1,1];XII.solid=1;XII.wd=1;XII.said={fk:1,lon:1};xiiSave();KFW.gear=0;
  if(KFW.a){scene.remove(KFW.a.g);KFW.a=null}WD.esc=1;if(WD.e&&!WD.e.dead){WD.e.dead=true;WD.e.m.g.visible=false}WD.e=null;nzEnter('london');CH2.obj=nzObj;after(1.5,()=>toast("Shadows are crawling over the dome of St Paul's.","Chapter XIII",true))}}
{const _rc=renderChapters;renderChapters=function(){_rc();const list=$('chapList');const el=list&&list.children[chapIndexOf('shadow')];if(el){const done=CH2.st>=13,cur=started&&CH2.st>=11&&CH2.st<13;el.className='chap'+(done?' done':'')+(cur?' cur':'')}}}
