import { Topic } from "./enums";

export interface ReservationData {
  id: number;
  user_id: string;
  vehicle_id: number;
  status: "RESERVED" | "CANCELLED" | "CONCLUDED";
}

export interface SaleData {
  id?: number;
  reservation_id: number;
  price: number;
  status: "CONCLUDED" | "CANCELLED" | "PENDING";
}

export interface SoldEventData {
  sale: SaleData;
  reservation: ReservationData;
}

export interface ReservationEvent {
  reservation: ReservationData;
}

export interface SalesAndReservationEventMessage<T> {
  topic: Topic;
  data: T;
}
export interface EventMessage {
  reservation?: SalesAndReservationEventMessage<ReservationData>;
}
