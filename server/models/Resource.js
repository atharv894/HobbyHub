import mongoose from 'mongoose';

const resourceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title'],
    trim: true
  },
  url: {
    type: String,
    required: [true, 'Please provide a URL'],
    trim: true
  },
  hobby: {
    type: String,
    required: [true, 'Please provide a hobby'],
    trim: true
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

export default mongoose.model('Resource', resourceSchema);

