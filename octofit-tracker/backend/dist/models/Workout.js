import mongoose from 'mongoose';
const workoutSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
    },
    description: {
        type: String,
        trim: true,
    },
    exercises: [
        {
            name: {
                type: String,
                required: true,
            },
            sets: {
                type: Number,
                required: true,
                min: 1,
            },
            reps: {
                type: Number,
                required: true,
                min: 1,
            },
            weight: {
                type: Number,
                min: 0,
            },
        },
    ],
    difficulty: {
        type: String,
        required: true,
        enum: ['beginner', 'intermediate', 'advanced'],
    },
    duration: {
        type: Number,
        required: true,
        min: 1,
    },
}, {
    timestamps: true,
});
export const Workout = mongoose.model('Workout', workoutSchema);
