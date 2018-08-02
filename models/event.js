import mongoose from 'mongoose';

var EventSchema = new mongoose.Schema({
  priority: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  startTime:{
    type: String,
    required: true
  },
  endTime:{
    type: String,
    required:true
  }
});

var Event = mongoose.model('Event', EventSchema);
module.exports = Event;
