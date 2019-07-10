let IO = require('./IO')

//let io = new IO()

//io.load_data('./records/');
//io.save_data();

const express = require('express');
const app = express();
const path = require('path');

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname+'/public/index.html'));
});

app.listen(8080);