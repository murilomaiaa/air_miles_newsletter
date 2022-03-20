import env from '@/main/config/env';
import { massiveMailRoute, subscribersRoute } from './routes';

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
  paths: {
    ...subscribersRoute,
    ...massiveMailRoute,
  },
};
