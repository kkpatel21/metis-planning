import express from 'express';
import User from '../models/user';
import Event from "../models/event";
import path from 'path';
import mongoose from 'mongoose';
import cookie from 'cookie'
import cookieParser from 'cookie-parser'

module.exports = (io, store) => {

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

  io.on('connection', function(socket) {
    console.log('connect session: ', socket.session.passport.user)
    //Res works with Next, and the first parameter works with the second parameter.
    socket.on('fetchEvents', (next) => {
      let email;
      User.findById(socket.session.passport.user)
      .then((user) => {
        Event.find()
        .exec(function(err, events) {
          let filtered = []
          events.forEach((event) => {
            if (event.collaborators.includes(user.email) || event.owner === user._id) {
              filtered.push(event)
            }
          })
        })
      })
      Event.find()
      .exec(function(err, events) {
        let filtered = []
        if (events)
        next({err, events})
      })
    })

    //The Socket version of api/newEvent

  })

}
