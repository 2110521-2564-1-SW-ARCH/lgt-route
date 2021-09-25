import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { from, Observable } from "rxjs";
import { Between, Repository } from "typeorm";
import { LocationEntity } from "./models/location.entity";
import { LocationI } from "./models/location.interface";
import { RouteEntity } from "./models/route.entity";
import { RouteI } from "./models/route.interface";

@Injectable()
export class RouteService {
    constructor(
        @InjectRepository(RouteEntity)
        private routeRepository: Repository<RouteEntity>,
        @InjectRepository(LocationEntity)
        private locationRepository: Repository<LocationEntity>
    ){}

    add(location: LocationI) {
        return from(this.locationRepository.save(location));
    }

    async findStation(loc: string): Promise<string> {
        const station = await this.locationRepository.findOne({location:loc}).then(result => result.station);
        return station.toString()
    }

    async findRoute(src: string, dest: string) {
        //some code here
        var src_station = await this.findStation(src)
        var dest_station = await this.findStation(dest)
        var src_ord = await this.routeRepository.findOne({station:src_station}).then(result => result.order) 
        var dest_ord = await this.routeRepository.findOne({station:dest_station}).then(result => result.order) 
        
        return this.routeRepository.find({
            select:['station'],
            where:{
                order: Between(src_ord, dest_ord)
            }
        })
    }
}