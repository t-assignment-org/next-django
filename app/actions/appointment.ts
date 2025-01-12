import {
  Appointment,
  AppointmentPayload,
  AppointmentPayloadSchema,
} from "../types/appointment";

import crypto from "crypto";
import { revalidatePath } from "next/cache";

const appointments: Appointment[] = [];

function __debugRandomError() {
  const random = Math.random();
  if (random < 0.2) {
    throw new Error("500: Internal Server Error");
  } else if (random < 0.4) {
    throw new Error("401: Unauthorized");
  } else if (random < 0.6) {
    throw new Error("400: Bad Request - Invalid description");
  }
}

async function __debugDelay(timeout = 2000) {
  await new Promise((resolve) => setTimeout(resolve, timeout));
}

export async function createAppointment(
  appointment: AppointmentPayload
): Promise<AppointmentPayload> {
  __debugRandomError();

  const data = {
    ...AppointmentPayloadSchema.parse(appointment),
    id: crypto.randomUUID(),
  };

  appointments.push(data);

  revalidatePath("/");
  revalidatePath("/appointments");
  revalidatePath("/make-appointment");

  return data;
}

export async function getAppointments(): Promise<Appointment[]> {
  await __debugDelay();
  return appointments;
}

export async function getAppointmentDates(): Promise<string[]> {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return [
    ...new Set(
      appointments.map((app) => {
        const [day, month, year] = app.date.split("/");
        return `${day}/${month}/${year}`;
      })
    ),
  ];
}
