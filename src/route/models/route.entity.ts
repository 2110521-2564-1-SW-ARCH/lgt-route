import { Column, Entity, PrimaryColumn} from "typeorm";

@Entity()
export class RouteEntity {
    @PrimaryColumn()
    station: string;
    @Column()
    number: number;
    @Column()
    order: number;
    @Column()
    time_from_last: number;
}