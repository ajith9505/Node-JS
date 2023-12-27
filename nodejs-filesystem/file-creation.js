const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const port = 8080;

const folderPath = './files';

//Routing
app.get("/create-file", createFile);
app.get("/list-files", listFiles);

//Creating folder
if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
}

//Function for creating files
function createFile(req, res) {
    const now = new Date();
    const fileName = `${now.toISOString().replace(/:/g, '-')}.txt`
    const filePath = path.join(folderPath, fileName);

    fs.writeFile(filePath, now.toString(), (err) => {
        if (err) {
            res.status(500).end(`sever error`);
            return;
        }
        res.setHeader('Content-type', 'text/plain');
        res.end(`File Created : ${fileName}`);
    })
}

//Function for list files
function listFiles(req, res) {
    fs.readdir(folderPath, (err, files) => {
        if (err) {
            res.setHeader(500);
            res.end('Server Error');
            return;
        }
        const txtFiles = files.filter(file => path.extname(file) == '.txt');
        res.setHeader('Content-type', 'application/json');
        res.end(JSON.stringify(txtFiles));
    })
}

app.listen(port, () => console.log('Server online'));