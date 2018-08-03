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
  },
  uploadFile:{
    type: Object,
    required: false
  }

});

var Event = mongoose.model('Event', EventSchema);
module.exports = Event;
