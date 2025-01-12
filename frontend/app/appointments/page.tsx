import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { compareAsc, format } from "date-fns";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import Main from "../components/Main";
import { Suspense } from "react";
import { getAppointments } from "../actions/appointment";

const truncated = (text: string | null | undefined, length: number) => {
  if (!text) {
    return "";
  }

  return text.length > length ? `${text.slice(0, length)}...` : text;
};

async function AppointmentList() {
  const appointments = await getAppointments();

  if (appointments.length === 0) {
    return <p>No appointments scheduled.</p>;
  }

  return (
    <div className="space-y-4">
      {appointments
        .sort((a, b) => compareAsc(a.date, b.date))
        .map((appointment) => (
          <Card key={appointment.id}>
            <CardHeader>
              <CardTitle>
                {format(appointment.date, "dd/MM/yyyy")} at{" "}
                {format(appointment.date, "HH:mm")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500">{appointment.email}</p>
              <p className="mt-2">{truncated(appointment.description, 100)}</p>
            </CardContent>
          </Card>
        ))}
    </div>
  );
}

export default function Appointments() {
  return (
    <Main>
      <h1 className="text-2xl font-bold">Current Appointments</h1>
      <Suspense fallback={<div>Loading appointments...</div>}>
        <AppointmentList />
      </Suspense>
      <div className="mt-4">
        <Button asChild>
          <Link href="/">Back to Calendar</Link>
        </Button>
      </div>
    </Main>
  );
}
