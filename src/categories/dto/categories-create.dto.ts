import { IsString } from 'class-validator';

export default class CategoriesCreateDto {
  @IsString()
  name: string;
}
