const { listings } = require('./ListingsDB.json');

console.log('Collected so far: ' + listings.length);

const convertNum = (str) => {
    return Number(str.match(/[0-9,\,]+/g)[0].replace(/\,/g,''));
}

const sortByPrice = (a,b) => {
    let aPrice = convertNum(a.price);
    let bPrice = convertNum(b.price);
    return aPrice-bPrice
}

let cleanedWithPriceOnly = listings.filter(item => !!item.price.match(/\d+/g))
let sorted = cleanedWithPriceOnly.sort(sortByPrice);
// top 30 cheapest
// console.log(sorted.slice(0,30).reverse())

// top w/ Sep or Oct availability: 
console.log(sorted.slice(0, 40).filter(listing => listing.availableDate.includes('Sep') || listing.availableDate.includes('Oct') || listing.availableDate.includes('Today') ).reverse())

// all with price "New":
// let newOnly = listings.filter(listing => listing.price == 'New')
// console.log(newOnly)
// console.log('Num new listings: ' + newOnly.length)
