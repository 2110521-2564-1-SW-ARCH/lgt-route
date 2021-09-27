import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class LocationEntity {

    @PrimaryColumn()
    location_id: number;

    @Column({ length: 100, nullable: false, unique: true })
    location: string;

    @Column("int", { array: true })
    route_id: number[];
}