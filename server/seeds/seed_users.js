const bcrypt = require('bcrypt')

const users = [
  {
    "id": 1,
    "name": "Luke Skywalker",
    "username": "lovetheforce",
    "password": "usetheforce",
    "city": "Tattooine",
    "country": "Alpha Centauri",
    "goal_carbon": 10000
  },
  {
    "id": 2,
    "name": "Anakin Skywalker",
    "username": "lovethedarkside",
    "password": "usetheforce",
    "city": null,
    "country": null,
    "goal_carbon": 10000
  },
  {
    "id": 3,
    "name": "Captain Planet",
    "username": "captainplanet",
    "password": "usetheforce",
    "city": "Greenopolis",
    "country": "Earth",
    "goal_carbon": 10000
  },
  {
    "id": 4,
    "name": "Harman Khera",
    "username": "harman",
    "password": "usetheforce",
    "city": "Vancouver",
    "country": "Canada",
    "goal_carbon": 10000
  }
]

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
      .then(function () {
      // Inserts seed entries
      return knex('users').insert(users);
      });
};