import * as path from 'path';
import * as fs from 'fs';
function readEnvPath(destination: string): string {
  const env: string | undefined = process.env.NODE_ENV;
  const fallback: string = path.resolve(`${destination}/.env`);
  const fileName: string = env ? `${env}.env` : 'development.env';

  let file: string = path.resolve(`${destination}/${fileName}`);

  if (!fs.existsSync(file)) file = fallback;

  return file;
}

export const envFilePath: string = readEnvPath(`${__dirname}/.env`);
