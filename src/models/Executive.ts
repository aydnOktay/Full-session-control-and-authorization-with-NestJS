import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Model } from 'objection';

@Entity({ name: "executive" })
export class Executive extends Model {

    @PrimaryGeneratedColumn({ type: "bigint" })
    id: number;

    @Column()
    fullName: string;

    @Column()
    email:string

    @Column()
    status: string;

    
}