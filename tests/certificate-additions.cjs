const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const mysql = require('mysql2/promise');
const { chromium } = require('playwright-core');
const base = process.env.QA_BASE_URL || 'http://127.0.0.1:3000';
const root = path.resolve(__dirname, '..');
const out = path.join(root, 'qa/certificates-additions-5');
const hash = file => crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
const bytesHash = bytes => crypto.createHash('sha256').update(bytes).digest('hex');
const load = file => JSON.parse(fs.readFileSync(path.join(root, file), 'utf8'));
const result = { baseUrl: base, checks: [], errors: [] };
const check = (name, ok) => { assert.ok(ok, name); result.checks.push(name); };
(async () => {
  const db = await mysql.createConnection({ host: process.env.DB_HOST, port: Number(process.env.DB_PORT), user: process.env.DB_USER, password: process.env.DB_PASSWORD, database: process.env.DB_NAME, dateStrings: true });
  let certificates;
  try {
    [certificates] = await db.query('SELECT * FROM certificates ORDER BY sort_order,certificate_id');
    const [projects] = await db.query('SELECT * FROM projects ORDER BY slug');
    const seed = load('data/certificates.json');
    for (const folder of ['certificates-additions', 'certificates-additions-5']) {
      const before = load(`qa/${folder}/before.json`);
      assert.deepEqual(certificates.slice(0, before.certs.length), before.certs);
      assert.deepEqual(projects, before.projects);
      assert.deepEqual(seed.slice(0, before.seed.length), before.seed);
      check(`${folder}: existing rows, order, featured and seed unchanged`, true);
      for (const [file, digest] of Object.entries(before.files)) check(`Original bytes ${folder}/${file}`, hash(path.join(root, 'public/assets/certificates', file)) === digest);
    }
    check('No duplicate IDs and seed/database count match', new Set(certificates.map(c => c.certificate_id)).size === certificates.length && certificates.length === seed.length);
    result.total = certificates.length;
    result.added = certificates.length - load('qa/certificates-additions-5/before.json').certs.length;
    for (const folder of ['certificates-additions', 'certificates-additions-5']) {
      for (const entry of load(`qa/${folder}/new-files.json`)) check(`New file matches supplied source ${entry.destination}`, hash(entry.source) === entry.sha256 && hash(path.join(root, entry.destination)) === entry.sha256);
    }
  } finally { await db.end(); }
  const api = await (await fetch(base + '/api/certificates')).json();
  assert.deepEqual(api.data.map(c => c.certificateId), certificates.map(c => c.certificate_id));
  check('API order matches MySQL', true);
  for (const c of certificates) {
    for (const file of [c.image_path, c.pdf_path].filter(Boolean)) {
      const response = await fetch(base + file);
      const bytes = Buffer.from(await response.arrayBuffer());
      check(`HTTP and bytes ${file}`, response.ok && bytesHash(bytes) === hash(path.join(root, 'public', file)));
    }
  }
  const browser = await chromium.launch({ headless: true, executablePath: process.env.CHROMIUM_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe' });
  try {
    const context = await browser.newContext({ reducedMotion: 'reduce', acceptDownloads: true });
    const page = await context.newPage();
    page.on('pageerror', e => result.errors.push(e.message));
    page.on('console', m => { if (m.type() === 'error') result.errors.push(m.text()); });
    page.on('response', r => { if (r.status() >= 400) result.errors.push(`${r.status()} ${r.url()}`); });
    await page.goto(base);
    const expectedFeatured = load('qa/certificates-additions/before.json').certs.filter(c => c.featured).map(c => `certificate-${c.certificate_id}`);
    assert.deepEqual(await page.locator('.certificate-card').evaluateAll(els => els.map(e => e.id)), expectedFeatured);
    check('Original homepage featured cards unchanged', true);
    for (const width of [320, 390, 1440]) {
      await page.setViewportSize({ width, height: 950 });
      await page.goto(base + '/certificates');
      await page.evaluate(() => document.fonts.ready);
      check(`${width}: all cards present`, await page.locator('.certificate-card').count() === certificates.length);
      check(`${width}: no page overflow`, await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
      check(`${width}: titles/buttons fit`, await page.locator('.certificate-card h3,.certificate-meta,.certificate-actions a').evaluateAll(els => els.every(el => { const r = el.getBoundingClientRect(); return r.left >= 0 && r.right <= innerWidth + 1 && el.scrollWidth <= el.clientWidth; })));
      check(`${width}: images remain full contain fit`, await page.locator('.certificate-preview img').evaluateAll(els => els.every(el => getComputedStyle(el).objectFit === 'contain')));
      for (const id of ['4HVOPCH', 'SLR6VT3']) {
        const card = page.locator(`#certificate-${id}`); await card.scrollIntoViewIfNeeded(); await card.locator('img').evaluate(el => el.decode());
        if (width !== 320) await card.screenshot({ path: path.join(out, `${id}-${width}.png`) });
      }
    }
    const initialIds = new Set(load('qa/certificates-additions/before.json').certs.map(c => c.certificate_id));
    for (const c of certificates.filter(c => !initialIds.has(c.certificate_id))) {
      const card = page.locator(`#certificate-${c.certificate_id}`), file = c.pdf_path || c.image_path;
      const downloadLink = card.locator('a[download]');
      check(`Correct action ${c.certificate_id}`, await downloadLink.getAttribute('href') === file && (await downloadLink.innerText()).includes(c.pdf_path ? 'PDF' : 'ภาพ'));
      const [download] = await Promise.all([page.waitForEvent('download'), downloadLink.click()]);
      check(`Download bytes ${c.certificate_id}`, hash(await download.path()) === hash(path.join(root, 'public', file)));
      const open = card.locator('a[target="_blank"]');
      check(`Safe tab ${c.certificate_id}`, await open.getAttribute('rel') === 'noopener noreferrer');
      const [popup] = await Promise.all([context.waitForEvent('page'), open.click()]); await popup.waitForLoadState('load');
      check(`Opens correct document ${c.certificate_id}`, popup.url() === base + file); await popup.close();
    }
    const noJs = await browser.newContext({ javaScriptEnabled: false }); const p = await noJs.newPage(); await p.goto(base + '/certificates');
    check('Image fallback link visible without JavaScript', await p.locator('#certificate-4HVOPCH a[download]').isVisible()); await noJs.close();
    check('No console errors or HTTP errors', result.errors.length === 0);
    await context.close();
  } finally { await browser.close(); fs.writeFileSync(path.join(out, 'results.json'), JSON.stringify(result, null, 2)); }
  console.log(`PASS ${result.checks.length} focused checks; added ${result.added}; actual total ${result.total}`);
})().catch(e => { console.error(e.message); process.exitCode = 1; });
