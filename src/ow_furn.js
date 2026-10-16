/* ---------- street furniture & shops ---------- */
const _barkC=new THREE.Color('#7d7a62');
function addTree(get,x,z,s,h){const y=terrainH(x,z);const R=mulberry(h);const m=U*(.9+.1*s)*Math.min(1.6,.85+s*.25);// Paris plane tree, metres*m
  const th=4.6+R()*1.2,tr=.2+R()*.06,lean=(R()-.5)*.08;get('props').add(TG.cyl,MX(x,y+th*m/2,z,0,tr*m,th*m,tr*m,lean,lean),_barkC.clone().offsetHSL(0,0,(R()-.5)*.08));
  const tint=new THREE.Color().setHSL(.2+R()*.07,.3+R()*.14,.42+R()*.12);if(R()<.1)tint.setHSL(.11+R()*.04,.5,.5);
  const nb=3+(R()*2|0);for(let b=0;b<nb;b++){const a=b/nb*TAU+R();const bl=2.2+R()*.8;get('props').add(TG.cyl,MX(x+Math.sin(a)*bl*.22*m,y+(th+bl*.42)*m,z+Math.cos(a)*bl*.22*m,a,.09*m,bl*m,.09*m,.5,0),_barkC)}
  const cy=th+4.2+R(),rw=3.6+R()*1.2,rh=3.2+R()*.8;const n=8+(R()*3|0);
  for(let k=0;k<n;k++){const a=R()*TAU,u=Math.sqrt(R())*.62,v=(R()-.35)*.9;const r=(1.5+R()*1.1)*(1-u*.35);const c=tint.clone().offsetHSL((R()-.5)*.03,0,(R()-.5)*.07+v*.06);
    get('leaf').add(TG.blob,MX(x+Math.sin(a)*u*rw*m,y+(cy+v*rh)*m,z+Math.cos(a)*u*rw*m,R()*TAU,r*m*(1.05+R()*.3),r*m*(.8+R()*.2),r*m*(1.05+R()*.3)),c)}
  get('leaf').add(TG.blob,MX(x,y+cy*m,z,R()*TAU,rw*.8*m,rh*.75*m,rw*.8*m),tint)}
function addLamp(get,lamps,x,z){const y=terrainH(x,z);get('props').add(TG.cyl,MX(x,y+2.2,z,0,.1,4.4,.1),COL.dark);get('props').add(TG.cone,MX(x,y+5,z,0,.42,.35,.42),COL.dark);get('glow').add(TG.cyl,MX(x,y+4.55,z,0,.24,.6,.24),COL.warm);
  get('cone').add(TG.lampCone,MX(x,y+4.4,z));get('pool').add(TG.flat,MX(x,y+.3,z,0,9,1,9));lamps.push(x,y+4.6,z)}
function addStall(get,x,z,h){const y=terrainH(x,z),R=mulberry(h),ry=R()*Math.PI;get('props').add(TG.box,MX(x,y+.45,z,ry,2.4,.9,1.2),COL.stall);
  const cols=['#e04030','#f0a020','#60b030','#d06020','#f0e060','#a02060','#3060c0'];for(let k=0;k<6;k++)get('props').add(TG.sph,MX(x+(R()-.5)*1.8*Math.cos(ry),y+1.05,z-(R()-.5)*1.8*Math.sin(ry),0,.28,.22,.28),new THREE.Color(pickR(R,cols)));
  for(const s of[-1,1])for(const t of[-1,1])get('props').add(TG.cyl,MX(x+s*1.1*Math.cos(ry)+t*.5*Math.sin(ry),y+1.2,z-s*1.1*Math.sin(ry)+t*.5*Math.cos(ry),0,.04,2.4,.04),COL.dark);
  get('sign').add(TG.box,MX(x,y+2.45,z,ry,2.8,.08,1.6,.1),null,SIGNUV['aw'+((h>>>3)%6)])}
const CARCOL=['#202428','#e8e8ec','#8a1a1a','#2a3a5a','#6a6a70','#1a3a2a','#c0a060','#d0d4d8','#3a5a8a','#101010'].map(c=>new THREE.Color(c));
function addCar(get,C,x,z,ry,R){const y=terrainH(x,z),col=pickR(R,CARCOL),s=R()<.2?1.15:1;get('cars').add(TG.box,MX(x,y+.62,z,ry,1.9*s,.75,4.2*s),col);get('glass').add(TG.box,MX(x-Math.sin(ry)*.2,y+1.25,z-Math.cos(ry)*.2,ry,1.7*s,.62,2.2*s));
  for(const f of[1.4,-1.4])get('props').add(TG.cyl,MX(x+Math.sin(ry)*f*s,y+.34,z+Math.cos(ry)*f*s,ry,.34,2*s,.34,0,Math.PI/2),COL.dark);
  for(const s2 of[-1,1])get('glow').add(TG.box,MX(x+Math.sin(ry)*2.1*s+Math.cos(ry)*s2*.6,y+.75,z+Math.cos(ry)*2.1*s-Math.sin(ry)*s2*.6,ry,.3,.15,.05),COL.white);
  for(const f of[1.1,-1.1]){const cx=x+Math.sin(ry)*f*s,cz=z+Math.cos(ry)*f*s;const bx={cx,cz,r:1.05,x0:cx-1.05,x1:cx+1.05,z0:cz-1.05,z1:cz+1.05,h:y+1.5,car:true,circ:true};hbAdd(bx);C.boxes.push(bx)}}
const SHOPNAMES={bakery:['Boulangerie Dupain','Au Bon Croissant','Maison Levain','La Mie Dorée','Aux Délices','Le Fournil'],cafe:['Le Petit Zinc','Café des Artistes','Le Sélect-ish','Café de la Paix du Coin','Le Comptoir','Chez Jeannette'],florist:['Les Fleurs de Lune','Pétales','Au Jardin'],pharmacy:['Pharmacie du Pont','Pharmacie Centrale','Grande Pharmacie'],fromagerie:['Fromagerie Brie-Brie','La Cave à Fromages'],
  tabac:['Le Balto','Tabac de la Place','Le Narval'],creperie:['Crêperie Ty Breizh','La Crêpe Dentelle'],bookshop:['Librairie des Quais','Le Livre Ouvert','Shakespeare-ish & Co'],epicerie:['Épicerie Fine','Chez Momo','L\'Épicerie du Coin'],primeur:['Primeur du Marché','Fruits de Saison'],brasserie:['Brasserie Lipp-ish','La Coupole du Coin','Le Grand Café'],coiffure:['Salon Élégance','Coupe & Style'],
  boutique:['Maison Aurèle','Maison Delacroix','Maison Solène'],galerie:['Galerie Lumière','Galerie Onze'],vintage:['Vintage Frip','Le Grenier'],bazar:['Bazar du Nord','Tout à 2 Euros','Le Grand Bazar'],tissus:['Tissus du Marché','Au Rouleau d\'Or','Tissus Saint-Pierre-ish'],telephonie:['Phone Clinic','Réparation Express'],bistrot:['Le Bistrot d\'Abbesses','Chez Suzon'],souvenirs:['Souvenirs de Paris','La Petite Tour'],
  bar:['Le Bar Rouge','Le Zinc de Nuit','La Cigale-ish Bar'],cabaret:['Cabaret Minuit','Les Folies Roses'],hotel:['Hôtel des Artistes','Hôtel du Moulin'],music:['Guitares Pigalle','Musique & Co'],traiteur:['Traiteur Lotus','Le Dragon d\'Or','Délices d\'Asie']};
function addShop(get,C,ty,fx,fz,ry,base,len,R,zn){const ox=Math.sin(ry),oz=Math.cos(ry),w=Math.min(len*.8,7);get('sign').add(TG.plane,MX(fx+ox*.12,base+3.9,fz+oz*.12,ry,w,1.1,1),null,SIGNUV[ty]);get('shopwin').add(TG.plane,MX(fx+ox*.1,base+1.75,fz+oz*.1,ry,w*.88,3.1,1),new THREE.Color(ty==='cabaret'||ty==='bar'?'#ff90c0':ty==='pharmacy'?'#d0fff0':'#ffffff'));
  if(ty==='pharmacy')get('glow').add(TG.box,MX(fx+ox*.7+Math.cos(ry)*w*.55,base+4.6,fz+oz*.7-Math.sin(ry)*w*.55,ry,.9,.9,.2),new THREE.Color('#20ff60'));
  if(R()<.55&&ty!=='pharmacy'){const a=(R()*6)|0;get('sign').add(TG.plane,MX(fx+ox*1.1,base+3.1,fz+oz*1.1,ry,w,2.4,1,-.9),null,SIGNUV['aw'+a])}
  if(ty==='cafe'||ty==='bistrot'||ty==='brasserie'||ty==='creperie'){for(let k=-1;k<=1;k++){const tx=fx+ox*2.3+Math.cos(ry)*k*2,tz=fz+oz*2.3-Math.sin(ry)*k*2;get('props').add(TG.cyl12,MX(tx,base+.95,tz,0,.5,.06,.5),COL.tableTop);get('props').add(TG.cyl,MX(tx,base+.47,tz,0,.06,.95,.06),COL.tableTop);for(const s of[-1,1]){get('props').add(TG.box,MX(tx+Math.cos(ry)*s*.7,base+.45,tz-Math.sin(ry)*s*.7,ry,.45,.9,.45),COL.cane);const st={x:tx+Math.cos(ry)*s*1.05,z:tz-Math.sin(ry)*s*1.05,face:Math.atan2(-Math.cos(ry)*s,Math.sin(ry)*s),chunk:C,used:null};C.seats.push(st);(OW.seats||(OW.seats=[])).push(st)}}}
  if(ty==='primeur'||ty==='fromagerie'||ty==='florist')addStall(get,fx+ox*1.5,fz+oz*1.5,(R()*1e6)|0);
  const s={type:ty,name:pickR(R,SHOPNAMES[ty]||['Boutique']),x:fx+ox*1.8,z:fz+oz*1.8,fx,fz,r:ry,zone:zn.name,chunk:C};C.shops.push(s);OW.shops.push(s)}
function addEntrance(get,C,e){// Guimard entrance with a real stairwell going down
  const y=terrainH(e.x,e.z),ry=e.r,c=Math.cos(ry),s=Math.sin(ry);const at=(u,v)=>[e.x+c*u+s*v,e.z-s*u+c*v];const W2=1.55,V0=-.3,V1=-7.4,DEP=4.9;
  // opening (stencil hole) exactly over the stairwell
  {const h=get('hole');const q=[at(-W2,V0),at(W2,V0),at(W2,V1),at(-W2,V1)];const v0=h.v;for(const p of q){h.p.push(p[0],y+.03,p[1]);h.n.push(0,1,0);h.u.push(0,0);h.c.push(1,1,1)}h.i.push(v0,v0+1,v0+2,v0,v0+2,v0+3,v0,v0+2,v0+1,v0,v0+3,v0+2);h.v+=4}
  const tile=new THREE.Color('#e8e4da'),stone=new THREE.Color('#9a948a'),green=COL.green,dark=new THREE.Color('#141418');
  // steps
  const N=14;for(let k=0;k<N;k++){const v=V0-(k+.5)*(V0-V1-1.4)/N,yy=y-(k+1)*DEP/N;const p=at(0,v);get('props').add(TG.box,MX(p[0],yy+DEP/N/2-.02,p[1],ry,W2*2,DEP/N,(V0-V1-1.4)/N+.02),k%2?stone:new THREE.Color('#a8a298'))}
  {const p=at(0,V1+.7);get('props').add(TG.box,MX(p[0],y-DEP-.1,p[1],ry,W2*2,.2,1.4),stone)}
  // side walls (white metro tiles) and back wall with a dark corridor
  for(const u of[-W2-.1,W2+.1]){const p=at(u,(V0+V1)/2);get('props').add(TG.box,MX(p[0],y-DEP/2+.05,p[1],ry,.2,DEP+.1,V0-V1),tile)}
  {const p=at(0,V1-.1);get('props').add(TG.box,MX(p[0],y-DEP/2+.05,p[1],ry,W2*2+.4,DEP+.1,.2),tile);const d=at(0,V1+.02);get('glow').add(TG.box,MX(d[0],y-DEP+1.2,d[1],ry,2,2.3,.05),new THREE.Color('#1a1510'))}
  {const p=at(0,V0-.05);get('props').add(TG.box,MX(p[0],y-DEP/2+.05,p[1],ry,W2*2+.4,DEP+.1,.1),tile)}
  // ceiling light strip in the corridor
  {const p=at(0,V1+1.5);get('glow').add(TG.box,MX(p[0],y-1.2,p[1],ry,.3,.05,2),new THREE.Color('#fff4d8'))}
  // granite curb around the opening
  for(const u of[-W2-.2,W2+.2]){const p=at(u,(V0+V1)/2);get('props').add(TG.box,MX(p[0],y+.07,p[1],ry,.4,.18,V0-V1+.4),stone)}{const p=at(0,V1-.2);get('props').add(TG.box,MX(p[0],y+.07,p[1],ry,W2*2+.8,.18,.4),stone)}
  // Guimard railings, lamps and the METROPOLITAIN arch
  for(const u of[-W2-.2,W2+.2]){for(let v=V0-.6;v>V1;v-=1.1){const p=at(u,v);get('props').add(TG.box,MX(p[0],y+.55,p[1],ry,.05,1,.05),green)}const p=at(u,(V0+V1)/2);get('props').add(TG.box,MX(p[0],y+1.02,p[1],ry,.09,.08,V0-V1),green);get('props').add(TG.box,MX(p[0],y+.25,p[1],ry,.06,.06,V0-V1),green)}
  {for(let q=-W2;q<=W2;q+=1.1){const p=at(q,V1-.2);get('props').add(TG.box,MX(p[0],y+.55,p[1],ry,.05,1,.05),green)}const p=at(0,V1-.2);get('props').add(TG.box,MX(p[0],y+1.02,p[1],ry,W2*2+.4,.08,.09),green)}
  for(const u of[-W2-.2,W2+.2]){const p=at(u,0);get('props').add(TG.cyl,MX(p[0],y+1.6,p[1],0,.09,3.2,.09),green);get('glow').add(TG.sph,MX(p[0],y+3.35,p[1],0,.2,.32,.2),COL.orange)}
  get('props').add(TG.torusHalf,MX(e.x,y+2.9,e.z,ry,1.75,1.6,1.75),green);get('sign').add(TG.box,MX(e.x,y+2.85,e.z,ry,3.2,.5,.06),null,SIGNUV.metro);
  e.y=y;e.W2=W2;e.V0=V0;e.V1=V1;e.DEP=DEP}
