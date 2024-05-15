import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import CategoriesController from './categories.controller';
import CategoriesService from './categories.service';
import FilesService from '../files/files.service';

@Module({
  imports: [],
  controllers: [CategoriesController],
  providers: [PrismaService, CategoriesService, FilesService],
})
export default class CategoriesModule {}
