import { Injectable, BadRequestException, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../database/entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  @InjectRepository(User)
  private readonly userRepository: Repository<User>;

  public async create(createUserDto: CreateUserDto): Promise<User> {
    const { handle, email, password, confirmPassword } = createUserDto;
    if (password !== confirmPassword) {
      throw new BadRequestException(
        'ERROR: Cannot POST /user - password and confirm password are not a match.'
      );
    }
    const user = new User({ handle, email, password });
    console.log(user);
    return await this.userRepository.save(user);
  }

  public async findAll() {
    return `This action returns all user`;
  }

  public async findOneById(id: number): Promise<User> {
    return await this.userRepository.findOneBy({ id });
  }

  public async findOneByEmail(email: string): Promise<User> {
    const existingUserWithEmail = await this.userRepository.findOne({ where: { email } });
    return existingUserWithEmail ?? existingUserWithEmail;
  }

  public async update(id: number, updates: UpdateUserDto) {
    const existingUser = await this.findOneById(id);
    return (
      existingUser ??
      (await this.userRepository.update(
        { id },
        {
          ...existingUser,
          ...updates,
        }
      ))
    );
  }

  public async remove(id: number): Promise<void> {
    this.userRepository.delete({ id });
  }
}
