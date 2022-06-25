import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  CreatedAt,
  ForeignKey,
  Model,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import { User } from '../users/user.model';
import { Task } from './task.model';

@Table({
  tableName: 'task_assigns',
  underscored: true,
  timestamps: true,
})
export class TaskAssign extends Model {
  @ApiPropertyOptional()
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @ApiProperty()
  @ForeignKey(() => Task)
  @Column
  taskId: number;
  @ApiProperty()
  @ForeignKey(() => User)
  @Column
  userId: number;

  @ApiPropertyOptional()
  @CreatedAt
  createdAt: string;
  @ApiPropertyOptional()
  @Column
  createUserId: number;
  @ApiPropertyOptional()
  @UpdatedAt
  updatedAt: string;
  @ApiPropertyOptional()
  @Column
  updateUserId: number;

  @BelongsTo(() => Task)
  task?: Task;
  @BelongsTo(() => User)
  user?: User;
}
