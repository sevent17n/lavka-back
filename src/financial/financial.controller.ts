import { Body, Controller, Param, Post } from '@nestjs/common';
import FinancialService from './financial.service';
import BalanceupDto from './dto/balanceup.dto';

@Controller('financial')
export default class FinancialController {
  constructor(private readonly financialService: FinancialService) {}

  @Post('balance/:id')
  public async balanceUp(@Param('id') id: number, @Body() dto: BalanceupDto) {
    return this.financialService.balance(Number(id), dto);
  }
}
