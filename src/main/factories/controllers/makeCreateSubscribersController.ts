import { CreateSubscribersController } from '@/application/controllers/CreateSubscribersController';
import { services } from '../services';

export function makeCreateSubscribersController() {
  const service = services.createSubscriber;
  return new CreateSubscribersController(service);
}
