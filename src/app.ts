import express from 'express';
import bodyParser from 'body-parser';

import routes from './routes';
import { urlNotFound, routerErrorHandler } from './lib/errorHandler';

const app = express();

app.use(bodyParser.json());

app.use('/', routes);

app.use(urlNotFound);

app.use(routerErrorHandler);

export default app;