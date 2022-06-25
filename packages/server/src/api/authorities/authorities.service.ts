import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { AuthorityGroup } from './authority-groups.model';

@Injectable()
export class AuthoritiesService {
  constructor(
    @InjectModel(AuthorityGroup) private model: typeof AuthorityGroup,
  ) {}

  getAuthorityGroups() {
    return this.model.findAll();
  }
}
