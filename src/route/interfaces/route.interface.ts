import { HttpStatus } from "@nestjs/common";

export interface IRoute {
    id?: number,
    source: string,
    destination: string,
    time: number,
    type: string,
    additional_type?: string,
}

export interface IResponse {
    message: string,
    code: HttpStatus,
    id?: number,
}