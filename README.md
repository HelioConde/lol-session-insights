# LoL Session Insights

Produto League of Legends do **Ideias IA Lab** para analisar comportamento ao longo de blocos de jogo, em vez de olhar apenas partidas isoladas.

## Estado atual

MVP funcional iniciado em 07/10/2026.

## O que já funciona

- busca por Riot ID + servidor;
- backend gamer compartilhado via \`public-lol-profile\`;
- até 40 partidas recentes;
- agrupamento automático em sessões com intervalo máximo de 90 minutos;
- filtros por Todos, Ranked, Normal, ARAM e Arena;
- comparação do começo x fim de cada sessão;
- tendência de desempenho com sinal **melhor / estável / pior**;
- KDA médio e mortes médias;
- duração total em jogo;
- trocas de campeão;
- trocas de rota;
- campeão mais usado na sessão;
- lista de partidas da sessão;
- buscas recentes em localStorage;
- deep link com Riot ID e servidor;
- PT-BR principal + inglês;
- páginas Sobre, Privacidade e Termos;
- layout preparado para anúncios sem bloquear a leitura;
- Static QA.

## Interpretação

O produto **não diagnostica tilt, fadiga, humor, intenção ou habilidade**.

A tendência compara apenas sinais observáveis da amostra recente — principalmente KDA, mortes e resultado — entre começo e fim do bloco.

## Backend

Fonte:

\`https://bieihhaobdztjyoweewa.supabase.co/functions/v1/public-lol-profile\`

A integração Riot continua server-side. Nenhuma chave de API fica no navegador.

## QA

Execute:

\`npm run check\`

## Deploy

O workflow **Deploy GitHub Pages** está preparado.

Caso o Pages ainda não esteja ativo:

1. Settings → Pages
2. Build and deployment
3. Source → GitHub Actions

## Gate antes de expandir

- [x] proposta de valor clara;
- [x] dados Riot reais;
- [x] fluxo principal;
- [x] filtros principais;
- [x] loading/erro/sucesso;
- [x] PT-BR/EN;
- [x] mobile;
- [x] páginas institucionais;
- [x] SEO básico;
- [x] QA estático;
- [ ] GitHub Pages confirmado;
- [ ] Browser E2E;
- [ ] validação com 3+ Riot IDs/regiões;
- [ ] revisar sessões longas e sessões de apenas 1 partida;
- [ ] validar ARAM/Arena/Ranked separadamente.

## V2 — somente após validação

- comparação entre dias da semana;
- horário do dia;
- histórico persistido de sessões;
- evolução por patch;
- alertas pessoais baseados no próprio histórico;
- compartilhamento visual;
- integração opcional com outros produtos gamer.

## Compliance

Produto independente e não endossado pela Riot Games.

League of Legends e Riot Games são marcas de seus respectivos titulares.

Planejamento geral:

https://github.com/HelioConde/ideias-ia-lab
