import {
  Appointment,
  AppointmentPayload,
  AppointmentPayloadSchema,
} from "../types/appointment";

import crypto from "crypto";
import { revalidatePath } from "next/cache";

const mocks: Appointment[] = [
  {
    id: "b8f94d21-91d5-4b4e-9c7e-8a7b2d0931c3",
    date: new Date("2025-01-22T14:00:00.000Z"),
    email: "john@example.com",
    description: "Annual check-up with Dr. Smith",
  },
  {
    id: "c23f8c50-a3d1-40f9-9079-5f6e3659f8d2",
    date: new Date("2025-01-13T10:00:00.000Z"),
    email: "sarah@example.com",
    description: "Dental cleaning and X-rays",
  },
  {
    id: "e16c1c62-2c67-4d63-b07c-cb1ecb45ab3c",
    date: new Date("2025-01-27T16:00:00.000Z"),
    email: "mike@example.com",
    description: "Follow-up consultation for recent lab results",
  },
  {
    id: "d2f2a2b1-3a1f-4110-bf47-6d0c0c54a1db",
    date: new Date("2025-01-05T09:00:00.000Z"),
    email: "jane@example.com",
    description: "Eye examination",
  },
  {
    id: "a4e4b215-7b9e-4c23-911d-9654ad8a85db",
    date: new Date("2025-01-10T11:00:00.000Z"),
    email: "dave@example.com",
    description: "Physical therapy session",
  },
  {
    id: "c2f6786e-e69c-4a26-8b5f-5a1b5c0a6d61",
    date: new Date("2025-01-15T13:00:00.000Z"),
    email: "emma@example.com",
    description: "Nutritionist consultation",
  },
  {
    id: "b8e62c6e-6f5e-49e7-9f19-51b8b5d7eb90",
    date: new Date("2025-01-20T15:00:00.000Z"),
    email: "leo@example.com",
    description: "Pediatric appointment for child",
  },
  {
    id: "ed5a1c0a-d4c6-4a6d-8b5f-7a1b5c0a1e60",
    date: new Date("2025-01-25T08:00:00.000Z"),
    email: "sophia@example.com",
    description: "Routine vaccination",
  },
];

const appointments: Appointment[] = [...mocks];

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
): Promise<Appointment> {
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

// TODO: Add month to get date for
export async function getAppointmentDates(): Promise<Date[]> {
  await __debugDelay();
  return Array.from(new Set(appointments.map((app) => app.date)));
}
