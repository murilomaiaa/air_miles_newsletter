import AppError from '@/main/errors/AppError';
import { ISubscribersRepository, ITagsRepository } from '../repositories';

export namespace SendMassiveMailDTO {
  export type Input = {
    tagName: string;
  };

  export type Output = {
    numberOfSubscribers: number;
  };
}

export interface ISendMassiveMail {
  execute(data: SendMassiveMailDTO.Input): Promise<SendMassiveMailDTO.Output>;
}

export class SendMassiveMail implements ISendMassiveMail {
  constructor(
    private readonly tagsRepository: ITagsRepository,
    private readonly subscribersRepository: ISubscribersRepository,
  ) {}

  async execute({ tagName }: SendMassiveMailDTO.Input): Promise<SendMassiveMailDTO.Output> {
    const tag = await this.tagsRepository.findByName(tagName);
    if (!tag) throw new AppError('Tag not found');

    await this.subscribersRepository.findByTagName(tagName);

    return {
      numberOfSubscribers: 0,
    };
  }
}
