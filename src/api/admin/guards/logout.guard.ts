import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { StatusType } from 'src/common';
import { ApiEc, ApiException } from 'src/exceptions';

@Injectable()
export class logoutGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const requests = context.switchToHttp().getRequest();
        const response = context.switchToHttp().getResponse();
        if (requests.session.fullName) {
            requests.session.destroy((err)=>{
                response.clearCookie("connect.sid")
                response.redirect("/")
            });
        }
        throw new ApiException(ApiEc.NotAuthorization);
    }
}
