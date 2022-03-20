import { Subscriber } from '@/domain/entities';
import { SubscriberDB } from '../entities';

export class SubscriberMapper {
  static mapOne(c: SubscriberDB): Subscriber {
    return new Subscriber(c);
  }

  static mapMany(subscribers: SubscriberDB[]) {
    return subscribers.map(s => this.mapOne(s));
  }
}
