const fs = require('fs');
const jsonexport = require('jsonexport');

const reader = fs.createReadStream('data.json');
const writer = fs.createWriteStream('data.csv');

reader.pipe(jsonexport()).pipe(writer);