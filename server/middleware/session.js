const session = require('express-session');
const { v4: uuidv4 } = require('uuid');

const sessions = {};

const sessionParser = session({
  secret: 'ivanswrld',
  resave: true,
  saveUninitialized: true,
  cookie: {
    maxAge: 60000
  }
})

const sessionManager = (req, res, next) => {
  // let validSession = false;
  // let {uuid, username} = req.session;
  // if (!uuid) {
  //   uuid = uuidv4();
  //   username = 'USERNAME';
  //   sessions[uuid] = username;

  //   req.session.username = username;
  //   req.session.uuid = uuid;
  // }
  // res.cookie('uuid', uuid);
  // res.cookie('username', username);

  next();
}

module.exports.sessionParser = sessionParser;
module.exports.sessionManager = sessionManager;