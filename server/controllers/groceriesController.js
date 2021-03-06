const knex =
  process.env.NODE_ENV === 'production'
    ? require('knex')(require('../knexfile').production)
    : require('knex')(require('../knexfile').development);
// const knex = require('knex')(require('../knexfile').development);

exports.getGroceries = (_req, res) => {
  knex('groceries')
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) =>
      res.status(400).send(`Error retrieving groceries: ${err}`)
    );
};