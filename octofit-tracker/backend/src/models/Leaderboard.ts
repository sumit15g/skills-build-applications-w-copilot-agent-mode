import mongoose from 'mongoose';

interface ILeaderboard {
  userId: mongoose.Types.ObjectId;
  teamId?: mongoose.Types.ObjectId;
  totalPoints: number;
  activitiesCount: number;
  totalDuration: number;
  rank: number;
  lastUpdated: Date;
  createdAt: Date;
  updatedAt: Date;
}

const leaderboardSchema = new mongoose.Schema<ILeaderboard>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    teamId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Team',
    },
    totalPoints: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },
    activitiesCount: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },
    totalDuration: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },
    rank: {
      type: Number,
      required: true,
      default: 0,
      min: 1,
    },
    lastUpdated: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

export const Leaderboard = mongoose.model<ILeaderboard>('Leaderboard', leaderboardSchema);
