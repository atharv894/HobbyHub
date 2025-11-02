import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  content: {
    type: String,
    required: [true, 'Please provide message content'],
    trim: true
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  hobby: {
    type: String,
    required: [true, 'Please provide a hobby'],
    trim: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Message', messageSchema);

