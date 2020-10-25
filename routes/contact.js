const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('contact', {title: 'Express'});
});
router.post("/submit", function (req, res) {
    console.log(JSON.stringify(req.body))
});

module.exports = router;
