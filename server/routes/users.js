const router = require("express").Router();
const jwt = require("jsonwebtoken");
const authorize = require("../middleware/authorize");
const usersController = require('../controllers/usersController');

router.get('/profile', authorize, usersController.getProfile)

router.post('/add-entry', authorize, usersController.addEntry)

router.get('/get-activities', authorize, usersController.getUserActivities)

router.get('/get-users', usersController.getUsers)

module.exports = router;