import { Controller,Render,UseFilters,Get,Post,Body,Session ,UseGuards,Param} from '@nestjs/common';
import { AuthSignInRequest, AuthSignUpRequest, ForgetPasswordRequests } from './dto/requests.dto';
import { AuthService } from './auth.service';
import { authGuard } from './guards/auth.guard';
import { authFilter } from './guards/auth.filter';

@Controller('auth')
@UseGuards(authGuard)
@UseFilters(authFilter)
export class AuthController {

    constructor(private authService:AuthService){}

    @Get("sign-up")
    @Render("register")
    async singnup(){}

    @Post("sign-up")
    async signup(@Body() dto:AuthSignUpRequest):Promise<any>{
        return await this.authService.signup(dto);
    }

    @Get("sign-in")
    @Render("login")
    async signinn(){}

    @Post("sign-in")
    @Render("index")
    async signin(
        @Body() dto:AuthSignInRequest,
        @Session() session:Record<string,any>){
        const information = await this.authService.signin(dto);
        session.fullName=information.fullName,
        session.email=information.email,
        session.status=information.status,
        session.active=information.active
        return {session};

    }

    // RESET PASSWORD

    @Get("forget-password")
    @Render("forgetPassword")
    async getForgetPasswordPage():Promise<any>{}

    @Post("forget-passwordd")
    async forgetPassword(@Body() dto:ForgetPasswordRequests):Promise<any>{
        return await this.authService.forgetPasswordd(dto);
    }

    @Get("forget-password/:id/:token")
    @Render("newPassword")
    async getResetPassword(@Param("id") id:number , @Param("token") token:string):Promise<any>{
        const tokenInfo = await this.authService.forgetPasswordStep2(id,token);
        return {idm:tokenInfo.idd.id,tokenm:token}
    }

    @Post("reset-passwordd")
    async getResetPasswordStep2(@Body() dto):Promise<any>{
        await this.authService.forgetPasswordStep3(dto);
    }


    // RESET PASSWORD END
}
