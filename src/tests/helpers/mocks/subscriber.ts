import { Subscriber, Tag } from '@/domain/entities';

export function makeFakeSubscriber(): Subscriber {
  return new Subscriber({
    id: '7925d676-0441-4dc7-8a98-00749dcd0725',
    email: 'any-email',
    name: 'any-name',
    idAtCore: 'any_id_at_core',
    tag: { name: 'any-tag', id: 'cb2a43e8-e092-4b23-a2d3-0de376f8632d' },
  });
}

export function makeFakeTag(name = 'any-tag'): Tag {
  return new Tag({
    name,
    id: '82d840e5-118f-4b8a-942e-72b69e133ab7',
  });
}
