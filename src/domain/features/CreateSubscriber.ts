import AppError from '@/main/errors/AppError';
import { Subscriber } from '../entities';
import { ISubscribersRepository, ITagsRepository } from '../repositories';

type TagInput = { name: string };

export namespace CreateSubscriberDTO {
  export type Input = {
    name: string;
    email: string;
    idAtCore: string;
    tag: TagInput;
  };

  export type Output = Subscriber;
}

export interface ICreateSubscriber {
  execute(data: CreateSubscriberDTO.Input): Promise<CreateSubscriberDTO.Output>;
}

export class CreateSubscriber implements ICreateSubscriber {
  constructor(
    private readonly subscribersRepository: ISubscribersRepository,
    private readonly tagsRepository: ITagsRepository,
  ) {}

  public async execute({
    email,
    idAtCore,
    tag: tagInput,
    name,
  }: CreateSubscriberDTO.Input): Promise<CreateSubscriberDTO.Output> {
    let subscriber = await this.subscribersRepository.findByEmail(email);

    if (subscriber) {
      throw new AppError('Email already used');
    }

    const tag = await this.tagsRepository.findOrCreateByName(tagInput.name);

    subscriber = new Subscriber({
      name,
      email,
      idAtCore,
      tag,
    });

    return this.subscribersRepository.save(subscriber);
  }
}
