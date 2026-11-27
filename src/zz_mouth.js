/* ================= talking mouths, done properly =================
   1. Find the painted mouth on each model: scan the front of the face, sample its texture, take the darkest line between nose and chin (the lip line), and its width.
   2. When the character speaks, a small mouth opening (dark inside, a hint of upper teeth, soft edges) grows down from that line, parented to the head bone.
   3. The chin and lower lip drop by a few millimetres with it. Nothing else on the face moves. */
const MOUTH={tex:null};
function mouthTex(){if(MOUTH.tex)return MOUTH.tex;const W=256,H=128,c=document.createElement('canvas');c.width=W;c.height=H;const x=c.getContext('2d');
  const shape=()=>{x.beginPath();x.moveTo(W*.04,H*.2);x.bezierCurveTo(W*.3,H*.1,W*.7,H*.1,W*.96,H*.2);x.bezierCurveTo(W*.8,H*.95,W*.2,H*.95,W*.04,H*.2);x.closePath()};
  x.filter='blur(3px)';shape();const g=x.createRadialGradient(W*.5,H*.55,4,W*.5,H*.5,W*.5);g.addColorStop(0,'#1a0507');g.addColorStop(.55,'#2c0a0d');g.addColorStop(1,'#5a1c20');x.fillStyle=g;x.fill();
  x.save();x.filter='blur(2px)';shape();x.clip();const t=x.createLinearGradient(0,H*.12,0,H*.34);t.addColorStop(0,'rgba(236,228,218,.95)');t.addColorStop(1,'rgba(150,130,125,0)');x.fillStyle=t;x.fillRect(W*.2,0,W*.6,H*.36);
  const tg=x.createLinearGradient(0,H*.6,0,H*.85);tg.addColorStop(0,'rgba(140,50,60,0)');tg.addColorStop(1,'rgba(150,56,64,.55)');x.fillStyle=tg;x.fillRect(W*.25,H*.6,W*.5,H*.3);x.restore();
  const T=new THREE.CanvasTexture(c);T.anisotropy=4;MOUTH.tex=T;return T}
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
  return T.userData.mcal={mc:new THREE.Vector3(hp.x,my,mz),H,half,hi,sm,my0,best,skin}};
/* the face itself: only the chin and lower lip drop a little; Kaen's lip corners pull in a touch */
gsMouthInject=function(m,U){const prev=m.onBeforeCompile,pk=m.customProgramCacheKey;
  m.onBeforeCompile=function(sh,r){if(prev&&prev!==THREE.Material.prototype.onBeforeCompile)prev.call(this,sh,r);for(const k of['uMouth','uMC','uMH','uNar','uMW'])sh.uniforms[k]=U[k];
    sh.vertexShader=sh.vertexShader.replace('#include <common>','#include <common>\nuniform float uMouth,uMH,uNar,uMW;uniform vec3 uMC;').replace('#include <begin_vertex>',`#include <begin_vertex>
{vec3 d=transformed-uMC;float r=uMH;float front=smoothstep(-.03*r,-.008*r,d.z);
 float jx=1.-smoothstep(uMW*.8,uMW*1.6,abs(d.x));float jy=smoothstep(.0,-.004*r,d.y)*(1.-smoothstep(.045*r,.075*r,-d.y));
 transformed.y-=uMouth*.0042*jx*jy*front;
 float cx=smoothstep(uMW*.35,uMW*.95,abs(d.x))*(1.-smoothstep(uMW*1.1,uMW*1.7,abs(d.x)))*(1.-smoothstep(.004*r,.012*r,abs(d.y)))*front;transformed.x-=sign(d.x)*uNar*uMW*cx;}`)};
  m.customProgramCacheKey=function(){return(pk?pk.call(this):'')+'|mouth2'};m.needsUpdate=true};
/* the opening itself */
{const _pl=gsPostLoad;gsPostLoad=function(g,T,key,U){U.uMW={value:.012};T.userData.gsKey=key;_pl.apply(this,arguments);U.uNar.value=key==='kaen'||key==='kaen_lb'?.22:0;
  try{const c=gsMouthCal(T);if(!c)return;U.uMW.value=c.half;if(g.userData.gsGhostM)return;
    const sk=c.sm.skeleton,bone=sk.bones[c.hi],BI=sk.boneInverses[c.hi];const sc=new THREE.Vector3().setFromMatrixScale(BI).x;
    const pos=new THREE.Vector3(c.mc.x,c.mc.y+(key==='lyra'?.0022:.0006),c.mc.z+.0012).applyMatrix4(BI);const q=new THREE.Quaternion().setFromRotationMatrix(new THREE.Matrix4().extractRotation(BI));
    const geo=new THREE.PlaneGeometry(1,1);geo.translate(0,-.32,0);
    const mt=new THREE.MeshBasicMaterial({map:mouthTex(),transparent:true,depthWrite:false,polygonOffset:true,polygonOffsetFactor:-2,polygonOffsetUnits:-4});
    const me=new THREE.Mesh(geo,mt);me.position.copy(pos);me.quaternion.copy(q);me.renderOrder=3;me.frustumCulled=false;me.userData.gsKeep=true;
    const MWK={lyra:.62},MHK={lyra:.75,maelle:.9};const w=Math.max(c.half*2*(key==='kaen'||key==='kaen_lb'?.92:1),.026*c.H*.6)*(MWK[key]||1);me.userData.mw={w:w*sc,h:.0085*sc*(MHK[key]||1)};me.scale.set(w*sc,.0001,1);me.visible=false;bone.add(me);U.mouthMesh=me}catch(x){console.warn('mouth',x)}}}
/* open it with the voice */
{const _mt=muTick;muTick=function(dt){_mt(dt);for(const e of GS.list){const me=e.U&&e.U.mouthMesh;if(!me)continue;const k=e.U.uMouth.value;me.visible=k>.06;if(me.visible){const s=me.userData.mw;me.scale.set(s.w*(.9+k*.12),s.h*Math.pow(k,.85),1)}}}}
