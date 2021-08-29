const { newClient } = require('../../db/database.js');

module.exports = {
  selectAllMessages: (room) => {
    return newClient().then(client => {
      return [client, client.query('SELECT * FROM messages;')];
    });
  },
  insertMessage: (rawMessage) => {
    // message.timestamp = Date.now();
    console.log(rawMessage);
    rawMessage.room_id = 1;
    const { uid, room_id, date, message} = rawMessage;
    const query = {
      text: 'INSERT INTO messages (user_id, room_id, date, message) VALUES ($1, $2, $3, $4);',
      values: [uid, room_id, date, message]
    };
    const client = newClient();

    newClient()
      .then(client => {
        client.query(query)
          .finally(client.release());
      })
      .catch(console.error);
  }
}