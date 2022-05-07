import { Controller, Get } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { Task } from './task.model';
import { TasksService } from './tasks.service';

@Controller({ path: 'tasks' })
export class TasksController {
  constructor(private readonly service: TasksService) {}

  @Get()
  @ApiResponse({ type: [Task] })
  getTasks() {
    return this.service.getTasks();
  }
}
