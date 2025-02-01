import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

import { validateDto } from "../utils";
import { ListVehicleDTO } from "../dtos";
import { VehicleRepository } from "../repositories";

export const ListVehicle = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const searchParams = event.queryStringParameters || {};

  const dto = await validateDto(ListVehicleDTO, searchParams);
  const repository = new VehicleRepository();

  try {
    const result = await repository.list(dto);

    return {
      statusCode: 200,
      body: JSON.stringify(result),
    };
  } catch (error) {
    console.error("Error listing vehicles:", error);
    return { statusCode: 500, body: "Internal Server Error" };
  }
};
