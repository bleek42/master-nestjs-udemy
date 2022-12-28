import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { envFileUtil } from './utils/env.util';
// import { ConfigUtil } from './utils/config.util';

import { UserModule } from './user/user.module';
import { EventModule } from './event/event.module';
// import { User } from './user/entities/user.entity';

const envFilePath: string = envFileUtil(`${__dirname}/env`);
const nodeEnv = process.env.NODE_ENV;
const checkNodeEnv: boolean = nodeEnv === 'development' || nodeEnv === 'test' ? true : false;

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
        type: 'postgres',
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
        dropSchema: checkNodeEnv,
        installExtensions: true,
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
