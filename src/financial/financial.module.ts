import { Module } from '@nestjs/common';
import FinancialController from './financial.controller';
import FinancialService from './financial.service';
import { PrismaService } from '../prisma.service';

@Module({
  imports: [],
  controllers: [FinancialController],
  providers: [FinancialService, PrismaService],
})
export default class FinancialModule {}
