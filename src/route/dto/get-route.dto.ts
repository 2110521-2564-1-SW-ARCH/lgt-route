import { IsNotEmpty, IsString } from 'class-validator';

export class GetRoutePayloadDto {
    @IsString()
    @IsNotEmpty()
    srcLocation: string

    @IsString()
    @IsNotEmpty()
    destLocation: string
}
