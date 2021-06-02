var express = require('express');
var router = express.Router();
const db = require('../models/index');
const User = db.sequelize.models.User;

/* GET home page. */
router.get('/', function(req, res, next) {
  User.findAll({
    raw: true
  }) .then(function (result) {
      res.render('userprofile', { users : result,title: 'StudentCafe Project Development' });
    })


 
});

module.exports = router;
