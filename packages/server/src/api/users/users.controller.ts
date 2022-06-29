import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { LoginUser } from '../../../../shared/lib/types/auth';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AddUserDto } from './dto/add-user.dto';
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

  @Post()
  @ApiResponse({ type: User })
  addUser(@Request() req, @Body() body: AddUserDto) {
    const loginUser = req.user as LoginUser;
    return this.service.addUser(loginUser, body);
  }
}
