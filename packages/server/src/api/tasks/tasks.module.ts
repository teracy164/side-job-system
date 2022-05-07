import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Task } from './task.model';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TaskAssign } from './task_assign.model';

@Module({
  imports: [SequelizeModule.forFeature([Task, TaskAssign])],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
