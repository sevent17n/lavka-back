import { IsNumber } from 'class-validator';

export default class BalanceupDto {
  @IsNumber()
  public amount: number;
}
