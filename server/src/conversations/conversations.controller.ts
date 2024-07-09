import { Body, Controller, Get, Post } from '@nestjs/common';
import { ConversationsService } from './conversations.service';
import { ApiBadRequestResponse, ApiBody, ApiNotFoundResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Chats')
@Controller('conversations')
export class ConversationsController {
    constructor(private conversationsService: ConversationsService) { }

    @Get('all')
    async getAll() {
        return this.conversationsService.getAll();
    }


    @ApiOperation({ summary: 'Create new chat', description: 'Create a chat between two user. NOTE: all the data should exist in db' })
    @ApiBadRequestResponse({ description: 'Bad Request' })
    @ApiNotFoundResponse({ description: 'User with id not found' })
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                participantIds: {
                    type: 'array',
                    example: [
                        1,
                        2
                    ],
                },
                initialMessages: {
                    type: 'array',
                    example: [
                        { senderId: 1, body: "Hi there! This is morning in Tokyo" }
                    ],
                },
            },
        },
    })
    @Post('create')
    async createNewChat(
        @Body('participantIds') participantIds: number[],
        @Body('initialMessages') initialMessages: { senderId: number; body: string }[]
    ) {
        return this.conversationsService.createNewChat(participantIds, initialMessages);
    }
}