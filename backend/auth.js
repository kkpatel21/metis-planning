import express from 'express';
import User from '../models/user';
import path from 'path';
import mongoose from 'mongoose';
let router = express.Router()

module.exports = function(passport) {
  //registration
  var validateReq = function(userData) {
    return (userData.firstname && userData.lastname && userData.email && userData.password && userData.passwordRepeat);
  };

  var validatePassword = function(userData) {
    return (userData.password === userData.passwordRepeat)
  }

  router.post('/signup', function(req, res) {
    console.log('backend fired')
    if (!validateReq(req.body)) {
      return res.send('incomplete')
    } else if(!validatePassword(req.body)) {
      return res.send('passwords')
    } else {
      User.findOne({
        email: req.body.email
      }, (err, user) => {
        if(user) {
          return res.send('exists')
        } else if (!user) {
          new User({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            password: req.body.password
          })
          .save(function(err, user) {
            if (err) {
              res.send(err);
              return;
            }
            res.send(true)
          })
        }
      })
    };
  });

  router.post('/login', function(req,res, next){
    console.log("got /login!")
    next();
  })

  //login
  router.post('/login', passport.authenticate('local'), (req, res) => {
    res.json({
      userId: req.user._id,
      success: true
    })
  });
  //
  // //logout
  // router.get('/logout', function(req, res) {
  //   req.logout();
  //   res.send(true);
  // });

  return router;
}
