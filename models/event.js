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
  },
  owner:{
    type: String,
    required: true
  },
  ideation:{
    type: Array,
    required: false
  },
  people:{
    type: Array,
    required: false
  },
  caterers: {
    type: Array,
    required: false
  },
  collaborators:{
    type: Array,
    required: false
  },
  fundraising:{
    type: Array,
    required: false
  },
  budget:{
    budgetItems: {
      type: Array,
      required: false
    },
    total: {
      type: Number,
      required: false
    },
    totalApproval:{
      type: String,
      required: false
    }
  },
  logistics:{
    type:Array,
    required: false
  },
},
{ usePushEach: true }
);

var Event = mongoose.model('Event', EventSchema);
module.exports = Event;
