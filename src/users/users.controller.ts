import { Body, Controller, Delete, Get, Param, Patch } from '@nestjs/common';
import { User } from '@prisma/client';
import { UsersService } from './users.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UsersService) {}

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User> {
    return this.userService.findOne({ id: Number(id) });
  }

  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.findAll({});
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() user: User): Promise<User> {
    return this.userService.update({
      where: {
        id: Number(id),
      },
      data: user,
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.delete({
      id: Number(id),
    });
  }
}
