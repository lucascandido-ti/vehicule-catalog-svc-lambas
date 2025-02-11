import { SQSEvent } from "aws-lambda";

import { VehicleRepository } from "../repositories";
import {
  SalesAndReservationEventMessage,
  SoldEventData,
  Status,
  Topic,
} from "../utils";

export const handler = async (event: SQSEvent) => {
  for (const record of event.Records) {
    try {
      const event: SalesAndReservationEventMessage<SoldEventData> = JSON.parse(
        record.body
      );

      console.debug(
        "[VehicleReservationCancellationEvent][Event][Reserved]",
        JSON.stringify(event)
      );

      if (!event || event.topic !== Topic.CANCELLED_SALE) return;

      const { data } = event;

      const repository = new VehicleRepository();
      const vehicle = await repository.getById(data.reservation.vehicle_id);
      await repository.updateStatus(vehicle.id!, Status.AVAILABLE);

      console.log(
        `Status updated ${data.reservation.vehicle_id}: ${Status.AVAILABLE}`
      );
    } catch (error: any) {
      console.error("Error process event:", error);
      return { statusCode: error.statusCode, body: error.message };
    }
  }
};
