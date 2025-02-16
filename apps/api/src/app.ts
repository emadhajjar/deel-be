import express, { json } from 'express';

import { sequelize } from './model';
import { routes } from './routes';

export const app = express();

app.disable('x-powered-by');

app.use(json());
app.use('/', routes);

app.set('sequelize', sequelize);
app.set('models', sequelize.models);
