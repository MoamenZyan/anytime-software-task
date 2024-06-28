import mongoose from 'mongoose';
import { User } from '@/backend/interfaces/userInterface';

// User model schema in mongodb
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 10
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    linkedin: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        required: true,
    }
});

const UserModel = mongoose.models.User || mongoose.model<User>('User', userSchema);

export default UserModel;
