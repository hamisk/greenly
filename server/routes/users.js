const router = require("express").Router();
const jwt = require("jsonwebtoken");
const authorize = require("../middleware/authorize");

const users = [
    {
      name: 'Luke Skywalker',
      username: 'lovetheforce',
      password: 'vaderiscool'
    },
    {
      name: 'Anakin Skywalker',
      username: 'sandsucks',
      password: 'palpatineismean'
    }
];

router.post('/register', (req, res) => {
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

    users.push(newUser);

    console.log(users);
    
    res.sendStatus(200);
});

router.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password ) {
        return res.status(400).json({
            message: "Login requires username and password fields"
        })
    }

    // username and password are provided
    const foundUser = users.find(user => user.username === username);

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

    res.json({ 
        message: "Successfully logged in",
        token: token 
    });
});

router.get('/current', authorize, (req, res) => {
    console.log("req.decoded in /users/current route", req.decoded);
    // if valid token, continue
    const usernameFromToken = req.decoded.username;
    // find the user from users using username from the token
    const foundUser = users.find(user => user.username === usernameFromToken);
    
    if (!foundUser) {
        return res.status(400).json({
            message: "Unable to find user"
        })
    }

    // send back full user data 
    return res.json({
        username: foundUser.username,
        name: foundUser.name
    })
});


module.exports = router;