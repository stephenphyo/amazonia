const router = require('express').Router();
const path = require('path');
const profileCtrl = require(path.join(__basedir, '/controllers/profile.controller.js'));
const profileMid = require(path.join(__basedir, '/middleware/profile.middleware.js'));

/* POST */
router.post('/pfp', profileMid.UploadImages, profileCtrl.ChangePfp);

module.exports = router;