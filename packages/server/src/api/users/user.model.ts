import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  Column,
  CreatedAt,
  DefaultScope,
  Model,
  Table,
  UpdatedAt,
  Scopes,
} from 'sequelize-typescript';

export enum Scope {
  AUTH = 'auth',
}

@DefaultScope(() => ({
  attributes: {
    exclude: ['hash'],
  },
}))
@Scopes(() => ({
  [Scope.AUTH]: {
    attributes: {
      exclude: [],
    },
  },
}))
@Table({
  tableName: 'users',
  underscored: true,
  timestamps: true,
})
export class User extends Model {
  @ApiPropertyOptional()
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @ApiProperty()
  @Column
  name: string;

  @Column
  loginId: string;

  @Column
  hash: string;

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
