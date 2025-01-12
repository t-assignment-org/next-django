import { useRouter } from "next/router";

interface AppointmentFormProps {
  selectedDate: string | null;
  selectedTime: string | null;
  isTimeSlotsLoading: boolean;
}

export function AppointmentForm({
  selectedDate,
  isTimeSlotsLoading,
}: AppointmentFormProps) {
  const router = useRouter();

  return null;
}
