const { JsonDB } = require('node-json-db');
const { Config } = require('node-json-db/dist/lib/JsonDBConfig');

let demoDB = new JsonDB(new Config("demoDB", true, false, '/demo/'));


let arr = [1,2,3]
arr.forEach(num => {
    demoDB.push('/nums[]',num,true)
})