import { IsOptional, IsString } from 'class-validator';

export class SignupAuthDto {
  @IsString()
  first_name: string;

  @IsString()
  last_name: string;

  @IsString()
  email_id: string;

  @IsString()
  passwd: string;

  @IsString()
  @IsOptional()
  country_code?: string = null;

  @IsString()
  @IsOptional()
  phone_no?: string = null;
}
