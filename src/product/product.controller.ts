import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Product } from '@prisma/client';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Product> {
    return this.productService.findOne({ id: Number(id) });
  }

  @Get()
  async findAll(): Promise<Product[]> {
    return this.productService.findAll({});
  }

  @Post()
  async create(@Body() postData: Product): Promise<Product> {
    const { name, categoryId, cost, description, price } = postData;
    return this.productService.create({
      name,
      cost,
      description,
      price,
      category: {
        connect: { id: categoryId },
      },
    });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() product: Product): Promise<Product> {
    return this.productService.update({
      where: {
        id: Number(id),
      },
      data: product,
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.delete({
      id: Number(id),
    });
  }
}
