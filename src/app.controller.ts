import { Controller, Get, HttpCode, HttpStatus } from "@nestjs/common";
import { AppService } from "./app.service";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getApiKey(): string {
    return this.appService.getApiKey();
  }

  @Get("noob")
  @HttpCode(HttpStatus.ACCEPTED)
  getNoob() {
    return "I'm a noob";
  }

  @Get("little/noob")
  getLittleNoob() {
    return "I'm a little noob";
  }
}
