import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfig } from './database/config/typeorm.config';
import { TasksModule } from './tasks';

@Module({
  imports: [
    TypeOrmModule.forRoot(TypeOrmConfig),
    TasksModule
  ]
})
export class AppModule {}
