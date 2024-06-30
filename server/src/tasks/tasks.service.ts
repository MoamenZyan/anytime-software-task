import { Injectable } from "@nestjs/common";
import { ObjectId } from "mongoose";
import { ITask, ITaskToDB } from "./interface/taskInterface";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Task, TaskDocument } from './schemas/task.schema';
import * as jwt from "jsonwebtoken";

// service class
@Injectable()
export class TasksService {
    constructor(@InjectModel(Task.name) private taskModel: Model<TaskDocument>) {}

    // create new task
    async create(task: ITask, token: string): Promise<Task> {
        if (!process.env.JWT_SECRET) return null;
        try {
            const result = jwt.verify(token, process.env.JWT_SECRET);
            const userId = result["userId"];
            const newTask: ITaskToDB = { ...task,userId: userId };
            const createdTask = await new this.taskModel(newTask).save();
            return createdTask;
        } catch (err) {
            console.error(err);
            return null;
        }
    }

    // get all user's tasks
    async findAll(token: string): Promise<Task[]> {
        if (!process.env.JWT_SECRET) return null;
        try {
            const result = jwt.verify(token, process.env.JWT_SECRET);
            const userId = result["userId"];
            const tasks = await this.taskModel.find({userId: userId}).exec()
            return tasks;
        } catch(err) {
            console.log(err);
            return null;
        }
    }

    // delete task
    async delete(id: ObjectId, token: string): Promise<any> {
        if (!process.env.JWT_SECRET) return null;
        try {
            const result = jwt.verify(token, process.env.JWT_SECRET);
            const userId = result["userId"];
            return await this.taskModel.findOneAndDelete({_id: id, userId: userId}).exec();
        } catch (err) {
            console.log(err);
            return null;
        }
    }

    // update task
    async update(id: ObjectId, task: ITask, token: string): Promise<Task> {
        if (!process.env.JWT_SECRET) return null;
        try {
            const result = jwt.verify(token, process.env.JWT_SECRET);
            const userId = result["userId"];
            const newTask: ITaskToDB = { ...task, userId: userId };
            return await this.taskModel.findByIdAndUpdate(id, newTask, { new: true }).exec();
        } catch (err) {
            console.log(err);
            return null;
        }
    }
}

