// Runner mandiri untuk regresi mock: node tests/e2e/run.mjs [url]
// Butuh paket `playwright` (npm i -D playwright && npx playwright install chromium); belum menjadi dependensi
// proyek karena runner dan CI baru dijadwalkan di T-077 dan T-046. Sampai saat itu regresi dijalankan
// lewat Playwright MCP (lihat .claude/skills/e2e-regression/SKILL.md).

import { chromium } from 'playwright';
import { runRegression } from './regression.mjs';

const base = process.argv[2] || 'http://127.0.0.1:5173/';
const browser = await chromium.launch();
const page = await browser.newPage({ acceptDownloads: true });
const { pass, fail, detail } = await runRegression(page, base);
await browser.close();
console.log(detail.join('\n'));
console.log(`\n${pass} PASS, ${fail} FAIL`);
process.exit(fail ? 1 : 0);
