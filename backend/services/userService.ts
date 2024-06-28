// Business logic for user service
import dotenv from 'dotenv';
import UserRepository from "../repositories/userRepository";
import bcrypt from "bcrypt";
import xss from "xss";
import jwt from "jsonwebtoken";
import { User, UserFromDB } from "../interfaces/userInterface";
dotenv.config();

const userRepoistory = new UserRepository();
const secretKey: string| undefined = process.env.JWT_SECRET;

// User service class
export default class UserService {
    async GetAllUsers() {
        return await userRepoistory.getAll();
    }

    // Creating user service
    async CreateUser(userData: User) {
        try {
            // hashing password & checking for cross-site scripting
            userData.password = await bcrypt.hash(xss(userData.password), 10);
            userData.username = xss(userData.username);
            userData.email = xss(userData.email);
            userData.linkedin = xss(userData.linkedin);
            return await userRepoistory.AddAsync(userData);
        } catch (err) {
            console.error(err);
            return -1;
        }
    }

    // Get specific user by his email
    private async GetUserByEmail(email: string): Promise<UserFromDB | null> {
        return await userRepoistory.GetUserByInfo(email);
    }

    // Checking for user credentials
    async UserLogin(email: string, password: string): Promise<[UserFromDB, string] | null> {
        const user = await this.GetUserByEmail(email);
        if (user == null) return null;

        if (await bcrypt.compare(password, user.password)) {
            const payload = { userId: user.id };
            if (secretKey) {
                const token = jwt.sign(payload, secretKey, {expiresIn: '1h'});
                return [user, token];
            } else {
                return null;
            }
        } else {
            return null;
        }
    }

}
