import mongoose from 'mongoose';

interface IActivity {
  userId: mongoose.Types.ObjectId;
  type: string;
  duration: number;
  distance?: number;
  calories?: number;
  intensity: 'low' | 'medium' | 'high';
  date: Date;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const activitySchema = new mongoose.Schema<IActivity>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: ['running', 'cycling', 'swimming', 'weight-training', 'yoga', 'other'],
    },
    duration: {
      type: Number,
      required: true,
      min: 1,
    },
    distance: {
      type: Number,
      min: 0,
    },
    calories: {
      type: Number,
      min: 0,
    },
    intensity: {
      type: String,
      required: true,
      enum: ['low', 'medium', 'high'],
    },
    date: {
      type: Date,
      required: true,
      default: Date.now,
    },
    notes: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Activity = mongoose.model<IActivity>('Activity', activitySchema);
