import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { DatabaseModule } from 'src/database/database.module';
import { PasswordService } from './pass.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    DatabaseModule,
    JwtModule.register({
      secret: 'somesecret',
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, PasswordService],
  exports: [JwtModule],
})
export class AuthModule {}
