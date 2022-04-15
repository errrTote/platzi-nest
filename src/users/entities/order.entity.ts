import { User } from "./user.entity";
import { Product } from "src/products/entitites/product.entity";

export class Order {
  date: Date;
  user: User;
  products: Product[];
}
