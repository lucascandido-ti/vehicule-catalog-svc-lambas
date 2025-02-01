import { pool, Status } from "../utils";
import { Vehicle } from "../models";
import { CreateVehicleDTO, ListVehicleDTO } from "../dtos";
import { VehicleQueryBuilder } from "../builders";

export class VehicleRepository {
  async create({ brand, model, year, price, mileage }: CreateVehicleDTO) {
    const query = `
      INSERT INTO vehicles (brand, model, year, price, mileage, status)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;
    `;
    const values = [brand, model, year, price, mileage, Status.AVAILABLE];

    const result = await pool.query<Vehicle>(query, values);

    return result.rows[0];
  }

  update() {}

  async list(dto: ListVehicleDTO): Promise<Vehicle[]> {
    const queryBuilder = new VehicleQueryBuilder(dto);
    const { query, params } = queryBuilder.build();

    const result = await pool.query<Vehicle>(query, params);

    return result.rows;
  }
}
