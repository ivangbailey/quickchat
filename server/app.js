require('dotenv').config();

const database = require('../db/database.js');
const {initialize: initializeSocket} = require('./socket-server.js');
const {initialize: initializeHttpServer} = require('./http-server.js')

const server = initializeHttpServer();
const io = initializeSocket(server);
