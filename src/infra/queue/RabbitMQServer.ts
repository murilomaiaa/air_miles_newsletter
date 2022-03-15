import env from '@/main/config/env';
import { Channel, connect, Connection } from 'amqplib';

type ConsumerCallback = (data: any) => Promise<void>;

export class RabbitMQServer {
  private static instance: RabbitMQServer;
  private connection!: Connection;
  private channel!: Channel;

  private constructor(private uri: string) {}

  public static getInstance(): RabbitMQServer {
    if (!this.instance) {
      const { host, password, port, username } = env.queue;
      this.instance = new RabbitMQServer(`amqp://${username}:${password}@${host}:${port}`);
    }

    return this.instance;
  }

  async start(): Promise<void> {
    this.connection = await connect(this.uri);
    this.channel = await this.connection.createChannel();
  }

  consumeQueue(queue: string, callback: ConsumerCallback) {
    return this.channel.consume(queue, async message => {
      console.log('Consuming ', JSON.parse(message?.content.toString() ?? '{}'));
      if (message) {
        const data = JSON.parse(message.content.toString());
        await callback(data);
        this.channel.ack(message);
      }
    });
  }

  assertQueue(queue: string) {
    return this.channel.assertQueue(queue);
  }
}
