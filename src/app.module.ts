import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from './orm.config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RouteModule } from './route/route.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(config),
    RouteModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
