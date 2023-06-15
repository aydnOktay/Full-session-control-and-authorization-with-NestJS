import { IsString, IsNotEmpty, IsOptional, IsEmail } from 'class-validator';

export class WorkerRequest {
    
    @IsString()
    fullName: string;

    @IsString()
    @IsNotEmpty()
    status: string;

    @IsString()
    @IsNotEmpty()
    price: string;

}

export class ExpenseRequest {

    @IsString()
    namee:string;

    @IsString()
    income: number;

    @IsString()
    @IsNotEmpty()
    expense: number;

    @IsString()
    @IsNotEmpty()
    profit: number;

}

