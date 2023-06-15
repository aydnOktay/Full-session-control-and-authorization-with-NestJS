import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/models';
import { AuthSignInRequest, AuthSignUpRequest } from './dto/requests.dto';
import { ApiEc, ApiException } from 'src/exceptions';
import { StatusType } from 'src/common';
import { CredsService } from 'src/services/creds/creds.service';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private userModel:Repository<User>,
        private credsService:CredsService
    ){}

    async getAllUsers():Promise<any>{
        return await this.userModel.find();
    }
    
    async getUserByEmail(email:string){
        return await this.userModel.findOneBy({email});
    }

    async createUserByEmail(dto:AuthSignUpRequest){

        if (await this.getUserByEmail(dto.email)) {
            throw new ApiException(ApiEc.EmailAlreadyRegistered)
        }
        if (!(dto.password == dto.rpassword)) {
            throw new ApiException(ApiEc.PasswordNotMatch);
        }

        const newUser = await this.userModel.create({
            fullName:dto.fullName,
            email:dto.email,
            password:await this.credsService.passwordHash(dto.password),
            status:StatusType.Personal,
            active:false
        });

        return await this.userModel.save(newUser);
    }

    async createSignIn(dto:AuthSignInRequest):Promise<any>{

        if (!await this.getUserByEmail(dto.email)) {
            throw new ApiException(ApiEc.UserNotFoundByEmail)
        }

        const findUser = await this.userModel.findOneBy({email:dto.email});

        if (! await this.credsService.passwordMatch(dto.password,findUser.password)) {
            throw new ApiException(ApiEc.PasswordNotMatch)
        }

        if (findUser.active == false) {
            throw new ApiException(ApiEc.NotAccept);
        }

        return findUser;

    }

}
