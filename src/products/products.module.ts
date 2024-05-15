import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import ProductsController from './products.controller';
import FilesService from '../files/files.service';
import ProductsService from './products.service';

@Module({
  imports: [],
  providers: [PrismaService, PrismaService, FilesService, ProductsService],
  controllers: [ProductsController],
})
export default class ProductsModule {}
