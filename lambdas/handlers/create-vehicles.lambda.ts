import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

import { validateDto } from "../utils";
import { CreateVehicleDTO } from "../dtos";
import { VehicleRepository } from "../repositories";

export const CreateVehicle = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  if (!event.body) {
    return { statusCode: 400, body: "Request body is missing" };
  }

  const dto = await validateDto(CreateVehicleDTO, JSON.parse(event.body));
  const repository = new VehicleRepository();

  try {
    const result = await repository.create(dto);

    return {
      statusCode: 201,
      body: JSON.stringify(result),
    };
  } catch (error) {
    console.error("Error creating vehicles:", error);
    return { statusCode: 500, body: "Internal Server Error" };
  }
};
