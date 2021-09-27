import { Body, Controller, Get, Param, Post, Res, HttpStatus, HttpCode } from "@nestjs/common";
import { Observable } from "rxjs";
import { LocationI } from "./models/location.interface";
import { RouteI } from "./models/route.interface";
import { RouteService } from "./route.service";
import { RoutePayloadDto } from "./route.dto";
import { Response } from 'express';

@Controller('api/routes')
export class RouteController {
    constructor(private routeService: RouteService){}

    @HttpCode(HttpStatus.OK)
    @Post('/search-route')
    test(@Body() RoutePayloadDto: RoutePayloadDto) {
        const routeResponse = this.routeService.searchRoute(RoutePayloadDto)
        return routeResponse
    }

}