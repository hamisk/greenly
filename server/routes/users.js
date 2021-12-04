const router = require("express").Router();
const jwt = require("jsonwebtoken");
const authorize = require("../middleware/authorize");
const usersController = require('../controllers/usersController');

router.post('/register', usersController.createUser)

router.post('/login', usersController.login)

router.get('/profile', authorize, usersController.getProfile)

router.post('/add-entry', authorize, usersController.addEntry)


module.exports = router;