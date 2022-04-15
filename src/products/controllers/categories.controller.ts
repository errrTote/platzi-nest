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

@ApiTags("categories")
@Controller("categories")
export class CategoriesController {
  @Get(":categoriesId")
  getOne(@Param("categoriesId") categoriesId: string) {
    return {
      message: `Categories ${categoriesId}`,
    };
  }

  @Get()
  get(@Query("limit") limit = 100, @Query("offset") offset = 0) {
    return {
      message: `Categories paginated Limit ${limit} Offset ${offset}`,
    };
  }

  @Post()
  create(@Body() payload: any) {
    return {
      message: "accion de crear",
      payload,
    };
  }

  @Put(":categoriesId")
  update(@Param("categoriesId") categoriesId: string, @Body() payload: any) {
    return {
      message: "accion de editar",
      categoriesId,
      payload,
    };
  }

  @Delete(":categoriesId")
  delete(@Param("categoriesId") categoriesId: string) {
    return {
      message: "accion de eliminar",
      categoriesId,
    };
  }
}
