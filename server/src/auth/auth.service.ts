import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { FinalizeSignupDto, LoginResponseDto, UserDto } from 'src/users/dto/userDto';
import { UserService } from 'src/users/users.service';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class AuthService {

    constructor(private userService: UserService,
        private jwtService: JwtService,
        private prisma: PrismaService
    ) { }

    async login(userDto: UserDto): Promise<LoginResponseDto> {
        const user = await this.validateUser(userDto);
        const token = await this.generateToken(user);

        return { user, token }
    }

    async signup(userDto: UserDto) {
        const candidate = await this.userService.getUserByEmail(userDto.email);
        const confirmationEmailToken = uuidv4();

        if (candidate) {
            throw new HttpException('User with this email already exists', HttpStatus.BAD_REQUEST);
        }

        const user = await this.userService.createUser({
            ...userDto,
            confirmationToken: confirmationEmailToken,
            confirmed: false,
        });

        await this.userService.sendConfirmationEmail(userDto.email, confirmationEmailToken);
        return { message: 'Confirmation email sent' };
    }


    private async generateToken(user: User): Promise<string> {
        const payload = { email: user.email, id: user.id, }
        return this.jwtService.sign(payload)
    }

    private async validateUser(userDto: UserDto) {
        const { email, name, password } = userDto;
        let user = null;

        if (email) {
            user = await this.userService.getUserByEmail(email);
        } else if (name) {
            user = await this.userService.getUserByName(name);
        }

        if (!user) {
            throw new HttpException('Incorrect email or name', HttpStatus.BAD_REQUEST);
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) {
            throw new HttpException('Incorrect password', HttpStatus.BAD_REQUEST);
        }

        return user;
    }

    async finalizeSignup(finalizeSignupDto: FinalizeSignupDto) {
        const user = await this.prisma.user.findFirst({
            where: { confirmationToken: finalizeSignupDto.token }
        });

        if (!user) {
            throw new HttpException('Invalid confirmation token', HttpStatus.BAD_REQUEST);
        }

        const hash = await bcrypt.hash(finalizeSignupDto.password, 10);

        await this.prisma.user.update({
            where: { id: user.id },
            data: {
                name: finalizeSignupDto.name,
                password: hash,
                confirmed: true,
                confirmationToken: null
            }
        });

        const token = await this.generateToken(user);

        return { user, token }
    }
}
