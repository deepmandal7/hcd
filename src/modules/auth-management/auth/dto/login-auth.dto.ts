import { IsString } from 'class-validator';

export class LoginAuthDto {
  @IsString()
  email_id: string;

  @IsString()
  passwd: string;
}
