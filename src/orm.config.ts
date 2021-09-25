import {TypeOrmModuleOptions} from '@nestjs/typeorm'
export const config: TypeOrmModuleOptions = {
  type: 'postgres',
  username: 'doadmin',
  password: '7AZe0Ot4DswqWL8x',
  port: 25060,
  host: 'db-lgt-route-do-user-9896573-0.b.db.ondigitalocean.com',
  database: 'defaultdb',
  entities: ['dist/**/*.entity{.ts,.js}'],
  synchronize: true,
  extra: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
};