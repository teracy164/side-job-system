import { Controller, Post, Body } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private service: AuthService) {}

  @Post()
  @ApiResponse({ type: String })
  async login(@Body() body: LoginDto) {
    return this.service.login(body);
  }
}
