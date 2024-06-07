import { Prisma } from "@prisma/client";

export class User implements Prisma.UserCreateInput {
    email: string | null;
    password: string | null;
    name: string | null;
    confirmed: boolean = false;
    confirmationToken: string;
    isBlocked?: boolean = false;
    conversation?: Prisma.ConversationCreateNestedOneWithoutParticipantsInput;
    message?: Prisma.MessageCreateNestedManyWithoutSenderInput;
    createdAt: string | Date = new Date();
    updatedAt?: string | Date = new Date();
    Account?: Prisma.AccountCreateNestedManyWithoutUserInput;
}