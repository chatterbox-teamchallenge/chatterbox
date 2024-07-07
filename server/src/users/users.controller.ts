import { Controller, Post, Body, Get, UseGuards, Delete } from '@nestjs/common';
import { UserService } from './users.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './users.model';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, type: [User] })
  @UseGuards(JwtAuthGuard)
  @Get('/all')
  async getAll() {
    return this.userService.getAllUsers();
  }

  @ApiOperation({ summary: 'Delete user by email' })
  @ApiResponse({ status: 200 })
  @Delete('/delete')
  async deleteUserByEmail(@Body('email') email: any) {
    return this.userService.deleteUserByEmail(email);
  }
}