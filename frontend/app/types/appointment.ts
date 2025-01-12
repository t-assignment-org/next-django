import { z } from "zod";

export const AppointmentPayloadSchema = z.object({
  date: z.date(),
  email: z.string().email(),
  description: z.string().optional(),
});

export const AppointmentSchema = AppointmentPayloadSchema.extend({
  id: z.string().uuid(),
});

export type AppointmentPayload = z.infer<typeof AppointmentPayloadSchema>;
export type Appointment = z.infer<typeof AppointmentSchema>;
