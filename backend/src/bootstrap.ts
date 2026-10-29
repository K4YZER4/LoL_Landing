import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';

export async function createApp() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  // Vercel entrega la IP real en X-Forwarded-For; sin esto todos los
  // visitantes comparten el mismo bucket del rate limit.
  app.getHttpAdapter().getInstance().set('trust proxy', 1);

  const config = app.get(ConfigService);
  const configuredOrigins = config.get<string>('FRONTEND_ORIGIN');
  const origins = configuredOrigins
    ?.split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);

  app.enableCors({
    origin: origins && origins.length > 0 ? origins : false,
  });

  return app;
}
