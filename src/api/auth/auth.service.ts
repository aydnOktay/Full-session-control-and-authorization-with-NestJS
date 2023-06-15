import { Injectable } from '@nestjs/common';
import { AuthSignInRequest, AuthSignUpRequest, ForgetPasswordRequests } from './dto/requests.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/models';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { ApiEc, ApiException } from 'src/exceptions';
import { MailerService } from '@nestjs-modules/mailer';
import { JwtService } from 'src/services/jwt/jwt.service';
import enviroments from 'src/tools/enviroments';
import { CredsService } from 'src/services/creds/creds.service';
import * as jwt from "jsonwebtoken";

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(User) private userModel: Repository<User>,
        private userService: UsersService,
        private mailerService: MailerService,
        private jwtService: JwtService,
        private credsService: CredsService
    ) { }

    async signup(dto: AuthSignUpRequest): Promise<any> {
        return await this.userService.createUserByEmail(dto);
    }

    async signin(dto: AuthSignInRequest): Promise<any> {
        return await this.userService.createSignIn(dto);
    }

    async forgetPasswordd(dto: ForgetPasswordRequests): Promise<any> {

        if (!await this.userService.getUserByEmail(dto.email)) {
            throw new ApiException(ApiEc.EmailWrong)
        }
        const findUser = await this.userModel.findOneBy({ email: dto.email });

        if (findUser.active == false) {
            throw new ApiException(ApiEc.NotAccept)
        }

        const tokenInformation = await this.jwtService.createJWT(findUser.email, findUser.id);
        const url = enviroments.webUrl + "auth/forget-password/" + findUser.id + "/" + tokenInformation;

        return await this.mailerService.sendMail({
            to: findUser.email,
            from: "VERİFY CODE",
            subject: "VERİFY CODE",
            text: url,
            html: ' <b> Hello , Your URL LINK  = </b> ' + url
        });

    }

    async forgetPasswordStep2(id: number, token: string): Promise<any> {
        const linkId = id;
        const linkToken = token;

        if (linkId && linkToken) {
            return { idd: await this.jwtService.verifyJwt(linkToken), tokenn: linkToken }; //in jwtToken

        } else {
            throw new ApiException(ApiEc.NotAccept)
        }
    }

    async forgetPasswordStep3(dto): Promise<any> {
        const userFind = await this.userModel.findOneBy({ id: dto.idm });
        if (userFind) {
            jwt.verify(dto.tokenm,enviroments.jwtSecret,async (e,decoded)=>{
                return await this.userModel.update({id:userFind.id},{password:await this.credsService.passwordHash(dto.password)});
            })
        } else {
            throw new ApiException(ApiEc.EmailWrong)
        }

    }
}
