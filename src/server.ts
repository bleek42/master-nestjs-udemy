import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestExpressApplication } from '@nestjs/platform-express';

import { AppModule } from './app.module';

async function main() {
  const app: NestExpressApplication = await NestFactory.create(AppModule);
  const configService: ConfigService = app.get(ConfigService);
  const port: number = configService.get<number>('PORT') || 4000;

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.setGlobalPrefix('/api');
  await app.listen(port, () =>
    console.info(
      `Nest.js REST API server live, running...\n Listening at 'http://localhost:${port}' for requests/changes`,
    ),
  );
}

main();
