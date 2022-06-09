import { IsString, IsNotEmpty, IsPositive, IsEmail } from "class-validator";

import { PartialType, ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: "The name of the user" })
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: "The lastname of the user" })
  readonly last_name: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ description: "The email of the user" })
  readonly email: string;

  @IsPositive()
  @IsNotEmpty()
  @ApiProperty({ description: "The user role" })
  readonly role: number;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
