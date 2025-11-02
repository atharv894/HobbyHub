import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Please provide a description'],
    trim: true
  },
  dateTime: {
    type: Date,
    required: [true, 'Please provide a date and time']
  },
  location: {
    type: String,
    required: [true, 'Please provide a location'],
    trim: true
  },
  hobby: {
    type: String,
    required: [true, 'Please provide a hobby'],
    trim: true
  },
  hostedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  participants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
}, {
  timestamps: true
});

export default mongoose.model('Event', eventSchema);

