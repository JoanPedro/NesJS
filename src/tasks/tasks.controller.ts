import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { TaskStatusValidationPipe, TasksServiceInterface, TaskModel, TaskStatus, CreateTaskDTO, SearchTaskDTO } from '.';

@Controller('tasks')
export class TasksController {
  constructor (
    @Inject('TaskServiceInterface') private readonly taskService: TasksServiceInterface
  ) {}

  @Get()
  getTasks (@Query(ValidationPipe) searchTask: SearchTaskDTO): Array<TaskModel> {
    if(Object.keys(searchTask).length) {
      return this.taskService.getTasksWithFilters(searchTask)
    } else {
      return this.taskService.getTasks(searchTask)
    }
  }

  @Post()
  @UsePipes(ValidationPipe)
  createTask (@Body() createTask: CreateTaskDTO): TaskModel {
    return this.taskService.createTask(createTask)
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string): TaskModel {
    return this.taskService.getTaskById(id)
  }

  @Delete('/:id')
  deleteTaskById(@Param('id') id:string): TaskModel {
    return this.taskService.deleteTaskById(id)
  }

  @Patch('/:id/status')
  pathStatusByTaskId(
    @Param('id') id: string,
    @Body('status', TaskStatusValidationPipe) status: TaskStatus
  ) {
    return this.taskService.pathTaskStatusById(id, status)
  }
}
