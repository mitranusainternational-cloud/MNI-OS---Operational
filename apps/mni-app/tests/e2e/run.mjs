// Runner mandiri regresi mock: node tests/e2e/run.mjs [url]
// Menjalankan regresi penuh (regression.mjs) lalu uji penegakan role (roles.mjs) di Chromium headless.
// Butuh dev server mock (VITE_LOCAL_MOCK=1) dan `npx playwright install chromium`.

import { chromium } from 'playwright';
import { runRegression } from './regression.mjs';
import { runRoles } from './roles.mjs';

const base = process.argv[2] || 'http://127.0.0.1:5173/';
const browser = await chromium.launch();
let totalFail = 0;
for (const [name, run] of [['regresi', runRegression], ['role', runRoles]]) {
  const page = await browser.newPage({ acceptDownloads: true });
  const { pass, fail, detail } = await run(page, base);
  await page.close();
  console.log(`== ${name} ==\n${detail.join('\n')}\n${pass} PASS, ${fail} FAIL\n`);
  totalFail += fail;
}
await browser.close();
process.exit(totalFail ? 1 : 0);
