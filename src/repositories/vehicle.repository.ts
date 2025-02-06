import { Vehicle } from "../models";
import { pool, Status } from "../utils";
import { VehicleQueryBuilder } from "../builders";
import { NotFoundVehicleException } from "../exceptions";
import { CreateVehicleDTO, ListVehicleDTO, UpdateVehicleDTO } from "../dtos";

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

  async update(dto: UpdateVehicleDTO) {
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

    const result = await pool.query<Vehicle>(query, values);

    return result.rows[0];
  }

  async list(dto: ListVehicleDTO): Promise<Vehicle[]> {
    const queryBuilder = new VehicleQueryBuilder(dto);
    const { query, params } = queryBuilder.build();

    const result = await pool.query<Vehicle>(query, params);

    return result.rows;
  }

  async getById(vehicleId: number) {
    const queryBuilder = new VehicleQueryBuilder({
      search: { field: "id", value: String(vehicleId) },
    });

    const { query, params } = queryBuilder.build();

    const result = await pool.query<Vehicle>(query, params);

    if (!result.rows.length)
      throw new NotFoundVehicleException("Vehicule not found");

    return result.rows[0];
  }

  async updateStatus(vehicleId: number, status: Status) {
    const vehicle = await pool.query<Vehicle[]>(
      "SELECT id FROM vehicles WHERE id = $1;",
      [vehicleId]
    );

    if (!vehicle.rows.length)
      throw new NotFoundVehicleException("Vehicule not found");

    const query = `
      UPDATE vehicles
      SET status=$1
      WHERE id=$2
      RETURNING *;
    `;
    const values = [status, vehicleId];

    const result = await pool.query<Vehicle>(query, values);

    return result.rows[0];
  }
}
