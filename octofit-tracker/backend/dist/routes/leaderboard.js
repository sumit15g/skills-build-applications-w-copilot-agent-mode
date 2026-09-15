import express from 'express';
import { Leaderboard } from '../models/Leaderboard.js';
const router = express.Router();
// GET global leaderboard
router.get('/', async (request, response) => {
    try {
        const limit = request.query.limit ? parseInt(request.query.limit) : 100;
        const leaderboard = await Leaderboard.find()
            .populate('userId')
            .populate('teamId')
            .sort({ rank: 1 })
            .limit(limit);
        response.json(leaderboard);
    }
    catch (error) {
        response.status(500).json({ error: 'Failed to fetch leaderboard' });
    }
});
// GET team leaderboard
router.get('/team/:teamId', async (request, response) => {
    try {
        const limit = request.query.limit ? parseInt(request.query.limit) : 100;
        const leaderboard = await Leaderboard.find({ teamId: request.params.teamId })
            .populate('userId')
            .populate('teamId')
            .sort({ rank: 1 })
            .limit(limit);
        response.json(leaderboard);
    }
    catch (error) {
        response.status(500).json({ error: 'Failed to fetch team leaderboard' });
    }
});
// GET user rank
router.get('/user/:userId', async (request, response) => {
    try {
        const entry = await Leaderboard.findOne({ userId: request.params.userId })
            .populate('userId')
            .populate('teamId');
        if (!entry) {
            response.status(404).json({ error: 'User not found in leaderboard' });
            return;
        }
        response.json(entry);
    }
    catch (error) {
        response.status(500).json({ error: 'Failed to fetch user rank' });
    }
});
// POST create leaderboard entry
router.post('/', async (request, response) => {
    try {
        const { userId, teamId, totalPoints, activitiesCount, totalDuration, rank } = request.body;
        if (!userId) {
            response.status(400).json({ error: 'Missing userId' });
            return;
        }
        const newEntry = new Leaderboard({
            userId,
            teamId,
            totalPoints: totalPoints || 0,
            activitiesCount: activitiesCount || 0,
            totalDuration: totalDuration || 0,
            rank: rank || 0,
        });
        await newEntry.save();
        await newEntry.populate('userId');
        await newEntry.populate('teamId');
        response.status(201).json(newEntry);
    }
    catch (error) {
        response.status(500).json({ error: 'Failed to create leaderboard entry' });
    }
});
// PUT update leaderboard entry
router.put('/:id', async (request, response) => {
    try {
        const { totalPoints, activitiesCount, totalDuration, rank, lastUpdated } = request.body;
        const entry = await Leaderboard.findByIdAndUpdate(request.params.id, { totalPoints, activitiesCount, totalDuration, rank, lastUpdated }, { new: true })
            .populate('userId')
            .populate('teamId');
        if (!entry) {
            response.status(404).json({ error: 'Leaderboard entry not found' });
            return;
        }
        response.json(entry);
    }
    catch (error) {
        response.status(500).json({ error: 'Failed to update leaderboard entry' });
    }
});
export default router;
