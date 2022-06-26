import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import * as CryptoJS from 'crypto-js';
import { JwtPayload } from 'src/shared/types/auth';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(loginId: string, password: string): Promise<any> {
    const user = await this.usersService.getUserForAuth(loginId);
    if (user) {
      const hash = this.encrypto(password);
      if (hash === user.hash) {
        return user;
      }
    }
    throw new BadRequestException();
  }

  async login(dto: LoginDto) {
    const user = await this.usersService.getUserForAuth(dto.loginId);
    if (user) {
      const hash = this.encrypto(dto.password);
      if (hash === user.hash) {
        const payload = { id: user.id, name: user.name } as JwtPayload;
        return this.jwtService.sign(payload);
      }
    }
    throw new BadRequestException();
  }

  private encrypto(password: string) {
    const encrypted = CryptoJS.SHA256(password);
    return encrypted.toString(CryptoJS.enc.Base64);
  }
}
