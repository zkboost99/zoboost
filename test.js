const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:3000/admin.html', {waitUntil: 'networkidle0'});
  const getRects = async () => await page.evaluate(() => {
    return {
      topbar: document.querySelector('.topbar').getBoundingClientRect(),
      content: document.querySelector('.content').getBoundingClientRect(),
      dashGrid: document.querySelector('.dash-grid').getBoundingClientRect(),
      scrollTop: document.querySelector('.content').scrollTop,
      pgTitleInnerHtml: document.getElementById('pgTitle').innerHTML
    }
  });
  console.log('Fresh load:', await getRects());
  await page.evaluate(() => document.querySelector('.nav-link[data-tip="Contact"]').click());
  await new Promise(r => setTimeout(r, 2000));
  console.log('Contact opened:', await getRects());
  await page.evaluate(() => document.querySelector('.nav-link[data-tip="Dashboard"]').click());
  await new Promise(r => setTimeout(r, 2000));
  console.log('Dashboard reopened:', await getRects());
  await browser.close();
})();
