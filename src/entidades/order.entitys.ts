import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { User } from './user.entity';  // Importamos la entidad User
import { OrderDetail } from './orderDetails.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;  // UUID generado automáticamente como clave primaria

  @Column()
  date: Date;  // Fecha de la orden

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  total: number;  // Total de la orden

  // Relación ManyToOne con User
  
  @ManyToOne(() => User, (user) => user.orders) // Relación ManyToOne con User
    user: User;

    @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.order) // Relación OneToMany con OrderDetail
    orderDetails: OrderDetail[];
}
