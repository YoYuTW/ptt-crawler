const puppeteer = require('puppeteer');
const getOnlyXbox = require('./pageParse');

async function fetchData() {
  const gamesale = 'https://www.ptt.cc/bbs/Gamesale/index.html';
  const browser = await puppeteer.launch( { headless: true } );
  const page = await browser.newPage();  
  await page.setRequestInterception(true);
  page.on('request', (request) => {
    if (['image', 'stylesheet', 'font', 'script'].indexOf(request.resourceType()) !== -1) {
        request.abort();
    } else {
        request.continue();
    }
  });
  await page.goto(gamesale);
  await page.setCookie({name: 'over18',value: '1'});
  await page.goto(gamesale, {
    waitUntil: 'domcontentloaded',
    timeout: 50 * 1000
  });
  const articleLinks = await page.evaluate(getOnlyXbox);  
  await browser.close();  
  return articleLinks
}; 

module.exports = fetchData;