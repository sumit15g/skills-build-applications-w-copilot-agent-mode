import express, { Request, Response } from 'express';
import { User } from '../models/User.js';

const router = express.Router();

// Get all users
router.get('/', async (_request: Request, response: Response) => {
  try {
    const users = await User.find().select('-password');
    response.json(users);
  } catch (error) {
    response.status(500).json({ error: 'Failed to fetch users' });
  }
});

// Get user by ID
router.get('/:id', async (request: Request, response: Response) => {
  try {
    const user = await User.findById(request.params.id).select('-password');
    if (!user) {
      response.status(404).json({ error: 'User not found' });
      return;
    }
    response.json(user);
  } catch (error) {
    response.status(500).json({ error: 'Failed to fetch user' });
  }
});

// Create new user
router.post('/', async (request: Request, response: Response) => {
  try {
    const { username, email, password, profile } = request.body;

    if (!username || !email || !password) {
      response.status(400).json({ error: 'Missing required fields' });
      return;
    }

    const user = new User({
      username,
      email,
      password,
      profile,
    });

    await user.save();
    const userObj = user.toObject();
    const { password: _pwd, ...userResponse } = userObj;
    response.status(201).json(userResponse);
  } catch (error) {
    response.status(500).json({ error: 'Failed to create user' });
  }
});

// Update user
router.put('/:id', async (request: Request, response: Response) => {
  try {
    const { username, email, profile } = request.body;

    const user = await User.findByIdAndUpdate(
      request.params.id,
      { username, email, profile },
      { new: true }
    ).select('-password');

    if (!user) {
      response.status(404).json({ error: 'User not found' });
      return;
    }

    response.json(user);
  } catch (error) {
    response.status(500).json({ error: 'Failed to update user' });
  }
});

// Delete user
router.delete('/:id', async (request: Request, response: Response) => {
  try {
    const user = await User.findByIdAndDelete(request.params.id);

    if (!user) {
      response.status(404).json({ error: 'User not found' });
      return;
    }

    response.json({ message: 'User deleted successfully' });
  } catch (error) {
    response.status(500).json({ error: 'Failed to delete user' });
  }
});

export default router;
