import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import OrdersService from './orders.service';
import CreateOrderDto from './dto/create-order.dto';
import UpdateDto from './dto/update.dto';

@Controller('order')
export default class OrdersController {
  constructor(private readonly orderService: OrdersService) {}

  @Post('create')
  async create(@Body() dto: CreateOrderDto) {
    return this.orderService.createOrder(dto);
  }

  @Get(':id')
  async getAllById(@Param('id') id: number) {
    return this.orderService.byId(Number(id));
  }

  @Put('change-status')
  async updateStatus(@Body() dto: UpdateDto) {
    return this.orderService.updateStatus(dto);
  }
}
