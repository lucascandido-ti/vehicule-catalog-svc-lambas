export enum Status {
  AVAILABLE = "AVAILABLE",
  RESERVED = "RESERVED",
  SOLD = "SOLD",
}

export enum Topic {
  CREATE_RESERVATION = "reservation.create",
  CONCLUDED_RESERVATION = "reservation.concluded",
  CANCELLED_RESERVATION = "reservation.cancelled",
  CREATE_SALES_REQUESTS = "sales.create",
  CONCLUDED_SALE = "sales.concluded",
  CANCELLED_SALE = "sales.cancelled",
}