/* ================= OPEN WORLD v8: real Paris streets (OpenStreetMap) ================= */
const CITY={ok:false,names:[],nodes:null,edges:[],bld:[],parks:[],plazas:[],water:[],wtiles:new Map(),outline:null,adj:null,cells:new Map(),IC:160};
const WL=-9.5,RIVERBED=-15,CHS=240;
/* ---------- parse binary ---------- */
function cityParse(buf){const dv=new DataView(buf);let o=0;const u8=()=>dv.getUint8(o++),u16=()=>{const v=dv.getUint16(o,true);o+=2;return v},u32=()=>{const v=dv.getUint32(o,true);o+=4;return v},i32=()=>{const v=dv.getInt32(o,true);o+=4;return v},f32=()=>{const v=dv.getFloat32(o,true);o+=4;return v};
  o=4;const hl=u32();const hdr=JSON.parse(new TextDecoder().decode(new Uint8Array(buf,o,hl)));o+=hl;while(o%4)o++;
  CITY.names=hdr.names;CITY.bounds=hdr.bounds.map(v=>v*U);const ol=[];for(const p of hdr.city)ol.push(p[0]*U,p[1]*U);CITY.outline=new Float32Array(ol);
  const pts=()=>{const n=u32();const a=new Float32Array(n*2);for(let k=0;k<n*2;k++)a[k]=f32()*U;return a};
  const bbOf=(rings)=>{let x0=1e9,z0=1e9,x1=-1e9,z1=-1e9;for(const r of rings)for(let k=0;k<r.length;k+=2){const x=r[k],z=r[k+1];if(x<x0)x0=x;if(x>x1)x1=x;if(z<z0)z0=z;if(z>z1)z1=z}return[x0,z0,x1,z1]};
  const poly=()=>{const ring=pts();const nh=u16();const holes=[];for(let k=0;k<nh;k++)holes.push(pts());const bb=bbOf([ring]);let A=0,cx=0,cz=0;const n=ring.length/2;for(let i=0,j=n-1;i<n;j=i++){const xi=ring[i*2],zi=ring[i*2+1],xj=ring[j*2],zj=ring[j*2+1];const c=xj*zi-xi*zj;A+=c;cx+=(xi+xj)*c;cz+=(zi+zj)*c}A/=2;if(Math.abs(A)>1e-6){cx/=6*A;cz/=6*A}else{cx=(bb[0]+bb[2])/2;cz=(bb[1]+bb[3])/2}
    return{ring,holes,bb,cx,cz,area:Math.abs(A)}};
  const nn=u32();CITY.nodes=new Float32Array(nn*2);for(let k=0;k<nn*2;k++)CITY.nodes[k]=f32()*U;
  const ne=u32();for(let k=0;k<ne;k++){const cls=u8(),br=u8(),w=u8()/4*U,sw=u8()/4*U,name=u16();u16();const a=u32(),b=u32();const p=pts();let len=0;for(let q=2;q<p.length;q+=2)len+=Math.hypot(p[q]-p[q-2],p[q+1]-p[q-1]);
    CITY.edges.push({i:k,cls,br,w,sw,name,a,b,p,len,bb:bbOf([p])})}
  const nb=u32();for(let k=0;k<nb;k++){const blk=u32(),sub=u8();u8();u16();const P=poly();P.blk=blk;P.sub=sub;P.i=k;CITY.bld.push(P)}
  const np=u32();for(let k=0;k<np;k++){const name=u16(),kind=u8();u8();const P=poly();P.name=name;P.kind=kind;CITY.parks.push(P)}
  const nq=u32();for(let k=0;k<nq;k++){const name=u16();u16();const P=poly();P.name=name;CITY.plazas.push(P)}
  const nw=u32();for(let k=0;k<nw;k++){const low=u8();u8();u16();const P=poly();P.low=low;CITY.water.push(P)}
  const nt=u32();for(let k=0;k<nt;k++){const i=i32(),j=i32();const nv=u32();const V=new Float32Array(nv*2);for(let q=0;q<nv*2;q++)V[q]=f32()*U;const ni=u32();const I=new Uint32Array(ni);for(let q=0;q<ni;q++)I[q]=u32();CITY.wtiles.set(i*4096+j,{V,I})}
  // adjacency
  const adj=new Array(nn);for(const e of CITY.edges){(adj[e.a]||(adj[e.a]=[])).push(e);(adj[e.b]||(adj[e.b]=[])).push(e)}CITY.adj=adj;
  // spatial index
  const IC=CITY.IC,add=(kind,it,bb,m=0)=>{const i0=Math.floor((bb[0]-m)/IC),i1=Math.floor((bb[2]+m)/IC),j0=Math.floor((bb[1]-m)/IC),j1=Math.floor((bb[3]+m)/IC);for(let i=i0;i<=i1;i++)for(let j=j0;j<=j1;j++){const key=(i+500)*2000+(j+500);let c=CITY.cells.get(key);if(!c)CITY.cells.set(key,c={b:[],e:[],p:[],q:[],w:[]});c[kind].push(it)}};
  for(const e of CITY.edges)add('e',e,e.bb,e.w/2+e.sw+2);for(const b of CITY.bld)add('b',b,b.bb,1);for(const p of CITY.parks)add('p',p,p.bb);for(const p of CITY.plazas)add('q',p,p.bb);for(const w of CITY.water)add('w',w,w.bb);
  CITY.ok=true}
function cityCell(x,z){return CITY.cells.get((Math.floor(x/CITY.IC)+500)*2000+Math.floor(z/CITY.IC)+500)}
function cityQuery(x,z,r,kind,fn){const IC=CITY.IC,i0=Math.floor((x-r)/IC),i1=Math.floor((x+r)/IC),j0=Math.floor((z-r)/IC),j1=Math.floor((z+r)/IC);const seen=i0!==i1||j0!==j1?new Set():null;
  for(let i=i0;i<=i1;i++)for(let j=j0;j<=j1;j++){const c=CITY.cells.get((i+500)*2000+j+500);if(!c)continue;for(const it of c[kind]){if(seen){if(seen.has(it))continue;seen.add(it)}if(fn(it)===false)return}}}
/* ---------- polygon helpers ---------- */
function ptInPoly(P,x,z){if(x<P.bb[0]||x>P.bb[2]||z<P.bb[1]||z>P.bb[3])return false;if(!ptInRing(P.ring,x,z))return false;for(const h of P.holes)if(ptInRing(h,x,z))return false;return true}
function nearestOnRings(P,x,z,out){let bd=1e18;const test=r=>{const n=r.length/2;for(let i=0,j=n-1;i<n;j=i++){const ax=r[j*2],az=r[j*2+1],bx=r[i*2],bz=r[i*2+1];const dx=bx-ax,dz=bz-az,L2=dx*dx+dz*dz||1;let t=((x-ax)*dx+(z-az)*dz)/L2;t=t<0?0:t>1?1:t;const px=ax+dx*t,pz=az+dz*t,d=(x-px)**2+(z-pz)**2;if(d<bd){bd=d;out.x=px;out.z=pz;out.nx=dz;out.nz=-dx}}};test(P.ring);for(const h of P.holes)test(h);out.d=Math.sqrt(bd);return out}
function distToEdge(e,x,z,out){const p=e.p;let bd=1e18;for(let k=2;k<p.length;k+=2){const ax=p[k-2],az=p[k-1],bx=p[k],bz=p[k+1];const dx=bx-ax,dz=bz-az,L2=dx*dx+dz*dz||1;let t=((x-ax)*dx+(z-az)*dz)/L2;t=t<0?0:t>1?1:t;const px=ax+dx*t,pz=az+dz*t,d=(x-px)**2+(z-pz)**2;if(d<bd){bd=d;if(out){out.x=px;out.z=pz;out.k=k;out.t=t;out.dx=dx;out.dz=dz}}}const d=Math.sqrt(bd);if(out)out.d=d;return d}

function nearestEdge(x,z,r=40,filter){let best=null,bd=r;cityQuery(x,z,r,'e',e=>{if(filter&&!filter(e))return;const d=distToEdge(e,x,z)-e.w/2;if(d<bd){bd=d;best=e}});return best}
function streetNameAt(x,z){const e=nearestEdge(x,z,50,e=>e.name!==0xFFFF);return e?CITY.names[e.name]:null}
/* ---------- grid classification ---------- */
// 0 outside, 1 open ground/sidewalk, 2 water, 3 park, 4 plaza, 5 bridge, 6 landmark, 7 building, 8 forest, 9 cemetery, 10 road
function gIdx(x,z){const i=Math.floor((x-OW.x0)/OW.cell),j=Math.floor((z-OW.z0)/OW.cell);if(i<0||j<0||i>=OW.gw||j>=OW.gh)return-1;return j*OW.gw+i}
function gType(x,z){const k=gIdx(x,z);return k<0?0:OW.grid[k]}
function gSet(x,z,t){const k=gIdx(x,z);if(k>=0)OW.grid[k]=t}
function rasterRings(rings,t,only){// scanline fill, even-odd
  let z0=1e9,z1=-1e9;for(const r of rings)for(let k=1;k<r.length;k+=2){if(r[k]<z0)z0=r[k];if(r[k]>z1)z1=r[k]}const c=OW.cell,G=OW.grid,W=OW.gw;const j0=Math.max(0,Math.floor((z0-OW.z0)/c)),j1=Math.min(OW.gh-1,Math.floor((z1-OW.z0)/c));const xs=[];
  for(let j=j0;j<=j1;j++){const z=OW.z0+(j+.5)*c;xs.length=0;for(const r of rings){const n=r.length/2;for(let a=0,b=n-1;a<n;b=a++){const za=r[a*2+1],zb=r[b*2+1];if((za>z)!==(zb>z)){const xa=r[a*2],xb=r[b*2];xs.push(xa+(z-za)*(xb-xa)/(zb-za))}}}
    if(xs.length<2)continue;xs.sort((a,b)=>a-b);for(let q=0;q+1<xs.length;q+=2){const i0=Math.max(0,Math.ceil((xs[q]-OW.x0)/c-.5)),i1=Math.min(W-1,Math.floor((xs[q+1]-OW.x0)/c-.5));for(let i=i0;i<=i1;i++){const k=j*W+i;if(only===undefined||only.includes(G[k]))G[k]=t}}}}
function rasterCircle(cx,cz,r,t,only){const c=OW.cell;for(let x=cx-r;x<=cx+r;x+=c)for(let z=cz-r;z<=cz+r;z+=c)if((x-cx)**2+(z-cz)**2<=r*r){if(only===undefined||gType(x,z)===only)gSet(x,z,t)}}
function rasterRect(cx,cz,w,d,ry,t,only){const c=Math.cos(ry),s=Math.sin(ry);const q=(u,v)=>[cx+u*c+v*s,cz-u*s+v*c];const a=q(-w/2,-d/2),b=q(w/2,-d/2),cc=q(w/2,d/2),dd=q(-w/2,d/2);rasterRings([new Float32Array([...a,...b,...cc,...dd])],t,only===undefined?undefined:Array.isArray(only)?only:[only])}
function rasterSeg(a,b,w,t,only){const dx=b.x-a.x,dz=b.z-a.z,L=Math.hypot(dx,dz)||1,nx=-dz/L*w/2,nz=dx/L*w/2;rasterRings([new Float32Array([a.x+nx,a.z+nz,b.x+nx,b.z+nz,b.x-nx,b.z-nz,a.x-nx,a.z-nz])],t,only===undefined?undefined:Array.isArray(only)?only:[only])}
function segDist(px,pz,a,b){const abx=b.x-a.x,abz=b.z-a.z,t=clamp(((px-a.x)*abx+(pz-a.z)*abz)/(abx*abx+abz*abz||1),0,1);return[Math.hypot(px-(a.x+abx*t),pz-(a.z+abz*t)),t]}
/* ---------- terrain ---------- */
function terrainH(x,z){if(!OW.hm)return 0;const c=OW.hmc,fx=(x-OW.x0)/c,fz=(z-OW.z0)/c;let i=Math.floor(fx),j=Math.floor(fz);if(i<0||j<0||i>=OW.hmw-1||j>=OW.hmh-1)return 0;const tx=fx-i,tz=fz-j,w=OW.hmw,h=OW.hm;
  const a=h[j*w+i],b=h[j*w+i+1],cc=h[(j+1)*w+i],d=h[(j+1)*w+i+1];return(a*(1-tx)+b*tx)*(1-tz)+(cc*(1-tx)+d*tx)*tz}
/* ---------- collision hash (landmarks, cars, props) ---------- */
const HB=new Map(),HBC=40;
function hbKeys(b,fn){const i0=Math.floor(b.x0/HBC),i1=Math.floor(b.x1/HBC),j0=Math.floor(b.z0/HBC),j1=Math.floor(b.z1/HBC);for(let i=i0;i<=i1;i++)for(let j=j0;j<=j1;j++)fn(i*100000+j)}
function hbAdd(b){hbKeys(b,k=>{let a=HB.get(k);if(!a)HB.set(k,a=[]);a.push(b)})}
function hbDel(b){hbKeys(b,k=>{const a=HB.get(k);if(a){const i=a.indexOf(b);if(i>=0)a.splice(i,1)}})}
function addBox(b){if(MODE==='open')hbAdd(b);else boxes.push(b)}
function hbQuery(x,z,r,fn){const i0=Math.floor((x-r)/HBC),i1=Math.floor((x+r)/HBC),j0=Math.floor((z-r)/HBC),j1=Math.floor((z+r)/HBC);for(let i=i0;i<=i1;i++)for(let j=j0;j<=j1;j++){const a=HB.get(i*100000+j);if(a)for(const b of a)fn(b)}}
function pushOut(p,b,r){if(b.circ){const dx=p.x-b.cx,dz=p.z-b.cz,d=Math.hypot(dx,dz),R=b.r+r;if(d<R){if(d<1e-4){p.x=b.cx+R;return}p.x=b.cx+dx/d*R;p.z=b.cz+dz/d*R}return}
  const cx=clamp(p.x,b.x0,b.x1),cz=clamp(p.z,b.z0,b.z1);const dx=p.x-cx,dz=p.z-cz,d2=dx*dx+dz*dz;if(d2>=r*r)return;
  if(d2>1e-6){const d=Math.sqrt(d2);p.x=cx+dx/d*r;p.z=cz+dz/d*r}else{const l=p.x-b.x0,rr=b.x1-p.x,t=p.z-b.z0,bt=b.z1-p.z,m=Math.min(l,rr,t,bt);if(m===l)p.x=b.x0-r;else if(m===rr)p.x=b.x1+r;else if(m===t)p.z=b.z0-r;else p.z=b.z1+r}}
/* ---------- buildings: heights & roofs ---------- */
const HSCALE={haussmann:1.45,posh:1.45,barbes:1.45,marais:1.45,latin:1.45,montmartre:1.45,village:1.45,pigalle:1.45,popular:1.45,chinatown:1.5,modern:1.5,defense:1.9,suburb:1.4};
function bldInfo(B){if(B.info)return B.info;const zn=zoneAt(B.cx,B.cz);let sn=zn.style;if(B.sub&&sn!=='defense')sn='suburb';const S=STYLES[sn]||STYLES.haussmann;const R=mulberry(hash2(B.i,77,5));
  let h=(S.h[0]+R()*(S.h[1]-S.h[0]))*(HSCALE[sn]||1.45);let tower=false;
  if(S.tower&&B.area<9000*U*U&&R()<S.tower*(B.area<2500*U*U?1:.4)){h=(S.th[0]+R()*(S.th[1]-S.th[0]))*(HSCALE[sn]||1.5);tower=true}
  if(B.area<60*U*U)h*=.55;
  let base=1e9;const r=B.ring;const st=Math.max(2,Math.floor(r.length/2/10))*2;for(let k=0;k<r.length;k+=st)base=Math.min(base,terrainH(r[k],r[k+1]));if(base===1e9)base=terrainH(B.cx,B.cz);
  const roof=tower||S.roof==='flat'?'flat':S.roof==='mix'?(R()<.6?'mansard':'tile'):S.roof;const slim=B.area/Math.max(1,ringLen(B.ring))<2.2;
  B.info={zn,sn,S,h,base,top:base+h,roof:slim&&roof!=='flat'?'flat':roof,hm:roof==='mansard'?(3.6+R()*1.6)*U:roof==='tile'?(2.4+R()*1.4)*U:0,inset:(roof==='tile'?4.5:3.2)*U,lay:tower?2:(B.sub?2:S.lay),v:R()<.5?0:1,tint:new THREE.Color(pickR(R,S.tint)).multiplyScalar(.9+R()*.12),R};
  return B.info}
function ringLen(r){let L=0;const n=r.length/2;for(let i=0,j=n-1;i<n;j=i++)L+=Math.hypot(r[i*2]-r[j*2],r[i*2+1]-r[j*2+1]);return L}
function bRoofH(B,x,z,o){const I=bldInfo(B);if(!I.hm)return I.top+.2;nearestOnRings(B,x,z,o||_rh);return I.top+I.hm*Math.min(1,(o||_rh).d/I.inset)}
const _rh={};
function bldAt(x,z){let hit=null;cityQuery(x,z,0,'b',B=>{if(ptInPoly(B,x,z)&&!B.gone){hit=B;return false}});return hit}
/* ---------- ground / collision ---------- */
function bridgeAt(x,z){return gType(x,z)===5?terrainH(x,z)+.05:null}
function wLevel(W){if(W.lv===undefined){if(W.low)W.lv=WL;else{let mx=-1e9,mn=1e9;const r=W.ring;for(let k=0;k<r.length;k+=2){const h=terrainH(r[k],r[k+1]);mx=Math.max(mx,h);mn=Math.min(mn,h)}if(mx-mn>1.2)W.slope=true;W.lv=(mx===-1e9?terrainH(W.cx,W.cz):mx)+.14}}return W.lv}
/* which water body is here: inside a polygon, or a river cell just off its edge. Basin cells that fall outside the basin polygon are dry land (fixes falling through the paving next to fountains) */
function waterPoly(x,z){let r=null;cityQuery(x,z,0,'w',W=>{if(ptInPoly(W,x,z)){r=W;return false}});if(r)return r;cityQuery(x,z,14,'w',W=>{if(W.low&&x>W.bb[0]-14&&x<W.bb[2]+14&&z>W.bb[1]-14&&z<W.bb[3]+14){r=W;return false}});return r}
function waterLevelAt(x,z){let W=null;cityQuery(x,z,0,'w',w=>{if(ptInPoly(w,x,z)){W=w;return false}});if(!W)return WL;const lv=wLevel(W);return W.slope?terrainH(x,z)+.12:lv}
function basinY(x,z){let y=null;cityQuery(x,z,0,'w',W=>{if(!W.low&&ptInPoly(W,x,z)){y=wLevel(W)-1.35;return false}});return y}
function gtY(x,z){if(gType(x,z)===2){const b=basinY(x,z);if(b!==null)return Math.min(b,terrainH(x,z))}return terrainH(x,z)}
function owGround(x,z,y){if(VIN&&y!==undefined&&y<VIN.floor+12&&y>VIN.floor-30)return VIN.floor;const t=gType(x,z);let h;
  if(t===2){const W=waterPoly(x,z);h=W?(wLevel(W),W.slope?terrainH(x,z)-.5:W.lv-.85):terrainH(x,z)}
  else{h=terrainH(x,z);if(t===7){const B=bldAt(x,z);if(B){const rh=bRoofH(B,x,z);if(y===undefined||y>=rh-1.6)h=rh}}}
  if(y!==undefined&&typeof entranceAt==='function'){const E=entranceAt(x,z);if(E)return stairY(E.e,E.v)}
  if(y!==undefined){for(const d of OW.decks){if(x>d.x0&&x<d.x1&&z>d.z0&&z<d.z1&&y>=d.y-1.2)h=Math.max(h,d.y)}
    for(const v of OW.viaducts){if(v.bb&&(x<v.bb[0]||x>v.bb[2]||z<v.bb[1]||z>v.bb[3]))continue;if(y<v.Y-1.4)continue;for(let k=0;k<v.P.length-1;k++){const[d]=segDist(x,z,v.P[k],v.P[k+1]);if(d<4.4){h=Math.max(h,v.Y+.05);break}}}
    hbQuery(x,z,.5,b=>{if(b.lm&&b.h&&y>=b.h-1.4&&x>b.x0&&x<b.x1&&z>b.z0&&z<b.z1)h=Math.max(h,b.h)})}
  return h}
function owWater(x,z){return gType(x,z)===2&&!!waterPoly(x,z)}
const _co={};
function owCollideAll(p,r,ghost,skipBlocks,swim){if(swim&&VIN){venueCollide(p);return}
  if(!skipBlocks)cityQuery(p.x,p.z,r+1,'b',B=>{if(B.gone)return;const I=bldInfo(B);if(p.y!==undefined&&p.y>I.top-1.2)return;const inside=ptInPoly(B,p.x,p.z);nearestOnRings(B,p.x,p.z,_co);
    if(inside){const l=Math.hypot(_co.nx,_co.nz)||1;p.x=_co.x+_co.nx/l*r;p.z=_co.z+_co.nz/l*r}else if(_co.d<r){const dx=p.x-_co.x,dz=p.z-_co.z,d=_co.d||1e-4;p.x=_co.x+dx/d*r;p.z=_co.z+dz/d*r}});
  hbQuery(p.x,p.z,r+1,b=>{if(p.y!==undefined&&p.y>b.h)return;pushOut(p,b,r)});
  if(!ghost&&!swim&&(p.y===undefined||p.y<.9)&&gType(p.x,p.z)===2){for(let rr=2;rr<60;rr+=2){let done=false;for(let a=0;a<16;a++){const x=p.x+Math.cos(a*TAU/16)*rr,z=p.z+Math.sin(a*TAU/16)*rr;const t=gType(x,z);if(t&&t!==2){p.x=x;p.z=z;done=true;break}}if(done)break}}
  p.x=clamp(p.x,OW.x0+20,OW.x1-20);p.z=clamp(p.z,OW.z0+20,OW.z1-20)}
function blockAt(x,z,m=0){const t=gType(x,z);if(t===7)return true;if(m>0){for(const[a,b]of[[m,0],[-m,0],[0,m],[0,-m]])if(gType(x+a,z+b)===7)return true}return null}
function owValidSpot(x,z,m=1.5){const t=gType(x,z);if(t===0||t===2||t===6||t===7||t===10)return false;if(blockAt(x,z,m))return false;let ok=true;hbQuery(x,z,m+1,b=>{if(b.circ){if(Math.hypot(x-b.cx,z-b.cz)<b.r+m)ok=false}else if(x>b.x0-m&&x<b.x1+m&&z>b.z0-m&&z<b.z1+m)ok=false});return ok}
/* ---------- static bins ---------- */
const BIN=new Map();let CX0=0,CZ0=0;
function chunkOf(x,z){return[Math.floor(x/CHS),Math.floor(z/CHS)]}
function binAdd(kind,x,z,o){const[ci,cj]=chunkOf(x,z);const k=ci*4096+cj;let b=BIN.get(k);if(!b)BIN.set(k,b={});(b[kind]||(b[kind]=[])).push(o)}
