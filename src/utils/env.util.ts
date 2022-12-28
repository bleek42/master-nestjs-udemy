import * as path from 'path/posix';
import * as fs from 'fs';

export function envFileUtil(destination: string): string {
  const env: string | undefined = process.env.NODE_ENV;
  const fallback: string = path.resolve(`${destination}/.env`);
  const fileName: string = env ? `${env}.env` : 'development.env';

  let filePath: string = path.resolve(`${destination}/${fileName}`);

  if (!fs.existsSync(filePath)) filePath = fallback;

  return filePath;
}
