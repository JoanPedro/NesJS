import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { DeleteResult } from 'typeorm';
import { TaskStatusValidationPipe, TaskStatus, CreateTaskDTO, SearchTaskDTO } from '.';
import { TaskEntity } from './entities/task.entity';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor (
    private readonly taskService: TasksService
  ) {}

  @Get()
  async getTasks (@Query(ValidationPipe) searchTaskDTO: SearchTaskDTO): Promise<Array<TaskEntity>> {
    return await this.taskService.getTasks(searchTaskDTO)
  }

  @Post()
  @UsePipes(ValidationPipe)
  async createTask (@Body() createTask: CreateTaskDTO): Promise<TaskEntity> {
    return await this.taskService.createTask(createTask)
  }

  @Get('/:id')
  async getTaskById(@Param('id', ParseIntPipe) id: number): Promise<TaskEntity> {
    return await this.taskService.getTaskById(id)
  }

  @Delete('/:id')
  async deleteTaskById(@Param('id', ParseIntPipe) id: number): Promise<DeleteResult> {
    return await this.taskService.deleteTaskById(id)
  }

  @Patch('/:id/status')
  async pathStatusByTaskId(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', TaskStatusValidationPipe) status: TaskStatus
  ): Promise<TaskEntity> {
    return await this.taskService.pathTaskStatusById(id, status)
  }
}
