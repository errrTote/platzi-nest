import { Injectable, NotFoundException } from "@nestjs/common";
import { Product } from "../entitites/product.entity";
import { CreateProductDto, UpdateProductDto } from "../dtos/products.dto";

@Injectable()
export class ProductsService {
  private products: Product[] = [
    {
      id: 1,
      name: "Product 1",
      description: "Description 1",
      price: "100",
      stock: 1,
      image: "",
    },
    {
      id: 2,
      name: "Product 2",
      description: "Description 2",
      price: "200",
      stock: 2,
      image: "",
    },
    {
      id: 3,
      name: "Product 3",
      description: "Description 3",
      price: "300",
      stock: 3,
      image: "",
    },
  ];

  findAll() {
    return this.products;
  }

  findOne(id: string) {
    const product = this.products.find((item) => item.id === Number(id));
    if (!product) throw new NotFoundException(`Product ${id} not found`);
    return product;
  }

  create(payload: CreateProductDto) {
    const newProduct = {
      id: this.products.length + 1,
      ...payload,
    };
    this.products.push(newProduct);
    return newProduct;
  }

  update(id: string, payload: UpdateProductDto) {
    const product = this.findOne(id);
    if (!product) return null;
    const index = this.products.findIndex((item) => item.id === Number(id));
    const updatedProduct = {
      ...product,
      ...payload,
    };
    this.products[index] = updatedProduct;
    return updatedProduct;
  }

  delete(id: string) {
    const product = this.findOne(id);
    if (!product) return null;
    const index = this.products.findIndex((item) => item.id === Number(id));
    const deletedProduct = this.products.splice(index, 1);
    return deletedProduct;
  }
}
