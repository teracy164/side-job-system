import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthoritiesController } from './authorities.controller';
import { Authority } from './authorities.model';
import { AuthoritiesService } from './authorities.service';
import { AuthorityGroup } from './authority-groups.model';
import { AuthorityWrapper } from './authority-wrappers.model';

@Module({
  imports: [
    SequelizeModule.forFeature([Authority, AuthorityWrapper, AuthorityGroup]),
  ],
  controllers: [AuthoritiesController],
  providers: [AuthoritiesService],
})
export class AuthoritiesModule {}
