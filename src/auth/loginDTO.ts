import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, MinLength} from "class-validator";


export class LoginDTO {

    @ApiProperty({
        description: 'The username of the Customer',
        example: 'name'
    })
    @IsNotEmpty()
    username: string;


    @ApiProperty({
        description: 'The password of the User/Customer',
        example: '*****'
    })
    @IsNotEmpty()
    password:string;
}