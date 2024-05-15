import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import AuthModule from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import ProductsModule from './products/products.module';
import CategoriesModule from './categories/categories.module';
import OrdersModule from './orders/orders.module';
import FinancialModule from './financial/financial.module';
import { FileModule } from './files/file.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    ConfigModule.forRoot(),
    ProductsModule,
    CategoriesModule,
    OrdersModule,
    FinancialModule,
    FileModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
