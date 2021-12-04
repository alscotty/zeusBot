# zeusBot
## Objective:
Zeus is like an upscale Airbnb, I was interested in searching the whole site/all cities based on availability and price, which isn't supported on the site.

## Steps:
- Run cities.js to scrape all locations and collect urls, saved to cityDB
- Use urls as inputs for listings.js to scrape available listings, and relevant info (date,price,link,title) and save to listingDB.
- Use analyzeListings to sort output data by price and filter on available months

Built with puppeteer and node-json-db
