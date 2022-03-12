import { HttpRequest, HttpResponse } from '@/application/http';
import { ICreateSubscriber, CreateSubscriberDTO } from '@/domain/features/CreateSubscriber';
import { IController } from './IController';

type Response = {
  id: string;
};

export class CreateSubscribersController implements IController {
  public path: string;
  constructor(private readonly createSubscriber: ICreateSubscriber) {
    this.path = '/subscribers';
  }

  async handle(request: HttpRequest<CreateSubscriberDTO.Input>): Promise<HttpResponse<Response>> {
    const subscriber = await this.createSubscriber.execute(request.body);

    return {
      body: { id: subscriber.getId() },
      status: 201,
    };
  }
}
