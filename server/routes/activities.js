const router = require('express').Router();
const activitiesController = require('../controllers/activitiesController');
const authorize = require("../middleware/authorize");

router.get('/', activitiesController.getActivities);

router.post('/add-new-activity', authorize, activitiesController.addNewActivity);

module.exports = router;