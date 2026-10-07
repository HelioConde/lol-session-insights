import fs from "node:fs";
import assert from "node:assert/strict";

const html=fs.readFileSync("index.html","utf8");
const css=fs.readFileSync("style.css","utf8");
const app=fs.readFileSync("app.js","utf8");
const backend=fs.readFileSync("backend-config.js","utf8");

assert.match(html,/id="lookup-form"/);
assert.match(html,/id="session-list"/);
assert.match(html,/id="match-list"/);
assert.match(html,/data-filter="RANKED"/);
assert.match(html,/privacidade\.html/);
assert.match(css,/@media\(max-width:680px\)/);
assert.match(css,/focus-visible/);
assert.match(app,/groupSessions/);
assert.match(app,/SESSION_GAP_MS/);
assert.match(app,/public-lol-profile|LOL_SESSION_BACKEND/);
assert.match(app,/sessionTrend/);
assert.match(backend,/public-lol-profile/);
assert.ok(fs.existsSync("sobre.html"));
assert.ok(fs.existsSync("privacidade.html"));
assert.ok(fs.existsSync("termos.html"));

console.log("LoL Session Insights static QA passed");