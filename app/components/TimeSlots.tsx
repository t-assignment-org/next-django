interface TimeSlotsProps {
  selectedDate: Date | null;
  onTimeSelect: (time: string) => void;
  setIsLoading: (isLoading: boolean) => void;
}

export function TimeSlots({
  selectedDate,
  onTimeSelect,
  setIsLoading,
}: TimeSlotsProps) {
  return null;
}
