import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Task } from './task.model';

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task) private model: typeof Task) {}

  getTasks() {
    return this.model.findAll();
  }

  add(dto: Partial<Task>) {
    delete dto.id;
    return this.model.create(dto);
  }

  async update(id: number, dto: Partial<Task>) {
    const target = await this.model.findOne({ where: { id } });
    if (target) {
      Object.assign(target, dto);
      return target.save();
    }
    throw new BadRequestException();
  }
}
