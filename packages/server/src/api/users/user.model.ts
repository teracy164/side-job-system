import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  Column,
  CreatedAt,
  Model,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';

@Table({
  tableName: 'users',
  underscored: true,
  timestamps: true,
})
export class User extends Model {
  @ApiPropertyOptional()
  @Column({ primaryKey: true })
  id: number;

  @ApiProperty()
  @Column
  name: string;

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
