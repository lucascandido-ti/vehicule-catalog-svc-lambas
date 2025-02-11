import { SQSEvent } from "aws-lambda";

import { VehicleRepository } from "../repositories";
import {
  ReservationData,
  SalesAndReservationEventMessage,
  Status,
  Topic,
} from "../utils";

export const handler = async (event: SQSEvent) => {
  for (const record of event.Records) {
    try {
      const event: SalesAndReservationEventMessage<ReservationData> =
        JSON.parse(record.body);

      console.debug("[ReserveVehicle][Event]Reserved]", JSON.stringify(event));

      if (!event || event.topic !== Topic.CREATE_RESERVATION) return;

      const { data } = event;

      const repository = new VehicleRepository();
      const vehicle = await repository.getById(data.vehicle_id);
      await repository.updateStatus(vehicle.id!, Status.RESERVED);

      console.log(`Status updated ${data.vehicle_id}: ${Status.RESERVED}`);
    } catch (error: any) {
      console.error("Error process event:", error);
      return { statusCode: error.statusCode, body: error.message };
    }
  }
};
