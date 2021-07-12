require('dotenv').config()
const express = require('express');
const app = express();
const { PORT } = process.env;
const path = require('path');
const database = require('../db/database.js');
const http = require('http');
const {cors, login, session} = require('./middleware');

const server = http.createServer(app);
const { Server: SocketServer } = require('socket.io');
const io = new SocketServer(server);

const controllers = require('./controllers');

// TODO: register middleware on init
// app.set('trust proxy', 1);
app.use(cors.corsPolicy);
app.use(session.sessionParser);
app.use('*', session.sessionManager);
// app.use(login.passport.session());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/../client')));

app.use((req, res, next) => {
  console.log(req.session);
  next();
})

// TODO: register routers on init
app.get('/messages', controllers.messages.get);


server.listen(PORT, () => {
  console.log('quickchat listening on localhost:' + PORT);
});

io.use((socket, next) => {
  next();
});

io.on('connection', (socket) => {

  socket.on('message', message => {
    console.log(message);
    message.date = Date.now()/1000;
    message.room_id = 1;
    controllers.messages.insertSocketMessage(message);
    io.emit('message', JSON.stringify(message));
  });
});