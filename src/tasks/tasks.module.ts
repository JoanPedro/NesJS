import { Module } from '@nestjs/common';
import { TasksController, TasksService, CreateTask, SearchTask } from '.'
import { GetAllService } from './dto/get-all.service';

@Module({
  controllers: [TasksController],
  providers: [
    {
      provide: 'TasksBehaviour',
      useClass: TasksService 
    }, {
      provide: 'GetAllBehaviour',
      useClass: GetAllService
    } , {
      provide: 'CreateTaskInterface',
      useClass: CreateTask
    }, {
      provide: 'SeachTaskInterface',
      useClass: SearchTask
    }
  ]
})
export class TasksModule {}
