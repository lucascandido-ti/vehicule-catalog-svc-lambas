import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

import { handler as CreateVehicle } from "./handlers/CreateVehicle";
import { handler as UpdateVehicle } from "./handlers/UpdateVehicle";
import { handler as ListVehicle } from "./handlers/ListVehicles";
import { handler as GetVehicleById } from "./handlers/GetVehicleById";

export const lambdaCreateVehicle = CreateVehicle;
export const lambdaUpdateVehicle = UpdateVehicle;
export const lambdaListVehicle = ListVehicle;
export const lambdaGetVehicleById = GetVehicleById;

export const lambdaHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "hello world",
      }),
    };
  } catch (err) {
    console.log(err);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "some error happened",
      }),
    };
  }
};
