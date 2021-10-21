import { IsNotEmpty, IsString, IsInt } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateRoutePayloadDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    source: string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    destination: string

    @ApiProperty()
    @IsInt()
    @IsNotEmpty()
    time: number

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    type: string
    
    @ApiPropertyOptional()
    additional_type?: string
}