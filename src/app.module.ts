import * as path from 'path';
import * as fs from 'fs';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { TypeOrmService } from './database/typeorm.service';
import { UserModule } from './users/user.module';
import { EventModule } from './events/event.module';
// import { User } from './user/entities/user.entity';

function readEnv(destination: string): string {
  const env: string | undefined = process.env.NODE_ENV;
  const fallback: string = path.resolve(`${destination}/.env`);
  const fileName: string = env ? `${env}.env` : 'development.env';

  let file: string = path.resolve(`${destination}/${fileName}`);

  if (!fs.existsSync(file)) file = fallback;

  return file;
}

const envFilePath: string = readEnv(`${__dirname}/.env`);

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath,
      cache: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: TypeOrmService,
      inject: [ConfigService],
    }),
    UserModule,
    EventModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
