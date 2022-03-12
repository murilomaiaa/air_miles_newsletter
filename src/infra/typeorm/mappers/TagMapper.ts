import { Tag } from '@/domain/entities';
import { TagDB } from '../entities';

export class TagMapper {
  static mapOne(p: TagDB): Tag {
    return new Tag({
      id: p.id,
      name: p.name,
      createdAt: p.createdAt,
      deletedAt: p.deletedAt,
      updatedAt: p.updatedAt,
      updatedBy: p.updatedBy,
    });
  }
}
