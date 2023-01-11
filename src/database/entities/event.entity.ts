import {
  Entity,
  BaseEntity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  BeforeInsert,
  BeforeUpdate,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Expose } from 'class-transformer';

import { User } from './user.entity';

@Entity({ name: 'events' })
export class Event extends BaseEntity {
  constructor(dto: Partial<Event> = {}) {
    super();
    Object.assign(this, dto);
  }

  @PrimaryGeneratedColumn('identity')
  @Expose()
  public readonly id!: number;

  @Column({ type: 'varchar', default: 'house party' })
  @Expose()
  public title?: string;

  @Column({
    type: 'varchar',
    length: 600,
    default: 'Come one, come all!.. BYOB, though.',
  })
  @Expose()
  public description?: string;

  @Column({ type: 'timestamptz', default: new Date().toLocaleDateString() })
  @Expose()
  public when?: Date;

  @Column({ type: 'varchar', length: 100, default: 'home' })
  @Expose()
  public location?: string;

  // @ManyToOne(() => User, (user) => user.username)
  @Column({ type: 'varchar', length: 30 })
  @Expose()
  public organizer!: User | string;

  @Column({ type: 'array' })
  @Expose({ groups: ['users'] })
  public attendees?: Array<User | string>;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp', default: new Date().toUTCString() })
  public readonly createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', default: new Date().toUTCString() })
  public updatedAt: Date;
}
