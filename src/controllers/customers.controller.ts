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

@Controller("customers")
export class CustomersController {
  @Get(":customersId")
  getOne(@Param("customersId") customersId: string) {
    return {
      message: `Customers ${customersId}`,
    };
  }

  @Get()
  get(@Query("limit") limit = 100, @Query("offset") offset = 0) {
    return {
      message: `Customers paginated Limit ${limit} Offset ${offset}`,
    };
  }

  @Post()
  create(@Body() payload: any) {
    return {
      message: "accion de crear",
      payload,
    };
  }

  @Put(":customersId")
  update(@Param("customersId") customersId: string, @Body() payload: any) {
    return {
      message: "accion de editar",
      customersId,
      payload,
    };
  }

  @Delete(":customersId")
  delete(@Param("customersId") customersId: string) {
    return {
      message: "accion de eliminar",
      customersId,
    };
  }
}
