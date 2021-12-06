const router = require("express").Router();
const jwt = require("jsonwebtoken");
const authorize = require("../middleware/authorize");
const authController = require('../controllers/authController');

router.get('/check-auth', authorize, authController.checkAuth)

router.post('/register', authController.createUser)

router.post('/login', authController.login)

router.get('/logout', authController.logout)

module.exports = router;