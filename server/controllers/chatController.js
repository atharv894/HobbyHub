import Message from '../models/Message.js';

export const getMessages = async (req, res) => {
  try {
    const { hobby } = req.params;
    const messages = await Message.find({ hobby })
      .populate('sender', 'name email')
      .sort({ timestamp: 1 })
      .limit(100);

    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getHobbies = async (req, res) => {
  try {
    const hobbies = [
      'Photography',
      'Music',
      'Gaming',
      'Cooking',
      'Reading',
      'Writing',
      'Painting',
      'Sports',
      'Dancing',
      'Gardening',
      'Crafts',
      'Travel',
      'Fitness',
      'Yoga',
      'Programming'
    ];
    res.json(hobbies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

