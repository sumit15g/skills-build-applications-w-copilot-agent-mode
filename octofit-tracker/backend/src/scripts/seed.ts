import mongoose from 'mongoose';
import { Activity } from '../models/Activity.js';
import { Leaderboard } from '../models/Leaderboard.js';
import { Team } from '../models/Team.js';
import { User } from '../models/User.js';
import { Workout } from '../models/Workout.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const users = await User.insertMany([
      {
        username: 'maya_runner',
        email: 'maya@example.com',
        password: 'octofit-demo',
        profile: { firstName: 'Maya', lastName: 'Chen', avatar: 'maya.jpg' },
      },
      {
        username: 'jordan_lifts',
        email: 'jordan@example.com',
        password: 'octofit-demo',
        profile: { firstName: 'Jordan', lastName: 'Williams', avatar: 'jordan.jpg' },
      },
      {
        username: 'alex_yoga',
        email: 'alex@example.com',
        password: 'octofit-demo',
        profile: { firstName: 'Alex', lastName: 'Rivera', avatar: 'alex.jpg' },
      },
      {
        username: 'sam_cyclist',
        email: 'sam@example.com',
        password: 'octofit-demo',
        profile: { firstName: 'Sam', lastName: 'Patel', avatar: 'sam.jpg' },
      },
    ]);

    const teams = await Team.insertMany([
      {
        name: 'Summit Seekers',
        description: 'A balanced team training for the spring trail challenge.',
        leader: users[0]._id,
        members: [users[0]._id, users[2]._id],
      },
      {
        name: 'Velocity Crew',
        description: 'Cyclists and strength athletes chasing personal bests.',
        leader: users[1]._id,
        members: [users[1]._id, users[3]._id],
      },
    ]);

    await Activity.insertMany([
      {
        userId: users[0]._id,
        type: 'running',
        duration: 42,
        distance: 6.4,
        calories: 480,
        intensity: 'high',
        date: new Date('2026-09-12T07:30:00Z'),
        notes: 'Steady progression run along the river trail.',
      },
      {
        userId: users[1]._id,
        type: 'weight-training',
        duration: 55,
        calories: 390,
        intensity: 'high',
        date: new Date('2026-09-13T17:00:00Z'),
        notes: 'Lower-body strength session.',
      },
      {
        userId: users[2]._id,
        type: 'yoga',
        duration: 35,
        calories: 160,
        intensity: 'low',
        date: new Date('2026-09-14T06:45:00Z'),
        notes: 'Mobility and recovery flow.',
      },
      {
        userId: users[3]._id,
        type: 'cycling',
        duration: 75,
        distance: 24.8,
        calories: 720,
        intensity: 'medium',
        date: new Date('2026-09-14T08:15:00Z'),
        notes: 'Rolling hills endurance ride.',
      },
    ]);

    await Leaderboard.insertMany([
      {
        userId: users[0]._id,
        teamId: teams[0]._id,
        totalPoints: 860,
        activitiesCount: 18,
        totalDuration: 735,
        rank: 1,
      },
      {
        userId: users[3]._id,
        teamId: teams[1]._id,
        totalPoints: 790,
        activitiesCount: 15,
        totalDuration: 680,
        rank: 2,
      },
      {
        userId: users[1]._id,
        teamId: teams[1]._id,
        totalPoints: 645,
        activitiesCount: 13,
        totalDuration: 590,
        rank: 3,
      },
      {
        userId: users[2]._id,
        teamId: teams[0]._id,
        totalPoints: 520,
        activitiesCount: 12,
        totalDuration: 465,
        rank: 4,
      },
    ]);

    await Workout.insertMany([
      {
        userId: users[0]._id,
        name: 'Trail Run Builder',
        description: 'A progressive run to build endurance and hill strength.',
        difficulty: 'intermediate',
        duration: 45,
        exercises: [
          { name: 'Easy warm-up jog', sets: 1, reps: 1 },
          { name: 'Hill repeats', sets: 6, reps: 1 },
          { name: 'Cool-down walk', sets: 1, reps: 1 },
        ],
      },
      {
        userId: users[1]._id,
        name: 'Full Body Strength',
        description: 'A practical strength session for balanced athletic power.',
        difficulty: 'advanced',
        duration: 50,
        exercises: [
          { name: 'Goblet squat', sets: 4, reps: 10, weight: 24 },
          { name: 'Push-up', sets: 4, reps: 12 },
          { name: 'Single-arm row', sets: 3, reps: 10, weight: 18 },
        ],
      },
      {
        userId: users[2]._id,
        name: 'Recovery Mobility Flow',
        description: 'A gentle sequence for mobility, balance, and recovery.',
        difficulty: 'beginner',
        duration: 30,
        exercises: [
          { name: 'Cat-cow stretch', sets: 2, reps: 10 },
          { name: 'Low lunge', sets: 2, reps: 8 },
          { name: 'Child pose', sets: 2, reps: 1 },
        ],
      },
    ]);

    const collectionCounts = await Promise.all([
      User.countDocuments(),
      Team.countDocuments(),
      Activity.countDocuments(),
      Leaderboard.countDocuments(),
      Workout.countDocuments(),
    ]);

    console.log('Seed the octofit_db database with test data');
    console.log(
      `Database seeding complete: ${collectionCounts[0]} users, ${collectionCounts[1]} teams, ` +
        `${collectionCounts[2]} activities, ${collectionCounts[3]} leaderboard entries, ` +
        `${collectionCounts[4]} workouts`
    );
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
