import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Scope, User } from './user.model';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private model: typeof User) {}

  getUsers() {
    return this.model.findAll();
  }

  getUserForAuth(loginId: string) {
    return this.model.scope(Scope.AUTH).findOne({ where: { loginId } });
  }
}
