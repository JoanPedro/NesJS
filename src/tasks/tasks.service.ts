import { Injectable } from '@nestjs/common';
import { TasksBehaviour, CreateTaskInterface, TaskModel, TaskStatus, SearchTaskInterface } from '.';
import { v1 as uuid } from 'uuid'

@Injectable()
export class TasksService implements TasksBehaviour {
  private tasks: Array<TaskModel> = [];

  getTasks (): Array<TaskModel> {
    return this.tasks;
  }

  getTasksWithFilters(searchTask: SearchTaskInterface): Array<TaskModel> {
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

  createTask (createTask: CreateTaskInterface): TaskModel {
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
