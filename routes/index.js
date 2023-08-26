const express = require('express');
const router = express.Router();

//accessing the controller folder
const homeController = require('../controller/home_controller');

// Router-Controller cycle
router.get('/', homeController.home); //redirected to controller rendering home page
router.use('/users', require('./users')); //redirected to controller rendering users page
router.use('/functionality', require('./functionality')); //redirected to controller rendering functionality page
router.use('/project', require('./project')); //redirected to controller rendering projects page


module.exports = router;