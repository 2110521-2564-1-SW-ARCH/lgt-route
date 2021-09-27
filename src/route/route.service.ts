import { HttpCode, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import e from "express";
import { resourceUsage } from "process";
import { from, Observable } from "rxjs";
import { Between, getRepository, In, LessThanOrEqual, MoreThanOrEqual, Repository } from "typeorm";
import { LocationEntity } from "./models/location.entity";
import { RouteV2Entity } from "./models/routev2.entity";
import { LocationI } from "./models/location.interface";
import { RouteEntity } from "./models/route.entity";
import { RouteI } from "./models/route.interface";

var _ = require('lodash');

@Injectable()
export class RouteService {
    constructor(
        @InjectRepository(RouteEntity)
        private routeRepository: Repository<RouteEntity>,
        @InjectRepository(LocationEntity)
        private locationRepository: Repository<LocationEntity>,
        @InjectRepository(RouteV2Entity)
        private routeV2Repository: Repository<RouteV2Entity>
    ){}

    async findStation(location: string): Promise<number[]> {
        const station = await this.locationRepository
            .findOne({location: location})
            .then(result => result?.route_id);
        return station
    }

    async searchRoute(RoutePayloadDto)
    : Promise<any> {
        const srcLocation = RoutePayloadDto.srcLocation
        const destLocation = RoutePayloadDto.destLocation
        if (!srcLocation || !destLocation) throw new HttpException('BAD REQUEST', HttpStatus.BAD_REQUEST)
        const response = await this.recursiveRoute(srcLocation, 0, destLocation, 0, [])
            .then(res => {
                console.log('res', res)
                return res
            })
        return response
    }
   
    async recursiveRoute(
        source: string,  
        time: number, 
        destination: string,
        depth: number,
        route: {
            id: number,
            source: string,
            destination: string,
            time_from_last: number
            type: string,
            additional_type: string
        }[]): Promise<any> {
        if (source === destination) {
            return { time: time, route: route }
        } 
        if (depth > 10) return { time: null, route: null }

        const findRoute = await this.routeV2Repository.find({ source: source })
        if (findRoute.length === 0) return { time: null, route: null }

        var bestRouteTime = Infinity
        var bestRoute = []
        for (const possibleRoute of findRoute) {
            var thisRoute = await this.recursiveRoute(
                possibleRoute.destination, 
                possibleRoute.time_from_last + time, 
                destination, 
                depth+1, 
                [...route, possibleRoute]
            )
            if (thisRoute.time && thisRoute.route) {
                if (thisRoute.time < bestRouteTime) {
                    console.log('found best route')
                    bestRouteTime = thisRoute.time
                    bestRoute = thisRoute
                }
            } 
            else continue
        }
        return bestRoute
    }
}