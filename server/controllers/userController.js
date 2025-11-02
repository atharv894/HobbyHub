import User from '../models/User.js';

export const updateHobbies = async (req, res) => {
  try {
    const { hobbies } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user.userId,
      { hobbies },
      { new: true, runValidators: true }
    ).select('-password');

    res.json({ message: 'Hobbies updated successfully', user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

