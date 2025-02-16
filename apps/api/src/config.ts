import { config } from 'dotenv';
import { URL } from 'node:url';

const environmentFilePath = `../../config/${process.env.NODE_ENV ?? 'dev'}.env`;
config({ path: environmentFilePath });

const url = new URL(process.env.API_URL ?? '');

export const Config = {
  port: url.port,
};
