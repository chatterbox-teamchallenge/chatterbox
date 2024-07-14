import { Controller, Post, Body, Get, UseGuards, Delete, Put, Param, ParseIntPipe } from '@nestjs/common';
import { UserService } from './users.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiBadRequestResponse, ApiBody, ApiNotFoundResponse, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './users.model';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, type: [User] })
  @UseGuards(JwtAuthGuard)
  @Get('/all')
  async getAll() {
    return this.userService.getAllUsers();
  }

  @ApiOperation({ summary: 'Forgot password', description: 'Username is optional' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        newPassword: {
          type: 'string',
          example: 'newPassword123@#$%',
        },
        forgotPasswordToken: {
          type: 'string',
          example: '7b56fa4c-a134-46b4-a730-8debf0961ca6',
        },
      },
    },
  })
  @Put('/update-password')
  async updatePassword(@Body() body: { newPassword: string, forgotPasswordToken: string }) {
    return this.userService.updatePassword(body.newPassword, body.forgotPasswordToken)
  }

  @ApiOperation({ summary: 'Set User bio', description: 'Set up/update user\'s bio' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiParam({
    name: 'userId',
    type: Number,
    description: 'The ID of the user to set up the bio',
    example: 1,
    required: true,
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        bio: {
          type: 'string',
          example: 'Yeah... That\'s my new bio',
        }
      },
    },
  })
  @Put('set-bio/:userId')
  async setUserBio(
    @Param('userId', ParseIntPipe) userId: number,
    @Body('bio') bio: string
  ) {
    return this.userService.setUserBio(userId, bio)
  }

  @ApiOperation({ summary: 'Delete user by email' })
  @ApiResponse({ status: 200 })
  @Delete('/delete')
  async deleteUserByEmail(@Body('email') email: any) {
    return this.userService.deleteUserByEmail(email);
  }
}