import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { UserService } from './users.service';
import { User as UserModel, Prisma } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UserDto } from './dto/userDto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/all')
  async getAll() {
    return this.userService.getAllUsers();
  }
}