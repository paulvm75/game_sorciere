/* ================= Chapter XIX - Second Line (New Orleans), plus Mont/Pull/NOLA polish ================= */
const XL9={"mb_01":"The abbey, from up here... it looks like it's floating on the fog.","mb_02":"Mind the spire, broom. It's older than both of us.","mi_01":"Every shutter on this street is closed. The whole town is holding its breath.","mi_02":"Crêpes, omelettes, souvenirs... and a cursed bell. Lovely place.","nb_01":"Look at those balconies! Every single one has a party on it.","nb_02":"Hot, wet air. It's like flying through soup!","ni_01":"Somebody is always playing something here. I love this city already.","ni_02":"Something smells amazing. Fried, sugary... amazing.","ni_03":"Paris has one accordion. New Orleans has a whole brass band. Fair.","mc_01":"I came here once, before the Crown. I was twelve. I thought the abbey was a castle.","mc_02":"It sort of is.","mc_03":"If the tide comes back before we find her name, we're stuck on a rock with a haunted bell.","mc_04":"Living the dream.","nc_01":"Why does this music feel like it knows me?","nc_02":"Maybe you came here once. Before.","nc_03":"Before what?","nc_04":"Morwen. Do you need anything? Water? A coat?","nc_05":"You keep looking at me like I owe you something.","nc_06":"You don't. Forget it.","nc_07":"Beignets, Lyra. We are getting beignets. After the evil.","nc_08":"Deal. Powdered sugar for everyone.","nc_09":"The river is so wide here. It doesn't end. It just becomes the sea.","nc_10":"You used to say that about the Seine.","x19_01":"Well now. Y'all fell out the sky like Mardi Gras came early.","x19_02":"Sorry about your... lawn.","x19_03":"Lawn's seen worse. But you, miss... you're standing in two places at once.","x19_04":"You can see that?","x19_05":"Fifty years playing for the dead, you learn to see who's missing. Last night a man walked through the Quarter wearing a hundred masks.","x19_06":"Everybody he passed forgot something. Their keys. Their way home. Their names.","x19_07":"The Crown sent a collector.","x19_08":"If he's taking names, he's feeding her. We have to find the people he touched.","x19_09":"Look for the ones staring at nothing. And when you find that man... make him dance.","x19_10":"I had a name this morning. It started with... it started with...","x19_11":"Hold still. I can feel the thread he left in you.","x19_12":"I signed every painting I ever made. Now I can't read my own signature.","x19_13":"There. It's pulling toward the river.","x19_14":"Remy says we played together for forty years. I believe him. I just don't know why.","x19_15":"Three threads. One knot. He's here. He's in the parade.","x19_16":"Flying masks?! Of course there are flying masks.","x19_17":"The parade! The float with the giant crown! That's him!","x19_18":"Ah. The little witch and her nameless queen. Come to collect what I collected?","x19_19":"Give them back. Every name you took.","x19_20":"Names are just masks you wear for longer, chérie. Let me show you.","x19_21":"Oh, how sad! How terribly sad! Cry with me!","x19_22":"She is watching through my eyes now.","x19_23":"Morwen, stay behind me!","x19_24":"I don't need protecting. I need you to hit him!","x19_25":"Break the masks! Every mask is somebody's name!","x19_26":"You can't... unmask... a whole crowd...","x19_27":"Josephine. My name is Josephine!","x19_28":"Now THAT is a second line!","x19_29":"One of the masks had my face. And a letter. Just one.","x19_30":"Which letter?","x19_31":"E. It's an E.","x19_32":"Then Morwen was never your real name.","x19_33":"That man came out of the cemetery. Saint Louis Number One. Nobody goes in there after dark.","x19_34":"Good thing we're witches, then.","lf_01":"I've got you. I've got you. Lyra, breathe."};
const XL9W={"mb_01":"@","mb_02":"@","mi_01":"@","mi_02":"@","nb_01":"@","nb_02":"@","ni_01":"@","ni_02":"@","ni_03":"@","mc_01":"Kaen","mc_02":"@","mc_03":"Lyra","mc_04":"@","nc_01":"Morwen","nc_02":"Lyra","nc_03":"Morwen","nc_04":"Kaen","nc_05":"Morwen","nc_06":"Kaen","nc_07":"@","nc_08":"Lyra","nc_09":"Morwen","nc_10":"Kaen","x19_01":"Remy","x19_02":"@","x19_03":"Remy","x19_04":"Morwen","x19_05":"Remy","x19_06":"Remy","x19_07":"Kaen","x19_08":"Lyra","x19_09":"Remy","x19_10":"Josephine","x19_11":"Morwen","x19_12":"Étienne","x19_13":"Morwen","x19_14":"Augustin","x19_15":"Morwen","x19_16":"@","x19_17":"Lyra","x19_18":"The Mask Thief","x19_19":"Morwen","x19_20":"The Mask Thief","x19_21":"The Mask Thief","x19_22":"The Mask Thief","x19_23":"Kaen","x19_24":"Morwen","x19_25":"@","x19_26":"The Mask Thief","x19_27":"Josephine","x19_28":"Remy","x19_29":"Morwen","x19_30":"Lyra","x19_31":"Morwen","x19_32":"Kaen","x19_33":"Remy","x19_34":"@","lf_01":"Kaen"};
for(const k in XL9)VO_MAP[XL9[k]]=k;
const VOPK8={idx:{"mb_01":[0,39959],"mb_02":[39959,27838],"mi_01":[67797,41421],"mi_02":[109218,49572],"nb_01":[158790,40168],"nb_02":[198958,40168],"ni_01":[239126,39750],"ni_02":[278876,54796],"ni_03":[333672,46855],"mc_01":[380527,54378],"mc_02":[434905,11537],"mc_03":[446442,45183],"mc_04":[491625,11537],"nc_01":[503162,22613],"nc_02":[525775,23240],"nc_03":[549015,9448],"nc_04":[558463,32435],"nc_05":[590898,23031],"nc_06":[613929,19688],"nc_07":[633617,36197],"nc_08":[669814,31599],"nc_09":[701413,44765],"nc_10":[746178,16762],"x19_01":[762940,37033],"x19_02":[799973,20315],"x19_03":[820288,57304],"x19_04":[877592,12373],"x19_05":[889965,69634],"x19_06":[959599,49990],"x19_07":[1009589,16135],"x19_08":[1025724,34107],"x19_09":[1059831,43302],"x19_10":[1103133,35988],"x19_11":[1139121,30764],"x19_12":[1169885,39750],"x19_13":[1209635,19061],"x19_14":[1228696,52915],"x19_15":[1281611,45392],"x19_16":[1327003,31390],"x19_17":[1358393,32017],"x19_18":[1390410,53542],"x19_19":[1443952,25330],"x19_20":[1469282,42884],"x19_21":[1512166,43720],"x19_22":[1555886,23449],"x19_23":[1579335,18643],"x19_24":[1597978,29301],"x19_25":[1627279,31390],"x19_26":[1658669,31599],"x19_27":[1690268,25121],"x19_28":[1715389,35152],"x19_29":[1750541,38705],"x19_30":[1789246,8821],"x19_31":[1798067,20733],"x19_32":[1818800,20315],"x19_33":[1839115,53960],"x19_34":[1893075,16971],"lf_01":[1910046,25330]},p:null};
{const _vr=voRaw;voRaw=function(k){const ix=VOPK8.idx[k];if(!ix||VO.raw[k])return _vr(k);if(!VOPK8.p)VOPK8.p=fetch('assets/vo29.mp3').then(r=>r.ok?r.arrayBuffer():null).catch(()=>null);
  VO.raw[k]=VOPK8.p.then(b=>b&&b.byteLength>=ix[0]+ix[1]?b.slice(ix[0],ix[0]+ix[1]):fetch('assets/'+k+'.mp3').then(r=>r.ok?r.arrayBuffer():null).catch(()=>null));return VO.raw[k]}}
{const _cl=clipLoad;clipLoad=function(k){if(VOPK8.idx[k]&&!CLIP.req[k])return voLoad(k);return _cl.apply(this,arguments)}}
const x9Say=(k,p)=>epSay(XL9W[k],XL9[k],p);
const x9L=(k,o)=>Object.assign({who:XL9W[k],text:XL9[k],fov:36},o||{});

/* ---------- where are we? Small talk and barks belong to the place ---------- */
function placeNow(){const z=CH2.zone;if(z==='mont')return 'mont';if(z==='nola')return 'nola';if(z==='pull')return 'sea';if(z==='north'){const pz=P.pos.z;return pz<CLIFF_Z?'england':pz<CAL_SHORE?'sea':'calais'}return 'paris'}
{const b=BCONV.find(c=>c.id==='rain');if(b){const c0=b.c;b.c=s=>c0(s)&&placeNow()==='england'}}
{const b=BCONV.find(c=>c.id==='croissant');if(b){const c0=b.c;b.c=s=>c0(s)&&placeNow()==='paris'}}
Object.assign(BK['@'],{b_mont:[['mb_01',XL9.mb_01],['mb_02',XL9.mb_02]],i_mont:[['mi_01',XL9.mi_01],['mi_02',XL9.mi_02]],b_nola:[['nb_01',XL9.nb_01],['nb_02',XL9.nb_02]],i_nola:[['ni_01',XL9.ni_01],['ni_02',XL9.ni_02],['ni_03',XL9.ni_03]]});
{const _bp=bkPick;bkPick=function(who,cat){if(who==='@'&&MODE!=='open'&&(cat==='broom'||cat==='idle')){const pl=placeNow();if(pl==='mont'||pl==='nola')return _bp(who,(cat==='broom'?'b_':'i_')+pl)}return _bp(who,cat)}}
/* the idle line comes sooner in a new place */
{const _mt=muTick;muTick=function(dt){_mt(dt);if(!started||MODE==='open')return;const pl=placeNow();if(pl!==BKS.place){BKS.place=pl;if(pl==='mont'||pl==='nola')BKS.idleNext=Math.min(BKS.idleNext,28)}}}
/* location conversations */
const LCONV=[{id:'m_castle',z:'mont',c:()=>CH2.st>=31&&CH2.st<=32&&MT.area==='out',l:['mc_01','mc_02']},{id:'m_tide',z:'mont',c:()=>CH2.st===31&&MT.area==='out',l:['mc_03','mc_04']},
  {id:'n_music',z:'nola',mw:1,l:['nc_01','nc_02','nc_03']},{id:'n_beignet',z:'nola',l:['nc_07','nc_08']},{id:'n_coat',z:'nola',mw:1,l:['nc_04','nc_05','nc_06']},{id:'n_river',z:'nola',mw:1,l:['nc_09','nc_10']}];
const LBAN={said:{},t:22};
{const _mt=muTick;muTick=function(dt){_mt(dt);if(MODE==='open'||!started)return;const pl=placeNow();if(pl!=='mont'&&pl!=='nola'){LBAN.t=Math.max(LBAN.t,20);return}
  if(BAN.busy||!banterOk()){LBAN.t=Math.max(LBAN.t,6);return}LBAN.t-=dt;if(LBAN.t>0)return;
  const o=LCONV.find(c=>!LBAN.said[c.id]&&c.z===pl&&(!c.c||c.c())&&(!c.mw||(MW.a&&MW.a.g.visible)));if(!o){LBAN.t=40;return}LBAN.said[o.id]=1;LBAN.t=rand(50,75);BAN.busy=1;BAN.t=Math.max(BAN.t,30);
  for(const k of o.l){SAYQ.q.push([XL9W[k],XL9[k]]);try{voLoad(k)}catch(x){}}}}

/* ---------- the hero's evolved floor ring: never under her in the air, in the Pull or in cutscenes ---------- */
function x9HeroRings(hide){if(!W||!W.g)return;for(const c of W.g.children){if(c===W.aura||!c.isGroup)continue;for(const o of c.children)if(o.isMesh&&o.material&&o.material.map===runeTex)o.visible=!hide}}
{const _mt=muTick;muTick=function(dt){_mt(dt);if(!started||MODE==='open')return;const air=P.flying||P.pos.y>groundAt(P.pos.x,P.pos.z)+.5;x9HeroRings(PL.on||CS.active||air);heroShadow.visible=!PL.on}}

/* ================= THE PULL: a current you can see, the Crown you chase, Lyra's shield around you ================= */
function x9PullFx(){if(PL.x9)return PL.x9;const F={};
  const tx=sbCanvas(256,512,(x,w,h)=>{x.fillStyle='#000';x.fillRect(0,0,w,h);for(let i=0;i<170;i++){const X=Math.random()*w,Y=Math.random()*h,L=40+Math.random()*190;const c=Math.random()<.6?'110,255,215':'255,160,205';const g=x.createLinearGradient(X,Y,X,Y+L);g.addColorStop(0,`rgba(${c},0)`);g.addColorStop(.5,`rgba(${c},${.2+Math.random()*.55})`);g.addColorStop(1,`rgba(${c},0)`);x.fillStyle=g;x.fillRect(X,Y,1.2+Math.random()*2.8,L)}});
  tx.repeat.set(4,3);const tm=new THREE.MeshBasicMaterial({map:tx,transparent:true,opacity:0,blending:THREE.AdditiveBlending,depthWrite:false,side:THREE.BackSide,fog:false});
  const tun=new THREE.Mesh(new THREE.CylinderGeometry(24,30,760,48,1,true),tm);tun.rotation.x=Math.PI/2;tun.userData.mtK=1;scene.add(tun);F.tun=tun;F.tx=tx;
  const tun2=new THREE.Mesh(new THREE.CylinderGeometry(15,18,760,36,1,true),tm.clone());tun2.material.map=tx.clone();tun2.material.map.needsUpdate=true;tun2.material.map.repeat.set(3,5);tun2.rotation.x=Math.PI/2;tun2.userData.mtK=1;scene.add(tun2);F.tun2=tun2;
  /* the Crown, fleeing ahead of you: a green comet with a smoke tail */
  const cm=new THREE.Group();cm.userData.mtK=1;cm.add(gsAt(0x40ff90,46,.85,0,0,0));cm.add(gsAt(0xeaffef,12,1,0,0,0));const crown=new THREE.Group();const gm=new THREE.MeshBasicMaterial({color:0x9affc0,fog:false});
  const band=new THREE.Mesh(new THREE.TorusGeometry(2.4,.35,8,28),gm);band.rotation.x=Math.PI/2;crown.add(band);for(let i=0;i<7;i++){const a=i/7*Math.PI*2,sp=new THREE.Mesh(new THREE.ConeGeometry(.42,1.9,6),gm);sp.position.set(Math.sin(a)*2.4,1,Math.cos(a)*2.4);crown.add(sp)}cm.add(crown);F.crown=crown;
  for(let i=1;i<=14;i++){const s=gsAt(i%2?0x2aff80:0x0a6a40,30-i*1.4,.5-i*.03,0,i*.6,i*9);cm.add(s)}scene.add(cm);F.cm=cm;
  /* Morwen's hook: a thread from her chest to the Crown */
  const tm2=new THREE.MeshBasicMaterial({color:0x8affd8,transparent:true,opacity:.75,blending:THREE.AdditiveBlending,depthWrite:false,fog:false});const teth=new THREE.Mesh(new THREE.CylinderGeometry(.05,.05,1,6,1,true),tm2);teth.userData.mtK=1;scene.add(teth);F.teth=teth;
  F.beads=[];for(let i=0;i<10;i++){const b=glowSprite(0xc8fff0,1.2,.9);b.userData.mtK=1;scene.add(b);F.beads.push(b)}
  /* Lyra holds a shield around all four of you; the lights you grab feed it */
  const sh=new THREE.Mesh(new THREE.SphereGeometry(6.6,36,22),new THREE.MeshBasicMaterial({color:0xff9ac0,transparent:true,opacity:.06,blending:THREE.AdditiveBlending,depthWrite:false,side:THREE.DoubleSide}));sh.userData.mtK=1;scene.add(sh);F.sh=sh;
  const shr=new THREE.Mesh(new THREE.TorusGeometry(6.6,.06,6,64),new THREE.MeshBasicMaterial({color:0xffc0d8,transparent:true,opacity:.3,blending:THREE.AdditiveBlending,depthWrite:false}));shr.userData.mtK=1;scene.add(shr);F.shr=shr;
  F.all=[tun,tun2,cm,teth,sh,shr,...F.beads];F.flash=0;PL.x9=F;return F}
function x9PullVis(on){const F=PL.x9;if(!F)return;for(const o of F.all)o.visible=on}
{const _ps=plStart;plStart=function(){const r=_ps.apply(this,arguments);x9PullFx();x9PullVis(true);PL.x9.tun.material.opacity=0;PL.x9.tun2.material.opacity=0;
  try{const u=plUI();const s=u.ly.querySelector('small');if(s)s.textContent="LYRA'S SHIELD"}catch(x){}
  after(4.2,()=>{if(PL.on)plKin('FOLLOW THE CROWN<small>Morwen\'s door is dragging you after it, west across the ocean</small>',3.4)});return r}}
{const _st=plStop;plStop=function(){const r=_st.apply(this,arguments);x9PullVis(false);heroShadow.visible=true;return r}}
{const _h=plHurt;plHurt=function(f,txt){const was=PL.hurtT>0;const r=_h.apply(this,arguments);if(!was&&PL.x9)PL.x9.flash=1;return r}}
const _x9v=V3(),_x9w=V3();
{const _pt=plTick;plTick=function(dt){_pt(dt);const F=PL.x9;if(!F||!PL.on)return;const t=PL.t,cx=PL.X+PL.ox*.45,cy=PL.oy*.6+6;
  F.tun.position.set(cx,cy+4,-300);F.tun2.position.set(cx,cy+2,-300);const tk=Math.min(1,t/2.5)*(PL.end?Math.max(0,1-PL.end*2):1);F.tun.material.opacity=.38*tk;F.tun2.material.opacity=.24*tk;
  const sp=PL.v*(1+Math.min(1,t/40)*.6)*(PL.end?.1:1)*dt*PL.ts;F.tx.offset.y-=sp/260;F.tx.offset.x+=dt*.035;F.tun2.material.map.offset.y-=sp/150;F.tun2.material.map.offset.x-=dt*.06;
  /* the comet: far ahead, a little above, swaying */
  F.cm.position.set(PL.X+Math.sin(t*.4)*30,46+Math.sin(t*.7)*8,-560);F.crown.rotation.y+=dt*1.4;F.crown.rotation.z=Math.sin(t*1.3)*.2;F.cm.visible=!PL.end;
  /* the thread */
  if(MW.a&&MW.a.g.visible){const A=_x9v.copy(MW.a.g.position);A.y+=1.25;const B=_x9w.copy(F.cm.position);const d=B.clone().sub(A),L=d.length();F.teth.position.copy(A).addScaledVector(d,.5);F.teth.quaternion.setFromUnitVectors(V3(0,1,0),d.normalize());F.teth.scale.set(1+Math.sin(t*20)*.3,L,1+Math.sin(t*20)*.3);F.teth.material.opacity=.45+Math.sin(t*9)*.2;F.teth.visible=!PL.end;
    F.beads.forEach((b,i)=>{const k=((t*.35+i/F.beads.length)%1);b.position.copy(A).lerp(B,k*k);b.material.opacity=(1-k)*.9;b.visible=!PL.end})}
  /* the shield */
  const sc=V3(P.pos.x+1,P.pos.y+.3,1.4);F.sh.position.copy(sc);F.shr.position.copy(sc);F.shr.rotation.set(Math.PI/2+Math.sin(t*1.7)*.4,t*.8,0);F.flash=Math.max(0,F.flash-dt*2.2);
  const m=PL.meter/100;F.sh.material.opacity=.025+m*.06+F.flash*.35+(PL.meter<28?Math.abs(Math.sin(t*9))*.05:0);F.sh.material.color.setHex(F.flash>.1?0xffffff:PL.meter<28?0xff4060:0xff9ac0);F.shr.material.opacity=.12+m*.28;F.sh.scale.setScalar(1+Math.sin(t*3)*.02)}}

/* ================= Lyra hears the lullaby and faints: staged properly ================= */
mtRegister=function(){if(CS.active)return;MT.s.read=1;const lp=MT.lec.getWorldPosition(V3());const face=Math.atan2(lp.x-(MTE.x+2.3),lp.z-(-5.4));const c=V3(MTE.x+2.3,0,-5.4);mtStage(c,face,[-.4,2],[-.2,-1.7]);x4Face(LYR.a,lp);
  const book=MT.book,bp=book.getWorldPosition(V3());let lull=null,eyes=null,notes=null;const LP=()=>LYR.a.g.position;const ghost=mwBuild();
  const ov=k=>({pos:headOf(c,1.75).add(V3(.25,.2,.55)),look:bp.clone().add(V3(0,0,-.05))});
  const S={};
  playCutscene([{dur:2.4,fov:42,cut:true,cam:k=>({pos:headOf(c,2.1).add(V3(-2.6+k*.8,.4,2.4-k*.6)),look:headOf(lp,1.1)}),onStart:()=>{sx('book',.7,null,{rate:.75});P.heroAnim='Idle_Loop'}},
    mtLine('ms_14',{fov:30,cam:ov}),mtLine('ms_15'),
    {dur:2.2,fov:28,cut:true,cam:ov,onStart:()=>{x4Talk('');sx('book',.9,null,{rate:1.1});const T=mtTex();const pg=book.children[1];if(pg){pg.material=pg.material.clone();pg.material.map=T.torn}SP.emit(bp,{n:24,c0:0x2a1a10,c1:0x000000,speed:1.2,up:1,life:1.4,s0:.2,s1:.05});P.shake=.25}},
    mtLine('ms_16',{onStart:()=>{x4Talk('@');P.heroAnim='Idle_Talking_Loop'}}),mtLine('ms_17'),
    mtLine('ms_18',{fov:34,onStart:()=>{x4Talk('Lyra');try{LYR.a.setBase('Spell_Simple_Idle_Loop',.4)}catch(x){}LYR.a.g.position.lerp(lp,.35);x4Face(LYR.a,lp)}}),
    /* the song pours out of the burnt page; a woman's shape sings behind the lectern */
    {dur:6,fov:40,cut:true,cam:k=>{const L=LP(),f=V3(lp.x-L.x,0,lp.z-L.z).normalize(),r=V3(f.z,0,-f.x);let h;try{h=csHead(LYR.a.g)}catch(x){h=headOf(L,1.7)}return{pos:h.clone().addScaledVector(r,2.5-k*.6).addScaledVector(f,.35).add(V3(0,.12,0)),look:h.clone().addScaledVector(f,.75).add(V3(0,-.22,0))}},
      onStart:()=>{x4Talk('');{const L=LP(),f=V3(lp.x-L.x,0,lp.z-L.z).normalize(),r=V3(f.z,0,-f.x);P.pos.set(L.x-f.x*2.6-r.x*.6,0,L.z-f.z*2.6-r.z*.6);P.face=Math.atan2(f.x,f.z);if(KFW.a){KFW.a.g.position.set(L.x-f.x*2.2-r.x*2.4,0,L.z-f.z*2.2-r.z*2.4);KFW.a.g.rotation.y=Math.atan2(f.x,f.z)}}MT.lw=1;lull=sx('lullaby',.95,null,{wet:.6,duck:6});MU.vd=1;flash(headOf(bp,.3),0xfff0d0,18);x5Impact(120,0);
        if(ghost){const L=LP(),dir=V3(lp.x-L.x,0,lp.z-L.z).normalize();ghost.g.position.set(lp.x+dir.x*1.3,.15,lp.z+dir.z*1.3);ghost.g.rotation.y=Math.atan2(-dir.x,-dir.z);ghost.g.visible=true;MW.ghost=.01;try{ghost.setBase('Idle_Talking_Loop',.2)}catch(x){}}
        eyes=glowSprite(0xfff0c0,.6,0);scene.add(eyes);S.e=eyes},
      update:(dt,k)=>{renderer.domElement.style.filter=`sepia(${.65*Math.sin(Math.min(1,k*1.4)*Math.PI*.5)}) brightness(${1+.3*Math.sin(k*Math.PI)})`;if(ghost)MW.ghost=Math.min(.32,k*.9)*(k>.85?Math.max(0,(1-k)/.15):1);
        const H=headOf(LP(),1.52);if(eyes){eyes.position.copy(H);eyes.material.opacity=Math.min(.9,k*1.5)}
        if(Math.random()<.5){const p=bp.clone().add(V3(rand(-.2,.2),.1,rand(-.2,.2)));SP.emit(p,{n:2,c0:0xfff4d8,c1:0xff9ab8,speed:.3,up:2.2,life:1.1,s0:.28,s1:.04})}
        if(Math.random()<.35)SP.emit(H.clone().add(V3(rand(-.6,.6),rand(-.2,.4),rand(-.6,.6))),{n:1,c0:0xffffff,c1:0xffc0d8,speed:.4,life:.8,s0:.22,s1:.02});
        if(k>.72&&!S.stag){S.stag=1;try{LYR.a.setBase('Hit_Chest',.15)}catch(x){}sx('heart',.55)}}},
    /* she drops; Kaen gets to her first */
    {dur:2.8,fov:46,cut:true,cam:k=>{const L=LP(),f=V3(lp.x-L.x,0,lp.z-L.z).normalize(),r=V3(f.z,0,-f.x);return{pos:V3(L.x,0,L.z).addScaledVector(r,3.1-k*.5).addScaledVector(f,-.6).add(V3(0,.9+k*.15,0)),look:V3(L.x,.75-k*.35,L.z).addScaledVector(r,-.3)}},
      onStart:()=>{renderer.domElement.style.filter='saturate(.6) brightness(.9)';if(eyes)eyes.material.opacity=0;MW.ghost=0;if(ghost)ghost.g.visible=false;MT.lw=0;
        const L=LP().clone(),f=V3(lp.x-L.x,0,lp.z-L.z).normalize(),r=V3(f.z,0,-f.x);S.kc=L.clone().addScaledVector(r,-.7).addScaledVector(f,-.2);S.k0=S.kc.clone().addScaledVector(r,-3.6).addScaledVector(f,-1.6);
        if(KFW.a){KFW.a.g.position.copy(S.k0);KFW.a.g.rotation.y=Math.atan2(L.x-S.k0.x,L.z-S.k0.z);try{KFW.a.setBase('Sprint_Loop',.1)}catch(x){}}
        try{LYR.a.setBase('Death01',.18,.8)}catch(x){}LYR.down='Death01';P.heroAnim='Idle_Loop';sx('wind',.5,null,{rate:1.4})},
      update:(dt,k)=>{if(KFW.a){const q=Math.min(1,k*2.2),e=q*q*(3-2*q);KFW.a.g.position.lerpVectors(S.k0,S.kc,e);if(q>=1&&!S.kn){S.kn=1;KFW.kneel='Crouch_Idle_Loop';try{KFW.a.setBase('Crouch_Idle_Loop',.2)}catch(x){}const L=LP();KFW.a.g.rotation.y=Math.atan2(L.x-S.kc.x,L.z-S.kc.z);sx('impact',.25,null,{rate:1.4})}}}},
    mtLine('ms_19',{fov:40,cam:k=>({pos:headOf(P.pos,1.55).add(V3(1.4,.1,-1.6)),look:headOf(P.pos,1.5)}),onStart:()=>{renderer.domElement.style.filter='';x4Talk('');P.heroAnim='Idle_Talking_Loop';const L=LP();P.face=Math.atan2(L.x-P.pos.x,L.z-P.pos.z)}}),
    {who:'Kaen',text:XL9.lf_01,fov:38,keepCam:true,cam:k=>{const L=LP(),K=S.kc||L,f=V3(lp.x-L.x,0,lp.z-L.z).normalize(),r=V3(f.z,0,-f.x);const m=V3((K.x+L.x)/2,0,(K.z+L.z)/2);return{pos:m.clone().addScaledVector(r,3.3).addScaledVector(f,1.1).add(V3(0,1.75,0)),look:m.clone().add(V3(0,.45,0))}},onStart:()=>{P.heroAnim='Idle_Loop'}},
    mtLine('ms_20',{fov:36,cam:k=>{const L=LP(),K=S.kc||L,f=V3(lp.x-L.x,0,lp.z-L.z).normalize(),r=V3(f.z,0,-f.x);let h;try{h=csHead(KFW.a.g)}catch(x){h=V3(K.x,1.2,K.z)}return{pos:h.clone().addScaledVector(r,-1.5).addScaledVector(f,1.5).add(V3(0,.15,0)),look:h.clone().add(V3(0,-.25,0))}},onStart:()=>{}}),
    {dur:3.2,fov:42,cut:true,cam:k=>({pos:V3(MTE.x+.5,1+k*.4,-1.5),look:V3(MTE.x+4,.4,-7)}),onStart:()=>{sx('toll',.85,null,{rate:.85,wet:.6});P.shake=.6;flash(V3(MTE.x+6,0,-10.5),0x60ffd0,10);MT.cglow.material.opacity=.8;MT.cdoor.material.emissive.setHex(0x0a3a30);for(const f of MT.cand)f.material.color.setHex(0x80ffd8)}},
    /* she comes round, still on the floor, Kaen holding her up */
    mtLine('ms_21',{fov:34,keepCam:true,cam:k=>{const L=LP(),f=V3(lp.x-L.x,0,lp.z-L.z).normalize(),r=V3(f.z,0,-f.x);return{pos:V3(L.x,0,L.z).addScaledVector(r,2.8).addScaledVector(f,.7).add(V3(0,1.5,0)),look:V3(L.x,.55+k*.4,L.z)}},onStart:()=>{LYR.down='LayToIdle';x4Talk('');try{LYR.a.setBase('LayToIdle',.25,.55)}catch(x){}after(2.4,()=>{LYR.down=MT.area==='egl'?'Crouch_Idle_Loop':0;try{if(MT.area==='egl')LYR.a.setBase('Crouch_Idle_Loop',.4)}catch(x){}})}}),
    mtLine('ms_22',{onStart:()=>{x4Talk('@');P.face=Math.atan2(MTE.x+7-P.pos.x,-10.5-P.pos.z)}})],
    ()=>{LYR.down=0;KFW.kneel=0;if(eyes)scene.remove(eyes);MW.ghost=0;if(ghost)ghost.g.visible=false;mtEnd();renderer.domElement.style.filter='';MU.vd=0;CH2.st=32;ch2Save();writeSave();try{LYR.a.setBase('Idle_Loop',.6)}catch(x){}try{KFW.a.setBase('Idle_Loop',.4)}catch(x){}for(const f of MT.cand)f.material.color.setHex(0xffb050);
      toast('Lyra is back on her feet, barely. The crypt door is open: the glowing door on the right of the altar.','Saint-Pierre',true)})};
/* while Lyra is down and Kaen is holding her, talking does not stand them back up */
{const _xt=x4Talk;x4Talk=function(who){const ld=LYR.down,kd=KFW.kneel;let lb=null,kb=null;const r=_xt.apply(this,arguments);try{if(ld&&LYR.a)LYR.a.setBase(ld,.3);if(kd&&KFW.a)KFW.a.setBase(kd,.3)}catch(x){}return r}}
/* the ghost: Morwen's shape singing, faint and still */
{const _mw=mwTick;mwTick=function(dt){const a=MW.a;if(a&&a.g.visible&&MW.ghost!==undefined&&MW.ghost>0&&CH2.zone==='mont'){try{a.update(dt)}catch(x){}for(const m of MW.mats)m.opacity=MW.ghost;if(MW.gl)MW.gl.material.opacity=MW.ghost*.8;return}return _mw.apply(this,arguments)}}

/* ================= Morwen: a proper outfit ================= */
mwBuild=function(){if(MW.a)return MW.a;let a=null;try{a=makeCHActor('f',{skin:0xf6ece8,skinLift:[1.3,1.42,1.5],hair:'hairLong',hairCol:0xeadfb8,brow:0x7a6a48,eyeTint:0xd8fff2,
    wear:[['long',0x1d4f5c,{roughness:.36,metalness:.28}],['dress',0x1a5a66,{roughness:.34,metalness:.24,emissive:0x03181c}],['witch',0x0e1220,{roughness:.45,metalness:.18,side:THREE.DoubleSide}],['pearls',0xf4efe6,{roughness:.16,metalness:.35}],['shoes',0x0d0d12,{roughness:.35,metalness:.3}]]})}catch(x){a=null}
  if(!a)return null;
  a.g.traverse(o=>{if(o.isMesh||o.isSkinnedMesh){o.material=o.material.clone();o.material.transparent=true;MW.mats.push(o.material)}});
  /* a thin silver circlet with a sea-glass stone */
  try{const ci=new THREE.Group();const sv=new THREE.MeshStandardMaterial({color:0xdfe6ee,metalness:1,roughness:.2,transparent:true});MW.mats.push(sv);const t=new THREE.Mesh(new THREE.TorusGeometry(.105,.008,6,32),sv);t.rotation.x=Math.PI/2;ci.add(t);
    const gm=new THREE.MeshBasicMaterial({color:0x7dffd8,transparent:true});MW.mats.push(gm);const st=new THREE.Mesh(new THREE.OctahedronGeometry(.018,0),gm);st.position.set(0,.01,.105);ci.add(st);const gg=glowSprite(0x7dffd8,.18,.9);gg.position.copy(st.position);ci.add(gg);ci.position.set(0,.05,-.005);a.head.add(ci)}catch(x){}
  const gl=glowSprite(0x9affe0,3.4,.3);gl.position.y=1.1;a.g.add(gl);MW.gl=gl;a.g.userData.mtK=1;scene.add(a.g);try{a.setBase('Crouch_Idle_Loop');a.update(.3)}catch(x){}MW.a=a;return a};

/* ================= NEW ORLEANS: flags, fence, benches, painters, a real crowd ================= */
const X19={npc:{},crowd:[],walk:[],flags:[],found:{},fight:0,said:{},e:null,ph:1,built:0,t:0,cmp:{k:{cd:3,ang:0,an:''},l:{cd:6,an:''},m:{cd:4,an:''}}};
try{Object.assign(X19.found,JSON.parse(localStorage.getItem('sorciere-x19')||'{}'))}catch(x){}
function x19Save(){try{localStorage.setItem('sorciere-x19',JSON.stringify(X19.found))}catch(x){}}
function x9Fleur(x,cx,cy,s,col){x.save();x.translate(cx,cy);x.scale(s,s);x.fillStyle=col;x.beginPath();
  x.moveTo(0,-1);x.bezierCurveTo(.32,-.62,.3,-.18,.1,.08);x.lineTo(-.1,.08);x.bezierCurveTo(-.3,-.18,-.32,-.62,0,-1);x.fill();
  for(const sg of[-1,1]){x.beginPath();x.moveTo(sg*.08,.02);x.bezierCurveTo(sg*.25,-.45,sg*.95,-.45,sg*.78,.02);x.bezierCurveTo(sg*.68,-.22,sg*.42,-.12,sg*.3,.12);x.lineTo(sg*.08,.12);x.fill()}
  x.fillRect(-.42,.1,.84,.12);x.beginPath();x.moveTo(-.1,.22);x.lineTo(.1,.22);x.lineTo(.2,.62);x.bezierCurveTo(.08,.5,-.08,.5,-.2,.62);x.closePath();x.fill();
  for(const sg of[-1,1]){x.beginPath();x.moveTo(sg*.12,.24);x.quadraticCurveTo(sg*.45,.3,sg*.5,.6);x.quadraticCurveTo(sg*.38,.42,sg*.2,.4);x.fill()}x.restore()}
const X9F={};
function x9FlagTex(kind){if(X9F[kind])return X9F[kind];let t;
  if(kind==='us')t=sbCanvas(380,200,(x,w,h)=>{for(let i=0;i<13;i++){x.fillStyle=i%2?'#f4f2ee':'#b22234';x.fillRect(0,i*h/13,w,h/13+1)}x.fillStyle='#3c3b6e';x.fillRect(0,0,w*.4,h*7/13);x.fillStyle='#fff';
    const st=(cx,cy,r)=>{x.beginPath();for(let k=0;k<10;k++){const a=-Math.PI/2+k*Math.PI/5,rr=k%2?r*.4:r;x.lineTo(cx+Math.cos(a)*rr,cy+Math.sin(a)*rr)}x.fill()};for(let r=0;r<9;r++)for(let c=0;c<(r%2?5:6);c++)st(w*.4*((c+(r%2?1:.5))/6),h*7/13*((r+.5)/9),4.2)});
  else if(kind==='nola')t=sbCanvas(380,240,(x,w,h)=>{x.fillStyle='#c8102e';x.fillRect(0,0,w,h*.2);x.fillStyle='#f6f4f0';x.fillRect(0,h*.2,w,h*.6);x.fillStyle='#0b3d91';x.fillRect(0,h*.8,w,h*.2);for(const [cx,cy] of [[w*.3,h*.38],[w*.7,h*.38],[w*.5,h*.66]])x9Fleur(x,cx,cy,30,'#d4af37')});
  else{const C={mg:['#4b1d6e','#f2c43a'],gr:['#13603a','#f2c43a'],bl:['#10204a','#f4efe0'],gd:['#c99a20','#3a1650']}[kind];t=sbCanvas(200,300,(x,w,h)=>{x.fillStyle=C[0];x.fillRect(0,0,w,h);x.strokeStyle=C[1];x.lineWidth=6;x.strokeRect(10,10,w-20,h-20);x9Fleur(x,w/2,h*.47,62,C[1]);
    x.fillStyle=C[1];for(let i=0;i<5;i++){x.beginPath();x.moveTo(i*w/5,h);x.lineTo((i+.5)*w/5,h-18);x.lineTo((i+1)*w/5,h);x.fill()}})}
  return X9F[kind]=t}
/* a cloth that moves: horizontal (flagpole) or hanging (banner) */
function x9Cloth(G,kind,w,h,pos,ry,hanging){const geo=new THREE.PlaneGeometry(w,h,hanging?6:14,hanging?10:8);const m=new THREE.Mesh(geo,std({map:x9FlagTex(kind),roughness:.75,side:THREE.DoubleSide}));
  m.position.copy(pos);m.rotation.y=ry;m.castShadow=true;G.add(m);const p=geo.attributes.position;const base=Float32Array.from(p.array);X19.flags.push({m,p,base,w,h,hanging,ph:Math.random()*6});return m}
function x9FlagTick(t){for(const f of X19.flags){if(!f.m.parent||!f.m.parent.visible)continue;const a=f.p.array,b=f.base;for(let i=0;i<a.length;i+=3){const x=b[i],y=b[i+1];if(f.hanging){const k=(f.h/2-y)/f.h;a[i+2]=Math.sin(t*1.8+y*1.6+f.ph)*.12*k+Math.sin(t*3.1+x*2)*.03*k}else{const k=(x+f.w/2)/f.w;a[i+2]=Math.sin(t*4.2-x*1.7+f.ph)*.32*k+Math.sin(t*6.3-x*3+y)*.08*k;a[i+1]=y-k*k*.12}}f.p.needsUpdate=true}}
function x19Bench(G,x,z,ry){const g=new THREE.Group();g.position.set(x,0,z);g.rotation.y=ry;G.add(g);const wd=std({color:0x2e4a2a,roughness:.7}),ir=std({color:0x0a0a0a,metalness:.7,roughness:.4});
  for(let i=0;i<3;i++)sbBox(g,2.2,.06,.14,0,.48,-.16+i*.17,wd);for(let i=0;i<2;i++)sbBox(g,2.2,.14,.05,0,.7+i*.18,-.3,wd);for(const s of[-1,1]){sbBox(g,.06,.48,.5,s*.95,.24,0,ir);sbBox(g,.06,.5,.06,s*.95,.72,-.3,ir)}return g}
function x19Easel(G,x,z,ry,tex){const g=new THREE.Group();g.position.set(x,0,z);g.rotation.y=ry;G.add(g);const wd=std({color:0x6a4a2a,roughness:.7});
  for(const [lx,lz,rx] of [[-.35,.15,.12],[.35,.15,-.12],[0,-.35,0]]){const l=new THREE.Mesh(new THREE.CylinderGeometry(.025,.03,1.9,6),wd);l.position.set(lx,.92,lz);l.rotation.set(lz<0?-.25:.12,0,rx);g.add(l)}
  const cv=new THREE.Mesh(new THREE.PlaneGeometry(.9,.7),std({map:tex,roughness:.8}));cv.position.set(0,1.35,.2);cv.rotation.x=-.12;g.add(cv);return g}
function x19ArtTex(seed){let s=seed;const r=()=>{s=(s*16807)%2147483647;return s/2147483647};return sbCanvas(160,128,(x,w,h)=>{const pal=[['#f2c43a','#4b1d6e','#13603a','#e86a3a'],['#1a3a6a','#f0e6d0','#d84a3a','#2a2a2a'],['#e8a0c0','#3ab0a0','#f4e04a','#20203a']][seed%3];
  x.fillStyle=pal[0];x.fillRect(0,0,w,h);for(let i=0;i<9;i++){x.fillStyle=pal[(r()*4)|0];x.globalAlpha=.6+r()*.4;if(r()<.5)x.fillRect(r()*w,r()*h,20+r()*70,14+r()*50);else{x.beginPath();x.arc(r()*w,r()*h,8+r()*30,0,7);x.fill()}}
  x.globalAlpha=1;x.strokeStyle='#2a1a10';x.lineWidth=8;x.strokeRect(0,0,w,h);if(seed%2){x.fillStyle='#1a1a1a';x.fillRect(w*.42,h*.25,w*.16,h*.6);x.fillRect(w*.3,h*.18,w*.4,h*.1)}})}
function x19Build(){if(X19.built)return;X19.built=1;const G=NL.g,X=NL.X,cz=-58;
  /* the fence is solid now, with gates in the middle of each side */
  for(const s of[-1,1]){NL.boxes.push([X-28.2,X-3,s*28-.15,s*28+.15,2]);NL.boxes.push([X+3,X+28.2,s*28-.15,s*28+.15,2]);NL.boxes.push([X+s*28-.15,X+s*28+.15,-28.2,-3,2]);NL.boxes.push([X+s*28-.15,X+s*28+.15,3,28.2,2])}
  /* flags: the Stars and Stripes and the city flag in front of the cathedral, fleur-de-lis banners on the galleries */
  const pm=std({color:0xd8d4cc,metalness:.6,roughness:.3});for(const [px,kind] of [[-15,'us'],[15,'nola']]){const pole=new THREE.Mesh(new THREE.CylinderGeometry(.08,.12,13,8),pm);pole.position.set(X+px,6.5,cz+12);G.add(pole);const ball=new THREE.Mesh(new THREE.SphereGeometry(.2,10,8),std({color:0xd4af37,metalness:1,roughness:.25}));ball.position.set(X+px,13.1,cz+12);G.add(ball);
    x9Cloth(G,kind,3.8,2.1,V3(X+px+1.95,11.6,cz+12),0,false)}
  {const pole=new THREE.Mesh(new THREE.CylinderGeometry(.08,.12,11,8),pm);pole.position.set(X,5.5,44);G.add(pole);x9Cloth(G,'us',3.4,1.9,V3(X+1.75,9.9,44),0,false)}
  const kinds=['mg','us','gr','nola','bl','gd'];let ki=0;for(const s of[-1,1]){const gx=X+s*(52-10.05);for(let z=-42;z<=42;z+=12){const kind=kinds[ki++%kinds.length];const hang=kind!=='us'&&kind!=='nola';
      if(hang)x9Cloth(G,kind,1.5,2.4,V3(gx,8.6,z),s>0?-Math.PI/2:Math.PI/2,true);else{const m=x9Cloth(G,kind,2.6,1.5,V3(gx-s*.15,9.2,z),s>0?-Math.PI/2:Math.PI/2,true)}}}
  /* Mardi Gras bunting along the galleries */
  {const cols=[0x5a1e8a,0x18803e,0xe6b422];for(const s of[-1,1]){const gx=X+s*(52-10.1);for(let z0=-48;z0<48;z0+=8){const pos=[],cl=[];for(let i=0;i<10;i++){const k0=i/10,k1=(i+.8)/10,sag=k=>-Math.sin(k*Math.PI)*.7;const za=z0+k0*8,zb=z0+k1*8,zm=(za+zb)/2;
      const ya=11.6+sag(k0),yb=11.6+sag(k1);pos.push(gx,ya,za,gx,yb,zb,gx,(ya+yb)/2-.5,zm);const c=new THREE.Color(cols[i%3]);for(let q=0;q<3;q++)cl.push(c.r,c.g,c.b)}
      const gg=new THREE.BufferGeometry();gg.setAttribute('position',new THREE.Float32BufferAttribute(pos,3));gg.setAttribute('color',new THREE.Float32BufferAttribute(cl,3));G.add(new THREE.Mesh(gg,new THREE.MeshBasicMaterial({vertexColors:true,side:THREE.DoubleSide})))}}}
  /* benches */
  for(const [bx,bz,ry] of [[-16,8,Math.PI/2],[16,8,-Math.PI/2],[-16,-8,Math.PI/2],[16,-8,-Math.PI/2],[7,33,Math.PI],[-7,33,Math.PI],[8,-33,0],[-8,-33,0]])x19Bench(G,X+bx,bz,ry);
  /* the artists' fence on the east side */
  for(let i=0;i<14;i++){const z=-26+i*3.6;if(Math.abs(z)<3.2)continue;const m=new THREE.Mesh(new THREE.PlaneGeometry(1.4,1.1),std({map:x19ArtTex(i+3),roughness:.8}));m.position.set(X+28.25,1.25,z);m.rotation.y=Math.PI/2;G.add(m)}
  x19Easel(G,X+33.4,-12.5,-Math.PI/2,x19ArtTex(11));
  /* Café sign and beignet stand, south-west corner */
  {const cv=sbCanvas(512,96,(x,w,h)=>{x.fillStyle='#1a3a2a';x.fillRect(0,0,w,h);x.fillStyle='#f4e8c8';x.font='700 54px Georgia,serif';x.textAlign='center';x.textBaseline='middle';x.fillText('CAFÉ · BEIGNETS',w/2,h/2+3)});
    const s=new THREE.Mesh(new THREE.PlaneGeometry(8,1.5),std({map:cv,emissive:0x2a2414,emissiveMap:cv}));s.position.set(X-24,4.2,52.9);s.rotation.y=Math.PI;G.add(s);
    const aw=new THREE.Mesh(new THREE.BoxGeometry(16,.12,3),std({map:sbCanvas(64,64,(x,w,h)=>{for(let i=0;i<8;i++){x.fillStyle=i%2?'#1a5a3a':'#f2ecdc';x.fillRect(i*8,0,8,h)}}),roughness:.8}));aw.position.set(X-24,3.4,51.4);aw.rotation.x=-.25;G.add(aw);
    const fac=new THREE.Mesh(new THREE.BoxGeometry(18,7,1),std({color:0x8a6a5a,roughness:.85}));fac.position.set(X-24,3.5,54);G.add(fac);
    for(let i=0;i<4;i++){const tb=new THREE.Group();tb.position.set(X-31+i*4.6,0,48.5);G.add(tb);sbBox(tb,1,.06,1,0,.78,0,std({color:0xf4f0e8}));sbBox(tb,.08,.78,.08,0,.39,0,std({color:0x111111,metalness:.6}));const um=new THREE.Mesh(new THREE.ConeGeometry(1.4,.6,8),std({color:i%2?0x1a5a3a:0xf2ecdc,roughness:.8}));um.position.y=2.6;tb.add(um);const up=new THREE.Mesh(new THREE.CylinderGeometry(.03,.03,2.4,6),std({color:0x222222}));up.position.y=1.4;tb.add(up)}}
  /* the crowd */
  x19Crowd()}
function x19Person(o){let a=null;try{a=makeCHActor(o.sx,o.a)}catch(x){}if(!a)return null;a.g.position.copy(o.pos);a.g.rotation.y=o.ry||0;a.g.userData.mtK=1;scene.add(a.g);a.g.visible=false;
  if(o.prop)try{const H=a.S.SK.hand_r;a.attach('hand_r',o.prop,V3(H.x,H.y,H.z+.05),new THREE.Euler(0,-1.2,0))}catch(x){}
  try{a.setBase(o.anim||'Idle_Loop',.1,o.ts||1);a.update(Math.random()*2)}catch(x){}a._x9={anim:o.anim};return a}
function x19Crowd(){const X=NL.X,cz=-58;let s=11;const rnd=()=>{s=(s*16807)%2147483647;return s/2147483647};const pick=L=>L[(rnd()*L.length)|0];
  const SK=[0x3a2418,0x5a3a28,0x8a5a3a,0xa8754e,0xc89a7a,0xe8c0a0,0xf2d6c4];const HC=[0x141010,0x2a1a10,0x5a3a1a,0x8a6a3a,0xc8a060,0x1a1414];const BR=[0x5a1e8a,0x18803e,0xe6b422,0xd8d0c0,0xb22234,0x1a4a8a,0xf2ece0,0x2a2a2a,0xe86a8a,0x3ab0a0];
  const outfit=(sx)=>{const r=rnd(),bead=['pearls',pick([0x7a2ab0,0x18a04a,0xf0c030]),{roughness:.25,metalness:.4}];
    if(sx==='f'&&r<.3)return[['dress',pick(BR),{roughness:.6}],['shoes',pick([0x101010,0x6a3a20,0xf0e8d8])],bead];
    if(sx==='f'&&r<.55)return[['crop',pick(BR)],['skirt',pick(BR)],['shoes',0x1a1a1a],bead];
    if(r<.8)return[['tee',pick(BR)],[rnd()<.5?'shorts':'trousers',pick([0x2a3a5a,0xd8ccb0,0x1a1a1a,0x4a3a2a])],['shoes',pick([0xf0f0f0,0x1a1a1a,0x6a3a20])],bead];
    return[['long',pick(BR)],['jacket',pick([0x1a1a22,0x3a2a1a,0x2a3a4a])],['trousers',pick([0x1a1a1a,0x2a2a3a])],['shoes',0x101010]]};
  const mk=(sx,pos,ry,anim,ts,prop)=>{const hair=sx==='f'?pick(['hairLong','hairBuns','hairPart']):pick(['hairBuzz','hairPart','hairBuzz']);const a=x19Person({sx,pos,ry,anim,ts,prop,a:{skin:pick(SK),hair,hairCol:pick(HC),brow:0x1a1410,beard:sx==='m'&&rnd()<.3,keepReg:[5,6,9],wear:outfit(sx)}});if(a)X19.crowd.push(a);return a};
  /* dancing with the band */
  for(let i=0;i<8;i++){const a=i/8*Math.PI*1.6-Math.PI*.8,r=6+rnd()*3;mk(rnd()<.55?'f':'m',V3(X+Math.sin(a)*r,0,cz+16+Math.cos(a)*r*.6),Math.PI+a*.3,'Dance_Loop',.85+rnd()*.35)}
  /* pairs talking around the square */
  for(const [px,pz] of [[-34,-20],[34,22],[-22,40],[22,-40],[-36,30],[12,46]]){const ry=rnd()*6.28;const A=mk(rnd()<.5?'f':'m',V3(X+px,0,pz),ry,'Idle_Talking_Loop',.9+rnd()*.2);const B=mk(rnd()<.5?'f':'m',V3(X+px+Math.sin(ry)*1.3,0,pz+Math.cos(ry)*1.3),ry+Math.PI,rnd()<.5?'Idle_Loop':'Idle_FoldArms_Loop')}
  /* tourists at the statue */
  mk('f',V3(X-4,0,9),Math.PI,'Idle_TalkingPhone_Loop');mk('m',V3(X+4.5,0,8),Math.PI+.4,'Idle_Loop');
  /* people at the café */
  for(let i=0;i<4;i++)mk(rnd()<.5?'f':'m',V3(X-31+i*4.6+.9,0,48.5),-Math.PI/2,'Sitting_Talking_Loop',.9);
  /* strollers walking the block */
  for(let i=0;i<7;i++){const a=mk(rnd()<.5?'f':'m',V3(X,0,0),0,'Walk_Loop',.95+rnd()*.15);if(a){a._w={s:rnd()*300,v:1.25+rnd()*.35,dir:rnd()<.5?1:-1,lane:rnd()*1.6};X19.walk.push(a)}}}
/* a loop around the square, outside the fence */
function x19WalkPos(s,lane){const R=33+lane,L=R*8;s=((s%L)+L)%L;const side=Math.floor(s/(2*R)),q=s%(2*R)-R;const X=NL.X;if(side===0)return[X+q,R,Math.PI/2];if(side===1)return[X+R,-q,Math.PI];if(side===2)return[X-q,-R,-Math.PI/2];return[X-R,q,0]}
function x19CrowdTick(dt){for(const a of X19.crowd){if(!a.g.visible)continue;if(a._w){const w=a._w;w.s+=w.v*w.dir*dt;const [x,z,ry]=x19WalkPos(w.s,w.lane);a.g.position.set(x,0,z);a.g.rotation.y=lerpAngle(a.g.rotation.y,ry+(w.dir<0?Math.PI:0),Math.min(1,dt*5))}
  const d=Math.hypot(a.g.position.x-P.pos.x,a.g.position.z-P.pos.z);a._acc=(a._acc||0)+dt;if(d<45||a._acc>.25){try{a.update(a._acc)}catch(x){}a._acc=0}}}

/* ================= New Orleans: just the crash landing for now (the next chapter is being rethought) ================= */
function x19Show(on){for(const a of X19.crowd)a.g.visible=on}
{const _ne=nlEnter;nlEnter=function(crash){if(CH2.st>34){CH2.st=34;ch2Save()}const r=_ne.apply(this,arguments);x19Build();
  for(let i=boxes.length-1;i>=0;i--)if(boxes[i].mt)boxes.splice(i,1);for(const b of NL.boxes)boxes.push({x0:b[0],x1:b[1],z0:b[2],z1:b[3],h:b[4]||60,mt:1});x19Show(true);return r}}
{const _nl=nlLeave;nlLeave=function(){x19Show(false);return _nl.apply(this,arguments)}}
function x19Begin(){CH2.st=34;ch2Save();writeSave();x5Banner('THE TIDE DOOR','TO BE CONTINUED IN NEW ORLEANS','#7dffd8',3.6,'#04140f');after(3.8,()=>toast('Morwen is with you, half here. Somewhere in this city, the Crown is hiding, and her name is waiting to be found.','Chapter XVIII complete',true))}
{const _mt=muTick;muTick=function(dt){_mt(dt);if(!started||MODE==='open'||CH2.zone!=='nola')return;dt=Math.min(dt,.05);X19.t+=dt;x9FlagTick(X19.t);x19CrowdTick(dt)}}
/* the game-start toast talks about Paris; not when you are somewhere else */
{const _t=toast;toast=function(msg,title){if(MODE!=='open'&&title==='Paris, after dark'&&CH2.st>=30)return;return _t.apply(this,arguments)}}
/* the Mont arrival never plays once you have left the Mont */
{const _ma=mtArrive;mtArrive=function(){if(CH2.zone!=='mont'||PL.on||CH2.st>=31)return;return _ma.apply(this,arguments)}}
