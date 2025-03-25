import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { ThrottlerException } from '@nestjs/throttler';

@Injectable()
export class ThrottlerGuard implements CanActivate {
  private readonly ttl = 60; // Tiempo en segundos
  private readonly limit = 10; // Número máximo de solicitudes
  private storage = new Map<string, { count: number; timer: NodeJS.Timeout }>();

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const ip = req.ip;
    
    // Crear entrada si no existe
    if (!this.storage.has(ip)) {
      this.storage.set(ip, { count: 0, timer: setTimeout(() => this.storage.delete(ip), this.ttl * 1000) });
    }
    
    const currentStorage = this.storage.get(ip)!;
    currentStorage.count++;

    if (currentStorage.count > this.limit) {
      throw new ThrottlerException(`Solo puede realizar ${this.limit} solicitudes por minuto`);
    }
    
    return true;
  }
}