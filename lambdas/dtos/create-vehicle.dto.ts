import {
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  Max,
  Min,
} from "class-validator";

export class CreateVehicleDTO {
  @IsString()
  brand: string;

  @IsString()
  model: string;

  @IsNumber()
  @Min(1930)
  @Max(new Date().getFullYear())
  year: number;

  @IsNumber()
  price: number;

  @IsNumber()
  mileage: number;

  @IsArray()
  @IsOptional()
  @IsUrl({}, { each: true })
  photos?: string[] | undefined;
}
