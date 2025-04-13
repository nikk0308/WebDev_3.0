import { Catch, RpcExceptionFilter, ArgumentsHost } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Observable, throwError } from 'rxjs';

@Catch(RpcException)
export class GlobalRpcExceptionFilter implements RpcExceptionFilter<RpcException> {
  catch(exception: RpcException, host: ArgumentsHost): Observable<any> {
    const error = exception.getError();
    let status = 500;
    let message = 'Internal server error';

    if (typeof error === 'object' && error !== null) {
      status = error['statusCode'] || 500;
      message = error['message'] || 'Internal server error';
    } else {
      message = error as string;
    }

    return throwError(() => ({
      statusCode: status,
      timestamp: new Date().toISOString(),
      message: message,
    }));
  }
}