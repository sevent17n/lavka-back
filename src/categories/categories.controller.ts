import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import CategoriesService from './categories.service';
import { Auth } from '../auth/decorators/auth.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import CategoriesCreateDto from './dto/categories-create.dto';
import CategoriesUpdateDto from './dto/categories-update.dto';

@Controller('categories')
export default class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post('create')
  @Auth(true)
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() obj: { dto: CategoriesCreateDto },
  ) {
    const { dto } = obj;
    // @ts-ignore
    const data: CategoriesCreateDto = JSON.parse(dto);
    return this.categoriesService.createCategory(file, data);
  }

  @Put('update')
  @Auth(true)
  async update(@Body() dto: CategoriesUpdateDto) {
    return this.categoriesService.addProductToCategory(dto);
  }

  @Post('byId')
  async getAllById(@Body('id') id?: number) {
    return this.categoriesService.getAllInCat(Number(id));
  }

  @Get('all')
  async getAll() {
    return this.categoriesService.getAll();
  }
}
