/* ================= OPEN WORLD v7: métro (world) ================= */
const MST=[];// stations: {i,name,x,z,lines:[ids],ent}
const AER_SEG=[];// viaduct segments {line,col,pts:[{x,z}],st:[station idx]}
function metroInit(){if(MST.length)return;METRO_ST.forEach((s,i)=>{const p=LL(s[1],s[2]);MST.push({i,name:s[0],x:p.x,z:p.z,lines:[]})});
  for(const L of METRO_LINES)for(const seg of L.s)for(const i of seg)if(!MST[i].lines.includes(L.id))MST[i].lines.push(L.id);
  const split={'2':[[0,4]],'6':[[0,4],[4,7],[7,14]],'5':[[0,2]]};
  for(const l in METRO_AERIAL){const arr=METRO_AERIAL[l];for(const[a,b]of split[l]){const st=arr.slice(a,b);const col=METRO_LINES.find(x=>x.id===l).c;const pts=[];
    for(let k=0;k<st.length;k++){const s=MST[st[k]];pts.push({x:s.x,z:s.z})}AER_SEG.push({line:l,col,st,pts})}}}
function metroRaster(){metroInit();for(const seg of AER_SEG)for(let k=0;k<seg.pts.length-1;k++)rasterSeg(seg.pts[k],seg.pts[k+1],22,4,1)}
function lineColor(id){const L=METRO_LINES.find(x=>x.id===id);return L?L.c:'#888'}
function stationSignTex(name){return canvasTex(512,96,(x)=>{x.fillStyle='#1a2a8a';x.fillRect(0,0,512,96);x.strokeStyle='#ffffff';x.lineWidth=4;x.strokeRect(6,6,500,84);x.fillStyle='#fff';let fs=44;x.font=`600 ${fs}px system-ui,Arial`;while(x.measureText(name).width>470&&fs>18){fs-=2;x.font=`600 ${fs}px system-ui,Arial`}x.textAlign='center';x.textBaseline='middle';x.fillText(name,256,50)})}
function makeTrain(col){const g=new THREE.Group();const body=std({color:0xf2f4f6,roughness:.35,metalness:.3,envMapIntensity:1.2}),band=std({color:0x1fb5a8,roughness:.4}),win=std({color:0x0a1016,roughness:.05,metalness:.9,envMapIntensity:2}),dark=std({color:0x1a1c20,roughness:.6}),accent=std({color:new THREE.Color(col),roughness:.5});accent.userData.line=true;
  const cars=[];for(let k=0;k<5;k++){const c=new THREE.Group();g.add(c);const b=new THREE.Mesh(TG.box,body);b.scale.set(2.7,2.9,9.4);b.position.y=1.9;c.add(b);const bd=new THREE.Mesh(TG.box,band);bd.scale.set(2.74,.9,9.42);bd.position.y=2.35;c.add(bd);
    for(const s of[-1,1]){const w=new THREE.Mesh(TG.box,win);w.scale.set(.05,1,8);w.position.set(s*1.37,2.5,0);c.add(w);for(const dz of[-2.6,2.6]){const d=new THREE.Mesh(TG.box,band);d.scale.set(.06,2.2,1.3);d.position.set(s*1.38,1.6,dz);c.add(d)}}
    const u=new THREE.Mesh(TG.box,dark);u.scale.set(2.3,.7,8.6);u.position.y=.35;c.add(u);const st=new THREE.Mesh(TG.box,accent);st.scale.set(2.76,.18,9.44);st.position.y=1.1;c.add(st);
    if(k===0||k===4){const f=new THREE.Mesh(TG.box,win);f.scale.set(2.2,1.3,.1);f.position.set(0,2.6,k===0?4.72:-4.72);c.add(f);for(const s of[-1,1]){const l=new THREE.Mesh(TG.sph,new THREE.MeshBasicMaterial({color:k===0?0xfff8e0:0xff2020}));l.scale.setScalar(.14);l.position.set(s*.85,1.1,k===0?4.72:-4.72);c.add(l)}}
    cars.push(c)}g.userData.cars=cars;g.traverse(o=>{if(o.isMesh)o.castShadow=true});return g}
function metroBuild(){metroInit();
  // entrances
  for(const s of MST){s.ent=placeEntrance(s);const e=s.ent;OW.entrances.push(e);binAdd('ent',e.x,e.z,e);const k=Math.floor(e.x/40)*100000+Math.floor(e.z/40);(ENTG.get(k)||ENTG.set(k,[]).get(k)).push(e)}
  // viaducts
  const iron=std({color:0x3a4a44,roughness:.5,metalness:.6}),stone=OW.quayM,rail=std({color:0x8a8a90,roughness:.3,metalness:.9}),glass=std({color:0xd8e8f0,roughness:.1,metalness:.2,transparent:true,opacity:.45,side:THREE.DoubleSide,depthWrite:false}),plat=std({color:0x9a9aa0,roughness:.8});
  for(const seg of AER_SEG){const pts=seg.pts;const curve=new THREE.CatmullRomCurve3(pts.map(p=>V3(p.x,0,p.z)),false,'catmullrom',.1);const L=curve.getLength(),n=Math.max(2,Math.ceil(L/6));const P=curve.getSpacedPoints(n);
    let hmax=0;for(const p of P)hmax=Math.max(hmax,terrainH(p.x,p.z));const Y=hmax+10.5;seg.Y=Y;seg.curve=curve;seg.L=L;seg.P=P;{let a=1e9,b=1e9,c=-1e9,d=-1e9;for(const p of P){a=Math.min(a,p.x);b=Math.min(b,p.z);c=Math.max(c,p.x);d=Math.max(d,p.z)}seg.bb=[a-8,b-8,c+8,d+8]}
    const g=new THREE.Group();scene.add(g);
    for(let k=0;k<P.length-1;k++){const a=P[k],b=P[k+1],mx=(a.x+b.x)/2,mz=(a.z+b.z)/2,ang=Math.atan2(b.x-a.x,b.z-a.z),len=Math.hypot(b.x-a.x,b.z-a.z)+.05;
      const d=new THREE.Mesh(TG.box,iron);d.position.set(mx,Y-.6,mz);d.rotation.y=ang;d.scale.set(8,1.2,len);d.castShadow=d.receiveShadow=true;g.add(d);
      for(const s of[-1,1]){const r=new THREE.Mesh(TG.box,rail);r.position.set(mx+Math.cos(ang)*s*.75,Y+.12,mz-Math.sin(ang)*s*.75);r.rotation.y=ang;r.scale.set(.12,.14,len);g.add(r);
        const rl=new THREE.Mesh(TG.box,iron);rl.position.set(mx+Math.cos(ang)*s*3.9,Y+.6,mz-Math.sin(ang)*s*3.9);rl.rotation.y=ang;rl.scale.set(.15,1.2,len);g.add(rl)}
      if(k%3===0){const t=gType(mx,mz);for(const s of[-1,1]){const px=mx+Math.cos(ang)*s*2.8,pz=mz-Math.sin(ang)*s*2.8,ty=t===2?-2:terrainH(px,pz);const c=new THREE.Mesh(TG.cyl12,t===2?stone:iron);c.position.set(px,(ty+Y)/2-.6,pz);c.scale.set(t===2?1.4:.55,Y-ty-.6,t===2?1.4:.55);c.castShadow=true;g.add(c)}}}
    // aerial stations with glass canopies
    for(const si of seg.st){const s=MST[si];let best=0,bd=1e9;for(let k=0;k<P.length;k++){const d=Math.hypot(P[k].x-s.x,P[k].z-s.z);if(d<bd){bd=d;best=k}}const a=P[Math.max(0,best-1)],b=P[Math.min(P.length-1,best+1)],ang=Math.atan2(b.x-a.x,b.z-a.z),cx=P[best].x,cz=P[best].z;
      s.aer={seg,x:cx,z:cz,y:Y,ang};const sg=new THREE.Group();sg.position.set(cx,Y,cz);sg.rotation.y=ang;g.add(sg);
      const cg=new THREE.CylinderGeometry(7.4,7.4,36,16,1,true,0,Math.PI);cg.rotateX(Math.PI/2);cg.rotateZ(Math.PI/2);const cn=new THREE.Mesh(cg,glass);cn.position.y=4.4;cn.scale.y=.42;sg.add(cn);
      for(let k=-4;k<=4;k++){const ar=new THREE.Mesh(TG.torusHalf,iron);ar.scale.set(7.4,7.4*.42,7.4);ar.position.set(0,4.4,k*4.4);sg.add(ar)}
      for(const sd of[-1,1]){const pf=new THREE.Mesh(TG.box,plat);pf.position.set(sd*3.3,-.2,0);pf.scale.set(3.1,1,34);pf.receiveShadow=true;sg.add(pf);
        for(let k=-3;k<=3;k++){const col=new THREE.Mesh(TG.box,iron);col.position.set(sd*4.7,2.3,k*5);col.scale.set(.25,4.6,.25);sg.add(col)}
        const sn=new THREE.Mesh(new THREE.PlaneGeometry(4.2,.8),new THREE.MeshBasicMaterial({map:stationSignTex(s.name)}));sn.position.set(sd*4.55,2.6,-6);sn.rotation.y=sd>0?-Math.PI/2:Math.PI/2;sg.add(sn);
        for(let k=-2;k<=2;k++){const bench=new THREE.Mesh(TG.box,new THREE.MeshStandardMaterial({color:0x2a7ad0,roughness:.4}));bench.position.set(sd*4.2,.55,k*6+2);bench.scale.set(.5,.5,1.8);sg.add(bench)}}}
    // trains
    for(let k=0;k<2;k++){const tr=makeTrain(seg.col);scene.add(tr);OW.trains.push({g:tr,seg,s:k*L*.5,dir:k?-1:1,wait:0})}
    OW.viaducts.push(seg)}}
const _tp=V3(),_tq=V3();
function updateTrains(dt,px,pz){for(const t of OW.trains){const seg=t.seg;const near=Math.hypot(seg.pts[0].x-px,seg.pts[0].z-pz)<900||Math.hypot(seg.pts[seg.pts.length-1].x-px,seg.pts[seg.pts.length-1].z-pz)<900;t.g.visible=near;if(!near)continue;
  if(t.wait>0)t.wait-=dt;else{t.s+=t.dir*dt*13;if(t.s>seg.L-24){t.s=seg.L-24;t.dir=-1;t.wait=4}if(t.s<24){t.s=24;t.dir=1;t.wait=4}
    for(const si of seg.st){const u=stationU(seg,si);if(Math.abs(t.s-u)<t.dir*dt*13+.01&&t.lastSt!==si){t.wait=3;t.lastSt=si}}}
  const cars=t.g.userData.cars;for(let k=0;k<cars.length;k++){const u=clamp(t.s-(k-2)*9.6*t.dir,1,seg.L-1)/seg.L;seg.curve.getPointAt(u,_tp);const u2=clamp(u+.002*t.dir,0,1);seg.curve.getPointAt(u2,_tq);cars[k].position.set(_tp.x,seg.Y,_tp.z);cars[k].rotation.y=Math.atan2(_tq.x-_tp.x,_tq.z-_tp.z)}}}
function stationU(seg,si){if(!seg._u)seg._u={};if(seg._u[si]!==undefined)return seg._u[si];const s=MST[si];let best=0,bd=1e9;for(let k=0;k<=200;k++){seg.curve.getPointAt(k/200,_tp);const d=Math.hypot(_tp.x-s.x,_tp.z-s.z);if(d<bd){bd=d;best=k/200}}return seg._u[si]=best*seg.L}

const ENTG=new Map();
function placeEntrance(s){const free=(e)=>{const c=Math.cos(e.r),sn=Math.sin(e.r);for(const u of[-2,0,2])for(const v of[1.2,-.5,-4,-7.8]){const x=e.x+c*u+sn*v,z=e.z-sn*u+c*v;const t=gType(x,z);if(t!==1&&t!==4)return false}return true};
  const cands=[];cityQuery(s.x,s.z,90,'e',ed=>{if(ed.cls>5||ed.br||ed.len<20)return;const o={};const d=distToEdge(ed,s.x,s.z,o);if(d<90)cands.push([d,ed,o])});cands.sort((a,b)=>a[0]-b[0]);
  for(const[d,ed,o]of cands.slice(0,8)){const L=Math.hypot(o.dx,o.dz)||1,tx=o.dx/L,tz=o.dz/L,nx=-tz,nz=tx;for(const sd of[1,-1])for(const sh of[0,6,-6,12,-12,18,-18]){const off=ed.w/2+Math.max(2.2,ed.sw*.55);const x=o.x+tx*sh+nx*sd*off,z=o.z+tz*sh+nz*sd*off;const e={x,z,r:Math.atan2(tx,tz)+(sh%12===0?0:Math.PI),st:s.i};if(free(e))return e}}
  for(let r=4;r<80;r+=5)for(let a=0;a<14;a++){const ang=a/14*TAU+(s.i%7)*.3,x=s.x+Math.sin(ang)*r,z=s.z+Math.cos(ang)*r;const e={x,z,r:ang+Math.PI,st:s.i};if(free(e))return e}return{x:s.x,z:s.z,r:0,st:s.i}}
function entranceAt(x,z){const k=Math.floor(x/40)*100000+Math.floor(z/40);for(const dk of[0,1,-1,100000,-100000,100001,-100001,99999,-99999]){const a=ENTG.get(k+dk);if(!a)continue;for(const e of a){if(e.y===undefined)continue;const dx=x-e.x,dz=z-e.z,c=Math.cos(e.r),sn=Math.sin(e.r);const u=dx*c-dz*sn,v=dx*sn+dz*c;if(Math.abs(u)<e.W2&&v<e.V0&&v>e.V1)return{e,u,v}}}return null}
function stairY(e,v){const run=e.V0-e.V1-1.4;const k=clamp((e.V0-v)/run,0,1);return e.y-k*e.DEP}
