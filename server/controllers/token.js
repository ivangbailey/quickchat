const jwt = require('jsonwebtoken');
const fs = require('fs');

const PRIVATE_KEY = fs.readFileSync('token.key');
const TOKEN_SETTINGS = {
  expiresIn: '7d'
}

console.log('token:', PRIVATE_KEY);


const check = (req, res, next) => {
  const token = req.cookies.token;
  if (token) {
    const decoded = jwt.verify(token, PRIVATE_KEY);
    req.user_id = decoded.user_id;
  } else {
    const session = {
      user_id: null
      // TODO: add other properties to the session
    };
    jwt.sign(session, PRIVATE_KEY, TOKEN_SETTINGS, (err, token) => {
      // TODO: write token to db
      const expires = generateCookieExpirationDate();
      res.cookie('token', token, {expires});
    });
  }
};

const generateCookieExpirationDate = () => {
  const date = new Date();
  date.setDate(date.getDate() + 7);
  return date;
}