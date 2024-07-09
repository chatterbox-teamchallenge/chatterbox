import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class ConversationsService {
    constructor(private prisma: PrismaService) { }

    async getAll() {

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
}
