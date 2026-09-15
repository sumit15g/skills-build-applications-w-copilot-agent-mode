import mongoose from 'mongoose';
const leaderboardSchema = new mongoose.Schema({
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
}, {
    timestamps: true,
});
export const Leaderboard = mongoose.model('Leaderboard', leaderboardSchema);
