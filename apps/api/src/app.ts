import cors, { CorsOptions } from 'cors';
import express, { json, urlencoded } from 'express';

import { Config } from './config';
import { routes } from './routes';

export const app = express();

app.disable('x-powered-by');

// Enable CORS
const corsOptions: CorsOptions = {
  origin: Config.hostname,
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

// Parsing JSON and URL-encoded bodies
app.use(json());
app.use(urlencoded({ extended: true }));

app.use('/', routes);
