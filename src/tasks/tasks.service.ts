import { Injectable } from '@nestjs/common';
import { TaskModel, TaskStatus, CreateTaskDTO, SearchTaskDTO } from '.';
import { v1 as uuid } from 'uuid'
import { TasksServiceInterface } from './protocols/tasks.protocols';

@Injectable()
export class TasksService implements TasksServiceInterface {
  private tasks: Array<TaskModel> = [];

  getTasks (): Array<TaskModel> {
    return this.tasks;
  }

  getTasksWithFilters(searchTask: SearchTaskDTO): Array<TaskModel> {
    const { status, search }: { status: TaskStatus, search: string} = searchTask
    let tasks = this.getTasks();
    if (status) {
      tasks = tasks.filter(task => task.status === status)
    }
    if (search) {
      tasks = tasks.filter(task => {
        return task.title.includes(search) ||
          task.description.includes(search)
      })
    }
    return tasks
  }

  createTask (createTask: CreateTaskDTO): TaskModel {
    const { title, description } = createTask
    const task: TaskModel = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN
    };
    this.tasks.push(task)
    return task
  }

  getTaskById(id: string): TaskModel {
    return this.tasks.find(task => task.id === id)
  }

  deleteTaskById(id: string): TaskModel {
    const toDelete = this.tasks.find(task => task.id === id)
    this.tasks.forEach((task, index) => {
      if (task.id === id) this.tasks.splice(index, 1)
    })
    return toDelete
  }

  pathTaskStatusById(id: string, status: TaskStatus): TaskModel {
    this.tasks.forEach(task => {
      if(task.id === id) task.status = status
    })
    const toPatch = this.getTaskById(id)
    return toPatch
  }
}
