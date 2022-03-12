import { getRepository, Repository } from 'typeorm';

import { Tag } from '@/domain/entities';
import { ITagsRepository } from '@/domain/repositories';
import { TagDB } from '../entities';
import { TagMapper } from '../mappers/TagMapper';

export class TagsRepository implements ITagsRepository {
  private readonly repository: Repository<TagDB>;

  constructor() {
    this.repository = getRepository(TagDB);
  }

  async findOrCreateByName(name: string): Promise<Tag> {
    let tag: Tag;
    let p = await this.repository.findOne({ where: { name } });

    if (p) {
      tag = TagMapper.mapOne(p);
    } else {
      p = this.repository.create({ name });
      p = await this.repository.save(p);
      tag = TagMapper.mapOne(p);
    }

    return tag;
  }
}
