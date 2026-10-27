import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.enableCors();

  const config = app.get(ConfigService);
  const port = Number(config.get<string>('PORT') ?? 3001);

  await app.listen(port);

  console.log(`API Nest escuchando en http://localhost:${port}/api`);
  console.log(`Health: http://localhost:${port}/api/health`);
  console.log(`Perfil: http://localhost:${port}/api/profile`);
}

await bootstrap();
