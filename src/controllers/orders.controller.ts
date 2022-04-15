import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
} from "@nestjs/common";

@Controller("orders")
export class OrdersController {
  @Get(":orderId")
  getOne(@Param("orderId") orderId: string) {
    return {
      message: `Order ${orderId}`,
    };
  }

  @Get()
  get(@Query("limit") limit = 100, @Query("offset") offset = 0) {
    return {
      message: `Orders paginated Limit ${limit} Offset ${offset}`,
    };
  }

  @Post()
  create(@Body() payload: any) {
    return {
      message: "accion de crear",
      payload,
    };
  }

  @Put(":orderId")
  update(@Param("orderId") orderId: string, @Body() payload: any) {
    return {
      message: "accion de editar",
      orderId,
      payload,
    };
  }

  @Delete(":orderId")
  delete(@Param("orderId") orderId: string) {
    return {
      message: "accion de eliminar",
      orderId,
    };
  }
}
