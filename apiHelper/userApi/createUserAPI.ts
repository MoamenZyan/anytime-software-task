import { IUser } from "@/server/src/users/interface/userInterface";


export default async function CreateUserAPI(userInfo: IUser) {
    return await fetch("http://localhost:8080/users", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({...userInfo})
    })
    .then((res) => res.json())
    .then((data) => {
        return data;
    })
}