// src/orders/orders.controller.ts
import { Controller, Post, Get, Body, Param, HttpCode, HttpStatus, NotFoundException, BadRequestException, ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { IsUUID } from 'class-validator';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Órdenes')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}
  @ApiOperation({ summary: 'Crear una orden' })
  @ApiResponse({ status: 201, description: 'Orden creada exitosamente.', type: Order })
  @Post()
  async create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto);
  }

  @ApiOperation({ summary: 'Obtener una orden por ID' })
  @ApiResponse({ status: 200, description: 'Orden encontrada.', type: Order })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.ordersService.findOne(+id);
  }

  

  @Get(':id')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('jwt')) 
  async getOrder(@Param('id') id: string) {
    return this.ordersService.getOrder(id);
  }
  
  @Post(':userId')
  @UseGuards(AuthGuard)
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.CREATED)
  async createOrder(@Param('userId', ParseUUIDPipe) userId: string, @Body() createOrderDto: CreateOrderDto) {
    try {
      return await this.ordersService.createOrder(createOrderDto);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException('Usuario o productos no encontrados');
      }
      throw new BadRequestException('Error al crear la orden: ' + error.message);
    }
  }
  
}
