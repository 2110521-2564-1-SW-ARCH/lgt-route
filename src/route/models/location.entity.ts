import { Column, Entity, PrimaryColumn} from "typeorm";

@Entity()
export class LocationEntity {
    @PrimaryColumn()
    location: string;
    @Column()
    station: string;
}