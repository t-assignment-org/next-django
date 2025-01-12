"use client";

import {
  add,
  format,
  getDay,
  getDaysInMonth,
  isSameDay,
  startOfMonth,
  sub,
} from "date-fns";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { getAppointmentDates } from "../actions/appointment";
import { useRouter } from "next/navigation";

interface CalendarProps {
  initialDates: Date[];
}

export function Calendar({ initialDates }: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [appointmentDates, setAppointmentDates] =
    useState<Date[]>(initialDates);
  const router = useRouter();

  useEffect(() => {
    const timerHandler = async () => {
      const dates = await getAppointmentDates();
      setAppointmentDates(dates);
    };

    timerHandler();

    const interval = setInterval(timerHandler, 5000);

    return () => clearInterval(interval);
  }, []);

  const daysInMonth = getDaysInMonth(currentDate);
  const firstDayOfMonth = getDay(startOfMonth(currentDate));

  const handleDateClick = (day: number) => {
    const selectedDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day
    );

    const formattedDate = format(selectedDate, "dd/MM/yyyy");
    const defaultTime = "10:00";
    router.push(`/make-appointment?date=${formattedDate}&time=${defaultTime}`);
  };

  const renderCalendarDays = () => {
    const days = [];

    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="h-10"></div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        day
      );

      const hasAppointment = appointmentDates?.some((appointment) =>
        isSameDay(appointment, date)
      );

      days.push(
        <Button
          key={day}
          variant="ghost"
          className={`h-10 w-10 p-0 font-normal ${
            hasAppointment ? "bg-blue-100 hover:bg-blue-200" : ""
          }`}
          onClick={() => handleDateClick(day)}
        >
          {day}
        </Button>
      );
    }
    return days;
  };

  const nextMonth = () => setCurrentDate(add(currentDate, { months: 1 }));

  const prevMonth = () => setCurrentDate(sub(currentDate, { months: 1 }));

  return (
    <div className="w-full max-w-sm">
      <div className="flex items-center justify-between mb-4">
        <Button variant="outline" size="icon" onClick={prevMonth}>
          &lt;
        </Button>
        <h2 className="font-semibold">
          {currentDate.toLocaleString("default", {
            month: "long",
            year: "numeric",
          })}
        </h2>
        <Button variant="outline" size="icon" onClick={nextMonth}>
          &gt;
        </Button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="font-medium text-sm">
            {day}
          </div>
        ))}
        {renderCalendarDays()}
      </div>
    </div>
  );
}
