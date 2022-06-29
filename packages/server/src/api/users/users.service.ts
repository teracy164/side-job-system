import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { LoginUser } from '../../../../shared/lib/types/auth';
import { CryptoUtil } from '../auth/utils/crypto.util';
import { AddUserDto } from './dto/add-user.dto';
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

  addUser(loginUser: LoginUser, dto: AddUserDto) {
    const hash = CryptoUtil.encrypto(dto.password);
    const data: Partial<User> = Object.assign(dto, {
      hash,
      createUserId: loginUser.id,
      updateUserId: loginUser.id,
    });
    return this.model.create(data);
  }
}
