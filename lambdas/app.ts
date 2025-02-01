import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { CreateVehicle } from "./handlers/create-vehicles.lambda";
import { ListVehicle } from "./handlers/list-vehicles.lambda";
import { UpdateVehicle } from "./handlers/update-vehicles.lambda";

export const lambdaCreateVehicle = CreateVehicle;
export const lambdaListVehicle = ListVehicle;
export const lambdaUpdateVehicle = UpdateVehicle;

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
