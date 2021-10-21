import { Body, Controller, Get, Param, Post, Res, HttpStatus, HttpCode, Delete } from "@nestjs/common";
import { Observable } from "rxjs";
import { RouteService } from "./route.service";
import { GetRoutePayloadDto } from "./dto/get-route.dto";
import { CreateRoutePayloadDto } from "./dto/create-route.dto";
import { Response } from 'express';
import { ApiTags } from "@nestjs/swagger";

@ApiTags('routes')
@Controller('api/routes')
export class RouteController {
    constructor(private routeService: RouteService){}

    @HttpCode(HttpStatus.OK)
    @Post('/search-route')
    searchRoute(@Body() RoutePayloadDto: GetRoutePayloadDto) {
        const routeResponse = this.routeService.searchRouteService(RoutePayloadDto)
        return routeResponse
    }

    @HttpCode(HttpStatus.OK)
    @Post('/save-route')
    createRoute(@Body() RoutePayload: CreateRoutePayloadDto) {
        return this.routeService.createOrUpdateRouteService(RoutePayload)
    }

    @HttpCode(HttpStatus.OK)
    @Delete('/:id')
    deleteRoute(@Param('id') routeId: number) {
        return this.routeService.deleteRouteService(routeId)
    }
}