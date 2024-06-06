import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from 'src/users/dto/userDto';
import { UserService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {

    constructor(private userService: UserService,
        private jwtService: JwtService
    ) { }

    async login(userDto: UserDto) {
        const user = await this.validateUser(userDto);
        return this.generateToken(user);
    }

    async signup(userDto: UserDto) {
        const candidate = await this.userService.getUserByEmail(userDto.email);
        if (candidate) {
            throw new HttpException('User with this email already exists', HttpStatus.BAD_REQUEST)
        }

        const hash = await bcrypt.hash(userDto.password, 10);
        const user = await this.userService.createUser({ ...userDto, password: hash });
        return this.generateToken(user);
    }

    private async generateToken(user: User) {
        const payload = { email: user.email, id: user.id, }
        return {
            token: this.jwtService.sign(payload)
        }
    }

    private async validateUser (userDto: UserDto) {
        const user = await this.userService.getUserByEmail(userDto.email);
        const isPasswordMatch = await bcrypt.compare(userDto.password, user.password);

        if (user && isPasswordMatch) {
            return user;
        } else {
            throw new HttpException('Incorrect email or password', HttpStatus.BAD_REQUEST);
        }
    }
}
