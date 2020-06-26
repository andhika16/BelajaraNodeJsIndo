// const http = require('http');
// const url = require('url');
// const fs = require('fs');



// http.createServer((req, res) => {
//     const q = url.parse(req.url, true);



//     if (q.pathname === '/search/' && req.method === 'GET') {
//         const keyword = q.query.keyword;

//         if (keyword) {
//             res.writeHead(200, { 'Content-type': 'text/html' });
//             res.write(`<h3>Search Result</h3>
//             <p>anda mencari : </p><b> ${keyword}</b></p>
//             <p>Maaf tidak ada hasil website sedang dalam pengembangan</p>`);
//             res.end();
//         } else {
//             fs.readFile('/search.html', (err, data) => {
//                 if (err) {
//                     res.writeHead(404, { 'Content-type': 'text/html' })
//                     return res.end(`<h1>404 File Not Found</h1>`);
//                 }
//                 res.writeHead(200, { 'Content-type': 'text/html' })
//                 res.write(data)
//                 return res.end();
//             })
//         }

//     }


// }).listen(3000);

// console.log('Server on port...');

const http = require('http');
const url = require('url');
const fs = require('fs');

http.createServer(function (req, res) {
    const q = url.parse(req.url, true);

    if (q.pathname == "/search/" && req.method === "GET") {
        // ambil parameter dari URL
        const keyword = q.query.keyword;

        if (keyword) {
            // Ambil data dari form dengan metode GET
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write("<h3>Search Results:</h3>");
            res.write("<p>Anda mencari: <b>" + keyword + "</b></p>");
            res.write("<pre>Tidak ada hasil! Maaf website ini masih dalam pengembangan</pre>")
            res.end("<a href='/search/'>Kembali</a>");
        } else {
            // tampilkan form search
            fs.readFile('search.html', (err, data) => {
                if (err) { // kirim balasan error
                    res.writeHead(404, { 'Content-Type': 'text/html' });
                    return res.end("404 Not Found");
                }
                // kirim form search.html
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.write(data);
                return res.end();
            });
        }
    }


}).listen(8000);

console.log('server is running on http://localhost:8000');
