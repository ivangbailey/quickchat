const express = require('express');
const app = express();
const http = require('http');
const path = require('path');
const controllers = require('./controllers');
const {cors, login, session} = require('./middleware');
const { PORT } = process.env;

const initialize = () => {
  app.use(cors.corsPolicy);
  app.use(session.sessionParser);
  app.use('*', session.sessionManager);
  // app.use(login.passport.session());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static(path.join(__dirname, '/../client')));

  app.get('/messages', controllers.messages.get);

  const server = http.createServer(app);

  server.listen(PORT, () => {
    console.log('quickchat listening on localhost:' + PORT);
  });
  return server;
};

module.exports.initialize = initialize;