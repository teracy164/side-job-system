import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  Column,
  CreatedAt,
  ForeignKey,
  Model,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import { Task } from './task.model';

@Table({
  tableName: 'task_statuses',
  underscored: true,
  timestamps: true,
})
export class TaskStatus extends Model {
  @ApiPropertyOptional()
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @ApiProperty()
  @ForeignKey(() => Task)
  @Column
  taskId: number;

  @ApiProperty()
  @Column
  status: number;

  @ApiProperty()
  @Column
  comment: string;

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
}
