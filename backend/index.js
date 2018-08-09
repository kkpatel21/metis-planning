import express from "express";
import User from "../models/user";
import Event from "../models/event";
import path from "path";
import mongoose from "mongoose";
import cookie from "cookie";
import cookieParser from "cookie-parser";

module.exports = (io, store) => {
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

  io.on("connection", function(socket) {
    //This is to get the user.id
    // console.log('connect session: ', socket.session.passport.user)

    //Res works with Next, and the first parameter works with the second parameter.
    socket.on("fetchEvents", next => {
      let email;
      User.findById(socket.session.passport.user).then(user => {
        Event.find({}, (err, events) => {
          let filtered = [];
          events.forEach(event => {
            console.log("each", event);
            if (event.collaborators.length > 0) {
              console.log(event.collaborators);
              event.collaborators.forEach(collaborator => {
                if (collaborator.email === user.email) {
                  filtered.push(event);
                }
              });
            }
            console.log(user._id);
            if (event.owner === user.id) {
              filtered.push(event);
            }
          });
          next({ err, filtered });
        });
      });
    });

    socket.on("deleteEvent", (data, next) => {
      Event.findByIdAndRemove(data.id, (err, event) => {
        next({ err, event });
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
      Event.findById(data.id, (err,event) => {
        if (event) {
          event.ideation.map(ideationObj => {
            if(ideationObj.topic === data.topic){
              ideationObj.note.concat(data.typing)
            }
          });
          event.save((err, event) => {
            next({ err, event });
          });
        }
      })
    })

    //Getting Ideation to render
    socket.on("getIdeation", (data, next) => {
      Event.findById(data.id, (err,event)=>{
        console.log("GETTING EVENT", event)
        next({err, event})
      })
    })
  });
};
