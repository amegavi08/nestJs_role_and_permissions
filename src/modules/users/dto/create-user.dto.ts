import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Matches } from 'class-validator';

export class CreateUserDto {
    // @ApiProperty({
    //     description: 'The id of the role',
    //     example: 'a036ad92-bccf-405a-8876-6fd7f6bd1514'
    // })
    // readonly roleId: string;

    @ApiProperty({
        description: 'The name of the user',
        example: 'Monami'
    })
    readonly username: string;

    @ApiProperty({
        description: 'The email of the Organization',
        example: 'kemi@gmail.com'
     })
     @IsNotEmpty()
     @IsEmail()
     @Matches(/^[a-zA-Z0-9._%+-]+@.+\.com$/, {
        message:'Invalid email format,'
     })
     email: string;

    @ApiProperty({
        description: 'The password of the user',
        example: '******'
    })
    readonly password: string;

}
