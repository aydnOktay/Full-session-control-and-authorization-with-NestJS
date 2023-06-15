import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import enviroments from 'src/tools/enviroments';
import { UsersModule } from '../users/users.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { User } from 'src/models';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from 'src/services/jwt/jwt.module';

import { CredsModule } from 'src/services/creds/creds.module';

@Module({
  imports:[TypeOrmModule.forFeature([User]),UsersModule,JwtModule,CredsModule,
  MailerModule.forRoot({
    transport:{
      host:"smtp.gmail.com",
      auth:{
        user:enviroments.gmailUser,
        pass:enviroments.gmailPass
      }
    }
  })],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
