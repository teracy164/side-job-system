import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { JwtPayload } from 'src/types/jwt-payload';
import { Task } from './task.model';
import { TaskAssign } from './task_assign.model';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Task) private model: typeof Task,
    @InjectModel(TaskAssign) private modelAssign: typeof TaskAssign,
  ) {}

  getTasks() {
    return this.model.findAll();
  }

  searchTasks(userId: number) {
    return this.model.findAll({ where: { '$assigners.id$': userId } });
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

  async assign(user: JwtPayload, taskId: number) {
    const task = await this.model.findOne({ where: { id: taskId } });
    if (task) {
      const alreadyAssigned = task.assigners?.some((a) => a.id === user.id);
      if (alreadyAssigned) {
        return task;
      } else {
        if (task.assigners.length < task.recruitmentNumber) {
          const data = {
            taskId: task.id,
            userId: user.id,
            createUserId: user.id,
            updateUserId: user.id,
          } as TaskAssign;
          await this.modelAssign.create(data as any, {});
          // 検索しなおす
          return this.model.findOne({ where: { id: taskId } });
        } else {
          throw new BadRequestException('すでに満員です');
        }
      }
    }
    throw new NotFoundException();
  }

  async cancel(user: JwtPayload, taskId: number) {
    const result = await this.modelAssign.destroy({
      where: { taskId, userId: user.id },
    });

    if (result > 0) {
      return true;
    }
    throw new BadRequestException('アサインしていません');
  }
}
