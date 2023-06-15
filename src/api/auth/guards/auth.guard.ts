import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { ApiEc, ApiException } from 'src/exceptions';

@Injectable()
export class authGuard implements CanActivate {
    canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest();
        if (request.session.fullName) {
            throw new ApiException(ApiEc.NotAuthorization);
        }
        return true;
    }
}

