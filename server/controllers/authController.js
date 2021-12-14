const knex =
  process.env.NODE_ENV === 'production'
    ? require('knex')(require('../knexfile').production)
    : require('knex')(require('../knexfile').development);
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const salt = 10;

exports.createUser = (req, res) => {
    // const name = req.body.name;
    // const username = req.body.username;
    // const password = req.body.password;
    const { name, username, password, carbon, city, country } = req.body

    if (!name || !username || !password || !carbon) {
        return res.status(400).json({
            message: "Register requires name, username, and password"
        })
    }

    // at this point, we are guaranteed to have a 
    // name, username, and password

    bcrypt.hash(password, salt, function (err, hashedPassword) {

        const newUser = {
            name: name,
            username: username,
            password: hashedPassword,
            city: city,
            country: country,
            goal_carbon: carbon
        };
    
        console.log(newUser)
    
        knex('users')
            .insert(newUser)
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
    
                res.status(200)
                    .json({ 
                        message: "Successfully registered",
                        token: token 
                    })
            })
            .catch((err) =>
                res.status(400).send(`Error registering: ${err}`)
            );
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
            bcrypt.compare(password, foundUser.password, (err, result) => {

                if (!result) {
                    // invalid password, return response
                    return res.status(403).json({
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
                    { expiresIn: "6h" }
                );
    
                res
                    .status(200)
                    .json({ 
                        message: "Successfully logged in",
                        token: token 
                    })
            })
        })
        .catch((err) =>
            res.status(400).send(`Error retrieving user: ${err}`)
        );      
};

exports.checkAuth = (req, res) => {
    console.log("req.decoded in /auth/check-auth route", req.decoded);
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

            // send back username
            return res.status(200).json({
                username: foundUser.username,
                name: foundUser.name
            })
        })
}

exports.logout = (req, res) => {
    res.redirect(req.query.from);
};