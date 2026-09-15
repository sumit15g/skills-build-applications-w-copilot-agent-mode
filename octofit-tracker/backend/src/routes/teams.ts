import express, { Request, Response } from 'express';
import { Team } from '../models/Team.js';

const router = express.Router();

// Get all teams
router.get('/', async (_request: Request, response: Response) => {
  try {
    const teams = await Team.find()
      .populate('members', 'username email')
      .populate('leader', 'username email');
    response.json(teams);
  } catch (error) {
    response.status(500).json({ error: 'Failed to fetch teams' });
  }
});

// Get team by ID
router.get('/:id', async (request: Request, response: Response) => {
  try {
    const team = await Team.findById(request.params.id)
      .populate('members', 'username email')
      .populate('leader', 'username email');

    if (!team) {
      response.status(404).json({ error: 'Team not found' });
      return;
    }

    response.json(team);
  } catch (error) {
    response.status(500).json({ error: 'Failed to fetch team' });
  }
});

// Create new team
router.post('/', async (request: Request, response: Response) => {
  try {
    const { name, description, members, leader } = request.body;

    if (!name || !leader) {
      response.status(400).json({ error: 'Missing required fields' });
      return;
    }

    const team = new Team({
      name,
      description,
      members: members || [leader],
      leader,
    });

    await team.save();
    await team.populate('members', 'username email');
    await team.populate('leader', 'username email');

    response.status(201).json(team);
  } catch (error) {
    response.status(500).json({ error: 'Failed to create team' });
  }
});

// Update team
router.put('/:id', async (request: Request, response: Response) => {
  try {
    const { name, description, members, leader } = request.body;

    const team = await Team.findByIdAndUpdate(
      request.params.id,
      { name, description, members, leader },
      { new: true }
    )
      .populate('members', 'username email')
      .populate('leader', 'username email');

    if (!team) {
      response.status(404).json({ error: 'Team not found' });
      return;
    }

    response.json(team);
  } catch (error) {
    response.status(500).json({ error: 'Failed to update team' });
  }
});

// Delete team
router.delete('/:id', async (request: Request, response: Response) => {
  try {
    const team = await Team.findByIdAndDelete(request.params.id);

    if (!team) {
      response.status(404).json({ error: 'Team not found' });
      return;
    }

    response.json({ message: 'Team deleted successfully' });
  } catch (error) {
    response.status(500).json({ error: 'Failed to delete team' });
  }
});

export default router;
