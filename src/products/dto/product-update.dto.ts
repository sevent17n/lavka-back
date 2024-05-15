import { IsNumber, IsString } from 'class-validator';

export default class ProductUpdateDto {
  @IsString()
  public name: string;

  @IsNumber()
  public discount: number;

  @IsNumber()
  public price: number;

  @IsString()
  public description: string;
}
