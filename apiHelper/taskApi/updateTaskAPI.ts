import { Task } from "@/backend/interfaces/taskInterface";
import { ObjectId } from "mongoose";

// Update task
export default async function UpdateTask(id: ObjectId, taskInfo: Task, token: string) {
    return await fetch(`/api/tasks/${id}`, { 
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'authorization': token,
        },
        body: JSON.stringify({
            title: taskInfo.title,
            description: taskInfo.description,
            deadline: taskInfo.deadline,
            status: taskInfo.status,
            category: taskInfo.category,
        })
    })
    .then((res) => res.json())
    .then((data) => {return data});
}