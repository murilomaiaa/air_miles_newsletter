import 'reflect-metadata';
import 'dotenv/config';

import { TypeormHelper } from '@/infra/typeorm';
import env from '../config/env';

TypeormHelper.getInstance()
  .connect()
  .then(async () => {
    const { app } = await import('./app');
    app.listen(env.apiPort, () => {
      // eslint-disable-next-line no-console
      console.log(`Listening on port ${env.apiPort}`);
    });

    const { makeRabbitMQBroker } = await import('../factories/makeRabbitMQBroker');
    const broker = makeRabbitMQBroker();
    await broker.start();
  })
  .catch(console.log);
