import { Injectable } from '@nestjs/common';
import { Prisma, Sales } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SalesService {
  constructor(private prisma: PrismaService) {}

  async findOne(
    salesWhereUniqueInput: Prisma.SalesWhereUniqueInput,
  ): Promise<Sales | null> {
    return this.prisma.sales.findUnique({
      where: salesWhereUniqueInput,
      include: {
        product: true,
      },
    });
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.SalesWhereUniqueInput;
    where?: Prisma.SalesWhereInput;
    orderBy?: Prisma.SalesOrderByWithRelationInput;
  }): Promise<Sales[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.sales.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include: {
        product: true,
      },
    });
  }

  async create(data: Prisma.SalesCreateInput): Promise<Sales> {
    return this.prisma.sales.create({
      data,
    });
  }

  async update(params: {
    where: Prisma.SalesWhereUniqueInput;
    data: Prisma.SalesUpdateInput;
  }): Promise<Sales> {
    const { where, data } = params;
    return this.prisma.sales.update({
      data,
      where,
    });
  }

  async delete(where: Prisma.SalesWhereUniqueInput): Promise<Sales> {
    return this.prisma.sales.delete({
      where,
    });
  }
}
