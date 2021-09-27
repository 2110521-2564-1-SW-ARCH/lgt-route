import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class RouteEntity {

    @PrimaryColumn()
    route_id: number;

    @PrimaryColumn()
    location_id: number;

    @Column({ length: 100, nullable: false })
    location: string;

    @Column({ nullable: false})
    order: number;

    @Column({ nullable: true })
    time_from_last: number;

    @Column({ length: 30, nullable: false })
    type: string
}