const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  
  await page.goto('http://localhost:3000/admin.html', { waitUntil: 'networkidle' });
  
  const getRects = async () => await page.evaluate(() => {
    const el = (selector) => {
      const e = document.querySelector(selector);
      if (!e) return null;
      const rect = e.getBoundingClientRect();
      return { top: rect.top, height: rect.height, bottom: rect.bottom };
    };
    return {
      topbar: el('.topbar'),
      content: el('.content'),
      sDashboard: el('#s-dashboard'),
      sContact: el('#s-contact'),
      scrollTop: document.querySelector('.content')?.scrollTop,
      pgTitleHeight: document.getElementById('pgTitle')?.getBoundingClientRect().height
    };
  });
  
  console.log('--- FRESH LOAD ---');
  console.log(JSON.stringify(await getRects(), null, 2));
  
  await page.evaluate(() => document.querySelector('.nav-link[data-tip="Contact"]').click());
  await page.waitForTimeout(1000);
  console.log('--- CONTACT LOAD ---');
  console.log(JSON.stringify(await getRects(), null, 2));
  
  await page.evaluate(() => document.querySelector('.nav-link[data-tip="Dashboard"]').click());
  await page.waitForTimeout(1000);
  console.log('--- DASHBOARD RE-LOAD ---');
  console.log(JSON.stringify(await getRects(), null, 2));
  
  await browser.close();
})();
