const { test, expect } = require("@playwright/test");

test("lookup renders grouped sessions with mocked Riot data", async ({ page }) => {
  const now = Date.now();
  await page.route("**/public-lol-profile", async route => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        player: { gameName: "AlchemyFlames", tagLine: "BR1" },
        matches: [
          { playedAt: now - 7 * 60 * 60 * 1000, duration: 31, champion: "Ahri", position: "MIDDLE", context: "RANKED", queue: "Ranked Solo", kda: 2.1, deaths: 5, win: false },
          { playedAt: now - 6.5 * 60 * 60 * 1000, duration: 29, champion: "Ahri", position: "MIDDLE", context: "RANKED", queue: "Ranked Solo", kda: 3.4, deaths: 4, win: true },
          { playedAt: now - 45 * 60 * 1000, duration: 24, champion: "Kai'Sa", position: "BOTTOM", context: "ARAM", queue: "ARAM", kda: 4.2, deaths: 3, win: true },
          { playedAt: now - 10 * 60 * 1000, duration: 26, champion: "Jinx", position: "BOTTOM", context: "ARAM", queue: "ARAM", kda: 5.1, deaths: 2, win: true }
        ]
      })
    });
  });

  await page.goto("/");
  await page.locator("#riot-id").fill("AlchemyFlames#BR1");
  await page.locator("#lookup-form").getByRole("button", { name: "Analisar sessões" }).click();

  await expect(page.locator("#status")).toHaveText("Dados Riot carregados.");
  await expect(page.locator("#result")).toBeVisible();
  await expect(page.locator("#player-name")).toHaveText("AlchemyFlames#BR1");
  await expect(page.locator("#metric-sessions")).toHaveText("2");
  await expect(page.locator(".session-card")).toHaveCount(2);

  await page.locator("[data-filter=ARAM]").click();
  await expect(page.locator("#metric-sessions")).toHaveText("1");
});

test("invalid Riot ID and language toggle stay usable", async ({ page }) => {
  await page.goto("/");
  await page.locator("#riot-id").fill("invalid");
  await page.locator("#lookup-form").getByRole("button", { name: "Analisar sessões" }).click();
  await expect(page.locator("#status")).toContainText("Nome#TAG");

  await page.locator("#language-toggle").click();
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(page.locator("#lookup-form").getByRole("button")).toHaveText("Analyze sessions");
});
