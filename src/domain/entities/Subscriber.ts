import { BaseEntity, BaseEntityDTO, BaseEntityProps } from './BaseEntity';
import { Tag, TagPartial, TagProps } from './Tag';

export type SubscriberDTO = BaseEntityDTO & {
  name: string;
  email: string;
  idAtCore: string;
  tag: TagPartial;
};

export type SubscriberProps = BaseEntityProps & {
  name: string;
  email: string;
  idAtCore: string;
  tag: TagProps | Tag;
};

export class Subscriber extends BaseEntity {
  private name: string;
  private email: string;
  private idAtCore: string;
  private tag: Tag;

  constructor(props: SubscriberProps) {
    super(props);
    this.name = props.name;
    this.email = props.email;
    this.idAtCore = props.idAtCore;
    this.tag = props.tag instanceof Tag ? props.tag : new Tag(props.tag);
  }

  getEmail() {
    return this.email;
  }

  getName() {
    return this.email;
  }

  toDto(): SubscriberDTO {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      idAtCore: this.idAtCore,
      tag: this.tag.toPartial(),
      createdAt: this.createdAt,
    };
  }
}
