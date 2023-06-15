import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    UnauthorizedException,
} from '@nestjs/common';
import { ApiException } from 'src/exceptions';

@Catch(ApiException)
export class expenseFilter implements ExceptionFilter {

    catch(exception: any, host: ArgumentsHost) {
        const response = host.switchToHttp().getResponse();
        response.redirect("/admin");
    }

}