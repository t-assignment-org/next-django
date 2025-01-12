"use client";

import { AppointmentForm } from "@/app/components/AppointmentForm";
import React from "react";
import { TimeSlots } from "@/app/components/TimeSlots";
import { format } from "date-fns";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function MakeAppointment() {
  const searchParams = useSearchParams();
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [isTimeSlotsLoading, setIsTimeSlotsLoading] = useState(true);

  const selectedDate = React.useMemo(() => {
    const dateStr = searchParams.get("date");
    const date = new Date(dateStr || "");

    return isNaN(+date) ? null : date;
  }, [searchParams]);

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Make an Appointment</h1>
      {selectedDate ? (
        <div className="flex flex-col md:flex-row gap-8">
          <TimeSlots
            className="w-full md:w-1/3"
            selectedDate={selectedDate}
            onTimeSelect={handleTimeSelect}
            setIsLoading={setIsTimeSlotsLoading}
          />
          <AppointmentForm
            className="w-full md:w-2/3"
            selectedDate={format(selectedDate, "dd/MM/yyyy")}
            selectedTime={selectedTime ? selectedTime : null}
            isTimeSlotsLoading={isTimeSlotsLoading}
          />
        </div>
      ) : (
        <p className="text-lg text-gray-600">
          Please select a date from the calendar to make an appointment.
        </p>
      )}
    </div>
  );
}
