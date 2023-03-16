import * as path from 'path';
import * as fs from 'fs';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
// import { DatabaseService } from './database.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseProviders } from './database.providers';

// import { TypeOrmConfig } from './config/typeorm.config';

//   function readEnvPath(destination: string): string {
//     const env: string | undefined = process.env.NODE_ENV;
//     const fallback: string = path.resolve(`${destination}/.env`);
//     const fileName: string = env ? `${env}.env` : 'development.env';

//     let file: string = path.resolve(`${destination}/${fileName}`);

//     if (!fs.existsSync(file)) file = fallback;

//     return file;
//   }
// );

// const envFilePath: string = readEnvPath(`${__dirname}/.env`);

@Module({
  imports: [],
  providers: [...databaseProviders],
  controllers: [],
  exports: [...databaseProviders],
})
export class DatabaseModule {}
