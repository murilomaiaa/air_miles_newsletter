import AppError from '@/main/errors/AppError';
import { IMailProvider } from '../providers/IMailProvider';
import { ISubscribersRepository, ITagsRepository } from '../repositories';

export namespace SendMassiveMailDTO {
  export type Input = {
    tagName: string;
    subject: string;
    text: string;
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
    private readonly mailProvider: IMailProvider,
  ) {}

  async execute({ tagName, subject, text }: SendMassiveMailDTO.Input): Promise<SendMassiveMailDTO.Output> {
    const tag = await this.tagsRepository.findByName(tagName);
    if (!tag) throw new AppError('Tag not found');

    const subscribers = await this.subscribersRepository.findByTagName(tagName);

    await this.mailProvider.sendMail({
      to: subscribers.map(s => ({
        email: s.getEmail(),
        name: s.getName(),
      })),
      subject,
      text,
    });

    return {
      numberOfSubscribers: subscribers.length,
    };
  }
}
