import { DeleteResult } from "typeorm";
import { CreateTaskDTO, SearchTaskDTO } from ".."
import { TaskEntity } from "../entities/task.entity";

export interface TasksServiceInterface {
  getTasks: (searchTask: SearchTaskDTO) => Promise<Array<TaskEntity>>
  createTask: (createTask: CreateTaskDTO) => Promise<TaskEntity>
  getTaskById: (id: number) => Promise<TaskEntity>
  deleteTaskById: (id: number) =>  Promise<DeleteResult>
  pathTaskStatusById: (id: number, status: TaskStatus) =>  Promise<TaskEntity>
  getTasksWithFilters: (searchTask: SearchTaskDTO) => Array<TaskModel>
}

export interface TaskModel {
  id: string
  title: string
  description: string
  status: TaskStatus
}

export enum TaskStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE'
}
