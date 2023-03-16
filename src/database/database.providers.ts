import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleAsyncOptions, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSource, DataSourceOptions } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'MYSQL_DATASOURCE',
    useFactory: async (configService?: ConfigService): Promise<TypeOrmModuleAsyncOptions> => {
      const src = new DataSource({
        type: 'mysql',
        host: configService.get<string>('DATABASE_HOST') || '127.0.0.1',
        port: configService.get<number>('DATABASE_PORT') || 3306,
        database: configService.get<string>('DATABASE_NAME') || 'events_db',
        username: configService.get<string>('DATABASE_USER'),
        password: configService.get<string>('DATABASE_PASSWORD'),
        entities: ['dist/**/entities/*.entity.{ts,js}'],
        migrations: ['dist/migrations/*.{ts,js}'],
        synchronize: true,
        dropSchema:
          configService.get<string>('NODE_ENV') === 'development' ||
          configService.get<string>('NODE_ENV') === 'test'
            ? true
            : false,
        entitySkipConstructor: false,
      });

      return await src.initialize();
    },
  },
];
