import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    UnauthorizedException,
} from '@nestjs/common';
import { ApiException } from 'src/exceptions';

@Catch(ApiException)
export class adminFilter implements ExceptionFilter {

    catch(exception: any, host: ArgumentsHost) {
        const response = host.switchToHttp().getResponse();
        response.redirect("/auth/sign-in");
    }

}