const express = require('express');
const router = express.Router();
const passport = require('passport');

//accessing the controller folder
const functionalityController = require('../controller/functionality_controller');

// Router-Controller cycle
router.get('/add-project', passport.checkBuilder,functionalityController.add_project); //redirected to controller rendering sign-in page
router.get('/portfolio', functionalityController.portfolio); //redirected to controller rendering sign-up page
router.get('/project-description/:id', passport.checkBuilderClient, functionalityController.project_disc);
router.post('/new-project', passport.checkBuilder,functionalityController.new_project); //redirected to controller rendering sign-up page
module.exports = router;