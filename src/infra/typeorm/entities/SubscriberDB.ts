import { Column, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TagDB } from './TagDB';

@Entity('subscribers')
export class SubscriberDB {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column()
  email!: string;

  @Column({ name: 'id_at_core' })
  idAtCore!: string;

  @ManyToOne(() => TagDB, { eager: true })
  @JoinColumn({ name: 'tag_id' })
  tag!: TagDB;

  @Column({ name: 'created_at', type: 'timestamp', default: 'now()' })
  createdAt!: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp' })
  deletedAt?: Date;
}
