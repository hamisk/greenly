const knex = require('knex')(require('../knexfile').development);
const jwt = require("jsonwebtoken");

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

exports.createUser = (req, res) => {
    const name = req.body.name;
    const username = req.body.username;
    const password = req.body.password;

    if (!name || !username || !password) {
        return res.status(400).json({
            message: "Register requires name, username, and password"
        })
    }

    // at this point, we are guaranteed to have a 
    // name, username, and password
    const newUser = {
        name: name,
        username: username,
        password: password
    };

    knex('users')
        .insert(newUser)
        .then(() => {
            res.sendStatus(200);
        })
};

exports.login = (req, res) => {
    const { username, password } = req.body;

    if (!username || !password ) {
        return res.status(400).json({
            message: "Login requires username and password fields"
        })
    }

    // username and password are provided
    knex('users')
        .where({ username: username })
        .then((user) => {
            const foundUser = user[0];
            // console.log(user)
            // console.log(foundUser)

            if (!foundUser) {
                return res.status(400).json({
                    message: "User does not exist"
                })
            }
            // we are guaranteed to have the user here
            // Validate password matches user's password
            if (foundUser.password !== password) {
                // invalid password, return response
                return res.status(400).json({
                    message: "Invalid Credentials, password does not match"
                })
            }

            // it is a valid password at this point, 
            // create and return JWT
            const token = jwt.sign(
                // 1. payload
                { username: username },
                // 2. secret key
                process.env.JWT_SECRET_KEY,
                // 3. options
                { expiresIn: "1h" }
            );

            res.status(200).json({ 
                message: "Successfully logged in",
                token: token 
            })
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
            // const foundUser = users.find(user => user.username === username);
            const foundUser = user[0];

            // console.log(user)
            // console.log(foundUser)

            if (!foundUser) {
                return res.status(400).json({
                    message: "User does not exist"
                })
            }

            // send back full user data 
            return res.json({
                username: foundUser.username,
                name: foundUser.name
            })
        })
};

exports.addEntry = (req, res) => {
    // if valid token, continue
    const usernameFromToken = req.decoded.username;
    const userLoggedActivities = req.body;

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

            // console.log(foundUser)

            if (!foundUser) {
                return res.status(400).json({
                    message: "User does not exist"
                })
            }
            
            let userActivitiesToDb = userLoggedActivities.map(activity => ({
                user_id: foundUser.id,
                activity_id: activity.option[1],
                qty: activity.qty,
            }))

            console.log(userActivitiesToDb)

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
                    console.log(activities)
                    res.status(200).json(activities);
                })

            // res.sendStatus(200);
        })

}

// syntax:
function syntax() {
    // select one user from users table where age is greater than 18
    knex("users").where("age", ">", 18).first();

    // filter users by multiple where columns
    knex("users")
        .where({
            full_name: "Test User",
            is_boat: true,
        })
        .select("id");

    // select subquery
    const usersSubquery = knex("users")
        .where("age", ">", 18)
        .andWhere("is_deleted", false)
        .select("id");
    knex("programs").where("id", "in", usersSubquery);

    // pagination with offset and limit
    knex.select("*").from("orders").offset(0).limit(50);
}