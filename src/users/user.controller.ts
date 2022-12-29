import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  public async create(@Body() createUserDto: CreateUserDto): Promise<void> {
    await this.userService.create(createUserDto);
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