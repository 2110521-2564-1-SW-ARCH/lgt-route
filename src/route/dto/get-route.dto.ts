import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetRoutePayloadDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    srcLocation: string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    destLocation: string
}
