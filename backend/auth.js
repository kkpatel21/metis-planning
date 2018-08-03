import express from 'express';
import User from '../models/user';
import Event from "../models/event";
import path from 'path';
import mongoose from 'mongoose';
import multer from "multer";
var storage = multer.diskStorage({
  destination: path.resolve(__dirname,"../build/images"),
  filename: function (req, file, cb) {
    console.log(file)
    cb(null, Date.now() + "_" + file.originalname)
  }
})
var upload = multer({ storage: storage })
let router = express.Router()


module.exports = (passport) => {
  //registration
  var validateReq = function(userData) {
    return (userData.firstname && userData.lastname && userData.email && userData.password && userData.passwordRepeat);
  };

  var validatePassword = function(userData) {
    return (userData.password === userData.passwordRepeat)
  }

  var validateEmail = function(userData) {
    return (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userData.email))
  }

  router.post('/signup', function(req, res) {
    if (!validateReq(req.body)) {
      return res.send('incomplete')
    } else if(!validateEmail(req.body)) {
      return res.send('email')
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

  //login
  router.post('/login', passport.authenticate('local'), (req, res) => {
    res.json({
      userId: req.user._id,
      success: true
    })
  });

  //logout
  router.get('/logout', function(req, res) {
    console.log(req.user)
    // mongoose.sessions.remove({ 'session.user': req.userId. });
    // req.session = null;
    req.logout();
    res.json({
      success: true
    })
  });

  //new event
  router.post("/newEvent", upload.single("uploadFile"), function(req,res){
    console.log("req.FILE -----------> " + req.file)
    new Event({
      priority: req.body.priority,
      title: req.body.title,
      startTime: req.body.startTime,
      endTime: req.body.endTime,
      date: req.body.date,
      uploadFile: req.file
    })
    .save(function(err, event) {
      if(err){
        res.send(err);
        return;
      }
      res.json({
        status: "success"
      })
    })
  })




  return router;
}
