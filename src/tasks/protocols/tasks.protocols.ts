import { CreateTaskDTO, SearchTaskDTO } from ".."

export interface TasksServiceInterface {
  getTasks: (searchTask: SearchTaskDTO) => Array<TaskModel>
  createTask: (createTask: CreateTaskDTO) => TaskModel
  getTaskById: (id: string) => TaskModel
  deleteTaskById: (id: string) =>  TaskModel
  pathTaskStatusById: (id: string, status: TaskStatus) =>  TaskModel
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
