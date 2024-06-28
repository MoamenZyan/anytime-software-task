// routes for tasks
import { NextResponse } from 'next/server';
import TaskService from '@/backend/services/taskService';
import { Task } from '@/backend/interfaces/taskInterface';

const taskService = new TaskService();

// Get all tasks
export async function GET(request: Request) {
    const token = request.headers.get("authorization");
    if (!token) return null;
    const tasks = await taskService.GetAllTasks(token);
    return NextResponse.json({tasks});
}

// Create new task
export async function POST(request: Request) {
    const token = request.headers.get("authorization");
    if (!token) return null;
    const {title, description, deadline, status, category} = await request.json();
    const newTask: Task = {title, description, deadline, status, category};
    const result = await taskService.CreateNewTask(newTask, token);
    return NextResponse.json({result});
}