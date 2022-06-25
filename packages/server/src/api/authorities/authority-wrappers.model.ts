import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  CreatedAt,
  ForeignKey,
  HasOne,
  Model,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import { Authority } from './authorities.model';
import { AuthorityGroup } from './authority-groups.model';

@Table({
  tableName: 'authority_wrappers',
  underscored: true,
  timestamps: true,
})
export class AuthorityWrapper extends Model {
  @ApiPropertyOptional()
  @Column({ primaryKey: true })
  id: number;

  @ApiProperty()
  @ForeignKey(() => AuthorityGroup)
  @Column
  parentGroupId: number;

  @ApiProperty()
  @ForeignKey(() => Authority)
  @Column
  authorityId?: number;

  @ApiProperty()
  @ForeignKey(() => AuthorityGroup)
  @Column
  groupId?: number;

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

  @HasOne(() => Authority, 'id')
  authority: Authority;

  // TODO Cyclic dependenciesが発生してエラーになる
  // @HasOne(() => AuthorityGroup, {
  //   as: 'childGroup',
  //   foreignKey: 'groupId',
  //   sourceKey: 'id',
  //   constraints: false,
  // })
  // group: AuthorityGroup;
}
