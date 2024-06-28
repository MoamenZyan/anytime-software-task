// Task repository file
import { ObjectId } from "mongoose";
import taskModel from "../models/taskModel/taskModel";
import { NewTask, Task, TaskFromDB } from "../interfaces/taskInterface";
import connectDB from "../database/db";


// Task repository class
export default class TaskRepository {

    // Get all tasks from database
    async getAll(id: ObjectId){
        try {
            await connectDB();
            return await taskModel.find({owner: id}).sort({deadline: 'asc'});
        } catch (err) {
            console.error('Error getting all tasks from database', err);
            return null;
        }
    }

    // Create task
    async AddAsync(taskInfo: Task, id: ObjectId) {
        try {
            await connectDB();
            const newTask: NewTask = {
                title: taskInfo.title,
                description: taskInfo.description,
                deadline: taskInfo.deadline,
                status: taskInfo.status,
                category: taskInfo.category,
                owner: id
            }
            return await taskModel.create(newTask);
        } catch (err) {
            console.error('error when creating task', err);
            return null;
        }
    }

    // Get tasks by specific id
    async GetTaskById(id: ObjectId, ownerId: ObjectId) {
        try {
            await connectDB();
            return await taskModel.findOne({_id: id, owner: ownerId});
        } catch (err) {
            console.error('error when querying for tasks', err);
            return null;
        }
    }

    // Update task by specific id
    async UpdateTaskById(id: ObjectId, updatedFields: Task, ownerId: ObjectId) {
        try {
            await connectDB();
            return await taskModel.updateOne({_id: id, owner: ownerId}, { $set: updatedFields });
        } catch (err) {
            console.error('error when updaing task', err);
            return null;
        }
    }

    // Delete task by specific id
    async DeleteTaskById(id: ObjectId, ownerId: ObjectId) {
        try {
            await connectDB();
            return await taskModel.deleteOne({_id: id, owner: ownerId});
        } catch (err) {
            console.error('error when deleting task', err);
            return null;
        }
    }

}