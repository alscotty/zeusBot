const puppeteer = require('puppeteer');
const { JsonDB } = require('node-json-db');
const { Config } = require('node-json-db/dist/lib/JsonDBConfig');

//run once to populate all the city links!!
var db = new JsonDB(new Config("cityDB", true, false, '/'));

let cityLinks =[];
puppeteer.launch({ headless: false })
    .then(async browser => {
        const page = await browser.newPage();
        await page.goto('https://zeusliving.com/locations', { timeout: 10000, waitUntil: 'load' });

        cityLinks = await page.evaluate(() => {
            return Array.from(document.querySelectorAll('ul[class*="landing-locations--metro"] > li > a')).map(city => {
                return 'https://zeusliving.com' + city.getAttribute('href') + '?sort_by%5Bcriterion%5D=PRICE&sort_by%5Border%5D=ASCENDING';
            });
        });

        console.log(cityLinks);
        db.push('/links[]', cityLinks);

        browser.close();
    });
