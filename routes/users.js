const express = require('express');
const router = express.Router();
const passport = require('passport');

//accessing the controller folder
const usersController = require('../controller/users_controller');

// Router-Controller cycle
router.get('/sign-in', usersController.sign_in); //redirected to controller rendering sign-in page
router.get('/sign-up', usersController.sign_up); //redirected to controller rendering sign-up page
router.get('/sign-out', usersController.clear_session); //redirected to controller signing out user

router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect: '/users/sign-in'}
),usersController.create_session); //redirected to controller creating session for verified user

router.post('/new-user', usersController.new_user); //redirected to controller registering new user

module.exports = router;