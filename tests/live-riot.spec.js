const { test, expect } = require("@playwright/test");

test.describe("Live Riot smoke", () => {
  test.skip(process.env.LIVE_RIOT_SMOKE !== "1", "Dedicated production smoke only.");

  test("loads real session data from production", async ({ page }) => {
    await page.goto("./?riot=AlchemyFlames%23BR1&server=br1", { waitUntil: "domcontentloaded" });
    await expect(page.locator("#status")).toHaveText("Dados Riot carregados.", { timeout: 25000 });
    await expect(page.locator("#result")).toBeVisible();
    await expect(page.locator("#player-name")).toContainText("AlchemyFlames#BR1");
    await expect(page.locator("#metric-sessions")).not.toHaveText("—");
  });
});
