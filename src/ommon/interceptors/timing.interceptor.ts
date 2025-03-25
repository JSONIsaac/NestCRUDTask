import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class TimingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const method = request.method;
    const url = request.url;
    
    console.log(`Executing ${method} ${url}`);
    
    const now = Date.now();
    return next
      .handle()
      .pipe(
        tap(() => {
          const elapsed = Date.now() - now;
          console.log(`${method} ${url} took ${elapsed}ms`);
        }),
      );
  }
}
