const express = require('express');
const app = express();
const http = require('http');
const { parse } = require('url');
const path = require('path');
const controllers = require('./controllers');
const {cors, login, session, cookies} = require('./middleware');
const { PORT } = process.env;

const initialize = (nextServer) => {
  nextServer.prepare().then(() => {
    app.use(cors.corsPolicy);
    // app.use(cookies.cookieParser);
    app.use(session.sessionParser);
    app.use(session.sessionManager);
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.get('/messages', controllers.messages.get);
    app.post('/login', controllers.login.post);

    app.use((req, res, next) => {
      const parsedUrl = parse(req.url, true)
      const { pathname, query } = parsedUrl

      // only handle the nextjs layer render if using a get request and not
      // requesting in the api endpoint
      if (!pathname.startsWith('/api') && req.method === 'GET') {
        nextServer.render(req, res, pathname, query)
      }
    });

  });

  const server = http.createServer(app);

  server.listen(PORT, () => {
    console.log('quickchat listening on localhost:' + PORT);
  });
  return server;
};

module.exports.initialize = initialize;