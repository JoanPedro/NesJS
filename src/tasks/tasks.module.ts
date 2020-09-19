import { Module } from '@nestjs/common';
import { TasksController, TasksService } from '.'

@Module({
  controllers: [TasksController],
  providers: [{
    provide: 'TaskServiceInterface',
    useClass: TasksService
  }]
})
export class TasksModule {}
