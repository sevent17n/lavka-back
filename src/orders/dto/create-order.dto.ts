import { IsNumber } from 'class-validator';

export default class CreateOrderDto {
  @IsNumber()
  userId: number;

  @IsNumber()
  productsId: number[];
}
