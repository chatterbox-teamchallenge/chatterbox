import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma, User } from '@prisma/client';
import { uniqueNamesGenerator, adjectives, colors, animals } from 'unique-names-generator';
import * as nodemailer from 'nodemailer';
import { ConfirmEmailDto } from './dto/userDto';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) { }

    async createUser(data: Prisma.UserCreateInput): Promise<User> {

        const randomName: string = uniqueNamesGenerator({
            dictionaries: [adjectives, colors, animals]
        });

        if (!data.name) {
            data.name = randomName;
        }

        return this.prisma.user.create({ data });
    }

    async getUserByName(name: string): Promise<User> {
        const user = await this.prisma.user.findFirst({ where: { name } })
        return user;
    }

    async getUserByEmail(email: string): Promise<User> {
        const user = await this.prisma.user.findUnique({ where: { email } });
        return user;
    }

    async getAllUsers() {
        return this.prisma.user.findMany();
    }

    async sendConfirmationEmail(email: string, token: string) {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: process.env.USER,
                pass: process.env.PASS
            }
        })
    
        const mailOptions = {
            from: 'confirm chatterbox',
            to: email,
            subject: 'Confirm your email for Chatterbox',
            text: `Please confirm your email for Chatterbox account activation by following http://localhost:5000/api/auth/confirm?token=${token}`
        }

        await transporter.sendMail(mailOptions);
    }
}