import { ListVehicleDTO, SortOrder } from "../dtos";

export class VehicleQueryBuilder {
  private baseQuery = "SELECT * FROM vehicles";
  private whereClauses: string[] = [];
  private queryParams: any[] = [];
  private orderByClause = "";
  private limitOffsetClause = "";

  constructor(private dto: ListVehicleDTO) {}

  private applySearch() {
    if (this.dto.search) {
      const paramIndex = this.queryParams.length + 1;
      this.whereClauses.push(`${this.dto.search.field} ILIKE $${paramIndex}`);
      this.queryParams.push(`%${this.dto.search.value}%`);
    }
  }

  private applySorting() {
    if (this.dto.sort) {
      const order = this.dto.sortOrder || SortOrder.ASC;
      this.orderByClause = `ORDER BY ${this.dto.sort} ${order}`;
    }
  }

  private applyPagination() {
    const skipIndex = this.queryParams.length + 1;
    const takeIndex = this.queryParams.length + 2;

    this.limitOffsetClause = `LIMIT $${takeIndex} OFFSET $${skipIndex}`;
    this.queryParams.push(this.dto.skip, this.dto.take);
  }

  public build(): { query: string; params: any[] } {
    this.applySearch();
    this.applySorting();
    this.applyPagination();

    let query = this.baseQuery;

    if (this.whereClauses.length > 0) {
      query += ` WHERE ${this.whereClauses.join(" AND ")}`;
    }

    if (this.orderByClause) {
      query += ` ${this.orderByClause}`;
    }

    query += ` ${this.limitOffsetClause}`;

    return { query, params: this.queryParams };
  }
}
