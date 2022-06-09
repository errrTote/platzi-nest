import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

import { ParseIntPipe } from "../../common/parse-int.pipe";
import { CreateUserDto, UpdateUserDto } from "../dtos/users.dto";
import { UsersService } from "../services/users.service";

@ApiTags("users")
@Controller("users")
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  get() {
    return this.usersService.findAll();
  }

  @Post()
  create(@Body() payload: CreateUserDto) {
    return this.usersService.create(payload);
  }

  @Put(":id")
  update(
    @Param("id", ParseIntPipe) id: string,
    @Body() payload: UpdateUserDto,
  ) {
    return this.usersService.update(id, payload);
  }

  @Delete(":id")
  delete(@Param("id", ParseIntPipe) id: string) {
    return this.usersService.delete(id);
  }

  @Get("tasks")
  getTasks() {
    return this.usersService.getTasks();
  }

  @Get(":id")
  getOne(@Param("id", ParseIntPipe) id: string) {
    return this.usersService.findOne(id);
  }

  @Get(":id/orders")
  getOrdersByUser(@Param("id", ParseIntPipe) id: string) {
    return this.usersService.getOrdersByUser(id);
  }
}
