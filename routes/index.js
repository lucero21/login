var express = require('express');
var passport = require('passport');
var Account = require('../models/account');
var router = express.Router();

console.log("Node servidor se ejecuta en http://localhost:3000");
router.get('/', function (req, res) {
  res.render('index', { user : req.user });
});

router.get('/register', function(req, res) {
  res.render('register', { });
});

router.post('/register', function(req, res) {
  console.log("se va ha agregar la cuenta");
  var cuenta=new Account({ username : req.body.username, edad:req.body.edad, pais:req.body.pais, email: req.body.email});
  console.log(cuenta.username);
  Account.register(cuenta, req.body.password, function(err, account) {
    if (err) {
      return res.render("register", {info: "Sorry. That username already exists. Try again."});
    }

    console.log("registrado sin error");
    passport.authenticate('local')(req, res, function () {
      res.redirect('/');
    });
  });
});

router.get('/login', function(req, res) {
  res.render('login', { user : req.user });
});

router.post('/login', passport.authenticate('local'), function(req, res) {
  res.redirect('/');
});

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

router.get('/ping', function(req, res){
  res.status(200).send("pong!");
});

module.exports = router;

