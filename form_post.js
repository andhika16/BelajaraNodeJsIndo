const http = require('http');
const qs = require('querystring');
const fs = require('fs');







http.createServer((req, res) => {

    if (req.url === '/login/' && req.method === 'GET') {
        // tampilkan form login
        fs.readFile('./login.html', (err, data) => {
            if (err) { // kirim balasan error
                res.writeHead(404, { 'Content-Type': 'text/html' });
                return res.end("404 Not Found");
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.write(data);
                return res.end();
            }
        })

    }

    if (req.url === '/login/' && req.method === 'POST') {
        // ambil data dari form dan proses
        let requestBody = '';
        const entityData = `<!DOCTYPE html>
        <html lang="en">
        <head>
            <title>Error</title>
        </head>
        <body>
            <h1> 413 : Request Entity To large</h1>  
        </body>
        </html>`;

        req.on('data', data => {
            // tangkap data dari form
            requestBody += data;
            if (requestBody.length > 1e7) {
                // kirim balasan jika datanya terlalu besar
                res.writeHead(413, 'Request Entity To Large', { 'Content-Type': 'text/html' });
                return res.end(entityData);
            }
        });
        // kita sudah dapat datanya
        // langkah berikutnya tinggal di-parse
        req.on('end', () => {
            const formData = qs.parse(requestBody);
            const fileName = `./public/about.html`
            // cek login


            if (formData.username === 'andhika' && formData.password === '123') {
                fs.readFile(fileName, (err, data) => {
                    if (err) {
                        res.writeHead(404, { 'Content-Type': 'text/html' });
                        return res.end("404 Not Found");
                    } else {
                        res.writeHead(200, { 'Content-Type': 'text/html' });
                        res.write(data);
                        return res.end();
                    }

                })
            } else {
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.write(`<h3>Login Gagal</h3> <a href="${req.url}">Coba Lagi</a>`);
                res.end();
            }
        })


    }
}).listen(3000);

console.log('Server listen on port 3000');






