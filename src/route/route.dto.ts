import { IsNotEmpty, IsString } from 'class-validator';

export class RoutePayloadDto {
    @IsString()
    @IsNotEmpty()
    srcLocation: string

    @IsString()
    @IsNotEmpty()
    destLocation: string
}
