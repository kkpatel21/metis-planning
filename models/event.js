import mongoose from 'mongoose';

var EventSchema = new mongoose.Schema({
  Attendees: {
    type: Array,
    required: true
  },
  lastname: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    trim: true
  }
});

var User = mongoose.model('User', UserSchema);
module.exports = User;