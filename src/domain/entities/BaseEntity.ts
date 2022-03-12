import { randomUUID } from 'crypto';

export type BaseEntityDTO = {
  id: string;
  createdAt: Date;
};

export type BaseEntityProps = {
  id?: string;
  createdAt?: Date;
};

export abstract class BaseEntity {
  protected readonly id: string;
  protected readonly createdAt: Date;
  protected updatedAt?: Date;
  protected updatedBy?: string;
  protected readonly deletedAt?: Date;
  protected readonly deletedBy?: string;

  constructor(props: BaseEntityProps) {
    this.id = props.id ?? randomUUID();
    this.createdAt = props.createdAt ?? new Date();
  }

  public getId(): string {
    return this.id;
  }
}
