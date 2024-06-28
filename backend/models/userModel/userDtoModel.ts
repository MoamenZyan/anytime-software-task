// User DTO Class Model
import { User } from "@/backend/interfaces/userInterface";

export default class UserDto {
    public username: string;
    public email: string;
    public linkedin: string;
    constructor (user: User) {
        this.username = user.username;
        this.email = user.email;
        this.linkedin = user.linkedin;
    }
}

