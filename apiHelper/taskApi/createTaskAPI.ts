import { ITask } from "@/server/src/tasks/interface/taskInterface";

// Creating task api
export default async function CreateTaskAPI(taskInfo: ITask, token: string) {
    return await fetch("http://localhost:8080/tasks", { 
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'authorization': token,
        },
        body: JSON.stringify({...taskInfo}),
    })
    .then((res) => res.json())
    .then((data) => {return data});
}