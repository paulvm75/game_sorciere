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
  epSay(XII.solid?'Kaen':"Kaen's Spirit",XL3.k7_08,1);toast(XHT.regrow?'The heart is gone for good. He is just a ghost now.':'The heart breaks. The Warden is cut off from the Tower. Hit him now!','The Tower',true);if(!XHT.regrow){XHT.regrow=1;XHT.rt=35}}}catch(x){console.warn(x)}return r}}
{const _mt=muTick;muTick=function(dt){_mt(dt);if(!started||MODE==='open')return;const w=XII.wdE;const live=CH2.st===10&&w&&!w.dead&&!w.invuln&&CH2.zone==='north';
  if(!live){if(XHT.beam)XHT.beam.visible=false;if(XHT.e&&!XHT.e.dead&&CH2.st!==10){removeEnemy(XHT.e);XHT.e=null}return}
  if(!XHT.e&&!XHT.spawned&&!CS.active){XHT.spawned=1;xhtSpawn();w.hpFloor=.45;after(.8,()=>toast('The Tower feeds him from its crown. Fly up and break its <b>heart</b>, or he will keep healing.','The Heart of the Tower',true));
    if(!XHT.said){XHT.said=1;XHT.rem=22;after(1.5,()=>epSay(XII.solid?'Kaen':"Kaen's Spirit",XL3.k7_06,1))}}
  if(XHT.regrow===1&&!xhtAlive()){XHT.rt-=dt;if(XHT.rt<=0){XHT.regrow=2;if(w.hp>w.maxhp*.35){xhtSpawn();w.hpFloor=.3;toast('The Tower grows a new heart. Break it again!','The Heart of the Tower',true)}}}
  const box=$('boss');if(box)box.classList.toggle('wdregen',xhtAlive());if(xhtAlive()&&XHT.rem!=null){XHT.rem-=dt;if(XHT.rem<=0&&(XHT.nrem||0)<4&&!CS.active){const hp=XHT.e.pos;if(Math.hypot(P.pos.x-hp.x,P.pos.z-hp.z)>18||P.pos.y<hp.y-12){XHT.nrem=(XHT.nrem||0)+1;epSay(XII.solid?'Kaen':"Kaen's Spirit",XL3.k7_07,1)}XHT.rem=24}}
  if(xhtAlive()){w.hp=Math.min(w.maxhp,w.hp+w.maxhp*.01*dt);const a=V3(XHT.e.pos.x,XHT.e.pos.y+2,XHT.e.pos.z),b=headOf(w.pos,4);const B=XHT.beam;B.visible=true;B.position.copy(a).lerp(b,.5);B.scale.set(1,a.distanceTo(b),1);B.lookAt(b);B.rotateX(Math.PI/2);
    B.material.opacity=.35+Math.sin(time*9)*.15;if(Math.random()<.5)SP.emit(a.clone().lerp(b,Math.random()),{c0:0xd0ffe0,c1:0x20c050,s0:.5,s1:.05,life:.5,speed:1})}else if(XHT.beam)XHT.beam.visible=false}}
{const _ac=applyChapter;applyChapter=function(){XHT.spawned=0;XHT.regrow=0;XHT.said=0;XHT.nrem=0;XHT.rem=null;if(XHT.e&&!XHT.e.dead)removeEnemy(XHT.e);XHT.e=null;return _ac.apply(this,arguments)}}

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
/* the Crown's Shadow is not a man: a horned, faceless wraith of smoke and claws */
let WR_TEX=null;
function wraithTatter(){if(WR_TEX)return WR_TEX;WR_TEX=canvasTex(128,256,(x,w,h)=>{x.clearRect(0,0,w,h);const g=x.createLinearGradient(0,0,0,h);g.addColorStop(0,'rgba(20,10,34,1)');g.addColorStop(.6,'rgba(12,6,22,.9)');g.addColorStop(1,'rgba(10,4,20,0)');x.fillStyle=g;
  x.beginPath();x.moveTo(0,0);x.lineTo(w,0);let y=h*.55;for(let X=w;X>=0;X-=8){x.lineTo(X,y+rand(0,h*.45))}x.closePath();x.fill();x.globalCompositeOperation='destination-out';for(let k=0;k<14;k++){x.beginPath();x.ellipse(rand(0,w),rand(h*.3,h),rand(3,9),rand(8,24),0,0,TAU);x.fill()}
  x.globalCompositeOperation='source-over';x.strokeStyle='rgba(150,90,255,.35)';x.lineWidth=1.5;for(let k=0;k<6;k++){x.beginPath();const sx0=rand(10,w-10);x.moveTo(sx0,0);x.bezierCurveTo(sx0+rand(-20,20),h*.3,sx0+rand(-20,20),h*.6,sx0+rand(-20,20),h*.8);x.stroke()}});return WR_TEX}
function buildWraith(s,boss){const g=new THREE.Group(),body=new THREE.Group();g.add(body);const R=new THREE.Group();R.scale.setScalar(s);body.add(R);
  const bm=std({color:0x060409,roughness:.85,metalness:.1,emissive:0x0c0418,emissiveIntensity:.8});const hm=std({color:0x0a0710,roughness:.35,metalness:.6,emissive:0x1a0838,emissiveIntensity:.6});
  const tm=new THREE.MeshBasicMaterial({map:wraithTatter(),color:0xffffff,transparent:true,side:THREE.DoubleSide,depthWrite:false,alphaTest:.08});
  const eyeM=new THREE.MeshBasicMaterial({color:0xf0dcff});
  const torso=new THREE.Group();torso.position.y=1.7;R.add(torso);
  const prof=[[.05,-.2],[.26,0],[.36,.35],[.5,.75],[.58,1.05],[.5,1.3],[.28,1.45],[.12,1.55]].map(p=>new THREE.Vector2(p[0],p[1]));const tg=new THREE.LatheGeometry(prof,16);const tr=new THREE.Mesh(tg,bm);tr.scale.set(1,1,.62);torso.add(tr);torso.rotation.x=.28;
  for(let k=0;k<6;k++){const r=new THREE.Mesh(new THREE.TorusGeometry(.42-k*.02,.025,5,18,Math.PI*1.2),hm);r.position.set(0,.5+k*.13,.12);r.rotation.set(Math.PI/2-.15,0,-Math.PI*.1);r.scale.set(1.05,.62,1);torso.add(r)}
  for(let k=0;k<6;k++){const sp=new THREE.Mesh(G.cone,hm);sp.scale.set(.05,.28-k*.02,.05);sp.position.set(0,.45+k*.17,-.36+k*.01);sp.rotation.x=-.9;torso.add(sp)}
  const neck=new THREE.Group();neck.position.set(0,1.5,.12);torso.add(neck);const head=new THREE.Group();head.position.set(0,.3,.18);neck.add(head);
  const sk=new THREE.Mesh(new THREE.SphereGeometry(.3,16,12),bm);sk.scale.set(.82,1.05,1.35);head.add(sk);const jaw=new THREE.Mesh(new THREE.ConeGeometry(.16,.55,8),bm);jaw.rotation.x=Math.PI*.62;jaw.position.set(0,-.2,.26);head.add(jaw);
  const eyes=[];for(const q of[-1,1]){const e=new THREE.Mesh(new THREE.PlaneGeometry(.17,.035),eyeM);e.position.set(q*.11,.03,.37);e.rotation.set(0,q*.35,q*-.28);head.add(e);const gl=glowSprite(0xc090ff,.5,.9,false);gl.position.copy(e.position);head.add(gl);eyes.push(gl)}
  const hornC=q=>new THREE.CatmullRomCurve3([V3(q*.18,.18,.05),V3(q*.42,.42,-.15),V3(q*.62,.55,-.55),V3(q*.55,.9,-.95),V3(q*.35,1.25,-1.1)]);
  for(const q of[-1,1]){const h=new THREE.Mesh(new THREE.TubeGeometry(hornC(q),20,.06,7,false),hm);h.geometry.computeBoundingSphere();head.add(h);const tip=new THREE.Mesh(G.cone,hm);tip.scale.set(.06,.22,.06);tip.position.set(q*.35,1.32,-1.12);tip.rotation.x=-.4;head.add(tip)}
  const crown=new THREE.Group();crown.position.set(0,.72,-.05);if(boss)head.add(crown);const cm=std({color:0x0a0810,metalness:1,roughness:.2,emissive:0x5a18c0,emissiveIntensity:1.1});
  for(let k=0;k<9;k++){const a=k/9*TAU;const c=new THREE.Mesh(G.cone,cm);c.scale.set(.035,.22+(k%2)*.12,.035);c.position.set(Math.sin(a)*.32,0,Math.cos(a)*.32);crown.add(c)}const cr=new THREE.Mesh(new THREE.TorusGeometry(.32,.018,6,32),cm);cr.rotation.x=Math.PI/2;crown.add(cr);const cg=glowSprite(0x9a50ff,2.2,.5,false);crown.add(cg);
  const arms=[];for(const q of[-1,1]){const sh=new THREE.Group();sh.position.set(q*.56,1.2,0);torso.add(sh);const up=new THREE.Mesh(new THREE.CylinderGeometry(.07,.05,1.25,7),bm);up.position.y=-.62;sh.add(up);
    const el=new THREE.Group();el.position.y=-1.25;sh.add(el);const fo=new THREE.Mesh(new THREE.CylinderGeometry(.05,.035,1.3,7),bm);fo.position.y=-.65;el.add(fo);const sp=new THREE.Mesh(G.cone,hm);sp.scale.set(.04,.18,.04);sp.position.set(0,.05,-.08);sp.rotation.x=-2.4;el.add(sp);
    const hand=new THREE.Group();hand.position.y=-1.32;el.add(hand);const palm=new THREE.Mesh(new THREE.SphereGeometry(.09,8,6),bm);palm.scale.set(1,.8,.6);hand.add(palm);const fingers=[];
    for(let f=0;f<4;f++){const fg=new THREE.Group();fg.position.set((f-1.5)*.05,-.04,.03);fg.rotation.set(.15,0,(f-1.5)*.18*q);hand.add(fg);const c=new THREE.Mesh(G.cone,hm);c.scale.set(.025,.5,.025);c.rotation.x=Math.PI;c.position.y=-.25;fg.add(c);fingers.push(fg)}
    sh.rotation.z=q*.18;el.rotation.x=-.25;arms.push({q,sh,el,hand,fingers})}
  const tat=[];for(let k=0;k<12;k++){const a=k/12*TAU;const L=rand(1.4,1.9);const pg=new THREE.PlaneGeometry(.55,L);pg.translate(0,-L/2,0);const t=new THREE.Mesh(pg,tm);t.position.set(Math.sin(a)*.34,1.75,Math.cos(a)*.24);t.rotation.y=a;R.add(t);tat.push({t,a,ph:rand(0,TAU)})}
  for(let k=0;k<6;k++){const a=k/6*TAU+.3;const L=rand(1.2,1.6);const pg=new THREE.PlaneGeometry(.6,L);pg.translate(0,-L/2,0);const t=new THREE.Mesh(pg,tm);t.position.set(Math.sin(a)*.5,2.85,Math.cos(a)*.3-.05);t.rotation.y=a;torso.add(t);t.position.sub(torso.position);tat.push({t,a,ph:rand(0,TAU),hi:1})}
  const aura=glowSprite(0x3a1080,7,.35);aura.position.y=2.2;R.add(aura);const core=glowSprite(0x7a30ff,1.6,.5,false);core.position.set(0,.85,.25);torso.add(core);
  const bub=new THREE.Mesh(new THREE.SphereGeometry(2.4,24,16),new THREE.MeshBasicMaterial({color:0x6a30d0,transparent:true,opacity:.2,blending:THREE.AdditiveBlending,depthWrite:false,side:THREE.DoubleSide}));bub.position.y=2.1*s;bub.scale.setScalar(s);bub.visible=false;g.add(bub);
  const st={at:0,an:null};
  return{g,body,head,bub,anim:(e,dt,mv,lunge)=>{const ai=e.ai||{};const t=e.t||0;if(e.m.lock>0)e.m.lock-=dt;if(ai.cast>0)ai.cast-=0;
    const an=ai.dAnim||(lunge>0?'Melee_Hook':null);if(an!==st.an){st.an=an;st.at=0}st.at+=dt;const big=ai.dbig||0;R.scale.setScalar(lerp(R.scale.x,s*(1+big*.55),Math.min(1,dt*3)));
    body.position.y=Math.sin(t*1.6)*.12*s+(boss?.25:.05);torso.rotation.z=Math.sin(t*.9)*.05;neck.rotation.set(Math.sin(t*.7)*.12,Math.sin(t*.5)*.25,0);crown.rotation.y+=dt*.8;crown.position.y=.72+Math.sin(t*2)*.04;
    for(const A of arms){const q=A.q;let sx=Math.sin(t*1.3+q)*.15,sz=q*(.18+Math.sin(t*1.1)*.05),ex=-.25-Math.sin(t*1.7+q)*.1,cl=.15;
      if(ai.cast>0||an==='Spell_Simple_Idle_Loop'){sx=-1.25+Math.sin(t*5+q)*.08;sz=q*.45;ex=-.55;cl=.6}
      if(an==='Melee_Hook'){const k=Math.min(1,st.at/.55);if(q>0){sx=k<.5?-2.4*k*2:-2.4+4*(k-.5)*2;sz=q*(.4+k*.4);ex=-.2}cl=.7}
      if(an==='Punch_Cross'){const k=(st.at%.9)/.9;sx=k<.55?-2.6*k/.55:-2.6+3.4*(k-.55)/.45;sz=q*.25;ex=-.15;cl=.6}
      A.sh.rotation.x=lerp(A.sh.rotation.x,sx,Math.min(1,dt*10));A.sh.rotation.z=lerp(A.sh.rotation.z,sz,Math.min(1,dt*8));A.el.rotation.x=lerp(A.el.rotation.x,ex,Math.min(1,dt*8));A.fingers.forEach((f,i)=>{f.rotation.x=lerp(f.rotation.x,cl+Math.sin(t*3+i)*.05,Math.min(1,dt*8))})}
    for(const T of tat){T.t.rotation.x=Math.sin(t*2.2+T.ph)*.22+(T.hi?.1:.18)+(mv||0)*.4;T.t.rotation.z=Math.sin(t*1.7+T.ph)*.12}
    const fl=e.flash>0?1:0;eyes.forEach(g2=>g2.material.opacity=.75+Math.sin(t*6)*.2+fl*.25);aura.material.opacity=.28+Math.sin(t*1.7)*.08+big*.2;bm.emissiveIntensity=.8+fl*3;
    bub.visible=!!e.guarded;if(bub.visible){bub.rotation.y+=dt;bub.material.opacity=.16+Math.sin(t*5)*.06}
    if(Math.random()<(boss?.75:.35))SM.emit(V3(e.pos.x+rand(-.6,.6)*s,e.pos.y+rand(0,1.2)*s,e.pos.z+rand(-.6,.6)*s),{c0:0x2a1a40,c1:0x05030a,s0:1.2*s+.4,s1:2.8*s+.4,life:1.1,a:.55,up:.8});
    if(boss&&Math.random()<.35){const h=arms[Math.random()<.5?0:1].hand.getWorldPosition(V3());SP.emit(h,{c0:0xd0b0ff,c1:0x30006a,s0:.3,s1:.03,life:.5,up:.6})}}}}
function buildVesper(){return buildWraith(1.25,true)}
function buildShade(){return buildWraith(.5,false)}
ETYPES.vesper={name:"Vesper, the Crown's Shadow",boss:true,hp:7000,speed:0,dmg:30,range:0,cd:9,xp:5000,r:1.4,h:4.4,fly:1,ghost:true,noCalm:true,build:buildVesper};
ETYPES.vshade={name:'Shade',hp:160,speed:9,dmg:18,range:2.2,cd:1.4,xp:60,r:.6,h:2,build:buildShade};
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
  SM.emit(eCenter(e),{n:30,c0:0x40206a,c1:0x05030a,s0:2,s1:5,life:1,a:.6,up:1.5});sfx.blink&&sfx.blink();e.pos.set(to.x,X3.C.y+.2,to.z);if(KM.on&&time>(KM.m7t||0)){KM.m7t=time+25;x3Bark('@','m7_07')}SM.emit(eCenter(e),{n:30,c0:0x40206a,c1:0x05030a,s0:2,s1:5,life:1,a:.6,up:1.5});
  if(!X3.said.v6&&e.ai.ph==='A'){X3.said.v6=1;epSay('Vesper',XL3.vp_06)}
  const dir=V3(P.pos.x-e.pos.x,0,P.pos.z-e.pos.z).normalize();e.m.g.rotation.y=Math.atan2(dir.x,dir.z);e.ai.dAnim='Melee_Hook';e.m.lock=1.1;try{e.m.actor.once('Spell_Simple_Shoot',.9)}catch(x){}
  coneTelegraph(V3(e.pos.x,X3.C.y,e.pos.z),dir,11,.55,.75,0x9050ff,()=>{e.ai.dAnim=null;crescentFx(V3(e.pos.x,X3.C.y,e.pos.z),dir,10,0x7a40ff);P.shake=Math.max(P.shake,.5);if(inCone(P.pos,V3(e.pos.x,X3.C.y,e.pos.z),dir,11,.55))damagePlayer(vsMaxHP()*.2)})}
function vsEclipse(e){e.ai.dbig=1;e.ai.cast=4;toast('His shadow grows. Get airborne when the rings come!','Eclipse',true);sx('garg',.8,null,{rate:.5});
  for(let k=0;k<3;k++)after(1+k*1.1,()=>{if(e.dead)return;e.ai.dAnim='Punch_Cross';P.shake=1;flash(e.pos,0x8040ff,20);x3Ring(V3(e.pos.x,X3.C.y,e.pos.z),X3.R+2,16,vsMaxHP()*.14)});after(4.6,()=>{e.ai.dbig=0;e.ai.dAnim=null})}
function x3Ring(c,maxR,speed,dmg){const m=new THREE.Mesh(new THREE.RingGeometry(.9,1,72),new THREE.MeshBasicMaterial({color:0x9a50ff,transparent:true,depthWrite:false,blending:THREE.AdditiveBlending,side:THREE.DoubleSide}));m.rotation.x=-Math.PI/2;m.position.set(c.x,c.y+.3,c.z);let hit=false;
  addFx(m,maxR/speed,(f,k)=>{const r=f.t*speed;m.scale.setScalar(r);m.material.opacity=1-k*.8;if(Math.random()<.9){const a=rand(0,TAU);SM.emit(V3(c.x+Math.sin(a)*r,c.y+.6,c.z+Math.cos(a)*r),{c0:0x50307a,c1:0x05030a,s0:1.5,s1:3,life:.6,a:.5})}
    const d=Math.hypot(P.pos.x-c.x,P.pos.z-c.z);if(!hit&&Math.abs(d-r)<1.3&&P.pos.y-c.y<1.2){hit=true;damagePlayer(dmg)}},()=>{scene.remove(m);m.geometry.dispose()})}
BOSSAI.vesper=function(e,dt,d){const a=e.ai;if(!a.ph)return;const B=a.ph==='B',sp=B?1.25:1;a.cast=Math.max(0,(a.cast||0)-dt);
  a.orb=(a.orb||rand(0,TAU))+dt*(B?.35:.25);const tgt=V3(X3.C.x+Math.sin(a.orb)*11,X3.C.y+.4+Math.sin(e.t*1.3)*.25,X3.C.z+Math.cos(a.orb)*11);e.pos.lerp(tgt,Math.min(1,dt*(e.m.lock>0||e.rooted>0?0:.6)));
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
const vS=(side,dist)=>()=>{const e=X3.e;const p=e?e.pos:X3.C;const d=V3(P.pos.x-p.x,0,P.pos.z-p.z);if(d.lengthSq()<.01)d.set(0,0,1);d.normalize();const r=V3(d.z,0,-d.x);return{pos:headOf(p,3.4).addScaledVector(d,(dist||3.2)*1.6).addScaledVector(r,(side||1)*1.4),look:headOf(p,3.3)}};
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
    {who:'Lyra',text:XL3.ly44,cut:true,fov:52,cam:k=>{const a=headOf(L,1.3),b=headOf(kp,1.2);const m=a.clone().lerp(b,.5);const r=V3(b.z-a.z,0,-(b.x-a.x)).normalize();const ang=k*.5;return{pos:m.clone().addScaledVector(r,15*Math.cos(ang)).add(V3(Math.sin(ang)*6,6.5+k*2,0)),look:m.clone().add(V3(0,.8,0))}},
      onStart:()=>{try{LYR.a.setBase('Spell_Simple_Idle_Loop',.3)}catch(x){}x3Transfer(()=>LYR.a?LYR.a.g.position:L,()=>KFW.a?KFW.a.g.position:kp,6.5);sx('riser',.9,null,{rate:.8})}},
    {dur:2.6,fov:46,cam:k=>{const b=headOf(kp,1.2);const a=headOf(L,1.3);const d=V3(b.x-a.x,0,b.z-a.z).normalize();const r=V3(d.z,0,-d.x);return{pos:b.clone().addScaledVector(r,9-k*3).addScaledVector(d,4).add(V3(0,2.4-k,0)),look:b.clone().add(V3(0,.4,0))}},
      update:()=>{const p=KFW.a?KFW.a.g.position:kp;for(let q=0;q<3;q++)SP.emit(headOf(p,rand(0,2.2)).add(V3(rand(-1,1),0,rand(-1,1))),{c0:0xffe0f0,c1:0xa040ff,s0:.5,s1:.05,life:.8,up:2.5})},
      onEnd:()=>{}},
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
/* kinetic body swap: an explosive zoom-out off Maëlle, her soul-light whips across the arena, a punch-in into Kaen's eyes */
let x3ZB=null;
function x3Canvas(cls,ms){const cv=renderer&&renderer.domElement;if(!cv)return;if(!x3ZB){const st=document.createElement('style');st.textContent='canvas.x3zo{animation:x3zo 1.1s cubic-bezier(.5,0,.75,0) both}canvas.x3wh{animation:x3wh .9s ease-in-out both}canvas.x3pi{animation:x3pi .7s cubic-bezier(.2,1.4,.3,1) both}@keyframes x3zo{0%{filter:none;transform:scale(1)}60%{filter:blur(1.5px) saturate(1.6) contrast(1.1) hue-rotate(-12deg);transform:scale(1.06)}100%{filter:blur(5px) saturate(2) brightness(1.4);transform:scale(1.16)}}@keyframes x3wh{0%{filter:blur(5px) brightness(1.3);transform:scale(1.12) skewX(-2deg)}50%{filter:blur(3px) saturate(1.8);transform:scale(1.06) skewX(3deg)}100%{filter:blur(1px);transform:scale(1.02)}}@keyframes x3pi{0%{filter:brightness(2.2) saturate(1.8) blur(2px);transform:scale(1.22)}100%{filter:none;transform:scale(1)}}';document.head.appendChild(st);x3ZB=1}
  cv.classList.remove('x3zo','x3wh','x3pi');void cv.offsetWidth;if(cls){cv.classList.add(cls);clearTimeout(cv._x3t);cv._x3t=setTimeout(()=>cv.classList.remove(cls),ms||1200)}}
const eIn=t=>t*t*t,eOut=t=>1-Math.pow(1-t,3),eBack=t=>{const c=1.9;return 1+(c+1)*Math.pow(t-1,3)+c*Math.pow(t-1,2)};
function x3Kinetic(){const m=(X3.mPos||P.pos).clone(),k=kpos().clone();let swapped=false;const C=X3.C;
  const away=V3(k.x-m.x,0,k.z-m.z);if(away.lengthSq()<.01)away.set(0,0,1);away.normalize();const kd=V3(C.x-k.x,0,C.z-k.z).normalize();
  const orb=glowSprite(0xd0a8ff,3,1,false),oc=glowSprite(0xffffff,1.1,1,false);const op=headOf(m,1.3);const pathPt=u=>{const p=headOf(m,1.3).lerp(headOf(k,1.4),u);p.y+=Math.sin(u*Math.PI)*7;return p};
  const fovSet=f=>{camera.fov=f;camera.updateProjectionMatrix()};
  playCutscene([
    {dur:1.1,fov:30,snap:true,cam:()=>({pos:headOf(m,1.15).addScaledVector(away,1.7),look:headOf(m,.95)}),onStart:()=>{x3KFx();x3Canvas('x3zo',1150);sx('riser',1,null,{rate:1.4});try{sfx.blink()}catch(x){}P.shake=.6;scene.add(orb);scene.add(oc);orb.position.copy(op);oc.position.copy(op)},
      update:(dt,kk)=>{const e=eIn(kk);camera.position.copy(headOf(m,1.15+e*7).addScaledVector(away,1.7+e*14).add(V3(-away.z*e*5,0,away.x*e*5)));camera.lookAt(headOf(m,.95+e*.5));fovSet(30+e*62);const s=1+kk*1.2;orb.scale.setScalar(2.2*s);oc.scale.setScalar(.8*s);
        for(let q=0;q<4;q++)SP.emit(headOf(m,rand(.3,2)).add(V3(rand(-.8,.8),0,rand(-.8,.8))),{c0:0xffffff,c1:0xa060ff,s0:.4,s1:.04,life:.5,speed:-2})}},
    {dur:.85,fov:80,snap:true,cam:()=>({pos:pathPt(0),look:pathPt(.2)}),onStart:()=>{x3Canvas('x3wh',900);try{sfx.blink()}catch(x){}sx('portal',.7,null,{rate:1.6})},
      update:(dt,kk)=>{const u=eOut(kk);const p=pathPt(u),ahead=pathPt(Math.min(1,u+.15));orb.position.copy(p);oc.position.copy(p);orb.scale.setScalar(2.4);oc.scale.setScalar(.9);const d=ahead.clone().sub(p).normalize();camera.position.copy(p).addScaledVector(d,-5.5).add(V3(0,1.6,0));camera.lookAt(ahead);fovSet(84-kk*18);
        for(let q=0;q<6;q++)SP.emit(p.clone().add(V3(rand(-.4,.4),rand(-.4,.4),rand(-.4,.4))),{c0:0xffffff,c1:0xb070ff,s0:.6,s1:.05,life:.6,speed:1})}},
    {dur:1.5,fov:52,snap:true,cam:()=>({pos:headOf(k,2).addScaledVector(kd,-3.6),look:headOf(k,1.5).addScaledVector(kd,6)}),
      onStart:()=>{scene.remove(orb);scene.remove(oc);if(!swapped){swapped=true;kmStart()}x3Canvas('x3pi',750);flash(k,0xffffff,40);flash(k,0xb070ff,30);P.shake=1.6;sx('impact',1,null,{rate:.7});sx('powerup',.9,null,{rate:.9});
        SP.emit(headOf(k,1.2),{n:320,c0:0xffffff,c1:0x9a50ff,speed:16,life:1.1,s0:.8,s1:.06});ring(V3(k.x,k.y+.1,k.z),0xd090ff,1,16,.55);try{KM.a.fire('Spell_Simple_Shoot',.6)}catch(x){}},
      update:(dt,kk)=>{const e=eBack(Math.min(1,kk*1.6));const wide=headOf(k,6).addScaledVector(kd,-14).add(V3(kd.z*4,0,-kd.x*4));const close=headOf(k,2).addScaledVector(kd,-3.6).add(V3(kd.z*.9,0,-kd.x*.9));
        camera.position.copy(wide.lerp(close,e));camera.lookAt(headOf(k,1.45).addScaledVector(kd,6*Math.min(1,e)));fovSet(88-36*Math.min(1.08,e))}}],
    ()=>{scene.remove(orb);scene.remove(oc);if(!swapped)kmStart();kmStartPlay()})}

/* ---------- playing as Kaen ---------- */
const KM={on:0,a:null,fe:null,en:100,cd:[0,0,0,0,0,0,0],sh:0,dash:null,combo:0,lb:0,g:[],said:{},hud:null,lunge:null};
function x3GearKaen(){const old=KFW.a;const pos=old?old.g.position.clone():P.pos.clone(),ry=old?old.g.rotation.y:0;if(old)scene.remove(old.g);const ill=buildIllusion();if(!ill||!ill.actor){KFW.a=old;if(old)scene.add(old.g);return}
  const a=ill.actor;a.ill=ill;try{const K=ill.K;if(K.cloak&&K.cloak.parent)K.cloak.parent.remove(K.cloak);K.cloak=a.sk(cloakGeo(a.S,a.bones,{w0:.2,w1:.34,top:.1,back:.1,flare:.08,wrap:.16,bottom:a.S.SK.calf_l.y-.05}),K.cloakM)}catch(x){}ill.K.eyes.forEach(s=>s.material.color.setHex(0xc8b0ff));a.g.position.copy(pos);a.g.rotation.y=ry;scene.add(a.g);KFW.a=a;KFW.gm=new THREE.MeshBasicMaterial();KFW.kp=null;KFW.mode='';KFW.an='';KFW.gear=1;try{a.setBase('Idle_Loop');a.update(.2)}catch(x){}return a}
{const _kb=kfBuild;kfBuild=function(){if(KFW.a||!(XII.solid&&(CH2.st>=13||KFW.gear)))return _kb.apply(this,arguments);KFW.a=null;const a=x3GearKaen();return a||_kb.apply(this,arguments)}}
function kmStart(){if(KM.on)return;const a=KFW.a&&KFW.gear?KFW.a:x3GearKaen();KFW.a=null;KFW.off=1;KM.a=a;KM.on=1;KM.fe={m:a.ill,t:0,lb:0,pos:a.g.position,def:{h:2.4},ai:{}};
  P.pos.copy(a.g.position);P.pos.y=X3.C.y;P.vy=0;P.flying=false;const e=X3.e;if(e){P.face=Math.atan2(e.pos.x-P.pos.x,e.pos.z-P.pos.z);yaw=P.face+Math.PI}
  if(X3.cages.length<2&&X3.lPos){x3Cage(X3.lPos.clone());if(LYR.a){LYR.a.g.position.copy(X3.lPos);try{LYR.a.setBase('Crouch_Idle_Loop',.3)}catch(x){}}}P.hp=maxHP();P.mp=maxMP();P.flyMeter=flyMax();P.invuln=3;KM.en=100;KM.cd=KM_AB.map(()=>0);KM.sh=0;KM.dash=null;KM.lb=0;KM.combo=0;KM.mt=8;KM.said={};kmHud(true)}
function kmStartPlay(){const e=X3.e;if(e){e.invuln=false;e.hp=e.maxhp;e.hpFloor=0;e.guarded=false;e.ai.ph='B';e.ai.dAnim=null;e.ai.b=3;e.ai.g=6;e.ai.s=10;bossRef=e;$('boss').classList.remove('hidden')}X3.phase=2;sayHush();
  after(.4,()=>epSay('Kaen',XL3.kf_07,1));after(1,()=>toast('You are Kaen. <b>1</b> Sword · <b>2</b> Sword Wave · <b>3</b> Void Trap · <b>4</b> Guardians · <b>5</b> Shield · <b>6</b> Dash Strike · <b>7</b> Limit Break · <b>8</b> Phantom Blades · <b>9</b> Crescent Storm. <b>F</b> to teleport, Space twice to fly.','You are Kaen now! Defeat Vesper',true))}
const KM_AB=[['Sword','M4 20l9-9M14 4l6 6-9 9-3-3z'],['Sword Wave','M3 18c6-1 12-6 15-14l3 1c-2 9-9 15-18 16z'],['Void Trap','M12 3a9 9 0 1 0 0 18a9 9 0 1 0 0-18zm0 4a5 5 0 1 1 0 10a5 5 0 1 1 0-10z'],['Guardians','M12 2l3 5 6 1-4 4 1 6-6-3-6 3 1-6-4-4 6-1z'],['Shield','M12 2l8 3v6c0 5-3.5 9-8 11-4.5-2-8-6-8-11V5z'],['Dash Strike','M2 13h9l-3 4h3l9-9-9-1 2 3H2z'],['Limit Break','M13 1L4 14h7l-1 9 9-13h-7z']];
function kmHud(on){if(!KM.hud){const d=document.createElement('div');d.id='kmBar';
    d.innerHTML='<div class="en"><i></i><span>Kaen</span></div><div class="row">'+KM_AB.map((x,i)=>`<button data-i="${i}"><svg viewBox="0 0 24 24"><path d="${x[1]}"/></svg><b>${i+1}</b><em>${x[0]}</em><s></s><u></u></button>`).join('')+'</div>';document.body.appendChild(d);
    const st=document.createElement('style');st.textContent='#kmBar{position:fixed;left:50%;bottom:16px;transform:translateX(-50%);z-index:30;display:none;flex-direction:column;align-items:center;gap:8px;font:500 12px Outfit,system-ui,sans-serif;color:#efe6ff}#kmBar.on{display:flex}#kmBar .en{width:min(520px,90vw);height:8px;border-radius:5px;background:rgba(20,10,40,.6);position:relative;overflow:hidden;border:1px solid rgba(190,150,255,.3)}#kmBar .en i{position:absolute;inset:0;transform-origin:0 50%;background:linear-gradient(90deg,#6a2ad8,#c9a0ff)}#kmBar .en span{position:absolute;right:6px;top:-18px;font:italic 600 13px Fraunces,Georgia,serif;color:#cdb0ff}#kmBar .row{display:flex;gap:8px}#kmBar button{position:relative;width:70px;height:70px;border-radius:14px;border:1px solid rgba(190,150,255,.38);background:linear-gradient(180deg,rgba(40,20,80,.78),rgba(12,6,26,.84));color:#e8dcff;cursor:pointer;overflow:hidden;padding:0;transition:transform .12s}#kmBar button:active{transform:scale(.94)}#kmBar svg{width:26px;height:26px;fill:#d8c0ff;margin-top:9px}#kmBar b{position:absolute;left:7px;top:5px;font-size:11px;opacity:.7}#kmBar em{display:block;font-style:normal;font-size:10px;margin-top:3px;opacity:.9;white-space:nowrap}#kmBar s{position:absolute;left:0;right:0;bottom:0;height:0;background:rgba(0,0,0,.62);text-decoration:none}#kmBar u{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font:600 15px Outfit,sans-serif;text-decoration:none;color:#fff;text-shadow:0 1px 4px #000}#kmBar button.lo{filter:grayscale(.8) brightness(.7)}#kmBar button.lb{box-shadow:0 0 18px rgba(170,110,255,.85)}@media (max-width:700px){#kmBar button{width:46px;height:46px;border-radius:11px}#kmBar svg{width:20px;height:20px;margin-top:6px}#kmBar em{display:none}#kmBar .row{gap:5px}}';document.head.appendChild(st);
    d.querySelectorAll('button').forEach(b=>b.addEventListener('pointerdown',e=>{e.preventDefault();e.stopPropagation();kmUse(+b.dataset.i)}));KM.hud=d}
  KM.hud.classList.toggle('on',!!on);const sp=$('spells');if(sp)sp.style.visibility=on?'hidden':''}
const KM_COST=[0,18,25,40,0,15,60],KM_CD=[.4,2.4,9,20,60,6,28];
function kmTarget(r){const t=findTarget(r);return t&&!t.dead?t:null}
function kmDmg(e,f){const mul=KM.lb>0?1.8:1;return(e.def.boss?e.maxhp*f:e.maxhp*Math.min(.6,f*55))*mul}
function kmSlashFx(dir,big,col){const o=P.pos;const n=big?3:2;for(let k=0;k<n;k++){const m=new THREE.Mesh(new THREE.TorusGeometry(big?3:2.3,k?.05:.16,6,32,Math.PI*1.1),new THREE.MeshBasicMaterial({color:k?0xffffff:col,transparent:true,blending:THREE.AdditiveBlending,depthWrite:false,side:THREE.DoubleSide}));
    const tilt=(KM.combo%2?1:-1)*rand(.25,.6);m.rotation.set(Math.PI/2+tilt*.3,0,Math.atan2(dir.x,dir.z)-Math.PI/2+tilt);const y=o.y+1.15;
    addFx(m,.28,(f,kk)=>{m.position.set(o.x+dir.x*(1.2+kk*1.4),y,o.z+dir.z*(1.2+kk*1.4));m.material.opacity=(1-kk)*(k?1:.85);m.scale.setScalar(.7+kk*.6);m.rotation.z+=(KM.combo%2?.25:-.25)},()=>{scene.remove(m);m.geometry.dispose();m.material.dispose()})}
  for(let k=0;k<14;k++)SP.emit(V3(o.x+dir.x*rand(1,3.4),o.y+rand(.6,1.8),o.z+dir.z*rand(1,3.4)),{c0:0xffffff,c1:col,s0:.4,s1:.04,life:.35,speed:5})}
function kmHitCone(range,half,f,col){const o=P.pos,dir=V3(Math.sin(P.face),0,Math.cos(P.face));let n=0;for(const e of enemies){if(e.dead)continue;if(inCone(eCenter(e),V3(o.x,o.y,o.z),dir,range+e.def.r,half)){damageEnemy(e,kmDmg(e,f),col||'#c9a0ff');n++;const c=eCenter(e);SP.emit(c,{n:18,c0:0xffffff,c1:0xb070ff,speed:8,life:.45});flash(c,0xb070ff,6)}}return n}
function kmUse(i){if(!KM.on||CS.active||!P.alive||i<0||i>=KM_AB.length)return;const face0=P.face;if(KM.cd[i]>0)return;if(KM.en<KM_COST[i]){toast('Not enough strength yet. Land a few sword hits.');return}const A=KM.a;
  const t=i===1||i===2||i===7?kmLock(120):kmTarget(i===0?12:i===5?32:45);if(i===5&&!t){toast('No one to strike.');return}KM.en-=KM_COST[i];KM.cd[i]=KM_CD[i]*(KM.lb>0&&(i===0||i===1)?.7:1);if(t){P.face=Math.atan2(t.pos.x-P.pos.x,t.pos.z-P.pos.z)}
  const glow=()=>{try{KM.a.ill.K.glows.forEach(g=>g.scale.setScalar(1.4))}catch(x){}};
  if(i===0){KM.combo=(KM.combo+1)%3;const heavy=KM.combo===2;try{A.fire(['Melee_Hook','Punch_Cross','OverhandThrow'][KM.combo],heavy?.45:.34)}catch(x){}glow();
    if(t){const d=Math.hypot(t.pos.x-P.pos.x,t.pos.z-P.pos.z);if(d>2.6&&d<10)KM.lunge={t:.14,v:V3(t.pos.x-P.pos.x,0,t.pos.z-P.pos.z).normalize().multiplyScalar((d-2.2)/.14)}}
    try{sfx.blink()}catch(x){}after(heavy?.18:.12,()=>{const dir=V3(Math.sin(P.face),0,Math.cos(P.face));kmSlashFx(dir,heavy,KM.lb>0?0xd060ff:0xa070ff);
      const n=heavy?kmHitCone(5+(KM.lb>0?1.5:0),Math.PI,.009):kmHitCone(3.8+(KM.lb>0?1.5:0),1.1,.0062);if(heavy){ring(V3(P.pos.x,P.pos.y,P.pos.z),0xb070ff,.6,5.5,.3);P.shake=Math.max(P.shake,.45)}
      if(n){KM.en=Math.min(100,KM.en+(heavy?10:6));sx('clash',.5,null,{rate:rand(1,1.3)});hitStop=Math.max(hitStop,heavy?.07:.035);KM.hits=(KM.hits||0)+1;if(Math.random()<.05)x3Bark('Kaen','kf_03')}})}
  else if(i===1){const aim=kmAim(t,face0,{easy:.16,medium:.38,hard:.59}[DIFF]||.38);if(aim)P.face=Math.atan2(aim.dir.x,aim.dir.z);try{A.fire('OverhandThrow',.42)}catch(x){}glow();after(.14,()=>kmWave(aim));if(!KM.said.c||Math.random()<.15){KM.said.c=1;x3Bark('Kaen','kf_06')}}
  else if(i===2){try{A.fire('Spell_Simple_Shoot',.5)}catch(x){}let p=t?V3(t.pos.x,X3.arena?X3.C.y:t.pos.y,t.pos.z):P.pos.clone().addScaledVector(V3(Math.sin(P.face),0,Math.cos(P.face)),9);{const aim=kmAim(t,face0,.25);if(aim&&aim.miss){const r=V3(aim.dir.z,0,-aim.dir.x);p.addScaledVector(r,(Math.random()<.5?-1:1)*rand(6.5,8.5))}}kmVoidTrap(p);if(!KM.said.vt||Math.random()<.3){KM.said.vt=1;x3Bark('Kaen','kf_09')}}
  else if(i===3){try{A.fire('Spell_Simple_Shoot',.6)}catch(x){}kmGuardians();x3Bark('Kaen','kf_01')}
  else if(i===4){KM.sh=6;kmShieldFx();sx('shield',1);x3Bark('Kaen','kf_10');toast('Void Shield: blocks 85% of every hit for 6 seconds.')}
  else if(i===5){kmDash(t);if(!KM.said.ds||Math.random()<.35){KM.said.ds=1;x3Bark('Kaen','kf_11')}}
  else if(i===6){KM.lb=8;KM.fe.lb=8;P.invuln=Math.max(P.invuln,1);try{A.fire('Spell_Simple_Shoot',.7)}catch(x){}const c=P.pos.clone();flash(c,0xa050ff,30);P.shake=1.4;sx('powerup',1,null,{rate:.7});sx('impact',1);
    SP.emit(headOf(c,1),{n:260,c0:0xffffff,c1:0x7020e0,speed:16,life:1.1,s0:.8,s1:.1});ring(V3(c.x,c.y,c.z),0xc080ff,1,9,.5);for(const e of enemies)if(!e.dead&&e.pos.distanceTo(c)<8)damageEnemy(e,kmDmg(e,.035),'#e0b0ff');
    if(!KM.said.lb){KM.said.lb=1;x3Bark('Kaen','kf_08')}else if(Math.random()<.5)x3Bark('Kaen','kf_03')}}
function kmWave(aim){const dir=aim?aim.dir.clone():V3(Math.sin(P.face),0,Math.cos(P.face));const t=aim?aim.t:kmTarget(45);let dy=aim?aim.dy:0;if(!aim&&t){const dd=Math.hypot(t.pos.x-P.pos.x,t.pos.z-P.pos.z)||1;dy=(eCenter(t).y-(P.pos.y+1.2))/dd}
  const g=new THREE.Group();const mk=(r,tube,col,op)=>{const m=new THREE.Mesh(new THREE.TorusGeometry(r,tube,6,36,Math.PI),new THREE.MeshBasicMaterial({color:col,transparent:true,opacity:op,blending:THREE.AdditiveBlending,depthWrite:false,side:THREE.DoubleSide}));g.add(m);return m};
  const outer=mk(2.6,.34,0x7a30ff,.7),mid=mk(2.4,.16,0xc090ff,.95),core=mk(2.35,.06,0xffffff,1);const gl=glowSprite(0xb070ff,9,.6,false);g.add(gl);
  const p=headOf(P.pos,1.2).addScaledVector(dir,1.2);g.position.copy(p);g.rotation.set(0,Math.atan2(dir.x,dir.z),0);g.rotateZ(Math.PI/2);scene.add(g);const hit=new Set();sx('kame',.6,null,{rate:1.4});flash(p,0xa050ff,12);
  const ghosts=[];const homing=!!(t&&!(aim&&aim.miss));addFx(g,1.1,(f,k)=>{const s=46*.016;if(homing&&!t.dead){const to=eCenter(t).sub(p);const hd=Math.hypot(to.x,to.z)||1;if(hd>.8){dir.lerp(V3(to.x/hd,0,to.z/hd),.28).normalize();dy=lerp(dy,clamp(to.y/hd,-2,2),.3);g.rotation.set(0,Math.atan2(dir.x,dir.z),0);g.rotateZ(Math.PI/2)}}p.addScaledVector(dir,s);p.y+=dy*s;g.position.copy(p);g.scale.setScalar(1+k*.9);outer.material.opacity=.7*(1-k*.7);mid.material.opacity=.95*(1-k*.6);
    if(Math.random()<.6){const gh=outer.clone();gh.material=outer.material.clone();gh.position.copy(p);gh.quaternion.copy(g.quaternion);gh.scale.copy(g.scale);scene.add(gh);ghosts.push(gh);addFx(gh,.25,(ff,kk)=>{gh.material.opacity=.35*(1-kk)},()=>{scene.remove(gh);gh.material.dispose()})}
    for(let q=0;q<3;q++)SP.emit(p.clone().add(V3(rand(-2,2),rand(-2,2),rand(-2,2))),{c0:0xffffff,c1:0x8a40ff,s0:.55,s1:.05,life:.45});
    for(const e of enemies){if(e.dead||hit.has(e))continue;if(eCenter(e).distanceTo(p)<3+e.def.r){hit.add(e);damageEnemy(e,kmDmg(e,.03),'#e0c0ff');flash(p,0xa050ff,14);hitStop=Math.max(hitStop,.05);SP.emit(eCenter(e),{n:40,c0:0xffffff,c1:0xa050ff,speed:11,life:.6});KM.en=Math.min(100,KM.en+4)}}},
    ()=>{scene.remove(g);g.traverse(o=>{if(o.geometry)o.geometry.dispose()})})}
function kmVoidTrap(p){const r=4.6;const g=new THREE.Group();g.position.set(p.x,p.y+.08,p.z);const d1=decal(runeTex,0x9a40ff,r*2.2,true,.9);g.add(d1);const d2=decal(scorchTex,0x30104a,r*2.4,false,.7);d2.position.y=-.02;g.add(d2);
  const wall=new THREE.Mesh(new THREE.CylinderGeometry(r,r,2.2,40,1,true),new THREE.MeshBasicMaterial({color:0x8a40ff,transparent:true,opacity:.25,blending:THREE.AdditiveBlending,depthWrite:false,side:THREE.DoubleSide}));wall.position.y=1.1;g.add(wall);scene.add(g);
  flash(p,0x9a40ff,16);sx('portal',.7,null,{rate:1.3});P.shake=Math.max(P.shake,.3);let tick=0;
  addFx(g,5,(f,k)=>{d1.rotation.z+=.04;wall.material.opacity=(.22+Math.sin(f.t*9)*.06)*(1-Math.max(0,k-.85)/.15);tick-=.016;
    if(Math.random()<.8)SP.emit(V3(p.x+rand(-r,r)*.8,p.y+rand(0,1.4),p.z+rand(-r,r)*.8),{c0:0xb0ff90,c1:0x5a10a0,s0:.45,s1:.05,life:.8,up:2});
    if(Math.random()<.35)SM.emit(V3(p.x+rand(-r,r)*.7,p.y+.4,p.z+rand(-r,r)*.7),{c0:0x406a20,c1:0x1a0630,s0:1.2,s1:2.6,life:1,a:.45,up:1});
    if(tick<=0){tick=.25;for(const e of enemies){if(e.dead)continue;if(Math.hypot(e.pos.x-p.x,e.pos.z-p.z)<r+e.def.r&&Math.abs(e.pos.y-p.y)<6){e.rooted=Math.max(e.rooted||0,.4);e.vtrap=.4;damageEnemy(e,kmDmg(e,.0028),'#9aff70',true)}}}},
    ()=>{scene.remove(g);g.traverse(o=>{if(o.geometry)o.geometry.dispose()})})}
function kmShieldFx(){if(KM.shM){KM.shM.visible=true;return}const m=new THREE.Mesh(new THREE.IcosahedronGeometry(1.7,2),new THREE.MeshBasicMaterial({color:0xa070ff,wireframe:true,transparent:true,opacity:.5,blending:THREE.AdditiveBlending,depthWrite:false}));
  const s=new THREE.Mesh(new THREE.SphereGeometry(1.62,24,16),new THREE.MeshBasicMaterial({color:0x6a30d0,transparent:true,opacity:.14,blending:THREE.AdditiveBlending,depthWrite:false,side:THREE.DoubleSide}));m.add(s);m.position.y=1.15;KM.shM=m;KM.a.g.add(m)}
function kmDash(t){const from=P.pos.clone();const tp=V3(t.pos.x,P.pos.y,t.pos.z);const dir=V3(tp.x-from.x,0,tp.z-from.z);const d=dir.length()||1;dir.normalize();const to=tp.clone().addScaledVector(dir,-(1.6+t.def.r));
  P.invuln=Math.max(P.invuln,.8);KM.dash={t:0,dur:.16,from,to,tgt:t,dir};try{KM.a.once('Sprint_Loop',.2)}catch(x){}try{sfx.blink()}catch(x){}flash(from,0xa050ff,10)}
function kmDashTick(dt){const D=KM.dash;if(!D)return;D.t+=dt;const k=Math.min(1,D.t/D.dur);P.pos.lerpVectors(D.from,D.to,k);P.face=Math.atan2(D.dir.x,D.dir.z);
  for(let q=0;q<4;q++){const p=V3().lerpVectors(D.from,P.pos,Math.random());SP.emit(V3(p.x,p.y+rand(.4,1.8),p.z),{c0:0xe8d8ff,c1:0x5a2ad0,s0:.6,s1:.06,speed:1,life:.4})}
  if(k>=1&&!D.hit){D.hit=1;try{KM.a.fire('Melee_Hook',.3)}catch(x){}kmSlashFx(D.dir,true,0xd070ff);const e=D.tgt;if(e&&!e.dead){damageEnemy(e,kmDmg(e,.02),'#ffd0ff');hitStop=.09;P.shake=.9;flash(eCenter(e),0xffffff,18);SP.emit(eCenter(e),{n:60,c0:0xffffff,c1:0xb070ff,speed:12,life:.6})}KM.en=Math.min(100,KM.en+8);
    after(.22,()=>{const back=P.pos.clone().addScaledVector(D.dir,-6.5);if(X3.arena){const C=X3.C,dx=back.x-C.x,dz=back.z-C.z,dd=Math.hypot(dx,dz);if(dd>X3.R-2){back.x=C.x+dx/dd*(X3.R-2);back.z=C.z+dz/dd*(X3.R-2)}}
      SM.emit(headOf(P.pos,1),{n:24,c0:0x50307a,c1:0x05030a,s0:1.5,s1:3.5,life:.8,a:.6,up:1});P.pos.x=back.x;P.pos.z=back.z;SM.emit(headOf(P.pos,1),{n:24,c0:0x50307a,c1:0x05030a,s0:1.5,s1:3.5,life:.8,a:.6,up:1});try{sfx.blink()}catch(x){}KM.dash=null})}}
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
{const _dp=damagePlayer;damagePlayer=function(a){if(KM.on){a*=.8;if(KM.sh>0){a*=.15;if(KM.shM)KM.shM.scale.setScalar(1.15)}}if(X3.phase&&P.alive&&P.invuln<=0&&!CS.active&&P.hp<=a*1.35+1){P.hp=maxHP()*.45;P.invuln=2.5;flash(P.pos,0xffffff,20);P.shake=1.2;
    const e=X3.e;if(e&&!e.dead)e.hp=Math.min(e.maxhp,e.hp+e.maxhp*.06);if(KM.on){x3Bark('Kaen','kf_05');after(2.5,()=>x3Bark('@','m7_11'))}toast(KM.on?'Kaen will not fall here. Vesper drinks a little of the fight back.':'Not here, not like this. Vesper drinks a little of the fight back.','Second wind');return}return _dp.call(this,a)}}
{const _mt=muTick;muTick=function(dt){_mt(dt);if(X3.arena)X3.arena.tick(dt);
  if(X3.phase&&started&&!CS.active&&MODE!=='open'){const C=X3.C,dx=P.pos.x-C.x,dz=P.pos.z-C.z,d=Math.hypot(dx,dz);if(d>X3.R-.6){P.pos.x=C.x+dx/d*(X3.R-.6);P.pos.z=C.z+dz/d*(X3.R-.6)}if(P.pos.y<C.y-.5){P.pos.y=C.y;P.vy=0}if(P.pos.y>C.y+24){P.pos.y=C.y+24;P.vy=Math.min(P.vy||0,0)}}
  if(!KM.on||!KM.a)return;const A=KM.a;
  if(X3.mPos){W.g.position.copy(X3.mPos);W.g.visible=true;if(W.broom)W.broom.visible=false;W.g.rotation.y=Math.atan2(P.pos.x-X3.mPos.x,P.pos.z-X3.mPos.z)}
  A.g.visible=true;if(CS.active){A.update(dt);return}
  kmDashTick(dt);if(KM.lunge){const L=KM.lunge;const s=Math.min(L.t,dt);P.pos.addScaledVector(L.v,s);L.t-=dt;if(L.t<=0)KM.lunge=null}
  A.g.position.copy(P.pos);A.g.rotation.y=lerpAngle(A.g.rotation.y,P.face,Math.min(1,dt*12));
  const air=P.flying||!P.onGround;const mv=P.moveAmt||0;const base=air?(P.flying?'NinjaJump_Idle_Loop':'Jump_Loop'):mv>.75?'Sprint_Loop':mv>.12?'Jog_Fwd_Loop':KM.lb>0?'Spell_Simple_Idle_Loop':'Idle_Loop';
  try{A.setBase(base,.2,base==='Jog_Fwd_Loop'?.9+mv*.4:1)}catch(x){}A.update(dt);KM.fe.t+=dt;if(KM.lb>0){KM.lb-=dt;KM.fe.lb=Math.max(0,KM.lb)}else KM.fe.lb=0;try{kaenFx(KM.fe,dt)}catch(x){}
  if(P.flying&&Math.random()<.7)SP.emit(V3(P.pos.x+rand(-.3,.3),P.pos.y+rand(0,.4),P.pos.z+rand(-.3,.3)),{c0:0xe0c8ff,c1:0x5010c0,s0:.4,s1:.04,life:.6,speed:1});
  for(let i=0;i<KM.cd.length;i++)KM.cd[i]=Math.max(0,KM.cd[i]-dt);if(KM.sh>0){KM.sh-=dt;if(KM.shM){KM.shM.visible=KM.sh>0;KM.shM.rotation.y+=dt*1.5;KM.shM.scale.lerp(V3(1,1,1),Math.min(1,dt*6));KM.shM.children[0].material.opacity=.12+(KM.sh<1.2?Math.sin(time*20)*.06:0)}}kmCallouts(dt);KM.en=Math.min(100,KM.en+dt*(KM.lb>0?9:5));kmGuardTick(dt);
  if(KM.hud){KM.hud.querySelector('.en i').style.transform=`scaleX(${KM.en/100})`;KM.hud.querySelectorAll('button').forEach((b,i)=>{b.querySelector('s').style.height=(KM.cd[i]/KM_CD[i]*100)+'%';b.querySelector('u').textContent=KM.cd[i]>1.5?Math.ceil(KM.cd[i]):'';b.classList.toggle('lo',KM.en<KM_COST[i]);b.classList.toggle('lb',i===3&&KM.lb>0)})}}}
function kmEnd(){if(!KM.on)return;KM.on=0;if(KM.shM){if(KM.shM.parent)KM.shM.parent.remove(KM.shM);KM.shM=null}KM.sh=0;KM.dash=null;kmClearGuards();kmHud(false);const a=KM.a;KM.a=null;if(a){KFW.a=a;KFW.off=0;KFW.mode='';KFW.an='';KFW.kp=null;KFW.gm=new THREE.MeshBasicMaterial()}}

/* ---------- the chapter flow ---------- */
function x3Intro(){if(CS.active)return;X3.said={};const sp=V3(36,46.2,-9894);const e=spawnEnemy('vesper',V3(sp.x,0,sp.z));e.pos.copy(sp);e.invuln=true;e.lvl=P.level;e.aggro=true;e.ai.ph=null;X3.e=e;bossRef=null;$('boss').classList.add('hidden');
  const look=()=>headOf(e.pos,3.6);
  playCutscene([{dur:4.4,fov:46,title:['Chapter XIII',"The Crown's Shadow"],cam:k=>({pos:V3(36+Math.sin(k*1.2)*40,30+k*10,-9894+Math.cos(k*1.2)*40),look:V3(36,40,-9894)}),onStart:()=>{sx('garg',.7,null,{rate:.5})},update:()=>{SM.emit(V3(36+rand(-14,14),rand(30,46),-9894+rand(-14,14)),{c0:0x2a1840,c1:0x05030a,s0:3,s1:7,life:2,a:.5,up:1})}},
    {who:'Vesper',text:XL3.vp_01,fov:38,cam:k=>({pos:headOf(e.pos,3.4).add(V3(-5.5+k*.8,-.8,6.5)),look:look()}),onStart:()=>{flash(e.pos,0x8040ff,20)}},
    {who:'@',text:XL3.m6_03,cam:witchShot(1,3.4)},
    {who:'Vesper',text:XL3.vp_02,fov:34,cam:()=>({pos:headOf(e.pos,3.7).add(V3(3.2,0,3.8)),look:look()}),onStart:()=>{try{e.m.actor.fire('Spell_Simple_Shoot',.8)}catch(x){}}},
    {who:'Kaen',text:XL3.k6_02,cut:true,cam:kS3(1.3,1.6)},
    {who:'@',text:XL3.m6_04,cam:witchShot(-1,3.2)},
    {who:'Vesper',text:XL3.vp_03,fov:40,cam:k=>({pos:headOf(e.pos,3.4).add(V3(-4.5,.5+k,5)),look:look()}),onStart:()=>{e.ai.cast=4}},
    {dur:1.4,fov:70,cam:k=>({pos:headOf(P.pos,2+k*6).add(V3(3,0,3)),look:headOf(P.pos,1)}),onStart:()=>{x3KFx();for(let k=0;k<30;k++)SM.emit(V3(P.pos.x+rand(-4,4),P.pos.y+rand(0,4),P.pos.z+rand(-4,4)),{c0:0x2a1840,c1:0x020104,s0:2,s1:6,life:1.4,a:.8,up:2});sx('portal',1,null,{rate:.6})}}],
    x3Arena)}
function x3Arena(){x3Build();if(LYR.a)LYR.a.g.visible=false;if(LYF.g)LYF.g.g.visible=false;const C=X3.C;const e=X3.e;P.pos.set(C.x,C.y,C.z+20);P.vy=0;P.flying=false;P.face=Math.PI;yaw=0;camera.position.set(C.x,C.y+5,C.z+31);P.invuln=2;
  if(KFW.a){KFW.a.g.position.set(C.x+2,C.y,C.z+22)}if(e){e.pos.set(C.x,C.y+.4,C.z-6);e.invuln=false;e.hpFloor=.5;e.ai.ph='A';e.ai.b=3;e.ai.g=6;e.ai.s=11;bossRef=e;$('boss').classList.remove('hidden');
    $('bossName').innerHTML=`${e.def.name} <span style="color:#ff4050">· Lv ${e.lvl}</span>`}
  X3.phase=1;CH2.st=Math.max(CH2.st,12);after(1.2,()=>epSay('Kaen',XL3.k6_03,1));after(.5,()=>toast('The Shadow Court, above St Paul\'s. There is no way down but through him.','Vesper',true))}
{const _bo=bossOutro;bossOutro=function(type,c){if(type==='vesper')return x3End(c);return _bo.apply(this,arguments)}}
function x3End(c){X3.phase=0;const e=X3.e;const lp=()=>LYR.a?LYR.a.g.position:X3.lPos||P.pos;
  playCutscene([{who:'Vesper',text:XL3.vp_11,fov:44,cam:k=>({pos:V3(c.x+Math.sin(k)*7,c.y+2,c.z+Math.cos(k)*7),look:c}),update:()=>SM.emit(V3(c.x+rand(-1.5,1.5),c.y+rand(-1,2),c.z+rand(-1.5,1.5)),{c0:0x3a2060,c1:0x05030a,s0:1.5,s1:4,life:1.4,a:.6,up:3})},
    {dur:2.2,fov:54,cam:k=>{const m=X3.mPos||P.pos;return{pos:V3(m.x+8,m.y+4+k*2,m.z+8),look:headOf(m,1)}},onStart:()=>{x3Shatter();P.heroAnim='Idle_Loop';try{LYR.a.setBase('Idle_Loop',.3)}catch(x){}flash(X3.mPos||P.pos,0xffffff,30);P.shake=1}},
    {who:'Kaen',text:XL3.k6_07,fov:38,cam:x3S(kpos,1.2,2.6,1.6)},
    {who:'@',text:XL3.m6_08,fov:40,cam:witchShot(1,3.2),onStart:()=>{x3SwapBack();x3KFx();x3Canvas('x3pi',750)}},
    {who:'Kaen',text:XL3.k6_08,cut:true,fov:36,cam:x3S(kpos,-1.1,2.4,1.6)},
    {who:'Lyra',text:XL3.ly46,cut:true,fov:40,cam:x3S(lp,1.1,2.8)},
    {who:'Kaen',text:XL3.k6_09,cut:true,fov:38,cam:x3S(kpos,1.2,2.6,1.6)}],x3Finish)}
function x3SwapBack(){const kp=P.pos.clone();kmEnd();P.heroAnim=null;if(X3.mPos)P.pos.copy(X3.mPos);if(KFW.a){KFW.a.g.position.copy(kp);KFW.a.g.rotation.y=Math.atan2(P.pos.x-kp.x,P.pos.z-kp.z)}P.face=Math.atan2(kp.x-P.pos.x,kp.z-P.pos.z);yaw=P.face+Math.PI;P.hp=maxHP()}
function x3Finish(){kmEnd();x3Shatter();x3Drop();X3.phase=0;X3.trap=null;x3StrugUI(false);P.heroAnim=null;const g=V3(36,0,-9866);P.pos.set(g.x,groundAt(g.x,g.z),g.z);P.vy=0;P.flying=false;P.face=Math.PI;yaw=0;camera.position.set(g.x,P.pos.y+5,g.z+11);
  if(KFW.a)KFW.a.g.position.set(g.x+1.4,P.pos.y,g.z+1.4);lyraPlace(g.x-1.6,g.z+1.6,Math.PI);LYR.home=false;X3.mPos=null;
  CH2.st=Math.max(CH2.st,13);ch2Save();beaten.add('vesper');writeSave();$('boss').classList.add('hidden');bossRef=null;
  toast('Kaen has his sword and his guardians back. Lyra gave everything she had, so for now she travels with you.','Chapter XIII complete',true)}

/* ---------- Kaen flies beside you, Lyra rides a guardian ---------- */
const LYF={g:null,an:''};
{const _mt=muTick;muTick=function(dt){_mt(dt);if(!started||MODE==='open'||CH2.st<11||KM.on)return;
  if(LYR.mk)LYR.mk.visible=!!LYR.home;if(CH2.zone!=='north'||CH2.st<13&&(CH2.st<11||X3.phase||X3.trap||KM.on||X3.e)){if(LYF.g)LYF.g.g.visible=false;return}if(!LYR.a){lyraPlace(P.pos.x-2,P.pos.z+2,P.face);LYR.home=false}const L=LYR.a;if(!L||CS.active||LYR.pin)return;L.g.visible=true;
  const f=V3(Math.sin(P.face),0,Math.cos(P.face)),r=V3(f.z,0,-f.x);
  if(P.flying&&(CH2.st<13||CH2.st>=15)){if(LYF.g)LYF.g.g.visible=false;const tg=P.pos.clone().addScaledVector(r,-2.6).addScaledVector(f,-1.2);tg.y=P.pos.y+.2+Math.sin(time*1.7)*.2;L.g.position.lerp(tg,Math.min(1,dt*5));L.g.rotation.y=lerpAngle(L.g.rotation.y,P.face,Math.min(1,dt*5));
    if(LYF.an!=='fly'){LYF.an='fly';try{L.setBase('NinjaJump_Idle_Loop',.3)}catch(x){}}if(Math.random()<.6)SP.emit(V3(L.g.position.x,L.g.position.y+.3,L.g.position.z),{c0:0xffd0d0,c1:0xff3040,s0:.35,s1:.04,life:.5,speed:1})}
  else if(P.flying){if(!LYF.g){const m=buildGuardian();m.g.scale.setScalar(.26);scene.add(m.g);LYF.g=m;LYF.t=0}const m=LYF.g;m.g.visible=true;LYF.t+=dt;
    const tg=P.pos.clone().addScaledVector(r,-2.8).addScaledVector(f,-1.4);tg.y=P.pos.y-1.6+Math.sin(time*1.5)*.25;m.g.position.lerp(tg,Math.min(1,dt*4.5));m.g.rotation.y=lerpAngle(m.g.rotation.y,P.face,Math.min(1,dt*5));try{guardAnim({m,t:LYF.t,ai:{slam:0},pos:m.g.position},dt,0,0)}catch(x){}
    L.g.position.copy(m.g.position).add(V3(0,2.55,0));L.g.rotation.y=m.g.rotation.y;if(LYF.an!=='sit'){LYF.an='sit';try{L.setBase('Sitting_Idle_Loop',.3)}catch(x){}}}
  else{if(LYF.g)LYF.g.g.visible=false;const tg=P.pos.clone().addScaledVector(r,1.7).addScaledVector(f,-1.6);{const ka=KFW.a&&KFW.a.g.visible?KFW.a.g.position:null;if(ka){const dx=tg.x-ka.x,dz=tg.z-ka.z,dk=Math.hypot(dx,dz);if(dk<1.3){const k=(1.3-dk)/(dk||1);tg.x+=dx*k+(dk?0:r.x*1.3);tg.z+=dz*k+(dk?0:r.z*1.3)}}const dl=Math.hypot(L.g.position.x-P.pos.x,L.g.position.z-P.pos.z);if(dl<1.1){L.g.position.x+=(L.g.position.x-P.pos.x)/(dl||1)*(1.1-dl);L.g.position.z+=(L.g.position.z-P.pos.z)/(dl||1)*(1.1-dl)}}tg.y=groundAt(tg.x,tg.z);const dd=Math.hypot(tg.x-L.g.position.x,tg.z-L.g.position.z);
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
{const _ac=applyChapter;applyChapter=function(id){x3Reset();if(id!=='shadow'){const r=_ac.apply(this,arguments);if(id==='silver')after(.45,()=>toast('Fly back across the Channel and up the river to London.','Chapter XII: Ash and Silver',true));if(id!=='silver'){XII.solid=0;XII.lazy=0;XII.rv=[0,0,0,0,0,0];XII.wd=0;XII.said={};xiiSave()}if(KFW.a){scene.remove(KFW.a.g);KFW.a=null;KFW.kp=null;KFW.mode='';KFW.an=''}KFW.gear=0;return r}_ac.call(this,'escape');CH2.st=12;ch2Save();XII.lazy=1;XII.rv=[1,1,1,1,1,1];XII.solid=1;XII.wd=1;XII.said={fk:1,lon:1};xiiSave();KFW.gear=0;
  if(KFW.a){scene.remove(KFW.a.g);KFW.a=null}WD.esc=1;if(WD.e&&!WD.e.dead){WD.e.dead=true;WD.e.m.g.visible=false}WD.e=null;nzEnter('london');CH2.obj=nzObj;after(.45,()=>toast("Shadows are crawling over the dome of St Paul's.","Chapter XIII: The Crown's Shadow",true))}}
{const _rc=renderChapters;renderChapters=function(){_rc();const list=$('chapList');const el=list&&list.children[chapIndexOf('shadow')];if(el){const done=CH2.st>=13,cur=started&&CH2.st>=11&&CH2.st<13;el.className='chap'+(done?' done':'')+(cur?' cur':'')}}}

/* ---------- more voices: crossing talk, the heart, Kaen's new moves, Maëlle from the cage ---------- */
Object.assign(XL3,{k7_01:"Hey, I'm a very well behaved ghost. I haven't touched a single thing.",k7_02:"The water's calmer than last time. Either the curse is sleeping, or it's waiting for us.",k7_03:'Hug my sister. Then probably apologise to half of Paris. In that order.',
  k7_04:"See that light on the horizon? That's Folkestone. We're more than halfway.",k7_05:'Careful now. This is where the cursed water starts. Keep the gem close and stay low.',
  k7_06:"Maëlle! You need to destroy the heart of the Tower first! Grab your broom, get up there and smash it, or he'll keep regenerating!",k7_07:'The heart! Go for the heart, up on the Tower!',k7_08:"That's it, the heart's gone! Now he bleeds!",
  kf_09:'Nowhere to run.',kf_10:'Not today.',kf_11:'Too slow!',
  m7_01:'Here we go again. Same sea, same broom, same ghost on the back seat.',m7_02:'Thanks, Kaen. Very reassuring.',m7_03:"Can I ask you something? What's the first thing you'll do when you get your body back?",m7_04:'Good, because my arms are starting to go numb.',m7_05:'Low and close. Got it.',
  m7_06:'Kaen, watch his claws!',m7_07:"Behind you! He's behind you!",m7_08:"That's it! Hit him again!",m7_09:'Kaen, use the guardians!',m7_10:"He's bleeding shadow! Keep going!",m7_11:'Get up, Kaen! Please, get up!',m7_12:'Yes! Go on, finish him!'});
for(const k of['k7_01','k7_02','k7_03','k7_04','k7_05','k7_06','k7_07','k7_08','kf_09','kf_10','kf_11','m7_01','m7_02','m7_03','m7_04','m7_05','m7_06','m7_07','m7_08','m7_09','m7_10','m7_11','m7_12'])VO_MAP[XL3[k]]=k;
/* one voice for Kaen: every line is the legacy voice now, no pitch shifting */
for(const k of[...VO_SPIRIT])if(/^(k2_|k3_|kx|kz_)/.test(k))VO_SPIRIT.delete(k);
/* the crossing: Kaen and Maëlle talk over the water */
const XCR=[{z:-2205,l:[['@','m7_01'],['k','k7_01']]},{z:-2620,l:[['k','k7_02'],['@','m7_02']]},{z:-3250,l:[['@','m7_03'],['k','k7_03']]},{z:-3980,l:[['k','k7_04'],['@','m7_04']]},{z:CURSE_Z+520,l:[['k','k7_05'],['@','m7_05']]}];
{const _mt=muTick;muTick=function(dt){_mt(dt);if(!started||MODE==='open'||CS.active||CH2.zone!=='north'||CH2.st!==8||!P.alive||CH2.chase)return;const z=P.pos.z;if(z>CAL_SHORE||z<CLIFF_Z)return;
  for(let i=0;i<XCR.length;i++){const c=XCR[i];const key='cr'+i;if(XII.said[key]||z>c.z)continue;XII.said[key]=1;BAN.t=Math.max(BAN.t,30);for(const [w,k] of c.l)epSay(w==='k'?(XII.solid?'Kaen':"Kaen's Spirit"):'@',XL3[k]);break}}}
/* Maëlle shouts from her cage while Kaen fights */
function kmCallouts(dt){KM.mt=(KM.mt==null?8:KM.mt)-dt;if(KM.mt>0)return;const e=X3.e;if(!e||e.dead||X3.phase!==2){KM.mt=3;return}const pct=e.hp/e.maxhp;let k=null;
  if(pct<.15&&!KM.said.m7_12)k='m7_12';else if(pct<.5&&!KM.said.m7_10)k='m7_10';else if(!KM.said.m7_06)k='m7_06';else if(KM.cd[3]<=0&&KM.en>=40&&!KM.said.m7_09)k='m7_09';else if((KM.hits||0)>10&&!KM.said.m7_08)k='m7_08';
  if(k&&!SAYQ.on&&!SAYQ.q.length){KM.said[k]=1;x3Bark('@',k);KM.mt=rand(10,15)}else KM.mt=3}
/* in-game subtitles: every queued line uses the same little subtitle as the barks */
sayLine=function(who,text,dur){const el=bkEl();const nm=who==='@'?(HERO.name||'Maëlle'):who;el.innerHTML='<b></b><i></i>';el.firstChild.textContent=nm;el.firstChild.style.color=SPEAKER[who]||(who==='@'?'#f2d27a':'#ffb0b0');el.lastChild.textContent=text;void el.offsetWidth;el.classList.add('on');
  BKS.hideT=time+dur+.6;BKS.busy=time+dur+.3;BKS.pri=5;try{bkStop(.05)}catch(x){}};

/* Lyra pours her magic into Kaen: rising, spiralling ribbons, runes under both, a final bloom */
function x3Transfer(lp,kp,dur){const lpos=()=>lp(),kpos2=()=>kp();runeFlash(lpos(),0xff5070,7,dur);runeFlash(kpos2(),0xb070ff,7,dur);
  const beam=new THREE.Mesh(new THREE.CylinderGeometry(.22,.22,1,14,1,true),new THREE.MeshBasicMaterial({color:0xff6090,transparent:true,opacity:.0,blending:THREE.AdditiveBlending,depthWrite:false}));
  const core=new THREE.Mesh(new THREE.CylinderGeometry(.07,.07,1,8,1,true),new THREE.MeshBasicMaterial({color:0xffffff,transparent:true,opacity:0,blending:THREE.AdditiveBlending,depthWrite:false}));scene.add(beam);scene.add(core);
  const la=glowSprite(0xff5080,3,.0,false),ka=glowSprite(0xb070ff,3,.0,false);scene.add(la);scene.add(ka);const ly0=LYR.a?LYR.a.g.position.y:0;let ph=0;
  addFx(null,dur,(f,k)=>{const A=headOf(lpos(),1.35),B=headOf(kpos2(),1.15);const up=Math.min(1,k*3);if(LYR.a)LYR.a.g.position.y=ly0+Math.sin(Math.min(1,k*2.5)*Math.PI*.5)*.7*(1-Math.max(0,k-.9)*10);
    const pulse=.7+Math.sin(f.t*14)*.3;for(const [m,w] of [[beam,1],[core,1]]){m.position.copy(A).lerp(B,.5);m.scale.set(w*pulse*(.6+k*.8),A.distanceTo(B),w*pulse*(.6+k*.8));m.lookAt(B);m.rotateX(Math.PI/2)}
    beam.material.opacity=.55*up*(1-Math.max(0,k-.92)/.08);core.material.opacity=.9*up*(1-Math.max(0,k-.92)/.08);la.position.copy(A);ka.position.copy(B);la.scale.setScalar(3+k*5);ka.scale.setScalar(2+k*9);la.material.opacity=.6*up;ka.material.opacity=.7*up;
    ph+=.016*9;const n=3;for(let q=0;q<n;q++){const u=((f.t*.9+q/n)%1);const p=A.clone().lerp(B,u);const d=B.clone().sub(A).normalize();const r1=V3(d.z,0,-d.x).normalize(),r2=V3().crossVectors(d,r1);const rad=.9*Math.sin(u*Math.PI);const a=ph*1.3+q*TAU/n+u*8;
      p.addScaledVector(r1,Math.cos(a)*rad).addScaledVector(r2,Math.sin(a)*rad);SP.emit(p,{c0:q%2?0xffffff:0xffd0e0,c1:q%2?0xb070ff:0xff3070,s0:.5,s1:.06,life:.55})}
    if(Math.random()<.5)SP.emit(A.clone().add(V3(rand(-1,1),rand(-1,1),rand(-1,1))),{c0:0xffffff,c1:0xff4070,s0:.4,s1:.04,life:.5,speed:-3});
    if(Math.random()<.4)SM.emit(V3(B.x+rand(-1.5,1.5),B.y-1,B.z+rand(-1.5,1.5)),{c0:0x8a50ff,c1:0x200840,s0:1.5,s1:3,life:.9,a:.4,up:2})},
    ()=>{const B=headOf(kpos2(),1.15);flash(B,0xffffff,40);SP.emit(B,{n:320,c0:0xffffff,c1:0xc070ff,speed:15,life:1.3,s0:.8,s1:.08});ring(V3(B.x,B.y-1.1,B.z),0xd090ff,1,14,.6);P.shake=1.2;sx('impact',1,null,{rate:.7});
      for(const o of[beam,core,la,ka]){scene.remove(o);if(o.geometry)o.geometry.dispose()}if(LYR.a)LYR.a.g.position.y=ly0})}

/* ---------- the Tower's questions: a fair middle ground, scaled by difficulty ---------- */
const TQX={easy:[['How many ravens must be kept at the Tower, or the kingdom falls?',['Six','Three','Nine','Twelve']],['Which river runs past the Tower of London?',['The Thames','The Severn','The Mersey','The Trent']],
    ['What is kept in the Jewel House?',['The Crown Jewels','The Magna Carta','The Rosetta Stone','The Domesday Book']],['What is the nickname of the Tower\'s Yeoman Warders?',['Beefeaters','Redcoats','Bobbies','Grenadiers']],
    ['Which bridge stands right beside the Tower?',['Tower Bridge','Westminster Bridge','Waterloo Bridge','Vauxhall Bridge']],['What is the great stone keep at the heart of the Tower called?',['The White Tower','The Bloody Tower','The Black Keep','The Raven Tower']]],
  med:[['Which king began building the White Tower?',['William the Conqueror','Henry VIII','Edward I','Richard the Lionheart']],['Which queen was beheaded at the Tower in 1536?',['Anne Boleyn','Catherine of Aragon','Elizabeth I','Mary, Queen of Scots']],
    ['Through which gate were prisoners brought in from the river?',['Traitors\' Gate','The Lion Gate','The King\'s Gate','The Raven Gate']],['In which year did William the Conqueror invade England?',['1066','1215','966','1415']],
    ['Which two boys vanished in the Tower in 1483?',['The Princes in the Tower','The Tudor Twins','The Sons of York','The Boy Kings of Wessex']],['What does the Hollow Crown feed on?',['Fear','Grief','Gold','Blood']],
    ['Which famous exotic animals were once kept at the Tower?',['Lions','Penguins','Kangaroos','Giraffes']]],
  hard:[['Which diamond sits at the front of the Imperial State Crown?',['Cullinan II','The Koh-i-Noor','The Hope Diamond','The Regent']],['Who tried to steal the Crown Jewels in 1671?',['Colonel Thomas Blood','Guy Fawkes','Dick Turpin','Walter Raleigh']],
    ['What is the nightly ceremony that locks the Tower called?',['The Ceremony of the Keys','Beating Retreat','The Changing of the Guard','The Royal Vigil']],['Who spent thirteen years in the Bloody Tower writing a history of the world?',['Sir Walter Raleigh','Thomas More','Rudolf Hess','Thomas Cromwell']],
    ['Which "nine-day queen" was executed at the Tower in 1554?',['Lady Jane Grey','Catherine Howard','Anne of Cleves','Matilda']],['The White Tower was faced with stone shipped from which French town?',['Caen','Calais','Rouen','Bordeaux']],
    ['Who was the last person executed at the Tower, in 1941?',['Josef Jakobs','Rudolf Hess','William Joyce','Roger Casement']]]};
const tqPick=(a,n)=>a.slice().sort(()=>Math.random()-.5).slice(0,n);
epQuiz=function(){if(NZQ.quiz)return;if(typeof TUT!=='undefined'&&TUT.on)try{tutEnd(true)}catch(x){}const d=DIFF;
  const pool=d==='easy'?tqPick(TQX.easy,3):d==='hard'?[...tqPick(TQX.med,2),...tqPick(TQX.hard,3)]:[...tqPick(TQX.easy,1),...tqPick(TQX.med,2),...tqPick(TQX.hard,1)];
  NZQ.quiz={i:0,pool};P.invuln=99;for(const e of enemies)if(!e.dead)removeEnemy(e);epAsk()};

/* ---------- every boss has a theme: the standard map, with the generic track only as a fallback ---------- */
Object.assign(BTH,{kitsune:'mus_b_fox',warden:'mus_b_warden',vesper:'mus_b_vesper',greyfang:'mus_greyfang'});
Object.assign(MU.gain,{mus_b_fox:1.8,mus_b_warden:1.8,mus_b_vesper:1.8});if(MU.keys)MU.keys.push('mus_b_fox','mus_b_warden','mus_b_vesper');
{let pt=2;const _mt=muTick;muTick=function(dt){_mt(dt);pt-=dt;if(pt>0||!started||MODE==='open')return;pt=8;try{if(!beaten.has('kitsune'))bmTrack('mus_b_fox');const st=CH2.st;if(CH2.zone==='north'&&(st===7||(st>=9&&st<=10)))bmTrack('mus_b_warden');if(CH2.zone==='north'&&st>=11&&st<13)bmTrack('mus_b_vesper')}catch(x){}}}

/* ---------- wrong way, quietly: the screen edges warm up for a moment and a small arrow nudges you round ---------- */
const WW={el:null,on:0,last:null,acc:0,cool:0,roll:null};
function wwEl(){if(WW.el)return WW.el;const st=document.createElement('style');st.textContent='#wwEdge{position:fixed;inset:0;pointer-events:none;z-index:33;opacity:0;transition:opacity .9s ease;background:radial-gradient(ellipse at 50% 50%,rgba(0,0,0,0) 58%,rgba(70,30,10,.38) 85%,rgba(150,70,20,.5) 100%)}#wwEdge.on{opacity:1}#wwEdge.soft{opacity:.45}#wwArr{position:fixed;left:50%;top:64px;width:34px;height:34px;margin-left:-17px;pointer-events:none;z-index:34;opacity:0;transition:opacity .5s ease}#wwArr.on{opacity:.9}#wwArr svg{width:100%;height:100%;filter:drop-shadow(0 0 6px rgba(255,170,80,.75));transition:transform .15s linear}#wwArr i{position:absolute;left:50%;top:38px;transform:translateX(-50%);white-space:nowrap;font:italic 500 13px Fraunces,Georgia,serif;color:#f6dcae;text-shadow:0 1px 6px rgba(0,0,0,.8);opacity:.85}';document.head.appendChild(st);
  const e=document.createElement('div');e.id='wwEdge';document.body.appendChild(e);const a=document.createElement('div');a.id='wwArr';a.innerHTML='<svg viewBox="0 0 34 34"><path d="M17 4 L27 20 L19.5 17.5 L19.5 29 L14.5 29 L14.5 17.5 L7 20 Z" fill="#ffd9a0"/></svg><i></i>';document.body.appendChild(a);WW.el={e,a};return WW.el}
function wwTarget(){if(MODE==='open'||!started||CH2.zone!=='north'||CS.active||(bossRef&&!CH2.chase))return null;const st=CH2.st,z=P.pos.z;
  const south=st===7||(CH2.chase&&st<8);if(south)return z<CAL_SHORE-10?{p:V3(34,0,-2146),n:'Calais'}:null;
  if(st===2||st===3||st===8){if(z>CAL_SHORE+40)return null;if(z>CLIFF_Z+30)return{p:V3(0,0,CLIFF_Z),n:'England'};if(z>LON_Z)return{p:V3(nzRiverX(Math.max(LON_Z,z-300)),0,Math.max(LON_Z,z-300)),n:'London'}}return null}
{const _mt=muTick;muTick=function(dt){_mt(dt);WW.cool=Math.max(0,WW.cool-dt);const T=wwTarget();const hide=()=>{if(WW.on){const E=wwEl();E.e.classList.remove('on','soft');E.a.classList.remove('on');WW.on=0;WW.cool=25}};
  if(!T){hide();WW.last=null;WW.acc=0;WW.roll=null;return}const p=P.pos;if(!WW.last){WW.last=p.clone();return}const mv=V3(p.x-WW.last.x,0,p.z-WW.last.z);WW.last.copy(p);const sp=mv.length()/Math.max(dt,1e-3);
  const to=V3(T.p.x-p.x,0,T.p.z-p.z).normalize();const cosA=sp>2?mv.normalize().dot(to):1;const wrong=cosA<Math.cos(50*Math.PI/180);
  if(wrong)WW.acc+=dt;else WW.acc=Math.max(0,WW.acc-dt*3);
  if(!WW.on){if(WW.acc>3.5&&!WW.cool){if(WW.roll==null)WW.roll=Math.random()<.5;if(WW.roll){const E=wwEl();E.e.classList.add('on');E.a.classList.add('on');E.a.querySelector('i').textContent=T.n;WW.on=1;WW.t=0}else{WW.cool=12;WW.roll=null;WW.acc=0}}return}
  WW.t+=dt;const E=wwEl();if(WW.t>1.3)E.e.classList.replace('on','soft');const f=camForward(),r=V3(-f.z,0,f.x);E.a.querySelector('svg').style.transform=`rotate(${Math.atan2(to.dot(r),to.dot(f))}rad)`;
  const face=V3(Math.sin(P.face),0,Math.cos(P.face));if(face.dot(to)>Math.cos(40*Math.PI/180)||(!wrong&&WW.acc<.5)){hide();WW.roll=null;WW.acc=0}}}

/* ---------- low life: a red edge that deepens as you fall, and blood under 9% ---------- */
const LH={el:null,v:0,b:0};
function lhEl(){if(LH.el)return LH.el;const st=document.createElement('style');st.textContent='#lhVig,#lhBlood{position:fixed;inset:0;pointer-events:none;z-index:32;opacity:0}#lhVig{background:radial-gradient(ellipse at 50% 50%,rgba(0,0,0,0) 52%,rgba(120,0,8,.55) 82%,rgba(70,0,4,.85) 100%);mix-blend-mode:multiply}#lhGlow{position:fixed;inset:0;pointer-events:none;z-index:32;opacity:0;box-shadow:inset 0 0 70px 16px rgba(200,10,20,.55)}#lhBlood{background-size:100% 100%;background-repeat:no-repeat}';document.head.appendChild(st);
  const v=document.createElement('div');v.id='lhVig';const g=document.createElement('div');g.id='lhGlow';const b=document.createElement('div');b.id='lhBlood';
  const c=document.createElement('canvas');c.width=1024;c.height=640;const x=c.getContext('2d');const blot=(cx,cy,r)=>{const gr=x.createRadialGradient(cx,cy,0,cx,cy,r);gr.addColorStop(0,'rgba(110,0,6,.95)');gr.addColorStop(.6,'rgba(90,0,4,.75)');gr.addColorStop(1,'rgba(60,0,0,0)');x.fillStyle=gr;x.beginPath();
    for(let k=0;k<=20;k++){const a=k/20*TAU,rr=r*(.7+Math.random()*.45);x.lineTo(cx+Math.cos(a)*rr,cy+Math.sin(a)*rr)}x.fill();for(let k=0;k<9;k++){const a=Math.random()*TAU,d=r*(.9+Math.random()*.9);x.fillStyle='rgba(100,0,5,'+(.5+Math.random()*.4)+')';x.beginPath();x.arc(cx+Math.cos(a)*d,cy+Math.sin(a)*d,2+Math.random()*r*.12,0,TAU);x.fill()}};
  const edge=(cx,cy,n,s)=>{for(let k=0;k<n;k++)blot(cx+(Math.random()-.5)*s,cy+(Math.random()-.5)*s,20+Math.random()*55)};edge(0,0,9,220);edge(1024,0,8,220);edge(0,640,9,220);edge(1024,640,9,220);edge(512,640,3,300);edge(0,320,3,200);edge(1024,320,3,200);
  for(let k=0;k<6;k++){const sx=Math.random()<.5?Math.random()*160:1024-Math.random()*160;x.strokeStyle='rgba(95,0,5,.8)';x.lineWidth=3+Math.random()*4;x.beginPath();x.moveTo(sx,0);x.lineTo(sx+(Math.random()-.5)*20,40+Math.random()*110);x.stroke()}
  b.style.backgroundImage=`url(${c.toDataURL()})`;document.body.appendChild(v);document.body.appendChild(g);document.body.appendChild(b);LH.el={v,g,b};return LH.el}
{const _mt=muTick;muTick=function(dt){_mt(dt);const E=lhEl();let tv=0,tb=0;if(started&&!CS.active&&P.alive){const r=P.hp/Math.max(1,maxHP());if(r<.3)tv=Math.min(1,(.3-r)/.27);if(r<.09)tb=Math.min(1,(.09-r)/.06*.7+.3)}else if(started&&!P.alive)tv=.6;
  LH.v+=(tv-LH.v)*Math.min(1,dt*(tv>LH.v?4:1.5));LH.b+=(tb-LH.b)*Math.min(1,dt*(tb>LH.b?3:1));const beat=LH.v>.5?(.88+.12*Math.max(0,Math.sin(time*(5+LH.v*3)))):1;
  E.v.style.opacity=(LH.v*.75*beat).toFixed(3);E.g.style.opacity=(LH.v*.5*beat).toFixed(3);E.b.style.opacity=(LH.b*.8).toFixed(3)}}

/* ---------- Paris, after Kaen is back: Lyra only offers the door when you ask ---------- */
let LYH=null;
function lyHint(on){if(!LYH){const st=document.createElement('style');st.textContent='#lyHint{position:fixed;left:50%;bottom:150px;transform:translateX(-50%);z-index:36;display:none;align-items:center;gap:8px;padding:7px 14px;border-radius:999px;background:rgba(14,8,30,.66);border:1px solid rgba(255,150,150,.3);color:#f6e6e0;font:500 13px Outfit,system-ui,sans-serif;cursor:pointer}#lyHint.on{display:flex}#lyHint kbd{font:600 11px Outfit,sans-serif;padding:2px 7px;border-radius:6px;background:rgba(255,255,255,.14);border:1px solid rgba(255,255,255,.2)}';document.head.appendChild(st);
    LYH=document.createElement('div');LYH.id='lyHint';LYH.innerHTML=(typeof isTouch!=='undefined'&&isTouch?'':'<kbd>E</kbd>')+'Ask Lyra for the door to Calais';LYH.addEventListener('pointerdown',e=>{e.preventDefault();lyraPanel()});document.body.appendChild(LYH)}
  LYH.classList.toggle('on',!!on&&!CS.active)}
addEventListener('keydown',e=>{if(e.code==='KeyE'&&LYH&&LYH.classList.contains('on')&&!CS.active){lyraPanel();LYH.classList.remove('on')}});
{const _mt=muTick;muTick=function(dt){_mt(dt);if(LYH&&LYH.classList.contains('on')&&(CH2.zone!=='paris'||!LYR.a||!LYR.home||CS.active||Math.hypot(P.pos.x-LYR.a.g.position.x,P.pos.z-LYR.a.g.position.z)>3.6))LYH.classList.remove('on')}}

/* ---------- cutscene voices are never cut off: a shot waits for its line to finish ---------- */
{const _ns=nextShot;let hold=0,forced=false;nextShot=function(){if(CS.active&&!CS.skipping&&!forced&&VO.src&&CS.shots[CS.i]&&CS.shots[CS.i].who){if(!hold)hold=performance.now();if(performance.now()-hold<2600)return}hold=0;forced=false;return _ns.apply(this,arguments)};
  cineEl.addEventListener('pointerdown',()=>{forced=true;setTimeout(()=>{forced=false},350)},true)}

/* ---------- the Warden, heartless: he closes in, strikes, and gets out ---------- */
{const _ai=BOSSAI.warden;BOSSAI.warden=function(e,dt,d){_ai(e,dt,d);if(CH2.st!==10||CH2.chase||e.dead||e.invuln||!XHT.spawned||xhtAlive()||CS.active)return;const a=e.ai;
  a.cq=(a.cq==null?3:a.cq)-dt;if(a.cq>0||a.cqOn)return;a.cqOn=1;const n=Math.random()<.35?3:Math.random()<.5?2:1;let i=0;
  const strike=()=>{if(e.dead||CS.active){a.cqOn=0;a.cq=4;return}const ang=rand(0,TAU);const at=P.pos.clone().add(V3(Math.sin(ang)*2.6,.6,Math.cos(ang)*2.6));wdBlink(e,at);e.m.g.rotation.y=Math.atan2(P.pos.x-at.x,P.pos.z-at.z);
    try{e.m.actor&&e.m.actor.fire('Punch_Cross',.5)}catch(x){}const c=V3(at.x,P.pos.y,at.z);const rg=new THREE.Mesh(new THREE.RingGeometry(.2,4.3,40),new THREE.MeshBasicMaterial({color:0x60ff90,transparent:true,opacity:.0,blending:THREE.AdditiveBlending,depthWrite:false,side:THREE.DoubleSide}));rg.rotation.x=-Math.PI/2;rg.position.set(c.x,c.y+.15,c.z);
    addFx(rg,.42,(f,k)=>{rg.material.opacity=.15+k*.45;rg.scale.setScalar(.5+k*.5);if(Math.random()<.8)SP.emit(headOf(at,rand(1,4)),{c0:0xffffff,c1:0x30ff70,s0:.4,s1:.05,life:.3,speed:-4})},()=>{scene.remove(rg);rg.geometry.dispose();
      if(e.dead)return;const hitP=Math.hypot(P.pos.x-c.x,P.pos.z-c.z)<4.6&&Math.abs(P.pos.y-c.y)<4;flash(headOf(at,2),0x9affb0,16);P.shake=Math.max(P.shake,.6);ring(V3(c.x,c.y,c.z),0x9affb0,.5,5.5,.25);sx('impact',.8,null,{rate:1.3});
      SP.emit(headOf(at,2),{n:70,c0:0xffffff,c1:0x30ff70,speed:12,life:.5});if(hitP)damagePlayer(maxHP()*.11);
      after(.35,()=>{if(e.dead)return;i++;if(i<n&&!CS.active)strike();else{const ba=rand(0,TAU);wdBlink(e,P.pos.clone().add(V3(Math.sin(ba)*18,rand(5,8),Math.cos(ba)*18)));a.cqOn=0;a.cq=rand(5,8)}})})};
  strike()}}

/* ---------- a better Warden beam: spiralling rings, a heat line, a scorched impact ---------- */
{const _wl=wdLaser;wdLaser=function(e,from,to,dmg,w,o){const r=_wl.apply(this,arguments);o=o||{};w=w||.7;const tc=o.charge||.7;const f0=from.clone(),t0=to.clone();
  after(tc,()=>{if(e&&e.dead)return;const dir=t0.clone().sub(f0).normalize();const end=f0.clone().addScaledVector(dir,f0.distanceTo(t0)+(o.ext==null?30:o.ext));const L=f0.distanceTo(end);const q=new THREE.Quaternion().setFromUnitVectors(V3(0,0,1),dir);
    const rings=[];for(let k=0;k<5;k++){const m=new THREE.Mesh(new THREE.TorusGeometry(w*1.6,.05,6,32),new THREE.MeshBasicMaterial({color:k%2?0xffffff:0x80ffb0,transparent:true,opacity:.8,blending:THREE.AdditiveBlending,depthWrite:false}));m.quaternion.copy(q);scene.add(m);rings.push({m,u:k/5})}
    const imp=t0.clone();const gy=groundAt(imp.x,imp.z);const nearG=imp.y-gy<3;let ph=0;
    addFx(null,o.dur||.62,(f,k)=>{ph+=.016*16;for(const R of rings){R.u=(R.u+.03)%1;R.m.position.copy(f0).addScaledVector(dir,R.u*L);const s=(1-k*.6)*(1+Math.sin(R.u*12+ph)*.2);R.m.scale.setScalar(s);R.m.material.opacity=.75*(1-k)}
      for(let n=0;n<3;n++){const u=Math.random();const a=ph+u*20;const side=V3(1,0,0).applyQuaternion(q),up=V3(0,1,0).applyQuaternion(q);const p=f0.clone().addScaledVector(dir,u*L).addScaledVector(side,Math.cos(a)*w*1.3).addScaledVector(up,Math.sin(a)*w*1.3);SP.emit(p,{c0:0xffffff,c1:0x40ff80,s0:.35,s1:.04,life:.35})}
      if(Math.random()<.6)SP.emit(imp.clone().add(V3(rand(-1,1),rand(0,1.5),rand(-1,1))),{c0:0xffffff,c1:0x30ff70,s0:.6,s1:.05,life:.5,speed:6,grav:6})},
      ()=>{for(const R of rings){scene.remove(R.m);R.m.geometry.dispose();R.m.material.dispose()}});
    ring(V3(imp.x,nearG?gy:imp.y,imp.z),0x9affb0,.4,w*7,.35);if(nearG){try{groundMark(scorchTex,V3(imp.x,gy,imp.z),0x103010,w*5,4,false,.7)}catch(x){}SM.emit(V3(imp.x,gy+.5,imp.z),{n:12,c0:0x60a070,c1:0x0a1a0a,s0:1.5,s1:4,life:1.2,a:.5,up:1.5})}});
  return r}}

/* ---------- the silver, Lyra through a portal, a heartbeat, and Kaen made flesh again ---------- */
XL.ly48='I can finally be here with you, in London. No more whispering in your head. The Tower and its Warden can\'t feed on me anymore.';XL.ly49='But the Crown can always feed. On any of us. So we stay careful. Me too.';VO_MAP[XL.ly48]='ly48';VO_MAP[XL.ly49]='ly49';
xiiSilver=function(center,orb){const sp=V3(center.x,Math.max(2.4,groundAt(center.x,center.z)+2.4),center.z);
  const sil=new THREE.Group();sil.position.copy(sp);const sm=std({color:0xe8eef8,metalness:1,roughness:.15,emissive:0x8fb0ff,emissiveIntensity:.35});sil.add(new THREE.Mesh(new THREE.TorusGeometry(.55,.08,8,28),sm));for(let k=0;k<7;k++){const a=k/7*TAU;const s=new THREE.Mesh(new THREE.ConeGeometry(.07,.34,5),sm);s.position.set(Math.cos(a)*.55,.18,Math.sin(a)*.55);sil.add(s)}
  sil.add(glowSprite(0xcfe0ff,3,.6));NZ.g.add(sil);const spin={on:1};NZ.anim.push(dt=>{if(!spin.on)return false;sil.rotation.y+=dt*1.2;sil.position.y=sp.y+Math.sin(performance.now()*.002)*.15});
  {const G=NZ.green||V3(222,0,-9862);const tw=V3(232-G.x,0,-9876-G.z).normalize();const st=G.clone().addScaledVector(tw,-3);P.pos.set(st.x,groundAt(st.x,st.z),st.z);P.vy=0;P.flying=false;P.face=Math.atan2(tw.x,tw.z);yaw=P.face+Math.PI;
    if(KFW.a){const kq=P.pos.clone().add(V3(-tw.z*1.4,0,tw.x*1.4)).addScaledVector(tw,-.6);KFW.a.g.position.set(kq.x,P.pos.y+.35,kq.z);KFW.a.g.rotation.y=P.face}}
  const kp=()=>KFW.a?KFW.a.g.position:P.pos;const f=V3(Math.sin(P.face),0,Math.cos(P.face)),rt=V3(f.z,0,-f.x);
  const pp=P.pos.clone().addScaledVector(f,5.2).addScaledVector(rt,-1.6);pp.y=groundAt(pp.x,pp.z);const toM=V3(P.pos.x-pp.x,0,P.pos.z-pp.z).normalize();const stand=pp.clone().addScaledVector(toM,2.4);let portal=null,heart=null,ghost=null,flesh=null,mats=[];
  const L=()=>LYR.a?LYR.a.g.position:stand;const lyAnim=n=>{try{LYR.a.setBase(n,.35)}catch(x){}};
  const lyCam=(sd,ds,h)=>()=>{const g=L();const d=V3(P.pos.x-g.x,0,P.pos.z-g.z).normalize();const r=V3(d.z,0,-d.x);return{pos:headOf(g,h||1.6).addScaledVector(d,ds||2.6).addScaledVector(r,sd||1.1),look:headOf(g,1.5)}};
  const pair=()=>{const a=L(),b=kp();return{a,b,m:a.clone().lerp(b,.5)}};
  playCutscene([{who:'The Warden',text:XL.t2_11,cam:orb,update:()=>SP.emit(V3(center.x+rand(-2,2),center.y+rand(0,4),center.z+rand(-2,2)),{c0:0xc0ff90,c1:0x103010,s0:.6,s1:.1,life:.8,up:2})},
    {who:'@',text:XL.m3_11,cam:witchShot(-1,3.4)},
    {who:"Kaen's Spirit",text:XL.k3_09,cut:true,cam:()=>({pos:sp.clone().add(V3(2.4,.6,2.4)),look:sp}),onStart:()=>{sx('ding',.9)}},
    {dur:4.2,fov:50,cut:true,cam:k=>({pos:pp.clone().addScaledVector(toM,6.8-k*1.2).addScaledVector(V3(toM.z,0,-toM.x),2.6).add(V3(0,2.4,0)),look:headOf(pp,1.6)}),
      onStart:()=>{portal=nzPortal(pp.clone());portal.rotation.y=Math.atan2(toM.x,toM.z);portal.scale.setScalar(.01);sx('portal',1,null,{rate:.85});flash(headOf(pp,2),0xff4050,22);lyraPlace(pp.x-toM.x*1.4,pp.z-toM.z*1.4,Math.atan2(toM.x,toM.z));LYR.home=false;if(LYR.mk)LYR.mk.visible=false;LYR.a.g.visible=false},
      update:(dt,k)=>{if(!portal)return;portal.userData.tick(dt);const open=k<.25?k/.25:k>.85?Math.max(.01,1-(k-.85)/.15):1;portal.scale.setScalar(open*(1+Math.sin(k*30)*.02));
        if(k>.3&&LYR.a){LYR.a.g.visible=true;const u=Math.min(1,(k-.3)/.45);const from=pp.clone().addScaledVector(toM,-1.4);LYR.a.g.position.copy(from.lerp(stand,u));LYR.a.g.position.y=groundAt(LYR.a.g.position.x,LYR.a.g.position.z);lyAnim(u<1?'Walk_Loop':'Idle_Loop');
          if(u<1&&Math.random()<.6)SP.emit(headOf(LYR.a.g.position,rand(.2,1.8)),{c0:0xffd0d0,c1:0xff3040,s0:.35,s1:.04,life:.6})}
        if(k>.98&&portal){scene.remove(portal);portal=null;flash(headOf(pp,2),0xff4050,12)}}},
    {who:'Lyra',text:XL.ly48,cut:true,cam:lyCam(1.1,2.8),onStart:()=>{if(portal){scene.remove(portal);portal=null}lyAnim('Idle_Loop')}},
    {who:'Lyra',text:XL.ly49,cam:lyCam(-1.2,2.4)},
    {who:'Lyra',text:XL.ly40,cut:true,cam:()=>{const P2=pair();const r=V3(P2.b.z-P2.a.z,0,-(P2.b.x-P2.a.x)).normalize();return{pos:headOf(P2.m,2).addScaledVector(r,6),look:headOf(P2.m,1.3)}}},
    {who:"Kaen's Spirit",text:XL.k3_10,cut:true,cam:kS3(1.3)},
    {who:'Lyra',text:XL.ly41,cut:true,cam:lyCam(-1,2.2,1.45),onStart:()=>{lyAnim('Spell_Simple_Idle_Loop');heart=glowSprite(0xff3050,.4,1,false);heart.position.copy(headOf(L(),1.3));scene.add(heart);sx('heart',.9)},
      update:(dt,k)=>{if(heart){heart.position.copy(headOf(L(),1.3)).add(V3(0,0,0));const b=.4+k*.9+Math.max(0,Math.sin(time*7))*.25;heart.scale.setScalar(b);if(Math.random()<.4)SP.emit(heart.position,{c0:0xffd0e0,c1:0xff2050,s0:.3,s1:.03,life:.5,speed:1})}}},
    {dur:3.4,fov:44,cut:true,cam:k=>{const P2=pair();const r=V3(P2.b.z-P2.a.z,0,-(P2.b.x-P2.a.x)).normalize();return{pos:headOf(P2.m,1.7+k*.4).addScaledVector(r,4.6-k*1.2),look:headOf(P2.m,1.35)}},
      onStart:()=>{KFW.pin=1;ghost=KFW.a;lyAnim('Walk_Loop')},
      update:(dt,k)=>{if(!LYR.a||!ghost)return;const b=ghost.g.position;const a=LYR.a.g.position;const d=V3(b.x-a.x,0,b.z-a.z);const dl=d.length();if(dl>.5){a.addScaledVector(d.normalize(),Math.min(dl-.5,dt*1.6));a.y=groundAt(a.x,a.z)}else lyAnim('Spell_Simple_Idle_Loop');
        LYR.a.g.rotation.y=Math.atan2(b.x-a.x,b.z-a.z);ghost.g.rotation.y=Math.atan2(a.x-b.x,a.z-b.z);try{ghost.setBase(dl>.6?'Idle_Loop':'Spell_Simple_Idle_Loop',.4)}catch(x){}if(heart)heart.position.copy(headOf(a,1.3));sil.position.lerp(headOf(b,2.3),Math.min(1,dt*1.2));spin.on=0;sil.rotation.y+=dt*2}},
    {dur:6,fov:40,cut:true,title:['Kaen Kuroshiba','Flesh and blood'],cam:k=>{const b=kp();const a=k*1.6+.4;return{pos:headOf(b,1.3+k*.9).add(V3(Math.sin(a)*(3-k*.6),0,Math.cos(a)*(3-k*.6))),look:headOf(b,1.15)}},
      onStart:()=>{const g=ghost||KFW.a;flesh=makeCHActor('m',{skin:0xf2d8c8,hair:'hairPart',hairTex:'1',hairCol:0x0b0a10,brow:0x0b0a10,keepReg:[5,6,9],wear:[['long',0x121016],['trousers',0x0f0d13],['shoes',0x0a0a0c]]});
        if(flesh){flesh.g.traverse(o=>{if(o.isMesh&&o.material){o.material=o.material.clone();o.material.transparent=true;o.material.opacity=0;mats.push(o.material)}});flesh.g.position.copy(g.g.position);flesh.g.rotation.y=g.g.rotation.y;flesh.g.scale.copy(g.g.scale);scene.add(flesh.g);try{flesh.setBase('Spell_Simple_Idle_Loop');flesh.update(.2)}catch(x){}}
        sx('powerup',1,null,{rate:.75});sx('riser',.9,null,{rate:.6})},
      update:(dt,k)=>{const b=kp();const c=headOf(b,1.1);const u=Math.min(1,Math.max(0,(k-.1)/.75));if(flesh){flesh.update(dt);flesh.g.position.copy(b);if(ghost)flesh.g.rotation.y=ghost.g.rotation.y;for(const m of mats)m.opacity=u*u}
        if(KFW.gm)KFW.gm.opacity=.42*(1-u);if(ghost)ghost.g.traverse(o=>{if(o.isMesh&&o.material&&o.material.blending===THREE.AdditiveBlending)o.material.opacity=.42*(1-u)});
        if(heart){heart.position.lerp(c,Math.min(1,dt*1.3));heart.scale.setScalar(1.2*(1-u*.6))}sil.position.lerp(c,Math.min(1,dt*(.3+u*1.5)));sil.scale.setScalar(1-u*.7);
        const ry=b.y+u*2.2;for(let q=0;q<3;q++){const a=rand(0,TAU);SP.emit(V3(b.x+Math.cos(a)*.55,ry+rand(-.1,.1),b.z+Math.sin(a)*.55),{c0:0xffffff,c1:q%2?0xff6080:0xb0c8ff,s0:.35,s1:.03,life:.5,up:.5})}
        if(Math.random()<.5)SP.emit(c.clone().add(V3(rand(-2.5,2.5),rand(-1,2.5),rand(-2.5,2.5))),{c0:0xd0e0ff,c1:0x6040c0,s0:.3,s1:.03,life:1,speed:-2.4});if(Math.random()<dt*2)flash(c,0xffd0e0,6)}},
    {dur:2.4,fov:44,cam:k=>{const c=kp();return{pos:headOf(c,1.5).add(V3(3.2,0,3.2)),look:headOf(c,1.2)}},onStart:()=>{const c=headOf(kp(),1.1);flash(c,0xffffff,40);SP.emit(c,{n:320,c0:0xffffff,c1:0xd0a0ff,speed:14,life:1.4});ring(V3(c.x,c.y-1.1,c.z),0xffd0e0,1,10,.6);P.shake=1.5;sx('impact',1,null,{rate:.6});
        NZ.g.remove(sil);if(heart){scene.remove(heart);heart=null}const pos=kp().clone(),ry=ghost?ghost.g.rotation.y:0;kfSolidify();if(KFW.a){KFW.a.g.position.copy(pos);KFW.a.g.rotation.y=ry}if(flesh){scene.remove(flesh.g);flesh=null}lyAnim('Idle_Loop')}},
    {who:'Kaen',text:XL.kb_01,cut:true,cam:kS3(1.2,1.6),onStart:()=>{try{KFW.a.setBase('Idle_Loop',.3)}catch(x){}}},{who:'Lyra',text:XL.ly42,cam:lyCam(1.2,2.6)},{who:'Kaen',text:XL.kb_02,cut:true,cam:kS3(-1.3,1.6)},{who:'@',text:XL.m3_12,cam:witchShot(1,3.2)},
    {who:'Kaen',text:XL.kb_03,fov:50,cam:k=>{const g=NZ.green||V3(222,0,-9862);return{pos:V3(g.x-10,6+k*14,g.z+30),look:V3(232,30,-9866)}}}],
    ()=>{KFW.pin=0;if(portal)scene.remove(portal);if(flesh)scene.remove(flesh.g);if(sil.parent)sil.parent.remove(sil);spin.on=0;if(heart)scene.remove(heart);if(XII.heart){scene.remove(XII.heart);XII.heart=null}if(!XII.solid)kfSolidify();
      CH2.st=Math.max(CH2.st,11);ch2Save();writeSave();beaten.add('warden');toast('Kaen has his body back, and Lyra can finally walk London with you.','Chapter XII complete',true)})};
