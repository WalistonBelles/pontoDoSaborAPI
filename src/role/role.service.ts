import { Injectable } from '@nestjs/common';
import { Prisma, Role } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class RoleService {
  constructor(private prisma: PrismaService) {}

  async findOne(
    roleWhereUniqueInput: Prisma.RoleWhereUniqueInput,
  ): Promise<Role | null> {
    return this.prisma.role.findUnique({
      where: roleWhereUniqueInput,
      include: {
        user: true,
      },
    });
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.RoleWhereUniqueInput;
    where?: Prisma.RoleWhereInput;
    orderBy?: Prisma.RoleOrderByWithRelationInput;
  }): Promise<Role[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.role.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include: {
        user: true,
      },
    });
  }

  async create(data: Prisma.RoleCreateInput): Promise<Role> {
    return this.prisma.role.create({
      data,
    });
  }

  async update(params: {
    where: Prisma.RoleWhereUniqueInput;
    data: Prisma.RoleUpdateInput;
  }): Promise<Role> {
    const { where, data } = params;
    return this.prisma.role.update({
      data,
      where,
    });
  }

  async delete(where: Prisma.RoleWhereUniqueInput): Promise<Role> {
    return this.prisma.role.delete({
      where,
    });
  }
}
