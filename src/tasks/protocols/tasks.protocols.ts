import { CreateTaskInterface, SearchTaskInterface } from ".."

export interface TasksBehaviour {
  getTasks(searchTask: SearchTaskInterface): Array<TaskModel>
  createTask(createTask: CreateTaskInterface): TaskModel
  getTaskById(id: string): TaskModel
  deleteTaskById(id: string): TaskModel
  pathTaskStatusById(id: string, status: TaskStatus): TaskModel
  getTasksWithFilters(searchTask: SearchTaskInterface)
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
