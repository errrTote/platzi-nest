import { Injectable, Inject } from "@nestjs/common";
import { ConfigType } from "@nestjs/config";
import { Client } from "pg";

import config from "./config";
@Injectable()
export class AppService {
  constructor(
    // @Inject("TASKS") private tasks: any[],
    @Inject("PG") private pgClient: Client,
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
  ) {}
  getApiKey(): string {
    const apiKey = this.configService.apiKey;
    const database = this.configService.database.name;
    return `
    api_key: ${apiKey}
    database: ${database}
    `;
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
