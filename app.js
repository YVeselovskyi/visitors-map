const express = require('express');
const app = express();
const path = require('path');
const http = require('http').Server(app);
const io = require('socket.io')(http);
const PORT = 1927 || process.env.PORT;
const mongoose = require('mongoose');
const database = 'mongodb://root:abc123@ds011725.mlab.com:11725/shop';


mongoose.connect(database , function(err){
    if(err) {
        console.log(err);
    } else {
        console.log('Connected to database!')
    }
});

const Visitor = mongoose.model('Visitor', { name: String , coordinates: Object });

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/index.html'));
});

app.use('/', express.static(__dirname + '/public/assets'));

io.on('connection', function(socket){

    socket.on('my other event', function (data) {

        const user = new Visitor({ name: 'Kubik', coordinates: {lat: data.lat, lon: data.lon} });

        user.save(function (err) {
            if (err) {
                console.log(err);
            } else {
                console.log('saved');
            }
        });
    });

});

http.listen(PORT, function(err){
    if(err) throw err;
    console.log('Server is running on ' + PORT);
});

