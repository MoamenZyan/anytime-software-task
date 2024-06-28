// routes for users
import { NextResponse } from 'next/server';
import UserService from '@/backend/services/userService';
import userModel from '@/backend/models/userModel/userModel';

const userService = new UserService();

// Gets all users
export async function GET(request: Request) {
    const users = await userService.GetAllUsers();
    return NextResponse.json({users});
}

// Create user
export async function POST(request: Request) {
    const { username, email, password, linkedin } = await request.json();
    const userInfo = new userModel({ username, email, password, linkedin });
    const result = await userService.CreateUser(userInfo);
    if (result == -1) {
        return NextResponse.json({status: false});
    } else {
        return NextResponse.json({status: true});
    }
}
