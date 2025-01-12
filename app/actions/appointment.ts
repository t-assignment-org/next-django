import { Appointment } from "../types/appointment";

export async function createAppointment(
  appointment: Omit<Appointment, "id">
): Promise<{ success: boolean; appointment: Appointment; error?: string }> {
  throw new Error("Not implemented");
}

export async function getAppointments(): Promise<Appointment[]> {
  throw new Error("Not implemented");
}

export async function getAppointmentDates(): Promise<string[]> {
  throw new Error("Not implemented");
}
