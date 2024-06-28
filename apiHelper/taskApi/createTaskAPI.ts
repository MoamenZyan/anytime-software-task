import {Task} from "@/backend/interfaces/taskInterface";

// Creating task api
export default async function CreateTaskAPI(taskInfo: Task, token: string) {
    return await fetch("/api/tasks", { 
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
            category: taskInfo.category
        }),
    })
    .then((res) => res.json())
    .then((data) => {return data});
}