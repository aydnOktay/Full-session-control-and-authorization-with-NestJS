import { Controller, Session, Get, Post, Render, Body, UseFilters, UseGuards ,Param ,ParseIntPipe} from '@nestjs/common';
import { adminFilter } from 'src/guards/admin.filter.guards';
import { adminGuard } from 'src/guards/admin.guard';
import { AdminService } from './admin.service';
import { ExpenseRequest, WorkerRequest } from './dto/requests.dto';
import { workerGuard } from './guards/worker.guard';
import { workerFilter } from './guards/worker.filter';
import { logoutGuard } from './guards/logout.guard';
import { logoutFilter } from './guards/logout.filter';
import { expenseGuard } from './guards/expense.guard';
import { expenseFilter } from './guards/expense.filter';
import { expense2Guard } from './guards/expense2.guard';
import { expense2Filter } from './guards/expense2.filter';
import { UsersService } from '../users/users.service';

@Controller('admin')
@UseGuards(adminGuard)
@UseFilters(adminFilter)

export class AdminController {

    constructor(
        private adminService: AdminService,
        private userService:UsersService
    ) { }
    @Get("/")
    @Render("index")
    async getAdminPage(@Session() session: Record<string, any>) { return { session } }


    // WORKERS AREA START ********************************************************
    @Get("workers")
    @Render("workers")
    async getWorkersPage(@Session() session: Record<string, any>) { return { session, workers: await this.adminService.gettAllWorkers() } }

    @Get("addWorkers")
    @UseGuards(workerGuard)
    @UseFilters(workerFilter)
    @Render("addWorkers")
    async addWorkers(@Session() session: Record<string, any>){ return { session} }

    @Post("add-worker")
    @UseGuards(workerGuard)
    @UseFilters(workerFilter)
    async addWorker(@Body() dto:WorkerRequest):Promise<any>{
        return await this.adminService.addWorker(dto);
    }
    // WORKERS AREA END-------------------------------------------------------------


    // PROFİLE AREA START *************************************************************
    @Get("profile")
    @Render("profile")
    async getProfilePage(@Session() session: Record<string, any>) { return { session } }
    // PROFİLE AREA END-------------------------------------------------------------


    // EXPENSE AREA START **************************************************************
    @Get("expense")
    @UseGuards(expenseGuard)
    @UseFilters(expenseFilter)
    @Render("expense")
    async getExpensePage(@Session() session: Record<string, any>) { return { table: await this.adminService.gettAllExpense() ,session} }

    @Get("addExpense")
    @UseGuards(workerGuard)
    @UseFilters(workerFilter)
    @Render("addExpense")
    async getAddExpensePage(@Session() session: Record<string, any>):Promise<any>{return{session}} 

    @Post("add-expense")
    @UseGuards(workerGuard)
    @UseFilters(workerFilter)
    async addExpense(@Body() dto:ExpenseRequest):Promise<any>{
        return await this.adminService.addExpense(dto);
    }

    // EXPENSE AREA END------------------------------------------------------------------


    // EXECUTİVE AREA START *************************************************************

    @Get("executive")
    @Render("executive")
    @UseGuards(workerGuard)
    @UseFilters(workerFilter)
    async getExecutive(@Session() session: Record<string, any>){return{session , table2:await this.userService.getAllUsers()}} 

    // EXECUTİVE AREA END-----------------------------------------------------------------

    // LOGOUT
    @Get("logout")
    @UseGuards(logoutGuard)
    @UseFilters(logoutFilter)
    async logout(){}

    // USER ACCEPT
    @Get("requests")
    @Render("requests")
    @UseGuards(workerGuard)
    @UseFilters(workerFilter)
    async requests(@Session() session: Record<string, any>):Promise<any>{return{session , table3:await this.userService.getAllUsers()}}

    @Get("update-requests/:id")
    @UseGuards(workerGuard)
    @UseFilters(workerFilter)
    async updateRequest(@Param("id",ParseIntPipe) id:number){
        return await this.adminService.updateRequests(id);
    }


}
