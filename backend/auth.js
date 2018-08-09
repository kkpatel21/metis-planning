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
})
var upload = multer({ storage: storage })
let router = express.Router()
import sgMail from '@sendgrid/mail';
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

module.exports = (passport) => {
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

  router.get('/getCurrentUser', function(req, res) {
    console.log('hey')
  })

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
    console.log("Adding New Event!!!!!!!!!!!!!", req.body)
    new Event({
      priority: req.body.priority,
      title: req.body.title,
      startTime: req.body.startTime,
      endTime: req.body.endTime,
      date: req.body.date,
      uploadFile: req.file,
      owner: req.user._id, //credentials!!!!
      ideation: [],
      collaborators: [],
    }).save(function(err, event) {
      console.log("THIS IS NEW EVENT",event)
      if (err) {
        console.log("GETTING ERROR >>>>>>>>>>>>>>>>>", err)
        res.send(err);
        return;
      }else if(event){
        console.log("SHOULD BE SAVING")
        res.json({
          status: "success"
        });
      }
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
    console.log(req.body)
    User.findById(req.user._id)
    .then((user) => {
      Event.findById(req.body.id, (err, event) => {
        console.log("THIS IS ID=============",req.body.id)
        if (event) {
          event.ideation.push({topic:req.body.topic, note:[], user: user.firstname});
          event.markModified("ideation")
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
    })
  });

  //add invitee to guest list
  router.post('/addInvitee', function(req, res) {
    Event.findById(req.body.id)
    .then((event) => {
      event.people.push(req.body.guest)
      event.markModified('people')
      event.save((err, event) => {
        if(err) {
          res.send(err);
        } else {
          res.json({
            status: 'success',
            people: event.people
          });
        }
      });
    })
    .catch((err) => {
      res.send(err)
    })
  })

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

  //render people
  router.get("/getPeople/:id", function(req,res){
    Event.findById(req.params.id, (err, event) => {
      if(err){
        res.json(err)
      }else if (event){
        res.json(event.people)
      }
    })
  })

  router.post('/savePeople/:id', function(req, res) {
    Event.findById(req.params.id)
    .then((event) => {
      event.people = req.body.guests
      event.markModified('people')
      event.save((err, event) => {
        if (err) {
          res.send(err);
        } else {
          res.json({
            status: 'success',
            people: event.people
          })
        }
      })
    })
  })

  //sendEmails
  router.post('/sendEmail', function(req, res) {
    User.findById(req.user._id)
    .then((user) => {
      let msg = {
        to: req.body.to,
        from: user.email,
        subject: req.body.subject,
        text: req.body.message
      }
      sgMail.send(msg)
      .then(() => {
        res.send('Email Sent')
      })
    })
  })

  //sendMultipleEmails
  router.post('/sendMultipleEmails', function(req, res) {
    User.findById(req.user._id)
    .then((user) => {
      let msg = {
        to: req.body.to,
        from: user.email,
        subject: req.body.subject,
        text: req.body.message
      }
      sgMail.sendMultiple(msg)
      .then(() => {
        res.send('Email Sent')
      })
    })
  })


  //get user info
  router.post("/getUserInfo", function(req,res){
    User.findById(req.user._id, (err, user) => {
      if(user){
        res.json(user)
      }else if(!user){
        res.send("user not found")
      }else{
        res.json({
          status: "error",
          error: err
        });
      }
    })
  })

  //shareDoc
  router.post('/addCollaborator', function(req, res) {
    console.log('hey')
    Event.findById(req.body.id, (err, event) => {
      event.collaborators.push(req.body.collaborator)
      event.markModified('collaborators')
      event.save((err, event) => {
        if (err) {
          res.send(err)
        } else {
          res.json({
            status: 'success',
            collaborators: event.collaborators
          })
        }
      })
    })
  })

  return router;
};
