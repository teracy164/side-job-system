import { ApiProperty, PartialType } from '@nestjs/swagger';
import { User } from '../user.model';

export class AddUserDto extends PartialType(User) {
  @ApiProperty()
  password: string;
}
