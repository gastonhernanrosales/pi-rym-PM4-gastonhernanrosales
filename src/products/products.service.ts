import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductsRepository } from './products.Repository';
import { Product } from './products.entity';
import { CreateProductDto, UpdateProductDto } from './products.DTO';
import { CategoriesService } from 'src/categories/categories.service';
import * as productsData from '../data/products.json';

@Injectable()
export class ProductsService {
    constructor(private readonly productsRepository: ProductsRepository,
                private readonly categoriesService: CategoriesService) {}
  
    async findAll(page: number, limit: number): Promise<Product[]> {
        return this.productsRepository.getProducts(page, limit);
    }

    async getProductById(id: number): Promise<Product> {
        const product = await this.productsRepository.getById(id);
        if (!product) {
            throw new NotFoundException(`Product with id ${id} not found`);
        }
        return product;
    }

    async removeProduct(id: number): Promise<void> {
        return this.productsRepository.remove(id);
    }

    async createProduct(createProductDto: CreateProductDto): Promise<Product> {
        return this.productsRepository.create(createProductDto); // Crear el producto
    }

    async updateProduct(id: number, updateProductDto: UpdateProductDto): Promise<Product> {
        const updatedProduct = await this.productsRepository.update(id, updateProductDto);
        if (!updatedProduct) {
            throw new NotFoundException(`Product with id ${id} not found`);
        }
        return updatedProduct;
    }

    async addProducts() {
        const categories = await this.categoriesService.getCategories();
        for (const product of productsData) {
            const category = categories.find(cat => cat.name === product.category);
            if (category) {
                product.category = category; // Asignar la categoría a la entidad producto
                await this.productsRepository.create(product);
            }
        }
    }

    async updateProductImage(productId: number, imageUrl: string): Promise<void> {
        const product = await this.productsRepository.findOneById(productId);
        if (!product) {
            throw new NotFoundException('Producto no encontrado');
        }

        product.imgUrl = imageUrl; // Actualizar la URL de la imagen
        await this.productsRepository.save(product); // Guardar el producto actualizado
    }
}
