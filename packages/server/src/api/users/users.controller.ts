import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { User } from './user.model';
import { UsersService } from './users.service';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller({ path: 'users' })
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @Get()
  @ApiResponse({ type: [User] })
  getUsers() {
    return this.service.getUsers();
  }
}
