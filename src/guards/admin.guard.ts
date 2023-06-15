import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { ApiEc, ApiException } from 'src/exceptions';

@Injectable()
export class adminGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const requests = context.switchToHttp().getRequest();
        if (requests.session.fullName) {
            return true
        }
        throw new ApiException(ApiEc.InternalServerError);
    }
}
