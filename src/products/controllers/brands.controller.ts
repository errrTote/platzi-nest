import {
  Controller,
  Get,
  Query,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("brands")
@Controller("brands")
export class BrandsController {
  @Get(":brandsId")
  getOne(@Param("brandsId") brandsId: string) {
    return {
      message: `Brand ${brandsId}`,
    };
  }

  @Get()
  get(@Query("limit") limit = 100, @Query("offset") offset = 0) {
    return {
      message: `Brands paginated Limit ${limit} Offset ${offset}`,
    };
  }

  @Post()
  create(@Body() payload: any) {
    return {
      message: "accion de crear",
      payload,
    };
  }

  @Put(":brandsId")
  update(@Param("brandsId") brandsId: string, @Body() payload: any) {
    return {
      message: "accion de editar",
      brandsId,
      payload,
    };
  }

  @Delete(":brandsId")
  delete(@Param("brandsId") brandsId: string) {
    return {
      message: "accion de eliminar",
      brandsId,
    };
  }
}
