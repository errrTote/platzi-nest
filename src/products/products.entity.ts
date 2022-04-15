import { Module } from "@nestjs/common";
import { BrandsController } from "./controllers/brands.controller";
import { CategoriesController } from "./controllers/categories.controller";
import { ProductsController } from "./controllers/products.controller";
import { ProductsService } from "./services/products.service";

@Module({
  controllers: [BrandsController, CategoriesController, ProductsController],
  providers: [ProductsService],
  exports: [ProductsService],
})
export class ProductsModule {}
