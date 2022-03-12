import { Tag } from '../entities';

export interface ITagsRepository {
  findOrCreateByName(name: string): Promise<Tag>;
}
