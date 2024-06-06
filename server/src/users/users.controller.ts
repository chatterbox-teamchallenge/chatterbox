import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './users.service';
import { User as UserModel, Prisma } from '@prisma/client';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/signup')
  async createUser(@Body() userData: Prisma.UserCreateInput): Promise<UserModel> {
    return this.userService.createUser(userData);
  }
}