import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  Column,
  CreatedAt,
  Model,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';

@Table({
  tableName: 'authorities',
  underscored: true,
  timestamps: true,
})
export class Authority extends Model {
  @ApiPropertyOptional()
  @Column({ primaryKey: true })
  id: number;

  @ApiProperty()
  @Column({ comment: '権限名' })
  name: string;

  @ApiProperty()
  @Column({ comment: 'システム管理者フラグ' })
  isSystemAdmin: boolean;

  @ApiProperty()
  @Column({ comment: 'メンバー管理機能有効フラグ' })
  canManagementMember: boolean;

  @ApiProperty()
  @Column({ comment: 'ユーザー管理機能有効フラグ' })
  canManagementUser: boolean;

  @ApiProperty()
  @Column({ comment: 'タスク管理機能有効フラグ' })
  canManagementTask: boolean;

  @ApiProperty()
  @Column
  isDeleted: boolean;

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
