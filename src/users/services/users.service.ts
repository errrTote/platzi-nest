import { Injectable, NotFoundException, Inject } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Client } from "pg";

import { CreateUserDto, UpdateUserDto } from "../dtos/users.dto";
import { ProductsService } from "src/products/services/products.service";
import { User } from "../entities/user.entity";

@Injectable()
export class UsersService {
  constructor(
    @Inject("PG") private pgClient: Client,
    private productsService: ProductsService,
    private configService: ConfigService,
  ) {}

  private users: User[] = [
    {
      id: 1,
      name: "userTestName",
      last_name: "userTestLast_name",
      email: "userTestEmail@mail.com",
      role: 1,
    },
    {
      id: 2,
      name: "userTestName",
      last_name: "userTestLast_name",
      email: "userTestEmail@mail.com",
      role: 2,
    },
    {
      id: 3,
      name: "userTestName",
      last_name: "userTestLast_name",
      email: "userTestEmail@mail.com",
      role: 3,
    },
  ];

  findAll() {
    return this.users;
  }

  findOne(id: string) {
    const user = this.users.find((item) => item.id === Number(id));
    if (!user) throw new NotFoundException(`User ${id} not found`);
    return user;
  }

  create(payload: CreateUserDto) {
    const newUser = {
      id: this.users.length + 1,
      ...payload,
    };
    this.users.push(newUser);
    return newUser;
  }

  update(id: string, payload: UpdateUserDto) {
    const user = this.findOne(id);
    if (!user) return null;
    const index = this.users.findIndex((item) => item.id === Number(id));
    const updatedUser = {
      ...user,
      ...payload,
    };
    this.users[index] = updatedUser;
    return updatedUser;
  }

  delete(id: string) {
    const user = this.findOne(id);
    if (!user) return null;
    const index = this.users.findIndex((item) => item.id === Number(id));
    const deletedUser = this.users.splice(index, 1);
    const apiKey = this.configService.get("API_KEY");
    const database = this.configService.get("DATABASE_NAME");
    console.log(apiKey);
    console.log(database);

    return {
      deletedUser,
      apiKey,
      database,
    };
  }

  async getOrdersByUser(id: string) {
    const user = this.users.find((item) => item.id === Number(id));
    if (!user) throw new NotFoundException(`User ${id} not found`);
    return {
      date: new Date(),
      user,
      products: await this.productsService.findAll(),
    };
  }

  // Se retorna una promesa para poder pasar valores a partir de un callback (err, res) => ...
  getTasks() {
    return new Promise((resolve, reject) => {
      this.pgClient.query("SELECT * FROM tasks;", (err, res) => {
        if (err) reject(err);
        resolve(res.rows);
      });
    });
  }
}
