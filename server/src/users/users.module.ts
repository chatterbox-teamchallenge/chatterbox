import { Module, forwardRef } from '@nestjs/common';
import { UserController } from './users.controller';
import { UserService } from './users.service';
import { PrismaService } from '../../prisma/prisma.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [UserController],
  providers: [UserService, PrismaService],
  imports: [
    forwardRef(() => AuthModule)
  ],
  exports: [UserService]
})
export class UsersModule { }
