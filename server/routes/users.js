const router = require("express").Router();
const jwt = require("jsonwebtoken");
const authorize = require("../middleware/authorize");
const usersController = require('../controllers/usersController');

router.get('/profile', authorize, usersController.getProfile)

router.post('/add-entry', authorize, usersController.addEntry)

router.get('/get-activities', authorize, usersController.getUserActivities)

router.delete('/delete-user-activity/:id', authorize, usersController.deleteUserActivity)

router.get('/get-users', usersController.getUsers)

router.put('/update', authorize, usersController.updateUser)

module.exports = router;