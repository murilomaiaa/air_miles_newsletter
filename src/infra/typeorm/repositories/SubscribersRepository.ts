import { getRepository, Repository } from 'typeorm';
import { Subscriber } from '@/domain/entities';
import { ISubscribersRepository } from '@/domain/repositories';
import { SubscriberDB } from '../entities';
import { SubscriberMapper } from '../mappers';

export class SubscribersRepository implements ISubscribersRepository {
  private readonly repository: Repository<SubscriberDB>;

  constructor() {
    this.repository = getRepository(SubscriberDB);
  }

  async findByTagName(tagName: string): Promise<Subscriber[]> {
    const subscribers = await this.repository
      .createQueryBuilder('subscriber')
      .leftJoinAndSelect('subscriber.tag', 'tag')
      .where('tag.name = :tagName', { tagName })
      .getMany();

    return SubscriberMapper.mapMany(subscribers);
  }

  async findByEmail(email: string): Promise<Subscriber | undefined> {
    const subscriber = await this.repository.findOne({ where: { email } });

    return subscriber ? SubscriberMapper.mapOne(subscriber) : undefined;
  }

  async save(subscriber: Subscriber): Promise<Subscriber> {
    const dto = subscriber.toDto();
    const savedSubscriber = await this.repository.save(dto);

    return SubscriberMapper.mapOne(savedSubscriber);
  }
}
