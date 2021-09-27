import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { LocationEntity } from "./models/location.entity";
import { RouteEntity } from "./models/route.entity";
import { RouteController } from "./route.controller";
import { RouteService } from "./route.service";
import { RouteV2Entity } from "./models/routev2.entity";


@Module({
    imports: [
        TypeOrmModule.forFeature([RouteEntity]),
        TypeOrmModule.forFeature([LocationEntity]),
        TypeOrmModule.forFeature([RouteV2Entity])
    ],
    providers: [RouteService],
    controllers: [RouteController]
})
export class RouteModule {}