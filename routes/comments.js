const express = require('express');
const router = express.Router();
const passport = require('passport');

//accessing the controller folder
const commentsController = require('../controller/comments_controller');

// Router-Controller cycle
router.use('/create', passport.checkAuthentication,commentsController.create); //redirected to controller rendering comments page
router.use('/destroy', passport.checkAuthentication,commentsController.destroy); //redirected to controller rendering comments page

module.exports = router;