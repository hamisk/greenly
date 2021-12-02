const router = require('express').Router();
const activitiesController = require('../controllers/activitiesController');

router.get('/', activitiesController.getActivities);

module.exports = router;