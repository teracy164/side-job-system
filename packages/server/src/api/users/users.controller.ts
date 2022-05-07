import { Controller, Get } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { User } from './user.model';
import { UsersService } from './users.service';

@Controller({ path: 'users' })
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @Get()
  @ApiResponse({ type: [User] })
  getUsers() {
    return this.service.getUsers();
  }
}
