import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Model } from 'objection';

@Entity({ name: "expensee" })
export class Expense extends Model {

    @PrimaryGeneratedColumn({ type: "bigint" })
    id: number;

    @Column()
    namee: string;

    @Column()
    income: number;

    @Column()
    expense: number;

    @Column()
    profit: number;
    
}