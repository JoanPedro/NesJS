import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, Query } from '@nestjs/common';
import { TasksBehaviour, TaskModel, CreateTaskInterface, SearchTaskInterface, TaskStatus } from '.';

@Controller('tasks')
export class TasksController {
  constructor (
    @Inject('TasksBehaviour') private readonly taskService: TasksBehaviour
  ) {}

  @Get()
  getTasks (@Query() searchTask: SearchTaskInterface): Array<TaskModel> {
    if(Object.keys(searchTask).length) {
      return this.taskService.getTasksWithFilters(searchTask)
    } else {
      return this.taskService.getTasks(searchTask)
    }
  }

  @Post()
  createTask (@Body() createTask: CreateTaskInterface): TaskModel {
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
    @Body() { status }: { status: TaskStatus }
  ) {
    return this.taskService.pathTaskStatusById(id, status)
  }
}
