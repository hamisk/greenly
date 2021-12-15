const knex =
  process.env.NODE_ENV === 'production'
    ? require('knex')(require('../knexfile').production)
    : require('knex')(require('../knexfile').development);

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
            const foundUser = user[0];

            if (!foundUser) {
                return res.status(400).json({
                    message: "User does not exist"
                })
            }

            const userId = foundUser.id
            knex('user_logged_activities')
                .select('user_logged_activities.*', 'activities.activity', 'activities.category', 'activities.unit', 'activities.qty', 'activities.option', 'activities.carbon')
                .join('activities', 'activities.id', '=', 'user_logged_activities.activity_id')
                .where({ user_id: userId })
                .then(activities => {
                    console.log(activities)
                    res.status(200).json(activities);
                })
        })
}

exports.deleteUserActivity = (req, res) => {
    console.log(req.params)
}

exports.updateUser = (req, res) => {
    const usernameFromToken = req.decoded.username;
    const { name, username, carbon, city, country } = req.body

    if (!name || !username || !carbon) {
        return res.status(400).json({
            message: "Update requires name, username, and carbon target"
        })
    }

    // at this point, we are guaranteed to have a 
    // name, username, and carbon target
    const updateUser = {
        name: name,
        username: username,
        city: city,
        country: country,
        goal_carbon: carbon
    };

    knex('users')
        .where({ username: usernameFromToken })
        .update({
            name: name,
            username: username,
            city: city,
            country: country,
            goal_carbon: carbon
        })
        .then(() => {
            // create and return JWT
            const token = jwt.sign(
                // 1. payload
                { username: username },
                // 2. secret key
                process.env.JWT_SECRET_KEY,
                // 3. options
                { expiresIn: "6h" }
            );

            res.status(204)
                .json({ 
                    message: "Successfully updated",
                    token: token 
                })
        })
        .catch((err) =>
            res.status(400).send(`Error updating: ${err}`)
        );
};