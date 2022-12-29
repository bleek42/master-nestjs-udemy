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

import { randomUUID } from 'crypto';
import * as argon2 from 'argon2';

@Entity({ name: 'users' })
export class User extends BaseEntity {
  constructor(dto: Partial<User> = {}) {
    super();
    Object.assign(this, dto);
  }

  @PrimaryGeneratedColumn('increment', {
    name: 'id',
    comment:
      'basic, easy to locate, typically auto-incrmenting id column to keep track of signups, short-term timeline by order of the earliest account registrations yet still mutable if it needs to change',
  })
  public id!: number;

  @PrimaryGeneratedColumn('uuid', {
    name: 'uid',
    comment:
      'unique user id randomly generated UUID string: genuinely gives users unique, immutable column that can never be altered',
  })
  protected readonly uid: string;

  @Column({
    name: 'user_name',
    type: 'varchar',
    length: 36,
    unique: true,
    nullable: false,
  })
  public readonly username!: string;

  @Column({
    name: 'full_name',
    type: 'varchar',
    length: 96,
    unique: true,
    nullable: false,
    update: false,
  })
  public readonly fullName!: string;

  @Column({ name: 'full_name', type: 'varchar', length: 96, unique: true, nullable: false })
  @Column({ unique: true, type: 'varchar', length: 96 })
  public email!: string;

  @Column({ type: 'varchar', length: 255 })
  @Exclude()
  protected password!: string;

  @Column({ default: false })
  protected isAdmin!: boolean;

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
}
