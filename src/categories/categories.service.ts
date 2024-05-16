import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import FilesService from '../files/files.service';
import CategoriesCreateDto from './dto/categories-create.dto';
import CategoriesUpdateDto from './dto/categories-update.dto';

@Injectable()
export default class CategoriesService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly fileService: FilesService,
  ) {}

  public async createCategory(
    file: Express.Multer.File,
    dto: CategoriesCreateDto,
  ) {
    const fileData = await this.fileService.saveFile(file, 'category');

    return this.prismaService.category.create({
      data: {
        name: dto.name,
        imageUrl: fileData.url,
      },
    });
  }

  public async addProductToCategory(dto: CategoriesUpdateDto) {
    return this.prismaService.category_products.create({
      data: {
        productsId: dto.productId,
        categoryId: dto.categoryId,
      },
    });
  }

  public async getAllInCat(id: number) {
    return this.prismaService.category.findUnique({
      where: { id },
      include: {
        category_products: {
          include: {
            product: true, // Включаем полную информацию о продуктах
          },
        },
      },
    });
  }

  public async getAll() {
    return this.prismaService.category.findMany({});
  }
}
