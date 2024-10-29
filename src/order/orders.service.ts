// src/orders/orders.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { OrdersRepository } from './orders.Repository';
import { ProductsService } from '../products/products.service';
import { UsersService } from '../users/users.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from 'src/entidades/order.entitys';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderDetail } from 'src/entidades/orderDetails.entity';
import { Product } from 'src/products/products.entity';
import { User } from 'src/entidades/user.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepo: Repository<Order>,
    @InjectRepository(OrderDetail)
    private readonly orderDetailRepo: Repository<OrderDetail>,
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
    private readonly usersService: Repository<User>,
  ) {}

  async addOrder(createOrderDto: CreateOrderDto) {
    const { userId, products } = createOrderDto;

    // Buscar usuario por ID
    const user = await this.usersService.findUserById(userId);
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    // Buscar los productos y verificar stock
    const productList = [];
    let total = 0;
    for (const item of products) {
      const product = await this.productsService.findProductById(item.id);
      if (!product || !product.stock ) {
        throw new NotFoundException(`Producto con ID ${item.id} no está disponible`);
      }
      productList.push(product);
      total += product.price;
    }

    // Crear la orden
    const order = await this.ordersRepository.createOrder(user, productList, total);

    // Devolver los detalles de la orden
    return {
      orderId: order.id,
      total,
      products: productList.map(p => ({
        id: p.id,
        name: p.name,
        price: p.price,
      })),
    };
  }

  async getOrder(id: string) {
    const order = await this.ordersRepository.getOrder(id);
    if (!order) {
      throw new NotFoundException('Orden no encontrada');
    }
    return order;
  }
  async createOrder(createOrderDto: CreateOrderDto): Promise<Order> {
    // Extraer userId y productos del DTO
    const { userId, products } = createOrderDto;

    // Crear una nueva orden
    const order = this.orderRepo.create({ userId }); // Asegúrate de que userId está correctamente definido en la entidad Order
    await this.orderRepo.save(order); // Guardar la orden

    // Crear detalles de la orden
    for (const product of products) {
      const productEntity = await this.productRepo.findOne({ where: { id: product.id } });
      if (!productEntity) {
        throw new Error(`Producto con ID ${product.id} no encontrado.`);
      }

      const orderDetail = this.orderDetailRepo.create({
        product: productEntity, // Relación ManyToOne con el producto
        order, // Relación ManyToOne con la orden
        price: productEntity.price, // Asignar el precio del producto
      });
      await this.orderDetailRepo.save(orderDetail);
    }

    return order; // Retornar la orden creada
  }
}
