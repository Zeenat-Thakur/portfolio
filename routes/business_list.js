var express = require('express');
var router = express.Router();
const Business = require("../db/business_model");

/* GET home page. */
router.get('/', async (req, res, next) => {
    Business.find()
        .sort({name: -1})
        .then((contacts) => {
            res.render('business_list', {title: 'Express', str: contacts});
        }).catch((errors) => {
        res.render('business_list', {title: 'Express', error: errors});
    })
});

module.exports = router;
