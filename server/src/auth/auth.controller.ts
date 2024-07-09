import { Body, Controller, Post, } from '@nestjs/common';
import { FinalizeSignupDto, LoginResponseDto, UserDto } from 'src/users/dto/userDto';
import { AuthService } from './auth.service';
import { ApiBadRequestResponse, ApiBody, ApiNotFoundResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

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

    @ApiOperation({ summary: 'Forgot password', description: 'Username is optional' })
    @ApiBadRequestResponse({ description: 'Bad Request' })
    @ApiNotFoundResponse({ description: 'User not found' })
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                email: {
                    type: 'string',
                    example: 'example@email.com',
                },
                oldPassword: {
                    type: 'string',
                    example: 'oldpassword',
                },
            },
        },
    })
    @Post('/forgot-password')
    async forgotPassword(@Body() body: { email: string, oldPassword: string }) {
        return this.authService.forgotPassword(body.email, body.oldPassword)
    }
}
