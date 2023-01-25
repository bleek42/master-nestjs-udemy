import * as argon2 from '@node-rs/argon2';
import { randomUUID, RandomUUIDOptions } from 'crypto';
import { Exclude } from 'class-transformer';
import {
  Entity,
  BaseEntity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  PrimaryColumnOptions,
  BeforeInsert,
  BeforeUpdate,
  ManyToMany,
  OneToMany,
  ManyToOne,
} from 'typeorm';

import { Event } from './event.entity';

const timeActive = new Date().toLocaleString();

enum ACTIVE_USER {
  'INACTIVE' = 0,
  'RECENT' = 1,
  'ACTIVE' = 2,
}

type ActiveStatus = {
  begin?: Date;
  end?: Date;
  timeElapsed?: () => typeof Date;
  status: ACTIVE_USER[keyof ACTIVE_USER];
};

@Entity({ name: 'users' })
export class User extends BaseEntity {
  constructor(dto: Partial<User> = {}) {
    super();
    Object.assign(this, dto);
  }

  @PrimaryGeneratedColumn('identity', {
    name: 'id',
    comment:
      'basic, easy to locate, typically auto-incrmenting id column to keep track of signups, short-term timeline by order of the earliest account registrations yet still mutable if it needs to change',
  })
  public id!: number;

  @PrimaryGeneratedColumn('uuid', {
    name: 'uid',
    comment:
      'unique user id randomly generated, set to modern UUID string format: gives all users genuinely unique, immutable value that can never be altered & completely immutable.',
    primaryKeyConstraintName: 'usr_uuid',
  })
  private readonly uid: string;

  @Column({
    name: 'user_name',
    type: 'varchar',
    length: 36,
    unique: true,
    nullable: false,
  })
  public readonly handle!: string;

  @Column({ unique: true, type: 'varchar', length: 96 })
  public email!: string;

  @Column({ type: 'varchar', length: 256, charset: 'UTF-8', nullable: false })
  @Exclude({ toPlainOnly: true })
  public password!: string;

  @Column({
    name: 'first_name',
    type: 'varchar',
    length: 96,
    unique: true,
    nullable: false,
    update: false,
  })
  public readonly firstName!: string;

  @Column({
    name: 'last_name',
    type: 'varchar',
    length: 96,
    unique: true,
    nullable: false,
    update: false,
  })
  public readonly lastName!: string;

  @Column({
    name: 'active_status',
    type: 'enum',
    enumName: 'ACTIVE_STATUS',
    nullable: true,
    default: null,
  })
  protected activeStatus: ACTIVE_USER[keyof ACTIVE_USER];

  @Column({
    name: 'upcoming_events',
    type: 'array',
    array: true,
    length: 32,
    unique: true,
    nullable: true,
  })
  @OneToMany(() => Event, (event) => event.attendees, { nullable: true })
  public upcomingEvents?: Array<Event> | Event;

  @Column({
    name: 'past_events',
    type: 'array',
    array: true,
    length: 400,
    unique: false,
    default: [],
    nullable: true,
  })
  @OneToMany(() => Event, (event) => event.attendees, { nullable: true })
  public pastEvents?: Array<Event> | Event;

  @Column({ default: false })
  public isAdmin!: boolean;

  @Column({ type: 'array', default: [], array: true })
  public hostedEvents?: Array<Event | string | void>;

  @CreateDateColumn({ type: 'timestamp', default: new Date().toUTCString() })
  public readonly createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', default: new Date().toUTCString() })
  public updatedAt: Date;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword(): Promise<void> {
    this.password = await argon2.hash(this.password);
  }

  @BeforeInsert()
  @BeforeUpdate()
  async comparePassword(passwordTxt: string): Promise<boolean> {
    return await argon2.verify(this.password, passwordTxt);
  }

  //   @BeforeUpdate()
  //  async checkIfHas(params:type) => {

  //  }
}
