import * as path from 'path';
import * as fs from 'fs';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  TypeOrmModule,
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';

import { DatabaseService } from './database/database.service';
import { UserModule } from './users/user.module';
import { EventModule } from './events/event.module';
// import { User } from './user/entities/user.entity';
// import { DatabaseModule } from './database/database.module';
// import { TypeOrmConfig } from 'database/config/typeorm.config';

function readEnvPath(destination: string): string {
  const env: string | undefined = process.env.NODE_ENV;
  const fallback: string = path.resolve(`${destination}/.env`);
  const fileName: string = env ? `${env}.env` : 'development.env';

  let file: string = path.resolve(`${destination}/${fileName}`);

  if (!fs.existsSync(file)) file = fallback;

  return file;
}

const envFilePath: string = readEnvPath(`${__dirname}/.env`);

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath,
      isGlobal: true,
      cache: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DATABASE_HOST'),
        port: configService.get<number>('DATABASE_PORT'),
        database: configService.get<string>('DATABASE_NAME'),
        username: configService.get<string>('DATABASE_USER'),
        password: configService.get<string>('DATABASE_PASSWORD'),
        entities: ['dist/**/entities/*.entity.{ts,js}'],
        migrations: ['dist/migrations/*.{ts,js}'],
        // logger: 'file',
        // logging: 'all',
        synchronize: true,
        dropSchema:
          configService.get<string>('NODE_ENV') === 'development' ||
          configService.get<string>('NODE_ENV') === 'test'
            ? true
            : false,
        entitySkipConstructor: false,
      }),
    }),
    UserModule,
    EventModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
