import { IsString } from "class-validator";

export class UserDto {
    readonly email: string;
    name?: string;
    readonly password: string;
}

export class ConfirmEmailDto {
    @IsString()
    token: string;
}