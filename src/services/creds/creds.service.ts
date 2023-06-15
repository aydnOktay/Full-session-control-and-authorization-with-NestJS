import { Injectable } from '@nestjs/common';
import * as bcrypt from "bcrypt";
import enviroments from 'src/tools/enviroments';

@Injectable()
export class CredsService {

    async passwordHash(password:string):Promise<any>{
        return await bcrypt.hash(enviroments.hashText+password,enviroments.saltRound);
    }

    async passwordMatch(password:string,hashed:string):Promise<boolean>{
         return await bcrypt.compare(enviroments.hashText+password,hashed);
    }

}
