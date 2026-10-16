
/* ---------- Orson quest: rue Henri Moissan -> Pantin -> betrayal -> gold chain boss -> Range Rover -> back to Jean-Val-J ---------- */
Object.assign(SPEAKER,{'Orson':'#f2c14a','Jean-Val-J':'#a8c0ff'});
/* cutscene lines fall back to the recorded NPC pack when they are not in the story VO map */
{const _vp=voPlay;voPlay=function(who,text,shot){if(VO_MAP[text])return _vp(who,text,shot);if(!text||!who||muted||CS.skipping)return;if(who==='@'&&HERO.g!=='f')return;
  const k=nvFind(text,who==='@'?'f':null);if(!k)return;voStop();nvPlayKey(k,1,6,{cs:1});clipLoad(k).then(b=>{if(b&&shot&&CS.active&&CS.shots[CS.i]===shot)shot._dur=Math.max(shot._dur,b.duration+.55)})}}
const OQ_L={
 meet:[['Orson','Ah. The famous witch. You know who I am? Orson. Everybody in the seventh knows Orson.'],['@','Never heard of you.'],['Orson','Pff. Cute. Listen, I have a little problem. Someone took my gold. A lot of gold.'],['Orson','An old man in the Cimetière de Pantin. Jean-Val-J. He sits on it like a dragon. Bring it back to me.'],['@','And what do I get?'],['Orson','My eternal gratitude. And maybe I let you sit in my Range Rover. Maybe.'],['@','Fine. But if this is a trick, Orson...'],['Orson','A trick? Me? Look at this face.']],
 wait:['Pantin, sorcière. The cemetery. The gold. Allez, allez.','You are still here? My gold is not going to walk to me.'],
 take:[['Jean-Val-J','Who walks between my graves at this hour?'],['@','I\'m here for Orson\'s gold. Hand it over, old man.'],['Jean-Val-J','Orson\'s gold... Is that what he told you?'],['Jean-Val-J','Take it, then, little witch. Gold always finds its way home. And so will you.']],
 idle:['These graves are quiet. Keep it that way.','I am waiting, witch. I have all the time in the world.'],
 betray:[['Orson','Ha... ha ha HA! You actually did it!'],['@','Here\'s your gold. Now, what\'s so funny?'],['Orson','My gold? This was never my gold, chérie. This is Jean-Val-J\'s gold. And you just stole it for me.'],['@','You used me.'],['Orson','Of course I used you. That is what witches are for. Now give me the bag, and walk away.'],['@','Come and take it.'],['Orson','With pleasure. You know what level I am? Eighty. Eighty, chérie.']],
 fight:['Gold never loses, chérie.','You cannot afford me.','I\'ll bury you in coins!','This chain costs more than your whole street.','My jacket! Do you know how much this cost?','Not the face! Not the face!','You think you can beat Orson? In MY arrondissement?'],
 defeat:[['Orson','Okay, okay... this is not finished, witch!'],['Orson','Fine! Keep the gold! I have more anyway.'],['@','Run along, Orson.'],['Orson','You will regret this, witch! Nobody humiliates Orson in the seventh!']],
 bitter:['Oh. It\'s you. Don\'t talk to me.','I\'m not fighting you again. My lawyer said no.','Enjoy your little victory. I bought a new Range Rover anyway.','Jean-Val-J sends his regards? Tell him I said nothing.','Go away. People are watching.'],
 ret:[['Jean-Val-J','So. The gold comes home.'],['@','I\'m sorry. Orson lied to me, and I believed him. Here. It\'s all there.'],['Jean-Val-J','An apology. Rarer than gold, these days. I accept it.'],['Jean-Val-J','His father tried the same trick forty years ago. The apple does not fall far.'],['Jean-Val-J','Keep a coin, witch. A reminder that not everything that shines is yours.']],
 after:['Ah, the honest witch. Paris needs more of you.','Orson came by last night. He did not stay long.'],
 hero1:'Pantin. A cemetery full of gold. What could go wrong?',hero2:'That old man knew something. I don\'t like this.'};
const OQ={st:0,said1:false,said2:false,n:null,j:null,fight:null,esc:null,chest:null,props:null,ln:0};
const OQ_KEY='sorciere-orson';
function oqLoad(){try{const s=JSON.parse(localStorage.getItem(OQ_KEY)||'null');if(s){OQ.st=s.st|0;if(OQ.st===3)OQ.st=2;OQ.said1=!!s.said1}}catch(e){}}
function oqSave(){try{localStorage.setItem(OQ_KEY,JSON.stringify({st:OQ.st,said1:OQ.said1}))}catch(e){}}
function oqSay(who,text,at){cineLine(who,text);const k=nvFind(text,who==='@'?'f':null);if(!k||(who==='@'&&HERO.g!=='f'))return;const d=at?Math.hypot(at.x-P.pos.x,at.z-P.pos.z):0;nvPlayKey(k,clamp(1/(1+d*.05),.25,1),4,{oq:1})}
function oqNpcSay(n,text){n.face=Math.atan2(P.pos.x-n.x,P.pos.z-n.z);n.expr=1;bubble(n,text,3.5);const k=nvFind(text,'m');if(k)nvPlayKey(k,1,4,n)}
function oqShot(n){const tall=n===OQ.n?2.35:2.05;return()=>{const d=V3(P.pos.x-n.x,0,P.pos.z-n.z).normalize();const r=V3(d.z,0,-d.x);return{pos:V3(n.x,n.y+tall-.15,n.z).addScaledVector(d,2.7).addScaledVector(r,1.9),look:V3(n.x,n.y+tall-.25,n.z)}}}
function oqShots(lines,n){return lines.map(([w,t])=>({who:w,text:t,cam:w==='@'?witchShot(1,3.6):oqShot(n),onStart:()=>{n.expr=1;n.face=Math.atan2(P.pos.x-n.x,P.pos.z-n.z)}}))}
/* ---------- NPCs ---------- */
const OQ_PANTIN=[48.9028,2.4108],OQ_MOISSAN=[48.86202,2.30752];
function oqSetup(){if(MODE!=='open'||OQ.n)return;oqLoad();
  const so={kind:'host',oq:1,ll:OQ_MOISSAN,r:5,arch:'posh',name:'Orson',job:'rue Henri Moissan, 7e',mark:'!',protect:true,calm:true,seed:hashS('orson-7e'),
    look:{female:false,f:false,age:27,h:1.1,w:1.12,skin:hx3('#ffffff'),jk:hx3('#1b2540'),jkP:0,top:hx3('#f7f7f4'),topP:0,bot:hx3('#2a2c33'),botP:0,shoe:hx3('#4a2a16'),shades:false,glasses:false,hairS:0,hairC:hx3('#9c7442'),beard:false,mus:false,face:9,prop:null,scarf:null,bag:null,hat:-1},
    label:()=>OQ.st>=5?'Orson':'Talk to Orson',sub:()=>OQ.st===0?'Looks rich. Looks bored.':OQ.st===1?'Waiting for his gold':OQ.st===2?'Bring him the gold?':OQ.st>=5?'Still sulking':'',
    showMark:()=>OQ.st===0||OQ.st===2,open:oqOrson};
  OQ.n=addSpecial(so);
  const sj={kind:'host',oq:1,ll:OQ_PANTIN,r:8,arch:'elderly',name:'Jean-Val-J',job:'Cimetière de Pantin',mark:'!',markC:'#a8c0ff',protect:true,calm:true,seed:hashS('jvj-pantin'),
    look:{female:false,f:false,age:79,coat:hx3('#24242a'),coatP:0,hat:1,hatC:hx3('#141414'),hairC:hx3('#e8e6e0'),beard:true,face:15,prop:'cane',glasses:false},
    label:()=>'Talk to Jean-Val-J',sub:()=>OQ.st===4?'Return the gold':OQ.st>=5?'The honest witch\'s friend':'Old man among the graves',
    showMark:()=>OQ.st===1||OQ.st===4,open:oqJvj};
  OQ.j=addSpecial(sj);oqProps();
  if(OQ.st===1)setWaypoint(OQ.j.x,OQ.j.z,'Cimetière de Pantin');else if(OQ.st===2)setWaypoint(OQ.n.homeX,OQ.n.homeZ,'Orson');else if(OQ.st===4){oqHideOrson(true);setWaypoint(OQ.j.x,OQ.j.z,'Jean-Val-J')}}
function oqHideOrson(h){const n=OQ.n;if(!n)return;if(h){n.x=n.homeX+99999;n.z=n.homeZ+99999}else{n.x=n.homeX;n.z=n.homeZ;n.y=n.gy=groundAt(n.x,n.z)}}
/* little cemetery around Jean-Val-J, plus his gold */
function oqProps(){const j=OQ.j;if(!j||OQ.props)return;const g=new THREE.Group();scene.add(g);OQ.props=g;
  const stone=std({color:0x8a8a86,roughness:.92}),dark=std({color:0x4a4a48,roughness:.95}),cyp=std({color:0x1c3220,roughness:.9});
  const N=70,hs=new THREE.InstancedMesh(new THREE.BoxGeometry(.6*U,.9*U,.16*U).translate(0,.45*U,0),stone,N);let c=0;const m=new THREE.Matrix4(),q=new THREE.Quaternion(),s=new THREE.Vector3(1,1,1);
  for(let k=0;k<400&&c<N;k++){const a=Math.random()*TAU,r=rand(5,34),x=j.x+Math.sin(a)*r,z=j.z+Math.cos(a)*r;if(!owValidSpot(x,z))continue;const row=Math.round(r/2.6);q.setFromEuler(new THREE.Euler(rand(-.06,.06),Math.atan2(j.x-x,j.z-z)+rand(-.2,.2),rand(-.08,.08)));s.set(rand(.8,1.2),rand(.8,1.4),1);m.compose(V3(x,groundAt(x,z)-.05,z),q,s);hs.setMatrixAt(c++,m)}
  hs.count=c;hs.castShadow=true;hs.receiveShadow=true;g.add(hs);
  const cr=new THREE.InstancedMesh(mergeG([new THREE.BoxGeometry(.12*U,1.3*U,.12*U).translate(0,.65*U,0),new THREE.BoxGeometry(.6*U,.12*U,.12*U).translate(0,.95*U,0)]),dark,16);c=0;
  for(let k=0;k<200&&c<16;k++){const a=Math.random()*TAU,r=rand(6,30),x=j.x+Math.sin(a)*r,z=j.z+Math.cos(a)*r;if(!owValidSpot(x,z))continue;q.setFromEuler(new THREE.Euler(0,rand(0,TAU),rand(-.1,.1)));s.set(1,1,1);m.compose(V3(x,groundAt(x,z),z),q,s);cr.setMatrixAt(c++,m)}cr.count=c;g.add(cr);
  const cy=new THREE.InstancedMesh(new THREE.ConeGeometry(.9*U,7*U,8).translate(0,3.5*U,0),cyp,10);c=0;
  for(let k=0;k<200&&c<10;k++){const a=Math.random()*TAU,r=rand(10,38),x=j.x+Math.sin(a)*r,z=j.z+Math.cos(a)*r;if(!owValidSpot(x,z))continue;q.identity();s.set(1,rand(.8,1.25),1);m.compose(V3(x,groundAt(x,z),z),q,s);cy.setMatrixAt(c++,m)}cy.count=c;cy.castShadow=true;g.add(cy);
  {let mx=j.x+3*U,mz=j.z-3*U;const sp=findSpotOW(j.x,j.z,5,9);if(sp){mx=sp.x;mz=sp.z}const mau=new THREE.Group();const b=new THREE.Mesh(new THREE.BoxGeometry(3*U,3.2*U,3*U).translate(0,1.6*U,0),stone);const rf=new THREE.Mesh(new THREE.ConeGeometry(2.4*U,1.4*U,4).translate(0,3.9*U,0),dark);rf.rotation.y=Math.PI/4;const dr=new THREE.Mesh(new THREE.BoxGeometry(1.1*U,2*U,.1*U).translate(0,1*U,1.5*U),dark);mau.add(b,rf,dr);mau.position.set(mx,groundAt(mx,mz),mz);mau.rotation.y=Math.atan2(j.x-mx,j.z-mz);mau.traverse(o=>{if(o.isMesh){o.castShadow=true;o.receiveShadow=true}});g.add(mau)}
  /* the gold: an open chest by his feet */
  const ch=new THREE.Group();const wood=std({color:0x4a2a14,roughness:.8}),gold=std({color:0xf0c040,metalness:1,roughness:.22,emissive:0x3a2400,envMapIntensity:1.6});
  ch.add(new THREE.Mesh(new THREE.BoxGeometry(.9*U,.5*U,.6*U).translate(0,.25*U,0),wood));const pile=new THREE.Mesh(new THREE.SphereGeometry(.42*U,12,8,0,TAU,0,Math.PI/2),gold);pile.scale.set(1,.55,.7);pile.position.y=.48*U;ch.add(pile);
  for(let k=0;k<9;k++){const cn=new THREE.Mesh(new THREE.CylinderGeometry(.09*U,.09*U,.02*U,10),gold);cn.position.set(rand(-.8,.8)*U,.02,rand(-.6,.6)*U);cn.rotation.set(rand(-.3,.3),0,rand(-.3,.3));ch.add(cn)}
  const gl=glowSprite(0xffc040,3.5*U,.35);gl.position.y=.6*U;ch.add(gl);const ang=j.face||0;ch.position.set(j.x+Math.sin(ang+.9)*1.6,groundAt(j.x,j.z),j.z+Math.cos(ang+.9)*1.6);ch.traverse(o=>{if(o.isMesh)o.castShadow=true});g.add(ch);OQ.chest=ch;OQ.chest.visible=OQ.st<2||OQ.st>=5}
/* ---------- talk ---------- */
function oqTaxi(to,label,st){if(CS.active||owUI||bossRef||(st!==undefined&&OQ.st!==st)||Math.hypot(to.x-P.pos.x,to.z-P.pos.z)<600)return;const p=panel(`<h3>${label}</h3><p class="owLine">It is a long way across Paris. A taxi will take you to the gate for €20.</p><div class="row"><button class="btn ghost" data-a="x">I'll fly</button><button class="btn" data-a="t">Taxi, €20</button></div>`);
  p.querySelector('[data-a=x]').onclick=closePanel;p.querySelector('[data-a=t]').onclick=()=>{closePanel();if(OWS.euro<20){toast('Not enough money for the taxi');return}OWS.euro-=20;owSave();
    fadeFlash(()=>{const s=findSpotOW(to.x,to.z,6,14)||V3(to.x+6,0,to.z);P.pos.set(s.x,groundAt(s.x,s.z),s.z);P.vel&&P.vel.set(0,0,0);P.face=Math.atan2(to.x-s.x,to.z-s.z);owStream(s.x,s.z,8);toast('The driver did not say a word the whole way.','Taxi')})}}
function oqOrson(n){n.face=Math.atan2(P.pos.x-n.x,P.pos.z-n.z);
  if(OQ.st===0){playCutscene(oqShots(OQ_L.meet,n),()=>{OQ.st=1;oqSave();setWaypoint(OQ.j.x,OQ.j.z,'Cimetière de Pantin');toast('Find Jean-Val-J in the Cimetière de Pantin. Follow the gold marker.','Orson\'s gold',true);sfx.gem();after(1.2,()=>oqTaxi(OQ.j,'Cimetière de Pantin',1))});return}
  if(OQ.st===1){oqNpcSay(n,pickR(Math.random,OQ_L.wait));after(1.5,()=>oqTaxi(OQ.j,'Cimetière de Pantin',1));return}
  if(OQ.st===2){playCutscene(oqShots(OQ_L.betray,n),oqFightStart);return}
  if(OQ.st>=5){oqNpcSay(n,pickR(Math.random,OQ_L.bitter));return}}
function oqJvj(n){n.face=Math.atan2(P.pos.x-n.x,P.pos.z-n.z);
  if(OQ.st===1){playCutscene(oqShots(OQ_L.take,n).concat([{dur:2.2,cam:questShot(n,1.6),onStart:()=>{if(OQ.chest)OQ.chest.visible=false;if(!sfxPlay('goldcoins',.6))sfx.coin();SP.emit(V3(n.x,n.y+1,n.z),{n:40,c0:0xfff0a0,c1:0xc08010,speed:5,life:.8})}}]),()=>{OQ.st=2;oqSave();setWaypoint(OQ.n.homeX,OQ.n.homeZ,'Orson');toast('Bring the gold back to Orson, rue Henri Moissan.','Jean-Val-J\'s gold',true);after(5,()=>oqSay('@',OQ_L.hero2));after(8,()=>oqTaxi({x:OQ.n.homeX,z:OQ.n.homeZ},'Rue Henri Moissan',2))});return}
  if(OQ.st===4){playCutscene(oqShots(OQ_L.ret,n).concat([{dur:2.4,title:['The honest witch','Quest complete · Orson\'s gold'],cam:questShot(n,1.8),onStart:()=>{if(OQ.chest)OQ.chest.visible=true;if(!sfxPlay('goldcoins',.6))sfx.coin();sfx.level()}}]),()=>{OQ.st=5;oqSave();OWS.euro+=250;gainXP(3500);owSave();oqHideOrson(false);OWS.wp=null;toast('+€250 · +3500 xp · and one coin, as a reminder','Quest complete');if(!sfxPlay('moneycount',.6))sfx.coin()});return}
  oqNpcSay(n,pickR(Math.random,OQ.st>=5?OQ_L.after:OQ_L.idle))}
/* ---------- Orson, the Gold Chain (boss) ---------- */
function buildOrson(){const a=makeCHActor('m',{skin:0xffe4e0,skinLift:[1.33,1.56,1.84],hair:'hairPart',hairTex:'2',hairCol:0xe6be7c,brow:0x7a5a34,eyeTint:0xa6ccff,keepReg:[5,6,9],
    wear:[['tee',0xf7f7f4,{roughness:.8}],['trousers',0x2a2c33,{roughness:.7}],['shoes',0x4a2a16,{roughness:.35}]]});
  if(!a)return buildDemon();const S=a.S,SK=S.SK,G0=S.geo;
  try{const B=G0.body,reg=chRegions(B,a.bones),pos=B.attributes.position.array;const X=i=>Math.abs(pos[i*3]),Y=i=>pos[i*3+1],Z=i=>pos[i*3+2];
    const hipY=SK.pelvis.y,neckY=SK.neck_01.y,armX0=SK.upperarm_l.x,wristX=SK.hand_l.x,fz=SK.spine_03.z;
    const torso=i=>{const r=reg[i];return(r>=1&&r<=4)||(r===5&&Y(i)<neckY+.005)||r===0};const arm=(i,t)=>{const r=reg[i];if(r!==7&&r!==8&&r!==4)return false;return(X(i)-armX0)/(wristX-armX0)<t};
    const open=i=>false;
    a.sk(chShell(B,i=>(torso(i)&&Y(i)>hipY-.16&&reg[i]!==5&&!open(i))||arm(i,.95),.022,i=>reg[i]===3||reg[i]===2?.007:0),std({color:0x1b2540,roughness:.62,metalness:.05,skinning:true,envMapIntensity:.8}))}catch(e){}
  /* dark blond, medium length, swept back: a few smooth volumes over the parted cut, no stripy strands */
  {const hm=std({color:0xa8844c,roughness:.6,metalness:.03}),hm2=std({color:0xb08a52,roughness:.6});const hair=new THREE.Group();const gS=new THREE.SphereGeometry(1,20,14);const C=new THREE.Vector3(0,.09,-.012);
    const blob=(x,y,z,sx,sy,sz,rx,ry,m)=>{const b=new THREE.Mesh(gS,m||hm);b.position.set(C.x+x,C.y+y,C.z+z);b.scale.set(sx,sy,sz);b.rotation.set(rx||0,ry||0,0);b.castShadow=true;hair.add(b)};
    blob(0,.022,-.008,.094,.04,.104,-.18);         // a little volume on top, swept back
    a.attach('Head',hair,SK.Head.clone())}
  {const wc=std({color:0xf7f7f4,roughness:.7,side:THREE.DoubleSide});for(const q of[-1,1]){const c=new THREE.Mesh(new THREE.ConeGeometry(.03,.07,3),wc);c.scale.set(1,1,.35);a.attach('neck_01',c,SK.neck_01.clone().add(new THREE.Vector3(q*.04,-.035,.075)),new THREE.Euler(2.6,0,-q*.5))}}
  const gold=std({color:0xf2c040,roughness:.16,metalness:1,envMapIntensity:1.8,emissive:0x2a1800});
  for(const[R,Lk,dy,sc]of[[.1,44,-.05,.85]]){const ch=new THREE.Group();const lg=new THREE.TorusGeometry(.011*sc,.0042*sc,5,10);
    for(let k=0;k<Lk;k++){const t=k/(Lk-1);const ang=(t-.5)*Math.PI*1.55;const lk=new THREE.Mesh(lg,gold);lk.position.set(Math.sin(ang)*R*.9,-Math.pow(Math.cos(ang*.62),6)*R+.01,Math.cos(ang)*R+.012);lk.rotation.set(0,ang,k%2?Math.PI/2:0);ch.add(lk)}
    a.attach('neck_01',ch,SK.neck_01.clone().add(new THREE.Vector3(0,dy,.012)),new THREE.Euler(.12,0,0))}
  {const sq=std({color:0xf4f1ea,roughness:.7});const ps=new THREE.Mesh(new THREE.BoxGeometry(.035,.022,.006),sq);a.attach('spine_03',ps,SK.spine_03.clone().add(new THREE.Vector3(-.075,.03,.135)),new THREE.Euler(0,0,.15))}
  const wt=new THREE.Mesh(new THREE.CylinderGeometry(.02,.02,.012,16),gold);wt.rotation.z=Math.PI/2;a.attach('hand_l',wt,SK.hand_l.clone().add(new THREE.Vector3(-.03,0,0)));
  const aura=glowSprite(0xffc040,5,.06);aura.position.y=1.2;a.g.add(aura);const rn=decal(runeTex,0xffc040,4,true,.35);rn.position.y=.08;a.g.add(rn);
  a.body.scale.set(1.09,1.12,1.09);a.g.traverse(c=>{if(c.isMesh)c.castShadow=true});
  return{g:a.g,body:a.body,actor:a,aura,rn,anim:(e,dt,mv)=>{rn.rotation.z+=dt*.5;actorAnimate(e,dt,mv);if(Math.random()<.18)SP.emit(V3(e.pos.x+rand(-.5,.5),e.pos.y+rand(.5,2),e.pos.z+rand(-.5,.5)),{c0:0xfff0a0,c1:0x6a4000,s0:.25,s1:.05,life:.7,up:.8})}}}
ETYPES.orson={name:'Orson, the Gold Chain',boss:true,hp:3600,speed:5.6,dmg:22,range:0,cd:9,xp:2500,r:.9,h:2.65,kite:true,build:buildOrson};
BOSSAI.orson=function(e,dt,d){const a=e.ai,rage=e.hp<e.maxhp*.5,act=e.m.actor;
  if(e.flee)return;
  if(e.hp<=e.maxhp*.05){oqDefeat(e);return}
  a.a1-=dt;a.a2-=dt;a.a3-=dt;a.a4-=dt;a.tp-=dt;a.ln=(a.ln===undefined?4:a.ln)-dt;
  if(a.ln<=0){a.ln=rand(8,12);const i=e.hp<e.maxhp*.25?(4+(Math.random()*3|0)):(Math.random()*4|0);oqSay('Orson',OQ_L.fight[i],e.pos)}
  if(!a.s1&&e.hp<e.maxhp*.6){a.s1=1;summonNear(e,'demon',2);for(const o of enemies)if(!o.def.boss&&!o.dead)o.oq=1;cineLine('Orson','Security! Get her!')}
  if(!a.s2&&e.hp<e.maxhp*.3){a.s2=1;summonNear(e,'demon',3);for(const o of enemies)if(!o.def.boss&&!o.dead)o.oq=1;cineLine('Orson','I pay you to WORK!')}
  if(e.dash){e.dash.t+=dt;const k=Math.min(1,e.dash.t/.24);e.pos.x=lerp(e.dash.a.x,e.dash.b.x,k);e.pos.z=lerp(e.dash.a.z,e.dash.b.z,k);SP.emit(eCenter(e),{n:5,c0:0xfff0a0,c1:0xc08010,speed:2,life:.4});if(k>=1)e.dash=null;return}
  if(e.busy>0)return;
  if(a.a1<=0){a.a1=rage?2.4:3.4;e.busy=.7;if(act){act.fire('OverhandThrow',.55);e.m.lock=.55}const c=eCenter(e),n=rage?9:6,base=Math.atan2(P.pos.x-e.pos.x,P.pos.z-e.pos.z);if(!sfxPlay('goldcoins',.45,{dur:.9}))sfx.coin();
    for(let k=0;k<n;k++){const ang=base+(k-(n-1)/2)*.15;after(.15+k*.035,()=>{if(!e.dead&&!e.flee)enemyOrb(c.clone(),V3(Math.sin(ang),0,Math.cos(ang)),19,e.dmg*.42,0xffc430,.26,{life:2.4})})}}
  else if(a.a2<=0&&d<22){a.a2=rage?3.4:4.8;e.busy=1;const from=e.pos.clone(),dir=V3(P.pos.x-from.x,0,P.pos.z-from.z).normalize(),to=from.clone().addScaledVector(dir,Math.min(24,d+4));if(act){act.fire('Punch_Cross',.5);e.m.lock=.5}
    lineTelegraph(from,to,2.4,.6,0xffc430,()=>{if(e.dead||e.flee)return;e.dash={a:from,b:to,t:0};if(!sfxPlay('goldchains',.75))sfx.blink();after(.12,()=>{for(let k=0;k<10;k++){const p=from.clone().lerp(to,k/9);SP.emit(V3(p.x,p.y+1,p.z),{n:5,c0:0xfff0a0,c1:0xc08010,speed:4,life:.5})}if(distToSeg(P.pos,from,to)<1.7&&Math.abs(P.pos.y-from.y)<3)damagePlayer(e.dmg*1.7)})})}
  else if(a.a3<=0){a.a3=rage?6:8.5;e.busy=1.1;if(act){act.fire('Spell_Simple_Shoot',.7);e.m.lock=.7}cineLine('Orson',pickR(Math.random,['Make it rain!','Money! Money! Money!','Here, buy yourself a life!']));
    const n=rage?9:6;for(let k=0;k<n;k++){const p=P.pos.clone().add(k?V3(rand(-7,7),0,rand(-7,7)):V3());p.y=groundAt(p.x,p.z);after(k*.12,()=>{if(e.dead||e.flee)return;
      telegraph(p,2.4,1,0xffc430,()=>{if(e.dead||e.flee)return;const bag=new THREE.Mesh(G.sphereLo,std({color:0xe8b830,metalness:1,roughness:.25,emissive:0x402800}));bag.position.set(p.x,p.y+14,p.z);bag.scale.setScalar(.8);
        addFx(bag,.35,(f,kk)=>{bag.position.y=p.y+.8+13*(1-kk)},()=>{scene.remove(bag);SP.emit(V3(p.x,p.y+.6,p.z),{n:26,c0:0xfff0a0,c1:0xa07010,speed:7,life:.6,grav:10});if(!sfxPlay('goldcoins',.5,{dur:1,gap:.1}))noise(.18,.12,1800);if(playerIn(p,2.5))damagePlayer(e.dmg*1.3)})})})}}
  else if(a.a4<=0){a.a4=rage?8:11;e.busy=.8;sfx.roar&&sfx.roar();shockwave(e.pos.clone(),26,12,e.dmg*1.1,0xffc430);toast('Jump the golden wave!')}
  if(a.tp<=0&&!e.dash){a.tp=rage?5:7;const s=findSpot(P.pos.x,P.pos.z,7,13);if(s){const from=e.pos.clone();e.dash={a:from,b:V3(s.x,from.y,s.z),t:0}}}};
function oqFightStart(){const n=OQ.n;OQ.st=3;const at=V3(n.x,0,n.z);oqHideOrson(true);
  const e=spawnEnemy('orson',at,{lvl:Math.min(MAXLV,P.level+2)});e.lvl=80;e.hpFloor=.04;e.aggro=true;e.oqBoss=1;
  $('bossName').innerHTML=`${e.def.name} <span style="color:#ff4050">· Lv 80</span>`;$('boss').classList.remove('hidden');bossRef=e;OQ.fight={e,t:0};OWS.wp=null;
  P.shake=.6;flash(eCenter(e),0xffc040,8);sfx.bossIn();sfxPlay('goldshield',.6);toast('He is not really level 80. Probably.','Orson, the Gold Chain · Lv 80',true)}
function oqDefeat(e){if(e.flee)return;e.flee=1;if(e.m.rn)e.m.rn.visible=false;e.invuln=true;e.dash=null;if(bossRef===e)bossRef=null;$('boss').classList.add('hidden');
  for(const o of enemies)if(o.oq&&!o.dead)removeEnemy(o);for(const p of eProjs)scene.remove(p.s);eProjs.length=0;
  const car=oqCar(e.pos);car.g.visible=false;OQ.esc={e,car,t:0,go:false};
  const eShot=()=>{const d=V3(P.pos.x-e.pos.x,0,P.pos.z-e.pos.z).normalize();const r=V3(d.z,0,-d.x);return{pos:V3(e.pos.x,e.pos.y+2.3,e.pos.z).addScaledVector(d,3.4).addScaledVector(r,.9),look:V3(e.pos.x,e.pos.y+1.9,e.pos.z)}};
  const face=()=>{e.m.g.rotation.y=Math.atan2(P.pos.x-e.pos.x,P.pos.z-e.pos.z)};
  const shots=OQ_L.defeat.map(([w,t])=>({who:w,text:t,cam:w==='@'?witchShot(1,3.6):eShot,onStart:()=>{face();if(e.m.actor)e.m.actor.setBase('Idle_Loop',.3)},update:dt=>{if(e.m.actor)e.m.actor.update(dt)}}));
  const side=()=>{const c=car.g.position;const fx=Math.sin(car.ry),fz=Math.cos(car.ry);const st=OQ.esc.camP||(OQ.esc.camP=V3(c.x-fz*9+fx*4,c.y+3.2,c.z+fx*9+fz*4));return{pos:st,look:V3(c.x,c.y+1.2,c.z)}};
  shots.push({dur:3.2,cam:side,onStart:()=>{car.g.visible=true;const d=Math.hypot(car.door.x-e.pos.x,car.door.z-e.pos.z);if(d>16){const k=(d-12)/d;e.pos.x+=(car.door.x-e.pos.x)*k;e.pos.z+=(car.door.z-e.pos.z)*k;e.pos.y=groundAt(e.pos.x,e.pos.z)}},update:dt=>oqEscTick(dt)});
  shots.push({dur:4.2,title:['Orson fled','In a black Range Rover. Of course.'],cam:side,update:dt=>oqEscTick(dt)});
  playCutscene(shots,()=>{oqEscEnd()})}
/* the getaway car */
function oqCar(at){const len=4.9,wid=2,hgt=1.85;const s=new THREE.Shape();s.moveTo(-len/2,.42);s.lineTo(len/2,.42);s.lineTo(len/2,1.02);s.lineTo(len/2-.2,1.1);s.lineTo(len/2-1.25,1.16);s.lineTo(len/2-1.78,hgt);s.lineTo(-len/2+.12,hgt);s.lineTo(-len/2,hgt-.14);s.lineTo(-len/2,.42);
  const body=new THREE.ExtrudeGeometry(s,{depth:wid,bevelEnabled:true,bevelThickness:.06,bevelSize:.05,bevelSegments:2,curveSegments:4});body.translate(0,0,-wid/2);body.rotateY(-Math.PI/2);
  const gs=new THREE.Shape();gs.moveTo(len/2-1.28,1.2);gs.lineTo(len/2-1.76,hgt-.07);gs.lineTo(-len/2+.18,hgt-.07);gs.lineTo(-len/2+.06,1.2);const glass=new THREE.ExtrudeGeometry(gs,{depth:wid+.04,bevelEnabled:false});glass.translate(0,0,-(wid+.04)/2);glass.rotateY(-Math.PI/2);
  const g=new THREE.Group(),inner=new THREE.Group();g.add(inner);inner.scale.setScalar(U);
  inner.add(new THREE.Mesh(body,std({color:0x15171b,roughness:.2,metalness:.55,envMapIntensity:2})));inner.add(new THREE.Mesh(glass,std({color:0x030405,roughness:.04,metalness:.95,envMapIntensity:2})));
  const wm=std({color:0x111113,roughness:.6}),rim=std({color:0x2a2a2e,metalness:.9,roughness:.3});const wheels=[];
  for(const zx of[len/2-.95,-len/2+.9])for(const sx of[-1,1]){const w=new THREE.Group();const t=new THREE.Mesh(new THREE.CylinderGeometry(.44,.44,.3,16),wm);t.rotation.z=Math.PI/2;const r=new THREE.Mesh(new THREE.CylinderGeometry(.27,.27,.32,10),rim);r.rotation.z=Math.PI/2;w.add(t,r);w.position.set(sx*(wid/2-.12),.44,zx);inner.add(w);wheels.push(w)}
  const hl=new THREE.MeshBasicMaterial({color:0xfff4e0}),tl=new THREE.MeshBasicMaterial({color:0xff1a10});
  for(const sx of[-1,1]){const h=new THREE.Mesh(new THREE.BoxGeometry(.42,.1,.04),hl);h.position.set(sx*(wid/2-.32),.98,len/2+.03);inner.add(h);const t=new THREE.Mesh(new THREE.BoxGeometry(.32,.12,.04),tl);t.position.set(sx*(wid/2-.25),1.12,-len/2-.03);inner.add(t);const hg=glowSprite(0xfff0d0,2.2,.5);hg.position.copy(h.position);inner.add(hg)}
  const grille=new THREE.Mesh(new THREE.BoxGeometry(1.1,.22,.03),std({color:0x1a1a1c,metalness:.8,roughness:.3}));grille.position.set(0,.86,len/2+.03);inner.add(grille);
  g.traverse(o=>{if(o.isMesh){o.castShadow=true}});
  let e=null;try{e=nearestEdge(at.x,at.z,70,trfDriveOK)}catch(x){}const c={g,wheels,e:null,s:0,dir:1,v:0,ry:0,door:V3()};
  if(e){let bs=0,bd=1e9;const tp={};for(let s=0;s<=e.len;s+=1){edgePointAt(e,s,tp);const d=Math.hypot(tp.x-at.x,tp.z-at.z);if(d<bd){bd=d;bs=s}}edgePointAt(e,bs,tp);
    /* drive away from the witch, and keep enough street ahead before the first corner */
    const ahead=(tp.x+tp.dx*5-P.pos.x)**2+(tp.z+tp.dz*5-P.pos.z)**2>(tp.x-tp.dx*5-P.pos.x)**2+(tp.z-tp.dz*5-P.pos.z)**2;c.e=e;c.dir=ahead?1:-1;c.s=c.dir>0?bs:e.len-bs;c.s=Math.min(c.s,Math.max(0,e.len-14))}
  if(!e){c.ry=Math.atan2(at.x-P.pos.x,at.z-P.pos.z);c.fx=Math.sin(c.ry);c.fz=Math.cos(c.ry);g.position.set(at.x+c.fz*3,groundAt(at.x,at.z),at.z-c.fx*3);g.rotation.y=c.ry}else oqCarPlace(c,0);scene.add(g);
  const sx=c.e?c.side:1;c.door.set(g.position.x+Math.cos(c.ry)*1.9*sx,0,g.position.z-Math.sin(c.ry)*1.9*sx);return c}
function oqCarAt(c){const e=c.e;const s=c.dir>0?c.s:e.len-c.s;const tp={};edgePointAt(e,clamp(s,0,e.len),tp);const dx=tp.dx*c.dir,dz=tp.dz*c.dir;
  const lane=e.cls>=3?Math.max(1.35,e.w*.5-4.6):Math.min(e.w*.25,3.4)+.4;return{x:tp.x+dz*lane,z:tp.z-dx*lane,dx,dz}}
function oqCarNext(c){const e=c.e;const node=c.dir>0?e.b:e.a;const opts=(CITY.adj&&CITY.adj[node]||[]).filter(q=>q!==e&&trfDriveOK(q));if(!opts.length){c.stuck=true;c.s=e.len;return}
  const cur=Math.atan2(c.fx,c.fz);let best=opts[0],bd=1e9,bdir=1;const tp={};
  for(const q of opts){const dir=q.a===node?1:-1;edgePointAt(q,dir>0?Math.min(3,q.len):Math.max(0,q.len-3),tp);const a=Math.atan2(tp.dx*dir,tp.dz*dir);const d=Math.abs(((a-cur+Math.PI)%TAU+TAU)%TAU-Math.PI);const sc=d+(q.cls>=5?.6:0);if(sc<bd){bd=sc;best=q;bdir=dir}}
  c.e=best;c.dir=bdir;c.s=0}
function oqCarPlace(c,dt){const g=c.g;
  if(c.e){while(c.s>c.e.len&&!c.stuck){c.s-=c.e.len;oqCarNext(c)}const p=oqCarAt(c);const ry=Math.atan2(p.dx,p.dz);c.ry=dt?lerpAngle(c.ry,ry,Math.min(1,dt*5)):ry;
    if(!dt){g.position.set(p.x,0,p.z);c.side=1}else{const k=Math.min(1,dt*9);g.position.x+=(p.x-g.position.x)*k;g.position.z+=(p.z-g.position.z)*k}c.fx=Math.sin(c.ry);c.fz=Math.cos(c.ry);if(c.stuck)c.v=Math.max(0,c.v-dt*30)}
  else{g.position.x+=c.fx*c.v*dt;g.position.z+=c.fz*c.v*dt}
  g.position.y=lerp(g.position.y||groundAt(g.position.x,g.position.z),groundAt(g.position.x,g.position.z),dt?Math.min(1,dt*8):1);g.rotation.y=c.ry}
function oqEscTick(dt){const E=OQ.esc;if(!E)return;E.t+=dt;const e=E.e,c=E.car;
  if(!E.go){const dx=c.door.x-e.pos.x,dz=c.door.z-e.pos.z,d=Math.hypot(dx,dz);if(d>1.2){const sp=Math.min(d,11*dt);e.pos.x+=dx/d*sp;e.pos.z+=dz/d*sp;e.pos.y=groundAt(e.pos.x,e.pos.z);e.m.g.rotation.y=Math.atan2(dx,dz);if(e.m.actor){e.m.actor.setBase('Sprint_Loop',.2,1.15);e.m.actor.update(dt)}}
    else{E.go=true;e.m.g.visible=false;if(!sfxPlay('engine',.85,{jit:0})){noise(.5,.18,300,'lowpass');tone(55,2.4,'sawtooth',.06,2.6,.15);tone(82,2.2,'square',.025,2.2,.2);noise(.9,.1,2600,'bandpass',null,{delay:.25})}}}
  else{c.v=Math.min(24,c.v+dt*13);if(c.e)c.s+=c.v*dt;for(const w of c.wheels)w.children.forEach(x=>x.rotation.x+=c.v*dt*1.6);if(Math.random()<.5)SM.emit(V3(c.g.position.x-c.fx*3.4,c.g.position.y+.5,c.g.position.z-c.fz*3.4),{n:2,c0:0x9a9a9a,c1:0x404040,s0:1.2,s1:3,speed:1,life:.9,a:.35})}
  oqCarPlace(c,dt)}
function oqEscEnd(){const E=OQ.esc;if(E){if(!E.e.dead)removeEnemy(E.e);scene.remove(E.car.g);disposeObj&&disposeObj(E.car.g)}OQ.esc=null;OQ.fight=null;OQ.st=4;oqSave();
  setWaypoint(OQ.j.x,OQ.j.z,'Jean-Val-J');gainXP(Math.round(ETYPES.orson.xp*(1+.25*(P.level-1))));toast('The gold is yours now. It should not be. Take it back to Jean-Val-J in Pantin.','Orson fled',true);sfx.level();
  after(2.5,()=>oqTaxi(OQ.j,'Cimetière de Pantin',4))}
/* ---------- tick ---------- */
function oqTick(dt){if(MODE!=='open'||!started||!OQ.n)return;oqAvatar(dt);
  if(CS.active)return;
  if(OQ.st===1&&!OQ.said1&&OQ.j&&Math.hypot(OQ.j.x-P.pos.x,OQ.j.z-P.pos.z)<70){OQ.said1=true;oqSave();sfxPlay('bell',.45,{jit:0,wet:.5});after(1.5,()=>oqSay('@',OQ_L.hero1))}
  if(OQ.st===3&&OQ.fight&&!OQ.esc){const e=OQ.fight.e;if(e.dead&&!e.flee||!P.alive){if(!e.dead)removeEnemy(e);for(const o of enemies)if(o.oq&&!o.dead)removeEnemy(o);OQ.fight=null;OQ.st=2;oqSave();oqHideOrson(false);if(bossRef===e)bossRef=null;$('boss').classList.add('hidden');after(3,()=>toast('Orson is still laughing on rue Henri Moissan. Go back when you are ready.','Orson',true));setWaypoint(OQ.n.homeX,OQ.n.homeZ,'Orson')}
    else if(Math.hypot(e.pos.x-P.pos.x,e.pos.z-P.pos.z)>140){teleportNear(e,14,20)}}
  if(OQ.st===4&&OQ.n&&OQ.n.x<OQ.n.homeX+1000)oqHideOrson(true)}
{const _sh=setupHosts;setupHosts=function(){_sh();try{oqSetup()}catch(e){console.warn('oq setup',e)}}}
{const _mt=muTick;muTick=function(dt){_mt(dt);try{oqTick(dt)}catch(e){console.warn('oq',e)}}}
{const _mw=muWant;muWant=function(){if(MODE==='open'&&started&&(OQ.st===3||OQ.esc))return'mus_orson';return _mw()}}
MU.keys.push('mus_orson');
/* tracker */
{const _h=owHUD;owHUD=function(){_h();let el=document.getElementById('oqTk');if(OQ.st<1||OQ.st>4||!OQ.n){if(el)el.remove();return}const T=$('owTrack');if(!el){el=document.createElement('div');el.id='oqTk';el.className='tk'}if(el.parentNode!==T)T.appendChild(el);
  const d=o=>Math.round(Math.hypot(o.x-P.pos.x,o.z-P.pos.z)/U)+' m';const j=OQ.j,o={x:OQ.n.homeX,z:OQ.n.homeZ};
  const h=OQ.st===1?`<b>Orson's gold</b><span>Find Jean-Val-J, Cimetière de Pantin · ${d(j)}</span>`:OQ.st===2?`<b>Orson's gold</b><span>Bring the gold to Orson, rue Henri Moissan · ${d(o)}</span>`:OQ.st===3?`<b>Orson, the Gold Chain</b><span>Beat him</span>`:`<b>The honest witch</b><span>Return the gold to Jean-Val-J · ${d(j)}</span>`;
  if(el._h!==h){el._h=h;el.innerHTML=h}}}

/* Orson in the street uses the same tall, fair, dark-blond model as the boss (the crowd model cannot do his hair) */
function oqAvatar(dt){const n=OQ.n;if(!n)return;const show=n.x<n.homeX+1000&&n.dist<140&&(!OQ.fight||OQ.st!==3);
  if(!OQ.av){if(!show||!CH.ok)return;try{OQ.av=buildOrson();if(!OQ.av||!OQ.av.actor){OQ.av=null;return}if(OQ.av.aura)OQ.av.aura.visible=false;if(OQ.av.rn)OQ.av.rn.visible=false;scene.add(OQ.av.g);OQ.av.actor.setBase('Idle_FoldArms_Loop')}catch(e){OQ.av=null;return}n.special.av=1}
  const A=OQ.av;A.g.visible=show;if(!show)return;A.g.position.set(n.x,n.y,n.z);A.g.rotation.y=lerpAngle(A.g.rotation.y,n.face||0,Math.min(1,dt*6));
  const talk=CS.active&&CS.shots[CS.i]&&CS.shots[CS.i].who==='Orson';A.actor.setBase(talk?'Idle_Loop':'Idle_FoldArms_Loop',.35);A.actor.update(dt)}
if(typeof chDraw==='function'){const _cd=chDraw;chDraw=function(n){if(n.special&&n.special.av)return false;return _cd(n)}}
if(typeof drawPerson==='function'){const _dp=drawPerson;drawPerson=function(n){if(n.special&&n.special.av)return;return _dp(n)}}
