import { IsNotEmpty, IsNumber, IsString, Max, Min } from "class-validator";

export class UpdateVehicleDTO {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsNotEmpty()
  brand: string;

  @IsString()
  @IsNotEmpty()
  model: string;

  @IsNumber()
  @Min(1930)
  @Max(new Date().getFullYear())
  @IsNotEmpty()
  year: number;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsNumber()
  @IsNotEmpty()
  mileage: number;
}
