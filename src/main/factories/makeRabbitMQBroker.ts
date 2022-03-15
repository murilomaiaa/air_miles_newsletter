import { CreateSubscriberConsumer } from '@/application/queue/consumers/CreateSubscriberConsumer';
import { RabbitMQBroker } from '@/infra/queue';
import { services } from './services';

export function makeRabbitMQBroker() {
  const consumer = new CreateSubscriberConsumer(services.createSubscriber);
  return new RabbitMQBroker(consumer);
}
