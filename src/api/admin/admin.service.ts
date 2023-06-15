import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Executive, Expense, User, Workers } from 'src/models';
import { Repository } from 'typeorm';
import { ExpenseRequest, WorkerRequest } from './dto/requests.dto';

@Injectable()
export class AdminService {
    constructor(
        @InjectRepository(Expense) private expenseModel:Repository<Expense>,
        @InjectRepository(Workers) private workersModel:Repository<Workers>,
        @InjectRepository(Executive) private executiveModel:Repository<Executive>,
        @InjectRepository(User) private userModel:Repository<User>

    ){}

    async gettAllExpense():Promise<any>{
        return await this.expenseModel.find();
    }

    async getAllExecutive():Promise<any>{
        return await this.executiveModel.find();
    }
    
    async gettAllWorkers():Promise<any>{
        return await this.workersModel.find();
    }

    async addWorker(dto:WorkerRequest):Promise<any>{
        const newWorker =  await this.workersModel.create({
            fullName:dto.fullName,
            status:dto.status,
            price:dto.price
        });

        return await this.workersModel.save(newWorker);
    }

    async addExpense(dto:ExpenseRequest):Promise<any>{
        const newExpense = await this.expenseModel.create({
            namee:dto.namee,
            income:dto.income,
            expense:dto.expense,
            profit:dto.profit
        });

        return await this.expenseModel.save(newExpense);
    }

    async updateRequests(id:number):Promise<any>{
        return await this.userModel.update({id},{active:true});
    }
}
