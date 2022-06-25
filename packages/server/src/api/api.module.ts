import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { AuthoritiesModule } from './authorities/authorities.module';
import { TasksModule } from './tasks/tasks.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [AuthModule, TasksModule, UsersModule, AuthoritiesModule],
})
export class ApiModule {}
