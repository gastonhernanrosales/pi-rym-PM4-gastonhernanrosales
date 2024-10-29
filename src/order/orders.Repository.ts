import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Order } from "src/entidades/order.entitys";
import { OrderDetail } from "src/entidades/orderDetails.entity";
import { User } from "src/entidades/user.entity";
import { Product } from "src/products/products.entity";
import { Repository } from "typeorm";

@Injectable()
export class OrdersRepository {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepo: Repository<Order>,

    @InjectRepository(OrderDetail)
    private readonly orderDetailRepo: Repository<OrderDetail>,
  ) {}

  async createOrder(user: User, products: Product[], total: number): Promise<Order> {
    // Crear la orden asociada al usuario y al total
    const order = this.orderRepo.create({ user, total });
    await this.orderRepo.save(order);

    // Crear detalles de la orden
    for (const product of products) {
      const orderDetail = this.orderDetailRepo.create({
        product,   // Asegúrate de que `product` está definido como ManyToOne
        order,     // Relación ManyToOne con `order`
        price: product.price,
      });
      await this.orderDetailRepo.save(orderDetail);
    }

    return order;
  }

  async getOrder(id: string): Promise<Order> {
    return this.orderRepo.findOne({
      where: { id },
      relations: ['orderDetails', 'orderDetails.product'],
    });
  }
}
