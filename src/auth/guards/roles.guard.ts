import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!requiredRoles) {
      return true; // No hay roles requeridos, acceso permitido
    }
    
    const { user } = context.switchToHttp().getRequest();
    if (!user) {
      return false; // Si no hay usuario, denegar acceso
    }
    
    return requiredRoles.includes(user.role);
  }
}