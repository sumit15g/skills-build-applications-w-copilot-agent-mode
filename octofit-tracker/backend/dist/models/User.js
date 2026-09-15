import mongoose from 'mongoose';
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        match: /.+\@.+\..+/,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    profile: {
        firstName: String,
        lastName: String,
        avatar: String,
    },
}, {
    timestamps: true,
});
export const User = mongoose.model('User', userSchema);
