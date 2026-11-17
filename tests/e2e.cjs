const { chromium } = require('playwright-core');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const root = path.resolve(__dirname, '..');
const base = process.env.QA_BASE_URL || 'http://127.0.0.1:3000';
const output = path.join(root, 'qa/static-export');
const expectedCertificates = JSON.parse(fs.readFileSync(path.join(root, 'data/certificates.json'), 'utf8')).length;
fs.mkdirSync(output, { recursive: true });
const result = { checks: [], viewports: [], errors: [], pdfRequestsOnLoad: [] };
const check = (name, value) => { assert.ok(value, name); result.checks.push(name); };
const hash = bytes => crypto.createHash('sha256').update(bytes).digest('hex');
(async () => {
  const certs = JSON.parse(fs.readFileSync(path.join(root,'data/certificates.json')));
  const projects = JSON.parse(fs.readFileSync(path.join(root,'data/projects.json')));
  check('17 unique certificates', certs.length === 17 && new Set(certs.map(c=>c.certificateId)).size === 17);
  for (const file of [...projects.map(p=>p.documentPath),...certs.flatMap(c=>[c.pdfPath,c.imagePath])].filter(Boolean)) {
    const response=await fetch(base+file), bytes=Buffer.from(await response.arrayBuffer());
    check('Static bytes '+file,response.ok && hash(bytes)===hash(fs.readFileSync(path.join(root,'public',file))));
    if(file.endsWith('.pdf')) check('PDF signature '+file,bytes.subarray(0,5).toString()==='%PDF-');
  }
  check('Legacy index works', (await fetch(base+'/index.html')).ok);
  check('No API output', (await fetch(base+'/api/certificates')).status===404);
  const browser = await chromium.launch({ headless: true, executablePath: process.env.CHROMIUM_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe' });
  try {
    const context = await browser.newContext({ reducedMotion: 'reduce', acceptDownloads: true });
    const page = await context.newPage();
    page.on('pageerror', e => result.errors.push(e.message));
    page.on('console', m => { if (m.type() === 'error') result.errors.push(m.text()); });
    page.on('response', r => { if (r.status() >= 400) result.errors.push(`${r.status()} ${r.url()}`); });
    page.on('request', r => { if (r.url().endsWith('.pdf')) result.pdfRequestsOnLoad.push(r.url()); });
    for (const route of (process.env.QA_LAYOUT_ROUTE ? [process.env.QA_LAYOUT_ROUTE] : ['/', '/certificates'])) {
      for (const width of [320, 390, 768, 1440]) {
        for (const orientation of ['portrait']) {
          const height = orientation === 'portrait' ? Math.round(width * 1.4) : Math.max(320, Math.round(width * 0.6));
          await page.setViewportSize({ width, height });
          await page.goto(base + route);
          await page.reload();
          await page.locator('.certificate-card').first().waitFor();
          await page.evaluate(() => document.fonts.ready);
          const label = `${route} ${width} ${orientation}`;
          check(`${label}: expected server-rendered cards`, await page.locator('.certificate-card').count() === (route === '/' ? 3 : expectedCertificates));
          if (route === '/') check(`${label}: existing project links retained`, await page.locator('.project a[download]').count() === 2);
          check(`${label}: no horizontal overflow`, await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
          check(`${label}: card content fits`, await page.locator('.certificate-card h3,.certificate-meta,.certificate-actions a').evaluateAll(els => els.every(el => { const r = el.getBoundingClientRect(); return r.left >= 0 && r.right <= innerWidth + 1 && el.scrollWidth <= el.clientWidth; })));
          await page.locator('.certificate-card').last().scrollIntoViewIfNeeded();
          await page.waitForFunction(() => [...document.querySelectorAll('.certificate-preview img')].filter(i => { const r = i.getBoundingClientRect(); return r.top < innerHeight && r.bottom > 0; }).every(i => i.complete && i.naturalWidth > 0));
          check(`${label}: preview uses contain`, await page.locator('.certificate-preview img').evaluateAll(els => els.every(el => getComputedStyle(el).objectFit === 'contain')));
          if (width < 960) {
            await page.locator('#nav-toggle').focus(); await page.keyboard.press('Enter');
            check(`${label}: keyboard opens menu`, await page.locator('#nav-toggle').getAttribute('aria-expanded') === 'true');
            await page.keyboard.press('Escape');
            check(`${label}: Escape closes and restores focus`, await page.locator('#nav-toggle').getAttribute('aria-expanded') === 'false' && await page.locator('#nav-toggle').evaluate(el => el === document.activeElement));
          }
          result.viewports.push({ route, width, height, orientation });
          if (orientation === 'portrait' && [390, 1440].includes(width)) {
            for (const img of await page.locator('.certificate-preview img').all()) { await img.scrollIntoViewIfNeeded(); await img.evaluate(el => el.decode()); }
            await page.evaluate(() => window.scrollTo(0, 0));
            await page.screenshot({ path: path.join(output, `${route === '/' ? 'home' : 'certificates'}-${width}.png`), fullPage: true });
          }
        }
      }
    }
    check('No PDFs automatically loaded', result.pdfRequestsOnLoad.length === 0);
    for (const route of ['/', '/certificates']) {
      await page.goto(base + route); await page.locator('a[download]').first().waitFor();
      const links = page.locator('a[download]');
      for (let i = 0; i < await links.count(); i++) {
        const link = links.nth(i), href = await link.getAttribute('href'), name = await link.getAttribute('download');
        const [download] = await Promise.all([page.waitForEvent('download'), link.click()]);
        check(`Download ${href}`, download.suggestedFilename() === name && hash(fs.readFileSync(await download.path())) === hash(fs.readFileSync(path.join(root, 'public', href))));
        const open = page.locator(`a[href="${href}"][target="_blank"]`).first();
        check(`Safe new tab attributes ${href}`, await open.getAttribute('rel') === 'noopener noreferrer');
        const [popup] = await Promise.all([context.waitForEvent('page'), open.click()]);
        await popup.waitForLoadState('load');
        check(`PDF viewer ${href}`, popup.url() === base + href && await popup.evaluate(() => window.opener === null));
        await popup.close();
      }
    }
    await page.goto(base); await page.setViewportSize({ width: 390, height: 844 });
    await page.locator('#nav-toggle').click(); await page.locator('#nav-menu a[href^="/certificates"]').focus(); await page.keyboard.press('Enter');
    await page.waitForURL(/\/certificates\/?$/);
    check('Keyboard certificate navigation works', await page.locator('h1').innerText() === 'ใบรับรองและเกียรติบัตร');
    for (const route of ['/', '/certificates']) {
      const noJs = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
      const p = await noJs.newPage(); await p.goto(base + route);
      check(`${route}: cards visible without JavaScript`, await p.locator('.certificate-card').first().isVisible());
      check(`${route}: links usable without JavaScript`, await p.locator('.certificate-card a[download]').first().isVisible());
      await noJs.close();
    }
    check('No browser console/page errors or HTTP errors', result.errors.length === 0);
    await context.close();
  } finally { await browser.close(); fs.writeFileSync(path.join(output, 'results.json'), JSON.stringify(result, null, 2)); }
  console.log(`PASS: ${result.checks.length} checks, ${result.viewports.length} viewport cases`);
})().catch(e => { console.error(e.message); process.exitCode = 1; });

