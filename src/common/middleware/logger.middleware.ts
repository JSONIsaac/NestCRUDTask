import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log(`Request... Method: ${req.method} | URL: ${req.url} | IP: ${req.ip}`);
    
    // Capturar también el momento en que se completa la respuesta
    const start = Date.now();
    res.on('finish', () => {
      const duration = Date.now() - start;
      console.log(`Response... Status: ${res.statusCode} | Duration: ${duration}ms`);
    });
    
    next();
  }
}
