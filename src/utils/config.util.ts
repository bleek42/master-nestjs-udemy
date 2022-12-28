// import { Injectable, Inject } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
// import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

// @Injectable()
// export class ConfigUtil implements TypeOrmOptionsFactory {
//   constructor(@Inject(ConfigService) private readonly configService: ConfigService) {}

//   private readonly nodeEnv = this.configService.get<string>('NODE_ENV');
//   private readonly checkNodeEnv: boolean =
//     this.nodeEnv === 'development' || this.nodeEnv === 'test' ? true : false;

//   public async createTypeOrmOptions(connectionName?: string): Promise<TypeOrmModuleOptions> {
//     return {
//       type: 'postgres',
//       host: this.configService.get<string>('DATABASE_HOST'),
//       port: this.configService.get<number>('DATABASE_PORT'),
//       database: this.configService.get<string>('DATABASE_NAME'),
//       username: this.configService.get<string>('DATABASE_USER'),
//       password: this.configService.get<string>('DATABASE_PASSWORD'),
//       entities: ['dist/**/entities/*.entity.{ts,js}'],
//       migrations: ['dist/migrations/*.{ts,js}'],
//       logger: 'file',
//       logging: 'all',
//       synchronize: true,
//       dropSchema: this.checkNodeEnv,
//       installExtensions: true,
//       entitySkipConstructor: false,
//     };
//   }
// }
