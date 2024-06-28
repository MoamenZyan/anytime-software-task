import { User } from "@/backend/interfaces/userInterface";


export default async function CreateUserAPI(userInfo: User) {
    return await fetch("/api/users", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: userInfo.username,
            email: userInfo.email,
            password: userInfo.password,
            linkedin: userInfo.linkedin
        })
    })
    .then((res) => res.json())
    .then((data) => {
        return data;
    })
}