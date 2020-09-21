import { TaskEntity } from '../entities/task.entity'
import { EntityRepository, Repository } from 'typeorm'
import { CreateTaskDTO } from '../dto/create-tasks.dto'
import { TaskStatus } from '../protocols/tasks.protocols'
import { SearchTaskDTO } from '../dto/search-tasks.dto'
import { Injectable } from '@nestjs/common'
import { UserEntity } from 'src/auth/entities/user.entity'
import { GetUser } from 'src/auth/custom-decoratos/get-user.decorator'

@EntityRepository(TaskEntity)
@Injectable()
export class TaskRepository extends Repository<TaskEntity> {

  async getTasks(
    searchTaskDTO: SearchTaskDTO,
    @GetUser() user: UserEntity
  ): Promise<Array<TaskEntity>> {
    const { search, status } = searchTaskDTO
    const query = this.createQueryBuilder('task')
      .innerJoinAndSelect('task.user', 'user')
      .where('task.userId = :userId', { userId: user.id })

    if (status) {
      query.andWhere('task.status = :status', { status })
    }

    if (search) {
      query.andWhere('(task.title LIKE :search OR task.description LIKE :search)', { search: `%${search}%` })
    }

    const tasks = await query.getMany()
    return tasks
  }

  async createTask(
    createTaskDTO: CreateTaskDTO,
    user: UserEntity
  ): Promise<TaskEntity> {
    const { title, description } = createTaskDTO
    const task = new TaskEntity()
    task.title = title,
    task.description = description
    task.status = TaskStatus.OPEN
    task.user = user
    await task.save()

    delete task.user

    return task
  }
}
