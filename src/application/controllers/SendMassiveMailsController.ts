import { HttpRequest, HttpResponse } from '@/application/http';
import { ISendMassiveMail, SendMassiveMailDTO } from '@/domain/features/SendMassiveMail';
import { IController } from './IController';

type Response = {
  numberOfSubscribers: number;
};

export class SendMassiveMailsController implements IController {
  public path: string;
  constructor(private readonly sendMassiveMail: ISendMassiveMail) {
    this.path = '/massiveMails';
  }

  async handle(request: HttpRequest<SendMassiveMailDTO.Input>): Promise<HttpResponse<Response>> {
    const data = await this.sendMassiveMail.execute(request.body);

    return {
      body: data,
      status: 201,
    };
  }
}
