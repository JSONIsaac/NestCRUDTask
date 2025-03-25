import { CanActivate, ExecutionContext } from '@nestjs/common';
export declare class ThrottlerGuard implements CanActivate {
    private readonly ttl;
    private readonly limit;
    private storage;
    canActivate(context: ExecutionContext): Promise<boolean>;
}
