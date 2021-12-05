const users = [
  {
    "id": 1,
    "name": "Luke Skywalker",
    "username": "lovetheforce",
    "password": "vaderiscool",
    "city": null,
    "country": null,
  },
  {
    "id": 2,
    "name": "Anakin Skywalker",
    "username": "lovethedarkside",
    "password": "vaderislife",
    "city": null,
    "country": null,
  },
  {
    "id": 3,
    "name": "newUser",
    "username": "newUserOne",
    "password": "password",
    "city": null,
    "country": null,
  },
  {
    "id": 4,
    "name": "harman",
    "username": "newUser",
    "password": "password",
    "city": null,
    "country": null,
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