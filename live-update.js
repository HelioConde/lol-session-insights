(() => {
  "use strict";
  const CHECK_INTERVAL_MS=12000, VERSION_URL="version.json", CACHE_BUST_PARAM="__v";
  const LOCAL_HOSTS=new Set(["localhost","127.0.0.1","::1"]);
  if(LOCAL_HOSTS.has(window.location.hostname)) return;
  let currentVersion=null, checking=false, reloading=false;
  const versionValue=p=>String(p?.sha||p?.version||"").trim();
  async function fetchVersion(){const r=await fetch(VERSION_URL+"?_="+Date.now(),{cache:"no-store",credentials:"same-origin"});if(!r.ok)throw new Error("version-check-"+r.status);return versionValue(await r.json());}
  function showNotice(){if(document.getElementById("live-update-notice"))return;const n=document.createElement("div");n.id="live-update-notice";n.setAttribute("role","status");n.setAttribute("aria-live","polite");n.textContent="Nova versão publicada. Atualizando automaticamente…";Object.assign(n.style,{position:"fixed",left:"50%",bottom:"18px",transform:"translateX(-50%)",zIndex:"2147483647",maxWidth:"calc(100vw - 24px)",padding:"10px 14px",borderRadius:"999px",background:"#171717",color:"#fff",font:"600 12px/1.35 system-ui,sans-serif",boxShadow:"0 10px 35px rgba(0,0,0,.25)",textAlign:"center"});document.body.appendChild(n);}
  async function reloadFresh(v){if(reloading)return;reloading=true;showNotice();try{if("caches"in window){const keys=await caches.keys();await Promise.allSettled(keys.map(k=>caches.delete(k)));}}catch{}await new Promise(r=>setTimeout(r,650));const u=new URL(window.location.href);u.searchParams.set(CACHE_BUST_PARAM,v.slice(0,16)||Date.now().toString());window.location.replace(u.toString());}
  async function checkVersion(){if(checking||reloading)return;checking=true;try{const v=await fetchVersion();if(!v)return;if(currentVersion===null)currentVersion=v;else if(v!==currentVersion)await reloadFresh(v);}catch{}finally{checking=false;}}
  const u=new URL(window.location.href);if(u.searchParams.has(CACHE_BUST_PARAM)){u.searchParams.delete(CACHE_BUST_PARAM);window.history.replaceState(null,"",u.pathname+u.search+u.hash);}
  checkVersion();window.setInterval(checkVersion,CHECK_INTERVAL_MS);window.addEventListener("focus",checkVersion);document.addEventListener("visibilitychange",()=>{if(document.visibilityState==="visible")checkVersion();});
})();
