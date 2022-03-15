import { CreateSubscriberConsumer } from '@/application/queue/consumers/CreateSubscriberConsumer';
import { RabbitMQServer } from './RabbitMQServer';

export class RabbitMQBroker {
  private readonly server: RabbitMQServer;

  constructor(private readonly createSubscriber: CreateSubscriberConsumer) {
    this.server = RabbitMQServer.getInstance();
  }

  async start() {
    await this.server.start();

    await this.server.assertQueue('CreateCard');
    await this.server.consumeQueue(
      'CreateCard',
      Object.bind(async (data: any) => {
        await this.createSubscriber.consume(data);
      }),
    );
  }
}
