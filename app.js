const RECENT_KEY = "lol-session-insights:recent:v1";
const LANGUAGE_KEY = "lol-session-insights:language";
const SESSION_GAP_MS = 90 * 60 * 1000;

const ui = {
  pt: {
    eyebrow:"LEAGUE OF LEGENDS · SESSÕES RECENTES",
    heroTitle:'Uma partida conta o resultado. <span>A sessão conta o padrão.</span>',
    heroText:"Agrupe suas partidas recentes por blocos de jogo e veja quando o desempenho estabiliza, melhora ou cai — sem transformar um jogo ruim em diagnóstico.",
    riotId:"Riot ID",server:"Servidor",analyze:"Analisar sessões",
    privacy:"Consulta pública via backend server-side. Nenhuma chave Riot fica no navegador.",recent:"Buscas recentes",
    whatChanges:"O QUE MUDA NA SESSÃO",signal1:"Começo x fim",signal1Text:"KDA, mortes e resultado ao longo do bloco.",
    signal2:"Troca de rota/campeão",signal2Text:"Quando você muda o plano no meio da sessão.",
    signal3:"Duração e ritmo",signal3Text:"Quantas partidas e quanto tempo você ficou jogando.",
    loadingTitle:"Lendo suas partidas recentes…",loadingText:"A primeira consulta pode demorar um pouco enquanto o backend busca e coloca partidas em cache.",
    analysis:"ANÁLISE DE SESSÃO",allModes:"Todos",sessions:"Sessões",sessionsHelp:"blocos detectados",
    avgGames:"Média por sessão",avgGamesHelp:"partidas por bloco",longest:"Mais longa",longestHelp:"partidas seguidas",
    stable:"Sessões estáveis",stableHelp:"sem queda forte no fim",timeline:"LINHA DO TEMPO",recentSessions:"Sessões recentes",
    latest:"SESSÃO MAIS RECENTE",latestTitle:"Como ela terminou?",ad:"PUBLICIDADE",adNote:"espaço reservado · fora da leitura principal",
    matchesEyebrow:"PARTIDAS DA SESSÃO",selectSession:"Selecione uma sessão",methodEyebrow:"COMO CALCULAMOS",
    methodTitle:"Sinais, não rótulos.",methodText:"Partidas com menos de 90 minutos entre si entram no mesmo bloco. A tendência compara começo e fim usando KDA, mortes e resultado recente. Isso descreve a amostra; não mede “tilt”, habilidade ou estado emocional.",
    riotDisclaimer:"Produto independente. League of Legends e Riot Games são marcas da Riot Games, Inc.",
    about:"Sobre",privacyLink:"Privacidade",terms:"Termos",loading:"Consultando Riot…",
    invalid:"Use o formato Nome#TAG.",notFound:"Riot ID não encontrado. Confira o nome, a tag e o servidor.",
    rate:"A Riot limitou temporariamente as consultas. Tente novamente em alguns instantes.",
    unavailable:"Os dados ao vivo estão indisponíveis agora. Tente novamente mais tarde.",
    loaded:"Dados Riot carregados.",noMatches:"Não há partidas suficientes neste filtro para montar uma sessão.",
    sample:function(matches,sessions){return matches+" partidas recentes · "+sessions+" sessões detectadas · intervalo máximo de 90 min";},
    sessionLabel:function(index){return "Sessão "+index;},games:function(n){return n+" partidas";},
    timePlayed:"Tempo em jogo",trend:"Tendência",champions:"Campeões",roleChanges:"Trocas de rota",champChanges:"Trocas de campeão",
    avgKda:"KDA médio",avgDeaths:"Mortes médias",wins:"Vitórias",topChampion:"Mais usado",
    up:"Melhor no fim",down:"Pior no fim",steady:"Estável",upText:"O fim da sessão teve sinal de desempenho melhor que o começo.",
    downText:"O fim da sessão teve sinal de desempenho abaixo do começo. Vale revisar o contexto antes de tirar conclusão.",
    steadyText:"O começo e o fim ficaram próximos dentro desta amostra.",win:"Vitória",loss:"Derrota",
    kda:"KDA",deaths:"Mortes",duration:"Duração",recentNone:"Nenhuma busca recente."
  },
  en: {
    eyebrow:"LEAGUE OF LEGENDS · RECENT SESSIONS",
    heroTitle:'One match tells the result. <span>The session tells the pattern.</span>',
    heroText:"Group your recent matches into play blocks and see when performance stabilizes, improves or drops — without turning one bad game into a diagnosis.",
    riotId:"Riot ID",server:"Server",analyze:"Analyze sessions",
    privacy:"Public lookup through a server-side backend. No Riot key is exposed in the browser.",recent:"Recent searches",
    whatChanges:"WHAT CHANGES IN A SESSION",signal1:"Start vs end",signal1Text:"KDA, deaths and result across the block.",
    signal2:"Role/champion switching",signal2Text:"When you change the plan during the session.",
    signal3:"Length and rhythm",signal3Text:"How many games and how long you kept playing.",
    loadingTitle:"Reading your recent matches…",loadingText:"The first lookup may take a little longer while the backend fetches and caches matches.",
    analysis:"SESSION ANALYSIS",allModes:"All",sessions:"Sessions",sessionsHelp:"detected blocks",
    avgGames:"Average per session",avgGamesHelp:"matches per block",longest:"Longest",longestHelp:"matches in a row",
    stable:"Stable sessions",stableHelp:"no strong late drop",timeline:"TIMELINE",recentSessions:"Recent sessions",
    latest:"LATEST SESSION",latestTitle:"How did it end?",ad:"ADVERTISEMENT",adNote:"reserved space · outside the main reading flow",
    matchesEyebrow:"SESSION MATCHES",selectSession:"Select a session",methodEyebrow:"HOW IT WORKS",
    methodTitle:"Signals, not labels.",methodText:"Matches less than 90 minutes apart are grouped into the same block. Trend compares the start and end using KDA, deaths and recent result. It describes the sample; it does not measure tilt, skill or emotional state.",
    riotDisclaimer:"Independent product. League of Legends and Riot Games are trademarks of Riot Games, Inc.",
    about:"About",privacyLink:"Privacy",terms:"Terms",loading:"Checking Riot…",
    invalid:"Use the Name#TAG format.",notFound:"Riot ID not found. Check the name, tag and server.",
    rate:"Riot is temporarily rate limiting requests. Try again in a moment.",
    unavailable:"Live data is unavailable right now. Try again later.",
    loaded:"Riot data loaded.",noMatches:"There are not enough matches in this filter to build a session.",
    sample:function(matches,sessions){return matches+" recent matches · "+sessions+" sessions detected · 90 min max gap";},
    sessionLabel:function(index){return "Session "+index;},games:function(n){return n+" matches";},
    timePlayed:"Time in game",trend:"Trend",champions:"Champions",roleChanges:"Role switches",champChanges:"Champion switches",
    avgKda:"Average KDA",avgDeaths:"Average deaths",wins:"Wins",topChampion:"Most played",
    up:"Better finish",down:"Lower finish",steady:"Stable",upText:"The end of the session showed a stronger performance signal than the start.",
    downText:"The end of the session showed a lower performance signal than the start. Review context before drawing conclusions.",
    steadyText:"The start and end stayed close within this sample.",win:"Win",loss:"Loss",
    kda:"KDA",deaths:"Deaths",duration:"Duration",recentNone:"No recent searches."
  }
};

let lang = localStorage.getItem(LANGUAGE_KEY) === "en" ? "en" : "pt";
let rawMatches = [];
let currentPlayer = null;
let activeFilter = "ALL";
let currentSessions = [];
let selectedSession = 0;
let toastTimer = null;

function $(selector){ return document.querySelector(selector); }
function t(key){ return ui[lang][key] || key; }

function escapeHtml(value){
  return String(value == null ? "" : value).replace(/[&<>"']/g,function(char){
    return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[char];
  });
}

function parseRiotId(value){
  const text = String(value || "").trim();
  const hash = text.lastIndexOf("#");
  if(hash < 1) return null;
  const gameName = text.slice(0,hash).trim();
  const tagLine = text.slice(hash+1).trim();
  if(gameName.length < 2 || tagLine.length < 2 || tagLine.length > 6) return null;
  return {gameName:gameName,tagLine:tagLine};
}

function routingFor(platform){
  if(["br1","na1","la1","la2"].includes(platform)) return "americas";
  if(["kr","jp1"].includes(platform)) return "asia";
  if(["oc1"].includes(platform)) return "sea";
  return "europe";
}

function avg(items,key){
  if(!items.length) return 0;
  return items.reduce(function(sum,item){ return sum + Number(item[key] || 0); },0) / items.length;
}

function topValue(items,key){
  const counts = new Map();
  items.forEach(function(item){
    const value = item[key];
    if(value) counts.set(value,(counts.get(value) || 0) + 1);
  });
  const sorted = Array.from(counts.entries()).sort(function(a,b){ return b[1]-a[1]; });
  return sorted[0] || ["—",0];
}

function matchSignal(match){
  const kda = Math.min(10,Number(match.kda || 0));
  const deaths = Math.min(15,Number(match.deaths || 0));
  return kda + (match.win ? 1 : 0) - deaths * 0.08;
}

function sessionTrend(matches){
  if(matches.length < 3) return "stable";
  const cut = Math.max(1,Math.floor(matches.length/2));
  const first = matches.slice(0,cut);
  const last = matches.slice(matches.length-cut);
  const firstScore = first.reduce(function(sum,m){ return sum+matchSignal(m); },0)/first.length;
  const lastScore = last.reduce(function(sum,m){ return sum+matchSignal(m); },0)/last.length;
  const diff = lastScore-firstScore;
  if(diff > 0.7) return "up";
  if(diff < -0.7) return "down";
  return "stable";
}

function groupSessions(matches){
  const valid = matches.filter(function(match){ return match && match.playedAt; }).slice().sort(function(a,b){
    return Number(a.playedAt)-Number(b.playedAt);
  });
  const groups = [];
  valid.forEach(function(match){
    const previous = groups.length ? groups[groups.length-1] : null;
    if(!previous){
      groups.push([match]);
      return;
    }
    const last = previous[previous.length-1];
    if(Number(match.playedAt)-Number(last.playedAt) > SESSION_GAP_MS) groups.push([match]);
    else previous.push(match);
  });
  return groups.map(function(matchesInSession,index){
    const wins = matchesInSession.filter(function(m){ return Boolean(m.win); }).length;
    const champions = new Set(matchesInSession.map(function(m){ return m.champion; }).filter(Boolean));
    const positions = new Set(matchesInSession.map(function(m){ return m.position; }).filter(Boolean));
    const totalMinutes = matchesInSession.reduce(function(sum,m){ return sum + Number(m.duration || 0); },0);
    let champChanges = 0;
    let roleChanges = 0;
    for(let i=1;i<matchesInSession.length;i++){
      if(matchesInSession[i].champion !== matchesInSession[i-1].champion) champChanges++;
      if(matchesInSession[i].position && matchesInSession[i-1].position && matchesInSession[i].position !== matchesInSession[i-1].position) roleChanges++;
    }
    return {
      id:"session-"+index,
      matches:matchesInSession,
      wins:wins,
      avgKda:avg(matchesInSession,"kda"),
      avgDeaths:avg(matchesInSession,"deaths"),
      champions:Array.from(champions),
      positions:Array.from(positions),
      topChampion:topValue(matchesInSession,"champion")[0],
      totalMinutes:totalMinutes,
      champChanges:champChanges,
      roleChanges:roleChanges,
      trend:sessionTrend(matchesInSession),
      startedAt:Number(matchesInSession[0].playedAt),
      endedAt:Number(matchesInSession[matchesInSession.length-1].playedAt)
    };
  }).reverse();
}

function formatTime(timestamp){
  return new Date(timestamp).toLocaleString(lang === "pt" ? "pt-BR" : "en-US",{day:"2-digit",month:"2-digit",hour:"2-digit",minute:"2-digit"});
}

function formatMinutes(value){
  const minutes = Math.round(Number(value || 0));
  const hours = Math.floor(minutes/60);
  const rest = minutes%60;
  if(hours < 1) return minutes+" min";
  return hours+"h "+String(rest).padStart(2,"0");
}

function trendCopy(trend){
  if(trend === "up") return {label:t("up"),text:t("upText")};
  if(trend === "down") return {label:t("down"),text:t("downText")};
  return {label:t("steady"),text:t("steadyText")};
}

function setStatus(kind,message){
  const host = $("#status");
  host.className = "status"+(kind ? " "+kind : "");
  host.textContent = message || "";
}

function setLoading(value){
  $("#loading").hidden = !value;
  $("#lookup-form").querySelector("button[type=submit]").disabled = value;
  if(value) setStatus("",t("loading"));
}

function readRecent(){
  try{
    const items = JSON.parse(localStorage.getItem(RECENT_KEY) || "[]");
    return Array.isArray(items) ? items.slice(0,5) : [];
  }catch(error){
    return [];
  }
}

function saveRecent(item){
  const key = item.gameName.toLowerCase()+"#"+item.tagLine.toLowerCase()+"@"+item.platform;
  const next = [item].concat(readRecent().filter(function(row){
    return row.gameName.toLowerCase()+"#"+row.tagLine.toLowerCase()+"@"+row.platform !== key;
  })).slice(0,5);
  localStorage.setItem(RECENT_KEY,JSON.stringify(next));
  renderRecent();
}

function renderRecent(){
  const host = $("#recent-searches");
  const items = readRecent();
  host.innerHTML = items.length ? items.map(function(item,index){
    return '<button type="button" class="recent-search" data-recent="'+index+'">'+escapeHtml(item.gameName+"#"+item.tagLine)+" · "+escapeHtml(item.platform.toUpperCase())+'</button>';
  }).join("") : '<span class="muted">'+escapeHtml(t("recentNone"))+'</span>';
}

function applyLanguage(){
  document.documentElement.lang = lang === "pt" ? "pt-BR" : "en";
  document.querySelectorAll("[data-i18n]").forEach(function(element){
    const value = t(element.dataset.i18n);
    if(typeof value === "string" && value.indexOf("<span>") >= 0) element.innerHTML = value;
    else if(typeof value === "string") element.textContent = value;
  });
  $("#language-toggle").textContent = lang === "pt" ? "EN" : "PT-BR";
  $("#source-badge").textContent = lang === "pt" ? "DADOS RIOT" : "RIOT DATA";
  localStorage.setItem(LANGUAGE_KEY,lang);
  renderRecent();
  if(rawMatches.length) renderAnalysis();
}

function filteredMatches(){
  if(activeFilter === "ALL") return rawMatches;
  return rawMatches.filter(function(match){ return String(match.context || "").toUpperCase() === activeFilter; });
}

function renderAnalysis(){
  const matches = filteredMatches();
  currentSessions = groupSessions(matches);
  selectedSession = Math.min(selectedSession,Math.max(0,currentSessions.length-1));

  $("#result").hidden = false;
  $("#player-name").textContent = currentPlayer ? currentPlayer.gameName+"#"+currentPlayer.tagLine : "—";
  $("#sample-note").textContent = ui[lang].sample(matches.length,currentSessions.length);
  $("#metric-sessions").textContent = currentSessions.length || "0";
  $("#metric-games").textContent = currentSessions.length ? (matches.length/currentSessions.length).toFixed(1) : "0";
  $("#metric-longest").textContent = currentSessions.length ? Math.max.apply(null,currentSessions.map(function(s){return s.matches.length;})) : "0";
  $("#metric-stable").textContent = currentSessions.filter(function(s){return s.trend !== "down";}).length;

  $("#session-count").textContent = currentSessions.length ? currentSessions.length+" / "+matches.length : "";
  renderSessions();
  renderLatestInsight();
  renderSelectedSession();
}

function renderSessions(){
  const host = $("#session-list");
  if(!currentSessions.length){
    host.innerHTML = '<div class="latest-insight empty">'+escapeHtml(t("noMatches"))+'</div>';
    return;
  }
  host.innerHTML = currentSessions.map(function(session,index){
    const trend = trendCopy(session.trend);
    return '<button class="session-card '+(index===selectedSession?"active":"")+'" type="button" data-session="'+index+'">'+
      '<div class="session-time"><strong>'+escapeHtml(formatTime(session.startedAt))+'</strong><span>'+escapeHtml(formatMinutes(session.totalMinutes))+'</span></div>'+
      '<div class="session-main"><strong>'+escapeHtml(ui[lang].sessionLabel(index+1))+' · '+escapeHtml(ui[lang].games(session.matches.length))+'</strong>'+
      '<small>'+session.wins+' '+escapeHtml(t("wins"))+' · '+escapeHtml(t("avgKda"))+' '+session.avgKda.toFixed(2)+' · '+session.champions.length+' '+escapeHtml(t("champions").toLowerCase())+'</small></div>'+
      '<span class="trend '+session.trend+'">'+escapeHtml(trend.label)+'</span>'+
      '</button>';
  }).join("");
}

function insightBlock(label,strong,small){
  return '<div class="insight-block"><span>'+escapeHtml(label)+'</span><strong>'+escapeHtml(strong)+'</strong><small>'+escapeHtml(small)+'</small></div>';
}

function renderLatestInsight(){
  const host = $("#latest-insight");
  const session = currentSessions[0];
  if(!session){
    host.className = "latest-insight empty";
    host.textContent = t("noMatches");
    return;
  }
  const trend = trendCopy(session.trend);
  host.className = "latest-insight";
  host.innerHTML =
    insightBlock(t("trend"),trend.label,trend.text)+
    insightBlock(t("topChampion"),session.topChampion,session.champChanges+" · "+t("champChanges"))+
    insightBlock(t("timePlayed"),formatMinutes(session.totalMinutes),session.roleChanges+" · "+t("roleChanges"))+
    insightBlock(t("avgKda"),session.avgKda.toFixed(2),t("avgDeaths")+" "+session.avgDeaths.toFixed(1));
}

function renderSelectedSession(){
  const session = currentSessions[selectedSession];
  if(!session){
    $("#match-panel-title").textContent = t("selectSession");
    $("#match-panel-meta").textContent = "";
    $("#match-list").innerHTML = '<div class="latest-insight empty">'+escapeHtml(t("noMatches"))+'</div>';
    return;
  }

  $("#match-panel-title").textContent = ui[lang].sessionLabel(selectedSession+1);
  $("#match-panel-meta").textContent = ui[lang].games(session.matches.length)+" · "+formatMinutes(session.totalMinutes);
  $("#match-list").innerHTML = session.matches.map(function(match){
    return '<article class="match-row">'+
      '<strong class="match-result '+(match.win?"win":"loss")+'">'+escapeHtml(match.win?t("win"):t("loss"))+'</strong>'+
      '<div class="match-champion"><strong>'+escapeHtml(match.champion || "—")+'</strong><span>'+escapeHtml(match.position || "—")+'</span></div>'+
      '<span class="match-mode">'+escapeHtml(match.queue || match.context || "—")+'</span>'+
      '<div class="stat-cell"><span>'+escapeHtml(t("kda"))+'</span><strong>'+Number(match.kda || 0).toFixed(2)+'</strong></div>'+
      '<div class="stat-cell"><span>'+escapeHtml(t("deaths"))+'</span><strong>'+Number(match.deaths || 0)+'</strong></div>'+
      '<div class="stat-cell"><span>'+escapeHtml(t("duration"))+'</span><strong>'+formatMinutes(match.duration)+'</strong></div>'+
      '</article>';
  }).join("");
}

async function lookup(gameName,tagLine,platform){
  const endpoint = window.LOL_SESSION_BACKEND && window.LOL_SESSION_BACKEND.profile;
  if(!endpoint){
    setStatus("error",t("unavailable"));
    return;
  }

  setLoading(true);
  $("#result").hidden = true;

  try{
    const controller = new AbortController();
    const timer = setTimeout(function(){ controller.abort(); },18000);
    const response = await fetch(endpoint,{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({
        gameName:gameName,
        tagLine:tagLine,
        platform:platform,
        region:routingFor(platform),
        limit:40
      }),
      signal:controller.signal
    });
    clearTimeout(timer);

    const data = await response.json().catch(function(){ return {}; });
    if(!response.ok || data.error){
      if(response.status === 404 || data.error === "player") throw {kind:"notFound"};
      if(response.status === 429) throw {kind:"rate"};
      throw {kind:"unavailable"};
    }

    currentPlayer = data.player || {gameName:gameName,tagLine:tagLine,platform:platform.toUpperCase()};
    rawMatches = Array.isArray(data.matches) ? data.matches.filter(function(match){
      return match && match.eligible !== false && match.playedAt;
    }) : [];

    saveRecent({gameName:currentPlayer.gameName || gameName,tagLine:currentPlayer.tagLine || tagLine,platform:platform});
    updateUrl(currentPlayer.gameName || gameName,currentPlayer.tagLine || tagLine,platform);
    activeFilter = "ALL";
    selectedSession = 0;
    document.querySelectorAll("[data-filter]").forEach(function(button){
      button.classList.toggle("active",button.dataset.filter === "ALL");
    });
    setStatus("success",t("loaded"));
    renderAnalysis();
    $("#result").scrollIntoView({behavior:"smooth",block:"start"});
  }catch(error){
    const kind = error && error.kind ? error.kind : "unavailable";
    setStatus("error",t(kind));
  }finally{
    setLoading(false);
  }
}

function updateUrl(gameName,tagLine,platform){
  const url = new URL(location.href);
  url.searchParams.set("riot",gameName+"#"+tagLine);
  url.searchParams.set("server",platform);
  history.replaceState(null,"",url.pathname+"?"+url.searchParams.toString());
}

$("#lookup-form").addEventListener("submit",function(event){
  event.preventDefault();
  const parsed = parseRiotId($("#riot-id").value);
  if(!parsed){
    setStatus("error",t("invalid"));
    $("#riot-id").focus();
    return;
  }
  lookup(parsed.gameName,parsed.tagLine,$("#server").value);
});

$("#language-toggle").addEventListener("click",function(){
  lang = lang === "pt" ? "en" : "pt";
  applyLanguage();
});

$("#recent-toggle").addEventListener("click",function(){
  const host = $("#recent-searches");
  host.hidden = !host.hidden;
});

document.addEventListener("click",function(event){
  const recent = event.target.closest("[data-recent]");
  if(recent){
    const item = readRecent()[Number(recent.dataset.recent)];
    if(item){
      $("#riot-id").value = item.gameName+"#"+item.tagLine;
      $("#server").value = item.platform;
      $("#recent-searches").hidden = true;
      lookup(item.gameName,item.tagLine,item.platform);
    }
    return;
  }

  const filter = event.target.closest("[data-filter]");
  if(filter){
    activeFilter = filter.dataset.filter;
    selectedSession = 0;
    document.querySelectorAll("[data-filter]").forEach(function(button){
      button.classList.toggle("active",button === filter);
    });
    renderAnalysis();
    return;
  }

  const session = event.target.closest("[data-session]");
  if(session){
    selectedSession = Number(session.dataset.session);
    renderSessions();
    renderSelectedSession();
  }
});

(function boot(){
  applyLanguage();
  renderRecent();
  const params = new URLSearchParams(location.search);
  const parsed = parseRiotId(params.get("riot"));
  const server = String(params.get("server") || "br1").toLowerCase();
  if(parsed){
    $("#riot-id").value = parsed.gameName+"#"+parsed.tagLine;
    if(Array.from($("#server").options).some(function(option){ return option.value === server; })) $("#server").value = server;
    lookup(parsed.gameName,parsed.tagLine,server);
  }
})();