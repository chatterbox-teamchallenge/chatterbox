import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class MessagesService {
    private readonly logger = new Logger(MessagesService.name);

    constructor(private prisma: PrismaService) { }

    async sendMessage(chatId: number, senderId: number, messageBody: string) {
        const conversation = await this.prisma.conversation.findFirst({
            where: { id: chatId },
            include: { participants: true }
        })

        if (!conversation) {
            this.logger.log(`Conversation not found ${chatId}`);
            throw new HttpException('Conversation not found', HttpStatus.NOT_FOUND);
        }

        const isParticipant = conversation.participants.some(participant => participant.id === senderId)

        if (!isParticipant) {
            this.logger.log(`Sender is not a participant in the conversation`);
            throw new HttpException('Sender is not a participant in the conversation', HttpStatus.FORBIDDEN);
        }

        const message = await this.prisma.message.create({
            data: {
                body: messageBody,
                sender: { connect: { id: senderId } },
                conversation: { connect: { id: chatId } }
            },
            include: {
                sender: true,
                conversation: true
            }
        });

        await this.prisma.conversation.update({
            where: { id: chatId },
            data: { updatedAt: new Date() }
        });

        return message;
    }
}
