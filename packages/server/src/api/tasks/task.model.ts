import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  BelongsToMany,
  Column,
  CreatedAt,
  DataType,
  DefaultScope,
  HasMany,
  Model,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import { User } from '../users/user.model';
import { TaskAssign } from './task_assign.model';

@DefaultScope(() => ({
  include: [User],
}))
@Table({
  tableName: 'tasks',
  underscored: true,
  timestamps: true,
})
export class Task extends Model {
  @ApiPropertyOptional()
  @Column({ primaryKey: true })
  id: number;

  @ApiProperty()
  @Column
  title: string;
  @ApiProperty()
  @Column
  description: string;
  @ApiProperty()
  @Column
  client: string;
  @ApiProperty()
  @Column
  price: number;
  @ApiProperty()
  @Column(DataType.DATEONLY)
  expireDate: string;
  @ApiProperty()
  @Column
  recruitmentNumber: number;
  @ApiProperty()
  @Column
  tags: string;
  @ApiProperty()
  @Column
  note: string;

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

  // assigners用の紐づけ定義
  @HasMany(() => TaskAssign)
  taskAssigns?: TaskAssign[];

  @ApiPropertyOptional({ type: User, isArray: true })
  @BelongsToMany(() => User, () => TaskAssign)
  assigners?: User[];
}
