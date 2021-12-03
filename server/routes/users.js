const router = require("express").Router();
const jwt = require("jsonwebtoken");
const authorize = require("../middleware/authorize");
const usersController = require('../controllers/usersController');

router.post('/register', usersController.createUser)

router.post('/login', usersController.login)

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