import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class RouteV2Entity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100, nullable: false })
    source: string;

    @Column({ length: 100, nullable: false })
    destination: string;

    @Column({ nullable: true })
    time_from_last: number;

    @Column({ length: 30, nullable: false })
    type: string
}