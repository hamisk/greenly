const router = require("express").Router();
const jwt = require("jsonwebtoken");
const authorize = require("../middleware/authorize");
const usersController = require('../controllers/usersController');

router.post('/register', usersController.createUser)

router.post('/login', usersController.login)

router.get('/profile', authorize, usersController.getProfile)

router.post('/add-entry', authorize, usersController.addEntry)

router.get('/get-activities', authorize, usersController.getUserActivities)


module.exports = router;