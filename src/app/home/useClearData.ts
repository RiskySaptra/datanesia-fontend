import { toast } from "react-toastify";
import { TOAST_CONFIG } from "./toastConfig";

export async function handleClearData() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/graphs`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to clear graph data.");
    }

    const data = await response.json();
    toast.success(data.message, TOAST_CONFIG);
  } catch (err) {
    const errorMessage = (err as Error).message || "An unknown error occurred.";
    console.error("Clear data error:", errorMessage);
    toast.error(errorMessage, TOAST_CONFIG);
  }
}
