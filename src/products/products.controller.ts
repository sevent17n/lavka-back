import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import ProductsService from './products.service';
import { Auth } from '../auth/decorators/auth.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import ProductsCreateDto from './dto/products-create.dto';
import ProductUpdateDto from './dto/product-update.dto';

@Controller('products')
export default class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post('create')
  @Auth(true)
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() obj: { dto: ProductsCreateDto },
  ) {
    const { dto } = obj;
    // @ts-ignore
    const data: ProductsCreateDto = JSON.parse(dto);
    return this.productsService.createProduct(file, data);
  }

  @Get('search')
  async search(@Query('searchTerm') searchTerm?: string) {
    return this.productsService.searchProduct(searchTerm);
  }

  @Put('update/:id')
  async update(@Body() dto: ProductUpdateDto, @Param('id') id: number) {
    return this.productsService.updateProduct(id, dto);
  }
}
