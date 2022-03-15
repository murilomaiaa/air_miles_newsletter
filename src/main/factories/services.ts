import { CreateSubscriber } from '@/domain/features/CreateSubscriber';
import { repositories } from './repositories';

export const services = {
  createSubscriber: new CreateSubscriber(repositories.ISubscribersRepository, repositories.ITagsRepository),
};
