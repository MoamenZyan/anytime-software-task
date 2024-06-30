import { ITask } from "@/server/src/tasks/interface/taskInterface";
import { ObjectId } from "mongoose";

// Update task
export default async function UpdateTask(id: ObjectId, taskInfo: ITask, token: string) {
    return await fetch(`http://localhost:8080/tasks/${id}`, { 
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'authorization': token,
        },
        body: JSON.stringify({...taskInfo})
    })
    .then((res) => res.json())
    .then((data) => {return data});
}