import express from "express";
import User from "../models/user";
import Event from "../models/event";

import Feedback from "../models/feedback";
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
import sgMail from "@sendgrid/mail";
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

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
    res.redirect("/");
  });

  //logout
  router.get("/logout", function(req, res) {
    // mongoose.sessions.remove({ 'session.user': req.userId. });
    req.session.destroy();
    req.logout();
    res.redirect("/");
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
      ideation: [],
      logistics: [],
      collaborators: [],
      caterers: [],
      people: [],
      fundraising: []
    }).save(function(err, event) {
      if (err) {
        res.send(err);
        return;
      } else if (event) {
        res.json({
          status: "success"
        });
      }
    });
  });

  //add venues
  router.post("/addVenue", upload.single("uploadFile"), (req, res) => {
    Event.findById(req.body.id, (err, event) => {
      if (event) {
        event.logistics.push({
          name: req.body.name,
          email: req.body.email,
          status: req.body.status,
          contact: req.body.contact,
          address: req.body.address,
          uploadFile: req.file,
          lat: req.body.lat,
          long: req.body.long
        });
        event.markModified("logistics");
        event.save((err, event) => {
          if (err) {
            req.json({ status: "error", error: err });
          } else {
            res.json({ status: "success" });
          }
        });
      }
    });
  });

  //edit venues
  router.post("/editVenue", upload.single("uploadFile"), (req, res) => {
    console.log("EDIT VALUES RECEIVED!!!!!!!!!!", req.body)
    Event.findById(req.body.id, (err, event) => {
      if (event) {
        event.logistics[req.body.index] = {
          name: req.body.name,
          email: req.body.email,
          status: req.body.status,
          contact: req.body.contact,
          address: req.body.address,
          uploadFile: req.file,
          lat: req.body.lat,
          long: req.body.long
        };
        event.markModified("logistics");
        event.save((err, event) => {
          if (err) {
            req.json({ status: "error", error: err });
          } else {
            res.json({ status: "success", event: event });
          }
        });
      }
    });
  });

  router.post("/newFeedback", function(req, res) {
    new Feedback({
      feedback: req.body.feedback,
      reach: req.body.reach
    }).save(function(err, feedback) {
      if (err) {
        res.send(err);
      } else if (feedback) {
        res.json({
          status: 200
        });
      }
    });
  });

  //add list to ideation(in progress) --> SOCKETS
  router.post("/addIdeation", function(req, res) {
    User.findById(req.user._id).then(user => {
      Event.findById(req.body.id, (err, event) => {
        if (event) {
          event.ideation.push({
            topic: req.body.topic,
            note: [],
            user: user.firstname
          });
          event.markModified("ideation");
          event.save((err, event) => {
            if (err) {
              res.send(err);
            } else {
              res.json({
                status: "success",
                ideation: event.ideation
              });
            }
          });
        } else if (err) {
          res.json({
            status: "error",
            error: err
          });
          return;
        }
      });
    });
  });

  //render ideation --> SOCKETS
  router.get("/getIdeation/:id", function(req, res) {
    Event.findById(req.params.id, (err, event) => {
      if (err) {
        res.json(err);
      } else if (event) {
        res.json(event.ideation);
      }
    });
  });

  //get user info --> SOCKETS
  router.post("/getUserInfo", function(req, res) {
    User.findById(req.user._id, (err, user) => {
      if (user) {
        res.json(user);
      } else if (!user) {
        res.send("user not found");
      } else {
        res.json({
          status: "error",
          error: err
        });
      }
    });
  });

  return router;
};
