import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma, User } from '@prisma/client';
import { uniqueNamesGenerator, adjectives, colors, animals } from 'unique-names-generator';
import * as bcrypt from 'bcrypt';

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

    async getUserByEmail(email: string): Promise<User> {
        const user = await this.prisma.user.findUnique({ where: { email } });
        return user;
    }
}