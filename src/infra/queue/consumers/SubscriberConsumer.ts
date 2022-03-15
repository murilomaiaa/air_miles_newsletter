import { RabbitMQServer } from '../RabbitMQServer';

export type CardToPublish = {
  id: string;
  holderEmail: string;
  holderName: string;
  creditCardCompanyName: string;
};

export class SubscriberConsumer {
  public queueName: string;
  private server: RabbitMQServer;

  constructor(server: RabbitMQServer) {
    this.server = server;
    this.queueName = 'CreateCard';
  }

  create(): void {
    this.server.consumeQueue(this.queueName, async message => {
      console.log({ message });
    });
  }
}
