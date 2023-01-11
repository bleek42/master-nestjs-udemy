import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { readEnv } from './utils/env.util';
import { ConfigUtil } from './utils/config.util';

import { UserModule } from './users/user.module';
import { EventModule } from './events/event.module';
// import { User } from './user/entities/user.entity';

const envFilePath: string = readEnv(`${__dirname}/.env`);

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath,
      isGlobal: true,
      cache: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DATABASE_HOST'),
        port: configService.get<number>('DATABASE_PORT'),
        database: configService.get<string>('DATABASE_NAME'),
        username: configService.get<string>('DATABASE_USER'),
        password: configService.get<string>('DATABASE_PASSWORD'),
        entities: [`dist/**/entities/*.entity.{ts,js}`],
        migrations: ['dist/migrations/*.{ts,js}'],
        logger: 'file',
        logging: 'all',
        synchronize: true,
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
