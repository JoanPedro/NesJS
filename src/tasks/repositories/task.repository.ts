import { TaskEntity } from '../entities/task.entity'
import { EntityRepository, Repository } from 'typeorm'
import { CreateTaskDTO } from '../dto/create-tasks.dto'
import { TaskStatus } from '../protocols/tasks.protocols'
import { SearchTaskDTO } from '../dto/search-tasks.dto'
import { Injectable } from '@nestjs/common'

@EntityRepository(TaskEntity)
@Injectable()
export class TaskRepository extends Repository<TaskEntity> {

  async getTasks(searchTaskDTO: SearchTaskDTO): Promise<Array<TaskEntity>> {
    const { search, status } = searchTaskDTO
    const query = this.createQueryBuilder('task');

    if (status) {
      query.andWhere('task.status = :status', { status })
    }

    if (search) {
      query.andWhere('(task.title LIKE :search OR task.description LIKE :search)', { search: `%${search}%` })
    }

    const tasks = await query.getMany()
    return tasks
  }

  async createTask(createTaskDTO: CreateTaskDTO): Promise<TaskEntity> {
    const { title, description } = createTaskDTO
    const task = new TaskEntity()
    task.title = title,
    task.description = description
    task.status = TaskStatus.OPEN
    await task.save()

    return task
  }
}
