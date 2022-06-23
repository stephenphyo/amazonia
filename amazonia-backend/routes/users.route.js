const router = require('express').Router();
const path = require('path');
const usersCtrl = require(path.join(__basedir, '/controllers/users.controller.js'));

/* GET */
router.get('/', usersCtrl.getUsers);

/* POST */
router.post('/signin', usersCtrl.SignIn);
router.post('/signup', usersCtrl.SignUp);
router.post('/signinMsal', usersCtrl.SignInMSAL);

module.exports = router;