import { ObjectId } from "mongoose"
export interface User {
    username: string,
    email: string,
    linkedin: string,
    password: string
}

export interface UserFromDB {
    id: ObjectId,
    username: string,
    email: string,
    linkedin: string,
    password: string
}
