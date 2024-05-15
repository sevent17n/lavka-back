import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import BalanceupDto from './dto/balanceup.dto';

@Injectable()
export default class FinancialService {
  constructor(private readonly prismaService: PrismaService) {}

  public async balance(id: number, dto: BalanceupDto) {
    const user = await this.prismaService.user.findUnique({
      where: {
        id: id,
      },
    });

    await this.prismaService.financial_transaction.create({
      data: {
        user: {
          connect: {
            id: user.id,
          },
        },
        type: 'deposit',
        amount: dto.amount,
      },
    });

    const amount = user.balance + dto.amount;
    return this.prismaService.user.update({
      where: {
        id: id,
      },
      data: {
        balance: amount,
      },
    });
  }
}
