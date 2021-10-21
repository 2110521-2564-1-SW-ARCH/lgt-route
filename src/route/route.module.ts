import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RouteController } from "./route.controller";
import { RouteService } from "./route.service";
import { Route } from "./models/route.entity";


@Module({
    imports: [
        TypeOrmModule.forFeature([Route])
    ],
    providers: [RouteService],
    controllers: [RouteController]
})
export class RouteModule {}