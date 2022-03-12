import express from 'express';
import 'express-async-errors';
import helmet from 'helmet';
import swaggerUi from 'swagger-ui-express';
import cors from 'cors';

import routes from '@/infra/http/routes';
import swaggerFile from '@/infra/http/docs/swagger.config';
import { errorHandler } from '@/infra/http/middlewares';

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(routes);
app.use(errorHandler);

const env = process.env.NODE_ENV ?? '';

if (['dev', 'development'].includes(env)) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
}

export { app };
