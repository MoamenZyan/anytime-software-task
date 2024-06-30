import { ObjectId } from "mongoose"

export interface ITask {
    title: string,
    description: string,
    status: string,
    category: string,
    deadline: Date,
}

export interface ITaskToDB {
    title: string,
    description: string,
    status: string,
    category: string,
    deadline: Date,
    userId: ObjectId
}

export interface ITaskFromDB {
    _id: ObjectId
    title: string,
    description: string,
    status: string,
    category: string,
    deadline: Date,
    userId: ObjectId
}