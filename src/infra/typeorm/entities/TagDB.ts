import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tags')
export class TagDB {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column({ name: 'created_at', type: 'timestamp', default: 'now()' })
  createdAt!: Date;
}
