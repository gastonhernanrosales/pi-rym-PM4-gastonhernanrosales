import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from 'src/entidades/category.entity';

@Injectable()
export class CategoriesRepository {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async getCategories(): Promise<Category[]> {
    return this.categoryRepository.find();
  }

  async addCategory(categoryData: { name: string }) {
    const existingCategory = await this.categoryRepository.findOne({ where: { name: categoryData.name } });
    if (!existingCategory) {
      const category = this.categoryRepository.create(categoryData);
      await this.categoryRepository.save(category);
    }
  }
}
