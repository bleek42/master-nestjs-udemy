import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  public async create(@Body() body: CreateUserDto): Promise<boolean> {
    const existingUser = await this.userService.findOneByEmail(body?.email);
    if (
      (existingUser && body?.email === existingUser.email) ||
      body?.handle === existingUser.handle
    ) {
      throw new Error('existing user error!');
    }
    const newUser = await this.userService.create({ ...body });
    console.log('creating new user...', newUser);
    return newUser ? true : false;
  }

  @Get()
  public async findAll() {
    return await this.userService.findAll();
  }

  @Get(':id')
  public async getUserById(@Param('id') id: number) {
    return await this.userService.findOneById(id);
  }

  @Patch(':id')
  public async update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return await this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  public async remove(@Param('id') id: number) {
    return await this.userService.remove(+id);
  }
}
