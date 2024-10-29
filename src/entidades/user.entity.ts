import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Order } from 'src/entidades/order.entitys'; 

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  name: string;

  @Column({ length: 50, unique: true })
  email: string;

  @Column({ length: 20 })
  password: string;

  @Column()
  phone: string;

  @Column({ length: 50, nullable: true })
  country?: string;

  @Column({ type: 'text', nullable: true })
  address?: string;

  @Column({ length: 50, nullable: true })
  city?: string;

  @Column({ default: false }) // Define admin con un valor por defecto
  admin: boolean;

  
  
  @OneToMany(() => Order, (order) => order.user) // Cambia 'order.user' al nombre correcto de la relación
  orders: Order[];
}


