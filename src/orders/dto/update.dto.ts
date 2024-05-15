import { IsNumber, IsString } from 'class-validator';

export default class UpdateDto {
  @IsNumber()
  public orderId: number;

  @IsString()
  public status: string;
}
