import { Injectable } from '@nestjs/common';

import { Category } from 'src/entidades/category.entity';
import * as categoriesData from '../data/categories.json'; // Archivo JSON con los datos

@Injectable()
export class CategoriesService {
  private categories: Category[] = [];

  constructor() {
    this.preloadCategories(); // Precarga al iniciar el servicio
  }

  // Método que carga las categorías desde el archivo JSON
  private preloadCategories() {
    categoriesData.forEach((category: Category) => {
      if (!this.categories.find(cat => cat.name === category.name)) {
        this.addCategory(category); // Evitar duplicados
      }
    });
  }

  // Método para agregar una categoría
  addCategory(category: Category) {
    this.categories.push(category);
  }

  // Método para obtener todas las categorías
  getCategories(): Category[] {
    return this.categories;
  }
}

