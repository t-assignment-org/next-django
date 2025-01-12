import { useEffect, useState } from "react";

interface ToastProps {
  title: string;
  description: string;
  variant: "info" | "warning" | "error";
  onClose: () => void;
  timeout?: number;
}

export function Toast({
  title,
  description,
  variant,
  onClose,
  timeout = 3000,
}: ToastProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onClose();
    }, timeout);

    return () => clearTimeout(timer);
  }, [onClose]);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed bottom-4 right-4 p-4 rounded-md shadow-lg ${
        variant === "error"
          ? "bg-red-500 text-white"
          : variant === "warning"
          ? "bg-yellow-90 text-white"
          : "bg-gray-800 text-white"
      }`}
    >
      <h3 className="font-bold">{title}</h3>
      <p>{description}</p>
    </div>
  );
}
