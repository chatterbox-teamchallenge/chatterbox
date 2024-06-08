import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfirmEmailDto, LoginResponseDto, UserDto } from 'src/users/dto/userDto';
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
        return this.generateToken(user);
    }

    async signup(userDto: UserDto) {
        const candidate = await this.userService.getUserByEmail(userDto.email);
        const confirmationEmailToken = uuidv4();

        if (candidate) {
            throw new HttpException('User with this email already exists', HttpStatus.BAD_REQUEST);
        }

        const hash = await bcrypt.hash(userDto.password, 10);
        const user = await this.userService.createUser({
            ...userDto,
            password: hash,
            confirmationToken: confirmationEmailToken,
            confirmed: false,
        });

        await this.userService.sendConfirmationEmail(userDto.email, confirmationEmailToken)
        return this.generateToken(user);
    }

    private async generateToken(user: User) {
        const payload = { email: user.email, id: user.id, }
        return {
            token: this.jwtService.sign(payload)
        }
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

    async confirmEmail(confirmEmailDto: ConfirmEmailDto) {
        const user = await this.prisma.user.findFirst({
            where: { confirmationToken: confirmEmailDto.token }
        });

        if (!user) {
            throw new HttpException('Not allowed to confirm. Invalid confirmation token', HttpStatus.BAD_REQUEST)
        }

        await this.prisma.user.update({
            where: { id: user.id },
            data: {
                confirmed: true,
                confirmationToken: null
            }
        })

        return {message: 'Email confirmed successfully'}
    }
}
