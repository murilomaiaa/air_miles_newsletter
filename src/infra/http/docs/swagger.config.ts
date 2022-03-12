import env from '@/main/config/env';
import { subscribersRoute } from './routes/subscriber.doc';

export default {
  openapi: '3.0.0',
  info: {
    title: 'Subscribers management',
    description: "Subscribers management's endpoints",
    version: '1.0.0',
  },
  servers: [
    {
      url: `http://localhost:${env.apiPort}`,
      description: 'Server running local',
    },
  ],
  // apis: ['./src/infra/http/docs/**/**.doc.ts'],
  paths: {
    ...subscribersRoute,
  },
};
