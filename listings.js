const { links } = require('./cityDB.json');
const puppeteer = require('puppeteer');
const { JsonDB } = require('node-json-db');
const { Config } = require('node-json-db/dist/lib/JsonDBConfig');

let listingDB = new JsonDB(new Config("ListingsDB", true, false, '/'));

console.log(`Number of cities: ${links.length}`);

// define group, don't do all at once!
let startIdx = 110;
let linksBatch = links.slice(startIdx, startIdx+10);

puppeteer.launch({ headless: false })
    .then(async browser => {

        for(let i=0; i< linksBatch.length; i++) {
            let cityLink = linksBatch[i];
            const page = await browser.newPage();
            await page.goto(cityLink, { timeout: 10000, waitUntil: 'networkidle0' });
            await new Promise(res => setTimeout(res, 5000));
            let pageData = await page.evaluate(() => {
                let pageData = [];
                let allItems = document.querySelectorAll('div[data-listing-card]');
                let headText = document.querySelector('head title').textContent;
                let cityAndState = headText.match(/(?<=Rent in )(.*)(?= \|)/g)[0];

                allItems.forEach(item => {
                    let itemData = {};
                    itemData.city = cityAndState;
                    itemData.link = 'https://zeusliving.com' + item.querySelector('a[data-test="listing-link"]').getAttribute('href');
                    itemData.title = item.querySelector('div[data-test="listing-card-info"] > h3').textContent;
                    itemData.price = item.querySelector('div[data-test="price-display"]').textContent;
                    itemData.availableDate = item.querySelector('div[data-test="listing-card-info"] > div:last-of-type').textContent;
                    pageData.push(itemData);
                });
                return pageData
            });
            
            pageData.forEach(listing => {
                listingDB.push('/listings[]', listing, true);
            });

            await page.close();

        }

        browser.close();
    },linksBatch);