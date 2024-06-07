import { Body, Controller, Post, Get, Query, HttpException, HttpStatus } from '@nestjs/common';
import { ConfirmEmailDto, UserDto } from 'src/users/dto/userDto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) { }

    @Post('/login')
    login(@Body() userDto: UserDto) {
        return this.authService.login(userDto);
    }

    @Post('/signup')
    signup(@Body() userDto: UserDto) {
        return this.authService.signup(userDto);
    }

    @Get('/confirm')
    async confirmEmail(@Query('token') token: string) {
        return this.authService.confirmEmail({ token });
    }
}
