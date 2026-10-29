import { ConfigService } from '@nestjs/config';
import { createApp } from './bootstrap.js';

async function bootstrap() {
  const app = await createApp();

  const config = app.get(ConfigService);
  const port = Number(config.get<string>('PORT') ?? 3001);

  await app.listen(port);

  console.log(`API Nest escuchando en http://localhost:${port}/api`);
  console.log(`Health: http://localhost:${port}/api/health`);
  console.log(`Perfil: http://localhost:${port}/api/profile`);
}

await bootstrap();
