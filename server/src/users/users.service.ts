import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma, User } from '@prisma/client';
import { uniqueNamesGenerator, adjectives, colors, animals } from 'unique-names-generator';
import * as nodemailer from 'nodemailer';
import * as bcrypt from 'bcrypt';
import { response } from 'express';

@Injectable()
export class UserService {
    private readonly logger = new Logger(UserService.name);

    constructor(private prisma: PrismaService) { }

    async createUser(data: Prisma.UserCreateInput): Promise<User> {
        const randomName: string = uniqueNamesGenerator({
            dictionaries: [adjectives, colors, animals]
        });

        this.logger.log(`Attempting to create a user`);

        if (!data.name) {
            this.logger.log(`Usenrame was not provided, creating with ${randomName}`);
            data.name = randomName;
        }

        this.logger.log(`User has been created ${data.email}`);
        return this.prisma.user.create({ data });
    }

    async getUserByName(name: string): Promise<User> {
        const user = await this.prisma.user.findFirst({ where: { name } })
        this.logger.log(`Found user with name ${name}`);
        return user;
    }

    async getUserByEmail(email: string): Promise<User> {
        const user = await this.prisma.user.findFirst({ where: { email } });
        this.logger.log(`Found user with email ${email}`);
        return user;
    }

    async getAllUsers() {
        this.logger.log(`Retrieveing all users...`);
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
            text: `Please confirm your email by following this link: ${process.env.FRONTEND_URL}=${token}`
        }

        await transporter.sendMail(mailOptions);
    }

    async deleteUserByEmail(email: string): Promise<any> {
        const user = await this.prisma.user.findUnique({ where: { email } });
        this.logger.log(`Deleting user with email ${email}`);

        if (!user) {
            throw new HttpException('User with this email not found', HttpStatus.NOT_FOUND);
        }

        await this.prisma.user.delete({ where: { email } });

        this.logger.log(`User with email ${email} was deleted successfully`);
        return { message: `User with email ${email} was deleted successfully` };
    }

    async sendForgotPasswordEmail(email: string, token: string) {
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
            from: 'forgot password chatterbox',
            to: email,
            subject: 'Forgot Password Link from Chatterbox',
            text: `Please update your password by following this link: ${process.env.FRONTEND_FORGOT_PW_URL}=${token}`
        }

        await transporter.sendMail(mailOptions)
    }

    async updatePassword(newPassword: string, forgotPasswordToken: string) {
        const user = await this.prisma.user.findFirst({
            where: { confirmationToken: forgotPasswordToken }
        });

        if (!user) {
            this.logger.log('User not found on updatePassword, seems missmatch with forgotPasswordToken:', forgotPasswordToken)
            throw new HttpException('User not found on updatePassword, seems missmatch with forgotPasswordToken', HttpStatus.NOT_FOUND)
        }

        const hash = await bcrypt.hash(newPassword, 10);

        await this.prisma.user.update({
            where: { id: user.id },
            data: { password: hash }
        })

        this.logger.log(`Password has been updated successfully for: ${user.email}`)
        return { message: 'Password has been updated successfully' }
    }

    async setUserBio(userId: number, bio: string) {
        const user = await this.prisma.user.findUnique({ where: { id: userId } })

        if (!user) {
            this.logger.log('User not found', userId)
            throw new HttpException('User not found', HttpStatus.NOT_FOUND)
        }

        await this.prisma.user.update({
            where: { id: userId },
            data: { bio }
        })

        return { response: 'User bio was updated succesfully' }
    }
}