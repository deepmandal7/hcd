import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private databaseService: DatabaseService) {}
  create(createUserDto: CreateUserDto) {
    return this.databaseService.executeQuery(
      `select * from hcd_insert_user($1, $2, $3, $4, $5, $6)`,
      [
        createUserDto.first_name,
        createUserDto.last_name,
        createUserDto.email_id,
        createUserDto.passwd,
        createUserDto.country_code,
        createUserDto.phone_no,
      ],
    );
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
