import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from 'src/models';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CredsModule } from 'src/services/creds/creds.module';

@Module({
  imports:[TypeOrmModule.forFeature([User]),CredsModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports:[UsersService]
})
export class UsersModule {}
