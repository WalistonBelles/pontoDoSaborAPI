import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Category } from '@prisma/client';
import { CategoryService } from './category.service';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Category> {
    return this.categoryService.findOne({ id: Number(id) });
  }

  @Get()
  async findAll(): Promise<Category[]> {
    return this.categoryService.findAll({});
  }

  @Post()
  async create(@Body() postData: Category): Promise<Category> {
    return this.categoryService.create(postData);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() category: Category,
  ): Promise<Category> {
    return this.categoryService.update({
      where: {
        id: Number(id),
      },
      data: category,
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryService.delete({
      id: Number(id),
    });
  }
}
