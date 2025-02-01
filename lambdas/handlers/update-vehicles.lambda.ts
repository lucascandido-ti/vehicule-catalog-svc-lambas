import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

import { pool, validateDto } from "../utils";
import { UpdateVehicleDTO } from "../dtos";
import { VehicleRepository } from "../repositories";

export const UpdateVehicle = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  if (!event.body) {
    return { statusCode: 400, body: "Request body is missing" };
  }

  const dto = await validateDto(UpdateVehicleDTO, JSON.parse(event.body));
  const repository = new VehicleRepository();

  try {
    const result = await repository.update(dto);

    return {
      statusCode: 201,
      body: JSON.stringify(result),
    };
  } catch (error: any) {
    console.error("Error creating vehicles:", error);
    return { statusCode: 500, body: error.message };
  }
};
