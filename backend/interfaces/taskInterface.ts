import { ObjectId } from "mongoose"

export interface Task {
    title: string,
    description: string,
    deadline: Date,
    status: string,
    category: string
}

export interface NewTask {
    title: string,
    description: string,
    deadline: Date,
    status: string,
    category: string
    owner: ObjectId
}

export interface TaskFromDB {
    _id: ObjectId,
    title: string,
    description: string,
    deadline: Date,
    status: string,
    category: string
}