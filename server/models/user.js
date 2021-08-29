const { newClient } = require('../../db/database.js');

const SELECT = 'SELECT * FROM users WHERE email = $1'
const INSERT = 'INSERT INTO users (email, password) VALUES ($1, $2)';
module.exports = {
  // gets a user by it's credentials
  selectUser: async (credentials) => {
    const { email } = credentials;
    return new Promise((resolve, reject) => {
      newClient().then(client => {
        client.query(SELECT, [email], (err, response) => {
          if (err) {
            console.error(err);
            reject(err);
            return;
          }
          resolve(response);
        });
      });
    });
  },
  insertUser: async (email, password, callback) => {
    // const {email, password} = credentials;
    return new Promise((resolve, reject) => {
      newClient().then(client => {
        client.query(INSERT, [email, password], (err, response) => {
          if (err) {
            reject(err);
          } else {
            resolve(response);
          }
        });
      });

    })
  }
}
