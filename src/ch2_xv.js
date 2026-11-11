
/* =====================================================================================
   CHAPTER XV  · BENEATH WESTMINSTER   (uncloak the Abbey, the bat tunnel, Gog and Magog)
   CHAPTER XVI · THE HOLLOW CROWN      (the smoke in the chair, the run to the light, every old face, yourself)
   stages: 17 fly to Westminster / uncloak · 18 the tunnel · 19 the guardians · 20 the chair and the chase
           21 the faces · 22 the mirror · 23 done
   ===================================================================================== */
const X5={in:0,built:0,shown:false,ab:null,veil:null,gates:{},torch:[],lights:[],cols:[],said:{},cp:0,wave:{},t:0,rit:0,intro:0,arr:0,fogK:0};
const WM={sq:V3(-143,0,-9872),door:V3(-174.6,0,-9872),stair:V3(-167,0,-9890),ab:V3(-194,0,-9872)};
const U0={x:-160,z:-10120};
const USEC=[{n:'entry',s0:0,s1:10,hw:4,h:7},{n:'tun',s0:10,s1:96,hw:5.5,h:8.5},{n:'oss',s0:96,s1:136,hw:13,h:12},{n:'p1',s0:136,s1:150,hw:4.5,h:7},
  {n:'hall',s0:150,s1:206,hw:26,h:22},{n:'p2',s0:206,s1:218,hw:4.5,h:7},{n:'thr',s0:218,s1:262,hw:20,h:20},{n:'esc',s0:262,s1:322,hw:4.5,h:8},{n:'esc',s0:322,s1:392,hw:12,h:15},{n:'esc',s0:392,s1:450,hw:5,h:8.5},{n:'esc',s0:450,s1:498,hw:13,h:17},{n:'esc',s0:498,s1:520,hw:5,h:9}];
const UE=520;
const uS=z=>U0.z-z,uZ=s=>U0.z-s,uX=lx=>U0.x+lx,uP=(lx,s,y)=>V3(U0.x+lx,y||0,U0.z-s);
function uSec(s){for(const S of USEC)if(s>=S.s0&&s<S.s1)return S;return s<0?USEC[0]:USEC[USEC.length-1]}
function uFloor(s){return s>264?Math.min(16,(s-264)*16/(UE-270)):0}
const x5In=()=>X5.in&&MODE!=='open';

Object.assign(XL3,{
  lw_01:"Westminster. The oldest vessel of them all. I can feel it pulling at Alfred's flame.",
  mw_01:"This is it? There's nothing here. Just grass and pigeons.",
  kw_01:"There is an abbey here. A thousand years of kings were crowned in it. And I can't see one stone of it.",
  lw_02:'It cloaked its own house. The same trick Alfred used, turned inside out.',
  mw_02:'Then we tear it off. Like the pub.',
  lw_03:'This cloak is a thousand years thick. It will take all three of us. Together!',
  kw_02:"It's pushing back! I'm with you. Now!",
  mw_03:'Oh. That is a lot of church.',
  kw_03:"The doors are sealed with its smoke. We won't get in that way.",
  lw_04:"There. The old crypt stair. Whatever is feeding, it's feeding from below.",
  mw_04:'Dark, wet, and it smells like a thousand years of feet. Lovely.',
  kw_04:'Quiet. Listen... Wings.',
  lw_05:'Bats! Hundreds of them!',
  kw_05:"That one is no leftover. It has been eating well. Don't stand in front of the scream!",
  mw_05:'One big ugly bat down.',
  lw_06:"She's calling the whole colony! Cut her down first!",
  kw_06:'The tunnel opens ahead. Something heavy is breathing down there.',
  mw_06:"Two statues and a locked door. I've seen this film.",
  gg_01:'None pass... but the crowned.',
  gg_02:'Little flames. We have snuffed out better.',
  kw_07:'The big one is mine. Take the one with wings!',
  lw_07:'Magog is charging the sky! Move when the floor glows!',
  kw_08:"Maëlle! He's stone, and my arm is done. I can't break him alone!",
  lw_08:"Maëlle, give me your hand! Alfred's flame can carry you across. Be his strength!",
  mw_07:'Heavy. Everything is heavy. How do you even walk in this?',
  kw_09:'Less talking in my head. More sword.',
  gg_03:'Stone... remembers...',
  lw_09:"They're binding together! Come back, Maëlle. I can't hold you both!",
  kw_10:"I'm spent. Finish them, witch.",
  mw_08:'Sit down, both of you. This part is mine.',
  gg_04:'Brother!',
  mw_09:"Two guardians, one door, and I'm still standing. Mostly.",
  kw_11:'It knows we are here now. No more guardians. Only the thing itself.',
  cr_01:'A witch. A thief. And the little sister I never finished.',
  mw_10:"That's it? A puddle of smoke in a chair?",
  cr_02:'I was a king once. Then a crown. Then only the wanting. Strike me, child. See what it earns you.',
  kw_12:'Nothing to hit. It has no body down here.',
  lw_10:"Alfred's flame! Light the three coronation candles. Light is the one thing a hunger cannot swallow!",
  cr_03:'Put that out.',
  cr_04:"You carry a dead man's candle. It will not last the night.",
  cr_05:'Enough! If I must wear a shape, I will choose it under the open sky!',
  kw_13:"It's running for the surface! After it!",
  lw_11:'The tunnel is coming down! Run!',
  mw_11:'I see light! Go, go, go!',
  cr_06:'Every thing you killed, you fed to me. Shall I show you?',
  mw_12:'Hakuko... no. You died in Paris. I watched.',
  cr_07:'Remember this one?',
  cr_08:'And this?',
  cr_09:'You were so afraid of the cold.',
  mw_13:"Kaen...? No. I can't. I can't hit you.",
  fk_01:"Then don't. Put the wand down, Maëlle. I am so tired.",
  kw_14:"That is not me! It's wearing my face to make you bleed. It's an illusion, Maëlle. Go!",
  mw_14:'Right. Sorry in advance. Not to you. To your face.',
  mw_15:"Is it over? Somebody tell me it's over.",
  mm_01:'You killed every one of them. So who is the monster, Maëlle? Look at me.',
  mw_16:"Oh, that's low. Even the hat.",
  lw_12:"We can't help you with this one. It is only as strong as you are!",
  mm_02:'I know every spell you know.',
  mm_03:"You're tired. I never get tired.",
  mm_04:'Bilel died because you were slow.',
  mw_17:'Stop using my face!',
  mw_18:'I am not you. I have friends. You have a chair.',
  cr_10:'No... more... faces...',
  mw_19:"It's out of faces.",
  kw_15:"It isn't dead. You can't kill a hunger. But it's small enough to carry now.",
  lw_13:'Then we carry it somewhere it can never feed again.',
  mw_20:'Tomorrow. Tonight, somebody is buying me chips.'});
for(const k of Object.keys(XL3))if(/^(mw_|kw_|lw_|cr_|gg_|fk_|mm_)/.test(k))VO_MAP[XL3[k]]=k;
Object.assign(SPEAKER,{Gog:'#b8ff8a',Magog:'#b8a8ff','The Crown':'#7dff9a','???':'#c9a6ff'});
const x5Say=(w,k,p)=>epSay(w,XL3[k],p);
const x5Bark=(w,k)=>{if(X5.said[k])return;X5.said[k]=1;epSay(w,XL3[k])};

/* ---------- motion design: banners, impact frames, speed lines ---------- */
let X5UI=null;
function x5UI(){if(X5UI)return X5UI;const st=document.createElement('style');st.textContent=`
#x5ban{position:fixed;inset:0;z-index:46;pointer-events:none;display:none;overflow:hidden}
#x5ban.on{display:block}
#x5ban .bar{position:absolute;left:-10%;right:-10%;top:50%;height:clamp(76px,15vh,140px);transform:translateY(-50%) skewY(-4deg) scaleY(0);background:linear-gradient(90deg,transparent,var(--c2,#0a0612) 12%,var(--c2,#0a0612) 88%,transparent);box-shadow:0 0 0 3px var(--c,#7dff9a) inset,0 0 60px var(--c,#7dff9a);opacity:.92}
#x5ban.on .bar{animation:x5bar var(--d,1.9s) cubic-bezier(.2,.9,.2,1) both}
#x5ban .tx{position:absolute;left:0;right:0;top:50%;transform:translateY(-58%) skew(-9deg);text-align:center;font:400 clamp(30px,6.4vw,92px)/.9 'Bangers',Impact,sans-serif;letter-spacing:.06em;color:#fff;-webkit-text-stroke:2px #000;paint-order:stroke fill;text-shadow:3px 3px 0 var(--c,#7dff9a),6px 6px 0 #000;white-space:nowrap;will-change:transform;backface-visibility:hidden}
#x5ban.on .tx{animation:x5tx var(--d,1.9s) cubic-bezier(.15,1.2,.3,1) both}
#x5ban .sb{position:absolute;left:0;right:0;top:calc(50% + clamp(30px,6vh,62px));text-align:center;transform:skew(-9deg);font:400 clamp(12px,1.7vw,21px) 'Bangers',Impact,sans-serif;letter-spacing:.34em;color:var(--c,#7dff9a);text-shadow:2px 2px 0 #000}
#x5ban.on .sb{animation:x5sb var(--d,1.9s) ease-out both}
#x5ban i{position:absolute;height:3px;background:linear-gradient(90deg,transparent,#fff,transparent);opacity:0}
#x5ban.on i{animation:x5ln .5s linear both}
@keyframes x5bar{0%{transform:translateY(-50%) skewY(-4deg) scaleY(0)}12%{transform:translateY(-50%) skewY(-4deg) scaleY(1.15)}20%,80%{transform:translateY(-50%) skewY(-4deg) scaleY(1)}100%{transform:translateY(-50%) skewY(-4deg) scaleY(0)}}
@keyframes x5tx{0%{transform:translate(-120%,-58%) skew(-30deg);opacity:0}14%{transform:translate(2%,-58%) skew(-9deg);opacity:1}20%{transform:translate(-1%,-58%) skew(-9deg)}80%{transform:translate(1.2%,-58%) skew(-9deg);opacity:1}100%{transform:translate(120%,-58%) skew(-30deg);opacity:0}}
@keyframes x5sb{0%,14%{opacity:0;letter-spacing:1.2em}30%,78%{opacity:1;letter-spacing:.34em}100%{opacity:0}}
@keyframes x5ln{0%{transform:translateX(-110vw);opacity:.9}100%{transform:translateX(110vw);opacity:0}}
canvas.x5imp{filter:invert(1) contrast(1.6) saturate(0)!important}
canvas.x5grey{filter:grayscale(1) contrast(1.25) brightness(1.1)!important;transition:filter .12s}
#x5vs{position:fixed;inset:0;z-index:46;pointer-events:none;display:none;font-family:'Bangers',Impact,sans-serif}
#x5vs.on{display:block}
#x5vs b{position:absolute;top:0;bottom:0;width:62%;display:flex;align-items:center;justify-content:center;font-weight:400;font-size:clamp(28px,5.6vw,82px);letter-spacing:.06em;color:#fff;-webkit-text-stroke:2px #000;paint-order:stroke fill}
#x5vs b.l{left:-6%;background:linear-gradient(100deg,var(--a,#143a14) 60%,transparent);clip-path:polygon(0 0,100% 0,78% 100%,0 100%);text-shadow:5px 5px 0 var(--ca,#7dff9a);animation:x5vl 2.2s cubic-bezier(.2,1,.3,1) both}
#x5vs b.r{right:-6%;background:linear-gradient(280deg,var(--b,#1c1440) 60%,transparent);clip-path:polygon(22% 0,100% 0,100% 100%,0 100%);text-shadow:5px 5px 0 var(--cb,#b8a8ff);animation:x5vr 2.2s cubic-bezier(.2,1,.3,1) both}
#x5vs u{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%) skew(-10deg);text-decoration:none;font-size:clamp(34px,7vw,100px);color:#fff6c0;-webkit-text-stroke:3px #000;paint-order:stroke fill;text-shadow:0 0 40px #fff;animation:x5vu 2.2s cubic-bezier(.2,1.6,.3,1) both}
@keyframes x5vl{0%{transform:translateX(-100%)}14%,82%{transform:translateX(0)}100%{transform:translateX(-110%)}}
@keyframes x5vr{0%{transform:translateX(100%)}14%,82%{transform:translateX(0)}100%{transform:translateX(110%)}}
@keyframes x5vu{0%,12%{transform:translate(-50%,-50%) skew(-10deg) scale(6);opacity:0}22%{transform:translate(-50%,-50%) skew(-10deg) scale(1);opacity:1}82%{opacity:1}100%{opacity:0;transform:translate(-50%,-50%) skew(-10deg) scale(.6)}}
#x5hint{position:fixed;left:50%;bottom:22%;transform:translateX(-50%) skew(-8deg);z-index:30;font:400 clamp(22px,3vw,32px) 'Bangers',Impact,sans-serif;letter-spacing:.08em;color:#f0ffe8;-webkit-text-stroke:1px #06200a;paint-order:stroke fill;text-shadow:2px 2px 0 #2c9c4a,0 0 18px rgba(120,255,150,.7);pointer-events:auto;cursor:pointer;display:none}
#x5white{position:fixed;inset:0;z-index:47;background:#fff;opacity:0;pointer-events:none;transition:opacity .5s}
#x5bars{position:fixed;left:50%;top:86px;transform:translateX(-50%);z-index:21;display:none;gap:5px;pointer-events:none}
#x5bars.on{display:flex}
#x5bars i{width:clamp(26px,5vw,54px);height:7px;transform:skew(-20deg);background:#1a1420;border:1px solid #5a4a6a}
#x5bars i.d{background:#3a3a44;border-color:#3a3a44}
#x5bars i.c{background:#7dff9a;border-color:#fff;box-shadow:0 0 10px #7dff9a}
`;document.head.appendChild(st);
  const mk=(id,html)=>{const d=document.createElement('div');d.id=id;d.innerHTML=html||'';document.body.appendChild(d);return d};
  X5UI={ban:mk('x5ban','<div class="bar"></div><div class="tx"></div><div class="sb"></div>'),vs:mk('x5vs','<b class="l"></b><b class="r"></b><u>VS</u>'),hint:mk('x5hint'),white:mk('x5white'),bars:mk('x5bars')};
  X5UI.hint.addEventListener('pointerdown',e=>{e.stopPropagation();if(X5.hintFn)X5.hintFn()});return X5UI}
function x5Banner(text,sub,col,dur,dark){const U=x5UI(),b=U.ban;b.classList.remove('on');b.style.setProperty('--c',col||'#7dff9a');b.style.setProperty('--c2',dark||'#0a0612');b.style.setProperty('--d',(dur||1.9)+'s');
  b.querySelector('.tx').textContent=text;b.querySelector('.sb').textContent=sub||'';b.querySelectorAll('i').forEach(n=>n.remove());
  for(let k=0;k<9;k++){const i=document.createElement('i');i.style.top=(8+Math.random()*84)+'%';i.style.left=(Math.random()*40)+'%';i.style.width=(20+Math.random()*50)+'%';i.style.animationDelay=(Math.random()*.5)+'s';b.appendChild(i)}
  void b.offsetWidth;b.classList.add('on');clearTimeout(b._t);b._t=setTimeout(()=>b.classList.remove('on'),(dur||1.9)*1000+60)}
function x5VS(a,b,ca,cb,mid){const U=x5UI(),v=U.vs;v.classList.remove('on');v.querySelector('u').textContent=mid||'VS';v.querySelector('.l').textContent=a;v.querySelector('.r').textContent=b;v.style.setProperty('--ca',ca||'#7dff9a');v.style.setProperty('--cb',cb||'#b8a8ff');void v.offsetWidth;v.classList.add('on');clearTimeout(v._t);v._t=setTimeout(()=>v.classList.remove('on'),2260)}
/* one inverted frame, then a little hit-stop: the anime "impact frame" */
function x5Impact(ms,stop){const c=renderer.domElement;c.classList.add('x5imp');setTimeout(()=>c.classList.remove('x5imp'),ms||70);if(stop!==0)hitStop=Math.max(hitStop,stop||.12)}
function x5Grey(on){renderer.domElement.classList.toggle('x5grey',!!on)}
/* camera punch: fov kicks out and settles (gameplay camera) */
function x5Punch(amt,dur){X5.punch={a:amt||14,t:0,d:dur||.45}}
function x5White(up,hold,fn){const w=x5UI().white;w.style.transition=`opacity ${up||.5}s`;w.style.opacity='1';setTimeout(()=>{try{fn&&fn()}catch(x){console.warn(x)}w.style.transition='opacity 1.2s';setTimeout(()=>{w.style.opacity='0'},(hold||.2)*1000)},(up||.5)*1000+40)}
function x5Hint(text,fn){const h=x5UI().hint;if(!text){h.style.display='none';X5.hintFn=null;return}h.textContent=text;h.style.display='block';X5.hintFn=fn}
function x5Bars(n,cur){const b=x5UI().bars;n=0;if(!n){b.classList.remove('on');return}if(b.children.length!==n){b.innerHTML='';for(let k=0;k<n;k++)b.appendChild(document.createElement('i'))}for(let k=0;k<n;k++)b.children[k].className=k<cur?'d':k===cur?'c':'';b.classList.add('on')}
addEventListener('keydown',e=>{if(e.code!=='KeyE'||e.repeat||!started||CS.active||MODE==='open'||!X5.hintFn)return;e.stopPropagation();X5.hintFn()},true);

/* ---------- textures ---------- */
function x5Tex(){if(X5.tx)return X5.tx;const T={};
  T.brick=nzTex(256,256,x=>{x.fillStyle='#4c4d50';x.fillRect(0,0,256,256);for(let r=0;r<8;r++)for(let c=0;c<5;c++){const ox=(r%2)*26,g=rand(58,98)|0;x.fillStyle=`rgb(${g},${g+3},${g+2})`;x.fillRect(c*52-ox+2,r*32+2,48,28);x.fillStyle='rgba(20,40,24,'+rand(0,.28)+')';x.fillRect(c*52-ox+2,r*32+rand(8,22),48,rand(4,10))}
    for(let k=0;k<900;k++){x.fillStyle=`rgba(${rand(0,40)|0},${rand(10,50)|0},${rand(0,40)|0},.25)`;x.fillRect(rand(0,256),rand(0,256),rand(1,3),rand(1,3))}});T.brick.wrapS=T.brick.wrapT=THREE.RepeatWrapping;
  T.flag=nzTex(256,256,x=>{x.fillStyle='#2e2f33';x.fillRect(0,0,256,256);for(let r=0;r<4;r++)for(let c=0;c<4;c++){const g=rand(52,82)|0;x.fillStyle=`rgb(${g},${g},${g+4})`;x.fillRect(c*64+2,r*64+2,60,60)}
    for(let k=0;k<600;k++){x.fillStyle='rgba(10,14,12,.3)';x.fillRect(rand(0,256),rand(0,256),rand(1,4),rand(1,4))}for(let k=0;k<5;k++){x.fillStyle='rgba(30,70,50,.22)';x.beginPath();x.ellipse(rand(0,256),rand(0,256),rand(14,40),rand(8,22),rand(0,3),0,TAU);x.fill()}});T.flag.wrapS=T.flag.wrapT=THREE.RepeatWrapping;
  T.rose=nzTex(256,256,x=>{x.fillStyle='#000';x.fillRect(0,0,256,256);x.translate(128,128);const C=['#ff5a6a','#6ab0ff','#ffd060','#8aff90','#c080ff'];for(let ring=3;ring>=1;ring--){const n=ring*8;for(let k=0;k<n;k++){x.fillStyle=C[(k+ring)%5];x.beginPath();x.moveTo(0,0);x.arc(0,0,ring*40,k/n*TAU+.03,(k+1)/n*TAU-.03);x.fill()}x.fillStyle='#000';x.beginPath();x.arc(0,0,ring*40-30,0,TAU);x.fill()}
    x.fillStyle='#ffe8a0';x.beginPath();x.arc(0,0,9,0,TAU);x.fill();x.strokeStyle='#000';x.lineWidth=4;for(let k=0;k<16;k++){x.beginPath();x.moveTo(0,0);x.lineTo(Math.cos(k/16*TAU)*124,Math.sin(k/16*TAU)*124);x.stroke()}});
  T.smoke=nzTex(128,128,x=>{x.clearRect(0,0,128,128);for(let k=0;k<70;k++){const g=x.createRadialGradient(rand(10,118),rand(10,118),0,64,64,rand(20,60));g.addColorStop(0,'rgba(190,255,200,.16)');g.addColorStop(1,'rgba(0,0,0,0)');x.fillStyle=g;x.fillRect(0,0,128,128)}});T.smoke.wrapS=T.smoke.wrapT=THREE.RepeatWrapping;
  T.sig=nzTex(256,256,x=>{x.clearRect(0,0,256,256);x.strokeStyle='#fff';x.lineWidth=5;x.translate(128,128);x.beginPath();x.arc(0,0,118,0,TAU);x.stroke();x.beginPath();x.arc(0,0,96,0,TAU);x.stroke();
    x.beginPath();for(let k=0;k<=10;k++){const a=k/10*TAU-Math.PI/2,r=k%2?44:86;x[k?'lineTo':'moveTo'](Math.cos(a)*r,Math.sin(a)*r)}x.stroke();x.lineWidth=3;for(let k=0;k<24;k++){const a=k/24*TAU;x.beginPath();x.moveTo(Math.cos(a)*98,Math.sin(a)*98);x.lineTo(Math.cos(a)*116,Math.sin(a)*116);x.stroke()}});
  return X5.tx=T}
function x5Mats(){if(X5.M)return X5.M;const T=x5Tex();const rp=(t,a,b)=>{const c=t.clone();c.needsUpdate=true;c.repeat.set(a,b);return c};
  return X5.M={T,rp,wall:(a,b)=>std({map:rp(T.brick,a,b),color:0x9aa09a,roughness:.95,envMapIntensity:.15}),floor:(a,b)=>std({map:rp(T.flag,a,b),color:0xa0a4a8,roughness:.75,metalness:.1,envMapIntensity:.3}),
    stone:std({color:0x6a6e6c,roughness:.9,envMapIntensity:.15}),dark:std({color:0x18191c,roughness:1,envMapIntensity:0}),iron:std({color:0x24262c,roughness:.5,metalness:.7}),gold:std({color:0xd8b040,roughness:.35,metalness:.9,emissive:0x2a1c00}),
    bone:std({color:0xcdbb90,roughness:.7}),wood:std({color:0x4a3220,roughness:.8}),velvet:std({color:0x5a1020,roughness:.6,side:THREE.DoubleSide})}}

/* ================= THE ABBEY (on the square, cloaked until you tear it open) ================= */
function x5Abbey(){if(X5.ab||!NZ.g)return;const M=nzM(),Q=x5Mats();const G=new THREE.Group();NZ.g.add(G);X5.ab=G;G.visible=false;
  const B=(w,h,d,x,y,z,m)=>c2box(G,w,h,d,x,y,z,m||M.ben,false);const cz=-9872;
  B(28.5,18,16,-197.75,0,cz);                                   /* nave */
  for(const s of[-1,1])B(28.5,9,4.5,-197.75,0,cz+s*10.2);       /* side aisles */
  {const sh=new THREE.Shape();sh.moveTo(-8.4,0);sh.lineTo(8.4,0);sh.lineTo(0,7.5);const g=new THREE.ExtrudeGeometry(sh,{depth:28.5,bevelEnabled:false});const m=new THREE.Mesh(g,M.slate);m.rotation.y=Math.PI/2;m.position.set(-212,18,cz);m.castShadow=true;G.add(m)}
  for(const s of[-1,1]){const tz=cz+s*7.6;B(7.4,31,7.4,-180,0,tz);B(8.2,1.2,8.2,-180,31,tz);for(const a of[-1,1])for(const b of[-1,1]){nzCone(G,.75,5.5,-180+a*3.3,32,tz+b*3.3,M.ben,4);}
    nzCone(G,3.2,7,-180,32,tz,M.slate,4,Math.PI/4);for(const y of[10,19,26]){const w=new THREE.Mesh(new THREE.PlaneGeometry(1.5,4.2),M.glow(0xffd890,.55));w.position.set(-176.28,y,tz);w.rotation.y=Math.PI/2;G.add(w)}}
  B(4,23,7.8,-181.5,0,cz);{const sh=new THREE.Shape();sh.moveTo(-3.9,0);sh.lineTo(3.9,0);sh.lineTo(0,5);const g=new THREE.ExtrudeGeometry(sh,{depth:4,bevelEnabled:false});const m=new THREE.Mesh(g,M.ben);m.rotation.y=Math.PI/2;m.position.set(-183.5,23,cz);G.add(m)}
  {const rose=new THREE.Mesh(new THREE.CircleGeometry(3,40),new THREE.MeshBasicMaterial({map:Q.T.rose}));rose.position.set(-179.45,16,cz);rose.rotation.y=Math.PI/2;G.add(rose);X5.rose=rose;const rg=nzGlow(G,0xffc0a0,12,.3,-178.6,16,cz);X5.roseG=rg;
    const fr=new THREE.Mesh(new THREE.TorusGeometry(3.1,.28,8,40),M.ben);fr.position.copy(rose.position);fr.rotation.y=Math.PI/2;G.add(fr)}
  /* the great door: an arch, two leaves, and the Crown's smoke over it */
  {const ar=new THREE.Mesh(new THREE.TorusGeometry(2.9,.5,8,24,Math.PI),M.ben);ar.position.set(-179.3,6,cz);ar.rotation.y=Math.PI/2;G.add(ar);for(const s of[-1,1])B(.9,6,.9,-179.3,0,cz+s*2.9);
    const dm=std({color:0x2a1a12,roughness:.7});B(.4,6,5.6,-179.4,0,cz,dm);const top=new THREE.Mesh(new THREE.CircleGeometry(2.8,20,0,Math.PI),dm);top.position.set(-179.18,6,cz);top.rotation.y=Math.PI/2;G.add(top);
    const sm=new THREE.Mesh(new THREE.PlaneGeometry(6.4,9.4),new THREE.MeshBasicMaterial({map:Q.rp(Q.T.smoke,1,1.4),color:0x7dff9a,transparent:true,opacity:.75,blending:THREE.AdditiveBlending,depthWrite:false,side:THREE.DoubleSide}));sm.position.set(-178.9,4.7,cz);sm.rotation.y=Math.PI/2;G.add(sm);X5.seal=sm;nzGlow(G,0x60ff80,9,.35,-178.4,4,cz)}
  for(let k=0;k<5;k++)for(const s of[-1,1]){const bx=-186-k*5.6;B(1.3,13,2.2,bx,0,cz+s*13);nzCone(G,.8,3.4,bx,13,cz+s*13,M.ben,4);const st=new THREE.Mesh(new THREE.PlaneGeometry(1.6,5.5),M.glow(k%2?0x80b0ff:0xffb070,.5));st.position.set(bx+2.8,6.5,cz+s*12.48);st.rotation.y=s>0?0:Math.PI;G.add(st)}
  for(let k=0;k<3;k++)B(5,.3-k*.1+.1,10+k*1.4,-175.4+k*.9,0,cz,M.plain||M.ben);
  /* the crypt stair */
  {const S=WM.stair;for(const s of[-1,1])B(.9,4.2,.9,S.x+s*2.1,0,S.z);B(5.6,.9,1.2,S.x,4.2,S.z);const sh=new THREE.Shape();sh.moveTo(-2.9,0);sh.lineTo(2.9,0);sh.lineTo(0,2.4);const m=new THREE.Mesh(new THREE.ExtrudeGeometry(sh,{depth:1.2,bevelEnabled:false}),M.ben);m.position.set(S.x,5.1,S.z-.6);G.add(m);
    for(let k=0;k<5;k++)B(3.4,.25,.9,S.x,.02-k*.02,S.z-.6-k*.9,std({color:0x30302e-k*0x060606,roughness:1}));const hole=new THREE.Mesh(new THREE.PlaneGeometry(3.4,4.1),new THREE.MeshBasicMaterial({color:0x020403}));hole.position.set(S.x,2.05,S.z-1.2);G.add(hole);
    X5.stairG=nzGlow(G,0x60ff80,5,.5,S.x,2,S.z-.8);B(6.2,.2,6.4,S.x,0,S.z-2.6,M.plain||M.ben)}
  /* the veil: what you see before the cloak tears */
  const veil=new THREE.Mesh(new THREE.CylinderGeometry(25,25,36,48,1,true),new THREE.ShaderMaterial({uniforms:{uT:{value:0},uA:{value:.16}},transparent:true,depthWrite:false,side:THREE.DoubleSide,blending:THREE.AdditiveBlending,
    vertexShader:'varying vec2 vU;varying vec3 vP;void main(){vU=uv;vP=position;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}',
    fragmentShader:'uniform float uT,uA;varying vec2 vU;varying vec3 vP;float h(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}float n(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(h(i),h(i+vec2(1,0)),f.x),mix(h(i+vec2(0,1)),h(i+vec2(1,1)),f.x),f.y);}void main(){float a=n(vec2(vU.x*26.,vU.y*5.-uT*.35))*n(vec2(vU.x*9.+uT*.12,vU.y*14.));float e=smoothstep(0.,.25,vU.y)*smoothstep(1.,.5,vU.y);float l=pow(abs(sin(vU.x*60.+uT*.6+vU.y*3.)),30.);vec3 c=mix(vec3(.25,1.,.5),vec3(.7,.5,1.),vU.y);gl_FragColor=vec4(c,(a*.9+l*.5)*e*uA);}'}));
  veil.position.set(-190,18,cz);NZ.g.add(veil);X5.veil=veil;veil.visible=false;
  NZ.anim.push(dt=>{if(veil.visible)veil.material.uniforms.uT.value+=dt;if(G.visible&&X5.seal){X5.seal.material.map.offset.y-=dt*.12;X5.seal.material.opacity=.6+Math.sin(time*3)*.15;X5.stairG.material.opacity=.4+Math.sin(time*2.2)*.15}})}
function x5AbbeyShow(on){x5Abbey();if(!X5.ab)return;X5.shown=!!on;X5.ab.visible=!!on;X5.veil.visible=!on&&CH2.st>=17;
  if(on&&!X5.abBox){X5.abBox=[{x0:-212.5,x1:-183,z0:-9884.5,z1:-9859.5,h:26,nz:1},{x0:-184,x1:-176.2,z0:-9883.6,z1:-9860.4,h:34,nz:1}];for(const b of X5.abBox)boxes.push(b)}
  if(!on&&X5.abBox){for(const b of X5.abBox){const i=boxes.indexOf(b);if(i>=0)boxes.splice(i,1)}X5.abBox=null}}

/* ---------- arriving, and tearing the cloak: the pub ritual, but the Crown pushes back and Kaen joins ---------- */
function x5Arrive(){if(CS.active||X5.arr)return;X5.arr=1;sayHush();x5Abbey();const mp=V3(-156,0,-9872);x4Stage(mp,-Math.PI/2);P.face=-Math.PI/2;
  if(LYR.a){LYR.a.g.position.set(-156,0,-9869.2);LYR.a.g.rotation.y=-Math.PI/2;LYR.a.g.visible=true}if(KFW.a){KFW.a.g.position.set(-155.4,0,-9874.9);KFW.a.g.rotation.y=-Math.PI/2}KFW.pin=1;LYR.pin=1;X4.cc=V3(-170,0,-9872);
  const lS=(s,d)=>x4S(x4L,s,d||2.2,1.6),wS=(s,d)=>x4S(()=>P.pos,s,d||2.3,1.7),kS=(s,d)=>x4S(x4K,s,d||2.3,1.75);let pushed=0;const O=V3(-165,3.4,-9872);
  playCutscene([{dur:5,fov:50,title:['Chapter XV','Beneath Westminster'],cam:k=>({pos:V3(-120+k*-14,26-k*16,-9842-k*14),look:V3(-185,8+k*2,-9872)}),onStart:()=>{x4Talk('');X5.veil.visible=true;sx('wind',.5)}},
    {who:'@',text:XL3.mw_01,cam:wS(-1,2.3),onStart:()=>x4Talk('@')},{who:'Kaen',text:XL3.kw_01,cam:kS(1,2.4),onStart:()=>x4Talk('Kaen')},
    {who:'Lyra',text:XL3.lw_02,cam:lS(1.1,2.2),onStart:()=>x4Talk('Lyra'),update:()=>{X5.veil.material.uniforms.uA.value=lerp(X5.veil.material.uniforms.uA.value,.5,.03)}},
    {who:'@',text:XL3.mw_02,cam:wS(1,2.2),onStart:()=>x4Talk('@')},{who:'Lyra',text:XL3.lw_03,cam:lS(-1,2.1),onStart:()=>x4Talk('Lyra')},
    {dur:9999,rit:1,fov:52,cam:(k,t)=>{const e=RIT.e||0,a=Math.sin(t*.25)*.5;return{pos:V3(-150.5+a*.5,2+e*1.2,-9864.5-a*1.4-e*1.2),look:V3(-166,4+e*1.5,-9872.6)}},
      onStart:()=>{x4Talk('');ritStart();RIT.O.copy(O);if(RIT.g)RIT.g.position.copy(O);ritHead('TEAR THE CLOAK!',typeof isTouch!=='undefined'&&isTouch?'TAP FAST':'MASH  SPACE')},
      update:dt=>{ritTick(dt||.016);const e=RIT.e||0;X5.veil.material.uniforms.uA.value=.4+e*.9;
        if(RIT.ph===1&&e>.62&&!pushed){pushed=1;RIT.e=.12;P.shake=1.2;x5Impact(80,.1);sx('impact',.9,null,{rate:.7});flash(O,0x7dff9a,26);ring(V3(O.x,.2,O.z),0x7dff9a,1,18,.6);ritHead('IT PUSHES BACK!','KAEN JOINS YOU. AGAIN!');voPlay('Kaen',XL3.kw_02);try{KFW.a&&KFW.a.setBase('Spell_Simple_Idle_Loop',.3)}catch(x){}
          SM.emit(O,{n:30,c0:0x80ffa0,c1:0x06200c,s0:2,s1:6,life:1.4,a:.5,speed:8})}
        if(pushed){ritStream(ritHands(x4K(),-1),RIT.O,0xe8d8ff,0x5a20c0,e,.25);if(RIT.ph===1)RIT.e=Math.min(1,RIT.e+(dt||.016)*.05)}}},
    {dur:4,fov:62,cam:k=>({pos:V3(-149+k*4,1.6+k*3,-9862+k*3),look:V3(-184,10+k*4,-9872)}),onStart:()=>x5Reveal(O)},
    {who:'@',text:XL3.mw_03,cam:k=>({pos:V3(-152,1.5,-9870.4+k*.5),look:V3(-181,15,-9872)}),onStart:()=>{x4Talk('@')}},
    {who:'Kaen',text:XL3.kw_03,fov:44,cam:k=>({pos:V3(-168+k,3,-9866),look:V3(-179,4.4,-9872)}),onStart:()=>x4Talk('Kaen')},
    {who:'Lyra',text:XL3.lw_04,fov:46,cam:k=>({pos:V3(-160+k*-2,2.4,-9880),look:V3(WM.stair.x,1.8,WM.stair.z)}),onStart:()=>x4Talk('Lyra')}],
    ()=>{RIT.on=0;ritKill();if(!X5.shown)x5AbbeyShow(true);KFW.pin=0;LYR.pin=0;x4Talk('');P.heroAnim=null;X4.cc=null;try{LYR.a&&LYR.a.setBase('Idle_Loop',.3);KFW.a&&KFW.a.setBase('Idle_Loop',.3)}catch(x){}
      CH2.st=Math.max(CH2.st,18);ch2Save();toast('The doors are sealed. Take the <b>crypt stair</b> beside the Abbey.','Westminster Abbey',true)})}
function x5Reveal(O){RIT.on=0;const F=V3(-179,14,-9872);const beam=new THREE.Mesh(new THREE.CylinderGeometry(.2,.5,1,12,1,true),new THREE.MeshBasicMaterial({color:0xd8ffd0,transparent:true,blending:THREE.AdditiveBlending,depthWrite:false,side:THREE.DoubleSide}));scene.add(beam);
  const d=F.clone().sub(O),L=d.length();beam.position.copy(O).addScaledVector(d,.5);beam.scale.set(1,L,1);beam.quaternion.setFromUnitVectors(V3(0,1,0),d.clone().normalize());sx('unveil',1);P.shake=1.2;x5Impact(90,.14);
  addFx(beam,.8,(f,k)=>{beam.material.opacity=1-k*.6;beam.scale.x=beam.scale.z=1+k*5},()=>scene.remove(beam));
  x5White(.3,.25,()=>{ritKill();x5AbbeyShow(true);x5Banner('WESTMINSTER ABBEY','THE LAST VESSEL','#ffd890',2.4);
    const C=[0x7dff9a,0xf2eee6,0xa9dcbf,0xffffff,0xc890ff];for(let i=0;i<150;i++){const m=new THREE.Mesh(new THREE.PlaneGeometry(rand(.5,1.6),rand(.5,1.6)),new THREE.MeshBasicMaterial({color:C[i%5],transparent:true,side:THREE.DoubleSide,depthWrite:false}));
      m.position.set(-176+rand(-2,1),rand(1,30),-9872+rand(-13,13));scene.add(m);const v=V3(rand(3,14),rand(-1,5),rand(-4,4)),w=V3(rand(-6,6),rand(-6,6),rand(-6,6));addFx(m,rand(1.4,2.6),(f,k)=>{m.position.addScaledVector(v,.016);v.y-=.14;m.rotation.x+=w.x*.016;m.rotation.y+=w.y*.016;m.material.opacity=1-k},()=>{scene.remove(m);m.geometry.dispose()})}
    for(const tz of[-9864.4,-9879.6]){const pil=new THREE.Mesh(new THREE.CylinderGeometry(3,3,70,20,1,true),new THREE.MeshBasicMaterial({color:0xffe0a0,transparent:true,opacity:.45,blending:THREE.AdditiveBlending,depthWrite:false,side:THREE.DoubleSide}));pil.position.set(-180,35,tz);scene.add(pil);addFx(pil,2.6,(f,k)=>{pil.material.opacity=.45*(1-k);pil.scale.x=pil.scale.z=1-k*.7},()=>scene.remove(pil))}
    ring(V3(-176,.1,-9872),0xffd890,1,26,.9);sx('bigben',.8,null,{wet:.5});for(let k=0;k<8;k++)SP.emit(V3(-177,rand(2,28),-9872+rand(-12,12)),{n:30,c0:0xffffff,c1:0xffc060,speed:6,life:1.3,s0:.5,s1:.05})})}

/* ================= THE UNDERCROFT: one long level under the Abbey (a pocket south of the map) ================= */
function uBuild(){if(X5.built)return;X5.built=1;const Q=x5Mats(),G=new THREE.Group();scene.add(G);X5.ug=G;G.visible=false;const D2=THREE.DoubleSide;
  const add=(m,cast)=>{m.receiveShadow=true;if(cast)m.castShadow=true;G.add(m);return m};
  const box=(w,h,d,lx,y,s,mat)=>{const m=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),mat);m.position.set(uX(lx),y+h/2,uZ(s));return add(m)};
  const ceilM=std({map:Q.rp(Q.T.brick,6,12),color:0x6a706c,roughness:1,side:THREE.BackSide,envMapIntensity:.1});
  USEC.forEach((S,i)=>{const L=S.s1-S.s0,sc=(S.s0+S.s1)/2,esc=S.n==='esc',vault=S.hw<8;
    /* floor (the escape corridor climbs) */
    {const g=new THREE.PlaneGeometry(S.hw*2,L,1,esc?44:1);g.rotateX(-Math.PI/2);if(esc){const p=g.attributes.position;for(let k=0;k<p.count;k++)p.setY(k,uFloor(sc-p.getZ(k)));g.computeVertexNormals()}const m=new THREE.Mesh(g,Q.floor(S.hw/2.5,L/5));m.position.set(U0.x,0,uZ(sc));add(m)}
    const H=esc?S.h+18:S.h;for(const q of[-1,1])box(2,H+1,L,q*(S.hw+1),-.5,sc,Q.wall(L/7,H/5));
    if(vault&&!esc){const g=new THREE.CylinderGeometry(S.hw,S.hw,L,18,1,true,0,Math.PI);g.rotateX(Math.PI/2);g.rotateZ(Math.PI/2);const m=new THREE.Mesh(g,ceilM);m.position.set(U0.x,S.h-S.hw,uZ(sc));add(m);
      for(let s=S.s0+4;s<S.s1-1;s+=8){const r=new THREE.Mesh(new THREE.TorusGeometry(S.hw-.12,.32,6,16,Math.PI),Q.stone);r.position.set(U0.x,S.h-S.hw,uZ(s));add(r)}}
    else{const g=new THREE.PlaneGeometry(S.hw*2,L,1,esc?44:1);g.rotateX(Math.PI/2);if(esc){const p=g.attributes.position;for(let k=0;k<p.count;k++)p.setY(k,uFloor(sc-p.getZ(k)))}const m=new THREE.Mesh(g,Q.dark);m.position.set(U0.x,S.h,uZ(sc));add(m)}
    /* shoulders where the width changes, and a lintel over the narrow mouth */
    const N=USEC[i+1];if(N){const a=S.hw<N.hw?S:N,b=a===S?N:S,side=a===S?-1:1,w=b.hw-a.hw+1;for(const q of[-1,1])box(w,b.h+(esc?19:1),1.6,q*(a.hw+w/2),-.5,S.s1+side*.8*-1,Q.wall(w/7,b.h/5));
      if(b.h>a.h)box(a.hw*2+.2,b.h-a.h+3,1.6,0,a.h-(a.hw<8&&!esc?a.hw*.42:0)+(esc?uFloor(S.s1):0),S.s1+side*.8*-1,Q.wall(a.hw/3,1))}});
  box(12,9,2,0,-.5,-1,Q.wall(2,2));
  /* torches */
  const torch=(lx,s,y,c)=>{const p=uP(lx,s,y);const br=new THREE.Mesh(new THREE.CylinderGeometry(.06,.1,.9,6),Q.iron);br.position.copy(p).add(V3(0,-.5,0));add(br);const cup=new THREE.Mesh(new THREE.CylinderGeometry(.24,.12,.26,8),Q.iron);cup.position.copy(p).add(V3(0,-.08,0));add(cup);
    const g=glowSprite(c,1.9,.8);g.position.copy(p).add(V3(0,.3,0));G.add(g);X5.torch.push({p:p.clone().add(V3(0,.3,0)),g,c})};
  for(let s=14,k=0;s<96;s+=11,k++)torch(k%2?5:-5,s,3.4,0x7dff9a);for(const s of[140,146,210,214])torch(s%4?4:-4,s,3.2,0x7dff9a);
  for(let s=272,k=0;s<UE-6;s+=12,k++){const y=uFloor(s)+3.3,hw=uSec(s).hw;torch((k%2?1:-1)*(hw-.5),s,y,k<5?0x7dff9a:k<12?0xffc070:0xfff0d0)}
  /* the broken cistern, halfway out: pillars, shafts of daylight, cracks of green fire */
  {const cs0=322;for(let k=0;k<7;k++){const s=cs0+8+k*8.5,lx=(k%2?1:-1)*rand(3,8.5),y=uFloor(s),h=k%3===0?4.5:16;const c=new THREE.Mesh(new THREE.CylinderGeometry(1,1.15,h,10),Q.stone);c.position.copy(uP(lx,s,y+h/2-.3));add(c,true);X5.cols.push({x:uX(lx),z:uZ(s),r:1.35})}
    for(let k=0;k<6;k++){const s=cs0+10+k*11,lx=rand(-7,7);const sh=new THREE.Mesh(new THREE.CylinderGeometry(.7,2.8,17,12,1,true),new THREE.MeshBasicMaterial({color:0xfff0d0,transparent:true,opacity:.08,blending:THREE.AdditiveBlending,depthWrite:false,side:D2,fog:false}));sh.position.copy(uP(lx,s,uFloor(s)+8));G.add(sh);const d=glowSprite(0xfff0d0,5,.25,false);d.position.copy(uP(lx,s,uFloor(s)+.3));G.add(d)}
    X5.fiss=[];for(let k=0;k<4;k++){const s=cs0+12+k*15,lx=(k%2?-1:1)*5,w=13,y=uFloor(s);const m=new THREE.Mesh(new THREE.PlaneGeometry(w,1.6),new THREE.MeshBasicMaterial({color:0x7dff9a,transparent:true,opacity:.55,blending:THREE.AdditiveBlending,depthWrite:false}));m.rotation.x=-Math.PI/2;m.position.copy(uP(lx,s,y+.14));G.add(m);X5.fiss.push({lx,s,w,y,m})}}
  /* puddles, roots, rubble in the tunnel */
  const pud=std({color:0x0c1410,roughness:.08,metalness:.6,envMapIntensity:1.2});for(let k=0;k<9;k++){const m=new THREE.Mesh(new THREE.CircleGeometry(rand(.5,1.2),14),pud);m.rotation.x=-Math.PI/2;m.scale.y=rand(.5,1);m.position.copy(uP(rand(-4,4),rand(14,92),.03));add(m)}
  for(let k=0;k<26;k++){const s=rand(12,134),S=uSec(s);const L=rand(.6,1.8),q=Math.random()<.5?-1:1;const r=new THREE.Mesh(new THREE.CylinderGeometry(.02,.05,L,5),Q.wood);r.position.copy(uP(q*rand(.55,.95)*S.hw,s,S.h-(S.hw<8?S.hw*.5:0)-L/2-.1));r.rotation.set(rand(-.2,.2),0,rand(-.2,.2));add(r)}
  /* ---- the ossuary ---- */
  const col=(lx,s,r,h,mat)=>{const m=new THREE.Mesh(new THREE.CylinderGeometry(r*.86,r,h,12),mat||Q.stone);m.position.copy(uP(lx,s,h/2));add(m,true);const cap=new THREE.Mesh(new THREE.BoxGeometry(r*2.6,.6,r*2.6),mat||Q.stone);cap.position.copy(uP(lx,s,h-.3));add(cap);const ft=cap.clone();ft.position.y=.3;add(ft);X5.cols.push({x:uX(lx),z:uZ(s),r:r+.2})};
  for(const s of[106,118,130])for(const q of[-1,1])col(q*7.5,s,.9,12);
  {const sk=[];for(const hs of[101,110,122,133])for(const q of[-1,1])for(let k=0;k<22;k++){const a=rand(0,TAU),d=Math.sqrt(Math.random())*1.9;sk.push([q*(11.6-Math.abs(Math.cos(a))*d*.6),hs+Math.sin(a)*d,.2+(1-d/1.9)*1.25*Math.random()])}CITY_PARENT=G;instanced(new THREE.SphereGeometry(.24,7,6),Q.bone,sk,(o,p)=>{o.position.copy(uP(p[0],p[1],p[2]));o.scale.set(1,1.1,1.15);o.rotation.y=rand(0,6)});CITY_PARENT=null;
    for(const s of[104,116,128])for(const q of[-1,1])torch(q*12.4,s,4,0x7dff9a)}
  /* ---- the guardian hall ---- */
  for(const s of[160,174,188,201])for(const q of[-1,1])col(q*19,s,1.5,22);for(const s of[156,167,181,195])for(const q of[-1,1])torch(q*25.2,s,5.5,0x7dff9a);
  {const sg=new THREE.Mesh(new THREE.PlaneGeometry(26,26),new THREE.MeshBasicMaterial({map:Q.T.sig,color:0x3a8a4a,transparent:true,opacity:.5,blending:THREE.AdditiveBlending,depthWrite:false}));sg.rotation.x=-Math.PI/2;sg.position.copy(uP(0,178,.05));G.add(sg);X5.hallSig=sg;
    for(const q of[-1,1]){box(5,1.6,5,q*11,0,198,Q.stone);box(6,.4,6,q*11,0,198,Q.stone)}
    const dm=std({color:0x3a3024,roughness:.45,metalness:.6,emissive:0x0a1408});for(const q of[-1,1]){const d=box(4.3,6.6,.5,q*2.2,0,205.2,dm);d.userData.q=q;(X5.gdoor=X5.gdoor||[]).push(d)}
    const cs=new THREE.Mesh(new THREE.PlaneGeometry(5,5),new THREE.MeshBasicMaterial({map:Q.T.sig,color:0x7dff9a,transparent:true,opacity:.9,blending:THREE.AdditiveBlending,depthWrite:false,side:D2}));cs.position.copy(uP(0,204.8,3.6));G.add(cs);X5.gseal=cs;
    for(let k=0;k<14;k++){const c=new THREE.Mesh(new THREE.CylinderGeometry(.05,.05,rand(4,11),5),Q.iron);c.position.copy(uP(rand(-24,24),rand(152,204),22-c.geometry.parameters.height/2));add(c)}}
  /* ---- the crown chamber ---- */
  {const da=new THREE.Mesh(new THREE.CylinderGeometry(5.2,5.8,.5,28),Q.stone);da.position.copy(uP(0,256,.25));add(da);const da2=new THREE.Mesh(new THREE.CylinderGeometry(3.6,4,.4,28),Q.stone);da2.position.copy(uP(0,256,.7));add(da2);
    const ch=new THREE.Group();ch.position.copy(uP(0,256.6,.9));G.add(ch);X5.chair=ch;const W=Q.wood,Bx=(w,h,d,x,y,z,m)=>{const b=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),m||W);b.position.set(x,y+h/2,z);b.castShadow=true;ch.add(b);return b};
    Bx(1.9,.25,1.6,0,1,0);Bx(1.9,3.6,.22,0,1.1,-.7);for(const q of[-1,1]){Bx(.2,1.9,1.6,q*.95,1,0);Bx(.24,1,.24,q*.82,0,.6);Bx(.24,1,.24,q*.82,0,-.6);const f=new THREE.Mesh(new THREE.ConeGeometry(.16,.8,4),Q.gold);f.position.set(q*.86,5.1,-.7);ch.add(f)}
    {const sh=new THREE.Shape();sh.moveTo(-.95,0);sh.lineTo(.95,0);sh.lineTo(0,1.3);const m=new THREE.Mesh(new THREE.ExtrudeGeometry(sh,{depth:.22,bevelEnabled:false}),W);m.position.set(0,4.7,-.81);ch.add(m)}Bx(1.5,.5,1.1,0,.35,0,Q.stone);
    for(const q of[-1,1]){const bn=new THREE.Mesh(new THREE.PlaneGeometry(3.4,13),Q.velvet);bn.position.copy(uP(q*8,261.3,10));add(bn);const tr=new THREE.Mesh(new THREE.PlaneGeometry(2,2),new THREE.MeshBasicMaterial({map:Q.T.sig,color:0xd8b040,transparent:true,depthWrite:false}));tr.position.copy(uP(q*8,261.2,12));G.add(tr)}
    const fs=new THREE.Mesh(new THREE.PlaneGeometry(20,20),new THREE.MeshBasicMaterial({map:Q.T.sig,color:0x7dff9a,transparent:true,opacity:.35,blending:THREE.AdditiveBlending,depthWrite:false}));fs.rotation.x=-Math.PI/2;fs.position.copy(uP(0,238,.05));G.add(fs);X5.thrSig=fs;
    for(const s of[224,238,252])for(const q of[-1,1])col(q*16,s,1.2,20);X5.cols.push({x:uX(0),z:uZ(256.4),r:4.2})}
  /* ---- the light at the end ---- */
  {const y=uFloor(UE-1);const pl=new THREE.Mesh(new THREE.PlaneGeometry(9,8),new THREE.MeshBasicMaterial({color:0xffffff,fog:false}));pl.position.copy(uP(0,UE-.4,y+4));G.add(pl);for(const s of[6,14,26]){const g=glowSprite(0xfff4d8,s*2.4,.5,false);g.position.copy(uP(0,UE-1-s*.2,y+4));G.add(g)}X5.endLight=pl}
  /* ---- gates: bars and the Crown's smoke ---- */
  const gate=(k,s)=>{const S=uSec(s-.5),N=uSec(s+.5),hw=Math.min(S.hw,N.hw),h=Math.min(S.h,N.h);const g=new THREE.Group();g.position.copy(uP(0,s,uFloor(s)));G.add(g);
    for(let x=-hw+.5;x<hw;x+=.9){const b=new THREE.Mesh(new THREE.CylinderGeometry(.07,.07,h,5),Q.iron);b.position.set(x,h/2,0);g.add(b)}for(const y of[1.2,3.4,5.6]){const b=new THREE.Mesh(new THREE.BoxGeometry(hw*2,.14,.14),Q.iron);b.position.y=y;g.add(b)}
    const sm=new THREE.Mesh(new THREE.PlaneGeometry(hw*2,h),new THREE.MeshBasicMaterial({map:Q.rp(Q.T.smoke,2,1.5),color:0x7dff9a,transparent:true,opacity:.7,blending:THREE.AdditiveBlending,depthWrite:false,side:D2}));sm.position.y=h/2;g.add(sm);X5.gates[k]={s,open:0,g,sm,h}};
  gate('g1',50);gate('g2',136.4);gate('g3',206.4);gate('g4',262.4);
  for(let k=0;k<3;k++){const l=new THREE.PointLight(0x7dff9a,0,26,1.6);G.add(l);X5.lights.push(l)}}
function x5Gate(k,open,quiet){const g=X5.gates[k];if(!g||g.open===!!open)return;g.open=!!open;if(!open){g.g.visible=true;g.g.position.y=uFloor(g.s);return}
  if(quiet){g.g.visible=false;return}sx('pubdoor',.9,null,{rate:.7});P.shake=Math.max(P.shake,.4);const p=uP(0,g.s,2);SM.emit(p,{n:40,c0:0x90ffb0,c1:0x06200c,s0:2,s1:6,life:1.6,a:.5,speed:6});flash(p,0x7dff9a,10);
  addFx(null,1.3,(f,k2)=>{g.g.position.y=uFloor(g.s)+k2*k2*g.h;g.sm.material.opacity=.7*(1-k2)},()=>{g.g.visible=false})}

/* walls, shoulders, pillars and gates, for everything that walks or flies down here */
function x5Clamp(p,r){let s=uS(p.z),lx=p.x-U0.x;s=clamp(s,.6+r,UE-.8);const S=uSec(s);const hw=S.hw-r-.1;lx=clamp(lx,-hw,hw);
  const i=USEC.indexOf(S),A=USEC[i-1],B=USEC[i+1];if(B&&B.hw<S.hw&&s>S.s1-r&&Math.abs(lx)>B.hw-r)s=S.s1-r;if(A&&A.hw<S.hw&&s<S.s0+r&&Math.abs(lx)>A.hw-r)s=S.s0+r;
  for(const k in X5.gates){const g=X5.gates[k];if(g.open)continue;if(s>g.s-r-.3&&s<=g.s)s=g.s-r-.3;else if(s>g.s&&s<g.s+r+.3)s=g.s+r+.3}
  p.x=U0.x+lx;p.z=U0.z-s;for(const c of X5.cols){const dx=p.x-c.x,dz=p.z-c.z,d=Math.hypot(dx,dz),m=c.r+r;if(d<m&&d>1e-4){p.x=c.x+dx/d*m;p.z=c.z+dz/d*m}}
  const top=uFloor(s)+S.h-(p===P.pos?2.7:1.6);if(p.y>top)p.y=top}
{const _c=collide;collide=function(p,r,ghost,skip){_c.apply(this,arguments);if(x5In()&&p.z<-10090)x5Clamp(p,r)}}
{const _g=groundAt;groundAt=function(x,z,y){if(MODE!=='open'&&z<-10090&&X5.in)return uFloor(uS(z));return _g.apply(this,arguments)}}
{const _cb=camBlocked;camBlocked=function(x,y,z){if(x5In()&&z<-10090){const s=uS(z),S=uSec(s),lx=x-U0.x,f=uFloor(s);if(Math.abs(lx)>S.hw-.45||y>f+S.h-.5||y<f+.5||s<.8)return true;if(S.hw<8){const cy=f+S.h-S.hw;if(y>cy&&Math.hypot(lx,y-cy)>S.hw-.5)return true}
    for(const c of X5.cols)if(Math.hypot(x-c.x,z-c.z)<c.r+.3)return true;return false}return _cb.apply(this,arguments)}}
{const _v=validSpot;validSpot=function(x,z,m){if(x5In()&&z<-10090){const s=uS(z),S=uSec(s);if(Math.abs(x-U0.x)>S.hw-2||s<2||s>UE-2)return false;for(const c of X5.cols)if(Math.hypot(x-c.x,z-c.z)<c.r+1.5)return false;return true}return _v.apply(this,arguments)}}

function x5Enter(s){uBuild();X5.in=1;X5.ug.visible=true;WB.z0=-10650;for(const e of enemies)if(!e.dead)removeEnemy(e);for(const p of eProjs)scene.remove(p.s);eProjs.length=0;
  P.pos.set(uX(0),uFloor(s),uZ(s));P.vy=0;P.flying=false;P.glide=false;P.face=Math.PI;yaw=0;camera.position.set(P.pos.x,P.pos.y+4,P.pos.z+8);
  if(KFW.a)KFW.a.g.position.set(P.pos.x+1.4,P.pos.y,P.pos.z+1.6);if(LYR.a)LYR.a.g.position.set(P.pos.x-1.5,P.pos.y,P.pos.z+1.8);NZ.cp.copy(P.pos);SPAWN.copy(P.pos);x5Hint('')}
function x5Leave(to){X5.in=0;if(X5.ug)X5.ug.visible=false;WB.z0=NZB.z0;moonLight.intensity=.75;const p=to||V3(WM.stair.x,0,WM.stair.z+4);P.pos.set(p.x,groundAt(p.x,p.z),p.z);P.vy=0;P.flying=false;NZ.cp.set(-150,0,-9872);SPAWN.copy(NZ.cp);
  if(KFW.a)KFW.a.g.position.set(p.x+1.5,0,p.z+1.5);if(LYR.a)LYR.a.g.position.set(p.x-1.5,0,p.z+1.5);for(const l of X5.lights)l.intensity=0}
const X5CP=[5,46,131,152,221];
function x5Descend(){if(CS.active||X5.in||CH2.st<18)return;x5Hint('');sayHush();sx('pubdoor',.9,null,{rate:.6});const st=CH2.st;fadeEl.style.transition='opacity .5s';fadeEl.style.opacity='1';
  setTimeout(()=>{const cp=st>=20?4:st===19?3:X5.cp||0;x5UReset(cp);x5Enter(X5CP[cp]);fadeEl.style.transition='opacity 1.2s';fadeEl.style.opacity='0';
    if(cp===0){after(1.4,()=>x5Say('@','mw_04'));after(5.2,()=>x5Say('Kaen','kw_04'));after(.6,()=>toast('Something is feeding below. Follow the tunnel.','The Undercroft',true))}},560)}
/* put the level back the way a checkpoint expects it */
function x5UReset(cp){uBuild();X5.cp=cp;X5.wave={};for(const k of['g1','g2','g3','g4'])x5Gate(k,false);if(cp>=1){x5Gate('g1',true,true);X5.wave.a=X5.wave.sc=X5.wave.scD=1}if(cp>=2){x5Gate('g2',true,true);X5.wave.b=X5.wave.mo=X5.wave.moD=1}
  if(cp>=4)x5Gate('g3',true,true);if(typeof x5GReset==='function')x5GReset();if(typeof x5CReset==='function')x5CReset()}

/* ---------- bats ---------- */
ETYPES.ubat=Object.assign({},ETYPES.nbat,{name:'Abbey bat',hp:34,dmg:7,xp:30});
function buildDireBat(s,eye,furC){const m=buildNBat();m.body.scale.setScalar(s);m.body.traverse(o=>{if(o.isSprite){o.material=o.material.clone();o.material.color.setHex(eye);o.scale.multiplyScalar(1.5)}else if(o.isMesh&&o.material&&o.material.color&&o.material.roughness>.9){o.material=o.material.clone();o.material.color.setHex(furC)}else if(o.isMesh&&o.material&&o.material.color){o.material=o.material.clone();o.material.color.setHex(0x2a1048);if(o.material.emissive)o.material.emissive.setHex(0x180630)}});
  const au=glowSprite(eye,s*2.2,.22);m.body.add(au);const a0=m.anim;return{g:m.g,body:m.body,anim:(e,dt,mv,l)=>{const t0=e.t;e.t=t0*.34;a0(e,dt,mv,l);e.t=t0;m.body.position.y=1.6+Math.sin(e.t*2.4)*.35}}}
ETYPES.screech={name:'Old Screech, Bat of the Undercroft',boss:true,hp:2600,speed:9.5,dmg:26,range:0,cd:9,xp:900,r:2.7,h:4.8,fly:1,ghost:true,noCalm:true,build:()=>buildDireBat(4.5,0xc070ff,0x0b0a10)};
ETYPES.belfry={name:'Mother of the Belfry',boss:true,hp:3900,speed:7.5,dmg:28,range:0,cd:9,xp:1400,r:3.4,h:6,fly:1,ghost:true,noCalm:true,build:()=>buildDireBat(5.8,0xff4080,0x0b0a10)};
function x5Bats(n,s0,s1,y0){for(let k=0;k<n;k++){const S=uSec(s0);const e=nzSpawnFly('ubat',uP(rand(-S.hw,S.hw)*.8,rand(s0,s1),(y0||3)+rand(0,2.5)));e.quest=true;e.x5b=1}sx('bats',.7)}
const x5BatsLeft=()=>enemies.filter(e=>!e.dead&&e.x5b).length;
/* a cone of sound: telegraphed, then it hurts and shoves */
function x5Scream(e,col,half,range){const o=V3(e.pos.x,groundAt(e.pos.x,e.pos.z),e.pos.z),dir=V3(P.pos.x-o.x,0,P.pos.z-o.z).normalize();e.busy=1.5;e.m.g.rotation.y=Math.atan2(dir.x,dir.z);
  coneTelegraph(o,dir,range,half,.9,col,()=>{if(e.dead)return;sx('cackle',.9,null,{rate:.6});sx('bats',.5,null,{rate:1.5});P.shake=Math.max(P.shake,.5);
    for(let k=0;k<5;k++)after(k*.07,()=>{const m=new THREE.Mesh(new THREE.TorusGeometry(1,.07,5,26,half*2),new THREE.MeshBasicMaterial({color:col,transparent:true,blending:THREE.AdditiveBlending,depthWrite:false,side:THREE.DoubleSide}));m.position.set(o.x,e.pos.y+1.6,o.z);m.rotation.set(Math.PI/2,0,Math.atan2(dir.x,dir.z)-Math.PI/2-half+Math.PI);
      addFx(m,.5,(f,q)=>{m.scale.setScalar(1+q*range);m.material.opacity=.9*(1-q)},()=>{scene.remove(m);m.geometry.dispose()})});
    if(inCone(P.pos,o,dir,range,half)){damagePlayer(e.dmg*1.25);P.vy=Math.max(P.vy||0,5);const kb=dir.clone().multiplyScalar(5);addFx(null,.25,(f,q)=>{P.pos.addScaledVector(kb,.016*4*(1-q))});x5Punch(10,.35)}})}
function x5Dive(e,col,w){const from=e.pos.clone(),dv=V3(P.pos.x-from.x,0,P.pos.z-from.z).normalize(),to=P.pos.clone().addScaledVector(dv,5);to.y=groundAt(to.x,to.z)+.6;e.busy=1.4;sx('garg',.7,null,{rate:1.3});
  lineTelegraph(V3(from.x,groundAt(from.x,from.z),from.z),V3(to.x,to.y-.6,to.z),w,.75,col,()=>{if(!e.dead)e.dash={a:e.pos.clone(),b:to,t:0,dur:.42,w}})}
function x5DashStep(e,dt,col){const D=e.dash;D.t+=dt;const k=Math.min(1,D.t/D.dur);e.pos.lerpVectors(D.a,D.b,k*k*(3-2*k));SP.emit(eCenter(e),{n:4,c0:col,c1:0x101810,speed:2,life:.4});if(!D.hit&&Math.hypot(e.pos.x-P.pos.x,e.pos.z-P.pos.z)<(D.w||3)*.6+1&&Math.abs(e.pos.y-P.pos.y)<4){D.hit=1;damagePlayer(e.dmg*1.4);P.shake=.7;x5Punch(12,.3)}if(k>=1)e.dash=null}
BOSSAI.screech=function(e,dt,d){const a=e.ai,rage=e.hp<e.maxhp*.5;a.a1-=dt;a.a2-=dt;a.a3-=dt;if(e.dash){x5DashStep(e,dt,0x9dff70);return}const gy=groundAt(e.pos.x,e.pos.z);e.pos.y=lerp(e.pos.y,gy+2.2+Math.sin(e.t*1.6)*.8,Math.min(1,dt*2.5));if(e.busy>0)return;
  if(a.a1<=0&&d<20){a.a1=rage?3.4:4.8;x5Scream(e,0x9dff70,.5,17)}else if(a.a2<=0&&d<34){a.a2=rage?4:5.6;x5Dive(e,0x9dff70,3)}
  else if(a.a3<=0){a.a3=rage?7:10;e.busy=.5;const c=eCenter(e),n=rage?7:5,base=aimAtPlayer(c).normalize();for(let k=0;k<n;k++)after(k*.07,()=>{if(!e.dead)enemyOrb(eCenter(e),base.clone().applyAxisAngle(V3(0,1,0),(k-(n-1)/2)*.16),17,e.dmg*.4,0x9dff70,.36,{keepY:true,life:2.4})})}};
BOSSAI.belfry=function(e,dt,d){const a=e.ai,rage=e.hp<e.maxhp*.5;a.a1-=dt;a.a2-=dt;a.a3-=dt;a.a4-=dt;if(e.dash){x5DashStep(e,dt,0xff5070);return}const gy=groundAt(e.pos.x,e.pos.z);e.pos.y=lerp(e.pos.y,gy+(a.roost>0?7.5:2.6)+Math.sin(e.t*1.4),Math.min(1,dt*2.2));a.roost=(a.roost||0)-dt;if(e.busy>0)return;
  if(a.a3<=0&&x5BatsLeft()<5){a.a3=rage?9:13;e.busy=1;a.roost=2.4;sx('bats',.9);x5Bark('Lyra','lw_06');for(let k=0;k<(rage?6:4);k++){const b=nzSpawnFly('ubat',V3(e.pos.x+rand(-4,4),e.pos.y+rand(0,3),e.pos.z+rand(-4,4)));b.quest=true;b.x5b=1}}
  else if(a.a1<=0&&d<24){a.a1=rage?3.6:5;x5Scream(e,0xff5070,.62,19)}else if(a.a2<=0&&d<36){a.a2=rage?3.4:5;x5Dive(e,0xff5070,4);if(rage)after(1.5,()=>{if(!e.dead&&!e.dash)x5Dive(e,0xff5070,4)})}
  else if(a.a4<=0){a.a4=rage?6:9;e.busy=.8;for(let k=0;k<(rage?5:3);k++){const p=V3(P.pos.x+rand(-5,5),0,P.pos.z+rand(-5,5));after(k*.25,()=>{if(e.dead)return;p.y=groundAt(p.x,p.z);telegraph(p,2.4,.8,0xff5070,()=>{SM.emit(V3(p.x,p.y+1,p.z),{n:16,c0:0xff7090,c1:0x200810,s0:1.5,s1:4,life:.9,a:.5,up:3});flash(p,0xff5070,6);sx('impact',.4,null,{rate:1.4});if(playerIn(p,2.5))damagePlayer(e.dmg*.9)})})}}};
/* XV enemies die on our terms: no Paris boss outro */
{const _ke=killEnemy;killEnemy=function(e){if(e&&e.x5){const c=eCenter(e),f=e.x5;e.x5=null;STATS.kills++;SP.emit(c,{n:140,c0:0xffffff,c1:0x7dff9a,speed:16,life:1.1,s0:.8,s1:.08,grav:3});SM.emit(c,{n:30,c0:0x80a088,c1:0x0a140c,s0:3,s1:8,life:2,a:.6,up:2});flash(c,0x9dff70,14);P.shake=1.2;sfx.boom();x5Impact(70,.14);if(e.xp)gainXP(e.xp);removeEnemy(e);try{f(e,c)}catch(x){console.warn(x)}return}return _ke.apply(this,arguments)}}
function x5Boss(type,at,y,onDead){const e=spawnEnemy(type,V3(at.x,0,at.z));e.pos.y=y==null?groundAt(at.x,at.z):y;e.aggro=true;e.quest=true;e.x5=onDead||(()=>{});e.m.g.children.forEach(c=>{if(c.material&&c.material.map===scorchTex)c.visible=false});bossRef=e;$('boss').classList.remove('hidden');return e}

/* ---------- the level, frame by frame ---------- */
function x5UTick(dt){const s=uS(P.pos.z),S=uSec(s),W=X5.wave;X5.t+=dt;
  /* dark, green, close */
  scene.fog.color.setHex(S.n==='esc'?0x141a16:0x070a09);scene.fog.density=S.n==='esc'?lerp(.03,.012,clamp((s-262)/(UE-272),0,1)):S.hw>12?.011:.03;hemi.intensity=S.n==='esc'?.3+clamp((s-(UE-120))/110,0,1)*.9:S.hw>12?.62:.3;moonLight.intensity=0;
  const near=X5.torch.map(t=>[t,t.p.distanceToSquared(P.pos)]).sort((a,b)=>a[1]-b[1]);X5.lights.forEach((l,i)=>{const t=near[i]&&near[i][0];if(!t||near[i][1]>1400){l.intensity=0;return}l.position.copy(t.p);l.color.setHex(t.c);l.intensity=1.5+Math.sin(time*9+i*3)*.25});
  for(let i=0;i<Math.min(5,near.length);i++){const t=near[i][0];t.g.material.opacity=.65+Math.random()*.3;if(Math.random()<.5)FL.emit(t.p,{n:1,c0:0xffffff,c1:t.c,s0:.5,s1:.05,life:.5,up:1.6,jitter:.08})}
  for(const k in X5.gates){const g=X5.gates[k];if(!g.open)g.sm.material.map.offset.y-=dt*.2}
  if(Math.random()<.25){const p=uP(rand(-S.hw,S.hw),s+rand(4,30),rand(.5,S.h-1));p.y+=uFloor(uS(p.z));SP.emit(p,{c0:0xb0ffc0,c1:0x103018,s0:.14,s1:.02,life:2.4,speed:.2,a:.6})}
  for(const e of enemies){if(e.dead)continue;if(e.def.fly&&e.pos.z<-10090){const es=uS(e.pos.z),top=uFloor(es)+uSec(es).h-e.def.h*.6;if(e.pos.y>top)e.pos.y=top}}
  if(CS.active||!P.alive)return;
  if(CH2.st===18){
    if(s>17&&!W.a){W.a=1;x5Bats(DIFF==='easy'?6:9,26,44);x5Bark('Lyra','lw_05')}
    if(W.a&&!W.sc&&(s>31||x5BatsLeft()<3)){W.sc=1;x5Banner('OLD SCREECH','BAT OF THE UNDERCROFT','#9dff70',1.9);sx('cackle',.9,null,{rate:.7});x5Punch(12,.4);const e=x5Boss('screech',uP(0,44),7,()=>{W.scD=1;x5Gate('g1',true);X5.cp=1;NZ.cp.copy(uP(0,X5CP[1]));after(1.2,()=>x5Say('@','mw_05'));for(const b of enemies)if(b.x5b&&!b.dead)damageEnemy(b,1e7)});X5.mini=e;x5Bark('Kaen','kw_05')}
    if(W.scD&&s>58&&!W.b){W.b=1;x5Bats(DIFF==='easy'?7:11,68,90)}
    if(W.b&&!W.mo&&s>99){W.mo=1;x5Banner('MOTHER OF THE BELFRY','SHE CALLS THE COLONY','#ff5070',2.1,'#14060a');sx('cackle',1,null,{rate:.55});x5Punch(14,.45);const e=x5Boss('belfry',uP(0,122),9,()=>{W.moD=1;x5Gate('g2',true);X5.cp=2;NZ.cp.copy(uP(0,X5CP[2]));for(const b of enemies)if(b.x5b&&!b.dead)damageEnemy(b,1e7);after(1.6,()=>x5Say('Kaen','kw_06'))});X5.mini=e}
    if(W.moD&&s>151&&typeof x5GIntro==='function')x5GIntro()}
  if(typeof x5GTick==='function')x5GTick(dt,s);if(typeof x5CTick==='function')x5CTick(dt,s)}
{const _mt=muTick;muTick=function(dt){_mt(dt);if(!started||MODE==='open')return;
  if(X5.punch){const p=X5.punch;p.t+=dt;const k=p.t/p.d;if(k>=1){X5.punch=null;if(!CS.active){camera.fov=60;camera.updateProjectionMatrix()}}else if(!CS.active){camera.fov=60+p.a*Math.sin(Math.min(1,k*3)*Math.PI/2)*(1-k);camera.updateProjectionMatrix()}}
  if(CH2.zone!=='north'){if(X5.in)x5Leave();return}
  if(X5.in){try{x5UTick(dt)}catch(x){console.warn('x5',x)}return}
  if(CH2.st>=17&&!X5.ab)x5Abbey();if(X5.ab){const want=CH2.st>=18;if(X5.shown!==want&&!CS.active)x5AbbeyShow(want);if(X5.veil)X5.veil.visible=!X5.shown&&CH2.st===17}
  if(CS.active||!P.alive||KM.on)return;const dq=Math.hypot(P.pos.x-WM.sq.x,P.pos.z-WM.sq.z);
  if(CH2.st===17){if(!X5.intro&&!X4.fight){X5.intro+=0;X5.it=(X5.it||0)+dt;if(X5.it>4){X5.intro=1;x5Say('Lyra','lw_01');toast('The last vessel is the Abbey at <b>Westminster</b>, beside Big Ben.','Chapter XV: Beneath Westminster',true)}}
    if(dq<30&&P.pos.y<12)x5Arrive()}
  if(CH2.st>=18&&CH2.st<=20){const ds=Math.hypot(P.pos.x-WM.stair.x,P.pos.z-WM.stair.z);if(ds<4.2&&!P.flying)x5Hint((typeof isTouch!=='undefined'&&isTouch?'TAP':'PRESS E')+' · THE CRYPT STAIR',x5Descend);else if(X5.hintFn===x5Descend)x5Hint('')}
  if(typeof x5OTick==='function')x5OTick(dt,dq)}}
{const _rv=revive;revive=function(){const was=X5.in,st=CH2.st;if(KM.on&&st>=17)try{kmEnd()}catch(x){}const r=_rv.apply(this,arguments);try{x5Grey(0);x5Bars(0);if(was&&st>=18&&st<=20){const cp=st>=20?4:st===19?3:X5.cp||0;x5UReset(cp);x5Enter(X5CP[cp])}else if(st>=17&&typeof x5ORevive==='function')x5ORevive()}catch(x){console.warn(x)}return r}}

/* ---------- objectives and chapter select ---------- */
{const _xo=xiiObj;xiiObj=function(){const st=CH2.st;if(st<17)return _xo.apply(this,arguments);if(CH2.zone==='paris')return 'Ask <b>Lyra</b> for the door to Calais, then fly back to London';const d=Math.round(Math.hypot(P.pos.x-WM.sq.x,P.pos.z-WM.sq.z));
  if(st===17)return `Fly to <b>Westminster</b>, beside Big Ben · ${d}m`;
  if(st===18)return X5.in?(X5.mini&&!X5.mini.dead?`Defeat <b>${X5.mini.def.name.split(',')[0]}</b>`:'Follow the tunnel under the Abbey'):'Take the <b>crypt stair</b> beside the Abbey · press <b>E</b>';
  if(st===19)return X5.in?(typeof x5GObj==='function'?x5GObj():'Defeat the guardians'):'Go back down the <b>crypt stair</b>';
  if(st===20)return X5.in?(typeof x5CObj==='function'?x5CObj():''):'Go back down the <b>crypt stair</b>';
  if(st===21||st===22)return typeof x5OObj==='function'?x5OObj(d):'';return 'The Crown fled, weakened. It still has Morwen, and it is feeding on her. More is coming.'}}
CHAPTERS.push({id:'under',n:'XV',title:'Beneath Westminster',desc:'A cloaked abbey, a tunnel full of wings, and two guardians of stone.'},{id:'crown',n:'XVI',title:'The Hollow Crown',desc:'The smoke in the chair, the run to the light, every old face. And yours.'});
{const _cb=chapBoss;chapBoss=function(c){if(c.id==='under'||c.id==='crown')return null;return _cb(c)}}
function x5Reset(){x5Hint('');x5Bars(0);x5Grey(0);if(X5.in)x5Leave();X5.arr=0;X5.intro=0;X5.it=0;X5.said={};X5.cp=0;X5.wave={};X5.mini=null;if(typeof x5GReset==='function')x5GReset();if(typeof x5CReset==='function')x5CReset();if(typeof x5OReset==='function')x5OReset()}
{const _ac=applyChapter;applyChapter=function(id){x5Reset();if(id!=='under'&&id!=='crown'){const r=_ac.apply(this,arguments);if(X5.ab&&CH2.st<18)x5AbbeyShow(false);return r}_ac.call(this,'smoke');
  CH2.st=id==='under'?17:20;ch2Save();after(.7,()=>toast(id==='under'?'The last vessel is the Abbey at <b>Westminster</b>, beside Big Ben.':'The guardians are down. Take the <b>crypt stair</b> back under the Abbey.',id==='under'?'Chapter XV: Beneath Westminster':'Chapter XVI: The Hollow Crown',true));beaten.add('desmond');X4.t13=0;try{nhOpen()}catch(x){}const g=V3(-140,0,-9858);P.pos.set(g.x,groundAt(g.x,g.z),g.z);P.face=Math.PI;yaw=0;if(id==='under'){P.pos.set(-108,0,-9770);X5.intro=0}else X5.intro=1;
  if(KFW.a)KFW.a.g.position.set(P.pos.x+1.4,P.pos.y,P.pos.z+1.4);lyraPlace(P.pos.x-1.6,P.pos.z+1.6,Math.PI);LYR.home=false;x5Abbey();x5AbbeyShow(id==='crown');
}}
{const _rc=renderChapters;renderChapters=function(){_rc();const list=$('chapList');if(!list)return;const mark=(id,a,b)=>{const el=list.children[chapIndexOf(id)];if(el){const done=CH2.st>=b,cur=started&&CH2.st>=a&&CH2.st<b;el.className='chap'+(done?' done':'')+(cur?' cur':'')}};mark('under',17,20);mark('crown',20,23);
  const el=list.children[chapIndexOf('smoke')];if(el&&CH2.st>=17)el.className='chap done'}}
