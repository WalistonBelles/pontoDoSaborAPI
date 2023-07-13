import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Sales } from '@prisma/client';
import { SalesService } from './sales.service';

@Controller('sales')
export class SalesController {
  constructor(private readonly salesService: SalesService) {}

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Sales> {
    return this.salesService.findOne({ id: Number(id) });
  }

  @Get()
  async findAll(): Promise<Sales[]> {
    return this.salesService.findAll({});
  }

  @Post()
  async create(@Body() postData: Sales): Promise<Sales> {
    const { count, productId, totalPrice, unityPrice } = postData;
    return this.salesService.create({
      count,
      totalPrice,
      unityPrice,
      product: {
        connect: { id: productId },
      },
    });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() sales: Sales): Promise<Sales> {
    return this.salesService.update({
      where: {
        id: Number(id),
      },
      data: sales,
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.salesService.delete({
      id: Number(id),
    });
  }
}
