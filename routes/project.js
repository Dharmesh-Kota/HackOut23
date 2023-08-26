const express = require('express');
const router = express.Router();
const passport = require('passport');

//accessing the controller folder
const projectController = require('../controller/project_controller');

// Router-Controller cycle
router.use('/comments', require('./comments')); //redirected to controller rendering comments page
router.post('/update', passport.checkBuilder,projectController.update); //redirected to controller rendering comments page
router.get('/community-engagement', passport.checkAuthentication,projectController.community_engagement); //redirected to controller rendering comments page
router.get('/project-description/:id', passport.checkAuthentication, projectController.project_disc); //redirected to controller rendering comments page

module.exports = router;