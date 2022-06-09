import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { BrandsController } from "./controllers/brands.controller";
import { CategoriesController } from "./controllers/categories.controller";
import { ProductsController } from "./controllers/products.controller";
import { ProductsService } from "./services/products.service";
import { Product } from "./entitites/product.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  controllers: [BrandsController, CategoriesController, ProductsController],
  providers: [ProductsService],
  exports: [ProductsService],
})
export class ProductsModule {}
