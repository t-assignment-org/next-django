"use server";

import * as gatewayApi from "../../api-autogen/gateway-api";

import {
  Appointment,
  AppointmentPayload,
  AppointmentPayloadSchema,
} from "../types/appointment";

import { revalidatePath } from "next/cache";

async function __debugDelay(timeout = 2000) {
  await new Promise((resolve) => setTimeout(resolve, timeout));
}

export async function createAppointment(
  appointment: AppointmentPayload
): Promise<Appointment> {
  const gateway = new gatewayApi.AppointmentsApi(
    new gatewayApi.Configuration({
      basePath: process.env.APPOINTMENTS_API_BASE_URL,
    })
  );

  const result = await gateway.appappointmentRoutesAppointmentCreateAppointment(
    { appointmentPostIn: AppointmentPayloadSchema.parse(appointment) }
  );

  revalidatePath("/");
  revalidatePath("/appointments");
  revalidatePath("/make-appointment");

  return result;
}

export async function getAppointments(): Promise<Appointment[]> {
  await __debugDelay();

  const gateway = new gatewayApi.AppointmentsApi(
    new gatewayApi.Configuration({
      basePath: process.env.APPOINTMENTS_API_BASE_URL,
    })
  );

  console.log(">>>> getAppointments", process.env.APPOINTMENTS_API_BASE_URL);

  try {
    const result =
      await gateway.appappointmentRoutesAppointmentGetAppointments();
    console.log(">>>> getAppointments ok", result);

    return result;
  } catch (error) {
    console.log(">>>> getAppointments error", error);
    throw error;
  }
}

// TODO: Remove as can be derived from getAppointments result
// TODO: Add month to get date for
export async function getAppointmentDates(): Promise<Date[]> {
  const appointments = await getAppointments();
  return Array.from(new Set(appointments.map((app) => app.date)));
}
