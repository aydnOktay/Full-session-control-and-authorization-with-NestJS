import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn,OneToMany } from "typeorm";
import { Model } from 'objection';
import { Workers } from "./Workers";

@Entity({ name: "userss" })
export class User extends Model {

    @PrimaryGeneratedColumn({ type: "bigint" })
    id: number;

    @Column()
    fullName: string;

    @Column({unique: true})
    email: string;

    @Column()
    password: string;

    @Column()
    status:string;

    @Column()
    active:boolean;

}