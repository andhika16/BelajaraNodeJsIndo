const http = require('http');
const fs = require('fs');
const formidable = require('formidable');
const mv = require('mv');




http.createServer((req, res) => {

    if (req.url === '/' && req.method === 'GET') {
        const filePath = './public/form_upload.html'
        fs.readFile(filePath, (err, data) => {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            if (err) throw err;
            res.end(data);
        })
    }

    if (req.url === '/' && req.method === 'POST') {
        const form = formidable.IncomingForm();

        form.parse(req, (err, fields, files) => {
            const oldPath = files.filetoupload.path;
            const newpath = __dirname + "/uploads/" + files.filetoupload.name;

            mv(oldPath, newpath, err => {
                if (err) console.log(err);
                console.log('upload Success fully');
                return res.end('upload Success fully');


            })
        })
    }



}).listen(3000);

console.log("server listening on http://localhost:8000");