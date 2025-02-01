import { pool } from "../utils";
import { Vehicle } from "../models";
import { ListVehicleDTO } from "../dtos";
import { VehicleQueryBuilder } from "../builders";

export class VehicleRepository {
  create() {}
  update() {}

  async list(dto: ListVehicleDTO): Promise<Vehicle[]> {
    const queryBuilder = new VehicleQueryBuilder(dto);
    const { query, params } = queryBuilder.build();

    const result = await pool.query<Vehicle>(query, params);

    return result.rows;
  }
}
