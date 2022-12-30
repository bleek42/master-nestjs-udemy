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
} from 'typeorm';
import { Exclude } from 'class-transformer';

import { randomUUID, RandomUUIDOptions } from 'crypto';
import * as argon2 from 'argon2';
import { Event } from './event.entity';

enum ACTIVE_USER {
  'INACTIVE' = 0,
  'RECENTLY' = 1,
  'CURRENTLY' = 2,
}

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
  protected id!: number;

  @PrimaryGeneratedColumn('uuid', {
    name: 'uid',
    comment:
      'unique user id randomly generated, set to modern UUID string format: gives all users genuinely unique, immutable value that can never be altered & completely immutable.',
    primaryKeyConstraintName: 'usr_uuid',
  })
  protected readonly uid: string;

  @Column({
    name: 'user_name',
    type: 'varchar',
    length: 36,
    unique: true,
    nullable: false,
  })
  public username!: string;

  @Column({ unique: true, type: 'varchar', length: 96 })
  public email!: string;

  @Column({
    name: 'full_name',
    type: 'varchar',
    length: 96,
    unique: true,
    nullable: false,
    update: false,
  })
  public readonly fullName!: string;

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
    nullable: false,
  })
  public upcomingEvents?: Array<Event | string>;

  @Column({
    name: 'past_events',
    type: 'array',
    array: true,
    length: 400,
    unique: false,
    default: [],
    nullable: false,
  })
  protected pastEvents?: Array<Event | string>;

  @Column({ type: 'varchar', length: 256, charset: 'UTF-8', nullable: false })
  @Exclude({ toPlainOnly: true })
  protected password!: string;

  @Column({ default: false })
  protected isAdmin!: boolean;

  @Column({ type: 'array', default: [], array: true })
  public;

  @CreateDateColumn({ type: 'timestamp', default: new Date().toUTCString() })
  public readonly createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', default: new Date().toUTCString() })
  public updatedAt: Date;

  @BeforeInsert()
  async setUid(opts?: RandomUUIDOptions) {
    this.uid = randomUUID(opts);
  }

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
}
