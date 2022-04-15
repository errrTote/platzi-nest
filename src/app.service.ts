import { Injectable, Inject } from "@nestjs/common";
import { ConfigType } from "@nestjs/config";
import config from "./config";

@Injectable()
export class AppService {
  constructor(
    // @Inject("TASKS") private tasks: any[],
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
}