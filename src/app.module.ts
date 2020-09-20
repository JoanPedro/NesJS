import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfig } from './database/config/typeorm.config';
import { TasksModule } from './tasks';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(TypeOrmConfig),
    TasksModule,
    AuthModule
  ]
})
export class AppModule {}
