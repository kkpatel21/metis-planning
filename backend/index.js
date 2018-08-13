import express from "express";
import User from "../models/user";
import Event from "../models/event";
import path from "path";
import mongoose from "mongoose";
import cookie from "cookie";
import cookieParser from "cookie-parser";
import multer from "multer";
var storage = multer.diskStorage({
  destination: path.resolve(__dirname, "../build/images"),
  filename: function(req, file, cb) {
    console.log(file);
    cb(null, Date.now() + "_" + file.originalname);
  }
});
var upload = multer({ storage: storage });
import sgMail from "@sendgrid/mail";
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

module.exports = (io, store) => {
  // This function gets us the user ID that has just logged in to the server
  io.use((socket, next) => {
    let cookies;
    if (socket.request.headers.cookie) {
      cookies = cookie.parse(socket.request.headers.cookie);
      cookies = cookieParser.signedCookies(cookies, process.env.SECRET);
      socket.sid = cookies["connect.sid"];
      store.get(socket.sid, (err, session) => {
        if (!err) {
          delete session.cookie;
          socket.session = session;
          next();
        } else {
          next(err);
        }
      });
    } else {
      next(new Error("No cookie transmitted"));
    }
  });

  //All socket calls should be within here

  io.on("connection", function(socket) {
    // This is to get the user.id: socket.session.passport.user

    // Res works with Next, and the first parameter works with the second parameter.
    socket.on("fetchEvents", next => {
      console.log("Will This Rehit?");
      User.findById(socket.session.passport.user).then(user => {
        Event.find({}, (err, events) => {
          let filtered = [];
          events.forEach(event => {
            if (event.collaborators.length > 0) {
              event.collaborators.forEach(collaborator => {
                if (collaborator.email === user.email) {
                  filtered.push(event);
                }
              });
            }
            if (event.owner === user.id) {
              filtered.push(event);
            }
          });
          next({ err, filtered });
        });

        socket.on("deleteEvent", (data, next) => {
          Event.findByIdAndRemove(data.id, (err, event) => {
            next({ err, event });
          });
        });
      });
    });

    //deletes events
    socket.on("deleteEvent", (data, next) => {
      Event.findByIdAndRemove(data.id, (err, event) => {
        console.log("hey");
        //makes everyone on the server to re-render
        io.emit("fetchEvents");
        next({ err, event });
      });
    });

    //open event and join event channel
    socket.on("joinRoom", (data, next) => {
      socket.join(data.eventId);
      next({ success: "Joined" });
    });

    //get people
    socket.on("getPeople", data => {
      Event.findById(data.eventId, (err, event) => {
        io.to(data.eventId).emit("sendPeople", { guestList: event.people });
      });
    });

    //update guestList
    socket.on("savePeople", data => {
      Event.findById(data.eventId, (err, event) => {
        let guestList = event.people.slice();
        guestList[data.index] = data.updateInvitee;
        event.people = guestList.slice();
        event.markModified("people");
        event.save((err, eve) => {
          io.to(data.eventId).emit("updatedPeople", { guestList: guestList });
        });
      });
    });

    //add guests
    socket.on("addInvitee", data => {
      Event.findById(data.eventId, (err, event) => {
        event.people.push(data.newInvitee);
        event.markModified("people");
        event.save((err, eve) => {
          io.to(data.eventId).emit("updatedPeople", { guestList: eve.people });
        });
      });
    });

    //delete guests
    socket.on("deleteInvitee", data => {
      Event.findById(data.eventId, (err, event) => {
        console.log(event)
        event.people.splice(data.index, 1);
        console.log(event.people);
        event.markModified("people");
        event.save((err, eve) => {
          io.to(data.eventId).emit("updatedPeople", { guestList: eve.people });
        });
      });
    });

    //sendOneEmail
    socket.on("sendEmail", data => {
      User.findById(socket.session.passport.user, (err, user) => {
        let msg = {
          to: data.to,
          from: user.email,
          subject: data.subject,
          text: data.message
        };
        sgMail.send(msg).then(() => {
          next({ success: "Email Sent" });
        });
      });
    });

    socket.on("sendMultipleEmail", data => {
      User.findById(socket.session.passport.user, (err, user) => {
        let msg = {
          to: data.to,
          from: user.email,
          subject: data.subject,
          text: data.message
        };
        sgMail.sendMultiple(msg).then(() => {
          next({ success: "Email Sent" });
        });
      });
    });

    socket.on("addCollaborator", data => {
      Event.findById(data.eventId, (err, event) => {
        event.collaborators.push(data.collaborator);
        event.markModified("collaborators");
        event.save((err, event) => {
          console.log("Event Saved");
        });
      });
    });

    var userId = socket.session.passport.user;
    //Saving Ideation - Array of Objects{topic: "someTopic", user:"writer's name", notes:[comments]}
    socket.on("addIdeation", (data, next) => {
      User.findById(socket.session.passport.user).then(user => {
        Event.findById(data.id, (err, event) => {
          if (event) {
            event.ideation.push({
              topic: data.topic,
              note: [],
              user: user.firstname
            });
            event.markModified("ideation");
            event.save((err, event) => {
              next({ err, event });
            });
          } else if (err) {
            next({ err });
          }
        });
      });
    });

    //Getting Ideation to render
    socket.on("getIdeation", (data, next) => {
      Event.findById(data.id, (err, event) => {
        next({ err, event });
      });
    });

    //Deleting Ideation
    socket.on("deleteIdeation", (data, next) => {
      Event.findById(data.id, (err, event) => {
        if (event) {
          event.ideation = event.ideation.filter(ideationObj => {
            return ideationObj.topic !== data.topic;
          });
          event.save((err, event) => {
            next({ err, event });
          });
        }
      });
    });

    //Adding Comments to Ideation
    socket.on("addComment", (data, next) => {
      Event.findById(data.id, (err, event) => {
        if (event) {
          event.ideation.map(ideationObj => {
            if (ideationObj.topic === data.topic.topic) {
              return (ideationObj.note = ideationObj.note.concat(data.typing));
            }
          });
          event.markModified("ideation");
          event.save((err, event) => {
            next({ err, event });
          });
        } else if (err) {
          next({ err });
        }
      });
    });

    //editing topic
    socket.on("editIdeation", (data, next) => {
      Event.findById(data.id, (err, event) => {
        if (event) {
          event.ideation.map(ideationObj => {
            console.log("OLD TOPIC****************",data.topic)
            console.log("NEW TOPIC&&&&&&&&&&&&&", data.newTopic)
            if (ideationObj.topic === data.topic) {
              ideationObj.topic = data.newTopic;
            }
          });
          event.markModified("ideation");
          event.save((err, event) => {
            next({ err, event });
          });
        } else if (err) {
          next({ err });
        }
      });
    });

  //add line item to budget page
  socket.on('addLineItem', (data, next) => {
    Event.findById(data.eventId, (err, event) => {
      console.log(data.totalApproval)
      event.budget.budgetItems.push(data.budgetItems)
      event.markModified("budget");
      event.save((err, event) => {
        io.to(data.eventId).emit('updatedBudget', { budgetItem: event.budget.budgetItems });
      });
    })
  })

  });
};
