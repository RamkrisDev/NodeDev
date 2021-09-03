var express = require('express');
var router = express.Router();

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });
const ctrluser=require("../controllers/user.controller")
const jwthelper=require("../bin/jwthelper")
router.get("/dashboard",ctrluser.home);
router.post("/register",ctrluser.register);
router.get("/totalData",ctrluser.totalData);
router.post("/authenticate",ctrluser.authenticate);
router.get('/userprofile',jwthelper.verifyJwtToken,ctrluser.userprofile);

module.exports = router;
