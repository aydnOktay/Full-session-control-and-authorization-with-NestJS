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
export class workerGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const requests = context.switchToHttp().getRequest();
        if (requests.session.status === StatusType.Ceo) {
            return true
        }
        throw new ApiException(ApiEc.NotAuthorization);
    }
}
