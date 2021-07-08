require('dotenv').config()
const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const database = require('../db/database.js');
const http = require('http');

const server = http.createServer(app);
const io = require('socket.io')(server);

const controllers = require('./controllers');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '/../client')));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

app.get('/messages', controllers.messages.get);

server.listen(port, () => {
  console.log('quickchat listening on localhost:' + port);
});

io.on('connection', (socket) => {
  console.log('new client connected');
  socket.on('message', message => {
    message.date = Date.now()/1000;
    message.room_id = 1;
    controllers.messages.insertSocketMessage(message);
    io.emit('message', JSON.stringify(message));
  });
});