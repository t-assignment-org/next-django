"use client";

import { format, isSameDay, startOfDay } from "date-fns";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { getAppointments } from "../actions/appointment";

interface TimeSlotsProps {
  selectedDate: Date | null;
  onTimeSelect: (time: string) => void;
  setIsLoading: (isLoading: boolean) => void;
}

const START_HOUR = 10;
const END_HOUR = 18;

export function TimeSlots({
  selectedDate,
  onTimeSelect,
  setIsLoading,
}: TimeSlotsProps) {
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);
  const [isLoadingInternal, setIsLoadingInternal] = useState(true);

  useEffect(() => {
    const fetchBookedSlots = async () => {
      setIsLoadingInternal(true);
      setIsLoading(true);

      if (selectedDate) {
        const appointments = await getAppointments();
        const booked = appointments
          .filter((app) =>
            isSameDay(startOfDay(app.date), startOfDay(selectedDate))
          )
          .map((app) => format(app.date, "HH:mm"));

        setBookedSlots(booked);
      }
      setIsLoadingInternal(false);
      setIsLoading(false);
    };
    fetchBookedSlots();
  }, [selectedDate, setIsLoading]);

  const handleTimeClick = (time: string) => {
    setSelectedTime(time);
    onTimeSelect(time);
  };

  const renderTimeSlots = () => {
    const timeSlots = [];

    for (let hour = START_HOUR; hour <= END_HOUR; hour++) {
      const time = `${hour.toString().padStart(2, "0")}:00`;
      timeSlots.push(
        <Button
          key={time}
          variant={selectedTime === time ? "default" : "outline"}
          className="w-full mb-2"
          onClick={() => handleTimeClick(time)}
          disabled={bookedSlots.includes(time)}
        >
          {time}
        </Button>
      );
    }
    return timeSlots;
  };

  const renderSkeletons = () => {
    return Array(END_HOUR - START_HOUR)
      .fill(0)
      .map((_, index) => <Skeleton key={index} className="w-full h-10 mb-2" />);
  };

  return <div>{isLoadingInternal ? renderSkeletons() : renderTimeSlots()}</div>;
}
