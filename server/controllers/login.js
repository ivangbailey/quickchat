const users = require('../models').users;
const bcrypt = require('bcryptjs');

const { selectUser } = users;

const post = async(req, res) => {
  const { credentials } = req.body;
  console.log(credentials);
  // const user = await selectUser(credentials);
  // if (user) {

  // } else {
  //   res.send(401);
  // }
  selectUser(credentials)
    .then((user) => {
      // console.log(user.rows);
      const [user] = user.rows;
      if (user) {
        console.log(user);
        bcrypt.compare(credentials.password, user.password, (error, res) => {
          if (err) {
            throw error;
          } else {
            bcrypt.compare(credentials.password, user.password, (error, res) => {
              if (error) {
                throw error
              } else {
                console.log(res);
                res.sendStatus(200);
              }
            })
          }
        });
      } else {
        throw new Error('Unable to locate user:', credentials.email);
      }
    })
    .catch((err) => {
      res.sendStatus(401)
    });


  res.status(200).send('success');
}

module.exports.post = post;