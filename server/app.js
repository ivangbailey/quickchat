require('dotenv').config();
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
console.log(dev);
const nextServer = next({ dev });

const database = require('../db/database.js');
const {initialize: initializeSocket} = require('./socket-server.js');
const {initialize: initializeHttpServer} = require('./http-server.js');

const server = initializeHttpServer(nextServer);
const io = initializeSocket(server);
