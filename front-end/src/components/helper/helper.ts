import { toast } from "sonner";

export const showSuccessMessage = (message: string) => {
  toast.success(message, { duration: 2000, style: { background: "green", color: "#fff" } });
};

export const showErrorMessage = (message: string) => {
  toast.error(message, { duration: 2000, style: { background: "red", color: "#fff" } });
};

export const updateLocalStorage = (key: string, value: string) => {
  localStorage.setItem(key, value);

  // Create and dispatch the event manually
  const event = new Event("storage");
  window.dispatchEvent(event);
};
