"use client";

import { FormEvent, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { WarningPopup } from "./WarningPopup";
import { cn } from "@/lib/utils";
import { createAppointment } from "../actions/appointment";
import { parse } from "date-fns";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface AppointmentFormProps {
  selectedDate: string | null;
  selectedTime: string | null;
  isTimeSlotsLoading: boolean;
  className?: string;
}

export function AppointmentForm({
  selectedDate,
  selectedTime,
  isTimeSlotsLoading,
  className,
}: AppointmentFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    description: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    description: "",
  });
  const [isWarningOpen, setIsWarningOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    let isValid = true;
    const newErrors = { email: "", description: "" };

    if (!formData.email) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
      isValid = false;
    }

    if (!formData.description) {
      newErrors.description = "Description is required";
      isValid = false;
    } else if (formData.description.length > 400) {
      newErrors.description = "Description must be 400 characters or less";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      await submitAppointment();
    } catch (error) {
      handleError(error);
    }
    setIsSubmitting(false);
  };

  const handleError = (error: any) => {
    const errorMessage = error.message || "An unknown error occurred";

    if (errorMessage.startsWith("500:")) {
      setIsWarningOpen(true);
    } else if (errorMessage.startsWith("401:")) {
      toast.error("Please login to continue.");
    } else if (errorMessage.startsWith("400:")) {
      toast.warning("Please check your description and try again.");
    }
  };

  const submitAppointment = async () => {
    const appointment = await createAppointment({
      date: parse(
        `${selectedDate} ${selectedTime}`,
        "dd/MM/yyyy HH:mm",
        new Date()
      ),
      email: formData.email,
      description: formData.description,
    });

    if (appointment) {
      toast.success("Appointment created!");
      router.push("/appointments");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  return (
    <div className={cn("w-full flex flex-col", className)}>
      <h2 className="text-lg font-semibold mb-4">Appointment Details</h2>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col flex-start grow space-y-4"
      >
        <div>
          <Label htmlFor="date">Date</Label>
          <p className="mt-1 font-bold">{selectedDate}</p>
        </div>
        <div>
          <Label htmlFor="time">Time</Label>
          <p className="mt-1 font-bold">
            {selectedTime || "Please select a time"}
          </p>
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>
        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description (max 400 characters)"
            maxLength={400}
            required
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">{errors.description}</p>
          )}
        </div>
        <div className="grow"></div>
        <Button
          type="submit"
          disabled={!selectedTime || isTimeSlotsLoading || isSubmitting}
        >
          {isSubmitting ? "Saving..." : "Save Appointment"}
        </Button>
      </form>

      <WarningPopup
        isOpen={isWarningOpen}
        onClose={() => setIsWarningOpen(false)}
        onRetry={submitAppointment}
      />
    </div>
  );
}
