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
            // const foundUser = users.find(user => user.username === username);
            const foundUser = user[0];
            console.log(user)
            console.log(foundUser)

            if (!foundUser) {
                return res.status(400).json({
                    message: "User does not exist"
                })
            }
            console.log(password, foundUser.password)
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