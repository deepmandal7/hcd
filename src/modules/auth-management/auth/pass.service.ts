import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { hash, compare } from 'bcryptjs';

@Injectable()
export class PasswordService {
  constructor(private configService: ConfigService) {}

  get bcryptSaltRounds(): string {
    return this.configService.get('bcrypt_salt_or_round');
  }

  validatePassword(password: string, hashedPassword: string): Promise<boolean> {
    return compare(password, hashedPassword);
  }

  hashPassword(password: string): Promise<string> {
    return hash(password, this.bcryptSaltRounds);
  }
}
