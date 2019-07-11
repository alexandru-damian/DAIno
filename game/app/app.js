let IO = require('./IO')

let io = new IO()

io.load_data('./records/');
//io.save_data();

const express = require('express');
const app = express();
const path = require('path');

app.use(express.static('public'));
app.use(express.json())

app.get('/', (req, res) => 
{
    res.sendFile(path.join(__dirname+'/public/index.html'));
});

app.post('/save-record', function(req, res){
    var obj = {};
    console.log('body: ' + JSON.stringify(io.data));
    res.send(io.data);
});

app.listen(8080);