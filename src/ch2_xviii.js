/* ================= XVIII · The Tide Door: Mont-Saint-Michel at low tide, the parish register, the Drowned Bell ================= */
const XL8={ms_01:"Wait. Her notes. There's a baptism record folded in the back. “Saint-Pierre, Mont-Saint-Michel.” She was born on the Mont!",ms_02:"A parish keeps a register. Every name it ever blessed, written in ink.",ms_03:"Then her real name is sitting in a book, on a rock, in the sea. Lyra?",ms_04:"Hold on to something. The sea doesn't like doors.",ms_05:"Oh. It's floating.",ms_06:"Low tide. We have an hour, maybe less. The sea comes in here faster than a horse can run.",ms_07:"Stay off the shiny patches. Quicksand. It eats pilgrims. And boots.",ms_08:"Is it me, or is the fog following us?",ms_09:"Can you hear that? A bell. Under the sand.",ms_10:"Keep moving. Don't listen to it.",ms_11:"Ugh! It's got my boot!",ms_12:"The King's Gate. Up the Grande Rue. The church is at the top, on the left.",ms_13:"Every shutter's closed. Even the gulls are gone.",ms_14:"Here. Baptisms. Seventeen-something. She's old, isn't she?",ms_15:"Older than the Crown's last three names. Turn the page.",ms_16:"It's gone. Somebody tore it out!",ms_17:"Not somebody. Look at the edge. Burnt black. The Crown ate her name.",ms_18:"There's still something on it. I can feel... a song...",ms_19:"Lyra! LYRA!",ms_20:"I've got her. She's breathing. Whatever that page was, it was loud.",ms_21:"The bell. It's under the church. She's in there. I heard her humming.",ms_22:"Then we go down.",ms_23:"Notre-Dame-sous-Terre. The church under the church. Mind the water. It's rising.",ms_24:"That's not a bell. That's a cage.",ms_25:"Ring me, little witch. Every time you ring me, you lose a little time.",ms_26:"That voice is hers. It's wearing her like a coat.",ms_27:"It rewound us! But look, your echo! It's still fighting!",ms_28:"Every toll leaves a copy of you behind. Make every second count!",ms_29:"The water's coming in! Hit it harder!",ms_30:"That echo's gone red! It's turned on you!",ms_31:"Your own hands, witch. Again, and again, and again.",ms_32:"It's cracking! Everybody, now!",ms_33:"Toll. Toll. Toll.",ms_34:"Time is mine to spend, darling.",ms_35:"Where... where am I? Who are you?",ms_36:"Morwen. It's me. It's Kaen.",ms_37:"Kaen? I don't... I don't know that name. I don't know mine either.",ms_38:"She's fading. She's only half here.",ms_39:"It's getting away! Into the sea!",ms_40:"It's going home. Across the water. I can feel it pulling, like a hook in my chest.",ms_41:"A door. Her door. It opened when she came out. It goes wherever the Crown goes.",ms_42:"Then we follow it. All of us. Together.",ms_43:"Wait, how do we even... oh no. Oh no no no!",ms_44:"WHAT IS HAPPENING?!",ms_45:"The door is pulling us! Steer! Don't let go!",ms_46:"My magic's slipping! The water's cursed! Grab the lights for me!",ms_47:"Is that miles or kilometres?!",ms_48:"Does it matter?!",ms_49:"It's got me! Kaen!",ms_50:"I've got your wrist! Maëlle, blast it! Now!",ms_51:"Thank you. Never let go of me again.",ms_52:"Lightning! Left, left, LEFT!",ms_53:"Was that a whale? A GHOST whale?!",ms_54:"Ship! Go over it!",ms_55:"The sun is going backwards...",ms_56:"We're outrunning the night. We'll arrive before we left!",ms_57:"Bermuda! Don't look down. Things vanish here!",ms_58:"Land! LAND! How do we stop?!",ms_59:"Ow. Where... are we?",ms_60:"New Orleans. Jackson Square.",ms_61:"Why is there a parade?",ms_62:"I know this music...",ms_63:"Kaen can't hold me forever! Smash it!",ms_64:"Hold on, Lyra!"};
const XL8W={ms_01:"Lyra",ms_02:"Kaen",ms_03:"@",ms_04:"Lyra",ms_05:"@",ms_06:"Kaen",ms_07:"Lyra",ms_08:"@",ms_09:"Lyra",ms_10:"Kaen",ms_11:"@",ms_12:"Lyra",ms_13:"Kaen",ms_14:"@",ms_15:"Lyra",ms_16:"@",ms_17:"Kaen",ms_18:"Lyra",ms_19:"@",ms_20:"Kaen",ms_21:"Lyra",ms_22:"@",ms_23:"Kaen",ms_24:"@",ms_25:"Bell",ms_26:"Kaen",ms_27:"Lyra",ms_28:"Kaen",ms_29:"@",ms_30:"Lyra",ms_31:"Bell",ms_32:"@",ms_33:"Bell",ms_34:"Bell",ms_35:"Morwen",ms_36:"Kaen",ms_37:"Morwen",ms_38:"Lyra",ms_39:"@",ms_40:"Morwen",ms_41:"Lyra",ms_42:"Kaen",ms_43:"@",ms_44:"@",ms_45:"Kaen",ms_46:"Lyra",ms_47:"@",ms_48:"Kaen",ms_49:"Lyra",ms_50:"Kaen",ms_51:"Lyra",ms_52:"@",ms_53:"@",ms_54:"Kaen",ms_55:"Morwen",ms_56:"Kaen",ms_57:"Lyra",ms_58:"@",ms_59:"@",ms_60:"Lyra",ms_61:"Kaen",ms_62:"Morwen",ms_63:"Lyra",ms_64:"@"};
for(const k in XL8)VO_MAP[XL8[k]]=k;
Object.assign(SPEAKER,{Morwen:'#ff9fb4','The Drowned Bell':'#7dffd8'});
const msSay=(k,p)=>epSay(XL8W[k],XL8[k],p);
const VOPK7={idx:/*VOPK7IDX*/{"ms_01":[0,60857],"ms_02":[60857,44138],"ms_03":[104995,42257],"ms_04":[147252,35361],"ms_05":[182613,19479],"ms_06":[202092,53124],"ms_07":[255216,44347],"ms_08":[299563,26584],"ms_09":[326147,29301],"ms_10":[355448,19061],"ms_11":[374509,18434],"ms_12":[392943,37242],"ms_13":[430185,28883],"ms_14":[459068,42048],"ms_15":[501116,33480],"ms_16":[534596,23031],"ms_17":[557627,55423],"ms_18":[613050,34943],"ms_19":[647993,15090],"ms_20":[663083,38705],"ms_21":[701788,43511],"ms_22":[745299,13000],"ms_23":[758299,56050],"ms_24":[814349,24285],"ms_25":[838634,43720],"ms_26":[882354,28256],"ms_27":[910610,32853],"ms_28":[943463,37033],"ms_29":[980496,21359],"ms_30":[1001855,21777],"ms_31":[1023632,54587],"ms_32":[1078219,22195],"ms_33":[1100414,28256],"ms_34":[1128670,23867],"ms_35":[1152537,42675],"ms_36":[1195212,25539],"ms_37":[1220751,46019],"ms_38":[1266770,25539],"ms_39":[1292309,19270],"ms_40":[1311579,46855],"ms_41":[1358434,47900],"ms_42":[1406334,26793],"ms_43":[1433127,36406],"ms_44":[1469533,16344],"ms_45":[1485877,30137],"ms_46":[1516014,31599],"ms_47":[1547613,21150],"ms_48":[1568763,11328],"ms_49":[1580091,16762],"ms_50":[1596853,31599],"ms_51":[1628452,23031],"ms_52":[1651483,23867],"ms_53":[1675350,23449],"ms_54":[1698799,15299],"ms_55":[1714098,18852],"ms_56":[1732950,30346],"ms_57":[1763296,25957],"ms_58":[1789253,25539],"ms_59":[1814792,30555],"ms_60":[1845347,24494],"ms_61":[1869841,14254],"ms_62":[1884095,13418],"ms_63":[1897513,20733],"ms_64":[1918246,14254],"ly01":[1932500,23469],"ly02":[1955969,54573],"ly03":[2010542,89517],"ly04":[2100059,77421],"ly05":[2177480,93165],"ly06":[2270645,75501],"ly07":[2346146,27885],"ly08":[2374031,28269],"ly09":[2402300,47853],"ly10":[2450153,55725],"ly11":[2505878,41901],"ly12":[2547779,60141],"ly13":[2607920,39597],"ly14":[2647517,38445],"ly15":[2685962,20589],"ly16":[2706551,22509],"ly17":[2729060,21165],"ly18":[2750225,32877],"ly19":[2783102,26925],"ly20":[2810027,36909],"ly21":[2846936,42093],"ly22":[2889029,52845],"ly23":[2941874,36909],"ly24":[2978783,60909],"ly25":[3039692,44397],"ly26":[3084089,46509],"ly27":[3130598,48045],"ly28":[3178643,26925],"ly29":[3205568,32109],"ly30":[3237677,55917],"ly31":[3293594,72621],"ly32":[3366215,42861],"ly33":[3409076,82029],"ly34":[3491105,23469],"ly35":[3514574,51117],"ly36":[3565691,65709],"ly37":[3631400,25773],"ly38":[3657173,77805],"ly39":[3734978,37101],"ly40":[3772079,54957],"ly41":[3827036,45165],"ly42":[3872201,14445]},p:null};
{const _vr=voRaw;voRaw=function(k){const ix=VOPK7.idx[k];if(!ix||VO.raw[k])return _vr(k);if(!VOPK7.p)VOPK7.p=fetch('assets/vo28.mp3').then(r=>r.ok?r.arrayBuffer():null).catch(()=>null);
  VO.raw[k]=VOPK7.p.then(b=>b&&b.byteLength>=ix[0]+ix[1]?b.slice(ix[0],ix[0]+ix[1]):fetch('assets/'+k+'.mp3').then(r=>r.ok?r.arrayBuffer():null).catch(()=>null));return VO.raw[k]}}
/* lines that used to load one file each now come out of the pack too */
{const _cl=clipLoad;clipLoad=function(k){if(VOPK7.idx[k]&&!CLIP.req[k])return voLoad(k);return _cl.apply(this,arguments)}}
Object.assign(SX.sets,{toll:1,rewind:1,tide:1,sonic:1,whale:1,bellcrack:1,rush:1,squelch:1,shiphorn:1,crashland:1,lullaby:1});
MU.keys.push('mus_mont','mus_pull','mus_brass');MU.gain=Object.assign(MU.gain||{},{mus_mont:1.7,mus_pull:2,mus_brass:1.6,mus_b_bell:1.8});

/* ---------- layout ---------- */
const MTC={x:9000,z:-40};                    /* the rock's centre */
const MTE={x:9600,z:0},MTK={x:9800,z:0};     /* church interior, crypt */
const MTW={out:{x0:8760,x1:9240,z0:-170,z1:470},egl:{x0:MTE.x-7,x1:MTE.x+7,z0:-16,z1:16},crypt:{x0:MTK.x-21,x1:MTK.x+21,z0:-21,z1:24}};
const MTR=84;
const MT={g:null,out:null,egl:null,crypt:null,area:null,hid:[],boxes:{out:[],egl:[],crypt:[]},circ:{out:[],egl:[],crypt:[]},t:0,boot:0,fog0:null,s:{},wl:-2.4,cwl:-.3,cwlT:-.3,L:[],anim:[],qs:[],stakes:[],mat:{},sol:[]};
const mtX=()=>MODE!=='open'&&started;
const mtIn=x=>x>8500&&x<10200;
function mtSand(x,z){return (z-40)*-.004+Math.sin(x*.09)*Math.cos(z*.07)*.05}
/* the rock is a height field that matches its mesh exactly; the Grande Rue is carved into it and spirals up the east face */
const MTPROF=[[86.5,-1],[85,1],[84.2,1.5],[78,3],[72,8],[64,16],[56,25],[48,34],[41,43],[35,51],[29,58],[25,63],[21,68],[15,71],[0,72]];
function mtRockY(r){const P_=MTPROF;if(r>=P_[0][0])return -9;for(let i=1;i<P_.length;i++)if(r>=P_[i][0]){const a=P_[i-1],b=P_[i],k=(a[0]-r)/(a[0]-b[0]);return a[1]+(b[1]-a[1])*k}return 72}
const MTPA={t0:0,t1:1.42,r0:79.4,r1:47.5,w:3.8};
function mtPR(t){return MTPA.r0+(MTPA.r1-MTPA.r0)*clamp((t-MTPA.t0)/(MTPA.t1-MTPA.t0),0,1)}
function mtPY(t){return mtRockY(mtPR(t))}
const MTSQY=mtRockY(47.5),MTCH={t:1.7,r:38};
function mtPolar(x,z){const dx=x-MTC.x,dz=z-MTC.z;return{r:Math.hypot(dx,dz),t:Math.atan2(dx,dz)}}
function mtPolarP(t,r,y){return V3(MTC.x+Math.sin(t)*r,y||0,MTC.z+Math.cos(t)*r)}
function mtInPath(x,z,pad){const q=mtPolar(x,z);pad=pad||0;if(q.t<MTPA.t0-.04-pad/60||q.t>MTPA.t1+.06)return false;return Math.abs(q.r-mtPR(q.t))<MTPA.w+pad}
function mtInSq(x,z,pad){const q=mtPolar(x,z);pad=pad||0;return q.t>1.42-pad/48&&q.t<1.98+pad/48&&q.r>42.5-pad&&q.r<53+pad}
function mtInGate(x,z,pad){pad=pad||0;return Math.abs(x-MTC.x)<4.4+pad&&z>MTC.z+79.6-pad&&z<MTC.z+87.5}
function mtGateY(z){return lerp(0,mtPY(0),clamp((MTC.z+87-z)/7,0,1))}
/* solid boxes (optionally rotated) you collide with and can stand on */
function mtSol(x0,x1,z0,z1,y0,y1){MT.sol.push({x:(x0+x1)/2,z:(z0+z1)/2,c:1,s:0,hx:(x1-x0)/2,hz:(z1-z0)/2,y0,y1})}
function mtSolO(x,z,a,hx,hz,y0,y1){MT.sol.push({x,z,c:Math.cos(a),s:Math.sin(a),hx,hz,y0,y1})}
function mtSolIn(S,x,z,pad){const dx=x-S.x,dz=z-S.z;return Math.abs(dx*S.c-dz*S.s)<S.hx+(pad||0)&&Math.abs(dx*S.s+dz*S.c)<S.hz+(pad||0)}
function mtBaseY(x,z){if(mtInGate(x,z))return mtGateY(z);if(mtInSq(x,z))return MTSQY;const q=mtPolar(x,z);if(mtInPath(x,z))return mtPY(q.t);
  let g=Math.max(Math.min(0,mtSand(x,z)),mtRockY(q.r));if(q.r>83.2&&q.r<84.8&&Math.abs(q.t)<1.95)g=10.4;return g}
function mtGround(x,z,y){
  if(x<9300){let g=mtBaseY(x,z);if(y!==undefined)for(const S of MT.sol)if(S.y1>g&&y>=S.y1-1.1&&mtSolIn(S,x,z))g=S.y1;return g}
  if(x<9700)return 0;
  const d=Math.hypot(x-MTK.x,z-MTK.z);if(z>19.5&&Math.abs(x-MTK.x)<2.6)return clamp((z-19.5)*.55,0,2.4);return d<8.5?1.2:d<12.5?.6:0}
function mtBlocked(x,z,y){const g=mtGround(x,z,y);if(g>y+.95)return true;for(const S of MT.sol){if(y>=S.y1-.6||y+1.8<=S.y0)continue;if(mtSolIn(S,x,z,.45))return true}return false}

/* ---------- textures ---------- */
const MTX={};
function mtTex(){if(MTX.ok)return MTX;MTX.ok=1;const R=(a,b)=>a+Math.random()*(b-a);
  MTX.sand=sbCanvas(512,512,(x,w,h)=>{x.fillStyle='#6e6352';x.fillRect(0,0,w,h);for(let i=0;i<9000;i++){const v=R(-18,18);x.fillStyle=`rgba(${100+v},${90+v},${70+v},.35)`;x.fillRect(R(0,w),R(0,h),R(1,3),R(1,2))}
    for(let y=0;y<h;y+=7){x.strokeStyle=`rgba(40,34,24,${R(.12,.25)})`;x.lineWidth=R(1.5,3);x.beginPath();for(let X=0;X<=w;X+=8)x.lineTo(X,y+Math.sin(X*.05+y*.3)*3+Math.sin(X*.13)*1.5);x.stroke()}
    for(let i=0;i<26;i++){const cx=R(0,w),cy=R(0,h),r=R(10,46);const g=x.createRadialGradient(cx,cy,0,cx,cy,r);g.addColorStop(0,'rgba(34,38,40,.35)');g.addColorStop(1,'rgba(34,38,40,0)');x.fillStyle=g;x.beginPath();x.ellipse(cx,cy,r,r*.6,R(0,3),0,7);x.fill()}});
  MTX.sandR=sbCanvas(256,256,(x,w,h)=>{x.fillStyle='#d0d0d0';x.fillRect(0,0,w,h);for(let i=0;i<40;i++){const cx=R(0,w),cy=R(0,h),r=R(6,30);const g=x.createRadialGradient(cx,cy,0,cx,cy,r);g.addColorStop(0,'#101010');g.addColorStop(1,'rgba(16,16,16,0)');x.fillStyle=g;x.beginPath();x.ellipse(cx,cy,r,r*.55,R(0,3),0,7);x.fill()}});
  MTX.rock=sbCanvas(512,512,(x,w,h)=>{x.fillStyle='#5c574e';x.fillRect(0,0,w,h);for(let i=0;i<260;i++){x.fillStyle=`hsl(${R(30,45)},${R(6,14)}%,${R(24,44)}%)`;x.beginPath();const cx=R(0,w),cy=R(0,h);x.moveTo(cx,cy);for(let k=0;k<6;k++)x.lineTo(cx+R(-34,34),cy+R(-22,22));x.fill()}
    for(let i=0;i<60;i++){x.strokeStyle='rgba(20,18,14,.5)';x.lineWidth=R(1,2.4);x.beginPath();let px=R(0,w),py=R(0,h);x.moveTo(px,py);for(let k=0;k<5;k++){px+=R(-30,30);py+=R(4,26);x.lineTo(px,py)}x.stroke()}
    for(let i=0;i<1400;i++){x.fillStyle=`rgba(${R(0,1)<.5?0:220},${R(0,1)<.5?0:220},${R(0,1)<.5?0:200},${R(.04,.12)})`;x.fillRect(R(0,w),R(0,h),2,2)}});
  MTX.granite=sbCanvas(256,256,(x,w,h)=>{x.fillStyle='#9a8f7c';x.fillRect(0,0,w,h);for(let r=0;r<10;r++)for(let c=0;c<6;c++){const o=r%2?21:0;x.fillStyle=`hsl(${R(32,42)},${R(8,16)}%,${R(42,60)}%)`;x.fillRect(c*43+o+1,r*25.6+1,41,23.6);x.fillRect(c*43+o-42,r*25.6+1,41,23.6)}x.fillStyle='rgba(30,26,20,.4)';for(let r=0;r<=10;r++)x.fillRect(0,r*25.6-1,w,2);for(let i=0;i<600;i++){x.fillStyle=`rgba(0,0,0,${R(0,.12)})`;x.fillRect(R(0,w),R(0,h),R(1,3),R(1,3))}});
  MTX.slate=sbCanvas(256,256,(x,w,h)=>{x.fillStyle='#2a2e36';x.fillRect(0,0,w,h);for(let r=0;r<16;r++)for(let c=0;c<10;c++){const o=r%2?13:0;x.fillStyle=`hsl(220,${R(6,14)}%,${R(14,26)}%)`;x.fillRect(c*26+o,r*16,24,14);x.fillRect(c*26+o-26,r*16,24,14)}});
  MTX.cobble=sbCanvas(256,256,(x,w,h)=>{x.fillStyle='#3a342c';x.fillRect(0,0,w,h);for(let r=0;r<12;r++)for(let c=0;c<12;c++){x.fillStyle=`hsl(${R(28,40)},${R(6,14)}%,${R(30,48)}%)`;x.beginPath();x.ellipse(c*21.3+10+R(-2,2)+(r%2)*10,r*21.3+10,R(8,10),R(7,9),R(0,3),0,7);x.fill()}});
  /* one facade tile = 3 storeys x 3 bays: a stone or rendered wall, framed windows with sills and shutters, some lit */
  const house=(base,tint,timber)=>{const d=document.createElement('canvas');d.width=256;d.height=256;const e=d.getContext('2d');e.fillStyle='#000';e.fillRect(0,0,256,256);
    const t=sbCanvas(256,256,(x,w,h)=>{x.fillStyle=base;x.fillRect(0,0,w,h);
      if(!timber){for(let r=0;r<22;r++)for(let c=0;c<9;c++){const o=r%2?14:0;x.fillStyle=`rgba(${R(0,1)<.5?0:255},${R(0,1)<.5?0:240},${R(0,1)<.5?0:220},${R(.03,.09)})`;x.fillRect(c*30+o-15,r*11.7,28,10.4)}x.strokeStyle='rgba(30,24,18,.25)';x.lineWidth=1;for(let r=0;r<22;r++){x.beginPath();x.moveTo(0,r*11.7);x.lineTo(w,r*11.7);x.stroke()}}
      else{for(let i=0;i<900;i++){x.fillStyle=`rgba(0,0,0,${R(0,.05)})`;x.fillRect(R(0,w),R(0,h),R(2,6),R(2,6))}x.fillStyle='#3a2416';for(let r=0;r<3;r++){x.fillRect(0,r*85+80,w,6);x.fillRect(0,r*85,w,4)}for(let c=0;c<=6;c++){x.fillRect(c*42.6-3,0,6,h)}x.strokeStyle='#3a2416';x.lineWidth=5;for(let r=0;r<3;r++)for(let c=0;c<3;c++){const X=c*85,Y=r*85;x.beginPath();x.moveTo(X+4,Y+80);x.lineTo(X+38,Y+48);x.moveTo(X+81,Y+80);x.lineTo(X+47,Y+48);x.stroke()}}
      for(let i=0;i<1200;i++){x.fillStyle=`rgba(0,0,0,${R(0,.06)})`;x.fillRect(R(0,w),R(0,h),R(1,3),R(1,3))}
      for(let r=0;r<3;r++)for(let c=0;c<3;c++){const X=24+c*85,Y=14+r*85;const lit=Math.random()<.3;
        x.fillStyle='rgba(0,0,0,.35)';x.fillRect(X-2,Y-2,42,58);x.fillStyle='#d8ccb0';x.fillRect(X-5,Y-6,48,6);x.fillRect(X-6,Y+54,50,6);
        x.fillStyle=lit?'#ffcf7a':'#141a22';x.fillRect(X,Y,38,52);if(lit){const g=x.createLinearGradient(0,Y,0,Y+52);g.addColorStop(0,'rgba(255,240,200,.6)');g.addColorStop(1,'rgba(200,120,40,0)');x.fillStyle=g;x.fillRect(X,Y,38,52)}
        x.fillStyle='#2a2018';x.fillRect(X+17,Y,4,52);x.fillRect(X,Y+24,38,3);
        if(Math.random()<.75){x.fillStyle=tint;x.fillRect(X-15,Y-2,13,56);x.fillRect(X+40,Y-2,13,56);x.fillStyle='rgba(0,0,0,.25)';for(let k=0;k<8;k++){x.fillRect(X-15,Y+k*7,13,1.5);x.fillRect(X+40,Y+k*7,13,1.5)}}
        if(r===2&&Math.random()<.4){x.fillStyle='#3a5a2a';x.fillRect(X-4,Y+50,46,7);for(let k=0;k<9;k++){x.fillStyle=['#e04050','#f0f0f0','#e080c0'][k%3];x.beginPath();x.arc(X+k*5,Y+50,2.4,0,7);x.fill()}}
        if(lit){e.fillStyle='#ffc060';e.fillRect(X,Y,38,52);e.fillStyle='#000';e.fillRect(X+17,Y,4,52);e.fillRect(X,Y+24,38,3)}}});
    const em=new THREE.CanvasTexture(d);em.wrapS=em.wrapT=THREE.RepeatWrapping;return{t,em}};
  MTX.h=[house('#a49a86','#3a4a5a'),house('#8c8270','#5a2a24'),house('#b4a890','#2a4a3a'),house('#e2d6be','#2a3a5a',1),house('#7a7266','#4a3a2a'),house('#d8c8a8','#5a2a24',1)];
  MTX.shop=[0,1,2,3].map(k=>sbCanvas(256,192,(x,w,h)=>{x.fillStyle=['#3a1c12','#13283a','#1c3018','#3a2a10'][k];x.fillRect(0,0,w,h);x.fillStyle='#ffd590';x.fillRect(14,14,150,150);x.fillRect(184,30,58,162);
      const g=x.createRadialGradient(90,80,10,90,80,120);g.addColorStop(0,'rgba(255,250,220,.9)');g.addColorStop(1,'rgba(200,110,30,.2)');x.fillStyle=g;x.fillRect(14,14,150,150);
      for(let i=0;i<26;i++){x.fillStyle=['#8a3020','#c09040','#5a7040','#f0e0c0','#704020'][i%5];const sx=R(20,150),sy=[60,110,150][i%3];x.fillRect(sx,sy-R(8,20),R(6,14),R(8,20))}x.fillStyle='#2a1a10';for(const yy of[64,114])x.fillRect(14,yy,150,4);
      x.fillStyle='rgba(30,18,10,.85)';x.fillRect(86,14,4,150);x.fillRect(14,86,150,4);x.fillStyle='#4a2a18';x.fillRect(190,36,46,156);x.fillStyle='#d0a050';x.beginPath();x.arc(228,120,3,0,7);x.fill()}));
  MTX.awn=['#b02a2a','#2a5a9a','#2a7a4a','#b07a20'].map(c=>sbCanvas(64,64,(x,w,h)=>{for(let i=0;i<8;i++){x.fillStyle=i%2?c:'#f0e6d0';x.fillRect(i*8,0,8,h)}x.fillStyle='rgba(0,0,0,.2)';x.fillRect(0,h-10,w,10)}));
  MTX.glass=sbCanvas(128,256,(x,w,h)=>{x.fillStyle='#0a0a12';x.fillRect(0,0,w,h);const cols=['#2050c0','#c02838','#e8b030','#1f8a50','#7030a0'];for(let r=0;r<16;r++)for(let c=0;c<8;c++){x.fillStyle=cols[(Math.random()*5)|0];x.fillRect(c*16+1,r*16+1,14,14)}x.strokeStyle='#000';x.lineWidth=6;x.beginPath();x.arc(64,64,60,Math.PI,0);x.stroke()});
  MTX.page=sbCanvas(256,256,(x,w,h)=>{x.fillStyle='#d8c8a0';x.fillRect(0,0,w,h);for(let i=0;i<800;i++){x.fillStyle=`rgba(90,60,20,${R(0,.08)})`;x.fillRect(R(0,w),R(0,h),R(1,6),R(1,6))}x.fillStyle='rgba(40,24,10,.75)';
    for(let y=24;y<h-16;y+=13){let X=16;while(X<w-20){const L=R(8,30);x.fillRect(X,y,L,2.2);X+=L+R(4,8)}}});
  MTX.torn=sbCanvas(256,256,(x,w,h)=>{x.fillStyle='#d8c8a0';x.fillRect(0,0,w,h);x.fillStyle='rgba(40,24,10,.75)';for(let y=24;y<60;y+=13){let X=16;while(X<w-20){const L=R(8,30);x.fillRect(X,y,L,2.2);X+=L+R(4,8)}}
    x.fillStyle='#0a0604';x.beginPath();x.moveTo(0,76);for(let X=0;X<=w;X+=10)x.lineTo(X,76+R(-8,10));x.lineTo(w,h);x.lineTo(0,h);x.fill();x.strokeStyle='#ff7a20';x.lineWidth=2.5;x.beginPath();x.moveTo(0,74);for(let X=0;X<=w;X+=10)x.lineTo(X,74+R(-8,8));x.stroke()});
  return MTX}
const mtM=(tex,rx,ry,o)=>sbMat(tex,rx,ry,o);
function mtPrism(){const g=new THREE.BufferGeometry();const v=[-.5,0,-.5,.5,0,-.5,0,1,-.5, -.5,0,.5,0,1,.5,.5,0,.5, -.5,0,-.5,0,1,-.5,0,1,.5, -.5,0,-.5,0,1,.5,-.5,0,.5, .5,0,-.5,.5,0,.5,0,1,.5, .5,0,-.5,0,1,.5,0,1,-.5];
  const uv=[];for(let i=0;i<v.length/3;i++){uv.push(v[i*3+2]+.5,v[i*3+1]+(v[i*3]+.5)*.5)}g.setAttribute('position',new THREE.Float32BufferAttribute(v,3));g.setAttribute('uv',new THREE.Float32BufferAttribute(uv,2));g.computeVertexNormals();return g}
const MTS=8.5/3;
function mtUV(geo,w,h,d,P,ou){const uv=geo.attributes.uv;for(let f=0;f<6;f++){const du=f<2?d:w,dv=(f===2||f===3)?d:h;for(let k=0;k<4;k++){const i=f*4+k;uv.setXY(i,uv.getX(i)*du/P+(ou||0),uv.getY(i)*dv/P)}}uv.needsUpdate=true;return geo}
function mtHouseMats(){if(MT.hM)return MT.hM;const T=mtTex();const top=std({color:0x34302c,roughness:.9});
  const fac=T.h.map(h=>{const t=h.t.clone();t.needsUpdate=true;const e=h.em.clone();e.needsUpdate=true;const m=std({map:t,emissive:0xffffff,emissiveMap:e,emissiveIntensity:.85,roughness:.85});return[m,m,top,top,m,m]});
  const gt=T.granite.clone();gt.needsUpdate=true;const pl=std({map:gt,color:0x8e8472,roughness:.92});const rt=T.slate.clone();rt.needsUpdate=true;rt.repeat.set(3,2);const roof=std({map:rt,color:0x5a6274,roughness:.5,metalness:.1});
  const shop=T.shop.map(c=>std({map:c,emissive:0xffffff,emissiveMap:c,emissiveIntensity:.75,roughness:.4}));const awn=T.awn.map(c=>std({map:c,roughness:.8,side:THREE.DoubleSide}));
  MT.hM={fac,pl,roof,prism:mtPrism(),shop,awn,top};return MT.hM}
function mtHouse(G,o){const M=mtHouseMats();const g=new THREE.Group();g.position.set(o.x,0,o.z);g.rotation.y=o.a;G.add(g);const w=o.w,d=o.d,h=o.n*MTS;
  if(o.yf-o.yb>.1){const ph=o.yf-o.yb;const p=new THREE.Mesh(mtUV(new THREE.BoxGeometry(w+.24,ph,d+.24),w+.24,ph,d+.24,3.2),M.pl);p.position.y=o.yb+ph/2;g.add(p)}
  const b=new THREE.Mesh(mtUV(new THREE.BoxGeometry(w,h,d),w,h,d,8.5,o.ou||0),M.fac[o.mi%M.fac.length]);b.position.y=o.yf+h/2;b.castShadow=true;g.add(b);
  const cor=new THREE.Mesh(new THREE.BoxGeometry(w+.3,.22,d+.3),M.pl);cor.position.y=o.yf+h;g.add(cor);
  const rh=o.rh||2.4;const ro=new THREE.Mesh(M.prism,M.roof);ro.scale.set(w+.6,rh,d+.6);ro.position.y=o.yf+h+.1;g.add(ro);
  if(o.ch){const c=new THREE.Mesh(new THREE.BoxGeometry(.75,2.2,.75),M.pl);c.position.set(w*.26,o.yf+h+rh*.45+.6,d*.22);g.add(c);const cap=new THREE.Mesh(new THREE.BoxGeometry(.95,.14,.95),M.top);cap.position.set(w*.26,o.yf+h+rh*.45+1.75,d*.22);g.add(cap)}
  mtSolO(o.x,o.z,o.a,w/2,d/2,o.yb,o.yf+h+rh*.5);return g}
function mtCol(a,x0,x1,z0,z1,h){MT.boxes[a].push({x0,x1,z0,z1,h:h||40,mt:1})}

/* ---------- outside: the flats, the rock, the walls, the village, the abbey ---------- */
function mtBuildOut(){const G=MT.out=new THREE.Group();MT.g.add(G);const T=mtTex();const M=MT.mat;
  /* wet sand, sloping gently down to the sea */
  {const geo=new THREE.PlaneGeometry(1400,1400,140,140);geo.rotateX(-Math.PI/2);const p=geo.attributes.position;for(let i=0;i<p.count;i++){const x=p.getX(i)+MTC.x,z=p.getZ(i)+260;p.setY(i,Math.min(.05,mtSand(x,z))-.02)}geo.computeVertexNormals();
    const st=T.sand.clone();st.needsUpdate=true;st.repeat.set(110,110);const sr=T.sandR.clone();sr.needsUpdate=true;sr.repeat.set(60,60);
    const m=new THREE.Mesh(geo,std({map:st,roughnessMap:sr,roughness:1,metalness:.15,color:0x8a8070,envMapIntensity:1.4}));m.position.set(MTC.x,0,260);m.receiveShadow=true;G.add(m)}
  /* the sea: one sheet that rises, so the tide runs in from the south across the slope */
  {const wn=waterN.clone?waterN:null;const m=new THREE.Mesh(new THREE.PlaneGeometry(1600,1600,1,1),std({color:0x0d2230,roughness:.08,metalness:.55,transparent:true,opacity:.86,normalMap:wn,envMapIntensity:1.8}));if(m.material.normalMap)m.material.normalScale=new THREE.Vector2(.6,.6);
    m.rotation.x=-Math.PI/2;m.position.set(MTC.x,MT.wl,300);G.add(m);MT.sea=m}
  /* the rock */
  {const pts=[];for(let i=0;i<MTPROF.length-1;i++){const a=MTPROF[i],b=MTPROF[i+1],n=Math.max(1,Math.ceil(Math.hypot(a[0]-b[0],a[1]-b[1])/1.3));for(let k=0;k<n;k++)pts.push(new THREE.Vector2(a[0]+(b[0]-a[0])*k/n,a[1]+(b[1]-a[1])*k/n))}pts.push(new THREE.Vector2(0,72));
    const geo=new THREE.LatheGeometry(pts,240);const p=geo.attributes.position;for(let i=0;i<p.count;i++){const x=p.getX(i),y=p.getY(i),z=p.getZ(i);const a=Math.atan2(x,z);const nk=y>13&&y<69?1:0;const n=1+nk*(.006*Math.sin(a*7+y*.2)+.004*Math.sin(a*19-y*.4));p.setX(i,x*n);p.setZ(i,z*n)}
    const ix=geo.index.array,keep=[];const cut=(i)=>{const x=p.getX(i)+MTC.x,z=p.getZ(i)+MTC.z;const q=mtPolar(x,z);return mtInPath(x,z,-.4)||mtInSq(x,z,-.4)||mtInGate(x,z,-.3)||(q.t>1.55&&q.t<1.85&&q.r>32.5&&q.r<43.8)};for(let t=0;t<ix.length;t+=3){if(cut(ix[t])&&cut(ix[t+1])&&cut(ix[t+2]))continue;keep.push(ix[t],ix[t+1],ix[t+2])}geo.setIndex(keep);geo.computeVertexNormals();
    const rt=T.rock.clone();rt.needsUpdate=true;rt.repeat.set(16,6);const m=new THREE.Mesh(geo,std({map:rt,color:0x8a8072,roughness:.95,emissive:0xffffff,emissiveMap:rt,emissiveIntensity:.16,side:THREE.DoubleSide}));m.position.set(MTC.x,0,MTC.z);m.castShadow=m.receiveShadow=true;G.add(m);MT.rockProf=MTPROF}
  /* ramparts with towers, crenellations and the King's Gate */
  {const wall=mtM(T.granite,40,2,{color:0x9a9284,roughness:.9,emissive:0x6a4a22,emissiveIntensity:.5});const H=10;
    for(const [a0,a1] of [[-1.95,-.075],[.075,1.95]]){const geo=new THREE.CylinderGeometry(MTR,MTR,H,90,1,true,a0,a1-a0);const m=new THREE.Mesh(geo,wall);m.material.side=THREE.DoubleSide;m.position.set(MTC.x,H/2,MTC.z);G.add(m);
      const top=new THREE.Mesh(new THREE.RingGeometry(MTR-2.4,MTR,90,1,0,1),wall);top.rotation.x=-Math.PI/2;G.add(top);top.visible=false}
    const mer=new THREE.InstancedMesh(new THREE.BoxGeometry(1.3,1.4,1.1),wall,170);let n=0;const dm=new THREE.Object3D();for(let a=-1.95;a<=1.95&&n<170;a+=2.3/MTR){if(Math.abs(a)<.08)continue;dm.position.set(MTC.x+Math.sin(a)*MTR,H+.7,MTC.z+Math.cos(a)*MTR);dm.rotation.set(0,a,0);dm.updateMatrix();mer.setMatrixAt(n++,dm.matrix)}mer.count=n;G.add(mer);
    const roof=mtM(T.slate,3,3,{color:0x5a6272,roughness:.6});
    for(const a of [-.13,.13,-.7,.7,-1.3,1.3,-1.85,1.85]){const r=Math.abs(a)<.2?3.2:4.4,h=Math.abs(a)<.2?15:17;const x=MTC.x+Math.sin(a)*MTR,z=MTC.z+Math.cos(a)*MTR;const t=new THREE.Mesh(new THREE.CylinderGeometry(r,r*1.08,h,20),wall);t.position.set(x,h/2,z);t.castShadow=true;G.add(t);
      const c=new THREE.Mesh(new THREE.ConeGeometry(r*1.2,r*1.9,20),roof);c.position.set(x,h+r*.95,z);G.add(c);mtSol(x-r*.9,x+r*.9,z-r*.9,z+r*.9,-2,h)}
    /* gatehouse over the street mouth */
    const gx=MTC.x,gz=MTC.z+MTR;sbBox(G,3,13,6,gx-6,6.5,gz,wall);sbBox(G,3,13,6,gx+6,6.5,gz,wall);sbBox(G,15,4.4,6,gx,10.8,gz,wall);mtSol(gx-7.5,gx-4.5,gz-3,gz+3,-2,13);mtSol(gx+4.5,gx+7.5,gz-3,gz+3,-2,13);mtSol(gx-7.5,gx+7.5,gz-3,gz+3,8.6,13);
    const arch=new THREE.Mesh(new THREE.TorusGeometry(4.5,.5,8,24,Math.PI),wall);arch.position.set(gx,8.6,gz+3.05);G.add(arch);
    const port=new THREE.Group();for(let i=-4;i<=4;i++){const b=new THREE.Mesh(new THREE.BoxGeometry(.22,3.6,.22),std({color:0x1a1612,metalness:.6,roughness:.5}));b.position.set(gx+i*1,10.2,gz+2.4);port.add(b)}G.add(port);
    const sign=sbCanvas(512,96,(x,w,h)=>{x.fillStyle='#1d1812';x.fillRect(0,0,w,h);x.fillStyle='#e8c878';x.font='600 54px Fraunces,Georgia,serif';x.textAlign='center';x.textBaseline='middle';x.fillText('PORTE DU ROY',w/2,h/2+3)});
    const sg=new THREE.Mesh(new THREE.PlaneGeometry(7,1.3),std({map:sign,roughness:.7,emissive:0x40301a,emissiveMap:sign}));sg.position.set(gx,12.2,gz+3.06);G.add(sg);
    for(const s of[-1,1]){const l=glowSprite(0xffb050,4,.8);l.position.set(gx+s*5,6.4,gz+3.6);G.add(l);MT.anim.push(dt=>{l.material.opacity=.7+Math.sin(MT.t*7+s)*.1})}}
  /* the village climbs the south and east faces; the north and west are rock and woods */
  {const rAt=y=>{const P_=MT.rockProf;for(let i=1;i<P_.length;i++)if(y<=P_[i][1]){const a=P_[i-1],b=P_[i],k=(y-a[1])/(b[1]-a[1]);return a[0]+(b[0]-a[0])*k}return 0};
    let seed=7;const rnd=()=>{seed=(seed*16807)%2147483647;return seed/2147483647};let hi=0;
    const busy=(x,z)=>{const q=mtPolar(x,z);return mtInPath(x,z,8)||mtInSq(x,z,9)||mtInGate(x,z,8)||(q.t>1.45&&q.t<1.95&&q.r>28&&q.r<46)};
    for(const y of [4,9,14,19,25,31]){const r=rAt(y)+.5;for(let a=-1.05;a<=2.25;a+=(6.5+rnd()*3)/r){const sx=MTC.x+Math.sin(a)*r,sz=MTC.z+Math.cos(a)*r;if(busy(sx,sz)||rnd()<.12)continue;
      const w=4.6+rnd()*2.6,d=4.4+rnd()*1.4;let gmin=1e9,gmax=-1e9;for(const u of[-1,1])for(const v of[-1,1]){const px=sx+Math.cos(a)*u*w/2+Math.sin(a)*v*d/2,pz=sz-Math.sin(a)*u*w/2+Math.cos(a)*v*d/2;const g=mtRockY(mtPolar(px,pz).r);gmin=Math.min(gmin,g);gmax=Math.max(gmax,g)}
      mtHouse(G,{x:sx,z:sz,a,w,d,yb:gmin-1,yf:gmax+.1,n:2+(rnd()<.35?1:0),mi:hi++,ou:((rnd()*3)|0)/3,ch:rnd()<.4,rh:2+rnd()*1.2})}}
    /* woods */
    const N=420,leaf=new THREE.InstancedMesh(new THREE.IcosahedronGeometry(1,1),std({color:0xffffff,roughness:.9,flatShading:true}),N);const tr=new THREE.InstancedMesh(new THREE.CylinderGeometry(.18,.26,2.4,6),std({color:0x2a2018,roughness:.9}),140);
    const dm=new THREE.Object3D(),col=new THREE.Color();let n=0,m=0;
    for(let i=0;i<220&&n<N-3;i++){const a=2.35+rnd()*(2*Math.PI-3.5),y=4+rnd()*34,r=rAt(y)+rnd()*1.5;const x=MTC.x+Math.sin(a)*r,z=MTC.z+Math.cos(a)*r,gy=mtRockY(mtPolar(x,z).r);if(gy<1)continue;
      const s0=1.4+rnd()*1.6;if(m<140){dm.position.set(x,gy+1,z);dm.rotation.set(0,0,0);dm.scale.set(1,1,1);dm.updateMatrix();tr.setMatrixAt(m++,dm.matrix)}
      for(let k=0;k<3;k++){dm.position.set(x+(rnd()-.5)*s0,gy+2.2+k*s0*.55+rnd()*.5,z+(rnd()-.5)*s0);dm.rotation.set(rnd()*3,rnd()*3,0);const sc=s0*(1-k*.22);dm.scale.set(sc,sc*.9,sc);dm.updateMatrix();leaf.setMatrixAt(n,dm.matrix);col.setHSL(.24+rnd()*.08,.35+rnd()*.2,.16+rnd()*.1);leaf.setColorAt(n,col);n++}}
    for(let i=0;i<70&&n<N-3;i++){const a=-1+rnd()*3.2,y=31+rnd()*17,r=rAt(y)+rnd();const x=MTC.x+Math.sin(a)*r,z=MTC.z+Math.cos(a)*r;if(busy(x,z))continue;const gy=mtRockY(mtPolar(x,z).r);const s0=1+rnd()*1.2;
      if(m<140){dm.position.set(x,gy+1,z);dm.rotation.set(0,0,0);dm.scale.set(.8,.8,.8);dm.updateMatrix();tr.setMatrixAt(m++,dm.matrix)}for(let k=0;k<2;k++){dm.position.set(x+(rnd()-.5)*s0,gy+1.9+k*s0*.6,z+(rnd()-.5)*s0);dm.rotation.set(rnd()*3,rnd()*3,0);dm.scale.setScalar(s0*(1-k*.25));dm.updateMatrix();leaf.setMatrixAt(n,dm.matrix);col.setHSL(.25+rnd()*.06,.3+rnd()*.2,.15+rnd()*.08);leaf.setColorAt(n,col);n++}}
    leaf.count=n;tr.count=m;leaf.castShadow=true;G.add(leaf);G.add(tr);
    /* granite outcrops breaking up the dome */
    const T2=mtTex();const rt=T2.rock.clone();rt.needsUpdate=true;const ob=new THREE.InstancedMesh(new THREE.DodecahedronGeometry(1,0),std({map:rt,color:0x7a7266,roughness:.95,flatShading:true}),240);let o=0;
    for(let i=0;i<500&&o<240;i++){const a=rnd()*Math.PI*2,y=14+rnd()*52,r=rAt(y);const x=MTC.x+Math.sin(a)*r,z=MTC.z+Math.cos(a)*r;if(busy(x,z))continue;const q=mtPolar(x,z);if(q.t>-1.05&&q.t<2.25&&y<33)continue;
      const gy=mtRockY(q.r);dm.position.set(x,gy-.3,z);dm.rotation.set(rnd()*.6,a,rnd()*.6);const sc=1.6+rnd()*3.4;dm.scale.set(sc*(1+rnd()),sc*(.45+rnd()*.5),sc);dm.updateMatrix();ob.setMatrixAt(o++,dm.matrix)}ob.count=o;ob.castShadow=ob.receiveShadow=true;G.add(ob)}
  /* the abbey: Merveille walls, nave, tower, spire and the golden archangel, floodlit */
  {const ab=mtM(T.granite,8,8,{color:0xd8c6a2,roughness:.85,emissive:0x5a3c14,emissiveIntensity:.55});const roof=mtM(T.slate,4,4,{color:0x4a525e,roughness:.5,emissive:0x0a0c10});const A=new THREE.Group();A.position.set(MTC.x,0,MTC.z-6);G.add(A);
    const add=(w,h,d,x,y,z,m)=>{const b=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),m||ab);b.position.set(x,y,z);b.castShadow=true;A.add(b);if(w>3&&d>3)mtSol(MTC.x+x-w/2,MTC.x+x+w/2,MTC.z-6+z-d/2,MTC.z-6+z+d/2,y-h/2,y+h/2+(y>75?4:0));return b};
    add(46,34,22,0,52,-14);add(30,26,16,-8,56,3);add(18,22,16,20,58,4);add(12,30,12,-26,50,-4);
    for(let i=-2;i<=2;i++){add(2.2,30,3,i*9,53,-25.5);}
    const nave=add(40,16,13,0,79,0);const nr=new THREE.Mesh(mtPrism(),roof);nr.scale.set(13.6,7,40.6);nr.rotation.y=Math.PI/2;nr.position.set(0,87,0);A.add(nr);
    add(12,14,24,-8,79,0);const tr=new THREE.Mesh(mtPrism(),roof);tr.scale.set(12.6,6,24.6);tr.position.set(-8,86,0);A.add(tr);
    for(let i=-3;i<=3;i++)for(const s of[-1,1]){const bt=add(1.6,12,3.2,i*5.6,77,s*7.6);bt.rotation.x=s*.18}
    const tw=add(10,18,10,-8,95,0);const sp=new THREE.Mesh(new THREE.CylinderGeometry(.35,6.4,40,4),roof);sp.rotation.y=Math.PI/4;sp.position.set(-8,124,0);A.add(sp);
    for(const s of[-1,1])for(const q of[-1,1]){const pn=new THREE.Mesh(new THREE.CylinderGeometry(.1,.9,8,4),roof);pn.position.set(-8+s*4.6,108,q*4.6);A.add(pn)}
    /* lit windows */
    const win=new THREE.MeshBasicMaterial({color:0xffc070});for(let i=-3;i<=3;i++)for(const s of[-1,1]){const wq=new THREE.Mesh(new THREE.PlaneGeometry(1.6,5),win);wq.position.set(i*5.6,81,s*6.55);wq.rotation.y=s>0?0:Math.PI;A.add(wq)}
    for(let i=-2;i<=2;i++){const wq=new THREE.Mesh(new THREE.PlaneGeometry(1.4,4),win);wq.position.set(i*8+4,55,-25.1);wq.rotation.y=Math.PI;A.add(wq)}
    /* Saint Michael: gold, wings up, sword raised */
    const gold=std({color:0xffd060,metalness:1,roughness:.22,emissive:0x8a5a10,emissiveIntensity:.9});const sm=new THREE.Group();sm.position.set(-8,144.6,0);A.add(sm);
    const bd=new THREE.Mesh(new THREE.CylinderGeometry(.22,.38,2.2,10),gold);bd.position.y=1.1;sm.add(bd);const hd=new THREE.Mesh(new THREE.SphereGeometry(.24,10,8),gold);hd.position.y=2.45;sm.add(hd);
    for(const s of[-1,1]){const wg=new THREE.Mesh(new THREE.ConeGeometry(.35,2,4),gold);wg.position.set(s*.45,2.3,-.2);wg.rotation.z=-s*.35;sm.add(wg)}const sw=new THREE.Mesh(new THREE.BoxGeometry(.08,2.2,.08),gold);sw.position.set(.35,3.2,.1);sw.rotation.z=-.2;sm.add(sw);
    const gl=glowSprite(0xffd890,10,.7);gl.position.y=2;sm.add(gl);MT.angel=sm;
    const halo=glowSprite(0xffb860,120,.22,false);halo.position.set(0,70,-4);A.add(halo);MT.halo=halo}
  /* the stake path across the flats, puddles, quicksand */
  {const wood=std({color:0x2a2018,roughness:.9});let seed=3;const rnd=()=>{seed=(seed*16807)%2147483647;return seed/2147483647};
    for(let z=455;z>60;z-=9){const x=MTC.x+Math.sin(z*.012)*26*(z-60)/400;for(const s of[-1,1]){const h=1.6+rnd()*1.2;const p=new THREE.Mesh(new THREE.CylinderGeometry(.09,.13,h,6),wood);p.position.set(x+s*3.4,mtSand(x,z)+h/2-.2,z);p.rotation.z=(rnd()-.5)*.2;G.add(p)}MT.stakes.push({x,z})}
    const qm=std({color:0x2a2a24,roughness:.05,metalness:.3,transparent:true,opacity:.85});for(let i=0;i<16;i++){const zz=90+i*22+rnd()*10;const path=MT.stakes.reduce((b,s)=>Math.abs(s.z-zz)<Math.abs(b.z-zz)?s:b,MT.stakes[0]);const side=rnd()<.5?-1:1;const x=path.x+side*(9+rnd()*28),r=3+rnd()*4.5;
      const m=new THREE.Mesh(new THREE.CircleGeometry(r,28),qm);m.rotation.x=-Math.PI/2;m.position.set(x,mtSand(x,zz)+.03,zz);G.add(m);MT.qs.push({x,z:zz,r,m})}
    const pm=std({color:0x0e1418,roughness:.02,metalness:.8,transparent:true,opacity:.6,envMapIntensity:2.2});for(let i=0;i<60;i++){const x=MTC.x+(rnd()-.5)*420,z=60+rnd()*420;const m=new THREE.Mesh(new THREE.CircleGeometry(1.5+rnd()*5,20),pm);m.scale.y=.5+rnd()*.5;m.rotation.x=-Math.PI/2;m.rotation.z=rnd()*3;m.position.set(x,mtSand(x,z)+.02,z);G.add(m)}
    const mist=new THREE.SpriteMaterial({map:glowTex,color:0x9aa8c8,transparent:true,opacity:.07,depthWrite:false});for(let i=0;i<70;i++){const sp=new THREE.Sprite(mist);sp.scale.set(rnd()*50+40,rnd()*6+5,1);sp.position.set(MTC.x+(rnd()-.5)*460,2.2,40+rnd()*440);G.add(sp)}
    for(let a=-1.8;a<=1.8;a+=.22){const l=glowSprite(0xffb860,rnd()*10+14,.28);l.position.set(MTC.x+Math.sin(a)*(MTR+3),3,MTC.z+Math.cos(a)*(MTR+3));G.add(l)}
    /* far shore: a line of lights in the fog */
    for(let i=0;i<40;i++){const l=glowSprite(0xffc880,rnd()*3+2,.5);l.position.set(MTC.x+(rnd()-.5)*900,1.5,640+rnd()*40);G.add(l)}}
  /* the Grande Rue */
  mtBuildStreet(G);
  for(let i=0;i<4;i++){const L=new THREE.PointLight(0xffb060,0,22,1.8);scene.add(L);MT.L.push(L)}}
function mtBuildStreet(G){const T=mtTex();const prism=mtPrism();const roofM=mtM(T.slate,2,2,{color:0x6a7080,roughness:.55});const hm=T.h.map(h=>{const t=h.t.clone();t.needsUpdate=true;const e=h.em.clone();e.needsUpdate=true;return std({map:t,emissive:0xffffff,emissiveMap:e,emissiveIntensity:.85,roughness:.85})});
  const cob=mtM(T.cobble,1,1,{color:0x9a8a78,roughness:.75,side:THREE.DoubleSide});cob.map.repeat.set(1,1);const rockW=mtM(T.rock,1,1,{color:0x7a7064,roughness:.95,side:THREE.DoubleSide});const gr=mtM(T.granite,6,4,{color:0xa89c86,roughness:.85});
  /* the cobbled street, flat across, climbing along its length */
  const N=160,Q=sbQuads(),W1=sbQuads(),W2=sbQuads(),w=MTPA.w;let dist=0,prev=null;const pts=[];
  for(let i=0;i<=N;i++){const t=MTPA.t0-.035+(MTPA.t1+.035-MTPA.t0)*i/N,r=mtPR(t),y=mtPY(t);const c=mtPolarP(t,r,y);if(prev)dist+=c.distanceTo(prev);prev=c;pts.push({t,r,y,d:dist})}
  for(let i=0;i<N;i++){const A=pts[i],B=pts[i+1];const ai=mtPolarP(A.t,A.r-w,A.y+.04),ao=mtPolarP(A.t,A.r+w,A.y+.04),bi=mtPolarP(B.t,B.r-w,B.y+.04),bo=mtPolarP(B.t,B.r+w,B.y+.04);
    Q.add(ai,ao,bo,bi,V3(0,1,0),v=>{const q=mtPolar(v.x,v.z);return[(q.r-A.r+w)/2.2,(A.d+(v.distanceTo(ai)<.01||v.distanceTo(ao)<.01?0:B.d-A.d))/2.2]});
    /* uphill: the rock wall the street is cut into; downhill: the retaining wall */
    const yi0=mtRockY(A.r-w)+1.2,yi1=mtRockY(B.r-w)+1.2;W1.add(V3(ai.x,A.y-.2,ai.z),V3(bi.x,B.y-.2,bi.z),V3(bi.x,Math.max(B.y,yi1),bi.z),V3(ai.x,Math.max(A.y,yi0),ai.z),V3(-Math.sin(A.t),0,-Math.cos(A.t)),v=>[(i%2)*.0+v.distanceTo(ai)/4,v.y/4]);
    const yo0=mtRockY(A.r+w)-.6,yo1=mtRockY(B.r+w)-.6;W2.add(V3(ao.x,Math.min(yo0,A.y),ao.z),V3(bo.x,Math.min(yo1,B.y),bo.z),V3(bo.x,B.y+.7,bo.z),V3(ao.x,A.y+.7,ao.z),V3(Math.sin(A.t),0,Math.cos(A.t)),v=>[v.distanceTo(ao)/4,v.y/4])}
  const st=Q.mesh(cob);st.material.map.repeat.set(1,1);st.receiveShadow=true;G.add(st);G.add(W1.mesh(rockW));G.add(W2.mesh(gr));
  /* the gate courtyard ramp */
  {const q=sbQuads(),z0=MTC.z+87.5,z1=MTC.z+79.4;q.add(V3(MTC.x-4.6,mtGateY(z0)+.03,z0),V3(MTC.x+4.6,mtGateY(z0)+.03,z0),V3(MTC.x+4.6,mtGateY(z1)+.03,z1),V3(MTC.x-4.6,mtGateY(z1)+.03,z1),V3(0,1,0),v=>[v.x/2.2,v.z/2.2]);G.add(q.mesh(cob));
    for(const sx of[-1,1]){const wq=sbQuads();const x=MTC.x+sx*4.6;wq.add(V3(x,-1,z0),V3(x,-1,z1),V3(x,mtRockY(Math.hypot(sx*4.6,z1-MTC.z))+1.5,z1),V3(x,10.5,z0),V3(-sx,0,0),v=>[v.z/4,v.y/4]);G.add(wq.mesh(gr))}}
  /* narrow houses shoulder to shoulder, gables to the street, shops on the ground floor; each one starts at the street, stone base below */
  const signs=['Crêperie','La Mère Poulard','Souvenirs','Hôtel du Guesclin','Biscuiterie','Le Mouton Blanc','Tisanes','Musée Grévin','Auberge','Chapelle','Galettes','Cidre'];let si=0;const M=mtHouseMats();
  const lantern=(p)=>{const l=glowSprite(0xffb050,2.4,.85);l.position.copy(p);G.add(l);const lb=new THREE.Mesh(new THREE.BoxGeometry(.28,.42,.28),new THREE.MeshBasicMaterial({color:0xffd080}));lb.position.copy(p);G.add(lb);const cp=new THREE.Mesh(new THREE.ConeGeometry(.28,.22,4),std({color:0x101010,metalness:.7}));cp.position.copy(p).add(V3(0,.32,0));cp.rotation.y=Math.PI/4;G.add(cp)};
  for(const side of[-1,1]){let t=.055;while(t<MTPA.t1-.02){const rp=mtPR(t),w0=4.4+((si*5+(side>0?1:0))%3)*.9,dep=6.4,ha=w0/2/rp,tc=t+ha;if(tc+ha>MTPA.t1+.012)break;const rc=rp+side*(w+dep/2+.05);
      if(rc+dep/2>82.6){t+=.03;continue}
      const yUp=mtPY(tc+ha),yDn=mtPY(tc-ha),yf=yUp-.12,yb=side<0?yDn-.6:Math.min(yDn-.6,mtRockY(rc+dep/2)-1.2);const c=mtPolarP(tc,rc,0);
      const n=2+((si*7+side*3)%3===0?1:0)+(si%5===0?1:0);const g=mtHouse(G,{x:c.x,z:c.z,a:tc,w:w0-.1,d:dep,yb,yf,n,mi:si+(side>0?3:0),ou:(si%3)/3,ch:si%3===0,rh:2.2+(si%2)*.7});
      const fz=-side*(dep/2+.03),rot=side<0?0:Math.PI;
      if(si%4!==3){const sh=new THREE.Mesh(new THREE.PlaneGeometry(Math.min(3,w0-1),2.1),M.shop[si%4]);sh.position.set(0,yf+1.15,fz);sh.rotation.y=rot;g.add(sh);
        const aw=new THREE.Mesh(new THREE.BoxGeometry(Math.min(3.4,w0-.6),.06,1.3),M.awn[(si+side+2)%4]);aw.position.set(0,yf+2.55,-side*(dep/2+.6));aw.rotation.x=side<0?.38:-.38;g.add(aw)}
      else{const dr=new THREE.Mesh(new THREE.PlaneGeometry(1.3,2.3),std({color:0x3a2416,roughness:.6}));dr.position.set(0,yf+1.15,fz);dr.rotation.y=rot;g.add(dr)}
      if(si%2===0){const txt=signs[(si>>1)%signs.length];const cv=sbCanvas(256,64,(x2,W2_,H2)=>{x2.fillStyle='#2a1c12';x2.fillRect(0,0,W2_,H2);x2.strokeStyle='#d8b060';x2.lineWidth=4;x2.strokeRect(4,4,W2_-8,H2-8);x2.fillStyle='#f0d898';x2.font='600 30px Fraunces,Georgia,serif';x2.textAlign='center';x2.textBaseline='middle';x2.fillText(txt,W2_/2,H2/2+2)});
        const sm=std({map:cv,emissive:0x3a2a14,emissiveMap:cv});const st=tc+side*0*1+(ha*.7)*(side<0?1:1),sp=mtPolarP(tc+ha*.75,rp+side*(w-.75),yf+3.5);for(const fl of[0,Math.PI]){const sg=new THREE.Mesh(new THREE.PlaneGeometry(1.9,.48),sm);sg.position.copy(sp);sg.rotation.y=tc+Math.PI/2+fl;G.add(sg)}const br=new THREE.Mesh(new THREE.BoxGeometry(.06,.06,1.5),std({color:0x101010,metalness:.7}));br.position.copy(mtPolarP(tc+ha*.75,rp+side*(w-.75),yf+3.8));br.rotation.y=tc;G.add(br)}
      else lantern(mtPolarP(tc+ha*.8,rp+side*(w-.3),yf+3.3));
      si++;t+=w0/rp}}
  /* bunting strung across the street */
  {const cols=[0xd83a3a,0xf0e0b0,0x2a5ab0,0xe0a020,0x3a8a4a];for(let t=.2;t<MTPA.t1-.05;t+=.17){const rp=mtPR(t),y=mtPY(t)+6.3,a=mtPolarP(t,rp-w+.1,y),b=mtPolarP(t,rp+w-.1,y);const pos=[],cl=[];const nF=9;
    for(let i=0;i<nF;i++){const k0=i/nF,k1=(i+.8)/nF,sag=k=>-Math.sin(k*Math.PI)*.9;const p0=a.clone().lerp(b,k0),p1=a.clone().lerp(b,k1);p0.y+=sag(k0);p1.y+=sag(k1);const pm=p0.clone().lerp(p1,.5);pm.y-=.55;pos.push(p0.x,p0.y,p0.z,p1.x,p1.y,p1.z,pm.x,pm.y,pm.z);const c=new THREE.Color(cols[(i+Math.round(t*10))%5]);for(let k=0;k<3;k++)cl.push(c.r,c.g,c.b)}
    const gg=new THREE.BufferGeometry();gg.setAttribute('position',new THREE.Float32BufferAttribute(pos,3));gg.setAttribute('color',new THREE.Float32BufferAttribute(cl,3));G.add(new THREE.Mesh(gg,new THREE.MeshBasicMaterial({vertexColors:true,side:THREE.DoubleSide})));
    const lp=[];for(let i=0;i<=12;i++){const k=i/12,p=a.clone().lerp(b,k);p.y-=Math.sin(k*Math.PI)*.9;lp.push(p)}G.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(lp),new THREE.LineBasicMaterial({color:0x201810})))}}
  /* a signpost where the street begins */
  {const t=.012,rp=mtPR(t),sp=mtPolarP(t,rp-w+.45,mtPY(t));const g=new THREE.Group();g.position.copy(sp);g.rotation.y=t;G.add(g);const wd=std({color:0x3a2416,roughness:.8});sbBox(g,.16,3.4,.16,0,1.7,0,wd);
    const mk=(txt,y,sz)=>{const cv=sbCanvas(512,96,(x,W_,H)=>{x.fillStyle='#2a1a10';x.beginPath();x.moveTo(0,8);x.lineTo(W_-60,8);x.lineTo(W_-6,H/2);x.lineTo(W_-60,H-8);x.lineTo(0,H-8);x.fill();x.strokeStyle='#d8b060';x.lineWidth=4;x.stroke();x.fillStyle='#f4dc9a';x.font=`600 ${sz}px Fraunces,Georgia,serif`;x.textBaseline='middle';x.fillText(txt,22,H/2+2)});
      const m=std({map:cv,emissive:0x40301a,emissiveMap:cv});const b=new THREE.Mesh(new THREE.PlaneGeometry(2.6,.5),m);b.position.set(1.2,y,.09);g.add(b);const b2=new THREE.Mesh(new THREE.PlaneGeometry(2.6,.5),m);b2.position.set(1.2,y,-.09);b2.rotation.y=Math.PI;b2.scale.x=-1;g.add(b2)};
    mk('GRANDE RUE',3,46);mk('ÉGLISE SAINT-PIERRE',2.4,36);mk('ABBAYE',1.8,46);lantern(V3(sp.x,sp.y+3.6,sp.z))}
  /* the square at the top of the street */
  {const q=sbQuads();const n=24;for(let i=0;i<n;i++){const t0=1.42+(1.98-1.42)*i/n,t1=1.42+(1.98-1.42)*(i+1)/n;q.add(mtPolarP(t0,42.5,MTSQY+.04),mtPolarP(t0,53,MTSQY+.04),mtPolarP(t1,53,MTSQY+.04),mtPolarP(t1,42.5,MTSQY+.04),V3(0,1,0),v=>[v.x/2.2,v.z/2.2])}G.add(q.mesh(cob));
    const rw=sbQuads();for(let i=0;i<n;i++){const t0=1.42+(1.98-1.42)*i/n,t1=1.42+(1.98-1.42)*(i+1)/n;rw.add(mtPolarP(t0,53,mtRockY(53)-1),mtPolarP(t1,53,mtRockY(53)-1),mtPolarP(t1,53,MTSQY+.8),mtPolarP(t0,53,MTSQY+.8),V3(Math.sin(t0),0,Math.cos(t0)),v=>[v.distanceTo(mtPolarP(1.42,53))/3,v.y/3])}G.add(rw.mesh(gr));
    const rw2=sbQuads();for(let i=0;i<n;i++){const t0=1.42+(1.98-1.42)*i/n,t1=1.42+(1.98-1.42)*(i+1)/n;rw2.add(mtPolarP(t0,42.5,MTSQY-.2),mtPolarP(t1,42.5,MTSQY-.2),mtPolarP(t1,42.5,mtRockY(42.5)+.8),mtPolarP(t0,42.5,mtRockY(42.5)+.8),V3(Math.sin(t0),0,Math.cos(t0)),v=>[v.distanceTo(mtPolarP(1.42,42.5))/3,v.y/3])}G.add(rw2.mesh(rockW));
    const radW=(t,r0,r1,yb,yt,m)=>{const e=sbQuads();e.add(mtPolarP(t,r0,yb(r0)),mtPolarP(t,r1,yb(r1)),mtPolarP(t,r1,yt(r1)),mtPolarP(t,r0,yt(r0)),V3(Math.cos(t),0,-Math.sin(t)),v=>[v.x/3+v.z/3,v.y/3]);G.add(e.mesh(m))};
    radW(1.98,42.5,53,()=>MTSQY-1,r=>Math.max(MTSQY+.8,mtRockY(r)+1),rockW);radW(1.42,42.5,47.5-MTPA.w,()=>MTSQY-.2,r=>mtRockY(r)+1,rockW);radW(1.42,47.5+MTPA.w,53,r=>mtRockY(r)-1,()=>MTSQY+.8,gr);
    {const e=mtPolarP(1.99,47.75);mtSolO(e.x,e.z,1.99,.5,5.4,MTSQY-3,MTSQY+12)}
    for(let i=0;i<5;i++){const t=1.47+i*.12;const l=glowSprite(0xffc070,2.6,.9);l.position.copy(mtPolarP(t,52.3,MTSQY+3.4));G.add(l);const pole=new THREE.Mesh(new THREE.CylinderGeometry(.06,.09,3.4,6),std({color:0x101010,metalness:.7}));pole.position.copy(mtPolarP(t,52.3,MTSQY+1.7));G.add(pole)}}
  /* the church of Saint-Pierre: its door faces the square */
  {const C=new THREE.Group();const cp=mtPolarP(MTCH.t,MTCH.r,MTSQY);C.position.copy(cp);C.rotation.y=MTCH.t;G.add(C);const W_=13,D=12,H=15;
    const body=new THREE.Mesh(new THREE.BoxGeometry(W_,H+8,D),gr);body.position.y=(H-8)/2;C.add(body);const roof=new THREE.Mesh(prism,mtM(T.slate,3,3,{color:0x4a525e}));roof.scale.set(W_+.6,5,D+.6);roof.rotation.y=Math.PI/2;roof.position.y=H;C.add(roof);
    const tw=new THREE.Mesh(new THREE.BoxGeometry(4.2,9,4.2),gr);tw.position.set(-W_/2+2.4,H+4.5,D/2-2.4);C.add(tw);const spire=new THREE.Mesh(new THREE.CylinderGeometry(.1,3.2,10,4),mtM(T.slate,2,2,{color:0x4a525e}));spire.rotation.y=Math.PI/4;spire.position.set(-W_/2+2.4,H+14,D/2-2.4);C.add(spire);
    const door=new THREE.Mesh(new THREE.PlaneGeometry(2.6,4.2),std({color:0x3a2414,roughness:.6,emissive:0x2a1408}));door.position.set(0,2.1,D/2+.03);C.add(door);MT.door=door;
    const dar=new THREE.Mesh(new THREE.TorusGeometry(1.4,.22,6,16,Math.PI),gr);dar.position.set(0,4.2,D/2+.06);C.add(dar);const rose=new THREE.Mesh(new THREE.CircleGeometry(1.5,20),new THREE.MeshBasicMaterial({map:T.glass}));rose.position.set(0,8.4,D/2+.04);C.add(rose);
    const cl=glowSprite(0xffd090,3,.9);cl.position.set(0,5.4,D/2+.6);C.add(cl);mtSolO(cp.x,cp.z,MTCH.t,W_/2,D/2,MTSQY-8,MTSQY+H+2);MT.doorP=mtPolarP(MTCH.t,MTCH.r+D/2+1.6,MTSQY)}
  /* the Grand Degré: an arched passage into the rock, up to the abbey, closed by an iron gate */
  {const t=1.93,ag=new THREE.Group();ag.position.copy(mtPolarP(t,42.45,MTSQY));ag.rotation.y=t;G.add(ag);const stn=mtM(T.granite,2,2,{color:0xb0a48e,roughness:.8});
    for(const sx of[-1,1]){const pl=new THREE.Mesh(new THREE.BoxGeometry(.9,4.2,.9),stn);pl.position.set(sx*2,2.1,.2);ag.add(pl)}const ar=new THREE.Mesh(new THREE.TorusGeometry(2,.42,6,18,Math.PI),stn);ar.position.set(0,4.2,.2);ag.add(ar);
    const dk=new THREE.Mesh(new THREE.PlaneGeometry(3.2,5.6),new THREE.MeshBasicMaterial({color:0x050404}));dk.position.set(0,2.8,.06);ag.add(dk);
    for(let i=-6;i<=6;i++){const b=new THREE.Mesh(new THREE.BoxGeometry(.1,4.6,.1),std({color:0x101010,metalness:.7,roughness:.4}));b.position.set(i*.26,2.3,.5);ag.add(b)}
    const lt=glowSprite(0xffb050,2.4,.9);lt.position.set(2.9,3.6,.7);ag.add(lt);const lt2=glowSprite(0xffb050,2.4,.9);lt2.position.set(-2.9,3.6,.7);ag.add(lt2)}
  /* a beacon over the next place you need to be */
  {const g=new THREE.Group();g.userData.mtK=1;const col=new THREE.Mesh(new THREE.CylinderGeometry(.6,.6,60,10,1,true),new THREE.MeshBasicMaterial({color:0xffd890,transparent:true,opacity:.16,blending:THREE.AdditiveBlending,depthWrite:false,side:THREE.DoubleSide}));col.position.y=30;g.add(col);g.add(gsAt0(0xffd890,8,.6,0,1.2,0));G.add(g);MT.beacon=g}}
function gsAt0(c,s1,o,x,y,z){const g=glowSprite(c,s1,o);g.position.set(x,y,z);return g}

/* ---------- inside Saint-Pierre ---------- */
function mtBuildEgl(){const G=MT.egl=new THREE.Group();MT.g.add(G);const T=mtTex(),X=MTE.x;const gr=mtM(T.granite,6,3,{color:0x8a7e6a,roughness:.9,side:THREE.BackSide});
  const room=new THREE.Mesh(new THREE.BoxGeometry(14,11,32),gr);room.position.set(X,5.5,0);G.add(room);
  const fl=new THREE.Mesh(new THREE.PlaneGeometry(14,32),mtM(T.cobble,4,9,{color:0x7a6e5e,roughness:.6}));fl.rotation.x=-Math.PI/2;fl.position.set(X,.01,0);G.add(fl);
  const wood=std({color:0x3a2416,roughness:.7});for(let z=-4;z<12;z+=2.4)for(const s of[-1,1]){sbBox(G,4.2,.9,.5,X+s*3.4,.45,z,wood);sbBox(G,4.2,.1,.9,X+s*3.4,.55,z+.4,wood);mtCol('egl',X+s*3.4-2.1,X+s*3.4+2.1,z-.3,z+.9,2)}
  for(const s of[-1,1])for(let z=-10;z<=10;z+=6.6){const gl=new THREE.Mesh(new THREE.PlaneGeometry(1.8,4),new THREE.MeshBasicMaterial({map:T.glass}));gl.position.set(X-s*6.98,5.2,z);gl.rotation.y=s*Math.PI/2;G.add(gl);
    const sh=glowSprite([0x4070ff,0xff4060,0xffc040][Math.abs(z|0)%3],4,.25);sh.position.set(X-s*5.5,3,z);G.add(sh)}
  /* altar, candles */
  sbBox(G,4,1.2,1.6,X,.6,-13.4,mtM(T.granite,2,1,{color:0xd8ccb0}));const cross=new THREE.Group();const gd=std({color:0xffd060,metalness:1,roughness:.3,emissive:0x6a4410});cross.add(new THREE.Mesh(new THREE.BoxGeometry(.12,1.2,.12),gd));const cb=new THREE.Mesh(new THREE.BoxGeometry(.7,.12,.12),gd);cb.position.y=.2;cross.add(cb);cross.position.set(X,2,-13.6);G.add(cross);
  MT.cand=[];for(let i=0;i<14;i++){const a=i/14,x=X+(a-.5)*5,z=-12.2+Math.sin(a*9)*.3;const c=new THREE.Mesh(new THREE.CylinderGeometry(.05,.05,.3+Math.random()*.25,6),std({color:0xf4ecd8}));c.position.set(x,1.35,z);G.add(c);const f=glowSprite(0xffb050,.5,.95);f.position.set(x,1.6,z);G.add(f);MT.cand.push(f)}
  /* the register, on its lectern */
  const lec=new THREE.Group();lec.position.set(X+3.6,0,-6.6);lec.rotation.y=-.5;G.add(lec);sbBox(lec,.4,1.1,.4,0,.55,0,wood);sbBox(lec,1.2,.08,.9,0,1.16,0,wood).rotation.x=-.3;
  const bk=new THREE.Group();bk.position.set(0,1.26,0);bk.rotation.x=-.3;lec.add(bk);for(const s of[-1,1]){const pg=new THREE.Mesh(new THREE.PlaneGeometry(.52,.72),std({map:T.page,roughness:.9,side:THREE.DoubleSide}));pg.rotation.x=-Math.PI/2;pg.rotation.z=s*.06;pg.position.set(s*.27,.02,0);bk.add(pg)}
  const cov=new THREE.Mesh(new THREE.BoxGeometry(1.12,.04,.78),std({color:0x4a1a12,roughness:.6}));bk.add(cov);MT.book=bk;MT.lec=lec;
  const bglow=glowSprite(0xffd8a0,1.6,.5);bglow.position.set(0,1.6,0);lec.add(bglow);MT.bglow=bglow;
  /* the crypt door: east wall */
  const dr=new THREE.Mesh(new THREE.PlaneGeometry(2,3.4),std({color:0x1a120c,roughness:.7,emissive:0x000000}));dr.position.set(X+6.97,1.7,-10.5);dr.rotation.y=-Math.PI/2;G.add(dr);MT.cdoor=dr;
  const cg=glowSprite(0x60ffd0,3.2,0);cg.position.set(X+6.4,1.7,-10.5);G.add(cg);MT.cglow=cg;
  {const fr=mtM(T.granite,1,2,{color:0xc8bca4});sbBox(G,.4,3.8,.4,X+6.8,1.9,-11.7,fr);sbBox(G,.4,3.8,.4,X+6.8,1.9,-9.3,fr);sbBox(G,.4,.45,2.8,X+6.8,3.9,-10.5,fr);
    const lab=sbCanvas(256,64,(x,w,h)=>{x.fillStyle='#1a140e';x.fillRect(0,0,w,h);x.fillStyle='#e0c890';x.font='600 34px Fraunces,Georgia,serif';x.textAlign='center';x.textBaseline='middle';x.fillText('CRYPTE',w/2,h/2+2)});
    const lb=new THREE.Mesh(new THREE.PlaneGeometry(1.6,.4),std({map:lab,emissive:0x2a2010,emissiveMap:lab}));lb.position.set(X+6.55,4.45,-10.5);lb.rotation.y=-Math.PI/2;G.add(lb);
    const bm=new THREE.Group();const col=new THREE.Mesh(new THREE.CylinderGeometry(.45,.45,7,10,1,true),new THREE.MeshBasicMaterial({color:0xffd890,transparent:true,opacity:.14,blending:THREE.AdditiveBlending,depthWrite:false,side:THREE.DoubleSide}));col.position.y=3.5;bm.add(col);
    const ring=new THREE.Mesh(new THREE.RingGeometry(.55,.85,28),new THREE.MeshBasicMaterial({color:0xffd890,transparent:true,opacity:.5,blending:THREE.AdditiveBlending,depthWrite:false}));ring.rotation.x=-Math.PI/2;ring.position.y=.04;bm.add(ring);G.add(bm);MT.eBeam=bm}
  const ent=new THREE.Mesh(new THREE.PlaneGeometry(2.6,4),std({color:0x3a2414,roughness:.6}));ent.position.set(X,2,15.97);ent.rotation.y=Math.PI;G.add(ent)}

/* ---------- Notre-Dame-sous-Terre: the flooded crypt ---------- */
function mtBuildCrypt(){const G=MT.crypt=new THREE.Group();MT.g.add(G);const T=mtTex(),X=MTK.x,Z=MTK.z;const st=mtM(T.granite,10,3,{color:0x6e665a,roughness:.9});
  for(const [r,h] of [[20,0],[12.5,.6],[8.5,1.2]]){const d=new THREE.Mesh(new THREE.CylinderGeometry(r,r,1,64),st);d.position.set(X,h-.5,Z);d.receiveShadow=true;G.add(d);
    const rim=new THREE.Mesh(new THREE.TorusGeometry(r,.12,6,64),mtM(T.granite,20,1,{color:0x9a8e78}));rim.rotation.x=Math.PI/2;rim.position.set(X,h,Z);G.add(rim)}
  const wall=new THREE.Mesh(new THREE.CylinderGeometry(20.5,20.5,9,64,1,true),mtM(T.granite,22,3,{color:0x5e574c,roughness:.95,side:THREE.BackSide}));wall.position.set(X,4.5,Z);G.add(wall);
  const dome=new THREE.Mesh(new THREE.SphereGeometry(20.5,48,16,0,TAU,0,Math.PI/2),mtM(T.granite,22,6,{color:0x4e4840,roughness:.95,side:THREE.BackSide}));dome.scale.y=.32;dome.position.set(X,9,Z);G.add(dome);
  /* the stair you came down */
  for(let i=0;i<6;i++)sbBox(G,4.6,.4,1.2,X,.2+i*.4,Z+20+i*1.1,st);mtCol('crypt',X-2.6,X-2.3,Z+19,Z+27,9);mtCol('crypt',X+2.3,X+2.6,Z+19,Z+27,9);
  /* romanesque pillars with ribs */
  MT.pil=[];for(let i=0;i<8;i++){const a=i/8*TAU+.2,x=X+Math.sin(a)*16,z=Z+Math.cos(a)*16;if(Math.abs(a-TAU)<.4||a<.4)continue;const p=new THREE.Mesh(new THREE.CylinderGeometry(1.15,1.3,9,16),st);p.position.set(x,4.5,z);p.castShadow=true;G.add(p);MT.circ.crypt.push({x,z,r:1.5});
    const cap=new THREE.Mesh(new THREE.BoxGeometry(3,.6,3),st);cap.position.set(x,8.8,z);G.add(cap);const rib=new THREE.Mesh(new THREE.TorusGeometry(8,.35,6,24,Math.PI*.5),st);rib.position.set(X+Math.sin(a)*8,8.8,Z+Math.cos(a)*8);rib.rotation.y=a+Math.PI/2;rib.rotation.z=Math.PI*.25;rib.scale.set(1,.55,1);G.add(rib);
    const tc=glowSprite(0xff9a40,2.4,.9);tc.position.set(X+Math.sin(a)*14.6,4,Z+Math.cos(a)*14.6);G.add(tc);MT.pil.push(tc)}
  /* runes on the dais */
  const rn=decal(runeTex,0x40ffc8,15,true,.25);rn.rotation.x=-Math.PI/2;rn.position.set(X,1.23,Z);G.add(rn);MT.rune=rn;
  /* the water: rises each phase */
  const w=new THREE.Mesh(new THREE.CircleGeometry(20.4,64),std({color:0x0a2a2c,roughness:.05,metalness:.6,transparent:true,opacity:.82,normalMap:waterN,envMapIntensity:2,emissive:0x02120e}));w.rotation.x=-Math.PI/2;w.position.set(X,MT.cwl,Z);G.add(w);MT.cw=w;
  const wg=glowSprite(0x30ffc0,40,.0);wg.position.set(X,.5,Z);G.add(wg);MT.cwg=wg}

/* ---------- enter / leave ---------- */
function mtWorld(){if(MT.g)return;MT.g=new THREE.Group();MT.g.visible=false;scene.add(MT.g);mtBuildOut();mtBuildEgl();mtBuildCrypt();try{castAll(MT.out)}catch(x){}}
function mtKeep(o){return o===SKY||o.isLight||o===moonLight.target||o===W.g||o===camera||(o.isPoints&&o.frustumCulled===false)||o===MT.g||(LYR.a&&o===LYR.a.g)||(KFW.a&&o===KFW.a.g)||(typeof reticle!=='undefined'&&o===reticle)||(o.userData&&(o.userData.sbP||o.userData.mtK))||(typeof MW!=='undefined'&&MW.a&&o===MW.a.g)}
function mtEnter(where){mtWorld();if(CH2.zone==='latin')sbLeave();if(CH2.zone==='north')nzLeaveQuiet();if(CH2.zone==='paris'){CH2.parisWB={x0:WB.x0,x1:WB.x1,z0:WB.z0,z1:WB.z1};MT.hid=scene.children.filter(o=>o.visible&&!mtKeep(o));for(const o of MT.hid)o.visible=false}
  for(const e of enemies)if(!e.dead)removeEnemy(e);for(const p of eProjs)scene.remove(p.s);eProjs.length=0;bossRef=null;$('boss').classList.add('hidden');
  CH2.zone='mont';MT.g.visible=true;MT.boot=1;LYR.home=false;if(LYR.mk)LYR.mk.visible=false;if(!MT.fog0)MT.fog0={c:scene.fog.color.clone(),d:scene.fog.density};MT.dawn0=dawnK;setDawn(0);
  mtArea(where||'out');CH2.obj=mtObj;ch2Save()}
function mtArea(a,at){MT.area=a;MT.out.visible=a==='out';MT.egl.visible=a==='egl';MT.crypt.visible=a==='crypt';for(let i=boxes.length-1;i>=0;i--)if(boxes[i].mt)boxes.splice(i,1);for(const b of MT.boxes[a])boxes.push(b);
  Object.assign(WB,MTW[a]);let p,face=Math.PI;
  if(at)p=at;else if(a==='out')p=CH2.st>=31?V3(MTC.x,0,40):V3(MTC.x+2,0,448);else if(a==='egl')p=V3(MTE.x,0,12.5);else p=V3(MTK.x,0,18);
  if(a==='egl'&&at&&at.z<0)face=-Math.PI/2;if(a==='out'&&at)face=MTCH.t;
  p.y=groundAt(p.x,p.z);P.pos.copy(p);P.vy=0;P.flying=false;P.glide=false;P.face=face;yaw=face+Math.PI;SPAWN.copy(p);if(typeof NZ!=='undefined')NZ.cp.copy(p);
  const f=V3(Math.sin(face),0,Math.cos(face)),r=V3(f.z,0,-f.x);camera.position.set(p.x-f.x*9,p.y+4,p.z-f.z*9);
  const k=p.clone().addScaledVector(r,1.6).addScaledVector(f,-1.2),l=p.clone().addScaledVector(r,-1.6).addScaledVector(f,-1.2);
  if(KFW.a){KFW.a.g.position.set(k.x,groundAt(k.x,k.z),k.z);KFW.a.g.visible=true}if(LYR.a){LYR.a.g.position.set(l.x,groundAt(l.x,l.z),l.z);LYR.a.g.visible=true}else lyraPlace(l.x,l.z,face);
  if(a==='out'&&CH2.st===30&&!MT.s.tideOn)MT.wl=-2.4;MT.sea.position.y=MT.wl;
  try{drawWorldMap()}catch(x){}}
function mtLeave(){if(CH2.zone!=='mont')return;x5Hint('');MTI.cur=null;for(let i=boxes.length-1;i>=0;i--)if(boxes[i].mt)boxes.splice(i,1);MT.g.visible=false;for(const o of MT.hid)o.visible=true;MT.hid=[];
  CH2.zone='paris';MT.area=null;Object.assign(WB,CH2.parisWB||{x0:-430,x1:430,z0:-330,z1:300});if(MT.fog0){scene.fog.color.copy(MT.fog0.c);scene.fog.density=MT.fog0.d}setDawn(MT.dawn0||0);for(const L of MT.L)L.intensity=0;
  sxStop('mtTide',.5);KFW.pin=0;LYR.pin=0;try{mtBossClear()}catch(x){}try{drawWorldMap()}catch(x){}}
function mtGo(a,at){if(CS.active)return;x5White(.45,.35,()=>{mtArea(a,at)});sx('pubdoor',.7,null,{rate:.8})}

/* ---------- interactions ---------- */
const MTI={cur:null};
const mtNear=(x,z,r)=>Math.hypot(P.pos.x-x,P.pos.z-z)<r;
function mtInterTick(){if(CS.active||!P.alive||MT.fight){if(MTI.cur){MTI.cur=null;x5Hint('')}return}const st=CH2.st;let pick=null;const add=(x,z,r,label,fn)=>{if(!pick&&mtNear(x,z,r))pick={label,fn}};
  if(MT.area==='out'){if(st>=31&&MT.doorP)add(MT.doorP.x,MT.doorP.z,3.6,'ENTER SAINT-PIERRE',()=>mtGo('egl'))}
  else if(MT.area==='egl'){add(MTE.x,14.6,2.6,'BACK OUT TO THE GRANDE RUE',()=>mtGo('out',MT.doorP.clone()));if(st===31&&!MT.s.read)add(MTE.x+3.3,-6,2.8,'READ THE PARISH REGISTER',mtRegister);if(st>=32)add(MTE.x+6.2,-10.5,3,'GO DOWN TO THE CRYPT',()=>mtGo('crypt'))}
  else if(MT.area==='crypt'){if(P.pos.z>22)add(MTK.x,24.5,2.6,'BACK UP TO THE CHURCH',()=>mtGo('egl',V3(MTE.x+5.2,0,-10.5)))}
  const lab=pick?sbKey()+' · '+pick.label:'';if(!pick){if(MTI.cur){MTI.cur=null;x5Hint('')}return}if(MTI.cur!==pick.label){MTI.cur=pick.label;x5Hint(lab,()=>{MTI.cur=null;x5Hint('');pick.fn()})}else X5.hintFn=()=>{MTI.cur=null;x5Hint('');pick.fn()}}

/* ---------- objectives ---------- */
function mtObj(){if(CH2.zone!=='mont')return null;const st=CH2.st,d=(x,z)=>Math.round(Math.hypot(P.pos.x-x,P.pos.z-z))+'m';
  if(st===30)return MT.area==='out'?`Cross the flats to <b>the King's Gate</b> before the tide · ${d(MTC.x,MTC.z+MTR)}`:null;
  if(st===31)return MT.area==='out'?`Climb the Grande Rue to <b>Saint-Pierre</b> · ${MT.doorP?d(MT.doorP.x,MT.doorP.z):''}`:MT.area==='egl'?'Find <b>the parish register</b>':null;
  if(st===32)return MT.area==='crypt'?(MT.fight?'Break <b>the Drowned Bell</b> · your echoes fight with you':'Face <b>the Drowned Bell</b>'):(MT.area==='egl'?`Go down to <b>the crypt</b> · glowing door right of the altar · ${Math.round(Math.hypot(P.pos.x-MTE.x-6,P.pos.z+10.5))} m`:'Go down to <b>the crypt</b> · inside Saint-Pierre');
  return null}

/* ---------- staging + lines ---------- */
const MTK_=()=>KFW.a?KFW.a.g.position:P.pos,MTL_=()=>LYR.a?LYR.a.g.position:P.pos;
function mtStage(c,face,kd,ld){const f=V3(Math.sin(face),0,Math.cos(face)),r=V3(f.z,0,-f.x);P.pos.set(c.x,groundAt(c.x,c.z),c.z);P.vy=0;P.flying=false;P.face=face;yaw=face+Math.PI;KFW.pin=1;LYR.pin=1;
  if(!KFW.a&&typeof kfBuild==='function')try{kfBuild()}catch(x){}if(KFW.a){const k=c.clone().addScaledVector(f,kd?kd[0]:1.8).addScaledVector(r,kd?kd[1]:1.6);KFW.a.g.position.set(k.x,groundAt(k.x,k.z),k.z);KFW.a.g.visible=true;x4Face(KFW.a,P.pos)}
  if(!LYR.a)lyraPlace(c.x,c.z,face);if(LYR.a){const l=c.clone().addScaledVector(f,ld?ld[0]:1.8).addScaledVector(r,ld?ld[1]:-1.6);LYR.a.g.position.set(l.x,groundAt(l.x,l.z),l.z);LYR.a.g.visible=true;LYR.home=false;x4Face(LYR.a,P.pos)}if(LYF.g)LYF.g.g.visible=false}
function mtLine(key,o){const who=XL8W[key];return Object.assign({who,text:XL8[key],fov:36,cam:who==='@'?sbTC(()=>P.pos,MTL_,2.3,.6):who==='Kaen'?sbTC(MTK_,()=>P.pos):who==='Lyra'?sbTC(MTL_,()=>P.pos):sbTC(()=>P.pos,MTK_,2.6,.8),onStart:()=>x4Talk(who==='@'||who==='Kaen'||who==='Lyra'?who:'')},o||{})}
function mtEnd(){x4Talk('');P.heroAnim=null;KFW.pin=0;LYR.pin=0}

/* ---------- the door from the Sorbonne ---------- */
function mtIntro(){if(CS.active||MT.s.intro)return;MT.s.intro=1;x5Hint('');const c=P.pos.clone(),f0=P.face;mtStage(c,f0,[2.2,1.3],[2.2,-1.3]);let portal=null;const pp=c.clone().addScaledVector(V3(Math.sin(f0),0,Math.cos(f0)),5.2);
  playCutscene([mtLine('ms_01',{onStart:()=>{x4Talk('Lyra');sx('book',.6,null,{rate:.85})}}),mtLine('ms_02'),mtLine('ms_03'),
    mtLine('ms_04',{onStart:()=>{x4Talk('Lyra');try{portal=sbPortalMake(pp,f0+Math.PI,{a:0x9ad8ff,b:0x2a5a8a,r:0xc8ecff,c1:0x4a9aff,c2:0xd8f4ff,g:0x9ad8ff,sc:1.3});scene.add(portal);portal.userData.open(1)}catch(x){}sx('portal',.9,null,{rate:.8});flash(headOf(pp,2),0x9ad8ff,12)}}),
    {dur:2.4,fov:46,cut:true,cam:k=>({pos:headOf(c,2.2).addScaledVector(V3(Math.sin(f0),0,Math.cos(f0)),-4.5-k*1.5),look:headOf(pp,1.8)}),onStart:()=>{x4Talk('');sx('wind',.5,null,{rate:.7});P.heroAnim='Walk_Loop'}}],
    ()=>{mtEnd();if(portal)scene.remove(portal);x5White(.5,.6,()=>{CH2.st=30;MT.s={intro:1};mtEnter('out');ch2Save();writeSave();after(.4,mtArrive)})})}
/* ---------- arrival on the flats ---------- */
function mtArrive(){if(CS.active)return;const c=V3(MTC.x+2,0,448);mtStage(c,Math.PI,[1.2,1.8],[1.2,-1.8]);const top=V3(MTC.x,60,MTC.z);
  sxLoop('mtTide','tide',.42);
  playCutscene([{dur:6,fov:40,cut:true,title:'Mont-Saint-Michel',cam:k=>({pos:V3(MTC.x-60+k*30,3+k*9,520-k*40),look:V3(MTC.x,40+k*10,MTC.z)}),onStart:()=>{P.heroAnim='Idle_Loop';sx('wind',.4,null,{rate:.6})}},
    {dur:3.2,fov:30,cut:true,cam:k=>({pos:V3(MTC.x+6,148-k*3,MTC.z+28-k*4),look:V3(MTC.x-8,145,MTC.z-6)}),onStart:()=>sx('chan',.3,null,{rate:.6})},
    mtLine('ms_05',{fov:40,cam:k=>({pos:headOf(c,1.5).add(V3(-1.2,0,-2.6)),look:headOf(c,1.6)})}),mtLine('ms_06'),mtLine('ms_07')],
    ()=>{mtEnd();MT.s.tideOn=1;toast('Follow the stakes. Stay off the shiny sand. The tide is coming in behind you.','Chapter XVIII: The Tide Door',true)})}

/* ---------- the drowned pilgrims who rise out of the puddles ---------- */
function buildPilgrim(){const m=buildWraith(.52,false);m.g.traverse(o=>{if(o.isMesh&&o.material){const c=o.material.clone();if(c.emissive)c.emissive.setHex(0x0a3a34);if(c.color&&c.map)c.color.setHex(0x9affe8);o.material=c}});const gl=glowSprite(0x40ffd0,2.2,.25);gl.position.y=1.2;m.g.add(gl);return m}
ETYPES.mpil={name:'Drowned pilgrim',hp:210,speed:8.5,dmg:17,range:2.3,cd:1.5,xp:90,r:.6,h:2,build:buildPilgrim};
function mtWave(n){const f=V3(0,0,-1);for(let i=0;i<n;i++)after(i*.35,()=>{if(CH2.zone!=='mont'||MT.area!=='out')return;const a=(i/n-.5)*2.4,d=rand(12,20);const p=V3(P.pos.x+Math.sin(a)*d*1.1,0,P.pos.z+f.z*d*Math.cos(a)*.9-4);p.x=clamp(p.x,MTW.out.x0+5,MTW.out.x1-5);
  const e=spawnEnemy('mpil',p);e.aggro=true;const h=headOf(e.pos,.2);SM.emit(h,{n:14,c0:0x2a4a48,c1:0x041010,s0:.8,s1:2.4,life:1.4,a:.6,up:2});SP.emit(h,{n:20,c0:0xc8fff0,c1:0x20806a,speed:5,up:4,grav:9,life:.8,s0:.4,s1:.05});sx('squelch',.5,null,{rate:rand(.7,.9)})})}

/* ---------- the register ---------- */
function mtRegister(){if(CS.active)return;MT.s.read=1;const lp=MT.lec.getWorldPosition(V3());const face=Math.atan2(lp.x-(MTE.x+2.3),lp.z-(-5.4));const c=V3(MTE.x+2.3,0,-5.4);mtStage(c,face,[-.4,2],[-.2,-1.7]);x4Face(LYR.a,lp);
  const book=MT.book,bp=book.getWorldPosition(V3());let lull=null;
  const ov=k=>({pos:headOf(c,1.75).add(V3(.25,.2,.55)),look:bp.clone().add(V3(0,0,-.05))});
  playCutscene([{dur:2.4,fov:42,cut:true,cam:k=>({pos:headOf(c,2.1).add(V3(-2.6+k*.8,.4,2.4-k*.6)),look:headOf(lp,1.1)}),onStart:()=>{sx('book',.7,null,{rate:.75});P.heroAnim='Idle_Loop'}},
    mtLine('ms_14',{fov:30,cam:ov}),mtLine('ms_15'),
    {dur:2.2,fov:28,cut:true,cam:ov,onStart:()=>{x4Talk('');sx('book',.9,null,{rate:1.1});const T=mtTex();const pg=book.children[1];if(pg){pg.material=pg.material.clone();pg.material.map=T.torn}SP.emit(bp,{n:24,c0:0x2a1a10,c1:0x000000,speed:1.2,up:1,life:1.4,s0:.2,s1:.05});P.shake=.25}},
    mtLine('ms_16',{onStart:()=>{x4Talk('@');P.heroAnim='Idle_Talking_Loop'}}),mtLine('ms_17'),
    mtLine('ms_18',{fov:34,onStart:()=>{x4Talk('Lyra');try{LYR.a.setBase('Spell_Simple_Idle_Loop',.4)}catch(x){}const L=LYR.a.g.position;LYR.a.g.position.lerp(lp,.35);x4Face(LYR.a,lp)}}),
    /* she touches the burnt edge: the lullaby floods in */
    {dur:5.2,fov:40,cut:true,cam:k=>({pos:headOf(MTL_(),1.5).add(V3(1.6-k*.6,.2,1.2+k*.5)),look:headOf(MTL_(),1.45)}),onStart:()=>{x4Talk('');MT.lw=1;lull=sx('lullaby',.95,null,{wet:.6,duck:5});MU.vd=1;
        flash(headOf(bp,.3),0xfff0d0,18);x5Impact(120,0);SP.emit(bp,{n:60,c0:0xffffff,c1:0xffd890,speed:3,up:2,life:2.2,s0:.4,s1:.04});for(let i=0;i<6;i++)after(i*.7,()=>{flash(headOf(bp,.5),0xffe0b0,6+i);SP.emit(headOf(MTL_(),1.5),{n:18,c0:0xfff4e0,c1:0xff90b0,speed:1.6,life:1.4,s0:.3,s1:.03})})},
      update:(dt,k)=>{renderer.domElement.style.filter=`sepia(${.6*Math.sin(k*Math.PI)}) brightness(${1+.35*Math.sin(k*Math.PI)})`;if(k>.82&&!MT.faint){MT.faint=1;try{LYR.a.once('Death01',1.4)}catch(x){}sx('heart',.6)}}},
    mtLine('ms_19',{fov:38,cam:sbTC(()=>P.pos,MTL_,2.4,.7),onStart:()=>{renderer.domElement.style.filter='';MT.lw=0;x4Talk('@');P.heroAnim='Idle_Talking_Loop'}}),
    mtLine('ms_20',{onStart:()=>{x4Talk('Kaen');if(KFW.a){const L=MTL_();KFW.a.g.position.set(L.x+.9,0,L.z+.5);x4Face(KFW.a,L);try{KFW.a.setBase('Crouch_Idle_Loop',.3)}catch(x){}}}}),
    {dur:3.2,fov:42,cut:true,cam:k=>({pos:V3(MTE.x+.5,1+k*.4,-1.5),look:V3(MTE.x+4,.4,-7)}),onStart:()=>{sx('toll',.85,null,{rate:.85,wet:.6});P.shake=.6;flash(V3(MTE.x+6,0,-10.5),0x60ffd0,10);MT.cglow.material.opacity=.8;MT.cdoor.material.emissive.setHex(0x0a3a30);for(const f of MT.cand)f.material.color.setHex(0x80ffd8)}},
    mtLine('ms_21',{fov:32,cam:k=>({pos:headOf(MTL_(),.6).add(V3(-1.1,.3,1.4)),look:headOf(MTL_(),.35)}),onStart:()=>{x4Talk('')}}),
    mtLine('ms_22',{onStart:()=>{x4Talk('@');P.face=Math.atan2(MTE.x+7-P.pos.x,-10.5-P.pos.z)}})],
    ()=>{mtEnd();renderer.domElement.style.filter='';MU.vd=0;CH2.st=32;ch2Save();writeSave();try{LYR.a.setBase('Idle_Loop',.6)}catch(x){}try{KFW.a.setBase('Idle_Loop',.4)}catch(x){}for(const f of MT.cand)f.material.color.setHex(0xffb050);
      toast('Lyra is back on her feet, barely. The crypt door is open: the glowing door on the right of the altar.','Saint-Pierre',true)})}

/* ---------- per frame ---------- */
const MTF={out:{c:0x1c2234,d:.0019},egl:{c:0x120d08,d:.02},crypt:{c:0x061210,d:.024}};
{const _mt=muTick;muTick=function(dt){_mt(dt);if(!mtX())return;dt=Math.min(dt,.05);
  if(CH2.zone==='latin'&&CH2.st===29&&!CS.active&&!MT.s.intro){MT.w29=(MT.w29||0)+dt;if(MT.w29>5)mtIntro()}else MT.w29=0;
  if(CH2.zone==='paris'&&CH2.st>=30&&CH2.st<=33&&!MT.boot&&!CS.active){MT.boot=1;if(CH2.st===33)CH2.st=32;mtEnter(CH2.st>=32?'crypt':'out')}
  if(CH2.zone!=='mont'||!MT.g)return;MT.t+=dt;for(let i=MT.anim.length-1;i>=0;i--)if(MT.anim[i](dt)===false)MT.anim.splice(i,1);
  const F=MTF[MT.area]||MTF.out;scene.fog.color.lerp(new THREE.Color(F.c),Math.min(1,dt*3));scene.fog.density+=(F.d-scene.fog.density)*Math.min(1,dt*3);
  if(P.flying&&MT.area!=='out'){P.flying=false;P.vy=Math.min(P.vy||0,0);if(!MT.flyMsg){MT.flyMsg=1;toast('No room for the broom under these vaults.','The Mont',false)}}
  /* lights follow the action */
  const Ls=MT.L;if(MT.area==='out'){const q=mtPolar(P.pos.x,P.pos.z),onSt=q.r<84;Ls[0].position.set(P.pos.x,P.pos.y+5,P.pos.z);Ls[0].intensity=onSt?1.1:0;const dp=MT.doorP||V3(MTC.x,0,MTC.z);Ls[1].position.set(dp.x,dp.y+5,dp.z);Ls[1].intensity=onSt?1.5:0;Ls[2].position.set(MTC.x,7,MTC.z+MTR+5);Ls[2].intensity=1.2;Ls[3].intensity=0;
    if(MT.beacon){const bt=CH2.st===30?V3(MTC.x,0,MTC.z+MTR+7):CH2.st===31&&MT.doorP?MT.doorP:null;MT.beacon.visible=!!bt&&!CS.active;if(bt){MT.beacon.position.set(bt.x,groundAt(bt.x,bt.z),bt.z);const dd=Math.hypot(P.pos.x-bt.x,P.pos.z-bt.z);MT.beacon.children[0].material.opacity=(.1+Math.sin(MT.t*2.4)*.04)*Math.min(1,dd/14)}}}
  else if(MT.area==='egl'){if(MT.eBeam){const t=CH2.st===31&&!MT.s.read?V3(MTE.x+3.3,0,-6):CH2.st>=32&&CH2.st<=33?V3(MTE.x+5.6,0,-10.5):null;MT.eBeam.visible=!!t&&!CS.active;if(t){MT.eBeam.position.copy(t);const k=.5+Math.sin(MT.t*3)*.5;MT.eBeam.children[0].material.opacity=.08+k*.08;MT.eBeam.children[1].scale.setScalar(1+k*.25)}}
    if(CH2.st>=32&&!CS.active){MT.cglow.material.opacity=.55+Math.sin(MT.t*2.2)*.2;MT.cdoor.material.emissive.setHex(0x0a3a30)}
    Ls[0].position.set(MTE.x,2.4,-12);Ls[0].intensity=1.6+Math.sin(MT.t*9)*.15;Ls[1].position.set(MTE.x+3.4,2.6,-6.6);Ls[1].intensity=1;Ls[2].position.set(MTE.x,4,6);Ls[2].intensity=.7;Ls[3].position.set(MTE.x+6,1.8,-10.5);Ls[3].intensity=CH2.st>=32?1.2:0;Ls[3].color.setHex(0x60ffd0);for(const f of MT.cand)f.scale.setScalar(.45+Math.random()*.12)}
  else if(MT.area==='crypt'){for(let i=0;i<3;i++){const a=MT.t*.2+i*2.1;Ls[i].position.set(MTK.x+Math.sin(a)*12,5,MTK.z+Math.cos(a)*12);Ls[i].intensity=1.1;Ls[i].color.setHex(0xff9a50)}Ls[3].position.set(MTK.x+3,9.5,MTK.z+4);Ls[3].intensity=2.2;Ls[3].color.setHex(0x40ffc8);for(const f of MT.pil)f.scale.setScalar(2.2+Math.random()*.4)}
  if(MT.angel)MT.angel.rotation.y+=dt*.05;
  /* the tide */
  if(MT.area==='out'){if(MT.s.tideOn&&CH2.st===30&&!CS.active)MT.wl=Math.min(.25,MT.wl+.0092*dt);MT.sea.position.y=MT.wl;if(waterN){}
    const g=groundAt(P.pos.x,P.pos.z),dep=MT.wl-g;const out=Math.hypot(P.pos.x-MTC.x,P.pos.z-MTC.z)>MTR;
    if(out&&dep>.12&&P.pos.y<MT.wl+.4&&P.alive&&!CS.active){P.chilled=Math.max(P.chilled,.25);MT.tdT=(MT.tdT||0)-dt;if(MT.tdT<=0){MT.tdT=.5;damagePlayer(maxHP()*.018*(dep>.5?2:1))}if(Math.random()<.5)SP.emit(V3(P.pos.x+rand(-.6,.6),MT.wl+.05,P.pos.z+rand(-.6,.6)),{c0:0xd8f4ff,c1:0x3a7a90,s0:.3,s1:.05,life:.5,speed:2,up:2,grav:6});if(!MT.s.tideMsg){MT.s.tideMsg=1;toast('The tide is in! Get to the Mont!','The flats',false)}}
    for(const q of MT.qs){if(Math.hypot(P.pos.x-q.x,P.pos.z-q.z)<q.r&&P.alive&&!CS.active&&P.pos.y<.4){P.webbed=Math.max(P.webbed,.12);MT.sqT=(MT.sqT||0)-dt;if(MT.sqT<=0){MT.sqT=.9;sx('squelch',.55,null,{rate:rand(.85,1.1)});SM.emit(V3(P.pos.x,P.pos.y+.1,P.pos.z),{n:4,c0:0x3a3428,c1:0x100c08,s0:.4,s1:1,life:.8,a:.5})}if(!MT.s.qsMsg){MT.s.qsMsg=1;msSay('ms_11',1);toast('Quicksand. Jump and keep moving to pull free.','The flats',false)}}}
    if(CH2.st===30&&!CS.active){const z=P.pos.z,S=MT.s;
      if(z<392&&!S.b1){S.b1=1;msSay('ms_08')}
      if(z<330&&!S.w1){S.w1=1;mtWave(3)}
      if(z<235&&!S.w2){S.w2=1;sx('toll',.5,null,{rate:.7,wet:.8});P.shake=.3;msSay('ms_09',1);after(3.5,()=>msSay('ms_10'));mtWave(4)}
      if(z<140&&!S.w3){S.w3=1;sx('toll',.65,null,{rate:.7,wet:.8});P.shake=.4;mtWave(5)}
      if(Math.hypot(P.pos.x-MTC.x,P.pos.z-MTC.z)<MTR-1.2&&P.pos.x<9300){CH2.st=31;ch2Save();writeSave();for(const e of enemies)if(!e.dead&&e.type==='mpil')removeEnemy(e);msSay('ms_12',1);sxStop('mtTide',3);try{gainXP(800)}catch(x){}x5Banner('THE KING\'S GATE','THE TIDE CLOSES BEHIND YOU','#9ad8ff',2.4,'#08121a')}}
    if(CH2.st===31&&mtPolar(P.pos.x,P.pos.z).t>.35&&mtPolar(P.pos.x,P.pos.z).r<82&&!MT.s.b13){MT.s.b13=1;msSay('ms_13')}}
  else if(MT.area==='crypt'){MT.cwl+=(MT.cwlT-MT.cwl)*Math.min(1,dt*.8);MT.cw.position.y=MT.cwl;MT.rune.rotation.z+=dt*.15;MT.rune.material.opacity=.2+Math.sin(MT.t*2)*.08;
    if(CH2.st===32&&!MT.s.cin&&!CS.active&&P.pos.z<17){MT.s.cin=1;mtCryptReveal()}}
  mtInterTick()}}

/* ---------- waypoint meter: a marker on the target with the distance, pinned to the screen edge when it is off screen ---------- */
const WPT={el:null,src:[]};
function wptUI(){if(WPT.el)return WPT.el;const st=document.createElement('style');st.textContent=`
#wpt{position:fixed;left:0;top:0;z-index:30;pointer-events:none;opacity:0;transition:opacity .3s;will-change:transform}
#wpt.on{opacity:1}#wpt .w{position:absolute;left:0;top:0;transform:translate(-50%,-100%);display:flex;flex-direction:column;align-items:center;gap:3px;white-space:nowrap}
#wpt .l{font:600 10.5px Inter,system-ui,sans-serif;letter-spacing:.12em;text-transform:uppercase;color:#ffe9b8;text-shadow:0 1px 3px #000,0 0 8px rgba(0,0,0,.9)}
#wpt .d{font:700 17px Inter,system-ui,sans-serif;color:#fff3d0;text-shadow:0 1px 3px #000,0 0 10px rgba(0,0,0,.9);font-variant-numeric:tabular-nums}
#wpt .k{width:16px;height:16px;margin-top:2px;border:2px solid #ffd36a;background:rgba(255,196,70,.4);transform:rotate(45deg);box-shadow:0 0 12px rgba(255,200,80,.9);animation:wptp 1.4s ease-in-out infinite}
@keyframes wptp{50%{box-shadow:0 0 22px rgba(255,220,120,1);background:rgba(255,210,100,.7)}}
#wpt .a{position:absolute;left:0;top:0;width:0;height:0;border-top:11px solid transparent;border-bottom:11px solid transparent;border-left:18px solid #ffd36a;filter:drop-shadow(0 0 6px rgba(255,190,60,.9));display:none}
#wpt.off .a{display:block}`;document.head.appendChild(st);
  const d=document.createElement('div');d.id='wpt';d.innerHTML='<div class="a"></div><div class="w"><div class="l"></div><div class="d"></div><div class="k"></div></div>';document.body.appendChild(d);WPT.el=d;WPT.w=d.querySelector('.w');WPT.a=d.querySelector('.a');WPT.l=d.querySelector('.l');WPT.d=d.querySelector('.d');return d}
const _wv=V3();
function wptTick(){let T=null;if(started&&MODE!=='open'&&!CS.active&&P.alive&&!document.body.classList.contains('plOn'))for(const f of WPT.src){try{T=f()}catch(x){T=null}if(T)break}
  const el=wptUI();if(!T){el.classList.remove('on');return}const dist=Math.hypot(T.p.x-P.pos.x,T.p.z-P.pos.z,(T.p.y-P.pos.y)*.5);if(dist<2.6){el.classList.remove('on');return}
  el.classList.add('on');if(WPT.l.textContent!==T.l)WPT.l.textContent=T.l;const ds=dist<1000?Math.round(dist)+' m':(dist/1000).toFixed(1)+' km';if(WPT.d.textContent!==ds)WPT.d.textContent=ds;
  const W=innerWidth,H=innerHeight;_wv.set(T.p.x,T.p.y+2.2,T.p.z).project(camera);let x=(_wv.x+1)/2*W,y=(1-_wv.y)/2*H;const behind=_wv.z>1;const m=70,top=90,bot=150;
  let off=behind||x<m||x>W-m||y<top||y>H-bot;if(off){let dx=(behind?-1:1)*(x-W/2),dy=(behind?-1:1)*(y-H/2);if(behind&&Math.abs(dy)<1)dy=1;const kx=(W/2-m)/Math.max(1e-3,Math.abs(dx)),ky=((dy<0?H/2-top:H/2-bot))/Math.max(1e-3,Math.abs(dy)),k=Math.min(kx,ky);x=W/2+dx*k;y=H/2+dy*k;
    const ang=Math.atan2(dy,dx);WPT.a.style.transform=`translate(${Math.cos(ang)*34-9}px,${Math.sin(ang)*34-11}px) rotate(${ang}rad)`;WPT.w.style.transform=`translate(-50%,-50%)`}else WPT.w.style.transform='';
  el.classList.toggle('off',off);el.style.transform=`translate(${x.toFixed(1)}px,${y.toFixed(1)}px)`}
{const _mt=muTick;muTick=function(dt){_mt(dt);try{wptTick()}catch(x){}}}
WPT.src.push(()=>{if(CH2.zone!=='mont'||!MT.area)return null;const st=CH2.st;
  if(MT.area==='out'){if(st===30)return{p:V3(MTC.x,1,MTC.z+MTR+3),l:"The King's Gate"};if((st===31||st===32)&&MT.doorP)return{p:V3(MT.doorP.x,MTSQY+1,MT.doorP.z),l:'Saint-Pierre'}}
  if(MT.area==='egl'){if(st===31&&!MT.s.read)return{p:V3(MTE.x+3.6,1.2,-6.6),l:'Parish register'};if(st===32)return{p:V3(MTE.x+6.5,1.4,-10.5),l:'The crypt'}}
  if(MT.area==='crypt'&&st===32&&!MT.fight&&!MT.s.cin)return{p:V3(MTK.x,0,15),l:'The bell'};return null});
/* golden motes drift up the street ahead of you, toward the church */
function mtRoute(){if(MT._rp)return MT._rp;const a=[V3(MTC.x,0,MTC.z+118),V3(MTC.x,0,MTC.z+87)];for(let t=0;t<=MTPA.t1+.001;t+=.02)a.push(mtPolarP(t,mtPR(t)));a.push(mtPolarP(MTCH.t-.05,47.5));a.push(MT.doorP.clone());
  for(const p of a)p.y=mtGround(p.x,p.z)+1;const L=[0];for(let i=1;i<a.length;i++)L.push(L[i-1]+a[i].distanceTo(a[i-1]));MT._rp={a,L};return MT._rp}
function mtRouteAt(R_,s){const L=R_.L,a=R_.a;if(s<=0)return a[0].clone();for(let i=1;i<L.length;i++)if(L[i]>=s){const k=(s-L[i-1])/(L[i]-L[i-1]||1);return a[i-1].clone().lerp(a[i],k)}return a[a.length-1].clone()}
function mtMotes(dt){if(!MT.motes){MT.motes=[];for(let i=0;i<12;i++){const s=glowSprite(0xffd890,1.1,0);s.userData.mtK=1;MT.out.add(s);MT.motes.push(s)}}
  const on=MT.area==='out'&&(CH2.st===31||CH2.st===32)&&!CS.active&&MT.doorP;let s0=-1,dmin=1e9;if(on){const R_=mtRoute();for(let i=0;i<R_.a.length;i++){const p=R_.a[i],d=Math.hypot(p.x-P.pos.x,p.z-P.pos.z)+Math.max(0,P.pos.y-p.y-4)*.5;if(d<dmin){dmin=d;s0=R_.L[i]}}}
  const show=on&&dmin<18,R_=on?mtRoute():null,tot=R_?R_.L[R_.L.length-1]:0,ph=(MT.t*2.2)%3.2;
  for(let i=0;i<MT.motes.length;i++){const m=MT.motes[i];if(!show){m.material.opacity=Math.max(0,m.material.opacity-dt*2);continue}const s=s0+2+i*3.2+ph;if(s>tot){m.material.opacity=0;continue}const p=mtRouteAt(R_,s);p.y+=Math.sin(MT.t*3+i)*.18;m.position.copy(p);
    const fade=Math.min(1,(i*3.2+ph)/3)*(1-i/MT.motes.length);m.material.opacity+=(.75*fade-m.material.opacity)*Math.min(1,dt*4);m.scale.setScalar(.9+Math.sin(MT.t*5+i)*.15)}}
{const _mt=muTick;muTick=function(dt){_mt(dt);if(mtX()&&CH2.zone==='mont'&&MT.out)try{mtMotes(Math.min(dt,.05))}catch(x){}}}

/* ---------- world plumbing ---------- */
{const _bl=blockedAt;blockedAt=function(x,z,y){if(MODE!=='open'&&CH2.zone==='mont'&&MT.area==='out'&&mtIn(x)&&x<9300){if(mtBlocked(x,z,y))return true;
    if(!P.flying){const g1=mtGround(x,z,y),st=Math.hypot(x-P.pos.x,z-P.pos.z);if(st>1e-4&&g1>y-.05){const g0=mtGround(P.pos.x,P.pos.z,y),ux=(x-P.pos.x)/st,uz=(z-P.pos.z)/st,ga=mtGround(P.pos.x+ux*.9,P.pos.z+uz*.9,y);if(ga-g0>.95)return true}}return false}return _bl.apply(this,arguments)}}
/* steep rock: you slide off it instead of standing on it */
{const _up=updatePlayer;updatePlayer=function(dt){const r=_up.apply(this,arguments);if(MODE!=='open'&&CH2.zone==='mont'&&MT.area==='out'&&P.alive&&!CS.active&&!P.flying&&P.onGround&&P.pos.x<9300){
    const x=P.pos.x,z=P.pos.z,g=mtGround(x,z,P.pos.y),b=mtBaseY(x,z);if(g<=b+.05&&!mtInPath(x,z)&&!mtInSq(x,z)&&!mtInGate(x,z)){const e=.6,gx=(mtBaseY(x+e,z)-mtBaseY(x-e,z))/(2*e),gz=(mtBaseY(x,z+e)-mtBaseY(x,z-e))/(2*e),sl=Math.hypot(gx,gz);
      if(sl>1.05){const k=Math.min(1,(sl-1.05)*2)*9*dt;const nx=x-gx/sl*k,nz=z-gz/sl*k;if(!mtBlocked(nx,nz,P.pos.y-2)){P.pos.x=nx;P.pos.z=nz;P.pos.y=Math.max(mtGround(nx,nz,P.pos.y),P.pos.y-k*sl)}}}}return r}}
/* the camera does not go inside houses or the rock */
{const _cb=camBlocked;camBlocked=function(x,y,z){if(MODE!=='open'&&CH2.zone==='mont'&&MT.area==='out'&&x>8500&&x<9300){if(y<mtBaseY(x,z)+.6)return true;for(const S of MT.sol)if(y>S.y0&&y<S.y1+1&&mtSolIn(S,x,z,.25))return true;return false}return _cb.apply(this,arguments)}}
{const _g=groundAt;groundAt=function(x,z,y){if(MODE!=='open'&&mtIn(x))return mtGround(x,z,y);return _g.apply(this,arguments)}}
{const _w=stWater;stWater=function(x,z){if(MODE!=='open'&&mtIn(x))return false;return _w.apply(this,arguments)}}
{const _b=stBridge;stBridge=function(x,z){if(MODE!=='open'&&mtIn(x))return false;return _b.apply(this,arguments)}}
{const _c=collide;collide=function(p,r,ghost,skipBlocks){if(MODE==='open'||!mtIn(p.x))return _c.apply(this,arguments);
  for(const b of boxes){if(!b.mt||p.y>b.h)continue;const cx=clamp(p.x,b.x0,b.x1),cz=clamp(p.z,b.z0,b.z1);const dx=p.x-cx,dz=p.z-cz,d2=dx*dx+dz*dz;
    if(d2<r*r){if(d2>1e-6){const d=Math.sqrt(d2);p.x=cx+dx/d*r;p.z=cz+dz/d*r}else{const l=p.x-b.x0,rr=b.x1-p.x,t=p.z-b.z0,bt=b.z1-p.z,m=Math.min(l,rr,t,bt);if(m===l)p.x=b.x0-r;else if(m===rr)p.x=b.x1+r;else if(m===t)p.z=b.z0-r;else p.z=b.z1+r}}}
  const C=MT.circ[MT.area]||[];for(const c of C){const dx=p.x-c.x,dz=p.z-c.z,d=Math.hypot(dx,dz),rr=c.r+r;if(d<rr&&d>1e-4){p.x=c.x+dx/d*rr;p.z=c.z+dz/d*rr}}
  if(MT.area==='out'&&p.x<9300){const y=p.y;for(const S of MT.sol){if(y>=S.y1-.6||y+1.8<=S.y0)continue;const dx=p.x-S.x,dz=p.z-S.z;const lx=dx*S.c-dz*S.s,lz=dx*S.s+dz*S.c;const ex=S.hx+r*.75-Math.abs(lx),ez=S.hz+r*.75-Math.abs(lz);if(ex<=0||ez<=0)continue;
      let nx=lx,nz=lz;if(ex<ez)nx=Math.sign(lx||1)*(S.hx+r*.75);else nz=Math.sign(lz||1)*(S.hz+r*.75);p.x=S.x+nx*S.c+nz*S.s;p.z=S.z-nx*S.s+nz*S.c}}
  if(MT.area==='crypt'){const dx=p.x-MTK.x,dz=p.z-MTK.z,d=Math.hypot(dx,dz);if(d>19.4&&!(Math.abs(dx)<2.3&&dz>0)){const k=19.4/d;p.x=MTK.x+dx*k;p.z=MTK.z+dz*k}}}}
{const _mw=muWant;muWant=function(){if(started&&MODE!=='open'&&CH2.zone==='mont'&&!(typeof bmWant==='function'&&bmWant()))return MT.area==='crypt'&&!MT.fight?'mus_ownight':'mus_mont';return _mw.apply(this,arguments)}}
{const _dr=distReal;distReal=function(u){if(MODE!=='open'&&CH2.zone==='mont')return Math.round(u)+' m';return _dr.apply(this,arguments)}}
{const _rv=revive;revive=function(){const r=_rv.apply(this,arguments);if(MODE!=='open'&&CH2.zone==='mont'){const c=SPAWN;P.pos.set(c.x,groundAt(c.x,c.z),c.z);P.flying=false;
  if(MT.area==='out'&&CH2.st===30){MT.wl=Math.min(MT.wl,mtSand(P.pos.x,P.pos.z+70));for(const e of enemies)if(!e.dead&&e.type==='mpil')removeEnemy(e)}if(MT.area==='crypt'&&MT.fight)try{mtBossReset()}catch(x){}}return r}}
{const _dw=drawWorldMap;drawWorldMap=function(){if(MODE!=='open'&&CH2.zone==='mont'&&MT.area){worldMap.width=WB.x1-WB.x0+48;worldMap.height=WB.z1-WB.z0+48;MAPOX=WB.x0-24;MAPOZ=WB.z0-24;const x=worldMap.getContext('2d'),X=v=>v-MAPOX,Z=v=>v-MAPOZ;
  x.fillStyle=MT.area==='out'?'#2a2a26':'#1d1935';x.fillRect(0,0,worldMap.width,worldMap.height);
  if(MT.area==='out'){x.fillStyle='#5a5448';x.beginPath();x.arc(X(MTC.x),Z(MTC.z),MTR,0,7);x.fill();x.strokeStyle='#9a8a6a';x.lineWidth=6.6;x.beginPath();for(let t=0;t<=1.43;t+=.02){const c=mtPolarP(t,mtPR(t));t?x.lineTo(X(c.x),Z(c.z)):x.moveTo(X(c.x),Z(c.z))}x.stroke();x.lineWidth=9;x.beginPath();x.moveTo(X(MTC.x),Z(MTC.z+MTR+4));x.lineTo(X(MTC.x),Z(MTC.z+MTR-4));x.stroke();
    x.fillStyle='#9a8a6a';x.beginPath();x.arc(X(MTC.x),Z(MTC.z),53,Math.PI/2-1.98,Math.PI/2-1.42);x.arc(X(MTC.x),Z(MTC.z),42.5,Math.PI/2-1.42,Math.PI/2-1.98,true);x.fill();
    if(MT.doorP){x.fillStyle='#c8b080';const c=mtPolarP(MTCH.t,MTCH.r);x.beginPath();x.arc(X(c.x),Z(c.z),7,0,7);x.fill()}x.fillStyle='#6a5a3a';for(const s of MT.stakes)x.fillRect(X(s.x)-3,Z(s.z),6,2);x.fillStyle='#302a22';for(const q of MT.qs){x.beginPath();x.arc(X(q.x),Z(q.z),q.r,0,7);x.fill()}}
  else if(MT.area==='egl'){x.fillStyle='#5a4a3a';x.fillRect(X(MTE.x-7),Z(-16),14,32)}else{x.fillStyle='#3a4a46';x.beginPath();x.arc(X(MTK.x),Z(MTK.z),20,0,7);x.fill()}return}return _dw.apply(this,arguments)}}
{const _t=toast;toast=function(msg,title){if(MT.muteT>time&&!(title&&/XVIII/.test(title)))return;return _t.apply(this,arguments)}}
