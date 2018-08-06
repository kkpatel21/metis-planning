import express from "express";
import User from "../models/user";
import Event from "../models/event";
import path from "path";
import mongoose from "mongoose";
import multer from "multer";
var storage = multer.diskStorage({
  destination: path.resolve(__dirname, "../build/images"),
  filename: function(req, file, cb) {
    console.log(file);
    cb(null, Date.now() + "_" + file.originalname);
  }
});
var upload = multer({ storage: storage });
let router = express.Router();

module.exports = passport => {
  //registration
  var validateReq = function(userData) {
    return (
      userData.firstname &&
      userData.lastname &&
      userData.email &&
      userData.password &&
      userData.passwordRepeat
    );
  };

  var validatePassword = function(userData) {
    return userData.password === userData.passwordRepeat;
  };

  var validateEmail = function(userData) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userData.email);
  };

  router.post("/signup", function(req, res) {
    if (!validateReq(req.body)) {
      return res.send("incomplete");
    } else if (!validateEmail(req.body)) {
      return res.send("email");
    } else if (!validatePassword(req.body)) {
      return res.send("passwords");
    } else {
      User.findOne(
        {
          email: req.body.email
        },
        (err, user) => {
          if (user) {
            return res.send("exists");
          } else if (!user) {
            new User({
              firstname: req.body.firstname,
              lastname: req.body.lastname,
              email: req.body.email,
              password: req.body.password
            }).save(function(err, user) {
              if (err) {
                res.send(err);
                return;
              }
              res.send(true);
            });
          }
        }
      );
    }
  });

  //login
  router.post("/login", passport.authenticate("local"), (req, res) => {
    res.json({
      userId: req.user._id,
      success: true
    });
  });

  //logout
  router.get("/logout", function(req, res) {
    // mongoose.sessions.remove({ 'session.user': req.userId. });
    // req.session = null;
    req.logout();
    res.json({
      success: true
    });
  });

  //new event
  router.post("/newEvent", upload.single("uploadFile"), function(req, res) {
    new Event({
      priority: req.body.priority,
      title: req.body.title,
      startTime: req.body.startTime,
      endTime: req.body.endTime,
      date: req.body.date,
      uploadFile: req.file,
      owner: req.user._id, //credentials!!!!
      ideation: []
    }).save(function(err, event) {
      if (err) {
        res.send(err);
        return;
      }
      res.json({
        status: "success"
      });
    });
  });

  //delete event
  router.post("/deleteEvent", function(req, res) {
    Event.findByIdAndRemove(req.body.id, (err, event) => {
      if (err) {
        res.send(err);
        return;
      } else {
        res.sendStatus(200);
      }
    });
  });

  //add list to ideation(in progress)
  router.post("/addIdeation", function(req, res) {
    console.log("id ----------->"+req.body.id)
    Event.findById(req.body.id, (err, event) => {
      if (event) {
        event.ideation.push({note:req.body.typing, user:req.user._id});
        console.log('in the backend', event)
        event.markModified("ideation")
        event.save((err, event) => {
          if (err) {
            console.log('is the err here?', err)
            res.send(err);
          } else {
            res.json({
              status: "success"
            });
          }
        });
      } else if (err) {
        console.log('or here?')
        res.json({
          status: "error",
          error: err
        });
        return;
      }
    });
  });

  //render ideation
  router.get("/getIdeation/:id", function(req,res){
    Event.findById(req.params.id, (err, event) => {
      if(err){
        res.json(err)
      }else if (event){
        res.json(event.ideation)
      }
    })
  })

  //
  return router;
};
