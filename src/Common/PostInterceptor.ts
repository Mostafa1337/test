import {
    CallHandler,
    ExecutionContext,
    HttpStatus,
    Injectable,
    NestInterceptor,
  } from '@nestjs/common';
  import { Observable, tap } from 'rxjs';
import { ResponseType } from './ResponseType';
  
  @Injectable()
  export class PostInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
      const request = context.switchToHttp().getRequest<Request>();
      const response = context.switchToHttp().getResponse<Response>();
  
      return next.handle().pipe(
        tap((data) => {
          if(data instanceof ResponseType)
          {
            context.switchToHttp().getResponse().status(data.StatusCode);
          }
        })
      );
    }
  }