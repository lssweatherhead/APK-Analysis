const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var fs = require('fs');

if (process.argv.length <= 2) {
    console.log("Usage: " + __filename + " data");
    process.exit(-1);
}
 
var path = process.argv[2];
 
app.get('/api/files', (req, res) => {
    fs.readdir(path, function(err, items) {
        res.send({ files: items });
    });
});

app.get('/api/file', (req, res) => {
    fs.readFile(path + "/" + req.query.name, 'utf8', function(err, contents) {
        res.send({ path: path + "/" + req.query.name, file: JSON.parse(contents) });
    })
});

app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

app.post('/api/world', (req, res) => {
  console.log(req.body);
  res.send(
    `I received your POST request. This is what you sent me: ${req.body.post}`,
  );
});

app.listen(port, () => console.log(`Listening on port ${port}`));