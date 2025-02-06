import "reflect-metadata";

import { Transform, Type } from "class-transformer";
import {
  IsEnum,
  IsIn,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from "class-validator";

export enum SortOrder {
  ASC = "ASC",
  DESC = "DESC",
}

export interface SearchFields {
  field: string;
  value: string;
}

const sortOptions = ["year", "price", "brand", "mileage", "createdAt"] as const;
type SortOptions = (typeof sortOptions)[number];

export class ListVehicleDTO {
  @Min(0)
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  skip? = 0;

  @Max(100)
  @Min(0)
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  take? = 10;

  @IsIn(sortOptions)
  @IsString()
  @IsOptional()
  sort?: SortOptions;

  @IsEnum(SortOrder)
  @IsOptional()
  sortOrder?: SortOrder;

  @IsOptional()
  @Transform(({ value }) => {
    return JSON.parse(value);
  })
  search?: SearchFields;
}
