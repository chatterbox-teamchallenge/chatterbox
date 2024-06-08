import { ApiProperty } from "@nestjs/swagger";
import { Prisma } from "@prisma/client";

export class User implements Prisma.UserCreateInput {
    @ApiProperty({ example: 'email@domain.tld', description: 'Unique and exists' })
    email: string | null;
    @ApiProperty({ example: 'p@s$w0rd', description: 'Secure string of characters' })
    password?: string | null;
    @ApiProperty({ example: 'word_word_word', description: 'Unique, generates by system' })
    name: string | null;
    @ApiProperty({ example: 'true', description: 'Boolean, false by default' })
    confirmed: boolean = false;
    @ApiProperty({ example: 'dfvfdgbddfw4t54hr', description: 'String, used to confirm email' })
    confirmationToken: string;
    @ApiProperty({ example: 'false', description: 'Status, false by default' })
    isBlocked?: boolean = false;
    @ApiProperty({ example: 'null', description: 'Array  of chat IDs' })
    conversation?: Prisma.ConversationCreateNestedOneWithoutParticipantsInput;
    message?: Prisma.MessageCreateNestedManyWithoutSenderInput;
    @ApiProperty({ example: '2024-06-05T08:47:45.155Z', description: 'Time when user created' })
    createdAt: string | Date = new Date();
    @ApiProperty({ example: '2024-06-05T08:47:45.155Z', description: 'Time when user updated' })
    updatedAt?: string | Date = new Date();
    Account?: Prisma.AccountCreateNestedManyWithoutUserInput;
}