import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { HttpModule, HttpService } from "@nestjs/axios";
import { lastValueFrom } from "rxjs";
import * as Joi from "joi";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ProductsModule } from "./products/products.entity";
import { UsersModule } from "./users/users.module";
import { environments } from "./environments";
import config from "./config";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: environments[process.env.NODE_ENV] || ".env",
      load: [config],
      isGlobal: true,
      validationSchema: Joi.object({
        API_KEY: Joi.number().required(),
        DATABASE_NAME: Joi.string().required(),
        DATABASE_PORT: Joi.number().required(),
      }),
    }),
    UsersModule,
    ProductsModule,
    HttpModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: "TASKS",
      useFactory: async (http: HttpService) => {
        const request = await http.get(
          "https://jsonplaceholder.typicode.com/todos",
        );
        const tasks = await lastValueFrom(request);
        return tasks.data;
      },
      inject: [HttpService],
    },
  ],
})
export class AppModule {}
