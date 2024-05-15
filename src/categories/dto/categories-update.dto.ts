import { IsNumber } from 'class-validator';

export default class CategoriesUpdateDto {
  @IsNumber()
  public productId: number;
}
