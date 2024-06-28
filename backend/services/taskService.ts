// Business logic for user service
import { ObjectId } from 'mongoose';
import dotenv from 'dotenv';
import jwt from "jsonwebtoken";
import TaskRepository from '../repositories/taskRepository';
import { Task } from '../interfaces/taskInterface';
import JwtPayload from '../interfaces/jwtPayloadInterface';
dotenv.config();


const taskRepository = new TaskRepository();

export default class TaskService {

    // Get all tasks from repository
    async GetAllTasks(token: string) {
        if (!process.env.JWT_SECRET) return null;
        try {
            const payload = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;
            const id = payload.userId;
            return await taskRepository.getAll(id);
        } catch (err) {
            console.error(err);
            return null;
        }
    }

    // Create new task
    async CreateNewTask(taskInfo: Task, token: string) {
        if (!process.env.JWT_SECRET) return null;
        try {
            const payload = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;
            const id = payload.userId;
            return await taskRepository.AddAsync(taskInfo, id);
        } catch(err) {
            console.error(err);
            return null;
        }
    }

    // Update Specific Task
    async UpdateTask(id: ObjectId, taskInfo: Task, token: string) {
        try {
            if (!process.env.JWT_SECRET) return null;
            const payload = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;
            const ownerId = payload.userId;
            const result = await taskRepository.UpdateTaskById(id, taskInfo, ownerId);
            return result;
        } catch (err) {
            console.error(err);
            return null;
        }
    }

    // Delete Specific Task
    async DeleteTask(id: ObjectId, token: string) {
        try {
            if (!process.env.JWT_SECRET) return null;
            const payload = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;
            const ownerId = payload.userId;
            const result = await taskRepository.DeleteTaskById(id, ownerId);
            return result;
        } catch (err) {
            console.error(err);
            return null;
        }
    }
}
