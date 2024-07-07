import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { FinalizeSignupDto, LoginResponseDto, UserDto } from 'src/users/dto/userDto';
import { UserService } from 'src/users/users.service';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class AuthService {
    private readonly logger = new Logger(AuthService.name);

    constructor(private userService: UserService,
        private jwtService: JwtService,
        private prisma: PrismaService
    ) { }

    async login(userDto: UserDto): Promise<LoginResponseDto> {
        const user = await this.validateUser(userDto);
        const token = await this.generateToken(user);

        this.logger.log(`Logged in succesfully: ${user.email}`);
        return { user, token }
    }

    async signup(userDto: UserDto) {
        const candidate = await this.userService.getUserByEmail(userDto.email);
        const confirmationEmailToken = uuidv4();
        this.logger.log(`Signing up ${userDto.email}`);

        if (candidate) {
            this.logger.log(`User with this email already exists: ${userDto.email}`);
            throw new HttpException('User with this email already exists', HttpStatus.BAD_REQUEST);
        }

        const user = await this.userService.createUser({
            ...userDto,
            confirmationToken: confirmationEmailToken,
            confirmed: false,
        });

        this.logger.log(`Confirmation email sent to ${userDto.email}`);
        await this.userService.sendConfirmationEmail(userDto.email, confirmationEmailToken);
        return { message: 'Confirmation email sent' };
    }


    private async generateToken(user: User): Promise<string> {
        const payload = { email: user.email, id: user.id, }
        this.logger.log(`Generating token for ${user.email}`);
        return this.jwtService.sign(payload)
    }

    private async validateUser(userDto: UserDto) {
        const { email, name, password } = userDto;
        let user = null;

        if (email) {
            this.logger.log(`Attempting to login: ${email}`);
            user = await this.userService.getUserByEmail(email);
        } else if (name) {
            this.logger.log(`Attempting to login: ${name}`);
            user = await this.userService.getUserByName(name);
        }

        if (!user) {
            this.logger.log(`Incorrect email or name: ${name}, ${email}`);
            throw new HttpException('Incorrect email or name', HttpStatus.BAD_REQUEST);
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) {
            this.logger.log(`Incorrect password for ${email}, ${name}`);
            throw new HttpException('Incorrect password', HttpStatus.BAD_REQUEST);
        }

        return user;
    }

    async finalizeSignup(finalizeSignupDto: FinalizeSignupDto) {
        const user = await this.prisma.user.findFirst({
            where: { confirmationToken: finalizeSignupDto.token }
        });
        this.logger.log(`Finalizing signup for ${user.email}`);

        if (!user) {
            this.logger.log(`Invalid confirmation token for ${user.email}`);
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

        this.logger.log(`User confirmed succesfully, token sent ${user.email}`);
        return { user, token }
    }
}
