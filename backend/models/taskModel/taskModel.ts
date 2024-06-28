import mongoose from 'mongoose';
import { Task } from '@/backend/interfaces/taskInterface';

// Task model schema in mongodb
const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    deadline: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

const TaskModel = mongoose.models.Task || mongoose.model<Task>('Task', taskSchema);

export default TaskModel;
