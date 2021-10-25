import { HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Route } from "./models/route.entity";
import { IRoute, IResponse } from "./interfaces/route.interface";
import { EntityNotFoundError } from "typeorm";

var _ = require('lodash');

@Injectable()
export class RouteService {
    constructor(
        @InjectRepository(Route)
        private routeRepository: Repository<Route>
    ){}

    async recursiveRoute(
        source: string,  
        time: number, 
        destination: string,
        depth: number,
        route: IRoute[])
        : Promise<{time: number, route: IRoute[]}> {
        if (source === destination) {
            return { time: time, route: route }
        } 
        // TODO: edit this -> if time for going the next stop less than the best time (best route), stop -> return null
        if (depth > 10) return { time: null, route: null }

        const findRoute = await this.routeRepository.find({ source: source })
        if (findRoute.length === 0) return { time: null, route: null }

        var bestRouteTime = Infinity
        var bestRoute: {time: number, route: IRoute[]} = {time: Infinity, route: []}
        for (const possibleRoute of findRoute) {
            var thisRoute = await this.recursiveRoute(
                possibleRoute.destination, 
                possibleRoute.time + time, 
                destination, 
                depth+1, 
                [...route, possibleRoute]
            )
            if (thisRoute.time && thisRoute.route) {
                if (thisRoute.time < bestRouteTime) {
                    bestRouteTime = thisRoute.time
                    bestRoute = thisRoute
                }
            } 
            else continue
        }
        return bestRoute
    }

    async searchRouteService(RoutePayloadDto)
    : Promise<{time: number, route: IRoute[]}> {
        const srcLocation = RoutePayloadDto.srcLocation
        const destLocation = RoutePayloadDto.destLocation
        const response = await this.recursiveRoute(srcLocation, 0, destLocation, 0, [])
            .then(res => {return res })
        return response
    }

    async createOrUpdateRouteService(RoutePayload: IRoute): Promise<IResponse> {
        // update: update time from source location to destination location
        try {
            const routeFound = await this.routeRepository.findOne({
                source: RoutePayload.source,
                destination: RoutePayload.destination,
                type: RoutePayload.type,
                additional_type: RoutePayload?.additional_type
            });
            if (routeFound) {
                await this.routeRepository.save({...RoutePayload, id: routeFound.id})
                return {
                    id: routeFound.id,
                    message: `Route id: ${routeFound.id} is updated successfully`,
                    code: HttpStatus.OK
                }
            } else {
                await this.routeRepository.save(RoutePayload)
                return {
                    message: `Route from ${RoutePayload.source} to ${RoutePayload.destination} is created successfully`,
                    code: HttpStatus.OK
                }
            }
            
        } catch (error) {
            console.log('error', error)
            return {
                message: 'Create or Update route is failed',
                code: HttpStatus.BAD_REQUEST
            }
        }
        
    }

    async deleteRouteService(routeId: number): Promise<IResponse> {
        const routeFound = await this.routeRepository.findOne({
            id: routeId
        });
        if (routeFound){
            this.routeRepository.remove(routeFound)
            return {
                message: `Route id: ${routeId} is deleted successfully`,
                code: HttpStatus.OK
            }
        }
        return {
            message: `Failed to delete route id: ${routeId}`,
            code: HttpStatus.BAD_REQUEST
        }
    }
}