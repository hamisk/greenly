const knex = require('knex')(require('../knexfile').development);

exports.getUser = (req, res) => {
  knex('users')
    .where({ id: req.params.id })
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) =>
      res.status(400).send(`Error retrieving user: ${err}`)
    );
};