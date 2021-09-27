import { Body, Controller, Get, Param, Post, Res, HttpStatus  } from "@nestjs/common";
import { Observable } from "rxjs";
import { LocationI } from "./models/location.interface";
import { RouteI } from "./models/route.interface";
import { RouteService } from "./route.service";
import { RoutePayloadDto } from "./route.dto";
import { Response } from 'express';

@Controller('api/routes')
export class RouteController {
    constructor(private routeService: RouteService){}

    @Post('/get-route')
    findRoute(@Body() RoutePayloadDto: RoutePayloadDto) {
        const routeResponse = this.routeService.findRoute(RoutePayloadDto)
        return routeResponse
    }
    @Post('/search-route')
    test(@Body() RoutePayloadDto: RoutePayloadDto) {
        const routeResponse = this.routeService.searchRoute(RoutePayloadDto)
        return routeResponse
    }
    // findRoute(@Param('source') src: string, @Param('destination') dest: string) {
    //     return this.routeService.findRoute(src, dest);
    // }
    
    //ไม่ได้ใช้จริง
    // @Get(':location')
    // findStation(@Param('location') location: string) {
    //     return this.routeService.findStation(location);
    // }
    // @Post()
    // add(@Body() location: LocationI): Observable<LocationI> {
    //     return this.routeService.add(location);
    // }
}