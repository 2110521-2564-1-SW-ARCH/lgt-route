import { 
    Column, 
    Entity, 
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn
} from "typeorm";

@Entity()
export class Route {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100, nullable: false })
    source: string;

    @Column({ length: 100, nullable: false })
    destination: string;

    @Column({ nullable: true })
    time: number;

    @Column({ length: 30, nullable: false })
    type: string

    @Column({ length: 30, nullable: true })
    additional_type?: string | null

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}