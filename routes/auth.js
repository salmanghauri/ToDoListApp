const router = require('express').Router();
const {body} = require('express-validator');

const authCtrl = require('../controllers/auth');

router.get("/signup", authCtrl.auth_signup_get);
router.get("/signin", authCtrl.auth_signin_get);
router.post("/signup", [
    body('firstName').isLength({min : 2}).withMessage("first name must be at least 2 characters long"),
    body('lastName').isLength({min : 2}),
    body('emailAddress').isEmail(),
    body('password').isLength({min : 5}),
], authCtrl.auth_signup_post);
router.post("/signin", authCtrl.auth_signin_post);
router.get("/logout", authCtrl.auth_logout_get);

module.exports = router;
