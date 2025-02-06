import { SQSEvent } from "aws-lambda";

import { VehicleRepository } from "../repositories";
import { ReservationEvent, Status } from "../utils";

export const handler = async (event: SQSEvent) => {
  for (const record of event.Records) {
    try {
      const { reservation }: ReservationEvent = JSON.parse(record.body);

      const repository = new VehicleRepository();
      const vehicle = await repository.getById(reservation.vehicle_id);
      await repository.updateStatus(vehicle.id!, Status.RESERVED);

      console.log(
        `Status updated ${reservation.vehicle_id}: ${Status.RESERVED}`
      );
    } catch (error: any) {
      console.error("Error creating vehicles:", error);
      return { statusCode: error.statusCode, body: error.message };
    }
  }
};
