/* ================= talking mouths, done properly =================
   1. Find the painted mouth on each model: scan the front of the face, sample its texture, take the darkest line between nose and chin (the lip line), and its width.
   2. When the character speaks, a small mouth opening (dark inside, a hint of upper teeth, soft edges) grows down from that line, parented to the head bone.
   3. The chin and lower lip drop by a few millimetres with it. Nothing else on the face moves. */
const MOUTH={tex:null};
function mouthPixels(map){try{const im=map&&map.image;if(!im||!im.width)return null;const c=document.createElement('canvas');c.width=im.width;c.height=im.height;const x=c.getContext('2d');x.drawImage(im,0,0);
    return{w:im.width,h:im.height,d:x.getImageData(0,0,im.width,im.height).data,flip:!!map.flipY}}catch(e){return null}}
gsMouthCal=function(T){if(T.userData.mcal!==undefined)return T.userData.mcal;T.userData.mcal=null;let sm=null;T.traverse(o=>{if(!sm&&o.isSkinnedMesh)sm=o});if(!sm)return null;
  const sk=sm.skeleton,hi=sk.bones.findIndex(b=>b.name==='Head');if(hi<0)return null;
  const M=new THREE.Matrix4().copy(sk.boneInverses[hi]).invert().premultiply(sm.bindMatrixInverse);const hp=new THREE.Vector3().setFromMatrixPosition(M);
  const geo=sm.geometry,pa=geo.attributes.position,uv=geo.attributes.uv,n=pa.count;let y0=1e9,y1=-1e9;for(let i=0;i<n;i++){const y=pa.getY(i);if(y<y0)y0=y;if(y>y1)y1=y}const H=y1-y0;
  // rough mouth height first (nose tip, or a per-model ratio), then refine on the texture
  const NB=48,lo=hp.y-.02*H,span=.16*H,bins=new Float32Array(NB).fill(-1e9);
  for(let i=0;i<n;i++){const x=pa.getX(i),y=pa.getY(i);if(Math.abs(x-hp.x)>.014*H||y<lo||y>=lo+span)continue;const b=((y-lo)/span*NB)|0;const z=pa.getZ(i);if(z>bins[b])bins[b]=z}
  let nb=-1,nz=-1e9;for(let b=(NB*.3)|0;b<(NB*.8)|0;b++)if(bins[b]>nz){nz=bins[b];nb=b}if(nb<0)return null;
  const key=T.userData.gsKey,MY=GS_MOUTHY[key];const my0=MY?y0+MY*H:lo+(nb+.5)/NB*span+(GS_MOUTHN[key]||-.03)*H;
  // front-facing triangles around the mouth
  const idx=geo.index?geo.index.array:null,tc=idx?idx.length/3:n/3,win=.024*H;let zf=-1e9;for(let i=0;i<n;i++){const y=pa.getY(i);if(Math.abs(pa.getX(i)-hp.x)<.02*H&&Math.abs(y-my0)<win){const z=pa.getZ(i);if(z>zf)zf=z}}
  const tris=[];for(let t=0;t<tc;t++){const a=idx?idx[t*3]:t*3,b=idx?idx[t*3+1]:t*3+1,c=idx?idx[t*3+2]:t*3+2;let ok=true,zmin=1e9;
    for(const v of[a,b,c]){const x=pa.getX(v),y=pa.getY(v),z=pa.getZ(v);if(Math.abs(x-hp.x)>.05*H||Math.abs(y-my0)>win+.02*H){ok=false;break}if(z<zmin)zmin=z}if(ok&&zmin>zf-.05*H)tris.push(a,b,c)}
  let mat=sm.material;if(Array.isArray(mat))mat=mat[0];const P=mouthPixels(mat&&mat.map);
  const hit=(x,y)=>{let best=null,bz=-1e9;for(let i=0;i<tris.length;i+=3){const a=tris[i],b=tris[i+1],c=tris[i+2];const ax=pa.getX(a),ay=pa.getY(a),bx=pa.getX(b),by=pa.getY(b),cx=pa.getX(c),cy=pa.getY(c);
      const d=(by-cy)*(ax-cx)+(cx-bx)*(ay-cy);if(Math.abs(d)<1e-12)continue;const l1=((by-cy)*(x-cx)+(cx-bx)*(y-cy))/d,l2=((cy-ay)*(x-cx)+(ax-cx)*(y-cy))/d,l3=1-l1-l2;if(l1<0||l2<0||l3<0)continue;
      const z=l1*pa.getZ(a)+l2*pa.getZ(b)+l3*pa.getZ(c);if(z>bz){bz=z;best={z,u:l1*uv.getX(a)+l2*uv.getX(b)+l3*uv.getX(c),v:l1*uv.getY(a)+l2*uv.getY(b)+l3*uv.getY(c)}}}return best};
  const lum=h=>{if(!h||!P)return 1;const px=Math.min(P.w-1,Math.max(0,Math.round(h.u*P.w))),py=Math.min(P.h-1,Math.max(0,Math.round((P.flip?1-h.v:h.v)*P.h)));const o=(py*P.w+px)*4;return(P.d[o]*.3+P.d[o+1]*.55+P.d[o+2]*.15)/255};
  // the lip line: darkest point straight down the middle of the face (averaged over a few millimetres sideways)
  let my=my0,mz=zf,best=1e9,skin=0,sn=0;const st=.0007;
  if(P&&uv){for(let y=my0-win;y<=my0+win*.6;y+=st){let L=0,k=0,zz=-1e9;for(const dx of[-.004,0,.004]){const h=hit(hp.x+dx,y);if(h&&h.z>zf-.022*H){L+=lum(h);k++;if(h.z>zz)zz=h.z}}if(!k)continue;L/=k;skin+=L;sn++;
      // prefer lines near the rough estimate (nostrils and chin shadows sit at the edges of the window)
      const sc=L+Math.abs(y-my0)/win*.12;if(sc<best){best=sc;my=y;mz=zz}}}
  else{const h=hit(hp.x,my0);if(h)mz=h.z}
  skin=sn?skin/sn:1;
  // width: walk sideways along the lip line while it stays dark
  let half=.022*H*.5;if(P&&uv){const thr=best+(skin-best)*.78;let x=0;for(;x<.04*H;x+=st){const h=hit(hp.x+x,my),h2=hit(hp.x-x,my);if(lum(h)>thr&&lum(h2)>thr)break}if(x>.006*H)half=Math.min(.03*H,Math.max(.007*H,x))}
  const rgb=h=>{if(!h||!P)return null;const px=Math.min(P.w-1,Math.max(0,Math.round(h.u*P.w))),py=Math.min(P.h-1,Math.max(0,Math.round((P.flip?1-h.v:h.v)*P.h)));const o=(py*P.w+px)*4;return[P.d[o]/255,P.d[o+1]/255,P.d[o+2]/255]};
  const acc=[0,0,0];let an=0;for(const[dx,dy]of[[-.016,.011],[.016,.011],[-.022,0],[.022,0],[0,-.016],[-.012,-.013],[.012,-.013],[-.008,.012],[.008,.012]]){const c=rgb(hit(hp.x+dx,my+dy));if(c&&c[0]+c[1]+c[2]>.6){acc[0]+=c[0];acc[1]+=c[1];acc[2]+=c[2];an++}}
  const skinC=an?new THREE.Color(acc[0]/an,acc[1]/an,acc[2]/an):new THREE.Color(.9,.7,.6);
  return T.userData.mcal={mc:new THREE.Vector3(hp.x,my,mz),H,half,hi,sm,my0,best,skin,skinC}};
/* the face itself: the painted mouth is covered with skin and a clean anime mouth is drawn on the surface; it opens with the voice, the lower lip and chin follow */
gsMouthInject=function(m,U){const prev=m.onBeforeCompile,pk=m.customProgramCacheKey;
  m.onBeforeCompile=function(sh,r){if(prev&&prev!==THREE.Material.prototype.onBeforeCompile)prev.call(this,sh,r);for(const k of['uMouth','uMC','uMOn','uMSkin','uMW','uMEr','uMCurve','uMHt','uMJaw','uMNar','uMSlim'])sh.uniforms[k]=U[k];
    sh.vertexShader=sh.vertexShader.replace('#include <common>','#include <common>\nuniform float uMouth,uMW,uMOn,uMJaw,uMNar,uMSlim;uniform vec3 uMC;varying vec3 vMp;').replace('#include <begin_vertex>',`#include <begin_vertex>
vMp=transformed;
{vec3 d=transformed-uMC;float fr=smoothstep(-.03,-.012,d.z);float cx=smoothstep(.006,.018,abs(d.x))*(1.-smoothstep(.028,.042,abs(d.x)));float cy=1.-smoothstep(.004,.011,abs(d.y+.0005));transformed.x-=sign(d.x)*uMNar*.016*cx*cy*fr*uMJaw;
 float sy=smoothstep(-.09,-.04,d.y)*(1.-smoothstep(.02,.075,d.y));float sz=smoothstep(-.16,-.07,d.z);transformed.x=uMC.x+(transformed.x-uMC.x)*(1.-uMSlim*sy*sz*(1.-smoothstep(.08,.13,abs(d.x))));}
{vec3 d=transformed-uMC;float front=smoothstep(-.03,-.012,d.z);float jx=1.-smoothstep(uMW*.9,uMW*2.,abs(d.x));float jy=smoothstep(-.001,-.006,d.y)*(1.-smoothstep(.03,.055,-d.y));
 transformed.y-=uMouth*uMJaw*.0032*jx*jy*front;}`);
    sh.fragmentShader=sh.fragmentShader.replace('#include <common>','#include <common>\nuniform float uMouth,uMW,uMEr,uMOn,uMCurve,uMHt;uniform vec3 uMC,uMSkin;varying vec3 vMp;').replace('#include <map_fragment>',`#include <map_fragment>
if(uMOn>.5){vec3 d=vMp-uMC;float front=smoothstep(-.026,-.014,d.z);
 // cover the painted mouth with skin
 float er=(1.-smoothstep(.55,1.,length(vec2(d.x/uMEr,(d.y+.001)/.0085))))*front;diffuseColor.rgb=mix(diffuseColor.rgb,uMSkin,er);
 // the new mouth: a soft line, a little curve, corners fading out
 float t=clamp(d.x/uMW,-1.,1.);float yl=uMCurve*t*t*.0022;float cf=1.-smoothstep(.75,1.05,abs(d.x/uMW));
 float o=uMouth*uHtO(t);
 float lineD=abs(d.y-yl)-.00045;float line=(1.-smoothstep(0.,.00045,lineD))*cf*front;
 float inside=step(d.y,yl)*step(yl-o,d.y)*cf*front*step(.02,uMouth);
 float iy=clamp((yl-d.y)/max(o,1e-4),0.,1.);
 vec3 inC=mix(vec3(.16,.04,.05),vec3(.08,.02,.025),smoothstep(.2,.7,iy));inC=mix(inC,vec3(.86,.83,.79),(1.-smoothstep(.12,.3,iy))*(1.-smoothstep(.45,.8,abs(t)))*smoothstep(.25,.6,uMouth)*.85);
 float lip=(1.-smoothstep(.0,.0022,abs(d.y-(yl-o)-.0006)))*cf*front*smoothstep(.05,.3,uMouth);
 diffuseColor.rgb=mix(diffuseColor.rgb,uMSkin*vec3(.86,.62,.6),lip*.45);
 diffuseColor.rgb=mix(diffuseColor.rgb,vec3(.28,.09,.09),line*.85);
 diffuseColor.rgb=mix(diffuseColor.rgb,inC,inside);}`).replace('void main() {','float uHtO(float t){return uMHt*(1.-t*t*.85);}\nvoid main() {')};
  m.customProgramCacheKey=function(){return(pk?pk.call(this):'')+'|mouth3'};m.needsUpdate=true};
/* per character: size of the new mouth, how much of the old one to cover, smile curve, how far it opens */
const MOUTHK={kaen:{w:.0145,er:.031,cu:-.15,ht:.0062},kaen_lb:{w:.0145,er:.03,cu:-.15,ht:.0062},maelle:{w:.0125,er:.022,cu:.35,ht:.0058},lyra:{w:.0095,er:.017,cu:.5,ht:.0048}};
{const _pl=gsPostLoad;gsPostLoad=function(g,T,key,U){const K=MOUTHK[key]||MOUTHK.maelle;
  U.uMW={value:K.w};U.uMEr={value:K.er};U.uMCurve={value:K.cu};U.uMHt={value:K.ht};U.uMOn={value:0};U.uMJaw={value:0};U.uMNar={value:key==='kaen'?.42:key==='kaen_lb'?.16:0};U.uMSlim={value:key==='kaen'?.2:0};U.uMSkin={value:new THREE.Color(.9,.7,.6)};T.userData.gsKey=key;
  _pl.apply(this,arguments);if(U.uNar)U.uNar.value=0;
  try{const c=gsMouthCal(T);if(!c)return;U.uMC.value.copy(c.mc);U.uMSkin.value.copy(c.skinC);U.uMOn.value=0;U.uMJaw.value=g.userData.gsGhostM?0:1}catch(x){console.warn('mouth',x)}}}
