import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { Observable } from "rxjs";
import { LocationI } from "./models/location.interface";
import { RouteI } from "./models/route.interface";
import { RouteService } from "./route.service";

@Controller('routes')
export class RouteController {
    constructor(private routeService: RouteService){}

    @Get('/:source/:destination')
    findRoute(@Param('source') src: string, @Param('destination') dest: string) {
        return this.routeService.findRoute(src, dest);
    }
    
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