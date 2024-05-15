import { IsNumber, IsString, Max, Min } from 'class-validator';

export default class ProductsCreateDto {
  @IsString()
  public name: string;

  @IsString()
  public description: string;

  @IsNumber()
  public price: number;

  @IsNumber()
  @Min(0)
  @Max(100)
  public discount: number;

  @IsNumber()
  public count: number;

  @IsNumber()
  public weight: number;
}
