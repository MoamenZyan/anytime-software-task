import { ObjectId } from "mongoose";

// Delete task
export default async function DeleteTaskAPI(id: ObjectId, token: string) {
    return await fetch(`http://localhost:8080/tasks/${id}`, { 
        method: "DELETE",
        headers: {
            'authorization': token,
        }
    })
    .then((res) => res.json())
    .then((data) => {return data});
}
