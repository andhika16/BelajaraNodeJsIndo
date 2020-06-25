const url = require('url');
const adr = 'https://www.petanikode.com/search.php?year=2018&month=february';
const q = url.parse(adr, true);


console.log(`protokol : ${q.protocol}`);
console.log(`hostname : ${q.host}`);
console.log(`path     : ${q.path}`);
console.log(`params   : ${q.search}`);

const qData = q.query;
console.log(qData);







