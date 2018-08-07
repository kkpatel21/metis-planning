import express from 'express';
import User from '../models/user';
import Event from "../models/event";
import path from 'path';
import mongoose from 'mongoose';

module.exports = (io) => {


  io.on('connection', function(socket) {
    console.log("connected")

    //Res works with Next, and the first parameter works with the second parameter.
    socket.on('fetchEvents', (next) => {
      Event.find()
      .exec(function(err, events) {
        let filtered = []
        if (events)
        next({err, events})
      })
    })



  })


}
