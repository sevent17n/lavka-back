import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import CreateOrderDto from './dto/create-order.dto';
import UpdateDto from './dto/update.dto';

@Injectable()
export default class OrdersService {
  constructor(private readonly prismaService: PrismaService) {}

  public async createOrder(dto: CreateOrderDto) {
    const order = await this.prismaService.orders.create({
      // @ts-ignore
      data: {
        status: 'created',
        userId: dto.userId,
      },
    });
    for (let i = 0; i < dto.productsId.length; i++) {
      await this.prismaService.orders_Data.create({
        data: {
          ordersId: order.id,
          productsId: dto.productsId[i],
        },
      });

      const product = await this.prismaService.products.findUnique({
        where: {
          id: dto.productsId[i],
        },
      });

      const user = await this.prismaService.user.findUnique({
        where: {
          id: dto.userId,
        },
      });

      const newBalance = user.balance - product.price;

      await this.prismaService.user.update({
        where: {
          id: dto.userId,
        },
        data: {
          balance: newBalance,
        },
      });
    }
    const productsInOrder = await this.prismaService.orders.findUnique({
      where: {
        id: order.id,
      },
    });

    return { order, productsInOrder };
  }

  public async getAll() {
    return this.prismaService.orders.findMany();
  }

  public async updateStatus(dto: UpdateDto) {
    return this.prismaService.orders.update({
      where: {
        id: dto.orderId,
      },
      data: {
        // @ts-ignore
        status: dto.status,
      },
    });
  }
}
