import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { DatabaseService } from 'src/database/database.service';
import { SignupAuthDto } from './dto/signup-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { PasswordService } from './pass.service';

@Injectable()
export class AuthService {
  constructor(
    private databaseService: DatabaseService,
    private passwordService: PasswordService,
    private jwtService: JwtService,
  ) {}
  async signup(signupAuthDto: SignupAuthDto) {
    try {
      signupAuthDto.passwd = await this.passwordService.hashPassword(
        signupAuthDto.passwd,
      );
      const dbResponse = await this.databaseService.executeQuery(
        `select * from hcd_insert_user($1, $2, $3, $4, $5, $6)`,
        [
          signupAuthDto.first_name,
          signupAuthDto.last_name,
          signupAuthDto.email_id,
          signupAuthDto.passwd,
          signupAuthDto.country_code,
          signupAuthDto.phone_no,
        ],
      );
      if (dbResponse[0].status_code == 1) {
        return {
          status: dbResponse[0].status_code,
          message: dbResponse[0].status_message,
        };
      } else {
        throw new BadRequestException(dbResponse[0].status_message);
      }
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: error,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
        {
          cause: error,
        },
      );
    }
  }

  async login(loginAuthDto: LoginAuthDto) {
    try {
      const dbResponse = await this.databaseService.executeQuery(
        `select * from hcd_get_user($1)`,
        [loginAuthDto.email_id],
      );
      const validatePassword = await this.passwordService.validatePassword(
        loginAuthDto.passwd,
        dbResponse[0].passwd,
      );

      if (validatePassword) {
        const jwt = await this.jwtService.signAsync({
          email_id: dbResponse[0].email_id,
        });
        return jwt;
      } else {
        throw new BadRequestException(dbResponse[0].status_message);
      }
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: error,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
        {
          cause: error,
        },
      );
    }
  }
}
