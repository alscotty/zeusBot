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
// sorted.forEach(item => console.log(item.price))
console.log(sorted.slice(0,10))