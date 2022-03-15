import { ICreateSubscriber } from '@/domain/features/CreateSubscriber';

type ConsumerInput = {
  id: string;
  holderEmail: string;
  holderName: string;
  creditCardCompanyName: string;
};

export class CreateSubscriberConsumer {
  public queueName: string;
  constructor(private readonly createSubscriber: ICreateSubscriber) {
    this.queueName = 'CreateCard';
  }

  async consume({ creditCardCompanyName, holderEmail, holderName, id }: ConsumerInput) {
    await this.createSubscriber.execute({
      idAtCore: id,
      email: holderEmail,
      name: holderName,
      tag: {
        name: creditCardCompanyName,
      },
    });
  }
}
