import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import ProductsCreateDto from './dto/products-create.dto';
import FilesService from '../files/files.service';
import ProductUpdateDto from './dto/product-update.dto';

@Injectable()
export default class ProductsService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly fileService: FilesService,
  ) {}

  public async createProduct(
    file: Express.Multer.File,
    dto: ProductsCreateDto,
  ) {
    const fileData = await this.fileService.saveFile(file, 'products');

    return this.prismaService.products.create({
      data: {
        name: dto.name,
        imageUrl: fileData.url,
        description: dto.description,
        price: dto.price,
        discount: dto.discount,
        count: dto.count,
        weight: dto.weight,
      },
    });
  }

  public async searchProduct(searchTerm?: string) {
    return this.prismaService.products.findMany({
      where: {
        name: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      },
    });
  }

  public async updateProduct(id: number, dto: any) {
    return this.prismaService.products.update({
      where: { id: Number(id) },
      data: {
        name: dto.name || undefined,
        description: dto.description || undefined,
        price: dto.price || undefined,
        discount: dto.discount || undefined,
      },
    });
  }
}
