import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { Product } from "../entitites/product.entity";
import { CreateProductDto, UpdateProductDto } from "../dtos/products.dto";

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
  ) {}

  findAll() {
    return this.productRepository.find();
  }

  async findOne(id: string) {
    const product = await this.productRepository.findOne(id);
    if (!product) throw new NotFoundException(`Product ${id} not found`);
    return product;
  }

  create(payload: CreateProductDto) {
    const newProduct = this.productRepository.create(payload);
    return this.productRepository.save(newProduct);
  }

  async update(id: string, payload: UpdateProductDto) {
    const product = await this.findOne(id);
    this.productRepository.merge(product, payload);
    return this.productRepository.save(product);
  }

  async delete(id: string) {
    const product = await this.findOne(id);
    this.productRepository.delete(id);
    return product;
  }
}
