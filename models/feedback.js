import mongoose from 'mongoose';

var FeedbackSchema = new mongoose.Schema({
  feedback: {
    type: String,
    required: true,
  },
  reach: {
    type: Boolean,
  }
});

var Feedback = mongoose.model('Feedback', FeedbackSchema);
module.exports = Feedback;
