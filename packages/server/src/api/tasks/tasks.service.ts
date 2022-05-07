import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Task } from './task.model';

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task) private model: typeof Task) {}

  getTasks() {
    return this.model.findAll();
  }
}
