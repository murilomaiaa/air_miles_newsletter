import AppError from '@/main/errors/AppError';
import { ITagsRepository } from '../repositories';

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
  constructor(private readonly tagsRepository: ITagsRepository) {}

  async execute({ tagName }: SendMassiveMailDTO.Input): Promise<SendMassiveMailDTO.Output> {
    const tag = await this.tagsRepository.findByName(tagName);
    if (!tag) throw new AppError('Tag not found');

    return {
      numberOfSubscribers: 0,
    };
  }
}
