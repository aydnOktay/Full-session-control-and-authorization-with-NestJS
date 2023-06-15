import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn ,ManyToOne} from "typeorm";
import { Model } from 'objection';
import { User } from "./User";

@Entity({ name: "workers" })
export class Workers extends Model {

    @PrimaryGeneratedColumn({ type: "bigint" })
    id: number;

    @Column()
    fullName: string;

    @Column()
    status: string;

    @Column()
    price: string;

    
}