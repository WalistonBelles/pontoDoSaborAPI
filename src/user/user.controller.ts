import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { Public } from 'src/public.decorator';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User> {
    return this.userService.findOne({ id: Number(id) });
  }

  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.findAll({});
  }

  @Public()
  @Post()
  async create(@Body() postData: User): Promise<User> {
    const { name, email, password, roleId } = postData;
    const salt = await bcrypt.genSalt();
    const pass = await bcrypt.hash(password, salt);

    return this.userService.create({
      name,
      email,
      password: pass,
      salt,
      role: {
        connect: { id: roleId },
      },
    });
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
