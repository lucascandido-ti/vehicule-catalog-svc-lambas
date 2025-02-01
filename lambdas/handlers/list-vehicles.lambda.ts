import { APIGatewayProxyResult } from "aws-lambda";
import { pool } from "../utils";

export const ListVehicle = async (): Promise<APIGatewayProxyResult> => {
  try {
    const result = await pool.query("SELECT * FROM vehicles;");
    return {
      statusCode: 200,
      body: JSON.stringify(result.rows),
    };
  } catch (error) {
    console.error("Error listing vehicles:", error);
    return { statusCode: 500, body: "Internal Server Error" };
  }
};
