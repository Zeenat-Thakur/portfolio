const express = require('express');
const router = express.Router();
const passport = require("passport");


const User = require("../db/userModel");

/* GET Login page. */
router.get('/', function (req, res, next) {
    res.render('login', {title: 'Express'});
});

router.get('/view/register', function (req, res, next) {
    res.render('signup', {title: 'Express'});
});

router.post("/register", function (req, res) {
    console.log(JSON.stringify(req.body))
    User.register(
        new User({
            username: req.body.username,
            email: req.body.email,
        }),
        req.body.password, function (err, user) {
            if (err) {
                console.log(err);
                return res.render('login');
            }
            passport.authenticate("local")(req, res, function () {
                res.redirect("/business");
            });
        });
})
router.post('/login',
    passport.authenticate('local', {
        successRedirect: '/business',
        failureRedirect: '/auth'
    }), function (req, res) {
        console.log(JSON.stringify(req.body))
    });
module.exports = router;

