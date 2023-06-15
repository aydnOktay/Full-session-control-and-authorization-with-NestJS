import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from './api/admin/admin.module';
import { UsersModule } from './api/users/users.module';
import { CredsModule } from './services/creds/creds.module';
import { OtpModule } from './services/otp/otp.module';
import { JwtModule } from './services/jwt/jwt.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import enviroments from './tools/enviroments';
import { AuthModule } from './api/auth/auth.module';
import { User,Expense, Workers } from './models';
import { Executive } from './models/Executive';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type:"mysql",
      host:enviroments.host,
      port:enviroments.port,
      username:enviroments.username,
      password:enviroments.password,
      database:enviroments.database,
      entities:[User,Expense,Executive,Workers],
      synchronize:true
    })
    ,AdminModule,UsersModule,CredsModule,OtpModule,JwtModule,AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
