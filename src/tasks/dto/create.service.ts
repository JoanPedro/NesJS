import { Injectable } from '@nestjs/common';
import { GetAllBehaviour } from 'src/tasks/protocols/get-all.protocols';
import { TaskModel, TaskStatus } from 'src/tasks/protocols/tasks.protocols';
import { SearchTaskInterface } from './search-tasks.dto';

@Injectable()
export class GetAllService implements GetAllBehaviour {
  getTasks(searchTask: SearchTaskInterface, tasks: Array<TaskModel>): Array<TaskModel> {
    console.log('Oi: ', searchTask)
    return tasks
  }
}
