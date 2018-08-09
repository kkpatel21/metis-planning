import express from 'express';
import User from '../models/user';
import Event from "../models/event";
import path from 'path';
import mongoose from 'mongoose';
import cookie from 'cookie'
import cookieParser from 'cookie-parser'

module.exports = (io, store) => {

  // This function gets us the user ID that has just logged in to the server
  io.use((socket, next) => {
    let cookies;
    if (socket.request.headers.cookie) {
      cookies = cookie.parse(socket.request.headers.cookie)
      cookies = cookieParser.signedCookies(cookies, process.env.SECRET)
      socket.sid = cookies['connect.sid']
      store.get(socket.sid, (err, session) => {
        if (!err) {
          delete(session.cookie)
          socket.session = session
          next()
        } else {
          next(err)
        }
      })
    } else {
      next(new Error ('No cookie transmitted'))
    }
  })

  //All socket calls should be within here

  io.on('connection', function(socket) {
    // This is to get the user.id: socket.session.passport.user

    // Res works with Next, and the first parameter works with the second parameter.
    socket.on('fetchEvents', (next) => {
      User.findById(socket.session.passport.user)
      .then((user) => {
        Event.find({}, (err,events) => {
          let filtered = []
          events.forEach((event) => {
            if (event.collaborators.length > 0) {
              event.collaborators.forEach((collaborator) => {
                if (collaborator.email === user.email) {
                  filtered.push(event)
                }
              })
            }
            if (event.owner === user.id) {
              filtered.push(event)
            }
          })
          next({err, filtered})

        })
      })
    })

    socket.on('deleteEvent', (data, next) => {
      Event.findByIdAndRemove(data.id, (err, event) => {
        io.emit('fetchEvents')
        next({err, event})
      });
    })


    //Saving new Topic to Ideation
    // socket.one("addIdeation")
  })
}
