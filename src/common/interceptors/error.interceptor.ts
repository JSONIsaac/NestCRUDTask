import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
    HttpException,
    HttpStatus,
  } from '@nestjs/common';
  import { Observable, throwError } from 'rxjs';
  import { catchError } from 'rxjs/operators';
  
  @Injectable()
  export class ErrorsInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
      return next
        .handle()
        .pipe(
          catchError(err => {
            if (err instanceof HttpException) {
              return throwError(() => err);
            }
            
            // Log del error para debugging
            console.error('Error no controlado:', err);
            
            // Devolver un error genérico al cliente
            return throwError(
              () => new HttpException(
                'Ocurrió un error inesperado en el servidor',
                HttpStatus.INTERNAL_SERVER_ERROR,
              ),
            );
          }),
        );
    }
  }