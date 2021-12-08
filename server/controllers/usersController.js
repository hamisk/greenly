const knex =
  process.env.NODE_ENV === 'production'
    ? require('knex')(require('../knexfile').production)
    : require('knex')(require('../knexfile').development);
// const knex = require('knex')(require('../knexfile').development);
const jwt = require("jsonwebtoken");

exports.getUsers = (req, res) => {
  knex('users')
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((err) =>
      res.status(400).send(`Error retrieving user: ${err}`)
    );
};

exports.getProfile = (req, res) => {
    console.log("req.decoded in /users/profile route", req.decoded);
    // if valid token, continue
    const usernameFromToken = req.decoded.username;

    // find the user from users using username from the token
    knex('users')
        .where({ username: usernameFromToken })
        .then((user) => {
            const foundUser = user[0];

            if (!foundUser) {
                return res.status(400).json({
                    message: "User does not exist"
                })
            }

            // send back full user data 
            return res.status(200).json(foundUser)
        })
};

exports.addEntry = (req, res) => {
    // if valid token, continue
    const usernameFromToken = req.decoded.username;
    const userLoggedActivities = req.body;

    console.log(userLoggedActivities)

    // console.log(usernameFromToken)
    // console.log(req.body)

    // validation - do for each property of activity?
    // const name = req.body.name;
    // const username = req.body.username;
    // const password = req.body.password;

    // if (!name || !username || !password) {
    //     return res.status(400).json({
    //         message: "Register requires name, username, and password"
    //     })
    // }

    if (!userLoggedActivities) {
            return res.status(400).json({
            message: "add-entry requires activity"
        })
    }

    knex('users')
        .where({ username: usernameFromToken })
        .then((user) => {
            const foundUser = user[0];

            if (!foundUser) {
                return res.status(400).json({
                    message: "User does not exist"
                })
            }
            
            let userActivitiesToDb = userLoggedActivities.map(activity => ({
                user_id: foundUser.id,
                activity_id: activity.option[1],
                activity_used: activity.activity,
                option_used: activity.option[0],
                carbon_used: activity.carbon,
                qty_used: activity.qty,
                week_commencing: activity.weekCommencing.toString().slice(0,10)
            }))

            knex('user_logged_activities')
                .insert(userActivitiesToDb)
                .then(() => {
                    res.sendStatus(200);
                })
                .catch((err) =>
                    res.status(400).send(`Error adding entry: ${err}`)
                );   
        })
}

exports.getUserActivities = (req, res) => {
    console.log("req.decoded in /users/profile route", req.decoded);
    // if valid token, continue
    const usernameFromToken = req.decoded.username;

    // find the user from users using username from the token
    knex('users')
        .where({ username: usernameFromToken })
        .then((user) => {
            // const foundUser = users.find(user => user.username === username);
            const foundUser = user[0];
            // console.log(user)
            // console.log(foundUser)

            if (!foundUser) {
                return res.status(400).json({
                    message: "User does not exist"
                })
            }

            const userId = foundUser.id
            knex('user_logged_activities')
                .where({ user_id: userId })
                .join('activities', function () {
                    this.on('activities.id', '=', 'user_logged_activities.activity_id')
                })
                .then(activities => {
                    // console.log(activities)
                    res.status(200).json(activities);
                })

            // res.sendStatus(200);
        })

}