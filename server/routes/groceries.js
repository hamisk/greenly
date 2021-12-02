const router = require('express').Router();
const groceriesController = require('../controllers/groceriesController');

router.get('/', groceriesController.getGroceries);

module.exports = router;