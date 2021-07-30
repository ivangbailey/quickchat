const { Server: SocketServer } = require('socket.io');
const controllers = require('./controllers');

const initialize = (server) => {
  const io = new SocketServer(server);

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

  return io;
}

module.exports.initialize = initialize;