
/* =====================================================================================
   XVI · THE HOLLOW CROWN
   the smoke in the chair · three coronation candles · the run to the light
   ===================================================================================== */
const XC={ph:0,fig:null,lit:0,wicks:[],stands:[],t:0,ht:3,st:8,seen:0,front:0,rk:.6,said:{}};
const x5Dmg=b=>b*1.25*(1+.2*(P.level-1))*DF().dmg;
const CAND=[[-12,231],[12,231],[0,246]];

/* ---------- the Crown itself: sixteen clots of smoke that never settle on one shape ---------- */
const CROWN_SHAPES={
  king:i=>[[0,3.35,0,.78],[.45,3.72,-.28,.46],[-.5,3.52,-.22,.42],[0,2.62,-.05,.62],[0,1.95,0,.54],[0,1.3,.05,.46],[-.28,.76,0,.4],[.3,.6,.06,.37],[-.22,.16,.12,.28],[.26,.12,.14,.26],[-.78,2.78,.05,.36],[.78,2.74,.05,.36],[-.98,2.1,.2,.3],[1,2.06,.22,.29],[-1.06,1.52,.32,.24],[.5,2.95,-.45,.5]][i],
  beast:i=>{const t=i/15;return[Math.sin(t*TAU)*1.5,1.1+Math.sin(t*Math.PI)*1.3,(t-.5)*5.2,.95-Math.abs(t-.5)*.7]},
  serpent:i=>{const t=i/15;return[Math.sin(t*6.2)*1.25,.5+t*5.4,Math.cos(t*6.2)*1.25,.82-t*.42]},
  claw:i=>{const a=(i%5)/5*TAU,r=1+((i/5)|0)*1.05;return i===15?[0,2.4,0,1]:[Math.cos(a)*r,2.4+Math.sin(a)*r*.9,Math.sin(a*2)*.5,.7-((i/5)|0)*.15]},
  ball:i=>{const a=i*2.4,r=.9*Math.sqrt(i/15);return[Math.cos(a)*r,1.6+Math.sin(i*1.7)*.5,Math.sin(a)*r,.6]}};
function buildCrownFig(sc){const g=new THREE.Group(),S=sc||1;const mat=new THREE.ShaderMaterial({uniforms:{uT:{value:0},uA:{value:1},uC:{value:new THREE.Color(0x1f6a7a)}},transparent:true,depthWrite:false,
    vertexShader:'uniform float uT;varying vec3 vN;varying vec3 vV;void main(){vec3 p=position+normal*(sin(position.y*5.+uT*3.)+sin(position.x*6.-uT*2.)+sin(position.z*7.+uT*4.))*.13;vec4 mv=modelViewMatrix*vec4(p,1.);vN=normalize(normalMatrix*normal);vV=normalize(-mv.xyz);gl_Position=projectionMatrix*mv;}',
    fragmentShader:'uniform float uA;uniform vec3 uC;varying vec3 vN;varying vec3 vV;void main(){float f=pow(1.-abs(dot(vN,vV)),1.4);vec3 c=mix(vec3(.003,.009,.012),uC,f*.85);gl_FragColor=vec4(c,(.94-f*.7)*uA);}'});
  const geo=new THREE.IcosahedronGeometry(1,3),blobs=[];for(let i=0;i<16;i++){const m=new THREE.Mesh(geo,mat);m.userData={ph:rand(0,6),tp:V3(),ts:.6};for(let k=0;k<2;k++){const q=new THREE.Mesh(geo,mat);q.position.set(rand(-.7,.7),rand(-.7,.5),rand(-.7,.7));q.scale.setScalar(rand(.45,.7));q.userData.sp=rand(-1.5,1.5);m.add(q)}g.add(m);blobs.push(m)}
  const iron=std({color:0x10140f,roughness:.4,metalness:.8,emissive:0x0c3038,emissiveIntensity:.6});const cr=new THREE.Group();const tr=new THREE.Mesh(new THREE.TorusGeometry(.5,.07,6,20),iron);tr.rotation.x=Math.PI/2;cr.add(tr);
  for(let k=0;k<7;k++){const c=new THREE.Mesh(new THREE.ConeGeometry(.08,.5,4),iron);const a=k/7*TAU;c.position.set(Math.cos(a)*.5,.25,Math.sin(a)*.5);cr.add(c)}cr.add(glowSprite(0x3fd0e0,2.2,.2));g.add(cr);
  const eyes=[glowSprite(0xbff4ff,.95,1),glowSprite(0xbff4ff,.95,1)];for(const e of eyes){const c=glowSprite(0xffffff,.32,1);e.add(c);for(const q of[e,c]){q.material.depthTest=false;q.renderOrder=20}}for(const e of eyes)g.add(e);g.scale.setScalar(S);
  const F={g,blobs,crown:cr,eyes,mat,shape:'king',t:0,cyc:0,cycT:0,kick:0,face:0,S,
    set(n){F.shape=n},burst(k){F.kick=k||1.4},
    tick(dt){F.t+=dt;mat.uniforms.uT.value=F.t;if(F.cyc){F.cycT-=dt;if(F.cycT<=0){F.cycT=F.cyc;const K=Object.keys(CROWN_SHAPES);let n;do n=K[(Math.random()*K.length)|0];while(n===F.shape);F.shape=n}}
      const sh=CROWN_SHAPES[F.shape];let top=0,tp=null;F.kick=Math.max(0,F.kick-dt*2.2);
      blobs.forEach((b,i)=>{const p=sh(i),u=b.userData;u.tp.set(p[0]+Math.sin(F.t*1.3+u.ph)*.14,p[1]+Math.sin(F.t*1.7+u.ph*2)*.12,p[2]+Math.cos(F.t*1.1+u.ph)*.14);if(F.kick>0)u.tp.add(V3(Math.sin(u.ph*7),Math.cos(u.ph*5)*.6,Math.cos(u.ph*3)).multiplyScalar(F.kick*2.2));
        b.position.lerp(u.tp,Math.min(1,dt*3));const s=lerp(b.scale.x,p[3]*(1+Math.sin(F.t*2.3+u.ph)*.1),Math.min(1,dt*3));b.scale.setScalar(s);if(b.position.y+s>top){top=b.position.y+s;tp=b}});
      if(tp){cr.position.lerp(V3(tp.position.x,top+.25+Math.sin(F.t*2)*.08,tp.position.z),Math.min(1,dt*4));cr.rotation.y+=dt*.7;cr.rotation.z=Math.sin(F.t*1.3)*.12;const hb=F.shape==='king'?blobs[0]:tp;eyes.forEach((e,k)=>e.position.set(hb.position.x+(k?.3:-.3),hb.position.y+(F.shape==='king'?.02:hb.scale.x*.2),hb.position.z+hb.scale.x*.92))}
      for(const b of blobs)for(const q of b.children)q.rotation.y+=dt*q.userData.sp;
      if(Math.random()<.7){const b=blobs[(Math.random()*16)|0],w=V3();b.getWorldPosition(w);SM.emit(w,{c0:0x10262c,c1:0x010304,s0:1.2*S,s1:3.6*S,life:1.5,a:.6,up:.6,speed:.6})}}};
  return F}
function xcFig(sc){if(XC.fig)scene.remove(XC.fig.g);const F=buildCrownFig(sc||1);scene.add(F.g);XC.fig=F;return F}
function xcFigOff(){if(XC.fig){scene.remove(XC.fig.g);XC.fig=null}}

/* ---------- the three candles ---------- */
function buildWick(){const g=new THREE.Group(),body=new THREE.Group();g.add(body);const gl=glowSprite(0x7dff9a,1.4,.5);gl.position.y=3.1;body.add(gl);return{g,body,gl,anim:(e)=>{gl.material.opacity=.3+Math.sin(e.t*5)*.2}}}
ETYPES.xwick={name:'Coronation candle',hp:420,speed:0,dmg:0,range:0,cd:99,xp:0,r:.8,h:5.2,build:buildWick};
function xcStands(){if(XC.stands.length||!X5.ug)return;const Q=x5Mats();CAND.forEach((c,i)=>{const g=new THREE.Group();g.position.copy(uP(c[0],c[1]));X5.ug.add(g);const base=new THREE.Mesh(new THREE.CylinderGeometry(.5,.75,.4,10),Q.iron);base.position.y=.2;g.add(base);const st=new THREE.Mesh(new THREE.CylinderGeometry(.09,.12,2.2,8),Q.gold);st.position.y=1.4;g.add(st);
    const cup=new THREE.Mesh(new THREE.CylinderGeometry(.5,.2,.3,12),Q.gold);cup.position.y=2.55;g.add(cup);const wax=new THREE.Mesh(new THREE.CylinderGeometry(.24,.27,1,12),std({color:0xf2e8d0,roughness:.6,emissive:0x2a2418}));wax.position.y=3.15;g.add(wax);
    const fl=glowSprite(0xffd070,4.2,0);fl.position.y=4;g.add(fl);const halo=glowSprite(0xffb040,13,0);halo.position.y=4;g.add(halo);const li=new THREE.PointLight(0xffc070,0,34,1.5);li.position.y=4.2;g.add(li);XC.stands.push({g,fl,halo,li,on:0,p:uP(c[0],c[1],3.9)});X5.cols.push({x:uX(c[0]),z:uZ(c[1]),r:.9})})}
function xcLight(i,quiet){const S=XC.stands[i];if(!S||S.on)return;S.on=1;S.fl.material.opacity=.95;S.halo.material.opacity=.3;S.li.intensity=2.2;if(quiet)return;XC.lit++;const p=S.p;sx('lampon',1);sx('powerup',.7,null,{rate:1.3});flash(p,0xffd070,24);x5Impact(60,.08);x5Punch(10,.4);ring(V3(p.x,.1,p.z),0xffd890,1,14,.6);
  SP.emit(p,{n:120,c0:0xffffff,c1:0xffb040,speed:9,life:1.1,s0:.5,s1:.05});x5Banner(['ONE FLAME','TWO FLAMES','THREE FLAMES'][XC.lit-1]||'',XC.lit<3?'LIGHT THE REST':'IT CANNOT HIDE','#ffd890',1.5,'#1a1206');if(XC.fig)XC.fig.burst(1.6);
  if(XC.lit===1){x5Say('The Crown','cr_03',1);for(let k=0;k<3;k++){const s=findSpot(P.pos.x,P.pos.z,6,12);if(s){const e=spawnEnemy('vshade',s);e.aggro=true;e.quest=true;e.xcA=1}}}
  if(XC.lit===2){x5Say('The Crown','cr_04',1)}if(XC.lit>=3)after(1.2,xcPinned)}
function xcWicks(){for(const w of XC.wicks)if(w&&!w.dead)removeEnemy(w);XC.wicks=CAND.map((c,i)=>{if(XC.stands[i].on)return null;const e=spawnEnemy('xwick',uP(c[0],c[1]));e.aggro=true;e.quest=true;e.elite=false;e.m.g.scale.setScalar(1);e.x5=()=>xcLight(i);e.m.g.children.forEach(ch=>{if(ch.material&&ch.material.map===scorchTex)ch.visible=false});return e})}
function x5CReset(){xcFigOff();for(const w of XC.wicks)if(w&&!w.dead)removeEnemy(w);XC.wicks=[];for(const S of XC.stands){S.on=0;S.fl.material.opacity=0;S.halo.material.opacity=0;S.li.intensity=0}XC.ph=0;XC.lit=0;XC.t=0;XC.front=0;XC.said={};const k=document.getElementById('kinFx');if(k)k.style.opacity='0'}
function x5CObj(){if(XC.ph===1)return `Light the <b>coronation candles</b> with any spell · ${XC.lit}/3`;if(XC.ph===2)return 'Follow the Crown to the <b>light</b>!';return 'Face the thing in the chair'}
const chairP=()=>uP(0,256.2,1.9);
function xcIntro(){if(CS.active||XC.ph)return;xcStands();const F=xcFig(1);F.g.position.copy(chairP());F.set('king');F.cyc=0;for(let k=0;k<30;k++)F.tick(.05);
  const mp=uP(0,228);x4Stage(mp,Math.PI);P.face=Math.PI;if(KFW.a){KFW.a.g.position.copy(uP(-2.6,226.4));KFW.a.g.rotation.y=Math.PI}if(LYR.a){LYR.a.g.position.copy(uP(2.5,226.2));LYR.a.g.rotation.y=Math.PI;LYR.a.g.visible=true}KFW.pin=1;LYR.pin=1;X4.cc=uP(0,250);
  const go=()=>{x4Talk('');P.heroAnim=null;X4.cc=null;KFW.pin=0;LYR.pin=0;XC.seen=1;XC.ph=1;XC.t=0;XC.ht=4;XC.st=9;F.cyc=2.6;xcWicks();toast('Hit each <b>candle</b> with any spell to light it. The Crown will try to stop you.','The Hollow Crown',true)};
  if(XC.seen){x5Banner('THE HOLLOW CROWN','LIGHT THE THREE CANDLES','#7dff9a',2);go();return}
  const wS=(s,d)=>x4S(()=>P.pos,s,d||2.4,1.7),kS=(s,d)=>x4S(x4K,s,d||2.3,1.75),lS=(s,d)=>x4S(x4L,s,d||2.2,1.6);const fS=k=>({pos:uP(3.4-k*1.4,246.5+k,2.6),look:uP(0,256,3.2)});let bolt=null;
  playCutscene([{dur:5,fov:54,title:['Chapter XVI','The Hollow Crown'],cam:k=>({pos:uP(-9+k*9,224+k*10,7-k*3.4),look:uP(0,256,3)}),onStart:()=>{x4Talk('');sx('wind',.5,null,{rate:.5})}},
    {who:'The Crown',text:XL3.cr_01,fov:38,cam:fS},{who:'@',text:XL3.mw_10,cam:wS(1,2.3),onStart:()=>x4Talk('@')},
    {who:'The Crown',text:XL3.cr_02,fov:34,cam:k=>({pos:uP(-2.4+k,249,3.4),look:uP(0,256,3.5)}),onStart:()=>{x4Talk('');F.set('claw');after(2.2,()=>F.set('king'))}},
    {dur:2.3,fov:50,cam:k=>({pos:uP(5,232+k*2,2.6),look:uP(0,246,2.6)}),onStart:()=>{P.heroAnim='Spell_Simple_Shoot';sx('kame',.6);bolt=glowSprite(0xd4b6ff,2.4,1,false);scene.add(bolt)},
      update:(dt,k)=>{if(!bolt)return;const a=headOf(P.pos,1.4),b=uP(0,261,3);bolt.position.copy(a).lerp(b,Math.min(1,k*1.5));if(Math.random()<.8)SP.emit(bolt.position,{c0:0xffffff,c1:0xa060ff,s0:.4,s1:.04,life:.4});if(k>.45&&!bolt.userData.h){bolt.userData.h=1;F.burst(2.2);sx('portal',.5,null,{rate:1.5})}if(k>.68&&bolt.parent){scene.remove(bolt);flash(b,0xa060ff,8)}}},
    {who:'Kaen',text:XL3.kw_12,cam:kS(-1,2.3),onStart:()=>{P.heroAnim=null;x4Talk('Kaen')}},{who:'Lyra',text:XL3.lw_10,cam:lS(1,2.2),onStart:()=>x4Talk('Lyra'),update:()=>{if(LYR.a&&Math.random()<.5)SP.emit(headOf(LYR.a.g.position,1.2),{c0:0xfff0c0,c1:0xffa040,s0:.3,s1:.03,life:.8,up:.9})}}],
    ()=>{if(bolt&&bolt.parent)scene.remove(bolt);go()})}
/* a hand of smoke out of the floor */
function xcHand(p,r){p.y=groundAt(p.x,p.z);telegraph(p,r,.85,0x7dff9a,()=>{const g=new THREE.Group();g.position.copy(p);const m=new THREE.MeshBasicMaterial({color:0x0a140c,transparent:true,opacity:.9});for(let k=0;k<5;k++){const a=k/5*TAU;const c=new THREE.Mesh(new THREE.ConeGeometry(.42,3.6,5),m);c.position.set(Math.cos(a)*r*.5,1.8,Math.sin(a)*r*.5);c.rotation.set(Math.sin(a)*.35,0,-Math.cos(a)*.35);g.add(c)}g.add(glowSprite(0x7dff9a,r*2,.4));
    addFx(g,.9,(f,k)=>{const s=f.t<.12?f.t/.12:1-Math.max(0,k-.6)/.4;g.scale.set(1,s,1)},()=>{scene.remove(g)});SM.emit(V3(p.x,1,p.z),{n:14,c0:0x5a6a5e,c1:0x06100a,s0:1.5,s1:4,life:1,a:.5,up:2});sx('impact',.35,null,{rate:1.2});if(playerIn(p,r+.2,3.4)){damagePlayer(x5Dmg(22));P.shake=Math.max(P.shake,.5)}})}
function xcPinned(){if(CS.active){after(.4,xcPinned);return}XC.ph=1.5;sayHush();for(const e of enemies)if(!e.dead&&(e.xcA||e.type==='xwick'))removeEnemy(e);for(const p of eProjs)scene.remove(p.s);eProjs.length=0;const F=XC.fig;const fp=uP(0,240,2);F.cyc=.35;
  const beams=XC.stands.map(S=>{const b=new THREE.Mesh(new THREE.CylinderGeometry(.12,.12,1,8,1,true),new THREE.MeshBasicMaterial({color:0xffe0a0,transparent:true,opacity:0,blending:THREE.AdditiveBlending,depthWrite:false}));scene.add(b);return{b,S}});
  const mp=uP(0,226);x4Stage(mp,Math.PI);if(KFW.a){KFW.a.g.position.copy(uP(-2.6,224.6));KFW.a.g.rotation.y=Math.PI}if(LYR.a){LYR.a.g.position.copy(uP(2.5,224.4));LYR.a.g.rotation.y=Math.PI}KFW.pin=1;LYR.pin=1;X4.cc=fp.clone();
  playCutscene([{dur:3,fov:56,cam:k=>({pos:uP(-13+k*5,229,5+k*3),look:fp}),onStart:()=>{x4Talk('');sx('riser',1);x5Grey(0)},update:(dt,k)=>{F.g.position.lerp(V3(fp.x,0,fp.z),dt*2.5);for(const B of beams){const a=B.S.p,b=headOf(F.g.position,2.2);B.b.position.copy(a).lerp(b,.5);B.b.scale.set(1+k*3,a.distanceTo(b),1+k*3);B.b.quaternion.setFromUnitVectors(V3(0,1,0),b.clone().sub(a).normalize());B.b.material.opacity=k;if(Math.random()<.6)SP.emit(a.clone().lerp(b,Math.random()),{c0:0xffffff,c1:0xffb040,s0:.4,s1:.04,life:.5})}P.shake=Math.max(P.shake,k*.3)}},
    {who:'The Crown',text:XL3.cr_05,fov:36,cam:k=>({pos:uP(3-k*1.5,233,3.2),look:headOf(F.g.position,2.6)}),onStart:()=>{x5Impact(90,.14);sx('cackle',1,null,{rate:.5});P.shake=1.2;F.burst(1.2)},update:()=>{if(Math.random()<.2)F.burst(.9)}},
    {dur:2.6,fov:62,cam:k=>({pos:uP(-7,232-k*3,4+k*2),look:uP(0,258+k*6,3)}),onStart:()=>{for(const B of beams)scene.remove(B.b);F.cyc=0;F.set('serpent');sx('skyshatter',.9);x5Impact(80,.12);x5Punch(12,.4);P.shake=1.5;x5Gate('g4',true);const bp=uP(0,262,3);flash(bp,0x7dff9a,30);SM.emit(bp,{n:60,c0:0x8a9088,c1:0x101410,s0:3,s1:8,life:2,a:.6,speed:9});if(X5.chair){const ch=X5.chair;addFx(null,.8,(f,k)=>{ch.rotation.x=-k*1.3;ch.position.y=.9-k*.5})}},
      update:(dt,k)=>{F.g.position.lerp(uP(0,262+k*30,uFloor(262+k*30)+1),dt*3)}},
    {who:'Kaen',text:XL3.kw_13,cam:x4S(x4K,1,2.3,1.75),onStart:()=>x4Talk('Kaen')}],
    ()=>{for(const B of beams)scene.remove(B.b);x4Talk('');P.heroAnim=null;X4.cc=null;KFW.pin=0;LYR.pin=0;xcChase()})}
/* the run to the light */
function xcChase(){XC.ph=2;XC.t=0;XC.front=258;XC.rk=.5;const F=XC.fig||xcFig(1);F.cyc=0;F.set('serpent');F.g.position.copy(uP(0,280,uFloor(280)+1));x5Gate('g4',true,true);x5Banner('RUN!','FOLLOW IT TO THE LIGHT','#fff0d0',1.6,'#101410');x5Say('Lyra','lw_11',1);try{x4Kin('in')}catch(x){}renderer.domElement.style.transform='';P.invuln=1}
function xcRock(p){p.y=groundAt(p.x,p.z);telegraph(p,1.9,.8,0xfff0d0,()=>{const m=new THREE.Mesh(new THREE.DodecahedronGeometry(1.1,0),x5Mats().stone);m.position.set(p.x,p.y+.6,p.z);addFx(m,1.2,(f,k)=>{m.scale.setScalar(1-Math.max(0,k-.7)/.3)},()=>{scene.remove(m);m.geometry.dispose()});SM.emit(V3(p.x,p.y+.6,p.z),{n:10,c0:0x9aa098,c1:0x1c201c,s0:1.5,s1:4,life:.9,a:.5,speed:3});sx('impact',.4,null,{rate:rand(.9,1.3)});P.shake=Math.max(P.shake,.3);if(playerIn(p,2,3))damagePlayer(x5Dmg(16))})}
function xcExit(){if(XC.ph!==2)return;XC.ph=3;const k=document.getElementById('kinFx');if(k)k.style.opacity='0';sx('unveil',.9);x5White(.45,.5,()=>{camera.fov=60;camera.updateProjectionMatrix();xcFigOff();x5Leave(V3(-126,0,-9872));CH2.st=Math.max(CH2.st,21);ch2Save();writeSave();XC.ph=0;P.face=-Math.PI/2;yaw=Math.PI/2;if(typeof xoBegin==='function')xoBegin(true)})}
function x5CTick(dt,s){for(const S of XC.stands)if(S.on){S.fl.material.opacity=.8+Math.random()*.2;S.fl.scale.setScalar(4.2+Math.sin(time*11)*.3);if(Math.random()<.5)FL.emit(S.p,{n:1,c0:0xffffff,c1:0xffa030,s0:.7,s1:.06,life:.6,up:2,jitter:.1})}
  if(CH2.st!==20||CS.active)return;if(!XC.ph){if(s>222.5)xcIntro();return}const F=XC.fig;XC.t+=dt;
  if(XC.ph===1&&F){if(s<219.5)P.pos.z=uZ(219.5);const a=XC.t*.33,R=9+Math.sin(XC.t*.7)*3;F.g.position.lerp(uP(Math.sin(a)*R,240+Math.cos(a*1.3)*8,1.2+Math.sin(XC.t)*.5),Math.min(1,dt*1.2));
    for(let i=0;i<3;i++){const w=XC.wicks[i];if(w&&!w.dead&&!XC.stands[i].on&&w.hp<w.maxhp*.999&&Math.random()<.3)SP.emit(XC.stands[i].p,{c0:0xffd070,c1:0xff7010,s0:.3,s1:.03,life:.5,up:1})}
    XC.ht-=dt;if(XC.ht<=0){XC.ht=(XC.lit>=2?1.5:XC.lit===1?2.2:3)*(DIFF==='easy'?1.5:1);xcHand(V3(P.pos.x+rand(-1.5,1.5),0,P.pos.z+rand(-1.5,1.5)),2.6);if(XC.lit>=2)xcHand(V3(P.pos.x+rand(-7,7),0,P.pos.z+rand(-7,7)),2.6)}
    XC.st-=dt;if(XC.st<=0){XC.st=XC.lit>=2?6:9;const o=V3(F.g.position.x,0,F.g.position.z),d=V3(P.pos.x-o.x,0,P.pos.z-o.z).normalize(),to=o.clone().addScaledVector(d,34);F.set('beast');after(2,()=>{if(XC.fig===F&&XC.ph===1)F.cyc=2.6});F.cyc=0;
      lineTelegraph(o,to,4.4,.95,0x7dff9a,()=>{if(XC.ph!==1)return;sx('wind',.7,null,{rate:.7});for(let k=0;k<22;k++)after(k*.02,()=>SM.emit(V3(o.x+d.x*k*1.5,1.2,o.z+d.z*k*1.5),{n:3,c0:0x5a6a5e,c1:0x06100a,s0:2,s1:5,life:1,a:.6,speed:2}));if(distToSeg(P.pos,o,to)<2.6&&P.pos.y<4){damagePlayer(x5Dmg(26));x5Punch(9,.3)}})}}
  if(XC.ph===2&&F){/* it stays just ahead; the roof comes down behind */
    const fs=clamp(Math.max(s+13,uS(F.g.position.z)+dt*4),270,UE-1);F.g.position.lerp(uP(Math.sin(XC.t*2.2)*2,fs,uFloor(fs)+1.6+Math.sin(XC.t*3)*.5),Math.min(1,dt*4));F.g.rotation.y=Math.sin(XC.t*2)*.3;
    camera.fov=lerp(camera.fov,70+Math.sin(XC.t*9)*1.2,Math.min(1,dt*3));camera.updateProjectionMatrix();if(s<262.6)P.pos.z=uZ(262.6);
    XC.rk-=dt;if(XC.rk<=0&&s<UE-20){XC.rk=DIFF==='easy'?1.1:.65;xcRock(uP(rand(-3.4,3.4),s+rand(7,13)))}
    XC.front+=dt*(XC.t<2.5?0:DIFF==='easy'?6.8:8.2);const fz=uZ(XC.front),fy=uFloor(XC.front);for(let k=0;k<3;k++)SM.emit(V3(uX(rand(-4,4)),fy+rand(.5,6),fz+rand(-1,1)),{c0:0x8a9088,c1:0x101410,s0:3,s1:8,life:1.4,a:.6,speed:2});if(Math.random()<.2){P.shake=Math.max(P.shake,.25);if(Math.random()<.3)sx('impact',.3,null,{rate:rand(.6,.9)})}
    if(s<XC.front){XC.dT=(XC.dT||0)-dt;if(XC.dT<=0){XC.dT=.5;damagePlayer(maxHP()*.07);P.pos.z-=2.5;toast('The tunnel is falling on you. Run!')}}
    if(s>UE-34&&!XC.said.l){XC.said.l=1;x5Say('@','mw_11',1)}if(s>UE-4.5)xcExit()}}
{const _mt=muTick;muTick=function(dt){_mt(dt);if(!started||MODE==='open')return;if(XC.fig)try{XC.fig.tick(dt)}catch(x){}}}

/* =====================================================================================
   out in the square: every face it ever ate, then Kaen's, then yours
   ===================================================================================== */
const XO={ph:0,form:0,e:null,seen:0,cmp:0,t:0,B:{x0:-173,x1:-113,z0:-9897,z1:-9847},k:{cd:3,busy:0,ang:1,n:0,an:''},l:{cd:4,busy:0,ang:-2,n:0,an:''},coil:[],mir:null,sil:[],lastCast:null,lastT:0};
const XOF=[{t:'kitsune',nm:'HAKUKO',sub:'THE MASKED FOX',who:'Hakuko',hp:1800,col:'#bfe6ff'},{t:'slug',nm:'GORGOLOTH',sub:'THE CRIMSON SLUG',who:'Gorgoloth',hp:2100,col:'#ff5a5a',say:'cr_07'},{t:'catdemon',nm:'AZURMAW',sub:'THE GRINNING CAT',who:'Azurmaw',hp:1000,col:'#6ab8ff'},
  {t:'beast',nm:'THE NINE-TAILS',sub:'CRIMSON, AGAIN',who:'the Nine-Tails',hp:2100,col:'#ff6a4a',say:'cr_08'},{t:'giant',nm:'HRÍMGAR',sub:'THE FROST GIANT',who:'Hrímgar',hp:2400,col:'#9fe3ff',say:'cr_09'},{t:'illusion',nm:'KAEN',sub:'MASTER OF ILLUSIONS',who:'Kaen',hp:3400,col:'#c9a6ff'}];
const XOC=()=>V3(-150,0,-9872);
function xoGreyList(root){const L=[],C=new Map();root.traverse(o=>{if(!(o.isMesh||o.isSkinnedMesh)||!o.material||Array.isArray(o.material)||!o.visible)return;const m=o.material;if(m.transparent||m.depthWrite===false||m.alphaMap)return;for(let q=o.parent;q&&q!==root;q=q.parent)if(!q.visible)return;if(!m.isMeshStandardMaterial&&!m.isMeshBasicMaterial&&!m.isMeshLambertMaterial&&!m.isMeshPhongMaterial)return;if(m.blending===THREE.AdditiveBlending)return;
    let c=C.get(m);if(!c){c=m.clone();const l=m.color?(m.color.r*.3+m.color.g*.59+m.color.b*.11):.5,g=.16+l*.42;if(c.color)c.color.setRGB(g*.92,g,g*.95);if(c.emissive){c.emissive.setRGB(.02,.06,.035);c.emissiveMap=null}if('metalness' in c){c.metalness=.1;c.roughness=.9}c.needsUpdate=true;C.set(m,c)}L.push([o,m,c])});return L}
function xoSetGrey(L,grey){for(const q of L)q[0].material=grey?q[2]:q[1]}
function xoDef(F){const k='xo_'+F.t;if(!ETYPES[k]){const o=ETYPES[F.t];ETYPES[k]=Object.assign({},o,{hp:F.hp,lvl:undefined,gate:undefined,need:undefined,needBQ:undefined,final:false,noCalm:true,xp:0,dmg:Math.min(o.dmg*1.2,36),name:'The Hollow Crown, wearing '+F.who})}return k}
{const _ai=BOSSAI.illusion;BOSSAI.illusion=function(e,dt,d){if(e.xo){if(e.hp<=e.maxhp*.125)return;const r=_ai.apply(this,arguments);e.hpFloor=.12;return r}return _ai.apply(this,arguments)}}
function xoSpawn(i,at,color){const F=XOF[i];const e=spawnEnemy(xoDef(F),V3(at.x,0,at.z));e.type=F.t;e.aggro=true;e.quest=true;e.xo={L:xoGreyList(e.m.g),t:color?rand(6,9):4,grey:!color,F};e.hpFloor=F.t==='illusion'?.12:.03;e.ai.g0=e.ai.g1=e.ai.g2=1;e._clash=true;if(!color)xoSetGrey(e.xo.L,true);
  e.m.g.children.forEach(c=>{if(c.material&&c.material.map===scorchTex)c.visible=false});bossRef=e;$('boss').classList.remove('hidden');$('bossName').innerHTML=`The Hollow Crown <span style="color:${F.col}">· wearing ${F.who}</span>`;XO.e=e;XO.form=i;x5Bars(7,i);return e}
function xoClear(keep){for(const o of enemies)if(!o.dead&&o!==keep)removeEnemy(o);for(const p of eProjs)scene.remove(p.s);eProjs.length=0;snow.force=0}
/* one face melts into the next: impact frame, the smoke, the name slammed across the screen */
function xoMorph(i){if(CS.active){after(.3,()=>xoMorph(i));return}const old=XO.e,F=XOF[i];const p=old?old.pos.clone():XOC();p.y=groundAt(p.x,p.z);XO.ph=1.5;XO.e=null;P.invuln=Math.max(P.invuln,4);sayHush();
  const v=V3(p.x-P.pos.x,0,p.z-P.pos.z);if(v.lengthSq()<.01)v.set(0,0,-1);v.normalize();const a0=Math.atan2(-v.x,-v.z);let fig=null,e=null;for(const q of eProjs)scene.remove(q.s);eProjs.length=0;
  const orbit=(R,y,an)=>V3(p.x+Math.sin(a0+an)*R,p.y+y,p.z+Math.cos(a0+an)*R);
  playCutscene([
    /* wide: the old face boils away into the smoke */
    {dur:1.9,fov:52,cut:true,cam:k=>({pos:orbit(19+k*4,7.5+k*2,-.35+k*.55),look:V3(p.x,p.y+2.2,p.z)}),onStart:()=>{CS.speed=.8;x5Impact(80,.12);sx('skyshatter',.6,null,{rate:1.3});sx('portal',.7,null,{rate:.7});sx('riser',.6,null,{rate:1.2});P.shake=.9;
        if(old&&old.m&&old.m.g.parent){const g=old.m.g;if(old.xo)xoSetGrey(old.xo.L,true);old.dead=true;if(old===bossRef)bossRef=null;$('boss').classList.add('hidden');addFx(null,1.1,(f,k)=>{g.scale.set(Math.max(.01,1-k*.9),1+k*.6,Math.max(.01,1-k*.9));g.position.y=p.y+k*2.2;g.rotation.y+=k*.4},()=>{scene.remove(g)})}
        xoClear(null);fig=xcFig(1.5);fig.g.position.copy(p);fig.cyc=.18;fig.burst(1.8);for(let k=0;k<20;k++)fig.tick(.03)},
      update:(dt,k)=>{for(let n=0;n<3;n++){const an=time*3+n*2.1,r=4.5*(1-k)+1.2;SM.emit(V3(p.x+Math.sin(an)*r,p.y+k*5+rand(0,1.5),p.z+Math.cos(an)*r),{c0:0x10262c,c1:0x010304,s0:2,s1:5,life:1.2,a:.6,up:2.5})}
        if(Math.random()<.5)SP.emit(V3(p.x+rand(-1,1),p.y+rand(0,5),p.z+rand(-1,1)),{c0:0xffffff,c1:0x7dff9a,s0:.4,s1:.04,life:.7,up:4});camera.fov=52+k*6;camera.updateProjectionMatrix()}},
    /* the new face erupts out of it, camera rushes in */
    {dur:2,fov:58,cut:true,cam:k=>{const q=1-Math.pow(1-Math.min(1,k*1.6),3);return{pos:orbit(24-q*11,6-q*3.2,.2+k*.18),look:V3(p.x,p.y+1.7,p.z)}},onStart:()=>{xcFigOff();flash(p,0xffffff,30);ring(p,0x7dff9a,1,16,.55);ring(p,0xffffff,.5,9,.35);SP.emit(V3(p.x,p.y+2,p.z),{n:160,c0:0xffffff,c1:0x7dff9a,speed:14,life:1,s0:.7,s1:.05});
        SM.emit(V3(p.x,p.y+1,p.z),{n:40,c0:0x10262c,c1:0x010304,s0:2,s1:7,life:1.4,a:.6,speed:9});sx('impact',.9);sx('ktf',.5,null,{rate:1.4});x5Impact(110,.18);x5Punch(16,.5);P.shake=1.4;CS.speed=1;
        e=xoSpawn(i,p);e.busy=99;e.invuln=true;e.m.g.scale.setScalar(.12);e.m.g.rotation.y=Math.atan2(P.pos.x-p.x,P.pos.z-p.z);$('boss').classList.add('hidden');if(F.t==='giant')snow.force=1;after(.35,()=>x5Banner(F.nm,F.sub,F.col,1.8));if(F.say)x5Say('The Crown',F.say,1)},
      update:(dt,k)=>{if(e)e.m.g.scale.setScalar(.12+.88*eBack(Math.min(1,k*2.2)));camera.fov=58-Math.sin(Math.min(1,k*1.4)*Math.PI*.5)*12;camera.updateProjectionMatrix()}}],
    ()=>{xcFigOff();CS.speed=1;if(!e){e=xoSpawn(i,p)}e.m.g.scale.setScalar(1);e.busy=.6;e.invuln=false;bossRef=e;$('boss').classList.remove('hidden');XO.ph=1;XO.cmp=i<5?1:0;P.invuln=Math.max(P.invuln,1.2)})}
/* companions: the Portobello kit, on whoever the Crown is wearing */
function xoCmpMove(c,a,dt,R,run){const e=XO.e,g=a.g.position,B=XO.B;c.ang+=dt*.2;let tx=clamp(e.pos.x+Math.sin(c.ang)*R,B.x0+2,B.x1-2),tz=clamp(e.pos.z+Math.cos(c.ang)*R,B.z0+2,B.z1-2);const dp=Math.hypot(tx-P.pos.x,tz-P.pos.z);if(dp<3.5){tx+=(tx-P.pos.x)/(dp||1)*(3.5-dp);tz+=(tz-P.pos.z)/(dp||1)*(3.5-dp)}
  const dx=tx-g.x,dz=tz-g.z,L=Math.hypot(dx,dz),v=Math.min(L,dt*(L>6?run:run*.55));if(L>.05){g.x+=dx/L*v;g.z+=dz/L*v}g.y=groundAt(g.x,g.z);if(L>2.2){a.g.rotation.y=lerpAngle(a.g.rotation.y,Math.atan2(dx,dz),Math.min(1,dt*8));return L>6?'Sprint_Loop':'Walk_Loop'}a.g.rotation.y=lerpAngle(a.g.rotation.y,Math.atan2(e.pos.x-g.x,e.pos.z-g.z),Math.min(1,dt*6));return null}
function xoCmpTick(dt){const e=XO.e;if(!e||e.dead||e.invuln)return;const K=KFW.a,Ly=LYR.a;KFW.pin=1;LYR.pin=1;
  if(K){K.g.visible=true;const c=XO.k;c.busy=Math.max(0,c.busy-dt);c.cd-=dt;if(!c.busy){const an=xoCmpMove(c,K,dt,10,8.5);x4CmpAnim(c,K,an||'Idle_Loop');if(c.cd<=0&&!an&&P.alive){c.cd=rand(3.6,5.2);c.n++;c.an='';const r=c.n%3;if(r===0)x4KDash(K,e,c);else if(r===1)x4KWave(K,e);else x4KVoid(K,e);c.busy=Math.max(c.busy,.7)}}}
  if(Ly){Ly.g.visible=true;const c=XO.l;c.busy=Math.max(0,c.busy-dt);c.cd-=dt;if(!c.busy){const an=xoCmpMove(c,Ly,dt,13,7.5);x4CmpAnim(c,Ly,an||'Spell_Simple_Idle_Loop');if(c.cd<=0&&!an&&P.alive){c.cd=rand(2.8,3.8);c.n++;c.an='';x4LBalls(Ly,e);c.busy=Math.max(c.busy,.6)}}}}
/* smoke coils: they hold Kaen and Lyra out of the last two fights */
function xoCoil(on){for(const c of XO.coil)scene.remove(c);XO.coil=[];if(!on)return;const ps=[V3(-119,0,-9866),V3(-119,0,-9878)];const A=[KFW.a,LYR.a];A.forEach((a,i)=>{if(!a)return;a.g.position.copy(ps[i]);a.g.rotation.y=-Math.PI/2;a.g.visible=true;try{a.setBase('Crouch_Idle_Loop',.3)}catch(x){}
    const g=new THREE.Group();g.position.copy(ps[i]);const m=new THREE.MeshBasicMaterial({color:0x0c160e,transparent:true,opacity:.85});for(let k=0;k<3;k++){const t=new THREE.Mesh(new THREE.TorusGeometry(.62-k*.06,.09,6,18),m);t.rotation.x=Math.PI/2;t.position.y=.5+k*.5;g.add(t)}g.add(glowSprite(0x7dff9a,3,.3));scene.add(g);XO.coil.push(g)});KFW.pin=1;LYR.pin=1}
function x5OObj(d){if(!XO.ph)return `Face the Crown in the square before the Abbey · ${d}m`;if(CH2.st===22||XO.ph>=2)return 'Defeat <b>yourself</b>';const F=XOF[XO.form];return `The Crown is wearing <b>${F?F.who:'a face'}</b>. Break it`}
function x5OReset(){xcFigOff();xoCoil(false);for(const s of XO.sil)scene.remove(s.g);XO.sil=[];if(XO.e&&!XO.e.dead)removeEnemy(XO.e);if(XO.mir&&!XO.mir.dead)removeEnemy(XO.mir);XO.e=XO.mir=null;XO.ph=0;XO.form=0;XO.cmp=0;XO.t=0;KFW.pin=0;LYR.pin=0;snow.force=0;x5Bars(0);x5Grey(0);if(XO.cr){scene.remove(XO.cr);XO.cr=null}}
function x5ORevive(){const f=XO.form,st=CH2.st;xcFigOff();xoCoil(false);XO.e=XO.mir=null;XO.ph=0;XO.cmp=0;snow.force=0;KFW.pin=0;LYR.pin=0;if(st===21||st===22){P.pos.set(-122,0,-9872);P.face=-Math.PI/2;yaw=Math.PI/2;NZ.cp.set(-122,0,-9872);XO.form=f;XO.rt=2.2;after(1,()=>toast(st===22?'It is still wearing your face. Finish it.':'The Crown is still in the square. Pick up where it left you.','Second wind',true))}}
function xoArena(){const B=XO.B;P.pos.x=clamp(P.pos.x,B.x0,B.x1);P.pos.z=clamp(P.pos.z,B.z0,B.z1);if(P.pos.y>34){P.pos.y=34;P.vy=Math.min(P.vy||0,0)}for(const e of enemies){if(e.dead)continue;e.pos.x=clamp(e.pos.x,B.x0+e.def.r,B.x1-e.def.r);e.pos.z=clamp(e.pos.z,B.z0+e.def.r,B.z1-e.def.r)}
  if(Math.random()<.5){const s=Math.random()<.5,q=Math.random()<.5;SM.emit(V3(s?rand(B.x0,B.x1):q?B.x0:B.x1,rand(.5,5),s?(q?B.z0:B.z1):rand(B.z0,B.z1)),{c0:0x4a5a4e,c1:0x06100a,s0:2,s1:6,life:2,a:.4,up:1})}}
/* the Crown steps out of the Abbey and shows you its collection */
function xoBegin(fromChase){if(CS.active||XO.ph)return;XO.ph=.5;sayHush();xoClear(null);x5AbbeyShow(true);const hp=V3(-124,0,-9872);x4Stage(hp,-Math.PI/2);P.face=-Math.PI/2;if(KFW.a){KFW.a.g.position.set(-122.6,0,-9874.6);KFW.a.g.rotation.y=-Math.PI/2;KFW.a.g.visible=true}if(LYR.a){LYR.a.g.position.set(-122.6,0,-9869.4);LYR.a.g.rotation.y=-Math.PI/2;LYR.a.g.visible=true}KFW.pin=1;LYR.pin=1;
  const C=XOC();X4.cc=C.clone();const F=xcFig(2.3);F.g.position.set(C.x-6,1,C.z);F.set('king');F.cyc=1.1;for(let k=0;k<20;k++)F.tick(.04);NZ.cp.copy(hp);SPAWN.copy(hp);
  const go=()=>{x4Talk('');P.heroAnim=null;X4.cc=null;XO.seen=1;for(const s of XO.sil)scene.remove(s.g);XO.sil=[];xcFigOff();XO.ph=1;const i=XO.form||0;XO.e=null;xoMorphIn(i,V3(C.x-4,0,C.z))};
  if(XO.seen&&!fromChase){go();return}
  /* build the silhouettes while the screen is still white from the tunnel */
  try{for(let i=0;i<5;i++){const m=ETYPES[XOF[i].t].build();xoSetGrey(xoGreyList(m.g),true);m.g.position.set(C.x-6,0,C.z);m.g.rotation.y=Math.PI/2;m.g.visible=false;scene.add(m.g);XO.sil.push(m)}}catch(x){console.warn(x)}
  const wS=(s,d)=>x4S(()=>P.pos,s,d||2.4,1.7);let si=-1,st=0;
  playCutscene([{dur:4.6,fov:60,cut:true,cam:k=>({pos:V3(-116+k*2,2.2+k*1.5,-9864-k*3),look:V3(C.x-6,7+k*2,C.z)}),onStart:()=>{x4Talk('');sx('wind',.6,null,{rate:.6});sx('bigben',.7,null,{wet:.5,rate:.8})},update:(dt,k)=>{F.g.position.y=1+k*1.5}},
    {who:'The Crown',text:XL3.cr_06,fov:44,cam:k=>({pos:V3(C.x+5-k*2,3,C.z+6-k),look:V3(C.x-6,6.5,C.z)}),onStart:()=>{F.cyc=.5}},
    {dur:3.2,fov:50,snap:true,cam:k=>({pos:V3(C.x+8,2.4,C.z+2),look:V3(C.x-6,4,C.z)}),onStart:()=>{F.g.visible=false;sx('riser',1,null,{rate:1.2})},
      update:(dt,k)=>{st-=dt;if(st<=0&&XO.sil.length){st=Math.max(.14,.5-k*.4);if(si>=0)XO.sil[si%XO.sil.length].g.visible=false;si++;const m=XO.sil[si%XO.sil.length];m.g.visible=true;x5Impact(45,0);sx('clash',.4,null,{rate:.6+Math.random()*.6});flash(m.g.position,0x7dff9a,10);P.shake=Math.max(P.shake,.5);
          camera.fov=50-(si%2)*8;camera.updateProjectionMatrix()}SM.emit(V3(C.x-6+rand(-3,3),rand(0,6),C.z+rand(-3,3)),{n:2,c0:0x5a6a5e,c1:0x06100a,s0:2,s1:6,life:1.2,a:.5,up:1})}},
    {who:'@',text:XL3.mw_12,cam:wS(1,2.3),onStart:()=>{x4Talk('@');for(const s of XO.sil)s.g.visible=false;if(XO.sil[0])XO.sil[0].g.visible=true}}],go)}
function xoMorphIn(i,p){XO.e={pos:p,m:{g:new THREE.Group()},xo:{L:[]},dead:true};xoMorph(i)}
/* "Kaen... I can't hit you." */
function xoKaen(){if(CS.active){after(.3,xoKaen);return}const old=XO.e;XO.ph=1.6;sayHush();const p=XOC().add(V3(-6,0,0));xoClear(null);if(old){scene.remove(old.m.g);old.dead=true}XO.e=null;bossRef=null;$('boss').classList.add('hidden');x5Impact(90,.16);sx('skyshatter',.6,null,{rate:1.2});
  const hp=V3(p.x+10,0,p.z);x4Stage(hp,-Math.PI/2);P.face=-Math.PI/2;xoCoil(true);X4.cc=p.clone();const e=xoSpawn(5,p,true);e.invuln=true;e.busy=999;e.m.g.rotation.y=Math.PI/2;const fig=xcFig(1.3);fig.g.position.copy(p);fig.cyc=.3;
  const kp=()=>KFW.a?KFW.a.g.position:hp;
  playCutscene([{dur:2.6,fov:44,cam:k=>({pos:V3(p.x+5-k,1.8,p.z+2.4),look:headOf(p,1.5)}),onStart:()=>{e.m.g.scale.setScalar(.01);x5Banner('KAEN','MASTER OF ILLUSIONS','#c9a6ff',2)},update:(dt,k)=>{e.m.g.scale.setScalar(Math.min(1,k*1.5));fig.g.scale.setScalar(1.3*(1-Math.min(1,k*1.4)));if(k>.75&&XC.fig)xcFigOff()}},
    {who:'@',text:XL3.mw_13,fov:36,cam:x4S(()=>P.pos,1,2.2,1.6),onStart:()=>{xcFigOff();P.heroAnim='Idle_Loop';x5Grey(1)}},
    {who:'Kaen',text:XL3.fk_01,fov:34,cam:k=>({pos:headOf(p,1.6).add(V3(2.6-k*.4,0,.9)),look:headOf(p,1.55)}),onStart:()=>{try{e.m.actor.setBase('Idle_Talking_Loop',.3)}catch(x){}}},
    {who:'Kaen',text:XL3.kw_14,fov:38,cam:k=>({pos:headOf(kp(),1.2).add(V3(-2.6,.2,-1.4+k*.5)),look:headOf(kp(),1)}),onStart:()=>{x5Grey(0);x5Impact(70,.1);P.shake=.8;try{KFW.a&&KFW.a.setBase('Crouch_Idle_Loop',.2)}catch(x){}},update:()=>{if(Math.random()<.5)SP.emit(headOf(kp(),1),{c0:0xffffff,c1:0xb070ff,s0:.4,s1:.04,life:.5,speed:3})}},
    {who:'@',text:XL3.mw_14,fov:38,cam:x4S(()=>P.pos,-1,2.2,1.7),onStart:()=>{P.heroAnim='Idle_Talking_Loop'}}],
    ()=>{x5Grey(0);xcFigOff();P.heroAnim=null;X4.cc=null;try{e.m.actor.setBase('Idle_Loop',.2)}catch(x){}e.m.g.scale.setScalar(1);e.invuln=false;e.busy=.8;XO.ph=1;XO.cmp=0;P.invuln=1.5;x5Punch(12,.4)})}

/* =====================================================================================
   the last face: yours
   ===================================================================================== */
function buildMirror(){const HP=CH.heroParts&&CH.heroParts.f;const full=!!(HP&&HP.wiz&&HP.wiz.length);
  const a=makeCHActor('f',{skin:0xf2d6c8,hair:'hairLong',hairCol:0xc8c8d4,brow:0x7a7280,eyeTint:0x9dffb0,keepReg:full?[5,6]:[5,6,9],wear:full?[]:[['long',0x1c1422,{roughness:.6}],['witch',0x1c1422,{roughness:.55,side:THREE.DoubleSide}],['shoes',0x121016,{roughness:.5}]]});if(!a)return buildGuardian();
  /* the same clothes you are wearing, thread for thread */
  if(full)try{for(const geo of HP.wiz)a.sk(geo,HP.wm);if(HP.skirtM)a.sk(a.S.geo.witch,HP.skirtM);if(HP.cape)a.sk(HP.cape,HP.capeM)}catch(x){console.warn(x)}
  try{const SKh=a.S.SK.Head,vd=std({color:0x16101c,roughness:.5}),hat=new THREE.Group();hat.add(new THREE.Mesh(lathe([[.001,0],[.31,-.015],[.32,.01],[.12,.025],[.105,.15],[.07,.33],[.03,.5],[.005,.6]],28),vd));const band=new THREE.Mesh(new THREE.TorusGeometry(.112,.022,8,24),std({color:0x4a5a36,roughness:.7}));band.rotation.x=Math.PI/2;band.position.y=.05;hat.add(band);
    const buckle=new THREE.Mesh(new THREE.TorusGeometry(.03,.007,4,4),MAT.gold||std({color:0xd8b040,metalness:1,roughness:.3}));buckle.position.set(0,.05,.13);hat.add(buckle);
    a.attach('Head',hat,V3(0,SKh.y+.115,SKh.z-.01),new THREE.Euler(-.12,0,.08));for(const q of[-1,1]){const gl=glowSprite(0x9dffb0,.13,.9);a.attach('Head',gl,V3(q*.032,SKh.y+.045,SKh.z+.105))}
    const wand=new THREE.Group();const wd=new THREE.Mesh(new THREE.CylinderGeometry(.007,.011,.34,6),std({color:0x1a1014,roughness:.3,metalness:.3}));wd.rotation.z=Math.PI/2;wd.position.x=-.12;wand.add(wd);const orb=new THREE.Mesh(G_shard(),new THREE.MeshBasicMaterial({color:0x9dffb0}));orb.position.x=-.3;orb.scale.setScalar(.5);wand.add(orb);const og=glowSprite(0x9dffb0,1.8);og.scale.setScalar(.42);orb.add(og);
    const H=a.S.SK.hand_r;a.attach('hand_r',wand,V3(H.x-.07,H.y,H.z+.03),new THREE.Euler(0,.25,0))}catch(x){console.warn(x)}
  return{g:a.g,body:a.body,actor:a,head:a.head,anim:(e,dt,mv)=>{const bz=e.busy;if(bz>50)e.busy=0;actorAnimate(e,dt,mv);e.busy=bz}}}
ETYPES.xmirror={name:'The Hollow Crown, wearing you',boss:true,hp:6400,speed:6.6,dmg:26,range:0,cd:9,xp:6000,r:.7,h:1.9,kite:true,fly:1,ghost:true,noCalm:true,build:buildMirror};
function xoBeam(A,B,col,dur,w){const d=B.clone().sub(A),L=d.length()||.01;const g=new THREE.Group();g.position.copy(A).addScaledVector(d,.5);g.quaternion.setFromUnitVectors(V3(0,1,0),d.clone().normalize());scene.add(g);const W=w||.3;
  const core=new THREE.Mesh(new THREE.CylinderGeometry(W*.3,W*.3,L,8,1,true),new THREE.MeshBasicMaterial({color:0xffffff,transparent:true,blending:THREE.AdditiveBlending,depthWrite:false}));const sh=new THREE.Mesh(new THREE.CylinderGeometry(W,W,L,14,1,true),new THREE.MeshBasicMaterial({color:col,transparent:true,opacity:.6,blending:THREE.AdditiveBlending,depthWrite:false,side:THREE.DoubleSide}));g.add(core,sh);
  addFx(g,dur||.5,(f,k)=>{core.material.opacity=1-k;sh.material.opacity=.6*(1-k);const s=1+k*1.4;sh.scale.set(s,1,s)},()=>{scene.remove(g);core.geometry.dispose();sh.geometry.dispose()})}
function xmBlink(e){const o=eCenter(e),B=XO.B;flash(o,0x7dff9a,8);SM.emit(o,{n:14,c0:0x5a6a5e,c1:0x06100a,s0:1.4,s1:4,life:.9,a:.6,speed:3});const an=rand(0,TAU),R=rand(10,15);e.pos.x=clamp(P.pos.x+Math.sin(an)*R,B.x0+2,B.x1-2);e.pos.z=clamp(P.pos.z+Math.cos(an)*R,B.z0+2,B.z1-2);e.pos.y=groundAt(e.pos.x,e.pos.z);
  const n=eCenter(e);flash(n,0xb070ff,8);SP.emit(n,{n:30,c0:0xffffff,c1:0x7dff9a,speed:6,life:.5,s0:.4,s1:.04});sx('portal',.35,null,{rate:1.8})}
BOSSAI.xmirror=function(e,dt,d){const a=e.ai,act=e.m.actor;if(a.m0===undefined){a.m0=1;a.a1=1.6;a.a2=3.2;a.a3=5;a.a4=6.5;a.a5=9;a.cp=0}if(XO.clash)return;a.a1-=dt;a.a2-=dt;a.a3-=dt;a.a4-=dt;a.a5-=dt;a.cp-=dt;if(e.busy>0)return;
  const rage=e.hp<e.maxhp*.5,c=eCenter(e),dir=V3(P.pos.x-c.x,(P.pos.y+1.1)-c.y,P.pos.z-c.z).normalize();e.m.g.rotation.y=Math.atan2(dir.x,dir.z);const fire=n=>{try{act&&act.fire(n||'Spell_Simple_Shoot',.35)}catch(x){}};
  /* it throws your own cast straight back */
  if(a.cp<=0&&performance.now()-XO.lastT<220){a.cp=2.4;fire();enemyOrb(c,dir,22,x5Dmg(13),0xd4b6ff,.34,{keepY:true});floatText(headOf(e.pos,2.3),'MIRRORED','#7dff9a');sx('laser',.3,null,{rate:1.6});return}
  if(a.a4<=0&&d>5){a.a4=rage?5.5:8.5;e.busy=1.25;fire('Spell_Simple_Idle_Loop');const o=V3(e.pos.x,0,e.pos.z),f=V3(P.pos.x-o.x,0,P.pos.z-o.z).normalize(),to=o.clone().addScaledVector(f,38);sx('riser',.5,null,{rate:1.6});
    lineTelegraph(o,to,3,.95,0xb070ff,()=>{if(e.dead)return;fire();xoBeam(headOf(o,1.3),headOf(to,1.3),0xb070ff,.55,.9);sx('dbeam',.8,null,{rate:1.2});x5Punch(8,.3);P.shake=Math.max(P.shake,.6);if(distToSeg(P.pos,o,to)<1.9&&P.pos.y<4)damagePlayer(x5Dmg(30))});return}
  if(a.a3<=0&&d<9){a.a3=rage?5:7.5;e.busy=.95;fire('Spell_Simple_Idle_Loop');const p=e.pos.clone();telegraph(p,7.5,.8,0xb070ff,()=>{if(e.dead)return;ring(p,0xb070ff,1,7.5,.4);flash(headOf(p,1),0xb070ff,14);SP.emit(headOf(p,1),{n:90,c0:0xffffff,c1:0x8040ff,speed:13,life:.6,s0:.5,s1:.05});sx('shbreak',.7);if(playerIn(p,7.7,4)){damagePlayer(x5Dmg(26));x5Punch(9,.3)}});return}
  if(a.a2<=0&&(d<6||Math.random()<.5)){a.a2=rage?2.6:4.2;xmBlink(e);a.a1=Math.min(a.a1,.35);return}
  if(rage&&a.a5<=0){a.a5=8;e.busy=.8;fire();sx('summon',.5,null,{rate:1.3});for(let k=0;k<10;k++){const an=k/10*TAU;enemyOrb(c,V3(Math.sin(an),0,Math.cos(an)),11,x5Dmg(12),0x7dff9a,.3)}return}
  if(a.a1<=0){a.a1=rage?1.05:1.6;fire();const n=rage?3:1;for(let k=0;k<n;k++){const off=(k-(n-1)/2)*.2,dd=V3(dir.x*Math.cos(off)-dir.z*Math.sin(off),dir.y,dir.x*Math.sin(off)+dir.z*Math.cos(off));enemyOrb(c,dd,19,x5Dmg(13),0xb070ff,.3,{keepY:true})}sx('laser',.25,null,{rate:1.2})}};
{const _tc=tryCast;tryCast=function(i){if(XO.clash){XO.clash.k+=DIFF==='easy'?.075:.06;XO.clash.n++;x5Punch(3,.12);return}XO.lastT=performance.now();return _tc.apply(this,arguments)}}
/* beam against beam: mash to push it down its throat */
function xmClash(e){const mp=P.pos.clone();XO.clash={t:0,k:.5,n:0,e,mp,b:[]};e.busy=99;e.invuln=true;for(const p of eProjs)scene.remove(p.s);eProjs.length=0;P.invuln=9;P.heroAnim='Spell_Simple_Idle_Loop';try{e.m.actor.setBase('Spell_Simple_Idle_Loop',.2)}catch(x){}
  const mk=col=>{const m=new THREE.Mesh(new THREE.CylinderGeometry(.34,.34,1,14,1,true),new THREE.MeshBasicMaterial({color:col,transparent:true,opacity:.85,blending:THREE.AdditiveBlending,depthWrite:false,side:THREE.DoubleSide}));scene.add(m);return m};XO.clash.b=[mk(0xb070ff),mk(0x7dff9a)];XO.clash.orb=glowSprite(0xffffff,6,1);scene.add(XO.clash.orb);
  x5Impact(90,.14);x5VS('MAËLLE','MAËLLE','#c9a6ff','#7dff9a','CLASH');x5Banner('CLASH!',(typeof isTouch!=='undefined'&&isTouch?'TAP':'MASH')+' ANY SPELL','#ffffff',2.2,'#1a0a2a');sx('dcharge',1);sx('riser',.8);x5Say('@','mw_17',1)}
function xmClashEnd(win){const C=XO.clash;if(!C)return;XO.clash=null;for(const b of C.b){scene.remove(b);b.geometry.dispose()}scene.remove(C.orb);P.heroAnim=null;P.invuln=1.5;const e=C.e;if(!e||e.dead)return;e.invuln=false;const c=eCenter(e);
  if(win){x5Impact(110,.2);x5Punch(16,.5);P.shake=1.4;flash(c,0xffffff,30);ring(e.pos,0xc9a6ff,1,14,.5);SP.emit(c,{n:160,c0:0xffffff,c1:0xb070ff,speed:15,life:1,s0:.7,s1:.05});sx('skyshatter',.8);x5Banner('BROKEN','IT CANNOT HOLD YOUR SHAPE','#c9a6ff',1.8);e.hp=Math.max(e.maxhp*e.hpFloor,e.hp-e.maxhp*.2);e.busy=2.6;if(e.xo){xoSetGrey(e.xo.L,true);e.xo.grey=true;e.xo.t=2.6}try{e.m.actor.setBase('Crouch_Idle_Loop',.2)}catch(x){}after(2.6,()=>{try{if(!e.dead)e.m.actor.setBase('Idle_Loop',.2)}catch(x){}})}
  else{x5Impact(90,.14);P.shake=1.2;flash(headOf(P.pos,1),0x7dff9a,24);P.invuln=0;damagePlayer(maxHP()*.28);P.invuln=1.5;x5Banner('OVERPOWERED','IT KNOWS YOUR SPELLS','#7dff9a',1.6);e.busy=1;try{e.m.actor.setBase('Idle_Loop',.2)}catch(x){}}}
function xmClashTick(dt){const C=XO.clash,e=C.e;if(!e||e.dead||!P.alive){xmClashEnd(false);return}C.t+=dt;C.k-=dt*(DIFF==='easy'?.16:DIFF==='hard'?.27:.21);P.pos.x=C.mp.x;P.pos.z=C.mp.z;P.vy=0;P.face=Math.atan2(e.pos.x-P.pos.x,e.pos.z-P.pos.z);e.m.g.rotation.y=P.face+Math.PI;
  const A=headOf(P.pos,1.3),B=eCenter(e),M=A.clone().lerp(B,clamp(C.k,.04,.96)),up=V3(0,1,0);const put=(m,a,b)=>{const d=b.clone().sub(a),L=d.length()||.01;m.position.copy(a).addScaledVector(d,.5);m.quaternion.setFromUnitVectors(up,d.normalize());const w=1+Math.sin(time*40)*.15;m.scale.set(w,L,w)};put(C.b[0],A,M);put(C.b[1],B,M);
  C.orb.position.copy(M);C.orb.scale.setScalar(5+Math.sin(time*30)*1.2);SP.emit(M,{n:4,c0:0xffffff,c1:Math.random()<.5?0xb070ff:0x7dff9a,speed:9,life:.4,s0:.5,s1:.05});P.shake=Math.max(P.shake,.35);camera.fov=lerp(camera.fov,52+Math.sin(time*22)*1.5,Math.min(1,dt*4));camera.updateProjectionMatrix();
  if(C.k>=1)xmClashEnd(true);else if(C.k<=0)xmClashEnd(false);else if(C.t>7)xmClashEnd(C.k>.5)}
function xoMirrorGo(p){xoClear(null);xcFigOff();const at=p||XOC().add(V3(-6,0,0));const e=spawnEnemy('xmirror',V3(at.x,0,at.z));e.aggro=true;e.quest=true;e.hpFloor=.04;e.xo={L:xoGreyList(e.m.g),t:5,grey:false,F:{who:'you'}};e.m.g.children.forEach(c=>{if(c.material&&c.material.map===scorchTex)c.visible=false});
  bossRef=e;$('boss').classList.remove('hidden');$('bossName').innerHTML='The Hollow Crown <span style="color:#c9a6ff">· wearing you</span>';XO.mir=e;XO.e=null;XO.form=6;XO.ph=2;XO.cmp=0;XO.t=0;XO.tn={};XO.cl=0;x5Bars(7,6);xoCoil(true);return e}
function xoMirror(){if(CS.active){after(.3,xoMirror);return}const old=XO.e;if(!old)return;XO.ph=1.8;sayHush();xoClear(old);$('boss').classList.add('hidden');bossRef=null;old.invuln=true;old.busy=999;const p=old.pos.clone();p.y=groundAt(p.x,p.z);try{old.m.actor.setBase('Crouch_Idle_Loop',.3)}catch(x){}
  const hp=V3(clamp(p.x+9,XO.B.x0+3,XO.B.x1-3),0,p.z);x4Stage(hp,Math.atan2(p.x-hp.x,p.z-hp.z));xoCoil(true);X4.cc=p.clone();let mir=null,fig=null;const side=V3(0,0,1);
  playCutscene([{who:'@',text:XL3.mw_15,fov:40,cam:x4S(()=>P.pos,1,2.4,1.7),onStart:()=>{x4Talk('@');sx('wind',.4,null,{rate:.5})}},
    /* slowly, the smoke takes the one shape left */
    {dur:7,fov:46,cut:true,cam:k=>({pos:V3(p.x+7-k*4.4,1.5+k*.2,p.z+2.6-k*1.6),look:headOf(p,1.25)}),onStart:()=>{P.heroAnim='Idle_Loop';x5Grey(1);xoSetGrey(old.xo.L,true);sx('riser',.9,null,{rate:.55});fig=xcFig(1.15);fig.g.position.copy(p);fig.set('king');fig.cyc=0;fig.g.scale.setScalar(.01);
        mir=xoMirrorGo(p);mir.invuln=true;mir.busy=999;mir.m.g.rotation.y=Math.atan2(hp.x-p.x,hp.z-p.z);mir.m.g.scale.setScalar(.01);xoSetGrey(mir.xo.L,true);$('boss').classList.add('hidden');XO.ph=1.8},
      update:(dt,k)=>{const g=old.m.g;if(k<.45){const q=k/.45;g.scale.set(1-q*.5,1-q*.75,1-q*.5);fig.g.scale.setScalar(.01+1.15*q)}else{g.visible=false;const q=(k-.45)/.55;fig.g.scale.setScalar(Math.max(.01,1.15*(1-q*q)));mir.m.g.scale.setScalar(Math.min(1,.2+q*.9));if(q>.8&&mir.xo.grey){mir.xo.grey=false;xoSetGrey(mir.xo.L,false);x5Impact(120,.2);x5Grey(0);sx('skyshatter',.7,null,{rate:.8});flash(headOf(p,1.2),0xffffff,26);x5Banner('MAËLLE','THE HOLLOW CROWN, WEARING YOU','#c9a6ff',2.4)}}
        if(Math.random()<.5)sx('heart',.5);SM.emit(V3(p.x+rand(-1,1),rand(.2,2.6),p.z+rand(-1,1)),{n:2,c0:0x5a6a5e,c1:0x06100a,s0:1.2,s1:3.4,life:1.3,a:.5,up:.8});camera.fov=46-k*14;camera.updateProjectionMatrix()}},
    {who:'???',text:XL3.mm_01,fov:30,cam:k=>({pos:headOf(p,1.55).add(V3((hp.x>p.x?1:-1)*(2.3-k*.4),.05,.8)),look:headOf(p,1.5)}),onStart:()=>{xcFigOff();scene.remove(old.m.g);old.dead=true;mir.m.g.scale.setScalar(1);try{mir.m.actor.setBase('Idle_Talking_Loop',.3)}catch(x){}}},
    {who:'@',text:XL3.mw_16,fov:36,cam:x4S(()=>P.pos,-1,2.2,1.65),onStart:()=>{x4Talk('@');try{mir.m.actor.setBase('Idle_Loop',.3)}catch(x){}}},
    {who:'Lyra',text:XL3.lw_12,fov:40,cam:k=>({pos:headOf(x4L(),1.1).add(V3(-2.8,.3,1.2)),look:headOf(x4L(),.8)})}],
    ()=>{x5Grey(0);xcFigOff();if(old.m.g.parent)scene.remove(old.m.g);old.dead=true;if(!mir){mir=xoMirrorGo(p);mir.m.g.rotation.y=Math.atan2(hp.x-p.x,hp.z-p.z)}P.heroAnim=null;X4.cc=null;CH2.st=Math.max(CH2.st,22);ch2Save();writeSave();if(mir){mir.m.g.scale.setScalar(1);mir.invuln=false;mir.busy=.9;xoSetGrey(mir.xo.L,false)}XO.ph=2;$('boss').classList.remove('hidden');bossRef=mir;P.invuln=1.5;x5VS('MAËLLE','MAËLLE','#c9a6ff','#7dff9a');x5Punch(12,.4)})}
/* the end of it */
function xoEnd(){if(CS.active){after(.3,xoEnd);return}const m=XO.mir;if(!m)return;if(XO.clash)xmClashEnd(true);XO.ph=3;sayHush();xoClear(m);$('boss').classList.add('hidden');bossRef=null;x5Bars(0);m.invuln=true;m.busy=999;const p=m.pos.clone();p.y=groundAt(p.x,p.z);try{m.m.actor.setBase('Crouch_Idle_Loop',.3)}catch(x){}xoSetGrey(m.xo.L,true);
  const hp=V3(clamp(p.x+8,XO.B.x0+3,XO.B.x1-3),0,p.z),face=Math.atan2(p.x-hp.x,p.z-hp.z);x4Stage(hp,face);xoCoil(false);KFW.pin=1;LYR.pin=1;const sd=V3(Math.cos(face),0,-Math.sin(face));
  if(KFW.a){KFW.a.g.position.set(hp.x+sd.x*2.4+1,0,hp.z+sd.z*2.4);KFW.a.g.rotation.y=face;try{KFW.a.setBase('Idle_Loop',.3)}catch(x){}}if(LYR.a){LYR.a.g.position.set(hp.x-sd.x*2.4+1,0,hp.z-sd.z*2.4);LYR.a.g.rotation.y=face;try{LYR.a.setBase('Idle_Loop',.3)}catch(x){}}X4.cc=p.clone();
  const iron=std({color:0x10140f,roughness:.4,metalness:.8,emissive:0x1a6a2a,emissiveIntensity:.9}),cr=new THREE.Group();const tr=new THREE.Mesh(new THREE.TorusGeometry(.3,.045,6,20),iron);tr.rotation.x=Math.PI/2;cr.add(tr);for(let k=0;k<7;k++){const c=new THREE.Mesh(new THREE.ConeGeometry(.05,.3,4),iron);const a=k/7*TAU;c.position.set(Math.cos(a)*.3,.15,Math.sin(a)*.3);cr.add(c)}cr.visible=false;scene.add(cr);XO.cr=cr;
  let fig=null,cage=null;const cp=V3(p.x,.2,p.z);
  playCutscene([{who:'@',text:XL3.mw_18,fov:38,cam:x4S(()=>P.pos,1,2.3,1.7),onStart:()=>{x4Talk('@')}},
    {dur:2.8,fov:50,cut:true,cam:k=>({pos:V3((p.x+hp.x)/2+sd.x*9,2.2+k,(p.z+hp.z)/2+sd.z*9),look:V3((p.x+hp.x)/2,1.3,(p.z+hp.z)/2)}),onStart:()=>{P.heroAnim='Spell_Simple_Shoot';sx('dcharge',.9,null,{rate:1.3});after(.7,()=>{xoBeam(headOf(P.pos,1.3),headOf(p,1.1),0xb070ff,.9,1.1);sx('dbeam',1);x5Impact(120,.22);x5Punch(18,.6);P.shake=1.6;flash(headOf(p,1.1),0xffffff,34);SP.emit(headOf(p,1.1),{n:200,c0:0xffffff,c1:0xb070ff,speed:17,life:1.1,s0:.8,s1:.05});
          SM.emit(headOf(p,1.1),{n:40,c0:0x6a7a6e,c1:0x06100a,s0:2,s1:7,life:1.8,a:.6,speed:6});scene.remove(m.m.g);m.dead=true;XO.mir=null;fig=xcFig(1);fig.g.position.copy(p);fig.set('ball');fig.cyc=.25;fig.burst(2)})},update:(dt,k)=>{camera.fov=50-Math.sin(Math.min(1,k*2)*Math.PI)*10;camera.updateProjectionMatrix()}},
    {who:'The Crown',text:XL3.cr_10,fov:34,cam:k=>({pos:V3(p.x+sd.x*3+1,1.4,p.z+sd.z*3),look:V3(p.x,1.5-k*.7,p.z)}),onStart:()=>{P.heroAnim='Idle_Loop';if(fig){fig.cyc=.18}},update:(dt,k)=>{if(fig)fig.g.scale.setScalar(Math.max(.05,1-k*.9))}},
    {dur:2.4,fov:30,cam:k=>({pos:V3(p.x+sd.x*2.2+.8,.7,p.z+sd.z*2.2),look:cp}),onStart:()=>{xcFigOff();cr.visible=true;cr.position.set(p.x,2.2,p.z);SM.emit(V3(p.x,1.5,p.z),{n:20,c0:0x6a7a6e,c1:0x06100a,s0:1,s1:4,life:1.4,a:.5,up:2})},update:(dt,k)=>{const q=Math.min(1,k*2.2);cr.position.y=Math.max(.2,2.2-q*q*2);cr.rotation.z=(1-q)*.8;if(q>=1&&!cr.userData.h){cr.userData.h=1;sx('ding',.9,null,{rate:.6});x5Impact(40,.05);ring(cp,0x7dff9a,.3,3,.4)}}},
    {who:'@',text:XL3.mw_19,fov:38,cam:x4S(()=>P.pos,-1,2.3,1.7),onStart:()=>x4Talk('@')},{who:'Kaen',text:XL3.kw_15,cam:x4S(x4K,1,2.3,1.75),onStart:()=>x4Talk('Kaen')},
    {who:'Lyra',text:XL3.lw_13,fov:40,cam:k=>({pos:V3(p.x+sd.x*4+2,1.6,p.z+sd.z*4),look:V3(p.x,.6,p.z)}),onStart:()=>{x4Talk('Lyra');sx('lampon',.9);sx('chan',.6);cage=new THREE.Group();cage.position.copy(cp);const gm=new THREE.MeshBasicMaterial({color:0xffc060,transparent:true,opacity:.8,blending:THREE.AdditiveBlending,depthWrite:false});for(let k=0;k<3;k++){const t=new THREE.Mesh(new THREE.TorusGeometry(.62,.025,6,28),gm);t.rotation.set(k*1.05,k*.7,0);cage.add(t)}cage.add(glowSprite(0xffc060,4,.5));scene.add(cage);XO.cage=cage;flash(cp,0xffc060,16)},
      update:(dt,k)=>{if(cage){cage.rotation.y+=dt*2;cage.scale.setScalar(Math.min(1,k*3))}if(Math.random()<.6)SP.emit(cp.clone().add(V3(rand(-.6,.6),rand(0,.8),rand(-.6,.6))),{c0:0xffffff,c1:0xffa030,s0:.3,s1:.03,life:.7,up:.8})}},
    {who:'@',text:XL3.mw_20,fov:44,cam:k=>({pos:V3(hp.x+sd.x*1+5+k*2,2+k*1.5,hp.z+sd.z*6),look:V3(hp.x-2,1.4,hp.z)}),onStart:()=>x4Talk('@')}],
    ()=>{x4Talk('');P.heroAnim=null;X4.cc=null;KFW.pin=0;LYR.pin=0;xcFigOff();if(XO.cr){scene.remove(XO.cr);XO.cr=null}if(XO.cage){scene.remove(XO.cage);XO.cage=null}if(m.m.g.parent)scene.remove(m.m.g);m.dead=true;XO.mir=null;XO.ph=0;XO.form=0;CH2.st=23;ch2Save();writeSave();try{gainXP(4000)}catch(x){}
      x5Banner('THE HOLLOW CROWN','CAGED','#ffd890',2.6,'#1a1206');toast('The Crown is caged in Alfred\'s flame. Ten years of hunger, small enough to carry.','Chapter XVI complete',true);after(9,()=>toast('Chapter XVII is coming.','Sorcière',true))})}
/* per-frame, out in the square */
function x5OTick(dt,dq){const st=CH2.st;if(st!==21&&st!==22)return;
  if(!XO.ph){XO.rt=(XO.rt||0)-dt;if(XO.rt>0)return;if(dq<36&&P.pos.y<30){if(st===22){xoMirrorGo();x5VS('MAËLLE','MAËLLE','#c9a6ff','#7dff9a')}else xoBegin(false)}return}
  xoArena();XO.t+=dt;
  const flick=e=>{const X=e.xo;if(!X||e.invuln)return;X.t-=dt;if(X.t<=0){X.grey=!X.grey;X.t=X.grey?1:rand(7,11);xoSetGrey(X.L,X.grey);const c=eCenter(e);SM.emit(c,{n:10,c0:0x6a7a6e,c1:0x06100a,s0:1.5,s1:4.5,life:1,a:.5,speed:3});if(!X.grey){flash(c,0xffffff,6);x5Impact(30,0)}}
    if(X.grey&&Math.random()<.35)SM.emit(V3(e.pos.x+rand(-1,1),e.pos.y+rand(.3,e.def.h||2),e.pos.z+rand(-1,1)),{c0:0x4a5a4e,c1:0x06100a,s0:1,s1:3,life:1,a:.4,up:.8})};
  if(XO.ph===1){const e=XO.e;if(!e||e.dead)return;flick(e);if(XO.cmp)xoCmpTick(dt);else if(XO.form===5&&!XO.coil.length)xoCoil(true);
    if(!e.invuln&&e.hp<=e.maxhp*e.hpFloor+1){if(XO.form<4)xoMorph(XO.form+1);else if(XO.form===4)xoKaen();else xoMirror()}return}
  if(XO.ph===2){const m=XO.mir;if(!m||m.dead)return;if(XO.clash){xmClashTick(dt);return}flick(m);const r=m.hp/m.maxhp,T=XO.tn||(XO.tn={});
    if(r<.82&&!T.a){T.a=1;x5Say('???','mm_02',1)}if(r<.62&&!T.b){T.b=1;x5Say('???','mm_03',1)}if(r<.3&&!T.c){T.c=1;x5Say('???','mm_04',1)}
    if(r<.45&&!XO.cl&&m.busy<=0&&P.alive&&!P.flying){XO.cl=1;xmClash(m)}
    if(!m.invuln&&m.hp<=m.maxhp*m.hpFloor+1)xoEnd()}}
{const _or=x5OReset;x5OReset=function(){if(XO.clash){const C=XO.clash;XO.clash=null;for(const b of C.b)scene.remove(b);scene.remove(C.orb);P.heroAnim=null}if(XO.cage){scene.remove(XO.cage);XO.cage=null}XO.rt=0;XO.cl=0;XO.tn={};return _or.apply(this,arguments)}}
{const _rv=x5ORevive;x5ORevive=function(){if(XO.clash){const C=XO.clash;XO.clash=null;for(const b of C.b)scene.remove(b);scene.remove(C.orb)}XO.cl=0;XO.tn={};return _rv.apply(this,arguments)}}
