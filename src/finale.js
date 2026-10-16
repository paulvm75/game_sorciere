/* ---------- Finale: Master Bilel's sacrifice + Kaen's vengeful spirit ---------- */
const FIN={ally:null,fight:0,e:null,shot:0};
Object.assign(SPEAKER,{"Kaen's Spirit":'#d0a0ff'});
function finAllyUpd(dt){const A=FIN.ally;if(!A)return;A.update(dt)}
function finKaenUpd(e){const act=e.m.actor;return dt=>{e.t+=dt;kaenFx(e,dt);act.update(dt);finAllyUpd(dt)}}
function finFaceTo(g,to){g.rotation.y=Math.atan2(to.x-g.position.x,to.z-g.position.z)}
// called after Kaen's transformation cinematic
function finStart(e){if(MODE==='open'){after(10,()=>{if(!e.dead)witchLimitBreak(true)});return}
  FIN.e=e;e.hpFloor=.04;after(3.5,()=>{if(e.dead||!P.alive){witchLimitBreak(true);return}finIntervene(e)})}
function finIntervene(e){for(const o of enemies)if(!o.dead&&o!==e&&!o.def.boss&&o.type!=='guardian')removeEnemy(o);const A=buildBilel();if(!A){witchLimitBreak(true);return}FIN.ally=A;BQ.dead=true;FIN.sacDone=false;if(BQ.npc){scene.remove(BQ.npc.g);BQ.npc=null}
  const toK=V3(e.pos.x-P.pos.x,0,e.pos.z-P.pos.z).normalize();const side=V3(toK.z,0,-toK.x);const at=P.pos.clone().addScaledVector(toK,1.8).addScaledVector(side,2.4);at.y=groundAt(at.x,at.z);
  A.g.position.copy(at);scene.add(A.g);finFaceTo(A.g,e.pos);A.setBase('Spell_Simple_Idle_Loop');const upd=finKaenUpd(e);const act=e.m.actor;
  const bil=(d,h)=>()=>{const f=V3(Math.sin(A.g.rotation.y),0,Math.cos(A.g.rotation.y));return{pos:headOf(A.g.position,h||1.9).addScaledVector(f,d||2.6).addScaledVector(V3(f.z,0,-f.x),.8),look:headOf(A.g.position,1.8)}};
  const kae=()=>{const d=V3(P.pos.x-e.pos.x,0,P.pos.z-e.pos.z).normalize();return{pos:headOf(e.pos,2).addScaledVector(d,3).add(V3(d.z,0,-d.x)),look:headOf(e.pos,2.1)}};
  playCutscene([
    {dur:1.9,fov:44,cut:true,cam:k=>({pos:V3(at.x+Math.sin(k)*6,at.y+2.5,at.z+Math.cos(k)*6),look:headOf(at,1.4)}),onStart:()=>{flash(at,0xffd060,14);runeFlash(at,0xf2d27a,7,2.2);ring(at,0xffd060,1,9,.7);SP.emit(V3(at.x,at.y+1.4,at.z),{n:140,c0:0xffffff,c1:0xf2c040,speed:10,life:1,s0:.7,s1:.1});sfx.blink&&sfx.blink();P.shake=.5},update:upd},
    {who:'Master Bilel',text:'KAEN! Step away from her!',fov:36,cam:bil(2.4),update:upd},
    {who:'Kaen',text:'The old master crawls out of hiding. Good. Two graves are as easy as one.',fov:36,cam:kae,onStart:()=>act.fire('OverhandThrow',.6),update:upd},
    {who:'@',text:'Bilel?! Get out of here, he is too strong!',fov:38,cam:witchShot(1,3.6),update:upd},
    {who:'Master Bilel',text:'Then we hit him together. One last lesson, my student. NOW!',fov:36,cam:bil(2.2),onStart:()=>A.fire('Spell_Simple_Shoot',.6),update:upd}
  ],()=>{FIN.fight=6.5;FIN.shot=.4;toast('Master Bilel fights at your side!','Ally',true)})}
// ally fighting (gameplay)
function finTick(dt){const A=FIN.ally,e=FIN.e;if(!A)return;if(!CS.active)A.update(dt);if(!e||e.dead){return}
  if(e.hpFloor&&e.hp<e.maxhp*e.hpFloor)e.hp=Math.ceil(e.maxhp*e.hpFloor);
  if(FIN.fight>0&&!CS.active){FIN.fight-=dt;finFaceTo(A.g,e.pos);FIN.shot-=dt;
    if(FIN.shot<=0){FIN.shot=1.05;A.fire('Spell_Simple_Shoot',.5);const h=headOf(A.g.position,1.5),t=eCenter(e);lightning(h,t,0xffd060);SP.emit(t,{n:24,c0:0xffffff,c1:0xf2c040,speed:6,life:.5});flash(t,0xffd060,5);if(!e.invuln)damageEnemy(e,power()*14,'#f2d27a');sfx.blink&&sfx.blink()}
    if(FIN.fight<=0)finSacrifice(e)}}
function finSacrifice(e){const A=FIN.ally,act=e.m.actor;const upd=finKaenUpd(e);e.invuln=true;e.busy=99;e.m.lock=99;P.flying=false;P.glide=true;P.invuln=99;P.inferno=0;
  for(const p of eProjs)scene.remove(p.s);eProjs.length=0;for(const o of enemies)if(!o.dead&&o!==e)removeEnemy(o);while(floats.length){floats.shift().el.remove()}
  const k0=e.pos.clone();const toW=V3(P.pos.x-k0.x,0,P.pos.z-k0.z);toW.normalize();
  const kp=P.pos.clone().addScaledVector(toW,-6.5);kp.y=groundAt(kp.x,kp.z);e.pos.copy(kp);finFaceTo(e.m.g,P.pos);faceTo(e.pos);
  const strike=P.pos.clone().addScaledVector(toW,-2.7);strike.y=groundAt(strike.x,strike.z);
  const mid=P.pos.clone().addScaledVector(toW,-1.6);mid.y=groundAt(mid.x,mid.z);const aStart=A.g.position.clone();
  const land=P.pos.clone().addScaledVector(toW,.2).addScaledVector(V3(toW.z,0,-toW.x),1.3);land.y=groundAt(land.x,land.z);
  const side=V3(toW.z,0,-toW.x);
  const wide=(h,s,b)=>()=>{const c=V3((P.pos.x+e.pos.x)/2,P.pos.y,(P.pos.z+e.pos.z)/2);return{pos:c.clone().addScaledVector(side,s||9).addScaledVector(toW,b||0).add(V3(0,h||2.6,0)),look:c.add(V3(0,1.3,0))}};
  const kLow=()=>({pos:headOf(e.pos,.9).addScaledVector(toW,5.2).addScaledVector(side,2.2),look:headOf(e.pos,2.2)});
  const wit=()=>({pos:headOf(P.pos,.8).addScaledVector(toW,-2.1).addScaledVector(side,-.5),look:headOf(P.pos,1.02)});
  const face=()=>({pos:headOf(P.pos,1.5).addScaledVector(toW,-2.8).addScaledVector(side,-.5),look:headOf(P.pos,2.15)});
  const bilLow=()=>{const hp=A.g.position.clone().addScaledVector(toW,1.7);return{pos:headOf(hp,1.5).addScaledVector(side,2.2).addScaledVector(toW,.6),look:headOf(hp,.25)}};
  let charge=0,orbK=null,dome=null;
  const kaenCharge=dt=>{charge=Math.min(1,charge+dt/2.6);const c=headOf(e.pos,2.4);if(!orbK){orbK=glowSprite(0xc070ff,1,.9);scene.add(orbK)}orbK.position.copy(c);orbK.scale.setScalar(.5+charge*4.5+Math.sin(time*30)*.2);
    if(Math.random()<.9)SP.emit(c.clone().add(V3(rand(-4,4),rand(-2,3),rand(-4,4))),{n:2,c0:0xe0c0ff,c1:0x5010c0,s0:.5,s1:.1,life:.5,speed:-7});if(Math.random()<dt*7)lightning(V3(c.x+rand(-3,3),c.y+18,c.z+rand(-3,3)),c,0xd0a0ff);P.shake=Math.max(P.shake,.25+charge*.5)};
  playCutscene([
    {dur:1.5,fov:48,cut:true,cam:wide(3,10),onStart:()=>{act.fire('OverhandThrow',.5);const c=P.pos.clone();flash(c,0xa050ff,14);ring(c,0xc080ff,1,10,.5);SP.emit(V3(c.x,c.y+1,c.z),{n:110,c0:0xffffff,c1:0x8030ff,speed:12,life:.8});P.shake=1.3;sfx.boom&&sfx.boom();P.heroAnim='Hit_Knockback';vib([60,30,120])},update:upd},
    {who:'@',text:'Ugh... my legs... I can\'t move...',fov:34,cam:wit,onStart:()=>{P.heroAnim='Crouch_Idle_Loop'},update:upd},
    {dur:2.8,fov:30,cam:kLow,title:['Kaen Kuroshiba','Killing blow'],onStart:()=>{act.setBase('Spell_Simple_Idle_Loop',.3);e.lb=20;sfx.roar();P.shake=.6},update:dt=>{upd(dt);kaenCharge(dt)}},
    {who:'Kaen',text:'Kneel, witch. This is where your story ends.',fov:34,cam:()=>({pos:headOf(e.pos,2.2).addScaledVector(toW,2.4).addScaledVector(side,.8),look:headOf(e.pos,2)}),update:dt=>{upd(dt);kaenCharge(dt)}},
    // the lunge: Kaen blurs forward, Bilel sprints in from the side
    {who:'Master Bilel',text:'NOT HER!',fov:52,cut:true,cam:wide(2,8,-1),onStart:()=>{A.setBase('Sprint_Loop',.1,1.5);act.setBase('Sprint_Loop',.1,1.8);sfx.blink&&sfx.blink();A._k=0;e._k=0},
      update:dt=>{upd(dt);A._k=Math.min(1,A._k+dt/1.05);e._k=Math.min(1,e._k+dt/1.2);A.g.position.lerpVectors(aStart,mid,A._k);finFaceTo(A.g,kp);e.pos.lerpVectors(kp,strike,e._k*e._k);finFaceTo(e.m.g,P.pos);
        if(orbK)orbK.position.copy(headOf(e.pos,2.2));SP.emit(headOf(A.g.position,1),{n:2,c0:0xffe0a0,c1:0x805010,s0:.4,s1:.05,life:.4});SP.emit(eCenter(e),{n:3,c0:0xe0c0ff,c1:0x5010c0,s0:.7,s1:.1,life:.35})}},
    // slow motion: the golden barrier, the strike, the shatter
    {dur:2.4,fov:42,cut:true,cam:k=>{const c=mid.clone().addScaledVector(toW,-.6);return{pos:headOf(c,1.7+k*.4).addScaledVector(side,6.4-k*1.2).addScaledVector(toW,.8),look:headOf(c,1.2)}},
      onStart:()=>{CS.speed=.4;A.g.position.copy(mid);e.pos.copy(strike);finFaceTo(A.g,e.pos);A.setBase('Spell_Simple_Idle_Loop',.05);act.setBase('Idle_Loop',.1);act.once('Melee_Hook',.9);
        dome=new THREE.Mesh(new THREE.SphereGeometry(1.5,32,20,0,TAU,0,Math.PI/2),new THREE.MeshBasicMaterial({color:0xffc040,transparent:true,opacity:.55,blending:THREE.AdditiveBlending,depthWrite:false,side:THREE.DoubleSide}));dome.position.copy(mid).addScaledVector(toW,-.4);dome.scale.set(1.3,1.5,.7);dome.lookAt(dome.position.clone().addScaledVector(toW,-1));dome.rotateX(Math.PI/2);scene.add(dome);flash(mid,0xffd060,10);ring(mid,0xffd060,1,4,.4);
        after(.55,()=>{const c=headOf(mid,1.3);flash(c,0xffffff,16);flash(c,0xa050ff,12);crescentFx(strike.clone(),toW,2.2,0xd090ff);if(dome){scene.remove(dome);dome=null}
          for(let i=0;i<26;i++){const s=new THREE.Mesh(G.shard,new THREE.MeshBasicMaterial({color:i%3?0xffd060:0xfff4c0,transparent:true,blending:THREE.AdditiveBlending,depthWrite:false}));const sc=rand(.12,.3);s.scale.set(sc,sc*2,sc);s.position.copy(c).add(V3(rand(-.8,.8),rand(-.6,.8),rand(-.8,.8)));const v=V3(rand(-4,4),rand(1,5),rand(-4,4)).addScaledVector(toW,3);scene.add(s);
            addFx(s,1.6,(f,k)=>{s.position.addScaledVector(v,1/60);v.y-=.12;s.rotation.x+=.2;s.rotation.y+=.15;s.material.opacity=1-k},()=>{scene.remove(s)})}
          SP.emit(c,{n:180,c0:0xffffff,c1:0xf2c040,speed:13,life:1,s0:.7,s1:.1});SP.emit(c,{n:80,c0:0xe0c0ff,c1:0x6010d0,speed:9,life:.8});ring(mid,0xffd060,1,9,.5);P.shake=1.9;sfx.boom&&sfx.boom();sfx.shatter&&sfx.shatter();sfx.roar();A.once('Hit_Knockback',.9);vib([140,60,220]);if(orbK){scene.remove(orbK);orbK=null}})},
      update:dt=>{upd(dt);if(dome){dome.material.opacity=.4+Math.sin(time*40)*.15}}},
    // Bilel is thrown back beside her
    {dur:1.5,fov:44,cam:wide(1.8,5.5,.5),onStart:()=>{CS.speed=1;A._k=0;act.setBase('Idle_Loop',.3)},update:dt=>{upd(dt);A._k=Math.min(1,A._k+dt/.7);const k=A._k;A.g.position.lerpVectors(mid,land,k);A.g.position.y=land.y+Math.sin(k*Math.PI)*1.2;if(k<1)SP.emit(headOf(A.g.position,1),{n:3,c0:0xfff0c0,c1:0xf2a030,s0:.4,s1:.05,life:.6});if(k>=1&&!A._landed){A._landed=1;A.once('Death01',.9);SM.emit(V3(land.x,land.y+.2,land.z),{n:12,c0:0x6a6080,c1:0x2a2438,s0:1,s1:3,speed:3,flat:true,life:.8,a:.4});P.shake=.8}}},
    {who:'@',text:'Bilel... no!!!',fov:32,cut:true,cam:face,onStart:()=>{P.heroAnim='Idle_No_Loop';FIN.grief=true;if(!CS.skipping)clipPlay('vo_bilel_no',1.35,3.2);vib([100,50,100])},update:upd},
    {who:'Master Bilel',text:'Heh... always so stubborn... You were stronger than me... all along.',fov:32,cam:bilLow,onStart:()=>{P.heroAnim='Crouch_Idle_Loop'},update:upd},
    {who:'Master Bilel',text:'Finish it... for Paris... for me...',fov:30,cam:bilLow,onStart:()=>{A._fade=1;A.g.traverse(o=>{if(o.isMesh&&o.material&&!o.material.transparent){o.material=o.material.clone();o.material.transparent=true}})},update:dt=>{upd(dt);A._fade=Math.max(.35,A._fade-dt*.15);finAllyFade(A)}},
    {dur:2.6,fov:44,cam:k=>({pos:headOf(land,1+k*4).addScaledVector(side,4-k).addScaledVector(toW,-1),look:headOf(land,.6+k*3)}),update:dt=>{upd(dt);A._fade=Math.max(0,A._fade-dt*.4);finAllyFade(A);for(let i=0;i<4;i++)SP.emit(V3(land.x+rand(-.8,.8),land.y+rand(0,.6),land.z+rand(-.8,.8)),{c0:0xfff0c0,c1:0xf2a030,s0:.5,s1:.05,life:1.6,up:5,speed:.4})}},
    {who:'Kaen',text:'Sentiment. That is exactly why you lose.',fov:34,cam:()=>({pos:headOf(e.pos,2).addScaledVector(toW,3).addScaledVector(side,-1),look:headOf(e.pos,2)}),onStart:()=>{scene.remove(A.g);FIN.ally=null;act.setBase('Idle_Loop',.3)},update:upd}
  ],()=>{CS.speed=1;if(orbK)scene.remove(orbK);if(dome)scene.remove(dome);scene.remove(A.g);FIN.ally=null;BQ.dead=true;FIN.sacDone=true;e.invuln=false;e.busy=0;e.m.lock=0;e.lb=20;e.dmgMul=1.35;e.hpFloor=0;P.invuln=2;writeSave();witchAwaken(e)})}
/* ---------- her awakening: grief, then ki and magic exploding ---------- */
function goldPillar(pos){const g=new THREE.Group();g.position.copy(pos);scene.add(g);const mats=[];
  for(const [r0,r1,col,a] of [[1.3,2.6,0xffb020,.8],[.55,.9,0xfff6d0,1]]){const m=new THREE.ShaderMaterial({uniforms:{uT:{value:0},uC:{value:new THREE.Color(col)},uA:{value:a}},transparent:true,depthWrite:false,blending:THREE.AdditiveBlending,side:THREE.DoubleSide,
      vertexShader:'varying vec2 vU;void main(){vU=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}',
      fragmentShader:'uniform float uT,uA;uniform vec3 uC;varying vec2 vU;float h(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}float n(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(h(i),h(i+vec2(1,0)),f.x),mix(h(i+vec2(0,1)),h(i+vec2(1,1)),f.x),f.y);}void main(){float f=n(vec2(vU.x*12.,vU.y*18.-uT*9.))*.6+n(vec2(vU.x*30.,vU.y*40.-uT*14.))*.4;float a=(.45+f*.8)*smoothstep(1.,.2,vU.y)*uA;gl_FragColor=vec4(uC*(1.+f),a);}'});
    const c=new THREE.Mesh(new THREE.CylinderGeometry(r0,r1,70,32,1,true),m);c.position.y=35;g.add(c);mats.push(m)}
  const base=glowSprite(0xffd060,14,.8);base.position.y=1.5;g.add(base);
  addFx(g,3.4,(f,k)=>{mats.forEach(m=>{m.uniforms.uT.value=f.t;m.uniforms.uA.value*=k>.45?.93:1});g.scale.set(1+Math.sin(f.t*20)*.06+(k<.1?k*4:.4)*.6,1,1+Math.cos(f.t*18)*.06+(k<.1?k*4:.4)*.6);base.material.opacity=.8*(1-k)},()=>{scene.remove(g)})}
function lbStateOn(){if(P.lbT>=19)return;P.lbT=20;P.lbRamp=Math.max(P.lbRamp||0,.2);P.hp=Math.max(P.hp,maxHP()*.25);P.mp=maxMP();P.invuln=Math.max(P.invuln,1.5)}
function witchAwaken(e){FIN.grief=true;const c=P.pos.clone();const col=0xffc040;const side=V3(Math.cos(P.face),0,-Math.sin(P.face));const fw=V3(Math.sin(P.face),0,Math.cos(P.face));
  let rocks=[];const act=e.m.actor;const kUpd=dt=>{e.t+=dt;kaenFx(e,dt);act.update(dt)};
  const ramp=dt=>{P.lbRamp=Math.min(1,(P.lbRamp||0)+dt*.5);lbSet(P.lbRamp);lbTick(0);if(Math.random()<.45)SP.emit(V3(P.pos.x+rand(-1.4,1.4),P.pos.y+rand(0,2.8),P.pos.z+rand(-1.4,1.4)),{c0:Math.random()<.25?0x201000:0xffe8a0,c1:0x402000,s0:.55,s1:.05,life:.9,up:4,speed:.6})};
  const boom=()=>{FIN.grief=false;lbStateOn();FIN.boost=1;P.heroAnim='Spell_Simple_Enter';after(.6,()=>{if(CS.active)P.heroAnim='Spell_Simple_Idle_Loop'});goldPillar(c);flash(c,0xffffff,20);flash(c,col,18);P.shake=2.2;
    for(let k=0;k<5;k++)after(k*.14,()=>{ring(c,k%2?0xfff0b0:col,1,10+k*6,.9);});runeFlash(c,col,18,3);SP.emit(V3(c.x,c.y+1.2,c.z),{n:260,c0:0xffffff,c1:col,speed:22,life:1.3,s0:.9,s1:.1,grav:1});SP.emit(V3(c.x,c.y+.3,c.z),{n:120,c0:0xffe8a0,c1:0x603000,speed:14,life:1,flat:true});
    SM.emit(V3(c.x,c.y+.4,c.z),{n:30,c0:0x807050,c1:0x201810,s0:2,s1:7,speed:9,life:1.6,a:.5,flat:true});for(let k=0;k<10;k++)after(k*.09,()=>{const a=Math.random()*TAU;lightning(V3(c.x,c.y+2,c.z),V3(c.x+Math.sin(a)*rand(4,9),c.y+rand(0,6),c.z+Math.cos(a)*rand(4,9)),k%2?0xffd060:0xfff8e0)});
    sfx.level();sfx.boom&&sfx.boom();vib([120,40,120,40,260]);rocks.forEach(r=>r.userData.fly=1);
    for(const o of enemies)if(!o.dead&&o!==e){const d=Math.hypot(o.pos.x-c.x,o.pos.z-c.z);if(d<14)damageEnemy(o,power()*80,'#ffd070')}};
  playCutscene([
    {dur:2.8,fov:40,cut:true,cam:k=>({pos:headOf(c,.9+k*.3).addScaledVector(fw,3.6-k*1.2).addScaledVector(side,1.2),look:headOf(c,1.1)}),
      onStart:()=>{P.heroAnim='Crouch_Idle_Loop';clipPlay('sfx_ki',1.15,7);for(let i=0;i<22;i++){const r=new THREE.Mesh(G.shard,MAT.bossStone||std({color:0x6a6070}));const s=rand(.08,.28);r.scale.setScalar(s);const a=rand(0,TAU),d=rand(1.2,4.5);r.position.set(c.x+Math.sin(a)*d,c.y+.1,c.z+Math.cos(a)*d);scene.add(r);rocks.push(r);const vy=rand(.4,1.1);
          addFx(r,7,(f,k)=>{if(r.userData.fly){r.position.x+=(r.position.x-c.x)*.06;r.position.z+=(r.position.z-c.z)*.06;r.position.y+=.08}else r.position.y+=vy/60*(1+Math.sin(f.t*9)*.3);r.rotation.x+=.03;r.rotation.y+=.05;if(k>.85)r.scale.multiplyScalar(.93)},()=>scene.remove(r))}},
      update:(dt,k)=>{P.shake=Math.max(P.shake,.15+k*.7);for(let i=0;i<3;i++){const a=Math.random()*TAU,r=rand(1.5,4);SP.emit(V3(c.x+Math.sin(a)*r,c.y+rand(0,2.5),c.z+Math.cos(a)*r),{c0:0xfff0b0,c1:0xffa020,s0:.35,s1:.05,life:.45,speed:-r*2.2})}
        if(Math.random()<dt*(2+k*10)){const a=Math.random()*TAU;lightning(V3(c.x,c.y+1.2,c.z),V3(c.x+Math.sin(a)*rand(1.2,2.5),c.y+rand(.2,2.4),c.z+Math.cos(a)*rand(1.2,2.5)),0xffd060)}P.lbRamp=Math.min(.35,(P.lbRamp||0)+dt*.12);lbSet(P.lbRamp);kUpd(dt)}},
    {dur:3.2,fov:58,cut:true,title:[HERO.name,'Limit Breaker'],cam:k=>{const a=P.face+.6+k*1.1;const r=7+k*9;return{pos:V3(c.x+Math.sin(a)*r,c.y+2+k*7,c.z+Math.cos(a)*r),look:headOf(c,1.6+k*3)}},onStart:boom,update:dt=>{ramp(dt);kUpd(dt);P.shake=Math.max(P.shake,.6);if(Math.random()<.9)SP.emit(V3(c.x+rand(-1.2,1.2),c.y+rand(0,3),c.z+rand(-1.2,1.2)),{c0:0xffffff,c1:col,s0:.6,s1:.05,life:1,up:7,speed:.5})}},
    {dur:2.4,fov:40,cam:k=>{const a=P.face+k*2.6;return{pos:V3(c.x+Math.sin(a)*3.6,c.y+1.2+k*.8,c.z+Math.cos(a)*3.6),look:headOf(c,1.5)}},update:dt=>{ramp(dt);kUpd(dt)}},
    {who:'@',text:'You... will... PAY FOR HIM!!!',fov:32,cam:()=>({pos:headOf(c,1.6).addScaledVector(fw,3.3).addScaledVector(side,.7),look:headOf(c,2.05)}),onStart:()=>{P.shake=.8;flash(c,col,10)},update:dt=>{ramp(dt);kUpd(dt)}},
    {who:'Kaen',text:'...What... is this power?',fov:36,cam:()=>{const d=V3(c.x-e.pos.x,0,c.z-e.pos.z).normalize();return{pos:headOf(e.pos,2.4).addScaledVector(d,4.8).addScaledVector(V3(d.z,0,-d.x),1.6),look:headOf(e.pos,2)}},onStart:()=>{act.once('Hit_Knockback',1.2)},update:dt=>{ramp(dt);kUpd(dt)}}
  ],()=>{FIN.grief=false;lbStateOn();P.lbRamp=Math.max(P.lbRamp,.8);P.heroAnim=null;act.setBase('Idle_Loop',.3);toast('Damage taken -50% · speed +50% · attacks +35% · flight +30%. Avenge him.','Limit Breaker',true)})}
function finAllyFade(A){const f=A._fade;A.g.traverse(o=>{if(o.isMesh&&o.material){o.material.opacity=f;o.material.depthWrite=f>.6}})}
/* ---------- Kaen's vengeful spirit ---------- */
function buildKaenSpirit(){const m=buildIllusion();if(!m||!m.K)return m;const K=m.K;K.setTorn();
  m.g.traverse(o=>{if(o.isMesh&&o.material&&o.material.isMeshStandardMaterial){const mt=o.material.clone();mt.transparent=true;mt.opacity=.72;mt.depthWrite=true;mt.emissive=new THREE.Color(0x6a20d0);mt.emissiveIntensity=.8;mt.color.lerp(new THREE.Color(0xb090ff),.55);o.material=mt;o.castShadow=false}});
  if(K.demon)K.demon.scale.multiplyScalar(.6);const core=glowSprite(0xb070ff,3,.25);core.position.y=1.3;m.body.add(core);const trail=[];
  const base=m.anim;m.anim=(e,dt,mv)=>{e.lb=Math.max(e.lb||0,5);m.body.position.y=.9+Math.sin(e.t*2.2)*.25;base(e,dt,mv*.3);core.material.opacity=.3+Math.sin(e.t*7)*.08;
    if(Math.random()<.35)SP.emit(V3(e.pos.x+rand(-.4,.4),e.pos.y+.9+rand(0,.4),e.pos.z+rand(-.4,.4)),{c0:0xc090ff,c1:0x200840,s0:.6,s1:.05,life:.9,up:-.6,speed:.4});
    if(Math.random()<.1)SM.emit(V3(e.pos.x,e.pos.y+.6,e.pos.z),{c0:0x4a2080,c1:0x0a0214,s0:.8,s1:2.2,life:1.1,a:.35,up:.3})};
  return m}
ETYPES.kaenSpirit={name:"Kaen's Vengeful Spirit, Illusion Unbound",boss:true,lvl:53,hp:3800,speed:2.5,dmg:26,range:0,cd:9,xp:3000,r:.9,h:2.6,ghost:true,final:true,build:buildKaenSpirit};
BOSSAI.kaenSpirit=function(e,dt,d){const a=e.ai,act=e.m.actor;const rage=e.hp<e.maxhp*.5;a.t1=(a.t1===undefined?2:a.t1)-dt;a.t2=(a.t2===undefined?4:a.t2)-dt;a.t3=(a.t3===undefined?6.5:a.t3)-dt;a.orb=(a.orb===undefined?Math.atan2(e.pos.x-P.pos.x,e.pos.z-P.pos.z):a.orb)+dt*(rage?.8:.5);
  if(rage&&!a.r){a.r=1;cineLine("Kaen's Spirit",'You cannot kill a memory, witch!');flash(eCenter(e),0xb060ff,12);P.shake=.8}
  e.m.g.rotation.y=Math.atan2(P.pos.x-e.pos.x,P.pos.z-e.pos.z);
  if(a.dash){const D=a.dash;D.t+=dt;const k=Math.min(1,D.t/.42);e.pos.x=lerp(D.a.x,D.b.x,k);e.pos.z=lerp(D.a.z,D.b.z,k);e.pos.y=groundAt(e.pos.x,e.pos.z);
    SP.emit(eCenter(e),{n:5,c0:0xffffff,c1:0x8030ff,s0:.7,s1:.1,life:.4,speed:1});if(!D.hit&&Math.hypot(P.pos.x-e.pos.x,P.pos.z-e.pos.z)<1.9&&Math.abs(P.pos.y-e.pos.y)<3){D.hit=1;damagePlayer(e.dmg*1.4);sfx.blink&&sfx.blink()}
    if(k>=1){a.dash=null;a.orb=Math.atan2(e.pos.x-P.pos.x,e.pos.z-P.pos.z)}return}
  if(a.wind>0){a.wind-=dt;if(a.wind<=0){const b=P.pos.clone().add(V3(P.pos.x-e.pos.x,0,P.pos.z-e.pos.z).normalize().multiplyScalar(6));a.dash={t:0,a:e.pos.clone(),b};act&&act.fire('Melee_Hook',.4)}return}
  const R=rage?6:8.5;const tx=P.pos.x+Math.sin(a.orb)*R,tz=P.pos.z+Math.cos(a.orb)*R;const f=Math.min(1,dt*1.6);e.pos.x+=(tx-e.pos.x)*f;e.pos.z+=(tz-e.pos.z)*f;e.pos.y=groundAt(e.pos.x,e.pos.z);
  const dir=V3(P.pos.x-e.pos.x,0,P.pos.z-e.pos.z).normalize();
  if(a.t1<=0){a.t1=rage?1.7:2.5;act&&act.fire('Melee_Hook',.45);const o=e.pos.clone();crescentFx(o,dir,12,0xc080ff);sfx.blink&&sfx.blink();
    after(.18,()=>{if(e.dead)return;const px=P.pos.x-o.x,pz=P.pos.z-o.z;const along=px*dir.x+pz*dir.z,lat=Math.abs(px*dir.z-pz*dir.x);if(along>0&&along<12.5&&lat<2.2&&Math.abs(P.pos.y-o.y)<3)damagePlayer(e.dmg)})}
  if(a.t2<=0){a.t2=rage?3.4:4.8;act&&act.fire('OverhandThrow',.5);const n=rage?7:5;for(let k=0;k<n;k++)after(k*.1,()=>{if(e.dead)return;const an=(k-(n-1)/2)*.16;const dd=V3(dir.x*Math.cos(an)-dir.z*Math.sin(an),0,dir.x*Math.sin(an)+dir.z*Math.cos(an));enemyOrb(eCenter(e),dd,rage?15:12,e.dmg*.55,0xb060ff,.32)})}
  if(a.t3<=0){a.t3=rage?4.5:6.5;a.wind=.6;ring(e.pos,0xd0a0ff,1,3,.6);flash(eCenter(e),0xb060ff,8);cineLine("Kaen's Spirit",rage?'Behind you!':'Too slow.')}};
function finSpiritRise(center,orb){const c=center.clone();c.y=groundAt(c.x,c.z);let sp=null;
  const low=k=>({pos:V3(c.x+Math.sin(1+k*.8)*7,c.y+1.2+k*1.5,c.z+Math.cos(1+k*.8)*7),look:V3(c.x,c.y+1.2+k*.8,c.z)});
  playCutscene([
    {who:'Kaen',text:'So the illusion... was me...',cam:orb,update:()=>SP.emit(V3(c.x+rand(-1,1),c.y+rand(.5,2),c.z+rand(-1,1)),{c0:0xe0c0ff,c1:0x4010a0,s0:.4,s1:.05,life:.8,up:1.5})},
    {who:'@',text:'It\'s over. It\'s finally over.',cam:witchShot(1,4)},
    {dur:2.6,fov:40,cam:low,onStart:()=>{P.shake=.3},update:dt=>{P.shake=Math.max(P.shake,.4);for(let i=0;i<3;i++){const a=Math.random()*TAU,r=rand(3,7);SP.emit(V3(c.x+Math.sin(a)*r,c.y+rand(0,3),c.z+Math.cos(a)*r),{c0:0xd0a0ff,c1:0x300860,s0:.5,s1:.1,life:.6,speed:-r*1.4})}if(Math.random()<.3)SM.emit(V3(c.x,c.y+.5,c.z),{c0:0x4a2080,c1:0x0a0214,s0:1,s1:4,life:1.2,a:.4,up:1});if(Math.random()<dt*4)lightning(V3(c.x+rand(-2,2),c.y+15,c.z+rand(-2,2)),V3(c.x,c.y+1,c.z),0xd0a0ff)}},
    {dur:3.2,fov:46,title:['Kaen Kuroshiba','Vengeful Spirit'],cam:k=>({pos:V3(c.x+Math.sin(-.6+k)*6,c.y+1.5+k,c.z+Math.cos(-.6+k)*6),look:V3(c.x,c.y+1.8,c.z)}),
      onStart:()=>{while(floats.length){floats.shift().el.remove()}sp=spawnEnemy('kaenSpirit',c.clone());sp.invuln=true;BM.finalFor=sp;faceBoss(sp);flash(c,0xb060ff,12);ring(c,0xc080ff,1,16,.8);runeFlash(c,0x9a40ff,16,2.5);SP.emit(V3(c.x,c.y+1.5,c.z),{n:110,c0:0xffffff,c1:0x7020e0,speed:15,life:1.2,s0:.8,s1:.1});P.shake=1.4;sfx.roar();sfx.boom&&sfx.boom();vib([80,40,160])},
      update:dt=>{if(sp){sp.t+=dt;animateEnemy(sp,dt,0)}}},
    {who:"Kaen's Spirit",text:'Over? You are still standing inside my illusion, witch. And now... so am I.',fov:34,cam:()=>{if(!sp)return orb(0);const d=V3(P.pos.x-sp.pos.x,0,P.pos.z-sp.pos.z).normalize();return{pos:headOf(sp.pos,2.4).addScaledVector(d,5.2).addScaledVector(V3(d.z,0,-d.x),1.4),look:headOf(sp.pos,2.3)}},update:dt=>{if(sp){sp.t+=dt;animateEnemy(sp,dt,0)}}},
    {who:'@',text:'Oh, come ON. Fine. Round two. This one is for Bilel.',cam:witchShot(-1,3.8),update:dt=>{if(sp){sp.t+=dt;animateEnemy(sp,dt,0)}}}
  ],()=>{if(!sp)return;sp.invuln=false;bossRef=sp;$('boss').classList.remove('hidden');toast('His spirit is weaker, but fast. Finish it for good.',"Kaen's Vengeful Spirit",true)})}
