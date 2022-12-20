import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';

@Injectable()
export class AuthService {
  constructor(private databaseService: DatabaseService) {}
  async signup(createAuthDto: CreateAuthDto) {
    try {
      const dbResponse = await this.databaseService.executeQuery(
        `select * from hcd_insert_user($1, $2, $3, $4)`,
        [
          createAuthDto.first_name,
          createAuthDto.last_name,
          createAuthDto.email_id,
          createAuthDto.passwd,
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
          error: 'Something went wrong',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
        {
          cause: error,
        },
      );
    }
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
