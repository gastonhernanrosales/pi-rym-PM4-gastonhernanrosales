import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './products.entity';
import { CreateProductDto, UpdateProductDto } from './products.DTO';

@Injectable()
export class ProductsRepository {
    constructor(@InjectRepository(Product) private readonly productRepository: Repository<Product>) {}

    // Obtener todos los productos con paginación
    async getProducts(page: number, limit: number): Promise<Product[]> {
        const startIndex = (page - 1) * limit; // Calcular el índice inicial
        return this.productRepository.find({
            skip: startIndex,
            take: limit,
        }); // Retornar el subconjunto de productos
    }

    // Obtener un producto por ID
    async getById(id: number): Promise<Product | undefined> {
        return this.productRepository.findOne({ where: { id } });
    }

    // Crear un nuevo producto
    async create(productData: CreateProductDto): Promise<Product> {
        const product = this.productRepository.create(productData);
        return await this.productRepository.save(product); // Guardar el producto
    }

    // Actualizar un producto existente
    async update(id: number, updatedProduct: UpdateProductDto): Promise<Product> {
        const product = await this.getById(id);
        if (!product) {
            throw new NotFoundException('Product not found');
        }
        Object.assign(product, updatedProduct); // Actualizar propiedades del producto
        return this.productRepository.save(product); // Guardar el producto actualizado
    }

    // Eliminar un producto
    async remove(id: number): Promise<void> {
        const product = await this.getById(id);
        if (!product) {
            throw new NotFoundException('Product not found');
        }
        await this.productRepository.remove(product); // Eliminar el producto
    }

    // Método para buscar un producto por ID
    async findOneById(id: number): Promise<Product | undefined> {
        return this.productRepository.findOne({ where: { id } });
    }
}
