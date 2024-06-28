// User repository file
import UserModel from "../models/userModel/userModel";
import { User, UserFromDB } from "../interfaces/userInterface";
import connectDB from "../database/db";


// User repository class
export default class UserRepository {

    // Get all users from database
    async getAll(){
        try {
            await connectDB();
            return await UserModel.find();
        } catch (err) {
            console.error('Error getting all users from database', err);
            return null;
        }
    }

    // Add user async in database
    async AddAsync(userData: User) {
        try {
            await connectDB();
            const newUser = await UserModel.create(userData);
            return newUser;
        } catch (err) {
            console.error('Error adding user to database', err);
            return null;
        }
    }

    // Get user by specific info
    async GetUserByInfo(value: string)  {
        try {
            await connectDB();
            const user = await UserModel.findOne({email: value}).exec() as UserFromDB;
            return user;
        } catch (err) {
            console.error(`Error finding user by ${value}`, err);
            return null;
        }
    }
}