import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { Vehicle } from "../models/vehicle.model";
import { pool } from "../utils";

export const CreateVehicle = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  if (!event.body) {
    return { statusCode: 400, body: "Request body is missing" };
  }

  try {
    const vehicle: Vehicle = JSON.parse(event.body);
    const query = `
      INSERT INTO vehicles (brand, model, year, price, mileage, status)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;
    `;
    const values = [
      vehicle.brand,
      vehicle.model,
      vehicle.year,
      vehicle.price,
      vehicle.mileage || null,
      vehicle.status,
    ];

    const result = await pool.query(query, values);
    return {
      statusCode: 201,
      body: JSON.stringify(result.rows[0]),
    };
  } catch (error) {
    console.error("Error creating vehicles:", error);
    return { statusCode: 500, body: "Internal Server Error" };
  }
};
