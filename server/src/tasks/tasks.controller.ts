import { Controller, Get, Post, Body, Param, Delete, Put, Headers  } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { ITask } from './interface/taskInterface';
import { ObjectId } from 'mongoose';

@Controller('tasks')
export class TasksController {
    constructor(private readonly tasksService: TasksService) {}

    @Post()
    async create(@Body() task: ITask, @Headers('authorization') token: string) {
        return await this.tasksService.create(task, token);
    }

    @Get()
    async findAll(@Headers('authorization') token: string) {
        const tasks = await this.tasksService.findAll(token);
        if (tasks != null) {
            return {status: true, tasks: tasks};
        } else {
            return {status: false}
        }
    }

    @Delete(':id')
    async delete(@Param('id') id: ObjectId, @Headers('authorization') token: string) {
        return await this.tasksService.delete(id, token);
    }

    @Post(':id')
    async update(@Param('id') id: ObjectId, @Headers('authorization') token: string, @Body() task: ITask) {
        return await this.tasksService.update(id, task, token);
    }
}
