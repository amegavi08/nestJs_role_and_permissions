import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleDto {
    @ApiProperty({
        description: 'The name of the role',
        example: 'Master'
    })
    readonly name: string

    readonly permissions: string[];
}
