import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

import { VehicleRepository } from "../repositories";

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  if (!event.pathParameters) {
    return { statusCode: 400, body: "Request body is missing" };
  }

  const vehicleId = Number(event.pathParameters.id);
  if (!vehicleId || isNaN(vehicleId)) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Invalid ID" }),
    };
  }

  const repository = new VehicleRepository();

  try {
    const result = await repository.getById(vehicleId);

    return {
      statusCode: 200,
      body: JSON.stringify(result),
    };
  } catch (error: any) {
    console.error("Error creating vehicles:", error);
    return { statusCode: error.statusCode, body: error.message };
  }
};
