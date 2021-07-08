const { selectAllMessages, insertMessage } = require('../models').messages;

const select = (req, res, dataModel) => {
  // console.log('got here');
  // const { room_id } = req.params;
  // if (product_id === undefined) {
  //   res.status(500).end('Unable to parse {product_id} property from req.params');
  // } else {
    // dataModel(product_id)
    dataModel()
      .then(model => {
        const [client, query] = model;
        query.then((psqlResponse) => {
          res.status(200).end(JSON.stringify(psqlResponse.rows));
        })
        .finally(() => {
          client.release();
        })
      })
      .catch(err => {
        console.error('Error fetching product: ' + product_id);
        console.error(err);
      })
  // }
};

const insert = (req, res, dataModel) => {

}


module.exports = {
  get: (req, res) => {
    select(req, res, selectAllMessages);
  },
  insertSocketMessage: insertMessage,

};
