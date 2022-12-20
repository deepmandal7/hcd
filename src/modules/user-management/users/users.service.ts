import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private databaseService: DatabaseService) {}
  create(createUserDto: CreateUserDto) {
    return this.databaseService.executeQuery(
      `insert into hcd_users(first_name, last_name, email_id, passwd)
      values($1, $2, $3, $4)`,
      [
        createUserDto.first_name,
        createUserDto.last_name,
        createUserDto.email_id,
        createUserDto.passwd,
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
