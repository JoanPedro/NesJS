import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksController, TasksService } from '.'
import { TaskRepository } from './repositories/task.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([TaskRepository])
  ],
  controllers: [TasksController],
  providers: [{
    provide: 'TaskServiceInterface',
    useClass: TasksService
  }]
})
export class TasksModule {}
