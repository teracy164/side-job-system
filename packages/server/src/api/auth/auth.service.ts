import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { CryptoUtil } from './utils/crypto.util';
import { JwtPayload } from '../../../../shared/lib/types/auth';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(loginId: string, password: string): Promise<any> {
    const user = await this.checkAuth(loginId, password);
    if (user) {
      return user;
    }
    throw new BadRequestException();
  }

  async login(dto: LoginDto) {
    const user = await this.checkAuth(dto.loginId, dto.password);
    if (user) {
      const payload = { id: user.id, name: user.name } as JwtPayload;
      return this.jwtService.sign(payload);
    }
    throw new BadRequestException();
  }

  private async checkAuth(loginId: string, password: string) {
    const user = await this.usersService.getUserForAuth(loginId);
    if (user) {
      const hash = CryptoUtil.encrypto(password);
      if (hash === user.hash) {
        return user;
      }
    }
    return null;
  }
}
