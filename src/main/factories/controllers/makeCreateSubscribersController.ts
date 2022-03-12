import { CreateSubscribersController } from '@/application/controllers/CreateSubscribersController';
import { CreateSubscriber } from '@/domain/features/CreateSubscriber';
import { repositories } from '../repositories';

export function makeCreateSubscribersController() {
  const subscribersRepository = repositories.ISubscribersRepository;
  const tagsRepository = repositories.ITagsRepository;
  const service = new CreateSubscriber(subscribersRepository, tagsRepository);
  return new CreateSubscribersController(service);
}
