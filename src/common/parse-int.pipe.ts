import {
  ArgumentMetadata,
  Injectable,
  PipeTransform,
  BadRequestException,
} from "@nestjs/common";

@Injectable()
export class ParseIntPipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata) {
    const result = parseInt(value, 10);
    if (isNaN(result))
      throw new BadRequestException(
        `Validation failed ('${value}' must be a number)`,
      );
    return result;
  }
}
