import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
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

  @Post()
  @ApiResponse({ type: Task })
  addTask(@Body() body: Task) {
    return this.service.add(body);
  }

  @Patch(':id')
  @ApiResponse({ type: Task })
  updateTask(@Param('id', ParseIntPipe) id: number, @Body() body: Task) {
    return this.service.update(id, body);
  }
}
