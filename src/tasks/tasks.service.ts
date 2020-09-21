import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus, CreateTaskDTO, SearchTaskDTO } from '.';
import { TaskRepository } from './repositories/task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskEntity } from './entities/task.entity';
import { DeleteResult } from 'typeorm';
import { UserEntity } from 'src/auth/entities/user.entity';
import { GetUser } from 'src/auth/custom-decoratos/get-user.decorator';


@Injectable()
export class TasksService {
  constructor (
    @InjectRepository(TaskRepository)
    private readonly taskRepository: TaskRepository
  ) {}

  async getTasks(
    SearchTaskDTO: SearchTaskDTO,
    @GetUser() user: UserEntity
  ): Promise<Array<TaskEntity>> {
    const tasks: Array<TaskEntity> = await this.taskRepository.getTasks(SearchTaskDTO, user)
    return tasks
  }

  async createTask(
    createTaskDTO: CreateTaskDTO,
    user: UserEntity
  ): Promise<TaskEntity> {
    const task: TaskEntity = await this.taskRepository.createTask(createTaskDTO, user)
    return task
  }

  async getTaskById (
    id: number,
    @GetUser() user: UserEntity
  ): Promise<TaskEntity> {
    const found: TaskEntity = await this.taskRepository.findOne({ where: { id, userId: user.id } })
    if (!found) {
      throw new NotFoundException(`Does not able to found ID: ${id}.`, 'Not found')
    }
    return found
  }

  async deleteTaskById(id: number): Promise <DeleteResult> {
    const result: DeleteResult = await this.taskRepository.delete(id)
    if(result.affected === 0) {
      throw new NotFoundException(`Does not able to found ID: ${id}.`, 'Not found')
    }
    return result
  }

  // async pathTaskStatusById(id: number, status: TaskStatus): Promise<TaskEntity> {
  //   const task: TaskEntity = await this.getTaskById(id)
  //   task.status = status
  //   await task.save()
  //   return task
  // }
}
