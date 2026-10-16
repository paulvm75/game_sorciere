
/* ---------- Orson's face on his dialogue lines, living water, no more sinking ---------- */
if(typeof ORSON_FACE!=='undefined'){PORTRAITS['Orson']='orson_face';PORT_URL['orson_face']=ORSON_FACE}
{const _mt=muTick;muTick=function(dt){_mt(dt);try{
  const t=performance.now()*.001;for(const m of[OW.waterMat,OW.basinMat]){const sh=m&&m.userData.sh;if(sh&&sh.uniforms.uT)sh.uniforms.uT.value=t}
  if(MODE==='open'&&started&&!CS.active)antiSink(dt)}catch(e){}}}
/* safety net: if the witch ends up inside the ground (not swimming, not in a venue or the metro), lift her back out */
const SINK={t:0};
function antiSink(dt){if(!P.alive||P.climb||P.stairs||P.flying||(typeof VIN!=='undefined'&&VIN))return;const g=groundAt(P.pos.x,P.pos.z,P.pos.y);
  if(P.swim){const lv=waterLevelAt(P.pos.x,P.pos.z);if(P.pos.y<lv-1.4){P.pos.y=lv-.85;P.vy=Math.max(P.vy||0,0)}return}
  if(P.pos.y<g-.35){SINK.t+=dt;if(SINK.t>.12){P.pos.y=g;P.vy=Math.max(P.vy||0,0);P.onGround=true;SINK.t=0}}else SINK.t=0}
