import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { response } from 'express';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class ConversationsService {
    private readonly logger = new Logger(ConversationsService.name);

    constructor(private prisma: PrismaService) { }

    async getAllChatsByUser(id: number) {
        const user = await this.prisma.user.findFirst({ where: { id } })
        if (!user) {
            this.logger.log(`Invalid user ID: ${id}`);
            throw new HttpException('Invalid user ID', HttpStatus.NOT_FOUND);
        }

        return this.prisma.conversation.findMany({
            where: {
                participants: {
                    some: {
                        id: user.id
                    }
                }
            },
            include: {
                participants: true,
                messages: {
                    orderBy: {
                        createdAt: 'desc'
                    }
                }
            }
        });
    }

    async createNewChat(participantIds: number[], initialMessages: { senderId: number; body: string }[]) {
        return this.prisma.conversation.create({
            data: {
                participants: {
                    connect: participantIds.map(id => ({ id }))
                },
                messages: {
                    create: initialMessages.map(message => ({
                        sender: { connect: { id: message.senderId } },
                        body: message.body
                    }))
                }
            },
            include: {
                participants: true,
                messages: true
            }
        });
    }

    async pinChat(chatId: number) {
        const chat = await this.prisma.conversation.findUnique({ where: { id: chatId } })

        if (!chat) {
            this.logger.log(`Chat not found ${chatId}`);
            throw new HttpException('Chat not found', HttpStatus.NOT_FOUND);
        }

        await this.prisma.conversation.update({
            where: { id: chatId },
            data: { pinned: true }
        })

        return { response: 'Chat was pinned succesfully' }
    }

    async deleteChatById(chatId: number) {
        const chat = await this.prisma.conversation.findUnique({ where: { id: chatId } })

        if (!chat) {
            this.logger.log(`Chat not found ${chatId}`);
            throw new HttpException('Chat not found', HttpStatus.NOT_FOUND);
        }

        await this.prisma.conversation.delete({ where: { id: chatId } })

        return { response: 'Chat was deleted succesfully' }
    }
}
