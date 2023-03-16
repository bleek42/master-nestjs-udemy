// import { Injectable, Inject } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
// import {
//   TypeOrmOptionsFactory,
//   TypeOrmModuleOptions,
//   TypeOrmModuleAsyncOptions,
// } from '@nestjs/typeorm';

// export class TypeOrmConfig implements TypeOrmOptionsFactory {
//   constructor(private readonly configService: ConfigService) {}
//   public static async createTypeOrmOptions(
//     connectionName?: string
//   ): Promise<TypeOrmModuleOptions | TypeOrmModuleAsyncOptions> {
//     const opts = {
//       type: 'mysql',
//       host: this.configService.get<string>('DATABASE_HOST'),
//       port: this.configService.get<number>('DATABASE_PORT'),
//       database: this.configService.get<string>('DATABASE_NAME'),
//       username: this.configService.get<string>('DATABASE_USER'),
//       password: this.configService.get<string>('DATABASE_PASSWORD'),
//       entities: ['dist/**/entities/*.entity.{ts,js}'],
//       migrations: ['dist/migrations/*.{ts,js}'],
//       // logger: 'file',
//       // logging: 'all',
//       synchronize: true,
//       dropSchema:
//         this.configService.get<string>('NODE_ENV') === 'development' ||
//         this.configService.get<string>('NODE_ENV') === 'test'
//           ? true
//           : false,
//       entitySkipConstructor: false,
//     };

//     return opts;
//   }
// }
