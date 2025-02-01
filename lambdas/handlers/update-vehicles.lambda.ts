import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { Vehicle } from "../models/vehicle.model";
import { pool } from "../utils";
import { NotFoundVehicleException } from "../exceptions";

export const UpdateVehicle = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  if (!event.body) {
    return { statusCode: 400, body: "Request body is missing" };
  }

  try {
    const dto: Vehicle = JSON.parse(event.body);

    const vehicle = await pool.query<Vehicle[]>(
      "SELECT id FROM vehicles WHERE id = $1;",
      [dto.id]
    );

    if (!vehicle.rows.length)
      throw new NotFoundVehicleException("Vehicule not found");

    const query = `
      UPDATE vehicles
      SET brand=$1, model=$2, year=$3, price=$4, mileage=$5
      WHERE id=$6
      RETURNING *;
    `;
    const values = [
      dto.brand,
      dto.model,
      dto.year,
      dto.price,
      dto.mileage,
      dto.id,
    ];

    const result = await pool.query(query, values);
    return {
      statusCode: 201,
      body: JSON.stringify(result.rows[0]),
    };
  } catch (error: any) {
    console.error("Error creating vehicles:", error);
    return { statusCode: 500, body: error.message };
  }
};
