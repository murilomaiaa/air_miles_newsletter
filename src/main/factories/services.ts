import { CreateSubscriber } from '@/domain/features/CreateSubscriber';
import { SendMassiveMail } from '@/domain/features/SendMassiveMail';
import { providers } from './providers';
import { repositories } from './repositories';

export const services = {
  createSubscriber: new CreateSubscriber(repositories.ISubscribersRepository, repositories.ITagsRepository),
  sendMassiveMail: new SendMassiveMail(
    repositories.ITagsRepository,
    repositories.ISubscribersRepository,
    providers.IMailProvider,
  ),
};
