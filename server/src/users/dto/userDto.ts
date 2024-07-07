import { IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UserDto {
    @ApiProperty({ example: 'email@domain.tld', description: 'Unique and exists' })
    readonly email: string;
    @ApiProperty({ example: 'word_word_word', description: 'Unique, generates by system' })
    name?: string;
    @ApiProperty({ example: 'p@s$w0rd', description: 'Secure string of characters' })
    password?: string;
}

export class LoginResponseDto {
    @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' })
    token: string;
    user: any;
}

export class FinalizeSignupDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: 'dfvfdgbddfw4t54hr', description: 'String, used to confirm email' })
    token: string;

    @IsString()
    @ApiProperty({ example: 'word_word_word', description: 'Unique username' })
    name?: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: 'p@s$w0rd', description: 'Secure string of characters' })
    password: string;
}