// routes for update tasks
/* eslint-disable */
import { ObjectId } from 'mongoose';
import { NextResponse } from 'next/server';
import TaskService from '@/backend/services/taskService';
import { Task } from '@/backend/interfaces/taskInterface';

const taskService = new TaskService();

// Edit task
export async function POST(request: Request, { params }: {params: {id: ObjectId}}) {
    const token = request.headers.get("authorization");
    if (!token) return null;
    try {
        const { id } = params;
        const { title, description, status, category, deadline } = await request.json();
        const newTask: Task = {title, description, deadline, status, category};
        const result = await taskService.UpdateTask(id, newTask , token);
        return NextResponse.json({result});
    } catch (err) {
        console.error(err);
        return null;
    }
}

// Delete task
export async function DELETE(request: Request, { params }: {params: {id: ObjectId}}) {
    const token = request.headers.get("authorization");
    if (!token) return null;
    const { id } = params;
    const result = await taskService.DeleteTask(id, token);
    return NextResponse.json({result});
}
