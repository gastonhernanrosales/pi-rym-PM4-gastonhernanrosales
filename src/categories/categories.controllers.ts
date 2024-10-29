import { Controller, Post, HttpCode, HttpStatus, Get } from '@nestjs/common';
import { CategoriesService } from './categories.service';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  getAllCategories() {
    return this.categoriesService.getCategories(); // Devuelve las categorías precargadas
  }

  @Post('seeder')
  @HttpCode(HttpStatus.OK)
  async seedCategories() {
    await this.categoriesService.addCategory;
    return { message: 'Categories seeded successfully.' };
  }
}
