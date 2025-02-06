export interface ReservationData {
  id: number;
  user_id: string;
  vehicle_id: number;
  status: "RESERVED" | "CANCELLED" | "CONCLUDED";
}

export interface ReservationEvent {
  reservation: ReservationData;
}
