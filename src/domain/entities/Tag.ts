import { BaseEntity, BaseEntityProps } from './BaseEntity';

export type TagPartial = {
  id: string;
  name: string;
};

export type TagProps = BaseEntityProps & {
  name: string;
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
