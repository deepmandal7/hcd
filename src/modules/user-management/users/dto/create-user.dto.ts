import { IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  first_name: string;

  @IsString()
  last_name: string;

  @IsString()
  email_id: string;

  @IsString()
  passwd: string;
}
