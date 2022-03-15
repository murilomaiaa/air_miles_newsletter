import { Tag } from '../entities';

export interface ITagsRepository {
  findOrCreateByName(name: string): Promise<Tag>;
  findByName(name: string): Promise<Tag | undefined>;
}
