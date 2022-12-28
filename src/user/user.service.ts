import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  @InjectRepository(User)
  private readonly userRepository: Repository<User>;

  public async create(createUserDto: CreateUserDto): Promise<User> {
    const { username, email, password, confirmPassword } = createUserDto;
    if (password !== confirmPassword) {
      throw new BadRequestException(
        'ERROR: Cannot POST /user - password and confirm password are not a match.',
      );
    }
    const user = new User({ username, email, password });
    console.log(user);
    return await this.userRepository.save(user);
  }

  findAll() {
    return `This action returns all user`;
  }

  public async findOneById(id: number): Promise<User> {
    return await this.userRepository.findOneBy({ id });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
