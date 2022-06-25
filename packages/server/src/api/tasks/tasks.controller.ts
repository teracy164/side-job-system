import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { JwtPayload } from 'src/types/jwt-payload';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Task } from './task.model';
import { TasksService } from './tasks.service';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller({ path: 'tasks' })
export class TasksController {
  constructor(private readonly service: TasksService) {}

  @Get()
  @ApiResponse({ type: [Task] })
  getTasks() {
    return this.service.getTasks();
  }

  @Get('/mine')
  @ApiResponse({ type: [Task] })
  getMyTasks(@Request() req) {
    const payload = req.user as JwtPayload;
    console.log(payload);
    return this.service.searchTasks(payload.id);
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

  @Patch(':id/assigner')
  @ApiResponse({ type: Task })
  assignTask(@Request() req, @Param('id', ParseIntPipe) id: number) {
    const payload = req.user as JwtPayload;
    return this.service.assign(payload, id);
  }

  @Delete(':id/assigner')
  @ApiResponse({ type: Task })
  cancelTask(@Request() req, @Param('id', ParseIntPipe) id: number) {
    const payload = req.user as JwtPayload;
    return this.service.cancel(payload, id);
  }
}
