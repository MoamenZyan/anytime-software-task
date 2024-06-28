// Getting all tasks api
export default async function GetAllTasksAPI(token: string) {
    return await fetch("/api/tasks", { 
        method: "GET",
        headers: {
            'authorization': token,
        }
    })
    .then((res) => res.json())
    .then((data) => {return data});
}