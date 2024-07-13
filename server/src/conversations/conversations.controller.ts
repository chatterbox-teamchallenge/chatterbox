import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { ConversationsService } from './conversations.service';
import { ApiBadRequestResponse, ApiBody, ApiNotFoundResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('Chats')
@Controller('conversations')
export class ConversationsController {
    constructor(private conversationsService: ConversationsService) { }

    @ApiOperation({ summary: 'Get chats for user', description: 'Get chats for user by user\'s ID' })
    @ApiBadRequestResponse({ description: 'Bad Request' })
    @ApiNotFoundResponse({ description: 'User with id not found' })
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                id: {
                    type: 'number',
                    example: 1,
                },
            },
        },
    })
    @Get('list')
    async getAll(@Query('id', ParseIntPipe) id: number) {
        return this.conversationsService.getAllChatsByUser(id);
    }

    @ApiOperation({ summary: 'Create new chat', description: 'Create a chat between two users. NOTE: all the data should exist in db' })
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

    @ApiOperation({ summary: 'Pin Chat', description: 'Pin a chat by chatId' })
    @ApiBadRequestResponse({ description: 'Bad Request' })
    @ApiNotFoundResponse({ description: 'Chat not found' })
    @ApiParam({
        name: 'chatId',
        type: Number,
        description: 'The ID of the chat to pin',
        example: 1,
        required: true,
    })
    @Put('pin/:chatId')
    async pinChat(@Param('chatId', ParseIntPipe) chatId: number) {
        return this.conversationsService.pinChat(chatId)
    }

    @ApiOperation({ summary: 'Delete Chat', description: 'Delete a chat by chatId' })
    @ApiBadRequestResponse({ description: 'Bad Request' })
    @ApiNotFoundResponse({ description: 'Chat not found' })
    @ApiParam({
        name: 'chatId',
        type: Number,
        description: 'The ID of the chat to delete',
        example: 1,
        required: true,
    })
    @Delete('delete/:chatId')
    async deleteChat(@Param('chatId', ParseIntPipe) chatId: number) {
        return this.conversationsService.deleteChatById(chatId)
    }
}
