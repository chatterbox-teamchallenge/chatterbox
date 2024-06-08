import { Body, Controller, Post, Get, Query } from '@nestjs/common';
import {  FinalizeSignupDto, LoginResponseDto, UserDto } from 'src/users/dto/userDto';
import { AuthService } from './auth.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) { }

    @ApiOperation({ summary: 'Login', description: 'Login with username OR email' })
    @ApiResponse({ status: 200, description: 'JWT Token', type: LoginResponseDto })
    @Post('/login')
    login(@Body() userDto: UserDto) {
        return this.authService.login(userDto);
    }

    @ApiOperation({ summary: 'Signup', description: '' })
    @ApiResponse({ status: 200, description: 'JWT Token', type: LoginResponseDto })
    @Post('/signup')
    signup(@Body() userDto: UserDto) {
        return this.authService.signup(userDto);
    }

    @ApiOperation({ summary: 'Finalize confirmation and signup', description: 'Username is optional' })
    @ApiResponse({ status: 200 })
    @Post('/finalize-signup')
    async finalizeSignup(@Body() finalizeSignupDto: FinalizeSignupDto) {
        return this.authService.finalizeSignup(finalizeSignupDto);
    }
}
