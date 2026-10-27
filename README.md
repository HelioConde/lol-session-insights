<div align="center">
  <h1>⏱️ LoL Session Insights</h1>
  <p><strong>Entenda um bloco inteiro de partidas de League of Legends, em vez de analisar um jogo isolado.</strong></p>
  <p><img alt="Status" src="https://img.shields.io/badge/status-MVP%20em%20valida%C3%A7%C3%A3o-64748b"></p>
</div>

## Uma sessão conta mais que uma partida?

**LoL Session Insights** agrupa partidas recentes em sessões e compara o que aconteceu do início ao fim do bloco. O objetivo é identificar mudanças observáveis: campeões, rotas, KDA, mortes, resultados e duração.

**Importante:** nenhum desses indicadores diagnostica fadiga, humor, intenção ou *tilt*. A ferramenta descreve dados da amostra, sem tirar conclusões psicológicas.

## Como consultar

1. Informe Riot ID e região.
2. Escolha um modo de jogo: Todos, Ranked, Normal, ARAM ou Arena, conforme disponibilidade.
3. Explore as sessões agrupadas pelo intervalo entre partidas.
4. Compare o começo com o fim de cada sessão e veja a lista de partidas.
5. Use os indicadores como pontos de partida para uma revisão manual.

| Métrica | Interpretação |
| --- | --- |
| **Sessão** | Grupo de partidas próximas, usando janela de até 90 minutos entre jogos |
| **Volume** | Quantidade e duração de partidas da sessão |
| **Mudanças** | Campeão e rota utilizados |
| **Desempenho** | KDA médio, mortes médias e resultados |
| **Tendência** | Sinal descritivo de melhor / estável / pior na amostra |

O backend `public-lol-profile` fornece uma amostra de **até 40 partidas recentes** na implementação documentada. Uma sessão parcialmente fora dessa janela pode parecer mais curta que a sessão real.

## Executar

```bash
git clone https://github.com/HelioConde/lol-session-insights.git
cd lol-session-insights
python -m http.server 8000
```

Abra `http://localhost:8000`. Para QA com Node.js:

```bash
npm install
npm run check
npm run test:e2e
```

A chave Riot fica no backend; não a publique no navegador. O frontend não garante disponibilidade permanente dos serviços externos.

## Estado atual

**MVP funcional descrito no repositório, em validação.** Prioridades: testar sessões de uma partida e sessões longas, comparar modalidades separadamente e validar diferentes Riot IDs/regiões.

[**Histórico técnico e QA anterior**](docs/README_HISTORY_2026-10-25.md) · [**Ideias IA Lab**](https://github.com/HelioConde/ideias-ia-lab)

Projeto não oficial, independente de Riot Games. Desenvolvido por [Hélio Conde](https://github.com/HelioConde).


## Publicação e teste Riot — diagnóstico de outubro de 2026

A interface é um **site estático**, e a hospedagem no GitHub Pages não precisa de PHP nem banco de dados. O catálogo de resultados reais, porém, depende de uma API externa da Riot hospedada separadamente; sem ela, dados de partidas não podem ser sincronizados entre pessoas ou obtidos diretamente com chaves privadas no navegador.

**Estado verificável:** o QA local do frontend e os testes de API de produção são etapas distintas. Se o GitHub Pages ainda não estiver habilitado, o novo workflow valida o código, informa que a publicação foi pulada e não tenta criar o site sem permissão. Para ativar, vá a **Settings → Pages → Build and deployment → Source: GitHub Actions**. A publicação copia apenas HTML, JavaScript, CSS e arquivos públicos de SEO, sem incluir arquivos de teste ou código interno.

O teste `Live Riot Smoke` agora verifica primeiro se a URL devolve HTTP 200 e contém o formulário real do projeto. Assim, uma página 404 não se confunde com indisponibilidade da API Riot. Mesmo com a página online, sucesso nos dados reais exige que a API responda corretamente; o teste não considera erros da Riot aprovados.
