import { RabbitMQBroker } from '@/infra/queue';
import { services } from './services';

export function makeRabbitMQBroker() {
  return new RabbitMQBroker(services.createSubscriber);
}
