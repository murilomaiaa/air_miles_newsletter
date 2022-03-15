import { BaseEntity, BaseEntityProps } from './BaseEntity';
import { SubscriberProps } from './Subscriber';

export type TagPartial = {
  id: string;
  name: string;
};

export type TagProps = BaseEntityProps & {
  name: string;
  subscribers?: SubscriberProps[];
};

export class Tag extends BaseEntity {
  private name: string;

  constructor(props: TagProps) {
    super(props);
    this.name = props.name;
  }

  toPartial(): TagPartial {
    return {
      id: this.id,
      name: this.name,
    };
  }
}
