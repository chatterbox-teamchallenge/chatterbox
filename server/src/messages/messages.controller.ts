import { Body, Controller, Get, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { ApiBadRequestResponse, ApiBody, ApiForbiddenResponse, ApiNotFoundResponse, ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('Messages')
@Controller('messages')
export class MessagesController {
    constructor(private messagesService: MessagesService) { }

    @ApiOperation({ summary: 'Send Message', description: 'Send message using chatId. All the data should exist' })
    @ApiBadRequestResponse({ description: 'Bad Request' })
    @ApiNotFoundResponse({ description: 'Conversation not found' })
    @ApiForbiddenResponse({ description: 'Sender is not a participant in the conversation' })
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                chatId: {
                    type: 'number',
                    example: 1,
                },
                senderId: {
                    type: 'number',
                    example: 2,
                },
                messageBody: {
                    type: 'string',
                    example: 'Wow! That\'s great :)'
                }
            },
        },
    })
    @Post('send')
    async sendMessage(@Body() body: { chatId: number, senderId: number, messageBody: string }) {
        return this.messagesService.sendMessage(body.chatId, body.senderId, body.messageBody);
    }

    @ApiOperation({ summary: 'Get Messages', description: 'Receive list of messages for chat by chatId' })
    @ApiBadRequestResponse({ description: 'Bad Request' })
    @ApiNotFoundResponse({ description: 'Conversation not found' })
    @ApiQuery({
        name: 'chatId',
        type: Number,
        description: 'The ID of the chat to get messages for',
        example: 1,
        required: true,
    })
    @Get('get')
    async getMessages(@Query('chatId', ParseIntPipe) chatId: number) {
        return this.messagesService.getMessagesByChat(chatId)
    }

    @ApiOperation({ summary: 'Update Message', description: 'Update a message by messageId' })
    @ApiBadRequestResponse({ description: 'Bad Request' })
    @ApiNotFoundResponse({ description: 'Message not found' })
    @ApiParam({
        name: 'messageId',
        type: Number,
        description: 'The ID of the message to update',
        example: 1,
        required: true,
    })
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                content: {
                    type: 'string',
                    description: 'The new content of the message',
                    example: 'Updated message content',
                },
            },
        },
    })
    @Put('update/:messageId')
    async updateMessage(
        @Param('messageId', ParseIntPipe) messageId: number,
        @Body('content') content: string 
    ) {
        return this.messagesService.updateMessage(messageId, content);
    }
}
