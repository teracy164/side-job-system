import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  Column,
  CreatedAt,
  HasMany,
  Model,
  Table,
  UpdatedAt,
  DefaultScope,
} from 'sequelize-typescript';
import { Authority } from './authorities.model';
import { AuthorityWrapper } from './authority-wrappers.model';

@DefaultScope(() => ({
  include: [
    {
      model: AuthorityWrapper,
      include: [
        { model: Authority },
        // { model: AuthorityGroup, as: 'childGroup' },
      ],
    },
  ],
}))
@Table({
  tableName: 'authority_groups',
  underscored: true,
  timestamps: true,
})
export class AuthorityGroup extends Model {
  @ApiPropertyOptional()
  @Column({ primaryKey: true })
  id: number;

  @ApiProperty()
  @Column({ comment: '権限グループ名' })
  name: string;

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

  @HasMany(() => AuthorityWrapper)
  authorities: AuthorityWrapper[];
}
