import { SubscribersRepository, TagsRepository } from '@/infra/typeorm/repositories';

export const repositories = {
  ISubscribersRepository: new SubscribersRepository(),
  ITagsRepository: new TagsRepository(),
};
