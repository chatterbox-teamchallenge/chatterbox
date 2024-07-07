import { Body, Controller, Post, } from '@nestjs/common';
import {  FinalizeSignupDto, LoginResponseDto, UserDto } from 'src/users/dto/userDto';
import { AuthService } from './auth.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) { }

    @ApiOperation({ summary: 'Login', description: 'Login with username OR email' })
    @ApiResponse({ status: 200, description: 'JWT Token along with user object' })
    @Post('/login')
    login(@Body() userDto: UserDto) {
        return this.authService.login(userDto);
    }

    @ApiOperation({ summary: 'Signup', description: 'Signup with single email' })
    @ApiResponse({ status: 200, description: 'JWT Token', type: LoginResponseDto })
    @Post('/signup')
    signup(@Body() userDto: UserDto) {
        return this.authService.signup(userDto);
    }

    @ApiOperation({ summary: 'Finalization of signup', description: 'Username is optional' })
    @ApiResponse({ status: 200, description: 'JWT Token along with user object' })
    @Post('/finalize-signup')
    async finalizeSignup(@Body() finalizeSignupDto: FinalizeSignupDto) {
        return this.authService.finalizeSignup(finalizeSignupDto);
    }
}
