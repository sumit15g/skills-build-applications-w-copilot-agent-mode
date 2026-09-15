import express, { Request, Response } from 'express';
import { Activity } from '../models/Activity.js';

const router = express.Router();

// Get all activities
router.get('/', async (_request: Request, response: Response) => {
  try {
    const activities = await Activity.find().populate('userId', 'username email');
    response.json(activities);
  } catch (error) {
    response.status(500).json({ error: 'Failed to fetch activities' });
  }
});

// Get activities by user
router.get('/user/:userId', async (request: Request, response: Response) => {
  try {
    const activities = await Activity.find({ userId: request.params.userId }).populate(
      'userId',
      'username email'
    );
    response.json(activities);
  } catch (error) {
    response.status(500).json({ error: 'Failed to fetch user activities' });
  }
});

// Get activity by ID
router.get('/:id', async (request: Request, response: Response) => {
  try {
    const activity = await Activity.findById(request.params.id).populate('userId', 'username email');

    if (!activity) {
      response.status(404).json({ error: 'Activity not found' });
      return;
    }

    response.json(activity);
  } catch (error) {
    response.status(500).json({ error: 'Failed to fetch activity' });
  }
});

// Create new activity
router.post('/', async (request: Request, response: Response) => {
  try {
    const { userId, type, duration, distance, calories, intensity, date, notes } = request.body;

    if (!userId || !type || !duration || !intensity) {
      response.status(400).json({ error: 'Missing required fields' });
      return;
    }

    const activity = new Activity({
      userId,
      type,
      duration,
      distance,
      calories,
      intensity,
      date: date || new Date(),
      notes,
    });

    await activity.save();
    await activity.populate('userId', 'username email');

    response.status(201).json(activity);
  } catch (error) {
    response.status(500).json({ error: 'Failed to create activity' });
  }
});

// Update activity
router.put('/:id', async (request: Request, response: Response) => {
  try {
    const { type, duration, distance, calories, intensity, date, notes } = request.body;

    const activity = await Activity.findByIdAndUpdate(
      request.params.id,
      { type, duration, distance, calories, intensity, date, notes },
      { new: true }
    ).populate('userId', 'username email');

    if (!activity) {
      response.status(404).json({ error: 'Activity not found' });
      return;
    }

    response.json(activity);
  } catch (error) {
    response.status(500).json({ error: 'Failed to update activity' });
  }
});

// Delete activity
router.delete('/:id', async (request: Request, response: Response) => {
  try {
    const activity = await Activity.findByIdAndDelete(request.params.id);

    if (!activity) {
      response.status(404).json({ error: 'Activity not found' });
      return;
    }

    response.json({ message: 'Activity deleted successfully' });
  } catch (error) {
    response.status(500).json({ error: 'Failed to delete activity' });
  }
});

export default router;
