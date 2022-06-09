import { Module, Global } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigType } from "@nestjs/config";
import { Client } from "pg";

import config from "../config";
import { Product } from "src/products/entitites/product.entity";
import { User } from "src/users/entities/user.entity";
@Global()
@Module({
  providers: [
    {
      provide: "PG",
      useFactory: (configService: ConfigType<typeof config>) => {
        const { pgHost, pgUser, pgPassword, pgPort, pgDatabase } =
          configService?.postgres;
        const client = new Client({
          host: pgHost,
          user: pgUser,
          password: pgPassword,
          port: pgPort,
          database: pgDatabase,
        });

        client.connect();
        return client;
      },
      inject: [config.KEY],
    },
  ],
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [config.KEY],
      useFactory: (configService: ConfigType<typeof config>) => {
        const { pgHost, pgUser, pgPassword, pgPort, pgDatabase } =
          configService?.postgres;
        return {
          type: "postgres",
          host: pgHost,
          username: pgUser,
          password: pgPassword,
          port: pgPort,
          database: pgDatabase,
          entities: [Product, User],
        };
      },
    }),
  ],
  exports: ["PG", TypeOrmModule],
})
export class DatabaseModule {}
