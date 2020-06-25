const http = require('http');
const fs = require('fs');
const url = require('url');

http.createServer((req, res) => {

    const q = url.parse(req.url, true);
    const fileName = q.pathname;

    fs.readFile(fileName, (err, data) => {

        if (err) {
            res.writeHead(404, { 'Context-type': 'Text/html' })
            res.end('404 File Not Found');
        }
        res.writeHead(200, { 'Context-type': 'Text/html' })
        res.write(data);
        res.end();
    })

}).listen(3000);

console.log('Server listening...');