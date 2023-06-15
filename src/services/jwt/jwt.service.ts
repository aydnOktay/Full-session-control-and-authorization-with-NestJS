import { Injectable } from '@nestjs/common';
import * as jwt from "jsonwebtoken";
import enviroments from 'src/tools/enviroments';

@Injectable()
export class JwtService {

    async createJWT(email:string,id:number):Promise<any>{
        return  await jwt.sign({email,id},enviroments.jwtSecret,{expiresIn:"5m"});
    }

    async verifyJwt(token):Promise<any>{
        return await jwt.verify(token,enviroments.jwtSecret);
    }
}
