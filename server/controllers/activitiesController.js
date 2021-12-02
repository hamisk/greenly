const knex = require('knex')(require('../knexfile').development);

exports.getActivities = (_req, res) => {
  knex('activities')
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) =>
      res.status(400).send(`Error retrieving activities: ${err}`)
    );
};

// get single item by id on slide 11 in cRUD ops