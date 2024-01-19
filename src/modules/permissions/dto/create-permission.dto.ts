
import { ApiProperty } from '@nestjs/swagger';

export class CreatePermissionDto {
    // @ApiProperty({
    //     description: 'The id of the role',
    //     example: 'a036ad92-bccf-405a-8876-6fd7f6bd1514'
    // })
    // readonly roleId: string

    @ApiProperty({
        description: 'The name of the permission',
        example: 'Monami'
    })
    readonly name: string

}
