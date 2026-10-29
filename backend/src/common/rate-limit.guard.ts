import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import type { Request } from 'express';

interface RouteLimit {
  max: number;
  windowMs: number;
}

interface Bucket {
  startedAt: number;
  count: number;
}

const ROUTE_LIMITS: Array<{ path: string; limit: RouteLimit }> = [
  { path: '/matches', limit: { max: 2, windowMs: 30_000 } },
  { path: '/profile', limit: { max: 2, windowMs: 20_000 } },
  { path: '/account/me', limit: { max: 2, windowMs: 20_000 } },
];

const DEFAULT_LIMIT: RouteLimit = { max: 4, windowMs: 10_000 };

@Injectable()
export class RateLimitGuard implements CanActivate {
  private readonly buckets = new Map<string, Bucket>();

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const routePath = request.route?.path?.toString() ?? request.path;

    if (routePath === '/health') {
      return true;
    }

    const routeLimit =
      ROUTE_LIMITS.find((entry) => routePath.endsWith(entry.path))?.limit ??
      DEFAULT_LIMIT;
    const clientKey = `${request.ip ?? request.socket.remoteAddress ?? 'unknown'}:${request.method}:${routePath}`;
    const now = Date.now();
    const current = this.buckets.get(clientKey);
    const bucket =
      !current || now - current.startedAt >= routeLimit.windowMs
        ? { startedAt: now, count: 0 }
        : current;

    bucket.count += 1;
    this.buckets.set(clientKey, bucket);

    if (this.buckets.size > 1000) {
      for (const [key, entry] of this.buckets) {
        if (now - entry.startedAt >= DEFAULT_LIMIT.windowMs) {
          this.buckets.delete(key);
        }
      }
    }

    if (bucket.count > routeLimit.max) {
      const retryAfter = Math.max(
        1,
        Math.ceil((routeLimit.windowMs - (now - bucket.startedAt)) / 1000),
      );
      context.switchToHttp().getResponse().setHeader('Retry-After', retryAfter);
      throw new HttpException(
        'Demasiadas solicitudes para esta ruta. Intenta de nuevo más tarde.',
        HttpStatus.TOO_MANY_REQUESTS,
      );
    }

    return true;
  }
}
