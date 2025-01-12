import { Calendar } from "./components/Calendar";
import Link from "next/link";
import Main from "./components/Main";
import { Suspense } from "react";
import { getAppointmentDates } from "./actions/appointment";

async function SuspendedCalendar() {
  const appointmentDates = await getAppointmentDates();
  return <Calendar initialDates={appointmentDates} />;
}

// TODO: Fix glitch when number of days row inc/dec

export default function Home() {
  return (
    <Main>
      <h1 className="text-2xl font-bold">Appointment Calendar</h1>
      <Suspense fallback={<div>Loading calendar...</div>}>
        <SuspendedCalendar />
      </Suspense>
      <div className="mt-4">
        <Link href="/appointments" className="text-blue-500 hover:underline">
          View Current Appointments
        </Link>
      </div>
    </Main>
  );
}
