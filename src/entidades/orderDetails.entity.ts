import { Entity, PrimaryGeneratedColumn, Column, OneToOne, ManyToMany, ManyToOne } from 'typeorm';

import { Order } from './order.entitys';
import { Product } from './products.entity';
@Entity()
export class OrderDetail {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    price: number;

    @ManyToOne(() => Order, (order) => order.orderDetails) // Cambiado a ManyToOne
    order: Order;

    @ManyToMany(() => Product, (product) => product.orderDetails)
    products: Product[];
}
