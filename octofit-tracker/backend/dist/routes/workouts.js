import express from 'express';
import { Workout } from '../models/Workout.js';
const router = express.Router();
// GET all workouts
router.get('/', async (_request, response) => {
    try {
        const workouts = await Workout.find().populate('userId');
        response.json(workouts);
    }
    catch (error) {
        response.status(500).json({ error: 'Failed to fetch workouts' });
    }
});
// GET workout by ID
router.get('/:id', async (request, response) => {
    try {
        const workout = await Workout.findById(request.params.id).populate('userId');
        if (!workout) {
            response.status(404).json({ error: 'Workout not found' });
            return;
        }
        response.json(workout);
    }
    catch (error) {
        response.status(500).json({ error: 'Failed to fetch workout' });
    }
});
// GET workouts by user ID
router.get('/user/:userId', async (request, response) => {
    try {
        const workouts = await Workout.find({ userId: request.params.userId }).populate('userId');
        response.json(workouts);
    }
    catch (error) {
        response.status(500).json({ error: 'Failed to fetch user workouts' });
    }
});
// POST create new workout
router.post('/', async (request, response) => {
    try {
        const { userId, name, description, exercises, difficulty, duration } = request.body;
        if (!userId || !name || !exercises || !difficulty || !duration) {
            response.status(400).json({ error: 'Missing required fields' });
            return;
        }
        const newWorkout = new Workout({
            userId,
            name,
            description,
            exercises,
            difficulty,
            duration,
        });
        await newWorkout.save();
        await newWorkout.populate('userId');
        response.status(201).json(newWorkout);
    }
    catch (error) {
        response.status(500).json({ error: 'Failed to create workout' });
    }
});
// PUT update workout
router.put('/:id', async (request, response) => {
    try {
        const { name, description, exercises, difficulty, duration } = request.body;
        const workout = await Workout.findByIdAndUpdate(request.params.id, { name, description, exercises, difficulty, duration }, { new: true }).populate('userId');
        if (!workout) {
            response.status(404).json({ error: 'Workout not found' });
            return;
        }
        response.json(workout);
    }
    catch (error) {
        response.status(500).json({ error: 'Failed to update workout' });
    }
});
// DELETE workout
router.delete('/:id', async (request, response) => {
    try {
        const workout = await Workout.findByIdAndDelete(request.params.id);
        if (!workout) {
            response.status(404).json({ error: 'Workout not found' });
            return;
        }
        response.json({ message: 'Workout deleted' });
    }
    catch (error) {
        response.status(500).json({ error: 'Failed to delete workout' });
    }
});
export default router;
