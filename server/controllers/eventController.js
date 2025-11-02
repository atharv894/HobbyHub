import Event from '../models/Event.js';
import User from '../models/User.js';

export const createEvent = async (req, res) => {
  try {
    const { title, description, dateTime, location, hobby } = req.body;

    if (!title || !description || !dateTime || !location || !hobby) {
      return res.status(400).json({ message: 'Please provide all fields' });
    }

    const event = await Event.create({
      title,
      description,
      dateTime,
      location,
      hobby,
      hostedBy: req.user.userId,
      participants: [req.user.userId]
    });

    await User.findByIdAndUpdate(req.user.userId, {
      $push: { hostedEvents: event._id, joinedEvents: event._id }
    });

    const populatedEvent = await Event.findById(event._id)
      .populate('hostedBy', 'name email')
      .populate('participants', 'name email');

    res.status(201).json(populatedEvent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllEvents = async (req, res) => {
  try {
    const { hobby } = req.query;
    const filter = hobby ? { hobby } : {};
    
    const events = await Event.find(filter)
      .populate('hostedBy', 'name email')
      .populate('participants', 'name email')
      .sort({ dateTime: 1 });

    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)
      .populate('hostedBy', 'name email')
      .populate('participants', 'name email');

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const joinEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    if (event.participants.includes(req.user.userId)) {
      return res.status(400).json({ message: 'Already joined this event' });
    }

    event.participants.push(req.user.userId);
    await event.save();

    await User.findByIdAndUpdate(req.user.userId, {
      $addToSet: { joinedEvents: event._id }
    });

    const populatedEvent = await Event.findById(event._id)
      .populate('hostedBy', 'name email')
      .populate('participants', 'name email');

    res.json(populatedEvent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const leaveEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    if (event.hostedBy.toString() === req.user.userId) {
      return res.status(400).json({ message: 'Host cannot leave their own event' });
    }

    event.participants = event.participants.filter(
      p => p.toString() !== req.user.userId
    );
    await event.save();

    await User.findByIdAndUpdate(req.user.userId, {
      $pull: { joinedEvents: event._id }
    });

    res.json({ message: 'Left event successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

