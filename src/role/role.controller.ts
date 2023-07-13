import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Role } from '@prisma/client';
import { RoleService } from './role.service';

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Role> {
    return this.roleService.findOne({ id: Number(id) });
  }

  @Get()
  async findAll(): Promise<Role[]> {
    return this.roleService.findAll({});
  }

  @Post()
  async create(@Body() postData: Role): Promise<Role> {
    return this.roleService.create(postData);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() role: Role): Promise<Role> {
    return this.roleService.update({
      where: {
        id: Number(id),
      },
      data: role,
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roleService.delete({
      id: Number(id),
    });
  }
}
