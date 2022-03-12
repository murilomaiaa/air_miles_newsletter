import { Subscriber } from '../entities';

export interface ISubscribersRepository {
  findByEmail(email: string): Promise<Subscriber | undefined>;
  save(subscriber: Subscriber): Promise<Subscriber>;
}
