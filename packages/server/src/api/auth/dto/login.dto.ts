import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty()
  loginId: string;
  @ApiProperty()
  password: string;
}
