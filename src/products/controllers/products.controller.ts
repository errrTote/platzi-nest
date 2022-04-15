import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from "@nestjs/common";
import { ApiTags, ApiOperation } from "@nestjs/swagger";

import { ParseIntPipe } from "../../common/parse-int.pipe";
import { CreateProductDto, UpdateProductDto } from "../dtos/products.dto";
import { ProductsService } from "../services/products.service";

@ApiTags("products")
@Controller("products")
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get(":productId")
  getOne(@Param("productId", ParseIntPipe) productId: string) {
    return this.productsService.findOne(productId);
  }

  @Get()
  @ApiOperation({ summary: "List all products" })
  get() {
    return this.productsService.findAll();
  }

  @Post()
  create(@Body() payload: CreateProductDto) {
    return this.productsService.create(payload);
  }

  @Put(":productId")
  update(
    @Param("productId", ParseIntPipe) productId: string,
    @Body() payload: UpdateProductDto,
  ) {
    return this.productsService.update(productId, payload);
  }

  @Delete(":productId")
  delete(@Param("productId", ParseIntPipe) productId: string) {
    return this.productsService.delete(productId);
  }
}
