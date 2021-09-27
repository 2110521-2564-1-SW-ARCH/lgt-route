import { HttpCode, HttpStatus, Injectable } from "@nestjs/common";
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

    async findRoute(RoutePayloadDto)
    : Promise<any> {
        const srcLocation = RoutePayloadDto.srcLocation
        const destLocation = RoutePayloadDto.destLocation
        //some code here
        const srcRouteId = await this.findStation(srcLocation)
        const destRouteId = await this.findStation(destLocation)
        if (!srcRouteId || !destRouteId) {
            return { 
                message: "No location data in the system", 
                status_code: HttpStatus.BAD_REQUEST
            }
        }
        const possibleRoute: number[] = _.intersection(srcRouteId, destRouteId)

        if (possibleRoute.length === 0) {
            return { 
                message: "No route found",
                status_code: HttpStatus.BAD_REQUEST
            }
        }
                
        const findedRoute = await this.routeRepository.find({
                    where:{
                        route_id: In(possibleRoute),
                    }
                })

        var mapedRoute = _(findedRoute)
                .groupBy(x => x.route_id)
                .map((value, key) => ({
                  route_id: key,
                  data: value
                }))
                .value();
        
        var routeArray = []
        var allTime = Infinity
        var resultRouteArray = []
        console.log('srcLocation', srcLocation, destLocation)
        mapedRoute.forEach((route) => {
            // each route
            var time = 0
            var isInRange = false
            routeArray = []
            _.sortBy(route.data, 'order').forEach((data) => {
                if (data.location === srcLocation) {
                    isInRange = true
                }
                if (isInRange) {
                    routeArray.push(data)
                    time += data.time_from_last
                }
                if (data.location === destLocation) {
                    isInRange = false
                }
            })
            if (time < allTime) {
                allTime = time
                resultRouteArray = routeArray
            }
        })
        console.log('return', resultRouteArray)
        return resultRouteArray
        
        // var bus_no = await this.routeRepository.findOne({station:src_station}).then(result => result.number)
        
        // if (dest_ord<src_ord){
        //     return getRepository(RouteEntity).createQueryBuilder("route")
        //     .select(["route.station","route.number","route.time_from_last"])
        //     .where("route.number = :bus_no",{bus_no:bus_no})
        //     .andWhere("route.order <= :dest_ord OR route.order >= :src_ord",{dest_ord:dest_ord,src_ord:src_ord})
        //     .orderBy(`(CASE WHEN route.order <= ${dest_ord} THEN route.order+11 ELSE route.order END)`)
        //     .getMany()
        // }else{
        //     return this.routeRepository.find({
        //         select:['station','number','time_from_last'],
        //         where:{
        //             number: bus_no,
        //             order: Between(src_ord, dest_ord)
        //         }
        //     })
        // }
        
    }

    async searchRoute(RoutePayloadDto)
    : Promise<any> {
        const srcLocation = RoutePayloadDto.srcLocation
        const destLocation = RoutePayloadDto.destLocation
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