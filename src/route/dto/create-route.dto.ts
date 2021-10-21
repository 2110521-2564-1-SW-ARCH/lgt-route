import { IsNotEmpty, IsString, IsInt } from 'class-validator';

export class CreateRoutePayloadDto {
    @IsString()
    @IsNotEmpty()
    source: string

    @IsString()
    @IsNotEmpty()
    destination: string

    @IsInt()
    @IsNotEmpty()
    time: number

    @IsString()
    @IsNotEmpty()
    type: string
    
    additional_type?: string
}